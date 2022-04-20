document.getElementById("publishButton").addEventListener("click", createPost);

async function createPost(e) {
  e.preventDefault();
  let title = document.getElementById("titleInp").value;
  let name = document.getElementById("nameInp").value;
  let story = document.getElementById("storyInp").value;
  postPost(title, name, story);
}

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
      //   window.location = `posts/${id}`;
      let newPost = await getItem(id);
      const { title, name, story } = newPost;

      let titleOutput = document.createElement("h1");
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
    }
  } catch (err) {
    console.warn(err);
  }
}

// I have broken this - fix later
async function getAll() {
  try {
    const response = await fetch(`http://localhost:3000/posts`);
    const data = await response.json();
    document.getElementById("output").innerHTMl = data.value;
    console.log(data[0])
    for (let i = 0; i < data.length; i++) {
      const { title, name, story } = data[i];

      let titleOutput = document.createElement("h1");
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
    }
    return data;
  } catch (err) {
    console.warn(err);
  }
}


async function getItem(id) {
  try {
    const response = await fetch(`http://localhost:3000/posts/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
  }
}

// async function deleteBook(id) {
//   try {
//     const options = { method: "DELETE" };
//     await fetch(`http://localhost:3000/books/${id}`, options);
//     window.location.hash = `#books`;
//   } catch (err) {
//     console.warn(err);
//   }
// }
