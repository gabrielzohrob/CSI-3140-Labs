var blogPosts = [];

function displayPosts() {
  const postsContainer = document.getElementById("latestpost");

  postsContainer.innerHTML = "";

    for(post in blogPosts){
    const postDiv = document.createElement("div");
    postDiv.style.backgroundColor = "#fff";
    postDiv.style.padding = "15px";
    postDiv.style.marginBottom = "15px";
    postDiv.style.borderRadius = "10px";
    postDiv.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";

    const titleEl = document.createElement("h3");
    titleEl.textContent = post.title;
    titleEl.style.color = "#4f46e5";
    titleEl.style.cursor = "pointer";
    titleEl.addEventListener("click", () => {
      alert(post.content);
    });

    const metaEl = document.createElement("p");
    metaEl.textContent = `By ${post.author} on ${post.date.toLocaleDateString()}`;
    metaEl.style.color = "#555";
    metaEl.style.fontStyle = "italic";
    metaEl.style.marginTop = "-10px";

    const contentEl = document.createElement("p");
    contentEl.textContent = post.content.substring(0, 100) + "...";
    contentEl.style.color = "#333";

    postDiv.appendChild(titleEl);
    postDiv.appendChild(metaEl);
    postDiv.appendChild(contentEl);
    postsContainer.appendChild(postDiv);
  });
}

function handleAddPost(event) {
  event.preventDefault(); // Prevent form reload

  const title = document.getElementById("posttitle").value.trim();
  const author = document.getElementById("postauthor").value.trim();
  const content = document.getElementById("postcontent").value.trim();

  if (!title || !author || !content) {
    alert("Please fill in all fields.");
    return;
  }

  const newPost = {
    title,
    author,
    content,
    date: new Date()
  };

  blogPosts.push(newPost);

  displayPosts();

  document.getElementById("posttitle").value = "";
  document.getElementById("postauthor").value = "";
  document.getElementById("postcontent").value = "";
}

document.addEventListener("load", );