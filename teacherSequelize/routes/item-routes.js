// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var fs = require('fs');
var multer = require('multer');

// Routes
// =============================================================

module.exports = function(app) {

  //route to retrieve all the images from the db
  app.get("/api/image", function(req, res){

    db.image.findAll({}).then(function(result){
      // console.log(result[0].image);
      // var hbsObject = {
      //  image: result
      // }
      res.json(result);
      // res.render("auction", hbsObject);
    });
  }); //end /auction/image route

  //get request route to retrieve the selected picture's bid price
  app.get("/auction/getprice:id", function(req, res){

    console.log(req.params.id);
    db.image.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(results) {

      // console.log(results.bidprice);
      res.json(results);
    });
  }); //end /api/getprice:id route

  //route retrieves specific token to validate which user posted
  app.get("/auction/checklog:token", function(req, res) {
    db.User.findOne({
      where: {
        token: req.params.token
      }
    }).then(function(results) {
      // console.log(results.login);
        res.json(results);
    })
  }); //end /api/checklog:token route

  //post is made to route to find the user who made the bid and then update the price
  //in the image db
  app.post("/auction/bid", function(req, res){

        db.User.findOne({
          where: {
              token: req.body.getToken
          }
      }).then(function(result) {

            db.image.update({bidprice: req.body.bidAmount, UserId: result.id}, 
            {
                where: {
                    id: req.body.pictureNum
                }
            }).then(function(results) {

              console.log("last console log before return");
              console.log(results);
                db.image.findAll({}).then(function(images) {

                  var imageArr=[];
                  for(var i = 0; i< images.length; i++){
                    imageArr.push(images[i].get({plain:true}));
                  }
                  console.log("we made it to images return");
                  // console.log(images);
                  res.json(images);
                }) //end db.image.findAll search
            })
     });

  }); //end /api/bid route

} // end modual exports