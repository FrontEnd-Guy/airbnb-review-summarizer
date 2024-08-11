import fetch from 'node-fetch';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import summaryRoutes from './routes/summaryRoutes.js'; 
import errorHandler from './middlewares/errorHandler.js';

const port = process.env.PORT || 3001;

const app = express();

const corsOptions = {
  origin: process.env.ALLOWED_DOMAINS.split(","),
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(summaryRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
