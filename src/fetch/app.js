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



//helper functions
function getDatetime(){
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1; // January is 0
    const day = today.getDate();
    const hours = today.getHours();
    const minutes = today.getMinutes();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedDate
}

function chooseNRandom(arr, x){
        const res = [];
        for(let i = 0; i < x; ){
           const random = Math.floor(Math.random() * arr.length);
           if(res.indexOf(arr[random]) !== -1){
              continue;
           };
           res.push(arr[random]);
           i++;
        };
        return res;
};


function getAllPosts(){
    allPosts = []

    for (const value of Object.values(postsPerUser)) {
        for (var i =0;i<value.length;i++){
            allPosts.push(value[i])
        }
      }
    
    return allPosts

}
function getPostOfFollowing(username, numberPosts){
    let posts = []
    let i = 0
    var k = 0;
    
    while (numberPosts>i){
        // iterates over users and appends one post per user (alternating), until numberPosts is satisfied
        let noPostsLeft = true
        for (var j =0;j<userFollows[username].length;j++) {
            const userFollow = userFollows[username][j]
            if(!Object.keys(postsPerUser).includes(userFollow) || postsPerUser[userFollow].length <= k){
       
                continue
            }else{
                noPostsLeft = false
                posts.push(postsPerUser[userFollow][k])
                i+=1
            }

           
        }
        k+=1
        if (noPostsLeft){
            break
        }
     
    }
    return posts
    
}

function extractHashtags(text) {
    const hashtags = [];
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
      if (words[i].startsWith('#')) {
       
       
        hashtags.push(words[i].slice(1,words[i].length));
      }
    }
    return hashtags;
  }

  function extractMentions(text) {
    const hashtags = [];
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
      if (words[i].startsWith('#')) {
       
       
        hashtags.push(words[i].slice(1,words[i].length));
      }
    }
    return hashtags;
  }
function searchAllPosts(key, searchterm, allPosts){
    let returnPosts = []
    for (var i =0;i<allPosts.length;i++){
        let post = allPosts[i]
        
        if (Object.keys(post).includes(key)){
            for (var j =0;j<post[key].length;j++){
                if (post[key][j].includes(searchterm)){
                    returnPosts.push(post)
                }
            }
        }
    }
    return returnPosts
  
}
function search(searchterm){
    const posts = getAllPosts()
    let returnPosts = []
    if (searchterm.startsWith('#')){
        returnPosts= returnPosts.concat(searchAllPosts('hashtags',searchterm.slice(1), posts))
    }else if (searchterm.startsWith('@')){
        returnPosts=returnPosts.concat(searchAllPosts('mentions',searchterm.slice(1), posts))
    }else{
        returnPosts=returnPosts.concat(searchAllPosts('hashtags',searchterm, posts))
        returnPosts=returnPosts.concat(searchAllPosts('mentions',searchterm, posts))
        for (const key of Object.keys(postsPerUser)) {
            if (key.includes[searchterm]){
                returnPosts = returnPosts.concat(postsPerUser[key])
            }
          }
    }
    return returnPosts
}



