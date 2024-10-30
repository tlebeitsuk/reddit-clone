const data = [
  {
    id: 1,
    title: "Feber: din dagliga källa till allt om teknik, bilar, prylar, spel, vetenskap och populärkultur",
    url: "https://feber.se",
    votes: 24,
  },
  {
    id: 2,
    title: "The Modern JavaScript Tutorial",
    url: "https://javascript.info",
    votes: 612,
  },
  {
    id: 3,
    title: "Daily.dev - Where developers suffer together",
    url: "https://daily.dev",
    votes: -8,
  },
  {
    id: 4,
    title: "Hacker News",
    url: "https://news.ycombinator.com",
    votes: 59,
  },
]

function renderList() {
  const listContainer = document.querySelector("ul")

  // Delete items before render
  listContainer.innerHTML = ""

  data.forEach(post => {
    const listItem = document.createElement('li')
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

function upVote(number) {
  const votes = document.querySelector("#votes-" + number)
  votes.innerText = Number(votes.innerText) + 1
}

function downVote(number) {
  const votes = document.querySelector("#votes-" + number)
  votes.innerText = Number(votes.innerText) - 1
}

function newPost() {
  const title = document.querySelector("#post-title")
  const url = document.querySelector("#post-url")

  // Add post to data array
  data.push({
    id: data.length + 1,
    title: title.value,
    url: url.value,
    votes: 0,
  })

  // Reset inputs
  title.value = ""
  url.value = ""

  renderList()
}
