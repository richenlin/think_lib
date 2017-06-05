/**
 *
 * @author     richen
 * @copyright  Copyright (c) 2017 - <richenlin(at)gmail.com>
 * @license    MIT
 * @version    22/5/27
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const lib = require('../index');


describe('think_lib', function (){
    before( function (){});
    it('sep', function(){
        assert(lib.sep, path.sep);
    });
    it('eq', function(){
        assert.equal(lib.eq('aa', 'aa'), true);
        assert.equal(lib.eq('1', 1), false);
    });
    it('gt', function(){
        assert.equal(lib.gt(3, 1), true);
        assert.equal(lib.gt('3', 1), true);
    });
    it('lt', function(){
        assert.equal(lib.lt(1, 3), true);
        assert.equal(lib.lt('1', 3), true);
    });
    it('gte', function(){
        assert.equal(lib.gte(3, 1), true);
        assert.equal(lib.gte(1, 1), true);
        assert.equal(lib.gte('1', 1), true);
    });
    it('lte', function(){
        assert.equal(lib.lte(1, 3), true);
        assert.equal(lib.lte(1, 1), true);
        assert.equal(lib.lte('1', 3), true);
    });
    it('isArray', function(){
        assert.equal(lib.isArray([]), true);
        assert.equal(lib.isArray([1, 1]), true);
        assert.equal(lib.isArray(['1', 3]), true);
        assert.equal(lib.isArray(null), false);
        assert.equal(lib.isArray(undefined), false);
        assert.equal(lib.isArray(''), false);
        assert.equal(lib.isArray('[]'), false);
        assert.equal(lib.isArray({}), false);
        assert.equal(lib.isArray(1), false);
    });
    it('isBoolean', function(){
        assert.equal(lib.isBoolean(true), true);
        assert.equal(lib.isBoolean(false), true);
        assert.equal(lib.isBoolean(['1', 3]), false);
        assert.equal(lib.isBoolean(null), false);
        assert.equal(lib.isBoolean(undefined), false);
        assert.equal(lib.isBoolean(''), false);
        assert.equal(lib.isBoolean('[]'), false);
        assert.equal(lib.isBoolean({}), false);
        assert.equal(lib.isBoolean(1), false);
    });
    it('isBuffer', function(){
        assert.equal(lib.isBuffer(new Buffer('')), true);
        assert.equal(lib.isBuffer(false), false);
        assert.equal(lib.isBuffer(['1', 3]), false);
        assert.equal(lib.isBuffer(null), false);
        assert.equal(lib.isBuffer(undefined), false);
        assert.equal(lib.isBuffer(''), false);
        assert.equal(lib.isBuffer('[]'), false);
        assert.equal(lib.isBuffer({}), false);
        assert.equal(lib.isBuffer(1), false);
    });
    it('isDate', function(){
        assert.equal(lib.isDate(new Date()), true);
        assert.equal(lib.isDate(false), false);
        assert.equal(lib.isDate(['1', 3]), false);
        assert.equal(lib.isDate(null), false);
        assert.equal(lib.isDate(undefined), false);
        assert.equal(lib.isDate(''), false);
        assert.equal(lib.isDate('[]'), false);
        assert.equal(lib.isDate({}), false);
        assert.equal(lib.isDate(1), false);
    });
    it('isEqual', function(){
        assert.equal(lib.isEqual('true', true), false);
        assert.equal(lib.isEqual('1', 1), false);
        assert.equal(lib.isEqual('1', '1'), true);
        assert.equal(lib.isEqual(undefined, undefined), true);
        assert.equal(lib.isEqual(null, null), true);
        assert.equal(lib.isEqual([1, 2, {aa: 1}], [1, 2, {aa: 1}]), true);
    });
    it('isError', function(){
        assert.equal(lib.isError(new Error()), true);
        assert.equal(lib.isError('1'), false);
        assert.equal(lib.isError('1'), false);
        assert.equal(lib.isError(undefined), false);
        assert.equal(lib.isError(null), false);
    });
    it('extend', function(){
        let data = {'aa': {'qq': 55555}};
        let temp1 = lib.extend(data, {'dd': 66666}, true);
        temp1.aa.qq = 22222;
        assert(data.aa.qq, 55555);
        let temp2 = lib.extend(data, {'dd': 66666});
        temp2.aa.qq = 33333;
        assert(data.aa.qq, 33333);
    });
});