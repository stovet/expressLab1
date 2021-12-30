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
            
            //return item.product === fancy;
    });
    res.json(fancyCart);
}
    else {
    res.status(200);
    res.json(cart);
    }  
    // if(fancyParam){
    //     let fancyCart: Cart[] = cart.filter(item => {
    //         if(item.product.indexOf("Fancy", 0)){
    //            return item;
    //         };
    //     });
    //     res.json(fancyCart);
    // } else {
    //     res.status(200);
    //     res.json(cart);
    //     }    
});
// cartRoutes.get("/", function(req, res){
//     let fancyParam: string = req.query.prefix as string;
//     if(fancyParam){
//         let fancyCart: Cart[] = cart.filter(item => {
//             if(item.product.includes("Fancy", 0)){
//                return item;
//             };
//         });
//         res.json(fancyCart);
//     } else {
//         res.status(200);
//         res.json(cart);
//         }    
//     });

export default cartRoutes;