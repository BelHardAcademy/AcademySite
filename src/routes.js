var oauth2          = require('./libs/oauth2');
var passport        = require('passport');
var db              = require('./libs/mongoose');
var captcha         = require('./libs/captcha');
var log             = require('./libs/log')(module);
var data            = require('./libs/data');
var fs              = require('fs');
var crypto          = require('crypto');
var multer          = require('multer');
var config          = require('./libs/config');
var jwt             = require('jsonwebtoken');


function regRoutes(app) {
    app.use(passport.initialize());

    app.use('/api/admin*', checkAuthenticate);

    app.get('/favicon.ico', function (req, res){
        res.end('');
    });

    app.route('/api(/)?*')
        .get(writeCrossHeader)
        .post(writeCrossHeader);

    app.route('/api')
        .get(function (req, res) {
            res.write('API is running');
            res.end();
        })
        .post(function (req, res) {
            res.json('API is running');
        });

    app.route('/api/menu')
        .get(function(req, res) {
            data.getData(
                'menutypes',
                { name: 'Standart' },
                res,
                function(rs, dt) {
                    return rs.send({ status: 'OK', menu: dt[0].items });
                }
            );
        });
    app.route('/api/menu/:id')
        .get(function(req, res) {
            data.getDataById(
                'menutypes',
                req.params.id,
                res,
                function(rs, dt) {
                    return rs.send({ status: 'OK', menu: dt[0].items });
                }
            );
        });

    app.route('/api/admin/data/menuType')
        .get(function(req, res) {
            data.getData(
                'menutypes',
                {},
                res,
                function(rs, dt) {
                    return rs.send({ status: '0', menu: dt[0].items });
                }
            );
        })
        .post(function(req, res) {
            if (req.body.name) {
                reqData = {
                    name: req.body.name,
                    items: req.body.menu
                }
                data.saveData(
                    'menutypes',
                    reqData,
                    res,
                    function (res, err) {
                        if (err) respError(res, 500, err);
                        else res.send({ status: '0' });
                    }
                )
            } else {
                respError(res, 400, 'Missing any request data');
            }
        });

    app.route('/api/admin/data/menuType/:id')
        .get(function(req, res) {
            data.getDataById(
                'menutypes',
                req.params.id,
                res,
                function(rs, dt) {
                    return rs.send({ status: '0', menu: dt });
                }
            );
        });

    app.route('/api/captcha')
        .get(function(req, res) {
            var w = parseInt(req.query.width);
            var h = parseInt(req.query.height);
            if (w && h)
                return res.send(captcha.getCaptcha(w, h));
            else return res.send();
        })
        .post(function(req, res){
            return res.send(captcha.checkCaptcha(req.body.crypto, req.body.data));
        });

    app.route('/api/page')
        .get(function(req, res) {
            data.getData('pages', {defPage: 1}, res, page_ok);
        });
  /*  app.get('/api/page/admin:id', 
        function(req, res) {
            var link = req.params.id.toString();
            link = 'admin' + link.substring(0, 1).toUpperCase() + link.substring(1);
            data.getData('pages', {link: link }, res, page_ok);
        });*/
    app.route('/api/page/:id')
        .get(function(req, res) {
            let filt = req.params.id.toLowerCase();
            data.getData('pages', { link : filt }, res, page_ok);
        });

    function page_ok(rs, dt) {
        dt[0].defPage = undefined;
        data.getDataByIds('gallery', [[dt[0].gallery, dt[0].footerGallery], {}], rs, function(_rs, _dt) {
            dt[0].gallery = _dt[0];
            dt[0].footerGallery = _dt[1];
            return rs.send({ status: 'OK', page: dt[0] });
        });
    }

    app.route('/api/block/:id')
        .get(function(req, res) {
            GetBlock(req, res, 'id');
        });
    app.route('/api/block/:sel/:id')
        .get(function(req,res) {
            var sel = req.params.sel;
            GetBlock(req, res, sel);
        });

    function GetBlock(req, res, sel) {
        if (sel == 'id') {
            data.getDataById(
                'pageblocks',
                req.params.id,
                res,
                function (rs, dt) {
                    return rs.send({status: 'OK', block: dt[0]});
                }
            );
        } else if (sel == 'link') {
            data.getData(
                'pageblocks',
                {link: req.params.id},
                res,
                function(rs, dt) {
                    return rs.send({ status: 'OK', block: dt[0] });
                }
            );
        }
    }

    app.route('/api/admin/data/module')
        .get(function(req, res) {
            data.getData(
                'modules',
                {},
                res,
                function(rs, dt) {
                    return rs.send(dt);
                }
            );
        });

    app.route('/api/module/:id')
        .get(function(req, res) {
            data.getDataById(
                'modules',
                req.params.id,
                res,
                function (rs, dt) {
                    fs.readFile('.' + dt[0].srcLink, 'utf-8', function(err, data) {
                        //if (err) return respError(res, 500, err);

                        if (err) dt[0].html = err;
                        else dt[0].html = data;
                        dt[0].scrLink = undefined;
                        return rs.send({status: 'OK', module: dt[0]});
                    });
                }
            );
        });

/*    app.route('/api/admin/data/:type')
        .get(function(req, res) {
            data.getData(
                'modules',
                {dataType: req.params.type},
                res,
                function(rs, dt) {
                    return rs.send(dt);
                }
            );

        });*/

    app.route('/api/data/:type/:id')
        .get(function(req, res) {
            data.getDataById(
                'modules',
                req.params.id,
                res,
                function(rs, dt) {
                    return rs.send(dt);
                }
            );

        });

    app.post('/api/reqCourse', function(req, res) {
        var reqc = {};
        reqc.name = req.body.name;
        reqc.email = req.body.email;
        reqc.phone = req.body.phone;
        reqc.courseId = req.body.courseId;
        if (reqc.name && reqc.email && reqc.phone && reqc.courseId) {
            reqc.dataType = "reqCourse";
            var err = data.saveData(
                'modules',
                reqc,
                res,
                function (res, err) {
                    if (err) respError(res, 500, err);
                    else res.send({status: 0});
                }
            );
        } else respError(res, 400, 'Missing any request data')
    });

    app.post('/api/mailDelivery', function(req, res) {
        var reqc = {};
        reqc.name = req.body.name;
        reqc.email = req.body.email;
        if (reqc.name && reqc.email) {
            reqc.dataType = "mailDelivery";
            var err = data.saveData(
                'modules',
                reqc,
                res,
                function (res, err) {
                    if (err) respError(res, 500, err);
                    else res.send({status: 0});
                }
            );
        } else respError(res, 400, 'Missing any request data')
    });

    app.get('/api/admin/data/struct', function(req, rs) {
        var res = [];
        res.push({code: "gor_list", name: "Вертикальная" });
        res.push({code: "vert_list", name: "Горизонтальная" });
        return rs.send(res);
    });

    app.post('/api/user/register', function(req, res) {
        const { name, lastName, login, password } = req.body;
        if (name && lastName && login && password) {
            const { passwordHash, salt } = hashedPassword(password);
            const role = 'admin';
            data.saveData(
                'siteusers',
                { name, lastName, login, passwordHash, salt, role },
                res,
                (res, err) => {
                    console.log(err);
                    if (err && err.code === 11000) {
                        res.send({ status: -1, error: 'Ошибка отправки. Такой пользователь уже зарегистрирован' });
                    } else if (err) {
                        res.send({ status: -1, error: 'Ошибка отправки' });
                    } else {
                        res.send({ status: 0 });
                    }
                }
            )
        } else {
            res.send({ error: 'Ошибка отправки. Заполните пожалуйста все поля' });
        }
    });

    app.post('/api/login', function(req, res) {
        data.getData(
            'siteusers',
            { login: req.body.login },
            res,
            (rs, dt) => {
                const sha512 = function(password, salt){
                    const hash = crypto.createHmac('sha512', salt);
                    hash.update(password);
                    const value = hash.digest('hex');
                    return value;
                };
                const { _id, name, lastName, login, role } = dt[0];
                const redirect = (role === 'admin') ?
                    config.get('redirect:admin'):
                    config.get('redirect:client');
                if (sha512(req.body.password, dt[0].salt) === dt[0].passwordHash) {
                    const token = jwt.sign(
                        { _id, login, role },
                        config.get('token:secret'),
                        { expiresIn: config.get('token:expiresIn') }
                    );
                    return rs.send({
                        status: 0,
                        user: { _id, name, lastName, login, role },
                        token,
                        redirect
                    });
                } else {
                    return rs.send({ status: -1, error: 'Неверная комбинация логина и пароля' });
                }
            }
        )
    });

    app.route('/api/admin/data/pageBlock/')
        .get(function(req, res) {
            data.getData(
                'pageblocks',
                [{}, { 'name-part1': 1, 'name-part2': 1 }],
                res,
                function(rs, dt) {
                    return rs.send(dt);
                }
            );
        });

    app.route('/api/admin/data/pageBlock/:link')
        .get(function(req, res) {
            data.getData(
                'pages',
                { link: req.params.link },
                res,
                function(rs, dt) {
                    data.getDataByIds(
                        'pageblocks',
                        [dt[0].blockIds, { 'name-part1': 1, 'name-part2': 1 }],
                        res,
                        function(_rs, _dt) {  
                            return res.send(_dt);
                        }
                    );
                }
            );
        });


    app.route('/api/admin/data/pageList')
        .get(function (req, res) {
            data.getData('pages', [{}, { 'link': 1, 'name': 1}], res, function (rs, dt) {
                return rs.send(dt);
            });
        });

    app.route('/api/admin/form/:code')
        .get(function (req, res) {
            var cd = req.params.code;
            fs.readFile('./public/src/admin' + cd + '.h', 'utf-8', function(err, data) {
                if (err) return res.send(err);
                
                return res.send(data);
            });
        });

    app.route('/api/admin/page/:id*?')
        .get(function(req, res) {
            try {
                data.getDataById(
                    'pages',
                    [{ id: req.params.id }, { 'blockIds': 1 }],
                    res,
                    function(rs, dt) {
                        data.getDataByIds(
                            'pageblocks',
                            [[dt[0].blockIds], { 'name-part1': 1, 'name-part2': 1 }],
                            res,
                            function(rs, dt) {  
                                return res.send(dt);
                            }
                        );
                    }
                );
            }
            catch (err) {
                data.getData('pages', {link: req.params.id}, res, page_ok);
            }

        })/*
        .post(function(req, res) {
            var id = req.params.id;
            res.send("ok");
        }); /*
        .delete(function(req, res) {
            data. req.params.id
        });*/


    app.get('/api/admin/data/gallery', (req, res) => {
        data.getData(
            'gallery',
            {},
            res,
            (rs, dt) => res.send(dt)
        );
    });

    app.get('/api/admin/data/gallery/:id', (req, res) => {
        data.getDataById(
            'gallery',
            req.params.id,
            res,
            (rs, dt) => res.send(dt)
        );
    });

    app.post('/api/admin/data/gallery',
        multer({ dest: 'public/images/Gallery/' }).array('photos'),
        (req, res) => {
            const linkPhotos = req.files.map(file => `/images/Gallery/${file.filename}`);
            data.saveData(
                'gallery',
                {
                    name: req.body.name,
                    interval: req.body.interval,
                    links: linkPhotos
                },
                res,
                (res, err) => {
                    if (err) respError(res, 500, err);
                    else res.send({ status: '0' });
                }
            );
        }
    );

    app.post('/api/admin/data/gallery/:id',
        multer({ dest: 'public/images/Gallery/' }).array('photos'),
        async (req, res) => {
            try {
                // Получаем текущую галерею
                const currentGallery = await data.getDataByIdAsync('gallery', req.params.id);
                if (!req.body.name || !req.body.interval) {
                    throw new Error('"name" or "interval" must be not empty');
                }
                // Создаём исходный массив ссылок для последуюшего редактирования
                let linksNewPhotos = currentGallery.links;
                let linksDeletedPhotos;
                // Если есть файлы для удаления, получаем массив
                if (req.body.deletedPhotos) {
                    // Если не массив, создаём массив из 1 значения (там идёт string)
                    Array.isArray(req.body.deletedPhotos) ?
                        linksDeletedPhotos = req.body.deletedPhotos :
                        linksDeletedPhotos = [req.body.deletedPhotos]
                }
                // Если есть файлы для удаления, создаём новый массив ссылок, убирая ненужные
                if (linksDeletedPhotos) {
                    linksNewPhotos = currentGallery.links.filter(link => {
                        return linksDeletedPhotos.indexOf(link) === -1;
                    });
                }
                // Если есть файлы для добавления, добавляем их в новый массив со ссылками
                if (req.files) {
                    const linksAddedPhotos = req.files.map(file => `/images/Gallery/${file.filename}`);
                    linksNewPhotos.push(...linksAddedPhotos);
                }
                // Делаем replace документа с новыми данными
                const result = await data.replaceDataAsync(
                    'gallery',
                    req.params.id,
                    {
                        name: req.body.name,
                        interval: req.body.interval,
                        links: linksNewPhotos
                    }
                );
                // Если всё прошло без ошибок, удаляем ненужные файлы с жёсткого диска
                if (linksDeletedPhotos) {
                    linksDeletedPhotos.forEach(photo => {
                        fs.unlink(`./public/${photo}`, (err) => {
                            console.log(err || `файл ${photo} удалён`);
                        });
                    });
                }
                res.send(result);
            } catch(err) {
                // Ловим всё ошибки (в том числе и проброшенные из функций data.js)
                if (err.message === 'Not found document') {
                    res.status(400).send('Bad Request. Not found document in database.')
                } else {
                    res.status(500).send(`${err}`)
                }
            }
        }
    );

    app.route('/api/admin/data/module')
        .get((req, res) => {
            data.getDataById(
                'modules',
                {},
                res,
                function(rs, dt) {
                    return rs.send(dt);
                }
            );
        })

    app.route('/api/admin/data/:code')
        .get(function (req, res) {
            data.getData(req.params.code, {}, res, function (rs, dt) {
                return rs.send(dt);
            });
        });


    app.route('/api/admin/data/:code/:id')
        .delete(function (req, res) {
            return rs.send({status: 0});
        })
        .get(function (req, res) {
            console.log(req.params.code);
            data.getDataById(
                req.params.code,
                req.params.id,
                res,
                function(rs, dt) {
                    return res.send(dt);
                }
            );
            });

    app.post('/oauth/token', oauth2.token);

    app.get('/admin:page', function (req, res) {
        res.sendfile('./public/admin/index.html');
    });

    app.get('/:page', function (req, res) {
        var pagePath;
        if (req.params.page.toLowerCase() == 'registration.html')
            pagePath = './public/registration.html';
        else if (req.params.page.toLowerCase() == 'authorization.html')
            pagePath = './public/authorization.html';
        else pagePath = './public/index.html';

        fs.readFile(pagePath, 'utf8', function(error, content){
            res.status(200);
            res.write(content.replace('{{currentYear}}', new Date().getFullYear()));
            res.end();
        });
    });

}

function writeCrossHeader(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
}

function respError(res, errCode, errMess) {
    res.statusCode = errCode;
    log.error(errMess);
    res.send({"status": -1, "error": errMess});
}

function hashedPassword(userpassword) {
    var genRandomString = function(length){
        return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
    };

    var sha512 = function(password, salt){
        var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest('hex');
        return {
            salt: salt,
            passwordHash: value
        };
    };

    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    return passwordData;
};

function checkAuthenticate(req, res, next) {
    const token = req.headers['token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.get('token:secret'), (err, decoded) => {
            if (err) {
                return res.status(401).send(err);
            } else {
            // if everything is good, save to request for use in other routes
            req.user = decoded;
            next();
            }
        });
    } else {
        return res.status(401).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }
};

function isAdmin(req, res, next) {

};

module.exports.regRoutes = regRoutes;
