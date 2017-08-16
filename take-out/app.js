var express = require("express");
var config = require("./config/index.js");

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get("/", function(req, res, next) {
    req.url = 'index.html';
    next();
});

app.use(router);

//获取到模拟数据
var appData=require('./data.json');
var seller=appData.seller;
var goods=appData.goods;
var ratings=appData.ratings;

//定义接口路由
var apiRouter=express.Router();
//seller接口
apiRouter.get('/seller',function(req,res){
    res.json({
      errno:0,
      data:seller
    });
});

apiRouter.get('/goods',function(req,res){
    res.json({
      errno:0,
      data:goods
    });
});

apiRouter.get('/ratings',function(req,res){
    res.json({
      errno:0,
      data:ratings
    });
});

app.use('/api',apiRouter);

app.use(express.static("./dist"));

module.exports = app.listen(port, function(err) {
     if (err) {
         console.log(err);
         return;
     }
     console.log('Listen at http://localhost:' + port + "\n");
})
