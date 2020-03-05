// Type definitions for ./index.js
// Project: [think_lib] 
// Definitions by: [richen] <[https://github.com/thinkkoa/think_lib]>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 * The object obj prototype instance conversion to organize the data structure stored in the object,
 * access to this object in the v8 engine will be faster
 * @param {any} obj
 * @returns {void}
 * @param obj 
 * @return  
 */
declare function toFastProperties(obj: any): any;

/**
 * Short for Object.defineProperty,
 * the property is getter when setter is false
 * @param {any} obj
 * @param {any} property
 * @param {any} value
 * @param {boolean} [setter=false]
 * @returns {void}
 * @param obj 
 * @param property 
 * @param value 
 * @param setter? 
 * @return  
 */
declare function define(obj: any, property: any, value: any, setter?: boolean): any;

/**
 * Checks if value is a string that contains only numbers
 * 
 * @param {any} value
 * @returns {boolean}
 * @param value 
 * @return  
 */
declare function isNumberString(value: any): boolean;

/**
 * Checks if value is a standard JSON object,
 * must be a plain object or array
 * @param {any} value
 * @returns {boolean}
 * @param value 
 * @return  
 */
declare function isJSONObj(value: any): boolean;

/**
 * Checks if value is a standard JSON string,
 * must be a string, and can be deserialized as an plain object or array
 * @param {any} value
 * @returns {boolean}
 * @param value 
 * @return  
 */
declare function isJSONStr(value: any): boolean;

/**
 * Checks value is empty,
 * do not consider empty objects, empty arrays, spaces, tabs, form breaks, etc.
 * @param {any} value
 * @returns {boolean}
 * @param value 
 * @return  
 */
declare function isTrueEmpty(value: any): boolean;

/**
 * Checks value is empty,
 * undefined, null, '', NaN, [], {} and any empty string(including spaces, tabs, formfeeds, etc.), returns true
 * @param {any} value
 * @returns {boolean}
 * @param value 
 * @return  
 */
declare function isEmpty(value: any): boolean;

/**
 * Short for hasOwnProperty
 * 
 * @param {any} obj
 * @param {any} property
 * @returns {boolean}
 * @param obj 
 * @param property 
 * @return  
 */
declare function hasOwn(obj: any, property: any): boolean;

/**
 * Checks if value is a Promise object
 * 
 * @param {any} value
 * @returns {boolean}
 * @param value 
 * @return  
 */
declare function isPromise(value: any): boolean;

/**
 * Convert callback-style functions to Promises
 * 
 * @param {Function} fn
 * @param {object} receiver
 * @returns {Promise}
 * @param fn 
 * @param receiver 
 * @return  
 */
declare function promisify(fn: Function, receiver: any): (...args: any) => Promise<any>;

/**
 * Checks if fn is a GeneratorFunction
 * 
 * @param {any} fn
 * @returns {boolean}
 * @param fn 
 * @return  
 */
declare function isGenerator(fn: Function): boolean;

/**
 * Checks if value is a Async Function
 * 
 * @param {any} fn
 * @returns {boolean}
 * @param fn 
 * @return  
 */
declare function isAsyncFunction(fn: Function): boolean;

/**
 * Convert GeneratorFunction fn to Promise
 * 
 * @param {Function} fn
 * @returns {Promise}
 * @param fn 
 * @return  
 */
declare function generatorToPromise(fn: Function): Function;

/**
 * Checks if fn is a Class
 * @param fn
 * @param obj 
 * @param strict 
 * @return  
 */
declare function isClass(obj: any, strict?: boolean): boolean;

/**
 * Convert special characters(> < " ') for entity character
 * 
 * @param {string} value
 * @returns {string}
 * @param value 
 * @return  
 */
declare function escapeHtml(value: string): string;

/**
 * Convert entity value in value to(> < " ')
 * 
 * @param {string} value
 * @returns {string}
 * @param value 
 * @return  
 */
declare function escapeSpecial(value: string): string;

/**
 * Convert the first letter in the value to uppercase
 * 
 * @param {string} value
 * @returns {string}
 * @param value 
 * @return  
 */
declare function ucFirst(value: string): string;

/**
 * Calculate the MD5 hash of value
 * 
 * @param {string} value
 * @returns {string}
 * @param value 
 * @return  
 */
declare function md5(value: string): string;

/**
 * Calculate the value of MD5 hash value, including simple salt
 * 
 * @param {string} value
 * @param {string} [salt='abcdefghijklmnopqrstuvwxyz1234567890']
 * @returns
 * @param value 
 * @param salt? 
 */
declare function md5Salt(value: string, salt?: string): string;

/**
 * Pseudo-random access min and max range of integers
 * 
 * @param {number} min
 * @param {number} max
 * @returns {number}
 * @param min 
 * @param max 
 * @return  
 */
declare function rand(min: number, max: number): number;

/**
 * Date time stamp and formatting
 *
 * @param {(number | string)} [date]
 * @param {string} [format]
 * @returns {(string | number)}
 */
declare function datetime(date?: number | string, format?: string): string | number;

