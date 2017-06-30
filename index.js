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
const net = require('net');
const crypto = require('crypto');
const lodash = require('lodash');

/**
 * v8引擎优化
 *
 * @param {object} obj
 */
const toFastProperties = function (obj) {
    let f = function f() { };
    f.prototype = obj;
    /*eslint-disable no-new*/
    new f();
};

/**
 * Object.defineProperty
 * 
 * @param {any} obj 
 * @param {any} property 
 * @param {any} value 
 * @param {boolean} [setter=false] 
 * @returns 
 */
const define = function (obj, property, value, setter = false) {
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
};

/**
 * console.log 封装
 * @param str
 */
global.echo = function (str) {
    let date = lib.datetime('', '');
    console.log('----------' + date + '----------');
    console.log(str);
    console.log('----------' + date + '----------');
};

var lib = {};

define(lib, 'toFastProperties', toFastProperties);
define(lib, 'define', define);
define(lib, 'sep', path.sep);
define(lib, 'eq', lodash.eq);
define(lib, 'gt', lodash.gt);
define(lib, 'gte', lodash.gte);
define(lib, 'lt', lodash.lt);
define(lib, 'lte', lodash.lte);
define(lib, 'isArray', lodash.isArray);
define(lib, 'isBoolean', lodash.isBoolean);
define(lib, 'isBuffer', lodash.isBuffer);
define(lib, 'isDate', lodash.isDate);
define(lib, 'isEqual', lodash.isEqual);
define(lib, 'isError', lodash.isError);
define(lib, 'isFunction', lodash.isFunction);
define(lib, 'isIP', net.isIP);
define(lib, 'isMap', lodash.isMap);
define(lib, 'isNull', lodash.isNull);
define(lib, 'isNaN', lodash.isNaN);
define(lib, 'isUndefined', lodash.isUndefined);
define(lib, 'isNumber', lodash.isNumber);
define(lib, 'isObject', lodash.isPlainObject); //lodash中isObject把Array也返回true,因此使用isPlainObject
define(lib, 'isRegexp', lodash.isRegExp);
define(lib, 'isSet', lodash.isSet);
define(lib, 'isString', lodash.isString);
define(lib, 'isSymbol', lodash.isSymbol);


/**
 * 是否是仅包含数字的字符串
 *
 * @param {*} obj
 * @returns {boolean}
 */
define(lib, 'isNumberString', function (obj) {
    let numberReg = /^((\-?\d*\.?\d*(?:e[+-]?\d*(?:\d?\.?|\.?\d?)\d*)?)|(0[0-7]+)|(0x[0-9a-f]+))$/i;
    return numberReg.test(obj);
});
/**
 * 是否是标准JSON对象
 * 必须是对象或数组
 * @param {*} obj
 * @returns {boolean}
 */
define(lib, 'isJSONObj', function (obj) {
    return lib.isObject(obj) || lib.isArray(obj);
});

/**
 * 是否是标准的JSON字符串
 * 必须是字符串，且可以被反解为对象或数组
 * @param {*} obj
 * @returns {boolean}
 */
define(lib, 'isJSONStr', function (obj) {
    if (!lib.isString(obj)) {
        return false;
    }
    try {
        return lib.isJSONObj(JSON.parse(obj));
    } catch (e) {
        return false;
    }
});

/**
 * 检查对象是否为空
 * 不考虑空对象、数组
 * @param {*} obj
 * @returns {boolean}
 */
define(lib, 'isTrueEmpty', function (obj) {
    if (obj === undefined || obj === null || obj === '') {
        return true;
    }
    if (lib.isNumber(obj)) {
        return isNaN(obj);
    }
    return false;
});

/**
 * 检查对象是否为空
 * undefined,null,'',NaN,[],{}和任何空白字符，包括空格、制表符、换页符等等，均返回true
 * @param {*} obj
 * @returns {boolean}
 */
define(lib, 'isEmpty', function (obj) {
    if (obj === undefined || obj === null || obj === '') {
        return true;
    } else if (lib.isString(obj)) {
        //\s 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。
        return obj.replace(/(^\s*)|(\s*$)/g, '').length === 0;
    } else if (lib.isNumber(obj)) {
        return isNaN(obj);
    } else if (lib.isArray(obj)) {
        return obj.length === 0;
    } else if (lib.isObject(obj)) {
        for (let key in obj) {
            return !key && !0;
        }
        return true;
    }
    return false;
});

