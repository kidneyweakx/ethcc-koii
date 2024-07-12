const express = require('express');

const app = express();
const port = 3000;

// make a queue of tasks and let the server handle them
// create a queue of tasks
let taskQueue = ['1', '2', '3', '4', '5'];
app.get('/', (req, res) => {
  taskQueue.push(req.query);
})

app.get('/task', (req, res) => {
  return taskQueue.pop();
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
