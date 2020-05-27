var livereload = require('livereload');
var server = livereload.createServer();
server.watch([__dirname + '/public', __dirname + '/views'])