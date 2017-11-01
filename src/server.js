var express         = require('express');
var path            = require('path'); // модуль для парсинга пути
var log             = require('./libs/log')(module);
var config          = require('./libs/config');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var routes          = require('./routes');

var app = express();

app.use(logger('dev')); // выводим все запросы со статусами в консоль
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride()); // поддержка put и delete
// app.use(multer({ dest: 'public/images/Gallery/' }).array('photos'));

require('./libs/oauth');

routes.regRoutes(app);

app.listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});

app.use(express.static('public'));
app.use(express.static('public/admin'));

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    if (config.get('detail-error') == 1) {
        res.status(err.status || 500);
        res.send({error: err.message});
    } else {
        res.status(404);
        res.send({error: "Not found"});
    }
    return;
});

