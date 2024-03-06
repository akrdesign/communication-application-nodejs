const { User } = require("../model/user");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "SECRET_KEY";
const maxAge = 5 * 24 * 60 * 60;

const createJWT = (id) => {
  return jwt.sign({ id }, SECRET_KEY, {
    expiresIn: maxAge,
  });
};

const errorAlert = (error) => {
  let errors = { fullname: "", email: "", password: "" };

  if (error.code === 11000) {
    errors.email = "This email is already registered!";
    return errors;
  }

  if (error.message.includes("User validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

exports.register = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const user = await User.create({
      fullname,
      email,
      password
    });
    const token = createJWT(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user });
  } catch (error) {
    let errors = errorAlert(error);
    res.status(404).json({ errors });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createJWT(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user });
  } catch (error) {
    let errors = "";

    if (error.message === "incorrect email" || error.message === "incorrect password") {
      errors = "invalid email / password";
    }
    res.status(400).json({ errors });
  }
};

exports.verify = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        let user = await User.findById(decodedToken.id);
        res.json(user);
        next();
      }
    });
  } else {
    next();
  }
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ logout: true });
};