/* let birdposts = 
[
    { username: "1", content: "Simon Ludwig" },
    { username: "username1", content: "Simon Ludwig" },
    { username: "username2", content: "Simon Ludwig" }

] */
let postsPerUser = {
    'SpaceX':[
        { hashtags:['hashtag'], username: 'SpaceX', content: "Falcon 9 launches SpaceX’s sixth dedicated #hashtag smallsat rideshare mission – completing our 200th successful launch!", id: "vnufydfoiww", datetime:getDatetime() },
        { username: 'SpaceX', content: "For SpaceX’s first launch of 2023, we’re targeting 9:56 a.m. ET on Tuesday, January 3 for Falcon 9’s sixth dedicated smallsat rideshare mission to orbit http://spacex.com/launches", id: "nvyuyuwlpper", datetime:getDatetime() },
        { username: 'SpaceX', content: "On average, SpaceX launched every 6 days from one of our three sites with 92% of missions completed with flight-proven first stage rocket boosters, and Falcon 9 now holds the world record for most launches of a single vehicle type in a single year", id: "93g9bvee", datetime:getDatetime() },
        { mentions:['space_station'], username: 'SpaceX', content: "Most importantly, SpaceX successfully delivered our customers’ payloads to orbit, deployed additional Starlink satellites that add more capacity to our network, and flew critical cargo and astronauts to the @space_station and safely returned them back home Earth", id: "ncyyryowowui3", datetime:getDatetime() },
        { username: 'SpaceX', content: "Following stage separation, Falcon 9’s first stage will land on the A Shortfall of Gravitas droneship which is stationed down range in the Atlantic Ocean", id: "bvyfuixyebrq", datetime:getDatetime() },
        { username: 'SpaceX', content: "Targeting Wednesday, December 28 for Falcon 9’s launch of 54 Starlink satellites to low-Earth orbit from SLC-40 in Florida; teams are keeping an eye on weather conditions for booster recovery → http://spacex.com/launches", id: "vnfuytshrhyw", datetime:getDatetime() },
        { username: 'SpaceX', content: "Falcon 9’s first stage has landed on the Just Read the Instructions droneship, completing the 15th launch and landing of this booster!", id: "sdngbbuibpve", datetime:getDatetime() },
    ],
    
    'LexFridman':[
        { username: 'LexFridman', content: "Here's my conversation with Guido van Rossum creator of Python, one the most popular and impactful programming languages in the world. We talk all about the future of programming, from the philosophical to the technical. This was super fun!", id: "sdbvubsdilba", datetime:getDatetime() },
        { mentions:['GMHikaru', 'MagnusCarlsen'] ,username: 'LexFridman', content: "Here's my conversation with Hikaru Nakamura @GMHikaru, one of the best chess players in the world & a top chess streamer. We talk about his games with @MagnusCarlsen & others, plus psychology of chess & the cheating scandal. ", id: "sdbvruietty", datetime:getDatetime() },
        { hashtags:['hashtag'],username: 'LexFridman', content: "Sometimes a kind word from a stranger can make #hashtag me completely forget whatever concerns were weighing heavy on my heart. Kindness like that is a small gift that can make the biggest difference. I was lucky to get that today. I'll try to pass it on tomorrow.", id: "sbdsbddfjkbsukjdfa", datetime:getDatetime() },
        { username: 'LexFridman', content: "When I program, I'm leveraging the work of millions of other people, including code in libraries, compilers, operating systems, computer networks, and the complex web of hardware infrastructure that makes the whole thing run. It's fun being 1 curious human among 8 billion others.", id: "sdkbfnsuidbifld", datetime:getDatetime() },
        { username: 'LexFridman', content: "I'm excited for Twitter in 2023. Improving it is fundamentally a collection of tough engineering problems. I refuse to believe that large companies can't innovate by doing great novel design and engineering. They can. It's a question of leadership and culture.", id: "asbsgshdgbioa", datetime:getDatetime() },
        { username: 'LexFridman', content: "Food poisoning floored me for several days. It's funny that one late-night snack took me on a wild mental journey 🤣 It was fun to learn the places my mind will go when in fever. I wasn't able to think, but was able to distinctly appreciate the finiteness and absurdity of life.", id: "dwagbsgdbogasg", datetime:getDatetime() },
    ],
    'GMHikaru':[
        { username: 'GMHikaru', content: "Well that was an amazing World Cup! And now for something a little more hype, can we have some energy for CHESS?!?", id: "sbwddghhahfagg", datetime:getDatetime() },
        { username: 'GMHikaru', content: "I'm still in Hawaii, but I'll be back and will put in some hours before getting on another plane and heading halfway 'round the world. Hope to see you all in chat this week!", id: "sd0ysgehsehe", datetime:getDatetime() },
        { username: 'GMHikaru', content: "I came up a little bit short today in the Chess Global Championship but credit to Wesley So for his consistent play. Winning 1/2 of the major events over the last two weeks is more than I could have expected as a mere streamer!", id: "802segfhseghwege", datetime:getDatetime() },
        { username: 'GMHikaru', content: "tarting day 2 of Fischer Random World Chess Champs. All of your support helped and I'm in the lead. Playing the fierce BigFish today, Fedoseev. Odd pairings mean I play him all day today.", id: "abwogfaegrgth", datetime:getDatetime() },
       
    ],
    'MagnusCarlsen':[
        { username: 'MagnusCarlsen', content: "Good thing the Inter game is not close, so I can focus on chess and Barcelona on the Europa League", id: "awfagahdhr", datetime:getDatetime() },
        { username: 'MagnusCarlsen', content: "There is a lot of smart people in Chess. They’ll figure it out at some point. I am sure.", id: "znbdrjzurzds", datetime:getDatetime() },
        { username: 'MagnusCarlsen', content: "Now that Alireza has gone back to his bullet roots, I'm sure he'll be inspired and win tomorrow!", id: "AGWjdtjfft", datetime:getDatetime() },

    ],
    'username1':[
        { username: 'username1', content: "Good thing the Inter game is not close, so I can focus on chess and Barcelona on the Europa League", id: "awfagahdhr", datetime:getDatetime() },
        { username: 'username1', content: "There is a lot of smart people in Chess. They’ll figure it out at some point. I am sure.", id: "znbdrjzurzds", datetime:getDatetime() },
        { username: 'username1', content: "Now that Alireza has gone back to his bullet roots, I'm sure he'll be inspired and win tomorrow!", id: "AGWjdtjfft", datetime:getDatetime() },
    ]
}

