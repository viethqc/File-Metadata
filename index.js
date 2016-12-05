var express = require('express')
var multer  = require('multer')
var fs = require("fs");

var fs = require('fs');

var app = express()


app.set('port', process.env.PORT || 5000);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


var upload = multer({dest:'uploads/',
					rename: function(fieldname, filename) {
						filename = "hello";
        				return filename;
    }});

var cpUpload = upload.single('file');

app.get('/', function (req, res) {
	res.render('index', {});

})

app.post('/get-file-size',  cpUpload, function(req,res, body){
	console.log(req.file.path);
     var stats = fs.statSync(req.file.path);
	 var fileSizeInBytes = stats["size"]
	 //Convert the file size to megabytes (optional)
	 res.writeHead(200, {"Content-Type": "application/json"});
	 var json = JSON.stringify({ 
	    size : fileSizeInBytes
	  });
  	res.end(json);
});



app.listen(app.get('port'), function(){
	console.log("Listen in port : %d", app.get("port"));
})