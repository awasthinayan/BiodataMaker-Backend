import express from 'express';
import { PORT } from './Config/serverConfig.js';
import connectDB from './Config/DBConfig.js';
import Routes from './Routes/UserRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import BiodataRoutes from './Routes/Biodata.routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));

// Note: limit can be lower now — photos go directly to Cloudinary, not through body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// No need for static uploads folder — Cloudinary handles storage

connectDB();

app.use('/v1/api', Routes);
app.use('/v1/api/biodata', BiodataRoutes);

app.get('/debug/env', (req, res) => {
  res.json({
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'NOT SET',
    port:       process.env.PORT,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});