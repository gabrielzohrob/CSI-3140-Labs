document.addEventListener("DOMContentLoaded", function(){
  loadDishes();
  loadOrders();

  document.getElementById("edit-price-form").addEventListener("submit", updatePrice);
  document.getElementById("new-order-form").addEventListener("submit", placeOrder);
  document.getElementById("import-xml").addEventListener("click", importXML); // Triggered only on click
});

function loadDishes() {
  const query = "SELECT * FROM dishes";
  fetch("run_query.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  })
    .then(res => res.json())
    .then(dishes => {
      const select = document.getElementById("dish-select");
      select.innerHTML = "";
      dishes.forEach(d => {
        const option = document.createElement("option");
        option.value = d.id;
        option.textContent = `${d.name} ($${d.price})`;
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Failed to load dishes:", err));
}

function loadOrders() {
  const query = `
    SELECT o.id, o.customer_name, o.quantity, o.order_time, 
           d.name AS dish, d.price 
    FROM orders o 
    JOIN dishes d ON o.dish_id = d.id
  `;
  fetch("run_query.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  })
    .then(res => res.json())
    .then(orders => {
      const tbody = document.querySelector("#orders-table tbody");
      tbody.innerHTML = "";
      orders.forEach(order => {
        const tr = document.createElement("tr");
        const total = (order.quantity * order.price).toFixed(2);
        tr.innerHTML = `
          <td>${order.id}</td>
          <td>${order.customer_name}</td>
          <td>${order.dish}</td>
          <td>${order.quantity}</td>
          <td>$${order.price}</td>
          <td>$${total}</td>
          <td>${order.order_time}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => console.error("Failed to load orders:", err));
}

function updatePrice(e) {
  e.preventDefault();
  const form = e.target;
  const dishId = form.dishId.value;
  const price = form.price.value;

  const query = `UPDATE dishes SET price = ${price} WHERE id = ${dishId}`;
  fetch("run_query.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  })
    .then(() => {
      alert("Price updated!");
      loadDishes();
      loadOrders();
    })
    .catch(err => alert("Failed to update price: " + err));
}

function placeOrder(e) {
  e.preventDefault();
  const form = e.target;
  const customer = form.customer.value.trim();
  const quantity = parseInt(form.quantity.value);
  const dishId = parseInt(form.dish.value);

  if (!customer || !quantity || !dishId) {
    alert("Please fill in all fields correctly.");
    return;
  }

  const query = `
    INSERT INTO orders (dish_id, customer_name, quantity) 
    VALUES (${dishId}, '${customer}', ${quantity})
  `;

  fetch("run_query.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  })
    .then(() => {
      alert("Order placed!");
      form.reset();
      loadOrders();
    })
    .catch(err => alert("Failed to place order: " + err));
}

function importXML() {
  fetch("orders.xml")
    .then(res => res.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "application/xml"))
    .then(xml => {
      const orders = xml.getElementsByTagName("order");
      let imported = 0;

      for (let order of orders) {
        const customer = order.getElementsByTagName("customer")[0].textContent;
        const dishId = order.getElementsByTagName("dish_id")[0].textContent;
        const quantity = order.getElementsByTagName("quantity")[0].textContent;
        const time = order.getElementsByTagName("time")[0].textContent;

        const query = `
          INSERT INTO orders (dish_id, customer_name, quantity, order_time)
          VALUES (${dishId}, '${customer}', ${quantity}, '${time}')
        `;

        fetch("run_query.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query })
        })
        .then(() => {
          imported++;
          if (imported === orders.length) {
            alert(`Successfully imported ${imported} orders.`);
            loadOrders();
          }
        })
        .catch(err => {
          console.error("Failed to import order:", err);
          alert("Failed to import one or more orders. See console.");
        });
      }
    })
    .catch(err => {
      alert("Failed to load or parse orders.xml");
      console.error(err);
    });
}
