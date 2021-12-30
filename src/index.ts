import express from 'express';
import cors from 'cors';
import cartRoutes from './routes/cart-items';

const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/cart-items", cartRoutes);



app.listen(port, function(){
    console.log(`Listening on ${port}`);
});