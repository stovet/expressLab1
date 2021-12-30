import express from 'express';
import Cart from '../models/cart'
const cartRoutes = express.Router();

const cart: Cart[] = [
    {id: 1, product: "coffee", price: 8, quantity: 1},
    {id: 2, product: "pizza", price: 5, quantity: 2},
    {id: 3, product: "eggs", price: 2, quantity: 1},
    {id: 4, product: "juice", price: 1, quantity: 3}
];

cartRoutes.get("/", function(req, res){
    res.json(cart);
    res.status(200);
})


export default cartRoutes;