/**
 * 强制转换为字符串
 * 跟.toString不同的是可以转换undefined和null
 * @param {*} obj
 * @returns {string}
 */
define(lib, 'toString', function (obj) {
    if (obj === undefined || obj === null) {
        return '';
    }
    return lodash.toString(obj);
});

/**
 * 强制转换为整型
 *
 * @param {*} obj
 * @returns {number}
 */
define(lib, 'toInt', function (obj) {
    return isNaN(obj) ? 0 : lodash.toInteger(obj);
});

/**
 * 强制转换为浮点型
 *
 * @param {*} obj
 * @returns {number}
 */
define(lib, 'toFloat', function (obj) {
    return isNaN(obj) ? 0 : parseFloat(obj);
});

/**
 * 强制转换为数值
 *
 * @param {*} obj
 * @returns {number}
 */
define(lib, 'toNumber', function (obj) {
    return isNaN(obj) ? 0 : lodash.toNumber(obj);
});

/**
 * 强制转换为布尔值
 *
 * @param {*} obj
 * @returns {boolean}
 */
define(lib, 'toBoolean', function (obj) {
    return Boolean(obj);
});

/**
 * 强制转换为数组
 *
 * @param {*} obj
 * @returns {boolean}
 */
define(lib, 'toArray', function (obj) {
    return lodash.toArray(obj);
});

/**
 * 强制转换为对象
 *
 * @param {*} obj
 * @returns {boolean}
 */
define(lib, 'toObject', function (obj) {
    return lodash.toPlainObject(obj);
});

/**
 * 字符转义实体
 *
 * @param {string} str
 * @returns {string}
 */
define(lib, 'escapeHtml', function (str) {
    let htmlMaps = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quote;',
        '\'': '&#39;'
    };
    return (str + '').replace(/[<>'"]/g, function (a) {
        return htmlMaps[a];
    });
});

/**
 * 实体转义字符
 *
 * @param {string} str
 * @returns {string}
 */
define(lib, 'escapeSpecial', function (str) {
    let specialMaps = {
        '&lt;': '<',
        '&gt;': '>',
        '&quote;': '"',
        '&#39;': '\''
    };
    for (let n in specialMaps) {
        str = str.replace(new RegExp(n, 'g'), specialMaps[n]);
    }
    return str;
});

/**
 * 大写首字符
 * 
 * @param {string} name 
 * @returns {string} 
 */
define(lib, 'ucFirst', function (name) {
    name = (name || '') + '';
    return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
});

/**
 * md5
 *
 * @param {string} str
 * @returns {string}
 */
define(lib, 'md5', function (str) {
    let ins = crypto.createHash('md5');
    ins.update(str + '', 'utf8');
    return ins.digest('hex');
});

/**
 * rand
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
define(lib, 'rand', function (min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
});

/**
 * AES字符串加密
 *
 * @param {string} data 需要加密的字符串
 * @param {string} key 密钥 (必须为16位字符串)
 * @returns {string}
 */
define(lib, 'encryption', function (data, key) {
    try {
        let iv = '0000000000000000';
        // let clearEncoding = 'utf8';
        // let cipherEncoding = 'base64';
        let cipherChunks = [];
        let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
        cipher.setAutoPadding(true);
        cipherChunks.push(cipher.update(data, 'utf8', 'base64'));
        cipherChunks.push(cipher.final('base64'));
        return encodeURIComponent(cipherChunks.join(''));
    } catch (e) {
        return '';
    }
});

/**
 * AES字符串解密
 *
 * @param {string} data 需要解密的字符串
 * @param {string} key 密钥 (必须为16位字符串)
 * @returns {string}
 */
define(lib, 'decryption', function (data, key) {
    try {
        let iv = '0000000000000000';
        // let clearEncoding = 'utf8';
        // let cipherEncoding = 'base64';
        let cipherChunks = [];
        let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        decipher.setAutoPadding(true);
        cipherChunks.push(decipher.update(decodeURIComponent(data), 'base64', 'utf8'));
        cipherChunks.push(decipher.final('utf8'));
        return cipherChunks.join('');
    } catch (e) {
        return '';
    }
});

