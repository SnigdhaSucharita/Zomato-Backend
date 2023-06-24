const Restaurants = require ("../Models/restaurant");

exports.RestaurantsByLocationId = (req, res) => {
    const { locId } = req.params;
    
    Restaurants.find({ city: locId}, {})
        .then(response => {
            res.status(200).json({message: "Restaurants Fetched Successfully", restaurants: response})
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}

exports.postFilterRestaurant = (req, res) => {
    var { mealtype, location, cuisine, hcost, lcost, sort, page } = req.body;

    sort = sort ? sort: 1;     // 1 -> Ascending Order, -1 -> Descending Order
    page = page ? page: 1;     // Starting from pagenumber 1

    const itemsPerPage = 2;
    let startIndex = page * itemsPerPage - itemsPerPage;
    let endIndex = page * itemsPerPage;

    let filterObj = {};

    mealtype && (filterObj["type.mealtype"] = mealtype);
    location && (filterObj["city"] = location);
    cuisine && (filterObj["Cuisine.cuisine"] = {$in: cuisine});
    lcost && hcost && (filterObj["cost"] = {$gte: lcost, $lte: hcost});

    console.log(filterObj);

    Restaurants.find(filterObj).sort({ cost: sort })
        .then(response => {
            const filteredResponse = response.slice(startIndex, endIndex);
            res.status(200).json({message: "Restaurants Fetched Successfully", restaurants: filteredResponse})
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}

exports.getRestaurantDetailsById = (req, res) => {
    const { id } = req.params;

    Restaurants.find({ _id: id}, {})
        .then(response => {
            res.status(200).json({message: "Restaurant Details Fetched Successfully", restaurant: response})
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })


}