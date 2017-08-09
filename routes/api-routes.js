var db = require("../models");

module.exports = function(app) {
	app.get("/", function(req, res) {
    console.log(db);
    db.burgers.findAll({}).then(function(result) {
        var hbsObject = {
      		burgers: result
    	};
    console.log(hbsObject);
    res.render("index", hbsObject);
    });
  });

  app.post("/", function(req, res) {
    db.burgers.create({
      burger_name: req.body.name,
    }).then(function(result) {
      res.redirect("/");
    })
    .catch(function(err) {
      res.json(err);
    });
  });

  app.put("/:id", function(req, res) {
      db.burgers.update({
      devoured: req.body.devoured
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
  });
}
