/**
 *
 * @author     richen
 * @copyright  Copyright (c) 2017 - <richenlin(at)gmail.com>
 * @license    MIT
 * @version    22/5/27
 */

const fs = require('fs');
const co = require('co');
const path = require('path');
const crypto = require('crypto');
const lodash = require('lodash');

/**
 * Formatted console.log output
 * 
 * @param {any} str 
 * @returns {void}
 */
global.echo = function (str) {
    let date = datetime('', '');
    console.log('----------' + date + '----------');
    console.log(str);
    console.log('----------' + date + '----------');
};

/*eslint-disable func-style */
/**
 * The object obj prototype instance conversion to organize the data structure stored in the object,
 * access to this object in the v8 engine will be faster
 * @param {any} obj 
 * @returns {void}
 */
function toFastProperties(obj) {
    let f = function f() { };
    f.prototype = obj;
    /*eslint-disable no-new*/
    new f();
}
/**
 * Short for Object.defineProperty,
 * the property is getter when setter is false
 * @param {any} obj 
 * @param {any} property 
 * @param {any} value 
 * @param {boolean} [setter=false] 
 * @returns {void}
 */
function define(obj, property, value, setter = false) {
    if (setter) {
        return Object.defineProperty(obj, property, {
            value: value,
            writable: true,
            configurable: false,
            enumerable: true
        });
    } else {
        return Object.defineProperty(obj, property, {
            get: function () {
                return value;
            },
            configurable: false,
            enumerable: true
        });
    }
}

/**
 * Checks if value is a string that contains only numbers
 * 
 * @param {any} value 
 * @returns {boolean}
 */
function isNumberString(value) {
    let numberReg = /^((\-?\d*\.?\d*(?:e[+-]?\d*(?:\d?\.?|\.?\d?)\d*)?)|(0[0-7]+)|(0x[0-9a-f]+))$/i;
    return lodash.isString(value) && !isEmpty(value) && numberReg.test(value);
}
/**
 * Checks if value is a standard JSON object,
 * must be a plain object or array
 * @param {any} value 
 * @returns {boolean}
 */
function isJSONObj(value) {
    return lodash.isPlainObject(value) || lodash.isArray(value);
}

/**
 * Checks if value is a standard JSON string,
 * must be a string, and can be deserialized as an plain object or array
 * @param {any} value
 * @returns {boolean}
 */
function isJSONStr(value) {
    if (!lodash.isString(value)) {
        return false;
    }
    try {
        return isJSONObj(JSON.parse(value));
    } catch (e) {
        return false;
    }
}

/**
 * Checks value is empty,
 * do not consider empty objects, empty arrays, spaces, tabs, form breaks, etc.
 * @param {any} value
 * @returns {boolean}
 */
function isTrueEmpty(value) {
    if (value === undefined || value === null || value === '') {
        return true;
    }
    if (lodash.isNumber(value)) {
        return isNaN(value);
    }
    return false;
}

/**
 * Checks value is empty,
 * undefined, null, '', NaN, [], {} and any empty string(including spaces, tabs, formfeeds, etc.), returns true
 * @param {any} value
 * @returns {boolean}
 */
function isEmpty(value) {
    if (value === undefined || value === null || value === '') {
        return true;
    } else if (lodash.isString(value)) {
        //\s 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。
        return value.replace(/(^\s*)|(\s*$)/g, '').length === 0;
    } else if (lodash.isNumber(value)) {
        return isNaN(value);
    } else if (lodash.isArray(value)) {
        return value.length === 0;
    } else if (lodash.isPlainObject(value)) {
        // for (let key in value) {
        //     return !key && !0;
        // }
        // return true;
        return Object.keys(value).length === 0;
    }
    return false;
}

/**
 * Convert special characters(> < " ') for entity character
 *
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
    let htmlMaps = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quote;',
        '\'': '&#39;'
    };
    return (value + '').replace(/[<>'"]/g, function (a) {
        return htmlMaps[a];
    });
}

/**
 * Convert entity value in value to(> < " ')
 *
 * @param {string} value
 * @returns {string}
 */
function escapeSpecial(value) {
    let specialMaps = {
        '&lt;': '<',
        '&gt;': '>',
        '&quote;': '"',
        '&#39;': '\''
    };
    for (let n in specialMaps) {
        value = value.replace(new RegExp(n, 'g'), specialMaps[n]);
    }
    return value;
}

/**
 * Convert the first letter in the value to uppercase
 * 
 * @param {string} value 
 * @returns {string} 
 */
function ucFirst(value) {
    value = lodash.toString(value || '');
    return value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase();
}

/**
 * Calculate the MD5 hash of value
 *
 * @param {string} value
 * @returns {string}
 */
function md5(value) {
    let ins = crypto.createHash('md5');
    ins.update(value + '', 'utf8');
    return ins.digest('hex');
}

