var mongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID
var log         = require('./log')(module);
var config      = require('./config');

let db;
mongoClient.connect(config.get('mongoose:uri'))
    .then(database => {
        db = database;
        log.info(`Database ${config.get('mongoose:uri')} connected.`);
    })
    .catch(err => log.error(err));

function checkPost(reqType) {
    return config.get('security:allow-post:' + reqType);
}


function getData(collection, filters, res, okfunc) {
    fillResp(
        function(_db) {
            if (Array.isArray(filters)) {
                const [filter, projection] = filters;
                return _db.collection(collection).find(filter, projection);
            } else {
                return _db.collection(collection).find(filters);
            }
        },
        res,
        okfunc
    );
}


function getDataById(collection, objId, res, okfunc) {
    if (Array.isArray(objId)) {
        const [id, projection] = objId;
        getData(collection, [{_id: new ObjectID(id)}, projection], res, okfunc);
    } else {
        getData(collection, {_id: new ObjectID(objId)}, res, okfunc);
    }
}

function getDataByIds(collection, objIds, res, okfunc) {
    const [ids, projection] = objIds;
    const objectsId = ids.map((object) => { if (object) { return new ObjectID(object);} });
    getData(collection, [ { _id: { $in: objectsId } }, projection ], res, function(_rs, _dt) {
        okfunc(_rs,
            _dt.sort(function(a, b) {
                aord = ids.indexOf(a._id.toString());
                bord = ids.indexOf(b._id.toString());
                if (aord == bord) return 0;
                if (aord < 0) return 1;
                if (bord < 0) return -1;
                if (aord < bord) return -1;
                return 1;
            })
        );
    });
}

function removeById(collection, objId, res, callback){
    mongoClient.connect(config.get('mongoose:uri'), function(_err, _db) {
    var deletedId = _db.collection(collection).deleteOne({_id: new ObjectID(objId)}, function(err, result) {
        callback(res, err);
        if(err){
            _res.statusCode = 500;
            log.error('Internal error(%d): %s', _res.statusCode, err.message);
            return _res.send({error: 'Server error'});
        }
        _db.close();
    });

});
}

function fillResp(_cursorFunc, _res, _okfunc) {
    mongoClient.connect(config.get('mongoose:uri'), function(_err, _db) {
        if (_err)
            log.error('connection error:', _err.message);
        else log.info('Connect to DB!');

        var _cursor = _cursorFunc(_db);

        var err;
        var _items = new Array();
        _cursor.each(function (_err, _item) {
            if (_err) {
                log.error('error', _err);
                err = _err;
            }
            else if (_item != null) {
                _item.dataType = undefined;
                _items.push(_item);
            } else {
                _db.close();

                if (!_items || _items.length == 0) {
                    _res.statusCode = 404;
                    return _res.send({error: 'Not found'});
                }
                if (!err) {
                    _okfunc(_res, _items);
                } else {
                    _res.statusCode = 500;
                    log.error('Internal error(%d): %s', _res.statusCode, err.message);
                    return _res.send({error: 'Server error'});
                }
            }
        });
    });
}


function saveData(collection, data, res, callback) {
    mongoClient.connect(config.get('mongoose:uri'), function(err, _db) {
        if (err)
            log.error('connection error:', err.message);
        else log.info('Connect to DB!');

        _db.collection(collection).insertOne(data, function(err, result) {
            callback(res, err);
            _db.close();
        });
    });
}

module.exports.getDataByIdAsync = async (collection, id, options) => {
    try {
        // const db = await mongoClient.connect(config.get('mongoose:uri'));
        const col = db.collection(collection);
        const _id = { _id: new ObjectID(id) };
        const result = await col.find(_id, options).limit(1).toArray()
        // db.close();
        if (result.length === 0) throw new Error('Not found document');
        return result[0];
    } catch(err) {
        // Пробрасываем ошибку для следующего try/catch в роуте.
        throw err;
    }
}

module.exports.replaceDataAsync = async (collection, id, data) => {
    try {
        // const db = await mongoClient.connect(config.get('mongoose:uri'));
        const col = db.collection(collection);
        const _id = { _id: new ObjectID(id) };
        const result = await col.findOneAndReplace(
            _id,
            data,
            { returnOriginal: false }
        );
        // db.close();
        return result;
    } catch(err) {
        // Пробрасываем ошибку для следующего try/catch в роуте.
        throw err;
    }
}
/*
function updateItemById(collection, data, res, callback) {
    mongoClient.connect(config.get('mongoose:uri'), function(err, _db) {
        if (err)
            log.error('connection error:', err.message);
        else log.info('Connect to DB!');

        var dataId = data._id;
        data._id = undefined;
        _db.collection(collection).update(
            { _id: dataId }, 
            data,
            {},
            callback



            data, function(err, result) {
            

            callback(res, err);
            _db.close();
        });
    });
}
*/


module.exports.checkPost = checkPost;
module.exports.getData = getData;
module.exports.getDataById = getDataById;
module.exports.getDataByIds = getDataByIds;
module.exports.saveData = saveData;
module.exports.removeById = removeById;
//module.exports.deleteItem = deleteItem;