/**
 * 日期时间戳及格式化
 *
 * @param {any} date
 * @param {any} format
 * @returns
 */
define(lib, 'datetime', function (date, format) {
    if (format === undefined) {
        //datetime() => now timestamp
        if (date === undefined) {
            return Math.floor(Date.now() / 1000);
        } else if (lib.isString(date)) { //datetime('2017-01-01') => timestamp
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
        if (date && lib.isNumber(date)) {
            let newDate = new Date();
            newDate.setTime(date * 1000);
            return fn(newDate, format);
        }
        if (date && lib.isString(date)) {
            return fn(new Date(Date.parse(date)), format);
        }
        return fn(new Date(), format);
    }
});

/**
 * 判断值是否为数组的元素
 * 非严格匹配
 * @param {*} value
 * @param {any[]} arr
 * @returns {boolean}
 */
define(lib, 'inArray', function (value, arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        if (arr[i] == value) {
            return true;
        }
    }
    return false;
});

/**
 * 数组去重
 *
 * @param {any[]} arr
 * @returns {*}
 */
define(lib, 'arrUnique', function (arr) {
    return lodash.union(arr);
});

/**
 * 数组删除元素
 * indexs为需要删除的下标数组
 * @param {any[]} arr
 * @param {any[]} indexs
 * @returns {*}
 */
define(lib, 'arrRemove', function (arr, indexs) {
    return lodash.remove(arr, function (n, i) {
        return i === indexs;
    });
});

/**
 * 
 *
 * @param {string} p
 * @returns {boolean}
 */
define(lib, 'isFile', function (p) {
    if (!fs.existsSync(p)) {
        return false;
    }
    try {
        let stats = fs.statSync(p);
        return stats.isFile();
    } catch (e) {
        return false;
    }
});

/**
 * 
 *
 * @param {string} p
 * @returns {boolean}
 */
define(lib, 'isDir', function (p) {
    if (!fs.existsSync(p)) {
        return false;
    }
    try {
        let stats = fs.statSync(p);
        return stats.isDirectory();
    } catch (e) {
        return false;
    }
});

/**
 * 判断一个文件或者目录是否可写
 *
 * @param {string} p
 * @returns {boolean}
 */
define(lib, 'isWritable', function (p) {
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
});

/**
 * 修改目录或者文件权限
 * 同步模式
 * @param {string} p
 * @param {string} mode
 * @returns {*}
 */
define(lib, 'chmod', function (p, mode) {
    mode = mode || '0777';
    if (!fs.existsSync(p)) {
        return true;
    }
    return fs.chmodSync(p, mode);
});

/**
 * 读取文件
 * 返回Promise
 * @param {string} filename 文件物理路径
 * @param {*} enc 为空返回Buffer类型,'utf8'返回String类型
 * @returns {*}
 */
define(lib, 'readFile', function (filename, enc) {
    return new Promise(function (fulfill, reject) {
        fs.readFile(filename, enc || 'utf8', function (err, res) {
            return err ? reject(err) : fulfill(res);
        });
    });
});

/**
 * 写入文件
 * 返回Promise
 * @param {string} filename
 * @param {*} data
 * @returns {*}
 */
define(lib, 'writeFile', function (filename, data) {
    return new Promise(function (fulfill, reject) {
        fs.writeFile(filename, data, function (err, res) {
            return err ? reject(err) : fulfill(res);
        });
    });
});

/**
 * 修改文件名
 * 支持移动
 * @param {string} filename
 * @param {string} nfilename
 * @returns {*}
 */
define(lib, 'reFile', function (filename, nfilename) {
    return new Promise(function (fulfill, reject) {
        fs.rename(filename, nfilename, function (err) {
            return err ? reject(err) : fulfill();
        });
    });
});

/**
 * 删除文件
 * 同步模式
 * @param {any} p 
 * @returns 
 */
define(lib, 'rmFile', function (p) {
    let fn = function () { };
    if (lib.isFile(p)) {
        fs.unlinkSync(p, fn);
        return true;
    }
    return false;
});

