/* eslint-disable func-style */
/**
 * @ author: richen
 * @ copyright: Copyright (c) - <richenlin(at)gmail.com>
 * @ license: MIT
 * @ version: 2020-03-25 02:54:22
 */
const fs = require('fs');
const co = require('co');
const path = require('path');
const crypto = require('crypto');
const lodash = require('lodash');
const moment = require('moment');
const murmur = require('murmurhash');

/**
 * Formatted console.log output
 * 
 * @param {*} str 
 * @returns {void}
 */
global.echo = function (str) {
    const date = datetime('', '');
    console.log('----------' + date + '----------');
    console.log(str);
    console.log('----------' + date + '----------');
};

/**
 * The object obj prototype instance conversion to organize the data structure stored in the object,
 * access to this object in the v8 engine will be faster
 *
 * @export
 * @param {*} obj
 */
function toFastProperties(obj) {
    // eslint-disable-next-line no-empty-function
    const f = function f() { };
    f.prototype = obj;
    // eslint-disable-next-line no-new
    new f();
}

/**
 * Short for Object.defineProperty,
 * the property is getter when setter is false
 *
 * @export
 * @param {*} obj
 * @param {string} property
 * @param {*} value
 * @param {boolean} [setter=false]
 * @returns
 */
function define(obj, property, value, setter = false) {
    if (setter) {
        Object.defineProperty(obj, property, {
            value,
            writable: true,
            configurable: false,
            enumerable: true
        });
    } else {
        Object.defineProperty(obj, property, {
            // tslint:disable-next-line-literal-shorthand
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
 * @export
 * @param {*} value
 * @returns {boolean}
 */
function isNumberString(value) {
    const numberReg = /^((-?\d*\.?\d*(?:e[+-]?\d*(?:\d?\.?|\.?\d?)\d*)?)|(0[0-7]+)|(0x[0-9a-f]+))$/i;
    return lodash.isString(value) && !isEmpty(value) && numberReg.test(value);
}

/**
 * Checks if value is a standard JSON object,
 * must be a plain object or array
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
function isJSONObj(value) {
    return lodash.isPlainObject(value) || lodash.isArray(value);
}

/**
 * Checks if value is a standard JSON string,
 * must be a string, and can be deserialized as an plain object or array
 *
 * @export
 * @param {*} value
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
 *
 * @export
 * @param {*} value
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
 * 
 * @export
 * @param {*} value
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
 * Short for hasOwnProperty
 *
 * @export
 * @param {object} obj
 * @param {string} property
 * @returns {boolean}
 */
function hasOwn(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
}

/**
 * Checks if value is a Promise object
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
function isPromise(value) {
    return !!(value && value.catch && typeof value.then === 'function');
}

/**
 * Convert callback-style functions to Promises
 *
 * @export
 * @param {Function} fn
 * @param {object} [receiver]
 * @returns {() => Promise<any>}
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
 * @export
 * @param {*} fn
 * @returns {boolean}
 */
function isGenerator(fn) {
    return !!(fn && typeof fn === 'function' && fn.constructor && fn.constructor.name === 'GeneratorFunction');
}

/**
 * Checks if value is a Async Function
 *
 * @export
 * @param {*} fn
 * @returns {boolean}
 */
function isAsyncFunction(fn) {
    return !!(fn && typeof fn === 'function' && fn.constructor && 'AsyncFunction' === fn.constructor.name);
}

/**
 * Convert GeneratorFunction fn to Promise
 *
 * @export
 * @param {Function} fn
 * @returns
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
 * Checks if fn is a Class
 *
 * @export
 * @param {*} obj
 * @param {boolean} [strict=true]
 * @returns {boolean}
 */
function isClass(obj, strict = true) {
    if (typeof obj !== 'function') {
        return false;
    }

    const str = obj.toString();

    // async function or arrow function
    if (obj.prototype === undefined) {
        return false;
    }
    // generator function and malformed extends
    if (obj.prototype.constructor !== obj) {
        return false;
    }
    // ES6 class
    if (str.slice(0, 5) === 'class') {
        return true;
    }
    // has own prototype properties
    if (Object.getOwnPropertyNames(obj.prototype).length >= 2) {
        return true;
    }
    // anonymous function
    if (/^function\s+\(|^function\s+anonymous\(/.test(str)) {
        return false;
    }
    // ES5 class without `this` in the body and the name's first character 
    // upper-cased.
    if (strict && /^function\s+[A-Z]/.test(str)) {
        return true;
    }
    // has `this` in the body
    // eslint-disable-next-line no-useless-escape
    if (/\b\(this\b|\bthis[\.\[]\b/.test(str)) {
        // not strict or ES5 class generated by babel
        if (!strict || /classCallCheck\(this/.test(str)) {
            return true;
        }
        return /^function\sdefault_\d+\s*\(/.test(str);
    }

    return false;
}

/**
 * Convert special characters(> < " ') for entity character
 *
 * @export
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
    const htmlMaps = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quote;',
        '\'': '&#39;'
    };
    return (`${value}`).replace(/[<>'"]/g, function (a) {
        return htmlMaps[a];
    });
}

/**
 * Convert entity value in value to(> < " ')
 *
 * @export
 * @param {string} value
 * @returns {string}
 */
function escapeSpecial(value) {
    const specialMaps = {
        '&lt;': '<',
        '&gt;': '>',
        '&quote;': '"',
        '&#39;': '\''
    };
    // tslint:disable-next-line: forin
    for (const n in specialMaps) {
        value = value.replace(new RegExp(n, 'g'), specialMaps[n]);
    }
    return value;
}

/**
 * Convert the first letter in the value to uppercase
 *
 * @export
 * @param {*} value
 * @returns {string}
 */
function ucFirst(value) {
    value = lodash.toString(value || '');
    return value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase();
}

/**
 * Calculate the MD5 hash of value
 *
 * @export
 * @param {string} value
 * @returns {string}
 */
function md5(value) {
    const ins = crypto.createHash('md5');
    ins.update(value);
    return ins.digest('hex');
}

/**
 * Calculate the value of MD5 hash value, including simple salt
 *
 * @export
 * @param {string} value
 * @param {string} [salt='abcdefghijklmnopqrstuvwxyz1234567890']
 * @returns {string}
 */
function md5Salt(value, salt = 'abcdefghijklmnopqrstuvwxyz1234567890') {
    const ins = crypto.createHash('md5');
    value = value + salt.slice(value.length % salt.length, salt.length);
    ins.update(value);
    return ins.digest('hex');
}

/**
 * Pseudo-random access min and max range of integers
 *
 * @export
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function rand(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}


const dateFn = function (f) {
    // let Week = ['日', '一', '二', '三', '四', '五', '六'];
    f = f.replace(/yyyy/, 'YYYY');
    f = f.replace(/yy/, 'YY');
    f = f.replace(/mm/, 'MM');
    f = f.replace(/mi|MI/, 'mm');
    // f = f.replace(/w|W/g, Week[d.getDay()]);
    f = f.replace(/dd/, 'DD');
    return f;
};

/**
 * Date time stamp and formatting
 *
 * @export
 * @param {(number | string | undefined)} date
 * @param {string} [format] defaults  'YYYY-MM-DD HH:mm:ss.SSS'
 * @param {number} [offset] defaults  8
 * @returns {(number | string)}
 */
function datetime(date, format, offset = 8) {
    if (format === undefined) {
        //datetime() => now timestamp
        if (lodash.isString(date)) { //datetime('2017-01-01') => timestamp
            return Math.floor(new Date(date).getTime() / 1000);
        } else {
            return Math.floor(Date.now() / 1000);
        }
    } else {
        if (format) {
            format = dateFn(format);
        } else {
            format = 'YYYY-MM-DD HH:mm:ss.SSS';
        }

        if (date && lodash.isNumber(date)) {
            if (date < 10000000000) {
                return moment.unix(date).utcOffset(offset).format(format);
            } else {
                return moment(date).utcOffset(offset).format(format);
            }
        }
        if (date && lodash.isString(date)) {
            return moment(new Date(Date.parse(date))).utcOffset(offset).format(format);
        }
        return moment().utcOffset(offset).format(format);
    }
}

/**
 * Determines whether value is an element of array arr,
 * only determine the same value with the element, do not determine the type
 *
 * @export
 * @param {*} value
 * @param {any[]} arr
 * @returns {boolean}
 */
function inArray(value, arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        // eslint-disable-next-line eqeqeq
        if (arr[i] == value) {
            return true;
        }
    }
    return false;
}

/**
 * Removes the specified index element from the array
 *
 * @export
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
 * Checks if path is a file
 *
 * @export
 * @param {string} p
 * @returns {boolean}
 */
function isFile(p) {
    if (!fs.existsSync(p)) {
        return false;
    }
    try {
        const stats = fs.statSync(p);
        return stats.isFile();
    } catch (e) {
        return false;
    }
}

/**
 * Checks if path is a dir
 *
 * @export
 * @param {string} p
 * @returns {boolean}
 */
function isDir(p) {
    if (!fs.existsSync(p)) {
        return false;
    }
    try {
        const stats = fs.statSync(p);
        return stats.isDirectory();
    } catch (e) {
        return false;
    }
}

/**
 * Checks if the file or folder p is writable
 *
 * @export
 * @param {string} p
 * @returns {boolean}
 */
function isWritable(p) {
    if (!fs.existsSync(p)) {
        return false;
    }
    const stats = fs.statSync(p);
    const mode = stats.mode;
    const uid = process.getuid ? process.getuid() : 0;
    const gid = process.getgid ? process.getgid() : 0;
    const owner = uid === stats.uid;
    const group = gid === stats.gid;
    return !!(owner && (mode & parseInt('00200', 8)) ||
        group && (mode & parseInt('00020', 8)) ||
        (mode & parseInt('00002', 8)));
}

/**
 * Modify the permissions of the file or folder p.
 * Synchronous mode
 *
 * @export
 * @param {string} p
 * @param {string} [mode]
 * @returns {boolean}
 */
function chmod(p, mode) {
    try {
        mode = mode || '0777';
        if (!fs.existsSync(p)) {
            return true;
        }
        fs.chmodSync(p, mode);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Read the contents of the file filename.
 * Asynchronous mode
 *
 * @export
 * @param {string} filename
 * @param {string} [enc] defaults 'utf8'
 * @returns {Promise<any>}
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
 *
 * @export
 * @param {string} filename
 * @param {string} data
 * @returns {Promise<any>}
 */
function writeFile(filename, data) {
    return new Promise(function (fulfill, reject) {
        fs.writeFile(filename, data, (err) => {
            return err ? reject(err) : fulfill();
        });
    });
}

/**
 * Rename the filename to nfilename. If nfilename and filename are not in the same physical path, the move file action will be triggered.
 * Asynchronous mode
 *
 * @export
 * @param {string} filename
 * @param {string} nfilename
 * @returns {Promise<any>}
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
 *
 * @export
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
 * @returns {boolean}
 */
function mkDir(p, mode = '0777') {
    try {
        if (fs.existsSync(p)) {
            chmod(p, mode);
        } else {
            if (mkDir(path.dirname(p))) {
                fs.mkdirSync(p, mode);
            }
        }
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Recursively read the path under the p folder.
 * Synchronous mode
 *
 * @export
 * @param {string} p
 * @param {Function} [filter]
 * @param {any[]} [files]
 * @param {string} [prefix]
 * @returns {any[]}
 */
function readDir(p, filter, files, prefix) {
    prefix = prefix || '';
    files = files || [];
    filter = filter || function (x) {
        return x[0] !== '.';
    };

    const dir = path.join(p, prefix);
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
 * @returns {Promise<any>}
 */
function rmDir(p, reserve) {
    if (!isDir(p)) {
        return Promise.resolve(null);
    }
    const deferred = getDefer();
    fs.readdir(p, function (err, files) {
        if (err) {
            return deferred.reject(err);
        }
        let spromise = Promise.resolve(null);
        if (files.length > 0) {
            const promises = files.map(function (item) {
                const filePath = path.normalize(`${p}${path.sep}${item}`);
                if (isDir(filePath)) {
                    return rmDir(filePath, false);
                } else {
                    const defer = getDefer();
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
                const deferr = getDefer();
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
 * Generate a defer object,
 * for example: {promise: new Promise()}
 *
 * @export
 * @returns {*}
 */
function getDefer() {
    const defer = {};
    defer.promise = new Promise(function (resolve, reject) {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}

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
 * @export
 * @template T
 * @param {T} source
 * @param {boolean} [deep]
 * @returns {T}
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
 *
 * @export
 * @template T
 * @param {T} source
 * @param {object} target
 * @param {boolean} [deep]
 * @returns {T}
 */
function extend(source, target, deep) {
    if (deep) {
        return lodash.merge(lodash.cloneDeep(source), target);
    } else {
        return lodash.assignIn(source, target);
    }
}

/**
 * 
 * @param string string
 */
const preserveCamelCase = function (string) {
    let isLastCharLower = false;
    let isLastCharUpper = false;
    let isLastLastCharUpper = false;

    for (let i = 0; i < string.length; i++) {
        const character = string[i];

        if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
            string = string.slice(0, i) + '-' + string.slice(i);
            isLastCharLower = false;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = true;
            i++;
        } else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
            string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = false;
            isLastCharLower = true;
        } else {
            isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
        }
    }

    return string;
};

/**
 * convert string to camelCase/pascalCase
 *
 * @export
 * @param {string} input
 * @param {boolean} [pascalCase=false]
 * @returns {string}
 */
function camelCase(input, pascalCase = false) {
    if (!(typeof input === 'string' || Array.isArray(input))) {
        throw new TypeError('Expected the input to be `string | string[]`');
    }

    const postProcess = (x) => pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;

    if (Array.isArray(input)) {
        input = input.map((x) => x.trim()).filter((x) => x.length).join('-');
    } else {
        input = input.trim();
    }

    if (input.length === 0) {
        return '';
    }

    if (input.length === 1) {
        return pascalCase ? input.toUpperCase() : input.toLowerCase();
    }

    const hasUpperCase = input !== input.toLowerCase();

    if (hasUpperCase) {
        input = preserveCamelCase(input);
    }

    input = input.replace(/^[_.\- ]+/, '').toLowerCase().replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase()).replace(/\d+(\w|$)/g, (m) => m.toUpperCase());

    return postProcess(input);
}

/**
 * Murmur hash v2/v3
 *
 * @param {String} key
 * @param {Number} seed default is 97
 * @param {Number} ver default is 2
 * @return {Number} hash value
 */
function murmurHash(value, seed = 97, ver = 2) {
    if (ver === 3) {
        return murmur.v3(value, seed);
    } else {
        return murmur.v2(value, seed);
    }
}

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
    isClass: isClass,
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
    toInteger: lodash.toInteger,
    toNumber: lodash.toNumber,
    toArray: lodash.toArray,
    escapeHtml: escapeHtml,
    escapeSpecial: escapeSpecial,
    ucFirst: ucFirst,
    md5: md5,
    md5Salt: md5Salt,
    murmurHash: murmurHash,
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
    isAsyncFunction: isAsyncFunction,
    promisify: promisify,
    isGenerator: isGenerator,
    generatorToPromise: generatorToPromise,
    defer: getDefer,
    getDefer: getDefer,
    require: thinkrequire,
    thinkrequire: thinkrequire,
    clone: clone,
    extend: extend,
    define: define,
    toFastProperties: toFastProperties,
    camelCase: camelCase
}, {
    set: function (target, key, value, receiver) {
        if (Reflect.get(target, key, receiver) === undefined) {
            return Reflect.set(target, key, value, receiver);
        } else {
            throw Error('Cannot redefine getter-only property');
        }
    },
    // eslint-disable-next-line no-unused-vars
    deleteProperty: function (target, key) {
        throw Error('Cannot delete getter-only property');
    }
});
