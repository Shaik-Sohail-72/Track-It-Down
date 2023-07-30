const express = require("express");
const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { requireSignin } = require("../middleware");

const { promisify } = require("util");
const Signup = require("../models/signup");
const { token } = require("morgan");

require("dotenv").config({ path: "../../.env" });
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const NODE_ENV = process.env.NODE_ENV;

const signJwt = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
  });
};

const sendToken = (user, statuscode, req, res) => {
  const token = signJwt(user._id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + JWT_EXPIRES),
    secure: NODE_ENV === "production" ? true : false,
    httpOnly: NODE_ENV === "production" ? true : false,
  });
  console.log("Inside send token");
  res.status(statuscode).json({
    // status:"Success",
    token,
  });
};

const signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signed out successfully !",
  });
};
//MIDDLEWARE

const decryptJwt = async (token) => {
  const jwtverify = promisify(jwt.verify);
  return await jwtverify(token, JWT_SECRET);
};
secure = async (req, res, next) => {
  let token;
  if (req.cookies) token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({
      status: "unauthorized",
      message: "You are not authorized to view the content",
    });
  }
  const jwtInfo = await decryptJwt(token);
  console.log(jwtInfo);
  const user = await Signup.findById(jwtInfo.id);
  req.user = user;
  next();
};

checkField = (req, res, next) => {
  var firstname = req.body.email;
  var email = req.body.email;
  var password = req.body.password;
  var cpassword = req.body.cpassword;
  if (!firstname || !email || !password || !cpassword) {
    console.log("Please enter all the field");
    res.send("Please enter all the field");
  } else {
    next();
  }
};

checkFieldLogin = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  if (!email || !password) {
    console.log("Please enter all the fields");
    res.send("Please enter all the fields");
  } else {
    next();
  }
};

function checkUsername(req, res, next) {
  var email = req.body.email;
  var checkExistUsername = Signup.findOne({ email: email });
  checkExistUsername.exec((err, data) => {
    if (err) throw err;
    if (data) {
      console.log("Email Exists");
      res.send("Email already exists");
    } else {
      next();
    }
  });
}
function checkPassword(req, res, next) {
  var password = req.body.password;
  var cpassword = req.body.cpassword;
  var email = req.body.email;
  if (password != cpassword) {
    console.log("Password did not matched");
    res.send("Password did not matched");
  } 
  else {
    next();
  }
}

router.get("/", (req, res) => res.send("This is Home page !!"));

router.post(
  "/signup",
  checkField,
  checkUsername,
  checkPassword,
  async (req, res) => {
    console.log("Signup :", req.body);
    // const data=req.body
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var number = req.body.number;
    var password = req.body.password;

    try {
      // console.log(firstname,lastname,email,password)
      const newSignup = await Signup.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        number: number,
        password: password,
      });
      // sendToken(newSignup,201,req,res)
      console.log(newSignup);

      res.send("Done");
    } catch (err) {
      res.status(401).json(err.message);
    }
  }
);
router.post("/login", checkFieldLogin, (req, res, next) => {
  console.log("Login :", req.body);
  const email = req.body.email;
  const password = req.body.password;

  var checkUser = Signup.findOne({ email: email });
  // console.log(checkUser)
  checkUser.exec((err, data) => {
    // console.log("Inside execution")
    if (!data) {
      console.log("Not exist");
      res.send("Email does not exist");
    } else {
      // console.log(data)
      var dbpassword = data.password;
      if (dbpassword == password) {
        console.log("Logging in");
        //sendToken(checkUser,201,req,res)
        const jwt_token = jwt.sign(
          { _id: data._id, role: "user" },
          process.env.JWT_SECRET,
          { expiresIn: "1hr" }
        );
        console.log("after loggin" + jwt_token);
        // res.send("successfull")
        res.cookie("token", token, { expiresIn: "1hr" });
        res.status(200).json({
          jwt_token,
          user: data,
        });
        console.log("Login successfull");
      } else {
        console.log("Please check again !");
        // res.status(400).json({
        //     message: "Password Incorrect"
        // })
        res.send("Password Incorrect");
      }
    }
  });
});
router.post("/checktoken", requireSignin, (req, res) => {
  res.status(200).json({});
});
router.post("/signout", requireSignin, signout);
router.post("/feed", requireSignin, (req, res) =>
  res.status(200).json({
    message: "Working fine",
  })
);

module.exports = router;
