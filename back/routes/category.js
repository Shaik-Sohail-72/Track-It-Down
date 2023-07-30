const { postitem } = require("../models/category");
const messageschema = require("../models/messages");
require("dotenv").config({ path: "../../.env" });
// const { requestitem } = require("../models/category");
const { requireSignin, userMiddleware } = require("../middleware");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
var aws = require("aws-sdk");
var multerS3 = require("multer-s3");
// const upload=multer({dest:'uploads/'})
const path = require("path");
const log = console.log;
const SignUp = require("../models/signup");
const category = require("../models/category");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname + "-" + Date.now());
  },
});

var upload = multer({ storage });

const AWS = new aws.S3({
 accessKeyId: process.env.AWSACCESSKEY,
  secretAccessKey: process.env.AWSSECRETACCESSKEY,
});
var uploadS3 = multer({
  storage: multerS3({
    s3: AWS,
    bucket: "tidiompbucket786",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname + "-" + Date.now());
    },
  }),
});

router.post(
  "/postitem",
  requireSignin,
  userMiddleware,
  uploadS3.array("itemPictures"),
  async (req, res) => {
    // console.log(req)
    console.log("Hitted the POST successfully ");
    try {
      console.log("try");
      const { name, description, question, type } = req.body;
      console.log(req.files);
      //console.log(req.body);
      //console.log(createdBy);
      var itemPictures = [];
      if (req.files.length > 0) {
        itemPictures = req.files.map((file) => {
          return { img: file.key };
        });
      }

      //Saving data to db

      const newPost = await postitem.create({
        name: name,
        description: description,
        question: question,
        type: type,
        createdBy: req.user._id,
        itemPictures: itemPictures,
      });
      newPost.save((error, item) => {
        if (error) return res.status(400).json({ error });
        if (item) return res.status(201).json({ item });
      });
      
    } catch (err) {
      console.log("Error");
      res.status(401).json({
        "Message is": err.message,
      });
    }
  }
);


router.get("/getitem", (req, res) => {
  postitem.find({}).exec((err, postitems) => {
    if (err) return res.status(400).json({ err });
    if (postitems) {
   
      res.status(200).json({
        postitems,
      });
    }
  });
});

router.get("/item/:id", (req, res) => {
  const { id } = req.params;
  // console.log(id)
  postitem.find({ _id: id }).exec((err, item) => {
    if (err) return res.status(400).json({ Error: err });
    // console.log(item)
    messageschema.find({ itemId: item[0]._id }).exec((err, answers) => {
      if (err) return res.status(400).json({ Error: err });

      // console.log(answers)
      res.status(200).json({
        Item: item,
        Answers: answers,
      });
    });
  });
});


router.post("/deleteitem", async (req, res) => {
  const { item_id } = req.body;
  console.log("Item id is :", item_id);
  const deleteitem = await postitem.findOneAndDelete({ _id: item_id });
  const deletemsgs = await messageschema.deleteMany({ itemId: item_id });

  res.status(200).json({
    body: req.body,
  });
});

router.get("/getnumber/:id", (req, res) => {
  const { id } = req.params;
  console.log("Id is :", id);
  SignUp.find({ _id: id }).exec((err, user) => {
    res.status(200).json({
      Number: user[0].number,
    });
  });
});

router.get("/getquestion/:id", (req, res) => {
  const { id } = req.params;
  console.log("Id is :", id);
  postitem.find({ _id: id }).exec((err, item) => {
    if (err) return res.status(400).json({ Error: err });

    // console.log(item)
    // console.log(item[0].createdBy)
    const createdBy = item[0].createdBy;
    SignUp.find({ _id: createdBy }).exec((err, user) => {
      res.status(200).json({
        Question: user[0].number,
      });
    });
  });
});

router.post("/submitAnswer", async (req, res) => {
  console.log(req.body);
  const { itemId, question, answer, givenBy, belongsTo } = req.body;
  

  const newmessage = await messageschema.create({
    itemId: itemId,
    belongsTo: belongsTo,
    question: question,
    answer: answer,
    givenBy: givenBy,
  });
  newmessage.save((error, item) => {
    if (error) return res.status(400).json({ error });
    if (item) return res.status(201).json({ item });
  });
});

router.get("/myresponses/:id", (req, res) => {
  const { id } = req.params;
  console.log("Used Id is :", id);
  messageschema.find({ givenBy: id }).exec((err, item) => {
    if (err) return res.status(400).json({ Error: err });

    console.log(item);
    res.status(200).json({
      item: item,
    });
  });
});

router.get("/mylistings/:id", (req, res) => {
  const { id } = req.params;
  console.log("Used Id is :", id);
  postitem.find({ createdBy: id }).exec((err, item) => {
    if (err) return res.status(400).json({ Error: err });

    // console.log(item)
    res.status(200).json({
      item: item,
    });
  });
});

router.post("/confirmResponse/:id", (req, res) => {
  const { id } = req.params;
  // console.log("Used Id is :",id)
  console.log(id);
  console.log(req.body);
  messageschema.updateOne(
    { _id: id },
    { $set: { response: req.body.response } },
    { upsert: false },
    (err, updatedMessage) => {
      if (err) return res.status(400).json({ msg: err });

      res.status(200).json({ msg: "Updated" });
    }
  );
});
module.exports = router;
