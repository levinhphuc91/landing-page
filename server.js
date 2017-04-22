var path = require('path');
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(path.join(__dirname, 'dist'))).listen(process.env.PORT || 8080, function(){
    console.log('Server running on 8080...');
});
