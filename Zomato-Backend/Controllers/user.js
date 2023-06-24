const User = require("../Models/user");

exports.postSignUp = (req, res) => {
    const { email, password, name } = req.body;

    const userObj = new User({
        email,
        password,
        name
    });

    userObj.save()
        .then(response => {
            res.status(200).json({
                message: "User Details Saved Successfully",
                Signup: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

}

exports.postLogIn = (req, res) => {
    const { email, password } = req.body;

    User.find({
        email,
        password
    })
    .then(response => {
        if(response.length > 0 ){
            res.status(200).json({
                message: "User Details Are Verified",
                isAuthenticated: true,
                Login: response
            }) 
        }else{
            res.status(200).json({
                message: "User Details Are Not Verified",
                isAuthenticated: false,
                Login: response
            }) 
        }

        
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
}