/**
 * Determines whether value is an element of array arr,
 * only determine the same value with the element, do not determine the type
 * @param {any} value
 * @param {any[]} arr
 * @returns {boolean}
 * @param value 
 * @param arr 
 * @return  
 */
declare function inArray(value: any, arr: Array<any>): boolean;

/**
 * Removes the specified index element from the array
 * 
 * @param {any[]} arr
 * @param {number} index
 * @returns {any[]}
 * @param arr 
 * @param index 
 * @return  
 */
declare function arrRemove(arr: Array<any>, index: number): Array<any>;

/**
 * Checks if p is a file
 * 
 * @param {string} p
 * @returns {boolean}
 * @param p 
 * @return  
 */
declare function isFile(p: string): boolean;

/**
 * Checks if p is a dir
 * 
 * @param {string} p
 * @returns {boolean}
 * @param p 
 * @return  
 */
declare function isDir(p: string): boolean;

/**
 * Checks if the file or folder p is writable
 * 
 * @param {string} p
 * @returns {boolean}
 * @param p 
 * @return  
 */
declare function isWritable(p: string): boolean;

/**
 * Modify the permissions of the file or folder p.
 * Synchronous mode
 * @param {string} p
 * @param {string} mode
 * @returns {*}
 * @param p 
 * @param mode 
 * @return  
 */
declare function chmod(p: string, mode?: string): boolean;

/**
 * Read the contents of the file filename.
 * Asynchronous mode
 * @param {string} filename 文件物理路径
 * @param {undefined | string} enc 为空返回Buffer类型,'utf8'返回String类型
 * @returns {promise}
 * @param filename 
 * @param enc 
 * @return  
 */
declare function readFile<T>(filename: string, enc?: string): Promise<T>;

/**
 * Write the string data to file.
 * Asynchronous mode
 * @param {string} filename
 * @param {string} data
 * @returns {promise}
 * @param filename 
 * @param data 
 * @return  
 */
declare function writeFile<T>(filename: string, data: string): Promise<T>;

/**
 * Rename the filename to nfilename. If nfilename and filename are not in the same physical path, the move file action will be triggered.
 * Asynchronous mode
 * @param {string} filename
 * @param {string} nfilename
 * @returns {*}
 * @param filename 
 * @param nfilename 
 * @return  
 */
declare function reFile<T>(filename: string, nfilename: string): Promise<T>;

/**
 * Delete the file p.
 * Synchronous mode
 * @param {string} p
 * @returns {boolean}
 * @param p 
 * @return  
 */
declare function rmFile(p: string): boolean;

/**
 * According to the path p to create a folder, p contains multi-level new path will be automatically recursively created.
 * Synchronous mode
 * @param {string} p
 * @param {string} mode
 * @returns {*}
 * @param p 
 * @param mode 
 * @return  
 */
declare function mkDir(p: string, mode?: string): boolean;

/**
 * Recursively read the path under the p folder.
 * Synchronous mode
 * @param {any} p
 * @param {any} filter
 * @param {any} files
 * @param {any} prefix
 * @returns {*}
 * @param p 
 * @param filter 
 * @param files 
 * @param prefix 
 * @return  
 */
declare function readDir(p: any, filter: any, files: string | Array<any>, prefix?: string): Array<any>;

/**
 * Subfolders of path p are recursively deleted. When reserve is true, the top-level folder is deleted
 * Asynchronous mode
 * @template T
 * @param {string} p
 * @param {boolean} reserve
 * @returns {*}
 * @param p 
 * @param reserve 
 * @return  
 */
declare function rmDir<T>(p: string, reserve: boolean): Promise<T>;

/**
 * Generate a defer object,
 * for example: {promise: new Promise()}
 * @returns {*}
 * @return  
 */
declare function getDefer<T>(): Promise<T>;

/**
 * Support for babel compiled es6 module require
 * 
 * @param {string} file
 * @returns {*}
 * @param file 
 */
declare function thinkrequire(file: string): any;

/**
 * Copy the source, deep deep to true depth copy
 *
 * @param {*} source
 * @param {boolean} [deep=false]
 */
declare function clone<T>(source: T, deep?: boolean): T;

/**
 * So that the target object inherits the source,
 * deep depth is true depth inheritance
 *
 * @param {*} source
 * @param {*} target
 * @param {boolean} [deep=false]
 */
declare function extend<T>(source: T, target: any, deep?: boolean): T;

/**
 * @param {*} string
 * @param string 
 * @return  
 */
declare function preserveCamelCase(string: any): string;

/**
 * @param {*} input
 * @param {*} options
 * @param input 
 * @param options 
 * @return  
 */
interface CamelCaseOptionInterface {
    pascalCase: boolean
}
declare function camelCase(input: string, options?: CamelCaseOptionInterface): string;

/**
 * Checks if value is a callable function.
 *
 * @param value The value to check.
 * @return Returns true if value is correctly classified, else false.
 */
declare function isFunction(value: any): value is (...args: any[]) => boolean;

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
declare function union<T>(...arrays: Array<Array<T> | null | undefined>): T[];

/**
 * pring to console
 * @param str 
 */
// declare function echo(str: string): void;
declare const echo: Function;

declare const sep: string;

declare module "think_lib" { }
