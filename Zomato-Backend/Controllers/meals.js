const Mealtypes = require ("../Models/mealtype");

exports.getMealtype = (req, res) => {
    
    Mealtypes.find()
        .then(response => {
            res.status(200).json({message: "Success", mealtypes: response})
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}