document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvasSpace");
    const ctx = canvas.getContext("2d");

    // Global state
    let shapes = [];

    // Event Listeners
    document.getElementById("loadButton").addEventListener("click", loadShapesFromXML);
    document.getElementById("shapeForm").addEventListener("submit", handleCreateShape);

    async function loadShapesFromXML() {
        try {
            const response = await fetch("shapes.xml");
            const xmlText = await response.text();

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");

            const shapeNodes = xmlDoc.getElementsByTagName("shape");
            shapes = []; // Reset the array

            for (let shape of shapeNodes) {
                const type = shape.getElementsByTagName("type")[0].textContent.toLowerCase();
                const color = shape.getElementsByTagName("color")[0].textContent;
                const x = parseInt(shape.getElementsByTagName("x")[0].textContent);
                const y = parseInt(shape.getElementsByTagName("y")[0].textContent);
                const width = parseInt(shape.getElementsByTagName("width")[0].textContent);
                const height = parseInt(shape.getElementsByTagName("height")[0].textContent);

                shapes.push({ type, color, x, y, width, height });
            }

            drawAllShapes();
        } catch (err) {
            console.error("Error loading XML:", err);
        }
    }

    // Function to handle form submission
    function handleCreateShape(event) {
        event.preventDefault();

        const type = document.getElementById("type").value.toLowerCase();
        const color = document.getElementById("color").value;
        const x = parseInt(document.getElementById("x").value);
        const y = parseInt(document.getElementById("y").value);
        const width = parseInt(document.getElementById("width").value);
        const height = parseInt(document.getElementById("height").value);

        shapes.push({ type, color, x, y, width, height });

        drawAllShapes();
    }

    // Function to draw all shapes on canvas
    function drawAllShapes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let shape of shapes) {
            ctx.fillStyle = shape.color;

            if (shape.type === "rectangle") {
                ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                ctx.beginPath();
                ctx.arc(shape.x, shape.y, shape.height, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
});
