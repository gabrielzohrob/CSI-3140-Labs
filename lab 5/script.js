// Global blog posts array (starts empty)
var blogPosts = [
    {
    title: "Learning JavaScript",
    author: "Sarah Lee",
    content: "Today I learned how to use JavaScript to dynamically update a web page. I used document.createElement, appendChild, and added event listeners to make interactive elements.",
    date: new Date("2025-06-23")
  }, 
  {
    title: "Styling with CSS",
    author: "Jason Wu",
    content: "CSS makes everything look better! I added colors, shadows, padding, and flexbox layout to make my blog look clean and professional.",
    date: new Date("2025-06-24")
  }
];

// Function to display all blog posts
function displayPosts() {
  var latestPostsD = document.getElementById('latestpost');
  latestPostsD.innerHTML = "";

  for (var i = 0; i < blogPosts.length; i++) {
    var post = blogPosts[i];

    var postDiv = document.createElement('div');

    var titleEl = document.createElement('h3');
    titleEl.textContent = post.title;
    titleEl.addEventListener('click', (function(content) {
      return function() {
        alert(content);
      };
    })(post.content));

    var meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = `By ${post.author} on ${post.date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })}`;

    var preview = document.createElement('p');
    preview.className = 'content';
    preview.textContent = post.content.substring(0, 100) + "...";

    postDiv.appendChild(titleEl);
    postDiv.appendChild(meta);
    postDiv.appendChild(preview);
    latestPostsD.appendChild(postDiv);
  }
}

// Function to handle form submission
function handleAddPost(event) {
  event.preventDefault();

  var titleInput = document.getElementById("posttitle");
  var authorInput = document.getElementById("postauthor");
  var contentInput = document.getElementById("postcontent");

  var title = titleInput.value.trim();
  var author = authorInput.value.trim();
  var content = contentInput.value.trim();

  if (!title || !author || !content) {
    alert("Please fill in all fields.");
    return;
  }

  var newPost = {
    title: title,
    author: author,
    content: content,
    date: new Date()
  };

  blogPosts.unshift(newPost);
  displayPosts();

  titleInput.value = "";
  authorInput.value = "";
  contentInput.value = "";
}

// Set up event listener when the page loads
window.addEventListener('load', function () {
  displayPosts(); // shows nothing at first
  document.getElementById("createpost").addEventListener("click", handleAddPost);
});