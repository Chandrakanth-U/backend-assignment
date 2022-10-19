const jwt = require("jsonwebtoken");
const SECRET_KEY = "fkgkjgkgjfjfjhgh";
const User = require("../models/User");

const isAuth = (request, response, next) => {
  let jwtToken;

  const authorization = request.headers["authorization"];
  if (authorization !== undefined) {
    jwtToken = authorization.split(" ")[1];
  }

  if (jwtToken === undefined) {
    response.sendStatus(401);
  } else {
    jwt.verify(jwtToken, SECRET_KEY, async (error, payload) => {
      if (error) {
        response.sendStatus(401);
      } else {
        //console.log(payload);
        const { _id } = payload.data;
        User.findById(_id).then((userdata) => {
          request.user = userdata;
          next();
        });
      }
    });
  }
};

module.exports = { isAuth };
