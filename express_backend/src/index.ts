import express from 'express';
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import "dotenv/config"


const app = express();
const PORT = process.env.PORT || 8000;
// Log all requests
app.use(morgan('dev'));

// Configure CORS
app.use(cors({ credentials: true}));

// Apply security headers
app.use(helmet());




app.get('/', async (req, res) => {
  res.send('Hello World!\n');
});

app.listen(PORT, () => {
  console.log('App listening on port',PORT);
});