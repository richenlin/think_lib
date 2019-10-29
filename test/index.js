/**
 *
 * @author     richen
 * @copyright  Copyright (c) 2017 - <richenlin(at)gmail.com>
 * @license    MIT
 * @version    22/5/27
 */
/*eslint-disable*/
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const lib = require('../index');

describe('think_lib', function () {
    before(function () { });
    it('sep', function () {
        assert(lib.sep, path.sep);
    });
    it('eq', function () {
        assert.equal(lib.eq('aa', 'aa'), true);
        assert.equal(lib.eq('1', 1), false);
    });
    it('gt', function () {
        assert.equal(lib.gt(3, 1), true);
        assert.equal(lib.gt('3', 1), true);
    });
    it('lt', function () {
        assert.equal(lib.lt(1, 3), true);
        assert.equal(lib.lt('1', 3), true);
    });
    it('gte', function () {
        assert.equal(lib.gte(3, 1), true);
        assert.equal(lib.gte(1, 1), true);
        assert.equal(lib.gte('1', 1), true);
    });
    it('lte', function () {
        assert.equal(lib.lte(1, 3), true);
        assert.equal(lib.lte(1, 1), true);
        assert.equal(lib.lte('1', 3), true);
    });
    it('isArray', function () {
        assert.equal(lib.isArray([]), true);
        assert.equal(lib.isArray([1, 1]), true);
        assert.equal(lib.isArray(['1', 3]), true);
        assert.equal(lib.isArray(null), false);
        assert.equal(lib.isArray(NaN), false);
        assert.equal(lib.isArray(undefined), false);
        assert.equal(lib.isArray(''), false);
        assert.equal(lib.isArray('[]'), false);
        assert.equal(lib.isArray({}), false);
        assert.equal(lib.isArray(1), false);
    });
    it('isBoolean', function () {
        assert.equal(lib.isBoolean(true), true);
        assert.equal(lib.isBoolean(false), true);
        assert.equal(lib.isBoolean(['1', 3]), false);
        assert.equal(lib.isBoolean(null), false);
        assert.equal(lib.isBoolean(NaN), false);
        assert.equal(lib.isBoolean(undefined), false);
        assert.equal(lib.isBoolean(''), false);
        assert.equal(lib.isBoolean('[]'), false);
        assert.equal(lib.isBoolean({}), false);
        assert.equal(lib.isBoolean(1), false);
    });
    it('isBuffer', function () {
        assert.equal(lib.isBuffer(Buffer.from('')), true);
        assert.equal(lib.isBuffer(false), false);
        assert.equal(lib.isBuffer(['1', 3]), false);
        assert.equal(lib.isBuffer(null), false);
        assert.equal(lib.isBuffer(NaN), false);
        assert.equal(lib.isBuffer(undefined), false);
        assert.equal(lib.isBuffer(''), false);
        assert.equal(lib.isBuffer('[]'), false);
        assert.equal(lib.isBuffer({}), false);
        assert.equal(lib.isBuffer(1), false);
    });
    it('isDate', function () {
        assert.equal(lib.isDate(new Date()), true);
        assert.equal(lib.isDate(false), false);
        assert.equal(lib.isDate(['1', 3]), false);
        assert.equal(lib.isDate(null), false);
        assert.equal(lib.isDate(NaN), false);
        assert.equal(lib.isDate(undefined), false);
        assert.equal(lib.isDate(''), false);
        assert.equal(lib.isDate('[]'), false);
        assert.equal(lib.isDate({}), false);
        assert.equal(lib.isDate(1), false);
    });
    it('isEqual', function () {
        assert.equal(lib.isEqual('true', true), false);
        assert.equal(lib.isEqual('1', 1), false);
        assert.equal(lib.isEqual('1', '1'), true);
        assert.equal(lib.isEqual(undefined, undefined), true);
        assert.equal(lib.isEqual(null, null), true);
        assert.equal(lib.isEqual([1, 2, { aa: 1 }], [1, 2, { aa: 1 }]), true);
    });
    it('isError', function () {
        assert.equal(lib.isError(new Error()), true);
        assert.equal(lib.isError(false), false);
        assert.equal(lib.isError(['1', 3]), false);
        assert.equal(lib.isError(null), false);
        assert.equal(lib.isError(NaN), false);
        assert.equal(lib.isError(undefined), false);
        assert.equal(lib.isError(''), false);
        assert.equal(lib.isError('[]'), false);
        assert.equal(lib.isError({}), false);
        assert.equal(lib.isError(1), false);
    });
    it('isFunction', function () {
        assert.equal(lib.isFunction(new Function()), true);
        assert.equal(lib.isFunction(false), false);
        assert.equal(lib.isFunction(['1', 3]), false);
        assert.equal(lib.isFunction(null), false);
        assert.equal(lib.isFunction(NaN), false);
        assert.equal(lib.isFunction(undefined), false);
        assert.equal(lib.isFunction(''), false);
        assert.equal(lib.isFunction('[]'), false);
        assert.equal(lib.isFunction({}), false);
        assert.equal(lib.isFunction(1), false);
    });
    it('isMap', function () {
        assert.equal(lib.isMap(new Map()), true);
        assert.equal(lib.isMap(false), false);
        assert.equal(lib.isMap(['1', 3]), false);
        assert.equal(lib.isMap(null), false);
        assert.equal(lib.isMap(NaN), false);
        assert.equal(lib.isMap(undefined), false);
        assert.equal(lib.isMap(''), false);
        assert.equal(lib.isMap('[]'), false);
        assert.equal(lib.isMap({}), false);
        assert.equal(lib.isMap(1), false);
    });
    it('isNull', function () {
        assert.equal(lib.isNull(false), false);
        assert.equal(lib.isNull(['1', 3]), false);
        assert.equal(lib.isNull(null), true);
        assert.equal(lib.isNull(NaN), false);
        assert.equal(lib.isNull(undefined), false);
        assert.equal(lib.isNull(''), false);
        assert.equal(lib.isNull('[]'), false);
        assert.equal(lib.isNull({}), false);
        assert.equal(lib.isNull(1), false);
    });
    it('isNaN', function () {
        assert.equal(lib.isNaN(false), false);
        assert.equal(lib.isNaN(['1', 3]), false);
        assert.equal(lib.isNaN(null), false);
        assert.equal(lib.isNaN(NaN), true);
        assert.equal(lib.isNaN(undefined), false);
        assert.equal(lib.isNaN(''), false);
        assert.equal(lib.isNaN('[]'), false);
        assert.equal(lib.isNaN({}), false);
        assert.equal(lib.isNaN(1), false);
    });
    it('isUndefined', function () {
        assert.equal(lib.isUndefined(false), false);
        assert.equal(lib.isUndefined(['1', 3]), false);
        assert.equal(lib.isUndefined(null), false);
        assert.equal(lib.isUndefined(NaN), false);
        assert.equal(lib.isUndefined(undefined), true);
        assert.equal(lib.isUndefined(''), false);
        assert.equal(lib.isUndefined('[]'), false);
        assert.equal(lib.isUndefined({}), false);
        assert.equal(lib.isUndefined(1), false);
    });
    it('isNumber', function () {
        assert.equal(lib.isNumber(false), false);
        assert.equal(lib.isNumber(['1', 3]), false);
        assert.equal(lib.isNumber(null), false);
        assert.equal(lib.isNumber(NaN), true);
        assert.equal(lib.isNumber(undefined), false);
        assert.equal(lib.isNumber(''), false);
        assert.equal(lib.isNumber('[]'), false);
        assert.equal(lib.isNumber({}), false);
        assert.equal(lib.isNumber(1), true);
    });
    it('isObject', function () {
        assert.equal(lib.isObject(false), false);
        assert.equal(lib.isObject(['1', 3]), false);
        assert.equal(lib.isObject(null), false);
        assert.equal(lib.isObject(NaN), false);
        assert.equal(lib.isObject(undefined), false);
        assert.equal(lib.isObject(''), false);
        assert.equal(lib.isObject('[]'), false);
        assert.equal(lib.isObject({}), true);
        assert.equal(lib.isObject(1), false);
    });
    it('isRegExp', function () {
        assert.equal(lib.isRegExp(false), false);
        assert.equal(lib.isRegExp(['1', 3]), false);
        assert.equal(lib.isRegExp(null), false);
        assert.equal(lib.isRegExp(NaN), false);
        assert.equal(lib.isRegExp(undefined), false);
        assert.equal(lib.isRegExp(''), false);
        assert.equal(lib.isRegExp('[]'), false);
        assert.equal(lib.isRegExp({}), false);
        assert.equal(lib.isRegExp(1), false);
        assert.equal(lib.isRegExp(new RegExp()), true);
    });
    it('isSet', function () {
        assert.equal(lib.isSet(false), false);
        assert.equal(lib.isSet(['1', 3]), false);
        assert.equal(lib.isSet(null), false);
        assert.equal(lib.isSet(NaN), false);
        assert.equal(lib.isSet(undefined), false);
        assert.equal(lib.isSet(''), false);
        assert.equal(lib.isSet('[]'), false);
        assert.equal(lib.isSet({}), false);
        assert.equal(lib.isSet(1), false);
        assert.equal(lib.isSet(new Set()), true);
    });
    it('isString', function () {
        assert.equal(lib.isString(false), false);
        assert.equal(lib.isString(['1', 3]), false);
        assert.equal(lib.isString(null), false);
        assert.equal(lib.isString(NaN), false);
        assert.equal(lib.isString(undefined), false);
        assert.equal(lib.isString(''), true);
        assert.equal(lib.isString('[]'), true);
        assert.equal(lib.isString({}), false);
        assert.equal(lib.isString(1), false);
        assert.equal(lib.isString(new Set()), false);
    });
    it('isSymbol', function () {
        assert.equal(lib.isSymbol(false), false);
        assert.equal(lib.isSymbol(['1', 3]), false);
        assert.equal(lib.isSymbol(null), false);
        assert.equal(lib.isSymbol(NaN), false);
        assert.equal(lib.isSymbol(undefined), false);
        assert.equal(lib.isSymbol(''), false);
        assert.equal(lib.isSymbol('[]'), false);
        assert.equal(lib.isSymbol({}), false);
        assert.equal(lib.isSymbol(1), false);
        assert.equal(lib.isSymbol(Symbol()), true);
    });
    it('isNumberString', function () {
        assert.equal(lib.isNumberString(false), false);
        assert.equal(lib.isNumberString(['1', 3]), false);
        assert.equal(lib.isNumberString(null), false);
        assert.equal(lib.isNumberString(NaN), false);
        assert.equal(lib.isNumberString(undefined), false);
        assert.equal(lib.isNumberString(''), false);
        assert.equal(lib.isNumberString('[]'), false);
        assert.equal(lib.isNumberString({}), false);
        assert.equal(lib.isNumberString(1), false);
        assert.equal(lib.isNumberString('1'), true);
        assert.equal(lib.isNumberString('1ab'), false);
        assert.equal(lib.isNumberString(Symbol()), false);
    });
    it('isJSONObj', function () {
        assert.equal(lib.isJSONObj(false), false);
        assert.equal(lib.isJSONObj(['1', 3]), true);
        assert.equal(lib.isJSONObj(null), false);
        assert.equal(lib.isJSONObj(NaN), false);
        assert.equal(lib.isJSONObj(undefined), false);
        assert.equal(lib.isJSONObj(''), false);
        assert.equal(lib.isJSONObj('[]'), false);
        assert.equal(lib.isJSONObj({}), true);
        assert.equal(lib.isJSONObj(1), false);
        assert.equal(lib.isJSONObj('1'), false);
        assert.equal(lib.isJSONObj('1ab'), false);
        assert.equal(lib.isJSONObj(Symbol()), false);
    });
    it('isJSONStr', function () {
        assert.equal(lib.isJSONStr(false), false);
        assert.equal(lib.isJSONStr(['1', 3]), false);
        assert.equal(lib.isJSONStr(null), false);
        assert.equal(lib.isJSONStr(NaN), false);
        assert.equal(lib.isJSONStr(undefined), false);
        assert.equal(lib.isJSONStr(''), false);
        assert.equal(lib.isJSONStr('[]'), true);
        assert.equal(lib.isJSONStr('{}'), true);
        assert.equal(lib.isJSONStr({}), false);
        assert.equal(lib.isJSONStr(1), false);
        assert.equal(lib.isJSONStr('1'), false);
        assert.equal(lib.isJSONStr('1ab'), false);
        assert.equal(lib.isJSONStr(Symbol()), false);
    });
    it('isEmpty', function () {
        assert.equal(lib.isEmpty(false), false);
        assert.equal(lib.isEmpty(['1', 3]), false);
        assert.equal(lib.isEmpty(null), true);
        assert.equal(lib.isEmpty(NaN), true);
        assert.equal(lib.isEmpty(undefined), true);
        assert.equal(lib.isEmpty(''), true);
        assert.equal(lib.isEmpty('  '), true);
        assert.equal(lib.isEmpty('      '), true);
        assert.equal(lib.isEmpty('\n'), true);
        assert.equal(lib.isEmpty('\r'), true);
        assert.equal(lib.isEmpty('[]'), false);
        assert.equal(lib.isEmpty('{}'), false);
        assert.equal(lib.isEmpty({}), true);
        assert.equal(lib.isEmpty([]), true);
        assert.equal(lib.isEmpty(1), false);
        assert.equal(lib.isEmpty('1'), false);
        assert.equal(lib.isEmpty('1ab'), false);
        assert.equal(lib.isEmpty(Symbol()), false);
    });
    it('isTrueEmpty', function () {
        assert.equal(lib.isTrueEmpty(false), false);
        assert.equal(lib.isTrueEmpty(['1', 3]), false);
        assert.equal(lib.isTrueEmpty(null), true);
        assert.equal(lib.isTrueEmpty(NaN), true);
        assert.equal(lib.isTrueEmpty(undefined), true);
        assert.equal(lib.isTrueEmpty(''), true);
        assert.equal(lib.isTrueEmpty('  '), false);
        assert.equal(lib.isTrueEmpty('      '), false);
        assert.equal(lib.isTrueEmpty('\n'), false);
        assert.equal(lib.isTrueEmpty('\r'), false);
        assert.equal(lib.isTrueEmpty('[]'), false);
        assert.equal(lib.isTrueEmpty('{}'), false);
        assert.equal(lib.isTrueEmpty({}), false);
        assert.equal(lib.isTrueEmpty([]), false);
        assert.equal(lib.isTrueEmpty(1), false);
        assert.equal(lib.isTrueEmpty('1'), false);
        assert.equal(lib.isTrueEmpty('1ab'), false);
        assert.equal(lib.isTrueEmpty(Symbol()), false);
    });
    it('toString', function () {
        assert.equal(lib.toString(false), 'false');
        assert.equal(lib.toString(['1', 3]), "1,3");
        assert.equal(lib.toString(null), '');
        assert.equal(lib.toString(NaN), 'NaN');
        assert.equal(lib.toString(undefined), '');
        assert.equal(lib.toString(''), '');
        assert.equal(lib.toString('  '), '  ');
        assert.equal(lib.toString('      '), '      ');
        assert.equal(lib.toString('\n'), '\n');
        assert.equal(lib.toString('\r'), '\r');
        assert.equal(lib.toString('[]'), '[]');
        assert.equal(lib.toString('{}'), '{}');
        assert.equal(lib.toString({}), '[object Object]');
        assert.equal(lib.toString([]), '');
        assert.equal(lib.toString(1), '1');
        assert.equal(lib.toString('1'), '1');
        assert.equal(lib.toString('1ab'), '1ab');
    });
    it('toInt', function () {
        assert.equal(lib.toInt(false), 0);
        assert.equal(lib.toInt(['1', 3]), 0);
        assert.equal(lib.toInt(null), 0);
        assert.equal(lib.toInt(NaN), 0);
        assert.equal(lib.toInt(undefined), 0);
        assert.equal(lib.toInt(''), 0);
        assert.equal(lib.toInt('  '), 0);
        assert.equal(lib.toInt('      '), 0);
        assert.equal(lib.toInt('\n'), 0);
        assert.equal(lib.toInt('\r'), 0);
        assert.equal(lib.toInt('[]'), 0);
        assert.equal(lib.toInt('{}'), 0);
        assert.equal(lib.toInt({}), 0);
        assert.equal(lib.toInt([]), 0);
        assert.equal(lib.toInt(1), 1);
        assert.equal(lib.toInt('1'), 1);
        assert.equal(lib.toInt('1ab'), 0);
    });
    it('toArray', function () {
        assert.equal(lib.toArray(false), 0);
        assert.deepEqual(lib.toArray(['1', 3]), ['1', 3]);
        assert.equal(lib.toArray(null), 0);
        assert.equal(lib.toArray(NaN), 0);
        assert.equal(lib.toArray(undefined), 0);
        assert.equal(lib.toArray(''), 0);
        assert.deepEqual(lib.toArray('  '), [' ', ' ']);
        assert.deepEqual(lib.toArray('      '), [' ', ' ', ' ', ' ', ' ', ' ']);
        assert.equal(lib.toArray('\n'), 0);
        assert.equal(lib.toArray('\r'), 0);
        assert.deepEqual(lib.toArray('[]'), ['[', ']']);
        assert.deepEqual(lib.toArray('{}'), ['{', '}']);
        assert.equal(lib.toArray({}), 0);
        assert.equal(lib.toArray([]), 0);
        assert.deepEqual(lib.toArray(1), []);
        assert.equal(lib.toArray('1'), 1);
        assert.deepEqual(lib.toArray('1ab'), ['1', 'a', 'b']);
    });
    it('toNumber', function () {
        assert.equal(lib.toNumber(false), 0);
        assert.equal(typeof lib.toNumber(['1', 3]), 'number'); // NaN !== NaN
        assert.equal(lib.toNumber(null), 0);
        assert.equal(typeof lib.toNumber(NaN), 'number'); // NaN !== NaN
        assert.equal(typeof lib.toNumber(undefined), 'number'); // NaN !== NaN
        assert.equal(lib.toNumber(''), 0);
        assert.equal(lib.toNumber('  '), 0);
        assert.equal(lib.toNumber('      '), 0);
        assert.equal(lib.toNumber('\n'), 0);
        assert.equal(lib.toNumber('\r'), 0);
        assert.equal(typeof lib.toNumber('[]'), 'number'); // NaN !== NaN
        assert.equal(typeof lib.toNumber('{}'), 'number'); // NaN !== NaN
        assert.equal(typeof lib.toNumber({}), 'number'); // NaN !== NaN
        assert.equal(typeof lib.toNumber([]), 'number'); // NaN !== NaN
        assert.equal(typeof lib.toNumber('1abc'), 'number'); // NaN !== NaN
        assert.equal(lib.toNumber(1), 1);
        assert.equal(lib.toNumber('1.01'), 1.01);
    });
    it('escapeHtml', function () {
        assert.equal(lib.escapeHtml("><'"), '&gt;&lt;&#39;');
        assert.equal(lib.escapeHtml('><"'), '&gt;&lt;&quote;');
    });
    it('escapeSpecial', function () {
        assert.equal(lib.escapeSpecial('&gt;&lt;&#39;'), '><\'');
        assert.equal(lib.escapeSpecial('&gt;&lt;&quote;'), '><"');
    });
    it('ucFirst', function () {
        assert.equal(lib.ucFirst('abcde'), 'Abcde');
    });
    it('md5', function () {
        assert.equal(lib.md5('abcde'), 'ab56b4d92b40713acc5af89985d4b786');
    });
    it('md5Salt', function () {
        assert.equal(lib.md5Salt('abcde'), '7f7d52a001b9d2c71b6bae1f189f41f3');
        assert.equal(lib.md5Salt('abcde', '111111111111'), '8da784f49110b3224003c2a7dbbf0dc5');
    });
    it("rand", function () {
        assert.equal(lib.gt(lib.rand(1, 10), 10), false);
        assert.equal(lib.lt(lib.rand(1, 10), 1), false);
    });
    it("datetime", function () {
        assert.equal(lib.datetime(), Math.floor(Date.now() / 1000));
        assert.equal(lib.datetime('', 'yyyy'), new Date().getFullYear());
    });
    it("inArray", function () {
        assert.equal(lib.inArray(1, [1, '2', 3]), true);
        assert.equal(lib.inArray('2', [1, '2', 3]), true);
        assert.equal(lib.inArray('3', [1, '2', 3]), true);
        assert.equal(lib.inArray(4, [1, '2', 3]), false);
    });
    it("arrUnique", function () {
        assert.deepEqual(lib.arrUnique([1, 2, 3, 4, 5, 2, 34, 2]), [1, 2, 3, 4, 5, 34]);
    });
    it("arrRemove", function () {
        assert.deepEqual(lib.arrRemove([1, 2, 3, 4, 5, 2, 34, 2], 2), [1, 2, 4, 5, 2, 34, 2]);
    });
    it("isFile", function () {
        assert.equal(lib.isFile(require.resolve("../index.js")), true);
    });
    it("isDir", function () {
        assert.equal(lib.isDir(require.resolve("../index.js")), false);
    });
    it("isWritable", function () {
        return lib.writeFile(path.resolve("./test/.test.js"), 'test').then(() => {
            assert.equal(lib.isWritable(path.resolve("./test/.test.js")), true);
            return lib.rmFile(path.resolve("./test/.test.js"));
        });
    });
    it("chmod", function () {
        return lib.writeFile(path.resolve("./test/.test1.js"), 'test').then(() => {
            assert.ok(lib.chmod(path.resolve("./test/.test1.js")) == undefined);
            return lib.rmFile(path.resolve("./test/.test1.js"));
        });
    });
    it("readFile", function () {
        return lib.writeFile(path.resolve("./test/.test2.js"), 'test').then(() => {
            return lib.readFile(path.resolve("./test/.test2.js")).then(text => {
                assert.equal(text, 'test');
                return lib.rmFile(path.resolve("./test/.test2.js"));
            });
        });
    });
    it("writeFile", function () {
        return lib.writeFile(path.resolve("./test/.test3.js"), 'test').then(() => {
            return lib.readFile(path.resolve("./test/.test3.js")).then(text => {
                assert.equal(text, 'test');
                return lib.rmFile(path.resolve("./test/.test3.js"));
            });
        });
    });
    it("reFile", function () {
        return lib.writeFile(path.resolve("./test/.test4.js"), 'test').then(() => {
            return lib.reFile(path.resolve("./test/.test4.js"), path.resolve("./test/.test4.js")).then(() => {
                assert.equal(lib.isFile(path.resolve("./test/.test4.js")), true);
                return lib.rmFile(path.resolve("./test/.test4.js"));
            });
        });
    });
    it("rmFile", function () {
        return lib.writeFile(path.resolve("./test/.test5.js"), 'test').then(() => {
            return lib.reFile(path.resolve("./test/.test5.js"), path.resolve("./test/.test5.js")).then(() => {
                assert.ok(lib.rmFile(path.resolve("./test/.test5.js")));
            });
        });
    });
    it("mkDir", function () {
        assert.ok(lib.mkDir(path.resolve("./test/test6")));

    });
    it("readDir", function () {
        lib.chmod(path.resolve("./test/test6"));
        return lib.writeFile(path.resolve("./test/test6/1.txt"), 'test').then(() => {
            assert.deepEqual(lib.readDir(path.resolve("./test/test6")), ['1.txt']);
            return lib.rmDir(path.resolve("./test/test6"));
        });
    });
    it("rmDir", function () {
        lib.mkDir(path.resolve("./test/test7"));
        return lib.rmDir(path.resolve("./test/test7")).then(() => {
            assert.equal(lib.isDir(path.resolve("./test/test7")), false);
        });
    });
    it("isPromise", function () {
        assert.equal(lib.isPromise(lib.getDefer().promise), true);
    });
    it("promisify", function () {
        assert.ok(lib.promisify(fs.chmod, fs));
    });
    it("isGenerator", function () {
        assert.equal(lib.isGenerator(function* () { }), true);
    });
    it("generatorToPromise", function () {
        assert.ok(lib.generatorToPromise(function* () { }));
    });
    it("getDefer", function () {
        assert.equal(lib.isPromise(lib.getDefer().promise), true);
    });
    it("thinkrequire", function () {
        assert.equal(lib.isObject(lib.require(path.resolve("./index.js"))), true);
    });
    it("clone", function () {
        let data = { 'aa': { 'qq': 55555 } };
        let temp1 = lib.clone(data, { 'dd': 66666 }, true);
        temp1.aa.qq = 22222;
        assert(data.aa.qq, 55555);
        let temp2 = lib.clone(data, { 'dd': 66666 });
        temp2.aa.qq = 33333;
        assert(data.aa.qq, 33333);
    });
    it("toFastProperties", function () {
        assert.equal(lib.toFastProperties({}), undefined);
    });
    it("echo", function () {
        assert.equal(echo({}), undefined);
    });
    it("define", function () {
        let test = {};
        lib.define(test, 'aa', 1);
        lib.define(test, 'bb', 22, 1);
        assert.equal(test.aa, 1);
        try {
            lib.isError(lib.define(test, 'bb', 2));
            assert.fail(true);
        } catch (e) {
            assert.ok(true);
        }
    });
    it('extend', function () {
        let data = { 'aa': { 'qq': 55555 } };
        let temp1 = lib.extend(data, { 'dd': 66666 }, true);
        temp1.aa.qq = 22222;
        assert(data.aa.qq, 55555);
        let temp2 = lib.extend(data, { 'dd': 66666 });
        temp2.aa.qq = 33333;
        assert(data.aa.qq, 33333);
    });
    it('hasOwn', function () {
        let data = {};
        data.test = 1;
        assert(lib.hasOwn(data, 'test'), true);
        let data2 = Object.create({});
        data2.test = 2;
        assert(lib.hasOwn(data2, 'test'), true);
        let data3 = Object.create(null);
        data3.test = 3;
        assert(lib.hasOwn(data3, 'test'), true);
    });
});