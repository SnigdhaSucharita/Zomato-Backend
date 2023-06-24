const Locations = require ("../Models/location");

exports.getLocations = (req, res) => {
    
    Locations.find({}, {})
        .then(response => {
            res.status(200).json({message: "Locations Fetched Successfully", loc: response})
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}