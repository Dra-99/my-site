const createError = require('http-errors');
const express = require('express');
// 读取.env文件配置信息
require("dotenv").config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { expressjwt: jwt } = require("express-jwt")
const session = require("express-session")
const md5 = require("md5")
const adminRoute = require("./routes/admin")
const captchaRouter = require("./routes/captcha")
const homePageRouter = require("./routes/homePage")
const uploadRouter = require("./routes/upload")
const blogTypeRouter = require("./routes/blogType")
const blogRouter = require("./routes/blog")
const projectRouter = require("./routes/project")
const { ForbiddenError, handleOtherError } = require("./utils/errors")
require("./init")

const app = express();

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: true,
  saveUninitialized: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(jwt({
  secret: md5(process.env.JWT_KEY),
  algorithms: ["HS256"],
}).unless({ path: [{
  url: "/api/admin/login",
  method: "POST"
}, {
  url: "/api/captcha",
  method: "GET"
}, {
  url: "/api/homePage",
  method: "GET"
}, {
  url: "/api/blog",
  method: "GET"
}, {
  url: "/api/blogType",
  method: "GET"
}, {
  url: "/api/project",
  method: "GET"
}]}))

app.use('/api/admin', adminRoute);
app.use("/api/captcha", captchaRouter)
app.use("/api/homePage", homePageRouter)
app.use("/api/upload", uploadRouter);
app.use("/api/blogType", blogTypeRouter)
app.use('/api/blog', blogRouter)
app.use("/api/project", projectRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  const name = err.name;
  if (name === "UnauthorizedError") {
    res.send(new ForbiddenError('身份未认证或身份认证过期').errorResp());
    return;
  }
  res.send(handleOtherError(err))
});

module.exports = app;

//哈哈哈