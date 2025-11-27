const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Aise Tukur Tukur kya Dekhte ho ji.. Nhi bujha rha hai ki kam kr rhe hai CICD ka.');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