/**
 * Calculate the value of MD5 hash value, including simple salt
 * 
 * @param {string} value 
 * @param {string} [salt='abcdefghijklmnopqrstuvwxyz1234567890'] 
 * @returns 
 */
function md5Salt(value, salt = 'abcdefghijklmnopqrstuvwxyz1234567890') {
    let ins = crypto.createHash('md5');
    value = value + salt.slice(value.length % salt.length, salt.length);
    ins.update(value);    
    return ins.digest('hex');
}

/**
 * Pseudo-random access min and max range of integers
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function rand(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

/**
 * Date time stamp and formatting
 *
 * @param {any} date
 * @param {any} format
 * @returns {string | number}
 */
function datetime(date, format) {
    if (format === undefined) {
        //datetime() => now timestamp
        if (date === undefined) {
            return Math.floor(Date.now() / 1000);
        } else if (lodash.isString(date)) { //datetime('2017-01-01') => timestamp
            date = date || new Date();
            return Math.floor(new Date(date).getTime() / 1000);
        }
        return NaN;
    } else {
        format = format || 'yyyy-mm-dd hh:mi:ss';
        let fn = function (d, f) {
            let Week = ['日', '一', '二', '三', '四', '五', '六'];
            f = f.replace(/yyyy|YYYY/, d.getFullYear());
            f = f.replace(/yy|YY/, d.getYear() % 100 > 9 ? (d.getYear() % 100).toString() : '0' + d.getYear() % 100);
            f = f.replace(/mi|MI/, d.getMinutes() > 9 ? d.getMinutes().toString() : '0' + d.getMinutes());
            f = f.replace(/mm|MM/, d.getMonth() + 1 > 9 ? (d.getMonth() + 1).toString() : '0' + (d.getMonth() + 1));
            f = f.replace(/m|M/g, d.getMonth() + 1);
            f = f.replace(/w|W/g, Week[d.getDay()]);
            f = f.replace(/dd|DD/, d.getDate() > 9 ? d.getDate().toString() : '0' + d.getDate());
            f = f.replace(/d|D/g, d.getDate());
            f = f.replace(/hh|HH/, d.getHours() > 9 ? d.getHours().toString() : '0' + d.getHours());
            f = f.replace(/h|H/g, d.getHours());
            f = f.replace(/ss|SS/, d.getSeconds() > 9 ? d.getSeconds().toString() : '0' + d.getSeconds());
            return f;
        };
        if (date && lodash.isNumber(date)) {
            let newDate = new Date();
            newDate.setTime(date * 1000);
            return fn(newDate, format);
        }
        if (date && lodash.isString(date)) {
            return fn(new Date(Date.parse(date)), format);
        }
        return fn(new Date(), format);
    }
}

/**
 * Determines whether value is an element of array arr,
 * only determine the same value with the element, do not determine the type
 * @param {any} value
 * @param {any[]} arr
 * @returns {boolean}
 */
function inArray(value, arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        if (arr[i] == value) {
            return true;
        }
    }
    return false;
}

/**
 * Removes the specified index element from the array
 * 
 * @param {any[]} arr
 * @param {number} index
 * @returns {any[]}
 */
function arrRemove(arr, index) {
    return lodash.remove(arr, function (n, i) {
        return i !== index;
    });
}

/**
 * Checks if p is a file
 *
 * @param {string} p
 * @returns {boolean}
 */
function isFile(p) {
    if (!fs.existsSync(p)) {
        return false;
    }
    try {
        let stats = fs.statSync(p);
        return stats.isFile();
    } catch (e) {
        return false;
    }
}

/**
 * Checks if p is a dir
 *
 * @param {string} p
 * @returns {boolean}
 */
function isDir(p) {
    if (!fs.existsSync(p)) {
        return false;
    }
    try {
        let stats = fs.statSync(p);
        return stats.isDirectory();
    } catch (e) {
        return false;
    }
}

/**
 * Checks if the file or folder p is writable
 *
 * @param {string} p
 * @returns {boolean}
 */
function isWritable(p) {
    if (!fs.existsSync(p)) {
        return false;
    }
    let stats = fs.statSync(p);
    let mode = stats.mode;
    let uid = process.getuid ? process.getuid() : 0;
    let gid = process.getgid ? process.getgid() : 0;
    let owner = uid === stats.uid;
    let group = gid === stats.gid;
    return !!(owner && (mode & parseInt('00200', 8)) ||
        group && (mode & parseInt('00020', 8)) ||
        (mode & parseInt('00002', 8)));
}

/**
 * Modify the permissions of the file or folder p.
 * Synchronous mode
 * @param {string} p
 * @param {string} mode
 * @returns {*}
 */
