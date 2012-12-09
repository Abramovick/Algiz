/**
 * Load Dependencies.
 */
var express = require('express'),
    routes  = require('./routes/handler'),
    http    = require('http'),
    path    = require('path'),
    fs      = require('fs')

var app = express();

app.configure(function(){
  app.set( 'port', process.env.PORT || 8888 );
  app.set( 'views', __dirname + '/views' );
  app.set( 'view engine', 'jade' );
  app.use( express.favicon() );
  app.use( express.logger('dev') );
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router);
});

app.configure('development', function() {
  app.use( express.static( path.join( __dirname, 'public' )));
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use( express.staticCache() )
  app.use( express.static( path.join( __dirname, 'public' )));
  app.use( express.errorHandler({ dumpExceptions: true }) )
});


/**
 * Route GET & POST Requests to their specific Request Handlers.
 */
app.get( '/', routes.index );
app.post( '/post', routes.postData );
app.get( '/:path', routes.handlePath );
app.post( '/upload', routes.upload );
app.get( '/load/:path', routes.show );


http.createServer( app ).listen( app.get('port'), function() {
  console.log( "Express server listening on port " + app.get('port') );
});