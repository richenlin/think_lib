// Type definitions for ./index.js
// Project: [think_lib] 
// Definitions by: [richen] <[https://github.com/thinkkoa/think_lib]>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 * The object obj prototype instance conversion to organize the data structure stored in the object,
 * access to this object in the v8 engine will be faster
 *
 * @export
 * @param {*} obj
 */
export declare function toFastProperties(obj: any): void;
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
export declare function define(obj: any, property: string, value: any, setter?: boolean): void;
/**
 * Checks if value is a string that contains only numbers
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export declare function isNumberString(value: any): boolean;
/**
 * Checks if value is a standard JSON object,
 * must be a plain object or array
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export declare function isJSONObj(value: any): boolean;
/**
 * Checks if value is a standard JSON string,
 * must be a string, and can be deserialized as an plain object or array
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export declare function isJSONStr(value: any): boolean;
/**
 * Checks value is empty,
 * do not consider empty objects, empty arrays, spaces, tabs, form breaks, etc.
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export declare function isTrueEmpty(value: any): boolean;
/**
 * Checks value is empty,
 * undefined, null, '', NaN, [], {} and any empty string(including spaces, tabs, formfeeds, etc.), returns true
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export declare function isEmpty(value: any): boolean;
/**
 * Short for hasOwnProperty
 *
 * @export
 * @param {object} obj
 * @param {string} property
 * @returns {boolean}
 */
export declare function hasOwn(obj: object, property: string): boolean;
/**
 * Checks if value is a Promise object
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export declare function isPromise(value: any): boolean;
/**
 * Convert callback-style functions to Promises
 *
 * @export
 * @param {Function} fn
 * @param {object} [receiver]
 * @returns 
 */
export declare function promisify(fn: Function, receiver?: object): any;
/**
 * Checks if fn is a GeneratorFunction
 *
 * @export
 * @param {*} fn
 * @returns {boolean}
 */
export declare function isGenerator(fn: any): boolean;
/**
 * Checks if value is a Async Function
 *
 * @export
 * @param {*} fn
 * @returns {boolean}
 */
export declare function isAsyncFunction(fn: any): boolean;
/**
 * Convert GeneratorFunction fn to Promise
 *
 * @export
 * @param {Function} fn
 * @returns
 */
export declare function generatorToPromise(fn: GeneratorFunction): GeneratorFunction | ((...args: any[]) => Promise<any>);
/**
 * Checks if fn is a Class
 *
 * @export
 * @param {*} obj
 * @param {boolean} [strict=true]
 * @returns {boolean}
 */
export declare function isClass(obj: any, strict?: boolean): boolean;
/**
 * Convert special characters(> < " ') for entity character
 *
 * @export
 * @param {string} value
 * @returns {string}
 */
export declare function escapeHtml(value: string): string;
/**
 * Convert entity value in value to(> < " ')
 *
 * @export
 * @param {string} value
 * @returns {string}
 */
export declare function escapeSpecial(value: string): string;
/**
 * Convert the first letter in the value to uppercase
 *
 * @export
 * @param {*} value
 * @returns {string}
 */
export declare function ucFirst(value: any): string;
/**
 * Calculate the MD5 hash of value
 *
 * @export
 * @param {string} value
 * @returns {string}
 */
export declare function md5(value: string): string;
/**
 * Calculate the value of MD5 hash value, including simple salt
 *
 * @export
 * @param {string} value
 * @param {string} [salt='abcdefghijklmnopqrstuvwxyz1234567890']
 * @returns {string}
 */
export declare function md5Salt(value: string, salt?: string): string;
/**
 * Pseudo-random access min and max range of integers
 *
 * @export
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export declare function rand(min: number, max: number): number;
/**
 * Date time stamp and formatting
 *
 * @export
 * @param {(number | string)} date
 * @param {string} [format] defaults  'YYYY-MM-DD HH:mm:ss.SSS'
 * @param {number} [offset] defaults  8
 * @returns {(number | string)}
 */
export declare function datetime(date?: number | string, format?: string, offset?: number): number | string;
/**
 * Determines whether value is an element of array arr,
 * only determine the same value with the element, do not determine the type
 *
 * @export
 * @param {*} value
 * @param {any[]} arr
 * @returns {boolean}
 */
