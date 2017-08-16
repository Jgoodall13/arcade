const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const myDb = require("./functions.js");
const Fn = require("./hashAndCheck.js");
const cookieSession = require('cookie-session');
const cookieParser = require("cookie-parser");
const uidSafe = require('uid-safe');
const secrets = require('./secrets.json');
const path = require('path');
const fs = require('fs');
const server = require('http').Server(app);

if (process.env.NODE_ENV != 'production') {
    app.use(require('./build'));
}

app.use(cookieSession({
    secret: 'Cookies are cool',
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.post('/register-user', function(req, res){
    Fn.hashPassword(req.body.password).then((result) => {
        myDb.insertUser(req.body,result).then((result)=> {
            console.log("This is the user " + req.session.user);
            req.session.user = {
                user: true,
                email: req.body.email,
                first: req.body.first,
                last:req.body.last,
                id: result
            };
            res.redirect("/profile");

        });
    });
});

app.post('/login-user', function(req, res){
    myDb.readUser().then((rows)=> {
        rows.forEach((item) => {
            if(item.email == req.body.email){
                Fn.checkPassword(req.body.password,item.password).then((result) => {
                    if (result) {
                        console.log("The results are " + result);
                        req.session.user = {
                            user: true,
                            email: item.email,
                            first: item.first,
                            last:item.last,
                            id: item.id
                        };
                        res.redirect("/");
                    } else {
                        res.json({success:false});
                    }
                });
            }
        });
    });
});

app.get('/user', function(req, res){
    myDb.getUser(req.session.user.id).then((row) => {
        res.json(row);
    });
});

app.get('/welcome', function(req, res){
    console.log("/welcome");
    if(req.session.user){
        res.redirect("/profile");
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('/logout', function(req,res) {
    console.log('User logging out');
    req.session = null;
    res.redirect('/');
})

app.get('*', function(req, res) {
    if(!req.session.user){
        res.redirect("/welcome");
    }else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.listen(8080, function() {
    console.log("I'm listening old friend.")
});
