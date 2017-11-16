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
 * console.log 封装
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
 * 将对象 obj 进行原型实例转换,以整理该对象存储的数据结构,在v8引擎下访问此对象会更快
 * 
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
 * Object.defineProperty的封装
 * 当 setter 为false时属性 property 为getter
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
 * 检查 value 是否是仅包含数字的字符串
 * 
 * @param {any} value 
 * @returns {boolean}
 */
function isNumberString(value) {
    let numberReg = /^((\-?\d*\.?\d*(?:e[+-]?\d*(?:\d?\.?|\.?\d?)\d*)?)|(0[0-7]+)|(0x[0-9a-f]+))$/i;
    return numberReg.test(value);
}
/**
 * 检查 value 是否是标准JSON对象
 * 必须是标准对象或数组
 * @param {any} value 
 * @returns {boolean}
 */
function isJSONObj(value) {
    return lodash.isPlainObject(value) || lodash.isArray(value);
}

/**
 * 检查 value 是否是标准的JSON字符串
 * 必须是字符串，且可以被反序列化为对象或数组
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
 * 检查 value 是否为空
 * 不考虑空对象、空数组、空格、制表符、换页符等
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
 * 检查 value 是否为空
 * undefined,null,'',NaN,[],{}和任何空白字符，包括空格、制表符、换页符等等，均返回true
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
 * 转换 value 中的特殊字符 > < " ' 为实体符
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
 * 转换 value 中的实体符还原为 > < " '
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
 * 转换 value 中的首字母为大写
 * 
 * @param {string} value 
 * @returns {string} 
 */
function ucFirst(value) {
    value = lodash.toString(value || '');
    return value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase();
}

/**
 * 计算 value 的MD5散列值
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
 * 伪随机获取min和max范围内的整数
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function rand(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

/**
 * 将字符串data进行AES加密
 *
 * @param {string} data 需要加密的字符串
 * @param {string} key 密钥 (必须为16位字符串)
 * @returns {string}
 */
function encryption(data, key) {
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
}

/**
 * 将AES加密的字符串data进行解密
 *
 * @param {string} data 需要解密的字符串
 * @param {string} key 密钥 (必须为16位字符串)
 * @returns {string}
 */
function decryption(data, key) {
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
}

/**
 * 日期时间戳及格式化
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
 * 判断 value 是否为数组 arr 的元素
 * 仅判断 value 值同元素值相等,不判断类型
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
 * 将数组 arr 中指定下标 index 元素移除
 * 
 * @param {any[]} arr
 * @param {any[]} index
 * @returns {any[]}
 */
function arrRemove(arr, index) {
    return lodash.remove(arr, function (n, i) {
        return i === index;
    });
}

/**
 * 检查 p 是否是文件
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
 * 
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
 * 检查文件或文件夹 p 是否可写
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
 * 修改文件或文件夹 p 的权限.
 * 同步模式
 * @param {string} p
 * @param {string} mode
 * @returns {*}
 */
function chmod(p, mode) {
    mode = mode || '0777';
    if (!fs.existsSync(p)) {
        return true;
    }
    return fs.chmodSync(p, mode);
}

/**
 * 读取文件 filename 内容
 * 返回Promise
 * @param {string} filename 文件物理路径
 * @param {undefined | string} enc 为空返回Buffer类型,'utf8'返回String类型
 * @returns {*}
 */
function readFile(filename, enc) {
    return new Promise(function (fulfill, reject) {
        fs.readFile(filename, enc || 'utf8', function (err, res) {
            return err ? reject(err) : fulfill(res);
        });
    });
}

/**
 * 将字符串 data 写入文件 filename
 * 返回Promise
 * @param {string} filename
 * @param {string} data
 * @returns {*}
 */
function writeFile(filename, data) {
    return new Promise(function (fulfill, reject) {
        fs.writeFile(filename, data, function (err, res) {
            return err ? reject(err) : fulfill(res);
        });
    });
}

/**
 * 将文件 filename 改名为 nfilename.如果 nfilename 和 filename 不在同一物理路径下,会触发移动文件操作.
 * 返回Promise
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
 * 将文件 p 删除
 * 同步模式
 * @param {string} p 
 * @returns {boolean}
 */
function rmFile(p) {
    let fn = function () { };
    if (isFile(p)) {
        fs.unlinkSync(p, fn);
        return true;
    }
    return false;
}

