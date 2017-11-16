# 介绍
-----

[![npm version](https://badge.fury.io/js/think_lib.svg)](https://badge.fury.io/js/think_lib)
[![Dependency Status](https://david-dm.org/thinkkoa/think_lib.svg)](https://david-dm.org/thinkkoa/think_lib)

ThinkKoa functions Libs.

## sep
平台的文件路径分隔符，'\\' 或 '/'

## eq(value, other)
比较两者的值确定它们是否相等

## gt(value, other)
检查 value 是否大于 other

## gte(value, other)
检查 value 是否大于等于 other

## lt(value, other)
检查 value 是否是 小于 other

## lte(value, other)
检查 value 是否是 小于等于 other

## isArray(value)
检查 value 是否是 Array 类对象

## isBoolean(value)
检查 value 是否是原始 boolean 类型或者对象

## isBuffer(value)
检查 value 是否是个 buffer

## isDate(value)
检查 value 是否是 Date 类型

## isEqual(value, other)
执行深比较来决定两者的值是否相等
注意: 这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, 以及 typed arrays. Object 对象值比较自身的属性，不包括继承的和可枚举的属性。 不支持函数和DOM节点。

## isError(value)
检查 value 是否是 Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, 或 URIError object.

## isFunction(value)
检查 value 是否是 Function 对象

## isIP(value)
检查 value 是否是 IP,包含 IPV4及IPV6

## isMap(value)
检查 value 是否是个 Map 对象

## isNull(value)
检查 value 是否是 null

## isNaN(value)
检查 value 是否是 NaN

## isUndefined(value)
检查 value 是否是 undefined

## isNumber(value)
检查 value 是否是原始数值型 或者 对象

## isObject(value)
检查 value 是否是普通对象。 也就是说该对象由 Object 构造函数创建或者 [[Prototype]] 为空

## isRegExp(value)
检查 value 是否是 RegExp 对象

## isSet(value)
检查 value 是否是 Set 对象

## isString(value)
检查 value 是否是原始字符串或者对象

## isSymbol(value)
检查 value 是否是原始 Symbol 或者对象

## isNumberString(value)
检查 value 是否是仅包含数字的字符串

## isJSONObj(value)
检查 value 是否是标准JSON对象.必须是标准对象或数组

## isJSONStr(value)
检查 value 是否是标准的JSON字符串.必须是字符串，且可以被反序列化为对象或数组

## isEmpty(value)
检查 value 是否为空.
undefined,null,'',NaN,[],{}和任何空白字符，包括空格、制表符、换页符等等，均返回true

## isTrueEmpty(value)
检查 value 是否为空.
不考虑空对象、空数组、空格、制表符、换页符等

## toString(value)
将 value 转换为字符串。 null 和 undefined 将返回空字符串

## toInt(value)
转换 value 为整数 

## toNumber(value)
转换 value 为数值

## toArray(value)
转换 value 为数组

## escapeHtml(value)
转换 value 中的特殊字符 > < " ' 为实体符

## escapeSpecial(value)
转换 value 中的实体符还原为 > < " '

## ucFirst(value)
转换 value 中的首字母为大写

## md5(value)
计算 value 的MD5散列值

## rand(min, max)
伪随机获取min和max范围内的整数

## encryption(data, key)
将字符串data进行AES加密. key必须为16位字符串

## decryption(data, key)
将AES加密的字符串data进行解密. key必须为16位字符串

## datetime(date[, format = 'yyyy-mm-dd hh:mi:ss'])
日期时间戳及格式化

```
//返回当前时间戳 如13233233344
datetime(); 

//转换时间字符串为时间戳
datetime('2017-01-01');

//返回当前时间格式字符串
datetime(null, '');

//返回指定时间戳的格式字符串
datetime(13233233344, 'yyyy');

//返回指定时间的格式字符串
datetime('2017-01-01', 'yyyy');

```

## inArray(value, arr)
判断 value 是否为数组 arr 的元素. 仅判断 value 值同元素值相等,不判断类型

## arrUnique(arr)
将数组 arr 去除重复元素

## arrRemove(arr, index)
将数组 arr 中指定下标 index 元素移除. 

## isFile(p)
检查 p 是否是文件
函数为同步模式

## isDir(p)
检查 p 是否是文件夹
函数为同步模式

## isWritable(p)
检查文件或文件夹 p 是否可写
函数为同步模式

## chmod(p, mode = '777')
修改文件或文件夹 p 的权限.
函数为同步模式

## readFile(filename, enc)
读取文件 filename 内容.enc 为空返回Buffer类型,'utf8'返回String类型
函数返回Promise

## writeFile(filename, data)
将字符串 data 写入文件 filename
函数返回Promise

## reFile(filename, nfilename)
将文件 filename 改名为 nfilename.如果 nfilename 和 filename 不在同一物理路径下,会触发移动文件操作.
函数返回Promise

## rmFile(p)
将文件 p 删除
函数为同步模式

## mkDir(p, mode)
根据路径 p 创建文件夹, 如果 p 包含多级新建路径,会自动递归创建
函数为同步模式

## readDir(p, filter, files, prefix)
递归读取路径 p 下的文件夹
函数为同步模式

## rmDir(p, reserve)
递归删除路径 p 的子文件夹. reserve 为true时删除 p
函数返回Promise

## hasOwn(obj, property)
hasOwnProperty缩写

## isPromise(value)
检查 value 是否是 Promise 对象

## promisify(fn, receiver)
将callback风格的函数转换为Promise

## isGenerator(fn)
检查 fn 是否是 GeneratorFunction

## generatorToPromise(fn)
将GeneratorFunction函数 fn 转换为 Promise 风格

## getDefer()
生成一个defer对象, {promise: new Promise()}

## thinkrequire(file)
require 的封装, 支持babel编译后的es6 module

## clone(source, deep)
拷贝对象 source, deep 为true时深度拷贝

## extend(source, target, deep)
使对象 target 继承对象 source, deep为true时深度继承

## define(obj, property, value, setter = false)
Object.defineProperty的封装, 当 setter 为false时属性 property 为getter

## toFastProperties(obj)
将对象 obj 进行原型实例转换,以整理该对象存储的数据结构,在v8引擎下访问此对象会更快