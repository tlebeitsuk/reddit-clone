const express = require('express')
const app = express()
const port = 3000

// Middleware for CORS
const cors = require('cors')
app.use(cors())

// Middleware to parse JSON bodies
app.use(express.json())

// Data array (in-memory "database"), could be replaced by an real database like sqlite or postgresql/mysql
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

app.get('/', (req, res) => {
  res.json("hello world")
})

app.get('/posts', (req, res) => {
  res.json(data)
})

app.patch('/posts/:id/upvote', (req, res) => {
  // Get post id from route param
  const postId = Number(req.params.id)
  // Find post in data array with same id
  const post = data.find(post => post.id === postId)
  // Update post votes
  post.votes += 1
  // Send back an empty response
  res.json()
})

app.patch('/posts/:id/downvote', (req, res) => {
  // Get post id from route param
  const postId = Number(req.params.id)
  // Find post in data array with same id
  const post = data.find(post => post.id === postId)
  // Update post votes
  post.votes -= 1
  // Send back an empty response
  res.json()
})

app.post('/posts', (req, res) => {
  // Get title and url from request body
  const { title, url } = req.body
  // Check if title or url is empty
  if (!title || !url) {
    return res.status(400).json({ error: "Title and URL is required" })
  }
  // Create next postId
  const postId = data.length + 1
  // Add to TOP of data-array
  data.unshift({
    id: postId,
    title,
    url,
    votes: 0,
  })
  // Send back an empty response
  res.json()
})

app.listen(port, () => {
  console.log(`🔥 Backend listening on port ${port}`)
})
