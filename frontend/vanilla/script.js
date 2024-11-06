async function renderList() {
  // Get data from backend
  const response = await fetch("http://127.0.0.1:3000/posts")
  const data = await response.json()

  // Get list container element
  const listContainer = document.querySelector("ul")

  // Delete items before render
  listContainer.innerHTML = ""

  // Create list items
  data.forEach((post) => {
    const listItem = document.createElement("li")
    listItem.className = "list-group-item"

    listItem.innerHTML = `
      <div class="row align-items-center">
        <a class="col" target="_blank" href="${post.url}">
          <h2>${post.title}</h2>
          <span>${post.url}</span>
        </a>
        <div id="voting" class="col-2">
          <div class="row text-center justify-content-center">
            <button type="button" class="btn" onclick="upVote(${post.id})">
              <ion-icon name="caret-up"></ion-icon>
            </button>
            <p class="votes" id="votes-${post.id}">${post.votes}</p>
            <button type="button" class="btn" onclick="downVote(${post.id})">
              <ion-icon name="caret-down"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    `
    listContainer.appendChild(listItem)
  })
}

renderList()

async function upVote(postId) {
  // Send PATCH request to backend to upvote post
  await fetch(`http://localhost:3000/posts/${postId}/upvote`, {
    method: "PATCH",
  })

  // Re-render list
  renderList()
}

async function downVote(postId) {
  // Send PATCH request to backend to downvote post
  await fetch(`http://localhost:3000/posts/${postId}/downvote`, {
    method: "PATCH",
  })

  // Re-render list
  renderList()
}

async function newPost() {
  // Get input values
  const title = document.querySelector("#post-title")
  const url = document.querySelector("#post-url")

  // Send POST request to backend to create new post
  await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title.value,
      url: url.value,
    })
  })

  // Reset inputs
  title.value = ""
  url.value = ""

  // Re-render list
  renderList()
}
