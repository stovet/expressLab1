import express from 'express';
import cartRoutes from './routes/cart-items';

const app = express();

const port = 3000;

app.use(express.json());
app.use("/cart-items", cartRoutes);