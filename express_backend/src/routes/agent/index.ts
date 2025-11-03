import express from 'express';

const ROUTER = express.Router();

// Define your agent-related routes here
ROUTER.get('/main', async (req, res) => {
  res.send('Agent route is working!\n');
});

export default ROUTER;