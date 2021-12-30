import express from 'express';
import Cart from '../models/cart'
const cartRoutes = express.Router();

const carts: Cart[] = [
    {id: 1, product: "coffee", price: 8, quantity: 1},
    {id: 2, product: "pizza", price: 5, quantity: 2},
    {id: 3, product: "Fancy eggs", price: 2, quantity: 1},
    {id: 4, product: "juice", price: 1, quantity: 3}
];
let nextId: number = 5;

cartRoutes.get("/", function(req, res){
    let maxPriceParam: string = req.query.maxPrice as string;
    let fancyParam: string = req.query.prefix as string;
    let pageSizeParam: string = req.query.pageSize as string;
    if(maxPriceParam){
        let maxPrice: number = parseFloat(maxPriceParam);
        let filteredCart: Cart[] = carts.filter(item => {
            return item.price <= maxPrice;
        });
        res.json(filteredCart);
    } else if(fancyParam){
        let fancy: string = fancyParam;
        let fancyCart: Cart[] = carts.filter(item => {
            if(item.product.includes("Fancy", 0)){
               return item;
            };
    });
    res.json(fancyCart);
    } else if(pageSizeParam){
        let pageSize: number = parseInt(pageSizeParam);
        let maxCart: Cart[] = [];
        for(let i = 0; i < pageSize && i < carts.length; i++){
            maxCart.push(carts[i]);
        }
        res.json(maxCart);
    }
    
    else {
    res.status(200);
    res.json(carts);
    }    
});

cartRoutes.get("/:id", function(req, res){
    let inputId: number = parseInt(req.params.id);
    for(let i = 0; i < carts.length; i++){
        if(carts[i].id === inputId){
            res.json(carts[i]);
            res.status(200);
            break;
        }
    }
    res.status(404);
    res.send({"error": "ID Not Found"})
});

cartRoutes.post("/", function(req, res){
    let newCart: Cart = req.body;
    newCart.id = nextId;
    nextId += 1;
    carts.push(newCart);
    res.status(201);
    res.json(carts);
});

cartRoutes.put("/:id", function(req, res){
    let inputId: number = parseInt(req.params.id);
    let newCart: Cart = req.body;
    newCart.id = inputId;
    for(let i = 0; i < carts.length; i++){
        if(carts[i].id === inputId){
            carts.splice(i, 1, newCart)
        }
    }
    res.status(200);
    res.json(carts);
});


cartRoutes.delete("/:id", function(req, res){
    let inputId: number = parseInt(req.params.id);
    let cartIndex = carts.findIndex(cart => cart.id === inputId);
    carts.splice(cartIndex, 1);
    res.status(204);
    res.json("");
});

export default cartRoutes;