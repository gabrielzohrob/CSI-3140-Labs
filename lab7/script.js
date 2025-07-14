document.addEventListener("DOMContentLoaded", function(){
    var canvas = document.getElementById("canvasSpace");
    var ctx = canvas.getContext("2d");

    var shapes = [];

    // Event Listeners
    document.getElementById("loadButton").addEventListener("click", loadShapesFromXML, false);
    document.getElementById("shapeForm").addEventListener("submit", handleCreateShape, false);

    async function loadShapesFromXML() {
        try {
            var response = await fetch("shapes.xml");
            var xmlText = await response.text();

            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlText, "application/xml");

            var shapeNodes = xmlDoc.getElementsByTagName("shape");
            shapes = [];

            for (var shape of shapeNodes) {
                var type = shape.getElementsByTagName("type")[0].textContent.toLowerCase();
                var color = shape.getElementsByTagName("color")[0].textContent;
                var x = parseInt(shape.getElementsByTagName("x")[0].textContent);
                var y = parseInt(shape.getElementsByTagName("y")[0].textContent);
                var width = parseInt(shape.getElementsByTagName("width")[0].textContent);
                var height = parseInt(shape.getElementsByTagName("height")[0].textContent);

                shapes.push({ type, color, x, y, width, height });
            }

            drawAllShapes();
        } catch (err) {
            console.error("Error loading XML:", err);
        }
    }

    function handleCreateShape(event) {
        event.preventDefault();

        var type = document.getElementById("type").value.toLowerCase();
        var color = document.getElementById("color").value;
        var x = parseInt(document.getElementById("x").value);
        var y = parseInt(document.getElementById("y").value);
        var width = parseInt(document.getElementById("width").value);
        var height = parseInt(document.getElementById("height").value);

        shapes.push({ type, color, x, y, width, height });

        drawAllShapes();
    }

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
}, false);
