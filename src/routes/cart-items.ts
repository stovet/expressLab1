import express from 'express';
import Cart from '../models/cart'
const cartRoutes = express.Router();

const cart: Cart[] = [
    {id: 1, product: "coffee", price: 8, quantity: 1},
    {id: 2, product: "pizza", price: 5, quantity: 2},
    {id: 3, product: "Fancy eggs", price: 2, quantity: 1},
    {id: 4, product: "juice", price: 1, quantity: 3}
];

cartRoutes.get("/", function(req, res){
    let maxPriceParam: string = req.query.maxPrice as string;
    let fancyParam: string = req.query.prefix as string;
    let pageSizeParam: string = req.query.pageSize as string;
    if(maxPriceParam){
        let maxPrice: number = parseFloat(maxPriceParam);
        let filteredCart: Cart[] = cart.filter(item => {
            return item.price <= maxPrice;
        });
        res.json(filteredCart);
    } else if(fancyParam){
        let fancy: string = fancyParam;
        let fancyCart: Cart[] = cart.filter(item => {
            if(item.product.includes("Fancy", 0)){
               return item;
            };
    });
    res.json(fancyCart);
    } else if(pageSizeParam){
        let pageSize: number = parseInt(pageSizeParam);
        let maxCart: Cart[] = [];
        for(let i = 0; i < pageSize && i < cart.length; i++){
            maxCart.push(cart[i]);
        }
        res.json(maxCart);
    }
    
    else {
    res.status(200);
    res.json(cart);
    }    
});

cartRoutes.get("/:id", function(req, res){
    let inputId: number = parseInt(req.params.id);
    for(let i = 0; i < cart.length; i++){
        if(cart[i].id === inputId){
            res.json(cart[i]);
            res.status(200);
            break;
        }
    }
    res.status(404);
    res.send({"error": "ID Not Found"})
});


export default cartRoutes;