import "./config/env.js";
import express from 'express';
import cors from 'cors';
import generateRoutes from './routes/generate.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/generate', generateRoutes);

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
})