/**
 * 递归创建目录
 * 同步模式
 * @param {string} p
 * @param {string} mode
 * @returns {*}
 */
define(lib, 'mkDir', function (p, mode) {
    mode = mode || '0777';
    if (fs.existsSync(p)) {
        fs.chmodSync(p, mode);
        return true;
    }
    let pp = path.dirname(p);
    if (fs.existsSync(pp)) {
        fs.mkdirSync(p, mode);
    } else {
        lib.mkDir(pp, mode);
        lib.mkDir(p, mode);
    }
    return true;
});

/**
 * 递归读取目录
 * 同步模式
 * @param {any} p 
 * @param {any} filter 
 * @param {any} files 
 * @param {any} prefix 
 * @returns 
 */
define(lib, 'readDir', function (p, filter, files, prefix) {
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
            lib.readDir(p, filter, files, path.join(prefix, name));
        });
    } else {
        files.push(prefix);
    }
    return files;
});

/**
 * 递归的删除目录
 * 返回Promise
 * @template T
 * @param {string} p
 * @param {boolean} reserve
 * @returns {*}
 */
define(lib, 'rmDir', function (p, reserve) {
    if (!lib.isDir) {
        return Promise.resolve(null);
    }
    let deferred = lib.getDefer();
    fs.readdir(p, function (err, files) {
        if (err) {
            return deferred.reject(err);
        }
        let spromise = Promise.resolve(null);
        if (files.length > 0) {
            let promises = files.map(function (item) {
                let filePath = path.normalize(`${p}${path.sep}${item}`);
                if (lib.isDir(filePath)) {
                    return lib.rmDir(filePath, false);
                } else {
                    let defer = lib.getDefer();
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
                let deferr = lib.getDefer();
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
});

/**
 * 
 *
 * @param {*} obj
 * @returns {boolean}
 */
define(lib, 'isPromise', function (obj) {
    return !!(obj && obj.catch && typeof obj.then === 'function');
});

/**
 * 将callback风格的函数转换为Promise
 *
 * @param {Function} fn
 * @param {object} receiver
 * @returns {*}
 */
define(lib, 'promisify', function (fn, receiver) {
    return function (...args) {
        return new Promise(function (resolve, reject) {
            fn.apply(receiver, [...args, function (err, res) {
                return err ? reject(err) : resolve(res);
            }]);
        });
    };
});

/**
 * 
 * 
 * @param {any} obj 
 * @returns 
 */
define(lib, 'isGenerator', function (obj) {
    return !!(obj && typeof obj === 'function' && obj.constructor && obj.constructor.name === 'GeneratorFunction');
});

/**
 * 将generator函数通过co转换为promise
 * 
 * @param {Function} fn 
 */
define(lib, 'generatorToPromise', function (fn) {
    if (typeof fn !== 'function') {
        throw Error('fn is not a function');
    }
    if (!lib.isGenerator(fn)) {
        // assume it's Promise-based
        return fn;
    }
    return co.wrap(fn);
});

/**
 * 生成一个defer对象
 * 
 * @returns {*} 
 */
define(lib, 'getDefer', function () {
    let defer = {};
    defer.promise = new Promise(function (resolve, reject) {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
});

/**
 * 加载文件
 * 
 * @param {string} file
 * @returns {*}
 */
define(lib, 'require', function (file) {
    try {
        let obj = require(file);
        obj = (obj && obj.__esModule && obj.default) ? obj.default : obj;
        if (lib.isFunction(obj)) {
            obj.prototype.__filename = file;
        }
        return obj;
    } catch (e) {
        throw Error(e);
    }
});

/**
 * 克隆
 * 
 * @param {any} source 
 * @param {any} deep 
 * @returns 
 */
define(lib, 'clone', function (source, deep) {
    if (deep) {
        return lodash.cloneDeep(source);
    } else {
        return lodash.clone(source);
    }
});

/**
 * 继承
 * 
 * @param {any} source 
 * @param {any} target 
 * @param {any} deep 
 * @returns 
 */
define(lib, 'extend', function (source, target, deep) {
    if (deep) {
        return lodash.merge(lodash.cloneDeep(source), target);
    } else {
        return lodash.assignIn(source, target);
    }
});

module.exports = lib;