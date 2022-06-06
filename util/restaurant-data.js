const fs= require('fs')
const path= require('path')

const pathWay = path.join(__dirname, "..",  'data', "restaurant.json")

function getStoredRestaurants(){

    const fileDate=fs.readFileSync(pathWay)
    const storedRestaurant=JSON.parse(fileDate)

    return storedRestaurant;
}

function writeRestaurant(storableRestaurant){
    fs.writeFileSync(pathWay, JSON.stringify(storableRestaurant))
}


module.exports ={
    getStoredRestaurants:getStoredRestaurants,
    writeRestaurant:writeRestaurant
}

//in the left you can change name , at the right part you cant otherwise you will need to change the name of function
//.. means that we wanna go on one level up