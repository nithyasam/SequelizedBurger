var db = require("../models");

module.exports = function(app) {
	app.get("/", function(req, res) {
    db.Burgers.findAll({
      include: [ db.Customer ],
      order: ["burger_name"],
    }).then(function(result) {
      var hbsObject = {
        burgers: result
      };
      res.render("index", hbsObject);
    });
  });

  app.post("/", function(req, res) {
    db.Burgers.create(req.body).then(function(result) {
      res.redirect("/");
    })
    .catch(function(err) {
      console.log(err.errors[0].message);
    });
  });

  app.put("/:id", function(req, res) {
    db.Customer.create({
      customer_name : req.body.customer_name
    }).then(function(result) {
        db.Burgers.update({
          devoured: req.body.devoured,
          CustomerId: result.id
        }, {
        where: {
          id: req.params.id
        }
      }).then(function(result) {
        res.redirect("/");
      })
      .catch(function(err) {
        res.json(err);
      });
    })
    .catch(function(err) {
      console.log(err.errors[0].message);
    });
  });
}
