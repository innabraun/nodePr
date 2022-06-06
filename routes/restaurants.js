const express=require("express");
const router=express.Router();
const resData=require('../util/restaurant-data')
const uuid = require('uuid')



router.get("/restaurants", function(req, res){
    const restaurantsStored=resData.getStoredRestaurants()

    let order= req.query.order
    let nextOrder= "desc"

    if(order !== "asc" && order !== "desc") {
        order = "asc";
    }

    if(order==="desc"){
        nextOrder = "asc"
    }

    restaurantsStored.sort(function(resA, resB){
        if(order==="asc" && resA.name>resB.name){
            return 1;
        }else if(order=== "desc" && resB.name>resA.name ){
            return 1 ;
        }
        return -1;
    })

    res.render("restaurants",
        {
            numberOfRestaurants: restaurantsStored.length,
            restaurants:restaurantsStored,
            nextOrder: nextOrder
        })
    // res.sendFile(directPath("restaurants.ejs"))
})

router.get('/restaurants/:id', function (req,res){
    const restaurantId=req.params.id; //params are object

    const restaurantsStored=resData.getStoredRestaurants()

    for(const restaurant of restaurantsStored){

        if(restaurant.id===restaurantId){
            return res.render('restaurants-details', {restaurant:restaurant})
        }
    }
    res.status(404).render("404error");
})

router.get("/recommend", function(req, res){
    res.render("recommend")
})

router.post("/recommend", function(req, res){
    const restaurant=req.body;
    restaurant.id=uuid.v4();
    const restaurantsStored=resData.getStoredRestaurants()
    restaurantsStored.push(restaurant)

    resData.writeRestaurant(restaurantsStored);

    res.redirect("/confirm");

})

router.get("/confirm", function(req, res){
    res.render("confirm")
    // res.sendFile(directPath("confirm.ejs"))
})

module.exports = router