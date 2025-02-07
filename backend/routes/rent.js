const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchUser");
const Car = require("../models/Addcar");
const { body, validationResult } = require("express-validator");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "_" + file.originalname); // Add the uniqueSuffix before the filename
    }
});

const upload = multer({ storage: storage });

router.post(
    "/addcar",
    fetchuser,upload.array('images', 10),
    [
      body("name", "Enter a valid name").isLength({ min: 3 }),
      body("description", "Enter a valid description").isLength({ min: 5 }),
    ],
    async (req, res) => {
      try {
        const { name, description, cost, Used_for  } = req.body;
        const images = (req.files && req.files.length > 0) ? req.files.map(file => file.filename) : [];
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const car = new Car({name,description,cost,images ,Used_for,user:req.user.id});
        const savedCar = await car.save();
        res.json(savedCar);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    }
  );

  router.get('/cars/farmer', async (req, res) => {
    try {
      const cars = await Car.find({ Used_for: 'farmer' });
      res.json(cars);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get('/cars/tourist', async (req, res) => {
    try {
      const cars = await Car.find({ Used_for: 'tourist' });
      res.json(cars);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

  

  module.exports = router;