/**
 * 根据路径 p 创建文件夹, 如果 p 包含多级新建路径,会自动递归创建
 * 同步模式
 * @param {string} p
 * @param {string} mode
 * @returns {*}
 */
function mkDir(p, mode) {
    mode = mode || '0777';
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
 * 递归读取路径 p 下的文件夹
 * 同步模式
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
 * 递归删除路径 p 的子文件夹. reserve 为true时删除 p
 * 返回Promise
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
 * hasOwnProperty缩写
 * 
 * @param {any} obj 
 * @param {any} property 
 * @returns {boolean}
 */
function hasOwn(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
}

/**
 * 检查 value 是否是 Promise 对象
 *
 * @param {any} value
 * @returns {boolean}
 */
function isPromise(value) {
    return !!(value && value.catch && typeof value.then === 'function');
}

/**
 * 将callback风格的函数转换为Promise
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
 * 检查 fn 是否是 GeneratorFunction
 * 
 * @param {any} fn 
 * @returns {boolean}
 */
function isGenerator(fn) {
    return !!(fn && typeof fn === 'function' && fn.constructor && fn.constructor.name === 'GeneratorFunction');
}

/**
 * 将GeneratorFunction函数 fn 转换为 Promise 风格
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
 * 生成一个defer对象, {promise: new Promise()}
 * 
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
 * require 的封装, 支持babel编译后的es6 module
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
 * 拷贝对象 source, deep 为true时深度拷贝
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
 * 使对象 target 继承对象 source, deep为true时深度继承
 * 
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

// let pops = {
//         sep: path.sep,
//         eq: lodash.eq,
//         gt: lodash.gt,
//         gte: lodash.gte,
//         lt: lodash.lt,
//         lte: lodash.lte,
//         isArray: lodash.isArray,
//         isBoolean: lodash.isBoolean,
//         isBuffer: lodash.isBuffer,
//         isDate: lodash.isDate,
//         isEqual: lodash.isEqual,
//         isError: lodash.isError,
//         isFunction: lodash.isFunction,
//         isIP: net.isIP,
//         isMap: lodash.isMap,
//         isNull: lodash.isNull,
//         isNaN: lodash.isNaN,
//         isUndefined: lodash.isUndefined,
//         isNumber: lodash.isNumber,
//         isObject: lodash.isPlainObject,
//         isRegExp: lodash.isRegExp,
//         isRegexp: lodash.isRegExp,
//         isSet: lodash.isSet,
//         isString: lodash.isString,
//         isSymbol: lodash.isSymbol,
//         isNumberString: isNumberString,
//         isJSONObj: isJSONObj,
//         isJSONStr: isJSONStr,
//         isEmpty: isEmpty,
//         isTrueEmpty: isTrueEmpty,
//         toString: lodash.toString,
//         toInt: lodash.toInteger,
//         toNumber: lodash.toNumber,
//         toBoolean: lodash.toBoolean,
//         toArray: lodash.toArray,
//         escapeHtml: escapeHtml,
//         escapeSpecial: escapeSpecial,
//         ucFirst: ucFirst,
//         md5: md5,
//         rand: rand,
//         encryption: encryption,
//         decryption: decryption,
//         datetime: datetime,
//         inArray: inArray,
//         arrUnique: lodash.union,
//         arrRemove: arrRemove,
//         isFile: isFile,
//         isDir: isDir,
//         isWritable: isWritable,
//         chmod: chmod,
//         readFile: readFile,
//         writeFile: writeFile,
//         reFile: reFile,
//         rmFile: rmFile,
//         mkDir: mkDir,
//         readDir: readDir,
//         rmDir: rmDir,
//         hasOwn: hasOwn,
//         isPromise: isPromise,
//         promisify: promisify,
//         isGenerator: isGenerator,
//         generatorToPromise: generatorToPromise,
//         defer: getDefer,
//         getDefer: getDefer,
//         require: thinkrequire,
//         clone: clone,
//         extend: extend,
//         hasOwn: hasOwn,
//         define: define,
//         toFastProperties: toFastProperties,

//     }, lib = {};

// for (let n in pops) {
//     Object.defineProperty(lib, n, {
//         enumerable: true,
//         configurable: false,
//         get: function () {
//             return pops[n];
//         }
//     });
// }

// module.exports = lib;

const lib = new Proxy({
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
    isIP: net.isIP,
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
    rand: rand,
    encryption: encryption,
    decryption: decryption,
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
    hasOwn: hasOwn,
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