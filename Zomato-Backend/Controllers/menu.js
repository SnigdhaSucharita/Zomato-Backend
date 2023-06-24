const Menu = require("../Models/menu");

exports.getMenuItemsByRestaurantId = (req, res) => {
    const { resId } = req.params;
    
    Menu.find({ restaurantId: resId}, {})
        .then(response => {
            res.status(200).json({message: "Menu Items Fetched Successfully", menuitems: response})
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}