const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json("hello world")
})

app.get('/posts', (req, res) => {
  res.json([
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
  ])
})

app.listen(port, () => {
  console.log(`🔥 Backend listening on port ${port}`)
})
