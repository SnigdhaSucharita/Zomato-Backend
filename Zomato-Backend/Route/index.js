const express = require ("express");

const locationController = require("../Controllers/location");
const restaurantController = require("../Controllers/restaurant");
const mealtypeController = require("../Controllers/meals");
const userController = require("../Controllers/user");
const menuController = require("../Controllers/menu");

const route = express.Router();

route.get('/location', locationController.getLocations);
route.get('/restaurant/:locId', restaurantController.RestaurantsByLocationId);
route.get('/mealtype', mealtypeController.getMealtype);
route.post('/signup', userController.postSignUp);
route.post('/login', userController.postLogIn);
route.post('/filter', restaurantController.postFilterRestaurant);
route.get('/resDetails/:id', restaurantController.getRestaurantDetailsById);
route.get('/menu/:resId', menuController.getMenuItemsByRestaurantId);


module.exports = route;