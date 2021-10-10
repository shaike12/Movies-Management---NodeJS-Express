var express = require('express');
var router = express.Router();
const usersBL = require('../Bl/usersBL')


/* GET users listing. */
router.get('/', function(req, res, next) {

    
  res.render('login', {});
});

router.post('/', async function(req, res, next) {
    let {username, password} = req.body
    let user = await usersBL.checkUsernameAndPass(username, password)
    if (user){
        req.session.user = user
        res.redirect("/main")
    }
    else {
        res.redirect("/login")
    }
});


module.exports = router;
