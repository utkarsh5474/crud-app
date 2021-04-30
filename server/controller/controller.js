var Userdb = require("../model/model").Userdb;
var Helplineno = require("../model/model").Helplineno;
const axios = require("axios");
const mongoose=require('mongoose');

function find (name, query, cb) {
  mongoose.connection.db.collection(name, function (err, collection) {
     collection.find(query).toArray(cb);
 });
}

// create and save new user
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }
  // new user
  const user = new Userdb({
    name: req.body.name,
    location: req.body.location,
    city: req.body.city,
    contact: req.body.contact,
    availability: req.body.availability,
    timestamp: req.body.timestamp,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      //res.send(data)
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

// create and save new city
// exports.create_city = (req, res) => {
  // validate request
  // if(!req.body){
  //     res.status(400).send({ message : "Content can not be emtpy!"});
  //     return;
  // }
  //   // new city
  //   const citi = new Citydb({
  //     city : req.body.city
  // })
  //   // save city in the database
  //   citi
  //       .save(citi)
  //       .then(data => {
  //           //res.send(data)
  //         //   res.redirect('/add-user');
  //         res.status(200).send({
  //             message : "City added succesfully"
  //         });
  //       })
  //       .catch(err =>{
  //           res.status(500).send({
  //               message : err.message || "Some error occurred while creating a create operation"
  //           });
  //       });
// };

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        //   console.log(data);
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Erro retrieving user with id " + id });
      });
  } else {
    Userdb.find()
      .sort({ timestamp: -1 })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message || "Error Occurred while retriving user information",
          });
      });
  }
};

//retrieve and return all cities
exports.get_city = (req, res) => {
  Userdb.distinct("city")
    .then((data) => {
      // console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "duh" });
    });

  // Citydb.find()
  //     .then(city => {
  //         res.send(city)
  //     })
  //     .catch(err => {
  //         res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
  //     })
};

// Update a new idetified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot Update user with ${id}. Maybe user not found!`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

// Filter users based on city
exports.filtercity = (req, res) => {
  const city = req.query.city;

  console.log(city);
  if (city) {
    Userdb.find({ city: city })
      .sort({ timestamp: -1 })
      .then((data) => {
        console.log(data);
        if (!data) {
          res.status(404).send({ message: "Not found user with city " + city });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving user with city " + city });
      });
  } else {
    Userdb.find()
      .sort({ timestamp: -1 })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message || "Error Occurred while retriving user information",
          });
      });
  }

  // console.log("hit");
};

// Update a new idetified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot Update user with ${id}. Maybe user not found!`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

//retrieve and return helpline nos

// exports.create = (req, res) => {
//   // validate request
//   if (!req.body) {
//     res.status(400).send({ message: "Content can not be emtpy!" });
//     return;
//   }
//   // new user
//   const user1 = new Helplineno({
//     state: req.body.state,
//     number: req.body.number,
//   });
// };

exports.get_no = (req, res) => {
  // const id = req.query.id;

  Helplineno.find()
      .then((helpline) => {
        res.send(helpline);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message || "Error Occurred while retriving user information",
          });
      });

  // Helplineno.findById(id)
  //   .then((data) => {
  //     //   console.log(data);
  //     if (!data) {
  //       res.status(404).send({ message: "Not found user with id " + id });
  //     } else {
  //       res.send(data);
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({ message: "Erro retrieving user with id " + id });
  //   });
};