export declare function inArray(value: any, arr: any[]): boolean;
/**
 * Removes the specified index element from the array
 *
 * @export
 * @param {any[]} arr
 * @param {number} index
 * @returns {any[]}
 */
export declare function arrRemove(arr: any[], index: number): any[];
/**
 * Checks if path is a file
 *
 * @export
 * @param {string} p
 * @returns {boolean}
 */
export declare function isFile(p: string): boolean;
/**
 * Checks if path is a dir
 *
 * @export
 * @param {string} p
 * @returns {boolean}
 */
export declare function isDir(p: string): boolean;
/**
 * Checks if the file or folder p is writable
 *
 * @export
 * @param {string} p
 * @returns {boolean}
 */
export declare function isWritable(p: string): boolean;
/**
 * Modify the permissions of the file or folder p.
 * Synchronous mode
 *
 * @export
 * @param {string} p
 * @param {string} [mode]
 * @returns {boolean}
 */
export declare function chmod(p: string, mode?: string): boolean;
/**
 * Read the contents of the file filename.
 * Asynchronous mode
 *
 * @export
 * @param {string} filename
 * @param {string} [enc] defaults 'utf8'
 * @returns {Promise<any>}
 */
export declare function readFile(filename: string, enc?: string): Promise<any>;
/**
 * Write the string data to file.
 * Asynchronous mode
 *
 * @export
 * @param {string} filename
 * @param {string} data
 * @returns {Promise<any>}
 */
export declare function writeFile(filename: string, data: string): Promise<any>;
/**
 * Rename the filename to nfilename. If nfilename and filename are not in the same physical path, the move file action will be triggered.
 * Asynchronous mode
 *
 * @export
 * @param {string} filename
 * @param {string} nfilename
 * @returns {Promise<any>}
 */
export declare function reFile(filename: string, nfilename: string): Promise<any>;
/**
 * Delete the file p.
 * Synchronous mode
 *
 * @export
 * @param {string} p
 * @returns {boolean}
 */
export declare function rmFile(p: string): boolean;
/**
 * According to the path p to create a folder, p contains multi-level new path will be automatically recursively created.
 * Synchronous mode
 * @param {string} p
 * @param {number} mode
 * @returns {boolean}
 */
export declare function mkDir(p: string, mode?: string): boolean;
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
export declare function readDir(p: string, filter?: any, files?: any[], prefix?: string): any[];
/**
 * Subfolders of path p are recursively deleted. When reserve is true, the top-level folder is deleted
 * Asynchronous mode
 * @template T
 * @param {string} p
 * @param {boolean} reserve
 * @returns {Promise<any>}
 */
export declare function rmDir(p: string, reserve?: boolean): Promise<any>;
/**
 * Generate a defer object,
 * for example: {promise: new Promise()}
 *
 * @export
 * @returns {*}
 */
export declare function getDefer(): any;
/**
 * Support for babel compiled es6 module require
 *
 * @param {string} file
 * @returns {*}
 */
export declare function thinkrequire(file: string): any;
/**
 * Copy the source, deep deep to true depth copy
 *
 * @export
 * @template T
 * @param {T} source
 * @param {boolean} [deep]
 * @returns {T}
 */
export declare function clone<T>(source: T, deep?: boolean): T;
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
export declare function extend<T>(source: T, target: object, deep?: boolean): T;
/**
 * convert string to camelCase/pascalCase
 *
 * @export
 * @param {string} input
 * @param {boolean} [pascalCase=false]
 * @returns {string}
 */
export declare function camelCase(input: string, pascalCase?: boolean): string;
/**
 * Murmur hash v2/v3
 *
 * @param {String} key
 * @param {Number} seed default is 97
 * @param {Number} ver default is 2
 * @return {Number} hash value
 */
export declare function murmurHash(value: string, seed?: number, ver?: number): any;
/**
 *
 */
export declare const sep: "\\" | "/";

// export { eq, gt, gte, lt, lte, isArray, isBoolean, isBuffer, isDate, isEqual, isError, isFunction, isMap, isNull, isNaN, isUndefined, isNumber, isPlainObject as isObject, isRegExp, isRegExp as isRegexp, isSet, isString, isSymbol, toString, toArray, toInteger, toInteger as toInt, toNumber, union as arrUnique, concat } from "lodash";