function chmod(p, mode) {
    mode = mode || '0777';
    if (!fs.existsSync(p)) {
        return false;
    }
    fs.chmodSync(p, mode);
    return true;
}

/**
 * Read the contents of the file filename.
 * Asynchronous mode
 * @param {string} filename 文件物理路径
 * @param {undefined | string} enc 为空返回Buffer类型,'utf8'返回String类型
 * @returns {promise}
 */
function readFile(filename, enc) {
    return new Promise(function (fulfill, reject) {
        fs.readFile(filename, enc || 'utf8', function (err, res) {
            return err ? reject(err) : fulfill(res);
        });
    });
}

/**
 * Write the string data to file.
 * Asynchronous mode
 * @param {string} filename
 * @param {string} data
 * @returns {promise}
 */
function writeFile(filename, data) {
    return new Promise(function (fulfill, reject) {
        fs.writeFile(filename, data, function (err, res) {
            return err ? reject(err) : fulfill(res);
        });
    });
}

/**
 * Rename the filename to nfilename. If nfilename and filename are not in the same physical path, the move file action will be triggered.
 * Asynchronous mode
 * @param {string} filename
 * @param {string} nfilename
 * @returns {*}
 */
function reFile(filename, nfilename) {
    return new Promise(function (fulfill, reject) {
        fs.rename(filename, nfilename, function (err) {
            return err ? reject(err) : fulfill();
        });
    });
}

/**
 * Delete the file p.
 * Synchronous mode
 * @param {string} p 
 * @returns {boolean}
 */
function rmFile(p) {
    if (isFile(p)) {
        fs.unlinkSync(p);
        return true;
    }
    return false;
}

/**
 * According to the path p to create a folder, p contains multi-level new path will be automatically recursively created.
 * Synchronous mode
 * @param {string} p
 * @param {number} mode
 * @returns {*}
 */
function mkDir(p, mode = 777) {
    if (fs.existsSync(p)) {
        fs.chmodSync(p, mode);
        return true;
    }
    let pp = path.dirname(p);
    if (fs.existsSync(pp)) {
        fs.mkdirSync(p, mode);
    } else {
        mkDir(pp, mode);
        mkDir(p, mode);
    }
    return true;
}

/**
 * Recursively read the path under the p folder.
 * Synchronous mode
 * @param {any} p 
 * @param {any} filter 
 * @param {any} files 
 * @param {any} prefix 
 * @returns {*}
 */
function readDir(p, filter, files, prefix) {
    prefix = prefix || '';
    files = files || [];
    filter = filter || function (x) {
        return x[0] !== '.';
    };

    let dir = path.join(p, prefix);
    if (!fs.existsSync(dir)) {
        return files;
    }
    if (fs.statSync(dir).isDirectory()) {
        fs.readdirSync(dir).filter(filter).forEach(function (name) {
            readDir(p, filter, files, path.join(prefix, name));
        });
    } else {
        files.push(prefix);
    }
    return files;
}

/**
 * Subfolders of path p are recursively deleted. When reserve is true, the top-level folder is deleted
 * Asynchronous mode
 * @template T
 * @param {string} p
 * @param {boolean} reserve
 * @returns {*}
 */
function rmDir(p, reserve) {
    if (!isDir(p)) {
        return Promise.resolve(null);
    }
    let deferred = getDefer();
    fs.readdir(p, function (err, files) {
        if (err) {
            return deferred.reject(err);
        }
        let spromise = Promise.resolve(null);
        if (files.length > 0) {
            let promises = files.map(function (item) {
                let filePath = path.normalize(`${p}${path.sep}${item}`);
                if (isDir(filePath)) {
                    return rmDir(filePath, false);
                } else {
                    let defer = getDefer();
                    fs.unlink(filePath, function (er) {
                        return er ? defer.reject(er) : defer.resolve();
                    });
                    return defer.promise;
                }
            });
            spromise = Promise.all(promises);
        }

        return spromise.then(function () {
            if (!reserve) {
                let deferr = getDefer();
                fs.rmdir(p, function (e) {
                    return e ? deferr.reject(e) : deferr.resolve();
                });
                return deferr.promise;
            }
            return Promise.resolve();
        }).then(function () {
            deferred.resolve();
        }).catch(function (e) {
            deferred.reject(e);
        });
    });
    return deferred.promise;
}

/**
 * Short for hasOwnProperty
 * 
 * @param {any} obj 
 * @param {any} property 
 * @returns {boolean}
 */
function hasOwn(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
}

/**
 * Checks if value is a Promise object
 *
 * @param {any} value
 * @returns {boolean}
 */
function isPromise(value) {
    return !!(value && value.catch && typeof value.then === 'function');
}

/**
 * Convert callback-style functions to Promises
 *
 * @param {Function} fn
 * @param {object} receiver
 * @returns {Promise}
 */
