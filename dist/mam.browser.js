(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('crypto'), require('big-integer')) :
	typeof define === 'function' && define.amd ? define(['exports', 'crypto', 'big-integer'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.mam = {}, global.crypto, global.bigInt));
}(this, (function (exports, crypto, bigInt) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var crypto__default = /*#__PURE__*/_interopDefaultLegacy(crypto);
	var bigInt__default = /*#__PURE__*/_interopDefaultLegacy(bigInt);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var errors = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.INVALID_TRYTES = 'Invalid trytes';
	exports.INVALID_TRITS = 'Invalid trits';
	exports.INVALID_ODD_LENGTH = 'Invalid trytes length. Expected trytes of even length.';
	exports.INVALID_ASCII_CHARS = 'Invalid ascii charactes.';

	});

	unwrapExports(errors);
	var errors_1 = errors.INVALID_TRYTES;
	var errors_2 = errors.INVALID_TRITS;
	var errors_3 = errors.INVALID_ODD_LENGTH;
	var errors_4 = errors.INVALID_ASCII_CHARS;

	var ascii = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;


	/**
	 * This method converts ASCII characters to [trytes](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary).
	 *
	 * ## Related methods
	 *
	 * To convert trytes to ASCII characters, use the [`trytesToAscii()`]{@link #module_converter.trytesToAscii} method.
	 *
	 * @method asciiToTrytes
	 *
	 * @summary Converts ASCII characters to trytes.
	 *
	 * @memberof module:converter
	 *
	 * @param {string} input - ASCII input
	 *
	 * @example
	 * ```js
	 * let trytes = Converter.asciiToTrytes('Hello, where is my coffee?');
	 * ```
	 *
	 * @return {string} Trytes
	 *
	 * @throws {errors.INVALID_ASCII_CHARS}: Make sure that the `input` argument contains only valid ASCII characters.
	 */
	exports.asciiToTrytes = function (input) {
	    // If input is not an ascii string, throw error
	    if (!/^[\x00-\x7F]*$/.test(input)) {
	        throw new Error(errors.INVALID_ASCII_CHARS);
	    }
	    var trytes = '';
	    for (var i = 0; i < input.length; i++) {
	        var dec = input[i].charCodeAt(0);
	        trytes += src.TRYTE_ALPHABET[dec % 27];
	        trytes += src.TRYTE_ALPHABET[(dec - (dec % 27)) / 27];
	    }
	    return trytes;
	};
	/**
	 * This method converts trytes to ASCII characters.
	 *
	 * Because each ASCII character is represented as 2 trytes, the given trytes must be of an even length.
	 *
	 * ## Related methods
	 *
	 * To convert ASCII characters to trytes, use the [`asciiToTrytes()`]{@link #module_converter.asciiToTrytes} method.
	 *
	 * @method trytesToAscii
	 *
	 * @summary Converts trytes to ASCII characters.
	 *
	 * @memberof module:converter
	 *
	 * @param {string} trytes - An even number of trytes
	 *
	 * @example
	 * ```js
	 * let message = Converter.trytesToAscii('IOTA');
	 * ```
	 *
	 * @return {string} ASCII characters
	 *
	 * @throws {errors.INVALID_TRYTES}: Make sure that the `trytes` argument contains only valid trytes (A-Z or 9).
	 * @throws {errors.INVALID_ODD_LENGTH}: Make sure that the `trytes` argument contains an even number of trytes.
	 */
	exports.trytesToAscii = function (trytes) {
	    if (typeof trytes !== 'string' || !new RegExp("^[9A-Z]{1,}$").test(trytes)) {
	        throw new Error(errors.INVALID_TRYTES);
	    }
	    if (trytes.length % 2) {
	        throw new Error(errors.INVALID_ODD_LENGTH);
	    }
	    var ascii = '';
	    for (var i = 0; i < trytes.length; i += 2) {
	        var charCode = src.TRYTE_ALPHABET.indexOf(trytes[i]) + src.TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27;
	        if (charCode) {
	            ascii += String.fromCharCode(charCode);
	        }
	    }
	    return ascii;
	};

	});

	unwrapExports(ascii);
	var ascii_1 = ascii.asciiToTrytes;
	var ascii_2 = ascii.trytesToAscii;

	if (!Int8Array.prototype.slice) {
	    Object.defineProperty(Int8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.subarray) {
	    Object.defineProperty(Uint8Array.prototype, 'subarray', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.map) {
	    Object.defineProperty(Int8Array.prototype, 'map', {
	        value: Array.prototype.map
	    });
	}
	if (!Int8Array.prototype.every) {
	    Object.defineProperty(Int8Array.prototype, 'every', {
	        value: Array.prototype.every
	    });
	}
	if (!Int8Array.prototype.some) {
	    Object.defineProperty(Uint8Array.prototype, 'some', {
	        value: Array.prototype.some
	    });
	}
	if (!Int8Array.prototype.indexOf) {
	    Object.defineProperty(Int8Array.prototype, 'indexOf', {
	        value: Array.prototype.indexOf
	    });
	}
	// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Polyfill
	// Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/
	if (!Int8Array.prototype.fill) {
	    Object.defineProperty(Int8Array.prototype, 'fill', {
	        value: function (input) {
	            // Steps 1-2.
	            if (this == null) {
	                throw new TypeError('this is null or not defined');
	            }
	            var O = Object(this);
	            // Steps 3-5.
	            var len = O.length >>> 0;
	            // Steps 6-7.
	            var start = arguments[1];
	            var relativeStart = start >> 0;
	            // Step 8.
	            var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
	            // Steps 9-10.
	            var end = arguments[2];
	            var relativeEnd = end === undefined ? len : end >> 0;
	            // Step 11.
	            var last = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
	            // Step 12.
	            while (k < last) {
	                O[k] = input;
	                k++;
	            }
	            // Step 13.
	            return O;
	        }
	    });
	}
	if (!Uint32Array.prototype.slice) {
	    Object.defineProperty(Uint8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Uint32Array.prototype.reverse) {
	    Object.defineProperty(Uint8Array.prototype, 'reverse', {
	        value: Array.prototype.reverse
	    });
	}

	var trits_1 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;


	var RADIX = 3;
	var MAX_TRIT_VALUE = (RADIX - 1) / 2;
	var MIN_TRIT_VALUE = -MAX_TRIT_VALUE;
	exports.TRYTE_WIDTH = MAX_TRIT_VALUE - MIN_TRIT_VALUE + 1;
	// All possible tryte values
	exports.TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	// Trytes to trits look up table
	exports.TRYTES_TRITS_LUT = [
	    [0, 0, 0],
	    [1, 0, 0],
	    [-1, 1, 0],
	    [0, 1, 0],
	    [1, 1, 0],
	    [-1, -1, 1],
	    [0, -1, 1],
	    [1, -1, 1],
	    [-1, 0, 1],
	    [0, 0, 1],
	    [1, 0, 1],
	    [-1, 1, 1],
	    [0, 1, 1],
	    [1, 1, 1],
	    [-1, -1, -1],
	    [0, -1, -1],
	    [1, -1, -1],
	    [-1, 0, -1],
	    [0, 0, -1],
	    [1, 0, -1],
	    [-1, 1, -1],
	    [0, 1, -1],
	    [1, 1, -1],
	    [-1, -1, 0],
	    [0, -1, 0],
	    [1, -1, 0],
	    [-1, 0, 0],
	];
	/**
	 * Converts trytes or values to trits
	 *
	 * @method trits
	 *
	 * @ignore
	 *
	 * @memberof module:converter
	 *
	 * @param {String|Number} input - Tryte string or value to be converted.
	 *
	 * @return {Int8Array} trits
	 */
	function trits(input) {
	    if (typeof input === 'number' && Number.isInteger(input)) {
	        return fromValue(input);
	    }
	    else if (typeof input === 'string') {
	        var result = new Int8Array(input.length * exports.TRYTE_WIDTH);
	        for (var i = 0; i < input.length; i++) {
	            var index = exports.TRYTE_ALPHABET.indexOf(input.charAt(i));
	            if (index === -1) {
	                throw new Error(errors.INVALID_TRYTES);
	            }
	            for (var j = 0; j < exports.TRYTE_WIDTH; j++) {
	                result[i * exports.TRYTE_WIDTH + j] = exports.TRYTES_TRITS_LUT[index][j];
	            }
	        }
	        return result;
	    }
	    else {
	        throw new Error(errors.INVALID_TRYTES);
	    }
	}
	exports.trits = trits;
	/**
	 * This method converts [trytes](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary) to trits.
	 *
	 * ## Related methods
	 *
	 * To convert ASCII characters to trytes, use the [`asciiToTrytes()`]{@link #module_converter.asciiToTrytes} method.
	 *
	 * @method trytesToTrits
	 *
	 * @summary Converts trytes to trits.
	 *
	 * @memberof module:converter
	 *
	 * @param {String|number} input - Trytes
	 *
	 * @example
	 * ```js
	 * let trits = Converter.trytesToTrits('IOTA');
	 * ```
	 *
	 * @return {Int8Array} trits
	 *
	 * @throws {errors.INVALID_TRYTES}: Make sure that the `input` argument contains only valid trytes (A-Z or 9).
	 */
	exports.trytesToTrits = trits;
	/**
	 * Converts trits to trytes
	 *
	 * @method trytes
	 *
	 * @memberof module:converter
	 *
	 * @ignore
	 *
	 * @param {Int8Array} trits
	 *
	 * @return {String} trytes
	 */
	// tslint:disable-next-line no-shadowed-variable
	function trytes(trits) {
	    if (!(trits instanceof Int8Array) && !Array.isArray(trits)) {
	        throw new Error(errors.INVALID_TRITS);
	    }
	    var result = '';
	    for (var i = 0; i < trits.length / exports.TRYTE_WIDTH; i++) {
	        var j = 0;
	        for (var k = 0; k < exports.TRYTE_WIDTH; k++) {
	            j += trits[i * exports.TRYTE_WIDTH + k] * Math.pow(exports.TRYTE_WIDTH, k);
	        }
	        if (j < 0) {
	            j += exports.TRYTE_ALPHABET.length;
	        }
	        result += exports.TRYTE_ALPHABET.charAt(j);
	    }
	    return result;
	}
	exports.trytes = trytes;
	/**
	 * This method converts [trits](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary) to trytes.
	 *
	 * ## Related methods
	 *
	 * To convert trytes to ASCII characters, use the [`trytesToAscii()`]{@link #module_converter.trytesToAscii} method.
	 *
	 * @method tritsToTrytes
	 *
	 * @summary Converts trits to trytes.
	 *
	 * @memberof module:converter
	 *
	 * @param {String|number} input - Trits
	 *
	 * @example
	 * ```js
	 * let trytes = Converter.tritsToTrytes(trits);
	 * ```
	 *
	 * @return {Int8Array} trytes
	 *
	 * @throws {errors.INVALID_TRITS}: Make sure that the `input` argument contains an array of trits.
	 */
	exports.tritsToTrytes = trytes;
	/**
	 * Converts trits into an integer value
	 *
	 * @method value
	 *
	 * @ignore
	 *
	 * @memberof module:converter
	 *
	 * @param {Int8Array} trits
	 *
	 * @return {Number}
	 */
	// tslint:disable-next-line no-shadowed-variable
	function value(trits) {
	    var returnValue = 0;
	    for (var i = trits.length; i-- > 0;) {
	        returnValue = returnValue * RADIX + trits[i];
	    }
	    return returnValue;
	}
	exports.value = value;
	/**
	 * This method converts [trits](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary) to a number.
	 *
	 * ## Related methods
	 *
	 * To convert trytes to trits, use the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
	 * To convert trits to trytes, use the [`tritsToTrytes()`]{@link #module_converter.tritsToTrytes} method.
	 *
	 * @method tritsToValue
	 *
	 * @summary Converts trits to a number.
	 *
	 * @memberof module:converter
	 *
	 * @param {String|number} input - Trits
	 *
	 * @example
	 * ```js
	 * let number = Converter.tritsToValue(trits);
	 * ```
	 *
	 * @return {Int8Array} number
	 */
	exports.tritsToValue = value;
	/**
	 * Converts an integer value to trits
	 *
	 * @method fromValue
	 *
	 * @ignore
	 *
	 * @memberof module:converter
	 *
	 * @param {Number} value
	 *
	 * @return {Int8Array} trits
	 */
	// tslint:disable-next-line no-shadowed-variable
	function fromValue(value) {
	    var destination = new Int8Array(value ? 1 + Math.floor(Math.log(2 * Math.max(1, Math.abs(value))) / Math.log(RADIX)) : 0);
	    var absoluteValue = value < 0 ? -value : value;
	    var i = 0;
	    while (absoluteValue > 0) {
	        var remainder = absoluteValue % RADIX;
	        absoluteValue = Math.floor(absoluteValue / RADIX);
	        if (remainder > MAX_TRIT_VALUE) {
	            remainder = MIN_TRIT_VALUE;
	            absoluteValue++;
	        }
	        destination[i] = remainder;
	        i++;
	    }
	    if (value < 0) {
	        for (var j = 0; j < destination.length; j++) {
	            destination[j] = -destination[j];
	        }
	    }
	    return destination;
	}
	exports.fromValue = fromValue;
	/**
	 * This method converts a number to [trits](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary).
	 *
	 * ## Related methods
	 *
	 * To convert trits to trytes, use the [`tritsToTrytes()`]{@link #module_converter.tritsToTrytes} method.
	 *
	 * @method valueToTrits
	 *
	 * @summary Converts trits to a number.
	 *
	 * @memberof module:converter
	 *
	 * @param {String|number} input - Number
	 *
	 * @example
	 * ```js
	 * let trits = Converter.valueToTrits(9);
	 * ```
	 *
	 * @return {Int8Array} trits
	 */
	exports.valueToTrits = fromValue;

	});

	unwrapExports(trits_1);
	var trits_2 = trits_1.TRYTE_WIDTH;
	var trits_3 = trits_1.TRYTE_ALPHABET;
	var trits_4 = trits_1.TRYTES_TRITS_LUT;
	var trits_5 = trits_1.trits;
	var trits_6 = trits_1.trytesToTrits;
	var trits_7 = trits_1.trytes;
	var trits_8 = trits_1.tritsToTrytes;
	var trits_9 = trits_1.value;
	var trits_10 = trits_1.tritsToValue;
	var trits_11 = trits_1.fromValue;
	var trits_12 = trits_1.valueToTrits;

	var src = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	exports.__esModule = true;
	/** @module converter */
	__export(ascii);
	__export(trits_1);
	exports.bytesToTrits = function (bytes) { return Int8Array.from(bytes); };
	exports.tritsToBytes = function (trits) { return Buffer.from(trits.buffer); };

	});

	unwrapExports(src);
	var src_1 = src.asciiToTrytes;
	var src_2 = src.trits;
	var src_3 = src.trytes;
	var src_4 = src.trytesToAscii;
	var src_5 = src.value;
	var src_6 = src.bytesToTrits;
	var src_7 = src.tritsToBytes;

	var types = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.makeAddress = function (address, balance, keyIndex, security) { return ({
	    address: address,
	    keyIndex: keyIndex,
	    security: security,
	    balance: balance
	}); };
	/* List of IRI Commands */
	var IRICommand;
	(function (IRICommand) {
	    IRICommand["GET_NODE_INFO"] = "getNodeInfo";
	    IRICommand["GET_NEIGHBORS"] = "getNeighbors";
	    IRICommand["ADD_NEIGHBORS"] = "addNeighbors";
	    IRICommand["REMOVE_NEIGHBORS"] = "removeNeighbors";
	    IRICommand["FIND_TRANSACTIONS"] = "findTransactions";
	    IRICommand["GET_TRYTES"] = "getTrytes";
	    IRICommand["GET_INCLUSION_STATES"] = "getInclusionStates";
	    IRICommand["GET_BALANCES"] = "getBalances";
	    IRICommand["GET_TRANSACTIONS_TO_APPROVE"] = "getTransactionsToApprove";
	    IRICommand["ATTACH_TO_TANGLE"] = "attachToTangle";
	    IRICommand["INTERRUPT_ATTACHING_TO_TANGLE"] = "interruptAttachingToTangle";
	    IRICommand["BROADCAST_TRANSACTIONS"] = "broadcastTransactions";
	    IRICommand["STORE_TRANSACTIONS"] = "storeTransactions";
	    IRICommand["CHECK_CONSISTENCY"] = "checkConsistency";
	    IRICommand["WERE_ADDRESSES_SPENT_FROM"] = "wereAddressesSpentFrom";
	})(IRICommand = exports.IRICommand || (exports.IRICommand = {}));
	/* Util methods */
	exports.asArray = function (x) { return (Array.isArray(x) ? x : [x]); };
	exports.getOptionsWithDefaults = function (defaults) { return function (options) {
	    return Object.assign({}, defaults, options);
	}; }; // tslint:disable-line prefer-object-spread
	var PersistenceBatchTypes;
	(function (PersistenceBatchTypes) {
	    PersistenceBatchTypes["put"] = "put";
	    PersistenceBatchTypes["del"] = "del";
	})(PersistenceBatchTypes = exports.PersistenceBatchTypes || (exports.PersistenceBatchTypes = {}));

	});

	unwrapExports(types);
	var types_1 = types.makeAddress;
	var types_2 = types.IRICommand;
	var types_3 = types.asArray;
	var types_4 = types.getOptionsWithDefaults;
	var types_5 = types.PersistenceBatchTypes;

	var bluebird = createCommonjsModule(function (module, exports) {
	/* @preserve
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2013-2018 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	/**
	 * bluebird build version 3.7.2
	 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
	*/
	!function(e){module.exports=e();}(function(){return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
	module.exports = function(Promise) {
	var SomePromiseArray = Promise._SomePromiseArray;
	function any(promises) {
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    ret.setHowMany(1);
	    ret.setUnwrap();
	    ret.init();
	    return promise;
	}

	Promise.any = function (promises) {
	    return any(promises);
	};

	Promise.prototype.any = function () {
	    return any(this);
	};

	};

	},{}],2:[function(_dereq_,module,exports){
	var firstLineError;
	try {throw new Error(); } catch (e) {firstLineError = e;}
	var schedule = _dereq_("./schedule");
	var Queue = _dereq_("./queue");

	function Async() {
	    this._customScheduler = false;
	    this._isTickUsed = false;
	    this._lateQueue = new Queue(16);
	    this._normalQueue = new Queue(16);
	    this._haveDrainedQueues = false;
	    var self = this;
	    this.drainQueues = function () {
	        self._drainQueues();
	    };
	    this._schedule = schedule;
	}

	Async.prototype.setScheduler = function(fn) {
	    var prev = this._schedule;
	    this._schedule = fn;
	    this._customScheduler = true;
	    return prev;
	};

	Async.prototype.hasCustomScheduler = function() {
	    return this._customScheduler;
	};

	Async.prototype.haveItemsQueued = function () {
	    return this._isTickUsed || this._haveDrainedQueues;
	};


	Async.prototype.fatalError = function(e, isNode) {
	    if (isNode) {
	        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
	            "\n");
	        process.exit(2);
	    } else {
	        this.throwLater(e);
	    }
	};

	Async.prototype.throwLater = function(fn, arg) {
	    if (arguments.length === 1) {
	        arg = fn;
	        fn = function () { throw arg; };
	    }
	    if (typeof setTimeout !== "undefined") {
	        setTimeout(function() {
	            fn(arg);
	        }, 0);
	    } else try {
	        this._schedule(function() {
	            fn(arg);
	        });
	    } catch (e) {
	        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	};

	function AsyncInvokeLater(fn, receiver, arg) {
	    this._lateQueue.push(fn, receiver, arg);
	    this._queueTick();
	}

	function AsyncInvoke(fn, receiver, arg) {
	    this._normalQueue.push(fn, receiver, arg);
	    this._queueTick();
	}

	function AsyncSettlePromises(promise) {
	    this._normalQueue._pushOne(promise);
	    this._queueTick();
	}

	Async.prototype.invokeLater = AsyncInvokeLater;
	Async.prototype.invoke = AsyncInvoke;
	Async.prototype.settlePromises = AsyncSettlePromises;


	function _drainQueue(queue) {
	    while (queue.length() > 0) {
	        _drainQueueStep(queue);
	    }
	}

	function _drainQueueStep(queue) {
	    var fn = queue.shift();
	    if (typeof fn !== "function") {
	        fn._settlePromises();
	    } else {
	        var receiver = queue.shift();
	        var arg = queue.shift();
	        fn.call(receiver, arg);
	    }
	}

	Async.prototype._drainQueues = function () {
	    _drainQueue(this._normalQueue);
	    this._reset();
	    this._haveDrainedQueues = true;
	    _drainQueue(this._lateQueue);
	};

	Async.prototype._queueTick = function () {
	    if (!this._isTickUsed) {
	        this._isTickUsed = true;
	        this._schedule(this.drainQueues);
	    }
	};

	Async.prototype._reset = function () {
	    this._isTickUsed = false;
	};

	module.exports = Async;
	module.exports.firstLineError = firstLineError;

	},{"./queue":26,"./schedule":29}],3:[function(_dereq_,module,exports){
	module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
	var calledBind = false;
	var rejectThis = function(_, e) {
	    this._reject(e);
	};

	var targetRejected = function(e, context) {
	    context.promiseRejectionQueued = true;
	    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
	};

	var bindingResolved = function(thisArg, context) {
	    if (((this._bitField & 50397184) === 0)) {
	        this._resolveCallback(context.target);
	    }
	};

	var bindingRejected = function(e, context) {
	    if (!context.promiseRejectionQueued) this._reject(e);
	};

	Promise.prototype.bind = function (thisArg) {
	    if (!calledBind) {
	        calledBind = true;
	        Promise.prototype._propagateFrom = debug.propagateFromFunction();
	        Promise.prototype._boundValue = debug.boundValueFunction();
	    }
	    var maybePromise = tryConvertToPromise(thisArg);
	    var ret = new Promise(INTERNAL);
	    ret._propagateFrom(this, 1);
	    var target = this._target();
	    ret._setBoundTo(maybePromise);
	    if (maybePromise instanceof Promise) {
	        var context = {
	            promiseRejectionQueued: false,
	            promise: ret,
	            target: target,
	            bindingPromise: maybePromise
	        };
	        target._then(INTERNAL, targetRejected, undefined, ret, context);
	        maybePromise._then(
	            bindingResolved, bindingRejected, undefined, ret, context);
	        ret._setOnCancel(maybePromise);
	    } else {
	        ret._resolveCallback(target);
	    }
	    return ret;
	};

	Promise.prototype._setBoundTo = function (obj) {
	    if (obj !== undefined) {
	        this._bitField = this._bitField | 2097152;
	        this._boundTo = obj;
	    } else {
	        this._bitField = this._bitField & (~2097152);
	    }
	};

	Promise.prototype._isBound = function () {
	    return (this._bitField & 2097152) === 2097152;
	};

	Promise.bind = function (thisArg, value) {
	    return Promise.resolve(value).bind(thisArg);
	};
	};

	},{}],4:[function(_dereq_,module,exports){
	var old;
	if (typeof Promise !== "undefined") old = Promise;
	function noConflict() {
	    try { if (Promise === bluebird) Promise = old; }
	    catch (e) {}
	    return bluebird;
	}
	var bluebird = _dereq_("./promise")();
	bluebird.noConflict = noConflict;
	module.exports = bluebird;

	},{"./promise":22}],5:[function(_dereq_,module,exports){
	var cr = Object.create;
	if (cr) {
	    var callerCache = cr(null);
	    var getterCache = cr(null);
	    callerCache[" size"] = getterCache[" size"] = 0;
	}

	module.exports = function(Promise) {
	var util = _dereq_("./util");
	var canEvaluate = util.canEvaluate;
	var isIdentifier = util.isIdentifier;
	var getGetter;

	function ensureMethod(obj, methodName) {
	    var fn;
	    if (obj != null) fn = obj[methodName];
	    if (typeof fn !== "function") {
	        var message = "Object " + util.classString(obj) + " has no method '" +
	            util.toString(methodName) + "'";
	        throw new Promise.TypeError(message);
	    }
	    return fn;
	}

	function caller(obj) {
	    var methodName = this.pop();
	    var fn = ensureMethod(obj, methodName);
	    return fn.apply(obj, this);
	}
	Promise.prototype.call = function (methodName) {
	    var args = [].slice.call(arguments, 1);    args.push(methodName);
	    return this._then(caller, undefined, undefined, args, undefined);
	};

	function namedGetter(obj) {
	    return obj[this];
	}
	function indexedGetter(obj) {
	    var index = +this;
	    if (index < 0) index = Math.max(0, index + obj.length);
	    return obj[index];
	}
	Promise.prototype.get = function (propertyName) {
	    var isIndex = (typeof propertyName === "number");
	    var getter;
	    if (!isIndex) {
	        if (canEvaluate) {
	            var maybeGetter = getGetter();
	            getter = maybeGetter !== null ? maybeGetter : namedGetter;
	        } else {
	            getter = namedGetter;
	        }
	    } else {
	        getter = indexedGetter;
	    }
	    return this._then(getter, undefined, undefined, propertyName, undefined);
	};
	};

	},{"./util":36}],6:[function(_dereq_,module,exports){
	module.exports = function(Promise, PromiseArray, apiRejection, debug) {
	var util = _dereq_("./util");
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	var async = Promise._async;

	Promise.prototype["break"] = Promise.prototype.cancel = function() {
	    if (!debug.cancellation()) return this._warn("cancellation is disabled");

	    var promise = this;
	    var child = promise;
	    while (promise._isCancellable()) {
	        if (!promise._cancelBy(child)) {
	            if (child._isFollowing()) {
	                child._followee().cancel();
	            } else {
	                child._cancelBranched();
	            }
	            break;
	        }

	        var parent = promise._cancellationParent;
	        if (parent == null || !parent._isCancellable()) {
	            if (promise._isFollowing()) {
	                promise._followee().cancel();
	            } else {
	                promise._cancelBranched();
	            }
	            break;
	        } else {
	            if (promise._isFollowing()) promise._followee().cancel();
	            promise._setWillBeCancelled();
	            child = promise;
	            promise = parent;
	        }
	    }
	};

	Promise.prototype._branchHasCancelled = function() {
	    this._branchesRemainingToCancel--;
	};

	Promise.prototype._enoughBranchesHaveCancelled = function() {
	    return this._branchesRemainingToCancel === undefined ||
	           this._branchesRemainingToCancel <= 0;
	};

	Promise.prototype._cancelBy = function(canceller) {
	    if (canceller === this) {
	        this._branchesRemainingToCancel = 0;
	        this._invokeOnCancel();
	        return true;
	    } else {
	        this._branchHasCancelled();
	        if (this._enoughBranchesHaveCancelled()) {
	            this._invokeOnCancel();
	            return true;
	        }
	    }
	    return false;
	};

	Promise.prototype._cancelBranched = function() {
	    if (this._enoughBranchesHaveCancelled()) {
	        this._cancel();
	    }
	};

	Promise.prototype._cancel = function() {
	    if (!this._isCancellable()) return;
	    this._setCancelled();
	    async.invoke(this._cancelPromises, this, undefined);
	};

	Promise.prototype._cancelPromises = function() {
	    if (this._length() > 0) this._settlePromises();
	};

	Promise.prototype._unsetOnCancel = function() {
	    this._onCancelField = undefined;
	};

	Promise.prototype._isCancellable = function() {
	    return this.isPending() && !this._isCancelled();
	};

	Promise.prototype.isCancellable = function() {
	    return this.isPending() && !this.isCancelled();
	};

	Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
	    if (util.isArray(onCancelCallback)) {
	        for (var i = 0; i < onCancelCallback.length; ++i) {
	            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
	        }
	    } else if (onCancelCallback !== undefined) {
	        if (typeof onCancelCallback === "function") {
	            if (!internalOnly) {
	                var e = tryCatch(onCancelCallback).call(this._boundValue());
	                if (e === errorObj) {
	                    this._attachExtraTrace(e.e);
	                    async.throwLater(e.e);
	                }
	            }
	        } else {
	            onCancelCallback._resultCancelled(this);
	        }
	    }
	};

	Promise.prototype._invokeOnCancel = function() {
	    var onCancelCallback = this._onCancel();
	    this._unsetOnCancel();
	    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
	};

	Promise.prototype._invokeInternalOnCancel = function() {
	    if (this._isCancellable()) {
	        this._doInvokeOnCancel(this._onCancel(), true);
	        this._unsetOnCancel();
	    }
	};

	Promise.prototype._resultCancelled = function() {
	    this.cancel();
	};

	};

	},{"./util":36}],7:[function(_dereq_,module,exports){
	module.exports = function(NEXT_FILTER) {
	var util = _dereq_("./util");
	var getKeys = _dereq_("./es5").keys;
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;

	function catchFilter(instances, cb, promise) {
	    return function(e) {
	        var boundTo = promise._boundValue();
	        predicateLoop: for (var i = 0; i < instances.length; ++i) {
	            var item = instances[i];

	            if (item === Error ||
	                (item != null && item.prototype instanceof Error)) {
	                if (e instanceof item) {
	                    return tryCatch(cb).call(boundTo, e);
	                }
	            } else if (typeof item === "function") {
	                var matchesPredicate = tryCatch(item).call(boundTo, e);
	                if (matchesPredicate === errorObj) {
	                    return matchesPredicate;
	                } else if (matchesPredicate) {
	                    return tryCatch(cb).call(boundTo, e);
	                }
	            } else if (util.isObject(e)) {
	                var keys = getKeys(item);
	                for (var j = 0; j < keys.length; ++j) {
	                    var key = keys[j];
	                    if (item[key] != e[key]) {
	                        continue predicateLoop;
	                    }
	                }
	                return tryCatch(cb).call(boundTo, e);
	            }
	        }
	        return NEXT_FILTER;
	    };
	}

	return catchFilter;
	};

	},{"./es5":13,"./util":36}],8:[function(_dereq_,module,exports){
	module.exports = function(Promise) {
	var longStackTraces = false;
	var contextStack = [];

	Promise.prototype._promiseCreated = function() {};
	Promise.prototype._pushContext = function() {};
	Promise.prototype._popContext = function() {return null;};
	Promise._peekContext = Promise.prototype._peekContext = function() {};

	function Context() {
	    this._trace = new Context.CapturedTrace(peekContext());
	}
	Context.prototype._pushContext = function () {
	    if (this._trace !== undefined) {
	        this._trace._promiseCreated = null;
	        contextStack.push(this._trace);
	    }
	};

	Context.prototype._popContext = function () {
	    if (this._trace !== undefined) {
	        var trace = contextStack.pop();
	        var ret = trace._promiseCreated;
	        trace._promiseCreated = null;
	        return ret;
	    }
	    return null;
	};

	function createContext() {
	    if (longStackTraces) return new Context();
	}

	function peekContext() {
	    var lastIndex = contextStack.length - 1;
	    if (lastIndex >= 0) {
	        return contextStack[lastIndex];
	    }
	    return undefined;
	}
	Context.CapturedTrace = null;
	Context.create = createContext;
	Context.deactivateLongStackTraces = function() {};
	Context.activateLongStackTraces = function() {
	    var Promise_pushContext = Promise.prototype._pushContext;
	    var Promise_popContext = Promise.prototype._popContext;
	    var Promise_PeekContext = Promise._peekContext;
	    var Promise_peekContext = Promise.prototype._peekContext;
	    var Promise_promiseCreated = Promise.prototype._promiseCreated;
	    Context.deactivateLongStackTraces = function() {
	        Promise.prototype._pushContext = Promise_pushContext;
	        Promise.prototype._popContext = Promise_popContext;
	        Promise._peekContext = Promise_PeekContext;
	        Promise.prototype._peekContext = Promise_peekContext;
	        Promise.prototype._promiseCreated = Promise_promiseCreated;
	        longStackTraces = false;
	    };
	    longStackTraces = true;
	    Promise.prototype._pushContext = Context.prototype._pushContext;
	    Promise.prototype._popContext = Context.prototype._popContext;
	    Promise._peekContext = Promise.prototype._peekContext = peekContext;
	    Promise.prototype._promiseCreated = function() {
	        var ctx = this._peekContext();
	        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
	    };
	};
	return Context;
	};

	},{}],9:[function(_dereq_,module,exports){
	module.exports = function(Promise, Context,
	    enableAsyncHooks, disableAsyncHooks) {
	var async = Promise._async;
	var Warning = _dereq_("./errors").Warning;
	var util = _dereq_("./util");
	var es5 = _dereq_("./es5");
	var canAttachTrace = util.canAttachTrace;
	var unhandledRejectionHandled;
	var possiblyUnhandledRejection;
	var bluebirdFramePattern =
	    /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
	var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
	var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
	var stackFramePattern = null;
	var formatStack = null;
	var indentStackFrames = false;
	var printWarning;
	var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 &&
	                        (true  ));

	var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 &&
	    (debugging || util.env("BLUEBIRD_WARNINGS")));

	var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
	    (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));

	var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
	    (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

	var deferUnhandledRejectionCheck;
	(function() {
	    var promises = [];

	    function unhandledRejectionCheck() {
	        for (var i = 0; i < promises.length; ++i) {
	            promises[i]._notifyUnhandledRejection();
	        }
	        unhandledRejectionClear();
	    }

	    function unhandledRejectionClear() {
	        promises.length = 0;
	    }

	    deferUnhandledRejectionCheck = function(promise) {
	        promises.push(promise);
	        setTimeout(unhandledRejectionCheck, 1);
	    };

	    es5.defineProperty(Promise, "_unhandledRejectionCheck", {
	        value: unhandledRejectionCheck
	    });
	    es5.defineProperty(Promise, "_unhandledRejectionClear", {
	        value: unhandledRejectionClear
	    });
	})();

	Promise.prototype.suppressUnhandledRejections = function() {
	    var target = this._target();
	    target._bitField = ((target._bitField & (~1048576)) |
	                      524288);
	};

	Promise.prototype._ensurePossibleRejectionHandled = function () {
	    if ((this._bitField & 524288) !== 0) return;
	    this._setRejectionIsUnhandled();
	    deferUnhandledRejectionCheck(this);
	};

	Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
	    fireRejectionEvent("rejectionHandled",
	                                  unhandledRejectionHandled, undefined, this);
	};

	Promise.prototype._setReturnedNonUndefined = function() {
	    this._bitField = this._bitField | 268435456;
	};

	Promise.prototype._returnedNonUndefined = function() {
	    return (this._bitField & 268435456) !== 0;
	};

	Promise.prototype._notifyUnhandledRejection = function () {
	    if (this._isRejectionUnhandled()) {
	        var reason = this._settledValue();
	        this._setUnhandledRejectionIsNotified();
	        fireRejectionEvent("unhandledRejection",
	                                      possiblyUnhandledRejection, reason, this);
	    }
	};

	Promise.prototype._setUnhandledRejectionIsNotified = function () {
	    this._bitField = this._bitField | 262144;
	};

	Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
	    this._bitField = this._bitField & (~262144);
	};

	Promise.prototype._isUnhandledRejectionNotified = function () {
	    return (this._bitField & 262144) > 0;
	};

	Promise.prototype._setRejectionIsUnhandled = function () {
	    this._bitField = this._bitField | 1048576;
	};

	Promise.prototype._unsetRejectionIsUnhandled = function () {
	    this._bitField = this._bitField & (~1048576);
	    if (this._isUnhandledRejectionNotified()) {
	        this._unsetUnhandledRejectionIsNotified();
	        this._notifyUnhandledRejectionIsHandled();
	    }
	};

	Promise.prototype._isRejectionUnhandled = function () {
	    return (this._bitField & 1048576) > 0;
	};

	Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
	    return warn(message, shouldUseOwnTrace, promise || this);
	};

	Promise.onPossiblyUnhandledRejection = function (fn) {
	    var context = Promise._getContext();
	    possiblyUnhandledRejection = util.contextBind(context, fn);
	};

	Promise.onUnhandledRejectionHandled = function (fn) {
	    var context = Promise._getContext();
	    unhandledRejectionHandled = util.contextBind(context, fn);
	};

	var disableLongStackTraces = function() {};
	Promise.longStackTraces = function () {
	    if (async.haveItemsQueued() && !config.longStackTraces) {
	        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    if (!config.longStackTraces && longStackTracesIsSupported()) {
	        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
	        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
	        var Promise_dereferenceTrace = Promise.prototype._dereferenceTrace;
	        config.longStackTraces = true;
	        disableLongStackTraces = function() {
	            if (async.haveItemsQueued() && !config.longStackTraces) {
	                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	            }
	            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
	            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
	            Promise.prototype._dereferenceTrace = Promise_dereferenceTrace;
	            Context.deactivateLongStackTraces();
	            config.longStackTraces = false;
	        };
	        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
	        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
	        Promise.prototype._dereferenceTrace = longStackTracesDereferenceTrace;
	        Context.activateLongStackTraces();
	    }
	};

	Promise.hasLongStackTraces = function () {
	    return config.longStackTraces && longStackTracesIsSupported();
	};


	var legacyHandlers = {
	    unhandledrejection: {
	        before: function() {
	            var ret = util.global.onunhandledrejection;
	            util.global.onunhandledrejection = null;
	            return ret;
	        },
	        after: function(fn) {
	            util.global.onunhandledrejection = fn;
	        }
	    },
	    rejectionhandled: {
	        before: function() {
	            var ret = util.global.onrejectionhandled;
	            util.global.onrejectionhandled = null;
	            return ret;
	        },
	        after: function(fn) {
	            util.global.onrejectionhandled = fn;
	        }
	    }
	};

	var fireDomEvent = (function() {
	    var dispatch = function(legacy, e) {
	        if (legacy) {
	            var fn;
	            try {
	                fn = legacy.before();
	                return !util.global.dispatchEvent(e);
	            } finally {
	                legacy.after(fn);
	            }
	        } else {
	            return !util.global.dispatchEvent(e);
	        }
	    };
	    try {
	        if (typeof CustomEvent === "function") {
	            var event = new CustomEvent("CustomEvent");
	            util.global.dispatchEvent(event);
	            return function(name, event) {
	                name = name.toLowerCase();
	                var eventData = {
	                    detail: event,
	                    cancelable: true
	                };
	                var domEvent = new CustomEvent(name, eventData);
	                es5.defineProperty(
	                    domEvent, "promise", {value: event.promise});
	                es5.defineProperty(
	                    domEvent, "reason", {value: event.reason});

	                return dispatch(legacyHandlers[name], domEvent);
	            };
	        } else if (typeof Event === "function") {
	            var event = new Event("CustomEvent");
	            util.global.dispatchEvent(event);
	            return function(name, event) {
	                name = name.toLowerCase();
	                var domEvent = new Event(name, {
	                    cancelable: true
	                });
	                domEvent.detail = event;
	                es5.defineProperty(domEvent, "promise", {value: event.promise});
	                es5.defineProperty(domEvent, "reason", {value: event.reason});
	                return dispatch(legacyHandlers[name], domEvent);
	            };
	        } else {
	            var event = document.createEvent("CustomEvent");
	            event.initCustomEvent("testingtheevent", false, true, {});
	            util.global.dispatchEvent(event);
	            return function(name, event) {
	                name = name.toLowerCase();
	                var domEvent = document.createEvent("CustomEvent");
	                domEvent.initCustomEvent(name, false, true,
	                    event);
	                return dispatch(legacyHandlers[name], domEvent);
	            };
	        }
	    } catch (e) {}
	    return function() {
	        return false;
	    };
	})();

	var fireGlobalEvent = (function() {
	    if (util.isNode) {
	        return function() {
	            return process.emit.apply(process, arguments);
	        };
	    } else {
	        if (!util.global) {
	            return function() {
	                return false;
	            };
	        }
	        return function(name) {
	            var methodName = "on" + name.toLowerCase();
	            var method = util.global[methodName];
	            if (!method) return false;
	            method.apply(util.global, [].slice.call(arguments, 1));
	            return true;
	        };
	    }
	})();

	function generatePromiseLifecycleEventObject(name, promise) {
	    return {promise: promise};
	}

	var eventToObjectGenerator = {
	    promiseCreated: generatePromiseLifecycleEventObject,
	    promiseFulfilled: generatePromiseLifecycleEventObject,
	    promiseRejected: generatePromiseLifecycleEventObject,
	    promiseResolved: generatePromiseLifecycleEventObject,
	    promiseCancelled: generatePromiseLifecycleEventObject,
	    promiseChained: function(name, promise, child) {
	        return {promise: promise, child: child};
	    },
	    warning: function(name, warning) {
	        return {warning: warning};
	    },
	    unhandledRejection: function (name, reason, promise) {
	        return {reason: reason, promise: promise};
	    },
	    rejectionHandled: generatePromiseLifecycleEventObject
	};

	var activeFireEvent = function (name) {
	    var globalEventFired = false;
	    try {
	        globalEventFired = fireGlobalEvent.apply(null, arguments);
	    } catch (e) {
	        async.throwLater(e);
	        globalEventFired = true;
	    }

	    var domEventFired = false;
	    try {
	        domEventFired = fireDomEvent(name,
	                    eventToObjectGenerator[name].apply(null, arguments));
	    } catch (e) {
	        async.throwLater(e);
	        domEventFired = true;
	    }

	    return domEventFired || globalEventFired;
	};

	Promise.config = function(opts) {
	    opts = Object(opts);
	    if ("longStackTraces" in opts) {
	        if (opts.longStackTraces) {
	            Promise.longStackTraces();
	        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
	            disableLongStackTraces();
	        }
	    }
	    if ("warnings" in opts) {
	        var warningsOption = opts.warnings;
	        config.warnings = !!warningsOption;
	        wForgottenReturn = config.warnings;

	        if (util.isObject(warningsOption)) {
	            if ("wForgottenReturn" in warningsOption) {
	                wForgottenReturn = !!warningsOption.wForgottenReturn;
	            }
	        }
	    }
	    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
	        if (async.haveItemsQueued()) {
	            throw new Error(
	                "cannot enable cancellation after promises are in use");
	        }
	        Promise.prototype._clearCancellationData =
	            cancellationClearCancellationData;
	        Promise.prototype._propagateFrom = cancellationPropagateFrom;
	        Promise.prototype._onCancel = cancellationOnCancel;
	        Promise.prototype._setOnCancel = cancellationSetOnCancel;
	        Promise.prototype._attachCancellationCallback =
	            cancellationAttachCancellationCallback;
	        Promise.prototype._execute = cancellationExecute;
	        propagateFromFunction = cancellationPropagateFrom;
	        config.cancellation = true;
	    }
	    if ("monitoring" in opts) {
	        if (opts.monitoring && !config.monitoring) {
	            config.monitoring = true;
	            Promise.prototype._fireEvent = activeFireEvent;
	        } else if (!opts.monitoring && config.monitoring) {
	            config.monitoring = false;
	            Promise.prototype._fireEvent = defaultFireEvent;
	        }
	    }
	    if ("asyncHooks" in opts && util.nodeSupportsAsyncResource) {
	        var prev = config.asyncHooks;
	        var cur = !!opts.asyncHooks;
	        if (prev !== cur) {
	            config.asyncHooks = cur;
	            if (cur) {
	                enableAsyncHooks();
	            } else {
	                disableAsyncHooks();
	            }
	        }
	    }
	    return Promise;
	};

	function defaultFireEvent() { return false; }

	Promise.prototype._fireEvent = defaultFireEvent;
	Promise.prototype._execute = function(executor, resolve, reject) {
	    try {
	        executor(resolve, reject);
	    } catch (e) {
	        return e;
	    }
	};
	Promise.prototype._onCancel = function () {};
	Promise.prototype._setOnCancel = function (handler) { };
	Promise.prototype._attachCancellationCallback = function(onCancel) {
	};
	Promise.prototype._captureStackTrace = function () {};
	Promise.prototype._attachExtraTrace = function () {};
	Promise.prototype._dereferenceTrace = function () {};
	Promise.prototype._clearCancellationData = function() {};
	Promise.prototype._propagateFrom = function (parent, flags) {
	};

	function cancellationExecute(executor, resolve, reject) {
	    var promise = this;
	    try {
	        executor(resolve, reject, function(onCancel) {
	            if (typeof onCancel !== "function") {
	                throw new TypeError("onCancel must be a function, got: " +
	                                    util.toString(onCancel));
	            }
	            promise._attachCancellationCallback(onCancel);
	        });
	    } catch (e) {
	        return e;
	    }
	}

	function cancellationAttachCancellationCallback(onCancel) {
	    if (!this._isCancellable()) return this;

	    var previousOnCancel = this._onCancel();
	    if (previousOnCancel !== undefined) {
	        if (util.isArray(previousOnCancel)) {
	            previousOnCancel.push(onCancel);
	        } else {
	            this._setOnCancel([previousOnCancel, onCancel]);
	        }
	    } else {
	        this._setOnCancel(onCancel);
	    }
	}

	function cancellationOnCancel() {
	    return this._onCancelField;
	}

	function cancellationSetOnCancel(onCancel) {
	    this._onCancelField = onCancel;
	}

	function cancellationClearCancellationData() {
	    this._cancellationParent = undefined;
	    this._onCancelField = undefined;
	}

	function cancellationPropagateFrom(parent, flags) {
	    if ((flags & 1) !== 0) {
	        this._cancellationParent = parent;
	        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
	        if (branchesRemainingToCancel === undefined) {
	            branchesRemainingToCancel = 0;
	        }
	        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
	    }
	    if ((flags & 2) !== 0 && parent._isBound()) {
	        this._setBoundTo(parent._boundTo);
	    }
	}

	function bindingPropagateFrom(parent, flags) {
	    if ((flags & 2) !== 0 && parent._isBound()) {
	        this._setBoundTo(parent._boundTo);
	    }
	}
	var propagateFromFunction = bindingPropagateFrom;

	function boundValueFunction() {
	    var ret = this._boundTo;
	    if (ret !== undefined) {
	        if (ret instanceof Promise) {
	            if (ret.isFulfilled()) {
	                return ret.value();
	            } else {
	                return undefined;
	            }
	        }
	    }
	    return ret;
	}

	function longStackTracesCaptureStackTrace() {
	    this._trace = new CapturedTrace(this._peekContext());
	}

	function longStackTracesAttachExtraTrace(error, ignoreSelf) {
	    if (canAttachTrace(error)) {
	        var trace = this._trace;
	        if (trace !== undefined) {
	            if (ignoreSelf) trace = trace._parent;
	        }
	        if (trace !== undefined) {
	            trace.attachExtraTrace(error);
	        } else if (!error.__stackCleaned__) {
	            var parsed = parseStackAndMessage(error);
	            util.notEnumerableProp(error, "stack",
	                parsed.message + "\n" + parsed.stack.join("\n"));
	            util.notEnumerableProp(error, "__stackCleaned__", true);
	        }
	    }
	}

	function longStackTracesDereferenceTrace() {
	    this._trace = undefined;
	}

	function checkForgottenReturns(returnValue, promiseCreated, name, promise,
	                               parent) {
	    if (returnValue === undefined && promiseCreated !== null &&
	        wForgottenReturn) {
	        if (parent !== undefined && parent._returnedNonUndefined()) return;
	        if ((promise._bitField & 65535) === 0) return;

	        if (name) name = name + " ";
	        var handlerLine = "";
	        var creatorLine = "";
	        if (promiseCreated._trace) {
	            var traceLines = promiseCreated._trace.stack.split("\n");
	            var stack = cleanStack(traceLines);
	            for (var i = stack.length - 1; i >= 0; --i) {
	                var line = stack[i];
	                if (!nodeFramePattern.test(line)) {
	                    var lineMatches = line.match(parseLinePattern);
	                    if (lineMatches) {
	                        handlerLine  = "at " + lineMatches[1] +
	                            ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
	                    }
	                    break;
	                }
	            }

	            if (stack.length > 0) {
	                var firstUserLine = stack[0];
	                for (var i = 0; i < traceLines.length; ++i) {

	                    if (traceLines[i] === firstUserLine) {
	                        if (i > 0) {
	                            creatorLine = "\n" + traceLines[i - 1];
	                        }
	                        break;
	                    }
	                }

	            }
	        }
	        var msg = "a promise was created in a " + name +
	            "handler " + handlerLine + "but was not returned from it, " +
	            "see http://goo.gl/rRqMUw" +
	            creatorLine;
	        promise._warn(msg, true, promiseCreated);
	    }
	}

	function deprecated(name, replacement) {
	    var message = name +
	        " is deprecated and will be removed in a future version.";
	    if (replacement) message += " Use " + replacement + " instead.";
	    return warn(message);
	}

	function warn(message, shouldUseOwnTrace, promise) {
	    if (!config.warnings) return;
	    var warning = new Warning(message);
	    var ctx;
	    if (shouldUseOwnTrace) {
	        promise._attachExtraTrace(warning);
	    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
	        ctx.attachExtraTrace(warning);
	    } else {
	        var parsed = parseStackAndMessage(warning);
	        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
	    }

	    if (!activeFireEvent("warning", warning)) {
	        formatAndLogError(warning, "", true);
	    }
	}

	function reconstructStack(message, stacks) {
	    for (var i = 0; i < stacks.length - 1; ++i) {
	        stacks[i].push("From previous event:");
	        stacks[i] = stacks[i].join("\n");
	    }
	    if (i < stacks.length) {
	        stacks[i] = stacks[i].join("\n");
	    }
	    return message + "\n" + stacks.join("\n");
	}

	function removeDuplicateOrEmptyJumps(stacks) {
	    for (var i = 0; i < stacks.length; ++i) {
	        if (stacks[i].length === 0 ||
	            ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
	            stacks.splice(i, 1);
	            i--;
	        }
	    }
	}

	function removeCommonRoots(stacks) {
	    var current = stacks[0];
	    for (var i = 1; i < stacks.length; ++i) {
	        var prev = stacks[i];
	        var currentLastIndex = current.length - 1;
	        var currentLastLine = current[currentLastIndex];
	        var commonRootMeetPoint = -1;

	        for (var j = prev.length - 1; j >= 0; --j) {
	            if (prev[j] === currentLastLine) {
	                commonRootMeetPoint = j;
	                break;
	            }
	        }

	        for (var j = commonRootMeetPoint; j >= 0; --j) {
	            var line = prev[j];
	            if (current[currentLastIndex] === line) {
	                current.pop();
	                currentLastIndex--;
	            } else {
	                break;
	            }
	        }
	        current = prev;
	    }
	}

	function cleanStack(stack) {
	    var ret = [];
	    for (var i = 0; i < stack.length; ++i) {
	        var line = stack[i];
	        var isTraceLine = "    (No stack trace)" === line ||
	            stackFramePattern.test(line);
	        var isInternalFrame = isTraceLine && shouldIgnore(line);
	        if (isTraceLine && !isInternalFrame) {
	            if (indentStackFrames && line.charAt(0) !== " ") {
	                line = "    " + line;
	            }
	            ret.push(line);
	        }
	    }
	    return ret;
	}

	function stackFramesAsArray(error) {
	    var stack = error.stack.replace(/\s+$/g, "").split("\n");
	    for (var i = 0; i < stack.length; ++i) {
	        var line = stack[i];
	        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
	            break;
	        }
	    }
	    if (i > 0 && error.name != "SyntaxError") {
	        stack = stack.slice(i);
	    }
	    return stack;
	}

	function parseStackAndMessage(error) {
	    var stack = error.stack;
	    var message = error.toString();
	    stack = typeof stack === "string" && stack.length > 0
	                ? stackFramesAsArray(error) : ["    (No stack trace)"];
	    return {
	        message: message,
	        stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
	    };
	}

	function formatAndLogError(error, title, isSoft) {
	    if (typeof console !== "undefined") {
	        var message;
	        if (util.isObject(error)) {
	            var stack = error.stack;
	            message = title + formatStack(stack, error);
	        } else {
	            message = title + String(error);
	        }
	        if (typeof printWarning === "function") {
	            printWarning(message, isSoft);
	        } else if (typeof console.log === "function" ||
	            typeof console.log === "object") {
	            console.log(message);
	        }
	    }
	}

	function fireRejectionEvent(name, localHandler, reason, promise) {
	    var localEventFired = false;
	    try {
	        if (typeof localHandler === "function") {
	            localEventFired = true;
	            if (name === "rejectionHandled") {
	                localHandler(promise);
	            } else {
	                localHandler(reason, promise);
	            }
	        }
	    } catch (e) {
	        async.throwLater(e);
	    }

	    if (name === "unhandledRejection") {
	        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
	            formatAndLogError(reason, "Unhandled rejection ");
	        }
	    } else {
	        activeFireEvent(name, promise);
	    }
	}

	function formatNonError(obj) {
	    var str;
	    if (typeof obj === "function") {
	        str = "[function " +
	            (obj.name || "anonymous") +
	            "]";
	    } else {
	        str = obj && typeof obj.toString === "function"
	            ? obj.toString() : util.toString(obj);
	        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
	        if (ruselessToString.test(str)) {
	            try {
	                var newStr = JSON.stringify(obj);
	                str = newStr;
	            }
	            catch(e) {

	            }
	        }
	        if (str.length === 0) {
	            str = "(empty array)";
	        }
	    }
	    return ("(<" + snip(str) + ">, no stack trace)");
	}

	function snip(str) {
	    var maxChars = 41;
	    if (str.length < maxChars) {
	        return str;
	    }
	    return str.substr(0, maxChars - 3) + "...";
	}

	function longStackTracesIsSupported() {
	    return typeof captureStackTrace === "function";
	}

	var shouldIgnore = function() { return false; };
	var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
	function parseLineInfo(line) {
	    var matches = line.match(parseLineInfoRegex);
	    if (matches) {
	        return {
	            fileName: matches[1],
	            line: parseInt(matches[2], 10)
	        };
	    }
	}

	function setBounds(firstLineError, lastLineError) {
	    if (!longStackTracesIsSupported()) return;
	    var firstStackLines = (firstLineError.stack || "").split("\n");
	    var lastStackLines = (lastLineError.stack || "").split("\n");
	    var firstIndex = -1;
	    var lastIndex = -1;
	    var firstFileName;
	    var lastFileName;
	    for (var i = 0; i < firstStackLines.length; ++i) {
	        var result = parseLineInfo(firstStackLines[i]);
	        if (result) {
	            firstFileName = result.fileName;
	            firstIndex = result.line;
	            break;
	        }
	    }
	    for (var i = 0; i < lastStackLines.length; ++i) {
	        var result = parseLineInfo(lastStackLines[i]);
	        if (result) {
	            lastFileName = result.fileName;
	            lastIndex = result.line;
	            break;
	        }
	    }
	    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
	        firstFileName !== lastFileName || firstIndex >= lastIndex) {
	        return;
	    }

	    shouldIgnore = function(line) {
	        if (bluebirdFramePattern.test(line)) return true;
	        var info = parseLineInfo(line);
	        if (info) {
	            if (info.fileName === firstFileName &&
	                (firstIndex <= info.line && info.line <= lastIndex)) {
	                return true;
	            }
	        }
	        return false;
	    };
	}

	function CapturedTrace(parent) {
	    this._parent = parent;
	    this._promisesCreated = 0;
	    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
	    captureStackTrace(this, CapturedTrace);
	    if (length > 32) this.uncycle();
	}
	util.inherits(CapturedTrace, Error);
	Context.CapturedTrace = CapturedTrace;

	CapturedTrace.prototype.uncycle = function() {
	    var length = this._length;
	    if (length < 2) return;
	    var nodes = [];
	    var stackToIndex = {};

	    for (var i = 0, node = this; node !== undefined; ++i) {
	        nodes.push(node);
	        node = node._parent;
	    }
	    length = this._length = i;
	    for (var i = length - 1; i >= 0; --i) {
	        var stack = nodes[i].stack;
	        if (stackToIndex[stack] === undefined) {
	            stackToIndex[stack] = i;
	        }
	    }
	    for (var i = 0; i < length; ++i) {
	        var currentStack = nodes[i].stack;
	        var index = stackToIndex[currentStack];
	        if (index !== undefined && index !== i) {
	            if (index > 0) {
	                nodes[index - 1]._parent = undefined;
	                nodes[index - 1]._length = 1;
	            }
	            nodes[i]._parent = undefined;
	            nodes[i]._length = 1;
	            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

	            if (index < length - 1) {
	                cycleEdgeNode._parent = nodes[index + 1];
	                cycleEdgeNode._parent.uncycle();
	                cycleEdgeNode._length =
	                    cycleEdgeNode._parent._length + 1;
	            } else {
	                cycleEdgeNode._parent = undefined;
	                cycleEdgeNode._length = 1;
	            }
	            var currentChildLength = cycleEdgeNode._length + 1;
	            for (var j = i - 2; j >= 0; --j) {
	                nodes[j]._length = currentChildLength;
	                currentChildLength++;
	            }
	            return;
	        }
	    }
	};

	CapturedTrace.prototype.attachExtraTrace = function(error) {
	    if (error.__stackCleaned__) return;
	    this.uncycle();
	    var parsed = parseStackAndMessage(error);
	    var message = parsed.message;
	    var stacks = [parsed.stack];

	    var trace = this;
	    while (trace !== undefined) {
	        stacks.push(cleanStack(trace.stack.split("\n")));
	        trace = trace._parent;
	    }
	    removeCommonRoots(stacks);
	    removeDuplicateOrEmptyJumps(stacks);
	    util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
	    util.notEnumerableProp(error, "__stackCleaned__", true);
	};

	var captureStackTrace = (function stackDetection() {
	    var v8stackFramePattern = /^\s*at\s*/;
	    var v8stackFormatter = function(stack, error) {
	        if (typeof stack === "string") return stack;

	        if (error.name !== undefined &&
	            error.message !== undefined) {
	            return error.toString();
	        }
	        return formatNonError(error);
	    };

	    if (typeof Error.stackTraceLimit === "number" &&
	        typeof Error.captureStackTrace === "function") {
	        Error.stackTraceLimit += 6;
	        stackFramePattern = v8stackFramePattern;
	        formatStack = v8stackFormatter;
	        var captureStackTrace = Error.captureStackTrace;

	        shouldIgnore = function(line) {
	            return bluebirdFramePattern.test(line);
	        };
	        return function(receiver, ignoreUntil) {
	            Error.stackTraceLimit += 6;
	            captureStackTrace(receiver, ignoreUntil);
	            Error.stackTraceLimit -= 6;
	        };
	    }
	    var err = new Error();

	    if (typeof err.stack === "string" &&
	        err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
	        stackFramePattern = /@/;
	        formatStack = v8stackFormatter;
	        indentStackFrames = true;
	        return function captureStackTrace(o) {
	            o.stack = new Error().stack;
	        };
	    }

	    var hasStackAfterThrow;
	    try { throw new Error(); }
	    catch(e) {
	        hasStackAfterThrow = ("stack" in e);
	    }
	    if (!("stack" in err) && hasStackAfterThrow &&
	        typeof Error.stackTraceLimit === "number") {
	        stackFramePattern = v8stackFramePattern;
	        formatStack = v8stackFormatter;
	        return function captureStackTrace(o) {
	            Error.stackTraceLimit += 6;
	            try { throw new Error(); }
	            catch(e) { o.stack = e.stack; }
	            Error.stackTraceLimit -= 6;
	        };
	    }

	    formatStack = function(stack, error) {
	        if (typeof stack === "string") return stack;

	        if ((typeof error === "object" ||
	            typeof error === "function") &&
	            error.name !== undefined &&
	            error.message !== undefined) {
	            return error.toString();
	        }
	        return formatNonError(error);
	    };

	    return null;

	})();

	if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
	    printWarning = function (message) {
	        console.warn(message);
	    };
	    if (util.isNode && process.stderr.isTTY) {
	        printWarning = function(message, isSoft) {
	            var color = isSoft ? "\u001b[33m" : "\u001b[31m";
	            console.warn(color + message + "\u001b[0m\n");
	        };
	    } else if (!util.isNode && typeof (new Error().stack) === "string") {
	        printWarning = function(message, isSoft) {
	            console.warn("%c" + message,
	                        isSoft ? "color: darkorange" : "color: red");
	        };
	    }
	}

	var config = {
	    warnings: warnings,
	    longStackTraces: false,
	    cancellation: false,
	    monitoring: false,
	    asyncHooks: false
	};

	if (longStackTraces) Promise.longStackTraces();

	return {
	    asyncHooks: function() {
	        return config.asyncHooks;
	    },
	    longStackTraces: function() {
	        return config.longStackTraces;
	    },
	    warnings: function() {
	        return config.warnings;
	    },
	    cancellation: function() {
	        return config.cancellation;
	    },
	    monitoring: function() {
	        return config.monitoring;
	    },
	    propagateFromFunction: function() {
	        return propagateFromFunction;
	    },
	    boundValueFunction: function() {
	        return boundValueFunction;
	    },
	    checkForgottenReturns: checkForgottenReturns,
	    setBounds: setBounds,
	    warn: warn,
	    deprecated: deprecated,
	    CapturedTrace: CapturedTrace,
	    fireDomEvent: fireDomEvent,
	    fireGlobalEvent: fireGlobalEvent
	};
	};

	},{"./errors":12,"./es5":13,"./util":36}],10:[function(_dereq_,module,exports){
	module.exports = function(Promise) {
	function returner() {
	    return this.value;
	}
	function thrower() {
	    throw this.reason;
	}

	Promise.prototype["return"] =
	Promise.prototype.thenReturn = function (value) {
	    if (value instanceof Promise) value.suppressUnhandledRejections();
	    return this._then(
	        returner, undefined, undefined, {value: value}, undefined);
	};

	Promise.prototype["throw"] =
	Promise.prototype.thenThrow = function (reason) {
	    return this._then(
	        thrower, undefined, undefined, {reason: reason}, undefined);
	};

	Promise.prototype.catchThrow = function (reason) {
	    if (arguments.length <= 1) {
	        return this._then(
	            undefined, thrower, undefined, {reason: reason}, undefined);
	    } else {
	        var _reason = arguments[1];
	        var handler = function() {throw _reason;};
	        return this.caught(reason, handler);
	    }
	};

	Promise.prototype.catchReturn = function (value) {
	    if (arguments.length <= 1) {
	        if (value instanceof Promise) value.suppressUnhandledRejections();
	        return this._then(
	            undefined, returner, undefined, {value: value}, undefined);
	    } else {
	        var _value = arguments[1];
	        if (_value instanceof Promise) _value.suppressUnhandledRejections();
	        var handler = function() {return _value;};
	        return this.caught(value, handler);
	    }
	};
	};

	},{}],11:[function(_dereq_,module,exports){
	module.exports = function(Promise, INTERNAL) {
	var PromiseReduce = Promise.reduce;
	var PromiseAll = Promise.all;

	function promiseAllThis() {
	    return PromiseAll(this);
	}

	function PromiseMapSeries(promises, fn) {
	    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
	}

	Promise.prototype.each = function (fn) {
	    return PromiseReduce(this, fn, INTERNAL, 0)
	              ._then(promiseAllThis, undefined, undefined, this, undefined);
	};

	Promise.prototype.mapSeries = function (fn) {
	    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
	};

	Promise.each = function (promises, fn) {
	    return PromiseReduce(promises, fn, INTERNAL, 0)
	              ._then(promiseAllThis, undefined, undefined, promises, undefined);
	};

	Promise.mapSeries = PromiseMapSeries;
	};


	},{}],12:[function(_dereq_,module,exports){
	var es5 = _dereq_("./es5");
	var Objectfreeze = es5.freeze;
	var util = _dereq_("./util");
	var inherits = util.inherits;
	var notEnumerableProp = util.notEnumerableProp;

	function subError(nameProperty, defaultMessage) {
	    function SubError(message) {
	        if (!(this instanceof SubError)) return new SubError(message);
	        notEnumerableProp(this, "message",
	            typeof message === "string" ? message : defaultMessage);
	        notEnumerableProp(this, "name", nameProperty);
	        if (Error.captureStackTrace) {
	            Error.captureStackTrace(this, this.constructor);
	        } else {
	            Error.call(this);
	        }
	    }
	    inherits(SubError, Error);
	    return SubError;
	}

	var _TypeError, _RangeError;
	var Warning = subError("Warning", "warning");
	var CancellationError = subError("CancellationError", "cancellation error");
	var TimeoutError = subError("TimeoutError", "timeout error");
	var AggregateError = subError("AggregateError", "aggregate error");
	try {
	    _TypeError = TypeError;
	    _RangeError = RangeError;
	} catch(e) {
	    _TypeError = subError("TypeError", "type error");
	    _RangeError = subError("RangeError", "range error");
	}

	var methods = ("join pop push shift unshift slice filter forEach some " +
	    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

	for (var i = 0; i < methods.length; ++i) {
	    if (typeof Array.prototype[methods[i]] === "function") {
	        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
	    }
	}

	es5.defineProperty(AggregateError.prototype, "length", {
	    value: 0,
	    configurable: false,
	    writable: true,
	    enumerable: true
	});
	AggregateError.prototype["isOperational"] = true;
	var level = 0;
	AggregateError.prototype.toString = function() {
	    var indent = Array(level * 4 + 1).join(" ");
	    var ret = "\n" + indent + "AggregateError of:" + "\n";
	    level++;
	    indent = Array(level * 4 + 1).join(" ");
	    for (var i = 0; i < this.length; ++i) {
	        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
	        var lines = str.split("\n");
	        for (var j = 0; j < lines.length; ++j) {
	            lines[j] = indent + lines[j];
	        }
	        str = lines.join("\n");
	        ret += str + "\n";
	    }
	    level--;
	    return ret;
	};

	function OperationalError(message) {
	    if (!(this instanceof OperationalError))
	        return new OperationalError(message);
	    notEnumerableProp(this, "name", "OperationalError");
	    notEnumerableProp(this, "message", message);
	    this.cause = message;
	    this["isOperational"] = true;

	    if (message instanceof Error) {
	        notEnumerableProp(this, "message", message.message);
	        notEnumerableProp(this, "stack", message.stack);
	    } else if (Error.captureStackTrace) {
	        Error.captureStackTrace(this, this.constructor);
	    }

	}
	inherits(OperationalError, Error);

	var errorTypes = Error["__BluebirdErrorTypes__"];
	if (!errorTypes) {
	    errorTypes = Objectfreeze({
	        CancellationError: CancellationError,
	        TimeoutError: TimeoutError,
	        OperationalError: OperationalError,
	        RejectionError: OperationalError,
	        AggregateError: AggregateError
	    });
	    es5.defineProperty(Error, "__BluebirdErrorTypes__", {
	        value: errorTypes,
	        writable: false,
	        enumerable: false,
	        configurable: false
	    });
	}

	module.exports = {
	    Error: Error,
	    TypeError: _TypeError,
	    RangeError: _RangeError,
	    CancellationError: errorTypes.CancellationError,
	    OperationalError: errorTypes.OperationalError,
	    TimeoutError: errorTypes.TimeoutError,
	    AggregateError: errorTypes.AggregateError,
	    Warning: Warning
	};

	},{"./es5":13,"./util":36}],13:[function(_dereq_,module,exports){
	var isES5 = (function(){
	    return this === undefined;
	})();

	if (isES5) {
	    module.exports = {
	        freeze: Object.freeze,
	        defineProperty: Object.defineProperty,
	        getDescriptor: Object.getOwnPropertyDescriptor,
	        keys: Object.keys,
	        names: Object.getOwnPropertyNames,
	        getPrototypeOf: Object.getPrototypeOf,
	        isArray: Array.isArray,
	        isES5: isES5,
	        propertyIsWritable: function(obj, prop) {
	            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
	            return !!(!descriptor || descriptor.writable || descriptor.set);
	        }
	    };
	} else {
	    var has = {}.hasOwnProperty;
	    var str = {}.toString;
	    var proto = {}.constructor.prototype;

	    var ObjectKeys = function (o) {
	        var ret = [];
	        for (var key in o) {
	            if (has.call(o, key)) {
	                ret.push(key);
	            }
	        }
	        return ret;
	    };

	    var ObjectGetDescriptor = function(o, key) {
	        return {value: o[key]};
	    };

	    var ObjectDefineProperty = function (o, key, desc) {
	        o[key] = desc.value;
	        return o;
	    };

	    var ObjectFreeze = function (obj) {
	        return obj;
	    };

	    var ObjectGetPrototypeOf = function (obj) {
	        try {
	            return Object(obj).constructor.prototype;
	        }
	        catch (e) {
	            return proto;
	        }
	    };

	    var ArrayIsArray = function (obj) {
	        try {
	            return str.call(obj) === "[object Array]";
	        }
	        catch(e) {
	            return false;
	        }
	    };

	    module.exports = {
	        isArray: ArrayIsArray,
	        keys: ObjectKeys,
	        names: ObjectKeys,
	        defineProperty: ObjectDefineProperty,
	        getDescriptor: ObjectGetDescriptor,
	        freeze: ObjectFreeze,
	        getPrototypeOf: ObjectGetPrototypeOf,
	        isES5: isES5,
	        propertyIsWritable: function() {
	            return true;
	        }
	    };
	}

	},{}],14:[function(_dereq_,module,exports){
	module.exports = function(Promise, INTERNAL) {
	var PromiseMap = Promise.map;

	Promise.prototype.filter = function (fn, options) {
	    return PromiseMap(this, fn, options, INTERNAL);
	};

	Promise.filter = function (promises, fn, options) {
	    return PromiseMap(promises, fn, options, INTERNAL);
	};
	};

	},{}],15:[function(_dereq_,module,exports){
	module.exports = function(Promise, tryConvertToPromise, NEXT_FILTER) {
	var util = _dereq_("./util");
	var CancellationError = Promise.CancellationError;
	var errorObj = util.errorObj;
	var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);

	function PassThroughHandlerContext(promise, type, handler) {
	    this.promise = promise;
	    this.type = type;
	    this.handler = handler;
	    this.called = false;
	    this.cancelPromise = null;
	}

	PassThroughHandlerContext.prototype.isFinallyHandler = function() {
	    return this.type === 0;
	};

	function FinallyHandlerCancelReaction(finallyHandler) {
	    this.finallyHandler = finallyHandler;
	}

	FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
	    checkCancel(this.finallyHandler);
	};

	function checkCancel(ctx, reason) {
	    if (ctx.cancelPromise != null) {
	        if (arguments.length > 1) {
	            ctx.cancelPromise._reject(reason);
	        } else {
	            ctx.cancelPromise._cancel();
	        }
	        ctx.cancelPromise = null;
	        return true;
	    }
	    return false;
	}

	function succeed() {
	    return finallyHandler.call(this, this.promise._target()._settledValue());
	}
	function fail(reason) {
	    if (checkCancel(this, reason)) return;
	    errorObj.e = reason;
	    return errorObj;
	}
	function finallyHandler(reasonOrValue) {
	    var promise = this.promise;
	    var handler = this.handler;

	    if (!this.called) {
	        this.called = true;
	        var ret = this.isFinallyHandler()
	            ? handler.call(promise._boundValue())
	            : handler.call(promise._boundValue(), reasonOrValue);
	        if (ret === NEXT_FILTER) {
	            return ret;
	        } else if (ret !== undefined) {
	            promise._setReturnedNonUndefined();
	            var maybePromise = tryConvertToPromise(ret, promise);
	            if (maybePromise instanceof Promise) {
	                if (this.cancelPromise != null) {
	                    if (maybePromise._isCancelled()) {
	                        var reason =
	                            new CancellationError("late cancellation observer");
	                        promise._attachExtraTrace(reason);
	                        errorObj.e = reason;
	                        return errorObj;
	                    } else if (maybePromise.isPending()) {
	                        maybePromise._attachCancellationCallback(
	                            new FinallyHandlerCancelReaction(this));
	                    }
	                }
	                return maybePromise._then(
	                    succeed, fail, undefined, this, undefined);
	            }
	        }
	    }

	    if (promise.isRejected()) {
	        checkCancel(this);
	        errorObj.e = reasonOrValue;
	        return errorObj;
	    } else {
	        checkCancel(this);
	        return reasonOrValue;
	    }
	}

	Promise.prototype._passThrough = function(handler, type, success, fail) {
	    if (typeof handler !== "function") return this.then();
	    return this._then(success,
	                      fail,
	                      undefined,
	                      new PassThroughHandlerContext(this, type, handler),
	                      undefined);
	};

	Promise.prototype.lastly =
	Promise.prototype["finally"] = function (handler) {
	    return this._passThrough(handler,
	                             0,
	                             finallyHandler,
	                             finallyHandler);
	};


	Promise.prototype.tap = function (handler) {
	    return this._passThrough(handler, 1, finallyHandler);
	};

	Promise.prototype.tapCatch = function (handlerOrPredicate) {
	    var len = arguments.length;
	    if(len === 1) {
	        return this._passThrough(handlerOrPredicate,
	                                 1,
	                                 undefined,
	                                 finallyHandler);
	    } else {
	         var catchInstances = new Array(len - 1),
	            j = 0, i;
	        for (i = 0; i < len - 1; ++i) {
	            var item = arguments[i];
	            if (util.isObject(item)) {
	                catchInstances[j++] = item;
	            } else {
	                return Promise.reject(new TypeError(
	                    "tapCatch statement predicate: "
	                    + "expecting an object but got " + util.classString(item)
	                ));
	            }
	        }
	        catchInstances.length = j;
	        var handler = arguments[i];
	        return this._passThrough(catchFilter(catchInstances, handler, this),
	                                 1,
	                                 undefined,
	                                 finallyHandler);
	    }

	};

	return PassThroughHandlerContext;
	};

	},{"./catch_filter":7,"./util":36}],16:[function(_dereq_,module,exports){
	module.exports = function(Promise,
	                          apiRejection,
	                          INTERNAL,
	                          tryConvertToPromise,
	                          Proxyable,
	                          debug) {
	var errors = _dereq_("./errors");
	var TypeError = errors.TypeError;
	var util = _dereq_("./util");
	var errorObj = util.errorObj;
	var tryCatch = util.tryCatch;
	var yieldHandlers = [];

	function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
	    for (var i = 0; i < yieldHandlers.length; ++i) {
	        traceParent._pushContext();
	        var result = tryCatch(yieldHandlers[i])(value);
	        traceParent._popContext();
	        if (result === errorObj) {
	            traceParent._pushContext();
	            var ret = Promise.reject(errorObj.e);
	            traceParent._popContext();
	            return ret;
	        }
	        var maybePromise = tryConvertToPromise(result, traceParent);
	        if (maybePromise instanceof Promise) return maybePromise;
	    }
	    return null;
	}

	function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
	    if (debug.cancellation()) {
	        var internal = new Promise(INTERNAL);
	        var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
	        this._promise = internal.lastly(function() {
	            return _finallyPromise;
	        });
	        internal._captureStackTrace();
	        internal._setOnCancel(this);
	    } else {
	        var promise = this._promise = new Promise(INTERNAL);
	        promise._captureStackTrace();
	    }
	    this._stack = stack;
	    this._generatorFunction = generatorFunction;
	    this._receiver = receiver;
	    this._generator = undefined;
	    this._yieldHandlers = typeof yieldHandler === "function"
	        ? [yieldHandler].concat(yieldHandlers)
	        : yieldHandlers;
	    this._yieldedPromise = null;
	    this._cancellationPhase = false;
	}
	util.inherits(PromiseSpawn, Proxyable);

	PromiseSpawn.prototype._isResolved = function() {
	    return this._promise === null;
	};

	PromiseSpawn.prototype._cleanup = function() {
	    this._promise = this._generator = null;
	    if (debug.cancellation() && this._finallyPromise !== null) {
	        this._finallyPromise._fulfill();
	        this._finallyPromise = null;
	    }
	};

	PromiseSpawn.prototype._promiseCancelled = function() {
	    if (this._isResolved()) return;
	    var implementsReturn = typeof this._generator["return"] !== "undefined";

	    var result;
	    if (!implementsReturn) {
	        var reason = new Promise.CancellationError(
	            "generator .return() sentinel");
	        Promise.coroutine.returnSentinel = reason;
	        this._promise._attachExtraTrace(reason);
	        this._promise._pushContext();
	        result = tryCatch(this._generator["throw"]).call(this._generator,
	                                                         reason);
	        this._promise._popContext();
	    } else {
	        this._promise._pushContext();
	        result = tryCatch(this._generator["return"]).call(this._generator,
	                                                          undefined);
	        this._promise._popContext();
	    }
	    this._cancellationPhase = true;
	    this._yieldedPromise = null;
	    this._continue(result);
	};

	PromiseSpawn.prototype._promiseFulfilled = function(value) {
	    this._yieldedPromise = null;
	    this._promise._pushContext();
	    var result = tryCatch(this._generator.next).call(this._generator, value);
	    this._promise._popContext();
	    this._continue(result);
	};

	PromiseSpawn.prototype._promiseRejected = function(reason) {
	    this._yieldedPromise = null;
	    this._promise._attachExtraTrace(reason);
	    this._promise._pushContext();
	    var result = tryCatch(this._generator["throw"])
	        .call(this._generator, reason);
	    this._promise._popContext();
	    this._continue(result);
	};

	PromiseSpawn.prototype._resultCancelled = function() {
	    if (this._yieldedPromise instanceof Promise) {
	        var promise = this._yieldedPromise;
	        this._yieldedPromise = null;
	        promise.cancel();
	    }
	};

	PromiseSpawn.prototype.promise = function () {
	    return this._promise;
	};

	PromiseSpawn.prototype._run = function () {
	    this._generator = this._generatorFunction.call(this._receiver);
	    this._receiver =
	        this._generatorFunction = undefined;
	    this._promiseFulfilled(undefined);
	};

	PromiseSpawn.prototype._continue = function (result) {
	    var promise = this._promise;
	    if (result === errorObj) {
	        this._cleanup();
	        if (this._cancellationPhase) {
	            return promise.cancel();
	        } else {
	            return promise._rejectCallback(result.e, false);
	        }
	    }

	    var value = result.value;
	    if (result.done === true) {
	        this._cleanup();
	        if (this._cancellationPhase) {
	            return promise.cancel();
	        } else {
	            return promise._resolveCallback(value);
	        }
	    } else {
	        var maybePromise = tryConvertToPromise(value, this._promise);
	        if (!(maybePromise instanceof Promise)) {
	            maybePromise =
	                promiseFromYieldHandler(maybePromise,
	                                        this._yieldHandlers,
	                                        this._promise);
	            if (maybePromise === null) {
	                this._promiseRejected(
	                    new TypeError(
	                        "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", String(value)) +
	                        "From coroutine:\u000a" +
	                        this._stack.split("\n").slice(1, -7).join("\n")
	                    )
	                );
	                return;
	            }
	        }
	        maybePromise = maybePromise._target();
	        var bitField = maybePromise._bitField;
	        if (((bitField & 50397184) === 0)) {
	            this._yieldedPromise = maybePromise;
	            maybePromise._proxy(this, null);
	        } else if (((bitField & 33554432) !== 0)) {
	            Promise._async.invoke(
	                this._promiseFulfilled, this, maybePromise._value()
	            );
	        } else if (((bitField & 16777216) !== 0)) {
	            Promise._async.invoke(
	                this._promiseRejected, this, maybePromise._reason()
	            );
	        } else {
	            this._promiseCancelled();
	        }
	    }
	};

	Promise.coroutine = function (generatorFunction, options) {
	    if (typeof generatorFunction !== "function") {
	        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    var yieldHandler = Object(options).yieldHandler;
	    var PromiseSpawn$ = PromiseSpawn;
	    var stack = new Error().stack;
	    return function () {
	        var generator = generatorFunction.apply(this, arguments);
	        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
	                                      stack);
	        var ret = spawn.promise();
	        spawn._generator = generator;
	        spawn._promiseFulfilled(undefined);
	        return ret;
	    };
	};

	Promise.coroutine.addYieldHandler = function(fn) {
	    if (typeof fn !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(fn));
	    }
	    yieldHandlers.push(fn);
	};

	Promise.spawn = function (generatorFunction) {
	    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
	    if (typeof generatorFunction !== "function") {
	        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    var spawn = new PromiseSpawn(generatorFunction, this);
	    var ret = spawn.promise();
	    spawn._run(Promise.spawn);
	    return ret;
	};
	};

	},{"./errors":12,"./util":36}],17:[function(_dereq_,module,exports){
	module.exports =
	function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async) {
	var util = _dereq_("./util");
	var canEvaluate = util.canEvaluate;
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;

	Promise.join = function () {
	    var last = arguments.length - 1;
	    var fn;
	    if (last > 0 && typeof arguments[last] === "function") {
	        fn = arguments[last];
	        var ret; 
	    }
	    var args = [].slice.call(arguments);    if (fn) args.pop();
	    var ret = new PromiseArray(args).promise();
	    return fn !== undefined ? ret.spread(fn) : ret;
	};

	};

	},{"./util":36}],18:[function(_dereq_,module,exports){
	module.exports = function(Promise,
	                          PromiseArray,
	                          apiRejection,
	                          tryConvertToPromise,
	                          INTERNAL,
	                          debug) {
	var util = _dereq_("./util");
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	var async = Promise._async;

	function MappingPromiseArray(promises, fn, limit, _filter) {
	    this.constructor$(promises);
	    this._promise._captureStackTrace();
	    var context = Promise._getContext();
	    this._callback = util.contextBind(context, fn);
	    this._preservedValues = _filter === INTERNAL
	        ? new Array(this.length())
	        : null;
	    this._limit = limit;
	    this._inFlight = 0;
	    this._queue = [];
	    async.invoke(this._asyncInit, this, undefined);
	    if (util.isArray(promises)) {
	        for (var i = 0; i < promises.length; ++i) {
	            var maybePromise = promises[i];
	            if (maybePromise instanceof Promise) {
	                maybePromise.suppressUnhandledRejections();
	            }
	        }
	    }
	}
	util.inherits(MappingPromiseArray, PromiseArray);

	MappingPromiseArray.prototype._asyncInit = function() {
	    this._init$(undefined, -2);
	};

	MappingPromiseArray.prototype._init = function () {};

	MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    var values = this._values;
	    var length = this.length();
	    var preservedValues = this._preservedValues;
	    var limit = this._limit;

	    if (index < 0) {
	        index = (index * -1) - 1;
	        values[index] = value;
	        if (limit >= 1) {
	            this._inFlight--;
	            this._drainQueue();
	            if (this._isResolved()) return true;
	        }
	    } else {
	        if (limit >= 1 && this._inFlight >= limit) {
	            values[index] = value;
	            this._queue.push(index);
	            return false;
	        }
	        if (preservedValues !== null) preservedValues[index] = value;

	        var promise = this._promise;
	        var callback = this._callback;
	        var receiver = promise._boundValue();
	        promise._pushContext();
	        var ret = tryCatch(callback).call(receiver, value, index, length);
	        var promiseCreated = promise._popContext();
	        debug.checkForgottenReturns(
	            ret,
	            promiseCreated,
	            preservedValues !== null ? "Promise.filter" : "Promise.map",
	            promise
	        );
	        if (ret === errorObj) {
	            this._reject(ret.e);
	            return true;
	        }

	        var maybePromise = tryConvertToPromise(ret, this._promise);
	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            var bitField = maybePromise._bitField;
	            if (((bitField & 50397184) === 0)) {
	                if (limit >= 1) this._inFlight++;
	                values[index] = maybePromise;
	                maybePromise._proxy(this, (index + 1) * -1);
	                return false;
	            } else if (((bitField & 33554432) !== 0)) {
	                ret = maybePromise._value();
	            } else if (((bitField & 16777216) !== 0)) {
	                this._reject(maybePromise._reason());
	                return true;
	            } else {
	                this._cancel();
	                return true;
	            }
	        }
	        values[index] = ret;
	    }
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= length) {
	        if (preservedValues !== null) {
	            this._filter(values, preservedValues);
	        } else {
	            this._resolve(values);
	        }
	        return true;
	    }
	    return false;
	};

	MappingPromiseArray.prototype._drainQueue = function () {
	    var queue = this._queue;
	    var limit = this._limit;
	    var values = this._values;
	    while (queue.length > 0 && this._inFlight < limit) {
	        if (this._isResolved()) return;
	        var index = queue.pop();
	        this._promiseFulfilled(values[index], index);
	    }
	};

	MappingPromiseArray.prototype._filter = function (booleans, values) {
	    var len = values.length;
	    var ret = new Array(len);
	    var j = 0;
	    for (var i = 0; i < len; ++i) {
	        if (booleans[i]) ret[j++] = values[i];
	    }
	    ret.length = j;
	    this._resolve(ret);
	};

	MappingPromiseArray.prototype.preservedValues = function () {
	    return this._preservedValues;
	};

	function map(promises, fn, options, _filter) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }

	    var limit = 0;
	    if (options !== undefined) {
	        if (typeof options === "object" && options !== null) {
	            if (typeof options.concurrency !== "number") {
	                return Promise.reject(
	                    new TypeError("'concurrency' must be a number but it is " +
	                                    util.classString(options.concurrency)));
	            }
	            limit = options.concurrency;
	        } else {
	            return Promise.reject(new TypeError(
	                            "options argument must be an object but it is " +
	                             util.classString(options)));
	        }
	    }
	    limit = typeof limit === "number" &&
	        isFinite(limit) && limit >= 1 ? limit : 0;
	    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
	}

	Promise.prototype.map = function (fn, options) {
	    return map(this, fn, options, null);
	};

	Promise.map = function (promises, fn, options, _filter) {
	    return map(promises, fn, options, _filter);
	};


	};

	},{"./util":36}],19:[function(_dereq_,module,exports){
	module.exports =
	function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
	var util = _dereq_("./util");
	var tryCatch = util.tryCatch;

	Promise.method = function (fn) {
	    if (typeof fn !== "function") {
	        throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
	    }
	    return function () {
	        var ret = new Promise(INTERNAL);
	        ret._captureStackTrace();
	        ret._pushContext();
	        var value = tryCatch(fn).apply(this, arguments);
	        var promiseCreated = ret._popContext();
	        debug.checkForgottenReturns(
	            value, promiseCreated, "Promise.method", ret);
	        ret._resolveFromSyncValue(value);
	        return ret;
	    };
	};

	Promise.attempt = Promise["try"] = function (fn) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    var ret = new Promise(INTERNAL);
	    ret._captureStackTrace();
	    ret._pushContext();
	    var value;
	    if (arguments.length > 1) {
	        debug.deprecated("calling Promise.try with more than 1 argument");
	        var arg = arguments[1];
	        var ctx = arguments[2];
	        value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
	                                  : tryCatch(fn).call(ctx, arg);
	    } else {
	        value = tryCatch(fn)();
	    }
	    var promiseCreated = ret._popContext();
	    debug.checkForgottenReturns(
	        value, promiseCreated, "Promise.try", ret);
	    ret._resolveFromSyncValue(value);
	    return ret;
	};

	Promise.prototype._resolveFromSyncValue = function (value) {
	    if (value === util.errorObj) {
	        this._rejectCallback(value.e, false);
	    } else {
	        this._resolveCallback(value, true);
	    }
	};
	};

	},{"./util":36}],20:[function(_dereq_,module,exports){
	var util = _dereq_("./util");
	var maybeWrapAsError = util.maybeWrapAsError;
	var errors = _dereq_("./errors");
	var OperationalError = errors.OperationalError;
	var es5 = _dereq_("./es5");

	function isUntypedError(obj) {
	    return obj instanceof Error &&
	        es5.getPrototypeOf(obj) === Error.prototype;
	}

	var rErrorKey = /^(?:name|message|stack|cause)$/;
	function wrapAsOperationalError(obj) {
	    var ret;
	    if (isUntypedError(obj)) {
	        ret = new OperationalError(obj);
	        ret.name = obj.name;
	        ret.message = obj.message;
	        ret.stack = obj.stack;
	        var keys = es5.keys(obj);
	        for (var i = 0; i < keys.length; ++i) {
	            var key = keys[i];
	            if (!rErrorKey.test(key)) {
	                ret[key] = obj[key];
	            }
	        }
	        return ret;
	    }
	    util.markAsOriginatingFromRejection(obj);
	    return obj;
	}

	function nodebackForPromise(promise, multiArgs) {
	    return function(err, value) {
	        if (promise === null) return;
	        if (err) {
	            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
	            promise._attachExtraTrace(wrapped);
	            promise._reject(wrapped);
	        } else if (!multiArgs) {
	            promise._fulfill(value);
	        } else {
	            var args = [].slice.call(arguments, 1);            promise._fulfill(args);
	        }
	        promise = null;
	    };
	}

	module.exports = nodebackForPromise;

	},{"./errors":12,"./es5":13,"./util":36}],21:[function(_dereq_,module,exports){
	module.exports = function(Promise) {
	var util = _dereq_("./util");
	var async = Promise._async;
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;

	function spreadAdapter(val, nodeback) {
	    var promise = this;
	    if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
	    var ret =
	        tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}

	function successAdapter(val, nodeback) {
	    var promise = this;
	    var receiver = promise._boundValue();
	    var ret = val === undefined
	        ? tryCatch(nodeback).call(receiver, null)
	        : tryCatch(nodeback).call(receiver, null, val);
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}
	function errorAdapter(reason, nodeback) {
	    var promise = this;
	    if (!reason) {
	        var newReason = new Error(reason + "");
	        newReason.cause = reason;
	        reason = newReason;
	    }
	    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}

	Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
	                                                                     options) {
	    if (typeof nodeback == "function") {
	        var adapter = successAdapter;
	        if (options !== undefined && Object(options).spread) {
	            adapter = spreadAdapter;
	        }
	        this._then(
	            adapter,
	            errorAdapter,
	            undefined,
	            this,
	            nodeback
	        );
	    }
	    return this;
	};
	};

	},{"./util":36}],22:[function(_dereq_,module,exports){
	module.exports = function() {
	var makeSelfResolutionError = function () {
	    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	};
	var reflectHandler = function() {
	    return new Promise.PromiseInspection(this._target());
	};
	var apiRejection = function(msg) {
	    return Promise.reject(new TypeError(msg));
	};
	function Proxyable() {}
	var UNDEFINED_BINDING = {};
	var util = _dereq_("./util");
	util.setReflectHandler(reflectHandler);

	var getDomain = function() {
	    var domain = process.domain;
	    if (domain === undefined) {
	        return null;
	    }
	    return domain;
	};
	var getContextDefault = function() {
	    return null;
	};
	var getContextDomain = function() {
	    return {
	        domain: getDomain(),
	        async: null
	    };
	};
	var AsyncResource = util.isNode && util.nodeSupportsAsyncResource ?
	    _dereq_("async_hooks").AsyncResource : null;
	var getContextAsyncHooks = function() {
	    return {
	        domain: getDomain(),
	        async: new AsyncResource("Bluebird::Promise")
	    };
	};
	var getContext = util.isNode ? getContextDomain : getContextDefault;
	util.notEnumerableProp(Promise, "_getContext", getContext);
	var enableAsyncHooks = function() {
	    getContext = getContextAsyncHooks;
	    util.notEnumerableProp(Promise, "_getContext", getContextAsyncHooks);
	};
	var disableAsyncHooks = function() {
	    getContext = getContextDomain;
	    util.notEnumerableProp(Promise, "_getContext", getContextDomain);
	};

	var es5 = _dereq_("./es5");
	var Async = _dereq_("./async");
	var async = new Async();
	es5.defineProperty(Promise, "_async", {value: async});
	var errors = _dereq_("./errors");
	var TypeError = Promise.TypeError = errors.TypeError;
	Promise.RangeError = errors.RangeError;
	var CancellationError = Promise.CancellationError = errors.CancellationError;
	Promise.TimeoutError = errors.TimeoutError;
	Promise.OperationalError = errors.OperationalError;
	Promise.RejectionError = errors.OperationalError;
	Promise.AggregateError = errors.AggregateError;
	var INTERNAL = function(){};
	var APPLY = {};
	var NEXT_FILTER = {};
	var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);
	var PromiseArray =
	    _dereq_("./promise_array")(Promise, INTERNAL,
	                               tryConvertToPromise, apiRejection, Proxyable);
	var Context = _dereq_("./context")(Promise);
	 /*jshint unused:false*/
	var createContext = Context.create;

	var debug = _dereq_("./debuggability")(Promise, Context,
	    enableAsyncHooks, disableAsyncHooks);
	var CapturedTrace = debug.CapturedTrace;
	var PassThroughHandlerContext =
	    _dereq_("./finally")(Promise, tryConvertToPromise, NEXT_FILTER);
	var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);
	var nodebackForPromise = _dereq_("./nodeback");
	var errorObj = util.errorObj;
	var tryCatch = util.tryCatch;
	function check(self, executor) {
	    if (self == null || self.constructor !== Promise) {
	        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    if (typeof executor !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(executor));
	    }

	}

	function Promise(executor) {
	    if (executor !== INTERNAL) {
	        check(this, executor);
	    }
	    this._bitField = 0;
	    this._fulfillmentHandler0 = undefined;
	    this._rejectionHandler0 = undefined;
	    this._promise0 = undefined;
	    this._receiver0 = undefined;
	    this._resolveFromExecutor(executor);
	    this._promiseCreated();
	    this._fireEvent("promiseCreated", this);
	}

	Promise.prototype.toString = function () {
	    return "[object Promise]";
	};

	Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
	    var len = arguments.length;
	    if (len > 1) {
	        var catchInstances = new Array(len - 1),
	            j = 0, i;
	        for (i = 0; i < len - 1; ++i) {
	            var item = arguments[i];
	            if (util.isObject(item)) {
	                catchInstances[j++] = item;
	            } else {
	                return apiRejection("Catch statement predicate: " +
	                    "expecting an object but got " + util.classString(item));
	            }
	        }
	        catchInstances.length = j;
	        fn = arguments[i];

	        if (typeof fn !== "function") {
	            throw new TypeError("The last argument to .catch() " +
	                "must be a function, got " + util.toString(fn));
	        }
	        return this.then(undefined, catchFilter(catchInstances, fn, this));
	    }
	    return this.then(undefined, fn);
	};

	Promise.prototype.reflect = function () {
	    return this._then(reflectHandler,
	        reflectHandler, undefined, this, undefined);
	};

	Promise.prototype.then = function (didFulfill, didReject) {
	    if (debug.warnings() && arguments.length > 0 &&
	        typeof didFulfill !== "function" &&
	        typeof didReject !== "function") {
	        var msg = ".then() only accepts functions but was passed: " +
	                util.classString(didFulfill);
	        if (arguments.length > 1) {
	            msg += ", " + util.classString(didReject);
	        }
	        this._warn(msg);
	    }
	    return this._then(didFulfill, didReject, undefined, undefined, undefined);
	};

	Promise.prototype.done = function (didFulfill, didReject) {
	    var promise =
	        this._then(didFulfill, didReject, undefined, undefined, undefined);
	    promise._setIsFinal();
	};

	Promise.prototype.spread = function (fn) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
	};

	Promise.prototype.toJSON = function () {
	    var ret = {
	        isFulfilled: false,
	        isRejected: false,
	        fulfillmentValue: undefined,
	        rejectionReason: undefined
	    };
	    if (this.isFulfilled()) {
	        ret.fulfillmentValue = this.value();
	        ret.isFulfilled = true;
	    } else if (this.isRejected()) {
	        ret.rejectionReason = this.reason();
	        ret.isRejected = true;
	    }
	    return ret;
	};

	Promise.prototype.all = function () {
	    if (arguments.length > 0) {
	        this._warn(".all() was passed arguments but it does not take any");
	    }
	    return new PromiseArray(this).promise();
	};

	Promise.prototype.error = function (fn) {
	    return this.caught(util.originatesFromRejection, fn);
	};

	Promise.getNewLibraryCopy = module.exports;

	Promise.is = function (val) {
	    return val instanceof Promise;
	};

	Promise.fromNode = Promise.fromCallback = function(fn) {
	    var ret = new Promise(INTERNAL);
	    ret._captureStackTrace();
	    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
	                                         : false;
	    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
	    if (result === errorObj) {
	        ret._rejectCallback(result.e, true);
	    }
	    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
	    return ret;
	};

	Promise.all = function (promises) {
	    return new PromiseArray(promises).promise();
	};

	Promise.cast = function (obj) {
	    var ret = tryConvertToPromise(obj);
	    if (!(ret instanceof Promise)) {
	        ret = new Promise(INTERNAL);
	        ret._captureStackTrace();
	        ret._setFulfilled();
	        ret._rejectionHandler0 = obj;
	    }
	    return ret;
	};

	Promise.resolve = Promise.fulfilled = Promise.cast;

	Promise.reject = Promise.rejected = function (reason) {
	    var ret = new Promise(INTERNAL);
	    ret._captureStackTrace();
	    ret._rejectCallback(reason, true);
	    return ret;
	};

	Promise.setScheduler = function(fn) {
	    if (typeof fn !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(fn));
	    }
	    return async.setScheduler(fn);
	};

	Promise.prototype._then = function (
	    didFulfill,
	    didReject,
	    _,    receiver,
	    internalData
	) {
	    var haveInternalData = internalData !== undefined;
	    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
	    var target = this._target();
	    var bitField = target._bitField;

	    if (!haveInternalData) {
	        promise._propagateFrom(this, 3);
	        promise._captureStackTrace();
	        if (receiver === undefined &&
	            ((this._bitField & 2097152) !== 0)) {
	            if (!((bitField & 50397184) === 0)) {
	                receiver = this._boundValue();
	            } else {
	                receiver = target === this ? undefined : this._boundTo;
	            }
	        }
	        this._fireEvent("promiseChained", this, promise);
	    }

	    var context = getContext();
	    if (!((bitField & 50397184) === 0)) {
	        var handler, value, settler = target._settlePromiseCtx;
	        if (((bitField & 33554432) !== 0)) {
	            value = target._rejectionHandler0;
	            handler = didFulfill;
	        } else if (((bitField & 16777216) !== 0)) {
	            value = target._fulfillmentHandler0;
	            handler = didReject;
	            target._unsetRejectionIsUnhandled();
	        } else {
	            settler = target._settlePromiseLateCancellationObserver;
	            value = new CancellationError("late cancellation observer");
	            target._attachExtraTrace(value);
	            handler = didReject;
	        }

	        async.invoke(settler, target, {
	            handler: util.contextBind(context, handler),
	            promise: promise,
	            receiver: receiver,
	            value: value
	        });
	    } else {
	        target._addCallbacks(didFulfill, didReject, promise,
	                receiver, context);
	    }

	    return promise;
	};

	Promise.prototype._length = function () {
	    return this._bitField & 65535;
	};

	Promise.prototype._isFateSealed = function () {
	    return (this._bitField & 117506048) !== 0;
	};

	Promise.prototype._isFollowing = function () {
	    return (this._bitField & 67108864) === 67108864;
	};

	Promise.prototype._setLength = function (len) {
	    this._bitField = (this._bitField & -65536) |
	        (len & 65535);
	};

	Promise.prototype._setFulfilled = function () {
	    this._bitField = this._bitField | 33554432;
	    this._fireEvent("promiseFulfilled", this);
	};

	Promise.prototype._setRejected = function () {
	    this._bitField = this._bitField | 16777216;
	    this._fireEvent("promiseRejected", this);
	};

	Promise.prototype._setFollowing = function () {
	    this._bitField = this._bitField | 67108864;
	    this._fireEvent("promiseResolved", this);
	};

	Promise.prototype._setIsFinal = function () {
	    this._bitField = this._bitField | 4194304;
	};

	Promise.prototype._isFinal = function () {
	    return (this._bitField & 4194304) > 0;
	};

	Promise.prototype._unsetCancelled = function() {
	    this._bitField = this._bitField & (~65536);
	};

	Promise.prototype._setCancelled = function() {
	    this._bitField = this._bitField | 65536;
	    this._fireEvent("promiseCancelled", this);
	};

	Promise.prototype._setWillBeCancelled = function() {
	    this._bitField = this._bitField | 8388608;
	};

	Promise.prototype._setAsyncGuaranteed = function() {
	    if (async.hasCustomScheduler()) return;
	    var bitField = this._bitField;
	    this._bitField = bitField |
	        (((bitField & 536870912) >> 2) ^
	        134217728);
	};

	Promise.prototype._setNoAsyncGuarantee = function() {
	    this._bitField = (this._bitField | 536870912) &
	        (~134217728);
	};

	Promise.prototype._receiverAt = function (index) {
	    var ret = index === 0 ? this._receiver0 : this[
	            index * 4 - 4 + 3];
	    if (ret === UNDEFINED_BINDING) {
	        return undefined;
	    } else if (ret === undefined && this._isBound()) {
	        return this._boundValue();
	    }
	    return ret;
	};

	Promise.prototype._promiseAt = function (index) {
	    return this[
	            index * 4 - 4 + 2];
	};

	Promise.prototype._fulfillmentHandlerAt = function (index) {
	    return this[
	            index * 4 - 4 + 0];
	};

	Promise.prototype._rejectionHandlerAt = function (index) {
	    return this[
	            index * 4 - 4 + 1];
	};

	Promise.prototype._boundValue = function() {};

	Promise.prototype._migrateCallback0 = function (follower) {
	    var bitField = follower._bitField;
	    var fulfill = follower._fulfillmentHandler0;
	    var reject = follower._rejectionHandler0;
	    var promise = follower._promise0;
	    var receiver = follower._receiverAt(0);
	    if (receiver === undefined) receiver = UNDEFINED_BINDING;
	    this._addCallbacks(fulfill, reject, promise, receiver, null);
	};

	Promise.prototype._migrateCallbackAt = function (follower, index) {
	    var fulfill = follower._fulfillmentHandlerAt(index);
	    var reject = follower._rejectionHandlerAt(index);
	    var promise = follower._promiseAt(index);
	    var receiver = follower._receiverAt(index);
	    if (receiver === undefined) receiver = UNDEFINED_BINDING;
	    this._addCallbacks(fulfill, reject, promise, receiver, null);
	};

	Promise.prototype._addCallbacks = function (
	    fulfill,
	    reject,
	    promise,
	    receiver,
	    context
	) {
	    var index = this._length();

	    if (index >= 65535 - 4) {
	        index = 0;
	        this._setLength(0);
	    }

	    if (index === 0) {
	        this._promise0 = promise;
	        this._receiver0 = receiver;
	        if (typeof fulfill === "function") {
	            this._fulfillmentHandler0 = util.contextBind(context, fulfill);
	        }
	        if (typeof reject === "function") {
	            this._rejectionHandler0 = util.contextBind(context, reject);
	        }
	    } else {
	        var base = index * 4 - 4;
	        this[base + 2] = promise;
	        this[base + 3] = receiver;
	        if (typeof fulfill === "function") {
	            this[base + 0] =
	                util.contextBind(context, fulfill);
	        }
	        if (typeof reject === "function") {
	            this[base + 1] =
	                util.contextBind(context, reject);
	        }
	    }
	    this._setLength(index + 1);
	    return index;
	};

	Promise.prototype._proxy = function (proxyable, arg) {
	    this._addCallbacks(undefined, undefined, arg, proxyable, null);
	};

	Promise.prototype._resolveCallback = function(value, shouldBind) {
	    if (((this._bitField & 117506048) !== 0)) return;
	    if (value === this)
	        return this._rejectCallback(makeSelfResolutionError(), false);
	    var maybePromise = tryConvertToPromise(value, this);
	    if (!(maybePromise instanceof Promise)) return this._fulfill(value);

	    if (shouldBind) this._propagateFrom(maybePromise, 2);


	    var promise = maybePromise._target();

	    if (promise === this) {
	        this._reject(makeSelfResolutionError());
	        return;
	    }

	    var bitField = promise._bitField;
	    if (((bitField & 50397184) === 0)) {
	        var len = this._length();
	        if (len > 0) promise._migrateCallback0(this);
	        for (var i = 1; i < len; ++i) {
	            promise._migrateCallbackAt(this, i);
	        }
	        this._setFollowing();
	        this._setLength(0);
	        this._setFollowee(maybePromise);
	    } else if (((bitField & 33554432) !== 0)) {
	        this._fulfill(promise._value());
	    } else if (((bitField & 16777216) !== 0)) {
	        this._reject(promise._reason());
	    } else {
	        var reason = new CancellationError("late cancellation observer");
	        promise._attachExtraTrace(reason);
	        this._reject(reason);
	    }
	};

	Promise.prototype._rejectCallback =
	function(reason, synchronous, ignoreNonErrorWarnings) {
	    var trace = util.ensureErrorObject(reason);
	    var hasStack = trace === reason;
	    if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
	        var message = "a promise was rejected with a non-error: " +
	            util.classString(reason);
	        this._warn(message, true);
	    }
	    this._attachExtraTrace(trace, synchronous ? hasStack : false);
	    this._reject(reason);
	};

	Promise.prototype._resolveFromExecutor = function (executor) {
	    if (executor === INTERNAL) return;
	    var promise = this;
	    this._captureStackTrace();
	    this._pushContext();
	    var synchronous = true;
	    var r = this._execute(executor, function(value) {
	        promise._resolveCallback(value);
	    }, function (reason) {
	        promise._rejectCallback(reason, synchronous);
	    });
	    synchronous = false;
	    this._popContext();

	    if (r !== undefined) {
	        promise._rejectCallback(r, true);
	    }
	};

	Promise.prototype._settlePromiseFromHandler = function (
	    handler, receiver, value, promise
	) {
	    var bitField = promise._bitField;
	    if (((bitField & 65536) !== 0)) return;
	    promise._pushContext();
	    var x;
	    if (receiver === APPLY) {
	        if (!value || typeof value.length !== "number") {
	            x = errorObj;
	            x.e = new TypeError("cannot .spread() a non-array: " +
	                                    util.classString(value));
	        } else {
	            x = tryCatch(handler).apply(this._boundValue(), value);
	        }
	    } else {
	        x = tryCatch(handler).call(receiver, value);
	    }
	    var promiseCreated = promise._popContext();
	    bitField = promise._bitField;
	    if (((bitField & 65536) !== 0)) return;

	    if (x === NEXT_FILTER) {
	        promise._reject(value);
	    } else if (x === errorObj) {
	        promise._rejectCallback(x.e, false);
	    } else {
	        debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
	        promise._resolveCallback(x);
	    }
	};

	Promise.prototype._target = function() {
	    var ret = this;
	    while (ret._isFollowing()) ret = ret._followee();
	    return ret;
	};

	Promise.prototype._followee = function() {
	    return this._rejectionHandler0;
	};

	Promise.prototype._setFollowee = function(promise) {
	    this._rejectionHandler0 = promise;
	};

	Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
	    var isPromise = promise instanceof Promise;
	    var bitField = this._bitField;
	    var asyncGuaranteed = ((bitField & 134217728) !== 0);
	    if (((bitField & 65536) !== 0)) {
	        if (isPromise) promise._invokeInternalOnCancel();

	        if (receiver instanceof PassThroughHandlerContext &&
	            receiver.isFinallyHandler()) {
	            receiver.cancelPromise = promise;
	            if (tryCatch(handler).call(receiver, value) === errorObj) {
	                promise._reject(errorObj.e);
	            }
	        } else if (handler === reflectHandler) {
	            promise._fulfill(reflectHandler.call(receiver));
	        } else if (receiver instanceof Proxyable) {
	            receiver._promiseCancelled(promise);
	        } else if (isPromise || promise instanceof PromiseArray) {
	            promise._cancel();
	        } else {
	            receiver.cancel();
	        }
	    } else if (typeof handler === "function") {
	        if (!isPromise) {
	            handler.call(receiver, value, promise);
	        } else {
	            if (asyncGuaranteed) promise._setAsyncGuaranteed();
	            this._settlePromiseFromHandler(handler, receiver, value, promise);
	        }
	    } else if (receiver instanceof Proxyable) {
	        if (!receiver._isResolved()) {
	            if (((bitField & 33554432) !== 0)) {
	                receiver._promiseFulfilled(value, promise);
	            } else {
	                receiver._promiseRejected(value, promise);
	            }
	        }
	    } else if (isPromise) {
	        if (asyncGuaranteed) promise._setAsyncGuaranteed();
	        if (((bitField & 33554432) !== 0)) {
	            promise._fulfill(value);
	        } else {
	            promise._reject(value);
	        }
	    }
	};

	Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
	    var handler = ctx.handler;
	    var promise = ctx.promise;
	    var receiver = ctx.receiver;
	    var value = ctx.value;
	    if (typeof handler === "function") {
	        if (!(promise instanceof Promise)) {
	            handler.call(receiver, value, promise);
	        } else {
	            this._settlePromiseFromHandler(handler, receiver, value, promise);
	        }
	    } else if (promise instanceof Promise) {
	        promise._reject(value);
	    }
	};

	Promise.prototype._settlePromiseCtx = function(ctx) {
	    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
	};

	Promise.prototype._settlePromise0 = function(handler, value, bitField) {
	    var promise = this._promise0;
	    var receiver = this._receiverAt(0);
	    this._promise0 = undefined;
	    this._receiver0 = undefined;
	    this._settlePromise(promise, handler, receiver, value);
	};

	Promise.prototype._clearCallbackDataAtIndex = function(index) {
	    var base = index * 4 - 4;
	    this[base + 2] =
	    this[base + 3] =
	    this[base + 0] =
	    this[base + 1] = undefined;
	};

	Promise.prototype._fulfill = function (value) {
	    var bitField = this._bitField;
	    if (((bitField & 117506048) >>> 16)) return;
	    if (value === this) {
	        var err = makeSelfResolutionError();
	        this._attachExtraTrace(err);
	        return this._reject(err);
	    }
	    this._setFulfilled();
	    this._rejectionHandler0 = value;

	    if ((bitField & 65535) > 0) {
	        if (((bitField & 134217728) !== 0)) {
	            this._settlePromises();
	        } else {
	            async.settlePromises(this);
	        }
	        this._dereferenceTrace();
	    }
	};

	Promise.prototype._reject = function (reason) {
	    var bitField = this._bitField;
	    if (((bitField & 117506048) >>> 16)) return;
	    this._setRejected();
	    this._fulfillmentHandler0 = reason;

	    if (this._isFinal()) {
	        return async.fatalError(reason, util.isNode);
	    }

	    if ((bitField & 65535) > 0) {
	        async.settlePromises(this);
	    } else {
	        this._ensurePossibleRejectionHandled();
	    }
	};

	Promise.prototype._fulfillPromises = function (len, value) {
	    for (var i = 1; i < len; i++) {
	        var handler = this._fulfillmentHandlerAt(i);
	        var promise = this._promiseAt(i);
	        var receiver = this._receiverAt(i);
	        this._clearCallbackDataAtIndex(i);
	        this._settlePromise(promise, handler, receiver, value);
	    }
	};

	Promise.prototype._rejectPromises = function (len, reason) {
	    for (var i = 1; i < len; i++) {
	        var handler = this._rejectionHandlerAt(i);
	        var promise = this._promiseAt(i);
	        var receiver = this._receiverAt(i);
	        this._clearCallbackDataAtIndex(i);
	        this._settlePromise(promise, handler, receiver, reason);
	    }
	};

	Promise.prototype._settlePromises = function () {
	    var bitField = this._bitField;
	    var len = (bitField & 65535);

	    if (len > 0) {
	        if (((bitField & 16842752) !== 0)) {
	            var reason = this._fulfillmentHandler0;
	            this._settlePromise0(this._rejectionHandler0, reason, bitField);
	            this._rejectPromises(len, reason);
	        } else {
	            var value = this._rejectionHandler0;
	            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
	            this._fulfillPromises(len, value);
	        }
	        this._setLength(0);
	    }
	    this._clearCancellationData();
	};

	Promise.prototype._settledValue = function() {
	    var bitField = this._bitField;
	    if (((bitField & 33554432) !== 0)) {
	        return this._rejectionHandler0;
	    } else if (((bitField & 16777216) !== 0)) {
	        return this._fulfillmentHandler0;
	    }
	};

	if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
	    es5.defineProperty(Promise.prototype, Symbol.toStringTag, {
	        get: function () {
	            return "Object";
	        }
	    });
	}

	function deferResolve(v) {this.promise._resolveCallback(v);}
	function deferReject(v) {this.promise._rejectCallback(v, false);}

	Promise.defer = Promise.pending = function() {
	    debug.deprecated("Promise.defer", "new Promise");
	    var promise = new Promise(INTERNAL);
	    return {
	        promise: promise,
	        resolve: deferResolve,
	        reject: deferReject
	    };
	};

	util.notEnumerableProp(Promise,
	                       "_makeSelfResolutionError",
	                       makeSelfResolutionError);

	_dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection,
	    debug);
	_dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);
	_dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);
	_dereq_("./direct_resolve")(Promise);
	_dereq_("./synchronous_inspection")(Promise);
	_dereq_("./join")(
	    Promise, PromiseArray, tryConvertToPromise, INTERNAL, async);
	Promise.Promise = Promise;
	Promise.version = "3.7.2";
	_dereq_('./call_get.js')(Promise);
	_dereq_('./generators.js')(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
	_dereq_('./map.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
	_dereq_('./nodeify.js')(Promise);
	_dereq_('./promisify.js')(Promise, INTERNAL);
	_dereq_('./props.js')(Promise, PromiseArray, tryConvertToPromise, apiRejection);
	_dereq_('./race.js')(Promise, INTERNAL, tryConvertToPromise, apiRejection);
	_dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
	_dereq_('./settle.js')(Promise, PromiseArray, debug);
	_dereq_('./some.js')(Promise, PromiseArray, apiRejection);
	_dereq_('./timers.js')(Promise, INTERNAL, debug);
	_dereq_('./using.js')(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
	_dereq_('./any.js')(Promise);
	_dereq_('./each.js')(Promise, INTERNAL);
	_dereq_('./filter.js')(Promise, INTERNAL);
	                                                         
	    util.toFastProperties(Promise);                                          
	    util.toFastProperties(Promise.prototype);                                
	    function fillTypes(value) {                                              
	        var p = new Promise(INTERNAL);                                       
	        p._fulfillmentHandler0 = value;                                      
	        p._rejectionHandler0 = value;                                        
	        p._promise0 = value;                                                 
	        p._receiver0 = value;                                                
	    }                                                                        
	    // Complete slack tracking, opt out of field-type tracking and           
	    // stabilize map                                                         
	    fillTypes({a: 1});                                                       
	    fillTypes({b: 2});                                                       
	    fillTypes({c: 3});                                                       
	    fillTypes(1);                                                            
	    fillTypes(function(){});                                                 
	    fillTypes(undefined);                                                    
	    fillTypes(false);                                                        
	    fillTypes(new Promise(INTERNAL));                                        
	    debug.setBounds(Async.firstLineError, util.lastLineError);               
	    return Promise;                                                          

	};

	},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36,"async_hooks":undefined}],23:[function(_dereq_,module,exports){
	module.exports = function(Promise, INTERNAL, tryConvertToPromise,
	    apiRejection, Proxyable) {
	var util = _dereq_("./util");
	var isArray = util.isArray;

	function toResolutionValue(val) {
	    switch(val) {
	    case -2: return [];
	    case -3: return {};
	    case -6: return new Map();
	    }
	}

	function PromiseArray(values) {
	    var promise = this._promise = new Promise(INTERNAL);
	    if (values instanceof Promise) {
	        promise._propagateFrom(values, 3);
	        values.suppressUnhandledRejections();
	    }
	    promise._setOnCancel(this);
	    this._values = values;
	    this._length = 0;
	    this._totalResolved = 0;
	    this._init(undefined, -2);
	}
	util.inherits(PromiseArray, Proxyable);

	PromiseArray.prototype.length = function () {
	    return this._length;
	};

	PromiseArray.prototype.promise = function () {
	    return this._promise;
	};

	PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
	    var values = tryConvertToPromise(this._values, this._promise);
	    if (values instanceof Promise) {
	        values = values._target();
	        var bitField = values._bitField;
	        this._values = values;

	        if (((bitField & 50397184) === 0)) {
	            this._promise._setAsyncGuaranteed();
	            return values._then(
	                init,
	                this._reject,
	                undefined,
	                this,
	                resolveValueIfEmpty
	           );
	        } else if (((bitField & 33554432) !== 0)) {
	            values = values._value();
	        } else if (((bitField & 16777216) !== 0)) {
	            return this._reject(values._reason());
	        } else {
	            return this._cancel();
	        }
	    }
	    values = util.asArray(values);
	    if (values === null) {
	        var err = apiRejection(
	            "expecting an array or an iterable object but got " + util.classString(values)).reason();
	        this._promise._rejectCallback(err, false);
	        return;
	    }

	    if (values.length === 0) {
	        if (resolveValueIfEmpty === -5) {
	            this._resolveEmptyArray();
	        }
	        else {
	            this._resolve(toResolutionValue(resolveValueIfEmpty));
	        }
	        return;
	    }
	    this._iterate(values);
	};

	PromiseArray.prototype._iterate = function(values) {
	    var len = this.getActualLength(values.length);
	    this._length = len;
	    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
	    var result = this._promise;
	    var isResolved = false;
	    var bitField = null;
	    for (var i = 0; i < len; ++i) {
	        var maybePromise = tryConvertToPromise(values[i], result);

	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            bitField = maybePromise._bitField;
	        } else {
	            bitField = null;
	        }

	        if (isResolved) {
	            if (bitField !== null) {
	                maybePromise.suppressUnhandledRejections();
	            }
	        } else if (bitField !== null) {
	            if (((bitField & 50397184) === 0)) {
	                maybePromise._proxy(this, i);
	                this._values[i] = maybePromise;
	            } else if (((bitField & 33554432) !== 0)) {
	                isResolved = this._promiseFulfilled(maybePromise._value(), i);
	            } else if (((bitField & 16777216) !== 0)) {
	                isResolved = this._promiseRejected(maybePromise._reason(), i);
	            } else {
	                isResolved = this._promiseCancelled(i);
	            }
	        } else {
	            isResolved = this._promiseFulfilled(maybePromise, i);
	        }
	    }
	    if (!isResolved) result._setAsyncGuaranteed();
	};

	PromiseArray.prototype._isResolved = function () {
	    return this._values === null;
	};

	PromiseArray.prototype._resolve = function (value) {
	    this._values = null;
	    this._promise._fulfill(value);
	};

	PromiseArray.prototype._cancel = function() {
	    if (this._isResolved() || !this._promise._isCancellable()) return;
	    this._values = null;
	    this._promise._cancel();
	};

	PromiseArray.prototype._reject = function (reason) {
	    this._values = null;
	    this._promise._rejectCallback(reason, false);
	};

	PromiseArray.prototype._promiseFulfilled = function (value, index) {
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	        return true;
	    }
	    return false;
	};

	PromiseArray.prototype._promiseCancelled = function() {
	    this._cancel();
	    return true;
	};

	PromiseArray.prototype._promiseRejected = function (reason) {
	    this._totalResolved++;
	    this._reject(reason);
	    return true;
	};

	PromiseArray.prototype._resultCancelled = function() {
	    if (this._isResolved()) return;
	    var values = this._values;
	    this._cancel();
	    if (values instanceof Promise) {
	        values.cancel();
	    } else {
	        for (var i = 0; i < values.length; ++i) {
	            if (values[i] instanceof Promise) {
	                values[i].cancel();
	            }
	        }
	    }
	};

	PromiseArray.prototype.shouldCopyValues = function () {
	    return true;
	};

	PromiseArray.prototype.getActualLength = function (len) {
	    return len;
	};

	return PromiseArray;
	};

	},{"./util":36}],24:[function(_dereq_,module,exports){
	module.exports = function(Promise, INTERNAL) {
	var THIS = {};
	var util = _dereq_("./util");
	var nodebackForPromise = _dereq_("./nodeback");
	var withAppended = util.withAppended;
	var maybeWrapAsError = util.maybeWrapAsError;
	var canEvaluate = util.canEvaluate;
	var TypeError = _dereq_("./errors").TypeError;
	var defaultSuffix = "Async";
	var defaultPromisified = {__isPromisified__: true};
	var noCopyProps = [
	    "arity",    "length",
	    "name",
	    "arguments",
	    "caller",
	    "callee",
	    "prototype",
	    "__isPromisified__"
	];
	var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

	var defaultFilter = function(name) {
	    return util.isIdentifier(name) &&
	        name.charAt(0) !== "_" &&
	        name !== "constructor";
	};

	function propsFilter(key) {
	    return !noCopyPropsPattern.test(key);
	}

	function isPromisified(fn) {
	    try {
	        return fn.__isPromisified__ === true;
	    }
	    catch (e) {
	        return false;
	    }
	}

	function hasPromisified(obj, key, suffix) {
	    var val = util.getDataPropertyOrDefault(obj, key + suffix,
	                                            defaultPromisified);
	    return val ? isPromisified(val) : false;
	}
	function checkValid(ret, suffix, suffixRegexp) {
	    for (var i = 0; i < ret.length; i += 2) {
	        var key = ret[i];
	        if (suffixRegexp.test(key)) {
	            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
	            for (var j = 0; j < ret.length; j += 2) {
	                if (ret[j] === keyWithoutAsyncSuffix) {
	                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
	                        .replace("%s", suffix));
	                }
	            }
	        }
	    }
	}

	function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
	    var keys = util.inheritedDataKeys(obj);
	    var ret = [];
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var value = obj[key];
	        var passesDefaultFilter = filter === defaultFilter
	            ? true : defaultFilter(key);
	        if (typeof value === "function" &&
	            !isPromisified(value) &&
	            !hasPromisified(obj, key, suffix) &&
	            filter(key, value, obj, passesDefaultFilter)) {
	            ret.push(key, value);
	        }
	    }
	    checkValid(ret, suffix, suffixRegexp);
	    return ret;
	}

	var escapeIdentRegex = function(str) {
	    return str.replace(/([$])/, "\\$");
	};

	var makeNodePromisifiedEval;

	function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
	    var defaultThis = (function() {return this;})();
	    var method = callback;
	    if (typeof method === "string") {
	        callback = fn;
	    }
	    function promisified() {
	        var _receiver = receiver;
	        if (receiver === THIS) _receiver = this;
	        var promise = new Promise(INTERNAL);
	        promise._captureStackTrace();
	        var cb = typeof method === "string" && this !== defaultThis
	            ? this[method] : callback;
	        var fn = nodebackForPromise(promise, multiArgs);
	        try {
	            cb.apply(_receiver, withAppended(arguments, fn));
	        } catch(e) {
	            promise._rejectCallback(maybeWrapAsError(e), true, true);
	        }
	        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
	        return promise;
	    }
	    util.notEnumerableProp(promisified, "__isPromisified__", true);
	    return promisified;
	}

	var makeNodePromisified = canEvaluate
	    ? makeNodePromisifiedEval
	    : makeNodePromisifiedClosure;

	function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
	    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
	    var methods =
	        promisifiableMethods(obj, suffix, suffixRegexp, filter);

	    for (var i = 0, len = methods.length; i < len; i+= 2) {
	        var key = methods[i];
	        var fn = methods[i+1];
	        var promisifiedKey = key + suffix;
	        if (promisifier === makeNodePromisified) {
	            obj[promisifiedKey] =
	                makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
	        } else {
	            var promisified = promisifier(fn, function() {
	                return makeNodePromisified(key, THIS, key,
	                                           fn, suffix, multiArgs);
	            });
	            util.notEnumerableProp(promisified, "__isPromisified__", true);
	            obj[promisifiedKey] = promisified;
	        }
	    }
	    util.toFastProperties(obj);
	    return obj;
	}

	function promisify(callback, receiver, multiArgs) {
	    return makeNodePromisified(callback, receiver, undefined,
	                                callback, null, multiArgs);
	}

	Promise.promisify = function (fn, options) {
	    if (typeof fn !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(fn));
	    }
	    if (isPromisified(fn)) {
	        return fn;
	    }
	    options = Object(options);
	    var receiver = options.context === undefined ? THIS : options.context;
	    var multiArgs = !!options.multiArgs;
	    var ret = promisify(fn, receiver, multiArgs);
	    util.copyDescriptors(fn, ret, propsFilter);
	    return ret;
	};

	Promise.promisifyAll = function (target, options) {
	    if (typeof target !== "function" && typeof target !== "object") {
	        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    options = Object(options);
	    var multiArgs = !!options.multiArgs;
	    var suffix = options.suffix;
	    if (typeof suffix !== "string") suffix = defaultSuffix;
	    var filter = options.filter;
	    if (typeof filter !== "function") filter = defaultFilter;
	    var promisifier = options.promisifier;
	    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

	    if (!util.isIdentifier(suffix)) {
	        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }

	    var keys = util.inheritedDataKeys(target);
	    for (var i = 0; i < keys.length; ++i) {
	        var value = target[keys[i]];
	        if (keys[i] !== "constructor" &&
	            util.isClass(value)) {
	            promisifyAll(value.prototype, suffix, filter, promisifier,
	                multiArgs);
	            promisifyAll(value, suffix, filter, promisifier, multiArgs);
	        }
	    }

	    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
	};
	};


	},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(_dereq_,module,exports){
	module.exports = function(
	    Promise, PromiseArray, tryConvertToPromise, apiRejection) {
	var util = _dereq_("./util");
	var isObject = util.isObject;
	var es5 = _dereq_("./es5");
	var Es6Map;
	if (typeof Map === "function") Es6Map = Map;

	var mapToEntries = (function() {
	    var index = 0;
	    var size = 0;

	    function extractEntry(value, key) {
	        this[index] = value;
	        this[index + size] = key;
	        index++;
	    }

	    return function mapToEntries(map) {
	        size = map.size;
	        index = 0;
	        var ret = new Array(map.size * 2);
	        map.forEach(extractEntry, ret);
	        return ret;
	    };
	})();

	var entriesToMap = function(entries) {
	    var ret = new Es6Map();
	    var length = entries.length / 2 | 0;
	    for (var i = 0; i < length; ++i) {
	        var key = entries[length + i];
	        var value = entries[i];
	        ret.set(key, value);
	    }
	    return ret;
	};

	function PropertiesPromiseArray(obj) {
	    var isMap = false;
	    var entries;
	    if (Es6Map !== undefined && obj instanceof Es6Map) {
	        entries = mapToEntries(obj);
	        isMap = true;
	    } else {
	        var keys = es5.keys(obj);
	        var len = keys.length;
	        entries = new Array(len * 2);
	        for (var i = 0; i < len; ++i) {
	            var key = keys[i];
	            entries[i] = obj[key];
	            entries[i + len] = key;
	        }
	    }
	    this.constructor$(entries);
	    this._isMap = isMap;
	    this._init$(undefined, isMap ? -6 : -3);
	}
	util.inherits(PropertiesPromiseArray, PromiseArray);

	PropertiesPromiseArray.prototype._init = function () {};

	PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        var val;
	        if (this._isMap) {
	            val = entriesToMap(this._values);
	        } else {
	            val = {};
	            var keyOffset = this.length();
	            for (var i = 0, len = this.length(); i < len; ++i) {
	                val[this._values[i + keyOffset]] = this._values[i];
	            }
	        }
	        this._resolve(val);
	        return true;
	    }
	    return false;
	};

	PropertiesPromiseArray.prototype.shouldCopyValues = function () {
	    return false;
	};

	PropertiesPromiseArray.prototype.getActualLength = function (len) {
	    return len >> 1;
	};

	function props(promises) {
	    var ret;
	    var castValue = tryConvertToPromise(promises);

	    if (!isObject(castValue)) {
	        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    } else if (castValue instanceof Promise) {
	        ret = castValue._then(
	            Promise.props, undefined, undefined, undefined, undefined);
	    } else {
	        ret = new PropertiesPromiseArray(castValue).promise();
	    }

	    if (castValue instanceof Promise) {
	        ret._propagateFrom(castValue, 2);
	    }
	    return ret;
	}

	Promise.prototype.props = function () {
	    return props(this);
	};

	Promise.props = function (promises) {
	    return props(promises);
	};
	};

	},{"./es5":13,"./util":36}],26:[function(_dereq_,module,exports){
	function arrayMove(src, srcIndex, dst, dstIndex, len) {
	    for (var j = 0; j < len; ++j) {
	        dst[j + dstIndex] = src[j + srcIndex];
	        src[j + srcIndex] = void 0;
	    }
	}

	function Queue(capacity) {
	    this._capacity = capacity;
	    this._length = 0;
	    this._front = 0;
	}

	Queue.prototype._willBeOverCapacity = function (size) {
	    return this._capacity < size;
	};

	Queue.prototype._pushOne = function (arg) {
	    var length = this.length();
	    this._checkCapacity(length + 1);
	    var i = (this._front + length) & (this._capacity - 1);
	    this[i] = arg;
	    this._length = length + 1;
	};

	Queue.prototype.push = function (fn, receiver, arg) {
	    var length = this.length() + 3;
	    if (this._willBeOverCapacity(length)) {
	        this._pushOne(fn);
	        this._pushOne(receiver);
	        this._pushOne(arg);
	        return;
	    }
	    var j = this._front + length - 3;
	    this._checkCapacity(length);
	    var wrapMask = this._capacity - 1;
	    this[(j + 0) & wrapMask] = fn;
	    this[(j + 1) & wrapMask] = receiver;
	    this[(j + 2) & wrapMask] = arg;
	    this._length = length;
	};

	Queue.prototype.shift = function () {
	    var front = this._front,
	        ret = this[front];

	    this[front] = undefined;
	    this._front = (front + 1) & (this._capacity - 1);
	    this._length--;
	    return ret;
	};

	Queue.prototype.length = function () {
	    return this._length;
	};

	Queue.prototype._checkCapacity = function (size) {
	    if (this._capacity < size) {
	        this._resizeTo(this._capacity << 1);
	    }
	};

	Queue.prototype._resizeTo = function (capacity) {
	    var oldCapacity = this._capacity;
	    this._capacity = capacity;
	    var front = this._front;
	    var length = this._length;
	    var moveItemsCount = (front + length) & (oldCapacity - 1);
	    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
	};

	module.exports = Queue;

	},{}],27:[function(_dereq_,module,exports){
	module.exports = function(
	    Promise, INTERNAL, tryConvertToPromise, apiRejection) {
	var util = _dereq_("./util");

	var raceLater = function (promise) {
	    return promise.then(function(array) {
	        return race(array, promise);
	    });
	};

	function race(promises, parent) {
	    var maybePromise = tryConvertToPromise(promises);

	    if (maybePromise instanceof Promise) {
	        return raceLater(maybePromise);
	    } else {
	        promises = util.asArray(promises);
	        if (promises === null)
	            return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
	    }

	    var ret = new Promise(INTERNAL);
	    if (parent !== undefined) {
	        ret._propagateFrom(parent, 3);
	    }
	    var fulfill = ret._fulfill;
	    var reject = ret._reject;
	    for (var i = 0, len = promises.length; i < len; ++i) {
	        var val = promises[i];

	        if (val === undefined && !(i in promises)) {
	            continue;
	        }

	        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
	    }
	    return ret;
	}

	Promise.race = function (promises) {
	    return race(promises, undefined);
	};

	Promise.prototype.race = function () {
	    return race(this, undefined);
	};

	};

	},{"./util":36}],28:[function(_dereq_,module,exports){
	module.exports = function(Promise,
	                          PromiseArray,
	                          apiRejection,
	                          tryConvertToPromise,
	                          INTERNAL,
	                          debug) {
	var util = _dereq_("./util");
	var tryCatch = util.tryCatch;

	function ReductionPromiseArray(promises, fn, initialValue, _each) {
	    this.constructor$(promises);
	    var context = Promise._getContext();
	    this._fn = util.contextBind(context, fn);
	    if (initialValue !== undefined) {
	        initialValue = Promise.resolve(initialValue);
	        initialValue._attachCancellationCallback(this);
	    }
	    this._initialValue = initialValue;
	    this._currentCancellable = null;
	    if(_each === INTERNAL) {
	        this._eachValues = Array(this._length);
	    } else if (_each === 0) {
	        this._eachValues = null;
	    } else {
	        this._eachValues = undefined;
	    }
	    this._promise._captureStackTrace();
	    this._init$(undefined, -5);
	}
	util.inherits(ReductionPromiseArray, PromiseArray);

	ReductionPromiseArray.prototype._gotAccum = function(accum) {
	    if (this._eachValues !== undefined &&
	        this._eachValues !== null &&
	        accum !== INTERNAL) {
	        this._eachValues.push(accum);
	    }
	};

	ReductionPromiseArray.prototype._eachComplete = function(value) {
	    if (this._eachValues !== null) {
	        this._eachValues.push(value);
	    }
	    return this._eachValues;
	};

	ReductionPromiseArray.prototype._init = function() {};

	ReductionPromiseArray.prototype._resolveEmptyArray = function() {
	    this._resolve(this._eachValues !== undefined ? this._eachValues
	                                                 : this._initialValue);
	};

	ReductionPromiseArray.prototype.shouldCopyValues = function () {
	    return false;
	};

	ReductionPromiseArray.prototype._resolve = function(value) {
	    this._promise._resolveCallback(value);
	    this._values = null;
	};

	ReductionPromiseArray.prototype._resultCancelled = function(sender) {
	    if (sender === this._initialValue) return this._cancel();
	    if (this._isResolved()) return;
	    this._resultCancelled$();
	    if (this._currentCancellable instanceof Promise) {
	        this._currentCancellable.cancel();
	    }
	    if (this._initialValue instanceof Promise) {
	        this._initialValue.cancel();
	    }
	};

	ReductionPromiseArray.prototype._iterate = function (values) {
	    this._values = values;
	    var value;
	    var i;
	    var length = values.length;
	    if (this._initialValue !== undefined) {
	        value = this._initialValue;
	        i = 0;
	    } else {
	        value = Promise.resolve(values[0]);
	        i = 1;
	    }

	    this._currentCancellable = value;

	    for (var j = i; j < length; ++j) {
	        var maybePromise = values[j];
	        if (maybePromise instanceof Promise) {
	            maybePromise.suppressUnhandledRejections();
	        }
	    }

	    if (!value.isRejected()) {
	        for (; i < length; ++i) {
	            var ctx = {
	                accum: null,
	                value: values[i],
	                index: i,
	                length: length,
	                array: this
	            };

	            value = value._then(gotAccum, undefined, undefined, ctx, undefined);

	            if ((i & 127) === 0) {
	                value._setNoAsyncGuarantee();
	            }
	        }
	    }

	    if (this._eachValues !== undefined) {
	        value = value
	            ._then(this._eachComplete, undefined, undefined, this, undefined);
	    }
	    value._then(completed, completed, undefined, value, this);
	};

	Promise.prototype.reduce = function (fn, initialValue) {
	    return reduce(this, fn, initialValue, null);
	};

	Promise.reduce = function (promises, fn, initialValue, _each) {
	    return reduce(promises, fn, initialValue, _each);
	};

	function completed(valueOrReason, array) {
	    if (this.isFulfilled()) {
	        array._resolve(valueOrReason);
	    } else {
	        array._reject(valueOrReason);
	    }
	}

	function reduce(promises, fn, initialValue, _each) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
	    return array.promise();
	}

	function gotAccum(accum) {
	    this.accum = accum;
	    this.array._gotAccum(accum);
	    var value = tryConvertToPromise(this.value, this.array._promise);
	    if (value instanceof Promise) {
	        this.array._currentCancellable = value;
	        return value._then(gotValue, undefined, undefined, this, undefined);
	    } else {
	        return gotValue.call(this, value);
	    }
	}

	function gotValue(value) {
	    var array = this.array;
	    var promise = array._promise;
	    var fn = tryCatch(array._fn);
	    promise._pushContext();
	    var ret;
	    if (array._eachValues !== undefined) {
	        ret = fn.call(promise._boundValue(), value, this.index, this.length);
	    } else {
	        ret = fn.call(promise._boundValue(),
	                              this.accum, value, this.index, this.length);
	    }
	    if (ret instanceof Promise) {
	        array._currentCancellable = ret;
	    }
	    var promiseCreated = promise._popContext();
	    debug.checkForgottenReturns(
	        ret,
	        promiseCreated,
	        array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
	        promise
	    );
	    return ret;
	}
	};

	},{"./util":36}],29:[function(_dereq_,module,exports){
	var util = _dereq_("./util");
	var schedule;
	var noAsyncScheduler = function() {
	    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	};
	var NativePromise = util.getNativePromise();
	if (util.isNode && typeof MutationObserver === "undefined") {
	    var GlobalSetImmediate = commonjsGlobal.setImmediate;
	    var ProcessNextTick = process.nextTick;
	    schedule = util.isRecentNode
	                ? function(fn) { GlobalSetImmediate.call(commonjsGlobal, fn); }
	                : function(fn) { ProcessNextTick.call(process, fn); };
	} else if (typeof NativePromise === "function" &&
	           typeof NativePromise.resolve === "function") {
	    var nativePromise = NativePromise.resolve();
	    schedule = function(fn) {
	        nativePromise.then(fn);
	    };
	} else if ((typeof MutationObserver !== "undefined") &&
	          !(typeof window !== "undefined" &&
	            window.navigator &&
	            (window.navigator.standalone || window.cordova)) &&
	          ("classList" in document.documentElement)) {
	    schedule = (function() {
	        var div = document.createElement("div");
	        var opts = {attributes: true};
	        var toggleScheduled = false;
	        var div2 = document.createElement("div");
	        var o2 = new MutationObserver(function() {
	            div.classList.toggle("foo");
	            toggleScheduled = false;
	        });
	        o2.observe(div2, opts);

	        var scheduleToggle = function() {
	            if (toggleScheduled) return;
	            toggleScheduled = true;
	            div2.classList.toggle("foo");
	        };

	        return function schedule(fn) {
	            var o = new MutationObserver(function() {
	                o.disconnect();
	                fn();
	            });
	            o.observe(div, opts);
	            scheduleToggle();
	        };
	    })();
	} else if (typeof setImmediate !== "undefined") {
	    schedule = function (fn) {
	        setImmediate(fn);
	    };
	} else if (typeof setTimeout !== "undefined") {
	    schedule = function (fn) {
	        setTimeout(fn, 0);
	    };
	} else {
	    schedule = noAsyncScheduler;
	}
	module.exports = schedule;

	},{"./util":36}],30:[function(_dereq_,module,exports){
	module.exports =
	    function(Promise, PromiseArray, debug) {
	var PromiseInspection = Promise.PromiseInspection;
	var util = _dereq_("./util");

	function SettledPromiseArray(values) {
	    this.constructor$(values);
	}
	util.inherits(SettledPromiseArray, PromiseArray);

	SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
	    this._values[index] = inspection;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	        return true;
	    }
	    return false;
	};

	SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    var ret = new PromiseInspection();
	    ret._bitField = 33554432;
	    ret._settledValueField = value;
	    return this._promiseResolved(index, ret);
	};
	SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
	    var ret = new PromiseInspection();
	    ret._bitField = 16777216;
	    ret._settledValueField = reason;
	    return this._promiseResolved(index, ret);
	};

	Promise.settle = function (promises) {
	    debug.deprecated(".settle()", ".reflect()");
	    return new SettledPromiseArray(promises).promise();
	};

	Promise.allSettled = function (promises) {
	    return new SettledPromiseArray(promises).promise();
	};

	Promise.prototype.settle = function () {
	    return Promise.settle(this);
	};
	};

	},{"./util":36}],31:[function(_dereq_,module,exports){
	module.exports =
	function(Promise, PromiseArray, apiRejection) {
	var util = _dereq_("./util");
	var RangeError = _dereq_("./errors").RangeError;
	var AggregateError = _dereq_("./errors").AggregateError;
	var isArray = util.isArray;
	var CANCELLATION = {};


	function SomePromiseArray(values) {
	    this.constructor$(values);
	    this._howMany = 0;
	    this._unwrap = false;
	    this._initialized = false;
	}
	util.inherits(SomePromiseArray, PromiseArray);

	SomePromiseArray.prototype._init = function () {
	    if (!this._initialized) {
	        return;
	    }
	    if (this._howMany === 0) {
	        this._resolve([]);
	        return;
	    }
	    this._init$(undefined, -5);
	    var isArrayResolved = isArray(this._values);
	    if (!this._isResolved() &&
	        isArrayResolved &&
	        this._howMany > this._canPossiblyFulfill()) {
	        this._reject(this._getRangeError(this.length()));
	    }
	};

	SomePromiseArray.prototype.init = function () {
	    this._initialized = true;
	    this._init();
	};

	SomePromiseArray.prototype.setUnwrap = function () {
	    this._unwrap = true;
	};

	SomePromiseArray.prototype.howMany = function () {
	    return this._howMany;
	};

	SomePromiseArray.prototype.setHowMany = function (count) {
	    this._howMany = count;
	};

	SomePromiseArray.prototype._promiseFulfilled = function (value) {
	    this._addFulfilled(value);
	    if (this._fulfilled() === this.howMany()) {
	        this._values.length = this.howMany();
	        if (this.howMany() === 1 && this._unwrap) {
	            this._resolve(this._values[0]);
	        } else {
	            this._resolve(this._values);
	        }
	        return true;
	    }
	    return false;

	};
	SomePromiseArray.prototype._promiseRejected = function (reason) {
	    this._addRejected(reason);
	    return this._checkOutcome();
	};

	SomePromiseArray.prototype._promiseCancelled = function () {
	    if (this._values instanceof Promise || this._values == null) {
	        return this._cancel();
	    }
	    this._addRejected(CANCELLATION);
	    return this._checkOutcome();
	};

	SomePromiseArray.prototype._checkOutcome = function() {
	    if (this.howMany() > this._canPossiblyFulfill()) {
	        var e = new AggregateError();
	        for (var i = this.length(); i < this._values.length; ++i) {
	            if (this._values[i] !== CANCELLATION) {
	                e.push(this._values[i]);
	            }
	        }
	        if (e.length > 0) {
	            this._reject(e);
	        } else {
	            this._cancel();
	        }
	        return true;
	    }
	    return false;
	};

	SomePromiseArray.prototype._fulfilled = function () {
	    return this._totalResolved;
	};

	SomePromiseArray.prototype._rejected = function () {
	    return this._values.length - this.length();
	};

	SomePromiseArray.prototype._addRejected = function (reason) {
	    this._values.push(reason);
	};

	SomePromiseArray.prototype._addFulfilled = function (value) {
	    this._values[this._totalResolved++] = value;
	};

	SomePromiseArray.prototype._canPossiblyFulfill = function () {
	    return this.length() - this._rejected();
	};

	SomePromiseArray.prototype._getRangeError = function (count) {
	    var message = "Input array must contain at least " +
	            this._howMany + " items but contains only " + count + " items";
	    return new RangeError(message);
	};

	SomePromiseArray.prototype._resolveEmptyArray = function () {
	    this._reject(this._getRangeError(0));
	};

	function some(promises, howMany) {
	    if ((howMany | 0) !== howMany || howMany < 0) {
	        return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    ret.setHowMany(howMany);
	    ret.init();
	    return promise;
	}

	Promise.some = function (promises, howMany) {
	    return some(promises, howMany);
	};

	Promise.prototype.some = function (howMany) {
	    return some(this, howMany);
	};

	Promise._SomePromiseArray = SomePromiseArray;
	};

	},{"./errors":12,"./util":36}],32:[function(_dereq_,module,exports){
	module.exports = function(Promise) {
	function PromiseInspection(promise) {
	    if (promise !== undefined) {
	        promise = promise._target();
	        this._bitField = promise._bitField;
	        this._settledValueField = promise._isFateSealed()
	            ? promise._settledValue() : undefined;
	    }
	    else {
	        this._bitField = 0;
	        this._settledValueField = undefined;
	    }
	}

	PromiseInspection.prototype._settledValue = function() {
	    return this._settledValueField;
	};

	var value = PromiseInspection.prototype.value = function () {
	    if (!this.isFulfilled()) {
	        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    return this._settledValue();
	};

	var reason = PromiseInspection.prototype.error =
	PromiseInspection.prototype.reason = function () {
	    if (!this.isRejected()) {
	        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    return this._settledValue();
	};

	var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
	    return (this._bitField & 33554432) !== 0;
	};

	var isRejected = PromiseInspection.prototype.isRejected = function () {
	    return (this._bitField & 16777216) !== 0;
	};

	var isPending = PromiseInspection.prototype.isPending = function () {
	    return (this._bitField & 50397184) === 0;
	};

	var isResolved = PromiseInspection.prototype.isResolved = function () {
	    return (this._bitField & 50331648) !== 0;
	};

	PromiseInspection.prototype.isCancelled = function() {
	    return (this._bitField & 8454144) !== 0;
	};

	Promise.prototype.__isCancelled = function() {
	    return (this._bitField & 65536) === 65536;
	};

	Promise.prototype._isCancelled = function() {
	    return this._target().__isCancelled();
	};

	Promise.prototype.isCancelled = function() {
	    return (this._target()._bitField & 8454144) !== 0;
	};

	Promise.prototype.isPending = function() {
	    return isPending.call(this._target());
	};

	Promise.prototype.isRejected = function() {
	    return isRejected.call(this._target());
	};

	Promise.prototype.isFulfilled = function() {
	    return isFulfilled.call(this._target());
	};

	Promise.prototype.isResolved = function() {
	    return isResolved.call(this._target());
	};

	Promise.prototype.value = function() {
	    return value.call(this._target());
	};

	Promise.prototype.reason = function() {
	    var target = this._target();
	    target._unsetRejectionIsUnhandled();
	    return reason.call(target);
	};

	Promise.prototype._value = function() {
	    return this._settledValue();
	};

	Promise.prototype._reason = function() {
	    this._unsetRejectionIsUnhandled();
	    return this._settledValue();
	};

	Promise.PromiseInspection = PromiseInspection;
	};

	},{}],33:[function(_dereq_,module,exports){
	module.exports = function(Promise, INTERNAL) {
	var util = _dereq_("./util");
	var errorObj = util.errorObj;
	var isObject = util.isObject;

	function tryConvertToPromise(obj, context) {
	    if (isObject(obj)) {
	        if (obj instanceof Promise) return obj;
	        var then = getThen(obj);
	        if (then === errorObj) {
	            if (context) context._pushContext();
	            var ret = Promise.reject(then.e);
	            if (context) context._popContext();
	            return ret;
	        } else if (typeof then === "function") {
	            if (isAnyBluebirdPromise(obj)) {
	                var ret = new Promise(INTERNAL);
	                obj._then(
	                    ret._fulfill,
	                    ret._reject,
	                    undefined,
	                    ret,
	                    null
	                );
	                return ret;
	            }
	            return doThenable(obj, then, context);
	        }
	    }
	    return obj;
	}

	function doGetThen(obj) {
	    return obj.then;
	}

	function getThen(obj) {
	    try {
	        return doGetThen(obj);
	    } catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}

	var hasProp = {}.hasOwnProperty;
	function isAnyBluebirdPromise(obj) {
	    try {
	        return hasProp.call(obj, "_promise0");
	    } catch (e) {
	        return false;
	    }
	}

	function doThenable(x, then, context) {
	    var promise = new Promise(INTERNAL);
	    var ret = promise;
	    if (context) context._pushContext();
	    promise._captureStackTrace();
	    if (context) context._popContext();
	    var synchronous = true;
	    var result = util.tryCatch(then).call(x, resolve, reject);
	    synchronous = false;

	    if (promise && result === errorObj) {
	        promise._rejectCallback(result.e, true, true);
	        promise = null;
	    }

	    function resolve(value) {
	        if (!promise) return;
	        promise._resolveCallback(value);
	        promise = null;
	    }

	    function reject(reason) {
	        if (!promise) return;
	        promise._rejectCallback(reason, synchronous, true);
	        promise = null;
	    }
	    return ret;
	}

	return tryConvertToPromise;
	};

	},{"./util":36}],34:[function(_dereq_,module,exports){
	module.exports = function(Promise, INTERNAL, debug) {
	var util = _dereq_("./util");
	var TimeoutError = Promise.TimeoutError;

	function HandleWrapper(handle)  {
	    this.handle = handle;
	}

	HandleWrapper.prototype._resultCancelled = function() {
	    clearTimeout(this.handle);
	};

	var afterValue = function(value) { return delay(+this).thenReturn(value); };
	var delay = Promise.delay = function (ms, value) {
	    var ret;
	    var handle;
	    if (value !== undefined) {
	        ret = Promise.resolve(value)
	                ._then(afterValue, null, null, ms, undefined);
	        if (debug.cancellation() && value instanceof Promise) {
	            ret._setOnCancel(value);
	        }
	    } else {
	        ret = new Promise(INTERNAL);
	        handle = setTimeout(function() { ret._fulfill(); }, +ms);
	        if (debug.cancellation()) {
	            ret._setOnCancel(new HandleWrapper(handle));
	        }
	        ret._captureStackTrace();
	    }
	    ret._setAsyncGuaranteed();
	    return ret;
	};

	Promise.prototype.delay = function (ms) {
	    return delay(ms, this);
	};

	var afterTimeout = function (promise, message, parent) {
	    var err;
	    if (typeof message !== "string") {
	        if (message instanceof Error) {
	            err = message;
	        } else {
	            err = new TimeoutError("operation timed out");
	        }
	    } else {
	        err = new TimeoutError(message);
	    }
	    util.markAsOriginatingFromRejection(err);
	    promise._attachExtraTrace(err);
	    promise._reject(err);

	    if (parent != null) {
	        parent.cancel();
	    }
	};

	function successClear(value) {
	    clearTimeout(this.handle);
	    return value;
	}

	function failureClear(reason) {
	    clearTimeout(this.handle);
	    throw reason;
	}

	Promise.prototype.timeout = function (ms, message) {
	    ms = +ms;
	    var ret, parent;

	    var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
	        if (ret.isPending()) {
	            afterTimeout(ret, message, parent);
	        }
	    }, ms));

	    if (debug.cancellation()) {
	        parent = this.then();
	        ret = parent._then(successClear, failureClear,
	                            undefined, handleWrapper, undefined);
	        ret._setOnCancel(handleWrapper);
	    } else {
	        ret = this._then(successClear, failureClear,
	                            undefined, handleWrapper, undefined);
	    }

	    return ret;
	};

	};

	},{"./util":36}],35:[function(_dereq_,module,exports){
	module.exports = function (Promise, apiRejection, tryConvertToPromise,
	    createContext, INTERNAL, debug) {
	    var util = _dereq_("./util");
	    var TypeError = _dereq_("./errors").TypeError;
	    var inherits = _dereq_("./util").inherits;
	    var errorObj = util.errorObj;
	    var tryCatch = util.tryCatch;
	    var NULL = {};

	    function thrower(e) {
	        setTimeout(function(){throw e;}, 0);
	    }

	    function castPreservingDisposable(thenable) {
	        var maybePromise = tryConvertToPromise(thenable);
	        if (maybePromise !== thenable &&
	            typeof thenable._isDisposable === "function" &&
	            typeof thenable._getDisposer === "function" &&
	            thenable._isDisposable()) {
	            maybePromise._setDisposable(thenable._getDisposer());
	        }
	        return maybePromise;
	    }
	    function dispose(resources, inspection) {
	        var i = 0;
	        var len = resources.length;
	        var ret = new Promise(INTERNAL);
	        function iterator() {
	            if (i >= len) return ret._fulfill();
	            var maybePromise = castPreservingDisposable(resources[i++]);
	            if (maybePromise instanceof Promise &&
	                maybePromise._isDisposable()) {
	                try {
	                    maybePromise = tryConvertToPromise(
	                        maybePromise._getDisposer().tryDispose(inspection),
	                        resources.promise);
	                } catch (e) {
	                    return thrower(e);
	                }
	                if (maybePromise instanceof Promise) {
	                    return maybePromise._then(iterator, thrower,
	                                              null, null, null);
	                }
	            }
	            iterator();
	        }
	        iterator();
	        return ret;
	    }

	    function Disposer(data, promise, context) {
	        this._data = data;
	        this._promise = promise;
	        this._context = context;
	    }

	    Disposer.prototype.data = function () {
	        return this._data;
	    };

	    Disposer.prototype.promise = function () {
	        return this._promise;
	    };

	    Disposer.prototype.resource = function () {
	        if (this.promise().isFulfilled()) {
	            return this.promise().value();
	        }
	        return NULL;
	    };

	    Disposer.prototype.tryDispose = function(inspection) {
	        var resource = this.resource();
	        var context = this._context;
	        if (context !== undefined) context._pushContext();
	        var ret = resource !== NULL
	            ? this.doDispose(resource, inspection) : null;
	        if (context !== undefined) context._popContext();
	        this._promise._unsetDisposable();
	        this._data = null;
	        return ret;
	    };

	    Disposer.isDisposer = function (d) {
	        return (d != null &&
	                typeof d.resource === "function" &&
	                typeof d.tryDispose === "function");
	    };

	    function FunctionDisposer(fn, promise, context) {
	        this.constructor$(fn, promise, context);
	    }
	    inherits(FunctionDisposer, Disposer);

	    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
	        var fn = this.data();
	        return fn.call(resource, resource, inspection);
	    };

	    function maybeUnwrapDisposer(value) {
	        if (Disposer.isDisposer(value)) {
	            this.resources[this.index]._setDisposable(value);
	            return value.promise();
	        }
	        return value;
	    }

	    function ResourceList(length) {
	        this.length = length;
	        this.promise = null;
	        this[length-1] = null;
	    }

	    ResourceList.prototype._resultCancelled = function() {
	        var len = this.length;
	        for (var i = 0; i < len; ++i) {
	            var item = this[i];
	            if (item instanceof Promise) {
	                item.cancel();
	            }
	        }
	    };

	    Promise.using = function () {
	        var len = arguments.length;
	        if (len < 2) return apiRejection(
	                        "you must pass at least 2 arguments to Promise.using");
	        var fn = arguments[len - 1];
	        if (typeof fn !== "function") {
	            return apiRejection("expecting a function but got " + util.classString(fn));
	        }
	        var input;
	        var spreadArgs = true;
	        if (len === 2 && Array.isArray(arguments[0])) {
	            input = arguments[0];
	            len = input.length;
	            spreadArgs = false;
	        } else {
	            input = arguments;
	            len--;
	        }
	        var resources = new ResourceList(len);
	        for (var i = 0; i < len; ++i) {
	            var resource = input[i];
	            if (Disposer.isDisposer(resource)) {
	                var disposer = resource;
	                resource = resource.promise();
	                resource._setDisposable(disposer);
	            } else {
	                var maybePromise = tryConvertToPromise(resource);
	                if (maybePromise instanceof Promise) {
	                    resource =
	                        maybePromise._then(maybeUnwrapDisposer, null, null, {
	                            resources: resources,
	                            index: i
	                    }, undefined);
	                }
	            }
	            resources[i] = resource;
	        }

	        var reflectedResources = new Array(resources.length);
	        for (var i = 0; i < reflectedResources.length; ++i) {
	            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
	        }

	        var resultPromise = Promise.all(reflectedResources)
	            .then(function(inspections) {
	                for (var i = 0; i < inspections.length; ++i) {
	                    var inspection = inspections[i];
	                    if (inspection.isRejected()) {
	                        errorObj.e = inspection.error();
	                        return errorObj;
	                    } else if (!inspection.isFulfilled()) {
	                        resultPromise.cancel();
	                        return;
	                    }
	                    inspections[i] = inspection.value();
	                }
	                promise._pushContext();

	                fn = tryCatch(fn);
	                var ret = spreadArgs
	                    ? fn.apply(undefined, inspections) : fn(inspections);
	                var promiseCreated = promise._popContext();
	                debug.checkForgottenReturns(
	                    ret, promiseCreated, "Promise.using", promise);
	                return ret;
	            });

	        var promise = resultPromise.lastly(function() {
	            var inspection = new Promise.PromiseInspection(resultPromise);
	            return dispose(resources, inspection);
	        });
	        resources.promise = promise;
	        promise._setOnCancel(resources);
	        return promise;
	    };

	    Promise.prototype._setDisposable = function (disposer) {
	        this._bitField = this._bitField | 131072;
	        this._disposer = disposer;
	    };

	    Promise.prototype._isDisposable = function () {
	        return (this._bitField & 131072) > 0;
	    };

	    Promise.prototype._getDisposer = function () {
	        return this._disposer;
	    };

	    Promise.prototype._unsetDisposable = function () {
	        this._bitField = this._bitField & (~131072);
	        this._disposer = undefined;
	    };

	    Promise.prototype.disposer = function (fn) {
	        if (typeof fn === "function") {
	            return new FunctionDisposer(fn, this, createContext());
	        }
	        throw new TypeError();
	    };

	};

	},{"./errors":12,"./util":36}],36:[function(_dereq_,module,exports){
	var es5 = _dereq_("./es5");
	var canEvaluate = typeof navigator == "undefined";

	var errorObj = {e: {}};
	var tryCatchTarget;
	var globalObject = typeof self !== "undefined" ? self :
	    typeof window !== "undefined" ? window :
	    typeof commonjsGlobal !== "undefined" ? commonjsGlobal :
	    this !== undefined ? this : null;

	function tryCatcher() {
	    try {
	        var target = tryCatchTarget;
	        tryCatchTarget = null;
	        return target.apply(this, arguments);
	    } catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}

	var inherits = function(Child, Parent) {
	    var hasProp = {}.hasOwnProperty;

	    function T() {
	        this.constructor = Child;
	        this.constructor$ = Parent;
	        for (var propertyName in Parent.prototype) {
	            if (hasProp.call(Parent.prototype, propertyName) &&
	                propertyName.charAt(propertyName.length-1) !== "$"
	           ) {
	                this[propertyName + "$"] = Parent.prototype[propertyName];
	            }
	        }
	    }
	    T.prototype = Parent.prototype;
	    Child.prototype = new T();
	    return Child.prototype;
	};


	function isPrimitive(val) {
	    return val == null || val === true || val === false ||
	        typeof val === "string" || typeof val === "number";

	}

	function isObject(value) {
	    return typeof value === "function" ||
	           typeof value === "object" && value !== null;
	}

	function maybeWrapAsError(maybeError) {
	    if (!isPrimitive(maybeError)) return maybeError;

	    return new Error(safeToString(maybeError));
	}

	function withAppended(target, appendee) {
	    var len = target.length;
	    var ret = new Array(len + 1);
	    var i;
	    for (i = 0; i < len; ++i) {
	        ret[i] = target[i];
	    }
	    ret[i] = appendee;
	    return ret;
	}

	function getDataPropertyOrDefault(obj, key, defaultValue) {
	    if (es5.isES5) {
	        var desc = Object.getOwnPropertyDescriptor(obj, key);

	        if (desc != null) {
	            return desc.get == null && desc.set == null
	                    ? desc.value
	                    : defaultValue;
	        }
	    } else {
	        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
	    }
	}

	function notEnumerableProp(obj, name, value) {
	    if (isPrimitive(obj)) return obj;
	    var descriptor = {
	        value: value,
	        configurable: true,
	        enumerable: false,
	        writable: true
	    };
	    es5.defineProperty(obj, name, descriptor);
	    return obj;
	}

	function thrower(r) {
	    throw r;
	}

	var inheritedDataKeys = (function() {
	    var excludedPrototypes = [
	        Array.prototype,
	        Object.prototype,
	        Function.prototype
	    ];

	    var isExcludedProto = function(val) {
	        for (var i = 0; i < excludedPrototypes.length; ++i) {
	            if (excludedPrototypes[i] === val) {
	                return true;
	            }
	        }
	        return false;
	    };

	    if (es5.isES5) {
	        var getKeys = Object.getOwnPropertyNames;
	        return function(obj) {
	            var ret = [];
	            var visitedKeys = Object.create(null);
	            while (obj != null && !isExcludedProto(obj)) {
	                var keys;
	                try {
	                    keys = getKeys(obj);
	                } catch (e) {
	                    return ret;
	                }
	                for (var i = 0; i < keys.length; ++i) {
	                    var key = keys[i];
	                    if (visitedKeys[key]) continue;
	                    visitedKeys[key] = true;
	                    var desc = Object.getOwnPropertyDescriptor(obj, key);
	                    if (desc != null && desc.get == null && desc.set == null) {
	                        ret.push(key);
	                    }
	                }
	                obj = es5.getPrototypeOf(obj);
	            }
	            return ret;
	        };
	    } else {
	        var hasProp = {}.hasOwnProperty;
	        return function(obj) {
	            if (isExcludedProto(obj)) return [];
	            var ret = [];

	            /*jshint forin:false */
	            enumeration: for (var key in obj) {
	                if (hasProp.call(obj, key)) {
	                    ret.push(key);
	                } else {
	                    for (var i = 0; i < excludedPrototypes.length; ++i) {
	                        if (hasProp.call(excludedPrototypes[i], key)) {
	                            continue enumeration;
	                        }
	                    }
	                    ret.push(key);
	                }
	            }
	            return ret;
	        };
	    }

	})();

	var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
	function isClass(fn) {
	    try {
	        if (typeof fn === "function") {
	            var keys = es5.names(fn.prototype);

	            var hasMethods = es5.isES5 && keys.length > 1;
	            var hasMethodsOtherThanConstructor = keys.length > 0 &&
	                !(keys.length === 1 && keys[0] === "constructor");
	            var hasThisAssignmentAndStaticMethods =
	                thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

	            if (hasMethods || hasMethodsOtherThanConstructor ||
	                hasThisAssignmentAndStaticMethods) {
	                return true;
	            }
	        }
	        return false;
	    } catch (e) {
	        return false;
	    }
	}

	function toFastProperties(obj) {
	    return obj;
	}

	var rident = /^[a-z$_][a-z$_0-9]*$/i;
	function isIdentifier(str) {
	    return rident.test(str);
	}

	function filledRange(count, prefix, suffix) {
	    var ret = new Array(count);
	    for(var i = 0; i < count; ++i) {
	        ret[i] = prefix + i + suffix;
	    }
	    return ret;
	}

	function safeToString(obj) {
	    try {
	        return obj + "";
	    } catch (e) {
	        return "[no string representation]";
	    }
	}

	function isError(obj) {
	    return obj instanceof Error ||
	        (obj !== null &&
	           typeof obj === "object" &&
	           typeof obj.message === "string" &&
	           typeof obj.name === "string");
	}

	function markAsOriginatingFromRejection(e) {
	    try {
	        notEnumerableProp(e, "isOperational", true);
	    }
	    catch(ignore) {}
	}

	function originatesFromRejection(e) {
	    if (e == null) return false;
	    return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
	        e["isOperational"] === true);
	}

	function canAttachTrace(obj) {
	    return isError(obj) && es5.propertyIsWritable(obj, "stack");
	}

	var ensureErrorObject = (function() {
	    if (!("stack" in new Error())) {
	        return function(value) {
	            if (canAttachTrace(value)) return value;
	            try {throw new Error(safeToString(value));}
	            catch(err) {return err;}
	        };
	    } else {
	        return function(value) {
	            if (canAttachTrace(value)) return value;
	            return new Error(safeToString(value));
	        };
	    }
	})();

	function classString(obj) {
	    return {}.toString.call(obj);
	}

	function copyDescriptors(from, to, filter) {
	    var keys = es5.names(from);
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        if (filter(key)) {
	            try {
	                es5.defineProperty(to, key, es5.getDescriptor(from, key));
	            } catch (ignore) {}
	        }
	    }
	}

	var asArray = function(v) {
	    if (es5.isArray(v)) {
	        return v;
	    }
	    return null;
	};

	if (typeof Symbol !== "undefined" && Symbol.iterator) {
	    var ArrayFrom = typeof Array.from === "function" ? function(v) {
	        return Array.from(v);
	    } : function(v) {
	        var ret = [];
	        var it = v[Symbol.iterator]();
	        var itResult;
	        while (!((itResult = it.next()).done)) {
	            ret.push(itResult.value);
	        }
	        return ret;
	    };

	    asArray = function(v) {
	        if (es5.isArray(v)) {
	            return v;
	        } else if (v != null && typeof v[Symbol.iterator] === "function") {
	            return ArrayFrom(v);
	        }
	        return null;
	    };
	}

	var isNode = typeof process !== "undefined" &&
	        classString(process).toLowerCase() === "[object process]";

	var hasEnvVariables = typeof process !== "undefined" &&
	    typeof process.env !== "undefined";

	function env(key) {
	    return hasEnvVariables ? process.env[key] : undefined;
	}

	function getNativePromise() {
	    if (typeof Promise === "function") {
	        try {
	            var promise = new Promise(function(){});
	            if (classString(promise) === "[object Promise]") {
	                return Promise;
	            }
	        } catch (e) {}
	    }
	}

	var reflectHandler;
	function contextBind(ctx, cb) {
	    if (ctx === null ||
	        typeof cb !== "function" ||
	        cb === reflectHandler) {
	        return cb;
	    }

	    if (ctx.domain !== null) {
	        cb = ctx.domain.bind(cb);
	    }

	    var async = ctx.async;
	    if (async !== null) {
	        var old = cb;
	        cb = function() {
	            var args = (new Array(2)).concat([].slice.call(arguments));            args[0] = old;
	            args[1] = this;
	            return async.runInAsyncScope.apply(async, args);
	        };
	    }
	    return cb;
	}

	var ret = {
	    setReflectHandler: function(fn) {
	        reflectHandler = fn;
	    },
	    isClass: isClass,
	    isIdentifier: isIdentifier,
	    inheritedDataKeys: inheritedDataKeys,
	    getDataPropertyOrDefault: getDataPropertyOrDefault,
	    thrower: thrower,
	    isArray: es5.isArray,
	    asArray: asArray,
	    notEnumerableProp: notEnumerableProp,
	    isPrimitive: isPrimitive,
	    isObject: isObject,
	    isError: isError,
	    canEvaluate: canEvaluate,
	    errorObj: errorObj,
	    tryCatch: tryCatch,
	    inherits: inherits,
	    withAppended: withAppended,
	    maybeWrapAsError: maybeWrapAsError,
	    toFastProperties: toFastProperties,
	    filledRange: filledRange,
	    toString: safeToString,
	    canAttachTrace: canAttachTrace,
	    ensureErrorObject: ensureErrorObject,
	    originatesFromRejection: originatesFromRejection,
	    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
	    classString: classString,
	    copyDescriptors: copyDescriptors,
	    isNode: isNode,
	    hasEnvVariables: hasEnvVariables,
	    env: env,
	    global: globalObject,
	    getNativePromise: getNativePromise,
	    contextBind: contextBind
	};
	ret.isRecentNode = ret.isNode && (function() {
	    var version;
	    if (process.versions && process.versions.node) {
	        version = process.versions.node.split(".").map(Number);
	    } else if (process.version) {
	        version = process.version.split(".").map(Number);
	    }
	    return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
	})();
	ret.nodeSupportsAsyncResource = ret.isNode && (function() {
	    var supportsAsync = false;
	    try {
	        var res = _dereq_("async_hooks").AsyncResource;
	        supportsAsync = typeof res.prototype.runInAsyncScope === "function";
	    } catch (e) {
	        supportsAsync = false;
	    }
	    return supportsAsync;
	})();

	if (ret.isNode) ret.toFastProperties(process);

	try {throw new Error(); } catch (e) {ret.lastLineError = e;}
	module.exports = ret;

	},{"./es5":13,"async_hooks":undefined}]},{},[4])(4)
	});if (typeof window !== 'undefined' && window !== null) {                               window.P = window.Promise;                                                     } else if (typeof self !== 'undefined' && self !== null) {                             self.P = self.Promise;                                                         }
	});

	var constants = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.HASH_TRYTE_SIZE = 81;
	exports.TAG_TRYTE_SIZE = 27;
	exports.SIGNATURE_MESSAGE_FRAGMENT_TRYTE_SIZE = 2187;
	exports.TRANSACTION_TRYTE_SIZE = 2673;
	exports.MAX_INDEX_DIFF = 1000;
	exports.NULL_HASH_TRYTES = '9'.repeat(exports.HASH_TRYTE_SIZE);
	exports.NULL_TAG_TRYTES = '9'.repeat(exports.TAG_TRYTE_SIZE);
	exports.NULL_SIGNATURE_MESSAGE_FRAGMENT_TRYTES = '9'.repeat(exports.SIGNATURE_MESSAGE_FRAGMENT_TRYTE_SIZE);
	exports.NULL_TRANSACTION_TRYTES = '9'.repeat(exports.TRANSACTION_TRYTE_SIZE);

	});

	unwrapExports(constants);
	var constants_1 = constants.HASH_TRYTE_SIZE;
	var constants_2 = constants.TAG_TRYTE_SIZE;
	var constants_3 = constants.SIGNATURE_MESSAGE_FRAGMENT_TRYTE_SIZE;
	var constants_4 = constants.TRANSACTION_TRYTE_SIZE;
	var constants_5 = constants.MAX_INDEX_DIFF;
	var constants_6 = constants.NULL_HASH_TRYTES;
	var constants_7 = constants.NULL_TAG_TRYTES;
	var constants_8 = constants.NULL_SIGNATURE_MESSAGE_FRAGMENT_TRYTES;
	var constants_9 = constants.NULL_TRANSACTION_TRYTES;

	var errors$1 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.ILLEGAL_LENGTH = 'Illegal trits length';
	exports.ILLEGAL_SUBSEED_INDEX = 'Illegal subseed length';
	exports.ILLEGAL_SUBSEED_LENGTH = 'Illegal subseed length';
	exports.ILLEGAL_NUMBER_OF_FRAGMENTS = 'Illegal number of fragments';
	exports.ILLEGAL_KEY_LENGTH = 'Illegal key length';
	exports.ILLEGAL_DIGESTS_LENGTH = 'Illegal digests length';
	exports.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH = 'Illegal normalized fragment length';
	exports.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH = 'Illegal signature fragment length';
	exports.ILLEGAL_BUNDLE_HASH_LENGTH = 'Illegal bundle hash length';
	exports.ILLEGAL_KEY_FRAGMENT_LENGTH = 'Illegal key fragment length';
	exports.ILLEGAL_TRIT_CONVERSION_INPUT = 'Illegal conversion input. Expected trits as Int8Array.';
	exports.ILLEGAL_TRYTE_CONVERSION_INPUT = 'Illegal conversion input. Expected trytes string or integer.';
	exports.ILLEGAL_MIN_WEIGHT_MAGNITUDE = 'Illegal minWeightMagnitude value.';
	exports.ILLEGAL_ADDRESS_LAST_TRIT = 'Illegal address. Last trit must be 0.';
	exports.ILLEGAL_ADDRESS_LENGTH = 'Illegal address length.';
	exports.ILLEGAL_BUNDLE_LENGTH = 'Illegal bundle hash length.';
	exports.ILLEGAL_OBSOLETE_TAG_LENGTH = 'Illegal obsoleteTag length.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE = 'Illegal signature or message.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH = 'Illegal signatureOrMessage length.';
	exports.ILLEGAL_TAG_LENGTH = 'Illegal tag length.';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP = 'Illegal issuance timestamp';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH = 'Illegal issuanceTimestamp length.';
	exports.ILLEGAL_VALUE_LENGTH = 'Illegal value length.';
	exports.ILLEGAL_TRANSACTION_FIELD_OFFSET = 'Illegal transaction field offset.';
	exports.ILLEGAL_TRANSACTION_FIELD_LENGTH = 'Illegal transaction field length.';
	exports.ILLEGAL_LENGTH_OR_OFFSET = 'Illegal length or offset.';
	exports.ILLEGAL_TRANSACTION_BUFFER = 'Illegal transaction buffer. Expected `Int8Array`.';
	exports.ILLEGAL_TRANSACTION_BUFFER_LENGTH = 'Illegal transaction buffer length.';
	exports.ILLEGAL_TRANSACTION_OFFSET = 'Illegal transaction offset.';
	exports.ILLEGAL_TRANSACTION_LENGTH = 'Illegal transaction length.';
	exports.ILLEGAL_TRANSACTION_ORDER = 'Illegal transaction order.';
	exports.ILLEGAL_TRANSACTION_INDEX = 'Illegal transaction index.';
	exports.ILLEGAL_SEED_LENGTH = 'Illegal seed length. Expected length of 243 trits.';
	exports.ILLEGAL_KEY_INDEX = 'Illegal key index.';
	exports.ILLEGAL_CDA_LENGTH = 'Illegal cda length.';
	exports.ILLEGAL_BATCH = 'Illegal batch.';
	exports.CDA_ALREADY_IN_STORE = 'CDA is already in store.';
	exports.ILLEGAL_PERSISTENCE_ID = 'Illegal persistence id.';
	exports.ILLEGAL_PERSISTENCE_PATH = 'Illegal persistence path.';
	exports.ILLEGAL_PADDING_LENGTH = 'Illegal padding length. Input value length exceeds padding length.';
	exports.INCONSISTENT_SUBTANGLE = 'Inconsistent subtangle';
	exports.INSUFFICIENT_BALANCE = 'Insufficient balance';
	exports.INVALID_ADDRESS = 'Invalid address';
	exports.INVALID_REMAINDER_ADDRESS = 'Invalid remainder address';
	exports.INVALID_BRANCH_TRANSACTION = 'Invalid branch transaction';
	exports.INVALID_BUNDLE = 'Invalid bundle';
	exports.INVALID_BUNDLE_HASH = 'Invalid bundle hash';
	exports.INVALID_CHECKSUM = 'Invalid checksum';
	exports.INVALID_COMMAND = 'Invalid command format';
	exports.INVALID_DEPTH = 'Invalid depth';
	exports.INVALID_HASH = 'Invalid hash';
	exports.INVALID_INDEX = 'Invalid index option';
	exports.INVALID_TOTAL_OPTION = 'Invalid total option';
	exports.INVALID_INPUT = 'Invalid input';
	exports.INVALID_KEY = 'Invalid key value';
	exports.INVALID_MIN_WEIGHT_MAGNITUDE = 'Invalid Min Weight Magnitude';
	exports.INVALID_SEARCH_KEY = 'Invalid search key';
	exports.INVALID_SECURITY_LEVEL = 'Invalid security option';
	exports.INVALID_SECURITY_OPTION = 'Invalid security option';
	exports.INVALID_SEED = 'Invalid seed';
	exports.INVALID_START_END_OPTIONS = 'Invalid end option';
	exports.INVALID_START_OPTION = 'Invalid start option';
	exports.INVALID_TAG = 'Invalid tag';
	exports.INVALID_TRANSACTION = 'Invalid transaction';
	exports.INVALID_TRANSACTION_TRYTES = 'Invalid transaction trytes';
	exports.INVALID_ATTACHED_TRYTES = 'Invalid attached trytes';
	exports.INVALID_TRANSACTION_HASH = 'Invalid transaction hash';
	exports.INVALID_TAIL_TRANSACTION = 'Invalid tail transaction';
	exports.INVALID_THRESHOLD = 'Invalid threshold option';
	exports.INVALID_TRANSFER = 'Invalid transfer array';
	exports.INVALID_TRUNK_TRANSACTION = 'Invalid trunk transaction';
	exports.INVALID_REFERENCE_HASH = 'Invalid reference hash';
	exports.INVALID_TRYTES = 'Invalid trytes';
	exports.INVALID_URI = 'Invalid uri';
	exports.INVALID_ASCII_INPUT = 'Conversion to trytes requires type of input to be encoded in ascii.';
	exports.INVALID_ODD_LENGTH = 'Conversion from trytes requires length of trytes to be even.';
	exports.INVALID_TRYTE_ENCODED_JSON = 'Invalid tryte encoded JSON message';
	exports.NOT_INT = 'One of the inputs is not integer';
	exports.SENDING_BACK_TO_INPUTS = 'One of the transaction inputs is used as output.';
	exports.INVALID_TRANSACTIONS_TO_APPROVE = 'Invalid transactions to approve.';
	exports.NO_INPUTS = 'Could not find any available inputs.';
	exports.invalidChecksum = function (address) { return "Invalid Checksum: " + address; };
	exports.inconsistentTransaction = function (reason) { return "Transaction is inconsistent. Reason: " + reason; };
	exports.INVALID_DELAY = 'Invalid delay.';

	});

	unwrapExports(errors$1);
	var errors_1$1 = errors$1.ILLEGAL_LENGTH;
	var errors_2$1 = errors$1.ILLEGAL_SUBSEED_INDEX;
	var errors_3$1 = errors$1.ILLEGAL_SUBSEED_LENGTH;
	var errors_4$1 = errors$1.ILLEGAL_NUMBER_OF_FRAGMENTS;
	var errors_5 = errors$1.ILLEGAL_KEY_LENGTH;
	var errors_6 = errors$1.ILLEGAL_DIGESTS_LENGTH;
	var errors_7 = errors$1.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH;
	var errors_8 = errors$1.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH;
	var errors_9 = errors$1.ILLEGAL_BUNDLE_HASH_LENGTH;
	var errors_10 = errors$1.ILLEGAL_KEY_FRAGMENT_LENGTH;
	var errors_11 = errors$1.ILLEGAL_TRIT_CONVERSION_INPUT;
	var errors_12 = errors$1.ILLEGAL_TRYTE_CONVERSION_INPUT;
	var errors_13 = errors$1.ILLEGAL_MIN_WEIGHT_MAGNITUDE;
	var errors_14 = errors$1.ILLEGAL_ADDRESS_LAST_TRIT;
	var errors_15 = errors$1.ILLEGAL_ADDRESS_LENGTH;
	var errors_16 = errors$1.ILLEGAL_BUNDLE_LENGTH;
	var errors_17 = errors$1.ILLEGAL_OBSOLETE_TAG_LENGTH;
	var errors_18 = errors$1.ILLEGAL_SIGNATURE_OR_MESSAGE;
	var errors_19 = errors$1.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH;
	var errors_20 = errors$1.ILLEGAL_TAG_LENGTH;
	var errors_21 = errors$1.ILLEGAL_ISSUANCE_TIMESTAMP;
	var errors_22 = errors$1.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH;
	var errors_23 = errors$1.ILLEGAL_VALUE_LENGTH;
	var errors_24 = errors$1.ILLEGAL_TRANSACTION_FIELD_OFFSET;
	var errors_25 = errors$1.ILLEGAL_TRANSACTION_FIELD_LENGTH;
	var errors_26 = errors$1.ILLEGAL_LENGTH_OR_OFFSET;
	var errors_27 = errors$1.ILLEGAL_TRANSACTION_BUFFER;
	var errors_28 = errors$1.ILLEGAL_TRANSACTION_BUFFER_LENGTH;
	var errors_29 = errors$1.ILLEGAL_TRANSACTION_OFFSET;
	var errors_30 = errors$1.ILLEGAL_TRANSACTION_LENGTH;
	var errors_31 = errors$1.ILLEGAL_TRANSACTION_ORDER;
	var errors_32 = errors$1.ILLEGAL_TRANSACTION_INDEX;
	var errors_33 = errors$1.ILLEGAL_SEED_LENGTH;
	var errors_34 = errors$1.ILLEGAL_KEY_INDEX;
	var errors_35 = errors$1.ILLEGAL_CDA_LENGTH;
	var errors_36 = errors$1.ILLEGAL_BATCH;
	var errors_37 = errors$1.CDA_ALREADY_IN_STORE;
	var errors_38 = errors$1.ILLEGAL_PERSISTENCE_ID;
	var errors_39 = errors$1.ILLEGAL_PERSISTENCE_PATH;
	var errors_40 = errors$1.ILLEGAL_PADDING_LENGTH;
	var errors_41 = errors$1.INCONSISTENT_SUBTANGLE;
	var errors_42 = errors$1.INSUFFICIENT_BALANCE;
	var errors_43 = errors$1.INVALID_ADDRESS;
	var errors_44 = errors$1.INVALID_REMAINDER_ADDRESS;
	var errors_45 = errors$1.INVALID_BRANCH_TRANSACTION;
	var errors_46 = errors$1.INVALID_BUNDLE;
	var errors_47 = errors$1.INVALID_BUNDLE_HASH;
	var errors_48 = errors$1.INVALID_CHECKSUM;
	var errors_49 = errors$1.INVALID_COMMAND;
	var errors_50 = errors$1.INVALID_DEPTH;
	var errors_51 = errors$1.INVALID_HASH;
	var errors_52 = errors$1.INVALID_INDEX;
	var errors_53 = errors$1.INVALID_TOTAL_OPTION;
	var errors_54 = errors$1.INVALID_INPUT;
	var errors_55 = errors$1.INVALID_KEY;
	var errors_56 = errors$1.INVALID_MIN_WEIGHT_MAGNITUDE;
	var errors_57 = errors$1.INVALID_SEARCH_KEY;
	var errors_58 = errors$1.INVALID_SECURITY_LEVEL;
	var errors_59 = errors$1.INVALID_SECURITY_OPTION;
	var errors_60 = errors$1.INVALID_SEED;
	var errors_61 = errors$1.INVALID_START_END_OPTIONS;
	var errors_62 = errors$1.INVALID_START_OPTION;
	var errors_63 = errors$1.INVALID_TAG;
	var errors_64 = errors$1.INVALID_TRANSACTION;
	var errors_65 = errors$1.INVALID_TRANSACTION_TRYTES;
	var errors_66 = errors$1.INVALID_ATTACHED_TRYTES;
	var errors_67 = errors$1.INVALID_TRANSACTION_HASH;
	var errors_68 = errors$1.INVALID_TAIL_TRANSACTION;
	var errors_69 = errors$1.INVALID_THRESHOLD;
	var errors_70 = errors$1.INVALID_TRANSFER;
	var errors_71 = errors$1.INVALID_TRUNK_TRANSACTION;
	var errors_72 = errors$1.INVALID_REFERENCE_HASH;
	var errors_73 = errors$1.INVALID_TRYTES;
	var errors_74 = errors$1.INVALID_URI;
	var errors_75 = errors$1.INVALID_ASCII_INPUT;
	var errors_76 = errors$1.INVALID_ODD_LENGTH;
	var errors_77 = errors$1.INVALID_TRYTE_ENCODED_JSON;
	var errors_78 = errors$1.NOT_INT;
	var errors_79 = errors$1.SENDING_BACK_TO_INPUTS;
	var errors_80 = errors$1.INVALID_TRANSACTIONS_TO_APPROVE;
	var errors_81 = errors$1.NO_INPUTS;
	var errors_82 = errors$1.invalidChecksum;
	var errors_83 = errors$1.inconsistentTransaction;
	var errors_84 = errors$1.INVALID_DELAY;

	var guards = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;


	// Required for markdown generation with JSDoc
	/**
	 * @module validators
	 */
	/* Type guards */
	/**
	 * Checks if input is an `Int8Array` of trit values; `-1, 0, 1`.
	 *
	 * @method isTrits
	 *
	 * @param {any} input
	 *
	 * @return {boolean}
	 */
	exports.isTrits = function (input) {
	    if (input instanceof Int8Array) {
	        for (var i = 0; i < input.length; i++) {
	            if (!(input[i] === 0 || input[i] === -1 || input[i] === 1)) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	};
	/**
	 * Checks if trits are NULL.
	 *
	 * @method isNullTrits
	 *
	 * @param {Int8Array} trits
	 *
	 * @return {boolean}
	 */
	exports.isNullTrits = function (input) {
	    if (input instanceof Int8Array) {
	        if (input.length === 0) {
	            return true;
	        }
	        for (var i = 0; i < input.length; i++) {
	            if (input[i] !== 0) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	};
	/**
	 * Checks if input is correct trytes consisting of [9A-Z]; optionally validate length
	 * @method isTrytes
	 *
	 * @param {string} trytes
	 * @param {string | number} [length='1,']
	 *
	 * @return {boolean}
	 */
	exports.isTrytes = function (trytes, length) {
	    if (length === void 0) { length = '1,'; }
	    return typeof trytes === 'string' && new RegExp("^[9A-Z]{" + length + "}$").test(trytes);
	};
	/**
	 * @method isTrytesOfExactLength
	 *
	 * @param {string} trytes
	 * @param {number} length
	 *
	 * @return {boolean}
	 */
	exports.isTrytesOfExactLength = function (trytes, length) {
	    return typeof trytes === 'string' && new RegExp("^[9A-Z]{" + length + "}$").test(trytes);
	};
	/**
	 * @method isTrytesOfMaxLength
	 *
	 * @param {string} trytes
	 * @param {number} length
	 *
	 * @return {boolean}
	 */
	exports.isTrytesOfMaxLength = function (trytes, length) {
	    return typeof trytes === 'string' && new RegExp("^[9A-Z]{1," + length + "}$").test(trytes);
	};
	/**
	 * Checks if input contains `9`s only.
	 * @method isEmpty
	 *
	 * @param {string} hash
	 *
	 * @return {boolean}
	 */
	exports.isEmpty = function (trytes) { return typeof trytes === 'string' && /^[9]+$/.test(trytes); };
	exports.isNinesTrytes = exports.isEmpty;
	/**
	 * Checks if input is correct hash (81 trytes) or address with checksum (90 trytes)
	 *
	 * @method isHash
	 *
	 * @param {string} hash
	 *
	 * @return {boolean}
	 */
	exports.isHash = function (hash) {
	    return exports.isTrytesOfExactLength(hash, constants.HASH_TRYTE_SIZE) || exports.isTrytesOfExactLength(hash, constants.HASH_TRYTE_SIZE + 9);
	}; // address w/ checksum is valid hash
	/* Check if security level is valid positive integer */
	exports.isSecurityLevel = function (security) {
	    return Number.isInteger(security) && security > 0 && security < 4;
	};
	/**
	 * Checks if input is valid input object. Address can be passed with or without checksum.
	 * It does not validate the checksum.
	 *
	 * @method isInput
	 *
	 * @param {string} address
	 *
	 * @return {boolean}
	 */
	exports.isInput = function (input) {
	    return exports.isHash(input.address) &&
	        exports.isSecurityLevel(input.security) &&
	        (typeof input.balance === 'undefined' || (Number.isInteger(input.balance) && input.balance > 0)) &&
	        Number.isInteger(input.keyIndex) &&
	        input.keyIndex >= 0;
	};
	/**
	 * Checks that input is valid tag trytes.
	 *
	 * @method isTag
	 *
	 * @param {string} tag
	 *
	 * @return {boolean}
	 */
	exports.isTag = function (tag) { return exports.isTrytesOfMaxLength(tag, constants.TAG_TRYTE_SIZE); };
	/**
	 * Checks if input is valid `transfer` object.
	 *
	 * @method isTransfer
	 *
	 * @param {Transfer} transfer
	 *
	 * @return {boolean}
	 */
	exports.isTransfer = function (transfer) {
	    return exports.isHash(transfer.address) &&
	        Number.isInteger(transfer.value) &&
	        transfer.value >= 0 &&
	        (!transfer.message || exports.isTrytes(transfer.message, '0,')) &&
	        (!transfer.tag || exports.isTag(transfer.tag));
	};
	/**
	 * Checks that a given `URI` is valid
	 *
	 * Valid Examples:
	 * - `udp://[2001:db8:a0b:12f0::1]:14265`
	 * - `udp://[2001:db8:a0b:12f0::1]`
	 * - `udp://8.8.8.8:14265`
	 * - `udp://domain.com`
	 * - `udp://domain2.com:14265`
	 *
	 * @method isUri
	 *
	 * @param {string} uri
	 *
	 * @return {boolean}
	 */
	exports.isUri = function (uri) {
	    if (typeof uri !== 'string') {
	        return false;
	    }
	    var getInside = /^(udp|tcp):\/\/([\[][^\]\.]*[\]]|[^\[\]:]*)[:]{0,1}([0-9]{1,}$|$)/i;
	    var stripBrackets = /[\[]{0,1}([^\[\]]*)[\]]{0,1}/;
	    var uriTest = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/;
	    return getInside.test(uri) && uriTest.test(stripBrackets.exec(getInside.exec(uri)[1])[1]);
	};
	/* Check if start & end options are valid */
	exports.isStartEndOptions = function (_a) {
	    var start = _a.start, end = _a.end;
	    return !end || (start <= end && end < start + constants.MAX_INDEX_DIFF);
	};
	/* Checks all array items */
	exports.isArray = function (f) { return function (x) {
	    return Array.isArray(x) && x.length > 0 && x.every(function (y) { return f(y); });
	}; };
	/**
	 * Runs each validator in sequence, and throws on the first occurence of invalid data.
	 * Validators are passed as arguments and executed in given order.
	 * You might want place `validate()` in promise chains before operations that require valid inputs,
	 * taking advantage of built-in promise branching.
	 *
	 * @example
	 *
	 * ```js
	 * try {
	 *   validate([
	 *     value, // Given value
	 *     isTrytes, // Validator function
	 *     'Invalid trytes' // Error message
	 *   ])
	 * } catch (err) {
	 *   console.log(err.message) // 'Invalid trytes'
	 * }
	 * ```
	 *
	 * @method validate
	 *
	 * @throws {Error} error
	 * @return {boolean}
	 */
	exports.validate = function () {
	    var validators = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        validators[_i] = arguments[_i];
	    }
	    validators.forEach(function (validator) {
	        if (Array.isArray(validator)) {
	            var value = validator[0], isValid = validator[1], msg = validator[2];
	            if (!isValid(value)) {
	                throw new Error(msg + ": " + JSON.stringify(value, null, 1));
	            }
	        }
	    });
	    return true;
	};
	exports.arrayValidator = function (validator) { return function (arr, customMsg) {
	    var _a = validator(arr[0]), _ = _a[0], // tslint:disable-line no-unused-variable
	    isValid = _a[1], msg = _a[2];
	    return [
	        arr,
	        function (x) { return Array.isArray(x) && x.every(function (value) { return isValid(value); }); },
	        customMsg || msg,
	    ];
	}; };
	exports.depthValidator = function (depth) { return [
	    depth,
	    function (n) { return Number.isInteger(n) && n > 0; },
	    errors$1.INVALID_DEPTH,
	]; };
	exports.minWeightMagnitudeValidator = function (minWeightMagnitude) { return [
	    minWeightMagnitude,
	    Number.isInteger,
	    errors$1.INVALID_MIN_WEIGHT_MAGNITUDE,
	]; };
	exports.seedValidator = function (seed) { return [seed, exports.isTrytes, errors$1.INVALID_SEED]; };
	exports.securityLevelValidator = function (security) { return [
	    security,
	    exports.isSecurityLevel,
	    errors$1.INVALID_SECURITY_LEVEL,
	]; };
	exports.inputValidator = function (input) { return [input, exports.isInput, errors$1.INVALID_INPUT]; };
	exports.remainderAddressValidator = function (input) { return [input, exports.isHash, errors$1.INVALID_REMAINDER_ADDRESS]; };
	exports.tagValidator = function (tag) { return [tag, exports.isTag, errors$1.INVALID_TAG]; };
	exports.transferValidator = function (transfer) { return [transfer, exports.isTransfer, errors$1.INVALID_TRANSFER]; };
	exports.hashValidator = function (hash, errorMessage) { return [
	    hash,
	    exports.isHash,
	    errorMessage || errors$1.INVALID_HASH,
	]; };
	exports.trytesValidator = function (trytes, msg) { return [
	    trytes,
	    function (t) { return (length ? exports.isTrytesOfExactLength(t, length) : exports.isTrytes(t)); },
	    msg || errors$1.INVALID_TRYTES,
	]; };
	exports.uriValidator = function (uri) { return [uri, exports.isUri, errors$1.INVALID_URI]; };
	exports.integerValidator = function (integer, msg) { return [
	    integer,
	    Number.isInteger,
	    msg || errors$1.NOT_INT,
	]; };
	exports.indexValidator = function (index) { return [index, Number.isInteger, errors$1.INVALID_INDEX]; };
	exports.startOptionValidator = function (start) { return [
	    start,
	    function (s) { return Number.isInteger(s) && s >= 0; },
	    errors$1.INVALID_START_OPTION,
	]; };
	exports.startEndOptionsValidator = function (options) { return [
	    options,
	    exports.isStartEndOptions,
	    errors$1.INVALID_START_END_OPTIONS,
	]; };
	exports.getInputsThresholdValidator = function (threshold) { return [
	    threshold,
	    function (s) { return Number.isInteger(s) && s >= 0; },
	    errors$1.INVALID_THRESHOLD,
	]; };
	exports.stringify = function (value) {
	    return JSON.stringify(value, null, 1);
	};

	});

	unwrapExports(guards);
	var guards_1 = guards.isTrits;
	var guards_2 = guards.isNullTrits;
	var guards_3 = guards.isTrytes;
	var guards_4 = guards.isTrytesOfExactLength;
	var guards_5 = guards.isTrytesOfMaxLength;
	var guards_6 = guards.isEmpty;
	var guards_7 = guards.isNinesTrytes;
	var guards_8 = guards.isHash;
	var guards_9 = guards.isSecurityLevel;
	var guards_10 = guards.isInput;
	var guards_11 = guards.isTag;
	var guards_12 = guards.isTransfer;
	var guards_13 = guards.isUri;
	var guards_14 = guards.isStartEndOptions;
	var guards_15 = guards.isArray;
	var guards_16 = guards.validate;
	var guards_17 = guards.arrayValidator;
	var guards_18 = guards.depthValidator;
	var guards_19 = guards.minWeightMagnitudeValidator;
	var guards_20 = guards.seedValidator;
	var guards_21 = guards.securityLevelValidator;
	var guards_22 = guards.inputValidator;
	var guards_23 = guards.remainderAddressValidator;
	var guards_24 = guards.tagValidator;
	var guards_25 = guards.transferValidator;
	var guards_26 = guards.hashValidator;
	var guards_27 = guards.trytesValidator;
	var guards_28 = guards.uriValidator;
	var guards_29 = guards.integerValidator;
	var guards_30 = guards.indexValidator;
	var guards_31 = guards.startOptionValidator;
	var guards_32 = guards.startEndOptionsValidator;
	var guards_33 = guards.getInputsThresholdValidator;
	var guards_34 = guards.stringify;

	var createAddNeighbors = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;



	/**
	 * @method createAddNeighbors
	 *
	 * @summary Creates a new `addNeighbors()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`addNeighbors`]{@link #module_core.addNeighbors}  - A new `addNeighbors()` function that uses your chosen Provider instance.
	 */
	exports.createAddNeighbors = function (_a) {
	    var send = _a.send;
	    /**
	     *
	     * This method adds temporary neighbors to the connected IRI node by calling the its
	     * [`addNeighbors`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#addNeighbors) endpoint.
	     *
	     * These neighbors are removed when the node is restarted.
	     *
	     * ## Related methods
	     *
	     * To see statistics about the connected IRI node's neighbors, use the [`getNeighbors()`]{@link #module_core.getNeighbors} method.
	     *
	     * @method addNeighbors
	     *
	     * @summary Adds temporary neighbors to the connected IRI node.
	     *
	     * @memberof module:core
	     *
	     * @param {Array.<string>} URIs - Comma-separated URIs of neighbor nodes that you want to add
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     * ```js
	     * addNeighbors(['tcp://148.148.148.148:15600'])
	     *   .then(numberOfNeighbors => {
	     *     console.log(`Successfully added ${numberOfNeighbors} neighbors`)
	     *   }).catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     *   })
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {number} numberOfNeighbors - Number of neighbors that were added
	     *
	     * @reject {Error} error - One of the following errors:
	     * - `INVALID_URI`: Make sure that the URI is a string and starts with `tcp://`
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     *
	     */
	    return function addedNeighbors(uris, callback) {
	        return bluebird.resolve(guards.validate(guards.arrayValidator(guards.uriValidator)(uris)))
	            .then(function () {
	            return send({
	                command: types.IRICommand.ADD_NEIGHBORS,
	                uris: uris
	            });
	        })
	            .then(function (res) { return res.addedNeighbors; })
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createAddNeighbors);
	var createAddNeighbors_1 = createAddNeighbors.createAddNeighbors;

	if (!Int8Array.prototype.slice) {
	    Object.defineProperty(Int8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.subarray) {
	    Object.defineProperty(Uint8Array.prototype, 'subarray', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.map) {
	    Object.defineProperty(Int8Array.prototype, 'map', {
	        value: Array.prototype.map
	    });
	}
	if (!Int8Array.prototype.every) {
	    Object.defineProperty(Int8Array.prototype, 'every', {
	        value: Array.prototype.every
	    });
	}
	if (!Int8Array.prototype.some) {
	    Object.defineProperty(Uint8Array.prototype, 'some', {
	        value: Array.prototype.some
	    });
	}
	if (!Int8Array.prototype.indexOf) {
	    Object.defineProperty(Int8Array.prototype, 'indexOf', {
	        value: Array.prototype.indexOf
	    });
	}
	// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Polyfill
	// Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/
	if (!Int8Array.prototype.fill) {
	    Object.defineProperty(Int8Array.prototype, 'fill', {
	        value: function (input) {
	            // Steps 1-2.
	            if (this == null) {
	                throw new TypeError('this is null or not defined');
	            }
	            var O = Object(this);
	            // Steps 3-5.
	            var len = O.length >>> 0;
	            // Steps 6-7.
	            var start = arguments[1];
	            var relativeStart = start >> 0;
	            // Step 8.
	            var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
	            // Steps 9-10.
	            var end = arguments[2];
	            var relativeEnd = end === undefined ? len : end >> 0;
	            // Step 11.
	            var last = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
	            // Step 12.
	            while (k < last) {
	                O[k] = input;
	                k++;
	            }
	            // Step 13.
	            return O;
	        }
	    });
	}
	if (!Uint32Array.prototype.slice) {
	    Object.defineProperty(Uint8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Uint32Array.prototype.reverse) {
	    Object.defineProperty(Uint8Array.prototype, 'reverse', {
	        value: Array.prototype.reverse
	    });
	}

	var src$1 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	// tslint:disable no-conditional-assignment

	var NUMBER_OF_ROUNDS = 81;
	var HASH_LENGTH = 243;
	var STATE_LENGTH = 3 * HASH_LENGTH;
	var TRUTH_TABLE = [1, 0, -1, 2, 1, -1, 0, 2, -1, 1, 0];
	/**
	 * @class Curl
	 * @ignore
	 */
	var Curl = /** @class */ (function () {
	    /**
	     * @constructor
	     *
	     * @ignore
	     *
	     * @param rounds
	     */
	    function Curl(rounds) {
	        if (rounds === void 0) { rounds = NUMBER_OF_ROUNDS; }
	        this.rounds = rounds;
	        if (rounds !== 27 && rounds !== 81) {
	            throw new Error('Illegal number of rounds. Only `27` and `81` rounds are supported.');
	        }
	        this.state = new Int8Array(STATE_LENGTH);
	    }
	    /**
	     * Initializes the state with `STATE_LENGTH` trits
	     *
	     * @method initialize
	     *
	     * @ignore
	     *
	     * @param {Int8Array} [state]
	     */
	    Curl.prototype.initialize = function (state) {
	        if (state === void 0) { state = new Int8Array(STATE_LENGTH); }
	        if (state.length !== STATE_LENGTH) {
	            throw new Error('Illegal state length. ');
	        }
	        this.state = state.slice();
	        for (var i = 0; i < STATE_LENGTH; i++) {
	            this.state[i] = 0;
	        }
	    };
	    /**
	     * Resets the state
	     *
	     * @ignore
	     *
	     * @method reset
	     */
	    Curl.prototype.reset = function () {
	        this.initialize();
	    };
	    /**
	     * Absorbs trits given an offset and length
	     *
	     * @method absorb
	     *
	     * @ignore
	     *
	     * @param {Int8Array} trits
	     * @param {number} offset
	     * @param {number} length
	     **/
	    Curl.prototype.absorb = function (trits, offset, length) {
	        do {
	            var i = 0;
	            var limit = length < HASH_LENGTH ? length : HASH_LENGTH;
	            while (i < limit) {
	                this.state[i++] = trits[offset++];
	            }
	            this.transform();
	        } while ((length -= HASH_LENGTH) > 0);
	    };
	    /**
	     * Squeezes trits given an offset and length
	     *
	     * @method squeeze
	     *
	     * @ignore
	     *
	     * @param {Int8Array} trits
	     * @param {number} offset
	     * @param {number} length
	     **/
	    Curl.prototype.squeeze = function (trits, offset, length) {
	        do {
	            var i = 0;
	            var limit = length < HASH_LENGTH ? length : HASH_LENGTH;
	            while (i < limit) {
	                trits[offset++] = this.state[i++];
	            }
	            this.transform();
	        } while ((length -= HASH_LENGTH) > 0);
	    };
	    /**
	     * Sponge transform function
	     *
	     * @method transform
	     *
	     * @ignore
	     *
	     * @private
	     */
	    Curl.prototype.transform = function () {
	        var stateCopy = new Int8Array(STATE_LENGTH);
	        var index = 0;
	        for (var round = 0; round < this.rounds; round++) {
	            stateCopy = this.state.slice();
	            for (var i = 0; i < STATE_LENGTH; i++) {
	                this.state[i] =
	                    TRUTH_TABLE[stateCopy[index] + (stateCopy[(index += index < 365 ? 364 : -365)] << 2) + 5];
	            }
	        }
	    };
	    Curl.HASH_LENGTH = HASH_LENGTH;
	    return Curl;
	}());
	exports["default"] = Curl;

	});

	unwrapExports(src$1);

	var core = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory();
		}
	}(commonjsGlobal, function () {

		/*globals window, global, require*/

		/**
		 * CryptoJS core components.
		 */
		var CryptoJS = CryptoJS || (function (Math, undefined$1) {

		    var crypto;

		    // Native crypto from window (Browser)
		    if (typeof window !== 'undefined' && window.crypto) {
		        crypto = window.crypto;
		    }

		    // Native (experimental IE 11) crypto from window (Browser)
		    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
		        crypto = window.msCrypto;
		    }

		    // Native crypto from global (NodeJS)
		    if (!crypto && typeof commonjsGlobal !== 'undefined' && commonjsGlobal.crypto) {
		        crypto = commonjsGlobal.crypto;
		    }

		    // Native crypto import via require (NodeJS)
		    if (!crypto && typeof commonjsRequire === 'function') {
		        try {
		            crypto = crypto__default['default'];
		        } catch (err) {}
		    }

		    /*
		     * Cryptographically secure pseudorandom number generator
		     *
		     * As Math.random() is cryptographically not safe to use
		     */
		    var cryptoSecureRandomInt = function () {
		        if (crypto) {
		            // Use getRandomValues method (Browser)
		            if (typeof crypto.getRandomValues === 'function') {
		                try {
		                    return crypto.getRandomValues(new Uint32Array(1))[0];
		                } catch (err) {}
		            }

		            // Use randomBytes method (NodeJS)
		            if (typeof crypto.randomBytes === 'function') {
		                try {
		                    return crypto.randomBytes(4).readInt32LE();
		                } catch (err) {}
		            }
		        }

		        throw new Error('Native crypto module could not be used to get secure random number.');
		    };

		    /*
		     * Local polyfill of Object.create

		     */
		    var create = Object.create || (function () {
		        function F() {}

		        return function (obj) {
		            var subtype;

		            F.prototype = obj;

		            subtype = new F();

		            F.prototype = null;

		            return subtype;
		        };
		    }());

		    /**
		     * CryptoJS namespace.
		     */
		    var C = {};

		    /**
		     * Library namespace.
		     */
		    var C_lib = C.lib = {};

		    /**
		     * Base object for prototypal inheritance.
		     */
		    var Base = C_lib.Base = (function () {


		        return {
		            /**
		             * Creates a new object that inherits from this object.
		             *
		             * @param {Object} overrides Properties to copy into the new object.
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         field: 'value',
		             *
		             *         method: function () {
		             *         }
		             *     });
		             */
		            extend: function (overrides) {
		                // Spawn
		                var subtype = create(this);

		                // Augment
		                if (overrides) {
		                    subtype.mixIn(overrides);
		                }

		                // Create default initializer
		                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
		                    subtype.init = function () {
		                        subtype.$super.init.apply(this, arguments);
		                    };
		                }

		                // Initializer's prototype is the subtype object
		                subtype.init.prototype = subtype;

		                // Reference supertype
		                subtype.$super = this;

		                return subtype;
		            },

		            /**
		             * Extends this object and runs the init method.
		             * Arguments to create() will be passed to init().
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var instance = MyType.create();
		             */
		            create: function () {
		                var instance = this.extend();
		                instance.init.apply(instance, arguments);

		                return instance;
		            },

		            /**
		             * Initializes a newly created object.
		             * Override this method to add some logic when your objects are created.
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         init: function () {
		             *             // ...
		             *         }
		             *     });
		             */
		            init: function () {
		            },

		            /**
		             * Copies properties into this object.
		             *
		             * @param {Object} properties The properties to mix in.
		             *
		             * @example
		             *
		             *     MyType.mixIn({
		             *         field: 'value'
		             *     });
		             */
		            mixIn: function (properties) {
		                for (var propertyName in properties) {
		                    if (properties.hasOwnProperty(propertyName)) {
		                        this[propertyName] = properties[propertyName];
		                    }
		                }

		                // IE won't copy toString using the loop above
		                if (properties.hasOwnProperty('toString')) {
		                    this.toString = properties.toString;
		                }
		            },

		            /**
		             * Creates a copy of this object.
		             *
		             * @return {Object} The clone.
		             *
		             * @example
		             *
		             *     var clone = instance.clone();
		             */
		            clone: function () {
		                return this.init.prototype.extend(this);
		            }
		        };
		    }());

		    /**
		     * An array of 32-bit words.
		     *
		     * @property {Array} words The array of 32-bit words.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    var WordArray = C_lib.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of 32-bit words.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.create();
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];

		            if (sigBytes != undefined$1) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 4;
		            }
		        },

		        /**
		         * Converts this word array to a string.
		         *
		         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
		         *
		         * @return {string} The stringified word array.
		         *
		         * @example
		         *
		         *     var string = wordArray + '';
		         *     var string = wordArray.toString();
		         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
		         */
		        toString: function (encoder) {
		            return (encoder || Hex).stringify(this);
		        },

		        /**
		         * Concatenates a word array to this word array.
		         *
		         * @param {WordArray} wordArray The word array to append.
		         *
		         * @return {WordArray} This word array.
		         *
		         * @example
		         *
		         *     wordArray1.concat(wordArray2);
		         */
		        concat: function (wordArray) {
		            // Shortcuts
		            var thisWords = this.words;
		            var thatWords = wordArray.words;
		            var thisSigBytes = this.sigBytes;
		            var thatSigBytes = wordArray.sigBytes;

		            // Clamp excess bits
		            this.clamp();

		            // Concat
		            if (thisSigBytes % 4) {
		                // Copy one byte at a time
		                for (var i = 0; i < thatSigBytes; i++) {
		                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
		                }
		            } else {
		                // Copy one word at a time
		                for (var i = 0; i < thatSigBytes; i += 4) {
		                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
		                }
		            }
		            this.sigBytes += thatSigBytes;

		            // Chainable
		            return this;
		        },

		        /**
		         * Removes insignificant bits.
		         *
		         * @example
		         *
		         *     wordArray.clamp();
		         */
		        clamp: function () {
		            // Shortcuts
		            var words = this.words;
		            var sigBytes = this.sigBytes;

		            // Clamp
		            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
		            words.length = Math.ceil(sigBytes / 4);
		        },

		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = wordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone.words = this.words.slice(0);

		            return clone;
		        },

		        /**
		         * Creates a word array filled with random bytes.
		         *
		         * @param {number} nBytes The number of random bytes to generate.
		         *
		         * @return {WordArray} The random word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.random(16);
		         */
		        random: function (nBytes) {
		            var words = [];

		            for (var i = 0; i < nBytes; i += 4) {
		                words.push(cryptoSecureRandomInt());
		            }

		            return new WordArray.init(words, nBytes);
		        }
		    });

		    /**
		     * Encoder namespace.
		     */
		    var C_enc = C.enc = {};

		    /**
		     * Hex encoding strategy.
		     */
		    var Hex = C_enc.Hex = {
		        /**
		         * Converts a word array to a hex string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The hex string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var hexChars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                hexChars.push((bite >>> 4).toString(16));
		                hexChars.push((bite & 0x0f).toString(16));
		            }

		            return hexChars.join('');
		        },

		        /**
		         * Converts a hex string to a word array.
		         *
		         * @param {string} hexStr The hex string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
		         */
		        parse: function (hexStr) {
		            // Shortcut
		            var hexStrLength = hexStr.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < hexStrLength; i += 2) {
		                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
		            }

		            return new WordArray.init(words, hexStrLength / 2);
		        }
		    };

		    /**
		     * Latin1 encoding strategy.
		     */
		    var Latin1 = C_enc.Latin1 = {
		        /**
		         * Converts a word array to a Latin1 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Latin1 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var latin1Chars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                latin1Chars.push(String.fromCharCode(bite));
		            }

		            return latin1Chars.join('');
		        },

		        /**
		         * Converts a Latin1 string to a word array.
		         *
		         * @param {string} latin1Str The Latin1 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
		         */
		        parse: function (latin1Str) {
		            // Shortcut
		            var latin1StrLength = latin1Str.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < latin1StrLength; i++) {
		                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
		            }

		            return new WordArray.init(words, latin1StrLength);
		        }
		    };

		    /**
		     * UTF-8 encoding strategy.
		     */
		    var Utf8 = C_enc.Utf8 = {
		        /**
		         * Converts a word array to a UTF-8 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-8 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            try {
		                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
		            } catch (e) {
		                throw new Error('Malformed UTF-8 data');
		            }
		        },

		        /**
		         * Converts a UTF-8 string to a word array.
		         *
		         * @param {string} utf8Str The UTF-8 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
		         */
		        parse: function (utf8Str) {
		            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
		        }
		    };

		    /**
		     * Abstract buffered block algorithm template.
		     *
		     * The property blockSize must be implemented in a concrete subtype.
		     *
		     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
		     */
		    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
		        /**
		         * Resets this block algorithm's data buffer to its initial state.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm.reset();
		         */
		        reset: function () {
		            // Initial values
		            this._data = new WordArray.init();
		            this._nDataBytes = 0;
		        },

		        /**
		         * Adds new data to this block algorithm's buffer.
		         *
		         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm._append('data');
		         *     bufferedBlockAlgorithm._append(wordArray);
		         */
		        _append: function (data) {
		            // Convert string to WordArray, else assume WordArray already
		            if (typeof data == 'string') {
		                data = Utf8.parse(data);
		            }

		            // Append
		            this._data.concat(data);
		            this._nDataBytes += data.sigBytes;
		        },

		        /**
		         * Processes available data blocks.
		         *
		         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
		         *
		         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
		         *
		         * @return {WordArray} The processed data.
		         *
		         * @example
		         *
		         *     var processedData = bufferedBlockAlgorithm._process();
		         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
		         */
		        _process: function (doFlush) {
		            var processedWords;

		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            var dataSigBytes = data.sigBytes;
		            var blockSize = this.blockSize;
		            var blockSizeBytes = blockSize * 4;

		            // Count blocks ready
		            var nBlocksReady = dataSigBytes / blockSizeBytes;
		            if (doFlush) {
		                // Round up to include partial blocks
		                nBlocksReady = Math.ceil(nBlocksReady);
		            } else {
		                // Round down to include only full blocks,
		                // less the number of blocks that must remain in the buffer
		                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
		            }

		            // Count words ready
		            var nWordsReady = nBlocksReady * blockSize;

		            // Count bytes ready
		            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

		            // Process blocks
		            if (nWordsReady) {
		                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
		                    // Perform concrete-algorithm logic
		                    this._doProcessBlock(dataWords, offset);
		                }

		                // Remove processed words
		                processedWords = dataWords.splice(0, nWordsReady);
		                data.sigBytes -= nBytesReady;
		            }

		            // Return processed words
		            return new WordArray.init(processedWords, nBytesReady);
		        },

		        /**
		         * Creates a copy of this object.
		         *
		         * @return {Object} The clone.
		         *
		         * @example
		         *
		         *     var clone = bufferedBlockAlgorithm.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone._data = this._data.clone();

		            return clone;
		        },

		        _minBufferSize: 0
		    });

		    /**
		     * Abstract hasher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
		     */
		    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
		        /**
		         * Configuration options.
		         */
		        cfg: Base.extend(),

		        /**
		         * Initializes a newly created hasher.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
		         *
		         * @example
		         *
		         *     var hasher = CryptoJS.algo.SHA256.create();
		         */
		        init: function (cfg) {
		            // Apply config defaults
		            this.cfg = this.cfg.extend(cfg);

		            // Set initial values
		            this.reset();
		        },

		        /**
		         * Resets this hasher to its initial state.
		         *
		         * @example
		         *
		         *     hasher.reset();
		         */
		        reset: function () {
		            // Reset data buffer
		            BufferedBlockAlgorithm.reset.call(this);

		            // Perform concrete-hasher logic
		            this._doReset();
		        },

		        /**
		         * Updates this hasher with a message.
		         *
		         * @param {WordArray|string} messageUpdate The message to append.
		         *
		         * @return {Hasher} This hasher.
		         *
		         * @example
		         *
		         *     hasher.update('message');
		         *     hasher.update(wordArray);
		         */
		        update: function (messageUpdate) {
		            // Append
		            this._append(messageUpdate);

		            // Update the hash
		            this._process();

		            // Chainable
		            return this;
		        },

		        /**
		         * Finalizes the hash computation.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} messageUpdate (Optional) A final message update.
		         *
		         * @return {WordArray} The hash.
		         *
		         * @example
		         *
		         *     var hash = hasher.finalize();
		         *     var hash = hasher.finalize('message');
		         *     var hash = hasher.finalize(wordArray);
		         */
		        finalize: function (messageUpdate) {
		            // Final message update
		            if (messageUpdate) {
		                this._append(messageUpdate);
		            }

		            // Perform concrete-hasher logic
		            var hash = this._doFinalize();

		            return hash;
		        },

		        blockSize: 512/32,

		        /**
		         * Creates a shortcut function to a hasher's object interface.
		         *
		         * @param {Hasher} hasher The hasher to create a helper for.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
		         */
		        _createHelper: function (hasher) {
		            return function (message, cfg) {
		                return new hasher.init(cfg).finalize(message);
		            };
		        },

		        /**
		         * Creates a shortcut function to the HMAC's object interface.
		         *
		         * @param {Hasher} hasher The hasher to use in this HMAC helper.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
		         */
		        _createHmacHelper: function (hasher) {
		            return function (message, key) {
		                return new C_algo.HMAC.init(hasher, key).finalize(message);
		            };
		        }
		    });

		    /**
		     * Algorithm namespace.
		     */
		    var C_algo = C.algo = {};

		    return C;
		}(Math));


		return CryptoJS;

	}));
	});

	var x64Core = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (undefined$1) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var X32WordArray = C_lib.WordArray;

		    /**
		     * x64 namespace.
		     */
		    var C_x64 = C.x64 = {};

		    /**
		     * A 64-bit word.
		     */
		    var X64Word = C_x64.Word = Base.extend({
		        /**
		         * Initializes a newly created 64-bit word.
		         *
		         * @param {number} high The high 32 bits.
		         * @param {number} low The low 32 bits.
		         *
		         * @example
		         *
		         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
		         */
		        init: function (high, low) {
		            this.high = high;
		            this.low = low;
		        }

		        /**
		         * Bitwise NOTs this word.
		         *
		         * @return {X64Word} A new x64-Word object after negating.
		         *
		         * @example
		         *
		         *     var negated = x64Word.not();
		         */
		        // not: function () {
		            // var high = ~this.high;
		            // var low = ~this.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Bitwise ANDs this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to AND with this word.
		         *
		         * @return {X64Word} A new x64-Word object after ANDing.
		         *
		         * @example
		         *
		         *     var anded = x64Word.and(anotherX64Word);
		         */
		        // and: function (word) {
		            // var high = this.high & word.high;
		            // var low = this.low & word.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Bitwise ORs this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to OR with this word.
		         *
		         * @return {X64Word} A new x64-Word object after ORing.
		         *
		         * @example
		         *
		         *     var ored = x64Word.or(anotherX64Word);
		         */
		        // or: function (word) {
		            // var high = this.high | word.high;
		            // var low = this.low | word.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Bitwise XORs this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to XOR with this word.
		         *
		         * @return {X64Word} A new x64-Word object after XORing.
		         *
		         * @example
		         *
		         *     var xored = x64Word.xor(anotherX64Word);
		         */
		        // xor: function (word) {
		            // var high = this.high ^ word.high;
		            // var low = this.low ^ word.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Shifts this word n bits to the left.
		         *
		         * @param {number} n The number of bits to shift.
		         *
		         * @return {X64Word} A new x64-Word object after shifting.
		         *
		         * @example
		         *
		         *     var shifted = x64Word.shiftL(25);
		         */
		        // shiftL: function (n) {
		            // if (n < 32) {
		                // var high = (this.high << n) | (this.low >>> (32 - n));
		                // var low = this.low << n;
		            // } else {
		                // var high = this.low << (n - 32);
		                // var low = 0;
		            // }

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Shifts this word n bits to the right.
		         *
		         * @param {number} n The number of bits to shift.
		         *
		         * @return {X64Word} A new x64-Word object after shifting.
		         *
		         * @example
		         *
		         *     var shifted = x64Word.shiftR(7);
		         */
		        // shiftR: function (n) {
		            // if (n < 32) {
		                // var low = (this.low >>> n) | (this.high << (32 - n));
		                // var high = this.high >>> n;
		            // } else {
		                // var low = this.high >>> (n - 32);
		                // var high = 0;
		            // }

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Rotates this word n bits to the left.
		         *
		         * @param {number} n The number of bits to rotate.
		         *
		         * @return {X64Word} A new x64-Word object after rotating.
		         *
		         * @example
		         *
		         *     var rotated = x64Word.rotL(25);
		         */
		        // rotL: function (n) {
		            // return this.shiftL(n).or(this.shiftR(64 - n));
		        // },

		        /**
		         * Rotates this word n bits to the right.
		         *
		         * @param {number} n The number of bits to rotate.
		         *
		         * @return {X64Word} A new x64-Word object after rotating.
		         *
		         * @example
		         *
		         *     var rotated = x64Word.rotR(7);
		         */
		        // rotR: function (n) {
		            // return this.shiftR(n).or(this.shiftL(64 - n));
		        // },

		        /**
		         * Adds this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to add with this word.
		         *
		         * @return {X64Word} A new x64-Word object after adding.
		         *
		         * @example
		         *
		         *     var added = x64Word.add(anotherX64Word);
		         */
		        // add: function (word) {
		            // var low = (this.low + word.low) | 0;
		            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
		            // var high = (this.high + word.high + carry) | 0;

		            // return X64Word.create(high, low);
		        // }
		    });

		    /**
		     * An array of 64-bit words.
		     *
		     * @property {Array} words The array of CryptoJS.x64.Word objects.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    var X64WordArray = C_x64.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.x64.WordArray.create();
		         *
		         *     var wordArray = CryptoJS.x64.WordArray.create([
		         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
		         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
		         *     ]);
		         *
		         *     var wordArray = CryptoJS.x64.WordArray.create([
		         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
		         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
		         *     ], 10);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];

		            if (sigBytes != undefined$1) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 8;
		            }
		        },

		        /**
		         * Converts this 64-bit word array to a 32-bit word array.
		         *
		         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
		         *
		         * @example
		         *
		         *     var x32WordArray = x64WordArray.toX32();
		         */
		        toX32: function () {
		            // Shortcuts
		            var x64Words = this.words;
		            var x64WordsLength = x64Words.length;

		            // Convert
		            var x32Words = [];
		            for (var i = 0; i < x64WordsLength; i++) {
		                var x64Word = x64Words[i];
		                x32Words.push(x64Word.high);
		                x32Words.push(x64Word.low);
		            }

		            return X32WordArray.create(x32Words, this.sigBytes);
		        },

		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {X64WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = x64WordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);

		            // Clone "words" array
		            var words = clone.words = this.words.slice(0);

		            // Clone each X64Word object
		            var wordsLength = words.length;
		            for (var i = 0; i < wordsLength; i++) {
		                words[i] = words[i].clone();
		            }

		            return clone;
		        }
		    });
		}());


		return CryptoJS;

	}));
	});

	var libTypedarrays = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Check if typed arrays are supported
		    if (typeof ArrayBuffer != 'function') {
		        return;
		    }

		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;

		    // Reference original init
		    var superInit = WordArray.init;

		    // Augment WordArray.init to handle typed arrays
		    var subInit = WordArray.init = function (typedArray) {
		        // Convert buffers to uint8
		        if (typedArray instanceof ArrayBuffer) {
		            typedArray = new Uint8Array(typedArray);
		        }

		        // Convert other array views to uint8
		        if (
		            typedArray instanceof Int8Array ||
		            (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
		            typedArray instanceof Int16Array ||
		            typedArray instanceof Uint16Array ||
		            typedArray instanceof Int32Array ||
		            typedArray instanceof Uint32Array ||
		            typedArray instanceof Float32Array ||
		            typedArray instanceof Float64Array
		        ) {
		            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
		        }

		        // Handle Uint8Array
		        if (typedArray instanceof Uint8Array) {
		            // Shortcut
		            var typedArrayByteLength = typedArray.byteLength;

		            // Extract bytes
		            var words = [];
		            for (var i = 0; i < typedArrayByteLength; i++) {
		                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
		            }

		            // Initialize this word array
		            superInit.call(this, words, typedArrayByteLength);
		        } else {
		            // Else call normal init
		            superInit.apply(this, arguments);
		        }
		    };

		    subInit.prototype = WordArray;
		}());


		return CryptoJS.lib.WordArray;

	}));
	});

	var encUtf16 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var C_enc = C.enc;

		    /**
		     * UTF-16 BE encoding strategy.
		     */
		    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
		        /**
		         * Converts a word array to a UTF-16 BE string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-16 BE string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var utf16Chars = [];
		            for (var i = 0; i < sigBytes; i += 2) {
		                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
		                utf16Chars.push(String.fromCharCode(codePoint));
		            }

		            return utf16Chars.join('');
		        },

		        /**
		         * Converts a UTF-16 BE string to a word array.
		         *
		         * @param {string} utf16Str The UTF-16 BE string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
		         */
		        parse: function (utf16Str) {
		            // Shortcut
		            var utf16StrLength = utf16Str.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < utf16StrLength; i++) {
		                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
		            }

		            return WordArray.create(words, utf16StrLength * 2);
		        }
		    };

		    /**
		     * UTF-16 LE encoding strategy.
		     */
		    C_enc.Utf16LE = {
		        /**
		         * Converts a word array to a UTF-16 LE string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-16 LE string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var utf16Chars = [];
		            for (var i = 0; i < sigBytes; i += 2) {
		                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
		                utf16Chars.push(String.fromCharCode(codePoint));
		            }

		            return utf16Chars.join('');
		        },

		        /**
		         * Converts a UTF-16 LE string to a word array.
		         *
		         * @param {string} utf16Str The UTF-16 LE string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
		         */
		        parse: function (utf16Str) {
		            // Shortcut
		            var utf16StrLength = utf16Str.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < utf16StrLength; i++) {
		                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
		            }

		            return WordArray.create(words, utf16StrLength * 2);
		        }
		    };

		    function swapEndian(word) {
		        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
		    }
		}());


		return CryptoJS.enc.Utf16;

	}));
	});

	var encBase64 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var C_enc = C.enc;

		    /**
		     * Base64 encoding strategy.
		     */
		    var Base64 = C_enc.Base64 = {
		        /**
		         * Converts a word array to a Base64 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Base64 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;
		            var map = this._map;

		            // Clamp excess bits
		            wordArray.clamp();

		            // Convert
		            var base64Chars = [];
		            for (var i = 0; i < sigBytes; i += 3) {
		                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
		                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
		                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

		                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

		                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
		                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
		                }
		            }

		            // Add padding
		            var paddingChar = map.charAt(64);
		            if (paddingChar) {
		                while (base64Chars.length % 4) {
		                    base64Chars.push(paddingChar);
		                }
		            }

		            return base64Chars.join('');
		        },

		        /**
		         * Converts a Base64 string to a word array.
		         *
		         * @param {string} base64Str The Base64 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
		         */
		        parse: function (base64Str) {
		            // Shortcuts
		            var base64StrLength = base64Str.length;
		            var map = this._map;
		            var reverseMap = this._reverseMap;

		            if (!reverseMap) {
		                    reverseMap = this._reverseMap = [];
		                    for (var j = 0; j < map.length; j++) {
		                        reverseMap[map.charCodeAt(j)] = j;
		                    }
		            }

		            // Ignore padding
		            var paddingChar = map.charAt(64);
		            if (paddingChar) {
		                var paddingIndex = base64Str.indexOf(paddingChar);
		                if (paddingIndex !== -1) {
		                    base64StrLength = paddingIndex;
		                }
		            }

		            // Convert
		            return parseLoop(base64Str, base64StrLength, reverseMap);

		        },

		        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
		    };

		    function parseLoop(base64Str, base64StrLength, reverseMap) {
		      var words = [];
		      var nBytes = 0;
		      for (var i = 0; i < base64StrLength; i++) {
		          if (i % 4) {
		              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
		              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
		              var bitsCombined = bits1 | bits2;
		              words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
		              nBytes++;
		          }
		      }
		      return WordArray.create(words, nBytes);
		    }
		}());


		return CryptoJS.enc.Base64;

	}));
	});

	var md5 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Constants table
		    var T = [];

		    // Compute constants
		    (function () {
		        for (var i = 0; i < 64; i++) {
		            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
		        }
		    }());

		    /**
		     * MD5 hash algorithm.
		     */
		    var MD5 = C_algo.MD5 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0x67452301, 0xefcdab89,
		                0x98badcfe, 0x10325476
		            ]);
		        },

		        _doProcessBlock: function (M, offset) {
		            // Swap endian
		            for (var i = 0; i < 16; i++) {
		                // Shortcuts
		                var offset_i = offset + i;
		                var M_offset_i = M[offset_i];

		                M[offset_i] = (
		                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
		                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
		                );
		            }

		            // Shortcuts
		            var H = this._hash.words;

		            var M_offset_0  = M[offset + 0];
		            var M_offset_1  = M[offset + 1];
		            var M_offset_2  = M[offset + 2];
		            var M_offset_3  = M[offset + 3];
		            var M_offset_4  = M[offset + 4];
		            var M_offset_5  = M[offset + 5];
		            var M_offset_6  = M[offset + 6];
		            var M_offset_7  = M[offset + 7];
		            var M_offset_8  = M[offset + 8];
		            var M_offset_9  = M[offset + 9];
		            var M_offset_10 = M[offset + 10];
		            var M_offset_11 = M[offset + 11];
		            var M_offset_12 = M[offset + 12];
		            var M_offset_13 = M[offset + 13];
		            var M_offset_14 = M[offset + 14];
		            var M_offset_15 = M[offset + 15];

		            // Working varialbes
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];

		            // Computation
		            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
		            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
		            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
		            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
		            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
		            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
		            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
		            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
		            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
		            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
		            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
		            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
		            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
		            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
		            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
		            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

		            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
		            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
		            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
		            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
		            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
		            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
		            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
		            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
		            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
		            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
		            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
		            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
		            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
		            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
		            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
		            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

		            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
		            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
		            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
		            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
		            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
		            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
		            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
		            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
		            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
		            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
		            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
		            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
		            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
		            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
		            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
		            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

		            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
		            d = II(d, a, b, c, M_offset_7,  10, T[49]);
		            c = II(c, d, a, b, M_offset_14, 15, T[50]);
		            b = II(b, c, d, a, M_offset_5,  21, T[51]);
		            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
		            d = II(d, a, b, c, M_offset_3,  10, T[53]);
		            c = II(c, d, a, b, M_offset_10, 15, T[54]);
		            b = II(b, c, d, a, M_offset_1,  21, T[55]);
		            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
		            d = II(d, a, b, c, M_offset_15, 10, T[57]);
		            c = II(c, d, a, b, M_offset_6,  15, T[58]);
		            b = II(b, c, d, a, M_offset_13, 21, T[59]);
		            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
		            d = II(d, a, b, c, M_offset_11, 10, T[61]);
		            c = II(c, d, a, b, M_offset_2,  15, T[62]);
		            b = II(b, c, d, a, M_offset_9,  21, T[63]);

		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

		            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
		            var nBitsTotalL = nBitsTotal;
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
		                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
		            );
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
		                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
		            );

		            data.sigBytes = (dataWords.length + 1) * 4;

		            // Hash final blocks
		            this._process();

		            // Shortcuts
		            var hash = this._hash;
		            var H = hash.words;

		            // Swap endian
		            for (var i = 0; i < 4; i++) {
		                // Shortcut
		                var H_i = H[i];

		                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
		                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		            }

		            // Return final computed hash
		            return hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });

		    function FF(a, b, c, d, x, s, t) {
		        var n = a + ((b & c) | (~b & d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function GG(a, b, c, d, x, s, t) {
		        var n = a + ((b & d) | (c & ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function HH(a, b, c, d, x, s, t) {
		        var n = a + (b ^ c ^ d) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function II(a, b, c, d, x, s, t) {
		        var n = a + (c ^ (b | ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.MD5('message');
		     *     var hash = CryptoJS.MD5(wordArray);
		     */
		    C.MD5 = Hasher._createHelper(MD5);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacMD5(message, key);
		     */
		    C.HmacMD5 = Hasher._createHmacHelper(MD5);
		}(Math));


		return CryptoJS.MD5;

	}));
	});

	var sha1 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Reusable object
		    var W = [];

		    /**
		     * SHA-1 hash algorithm.
		     */
		    var SHA1 = C_algo.SHA1 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0x67452301, 0xefcdab89,
		                0x98badcfe, 0x10325476,
		                0xc3d2e1f0
		            ]);
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var H = this._hash.words;

		            // Working variables
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];
		            var e = H[4];

		            // Computation
		            for (var i = 0; i < 80; i++) {
		                if (i < 16) {
		                    W[i] = M[offset + i] | 0;
		                } else {
		                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
		                    W[i] = (n << 1) | (n >>> 31);
		                }

		                var t = ((a << 5) | (a >>> 27)) + e + W[i];
		                if (i < 20) {
		                    t += ((b & c) | (~b & d)) + 0x5a827999;
		                } else if (i < 40) {
		                    t += (b ^ c ^ d) + 0x6ed9eba1;
		                } else if (i < 60) {
		                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
		                } else /* if (i < 80) */ {
		                    t += (b ^ c ^ d) - 0x359d3e2a;
		                }

		                e = d;
		                d = c;
		                c = (b << 30) | (b >>> 2);
		                b = a;
		                a = t;
		            }

		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		            H[4] = (H[4] + e) | 0;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
		            data.sigBytes = dataWords.length * 4;

		            // Hash final blocks
		            this._process();

		            // Return final computed hash
		            return this._hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA1('message');
		     *     var hash = CryptoJS.SHA1(wordArray);
		     */
		    C.SHA1 = Hasher._createHelper(SHA1);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA1(message, key);
		     */
		    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
		}());


		return CryptoJS.SHA1;

	}));
	});

	var sha256 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Initialization and round constants tables
		    var H = [];
		    var K = [];

		    // Compute constants
		    (function () {
		        function isPrime(n) {
		            var sqrtN = Math.sqrt(n);
		            for (var factor = 2; factor <= sqrtN; factor++) {
		                if (!(n % factor)) {
		                    return false;
		                }
		            }

		            return true;
		        }

		        function getFractionalBits(n) {
		            return ((n - (n | 0)) * 0x100000000) | 0;
		        }

		        var n = 2;
		        var nPrime = 0;
		        while (nPrime < 64) {
		            if (isPrime(n)) {
		                if (nPrime < 8) {
		                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
		                }
		                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

		                nPrime++;
		            }

		            n++;
		        }
		    }());

		    // Reusable object
		    var W = [];

		    /**
		     * SHA-256 hash algorithm.
		     */
		    var SHA256 = C_algo.SHA256 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init(H.slice(0));
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var H = this._hash.words;

		            // Working variables
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];
		            var e = H[4];
		            var f = H[5];
		            var g = H[6];
		            var h = H[7];

		            // Computation
		            for (var i = 0; i < 64; i++) {
		                if (i < 16) {
		                    W[i] = M[offset + i] | 0;
		                } else {
		                    var gamma0x = W[i - 15];
		                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
		                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
		                                   (gamma0x >>> 3);

		                    var gamma1x = W[i - 2];
		                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
		                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
		                                   (gamma1x >>> 10);

		                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
		                }

		                var ch  = (e & f) ^ (~e & g);
		                var maj = (a & b) ^ (a & c) ^ (b & c);

		                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
		                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

		                var t1 = h + sigma1 + ch + K[i] + W[i];
		                var t2 = sigma0 + maj;

		                h = g;
		                g = f;
		                f = e;
		                e = (d + t1) | 0;
		                d = c;
		                c = b;
		                b = a;
		                a = (t1 + t2) | 0;
		            }

		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		            H[4] = (H[4] + e) | 0;
		            H[5] = (H[5] + f) | 0;
		            H[6] = (H[6] + g) | 0;
		            H[7] = (H[7] + h) | 0;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
		            data.sigBytes = dataWords.length * 4;

		            // Hash final blocks
		            this._process();

		            // Return final computed hash
		            return this._hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA256('message');
		     *     var hash = CryptoJS.SHA256(wordArray);
		     */
		    C.SHA256 = Hasher._createHelper(SHA256);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA256(message, key);
		     */
		    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
		}(Math));


		return CryptoJS.SHA256;

	}));
	});

	var sha224 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, sha256);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var C_algo = C.algo;
		    var SHA256 = C_algo.SHA256;

		    /**
		     * SHA-224 hash algorithm.
		     */
		    var SHA224 = C_algo.SHA224 = SHA256.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
		                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
		            ]);
		        },

		        _doFinalize: function () {
		            var hash = SHA256._doFinalize.call(this);

		            hash.sigBytes -= 4;

		            return hash;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA224('message');
		     *     var hash = CryptoJS.SHA224(wordArray);
		     */
		    C.SHA224 = SHA256._createHelper(SHA224);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA224(message, key);
		     */
		    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
		}());


		return CryptoJS.SHA224;

	}));
	});

	var sha512 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, x64Core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Hasher = C_lib.Hasher;
		    var C_x64 = C.x64;
		    var X64Word = C_x64.Word;
		    var X64WordArray = C_x64.WordArray;
		    var C_algo = C.algo;

		    function X64Word_create() {
		        return X64Word.create.apply(X64Word, arguments);
		    }

		    // Constants
		    var K = [
		        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
		        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
		        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
		        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
		        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
		        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
		        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
		        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
		        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
		        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
		        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
		        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
		        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
		        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
		        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
		        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
		        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
		        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
		        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
		        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
		        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
		        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
		        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
		        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
		        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
		        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
		        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
		        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
		        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
		        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
		        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
		        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
		        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
		        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
		        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
		        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
		        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
		        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
		        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
		        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
		    ];

		    // Reusable objects
		    var W = [];
		    (function () {
		        for (var i = 0; i < 80; i++) {
		            W[i] = X64Word_create();
		        }
		    }());

		    /**
		     * SHA-512 hash algorithm.
		     */
		    var SHA512 = C_algo.SHA512 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new X64WordArray.init([
		                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
		                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
		                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
		                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
		            ]);
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcuts
		            var H = this._hash.words;

		            var H0 = H[0];
		            var H1 = H[1];
		            var H2 = H[2];
		            var H3 = H[3];
		            var H4 = H[4];
		            var H5 = H[5];
		            var H6 = H[6];
		            var H7 = H[7];

		            var H0h = H0.high;
		            var H0l = H0.low;
		            var H1h = H1.high;
		            var H1l = H1.low;
		            var H2h = H2.high;
		            var H2l = H2.low;
		            var H3h = H3.high;
		            var H3l = H3.low;
		            var H4h = H4.high;
		            var H4l = H4.low;
		            var H5h = H5.high;
		            var H5l = H5.low;
		            var H6h = H6.high;
		            var H6l = H6.low;
		            var H7h = H7.high;
		            var H7l = H7.low;

		            // Working variables
		            var ah = H0h;
		            var al = H0l;
		            var bh = H1h;
		            var bl = H1l;
		            var ch = H2h;
		            var cl = H2l;
		            var dh = H3h;
		            var dl = H3l;
		            var eh = H4h;
		            var el = H4l;
		            var fh = H5h;
		            var fl = H5l;
		            var gh = H6h;
		            var gl = H6l;
		            var hh = H7h;
		            var hl = H7l;

		            // Rounds
		            for (var i = 0; i < 80; i++) {
		                var Wil;
		                var Wih;

		                // Shortcut
		                var Wi = W[i];

		                // Extend message
		                if (i < 16) {
		                    Wih = Wi.high = M[offset + i * 2]     | 0;
		                    Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
		                } else {
		                    // Gamma0
		                    var gamma0x  = W[i - 15];
		                    var gamma0xh = gamma0x.high;
		                    var gamma0xl = gamma0x.low;
		                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
		                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

		                    // Gamma1
		                    var gamma1x  = W[i - 2];
		                    var gamma1xh = gamma1x.high;
		                    var gamma1xl = gamma1x.low;
		                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
		                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

		                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
		                    var Wi7  = W[i - 7];
		                    var Wi7h = Wi7.high;
		                    var Wi7l = Wi7.low;

		                    var Wi16  = W[i - 16];
		                    var Wi16h = Wi16.high;
		                    var Wi16l = Wi16.low;

		                    Wil = gamma0l + Wi7l;
		                    Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
		                    Wil = Wil + gamma1l;
		                    Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
		                    Wil = Wil + Wi16l;
		                    Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

		                    Wi.high = Wih;
		                    Wi.low  = Wil;
		                }

		                var chh  = (eh & fh) ^ (~eh & gh);
		                var chl  = (el & fl) ^ (~el & gl);
		                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
		                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

		                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
		                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
		                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
		                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

		                // t1 = h + sigma1 + ch + K[i] + W[i]
		                var Ki  = K[i];
		                var Kih = Ki.high;
		                var Kil = Ki.low;

		                var t1l = hl + sigma1l;
		                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
		                var t1l = t1l + chl;
		                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
		                var t1l = t1l + Kil;
		                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
		                var t1l = t1l + Wil;
		                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

		                // t2 = sigma0 + maj
		                var t2l = sigma0l + majl;
		                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

		                // Update working variables
		                hh = gh;
		                hl = gl;
		                gh = fh;
		                gl = fl;
		                fh = eh;
		                fl = el;
		                el = (dl + t1l) | 0;
		                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
		                dh = ch;
		                dl = cl;
		                ch = bh;
		                cl = bl;
		                bh = ah;
		                bl = al;
		                al = (t1l + t2l) | 0;
		                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
		            }

		            // Intermediate hash value
		            H0l = H0.low  = (H0l + al);
		            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
		            H1l = H1.low  = (H1l + bl);
		            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
		            H2l = H2.low  = (H2l + cl);
		            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
		            H3l = H3.low  = (H3l + dl);
		            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
		            H4l = H4.low  = (H4l + el);
		            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
		            H5l = H5.low  = (H5l + fl);
		            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
		            H6l = H6.low  = (H6l + gl);
		            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
		            H7l = H7.low  = (H7l + hl);
		            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
		            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
		            data.sigBytes = dataWords.length * 4;

		            // Hash final blocks
		            this._process();

		            // Convert hash to 32-bit word array before returning
		            var hash = this._hash.toX32();

		            // Return final computed hash
		            return hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        },

		        blockSize: 1024/32
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA512('message');
		     *     var hash = CryptoJS.SHA512(wordArray);
		     */
		    C.SHA512 = Hasher._createHelper(SHA512);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA512(message, key);
		     */
		    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
		}());


		return CryptoJS.SHA512;

	}));
	});

	var sha384 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, x64Core, sha512);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_x64 = C.x64;
		    var X64Word = C_x64.Word;
		    var X64WordArray = C_x64.WordArray;
		    var C_algo = C.algo;
		    var SHA512 = C_algo.SHA512;

		    /**
		     * SHA-384 hash algorithm.
		     */
		    var SHA384 = C_algo.SHA384 = SHA512.extend({
		        _doReset: function () {
		            this._hash = new X64WordArray.init([
		                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
		                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
		                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
		                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
		            ]);
		        },

		        _doFinalize: function () {
		            var hash = SHA512._doFinalize.call(this);

		            hash.sigBytes -= 16;

		            return hash;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA384('message');
		     *     var hash = CryptoJS.SHA384(wordArray);
		     */
		    C.SHA384 = SHA512._createHelper(SHA384);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA384(message, key);
		     */
		    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
		}());


		return CryptoJS.SHA384;

	}));
	});

	var sha3 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, x64Core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_x64 = C.x64;
		    var X64Word = C_x64.Word;
		    var C_algo = C.algo;

		    // Constants tables
		    var RHO_OFFSETS = [];
		    var PI_INDEXES  = [];
		    var ROUND_CONSTANTS = [];

		    // Compute Constants
		    (function () {
		        // Compute rho offset constants
		        var x = 1, y = 0;
		        for (var t = 0; t < 24; t++) {
		            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;

		            var newX = y % 5;
		            var newY = (2 * x + 3 * y) % 5;
		            x = newX;
		            y = newY;
		        }

		        // Compute pi index constants
		        for (var x = 0; x < 5; x++) {
		            for (var y = 0; y < 5; y++) {
		                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
		            }
		        }

		        // Compute round constants
		        var LFSR = 0x01;
		        for (var i = 0; i < 24; i++) {
		            var roundConstantMsw = 0;
		            var roundConstantLsw = 0;

		            for (var j = 0; j < 7; j++) {
		                if (LFSR & 0x01) {
		                    var bitPosition = (1 << j) - 1;
		                    if (bitPosition < 32) {
		                        roundConstantLsw ^= 1 << bitPosition;
		                    } else /* if (bitPosition >= 32) */ {
		                        roundConstantMsw ^= 1 << (bitPosition - 32);
		                    }
		                }

		                // Compute next LFSR
		                if (LFSR & 0x80) {
		                    // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
		                    LFSR = (LFSR << 1) ^ 0x71;
		                } else {
		                    LFSR <<= 1;
		                }
		            }

		            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
		        }
		    }());

		    // Reusable objects for temporary values
		    var T = [];
		    (function () {
		        for (var i = 0; i < 25; i++) {
		            T[i] = X64Word.create();
		        }
		    }());

		    /**
		     * SHA-3 hash algorithm.
		     */
		    var SHA3 = C_algo.SHA3 = Hasher.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} outputLength
		         *   The desired number of bits in the output hash.
		         *   Only values permitted are: 224, 256, 384, 512.
		         *   Default: 512
		         */
		        cfg: Hasher.cfg.extend({
		            outputLength: 512
		        }),

		        _doReset: function () {
		            var state = this._state = [];
		            for (var i = 0; i < 25; i++) {
		                state[i] = new X64Word.init();
		            }

		            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcuts
		            var state = this._state;
		            var nBlockSizeLanes = this.blockSize / 2;

		            // Absorb
		            for (var i = 0; i < nBlockSizeLanes; i++) {
		                // Shortcuts
		                var M2i  = M[offset + 2 * i];
		                var M2i1 = M[offset + 2 * i + 1];

		                // Swap endian
		                M2i = (
		                    (((M2i << 8)  | (M2i >>> 24)) & 0x00ff00ff) |
		                    (((M2i << 24) | (M2i >>> 8))  & 0xff00ff00)
		                );
		                M2i1 = (
		                    (((M2i1 << 8)  | (M2i1 >>> 24)) & 0x00ff00ff) |
		                    (((M2i1 << 24) | (M2i1 >>> 8))  & 0xff00ff00)
		                );

		                // Absorb message into state
		                var lane = state[i];
		                lane.high ^= M2i1;
		                lane.low  ^= M2i;
		            }

		            // Rounds
		            for (var round = 0; round < 24; round++) {
		                // Theta
		                for (var x = 0; x < 5; x++) {
		                    // Mix column lanes
		                    var tMsw = 0, tLsw = 0;
		                    for (var y = 0; y < 5; y++) {
		                        var lane = state[x + 5 * y];
		                        tMsw ^= lane.high;
		                        tLsw ^= lane.low;
		                    }

		                    // Temporary values
		                    var Tx = T[x];
		                    Tx.high = tMsw;
		                    Tx.low  = tLsw;
		                }
		                for (var x = 0; x < 5; x++) {
		                    // Shortcuts
		                    var Tx4 = T[(x + 4) % 5];
		                    var Tx1 = T[(x + 1) % 5];
		                    var Tx1Msw = Tx1.high;
		                    var Tx1Lsw = Tx1.low;

		                    // Mix surrounding columns
		                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
		                    var tLsw = Tx4.low  ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
		                    for (var y = 0; y < 5; y++) {
		                        var lane = state[x + 5 * y];
		                        lane.high ^= tMsw;
		                        lane.low  ^= tLsw;
		                    }
		                }

		                // Rho Pi
		                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
		                    var tMsw;
		                    var tLsw;

		                    // Shortcuts
		                    var lane = state[laneIndex];
		                    var laneMsw = lane.high;
		                    var laneLsw = lane.low;
		                    var rhoOffset = RHO_OFFSETS[laneIndex];

		                    // Rotate lanes
		                    if (rhoOffset < 32) {
		                        tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
		                        tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
		                    } else /* if (rhoOffset >= 32) */ {
		                        tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
		                        tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
		                    }

		                    // Transpose lanes
		                    var TPiLane = T[PI_INDEXES[laneIndex]];
		                    TPiLane.high = tMsw;
		                    TPiLane.low  = tLsw;
		                }

		                // Rho pi at x = y = 0
		                var T0 = T[0];
		                var state0 = state[0];
		                T0.high = state0.high;
		                T0.low  = state0.low;

		                // Chi
		                for (var x = 0; x < 5; x++) {
		                    for (var y = 0; y < 5; y++) {
		                        // Shortcuts
		                        var laneIndex = x + 5 * y;
		                        var lane = state[laneIndex];
		                        var TLane = T[laneIndex];
		                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];
		                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];

		                        // Mix rows
		                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
		                        lane.low  = TLane.low  ^ (~Tx1Lane.low  & Tx2Lane.low);
		                    }
		                }

		                // Iota
		                var lane = state[0];
		                var roundConstant = ROUND_CONSTANTS[round];
		                lane.high ^= roundConstant.high;
		                lane.low  ^= roundConstant.low;
		            }
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;
		            var blockSizeBits = this.blockSize * 32;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
		            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
		            data.sigBytes = dataWords.length * 4;

		            // Hash final blocks
		            this._process();

		            // Shortcuts
		            var state = this._state;
		            var outputLengthBytes = this.cfg.outputLength / 8;
		            var outputLengthLanes = outputLengthBytes / 8;

		            // Squeeze
		            var hashWords = [];
		            for (var i = 0; i < outputLengthLanes; i++) {
		                // Shortcuts
		                var lane = state[i];
		                var laneMsw = lane.high;
		                var laneLsw = lane.low;

		                // Swap endian
		                laneMsw = (
		                    (((laneMsw << 8)  | (laneMsw >>> 24)) & 0x00ff00ff) |
		                    (((laneMsw << 24) | (laneMsw >>> 8))  & 0xff00ff00)
		                );
		                laneLsw = (
		                    (((laneLsw << 8)  | (laneLsw >>> 24)) & 0x00ff00ff) |
		                    (((laneLsw << 24) | (laneLsw >>> 8))  & 0xff00ff00)
		                );

		                // Squeeze state to retrieve hash
		                hashWords.push(laneLsw);
		                hashWords.push(laneMsw);
		            }

		            // Return final computed hash
		            return new WordArray.init(hashWords, outputLengthBytes);
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);

		            var state = clone._state = this._state.slice(0);
		            for (var i = 0; i < 25; i++) {
		                state[i] = state[i].clone();
		            }

		            return clone;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA3('message');
		     *     var hash = CryptoJS.SHA3(wordArray);
		     */
		    C.SHA3 = Hasher._createHelper(SHA3);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA3(message, key);
		     */
		    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
		}(Math));


		return CryptoJS.SHA3;

	}));
	});

	var ripemd160 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/** @preserve
		(c) 2012 by Cédric Mesnil. All rights reserved.

		Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

		    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
		    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

		THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		*/

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Constants table
		    var _zl = WordArray.create([
		        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
		        7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
		        3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
		        1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
		        4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13]);
		    var _zr = WordArray.create([
		        5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
		        6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
		        15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
		        8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
		        12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11]);
		    var _sl = WordArray.create([
		         11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
		        7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
		        11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
		          11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
		        9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ]);
		    var _sr = WordArray.create([
		        8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
		        9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
		        9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
		        15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
		        8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ]);

		    var _hl =  WordArray.create([ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
		    var _hr =  WordArray.create([ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

		    /**
		     * RIPEMD160 hash algorithm.
		     */
		    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
		        _doReset: function () {
		            this._hash  = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
		        },

		        _doProcessBlock: function (M, offset) {

		            // Swap endian
		            for (var i = 0; i < 16; i++) {
		                // Shortcuts
		                var offset_i = offset + i;
		                var M_offset_i = M[offset_i];

		                // Swap
		                M[offset_i] = (
		                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
		                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
		                );
		            }
		            // Shortcut
		            var H  = this._hash.words;
		            var hl = _hl.words;
		            var hr = _hr.words;
		            var zl = _zl.words;
		            var zr = _zr.words;
		            var sl = _sl.words;
		            var sr = _sr.words;

		            // Working variables
		            var al, bl, cl, dl, el;
		            var ar, br, cr, dr, er;

		            ar = al = H[0];
		            br = bl = H[1];
		            cr = cl = H[2];
		            dr = dl = H[3];
		            er = el = H[4];
		            // Computation
		            var t;
		            for (var i = 0; i < 80; i += 1) {
		                t = (al +  M[offset+zl[i]])|0;
		                if (i<16){
			            t +=  f1(bl,cl,dl) + hl[0];
		                } else if (i<32) {
			            t +=  f2(bl,cl,dl) + hl[1];
		                } else if (i<48) {
			            t +=  f3(bl,cl,dl) + hl[2];
		                } else if (i<64) {
			            t +=  f4(bl,cl,dl) + hl[3];
		                } else {// if (i<80) {
			            t +=  f5(bl,cl,dl) + hl[4];
		                }
		                t = t|0;
		                t =  rotl(t,sl[i]);
		                t = (t+el)|0;
		                al = el;
		                el = dl;
		                dl = rotl(cl, 10);
		                cl = bl;
		                bl = t;

		                t = (ar + M[offset+zr[i]])|0;
		                if (i<16){
			            t +=  f5(br,cr,dr) + hr[0];
		                } else if (i<32) {
			            t +=  f4(br,cr,dr) + hr[1];
		                } else if (i<48) {
			            t +=  f3(br,cr,dr) + hr[2];
		                } else if (i<64) {
			            t +=  f2(br,cr,dr) + hr[3];
		                } else {// if (i<80) {
			            t +=  f1(br,cr,dr) + hr[4];
		                }
		                t = t|0;
		                t =  rotl(t,sr[i]) ;
		                t = (t+er)|0;
		                ar = er;
		                er = dr;
		                dr = rotl(cr, 10);
		                cr = br;
		                br = t;
		            }
		            // Intermediate hash value
		            t    = (H[1] + cl + dr)|0;
		            H[1] = (H[2] + dl + er)|0;
		            H[2] = (H[3] + el + ar)|0;
		            H[3] = (H[4] + al + br)|0;
		            H[4] = (H[0] + bl + cr)|0;
		            H[0] =  t;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
		                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
		            );
		            data.sigBytes = (dataWords.length + 1) * 4;

		            // Hash final blocks
		            this._process();

		            // Shortcuts
		            var hash = this._hash;
		            var H = hash.words;

		            // Swap endian
		            for (var i = 0; i < 5; i++) {
		                // Shortcut
		                var H_i = H[i];

		                // Swap
		                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
		                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		            }

		            // Return final computed hash
		            return hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });


		    function f1(x, y, z) {
		        return ((x) ^ (y) ^ (z));

		    }

		    function f2(x, y, z) {
		        return (((x)&(y)) | ((~x)&(z)));
		    }

		    function f3(x, y, z) {
		        return (((x) | (~(y))) ^ (z));
		    }

		    function f4(x, y, z) {
		        return (((x) & (z)) | ((y)&(~(z))));
		    }

		    function f5(x, y, z) {
		        return ((x) ^ ((y) |(~(z))));

		    }

		    function rotl(x,n) {
		        return (x<<n) | (x>>>(32-n));
		    }


		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.RIPEMD160('message');
		     *     var hash = CryptoJS.RIPEMD160(wordArray);
		     */
		    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
		     */
		    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
		}());


		return CryptoJS.RIPEMD160;

	}));
	});

	var hmac = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var C_enc = C.enc;
		    var Utf8 = C_enc.Utf8;
		    var C_algo = C.algo;

		    /**
		     * HMAC algorithm.
		     */
		    var HMAC = C_algo.HMAC = Base.extend({
		        /**
		         * Initializes a newly created HMAC.
		         *
		         * @param {Hasher} hasher The hash algorithm to use.
		         * @param {WordArray|string} key The secret key.
		         *
		         * @example
		         *
		         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
		         */
		        init: function (hasher, key) {
		            // Init hasher
		            hasher = this._hasher = new hasher.init();

		            // Convert string to WordArray, else assume WordArray already
		            if (typeof key == 'string') {
		                key = Utf8.parse(key);
		            }

		            // Shortcuts
		            var hasherBlockSize = hasher.blockSize;
		            var hasherBlockSizeBytes = hasherBlockSize * 4;

		            // Allow arbitrary length keys
		            if (key.sigBytes > hasherBlockSizeBytes) {
		                key = hasher.finalize(key);
		            }

		            // Clamp excess bits
		            key.clamp();

		            // Clone key for inner and outer pads
		            var oKey = this._oKey = key.clone();
		            var iKey = this._iKey = key.clone();

		            // Shortcuts
		            var oKeyWords = oKey.words;
		            var iKeyWords = iKey.words;

		            // XOR keys with pad constants
		            for (var i = 0; i < hasherBlockSize; i++) {
		                oKeyWords[i] ^= 0x5c5c5c5c;
		                iKeyWords[i] ^= 0x36363636;
		            }
		            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

		            // Set initial values
		            this.reset();
		        },

		        /**
		         * Resets this HMAC to its initial state.
		         *
		         * @example
		         *
		         *     hmacHasher.reset();
		         */
		        reset: function () {
		            // Shortcut
		            var hasher = this._hasher;

		            // Reset
		            hasher.reset();
		            hasher.update(this._iKey);
		        },

		        /**
		         * Updates this HMAC with a message.
		         *
		         * @param {WordArray|string} messageUpdate The message to append.
		         *
		         * @return {HMAC} This HMAC instance.
		         *
		         * @example
		         *
		         *     hmacHasher.update('message');
		         *     hmacHasher.update(wordArray);
		         */
		        update: function (messageUpdate) {
		            this._hasher.update(messageUpdate);

		            // Chainable
		            return this;
		        },

		        /**
		         * Finalizes the HMAC computation.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} messageUpdate (Optional) A final message update.
		         *
		         * @return {WordArray} The HMAC.
		         *
		         * @example
		         *
		         *     var hmac = hmacHasher.finalize();
		         *     var hmac = hmacHasher.finalize('message');
		         *     var hmac = hmacHasher.finalize(wordArray);
		         */
		        finalize: function (messageUpdate) {
		            // Shortcut
		            var hasher = this._hasher;

		            // Compute HMAC
		            var innerHash = hasher.finalize(messageUpdate);
		            hasher.reset();
		            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

		            return hmac;
		        }
		    });
		}());


	}));
	});

	var pbkdf2 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, sha1, hmac);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var WordArray = C_lib.WordArray;
		    var C_algo = C.algo;
		    var SHA1 = C_algo.SHA1;
		    var HMAC = C_algo.HMAC;

		    /**
		     * Password-Based Key Derivation Function 2 algorithm.
		     */
		    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
		         * @property {Hasher} hasher The hasher to use. Default: SHA1
		         * @property {number} iterations The number of iterations to perform. Default: 1
		         */
		        cfg: Base.extend({
		            keySize: 128/32,
		            hasher: SHA1,
		            iterations: 1
		        }),

		        /**
		         * Initializes a newly created key derivation function.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
		         *
		         * @example
		         *
		         *     var kdf = CryptoJS.algo.PBKDF2.create();
		         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
		         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
		         */
		        init: function (cfg) {
		            this.cfg = this.cfg.extend(cfg);
		        },

		        /**
		         * Computes the Password-Based Key Derivation Function 2.
		         *
		         * @param {WordArray|string} password The password.
		         * @param {WordArray|string} salt A salt.
		         *
		         * @return {WordArray} The derived key.
		         *
		         * @example
		         *
		         *     var key = kdf.compute(password, salt);
		         */
		        compute: function (password, salt) {
		            // Shortcut
		            var cfg = this.cfg;

		            // Init HMAC
		            var hmac = HMAC.create(cfg.hasher, password);

		            // Initial values
		            var derivedKey = WordArray.create();
		            var blockIndex = WordArray.create([0x00000001]);

		            // Shortcuts
		            var derivedKeyWords = derivedKey.words;
		            var blockIndexWords = blockIndex.words;
		            var keySize = cfg.keySize;
		            var iterations = cfg.iterations;

		            // Generate key
		            while (derivedKeyWords.length < keySize) {
		                var block = hmac.update(salt).finalize(blockIndex);
		                hmac.reset();

		                // Shortcuts
		                var blockWords = block.words;
		                var blockWordsLength = blockWords.length;

		                // Iterations
		                var intermediate = block;
		                for (var i = 1; i < iterations; i++) {
		                    intermediate = hmac.finalize(intermediate);
		                    hmac.reset();

		                    // Shortcut
		                    var intermediateWords = intermediate.words;

		                    // XOR intermediate with block
		                    for (var j = 0; j < blockWordsLength; j++) {
		                        blockWords[j] ^= intermediateWords[j];
		                    }
		                }

		                derivedKey.concat(block);
		                blockIndexWords[0]++;
		            }
		            derivedKey.sigBytes = keySize * 4;

		            return derivedKey;
		        }
		    });

		    /**
		     * Computes the Password-Based Key Derivation Function 2.
		     *
		     * @param {WordArray|string} password The password.
		     * @param {WordArray|string} salt A salt.
		     * @param {Object} cfg (Optional) The configuration options to use for this computation.
		     *
		     * @return {WordArray} The derived key.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var key = CryptoJS.PBKDF2(password, salt);
		     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
		     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
		     */
		    C.PBKDF2 = function (password, salt, cfg) {
		        return PBKDF2.create(cfg).compute(password, salt);
		    };
		}());


		return CryptoJS.PBKDF2;

	}));
	});

	var evpkdf = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, sha1, hmac);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var WordArray = C_lib.WordArray;
		    var C_algo = C.algo;
		    var MD5 = C_algo.MD5;

		    /**
		     * This key derivation function is meant to conform with EVP_BytesToKey.
		     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
		     */
		    var EvpKDF = C_algo.EvpKDF = Base.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
		         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
		         * @property {number} iterations The number of iterations to perform. Default: 1
		         */
		        cfg: Base.extend({
		            keySize: 128/32,
		            hasher: MD5,
		            iterations: 1
		        }),

		        /**
		         * Initializes a newly created key derivation function.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
		         *
		         * @example
		         *
		         *     var kdf = CryptoJS.algo.EvpKDF.create();
		         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
		         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
		         */
		        init: function (cfg) {
		            this.cfg = this.cfg.extend(cfg);
		        },

		        /**
		         * Derives a key from a password.
		         *
		         * @param {WordArray|string} password The password.
		         * @param {WordArray|string} salt A salt.
		         *
		         * @return {WordArray} The derived key.
		         *
		         * @example
		         *
		         *     var key = kdf.compute(password, salt);
		         */
		        compute: function (password, salt) {
		            var block;

		            // Shortcut
		            var cfg = this.cfg;

		            // Init hasher
		            var hasher = cfg.hasher.create();

		            // Initial values
		            var derivedKey = WordArray.create();

		            // Shortcuts
		            var derivedKeyWords = derivedKey.words;
		            var keySize = cfg.keySize;
		            var iterations = cfg.iterations;

		            // Generate key
		            while (derivedKeyWords.length < keySize) {
		                if (block) {
		                    hasher.update(block);
		                }
		                block = hasher.update(password).finalize(salt);
		                hasher.reset();

		                // Iterations
		                for (var i = 1; i < iterations; i++) {
		                    block = hasher.finalize(block);
		                    hasher.reset();
		                }

		                derivedKey.concat(block);
		            }
		            derivedKey.sigBytes = keySize * 4;

		            return derivedKey;
		        }
		    });

		    /**
		     * Derives a key from a password.
		     *
		     * @param {WordArray|string} password The password.
		     * @param {WordArray|string} salt A salt.
		     * @param {Object} cfg (Optional) The configuration options to use for this computation.
		     *
		     * @return {WordArray} The derived key.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var key = CryptoJS.EvpKDF(password, salt);
		     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
		     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
		     */
		    C.EvpKDF = function (password, salt, cfg) {
		        return EvpKDF.create(cfg).compute(password, salt);
		    };
		}());


		return CryptoJS.EvpKDF;

	}));
	});

	var cipherCore = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, evpkdf);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Cipher core components.
		 */
		CryptoJS.lib.Cipher || (function (undefined$1) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var WordArray = C_lib.WordArray;
		    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
		    var C_enc = C.enc;
		    var Utf8 = C_enc.Utf8;
		    var Base64 = C_enc.Base64;
		    var C_algo = C.algo;
		    var EvpKDF = C_algo.EvpKDF;

		    /**
		     * Abstract base cipher template.
		     *
		     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
		     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
		     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
		     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
		     */
		    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {WordArray} iv The IV to use for this operation.
		         */
		        cfg: Base.extend(),

		        /**
		         * Creates this cipher in encryption mode.
		         *
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {Cipher} A cipher instance.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
		         */
		        createEncryptor: function (key, cfg) {
		            return this.create(this._ENC_XFORM_MODE, key, cfg);
		        },

		        /**
		         * Creates this cipher in decryption mode.
		         *
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {Cipher} A cipher instance.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
		         */
		        createDecryptor: function (key, cfg) {
		            return this.create(this._DEC_XFORM_MODE, key, cfg);
		        },

		        /**
		         * Initializes a newly created cipher.
		         *
		         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @example
		         *
		         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
		         */
		        init: function (xformMode, key, cfg) {
		            // Apply config defaults
		            this.cfg = this.cfg.extend(cfg);

		            // Store transform mode and key
		            this._xformMode = xformMode;
		            this._key = key;

		            // Set initial values
		            this.reset();
		        },

		        /**
		         * Resets this cipher to its initial state.
		         *
		         * @example
		         *
		         *     cipher.reset();
		         */
		        reset: function () {
		            // Reset data buffer
		            BufferedBlockAlgorithm.reset.call(this);

		            // Perform concrete-cipher logic
		            this._doReset();
		        },

		        /**
		         * Adds data to be encrypted or decrypted.
		         *
		         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
		         *
		         * @return {WordArray} The data after processing.
		         *
		         * @example
		         *
		         *     var encrypted = cipher.process('data');
		         *     var encrypted = cipher.process(wordArray);
		         */
		        process: function (dataUpdate) {
		            // Append
		            this._append(dataUpdate);

		            // Process available blocks
		            return this._process();
		        },

		        /**
		         * Finalizes the encryption or decryption process.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
		         *
		         * @return {WordArray} The data after final processing.
		         *
		         * @example
		         *
		         *     var encrypted = cipher.finalize();
		         *     var encrypted = cipher.finalize('data');
		         *     var encrypted = cipher.finalize(wordArray);
		         */
		        finalize: function (dataUpdate) {
		            // Final data update
		            if (dataUpdate) {
		                this._append(dataUpdate);
		            }

		            // Perform concrete-cipher logic
		            var finalProcessedData = this._doFinalize();

		            return finalProcessedData;
		        },

		        keySize: 128/32,

		        ivSize: 128/32,

		        _ENC_XFORM_MODE: 1,

		        _DEC_XFORM_MODE: 2,

		        /**
		         * Creates shortcut functions to a cipher's object interface.
		         *
		         * @param {Cipher} cipher The cipher to create a helper for.
		         *
		         * @return {Object} An object with encrypt and decrypt shortcut functions.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
		         */
		        _createHelper: (function () {
		            function selectCipherStrategy(key) {
		                if (typeof key == 'string') {
		                    return PasswordBasedCipher;
		                } else {
		                    return SerializableCipher;
		                }
		            }

		            return function (cipher) {
		                return {
		                    encrypt: function (message, key, cfg) {
		                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
		                    },

		                    decrypt: function (ciphertext, key, cfg) {
		                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
		                    }
		                };
		            };
		        }())
		    });

		    /**
		     * Abstract base stream cipher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
		     */
		    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
		        _doFinalize: function () {
		            // Process partial blocks
		            var finalProcessedBlocks = this._process(!!'flush');

		            return finalProcessedBlocks;
		        },

		        blockSize: 1
		    });

		    /**
		     * Mode namespace.
		     */
		    var C_mode = C.mode = {};

		    /**
		     * Abstract base block cipher mode template.
		     */
		    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
		        /**
		         * Creates this mode for encryption.
		         *
		         * @param {Cipher} cipher A block cipher instance.
		         * @param {Array} iv The IV words.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
		         */
		        createEncryptor: function (cipher, iv) {
		            return this.Encryptor.create(cipher, iv);
		        },

		        /**
		         * Creates this mode for decryption.
		         *
		         * @param {Cipher} cipher A block cipher instance.
		         * @param {Array} iv The IV words.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
		         */
		        createDecryptor: function (cipher, iv) {
		            return this.Decryptor.create(cipher, iv);
		        },

		        /**
		         * Initializes a newly created mode.
		         *
		         * @param {Cipher} cipher A block cipher instance.
		         * @param {Array} iv The IV words.
		         *
		         * @example
		         *
		         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
		         */
		        init: function (cipher, iv) {
		            this._cipher = cipher;
		            this._iv = iv;
		        }
		    });

		    /**
		     * Cipher Block Chaining mode.
		     */
		    var CBC = C_mode.CBC = (function () {
		        /**
		         * Abstract base CBC mode.
		         */
		        var CBC = BlockCipherMode.extend();

		        /**
		         * CBC encryptor.
		         */
		        CBC.Encryptor = CBC.extend({
		            /**
		             * Processes the data block at offset.
		             *
		             * @param {Array} words The data words to operate on.
		             * @param {number} offset The offset where the block starts.
		             *
		             * @example
		             *
		             *     mode.processBlock(data.words, offset);
		             */
		            processBlock: function (words, offset) {
		                // Shortcuts
		                var cipher = this._cipher;
		                var blockSize = cipher.blockSize;

		                // XOR and encrypt
		                xorBlock.call(this, words, offset, blockSize);
		                cipher.encryptBlock(words, offset);

		                // Remember this block to use with next block
		                this._prevBlock = words.slice(offset, offset + blockSize);
		            }
		        });

		        /**
		         * CBC decryptor.
		         */
		        CBC.Decryptor = CBC.extend({
		            /**
		             * Processes the data block at offset.
		             *
		             * @param {Array} words The data words to operate on.
		             * @param {number} offset The offset where the block starts.
		             *
		             * @example
		             *
		             *     mode.processBlock(data.words, offset);
		             */
		            processBlock: function (words, offset) {
		                // Shortcuts
		                var cipher = this._cipher;
		                var blockSize = cipher.blockSize;

		                // Remember this block to use with next block
		                var thisBlock = words.slice(offset, offset + blockSize);

		                // Decrypt and XOR
		                cipher.decryptBlock(words, offset);
		                xorBlock.call(this, words, offset, blockSize);

		                // This block becomes the previous block
		                this._prevBlock = thisBlock;
		            }
		        });

		        function xorBlock(words, offset, blockSize) {
		            var block;

		            // Shortcut
		            var iv = this._iv;

		            // Choose mixing block
		            if (iv) {
		                block = iv;

		                // Remove IV for subsequent blocks
		                this._iv = undefined$1;
		            } else {
		                block = this._prevBlock;
		            }

		            // XOR blocks
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= block[i];
		            }
		        }

		        return CBC;
		    }());

		    /**
		     * Padding namespace.
		     */
		    var C_pad = C.pad = {};

		    /**
		     * PKCS #5/7 padding strategy.
		     */
		    var Pkcs7 = C_pad.Pkcs7 = {
		        /**
		         * Pads data using the algorithm defined in PKCS #5/7.
		         *
		         * @param {WordArray} data The data to pad.
		         * @param {number} blockSize The multiple that the data should be padded to.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
		         */
		        pad: function (data, blockSize) {
		            // Shortcut
		            var blockSizeBytes = blockSize * 4;

		            // Count padding bytes
		            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

		            // Create padding word
		            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

		            // Create padding
		            var paddingWords = [];
		            for (var i = 0; i < nPaddingBytes; i += 4) {
		                paddingWords.push(paddingWord);
		            }
		            var padding = WordArray.create(paddingWords, nPaddingBytes);

		            // Add padding
		            data.concat(padding);
		        },

		        /**
		         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
		         *
		         * @param {WordArray} data The data to unpad.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
		         */
		        unpad: function (data) {
		            // Get number of padding bytes from last byte
		            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

		            // Remove padding
		            data.sigBytes -= nPaddingBytes;
		        }
		    };

		    /**
		     * Abstract base block cipher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
		     */
		    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {Mode} mode The block mode to use. Default: CBC
		         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
		         */
		        cfg: Cipher.cfg.extend({
		            mode: CBC,
		            padding: Pkcs7
		        }),

		        reset: function () {
		            var modeCreator;

		            // Reset cipher
		            Cipher.reset.call(this);

		            // Shortcuts
		            var cfg = this.cfg;
		            var iv = cfg.iv;
		            var mode = cfg.mode;

		            // Reset block mode
		            if (this._xformMode == this._ENC_XFORM_MODE) {
		                modeCreator = mode.createEncryptor;
		            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
		                modeCreator = mode.createDecryptor;
		                // Keep at least one block in the buffer for unpadding
		                this._minBufferSize = 1;
		            }

		            if (this._mode && this._mode.__creator == modeCreator) {
		                this._mode.init(this, iv && iv.words);
		            } else {
		                this._mode = modeCreator.call(mode, this, iv && iv.words);
		                this._mode.__creator = modeCreator;
		            }
		        },

		        _doProcessBlock: function (words, offset) {
		            this._mode.processBlock(words, offset);
		        },

		        _doFinalize: function () {
		            var finalProcessedBlocks;

		            // Shortcut
		            var padding = this.cfg.padding;

		            // Finalize
		            if (this._xformMode == this._ENC_XFORM_MODE) {
		                // Pad data
		                padding.pad(this._data, this.blockSize);

		                // Process final blocks
		                finalProcessedBlocks = this._process(!!'flush');
		            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
		                // Process final blocks
		                finalProcessedBlocks = this._process(!!'flush');

		                // Unpad data
		                padding.unpad(finalProcessedBlocks);
		            }

		            return finalProcessedBlocks;
		        },

		        blockSize: 128/32
		    });

		    /**
		     * A collection of cipher parameters.
		     *
		     * @property {WordArray} ciphertext The raw ciphertext.
		     * @property {WordArray} key The key to this ciphertext.
		     * @property {WordArray} iv The IV used in the ciphering operation.
		     * @property {WordArray} salt The salt used with a key derivation function.
		     * @property {Cipher} algorithm The cipher algorithm.
		     * @property {Mode} mode The block mode used in the ciphering operation.
		     * @property {Padding} padding The padding scheme used in the ciphering operation.
		     * @property {number} blockSize The block size of the cipher.
		     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
		     */
		    var CipherParams = C_lib.CipherParams = Base.extend({
		        /**
		         * Initializes a newly created cipher params object.
		         *
		         * @param {Object} cipherParams An object with any of the possible cipher parameters.
		         *
		         * @example
		         *
		         *     var cipherParams = CryptoJS.lib.CipherParams.create({
		         *         ciphertext: ciphertextWordArray,
		         *         key: keyWordArray,
		         *         iv: ivWordArray,
		         *         salt: saltWordArray,
		         *         algorithm: CryptoJS.algo.AES,
		         *         mode: CryptoJS.mode.CBC,
		         *         padding: CryptoJS.pad.PKCS7,
		         *         blockSize: 4,
		         *         formatter: CryptoJS.format.OpenSSL
		         *     });
		         */
		        init: function (cipherParams) {
		            this.mixIn(cipherParams);
		        },

		        /**
		         * Converts this cipher params object to a string.
		         *
		         * @param {Format} formatter (Optional) The formatting strategy to use.
		         *
		         * @return {string} The stringified cipher params.
		         *
		         * @throws Error If neither the formatter nor the default formatter is set.
		         *
		         * @example
		         *
		         *     var string = cipherParams + '';
		         *     var string = cipherParams.toString();
		         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
		         */
		        toString: function (formatter) {
		            return (formatter || this.formatter).stringify(this);
		        }
		    });

		    /**
		     * Format namespace.
		     */
		    var C_format = C.format = {};

		    /**
		     * OpenSSL formatting strategy.
		     */
		    var OpenSSLFormatter = C_format.OpenSSL = {
		        /**
		         * Converts a cipher params object to an OpenSSL-compatible string.
		         *
		         * @param {CipherParams} cipherParams The cipher params object.
		         *
		         * @return {string} The OpenSSL-compatible string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
		         */
		        stringify: function (cipherParams) {
		            var wordArray;

		            // Shortcuts
		            var ciphertext = cipherParams.ciphertext;
		            var salt = cipherParams.salt;

		            // Format
		            if (salt) {
		                wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
		            } else {
		                wordArray = ciphertext;
		            }

		            return wordArray.toString(Base64);
		        },

		        /**
		         * Converts an OpenSSL-compatible string to a cipher params object.
		         *
		         * @param {string} openSSLStr The OpenSSL-compatible string.
		         *
		         * @return {CipherParams} The cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
		         */
		        parse: function (openSSLStr) {
		            var salt;

		            // Parse base64
		            var ciphertext = Base64.parse(openSSLStr);

		            // Shortcut
		            var ciphertextWords = ciphertext.words;

		            // Test for salt
		            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
		                // Extract salt
		                salt = WordArray.create(ciphertextWords.slice(2, 4));

		                // Remove salt from ciphertext
		                ciphertextWords.splice(0, 4);
		                ciphertext.sigBytes -= 16;
		            }

		            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
		        }
		    };

		    /**
		     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
		     */
		    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
		         */
		        cfg: Base.extend({
		            format: OpenSSLFormatter
		        }),

		        /**
		         * Encrypts a message.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {WordArray|string} message The message to encrypt.
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {CipherParams} A cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
		         */
		        encrypt: function (cipher, message, key, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);

		            // Encrypt
		            var encryptor = cipher.createEncryptor(key, cfg);
		            var ciphertext = encryptor.finalize(message);

		            // Shortcut
		            var cipherCfg = encryptor.cfg;

		            // Create and return serializable cipher params
		            return CipherParams.create({
		                ciphertext: ciphertext,
		                key: key,
		                iv: cipherCfg.iv,
		                algorithm: cipher,
		                mode: cipherCfg.mode,
		                padding: cipherCfg.padding,
		                blockSize: cipher.blockSize,
		                formatter: cfg.format
		            });
		        },

		        /**
		         * Decrypts serialized ciphertext.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {WordArray} The plaintext.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
		         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
		         */
		        decrypt: function (cipher, ciphertext, key, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);

		            // Convert string to CipherParams
		            ciphertext = this._parse(ciphertext, cfg.format);

		            // Decrypt
		            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

		            return plaintext;
		        },

		        /**
		         * Converts serialized ciphertext to CipherParams,
		         * else assumed CipherParams already and returns ciphertext unchanged.
		         *
		         * @param {CipherParams|string} ciphertext The ciphertext.
		         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
		         *
		         * @return {CipherParams} The unserialized ciphertext.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
		         */
		        _parse: function (ciphertext, format) {
		            if (typeof ciphertext == 'string') {
		                return format.parse(ciphertext, this);
		            } else {
		                return ciphertext;
		            }
		        }
		    });

		    /**
		     * Key derivation function namespace.
		     */
		    var C_kdf = C.kdf = {};

		    /**
		     * OpenSSL key derivation function.
		     */
		    var OpenSSLKdf = C_kdf.OpenSSL = {
		        /**
		         * Derives a key and IV from a password.
		         *
		         * @param {string} password The password to derive from.
		         * @param {number} keySize The size in words of the key to generate.
		         * @param {number} ivSize The size in words of the IV to generate.
		         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
		         *
		         * @return {CipherParams} A cipher params object with the key, IV, and salt.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
		         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
		         */
		        execute: function (password, keySize, ivSize, salt) {
		            // Generate random salt
		            if (!salt) {
		                salt = WordArray.random(64/8);
		            }

		            // Derive key and IV
		            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

		            // Separate key and IV
		            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
		            key.sigBytes = keySize * 4;

		            // Return params
		            return CipherParams.create({ key: key, iv: iv, salt: salt });
		        }
		    };

		    /**
		     * A serializable cipher wrapper that derives the key from a password,
		     * and returns ciphertext as a serializable cipher params object.
		     */
		    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
		         */
		        cfg: SerializableCipher.cfg.extend({
		            kdf: OpenSSLKdf
		        }),

		        /**
		         * Encrypts a message using a password.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {WordArray|string} message The message to encrypt.
		         * @param {string} password The password.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {CipherParams} A cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
		         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
		         */
		        encrypt: function (cipher, message, password, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);

		            // Derive key and other params
		            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

		            // Add IV to config
		            cfg.iv = derivedParams.iv;

		            // Encrypt
		            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

		            // Mix in derived params
		            ciphertext.mixIn(derivedParams);

		            return ciphertext;
		        },

		        /**
		         * Decrypts serialized ciphertext using a password.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
		         * @param {string} password The password.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {WordArray} The plaintext.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
		         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
		         */
		        decrypt: function (cipher, ciphertext, password, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);

		            // Convert string to CipherParams
		            ciphertext = this._parse(ciphertext, cfg.format);

		            // Derive key and other params
		            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

		            // Add IV to config
		            cfg.iv = derivedParams.iv;

		            // Decrypt
		            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

		            return plaintext;
		        }
		    });
		}());


	}));
	});

	var modeCfb = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Cipher Feedback block mode.
		 */
		CryptoJS.mode.CFB = (function () {
		    var CFB = CryptoJS.lib.BlockCipherMode.extend();

		    CFB.Encryptor = CFB.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;

		            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

		            // Remember this block to use with next block
		            this._prevBlock = words.slice(offset, offset + blockSize);
		        }
		    });

		    CFB.Decryptor = CFB.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;

		            // Remember this block to use with next block
		            var thisBlock = words.slice(offset, offset + blockSize);

		            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

		            // This block becomes the previous block
		            this._prevBlock = thisBlock;
		        }
		    });

		    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
		        var keystream;

		        // Shortcut
		        var iv = this._iv;

		        // Generate keystream
		        if (iv) {
		            keystream = iv.slice(0);

		            // Remove IV for subsequent blocks
		            this._iv = undefined;
		        } else {
		            keystream = this._prevBlock;
		        }
		        cipher.encryptBlock(keystream, 0);

		        // Encrypt
		        for (var i = 0; i < blockSize; i++) {
		            words[offset + i] ^= keystream[i];
		        }
		    }

		    return CFB;
		}());


		return CryptoJS.mode.CFB;

	}));
	});

	var modeCtr = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Counter block mode.
		 */
		CryptoJS.mode.CTR = (function () {
		    var CTR = CryptoJS.lib.BlockCipherMode.extend();

		    var Encryptor = CTR.Encryptor = CTR.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;
		            var iv = this._iv;
		            var counter = this._counter;

		            // Generate keystream
		            if (iv) {
		                counter = this._counter = iv.slice(0);

		                // Remove IV for subsequent blocks
		                this._iv = undefined;
		            }
		            var keystream = counter.slice(0);
		            cipher.encryptBlock(keystream, 0);

		            // Increment counter
		            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0;

		            // Encrypt
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= keystream[i];
		            }
		        }
		    });

		    CTR.Decryptor = Encryptor;

		    return CTR;
		}());


		return CryptoJS.mode.CTR;

	}));
	});

	var modeCtrGladman = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/** @preserve
		 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
		 * derived from CryptoJS.mode.CTR
		 * Jan Hruby jhruby.web@gmail.com
		 */
		CryptoJS.mode.CTRGladman = (function () {
		    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

			function incWord(word)
			{
				if (((word >> 24) & 0xff) === 0xff) { //overflow
				var b1 = (word >> 16)&0xff;
				var b2 = (word >> 8)&0xff;
				var b3 = word & 0xff;

				if (b1 === 0xff) // overflow b1
				{
				b1 = 0;
				if (b2 === 0xff)
				{
					b2 = 0;
					if (b3 === 0xff)
					{
						b3 = 0;
					}
					else
					{
						++b3;
					}
				}
				else
				{
					++b2;
				}
				}
				else
				{
				++b1;
				}

				word = 0;
				word += (b1 << 16);
				word += (b2 << 8);
				word += b3;
				}
				else
				{
				word += (0x01 << 24);
				}
				return word;
			}

			function incCounter(counter)
			{
				if ((counter[0] = incWord(counter[0])) === 0)
				{
					// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
					counter[1] = incWord(counter[1]);
				}
				return counter;
			}

		    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;
		            var iv = this._iv;
		            var counter = this._counter;

		            // Generate keystream
		            if (iv) {
		                counter = this._counter = iv.slice(0);

		                // Remove IV for subsequent blocks
		                this._iv = undefined;
		            }

					incCounter(counter);

					var keystream = counter.slice(0);
		            cipher.encryptBlock(keystream, 0);

		            // Encrypt
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= keystream[i];
		            }
		        }
		    });

		    CTRGladman.Decryptor = Encryptor;

		    return CTRGladman;
		}());




		return CryptoJS.mode.CTRGladman;

	}));
	});

	var modeOfb = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Output Feedback block mode.
		 */
		CryptoJS.mode.OFB = (function () {
		    var OFB = CryptoJS.lib.BlockCipherMode.extend();

		    var Encryptor = OFB.Encryptor = OFB.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;
		            var iv = this._iv;
		            var keystream = this._keystream;

		            // Generate keystream
		            if (iv) {
		                keystream = this._keystream = iv.slice(0);

		                // Remove IV for subsequent blocks
		                this._iv = undefined;
		            }
		            cipher.encryptBlock(keystream, 0);

		            // Encrypt
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= keystream[i];
		            }
		        }
		    });

		    OFB.Decryptor = Encryptor;

		    return OFB;
		}());


		return CryptoJS.mode.OFB;

	}));
	});

	var modeEcb = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Electronic Codebook block mode.
		 */
		CryptoJS.mode.ECB = (function () {
		    var ECB = CryptoJS.lib.BlockCipherMode.extend();

		    ECB.Encryptor = ECB.extend({
		        processBlock: function (words, offset) {
		            this._cipher.encryptBlock(words, offset);
		        }
		    });

		    ECB.Decryptor = ECB.extend({
		        processBlock: function (words, offset) {
		            this._cipher.decryptBlock(words, offset);
		        }
		    });

		    return ECB;
		}());


		return CryptoJS.mode.ECB;

	}));
	});

	var padAnsix923 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * ANSI X.923 padding strategy.
		 */
		CryptoJS.pad.AnsiX923 = {
		    pad: function (data, blockSize) {
		        // Shortcuts
		        var dataSigBytes = data.sigBytes;
		        var blockSizeBytes = blockSize * 4;

		        // Count padding bytes
		        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

		        // Compute last byte position
		        var lastBytePos = dataSigBytes + nPaddingBytes - 1;

		        // Pad
		        data.clamp();
		        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
		        data.sigBytes += nPaddingBytes;
		    },

		    unpad: function (data) {
		        // Get number of padding bytes from last byte
		        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

		        // Remove padding
		        data.sigBytes -= nPaddingBytes;
		    }
		};


		return CryptoJS.pad.Ansix923;

	}));
	});

	var padIso10126 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * ISO 10126 padding strategy.
		 */
		CryptoJS.pad.Iso10126 = {
		    pad: function (data, blockSize) {
		        // Shortcut
		        var blockSizeBytes = blockSize * 4;

		        // Count padding bytes
		        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

		        // Pad
		        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
		             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
		    },

		    unpad: function (data) {
		        // Get number of padding bytes from last byte
		        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

		        // Remove padding
		        data.sigBytes -= nPaddingBytes;
		    }
		};


		return CryptoJS.pad.Iso10126;

	}));
	});

	var padIso97971 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * ISO/IEC 9797-1 Padding Method 2.
		 */
		CryptoJS.pad.Iso97971 = {
		    pad: function (data, blockSize) {
		        // Add 0x80 byte
		        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

		        // Zero pad the rest
		        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
		    },

		    unpad: function (data) {
		        // Remove zero padding
		        CryptoJS.pad.ZeroPadding.unpad(data);

		        // Remove one more byte -- the 0x80 byte
		        data.sigBytes--;
		    }
		};


		return CryptoJS.pad.Iso97971;

	}));
	});

	var padZeropadding = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Zero padding strategy.
		 */
		CryptoJS.pad.ZeroPadding = {
		    pad: function (data, blockSize) {
		        // Shortcut
		        var blockSizeBytes = blockSize * 4;

		        // Pad
		        data.clamp();
		        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
		    },

		    unpad: function (data) {
		        // Shortcut
		        var dataWords = data.words;

		        // Unpad
		        var i = data.sigBytes - 1;
		        for (var i = data.sigBytes - 1; i >= 0; i--) {
		            if (((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
		                data.sigBytes = i + 1;
		                break;
		            }
		        }
		    }
		};


		return CryptoJS.pad.ZeroPadding;

	}));
	});

	var padNopadding = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * A noop padding strategy.
		 */
		CryptoJS.pad.NoPadding = {
		    pad: function () {
		    },

		    unpad: function () {
		    }
		};


		return CryptoJS.pad.NoPadding;

	}));
	});

	var formatHex = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (undefined$1) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var CipherParams = C_lib.CipherParams;
		    var C_enc = C.enc;
		    var Hex = C_enc.Hex;
		    var C_format = C.format;

		    var HexFormatter = C_format.Hex = {
		        /**
		         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
		         *
		         * @param {CipherParams} cipherParams The cipher params object.
		         *
		         * @return {string} The hexadecimally encoded string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
		         */
		        stringify: function (cipherParams) {
		            return cipherParams.ciphertext.toString(Hex);
		        },

		        /**
		         * Converts a hexadecimally encoded ciphertext string to a cipher params object.
		         *
		         * @param {string} input The hexadecimally encoded string.
		         *
		         * @return {CipherParams} The cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
		         */
		        parse: function (input) {
		            var ciphertext = Hex.parse(input);
		            return CipherParams.create({ ciphertext: ciphertext });
		        }
		    };
		}());


		return CryptoJS.format.Hex;

	}));
	});

	var aes = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, encBase64, md5, evpkdf, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var BlockCipher = C_lib.BlockCipher;
		    var C_algo = C.algo;

		    // Lookup tables
		    var SBOX = [];
		    var INV_SBOX = [];
		    var SUB_MIX_0 = [];
		    var SUB_MIX_1 = [];
		    var SUB_MIX_2 = [];
		    var SUB_MIX_3 = [];
		    var INV_SUB_MIX_0 = [];
		    var INV_SUB_MIX_1 = [];
		    var INV_SUB_MIX_2 = [];
		    var INV_SUB_MIX_3 = [];

		    // Compute lookup tables
		    (function () {
		        // Compute double table
		        var d = [];
		        for (var i = 0; i < 256; i++) {
		            if (i < 128) {
		                d[i] = i << 1;
		            } else {
		                d[i] = (i << 1) ^ 0x11b;
		            }
		        }

		        // Walk GF(2^8)
		        var x = 0;
		        var xi = 0;
		        for (var i = 0; i < 256; i++) {
		            // Compute sbox
		            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
		            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
		            SBOX[x] = sx;
		            INV_SBOX[sx] = x;

		            // Compute multiplication
		            var x2 = d[x];
		            var x4 = d[x2];
		            var x8 = d[x4];

		            // Compute sub bytes, mix columns tables
		            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
		            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
		            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
		            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
		            SUB_MIX_3[x] = t;

		            // Compute inv sub bytes, inv mix columns tables
		            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
		            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
		            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
		            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
		            INV_SUB_MIX_3[sx] = t;

		            // Compute next counter
		            if (!x) {
		                x = xi = 1;
		            } else {
		                x = x2 ^ d[d[d[x8 ^ x2]]];
		                xi ^= d[d[xi]];
		            }
		        }
		    }());

		    // Precomputed Rcon lookup
		    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

		    /**
		     * AES block cipher algorithm.
		     */
		    var AES = C_algo.AES = BlockCipher.extend({
		        _doReset: function () {
		            var t;

		            // Skip reset of nRounds has been set before and key did not change
		            if (this._nRounds && this._keyPriorReset === this._key) {
		                return;
		            }

		            // Shortcuts
		            var key = this._keyPriorReset = this._key;
		            var keyWords = key.words;
		            var keySize = key.sigBytes / 4;

		            // Compute number of rounds
		            var nRounds = this._nRounds = keySize + 6;

		            // Compute number of key schedule rows
		            var ksRows = (nRounds + 1) * 4;

		            // Compute key schedule
		            var keySchedule = this._keySchedule = [];
		            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
		                if (ksRow < keySize) {
		                    keySchedule[ksRow] = keyWords[ksRow];
		                } else {
		                    t = keySchedule[ksRow - 1];

		                    if (!(ksRow % keySize)) {
		                        // Rot word
		                        t = (t << 8) | (t >>> 24);

		                        // Sub word
		                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

		                        // Mix Rcon
		                        t ^= RCON[(ksRow / keySize) | 0] << 24;
		                    } else if (keySize > 6 && ksRow % keySize == 4) {
		                        // Sub word
		                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
		                    }

		                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
		                }
		            }

		            // Compute inv key schedule
		            var invKeySchedule = this._invKeySchedule = [];
		            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
		                var ksRow = ksRows - invKsRow;

		                if (invKsRow % 4) {
		                    var t = keySchedule[ksRow];
		                } else {
		                    var t = keySchedule[ksRow - 4];
		                }

		                if (invKsRow < 4 || ksRow <= 4) {
		                    invKeySchedule[invKsRow] = t;
		                } else {
		                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
		                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
		                }
		            }
		        },

		        encryptBlock: function (M, offset) {
		            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
		        },

		        decryptBlock: function (M, offset) {
		            // Swap 2nd and 4th rows
		            var t = M[offset + 1];
		            M[offset + 1] = M[offset + 3];
		            M[offset + 3] = t;

		            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

		            // Inv swap 2nd and 4th rows
		            var t = M[offset + 1];
		            M[offset + 1] = M[offset + 3];
		            M[offset + 3] = t;
		        },

		        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
		            // Shortcut
		            var nRounds = this._nRounds;

		            // Get input, add round key
		            var s0 = M[offset]     ^ keySchedule[0];
		            var s1 = M[offset + 1] ^ keySchedule[1];
		            var s2 = M[offset + 2] ^ keySchedule[2];
		            var s3 = M[offset + 3] ^ keySchedule[3];

		            // Key schedule row counter
		            var ksRow = 4;

		            // Rounds
		            for (var round = 1; round < nRounds; round++) {
		                // Shift rows, sub bytes, mix columns, add round key
		                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
		                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
		                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
		                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

		                // Update state
		                s0 = t0;
		                s1 = t1;
		                s2 = t2;
		                s3 = t3;
		            }

		            // Shift rows, sub bytes, add round key
		            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
		            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
		            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
		            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

		            // Set output
		            M[offset]     = t0;
		            M[offset + 1] = t1;
		            M[offset + 2] = t2;
		            M[offset + 3] = t3;
		        },

		        keySize: 256/32
		    });

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
		     */
		    C.AES = BlockCipher._createHelper(AES);
		}());


		return CryptoJS.AES;

	}));
	});

	var tripledes = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, encBase64, md5, evpkdf, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var BlockCipher = C_lib.BlockCipher;
		    var C_algo = C.algo;

		    // Permuted Choice 1 constants
		    var PC1 = [
		        57, 49, 41, 33, 25, 17, 9,  1,
		        58, 50, 42, 34, 26, 18, 10, 2,
		        59, 51, 43, 35, 27, 19, 11, 3,
		        60, 52, 44, 36, 63, 55, 47, 39,
		        31, 23, 15, 7,  62, 54, 46, 38,
		        30, 22, 14, 6,  61, 53, 45, 37,
		        29, 21, 13, 5,  28, 20, 12, 4
		    ];

		    // Permuted Choice 2 constants
		    var PC2 = [
		        14, 17, 11, 24, 1,  5,
		        3,  28, 15, 6,  21, 10,
		        23, 19, 12, 4,  26, 8,
		        16, 7,  27, 20, 13, 2,
		        41, 52, 31, 37, 47, 55,
		        30, 40, 51, 45, 33, 48,
		        44, 49, 39, 56, 34, 53,
		        46, 42, 50, 36, 29, 32
		    ];

		    // Cumulative bit shift constants
		    var BIT_SHIFTS = [1,  2,  4,  6,  8,  10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

		    // SBOXes and round permutation constants
		    var SBOX_P = [
		        {
		            0x0: 0x808200,
		            0x10000000: 0x8000,
		            0x20000000: 0x808002,
		            0x30000000: 0x2,
		            0x40000000: 0x200,
		            0x50000000: 0x808202,
		            0x60000000: 0x800202,
		            0x70000000: 0x800000,
		            0x80000000: 0x202,
		            0x90000000: 0x800200,
		            0xa0000000: 0x8200,
		            0xb0000000: 0x808000,
		            0xc0000000: 0x8002,
		            0xd0000000: 0x800002,
		            0xe0000000: 0x0,
		            0xf0000000: 0x8202,
		            0x8000000: 0x0,
		            0x18000000: 0x808202,
		            0x28000000: 0x8202,
		            0x38000000: 0x8000,
		            0x48000000: 0x808200,
		            0x58000000: 0x200,
		            0x68000000: 0x808002,
		            0x78000000: 0x2,
		            0x88000000: 0x800200,
		            0x98000000: 0x8200,
		            0xa8000000: 0x808000,
		            0xb8000000: 0x800202,
		            0xc8000000: 0x800002,
		            0xd8000000: 0x8002,
		            0xe8000000: 0x202,
		            0xf8000000: 0x800000,
		            0x1: 0x8000,
		            0x10000001: 0x2,
		            0x20000001: 0x808200,
		            0x30000001: 0x800000,
		            0x40000001: 0x808002,
		            0x50000001: 0x8200,
		            0x60000001: 0x200,
		            0x70000001: 0x800202,
		            0x80000001: 0x808202,
		            0x90000001: 0x808000,
		            0xa0000001: 0x800002,
		            0xb0000001: 0x8202,
		            0xc0000001: 0x202,
		            0xd0000001: 0x800200,
		            0xe0000001: 0x8002,
		            0xf0000001: 0x0,
		            0x8000001: 0x808202,
		            0x18000001: 0x808000,
		            0x28000001: 0x800000,
		            0x38000001: 0x200,
		            0x48000001: 0x8000,
		            0x58000001: 0x800002,
		            0x68000001: 0x2,
		            0x78000001: 0x8202,
		            0x88000001: 0x8002,
		            0x98000001: 0x800202,
		            0xa8000001: 0x202,
		            0xb8000001: 0x808200,
		            0xc8000001: 0x800200,
		            0xd8000001: 0x0,
		            0xe8000001: 0x8200,
		            0xf8000001: 0x808002
		        },
		        {
		            0x0: 0x40084010,
		            0x1000000: 0x4000,
		            0x2000000: 0x80000,
		            0x3000000: 0x40080010,
		            0x4000000: 0x40000010,
		            0x5000000: 0x40084000,
		            0x6000000: 0x40004000,
		            0x7000000: 0x10,
		            0x8000000: 0x84000,
		            0x9000000: 0x40004010,
		            0xa000000: 0x40000000,
		            0xb000000: 0x84010,
		            0xc000000: 0x80010,
		            0xd000000: 0x0,
		            0xe000000: 0x4010,
		            0xf000000: 0x40080000,
		            0x800000: 0x40004000,
		            0x1800000: 0x84010,
		            0x2800000: 0x10,
		            0x3800000: 0x40004010,
		            0x4800000: 0x40084010,
		            0x5800000: 0x40000000,
		            0x6800000: 0x80000,
		            0x7800000: 0x40080010,
		            0x8800000: 0x80010,
		            0x9800000: 0x0,
		            0xa800000: 0x4000,
		            0xb800000: 0x40080000,
		            0xc800000: 0x40000010,
		            0xd800000: 0x84000,
		            0xe800000: 0x40084000,
		            0xf800000: 0x4010,
		            0x10000000: 0x0,
		            0x11000000: 0x40080010,
		            0x12000000: 0x40004010,
		            0x13000000: 0x40084000,
		            0x14000000: 0x40080000,
		            0x15000000: 0x10,
		            0x16000000: 0x84010,
		            0x17000000: 0x4000,
		            0x18000000: 0x4010,
		            0x19000000: 0x80000,
		            0x1a000000: 0x80010,
		            0x1b000000: 0x40000010,
		            0x1c000000: 0x84000,
		            0x1d000000: 0x40004000,
		            0x1e000000: 0x40000000,
		            0x1f000000: 0x40084010,
		            0x10800000: 0x84010,
		            0x11800000: 0x80000,
		            0x12800000: 0x40080000,
		            0x13800000: 0x4000,
		            0x14800000: 0x40004000,
		            0x15800000: 0x40084010,
		            0x16800000: 0x10,
		            0x17800000: 0x40000000,
		            0x18800000: 0x40084000,
		            0x19800000: 0x40000010,
		            0x1a800000: 0x40004010,
		            0x1b800000: 0x80010,
		            0x1c800000: 0x0,
		            0x1d800000: 0x4010,
		            0x1e800000: 0x40080010,
		            0x1f800000: 0x84000
		        },
		        {
		            0x0: 0x104,
		            0x100000: 0x0,
		            0x200000: 0x4000100,
		            0x300000: 0x10104,
		            0x400000: 0x10004,
		            0x500000: 0x4000004,
		            0x600000: 0x4010104,
		            0x700000: 0x4010000,
		            0x800000: 0x4000000,
		            0x900000: 0x4010100,
		            0xa00000: 0x10100,
		            0xb00000: 0x4010004,
		            0xc00000: 0x4000104,
		            0xd00000: 0x10000,
		            0xe00000: 0x4,
		            0xf00000: 0x100,
		            0x80000: 0x4010100,
		            0x180000: 0x4010004,
		            0x280000: 0x0,
		            0x380000: 0x4000100,
		            0x480000: 0x4000004,
		            0x580000: 0x10000,
		            0x680000: 0x10004,
		            0x780000: 0x104,
		            0x880000: 0x4,
		            0x980000: 0x100,
		            0xa80000: 0x4010000,
		            0xb80000: 0x10104,
		            0xc80000: 0x10100,
		            0xd80000: 0x4000104,
		            0xe80000: 0x4010104,
		            0xf80000: 0x4000000,
		            0x1000000: 0x4010100,
		            0x1100000: 0x10004,
		            0x1200000: 0x10000,
		            0x1300000: 0x4000100,
		            0x1400000: 0x100,
		            0x1500000: 0x4010104,
		            0x1600000: 0x4000004,
		            0x1700000: 0x0,
		            0x1800000: 0x4000104,
		            0x1900000: 0x4000000,
		            0x1a00000: 0x4,
		            0x1b00000: 0x10100,
		            0x1c00000: 0x4010000,
		            0x1d00000: 0x104,
		            0x1e00000: 0x10104,
		            0x1f00000: 0x4010004,
		            0x1080000: 0x4000000,
		            0x1180000: 0x104,
		            0x1280000: 0x4010100,
		            0x1380000: 0x0,
		            0x1480000: 0x10004,
		            0x1580000: 0x4000100,
		            0x1680000: 0x100,
		            0x1780000: 0x4010004,
		            0x1880000: 0x10000,
		            0x1980000: 0x4010104,
		            0x1a80000: 0x10104,
		            0x1b80000: 0x4000004,
		            0x1c80000: 0x4000104,
		            0x1d80000: 0x4010000,
		            0x1e80000: 0x4,
		            0x1f80000: 0x10100
		        },
		        {
		            0x0: 0x80401000,
		            0x10000: 0x80001040,
		            0x20000: 0x401040,
		            0x30000: 0x80400000,
		            0x40000: 0x0,
		            0x50000: 0x401000,
		            0x60000: 0x80000040,
		            0x70000: 0x400040,
		            0x80000: 0x80000000,
		            0x90000: 0x400000,
		            0xa0000: 0x40,
		            0xb0000: 0x80001000,
		            0xc0000: 0x80400040,
		            0xd0000: 0x1040,
		            0xe0000: 0x1000,
		            0xf0000: 0x80401040,
		            0x8000: 0x80001040,
		            0x18000: 0x40,
		            0x28000: 0x80400040,
		            0x38000: 0x80001000,
		            0x48000: 0x401000,
		            0x58000: 0x80401040,
		            0x68000: 0x0,
		            0x78000: 0x80400000,
		            0x88000: 0x1000,
		            0x98000: 0x80401000,
		            0xa8000: 0x400000,
		            0xb8000: 0x1040,
		            0xc8000: 0x80000000,
		            0xd8000: 0x400040,
		            0xe8000: 0x401040,
		            0xf8000: 0x80000040,
		            0x100000: 0x400040,
		            0x110000: 0x401000,
		            0x120000: 0x80000040,
		            0x130000: 0x0,
		            0x140000: 0x1040,
		            0x150000: 0x80400040,
		            0x160000: 0x80401000,
		            0x170000: 0x80001040,
		            0x180000: 0x80401040,
		            0x190000: 0x80000000,
		            0x1a0000: 0x80400000,
		            0x1b0000: 0x401040,
		            0x1c0000: 0x80001000,
		            0x1d0000: 0x400000,
		            0x1e0000: 0x40,
		            0x1f0000: 0x1000,
		            0x108000: 0x80400000,
		            0x118000: 0x80401040,
		            0x128000: 0x0,
		            0x138000: 0x401000,
		            0x148000: 0x400040,
		            0x158000: 0x80000000,
		            0x168000: 0x80001040,
		            0x178000: 0x40,
		            0x188000: 0x80000040,
		            0x198000: 0x1000,
		            0x1a8000: 0x80001000,
		            0x1b8000: 0x80400040,
		            0x1c8000: 0x1040,
		            0x1d8000: 0x80401000,
		            0x1e8000: 0x400000,
		            0x1f8000: 0x401040
		        },
		        {
		            0x0: 0x80,
		            0x1000: 0x1040000,
		            0x2000: 0x40000,
		            0x3000: 0x20000000,
		            0x4000: 0x20040080,
		            0x5000: 0x1000080,
		            0x6000: 0x21000080,
		            0x7000: 0x40080,
		            0x8000: 0x1000000,
		            0x9000: 0x20040000,
		            0xa000: 0x20000080,
		            0xb000: 0x21040080,
		            0xc000: 0x21040000,
		            0xd000: 0x0,
		            0xe000: 0x1040080,
		            0xf000: 0x21000000,
		            0x800: 0x1040080,
		            0x1800: 0x21000080,
		            0x2800: 0x80,
		            0x3800: 0x1040000,
		            0x4800: 0x40000,
		            0x5800: 0x20040080,
		            0x6800: 0x21040000,
		            0x7800: 0x20000000,
		            0x8800: 0x20040000,
		            0x9800: 0x0,
		            0xa800: 0x21040080,
		            0xb800: 0x1000080,
		            0xc800: 0x20000080,
		            0xd800: 0x21000000,
		            0xe800: 0x1000000,
		            0xf800: 0x40080,
		            0x10000: 0x40000,
		            0x11000: 0x80,
		            0x12000: 0x20000000,
		            0x13000: 0x21000080,
		            0x14000: 0x1000080,
		            0x15000: 0x21040000,
		            0x16000: 0x20040080,
		            0x17000: 0x1000000,
		            0x18000: 0x21040080,
		            0x19000: 0x21000000,
		            0x1a000: 0x1040000,
		            0x1b000: 0x20040000,
		            0x1c000: 0x40080,
		            0x1d000: 0x20000080,
		            0x1e000: 0x0,
		            0x1f000: 0x1040080,
		            0x10800: 0x21000080,
		            0x11800: 0x1000000,
		            0x12800: 0x1040000,
		            0x13800: 0x20040080,
		            0x14800: 0x20000000,
		            0x15800: 0x1040080,
		            0x16800: 0x80,
		            0x17800: 0x21040000,
		            0x18800: 0x40080,
		            0x19800: 0x21040080,
		            0x1a800: 0x0,
		            0x1b800: 0x21000000,
		            0x1c800: 0x1000080,
		            0x1d800: 0x40000,
		            0x1e800: 0x20040000,
		            0x1f800: 0x20000080
		        },
		        {
		            0x0: 0x10000008,
		            0x100: 0x2000,
		            0x200: 0x10200000,
		            0x300: 0x10202008,
		            0x400: 0x10002000,
		            0x500: 0x200000,
		            0x600: 0x200008,
		            0x700: 0x10000000,
		            0x800: 0x0,
		            0x900: 0x10002008,
		            0xa00: 0x202000,
		            0xb00: 0x8,
		            0xc00: 0x10200008,
		            0xd00: 0x202008,
		            0xe00: 0x2008,
		            0xf00: 0x10202000,
		            0x80: 0x10200000,
		            0x180: 0x10202008,
		            0x280: 0x8,
		            0x380: 0x200000,
		            0x480: 0x202008,
		            0x580: 0x10000008,
		            0x680: 0x10002000,
		            0x780: 0x2008,
		            0x880: 0x200008,
		            0x980: 0x2000,
		            0xa80: 0x10002008,
		            0xb80: 0x10200008,
		            0xc80: 0x0,
		            0xd80: 0x10202000,
		            0xe80: 0x202000,
		            0xf80: 0x10000000,
		            0x1000: 0x10002000,
		            0x1100: 0x10200008,
		            0x1200: 0x10202008,
		            0x1300: 0x2008,
		            0x1400: 0x200000,
		            0x1500: 0x10000000,
		            0x1600: 0x10000008,
		            0x1700: 0x202000,
		            0x1800: 0x202008,
		            0x1900: 0x0,
		            0x1a00: 0x8,
		            0x1b00: 0x10200000,
		            0x1c00: 0x2000,
		            0x1d00: 0x10002008,
		            0x1e00: 0x10202000,
		            0x1f00: 0x200008,
		            0x1080: 0x8,
		            0x1180: 0x202000,
		            0x1280: 0x200000,
		            0x1380: 0x10000008,
		            0x1480: 0x10002000,
		            0x1580: 0x2008,
		            0x1680: 0x10202008,
		            0x1780: 0x10200000,
		            0x1880: 0x10202000,
		            0x1980: 0x10200008,
		            0x1a80: 0x2000,
		            0x1b80: 0x202008,
		            0x1c80: 0x200008,
		            0x1d80: 0x0,
		            0x1e80: 0x10000000,
		            0x1f80: 0x10002008
		        },
		        {
		            0x0: 0x100000,
		            0x10: 0x2000401,
		            0x20: 0x400,
		            0x30: 0x100401,
		            0x40: 0x2100401,
		            0x50: 0x0,
		            0x60: 0x1,
		            0x70: 0x2100001,
		            0x80: 0x2000400,
		            0x90: 0x100001,
		            0xa0: 0x2000001,
		            0xb0: 0x2100400,
		            0xc0: 0x2100000,
		            0xd0: 0x401,
		            0xe0: 0x100400,
		            0xf0: 0x2000000,
		            0x8: 0x2100001,
		            0x18: 0x0,
		            0x28: 0x2000401,
		            0x38: 0x2100400,
		            0x48: 0x100000,
		            0x58: 0x2000001,
		            0x68: 0x2000000,
		            0x78: 0x401,
		            0x88: 0x100401,
		            0x98: 0x2000400,
		            0xa8: 0x2100000,
		            0xb8: 0x100001,
		            0xc8: 0x400,
		            0xd8: 0x2100401,
		            0xe8: 0x1,
		            0xf8: 0x100400,
		            0x100: 0x2000000,
		            0x110: 0x100000,
		            0x120: 0x2000401,
		            0x130: 0x2100001,
		            0x140: 0x100001,
		            0x150: 0x2000400,
		            0x160: 0x2100400,
		            0x170: 0x100401,
		            0x180: 0x401,
		            0x190: 0x2100401,
		            0x1a0: 0x100400,
		            0x1b0: 0x1,
		            0x1c0: 0x0,
		            0x1d0: 0x2100000,
		            0x1e0: 0x2000001,
		            0x1f0: 0x400,
		            0x108: 0x100400,
		            0x118: 0x2000401,
		            0x128: 0x2100001,
		            0x138: 0x1,
		            0x148: 0x2000000,
		            0x158: 0x100000,
		            0x168: 0x401,
		            0x178: 0x2100400,
		            0x188: 0x2000001,
		            0x198: 0x2100000,
		            0x1a8: 0x0,
		            0x1b8: 0x2100401,
		            0x1c8: 0x100401,
		            0x1d8: 0x400,
		            0x1e8: 0x2000400,
		            0x1f8: 0x100001
		        },
		        {
		            0x0: 0x8000820,
		            0x1: 0x20000,
		            0x2: 0x8000000,
		            0x3: 0x20,
		            0x4: 0x20020,
		            0x5: 0x8020820,
		            0x6: 0x8020800,
		            0x7: 0x800,
		            0x8: 0x8020000,
		            0x9: 0x8000800,
		            0xa: 0x20800,
		            0xb: 0x8020020,
		            0xc: 0x820,
		            0xd: 0x0,
		            0xe: 0x8000020,
		            0xf: 0x20820,
		            0x80000000: 0x800,
		            0x80000001: 0x8020820,
		            0x80000002: 0x8000820,
		            0x80000003: 0x8000000,
		            0x80000004: 0x8020000,
		            0x80000005: 0x20800,
		            0x80000006: 0x20820,
		            0x80000007: 0x20,
		            0x80000008: 0x8000020,
		            0x80000009: 0x820,
		            0x8000000a: 0x20020,
		            0x8000000b: 0x8020800,
		            0x8000000c: 0x0,
		            0x8000000d: 0x8020020,
		            0x8000000e: 0x8000800,
		            0x8000000f: 0x20000,
		            0x10: 0x20820,
		            0x11: 0x8020800,
		            0x12: 0x20,
		            0x13: 0x800,
		            0x14: 0x8000800,
		            0x15: 0x8000020,
		            0x16: 0x8020020,
		            0x17: 0x20000,
		            0x18: 0x0,
		            0x19: 0x20020,
		            0x1a: 0x8020000,
		            0x1b: 0x8000820,
		            0x1c: 0x8020820,
		            0x1d: 0x20800,
		            0x1e: 0x820,
		            0x1f: 0x8000000,
		            0x80000010: 0x20000,
		            0x80000011: 0x800,
		            0x80000012: 0x8020020,
		            0x80000013: 0x20820,
		            0x80000014: 0x20,
		            0x80000015: 0x8020000,
		            0x80000016: 0x8000000,
		            0x80000017: 0x8000820,
		            0x80000018: 0x8020820,
		            0x80000019: 0x8000020,
		            0x8000001a: 0x8000800,
		            0x8000001b: 0x0,
		            0x8000001c: 0x20800,
		            0x8000001d: 0x820,
		            0x8000001e: 0x20020,
		            0x8000001f: 0x8020800
		        }
		    ];

		    // Masks that select the SBOX input
		    var SBOX_MASK = [
		        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
		        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
		    ];

		    /**
		     * DES block cipher algorithm.
		     */
		    var DES = C_algo.DES = BlockCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var key = this._key;
		            var keyWords = key.words;

		            // Select 56 bits according to PC1
		            var keyBits = [];
		            for (var i = 0; i < 56; i++) {
		                var keyBitPos = PC1[i] - 1;
		                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
		            }

		            // Assemble 16 subkeys
		            var subKeys = this._subKeys = [];
		            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
		                // Create subkey
		                var subKey = subKeys[nSubKey] = [];

		                // Shortcut
		                var bitShift = BIT_SHIFTS[nSubKey];

		                // Select 48 bits according to PC2
		                for (var i = 0; i < 24; i++) {
		                    // Select from the left 28 key bits
		                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);

		                    // Select from the right 28 key bits
		                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
		                }

		                // Since each subkey is applied to an expanded 32-bit input,
		                // the subkey can be broken into 8 values scaled to 32-bits,
		                // which allows the key to be used without expansion
		                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
		                for (var i = 1; i < 7; i++) {
		                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
		                }
		                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
		            }

		            // Compute inverse subkeys
		            var invSubKeys = this._invSubKeys = [];
		            for (var i = 0; i < 16; i++) {
		                invSubKeys[i] = subKeys[15 - i];
		            }
		        },

		        encryptBlock: function (M, offset) {
		            this._doCryptBlock(M, offset, this._subKeys);
		        },

		        decryptBlock: function (M, offset) {
		            this._doCryptBlock(M, offset, this._invSubKeys);
		        },

		        _doCryptBlock: function (M, offset, subKeys) {
		            // Get input
		            this._lBlock = M[offset];
		            this._rBlock = M[offset + 1];

		            // Initial permutation
		            exchangeLR.call(this, 4,  0x0f0f0f0f);
		            exchangeLR.call(this, 16, 0x0000ffff);
		            exchangeRL.call(this, 2,  0x33333333);
		            exchangeRL.call(this, 8,  0x00ff00ff);
		            exchangeLR.call(this, 1,  0x55555555);

		            // Rounds
		            for (var round = 0; round < 16; round++) {
		                // Shortcuts
		                var subKey = subKeys[round];
		                var lBlock = this._lBlock;
		                var rBlock = this._rBlock;

		                // Feistel function
		                var f = 0;
		                for (var i = 0; i < 8; i++) {
		                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
		                }
		                this._lBlock = rBlock;
		                this._rBlock = lBlock ^ f;
		            }

		            // Undo swap from last round
		            var t = this._lBlock;
		            this._lBlock = this._rBlock;
		            this._rBlock = t;

		            // Final permutation
		            exchangeLR.call(this, 1,  0x55555555);
		            exchangeRL.call(this, 8,  0x00ff00ff);
		            exchangeRL.call(this, 2,  0x33333333);
		            exchangeLR.call(this, 16, 0x0000ffff);
		            exchangeLR.call(this, 4,  0x0f0f0f0f);

		            // Set output
		            M[offset] = this._lBlock;
		            M[offset + 1] = this._rBlock;
		        },

		        keySize: 64/32,

		        ivSize: 64/32,

		        blockSize: 64/32
		    });

		    // Swap bits across the left and right words
		    function exchangeLR(offset, mask) {
		        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
		        this._rBlock ^= t;
		        this._lBlock ^= t << offset;
		    }

		    function exchangeRL(offset, mask) {
		        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
		        this._lBlock ^= t;
		        this._rBlock ^= t << offset;
		    }

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
		     */
		    C.DES = BlockCipher._createHelper(DES);

		    /**
		     * Triple-DES block cipher algorithm.
		     */
		    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var key = this._key;
		            var keyWords = key.words;
		            // Make sure the key length is valid (64, 128 or >= 192 bit)
		            if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
		                throw new Error('Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.');
		            }

		            // Extend the key according to the keying options defined in 3DES standard
		            var key1 = keyWords.slice(0, 2);
		            var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
		            var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);

		            // Create DES instances
		            this._des1 = DES.createEncryptor(WordArray.create(key1));
		            this._des2 = DES.createEncryptor(WordArray.create(key2));
		            this._des3 = DES.createEncryptor(WordArray.create(key3));
		        },

		        encryptBlock: function (M, offset) {
		            this._des1.encryptBlock(M, offset);
		            this._des2.decryptBlock(M, offset);
		            this._des3.encryptBlock(M, offset);
		        },

		        decryptBlock: function (M, offset) {
		            this._des3.decryptBlock(M, offset);
		            this._des2.encryptBlock(M, offset);
		            this._des1.decryptBlock(M, offset);
		        },

		        keySize: 192/32,

		        ivSize: 64/32,

		        blockSize: 64/32
		    });

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
		     */
		    C.TripleDES = BlockCipher._createHelper(TripleDES);
		}());


		return CryptoJS.TripleDES;

	}));
	});

	var rc4 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, encBase64, md5, evpkdf, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var StreamCipher = C_lib.StreamCipher;
		    var C_algo = C.algo;

		    /**
		     * RC4 stream cipher algorithm.
		     */
		    var RC4 = C_algo.RC4 = StreamCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var key = this._key;
		            var keyWords = key.words;
		            var keySigBytes = key.sigBytes;

		            // Init sbox
		            var S = this._S = [];
		            for (var i = 0; i < 256; i++) {
		                S[i] = i;
		            }

		            // Key setup
		            for (var i = 0, j = 0; i < 256; i++) {
		                var keyByteIndex = i % keySigBytes;
		                var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;

		                j = (j + S[i] + keyByte) % 256;

		                // Swap
		                var t = S[i];
		                S[i] = S[j];
		                S[j] = t;
		            }

		            // Counters
		            this._i = this._j = 0;
		        },

		        _doProcessBlock: function (M, offset) {
		            M[offset] ^= generateKeystreamWord.call(this);
		        },

		        keySize: 256/32,

		        ivSize: 0
		    });

		    function generateKeystreamWord() {
		        // Shortcuts
		        var S = this._S;
		        var i = this._i;
		        var j = this._j;

		        // Generate keystream word
		        var keystreamWord = 0;
		        for (var n = 0; n < 4; n++) {
		            i = (i + 1) % 256;
		            j = (j + S[i]) % 256;

		            // Swap
		            var t = S[i];
		            S[i] = S[j];
		            S[j] = t;

		            keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
		        }

		        // Update counters
		        this._i = i;
		        this._j = j;

		        return keystreamWord;
		    }

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
		     */
		    C.RC4 = StreamCipher._createHelper(RC4);

		    /**
		     * Modified RC4 stream cipher algorithm.
		     */
		    var RC4Drop = C_algo.RC4Drop = RC4.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} drop The number of keystream words to drop. Default 192
		         */
		        cfg: RC4.cfg.extend({
		            drop: 192
		        }),

		        _doReset: function () {
		            RC4._doReset.call(this);

		            // Drop
		            for (var i = this.cfg.drop; i > 0; i--) {
		                generateKeystreamWord.call(this);
		            }
		        }
		    });

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
		     */
		    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
		}());


		return CryptoJS.RC4;

	}));
	});

	var rabbit = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, encBase64, md5, evpkdf, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var StreamCipher = C_lib.StreamCipher;
		    var C_algo = C.algo;

		    // Reusable objects
		    var S  = [];
		    var C_ = [];
		    var G  = [];

		    /**
		     * Rabbit stream cipher algorithm
		     */
		    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var K = this._key.words;
		            var iv = this.cfg.iv;

		            // Swap endian
		            for (var i = 0; i < 4; i++) {
		                K[i] = (((K[i] << 8)  | (K[i] >>> 24)) & 0x00ff00ff) |
		                       (((K[i] << 24) | (K[i] >>> 8))  & 0xff00ff00);
		            }

		            // Generate initial state values
		            var X = this._X = [
		                K[0], (K[3] << 16) | (K[2] >>> 16),
		                K[1], (K[0] << 16) | (K[3] >>> 16),
		                K[2], (K[1] << 16) | (K[0] >>> 16),
		                K[3], (K[2] << 16) | (K[1] >>> 16)
		            ];

		            // Generate initial counter values
		            var C = this._C = [
		                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
		                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
		                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
		                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
		            ];

		            // Carry bit
		            this._b = 0;

		            // Iterate the system four times
		            for (var i = 0; i < 4; i++) {
		                nextState.call(this);
		            }

		            // Modify the counters
		            for (var i = 0; i < 8; i++) {
		                C[i] ^= X[(i + 4) & 7];
		            }

		            // IV setup
		            if (iv) {
		                // Shortcuts
		                var IV = iv.words;
		                var IV_0 = IV[0];
		                var IV_1 = IV[1];

		                // Generate four subvectors
		                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
		                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
		                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
		                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

		                // Modify counter values
		                C[0] ^= i0;
		                C[1] ^= i1;
		                C[2] ^= i2;
		                C[3] ^= i3;
		                C[4] ^= i0;
		                C[5] ^= i1;
		                C[6] ^= i2;
		                C[7] ^= i3;

		                // Iterate the system four times
		                for (var i = 0; i < 4; i++) {
		                    nextState.call(this);
		                }
		            }
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var X = this._X;

		            // Iterate the system
		            nextState.call(this);

		            // Generate four keystream words
		            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
		            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
		            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
		            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

		            for (var i = 0; i < 4; i++) {
		                // Swap endian
		                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
		                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

		                // Encrypt
		                M[offset + i] ^= S[i];
		            }
		        },

		        blockSize: 128/32,

		        ivSize: 64/32
		    });

		    function nextState() {
		        // Shortcuts
		        var X = this._X;
		        var C = this._C;

		        // Save old counter values
		        for (var i = 0; i < 8; i++) {
		            C_[i] = C[i];
		        }

		        // Calculate new counter values
		        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
		        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
		        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
		        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
		        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
		        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
		        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
		        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
		        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

		        // Calculate the g-values
		        for (var i = 0; i < 8; i++) {
		            var gx = X[i] + C[i];

		            // Construct high and low argument for squaring
		            var ga = gx & 0xffff;
		            var gb = gx >>> 16;

		            // Calculate high and low result of squaring
		            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
		            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

		            // High XOR low
		            G[i] = gh ^ gl;
		        }

		        // Calculate new state values
		        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
		        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
		        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
		        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
		        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
		        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
		        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
		        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
		    }

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
		     */
		    C.Rabbit = StreamCipher._createHelper(Rabbit);
		}());


		return CryptoJS.Rabbit;

	}));
	});

	var rabbitLegacy = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, encBase64, md5, evpkdf, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var StreamCipher = C_lib.StreamCipher;
		    var C_algo = C.algo;

		    // Reusable objects
		    var S  = [];
		    var C_ = [];
		    var G  = [];

		    /**
		     * Rabbit stream cipher algorithm.
		     *
		     * This is a legacy version that neglected to convert the key to little-endian.
		     * This error doesn't affect the cipher's security,
		     * but it does affect its compatibility with other implementations.
		     */
		    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var K = this._key.words;
		            var iv = this.cfg.iv;

		            // Generate initial state values
		            var X = this._X = [
		                K[0], (K[3] << 16) | (K[2] >>> 16),
		                K[1], (K[0] << 16) | (K[3] >>> 16),
		                K[2], (K[1] << 16) | (K[0] >>> 16),
		                K[3], (K[2] << 16) | (K[1] >>> 16)
		            ];

		            // Generate initial counter values
		            var C = this._C = [
		                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
		                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
		                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
		                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
		            ];

		            // Carry bit
		            this._b = 0;

		            // Iterate the system four times
		            for (var i = 0; i < 4; i++) {
		                nextState.call(this);
		            }

		            // Modify the counters
		            for (var i = 0; i < 8; i++) {
		                C[i] ^= X[(i + 4) & 7];
		            }

		            // IV setup
		            if (iv) {
		                // Shortcuts
		                var IV = iv.words;
		                var IV_0 = IV[0];
		                var IV_1 = IV[1];

		                // Generate four subvectors
		                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
		                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
		                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
		                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

		                // Modify counter values
		                C[0] ^= i0;
		                C[1] ^= i1;
		                C[2] ^= i2;
		                C[3] ^= i3;
		                C[4] ^= i0;
		                C[5] ^= i1;
		                C[6] ^= i2;
		                C[7] ^= i3;

		                // Iterate the system four times
		                for (var i = 0; i < 4; i++) {
		                    nextState.call(this);
		                }
		            }
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var X = this._X;

		            // Iterate the system
		            nextState.call(this);

		            // Generate four keystream words
		            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
		            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
		            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
		            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

		            for (var i = 0; i < 4; i++) {
		                // Swap endian
		                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
		                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

		                // Encrypt
		                M[offset + i] ^= S[i];
		            }
		        },

		        blockSize: 128/32,

		        ivSize: 64/32
		    });

		    function nextState() {
		        // Shortcuts
		        var X = this._X;
		        var C = this._C;

		        // Save old counter values
		        for (var i = 0; i < 8; i++) {
		            C_[i] = C[i];
		        }

		        // Calculate new counter values
		        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
		        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
		        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
		        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
		        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
		        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
		        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
		        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
		        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

		        // Calculate the g-values
		        for (var i = 0; i < 8; i++) {
		            var gx = X[i] + C[i];

		            // Construct high and low argument for squaring
		            var ga = gx & 0xffff;
		            var gb = gx >>> 16;

		            // Calculate high and low result of squaring
		            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
		            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

		            // High XOR low
		            G[i] = gh ^ gl;
		        }

		        // Calculate new state values
		        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
		        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
		        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
		        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
		        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
		        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
		        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
		        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
		    }

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
		     */
		    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
		}());


		return CryptoJS.RabbitLegacy;

	}));
	});

	var cryptoJs = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, x64Core, libTypedarrays, encUtf16, encBase64, md5, sha1, sha256, sha224, sha512, sha384, sha3, ripemd160, hmac, pbkdf2, evpkdf, cipherCore, modeCfb, modeCtr, modeCtrGladman, modeOfb, modeEcb, padAnsix923, padIso10126, padIso97971, padZeropadding, padNopadding, formatHex, aes, tripledes, rc4, rabbit, rabbitLegacy);
		}
	}(commonjsGlobal, function (CryptoJS) {

		return CryptoJS;

	}));
	});

	if (!Int8Array.prototype.slice) {
	    Object.defineProperty(Int8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.subarray) {
	    Object.defineProperty(Uint8Array.prototype, 'subarray', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.map) {
	    Object.defineProperty(Int8Array.prototype, 'map', {
	        value: Array.prototype.map
	    });
	}
	if (!Int8Array.prototype.every) {
	    Object.defineProperty(Int8Array.prototype, 'every', {
	        value: Array.prototype.every
	    });
	}
	if (!Int8Array.prototype.some) {
	    Object.defineProperty(Uint8Array.prototype, 'some', {
	        value: Array.prototype.some
	    });
	}
	if (!Int8Array.prototype.indexOf) {
	    Object.defineProperty(Int8Array.prototype, 'indexOf', {
	        value: Array.prototype.indexOf
	    });
	}
	// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Polyfill
	// Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/
	if (!Int8Array.prototype.fill) {
	    Object.defineProperty(Int8Array.prototype, 'fill', {
	        value: function (input) {
	            // Steps 1-2.
	            if (this == null) {
	                throw new TypeError('this is null or not defined');
	            }
	            var O = Object(this);
	            // Steps 3-5.
	            var len = O.length >>> 0;
	            // Steps 6-7.
	            var start = arguments[1];
	            var relativeStart = start >> 0;
	            // Step 8.
	            var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
	            // Steps 9-10.
	            var end = arguments[2];
	            var relativeEnd = end === undefined ? len : end >> 0;
	            // Step 11.
	            var last = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
	            // Step 12.
	            while (k < last) {
	                O[k] = input;
	                k++;
	            }
	            // Step 13.
	            return O;
	        }
	    });
	}
	if (!Uint32Array.prototype.slice) {
	    Object.defineProperty(Uint8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Uint32Array.prototype.reverse) {
	    Object.defineProperty(Uint8Array.prototype, 'reverse', {
	        value: Array.prototype.reverse
	    });
	}

	var errors$2 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.ILLEGAL_TRITS_LENGTH = 'Illegal trits length';
	exports.ILLEGAL_WORDS_LENGTH = 'Illegal words length';

	});

	unwrapExports(errors$2);
	var errors_1$2 = errors$2.ILLEGAL_TRITS_LENGTH;
	var errors_2$2 = errors$2.ILLEGAL_WORDS_LENGTH;

	var wordConverter = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;

	/* tslint:disable variable-name */
	var INT_LENGTH = 12;
	var RADIX = 3;
	// hex representation of (3^242)/2
	var HALF_3 = new Uint32Array([
	    0xa5ce8964,
	    0x9f007669,
	    0x1484504f,
	    0x3ade00d9,
	    0x0c24486e,
	    0x50979d57,
	    0x79a4c702,
	    0x48bbae36,
	    0xa9f6808b,
	    0xaa06a805,
	    0xa87fabdf,
	    0x5e69ebef,
	]);
	function clone_uint32Array(array) {
	    var source = new Uint32Array(array);
	    return new Uint32Array(source);
	}
	function ta_slice(array) {
	    if (array.slice !== undefined) {
	        return array.slice();
	    }
	    return clone_uint32Array(array);
	}
	function ta_reverse(array) {
	    if (array.reverse !== undefined) {
	        array.reverse();
	        return;
	    }
	    var n = array.length;
	    var middle = Math.floor(n / 2);
	    var i = 0;
	    var temp = null;
	    for (; i < middle; i += 1) {
	        temp = array[i];
	        array[i] = array[n - 1 - i];
	        array[n - 1 - i] = temp;
	    }
	}
	// negates the (unsigned) input array
	function bigint_not(arr) {
	    for (var i = 0; i < arr.length; i++) {
	        arr[i] = ~arr[i] >>> 0;
	    }
	}
	// rshift that works with up to 53
	// JS's shift operators only work on 32 bit integers
	// ours is up to 33 or 34 bits though, so
	// we need to implement shifting manually
	function rshift(num, shift) {
	    return (num / Math.pow(2, shift)) >>> 0;
	}
	// swaps endianness
	function swap32(val) {
	    return ((val & 0xff) << 24) | ((val & 0xff00) << 8) | ((val >> 8) & 0xff00) | ((val >> 24) & 0xff);
	}
	// add with carry
	function full_add(lh, rh, carry) {
	    var v = lh + rh;
	    var l = rshift(v, 32) & 0xffffffff;
	    var r = (v & 0xffffffff) >>> 0;
	    var carry1 = l !== 0;
	    if (carry) {
	        v = r + 1;
	    }
	    l = rshift(v, 32) & 0xffffffff;
	    r = (v & 0xffffffff) >>> 0;
	    var carry2 = l !== 0;
	    return [r, carry1 || carry2];
	}
	// subtracts rh from base
	function bigint_sub(base, rh) {
	    var noborrow = true;
	    for (var i = 0; i < base.length; i++) {
	        var vc = full_add(base[i], ~rh[i] >>> 0, noborrow);
	        base[i] = vc[0];
	        noborrow = vc[1];
	    }
	    if (!noborrow) {
	        throw new Error('noborrow');
	    }
	}
	// compares two (unsigned) big integers
	function bigint_cmp(lh, rh) {
	    for (var i = lh.length; i-- > 0;) {
	        var a = lh[i] >>> 0;
	        var b = rh[i] >>> 0;
	        if (a < b) {
	            return -1;
	        }
	        else if (a > b) {
	            return 1;
	        }
	    }
	    return 0;
	}
	// adds rh to base in place
	function bigint_add(base, rh) {
	    var carry = false;
	    for (var i = 0; i < base.length; i++) {
	        var vc = full_add(base[i], rh[i], carry);
	        base[i] = vc[0];
	        carry = vc[1];
	    }
	}
	function is_null(arr) {
	    // tslint:disable-next-line prefer-for-of
	    for (var i = 0; i < arr.length; i++) {
	        if (arr[i] !== 0) {
	            return false;
	        }
	    }
	    return true;
	}
	// adds a small (i.e. <32bit) number to base
	function bigint_add_small(base, other) {
	    var vc = full_add(base[0], other, false);
	    var carry;
	    base[0] = vc[0];
	    carry = vc[1];
	    var i = 1;
	    while (carry && i < base.length) {
	        var vc2 = full_add(base[i], 0, carry);
	        base[i] = vc2[0];
	        carry = vc2[1];
	        i += 1;
	    }
	    return i;
	}
	/**
	 * Converts the given byte array to trits
	 *
	 * @method wordsToTrits
	 *
	 * @ignore
	 *
	 * @param {Uint32Array} words
	 *
	 * @return {Int8Array} trits
	 */
	function wordsToTrits(words) {
	    if (words.length !== INT_LENGTH) {
	        throw new Error(errors$2.ILLEGAL_WORDS_LENGTH);
	    }
	    var trits = new Int8Array(243);
	    var base = new Uint32Array(words);
	    ta_reverse(base);
	    var flip_trits = false;
	    if (base[INT_LENGTH - 1] >> 31 === 0) {
	        // positive two's complement number.
	        // add HALF_3 to move it to the right place.
	        bigint_add(base, HALF_3);
	    }
	    else {
	        // negative number.
	        bigint_not(base);
	        if (bigint_cmp(base, HALF_3) > 0) {
	            bigint_sub(base, HALF_3);
	            flip_trits = true;
	        }
	        else {
	            /// bigint is between (unsigned) HALF_3 and (2**384 - 3**242/2).
	            bigint_add_small(base, 1);
	            var tmp = ta_slice(HALF_3);
	            bigint_sub(tmp, base);
	            base = tmp;
	        }
	    }
	    var rem = 0;
	    for (var i = 0; i < 242; i++) {
	        rem = 0;
	        for (var j = INT_LENGTH - 1; j >= 0; j--) {
	            var lhs = (rem !== 0 ? rem * 0xffffffff + rem : 0) + base[j];
	            var rhs = RADIX;
	            var q = (lhs / rhs) >>> 0;
	            var r = (lhs % rhs) >>> 0;
	            base[j] = q;
	            rem = r;
	        }
	        trits[i] = rem - 1;
	    }
	    if (flip_trits) {
	        for (var i = 0; i < trits.length; i++) {
	            trits[i] = -trits[i];
	        }
	    }
	    return trits;
	}
	exports.wordsToTrits = wordsToTrits;
	/**
	 * Converts the given trits to byte array
	 *
	 * @method tritsToWords
	 *
	 * @ignore
	 *
	 * @param {Int8Array} trits
	 *
	 * @return {Uint32Array} words
	 */
	function tritsToWords(trits) {
	    if (trits.length !== 243) {
	        throw new Error('Invalid trits length');
	    }
	    var base = new Uint32Array(INT_LENGTH);
	    var allMinusOne = true;
	    var tritSlice = trits.slice(0, 242);
	    for (var i = 0; i < tritSlice.length; i++) {
	        if (tritSlice[i] !== -1) {
	            allMinusOne = false;
	            break;
	        }
	    }
	    if (allMinusOne) {
	        base = ta_slice(HALF_3);
	        bigint_not(base);
	        bigint_add_small(base, 1);
	    }
	    else {
	        var size = 1;
	        for (var i = trits.length - 1; i-- > 0;) {
	            var trit = trits[i] + 1;
	            // multiply by radix
	            {
	                var sz = size;
	                var carry = 0;
	                for (var j = 0; j < sz; j++) {
	                    var v = base[j] * RADIX + carry;
	                    carry = rshift(v, 32);
	                    base[j] = (v & 0xffffffff) >>> 0;
	                }
	                if (carry > 0) {
	                    base[sz] = carry;
	                    size += 1;
	                }
	            }
	            // addition
	            {
	                var sz = bigint_add_small(base, trit);
	                if (sz > size) {
	                    size = sz;
	                }
	            }
	        }
	        if (!is_null(base)) {
	            if (bigint_cmp(HALF_3, base) <= 0) {
	                // base >= HALF_3
	                // just do base - HALF_3
	                bigint_sub(base, HALF_3);
	            }
	            else {
	                // base < HALF_3
	                // so we need to transform it to a two's complement representation
	                // of (base - HALF_3).
	                // as we don't have a wrapping (-), we need to use some bit magic
	                var tmp = ta_slice(HALF_3);
	                bigint_sub(tmp, base);
	                bigint_not(tmp);
	                bigint_add_small(tmp, 1);
	                base = tmp;
	            }
	        }
	    }
	    ta_reverse(base);
	    for (var i = 0; i < base.length; i++) {
	        base[i] = swap32(base[i]);
	    }
	    return base;
	}
	exports.tritsToWords = tritsToWords;

	});

	unwrapExports(wordConverter);
	var wordConverter_1 = wordConverter.wordsToTrits;
	var wordConverter_2 = wordConverter.tritsToWords;

	var kerl = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	/* tslint:disable variable-name no-conditional-assignment */




	var BIT_HASH_LENGTH = 384;
	var HASH_LENGTH = 243;
	/**
	 * @class kerl
	 * @ignore
	 */
	var Kerl = /** @class */ (function () {
	    /**
	     * @constructor
	     * @ignore
	     */
	    function Kerl() {
	        this.k = cryptoJs.algo.SHA3.create();
	        this.k.init({
	            outputLength: BIT_HASH_LENGTH
	        });
	    }
	    Kerl.prototype.initialize = function (state) {
	        /* empty */
	    };
	    /**
	     * Resets the internal state
	     *
	     * @method reset
	     *
	     * @ignore
	     */
	    Kerl.prototype.reset = function () {
	        this.k.reset();
	    };
	    /**
	     * Absorbs trits given an offset and length
	     *
	     * @method absorb
	     *
	     * @ignore
	     *
	     * @param {Int8Array} trits
	     * @param {number} offset
	     * @param {number} length
	     **/
	    Kerl.prototype.absorb = function (trits, offset, length) {
	        if (length && length % 243 !== 0) {
	            throw new Error(errors$2.ILLEGAL_TRITS_LENGTH);
	        }
	        do {
	            var limit = length < Kerl.HASH_LENGTH ? length : Kerl.HASH_LENGTH;
	            var trit_state = trits.slice(offset, offset + limit);
	            offset += limit;
	            // convert trit state to words
	            var wordsToAbsorb = wordConverter.tritsToWords(trit_state);
	            // absorb the trit stat as wordarray
	            this.k.update(cryptoJs.lib.WordArray.create(wordsToAbsorb));
	        } while ((length -= Kerl.HASH_LENGTH) > 0);
	    };
	    /**
	     * Squeezes trits given an offset and length
	     *
	     * @method squeeze
	     *
	     * @ignore
	     *
	     * @param {Int8Array} trits
	     * @param {number} offset
	     * @param {number} length
	     **/
	    Kerl.prototype.squeeze = function (trits, offset, length) {
	        if (length && length % 243 !== 0) {
	            throw new Error(errors$2.ILLEGAL_TRITS_LENGTH);
	        }
	        do {
	            // get the hash digest
	            var kCopy = this.k.clone();
	            var final = kCopy.finalize();
	            // Convert words to trits and then map it into the internal state
	            var trit_state = wordConverter.wordsToTrits(final.words);
	            var i = 0;
	            var limit = length < Kerl.HASH_LENGTH ? length : Kerl.HASH_LENGTH;
	            while (i < limit) {
	                trits[offset++] = trit_state[i++];
	            }
	            this.reset();
	            for (i = 0; i < final.words.length; i++) {
	                final.words[i] = final.words[i] ^ 0xffffffff;
	            }
	            this.k.update(final);
	        } while ((length -= Kerl.HASH_LENGTH) > 0);
	    };
	    Kerl.BIT_HASH_LENGTH = BIT_HASH_LENGTH;
	    Kerl.HASH_LENGTH = HASH_LENGTH;
	    return Kerl;
	}());
	exports["default"] = Kerl;

	});

	unwrapExports(kerl);

	var src$2 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;

	exports["default"] = kerl["default"];

	});

	unwrapExports(src$2);

	var errors$3 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.ILLEGAL_LENGTH = 'Illegal trits length';
	exports.ILLEGAL_SUBSEED_INDEX = 'Illegal subseed length';
	exports.ILLEGAL_SUBSEED_LENGTH = 'Illegal subseed length';
	exports.ILLEGAL_NUMBER_OF_FRAGMENTS = 'Illegal number of fragments';
	exports.ILLEGAL_KEY_LENGTH = 'Illegal key length';
	exports.ILLEGAL_DIGESTS_LENGTH = 'Illegal digests length';
	exports.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH = 'Illegal normalized fragment length';
	exports.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH = 'Illegal signature fragment length';
	exports.ILLEGAL_BUNDLE_HASH_LENGTH = 'Illegal bundle hash length';
	exports.ILLEGAL_KEY_FRAGMENT_LENGTH = 'Illegal key fragment length';
	exports.ILLEGAL_TRIT_CONVERSION_INPUT = 'Illegal conversion input. Expected trits as Int8Array.';
	exports.ILLEGAL_TRYTE_CONVERSION_INPUT = 'Illegal conversion input. Expected trytes string or integer.';
	exports.ILLEGAL_MIN_WEIGHT_MAGNITUDE = 'Illegal minWeightMagnitude value.';
	exports.ILLEGAL_ADDRESS_LAST_TRIT = 'Illegal address. Last trit must be 0.';
	exports.ILLEGAL_ADDRESS_LENGTH = 'Illegal address length.';
	exports.ILLEGAL_BUNDLE_LENGTH = 'Illegal bundle hash length.';
	exports.ILLEGAL_OBSOLETE_TAG_LENGTH = 'Illegal obsoleteTag length.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE = 'Illegal signature or message.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH = 'Illegal signatureOrMessage length.';
	exports.ILLEGAL_TAG_LENGTH = 'Illegal tag length.';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP = 'Illegal issuance timestamp';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH = 'Illegal issuanceTimestamp length.';
	exports.ILLEGAL_VALUE_LENGTH = 'Illegal value length.';
	exports.ILLEGAL_TRANSACTION_FIELD_OFFSET = 'Illegal transaction field offset.';
	exports.ILLEGAL_TRANSACTION_FIELD_LENGTH = 'Illegal transaction field length.';
	exports.ILLEGAL_LENGTH_OR_OFFSET = 'Illegal length or offset.';
	exports.ILLEGAL_TRANSACTION_BUFFER = 'Illegal transaction buffer. Expected `Int8Array`.';
	exports.ILLEGAL_TRANSACTION_BUFFER_LENGTH = 'Illegal transaction buffer length.';
	exports.ILLEGAL_TRANSACTION_OFFSET = 'Illegal transaction offset.';
	exports.ILLEGAL_TRANSACTION_LENGTH = 'Illegal transaction length.';
	exports.ILLEGAL_TRANSACTION_ORDER = 'Illegal transaction order.';
	exports.ILLEGAL_TRANSACTION_INDEX = 'Illegal transaction index.';
	exports.ILLEGAL_SEED_LENGTH = 'Illegal seed length. Expected length of 243 trits.';
	exports.ILLEGAL_KEY_INDEX = 'Illegal key index.';
	exports.ILLEGAL_CDA_LENGTH = 'Illegal cda length.';
	exports.ILLEGAL_BATCH = 'Illegal batch.';
	exports.CDA_ALREADY_IN_STORE = 'CDA is already in store.';
	exports.ILLEGAL_PERSISTENCE_ID = 'Illegal persistence id.';
	exports.ILLEGAL_PERSISTENCE_PATH = 'Illegal persistence path.';
	exports.ILLEGAL_PADDING_LENGTH = 'Illegal padding length. Input value length exceeds padding length.';
	exports.INCONSISTENT_SUBTANGLE = 'Inconsistent subtangle';
	exports.INSUFFICIENT_BALANCE = 'Insufficient balance';
	exports.INVALID_ADDRESS = 'Invalid address';
	exports.INVALID_REMAINDER_ADDRESS = 'Invalid remainder address';
	exports.INVALID_BRANCH_TRANSACTION = 'Invalid branch transaction';
	exports.INVALID_BUNDLE = 'Invalid bundle';
	exports.INVALID_BUNDLE_HASH = 'Invalid bundle hash';
	exports.INVALID_CHECKSUM = 'Invalid checksum';
	exports.INVALID_COMMAND = 'Invalid command format';
	exports.INVALID_DEPTH = 'Invalid depth';
	exports.INVALID_HASH = 'Invalid hash';
	exports.INVALID_INDEX = 'Invalid index option';
	exports.INVALID_TOTAL_OPTION = 'Invalid total option';
	exports.INVALID_INPUT = 'Invalid input';
	exports.INVALID_KEY = 'Invalid key value';
	exports.INVALID_MIN_WEIGHT_MAGNITUDE = 'Invalid Min Weight Magnitude';
	exports.INVALID_SEARCH_KEY = 'Invalid search key';
	exports.INVALID_SECURITY_LEVEL = 'Invalid security option';
	exports.INVALID_SECURITY_OPTION = 'Invalid security option';
	exports.INVALID_SEED = 'Invalid seed';
	exports.INVALID_START_END_OPTIONS = 'Invalid end option';
	exports.INVALID_START_OPTION = 'Invalid start option';
	exports.INVALID_TAG = 'Invalid tag';
	exports.INVALID_TRANSACTION = 'Invalid transaction';
	exports.INVALID_TRANSACTION_TRYTES = 'Invalid transaction trytes';
	exports.INVALID_ATTACHED_TRYTES = 'Invalid attached trytes';
	exports.INVALID_TRANSACTION_HASH = 'Invalid transaction hash';
	exports.INVALID_TAIL_TRANSACTION = 'Invalid tail transaction';
	exports.INVALID_THRESHOLD = 'Invalid threshold option';
	exports.INVALID_TRANSFER = 'Invalid transfer array';
	exports.INVALID_TRUNK_TRANSACTION = 'Invalid trunk transaction';
	exports.INVALID_REFERENCE_HASH = 'Invalid reference hash';
	exports.INVALID_TRYTES = 'Invalid trytes';
	exports.INVALID_URI = 'Invalid uri';
	exports.INVALID_ASCII_INPUT = 'Conversion to trytes requires type of input to be encoded in ascii.';
	exports.INVALID_ODD_LENGTH = 'Conversion from trytes requires length of trytes to be even.';
	exports.INVALID_TRYTE_ENCODED_JSON = 'Invalid tryte encoded JSON message';
	exports.NOT_INT = 'One of the inputs is not integer';
	exports.SENDING_BACK_TO_INPUTS = 'One of the transaction inputs is used as output.';
	exports.INVALID_TRANSACTIONS_TO_APPROVE = 'Invalid transactions to approve.';
	exports.NO_INPUTS = 'Could not find any available inputs.';
	exports.invalidChecksum = function (address) { return "Invalid Checksum: " + address; };
	exports.inconsistentTransaction = function (reason) { return "Transaction is inconsistent. Reason: " + reason; };
	exports.INVALID_DELAY = 'Invalid delay.';

	});

	unwrapExports(errors$3);
	var errors_1$3 = errors$3.ILLEGAL_LENGTH;
	var errors_2$3 = errors$3.ILLEGAL_SUBSEED_INDEX;
	var errors_3$2 = errors$3.ILLEGAL_SUBSEED_LENGTH;
	var errors_4$2 = errors$3.ILLEGAL_NUMBER_OF_FRAGMENTS;
	var errors_5$1 = errors$3.ILLEGAL_KEY_LENGTH;
	var errors_6$1 = errors$3.ILLEGAL_DIGESTS_LENGTH;
	var errors_7$1 = errors$3.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH;
	var errors_8$1 = errors$3.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH;
	var errors_9$1 = errors$3.ILLEGAL_BUNDLE_HASH_LENGTH;
	var errors_10$1 = errors$3.ILLEGAL_KEY_FRAGMENT_LENGTH;
	var errors_11$1 = errors$3.ILLEGAL_TRIT_CONVERSION_INPUT;
	var errors_12$1 = errors$3.ILLEGAL_TRYTE_CONVERSION_INPUT;
	var errors_13$1 = errors$3.ILLEGAL_MIN_WEIGHT_MAGNITUDE;
	var errors_14$1 = errors$3.ILLEGAL_ADDRESS_LAST_TRIT;
	var errors_15$1 = errors$3.ILLEGAL_ADDRESS_LENGTH;
	var errors_16$1 = errors$3.ILLEGAL_BUNDLE_LENGTH;
	var errors_17$1 = errors$3.ILLEGAL_OBSOLETE_TAG_LENGTH;
	var errors_18$1 = errors$3.ILLEGAL_SIGNATURE_OR_MESSAGE;
	var errors_19$1 = errors$3.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH;
	var errors_20$1 = errors$3.ILLEGAL_TAG_LENGTH;
	var errors_21$1 = errors$3.ILLEGAL_ISSUANCE_TIMESTAMP;
	var errors_22$1 = errors$3.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH;
	var errors_23$1 = errors$3.ILLEGAL_VALUE_LENGTH;
	var errors_24$1 = errors$3.ILLEGAL_TRANSACTION_FIELD_OFFSET;
	var errors_25$1 = errors$3.ILLEGAL_TRANSACTION_FIELD_LENGTH;
	var errors_26$1 = errors$3.ILLEGAL_LENGTH_OR_OFFSET;
	var errors_27$1 = errors$3.ILLEGAL_TRANSACTION_BUFFER;
	var errors_28$1 = errors$3.ILLEGAL_TRANSACTION_BUFFER_LENGTH;
	var errors_29$1 = errors$3.ILLEGAL_TRANSACTION_OFFSET;
	var errors_30$1 = errors$3.ILLEGAL_TRANSACTION_LENGTH;
	var errors_31$1 = errors$3.ILLEGAL_TRANSACTION_ORDER;
	var errors_32$1 = errors$3.ILLEGAL_TRANSACTION_INDEX;
	var errors_33$1 = errors$3.ILLEGAL_SEED_LENGTH;
	var errors_34$1 = errors$3.ILLEGAL_KEY_INDEX;
	var errors_35$1 = errors$3.ILLEGAL_CDA_LENGTH;
	var errors_36$1 = errors$3.ILLEGAL_BATCH;
	var errors_37$1 = errors$3.CDA_ALREADY_IN_STORE;
	var errors_38$1 = errors$3.ILLEGAL_PERSISTENCE_ID;
	var errors_39$1 = errors$3.ILLEGAL_PERSISTENCE_PATH;
	var errors_40$1 = errors$3.ILLEGAL_PADDING_LENGTH;
	var errors_41$1 = errors$3.INCONSISTENT_SUBTANGLE;
	var errors_42$1 = errors$3.INSUFFICIENT_BALANCE;
	var errors_43$1 = errors$3.INVALID_ADDRESS;
	var errors_44$1 = errors$3.INVALID_REMAINDER_ADDRESS;
	var errors_45$1 = errors$3.INVALID_BRANCH_TRANSACTION;
	var errors_46$1 = errors$3.INVALID_BUNDLE;
	var errors_47$1 = errors$3.INVALID_BUNDLE_HASH;
	var errors_48$1 = errors$3.INVALID_CHECKSUM;
	var errors_49$1 = errors$3.INVALID_COMMAND;
	var errors_50$1 = errors$3.INVALID_DEPTH;
	var errors_51$1 = errors$3.INVALID_HASH;
	var errors_52$1 = errors$3.INVALID_INDEX;
	var errors_53$1 = errors$3.INVALID_TOTAL_OPTION;
	var errors_54$1 = errors$3.INVALID_INPUT;
	var errors_55$1 = errors$3.INVALID_KEY;
	var errors_56$1 = errors$3.INVALID_MIN_WEIGHT_MAGNITUDE;
	var errors_57$1 = errors$3.INVALID_SEARCH_KEY;
	var errors_58$1 = errors$3.INVALID_SECURITY_LEVEL;
	var errors_59$1 = errors$3.INVALID_SECURITY_OPTION;
	var errors_60$1 = errors$3.INVALID_SEED;
	var errors_61$1 = errors$3.INVALID_START_END_OPTIONS;
	var errors_62$1 = errors$3.INVALID_START_OPTION;
	var errors_63$1 = errors$3.INVALID_TAG;
	var errors_64$1 = errors$3.INVALID_TRANSACTION;
	var errors_65$1 = errors$3.INVALID_TRANSACTION_TRYTES;
	var errors_66$1 = errors$3.INVALID_ATTACHED_TRYTES;
	var errors_67$1 = errors$3.INVALID_TRANSACTION_HASH;
	var errors_68$1 = errors$3.INVALID_TAIL_TRANSACTION;
	var errors_69$1 = errors$3.INVALID_THRESHOLD;
	var errors_70$1 = errors$3.INVALID_TRANSFER;
	var errors_71$1 = errors$3.INVALID_TRUNK_TRANSACTION;
	var errors_72$1 = errors$3.INVALID_REFERENCE_HASH;
	var errors_73$1 = errors$3.INVALID_TRYTES;
	var errors_74$1 = errors$3.INVALID_URI;
	var errors_75$1 = errors$3.INVALID_ASCII_INPUT;
	var errors_76$1 = errors$3.INVALID_ODD_LENGTH;
	var errors_77$1 = errors$3.INVALID_TRYTE_ENCODED_JSON;
	var errors_78$1 = errors$3.NOT_INT;
	var errors_79$1 = errors$3.SENDING_BACK_TO_INPUTS;
	var errors_80$1 = errors$3.INVALID_TRANSACTIONS_TO_APPROVE;
	var errors_81$1 = errors$3.NO_INPUTS;
	var errors_82$1 = errors$3.invalidChecksum;
	var errors_83$1 = errors$3.inconsistentTransaction;
	var errors_84$1 = errors$3.INVALID_DELAY;

	if (!Int8Array.prototype.slice) {
	    Object.defineProperty(Int8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.subarray) {
	    Object.defineProperty(Uint8Array.prototype, 'subarray', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.map) {
	    Object.defineProperty(Int8Array.prototype, 'map', {
	        value: Array.prototype.map
	    });
	}
	if (!Int8Array.prototype.every) {
	    Object.defineProperty(Int8Array.prototype, 'every', {
	        value: Array.prototype.every
	    });
	}
	if (!Int8Array.prototype.some) {
	    Object.defineProperty(Uint8Array.prototype, 'some', {
	        value: Array.prototype.some
	    });
	}
	if (!Int8Array.prototype.indexOf) {
	    Object.defineProperty(Int8Array.prototype, 'indexOf', {
	        value: Array.prototype.indexOf
	    });
	}
	// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Polyfill
	// Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/
	if (!Int8Array.prototype.fill) {
	    Object.defineProperty(Int8Array.prototype, 'fill', {
	        value: function (input) {
	            // Steps 1-2.
	            if (this == null) {
	                throw new TypeError('this is null or not defined');
	            }
	            var O = Object(this);
	            // Steps 3-5.
	            var len = O.length >>> 0;
	            // Steps 6-7.
	            var start = arguments[1];
	            var relativeStart = start >> 0;
	            // Step 8.
	            var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
	            // Steps 9-10.
	            var end = arguments[2];
	            var relativeEnd = end === undefined ? len : end >> 0;
	            // Step 11.
	            var last = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
	            // Step 12.
	            while (k < last) {
	                O[k] = input;
	                k++;
	            }
	            // Step 13.
	            return O;
	        }
	    });
	}
	if (!Uint32Array.prototype.slice) {
	    Object.defineProperty(Uint8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Uint32Array.prototype.reverse) {
	    Object.defineProperty(Uint8Array.prototype, 'reverse', {
	        value: Array.prototype.reverse
	    });
	}

	var src$3 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;


	exports.padTrytes = function (length) { return function (trytes) {
	    return trytes.length < length ? trytes.concat('9'.repeat(length - trytes.length)) : trytes;
	}; };
	exports.padTrits = function (length) { return function (trits) {
	    if (trits.length > length) {
	        throw new Error(errors$3.ILLEGAL_PADDING_LENGTH);
	    }
	    var tritsCopy = new Int8Array(length);
	    tritsCopy.set(trits, 0);
	    return tritsCopy;
	}; };
	exports.padTag = exports.padTrytes(27);
	exports.padTagArray = function (tags) { return tags.map(exports.padTag); };

	});

	unwrapExports(src$3);
	var src_1$1 = src$3.padTrytes;
	var src_2$1 = src$3.padTrits;
	var src_3$1 = src$3.padTag;
	var src_4$1 = src$3.padTagArray;

	var errors$4 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.ILLEGAL_LENGTH = 'Illegal trits length';
	exports.ILLEGAL_SUBSEED_INDEX = 'Illegal subseed length';
	exports.ILLEGAL_SUBSEED_LENGTH = 'Illegal subseed length';
	exports.ILLEGAL_NUMBER_OF_FRAGMENTS = 'Illegal number of fragments';
	exports.ILLEGAL_KEY_LENGTH = 'Illegal key length';
	exports.ILLEGAL_DIGESTS_LENGTH = 'Illegal digests length';
	exports.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH = 'Illegal normalized fragment length';
	exports.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH = 'Illegal signature fragment length';
	exports.ILLEGAL_BUNDLE_HASH_LENGTH = 'Illegal bundle hash length';
	exports.ILLEGAL_KEY_FRAGMENT_LENGTH = 'Illegal key fragment length';
	exports.ILLEGAL_TRIT_CONVERSION_INPUT = 'Illegal conversion input. Expected trits as Int8Array.';
	exports.ILLEGAL_TRYTE_CONVERSION_INPUT = 'Illegal conversion input. Expected trytes string or integer.';
	exports.ILLEGAL_MIN_WEIGHT_MAGNITUDE = 'Illegal minWeightMagnitude value.';
	exports.ILLEGAL_ADDRESS_LAST_TRIT = 'Illegal address. Last trit must be 0.';
	exports.ILLEGAL_ADDRESS_LENGTH = 'Illegal address length.';
	exports.ILLEGAL_BUNDLE_LENGTH = 'Illegal bundle hash length.';
	exports.ILLEGAL_OBSOLETE_TAG_LENGTH = 'Illegal obsoleteTag length.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE = 'Illegal signature or message.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH = 'Illegal signatureOrMessage length.';
	exports.ILLEGAL_TAG_LENGTH = 'Illegal tag length.';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP = 'Illegal issuance timestamp';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH = 'Illegal issuanceTimestamp length.';
	exports.ILLEGAL_VALUE_LENGTH = 'Illegal value length.';
	exports.ILLEGAL_TRANSACTION_FIELD_OFFSET = 'Illegal transaction field offset.';
	exports.ILLEGAL_TRANSACTION_FIELD_LENGTH = 'Illegal transaction field length.';
	exports.ILLEGAL_LENGTH_OR_OFFSET = 'Illegal length or offset.';
	exports.ILLEGAL_TRANSACTION_BUFFER = 'Illegal transaction buffer. Expected `Int8Array`.';
	exports.ILLEGAL_TRANSACTION_BUFFER_LENGTH = 'Illegal transaction buffer length.';
	exports.ILLEGAL_TRANSACTION_OFFSET = 'Illegal transaction offset.';
	exports.ILLEGAL_TRANSACTION_LENGTH = 'Illegal transaction length.';
	exports.ILLEGAL_TRANSACTION_ORDER = 'Illegal transaction order.';
	exports.ILLEGAL_TRANSACTION_INDEX = 'Illegal transaction index.';
	exports.ILLEGAL_SEED_LENGTH = 'Illegal seed length. Expected length of 243 trits.';
	exports.ILLEGAL_KEY_INDEX = 'Illegal key index.';
	exports.ILLEGAL_CDA_LENGTH = 'Illegal cda length.';
	exports.ILLEGAL_BATCH = 'Illegal batch.';
	exports.CDA_ALREADY_IN_STORE = 'CDA is already in store.';
	exports.ILLEGAL_PERSISTENCE_ID = 'Illegal persistence id.';
	exports.ILLEGAL_PERSISTENCE_PATH = 'Illegal persistence path.';
	exports.ILLEGAL_PADDING_LENGTH = 'Illegal padding length. Input value length exceeds padding length.';
	exports.INCONSISTENT_SUBTANGLE = 'Inconsistent subtangle';
	exports.INSUFFICIENT_BALANCE = 'Insufficient balance';
	exports.INVALID_ADDRESS = 'Invalid address';
	exports.INVALID_REMAINDER_ADDRESS = 'Invalid remainder address';
	exports.INVALID_BRANCH_TRANSACTION = 'Invalid branch transaction';
	exports.INVALID_BUNDLE = 'Invalid bundle';
	exports.INVALID_BUNDLE_HASH = 'Invalid bundle hash';
	exports.INVALID_CHECKSUM = 'Invalid checksum';
	exports.INVALID_COMMAND = 'Invalid command format';
	exports.INVALID_DEPTH = 'Invalid depth';
	exports.INVALID_HASH = 'Invalid hash';
	exports.INVALID_INDEX = 'Invalid index option';
	exports.INVALID_TOTAL_OPTION = 'Invalid total option';
	exports.INVALID_INPUT = 'Invalid input';
	exports.INVALID_KEY = 'Invalid key value';
	exports.INVALID_MIN_WEIGHT_MAGNITUDE = 'Invalid Min Weight Magnitude';
	exports.INVALID_SEARCH_KEY = 'Invalid search key';
	exports.INVALID_SECURITY_LEVEL = 'Invalid security option';
	exports.INVALID_SECURITY_OPTION = 'Invalid security option';
	exports.INVALID_SEED = 'Invalid seed';
	exports.INVALID_START_END_OPTIONS = 'Invalid end option';
	exports.INVALID_START_OPTION = 'Invalid start option';
	exports.INVALID_TAG = 'Invalid tag';
	exports.INVALID_TRANSACTION = 'Invalid transaction';
	exports.INVALID_TRANSACTION_TRYTES = 'Invalid transaction trytes';
	exports.INVALID_ATTACHED_TRYTES = 'Invalid attached trytes';
	exports.INVALID_TRANSACTION_HASH = 'Invalid transaction hash';
	exports.INVALID_TAIL_TRANSACTION = 'Invalid tail transaction';
	exports.INVALID_THRESHOLD = 'Invalid threshold option';
	exports.INVALID_TRANSFER = 'Invalid transfer array';
	exports.INVALID_TRUNK_TRANSACTION = 'Invalid trunk transaction';
	exports.INVALID_REFERENCE_HASH = 'Invalid reference hash';
	exports.INVALID_TRYTES = 'Invalid trytes';
	exports.INVALID_URI = 'Invalid uri';
	exports.INVALID_ASCII_INPUT = 'Conversion to trytes requires type of input to be encoded in ascii.';
	exports.INVALID_ODD_LENGTH = 'Conversion from trytes requires length of trytes to be even.';
	exports.INVALID_TRYTE_ENCODED_JSON = 'Invalid tryte encoded JSON message';
	exports.NOT_INT = 'One of the inputs is not integer';
	exports.SENDING_BACK_TO_INPUTS = 'One of the transaction inputs is used as output.';
	exports.INVALID_TRANSACTIONS_TO_APPROVE = 'Invalid transactions to approve.';
	exports.NO_INPUTS = 'Could not find any available inputs.';
	exports.invalidChecksum = function (address) { return "Invalid Checksum: " + address; };
	exports.inconsistentTransaction = function (reason) { return "Transaction is inconsistent. Reason: " + reason; };
	exports.INVALID_DELAY = 'Invalid delay.';

	});

	unwrapExports(errors$4);
	var errors_1$4 = errors$4.ILLEGAL_LENGTH;
	var errors_2$4 = errors$4.ILLEGAL_SUBSEED_INDEX;
	var errors_3$3 = errors$4.ILLEGAL_SUBSEED_LENGTH;
	var errors_4$3 = errors$4.ILLEGAL_NUMBER_OF_FRAGMENTS;
	var errors_5$2 = errors$4.ILLEGAL_KEY_LENGTH;
	var errors_6$2 = errors$4.ILLEGAL_DIGESTS_LENGTH;
	var errors_7$2 = errors$4.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH;
	var errors_8$2 = errors$4.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH;
	var errors_9$2 = errors$4.ILLEGAL_BUNDLE_HASH_LENGTH;
	var errors_10$2 = errors$4.ILLEGAL_KEY_FRAGMENT_LENGTH;
	var errors_11$2 = errors$4.ILLEGAL_TRIT_CONVERSION_INPUT;
	var errors_12$2 = errors$4.ILLEGAL_TRYTE_CONVERSION_INPUT;
	var errors_13$2 = errors$4.ILLEGAL_MIN_WEIGHT_MAGNITUDE;
	var errors_14$2 = errors$4.ILLEGAL_ADDRESS_LAST_TRIT;
	var errors_15$2 = errors$4.ILLEGAL_ADDRESS_LENGTH;
	var errors_16$2 = errors$4.ILLEGAL_BUNDLE_LENGTH;
	var errors_17$2 = errors$4.ILLEGAL_OBSOLETE_TAG_LENGTH;
	var errors_18$2 = errors$4.ILLEGAL_SIGNATURE_OR_MESSAGE;
	var errors_19$2 = errors$4.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH;
	var errors_20$2 = errors$4.ILLEGAL_TAG_LENGTH;
	var errors_21$2 = errors$4.ILLEGAL_ISSUANCE_TIMESTAMP;
	var errors_22$2 = errors$4.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH;
	var errors_23$2 = errors$4.ILLEGAL_VALUE_LENGTH;
	var errors_24$2 = errors$4.ILLEGAL_TRANSACTION_FIELD_OFFSET;
	var errors_25$2 = errors$4.ILLEGAL_TRANSACTION_FIELD_LENGTH;
	var errors_26$2 = errors$4.ILLEGAL_LENGTH_OR_OFFSET;
	var errors_27$2 = errors$4.ILLEGAL_TRANSACTION_BUFFER;
	var errors_28$2 = errors$4.ILLEGAL_TRANSACTION_BUFFER_LENGTH;
	var errors_29$2 = errors$4.ILLEGAL_TRANSACTION_OFFSET;
	var errors_30$2 = errors$4.ILLEGAL_TRANSACTION_LENGTH;
	var errors_31$2 = errors$4.ILLEGAL_TRANSACTION_ORDER;
	var errors_32$2 = errors$4.ILLEGAL_TRANSACTION_INDEX;
	var errors_33$2 = errors$4.ILLEGAL_SEED_LENGTH;
	var errors_34$2 = errors$4.ILLEGAL_KEY_INDEX;
	var errors_35$2 = errors$4.ILLEGAL_CDA_LENGTH;
	var errors_36$2 = errors$4.ILLEGAL_BATCH;
	var errors_37$2 = errors$4.CDA_ALREADY_IN_STORE;
	var errors_38$2 = errors$4.ILLEGAL_PERSISTENCE_ID;
	var errors_39$2 = errors$4.ILLEGAL_PERSISTENCE_PATH;
	var errors_40$2 = errors$4.ILLEGAL_PADDING_LENGTH;
	var errors_41$2 = errors$4.INCONSISTENT_SUBTANGLE;
	var errors_42$2 = errors$4.INSUFFICIENT_BALANCE;
	var errors_43$2 = errors$4.INVALID_ADDRESS;
	var errors_44$2 = errors$4.INVALID_REMAINDER_ADDRESS;
	var errors_45$2 = errors$4.INVALID_BRANCH_TRANSACTION;
	var errors_46$2 = errors$4.INVALID_BUNDLE;
	var errors_47$2 = errors$4.INVALID_BUNDLE_HASH;
	var errors_48$2 = errors$4.INVALID_CHECKSUM;
	var errors_49$2 = errors$4.INVALID_COMMAND;
	var errors_50$2 = errors$4.INVALID_DEPTH;
	var errors_51$2 = errors$4.INVALID_HASH;
	var errors_52$2 = errors$4.INVALID_INDEX;
	var errors_53$2 = errors$4.INVALID_TOTAL_OPTION;
	var errors_54$2 = errors$4.INVALID_INPUT;
	var errors_55$2 = errors$4.INVALID_KEY;
	var errors_56$2 = errors$4.INVALID_MIN_WEIGHT_MAGNITUDE;
	var errors_57$2 = errors$4.INVALID_SEARCH_KEY;
	var errors_58$2 = errors$4.INVALID_SECURITY_LEVEL;
	var errors_59$2 = errors$4.INVALID_SECURITY_OPTION;
	var errors_60$2 = errors$4.INVALID_SEED;
	var errors_61$2 = errors$4.INVALID_START_END_OPTIONS;
	var errors_62$2 = errors$4.INVALID_START_OPTION;
	var errors_63$2 = errors$4.INVALID_TAG;
	var errors_64$2 = errors$4.INVALID_TRANSACTION;
	var errors_65$2 = errors$4.INVALID_TRANSACTION_TRYTES;
	var errors_66$2 = errors$4.INVALID_ATTACHED_TRYTES;
	var errors_67$2 = errors$4.INVALID_TRANSACTION_HASH;
	var errors_68$2 = errors$4.INVALID_TAIL_TRANSACTION;
	var errors_69$2 = errors$4.INVALID_THRESHOLD;
	var errors_70$2 = errors$4.INVALID_TRANSFER;
	var errors_71$2 = errors$4.INVALID_TRUNK_TRANSACTION;
	var errors_72$2 = errors$4.INVALID_REFERENCE_HASH;
	var errors_73$2 = errors$4.INVALID_TRYTES;
	var errors_74$2 = errors$4.INVALID_URI;
	var errors_75$2 = errors$4.INVALID_ASCII_INPUT;
	var errors_76$2 = errors$4.INVALID_ODD_LENGTH;
	var errors_77$2 = errors$4.INVALID_TRYTE_ENCODED_JSON;
	var errors_78$2 = errors$4.NOT_INT;
	var errors_79$2 = errors$4.SENDING_BACK_TO_INPUTS;
	var errors_80$2 = errors$4.INVALID_TRANSACTIONS_TO_APPROVE;
	var errors_81$2 = errors$4.NO_INPUTS;
	var errors_82$2 = errors$4.invalidChecksum;
	var errors_83$2 = errors$4.inconsistentTransaction;
	var errors_84$2 = errors$4.INVALID_DELAY;

	if (!Int8Array.prototype.slice) {
	    Object.defineProperty(Int8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.subarray) {
	    Object.defineProperty(Uint8Array.prototype, 'subarray', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.map) {
	    Object.defineProperty(Int8Array.prototype, 'map', {
	        value: Array.prototype.map
	    });
	}
	if (!Int8Array.prototype.every) {
	    Object.defineProperty(Int8Array.prototype, 'every', {
	        value: Array.prototype.every
	    });
	}
	if (!Int8Array.prototype.some) {
	    Object.defineProperty(Uint8Array.prototype, 'some', {
	        value: Array.prototype.some
	    });
	}
	if (!Int8Array.prototype.indexOf) {
	    Object.defineProperty(Int8Array.prototype, 'indexOf', {
	        value: Array.prototype.indexOf
	    });
	}
	// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Polyfill
	// Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/
	if (!Int8Array.prototype.fill) {
	    Object.defineProperty(Int8Array.prototype, 'fill', {
	        value: function (input) {
	            // Steps 1-2.
	            if (this == null) {
	                throw new TypeError('this is null or not defined');
	            }
	            var O = Object(this);
	            // Steps 3-5.
	            var len = O.length >>> 0;
	            // Steps 6-7.
	            var start = arguments[1];
	            var relativeStart = start >> 0;
	            // Step 8.
	            var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
	            // Steps 9-10.
	            var end = arguments[2];
	            var relativeEnd = end === undefined ? len : end >> 0;
	            // Step 11.
	            var last = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
	            // Step 12.
	            while (k < last) {
	                O[k] = input;
	                k++;
	            }
	            // Step 13.
	            return O;
	        }
	    });
	}
	if (!Uint32Array.prototype.slice) {
	    Object.defineProperty(Uint8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Uint32Array.prototype.reverse) {
	    Object.defineProperty(Uint8Array.prototype, 'reverse', {
	        value: Array.prototype.reverse
	    });
	}

	var add_1 = createCommonjsModule(function (module, exports) {
	/* copyright Paul Handy, 2017 */
	exports.__esModule = true;
	/* tslint:disable variable-name */
	function sum(a, b) {
	    var s = a + b;
	    switch (s) {
	        case 2:
	            return -1;
	        case -2:
	            return 1;
	        default:
	            return s;
	    }
	}
	function cons(a, b) {
	    if (a === b) {
	        return a;
	    }
	    return 0;
	}
	function any(a, b) {
	    var s = a + b;
	    if (s > 0) {
	        return 1;
	    }
	    else if (s < 0) {
	        return -1;
	    }
	    return 0;
	}
	function full_add(a, b, c) {
	    var s_a = sum(a, b);
	    var c_a = cons(a, b);
	    var c_b = cons(s_a, c);
	    var c_out = any(c_a, c_b);
	    var s_out = sum(s_a, c);
	    return [s_out, c_out];
	}
	function add(a, b) {
	    var out = new Int8Array(Math.max(a.length, b.length));
	    var carry = 0;
	    var a_i;
	    var b_i;
	    for (var i = 0; i < out.length; i++) {
	        a_i = i < a.length ? a[i] : 0;
	        b_i = i < b.length ? b[i] : 0;
	        var f_a = full_add(a_i, b_i, carry);
	        out[i] = f_a[0];
	        carry = f_a[1];
	    }
	    return out;
	}
	exports.add = add;
	exports.increment = function (value) { return add(value, new Int8Array(1).fill(1)); };

	});

	unwrapExports(add_1);
	var add_2 = add_1.add;
	var add_3 = add_1.increment;

	var signing = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	/** @module signing */







	exports.MIN_TRYTE_VALUE = -13;
	exports.MAX_TRYTE_VALUE = 13;
	exports.NUMBER_OF_SECURITY_LEVELS = 3;
	exports.HASH_LENGTH = 243;
	exports.FRAGMENT_LENGTH = (exports.HASH_LENGTH / exports.NUMBER_OF_SECURITY_LEVELS / src.TRYTE_WIDTH) * exports.HASH_LENGTH;
	exports.NUMBER_OF_FRAGMENT_CHUNKS = exports.FRAGMENT_LENGTH / exports.HASH_LENGTH;
	exports.NORMALIZED_FRAGMENT_LENGTH = exports.HASH_LENGTH / src.TRYTE_WIDTH / exports.NUMBER_OF_SECURITY_LEVELS;
	/**
	 * This method derives a subseed from a seed and a private key index.
	 *
	 * You can use the subseed to [derive private keys and their addresses](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/derive-addresses-from-private-keys).
	 *
	 * **Note:** If the given seed is less then 243 trits, 0 trits are appended to it until it is 243 trits long.
	 *
	 * ## Related methods
	 *
	 * To convert a seed from trytes to trits, use the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
	 *
	 * To derive a private key from the subseed, use the [`key()`]{@link #module_signing.key} method.
	 *
	 * @method subseed
	 *
	 * @summary Generates a subseed.
	 *
	 * @memberof module:signing
	 *
	 * @param {Int8Array} seed - A 243-trit seed to use to derive the subseed
	 * @param {number} index - The private key index to use to derive the subseed
	 *
	 * @example
	 * ```js
	 * const seed = 'MYSUPERSECRETSEED...';
	 * const subseed = Sign.subseed(Converter.trytesToTrits(seed), 0);
	 * ```
	 *
	 * @return {Int8Array} subseed - A subseed in trits
	 *
	 * @throws {errors.ILLEGAL_SUBSEED_INDEX}: Make sure that the `index` argument is a number greater than 0.
	 */
	function subseed(seed, index) {
	    if (!Number.isInteger(index) || index < 0) {
	        throw new Error(errors$4.ILLEGAL_SUBSEED_INDEX);
	    }
	    var pad = src$3.padTrits(Math.ceil(seed.length / exports.HASH_LENGTH) * exports.HASH_LENGTH);
	    var subseedPreimage = add_1.add(pad(seed), src.fromValue(index));
	    var subseedTrits = new Int8Array(exports.HASH_LENGTH);
	    var sponge = new src$2["default"]();
	    sponge.absorb(subseedPreimage, 0, subseedPreimage.length);
	    sponge.squeeze(subseedTrits, 0, exports.HASH_LENGTH);
	    return subseedTrits;
	}
	exports.subseed = subseed;
	/**
	 * This method derives a private key from a subseed.
	 *
	 * You can use the private key to [derive an address](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/derive-addresses-from-private-keys) and to sign bundles that withdraw from that address.
	 *
	 * ## Related methods
	 *
	 * To generate a subseed, use the [`subseed()`]{@link #module_signing.subseed} method.
	 *
	 * @method key
	 *
	 * @summary Generates a private key.
	 *
	 * @memberof module:signing
	 *
	 * @param {Int8Array} subseedTrits - A subseed in trits
	 * @param {number} numberOfFragments - The security level that you want the private key to have
	 *
	 * @example
	 * ```js
	 * const seed = 'MYSUPERSECRETSEED...';
	 * const subseed = Signing.subseed(Converter.trytesToTrits(seed), 0);
	 *
	 * const privateKey = Signing.key(subseed, 2);
	 * ```
	 *
	 * @return {Int8Array} privateKey - A private key in trits.
	 *
	 * @throws {errors.ILLEGAL_SUBSEED_LENGTH}: Make sure that the `subseedTrits` argument contains 243 trits.
	 * @throws {errors.ILLEGAL_NUMBER_OF_FRAGMENTS}: Make sure that the `numberOfFragments` argument is a valid security level (between 1 and 3).
	 */
	function key(subseedTrits, numberOfFragments) {
	    if (subseedTrits.length !== src$2["default"].HASH_LENGTH) {
	        throw new Error(errors$4.ILLEGAL_SUBSEED_LENGTH);
	    }
	    if ([1, 2, 3].indexOf(numberOfFragments) === -1) {
	        throw new Error(errors$4.ILLEGAL_NUMBER_OF_FRAGMENTS);
	    }
	    var keyTrits = new Int8Array(exports.FRAGMENT_LENGTH * numberOfFragments);
	    var sponge = new src$2["default"]();
	    sponge.absorb(subseedTrits, 0, subseedTrits.length);
	    sponge.squeeze(keyTrits, 0, keyTrits.length);
	    return keyTrits;
	}
	exports.key = key;
	/**
	 * This method derives key digests from a private key.
	 *
	 * You can use the key digests to [generate an address](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/derive-addresses-from-private-keys).
	 *
	 * ## Related methods
	 *
	 * To generate a private key, use the [`key()`]{@link #module_signing.key} method.
	 *
	 * @method digests
	 *
	 * @summary Generates key digests for a given private key.
	 *
	 * @memberof module:signing
	 *
	 * @param {Int8Array} key - Private key in trits
	 *
	 * @example
	 * ```js
	 * const seed = 'MYSUPERSECRETSEED...';
	 * const subseed = Signing.subseed(Converter.trytesToTrits(seed), 0);
	 *
	 * const privateKey = Signing.key(subseed, 2);
	 *
	 * const digests = Signing.digests(privateKey);
	 * ```
	 *
	 * @return {Int8Array} digests - Key digests in trits
	 *
	 * @throws {errors.ILLEGAL_KEY_LENGTH}: Make sure that the `key` argument contains 2,187, 4,374, or 6,561 trits.
	 */
	// tslint:disable-next-line no-shadowed-variable
	function digests(key) {
	    if (key.length === 0 || key.length % exports.FRAGMENT_LENGTH !== 0) {
	        throw new Error(errors$4.ILLEGAL_KEY_LENGTH);
	    }
	    var numberOfFragments = key.length / exports.FRAGMENT_LENGTH;
	    var digestsTrits = new Int8Array(numberOfFragments * exports.HASH_LENGTH);
	    var sponge = new src$2["default"]();
	    for (var i = 0; i < numberOfFragments; i++) {
	        var buffer = key.slice(i * exports.FRAGMENT_LENGTH, (i + 1) * exports.FRAGMENT_LENGTH);
	        for (var j = 0; j < exports.NUMBER_OF_FRAGMENT_CHUNKS; j++) {
	            for (var k = 0; k < exports.MAX_TRYTE_VALUE - exports.MIN_TRYTE_VALUE; k++) {
	                sponge.reset();
	                sponge.absorb(buffer, j * exports.HASH_LENGTH, exports.HASH_LENGTH);
	                sponge.squeeze(buffer, j * exports.HASH_LENGTH, exports.HASH_LENGTH);
	            }
	        }
	        sponge.reset();
	        sponge.absorb(buffer, 0, buffer.length);
	        sponge.squeeze(digestsTrits, i * exports.HASH_LENGTH, exports.HASH_LENGTH);
	    }
	    return digestsTrits;
	}
	exports.digests = digests;
	/**
	 * This method derives a 243-trit address from the given key digests.
	 *
	 * ## Related methods
	 *
	 * To generate a private key, use the [`key()`]{@link #module_signing.key} method.
	 *
	 * @method address
	 *
	 * @summary Derives an address from the given key digests.
	 *
	 * @memberof module:signing
	 *
	 * @param {Int8Array} digests - Key digests in trits
	 *
	 * @example
	 * ```js
	 * const seed = 'MYSUPERSECRETSEED...';
	 * const subseed = Signing.subseed(Converter.trytesToTrits(seed), 0);
	 *
	 * const privateKey = Signing.key(subseed, 2);
	 *
	 * const digests = Signing.digests(privateKey);
	 *
	 * const address = Signing.address(digests);
	 * ```
	 *
	 * @return {Int8Array} address - Address in trits
	 *
	 * @throws {errors.ILLEGAL_DIGESTS_LENGTH}: Make sure that the `digests` argument contains a multiple of 243 trits.
	 */
	// tslint:disable-next-line no-shadowed-variable
	function address(digests) {
	    if (digests.length === 0 || digests.length % exports.HASH_LENGTH !== 0) {
	        throw new Error(errors$4.ILLEGAL_DIGESTS_LENGTH);
	    }
	    var addressTrits = new Int8Array(exports.HASH_LENGTH);
	    var sponge = new src$2["default"]();
	    sponge.absorb(digests.slice(), 0, digests.length);
	    sponge.squeeze(addressTrits, 0, exports.HASH_LENGTH);
	    return addressTrits;
	}
	exports.address = address;
	/**
	 * @method digest
	 *
	 * @ignore
	 *
	 * @param {array} normalizedBundleFragment - Normalized bundle fragments in trits
	 * @param {Int8Array} signatureFragment - Signature fragment trits
	 *
	 * @return {Int8Array} Digest trits
	 */
	function digest(normalizedBundleFragment, signatureFragment, // tslint:disable-line
	normalizedBundleFragmentOffset, signatureFragmentOffset) {
	    if (normalizedBundleFragmentOffset === void 0) { normalizedBundleFragmentOffset = 0; }
	    if (signatureFragmentOffset === void 0) { signatureFragmentOffset = 0; }
	    if (normalizedBundleFragment.length - normalizedBundleFragmentOffset < exports.NORMALIZED_FRAGMENT_LENGTH) {
	        throw new Error(errors$4.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH);
	    }
	    if (signatureFragment.length - signatureFragmentOffset < exports.FRAGMENT_LENGTH) {
	        throw new Error(errors$4.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH);
	    }
	    var buffer = signatureFragment.slice(signatureFragmentOffset, signatureFragmentOffset + exports.FRAGMENT_LENGTH);
	    var digestTrits = new Int8Array(exports.HASH_LENGTH);
	    var sponge = new src$2["default"]();
	    for (var j = 0; j < exports.NUMBER_OF_FRAGMENT_CHUNKS; j++) {
	        for (var k = normalizedBundleFragment[normalizedBundleFragmentOffset + j] - exports.MIN_TRYTE_VALUE; k-- > 0;) {
	            sponge.reset();
	            sponge.absorb(buffer, j * exports.HASH_LENGTH, exports.HASH_LENGTH);
	            sponge.squeeze(buffer, j * exports.HASH_LENGTH, exports.HASH_LENGTH);
	        }
	    }
	    sponge.reset();
	    sponge.absorb(buffer, 0, buffer.length);
	    sponge.squeeze(digestTrits, 0, digestTrits.length);
	    return digestTrits;
	}
	exports.digest = digest;
	/**
	 * @method signatureFragment
	 * @ignore
	 * @param {array} normalizeBundleFragment - normalized bundle fragment
	 * @param {keyFragment} keyFragment - key fragment trits
	 *
	 * @return {Int8Array} Signature Fragment trits
	 */
	function signatureFragment(normalizedBundleFragment, keyFragment, normalizedBundleFragmentOffset, keyFragmentOffset) {
	    if (normalizedBundleFragmentOffset === void 0) { normalizedBundleFragmentOffset = 0; }
	    if (keyFragmentOffset === void 0) { keyFragmentOffset = 0; }
	    if (normalizedBundleFragment.length - normalizedBundleFragmentOffset < exports.NORMALIZED_FRAGMENT_LENGTH) {
	        throw new Error(errors$4.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH);
	    }
	    if (keyFragment.length - keyFragmentOffset < exports.FRAGMENT_LENGTH) {
	        throw new Error(errors$4.ILLEGAL_KEY_FRAGMENT_LENGTH);
	    }
	    var signatureFragmentTrits = keyFragment.slice(keyFragmentOffset, keyFragmentOffset + exports.FRAGMENT_LENGTH);
	    var sponge = new src$2["default"]();
	    for (var j = 0; j < exports.NUMBER_OF_FRAGMENT_CHUNKS; j++) {
	        for (var k = 0; k < exports.MAX_TRYTE_VALUE - normalizedBundleFragment[normalizedBundleFragmentOffset + j]; k++) {
	            sponge.reset();
	            sponge.absorb(signatureFragmentTrits, j * exports.HASH_LENGTH, exports.HASH_LENGTH);
	            sponge.squeeze(signatureFragmentTrits, j * exports.HASH_LENGTH, exports.HASH_LENGTH);
	        }
	    }
	    return signatureFragmentTrits;
	}
	exports.signatureFragment = signatureFragment;
	function signatureFragments(seed, index, numberOfFragments, bundle, nativeGenerateSignatureFunction) {
	    if (nativeGenerateSignatureFunction && typeof nativeGenerateSignatureFunction === 'function') {
	        return nativeGenerateSignatureFunction(Array.prototype.slice.call(seed), index, numberOfFragments, Array.prototype.slice.call(bundle)).then(function (nativeSignature) { return new Int8Array(nativeSignature); });
	    }
	    var normalizedBundleHash = exports.normalizedBundle(bundle);
	    var keyTrits = key(subseed(seed, index), numberOfFragments);
	    var signature = new Int8Array(numberOfFragments * exports.FRAGMENT_LENGTH);
	    for (var i = 0; i < numberOfFragments; i++) {
	        signature.set(signatureFragment(normalizedBundleHash.slice(i * exports.NORMALIZED_FRAGMENT_LENGTH, (i + 1) * exports.NORMALIZED_FRAGMENT_LENGTH), keyTrits.slice(i * exports.FRAGMENT_LENGTH, (i + 1) * exports.FRAGMENT_LENGTH)), i * exports.FRAGMENT_LENGTH);
	    }
	    return bluebird.resolve(signature);
	}
	exports.signatureFragments = signatureFragments;
	/**
	 * This method validates a signature by doing the following:
	 *
	 * - Normalizing the bundle hash
	 * - Deriving the key digests of the address, using the normalized bundle hash and the signature
	 * -.Deriving an address from the key digests
	 * - Comparing the derived address to the `expectedAddress` argument to find out if they match
	 *
	 * If the addresses match, the signature is valid.
	 *
	 * For more information about signatures see the [documentation portal](https://docs.iota.org/docs/getting-started/0.1/clients/signatures).
	 *
	 * ## Related methods
	 *
	 * To convert trytes such as bundle hashes and addresses to trits, use the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
	 *
	 * @method validateSignatures
	 *
	 * @summary Validates the given signature, using the given bundle and address.
	 *
	 * @memberof module:signing
	 *
	 * @param {Int8Array} expectedAddress - Input address in trits
	 * @param {Array<Int8Array>} signatureFragments - Signature fragments in trits
	 * @param {Int8Array} bundle - Bundle hash in trits
	 *
	 * @example
	 * ```js
	 * let valid = Signing.validateSignatures(expectedAddress, signatureFragments, bundle);
	 * ```
	 *
	 * @return {boolean} valid - Whether the signatures are valid.
	 *
	 * @throws {errors.ILLEGAL_BUNDLE_HASH_LENGTH}: Make sure that the `bundle` argument contains a 243-trit bundle hash.
	 */
	function validateSignatures(expectedAddress, signatureFragments, // tslint:disable-line
	bundle) {
	    if (bundle.length !== exports.HASH_LENGTH) {
	        throw new Error(errors$4.ILLEGAL_BUNDLE_HASH_LENGTH);
	    }
	    var normalizedBundleFragments = [];
	    var normalizedBundleHash = exports.normalizedBundle(bundle);
	    // Split hash into 3 fragments
	    for (var i = 0; i < exports.NUMBER_OF_SECURITY_LEVELS; i++) {
	        normalizedBundleFragments[i] = normalizedBundleHash.slice(i * exports.NUMBER_OF_FRAGMENT_CHUNKS, (i + 1) * exports.NUMBER_OF_FRAGMENT_CHUNKS);
	    }
	    // Get digests
	    var digestsTrits = new Int8Array(signatureFragments.length * exports.HASH_LENGTH);
	    for (var i = 0; i < signatureFragments.length; i++) {
	        var digestBuffer = digest(normalizedBundleFragments[i % exports.NUMBER_OF_SECURITY_LEVELS], signatureFragments[i]);
	        for (var j = 0; j < exports.HASH_LENGTH; j++) {
	            digestsTrits[i * exports.HASH_LENGTH + j] = digestBuffer[j];
	        }
	    }
	    var actualAddress = address(digestsTrits);
	    return expectedAddress.every(function (trit, i) { return trit === actualAddress[i]; });
	}
	exports.validateSignatures = validateSignatures;
	/**
	 * This method normalizes the given bundle hash to make sure that only around half of the private key is revealed when the bundle hash is signed.
	 *
	 * For more information about signatures see the [documentation portal](https://docs.iota.org/docs/getting-started/0.1/clients/signatures).
	 *
	 * To find out more about why the bundle hash is normalized, see [this answer on StackExchange](https://iota.stackexchange.com/questions/1588/why-is-the-bundle-hash-normalized).
	 *
	 * ## Related methods
	 *
	 * To convert a bundle hash from trytes to trits, use the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
	 *
	 * @method normalizedBundle
	 *
	 * @summary Normalizes the bundle hash.
	 *
	 * @memberof module:signing
	 *
	 * @param {Int8Array} bundle - Bundle hash in trits
	 *
	 * @example
	 * ```js
	 * let normalizedBundleHash = Signing.normalizedBundle(bundle);
	 * ```
	 *
	 * @return {Int8Array} Normalized bundle hash in trits
	 *
	 * @throws {errors.ILLEGAL_BUNDLE_HASH_LENGTH}: Make sure that the `bundle` argument contains a 243-trit bundle hash.
	 */
	exports.normalizedBundle = function (bundle) {
	    if (bundle.length !== exports.HASH_LENGTH) {
	        throw new Error(errors$4.ILLEGAL_BUNDLE_HASH_LENGTH);
	    }
	    var output = new Int8Array(exports.HASH_LENGTH / src.TRYTE_WIDTH);
	    for (var i = 0; i < exports.NUMBER_OF_SECURITY_LEVELS; i++) {
	        var sum = 0;
	        for (var j = i * exports.NORMALIZED_FRAGMENT_LENGTH; j < (i + 1) * exports.NORMALIZED_FRAGMENT_LENGTH; j++) {
	            sum += output[j] =
	                bundle[j * src.TRYTE_WIDTH] + bundle[j * src.TRYTE_WIDTH + 1] * 3 + bundle[j * src.TRYTE_WIDTH + 2] * 9;
	        }
	        if (sum >= 0) {
	            while (sum-- > 0) {
	                for (var j = i * exports.NORMALIZED_FRAGMENT_LENGTH; j < (i + 1) * exports.NORMALIZED_FRAGMENT_LENGTH; j++) {
	                    if (output[j] > exports.MIN_TRYTE_VALUE) {
	                        output[j]--;
	                        break;
	                    }
	                }
	            }
	        }
	        else {
	            while (sum++ < 0) {
	                for (var j = i * exports.NORMALIZED_FRAGMENT_LENGTH; j < (i + 1) * exports.NORMALIZED_FRAGMENT_LENGTH; j++) {
	                    if (output[j] < exports.MAX_TRYTE_VALUE) {
	                        output[j]++;
	                        break;
	                    }
	                }
	            }
	        }
	    }
	    return output;
	};

	});

	unwrapExports(signing);
	var signing_1 = signing.MIN_TRYTE_VALUE;
	var signing_2 = signing.MAX_TRYTE_VALUE;
	var signing_3 = signing.NUMBER_OF_SECURITY_LEVELS;
	var signing_4 = signing.HASH_LENGTH;
	var signing_5 = signing.FRAGMENT_LENGTH;
	var signing_6 = signing.NUMBER_OF_FRAGMENT_CHUNKS;
	var signing_7 = signing.NORMALIZED_FRAGMENT_LENGTH;
	var signing_8 = signing.subseed;
	var signing_9 = signing.key;
	var signing_10 = signing.digests;
	var signing_11 = signing.address;
	var signing_12 = signing.digest;
	var signing_13 = signing.signatureFragment;
	var signing_14 = signing.signatureFragments;
	var signing_15 = signing.validateSignatures;
	var signing_16 = signing.normalizedBundle;

	var src$4 = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	exports.__esModule = true;
	__export(signing);

	exports.add = add_1.add;
	exports.increment = add_1.increment;

	});

	unwrapExports(src$4);
	var src_1$2 = src$4.add;
	var src_2$2 = src$4.increment;

	var errors$5 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.ILLEGAL_LENGTH = 'Illegal trits length';
	exports.ILLEGAL_SUBSEED_INDEX = 'Illegal subseed length';
	exports.ILLEGAL_SUBSEED_LENGTH = 'Illegal subseed length';
	exports.ILLEGAL_NUMBER_OF_FRAGMENTS = 'Illegal number of fragments';
	exports.ILLEGAL_KEY_LENGTH = 'Illegal key length';
	exports.ILLEGAL_DIGESTS_LENGTH = 'Illegal digests length';
	exports.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH = 'Illegal normalized fragment length';
	exports.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH = 'Illegal signature fragment length';
	exports.ILLEGAL_BUNDLE_HASH_LENGTH = 'Illegal bundle hash length';
	exports.ILLEGAL_KEY_FRAGMENT_LENGTH = 'Illegal key fragment length';
	exports.ILLEGAL_TRIT_CONVERSION_INPUT = 'Illegal conversion input. Expected trits as Int8Array.';
	exports.ILLEGAL_TRYTE_CONVERSION_INPUT = 'Illegal conversion input. Expected trytes string or integer.';
	exports.ILLEGAL_MIN_WEIGHT_MAGNITUDE = 'Illegal minWeightMagnitude value.';
	exports.ILLEGAL_ADDRESS_LAST_TRIT = 'Illegal address. Last trit must be 0.';
	exports.ILLEGAL_ADDRESS_LENGTH = 'Illegal address length.';
	exports.ILLEGAL_BUNDLE_LENGTH = 'Illegal bundle hash length.';
	exports.ILLEGAL_OBSOLETE_TAG_LENGTH = 'Illegal obsoleteTag length.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE = 'Illegal signature or message.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH = 'Illegal signatureOrMessage length.';
	exports.ILLEGAL_TAG_LENGTH = 'Illegal tag length.';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP = 'Illegal issuance timestamp';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH = 'Illegal issuanceTimestamp length.';
	exports.ILLEGAL_VALUE_LENGTH = 'Illegal value length.';
	exports.ILLEGAL_TRANSACTION_FIELD_OFFSET = 'Illegal transaction field offset.';
	exports.ILLEGAL_TRANSACTION_FIELD_LENGTH = 'Illegal transaction field length.';
	exports.ILLEGAL_LENGTH_OR_OFFSET = 'Illegal length or offset.';
	exports.ILLEGAL_TRANSACTION_BUFFER = 'Illegal transaction buffer. Expected `Int8Array`.';
	exports.ILLEGAL_TRANSACTION_BUFFER_LENGTH = 'Illegal transaction buffer length.';
	exports.ILLEGAL_TRANSACTION_OFFSET = 'Illegal transaction offset.';
	exports.ILLEGAL_TRANSACTION_LENGTH = 'Illegal transaction length.';
	exports.ILLEGAL_TRANSACTION_ORDER = 'Illegal transaction order.';
	exports.ILLEGAL_TRANSACTION_INDEX = 'Illegal transaction index.';
	exports.ILLEGAL_SEED_LENGTH = 'Illegal seed length. Expected length of 243 trits.';
	exports.ILLEGAL_KEY_INDEX = 'Illegal key index.';
	exports.ILLEGAL_CDA_LENGTH = 'Illegal cda length.';
	exports.ILLEGAL_BATCH = 'Illegal batch.';
	exports.CDA_ALREADY_IN_STORE = 'CDA is already in store.';
	exports.ILLEGAL_PERSISTENCE_ID = 'Illegal persistence id.';
	exports.ILLEGAL_PERSISTENCE_PATH = 'Illegal persistence path.';
	exports.ILLEGAL_PADDING_LENGTH = 'Illegal padding length. Input value length exceeds padding length.';
	exports.INCONSISTENT_SUBTANGLE = 'Inconsistent subtangle';
	exports.INSUFFICIENT_BALANCE = 'Insufficient balance';
	exports.INVALID_ADDRESS = 'Invalid address';
	exports.INVALID_REMAINDER_ADDRESS = 'Invalid remainder address';
	exports.INVALID_BRANCH_TRANSACTION = 'Invalid branch transaction';
	exports.INVALID_BUNDLE = 'Invalid bundle';
	exports.INVALID_BUNDLE_HASH = 'Invalid bundle hash';
	exports.INVALID_CHECKSUM = 'Invalid checksum';
	exports.INVALID_COMMAND = 'Invalid command format';
	exports.INVALID_DEPTH = 'Invalid depth';
	exports.INVALID_HASH = 'Invalid hash';
	exports.INVALID_INDEX = 'Invalid index option';
	exports.INVALID_TOTAL_OPTION = 'Invalid total option';
	exports.INVALID_INPUT = 'Invalid input';
	exports.INVALID_KEY = 'Invalid key value';
	exports.INVALID_MIN_WEIGHT_MAGNITUDE = 'Invalid Min Weight Magnitude';
	exports.INVALID_SEARCH_KEY = 'Invalid search key';
	exports.INVALID_SECURITY_LEVEL = 'Invalid security option';
	exports.INVALID_SECURITY_OPTION = 'Invalid security option';
	exports.INVALID_SEED = 'Invalid seed';
	exports.INVALID_START_END_OPTIONS = 'Invalid end option';
	exports.INVALID_START_OPTION = 'Invalid start option';
	exports.INVALID_TAG = 'Invalid tag';
	exports.INVALID_TRANSACTION = 'Invalid transaction';
	exports.INVALID_TRANSACTION_TRYTES = 'Invalid transaction trytes';
	exports.INVALID_ATTACHED_TRYTES = 'Invalid attached trytes';
	exports.INVALID_TRANSACTION_HASH = 'Invalid transaction hash';
	exports.INVALID_TAIL_TRANSACTION = 'Invalid tail transaction';
	exports.INVALID_THRESHOLD = 'Invalid threshold option';
	exports.INVALID_TRANSFER = 'Invalid transfer array';
	exports.INVALID_TRUNK_TRANSACTION = 'Invalid trunk transaction';
	exports.INVALID_REFERENCE_HASH = 'Invalid reference hash';
	exports.INVALID_TRYTES = 'Invalid trytes';
	exports.INVALID_URI = 'Invalid uri';
	exports.INVALID_ASCII_INPUT = 'Conversion to trytes requires type of input to be encoded in ascii.';
	exports.INVALID_ODD_LENGTH = 'Conversion from trytes requires length of trytes to be even.';
	exports.INVALID_TRYTE_ENCODED_JSON = 'Invalid tryte encoded JSON message';
	exports.NOT_INT = 'One of the inputs is not integer';
	exports.SENDING_BACK_TO_INPUTS = 'One of the transaction inputs is used as output.';
	exports.INVALID_TRANSACTIONS_TO_APPROVE = 'Invalid transactions to approve.';
	exports.NO_INPUTS = 'Could not find any available inputs.';
	exports.invalidChecksum = function (address) { return "Invalid Checksum: " + address; };
	exports.inconsistentTransaction = function (reason) { return "Transaction is inconsistent. Reason: " + reason; };
	exports.INVALID_DELAY = 'Invalid delay.';

	});

	unwrapExports(errors$5);
	var errors_1$5 = errors$5.ILLEGAL_LENGTH;
	var errors_2$5 = errors$5.ILLEGAL_SUBSEED_INDEX;
	var errors_3$4 = errors$5.ILLEGAL_SUBSEED_LENGTH;
	var errors_4$4 = errors$5.ILLEGAL_NUMBER_OF_FRAGMENTS;
	var errors_5$3 = errors$5.ILLEGAL_KEY_LENGTH;
	var errors_6$3 = errors$5.ILLEGAL_DIGESTS_LENGTH;
	var errors_7$3 = errors$5.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH;
	var errors_8$3 = errors$5.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH;
	var errors_9$3 = errors$5.ILLEGAL_BUNDLE_HASH_LENGTH;
	var errors_10$3 = errors$5.ILLEGAL_KEY_FRAGMENT_LENGTH;
	var errors_11$3 = errors$5.ILLEGAL_TRIT_CONVERSION_INPUT;
	var errors_12$3 = errors$5.ILLEGAL_TRYTE_CONVERSION_INPUT;
	var errors_13$3 = errors$5.ILLEGAL_MIN_WEIGHT_MAGNITUDE;
	var errors_14$3 = errors$5.ILLEGAL_ADDRESS_LAST_TRIT;
	var errors_15$3 = errors$5.ILLEGAL_ADDRESS_LENGTH;
	var errors_16$3 = errors$5.ILLEGAL_BUNDLE_LENGTH;
	var errors_17$3 = errors$5.ILLEGAL_OBSOLETE_TAG_LENGTH;
	var errors_18$3 = errors$5.ILLEGAL_SIGNATURE_OR_MESSAGE;
	var errors_19$3 = errors$5.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH;
	var errors_20$3 = errors$5.ILLEGAL_TAG_LENGTH;
	var errors_21$3 = errors$5.ILLEGAL_ISSUANCE_TIMESTAMP;
	var errors_22$3 = errors$5.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH;
	var errors_23$3 = errors$5.ILLEGAL_VALUE_LENGTH;
	var errors_24$3 = errors$5.ILLEGAL_TRANSACTION_FIELD_OFFSET;
	var errors_25$3 = errors$5.ILLEGAL_TRANSACTION_FIELD_LENGTH;
	var errors_26$3 = errors$5.ILLEGAL_LENGTH_OR_OFFSET;
	var errors_27$3 = errors$5.ILLEGAL_TRANSACTION_BUFFER;
	var errors_28$3 = errors$5.ILLEGAL_TRANSACTION_BUFFER_LENGTH;
	var errors_29$3 = errors$5.ILLEGAL_TRANSACTION_OFFSET;
	var errors_30$3 = errors$5.ILLEGAL_TRANSACTION_LENGTH;
	var errors_31$3 = errors$5.ILLEGAL_TRANSACTION_ORDER;
	var errors_32$3 = errors$5.ILLEGAL_TRANSACTION_INDEX;
	var errors_33$3 = errors$5.ILLEGAL_SEED_LENGTH;
	var errors_34$3 = errors$5.ILLEGAL_KEY_INDEX;
	var errors_35$3 = errors$5.ILLEGAL_CDA_LENGTH;
	var errors_36$3 = errors$5.ILLEGAL_BATCH;
	var errors_37$3 = errors$5.CDA_ALREADY_IN_STORE;
	var errors_38$3 = errors$5.ILLEGAL_PERSISTENCE_ID;
	var errors_39$3 = errors$5.ILLEGAL_PERSISTENCE_PATH;
	var errors_40$3 = errors$5.ILLEGAL_PADDING_LENGTH;
	var errors_41$3 = errors$5.INCONSISTENT_SUBTANGLE;
	var errors_42$3 = errors$5.INSUFFICIENT_BALANCE;
	var errors_43$3 = errors$5.INVALID_ADDRESS;
	var errors_44$3 = errors$5.INVALID_REMAINDER_ADDRESS;
	var errors_45$3 = errors$5.INVALID_BRANCH_TRANSACTION;
	var errors_46$3 = errors$5.INVALID_BUNDLE;
	var errors_47$3 = errors$5.INVALID_BUNDLE_HASH;
	var errors_48$3 = errors$5.INVALID_CHECKSUM;
	var errors_49$3 = errors$5.INVALID_COMMAND;
	var errors_50$3 = errors$5.INVALID_DEPTH;
	var errors_51$3 = errors$5.INVALID_HASH;
	var errors_52$3 = errors$5.INVALID_INDEX;
	var errors_53$3 = errors$5.INVALID_TOTAL_OPTION;
	var errors_54$3 = errors$5.INVALID_INPUT;
	var errors_55$3 = errors$5.INVALID_KEY;
	var errors_56$3 = errors$5.INVALID_MIN_WEIGHT_MAGNITUDE;
	var errors_57$3 = errors$5.INVALID_SEARCH_KEY;
	var errors_58$3 = errors$5.INVALID_SECURITY_LEVEL;
	var errors_59$3 = errors$5.INVALID_SECURITY_OPTION;
	var errors_60$3 = errors$5.INVALID_SEED;
	var errors_61$3 = errors$5.INVALID_START_END_OPTIONS;
	var errors_62$3 = errors$5.INVALID_START_OPTION;
	var errors_63$3 = errors$5.INVALID_TAG;
	var errors_64$3 = errors$5.INVALID_TRANSACTION;
	var errors_65$3 = errors$5.INVALID_TRANSACTION_TRYTES;
	var errors_66$3 = errors$5.INVALID_ATTACHED_TRYTES;
	var errors_67$3 = errors$5.INVALID_TRANSACTION_HASH;
	var errors_68$3 = errors$5.INVALID_TAIL_TRANSACTION;
	var errors_69$3 = errors$5.INVALID_THRESHOLD;
	var errors_70$3 = errors$5.INVALID_TRANSFER;
	var errors_71$3 = errors$5.INVALID_TRUNK_TRANSACTION;
	var errors_72$3 = errors$5.INVALID_REFERENCE_HASH;
	var errors_73$3 = errors$5.INVALID_TRYTES;
	var errors_74$3 = errors$5.INVALID_URI;
	var errors_75$3 = errors$5.INVALID_ASCII_INPUT;
	var errors_76$3 = errors$5.INVALID_ODD_LENGTH;
	var errors_77$3 = errors$5.INVALID_TRYTE_ENCODED_JSON;
	var errors_78$3 = errors$5.NOT_INT;
	var errors_79$3 = errors$5.SENDING_BACK_TO_INPUTS;
	var errors_80$3 = errors$5.INVALID_TRANSACTIONS_TO_APPROVE;
	var errors_81$3 = errors$5.NO_INPUTS;
	var errors_82$3 = errors$5.invalidChecksum;
	var errors_83$3 = errors$5.inconsistentTransaction;
	var errors_84$3 = errors$5.INVALID_DELAY;

	var constants$1 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.HASH_TRYTE_SIZE = 81;
	exports.TAG_TRYTE_SIZE = 27;
	exports.SIGNATURE_MESSAGE_FRAGMENT_TRYTE_SIZE = 2187;
	exports.TRANSACTION_TRYTE_SIZE = 2673;
	exports.MAX_INDEX_DIFF = 1000;
	exports.NULL_HASH_TRYTES = '9'.repeat(exports.HASH_TRYTE_SIZE);
	exports.NULL_TAG_TRYTES = '9'.repeat(exports.TAG_TRYTE_SIZE);
	exports.NULL_SIGNATURE_MESSAGE_FRAGMENT_TRYTES = '9'.repeat(exports.SIGNATURE_MESSAGE_FRAGMENT_TRYTE_SIZE);
	exports.NULL_TRANSACTION_TRYTES = '9'.repeat(exports.TRANSACTION_TRYTE_SIZE);

	});

	unwrapExports(constants$1);
	var constants_1$1 = constants$1.HASH_TRYTE_SIZE;
	var constants_2$1 = constants$1.TAG_TRYTE_SIZE;
	var constants_3$1 = constants$1.SIGNATURE_MESSAGE_FRAGMENT_TRYTE_SIZE;
	var constants_4$1 = constants$1.TRANSACTION_TRYTE_SIZE;
	var constants_5$1 = constants$1.MAX_INDEX_DIFF;
	var constants_6$1 = constants$1.NULL_HASH_TRYTES;
	var constants_7$1 = constants$1.NULL_TAG_TRYTES;
	var constants_8$1 = constants$1.NULL_SIGNATURE_MESSAGE_FRAGMENT_TRYTES;
	var constants_9$1 = constants$1.NULL_TRANSACTION_TRYTES;

	var guards$1 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;


	// Required for markdown generation with JSDoc
	/**
	 * @module validators
	 */
	/* Type guards */
	/**
	 * Checks if input is an `Int8Array` of trit values; `-1, 0, 1`.
	 *
	 * @method isTrits
	 *
	 * @param {any} input
	 *
	 * @return {boolean}
	 */
	exports.isTrits = function (input) {
	    if (input instanceof Int8Array) {
	        for (var i = 0; i < input.length; i++) {
	            if (!(input[i] === 0 || input[i] === -1 || input[i] === 1)) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	};
	/**
	 * Checks if trits are NULL.
	 *
	 * @method isNullTrits
	 *
	 * @param {Int8Array} trits
	 *
	 * @return {boolean}
	 */
	exports.isNullTrits = function (input) {
	    if (input instanceof Int8Array) {
	        if (input.length === 0) {
	            return true;
	        }
	        for (var i = 0; i < input.length; i++) {
	            if (input[i] !== 0) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	};
	/**
	 * Checks if input is correct trytes consisting of [9A-Z]; optionally validate length
	 * @method isTrytes
	 *
	 * @param {string} trytes
	 * @param {string | number} [length='1,']
	 *
	 * @return {boolean}
	 */
	exports.isTrytes = function (trytes, length) {
	    if (length === void 0) { length = '1,'; }
	    return typeof trytes === 'string' && new RegExp("^[9A-Z]{" + length + "}$").test(trytes);
	};
	/**
	 * @method isTrytesOfExactLength
	 *
	 * @param {string} trytes
	 * @param {number} length
	 *
	 * @return {boolean}
	 */
	exports.isTrytesOfExactLength = function (trytes, length) {
	    return typeof trytes === 'string' && new RegExp("^[9A-Z]{" + length + "}$").test(trytes);
	};
	/**
	 * @method isTrytesOfMaxLength
	 *
	 * @param {string} trytes
	 * @param {number} length
	 *
	 * @return {boolean}
	 */
	exports.isTrytesOfMaxLength = function (trytes, length) {
	    return typeof trytes === 'string' && new RegExp("^[9A-Z]{1," + length + "}$").test(trytes);
	};
	/**
	 * Checks if input contains `9`s only.
	 * @method isEmpty
	 *
	 * @param {string} hash
	 *
	 * @return {boolean}
	 */
	exports.isEmpty = function (trytes) { return typeof trytes === 'string' && /^[9]+$/.test(trytes); };
	exports.isNinesTrytes = exports.isEmpty;
	/**
	 * Checks if input is correct hash (81 trytes) or address with checksum (90 trytes)
	 *
	 * @method isHash
	 *
	 * @param {string} hash
	 *
	 * @return {boolean}
	 */
	exports.isHash = function (hash) {
	    return exports.isTrytesOfExactLength(hash, constants$1.HASH_TRYTE_SIZE) || exports.isTrytesOfExactLength(hash, constants$1.HASH_TRYTE_SIZE + 9);
	}; // address w/ checksum is valid hash
	/* Check if security level is valid positive integer */
	exports.isSecurityLevel = function (security) {
	    return Number.isInteger(security) && security > 0 && security < 4;
	};
	/**
	 * Checks if input is valid input object. Address can be passed with or without checksum.
	 * It does not validate the checksum.
	 *
	 * @method isInput
	 *
	 * @param {string} address
	 *
	 * @return {boolean}
	 */
	exports.isInput = function (input) {
	    return exports.isHash(input.address) &&
	        exports.isSecurityLevel(input.security) &&
	        (typeof input.balance === 'undefined' || (Number.isInteger(input.balance) && input.balance > 0)) &&
	        Number.isInteger(input.keyIndex) &&
	        input.keyIndex >= 0;
	};
	/**
	 * Checks that input is valid tag trytes.
	 *
	 * @method isTag
	 *
	 * @param {string} tag
	 *
	 * @return {boolean}
	 */
	exports.isTag = function (tag) { return exports.isTrytesOfMaxLength(tag, constants$1.TAG_TRYTE_SIZE); };
	/**
	 * Checks if input is valid `transfer` object.
	 *
	 * @method isTransfer
	 *
	 * @param {Transfer} transfer
	 *
	 * @return {boolean}
	 */
	exports.isTransfer = function (transfer) {
	    return exports.isHash(transfer.address) &&
	        Number.isInteger(transfer.value) &&
	        transfer.value >= 0 &&
	        (!transfer.message || exports.isTrytes(transfer.message, '0,')) &&
	        (!transfer.tag || exports.isTag(transfer.tag));
	};
	/**
	 * Checks that a given `URI` is valid
	 *
	 * Valid Examples:
	 * - `udp://[2001:db8:a0b:12f0::1]:14265`
	 * - `udp://[2001:db8:a0b:12f0::1]`
	 * - `udp://8.8.8.8:14265`
	 * - `udp://domain.com`
	 * - `udp://domain2.com:14265`
	 *
	 * @method isUri
	 *
	 * @param {string} uri
	 *
	 * @return {boolean}
	 */
	exports.isUri = function (uri) {
	    if (typeof uri !== 'string') {
	        return false;
	    }
	    var getInside = /^(udp|tcp):\/\/([\[][^\]\.]*[\]]|[^\[\]:]*)[:]{0,1}([0-9]{1,}$|$)/i;
	    var stripBrackets = /[\[]{0,1}([^\[\]]*)[\]]{0,1}/;
	    var uriTest = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/;
	    return getInside.test(uri) && uriTest.test(stripBrackets.exec(getInside.exec(uri)[1])[1]);
	};
	/* Check if start & end options are valid */
	exports.isStartEndOptions = function (_a) {
	    var start = _a.start, end = _a.end;
	    return !end || (start <= end && end < start + constants$1.MAX_INDEX_DIFF);
	};
	/* Checks all array items */
	exports.isArray = function (f) { return function (x) {
	    return Array.isArray(x) && x.length > 0 && x.every(function (y) { return f(y); });
	}; };
	/**
	 * Runs each validator in sequence, and throws on the first occurence of invalid data.
	 * Validators are passed as arguments and executed in given order.
	 * You might want place `validate()` in promise chains before operations that require valid inputs,
	 * taking advantage of built-in promise branching.
	 *
	 * @example
	 *
	 * ```js
	 * try {
	 *   validate([
	 *     value, // Given value
	 *     isTrytes, // Validator function
	 *     'Invalid trytes' // Error message
	 *   ])
	 * } catch (err) {
	 *   console.log(err.message) // 'Invalid trytes'
	 * }
	 * ```
	 *
	 * @method validate
	 *
	 * @throws {Error} error
	 * @return {boolean}
	 */
	exports.validate = function () {
	    var validators = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        validators[_i] = arguments[_i];
	    }
	    validators.forEach(function (validator) {
	        if (Array.isArray(validator)) {
	            var value = validator[0], isValid = validator[1], msg = validator[2];
	            if (!isValid(value)) {
	                throw new Error(msg + ": " + JSON.stringify(value, null, 1));
	            }
	        }
	    });
	    return true;
	};
	exports.arrayValidator = function (validator) { return function (arr, customMsg) {
	    var _a = validator(arr[0]), _ = _a[0], // tslint:disable-line no-unused-variable
	    isValid = _a[1], msg = _a[2];
	    return [
	        arr,
	        function (x) { return Array.isArray(x) && x.every(function (value) { return isValid(value); }); },
	        customMsg || msg,
	    ];
	}; };
	exports.depthValidator = function (depth) { return [
	    depth,
	    function (n) { return Number.isInteger(n) && n > 0; },
	    errors$5.INVALID_DEPTH,
	]; };
	exports.minWeightMagnitudeValidator = function (minWeightMagnitude) { return [
	    minWeightMagnitude,
	    Number.isInteger,
	    errors$5.INVALID_MIN_WEIGHT_MAGNITUDE,
	]; };
	exports.seedValidator = function (seed) { return [seed, exports.isTrytes, errors$5.INVALID_SEED]; };
	exports.securityLevelValidator = function (security) { return [
	    security,
	    exports.isSecurityLevel,
	    errors$5.INVALID_SECURITY_LEVEL,
	]; };
	exports.inputValidator = function (input) { return [input, exports.isInput, errors$5.INVALID_INPUT]; };
	exports.remainderAddressValidator = function (input) { return [input, exports.isHash, errors$5.INVALID_REMAINDER_ADDRESS]; };
	exports.tagValidator = function (tag) { return [tag, exports.isTag, errors$5.INVALID_TAG]; };
	exports.transferValidator = function (transfer) { return [transfer, exports.isTransfer, errors$5.INVALID_TRANSFER]; };
	exports.hashValidator = function (hash, errorMessage) { return [
	    hash,
	    exports.isHash,
	    errorMessage || errors$5.INVALID_HASH,
	]; };
	exports.trytesValidator = function (trytes, msg) { return [
	    trytes,
	    function (t) { return (length ? exports.isTrytesOfExactLength(t, length) : exports.isTrytes(t)); },
	    msg || errors$5.INVALID_TRYTES,
	]; };
	exports.uriValidator = function (uri) { return [uri, exports.isUri, errors$5.INVALID_URI]; };
	exports.integerValidator = function (integer, msg) { return [
	    integer,
	    Number.isInteger,
	    msg || errors$5.NOT_INT,
	]; };
	exports.indexValidator = function (index) { return [index, Number.isInteger, errors$5.INVALID_INDEX]; };
	exports.startOptionValidator = function (start) { return [
	    start,
	    function (s) { return Number.isInteger(s) && s >= 0; },
	    errors$5.INVALID_START_OPTION,
	]; };
	exports.startEndOptionsValidator = function (options) { return [
	    options,
	    exports.isStartEndOptions,
	    errors$5.INVALID_START_END_OPTIONS,
	]; };
	exports.getInputsThresholdValidator = function (threshold) { return [
	    threshold,
	    function (s) { return Number.isInteger(s) && s >= 0; },
	    errors$5.INVALID_THRESHOLD,
	]; };
	exports.stringify = function (value) {
	    return JSON.stringify(value, null, 1);
	};

	});

	unwrapExports(guards$1);
	var guards_1$1 = guards$1.isTrits;
	var guards_2$1 = guards$1.isNullTrits;
	var guards_3$1 = guards$1.isTrytes;
	var guards_4$1 = guards$1.isTrytesOfExactLength;
	var guards_5$1 = guards$1.isTrytesOfMaxLength;
	var guards_6$1 = guards$1.isEmpty;
	var guards_7$1 = guards$1.isNinesTrytes;
	var guards_8$1 = guards$1.isHash;
	var guards_9$1 = guards$1.isSecurityLevel;
	var guards_10$1 = guards$1.isInput;
	var guards_11$1 = guards$1.isTag;
	var guards_12$1 = guards$1.isTransfer;
	var guards_13$1 = guards$1.isUri;
	var guards_14$1 = guards$1.isStartEndOptions;
	var guards_15$1 = guards$1.isArray;
	var guards_16$1 = guards$1.validate;
	var guards_17$1 = guards$1.arrayValidator;
	var guards_18$1 = guards$1.depthValidator;
	var guards_19$1 = guards$1.minWeightMagnitudeValidator;
	var guards_20$1 = guards$1.seedValidator;
	var guards_21$1 = guards$1.securityLevelValidator;
	var guards_22$1 = guards$1.inputValidator;
	var guards_23$1 = guards$1.remainderAddressValidator;
	var guards_24$1 = guards$1.tagValidator;
	var guards_25$1 = guards$1.transferValidator;
	var guards_26$1 = guards$1.hashValidator;
	var guards_27$1 = guards$1.trytesValidator;
	var guards_28$1 = guards$1.uriValidator;
	var guards_29$1 = guards$1.integerValidator;
	var guards_30$1 = guards$1.indexValidator;
	var guards_31$1 = guards$1.startOptionValidator;
	var guards_32$1 = guards$1.startEndOptionsValidator;
	var guards_33$1 = guards$1.getInputsThresholdValidator;
	var guards_34$1 = guards$1.stringify;

	if (!Int8Array.prototype.slice) {
	    Object.defineProperty(Int8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.subarray) {
	    Object.defineProperty(Uint8Array.prototype, 'subarray', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.map) {
	    Object.defineProperty(Int8Array.prototype, 'map', {
	        value: Array.prototype.map
	    });
	}
	if (!Int8Array.prototype.every) {
	    Object.defineProperty(Int8Array.prototype, 'every', {
	        value: Array.prototype.every
	    });
	}
	if (!Int8Array.prototype.some) {
	    Object.defineProperty(Uint8Array.prototype, 'some', {
	        value: Array.prototype.some
	    });
	}
	if (!Int8Array.prototype.indexOf) {
	    Object.defineProperty(Int8Array.prototype, 'indexOf', {
	        value: Array.prototype.indexOf
	    });
	}
	// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Polyfill
	// Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/
	if (!Int8Array.prototype.fill) {
	    Object.defineProperty(Int8Array.prototype, 'fill', {
	        value: function (input) {
	            // Steps 1-2.
	            if (this == null) {
	                throw new TypeError('this is null or not defined');
	            }
	            var O = Object(this);
	            // Steps 3-5.
	            var len = O.length >>> 0;
	            // Steps 6-7.
	            var start = arguments[1];
	            var relativeStart = start >> 0;
	            // Step 8.
	            var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
	            // Steps 9-10.
	            var end = arguments[2];
	            var relativeEnd = end === undefined ? len : end >> 0;
	            // Step 11.
	            var last = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
	            // Step 12.
	            while (k < last) {
	                O[k] = input;
	                k++;
	            }
	            // Step 13.
	            return O;
	        }
	    });
	}
	if (!Uint32Array.prototype.slice) {
	    Object.defineProperty(Uint8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Uint32Array.prototype.reverse) {
	    Object.defineProperty(Uint8Array.prototype, 'reverse', {
	        value: Array.prototype.reverse
	    });
	}

	var transaction = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	/**
	 * @module transaction
	 */








	exports.SIGNATURE_OR_MESSAGE_OFFSET = 0;
	exports.SIGNATURE_OR_MESSAGE_LENGTH = src$4.FRAGMENT_LENGTH;
	// export const EXTRA_DATA_DIGEST_OFFSET = SIGNATURE_OR_MESSAGE_OFFSET + SIGNATURE_OR_MESSAGE_LENGTH
	// export const EXTRA_DATA_DIGEST_LENGTH = 243
	exports.ADDRESS_OFFSET = exports.SIGNATURE_OR_MESSAGE_OFFSET + exports.SIGNATURE_OR_MESSAGE_LENGTH; // EXTRA_DATA_DIGEST_OFFSET + EXTRA_DATA_DIGEST_LENGTH
	exports.ADDRESS_LENGTH = src$2["default"].HASH_LENGTH;
	exports.VALUE_OFFSET = exports.ADDRESS_OFFSET + exports.ADDRESS_LENGTH;
	exports.VALUE_LENGTH = 81;
	exports.OBSOLETE_TAG_OFFSET = exports.VALUE_OFFSET + exports.VALUE_LENGTH;
	exports.OBSOLETE_TAG_LENGTH = 81;
	exports.ISSUANCE_TIMESTAMP_OFFSET = exports.OBSOLETE_TAG_OFFSET + exports.OBSOLETE_TAG_LENGTH;
	exports.ISSUANCE_TIMESTAMP_LENGTH = 27;
	// export const TIMELOCK_LOWER_BOUND_OFFSET = ISSUANCE_TIMESTAMP_OFFSET + ISSUANCE_TIMESTAMP_LENGTH
	// export const TIMELOCK_LOWER_BOUND_LENGTH = 27
	// export const TIMELOCK_UPPER_BOUND_OFFSET = TIMELOCK_LOWER_BOUND_OFFSET + TIMELOCK_LOWER_BOUND_LENGTH
	// export const TIMELOCK_UPPER_BOUND_LENGTH = 27
	exports.CURRENT_INDEX_OFFSET = exports.ISSUANCE_TIMESTAMP_OFFSET + exports.ISSUANCE_TIMESTAMP_LENGTH;
	exports.CURRENT_INDEX_LENGTH = 27;
	exports.LAST_INDEX_OFFSET = exports.CURRENT_INDEX_OFFSET + exports.CURRENT_INDEX_LENGTH;
	exports.LAST_INDEX_LENGTH = 27;
	// export const BUNDLE_NONCE_OFFSET = TIMELOCK_UPPER_BOUND_OFFSET + TIMELOCK_LOWER_BOUND_LENGTH
	// export const BUNDLE_NONCE_LENGTH = 243
	exports.BUNDLE_OFFSET = exports.LAST_INDEX_OFFSET + exports.LAST_INDEX_LENGTH;
	exports.BUNDLE_LENGTH = src$2["default"].HASH_LENGTH;
	exports.TRUNK_TRANSACTION_OFFSET = exports.BUNDLE_OFFSET + exports.BUNDLE_LENGTH; // BUNDLE_NONCE_OFFSET + BUNDLE_NONCE_LENGTH
	exports.TRUNK_TRANSACTION_LENGTH = src$1["default"].HASH_LENGTH;
	exports.BRANCH_TRANSACTION_OFFSET = exports.TRUNK_TRANSACTION_OFFSET + exports.TRUNK_TRANSACTION_LENGTH;
	exports.BRANCH_TRANSACTION_LENGTH = src$1["default"].HASH_LENGTH;
	exports.TAG_OFFSET = exports.BRANCH_TRANSACTION_OFFSET + exports.BRANCH_TRANSACTION_LENGTH;
	exports.TAG_LENGTH = 81;
	exports.ATTACHMENT_TIMESTAMP_OFFSET = exports.TAG_OFFSET + exports.TAG_LENGTH;
	exports.ATTACHMENT_TIMESTAMP_LENGTH = 27;
	exports.ATTACHMENT_TIMESTAMP_LOWER_BOUND_OFFSET = exports.ATTACHMENT_TIMESTAMP_OFFSET + exports.ATTACHMENT_TIMESTAMP_LENGTH;
	exports.ATTACHMENT_TIMESTAMP_LOWER_BOUND_LENGTH = 27;
	exports.ATTACHMENT_TIMESTAMP_UPPER_BOUND_OFFSET = exports.ATTACHMENT_TIMESTAMP_LOWER_BOUND_OFFSET + exports.ATTACHMENT_TIMESTAMP_LOWER_BOUND_LENGTH;
	exports.ATTACHMENT_TIMESTAMP_UPPER_BOUND_LENGTH = 27;
	exports.TRANSACTION_NONCE_OFFSET = exports.ATTACHMENT_TIMESTAMP_UPPER_BOUND_OFFSET + exports.ATTACHMENT_TIMESTAMP_UPPER_BOUND_LENGTH;
	exports.TRANSACTION_NONCE_LENGTH = 81;
	exports.TRANSACTION_ESSENCE_OFFSET = exports.ADDRESS_OFFSET; // EXTRA_DATA_DIGEST_OFFSET
	exports.TRANSACTION_ESSENCE_LENGTH = exports.BUNDLE_OFFSET - exports.ADDRESS_OFFSET; // BUNDLE_NONCE_OFFSET - EXTRA_DATA_DIGEST_OFFSET
	exports.TRANSACTION_LENGTH = exports.TRANSACTION_NONCE_OFFSET + exports.TRANSACTION_NONCE_LENGTH;
	exports.TRANSACTION_HASH_LENGTH = src$1["default"].HASH_LENGTH;
	/**
	 * Checks if given value is a valid transaction buffer length or offset.
	 *
	 * @method isMultipleOfTransactionLength
	 *
	 * @param {Int8Array} lengthOrOffset
	 *
	 * @return {boolean}
	 */
	exports.isMultipleOfTransactionLength = function (lengthOrOffset) {
	    if (!Number.isInteger(lengthOrOffset)) {
	        throw new TypeError(errors$5.ILLEGAL_LENGTH_OR_OFFSET);
	    }
	    return lengthOrOffset >= 0 && lengthOrOffset % exports.TRANSACTION_LENGTH === 0;
	};
	/**
	 * Creates a function that copies a fixed size part of the buffer.
	 *
	 * @method transactionBufferSlice
	 *
	 * @param {number} transactionFieldOffset
	 * @param {number} transactionFieldLength
	 *
	 * @return {Function}
	 *
	 * @ignore
	 */
	exports.transactionBufferSlice = function (transactionFieldOffset, transactionFieldLength) {
	    if (!Number.isInteger(transactionFieldOffset)) {
	        throw new TypeError(errors$5.ILLEGAL_TRANSACTION_FIELD_OFFSET);
	    }
	    if (transactionFieldOffset < 0) {
	        throw new RangeError(errors$5.ILLEGAL_TRANSACTION_FIELD_OFFSET);
	    }
	    if (!Number.isInteger(transactionFieldLength)) {
	        throw new TypeError(errors$5.ILLEGAL_TRANSACTION_FIELD_LENGTH);
	    }
	    if (transactionFieldLength < 0) {
	        throw new RangeError(errors$5.ILLEGAL_TRANSACTION_FIELD_LENGTH);
	    }
	    return function (transactionBuffer, transactionOffset) {
	        if (transactionOffset === void 0) { transactionOffset = 0; }
	        if (!(transactionBuffer instanceof Int8Array)) {
	            throw new Error(errors$5.ILLEGAL_TRANSACTION_BUFFER);
	        }
	        if (!exports.isMultipleOfTransactionLength(transactionBuffer.length)) {
	            throw new RangeError(errors$5.ILLEGAL_TRANSACTION_BUFFER_LENGTH);
	        }
	        if (!exports.isMultipleOfTransactionLength(transactionOffset)) {
	            throw new RangeError(errors$5.ILLEGAL_TRANSACTION_OFFSET);
	        }
	        return transactionBuffer.slice(transactionOffset + transactionFieldOffset, transactionOffset + transactionFieldOffset + transactionFieldLength);
	    };
	};
	/**
	 * Gets the `signatureOrMessage` field of all transactions in a bundle.
	 *
	 * @method signatureOrMessage
	 *
	 * @param {Int8Array} buffer - Transaction trytes
	 *
	 * @return {Int8Array}
	 */
	exports.signatureOrMessage = exports.transactionBufferSlice(exports.SIGNATURE_OR_MESSAGE_OFFSET, exports.SIGNATURE_OR_MESSAGE_LENGTH);
	/**
	 * Returns a copy of `address` field.
	 *
	 * @method address
	 *
	 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length
	 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
	 *
	 * @return {Int8Array}
	 */
	exports.address = exports.transactionBufferSlice(exports.ADDRESS_OFFSET, exports.ADDRESS_LENGTH);
	/**
	 * Returns a copy of `value` field.
	 *
	 * @method value
	 *
	 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
	 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
	 *
	 * @return {Int8Array}
	 */
	exports.value = exports.transactionBufferSlice(exports.VALUE_OFFSET, exports.VALUE_LENGTH);
	exports.createObsoleteTag = function (warn) {
	    /**
	     * Returns a copy of `obsoleteTag` field.
	     *
	     * @method obsoleteTag
	     *
	     * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
	     * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
	     *
	     * @return {Int8Array}
	     */
	    return function (buffer, offset) {
	        if (offset === void 0) { offset = 0; }
	        return exports.transactionBufferSlice(exports.OBSOLETE_TAG_OFFSET, exports.OBSOLETE_TAG_LENGTH)(buffer, offset);
	    };
	};
	exports.obsoleteTag = exports.createObsoleteTag();
	/**
	 * Returns a copy of `issuanceTimestamp` field.
	 *
	 * @method issuanceTimestamp
	 *
	 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
	 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
	 *
	 * @return {Int8Array}
	 */
	exports.issuanceTimestamp = exports.transactionBufferSlice(exports.ISSUANCE_TIMESTAMP_OFFSET, exports.ISSUANCE_TIMESTAMP_LENGTH);
	exports.createCurrentIndex = function (warn) {
	    /**
	     * Returns a copy of `currentIndex` field.
	     *
	     * @method currentIndex
	     *
	     * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
	     * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
	     *
	     * @return {Int8Array}
	     */
	    return function (buffer, offset) {
	        if (offset === void 0) { offset = 0; }
	        return exports.transactionBufferSlice(exports.CURRENT_INDEX_OFFSET, exports.CURRENT_INDEX_LENGTH)(buffer, offset);
	    };
	};
	exports.currentIndex = exports.createCurrentIndex();
	exports.createLastIndex = function (warn) {
	    /**
	     * Returns a copy of `lastIndex` field.
	     *
	     * @method lastIndex
	     *
	     * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
	     * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
	     *
	     * @return {Int8Array}
	     */
	    return function (buffer, offset) {
	        if (offset === void 0) { offset = 0; }
	        return exports.transactionBufferSlice(exports.LAST_INDEX_OFFSET, exports.LAST_INDEX_LENGTH)(buffer, offset);
	    };
	};
	exports.lastIndex = exports.createLastIndex();
	exports.createBundle = function (warn) {
	    /**
	     * Returns a copy of `bundle` field.
	     *
	     * @method bundle
	     *
	     * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
	     * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
	     *
	     * @return {Int8Array}
	     */
	    return function (buffer, offset) {
	        if (offset === void 0) { offset = 0; }
	        return exports.transactionBufferSlice(exports.BUNDLE_OFFSET, exports.BUNDLE_LENGTH)(buffer, offset);
	    };
	};
	exports.bundle = exports.createBundle();
	/**
	 * Returns a copy of `trunkTransaction` field.
	 *
	 * @method trunkTransaction
	 *
	 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
	 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
	 *
	 * @return {Int8Array}
	 */
	exports.trunkTransaction = exports.transactionBufferSlice(exports.TRUNK_TRANSACTION_OFFSET, exports.TRUNK_TRANSACTION_LENGTH);
	/**
	 * Returns a copy of `branchTransaction` field.
	 *
	 * @method branchTransaction
	 *
	 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
	 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
	 *
	 * @return {Int8Array}
	 */
	exports.branchTransaction = exports.transactionBufferSlice(exports.BRANCH_TRANSACTION_OFFSET, exports.BRANCH_TRANSACTION_LENGTH);
	/**
	 * Returns a copy of `tag` field.
	 *
	 * @method tag
	 *
	 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
	 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
	 *
	 * @return {Int8Array}
	 */
	exports.tag = exports.transactionBufferSlice(exports.TAG_OFFSET, exports.TAG_LENGTH);
	/**
	 * Returns a copy of `attachmentTimestamp` field.
	 *
	 * @method attachmentTimestamp
	 *
	 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
	 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
	 *
	 * @return {Int8Array}
	 */
	exports.attachmentTimestamp = exports.transactionBufferSlice(exports.ATTACHMENT_TIMESTAMP_OFFSET, exports.ATTACHMENT_TIMESTAMP_LENGTH);
	/**
	 * Returns a copy of `attachmentTimestampLowerBound` field.
	 *
	 * @method attachmentTimestampLowerBound
	 *
	 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
	 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
	 *
	 * @return {Int8Array}
	 */
	exports.attachmentTimestampLowerBound = exports.transactionBufferSlice(exports.ATTACHMENT_TIMESTAMP_LOWER_BOUND_OFFSET, exports.ATTACHMENT_TIMESTAMP_LOWER_BOUND_LENGTH);
	/**
	 * Returns a copy of `attachmentTimestampUpperBound` field.
	 *
	 * @method attachmentTimestampUpperBound
	 *
	 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
	 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
	 *
	 * @return {Int8Array}
	 */
	exports.attachmentTimestampUpperBound = exports.transactionBufferSlice(exports.ATTACHMENT_TIMESTAMP_UPPER_BOUND_OFFSET, exports.ATTACHMENT_TIMESTAMP_UPPER_BOUND_LENGTH);
	/**
	 * Returns a copy of `tansactionNonce` field.
	 *
	 * @method transactionNonce
	 *
	 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
	 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
	 *
	 * @return {Int8Array}
	 */
	exports.transactionNonce = exports.transactionBufferSlice(exports.TRANSACTION_NONCE_OFFSET, exports.TRANSACTION_NONCE_LENGTH);
	/**
	 * Returns a copy of transaction essence fields.
	 *
	 * @method bundle
	 *
	 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
	 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
	 *
	 * @return {Int8Array}
	 */
	exports.transactionEssence = exports.transactionBufferSlice(exports.TRANSACTION_ESSENCE_OFFSET, exports.TRANSACTION_ESSENCE_LENGTH);
	/**
	 * This method takes transaction trits, and returns the transaction hash.
	 *
	 * ## Related methods
	 *
	 * To validate the length of transaction trits, use the [`isMultipleOfTransactionLength()`]{@link #module_transaction.isMultipleOfTransactionLength} method.
	 *
	 * To get a transaction's trits from the Tangle, use the [`getTrytes()`]{@link #module_core.getTrytes} method, then convert them to trits, using the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
	 *
	 * @method transactionHash
	 *
	 * @summary Generates the transaction hash for a given transaction.
	 *
	 * @memberof module:transaction
	 *
	 * @param {Int8Array} buffer - Transactions in trits
	 * @param {Number} [offset=0] - Offset in trits to define a transaction to hash in the `buffer` argument
	 *
	 * @example
	 * ```js
	 * let hash = Transaction.transactionHash(transactions);
	 * ```
	 *
	 * @return {Int8Array} Transaction hash
	 *
	 * @throws {errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH}: Make sure that the `buffer` argument contains 8,019 trits (the length of a transaction without the transaction hash).
	 * @throws {errors.ILLEGAL_TRANSACTION_OFFSET}: Make sure that the `offset` argument is a multiple of 8,019 (the length of a transaction without the transaction hash).
	 */
	exports.transactionHash = function (buffer, offset) {
	    if (offset === void 0) { offset = 0; }
	    if (!exports.isMultipleOfTransactionLength(buffer.length)) {
	        throw new Error(errors$5.ILLEGAL_TRANSACTION_BUFFER_LENGTH);
	    }
	    if (!exports.isMultipleOfTransactionLength(offset)) {
	        throw new Error(errors$5.ILLEGAL_TRANSACTION_OFFSET);
	    }
	    var output = new Int8Array(src$1["default"].HASH_LENGTH);
	    var sponge = new src$1["default"]();
	    sponge.absorb(buffer, offset, exports.TRANSACTION_LENGTH);
	    sponge.squeeze(output, 0, src$1["default"].HASH_LENGTH);
	    return output;
	};
	/* Guards */
	/**
	 * This method takes an array of transaction trits and validates whether they form a valid transaction by checking the following:
	 *
	 * - Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
	 * - The transaction would result in a valid hash, according to the given [`minWeightMagnitude`](https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude) argument
	 *
	 * ## Related methods
	 *
	 * To get a transaction's trits from the Tangle, use the [`getTrytes()`]{@link #module_core.getTrytes} method, then convert them to trits, using the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
	 *
	 * @method isTransaction
	 *
	 * @summary Validates the structure and contents of a given transaction.
	 *
	 * @memberof module:transaction
	 *
	 * @param {Int8Array} transaction - Transaction trits
	 * @param {number} [minWeightMagnitude=0] - Minimum weight magnitude
	 *
	 * @example
	 * ```js
	 * let valid = Transaction.isTransaction(transaction);
	 * ```
	 *
	 * @return {boolean} valid - Whether the transaction is valid.
	 *
	 * @throws {errors.ILLEGAL_MIN_WEIGHT_MAGNITUDE}: Make sure that the `minWeightMagnitude` argument is a number between 1 and 81.
	 * @throws {errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH}: Make sure that the `transaction` argument contains 8,019 trits (the length of a transaction without the transaction hash).
	 */
	exports.isTransaction = function (transaction, minWeightMagnitude) {
	    if (minWeightMagnitude === void 0) { minWeightMagnitude = 0; }
	    if (!Number.isInteger(minWeightMagnitude)) {
	        throw new TypeError(errors$5.ILLEGAL_MIN_WEIGHT_MAGNITUDE);
	    }
	    if (minWeightMagnitude < 0 || minWeightMagnitude > exports.TRANSACTION_HASH_LENGTH) {
	        throw new RangeError(errors$5.ILLEGAL_MIN_WEIGHT_MAGNITUDE);
	    }
	    return (transaction.length === exports.TRANSACTION_LENGTH &&
	        guards$1.isTrits(transaction) &&
	        // Last address trit of value transaction must be 0.
	        // Revisions in signature scheme may affect this in the future.
	        (src.tritsToValue(exports.value(transaction)) === 0 || transaction[exports.ADDRESS_OFFSET + exports.ADDRESS_LENGTH - 1] === 0) &&
	        (!minWeightMagnitude ||
	            exports.transactionHash(transaction)
	                .subarray(exports.TRANSACTION_HASH_LENGTH - minWeightMagnitude, exports.TRANSACTION_HASH_LENGTH)
	                .every(function (trit) { return trit === 0; })));
	};
	/**
	 * This method takes an array of transaction trits, and checks its `currentIndex` field to validate whether it is the tail transaction in a bundle.
	 *
	 * ## Related methods
	 *
	 * To get a transaction's trits from the Tangle, use the [`getTrytes()`]{@link #module_core.getTrytes} method, then convert them to trits, using the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
	 *
	 * @method isTailTransaction
	 *
	 * @summary Checks if the given transaction is a tail transaction in a bundle.
	 *
	 * @memberof module:transaction
	 *
	 * @param {Int8Array} transaction - Transaction trits
	 *
	 * @example
	 * ```js
	 * let tail = Transaction.isTailTransaction(transaction);
	 * ```
	 *
	 * @return {boolean} tail - Whether the transaction is a tail transaction.
	 *
	 * @throws {errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH}: Make sure that the `transaction` argument contains 8,019 trits (the length of a transaction without the transaction hash).
	 */
	exports.isTail = function (transaction) {
	    return exports.isTransaction(transaction) && src.tritsToValue(exports.createCurrentIndex(false)(transaction)) === 0;
	};
	/**
	 * This method takes an array of transaction trits, and checks its `currentIndex` field to validate whether it is the head transaction in a bundle.
	 *
	 * ## Related methods
	 *
	 * To get a transaction's trits from the Tangle, use the [`getTrytes()`]{@link #module_core.getTrytes} method, then convert them to trits, using the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
	 *
	 * @method isHeadTransaction
	 *
	 * @summary Checks if the given transaction is a head transaction in a bundle.
	 *
	 * @memberof module:transaction
	 *
	 * @param {Int8Array} transaction - Transaction trits
	 *
	 * @example
	 * ```js
	 * let head = Transaction.isHeadTransaction(transaction);
	 * ```
	 *
	 * @return {boolean} head - Whether the transaction is a head transaction.
	 *
	 * @throws {errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH}: Make sure that the `transaction` argument contains 8,019 trits (the length of a transaction without the transaction hash).
	 */
	exports.isHead = function (transaction) {
	    return exports.isTransaction(transaction) &&
	        src.tritsToValue(exports.createCurrentIndex(false)(transaction)) === src.tritsToValue(exports.createLastIndex(false)(transaction));
	};
	/**
	 * This method checks if the given transaction trits include a proof of work by validating that the its `attachmentTimestamp` field has a non-zero value.
	 *
	 * The `attachmentTimestamp` field is set by the `attachToTangle` endpoint. Therefore, if this field is non-zero, this method assumes that proof of work was done.
	 *
	 * **Note:** This method does not validate proof of work.
	 *
	 * ## Related methods
	 *
	 * To get a transaction's trits from the Tangle, use the [`getTrytes()`]{@link #module_core.getTrytes} method, then convert them to trits, using the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
	 *
	 * @method isAttachedTransaction
	 *
	 * @ignore
	 *
	 * @summary Checks if the given transaction has a non-zero value in its `attachmentTimestamp` field.
	 *
	 * @memberof module:transaction
	 *
	 * @param {Int8Array} transaction - Transaction trits
	 *
	 * @example
	 * ```js
	 * let attached = Transaction.isAttachedTransaction(transaction);
	 * ```
	 *
	 * @return {boolean} attached - Whether the transaction has a non-zero value in its `attachmentTimestamp` field.
	 *
	 * @throws {errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH}: Make sure that the `transaction` argument contains 8,019 trits (the length of a transaction without the transaction hash).
	 */
	exports.isAttached = function (transaction) {
	    return exports.isTransaction(transaction) &&
	        transaction
	            .subarray(exports.ATTACHMENT_TIMESTAMP_OFFSET, exports.ATTACHMENT_TIMESTAMP_OFFSET + exports.ATTACHMENT_TIMESTAMP_LENGTH)
	            .some(function (trit) { return trit !== 0; });
	};

	});

	unwrapExports(transaction);
	var transaction_1 = transaction.SIGNATURE_OR_MESSAGE_OFFSET;
	var transaction_2 = transaction.SIGNATURE_OR_MESSAGE_LENGTH;
	var transaction_3 = transaction.ADDRESS_OFFSET;
	var transaction_4 = transaction.ADDRESS_LENGTH;
	var transaction_5 = transaction.VALUE_OFFSET;
	var transaction_6 = transaction.VALUE_LENGTH;
	var transaction_7 = transaction.OBSOLETE_TAG_OFFSET;
	var transaction_8 = transaction.OBSOLETE_TAG_LENGTH;
	var transaction_9 = transaction.ISSUANCE_TIMESTAMP_OFFSET;
	var transaction_10 = transaction.ISSUANCE_TIMESTAMP_LENGTH;
	var transaction_11 = transaction.CURRENT_INDEX_OFFSET;
	var transaction_12 = transaction.CURRENT_INDEX_LENGTH;
	var transaction_13 = transaction.LAST_INDEX_OFFSET;
	var transaction_14 = transaction.LAST_INDEX_LENGTH;
	var transaction_15 = transaction.BUNDLE_OFFSET;
	var transaction_16 = transaction.BUNDLE_LENGTH;
	var transaction_17 = transaction.TRUNK_TRANSACTION_OFFSET;
	var transaction_18 = transaction.TRUNK_TRANSACTION_LENGTH;
	var transaction_19 = transaction.BRANCH_TRANSACTION_OFFSET;
	var transaction_20 = transaction.BRANCH_TRANSACTION_LENGTH;
	var transaction_21 = transaction.TAG_OFFSET;
	var transaction_22 = transaction.TAG_LENGTH;
	var transaction_23 = transaction.ATTACHMENT_TIMESTAMP_OFFSET;
	var transaction_24 = transaction.ATTACHMENT_TIMESTAMP_LENGTH;
	var transaction_25 = transaction.ATTACHMENT_TIMESTAMP_LOWER_BOUND_OFFSET;
	var transaction_26 = transaction.ATTACHMENT_TIMESTAMP_LOWER_BOUND_LENGTH;
	var transaction_27 = transaction.ATTACHMENT_TIMESTAMP_UPPER_BOUND_OFFSET;
	var transaction_28 = transaction.ATTACHMENT_TIMESTAMP_UPPER_BOUND_LENGTH;
	var transaction_29 = transaction.TRANSACTION_NONCE_OFFSET;
	var transaction_30 = transaction.TRANSACTION_NONCE_LENGTH;
	var transaction_31 = transaction.TRANSACTION_ESSENCE_OFFSET;
	var transaction_32 = transaction.TRANSACTION_ESSENCE_LENGTH;
	var transaction_33 = transaction.TRANSACTION_LENGTH;
	var transaction_34 = transaction.TRANSACTION_HASH_LENGTH;
	var transaction_35 = transaction.isMultipleOfTransactionLength;
	var transaction_36 = transaction.transactionBufferSlice;
	var transaction_37 = transaction.signatureOrMessage;
	var transaction_38 = transaction.address;
	var transaction_39 = transaction.value;
	var transaction_40 = transaction.createObsoleteTag;
	var transaction_41 = transaction.obsoleteTag;
	var transaction_42 = transaction.issuanceTimestamp;
	var transaction_43 = transaction.createCurrentIndex;
	var transaction_44 = transaction.currentIndex;
	var transaction_45 = transaction.createLastIndex;
	var transaction_46 = transaction.lastIndex;
	var transaction_47 = transaction.createBundle;
	var transaction_48 = transaction.bundle;
	var transaction_49 = transaction.trunkTransaction;
	var transaction_50 = transaction.branchTransaction;
	var transaction_51 = transaction.tag;
	var transaction_52 = transaction.attachmentTimestamp;
	var transaction_53 = transaction.attachmentTimestampLowerBound;
	var transaction_54 = transaction.attachmentTimestampUpperBound;
	var transaction_55 = transaction.transactionNonce;
	var transaction_56 = transaction.transactionEssence;
	var transaction_57 = transaction.transactionHash;
	var transaction_58 = transaction.isTransaction;
	var transaction_59 = transaction.isTail;
	var transaction_60 = transaction.isHead;
	var transaction_61 = transaction.isAttached;

	var src$5 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;

	exports.address = transaction.address;
	exports.attachmentTimestamp = transaction.attachmentTimestamp;
	exports.attachmentTimestampLowerBound = transaction.attachmentTimestampLowerBound;
	exports.attachmentTimestampUpperBound = transaction.attachmentTimestampUpperBound;
	exports.branchTransaction = transaction.branchTransaction;
	exports.bundle = transaction.bundle;
	exports.currentIndex = transaction.currentIndex;
	exports.lastIndex = transaction.lastIndex;
	exports.obsoleteTag = transaction.obsoleteTag;
	exports.isAttached = transaction.isAttached;
	exports.isHead = transaction.isHead;
	exports.isMultipleOfTransactionLength = transaction.isMultipleOfTransactionLength;
	exports.issuanceTimestamp = transaction.issuanceTimestamp;
	exports.isTail = transaction.isTail;
	exports.isTransaction = transaction.isTransaction;
	exports.signatureOrMessage = transaction.signatureOrMessage;
	exports.tag = transaction.tag;
	exports.transactionEssence = transaction.transactionEssence;
	exports.transactionHash = transaction.transactionHash;
	exports.transactionNonce = transaction.transactionNonce;
	exports.trunkTransaction = transaction.trunkTransaction;
	exports.value = transaction.value;
	exports.SIGNATURE_OR_MESSAGE_OFFSET = transaction.SIGNATURE_OR_MESSAGE_OFFSET;
	exports.SIGNATURE_OR_MESSAGE_LENGTH = transaction.SIGNATURE_OR_MESSAGE_LENGTH;
	exports.ADDRESS_OFFSET = transaction.ADDRESS_OFFSET;
	exports.ADDRESS_LENGTH = transaction.ADDRESS_LENGTH;
	exports.VALUE_OFFSET = transaction.VALUE_OFFSET;
	exports.VALUE_LENGTH = transaction.VALUE_LENGTH;
	exports.OBSOLETE_TAG_OFFSET = transaction.OBSOLETE_TAG_OFFSET;
	exports.OBSOLETE_TAG_LENGTH = transaction.OBSOLETE_TAG_LENGTH;
	exports.ISSUANCE_TIMESTAMP_OFFSET = transaction.ISSUANCE_TIMESTAMP_OFFSET;
	exports.ISSUANCE_TIMESTAMP_LENGTH = transaction.ISSUANCE_TIMESTAMP_LENGTH;
	exports.CURRENT_INDEX_OFFSET = transaction.CURRENT_INDEX_OFFSET;
	exports.CURRENT_INDEX_LENGTH = transaction.CURRENT_INDEX_LENGTH;
	exports.LAST_INDEX_OFFSET = transaction.LAST_INDEX_OFFSET;
	exports.LAST_INDEX_LENGTH = transaction.LAST_INDEX_LENGTH;
	exports.BUNDLE_OFFSET = transaction.BUNDLE_OFFSET;
	exports.BUNDLE_LENGTH = transaction.BUNDLE_LENGTH;
	exports.TRUNK_TRANSACTION_OFFSET = transaction.TRUNK_TRANSACTION_OFFSET;
	exports.TRUNK_TRANSACTION_LENGTH = transaction.TRUNK_TRANSACTION_LENGTH;
	exports.BRANCH_TRANSACTION_OFFSET = transaction.BRANCH_TRANSACTION_OFFSET;
	exports.BRANCH_TRANSACTION_LENGTH = transaction.BRANCH_TRANSACTION_LENGTH;
	exports.TAG_OFFSET = transaction.TAG_OFFSET;
	exports.TAG_LENGTH = transaction.TAG_LENGTH;
	exports.ATTACHMENT_TIMESTAMP_OFFSET = transaction.ATTACHMENT_TIMESTAMP_OFFSET;
	exports.ATTACHMENT_TIMESTAMP_LENGTH = transaction.ATTACHMENT_TIMESTAMP_LENGTH;
	exports.ATTACHMENT_TIMESTAMP_LOWER_BOUND_OFFSET = transaction.ATTACHMENT_TIMESTAMP_LOWER_BOUND_OFFSET;
	exports.ATTACHMENT_TIMESTAMP_LOWER_BOUND_LENGTH = transaction.ATTACHMENT_TIMESTAMP_LOWER_BOUND_LENGTH;
	exports.ATTACHMENT_TIMESTAMP_UPPER_BOUND_OFFSET = transaction.ATTACHMENT_TIMESTAMP_UPPER_BOUND_OFFSET;
	exports.ATTACHMENT_TIMESTAMP_UPPER_BOUND_LENGTH = transaction.ATTACHMENT_TIMESTAMP_UPPER_BOUND_LENGTH;
	exports.TRANSACTION_NONCE_OFFSET = transaction.TRANSACTION_NONCE_OFFSET;
	exports.TRANSACTION_NONCE_LENGTH = transaction.TRANSACTION_NONCE_LENGTH;
	exports.TRANSACTION_ESSENCE_OFFSET = transaction.TRANSACTION_ESSENCE_OFFSET;
	exports.TRANSACTION_ESSENCE_LENGTH = transaction.TRANSACTION_ESSENCE_LENGTH;
	exports.TRANSACTION_LENGTH = transaction.TRANSACTION_LENGTH;
	exports.TRANSACTION_HASH_LENGTH = transaction.TRANSACTION_HASH_LENGTH;

	});

	unwrapExports(src$5);
	var src_1$3 = src$5.address;
	var src_2$3 = src$5.attachmentTimestamp;
	var src_3$2 = src$5.attachmentTimestampLowerBound;
	var src_4$2 = src$5.attachmentTimestampUpperBound;
	var src_5$1 = src$5.branchTransaction;
	var src_6$1 = src$5.bundle;
	var src_7$1 = src$5.currentIndex;
	var src_8 = src$5.lastIndex;
	var src_9 = src$5.obsoleteTag;
	var src_10 = src$5.isAttached;
	var src_11 = src$5.isHead;
	var src_12 = src$5.isMultipleOfTransactionLength;
	var src_13 = src$5.issuanceTimestamp;
	var src_14 = src$5.isTail;
	var src_15 = src$5.isTransaction;
	var src_16 = src$5.signatureOrMessage;
	var src_17 = src$5.tag;
	var src_18 = src$5.transactionEssence;
	var src_19 = src$5.transactionHash;
	var src_20 = src$5.transactionNonce;
	var src_21 = src$5.trunkTransaction;
	var src_22 = src$5.value;
	var src_23 = src$5.SIGNATURE_OR_MESSAGE_OFFSET;
	var src_24 = src$5.SIGNATURE_OR_MESSAGE_LENGTH;
	var src_25 = src$5.ADDRESS_OFFSET;
	var src_26 = src$5.ADDRESS_LENGTH;
	var src_27 = src$5.VALUE_OFFSET;
	var src_28 = src$5.VALUE_LENGTH;
	var src_29 = src$5.OBSOLETE_TAG_OFFSET;
	var src_30 = src$5.OBSOLETE_TAG_LENGTH;
	var src_31 = src$5.ISSUANCE_TIMESTAMP_OFFSET;
	var src_32 = src$5.ISSUANCE_TIMESTAMP_LENGTH;
	var src_33 = src$5.CURRENT_INDEX_OFFSET;
	var src_34 = src$5.CURRENT_INDEX_LENGTH;
	var src_35 = src$5.LAST_INDEX_OFFSET;
	var src_36 = src$5.LAST_INDEX_LENGTH;
	var src_37 = src$5.BUNDLE_OFFSET;
	var src_38 = src$5.BUNDLE_LENGTH;
	var src_39 = src$5.TRUNK_TRANSACTION_OFFSET;
	var src_40 = src$5.TRUNK_TRANSACTION_LENGTH;
	var src_41 = src$5.BRANCH_TRANSACTION_OFFSET;
	var src_42 = src$5.BRANCH_TRANSACTION_LENGTH;
	var src_43 = src$5.TAG_OFFSET;
	var src_44 = src$5.TAG_LENGTH;
	var src_45 = src$5.ATTACHMENT_TIMESTAMP_OFFSET;
	var src_46 = src$5.ATTACHMENT_TIMESTAMP_LENGTH;
	var src_47 = src$5.ATTACHMENT_TIMESTAMP_LOWER_BOUND_OFFSET;
	var src_48 = src$5.ATTACHMENT_TIMESTAMP_LOWER_BOUND_LENGTH;
	var src_49 = src$5.ATTACHMENT_TIMESTAMP_UPPER_BOUND_OFFSET;
	var src_50 = src$5.ATTACHMENT_TIMESTAMP_UPPER_BOUND_LENGTH;
	var src_51 = src$5.TRANSACTION_NONCE_OFFSET;
	var src_52 = src$5.TRANSACTION_NONCE_LENGTH;
	var src_53 = src$5.TRANSACTION_ESSENCE_OFFSET;
	var src_54 = src$5.TRANSACTION_ESSENCE_LENGTH;
	var src_55 = src$5.TRANSACTION_LENGTH;
	var src_56 = src$5.TRANSACTION_HASH_LENGTH;

	var createAttachToTangle = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;






	/**
	 * @method createAttachToTangle
	 *
	 * @summary Creates a new `attachToTangle()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`attachToTangle`]{@link #module_core.attachToTangle} - A new `attachToTangle()` function that uses your chosen Provider instance.
	 */
	exports.createAttachToTangle = function (_a) {
	    var send = _a.send;
	    /**
	     * This method uses the connected IRI node's [`attachToTangle`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#attachToTangle) endpoint to chain the given transaction trytes into a bundle and do proof of work.
	     *
	     * By doing proof of work, this method overwrites the following transaction fields:
	     *  - `hash`
	     *  - `nonce`
	     *  - `attachmentTimestamp`
	     *  - `attachmentTimestampLowerBound`
	     *  - `attachmentTimestampUpperBound`
	     *
	     * **Note:** You can replace this method with your own custom one in the [`composeApi()`]{@link ##module_core.composeApi} method. For example, you may want to write a function that does local proof of work, using either the [`ccurl.interface.js`](https://github.com/iotaledger/ccurl.interface.js) NodeJS library,
	     * or the [`curl.lib.js`](https://github.com/iotaledger/curl.lib.js) library for browsers that support WebGL2.
	     *
	     * ## Related methods
	     *
	     * To attach the returned transaction trytes to the Tangle, use the [`broadcastTransactions()`]{@link #module_core.broadcastTransactions} method to send them to a node.
	     *
	     * You can get a trunk and branch transaction hash by calling the
	     * [`getTransactionsToApprove()`]{@link #module_core.getTransactionsToApprove} method
	     *
	     * @method attachToTangle
	     *
	     * @summary Connects the given transaction trytes into a bundle and sends them to the connected IOTA node to complete [remote proof of work](https://docs.iota.org/docs/getting-started/0.1/transactions/proof-of-work).
	     *
	     * @memberof module:core
	     *
	     * @param {Hash} trunkTransaction - Trunk transaction hash
	     * @param {Hash} branchTransaction - Branch transaction hash
	     * @param {number} minWeightMagnitude - The [minimum weight magnitude](https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude) to use for proof of work. **Note:** This value must be at least the same as the minimum weight magnitude of the branch and trunk transactions.
	     * @param {TransactionTrytes[]} trytes - Array of transaction trytes in head first order, which are returned by the [`prepareTransfers()`]{@link #module_core.prepareTransfers} method
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     *
	     * ```js
	     * getTransactionsToApprove(depth)
	     *   .then(({ trunkTransaction, branchTransaction }) =>
	     *     attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes)
	     *   )
	     *   .then(attachedTrytes => {
	     *     console.log(`Successfully did proof of work. Here are your bundle's transaction trytes: ${attachedTrytes}`)
	     *   }).catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     *   })
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {TransactionTrytes[]} attachedTrytes - Array of transaction trytes in tail-first order. To attach these transactions to the Tangle, pass the trytes to the [`broadcastTransactions()`]{@link #module_core.broadcastTransactions} method.
	     *
	     * @reject {Error} error - One of the following errors:
	     * - `INVALID_TRUNK_TRANSACTION`: Make sure that the hash contains 81 trytes
	     * - `INVALID_BRANCH_TRANSACTION`: Make sure that the hash contains 81 trytes
	     * - `INVALID_MIN_WEIGHT_MAGNITUDE`: Make sure that the minimum weight magnitude is at least the same as the one used for the branch and trunk transactions.
	     * - `INVALID_TRANSACTION_TRYTES`: Make sure the trytes can be converted to a valid transaction object
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, callback) {
	        return bluebird.resolve(guards.validate([
	            trunkTransaction,
	            function (t) { return guards.isTrytesOfExactLength(t, src$5.TRANSACTION_HASH_LENGTH / src.TRYTE_WIDTH); },
	            errors$1.INVALID_TRUNK_TRANSACTION,
	        ], [
	            branchTransaction,
	            function (t) { return guards.isTrytesOfExactLength(t, src$5.TRANSACTION_HASH_LENGTH / src.TRYTE_WIDTH); },
	            errors$1.INVALID_BRANCH_TRANSACTION,
	        ], [
	            minWeightMagnitude,
	            function (mwm) { return Number.isInteger(mwm) && mwm <= src$5.TRANSACTION_HASH_LENGTH; },
	            errors$1.INVALID_MIN_WEIGHT_MAGNITUDE,
	        ], [
	            trytes,
	            function (arr) {
	                return arr.every(function (t) {
	                    return guards.isTrytesOfExactLength(t, src$5.TRANSACTION_LENGTH / src.TRYTE_WIDTH) &&
	                        src$5.isTransaction(src.trytesToTrits(t));
	                });
	            },
	            errors$1.INVALID_TRANSACTION_TRYTES,
	        ]))
	            .then(function () {
	            return send({
	                command: types.IRICommand.ATTACH_TO_TANGLE,
	                trunkTransaction: trunkTransaction,
	                branchTransaction: branchTransaction,
	                minWeightMagnitude: minWeightMagnitude,
	                trytes: trytes
	            });
	        })
	            .then(function (res) { return res.trytes; })
	            .asCallback(typeof arguments[2] === 'function' ? arguments[2] : callback);
	    };
	};

	});

	unwrapExports(createAttachToTangle);
	var createAttachToTangle_1 = createAttachToTangle.createAttachToTangle;

	var createBroadcastTransactions = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;






	/**
	 * @method createBroadcastTransactions
	 *
	 * @summary Creates a new `broadcastTransactions()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`broadcastTransactions`]{@link #module_core.broadcastTransactions}  - A new `broadcastTransactions()` function that uses your chosen Provider instance.
	 */
	exports.createBroadcastTransactions = function (_a) {
	    var send = _a.send;
	    /**
	     * This method sends the given transaction trytes to the connected IRI node, using its
	     * [`broadcastTransactions`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#broadcastTransactions) endpoint.
	     *
	     * **Note:** Before calling this method, we recommend saving your transaction trytes in local storage.
	     * By doing so, you make sure that you can always reattach your transactions to the Tangle in case they remain in a pending state.
	     *
	     * ## Related methods
	     *
	     * The given transaction trytes must be in a valid bundle and must include a proof of work.
	     *
	     * To create a valid bundle, use the `prepareTransfers()` method. For more information about what makes a bundles and transactions valid, see [this guide](https://docs.iota.org/docs/node-software/0.1/iri/concepts/transaction-validation).
	     *
	     * To do proof of work, use one of the following methods:
	     *
	     * - [`attachToTangle()`]{@link #module_core.attachToTangle}
	     * - [`sendTrytes()`]{@link #module_core.sendTrytes}
	     *
	     * @method broadcastTransactions
	     *
	     * @summary Sends the given transaction trytes to the connected IRI node.
	     *
	     * @memberof module:core
	     *
	     * @param {TransactionTrytes[]} trytes - Transaction trytes that include proof of work
	     * @param {Callback} [callback] - Optional callback
	     *
	     * @example
	     *
	     * ```js
	     * broadcastTransactions(trytes)
	     *   .then(transactionTrytes => {
	     *      console.log(`Successfully sent the following transaction trytes to the node:)
	     *      console.log(JSON.stringify(transactionTrytes));
	     *   })
	     *   .catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     *   })
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {TransactionTrytes[]} transactionTrytes - Array of transaction trytes that you just broadcast
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_ATTACHED_TRYTES`: Make sure that the trytes include a proof of work
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function (trytes, callback) {
	        return bluebird.resolve(guards.validate([
	            trytes,
	            function (arr) {
	                return arr.every(function (t) {
	                    return guards.isTrytesOfExactLength(t, src$5.TRANSACTION_LENGTH / src.TRYTE_WIDTH) && src$5.isAttached(src.trytesToTrits(t));
	                });
	            },
	            errors$1.INVALID_ATTACHED_TRYTES,
	        ]))
	            .then(function () {
	            return send({
	                command: types.IRICommand.BROADCAST_TRANSACTIONS,
	                trytes: trytes
	            });
	        })
	            .then(function () { return trytes; })
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createBroadcastTransactions);
	var createBroadcastTransactions_1 = createBroadcastTransactions.createBroadcastTransactions;

	var createCheckConsistency = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;




	var defaults = {
	    rejectWithReason: false
	};
	/**
	 * @method createCheckConsistency
	 *
	 * @summary Creates a new `checkConsistency()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`checkConsistency`]{@link #module_core.checkConsistency}  - A new `checkConsistency()` function that uses your chosen Provider instance.
	 */
	exports.createCheckConsistency = function (_a) {
	    var send = _a.send;
	    /**
	     * This method finds out if a transaction has a chance of being confirmed, using the connected node's
	     * [`checkConsistency`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#checkconsistency) endpoint.
	     *
	     * A consistent transaction is one where:
	     * - The node has the transaction's branch and trunk transactions in its ledger
	     * - The transaction's bundle is valid
	     * - The transaction's branch and trunk transactions are valid
	     *
	     * For more information about what makes a bundles and transactions valid, see [this article](https://docs.iota.org/docs/node-software/0.1/iri/concepts/transaction-validation).
	     *
	     * As long as a transaction is consistent it has a chance of being confirmed.
	     *
	     * ## Related methods
	     *
	     * If a consistent transaction is taking a long time to be confirmed, you can improve its chances, using the
	     * [`promoteTransaction()`]{@link #module_core.promoteTransaction} method.
	     *
	     * If a transaction is inconsistent, it will never be confirmed. In this case, you can reattach the transaction, using the [`replayBundle()`]{@link #module_core.replayBundle} method.
	     *
	     * @method checkConsistency
	     *
	     * @summary Checks if one or more transactions are consistent.
	     *
	     * @memberof module:core
	     *
	     * @param {Hash|Hash[]} transactions - One or more tail transaction hashes to check
	     * @param {Object} [options] - Options object
	     * @param {boolean} [options.rejectWithReason] - Return the reason for inconsistent transactions
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     * ```js
	     * checkConsistency(transactions)
	     *   .then(isConsistent => {
	     *     isConsistent? console.log(All these transactions are consistent): console.log(One or more of these transactions are inconsistent);
	     *   })
	     *   .catch(err => {
	     *     console.log(`Something went wrong: ${error}`);
	     *   })
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {boolean} isConsistent - Whether the given transactions are consistent
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hashes are 81 trytes long and their `currentIndex` field is 0
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     * - Reason for inconsistency if the method was called with the `options.rejectWithReason` argument
	     */
	    return function checkConsistency(transactions, options, callback) {
	        var rejectWithReason = types.getOptionsWithDefaults(defaults)(options || {}).rejectWithReason;
	        var tails = types.asArray(transactions);
	        return bluebird.resolve(guards.validate([tails, function (arr) { return arr.every(guards.isHash); }, errors$1.INVALID_TRANSACTION_HASH]))
	            .then(function () {
	            return send({
	                command: types.IRICommand.CHECK_CONSISTENCY,
	                tails: tails
	            });
	        })
	            .then(function (_a) {
	            var state = _a.state, info = _a.info;
	            if (rejectWithReason && !state) {
	                throw new Error(errors$1.inconsistentTransaction(info));
	            }
	            return state;
	        })
	            .asCallback(typeof arguments[1] === 'function' ? arguments[1] : callback);
	    };
	};

	});

	unwrapExports(createCheckConsistency);
	var createCheckConsistency_1 = createCheckConsistency.createCheckConsistency;

	var errors$6 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.ILLEGAL_LENGTH = 'Illegal trits length';
	exports.ILLEGAL_SUBSEED_INDEX = 'Illegal subseed length';
	exports.ILLEGAL_SUBSEED_LENGTH = 'Illegal subseed length';
	exports.ILLEGAL_NUMBER_OF_FRAGMENTS = 'Illegal number of fragments';
	exports.ILLEGAL_KEY_LENGTH = 'Illegal key length';
	exports.ILLEGAL_DIGESTS_LENGTH = 'Illegal digests length';
	exports.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH = 'Illegal normalized fragment length';
	exports.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH = 'Illegal signature fragment length';
	exports.ILLEGAL_BUNDLE_HASH_LENGTH = 'Illegal bundle hash length';
	exports.ILLEGAL_KEY_FRAGMENT_LENGTH = 'Illegal key fragment length';
	exports.ILLEGAL_TRIT_CONVERSION_INPUT = 'Illegal conversion input. Expected trits as Int8Array.';
	exports.ILLEGAL_TRYTE_CONVERSION_INPUT = 'Illegal conversion input. Expected trytes string or integer.';
	exports.ILLEGAL_MIN_WEIGHT_MAGNITUDE = 'Illegal minWeightMagnitude value.';
	exports.ILLEGAL_ADDRESS_LAST_TRIT = 'Illegal address. Last trit must be 0.';
	exports.ILLEGAL_ADDRESS_LENGTH = 'Illegal address length.';
	exports.ILLEGAL_BUNDLE_LENGTH = 'Illegal bundle hash length.';
	exports.ILLEGAL_OBSOLETE_TAG_LENGTH = 'Illegal obsoleteTag length.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE = 'Illegal signature or message.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH = 'Illegal signatureOrMessage length.';
	exports.ILLEGAL_TAG_LENGTH = 'Illegal tag length.';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP = 'Illegal issuance timestamp';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH = 'Illegal issuanceTimestamp length.';
	exports.ILLEGAL_VALUE_LENGTH = 'Illegal value length.';
	exports.ILLEGAL_TRANSACTION_FIELD_OFFSET = 'Illegal transaction field offset.';
	exports.ILLEGAL_TRANSACTION_FIELD_LENGTH = 'Illegal transaction field length.';
	exports.ILLEGAL_LENGTH_OR_OFFSET = 'Illegal length or offset.';
	exports.ILLEGAL_TRANSACTION_BUFFER = 'Illegal transaction buffer. Expected `Int8Array`.';
	exports.ILLEGAL_TRANSACTION_BUFFER_LENGTH = 'Illegal transaction buffer length.';
	exports.ILLEGAL_TRANSACTION_OFFSET = 'Illegal transaction offset.';
	exports.ILLEGAL_TRANSACTION_LENGTH = 'Illegal transaction length.';
	exports.ILLEGAL_TRANSACTION_ORDER = 'Illegal transaction order.';
	exports.ILLEGAL_TRANSACTION_INDEX = 'Illegal transaction index.';
	exports.ILLEGAL_SEED_LENGTH = 'Illegal seed length. Expected length of 243 trits.';
	exports.ILLEGAL_KEY_INDEX = 'Illegal key index.';
	exports.ILLEGAL_CDA_LENGTH = 'Illegal cda length.';
	exports.ILLEGAL_BATCH = 'Illegal batch.';
	exports.CDA_ALREADY_IN_STORE = 'CDA is already in store.';
	exports.ILLEGAL_PERSISTENCE_ID = 'Illegal persistence id.';
	exports.ILLEGAL_PERSISTENCE_PATH = 'Illegal persistence path.';
	exports.ILLEGAL_PADDING_LENGTH = 'Illegal padding length. Input value length exceeds padding length.';
	exports.INCONSISTENT_SUBTANGLE = 'Inconsistent subtangle';
	exports.INSUFFICIENT_BALANCE = 'Insufficient balance';
	exports.INVALID_ADDRESS = 'Invalid address';
	exports.INVALID_REMAINDER_ADDRESS = 'Invalid remainder address';
	exports.INVALID_BRANCH_TRANSACTION = 'Invalid branch transaction';
	exports.INVALID_BUNDLE = 'Invalid bundle';
	exports.INVALID_BUNDLE_HASH = 'Invalid bundle hash';
	exports.INVALID_CHECKSUM = 'Invalid checksum';
	exports.INVALID_COMMAND = 'Invalid command format';
	exports.INVALID_DEPTH = 'Invalid depth';
	exports.INVALID_HASH = 'Invalid hash';
	exports.INVALID_INDEX = 'Invalid index option';
	exports.INVALID_TOTAL_OPTION = 'Invalid total option';
	exports.INVALID_INPUT = 'Invalid input';
	exports.INVALID_KEY = 'Invalid key value';
	exports.INVALID_MIN_WEIGHT_MAGNITUDE = 'Invalid Min Weight Magnitude';
	exports.INVALID_SEARCH_KEY = 'Invalid search key';
	exports.INVALID_SECURITY_LEVEL = 'Invalid security option';
	exports.INVALID_SECURITY_OPTION = 'Invalid security option';
	exports.INVALID_SEED = 'Invalid seed';
	exports.INVALID_START_END_OPTIONS = 'Invalid end option';
	exports.INVALID_START_OPTION = 'Invalid start option';
	exports.INVALID_TAG = 'Invalid tag';
	exports.INVALID_TRANSACTION = 'Invalid transaction';
	exports.INVALID_TRANSACTION_TRYTES = 'Invalid transaction trytes';
	exports.INVALID_ATTACHED_TRYTES = 'Invalid attached trytes';
	exports.INVALID_TRANSACTION_HASH = 'Invalid transaction hash';
	exports.INVALID_TAIL_TRANSACTION = 'Invalid tail transaction';
	exports.INVALID_THRESHOLD = 'Invalid threshold option';
	exports.INVALID_TRANSFER = 'Invalid transfer array';
	exports.INVALID_TRUNK_TRANSACTION = 'Invalid trunk transaction';
	exports.INVALID_REFERENCE_HASH = 'Invalid reference hash';
	exports.INVALID_TRYTES = 'Invalid trytes';
	exports.INVALID_URI = 'Invalid uri';
	exports.INVALID_ASCII_INPUT = 'Conversion to trytes requires type of input to be encoded in ascii.';
	exports.INVALID_ODD_LENGTH = 'Conversion from trytes requires length of trytes to be even.';
	exports.INVALID_TRYTE_ENCODED_JSON = 'Invalid tryte encoded JSON message';
	exports.NOT_INT = 'One of the inputs is not integer';
	exports.SENDING_BACK_TO_INPUTS = 'One of the transaction inputs is used as output.';
	exports.INVALID_TRANSACTIONS_TO_APPROVE = 'Invalid transactions to approve.';
	exports.NO_INPUTS = 'Could not find any available inputs.';
	exports.invalidChecksum = function (address) { return "Invalid Checksum: " + address; };
	exports.inconsistentTransaction = function (reason) { return "Transaction is inconsistent. Reason: " + reason; };
	exports.INVALID_DELAY = 'Invalid delay.';

	});

	unwrapExports(errors$6);
	var errors_1$6 = errors$6.ILLEGAL_LENGTH;
	var errors_2$6 = errors$6.ILLEGAL_SUBSEED_INDEX;
	var errors_3$5 = errors$6.ILLEGAL_SUBSEED_LENGTH;
	var errors_4$5 = errors$6.ILLEGAL_NUMBER_OF_FRAGMENTS;
	var errors_5$4 = errors$6.ILLEGAL_KEY_LENGTH;
	var errors_6$4 = errors$6.ILLEGAL_DIGESTS_LENGTH;
	var errors_7$4 = errors$6.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH;
	var errors_8$4 = errors$6.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH;
	var errors_9$4 = errors$6.ILLEGAL_BUNDLE_HASH_LENGTH;
	var errors_10$4 = errors$6.ILLEGAL_KEY_FRAGMENT_LENGTH;
	var errors_11$4 = errors$6.ILLEGAL_TRIT_CONVERSION_INPUT;
	var errors_12$4 = errors$6.ILLEGAL_TRYTE_CONVERSION_INPUT;
	var errors_13$4 = errors$6.ILLEGAL_MIN_WEIGHT_MAGNITUDE;
	var errors_14$4 = errors$6.ILLEGAL_ADDRESS_LAST_TRIT;
	var errors_15$4 = errors$6.ILLEGAL_ADDRESS_LENGTH;
	var errors_16$4 = errors$6.ILLEGAL_BUNDLE_LENGTH;
	var errors_17$4 = errors$6.ILLEGAL_OBSOLETE_TAG_LENGTH;
	var errors_18$4 = errors$6.ILLEGAL_SIGNATURE_OR_MESSAGE;
	var errors_19$4 = errors$6.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH;
	var errors_20$4 = errors$6.ILLEGAL_TAG_LENGTH;
	var errors_21$4 = errors$6.ILLEGAL_ISSUANCE_TIMESTAMP;
	var errors_22$4 = errors$6.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH;
	var errors_23$4 = errors$6.ILLEGAL_VALUE_LENGTH;
	var errors_24$4 = errors$6.ILLEGAL_TRANSACTION_FIELD_OFFSET;
	var errors_25$4 = errors$6.ILLEGAL_TRANSACTION_FIELD_LENGTH;
	var errors_26$4 = errors$6.ILLEGAL_LENGTH_OR_OFFSET;
	var errors_27$4 = errors$6.ILLEGAL_TRANSACTION_BUFFER;
	var errors_28$4 = errors$6.ILLEGAL_TRANSACTION_BUFFER_LENGTH;
	var errors_29$4 = errors$6.ILLEGAL_TRANSACTION_OFFSET;
	var errors_30$4 = errors$6.ILLEGAL_TRANSACTION_LENGTH;
	var errors_31$4 = errors$6.ILLEGAL_TRANSACTION_ORDER;
	var errors_32$4 = errors$6.ILLEGAL_TRANSACTION_INDEX;
	var errors_33$4 = errors$6.ILLEGAL_SEED_LENGTH;
	var errors_34$4 = errors$6.ILLEGAL_KEY_INDEX;
	var errors_35$4 = errors$6.ILLEGAL_CDA_LENGTH;
	var errors_36$4 = errors$6.ILLEGAL_BATCH;
	var errors_37$4 = errors$6.CDA_ALREADY_IN_STORE;
	var errors_38$4 = errors$6.ILLEGAL_PERSISTENCE_ID;
	var errors_39$4 = errors$6.ILLEGAL_PERSISTENCE_PATH;
	var errors_40$4 = errors$6.ILLEGAL_PADDING_LENGTH;
	var errors_41$4 = errors$6.INCONSISTENT_SUBTANGLE;
	var errors_42$4 = errors$6.INSUFFICIENT_BALANCE;
	var errors_43$4 = errors$6.INVALID_ADDRESS;
	var errors_44$4 = errors$6.INVALID_REMAINDER_ADDRESS;
	var errors_45$4 = errors$6.INVALID_BRANCH_TRANSACTION;
	var errors_46$4 = errors$6.INVALID_BUNDLE;
	var errors_47$4 = errors$6.INVALID_BUNDLE_HASH;
	var errors_48$4 = errors$6.INVALID_CHECKSUM;
	var errors_49$4 = errors$6.INVALID_COMMAND;
	var errors_50$4 = errors$6.INVALID_DEPTH;
	var errors_51$4 = errors$6.INVALID_HASH;
	var errors_52$4 = errors$6.INVALID_INDEX;
	var errors_53$4 = errors$6.INVALID_TOTAL_OPTION;
	var errors_54$4 = errors$6.INVALID_INPUT;
	var errors_55$4 = errors$6.INVALID_KEY;
	var errors_56$4 = errors$6.INVALID_MIN_WEIGHT_MAGNITUDE;
	var errors_57$4 = errors$6.INVALID_SEARCH_KEY;
	var errors_58$4 = errors$6.INVALID_SECURITY_LEVEL;
	var errors_59$4 = errors$6.INVALID_SECURITY_OPTION;
	var errors_60$4 = errors$6.INVALID_SEED;
	var errors_61$4 = errors$6.INVALID_START_END_OPTIONS;
	var errors_62$4 = errors$6.INVALID_START_OPTION;
	var errors_63$4 = errors$6.INVALID_TAG;
	var errors_64$4 = errors$6.INVALID_TRANSACTION;
	var errors_65$4 = errors$6.INVALID_TRANSACTION_TRYTES;
	var errors_66$4 = errors$6.INVALID_ATTACHED_TRYTES;
	var errors_67$4 = errors$6.INVALID_TRANSACTION_HASH;
	var errors_68$4 = errors$6.INVALID_TAIL_TRANSACTION;
	var errors_69$4 = errors$6.INVALID_THRESHOLD;
	var errors_70$4 = errors$6.INVALID_TRANSFER;
	var errors_71$4 = errors$6.INVALID_TRUNK_TRANSACTION;
	var errors_72$4 = errors$6.INVALID_REFERENCE_HASH;
	var errors_73$4 = errors$6.INVALID_TRYTES;
	var errors_74$4 = errors$6.INVALID_URI;
	var errors_75$4 = errors$6.INVALID_ASCII_INPUT;
	var errors_76$4 = errors$6.INVALID_ODD_LENGTH;
	var errors_77$4 = errors$6.INVALID_TRYTE_ENCODED_JSON;
	var errors_78$4 = errors$6.NOT_INT;
	var errors_79$4 = errors$6.SENDING_BACK_TO_INPUTS;
	var errors_80$4 = errors$6.INVALID_TRANSACTIONS_TO_APPROVE;
	var errors_81$4 = errors$6.NO_INPUTS;
	var errors_82$4 = errors$6.invalidChecksum;
	var errors_83$4 = errors$6.inconsistentTransaction;
	var errors_84$4 = errors$6.INVALID_DELAY;

	var constants$2 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.HASH_TRYTE_SIZE = 81;
	exports.TAG_TRYTE_SIZE = 27;
	exports.SIGNATURE_MESSAGE_FRAGMENT_TRYTE_SIZE = 2187;
	exports.TRANSACTION_TRYTE_SIZE = 2673;
	exports.MAX_INDEX_DIFF = 1000;
	exports.NULL_HASH_TRYTES = '9'.repeat(exports.HASH_TRYTE_SIZE);
	exports.NULL_TAG_TRYTES = '9'.repeat(exports.TAG_TRYTE_SIZE);
	exports.NULL_SIGNATURE_MESSAGE_FRAGMENT_TRYTES = '9'.repeat(exports.SIGNATURE_MESSAGE_FRAGMENT_TRYTE_SIZE);
	exports.NULL_TRANSACTION_TRYTES = '9'.repeat(exports.TRANSACTION_TRYTE_SIZE);

	});

	unwrapExports(constants$2);
	var constants_1$2 = constants$2.HASH_TRYTE_SIZE;
	var constants_2$2 = constants$2.TAG_TRYTE_SIZE;
	var constants_3$2 = constants$2.SIGNATURE_MESSAGE_FRAGMENT_TRYTE_SIZE;
	var constants_4$2 = constants$2.TRANSACTION_TRYTE_SIZE;
	var constants_5$2 = constants$2.MAX_INDEX_DIFF;
	var constants_6$2 = constants$2.NULL_HASH_TRYTES;
	var constants_7$2 = constants$2.NULL_TAG_TRYTES;
	var constants_8$2 = constants$2.NULL_SIGNATURE_MESSAGE_FRAGMENT_TRYTES;
	var constants_9$2 = constants$2.NULL_TRANSACTION_TRYTES;

	var guards$2 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;


	// Required for markdown generation with JSDoc
	/**
	 * @module validators
	 */
	/* Type guards */
	/**
	 * Checks if input is an `Int8Array` of trit values; `-1, 0, 1`.
	 *
	 * @method isTrits
	 *
	 * @param {any} input
	 *
	 * @return {boolean}
	 */
	exports.isTrits = function (input) {
	    if (input instanceof Int8Array) {
	        for (var i = 0; i < input.length; i++) {
	            if (!(input[i] === 0 || input[i] === -1 || input[i] === 1)) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	};
	/**
	 * Checks if trits are NULL.
	 *
	 * @method isNullTrits
	 *
	 * @param {Int8Array} trits
	 *
	 * @return {boolean}
	 */
	exports.isNullTrits = function (input) {
	    if (input instanceof Int8Array) {
	        if (input.length === 0) {
	            return true;
	        }
	        for (var i = 0; i < input.length; i++) {
	            if (input[i] !== 0) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	};
	/**
	 * Checks if input is correct trytes consisting of [9A-Z]; optionally validate length
	 * @method isTrytes
	 *
	 * @param {string} trytes
	 * @param {string | number} [length='1,']
	 *
	 * @return {boolean}
	 */
	exports.isTrytes = function (trytes, length) {
	    if (length === void 0) { length = '1,'; }
	    return typeof trytes === 'string' && new RegExp("^[9A-Z]{" + length + "}$").test(trytes);
	};
	/**
	 * @method isTrytesOfExactLength
	 *
	 * @param {string} trytes
	 * @param {number} length
	 *
	 * @return {boolean}
	 */
	exports.isTrytesOfExactLength = function (trytes, length) {
	    return typeof trytes === 'string' && new RegExp("^[9A-Z]{" + length + "}$").test(trytes);
	};
	/**
	 * @method isTrytesOfMaxLength
	 *
	 * @param {string} trytes
	 * @param {number} length
	 *
	 * @return {boolean}
	 */
	exports.isTrytesOfMaxLength = function (trytes, length) {
	    return typeof trytes === 'string' && new RegExp("^[9A-Z]{1," + length + "}$").test(trytes);
	};
	/**
	 * Checks if input contains `9`s only.
	 * @method isEmpty
	 *
	 * @param {string} hash
	 *
	 * @return {boolean}
	 */
	exports.isEmpty = function (trytes) { return typeof trytes === 'string' && /^[9]+$/.test(trytes); };
	exports.isNinesTrytes = exports.isEmpty;
	/**
	 * Checks if input is correct hash (81 trytes) or address with checksum (90 trytes)
	 *
	 * @method isHash
	 *
	 * @param {string} hash
	 *
	 * @return {boolean}
	 */
	exports.isHash = function (hash) {
	    return exports.isTrytesOfExactLength(hash, constants$2.HASH_TRYTE_SIZE) || exports.isTrytesOfExactLength(hash, constants$2.HASH_TRYTE_SIZE + 9);
	}; // address w/ checksum is valid hash
	/* Check if security level is valid positive integer */
	exports.isSecurityLevel = function (security) {
	    return Number.isInteger(security) && security > 0 && security < 4;
	};
	/**
	 * Checks if input is valid input object. Address can be passed with or without checksum.
	 * It does not validate the checksum.
	 *
	 * @method isInput
	 *
	 * @param {string} address
	 *
	 * @return {boolean}
	 */
	exports.isInput = function (input) {
	    return exports.isHash(input.address) &&
	        exports.isSecurityLevel(input.security) &&
	        (typeof input.balance === 'undefined' || (Number.isInteger(input.balance) && input.balance > 0)) &&
	        Number.isInteger(input.keyIndex) &&
	        input.keyIndex >= 0;
	};
	/**
	 * Checks that input is valid tag trytes.
	 *
	 * @method isTag
	 *
	 * @param {string} tag
	 *
	 * @return {boolean}
	 */
	exports.isTag = function (tag) { return exports.isTrytesOfMaxLength(tag, constants$2.TAG_TRYTE_SIZE); };
	/**
	 * Checks if input is valid `transfer` object.
	 *
	 * @method isTransfer
	 *
	 * @param {Transfer} transfer
	 *
	 * @return {boolean}
	 */
	exports.isTransfer = function (transfer) {
	    return exports.isHash(transfer.address) &&
	        Number.isInteger(transfer.value) &&
	        transfer.value >= 0 &&
	        (!transfer.message || exports.isTrytes(transfer.message, '0,')) &&
	        (!transfer.tag || exports.isTag(transfer.tag));
	};
	/**
	 * Checks that a given `URI` is valid
	 *
	 * Valid Examples:
	 * - `udp://[2001:db8:a0b:12f0::1]:14265`
	 * - `udp://[2001:db8:a0b:12f0::1]`
	 * - `udp://8.8.8.8:14265`
	 * - `udp://domain.com`
	 * - `udp://domain2.com:14265`
	 *
	 * @method isUri
	 *
	 * @param {string} uri
	 *
	 * @return {boolean}
	 */
	exports.isUri = function (uri) {
	    if (typeof uri !== 'string') {
	        return false;
	    }
	    var getInside = /^(udp|tcp):\/\/([\[][^\]\.]*[\]]|[^\[\]:]*)[:]{0,1}([0-9]{1,}$|$)/i;
	    var stripBrackets = /[\[]{0,1}([^\[\]]*)[\]]{0,1}/;
	    var uriTest = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/;
	    return getInside.test(uri) && uriTest.test(stripBrackets.exec(getInside.exec(uri)[1])[1]);
	};
	/* Check if start & end options are valid */
	exports.isStartEndOptions = function (_a) {
	    var start = _a.start, end = _a.end;
	    return !end || (start <= end && end < start + constants$2.MAX_INDEX_DIFF);
	};
	/* Checks all array items */
	exports.isArray = function (f) { return function (x) {
	    return Array.isArray(x) && x.length > 0 && x.every(function (y) { return f(y); });
	}; };
	/**
	 * Runs each validator in sequence, and throws on the first occurence of invalid data.
	 * Validators are passed as arguments and executed in given order.
	 * You might want place `validate()` in promise chains before operations that require valid inputs,
	 * taking advantage of built-in promise branching.
	 *
	 * @example
	 *
	 * ```js
	 * try {
	 *   validate([
	 *     value, // Given value
	 *     isTrytes, // Validator function
	 *     'Invalid trytes' // Error message
	 *   ])
	 * } catch (err) {
	 *   console.log(err.message) // 'Invalid trytes'
	 * }
	 * ```
	 *
	 * @method validate
	 *
	 * @throws {Error} error
	 * @return {boolean}
	 */
	exports.validate = function () {
	    var validators = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        validators[_i] = arguments[_i];
	    }
	    validators.forEach(function (validator) {
	        if (Array.isArray(validator)) {
	            var value = validator[0], isValid = validator[1], msg = validator[2];
	            if (!isValid(value)) {
	                throw new Error(msg + ": " + JSON.stringify(value, null, 1));
	            }
	        }
	    });
	    return true;
	};
	exports.arrayValidator = function (validator) { return function (arr, customMsg) {
	    var _a = validator(arr[0]), _ = _a[0], // tslint:disable-line no-unused-variable
	    isValid = _a[1], msg = _a[2];
	    return [
	        arr,
	        function (x) { return Array.isArray(x) && x.every(function (value) { return isValid(value); }); },
	        customMsg || msg,
	    ];
	}; };
	exports.depthValidator = function (depth) { return [
	    depth,
	    function (n) { return Number.isInteger(n) && n > 0; },
	    errors$6.INVALID_DEPTH,
	]; };
	exports.minWeightMagnitudeValidator = function (minWeightMagnitude) { return [
	    minWeightMagnitude,
	    Number.isInteger,
	    errors$6.INVALID_MIN_WEIGHT_MAGNITUDE,
	]; };
	exports.seedValidator = function (seed) { return [seed, exports.isTrytes, errors$6.INVALID_SEED]; };
	exports.securityLevelValidator = function (security) { return [
	    security,
	    exports.isSecurityLevel,
	    errors$6.INVALID_SECURITY_LEVEL,
	]; };
	exports.inputValidator = function (input) { return [input, exports.isInput, errors$6.INVALID_INPUT]; };
	exports.remainderAddressValidator = function (input) { return [input, exports.isHash, errors$6.INVALID_REMAINDER_ADDRESS]; };
	exports.tagValidator = function (tag) { return [tag, exports.isTag, errors$6.INVALID_TAG]; };
	exports.transferValidator = function (transfer) { return [transfer, exports.isTransfer, errors$6.INVALID_TRANSFER]; };
	exports.hashValidator = function (hash, errorMessage) { return [
	    hash,
	    exports.isHash,
	    errorMessage || errors$6.INVALID_HASH,
	]; };
	exports.trytesValidator = function (trytes, msg) { return [
	    trytes,
	    function (t) { return (length ? exports.isTrytesOfExactLength(t, length) : exports.isTrytes(t)); },
	    msg || errors$6.INVALID_TRYTES,
	]; };
	exports.uriValidator = function (uri) { return [uri, exports.isUri, errors$6.INVALID_URI]; };
	exports.integerValidator = function (integer, msg) { return [
	    integer,
	    Number.isInteger,
	    msg || errors$6.NOT_INT,
	]; };
	exports.indexValidator = function (index) { return [index, Number.isInteger, errors$6.INVALID_INDEX]; };
	exports.startOptionValidator = function (start) { return [
	    start,
	    function (s) { return Number.isInteger(s) && s >= 0; },
	    errors$6.INVALID_START_OPTION,
	]; };
	exports.startEndOptionsValidator = function (options) { return [
	    options,
	    exports.isStartEndOptions,
	    errors$6.INVALID_START_END_OPTIONS,
	]; };
	exports.getInputsThresholdValidator = function (threshold) { return [
	    threshold,
	    function (s) { return Number.isInteger(s) && s >= 0; },
	    errors$6.INVALID_THRESHOLD,
	]; };
	exports.stringify = function (value) {
	    return JSON.stringify(value, null, 1);
	};

	});

	unwrapExports(guards$2);
	var guards_1$2 = guards$2.isTrits;
	var guards_2$2 = guards$2.isNullTrits;
	var guards_3$2 = guards$2.isTrytes;
	var guards_4$2 = guards$2.isTrytesOfExactLength;
	var guards_5$2 = guards$2.isTrytesOfMaxLength;
	var guards_6$2 = guards$2.isEmpty;
	var guards_7$2 = guards$2.isNinesTrytes;
	var guards_8$2 = guards$2.isHash;
	var guards_9$2 = guards$2.isSecurityLevel;
	var guards_10$2 = guards$2.isInput;
	var guards_11$2 = guards$2.isTag;
	var guards_12$2 = guards$2.isTransfer;
	var guards_13$2 = guards$2.isUri;
	var guards_14$2 = guards$2.isStartEndOptions;
	var guards_15$2 = guards$2.isArray;
	var guards_16$2 = guards$2.validate;
	var guards_17$2 = guards$2.arrayValidator;
	var guards_18$2 = guards$2.depthValidator;
	var guards_19$2 = guards$2.minWeightMagnitudeValidator;
	var guards_20$2 = guards$2.seedValidator;
	var guards_21$2 = guards$2.securityLevelValidator;
	var guards_22$2 = guards$2.inputValidator;
	var guards_23$2 = guards$2.remainderAddressValidator;
	var guards_24$2 = guards$2.tagValidator;
	var guards_25$2 = guards$2.transferValidator;
	var guards_26$2 = guards$2.hashValidator;
	var guards_27$2 = guards$2.trytesValidator;
	var guards_28$2 = guards$2.uriValidator;
	var guards_29$2 = guards$2.integerValidator;
	var guards_30$2 = guards$2.indexValidator;
	var guards_31$2 = guards$2.startOptionValidator;
	var guards_32$2 = guards$2.startEndOptionsValidator;
	var guards_33$2 = guards$2.getInputsThresholdValidator;
	var guards_34$2 = guards$2.stringify;

	var src$6 = createCommonjsModule(function (module, exports) {
	/** @module checksum */
	exports.__esModule = true;




	exports.errors = {
	    INVALID_ADDRESS: errors$6.INVALID_ADDRESS,
	    INVALID_CHECKSUM: errors$6.INVALID_CHECKSUM,
	    INVALID_TRYTES: errors$6.INVALID_TRYTES,
	    INVALID_CHECKSUM_LENGTH: 'Invalid checksum length'
	};
	var HASH_TRYTES_LENGTH = 81;
	var ADDRESS_CHECKSUM_TRYTES_LENGTH = 9;
	var ADDRESS_WITH_CHECKSUM_TRYTES_LENGTH = HASH_TRYTES_LENGTH + ADDRESS_CHECKSUM_TRYTES_LENGTH;
	var MIN_CHECKSUM_TRYTES_LENGTH = 3;
	/**
	 * This method takes 81 trytes, which could be an address or a seed, generates the [checksum](https://docs.iota.org/docs/getting-started/0.1/clients/checksums) and appends it to the trytes.
	 *
	 * To generate a checksum that is less than 9 trytes long, make sure to set the `isAddress` argument to false.
	 *
	 * ## Related methods
	 *
	 * To generate an address, use the [`getNewAddress()`]{@link #module_core.getNewAddress} method.
	 *
	 * @method addChecksum
	 *
	 * @summary Generates a checksum and appends it to the given trytes.
	 *
	 * @memberof module:checksum
	 *
	 * @param {string} input - 81 trytes to which to append the checksum
	 *
	 * @param {number} [checksumLength=9] - Length of the checksum to generate
	 *
	 * @param {boolean} [isAddress=true] - Whether the input is an address
	 *
	 * @example
	 * ```js
	 * let addressWithChecksum = Checksum.addChecksum('ADDRESS...');
	 * ```
	 *
	 * @returns {string} The original trytes with an appended checksum.
	 *
	 * @throws {errors.INVALID_ADDRESS}: Make sure that the given address is 90 trytes long.
	 * @throws {errors.INVALID_TRYTES}: Make sure that the `input` argument contains only [trytes](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary)
	 * @throws {errors.INVALID_CHECKSUM_LENGTH}: Make sure that the `checksumLength` argument is a number greater than or equal to 3. If the `isAddress` argument is set to true, make sure that the `checksumLength` argument is 9.
	 */
	function addChecksum(input, checksumLength, isAddress) {
	    if (checksumLength === void 0) { checksumLength = ADDRESS_CHECKSUM_TRYTES_LENGTH; }
	    if (isAddress === void 0) { isAddress = true; }
	    if (!guards$2.isTrytes(input)) {
	        throw new Error(exports.errors.INVALID_TRYTES);
	    }
	    if (isAddress && input.length !== HASH_TRYTES_LENGTH) {
	        if (input.length === ADDRESS_WITH_CHECKSUM_TRYTES_LENGTH) {
	            return input;
	        }
	        throw new Error(exports.errors.INVALID_ADDRESS);
	    }
	    if (!Number.isInteger(checksumLength) ||
	        checksumLength < MIN_CHECKSUM_TRYTES_LENGTH ||
	        (isAddress && checksumLength !== ADDRESS_CHECKSUM_TRYTES_LENGTH)) {
	        throw new Error(exports.errors.INVALID_CHECKSUM_LENGTH);
	    }
	    var paddedInputTrytes = input;
	    while (paddedInputTrytes.length % HASH_TRYTES_LENGTH !== 0) {
	        paddedInputTrytes += '9';
	    }
	    var inputTrits = src.trits(paddedInputTrytes);
	    var checksumTrits = new Int8Array(src$2["default"].HASH_LENGTH);
	    var kerl = new src$2["default"]();
	    kerl.initialize();
	    kerl.absorb(inputTrits, 0, inputTrits.length);
	    kerl.squeeze(checksumTrits, 0, src$2["default"].HASH_LENGTH);
	    return input.concat(src.trytes(checksumTrits.slice(243 - checksumLength * 3, 243)));
	}
	exports.addChecksum = addChecksum;
	/**
	 * This method takes an address of 90 trytes, and removes the last 9 trytes to return the address without a checksum.
	 *
	 * ## Related methods
	 *
	 * To generate an address, use the [`getNewAddress()`]{@link #module_core.getNewAddress} method.
	 * To add a checksum to an address, use the [`addChecksum()`]{@link #module_checksum.addChecksum} method.
	 *
	 * @method removeChecksum
	 *
	 * @summary Removes the checksum from the given address.
	 *
	 * @memberof module:checksum
	 *
	 * @param {string} input - Address from which to remove the checksum
	 *
	 * @example
	 * ```js
	 * let addressWithoutChecksum = Checksum.removeChecksum('ADDRESS...');
	 * ```
	 *
	 * @returns {string} The original address without the appended checksum.
	 *
	 * @throws {errors.INVALID_ADDRESS}: Make sure that the given address is 90 trytes long.
	 */
	function removeChecksum(input) {
	    if (!guards$2.isTrytes(input, HASH_TRYTES_LENGTH) && !guards$2.isTrytes(input, ADDRESS_WITH_CHECKSUM_TRYTES_LENGTH)) {
	        throw new Error(exports.errors.INVALID_ADDRESS);
	    }
	    return input.slice(0, HASH_TRYTES_LENGTH);
	}
	exports.removeChecksum = removeChecksum;
	/**
	 * This method takes an address of 90 trytes, and checks if the checksum is valid.
	 *
	 * ## Related methods
	 *
	 * To generate an address, use the [`getNewAddress()`]{@link #module_core.getNewAddress} method.
	 * To add a checksum to an address, use the [`addChecksum()`]{@link #module_checksum.addChecksum} method.
	 *
	 * @method isValidChecksum
	 *
	 * @summary Validates the checksum of an address.
	 *
	 * @memberof module:checksum
	 *
	 * @param {string} addressWithChecksum - Address with a checksum
	 *
	 * @example
	 * ```js
	 * let valid = Checksum.isValidChecksum('ADDRESS...');
	 * ```
	 *
	 * @returns {boolean} Whether the checksum is valid.
	 *
	 * @throws {errors.INVALID_ADDRESS}: Make sure that the given address is 90 trytes long.
	 */
	exports.isValidChecksum = function (addressWithChecksum) {
	    return addressWithChecksum === addChecksum(removeChecksum(addressWithChecksum));
	};

	});

	unwrapExports(src$6);
	var src_1$4 = src$6.errors;
	var src_2$4 = src$6.addChecksum;
	var src_3$3 = src$6.removeChecksum;
	var src_4$3 = src$6.isValidChecksum;

	var createFindTransactions = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	exports.__esModule = true;








	var keysOf = function (o) { return Object.keys(o); };
	var validKeys = ['bundles', 'addresses', 'tags', 'approvees'];
	var hasValidKeys = function (query) {
	    for (var _i = 0, _a = keysOf(query); _i < _a.length; _i++) {
	        var key = _a[_i];
	        if (validKeys.indexOf(key) === -1) {
	            throw new Error(errors$1.INVALID_SEARCH_KEY + ": " + key);
	        }
	    }
	};
	exports.validateFindTransactions = function (query) {
	    var addresses = query.addresses, approvees = query.approvees, bundles = query.bundles, tags = query.tags;
	    hasValidKeys(query);
	    guards.validate(!!addresses && [addresses, function (arr) { return arr.every(guards.isHash); }, errors$1.INVALID_ADDRESS], !!tags && [tags, function (arr) { return arr.every(guards.isTag); }, errors$1.INVALID_TAG], !!approvees && [
	        approvees,
	        function (arr) { return arr.every(function (a) { return guards.isTrytesOfExactLength(a, src$5.TRANSACTION_HASH_LENGTH / src.TRYTE_WIDTH); }); },
	        errors$1.INVALID_TRANSACTION_HASH,
	    ], !!bundles && [
	        bundles,
	        function (arr) { return arr.every(function (b) { return guards.isTrytesOfExactLength(b, src$5.BUNDLE_LENGTH / src.TRYTE_WIDTH); }); },
	        errors$1.INVALID_HASH,
	    ]);
	};
	exports.removeAddressChecksum = function (query) {
	    return query.addresses
	        ? __assign({}, query, { addresses: query.addresses.map(src$6.removeChecksum) }) : query;
	};
	exports.padTags = function (query) {
	    return query.tags
	        ? __assign({}, query, { tags: src$3.padTagArray(query.tags) }) : query;
	};
	/**
	 * @method createFindTransactions
	 *
	 * @summary Creates a new `findTransactions()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`findTransactions`]{@link #module_core.findTransactions}  - A new `findTransactions()` function that uses your chosen Provider instance.
	 */
	exports.createFindTransactions = function (_a) {
	    var send = _a.send;
	    /**
	     * This method searches for transaction hashes by calling the connected IRI node's [`findTransactions`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#findTransactions) endpoint.
	     *
	     * If you pass more than one query parameter, this method returns only transactions that contain all the given fields in those queries.
	     *
	     * ## Related methods
	     *
	     * To find transaction objects, use the [`findTransactionObjects()`]{@link #module_core.findTransactionObjects} method.
	     *
	     * @method findTransactions
	     *
	     * @summary * Searches the Tangle for the hashes of transactions that contain all the given values in their transaction fields.
	     *
	     * @memberof module:core
	     *
	     * @param {Object} query - Query object
	     * @param {Hash[]} [query.addresses] - Array of addresses to search for in transactions
	     * @param {Hash[]} [query.bundles] - Array of bundle hashes to search for in transactions
	     * @param {Tag[]} [query.tags] - Array of tags to search for in transactions
	     * @param {Hash[]} [query.approvees] - Array of transaction hashes that you want to search for in transactions' branch and trunk transaction fields
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     *
	     * ```js
	     * findTransactions({ addresses: ['ADDRESS999...'] })
	     *    .then(transactionHashes => {
	     *      console.log(`Successfully found the following transactions:)
	     *      console.log(JSON.stringify(transactionHashes));
	     *   })
	     *   .catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     *   })
	     * ```
	     *
	     * @returns {Promise}
	     *
	     * @fulfil {Hash[]} transactionHashes - Array of transaction hashes for transactions, which contain fields that match the query object
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_SEARCH_KEY`: Make sure that you entered valid query parameters
	     * - `INVALID_HASH`: Make sure that the bundle hashes are 81 trytes long
	     * - `INVALID_TRANSACTION_HASH`: Make sure that the approvee transaction hashes are 81 trytes long
	     * - `INVALID_ADDRESS`: Make sure that the addresses contain only trytes
	     * - `INVALID_TAG`: Make sure that the tags contain only trytes
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function findTransactions(query, callback) {
	        return bluebird.resolve(exports.validateFindTransactions(query))
	            .then(function () { return exports.removeAddressChecksum(query); })
	            .then(exports.padTags)
	            .then(function (formattedQuery) {
	            return send(__assign({}, formattedQuery, { command: types.IRICommand.FIND_TRANSACTIONS }));
	        })
	            .then(function (_a) {
	            var hashes = _a.hashes;
	            return hashes;
	        })
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createFindTransactions);
	var createFindTransactions_1 = createFindTransactions.validateFindTransactions;
	var createFindTransactions_2 = createFindTransactions.removeAddressChecksum;
	var createFindTransactions_3 = createFindTransactions.padTags;
	var createFindTransactions_4 = createFindTransactions.createFindTransactions;

	var createGetBalances = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	exports.__esModule = true;







	/**
	 * @method createGetBalances
	 *
	 * @summary Creates a new `getBalances()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`getBalances`]{@link #module_core.getBalances}  - A new `getBalances()` function that uses your chosen Provider instance.
	 */
	exports.createGetBalances = function (_a) {
	    var send = _a.send;
	    /**
	     * This method uses the connected IRI node's [`getBalances`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#getbalances) endpoint.
	     *
	     * Any pending output transactions are not included in the balance.
	     * For example, if a pending output transaction deposits 10 Mi into an address that contains 50 Mi, this method will return a balance of 50 Mi not 60 Mi.
	     *
	     * ## Related methods
	     *
	     * To find the balance of all addresses that belong to your seed, use the [`getAccountData()`]{@link #module_core.getAccountData} method.
	     *
	     * @method getBalances
	     *
	     * @summary Gets the confirmed balances of the given addresses.
	     *
	     * @memberof module:core
	     *
	     * @param {Hash[]} addresses - Array of addresses
	     * @param {Hash[]} [tips] - Array of past transaction hashes from which to calculate the balances of the addresses. The balance will be calculated from the latest milestone that references these transactions.
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     * ```js
	     * getBalances([address])
	     *   .then( balances => {
	     *     console.log(`Balance of the first address: `$balances.balances[0])
	     *     console.log(JSON.stringify(transactions));
	     *   })
	     *   .catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     * }
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {Balances} balances - Object that contains the following:
	     * - balances.addresses: Array of balances in the same order as the `addresses` argument
	     * - balances.references: Either the transaction hash of the latest milestone, or the transaction hashes that were passed to the `tips` argument
	     * - balances.milestoneIndex: The latest milestone index that confirmed the balance
	     * - balances.duration: The number of milliseconds that it took for the node to return a response
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_HASH`: Make sure that the addresses contain only trytes
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function (addresses, tips, callback) {
	        // If no tips are provided, switch arguments
	        if (tips && typeof tips === 'function') {
	            callback = tips;
	            tips = [];
	        }
	        return bluebird.resolve(guards.validate([addresses, function (arr) { return arr.every(guards.isHash); }, errors$1.INVALID_ADDRESS], !!tips && [
	            tips,
	            function (arr) { return arr.every(function (h) { return guards.isTrytesOfExactLength(h, src$5.TRANSACTION_HASH_LENGTH / src.TRYTE_WIDTH); }); },
	            errors$1.INVALID_TRANSACTION_HASH,
	        ]))
	            .then(function () {
	            return send(__assign({ command: types.IRICommand.GET_BALANCES, addresses: addresses.map(src$6.removeChecksum) }, (Array.isArray(tips) && tips.length && { tips: tips })));
	        })
	            .then(function (res) { return (__assign({}, res, { balances: res.balances.map(function (balance) { return parseInt(balance, 10); }) })); })
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createGetBalances);
	var createGetBalances_1 = createGetBalances.createGetBalances;

	var createGetInclusionStates = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;




	/**
	 * @method createGetInclusionStates
	 *
	 * @summary Creates a new `getInclusionStates()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`getInclusionStates`]{@link #module_core.getInclusionStates}  - A new `getInclusionStates()` function that uses your chosen Provider instance.
	 */
	exports.createGetInclusionStates = function (_a) {
	    var send = _a.send;
	    /**
	     * This method uses the connected IRI node's [`getInclusionStates`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#getinclusionstates) endpoint.
	     *
	     * If the given tip transactions reference a given transaction, the returned state is `true`.
	     *
	     * If the given tip transactions do not reference a given transaction, the returned state is `false`.
	     *
	     * @method getInclusionStates
	     *
	     * @summary Finds out if one or more given transactions are referenced by one or more other given transactions.
	     *
	     * @memberof module:core
	     *
	     * @param {Hash[]} transactions - Array of transaction hashes to check
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     * ```js
	     * getInclusionStates(transactions)
	     *   .then(states => {
	     *      for(let i = 0; i < states.length; i++){
	     *          states? console.log(`Transaction ${i} is referenced by the given transactions`) :
	     *          console.log(`Transaction ${i} is not referenced by the given transactions`);
	     *      }
	     *   })
	     *   .catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     *   });
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {boolean[]} states - Array of inclusion states, where `true` means that the transaction is referenced by the given transacions and `false` means that it's not.
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_TRANSACTION_HASH`: Make sure that the transaction hashes are 81 trytes long
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function (transactions, callback) {
	        return bluebird.resolve(guards.validate(guards.arrayValidator(guards.hashValidator)(transactions, errors$1.INVALID_TRANSACTION_HASH)))
	            .then(function () {
	            return send({
	                command: types.IRICommand.GET_INCLUSION_STATES,
	                transactions: transactions
	            });
	        })
	            .then(function (_a) {
	            var states = _a.states;
	            return states;
	        })
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createGetInclusionStates);
	var createGetInclusionStates_1 = createGetInclusionStates.createGetInclusionStates;

	var createGetNeighbors = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;

	/**
	 * @method createGetNeighbors
	 *
	 * @summary Creates a new `getNeighbors()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`getNeighbors`]{@link #module_core.getNeighbors}  - A new `getNeighbors()` function that uses your chosen Provider instance.
	 */
	exports.createGetNeighbors = function (_a) {
	    var send = _a.send;
	    /**
	     * This method uses the connected IRI node's [`getNeighbors`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#getneighbors) endpoint to find information about the neighbors' activity.
	     *
	     * All statistics are aggregated until the node restarts.
	     *
	     * ## Related methods
	     *
	     * To add neighbors to the node, use the [`addNeighbors()`]{@link #module_core.addNeighbors} method.
	     *
	     * @method getNeighbors
	     *
	     * @summary Gets information and statistics about the connected IRI node's neighbors.
	     *
	     * @memberof module:core
	     *
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     *
	     * ```js
	     * getNeighbors()
	     * .then(neighbors => {
	     *     console.log(`Node is connected to the following neighbors: \n`)
	     *     console.log(JSON.stringify(neighbors));
	     * })
	     * .catch(error => {
	     *     console.log(`Something went wrong: ${error}`);
	     * });
	     *```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {Neighbors} neighbors - Array that contains the following:
	     * - neighbors.address: IP address of the neighbor
	     * - neighbors.domain: Domain name of the neighbor
	     * - neighbors.numberOfAllTransactions: Number of transactions in the neighbors ledger (including invalid ones)
	     * - neighbors.numberOfRandomTransactionRequests: Number of random tip transactions that the neighbor has requested from the connected node
	     * - neighbors.numberOfNewTransactions: Number of new transactions that the neighbor has sent to the connected node
	     * - neighbors.numberOfInvalidTransactions: Number of invalid transactions that the neighbor sent to the connected node
	     * - neighbors.numberOfStaleTransactions: Number of transactions that the neighbor sent to the connected node, which contain a timestamp that's older than the connected node's latest snapshot
	     * - neighbors.numberOfSentTransactions: Number of transactions that the connected node has sent to the neighbor
	     * - neighbors.numberOfDroppedSentPackets: Number of network packets that the neighbor dropped because its queue was full
	     * - neighbors.connectionType: The transport protocol that the neighbor uses to sent packets to the connected node
	     * - neighbors.connected: Whether the neighbor is connected to the node
	     *
	     * @reject {Error} error - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function getNeighbors(callback) {
	        return send({
	            command: types.IRICommand.GET_NEIGHBORS
	        })
	            .then(function (_a) {
	            var neighbors = _a.neighbors;
	            return neighbors;
	        })
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createGetNeighbors);
	var createGetNeighbors_1 = createGetNeighbors.createGetNeighbors;

	var createGetNodeInfo = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;

	/**
	 * @method createGetNodeInfo
	 *
	 * @summary Creates a new `getNodeInfo()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`getNodeInfo`]{@link #module_core.getNodeInfo}  - A new `getNodeInfo()` function that uses your chosen Provider instance.
	 */
	exports.createGetNodeInfo = function (_a) {
	    var send = _a.send;
	    /**
	     * This method uses the connected IRI node's
	     * [`getNodeInfo`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#getnodeinfo) endpoint.
	     *
	     * ## Related methods
	     *
	     * To get statistics about the connected node's neighbors, use the [`getNeighbors()`]{@link #module_core.getNeighbors} method.
	     *
	     * @method getNodeInfo
	     *
	     * @summary Gets information about the connected IRI node.
	     *
	     * @memberof module:core
	     *
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     * ```js
	     * getNodeInfo()
	     *   .then(info => console.log(JSON.stringify(info)))
	     *   .catch(error => {
	     *     console.log(`Something went wrong: ${error}`);
	     *   })
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {NodeInfo} info - Object that contains the following information:
	     * info.appName: Name of the IRI network
	     * info.appVersion: Version of the [IRI node software](https://docs.iota.org/docs/node-software/0.1/iri/introduction/overview)
	     * info.jreAvailableProcessors: Available CPU cores on the node
	     * info.jreFreeMemory: Amount of free memory in the Java virtual machine
	     * info.jreMaxMemory: Maximum amount of memory that the Java virtual machine can use
	     * info.jreTotalMemory: Total amount of memory in the Java virtual machine
	     * info.jreVersion: The version of the Java runtime environment
	     * info.latestMilestone: Transaction hash of the latest [milestone](https://docs.iota.org/docs/getting-started/0.1/network/the-coordinator)
	     * info.latestMilestoneIndex: Index of the latest milestone
	     * info.latestSolidSubtangleMilestone: Transaction hash of the node's latest solid milestone
	     * info.latestSolidSubtangleMilestoneIndex: Index of the node's latest solid milestone
	     * info.milestoneStartIndex: Start milestone for the current version of the IRI node software
	     * info.lastSnapshottedMilestoneIndex: Index of the last milestone that triggered a [local snapshot](https://docs.iota.org/docs/getting-started/0.1/network/nodes#local-snapshots) on the node
	     * info.neighbors: Total number of connected neighbors
	     * info.packetsQueueSize: Size of the node's packet queue
	     * info.time: Unix timestamp
	     * info.tips: Number of tips transactions
	     * info.transactionsToRequest: Total number of transactions that the node is missing in its ledger
	     * info.features: Enabled configuration options on the node
	     * info.coordinatorAddress: Address (Merkle root) of the [Coordinator](https://docs.iota.org/docs/getting-started/0.1/network/the-coordinator)
	     * info.duration: Number of milliseconds it took to complete the request
	     *
	     * @reject {Error} error - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function getNodeInfo(callback) {
	        return send({
	            command: types.IRICommand.GET_NODE_INFO
	        }).asCallback(callback);
	    };
	};

	});

	unwrapExports(createGetNodeInfo);
	var createGetNodeInfo_1 = createGetNodeInfo.createGetNodeInfo;

	var createGetTransactionsToApprove = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;






	/**
	 * @method createGetTransactionsToApprove
	 *
	 * @summary Creates a new `getTransactionsToApprove()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`getTransactionsToApprove`]{@link #module_core.getTransactionsToApprove}  - A new `getTransactionsToApprove()` function that uses your chosen Provider instance.
	 */
	exports.createGetTransactionsToApprove = function (_a) {
	    var send = _a.send;
	    /**
	     * This method gets two [consistent]{@link #module_core.checkConsistency} tip transaction hashes that can be used as branch and trunk transactions by calling the connected IRI node's [`getTransactionsToApprove`](https://docs.iota.works/iri/api#endpoints/getTransactionsToApprove) endpoint.
	     *
	     * To make sure that the tip transactions also directly or indirectly reference another transaction, add that transaction's hash to the `reference` argument.
	     *
	     * ## Related methods
	     *
	     * You can use the returned transaction hashes to do proof of work on transaction trytes, using the [`attachToTangle()`]{@link #module_core.attachToTangle} method.
	     *
	     * @method getTransactionsToApprove
	     *
	     * @summary Gets two tip transaction hashes that can be used as branch and trunk transactions.
	     *
	     * @memberof module:core
	     *
	     * @param {number} depth - The [depth](https://docs.iota.org/docs/getting-started/0.1/transactions/depth) at which to start the weighted random walk. The [Trinity wallet](https://trinity.iota.org/) uses a value of `3`,
	     * meaning that the weighted random walk starts 3 milestones in the past.
	     * @param {Hash} [reference] - Optional transaction hash that you want the tip transactions to reference
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     *
	     * ```js
	     * getTransactionsToApprove(3)
	     *   .then(transactionsToApprove) => {
	     *      console.log(Found the following transaction hashes that you can reference in a new bundle:);
	     *      console.log(JSON.stringify(transactionsToApprove));
	     *   })
	     *   .catch(error => {
	     *     console.log(`Something went wrong: ${error}`);
	     *   })
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {Object} transactionsToApprove - An object that contains the following:
	     * - trunkTransaction: Transaction hash
	     * - branchTransaction: Transaction hash
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_DEPTH`: Make sure that the `depth` argument is greater than zero
	     * - `INVALID_REFERENCE_HASH`: Make sure that the reference transaction hash is 81 trytes long
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function getTransactionsToApprove(depth, reference, callback) {
	        return bluebird.resolve(guards.validate([depth, function (n) { return Number.isInteger(n) && n > 0; }, errors$1.INVALID_DEPTH], !!reference && [
	            reference,
	            function (t) { return guards.isTrytesOfExactLength(reference, src$5.TRANSACTION_HASH_LENGTH / src.TRYTE_WIDTH); },
	            errors$1.INVALID_REFERENCE_HASH,
	        ]))
	            .then(function () {
	            return send({
	                command: types.IRICommand.GET_TRANSACTIONS_TO_APPROVE,
	                depth: depth,
	                reference: reference
	            });
	        })
	            .then(function (_a) {
	            var trunkTransaction = _a.trunkTransaction, branchTransaction = _a.branchTransaction;
	            return ({
	                trunkTransaction: trunkTransaction,
	                branchTransaction: branchTransaction
	            });
	        })
	            .asCallback(typeof arguments[1] === 'function' ? arguments[1] : callback);
	    };
	};

	});

	unwrapExports(createGetTransactionsToApprove);
	var createGetTransactionsToApprove_1 = createGetTransactionsToApprove.createGetTransactionsToApprove;

	var createGetTrytes = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;






	/**
	 * @method createGetTrytes
	 *
	 * @summary Creates a new `getTrytes()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`getTrytes`]{@link #module_core.getTrytes}  - A new `getTrytes()` function that uses your chosen Provider instance.
	 */
	exports.createGetTrytes = function (_a) {
	    var send = _a.send;
	    /**
	     * This method uses the connected IRI node's
	     * [`getTrytes`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#gettrytes) endpoint.
	     *
	     * The transaction trytes include all transaction fields except the transaction hash.
	     *
	     * **Note:** If the connected IRI node doesn't have the given transaction in its ledger, the value at the index of that transaction hash is either `null` or a string of `9`s.
	     *
	     * ## Related methods
	     *
	     * To get transaction objects instead of trytes, use the [`getTransactionObjects()`]{@link #module_core.getTransactionObjects} method.
	     *
	     * @method getTrytes
	     *
	     * @summary Gets the transaction trytes for the given transaction hashes.
	     *
	     * @memberof module:core
	     *
	     * @param {Array<Hash>} hashes - Array of transaction hashes
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     * ```js
	     * getTrytes(hashes)
	     *   .then(trytes => {
	     *   .then(transactionTrytes => {
	     *     console.log(Found the following transaction trytes:);
	     *     console.log(JSON.stringify(transactionTrytes));
	     *   })
	     *   .catch(error => {
	     *     console.log(`Something went wrong: ${error}`);
	     *   });
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {Trytes[]} transactionTrytes - Array of transaction trytes
	     *
	     * @reject Error{} error - An error that contains one of the following:
	     * - `INVALID_TRANSACTION_HASH`: Make sure that the transaction hashes are 81 trytes long
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function getTrytes(hashes, callback) {
	        return bluebird.resolve(guards.validate([
	            hashes,
	            function (arr) { return arr.every(function (h) { return guards.isTrytesOfExactLength(h, src$5.TRANSACTION_HASH_LENGTH / src.TRYTE_WIDTH); }); },
	            errors$1.INVALID_TRANSACTION_HASH,
	        ]))
	            .then(function () {
	            return send({
	                command: types.IRICommand.GET_TRYTES,
	                hashes: hashes
	            });
	        })
	            .then(function (_a) {
	            var trytes = _a.trytes;
	            return trytes;
	        })
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createGetTrytes);
	var createGetTrytes_1 = createGetTrytes.createGetTrytes;

	var createInterruptAttachingToTangle = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;

	exports.createInterruptAttachingToTangle = function (_a) {
	    var send = _a.send;
	    return function (callback) {
	        return send({
	            command: types.IRICommand.INTERRUPT_ATTACHING_TO_TANGLE
	        }).asCallback(callback);
	    };
	};

	});

	unwrapExports(createInterruptAttachingToTangle);
	var createInterruptAttachingToTangle_1 = createInterruptAttachingToTangle.createInterruptAttachingToTangle;

	var createRemoveNeighbors = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;



	/**
	 * @method createRemoveNeighbors
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - Network provider
	 *
	 * @return {function} {@link #module_core.removeNeighbors `removeNeighbors`}
	 */
	exports.createRemoveNeighbors = function (_a) {
	    var send = _a.send;
	    /**
	     * This method removes a list of neighbors from the connected IRI node by calling its
	     * [`removeNeighbors`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#removeneighbors) endpoint.
	     *
	     * These neighbors are re-added when the node is restarted.
	     *
	     * ## Related methods
	     *
	     * To see statistics about the connected IRI node's neighbors, use the [`getNeighbors()`]{@link #module_core.getNeighbors} method.
	     *
	     * @method removeNeighbors
	     *
	     * @summary Removes a list of neighbors from the connected IRI node.
	     *
	     * @memberof module:core
	     *
	     * @param {Array} uris - Array of neighbor URIs that you want to add to the node
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     *
	     * ```js
	     * iota.addNeighbors(['tcp://148.148.148.148:15600'])
	     *   .then(numberOfNeighbors => {
	     *     console.log(`Successfully removed ${numberOfNeighbors} neighbors`)
	     *   }).catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     *   })
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {number} numberOfNeighbors - Number of neighbors that were removed
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_URI`: Make sure that the URI is valid (for example URIs must start with `udp://` or `tcp://`)
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function (uris, callback) {
	        return bluebird.resolve(guards.validate(guards.arrayValidator(guards.uriValidator)(uris)))
	            .then(function () {
	            return send({
	                command: types.IRICommand.REMOVE_NEIGHBORS,
	                uris: uris
	            });
	        })
	            .then(function (res) { return res.removedNeighbors; })
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createRemoveNeighbors);
	var createRemoveNeighbors_1 = createRemoveNeighbors.createRemoveNeighbors;

	var createStoreTransactions = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;






	/**
	 * @method createStoreTransactions
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - Network provider
	 *
	 * @return {function} {@link #module_core.storeTransactions `storeTransactions`}
	 */
	exports.createStoreTransactions = function (_a) {
	    var send = _a.send;
	    /**
	     * This method uses the connected IRI node's
	     * [`storeTransactions`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#storeTransactions) endpoint to store the given transaction trytes.
	     *
	     * **Note:** Before calling this method, we recommend saving your transaction trytes in local storage.
	     * By doing so, you make sure that you can always reattach your transactions to the Tangle in case they remain in a pending state.
	     *
	     * ## Related methods
	     *
	     * The given transaction trytes must be in a valid bundle and must include a proof of work.
	     *
	     * To create a valid bundle, use the `prepareTransfers()` method. For more information about what makes a bundles and transactions valid, see [this guide](https://docs.iota.org/docs/node-software/0.1/iri/concepts/transaction-validation).
	     *
	     * To do proof of work, use one of the following methods:
	     *
	     * - [`attachToTangle()`]{@link #module_core.attachToTangle}
	     * - [`sendTrytes()`]{@link #module_core.sendTrytes}
	     *
	     * @method storeAndBroadcast
	     *
	     * @summary Stores the given transaction trytes on the connected IRI node.
	     *
	     * @memberof module:core
	     *
	     * @param {Trytes[]} trytes - Array of transaction trytes
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     * ```js
	     * storeTransactions(trytes)
	     * .then(transactionTrytes => {
	     *     console.log(`Successfully stored transactions on the node`);
	     *     console.log(JSON.stringify(transactionTrytes));
	     * }).catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     * })
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fullfil {Trytes[]} transactionTrytes - Attached transaction trytes
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_TRANSACTION_TRYTES`: Make sure the trytes can be converted to a valid transaction object
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function (trytes, callback) {
	        return bluebird.resolve(guards.validate([
	            trytes,
	            function (arr) {
	                return arr.every(function (t) {
	                    return guards.isTrytesOfExactLength(t, src$5.TRANSACTION_LENGTH / src.TRYTE_WIDTH) && src$5.isAttached(src.trytesToTrits(t));
	                });
	            },
	            errors$1.INVALID_ATTACHED_TRYTES,
	        ]))
	            .then(function () {
	            return send({
	                command: types.IRICommand.STORE_TRANSACTIONS,
	                trytes: trytes
	            });
	        })
	            .then(function () { return trytes; })
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createStoreTransactions);
	var createStoreTransactions_1 = createStoreTransactions.createStoreTransactions;

	var createWereAddressesSpentFrom = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;





	exports.createWereAddressesSpentFrom = function (_a, caller) {
	    var send = _a.send;
	    return function (addresses, callback) {
	        if (caller !== 'lib') {
	            /* tslint:disable-next-line:no-console */
	            console.warn('Avoid using `wereAddressesSpentFrom()`. Instead, use the account module to keep track of spent addresses.\n' +
	                '`wereAddressesSpentFrom()` will be removed from the library in a future version.');
	        }
	        return bluebird.resolve(guards.validate(guards.arrayValidator(guards.hashValidator)(addresses, errors$1.INVALID_ADDRESS)))
	            .then(function () {
	            return send({
	                command: types.IRICommand.WERE_ADDRESSES_SPENT_FROM,
	                addresses: addresses.map(src$6.removeChecksum)
	            });
	        })
	            .then(function (res) { return res.states; })
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createWereAddressesSpentFrom);
	var createWereAddressesSpentFrom_1 = createWereAddressesSpentFrom.createWereAddressesSpentFrom;

	var errors$7 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.ILLEGAL_LENGTH = 'Illegal trits length';
	exports.ILLEGAL_SUBSEED_INDEX = 'Illegal subseed length';
	exports.ILLEGAL_SUBSEED_LENGTH = 'Illegal subseed length';
	exports.ILLEGAL_NUMBER_OF_FRAGMENTS = 'Illegal number of fragments';
	exports.ILLEGAL_KEY_LENGTH = 'Illegal key length';
	exports.ILLEGAL_DIGESTS_LENGTH = 'Illegal digests length';
	exports.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH = 'Illegal normalized fragment length';
	exports.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH = 'Illegal signature fragment length';
	exports.ILLEGAL_BUNDLE_HASH_LENGTH = 'Illegal bundle hash length';
	exports.ILLEGAL_KEY_FRAGMENT_LENGTH = 'Illegal key fragment length';
	exports.ILLEGAL_TRIT_CONVERSION_INPUT = 'Illegal conversion input. Expected trits as Int8Array.';
	exports.ILLEGAL_TRYTE_CONVERSION_INPUT = 'Illegal conversion input. Expected trytes string or integer.';
	exports.ILLEGAL_MIN_WEIGHT_MAGNITUDE = 'Illegal minWeightMagnitude value.';
	exports.ILLEGAL_ADDRESS_LAST_TRIT = 'Illegal address. Last trit must be 0.';
	exports.ILLEGAL_ADDRESS_LENGTH = 'Illegal address length.';
	exports.ILLEGAL_BUNDLE_LENGTH = 'Illegal bundle hash length.';
	exports.ILLEGAL_OBSOLETE_TAG_LENGTH = 'Illegal obsoleteTag length.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE = 'Illegal signature or message.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH = 'Illegal signatureOrMessage length.';
	exports.ILLEGAL_TAG_LENGTH = 'Illegal tag length.';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP = 'Illegal issuance timestamp';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH = 'Illegal issuanceTimestamp length.';
	exports.ILLEGAL_VALUE_LENGTH = 'Illegal value length.';
	exports.ILLEGAL_TRANSACTION_FIELD_OFFSET = 'Illegal transaction field offset.';
	exports.ILLEGAL_TRANSACTION_FIELD_LENGTH = 'Illegal transaction field length.';
	exports.ILLEGAL_LENGTH_OR_OFFSET = 'Illegal length or offset.';
	exports.ILLEGAL_TRANSACTION_BUFFER = 'Illegal transaction buffer. Expected `Int8Array`.';
	exports.ILLEGAL_TRANSACTION_BUFFER_LENGTH = 'Illegal transaction buffer length.';
	exports.ILLEGAL_TRANSACTION_OFFSET = 'Illegal transaction offset.';
	exports.ILLEGAL_TRANSACTION_LENGTH = 'Illegal transaction length.';
	exports.ILLEGAL_TRANSACTION_ORDER = 'Illegal transaction order.';
	exports.ILLEGAL_TRANSACTION_INDEX = 'Illegal transaction index.';
	exports.ILLEGAL_SEED_LENGTH = 'Illegal seed length. Expected length of 243 trits.';
	exports.ILLEGAL_KEY_INDEX = 'Illegal key index.';
	exports.ILLEGAL_CDA_LENGTH = 'Illegal cda length.';
	exports.ILLEGAL_BATCH = 'Illegal batch.';
	exports.CDA_ALREADY_IN_STORE = 'CDA is already in store.';
	exports.ILLEGAL_PERSISTENCE_ID = 'Illegal persistence id.';
	exports.ILLEGAL_PERSISTENCE_PATH = 'Illegal persistence path.';
	exports.ILLEGAL_PADDING_LENGTH = 'Illegal padding length. Input value length exceeds padding length.';
	exports.INCONSISTENT_SUBTANGLE = 'Inconsistent subtangle';
	exports.INSUFFICIENT_BALANCE = 'Insufficient balance';
	exports.INVALID_ADDRESS = 'Invalid address';
	exports.INVALID_REMAINDER_ADDRESS = 'Invalid remainder address';
	exports.INVALID_BRANCH_TRANSACTION = 'Invalid branch transaction';
	exports.INVALID_BUNDLE = 'Invalid bundle';
	exports.INVALID_BUNDLE_HASH = 'Invalid bundle hash';
	exports.INVALID_CHECKSUM = 'Invalid checksum';
	exports.INVALID_COMMAND = 'Invalid command format';
	exports.INVALID_DEPTH = 'Invalid depth';
	exports.INVALID_HASH = 'Invalid hash';
	exports.INVALID_INDEX = 'Invalid index option';
	exports.INVALID_TOTAL_OPTION = 'Invalid total option';
	exports.INVALID_INPUT = 'Invalid input';
	exports.INVALID_KEY = 'Invalid key value';
	exports.INVALID_MIN_WEIGHT_MAGNITUDE = 'Invalid Min Weight Magnitude';
	exports.INVALID_SEARCH_KEY = 'Invalid search key';
	exports.INVALID_SECURITY_LEVEL = 'Invalid security option';
	exports.INVALID_SECURITY_OPTION = 'Invalid security option';
	exports.INVALID_SEED = 'Invalid seed';
	exports.INVALID_START_END_OPTIONS = 'Invalid end option';
	exports.INVALID_START_OPTION = 'Invalid start option';
	exports.INVALID_TAG = 'Invalid tag';
	exports.INVALID_TRANSACTION = 'Invalid transaction';
	exports.INVALID_TRANSACTION_TRYTES = 'Invalid transaction trytes';
	exports.INVALID_ATTACHED_TRYTES = 'Invalid attached trytes';
	exports.INVALID_TRANSACTION_HASH = 'Invalid transaction hash';
	exports.INVALID_TAIL_TRANSACTION = 'Invalid tail transaction';
	exports.INVALID_THRESHOLD = 'Invalid threshold option';
	exports.INVALID_TRANSFER = 'Invalid transfer array';
	exports.INVALID_TRUNK_TRANSACTION = 'Invalid trunk transaction';
	exports.INVALID_REFERENCE_HASH = 'Invalid reference hash';
	exports.INVALID_TRYTES = 'Invalid trytes';
	exports.INVALID_URI = 'Invalid uri';
	exports.INVALID_ASCII_INPUT = 'Conversion to trytes requires type of input to be encoded in ascii.';
	exports.INVALID_ODD_LENGTH = 'Conversion from trytes requires length of trytes to be even.';
	exports.INVALID_TRYTE_ENCODED_JSON = 'Invalid tryte encoded JSON message';
	exports.NOT_INT = 'One of the inputs is not integer';
	exports.SENDING_BACK_TO_INPUTS = 'One of the transaction inputs is used as output.';
	exports.INVALID_TRANSACTIONS_TO_APPROVE = 'Invalid transactions to approve.';
	exports.NO_INPUTS = 'Could not find any available inputs.';
	exports.invalidChecksum = function (address) { return "Invalid Checksum: " + address; };
	exports.inconsistentTransaction = function (reason) { return "Transaction is inconsistent. Reason: " + reason; };
	exports.INVALID_DELAY = 'Invalid delay.';

	});

	unwrapExports(errors$7);
	var errors_1$7 = errors$7.ILLEGAL_LENGTH;
	var errors_2$7 = errors$7.ILLEGAL_SUBSEED_INDEX;
	var errors_3$6 = errors$7.ILLEGAL_SUBSEED_LENGTH;
	var errors_4$6 = errors$7.ILLEGAL_NUMBER_OF_FRAGMENTS;
	var errors_5$5 = errors$7.ILLEGAL_KEY_LENGTH;
	var errors_6$5 = errors$7.ILLEGAL_DIGESTS_LENGTH;
	var errors_7$5 = errors$7.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH;
	var errors_8$5 = errors$7.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH;
	var errors_9$5 = errors$7.ILLEGAL_BUNDLE_HASH_LENGTH;
	var errors_10$5 = errors$7.ILLEGAL_KEY_FRAGMENT_LENGTH;
	var errors_11$5 = errors$7.ILLEGAL_TRIT_CONVERSION_INPUT;
	var errors_12$5 = errors$7.ILLEGAL_TRYTE_CONVERSION_INPUT;
	var errors_13$5 = errors$7.ILLEGAL_MIN_WEIGHT_MAGNITUDE;
	var errors_14$5 = errors$7.ILLEGAL_ADDRESS_LAST_TRIT;
	var errors_15$5 = errors$7.ILLEGAL_ADDRESS_LENGTH;
	var errors_16$5 = errors$7.ILLEGAL_BUNDLE_LENGTH;
	var errors_17$5 = errors$7.ILLEGAL_OBSOLETE_TAG_LENGTH;
	var errors_18$5 = errors$7.ILLEGAL_SIGNATURE_OR_MESSAGE;
	var errors_19$5 = errors$7.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH;
	var errors_20$5 = errors$7.ILLEGAL_TAG_LENGTH;
	var errors_21$5 = errors$7.ILLEGAL_ISSUANCE_TIMESTAMP;
	var errors_22$5 = errors$7.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH;
	var errors_23$5 = errors$7.ILLEGAL_VALUE_LENGTH;
	var errors_24$5 = errors$7.ILLEGAL_TRANSACTION_FIELD_OFFSET;
	var errors_25$5 = errors$7.ILLEGAL_TRANSACTION_FIELD_LENGTH;
	var errors_26$5 = errors$7.ILLEGAL_LENGTH_OR_OFFSET;
	var errors_27$5 = errors$7.ILLEGAL_TRANSACTION_BUFFER;
	var errors_28$5 = errors$7.ILLEGAL_TRANSACTION_BUFFER_LENGTH;
	var errors_29$5 = errors$7.ILLEGAL_TRANSACTION_OFFSET;
	var errors_30$5 = errors$7.ILLEGAL_TRANSACTION_LENGTH;
	var errors_31$5 = errors$7.ILLEGAL_TRANSACTION_ORDER;
	var errors_32$5 = errors$7.ILLEGAL_TRANSACTION_INDEX;
	var errors_33$5 = errors$7.ILLEGAL_SEED_LENGTH;
	var errors_34$5 = errors$7.ILLEGAL_KEY_INDEX;
	var errors_35$5 = errors$7.ILLEGAL_CDA_LENGTH;
	var errors_36$5 = errors$7.ILLEGAL_BATCH;
	var errors_37$5 = errors$7.CDA_ALREADY_IN_STORE;
	var errors_38$5 = errors$7.ILLEGAL_PERSISTENCE_ID;
	var errors_39$5 = errors$7.ILLEGAL_PERSISTENCE_PATH;
	var errors_40$5 = errors$7.ILLEGAL_PADDING_LENGTH;
	var errors_41$5 = errors$7.INCONSISTENT_SUBTANGLE;
	var errors_42$5 = errors$7.INSUFFICIENT_BALANCE;
	var errors_43$5 = errors$7.INVALID_ADDRESS;
	var errors_44$5 = errors$7.INVALID_REMAINDER_ADDRESS;
	var errors_45$5 = errors$7.INVALID_BRANCH_TRANSACTION;
	var errors_46$5 = errors$7.INVALID_BUNDLE;
	var errors_47$5 = errors$7.INVALID_BUNDLE_HASH;
	var errors_48$5 = errors$7.INVALID_CHECKSUM;
	var errors_49$5 = errors$7.INVALID_COMMAND;
	var errors_50$5 = errors$7.INVALID_DEPTH;
	var errors_51$5 = errors$7.INVALID_HASH;
	var errors_52$5 = errors$7.INVALID_INDEX;
	var errors_53$5 = errors$7.INVALID_TOTAL_OPTION;
	var errors_54$5 = errors$7.INVALID_INPUT;
	var errors_55$5 = errors$7.INVALID_KEY;
	var errors_56$5 = errors$7.INVALID_MIN_WEIGHT_MAGNITUDE;
	var errors_57$5 = errors$7.INVALID_SEARCH_KEY;
	var errors_58$5 = errors$7.INVALID_SECURITY_LEVEL;
	var errors_59$5 = errors$7.INVALID_SECURITY_OPTION;
	var errors_60$5 = errors$7.INVALID_SEED;
	var errors_61$5 = errors$7.INVALID_START_END_OPTIONS;
	var errors_62$5 = errors$7.INVALID_START_OPTION;
	var errors_63$5 = errors$7.INVALID_TAG;
	var errors_64$5 = errors$7.INVALID_TRANSACTION;
	var errors_65$5 = errors$7.INVALID_TRANSACTION_TRYTES;
	var errors_66$5 = errors$7.INVALID_ATTACHED_TRYTES;
	var errors_67$5 = errors$7.INVALID_TRANSACTION_HASH;
	var errors_68$5 = errors$7.INVALID_TAIL_TRANSACTION;
	var errors_69$5 = errors$7.INVALID_THRESHOLD;
	var errors_70$5 = errors$7.INVALID_TRANSFER;
	var errors_71$5 = errors$7.INVALID_TRUNK_TRANSACTION;
	var errors_72$5 = errors$7.INVALID_REFERENCE_HASH;
	var errors_73$5 = errors$7.INVALID_TRYTES;
	var errors_74$5 = errors$7.INVALID_URI;
	var errors_75$5 = errors$7.INVALID_ASCII_INPUT;
	var errors_76$5 = errors$7.INVALID_ODD_LENGTH;
	var errors_77$5 = errors$7.INVALID_TRYTE_ENCODED_JSON;
	var errors_78$5 = errors$7.NOT_INT;
	var errors_79$5 = errors$7.SENDING_BACK_TO_INPUTS;
	var errors_80$5 = errors$7.INVALID_TRANSACTIONS_TO_APPROVE;
	var errors_81$5 = errors$7.NO_INPUTS;
	var errors_82$5 = errors$7.invalidChecksum;
	var errors_83$5 = errors$7.inconsistentTransaction;
	var errors_84$5 = errors$7.INVALID_DELAY;

	var constants$3 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.HASH_TRYTE_SIZE = 81;
	exports.TAG_TRYTE_SIZE = 27;
	exports.SIGNATURE_MESSAGE_FRAGMENT_TRYTE_SIZE = 2187;
	exports.TRANSACTION_TRYTE_SIZE = 2673;
	exports.MAX_INDEX_DIFF = 1000;
	exports.NULL_HASH_TRYTES = '9'.repeat(exports.HASH_TRYTE_SIZE);
	exports.NULL_TAG_TRYTES = '9'.repeat(exports.TAG_TRYTE_SIZE);
	exports.NULL_SIGNATURE_MESSAGE_FRAGMENT_TRYTES = '9'.repeat(exports.SIGNATURE_MESSAGE_FRAGMENT_TRYTE_SIZE);
	exports.NULL_TRANSACTION_TRYTES = '9'.repeat(exports.TRANSACTION_TRYTE_SIZE);

	});

	unwrapExports(constants$3);
	var constants_1$3 = constants$3.HASH_TRYTE_SIZE;
	var constants_2$3 = constants$3.TAG_TRYTE_SIZE;
	var constants_3$3 = constants$3.SIGNATURE_MESSAGE_FRAGMENT_TRYTE_SIZE;
	var constants_4$3 = constants$3.TRANSACTION_TRYTE_SIZE;
	var constants_5$3 = constants$3.MAX_INDEX_DIFF;
	var constants_6$3 = constants$3.NULL_HASH_TRYTES;
	var constants_7$3 = constants$3.NULL_TAG_TRYTES;
	var constants_8$3 = constants$3.NULL_SIGNATURE_MESSAGE_FRAGMENT_TRYTES;
	var constants_9$3 = constants$3.NULL_TRANSACTION_TRYTES;

	var guards$3 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;


	// Required for markdown generation with JSDoc
	/**
	 * @module validators
	 */
	/* Type guards */
	/**
	 * Checks if input is an `Int8Array` of trit values; `-1, 0, 1`.
	 *
	 * @method isTrits
	 *
	 * @param {any} input
	 *
	 * @return {boolean}
	 */
	exports.isTrits = function (input) {
	    if (input instanceof Int8Array) {
	        for (var i = 0; i < input.length; i++) {
	            if (!(input[i] === 0 || input[i] === -1 || input[i] === 1)) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	};
	/**
	 * Checks if trits are NULL.
	 *
	 * @method isNullTrits
	 *
	 * @param {Int8Array} trits
	 *
	 * @return {boolean}
	 */
	exports.isNullTrits = function (input) {
	    if (input instanceof Int8Array) {
	        if (input.length === 0) {
	            return true;
	        }
	        for (var i = 0; i < input.length; i++) {
	            if (input[i] !== 0) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	};
	/**
	 * Checks if input is correct trytes consisting of [9A-Z]; optionally validate length
	 * @method isTrytes
	 *
	 * @param {string} trytes
	 * @param {string | number} [length='1,']
	 *
	 * @return {boolean}
	 */
	exports.isTrytes = function (trytes, length) {
	    if (length === void 0) { length = '1,'; }
	    return typeof trytes === 'string' && new RegExp("^[9A-Z]{" + length + "}$").test(trytes);
	};
	/**
	 * @method isTrytesOfExactLength
	 *
	 * @param {string} trytes
	 * @param {number} length
	 *
	 * @return {boolean}
	 */
	exports.isTrytesOfExactLength = function (trytes, length) {
	    return typeof trytes === 'string' && new RegExp("^[9A-Z]{" + length + "}$").test(trytes);
	};
	/**
	 * @method isTrytesOfMaxLength
	 *
	 * @param {string} trytes
	 * @param {number} length
	 *
	 * @return {boolean}
	 */
	exports.isTrytesOfMaxLength = function (trytes, length) {
	    return typeof trytes === 'string' && new RegExp("^[9A-Z]{1," + length + "}$").test(trytes);
	};
	/**
	 * Checks if input contains `9`s only.
	 * @method isEmpty
	 *
	 * @param {string} hash
	 *
	 * @return {boolean}
	 */
	exports.isEmpty = function (trytes) { return typeof trytes === 'string' && /^[9]+$/.test(trytes); };
	exports.isNinesTrytes = exports.isEmpty;
	/**
	 * Checks if input is correct hash (81 trytes) or address with checksum (90 trytes)
	 *
	 * @method isHash
	 *
	 * @param {string} hash
	 *
	 * @return {boolean}
	 */
	exports.isHash = function (hash) {
	    return exports.isTrytesOfExactLength(hash, constants$3.HASH_TRYTE_SIZE) || exports.isTrytesOfExactLength(hash, constants$3.HASH_TRYTE_SIZE + 9);
	}; // address w/ checksum is valid hash
	/* Check if security level is valid positive integer */
	exports.isSecurityLevel = function (security) {
	    return Number.isInteger(security) && security > 0 && security < 4;
	};
	/**
	 * Checks if input is valid input object. Address can be passed with or without checksum.
	 * It does not validate the checksum.
	 *
	 * @method isInput
	 *
	 * @param {string} address
	 *
	 * @return {boolean}
	 */
	exports.isInput = function (input) {
	    return exports.isHash(input.address) &&
	        exports.isSecurityLevel(input.security) &&
	        (typeof input.balance === 'undefined' || (Number.isInteger(input.balance) && input.balance > 0)) &&
	        Number.isInteger(input.keyIndex) &&
	        input.keyIndex >= 0;
	};
	/**
	 * Checks that input is valid tag trytes.
	 *
	 * @method isTag
	 *
	 * @param {string} tag
	 *
	 * @return {boolean}
	 */
	exports.isTag = function (tag) { return exports.isTrytesOfMaxLength(tag, constants$3.TAG_TRYTE_SIZE); };
	/**
	 * Checks if input is valid `transfer` object.
	 *
	 * @method isTransfer
	 *
	 * @param {Transfer} transfer
	 *
	 * @return {boolean}
	 */
	exports.isTransfer = function (transfer) {
	    return exports.isHash(transfer.address) &&
	        Number.isInteger(transfer.value) &&
	        transfer.value >= 0 &&
	        (!transfer.message || exports.isTrytes(transfer.message, '0,')) &&
	        (!transfer.tag || exports.isTag(transfer.tag));
	};
	/**
	 * Checks that a given `URI` is valid
	 *
	 * Valid Examples:
	 * - `udp://[2001:db8:a0b:12f0::1]:14265`
	 * - `udp://[2001:db8:a0b:12f0::1]`
	 * - `udp://8.8.8.8:14265`
	 * - `udp://domain.com`
	 * - `udp://domain2.com:14265`
	 *
	 * @method isUri
	 *
	 * @param {string} uri
	 *
	 * @return {boolean}
	 */
	exports.isUri = function (uri) {
	    if (typeof uri !== 'string') {
	        return false;
	    }
	    var getInside = /^(udp|tcp):\/\/([\[][^\]\.]*[\]]|[^\[\]:]*)[:]{0,1}([0-9]{1,}$|$)/i;
	    var stripBrackets = /[\[]{0,1}([^\[\]]*)[\]]{0,1}/;
	    var uriTest = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/;
	    return getInside.test(uri) && uriTest.test(stripBrackets.exec(getInside.exec(uri)[1])[1]);
	};
	/* Check if start & end options are valid */
	exports.isStartEndOptions = function (_a) {
	    var start = _a.start, end = _a.end;
	    return !end || (start <= end && end < start + constants$3.MAX_INDEX_DIFF);
	};
	/* Checks all array items */
	exports.isArray = function (f) { return function (x) {
	    return Array.isArray(x) && x.length > 0 && x.every(function (y) { return f(y); });
	}; };
	/**
	 * Runs each validator in sequence, and throws on the first occurence of invalid data.
	 * Validators are passed as arguments and executed in given order.
	 * You might want place `validate()` in promise chains before operations that require valid inputs,
	 * taking advantage of built-in promise branching.
	 *
	 * @example
	 *
	 * ```js
	 * try {
	 *   validate([
	 *     value, // Given value
	 *     isTrytes, // Validator function
	 *     'Invalid trytes' // Error message
	 *   ])
	 * } catch (err) {
	 *   console.log(err.message) // 'Invalid trytes'
	 * }
	 * ```
	 *
	 * @method validate
	 *
	 * @throws {Error} error
	 * @return {boolean}
	 */
	exports.validate = function () {
	    var validators = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        validators[_i] = arguments[_i];
	    }
	    validators.forEach(function (validator) {
	        if (Array.isArray(validator)) {
	            var value = validator[0], isValid = validator[1], msg = validator[2];
	            if (!isValid(value)) {
	                throw new Error(msg + ": " + JSON.stringify(value, null, 1));
	            }
	        }
	    });
	    return true;
	};
	exports.arrayValidator = function (validator) { return function (arr, customMsg) {
	    var _a = validator(arr[0]), _ = _a[0], // tslint:disable-line no-unused-variable
	    isValid = _a[1], msg = _a[2];
	    return [
	        arr,
	        function (x) { return Array.isArray(x) && x.every(function (value) { return isValid(value); }); },
	        customMsg || msg,
	    ];
	}; };
	exports.depthValidator = function (depth) { return [
	    depth,
	    function (n) { return Number.isInteger(n) && n > 0; },
	    errors$7.INVALID_DEPTH,
	]; };
	exports.minWeightMagnitudeValidator = function (minWeightMagnitude) { return [
	    minWeightMagnitude,
	    Number.isInteger,
	    errors$7.INVALID_MIN_WEIGHT_MAGNITUDE,
	]; };
	exports.seedValidator = function (seed) { return [seed, exports.isTrytes, errors$7.INVALID_SEED]; };
	exports.securityLevelValidator = function (security) { return [
	    security,
	    exports.isSecurityLevel,
	    errors$7.INVALID_SECURITY_LEVEL,
	]; };
	exports.inputValidator = function (input) { return [input, exports.isInput, errors$7.INVALID_INPUT]; };
	exports.remainderAddressValidator = function (input) { return [input, exports.isHash, errors$7.INVALID_REMAINDER_ADDRESS]; };
	exports.tagValidator = function (tag) { return [tag, exports.isTag, errors$7.INVALID_TAG]; };
	exports.transferValidator = function (transfer) { return [transfer, exports.isTransfer, errors$7.INVALID_TRANSFER]; };
	exports.hashValidator = function (hash, errorMessage) { return [
	    hash,
	    exports.isHash,
	    errorMessage || errors$7.INVALID_HASH,
	]; };
	exports.trytesValidator = function (trytes, msg) { return [
	    trytes,
	    function (t) { return (length ? exports.isTrytesOfExactLength(t, length) : exports.isTrytes(t)); },
	    msg || errors$7.INVALID_TRYTES,
	]; };
	exports.uriValidator = function (uri) { return [uri, exports.isUri, errors$7.INVALID_URI]; };
	exports.integerValidator = function (integer, msg) { return [
	    integer,
	    Number.isInteger,
	    msg || errors$7.NOT_INT,
	]; };
	exports.indexValidator = function (index) { return [index, Number.isInteger, errors$7.INVALID_INDEX]; };
	exports.startOptionValidator = function (start) { return [
	    start,
	    function (s) { return Number.isInteger(s) && s >= 0; },
	    errors$7.INVALID_START_OPTION,
	]; };
	exports.startEndOptionsValidator = function (options) { return [
	    options,
	    exports.isStartEndOptions,
	    errors$7.INVALID_START_END_OPTIONS,
	]; };
	exports.getInputsThresholdValidator = function (threshold) { return [
	    threshold,
	    function (s) { return Number.isInteger(s) && s >= 0; },
	    errors$7.INVALID_THRESHOLD,
	]; };
	exports.stringify = function (value) {
	    return JSON.stringify(value, null, 1);
	};

	});

	unwrapExports(guards$3);
	var guards_1$3 = guards$3.isTrits;
	var guards_2$3 = guards$3.isNullTrits;
	var guards_3$3 = guards$3.isTrytes;
	var guards_4$3 = guards$3.isTrytesOfExactLength;
	var guards_5$3 = guards$3.isTrytesOfMaxLength;
	var guards_6$3 = guards$3.isEmpty;
	var guards_7$3 = guards$3.isNinesTrytes;
	var guards_8$3 = guards$3.isHash;
	var guards_9$3 = guards$3.isSecurityLevel;
	var guards_10$3 = guards$3.isInput;
	var guards_11$3 = guards$3.isTag;
	var guards_12$3 = guards$3.isTransfer;
	var guards_13$3 = guards$3.isUri;
	var guards_14$3 = guards$3.isStartEndOptions;
	var guards_15$3 = guards$3.isArray;
	var guards_16$3 = guards$3.validate;
	var guards_17$3 = guards$3.arrayValidator;
	var guards_18$3 = guards$3.depthValidator;
	var guards_19$3 = guards$3.minWeightMagnitudeValidator;
	var guards_20$3 = guards$3.seedValidator;
	var guards_21$3 = guards$3.securityLevelValidator;
	var guards_22$3 = guards$3.inputValidator;
	var guards_23$3 = guards$3.remainderAddressValidator;
	var guards_24$3 = guards$3.tagValidator;
	var guards_25$3 = guards$3.transferValidator;
	var guards_26$3 = guards$3.hashValidator;
	var guards_27$3 = guards$3.trytesValidator;
	var guards_28$3 = guards$3.uriValidator;
	var guards_29$3 = guards$3.integerValidator;
	var guards_30$3 = guards$3.indexValidator;
	var guards_31$3 = guards$3.startOptionValidator;
	var guards_32$3 = guards$3.startEndOptionsValidator;
	var guards_33$3 = guards$3.getInputsThresholdValidator;
	var guards_34$3 = guards$3.stringify;

	if (!Int8Array.prototype.slice) {
	    Object.defineProperty(Int8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.subarray) {
	    Object.defineProperty(Uint8Array.prototype, 'subarray', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.map) {
	    Object.defineProperty(Int8Array.prototype, 'map', {
	        value: Array.prototype.map
	    });
	}
	if (!Int8Array.prototype.every) {
	    Object.defineProperty(Int8Array.prototype, 'every', {
	        value: Array.prototype.every
	    });
	}
	if (!Int8Array.prototype.some) {
	    Object.defineProperty(Uint8Array.prototype, 'some', {
	        value: Array.prototype.some
	    });
	}
	if (!Int8Array.prototype.indexOf) {
	    Object.defineProperty(Int8Array.prototype, 'indexOf', {
	        value: Array.prototype.indexOf
	    });
	}
	// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Polyfill
	// Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/
	if (!Int8Array.prototype.fill) {
	    Object.defineProperty(Int8Array.prototype, 'fill', {
	        value: function (input) {
	            // Steps 1-2.
	            if (this == null) {
	                throw new TypeError('this is null or not defined');
	            }
	            var O = Object(this);
	            // Steps 3-5.
	            var len = O.length >>> 0;
	            // Steps 6-7.
	            var start = arguments[1];
	            var relativeStart = start >> 0;
	            // Step 8.
	            var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
	            // Steps 9-10.
	            var end = arguments[2];
	            var relativeEnd = end === undefined ? len : end >> 0;
	            // Step 11.
	            var last = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
	            // Step 12.
	            while (k < last) {
	                O[k] = input;
	                k++;
	            }
	            // Step 13.
	            return O;
	        }
	    });
	}
	if (!Uint32Array.prototype.slice) {
	    Object.defineProperty(Uint8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Uint32Array.prototype.reverse) {
	    Object.defineProperty(Uint8Array.prototype, 'reverse', {
	        value: Array.prototype.reverse
	    });
	}

	var types$1 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.makeAddress = function (address, balance, keyIndex, security) { return ({
	    address: address,
	    keyIndex: keyIndex,
	    security: security,
	    balance: balance
	}); };
	/* List of IRI Commands */
	var IRICommand;
	(function (IRICommand) {
	    IRICommand["GET_NODE_INFO"] = "getNodeInfo";
	    IRICommand["GET_NEIGHBORS"] = "getNeighbors";
	    IRICommand["ADD_NEIGHBORS"] = "addNeighbors";
	    IRICommand["REMOVE_NEIGHBORS"] = "removeNeighbors";
	    IRICommand["FIND_TRANSACTIONS"] = "findTransactions";
	    IRICommand["GET_TRYTES"] = "getTrytes";
	    IRICommand["GET_INCLUSION_STATES"] = "getInclusionStates";
	    IRICommand["GET_BALANCES"] = "getBalances";
	    IRICommand["GET_TRANSACTIONS_TO_APPROVE"] = "getTransactionsToApprove";
	    IRICommand["ATTACH_TO_TANGLE"] = "attachToTangle";
	    IRICommand["INTERRUPT_ATTACHING_TO_TANGLE"] = "interruptAttachingToTangle";
	    IRICommand["BROADCAST_TRANSACTIONS"] = "broadcastTransactions";
	    IRICommand["STORE_TRANSACTIONS"] = "storeTransactions";
	    IRICommand["CHECK_CONSISTENCY"] = "checkConsistency";
	    IRICommand["WERE_ADDRESSES_SPENT_FROM"] = "wereAddressesSpentFrom";
	})(IRICommand = exports.IRICommand || (exports.IRICommand = {}));
	/* Util methods */
	exports.asArray = function (x) { return (Array.isArray(x) ? x : [x]); };
	exports.getOptionsWithDefaults = function (defaults) { return function (options) {
	    return Object.assign({}, defaults, options);
	}; }; // tslint:disable-line prefer-object-spread
	var PersistenceBatchTypes;
	(function (PersistenceBatchTypes) {
	    PersistenceBatchTypes["put"] = "put";
	    PersistenceBatchTypes["del"] = "del";
	})(PersistenceBatchTypes = exports.PersistenceBatchTypes || (exports.PersistenceBatchTypes = {}));

	});

	unwrapExports(types$1);
	var types_1$1 = types$1.makeAddress;
	var types_2$1 = types$1.IRICommand;
	var types_3$1 = types$1.asArray;
	var types_4$1 = types$1.getOptionsWithDefaults;
	var types_5$1 = types$1.PersistenceBatchTypes;

	var src$7 = createCommonjsModule(function (module, exports) {
	/** @module transaction-converter */
	exports.__esModule = true;







	/**
	 * This method takes one or more transaction objects and converts them into trytes.
	 *
	 * ## Related methods
	 *
	 * To get JSON data from the `signatureMessageFragment` field of the transaction trytes, use the [`extractJSON()`]{@link #module_extract-json.extractJSON} method.
	 *
	 * @method asTransactionTrytes
	 *
	 * @summary Converts one or more transaction objects into transaction trytes.
	 *
	 * @memberof module:transaction-converter
	 *
	 * @param {Transaction | Transaction[]} transactions - Transaction objects
	 *
	 * @example
	 * ```js
	 * let trytes = TransactionConverter.asTransactionTrytes(transactionObject);
	 * ```
	 *
	 * @return {Trytes | Trytes[]} Transaction trytes
	 *
	 * @throws {errors.INVALID_TRYTES}: Make sure that the object fields in the `transactions` argument contains valid trytes (A-Z or 9).
	 */
	function asTransactionTrytes(transactions) {
	    var txTrytes = types$1.asArray(transactions).map(function (transaction) {
	        return [
	            transaction.signatureMessageFragment,
	            transaction.address,
	            src.tritsToTrytes(src$3.padTrits(src$5.VALUE_LENGTH)(src.trytesToTrits(transaction.value))),
	            src$3.padTrytes(src$5.OBSOLETE_TAG_LENGTH / src.TRYTE_WIDTH)(transaction.obsoleteTag),
	            src.tritsToTrytes(src$3.padTrits(src$5.ISSUANCE_TIMESTAMP_LENGTH)(src.trytesToTrits(transaction.timestamp))),
	            src.tritsToTrytes(src$3.padTrits(src$5.CURRENT_INDEX_LENGTH)(src.trytesToTrits(transaction.currentIndex))),
	            src.tritsToTrytes(src$3.padTrits(src$5.LAST_INDEX_LENGTH)(src.trytesToTrits(transaction.lastIndex))),
	            transaction.bundle,
	            transaction.trunkTransaction,
	            transaction.branchTransaction,
	            src$3.padTrytes(src$5.OBSOLETE_TAG_LENGTH / src.TRYTE_WIDTH)(transaction.tag || transaction.obsoleteTag),
	            src.tritsToTrytes(src$3.padTrits(src$5.ATTACHMENT_TIMESTAMP_LENGTH)(src.trytesToTrits(transaction.attachmentTimestamp))),
	            src.tritsToTrytes(src$3.padTrits(src$5.ATTACHMENT_TIMESTAMP_LOWER_BOUND_LENGTH)(src.trytesToTrits(transaction.attachmentTimestampLowerBound))),
	            src.tritsToTrytes(src$3.padTrits(src$5.ATTACHMENT_TIMESTAMP_UPPER_BOUND_LENGTH)(src.trytesToTrits(transaction.attachmentTimestampUpperBound))),
	            transaction.nonce,
	        ].join('');
	    });
	    return Array.isArray(transactions) ? txTrytes : txTrytes[0];
	}
	exports.asTransactionTrytes = asTransactionTrytes;
	/**
	 * This method takes 2,673 transaction trytes and converts them into a transaction object.
	 *
	 * ## Related methods
	 *
	 * To convert more than one transaction into an object at once, use the [`asTransactionObjects()`]{@link #module_transaction-converter.asTransactionObjects} method.
	 *
	 * To get a transaction's trytes from the Tangle, use the [`getTrytes()`]{@link #module_core.getTrytes} method.
	 *
	 * @method asTransactionObject
	 *
	 * @summary Converts transaction trytes into a transaction object.
	 *
	 * @memberof module:transaction-converter
	 *
	 * @param {Trytes} transaction - Transaction trytes
	 *
	 * @example
	 * ```js
	 * let transactionObject = TransactionConverter.asTransactionObject(transactionTrytes);
	 * ```
	 *
	 * @return {Transaction} transactionObject - A transaction object
	 *
	 * @throws {errors.INVALID_TRYTES}: Make sure that the object fields in the `transaction` argument contains valid trytes (A-Z or 9).
	 */
	exports.asTransactionObject = function (trytes, hash) {
	    if (!guards$3.isTrytesOfExactLength(trytes, src$5.TRANSACTION_LENGTH / src.TRYTE_WIDTH)) {
	        throw new Error(errors$7.INVALID_TRYTES);
	    }
	    for (var i = 2279; i < 2295; i++) {
	        if (trytes.charAt(i) !== '9') {
	            throw new Error(errors$7.INVALID_TRYTES);
	        }
	    }
	    var trits = src.trytesToTrits(trytes);
	    return {
	        hash: hash || src.tritsToTrytes(src$5.transactionHash(trits)),
	        signatureMessageFragment: trytes.slice(src$5.SIGNATURE_OR_MESSAGE_OFFSET / src.TRYTE_WIDTH, src$5.SIGNATURE_OR_MESSAGE_LENGTH / src.TRYTE_WIDTH),
	        address: trytes.slice(src$5.ADDRESS_OFFSET / src.TRYTE_WIDTH, (src$5.ADDRESS_OFFSET + src$5.ADDRESS_LENGTH) / src.TRYTE_WIDTH),
	        value: src.value(trits.slice(src$5.VALUE_OFFSET, src$5.VALUE_OFFSET + src$5.VALUE_LENGTH)),
	        obsoleteTag: trytes.slice(src$5.OBSOLETE_TAG_OFFSET / src.TRYTE_WIDTH, (src$5.OBSOLETE_TAG_OFFSET + src$5.OBSOLETE_TAG_LENGTH) / src.TRYTE_WIDTH),
	        timestamp: src.value(trits.slice(src$5.ISSUANCE_TIMESTAMP_OFFSET, src$5.ISSUANCE_TIMESTAMP_OFFSET + src$5.ISSUANCE_TIMESTAMP_LENGTH)),
	        currentIndex: src.value(trits.slice(src$5.CURRENT_INDEX_OFFSET, src$5.CURRENT_INDEX_OFFSET + src$5.CURRENT_INDEX_LENGTH)),
	        lastIndex: src.value(trits.slice(src$5.LAST_INDEX_OFFSET, src$5.LAST_INDEX_OFFSET + src$5.LAST_INDEX_LENGTH)),
	        bundle: trytes.slice(src$5.BUNDLE_OFFSET / src.TRYTE_WIDTH, (src$5.BUNDLE_OFFSET + src$5.BUNDLE_LENGTH) / src.TRYTE_WIDTH),
	        trunkTransaction: trytes.slice(src$5.TRUNK_TRANSACTION_OFFSET / src.TRYTE_WIDTH, (src$5.TRUNK_TRANSACTION_OFFSET + src$5.TRUNK_TRANSACTION_LENGTH) / src.TRYTE_WIDTH),
	        branchTransaction: trytes.slice(src$5.BRANCH_TRANSACTION_OFFSET / src.TRYTE_WIDTH, (src$5.BRANCH_TRANSACTION_OFFSET + src$5.BRANCH_TRANSACTION_LENGTH) / src.TRYTE_WIDTH),
	        tag: trytes.slice(src$5.TAG_OFFSET / src.TRYTE_WIDTH, (src$5.TAG_OFFSET + src$5.TAG_LENGTH) / src.TRYTE_WIDTH),
	        attachmentTimestamp: src.value(trits.slice(src$5.ATTACHMENT_TIMESTAMP_OFFSET, src$5.ATTACHMENT_TIMESTAMP_OFFSET + src$5.ATTACHMENT_TIMESTAMP_LENGTH)),
	        attachmentTimestampLowerBound: src.value(trits.slice(src$5.ATTACHMENT_TIMESTAMP_LOWER_BOUND_OFFSET, src$5.ATTACHMENT_TIMESTAMP_LOWER_BOUND_OFFSET + src$5.ATTACHMENT_TIMESTAMP_LOWER_BOUND_LENGTH)),
	        attachmentTimestampUpperBound: src.value(trits.slice(src$5.ATTACHMENT_TIMESTAMP_UPPER_BOUND_OFFSET, src$5.ATTACHMENT_TIMESTAMP_UPPER_BOUND_OFFSET + src$5.ATTACHMENT_TIMESTAMP_UPPER_BOUND_LENGTH)),
	        nonce: trytes.slice(src$5.TRANSACTION_NONCE_OFFSET / src.TRYTE_WIDTH, (src$5.TRANSACTION_NONCE_OFFSET + src$5.TRANSACTION_NONCE_LENGTH) / src.TRYTE_WIDTH)
	    };
	};
	/**
	 * This method takes an array of transaction hashes and returns a mapper.
	 *
	 * If any hashes are given, the mapper function maps them to their converted objects. Otherwise, all hashes are recalculated.
	 *
	 * ## Related methods
	 *
	 * To get a transaction's trytes from the Tangle, use the [`getTrytes()`]{@link #module_core.getTrytes} method.
	 *
	 * @method asTransactionObjects
	 *
	 * @summary Converts one or more transaction trytes into transaction objects.
	 *
	 * @memberof module:transaction-converter
	 *
	 * @param {Hash[]} [hashes] - Transaction hashes
	 *
	 * @example
	 * ```js
	 * let transactionObjectsMapper = TransactionConverter.asTransactionObjects([hashes]);
	 * ```
	 *
	 * @return {Function} [`transactionObjectsMapper()`]{@link #module_transaction.transactionObjectsMapper}
	 *
	 * @throws {errors.INVALID_TRYTES}: Make sure that transcactions contains valid trytes (A-Z or 9).
	 */
	exports.asTransactionObjects = function (hashes) {
	    /**
	     * Maps the list of given hashes to a list of converted transaction objects.
	     *
	     * @method transactionObjectsMapper
	     *
	     * @param {Trytes[]} trytes - List of transaction trytes to convert
	     *
	     * @return {Transaction[]} List of transaction objects with hashes
	     */
	    return function transactionObjectsMapper(trytes) {
	        return trytes.map(function (tryteString, i) { return exports.asTransactionObject(tryteString, hashes[i]); });
	    };
	};
	exports.asFinalTransactionTrytes = function (transactions) {
	    return asTransactionTrytes(transactions).slice().reverse();
	};
	exports.transactionObject = function (trytes) {
	    /* tslint:disable-next-line:no-console */
	    console.warn('`transactionObject` has been renamed to `asTransactionObject`');
	    return exports.asTransactionObject(trytes);
	};
	exports.transactionTrytes = function (transaction) {
	    /* tslint:disable-next-line:no-console */
	    console.warn('`transactionTrytes` has been renamed to `asTransactionTrytes`');
	    return asTransactionTrytes(transaction);
	};

	});

	unwrapExports(src$7);
	var src_1$5 = src$7.asTransactionTrytes;
	var src_2$5 = src$7.asTransactionObject;
	var src_3$4 = src$7.asTransactionObjects;
	var src_4$4 = src$7.asFinalTransactionTrytes;
	var src_5$2 = src$7.transactionObject;
	var src_6$2 = src$7.transactionTrytes;

	var createBroadcastBundle = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;


	/**
	 * @method createBroadcastBundle
	 *
	 * @summary Creates a new `broadcastBundle()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`broadcastBundle`]{@link #module_core.broadcastBundle}  - A new `broadcastBundle()` function that uses your chosen Provider instance.
	 */
	exports.createBroadcastBundle = function (provider) {
	    var broadcastTransactions = src$b.createBroadcastTransactions(provider);
	    var getBundle = src$b.createGetBundle(provider);
	    /**
	     * This method uses the `getBundle()` method to get all transactions in the given tail transaction's bundle from the connected IRI node.
	     *
	     * Then, those transactions are sent to the node again so that the node sends them to all of its neighbors.
	     *
	     * You may want to use this method to improve the likelihood of your transactions reaching the rest of the network.
	     *
	     * **Note:** To use this method, the node must already have your bundle's transaction trytes in its ledger.
	     *
	     * ## Related methods
	     *
	     * To create and sign a bundle of new transactions, use the [`prepareTransfers()`]{@link #module_core.prepareTransfers} method.
	     *
	     * @method broadcastBundle
	     *
	     * @summary Resends all transactions in the bundle of a given tail transaction hash to the connected IRI node.
	     *
	     * @memberof module:core
	     *
	     * @param {Hash} tailTransactionHash - Tail transaction hash
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     *
	     * ```js
	     * broadcastBundle(tailHash)
	     *   .then(transactionObjects => {
	     *      console.log(`Successfully sent the following bundle to the node:)
	     *      console.log(JSON.stringify(transactionObjects));
	     *   })
	     *   .catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     *   })
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {Transaction[]} transactionObjects - Array of transaction objects
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hash is 81 trytes long and its `currentIndex` field is 0
	     * - `INVALID_BUNDLE`: Check the tail transaction's bundle for the following:
	     *   - Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
	     *   - Transactions in the bundle array are in the same order as their currentIndex field
	     *   - The total value of all transactions in the bundle sums to 0
	     *   - The bundle hash is valid
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function broadcastBundle(tailTransactionHash, callback) {
	        return getBundle(tailTransactionHash)
	            .then(src$7.asFinalTransactionTrytes)
	            .then(broadcastTransactions)
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createBroadcastBundle);
	var createBroadcastBundle_1 = createBroadcastBundle.createBroadcastBundle;

	var createFindTransactionObjects = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;

	/**
	 * @method createFindTransactionObjects
	 *
	 * @summary Creates a new `findTransactionObjects()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`findTransactionObjects`]{@link #module_core.findTransactionObjects}  - A new `findTransactionObjects()` function that uses your chosen Provider instance.
	 */
	exports.createFindTransactionObjects = function (provider) {
	    var findTransactions = src$b.createFindTransactions(provider);
	    var getTransactionObjects = src$b.createGetTransactionObjects(provider);
	    /**
	     * This method uses the [`findTransactions()`]{@link #module_core.findTransactions} to find transactions with the given fields, then it uses
	     * the [`getTransactionObjects()`]{@link #module_core.getTransactionObjects} method to return the transaction objects.
	     *
	     * If you pass more than one query, this method returns only transactions that contain all the given fields in those queries.
	     *
	     * ## Related methods
	     *
	     * To find only transaction hashes, use the [`findTransactions()`]{@link #module_core.findTransactions} method.
	     *
	     * @method findTransactionObjects
	     *
	     * @summary Searches the Tangle for transaction objects that contain all the given values in their [transaction fields](https://docs.iota.org/docs/getting-started/0.1/transactions/transactions#structure-of-a-transaction).
	     *
	     * @memberof module:core
	     *
	     * @param {Object} query - Query object
	     * @param {Hash[]} [query.addresses] - Array of addresses to search for in transactions
	     * @param {Hash[]} [query.bundles] - Array of bundle hashes to search for in transactions
	     * @param {Tag[]} [query.tags] - Array of tags to search for in transactions
	     * @param {Hash[]} [query.approvees] - Array of transaction hashes that you want to search for in transactions' branch and trunk transaction fields
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     * ```js
	     * findTransactionObjects({ addresses: ['ADDRESS999...'] })
	     *    .then(transactionObjects => {
	     *      console.log(`Successfully found the following transactions:)
	     *      console.log(JSON.stringify(transactionObjects));
	     *   })
	     *   .catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     *   })
	     * ```
	     *
	     * @returns {Promise}
	     *
	     * @fulfil {Transaction[]} transactionObjects - Array of transaction objects, which contain fields that match the query object
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_SEARCH_KEY`: Make sure that you entered valid query parameters
	     * - `INVALID_HASH`: Make sure that the bundle hashes are 81 trytes long
	     * - `INVALID_TRANSACTION_HASH`: Make sure that the approvee transaction hashes are 81 trytes long
	     * - `INVALID_ADDRESS`: Make sure that the addresses contain only trytes
	     * - `INVALID_TAG`: Make sure that the tags contain only trytes
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function findTransactionObjects(query, callback) {
	        return findTransactions(query)
	            .then(getTransactionObjects)
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createFindTransactionObjects);
	var createFindTransactionObjects_1 = createFindTransactionObjects.createFindTransactionObjects;

	var createGetBundlesFromAddresses = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	exports.__esModule = true;

	exports.createGetBundlesFromAddresses = function (provider, caller) {
	    var findTransactionObjects = src$b.createFindTransactionObjects(provider);
	    var getInclusionStates = src$b.createGetInclusionStates(provider);
	    /* tslint:disable-next-line:only-arrow-functions */
	    return function (addresses, inclusionStates, callback) {
	        if (caller !== 'lib') {
	            /* tslint:disable-next-line:no-console */
	            console.warn('The `getBundlesFromAddresses()` method is deprecated and will be removed in v2.0.0' +
	                'Please use the `findTransactionObjects()` and `getBundle()` methods as an alternative');
	        }
	        // 1. Get txs associated with addresses
	        return (findTransactionObjects({ addresses: addresses })
	            // 2. Get all transactions by bundle hashes
	            .then(function (transactions) {
	            return findTransactionObjects({
	                bundles: transactions
	                    .map(function (tx) { return tx.bundle; })
	                    .filter(function (bundle, i, bundles) { return bundles.indexOf(bundle) === i; })
	            });
	        })
	            // 3. Group transactions into bundles
	            .then(exports.groupTransactionsIntoBundles)
	            // 4. If requested, add persistence status to each bundle
	            .then(function (bundles) {
	            return inclusionStates ? exports.addPersistence(getInclusionStates, bundles) : bundles;
	        })
	            // 5. Sort bundles by timestamp
	            .then(exports.sortByTimestamp)
	            .asCallback(typeof arguments[1] === 'function' ? arguments[1] : callback));
	    };
	};
	// Groups an array of transaction objects into array of bundles
	exports.groupTransactionsIntoBundles = function (transactions) {
	    return transactions.reduce(function (acc, transaction) {
	        return transaction.currentIndex === 0 ? acc.concat([exports.getBundleSync(transactions, transaction)]) : acc;
	    }, []);
	};
	// Collects all transactions of a bundle starting from a given tail and traversing through trunk.
	exports.getBundleSync = function (transactions, transaction, bundle) {
	    if (bundle === void 0) { bundle = []; }
	    var bundleCopy = bundle.slice();
	    if (transaction.currentIndex === 0) {
	        bundleCopy.push(transaction);
	    }
	    if (transaction && transaction.currentIndex !== transaction.lastIndex) {
	        var nextTrunkTransaction = transactions.find(function (nextTransaction) {
	            return nextTransaction.hash === transaction.trunkTransaction &&
	                nextTransaction.bundle === transaction.bundle &&
	                nextTransaction.currentIndex === transaction.currentIndex + 1;
	        });
	        if (nextTrunkTransaction) {
	            bundleCopy.push(nextTrunkTransaction);
	            return exports.getBundleSync(transactions, nextTrunkTransaction, bundleCopy);
	        }
	    }
	    return bundleCopy;
	};
	exports.zip2 = function (as, bs) {
	    return as.map(function (a, i) {
	        return [a, bs[i]];
	    });
	};
	exports.zipPersistence = function (bundles) { return function (states) {
	    // Since bundles are atomic, all transactions have the same state
	    return exports.zip2(bundles, states).map(function (_a) {
	        var bundle = _a[0], state = _a[1];
	        return bundle.map(function (tx) { return (__assign({}, tx, { persistence: state })); });
	    });
	}; };
	exports.addPersistence = function (getInclusionStates, bundles) {
	    // Get the first hash of each bundle
	    var hashes = bundles.map(function (bundle) { return bundle[0].hash; });
	    return getInclusionStates(hashes).then(exports.zipPersistence(bundles));
	};
	exports.sortByTimestamp = function (bundles) {
	    return bundles.slice().sort(function (_a, _b) {
	        var a = _a[0];
	        var b = _b[0];
	        return a.attachmentTimestamp - b.attachmentTimestamp;
	    });
	};

	});

	unwrapExports(createGetBundlesFromAddresses);
	var createGetBundlesFromAddresses_1 = createGetBundlesFromAddresses.createGetBundlesFromAddresses;
	var createGetBundlesFromAddresses_2 = createGetBundlesFromAddresses.groupTransactionsIntoBundles;
	var createGetBundlesFromAddresses_3 = createGetBundlesFromAddresses.getBundleSync;
	var createGetBundlesFromAddresses_4 = createGetBundlesFromAddresses.zip2;
	var createGetBundlesFromAddresses_5 = createGetBundlesFromAddresses.zipPersistence;
	var createGetBundlesFromAddresses_6 = createGetBundlesFromAddresses.addPersistence;
	var createGetBundlesFromAddresses_7 = createGetBundlesFromAddresses.sortByTimestamp;

	var createGetAccountData = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;






	var defaults = {
	    start: 0,
	    security: 2
	};
	exports.getAccountDataOptions = types.getOptionsWithDefaults(defaults);
	/**
	 * @method createGetAccountData
	 *
	 * @summary Creates a new `getAccountData()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`getAccountData`]{@link #module_core.getAccountData}  - A new `getAccountData()` function that uses your chosen Provider instance.
	 */
	exports.createGetAccountData = function (provider, caller) {
	    var getNewAddress = src$b.createGetNewAddress(provider, /* Called by */ 'lib');
	    var getBundlesFromAddresses = createGetBundlesFromAddresses.createGetBundlesFromAddresses(provider, /* Called by */ 'lib');
	    var getBalances = src$b.createGetBalances(provider);
	    var wereAddressesSpentFrom = createWereAddressesSpentFrom.createWereAddressesSpentFrom(provider, /* Called by */ 'lib');
	    /**
	     * This method generates [addresses](https://docs.iota.org/docs/getting-started/0.1/clients/addresses) for a given seed, and searches the Tangle for data about those addresses such as transactions, inputs, and total balance.
	     *
	     * **Note:** The given seed is used to [generate addresses](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/generate-an-address) on your local device. It is never sent anywhere.
	     *
	     * If you don't pass an `options.end` argument to this method, it will continue to generate addresses until it finds an unspent one.
	     *
	     * **Note:** The total balance does not include IOTA tokens on [spent addresses](https://docs.iota.org/docs/getting-started/0.1/clients/addresses#spent-addresses).
	     *
	     * ## Related methods
	     *
	     * To find the balance of specific addresses, which don't have to belong to your seed, use the [`getBalances()`]{@link #module_core.getBalances} method.
	     *
	     * To find only inputs (objects that contain information about addresses with a postive balance), use the [`getInputs()`]{@link #module_core.getInputs} method.
	     *
	     * @method getAccountData
	     *
	     * @summary Searches the Tangle for transctions, addresses, and balances that are associated with a given seed.
	     *
	     * @memberof module:core
	     *
	     * @param {string} seed - The seed to use to generate addresses
	     * @param {Object} options - Options object
	     * @param {number} [options.start=0] - The key index from which to start generating addresses
	     * @param {number} [options.security=2] - The [security level](https://docs.iota.org/docs/getting-started/0.1/clients/security-levels) to use to generate the addresses
	     * @param {number} [options.end] - The key index at which to stop generating addresses
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     *
	     * ```js
	     * getAccountData(seed)
	     *   .then(accountData => {
	     *     const { addresses, inputs, transactions, balance } = accountData
	     *     console.log(`Successfully found the following transactions:)
	     *     console.log(JSON.stringify(transactions));
	     *   })
	     *   .catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     *   })
	     * ```
	     *
	     * @returns {Promise}
	     *
	     * @fulfil {AccountData} accountData - Object that contains the following:
	     * - accountData.transfers: (deprecated) Array of transaction objects that contain one of the seed's addresses
	     * - accountData.transactions: Array of transaction hashes for transactions that contain one of the seed's addresses
	     * - accountData.addresses: Array of spent addresses
	     * - accountData.inputs: Array of input objects for any unspent addresses
	     *   - accountData.inputs.address: The 81-tryte address (without checksum)
	     *   - accountData.inputs.keyIndex: The key index of the address
	     *   - accountData.inputs.security: Security level of the address
	     *   - accountData.inputs.balance: Balance of the address
	     * - accountData.balance: The total balance of unspent addresses
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_SEED`: Make sure that the seed contains only trytes
	     * - `INVALID_SECURITY_LEVEL`: Make sure that the security level is a number between 1 and 3
	     * - `INVALID_START_OPTION`: Make sure that the `options.start` argument is greater than zero
	     * - `INVALID_START_END_OPTIONS`: Make sure that the `options.end` argument is not greater than the `options.start` argument by more than 1,000`
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function (seed, options, callback) {
	        if (options === void 0) { options = {}; }
	        var _a = exports.getAccountDataOptions(options), start = _a.start, end = _a.end, security = _a.security;
	        if (caller !== 'lib') {
	            /* tslint:disable-next-line:no-console */
	            console.warn('The returned `accountData.transfers` field is deprecated, therefore do not rely on this field in your applications.\n' +
	                'Instead, you can get only the transactions that you need by using the transaction hashes returned in the `accountData.transactions` field.');
	        }
	        return (bluebird.resolve(guards.validate(guards.seedValidator(seed), guards.securityLevelValidator(security), !!start && guards.startOptionValidator(start), !!start && !!end && guards.startEndOptionsValidator({ start: start, end: end })))
	            // 1. Generate addresses up to first unused address
	            .then(function () {
	            return getNewAddress(seed, {
	                index: start,
	                total: end ? end - start : undefined,
	                returnAll: true,
	                security: security
	            });
	        })
	            // In case getNewAddress returned string, depends on options...
	            .then(function (addresses) { return types.asArray(addresses); })
	            // 2. Query to fetch the complete bundles, balances and spending states of addresses
	            // Bundle fetching is intensive task networking wise, and will be removed in v.2.0.0
	            .then(function (addresses) {
	            return bluebird.all([
	                getBundlesFromAddresses(addresses, true),
	                // findTransactions({ addresses }), // Find transactions instead of getBundlesFromAddress as of v2.0.0
	                getBalances(addresses),
	                wereAddressesSpentFrom(addresses),
	                addresses,
	            ]);
	        })
	            .then(function (_a) {
	            var transfers = _a[0] /* transactions */, balances = _a[1].balances, spentStates = _a[2], addresses = _a[3];
	            return ({
	                // 2. Assign the last address as the latest address
	                latestAddress: addresses[addresses.length - 1],
	                // 3. Add bundles to account data
	                transfers: transfers,
	                // 4. As replacement for `transfers` field, `transactions` contains transactions directly
	                // related to account addresses. Use of `getBundlesFromAddresses(addresses)` will be replaced by
	                // `findTransactions({ address })` in v2.0.0.
	                // Full bundles should be fetched lazily if there are relevant use cases...
	                transactions: transfers.reduce(function (acc, bundle) {
	                    return acc.concat(bundle
	                        .filter(function (_a) {
	                        var address = _a.address;
	                        return addresses.indexOf(address) > -1;
	                    })
	                        .map(function (transaction) { return transaction.hash; }));
	                }, []),
	                // transactions,
	                // 5. Add balances and extract inputs
	                inputs: addresses
	                    // We mark unspent addresses with balance as inputs
	                    .reduce(function (acc, address, i) {
	                    return !spentStates[i] && balances[i] > 0
	                        ? acc.concat(types.makeAddress(address, balances[i], start + i, security))
	                        : acc;
	                }, []),
	                // List of all account addresses
	                addresses: addresses,
	                // Calculate total balance
	                // Don't count balance of spent addresses!
	                balance: balances.reduce(function (acc, balance, i) { return (spentStates[i] ? acc : (acc += balance)); }, 0)
	            });
	        })
	            .asCallback(callback));
	    };
	};

	});

	unwrapExports(createGetAccountData);
	var createGetAccountData_1 = createGetAccountData.getAccountDataOptions;
	var createGetAccountData_2 = createGetAccountData.createGetAccountData;

	var errors$8 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.ILLEGAL_LENGTH = 'Illegal trits length';
	exports.ILLEGAL_SUBSEED_INDEX = 'Illegal subseed length';
	exports.ILLEGAL_SUBSEED_LENGTH = 'Illegal subseed length';
	exports.ILLEGAL_NUMBER_OF_FRAGMENTS = 'Illegal number of fragments';
	exports.ILLEGAL_KEY_LENGTH = 'Illegal key length';
	exports.ILLEGAL_DIGESTS_LENGTH = 'Illegal digests length';
	exports.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH = 'Illegal normalized fragment length';
	exports.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH = 'Illegal signature fragment length';
	exports.ILLEGAL_BUNDLE_HASH_LENGTH = 'Illegal bundle hash length';
	exports.ILLEGAL_KEY_FRAGMENT_LENGTH = 'Illegal key fragment length';
	exports.ILLEGAL_TRIT_CONVERSION_INPUT = 'Illegal conversion input. Expected trits as Int8Array.';
	exports.ILLEGAL_TRYTE_CONVERSION_INPUT = 'Illegal conversion input. Expected trytes string or integer.';
	exports.ILLEGAL_MIN_WEIGHT_MAGNITUDE = 'Illegal minWeightMagnitude value.';
	exports.ILLEGAL_ADDRESS_LAST_TRIT = 'Illegal address. Last trit must be 0.';
	exports.ILLEGAL_ADDRESS_LENGTH = 'Illegal address length.';
	exports.ILLEGAL_BUNDLE_LENGTH = 'Illegal bundle hash length.';
	exports.ILLEGAL_OBSOLETE_TAG_LENGTH = 'Illegal obsoleteTag length.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE = 'Illegal signature or message.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH = 'Illegal signatureOrMessage length.';
	exports.ILLEGAL_TAG_LENGTH = 'Illegal tag length.';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP = 'Illegal issuance timestamp';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH = 'Illegal issuanceTimestamp length.';
	exports.ILLEGAL_VALUE_LENGTH = 'Illegal value length.';
	exports.ILLEGAL_TRANSACTION_FIELD_OFFSET = 'Illegal transaction field offset.';
	exports.ILLEGAL_TRANSACTION_FIELD_LENGTH = 'Illegal transaction field length.';
	exports.ILLEGAL_LENGTH_OR_OFFSET = 'Illegal length or offset.';
	exports.ILLEGAL_TRANSACTION_BUFFER = 'Illegal transaction buffer. Expected `Int8Array`.';
	exports.ILLEGAL_TRANSACTION_BUFFER_LENGTH = 'Illegal transaction buffer length.';
	exports.ILLEGAL_TRANSACTION_OFFSET = 'Illegal transaction offset.';
	exports.ILLEGAL_TRANSACTION_LENGTH = 'Illegal transaction length.';
	exports.ILLEGAL_TRANSACTION_ORDER = 'Illegal transaction order.';
	exports.ILLEGAL_TRANSACTION_INDEX = 'Illegal transaction index.';
	exports.ILLEGAL_SEED_LENGTH = 'Illegal seed length. Expected length of 243 trits.';
	exports.ILLEGAL_KEY_INDEX = 'Illegal key index.';
	exports.ILLEGAL_CDA_LENGTH = 'Illegal cda length.';
	exports.ILLEGAL_BATCH = 'Illegal batch.';
	exports.CDA_ALREADY_IN_STORE = 'CDA is already in store.';
	exports.ILLEGAL_PERSISTENCE_ID = 'Illegal persistence id.';
	exports.ILLEGAL_PERSISTENCE_PATH = 'Illegal persistence path.';
	exports.ILLEGAL_PADDING_LENGTH = 'Illegal padding length. Input value length exceeds padding length.';
	exports.INCONSISTENT_SUBTANGLE = 'Inconsistent subtangle';
	exports.INSUFFICIENT_BALANCE = 'Insufficient balance';
	exports.INVALID_ADDRESS = 'Invalid address';
	exports.INVALID_REMAINDER_ADDRESS = 'Invalid remainder address';
	exports.INVALID_BRANCH_TRANSACTION = 'Invalid branch transaction';
	exports.INVALID_BUNDLE = 'Invalid bundle';
	exports.INVALID_BUNDLE_HASH = 'Invalid bundle hash';
	exports.INVALID_CHECKSUM = 'Invalid checksum';
	exports.INVALID_COMMAND = 'Invalid command format';
	exports.INVALID_DEPTH = 'Invalid depth';
	exports.INVALID_HASH = 'Invalid hash';
	exports.INVALID_INDEX = 'Invalid index option';
	exports.INVALID_TOTAL_OPTION = 'Invalid total option';
	exports.INVALID_INPUT = 'Invalid input';
	exports.INVALID_KEY = 'Invalid key value';
	exports.INVALID_MIN_WEIGHT_MAGNITUDE = 'Invalid Min Weight Magnitude';
	exports.INVALID_SEARCH_KEY = 'Invalid search key';
	exports.INVALID_SECURITY_LEVEL = 'Invalid security option';
	exports.INVALID_SECURITY_OPTION = 'Invalid security option';
	exports.INVALID_SEED = 'Invalid seed';
	exports.INVALID_START_END_OPTIONS = 'Invalid end option';
	exports.INVALID_START_OPTION = 'Invalid start option';
	exports.INVALID_TAG = 'Invalid tag';
	exports.INVALID_TRANSACTION = 'Invalid transaction';
	exports.INVALID_TRANSACTION_TRYTES = 'Invalid transaction trytes';
	exports.INVALID_ATTACHED_TRYTES = 'Invalid attached trytes';
	exports.INVALID_TRANSACTION_HASH = 'Invalid transaction hash';
	exports.INVALID_TAIL_TRANSACTION = 'Invalid tail transaction';
	exports.INVALID_THRESHOLD = 'Invalid threshold option';
	exports.INVALID_TRANSFER = 'Invalid transfer array';
	exports.INVALID_TRUNK_TRANSACTION = 'Invalid trunk transaction';
	exports.INVALID_REFERENCE_HASH = 'Invalid reference hash';
	exports.INVALID_TRYTES = 'Invalid trytes';
	exports.INVALID_URI = 'Invalid uri';
	exports.INVALID_ASCII_INPUT = 'Conversion to trytes requires type of input to be encoded in ascii.';
	exports.INVALID_ODD_LENGTH = 'Conversion from trytes requires length of trytes to be even.';
	exports.INVALID_TRYTE_ENCODED_JSON = 'Invalid tryte encoded JSON message';
	exports.NOT_INT = 'One of the inputs is not integer';
	exports.SENDING_BACK_TO_INPUTS = 'One of the transaction inputs is used as output.';
	exports.INVALID_TRANSACTIONS_TO_APPROVE = 'Invalid transactions to approve.';
	exports.NO_INPUTS = 'Could not find any available inputs.';
	exports.invalidChecksum = function (address) { return "Invalid Checksum: " + address; };
	exports.inconsistentTransaction = function (reason) { return "Transaction is inconsistent. Reason: " + reason; };
	exports.INVALID_DELAY = 'Invalid delay.';

	});

	unwrapExports(errors$8);
	var errors_1$8 = errors$8.ILLEGAL_LENGTH;
	var errors_2$8 = errors$8.ILLEGAL_SUBSEED_INDEX;
	var errors_3$7 = errors$8.ILLEGAL_SUBSEED_LENGTH;
	var errors_4$7 = errors$8.ILLEGAL_NUMBER_OF_FRAGMENTS;
	var errors_5$6 = errors$8.ILLEGAL_KEY_LENGTH;
	var errors_6$6 = errors$8.ILLEGAL_DIGESTS_LENGTH;
	var errors_7$6 = errors$8.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH;
	var errors_8$6 = errors$8.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH;
	var errors_9$6 = errors$8.ILLEGAL_BUNDLE_HASH_LENGTH;
	var errors_10$6 = errors$8.ILLEGAL_KEY_FRAGMENT_LENGTH;
	var errors_11$6 = errors$8.ILLEGAL_TRIT_CONVERSION_INPUT;
	var errors_12$6 = errors$8.ILLEGAL_TRYTE_CONVERSION_INPUT;
	var errors_13$6 = errors$8.ILLEGAL_MIN_WEIGHT_MAGNITUDE;
	var errors_14$6 = errors$8.ILLEGAL_ADDRESS_LAST_TRIT;
	var errors_15$6 = errors$8.ILLEGAL_ADDRESS_LENGTH;
	var errors_16$6 = errors$8.ILLEGAL_BUNDLE_LENGTH;
	var errors_17$6 = errors$8.ILLEGAL_OBSOLETE_TAG_LENGTH;
	var errors_18$6 = errors$8.ILLEGAL_SIGNATURE_OR_MESSAGE;
	var errors_19$6 = errors$8.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH;
	var errors_20$6 = errors$8.ILLEGAL_TAG_LENGTH;
	var errors_21$6 = errors$8.ILLEGAL_ISSUANCE_TIMESTAMP;
	var errors_22$6 = errors$8.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH;
	var errors_23$6 = errors$8.ILLEGAL_VALUE_LENGTH;
	var errors_24$6 = errors$8.ILLEGAL_TRANSACTION_FIELD_OFFSET;
	var errors_25$6 = errors$8.ILLEGAL_TRANSACTION_FIELD_LENGTH;
	var errors_26$6 = errors$8.ILLEGAL_LENGTH_OR_OFFSET;
	var errors_27$6 = errors$8.ILLEGAL_TRANSACTION_BUFFER;
	var errors_28$6 = errors$8.ILLEGAL_TRANSACTION_BUFFER_LENGTH;
	var errors_29$6 = errors$8.ILLEGAL_TRANSACTION_OFFSET;
	var errors_30$6 = errors$8.ILLEGAL_TRANSACTION_LENGTH;
	var errors_31$6 = errors$8.ILLEGAL_TRANSACTION_ORDER;
	var errors_32$6 = errors$8.ILLEGAL_TRANSACTION_INDEX;
	var errors_33$6 = errors$8.ILLEGAL_SEED_LENGTH;
	var errors_34$6 = errors$8.ILLEGAL_KEY_INDEX;
	var errors_35$6 = errors$8.ILLEGAL_CDA_LENGTH;
	var errors_36$6 = errors$8.ILLEGAL_BATCH;
	var errors_37$6 = errors$8.CDA_ALREADY_IN_STORE;
	var errors_38$6 = errors$8.ILLEGAL_PERSISTENCE_ID;
	var errors_39$6 = errors$8.ILLEGAL_PERSISTENCE_PATH;
	var errors_40$6 = errors$8.ILLEGAL_PADDING_LENGTH;
	var errors_41$6 = errors$8.INCONSISTENT_SUBTANGLE;
	var errors_42$6 = errors$8.INSUFFICIENT_BALANCE;
	var errors_43$6 = errors$8.INVALID_ADDRESS;
	var errors_44$6 = errors$8.INVALID_REMAINDER_ADDRESS;
	var errors_45$6 = errors$8.INVALID_BRANCH_TRANSACTION;
	var errors_46$6 = errors$8.INVALID_BUNDLE;
	var errors_47$6 = errors$8.INVALID_BUNDLE_HASH;
	var errors_48$6 = errors$8.INVALID_CHECKSUM;
	var errors_49$6 = errors$8.INVALID_COMMAND;
	var errors_50$6 = errors$8.INVALID_DEPTH;
	var errors_51$6 = errors$8.INVALID_HASH;
	var errors_52$6 = errors$8.INVALID_INDEX;
	var errors_53$6 = errors$8.INVALID_TOTAL_OPTION;
	var errors_54$6 = errors$8.INVALID_INPUT;
	var errors_55$6 = errors$8.INVALID_KEY;
	var errors_56$6 = errors$8.INVALID_MIN_WEIGHT_MAGNITUDE;
	var errors_57$6 = errors$8.INVALID_SEARCH_KEY;
	var errors_58$6 = errors$8.INVALID_SECURITY_LEVEL;
	var errors_59$6 = errors$8.INVALID_SECURITY_OPTION;
	var errors_60$6 = errors$8.INVALID_SEED;
	var errors_61$6 = errors$8.INVALID_START_END_OPTIONS;
	var errors_62$6 = errors$8.INVALID_START_OPTION;
	var errors_63$6 = errors$8.INVALID_TAG;
	var errors_64$6 = errors$8.INVALID_TRANSACTION;
	var errors_65$6 = errors$8.INVALID_TRANSACTION_TRYTES;
	var errors_66$6 = errors$8.INVALID_ATTACHED_TRYTES;
	var errors_67$6 = errors$8.INVALID_TRANSACTION_HASH;
	var errors_68$6 = errors$8.INVALID_TAIL_TRANSACTION;
	var errors_69$6 = errors$8.INVALID_THRESHOLD;
	var errors_70$6 = errors$8.INVALID_TRANSFER;
	var errors_71$6 = errors$8.INVALID_TRUNK_TRANSACTION;
	var errors_72$6 = errors$8.INVALID_REFERENCE_HASH;
	var errors_73$6 = errors$8.INVALID_TRYTES;
	var errors_74$6 = errors$8.INVALID_URI;
	var errors_75$6 = errors$8.INVALID_ASCII_INPUT;
	var errors_76$6 = errors$8.INVALID_ODD_LENGTH;
	var errors_77$6 = errors$8.INVALID_TRYTE_ENCODED_JSON;
	var errors_78$6 = errors$8.NOT_INT;
	var errors_79$6 = errors$8.SENDING_BACK_TO_INPUTS;
	var errors_80$6 = errors$8.INVALID_TRANSACTIONS_TO_APPROVE;
	var errors_81$6 = errors$8.NO_INPUTS;
	var errors_82$6 = errors$8.invalidChecksum;
	var errors_83$6 = errors$8.inconsistentTransaction;
	var errors_84$6 = errors$8.INVALID_DELAY;

	var src$8 = createCommonjsModule(function (module, exports) {
	/** @module bundle-validator */
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	exports.__esModule = true;





	exports.INVALID_BUNDLE = errors$8.INVALID_BUNDLE;
	var HASH_TRITS_SIZE = 243;
	/**
	 *
	 * This method takes an array of transaction trytes and checks if the signatures are valid.
	 *
	 * ## Related methods
	 *
	 * To get a bundle's transaction trytes from the Tangle, use the [`getBundle()`]{@link #module_core.getBundle} method.
	 *
	 * @method validateBundleSignatures
	 *
	 * @summary Validates the signatures in a given bundle
	 *
	 * @memberof module:bundle-validator
	 *
	 * @param {Transaction[]} bundle - Transaction trytes
	 *
	 * @example
	 * ```js
	 * let valid = Validator.validateBundleSignatures(bundle);
	 * ```
	 *
	 * @return {boolean} Whether the signatures are valid
	 *
	 */
	exports.validateBundleSignatures = function (bundle) {
	    var signatures = bundle.slice().sort(function (a, b) { return a.currentIndex - b.currentIndex; })
	        .reduce(function (acc, _a, i) {
	        var _b, _c;
	        var address = _a.address, signatureMessageFragment = _a.signatureMessageFragment, value = _a.value;
	        return value < 0
	            ? __assign({}, acc, (_b = {}, _b[address] = [src.trits(signatureMessageFragment)], _b)) : value === 0 && acc.hasOwnProperty(address) && address === bundle[i - 1].address
	            ? __assign({}, acc, (_c = {}, _c[address] = acc[address].concat(src.trits(signatureMessageFragment)), _c)) : acc;
	    }, {});
	    return Object.keys(signatures).every(function (address) {
	        return src$4.validateSignatures(src.trits(address), signatures[address], src.trits(bundle[0].bundle));
	    });
	};
	/**
	 * This method takes an array of transaction trytes and validates whether they form a valid bundle by checking the following:
	 *
	 * - Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
	 * - Transactions in the bundle array are in the same order as their `currentIndex` field
	 * - The total value of all transactions in the bundle sums to 0
	 * - The bundle hash is valid
	 *
	 * ## Related methods
	 *
	 * To get a bundle's transaction trytes from the Tangle, use the [`getBundle()`]{@link #module_core.getBundle} method.
	 *
	 * @method isBundle
	 *
	 * @summary Validates the structure and contents of a given bundle.
	 *
	 * @memberof module:bundle-validator
	 *
	 * @param {Transaction[]} bundle - Transaction trytes
	 *
	 * @example
	 * ```js
	 * let bundle = Validator.isBundle(bundle);
	 * ```
	 *
	 * @return {boolean} bundle - Whether the bundle is valid
	 *
	 */
	function isBundle(bundle) {
	    var totalSum = 0;
	    var bundleHash = bundle[0].bundle;
	    var sponge = new src$2["default"]();
	    // Addresses of value txs must have last trit == 0.
	    if (bundle.some(function (tx) { return tx.value !== 0 && src.trits(tx.address)[HASH_TRITS_SIZE - 1] !== 0; })) {
	        return false;
	    }
	    // currentIndex has to be equal to the index in the array
	    if (bundle.some(function (tx, index) { return tx.currentIndex !== index; })) {
	        return false;
	    }
	    // Txs must have correct lastIndex
	    if (bundle.some(function (tx) { return tx.lastIndex !== bundle.length - 1; })) {
	        return false;
	    }
	    bundle.forEach(function (bundleTx, index) {
	        totalSum += bundleTx.value;
	        // Get the transaction trytes
	        var thisTxTrytes = src$7.asTransactionTrytes(bundleTx);
	        var thisTxTrits = src.trits(thisTxTrytes.slice(2187, 2187 + 162));
	        sponge.absorb(thisTxTrits, 0, thisTxTrits.length);
	        // Check if input transaction
	        if (bundleTx.value < 0) {
	            var thisAddress = bundleTx.address;
	            var newSignatureToValidate = {
	                address: thisAddress,
	                signatureFragments: Array(bundleTx.signatureMessageFragment)
	            };
	            // Find the subsequent txs with the remaining signature fragment
	            for (var i = index; i < bundle.length - 1; i++) {
	                var newBundleTx = bundle[i + 1];
	                // Check if new tx is part of the signature fragment
	                if (newBundleTx.address === thisAddress && newBundleTx.value === 0) {
	                    newSignatureToValidate.signatureFragments.push(newBundleTx.signatureMessageFragment);
	                }
	            }
	        }
	    });
	    // Check for total sum, if not equal 0 return error
	    if (totalSum !== 0) {
	        return false;
	    }
	    // Prepare to absorb txs and get bundleHash
	    var bundleFromTxs = new Int8Array(src$2["default"].HASH_LENGTH);
	    // get the bundle hash from the bundle transactions
	    sponge.squeeze(bundleFromTxs, 0, src$2["default"].HASH_LENGTH);
	    // Check if bundle hash is the same as returned by tx object
	    if (src.trytes(bundleFromTxs) !== bundleHash) {
	        return false;
	    }
	    return exports.validateBundleSignatures(bundle);
	}
	exports["default"] = isBundle;
	exports.bundleValidator = function (bundle) { return [bundle, isBundle, errors$8.INVALID_BUNDLE]; };

	});

	unwrapExports(src$8);
	var src_1$6 = src$8.INVALID_BUNDLE;
	var src_2$6 = src$8.validateBundleSignatures;
	var src_3$5 = src$8.bundleValidator;

	var createGetBundle = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;



	/**
	 * @method createGetBundle
	 *
	 * @summary Creates a new `getBundle()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`getBundle`]{@link #module_core.getBundle}  - A new `getBundle()` function that uses your chosen Provider instance.
	 */
	exports.createGetBundle = function (provider) {
	    var traverseBundle = src$b.createTraverseBundle(provider);
	    /**
	     * This method uses the [`traverseBundle()`]{@link #module_core.traverseBundle} method to find all transactions in a bundle, validate them, and return them as transaction objects.
	     *
	     * For more information about what makes a bundles and transactions valid, see [this guide](https://docs.iota.org/docs/node-software/0.1/iri/concepts/transaction-validation).
	     *
	     * ## Related methods
	     *
	     * To find transaction objects that aren't in the same bundle, use the [`getTransactionObjects()`]{@link #module_core.getTransactionObjects} method.
	     *
	     * @method getBundle
	     *
	     * @summary Searches the Tangle for a valid bundle that includes the given tail transaction hash.
	     *
	     * @memberof module:core
	     *
	     * @param {Hash} tailTransactionHash - Tail transaction hash
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     *
	     * ```js
	     * getBundle(tail)
	     *    .then(bundle => {
	     *     console.log(`Bundle found:)
	     *     console.log(JSON.stringify(bundle));
	     *   })
	     *   .catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     *    })
	     * ```
	     *
	     * @returns {Promise}
	     *
	     * @fulfil {Transaction[]} bundle - Array of transaction objects that are in the bundle
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hash is 81 trytes long
	     * - `INVALID_TAIL_HASH`: Make sure that the tail transaction hash is for a transaction whose `currentIndex` field is 0
	     * - `INVALID_BUNDLE`: Check the tail transaction's bundle for the following:
	     *   - Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
	     *   - Transactions in the bundle array are in the same order as their currentIndex field
	     *   - The total value of all transactions in the bundle sums to 0
	     *   - The bundle hash is valid
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function getBundle(tailTransactionHash, callback) {
	        return traverseBundle(tailTransactionHash)
	            .tap(function (bundle) { return guards.validate(src$8.bundleValidator(bundle)); })
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createGetBundle);
	var createGetBundle_1 = createGetBundle.createGetBundle;

	var createGetNewAddress = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;







	exports.createIsAddressUsed = function (provider) {
	    var wereAddressesSpentFrom = createWereAddressesSpentFrom.createWereAddressesSpentFrom(provider, 'lib');
	    var findTransactions = src$b.createFindTransactions(provider);
	    return function (address) {
	        return wereAddressesSpentFrom([address]).then(function (_a) {
	            var isSpent = _a[0];
	            return findTransactions({ addresses: [address] }).then(function (transactions) { return ({
	                isUsed: isSpent || transactions.length > 0,
	                isSpent: isSpent,
	                transactions: transactions
	            }); });
	        });
	    };
	};
	/**
	 * Generates and returns all addresses up to the first unused addresses including it.
	 *
	 * @method getUntilFirstUnusedAddress
	 *
	 * @ignore
	 *
	 * @memberof module:core
	 *
	 * @param {string} seed
	 * @param {options} [options]
	 * @param {number} [options.start=0] - Key index offset to start the search at
	 * @param {number} [options.security=2] - Security level
	 *
	 * @return {Promise}
	 *
	 * @fulfil {Hash[]} List of addresses up to (and including) first unused address
	 *
	 * @reject {Error}
	 * - `INVALID_SEED`
	 * - `INVALID_START_OPTION`
	 * - `INVALID_SECURITY`
	 * - Fetch error
	 */
	exports.getUntilFirstUnusedAddress = function (isAddressUsed, seed, index, security, returnAll) {
	    var addressList = [];
	    var iterate = function () {
	        var nextAddress = src$b.generateAddress(seed, index++, security);
	        if (returnAll) {
	            addressList.push(nextAddress);
	        }
	        return isAddressUsed(nextAddress).then(function (_a) {
	            var isUsed = _a.isUsed;
	            if (isUsed) {
	                return iterate();
	            }
	            // It may have already been added
	            if (!returnAll) {
	                addressList.push(nextAddress);
	            }
	            return addressList;
	        });
	    };
	    return iterate;
	};
	exports.generateAddresses = function (seed, index, security, total) {
	    if (total === void 0) { total = 1; }
	    return Array(total)
	        .fill('')
	        .map(function () { return src$b.generateAddress(seed, index++, security); });
	};
	exports.applyChecksumOption = function (checksum) { return function (addresses) {
	    return checksum
	        ? Array.isArray(addresses)
	            ? addresses.map(function (addr) { return src$6.addChecksum(addr); })
	            : src$6.addChecksum(addresses)
	        : addresses;
	}; };
	exports.applyReturnAllOption = function (returnAll, total) { return function (addresses) {
	    return returnAll || total ? addresses : addresses[addresses.length - 1];
	}; };
	exports.getNewAddressOptions = types.getOptionsWithDefaults({
	    index: 0,
	    security: 2,
	    checksum: false,
	    total: undefined,
	    returnAll: false
	});
	/**
	 * @method createGetNewAddress
	 *
	 * @summary Creates a new `getNewAddress()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`getNewAddress`]{@link #module_core.getNewAddress}  - A new `getNewAddress()` function that uses your chosen Provider instance.
	 */
	exports.createGetNewAddress = function (provider, caller) {
	    var isAddressUsed = exports.createIsAddressUsed(provider);
	    /**
	     * This method uses the connected IRI node's [`findTransactions`]{@link #module_core.findTransactions}
	     * endpoint to search every transactions in the Tangle for each generated address. If an address is found in a transaction, a new address is generated until one is found that isn't in any transactions.
	     *
	     * **Note:** The given seed is used to [generate addresses](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/generate-an-address) on your local device. It is never sent anywhere.
	     *
	     * **Note:** Because of local snapshots, this method is not a reliable way of generating unspent addresses. Instead, you should use the [account module](https://docs.iota.org/docs/client-libraries/0.1/account-module/introduction/overview) to keep track of your spent addresses.
	     *
	     * ## Related methods
	     *
	     * To find out which of your addresses are spent, use the [`getAccountData()`]{@link #module_core.getAccountData} method.
	     *
	     * @method getNewAddress
	     *
	     * @summary Generates a new address for a given seed.
	     *
	     * @memberof module:core
	     *
	     * @param {string} seed - The seed to use to generate addresses
	     * @param {Object} [options] - Options object
	     * @param {number} [options.index=0] - The key index from which to start generating addresses
	     * @param {number} [options.security=2] - The [security level](https://docs.iota.org/docs/getting-started/0.1/clients/security-levels) to use to generate the addresses
	     * @param {boolean} [options.checksum=false] - `Deprecated`
	     * @param {number} [options.total] - `Deprecated`
	     * @param {boolean} [options.returnAll=false] - `Deprecated`
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     * ```js
	     * getNewAddress(seed)
	     *   .then(address => {
	     *     console.log(`Here's your new address: ${address})
	     *   })
	     *   .catch(error => {
	     *     console.log(`Something went wrong: ${error}`);
	     *   })
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {Hash|Hash[]} address - A single new address or an array of new addresses
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_SEED`: Make sure that the seed contains only trytes
	     * - `INVALID_SECURITY_LEVEL`: Make sure that the security level is a number between 1 and 3
	     * - `INVALID_START_OPTION`: Make sure that the `options.start` argument is greater than zero
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function getNewAddress(seed, options, callback) {
	        if (options === void 0) { options = {}; }
	        if (caller !== 'lib') {
	            var deprecated = [];
	            if (options.total !== undefined) {
	                deprecated.push(options.total);
	            }
	            if (options.returnAll !== undefined) {
	                deprecated.push(options.returnAll);
	            }
	            if (options.checksum !== undefined) {
	                deprecated.push(options.checksum);
	            }
	            /* tslint:disable-next-line:no-console */
	            console.warn("`GetNewAddressOptions`: " + deprecated.join(',') + " options are deprecated and will be removed in v.2.0.0. \n");
	        }
	        var _a = exports.getNewAddressOptions(options), index = _a.index, security = _a.security, total = _a.total, returnAll = _a.returnAll, checksum = _a.checksum;
	        return bluebird.resolve(guards.validate(guards.seedValidator(seed), guards.indexValidator(index), guards.securityLevelValidator(security), (!!total || total === 0) && [total, function (t) { return Number.isInteger(t) && t > 0; }, errors$1.INVALID_TOTAL_OPTION]))
	            .then(function () {
	            return total && total > 0
	                ? exports.generateAddresses(seed, index, security, total)
	                : bluebird["try"](exports.getUntilFirstUnusedAddress(isAddressUsed, seed, index, security, returnAll));
	        })
	            .then(exports.applyReturnAllOption(returnAll, total))
	            .then(exports.applyChecksumOption(checksum))
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createGetNewAddress);
	var createGetNewAddress_1 = createGetNewAddress.createIsAddressUsed;
	var createGetNewAddress_2 = createGetNewAddress.getUntilFirstUnusedAddress;
	var createGetNewAddress_3 = createGetNewAddress.generateAddresses;
	var createGetNewAddress_4 = createGetNewAddress.applyChecksumOption;
	var createGetNewAddress_5 = createGetNewAddress.applyReturnAllOption;
	var createGetNewAddress_6 = createGetNewAddress.getNewAddressOptions;
	var createGetNewAddress_7 = createGetNewAddress.createGetNewAddress;

	var createGetInputs = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;






	var defaults = {
	    start: 0,
	    end: undefined,
	    threshold: undefined,
	    security: 2
	};
	/**
	 * @method createGetInputs
	 *
	 * @summary Creates a new `getInputs()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`getInputs`]{@link #module_core.getInputs}  - A new `getInputs()` function that uses your chosen Provider instance.
	 */
	exports.createGetInputs = function (provider) {
	    var getNewAddress = createGetNewAddress.createGetNewAddress(provider, 'lib');
	    var getBalances = src$b.createGetBalances(provider);
	    /**
	     * This method generates [addresses](https://docs.iota.org/docs/getting-started/0.1/clients/addresses) for a given seed and finds those that have a positive balance.
	     *
	     * **Note:** The given seed is used to [generate addresses](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/generate-an-address) on your local device. It is never sent anywhere.
	     *
	     * To find a certain amount of [IOTA tokens](https://docs.iota.org/docs/getting-started/0.1/clients/token) and return only the addresses that, when combined, contain that amount, pass it to the `options.threshold` argument.
	     *
	     * ## Related methods
	     *
	     * You may want to use this method to find inputs for the [`prepareTransfers()`]{@link #module_core.prepareTransfers} method.
	     *
	     * @method getInputs
	     *
	     * @summary Finds a seed's addresses that have a positive balance.
	     *
	     * @memberof module:core
	     *
	     * @param {string} seed - The seed to use to generate addresses
	     * @param {Object} [options] - Options object
	     * @param {number} [options.start=0] - The key index from which to start generating addresses
	     * @param {number} [options.security=2] - The [security level](https://docs.iota.org/docs/getting-started/0.1/clients/security-levels) to use to generate the addresses
	     * @param {number} [options.end] - The key index at which to stop generating addresses
	     * @param {number} [options.threshold] - The amount of IOTA tokens that you want to find
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     *
	     * ```js
	     * getInputs(seed)
	     *   .then(({ inputs, totalBalance }) => {
	     *     console.log(`Your seed has a total of ${totalBalance} IOTA tokens \n` +
	     *     `on the following addresses:`)
	     *      for(let i = 0; i < inputs.length; i++) {
	     *          console.log(`${inputs[i].address}: ${inputs[i].balance}`)
	     *      }
	     *   })
	     *   .catch(error => {
	     *     if (error.message === errors.INSUFFICIENT_BALANCE) {
	     *        console.log('You have no IOTA tokens');
	     *     }
	     *   });
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {Inputs} - Array that contains the following:
	     * - input.addresses: An address
	     * - input.keyIndex: The key index of the address
	     * - input.security: The security level of the address
	     * - input.balance: The amount of IOTA tokens in the address
	     * - inputs.totalBalance: The combined balance of all addresses
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_SEED`: Make sure that the seed contains only trytes
	     * - `INVALID_SECURITY_LEVEL`: Make sure that the security level is a number between 1 and 3
	     * - `INVALID_START_OPTION`: Make sure that the `options.start` argument is greater than zero
	     * - `INVALID_START_END_OPTIONS`: Make sure that the `options.end` argument is not greater than the `options.start` argument by more than 1,000`
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) `
	     * - `INVALID_THRESHOLD`: Make sure that the threshold is a number greater than zero
	     * - `INSUFFICIENT_BALANCE`: Make sure that the seed has addresses that contain IOTA tokens
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function (seed, options, callback) {
	        if (options === void 0) { options = {}; }
	        var _a = exports.getInputsOptions(options), start = _a.start, end = _a.end, security = _a.security, threshold = _a.threshold;
	        return bluebird.resolve(exports.validateGetInputsOptions(seed, { start: start, end: end, security: security, threshold: threshold }))
	            .then(function () { return exports.inputsToAddressOptions({ start: start, end: end, security: security, threshold: threshold }); })
	            .then(function (newAddressOptions) { return getNewAddress(seed, newAddressOptions); })
	            .then(function (allAddresses) { return types.asArray(allAddresses); })
	            .then(function (allAddresses) {
	            return getBalances(allAddresses)
	                .then(function (_a) {
	                var balances = _a.balances;
	                return exports.createInputsObject(allAddresses, balances, start, security);
	            })
	                .then(function (res) { return exports.filterByThreshold(res, threshold); })
	                .tap(function (inputs) { return exports.hasSufficientBalance(inputs, threshold); });
	        })
	            .asCallback(callback);
	    };
	};
	exports.getInputsOptions = types.getOptionsWithDefaults(defaults);
	exports.validateGetInputsOptions = function (seed, options) {
	    var security = options.security, start = options.start, end = options.end, threshold = options.threshold;
	    return guards.validate(guards.seedValidator(seed), guards.securityLevelValidator(security), guards.startOptionValidator(start), typeof end !== undefined && guards.startEndOptionsValidator({ start: start, end: end }), !!threshold && guards.getInputsThresholdValidator(threshold));
	};
	exports.inputsToAddressOptions = function (_a) {
	    var start = _a.start, end = _a.end, security = _a.security;
	    return end
	        ? createGetNewAddress.getNewAddressOptions({ index: start, total: end - start + 1, security: security, returnAll: true })
	        : createGetNewAddress.getNewAddressOptions({ index: start, security: security, returnAll: true });
	};
	exports.createInputsObject = function (addresses, balances, start, security) {
	    var inputs = addresses
	        .map(function (address, i) { return types.makeAddress(address, balances[i], start + i, security); })
	        .filter(function (address) { return address.balance > 0; });
	    var totalBalance = inputs.reduce(function (acc, addr) { return (acc += addr.balance); }, 0);
	    return { inputs: inputs, totalBalance: totalBalance };
	};
	exports.filterByThreshold = function (_a, threshold) {
	    var inputs = _a.inputs, totalBalance = _a.totalBalance;
	    return threshold
	        ? inputs.reduce(function (acc, input) {
	            return acc.totalBalance < threshold
	                ? { inputs: acc.inputs.concat([input]), totalBalance: acc.totalBalance + input.balance }
	                : acc;
	        }, { inputs: [], totalBalance: 0 })
	        : { inputs: inputs, totalBalance: totalBalance };
	};
	exports.hasSufficientBalance = function (inputs, threshold) {
	    if (threshold && inputs.totalBalance < threshold) {
	        throw new Error(errors$1.INSUFFICIENT_BALANCE);
	    }
	    return inputs;
	};

	});

	unwrapExports(createGetInputs);
	var createGetInputs_1 = createGetInputs.createGetInputs;
	var createGetInputs_2 = createGetInputs.getInputsOptions;
	var createGetInputs_3 = createGetInputs.validateGetInputsOptions;
	var createGetInputs_4 = createGetInputs.inputsToAddressOptions;
	var createGetInputs_5 = createGetInputs.createInputsObject;
	var createGetInputs_6 = createGetInputs.filterByThreshold;
	var createGetInputs_7 = createGetInputs.hasSufficientBalance;

	var createGetTransactionObjects = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;


	/**
	 * @method createGetTransactionObjects
	 *
	 * @summary Creates a new `getTransactionObjects()` method, using a custom Provider instance.
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
	 *
	 * @return {Function} [`getTransactionObjects`]{@link #module_core.getTransactionObjects}  - A new `getTransactionObjects()` function that uses your chosen Provider instance.
	 */
	exports.createGetTransactionObjects = function (provider) {
	    var getTrytes = src$b.createGetTrytes(provider);
	    /**
	     * This method returns transaction objects in the same order as the given hashes.
	     * For example, if the node doesn't have any transactions with a given hash, the value at that index in the returned array is empty.
	     *
	     * ## Related methods
	     *
	     * To find all transaction objects in a specific bundle, use the [`getBundle()`]{@link #module_core.getBundle} method.
	     *
	     * @method getTransactionObjects
	     *
	     * @summary Searches the Tangle for transactions with the given hashes and returns their contents as objects.
	     *
	     * @memberof module:core
	     *
	     * @param {Hash[]} hashes - Array of transaction hashes
	     * @param {Function} [callback] - Optional callback function
	     *
	     * @example
	     *
	     * ```js
	     * getTransactionObjects(transactionHashes)
	     *   .then(transactionObjects => {
	     *     console.log('Found the following transactions:');
	     *     console.log(JSON.stringify(transactionObjects));
	     *   })
	     *   .catch(error => {
	     *     console.log(`Something went wrong: ${error}`);
	     *   });
	     * ```
	     *
	     * @returns {Promise}
	     *
	     * @fulfil {Transaction[]} - Array of transaction objects
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_TRANSACTION_HASH`: Make sure that the transaction hashes are 81 trytes long
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function getTransactionObjects(hashes, callback) {
	        return getTrytes(hashes)
	            .then(src$7.asTransactionObjects(hashes))
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createGetTransactionObjects);
	var createGetTransactionObjects_1 = createGetTransactionObjects.createGetTransactionObjects;

	var createIsPromotable = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;




	var MILESTONE_INTERVAL = 2 * 60 * 1000;
	var ONE_WAY_DELAY = 1 * 60 * 1000;
	var DEPTH = 6;
	exports.isAboveMaxDepth = function (attachmentTimestamp, depth) {
	    if (depth === void 0) { depth = DEPTH; }
	    return attachmentTimestamp < Date.now() && Date.now() - attachmentTimestamp < depth * MILESTONE_INTERVAL - ONE_WAY_DELAY;
	};
	/**
	 *
	 * @method createIsPromotable
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - Network provider
	 *
	 * @param {number} [depth=6] - Depth up to which promotion is effective.
	 *
	 * @return {function} {@link #module_core.isPromotable}
	 */
	exports.createIsPromotable = function (provider, depth) {
	    if (depth === void 0) { depth = DEPTH; }
	    var checkConsistency = src$b.createCheckConsistency(provider);
	    var getTrytes = src$b.createGetTrytes(provider);
	    /**
	     * To decide if a transaction can be promoted, this method makes sure that it's [consistent]{@link #module_core.checkConsistency}
	     * and that the value of the transaction's `attachmentTimestamp` field is not older than the latest 6 milestones.
	     *
	     * ## Related methods
	     *
	     * If a transaction is promotable, you can promote it by using the [`promoteTransaction()`]{@link #module_core.promoteTransaction} method.
	     *
	     * @method isPromotable
	     *
	     * @summary Checks if a given tail transaction hash can be [promoted](https://docs.iota.org/docs/getting-started/0.1/transactions/reattach-rebroadcast-promote#promote).
	     *
	     * @memberof module:core
	     *
	     * @param {Hash} tail - Tail transaction hash
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     * ```js
	     * isPromotable(tailTransactionHash)
	     *   .then(isPromotable => {
	     *     isPromotable? console.log(`${tailTransactionHash} can be promoted`):
	     *     console.log(`${tailTransactionHash} cannot be promoted. You may want to reattach it.`);
	     *   })
	     *   .catch(error => {
	     *     console.log(`Something went wrong: ${error}`);
	     *   })
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {boolean} isPromotable - Returns `true` if the transaction is promotable or `false` if not.
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hashes are 81 trytes long and their `currentIndex` field is 0
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function (tail, callback) {
	        return bluebird.resolve(guards.validate(guards.hashValidator(tail), guards.depthValidator(depth)))
	            .then(function () {
	            return bluebird.all([
	                checkConsistency(tail),
	                getTrytes([tail]).then(function (_a) {
	                    var trytes = _a[0];
	                    return src$7.asTransactionObject(trytes, tail).attachmentTimestamp;
	                }),
	            ]);
	        })
	            .then(function (_a) {
	            var isConsistent = _a[0], attachmentTimestamp = _a[1];
	            return isConsistent && exports.isAboveMaxDepth(attachmentTimestamp, depth);
	        })
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createIsPromotable);
	var createIsPromotable_1 = createIsPromotable.isAboveMaxDepth;
	var createIsPromotable_2 = createIsPromotable.createIsPromotable;

	var createIsReattachable = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	exports.__esModule = true;






	// Filters out all receiving or 0-value transactions
	// Note: Transaction value < 0 is a tx-out (spending transaction)
	var filterSpendingTransactions = function (transactions) { return transactions.filter(function (tx) { return tx.value < 0; }); };
	// Appends the confirmation status to each transaction
	var withInclusionState = function (provider, transactions) {
	    return src$b.createGetInclusionStates(provider)(transactions.map(function (tx) { return tx.hash; })).then(function (states) {
	        return transactions.map(function (tx, i) { return (__assign({}, tx, { confirmed: states[i] })); });
	    });
	};
	// Checks whether any address in the list has at least one confirmed transaction
	var hasConfirmedTxs = function (addresses, transactions) {
	    return addresses.map(function (addr) { return transactions.some(function (tx) { return !!tx.confirmed && tx.address === addr; }); });
	};
	// An address may be considered "reattachable" if it has either:
	// (A) No spending transactions, OR
	// (B) No _confirmed_ spending transactions
	exports.createIsReattachable = function (provider) {
	    var findTransactionObjects = src$b.createFindTransactionObjects(provider);
	    return function isReattachable(inputAddresses, callback) {
	        var useArray = Array.isArray(inputAddresses);
	        var inputAddressArray = types.asArray(inputAddresses);
	        var addresses;
	        /* tslint:disable-next-line:no-console */
	        console.warn('`isReattachable()` has been deprecated and will be removed in v2.0.0.');
	        return (bluebird["try"](function () {
	            // 1. Remove checksum and validate addresses
	            guards.validate(guards.arrayValidator(guards.hashValidator)(inputAddressArray, errors$1.INVALID_ADDRESS));
	            addresses = inputAddressArray.map(src$6.removeChecksum);
	            guards.validate(guards.arrayValidator(guards.hashValidator)(addresses));
	        })
	            // 2. Find all transactions for these addresses
	            .then(function () { return findTransactionObjects({ addresses: addresses }); })
	            // 3. Filter out all 0-value or receiving transactions
	            .then(filterSpendingTransactions)
	            .then(function (spendingTransactions) {
	            // 4. Case (A) Break early if no spending transactions found
	            if (spendingTransactions.length === 0) {
	                return useArray ? addresses.map(function (_) { return true; }) : true;
	            }
	            // 5. Add the inclusion state for value-transactions
	            return (withInclusionState(provider, spendingTransactions)
	                // 6. Map addresses to inclusion state
	                .then(function (txsWithInclusionState) { return hasConfirmedTxs(addresses, txsWithInclusionState); })
	                // 7. Case (B) No confirmed spending transactions found;
	                //    isReattachable === reverse inclusion state
	                .then(function (confirmedTransactions) { return confirmedTransactions.map(function (conf) { return !conf; }); })
	                .then(function (reattachable) { return (useArray ? reattachable : reattachable[0]); }));
	        })
	            .asCallback(callback));
	    };
	};

	});

	unwrapExports(createIsReattachable);
	var createIsReattachable_1 = createIsReattachable.createIsReattachable;

	var errors$9 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.ILLEGAL_LENGTH = 'Illegal trits length';
	exports.ILLEGAL_SUBSEED_INDEX = 'Illegal subseed length';
	exports.ILLEGAL_SUBSEED_LENGTH = 'Illegal subseed length';
	exports.ILLEGAL_NUMBER_OF_FRAGMENTS = 'Illegal number of fragments';
	exports.ILLEGAL_KEY_LENGTH = 'Illegal key length';
	exports.ILLEGAL_DIGESTS_LENGTH = 'Illegal digests length';
	exports.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH = 'Illegal normalized fragment length';
	exports.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH = 'Illegal signature fragment length';
	exports.ILLEGAL_BUNDLE_HASH_LENGTH = 'Illegal bundle hash length';
	exports.ILLEGAL_KEY_FRAGMENT_LENGTH = 'Illegal key fragment length';
	exports.ILLEGAL_TRIT_CONVERSION_INPUT = 'Illegal conversion input. Expected trits as Int8Array.';
	exports.ILLEGAL_TRYTE_CONVERSION_INPUT = 'Illegal conversion input. Expected trytes string or integer.';
	exports.ILLEGAL_MIN_WEIGHT_MAGNITUDE = 'Illegal minWeightMagnitude value.';
	exports.ILLEGAL_ADDRESS_LAST_TRIT = 'Illegal address. Last trit must be 0.';
	exports.ILLEGAL_ADDRESS_LENGTH = 'Illegal address length.';
	exports.ILLEGAL_BUNDLE_LENGTH = 'Illegal bundle hash length.';
	exports.ILLEGAL_OBSOLETE_TAG_LENGTH = 'Illegal obsoleteTag length.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE = 'Illegal signature or message.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH = 'Illegal signatureOrMessage length.';
	exports.ILLEGAL_TAG_LENGTH = 'Illegal tag length.';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP = 'Illegal issuance timestamp';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH = 'Illegal issuanceTimestamp length.';
	exports.ILLEGAL_VALUE_LENGTH = 'Illegal value length.';
	exports.ILLEGAL_TRANSACTION_FIELD_OFFSET = 'Illegal transaction field offset.';
	exports.ILLEGAL_TRANSACTION_FIELD_LENGTH = 'Illegal transaction field length.';
	exports.ILLEGAL_LENGTH_OR_OFFSET = 'Illegal length or offset.';
	exports.ILLEGAL_TRANSACTION_BUFFER = 'Illegal transaction buffer. Expected `Int8Array`.';
	exports.ILLEGAL_TRANSACTION_BUFFER_LENGTH = 'Illegal transaction buffer length.';
	exports.ILLEGAL_TRANSACTION_OFFSET = 'Illegal transaction offset.';
	exports.ILLEGAL_TRANSACTION_LENGTH = 'Illegal transaction length.';
	exports.ILLEGAL_TRANSACTION_ORDER = 'Illegal transaction order.';
	exports.ILLEGAL_TRANSACTION_INDEX = 'Illegal transaction index.';
	exports.ILLEGAL_SEED_LENGTH = 'Illegal seed length. Expected length of 243 trits.';
	exports.ILLEGAL_KEY_INDEX = 'Illegal key index.';
	exports.ILLEGAL_CDA_LENGTH = 'Illegal cda length.';
	exports.ILLEGAL_BATCH = 'Illegal batch.';
	exports.CDA_ALREADY_IN_STORE = 'CDA is already in store.';
	exports.ILLEGAL_PERSISTENCE_ID = 'Illegal persistence id.';
	exports.ILLEGAL_PERSISTENCE_PATH = 'Illegal persistence path.';
	exports.ILLEGAL_PADDING_LENGTH = 'Illegal padding length. Input value length exceeds padding length.';
	exports.INCONSISTENT_SUBTANGLE = 'Inconsistent subtangle';
	exports.INSUFFICIENT_BALANCE = 'Insufficient balance';
	exports.INVALID_ADDRESS = 'Invalid address';
	exports.INVALID_REMAINDER_ADDRESS = 'Invalid remainder address';
	exports.INVALID_BRANCH_TRANSACTION = 'Invalid branch transaction';
	exports.INVALID_BUNDLE = 'Invalid bundle';
	exports.INVALID_BUNDLE_HASH = 'Invalid bundle hash';
	exports.INVALID_CHECKSUM = 'Invalid checksum';
	exports.INVALID_COMMAND = 'Invalid command format';
	exports.INVALID_DEPTH = 'Invalid depth';
	exports.INVALID_HASH = 'Invalid hash';
	exports.INVALID_INDEX = 'Invalid index option';
	exports.INVALID_TOTAL_OPTION = 'Invalid total option';
	exports.INVALID_INPUT = 'Invalid input';
	exports.INVALID_KEY = 'Invalid key value';
	exports.INVALID_MIN_WEIGHT_MAGNITUDE = 'Invalid Min Weight Magnitude';
	exports.INVALID_SEARCH_KEY = 'Invalid search key';
	exports.INVALID_SECURITY_LEVEL = 'Invalid security option';
	exports.INVALID_SECURITY_OPTION = 'Invalid security option';
	exports.INVALID_SEED = 'Invalid seed';
	exports.INVALID_START_END_OPTIONS = 'Invalid end option';
	exports.INVALID_START_OPTION = 'Invalid start option';
	exports.INVALID_TAG = 'Invalid tag';
	exports.INVALID_TRANSACTION = 'Invalid transaction';
	exports.INVALID_TRANSACTION_TRYTES = 'Invalid transaction trytes';
	exports.INVALID_ATTACHED_TRYTES = 'Invalid attached trytes';
	exports.INVALID_TRANSACTION_HASH = 'Invalid transaction hash';
	exports.INVALID_TAIL_TRANSACTION = 'Invalid tail transaction';
	exports.INVALID_THRESHOLD = 'Invalid threshold option';
	exports.INVALID_TRANSFER = 'Invalid transfer array';
	exports.INVALID_TRUNK_TRANSACTION = 'Invalid trunk transaction';
	exports.INVALID_REFERENCE_HASH = 'Invalid reference hash';
	exports.INVALID_TRYTES = 'Invalid trytes';
	exports.INVALID_URI = 'Invalid uri';
	exports.INVALID_ASCII_INPUT = 'Conversion to trytes requires type of input to be encoded in ascii.';
	exports.INVALID_ODD_LENGTH = 'Conversion from trytes requires length of trytes to be even.';
	exports.INVALID_TRYTE_ENCODED_JSON = 'Invalid tryte encoded JSON message';
	exports.NOT_INT = 'One of the inputs is not integer';
	exports.SENDING_BACK_TO_INPUTS = 'One of the transaction inputs is used as output.';
	exports.INVALID_TRANSACTIONS_TO_APPROVE = 'Invalid transactions to approve.';
	exports.NO_INPUTS = 'Could not find any available inputs.';
	exports.invalidChecksum = function (address) { return "Invalid Checksum: " + address; };
	exports.inconsistentTransaction = function (reason) { return "Transaction is inconsistent. Reason: " + reason; };
	exports.INVALID_DELAY = 'Invalid delay.';

	});

	unwrapExports(errors$9);
	var errors_1$9 = errors$9.ILLEGAL_LENGTH;
	var errors_2$9 = errors$9.ILLEGAL_SUBSEED_INDEX;
	var errors_3$8 = errors$9.ILLEGAL_SUBSEED_LENGTH;
	var errors_4$8 = errors$9.ILLEGAL_NUMBER_OF_FRAGMENTS;
	var errors_5$7 = errors$9.ILLEGAL_KEY_LENGTH;
	var errors_6$7 = errors$9.ILLEGAL_DIGESTS_LENGTH;
	var errors_7$7 = errors$9.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH;
	var errors_8$7 = errors$9.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH;
	var errors_9$7 = errors$9.ILLEGAL_BUNDLE_HASH_LENGTH;
	var errors_10$7 = errors$9.ILLEGAL_KEY_FRAGMENT_LENGTH;
	var errors_11$7 = errors$9.ILLEGAL_TRIT_CONVERSION_INPUT;
	var errors_12$7 = errors$9.ILLEGAL_TRYTE_CONVERSION_INPUT;
	var errors_13$7 = errors$9.ILLEGAL_MIN_WEIGHT_MAGNITUDE;
	var errors_14$7 = errors$9.ILLEGAL_ADDRESS_LAST_TRIT;
	var errors_15$7 = errors$9.ILLEGAL_ADDRESS_LENGTH;
	var errors_16$7 = errors$9.ILLEGAL_BUNDLE_LENGTH;
	var errors_17$7 = errors$9.ILLEGAL_OBSOLETE_TAG_LENGTH;
	var errors_18$7 = errors$9.ILLEGAL_SIGNATURE_OR_MESSAGE;
	var errors_19$7 = errors$9.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH;
	var errors_20$7 = errors$9.ILLEGAL_TAG_LENGTH;
	var errors_21$7 = errors$9.ILLEGAL_ISSUANCE_TIMESTAMP;
	var errors_22$7 = errors$9.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH;
	var errors_23$7 = errors$9.ILLEGAL_VALUE_LENGTH;
	var errors_24$7 = errors$9.ILLEGAL_TRANSACTION_FIELD_OFFSET;
	var errors_25$7 = errors$9.ILLEGAL_TRANSACTION_FIELD_LENGTH;
	var errors_26$7 = errors$9.ILLEGAL_LENGTH_OR_OFFSET;
	var errors_27$7 = errors$9.ILLEGAL_TRANSACTION_BUFFER;
	var errors_28$7 = errors$9.ILLEGAL_TRANSACTION_BUFFER_LENGTH;
	var errors_29$7 = errors$9.ILLEGAL_TRANSACTION_OFFSET;
	var errors_30$7 = errors$9.ILLEGAL_TRANSACTION_LENGTH;
	var errors_31$7 = errors$9.ILLEGAL_TRANSACTION_ORDER;
	var errors_32$7 = errors$9.ILLEGAL_TRANSACTION_INDEX;
	var errors_33$7 = errors$9.ILLEGAL_SEED_LENGTH;
	var errors_34$7 = errors$9.ILLEGAL_KEY_INDEX;
	var errors_35$7 = errors$9.ILLEGAL_CDA_LENGTH;
	var errors_36$7 = errors$9.ILLEGAL_BATCH;
	var errors_37$7 = errors$9.CDA_ALREADY_IN_STORE;
	var errors_38$7 = errors$9.ILLEGAL_PERSISTENCE_ID;
	var errors_39$7 = errors$9.ILLEGAL_PERSISTENCE_PATH;
	var errors_40$7 = errors$9.ILLEGAL_PADDING_LENGTH;
	var errors_41$7 = errors$9.INCONSISTENT_SUBTANGLE;
	var errors_42$7 = errors$9.INSUFFICIENT_BALANCE;
	var errors_43$7 = errors$9.INVALID_ADDRESS;
	var errors_44$7 = errors$9.INVALID_REMAINDER_ADDRESS;
	var errors_45$7 = errors$9.INVALID_BRANCH_TRANSACTION;
	var errors_46$7 = errors$9.INVALID_BUNDLE;
	var errors_47$7 = errors$9.INVALID_BUNDLE_HASH;
	var errors_48$7 = errors$9.INVALID_CHECKSUM;
	var errors_49$7 = errors$9.INVALID_COMMAND;
	var errors_50$7 = errors$9.INVALID_DEPTH;
	var errors_51$7 = errors$9.INVALID_HASH;
	var errors_52$7 = errors$9.INVALID_INDEX;
	var errors_53$7 = errors$9.INVALID_TOTAL_OPTION;
	var errors_54$7 = errors$9.INVALID_INPUT;
	var errors_55$7 = errors$9.INVALID_KEY;
	var errors_56$7 = errors$9.INVALID_MIN_WEIGHT_MAGNITUDE;
	var errors_57$7 = errors$9.INVALID_SEARCH_KEY;
	var errors_58$7 = errors$9.INVALID_SECURITY_LEVEL;
	var errors_59$7 = errors$9.INVALID_SECURITY_OPTION;
	var errors_60$7 = errors$9.INVALID_SEED;
	var errors_61$7 = errors$9.INVALID_START_END_OPTIONS;
	var errors_62$7 = errors$9.INVALID_START_OPTION;
	var errors_63$7 = errors$9.INVALID_TAG;
	var errors_64$7 = errors$9.INVALID_TRANSACTION;
	var errors_65$7 = errors$9.INVALID_TRANSACTION_TRYTES;
	var errors_66$7 = errors$9.INVALID_ATTACHED_TRYTES;
	var errors_67$7 = errors$9.INVALID_TRANSACTION_HASH;
	var errors_68$7 = errors$9.INVALID_TAIL_TRANSACTION;
	var errors_69$7 = errors$9.INVALID_THRESHOLD;
	var errors_70$7 = errors$9.INVALID_TRANSFER;
	var errors_71$7 = errors$9.INVALID_TRUNK_TRANSACTION;
	var errors_72$7 = errors$9.INVALID_REFERENCE_HASH;
	var errors_73$7 = errors$9.INVALID_TRYTES;
	var errors_74$7 = errors$9.INVALID_URI;
	var errors_75$7 = errors$9.INVALID_ASCII_INPUT;
	var errors_76$7 = errors$9.INVALID_ODD_LENGTH;
	var errors_77$7 = errors$9.INVALID_TRYTE_ENCODED_JSON;
	var errors_78$7 = errors$9.NOT_INT;
	var errors_79$7 = errors$9.SENDING_BACK_TO_INPUTS;
	var errors_80$7 = errors$9.INVALID_TRANSACTIONS_TO_APPROVE;
	var errors_81$7 = errors$9.NO_INPUTS;
	var errors_82$7 = errors$9.invalidChecksum;
	var errors_83$7 = errors$9.inconsistentTransaction;
	var errors_84$7 = errors$9.INVALID_DELAY;

	if (!Int8Array.prototype.slice) {
	    Object.defineProperty(Int8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.subarray) {
	    Object.defineProperty(Uint8Array.prototype, 'subarray', {
	        value: Array.prototype.slice
	    });
	}
	if (!Int8Array.prototype.map) {
	    Object.defineProperty(Int8Array.prototype, 'map', {
	        value: Array.prototype.map
	    });
	}
	if (!Int8Array.prototype.every) {
	    Object.defineProperty(Int8Array.prototype, 'every', {
	        value: Array.prototype.every
	    });
	}
	if (!Int8Array.prototype.some) {
	    Object.defineProperty(Uint8Array.prototype, 'some', {
	        value: Array.prototype.some
	    });
	}
	if (!Int8Array.prototype.indexOf) {
	    Object.defineProperty(Int8Array.prototype, 'indexOf', {
	        value: Array.prototype.indexOf
	    });
	}
	// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Polyfill
	// Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/
	if (!Int8Array.prototype.fill) {
	    Object.defineProperty(Int8Array.prototype, 'fill', {
	        value: function (input) {
	            // Steps 1-2.
	            if (this == null) {
	                throw new TypeError('this is null or not defined');
	            }
	            var O = Object(this);
	            // Steps 3-5.
	            var len = O.length >>> 0;
	            // Steps 6-7.
	            var start = arguments[1];
	            var relativeStart = start >> 0;
	            // Step 8.
	            var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
	            // Steps 9-10.
	            var end = arguments[2];
	            var relativeEnd = end === undefined ? len : end >> 0;
	            // Step 11.
	            var last = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
	            // Step 12.
	            while (k < last) {
	                O[k] = input;
	                k++;
	            }
	            // Step 13.
	            return O;
	        }
	    });
	}
	if (!Uint32Array.prototype.slice) {
	    Object.defineProperty(Uint8Array.prototype, 'slice', {
	        value: Array.prototype.slice
	    });
	}
	if (!Uint32Array.prototype.reverse) {
	    Object.defineProperty(Uint8Array.prototype, 'reverse', {
	        value: Array.prototype.reverse
	    });
	}

	var src$9 = createCommonjsModule(function (module, exports) {
	/** @module bundle */
	exports.__esModule = true;






	/**
	 * @method createBundle
	 *
	 * @summary Creates a bundle array from the given transaction entries.
	 *
	 * @param {BundleEntry[]} [entries=[]] - Entries of single or multiple transactions with the same address
	 *
	 * @return {Int8Array[]} List of transactions in the bundle
	 */
	exports.createBundle = function (entries) {
	    if (entries === void 0) { entries = []; }
	    return entries.reduce(function (bundle, entry) { return exports.addEntry(bundle, entry); }, new Int8Array(0));
	};
	/**
	 * Adds transaction trits in the given entry object to a given bundle array.
	 *
	 * ## Related methods
	 *
	 * See the [converter](https://github.com/iotaledger/iota.js/tree/next/packages/converter) package for methods that convert values to trits.
	 *
	 * @method addEntry
	 *
	 * @summary Adds the given transaction entry to a bundle array.
	 *
	 * @memberof module:bundle
	 *
	 * @param {object} entry - Transaction entry object
	 * @param {Int8Array} entry.address - An address in trits
	 * @param {Int8Array} entry.value - An amount of IOTA tokens in trits
	 * @param {Int8Array} [entry.signatureOrMessage] - Signature fragments or a message in trits
	 * @param {Int8Array} [entry.issuanceTimestamp] - Unix epoch in trits
	 * @param {Int8Array} [entry.tag] - (deprecated)
	 * @param {Int8Array} bundle - Bundle array to which to add the entry object
	 *
	 * @example
	 * ```js
	 * let bundle = new Int8Array();
	 *
	 * bundle = Bundle.addEntry(bundle, {
	 *  address: Converter.trytesToTrits(outputAddress),
	 *  value: Converter.valueToTrits(value),
	 *  issuanceTimestamp: Converter.valueToTrits(Math.floor(Date.now() / 1000));
	 * });
	 * ```
	 *
	 * @return {Int8Array} A copy of the original bundle that also includes the added entries.
	 *
	 * @throws {errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH}: Make sure that the `bundle` argument contains valid transaction trits
	 * @throws {errors.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH}: Make sure that the `entry.signatureOrMessage` argument contains 6,561 trits
	 * @throws {errors.ILLEGAL_ADDRESS_LENGTH}: Make sure that the `entry.address` argument contains 243 trits
	 * @throws {errors.ILLEGAL_VALUE_LENGTH}: Make sure that the `entry.value` argument contains 6,561 trits
	 * @throws {errors.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH}: Make sure that the `entry.timestamp` argument contains 81 trits
	 */
	exports.addEntry = function (bundle, entry) {
	    var signatureOrMessage = entry.signatureOrMessage, 
	    // extraDataDigest,
	    address = entry.address, value = entry.value, obsoleteTag = entry.obsoleteTag, issuanceTimestamp = entry.issuanceTimestamp, tag = entry.tag;
	    /*
	    warning(
	        signatureOrMessage && !isNullTrits(signatureOrMessage),
	        'Deprecation warning: \n' +
	            ' - Use of "signatureOrMessage" field before bundle finalization is deprecated and will be removed in v1.0.0. \n'
	    )

	    warning(
	        obsoleteTag && !isNullTrits(obsoleteTag),
	        'Deprecation warning: \n' +
	            ' - "obseleteTag" field is deprecated and will be removed in implementation of final design. \n' +
	            ' - Use of "obsoleteTag" or "tag" field before bundle finalization is deprecated and will be removed in v1.0.0. \n'
	    )

	    warning(
	        tag && !isNullTrits(tag),
	        'Deprecation warning: \n' +
	            ' - Use of "tag" field before bundle finalization is deprecated and will be removed in v1.0.0. \n'
	    )
	    */
	    if (!src$5.isMultipleOfTransactionLength(bundle.length)) {
	        throw new RangeError(errors$9.ILLEGAL_TRANSACTION_BUFFER_LENGTH);
	    }
	    if (signatureOrMessage &&
	        (signatureOrMessage.length === 0 || signatureOrMessage.length % src$5.SIGNATURE_OR_MESSAGE_LENGTH !== 0)) {
	        throw new RangeError(errors$9.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH);
	    }
	    if (address && address.length !== src$5.ADDRESS_LENGTH) {
	        throw new RangeError(errors$9.ILLEGAL_ADDRESS_LENGTH);
	    }
	    if (value && value.length > src$5.VALUE_LENGTH) {
	        throw new RangeError(errors$9.ILLEGAL_VALUE_LENGTH);
	    }
	    if (obsoleteTag && obsoleteTag.length > src$5.OBSOLETE_TAG_LENGTH) {
	        throw new RangeError(errors$9.ILLEGAL_OBSOLETE_TAG_LENGTH);
	    }
	    if (issuanceTimestamp && issuanceTimestamp.length > src$5.ISSUANCE_TIMESTAMP_LENGTH) {
	        throw new RangeError(errors$9.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH);
	    }
	    if (tag && tag.length > src$5.TAG_LENGTH) {
	        throw new RangeError(errors$9.ILLEGAL_TAG_LENGTH);
	    }
	    var signatureOrMessageCopy = signatureOrMessage
	        ? signatureOrMessage.slice()
	        : new Int8Array(src$5.SIGNATURE_OR_MESSAGE_LENGTH);
	    var numberOfFragments = signatureOrMessageCopy.length / src$5.SIGNATURE_OR_MESSAGE_LENGTH;
	    var bundleCopy = new Int8Array(bundle.length + numberOfFragments * src$5.TRANSACTION_LENGTH);
	    var currentIndexBuffer = bundle.length > 0 ? src$4.increment(src$5.lastIndex(bundle)) : new Int8Array(src$5.LAST_INDEX_LENGTH);
	    var lastIndexBuffer = currentIndexBuffer.slice();
	    var fragmentIndex = 0;
	    bundleCopy.set(bundle.slice());
	    // Create and append transactions to the bundle.
	    for (var offset = bundle.length; offset < bundleCopy.length; offset += src$5.TRANSACTION_LENGTH) {
	        var signatureOrMessageCopyFragment = signatureOrMessageCopy.subarray(fragmentIndex * src$5.SIGNATURE_OR_MESSAGE_LENGTH, (fragmentIndex + 1) * src$5.SIGNATURE_OR_MESSAGE_LENGTH);
	        bundleCopy.set(signatureOrMessageCopyFragment, offset + src$5.SIGNATURE_OR_MESSAGE_OFFSET);
	        if (address) {
	            bundleCopy.set(address, offset + src$5.ADDRESS_OFFSET);
	        }
	        if (value && fragmentIndex === 0) {
	            bundleCopy.set(value, offset + src$5.VALUE_OFFSET);
	        }
	        if (obsoleteTag) {
	            bundleCopy.set(obsoleteTag, offset + src$5.OBSOLETE_TAG_OFFSET);
	        }
	        if (issuanceTimestamp) {
	            bundleCopy.set(issuanceTimestamp, offset + src$5.ISSUANCE_TIMESTAMP_OFFSET);
	        }
	        bundleCopy.set(currentIndexBuffer, offset + src$5.CURRENT_INDEX_OFFSET);
	        if (tag) {
	            bundleCopy.set(tag, offset + src$5.TAG_OFFSET);
	        }
	        lastIndexBuffer.set(currentIndexBuffer.slice());
	        currentIndexBuffer.set(src$4.increment(currentIndexBuffer));
	        fragmentIndex++;
	    }
	    for (var offset = src$5.LAST_INDEX_OFFSET; offset < bundleCopy.length; offset += src$5.TRANSACTION_LENGTH) {
	        bundleCopy.set(lastIndexBuffer, offset);
	    }
	    return bundleCopy;
	};
	/**
	 * This method takes an array of transaction trits, generates the bundle hash, and adds it to each transaction.
	 *
	 * ## Related methods
	 *
	 * See the [`addEntry()`]{@link #module_bundle.addEntry} method for creating new bundles.
	 *
	 * @method finalizeBundle
	 *
	 * @summary Generates a bundle hash.
	 *
	 * @memberof module:bundle
	 *
	 * @param {Int8Array} bundle - Transaction trits
	 *
	 * @example
	 * ```js
	 * const result = Bundle.finalizeBundle(bundle);
	 * ```
	 *
	 * @return {Int8Array} Transaction trits that include a bundle hash
	 *
	 * @throws {errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH}: Make sure that the `bundle` argument contains valid transaction trits
	 */
	exports.finalizeBundle = function (bundle, numberOfFragments) {
	    if (numberOfFragments === void 0) { numberOfFragments = 3; }
	    if (!src$5.isMultipleOfTransactionLength(bundle.length)) {
	        throw new Error(errors$9.ILLEGAL_TRANSACTION_BUFFER_LENGTH);
	    }
	    var sponge = new src$2["default"]();
	    var bundleCopy = bundle.slice();
	    var bundleHash = new Int8Array(src$5.BUNDLE_LENGTH);
	    // This block recomputes bundle hash by incrementing `obsoleteTag` field of first transaction in the bundle.
	    // Normalized bundle should NOT contain value `13`.
	    while (true) {
	        // Absorb essence trits to squeeze bundle hash.
	        for (var offset = 0; offset < bundle.length; offset += src$5.TRANSACTION_LENGTH) {
	            sponge.absorb(src$5.transactionEssence(bundleCopy, offset), 0, src$5.TRANSACTION_ESSENCE_LENGTH);
	        }
	        // Set new bundle hash value.
	        sponge.squeeze(bundleHash, 0, src$5.BUNDLE_LENGTH);
	        // Stop mutation if essence results to secure bundle.
	        if (src$4.normalizedBundle(bundleHash).slice(0, numberOfFragments * src$4.NORMALIZED_FRAGMENT_LENGTH).indexOf(src$4.MAX_TRYTE_VALUE /* 13 */) === -1) {
	            // Essence results to secure bundle.
	            break;
	        }
	        // Essence results to insecure bundle. (Normalized bundle hash contains value `13`.)
	        bundleCopy.set(src$4.increment(bundleCopy.subarray(src$5.OBSOLETE_TAG_OFFSET, src$5.OBSOLETE_TAG_OFFSET + src$5.OBSOLETE_TAG_LENGTH)), src$5.OBSOLETE_TAG_OFFSET);
	        sponge.reset();
	    }
	    // Set bundle field of each transaction.
	    for (var offset = src$5.BUNDLE_OFFSET; offset < bundle.length; offset += src$5.TRANSACTION_LENGTH) {
	        bundleCopy.set(bundleHash, offset);
	    }
	    return bundleCopy;
	};
	/**
	 * This method takes an array of transaction trits, and add the given message or signature to the transactions, starting from the given index.
	 *
	 * If the signature or message is too long to fit in a single transaction, it is split across the next transaction in the bundle, starting from the given index.
	 *
	 * ## Related methods
	 *
	 * See the [`addEntry()`]{@link #module_bundle.addEntry} method for creating new bundles.
	 *
	 * @method addSignatureOrMessage
	 *
	 * @summary Adds signature message fragments to transactions in a bundle.
	 *
	 * @memberof module:bundle
	 *
	 * @param {Int8Array} bundle - Transaction trits
	 * @param {Int8Array} signatureOrMessage - Signature or message to add to the bundle
	 * @param {number} index - Transaction index at which to start adding the signature or message
	 *
	 * @example
	 * ```js
	 * const signature = Converter.trytesToTrits('SIGNATURE...')
	 * bundle.set(Bundle.addSignatureOrMessage(bundle, signature, 1));
	 * ```
	 *
	 * @return {Int8Array} Transaction trits that include a bundle hash.
	 *
	 * @throws {errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH}: Make sure that the `bundle` argument contains valid transaction trits
	 * @throws {errors.ILLEGAL_TRANSACTION_INDEX}: Make sure that the `index` argument is a number and that the bundle contains enough transactions
	 * @throws {errors.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH}: Make sure that the `signatureOrMessage` argument contains at least 6,561 trits
	 *
	 */
	exports.addSignatureOrMessage = function (bundle, signatureOrMessage, index) {
	    if (!src$5.isMultipleOfTransactionLength(bundle.length)) {
	        throw new Error(errors$9.ILLEGAL_TRANSACTION_BUFFER_LENGTH);
	    }
	    if (!Number.isInteger(index)) {
	        throw new TypeError(errors$9.ILLEGAL_TRANSACTION_INDEX);
	    }
	    if (signatureOrMessage.length === 0 || signatureOrMessage.length % src$5.SIGNATURE_OR_MESSAGE_LENGTH !== 0) {
	        throw new RangeError(errors$9.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH);
	    }
	    if (index < 0 || bundle.length - index - signatureOrMessage.length / src$5.SIGNATURE_OR_MESSAGE_LENGTH < 0) {
	        throw new RangeError(errors$9.ILLEGAL_TRANSACTION_INDEX);
	    }
	    var bundleCopy = bundle.slice();
	    var numberOfFragmentsToAdd = signatureOrMessage.length / src$5.SIGNATURE_OR_MESSAGE_LENGTH;
	    for (var i = 0; i < numberOfFragmentsToAdd; i++) {
	        bundleCopy.set(signatureOrMessage.slice(i * src$5.SIGNATURE_OR_MESSAGE_LENGTH, (i + 1) * src$5.SIGNATURE_OR_MESSAGE_LENGTH), (index + i) * src$5.TRANSACTION_LENGTH + src$5.SIGNATURE_OR_MESSAGE_OFFSET);
	    }
	    return bundleCopy;
	};
	exports.valueSum = function (buffer, offset, length) {
	    if (!src$5.isMultipleOfTransactionLength(buffer.length)) {
	        throw new RangeError(errors$9.ILLEGAL_TRANSACTION_BUFFER_LENGTH);
	    }
	    if (!Number.isInteger(offset)) {
	        throw new TypeError(errors$9.ILLEGAL_TRANSACTION_OFFSET);
	    }
	    if (!src$5.isMultipleOfTransactionLength(offset)) {
	        throw new RangeError(errors$9.ILLEGAL_TRANSACTION_OFFSET);
	    }
	    if (!Number.isInteger(length)) {
	        throw new TypeError(errors$9.ILLEGAL_BUNDLE_LENGTH);
	    }
	    if (!src$5.isMultipleOfTransactionLength(length)) {
	        throw new RangeError(errors$9.ILLEGAL_BUNDLE_LENGTH);
	    }
	    var sum = 0;
	    for (var bundleOffset = 0; bundleOffset < length; bundleOffset += src$5.TRANSACTION_LENGTH) {
	        sum += src.tritsToValue(src$5.value(buffer, offset + bundleOffset));
	    }
	    return sum;
	};

	});

	unwrapExports(src$9);
	var src_1$7 = src$9.createBundle;
	var src_2$7 = src$9.addEntry;
	var src_3$6 = src$9.finalizeBundle;
	var src_4$5 = src$9.addSignatureOrMessage;
	var src_5$3 = src$9.valueSum;

	var utils = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.asyncPipe = function () {
	    var fns = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        fns[_i] = arguments[_i];
	    }
	    return function (x) { return fns.reduce(function (m, f) { return m.then(f); }, x); };
	};

	});

	unwrapExports(utils);
	var utils_1 = utils.asyncPipe;

	var hmac$1 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;



	var HMAC_ROUNDS = 27;
	function addHMAC(transactions, key) {
	    var curl = new src$1["default"](HMAC_ROUNDS);
	    var hmac = new Int8Array(src$1["default"].HASH_LENGTH);
	    curl.initialize();
	    curl.absorb(key, 0, src$1["default"].HASH_LENGTH);
	    curl.absorb(src$5.bundle(transactions), 0, src$1["default"].HASH_LENGTH);
	    curl.squeeze(hmac, 0, src$1["default"].HASH_LENGTH);
	    var transactionsCopy = transactions.slice();
	    for (var offset = 0; offset < transactionsCopy.length; offset += src$5.TRANSACTION_LENGTH) {
	        if (src.tritsToValue(src$5.value(transactions, offset)) > 0) {
	            transactionsCopy.set(hmac, offset + src$5.SIGNATURE_OR_MESSAGE_OFFSET);
	        }
	    }
	    return transactionsCopy;
	}
	exports["default"] = addHMAC;

	});

	unwrapExports(hmac$1);

	var createPrepareTransfers = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	exports.__esModule = true;












	var HASH_LENGTH = 81;
	var NULL_HASH_TRYTES = '9'.repeat(HASH_LENGTH);
	var SECURITY_LEVEL = 2;
	var defaults = {
	    inputs: [],
	    address: undefined,
	    remainderAddress: undefined,
	    security: 2,
	    hmacKey: undefined
	};
	var isTritArray = function (tritArray, length) {
	    return (tritArray instanceof Array || tritArray instanceof Int8Array) &&
	        typeof tritArray.every === 'function' &&
	        tritArray.every(function (trit) { return [-1, 0, 1].indexOf(trit) > -1; }) &&
	        (typeof length === 'number' ? tritArray.length === length : true);
	};
	exports.getPrepareTransfersOptions = function (options) { return (__assign({}, types.getOptionsWithDefaults(defaults)(options), { remainderAddress: options.address || options.remainderAddress || undefined })); };
	/**
	 *
	 * @method createPrepareTransfers
	 *
	 * @summary Creates a new `prepareTransfers()` method.
	 *
	 * @memberof module:core
	 *
	 * @param {Provider} [provider] - Optional provider object that the method should use to call the node's API endpoints.
	 * To create transactions offline, omit this parameter so that the returned function does not get your addresses and balances from the node. To create value transactions offline, make sure to pass input objects and a remainder address to the returned function.
	 *
	 * @example
	 * ```js
	 * const prepareTransfers = Iota.createPrepareTransfers();
	 *
	 * const transfers = [
	 *  {
	 *    value: 1,
	 *    address: 'RECEIVINGADDRESS...'
	 *  }
	 * ];
	 *
	 * prepareTransfers(seed, transfers, {
	 *  inputs:[{address: 'ADDRESS...',
	 *  keyIndex: 5,
	 *  security: 2,
	 *  balance: 50}],
	 *  // Remainder will be 50 -1 = 49 IOTA tokens
	 *  address: 'REMAINDERADDRESS...'
	 * })
	 * .then(bundleTrytes => {
	 *  console.log('Bundle trytes are ready to be attached to the Tangle:');
	 *  console.log(JSON.stringify(bundleTrytes));
	 * })
	 * .catch(error => {
	 *  console.log(`Something went wrong: ${error}`);
	 * });
	 * ```
	 *
	 * @return {Function} [`prepareTransfers`]{@link #module_core.prepareTransfers}  - A new `prepareTransfers()` function that uses your chosen Provider instance.
	 */
	exports.createPrepareTransfers = function (provider, now, caller) {
	    if (now === void 0) { now = function () { return Date.now(); }; }
	    var addInputs = exports.createAddInputs(provider);
	    var addRemainder = exports.createAddRemainder(provider);
	    /**
	     * This method creates a bundle, using the given arguments and uses the given seed to sign any transactions that withdraw IOTA tokens.
	     *
	     * **Note:** The given seed is used to [generate addresses](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/generate-an-address) and sign transactions on your local device. It is never sent anywhere.
	     *
	     * **Note:** To create transactions offline, use the [`createPrepareTransfers`]{@link #module_core.createPrepareTransfers} without a `provider` argument.
	     *
	     * After calling this method, we recommend saving the returned transaction trytes in local storage before sending them to a node.
	     * By doing so, you make sure that you can always reattach your transactions to the Tangle in case they remain in a pending state.
	     * Reattaching transactions is safer than creating and signing new transactions, which could lead to [spent addresses](https://docs.iota.org/docs/getting-started/0.1/clients/addresses#spent-addresses).
	     *
	     * ## Related methods
	     *
	     * To attach the returned transaction trytes to the Tangle, you can use one of the following:
	     *
	     * - [`sendTrytes()`]{@link #module_core.sendTrytes} (easiest)
	     * - [`getTransactionsToApprove()`]{@link #module_core.getTransactionsToApprove} followed by [`attachToTangle()`]{@link #module_core.attachToTangle} followed by [`broadcastTransactions()`]{@link #module_core.broadcastTransactions} (for more control)
	     *
	     * @method prepareTransfers
	     *
	     * @summary Creates and signs a bundle of valid transaction trytes, using the given arguments.
	     *
	     * @memberof module:core
	     *
	     * @param {string} seed - The seed to use to generate addresses and sign transactions
	     *
	     * @param {Transfers.<Transfer>} transfers - Array of transfer objects
	     * @param {Hash} transfer.address - Address to which to send a transaction
	     * @param {number} transfer.value - Amount of IOTA tokens to send to the address
	     * @param {string} transfer.message - Message to include in the transaction. The message must include only ASCII characters.
	     * @param {string} transfer.tag - Up to 27 trytes to include in the transaction's `obsoleteTag` field
	     * @param {Object} [options] - Options object
	     * @param {Input[]} [options.inputs] Array of input objects, which contain information about the addresses from which to withdraw IOTA tokens
	     * @param {Hash} [options.inputs[].address] One of the seed's addresses from which to withdraw IOTA tokens
	     * @param {number} [options.inputs[].keyIndex] Key index of the address
	     * @param {number} [options.inputs[].security] Security level of the address
	     * @param {number} [options.inputs[].balance] Total balance of the address. The total balance is withdrawn and any remaining IOTA tokens are sent to the address in the `options.remainderAddress` field.
	     * @param {Hash} [options.remainderAddress] Remainder address to send any remaining IOTA tokens (total value in the `transfers` array minus the total balance of the input addresses)
	     * @param {number} [options.security=2] Security level to use for calling the [`getInputs`]{@link #module_core.getInputs} method to automatically select input objects
	     * @property {Hash} [options.hmacKey] HMAC key used for adding an HMAC signature to the transaction
	     *
	     * @param {function} [callback] Optional callback function
	     *
	     * @example
	     *
	     * ```js
	     *
	     * const transfers = [
	     *  {
	     *    value: 1,
	     *    address: 'RECEIVINGADDRESS...'
	     *  }
	     * ];
	     *
	     * prepareTransfers(seed, transfers)
	     * .then(bundleTrytes => {
	     *  console.log('Bundle trytes are ready to be attached to the Tangle:');
	     *  console.log(JSON.stringify(bundleTrytes));
	     * })
	     * .catch(error => {
	     *  console.log(`Something went wrong: ${error}`);
	     * });
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {array} bundleTrytes - Array of transaction trytes
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_SEED`: Make sure that the seed contains only trytes
	     * - `INVALID_TRANSFER_ARRAY`: Make sure that any objects in the `transfers` argument are valid (for example that the addresses contain only trytes, the values are numbers)
	     * - `INVALID_INPUT`: Make sure that the `options.inputs[]` argument contains valid input objects
	     * - `INVALID_REMAINDER_ADDRESS`: If you used the `createPrepareTransfers()` method without a provider, make sure you entered an address in the `options.remainderAddress` argument
	     * - `INSUFFICIENT_BALANCE`: Make sure that the seed's addresses have enough IOTA tokens to complete the transfer
	     * - `NO_INPUTS`: Make sure that the `options.inputs[]` argument contains valid input objects
	     * - `SENDING_BACK_TO_INPUTS`: Make sure that none of the `transfer.address` arguments are in the `options.inputs[].address parameters
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function prepareTransfers(seed, transfers, options, callback) {
	        if (options === void 0) { options = {}; }
	        if (caller !== 'lib') {
	            if (options.address) {
	                /* tslint:disable-next-line:no-console */
	                console.warn('`options.address` is deprecated and will be removed in v2.0.0. Use `options.remainderAddress` instead.');
	            }
	            if (typeof seed === 'string' ? guards.isTrytes(seed) && seed.length < 81 : isTritArray(seed) && seed.length < 243) {
	                /* tslint:disable-next-line:no-console */
	                console.warn('WARNING: Seeds that are less than 81 trytes long are not secure! Generate a random, 81-trytes seed!');
	            }
	        }
	        if (!guards.isTrytes(seed) && !isTritArray(seed)) {
	            throw new Error(errors$1.INVALID_SEED);
	        }
	        var props = bluebird.resolve(exports.validatePrepareTransfers(__assign({ transactions: new Int8Array(0), trytes: [], seed: typeof seed === 'string' ? src.trytesToTrits(seed) : new Int8Array(seed), transfers: transfers, timestamp: Math.floor((typeof now === 'function' ? now() : Date.now()) / 1000) }, exports.getPrepareTransfersOptions(options))));
	        return utils.asyncPipe(exports.addHMACPlaceholder, exports.addTransfers, addInputs, addRemainder, exports.verifyNotSendingToInputs, exports.finalize, exports.addSignatures, exports.addHMAC, exports.asTransactionTrytes)(props)
	            .then(function (res) { return res.trytes; })
	            .asCallback(callback);
	    };
	};
	exports.validatePrepareTransfers = function (props) {
	    var transfers = props.transfers, inputs = props.inputs, security = props.security;
	    var remainderAddress = props.address || props.remainderAddress;
	    guards.validate(guards.securityLevelValidator(security), guards.arrayValidator(guards.transferValidator)(transfers), !!remainderAddress && guards.remainderAddressValidator(remainderAddress), inputs.length > 0 && guards.arrayValidator(guards.inputValidator)(inputs));
	    return props;
	};
	exports.addHMACPlaceholder = function (props) {
	    var hmacKey = props.hmacKey, transfers = props.transfers;
	    return hmacKey
	        ? __assign({}, props, { transfers: transfers.map(function (transfer, i) {
	                return transfer.value > 0
	                    ? __assign({}, transfer, { message: NULL_HASH_TRYTES + (transfer.message || '') }) : transfer;
	            }) }) : props;
	};
	exports.addTransfers = function (props) {
	    var transactions = props.transactions, transfers = props.transfers, timestamp = props.timestamp;
	    return __assign({}, props, { transactions: transfers.reduce(function (acc, transfer) {
	            var messageTrits = src.trytesToTrits(transfer.message || '');
	            var signatureOrMessage = new Int8Array((1 + Math.floor(messageTrits.length / src$5.SIGNATURE_OR_MESSAGE_LENGTH)) * src$5.SIGNATURE_OR_MESSAGE_LENGTH);
	            signatureOrMessage.set(messageTrits, src$5.SIGNATURE_OR_MESSAGE_OFFSET);
	            return src$9.addEntry(acc, {
	                signatureOrMessage: signatureOrMessage,
	                address: src.trytesToTrits(src$6.removeChecksum(transfer.address)),
	                value: src.valueToTrits(transfer.value),
	                obsoleteTag: src.trytesToTrits(transfer.tag || ''),
	                issuanceTimestamp: src.valueToTrits(timestamp),
	                tag: src.trytesToTrits(transfer.tag || '')
	            });
	        }, transactions) });
	};
	exports.createAddInputs = function (provider) {
	    var getInputs = provider ? src$b.createGetInputs(provider) : undefined;
	    return function (props) {
	        var transactions = props.transactions, transfers = props.transfers, inputs = props.inputs, timestamp = props.timestamp, seed = props.seed, security = props.security;
	        var threshold = transfers.reduce(function (sum, transfer) { return (sum += transfer.value); }, 0);
	        if (threshold === 0) {
	            return bluebird.resolve(props);
	        }
	        if (inputs.length && threshold > inputs.reduce(function (acc, input) { return (acc += input.balance); }, 0)) {
	            throw new Error(inputs.length ? errors$1.INSUFFICIENT_BALANCE : errors$1.NO_INPUTS);
	        }
	        return (!getInputs || inputs.length
	            ? bluebird.resolve(inputs)
	            : getInputs(src.tritsToTrytes(seed), { security: security, threshold: threshold }).then(function (response) { return response.inputs; })).then(function (res) { return (__assign({}, props, { inputs: res, transactions: res.reduce(function (acc, input) {
	                return src$9.addEntry(acc, {
	                    signatureOrMessage: new Int8Array(input.security * src$5.SIGNATURE_OR_MESSAGE_LENGTH),
	                    address: src.trytesToTrits(src$6.removeChecksum(input.address)),
	                    value: src.valueToTrits(-input.balance),
	                    issuanceTimestamp: src.valueToTrits(timestamp)
	                });
	            }, transactions) })); });
	    };
	};
	exports.createAddRemainder = function (provider) {
	    var getNewAddress = provider ? src$b.createGetNewAddress(provider, 'lib') : undefined;
	    return function (props) {
	        var transactions = props.transactions, remainderAddress = props.remainderAddress, seed = props.seed, security = props.security, inputs = props.inputs, timestamp = props.timestamp;
	        // Values of transactions in the bundle should sum up to 0.
	        var sum = src$9.valueSum(transactions, 0, transactions.length);
	        // Value > 0 indicates insufficient balance in inputs.
	        if (sum > 0) {
	            throw new Error(errors$1.INSUFFICIENT_BALANCE);
	        }
	        // If value is already zero no remainder is required
	        if (sum === 0) {
	            return props;
	        }
	        if (!provider && !remainderAddress) {
	            throw new Error(errors$1.INVALID_REMAINDER_ADDRESS);
	        }
	        return (remainderAddress
	            ? bluebird.resolve(remainderAddress)
	            : getNewAddress(src.tritsToTrytes(seed), {
	                index: exports.getRemainderAddressStartIndex(inputs),
	                security: security
	            })).then(function (addresses) {
	            var addressTrytes = types.asArray(addresses)[0];
	            return __assign({}, props, { remainderAddress: addressTrytes, transactions: src$9.addEntry(transactions, {
	                    signatureOrMessage: new Int8Array(src$5.SIGNATURE_OR_MESSAGE_LENGTH),
	                    address: src.trytesToTrits(addressTrytes),
	                    value: src.valueToTrits(Math.abs(sum)),
	                    issuanceTimestamp: src.valueToTrits(timestamp)
	                }) });
	        });
	    };
	};
	exports.getRemainderAddressStartIndex = function (inputs) {
	    return inputs.slice().sort(function (a, b) { return b.keyIndex - a.keyIndex; })[0].keyIndex + 1;
	};
	exports.verifyNotSendingToInputs = function (props) {
	    var transactions = props.transactions;
	    for (var offset = 0; offset < transactions.length; offset += src$5.TRANSACTION_LENGTH) {
	        if (src.tritsToValue(src$5.value(transactions, offset)) < 0) {
	            for (var jOffset = 0; jOffset < transactions.length; jOffset += src$5.TRANSACTION_LENGTH) {
	                if (jOffset !== offset) {
	                    if (src.tritsToValue(src$5.value(transactions, jOffset)) > 0 &&
	                        src.tritsToTrytes(src$5.address(transactions, jOffset)) === src.tritsToTrytes(src$5.address(transactions, offset))) {
	                        throw new Error(errors$1.SENDING_BACK_TO_INPUTS);
	                    }
	                }
	            }
	        }
	    }
	    return props;
	};
	exports.finalize = function (props) { return (__assign({}, props, { transactions: src$9.finalizeBundle(props.transactions) })); };
	exports.addSignatures = function (props) {
	    var transactions = props.transactions, inputs = props.inputs, seed = props.seed, nativeGenerateSignatureFunction = props.nativeGenerateSignatureFunction;
	    var signatureIndex;
	    for (var i = 0; i < transactions.length / src$5.TRANSACTION_LENGTH; i++) {
	        if (src.tritsToValue(src$5.value(transactions, i * src$5.TRANSACTION_LENGTH)) < 0) {
	            signatureIndex = i;
	            break;
	        }
	    }
	    return bluebird.all(inputs.map(function (_a) {
	        var keyIndex = _a.keyIndex, security = _a.security;
	        return src$4.signatureFragments(seed, keyIndex, security || SECURITY_LEVEL, src$5.bundle(transactions), nativeGenerateSignatureFunction);
	    })).then(function (signatures) { return (__assign({}, props, { transactions: signatures.reduce(function (acc, signature) {
	            var transactionsCopy = src$9.addSignatureOrMessage(acc, signature, signatureIndex);
	            signatureIndex += signature.length / src$5.SIGNATURE_OR_MESSAGE_LENGTH;
	            return transactionsCopy;
	        }, transactions) })); });
	};
	exports.addHMAC = function (props) {
	    var hmacKey = props.hmacKey, transactions = props.transactions;
	    return hmacKey ? __assign({}, props, { transactions: hmac$1["default"](transactions, src.trytesToTrits(hmacKey)) }) : props;
	};
	exports.asTransactionTrytes = function (props) {
	    var transactions = props.transactions;
	    var trytes = [];
	    for (var offset = 0; offset < transactions.length; offset += src$5.TRANSACTION_LENGTH) {
	        trytes.push(src.tritsToTrytes(transactions.subarray(offset, offset + src$5.TRANSACTION_LENGTH)));
	    }
	    return __assign({}, props, { trytes: trytes.reverse().slice() });
	};

	});

	unwrapExports(createPrepareTransfers);
	var createPrepareTransfers_1 = createPrepareTransfers.getPrepareTransfersOptions;
	var createPrepareTransfers_2 = createPrepareTransfers.createPrepareTransfers;
	var createPrepareTransfers_3 = createPrepareTransfers.validatePrepareTransfers;
	var createPrepareTransfers_4 = createPrepareTransfers.addHMACPlaceholder;
	var createPrepareTransfers_5 = createPrepareTransfers.addTransfers;
	var createPrepareTransfers_6 = createPrepareTransfers.createAddInputs;
	var createPrepareTransfers_7 = createPrepareTransfers.createAddRemainder;
	var createPrepareTransfers_8 = createPrepareTransfers.getRemainderAddressStartIndex;
	var createPrepareTransfers_9 = createPrepareTransfers.verifyNotSendingToInputs;
	var createPrepareTransfers_10 = createPrepareTransfers.finalize;
	var createPrepareTransfers_11 = createPrepareTransfers.addSignatures;
	var createPrepareTransfers_12 = createPrepareTransfers.addHMAC;
	var createPrepareTransfers_13 = createPrepareTransfers.asTransactionTrytes;

	var createSendTransfer = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;




	exports.createSendTransfer = function (provider, attachFn) {
	    var prepareTransfers = src$b.createPrepareTransfers(provider);
	    var sendTrytes = src$b.createSendTrytes(provider, attachFn);
	    return function sendTransfer(seed, depth, minWeightMagnitude, transfers, options, callback) {
	        // If no options provided, switch arguments
	        if (options && typeof options === 'function') {
	            callback = options;
	            options = createPrepareTransfers.getPrepareTransfersOptions({});
	        }
	        return bluebird.resolve(guards.validate(guards.depthValidator(depth), guards.seedValidator(seed), guards.minWeightMagnitudeValidator(minWeightMagnitude), guards.arrayValidator(guards.transferValidator)(transfers)))
	            .then(function () { return prepareTransfers(seed, transfers, options); })
	            .then(function (trytes) { return sendTrytes(trytes, depth, minWeightMagnitude, options ? options.reference : undefined); })
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createSendTransfer);
	var createSendTransfer_1 = createSendTransfer.createSendTransfer;

	var createPromoteTransaction = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	exports.__esModule = true;






	var defaults = {
	    delay: 0,
	    interrupt: false
	};
	exports.spam = {
	    address: '9'.repeat(81),
	    value: 0,
	    tag: '9'.repeat(27),
	    message: '9'.repeat(27 * 81)
	};
	exports.generateSpam = function (n) {
	    if (n === void 0) { n = 1; }
	    return new Array(n).fill(exports.spam);
	};
	/**
	 * @method createPromoteTransaction
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - Network provider
	 *
	 * @param {Function} [attachFn] - Optional `attachToTangle` function to override the
	 * [default method]{@link #module_core.attachToTangle}.
	 *
	 * @return {Function} {@link #module_core.promoteTransaction `promoteTransaction`}
	 */
	exports.createPromoteTransaction = function (provider, attachFn) {
	    var checkConsistency = src$b.createCheckConsistency(provider);
	    var sendTransfer = createSendTransfer.createSendTransfer(provider, attachFn);
	    /**
	     * This method promotes only consistent transactions by checking them with the [`checkConsistency()`]{@link #module_core.checkConsistency} method.
	     *
	     * ## Related methods
	     *
	     * Use the [`isPromotable()`]{@link #module_core.isPromotable} method to check if a transaction can be [promoted](https://docs.iota.org/docs/getting-started/0.1/transactions/reattach-rebroadcast-promote).
	     *
	     * If a transaction can't be promoted, use the [`replayBundle()`]{@link #module_core.replayBundle} method to [reattach](https://docs.iota.org/docs/getting-started/0.1/transactions/reattach-rebroadcast-promote) it to the Tangle.
	     *
	     * @method promoteTransaction
	     *
	     * @summary [Promotes](https://docs.iota.org/docs/getting-started/0.1/transactions/reattach-rebroadcast-promote#promote) a given tail transaction.
	     *
	     * @memberof module:core
	     *
	     * @param {Hash} tail - Tail transaction hash
	     *
	     * @param {number} depth - The [depth](https://docs.iota.org/docs/getting-started/0.1/transactions/depth) at which to start the weighted random walk. The [Trinity wallet](https://trinity.iota.org/) uses a value of `3`,
	     * meaning that the weighted random walk starts 3 milestones in the past.
	     *
	     * @param {number} minWeightMagnitude - [Minimum weight magnitude](https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude)
	     *
	     * @param {Array} [spamTransfers={address: '9999...999', value:0, tag:'999...999',message: '999...999' }] - Array of transfer objects to use to promote the transaction
	     *
	     * @param {Object} [options] - Options object
	     *
	     * @param {number} [options.delay] - Delay in milliseconds before sending each zero-value transaction
	     *
	     * @param {boolean|Function} [options.interrupt] - Either a boolean or a function that evaluates to a boolean to stop the method from sending transactions
	     *
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     *
	     * ```js
	     * iota.promoteTransaction('FOSJBUZEHOBDKIOJ9RXBRPPZSJHWMXCDFJLIJSLJG9HRKEEJGAHWATEVCYERPQXDWFHQRGZOGIILZ9999',
	     * 3,14)
	     * .then(transactions => {
	     *   console.log(`Promoted the tail transaction, using the following transactions: \n` +
	     *   JSON.stringify(transactions));
	     * })
	     * .catch(error => {
	     *     console.log(`Something went wrong: ${error}`);
	     * })
	     * ```
	     *
	     * @returns {Promise}
	     *
	     * @fulfil {Transaction[]} transactions - Array of zero-value transaction objects that were sent
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INCONSISTENT_SUBTANGLE`: In this case, promotion has no effect and a reattachment is required by calling the [`replayBundle()`]{@link #module_core.replayBundle} method
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function promoteTransaction(tailTransaction, depth, minWeightMagnitude, spamTransfers, options, callback) {
	        var _this = this;
	        if (spamTransfers === void 0) { spamTransfers = exports.generateSpam(); }
	        // Switch arguments
	        if (!options) {
	            options = __assign({}, defaults);
	        }
	        else if (typeof options === 'function') {
	            callback = options;
	            options = __assign({}, defaults);
	        }
	        var spamTransactions = [];
	        var sendTransferOptions = __assign({}, createPrepareTransfers.getPrepareTransfersOptions({}), { reference: tailTransaction });
	        var timeout = options.delay;
	        var delay = function () { return new Promise(function (resolve) { return setTimeout(resolve, timeout); }); };
	        var promote = function () {
	            return delay()
	                .then(function () { return checkConsistency(tailTransaction, { rejectWithReason: true }); })
	                .then(function (consistent) {
	                if (!consistent) {
	                    throw new Error(errors$1.INCONSISTENT_SUBTANGLE);
	                }
	                return sendTransfer(spamTransfers[0].address, depth, minWeightMagnitude, spamTransfers, sendTransferOptions);
	            })
	                .then(function (transactions) { return __awaiter(_this, void 0, void 0, function () {
	                var _a, _b;
	                return __generator(this, function (_c) {
	                    switch (_c.label) {
	                        case 0:
	                            spamTransactions.push(transactions.slice());
	                            if (!(options && timeout)) return [3 /*break*/, 4];
	                            _a = options.interrupt === true;
	                            if (_a) return [3 /*break*/, 3];
	                            _b = typeof options.interrupt === 'function';
	                            if (!_b) return [3 /*break*/, 2];
	                            return [4 /*yield*/, options.interrupt()];
	                        case 1:
	                            _b = (_c.sent());
	                            _c.label = 2;
	                        case 2:
	                            _a = (_b);
	                            _c.label = 3;
	                        case 3:
	                            if (_a) {
	                                return [2 /*return*/, spamTransactions.slice()];
	                            }
	                            return [2 /*return*/, promote()];
	                        case 4: return [2 /*return*/, spamTransactions.slice()];
	                    }
	                });
	            }); });
	        };
	        return bluebird.resolve(guards.validate(guards.hashValidator(tailTransaction), [delay, function (n) { return typeof n === 'function' || (typeof n === 'number' && n >= 0); }, errors$1.INVALID_DELAY], !!spamTransfers && guards.arrayValidator(guards.transferValidator)(spamTransfers)))
	            .then(promote)
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createPromoteTransaction);
	var createPromoteTransaction_1 = createPromoteTransaction.spam;
	var createPromoteTransaction_2 = createPromoteTransaction.generateSpam;
	var createPromoteTransaction_3 = createPromoteTransaction.createPromoteTransaction;

	var createReplayBundle = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;


	/**
	 * @method createReplayBundle
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - Network provider
	 *
	 * @return {Function} {@link #module_core.replayBundle `replayBundle`}
	 */
	exports.createReplayBundle = function (provider, attachFn) {
	    var getBundle = src$b.createGetBundle(provider);
	    var sendTrytes = src$b.createSendTrytes(provider, attachFn);
	    /**
	     * This method [reattaches](https://docs.iota.org/docs/getting-started/0.1/transactions/reattach-rebroadcast-promote#reattach) a bundle to the Tangle by calling the [`sendTrytes()`]{@link #module_core.sendTrytes} method.
	     *
	     * You can call this function as many times as you need until one of the bundles becomes confirmed.
	     *
	     * ## Related methods
	     *
	     * Before you call this method, it's worth finding out if you can promote it by calling the [`isPromotable()`]{@link #module_core.isPromotable} method.
	     *
	     * @method replayBundle
	     *
	     * @summary Reattaches a bundle to the Tangle.
	     *
	     * @memberof module:core
	     *
	     * @param {Hash} tail - Tail transaction hash
	     *
	     * @param {number} depth - The [depth](https://docs.iota.org/docs/getting-started/0.1/transactions/depth) at which to start the weighted random walk. The [Trinity wallet](https://trinity.iota.org/) uses a value of `3`,
	     * meaning that the weighted random walk starts 3 milestones in the past.
	     *
	     * @param {number} minWeightMagnitude - The [minimum weight magnitude](https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude) to use for proof of work. **Note:** This value must be at least the same as the minimum weight magnitude of the branch and trunk transactions.
	     *
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     *
	     * ```js
	     * iota.replayBundle(tailTransactionHash)
	     *   .then(bundle => {
	     *     console.log(`Successfully reattached ${tailTransactionHash}`);
	     *     console.log(JSON.stringify(bundle));
	     *   }).catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     *   })
	     * ```
	     *
	     * @returns {Promise}
	     *
	     * @fulfil {Transaction[]} bundle - Array of transaction objects in the reattached bundle
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_DEPTH`: Make sure that the `depth` argument is greater than zero
	     * - `INVALID_MIN_WEIGHT_MAGNITUDE`: Make sure that the minimum weight magnitude is at least the same as the original bundle
	     * - `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hash is 81 trytes long and its `currentIndex` field is 0
	     * - `INVALID_BUNDLE`: Check the tail transaction's bundle for the following:
	     *   - Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
	     *   - Transactions in the bundle array are in the same order as their currentIndex field
	     *   - The total value of all transactions in the bundle sums to 0
	     *   - The bundle hash is valid
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function replayBundle(tail, depth, minWeightMagnitude, reference, callback) {
	        return getBundle(tail)
	            .then(function (bundle) { return src$7.asFinalTransactionTrytes(bundle); })
	            .then(function (trytes) { return sendTrytes(trytes, depth, minWeightMagnitude, reference); })
	            .asCallback(typeof arguments[3] === 'function' ? arguments[3] : callback);
	    };
	};

	});

	unwrapExports(createReplayBundle);
	var createReplayBundle_1 = createReplayBundle.createReplayBundle;

	var createSendTrytes = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;


	/**
	 * @method createSendTrytes
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider - Network provider
	 *
	 * @return {Function} {@link #module_core.sendTrytes `sendTrytes`}
	 */
	exports.createSendTrytes = function (provider, attachFn) {
	    var getTransactionsToApprove = src$b.createGetTransactionsToApprove(provider);
	    var storeAndBroadcast = src$b.createStoreAndBroadcast(provider);
	    var attachToTangle = attachFn || src$b.createAttachToTangle(provider);
	    /**
	     * This method takes an array of transaction trytes that don't include a proof of work or
	     *
	     * Then, the method calls the following to finalize the bundle and send it to the node:
	     * - [`getTransactionsToApprove()`]{@link #module_core.getTransactionsToApprove}
	     * - [`attachToTangle()`]{@link #module_core.attachToTangle}
	     * - [`storeAndBroadcast()`]{@link #module_core.storeAndBroadcast}
	     *
	     * **Note:** Before calling this method, we recommend saving your transaction trytes in local storage.
	     * By doing so, you make sure that you can always reattach your transactions to the Tangle in case they remain in a pending state.
	     *
	     * ## Related methods
	     *
	     * To create transaction trytes that don't include a proof of work or trunk and branch transactions, use the [`prepareTransfers()`]{@link #module_core.prepareTransfers} method.
	     *
	     * @method sendTrytes
	     *
	     * @summary Does tip selection and proof of work for a bundle of transaction trytes before sending the final transactions to the connected IRI node.
	     *
	     * @memberof module:core
	     *
	     * @param {Trytes[]} trytes - Array of prepared transaction trytes to attach, store, and send
	     *
	     * @param {number} depth - The [depth](https://docs.iota.org/docs/getting-started/0.1/transactions/depth) at which to start the weighted random walk. The [Trinity wallet](https://trinity.iota.org/) uses a value of `3`,
	     * meaning that the weighted random walk starts 3 milestones in the past.
	     *
	     * @param {number} minWeightMagnitude - The [minimum weight magnitude](https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude) to use for proof of work. **Note:** This value must be at least the same as the minimum weight magnitude of the branch and trunk transactions.
	     *
	     * @param {string} [reference] - Optional reference transaction hash
	     *
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     * ```js
	     * prepareTransfers(seed, transfers)
	     *   .then(trytes => {
	     *      return iota.sendTrytes(trytes, depth, minWeightMagnitude)
	     *   })
	     *   .then(bundle => {
	     *     console.log(`Successfully attached transactions to the Tangle`);
	     *     console.log(JSON.stringify(bundle));
	     *   }).catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     *   })
	     * ```
	     *
	     * @return {Promise}
	     *
	     * @fulfil {Transaction[]} bundle - Array of transaction objects that you just sent to the node
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_TRANSACTION_TRYTES`: Make sure the trytes can be converted to a valid transaction object
	     * - `INVALID_DEPTH`: Make sure that the `depth` argument is greater than zero
	     * - `INVALID_MIN_WEIGHT_MAGNITUDE`: Make sure that the minimum weight magnitude is at least the same as the original bundle
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function sendTrytes(trytes, depth, minWeightMagnitude, reference, callback) {
	        if (reference && typeof reference === 'function') {
	            callback = reference;
	            reference = undefined;
	        }
	        return getTransactionsToApprove(depth, reference)
	            .then(function (_a) {
	            var trunkTransaction = _a.trunkTransaction, branchTransaction = _a.branchTransaction;
	            return attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes);
	        })
	            .then(function (attachedTrytes) { return storeAndBroadcast(attachedTrytes); })
	            .then(function (attachedTrytes) { return attachedTrytes.map(function (t) { return src$7.asTransactionObject(t); }); })
	            .asCallback(typeof arguments[3] === 'function' ? arguments[3] : callback);
	    };
	};

	});

	unwrapExports(createSendTrytes);
	var createSendTrytes_1 = createSendTrytes.createSendTrytes;

	var createStoreAndBroadcast = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;

	/**
	 * @method createStoreAndBroadcast
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider
	 *
	 * @return {function} {@link #module_core.storeAndBroadcast `storeAndBroadcast`}
	 */
	exports.createStoreAndBroadcast = function (provider) {
	    var storeTransactions = src$b.createStoreTransactions(provider);
	    var broadcastTransactions = src$b.createBroadcastTransactions(provider);
	    /**
	     * This method uses the connected IRI node's
	     * [`broadcastTransactions`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#broadcastTransactions) and [`storeTransactions`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#storeTransactions) endpoints to send it the given transaction trytes.
	     *
	     * **Note:** Before calling this method, we recommend saving your transaction trytes in local storage.
	     * By doing so, you make sure that you can always reattach your transactions to the Tangle in case they remain in a pending state.
	     *
	     * ## Related methods
	     *
	     * The given transaction trytes must be in a valid bundle and must include a proof of work.
	     *
	     * To create a valid bundle, use the `prepareTransfers()` method. For more information about what makes a bundles and transactions valid, see [this guide](https://docs.iota.org/docs/node-software/0.1/iri/concepts/transaction-validation).
	     *
	     * To do proof of work, use one of the following methods:
	     *
	     * - [`attachToTangle()`]{@link #module_core.attachToTangle}
	     * - [`sendTrytes()`]{@link #module_core.sendTrytes}
	     *
	     * @method storeAndBroadcast
	     *
	     * @summary Sends the given transaction trytes to the connected IRI node.
	     *
	     * @memberof module:core
	     *
	     * @param {Array<Trytes>} trytes - Array of transaction trytes
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     * ```js
	     * storeAndBroadcast(trytes)
	     * .then(transactionTrytes => {
	     *     console.log(`Successfully sent transactions to the node`);
	     *     console.log(JSON.stringify(transactionTrytes));
	     * }).catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     * })
	     * ```
	     *
	     * @return {Promise<Trytes[]>}
	     *
	     * @fulfil {Trytes[]} transactionTrytes - Attached transaction trytes
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_TRANSACTION_TRYTES`: Make sure the trytes can be converted to a valid transaction object
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function (trytes, callback) {
	        return storeTransactions(trytes)
	            .then(broadcastTransactions)
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createStoreAndBroadcast);
	var createStoreAndBroadcast_1 = createStoreAndBroadcast.createStoreAndBroadcast;

	var createTraverseBundle = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;







	/**
	 * @method createTraverseBundle
	 *
	 * @memberof module:core
	 *
	 * @ignore
	 *
	 * @param {Provider} provider
	 *
	 * @return {function} {@link #module_core.traverseBundle `traverseBundle`}
	 */
	exports.createTraverseBundle = function (provider) {
	    var getTrytes = src$b.createGetTrytes(provider);
	    /**
	     * Gets all transactions in the bundle of a given tail transaction hash, by traversing its `trunkTransaction` field.
	     *
	     * **Note:** This method does not validate the bundle.
	     *
	     * ## Related methods
	     *
	     * To get and validate all transactions in a bundle, use the [`getBundle()`]{@link #module_core.getBundle} method.
	     *
	     * @method traverseBundle
	     *
	     * @summary Gets all transaction in the bundle of a given tail transaction hash.
	     *
	     * @memberof module:core
	     *
	     * @param {Hash} trunkTransaction - Tail transaction hash
	     * @param {Hash} [bundle=[]] - Array of existing transaction objects to include in the returned bundle
	     * @param {Callback} [callback] - Optional callback function
	     *
	     * @example
	     *
	     * ```js
	     * traverseBundle(tailTransactionHash)
	     * .then(bundle => {
	     *     console.log(`Successfully found the following transactions in the bundle:`);
	     *     console.log(JSON.stringify(bundle));
	     * }).catch(error => {
	     *     console.log(`Something went wrong: ${error}`)
	     * })
	     * ```
	     *
	     * @returns {Promise}
	     *
	     * @fulfil {Transaction[]} bundle - Array of transaction objects
	     *
	     * @reject {Error} error - An error that contains one of the following:
	     * - `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hash is 81 trytes long
	     * -`INVALID_TAIL_TRANSACTION`: Make sure that the tail transaction hash is for a transaction whose `currentIndex` field is 0
	     * - `INVALID_BUNDLE`: Check the tail transaction's bundle for the following:
	     *   - Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
	     *   - Transactions in the bundle array are in the same order as their currentIndex field
	     *   - The total value of all transactions in the bundle sums to 0
	     *   - The bundle hash is valid
	     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	     */
	    return function traverseBundle(trunkTransaction, bundle, callback) {
	        if (bundle === void 0) { bundle = []; }
	        return bluebird.resolve(guards.validate([
	            trunkTransaction,
	            function (t) { return guards.isTrytesOfExactLength(t, src$5.TRANSACTION_HASH_LENGTH / src.TRYTE_WIDTH); },
	            errors$1.INVALID_TRANSACTION_HASH,
	        ]))
	            .then(function () { return getTrytes([trunkTransaction]); })
	            .then(function (_a) {
	            var trytes = _a[0];
	            return src$7.asTransactionObject(trytes, trunkTransaction);
	        })
	            .tap(function (transaction) {
	            return guards.validate(bundle.length === 0 && [transaction, function (t) { return t.currentIndex === 0; }, errors$1.INVALID_TAIL_TRANSACTION]);
	        })
	            .then(function (transaction) {
	            return transaction.currentIndex === transaction.lastIndex
	                ? bundle.concat(transaction)
	                : traverseBundle(transaction.trunkTransaction, bundle.concat(transaction));
	        })
	            .asCallback(arguments[1] === 'function' ? arguments[1] : callback);
	    };
	};

	});

	unwrapExports(createTraverseBundle);
	var createTraverseBundle_1 = createTraverseBundle.createTraverseBundle;

	var generateAddress = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;




	/**
	 * Generates an address, according to the given seed, index, and security level.
	 *
	 * **Note:** This method does not check if the address is [spent](https://docs.iota.org/docs/getting-started/0.1/clients/addresses#spent-addresses).
	 *
	 * ## Related methods
	 *
	 * To generate an address that has a lower probability of being spent, use the [`getNewAddress()`]{@link #module_core.getNewAddress} method.
	 *
	 * @method generateAddress
	 *
	 * @summary Generates an address with a specific index and security level.
	 *
	 * @memberof module:core
	 *
	 * @param {string} seed The seed to use to generate the address
	 * @param {number} index - The key index to use to generate the address
	 * @param {number} [security=2] - The [security level](https://docs.iota.org/docs/getting-started/0.1/clients/security-levels) to use to generate the address
	 * @param {boolean} [checksum=false] - Whether to add the [checksum](https://docs.iota.org/docs/getting-started/0.1/clients/checksums)
	 *
	 * @example
	 * ```js
	 * const myAddress = generateAddress(seed, 0);
	 * ```
	 *
	 * @returns {Hash} address - An 81-tryte address
	 *
	 * @throws {errors.INVALID_SEED}: Make sure that the seed contains only trytes
	 *
	 * @throws {errors.INVALID_SECURITY_LEVEL}: Make sure that the security level is a number between 1 and 3
	 */
	exports.generateAddress = function (seed, index, security, checksum) {
	    if (security === void 0) { security = 2; }
	    if (checksum === void 0) { checksum = false; }
	    while (seed.length % 81 !== 0) {
	        seed += 9;
	    }
	    guards.validate(guards.seedValidator(seed), guards.securityLevelValidator(security));
	    var keyTrits = src$4.key(src$4.subseed(src.trits(seed), index), security);
	    var digestsTrits = src$4.digests(keyTrits);
	    var addressTrytes = src.trytes(src$4.address(digestsTrits));
	    return checksum ? src$6.addChecksum(addressTrytes) : addressTrytes;
	};

	});

	unwrapExports(generateAddress);
	var generateAddress_1 = generateAddress.generateAddress;

	var types$2 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.makeAddress = function (address, balance, keyIndex, security) { return ({
	    address: address,
	    keyIndex: keyIndex,
	    security: security,
	    balance: balance
	}); };
	/* List of IRI Commands */
	var IRICommand;
	(function (IRICommand) {
	    IRICommand["GET_NODE_INFO"] = "getNodeInfo";
	    IRICommand["GET_NEIGHBORS"] = "getNeighbors";
	    IRICommand["ADD_NEIGHBORS"] = "addNeighbors";
	    IRICommand["REMOVE_NEIGHBORS"] = "removeNeighbors";
	    IRICommand["FIND_TRANSACTIONS"] = "findTransactions";
	    IRICommand["GET_TRYTES"] = "getTrytes";
	    IRICommand["GET_INCLUSION_STATES"] = "getInclusionStates";
	    IRICommand["GET_BALANCES"] = "getBalances";
	    IRICommand["GET_TRANSACTIONS_TO_APPROVE"] = "getTransactionsToApprove";
	    IRICommand["ATTACH_TO_TANGLE"] = "attachToTangle";
	    IRICommand["INTERRUPT_ATTACHING_TO_TANGLE"] = "interruptAttachingToTangle";
	    IRICommand["BROADCAST_TRANSACTIONS"] = "broadcastTransactions";
	    IRICommand["STORE_TRANSACTIONS"] = "storeTransactions";
	    IRICommand["CHECK_CONSISTENCY"] = "checkConsistency";
	    IRICommand["WERE_ADDRESSES_SPENT_FROM"] = "wereAddressesSpentFrom";
	})(IRICommand = exports.IRICommand || (exports.IRICommand = {}));
	/* Util methods */
	exports.asArray = function (x) { return (Array.isArray(x) ? x : [x]); };
	exports.getOptionsWithDefaults = function (defaults) { return function (options) {
	    return Object.assign({}, defaults, options);
	}; }; // tslint:disable-line prefer-object-spread
	var PersistenceBatchTypes;
	(function (PersistenceBatchTypes) {
	    PersistenceBatchTypes["put"] = "put";
	    PersistenceBatchTypes["del"] = "del";
	})(PersistenceBatchTypes = exports.PersistenceBatchTypes || (exports.PersistenceBatchTypes = {}));

	});

	unwrapExports(types$2);
	var types_1$2 = types$2.makeAddress;
	var types_2$2 = types$2.IRICommand;
	var types_3$2 = types$2.asArray;
	var types_4$2 = types$2.getOptionsWithDefaults;
	var types_5$2 = types$2.PersistenceBatchTypes;

	(function(self) {

	var irrelevant = (function (exports) {

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob:
	      'FileReader' in self &&
	      'Blob' in self &&
	      (function() {
	        try {
	          new Blob();
	          return true
	        } catch (e) {
	          return false
	        }
	      })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  };

	  function isDataView(obj) {
	    return obj && DataView.prototype.isPrototypeOf(obj)
	  }

	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ];

	    var isArrayBufferView =
	      ArrayBuffer.isView ||
	      function(obj) {
	        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	      };
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value);
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift();
	        return {done: value === undefined, value: value}
	      }
	    };

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      };
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {};

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (Array.isArray(headers)) {
	      headers.forEach(function(header) {
	        this.append(header[0], header[1]);
	      }, this);
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var oldValue = this.map[name];
	    this.map[name] = oldValue ? oldValue + ', ' + value : value;
	  };

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)];
	  };

	  Headers.prototype.get = function(name) {
	    name = normalizeName(name);
	    return this.has(name) ? this.map[name] : null
	  };

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  };

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = normalizeValue(value);
	  };

	  Headers.prototype.forEach = function(callback, thisArg) {
	    for (var name in this.map) {
	      if (this.map.hasOwnProperty(name)) {
	        callback.call(thisArg, this.map[name], name, this);
	      }
	    }
	  };

	  Headers.prototype.keys = function() {
	    var items = [];
	    this.forEach(function(value, name) {
	      items.push(name);
	    });
	    return iteratorFor(items)
	  };

	  Headers.prototype.values = function() {
	    var items = [];
	    this.forEach(function(value) {
	      items.push(value);
	    });
	    return iteratorFor(items)
	  };

	  Headers.prototype.entries = function() {
	    var items = [];
	    this.forEach(function(value, name) {
	      items.push([name, value]);
	    });
	    return iteratorFor(items)
	  };

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true;
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result);
	      };
	      reader.onerror = function() {
	        reject(reader.error);
	      };
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    var promise = fileReaderReady(reader);
	    reader.readAsArrayBuffer(blob);
	    return promise
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    var promise = fileReaderReady(reader);
	    reader.readAsText(blob);
	    return promise
	  }

	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf);
	    var chars = new Array(view.length);

	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i]);
	    }
	    return chars.join('')
	  }

	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength);
	      view.set(new Uint8Array(buf));
	      return view.buffer
	    }
	  }

	  function Body() {
	    this.bodyUsed = false;

	    this._initBody = function(body) {
	      this._bodyInit = body;
	      if (!body) {
	        this._bodyText = '';
	      } else if (typeof body === 'string') {
	        this._bodyText = body;
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body;
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body;
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString();
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer);
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer]);
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body);
	      } else {
	        this._bodyText = body = Object.prototype.toString.call(body);
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8');
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type);
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	        }
	      }
	    };

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      };

	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      };
	    }

	    this.text = function() {
	      var rejected = consumed(this);
	      if (rejected) {
	        return rejected
	      }

	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
	      }
	    };

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      };
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    };

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {};
	    var body = options.body;

	    if (input instanceof Request) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url;
	      this.credentials = input.credentials;
	      if (!options.headers) {
	        this.headers = new Headers(input.headers);
	      }
	      this.method = input.method;
	      this.mode = input.mode;
	      this.signal = input.signal;
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit;
	        input.bodyUsed = true;
	      }
	    } else {
	      this.url = String(input);
	    }

	    this.credentials = options.credentials || this.credentials || 'same-origin';
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers);
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET');
	    this.mode = options.mode || this.mode || null;
	    this.signal = options.signal || this.signal;
	    this.referrer = null;

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body);
	  }

	  Request.prototype.clone = function() {
	    return new Request(this, {body: this._bodyInit})
	  };

	  function decode(body) {
	    var form = new FormData();
	    body
	      .trim()
	      .split('&')
	      .forEach(function(bytes) {
	        if (bytes) {
	          var split = bytes.split('=');
	          var name = split.shift().replace(/\+/g, ' ');
	          var value = split.join('=').replace(/\+/g, ' ');
	          form.append(decodeURIComponent(name), decodeURIComponent(value));
	        }
	      });
	    return form
	  }

	  function parseHeaders(rawHeaders) {
	    var headers = new Headers();
	    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
	    // https://tools.ietf.org/html/rfc7230#section-3.2
	    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
	    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
	      var parts = line.split(':');
	      var key = parts.shift().trim();
	      if (key) {
	        var value = parts.join(':').trim();
	        headers.append(key, value);
	      }
	    });
	    return headers
	  }

	  Body.call(Request.prototype);

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {};
	    }

	    this.type = 'default';
	    this.status = options.status === undefined ? 200 : options.status;
	    this.ok = this.status >= 200 && this.status < 300;
	    this.statusText = 'statusText' in options ? options.statusText : 'OK';
	    this.headers = new Headers(options.headers);
	    this.url = options.url || '';
	    this._initBody(bodyInit);
	  }

	  Body.call(Response.prototype);

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  };

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''});
	    response.type = 'error';
	    return response
	  };

	  var redirectStatuses = [301, 302, 303, 307, 308];

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  };

	  exports.DOMException = self.DOMException;
	  try {
	    new exports.DOMException();
	  } catch (err) {
	    exports.DOMException = function(message, name) {
	      this.message = message;
	      this.name = name;
	      var error = Error(message);
	      this.stack = error.stack;
	    };
	    exports.DOMException.prototype = Object.create(Error.prototype);
	    exports.DOMException.prototype.constructor = exports.DOMException;
	  }

	  function fetch(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request = new Request(input, init);

	      if (request.signal && request.signal.aborted) {
	        return reject(new exports.DOMException('Aborted', 'AbortError'))
	      }

	      var xhr = new XMLHttpRequest();

	      function abortXhr() {
	        xhr.abort();
	      }

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        };
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.onabort = function() {
	        reject(new exports.DOMException('Aborted', 'AbortError'));
	      };

	      xhr.open(request.method, request.url, true);

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true;
	      } else if (request.credentials === 'omit') {
	        xhr.withCredentials = false;
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob';
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value);
	      });

	      if (request.signal) {
	        request.signal.addEventListener('abort', abortXhr);

	        xhr.onreadystatechange = function() {
	          // DONE (success or failure)
	          if (xhr.readyState === 4) {
	            request.signal.removeEventListener('abort', abortXhr);
	          }
	        };
	      }

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    })
	  }

	  fetch.polyfill = true;

	  if (!self.fetch) {
	    self.fetch = fetch;
	    self.Headers = Headers;
	    self.Request = Request;
	    self.Response = Response;
	  }

	  exports.Headers = Headers;
	  exports.Request = Request;
	  exports.Response = Response;
	  exports.fetch = fetch;

	  return exports;

	}({}));
	})(typeof self !== 'undefined' ? self : commonjsGlobal);

	/**
	 * Check if we're required to add a port number.
	 *
	 * @see https://url.spec.whatwg.org/#default-port
	 * @param {Number|String} port Port number we need to check
	 * @param {String} protocol Protocol we need to check against.
	 * @returns {Boolean} Is it a default port for the given protocol
	 * @api private
	 */
	var requiresPort = function required(port, protocol) {
	  protocol = protocol.split(':')[0];
	  port = +port;

	  if (!port) return false;

	  switch (protocol) {
	    case 'http':
	    case 'ws':
	    return port !== 80;

	    case 'https':
	    case 'wss':
	    return port !== 443;

	    case 'ftp':
	    return port !== 21;

	    case 'gopher':
	    return port !== 70;

	    case 'file':
	    return false;
	  }

	  return port !== 0;
	};

	var has = Object.prototype.hasOwnProperty
	  , undef;

	/**
	 * Decode a URI encoded string.
	 *
	 * @param {String} input The URI encoded string.
	 * @returns {String|Null} The decoded string.
	 * @api private
	 */
	function decode(input) {
	  try {
	    return decodeURIComponent(input.replace(/\+/g, ' '));
	  } catch (e) {
	    return null;
	  }
	}

	/**
	 * Attempts to encode a given input.
	 *
	 * @param {String} input The string that needs to be encoded.
	 * @returns {String|Null} The encoded string.
	 * @api private
	 */
	function encode(input) {
	  try {
	    return encodeURIComponent(input);
	  } catch (e) {
	    return null;
	  }
	}

	/**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */
	function querystring(query) {
	  var parser = /([^=?#&]+)=?([^&]*)/g
	    , result = {}
	    , part;

	  while (part = parser.exec(query)) {
	    var key = decode(part[1])
	      , value = decode(part[2]);

	    //
	    // Prevent overriding of existing properties. This ensures that build-in
	    // methods like `toString` or __proto__ are not overriden by malicious
	    // querystrings.
	    //
	    // In the case if failed decoding, we want to omit the key/value pairs
	    // from the result.
	    //
	    if (key === null || value === null || key in result) continue;
	    result[key] = value;
	  }

	  return result;
	}

	/**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */
	function querystringify(obj, prefix) {
	  prefix = prefix || '';

	  var pairs = []
	    , value
	    , key;

	  //
	  // Optionally prefix with a '?' if needed
	  //
	  if ('string' !== typeof prefix) prefix = '?';

	  for (key in obj) {
	    if (has.call(obj, key)) {
	      value = obj[key];

	      //
	      // Edge cases where we actually want to encode the value to an empty
	      // string instead of the stringified value.
	      //
	      if (!value && (value === null || value === undef || isNaN(value))) {
	        value = '';
	      }

	      key = encode(key);
	      value = encode(value);

	      //
	      // If we failed to encode the strings, we should bail out as we don't
	      // want to add invalid strings to the query.
	      //
	      if (key === null || value === null) continue;
	      pairs.push(key +'='+ value);
	    }
	  }

	  return pairs.length ? prefix + pairs.join('&') : '';
	}

	//
	// Expose the module.
	//
	var stringify = querystringify;
	var parse = querystring;

	var querystringify_1 = {
		stringify: stringify,
		parse: parse
	};

	var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//
	  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
	  , whitespace = '[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]'
	  , left = new RegExp('^'+ whitespace +'+');

	/**
	 * Trim a given string.
	 *
	 * @param {String} str String to trim.
	 * @public
	 */
	function trimLeft(str) {
	  return (str ? str : '').toString().replace(left, '');
	}

	/**
	 * These are the parse rules for the URL parser, it informs the parser
	 * about:
	 *
	 * 0. The char it Needs to parse, if it's a string it should be done using
	 *    indexOf, RegExp using exec and NaN means set as current value.
	 * 1. The property we should set when parsing this value.
	 * 2. Indication if it's backwards or forward parsing, when set as number it's
	 *    the value of extra chars that should be split off.
	 * 3. Inherit from location if non existing in the parser.
	 * 4. `toLowerCase` the resulting value.
	 */
	var rules = [
	  ['#', 'hash'],                        // Extract from the back.
	  ['?', 'query'],                       // Extract from the back.
	  function sanitize(address) {          // Sanitize what is left of the address
	    return address.replace('\\', '/');
	  },
	  ['/', 'pathname'],                    // Extract from the back.
	  ['@', 'auth', 1],                     // Extract from the front.
	  [NaN, 'host', undefined, 1, 1],       // Set left over value.
	  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
	  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
	];

	/**
	 * These properties should not be copied or inherited from. This is only needed
	 * for all non blob URL's as a blob URL does not include a hash, only the
	 * origin.
	 *
	 * @type {Object}
	 * @private
	 */
	var ignore = { hash: 1, query: 1 };

	/**
	 * The location object differs when your code is loaded through a normal page,
	 * Worker or through a worker using a blob. And with the blobble begins the
	 * trouble as the location object will contain the URL of the blob, not the
	 * location of the page where our code is loaded in. The actual origin is
	 * encoded in the `pathname` so we can thankfully generate a good "default"
	 * location from it so we can generate proper relative URL's again.
	 *
	 * @param {Object|String} loc Optional default location object.
	 * @returns {Object} lolcation object.
	 * @public
	 */
	function lolcation(loc) {
	  var globalVar;

	  if (typeof window !== 'undefined') globalVar = window;
	  else if (typeof commonjsGlobal !== 'undefined') globalVar = commonjsGlobal;
	  else if (typeof self !== 'undefined') globalVar = self;
	  else globalVar = {};

	  var location = globalVar.location || {};
	  loc = loc || location;

	  var finaldestination = {}
	    , type = typeof loc
	    , key;

	  if ('blob:' === loc.protocol) {
	    finaldestination = new Url(unescape(loc.pathname), {});
	  } else if ('string' === type) {
	    finaldestination = new Url(loc, {});
	    for (key in ignore) delete finaldestination[key];
	  } else if ('object' === type) {
	    for (key in loc) {
	      if (key in ignore) continue;
	      finaldestination[key] = loc[key];
	    }

	    if (finaldestination.slashes === undefined) {
	      finaldestination.slashes = slashes.test(loc.href);
	    }
	  }

	  return finaldestination;
	}

	/**
	 * @typedef ProtocolExtract
	 * @type Object
	 * @property {String} protocol Protocol matched in the URL, in lowercase.
	 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
	 * @property {String} rest Rest of the URL that is not part of the protocol.
	 */

	/**
	 * Extract protocol information from a URL with/without double slash ("//").
	 *
	 * @param {String} address URL we want to extract from.
	 * @return {ProtocolExtract} Extracted information.
	 * @private
	 */
	function extractProtocol(address) {
	  address = trimLeft(address);
	  var match = protocolre.exec(address);

	  return {
	    protocol: match[1] ? match[1].toLowerCase() : '',
	    slashes: !!match[2],
	    rest: match[3]
	  };
	}

	/**
	 * Resolve a relative URL pathname against a base URL pathname.
	 *
	 * @param {String} relative Pathname of the relative URL.
	 * @param {String} base Pathname of the base URL.
	 * @return {String} Resolved pathname.
	 * @private
	 */
	function resolve(relative, base) {
	  if (relative === '') return base;

	  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
	    , i = path.length
	    , last = path[i - 1]
	    , unshift = false
	    , up = 0;

	  while (i--) {
	    if (path[i] === '.') {
	      path.splice(i, 1);
	    } else if (path[i] === '..') {
	      path.splice(i, 1);
	      up++;
	    } else if (up) {
	      if (i === 0) unshift = true;
	      path.splice(i, 1);
	      up--;
	    }
	  }

	  if (unshift) path.unshift('');
	  if (last === '.' || last === '..') path.push('');

	  return path.join('/');
	}

	/**
	 * The actual URL instance. Instead of returning an object we've opted-in to
	 * create an actual constructor as it's much more memory efficient and
	 * faster and it pleases my OCD.
	 *
	 * It is worth noting that we should not use `URL` as class name to prevent
	 * clashes with the global URL instance that got introduced in browsers.
	 *
	 * @constructor
	 * @param {String} address URL we want to parse.
	 * @param {Object|String} [location] Location defaults for relative paths.
	 * @param {Boolean|Function} [parser] Parser for the query string.
	 * @private
	 */
	function Url(address, location, parser) {
	  address = trimLeft(address);

	  if (!(this instanceof Url)) {
	    return new Url(address, location, parser);
	  }

	  var relative, extracted, parse, instruction, index, key
	    , instructions = rules.slice()
	    , type = typeof location
	    , url = this
	    , i = 0;

	  //
	  // The following if statements allows this module two have compatibility with
	  // 2 different API:
	  //
	  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
	  //    where the boolean indicates that the query string should also be parsed.
	  //
	  // 2. The `URL` interface of the browser which accepts a URL, object as
	  //    arguments. The supplied object will be used as default values / fall-back
	  //    for relative paths.
	  //
	  if ('object' !== type && 'string' !== type) {
	    parser = location;
	    location = null;
	  }

	  if (parser && 'function' !== typeof parser) parser = querystringify_1.parse;

	  location = lolcation(location);

	  //
	  // Extract protocol information before running the instructions.
	  //
	  extracted = extractProtocol(address || '');
	  relative = !extracted.protocol && !extracted.slashes;
	  url.slashes = extracted.slashes || relative && location.slashes;
	  url.protocol = extracted.protocol || location.protocol || '';
	  address = extracted.rest;

	  //
	  // When the authority component is absent the URL starts with a path
	  // component.
	  //
	  if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

	  for (; i < instructions.length; i++) {
	    instruction = instructions[i];

	    if (typeof instruction === 'function') {
	      address = instruction(address);
	      continue;
	    }

	    parse = instruction[0];
	    key = instruction[1];

	    if (parse !== parse) {
	      url[key] = address;
	    } else if ('string' === typeof parse) {
	      if (~(index = address.indexOf(parse))) {
	        if ('number' === typeof instruction[2]) {
	          url[key] = address.slice(0, index);
	          address = address.slice(index + instruction[2]);
	        } else {
	          url[key] = address.slice(index);
	          address = address.slice(0, index);
	        }
	      }
	    } else if ((index = parse.exec(address))) {
	      url[key] = index[1];
	      address = address.slice(0, index.index);
	    }

	    url[key] = url[key] || (
	      relative && instruction[3] ? location[key] || '' : ''
	    );

	    //
	    // Hostname, host and protocol should be lowercased so they can be used to
	    // create a proper `origin`.
	    //
	    if (instruction[4]) url[key] = url[key].toLowerCase();
	  }

	  //
	  // Also parse the supplied query string in to an object. If we're supplied
	  // with a custom parser as function use that instead of the default build-in
	  // parser.
	  //
	  if (parser) url.query = parser(url.query);

	  //
	  // If the URL is relative, resolve the pathname against the base URL.
	  //
	  if (
	      relative
	    && location.slashes
	    && url.pathname.charAt(0) !== '/'
	    && (url.pathname !== '' || location.pathname !== '')
	  ) {
	    url.pathname = resolve(url.pathname, location.pathname);
	  }

	  //
	  // We should not add port numbers if they are already the default port number
	  // for a given protocol. As the host also contains the port number we're going
	  // override it with the hostname which contains no port number.
	  //
	  if (!requiresPort(url.port, url.protocol)) {
	    url.host = url.hostname;
	    url.port = '';
	  }

	  //
	  // Parse down the `auth` for the username and password.
	  //
	  url.username = url.password = '';
	  if (url.auth) {
	    instruction = url.auth.split(':');
	    url.username = instruction[0] || '';
	    url.password = instruction[1] || '';
	  }

	  url.origin = url.protocol && url.host && url.protocol !== 'file:'
	    ? url.protocol +'//'+ url.host
	    : 'null';

	  //
	  // The href is just the compiled result.
	  //
	  url.href = url.toString();
	}

	/**
	 * This is convenience method for changing properties in the URL instance to
	 * insure that they all propagate correctly.
	 *
	 * @param {String} part          Property we need to adjust.
	 * @param {Mixed} value          The newly assigned value.
	 * @param {Boolean|Function} fn  When setting the query, it will be the function
	 *                               used to parse the query.
	 *                               When setting the protocol, double slash will be
	 *                               removed from the final url if it is true.
	 * @returns {URL} URL instance for chaining.
	 * @public
	 */
	function set(part, value, fn) {
	  var url = this;

	  switch (part) {
	    case 'query':
	      if ('string' === typeof value && value.length) {
	        value = (fn || querystringify_1.parse)(value);
	      }

	      url[part] = value;
	      break;

	    case 'port':
	      url[part] = value;

	      if (!requiresPort(value, url.protocol)) {
	        url.host = url.hostname;
	        url[part] = '';
	      } else if (value) {
	        url.host = url.hostname +':'+ value;
	      }

	      break;

	    case 'hostname':
	      url[part] = value;

	      if (url.port) value += ':'+ url.port;
	      url.host = value;
	      break;

	    case 'host':
	      url[part] = value;

	      if (/:\d+$/.test(value)) {
	        value = value.split(':');
	        url.port = value.pop();
	        url.hostname = value.join(':');
	      } else {
	        url.hostname = value;
	        url.port = '';
	      }

	      break;

	    case 'protocol':
	      url.protocol = value.toLowerCase();
	      url.slashes = !fn;
	      break;

	    case 'pathname':
	    case 'hash':
	      if (value) {
	        var char = part === 'pathname' ? '/' : '#';
	        url[part] = value.charAt(0) !== char ? char + value : value;
	      } else {
	        url[part] = value;
	      }
	      break;

	    default:
	      url[part] = value;
	  }

	  for (var i = 0; i < rules.length; i++) {
	    var ins = rules[i];

	    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
	  }

	  url.origin = url.protocol && url.host && url.protocol !== 'file:'
	    ? url.protocol +'//'+ url.host
	    : 'null';

	  url.href = url.toString();

	  return url;
	}

	/**
	 * Transform the properties back in to a valid and full URL string.
	 *
	 * @param {Function} stringify Optional query stringify function.
	 * @returns {String} Compiled version of the URL.
	 * @public
	 */
	function toString(stringify) {
	  if (!stringify || 'function' !== typeof stringify) stringify = querystringify_1.stringify;

	  var query
	    , url = this
	    , protocol = url.protocol;

	  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

	  var result = protocol + (url.slashes ? '//' : '');

	  if (url.username) {
	    result += url.username;
	    if (url.password) result += ':'+ url.password;
	    result += '@';
	  }

	  result += url.host + url.pathname;

	  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
	  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

	  if (url.hash) result += url.hash;

	  return result;
	}

	Url.prototype = { set: set, toString: toString };

	//
	// Expose the URL parser and some additional properties that might be useful for
	// others or testing.
	//
	Url.extractProtocol = extractProtocol;
	Url.location = lolcation;
	Url.trimLeft = trimLeft;
	Url.qs = querystringify_1;

	var urlParse = Url;

	var settings = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;


	exports.DEFAULT_PORT = 14265;
	exports.DEFAULT_HOST = 'http://localhost';
	exports.DEFAULT_URI = exports.DEFAULT_HOST + ":" + exports.DEFAULT_PORT;
	exports.REQUEST_BATCH_SIZE = 1000;
	exports.API_VERSION = 1;
	var defaults = {
	    provider: exports.DEFAULT_URI,
	    requestBatchSize: exports.REQUEST_BATCH_SIZE,
	    apiVersion: exports.API_VERSION
	};
	/* tslint:disable no-console */
	exports.getSettingsWithDefaults = function (settings) {
	    if (settings === void 0) { settings = {}; }
	    var _a = types$2.getOptionsWithDefaults(defaults)(settings), provider = _a.provider, host = _a.host, port = _a.port, user = _a.user, password = _a.password, sandbox = _a.sandbox, token = _a.token, requestBatchSize = _a.requestBatchSize, apiVersion = _a.apiVersion, agent = _a.agent;
	    var providerUri = provider;
	    if (sandbox || token) {
	        throw new Error('Sandbox has been removed in favor of a more generic remote curl machine, a.k.a. powbox. See NPM package @iota/curl-remote for details.');
	    }
	    // Check for deprecated settings
	    if (host || port) {
	        console.warn('Setting `host` and `port` is deprecated and will be removed in next version. Please use the `provider` option instead.');
	        providerUri = [host || exports.DEFAULT_HOST, port || exports.DEFAULT_PORT].join('/').replace('//', '/');
	    }
	    if (user && password && urlParse(providerUri, true).protocol !== 'https:') {
	        throw new Error('Basic auth requires https.');
	    }
	    if (settings.hasOwnProperty('requestBatchSize')) {
	        if (!Number.isInteger(requestBatchSize) || requestBatchSize <= 0) {
	            throw new Error('Invalid `requestBatchSize` option');
	        }
	    }
	    return { provider: providerUri, requestBatchSize: requestBatchSize, apiVersion: apiVersion, user: user, password: password, agent: agent };
	};

	});

	unwrapExports(settings);
	var settings_1 = settings.DEFAULT_PORT;
	var settings_2 = settings.DEFAULT_HOST;
	var settings_3 = settings.DEFAULT_URI;
	var settings_4 = settings.REQUEST_BATCH_SIZE;
	var settings_5 = settings.API_VERSION;
	var settings_6 = settings.getSettingsWithDefaults;

	var request = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	exports.__esModule = true;
	 // tslint:disable-line no-submodule-imports



	var requestError = function (statusText) { return "Request error: " + statusText; };
	/**
	 * Sends an http request to a specified host.
	 *
	 * @method send
	 *
	 * @memberof module:http-client
	 *
	 * @param {Command} command
	 *
	 * @param {String} [uri=http://localhost:14265]
	 *
	 * @param {String|Number} [apiVersion=1]
	 *
	 * @return Promise
	 * @fulil {Object} - Response
	 * @reject {Error} - Request error
	 */
	exports.send = function (params) {
	    var headers = {
	        'Content-Type': 'application/json',
	        'X-IOTA-API-Version': (params.apiVersion || settings.API_VERSION).toString()
	    };
	    var uri = params.uri || settings.DEFAULT_URI;
	    if (params.user && params.password) {
	        if (urlParse(uri, true).protocol !== 'https:') {
	            throw new Error('Basic auth requires https.');
	        }
	        headers.Authorization = "Basic " + Buffer.from(params.user + ":" + params.password).toString('base64');
	    }
	    return fetch(uri, {
	        method: 'POST',
	        headers: headers,
	        body: JSON.stringify(params.command),
	        agent: params.agent
	    }).then(function (res) {
	        return res
	            .json()
	            .then(function (json) {
	            return res.ok
	                ? json
	                : Promise.reject(new Error(requestError(json.error || json.exception ? json.error || json.exception : res.statusText)));
	        })["catch"](function (error) {
	            if (!res.ok && error.type === 'invalid-json') {
	                throw new Error(requestError(res.statusText));
	            }
	            else {
	                throw error;
	            }
	        });
	    });
	};
	/**
	 * Sends a batched http request to a specified host
	 * supports findTransactions, getBalances & getTrytes commands
	 *
	 * @method batchedSend
	 *
	 * @param {Command} command
	 *
	 * @param {String[]} keysToBatch
	 *
	 * @param {Number} [requestBatchSize=1000]
	 *
	 * @param {String} [uri='http://localhost:14265']
	 *
	 * @param {String|Number} [apiVersion=1]
	 *
	 * @ignore
	 *
	 * @return Promise
	 * @fulil {Object} - Response
	 * @reject {Error} - Request error
	 */
	exports.batchedSend = function (requestParams, keysToBatch, requestBatchSize) {
	    if (requestBatchSize === void 0) { requestBatchSize = settings.REQUEST_BATCH_SIZE; }
	    var params = Object.keys(requestParams.command)
	        .filter(function (key) { return keysToBatch.indexOf(key) === -1; })
	        .reduce(function (acc, key) {
	        var _a;
	        return (__assign({}, acc, (_a = {}, _a[key] = requestParams.command[key], _a)));
	    }, {});
	    return Promise.all(keysToBatch.map(function (key) {
	        return Promise.all(requestParams.command[key]
	            .reduce(function (acc, _, // tslint:disable-line no-unused-variable
	        i) {
	            var _a;
	            return i < Math.ceil(requestParams.command[key].length / requestBatchSize)
	                ? acc.concat(__assign({}, params, (_a = {}, _a[key] = requestParams.command[key].slice(i * requestBatchSize, (1 + i) * requestBatchSize), _a)))
	                : acc;
	        }, [])
	            .map(function (batchedCommand) { return exports.send(__assign({}, requestParams, { command: batchedCommand })); })).then(function (res) { return res.reduce(function (acc, batch) { return acc.concat(batch); }, []); });
	    })).then(function (responses) {
	        switch (requestParams.command.command) {
	            case types$2.IRICommand.FIND_TRANSACTIONS:
	                return {
	                    hashes: responses[0][0].hashes.filter(function (hash) {
	                        return responses.every(function (response) {
	                            return response.findIndex(function (res) { return res.hashes.indexOf(hash) > -1; }) > -1;
	                        });
	                    })
	                };
	            case types$2.IRICommand.GET_BALANCES:
	                return __assign({}, responses[0]
	                    .slice()
	                    .sort(function (a, b) { return a.milestoneIndex - b.milestoneIndex; })
	                    .slice(-1)[0], { balances: responses[0].reduce(function (acc, response) {
	                        return acc.concat(response.balances);
	                    }, []) });
	            case types$2.IRICommand.GET_INCLUSION_STATES:
	                return __assign({}, responses[0][0], { states: responses[0].reduce(function (acc, response) {
	                        return acc.concat(response.states);
	                    }, []) });
	            case types$2.IRICommand.GET_TRYTES:
	                return {
	                    trytes: responses[0].reduce(function (acc, response) { return acc.concat(response.trytes); }, [])
	                };
	            default:
	                throw requestError('Invalid batched request.');
	        }
	    });
	};

	});

	unwrapExports(request);
	var request_1 = request.send;
	var request_2 = request.batchedSend;

	var httpClient = createCommonjsModule(function (module, exports) {
	/** @module http-client */
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	exports.__esModule = true;
	var _a;




	var BATCH_SIZE = 1000;
	/* Batchable keys for each command */
	exports.batchableKeys = (_a = {},
	    _a[types$2.IRICommand.FIND_TRANSACTIONS] = ['addresses', 'approvees', 'bundles', 'tags'],
	    _a[types$2.IRICommand.GET_BALANCES] = ['addresses'],
	    _a[types$2.IRICommand.GET_INCLUSION_STATES] = ['tips', 'transactions'],
	    _a[types$2.IRICommand.GET_TRYTES] = ['hashes'],
	    _a);
	exports.isBatchableCommand = function (command) {
	    return command.command === types$2.IRICommand.FIND_TRANSACTIONS ||
	        command.command === types$2.IRICommand.GET_BALANCES ||
	        command.command === types$2.IRICommand.GET_INCLUSION_STATES ||
	        command.command === types$2.IRICommand.GET_TRYTES;
	};
	exports.getKeysToBatch = function (command, batchSize) {
	    if (batchSize === void 0) { batchSize = BATCH_SIZE; }
	    return Object.keys(command).filter(function (key) {
	        return exports.batchableKeys[command.command].indexOf(key) > -1 &&
	            Array.isArray(command[key]) &&
	            command[key].length > batchSize;
	    });
	};
	/**
	 * This method creates an HTTP client that you can use to send requests to the [IRI API endpoints](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference).
	 *
	 * ## Related methods
	 *
	 * To send requests to the IRI node, use the [`send()`]{@link #module_http-client.send} method.
	 *
	 * @method createHttpClient
	 *
	 * @summary Creates an HTTP client to access the IRI API.
	 *
	 * @memberof module:http-client
	 *
	 * @param {Object} [settings={}]
	 * @param {String} [settings.provider=http://localhost:14265] URI of an IRI node to connect to
	 * @param {String | number} [settings.apiVersion=1] - IOTA API version to be sent in the `X-IOTA-API-Version` header.
	 * @param {number} [settings.requestBatchSize=1000] - Number of search values per request
	 *
	 * @example
	 * ```js
	 * let settings = {
	 *  provider: 'http://mynode.eu:14265'
	 * }
	 *
	 * let httpClient = HttpClient.createHttpClient(settings);
	 * ```
	 *
	 * @return HTTP client object
	 */
	exports.createHttpClient = function (settings$1) {
	    var currentSettings = settings.getSettingsWithDefaults(__assign({}, settings$1));
	    return {
	        /**
	        * This method uses the HTTP client to send requests to the [IRI API endpoints](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference).
	        *
	        * ## Related methods
	        *
	        * To create an HTTP client, use the [`createHttpClient()`]{@link #module_http-client.createHttpClient} method.
	        *
	        * @method createHttpClient
	        *
	        * @summary Sends an API request to the connected IRI node.
	        *
	        * @param {Object} command - The request body for the API endpoint
	        *
	        * @example
	        * ```js
	        * let httpClient = HttpClient.createHttpClient(settings);
	        * httpClient.send({command:'getNodeInfo'})
	        * .then(response => {
	        *   console.log(response);
	        * })
	        * .catch(error => {
	        *   console.log(error);
	        * })
	        * ```
	        *
	        * @return {Promise}
	        *
	        * @fulfil {Object} response - The response from the IRI node
	        *
	        * @reject {Object} error - The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
	        */
	        send: function (command) {
	            return bluebird["try"](function () {
	                var provider = currentSettings.provider, user = currentSettings.user, password = currentSettings.password, requestBatchSize = currentSettings.requestBatchSize, apiVersion = currentSettings.apiVersion, agent = currentSettings.agent;
	                if (exports.isBatchableCommand(command)) {
	                    var keysToBatch = exports.getKeysToBatch(command, requestBatchSize);
	                    if (keysToBatch.length) {
	                        return request.batchedSend({ command: command, uri: provider, user: user, password: password, apiVersion: apiVersion, agent: agent }, keysToBatch, requestBatchSize);
	                    }
	                }
	                return request.send({ command: command, uri: provider, user: user, password: password, apiVersion: apiVersion, agent: agent });
	            });
	        },
	        /**
	        * This method updates the settings of an existing HTTP client.
	        *
	        * ## Related methods
	        *
	        * To create an HTTP client, use the [`createHttpClient()`]{@link #module_http-client.createHttpClient} method.
	        *
	        * @method setSettings
	        *
	        * @summary Updates the settings of an existing HTTP client.
	        *
	        * @param {Object} [settings={}]
	        * @param {String} [settings.provider=http://localhost:14265] URI of an IRI node to connect to
	        * @param {String | number} [settings.apiVersion=1] - IOTA API version to be sent in the `X-IOTA-API-Version` header.
	        * @param {number} [settings.requestBatchSize=1000] - Number of search values per request.
	        *
	        * @example
	        * ```js
	        * let settings = {
	        *   provider: 'https://nodes.devnet.thetangle.org:443'
	        *   }
	        *
	        * let httpClient = http.createHttpClient(settings);
	        * httpClient.send({command:'getNodeInfo'}).then(res => {
	        *   console.log(res)
	        * }).catch(err => {
	        *   console.log(err)
	        * });
	        *
	        * httpClient.setSettings({provider:'http://newnode.org:14265'});
	        *
	        * httpClient.send({command:'getNodeInfo'}).then(res => {
	        *   console.log(res)
	        * }).catch(err => {
	        *   console.log(err)
	        * })
	        * ```
	        *
	        * @return {void}
	        */
	        setSettings: function (newSettings) {
	            currentSettings = settings.getSettingsWithDefaults(__assign({}, currentSettings, newSettings));
	        }
	    };
	};

	});

	unwrapExports(httpClient);
	var httpClient_1 = httpClient.batchableKeys;
	var httpClient_2 = httpClient.isBatchableCommand;
	var httpClient_3 = httpClient.getKeysToBatch;
	var httpClient_4 = httpClient.createHttpClient;

	var src$a = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;

	exports.createHttpClient = httpClient.createHttpClient;

	exports.IRICommand = types$2.IRICommand;

	exports.send = request.send;

	});

	unwrapExports(src$a);
	var src_1$8 = src$a.createHttpClient;
	var src_2$8 = src$a.IRICommand;
	var src_3$7 = src$a.send;

	var createGetTransfers = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;





	var defaults = {
	    start: 0,
	    end: undefined,
	    inclusionStates: false,
	    security: 2
	};
	exports.transferToAddressOptions = function (start, end, security) {
	    return createGetNewAddress.getNewAddressOptions({
	        index: start,
	        total: end ? end - start : undefined,
	        security: security,
	        returnAll: true
	    });
	};
	exports.getTransfersOptions = types.getOptionsWithDefaults(defaults);
	/**
	 * @ignore
	 *
	 * @method createGetTransfers
	 *
	 * @param {Provider} provider - Network provider
	 *
	 * @return {Function} {@link getTransfers}
	 */
	exports.createGetTransfers = function (provider, caller) {
	    var getNewAddress = createGetNewAddress.createGetNewAddress(provider, 'lib');
	    var getBundlesFromAddresses = createGetBundlesFromAddresses.createGetBundlesFromAddresses(provider, 'lib');
	    /**
	     * @ignore
	     *
	     * @method getTransfers
	     *
	     * @param {String} seed
	     * @param {Object} [options]
	     * @param {Number} [options.start=0] Starting key index
	     * @param {Number} [options.end] Ending key index
	     * @param {Number} [options.security=2] - Security level to be used for generating addresses
	     * @param {Boolean} [options.inclusionStates=false] - Flag that enables fetching of inclusion states
	     * for each transfer
	     * @param {Function} [callback] - optional callback
	     *
	     * @returns {Promise}
	     * @fulfil {Transaction[][]}
	     * @reject {Error}
	     * - `INVALID_SEED`
	     * - `INVALID_SECURITY_LEVEL`
	     * - `INVALID_START_OPTION`
	     * - `INVALID_START_END_OPTIONS`
	     * - Fetch error
	     */
	    return function getTransfers(seed, options, callback) {
	        if (options === void 0) { options = {}; }
	        if (caller !== 'lib') {
	            /* tslint:disable-next-line:no-console */
	            console.warn('`getTransfers()` is deprecated and will be removed in v2.0.0. ' +
	                '`findTransactions()` should be used instead.');
	        }
	        var _a = exports.getTransfersOptions(options), start = _a.start, end = _a.end, security = _a.security, inclusionStates = _a.inclusionStates;
	        return bluebird.resolve(guards.validate(guards.seedValidator(seed), guards.securityLevelValidator(security), guards.startOptionValidator(start), guards.startEndOptionsValidator({ start: start, end: end })))
	            .then(function () { return exports.transferToAddressOptions(start, end, security); })
	            .then(function (addrOptions) { return getNewAddress(seed, addrOptions); })
	            .then(function (addresses) { return getBundlesFromAddresses(types.asArray(addresses), inclusionStates); })
	            .asCallback(callback);
	    };
	};

	});

	unwrapExports(createGetTransfers);
	var createGetTransfers_1 = createGetTransfers.transferToAddressOptions;
	var createGetTransfers_2 = createGetTransfers.getTransfersOptions;
	var createGetTransfers_3 = createGetTransfers.createGetTransfers;

	var composeAPI = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;




	function returnType(func) {
	    return {}; // tslint:disable-line no-object-literal-type-assertion
	}
	exports.returnType = returnType;
	/**
	 * @method composeApi
	 *
	 * @summary Creates an API object that's used to send requests to an IRI node.
	 *
	 * @memberof module:core
	 *
	 * @param {Object} [settings={}] - Connection settings.
	 * @param {Provider} [settings.network=http-client] - Network provider
	 * @param {string} [settings.provider=http://localhost:14265] - URI of an IRI node
	 * @param {Function} [settings.attachToTangle=attachToTangle] - Function that overrides the default `attachToTangle` endpoint
	 * @param {string | number} [settings.apiVersion=1] - IOTA API version to use in the `X-IOTA-API-Version` HTTP header
	 * @param {number} [settings.requestBatchSize=1000] - Maximum number of parameters that may be sent in batched API request for [`findTransactions`]{@link #module_core.findTransactions}, [`getBalances`]{@link #module_core.getBalances}, [`getInclusionStates`]{@link #module_core.getInclusionStates}, and [`getTrytes`]{@link #module_core.getTrytes}
	 *
	 * @example
	 * ```js
	 * const Iota = require('@iota/core`);
	 *
	 * const iota = Iota.composeAPI({
	 *  provider: 'https://nodes.devnet.thetangle.org:443'
	 * });
	 * ```
	 *
	 * @return {API} iota - API object to use to interact with an IRI node.
	 */
	exports.composeAPI = function (settings) {
	    if (settings === void 0) { settings = {}; }
	    var provider = src$a.createHttpClient(settings);
	    var attachToTangle = settings.attachToTangle || src$b.createAttachToTangle(provider);
	    /**
	     * @method setSettings
	     *
	     * @summary Defines network provider configuration and [`attachToTangle`]{@link #module_core.attachToTangle} method.
	     *
	     * @memberof API
	     *
	     * @param {Object} settings - Provider settings object
	     * @param {string} [settings.provider] - URI of an IRI node
	     * @param {Provider} [settings.network] - Network provider
	     * @param {Function} [settings.attachToTangle] - A new `attachToTangle()` function
	     */
	    function setSettings(newSettings) {
	        if (newSettings === void 0) { newSettings = {}; }
	        if (newSettings.attachToTangle) {
	            attachToTangle = newSettings.attachToTangle;
	        }
	        if (newSettings.network) {
	            provider = newSettings.network;
	        }
	        provider.setSettings(newSettings);
	    }
	    /**
	     *
	     * @method overrideNetwork
	     *
	     * @summary Overrides the default provider
	     *
	     * @memberof API
	     *
	     * @ignore
	     *
	     * @param {Provider} network - Provider instance to use to override the existing network settings
	     */
	    function overrideNetwork(network) {
	        provider = network;
	    }
	    /**
	     *
	     * @method overrideAttachToTangle
	     *
	     * @summary Overrides the default [`attachToTangle`]{@link #module_core.attachToTangle} method
	     *
	     * @memberof API
	     *
	     * @ignore
	     *
	     * @param {function} attachToTangle - Function that overrides the
	     * [`attachToTangle`]{@link #module_core.attachToTangle} method
	     */
	    function overrideAttachToTangle(attachFn) {
	        attachToTangle = attachFn;
	    }
	    /** @namespace API */
	    return {
	        // IRI commands
	        addNeighbors: src$b.createAddNeighbors(provider),
	        attachToTangle: attachToTangle,
	        broadcastTransactions: src$b.createBroadcastTransactions(provider),
	        checkConsistency: src$b.createCheckConsistency(provider),
	        findTransactions: src$b.createFindTransactions(provider),
	        getBalances: src$b.createGetBalances(provider),
	        getInclusionStates: src$b.createGetInclusionStates(provider),
	        getNeighbors: src$b.createGetNeighbors(provider),
	        getNodeInfo: src$b.createGetNodeInfo(provider),
	        getTransactionsToApprove: src$b.createGetTransactionsToApprove(provider),
	        getTrytes: src$b.createGetTrytes(provider),
	        interruptAttachingToTangle: src$b.createInterruptAttachingToTangle(provider),
	        removeNeighbors: src$b.createRemoveNeighbors(provider),
	        storeTransactions: src$b.createStoreTransactions(provider),
	        wereAddressesSpentFrom: src$b.createWereAddressesSpentFrom(provider),
	        sendCommand: provider.send,
	        // Wrapper methods
	        broadcastBundle: src$b.createBroadcastBundle(provider),
	        getAccountData: src$b.createGetAccountData(provider),
	        getBundle: src$b.createGetBundle(provider),
	        getBundlesFromAddresses: createGetBundlesFromAddresses.createGetBundlesFromAddresses(provider),
	        getNewAddress: src$b.createGetNewAddress(provider),
	        getTransactionObjects: src$b.createGetTransactionObjects(provider),
	        findTransactionObjects: src$b.createFindTransactionObjects(provider),
	        getInputs: src$b.createGetInputs(provider),
	        getTransfers: createGetTransfers.createGetTransfers(provider),
	        isPromotable: src$b.createIsPromotable(provider),
	        isReattachable: src$b.createIsReattachable(provider),
	        prepareTransfers: src$b.createPrepareTransfers(provider),
	        promoteTransaction: src$b.createPromoteTransaction(provider, attachToTangle),
	        replayBundle: src$b.createReplayBundle(provider, attachToTangle),
	        // sendTransfer: createSendTransfer(provider, attachToTangle),
	        sendTrytes: src$b.createSendTrytes(provider, attachToTangle),
	        storeAndBroadcast: src$b.createStoreAndBroadcast(provider),
	        traverseBundle: src$b.createTraverseBundle(provider),
	        setSettings: setSettings,
	        overrideAttachToTangle: overrideAttachToTangle,
	        overrideNetwork: overrideNetwork
	    };
	};
	exports.apiType = returnType(exports.composeAPI);

	});

	unwrapExports(composeAPI);
	var composeAPI_1 = composeAPI.returnType;
	var composeAPI_2 = composeAPI.composeAPI;
	var composeAPI_3 = composeAPI.apiType;

	var src$b = createCommonjsModule(function (module, exports) {
	/** @module core */
	exports.__esModule = true;
	// IRI commands

	exports.IRICommand = types.IRICommand;

	exports.createAddNeighbors = createAddNeighbors.createAddNeighbors;

	exports.createAttachToTangle = createAttachToTangle.createAttachToTangle;

	exports.createBroadcastTransactions = createBroadcastTransactions.createBroadcastTransactions;

	exports.createCheckConsistency = createCheckConsistency.createCheckConsistency;

	exports.createFindTransactions = createFindTransactions.createFindTransactions;

	exports.createGetBalances = createGetBalances.createGetBalances;

	exports.createGetInclusionStates = createGetInclusionStates.createGetInclusionStates;

	exports.createGetNeighbors = createGetNeighbors.createGetNeighbors;

	exports.createGetNodeInfo = createGetNodeInfo.createGetNodeInfo;

	exports.createGetTransactionsToApprove = createGetTransactionsToApprove.createGetTransactionsToApprove;

	exports.createGetTrytes = createGetTrytes.createGetTrytes;

	exports.createInterruptAttachingToTangle = createInterruptAttachingToTangle.createInterruptAttachingToTangle;

	exports.createRemoveNeighbors = createRemoveNeighbors.createRemoveNeighbors;

	exports.createStoreTransactions = createStoreTransactions.createStoreTransactions;
	// `wereAddressesSpentFrom` command is a temporary measure to prevent loss of funds,
	// when security assumptions are ignored by developers or wallet users.
	// It's being used internally by `getNewAddress()`.
	// Avoid developing programs that rely on this method.
	//

	exports.createWereAddressesSpentFrom = createWereAddressesSpentFrom.createWereAddressesSpentFrom;
	// Wrappers

	exports.createBroadcastBundle = createBroadcastBundle.createBroadcastBundle;

	exports.createFindTransactionObjects = createFindTransactionObjects.createFindTransactionObjects;

	exports.createGetAccountData = createGetAccountData.createGetAccountData;

	exports.createGetBundle = createGetBundle.createGetBundle;
	// `getBundlesFromAddress` has been deprecated because of its poor performance.
	// Traversing and validating bundles gets slower as bundle instances increase.
	// Use `findTransactionObjects` on `addresses` and lazily fetch the bundles when needed.
	//

	exports.createGetBundlesFromAddresses = createGetBundlesFromAddresses.createGetBundlesFromAddresses;

	exports.createGetInputs = createGetInputs.createGetInputs;

	exports.createGetNewAddress = createGetNewAddress.createGetNewAddress;
	// createGetUntilFirstUnusedAddress,
	exports.createIsAddressUsed = createGetNewAddress.createIsAddressUsed;

	exports.createGetTransactionObjects = createGetTransactionObjects.createGetTransactionObjects;
	// `getTransfers` has been deprecated because of poor performance (regenerates addresses
	// and calls `getBundlesFromAddresses`).
	// Use `findTransactionObjects` as replacement and prefer to lazily fetch complete bundles,
	// if and when required.
	//
	// export {
	//     createGetTransfers,
	//     getTransfersOptions,
	//     GetTransfersOptions
	// } from './createGetTransfers'

	exports.isAboveMaxDepth = createIsPromotable.isAboveMaxDepth;
	exports.createIsPromotable = createIsPromotable.createIsPromotable;

	exports.createIsReattachable = createIsReattachable.createIsReattachable;

	exports.createPromoteTransaction = createPromoteTransaction.createPromoteTransaction;

	exports.createReplayBundle = createReplayBundle.createReplayBundle;

	exports.createSendTrytes = createSendTrytes.createSendTrytes;

	exports.createPrepareTransfers = createPrepareTransfers.createPrepareTransfers;

	exports.createStoreAndBroadcast = createStoreAndBroadcast.createStoreAndBroadcast;

	exports.createTraverseBundle = createTraverseBundle.createTraverseBundle;

	exports.generateAddress = generateAddress.generateAddress;
	// Errors

	exports.errors = errors$1;
	// export api factory with default provider

	exports.composeAPI = composeAPI.composeAPI;

	});

	unwrapExports(src$b);
	var src_1$9 = src$b.IRICommand;
	var src_2$9 = src$b.createAddNeighbors;
	var src_3$8 = src$b.createAttachToTangle;
	var src_4$6 = src$b.createBroadcastTransactions;
	var src_5$4 = src$b.createCheckConsistency;
	var src_6$3 = src$b.createFindTransactions;
	var src_7$2 = src$b.createGetBalances;
	var src_8$1 = src$b.createGetInclusionStates;
	var src_9$1 = src$b.createGetNeighbors;
	var src_10$1 = src$b.createGetNodeInfo;
	var src_11$1 = src$b.createGetTransactionsToApprove;
	var src_12$1 = src$b.createGetTrytes;
	var src_13$1 = src$b.createInterruptAttachingToTangle;
	var src_14$1 = src$b.createRemoveNeighbors;
	var src_15$1 = src$b.createStoreTransactions;
	var src_16$1 = src$b.createWereAddressesSpentFrom;
	var src_17$1 = src$b.createBroadcastBundle;
	var src_18$1 = src$b.createFindTransactionObjects;
	var src_19$1 = src$b.createGetAccountData;
	var src_20$1 = src$b.createGetBundle;
	var src_21$1 = src$b.createGetBundlesFromAddresses;
	var src_22$1 = src$b.createGetInputs;
	var src_23$1 = src$b.createGetNewAddress;
	var src_24$1 = src$b.createIsAddressUsed;
	var src_25$1 = src$b.createGetTransactionObjects;
	var src_26$1 = src$b.isAboveMaxDepth;
	var src_27$1 = src$b.createIsPromotable;
	var src_28$1 = src$b.createIsReattachable;
	var src_29$1 = src$b.createPromoteTransaction;
	var src_30$1 = src$b.createReplayBundle;
	var src_31$1 = src$b.createSendTrytes;
	var src_32$1 = src$b.createPrepareTransfers;
	var src_33$1 = src$b.createStoreAndBroadcast;
	var src_34$1 = src$b.createTraverseBundle;
	var src_35$1 = src$b.generateAddress;
	var src_36$1 = src$b.errors;
	var src_37$1 = src$b.composeAPI;

	var errors$a = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.ILLEGAL_LENGTH = 'Illegal trits length';
	exports.ILLEGAL_SUBSEED_INDEX = 'Illegal subseed length';
	exports.ILLEGAL_SUBSEED_LENGTH = 'Illegal subseed length';
	exports.ILLEGAL_NUMBER_OF_FRAGMENTS = 'Illegal number of fragments';
	exports.ILLEGAL_KEY_LENGTH = 'Illegal key length';
	exports.ILLEGAL_DIGESTS_LENGTH = 'Illegal digests length';
	exports.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH = 'Illegal normalized fragment length';
	exports.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH = 'Illegal signature fragment length';
	exports.ILLEGAL_BUNDLE_HASH_LENGTH = 'Illegal bundle hash length';
	exports.ILLEGAL_KEY_FRAGMENT_LENGTH = 'Illegal key fragment length';
	exports.ILLEGAL_TRIT_CONVERSION_INPUT = 'Illegal conversion input. Expected trits as Int8Array.';
	exports.ILLEGAL_TRYTE_CONVERSION_INPUT = 'Illegal conversion input. Expected trytes string or integer.';
	exports.ILLEGAL_MIN_WEIGHT_MAGNITUDE = 'Illegal minWeightMagnitude value.';
	exports.ILLEGAL_ADDRESS_LAST_TRIT = 'Illegal address. Last trit must be 0.';
	exports.ILLEGAL_ADDRESS_LENGTH = 'Illegal address length.';
	exports.ILLEGAL_BUNDLE_LENGTH = 'Illegal bundle hash length.';
	exports.ILLEGAL_OBSOLETE_TAG_LENGTH = 'Illegal obsoleteTag length.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE = 'Illegal signature or message.';
	exports.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH = 'Illegal signatureOrMessage length.';
	exports.ILLEGAL_TAG_LENGTH = 'Illegal tag length.';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP = 'Illegal issuance timestamp';
	exports.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH = 'Illegal issuanceTimestamp length.';
	exports.ILLEGAL_VALUE_LENGTH = 'Illegal value length.';
	exports.ILLEGAL_TRANSACTION_FIELD_OFFSET = 'Illegal transaction field offset.';
	exports.ILLEGAL_TRANSACTION_FIELD_LENGTH = 'Illegal transaction field length.';
	exports.ILLEGAL_LENGTH_OR_OFFSET = 'Illegal length or offset.';
	exports.ILLEGAL_TRANSACTION_BUFFER = 'Illegal transaction buffer. Expected `Int8Array`.';
	exports.ILLEGAL_TRANSACTION_BUFFER_LENGTH = 'Illegal transaction buffer length.';
	exports.ILLEGAL_TRANSACTION_OFFSET = 'Illegal transaction offset.';
	exports.ILLEGAL_TRANSACTION_LENGTH = 'Illegal transaction length.';
	exports.ILLEGAL_TRANSACTION_ORDER = 'Illegal transaction order.';
	exports.ILLEGAL_TRANSACTION_INDEX = 'Illegal transaction index.';
	exports.ILLEGAL_SEED_LENGTH = 'Illegal seed length. Expected length of 243 trits.';
	exports.ILLEGAL_KEY_INDEX = 'Illegal key index.';
	exports.ILLEGAL_CDA_LENGTH = 'Illegal cda length.';
	exports.ILLEGAL_BATCH = 'Illegal batch.';
	exports.CDA_ALREADY_IN_STORE = 'CDA is already in store.';
	exports.ILLEGAL_PERSISTENCE_ID = 'Illegal persistence id.';
	exports.ILLEGAL_PERSISTENCE_PATH = 'Illegal persistence path.';
	exports.ILLEGAL_PADDING_LENGTH = 'Illegal padding length. Input value length exceeds padding length.';
	exports.INCONSISTENT_SUBTANGLE = 'Inconsistent subtangle';
	exports.INSUFFICIENT_BALANCE = 'Insufficient balance';
	exports.INVALID_ADDRESS = 'Invalid address';
	exports.INVALID_REMAINDER_ADDRESS = 'Invalid remainder address';
	exports.INVALID_BRANCH_TRANSACTION = 'Invalid branch transaction';
	exports.INVALID_BUNDLE = 'Invalid bundle';
	exports.INVALID_BUNDLE_HASH = 'Invalid bundle hash';
	exports.INVALID_CHECKSUM = 'Invalid checksum';
	exports.INVALID_COMMAND = 'Invalid command format';
	exports.INVALID_DEPTH = 'Invalid depth';
	exports.INVALID_HASH = 'Invalid hash';
	exports.INVALID_INDEX = 'Invalid index option';
	exports.INVALID_TOTAL_OPTION = 'Invalid total option';
	exports.INVALID_INPUT = 'Invalid input';
	exports.INVALID_KEY = 'Invalid key value';
	exports.INVALID_MIN_WEIGHT_MAGNITUDE = 'Invalid Min Weight Magnitude';
	exports.INVALID_SEARCH_KEY = 'Invalid search key';
	exports.INVALID_SECURITY_LEVEL = 'Invalid security option';
	exports.INVALID_SECURITY_OPTION = 'Invalid security option';
	exports.INVALID_SEED = 'Invalid seed';
	exports.INVALID_START_END_OPTIONS = 'Invalid end option';
	exports.INVALID_START_OPTION = 'Invalid start option';
	exports.INVALID_TAG = 'Invalid tag';
	exports.INVALID_TRANSACTION = 'Invalid transaction';
	exports.INVALID_TRANSACTION_TRYTES = 'Invalid transaction trytes';
	exports.INVALID_ATTACHED_TRYTES = 'Invalid attached trytes';
	exports.INVALID_TRANSACTION_HASH = 'Invalid transaction hash';
	exports.INVALID_TAIL_TRANSACTION = 'Invalid tail transaction';
	exports.INVALID_THRESHOLD = 'Invalid threshold option';
	exports.INVALID_TRANSFER = 'Invalid transfer array';
	exports.INVALID_TRUNK_TRANSACTION = 'Invalid trunk transaction';
	exports.INVALID_REFERENCE_HASH = 'Invalid reference hash';
	exports.INVALID_TRYTES = 'Invalid trytes';
	exports.INVALID_URI = 'Invalid uri';
	exports.INVALID_ASCII_INPUT = 'Conversion to trytes requires type of input to be encoded in ascii.';
	exports.INVALID_ODD_LENGTH = 'Conversion from trytes requires length of trytes to be even.';
	exports.INVALID_TRYTE_ENCODED_JSON = 'Invalid tryte encoded JSON message';
	exports.NOT_INT = 'One of the inputs is not integer';
	exports.SENDING_BACK_TO_INPUTS = 'One of the transaction inputs is used as output.';
	exports.INVALID_TRANSACTIONS_TO_APPROVE = 'Invalid transactions to approve.';
	exports.NO_INPUTS = 'Could not find any available inputs.';
	exports.invalidChecksum = function (address) { return "Invalid Checksum: " + address; };
	exports.inconsistentTransaction = function (reason) { return "Transaction is inconsistent. Reason: " + reason; };
	exports.INVALID_DELAY = 'Invalid delay.';

	});

	unwrapExports(errors$a);
	var errors_1$a = errors$a.ILLEGAL_LENGTH;
	var errors_2$a = errors$a.ILLEGAL_SUBSEED_INDEX;
	var errors_3$9 = errors$a.ILLEGAL_SUBSEED_LENGTH;
	var errors_4$9 = errors$a.ILLEGAL_NUMBER_OF_FRAGMENTS;
	var errors_5$8 = errors$a.ILLEGAL_KEY_LENGTH;
	var errors_6$8 = errors$a.ILLEGAL_DIGESTS_LENGTH;
	var errors_7$8 = errors$a.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH;
	var errors_8$8 = errors$a.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH;
	var errors_9$8 = errors$a.ILLEGAL_BUNDLE_HASH_LENGTH;
	var errors_10$8 = errors$a.ILLEGAL_KEY_FRAGMENT_LENGTH;
	var errors_11$8 = errors$a.ILLEGAL_TRIT_CONVERSION_INPUT;
	var errors_12$8 = errors$a.ILLEGAL_TRYTE_CONVERSION_INPUT;
	var errors_13$8 = errors$a.ILLEGAL_MIN_WEIGHT_MAGNITUDE;
	var errors_14$8 = errors$a.ILLEGAL_ADDRESS_LAST_TRIT;
	var errors_15$8 = errors$a.ILLEGAL_ADDRESS_LENGTH;
	var errors_16$8 = errors$a.ILLEGAL_BUNDLE_LENGTH;
	var errors_17$8 = errors$a.ILLEGAL_OBSOLETE_TAG_LENGTH;
	var errors_18$8 = errors$a.ILLEGAL_SIGNATURE_OR_MESSAGE;
	var errors_19$8 = errors$a.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH;
	var errors_20$8 = errors$a.ILLEGAL_TAG_LENGTH;
	var errors_21$8 = errors$a.ILLEGAL_ISSUANCE_TIMESTAMP;
	var errors_22$8 = errors$a.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH;
	var errors_23$8 = errors$a.ILLEGAL_VALUE_LENGTH;
	var errors_24$8 = errors$a.ILLEGAL_TRANSACTION_FIELD_OFFSET;
	var errors_25$8 = errors$a.ILLEGAL_TRANSACTION_FIELD_LENGTH;
	var errors_26$8 = errors$a.ILLEGAL_LENGTH_OR_OFFSET;
	var errors_27$8 = errors$a.ILLEGAL_TRANSACTION_BUFFER;
	var errors_28$8 = errors$a.ILLEGAL_TRANSACTION_BUFFER_LENGTH;
	var errors_29$8 = errors$a.ILLEGAL_TRANSACTION_OFFSET;
	var errors_30$8 = errors$a.ILLEGAL_TRANSACTION_LENGTH;
	var errors_31$8 = errors$a.ILLEGAL_TRANSACTION_ORDER;
	var errors_32$8 = errors$a.ILLEGAL_TRANSACTION_INDEX;
	var errors_33$8 = errors$a.ILLEGAL_SEED_LENGTH;
	var errors_34$8 = errors$a.ILLEGAL_KEY_INDEX;
	var errors_35$8 = errors$a.ILLEGAL_CDA_LENGTH;
	var errors_36$8 = errors$a.ILLEGAL_BATCH;
	var errors_37$8 = errors$a.CDA_ALREADY_IN_STORE;
	var errors_38$8 = errors$a.ILLEGAL_PERSISTENCE_ID;
	var errors_39$8 = errors$a.ILLEGAL_PERSISTENCE_PATH;
	var errors_40$8 = errors$a.ILLEGAL_PADDING_LENGTH;
	var errors_41$8 = errors$a.INCONSISTENT_SUBTANGLE;
	var errors_42$8 = errors$a.INSUFFICIENT_BALANCE;
	var errors_43$8 = errors$a.INVALID_ADDRESS;
	var errors_44$8 = errors$a.INVALID_REMAINDER_ADDRESS;
	var errors_45$8 = errors$a.INVALID_BRANCH_TRANSACTION;
	var errors_46$8 = errors$a.INVALID_BUNDLE;
	var errors_47$8 = errors$a.INVALID_BUNDLE_HASH;
	var errors_48$8 = errors$a.INVALID_CHECKSUM;
	var errors_49$8 = errors$a.INVALID_COMMAND;
	var errors_50$8 = errors$a.INVALID_DEPTH;
	var errors_51$8 = errors$a.INVALID_HASH;
	var errors_52$8 = errors$a.INVALID_INDEX;
	var errors_53$8 = errors$a.INVALID_TOTAL_OPTION;
	var errors_54$8 = errors$a.INVALID_INPUT;
	var errors_55$8 = errors$a.INVALID_KEY;
	var errors_56$8 = errors$a.INVALID_MIN_WEIGHT_MAGNITUDE;
	var errors_57$8 = errors$a.INVALID_SEARCH_KEY;
	var errors_58$8 = errors$a.INVALID_SECURITY_LEVEL;
	var errors_59$8 = errors$a.INVALID_SECURITY_OPTION;
	var errors_60$8 = errors$a.INVALID_SEED;
	var errors_61$8 = errors$a.INVALID_START_END_OPTIONS;
	var errors_62$8 = errors$a.INVALID_START_OPTION;
	var errors_63$8 = errors$a.INVALID_TAG;
	var errors_64$8 = errors$a.INVALID_TRANSACTION;
	var errors_65$8 = errors$a.INVALID_TRANSACTION_TRYTES;
	var errors_66$8 = errors$a.INVALID_ATTACHED_TRYTES;
	var errors_67$8 = errors$a.INVALID_TRANSACTION_HASH;
	var errors_68$8 = errors$a.INVALID_TAIL_TRANSACTION;
	var errors_69$8 = errors$a.INVALID_THRESHOLD;
	var errors_70$8 = errors$a.INVALID_TRANSFER;
	var errors_71$8 = errors$a.INVALID_TRUNK_TRANSACTION;
	var errors_72$8 = errors$a.INVALID_REFERENCE_HASH;
	var errors_73$8 = errors$a.INVALID_TRYTES;
	var errors_74$8 = errors$a.INVALID_URI;
	var errors_75$8 = errors$a.INVALID_ASCII_INPUT;
	var errors_76$8 = errors$a.INVALID_ODD_LENGTH;
	var errors_77$8 = errors$a.INVALID_TRYTE_ENCODED_JSON;
	var errors_78$8 = errors$a.NOT_INT;
	var errors_79$8 = errors$a.SENDING_BACK_TO_INPUTS;
	var errors_80$8 = errors$a.INVALID_TRANSACTIONS_TO_APPROVE;
	var errors_81$8 = errors$a.NO_INPUTS;
	var errors_82$8 = errors$a.invalidChecksum;
	var errors_83$8 = errors$a.inconsistentTransaction;
	var errors_84$8 = errors$a.INVALID_DELAY;

	var constants$4 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	exports.HASH_TRYTE_SIZE = 81;
	exports.TAG_TRYTE_SIZE = 27;
	exports.SIGNATURE_MESSAGE_FRAGMENT_TRYTE_SIZE = 2187;
	exports.TRANSACTION_TRYTE_SIZE = 2673;
	exports.MAX_INDEX_DIFF = 1000;
	exports.NULL_HASH_TRYTES = '9'.repeat(exports.HASH_TRYTE_SIZE);
	exports.NULL_TAG_TRYTES = '9'.repeat(exports.TAG_TRYTE_SIZE);
	exports.NULL_SIGNATURE_MESSAGE_FRAGMENT_TRYTES = '9'.repeat(exports.SIGNATURE_MESSAGE_FRAGMENT_TRYTE_SIZE);
	exports.NULL_TRANSACTION_TRYTES = '9'.repeat(exports.TRANSACTION_TRYTE_SIZE);

	});

	unwrapExports(constants$4);
	var constants_1$4 = constants$4.HASH_TRYTE_SIZE;
	var constants_2$4 = constants$4.TAG_TRYTE_SIZE;
	var constants_3$4 = constants$4.SIGNATURE_MESSAGE_FRAGMENT_TRYTE_SIZE;
	var constants_4$4 = constants$4.TRANSACTION_TRYTE_SIZE;
	var constants_5$4 = constants$4.MAX_INDEX_DIFF;
	var constants_6$4 = constants$4.NULL_HASH_TRYTES;
	var constants_7$4 = constants$4.NULL_TAG_TRYTES;
	var constants_8$4 = constants$4.NULL_SIGNATURE_MESSAGE_FRAGMENT_TRYTES;
	var constants_9$4 = constants$4.NULL_TRANSACTION_TRYTES;

	var guards$4 = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;


	// Required for markdown generation with JSDoc
	/**
	 * @module validators
	 */
	/* Type guards */
	/**
	 * Checks if input is an `Int8Array` of trit values; `-1, 0, 1`.
	 *
	 * @method isTrits
	 *
	 * @param {any} input
	 *
	 * @return {boolean}
	 */
	exports.isTrits = function (input) {
	    if (input instanceof Int8Array) {
	        for (var i = 0; i < input.length; i++) {
	            if (!(input[i] === 0 || input[i] === -1 || input[i] === 1)) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	};
	/**
	 * Checks if trits are NULL.
	 *
	 * @method isNullTrits
	 *
	 * @param {Int8Array} trits
	 *
	 * @return {boolean}
	 */
	exports.isNullTrits = function (input) {
	    if (input instanceof Int8Array) {
	        if (input.length === 0) {
	            return true;
	        }
	        for (var i = 0; i < input.length; i++) {
	            if (input[i] !== 0) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	};
	/**
	 * Checks if input is correct trytes consisting of [9A-Z]; optionally validate length
	 * @method isTrytes
	 *
	 * @param {string} trytes
	 * @param {string | number} [length='1,']
	 *
	 * @return {boolean}
	 */
	exports.isTrytes = function (trytes, length) {
	    if (length === void 0) { length = '1,'; }
	    return typeof trytes === 'string' && new RegExp("^[9A-Z]{" + length + "}$").test(trytes);
	};
	/**
	 * @method isTrytesOfExactLength
	 *
	 * @param {string} trytes
	 * @param {number} length
	 *
	 * @return {boolean}
	 */
	exports.isTrytesOfExactLength = function (trytes, length) {
	    return typeof trytes === 'string' && new RegExp("^[9A-Z]{" + length + "}$").test(trytes);
	};
	/**
	 * @method isTrytesOfMaxLength
	 *
	 * @param {string} trytes
	 * @param {number} length
	 *
	 * @return {boolean}
	 */
	exports.isTrytesOfMaxLength = function (trytes, length) {
	    return typeof trytes === 'string' && new RegExp("^[9A-Z]{1," + length + "}$").test(trytes);
	};
	/**
	 * Checks if input contains `9`s only.
	 * @method isEmpty
	 *
	 * @param {string} hash
	 *
	 * @return {boolean}
	 */
	exports.isEmpty = function (trytes) { return typeof trytes === 'string' && /^[9]+$/.test(trytes); };
	exports.isNinesTrytes = exports.isEmpty;
	/**
	 * Checks if input is correct hash (81 trytes) or address with checksum (90 trytes)
	 *
	 * @method isHash
	 *
	 * @param {string} hash
	 *
	 * @return {boolean}
	 */
	exports.isHash = function (hash) {
	    return exports.isTrytesOfExactLength(hash, constants$4.HASH_TRYTE_SIZE) || exports.isTrytesOfExactLength(hash, constants$4.HASH_TRYTE_SIZE + 9);
	}; // address w/ checksum is valid hash
	/* Check if security level is valid positive integer */
	exports.isSecurityLevel = function (security) {
	    return Number.isInteger(security) && security > 0 && security < 4;
	};
	/**
	 * Checks if input is valid input object. Address can be passed with or without checksum.
	 * It does not validate the checksum.
	 *
	 * @method isInput
	 *
	 * @param {string} address
	 *
	 * @return {boolean}
	 */
	exports.isInput = function (input) {
	    return exports.isHash(input.address) &&
	        exports.isSecurityLevel(input.security) &&
	        (typeof input.balance === 'undefined' || (Number.isInteger(input.balance) && input.balance > 0)) &&
	        Number.isInteger(input.keyIndex) &&
	        input.keyIndex >= 0;
	};
	/**
	 * Checks that input is valid tag trytes.
	 *
	 * @method isTag
	 *
	 * @param {string} tag
	 *
	 * @return {boolean}
	 */
	exports.isTag = function (tag) { return exports.isTrytesOfMaxLength(tag, constants$4.TAG_TRYTE_SIZE); };
	/**
	 * Checks if input is valid `transfer` object.
	 *
	 * @method isTransfer
	 *
	 * @param {Transfer} transfer
	 *
	 * @return {boolean}
	 */
	exports.isTransfer = function (transfer) {
	    return exports.isHash(transfer.address) &&
	        Number.isInteger(transfer.value) &&
	        transfer.value >= 0 &&
	        (!transfer.message || exports.isTrytes(transfer.message, '0,')) &&
	        (!transfer.tag || exports.isTag(transfer.tag));
	};
	/**
	 * Checks that a given `URI` is valid
	 *
	 * Valid Examples:
	 * - `udp://[2001:db8:a0b:12f0::1]:14265`
	 * - `udp://[2001:db8:a0b:12f0::1]`
	 * - `udp://8.8.8.8:14265`
	 * - `udp://domain.com`
	 * - `udp://domain2.com:14265`
	 *
	 * @method isUri
	 *
	 * @param {string} uri
	 *
	 * @return {boolean}
	 */
	exports.isUri = function (uri) {
	    if (typeof uri !== 'string') {
	        return false;
	    }
	    var getInside = /^(udp|tcp):\/\/([\[][^\]\.]*[\]]|[^\[\]:]*)[:]{0,1}([0-9]{1,}$|$)/i;
	    var stripBrackets = /[\[]{0,1}([^\[\]]*)[\]]{0,1}/;
	    var uriTest = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/;
	    return getInside.test(uri) && uriTest.test(stripBrackets.exec(getInside.exec(uri)[1])[1]);
	};
	/* Check if start & end options are valid */
	exports.isStartEndOptions = function (_a) {
	    var start = _a.start, end = _a.end;
	    return !end || (start <= end && end < start + constants$4.MAX_INDEX_DIFF);
	};
	/* Checks all array items */
	exports.isArray = function (f) { return function (x) {
	    return Array.isArray(x) && x.length > 0 && x.every(function (y) { return f(y); });
	}; };
	/**
	 * Runs each validator in sequence, and throws on the first occurence of invalid data.
	 * Validators are passed as arguments and executed in given order.
	 * You might want place `validate()` in promise chains before operations that require valid inputs,
	 * taking advantage of built-in promise branching.
	 *
	 * @example
	 *
	 * ```js
	 * try {
	 *   validate([
	 *     value, // Given value
	 *     isTrytes, // Validator function
	 *     'Invalid trytes' // Error message
	 *   ])
	 * } catch (err) {
	 *   console.log(err.message) // 'Invalid trytes'
	 * }
	 * ```
	 *
	 * @method validate
	 *
	 * @throws {Error} error
	 * @return {boolean}
	 */
	exports.validate = function () {
	    var validators = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        validators[_i] = arguments[_i];
	    }
	    validators.forEach(function (validator) {
	        if (Array.isArray(validator)) {
	            var value = validator[0], isValid = validator[1], msg = validator[2];
	            if (!isValid(value)) {
	                throw new Error(msg + ": " + JSON.stringify(value, null, 1));
	            }
	        }
	    });
	    return true;
	};
	exports.arrayValidator = function (validator) { return function (arr, customMsg) {
	    var _a = validator(arr[0]), _ = _a[0], // tslint:disable-line no-unused-variable
	    isValid = _a[1], msg = _a[2];
	    return [
	        arr,
	        function (x) { return Array.isArray(x) && x.every(function (value) { return isValid(value); }); },
	        customMsg || msg,
	    ];
	}; };
	exports.depthValidator = function (depth) { return [
	    depth,
	    function (n) { return Number.isInteger(n) && n > 0; },
	    errors$a.INVALID_DEPTH,
	]; };
	exports.minWeightMagnitudeValidator = function (minWeightMagnitude) { return [
	    minWeightMagnitude,
	    Number.isInteger,
	    errors$a.INVALID_MIN_WEIGHT_MAGNITUDE,
	]; };
	exports.seedValidator = function (seed) { return [seed, exports.isTrytes, errors$a.INVALID_SEED]; };
	exports.securityLevelValidator = function (security) { return [
	    security,
	    exports.isSecurityLevel,
	    errors$a.INVALID_SECURITY_LEVEL,
	]; };
	exports.inputValidator = function (input) { return [input, exports.isInput, errors$a.INVALID_INPUT]; };
	exports.remainderAddressValidator = function (input) { return [input, exports.isHash, errors$a.INVALID_REMAINDER_ADDRESS]; };
	exports.tagValidator = function (tag) { return [tag, exports.isTag, errors$a.INVALID_TAG]; };
	exports.transferValidator = function (transfer) { return [transfer, exports.isTransfer, errors$a.INVALID_TRANSFER]; };
	exports.hashValidator = function (hash, errorMessage) { return [
	    hash,
	    exports.isHash,
	    errorMessage || errors$a.INVALID_HASH,
	]; };
	exports.trytesValidator = function (trytes, msg) { return [
	    trytes,
	    function (t) { return (length ? exports.isTrytesOfExactLength(t, length) : exports.isTrytes(t)); },
	    msg || errors$a.INVALID_TRYTES,
	]; };
	exports.uriValidator = function (uri) { return [uri, exports.isUri, errors$a.INVALID_URI]; };
	exports.integerValidator = function (integer, msg) { return [
	    integer,
	    Number.isInteger,
	    msg || errors$a.NOT_INT,
	]; };
	exports.indexValidator = function (index) { return [index, Number.isInteger, errors$a.INVALID_INDEX]; };
	exports.startOptionValidator = function (start) { return [
	    start,
	    function (s) { return Number.isInteger(s) && s >= 0; },
	    errors$a.INVALID_START_OPTION,
	]; };
	exports.startEndOptionsValidator = function (options) { return [
	    options,
	    exports.isStartEndOptions,
	    errors$a.INVALID_START_END_OPTIONS,
	]; };
	exports.getInputsThresholdValidator = function (threshold) { return [
	    threshold,
	    function (s) { return Number.isInteger(s) && s >= 0; },
	    errors$a.INVALID_THRESHOLD,
	]; };
	exports.stringify = function (value) {
	    return JSON.stringify(value, null, 1);
	};

	});

	unwrapExports(guards$4);
	var guards_1$4 = guards$4.isTrits;
	var guards_2$4 = guards$4.isNullTrits;
	var guards_3$4 = guards$4.isTrytes;
	var guards_4$4 = guards$4.isTrytesOfExactLength;
	var guards_5$4 = guards$4.isTrytesOfMaxLength;
	var guards_6$4 = guards$4.isEmpty;
	var guards_7$4 = guards$4.isNinesTrytes;
	var guards_8$4 = guards$4.isHash;
	var guards_9$4 = guards$4.isSecurityLevel;
	var guards_10$4 = guards$4.isInput;
	var guards_11$4 = guards$4.isTag;
	var guards_12$4 = guards$4.isTransfer;
	var guards_13$4 = guards$4.isUri;
	var guards_14$4 = guards$4.isStartEndOptions;
	var guards_15$4 = guards$4.isArray;
	var guards_16$4 = guards$4.validate;
	var guards_17$4 = guards$4.arrayValidator;
	var guards_18$4 = guards$4.depthValidator;
	var guards_19$4 = guards$4.minWeightMagnitudeValidator;
	var guards_20$4 = guards$4.seedValidator;
	var guards_21$4 = guards$4.securityLevelValidator;
	var guards_22$4 = guards$4.inputValidator;
	var guards_23$4 = guards$4.remainderAddressValidator;
	var guards_24$4 = guards$4.tagValidator;
	var guards_25$4 = guards$4.transferValidator;
	var guards_26$4 = guards$4.hashValidator;
	var guards_27$4 = guards$4.trytesValidator;
	var guards_28$4 = guards$4.uriValidator;
	var guards_29$4 = guards$4.integerValidator;
	var guards_30$4 = guards$4.indexValidator;
	var guards_31$4 = guards$4.startOptionValidator;
	var guards_32$4 = guards$4.startEndOptionsValidator;
	var guards_33$4 = guards$4.getInputsThresholdValidator;
	var guards_34$4 = guards$4.stringify;

	var src$c = createCommonjsModule(function (module, exports) {
	/**
	 * @module validators
	 */
	exports.__esModule = true;

	exports.errors = errors$a;
	/* Address related guards & validators */

	/**
	 * This method takes an address with a checksum and validates that the checksum is correct.
	 *
	 * ## Related methods
	 *
	 * To generate a new address with a checksum, use the [`getNewAddress()`]{@link #module_core.getNewAddress} method.
	 *
	 * @method isAddress
	 *
	 * @summary Validates the checksum of the given address.
	 *
	 * @memberof module:validators
	 *
	 * @param {string} address - Address with a checksum
	 *
	 * @example
	 * ```js
	 * let valid = Validator.isAddress('9FNJWLMBECSQDKHQAGDHDPXBMZFMQIMAFAUIQTDECJVGKJBKHLEBVU9TWCTPRJGYORFDSYENIQKBVSYKW9NSLGS9UW');
	 * ```
	 *
	 * @return {boolean} valid - Whether the checksum is valid
	 *
	 */
	exports.isAddress = function (address) {
	    var isValid = false;
	    try {
	        isValid = src$6.isValidChecksum(address);
	    }
	    catch (err) {
	        return false;
	    }
	    return isValid;
	};
	exports.addressValidator = function (address) { return [address, exports.isAddress]; };
	/* Misc */

	exports.arrayValidator = guards$4.arrayValidator;
	exports.depthValidator = guards$4.depthValidator;
	exports.hashValidator = guards$4.hashValidator;
	exports.inputValidator = guards$4.inputValidator;
	exports.isHash = guards$4.isHash;
	exports.isInput = guards$4.isInput;
	exports.isNinesTrytes = guards$4.isNinesTrytes;
	exports.isEmpty = guards$4.isEmpty;
	exports.isSecurityLevel = guards$4.isSecurityLevel;
	exports.isStartEndOptions = guards$4.isStartEndOptions;
	exports.isTag = guards$4.isTag;
	exports.isTransfer = guards$4.isTransfer;
	exports.isTrytes = guards$4.isTrytes;
	exports.isTrytesOfExactLength = guards$4.isTrytesOfExactLength;
	exports.isTrytesOfMaxLength = guards$4.isTrytesOfMaxLength;
	exports.isUri = guards$4.isUri;
	exports.minWeightMagnitudeValidator = guards$4.minWeightMagnitudeValidator;
	exports.securityLevelValidator = guards$4.securityLevelValidator;
	exports.seedValidator = guards$4.seedValidator;
	exports.tagValidator = guards$4.tagValidator;
	exports.transferValidator = guards$4.transferValidator;
	exports.trytesValidator = guards$4.trytesValidator;
	exports.uriValidator = guards$4.uriValidator;
	exports.validate = guards$4.validate;
	var guards_2 = guards$4;
	exports.isAddressArray = guards_2.isArray(exports.isAddress);
	exports.isHashArray = guards_2.isArray(guards_2.isHash);
	exports.isInputArray = guards_2.isArray(guards_2.isInput);
	exports.isTagArray = guards_2.isArray(guards_2.isTag);
	exports.isTransferArray = guards_2.isArray(guards_2.isTransfer);
	exports.isTransfersArray = exports.isTransferArray;
	exports.isTrytesArray = guards_2.isArray(function (x) { return guards_2.isTrytes(x); });
	exports.isUriArray = guards_2.isArray(guards_2.isUri);
	/* Transaction guards & validators */

	exports.isAttached = src$5.isAttached;
	exports.isTail = src$5.isTail;
	exports.isHead = src$5.isHead;
	exports.isTransaction = src$5.isTransaction;

	});

	unwrapExports(src$c);
	var src_1$a = src$c.errors;
	var src_2$a = src$c.isAddress;
	var src_3$9 = src$c.addressValidator;
	var src_4$7 = src$c.arrayValidator;
	var src_5$5 = src$c.depthValidator;
	var src_6$4 = src$c.hashValidator;
	var src_7$3 = src$c.inputValidator;
	var src_8$2 = src$c.isHash;
	var src_9$2 = src$c.isInput;
	var src_10$2 = src$c.isNinesTrytes;
	var src_11$2 = src$c.isEmpty;
	var src_12$2 = src$c.isSecurityLevel;
	var src_13$2 = src$c.isStartEndOptions;
	var src_14$2 = src$c.isTag;
	var src_15$2 = src$c.isTransfer;
	var src_16$2 = src$c.isTrytes;
	var src_17$2 = src$c.isTrytesOfExactLength;
	var src_18$2 = src$c.isTrytesOfMaxLength;
	var src_19$2 = src$c.isUri;
	var src_20$2 = src$c.minWeightMagnitudeValidator;
	var src_21$2 = src$c.securityLevelValidator;
	var src_22$2 = src$c.seedValidator;
	var src_23$2 = src$c.tagValidator;
	var src_24$2 = src$c.transferValidator;
	var src_25$2 = src$c.trytesValidator;
	var src_26$2 = src$c.uriValidator;
	var src_27$2 = src$c.validate;
	var src_28$2 = src$c.isAddressArray;
	var src_29$2 = src$c.isHashArray;
	var src_30$2 = src$c.isInputArray;
	var src_31$2 = src$c.isTagArray;
	var src_32$2 = src$c.isTransferArray;
	var src_33$2 = src$c.isTransfersArray;
	var src_34$2 = src$c.isTrytesArray;
	var src_35$2 = src$c.isUriArray;
	var src_36$2 = src$c.isAttached;
	var src_37$2 = src$c.isTail;
	var src_38$1 = src$c.isHead;
	var src_39$1 = src$c.isTransaction;

	/**
	 * Class to implement Curl sponge.
	 * @private
	 */
	var Curl = /** @class */ (function () {
	    /**
	     * Create a new instance of Curl.
	     * @param rounds The number of rounds to perform.
	     */
	    function Curl(rounds) {
	        if (rounds === void 0) { rounds = Curl.NUMBER_OF_ROUNDS; }
	        if (rounds !== 27 && rounds !== 81) {
	            throw new Error("Illegal number of rounds. Only `27` and `81` rounds are supported.");
	        }
	        this._state = new Int8Array(Curl.STATE_LENGTH);
	        this._rounds = rounds;
	    }
	    /**
	     * Resets the state
	     */
	    Curl.prototype.reset = function () {
	        this._state = new Int8Array(Curl.STATE_LENGTH);
	    };
	    /**
	     * Get the state of the sponge.
	     * @param len The length of the state to get.
	     * @returns The state.
	     */
	    Curl.prototype.rate = function (len) {
	        if (len === void 0) { len = Curl.HASH_LENGTH; }
	        return this._state.slice(0, len);
	    };
	    /**
	     * Absorbs trits given an offset and length
	     * @param trits The trits to absorb.
	     * @param offset The offset to start abororbing from the array.
	     * @param length The length of trits to absorb.
	     */
	    Curl.prototype.absorb = function (trits, offset, length) {
	        do {
	            var limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
	            this._state.set(trits.subarray(offset, offset + limit));
	            this.transform();
	            length -= Curl.HASH_LENGTH;
	            offset += limit;
	        } while (length > 0);
	    };
	    /**
	     * Squeezes trits given an offset and length
	     * @param trits The trits to squeeze.
	     * @param offset The offset to start squeezing from the array.
	     * @param length The length of trits to squeeze.
	     */
	    Curl.prototype.squeeze = function (trits, offset, length) {
	        do {
	            var limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
	            trits.set(this._state.subarray(0, limit), offset);
	            this.transform();
	            length -= Curl.HASH_LENGTH;
	            offset += limit;
	        } while (length > 0);
	    };
	    /**
	     * Sponge transform function
	     */
	    Curl.prototype.transform = function () {
	        var stateCopy;
	        var index = 0;
	        for (var round = 0; round < this._rounds; round++) {
	            stateCopy = this._state.slice();
	            for (var i = 0; i < Curl.STATE_LENGTH; i++) {
	                this._state[i] =
	                    // eslint-disable-next-line no-bitwise
	                    Curl.TRUTH_TABLE[stateCopy[index] + (stateCopy[(index += index < 365 ? 364 : -365)] << 2) + 5];
	            }
	        }
	    };
	    /**
	     * The Hash Length
	     */
	    Curl.HASH_LENGTH = 243;
	    /**
	     * The State Length.
	     */
	    Curl.STATE_LENGTH = 3 * Curl.HASH_LENGTH;
	    /**
	     * The default number of rounds.
	     */
	    Curl.NUMBER_OF_ROUNDS = 81;
	    /**
	     * Truth Table.
	     */
	    Curl.TRUTH_TABLE = [1, 0, -1, 2, 1, -1, 0, 2, -1, 1, 0];
	    return Curl;
	}());

	var PRIVATE_KEY_NUM_FRAGMENTS = 27;
	var PRIVATE_KEY_FRAGMENT_LENGTH = PRIVATE_KEY_NUM_FRAGMENTS * Curl.HASH_LENGTH;
	var MIN_TRYTE_VALUE = -13;
	var MAX_TRYTE_VALUE = 13;
	var MIN_TRIT_VALUE = -1;
	var MAX_TRIT_VALUE = 1;
	/**
	 * Calculate the subseed for the seed.
	 * @param seed The seed trits.
	 * @param index The index for the subseed.
	 * @returns The subseed trits.
	 * @private
	 */
	function subseed(seed, index) {
	    var sponge = new Curl(27);
	    var subseedPreimage = seed.slice();
	    var localIndex = index;
	    while (localIndex-- > 0) {
	        for (var i = 0; i < subseedPreimage.length; i++) {
	            if (subseedPreimage[i]++ >= MAX_TRIT_VALUE) {
	                subseedPreimage[i] = MIN_TRIT_VALUE;
	            }
	            else {
	                break;
	            }
	        }
	    }
	    sponge.absorb(subseedPreimage, 0, subseedPreimage.length);
	    var ss = new Int8Array(Curl.HASH_LENGTH);
	    sponge.squeeze(ss, 0, ss.length);
	    return ss;
	}
	/**
	 * Get the digest from the subseed.
	 * @param subSeed The subseed to get the digest for.
	 * @param securityLevel The security level to get the digest.
	 * @returns The digest trits.
	 * @private
	 */
	function digestFromSubseed(subSeed, securityLevel) {
	    var curl1 = new Curl(27);
	    var curl2 = new Curl(27);
	    var curl3 = new Curl(27);
	    var length = securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH / Curl.HASH_LENGTH;
	    var digest = new Int8Array(Curl.HASH_LENGTH);
	    curl1.absorb(subSeed, 0, subSeed.length);
	    for (var i = 0; i < length; i++) {
	        curl1.squeeze(digest, 0, digest.length);
	        for (var k = 0; k < MAX_TRYTE_VALUE - MIN_TRYTE_VALUE + 1; k++) {
	            curl2.reset();
	            curl2.absorb(digest, 0, digest.length);
	            curl2.squeeze(digest, 0, digest.length);
	        }
	        curl3.absorb(digest, 0, digest.length);
	    }
	    curl3.squeeze(digest, 0, digest.length);
	    return digest;
	}
	/**
	 * Get the address from the digests.
	 * @param digests The digests to get the address for.
	 * @returns The address trits.
	 * @private
	 */
	function address(digests) {
	    var sponge = new Curl(27);
	    sponge.absorb(digests, 0, digests.length);
	    var addressTrits = new Int8Array(Curl.HASH_LENGTH);
	    sponge.squeeze(addressTrits, 0, addressTrits.length);
	    return addressTrits;
	}
	/**
	 * Get the private key from the subseed.
	 * @param subSeed The subseed to get the private key for.
	 * @param securityLevel The security level for the private key.
	 * @returns The private key trits.
	 * @private
	 */
	function privateKeyFromSubseed(subSeed, securityLevel) {
	    var keyLength = securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH;
	    var keyTrits = new Int8Array(keyLength);
	    var actualKeyTrits = new Int8Array(keyLength);
	    var sponge = new Curl(27);
	    sponge.absorb(subSeed, 0, subSeed.length);
	    sponge.squeeze(keyTrits, 0, keyTrits.length);
	    for (var i = 0; i < keyLength / Curl.HASH_LENGTH; i++) {
	        var offset = i * Curl.HASH_LENGTH;
	        sponge.reset();
	        sponge.absorb(keyTrits, offset, Curl.HASH_LENGTH);
	        actualKeyTrits.set(sponge.rate(), offset);
	    }
	    return actualKeyTrits;
	}
	/**
	 * Create a signature for the trits.
	 * @param hashTrits The trits to create the signature for.
	 * @param key The key to use for signing.
	 * @returns The signature trits.
	 * @private
	 */
	function signature(hashTrits, key) {
	    var signatures = new Int8Array(key.length);
	    var sponge = new Curl(27);
	    for (var i = 0; i < key.length / Curl.HASH_LENGTH; i++) {
	        var buffer = key.subarray(i * Curl.HASH_LENGTH, (i + 1) * Curl.HASH_LENGTH);
	        for (var k = 0; k < MAX_TRYTE_VALUE - (hashTrits[i * 3] + (hashTrits[(i * 3) + 1] * 3) + (hashTrits[(i * 3) + 2] * 9)); k++) {
	            sponge.reset();
	            sponge.absorb(buffer, 0, buffer.length);
	            buffer = sponge.rate();
	        }
	        signatures.set(buffer, i * Curl.HASH_LENGTH);
	    }
	    return signatures;
	}
	/**
	 * Check the security level.
	 * @param hash The hash to check.
	 * @returns The security level
	 * @private
	 */
	function checksumSecurity(hash) {
	    if (hash.slice(0, Curl.HASH_LENGTH / 3).reduce(function (a, b) { return a + b; }, 0) === 0) {
	        return 1;
	    }
	    if (hash.slice(0, 2 * Curl.HASH_LENGTH / 3).reduce(function (a, b) { return a + b; }, 0) === 0) {
	        return 2;
	    }
	    return hash.reduce(function (a, b) { return a + b; }, 0) === 0 ? 3 : 0;
	}
	/**
	 * Get the digest from the signature
	 * @param hash The hash to get the digest.
	 * @param sig The signature.
	 * @returns The digest.
	 * @private
	 */
	function digestFromSignature(hash, sig) {
	    var sponge = new Curl(27);
	    var buffer = new Int8Array(sig.length);
	    for (var i = 0; i < (sig.length / Curl.HASH_LENGTH); i++) {
	        var innerBuffer = sig.slice(i * Curl.HASH_LENGTH, (i + 1) * Curl.HASH_LENGTH);
	        for (var j = 0; j < (hash[i * 3] + (hash[(i * 3) + 1] * 3) + (hash[(i * 3) + 2] * 9)) - MIN_TRYTE_VALUE; j++) {
	            sponge.reset();
	            sponge.absorb(innerBuffer, 0, innerBuffer.length);
	            innerBuffer = sponge.rate();
	        }
	        buffer.set(innerBuffer, i * Curl.HASH_LENGTH);
	    }
	    sponge.reset();
	    sponge.absorb(buffer, 0, buffer.length);
	    return sponge.rate();
	}

	/**
	 * Generate an address for the merklr tree.
	 * @param seedTrits The trits for the seed.
	 * @param index The index of the address to generate.
	 * @param security The security level of the address to generate.
	 * @returns The address and the private key.
	 * @private
	 */
	function generateAddress$1(seedTrits, index, security) {
	    var ss = subseed(seedTrits, index);
	    var dg = digestFromSubseed(ss, security);
	    return {
	        address: address(dg),
	        privateKey: privateKeyFromSubseed(ss, security)
	    };
	}

	/**
	 * Class to represent a node in a merkle tree.
	 * @private
	 */
	var MerkleNode = /** @class */ (function () {
	    /**
	     * Create a new instance of MerkleNode.
	     * @param left The left node.
	     * @param right The right node.
	     * @param addressTrits The trits representing the address.
	     * @param privateKeyTrits The trits for the private key.
	     */
	    function MerkleNode(left, right, addressTrits, privateKeyTrits) {
	        this.left = left;
	        this.right = right;
	        this.size = (left ? left.size : 0) + (right ? right.size : 0);
	        this.addressTrits = addressTrits;
	        this.privateKeyTrits = privateKeyTrits;
	    }
	    return MerkleNode;
	}());

	/**
	 * Class to represent a merkle tree.
	 * @private
	 */
	var MerkleTree = /** @class */ (function () {
	    /**
	     * Create a new instance of the merkle tree.
	     * @param seed The seed to use for the tree.
	     * @param index The start index for the creation.
	     * @param count The count for the creation.
	     * @param security The security level to create the hashes.
	     */
	    function MerkleTree(seed, index, count, security) {
	        var seedTrits = src_2(seed);
	        var leaves = [];
	        for (var i = 0; i < count; i++) {
	            var addressPrivateKey = generateAddress$1(seedTrits, index + i, security);
	            leaves.push(new MerkleNode(undefined, undefined, addressPrivateKey.address, addressPrivateKey.privateKey));
	            leaves[i].size = 1;
	        }
	        this.root = this.buildTree(leaves);
	    }
	    /**
	     * Recalculate the root for the siblings.
	     * @param rate The current address.
	     * @param siblings The siblings data.
	     * @param index The index in the tree.
	     * @returns The new sibling root.
	     */
	    MerkleTree.root = function (rate, siblings, index) {
	        var sponge = new Curl(27);
	        var i = 1;
	        var numChunks = Math.ceil(siblings.length / Curl.HASH_LENGTH);
	        for (var c = 0; c < numChunks; c++) {
	            var chunk = siblings.slice(c * Curl.HASH_LENGTH, (c + 1) * Curl.HASH_LENGTH);
	            sponge.reset();
	            // eslint-disable-next-line no-bitwise
	            if ((i & index) === 0) {
	                sponge.absorb(rate, 0, rate.length);
	                sponge.absorb(chunk, 0, chunk.length);
	            }
	            else {
	                sponge.absorb(chunk, 0, chunk.length);
	                sponge.absorb(rate, 0, rate.length);
	            }
	            // eslint-disable-next-line no-bitwise
	            i <<= 1;
	            rate = sponge.rate();
	        }
	        return sponge.rate();
	    };
	    /**
	     * Get a sub tree.
	     * @param index The index of the subtree.
	     * @returns The key and leaves for the sub tree.
	     */
	    MerkleTree.prototype.getSubtree = function (index) {
	        var _a;
	        if (this.root.size === 1) {
	            return {
	                key: ((_a = this.root.left) === null || _a === void 0 ? void 0 : _a.privateKeyTrits) ? this.root.left.privateKeyTrits : new Int8Array(),
	                leaves: []
	            };
	        }
	        var leaves = [];
	        var node = this.root;
	        var size = this.root.size;
	        var privateKey;
	        if (index < size) {
	            while (node) {
	                if (!node.left) {
	                    privateKey = node.privateKeyTrits;
	                    break;
	                }
	                size = node.left.size;
	                if (index < size) {
	                    leaves.push(node.right ? node.right : node.left);
	                    node = node.left;
	                }
	                else {
	                    leaves.push(node.left);
	                    node = node.right;
	                    index -= size;
	                }
	            }
	        }
	        leaves.reverse();
	        return {
	            key: privateKey !== null && privateKey !== void 0 ? privateKey : new Int8Array(),
	            leaves: leaves
	        };
	    };
	    /**
	     * Build tree from the leaf hashes.
	     * @param leaves The leaves to build the tree from.
	     * @returns The root node.
	     */
	    MerkleTree.prototype.buildTree = function (leaves) {
	        var subnodes = [];
	        for (var i = 0; i < leaves.length; i += 2) {
	            var left = leaves[i];
	            var right = (i + 1 < leaves.length) ? leaves[i + 1] : undefined;
	            var addressTrits = void 0;
	            if (right) {
	                var sponge = new Curl(27);
	                sponge.absorb(left.addressTrits, 0, left.addressTrits.length);
	                sponge.absorb(right.addressTrits, 0, right.addressTrits.length);
	                addressTrits = new Int8Array(Curl.HASH_LENGTH);
	                sponge.squeeze(addressTrits, 0, addressTrits.length);
	            }
	            else {
	                addressTrits = left.addressTrits;
	            }
	            subnodes.push(new MerkleNode(left, right, addressTrits, undefined));
	        }
	        if (subnodes.length === 1) {
	            return subnodes[0];
	        }
	        return this.buildTree(subnodes);
	    };
	    return MerkleTree;
	}());

	/* eslint-disable no-bitwise */
	var ZERO = new Int8Array([1, 0, 0, -1]);
	var RADIX = 3;
	var TRITS_PER_TRYTE = 3;
	/**
	 * Perform pascal encoding of the value.
	 * @param value The value to encode.
	 * @returns The trits for the encoded value.
	 * @private
	 */
	function pascalEncode(value) {
	    if (value === 0) {
	        return ZERO;
	    }
	    var length = roundThird(minTrits(Math.abs(value), 1));
	    var trits = new Int8Array(encodedLength(value));
	    valueToTrits(value, trits);
	    var encoding = 0;
	    var index = 0;
	    for (var i = 0; i < length - TRITS_PER_TRYTE; i += TRITS_PER_TRYTE) {
	        var tritValue = trits.slice(i, i + TRITS_PER_TRYTE);
	        var tritsAsInt = src_5(tritValue);
	        if (tritsAsInt >= 0) {
	            encoding |= 1 << index;
	            for (var j = 0; j < tritValue.length; j++) {
	                trits[i + j] = -tritValue[j];
	            }
	        }
	        index++;
	    }
	    var v = trits.slice(length - TRITS_PER_TRYTE, length - TRITS_PER_TRYTE + length);
	    if (src_5(v) < 0) {
	        encoding |= 1 << index;
	        for (var k = 0; k < v.length; k++) {
	            trits[k + length - TRITS_PER_TRYTE] = -trits[k + length - TRITS_PER_TRYTE];
	        }
	    }
	    var checksumTrits = new Int8Array(trits.length - length);
	    valueToTrits(encoding, checksumTrits);
	    for (var i = 0; i < checksumTrits.length; i++) {
	        trits[length + i] = checksumTrits[i];
	    }
	    return trits;
	}
	/**
	 * Decode the pascal encoded trits.
	 * @param value The value to decode.
	 * @returns The decoded value.
	 * @private
	 */
	function pascalDecode(value) {
	    if (value.length >= ZERO.length &&
	        value[0] === ZERO[0] &&
	        value[1] === ZERO[1] &&
	        value[2] === ZERO[2] &&
	        value[3] === ZERO[3]) {
	        return { value: 0, end: 4 };
	    }
	    var encoderStart = end(value);
	    var inputEnd = encoderStart + (encoderStart / TRITS_PER_TRYTE);
	    var encoder = src_5(value.slice(encoderStart, inputEnd));
	    var result = 0;
	    for (var i = 0; i < encoderStart / TRITS_PER_TRYTE; i++) {
	        var tritsIntValue = ((encoder >> i) & 1) !== 0
	            ? -src_5(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE))
	            : src_5(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE));
	        result += (Math.pow(27, i) * tritsIntValue);
	    }
	    return { value: result, end: inputEnd };
	}
	/**
	 * Get the encoded length of the value.
	 * @param value The value.
	 * @returns The length.
	 * @private
	 */
	function encodedLength(value) {
	    var length = roundThird(minTrits(Math.abs(value), 1));
	    return length + (length / RADIX);
	}
	/**
	 * Round the number to the third.
	 * @param value The value to round.
	 * @returns The rounded number.
	 * @private
	 */
	function roundThird(value) {
	    var rem = value % RADIX;
	    if (rem === 0) {
	        return value;
	    }
	    return value + RADIX - rem;
	}
	/**
	 * Calculate the minimum trits for the input.
	 * @param input The input to calculate from.
	 * @param basis The basis of the calculation.
	 * @returns The number of trits.
	 * @private
	 */
	function minTrits(input, basis) {
	    if (input <= basis) {
	        return 1;
	    }
	    return 1 + minTrits(input, 1 + (basis * RADIX));
	}
	/**
	 * Calculate the end for the input.
	 * @param input The input to calculate for.
	 * @returns The calculated end.
	 * @private
	 */
	function end(input) {
	    if (src_5(input.slice(0, TRITS_PER_TRYTE)) > 0) {
	        return TRITS_PER_TRYTE;
	    }
	    return TRITS_PER_TRYTE + end(input.slice(TRITS_PER_TRYTE));
	}
	/**
	 * Convert the value to trits.
	 * @param input The input value to convert.
	 * @param trits The trits.
	 * @returns The end conversion.
	 * @private
	 */
	function valueToTrits(input, trits) {
	    var endWrite = writeTrits(input, trits, 0);
	    if (input >= 0) {
	        return endWrite;
	    }
	    for (var i = 0; i < trits.length; i++) {
	        trits[i] = -trits[i];
	    }
	    return endWrite;
	}
	/**
	 * Write the trits for the value.
	 * @param input The input value.
	 * @param trits The trits to write to.
	 * @param index The index to write at.
	 * @returns The length.
	 * @private
	 */
	function writeTrits(input, trits, index) {
	    switch (input) {
	        case 0:
	            return 0;
	        default:
	            // eslint-disable-next-line no-case-declarations
	            var abs = Math.floor(input / RADIX);
	            // eslint-disable-next-line no-case-declarations
	            var r = input % RADIX;
	            if (r > 1) {
	                abs += 1;
	                r = -1;
	            }
	            trits[index] = r;
	            index++;
	            return 1 + writeTrits(abs, trits, index);
	    }
	}

	/**
	 * Class to perform Hamming calculation for nonce.
	 * @private
	 */
	var HammingDiver = /** @class */ (function () {
	    function HammingDiver() {
	    }
	    /**
	     * Search for the nonce.
	     * @param trits The trits to calculate the nonce.
	     * @param securityLevel The security level to calculate at.
	     * @param length The length of the data to search.
	     * @param offset The offset to start the search.
	     * @returns The trits of the nonce.
	     */
	    HammingDiver.prototype.search = function (trits, securityLevel, length, offset) {
	        var state = this.prepareTrits(trits, offset);
	        var size = Math.min(length, Curl.HASH_LENGTH) - offset;
	        var index = 0;
	        while (index === 0) {
	            var incrementResult = this.increment(state, offset + (size * 2 / 3), offset + size);
	            size = Math.min(roundThird(offset + (size * 2 / 3) + incrementResult), Curl.HASH_LENGTH) - offset;
	            var curlCopy = {
	                low: state.low.slice(),
	                high: state.high.slice()
	            };
	            this.transform(curlCopy);
	            index = this.check(securityLevel, curlCopy.low, curlCopy.high);
	        }
	        return this.trinaryGet(state.low, state.high, size, index);
	    };
	    /**
	     * Prepare the trits for calculation.
	     * @param trits The trits.
	     * @param offset The offset to start.
	     * @returns The prepared trits.
	     */
	    HammingDiver.prototype.prepareTrits = function (trits, offset) {
	        var initialState = this.tritsToBigInt(trits, Curl.STATE_LENGTH);
	        initialState.low[offset] = HammingDiver.LOW_0;
	        initialState.low[offset + 1] = HammingDiver.LOW_1;
	        initialState.low[offset + 2] = HammingDiver.LOW_2;
	        initialState.low[offset + 3] = HammingDiver.LOW_3;
	        initialState.high[offset] = HammingDiver.HIGH_0;
	        initialState.high[offset + 1] = HammingDiver.HIGH_1;
	        initialState.high[offset + 2] = HammingDiver.HIGH_2;
	        initialState.high[offset + 3] = HammingDiver.HIGH_3;
	        return initialState;
	    };
	    /**
	     * Convert the trits to bigint form.
	     * @param input The input trits.
	     * @param length The length of the input.
	     * @returns The trits in big int form.
	     */
	    HammingDiver.prototype.tritsToBigInt = function (input, length) {
	        var result = {
	            low: [],
	            high: []
	        };
	        for (var i = 0; i < input.length; i++) {
	            switch (input[i]) {
	                case 0:
	                    result.low[i] = HammingDiver.MAX_VALUE;
	                    result.high[i] = HammingDiver.MAX_VALUE;
	                    break;
	                case 1:
	                    result.low[i] = HammingDiver.MIN_VALUE;
	                    result.high[i] = HammingDiver.MAX_VALUE;
	                    break;
	                default:
	                    result.low[i] = HammingDiver.MAX_VALUE;
	                    result.high[i] = HammingDiver.MIN_VALUE;
	                    break;
	            }
	        }
	        if (input.length >= length) {
	            return result;
	        }
	        for (var i = input.length; i < length; i++) {
	            result.low[i] = HammingDiver.MAX_VALUE;
	            result.high[i] = HammingDiver.MAX_VALUE;
	        }
	        return result;
	    };
	    /**
	     * Increment the state values.
	     * @param states The state to increment.
	     * @param fromIndex The index to start from.
	     * @param toIndex The index to end at,
	     * @returns The increment length.
	     */
	    HammingDiver.prototype.increment = function (states, fromIndex, toIndex) {
	        for (var i = fromIndex; i < toIndex; i++) {
	            var low = states.low[i];
	            var high = states.high[i];
	            states.low[i] = high.xor(low);
	            states.high[i] = low;
	            if ((high.and(low.not())).equals(0)) {
	                return toIndex - fromIndex;
	            }
	        }
	        return toIndex - fromIndex + 1;
	    };
	    /**
	     * Transform the states.
	     * @param searchStates The states to transform.
	     */
	    HammingDiver.prototype.transform = function (searchStates) {
	        var curlScratchpadIndex = 0;
	        for (var round = 0; round < HammingDiver.ROUNDS; round++) {
	            var curlScratchpad = {
	                low: searchStates.low.slice(0, Curl.STATE_LENGTH),
	                high: searchStates.high.slice(0, Curl.STATE_LENGTH)
	            };
	            for (var stateIndex = 0; stateIndex < Curl.STATE_LENGTH; stateIndex++) {
	                var alpha = curlScratchpad.low[curlScratchpadIndex];
	                var beta = curlScratchpad.high[curlScratchpadIndex];
	                if (curlScratchpadIndex < 365) {
	                    curlScratchpadIndex += 364;
	                }
	                else {
	                    curlScratchpadIndex += -365;
	                }
	                var gamma = curlScratchpad.high[curlScratchpadIndex];
	                var lowXorBeta = curlScratchpad.low[curlScratchpadIndex].xor(beta);
	                var notGamma = this.bitWiseNot(gamma);
	                var alphaOrNotGamma = alpha.or(notGamma);
	                var delta = alphaOrNotGamma.and(lowXorBeta);
	                searchStates.low[stateIndex] = this.bitWiseNot(delta);
	                var alphaXorGamma = alpha.xor(gamma);
	                searchStates.high[stateIndex] = alphaXorGamma.or(delta);
	            }
	        }
	    };
	    /**
	     * Perform a bitwise not for 64 bit, not twos complement.
	     * @param value The value to bitwise not.
	     * @returns The bitwise not of the value.
	     */
	    HammingDiver.prototype.bitWiseNot = function (value) {
	        return bigInt__default['default'](1).shiftLeft(64)
	            .subtract(bigInt__default['default'](1))
	            .subtract(value);
	    };
	    /**
	     * Check if we have found the nonce.
	     * @param securityLevel The security level to check.
	     * @param low The low bits.
	     * @param high The high bits.
	     * @returns The nonce if found.
	     */
	    HammingDiver.prototype.check = function (securityLevel, low, high) {
	        for (var i = 0; i < 64; i++) {
	            var sum = 0;
	            for (var j = 0; j < securityLevel; j++) {
	                for (var k = j * 243 / 3; k < (j + 1) * 243 / 3; k++) {
	                    var bIndex = bigInt__default['default'](1).shiftLeft(i);
	                    if (low[k].and(bIndex).equals(0)) {
	                        sum--;
	                    }
	                    else if (high[k].and(bIndex).equals(0)) {
	                        sum++;
	                    }
	                }
	                if (sum === 0 && j < securityLevel - 1) {
	                    sum = 1;
	                    break;
	                }
	            }
	            if (sum === 0) {
	                return i;
	            }
	        }
	        return 0;
	    };
	    /**
	     * Get data from the tinary bits.
	     * @param low The low bits.
	     * @param high The high bits.
	     * @param arrLength The array length to get from.
	     * @param index The index to get the values.
	     * @returns The values stored at the index.
	     */
	    HammingDiver.prototype.trinaryGet = function (low, high, arrLength, index) {
	        var result = new Int8Array(arrLength);
	        for (var i = 0; i < arrLength; i++) {
	            var bIndex = bigInt__default['default'](index);
	            var l = low[i].shiftRight(bIndex).and(1);
	            var h = high[i].shiftRight(bIndex).and(1);
	            if (l.equals(1) && h.equals(0)) {
	                result[i] = -1;
	            }
	            else if (l.equals(0) && h.equals(1)) {
	                result[i] = 1;
	            }
	            else {
	                result[i] = 0;
	            }
	        }
	        return result;
	    };
	    /**
	     * Max 64 bit value.
	     */
	    HammingDiver.MAX_VALUE = bigInt__default['default']("FFFFFFFFFFFFFFFF", 16);
	    /**
	     * Min 64 bit value.
	     */
	    HammingDiver.MIN_VALUE = bigInt__default['default']("0000000000000000", 16);
	    /**
	     * High 0
	     */
	    HammingDiver.HIGH_0 = bigInt__default['default']("B6DB6DB6DB6DB6DB", 16);
	    /**
	     * High 1
	     */
	    HammingDiver.HIGH_1 = bigInt__default['default']("8FC7E3F1F8FC7E3F", 16);
	    /**
	     * High 2
	     */
	    HammingDiver.HIGH_2 = bigInt__default['default']("FFC01FFFF803FFFF", 16);
	    /**
	     * High 3
	     */
	    HammingDiver.HIGH_3 = bigInt__default['default']("003FFFFFFFFFFFFF", 16);
	    /**
	     * Low 0
	     */
	    HammingDiver.LOW_0 = bigInt__default['default']("DB6DB6DB6DB6DB6D", 16);
	    /**
	     * Low 1
	     */
	    HammingDiver.LOW_1 = bigInt__default['default']("F1F8FC7E3F1F8FC7", 16);
	    /**
	     * Low 2
	     */
	    HammingDiver.LOW_2 = bigInt__default['default']("7FFFE00FFFFC01FF", 16);
	    /**
	     * Low 3
	     */
	    HammingDiver.LOW_3 = bigInt__default['default']("FFC0000007FFFFFF", 16);
	    /**
	     * Number of rounds
	     */
	    HammingDiver.ROUNDS = 27;
	    return HammingDiver;
	}());

	/**
	 * Concatentate a list of arrays.
	 * @param arrays The arrays to concatenate.
	 * @returns The concatenated arrays.
	 * @private
	 */
	function concatenate(arrays) {
	    var totalLength = 0;
	    for (var _i = 0, arrays_1 = arrays; _i < arrays_1.length; _i++) {
	        var arr = arrays_1[_i];
	        totalLength += arr.length;
	    }
	    var result = new Int8Array(totalLength);
	    var offset = 0;
	    for (var _a = 0, arrays_2 = arrays; _a < arrays_2.length; _a++) {
	        var arr = arrays_2[_a];
	        result.set(arr, offset);
	        offset += arr.length;
	    }
	    return result;
	}

	/**
	 * Validate the mode and key.
	 * @param mode The mamMode to validate.
	 * @param sideKey The sideKey to validate.
	 * @private
	 */
	function validateModeKey(mode, sideKey) {
	    if (mode !== "public" && mode !== "private" && mode !== "restricted") {
	        throw new Error("The mode must be public, private or restricted, it is '" + mode + "'");
	    }
	    if (mode === "restricted") {
	        if (!sideKey) {
	            throw new Error("You must provide a sideKey for restricted mode");
	        }
	        if (!src_16$2(sideKey)) {
	            throw new Error("The sideKey must be in trytes");
	        }
	        if (sideKey.length > 81) {
	            throw new Error("The sideKey must be maximum length 81 trytes");
	        }
	    }
	    if (mode !== "restricted" && sideKey) {
	        throw new Error("sideKey is only used in restricted mode");
	    }
	}

	/**
	 * Create the mask hash for the key.
	 * @param keyTrits The key to create the mask hash for.
	 * @returns The masked hash.
	 * @private
	 */
	function maskHash(keyTrits) {
	    var sponge = new Curl(81);
	    sponge.absorb(keyTrits, 0, keyTrits.length);
	    var finalKeyTrits = new Int8Array(Curl.HASH_LENGTH);
	    sponge.squeeze(finalKeyTrits, 0, finalKeyTrits.length);
	    return finalKeyTrits;
	}
	/**
	 * Apply mask to the payload.
	 * @param payload The payload to apply the mask to.
	 * @param sponge The sponge to use.
	 * @returns The masked payload.
	 * @private
	 */
	function mask(payload, sponge) {
	    var keyChunk = sponge.rate();
	    var numChunks = Math.ceil(payload.length / Curl.HASH_LENGTH);
	    for (var c = 0; c < numChunks; c++) {
	        var chunk = payload.slice(c * Curl.HASH_LENGTH, (c + 1) * Curl.HASH_LENGTH);
	        sponge.absorb(chunk, 0, chunk.length);
	        var state = sponge.rate();
	        for (var i = 0; i < chunk.length; i++) {
	            payload[(c * Curl.HASH_LENGTH) + i] = tritSum(chunk[i], keyChunk[i]);
	            keyChunk[i] = state[i];
	        }
	    }
	    return payload;
	}
	/**
	 * Unmask a payload.
	 * @param payload The payload to unmask.
	 * @param sponge The sponge to use.
	 * @returns The unmasked payload.
	 * @private
	 */
	function unmask(payload, sponge) {
	    var unmasked = new Int8Array(payload);
	    var limit = Math.ceil(unmasked.length / Curl.HASH_LENGTH) * Curl.HASH_LENGTH;
	    var state;
	    for (var c = 0; c < limit; c++) {
	        var indexInChunk = c % Curl.HASH_LENGTH;
	        if (indexInChunk === 0) {
	            state = sponge.rate();
	        }
	        if (state) {
	            unmasked[c] = tritSum(unmasked[c], -state[indexInChunk]);
	        }
	        if (indexInChunk === Curl.HASH_LENGTH - 1) {
	            sponge.absorb(unmasked, Math.floor(c / Curl.HASH_LENGTH) * Curl.HASH_LENGTH, Curl.HASH_LENGTH);
	        }
	    }
	    return unmasked;
	}
	/**
	 * Sum the parts of a trit.
	 * @param left The left part.
	 * @param right The right part.
	 * @returns The sum.
	 * @private
	 */
	function tritSum(left, right) {
	    var sum = left + right;
	    switch (sum) {
	        case 2:
	            return -1;
	        case -2:
	            return 1;
	        default:
	            return sum;
	    }
	}

	/**
	 * Create a new channel object.
	 * @param seed The seed for the channel.
	 * @param security The security level for the channel.
	 * @param mode The mode for the channel.
	 * @param sideKey The side key to use for restricted mode.
	 * @returns The new channel state.
	 */
	function createChannel(seed, security, mode, sideKey) {
	    if (!src_17$2(seed, 81)) {
	        throw new Error("The seed must be 81 trytes long");
	    }
	    if (security < 1 || security > 3) {
	        throw new Error("Security must be between 1 and 3, it is " + security);
	    }
	    validateModeKey(mode, sideKey);
	    return {
	        seed: seed,
	        mode: mode,
	        sideKey: mode === "restricted" ? (sideKey !== null && sideKey !== void 0 ? sideKey : "").padEnd(81, "9") : undefined,
	        security: security,
	        start: 0,
	        count: 1,
	        nextCount: 1,
	        index: 0
	    };
	}
	/**
	 * Get the root of the channel.
	 * @param channelState The channel state to get the root.
	 * @returns The root.
	 */
	function channelRoot(channelState) {
	    if (!channelState) {
	        throw new Error("channelState must be provided");
	    }
	    if (channelState.start < 0) {
	        throw new Error("channelState.start must be >= 0");
	    }
	    if (channelState.count <= 0) {
	        throw new Error("channelState.count must be > 0");
	    }
	    if (channelState.security < 1 || channelState.security > 3) {
	        throw new Error("channelState.security must be between 1 and 3, it is " + channelState.security);
	    }
	    var tree = new MerkleTree(channelState.seed, channelState.start, channelState.count, channelState.security);
	    return src_3(tree.root.addressTrits);
	}
	/**
	 * Prepare a message on the mam channel.
	 * @param channelState The channel to prepare the message for.
	 * @param message The trytes to include in the message.
	 * @returns The prepared message, the channel state will also be updated.
	 */
	function createMessage(channelState, message) {
	    var _a;
	    if (!src_16$2(message)) {
	        throw new Error("The message must be in trytes");
	    }
	    var tree = new MerkleTree(channelState.seed, channelState.start, channelState.count, channelState.security);
	    var nextRootTree = new MerkleTree(channelState.seed, channelState.start + channelState.count, channelState.nextCount, channelState.security);
	    var nextRootTrits = nextRootTree.root.addressTrits;
	    var messageTrits = src_2(message);
	    var indexTrits = pascalEncode(channelState.index);
	    var messageLengthTrits = pascalEncode(messageTrits.length);
	    var subtree = tree.getSubtree(channelState.index);
	    var sponge = new Curl(27);
	    var sideKeyTrits = src_2((_a = channelState.sideKey) !== null && _a !== void 0 ? _a : "9".repeat(81));
	    sponge.absorb(sideKeyTrits, 0, sideKeyTrits.length);
	    sponge.absorb(tree.root.addressTrits, 0, tree.root.addressTrits.length);
	    var payload = concatenate([indexTrits, messageLengthTrits]);
	    sponge.absorb(payload, 0, payload.length);
	    // Encrypt the next root along with the message
	    var maskedNextRoot = mask(concatenate([nextRootTrits, messageTrits]), sponge);
	    payload = concatenate([payload, maskedNextRoot]);
	    // Calculate the nonce for the message so far
	    var hammingDiver = new HammingDiver();
	    var nonceTrits = hammingDiver.search(sponge.rate(Curl.STATE_LENGTH), channelState.security, Curl.HASH_LENGTH / 3, 0);
	    mask(nonceTrits, sponge);
	    payload = concatenate([payload, nonceTrits]);
	    // Create the signature and add the sibling information
	    var sig = signature(sponge.rate(), subtree.key);
	    var subtreeTrits = concatenate(subtree.leaves.map(function (l) { return l.addressTrits; }));
	    var siblingsCount = subtreeTrits.length / Curl.HASH_LENGTH;
	    var encryptedSignature = mask(concatenate([sig, pascalEncode(siblingsCount), subtreeTrits]), sponge);
	    // Insert the signature and pad if necessary
	    payload = concatenate([payload, encryptedSignature]);
	    var nextThird = payload.length % 3;
	    if (nextThird !== 0) {
	        payload = concatenate([payload, new Int8Array(3 - nextThird).fill(0)]);
	    }
	    var messageAddress = channelState.mode === "public"
	        ? tree.root.addressTrits : maskHash(tree.root.addressTrits);
	    var maskedAuthenticatedMessage = {
	        payload: src_3(payload),
	        root: src_3(tree.root.addressTrits),
	        address: src_3(messageAddress)
	    };
	    if (channelState.index === channelState.count - 1) {
	        channelState.start = channelState.nextCount + channelState.start;
	        channelState.index = 0;
	    }
	    else {
	        channelState.index++;
	    }
	    channelState.nextRoot = src_3(nextRootTrits);
	    return maskedAuthenticatedMessage;
	}

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */

	var __assign = function() {
	    __assign = Object.assign || function __assign(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};

	function __awaiter(thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}

	function __generator(thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	}

	/**
	 * Parse the trytes back to the original message.
	 * @param payload The trytes to decode.
	 * @param root The root for the message.
	 * @param channelKey The key used to encode the data.
	 * @returns The decoded message.
	 */
	function parseMessage(payload, root, channelKey) {
	    var payloadTrits = src_2(payload);
	    var rootTrits = src_2(root);
	    var channelKeyTrits = src_2(channelKey !== null && channelKey !== void 0 ? channelKey : "9".repeat(81));
	    // Get data positions in payload
	    var indexData = pascalDecode(payloadTrits);
	    var index = indexData.value;
	    var messageData = pascalDecode(payloadTrits.slice(indexData.end));
	    var messageLength = messageData.value;
	    var nextRootStart = indexData.end + messageData.end;
	    var messageStart = nextRootStart + Curl.HASH_LENGTH;
	    var messageEnd = messageStart + messageLength;
	    // Hash the key, root and payload
	    var sponge = new Curl(27);
	    sponge.absorb(channelKeyTrits, 0, channelKeyTrits.length);
	    sponge.absorb(rootTrits, 0, rootTrits.length);
	    sponge.absorb(payloadTrits, 0, nextRootStart);
	    // Decrypt the metadata
	    var nextRoot = unmask(payloadTrits.slice(nextRootStart, nextRootStart + Curl.HASH_LENGTH), sponge);
	    var message = unmask(payloadTrits.slice(messageStart, messageStart + messageLength), sponge);
	    var nonce = unmask(payloadTrits.slice(messageEnd, messageEnd + (Curl.HASH_LENGTH / 3)), sponge);
	    var hmac = sponge.rate();
	    // Check the security level is valid
	    var securityLevel = checksumSecurity(hmac);
	    if (securityLevel === 0) {
	        throw new Error("Message Hash did not have a hamming weight of zero, security level is invalid");
	    }
	    // Decrypt the rest of the payload
	    var decryptedMetadata = unmask(payloadTrits.slice(messageEnd + nonce.length), sponge);
	    sponge.reset();
	    // Get the signature and absorb its digest
	    var signature = decryptedMetadata.slice(0, securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH);
	    var digest = digestFromSignature(hmac, signature);
	    sponge.absorb(digest, 0, digest.length);
	    // Get the sibling information and validate it
	    var siblingsCountData = pascalDecode(decryptedMetadata.slice(securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH));
	    var siblingsCount = siblingsCountData.value;
	    var recalculatedRoot = sponge.rate();
	    if (siblingsCount !== 0) {
	        var siblingsStart = (securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH) + siblingsCountData.end;
	        var siblings = decryptedMetadata.slice(siblingsStart, siblingsStart + (siblingsCount * Curl.HASH_LENGTH));
	        recalculatedRoot = MerkleTree.root(recalculatedRoot, siblings, index);
	    }
	    // Make sure the root matches the calculated one
	    if (src_3(recalculatedRoot) !== root) {
	        throw new Error("Signature did not match expected root");
	    }
	    return {
	        nextRoot: src_3(nextRoot),
	        message: src_3(message)
	    };
	}

	/**
	 * Attach the mam message to the tangle.
	 * @param api The api to use for attaching.
	 * @param mamMessage The message to attach.
	 * @param depth The depth to perform the attach.
	 * @param mwm The mwm to perform the attach.
	 * @param tag Optional tag for the transactions.
	 * @returns The transactions that were attached.
	 */
	function mamAttach(api, mamMessage, depth, mwm, tag) {
	    return __awaiter(this, void 0, Promise, function () {
	        var transfers, preparedTrytes;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    transfers = [
	                        {
	                            address: mamMessage.address,
	                            value: 0,
	                            message: mamMessage.payload,
	                            tag: tag
	                        }
	                    ];
	                    return [4 /*yield*/, api.prepareTransfers("9".repeat(81), transfers)];
	                case 1:
	                    preparedTrytes = _a.sent();
	                    return [2 /*return*/, api.sendTrytes(preparedTrytes, depth, mwm)];
	            }
	        });
	    });
	}
	/**
	 * Fetch a mam message from a channel.
	 * @param api The api to use for fetching.
	 * @param root The root within the mam channel to fetch the message.
	 * @param mode The mode to use for fetching.
	 * @param sideKey The sideKey if mode is restricted.
	 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
	 * throws exception if transactions found on address are invalid.
	 */
	function mamFetch(api, root, mode, sideKey) {
	    return __awaiter(this, void 0, Promise, function () {
	        var messageAddress, txObjects;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    validateModeKey(mode, sideKey);
	                    messageAddress = decodeAddress(root, mode);
	                    return [4 /*yield*/, api.findTransactionObjects({ addresses: [messageAddress] })];
	                case 1:
	                    txObjects = _a.sent();
	                    return [2 /*return*/, decodeTransactions(txObjects, messageAddress, root, sideKey)];
	            }
	        });
	    });
	}
	/**
	 * Decodes the root to its associated address.
	 * @param root The root to device.
	 * @param mode The mode for the channel.
	 * @returns The decoded address.
	 */
	function decodeAddress(root, mode) {
	    return mode === "public"
	        ? root
	        : src_3(maskHash(src_2(root)));
	}
	/**
	 * Fetch all the mam message from a channel.
	 * If limit is undefined we use Number.MAX_VALUE, this could potentially take a long time to complete.
	 * It is preferable to specify the limit so you read the data in chunks, then if you read and get the
	 * same amount of messages as your limit you should probably read again.
	 * @param api The api to use for fetching.
	 * @param root The root within the mam channel to fetch the message.
	 * @param mode The mode to use for fetching.
	 * @param sideKey The sideKey if mode is restricted.
	 * @param limit Limit the number of messages retrieved.
	 * @returns The array of retrieved messages.
	 */
	function mamFetchAll(api, root, mode, sideKey, limit) {
	    return __awaiter(this, void 0, Promise, function () {
	        var localLimit, messages, fetchRoot, fetched;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    validateModeKey(mode, sideKey);
	                    localLimit = limit === undefined ? Number.MAX_VALUE : limit;
	                    messages = [];
	                    fetchRoot = root;
	                    _a.label = 1;
	                case 1: return [4 /*yield*/, mamFetch(api, fetchRoot, mode, sideKey)];
	                case 2:
	                    fetched = _a.sent();
	                    if (fetched) {
	                        messages.push(fetched);
	                        fetchRoot = fetched.nextRoot;
	                    }
	                    else {
	                        fetchRoot = undefined;
	                    }
	                    _a.label = 3;
	                case 3:
	                    if (fetchRoot && messages.length < localLimit) return [3 /*break*/, 1];
	                    _a.label = 4;
	                case 4: return [2 /*return*/, messages];
	            }
	        });
	    });
	}
	/**
	 * Fetch the next message from a list of channels.
	 * @param {API} api - The api to use for fetching.
	 * @param {Object[]} channels - The list of channel details to check for new messages.
	 * @param {string} channels.root - The root within the mam channel to fetch the message.
	 * @param {MamMode} channels.mode - The mode to use for fetching.
	 * @param {string} channels.sideKey - The sideKey if mode is restricted.
	 * @returns The decoded messages and the nextRoot if successful for each channel, undefined if no messages found,
	 * throws exception if transactions found on address are invalid.
	 */
	function mamFetchCombined(api, channels) {
	    return __awaiter(this, void 0, Promise, function () {
	        var addresses, txObjects, messages, _loop_1, i;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    addresses = channels.map(function (c) {
	                        return (c.mode === "public"
	                            ? c.root
	                            : src_3(maskHash(src_2(c.root))));
	                    });
	                    return [4 /*yield*/, api.findTransactionObjects({ addresses: addresses })];
	                case 1:
	                    txObjects = _a.sent();
	                    messages = [];
	                    _loop_1 = function (i) {
	                        var _a, _b;
	                        return __generator(this, function (_c) {
	                            switch (_c.label) {
	                                case 0:
	                                    _b = (_a = messages).push;
	                                    return [4 /*yield*/, decodeTransactions(txObjects.filter(function (t) { return t.address === addresses[i]; }), addresses[i], channels[i].root, channels[i].sideKey)];
	                                case 1:
	                                    _b.apply(_a, [_c.sent()]);
	                                    return [2 /*return*/];
	                            }
	                        });
	                    };
	                    i = 0;
	                    _a.label = 2;
	                case 2:
	                    if (!(i < addresses.length)) return [3 /*break*/, 5];
	                    return [5 /*yield**/, _loop_1(i)];
	                case 3:
	                    _a.sent();
	                    _a.label = 4;
	                case 4:
	                    i++;
	                    return [3 /*break*/, 2];
	                case 5: return [2 /*return*/, messages];
	            }
	        });
	    });
	}
	/**
	 * Decode transactions from an address to try and find a MAM message.
	 * @param txObjects The objects returned from the fetch.
	 * @param address The address that the data was fetched from.
	 * @param root The root within the mam channel to fetch the message.
	 * @param sideKey The sideKey if mode is restricted.
	 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
	 * throws exception if transactions found on address are invalid.
	 */
	function decodeTransactions(txObjects, address, root, sideKey) {
	    return __awaiter(this, void 0, Promise, function () {
	        var tails, notTails, _loop_2, i, state_1;
	        return __generator(this, function (_a) {
	            if (!txObjects || txObjects.length === 0) {
	                return [2 /*return*/];
	            }
	            tails = txObjects.filter(function (tx) { return tx.currentIndex === 0; });
	            notTails = txObjects.filter(function (tx) { return tx.currentIndex !== 0; });
	            _loop_2 = function (i) {
	                var msg = tails[i].signatureMessageFragment;
	                var currentTx = tails[i];
	                for (var j = 0; j < tails[i].lastIndex; j++) {
	                    var nextTx = notTails.find(function (tx) { return tx.hash === currentTx.trunkTransaction; });
	                    if (!nextTx) {
	                        // This is an incomplete transaction chain so move onto
	                        // the next tail
	                        break;
	                    }
	                    msg += nextTx.signatureMessageFragment;
	                    currentTx = nextTx;
	                    // If we now have all the transactions which make up this message
	                    // try and parse the message
	                    if (j === tails[i].lastIndex - 1) {
	                        try {
	                            var parsed = parseMessage(msg, root, sideKey);
	                            return { value: __assign(__assign({ root: root }, parsed), { tag: tails[i].tag }) };
	                        }
	                        catch (err) {
	                            throw new Error("Failed while trying to read MAM channel from address " + address + ".\n" + err.message);
	                        }
	                    }
	                }
	            };
	            for (i = 0; i < tails.length; i++) {
	                state_1 = _loop_2(i);
	                if (typeof state_1 === "object")
	                    return [2 /*return*/, state_1.value];
	            }
	            return [2 /*return*/];
	        });
	    });
	}

	exports.asciiToTrytes = src_1;
	exports.channelRoot = channelRoot;
	exports.composeAPI = src_37$1;
	exports.createChannel = createChannel;
	exports.createMessage = createMessage;
	exports.decodeAddress = decodeAddress;
	exports.decodeTransactions = decodeTransactions;
	exports.mamAttach = mamAttach;
	exports.mamFetch = mamFetch;
	exports.mamFetchAll = mamFetchAll;
	exports.mamFetchCombined = mamFetchCombined;
	exports.parseMessage = parseMessage;
	exports.trytesToAscii = src_4;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
