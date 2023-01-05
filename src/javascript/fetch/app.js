const express = require('express');
const app = express();
const path = require('path');


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    next();
});


/* function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  } */
//, id:uuidv4()


let birdposts = [
    { username: "1", content: "Simon Ludwig" }

]

let userFollows = {}

let userPasswords = {
    "username1": 'password'
}
let currentUser = null

// content
app.post("/api/birdpost", (req, res) => {
    birdposts.push({ username: currentUser, content: req.query.content, id: 'aaa' }); //uuidv4()
    console.log(birdposts)
    res.send(200);
})

// FOLLOWING
// followuser=elonmusk
app.post("/api/userfollows", (req, res) => {
    if (Object.keys(userFollows).includes(currentUser)) {
        userFollows[currentUser] = {}
    }
    userFollows[currentUser][req.query.followuser] = true
    res.send(200);
})
// unfollowuser
app.post("/api/userunfollows", (req, res) => {
    try {
        delete userFollows[currentUser][req.query.unfollowuser]
    } catch (error) {
        res.send(404).send(error);
    }

    res.send(200);
})


// POST a POST
app.get('/api/birdposts', (req, res) => res.json(birdposts));
app.get('/api/birdpost/:emplId', (req, res) => {
    const matchingEmployees = birdposts.filter(a => a.username === req.params.emplId);
    if (matchingEmployees.length <= 0) {
        res.send(404);
    }
    res.json(matchingEmployees[0])
});

// GET POSTS
app.get('/api/getUserPosts/:username', (req, res) => {
    const matchingPosts = birdposts.filter(a => a.username === req.params.username);

    if (matchingPosts.length <= 0) {
        res.send(404);
    }
    res.json(matchingPosts)
});



// LOGIN
// username password
app.get('/api/login', (req, res) => {

    if (!Object.keys(userPasswords).includes(req.query.username)) {
        res.send(404).send('user not found') // user not found
    } else if (userPasswords[req.query.username] != req.query.password) {
        res.send(403).send('wrong password') // wrong password
    } else {
        currentUser = req.query.username
        res.send(200).send('login success') // login success
    }

});

// SIGNUP
// username password
app.get('/api/signup', (req, res) => {

    if (Object.keys(userPasswords).includes(req.query.username)) {
        res.send(404).send('user does already exist'); // user does already exist

    } else {
        userPasswords[req.query.username] = req.query.password
        res.send(200).send('signup success') // login success
    }

});





app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

module.exports = app;