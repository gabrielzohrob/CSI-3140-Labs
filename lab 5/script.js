var blogPosts = [];

function displayPosts(){
    var latestPostsD =  document.getElementById('latestpost');
    latestPostsD.innerHTML = "";

    for(var i = 0; i < blogPosts.length; i++){
        var postDiv = document.createElement('div');
        postDiv.style.backgroundColor = "white";
        postDiv.style.borderRadius = "10px";
        postDiv.style.padding = "20px";
        postDiv.style.marginBottom = "20px";
        postDiv.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";

        var titleEl = document.createElement('h3');
        titleEl.textContent = post.title;
        titleEl.style.color = "#4f46e5";
        titleEl.style.cursor = "pointer";
        titleEl.addEventListener('click', () => {
            alert(post.content);
        });

        const meta = document.createElement('p');
        meta.style.color = "#777";
        meta.style.fontSize = "0.9em";
        meta.style.marginBottom = "10px";

        meta.textContent = `By ${post.author} on ${post.date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })}`;

        const preview = document.createElement('p');
        preview.textContent = post.content.substring(0, 100) + "...";

        // Add elements to post container
        postDiv.appendChild(titleEl);
        postDiv.appendChild(meta);
        postDiv.appendChild(preview);

        // Add post to main container
        latestPostsD.appendChild(postDiv);

        document.getElementById("createpost").addEventListener("click", handleAddPost, false);


    }
}

function handleAddPost(event){
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


window.addEventListener('load', displayPosts, false);