/**
 * lodash.eq
 * @param value 
 * @param other 
 */
declare function eq(value: any, other: any): boolean;
/**
 * lodash.gt
 * @param value 
 * @param other 
 */
declare function gt(value: any, other: any): boolean;
/**
 * lodash.gte
 * @param value 
 * @param other 
 */
declare function gte(value: any, other: any): boolean;
/**
 * lodash.lt
 * @param value 
 * @param other 
 */
declare function lt(value: any, other: any): boolean;
/**
 * lodash.lte
 * @param value 
 * @param other 
 */
declare function lte(value: any, other: any): boolean;
/**
 * lodash.isArray
 * @param value 
 */
declare function isArray<T>(value?: any): boolean;
/**
 * lodash.isBoolean
 * @param value 
 */
declare function isBoolean(value?: any): boolean;
/**
 * lodash.isBuffer
 * @param value 
 */
declare function isBuffer(value?: any): boolean;
/**
 * lodash.isDate
 * @param value 
 */
declare function isDate(value?: any): boolean;
/**
 * lodash.isEqual
 * @param value 
 * @param other 
 */
declare function isEqual(value: any, other: any): boolean;
/**
 * lodash.isError
 * @param value 
 */
declare function isError(value: any): boolean;
/**
 * lodash.isMap
 * @param value 
 */
declare function isMap(value?: any): boolean;
/**
 * lodash.isNull
 * @param value 
 */
declare function isNull(value: any): boolean;
/**
 * lodash.isNaN
 * @param value 
 */
declare function isNaN(value?: any): boolean;
/**
 * lodash.isUndefined
 * @param value 
 */
declare function isUndefined(value: any): boolean;
/**
 * lodash.isNumber
 * @param value 
 */
declare function isNumber(value?: any): boolean;
/**
 * lodash.isObject
 * @param value 
 */
declare function isObject(value?: any): boolean;
/**
 * lodash.isRegExp
 * @param value 
 */
declare function isRegExp(value?: any): boolean;
/**
 * lodash.isSet
 * @param value 
 */
declare function isSet(value?: any): boolean;
/**
 * lodash.isString
 * @param value 
 */
declare function isString(value?: any): boolean;
/**
 * lodash.isSymbol
 * @param value 
 */
declare function isSymbol(value: any): boolean;
/**
 * lodash.toString
 * @param value 
 */
declare function toString(value: any): string;
/**
 * lodash.toInteger
 * @param value 
 */
declare function toInt(value: any): number;
/**
 * lodash.toInteger
 * @param value
 */
declare function toInteger(value: any): number;
/**
 * lodash.toNumber
 * @param value 
 */
declare function toNumber(value: any): number;
/**
 * lodash.toArray
 * @param value 
 */
declare function toArray<T>(value: T): Array<T[keyof T]>;
/**
 * lodash.union
 * @param arrays 
 */
declare function arrUnique<T>(...arrays: Array<Array<T> | null | undefined>): T[];
/**
 * Checks if value is a callable function.
 *
 * @param value The value to check.
 * @return Returns true if value is correctly classified, else false.
 */
declare function isFunction(value: any): value is (...args: any[]) => boolean;


/**
 * Floating point addition
 *
 * @param {number} num1
 * @param {number} num2
 * @param {...number[]} others
 * @returns {number}
 */
declare function plus(num1: number, num2: number, ...others: number[]): number;

/**
 * Floating point subtraction
 *
 * @param {number} num1
 * @param {number} num2
 * @param {...number[]} others
 * @returns {number}
 */
declare function minus(num1: number, num2: number, ...others: number[]): number;

/**
 * Floating point multiplication
 *
 * @param {number} num1
 * @param {number} num2
 * @param {...number[]} others
 * @returns {number}
 */
declare function multi(num1: number, num2: number, ...others: number[]): number;

/**
 * Floating point division
 *
 * @param {number} num1
 * @param {number} num2
 * @param {...number[]} others
 * @returns {number}
 */
declare function divide(num1: number, num2: number, ...others: number[]): number;

/**
 * Rounding
 *
 * @param {number} num
 * @param {number} ratio
 * @returns {number}
 */
declare function round(num: number, ratio: number): number;

declare module "think_lib" { }