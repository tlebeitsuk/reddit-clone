const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')
app.use(cors())

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

app.listen(port, () => {
  console.log(`🔥 Backend listening on port ${port}`)
})