function promisify(fn, receiver) {
    return function (...args) {
        return new Promise(function (resolve, reject) {
            fn.apply(receiver, [...args, function (err, res) {
                return err ? reject(err) : resolve(res);
            }]);
        });
    };
}

/**
 * Checks if fn is a GeneratorFunction
 * 
 * @param {any} fn 
 * @returns {boolean}
 */
function isGenerator(fn) {
    return !!(fn && typeof fn === 'function' && fn.constructor && fn.constructor.name === 'GeneratorFunction');
}

/**
 * Convert GeneratorFunction fn to Promise
 * 
 * @param {Function} fn 
 * @returns {Promise}
 */
function generatorToPromise(fn) {
    if (typeof fn !== 'function') {
        throw Error('fn is not a function');
    }
    if (!isGenerator(fn)) {
        // assume it's Promise-based
        return fn;
    }
    return co.wrap(fn);
}

/**
 * Generate a defer object, 
 * for example: {promise: new Promise()}
 * @returns {*} 
 */
function getDefer() {
    let defer = {};
    defer.promise = new Promise(function (resolve, reject) {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}
// define(lib, 'defer', lib.getDefer);

/**
 * Support for babel compiled es6 module require
 * 
 * @param {string} file
 * @returns {*}
 */
function thinkrequire(file) {
    try {
        let obj = require(file);
        obj = (obj && obj.__esModule && obj.default) ? obj.default : obj;
        if (lodash.isFunction(obj)) {
            obj.prototype.__filename = file;
        }
        return obj;
    } catch (e) {
        throw Error(e);
    }
}

/**
 * Copy the source, deep deep to true depth copy
 * 
 * @param {any} source 
 * @param {any} deep 
 * @returns {*}
 */
function clone(source, deep) {
    if (deep) {
        return lodash.cloneDeep(source);
    } else {
        return lodash.clone(source);
    }
}

/**
 * So that the target object inherits the source, 
 * deep depth is true depth inheritance
 * @param {any} source 
 * @param {any} target 
 * @param {any} deep 
 * @returns {*}
 */
function extend(source, target, deep) {
    if (deep) {
        return lodash.merge(lodash.cloneDeep(source), target);
    } else {
        return lodash.assignIn(source, target);
    }
}

//module exports
module.exports = new Proxy({
    sep: path.sep,
    eq: lodash.eq,
    gt: lodash.gt,
    gte: lodash.gte,
    lt: lodash.lt,
    lte: lodash.lte,
    isArray: lodash.isArray,
    isBoolean: lodash.isBoolean,
    isBuffer: lodash.isBuffer,
    isDate: lodash.isDate,
    isEqual: lodash.isEqual,
    isError: lodash.isError,
    isFunction: lodash.isFunction,
    isMap: lodash.isMap,
    isNull: lodash.isNull,
    isNaN: lodash.isNaN,
    isUndefined: lodash.isUndefined,
    isNumber: lodash.isNumber,
    isObject: lodash.isPlainObject,
    isRegExp: lodash.isRegExp,
    isRegexp: lodash.isRegExp,
    isSet: lodash.isSet,
    isString: lodash.isString,
    isSymbol: lodash.isSymbol,
    isNumberString: isNumberString,
    isJSONObj: isJSONObj,
    isJSONStr: isJSONStr,
    isEmpty: isEmpty,
    isTrueEmpty: isTrueEmpty,
    toString: lodash.toString,
    toInt: lodash.toInteger,
    toNumber: lodash.toNumber,
    toArray: lodash.toArray,
    escapeHtml: escapeHtml,
    escapeSpecial: escapeSpecial,
    ucFirst: ucFirst,
    md5: md5,
    md5Salt: md5Salt,
    rand: rand,
    datetime: datetime,
    inArray: inArray,
    arrUnique: lodash.union,
    arrRemove: arrRemove,
    isFile: isFile,
    isDir: isDir,
    isWritable: isWritable,
    chmod: chmod,
    readFile: readFile,
    writeFile: writeFile,
    reFile: reFile,
    rmFile: rmFile,
    mkDir: mkDir,
    readDir: readDir,
    rmDir: rmDir,
    hasOwn: hasOwn,
    isPromise: isPromise,
    promisify: promisify,
    isGenerator: isGenerator,
    generatorToPromise: generatorToPromise,
    defer: getDefer,
    getDefer: getDefer,
    require: thinkrequire,
    clone: clone,
    extend: extend,
    define: define,
    toFastProperties: toFastProperties,

}, {
    set: function (target, key, value, receiver) {
        if (Reflect.get(target, key, receiver) === undefined) {
            return Reflect.set(target, key, value, receiver);
        } else {
            throw Error('Cannot redefine getter-only property');
        }
    },
    deleteProperty: function (target, key) {
        throw Error('Cannot delete getter-only property');
    }
});