document.getElementById("publishButton").addEventListener("click", createPost);

async function createPost(e) {
  e.preventDefault();
  let title = document.getElementById("titleInp").value;
  let name = document.getElementById("nameInp").value;
  let story = document.getElementById("storyInp").value;
  if (title.length > 0 && name.length > 0 && story.length > 0) {
    postPost(title, name, story);
  } else {
    alert(
      "Title, name and story is mandatory to make a post. Please try again."
    );
  }
}

// Used to create new post and direct to page path
async function postPost(title, name, story) {
  try {
    let newPost = {
      title: title,
      name: name,
      story: story,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    };

    const response = await fetch("http://localhost:3000/posts", options);
    const { id, err } = await response.json();
    if (err) {
      throw Error(err);
    } else {
      // Go to new page
      window.open(`http://localhost:8080/post.html?id=${id}`, "_blank");
    }
  } catch (err) {
    console.warn(err);
  }
}

// Used to populate the index page with content from DB
async function getAll() {
  try {
    const response = await fetch(`http://localhost:3000/posts`);
    const data = await response.json();
    document.getElementById("output").innerHTMl = data.value;

    for (let i = 0; i < data.length; i++) {
      const { title, name, story } = data[i];

      let titleOutput = document.createElement("h2");
      titleOutput.textContent = title;
      let nameOutput = document.createElement("h3");
      nameOutput.textContent = name;
      let storyOutput = document.createElement("p");
      storyOutput.textContent = story;

      let newPostDiv = document.createElement("div");
      newPostDiv.appendChild(titleOutput);
      newPostDiv.appendChild(nameOutput);
      newPostDiv.appendChild(storyOutput);
      newPostDiv.setAttribute("class", "newPostDiv");
      document.getElementById("output").prepend(newPostDiv);
    }
    return data;
  } catch (err) {
    console.warn(err);
  }
}

async function getItem() {
  let params = new URLSearchParams(document.location.search);
  let id = params.get("id");
  try {
    const response = await fetch(`http://localhost:3000/posts/${id}`);
    const data = await response.json();
    const { title, name, story } = data;

    let titleOutput = document.createElement("h2");
    titleOutput.textContent = title;
    let nameOutput = document.createElement("h3");
    nameOutput.textContent = name;
    let storyOutput = document.createElement("p");
    storyOutput.textContent = story;

    let newPostDiv = document.createElement("div");
    newPostDiv.appendChild(titleOutput);
    newPostDiv.appendChild(nameOutput);
    newPostDiv.appendChild(storyOutput);
    document.getElementById("output").prepend(newPostDiv);
  } catch (err) {
    console.warn(err);
  }
}
