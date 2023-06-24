const express = require("express");
const app = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";

app.get("/login/success", (req, res) => {
    if(req.user){
        res.status(200).json({
            success: true,
            message: "Successfully logged in",
            user: req.user
        });
    } 
})

app.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "Failure",
    });
})

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
})

app.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: CLIENT_URL, 
    failureRedirect: '/login'
  }),
  
);

module.exports = app;