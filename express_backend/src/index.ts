import express from 'express';
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import "dotenv/config"
import AGENT_ROUTER from './routes/agent/index.js';


const app = express();
const PORT = process.env.PORT || 8000;
// Log all requests
app.use(morgan('dev'));

// Configure CORS
app.use(cors({ credentials: true}));

// Apply security headers
app.use(helmet());



//middleware funcs


// routes
app.use('/agent', AGENT_ROUTER);



app.get('/', async (req, res) => {
  res.send('Hello World!\n');
});



app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(PORT, () => {
  console.log('App listening on port',PORT);
});