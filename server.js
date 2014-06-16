var express = require('express'),
	// router = express.Router(),
	app = express();

app.use(express.static('public'));
// .use(router)

var server = app.listen(process.env.PORT || 8000, function() {
	console.log('Listening on port %d', server.address().port);
});