let userFollows = {
    "username1":["MagnusCarlsen","LexFridman","SpaceX"]
}

let userPasswords = {
    "username1": 'password',
    
}

// FOLLOWING
// user, followuser=elonmusk
app.post("/api/userfollows", (req, res) => {
    if (!Object.keys(userFollows).includes(req.query.user)) {
        userFollows[req.query.user] = []
    }
    userFollows[req.query.user].push(req.query.followuser)
    res.send(200);
})
// user, unfollowuser
app.post("/api/userunfollows", (req, res) => {
    try {
        // delete userFollows[req.query.user][req.query.followuser]
       
        userFollows[req.query.user] = userFollows[req.query.user].filter(x => x !== req.query.followuser);
        res.send(200);
    } catch (error) {
        res.send(404).send(error);
    }

    
})

// POST a POST
// user, content
app.post("/api/birdpost", (req, res) => {
    if (!Object.keys(postsPerUser).includes(req.query.user)){
        postsPerUser[req.query.user] = []
    }
    const hashtags = extractHashtags(req.query.content)
    const mentions = extractMentions(req.query.content)
    postsPerUser[req.query.user].push({ username: req.query.user, content: req.query.content, id: req.query.uuid, datetime:getDatetime(), hashtags:hashtags, mentions:mentions}); //uuidv4()
    console.log(postsPerUser)
    res.send(200);
})


/* app.get('/api/birdposts', (req, res) => res.json(postsPerUser));

app.get('/api/getbirdpost/:emplId', (req, res) => {
    const matchingEmployees = postsPerUser.filter(a => a.username === req.params.emplId);
    if (matchingEmployees.length <= 0) {
        res.send(404);
    }
    res.json(matchingEmployees[0])
}); */

// GET POSTS
app.get('/api/getUserPosts/:username', (req, res) => {
  /*   const matchingPosts = postsPerUser.filter(a => a.username === req.params.username); */

    if (!Object.keys(postsPerUser).includes(req.params.username)){
        res.send(400);
    }else{
        res.json(postsPerUser[req.params.username])
    }

 
   
});

app.get('/api/getUserFeed/:username', (req, res) => {

    const username = req.params.username
    let r = null
    let allPosts = getAllPosts()
    if (!Object.keys(userFollows).includes(username) || userFollows[username].length == 0){
        // get random posts
        r = chooseNRandom(allPosts, 10)
        
    }else{ // get latest posts of people following
        r = getPostOfFollowing(username, 10)
    }
   
    res.json(r)
});
// check if user follows
app.get('/api/getUserFollowing/:username/:followuser', (req, res) => {

    const username = req.params.username
    const followuser = req.params.followuser
    console.log(userFollows[username])
    console.log(userFollows[username],userFollows[username].includes(followuser),followuser)
    if (!Object.keys(userFollows).includes(username)) {
        res.json(false)
    }else if(!userFollows[username].includes(followuser)){
        res.json(false)
    }else{
        res.json(true)
    }
   
});

app.get('/api/search/:searchterm', (req, res) => {

    const searchterm = req.params.searchterm
    res.json(search(searchterm))
});




// LOGIN
// username password
app.get('/api/login', (req, res) => {

    if (!Object.keys(userPasswords).includes(req.query.username)) {
        res.send(404).send('user not found') // user not found
    } else if (userPasswords[req.query.username] != req.query.password) {
        res.send(403).send('wrong password') // wrong password
    } else {
        res.json({'w':'e'})
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