(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('big-integer')) :
	typeof define === 'function' && define.amd ? define(['big-integer'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.mam = factory(global.bigInt));
}(this, (function (require$$0) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var iota2_browser = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
		 module.exports = factory() ;
	}(commonjsGlobal, (function () {
		var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

		function getDefaultExportFromCjs (x) {
			return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
		}

		function createCommonjsModule(fn, basedir, module) {
			return module = {
				path: basedir,
				exports: {},
				require: function (path, base) {
					return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
				}
			}, fn(module, module.exports), module.exports;
		}

		function getAugmentedNamespace(n) {
			if (n.__esModule) return n;
			var a = Object.defineProperty({}, '__esModule', {value: true});
			Object.keys(n).forEach(function (k) {
				var d = Object.getOwnPropertyDescriptor(n, k);
				Object.defineProperty(a, k, d.get ? d : {
					enumerable: true,
					get: function () {
						return n[k];
					}
				});
			});
			return a;
		}

		function commonjsRequire () {
			throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
		}

		var global$1 = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal :
		            typeof self !== "undefined" ? self :
		            typeof window !== "undefined" ? window : {});

		var lookup = [];
		var revLookup = [];
		var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
		var inited = false;
		function init () {
		  inited = true;
		  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		  for (var i = 0, len = code.length; i < len; ++i) {
		    lookup[i] = code[i];
		    revLookup[code.charCodeAt(i)] = i;
		  }

		  revLookup['-'.charCodeAt(0)] = 62;
		  revLookup['_'.charCodeAt(0)] = 63;
		}

		function toByteArray (b64) {
		  if (!inited) {
		    init();
		  }
		  var i, j, l, tmp, placeHolders, arr;
		  var len = b64.length;

		  if (len % 4 > 0) {
		    throw new Error('Invalid string. Length must be a multiple of 4')
		  }

		  // the number of equal signs (place holders)
		  // if there are two placeholders, than the two characters before it
		  // represent one byte
		  // if there is only one, then the three characters before it represent 2 bytes
		  // this is just a cheap hack to not do indexOf twice
		  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

		  // base64 is 4/3 + up to two characters of the original data
		  arr = new Arr(len * 3 / 4 - placeHolders);

		  // if there are placeholders, only get up to the last complete 4 chars
		  l = placeHolders > 0 ? len - 4 : len;

		  var L = 0;

		  for (i = 0, j = 0; i < l; i += 4, j += 3) {
		    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
		    arr[L++] = (tmp >> 16) & 0xFF;
		    arr[L++] = (tmp >> 8) & 0xFF;
		    arr[L++] = tmp & 0xFF;
		  }

		  if (placeHolders === 2) {
		    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
		    arr[L++] = tmp & 0xFF;
		  } else if (placeHolders === 1) {
		    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
		    arr[L++] = (tmp >> 8) & 0xFF;
		    arr[L++] = tmp & 0xFF;
		  }

		  return arr
		}

		function tripletToBase64 (num) {
		  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
		}

		function encodeChunk (uint8, start, end) {
		  var tmp;
		  var output = [];
		  for (var i = start; i < end; i += 3) {
		    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
		    output.push(tripletToBase64(tmp));
		  }
		  return output.join('')
		}

		function fromByteArray (uint8) {
		  if (!inited) {
		    init();
		  }
		  var tmp;
		  var len = uint8.length;
		  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
		  var output = '';
		  var parts = [];
		  var maxChunkLength = 16383; // must be multiple of 3

		  // go through the array every three bytes, we'll deal with trailing stuff later
		  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
		    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
		  }

		  // pad the end with zeros, but make sure to not forget the extra bytes
		  if (extraBytes === 1) {
		    tmp = uint8[len - 1];
		    output += lookup[tmp >> 2];
		    output += lookup[(tmp << 4) & 0x3F];
		    output += '==';
		  } else if (extraBytes === 2) {
		    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
		    output += lookup[tmp >> 10];
		    output += lookup[(tmp >> 4) & 0x3F];
		    output += lookup[(tmp << 2) & 0x3F];
		    output += '=';
		  }

		  parts.push(output);

		  return parts.join('')
		}

		function read (buffer, offset, isLE, mLen, nBytes) {
		  var e, m;
		  var eLen = nBytes * 8 - mLen - 1;
		  var eMax = (1 << eLen) - 1;
		  var eBias = eMax >> 1;
		  var nBits = -7;
		  var i = isLE ? (nBytes - 1) : 0;
		  var d = isLE ? -1 : 1;
		  var s = buffer[offset + i];

		  i += d;

		  e = s & ((1 << (-nBits)) - 1);
		  s >>= (-nBits);
		  nBits += eLen;
		  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

		  m = e & ((1 << (-nBits)) - 1);
		  e >>= (-nBits);
		  nBits += mLen;
		  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

		  if (e === 0) {
		    e = 1 - eBias;
		  } else if (e === eMax) {
		    return m ? NaN : ((s ? -1 : 1) * Infinity)
		  } else {
		    m = m + Math.pow(2, mLen);
		    e = e - eBias;
		  }
		  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
		}

		function write (buffer, value, offset, isLE, mLen, nBytes) {
		  var e, m, c;
		  var eLen = nBytes * 8 - mLen - 1;
		  var eMax = (1 << eLen) - 1;
		  var eBias = eMax >> 1;
		  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
		  var i = isLE ? 0 : (nBytes - 1);
		  var d = isLE ? 1 : -1;
		  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

		  value = Math.abs(value);

		  if (isNaN(value) || value === Infinity) {
		    m = isNaN(value) ? 1 : 0;
		    e = eMax;
		  } else {
		    e = Math.floor(Math.log(value) / Math.LN2);
		    if (value * (c = Math.pow(2, -e)) < 1) {
		      e--;
		      c *= 2;
		    }
		    if (e + eBias >= 1) {
		      value += rt / c;
		    } else {
		      value += rt * Math.pow(2, 1 - eBias);
		    }
		    if (value * c >= 2) {
		      e++;
		      c /= 2;
		    }

		    if (e + eBias >= eMax) {
		      m = 0;
		      e = eMax;
		    } else if (e + eBias >= 1) {
		      m = (value * c - 1) * Math.pow(2, mLen);
		      e = e + eBias;
		    } else {
		      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
		      e = 0;
		    }
		  }

		  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

		  e = (e << mLen) | m;
		  eLen += mLen;
		  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

		  buffer[offset + i - d] |= s * 128;
		}

		var toString = {}.toString;

		var isArray = Array.isArray || function (arr) {
		  return toString.call(arr) == '[object Array]';
		};

		var INSPECT_MAX_BYTES = 50;

		/**
		 * If `Buffer.TYPED_ARRAY_SUPPORT`:
		 *   === true    Use Uint8Array implementation (fastest)
		 *   === false   Use Object implementation (most compatible, even IE6)
		 *
		 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
		 * Opera 11.6+, iOS 4.2+.
		 *
		 * Due to various browser bugs, sometimes the Object implementation will be used even
		 * when the browser supports typed arrays.
		 *
		 * Note:
		 *
		 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
		 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
		 *
		 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
		 *
		 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
		 *     incorrect length in some situations.

		 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
		 * get the Object implementation, which is slower but behaves correctly.
		 */
		Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
		  ? global$1.TYPED_ARRAY_SUPPORT
		  : true;

		/*
		 * Export kMaxLength after typed array support is determined.
		 */
		var _kMaxLength = kMaxLength();

		function kMaxLength () {
		  return Buffer.TYPED_ARRAY_SUPPORT
		    ? 0x7fffffff
		    : 0x3fffffff
		}

		function createBuffer (that, length) {
		  if (kMaxLength() < length) {
		    throw new RangeError('Invalid typed array length')
		  }
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    // Return an augmented `Uint8Array` instance, for best performance
		    that = new Uint8Array(length);
		    that.__proto__ = Buffer.prototype;
		  } else {
		    // Fallback: Return an object instance of the Buffer class
		    if (that === null) {
		      that = new Buffer(length);
		    }
		    that.length = length;
		  }

		  return that
		}

		/**
		 * The Buffer constructor returns instances of `Uint8Array` that have their
		 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
		 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
		 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
		 * returns a single octet.
		 *
		 * The `Uint8Array` prototype remains unmodified.
		 */

		function Buffer (arg, encodingOrOffset, length) {
		  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
		    return new Buffer(arg, encodingOrOffset, length)
		  }

		  // Common case.
		  if (typeof arg === 'number') {
		    if (typeof encodingOrOffset === 'string') {
		      throw new Error(
		        'If encoding is specified then the first argument must be a string'
		      )
		    }
		    return allocUnsafe(this, arg)
		  }
		  return from(this, arg, encodingOrOffset, length)
		}

		Buffer.poolSize = 8192; // not used by this implementation

		// TODO: Legacy, not needed anymore. Remove in next major version.
		Buffer._augment = function (arr) {
		  arr.__proto__ = Buffer.prototype;
		  return arr
		};

		function from (that, value, encodingOrOffset, length) {
		  if (typeof value === 'number') {
		    throw new TypeError('"value" argument must not be a number')
		  }

		  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
		    return fromArrayBuffer(that, value, encodingOrOffset, length)
		  }

		  if (typeof value === 'string') {
		    return fromString(that, value, encodingOrOffset)
		  }

		  return fromObject(that, value)
		}

		/**
		 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
		 * if value is a number.
		 * Buffer.from(str[, encoding])
		 * Buffer.from(array)
		 * Buffer.from(buffer)
		 * Buffer.from(arrayBuffer[, byteOffset[, length]])
		 **/
		Buffer.from = function (value, encodingOrOffset, length) {
		  return from(null, value, encodingOrOffset, length)
		};

		if (Buffer.TYPED_ARRAY_SUPPORT) {
		  Buffer.prototype.__proto__ = Uint8Array.prototype;
		  Buffer.__proto__ = Uint8Array;
		}

		function assertSize (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('"size" argument must be a number')
		  } else if (size < 0) {
		    throw new RangeError('"size" argument must not be negative')
		  }
		}

		function alloc (that, size, fill, encoding) {
		  assertSize(size);
		  if (size <= 0) {
		    return createBuffer(that, size)
		  }
		  if (fill !== undefined) {
		    // Only pay attention to encoding if it's a string. This
		    // prevents accidentally sending in a number that would
		    // be interpretted as a start offset.
		    return typeof encoding === 'string'
		      ? createBuffer(that, size).fill(fill, encoding)
		      : createBuffer(that, size).fill(fill)
		  }
		  return createBuffer(that, size)
		}

		/**
		 * Creates a new filled Buffer instance.
		 * alloc(size[, fill[, encoding]])
		 **/
		Buffer.alloc = function (size, fill, encoding) {
		  return alloc(null, size, fill, encoding)
		};

		function allocUnsafe (that, size) {
		  assertSize(size);
		  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
		  if (!Buffer.TYPED_ARRAY_SUPPORT) {
		    for (var i = 0; i < size; ++i) {
		      that[i] = 0;
		    }
		  }
		  return that
		}

		/**
		 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
		 * */
		Buffer.allocUnsafe = function (size) {
		  return allocUnsafe(null, size)
		};
		/**
		 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
		 */
		Buffer.allocUnsafeSlow = function (size) {
		  return allocUnsafe(null, size)
		};

		function fromString (that, string, encoding) {
		  if (typeof encoding !== 'string' || encoding === '') {
		    encoding = 'utf8';
		  }

		  if (!Buffer.isEncoding(encoding)) {
		    throw new TypeError('"encoding" must be a valid string encoding')
		  }

		  var length = byteLength(string, encoding) | 0;
		  that = createBuffer(that, length);

		  var actual = that.write(string, encoding);

		  if (actual !== length) {
		    // Writing a hex string, for example, that contains invalid characters will
		    // cause everything after the first invalid character to be ignored. (e.g.
		    // 'abxxcd' will be treated as 'ab')
		    that = that.slice(0, actual);
		  }

		  return that
		}

		function fromArrayLike (that, array) {
		  var length = array.length < 0 ? 0 : checked(array.length) | 0;
		  that = createBuffer(that, length);
		  for (var i = 0; i < length; i += 1) {
		    that[i] = array[i] & 255;
		  }
		  return that
		}

		function fromArrayBuffer (that, array, byteOffset, length) {
		  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

		  if (byteOffset < 0 || array.byteLength < byteOffset) {
		    throw new RangeError('\'offset\' is out of bounds')
		  }

		  if (array.byteLength < byteOffset + (length || 0)) {
		    throw new RangeError('\'length\' is out of bounds')
		  }

		  if (byteOffset === undefined && length === undefined) {
		    array = new Uint8Array(array);
		  } else if (length === undefined) {
		    array = new Uint8Array(array, byteOffset);
		  } else {
		    array = new Uint8Array(array, byteOffset, length);
		  }

		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    // Return an augmented `Uint8Array` instance, for best performance
		    that = array;
		    that.__proto__ = Buffer.prototype;
		  } else {
		    // Fallback: Return an object instance of the Buffer class
		    that = fromArrayLike(that, array);
		  }
		  return that
		}

		function fromObject (that, obj) {
		  if (internalIsBuffer(obj)) {
		    var len = checked(obj.length) | 0;
		    that = createBuffer(that, len);

		    if (that.length === 0) {
		      return that
		    }

		    obj.copy(that, 0, 0, len);
		    return that
		  }

		  if (obj) {
		    if ((typeof ArrayBuffer !== 'undefined' &&
		        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
		      if (typeof obj.length !== 'number' || isnan(obj.length)) {
		        return createBuffer(that, 0)
		      }
		      return fromArrayLike(that, obj)
		    }

		    if (obj.type === 'Buffer' && isArray(obj.data)) {
		      return fromArrayLike(that, obj.data)
		    }
		  }

		  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
		}

		function checked (length) {
		  // Note: cannot use `length < kMaxLength()` here because that fails when
		  // length is NaN (which is otherwise coerced to zero.)
		  if (length >= kMaxLength()) {
		    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
		                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
		  }
		  return length | 0
		}

		function SlowBuffer (length) {
		  if (+length != length) { // eslint-disable-line eqeqeq
		    length = 0;
		  }
		  return Buffer.alloc(+length)
		}
		Buffer.isBuffer = isBuffer;
		function internalIsBuffer (b) {
		  return !!(b != null && b._isBuffer)
		}

		Buffer.compare = function compare (a, b) {
		  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
		    throw new TypeError('Arguments must be Buffers')
		  }

		  if (a === b) return 0

		  var x = a.length;
		  var y = b.length;

		  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
		    if (a[i] !== b[i]) {
		      x = a[i];
		      y = b[i];
		      break
		    }
		  }

		  if (x < y) return -1
		  if (y < x) return 1
		  return 0
		};

		Buffer.isEncoding = function isEncoding (encoding) {
		  switch (String(encoding).toLowerCase()) {
		    case 'hex':
		    case 'utf8':
		    case 'utf-8':
		    case 'ascii':
		    case 'latin1':
		    case 'binary':
		    case 'base64':
		    case 'ucs2':
		    case 'ucs-2':
		    case 'utf16le':
		    case 'utf-16le':
		      return true
		    default:
		      return false
		  }
		};

		Buffer.concat = function concat (list, length) {
		  if (!isArray(list)) {
		    throw new TypeError('"list" argument must be an Array of Buffers')
		  }

		  if (list.length === 0) {
		    return Buffer.alloc(0)
		  }

		  var i;
		  if (length === undefined) {
		    length = 0;
		    for (i = 0; i < list.length; ++i) {
		      length += list[i].length;
		    }
		  }

		  var buffer = Buffer.allocUnsafe(length);
		  var pos = 0;
		  for (i = 0; i < list.length; ++i) {
		    var buf = list[i];
		    if (!internalIsBuffer(buf)) {
		      throw new TypeError('"list" argument must be an Array of Buffers')
		    }
		    buf.copy(buffer, pos);
		    pos += buf.length;
		  }
		  return buffer
		};

		function byteLength (string, encoding) {
		  if (internalIsBuffer(string)) {
		    return string.length
		  }
		  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
		      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
		    return string.byteLength
		  }
		  if (typeof string !== 'string') {
		    string = '' + string;
		  }

		  var len = string.length;
		  if (len === 0) return 0

		  // Use a for loop to avoid recursion
		  var loweredCase = false;
		  for (;;) {
		    switch (encoding) {
		      case 'ascii':
		      case 'latin1':
		      case 'binary':
		        return len
		      case 'utf8':
		      case 'utf-8':
		      case undefined:
		        return utf8ToBytes(string).length
		      case 'ucs2':
		      case 'ucs-2':
		      case 'utf16le':
		      case 'utf-16le':
		        return len * 2
		      case 'hex':
		        return len >>> 1
		      case 'base64':
		        return base64ToBytes(string).length
		      default:
		        if (loweredCase) return utf8ToBytes(string).length // assume utf8
		        encoding = ('' + encoding).toLowerCase();
		        loweredCase = true;
		    }
		  }
		}
		Buffer.byteLength = byteLength;

		function slowToString (encoding, start, end) {
		  var loweredCase = false;

		  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
		  // property of a typed array.

		  // This behaves neither like String nor Uint8Array in that we set start/end
		  // to their upper/lower bounds if the value passed is out of range.
		  // undefined is handled specially as per ECMA-262 6th Edition,
		  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
		  if (start === undefined || start < 0) {
		    start = 0;
		  }
		  // Return early if start > this.length. Done here to prevent potential uint32
		  // coercion fail below.
		  if (start > this.length) {
		    return ''
		  }

		  if (end === undefined || end > this.length) {
		    end = this.length;
		  }

		  if (end <= 0) {
		    return ''
		  }

		  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
		  end >>>= 0;
		  start >>>= 0;

		  if (end <= start) {
		    return ''
		  }

		  if (!encoding) encoding = 'utf8';

		  while (true) {
		    switch (encoding) {
		      case 'hex':
		        return hexSlice(this, start, end)

		      case 'utf8':
		      case 'utf-8':
		        return utf8Slice(this, start, end)

		      case 'ascii':
		        return asciiSlice(this, start, end)

		      case 'latin1':
		      case 'binary':
		        return latin1Slice(this, start, end)

		      case 'base64':
		        return base64Slice(this, start, end)

		      case 'ucs2':
		      case 'ucs-2':
		      case 'utf16le':
		      case 'utf-16le':
		        return utf16leSlice(this, start, end)

		      default:
		        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
		        encoding = (encoding + '').toLowerCase();
		        loweredCase = true;
		    }
		  }
		}

		// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
		// Buffer instances.
		Buffer.prototype._isBuffer = true;

		function swap (b, n, m) {
		  var i = b[n];
		  b[n] = b[m];
		  b[m] = i;
		}

		Buffer.prototype.swap16 = function swap16 () {
		  var len = this.length;
		  if (len % 2 !== 0) {
		    throw new RangeError('Buffer size must be a multiple of 16-bits')
		  }
		  for (var i = 0; i < len; i += 2) {
		    swap(this, i, i + 1);
		  }
		  return this
		};

		Buffer.prototype.swap32 = function swap32 () {
		  var len = this.length;
		  if (len % 4 !== 0) {
		    throw new RangeError('Buffer size must be a multiple of 32-bits')
		  }
		  for (var i = 0; i < len; i += 4) {
		    swap(this, i, i + 3);
		    swap(this, i + 1, i + 2);
		  }
		  return this
		};

		Buffer.prototype.swap64 = function swap64 () {
		  var len = this.length;
		  if (len % 8 !== 0) {
		    throw new RangeError('Buffer size must be a multiple of 64-bits')
		  }
		  for (var i = 0; i < len; i += 8) {
		    swap(this, i, i + 7);
		    swap(this, i + 1, i + 6);
		    swap(this, i + 2, i + 5);
		    swap(this, i + 3, i + 4);
		  }
		  return this
		};

		Buffer.prototype.toString = function toString () {
		  var length = this.length | 0;
		  if (length === 0) return ''
		  if (arguments.length === 0) return utf8Slice(this, 0, length)
		  return slowToString.apply(this, arguments)
		};

		Buffer.prototype.equals = function equals (b) {
		  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
		  if (this === b) return true
		  return Buffer.compare(this, b) === 0
		};

		Buffer.prototype.inspect = function inspect () {
		  var str = '';
		  var max = INSPECT_MAX_BYTES;
		  if (this.length > 0) {
		    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
		    if (this.length > max) str += ' ... ';
		  }
		  return '<Buffer ' + str + '>'
		};

		Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
		  if (!internalIsBuffer(target)) {
		    throw new TypeError('Argument must be a Buffer')
		  }

		  if (start === undefined) {
		    start = 0;
		  }
		  if (end === undefined) {
		    end = target ? target.length : 0;
		  }
		  if (thisStart === undefined) {
		    thisStart = 0;
		  }
		  if (thisEnd === undefined) {
		    thisEnd = this.length;
		  }

		  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
		    throw new RangeError('out of range index')
		  }

		  if (thisStart >= thisEnd && start >= end) {
		    return 0
		  }
		  if (thisStart >= thisEnd) {
		    return -1
		  }
		  if (start >= end) {
		    return 1
		  }

		  start >>>= 0;
		  end >>>= 0;
		  thisStart >>>= 0;
		  thisEnd >>>= 0;

		  if (this === target) return 0

		  var x = thisEnd - thisStart;
		  var y = end - start;
		  var len = Math.min(x, y);

		  var thisCopy = this.slice(thisStart, thisEnd);
		  var targetCopy = target.slice(start, end);

		  for (var i = 0; i < len; ++i) {
		    if (thisCopy[i] !== targetCopy[i]) {
		      x = thisCopy[i];
		      y = targetCopy[i];
		      break
		    }
		  }

		  if (x < y) return -1
		  if (y < x) return 1
		  return 0
		};

		// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
		// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
		//
		// Arguments:
		// - buffer - a Buffer to search
		// - val - a string, Buffer, or number
		// - byteOffset - an index into `buffer`; will be clamped to an int32
		// - encoding - an optional encoding, relevant is val is a string
		// - dir - true for indexOf, false for lastIndexOf
		function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
		  // Empty buffer means no match
		  if (buffer.length === 0) return -1

		  // Normalize byteOffset
		  if (typeof byteOffset === 'string') {
		    encoding = byteOffset;
		    byteOffset = 0;
		  } else if (byteOffset > 0x7fffffff) {
		    byteOffset = 0x7fffffff;
		  } else if (byteOffset < -0x80000000) {
		    byteOffset = -0x80000000;
		  }
		  byteOffset = +byteOffset;  // Coerce to Number.
		  if (isNaN(byteOffset)) {
		    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
		    byteOffset = dir ? 0 : (buffer.length - 1);
		  }

		  // Normalize byteOffset: negative offsets start from the end of the buffer
		  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
		  if (byteOffset >= buffer.length) {
		    if (dir) return -1
		    else byteOffset = buffer.length - 1;
		  } else if (byteOffset < 0) {
		    if (dir) byteOffset = 0;
		    else return -1
		  }

		  // Normalize val
		  if (typeof val === 'string') {
		    val = Buffer.from(val, encoding);
		  }

		  // Finally, search either indexOf (if dir is true) or lastIndexOf
		  if (internalIsBuffer(val)) {
		    // Special case: looking for empty string/buffer always fails
		    if (val.length === 0) {
		      return -1
		    }
		    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
		  } else if (typeof val === 'number') {
		    val = val & 0xFF; // Search for a byte value [0-255]
		    if (Buffer.TYPED_ARRAY_SUPPORT &&
		        typeof Uint8Array.prototype.indexOf === 'function') {
		      if (dir) {
		        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
		      } else {
		        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
		      }
		    }
		    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
		  }

		  throw new TypeError('val must be string, number or Buffer')
		}

		function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
		  var indexSize = 1;
		  var arrLength = arr.length;
		  var valLength = val.length;

		  if (encoding !== undefined) {
		    encoding = String(encoding).toLowerCase();
		    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
		        encoding === 'utf16le' || encoding === 'utf-16le') {
		      if (arr.length < 2 || val.length < 2) {
		        return -1
		      }
		      indexSize = 2;
		      arrLength /= 2;
		      valLength /= 2;
		      byteOffset /= 2;
		    }
		  }

		  function read (buf, i) {
		    if (indexSize === 1) {
		      return buf[i]
		    } else {
		      return buf.readUInt16BE(i * indexSize)
		    }
		  }

		  var i;
		  if (dir) {
		    var foundIndex = -1;
		    for (i = byteOffset; i < arrLength; i++) {
		      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
		        if (foundIndex === -1) foundIndex = i;
		        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
		      } else {
		        if (foundIndex !== -1) i -= i - foundIndex;
		        foundIndex = -1;
		      }
		    }
		  } else {
		    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
		    for (i = byteOffset; i >= 0; i--) {
		      var found = true;
		      for (var j = 0; j < valLength; j++) {
		        if (read(arr, i + j) !== read(val, j)) {
		          found = false;
		          break
		        }
		      }
		      if (found) return i
		    }
		  }

		  return -1
		}

		Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
		  return this.indexOf(val, byteOffset, encoding) !== -1
		};

		Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
		  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
		};

		Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
		  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
		};

		function hexWrite (buf, string, offset, length) {
		  offset = Number(offset) || 0;
		  var remaining = buf.length - offset;
		  if (!length) {
		    length = remaining;
		  } else {
		    length = Number(length);
		    if (length > remaining) {
		      length = remaining;
		    }
		  }

		  // must be an even number of digits
		  var strLen = string.length;
		  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

		  if (length > strLen / 2) {
		    length = strLen / 2;
		  }
		  for (var i = 0; i < length; ++i) {
		    var parsed = parseInt(string.substr(i * 2, 2), 16);
		    if (isNaN(parsed)) return i
		    buf[offset + i] = parsed;
		  }
		  return i
		}

		function utf8Write (buf, string, offset, length) {
		  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
		}

		function asciiWrite (buf, string, offset, length) {
		  return blitBuffer(asciiToBytes(string), buf, offset, length)
		}

		function latin1Write (buf, string, offset, length) {
		  return asciiWrite(buf, string, offset, length)
		}

		function base64Write (buf, string, offset, length) {
		  return blitBuffer(base64ToBytes(string), buf, offset, length)
		}

		function ucs2Write (buf, string, offset, length) {
		  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
		}

		Buffer.prototype.write = function write (string, offset, length, encoding) {
		  // Buffer#write(string)
		  if (offset === undefined) {
		    encoding = 'utf8';
		    length = this.length;
		    offset = 0;
		  // Buffer#write(string, encoding)
		  } else if (length === undefined && typeof offset === 'string') {
		    encoding = offset;
		    length = this.length;
		    offset = 0;
		  // Buffer#write(string, offset[, length][, encoding])
		  } else if (isFinite(offset)) {
		    offset = offset | 0;
		    if (isFinite(length)) {
		      length = length | 0;
		      if (encoding === undefined) encoding = 'utf8';
		    } else {
		      encoding = length;
		      length = undefined;
		    }
		  // legacy write(string, encoding, offset, length) - remove in v0.13
		  } else {
		    throw new Error(
		      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
		    )
		  }

		  var remaining = this.length - offset;
		  if (length === undefined || length > remaining) length = remaining;

		  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
		    throw new RangeError('Attempt to write outside buffer bounds')
		  }

		  if (!encoding) encoding = 'utf8';

		  var loweredCase = false;
		  for (;;) {
		    switch (encoding) {
		      case 'hex':
		        return hexWrite(this, string, offset, length)

		      case 'utf8':
		      case 'utf-8':
		        return utf8Write(this, string, offset, length)

		      case 'ascii':
		        return asciiWrite(this, string, offset, length)

		      case 'latin1':
		      case 'binary':
		        return latin1Write(this, string, offset, length)

		      case 'base64':
		        // Warning: maxLength not taken into account in base64Write
		        return base64Write(this, string, offset, length)

		      case 'ucs2':
		      case 'ucs-2':
		      case 'utf16le':
		      case 'utf-16le':
		        return ucs2Write(this, string, offset, length)

		      default:
		        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
		        encoding = ('' + encoding).toLowerCase();
		        loweredCase = true;
		    }
		  }
		};

		Buffer.prototype.toJSON = function toJSON () {
		  return {
		    type: 'Buffer',
		    data: Array.prototype.slice.call(this._arr || this, 0)
		  }
		};

		function base64Slice (buf, start, end) {
		  if (start === 0 && end === buf.length) {
		    return fromByteArray(buf)
		  } else {
		    return fromByteArray(buf.slice(start, end))
		  }
		}

		function utf8Slice (buf, start, end) {
		  end = Math.min(buf.length, end);
		  var res = [];

		  var i = start;
		  while (i < end) {
		    var firstByte = buf[i];
		    var codePoint = null;
		    var bytesPerSequence = (firstByte > 0xEF) ? 4
		      : (firstByte > 0xDF) ? 3
		      : (firstByte > 0xBF) ? 2
		      : 1;

		    if (i + bytesPerSequence <= end) {
		      var secondByte, thirdByte, fourthByte, tempCodePoint;

		      switch (bytesPerSequence) {
		        case 1:
		          if (firstByte < 0x80) {
		            codePoint = firstByte;
		          }
		          break
		        case 2:
		          secondByte = buf[i + 1];
		          if ((secondByte & 0xC0) === 0x80) {
		            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
		            if (tempCodePoint > 0x7F) {
		              codePoint = tempCodePoint;
		            }
		          }
		          break
		        case 3:
		          secondByte = buf[i + 1];
		          thirdByte = buf[i + 2];
		          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
		            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
		            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
		              codePoint = tempCodePoint;
		            }
		          }
		          break
		        case 4:
		          secondByte = buf[i + 1];
		          thirdByte = buf[i + 2];
		          fourthByte = buf[i + 3];
		          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
		            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
		            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
		              codePoint = tempCodePoint;
		            }
		          }
		      }
		    }

		    if (codePoint === null) {
		      // we did not generate a valid codePoint so insert a
		      // replacement char (U+FFFD) and advance only 1 byte
		      codePoint = 0xFFFD;
		      bytesPerSequence = 1;
		    } else if (codePoint > 0xFFFF) {
		      // encode to utf16 (surrogate pair dance)
		      codePoint -= 0x10000;
		      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
		      codePoint = 0xDC00 | codePoint & 0x3FF;
		    }

		    res.push(codePoint);
		    i += bytesPerSequence;
		  }

		  return decodeCodePointsArray(res)
		}

		// Based on http://stackoverflow.com/a/22747272/680742, the browser with
		// the lowest limit is Chrome, with 0x10000 args.
		// We go 1 magnitude less, for safety
		var MAX_ARGUMENTS_LENGTH = 0x1000;

		function decodeCodePointsArray (codePoints) {
		  var len = codePoints.length;
		  if (len <= MAX_ARGUMENTS_LENGTH) {
		    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
		  }

		  // Decode in chunks to avoid "call stack size exceeded".
		  var res = '';
		  var i = 0;
		  while (i < len) {
		    res += String.fromCharCode.apply(
		      String,
		      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
		    );
		  }
		  return res
		}

		function asciiSlice (buf, start, end) {
		  var ret = '';
		  end = Math.min(buf.length, end);

		  for (var i = start; i < end; ++i) {
		    ret += String.fromCharCode(buf[i] & 0x7F);
		  }
		  return ret
		}

		function latin1Slice (buf, start, end) {
		  var ret = '';
		  end = Math.min(buf.length, end);

		  for (var i = start; i < end; ++i) {
		    ret += String.fromCharCode(buf[i]);
		  }
		  return ret
		}

		function hexSlice (buf, start, end) {
		  var len = buf.length;

		  if (!start || start < 0) start = 0;
		  if (!end || end < 0 || end > len) end = len;

		  var out = '';
		  for (var i = start; i < end; ++i) {
		    out += toHex(buf[i]);
		  }
		  return out
		}

		function utf16leSlice (buf, start, end) {
		  var bytes = buf.slice(start, end);
		  var res = '';
		  for (var i = 0; i < bytes.length; i += 2) {
		    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
		  }
		  return res
		}

		Buffer.prototype.slice = function slice (start, end) {
		  var len = this.length;
		  start = ~~start;
		  end = end === undefined ? len : ~~end;

		  if (start < 0) {
		    start += len;
		    if (start < 0) start = 0;
		  } else if (start > len) {
		    start = len;
		  }

		  if (end < 0) {
		    end += len;
		    if (end < 0) end = 0;
		  } else if (end > len) {
		    end = len;
		  }

		  if (end < start) end = start;

		  var newBuf;
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    newBuf = this.subarray(start, end);
		    newBuf.__proto__ = Buffer.prototype;
		  } else {
		    var sliceLen = end - start;
		    newBuf = new Buffer(sliceLen, undefined);
		    for (var i = 0; i < sliceLen; ++i) {
		      newBuf[i] = this[i + start];
		    }
		  }

		  return newBuf
		};

		/*
		 * Need to make sure that buffer isn't trying to write out of bounds.
		 */
		function checkOffset (offset, ext, length) {
		  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
		  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
		}

		Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
		  offset = offset | 0;
		  byteLength = byteLength | 0;
		  if (!noAssert) checkOffset(offset, byteLength, this.length);

		  var val = this[offset];
		  var mul = 1;
		  var i = 0;
		  while (++i < byteLength && (mul *= 0x100)) {
		    val += this[offset + i] * mul;
		  }

		  return val
		};

		Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
		  offset = offset | 0;
		  byteLength = byteLength | 0;
		  if (!noAssert) {
		    checkOffset(offset, byteLength, this.length);
		  }

		  var val = this[offset + --byteLength];
		  var mul = 1;
		  while (byteLength > 0 && (mul *= 0x100)) {
		    val += this[offset + --byteLength] * mul;
		  }

		  return val
		};

		Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 1, this.length);
		  return this[offset]
		};

		Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 2, this.length);
		  return this[offset] | (this[offset + 1] << 8)
		};

		Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 2, this.length);
		  return (this[offset] << 8) | this[offset + 1]
		};

		Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 4, this.length);

		  return ((this[offset]) |
		      (this[offset + 1] << 8) |
		      (this[offset + 2] << 16)) +
		      (this[offset + 3] * 0x1000000)
		};

		Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 4, this.length);

		  return (this[offset] * 0x1000000) +
		    ((this[offset + 1] << 16) |
		    (this[offset + 2] << 8) |
		    this[offset + 3])
		};

		Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
		  offset = offset | 0;
		  byteLength = byteLength | 0;
		  if (!noAssert) checkOffset(offset, byteLength, this.length);

		  var val = this[offset];
		  var mul = 1;
		  var i = 0;
		  while (++i < byteLength && (mul *= 0x100)) {
		    val += this[offset + i] * mul;
		  }
		  mul *= 0x80;

		  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

		  return val
		};

		Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
		  offset = offset | 0;
		  byteLength = byteLength | 0;
		  if (!noAssert) checkOffset(offset, byteLength, this.length);

		  var i = byteLength;
		  var mul = 1;
		  var val = this[offset + --i];
		  while (i > 0 && (mul *= 0x100)) {
		    val += this[offset + --i] * mul;
		  }
		  mul *= 0x80;

		  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

		  return val
		};

		Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 1, this.length);
		  if (!(this[offset] & 0x80)) return (this[offset])
		  return ((0xff - this[offset] + 1) * -1)
		};

		Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 2, this.length);
		  var val = this[offset] | (this[offset + 1] << 8);
		  return (val & 0x8000) ? val | 0xFFFF0000 : val
		};

		Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 2, this.length);
		  var val = this[offset + 1] | (this[offset] << 8);
		  return (val & 0x8000) ? val | 0xFFFF0000 : val
		};

		Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 4, this.length);

		  return (this[offset]) |
		    (this[offset + 1] << 8) |
		    (this[offset + 2] << 16) |
		    (this[offset + 3] << 24)
		};

		Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 4, this.length);

		  return (this[offset] << 24) |
		    (this[offset + 1] << 16) |
		    (this[offset + 2] << 8) |
		    (this[offset + 3])
		};

		Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 4, this.length);
		  return read(this, offset, true, 23, 4)
		};

		Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 4, this.length);
		  return read(this, offset, false, 23, 4)
		};

		Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 8, this.length);
		  return read(this, offset, true, 52, 8)
		};

		Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
		  if (!noAssert) checkOffset(offset, 8, this.length);
		  return read(this, offset, false, 52, 8)
		};

		function checkInt (buf, value, offset, ext, max, min) {
		  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
		  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
		  if (offset + ext > buf.length) throw new RangeError('Index out of range')
		}

		Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
		  value = +value;
		  offset = offset | 0;
		  byteLength = byteLength | 0;
		  if (!noAssert) {
		    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
		    checkInt(this, value, offset, byteLength, maxBytes, 0);
		  }

		  var mul = 1;
		  var i = 0;
		  this[offset] = value & 0xFF;
		  while (++i < byteLength && (mul *= 0x100)) {
		    this[offset + i] = (value / mul) & 0xFF;
		  }

		  return offset + byteLength
		};

		Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
		  value = +value;
		  offset = offset | 0;
		  byteLength = byteLength | 0;
		  if (!noAssert) {
		    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
		    checkInt(this, value, offset, byteLength, maxBytes, 0);
		  }

		  var i = byteLength - 1;
		  var mul = 1;
		  this[offset + i] = value & 0xFF;
		  while (--i >= 0 && (mul *= 0x100)) {
		    this[offset + i] = (value / mul) & 0xFF;
		  }

		  return offset + byteLength
		};

		Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
		  value = +value;
		  offset = offset | 0;
		  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
		  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
		  this[offset] = (value & 0xff);
		  return offset + 1
		};

		function objectWriteUInt16 (buf, value, offset, littleEndian) {
		  if (value < 0) value = 0xffff + value + 1;
		  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
		    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
		      (littleEndian ? i : 1 - i) * 8;
		  }
		}

		Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
		  value = +value;
		  offset = offset | 0;
		  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset] = (value & 0xff);
		    this[offset + 1] = (value >>> 8);
		  } else {
		    objectWriteUInt16(this, value, offset, true);
		  }
		  return offset + 2
		};

		Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
		  value = +value;
		  offset = offset | 0;
		  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset] = (value >>> 8);
		    this[offset + 1] = (value & 0xff);
		  } else {
		    objectWriteUInt16(this, value, offset, false);
		  }
		  return offset + 2
		};

		function objectWriteUInt32 (buf, value, offset, littleEndian) {
		  if (value < 0) value = 0xffffffff + value + 1;
		  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
		    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
		  }
		}

		Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
		  value = +value;
		  offset = offset | 0;
		  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset + 3] = (value >>> 24);
		    this[offset + 2] = (value >>> 16);
		    this[offset + 1] = (value >>> 8);
		    this[offset] = (value & 0xff);
		  } else {
		    objectWriteUInt32(this, value, offset, true);
		  }
		  return offset + 4
		};

		Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
		  value = +value;
		  offset = offset | 0;
		  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset] = (value >>> 24);
		    this[offset + 1] = (value >>> 16);
		    this[offset + 2] = (value >>> 8);
		    this[offset + 3] = (value & 0xff);
		  } else {
		    objectWriteUInt32(this, value, offset, false);
		  }
		  return offset + 4
		};

		Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
		  value = +value;
		  offset = offset | 0;
		  if (!noAssert) {
		    var limit = Math.pow(2, 8 * byteLength - 1);

		    checkInt(this, value, offset, byteLength, limit - 1, -limit);
		  }

		  var i = 0;
		  var mul = 1;
		  var sub = 0;
		  this[offset] = value & 0xFF;
		  while (++i < byteLength && (mul *= 0x100)) {
		    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
		      sub = 1;
		    }
		    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
		  }

		  return offset + byteLength
		};

		Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
		  value = +value;
		  offset = offset | 0;
		  if (!noAssert) {
		    var limit = Math.pow(2, 8 * byteLength - 1);

		    checkInt(this, value, offset, byteLength, limit - 1, -limit);
		  }

		  var i = byteLength - 1;
		  var mul = 1;
		  var sub = 0;
		  this[offset + i] = value & 0xFF;
		  while (--i >= 0 && (mul *= 0x100)) {
		    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
		      sub = 1;
		    }
		    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
		  }

		  return offset + byteLength
		};

		Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
		  value = +value;
		  offset = offset | 0;
		  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
		  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
		  if (value < 0) value = 0xff + value + 1;
		  this[offset] = (value & 0xff);
		  return offset + 1
		};

		Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
		  value = +value;
		  offset = offset | 0;
		  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset] = (value & 0xff);
		    this[offset + 1] = (value >>> 8);
		  } else {
		    objectWriteUInt16(this, value, offset, true);
		  }
		  return offset + 2
		};

		Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
		  value = +value;
		  offset = offset | 0;
		  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset] = (value >>> 8);
		    this[offset + 1] = (value & 0xff);
		  } else {
		    objectWriteUInt16(this, value, offset, false);
		  }
		  return offset + 2
		};

		Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
		  value = +value;
		  offset = offset | 0;
		  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset] = (value & 0xff);
		    this[offset + 1] = (value >>> 8);
		    this[offset + 2] = (value >>> 16);
		    this[offset + 3] = (value >>> 24);
		  } else {
		    objectWriteUInt32(this, value, offset, true);
		  }
		  return offset + 4
		};

		Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
		  value = +value;
		  offset = offset | 0;
		  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
		  if (value < 0) value = 0xffffffff + value + 1;
		  if (Buffer.TYPED_ARRAY_SUPPORT) {
		    this[offset] = (value >>> 24);
		    this[offset + 1] = (value >>> 16);
		    this[offset + 2] = (value >>> 8);
		    this[offset + 3] = (value & 0xff);
		  } else {
		    objectWriteUInt32(this, value, offset, false);
		  }
		  return offset + 4
		};

		function checkIEEE754 (buf, value, offset, ext, max, min) {
		  if (offset + ext > buf.length) throw new RangeError('Index out of range')
		  if (offset < 0) throw new RangeError('Index out of range')
		}

		function writeFloat (buf, value, offset, littleEndian, noAssert) {
		  if (!noAssert) {
		    checkIEEE754(buf, value, offset, 4);
		  }
		  write(buf, value, offset, littleEndian, 23, 4);
		  return offset + 4
		}

		Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
		  return writeFloat(this, value, offset, true, noAssert)
		};

		Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
		  return writeFloat(this, value, offset, false, noAssert)
		};

		function writeDouble (buf, value, offset, littleEndian, noAssert) {
		  if (!noAssert) {
		    checkIEEE754(buf, value, offset, 8);
		  }
		  write(buf, value, offset, littleEndian, 52, 8);
		  return offset + 8
		}

		Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
		  return writeDouble(this, value, offset, true, noAssert)
		};

		Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
		  return writeDouble(this, value, offset, false, noAssert)
		};

		// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
		Buffer.prototype.copy = function copy (target, targetStart, start, end) {
		  if (!start) start = 0;
		  if (!end && end !== 0) end = this.length;
		  if (targetStart >= target.length) targetStart = target.length;
		  if (!targetStart) targetStart = 0;
		  if (end > 0 && end < start) end = start;

		  // Copy 0 bytes; we're done
		  if (end === start) return 0
		  if (target.length === 0 || this.length === 0) return 0

		  // Fatal error conditions
		  if (targetStart < 0) {
		    throw new RangeError('targetStart out of bounds')
		  }
		  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
		  if (end < 0) throw new RangeError('sourceEnd out of bounds')

		  // Are we oob?
		  if (end > this.length) end = this.length;
		  if (target.length - targetStart < end - start) {
		    end = target.length - targetStart + start;
		  }

		  var len = end - start;
		  var i;

		  if (this === target && start < targetStart && targetStart < end) {
		    // descending copy from end
		    for (i = len - 1; i >= 0; --i) {
		      target[i + targetStart] = this[i + start];
		    }
		  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
		    // ascending copy from start
		    for (i = 0; i < len; ++i) {
		      target[i + targetStart] = this[i + start];
		    }
		  } else {
		    Uint8Array.prototype.set.call(
		      target,
		      this.subarray(start, start + len),
		      targetStart
		    );
		  }

		  return len
		};

		// Usage:
		//    buffer.fill(number[, offset[, end]])
		//    buffer.fill(buffer[, offset[, end]])
		//    buffer.fill(string[, offset[, end]][, encoding])
		Buffer.prototype.fill = function fill (val, start, end, encoding) {
		  // Handle string cases:
		  if (typeof val === 'string') {
		    if (typeof start === 'string') {
		      encoding = start;
		      start = 0;
		      end = this.length;
		    } else if (typeof end === 'string') {
		      encoding = end;
		      end = this.length;
		    }
		    if (val.length === 1) {
		      var code = val.charCodeAt(0);
		      if (code < 256) {
		        val = code;
		      }
		    }
		    if (encoding !== undefined && typeof encoding !== 'string') {
		      throw new TypeError('encoding must be a string')
		    }
		    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
		      throw new TypeError('Unknown encoding: ' + encoding)
		    }
		  } else if (typeof val === 'number') {
		    val = val & 255;
		  }

		  // Invalid ranges are not set to a default, so can range check early.
		  if (start < 0 || this.length < start || this.length < end) {
		    throw new RangeError('Out of range index')
		  }

		  if (end <= start) {
		    return this
		  }

		  start = start >>> 0;
		  end = end === undefined ? this.length : end >>> 0;

		  if (!val) val = 0;

		  var i;
		  if (typeof val === 'number') {
		    for (i = start; i < end; ++i) {
		      this[i] = val;
		    }
		  } else {
		    var bytes = internalIsBuffer(val)
		      ? val
		      : utf8ToBytes(new Buffer(val, encoding).toString());
		    var len = bytes.length;
		    for (i = 0; i < end - start; ++i) {
		      this[i + start] = bytes[i % len];
		    }
		  }

		  return this
		};

		// HELPER FUNCTIONS
		// ================

		var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

		function base64clean (str) {
		  // Node strips out invalid characters like \n and \t from the string, base64-js does not
		  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
		  // Node converts strings with length < 2 to ''
		  if (str.length < 2) return ''
		  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
		  while (str.length % 4 !== 0) {
		    str = str + '=';
		  }
		  return str
		}

		function stringtrim (str) {
		  if (str.trim) return str.trim()
		  return str.replace(/^\s+|\s+$/g, '')
		}

		function toHex (n) {
		  if (n < 16) return '0' + n.toString(16)
		  return n.toString(16)
		}

		function utf8ToBytes (string, units) {
		  units = units || Infinity;
		  var codePoint;
		  var length = string.length;
		  var leadSurrogate = null;
		  var bytes = [];

		  for (var i = 0; i < length; ++i) {
		    codePoint = string.charCodeAt(i);

		    // is surrogate component
		    if (codePoint > 0xD7FF && codePoint < 0xE000) {
		      // last char was a lead
		      if (!leadSurrogate) {
		        // no lead yet
		        if (codePoint > 0xDBFF) {
		          // unexpected trail
		          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
		          continue
		        } else if (i + 1 === length) {
		          // unpaired lead
		          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
		          continue
		        }

		        // valid lead
		        leadSurrogate = codePoint;

		        continue
		      }

		      // 2 leads in a row
		      if (codePoint < 0xDC00) {
		        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
		        leadSurrogate = codePoint;
		        continue
		      }

		      // valid surrogate pair
		      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
		    } else if (leadSurrogate) {
		      // valid bmp char, but last char was a lead
		      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
		    }

		    leadSurrogate = null;

		    // encode utf8
		    if (codePoint < 0x80) {
		      if ((units -= 1) < 0) break
		      bytes.push(codePoint);
		    } else if (codePoint < 0x800) {
		      if ((units -= 2) < 0) break
		      bytes.push(
		        codePoint >> 0x6 | 0xC0,
		        codePoint & 0x3F | 0x80
		      );
		    } else if (codePoint < 0x10000) {
		      if ((units -= 3) < 0) break
		      bytes.push(
		        codePoint >> 0xC | 0xE0,
		        codePoint >> 0x6 & 0x3F | 0x80,
		        codePoint & 0x3F | 0x80
		      );
		    } else if (codePoint < 0x110000) {
		      if ((units -= 4) < 0) break
		      bytes.push(
		        codePoint >> 0x12 | 0xF0,
		        codePoint >> 0xC & 0x3F | 0x80,
		        codePoint >> 0x6 & 0x3F | 0x80,
		        codePoint & 0x3F | 0x80
		      );
		    } else {
		      throw new Error('Invalid code point')
		    }
		  }

		  return bytes
		}

		function asciiToBytes (str) {
		  var byteArray = [];
		  for (var i = 0; i < str.length; ++i) {
		    // Node's code seems to be doing this and not & 0x7F..
		    byteArray.push(str.charCodeAt(i) & 0xFF);
		  }
		  return byteArray
		}

		function utf16leToBytes (str, units) {
		  var c, hi, lo;
		  var byteArray = [];
		  for (var i = 0; i < str.length; ++i) {
		    if ((units -= 2) < 0) break

		    c = str.charCodeAt(i);
		    hi = c >> 8;
		    lo = c % 256;
		    byteArray.push(lo);
		    byteArray.push(hi);
		  }

		  return byteArray
		}


		function base64ToBytes (str) {
		  return toByteArray(base64clean(str))
		}

		function blitBuffer (src, dst, offset, length) {
		  for (var i = 0; i < length; ++i) {
		    if ((i + offset >= dst.length) || (i >= src.length)) break
		    dst[i + offset] = src[i];
		  }
		  return i
		}

		function isnan (val) {
		  return val !== val // eslint-disable-line no-self-compare
		}


		// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
		// The _isBuffer check is for Safari 5-7 support, because it's missing
		// Object.prototype.constructor. Remove this eventually
		function isBuffer(obj) {
		  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
		}

		function isFastBuffer (obj) {
		  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
		}

		// For Node v0.10 support. Remove this eventually.
		function isSlowBuffer (obj) {
		  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
		}

		var bufferEs6 = /*#__PURE__*/Object.freeze({
			__proto__: null,
			INSPECT_MAX_BYTES: INSPECT_MAX_BYTES,
			kMaxLength: _kMaxLength,
			Buffer: Buffer,
			SlowBuffer: SlowBuffer,
			isBuffer: isBuffer
		});

		var clientError = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.ClientError = void 0;
		/**
		 * Class to handle http errors.
		 */
		class ClientError extends Error {
		    /**
		     * Create a new instance of ClientError.
		     * @param message The message for the error.
		     * @param route The route the request was made to.
		     * @param httpStatus The http status code.
		     * @param code The code in the payload.
		     */
		    constructor(message, route, httpStatus, code) {
		        super(message);
		        this.route = route;
		        this.httpStatus = httpStatus;
		        this.code = code;
		    }
		}
		exports.ClientError = ClientError;

		});

		var IAddress = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IAddressOutputs = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IChildren = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IClient = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IInfo = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IMessageId = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IMessageMetadata = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IMessages = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IMilestone = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IOutput = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IResponse = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var ITips = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var browserPonyfill = createCommonjsModule(function (module, exports) {
		var __self__ = (function (root) {
		function F() {
		this.fetch = false;
		this.DOMException = root.DOMException;
		}
		F.prototype = root;
		return new F();
		})(typeof self !== 'undefined' ? self : commonjsGlobal$1);
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
		})(__self__);
		delete __self__.fetch.polyfill;
		exports = __self__.fetch; // To enable: import fetch from 'cross-fetch'
		exports.default = __self__.fetch; // For TypeScript consumers without esModuleInterop.
		exports.fetch = __self__.fetch; // To enable: import {fetch} from 'cross-fetch'
		exports.Headers = __self__.Headers;
		exports.Request = __self__.Request;
		exports.Response = __self__.Response;
		module.exports = exports;
		});

		var singleNodeClient = createCommonjsModule(function (module, exports) {
		var __awaiter = (commonjsGlobal$1 && commonjsGlobal$1.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		var __importDefault = (commonjsGlobal$1 && commonjsGlobal$1.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.SingleNodeClient = void 0;
		const cross_fetch_1 = __importDefault(browserPonyfill);

		/**
		 * Client for API communication.
		 */
		class SingleNodeClient {
		    /**
		     * Create a new instance of client.
		     * @param endpoint The endpoint.
		     */
		    constructor(endpoint) {
		        if (!/^https?:\/\/\w+(\.\w+)*(:\d+)?(\/.*)?$/.test(endpoint)) {
		            throw new Error("The endpoint is not in the correct format");
		        }
		        this._endpoint = endpoint.replace(/\/+$/, "");
		    }
		    /**
		     * Get the health of the node.
		     * @returns True if the node is healthy.
		     */
		    health() {
		        return __awaiter(this, void 0, void 0, function* () {
		            const status = yield this.fetchStatus("/health");
		            if (status === 200) {
		                return true;
		            }
		            else if (status === 503) {
		                return false;
		            }
		            throw new clientError.ClientError("Unexpected response code", "/health", status);
		        });
		    }
		    /**
		     * Get the info about the node.
		     * @returns The node information.
		     */
		    info() {
		        return __awaiter(this, void 0, void 0, function* () {
		            return this.fetchJson("get", "/api/v1/info");
		        });
		    }
		    /**
		     * Get the tips from the node.
		     * @returns The tips.
		     */
		    tips() {
		        return __awaiter(this, void 0, void 0, function* () {
		            return this.fetchJson("get", "/api/v1/tips");
		        });
		    }
		    /**
		     * Get the message data by id.
		     * @param messageId The message to get the data for.
		     * @returns The message data.
		     */
		    message(messageId) {
		        return __awaiter(this, void 0, void 0, function* () {
		            return this.fetchJson("get", `/api/v1/messages/${messageId}`);
		        });
		    }
		    /**
		     * Get the message metadata by id.
		     * @param messageId The message to get the metadata for.
		     * @returns The message metadata.
		     */
		    messageMetadata(messageId) {
		        return __awaiter(this, void 0, void 0, function* () {
		            return this.fetchJson("get", `/api/v1/messages/${messageId}/metadata`);
		        });
		    }
		    /**
		     * Get the message raw data by id.
		     * @param messageId The message to get the data for.
		     * @returns The message raw data.
		     */
		    messageRaw(messageId) {
		        return __awaiter(this, void 0, void 0, function* () {
		            return this.fetchBinary("get", `/api/v1/messages/${messageId}/raw`);
		        });
		    }
		    /**
		     * Submit message.
		     * @param message The message to submit.
		     * @returns The messageId.
		     */
		    messageSubmit(message) {
		        return __awaiter(this, void 0, void 0, function* () {
		            const response = yield this.fetchJson("post", "/api/v1/messages", message);
		            return response.messageId;
		        });
		    }
		    /**
		     * Submit message in raw format.
		     * @param message The message to submit.
		     * @returns The messageId.
		     */
		    messageSubmitRaw(message) {
		        return __awaiter(this, void 0, void 0, function* () {
		            const response = yield this.fetchBinary("post", "/api/v1/messages", message);
		            return response.messageId;
		        });
		    }
		    /**
		     * Find messages by index.
		     * @param index The index value.
		     * @returns The messageId.
		     */
		    messagesFind(index) {
		        return __awaiter(this, void 0, void 0, function* () {
		            return this.fetchJson("get", `/api/v1/messages?index=${encodeURIComponent(index)}`);
		        });
		    }
		    /**
		     * Get the children of a message.
		     * @param messageId The id of the message to get the children for.
		     * @returns The messages children.
		     */
		    messageChildren(messageId) {
		        return __awaiter(this, void 0, void 0, function* () {
		            return this.fetchJson("get", `/api/v1/messages/${messageId}/children`);
		        });
		    }
		    /**
		     * Find an output by its identifier.
		     * @param outputId The id of the output to get.
		     * @returns The output details.
		     */
		    output(outputId) {
		        return __awaiter(this, void 0, void 0, function* () {
		            return this.fetchJson("get", `/api/v1/outputs/${outputId}`);
		        });
		    }
		    /**
		     * Get the address details.
		     * @param address The address to get the details for.
		     * @returns The address details.
		     */
		    address(address) {
		        return __awaiter(this, void 0, void 0, function* () {
		            return this.fetchJson("get", `/api/v1/addresses/${address}`);
		        });
		    }
		    /**
		     * Get the address outputs.
		     * @param address The address to get the outputs for.
		     * @returns The address outputs.
		     */
		    addressOutputs(address) {
		        return __awaiter(this, void 0, void 0, function* () {
		            return this.fetchJson("get", `/api/v1/addresses/${address}/outputs`);
		        });
		    }
		    /**
		     * Get the requested milestone.
		     * @param index The index of the milestone to get.
		     * @returns The milestone details.
		     */
		    milestone(index) {
		        return __awaiter(this, void 0, void 0, function* () {
		            return this.fetchJson("get", `/api/v1/milestones/${index}`);
		        });
		    }
		    /**
		     * Perform a request and just return the status.
		     * @param route The route of the request.
		     * @returns The response.
		     * @private
		     */
		    fetchStatus(route) {
		        return __awaiter(this, void 0, void 0, function* () {
		            const response = yield cross_fetch_1.default(`${this._endpoint}${route}`, {
		                method: "get"
		            });
		            return response.status;
		        });
		    }
		    /**
		     * Perform a request in json format.
		     * @param method The http method.
		     * @param route The route of the request.
		     * @param requestData Request to send to the endpoint.
		     * @returns The response.
		     * @private
		     */
		    fetchJson(method, route, requestData) {
		        var _a, _b, _c;
		        return __awaiter(this, void 0, void 0, function* () {
		            const response = yield cross_fetch_1.default(`${this._endpoint}${route}`, {
		                method,
		                headers: {
		                    "Content-Type": "application/json"
		                },
		                body: requestData ? JSON.stringify(requestData) : undefined
		            });
		            const responseData = yield response.json();
		            if (response.ok && !responseData.error) {
		                return responseData.data;
		            }
		            throw new clientError.ClientError((_b = (_a = responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData.error) === null || _c === void 0 ? void 0 : _c.code);
		        });
		    }
		    /**
		     * Perform a request for binary data.
		     * @param method The http method.
		     * @param route The route of the request.
		     * @param requestData Request to send to the endpoint.
		     * @returns The response.
		     * @private
		     */
		    fetchBinary(method, route, requestData) {
		        var _a, _b, _c;
		        return __awaiter(this, void 0, void 0, function* () {
		            const response = yield cross_fetch_1.default(`${this._endpoint}${route}`, {
		                method,
		                headers: {
		                    "Content-Type": "application/octet-stream"
		                },
		                body: requestData
		            });
		            let responseData;
		            if (response.ok) {
		                if (method === "get") {
		                    return Buffer.from(yield response.arrayBuffer());
		                }
		                responseData = yield response.json();
		                if (!(responseData === null || responseData === void 0 ? void 0 : responseData.error)) {
		                    return responseData === null || responseData === void 0 ? void 0 : responseData.data;
		                }
		            }
		            if (!responseData) {
		                responseData = yield response.json();
		            }
		            throw new clientError.ClientError((_b = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _c === void 0 ? void 0 : _c.code);
		        });
		    }
		}
		exports.SingleNodeClient = SingleNodeClient;

		});

		var _nodeResolve_empty = {};

		var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
			__proto__: null,
			'default': _nodeResolve_empty
		});

		var debugUtil = /*@__PURE__*/getAugmentedNamespace(_nodeResolve_empty$1);

		var naclFast = createCommonjsModule(function (module) {
		(function(nacl) {

		// Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
		// Public domain.
		//
		// Implementation derived from TweetNaCl version 20140427.
		// See for details: http://tweetnacl.cr.yp.to/

		var gf = function(init) {
		  var i, r = new Float64Array(16);
		  if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
		  return r;
		};

		//  Pluggable, initialized in high-level API below.
		var randombytes = function(/* x, n */) { throw new Error('no PRNG'); };

		var _0 = new Uint8Array(16);
		var _9 = new Uint8Array(32); _9[0] = 9;

		var gf0 = gf(),
		    gf1 = gf([1]),
		    _121665 = gf([0xdb41, 1]),
		    D = gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079, 0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]),
		    D2 = gf([0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0, 0xd130, 0xeef3, 0x80f2, 0x198e, 0xfce7, 0x56df, 0xd9dc, 0x2406]),
		    X = gf([0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c, 0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e, 0x36d3, 0x2169]),
		    Y = gf([0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666]),
		    I = gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);

		function ts64(x, i, h, l) {
		  x[i]   = (h >> 24) & 0xff;
		  x[i+1] = (h >> 16) & 0xff;
		  x[i+2] = (h >>  8) & 0xff;
		  x[i+3] = h & 0xff;
		  x[i+4] = (l >> 24)  & 0xff;
		  x[i+5] = (l >> 16)  & 0xff;
		  x[i+6] = (l >>  8)  & 0xff;
		  x[i+7] = l & 0xff;
		}

		function vn(x, xi, y, yi, n) {
		  var i,d = 0;
		  for (i = 0; i < n; i++) d |= x[xi+i]^y[yi+i];
		  return (1 & ((d - 1) >>> 8)) - 1;
		}

		function crypto_verify_16(x, xi, y, yi) {
		  return vn(x,xi,y,yi,16);
		}

		function crypto_verify_32(x, xi, y, yi) {
		  return vn(x,xi,y,yi,32);
		}

		function core_salsa20(o, p, k, c) {
		  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
		      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
		      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
		      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
		      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
		      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
		      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
		      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
		      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
		      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
		      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
		      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
		      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
		      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
		      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
		      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

		  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
		      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
		      x15 = j15, u;

		  for (var i = 0; i < 20; i += 2) {
		    u = x0 + x12 | 0;
		    x4 ^= u<<7 | u>>>(32-7);
		    u = x4 + x0 | 0;
		    x8 ^= u<<9 | u>>>(32-9);
		    u = x8 + x4 | 0;
		    x12 ^= u<<13 | u>>>(32-13);
		    u = x12 + x8 | 0;
		    x0 ^= u<<18 | u>>>(32-18);

		    u = x5 + x1 | 0;
		    x9 ^= u<<7 | u>>>(32-7);
		    u = x9 + x5 | 0;
		    x13 ^= u<<9 | u>>>(32-9);
		    u = x13 + x9 | 0;
		    x1 ^= u<<13 | u>>>(32-13);
		    u = x1 + x13 | 0;
		    x5 ^= u<<18 | u>>>(32-18);

		    u = x10 + x6 | 0;
		    x14 ^= u<<7 | u>>>(32-7);
		    u = x14 + x10 | 0;
		    x2 ^= u<<9 | u>>>(32-9);
		    u = x2 + x14 | 0;
		    x6 ^= u<<13 | u>>>(32-13);
		    u = x6 + x2 | 0;
		    x10 ^= u<<18 | u>>>(32-18);

		    u = x15 + x11 | 0;
		    x3 ^= u<<7 | u>>>(32-7);
		    u = x3 + x15 | 0;
		    x7 ^= u<<9 | u>>>(32-9);
		    u = x7 + x3 | 0;
		    x11 ^= u<<13 | u>>>(32-13);
		    u = x11 + x7 | 0;
		    x15 ^= u<<18 | u>>>(32-18);

		    u = x0 + x3 | 0;
		    x1 ^= u<<7 | u>>>(32-7);
		    u = x1 + x0 | 0;
		    x2 ^= u<<9 | u>>>(32-9);
		    u = x2 + x1 | 0;
		    x3 ^= u<<13 | u>>>(32-13);
		    u = x3 + x2 | 0;
		    x0 ^= u<<18 | u>>>(32-18);

		    u = x5 + x4 | 0;
		    x6 ^= u<<7 | u>>>(32-7);
		    u = x6 + x5 | 0;
		    x7 ^= u<<9 | u>>>(32-9);
		    u = x7 + x6 | 0;
		    x4 ^= u<<13 | u>>>(32-13);
		    u = x4 + x7 | 0;
		    x5 ^= u<<18 | u>>>(32-18);

		    u = x10 + x9 | 0;
		    x11 ^= u<<7 | u>>>(32-7);
		    u = x11 + x10 | 0;
		    x8 ^= u<<9 | u>>>(32-9);
		    u = x8 + x11 | 0;
		    x9 ^= u<<13 | u>>>(32-13);
		    u = x9 + x8 | 0;
		    x10 ^= u<<18 | u>>>(32-18);

		    u = x15 + x14 | 0;
		    x12 ^= u<<7 | u>>>(32-7);
		    u = x12 + x15 | 0;
		    x13 ^= u<<9 | u>>>(32-9);
		    u = x13 + x12 | 0;
		    x14 ^= u<<13 | u>>>(32-13);
		    u = x14 + x13 | 0;
		    x15 ^= u<<18 | u>>>(32-18);
		  }
		   x0 =  x0 +  j0 | 0;
		   x1 =  x1 +  j1 | 0;
		   x2 =  x2 +  j2 | 0;
		   x3 =  x3 +  j3 | 0;
		   x4 =  x4 +  j4 | 0;
		   x5 =  x5 +  j5 | 0;
		   x6 =  x6 +  j6 | 0;
		   x7 =  x7 +  j7 | 0;
		   x8 =  x8 +  j8 | 0;
		   x9 =  x9 +  j9 | 0;
		  x10 = x10 + j10 | 0;
		  x11 = x11 + j11 | 0;
		  x12 = x12 + j12 | 0;
		  x13 = x13 + j13 | 0;
		  x14 = x14 + j14 | 0;
		  x15 = x15 + j15 | 0;

		  o[ 0] = x0 >>>  0 & 0xff;
		  o[ 1] = x0 >>>  8 & 0xff;
		  o[ 2] = x0 >>> 16 & 0xff;
		  o[ 3] = x0 >>> 24 & 0xff;

		  o[ 4] = x1 >>>  0 & 0xff;
		  o[ 5] = x1 >>>  8 & 0xff;
		  o[ 6] = x1 >>> 16 & 0xff;
		  o[ 7] = x1 >>> 24 & 0xff;

		  o[ 8] = x2 >>>  0 & 0xff;
		  o[ 9] = x2 >>>  8 & 0xff;
		  o[10] = x2 >>> 16 & 0xff;
		  o[11] = x2 >>> 24 & 0xff;

		  o[12] = x3 >>>  0 & 0xff;
		  o[13] = x3 >>>  8 & 0xff;
		  o[14] = x3 >>> 16 & 0xff;
		  o[15] = x3 >>> 24 & 0xff;

		  o[16] = x4 >>>  0 & 0xff;
		  o[17] = x4 >>>  8 & 0xff;
		  o[18] = x4 >>> 16 & 0xff;
		  o[19] = x4 >>> 24 & 0xff;

		  o[20] = x5 >>>  0 & 0xff;
		  o[21] = x5 >>>  8 & 0xff;
		  o[22] = x5 >>> 16 & 0xff;
		  o[23] = x5 >>> 24 & 0xff;

		  o[24] = x6 >>>  0 & 0xff;
		  o[25] = x6 >>>  8 & 0xff;
		  o[26] = x6 >>> 16 & 0xff;
		  o[27] = x6 >>> 24 & 0xff;

		  o[28] = x7 >>>  0 & 0xff;
		  o[29] = x7 >>>  8 & 0xff;
		  o[30] = x7 >>> 16 & 0xff;
		  o[31] = x7 >>> 24 & 0xff;

		  o[32] = x8 >>>  0 & 0xff;
		  o[33] = x8 >>>  8 & 0xff;
		  o[34] = x8 >>> 16 & 0xff;
		  o[35] = x8 >>> 24 & 0xff;

		  o[36] = x9 >>>  0 & 0xff;
		  o[37] = x9 >>>  8 & 0xff;
		  o[38] = x9 >>> 16 & 0xff;
		  o[39] = x9 >>> 24 & 0xff;

		  o[40] = x10 >>>  0 & 0xff;
		  o[41] = x10 >>>  8 & 0xff;
		  o[42] = x10 >>> 16 & 0xff;
		  o[43] = x10 >>> 24 & 0xff;

		  o[44] = x11 >>>  0 & 0xff;
		  o[45] = x11 >>>  8 & 0xff;
		  o[46] = x11 >>> 16 & 0xff;
		  o[47] = x11 >>> 24 & 0xff;

		  o[48] = x12 >>>  0 & 0xff;
		  o[49] = x12 >>>  8 & 0xff;
		  o[50] = x12 >>> 16 & 0xff;
		  o[51] = x12 >>> 24 & 0xff;

		  o[52] = x13 >>>  0 & 0xff;
		  o[53] = x13 >>>  8 & 0xff;
		  o[54] = x13 >>> 16 & 0xff;
		  o[55] = x13 >>> 24 & 0xff;

		  o[56] = x14 >>>  0 & 0xff;
		  o[57] = x14 >>>  8 & 0xff;
		  o[58] = x14 >>> 16 & 0xff;
		  o[59] = x14 >>> 24 & 0xff;

		  o[60] = x15 >>>  0 & 0xff;
		  o[61] = x15 >>>  8 & 0xff;
		  o[62] = x15 >>> 16 & 0xff;
		  o[63] = x15 >>> 24 & 0xff;
		}

		function core_hsalsa20(o,p,k,c) {
		  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
		      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
		      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
		      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
		      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
		      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
		      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
		      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
		      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
		      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
		      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
		      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
		      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
		      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
		      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
		      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

		  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
		      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
		      x15 = j15, u;

		  for (var i = 0; i < 20; i += 2) {
		    u = x0 + x12 | 0;
		    x4 ^= u<<7 | u>>>(32-7);
		    u = x4 + x0 | 0;
		    x8 ^= u<<9 | u>>>(32-9);
		    u = x8 + x4 | 0;
		    x12 ^= u<<13 | u>>>(32-13);
		    u = x12 + x8 | 0;
		    x0 ^= u<<18 | u>>>(32-18);

		    u = x5 + x1 | 0;
		    x9 ^= u<<7 | u>>>(32-7);
		    u = x9 + x5 | 0;
		    x13 ^= u<<9 | u>>>(32-9);
		    u = x13 + x9 | 0;
		    x1 ^= u<<13 | u>>>(32-13);
		    u = x1 + x13 | 0;
		    x5 ^= u<<18 | u>>>(32-18);

		    u = x10 + x6 | 0;
		    x14 ^= u<<7 | u>>>(32-7);
		    u = x14 + x10 | 0;
		    x2 ^= u<<9 | u>>>(32-9);
		    u = x2 + x14 | 0;
		    x6 ^= u<<13 | u>>>(32-13);
		    u = x6 + x2 | 0;
		    x10 ^= u<<18 | u>>>(32-18);

		    u = x15 + x11 | 0;
		    x3 ^= u<<7 | u>>>(32-7);
		    u = x3 + x15 | 0;
		    x7 ^= u<<9 | u>>>(32-9);
		    u = x7 + x3 | 0;
		    x11 ^= u<<13 | u>>>(32-13);
		    u = x11 + x7 | 0;
		    x15 ^= u<<18 | u>>>(32-18);

		    u = x0 + x3 | 0;
		    x1 ^= u<<7 | u>>>(32-7);
		    u = x1 + x0 | 0;
		    x2 ^= u<<9 | u>>>(32-9);
		    u = x2 + x1 | 0;
		    x3 ^= u<<13 | u>>>(32-13);
		    u = x3 + x2 | 0;
		    x0 ^= u<<18 | u>>>(32-18);

		    u = x5 + x4 | 0;
		    x6 ^= u<<7 | u>>>(32-7);
		    u = x6 + x5 | 0;
		    x7 ^= u<<9 | u>>>(32-9);
		    u = x7 + x6 | 0;
		    x4 ^= u<<13 | u>>>(32-13);
		    u = x4 + x7 | 0;
		    x5 ^= u<<18 | u>>>(32-18);

		    u = x10 + x9 | 0;
		    x11 ^= u<<7 | u>>>(32-7);
		    u = x11 + x10 | 0;
		    x8 ^= u<<9 | u>>>(32-9);
		    u = x8 + x11 | 0;
		    x9 ^= u<<13 | u>>>(32-13);
		    u = x9 + x8 | 0;
		    x10 ^= u<<18 | u>>>(32-18);

		    u = x15 + x14 | 0;
		    x12 ^= u<<7 | u>>>(32-7);
		    u = x12 + x15 | 0;
		    x13 ^= u<<9 | u>>>(32-9);
		    u = x13 + x12 | 0;
		    x14 ^= u<<13 | u>>>(32-13);
		    u = x14 + x13 | 0;
		    x15 ^= u<<18 | u>>>(32-18);
		  }

		  o[ 0] = x0 >>>  0 & 0xff;
		  o[ 1] = x0 >>>  8 & 0xff;
		  o[ 2] = x0 >>> 16 & 0xff;
		  o[ 3] = x0 >>> 24 & 0xff;

		  o[ 4] = x5 >>>  0 & 0xff;
		  o[ 5] = x5 >>>  8 & 0xff;
		  o[ 6] = x5 >>> 16 & 0xff;
		  o[ 7] = x5 >>> 24 & 0xff;

		  o[ 8] = x10 >>>  0 & 0xff;
		  o[ 9] = x10 >>>  8 & 0xff;
		  o[10] = x10 >>> 16 & 0xff;
		  o[11] = x10 >>> 24 & 0xff;

		  o[12] = x15 >>>  0 & 0xff;
		  o[13] = x15 >>>  8 & 0xff;
		  o[14] = x15 >>> 16 & 0xff;
		  o[15] = x15 >>> 24 & 0xff;

		  o[16] = x6 >>>  0 & 0xff;
		  o[17] = x6 >>>  8 & 0xff;
		  o[18] = x6 >>> 16 & 0xff;
		  o[19] = x6 >>> 24 & 0xff;

		  o[20] = x7 >>>  0 & 0xff;
		  o[21] = x7 >>>  8 & 0xff;
		  o[22] = x7 >>> 16 & 0xff;
		  o[23] = x7 >>> 24 & 0xff;

		  o[24] = x8 >>>  0 & 0xff;
		  o[25] = x8 >>>  8 & 0xff;
		  o[26] = x8 >>> 16 & 0xff;
		  o[27] = x8 >>> 24 & 0xff;

		  o[28] = x9 >>>  0 & 0xff;
		  o[29] = x9 >>>  8 & 0xff;
		  o[30] = x9 >>> 16 & 0xff;
		  o[31] = x9 >>> 24 & 0xff;
		}

		function crypto_core_salsa20(out,inp,k,c) {
		  core_salsa20(out,inp,k,c);
		}

		function crypto_core_hsalsa20(out,inp,k,c) {
		  core_hsalsa20(out,inp,k,c);
		}

		var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
		            // "expand 32-byte k"

		function crypto_stream_salsa20_xor(c,cpos,m,mpos,b,n,k) {
		  var z = new Uint8Array(16), x = new Uint8Array(64);
		  var u, i;
		  for (i = 0; i < 16; i++) z[i] = 0;
		  for (i = 0; i < 8; i++) z[i] = n[i];
		  while (b >= 64) {
		    crypto_core_salsa20(x,z,k,sigma);
		    for (i = 0; i < 64; i++) c[cpos+i] = m[mpos+i] ^ x[i];
		    u = 1;
		    for (i = 8; i < 16; i++) {
		      u = u + (z[i] & 0xff) | 0;
		      z[i] = u & 0xff;
		      u >>>= 8;
		    }
		    b -= 64;
		    cpos += 64;
		    mpos += 64;
		  }
		  if (b > 0) {
		    crypto_core_salsa20(x,z,k,sigma);
		    for (i = 0; i < b; i++) c[cpos+i] = m[mpos+i] ^ x[i];
		  }
		  return 0;
		}

		function crypto_stream_salsa20(c,cpos,b,n,k) {
		  var z = new Uint8Array(16), x = new Uint8Array(64);
		  var u, i;
		  for (i = 0; i < 16; i++) z[i] = 0;
		  for (i = 0; i < 8; i++) z[i] = n[i];
		  while (b >= 64) {
		    crypto_core_salsa20(x,z,k,sigma);
		    for (i = 0; i < 64; i++) c[cpos+i] = x[i];
		    u = 1;
		    for (i = 8; i < 16; i++) {
		      u = u + (z[i] & 0xff) | 0;
		      z[i] = u & 0xff;
		      u >>>= 8;
		    }
		    b -= 64;
		    cpos += 64;
		  }
		  if (b > 0) {
		    crypto_core_salsa20(x,z,k,sigma);
		    for (i = 0; i < b; i++) c[cpos+i] = x[i];
		  }
		  return 0;
		}

		function crypto_stream(c,cpos,d,n,k) {
		  var s = new Uint8Array(32);
		  crypto_core_hsalsa20(s,n,k,sigma);
		  var sn = new Uint8Array(8);
		  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
		  return crypto_stream_salsa20(c,cpos,d,sn,s);
		}

		function crypto_stream_xor(c,cpos,m,mpos,d,n,k) {
		  var s = new Uint8Array(32);
		  crypto_core_hsalsa20(s,n,k,sigma);
		  var sn = new Uint8Array(8);
		  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
		  return crypto_stream_salsa20_xor(c,cpos,m,mpos,d,sn,s);
		}

		/*
		* Port of Andrew Moon's Poly1305-donna-16. Public domain.
		* https://github.com/floodyberry/poly1305-donna
		*/

		var poly1305 = function(key) {
		  this.buffer = new Uint8Array(16);
		  this.r = new Uint16Array(10);
		  this.h = new Uint16Array(10);
		  this.pad = new Uint16Array(8);
		  this.leftover = 0;
		  this.fin = 0;

		  var t0, t1, t2, t3, t4, t5, t6, t7;

		  t0 = key[ 0] & 0xff | (key[ 1] & 0xff) << 8; this.r[0] = ( t0                     ) & 0x1fff;
		  t1 = key[ 2] & 0xff | (key[ 3] & 0xff) << 8; this.r[1] = ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
		  t2 = key[ 4] & 0xff | (key[ 5] & 0xff) << 8; this.r[2] = ((t1 >>> 10) | (t2 <<  6)) & 0x1f03;
		  t3 = key[ 6] & 0xff | (key[ 7] & 0xff) << 8; this.r[3] = ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
		  t4 = key[ 8] & 0xff | (key[ 9] & 0xff) << 8; this.r[4] = ((t3 >>>  4) | (t4 << 12)) & 0x00ff;
		  this.r[5] = ((t4 >>>  1)) & 0x1ffe;
		  t5 = key[10] & 0xff | (key[11] & 0xff) << 8; this.r[6] = ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
		  t6 = key[12] & 0xff | (key[13] & 0xff) << 8; this.r[7] = ((t5 >>> 11) | (t6 <<  5)) & 0x1f81;
		  t7 = key[14] & 0xff | (key[15] & 0xff) << 8; this.r[8] = ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
		  this.r[9] = ((t7 >>>  5)) & 0x007f;

		  this.pad[0] = key[16] & 0xff | (key[17] & 0xff) << 8;
		  this.pad[1] = key[18] & 0xff | (key[19] & 0xff) << 8;
		  this.pad[2] = key[20] & 0xff | (key[21] & 0xff) << 8;
		  this.pad[3] = key[22] & 0xff | (key[23] & 0xff) << 8;
		  this.pad[4] = key[24] & 0xff | (key[25] & 0xff) << 8;
		  this.pad[5] = key[26] & 0xff | (key[27] & 0xff) << 8;
		  this.pad[6] = key[28] & 0xff | (key[29] & 0xff) << 8;
		  this.pad[7] = key[30] & 0xff | (key[31] & 0xff) << 8;
		};

		poly1305.prototype.blocks = function(m, mpos, bytes) {
		  var hibit = this.fin ? 0 : (1 << 11);
		  var t0, t1, t2, t3, t4, t5, t6, t7, c;
		  var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;

		  var h0 = this.h[0],
		      h1 = this.h[1],
		      h2 = this.h[2],
		      h3 = this.h[3],
		      h4 = this.h[4],
		      h5 = this.h[5],
		      h6 = this.h[6],
		      h7 = this.h[7],
		      h8 = this.h[8],
		      h9 = this.h[9];

		  var r0 = this.r[0],
		      r1 = this.r[1],
		      r2 = this.r[2],
		      r3 = this.r[3],
		      r4 = this.r[4],
		      r5 = this.r[5],
		      r6 = this.r[6],
		      r7 = this.r[7],
		      r8 = this.r[8],
		      r9 = this.r[9];

		  while (bytes >= 16) {
		    t0 = m[mpos+ 0] & 0xff | (m[mpos+ 1] & 0xff) << 8; h0 += ( t0                     ) & 0x1fff;
		    t1 = m[mpos+ 2] & 0xff | (m[mpos+ 3] & 0xff) << 8; h1 += ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
		    t2 = m[mpos+ 4] & 0xff | (m[mpos+ 5] & 0xff) << 8; h2 += ((t1 >>> 10) | (t2 <<  6)) & 0x1fff;
		    t3 = m[mpos+ 6] & 0xff | (m[mpos+ 7] & 0xff) << 8; h3 += ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
		    t4 = m[mpos+ 8] & 0xff | (m[mpos+ 9] & 0xff) << 8; h4 += ((t3 >>>  4) | (t4 << 12)) & 0x1fff;
		    h5 += ((t4 >>>  1)) & 0x1fff;
		    t5 = m[mpos+10] & 0xff | (m[mpos+11] & 0xff) << 8; h6 += ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
		    t6 = m[mpos+12] & 0xff | (m[mpos+13] & 0xff) << 8; h7 += ((t5 >>> 11) | (t6 <<  5)) & 0x1fff;
		    t7 = m[mpos+14] & 0xff | (m[mpos+15] & 0xff) << 8; h8 += ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
		    h9 += ((t7 >>> 5)) | hibit;

		    c = 0;

		    d0 = c;
		    d0 += h0 * r0;
		    d0 += h1 * (5 * r9);
		    d0 += h2 * (5 * r8);
		    d0 += h3 * (5 * r7);
		    d0 += h4 * (5 * r6);
		    c = (d0 >>> 13); d0 &= 0x1fff;
		    d0 += h5 * (5 * r5);
		    d0 += h6 * (5 * r4);
		    d0 += h7 * (5 * r3);
		    d0 += h8 * (5 * r2);
		    d0 += h9 * (5 * r1);
		    c += (d0 >>> 13); d0 &= 0x1fff;

		    d1 = c;
		    d1 += h0 * r1;
		    d1 += h1 * r0;
		    d1 += h2 * (5 * r9);
		    d1 += h3 * (5 * r8);
		    d1 += h4 * (5 * r7);
		    c = (d1 >>> 13); d1 &= 0x1fff;
		    d1 += h5 * (5 * r6);
		    d1 += h6 * (5 * r5);
		    d1 += h7 * (5 * r4);
		    d1 += h8 * (5 * r3);
		    d1 += h9 * (5 * r2);
		    c += (d1 >>> 13); d1 &= 0x1fff;

		    d2 = c;
		    d2 += h0 * r2;
		    d2 += h1 * r1;
		    d2 += h2 * r0;
		    d2 += h3 * (5 * r9);
		    d2 += h4 * (5 * r8);
		    c = (d2 >>> 13); d2 &= 0x1fff;
		    d2 += h5 * (5 * r7);
		    d2 += h6 * (5 * r6);
		    d2 += h7 * (5 * r5);
		    d2 += h8 * (5 * r4);
		    d2 += h9 * (5 * r3);
		    c += (d2 >>> 13); d2 &= 0x1fff;

		    d3 = c;
		    d3 += h0 * r3;
		    d3 += h1 * r2;
		    d3 += h2 * r1;
		    d3 += h3 * r0;
		    d3 += h4 * (5 * r9);
		    c = (d3 >>> 13); d3 &= 0x1fff;
		    d3 += h5 * (5 * r8);
		    d3 += h6 * (5 * r7);
		    d3 += h7 * (5 * r6);
		    d3 += h8 * (5 * r5);
		    d3 += h9 * (5 * r4);
		    c += (d3 >>> 13); d3 &= 0x1fff;

		    d4 = c;
		    d4 += h0 * r4;
		    d4 += h1 * r3;
		    d4 += h2 * r2;
		    d4 += h3 * r1;
		    d4 += h4 * r0;
		    c = (d4 >>> 13); d4 &= 0x1fff;
		    d4 += h5 * (5 * r9);
		    d4 += h6 * (5 * r8);
		    d4 += h7 * (5 * r7);
		    d4 += h8 * (5 * r6);
		    d4 += h9 * (5 * r5);
		    c += (d4 >>> 13); d4 &= 0x1fff;

		    d5 = c;
		    d5 += h0 * r5;
		    d5 += h1 * r4;
		    d5 += h2 * r3;
		    d5 += h3 * r2;
		    d5 += h4 * r1;
		    c = (d5 >>> 13); d5 &= 0x1fff;
		    d5 += h5 * r0;
		    d5 += h6 * (5 * r9);
		    d5 += h7 * (5 * r8);
		    d5 += h8 * (5 * r7);
		    d5 += h9 * (5 * r6);
		    c += (d5 >>> 13); d5 &= 0x1fff;

		    d6 = c;
		    d6 += h0 * r6;
		    d6 += h1 * r5;
		    d6 += h2 * r4;
		    d6 += h3 * r3;
		    d6 += h4 * r2;
		    c = (d6 >>> 13); d6 &= 0x1fff;
		    d6 += h5 * r1;
		    d6 += h6 * r0;
		    d6 += h7 * (5 * r9);
		    d6 += h8 * (5 * r8);
		    d6 += h9 * (5 * r7);
		    c += (d6 >>> 13); d6 &= 0x1fff;

		    d7 = c;
		    d7 += h0 * r7;
		    d7 += h1 * r6;
		    d7 += h2 * r5;
		    d7 += h3 * r4;
		    d7 += h4 * r3;
		    c = (d7 >>> 13); d7 &= 0x1fff;
		    d7 += h5 * r2;
		    d7 += h6 * r1;
		    d7 += h7 * r0;
		    d7 += h8 * (5 * r9);
		    d7 += h9 * (5 * r8);
		    c += (d7 >>> 13); d7 &= 0x1fff;

		    d8 = c;
		    d8 += h0 * r8;
		    d8 += h1 * r7;
		    d8 += h2 * r6;
		    d8 += h3 * r5;
		    d8 += h4 * r4;
		    c = (d8 >>> 13); d8 &= 0x1fff;
		    d8 += h5 * r3;
		    d8 += h6 * r2;
		    d8 += h7 * r1;
		    d8 += h8 * r0;
		    d8 += h9 * (5 * r9);
		    c += (d8 >>> 13); d8 &= 0x1fff;

		    d9 = c;
		    d9 += h0 * r9;
		    d9 += h1 * r8;
		    d9 += h2 * r7;
		    d9 += h3 * r6;
		    d9 += h4 * r5;
		    c = (d9 >>> 13); d9 &= 0x1fff;
		    d9 += h5 * r4;
		    d9 += h6 * r3;
		    d9 += h7 * r2;
		    d9 += h8 * r1;
		    d9 += h9 * r0;
		    c += (d9 >>> 13); d9 &= 0x1fff;

		    c = (((c << 2) + c)) | 0;
		    c = (c + d0) | 0;
		    d0 = c & 0x1fff;
		    c = (c >>> 13);
		    d1 += c;

		    h0 = d0;
		    h1 = d1;
		    h2 = d2;
		    h3 = d3;
		    h4 = d4;
		    h5 = d5;
		    h6 = d6;
		    h7 = d7;
		    h8 = d8;
		    h9 = d9;

		    mpos += 16;
		    bytes -= 16;
		  }
		  this.h[0] = h0;
		  this.h[1] = h1;
		  this.h[2] = h2;
		  this.h[3] = h3;
		  this.h[4] = h4;
		  this.h[5] = h5;
		  this.h[6] = h6;
		  this.h[7] = h7;
		  this.h[8] = h8;
		  this.h[9] = h9;
		};

		poly1305.prototype.finish = function(mac, macpos) {
		  var g = new Uint16Array(10);
		  var c, mask, f, i;

		  if (this.leftover) {
		    i = this.leftover;
		    this.buffer[i++] = 1;
		    for (; i < 16; i++) this.buffer[i] = 0;
		    this.fin = 1;
		    this.blocks(this.buffer, 0, 16);
		  }

		  c = this.h[1] >>> 13;
		  this.h[1] &= 0x1fff;
		  for (i = 2; i < 10; i++) {
		    this.h[i] += c;
		    c = this.h[i] >>> 13;
		    this.h[i] &= 0x1fff;
		  }
		  this.h[0] += (c * 5);
		  c = this.h[0] >>> 13;
		  this.h[0] &= 0x1fff;
		  this.h[1] += c;
		  c = this.h[1] >>> 13;
		  this.h[1] &= 0x1fff;
		  this.h[2] += c;

		  g[0] = this.h[0] + 5;
		  c = g[0] >>> 13;
		  g[0] &= 0x1fff;
		  for (i = 1; i < 10; i++) {
		    g[i] = this.h[i] + c;
		    c = g[i] >>> 13;
		    g[i] &= 0x1fff;
		  }
		  g[9] -= (1 << 13);

		  mask = (c ^ 1) - 1;
		  for (i = 0; i < 10; i++) g[i] &= mask;
		  mask = ~mask;
		  for (i = 0; i < 10; i++) this.h[i] = (this.h[i] & mask) | g[i];

		  this.h[0] = ((this.h[0]       ) | (this.h[1] << 13)                    ) & 0xffff;
		  this.h[1] = ((this.h[1] >>>  3) | (this.h[2] << 10)                    ) & 0xffff;
		  this.h[2] = ((this.h[2] >>>  6) | (this.h[3] <<  7)                    ) & 0xffff;
		  this.h[3] = ((this.h[3] >>>  9) | (this.h[4] <<  4)                    ) & 0xffff;
		  this.h[4] = ((this.h[4] >>> 12) | (this.h[5] <<  1) | (this.h[6] << 14)) & 0xffff;
		  this.h[5] = ((this.h[6] >>>  2) | (this.h[7] << 11)                    ) & 0xffff;
		  this.h[6] = ((this.h[7] >>>  5) | (this.h[8] <<  8)                    ) & 0xffff;
		  this.h[7] = ((this.h[8] >>>  8) | (this.h[9] <<  5)                    ) & 0xffff;

		  f = this.h[0] + this.pad[0];
		  this.h[0] = f & 0xffff;
		  for (i = 1; i < 8; i++) {
		    f = (((this.h[i] + this.pad[i]) | 0) + (f >>> 16)) | 0;
		    this.h[i] = f & 0xffff;
		  }

		  mac[macpos+ 0] = (this.h[0] >>> 0) & 0xff;
		  mac[macpos+ 1] = (this.h[0] >>> 8) & 0xff;
		  mac[macpos+ 2] = (this.h[1] >>> 0) & 0xff;
		  mac[macpos+ 3] = (this.h[1] >>> 8) & 0xff;
		  mac[macpos+ 4] = (this.h[2] >>> 0) & 0xff;
		  mac[macpos+ 5] = (this.h[2] >>> 8) & 0xff;
		  mac[macpos+ 6] = (this.h[3] >>> 0) & 0xff;
		  mac[macpos+ 7] = (this.h[3] >>> 8) & 0xff;
		  mac[macpos+ 8] = (this.h[4] >>> 0) & 0xff;
		  mac[macpos+ 9] = (this.h[4] >>> 8) & 0xff;
		  mac[macpos+10] = (this.h[5] >>> 0) & 0xff;
		  mac[macpos+11] = (this.h[5] >>> 8) & 0xff;
		  mac[macpos+12] = (this.h[6] >>> 0) & 0xff;
		  mac[macpos+13] = (this.h[6] >>> 8) & 0xff;
		  mac[macpos+14] = (this.h[7] >>> 0) & 0xff;
		  mac[macpos+15] = (this.h[7] >>> 8) & 0xff;
		};

		poly1305.prototype.update = function(m, mpos, bytes) {
		  var i, want;

		  if (this.leftover) {
		    want = (16 - this.leftover);
		    if (want > bytes)
		      want = bytes;
		    for (i = 0; i < want; i++)
		      this.buffer[this.leftover + i] = m[mpos+i];
		    bytes -= want;
		    mpos += want;
		    this.leftover += want;
		    if (this.leftover < 16)
		      return;
		    this.blocks(this.buffer, 0, 16);
		    this.leftover = 0;
		  }

		  if (bytes >= 16) {
		    want = bytes - (bytes % 16);
		    this.blocks(m, mpos, want);
		    mpos += want;
		    bytes -= want;
		  }

		  if (bytes) {
		    for (i = 0; i < bytes; i++)
		      this.buffer[this.leftover + i] = m[mpos+i];
		    this.leftover += bytes;
		  }
		};

		function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
		  var s = new poly1305(k);
		  s.update(m, mpos, n);
		  s.finish(out, outpos);
		  return 0;
		}

		function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
		  var x = new Uint8Array(16);
		  crypto_onetimeauth(x,0,m,mpos,n,k);
		  return crypto_verify_16(h,hpos,x,0);
		}

		function crypto_secretbox(c,m,d,n,k) {
		  var i;
		  if (d < 32) return -1;
		  crypto_stream_xor(c,0,m,0,d,n,k);
		  crypto_onetimeauth(c, 16, c, 32, d - 32, c);
		  for (i = 0; i < 16; i++) c[i] = 0;
		  return 0;
		}

		function crypto_secretbox_open(m,c,d,n,k) {
		  var i;
		  var x = new Uint8Array(32);
		  if (d < 32) return -1;
		  crypto_stream(x,0,32,n,k);
		  if (crypto_onetimeauth_verify(c, 16,c, 32,d - 32,x) !== 0) return -1;
		  crypto_stream_xor(m,0,c,0,d,n,k);
		  for (i = 0; i < 32; i++) m[i] = 0;
		  return 0;
		}

		function set25519(r, a) {
		  var i;
		  for (i = 0; i < 16; i++) r[i] = a[i]|0;
		}

		function car25519(o) {
		  var i, v, c = 1;
		  for (i = 0; i < 16; i++) {
		    v = o[i] + c + 65535;
		    c = Math.floor(v / 65536);
		    o[i] = v - c * 65536;
		  }
		  o[0] += c-1 + 37 * (c-1);
		}

		function sel25519(p, q, b) {
		  var t, c = ~(b-1);
		  for (var i = 0; i < 16; i++) {
		    t = c & (p[i] ^ q[i]);
		    p[i] ^= t;
		    q[i] ^= t;
		  }
		}

		function pack25519(o, n) {
		  var i, j, b;
		  var m = gf(), t = gf();
		  for (i = 0; i < 16; i++) t[i] = n[i];
		  car25519(t);
		  car25519(t);
		  car25519(t);
		  for (j = 0; j < 2; j++) {
		    m[0] = t[0] - 0xffed;
		    for (i = 1; i < 15; i++) {
		      m[i] = t[i] - 0xffff - ((m[i-1]>>16) & 1);
		      m[i-1] &= 0xffff;
		    }
		    m[15] = t[15] - 0x7fff - ((m[14]>>16) & 1);
		    b = (m[15]>>16) & 1;
		    m[14] &= 0xffff;
		    sel25519(t, m, 1-b);
		  }
		  for (i = 0; i < 16; i++) {
		    o[2*i] = t[i] & 0xff;
		    o[2*i+1] = t[i]>>8;
		  }
		}

		function neq25519(a, b) {
		  var c = new Uint8Array(32), d = new Uint8Array(32);
		  pack25519(c, a);
		  pack25519(d, b);
		  return crypto_verify_32(c, 0, d, 0);
		}

		function par25519(a) {
		  var d = new Uint8Array(32);
		  pack25519(d, a);
		  return d[0] & 1;
		}

		function unpack25519(o, n) {
		  var i;
		  for (i = 0; i < 16; i++) o[i] = n[2*i] + (n[2*i+1] << 8);
		  o[15] &= 0x7fff;
		}

		function A(o, a, b) {
		  for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
		}

		function Z(o, a, b) {
		  for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
		}

		function M(o, a, b) {
		  var v, c,
		     t0 = 0,  t1 = 0,  t2 = 0,  t3 = 0,  t4 = 0,  t5 = 0,  t6 = 0,  t7 = 0,
		     t8 = 0,  t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0,
		    t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0,
		    t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0,
		    b0 = b[0],
		    b1 = b[1],
		    b2 = b[2],
		    b3 = b[3],
		    b4 = b[4],
		    b5 = b[5],
		    b6 = b[6],
		    b7 = b[7],
		    b8 = b[8],
		    b9 = b[9],
		    b10 = b[10],
		    b11 = b[11],
		    b12 = b[12],
		    b13 = b[13],
		    b14 = b[14],
		    b15 = b[15];

		  v = a[0];
		  t0 += v * b0;
		  t1 += v * b1;
		  t2 += v * b2;
		  t3 += v * b3;
		  t4 += v * b4;
		  t5 += v * b5;
		  t6 += v * b6;
		  t7 += v * b7;
		  t8 += v * b8;
		  t9 += v * b9;
		  t10 += v * b10;
		  t11 += v * b11;
		  t12 += v * b12;
		  t13 += v * b13;
		  t14 += v * b14;
		  t15 += v * b15;
		  v = a[1];
		  t1 += v * b0;
		  t2 += v * b1;
		  t3 += v * b2;
		  t4 += v * b3;
		  t5 += v * b4;
		  t6 += v * b5;
		  t7 += v * b6;
		  t8 += v * b7;
		  t9 += v * b8;
		  t10 += v * b9;
		  t11 += v * b10;
		  t12 += v * b11;
		  t13 += v * b12;
		  t14 += v * b13;
		  t15 += v * b14;
		  t16 += v * b15;
		  v = a[2];
		  t2 += v * b0;
		  t3 += v * b1;
		  t4 += v * b2;
		  t5 += v * b3;
		  t6 += v * b4;
		  t7 += v * b5;
		  t8 += v * b6;
		  t9 += v * b7;
		  t10 += v * b8;
		  t11 += v * b9;
		  t12 += v * b10;
		  t13 += v * b11;
		  t14 += v * b12;
		  t15 += v * b13;
		  t16 += v * b14;
		  t17 += v * b15;
		  v = a[3];
		  t3 += v * b0;
		  t4 += v * b1;
		  t5 += v * b2;
		  t6 += v * b3;
		  t7 += v * b4;
		  t8 += v * b5;
		  t9 += v * b6;
		  t10 += v * b7;
		  t11 += v * b8;
		  t12 += v * b9;
		  t13 += v * b10;
		  t14 += v * b11;
		  t15 += v * b12;
		  t16 += v * b13;
		  t17 += v * b14;
		  t18 += v * b15;
		  v = a[4];
		  t4 += v * b0;
		  t5 += v * b1;
		  t6 += v * b2;
		  t7 += v * b3;
		  t8 += v * b4;
		  t9 += v * b5;
		  t10 += v * b6;
		  t11 += v * b7;
		  t12 += v * b8;
		  t13 += v * b9;
		  t14 += v * b10;
		  t15 += v * b11;
		  t16 += v * b12;
		  t17 += v * b13;
		  t18 += v * b14;
		  t19 += v * b15;
		  v = a[5];
		  t5 += v * b0;
		  t6 += v * b1;
		  t7 += v * b2;
		  t8 += v * b3;
		  t9 += v * b4;
		  t10 += v * b5;
		  t11 += v * b6;
		  t12 += v * b7;
		  t13 += v * b8;
		  t14 += v * b9;
		  t15 += v * b10;
		  t16 += v * b11;
		  t17 += v * b12;
		  t18 += v * b13;
		  t19 += v * b14;
		  t20 += v * b15;
		  v = a[6];
		  t6 += v * b0;
		  t7 += v * b1;
		  t8 += v * b2;
		  t9 += v * b3;
		  t10 += v * b4;
		  t11 += v * b5;
		  t12 += v * b6;
		  t13 += v * b7;
		  t14 += v * b8;
		  t15 += v * b9;
		  t16 += v * b10;
		  t17 += v * b11;
		  t18 += v * b12;
		  t19 += v * b13;
		  t20 += v * b14;
		  t21 += v * b15;
		  v = a[7];
		  t7 += v * b0;
		  t8 += v * b1;
		  t9 += v * b2;
		  t10 += v * b3;
		  t11 += v * b4;
		  t12 += v * b5;
		  t13 += v * b6;
		  t14 += v * b7;
		  t15 += v * b8;
		  t16 += v * b9;
		  t17 += v * b10;
		  t18 += v * b11;
		  t19 += v * b12;
		  t20 += v * b13;
		  t21 += v * b14;
		  t22 += v * b15;
		  v = a[8];
		  t8 += v * b0;
		  t9 += v * b1;
		  t10 += v * b2;
		  t11 += v * b3;
		  t12 += v * b4;
		  t13 += v * b5;
		  t14 += v * b6;
		  t15 += v * b7;
		  t16 += v * b8;
		  t17 += v * b9;
		  t18 += v * b10;
		  t19 += v * b11;
		  t20 += v * b12;
		  t21 += v * b13;
		  t22 += v * b14;
		  t23 += v * b15;
		  v = a[9];
		  t9 += v * b0;
		  t10 += v * b1;
		  t11 += v * b2;
		  t12 += v * b3;
		  t13 += v * b4;
		  t14 += v * b5;
		  t15 += v * b6;
		  t16 += v * b7;
		  t17 += v * b8;
		  t18 += v * b9;
		  t19 += v * b10;
		  t20 += v * b11;
		  t21 += v * b12;
		  t22 += v * b13;
		  t23 += v * b14;
		  t24 += v * b15;
		  v = a[10];
		  t10 += v * b0;
		  t11 += v * b1;
		  t12 += v * b2;
		  t13 += v * b3;
		  t14 += v * b4;
		  t15 += v * b5;
		  t16 += v * b6;
		  t17 += v * b7;
		  t18 += v * b8;
		  t19 += v * b9;
		  t20 += v * b10;
		  t21 += v * b11;
		  t22 += v * b12;
		  t23 += v * b13;
		  t24 += v * b14;
		  t25 += v * b15;
		  v = a[11];
		  t11 += v * b0;
		  t12 += v * b1;
		  t13 += v * b2;
		  t14 += v * b3;
		  t15 += v * b4;
		  t16 += v * b5;
		  t17 += v * b6;
		  t18 += v * b7;
		  t19 += v * b8;
		  t20 += v * b9;
		  t21 += v * b10;
		  t22 += v * b11;
		  t23 += v * b12;
		  t24 += v * b13;
		  t25 += v * b14;
		  t26 += v * b15;
		  v = a[12];
		  t12 += v * b0;
		  t13 += v * b1;
		  t14 += v * b2;
		  t15 += v * b3;
		  t16 += v * b4;
		  t17 += v * b5;
		  t18 += v * b6;
		  t19 += v * b7;
		  t20 += v * b8;
		  t21 += v * b9;
		  t22 += v * b10;
		  t23 += v * b11;
		  t24 += v * b12;
		  t25 += v * b13;
		  t26 += v * b14;
		  t27 += v * b15;
		  v = a[13];
		  t13 += v * b0;
		  t14 += v * b1;
		  t15 += v * b2;
		  t16 += v * b3;
		  t17 += v * b4;
		  t18 += v * b5;
		  t19 += v * b6;
		  t20 += v * b7;
		  t21 += v * b8;
		  t22 += v * b9;
		  t23 += v * b10;
		  t24 += v * b11;
		  t25 += v * b12;
		  t26 += v * b13;
		  t27 += v * b14;
		  t28 += v * b15;
		  v = a[14];
		  t14 += v * b0;
		  t15 += v * b1;
		  t16 += v * b2;
		  t17 += v * b3;
		  t18 += v * b4;
		  t19 += v * b5;
		  t20 += v * b6;
		  t21 += v * b7;
		  t22 += v * b8;
		  t23 += v * b9;
		  t24 += v * b10;
		  t25 += v * b11;
		  t26 += v * b12;
		  t27 += v * b13;
		  t28 += v * b14;
		  t29 += v * b15;
		  v = a[15];
		  t15 += v * b0;
		  t16 += v * b1;
		  t17 += v * b2;
		  t18 += v * b3;
		  t19 += v * b4;
		  t20 += v * b5;
		  t21 += v * b6;
		  t22 += v * b7;
		  t23 += v * b8;
		  t24 += v * b9;
		  t25 += v * b10;
		  t26 += v * b11;
		  t27 += v * b12;
		  t28 += v * b13;
		  t29 += v * b14;
		  t30 += v * b15;

		  t0  += 38 * t16;
		  t1  += 38 * t17;
		  t2  += 38 * t18;
		  t3  += 38 * t19;
		  t4  += 38 * t20;
		  t5  += 38 * t21;
		  t6  += 38 * t22;
		  t7  += 38 * t23;
		  t8  += 38 * t24;
		  t9  += 38 * t25;
		  t10 += 38 * t26;
		  t11 += 38 * t27;
		  t12 += 38 * t28;
		  t13 += 38 * t29;
		  t14 += 38 * t30;
		  // t15 left as is

		  // first car
		  c = 1;
		  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
		  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
		  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
		  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
		  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
		  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
		  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
		  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
		  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
		  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
		  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
		  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
		  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
		  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
		  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
		  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
		  t0 += c-1 + 37 * (c-1);

		  // second car
		  c = 1;
		  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
		  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
		  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
		  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
		  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
		  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
		  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
		  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
		  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
		  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
		  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
		  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
		  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
		  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
		  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
		  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
		  t0 += c-1 + 37 * (c-1);

		  o[ 0] = t0;
		  o[ 1] = t1;
		  o[ 2] = t2;
		  o[ 3] = t3;
		  o[ 4] = t4;
		  o[ 5] = t5;
		  o[ 6] = t6;
		  o[ 7] = t7;
		  o[ 8] = t8;
		  o[ 9] = t9;
		  o[10] = t10;
		  o[11] = t11;
		  o[12] = t12;
		  o[13] = t13;
		  o[14] = t14;
		  o[15] = t15;
		}

		function S(o, a) {
		  M(o, a, a);
		}

		function inv25519(o, i) {
		  var c = gf();
		  var a;
		  for (a = 0; a < 16; a++) c[a] = i[a];
		  for (a = 253; a >= 0; a--) {
		    S(c, c);
		    if(a !== 2 && a !== 4) M(c, c, i);
		  }
		  for (a = 0; a < 16; a++) o[a] = c[a];
		}

		function pow2523(o, i) {
		  var c = gf();
		  var a;
		  for (a = 0; a < 16; a++) c[a] = i[a];
		  for (a = 250; a >= 0; a--) {
		      S(c, c);
		      if(a !== 1) M(c, c, i);
		  }
		  for (a = 0; a < 16; a++) o[a] = c[a];
		}

		function crypto_scalarmult(q, n, p) {
		  var z = new Uint8Array(32);
		  var x = new Float64Array(80), r, i;
		  var a = gf(), b = gf(), c = gf(),
		      d = gf(), e = gf(), f = gf();
		  for (i = 0; i < 31; i++) z[i] = n[i];
		  z[31]=(n[31]&127)|64;
		  z[0]&=248;
		  unpack25519(x,p);
		  for (i = 0; i < 16; i++) {
		    b[i]=x[i];
		    d[i]=a[i]=c[i]=0;
		  }
		  a[0]=d[0]=1;
		  for (i=254; i>=0; --i) {
		    r=(z[i>>>3]>>>(i&7))&1;
		    sel25519(a,b,r);
		    sel25519(c,d,r);
		    A(e,a,c);
		    Z(a,a,c);
		    A(c,b,d);
		    Z(b,b,d);
		    S(d,e);
		    S(f,a);
		    M(a,c,a);
		    M(c,b,e);
		    A(e,a,c);
		    Z(a,a,c);
		    S(b,a);
		    Z(c,d,f);
		    M(a,c,_121665);
		    A(a,a,d);
		    M(c,c,a);
		    M(a,d,f);
		    M(d,b,x);
		    S(b,e);
		    sel25519(a,b,r);
		    sel25519(c,d,r);
		  }
		  for (i = 0; i < 16; i++) {
		    x[i+16]=a[i];
		    x[i+32]=c[i];
		    x[i+48]=b[i];
		    x[i+64]=d[i];
		  }
		  var x32 = x.subarray(32);
		  var x16 = x.subarray(16);
		  inv25519(x32,x32);
		  M(x16,x16,x32);
		  pack25519(q,x16);
		  return 0;
		}

		function crypto_scalarmult_base(q, n) {
		  return crypto_scalarmult(q, n, _9);
		}

		function crypto_box_keypair(y, x) {
		  randombytes(x, 32);
		  return crypto_scalarmult_base(y, x);
		}

		function crypto_box_beforenm(k, y, x) {
		  var s = new Uint8Array(32);
		  crypto_scalarmult(s, x, y);
		  return crypto_core_hsalsa20(k, _0, s, sigma);
		}

		var crypto_box_afternm = crypto_secretbox;
		var crypto_box_open_afternm = crypto_secretbox_open;

		function crypto_box(c, m, d, n, y, x) {
		  var k = new Uint8Array(32);
		  crypto_box_beforenm(k, y, x);
		  return crypto_box_afternm(c, m, d, n, k);
		}

		function crypto_box_open(m, c, d, n, y, x) {
		  var k = new Uint8Array(32);
		  crypto_box_beforenm(k, y, x);
		  return crypto_box_open_afternm(m, c, d, n, k);
		}

		var K = [
		  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
		  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
		  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
		  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
		  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
		  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
		  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
		  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
		  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
		  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
		  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
		  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
		  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
		  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
		  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
		  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
		  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
		  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
		  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
		  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
		  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
		  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
		  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
		  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
		  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
		  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
		  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
		  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
		  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
		  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
		  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
		  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
		  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
		  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
		  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
		  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
		  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
		  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
		  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
		  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
		];

		function crypto_hashblocks_hl(hh, hl, m, n) {
		  var wh = new Int32Array(16), wl = new Int32Array(16),
		      bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7,
		      bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7,
		      th, tl, i, j, h, l, a, b, c, d;

		  var ah0 = hh[0],
		      ah1 = hh[1],
		      ah2 = hh[2],
		      ah3 = hh[3],
		      ah4 = hh[4],
		      ah5 = hh[5],
		      ah6 = hh[6],
		      ah7 = hh[7],

		      al0 = hl[0],
		      al1 = hl[1],
		      al2 = hl[2],
		      al3 = hl[3],
		      al4 = hl[4],
		      al5 = hl[5],
		      al6 = hl[6],
		      al7 = hl[7];

		  var pos = 0;
		  while (n >= 128) {
		    for (i = 0; i < 16; i++) {
		      j = 8 * i + pos;
		      wh[i] = (m[j+0] << 24) | (m[j+1] << 16) | (m[j+2] << 8) | m[j+3];
		      wl[i] = (m[j+4] << 24) | (m[j+5] << 16) | (m[j+6] << 8) | m[j+7];
		    }
		    for (i = 0; i < 80; i++) {
		      bh0 = ah0;
		      bh1 = ah1;
		      bh2 = ah2;
		      bh3 = ah3;
		      bh4 = ah4;
		      bh5 = ah5;
		      bh6 = ah6;
		      bh7 = ah7;

		      bl0 = al0;
		      bl1 = al1;
		      bl2 = al2;
		      bl3 = al3;
		      bl4 = al4;
		      bl5 = al5;
		      bl6 = al6;
		      bl7 = al7;

		      // add
		      h = ah7;
		      l = al7;

		      a = l & 0xffff; b = l >>> 16;
		      c = h & 0xffff; d = h >>> 16;

		      // Sigma1
		      h = ((ah4 >>> 14) | (al4 << (32-14))) ^ ((ah4 >>> 18) | (al4 << (32-18))) ^ ((al4 >>> (41-32)) | (ah4 << (32-(41-32))));
		      l = ((al4 >>> 14) | (ah4 << (32-14))) ^ ((al4 >>> 18) | (ah4 << (32-18))) ^ ((ah4 >>> (41-32)) | (al4 << (32-(41-32))));

		      a += l & 0xffff; b += l >>> 16;
		      c += h & 0xffff; d += h >>> 16;

		      // Ch
		      h = (ah4 & ah5) ^ (~ah4 & ah6);
		      l = (al4 & al5) ^ (~al4 & al6);

		      a += l & 0xffff; b += l >>> 16;
		      c += h & 0xffff; d += h >>> 16;

		      // K
		      h = K[i*2];
		      l = K[i*2+1];

		      a += l & 0xffff; b += l >>> 16;
		      c += h & 0xffff; d += h >>> 16;

		      // w
		      h = wh[i%16];
		      l = wl[i%16];

		      a += l & 0xffff; b += l >>> 16;
		      c += h & 0xffff; d += h >>> 16;

		      b += a >>> 16;
		      c += b >>> 16;
		      d += c >>> 16;

		      th = c & 0xffff | d << 16;
		      tl = a & 0xffff | b << 16;

		      // add
		      h = th;
		      l = tl;

		      a = l & 0xffff; b = l >>> 16;
		      c = h & 0xffff; d = h >>> 16;

		      // Sigma0
		      h = ((ah0 >>> 28) | (al0 << (32-28))) ^ ((al0 >>> (34-32)) | (ah0 << (32-(34-32)))) ^ ((al0 >>> (39-32)) | (ah0 << (32-(39-32))));
		      l = ((al0 >>> 28) | (ah0 << (32-28))) ^ ((ah0 >>> (34-32)) | (al0 << (32-(34-32)))) ^ ((ah0 >>> (39-32)) | (al0 << (32-(39-32))));

		      a += l & 0xffff; b += l >>> 16;
		      c += h & 0xffff; d += h >>> 16;

		      // Maj
		      h = (ah0 & ah1) ^ (ah0 & ah2) ^ (ah1 & ah2);
		      l = (al0 & al1) ^ (al0 & al2) ^ (al1 & al2);

		      a += l & 0xffff; b += l >>> 16;
		      c += h & 0xffff; d += h >>> 16;

		      b += a >>> 16;
		      c += b >>> 16;
		      d += c >>> 16;

		      bh7 = (c & 0xffff) | (d << 16);
		      bl7 = (a & 0xffff) | (b << 16);

		      // add
		      h = bh3;
		      l = bl3;

		      a = l & 0xffff; b = l >>> 16;
		      c = h & 0xffff; d = h >>> 16;

		      h = th;
		      l = tl;

		      a += l & 0xffff; b += l >>> 16;
		      c += h & 0xffff; d += h >>> 16;

		      b += a >>> 16;
		      c += b >>> 16;
		      d += c >>> 16;

		      bh3 = (c & 0xffff) | (d << 16);
		      bl3 = (a & 0xffff) | (b << 16);

		      ah1 = bh0;
		      ah2 = bh1;
		      ah3 = bh2;
		      ah4 = bh3;
		      ah5 = bh4;
		      ah6 = bh5;
		      ah7 = bh6;
		      ah0 = bh7;

		      al1 = bl0;
		      al2 = bl1;
		      al3 = bl2;
		      al4 = bl3;
		      al5 = bl4;
		      al6 = bl5;
		      al7 = bl6;
		      al0 = bl7;

		      if (i%16 === 15) {
		        for (j = 0; j < 16; j++) {
		          // add
		          h = wh[j];
		          l = wl[j];

		          a = l & 0xffff; b = l >>> 16;
		          c = h & 0xffff; d = h >>> 16;

		          h = wh[(j+9)%16];
		          l = wl[(j+9)%16];

		          a += l & 0xffff; b += l >>> 16;
		          c += h & 0xffff; d += h >>> 16;

		          // sigma0
		          th = wh[(j+1)%16];
		          tl = wl[(j+1)%16];
		          h = ((th >>> 1) | (tl << (32-1))) ^ ((th >>> 8) | (tl << (32-8))) ^ (th >>> 7);
		          l = ((tl >>> 1) | (th << (32-1))) ^ ((tl >>> 8) | (th << (32-8))) ^ ((tl >>> 7) | (th << (32-7)));

		          a += l & 0xffff; b += l >>> 16;
		          c += h & 0xffff; d += h >>> 16;

		          // sigma1
		          th = wh[(j+14)%16];
		          tl = wl[(j+14)%16];
		          h = ((th >>> 19) | (tl << (32-19))) ^ ((tl >>> (61-32)) | (th << (32-(61-32)))) ^ (th >>> 6);
		          l = ((tl >>> 19) | (th << (32-19))) ^ ((th >>> (61-32)) | (tl << (32-(61-32)))) ^ ((tl >>> 6) | (th << (32-6)));

		          a += l & 0xffff; b += l >>> 16;
		          c += h & 0xffff; d += h >>> 16;

		          b += a >>> 16;
		          c += b >>> 16;
		          d += c >>> 16;

		          wh[j] = (c & 0xffff) | (d << 16);
		          wl[j] = (a & 0xffff) | (b << 16);
		        }
		      }
		    }

		    // add
		    h = ah0;
		    l = al0;

		    a = l & 0xffff; b = l >>> 16;
		    c = h & 0xffff; d = h >>> 16;

		    h = hh[0];
		    l = hl[0];

		    a += l & 0xffff; b += l >>> 16;
		    c += h & 0xffff; d += h >>> 16;

		    b += a >>> 16;
		    c += b >>> 16;
		    d += c >>> 16;

		    hh[0] = ah0 = (c & 0xffff) | (d << 16);
		    hl[0] = al0 = (a & 0xffff) | (b << 16);

		    h = ah1;
		    l = al1;

		    a = l & 0xffff; b = l >>> 16;
		    c = h & 0xffff; d = h >>> 16;

		    h = hh[1];
		    l = hl[1];

		    a += l & 0xffff; b += l >>> 16;
		    c += h & 0xffff; d += h >>> 16;

		    b += a >>> 16;
		    c += b >>> 16;
		    d += c >>> 16;

		    hh[1] = ah1 = (c & 0xffff) | (d << 16);
		    hl[1] = al1 = (a & 0xffff) | (b << 16);

		    h = ah2;
		    l = al2;

		    a = l & 0xffff; b = l >>> 16;
		    c = h & 0xffff; d = h >>> 16;

		    h = hh[2];
		    l = hl[2];

		    a += l & 0xffff; b += l >>> 16;
		    c += h & 0xffff; d += h >>> 16;

		    b += a >>> 16;
		    c += b >>> 16;
		    d += c >>> 16;

		    hh[2] = ah2 = (c & 0xffff) | (d << 16);
		    hl[2] = al2 = (a & 0xffff) | (b << 16);

		    h = ah3;
		    l = al3;

		    a = l & 0xffff; b = l >>> 16;
		    c = h & 0xffff; d = h >>> 16;

		    h = hh[3];
		    l = hl[3];

		    a += l & 0xffff; b += l >>> 16;
		    c += h & 0xffff; d += h >>> 16;

		    b += a >>> 16;
		    c += b >>> 16;
		    d += c >>> 16;

		    hh[3] = ah3 = (c & 0xffff) | (d << 16);
		    hl[3] = al3 = (a & 0xffff) | (b << 16);

		    h = ah4;
		    l = al4;

		    a = l & 0xffff; b = l >>> 16;
		    c = h & 0xffff; d = h >>> 16;

		    h = hh[4];
		    l = hl[4];

		    a += l & 0xffff; b += l >>> 16;
		    c += h & 0xffff; d += h >>> 16;

		    b += a >>> 16;
		    c += b >>> 16;
		    d += c >>> 16;

		    hh[4] = ah4 = (c & 0xffff) | (d << 16);
		    hl[4] = al4 = (a & 0xffff) | (b << 16);

		    h = ah5;
		    l = al5;

		    a = l & 0xffff; b = l >>> 16;
		    c = h & 0xffff; d = h >>> 16;

		    h = hh[5];
		    l = hl[5];

		    a += l & 0xffff; b += l >>> 16;
		    c += h & 0xffff; d += h >>> 16;

		    b += a >>> 16;
		    c += b >>> 16;
		    d += c >>> 16;

		    hh[5] = ah5 = (c & 0xffff) | (d << 16);
		    hl[5] = al5 = (a & 0xffff) | (b << 16);

		    h = ah6;
		    l = al6;

		    a = l & 0xffff; b = l >>> 16;
		    c = h & 0xffff; d = h >>> 16;

		    h = hh[6];
		    l = hl[6];

		    a += l & 0xffff; b += l >>> 16;
		    c += h & 0xffff; d += h >>> 16;

		    b += a >>> 16;
		    c += b >>> 16;
		    d += c >>> 16;

		    hh[6] = ah6 = (c & 0xffff) | (d << 16);
		    hl[6] = al6 = (a & 0xffff) | (b << 16);

		    h = ah7;
		    l = al7;

		    a = l & 0xffff; b = l >>> 16;
		    c = h & 0xffff; d = h >>> 16;

		    h = hh[7];
		    l = hl[7];

		    a += l & 0xffff; b += l >>> 16;
		    c += h & 0xffff; d += h >>> 16;

		    b += a >>> 16;
		    c += b >>> 16;
		    d += c >>> 16;

		    hh[7] = ah7 = (c & 0xffff) | (d << 16);
		    hl[7] = al7 = (a & 0xffff) | (b << 16);

		    pos += 128;
		    n -= 128;
		  }

		  return n;
		}

		function crypto_hash(out, m, n) {
		  var hh = new Int32Array(8),
		      hl = new Int32Array(8),
		      x = new Uint8Array(256),
		      i, b = n;

		  hh[0] = 0x6a09e667;
		  hh[1] = 0xbb67ae85;
		  hh[2] = 0x3c6ef372;
		  hh[3] = 0xa54ff53a;
		  hh[4] = 0x510e527f;
		  hh[5] = 0x9b05688c;
		  hh[6] = 0x1f83d9ab;
		  hh[7] = 0x5be0cd19;

		  hl[0] = 0xf3bcc908;
		  hl[1] = 0x84caa73b;
		  hl[2] = 0xfe94f82b;
		  hl[3] = 0x5f1d36f1;
		  hl[4] = 0xade682d1;
		  hl[5] = 0x2b3e6c1f;
		  hl[6] = 0xfb41bd6b;
		  hl[7] = 0x137e2179;

		  crypto_hashblocks_hl(hh, hl, m, n);
		  n %= 128;

		  for (i = 0; i < n; i++) x[i] = m[b-n+i];
		  x[n] = 128;

		  n = 256-128*(n<112?1:0);
		  x[n-9] = 0;
		  ts64(x, n-8,  (b / 0x20000000) | 0, b << 3);
		  crypto_hashblocks_hl(hh, hl, x, n);

		  for (i = 0; i < 8; i++) ts64(out, 8*i, hh[i], hl[i]);

		  return 0;
		}

		function add(p, q) {
		  var a = gf(), b = gf(), c = gf(),
		      d = gf(), e = gf(), f = gf(),
		      g = gf(), h = gf(), t = gf();

		  Z(a, p[1], p[0]);
		  Z(t, q[1], q[0]);
		  M(a, a, t);
		  A(b, p[0], p[1]);
		  A(t, q[0], q[1]);
		  M(b, b, t);
		  M(c, p[3], q[3]);
		  M(c, c, D2);
		  M(d, p[2], q[2]);
		  A(d, d, d);
		  Z(e, b, a);
		  Z(f, d, c);
		  A(g, d, c);
		  A(h, b, a);

		  M(p[0], e, f);
		  M(p[1], h, g);
		  M(p[2], g, f);
		  M(p[3], e, h);
		}

		function cswap(p, q, b) {
		  var i;
		  for (i = 0; i < 4; i++) {
		    sel25519(p[i], q[i], b);
		  }
		}

		function pack(r, p) {
		  var tx = gf(), ty = gf(), zi = gf();
		  inv25519(zi, p[2]);
		  M(tx, p[0], zi);
		  M(ty, p[1], zi);
		  pack25519(r, ty);
		  r[31] ^= par25519(tx) << 7;
		}

		function scalarmult(p, q, s) {
		  var b, i;
		  set25519(p[0], gf0);
		  set25519(p[1], gf1);
		  set25519(p[2], gf1);
		  set25519(p[3], gf0);
		  for (i = 255; i >= 0; --i) {
		    b = (s[(i/8)|0] >> (i&7)) & 1;
		    cswap(p, q, b);
		    add(q, p);
		    add(p, p);
		    cswap(p, q, b);
		  }
		}

		function scalarbase(p, s) {
		  var q = [gf(), gf(), gf(), gf()];
		  set25519(q[0], X);
		  set25519(q[1], Y);
		  set25519(q[2], gf1);
		  M(q[3], X, Y);
		  scalarmult(p, q, s);
		}

		function crypto_sign_keypair(pk, sk, seeded) {
		  var d = new Uint8Array(64);
		  var p = [gf(), gf(), gf(), gf()];
		  var i;

		  if (!seeded) randombytes(sk, 32);
		  crypto_hash(d, sk, 32);
		  d[0] &= 248;
		  d[31] &= 127;
		  d[31] |= 64;

		  scalarbase(p, d);
		  pack(pk, p);

		  for (i = 0; i < 32; i++) sk[i+32] = pk[i];
		  return 0;
		}

		var L = new Float64Array([0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7, 0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x10]);

		function modL(r, x) {
		  var carry, i, j, k;
		  for (i = 63; i >= 32; --i) {
		    carry = 0;
		    for (j = i - 32, k = i - 12; j < k; ++j) {
		      x[j] += carry - 16 * x[i] * L[j - (i - 32)];
		      carry = Math.floor((x[j] + 128) / 256);
		      x[j] -= carry * 256;
		    }
		    x[j] += carry;
		    x[i] = 0;
		  }
		  carry = 0;
		  for (j = 0; j < 32; j++) {
		    x[j] += carry - (x[31] >> 4) * L[j];
		    carry = x[j] >> 8;
		    x[j] &= 255;
		  }
		  for (j = 0; j < 32; j++) x[j] -= carry * L[j];
		  for (i = 0; i < 32; i++) {
		    x[i+1] += x[i] >> 8;
		    r[i] = x[i] & 255;
		  }
		}

		function reduce(r) {
		  var x = new Float64Array(64), i;
		  for (i = 0; i < 64; i++) x[i] = r[i];
		  for (i = 0; i < 64; i++) r[i] = 0;
		  modL(r, x);
		}

		// Note: difference from C - smlen returned, not passed as argument.
		function crypto_sign(sm, m, n, sk) {
		  var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
		  var i, j, x = new Float64Array(64);
		  var p = [gf(), gf(), gf(), gf()];

		  crypto_hash(d, sk, 32);
		  d[0] &= 248;
		  d[31] &= 127;
		  d[31] |= 64;

		  var smlen = n + 64;
		  for (i = 0; i < n; i++) sm[64 + i] = m[i];
		  for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];

		  crypto_hash(r, sm.subarray(32), n+32);
		  reduce(r);
		  scalarbase(p, r);
		  pack(sm, p);

		  for (i = 32; i < 64; i++) sm[i] = sk[i];
		  crypto_hash(h, sm, n + 64);
		  reduce(h);

		  for (i = 0; i < 64; i++) x[i] = 0;
		  for (i = 0; i < 32; i++) x[i] = r[i];
		  for (i = 0; i < 32; i++) {
		    for (j = 0; j < 32; j++) {
		      x[i+j] += h[i] * d[j];
		    }
		  }

		  modL(sm.subarray(32), x);
		  return smlen;
		}

		function unpackneg(r, p) {
		  var t = gf(), chk = gf(), num = gf(),
		      den = gf(), den2 = gf(), den4 = gf(),
		      den6 = gf();

		  set25519(r[2], gf1);
		  unpack25519(r[1], p);
		  S(num, r[1]);
		  M(den, num, D);
		  Z(num, num, r[2]);
		  A(den, r[2], den);

		  S(den2, den);
		  S(den4, den2);
		  M(den6, den4, den2);
		  M(t, den6, num);
		  M(t, t, den);

		  pow2523(t, t);
		  M(t, t, num);
		  M(t, t, den);
		  M(t, t, den);
		  M(r[0], t, den);

		  S(chk, r[0]);
		  M(chk, chk, den);
		  if (neq25519(chk, num)) M(r[0], r[0], I);

		  S(chk, r[0]);
		  M(chk, chk, den);
		  if (neq25519(chk, num)) return -1;

		  if (par25519(r[0]) === (p[31]>>7)) Z(r[0], gf0, r[0]);

		  M(r[3], r[0], r[1]);
		  return 0;
		}

		function crypto_sign_open(m, sm, n, pk) {
		  var i;
		  var t = new Uint8Array(32), h = new Uint8Array(64);
		  var p = [gf(), gf(), gf(), gf()],
		      q = [gf(), gf(), gf(), gf()];

		  if (n < 64) return -1;

		  if (unpackneg(q, pk)) return -1;

		  for (i = 0; i < n; i++) m[i] = sm[i];
		  for (i = 0; i < 32; i++) m[i+32] = pk[i];
		  crypto_hash(h, m, n);
		  reduce(h);
		  scalarmult(p, q, h);

		  scalarbase(q, sm.subarray(32));
		  add(p, q);
		  pack(t, p);

		  n -= 64;
		  if (crypto_verify_32(sm, 0, t, 0)) {
		    for (i = 0; i < n; i++) m[i] = 0;
		    return -1;
		  }

		  for (i = 0; i < n; i++) m[i] = sm[i + 64];
		  return n;
		}

		var crypto_secretbox_KEYBYTES = 32,
		    crypto_secretbox_NONCEBYTES = 24,
		    crypto_secretbox_ZEROBYTES = 32,
		    crypto_secretbox_BOXZEROBYTES = 16,
		    crypto_scalarmult_BYTES = 32,
		    crypto_scalarmult_SCALARBYTES = 32,
		    crypto_box_PUBLICKEYBYTES = 32,
		    crypto_box_SECRETKEYBYTES = 32,
		    crypto_box_BEFORENMBYTES = 32,
		    crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES,
		    crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES,
		    crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES,
		    crypto_sign_BYTES = 64,
		    crypto_sign_PUBLICKEYBYTES = 32,
		    crypto_sign_SECRETKEYBYTES = 64,
		    crypto_sign_SEEDBYTES = 32,
		    crypto_hash_BYTES = 64;

		nacl.lowlevel = {
		  crypto_core_hsalsa20: crypto_core_hsalsa20,
		  crypto_stream_xor: crypto_stream_xor,
		  crypto_stream: crypto_stream,
		  crypto_stream_salsa20_xor: crypto_stream_salsa20_xor,
		  crypto_stream_salsa20: crypto_stream_salsa20,
		  crypto_onetimeauth: crypto_onetimeauth,
		  crypto_onetimeauth_verify: crypto_onetimeauth_verify,
		  crypto_verify_16: crypto_verify_16,
		  crypto_verify_32: crypto_verify_32,
		  crypto_secretbox: crypto_secretbox,
		  crypto_secretbox_open: crypto_secretbox_open,
		  crypto_scalarmult: crypto_scalarmult,
		  crypto_scalarmult_base: crypto_scalarmult_base,
		  crypto_box_beforenm: crypto_box_beforenm,
		  crypto_box_afternm: crypto_box_afternm,
		  crypto_box: crypto_box,
		  crypto_box_open: crypto_box_open,
		  crypto_box_keypair: crypto_box_keypair,
		  crypto_hash: crypto_hash,
		  crypto_sign: crypto_sign,
		  crypto_sign_keypair: crypto_sign_keypair,
		  crypto_sign_open: crypto_sign_open,

		  crypto_secretbox_KEYBYTES: crypto_secretbox_KEYBYTES,
		  crypto_secretbox_NONCEBYTES: crypto_secretbox_NONCEBYTES,
		  crypto_secretbox_ZEROBYTES: crypto_secretbox_ZEROBYTES,
		  crypto_secretbox_BOXZEROBYTES: crypto_secretbox_BOXZEROBYTES,
		  crypto_scalarmult_BYTES: crypto_scalarmult_BYTES,
		  crypto_scalarmult_SCALARBYTES: crypto_scalarmult_SCALARBYTES,
		  crypto_box_PUBLICKEYBYTES: crypto_box_PUBLICKEYBYTES,
		  crypto_box_SECRETKEYBYTES: crypto_box_SECRETKEYBYTES,
		  crypto_box_BEFORENMBYTES: crypto_box_BEFORENMBYTES,
		  crypto_box_NONCEBYTES: crypto_box_NONCEBYTES,
		  crypto_box_ZEROBYTES: crypto_box_ZEROBYTES,
		  crypto_box_BOXZEROBYTES: crypto_box_BOXZEROBYTES,
		  crypto_sign_BYTES: crypto_sign_BYTES,
		  crypto_sign_PUBLICKEYBYTES: crypto_sign_PUBLICKEYBYTES,
		  crypto_sign_SECRETKEYBYTES: crypto_sign_SECRETKEYBYTES,
		  crypto_sign_SEEDBYTES: crypto_sign_SEEDBYTES,
		  crypto_hash_BYTES: crypto_hash_BYTES,

		  gf: gf,
		  D: D,
		  L: L,
		  pack25519: pack25519,
		  unpack25519: unpack25519,
		  M: M,
		  A: A,
		  S: S,
		  Z: Z,
		  pow2523: pow2523,
		  add: add,
		  set25519: set25519,
		  modL: modL,
		  scalarmult: scalarmult,
		  scalarbase: scalarbase,
		};

		/* High-level API */

		function checkLengths(k, n) {
		  if (k.length !== crypto_secretbox_KEYBYTES) throw new Error('bad key size');
		  if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error('bad nonce size');
		}

		function checkBoxLengths(pk, sk) {
		  if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error('bad public key size');
		  if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
		}

		function checkArrayTypes() {
		  for (var i = 0; i < arguments.length; i++) {
		    if (!(arguments[i] instanceof Uint8Array))
		      throw new TypeError('unexpected type, use Uint8Array');
		  }
		}

		function cleanup(arr) {
		  for (var i = 0; i < arr.length; i++) arr[i] = 0;
		}

		nacl.randomBytes = function(n) {
		  var b = new Uint8Array(n);
		  randombytes(b, n);
		  return b;
		};

		nacl.secretbox = function(msg, nonce, key) {
		  checkArrayTypes(msg, nonce, key);
		  checkLengths(key, nonce);
		  var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
		  var c = new Uint8Array(m.length);
		  for (var i = 0; i < msg.length; i++) m[i+crypto_secretbox_ZEROBYTES] = msg[i];
		  crypto_secretbox(c, m, m.length, nonce, key);
		  return c.subarray(crypto_secretbox_BOXZEROBYTES);
		};

		nacl.secretbox.open = function(box, nonce, key) {
		  checkArrayTypes(box, nonce, key);
		  checkLengths(key, nonce);
		  var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
		  var m = new Uint8Array(c.length);
		  for (var i = 0; i < box.length; i++) c[i+crypto_secretbox_BOXZEROBYTES] = box[i];
		  if (c.length < 32) return null;
		  if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
		  return m.subarray(crypto_secretbox_ZEROBYTES);
		};

		nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
		nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
		nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;

		nacl.scalarMult = function(n, p) {
		  checkArrayTypes(n, p);
		  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
		  if (p.length !== crypto_scalarmult_BYTES) throw new Error('bad p size');
		  var q = new Uint8Array(crypto_scalarmult_BYTES);
		  crypto_scalarmult(q, n, p);
		  return q;
		};

		nacl.scalarMult.base = function(n) {
		  checkArrayTypes(n);
		  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
		  var q = new Uint8Array(crypto_scalarmult_BYTES);
		  crypto_scalarmult_base(q, n);
		  return q;
		};

		nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
		nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;

		nacl.box = function(msg, nonce, publicKey, secretKey) {
		  var k = nacl.box.before(publicKey, secretKey);
		  return nacl.secretbox(msg, nonce, k);
		};

		nacl.box.before = function(publicKey, secretKey) {
		  checkArrayTypes(publicKey, secretKey);
		  checkBoxLengths(publicKey, secretKey);
		  var k = new Uint8Array(crypto_box_BEFORENMBYTES);
		  crypto_box_beforenm(k, publicKey, secretKey);
		  return k;
		};

		nacl.box.after = nacl.secretbox;

		nacl.box.open = function(msg, nonce, publicKey, secretKey) {
		  var k = nacl.box.before(publicKey, secretKey);
		  return nacl.secretbox.open(msg, nonce, k);
		};

		nacl.box.open.after = nacl.secretbox.open;

		nacl.box.keyPair = function() {
		  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
		  var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
		  crypto_box_keypair(pk, sk);
		  return {publicKey: pk, secretKey: sk};
		};

		nacl.box.keyPair.fromSecretKey = function(secretKey) {
		  checkArrayTypes(secretKey);
		  if (secretKey.length !== crypto_box_SECRETKEYBYTES)
		    throw new Error('bad secret key size');
		  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
		  crypto_scalarmult_base(pk, secretKey);
		  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
		};

		nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
		nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
		nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
		nacl.box.nonceLength = crypto_box_NONCEBYTES;
		nacl.box.overheadLength = nacl.secretbox.overheadLength;

		nacl.sign = function(msg, secretKey) {
		  checkArrayTypes(msg, secretKey);
		  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
		    throw new Error('bad secret key size');
		  var signedMsg = new Uint8Array(crypto_sign_BYTES+msg.length);
		  crypto_sign(signedMsg, msg, msg.length, secretKey);
		  return signedMsg;
		};

		nacl.sign.open = function(signedMsg, publicKey) {
		  checkArrayTypes(signedMsg, publicKey);
		  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
		    throw new Error('bad public key size');
		  var tmp = new Uint8Array(signedMsg.length);
		  var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
		  if (mlen < 0) return null;
		  var m = new Uint8Array(mlen);
		  for (var i = 0; i < m.length; i++) m[i] = tmp[i];
		  return m;
		};

		nacl.sign.detached = function(msg, secretKey) {
		  var signedMsg = nacl.sign(msg, secretKey);
		  var sig = new Uint8Array(crypto_sign_BYTES);
		  for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
		  return sig;
		};

		nacl.sign.detached.verify = function(msg, sig, publicKey) {
		  checkArrayTypes(msg, sig, publicKey);
		  if (sig.length !== crypto_sign_BYTES)
		    throw new Error('bad signature size');
		  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
		    throw new Error('bad public key size');
		  var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
		  var m = new Uint8Array(crypto_sign_BYTES + msg.length);
		  var i;
		  for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
		  for (i = 0; i < msg.length; i++) sm[i+crypto_sign_BYTES] = msg[i];
		  return (crypto_sign_open(m, sm, sm.length, publicKey) >= 0);
		};

		nacl.sign.keyPair = function() {
		  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
		  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
		  crypto_sign_keypair(pk, sk);
		  return {publicKey: pk, secretKey: sk};
		};

		nacl.sign.keyPair.fromSecretKey = function(secretKey) {
		  checkArrayTypes(secretKey);
		  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
		    throw new Error('bad secret key size');
		  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
		  for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32+i];
		  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
		};

		nacl.sign.keyPair.fromSeed = function(seed) {
		  checkArrayTypes(seed);
		  if (seed.length !== crypto_sign_SEEDBYTES)
		    throw new Error('bad seed size');
		  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
		  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
		  for (var i = 0; i < 32; i++) sk[i] = seed[i];
		  crypto_sign_keypair(pk, sk, true);
		  return {publicKey: pk, secretKey: sk};
		};

		nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
		nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
		nacl.sign.seedLength = crypto_sign_SEEDBYTES;
		nacl.sign.signatureLength = crypto_sign_BYTES;

		nacl.hash = function(msg) {
		  checkArrayTypes(msg);
		  var h = new Uint8Array(crypto_hash_BYTES);
		  crypto_hash(h, msg, msg.length);
		  return h;
		};

		nacl.hash.hashLength = crypto_hash_BYTES;

		nacl.verify = function(x, y) {
		  checkArrayTypes(x, y);
		  // Zero length arguments are considered not equal.
		  if (x.length === 0 || y.length === 0) return false;
		  if (x.length !== y.length) return false;
		  return (vn(x, 0, y, 0, x.length) === 0) ? true : false;
		};

		nacl.setPRNG = function(fn) {
		  randombytes = fn;
		};

		(function() {
		  // Initialize PRNG if environment provides CSPRNG.
		  // If not, methods calling randombytes will throw.
		  var crypto = typeof self !== 'undefined' ? (self.crypto || self.msCrypto) : null;
		  if (crypto && crypto.getRandomValues) {
		    // Browsers.
		    var QUOTA = 65536;
		    nacl.setPRNG(function(x, n) {
		      var i, v = new Uint8Array(n);
		      for (i = 0; i < n; i += QUOTA) {
		        crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
		      }
		      for (i = 0; i < n; i++) x[i] = v[i];
		      cleanup(v);
		    });
		  } else if (typeof commonjsRequire !== 'undefined') {
		    // Node.js.
		    crypto = debugUtil;
		    if (crypto && crypto.randomBytes) {
		      nacl.setPRNG(function(x, n) {
		        var i, v = crypto.randomBytes(n);
		        for (i = 0; i < n; i++) x[i] = v[i];
		        cleanup(v);
		      });
		    }
		  }
		})();

		})( module.exports ? module.exports : (self.nacl = self.nacl || {}));
		});

		var ERROR_MSG_INPUT = 'Input must be an string, Buffer or Uint8Array';

		// For convenience, let people hash a string, not just a Uint8Array
		function normalizeInput (input) {
		  var ret;
		  if (input instanceof Uint8Array) {
		    ret = input;
		  } else if (input instanceof Buffer) {
		    ret = new Uint8Array(input);
		  } else if (typeof (input) === 'string') {
		    ret = new Uint8Array(Buffer.from(input, 'utf8'));
		  } else {
		    throw new Error(ERROR_MSG_INPUT)
		  }
		  return ret
		}

		// Converts a Uint8Array to a hexadecimal string
		// For example, toHex([255, 0, 255]) returns "ff00ff"
		function toHex$1 (bytes) {
		  return Array.prototype.map.call(bytes, function (n) {
		    return (n < 16 ? '0' : '') + n.toString(16)
		  }).join('')
		}

		// Converts any value in [0...2^32-1] to an 8-character hex string
		function uint32ToHex (val) {
		  return (0x100000000 + val).toString(16).substring(1)
		}

		// For debugging: prints out hash state in the same format as the RFC
		// sample computation exactly, so that you can diff
		function debugPrint (label, arr, size) {
		  var msg = '\n' + label + ' = ';
		  for (var i = 0; i < arr.length; i += 2) {
		    if (size === 32) {
		      msg += uint32ToHex(arr[i]).toUpperCase();
		      msg += ' ';
		      msg += uint32ToHex(arr[i + 1]).toUpperCase();
		    } else if (size === 64) {
		      msg += uint32ToHex(arr[i + 1]).toUpperCase();
		      msg += uint32ToHex(arr[i]).toUpperCase();
		    } else throw new Error('Invalid size ' + size)
		    if (i % 6 === 4) {
		      msg += '\n' + new Array(label.length + 4).join(' ');
		    } else if (i < arr.length - 2) {
		      msg += ' ';
		    }
		  }
		  console.log(msg);
		}

		// For performance testing: generates N bytes of input, hashes M times
		// Measures and prints MB/second hash performance each time
		function testSpeed (hashFn, N, M) {
		  var startMs = new Date().getTime();

		  var input = new Uint8Array(N);
		  for (var i = 0; i < N; i++) {
		    input[i] = i % 256;
		  }
		  var genMs = new Date().getTime();
		  console.log('Generated random input in ' + (genMs - startMs) + 'ms');
		  startMs = genMs;

		  for (i = 0; i < M; i++) {
		    var hashHex = hashFn(input);
		    var hashMs = new Date().getTime();
		    var ms = hashMs - startMs;
		    startMs = hashMs;
		    console.log('Hashed in ' + ms + 'ms: ' + hashHex.substring(0, 20) + '...');
		    console.log(Math.round(N / (1 << 20) / (ms / 1000) * 100) / 100 + ' MB PER SECOND');
		  }
		}

		var util = {
		  normalizeInput: normalizeInput,
		  toHex: toHex$1,
		  debugPrint: debugPrint,
		  testSpeed: testSpeed
		};

		// Blake2B in pure Javascript
		// Adapted from the reference implementation in RFC7693
		// Ported to Javascript by DC - https://github.com/dcposch



		// 64-bit unsigned addition
		// Sets v[a,a+1] += v[b,b+1]
		// v should be a Uint32Array
		function ADD64AA (v, a, b) {
		  var o0 = v[a] + v[b];
		  var o1 = v[a + 1] + v[b + 1];
		  if (o0 >= 0x100000000) {
		    o1++;
		  }
		  v[a] = o0;
		  v[a + 1] = o1;
		}

		// 64-bit unsigned addition
		// Sets v[a,a+1] += b
		// b0 is the low 32 bits of b, b1 represents the high 32 bits
		function ADD64AC (v, a, b0, b1) {
		  var o0 = v[a] + b0;
		  if (b0 < 0) {
		    o0 += 0x100000000;
		  }
		  var o1 = v[a + 1] + b1;
		  if (o0 >= 0x100000000) {
		    o1++;
		  }
		  v[a] = o0;
		  v[a + 1] = o1;
		}

		// Little-endian byte access
		function B2B_GET32 (arr, i) {
		  return (arr[i] ^
		  (arr[i + 1] << 8) ^
		  (arr[i + 2] << 16) ^
		  (arr[i + 3] << 24))
		}

		// G Mixing function
		// The ROTRs are inlined for speed
		function B2B_G (a, b, c, d, ix, iy) {
		  var x0 = m[ix];
		  var x1 = m[ix + 1];
		  var y0 = m[iy];
		  var y1 = m[iy + 1];

		  ADD64AA(v, a, b); // v[a,a+1] += v[b,b+1] ... in JS we must store a uint64 as two uint32s
		  ADD64AC(v, a, x0, x1); // v[a, a+1] += x ... x0 is the low 32 bits of x, x1 is the high 32 bits

		  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits
		  var xor0 = v[d] ^ v[a];
		  var xor1 = v[d + 1] ^ v[a + 1];
		  v[d] = xor1;
		  v[d + 1] = xor0;

		  ADD64AA(v, c, d);

		  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits
		  xor0 = v[b] ^ v[c];
		  xor1 = v[b + 1] ^ v[c + 1];
		  v[b] = (xor0 >>> 24) ^ (xor1 << 8);
		  v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8);

		  ADD64AA(v, a, b);
		  ADD64AC(v, a, y0, y1);

		  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits
		  xor0 = v[d] ^ v[a];
		  xor1 = v[d + 1] ^ v[a + 1];
		  v[d] = (xor0 >>> 16) ^ (xor1 << 16);
		  v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16);

		  ADD64AA(v, c, d);

		  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits
		  xor0 = v[b] ^ v[c];
		  xor1 = v[b + 1] ^ v[c + 1];
		  v[b] = (xor1 >>> 31) ^ (xor0 << 1);
		  v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1);
		}

		// Initialization Vector
		var BLAKE2B_IV32 = new Uint32Array([
		  0xF3BCC908, 0x6A09E667, 0x84CAA73B, 0xBB67AE85,
		  0xFE94F82B, 0x3C6EF372, 0x5F1D36F1, 0xA54FF53A,
		  0xADE682D1, 0x510E527F, 0x2B3E6C1F, 0x9B05688C,
		  0xFB41BD6B, 0x1F83D9AB, 0x137E2179, 0x5BE0CD19
		]);

		var SIGMA8 = [
		  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
		  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
		  11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
		  7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
		  9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
		  2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
		  12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
		  13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
		  6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
		  10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0,
		  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
		  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3
		];

		// These are offsets into a uint64 buffer.
		// Multiply them all by 2 to make them offsets into a uint32 buffer,
		// because this is Javascript and we don't have uint64s
		var SIGMA82 = new Uint8Array(SIGMA8.map(function (x) { return x * 2 }));

		// Compression function. 'last' flag indicates last block.
		// Note we're representing 16 uint64s as 32 uint32s
		var v = new Uint32Array(32);
		var m = new Uint32Array(32);
		function blake2bCompress (ctx, last) {
		  var i = 0;

		  // init work variables
		  for (i = 0; i < 16; i++) {
		    v[i] = ctx.h[i];
		    v[i + 16] = BLAKE2B_IV32[i];
		  }

		  // low 64 bits of offset
		  v[24] = v[24] ^ ctx.t;
		  v[25] = v[25] ^ (ctx.t / 0x100000000);
		  // high 64 bits not supported, offset may not be higher than 2**53-1

		  // last block flag set ?
		  if (last) {
		    v[28] = ~v[28];
		    v[29] = ~v[29];
		  }

		  // get little-endian words
		  for (i = 0; i < 32; i++) {
		    m[i] = B2B_GET32(ctx.b, 4 * i);
		  }

		  // twelve rounds of mixing
		  // uncomment the DebugPrint calls to log the computation
		  // and match the RFC sample documentation
		  // util.debugPrint('          m[16]', m, 64)
		  for (i = 0; i < 12; i++) {
		    // util.debugPrint('   (i=' + (i < 10 ? ' ' : '') + i + ') v[16]', v, 64)
		    B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1]);
		    B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3]);
		    B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5]);
		    B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7]);
		    B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9]);
		    B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11]);
		    B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13]);
		    B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15]);
		  }
		  // util.debugPrint('   (i=12) v[16]', v, 64)

		  for (i = 0; i < 16; i++) {
		    ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16];
		  }
		  // util.debugPrint('h[8]', ctx.h, 64)
		}

		// Creates a BLAKE2b hashing context
		// Requires an output length between 1 and 64 bytes
		// Takes an optional Uint8Array key
		function blake2bInit (outlen, key) {
		  if (outlen === 0 || outlen > 64) {
		    throw new Error('Illegal output length, expected 0 < length <= 64')
		  }
		  if (key && key.length > 64) {
		    throw new Error('Illegal key, expected Uint8Array with 0 < length <= 64')
		  }

		  // state, 'param block'
		  var ctx = {
		    b: new Uint8Array(128),
		    h: new Uint32Array(16),
		    t: 0, // input count
		    c: 0, // pointer within buffer
		    outlen: outlen // output length in bytes
		  };

		  // initialize hash state
		  for (var i = 0; i < 16; i++) {
		    ctx.h[i] = BLAKE2B_IV32[i];
		  }
		  var keylen = key ? key.length : 0;
		  ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen;

		  // key the hash, if applicable
		  if (key) {
		    blake2bUpdate(ctx, key);
		    // at the end
		    ctx.c = 128;
		  }

		  return ctx
		}

		// Updates a BLAKE2b streaming hash
		// Requires hash context and Uint8Array (byte array)
		function blake2bUpdate (ctx, input) {
		  for (var i = 0; i < input.length; i++) {
		    if (ctx.c === 128) { // buffer full ?
		      ctx.t += ctx.c; // add counters
		      blake2bCompress(ctx, false); // compress (not last)
		      ctx.c = 0; // counter to zero
		    }
		    ctx.b[ctx.c++] = input[i];
		  }
		}

		// Completes a BLAKE2b streaming hash
		// Returns a Uint8Array containing the message digest
		function blake2bFinal (ctx) {
		  ctx.t += ctx.c; // mark last block offset

		  while (ctx.c < 128) { // fill up with zeros
		    ctx.b[ctx.c++] = 0;
		  }
		  blake2bCompress(ctx, true); // final block flag = 1

		  // little endian convert and store
		  var out = new Uint8Array(ctx.outlen);
		  for (var i = 0; i < ctx.outlen; i++) {
		    out[i] = ctx.h[i >> 2] >> (8 * (i & 3));
		  }
		  return out
		}

		// Computes the BLAKE2B hash of a string or byte array, and returns a Uint8Array
		//
		// Returns a n-byte Uint8Array
		//
		// Parameters:
		// - input - the input bytes, as a string, Buffer or Uint8Array
		// - key - optional key Uint8Array, up to 64 bytes
		// - outlen - optional output length in bytes, default 64
		function blake2b (input, key, outlen) {
		  // preprocess inputs
		  outlen = outlen || 64;
		  input = util.normalizeInput(input);

		  // do the math
		  var ctx = blake2bInit(outlen, key);
		  blake2bUpdate(ctx, input);
		  return blake2bFinal(ctx)
		}

		// Computes the BLAKE2B hash of a string or byte array
		//
		// Returns an n-byte hash in hex, all lowercase
		//
		// Parameters:
		// - input - the input bytes, as a string, Buffer, or Uint8Array
		// - key - optional key Uint8Array, up to 64 bytes
		// - outlen - optional output length in bytes, default 64
		function blake2bHex (input, key, outlen) {
		  var output = blake2b(input, key, outlen);
		  return util.toHex(output)
		}

		var blake2b_1 = {
		  blake2b: blake2b,
		  blake2bHex: blake2bHex,
		  blake2bInit: blake2bInit,
		  blake2bUpdate: blake2bUpdate,
		  blake2bFinal: blake2bFinal
		};

		// BLAKE2s hash function in pure Javascript
		// Adapted from the reference implementation in RFC7693
		// Ported to Javascript by DC - https://github.com/dcposch



		// Little-endian byte access.
		// Expects a Uint8Array and an index
		// Returns the little-endian uint32 at v[i..i+3]
		function B2S_GET32 (v, i) {
		  return v[i] ^ (v[i + 1] << 8) ^ (v[i + 2] << 16) ^ (v[i + 3] << 24)
		}

		// Mixing function G.
		function B2S_G (a, b, c, d, x, y) {
		  v$1[a] = v$1[a] + v$1[b] + x;
		  v$1[d] = ROTR32(v$1[d] ^ v$1[a], 16);
		  v$1[c] = v$1[c] + v$1[d];
		  v$1[b] = ROTR32(v$1[b] ^ v$1[c], 12);
		  v$1[a] = v$1[a] + v$1[b] + y;
		  v$1[d] = ROTR32(v$1[d] ^ v$1[a], 8);
		  v$1[c] = v$1[c] + v$1[d];
		  v$1[b] = ROTR32(v$1[b] ^ v$1[c], 7);
		}

		// 32-bit right rotation
		// x should be a uint32
		// y must be between 1 and 31, inclusive
		function ROTR32 (x, y) {
		  return (x >>> y) ^ (x << (32 - y))
		}

		// Initialization Vector.
		var BLAKE2S_IV = new Uint32Array([
		  0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
		  0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19]);

		var SIGMA = new Uint8Array([
		  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
		  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
		  11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
		  7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
		  9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
		  2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
		  12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
		  13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
		  6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
		  10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0]);

		// Compression function. "last" flag indicates last block
		var v$1 = new Uint32Array(16);
		var m$1 = new Uint32Array(16);
		function blake2sCompress (ctx, last) {
		  var i = 0;
		  for (i = 0; i < 8; i++) { // init work variables
		    v$1[i] = ctx.h[i];
		    v$1[i + 8] = BLAKE2S_IV[i];
		  }

		  v$1[12] ^= ctx.t; // low 32 bits of offset
		  v$1[13] ^= (ctx.t / 0x100000000); // high 32 bits
		  if (last) { // last block flag set ?
		    v$1[14] = ~v$1[14];
		  }

		  for (i = 0; i < 16; i++) { // get little-endian words
		    m$1[i] = B2S_GET32(ctx.b, 4 * i);
		  }

		  // ten rounds of mixing
		  // uncomment the DebugPrint calls to log the computation
		  // and match the RFC sample documentation
		  // util.debugPrint('          m[16]', m, 32)
		  for (i = 0; i < 10; i++) {
		    // util.debugPrint('   (i=' + i + ')  v[16]', v, 32)
		    B2S_G(0, 4, 8, 12, m$1[SIGMA[i * 16 + 0]], m$1[SIGMA[i * 16 + 1]]);
		    B2S_G(1, 5, 9, 13, m$1[SIGMA[i * 16 + 2]], m$1[SIGMA[i * 16 + 3]]);
		    B2S_G(2, 6, 10, 14, m$1[SIGMA[i * 16 + 4]], m$1[SIGMA[i * 16 + 5]]);
		    B2S_G(3, 7, 11, 15, m$1[SIGMA[i * 16 + 6]], m$1[SIGMA[i * 16 + 7]]);
		    B2S_G(0, 5, 10, 15, m$1[SIGMA[i * 16 + 8]], m$1[SIGMA[i * 16 + 9]]);
		    B2S_G(1, 6, 11, 12, m$1[SIGMA[i * 16 + 10]], m$1[SIGMA[i * 16 + 11]]);
		    B2S_G(2, 7, 8, 13, m$1[SIGMA[i * 16 + 12]], m$1[SIGMA[i * 16 + 13]]);
		    B2S_G(3, 4, 9, 14, m$1[SIGMA[i * 16 + 14]], m$1[SIGMA[i * 16 + 15]]);
		  }
		  // util.debugPrint('   (i=10) v[16]', v, 32)

		  for (i = 0; i < 8; i++) {
		    ctx.h[i] ^= v$1[i] ^ v$1[i + 8];
		  }
		  // util.debugPrint('h[8]', ctx.h, 32)
		}

		// Creates a BLAKE2s hashing context
		// Requires an output length between 1 and 32 bytes
		// Takes an optional Uint8Array key
		function blake2sInit (outlen, key) {
		  if (!(outlen > 0 && outlen <= 32)) {
		    throw new Error('Incorrect output length, should be in [1, 32]')
		  }
		  var keylen = key ? key.length : 0;
		  if (key && !(keylen > 0 && keylen <= 32)) {
		    throw new Error('Incorrect key length, should be in [1, 32]')
		  }

		  var ctx = {
		    h: new Uint32Array(BLAKE2S_IV), // hash state
		    b: new Uint32Array(64), // input block
		    c: 0, // pointer within block
		    t: 0, // input count
		    outlen: outlen // output length in bytes
		  };
		  ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen;

		  if (keylen > 0) {
		    blake2sUpdate(ctx, key);
		    ctx.c = 64; // at the end
		  }

		  return ctx
		}

		// Updates a BLAKE2s streaming hash
		// Requires hash context and Uint8Array (byte array)
		function blake2sUpdate (ctx, input) {
		  for (var i = 0; i < input.length; i++) {
		    if (ctx.c === 64) { // buffer full ?
		      ctx.t += ctx.c; // add counters
		      blake2sCompress(ctx, false); // compress (not last)
		      ctx.c = 0; // counter to zero
		    }
		    ctx.b[ctx.c++] = input[i];
		  }
		}

		// Completes a BLAKE2s streaming hash
		// Returns a Uint8Array containing the message digest
		function blake2sFinal (ctx) {
		  ctx.t += ctx.c; // mark last block offset
		  while (ctx.c < 64) { // fill up with zeros
		    ctx.b[ctx.c++] = 0;
		  }
		  blake2sCompress(ctx, true); // final block flag = 1

		  // little endian convert and store
		  var out = new Uint8Array(ctx.outlen);
		  for (var i = 0; i < ctx.outlen; i++) {
		    out[i] = (ctx.h[i >> 2] >> (8 * (i & 3))) & 0xFF;
		  }
		  return out
		}

		// Computes the BLAKE2S hash of a string or byte array, and returns a Uint8Array
		//
		// Returns a n-byte Uint8Array
		//
		// Parameters:
		// - input - the input bytes, as a string, Buffer, or Uint8Array
		// - key - optional key Uint8Array, up to 32 bytes
		// - outlen - optional output length in bytes, default 64
		function blake2s (input, key, outlen) {
		  // preprocess inputs
		  outlen = outlen || 32;
		  input = util.normalizeInput(input);

		  // do the math
		  var ctx = blake2sInit(outlen, key);
		  blake2sUpdate(ctx, input);
		  return blake2sFinal(ctx)
		}

		// Computes the BLAKE2S hash of a string or byte array
		//
		// Returns an n-byte hash in hex, all lowercase
		//
		// Parameters:
		// - input - the input bytes, as a string, Buffer, or Uint8Array
		// - key - optional key Uint8Array, up to 32 bytes
		// - outlen - optional output length in bytes, default 64
		function blake2sHex (input, key, outlen) {
		  var output = blake2s(input, key, outlen);
		  return util.toHex(output)
		}

		var blake2s_1 = {
		  blake2s: blake2s,
		  blake2sHex: blake2sHex,
		  blake2sInit: blake2sInit,
		  blake2sUpdate: blake2sUpdate,
		  blake2sFinal: blake2sFinal
		};

		var blakejs = {
		  blake2b: blake2b_1.blake2b,
		  blake2bHex: blake2b_1.blake2bHex,
		  blake2bInit: blake2b_1.blake2bInit,
		  blake2bUpdate: blake2b_1.blake2bUpdate,
		  blake2bFinal: blake2b_1.blake2bFinal,
		  blake2s: blake2s_1.blake2s,
		  blake2sHex: blake2s_1.blake2sHex,
		  blake2sInit: blake2s_1.blake2sInit,
		  blake2sUpdate: blake2s_1.blake2sUpdate,
		  blake2sFinal: blake2s_1.blake2sFinal
		};

		var blake2b$1 = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Blake2b = void 0;

		/**
		 * Class to help with Blake2B Signature scheme.
		 */
		class Blake2b {
		    /**
		     * Perform Sum 256 on the data.
		     * @param data The data to operate on.
		     * @returns The sum 256 of the data.
		     */
		    static sum256(data) {
		        return Buffer.from(blakejs.blake2b(data, undefined, Blake2b.SIZE_256));
		    }
		}
		exports.Blake2b = Blake2b;
		/**
		 * Blake2b 256.
		 */
		Blake2b.SIZE_256 = 32;

		});

		var ed25519 = createCommonjsModule(function (module, exports) {
		var __createBinding = (commonjsGlobal$1 && commonjsGlobal$1.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __setModuleDefault = (commonjsGlobal$1 && commonjsGlobal$1.__setModuleDefault) || (Object.create ? (function(o, v) {
		    Object.defineProperty(o, "default", { enumerable: true, value: v });
		}) : function(o, v) {
		    o["default"] = v;
		});
		var __importStar = (commonjsGlobal$1 && commonjsGlobal$1.__importStar) || function (mod) {
		    if (mod && mod.__esModule) return mod;
		    var result = {};
		    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		    __setModuleDefault(result, mod);
		    return result;
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Ed25519 = void 0;
		const nacl = __importStar(naclFast);

		/**
		 * Class to help with Ed25519 Signature scheme.
		 */
		class Ed25519 {
		    /**
		     * Privately sign the data.
		     * @param privateKey The private key to sign with.
		     * @param data The data to sign.
		     * @returns The signature.
		     */
		    static signData(privateKey, data) {
		        return Buffer.from(nacl.sign.detached(data, Buffer.from(privateKey, "hex"))).toString("hex");
		    }
		    /**
		     * Use the public key and signature to validate the data.
		     * @param publicKey The public key to verify with.
		     * @param signature The signature to verify.
		     * @param data The data to verify.
		     * @returns True if the data and address is verified.
		     */
		    static verifyData(publicKey, signature, data) {
		        return nacl.sign.detached.verify(data, Buffer.from(signature, "hex"), Buffer.from(publicKey, "hex"));
		    }
		    /**
		     * Convert the public key to an address.
		     * @param publicKey The public key to convert.
		     * @returns The address.
		     */
		    static publicKeyToAddress(publicKey) {
		        return blake2b$1.Blake2b.sum256(Buffer.from(publicKey, "hex")).toString("hex");
		    }
		    /**
		     * Use the public key to validate the address.
		     * @param publicKey The public key to verify with.
		     * @param address The address to verify.
		     * @returns True if the data and address is verified.
		     */
		    static verifyAddress(publicKey, address) {
		        const addressFromPublicKey = Ed25519.publicKeyToAddress(publicKey);
		        return addressFromPublicKey === address;
		    }
		}
		exports.Ed25519 = Ed25519;
		/**
		 * Version for signature scheme.
		 */
		Ed25519.VERSION = 1;
		/**
		 * Public Key size.
		 */
		Ed25519.PUBLIC_KEY_SIZE = 32;
		/**
		 * Signature size for signing scheme.
		 */
		Ed25519.SIGNATURE_SIZE = 64;
		/**
		 * Address size.
		 */
		Ed25519.ADDRESS_LENGTH = blake2b$1.Blake2b.SIZE_256;

		});

		var common = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.isHex = exports.ARRAY_LENGTH = exports.STRING_LENGTH = exports.SMALL_TYPE_LENGTH = exports.TYPE_LENGTH = exports.TRANSACTION_ID_LENGTH = exports.MESSAGE_ID_LENGTH = exports.UINT64_SIZE = exports.UINT32_SIZE = exports.UINT16_SIZE = exports.BYTE_SIZE = void 0;

		exports.BYTE_SIZE = 1;
		exports.UINT16_SIZE = 2;
		exports.UINT32_SIZE = 4;
		exports.UINT64_SIZE = 8;
		exports.MESSAGE_ID_LENGTH = blake2b$1.Blake2b.SIZE_256;
		exports.TRANSACTION_ID_LENGTH = blake2b$1.Blake2b.SIZE_256;
		exports.TYPE_LENGTH = exports.UINT32_SIZE;
		exports.SMALL_TYPE_LENGTH = exports.BYTE_SIZE;
		exports.STRING_LENGTH = exports.UINT16_SIZE;
		exports.ARRAY_LENGTH = exports.UINT16_SIZE;
		/**
		 * Is the data hex format.
		 * @param value The value to test.
		 * @returns true if the string is hex.
		 */
		function isHex(value) {
		    if (value.length % 2 === 1) {
		        return false;
		    }
		    return /[\da-f]/gi.test(value);
		}
		exports.isHex = isHex;

		});

		var address = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.serializeEd25519Address = exports.deserializeEd25519Address = exports.serializeAddress = exports.deserializeAddress = exports.MIN_ED25519_ADDRESS_LENGTH = exports.MIN_ADDRESS_LENGTH = void 0;


		exports.MIN_ADDRESS_LENGTH = common.SMALL_TYPE_LENGTH;
		exports.MIN_ED25519_ADDRESS_LENGTH = exports.MIN_ADDRESS_LENGTH + ed25519.Ed25519.ADDRESS_LENGTH;
		/**
		 * Deserialize the address from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeAddress(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_ADDRESS_LENGTH)) {
		        throw new Error(`Address data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_ADDRESS_LENGTH}`);
		    }
		    const type = readBuffer.readByte("address.type", false);
		    let address;
		    if (type === 1) {
		        address = deserializeEd25519Address(readBuffer);
		    }
		    else {
		        throw new Error(`Unrecognized address type ${type}`);
		    }
		    return address;
		}
		exports.deserializeAddress = deserializeAddress;
		/**
		 * Serialize the address to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeAddress(writeBuffer, object) {
		    if (object.type === 1) {
		        serializeEd25519Address(writeBuffer, object);
		    }
		    else {
		        throw new Error(`Unrecognized address type ${object.type}`);
		    }
		}
		exports.serializeAddress = serializeAddress;
		/**
		 * Deserialize the Ed25519 address from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeEd25519Address(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_ED25519_ADDRESS_LENGTH)) {
		        throw new Error(`Ed25519 address data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_ED25519_ADDRESS_LENGTH}`);
		    }
		    const type = readBuffer.readByte("ed25519Address.type");
		    if (type !== 1) {
		        throw new Error(`Type mismatch in ed25519Address ${type}`);
		    }
		    const address = readBuffer.readFixedBufferHex("ed25519Address.address", ed25519.Ed25519.ADDRESS_LENGTH);
		    return {
		        type,
		        address
		    };
		}
		exports.deserializeEd25519Address = deserializeEd25519Address;
		/**
		 * Serialize the ed25519 address to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeEd25519Address(writeBuffer, object) {
		    writeBuffer.writeByte("ed25519Address.type", object.type);
		    writeBuffer.writeFixedBufferHex("ed25519Address.address", ed25519.Ed25519.ADDRESS_LENGTH, object.address);
		}
		exports.serializeEd25519Address = serializeEd25519Address;

		});

		var input = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.serializeUTXOInput = exports.deserializeUTXOInput = exports.serializeInput = exports.deserializeInput = exports.serializeInputs = exports.deserializeInputs = exports.MIN_UTXO_INPUT_LENGTH = exports.MIN_INPUT_LENGTH = void 0;

		exports.MIN_INPUT_LENGTH = common.SMALL_TYPE_LENGTH;
		exports.MIN_UTXO_INPUT_LENGTH = exports.MIN_INPUT_LENGTH + common.TRANSACTION_ID_LENGTH + common.UINT16_SIZE;
		/**
		 * Deserialize the inputs from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeInputs(readBuffer) {
		    const numInputs = readBuffer.readUInt16("inputs.numInputs");
		    const inputs = [];
		    for (let i = 0; i < numInputs; i++) {
		        inputs.push(deserializeInput(readBuffer));
		    }
		    return inputs;
		}
		exports.deserializeInputs = deserializeInputs;
		/**
		 * Serialize the inputs to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param objects The objects to serialize.
		 */
		function serializeInputs(writeBuffer, objects) {
		    writeBuffer.writeUInt16("inputs.numInputs", objects.length);
		    for (let i = 0; i < objects.length; i++) {
		        serializeInput(writeBuffer, objects[i]);
		    }
		}
		exports.serializeInputs = serializeInputs;
		/**
		 * Deserialize the input from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeInput(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_INPUT_LENGTH)) {
		        throw new Error(`Input data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_INPUT_LENGTH}`);
		    }
		    const type = readBuffer.readByte("input.type", false);
		    let input;
		    if (type === 0) {
		        input = deserializeUTXOInput(readBuffer);
		    }
		    else {
		        throw new Error(`Unrecognized input type ${type}`);
		    }
		    return input;
		}
		exports.deserializeInput = deserializeInput;
		/**
		 * Serialize the input to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeInput(writeBuffer, object) {
		    if (object.type === 0) {
		        serializeUTXOInput(writeBuffer, object);
		    }
		    else {
		        throw new Error(`Unrecognized input type ${object.type}`);
		    }
		}
		exports.serializeInput = serializeInput;
		/**
		 * Deserialize the utxo input from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeUTXOInput(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_UTXO_INPUT_LENGTH)) {
		        throw new Error(`UTXO Input data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_UTXO_INPUT_LENGTH}`);
		    }
		    const type = readBuffer.readByte("utxoInput.type");
		    if (type !== 0) {
		        throw new Error(`Type mismatch in utxoInput ${type}`);
		    }
		    const transactionId = readBuffer.readFixedBufferHex("utxoInput.transactionId", common.TRANSACTION_ID_LENGTH);
		    const transactionOutputIndex = readBuffer.readUInt16("utxoInput.transactionOutputIndex");
		    return {
		        type,
		        transactionId,
		        transactionOutputIndex
		    };
		}
		exports.deserializeUTXOInput = deserializeUTXOInput;
		/**
		 * Serialize the utxo input to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeUTXOInput(writeBuffer, object) {
		    writeBuffer.writeByte("utxoInput.type", object.type);
		    writeBuffer.writeFixedBufferHex("utxoInput.transactionId", common.TRANSACTION_ID_LENGTH, object.transactionId);
		    writeBuffer.writeUInt16("utxoInput.transactionOutputIndex", object.transactionOutputIndex);
		}
		exports.serializeUTXOInput = serializeUTXOInput;

		});

		var output = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.serializeSigLockedSingleOutput = exports.deserializeSigLockedSingleOutput = exports.serializeOutput = exports.deserializeOutput = exports.serializeOutputs = exports.deserializeOutputs = exports.MIN_SIG_LOCKED_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH = void 0;


		exports.MIN_OUTPUT_LENGTH = common.SMALL_TYPE_LENGTH;
		exports.MIN_SIG_LOCKED_OUTPUT_LENGTH = exports.MIN_OUTPUT_LENGTH + address.MIN_ADDRESS_LENGTH + address.MIN_ED25519_ADDRESS_LENGTH;
		/**
		 * Deserialize the outputs from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeOutputs(readBuffer) {
		    const numOutputs = readBuffer.readUInt16("outputs.numOutputs");
		    const inputs = [];
		    for (let i = 0; i < numOutputs; i++) {
		        inputs.push(deserializeOutput(readBuffer));
		    }
		    return inputs;
		}
		exports.deserializeOutputs = deserializeOutputs;
		/**
		 * Serialize the outputs to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param objects The objects to serialize.
		 */
		function serializeOutputs(writeBuffer, objects) {
		    writeBuffer.writeUInt16("outputs.numOutputs", objects.length);
		    for (let i = 0; i < objects.length; i++) {
		        serializeOutput(writeBuffer, objects[i]);
		    }
		}
		exports.serializeOutputs = serializeOutputs;
		/**
		 * Deserialize the output from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeOutput(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_OUTPUT_LENGTH)) {
		        throw new Error(`Output data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_OUTPUT_LENGTH}`);
		    }
		    const type = readBuffer.readByte("output.type", false);
		    let input;
		    if (type === 0) {
		        input = deserializeSigLockedSingleOutput(readBuffer);
		    }
		    else {
		        throw new Error(`Unrecognized output type ${type}`);
		    }
		    return input;
		}
		exports.deserializeOutput = deserializeOutput;
		/**
		 * Serialize the output to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeOutput(writeBuffer, object) {
		    if (object.type === 0) {
		        serializeSigLockedSingleOutput(writeBuffer, object);
		    }
		    else {
		        throw new Error(`Unrecognized output type ${object.type}`);
		    }
		}
		exports.serializeOutput = serializeOutput;
		/**
		 * Deserialize the signature locked single output from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeSigLockedSingleOutput(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_SIG_LOCKED_OUTPUT_LENGTH)) {
		        throw new Error(`Signature Locked Single Output data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_SIG_LOCKED_OUTPUT_LENGTH}`);
		    }
		    const type = readBuffer.readByte("sigLockedSingleOutput.type");
		    if (type !== 0) {
		        throw new Error(`Type mismatch in sigLockedSingleOutput ${type}`);
		    }
		    const address$1 = address.deserializeAddress(readBuffer);
		    const amount = readBuffer.readUInt64("sigLockedSingleOutput.amount");
		    return {
		        type,
		        address: address$1,
		        amount: Number(amount)
		    };
		}
		exports.deserializeSigLockedSingleOutput = deserializeSigLockedSingleOutput;
		/**
		 * Serialize the signature locked single output to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeSigLockedSingleOutput(writeBuffer, object) {
		    writeBuffer.writeByte("sigLockedSingleOutput.type", object.type);
		    address.serializeAddress(writeBuffer, object.address);
		    writeBuffer.writeUInt64("sigLockedSingleOutput.amount", BigInt(object.amount));
		}
		exports.serializeSigLockedSingleOutput = serializeSigLockedSingleOutput;

		});

		var transaction = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.serializeTransactionEssence = exports.deserializeTransactionEssence = exports.MIN_TRANSACTION_ESSENCE_LENGTH = void 0;




		exports.MIN_TRANSACTION_ESSENCE_LENGTH = common.UINT32_SIZE + (2 * common.ARRAY_LENGTH) + common.UINT32_SIZE;
		/**
		 * Deserialize the transaction essence from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeTransactionEssence(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_TRANSACTION_ESSENCE_LENGTH)) {
		        throw new Error(`Transaction essence data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_TRANSACTION_ESSENCE_LENGTH}`);
		    }
		    const type = readBuffer.readUInt32("transactionEssence.type");
		    if (type !== 0) {
		        throw new Error(`Type mismatch in transactionEssence ${type}`);
		    }
		    const inputs = input.deserializeInputs(readBuffer);
		    const outputs = output.deserializeOutputs(readBuffer);
		    const payload$1 = payload.deserializePayload(readBuffer);
		    if (payload$1 && payload$1.type !== 2) {
		        throw new Error("Transaction essence can only contain embedded Indexation Payload");
		    }
		    return {
		        type,
		        inputs,
		        outputs,
		        payload: payload$1
		    };
		}
		exports.deserializeTransactionEssence = deserializeTransactionEssence;
		/**
		 * Serialize the transaction essence to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeTransactionEssence(writeBuffer, object) {
		    writeBuffer.writeUInt32("transactionEssence.type", object.type);
		    input.serializeInputs(writeBuffer, object.inputs);
		    output.serializeOutputs(writeBuffer, object.outputs);
		    payload.serializePayload(writeBuffer, object.payload);
		}
		exports.serializeTransactionEssence = serializeTransactionEssence;

		});

		var signature = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.serializeEd25519Signature = exports.deserializeEd25519Signature = exports.serializeSignature = exports.deserializeSignature = exports.MIN_ED25519_SIGNATURE_LENGTH = exports.MIN_SIGNATURE_LENGTH = void 0;


		exports.MIN_SIGNATURE_LENGTH = common.SMALL_TYPE_LENGTH;
		exports.MIN_ED25519_SIGNATURE_LENGTH = exports.MIN_SIGNATURE_LENGTH + ed25519.Ed25519.SIGNATURE_SIZE + ed25519.Ed25519.PUBLIC_KEY_SIZE;
		/**
		 * Deserialize the signature from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeSignature(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_SIGNATURE_LENGTH)) {
		        throw new Error(`Signature data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_SIGNATURE_LENGTH}`);
		    }
		    const type = readBuffer.readByte("signature.type", false);
		    let input;
		    if (type === 1) {
		        input = deserializeEd25519Signature(readBuffer);
		    }
		    else {
		        throw new Error(`Unrecognized signature type ${type}`);
		    }
		    return input;
		}
		exports.deserializeSignature = deserializeSignature;
		/**
		 * Serialize the signature to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeSignature(writeBuffer, object) {
		    if (object.type === 1) {
		        serializeEd25519Signature(writeBuffer, object);
		    }
		    else {
		        throw new Error(`Unrecognized signature type ${object.type}`);
		    }
		}
		exports.serializeSignature = serializeSignature;
		/**
		 * Deserialize the Ed25519 signature from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeEd25519Signature(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_ED25519_SIGNATURE_LENGTH)) {
		        throw new Error(`Ed25519 signature data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_ED25519_SIGNATURE_LENGTH}`);
		    }
		    const type = readBuffer.readByte("ed25519Signature.type");
		    if (type !== 1) {
		        throw new Error(`Type mismatch in ed25519Signature ${type}`);
		    }
		    const publicKey = readBuffer.readFixedBufferHex("ed25519Signature.publicKey", ed25519.Ed25519.PUBLIC_KEY_SIZE);
		    const signature = readBuffer.readFixedBufferHex("ed25519Signature.signature", ed25519.Ed25519.SIGNATURE_SIZE);
		    return {
		        type,
		        publicKey,
		        signature
		    };
		}
		exports.deserializeEd25519Signature = deserializeEd25519Signature;
		/**
		 * Serialize the Ed25519 signature to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeEd25519Signature(writeBuffer, object) {
		    writeBuffer.writeByte("ed25519Signature.type", object.type);
		    writeBuffer.writeFixedBufferHex("ed25519Signature.publicKey", ed25519.Ed25519.PUBLIC_KEY_SIZE, object.publicKey);
		    writeBuffer.writeFixedBufferHex("ed25519Signature.signature", ed25519.Ed25519.SIGNATURE_SIZE, object.signature);
		}
		exports.serializeEd25519Signature = serializeEd25519Signature;

		});

		var unlockBlock = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.serializeReferenceUnlockBlock = exports.deserializeReferenceUnlockBlock = exports.serializeSignatureUnlockBlock = exports.deserializeSignatureUnlockBlock = exports.serializeUnlockBlock = exports.deserializeUnlockBlock = exports.serializeUnlockBlocks = exports.deserializeUnlockBlocks = exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH = void 0;


		exports.MIN_UNLOCK_BLOCK_LENGTH = common.SMALL_TYPE_LENGTH;
		exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH + signature.MIN_SIGNATURE_LENGTH;
		exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = exports.MIN_UNLOCK_BLOCK_LENGTH + common.UINT16_SIZE;
		/**
		 * Deserialize the unlock blocks from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeUnlockBlocks(readBuffer) {
		    const numUnlockBlocks = readBuffer.readUInt16("transactionEssence.numUnlockBlocks");
		    const unlockBlocks = [];
		    for (let i = 0; i < numUnlockBlocks; i++) {
		        unlockBlocks.push(deserializeUnlockBlock(readBuffer));
		    }
		    return unlockBlocks;
		}
		exports.deserializeUnlockBlocks = deserializeUnlockBlocks;
		/**
		 * Serialize the unlock blocks to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param objects The objects to serialize.
		 */
		function serializeUnlockBlocks(writeBuffer, objects) {
		    writeBuffer.writeUInt16("transactionEssence.numUnlockBlocks", objects.length);
		    for (let i = 0; i < objects.length; i++) {
		        serializeUnlockBlock(writeBuffer, objects[i]);
		    }
		}
		exports.serializeUnlockBlocks = serializeUnlockBlocks;
		/**
		 * Deserialize the unlock block from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeUnlockBlock(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_UNLOCK_BLOCK_LENGTH)) {
		        throw new Error(`Unlock Block data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_UNLOCK_BLOCK_LENGTH}`);
		    }
		    const type = readBuffer.readByte("unlockBlock.type", false);
		    let unlockBlock;
		    if (type === 0) {
		        unlockBlock = deserializeSignatureUnlockBlock(readBuffer);
		    }
		    else if (type === 1) {
		        unlockBlock = deserializeReferenceUnlockBlock(readBuffer);
		    }
		    else {
		        throw new Error(`Unrecognized unlock block type ${type}`);
		    }
		    return unlockBlock;
		}
		exports.deserializeUnlockBlock = deserializeUnlockBlock;
		/**
		 * Serialize the unlock block to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeUnlockBlock(writeBuffer, object) {
		    if (object.type === 0) {
		        serializeSignatureUnlockBlock(writeBuffer, object);
		    }
		    else if (object.type === 1) {
		        serializeReferenceUnlockBlock(writeBuffer, object);
		    }
		    else {
		        throw new Error(`Unrecognized unlock block type ${object.type}`);
		    }
		}
		exports.serializeUnlockBlock = serializeUnlockBlock;
		/**
		 * Deserialize the signature unlock block from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeSignatureUnlockBlock(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH)) {
		        throw new Error(`Signature Unlock Block data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH}`);
		    }
		    const type = readBuffer.readByte("signatureUnlockBlock.type");
		    if (type !== 0) {
		        throw new Error(`Type mismatch in signatureUnlockBlock ${type}`);
		    }
		    const signature$1 = signature.deserializeSignature(readBuffer);
		    return {
		        type,
		        signature: signature$1
		    };
		}
		exports.deserializeSignatureUnlockBlock = deserializeSignatureUnlockBlock;
		/**
		 * Serialize the signature unlock block to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeSignatureUnlockBlock(writeBuffer, object) {
		    writeBuffer.writeByte("signatureUnlockBlock.type", object.type);
		    signature.serializeSignature(writeBuffer, object.signature);
		}
		exports.serializeSignatureUnlockBlock = serializeSignatureUnlockBlock;
		/**
		 * Deserialize the reference unlock block from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeReferenceUnlockBlock(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH)) {
		        throw new Error(`Reference Unlock Block data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH}`);
		    }
		    const type = readBuffer.readByte("referenceUnlockBlock.type");
		    if (type !== 1) {
		        throw new Error(`Type mismatch in referenceUnlockBlock ${type}`);
		    }
		    const reference = readBuffer.readUInt16("referenceUnlockBlock.reference");
		    return {
		        type,
		        reference
		    };
		}
		exports.deserializeReferenceUnlockBlock = deserializeReferenceUnlockBlock;
		/**
		 * Serialize the reference unlock block to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeReferenceUnlockBlock(writeBuffer, object) {
		    writeBuffer.writeByte("referenceUnlockBlock.type", object.type);
		    writeBuffer.writeUInt16("referenceUnlockBlock.reference", object.reference);
		}
		exports.serializeReferenceUnlockBlock = serializeReferenceUnlockBlock;

		});

		var payload = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.serializeIndexationPayload = exports.deserializeIndexationPayload = exports.serializeMilestonePayload = exports.deserializeMilestonePayload = exports.serializeTransactionPayload = exports.deserializeTransactionPayload = exports.serializePayload = exports.deserializePayload = exports.MIN_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_INDEXATION_PAYLOAD_LENGTH = exports.MIN_MILESTONE_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH = void 0;



		exports.MIN_PAYLOAD_LENGTH = common.TYPE_LENGTH;
		exports.MIN_MILESTONE_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH + (2 * common.UINT64_SIZE) + 64 + common.BYTE_SIZE;
		exports.MIN_INDEXATION_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH + common.STRING_LENGTH + common.STRING_LENGTH;
		exports.MIN_TRANSACTION_PAYLOAD_LENGTH = exports.MIN_PAYLOAD_LENGTH + common.UINT32_SIZE;
		/**
		 * Deserialize the payload from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializePayload(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_PAYLOAD_LENGTH)) {
		        throw new Error(`Payload data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_PAYLOAD_LENGTH}`);
		    }
		    const payloadLength = readBuffer.readUInt32("payload.length");
		    if (!readBuffer.hasRemaining(payloadLength)) {
		        throw new Error(`Payload length ${payloadLength} exceeds the remaining data ${readBuffer.unused()}`);
		    }
		    let payload;
		    if (payloadLength > 0) {
		        const payloadType = readBuffer.readUInt32("payload.type", false);
		        if (payloadType === 0) {
		            payload = deserializeTransactionPayload(readBuffer);
		        }
		        else if (payloadType === 1) {
		            payload = deserializeMilestonePayload(readBuffer);
		        }
		        else if (payloadType === 2) {
		            payload = deserializeIndexationPayload(readBuffer);
		        }
		        else {
		            throw new Error(`Unrecognized payload type ${payloadType}`);
		        }
		    }
		    return payload;
		}
		exports.deserializePayload = deserializePayload;
		/**
		 * Serialize the payload essence to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializePayload(writeBuffer, object) {
		    // Store the location for the payload length and write 0
		    // we will rewind and fill in once the size of the payload is known
		    const payloadLengthWriteIndex = writeBuffer.getWriteIndex();
		    writeBuffer.writeUInt32("payload.length", 0);
		    if (!object) ;
		    else if (object.type === 0) {
		        serializeTransactionPayload(writeBuffer, object);
		    }
		    else if (object.type === 1) {
		        serializeMilestonePayload(writeBuffer, object);
		    }
		    else if (object.type === 2) {
		        serializeIndexationPayload(writeBuffer, object);
		    }
		    else {
		        throw new Error(`Unrecognized transaction type ${object.type}`);
		    }
		    const endOfPayloadWriteIndex = writeBuffer.getWriteIndex();
		    writeBuffer.setWriteIndex(payloadLengthWriteIndex);
		    writeBuffer.writeUInt32("payload.length", endOfPayloadWriteIndex - payloadLengthWriteIndex - common.UINT32_SIZE);
		    writeBuffer.setWriteIndex(endOfPayloadWriteIndex);
		}
		exports.serializePayload = serializePayload;
		/**
		 * Deserialize the transaction payload from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeTransactionPayload(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_TRANSACTION_PAYLOAD_LENGTH)) {
		        throw new Error(`Transaction Payload data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_TRANSACTION_PAYLOAD_LENGTH}`);
		    }
		    const type = readBuffer.readUInt32("payloadTransaction.type");
		    if (type !== 0) {
		        throw new Error(`Type mismatch in payloadTransaction ${type}`);
		    }
		    const essenceType = readBuffer.readUInt32("payloadTransaction.essenceType", false);
		    let essence;
		    let unlockBlocks;
		    if (essenceType === 0) {
		        essence = transaction.deserializeTransactionEssence(readBuffer);
		        unlockBlocks = unlockBlock.deserializeUnlockBlocks(readBuffer);
		    }
		    else {
		        throw new Error(`Unrecognized transaction essence type ${type}`);
		    }
		    return {
		        type,
		        essence,
		        unlockBlocks
		    };
		}
		exports.deserializeTransactionPayload = deserializeTransactionPayload;
		/**
		 * Serialize the transaction payload essence to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeTransactionPayload(writeBuffer, object) {
		    writeBuffer.writeUInt32("payloadMilestone.type", object.type);
		    if (object.type === 0) {
		        transaction.serializeTransactionEssence(writeBuffer, object.essence);
		        unlockBlock.serializeUnlockBlocks(writeBuffer, object.unlockBlocks);
		    }
		    else {
		        throw new Error(`Unrecognized transaction type ${object.type}`);
		    }
		}
		exports.serializeTransactionPayload = serializeTransactionPayload;
		/**
		 * Deserialize the milestone payload from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeMilestonePayload(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_MILESTONE_PAYLOAD_LENGTH)) {
		        throw new Error(`Milestone Payload data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_MILESTONE_PAYLOAD_LENGTH}`);
		    }
		    const type = readBuffer.readUInt32("payloadMilestone.type");
		    if (type !== 1) {
		        throw new Error(`Type mismatch in payloadMilestone ${type}`);
		    }
		    const index = readBuffer.readUInt64("payloadMilestone.index");
		    const timestamp = readBuffer.readUInt64("payloadMilestone.timestamp");
		    const inclusionMerkleProof = readBuffer.readFixedBufferHex("payloadMilestone.inclusionMerkleProof", 64);
		    const signaturesCount = readBuffer.readByte("payloadMilestone.signaturesCount");
		    const signatures = [];
		    for (let i = 0; i < signaturesCount; i++) {
		        signatures.push(readBuffer.readFixedBufferHex("payloadMilestone.signature", 64));
		    }
		    return {
		        type,
		        index: Number(index),
		        timestamp: Number(timestamp),
		        inclusionMerkleProof,
		        signatures
		    };
		}
		exports.deserializeMilestonePayload = deserializeMilestonePayload;
		/**
		 * Serialize the milestone payload essence to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeMilestonePayload(writeBuffer, object) {
		    writeBuffer.writeUInt32("payloadMilestone.type", object.type);
		    writeBuffer.writeUInt64("payloadMilestone.index", BigInt(object.index));
		    writeBuffer.writeUInt64("payloadMilestone.timestamp", BigInt(object.timestamp));
		    writeBuffer.writeFixedBufferHex("payloadMilestone.inclusionMerkleProof", 64, object.inclusionMerkleProof);
		    writeBuffer.writeByte("payloadMilestone.signaturesCount", object.signatures.length);
		    for (let i = 0; i < object.signatures.length; i++) {
		        writeBuffer.writeFixedBufferHex("payloadMilestone.signature", 64, object.signatures[i]);
		    }
		}
		exports.serializeMilestonePayload = serializeMilestonePayload;
		/**
		 * Deserialize the indexation payload from binary.
		 * @param readBuffer The buffer to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeIndexationPayload(readBuffer) {
		    if (!readBuffer.hasRemaining(exports.MIN_INDEXATION_PAYLOAD_LENGTH)) {
		        throw new Error(`Indexation Payload data is ${readBuffer.length()} in length which is less than the minimimum size required of ${exports.MIN_INDEXATION_PAYLOAD_LENGTH}`);
		    }
		    const type = readBuffer.readUInt32("payloadIndexation.type");
		    if (type !== 2) {
		        throw new Error(`Type mismatch in payloadIndexation ${type}`);
		    }
		    const index = readBuffer.readString("payloadIndexation.index");
		    const dataLength = readBuffer.readUInt32("payloadIndexation.dataLength");
		    const data = readBuffer.readFixedBufferHex("payloadIndexation.data", dataLength);
		    return {
		        type: 2,
		        index,
		        data
		    };
		}
		exports.deserializeIndexationPayload = deserializeIndexationPayload;
		/**
		 * Serialize the indexation payload essence to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeIndexationPayload(writeBuffer, object) {
		    writeBuffer.writeUInt32("payloadIndexation.type", object.type);
		    writeBuffer.writeString("payloadIndexation.index", object.index);
		    writeBuffer.writeUInt32("payloadIndexation.dataLength", object.data.length / 2);
		    writeBuffer.writeFixedBufferHex("payloadIndexation.data", object.data.length / 2, object.data);
		}
		exports.serializeIndexationPayload = serializeIndexationPayload;

		});

		var message = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.serializeMessage = exports.deserializeMessage = void 0;


		const MIN_MESSAGE_LENGTH = common.BYTE_SIZE +
		    (2 * common.MESSAGE_ID_LENGTH) +
		    payload.MIN_PAYLOAD_LENGTH +
		    common.UINT64_SIZE;
		/**
		 * Deserialize the message from binary.
		 * @param readBuffer The message to deserialize.
		 * @returns The deserialized message.
		 */
		function deserializeMessage(readBuffer) {
		    if (!readBuffer.hasRemaining(MIN_MESSAGE_LENGTH)) {
		        throw new Error(`Message data is ${readBuffer.length()} in length which is less than the minimimum size required of ${MIN_MESSAGE_LENGTH}`);
		    }
		    const version = readBuffer.readByte("message.version");
		    if (version !== 1) {
		        throw new Error(`Unsupported message version number: ${version}`);
		    }
		    const parent1MessageId = readBuffer.readFixedBufferHex("message.parent1MessageId", common.MESSAGE_ID_LENGTH);
		    const parent2MessageId = readBuffer.readFixedBufferHex("message.parent2MessageId", common.MESSAGE_ID_LENGTH);
		    const payload$1 = payload.deserializePayload(readBuffer);
		    const nonce = readBuffer.readUInt64("message.nonce");
		    const unused = readBuffer.unused();
		    if (unused !== 0) {
		        throw new Error(`Message data length ${readBuffer.length()} has unused data ${unused}`);
		    }
		    return {
		        version,
		        payload: payload$1,
		        parent1MessageId,
		        parent2MessageId,
		        nonce: Number(nonce)
		    };
		}
		exports.deserializeMessage = deserializeMessage;
		/**
		 * Serialize the message essence to binary.
		 * @param writeBuffer The buffer to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeMessage(writeBuffer, object) {
		    writeBuffer.writeByte("message.version", object.version);
		    writeBuffer.writeFixedBufferHex("message.parent1MessageId", common.MESSAGE_ID_LENGTH, object.parent1MessageId);
		    writeBuffer.writeFixedBufferHex("message.parent2MessageId", common.MESSAGE_ID_LENGTH, object.parent2MessageId);
		    payload.serializePayload(writeBuffer, object.payload);
		    writeBuffer.writeUInt64("message.nonce", BigInt(object.nonce));
		}
		exports.serializeMessage = serializeMessage;

		});

		var bip32Path = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Bip32Path = void 0;
		/**
		 * Class to help with bip32 paths.
		 */
		class Bip32Path {
		    /**
		     * Create a new instance of Bip32Path.
		     * @param initialPath Initial path to create.
		     */
		    constructor(initialPath) {
		        if (initialPath) {
		            this._path = initialPath.split("/");
		            if (this._path[0] === "m") {
		                this._path.shift();
		            }
		        }
		        else {
		            this._path = [];
		        }
		    }
		    /**
		     * Converts the path to a string.
		     * @returns The path as a string.
		     */
		    toString() {
		        return this._path.length > 0 ? `m/${this._path.join("/")}` : "m";
		    }
		    /**
		     * Push a new index on to the path.
		     * @param index The index to add to the path.
		     */
		    push(index) {
		        this._path.push(`${index}`);
		    }
		    /**
		     * Push a new hardened index on to the path.
		     * @param index The index to add to the path.
		     */
		    pushHardened(index) {
		        this._path.push(`${index}'`);
		    }
		    /**
		     * Pop an index from the path.
		     */
		    pop() {
		        this._path.pop();
		    }
		    /**
		     * Get the segments.
		     * @returns The segments as numbers.
		     */
		    numberSegments() {
		        return this._path.map(p => Number.parseInt(p, 10));
		    }
		}
		exports.Bip32Path = Bip32Path;

		});

		var inherits_browser = createCommonjsModule(function (module) {
		if (typeof Object.create === 'function') {
		  // implementation from standard node.js 'util' module
		  module.exports = function inherits(ctor, superCtor) {
		    if (superCtor) {
		      ctor.super_ = superCtor;
		      ctor.prototype = Object.create(superCtor.prototype, {
		        constructor: {
		          value: ctor,
		          enumerable: false,
		          writable: true,
		          configurable: true
		        }
		      });
		    }
		  };
		} else {
		  // old school shim for old browsers
		  module.exports = function inherits(ctor, superCtor) {
		    if (superCtor) {
		      ctor.super_ = superCtor;
		      var TempCtor = function () {};
		      TempCtor.prototype = superCtor.prototype;
		      ctor.prototype = new TempCtor();
		      ctor.prototype.constructor = ctor;
		    }
		  };
		}
		});

		var buffer_1 = /*@__PURE__*/getAugmentedNamespace(bufferEs6);

		var safeBuffer = createCommonjsModule(function (module, exports) {
		/* eslint-disable node/no-deprecated-api */

		var Buffer = buffer_1.Buffer;

		// alternative to using Object.keys for old browsers
		function copyProps (src, dst) {
		  for (var key in src) {
		    dst[key] = src[key];
		  }
		}
		if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
		  module.exports = buffer_1;
		} else {
		  // Copy properties from require('buffer')
		  copyProps(buffer_1, exports);
		  exports.Buffer = SafeBuffer;
		}

		function SafeBuffer (arg, encodingOrOffset, length) {
		  return Buffer(arg, encodingOrOffset, length)
		}

		// Copy static methods from Buffer
		copyProps(Buffer, SafeBuffer);

		SafeBuffer.from = function (arg, encodingOrOffset, length) {
		  if (typeof arg === 'number') {
		    throw new TypeError('Argument must not be a number')
		  }
		  return Buffer(arg, encodingOrOffset, length)
		};

		SafeBuffer.alloc = function (size, fill, encoding) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  var buf = Buffer(size);
		  if (fill !== undefined) {
		    if (typeof encoding === 'string') {
		      buf.fill(fill, encoding);
		    } else {
		      buf.fill(fill);
		    }
		  } else {
		    buf.fill(0);
		  }
		  return buf
		};

		SafeBuffer.allocUnsafe = function (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  return Buffer(size)
		};

		SafeBuffer.allocUnsafeSlow = function (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  return buffer_1.SlowBuffer(size)
		};
		});

		var domain;

		// This constructor is used to store event handlers. Instantiating this is
		// faster than explicitly calling `Object.create(null)` to get a "clean" empty
		// object (tested with v8 v4.9).
		function EventHandlers() {}
		EventHandlers.prototype = Object.create(null);

		function EventEmitter() {
		  EventEmitter.init.call(this);
		}

		// nodejs oddity
		// require('events') === require('events').EventEmitter
		EventEmitter.EventEmitter = EventEmitter;

		EventEmitter.usingDomains = false;

		EventEmitter.prototype.domain = undefined;
		EventEmitter.prototype._events = undefined;
		EventEmitter.prototype._maxListeners = undefined;

		// By default EventEmitters will print a warning if more than 10 listeners are
		// added to it. This is a useful default which helps finding memory leaks.
		EventEmitter.defaultMaxListeners = 10;

		EventEmitter.init = function() {
		  this.domain = null;
		  if (EventEmitter.usingDomains) {
		    // if there is an active domain, then attach to it.
		    if (domain.active ) ;
		  }

		  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
		    this._events = new EventHandlers();
		    this._eventsCount = 0;
		  }

		  this._maxListeners = this._maxListeners || undefined;
		};

		// Obviously not all Emitters should be limited to 10. This function allows
		// that to be increased. Set to zero for unlimited.
		EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
		  if (typeof n !== 'number' || n < 0 || isNaN(n))
		    throw new TypeError('"n" argument must be a positive number');
		  this._maxListeners = n;
		  return this;
		};

		function $getMaxListeners(that) {
		  if (that._maxListeners === undefined)
		    return EventEmitter.defaultMaxListeners;
		  return that._maxListeners;
		}

		EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
		  return $getMaxListeners(this);
		};

		// These standalone emit* functions are used to optimize calling of event
		// handlers for fast cases because emit() itself often has a variable number of
		// arguments and can be deoptimized because of that. These functions always have
		// the same number of arguments and thus do not get deoptimized, so the code
		// inside them can execute faster.
		function emitNone(handler, isFn, self) {
		  if (isFn)
		    handler.call(self);
		  else {
		    var len = handler.length;
		    var listeners = arrayClone(handler, len);
		    for (var i = 0; i < len; ++i)
		      listeners[i].call(self);
		  }
		}
		function emitOne(handler, isFn, self, arg1) {
		  if (isFn)
		    handler.call(self, arg1);
		  else {
		    var len = handler.length;
		    var listeners = arrayClone(handler, len);
		    for (var i = 0; i < len; ++i)
		      listeners[i].call(self, arg1);
		  }
		}
		function emitTwo(handler, isFn, self, arg1, arg2) {
		  if (isFn)
		    handler.call(self, arg1, arg2);
		  else {
		    var len = handler.length;
		    var listeners = arrayClone(handler, len);
		    for (var i = 0; i < len; ++i)
		      listeners[i].call(self, arg1, arg2);
		  }
		}
		function emitThree(handler, isFn, self, arg1, arg2, arg3) {
		  if (isFn)
		    handler.call(self, arg1, arg2, arg3);
		  else {
		    var len = handler.length;
		    var listeners = arrayClone(handler, len);
		    for (var i = 0; i < len; ++i)
		      listeners[i].call(self, arg1, arg2, arg3);
		  }
		}

		function emitMany(handler, isFn, self, args) {
		  if (isFn)
		    handler.apply(self, args);
		  else {
		    var len = handler.length;
		    var listeners = arrayClone(handler, len);
		    for (var i = 0; i < len; ++i)
		      listeners[i].apply(self, args);
		  }
		}

		EventEmitter.prototype.emit = function emit(type) {
		  var er, handler, len, args, i, events, domain;
		  var doError = (type === 'error');

		  events = this._events;
		  if (events)
		    doError = (doError && events.error == null);
		  else if (!doError)
		    return false;

		  domain = this.domain;

		  // If there is no 'error' event listener then throw.
		  if (doError) {
		    er = arguments[1];
		    if (domain) {
		      if (!er)
		        er = new Error('Uncaught, unspecified "error" event');
		      er.domainEmitter = this;
		      er.domain = domain;
		      er.domainThrown = false;
		      domain.emit('error', er);
		    } else if (er instanceof Error) {
		      throw er; // Unhandled 'error' event
		    } else {
		      // At least give some kind of context to the user
		      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
		      err.context = er;
		      throw err;
		    }
		    return false;
		  }

		  handler = events[type];

		  if (!handler)
		    return false;

		  var isFn = typeof handler === 'function';
		  len = arguments.length;
		  switch (len) {
		    // fast cases
		    case 1:
		      emitNone(handler, isFn, this);
		      break;
		    case 2:
		      emitOne(handler, isFn, this, arguments[1]);
		      break;
		    case 3:
		      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
		      break;
		    case 4:
		      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
		      break;
		    // slower
		    default:
		      args = new Array(len - 1);
		      for (i = 1; i < len; i++)
		        args[i - 1] = arguments[i];
		      emitMany(handler, isFn, this, args);
		  }

		  return true;
		};

		function _addListener(target, type, listener, prepend) {
		  var m;
		  var events;
		  var existing;

		  if (typeof listener !== 'function')
		    throw new TypeError('"listener" argument must be a function');

		  events = target._events;
		  if (!events) {
		    events = target._events = new EventHandlers();
		    target._eventsCount = 0;
		  } else {
		    // To avoid recursion in the case that type === "newListener"! Before
		    // adding it to the listeners, first emit "newListener".
		    if (events.newListener) {
		      target.emit('newListener', type,
		                  listener.listener ? listener.listener : listener);

		      // Re-assign `events` because a newListener handler could have caused the
		      // this._events to be assigned to a new object
		      events = target._events;
		    }
		    existing = events[type];
		  }

		  if (!existing) {
		    // Optimize the case of one listener. Don't need the extra array object.
		    existing = events[type] = listener;
		    ++target._eventsCount;
		  } else {
		    if (typeof existing === 'function') {
		      // Adding the second element, need to change to array.
		      existing = events[type] = prepend ? [listener, existing] :
		                                          [existing, listener];
		    } else {
		      // If we've already got an array, just append.
		      if (prepend) {
		        existing.unshift(listener);
		      } else {
		        existing.push(listener);
		      }
		    }

		    // Check for listener leak
		    if (!existing.warned) {
		      m = $getMaxListeners(target);
		      if (m && m > 0 && existing.length > m) {
		        existing.warned = true;
		        var w = new Error('Possible EventEmitter memory leak detected. ' +
		                            existing.length + ' ' + type + ' listeners added. ' +
		                            'Use emitter.setMaxListeners() to increase limit');
		        w.name = 'MaxListenersExceededWarning';
		        w.emitter = target;
		        w.type = type;
		        w.count = existing.length;
		        emitWarning(w);
		      }
		    }
		  }

		  return target;
		}
		function emitWarning(e) {
		  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
		}
		EventEmitter.prototype.addListener = function addListener(type, listener) {
		  return _addListener(this, type, listener, false);
		};

		EventEmitter.prototype.on = EventEmitter.prototype.addListener;

		EventEmitter.prototype.prependListener =
		    function prependListener(type, listener) {
		      return _addListener(this, type, listener, true);
		    };

		function _onceWrap(target, type, listener) {
		  var fired = false;
		  function g() {
		    target.removeListener(type, g);
		    if (!fired) {
		      fired = true;
		      listener.apply(target, arguments);
		    }
		  }
		  g.listener = listener;
		  return g;
		}

		EventEmitter.prototype.once = function once(type, listener) {
		  if (typeof listener !== 'function')
		    throw new TypeError('"listener" argument must be a function');
		  this.on(type, _onceWrap(this, type, listener));
		  return this;
		};

		EventEmitter.prototype.prependOnceListener =
		    function prependOnceListener(type, listener) {
		      if (typeof listener !== 'function')
		        throw new TypeError('"listener" argument must be a function');
		      this.prependListener(type, _onceWrap(this, type, listener));
		      return this;
		    };

		// emits a 'removeListener' event iff the listener was removed
		EventEmitter.prototype.removeListener =
		    function removeListener(type, listener) {
		      var list, events, position, i, originalListener;

		      if (typeof listener !== 'function')
		        throw new TypeError('"listener" argument must be a function');

		      events = this._events;
		      if (!events)
		        return this;

		      list = events[type];
		      if (!list)
		        return this;

		      if (list === listener || (list.listener && list.listener === listener)) {
		        if (--this._eventsCount === 0)
		          this._events = new EventHandlers();
		        else {
		          delete events[type];
		          if (events.removeListener)
		            this.emit('removeListener', type, list.listener || listener);
		        }
		      } else if (typeof list !== 'function') {
		        position = -1;

		        for (i = list.length; i-- > 0;) {
		          if (list[i] === listener ||
		              (list[i].listener && list[i].listener === listener)) {
		            originalListener = list[i].listener;
		            position = i;
		            break;
		          }
		        }

		        if (position < 0)
		          return this;

		        if (list.length === 1) {
		          list[0] = undefined;
		          if (--this._eventsCount === 0) {
		            this._events = new EventHandlers();
		            return this;
		          } else {
		            delete events[type];
		          }
		        } else {
		          spliceOne(list, position);
		        }

		        if (events.removeListener)
		          this.emit('removeListener', type, originalListener || listener);
		      }

		      return this;
		    };

		EventEmitter.prototype.removeAllListeners =
		    function removeAllListeners(type) {
		      var listeners, events;

		      events = this._events;
		      if (!events)
		        return this;

		      // not listening for removeListener, no need to emit
		      if (!events.removeListener) {
		        if (arguments.length === 0) {
		          this._events = new EventHandlers();
		          this._eventsCount = 0;
		        } else if (events[type]) {
		          if (--this._eventsCount === 0)
		            this._events = new EventHandlers();
		          else
		            delete events[type];
		        }
		        return this;
		      }

		      // emit removeListener for all listeners on all events
		      if (arguments.length === 0) {
		        var keys = Object.keys(events);
		        for (var i = 0, key; i < keys.length; ++i) {
		          key = keys[i];
		          if (key === 'removeListener') continue;
		          this.removeAllListeners(key);
		        }
		        this.removeAllListeners('removeListener');
		        this._events = new EventHandlers();
		        this._eventsCount = 0;
		        return this;
		      }

		      listeners = events[type];

		      if (typeof listeners === 'function') {
		        this.removeListener(type, listeners);
		      } else if (listeners) {
		        // LIFO order
		        do {
		          this.removeListener(type, listeners[listeners.length - 1]);
		        } while (listeners[0]);
		      }

		      return this;
		    };

		EventEmitter.prototype.listeners = function listeners(type) {
		  var evlistener;
		  var ret;
		  var events = this._events;

		  if (!events)
		    ret = [];
		  else {
		    evlistener = events[type];
		    if (!evlistener)
		      ret = [];
		    else if (typeof evlistener === 'function')
		      ret = [evlistener.listener || evlistener];
		    else
		      ret = unwrapListeners(evlistener);
		  }

		  return ret;
		};

		EventEmitter.listenerCount = function(emitter, type) {
		  if (typeof emitter.listenerCount === 'function') {
		    return emitter.listenerCount(type);
		  } else {
		    return listenerCount.call(emitter, type);
		  }
		};

		EventEmitter.prototype.listenerCount = listenerCount;
		function listenerCount(type) {
		  var events = this._events;

		  if (events) {
		    var evlistener = events[type];

		    if (typeof evlistener === 'function') {
		      return 1;
		    } else if (evlistener) {
		      return evlistener.length;
		    }
		  }

		  return 0;
		}

		EventEmitter.prototype.eventNames = function eventNames() {
		  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
		};

		// About 1.5x faster than the two-arg version of Array#splice().
		function spliceOne(list, index) {
		  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
		    list[i] = list[k];
		  list.pop();
		}

		function arrayClone(arr, i) {
		  var copy = new Array(i);
		  while (i--)
		    copy[i] = arr[i];
		  return copy;
		}

		function unwrapListeners(arr) {
		  var ret = new Array(arr.length);
		  for (var i = 0; i < ret.length; ++i) {
		    ret[i] = arr[i].listener || arr[i];
		  }
		  return ret;
		}

		var events = /*#__PURE__*/Object.freeze({
			__proto__: null,
			'default': EventEmitter,
			EventEmitter: EventEmitter
		});

		// shim for using process in browser
		// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

		function defaultSetTimout() {
		    throw new Error('setTimeout has not been defined');
		}
		function defaultClearTimeout () {
		    throw new Error('clearTimeout has not been defined');
		}
		var cachedSetTimeout = defaultSetTimout;
		var cachedClearTimeout = defaultClearTimeout;
		if (typeof global$1.setTimeout === 'function') {
		    cachedSetTimeout = setTimeout;
		}
		if (typeof global$1.clearTimeout === 'function') {
		    cachedClearTimeout = clearTimeout;
		}

		function runTimeout(fun) {
		    if (cachedSetTimeout === setTimeout) {
		        //normal enviroments in sane situations
		        return setTimeout(fun, 0);
		    }
		    // if setTimeout wasn't available but was latter defined
		    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
		        cachedSetTimeout = setTimeout;
		        return setTimeout(fun, 0);
		    }
		    try {
		        // when when somebody has screwed with setTimeout but no I.E. maddness
		        return cachedSetTimeout(fun, 0);
		    } catch(e){
		        try {
		            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
		            return cachedSetTimeout.call(null, fun, 0);
		        } catch(e){
		            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
		            return cachedSetTimeout.call(this, fun, 0);
		        }
		    }


		}
		function runClearTimeout(marker) {
		    if (cachedClearTimeout === clearTimeout) {
		        //normal enviroments in sane situations
		        return clearTimeout(marker);
		    }
		    // if clearTimeout wasn't available but was latter defined
		    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
		        cachedClearTimeout = clearTimeout;
		        return clearTimeout(marker);
		    }
		    try {
		        // when when somebody has screwed with setTimeout but no I.E. maddness
		        return cachedClearTimeout(marker);
		    } catch (e){
		        try {
		            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
		            return cachedClearTimeout.call(null, marker);
		        } catch (e){
		            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
		            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
		            return cachedClearTimeout.call(this, marker);
		        }
		    }



		}
		var queue = [];
		var draining = false;
		var currentQueue;
		var queueIndex = -1;

		function cleanUpNextTick() {
		    if (!draining || !currentQueue) {
		        return;
		    }
		    draining = false;
		    if (currentQueue.length) {
		        queue = currentQueue.concat(queue);
		    } else {
		        queueIndex = -1;
		    }
		    if (queue.length) {
		        drainQueue();
		    }
		}

		function drainQueue() {
		    if (draining) {
		        return;
		    }
		    var timeout = runTimeout(cleanUpNextTick);
		    draining = true;

		    var len = queue.length;
		    while(len) {
		        currentQueue = queue;
		        queue = [];
		        while (++queueIndex < len) {
		            if (currentQueue) {
		                currentQueue[queueIndex].run();
		            }
		        }
		        queueIndex = -1;
		        len = queue.length;
		    }
		    currentQueue = null;
		    draining = false;
		    runClearTimeout(timeout);
		}
		function nextTick(fun) {
		    var args = new Array(arguments.length - 1);
		    if (arguments.length > 1) {
		        for (var i = 1; i < arguments.length; i++) {
		            args[i - 1] = arguments[i];
		        }
		    }
		    queue.push(new Item(fun, args));
		    if (queue.length === 1 && !draining) {
		        runTimeout(drainQueue);
		    }
		}
		// v8 likes predictible objects
		function Item(fun, array) {
		    this.fun = fun;
		    this.array = array;
		}
		Item.prototype.run = function () {
		    this.fun.apply(null, this.array);
		};
		var title = 'browser';
		var platform = 'browser';
		var browser = true;
		var env = {};
		var argv = [];
		var version = ''; // empty string to avoid regexp issues
		var versions = {};
		var release = {};
		var config = {};

		function noop() {}

		var on = noop;
		var addListener = noop;
		var once = noop;
		var off = noop;
		var removeListener = noop;
		var removeAllListeners = noop;
		var emit = noop;

		function binding(name) {
		    throw new Error('process.binding is not supported');
		}

		function cwd () { return '/' }
		function chdir (dir) {
		    throw new Error('process.chdir is not supported');
		}function umask() { return 0; }

		// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
		var performance = global$1.performance || {};
		var performanceNow =
		  performance.now        ||
		  performance.mozNow     ||
		  performance.msNow      ||
		  performance.oNow       ||
		  performance.webkitNow  ||
		  function(){ return (new Date()).getTime() };

		// generate timestamp or delta
		// see http://nodejs.org/api/process.html#process_process_hrtime
		function hrtime(previousTimestamp){
		  var clocktime = performanceNow.call(performance)*1e-3;
		  var seconds = Math.floor(clocktime);
		  var nanoseconds = Math.floor((clocktime%1)*1e9);
		  if (previousTimestamp) {
		    seconds = seconds - previousTimestamp[0];
		    nanoseconds = nanoseconds - previousTimestamp[1];
		    if (nanoseconds<0) {
		      seconds--;
		      nanoseconds += 1e9;
		    }
		  }
		  return [seconds,nanoseconds]
		}

		var startTime = new Date();
		function uptime() {
		  var currentTime = new Date();
		  var dif = currentTime - startTime;
		  return dif / 1000;
		}

		var process = {
		  nextTick: nextTick,
		  title: title,
		  browser: browser,
		  env: env,
		  argv: argv,
		  version: version,
		  versions: versions,
		  on: on,
		  addListener: addListener,
		  once: once,
		  off: off,
		  removeListener: removeListener,
		  removeAllListeners: removeAllListeners,
		  emit: emit,
		  binding: binding,
		  cwd: cwd,
		  chdir: chdir,
		  umask: umask,
		  hrtime: hrtime,
		  platform: platform,
		  release: release,
		  config: config,
		  uptime: uptime
		};

		var inherits;
		if (typeof Object.create === 'function'){
		  inherits = function inherits(ctor, superCtor) {
		    // implementation from standard node.js 'util' module
		    ctor.super_ = superCtor;
		    ctor.prototype = Object.create(superCtor.prototype, {
		      constructor: {
		        value: ctor,
		        enumerable: false,
		        writable: true,
		        configurable: true
		      }
		    });
		  };
		} else {
		  inherits = function inherits(ctor, superCtor) {
		    ctor.super_ = superCtor;
		    var TempCtor = function () {};
		    TempCtor.prototype = superCtor.prototype;
		    ctor.prototype = new TempCtor();
		    ctor.prototype.constructor = ctor;
		  };
		}
		var inherits$1 = inherits;

		var formatRegExp = /%[sdj%]/g;
		function format(f) {
		  if (!isString(f)) {
		    var objects = [];
		    for (var i = 0; i < arguments.length; i++) {
		      objects.push(inspect(arguments[i]));
		    }
		    return objects.join(' ');
		  }

		  var i = 1;
		  var args = arguments;
		  var len = args.length;
		  var str = String(f).replace(formatRegExp, function(x) {
		    if (x === '%%') return '%';
		    if (i >= len) return x;
		    switch (x) {
		      case '%s': return String(args[i++]);
		      case '%d': return Number(args[i++]);
		      case '%j':
		        try {
		          return JSON.stringify(args[i++]);
		        } catch (_) {
		          return '[Circular]';
		        }
		      default:
		        return x;
		    }
		  });
		  for (var x = args[i]; i < len; x = args[++i]) {
		    if (isNull(x) || !isObject(x)) {
		      str += ' ' + x;
		    } else {
		      str += ' ' + inspect(x);
		    }
		  }
		  return str;
		}

		// Mark that a method should not be used.
		// Returns a modified function which warns once by default.
		// If --no-deprecation is set, then it is a no-op.
		function deprecate(fn, msg) {
		  // Allow for deprecating things in the process of starting up.
		  if (isUndefined(global$1.process)) {
		    return function() {
		      return deprecate(fn, msg).apply(this, arguments);
		    };
		  }

		  var warned = false;
		  function deprecated() {
		    if (!warned) {
		      {
		        console.error(msg);
		      }
		      warned = true;
		    }
		    return fn.apply(this, arguments);
		  }

		  return deprecated;
		}

		var debugs = {};
		var debugEnviron;
		function debuglog(set) {
		  if (isUndefined(debugEnviron))
		    debugEnviron =  '';
		  set = set.toUpperCase();
		  if (!debugs[set]) {
		    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
		      var pid = 0;
		      debugs[set] = function() {
		        var msg = format.apply(null, arguments);
		        console.error('%s %d: %s', set, pid, msg);
		      };
		    } else {
		      debugs[set] = function() {};
		    }
		  }
		  return debugs[set];
		}

		/**
		 * Echos the value of a value. Trys to print the value out
		 * in the best way possible given the different types.
		 *
		 * @param {Object} obj The object to print out.
		 * @param {Object} opts Optional options object that alters the output.
		 */
		/* legacy: obj, showHidden, depth, colors*/
		function inspect(obj, opts) {
		  // default options
		  var ctx = {
		    seen: [],
		    stylize: stylizeNoColor
		  };
		  // legacy...
		  if (arguments.length >= 3) ctx.depth = arguments[2];
		  if (arguments.length >= 4) ctx.colors = arguments[3];
		  if (isBoolean(opts)) {
		    // legacy...
		    ctx.showHidden = opts;
		  } else if (opts) {
		    // got an "options" object
		    _extend(ctx, opts);
		  }
		  // set default options
		  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
		  if (isUndefined(ctx.depth)) ctx.depth = 2;
		  if (isUndefined(ctx.colors)) ctx.colors = false;
		  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
		  if (ctx.colors) ctx.stylize = stylizeWithColor;
		  return formatValue(ctx, obj, ctx.depth);
		}

		// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
		inspect.colors = {
		  'bold' : [1, 22],
		  'italic' : [3, 23],
		  'underline' : [4, 24],
		  'inverse' : [7, 27],
		  'white' : [37, 39],
		  'grey' : [90, 39],
		  'black' : [30, 39],
		  'blue' : [34, 39],
		  'cyan' : [36, 39],
		  'green' : [32, 39],
		  'magenta' : [35, 39],
		  'red' : [31, 39],
		  'yellow' : [33, 39]
		};

		// Don't use 'blue' not visible on cmd.exe
		inspect.styles = {
		  'special': 'cyan',
		  'number': 'yellow',
		  'boolean': 'yellow',
		  'undefined': 'grey',
		  'null': 'bold',
		  'string': 'green',
		  'date': 'magenta',
		  // "name": intentionally not styling
		  'regexp': 'red'
		};


		function stylizeWithColor(str, styleType) {
		  var style = inspect.styles[styleType];

		  if (style) {
		    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
		           '\u001b[' + inspect.colors[style][1] + 'm';
		  } else {
		    return str;
		  }
		}


		function stylizeNoColor(str, styleType) {
		  return str;
		}


		function arrayToHash(array) {
		  var hash = {};

		  array.forEach(function(val, idx) {
		    hash[val] = true;
		  });

		  return hash;
		}


		function formatValue(ctx, value, recurseTimes) {
		  // Provide a hook for user-specified inspect functions.
		  // Check that value is an object with an inspect function on it
		  if (ctx.customInspect &&
		      value &&
		      isFunction(value.inspect) &&
		      // Filter out the util module, it's inspect function is special
		      value.inspect !== inspect &&
		      // Also filter out any prototype objects using the circular check.
		      !(value.constructor && value.constructor.prototype === value)) {
		    var ret = value.inspect(recurseTimes, ctx);
		    if (!isString(ret)) {
		      ret = formatValue(ctx, ret, recurseTimes);
		    }
		    return ret;
		  }

		  // Primitive types cannot have properties
		  var primitive = formatPrimitive(ctx, value);
		  if (primitive) {
		    return primitive;
		  }

		  // Look up the keys of the object.
		  var keys = Object.keys(value);
		  var visibleKeys = arrayToHash(keys);

		  if (ctx.showHidden) {
		    keys = Object.getOwnPropertyNames(value);
		  }

		  // IE doesn't make error fields non-enumerable
		  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
		  if (isError(value)
		      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
		    return formatError(value);
		  }

		  // Some type of object without properties can be shortcutted.
		  if (keys.length === 0) {
		    if (isFunction(value)) {
		      var name = value.name ? ': ' + value.name : '';
		      return ctx.stylize('[Function' + name + ']', 'special');
		    }
		    if (isRegExp(value)) {
		      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
		    }
		    if (isDate(value)) {
		      return ctx.stylize(Date.prototype.toString.call(value), 'date');
		    }
		    if (isError(value)) {
		      return formatError(value);
		    }
		  }

		  var base = '', array = false, braces = ['{', '}'];

		  // Make Array say that they are Array
		  if (isArray$1(value)) {
		    array = true;
		    braces = ['[', ']'];
		  }

		  // Make functions say that they are functions
		  if (isFunction(value)) {
		    var n = value.name ? ': ' + value.name : '';
		    base = ' [Function' + n + ']';
		  }

		  // Make RegExps say that they are RegExps
		  if (isRegExp(value)) {
		    base = ' ' + RegExp.prototype.toString.call(value);
		  }

		  // Make dates with properties first say the date
		  if (isDate(value)) {
		    base = ' ' + Date.prototype.toUTCString.call(value);
		  }

		  // Make error with message first say the error
		  if (isError(value)) {
		    base = ' ' + formatError(value);
		  }

		  if (keys.length === 0 && (!array || value.length == 0)) {
		    return braces[0] + base + braces[1];
		  }

		  if (recurseTimes < 0) {
		    if (isRegExp(value)) {
		      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
		    } else {
		      return ctx.stylize('[Object]', 'special');
		    }
		  }

		  ctx.seen.push(value);

		  var output;
		  if (array) {
		    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
		  } else {
		    output = keys.map(function(key) {
		      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
		    });
		  }

		  ctx.seen.pop();

		  return reduceToSingleString(output, base, braces);
		}


		function formatPrimitive(ctx, value) {
		  if (isUndefined(value))
		    return ctx.stylize('undefined', 'undefined');
		  if (isString(value)) {
		    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
		                                             .replace(/'/g, "\\'")
		                                             .replace(/\\"/g, '"') + '\'';
		    return ctx.stylize(simple, 'string');
		  }
		  if (isNumber(value))
		    return ctx.stylize('' + value, 'number');
		  if (isBoolean(value))
		    return ctx.stylize('' + value, 'boolean');
		  // For some reason typeof null is "object", so special case here.
		  if (isNull(value))
		    return ctx.stylize('null', 'null');
		}


		function formatError(value) {
		  return '[' + Error.prototype.toString.call(value) + ']';
		}


		function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
		  var output = [];
		  for (var i = 0, l = value.length; i < l; ++i) {
		    if (hasOwnProperty(value, String(i))) {
		      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
		          String(i), true));
		    } else {
		      output.push('');
		    }
		  }
		  keys.forEach(function(key) {
		    if (!key.match(/^\d+$/)) {
		      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
		          key, true));
		    }
		  });
		  return output;
		}


		function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
		  var name, str, desc;
		  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
		  if (desc.get) {
		    if (desc.set) {
		      str = ctx.stylize('[Getter/Setter]', 'special');
		    } else {
		      str = ctx.stylize('[Getter]', 'special');
		    }
		  } else {
		    if (desc.set) {
		      str = ctx.stylize('[Setter]', 'special');
		    }
		  }
		  if (!hasOwnProperty(visibleKeys, key)) {
		    name = '[' + key + ']';
		  }
		  if (!str) {
		    if (ctx.seen.indexOf(desc.value) < 0) {
		      if (isNull(recurseTimes)) {
		        str = formatValue(ctx, desc.value, null);
		      } else {
		        str = formatValue(ctx, desc.value, recurseTimes - 1);
		      }
		      if (str.indexOf('\n') > -1) {
		        if (array) {
		          str = str.split('\n').map(function(line) {
		            return '  ' + line;
		          }).join('\n').substr(2);
		        } else {
		          str = '\n' + str.split('\n').map(function(line) {
		            return '   ' + line;
		          }).join('\n');
		        }
		      }
		    } else {
		      str = ctx.stylize('[Circular]', 'special');
		    }
		  }
		  if (isUndefined(name)) {
		    if (array && key.match(/^\d+$/)) {
		      return str;
		    }
		    name = JSON.stringify('' + key);
		    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
		      name = name.substr(1, name.length - 2);
		      name = ctx.stylize(name, 'name');
		    } else {
		      name = name.replace(/'/g, "\\'")
		                 .replace(/\\"/g, '"')
		                 .replace(/(^"|"$)/g, "'");
		      name = ctx.stylize(name, 'string');
		    }
		  }

		  return name + ': ' + str;
		}


		function reduceToSingleString(output, base, braces) {
		  var length = output.reduce(function(prev, cur) {
		    if (cur.indexOf('\n') >= 0) ;
		    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
		  }, 0);

		  if (length > 60) {
		    return braces[0] +
		           (base === '' ? '' : base + '\n ') +
		           ' ' +
		           output.join(',\n  ') +
		           ' ' +
		           braces[1];
		  }

		  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
		}


		// NOTE: These type checking functions intentionally don't use `instanceof`
		// because it is fragile and can be easily faked with `Object.create()`.
		function isArray$1(ar) {
		  return Array.isArray(ar);
		}

		function isBoolean(arg) {
		  return typeof arg === 'boolean';
		}

		function isNull(arg) {
		  return arg === null;
		}

		function isNumber(arg) {
		  return typeof arg === 'number';
		}

		function isString(arg) {
		  return typeof arg === 'string';
		}

		function isUndefined(arg) {
		  return arg === void 0;
		}

		function isRegExp(re) {
		  return isObject(re) && objectToString(re) === '[object RegExp]';
		}

		function isObject(arg) {
		  return typeof arg === 'object' && arg !== null;
		}

		function isDate(d) {
		  return isObject(d) && objectToString(d) === '[object Date]';
		}

		function isError(e) {
		  return isObject(e) &&
		      (objectToString(e) === '[object Error]' || e instanceof Error);
		}

		function isFunction(arg) {
		  return typeof arg === 'function';
		}

		function objectToString(o) {
		  return Object.prototype.toString.call(o);
		}

		function _extend(origin, add) {
		  // Don't do anything if add isn't an object
		  if (!add || !isObject(add)) return origin;

		  var keys = Object.keys(add);
		  var i = keys.length;
		  while (i--) {
		    origin[keys[i]] = add[keys[i]];
		  }
		  return origin;
		}
		function hasOwnProperty(obj, prop) {
		  return Object.prototype.hasOwnProperty.call(obj, prop);
		}

		function BufferList() {
		  this.head = null;
		  this.tail = null;
		  this.length = 0;
		}

		BufferList.prototype.push = function (v) {
		  var entry = { data: v, next: null };
		  if (this.length > 0) this.tail.next = entry;else this.head = entry;
		  this.tail = entry;
		  ++this.length;
		};

		BufferList.prototype.unshift = function (v) {
		  var entry = { data: v, next: this.head };
		  if (this.length === 0) this.tail = entry;
		  this.head = entry;
		  ++this.length;
		};

		BufferList.prototype.shift = function () {
		  if (this.length === 0) return;
		  var ret = this.head.data;
		  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
		  --this.length;
		  return ret;
		};

		BufferList.prototype.clear = function () {
		  this.head = this.tail = null;
		  this.length = 0;
		};

		BufferList.prototype.join = function (s) {
		  if (this.length === 0) return '';
		  var p = this.head;
		  var ret = '' + p.data;
		  while (p = p.next) {
		    ret += s + p.data;
		  }return ret;
		};

		BufferList.prototype.concat = function (n) {
		  if (this.length === 0) return Buffer.alloc(0);
		  if (this.length === 1) return this.head.data;
		  var ret = Buffer.allocUnsafe(n >>> 0);
		  var p = this.head;
		  var i = 0;
		  while (p) {
		    p.data.copy(ret, i);
		    i += p.data.length;
		    p = p.next;
		  }
		  return ret;
		};

		// Copyright Joyent, Inc. and other Node contributors.
		var isBufferEncoding = Buffer.isEncoding
		  || function(encoding) {
		       switch (encoding && encoding.toLowerCase()) {
		         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
		         default: return false;
		       }
		     };


		function assertEncoding(encoding) {
		  if (encoding && !isBufferEncoding(encoding)) {
		    throw new Error('Unknown encoding: ' + encoding);
		  }
		}

		// StringDecoder provides an interface for efficiently splitting a series of
		// buffers into a series of JS strings without breaking apart multi-byte
		// characters. CESU-8 is handled as part of the UTF-8 encoding.
		//
		// @TODO Handling all encodings inside a single object makes it very difficult
		// to reason about this code, so it should be split up in the future.
		// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
		// points as used by CESU-8.
		function StringDecoder(encoding) {
		  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
		  assertEncoding(encoding);
		  switch (this.encoding) {
		    case 'utf8':
		      // CESU-8 represents each of Surrogate Pair by 3-bytes
		      this.surrogateSize = 3;
		      break;
		    case 'ucs2':
		    case 'utf16le':
		      // UTF-16 represents each of Surrogate Pair by 2-bytes
		      this.surrogateSize = 2;
		      this.detectIncompleteChar = utf16DetectIncompleteChar;
		      break;
		    case 'base64':
		      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
		      this.surrogateSize = 3;
		      this.detectIncompleteChar = base64DetectIncompleteChar;
		      break;
		    default:
		      this.write = passThroughWrite;
		      return;
		  }

		  // Enough space to store all bytes of a single character. UTF-8 needs 4
		  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
		  this.charBuffer = new Buffer(6);
		  // Number of bytes received for the current incomplete multi-byte character.
		  this.charReceived = 0;
		  // Number of bytes expected for the current incomplete multi-byte character.
		  this.charLength = 0;
		}

		// write decodes the given buffer and returns it as JS string that is
		// guaranteed to not contain any partial multi-byte characters. Any partial
		// character found at the end of the buffer is buffered up, and will be
		// returned when calling write again with the remaining bytes.
		//
		// Note: Converting a Buffer containing an orphan surrogate to a String
		// currently works, but converting a String to a Buffer (via `new Buffer`, or
		// Buffer#write) will replace incomplete surrogates with the unicode
		// replacement character. See https://codereview.chromium.org/121173009/ .
		StringDecoder.prototype.write = function(buffer) {
		  var charStr = '';
		  // if our last write ended with an incomplete multibyte character
		  while (this.charLength) {
		    // determine how many remaining bytes this buffer has to offer for this char
		    var available = (buffer.length >= this.charLength - this.charReceived) ?
		        this.charLength - this.charReceived :
		        buffer.length;

		    // add the new bytes to the char buffer
		    buffer.copy(this.charBuffer, this.charReceived, 0, available);
		    this.charReceived += available;

		    if (this.charReceived < this.charLength) {
		      // still not enough chars in this buffer? wait for more ...
		      return '';
		    }

		    // remove bytes belonging to the current character from the buffer
		    buffer = buffer.slice(available, buffer.length);

		    // get the character that was split
		    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

		    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
		    var charCode = charStr.charCodeAt(charStr.length - 1);
		    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
		      this.charLength += this.surrogateSize;
		      charStr = '';
		      continue;
		    }
		    this.charReceived = this.charLength = 0;

		    // if there are no more bytes in this buffer, just emit our char
		    if (buffer.length === 0) {
		      return charStr;
		    }
		    break;
		  }

		  // determine and set charLength / charReceived
		  this.detectIncompleteChar(buffer);

		  var end = buffer.length;
		  if (this.charLength) {
		    // buffer the incomplete character bytes we got
		    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
		    end -= this.charReceived;
		  }

		  charStr += buffer.toString(this.encoding, 0, end);

		  var end = charStr.length - 1;
		  var charCode = charStr.charCodeAt(end);
		  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
		  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
		    var size = this.surrogateSize;
		    this.charLength += size;
		    this.charReceived += size;
		    this.charBuffer.copy(this.charBuffer, size, 0, size);
		    buffer.copy(this.charBuffer, 0, 0, size);
		    return charStr.substring(0, end);
		  }

		  // or just emit the charStr
		  return charStr;
		};

		// detectIncompleteChar determines if there is an incomplete UTF-8 character at
		// the end of the given buffer. If so, it sets this.charLength to the byte
		// length that character, and sets this.charReceived to the number of bytes
		// that are available for this character.
		StringDecoder.prototype.detectIncompleteChar = function(buffer) {
		  // determine how many bytes we have to check at the end of this buffer
		  var i = (buffer.length >= 3) ? 3 : buffer.length;

		  // Figure out if one of the last i bytes of our buffer announces an
		  // incomplete char.
		  for (; i > 0; i--) {
		    var c = buffer[buffer.length - i];

		    // See http://en.wikipedia.org/wiki/UTF-8#Description

		    // 110XXXXX
		    if (i == 1 && c >> 5 == 0x06) {
		      this.charLength = 2;
		      break;
		    }

		    // 1110XXXX
		    if (i <= 2 && c >> 4 == 0x0E) {
		      this.charLength = 3;
		      break;
		    }

		    // 11110XXX
		    if (i <= 3 && c >> 3 == 0x1E) {
		      this.charLength = 4;
		      break;
		    }
		  }
		  this.charReceived = i;
		};

		StringDecoder.prototype.end = function(buffer) {
		  var res = '';
		  if (buffer && buffer.length)
		    res = this.write(buffer);

		  if (this.charReceived) {
		    var cr = this.charReceived;
		    var buf = this.charBuffer;
		    var enc = this.encoding;
		    res += buf.slice(0, cr).toString(enc);
		  }

		  return res;
		};

		function passThroughWrite(buffer) {
		  return buffer.toString(this.encoding);
		}

		function utf16DetectIncompleteChar(buffer) {
		  this.charReceived = buffer.length % 2;
		  this.charLength = this.charReceived ? 2 : 0;
		}

		function base64DetectIncompleteChar(buffer) {
		  this.charReceived = buffer.length % 3;
		  this.charLength = this.charReceived ? 3 : 0;
		}

		var stringDecoder = /*#__PURE__*/Object.freeze({
			__proto__: null,
			StringDecoder: StringDecoder
		});

		Readable.ReadableState = ReadableState;

		var debug = debuglog('stream');
		inherits$1(Readable, EventEmitter);

		function prependListener(emitter, event, fn) {
		  // Sadly this is not cacheable as some libraries bundle their own
		  // event emitter implementation with them.
		  if (typeof emitter.prependListener === 'function') {
		    return emitter.prependListener(event, fn);
		  } else {
		    // This is a hack to make sure that our error handler is attached before any
		    // userland ones.  NEVER DO THIS. This is here only because this code needs
		    // to continue to work with older versions of Node.js that do not include
		    // the prependListener() method. The goal is to eventually remove this hack.
		    if (!emitter._events || !emitter._events[event])
		      emitter.on(event, fn);
		    else if (Array.isArray(emitter._events[event]))
		      emitter._events[event].unshift(fn);
		    else
		      emitter._events[event] = [fn, emitter._events[event]];
		  }
		}
		function listenerCount$1 (emitter, type) {
		  return emitter.listeners(type).length;
		}
		function ReadableState(options, stream) {

		  options = options || {};

		  // object stream flag. Used to make read(n) ignore n and to
		  // make all the buffer merging and length checks go away
		  this.objectMode = !!options.objectMode;

		  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

		  // the point at which it stops calling _read() to fill the buffer
		  // Note: 0 is a valid value, means "don't call _read preemptively ever"
		  var hwm = options.highWaterMark;
		  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
		  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

		  // cast to ints.
		  this.highWaterMark = ~ ~this.highWaterMark;

		  // A linked list is used to store data chunks instead of an array because the
		  // linked list can remove elements from the beginning faster than
		  // array.shift()
		  this.buffer = new BufferList();
		  this.length = 0;
		  this.pipes = null;
		  this.pipesCount = 0;
		  this.flowing = null;
		  this.ended = false;
		  this.endEmitted = false;
		  this.reading = false;

		  // a flag to be able to tell if the onwrite cb is called immediately,
		  // or on a later tick.  We set this to true at first, because any
		  // actions that shouldn't happen until "later" should generally also
		  // not happen before the first write call.
		  this.sync = true;

		  // whenever we return null, then we set a flag to say
		  // that we're awaiting a 'readable' event emission.
		  this.needReadable = false;
		  this.emittedReadable = false;
		  this.readableListening = false;
		  this.resumeScheduled = false;

		  // Crypto is kind of old and crusty.  Historically, its default string
		  // encoding is 'binary' so we have to make this configurable.
		  // Everything else in the universe uses 'utf8', though.
		  this.defaultEncoding = options.defaultEncoding || 'utf8';

		  // when piping, we only care about 'readable' events that happen
		  // after read()ing all the bytes and not getting any pushback.
		  this.ranOut = false;

		  // the number of writers that are awaiting a drain event in .pipe()s
		  this.awaitDrain = 0;

		  // if true, a maybeReadMore has been scheduled
		  this.readingMore = false;

		  this.decoder = null;
		  this.encoding = null;
		  if (options.encoding) {
		    this.decoder = new StringDecoder(options.encoding);
		    this.encoding = options.encoding;
		  }
		}
		function Readable(options) {

		  if (!(this instanceof Readable)) return new Readable(options);

		  this._readableState = new ReadableState(options, this);

		  // legacy
		  this.readable = true;

		  if (options && typeof options.read === 'function') this._read = options.read;

		  EventEmitter.call(this);
		}

		// Manually shove something into the read() buffer.
		// This returns true if the highWaterMark has not been hit yet,
		// similar to how Writable.write() returns true if you should
		// write() some more.
		Readable.prototype.push = function (chunk, encoding) {
		  var state = this._readableState;

		  if (!state.objectMode && typeof chunk === 'string') {
		    encoding = encoding || state.defaultEncoding;
		    if (encoding !== state.encoding) {
		      chunk = Buffer.from(chunk, encoding);
		      encoding = '';
		    }
		  }

		  return readableAddChunk(this, state, chunk, encoding, false);
		};

		// Unshift should *always* be something directly out of read()
		Readable.prototype.unshift = function (chunk) {
		  var state = this._readableState;
		  return readableAddChunk(this, state, chunk, '', true);
		};

		Readable.prototype.isPaused = function () {
		  return this._readableState.flowing === false;
		};

		function readableAddChunk(stream, state, chunk, encoding, addToFront) {
		  var er = chunkInvalid(state, chunk);
		  if (er) {
		    stream.emit('error', er);
		  } else if (chunk === null) {
		    state.reading = false;
		    onEofChunk(stream, state);
		  } else if (state.objectMode || chunk && chunk.length > 0) {
		    if (state.ended && !addToFront) {
		      var e = new Error('stream.push() after EOF');
		      stream.emit('error', e);
		    } else if (state.endEmitted && addToFront) {
		      var _e = new Error('stream.unshift() after end event');
		      stream.emit('error', _e);
		    } else {
		      var skipAdd;
		      if (state.decoder && !addToFront && !encoding) {
		        chunk = state.decoder.write(chunk);
		        skipAdd = !state.objectMode && chunk.length === 0;
		      }

		      if (!addToFront) state.reading = false;

		      // Don't add to the buffer if we've decoded to an empty string chunk and
		      // we're not in object mode
		      if (!skipAdd) {
		        // if we want the data now, just emit it.
		        if (state.flowing && state.length === 0 && !state.sync) {
		          stream.emit('data', chunk);
		          stream.read(0);
		        } else {
		          // update the buffer info.
		          state.length += state.objectMode ? 1 : chunk.length;
		          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

		          if (state.needReadable) emitReadable(stream);
		        }
		      }

		      maybeReadMore(stream, state);
		    }
		  } else if (!addToFront) {
		    state.reading = false;
		  }

		  return needMoreData(state);
		}

		// if it's past the high water mark, we can push in some more.
		// Also, if we have no data yet, we can stand some
		// more bytes.  This is to work around cases where hwm=0,
		// such as the repl.  Also, if the push() triggered a
		// readable event, and the user called read(largeNumber) such that
		// needReadable was set, then we ought to push more, so that another
		// 'readable' event will be triggered.
		function needMoreData(state) {
		  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
		}

		// backwards compatibility.
		Readable.prototype.setEncoding = function (enc) {
		  this._readableState.decoder = new StringDecoder(enc);
		  this._readableState.encoding = enc;
		  return this;
		};

		// Don't raise the hwm > 8MB
		var MAX_HWM = 0x800000;
		function computeNewHighWaterMark(n) {
		  if (n >= MAX_HWM) {
		    n = MAX_HWM;
		  } else {
		    // Get the next highest power of 2 to prevent increasing hwm excessively in
		    // tiny amounts
		    n--;
		    n |= n >>> 1;
		    n |= n >>> 2;
		    n |= n >>> 4;
		    n |= n >>> 8;
		    n |= n >>> 16;
		    n++;
		  }
		  return n;
		}

		// This function is designed to be inlinable, so please take care when making
		// changes to the function body.
		function howMuchToRead(n, state) {
		  if (n <= 0 || state.length === 0 && state.ended) return 0;
		  if (state.objectMode) return 1;
		  if (n !== n) {
		    // Only flow one buffer at a time
		    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
		  }
		  // If we're asking for more than the current hwm, then raise the hwm.
		  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
		  if (n <= state.length) return n;
		  // Don't have enough
		  if (!state.ended) {
		    state.needReadable = true;
		    return 0;
		  }
		  return state.length;
		}

		// you can override either this method, or the async _read(n) below.
		Readable.prototype.read = function (n) {
		  debug('read', n);
		  n = parseInt(n, 10);
		  var state = this._readableState;
		  var nOrig = n;

		  if (n !== 0) state.emittedReadable = false;

		  // if we're doing read(0) to trigger a readable event, but we
		  // already have a bunch of data in the buffer, then just trigger
		  // the 'readable' event and move on.
		  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
		    debug('read: emitReadable', state.length, state.ended);
		    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
		    return null;
		  }

		  n = howMuchToRead(n, state);

		  // if we've ended, and we're now clear, then finish it up.
		  if (n === 0 && state.ended) {
		    if (state.length === 0) endReadable(this);
		    return null;
		  }

		  // All the actual chunk generation logic needs to be
		  // *below* the call to _read.  The reason is that in certain
		  // synthetic stream cases, such as passthrough streams, _read
		  // may be a completely synchronous operation which may change
		  // the state of the read buffer, providing enough data when
		  // before there was *not* enough.
		  //
		  // So, the steps are:
		  // 1. Figure out what the state of things will be after we do
		  // a read from the buffer.
		  //
		  // 2. If that resulting state will trigger a _read, then call _read.
		  // Note that this may be asynchronous, or synchronous.  Yes, it is
		  // deeply ugly to write APIs this way, but that still doesn't mean
		  // that the Readable class should behave improperly, as streams are
		  // designed to be sync/async agnostic.
		  // Take note if the _read call is sync or async (ie, if the read call
		  // has returned yet), so that we know whether or not it's safe to emit
		  // 'readable' etc.
		  //
		  // 3. Actually pull the requested chunks out of the buffer and return.

		  // if we need a readable event, then we need to do some reading.
		  var doRead = state.needReadable;
		  debug('need readable', doRead);

		  // if we currently have less than the highWaterMark, then also read some
		  if (state.length === 0 || state.length - n < state.highWaterMark) {
		    doRead = true;
		    debug('length less than watermark', doRead);
		  }

		  // however, if we've ended, then there's no point, and if we're already
		  // reading, then it's unnecessary.
		  if (state.ended || state.reading) {
		    doRead = false;
		    debug('reading or ended', doRead);
		  } else if (doRead) {
		    debug('do read');
		    state.reading = true;
		    state.sync = true;
		    // if the length is currently zero, then we *need* a readable event.
		    if (state.length === 0) state.needReadable = true;
		    // call internal read method
		    this._read(state.highWaterMark);
		    state.sync = false;
		    // If _read pushed data synchronously, then `reading` will be false,
		    // and we need to re-evaluate how much data we can return to the user.
		    if (!state.reading) n = howMuchToRead(nOrig, state);
		  }

		  var ret;
		  if (n > 0) ret = fromList(n, state);else ret = null;

		  if (ret === null) {
		    state.needReadable = true;
		    n = 0;
		  } else {
		    state.length -= n;
		  }

		  if (state.length === 0) {
		    // If we have nothing in the buffer, then we want to know
		    // as soon as we *do* get something into the buffer.
		    if (!state.ended) state.needReadable = true;

		    // If we tried to read() past the EOF, then emit end on the next tick.
		    if (nOrig !== n && state.ended) endReadable(this);
		  }

		  if (ret !== null) this.emit('data', ret);

		  return ret;
		};

		function chunkInvalid(state, chunk) {
		  var er = null;
		  if (!isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
		    er = new TypeError('Invalid non-string/buffer chunk');
		  }
		  return er;
		}

		function onEofChunk(stream, state) {
		  if (state.ended) return;
		  if (state.decoder) {
		    var chunk = state.decoder.end();
		    if (chunk && chunk.length) {
		      state.buffer.push(chunk);
		      state.length += state.objectMode ? 1 : chunk.length;
		    }
		  }
		  state.ended = true;

		  // emit 'readable' now to make sure it gets picked up.
		  emitReadable(stream);
		}

		// Don't emit readable right away in sync mode, because this can trigger
		// another read() call => stack overflow.  This way, it might trigger
		// a nextTick recursion warning, but that's not so bad.
		function emitReadable(stream) {
		  var state = stream._readableState;
		  state.needReadable = false;
		  if (!state.emittedReadable) {
		    debug('emitReadable', state.flowing);
		    state.emittedReadable = true;
		    if (state.sync) nextTick(emitReadable_, stream);else emitReadable_(stream);
		  }
		}

		function emitReadable_(stream) {
		  debug('emit readable');
		  stream.emit('readable');
		  flow(stream);
		}

		// at this point, the user has presumably seen the 'readable' event,
		// and called read() to consume some data.  that may have triggered
		// in turn another _read(n) call, in which case reading = true if
		// it's in progress.
		// However, if we're not ended, or reading, and the length < hwm,
		// then go ahead and try to read some more preemptively.
		function maybeReadMore(stream, state) {
		  if (!state.readingMore) {
		    state.readingMore = true;
		    nextTick(maybeReadMore_, stream, state);
		  }
		}

		function maybeReadMore_(stream, state) {
		  var len = state.length;
		  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
		    debug('maybeReadMore read 0');
		    stream.read(0);
		    if (len === state.length)
		      // didn't get any data, stop spinning.
		      break;else len = state.length;
		  }
		  state.readingMore = false;
		}

		// abstract method.  to be overridden in specific implementation classes.
		// call cb(er, data) where data is <= n in length.
		// for virtual (non-string, non-buffer) streams, "length" is somewhat
		// arbitrary, and perhaps not very meaningful.
		Readable.prototype._read = function (n) {
		  this.emit('error', new Error('not implemented'));
		};

		Readable.prototype.pipe = function (dest, pipeOpts) {
		  var src = this;
		  var state = this._readableState;

		  switch (state.pipesCount) {
		    case 0:
		      state.pipes = dest;
		      break;
		    case 1:
		      state.pipes = [state.pipes, dest];
		      break;
		    default:
		      state.pipes.push(dest);
		      break;
		  }
		  state.pipesCount += 1;
		  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

		  var doEnd = (!pipeOpts || pipeOpts.end !== false);

		  var endFn = doEnd ? onend : cleanup;
		  if (state.endEmitted) nextTick(endFn);else src.once('end', endFn);

		  dest.on('unpipe', onunpipe);
		  function onunpipe(readable) {
		    debug('onunpipe');
		    if (readable === src) {
		      cleanup();
		    }
		  }

		  function onend() {
		    debug('onend');
		    dest.end();
		  }

		  // when the dest drains, it reduces the awaitDrain counter
		  // on the source.  This would be more elegant with a .once()
		  // handler in flow(), but adding and removing repeatedly is
		  // too slow.
		  var ondrain = pipeOnDrain(src);
		  dest.on('drain', ondrain);

		  var cleanedUp = false;
		  function cleanup() {
		    debug('cleanup');
		    // cleanup event handlers once the pipe is broken
		    dest.removeListener('close', onclose);
		    dest.removeListener('finish', onfinish);
		    dest.removeListener('drain', ondrain);
		    dest.removeListener('error', onerror);
		    dest.removeListener('unpipe', onunpipe);
		    src.removeListener('end', onend);
		    src.removeListener('end', cleanup);
		    src.removeListener('data', ondata);

		    cleanedUp = true;

		    // if the reader is waiting for a drain event from this
		    // specific writer, then it would cause it to never start
		    // flowing again.
		    // So, if this is awaiting a drain, then we just call it now.
		    // If we don't know, then assume that we are waiting for one.
		    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
		  }

		  // If the user pushes more data while we're writing to dest then we'll end up
		  // in ondata again. However, we only want to increase awaitDrain once because
		  // dest will only emit one 'drain' event for the multiple writes.
		  // => Introduce a guard on increasing awaitDrain.
		  var increasedAwaitDrain = false;
		  src.on('data', ondata);
		  function ondata(chunk) {
		    debug('ondata');
		    increasedAwaitDrain = false;
		    var ret = dest.write(chunk);
		    if (false === ret && !increasedAwaitDrain) {
		      // If the user unpiped during `dest.write()`, it is possible
		      // to get stuck in a permanently paused state if that write
		      // also returned false.
		      // => Check whether `dest` is still a piping destination.
		      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
		        debug('false write response, pause', src._readableState.awaitDrain);
		        src._readableState.awaitDrain++;
		        increasedAwaitDrain = true;
		      }
		      src.pause();
		    }
		  }

		  // if the dest has an error, then stop piping into it.
		  // however, don't suppress the throwing behavior for this.
		  function onerror(er) {
		    debug('onerror', er);
		    unpipe();
		    dest.removeListener('error', onerror);
		    if (listenerCount$1(dest, 'error') === 0) dest.emit('error', er);
		  }

		  // Make sure our error handler is attached before userland ones.
		  prependListener(dest, 'error', onerror);

		  // Both close and finish should trigger unpipe, but only once.
		  function onclose() {
		    dest.removeListener('finish', onfinish);
		    unpipe();
		  }
		  dest.once('close', onclose);
		  function onfinish() {
		    debug('onfinish');
		    dest.removeListener('close', onclose);
		    unpipe();
		  }
		  dest.once('finish', onfinish);

		  function unpipe() {
		    debug('unpipe');
		    src.unpipe(dest);
		  }

		  // tell the dest that it's being piped to
		  dest.emit('pipe', src);

		  // start the flow if it hasn't been started already.
		  if (!state.flowing) {
		    debug('pipe resume');
		    src.resume();
		  }

		  return dest;
		};

		function pipeOnDrain(src) {
		  return function () {
		    var state = src._readableState;
		    debug('pipeOnDrain', state.awaitDrain);
		    if (state.awaitDrain) state.awaitDrain--;
		    if (state.awaitDrain === 0 && src.listeners('data').length) {
		      state.flowing = true;
		      flow(src);
		    }
		  };
		}

		Readable.prototype.unpipe = function (dest) {
		  var state = this._readableState;

		  // if we're not piping anywhere, then do nothing.
		  if (state.pipesCount === 0) return this;

		  // just one destination.  most common case.
		  if (state.pipesCount === 1) {
		    // passed in one, but it's not the right one.
		    if (dest && dest !== state.pipes) return this;

		    if (!dest) dest = state.pipes;

		    // got a match.
		    state.pipes = null;
		    state.pipesCount = 0;
		    state.flowing = false;
		    if (dest) dest.emit('unpipe', this);
		    return this;
		  }

		  // slow case. multiple pipe destinations.

		  if (!dest) {
		    // remove all.
		    var dests = state.pipes;
		    var len = state.pipesCount;
		    state.pipes = null;
		    state.pipesCount = 0;
		    state.flowing = false;

		    for (var _i = 0; _i < len; _i++) {
		      dests[_i].emit('unpipe', this);
		    }return this;
		  }

		  // try to find the right one.
		  var i = indexOf(state.pipes, dest);
		  if (i === -1) return this;

		  state.pipes.splice(i, 1);
		  state.pipesCount -= 1;
		  if (state.pipesCount === 1) state.pipes = state.pipes[0];

		  dest.emit('unpipe', this);

		  return this;
		};

		// set up data events if they are asked for
		// Ensure readable listeners eventually get something
		Readable.prototype.on = function (ev, fn) {
		  var res = EventEmitter.prototype.on.call(this, ev, fn);

		  if (ev === 'data') {
		    // Start flowing on next tick if stream isn't explicitly paused
		    if (this._readableState.flowing !== false) this.resume();
		  } else if (ev === 'readable') {
		    var state = this._readableState;
		    if (!state.endEmitted && !state.readableListening) {
		      state.readableListening = state.needReadable = true;
		      state.emittedReadable = false;
		      if (!state.reading) {
		        nextTick(nReadingNextTick, this);
		      } else if (state.length) {
		        emitReadable(this);
		      }
		    }
		  }

		  return res;
		};
		Readable.prototype.addListener = Readable.prototype.on;

		function nReadingNextTick(self) {
		  debug('readable nexttick read 0');
		  self.read(0);
		}

		// pause() and resume() are remnants of the legacy readable stream API
		// If the user uses them, then switch into old mode.
		Readable.prototype.resume = function () {
		  var state = this._readableState;
		  if (!state.flowing) {
		    debug('resume');
		    state.flowing = true;
		    resume(this, state);
		  }
		  return this;
		};

		function resume(stream, state) {
		  if (!state.resumeScheduled) {
		    state.resumeScheduled = true;
		    nextTick(resume_, stream, state);
		  }
		}

		function resume_(stream, state) {
		  if (!state.reading) {
		    debug('resume read 0');
		    stream.read(0);
		  }

		  state.resumeScheduled = false;
		  state.awaitDrain = 0;
		  stream.emit('resume');
		  flow(stream);
		  if (state.flowing && !state.reading) stream.read(0);
		}

		Readable.prototype.pause = function () {
		  debug('call pause flowing=%j', this._readableState.flowing);
		  if (false !== this._readableState.flowing) {
		    debug('pause');
		    this._readableState.flowing = false;
		    this.emit('pause');
		  }
		  return this;
		};

		function flow(stream) {
		  var state = stream._readableState;
		  debug('flow', state.flowing);
		  while (state.flowing && stream.read() !== null) {}
		}

		// wrap an old-style stream as the async data source.
		// This is *not* part of the readable stream interface.
		// It is an ugly unfortunate mess of history.
		Readable.prototype.wrap = function (stream) {
		  var state = this._readableState;
		  var paused = false;

		  var self = this;
		  stream.on('end', function () {
		    debug('wrapped end');
		    if (state.decoder && !state.ended) {
		      var chunk = state.decoder.end();
		      if (chunk && chunk.length) self.push(chunk);
		    }

		    self.push(null);
		  });

		  stream.on('data', function (chunk) {
		    debug('wrapped data');
		    if (state.decoder) chunk = state.decoder.write(chunk);

		    // don't skip over falsy values in objectMode
		    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

		    var ret = self.push(chunk);
		    if (!ret) {
		      paused = true;
		      stream.pause();
		    }
		  });

		  // proxy all the other methods.
		  // important when wrapping filters and duplexes.
		  for (var i in stream) {
		    if (this[i] === undefined && typeof stream[i] === 'function') {
		      this[i] = function (method) {
		        return function () {
		          return stream[method].apply(stream, arguments);
		        };
		      }(i);
		    }
		  }

		  // proxy certain important events.
		  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
		  forEach(events, function (ev) {
		    stream.on(ev, self.emit.bind(self, ev));
		  });

		  // when we try to consume some more bytes, simply unpause the
		  // underlying stream.
		  self._read = function (n) {
		    debug('wrapped _read', n);
		    if (paused) {
		      paused = false;
		      stream.resume();
		    }
		  };

		  return self;
		};

		// exposed for testing purposes only.
		Readable._fromList = fromList;

		// Pluck off n bytes from an array of buffers.
		// Length is the combined lengths of all the buffers in the list.
		// This function is designed to be inlinable, so please take care when making
		// changes to the function body.
		function fromList(n, state) {
		  // nothing buffered
		  if (state.length === 0) return null;

		  var ret;
		  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
		    // read it all, truncate the list
		    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
		    state.buffer.clear();
		  } else {
		    // read part of list
		    ret = fromListPartial(n, state.buffer, state.decoder);
		  }

		  return ret;
		}

		// Extracts only enough buffered data to satisfy the amount requested.
		// This function is designed to be inlinable, so please take care when making
		// changes to the function body.
		function fromListPartial(n, list, hasStrings) {
		  var ret;
		  if (n < list.head.data.length) {
		    // slice is the same for buffers and strings
		    ret = list.head.data.slice(0, n);
		    list.head.data = list.head.data.slice(n);
		  } else if (n === list.head.data.length) {
		    // first chunk is a perfect match
		    ret = list.shift();
		  } else {
		    // result spans more than one buffer
		    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
		  }
		  return ret;
		}

		// Copies a specified amount of characters from the list of buffered data
		// chunks.
		// This function is designed to be inlinable, so please take care when making
		// changes to the function body.
		function copyFromBufferString(n, list) {
		  var p = list.head;
		  var c = 1;
		  var ret = p.data;
		  n -= ret.length;
		  while (p = p.next) {
		    var str = p.data;
		    var nb = n > str.length ? str.length : n;
		    if (nb === str.length) ret += str;else ret += str.slice(0, n);
		    n -= nb;
		    if (n === 0) {
		      if (nb === str.length) {
		        ++c;
		        if (p.next) list.head = p.next;else list.head = list.tail = null;
		      } else {
		        list.head = p;
		        p.data = str.slice(nb);
		      }
		      break;
		    }
		    ++c;
		  }
		  list.length -= c;
		  return ret;
		}

		// Copies a specified amount of bytes from the list of buffered data chunks.
		// This function is designed to be inlinable, so please take care when making
		// changes to the function body.
		function copyFromBuffer(n, list) {
		  var ret = Buffer.allocUnsafe(n);
		  var p = list.head;
		  var c = 1;
		  p.data.copy(ret);
		  n -= p.data.length;
		  while (p = p.next) {
		    var buf = p.data;
		    var nb = n > buf.length ? buf.length : n;
		    buf.copy(ret, ret.length - n, 0, nb);
		    n -= nb;
		    if (n === 0) {
		      if (nb === buf.length) {
		        ++c;
		        if (p.next) list.head = p.next;else list.head = list.tail = null;
		      } else {
		        list.head = p;
		        p.data = buf.slice(nb);
		      }
		      break;
		    }
		    ++c;
		  }
		  list.length -= c;
		  return ret;
		}

		function endReadable(stream) {
		  var state = stream._readableState;

		  // If we get here before consuming all the bytes, then that is a
		  // bug in node.  Should never happen.
		  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

		  if (!state.endEmitted) {
		    state.ended = true;
		    nextTick(endReadableNT, state, stream);
		  }
		}

		function endReadableNT(state, stream) {
		  // Check that we didn't get one last unshift.
		  if (!state.endEmitted && state.length === 0) {
		    state.endEmitted = true;
		    stream.readable = false;
		    stream.emit('end');
		  }
		}

		function forEach(xs, f) {
		  for (var i = 0, l = xs.length; i < l; i++) {
		    f(xs[i], i);
		  }
		}

		function indexOf(xs, x) {
		  for (var i = 0, l = xs.length; i < l; i++) {
		    if (xs[i] === x) return i;
		  }
		  return -1;
		}

		// A bit simpler than readable streams.
		Writable.WritableState = WritableState;
		inherits$1(Writable, EventEmitter);

		function nop() {}

		function WriteReq(chunk, encoding, cb) {
		  this.chunk = chunk;
		  this.encoding = encoding;
		  this.callback = cb;
		  this.next = null;
		}

		function WritableState(options, stream) {
		  Object.defineProperty(this, 'buffer', {
		    get: deprecate(function () {
		      return this.getBuffer();
		    }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
		  });
		  options = options || {};

		  // object stream flag to indicate whether or not this stream
		  // contains buffers or objects.
		  this.objectMode = !!options.objectMode;

		  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

		  // the point at which write() starts returning false
		  // Note: 0 is a valid value, means that we always return false if
		  // the entire buffer is not flushed immediately on write()
		  var hwm = options.highWaterMark;
		  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
		  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

		  // cast to ints.
		  this.highWaterMark = ~ ~this.highWaterMark;

		  this.needDrain = false;
		  // at the start of calling end()
		  this.ending = false;
		  // when end() has been called, and returned
		  this.ended = false;
		  // when 'finish' is emitted
		  this.finished = false;

		  // should we decode strings into buffers before passing to _write?
		  // this is here so that some node-core streams can optimize string
		  // handling at a lower level.
		  var noDecode = options.decodeStrings === false;
		  this.decodeStrings = !noDecode;

		  // Crypto is kind of old and crusty.  Historically, its default string
		  // encoding is 'binary' so we have to make this configurable.
		  // Everything else in the universe uses 'utf8', though.
		  this.defaultEncoding = options.defaultEncoding || 'utf8';

		  // not an actual buffer we keep track of, but a measurement
		  // of how much we're waiting to get pushed to some underlying
		  // socket or file.
		  this.length = 0;

		  // a flag to see when we're in the middle of a write.
		  this.writing = false;

		  // when true all writes will be buffered until .uncork() call
		  this.corked = 0;

		  // a flag to be able to tell if the onwrite cb is called immediately,
		  // or on a later tick.  We set this to true at first, because any
		  // actions that shouldn't happen until "later" should generally also
		  // not happen before the first write call.
		  this.sync = true;

		  // a flag to know if we're processing previously buffered items, which
		  // may call the _write() callback in the same tick, so that we don't
		  // end up in an overlapped onwrite situation.
		  this.bufferProcessing = false;

		  // the callback that's passed to _write(chunk,cb)
		  this.onwrite = function (er) {
		    onwrite(stream, er);
		  };

		  // the callback that the user supplies to write(chunk,encoding,cb)
		  this.writecb = null;

		  // the amount that is being written when _write is called.
		  this.writelen = 0;

		  this.bufferedRequest = null;
		  this.lastBufferedRequest = null;

		  // number of pending user-supplied write callbacks
		  // this must be 0 before 'finish' can be emitted
		  this.pendingcb = 0;

		  // emit prefinish if the only thing we're waiting for is _write cbs
		  // This is relevant for synchronous Transform streams
		  this.prefinished = false;

		  // True if the error was already emitted and should not be thrown again
		  this.errorEmitted = false;

		  // count buffered requests
		  this.bufferedRequestCount = 0;

		  // allocate the first CorkedRequest, there is always
		  // one allocated and free to use, and we maintain at most two
		  this.corkedRequestsFree = new CorkedRequest(this);
		}

		WritableState.prototype.getBuffer = function writableStateGetBuffer() {
		  var current = this.bufferedRequest;
		  var out = [];
		  while (current) {
		    out.push(current);
		    current = current.next;
		  }
		  return out;
		};
		function Writable(options) {

		  // Writable ctor is applied to Duplexes, though they're not
		  // instanceof Writable, they're instanceof Readable.
		  if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);

		  this._writableState = new WritableState(options, this);

		  // legacy.
		  this.writable = true;

		  if (options) {
		    if (typeof options.write === 'function') this._write = options.write;

		    if (typeof options.writev === 'function') this._writev = options.writev;
		  }

		  EventEmitter.call(this);
		}

		// Otherwise people can pipe Writable streams, which is just wrong.
		Writable.prototype.pipe = function () {
		  this.emit('error', new Error('Cannot pipe, not readable'));
		};

		function writeAfterEnd(stream, cb) {
		  var er = new Error('write after end');
		  // TODO: defer error events consistently everywhere, not just the cb
		  stream.emit('error', er);
		  nextTick(cb, er);
		}

		// If we get something that is not a buffer, string, null, or undefined,
		// and we're not in objectMode, then that's an error.
		// Otherwise stream chunks are all considered to be of length=1, and the
		// watermarks determine how many objects to keep in the buffer, rather than
		// how many bytes or characters.
		function validChunk(stream, state, chunk, cb) {
		  var valid = true;
		  var er = false;
		  // Always throw error if a null is written
		  // if we are not in object mode then throw
		  // if it is not a buffer, string, or undefined.
		  if (chunk === null) {
		    er = new TypeError('May not write null values to stream');
		  } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
		    er = new TypeError('Invalid non-string/buffer chunk');
		  }
		  if (er) {
		    stream.emit('error', er);
		    nextTick(cb, er);
		    valid = false;
		  }
		  return valid;
		}

		Writable.prototype.write = function (chunk, encoding, cb) {
		  var state = this._writableState;
		  var ret = false;

		  if (typeof encoding === 'function') {
		    cb = encoding;
		    encoding = null;
		  }

		  if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

		  if (typeof cb !== 'function') cb = nop;

		  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
		    state.pendingcb++;
		    ret = writeOrBuffer(this, state, chunk, encoding, cb);
		  }

		  return ret;
		};

		Writable.prototype.cork = function () {
		  var state = this._writableState;

		  state.corked++;
		};

		Writable.prototype.uncork = function () {
		  var state = this._writableState;

		  if (state.corked) {
		    state.corked--;

		    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
		  }
		};

		Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
		  // node::ParseEncoding() requires lower case.
		  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
		  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
		  this._writableState.defaultEncoding = encoding;
		  return this;
		};

		function decodeChunk(state, chunk, encoding) {
		  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
		    chunk = Buffer.from(chunk, encoding);
		  }
		  return chunk;
		}

		// if we're already writing something, then just put this
		// in the queue, and wait our turn.  Otherwise, call _write
		// If we return false, then we need a drain event, so set that flag.
		function writeOrBuffer(stream, state, chunk, encoding, cb) {
		  chunk = decodeChunk(state, chunk, encoding);

		  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
		  var len = state.objectMode ? 1 : chunk.length;

		  state.length += len;

		  var ret = state.length < state.highWaterMark;
		  // we must ensure that previous needDrain will not be reset to false.
		  if (!ret) state.needDrain = true;

		  if (state.writing || state.corked) {
		    var last = state.lastBufferedRequest;
		    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
		    if (last) {
		      last.next = state.lastBufferedRequest;
		    } else {
		      state.bufferedRequest = state.lastBufferedRequest;
		    }
		    state.bufferedRequestCount += 1;
		  } else {
		    doWrite(stream, state, false, len, chunk, encoding, cb);
		  }

		  return ret;
		}

		function doWrite(stream, state, writev, len, chunk, encoding, cb) {
		  state.writelen = len;
		  state.writecb = cb;
		  state.writing = true;
		  state.sync = true;
		  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
		  state.sync = false;
		}

		function onwriteError(stream, state, sync, er, cb) {
		  --state.pendingcb;
		  if (sync) nextTick(cb, er);else cb(er);

		  stream._writableState.errorEmitted = true;
		  stream.emit('error', er);
		}

		function onwriteStateUpdate(state) {
		  state.writing = false;
		  state.writecb = null;
		  state.length -= state.writelen;
		  state.writelen = 0;
		}

		function onwrite(stream, er) {
		  var state = stream._writableState;
		  var sync = state.sync;
		  var cb = state.writecb;

		  onwriteStateUpdate(state);

		  if (er) onwriteError(stream, state, sync, er, cb);else {
		    // Check if we're actually ready to finish, but don't emit yet
		    var finished = needFinish(state);

		    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
		      clearBuffer(stream, state);
		    }

		    if (sync) {
		      /*<replacement>*/
		        nextTick(afterWrite, stream, state, finished, cb);
		      /*</replacement>*/
		    } else {
		        afterWrite(stream, state, finished, cb);
		      }
		  }
		}

		function afterWrite(stream, state, finished, cb) {
		  if (!finished) onwriteDrain(stream, state);
		  state.pendingcb--;
		  cb();
		  finishMaybe(stream, state);
		}

		// Must force callback to be called on nextTick, so that we don't
		// emit 'drain' before the write() consumer gets the 'false' return
		// value, and has a chance to attach a 'drain' listener.
		function onwriteDrain(stream, state) {
		  if (state.length === 0 && state.needDrain) {
		    state.needDrain = false;
		    stream.emit('drain');
		  }
		}

		// if there's something in the buffer waiting, then process it
		function clearBuffer(stream, state) {
		  state.bufferProcessing = true;
		  var entry = state.bufferedRequest;

		  if (stream._writev && entry && entry.next) {
		    // Fast case, write everything using _writev()
		    var l = state.bufferedRequestCount;
		    var buffer = new Array(l);
		    var holder = state.corkedRequestsFree;
		    holder.entry = entry;

		    var count = 0;
		    while (entry) {
		      buffer[count] = entry;
		      entry = entry.next;
		      count += 1;
		    }

		    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

		    // doWrite is almost always async, defer these to save a bit of time
		    // as the hot path ends with doWrite
		    state.pendingcb++;
		    state.lastBufferedRequest = null;
		    if (holder.next) {
		      state.corkedRequestsFree = holder.next;
		      holder.next = null;
		    } else {
		      state.corkedRequestsFree = new CorkedRequest(state);
		    }
		  } else {
		    // Slow case, write chunks one-by-one
		    while (entry) {
		      var chunk = entry.chunk;
		      var encoding = entry.encoding;
		      var cb = entry.callback;
		      var len = state.objectMode ? 1 : chunk.length;

		      doWrite(stream, state, false, len, chunk, encoding, cb);
		      entry = entry.next;
		      // if we didn't call the onwrite immediately, then
		      // it means that we need to wait until it does.
		      // also, that means that the chunk and cb are currently
		      // being processed, so move the buffer counter past them.
		      if (state.writing) {
		        break;
		      }
		    }

		    if (entry === null) state.lastBufferedRequest = null;
		  }

		  state.bufferedRequestCount = 0;
		  state.bufferedRequest = entry;
		  state.bufferProcessing = false;
		}

		Writable.prototype._write = function (chunk, encoding, cb) {
		  cb(new Error('not implemented'));
		};

		Writable.prototype._writev = null;

		Writable.prototype.end = function (chunk, encoding, cb) {
		  var state = this._writableState;

		  if (typeof chunk === 'function') {
		    cb = chunk;
		    chunk = null;
		    encoding = null;
		  } else if (typeof encoding === 'function') {
		    cb = encoding;
		    encoding = null;
		  }

		  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

		  // .end() fully uncorks
		  if (state.corked) {
		    state.corked = 1;
		    this.uncork();
		  }

		  // ignore unnecessary end() calls.
		  if (!state.ending && !state.finished) endWritable(this, state, cb);
		};

		function needFinish(state) {
		  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
		}

		function prefinish(stream, state) {
		  if (!state.prefinished) {
		    state.prefinished = true;
		    stream.emit('prefinish');
		  }
		}

		function finishMaybe(stream, state) {
		  var need = needFinish(state);
		  if (need) {
		    if (state.pendingcb === 0) {
		      prefinish(stream, state);
		      state.finished = true;
		      stream.emit('finish');
		    } else {
		      prefinish(stream, state);
		    }
		  }
		  return need;
		}

		function endWritable(stream, state, cb) {
		  state.ending = true;
		  finishMaybe(stream, state);
		  if (cb) {
		    if (state.finished) nextTick(cb);else stream.once('finish', cb);
		  }
		  state.ended = true;
		  stream.writable = false;
		}

		// It seems a linked list but it is not
		// there will be only 2 of these for each stream
		function CorkedRequest(state) {
		  var _this = this;

		  this.next = null;
		  this.entry = null;

		  this.finish = function (err) {
		    var entry = _this.entry;
		    _this.entry = null;
		    while (entry) {
		      var cb = entry.callback;
		      state.pendingcb--;
		      cb(err);
		      entry = entry.next;
		    }
		    if (state.corkedRequestsFree) {
		      state.corkedRequestsFree.next = _this;
		    } else {
		      state.corkedRequestsFree = _this;
		    }
		  };
		}

		inherits$1(Duplex, Readable);

		var keys = Object.keys(Writable.prototype);
		for (var v$2 = 0; v$2 < keys.length; v$2++) {
		  var method = keys[v$2];
		  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
		}
		function Duplex(options) {
		  if (!(this instanceof Duplex)) return new Duplex(options);

		  Readable.call(this, options);
		  Writable.call(this, options);

		  if (options && options.readable === false) this.readable = false;

		  if (options && options.writable === false) this.writable = false;

		  this.allowHalfOpen = true;
		  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

		  this.once('end', onend);
		}

		// the no-half-open enforcer
		function onend() {
		  // if we allow half-open state, or if the writable side ended,
		  // then we're ok.
		  if (this.allowHalfOpen || this._writableState.ended) return;

		  // no more data can be written.
		  // But allow more writes to happen in this tick.
		  nextTick(onEndNT, this);
		}

		function onEndNT(self) {
		  self.end();
		}

		// a transform stream is a readable/writable stream where you do
		inherits$1(Transform, Duplex);

		function TransformState(stream) {
		  this.afterTransform = function (er, data) {
		    return afterTransform(stream, er, data);
		  };

		  this.needTransform = false;
		  this.transforming = false;
		  this.writecb = null;
		  this.writechunk = null;
		  this.writeencoding = null;
		}

		function afterTransform(stream, er, data) {
		  var ts = stream._transformState;
		  ts.transforming = false;

		  var cb = ts.writecb;

		  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

		  ts.writechunk = null;
		  ts.writecb = null;

		  if (data !== null && data !== undefined) stream.push(data);

		  cb(er);

		  var rs = stream._readableState;
		  rs.reading = false;
		  if (rs.needReadable || rs.length < rs.highWaterMark) {
		    stream._read(rs.highWaterMark);
		  }
		}
		function Transform(options) {
		  if (!(this instanceof Transform)) return new Transform(options);

		  Duplex.call(this, options);

		  this._transformState = new TransformState(this);

		  // when the writable side finishes, then flush out anything remaining.
		  var stream = this;

		  // start out asking for a readable event once data is transformed.
		  this._readableState.needReadable = true;

		  // we have implemented the _read method, and done the other things
		  // that Readable wants before the first _read call, so unset the
		  // sync guard flag.
		  this._readableState.sync = false;

		  if (options) {
		    if (typeof options.transform === 'function') this._transform = options.transform;

		    if (typeof options.flush === 'function') this._flush = options.flush;
		  }

		  this.once('prefinish', function () {
		    if (typeof this._flush === 'function') this._flush(function (er) {
		      done(stream, er);
		    });else done(stream);
		  });
		}

		Transform.prototype.push = function (chunk, encoding) {
		  this._transformState.needTransform = false;
		  return Duplex.prototype.push.call(this, chunk, encoding);
		};

		// This is the part where you do stuff!
		// override this function in implementation classes.
		// 'chunk' is an input chunk.
		//
		// Call `push(newChunk)` to pass along transformed output
		// to the readable side.  You may call 'push' zero or more times.
		//
		// Call `cb(err)` when you are done with this chunk.  If you pass
		// an error, then that'll put the hurt on the whole operation.  If you
		// never call cb(), then you'll never get another chunk.
		Transform.prototype._transform = function (chunk, encoding, cb) {
		  throw new Error('Not implemented');
		};

		Transform.prototype._write = function (chunk, encoding, cb) {
		  var ts = this._transformState;
		  ts.writecb = cb;
		  ts.writechunk = chunk;
		  ts.writeencoding = encoding;
		  if (!ts.transforming) {
		    var rs = this._readableState;
		    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
		  }
		};

		// Doesn't matter what the args are here.
		// _transform does all the work.
		// That we got here means that the readable side wants more data.
		Transform.prototype._read = function (n) {
		  var ts = this._transformState;

		  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
		    ts.transforming = true;
		    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
		  } else {
		    // mark that we need a transform, so that any data that comes in
		    // will get processed, now that we've asked for it.
		    ts.needTransform = true;
		  }
		};

		function done(stream, er) {
		  if (er) return stream.emit('error', er);

		  // if there's nothing in the write buffer, then that means
		  // that nothing more will ever be provided
		  var ws = stream._writableState;
		  var ts = stream._transformState;

		  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

		  if (ts.transforming) throw new Error('Calling transform done when still transforming');

		  return stream.push(null);
		}

		inherits$1(PassThrough, Transform);
		function PassThrough(options) {
		  if (!(this instanceof PassThrough)) return new PassThrough(options);

		  Transform.call(this, options);
		}

		PassThrough.prototype._transform = function (chunk, encoding, cb) {
		  cb(null, chunk);
		};

		inherits$1(Stream, EventEmitter);
		Stream.Readable = Readable;
		Stream.Writable = Writable;
		Stream.Duplex = Duplex;
		Stream.Transform = Transform;
		Stream.PassThrough = PassThrough;

		// Backwards-compat with node 0.4.x
		Stream.Stream = Stream;

		// old-style streams.  Note that the pipe method (the only relevant
		// part of this class) is overridden in the Readable class.

		function Stream() {
		  EventEmitter.call(this);
		}

		Stream.prototype.pipe = function(dest, options) {
		  var source = this;

		  function ondata(chunk) {
		    if (dest.writable) {
		      if (false === dest.write(chunk) && source.pause) {
		        source.pause();
		      }
		    }
		  }

		  source.on('data', ondata);

		  function ondrain() {
		    if (source.readable && source.resume) {
		      source.resume();
		    }
		  }

		  dest.on('drain', ondrain);

		  // If the 'end' option is not supplied, dest.end() will be called when
		  // source gets the 'end' or 'close' events.  Only dest.end() once.
		  if (!dest._isStdio && (!options || options.end !== false)) {
		    source.on('end', onend);
		    source.on('close', onclose);
		  }

		  var didOnEnd = false;
		  function onend() {
		    if (didOnEnd) return;
		    didOnEnd = true;

		    dest.end();
		  }


		  function onclose() {
		    if (didOnEnd) return;
		    didOnEnd = true;

		    if (typeof dest.destroy === 'function') dest.destroy();
		  }

		  // don't leave dangling pipes when there are errors.
		  function onerror(er) {
		    cleanup();
		    if (EventEmitter.listenerCount(this, 'error') === 0) {
		      throw er; // Unhandled stream error in pipe.
		    }
		  }

		  source.on('error', onerror);
		  dest.on('error', onerror);

		  // remove all the event listeners that were added.
		  function cleanup() {
		    source.removeListener('data', ondata);
		    dest.removeListener('drain', ondrain);

		    source.removeListener('end', onend);
		    source.removeListener('close', onclose);

		    source.removeListener('error', onerror);
		    dest.removeListener('error', onerror);

		    source.removeListener('end', cleanup);
		    source.removeListener('close', cleanup);

		    dest.removeListener('close', cleanup);
		  }

		  source.on('end', cleanup);
		  source.on('close', cleanup);

		  dest.on('close', cleanup);

		  dest.emit('pipe', source);

		  // Allow for unix-like usage: A.pipe(B).pipe(C)
		  return dest;
		};

		var stream = /*#__PURE__*/Object.freeze({
			__proto__: null,
			'default': Stream,
			Readable: Readable,
			Writable: Writable,
			Duplex: Duplex,
			Transform: Transform,
			PassThrough: PassThrough,
			Stream: Stream
		});

		var require$$1 = /*@__PURE__*/getAugmentedNamespace(stream);

		var require$$2 = /*@__PURE__*/getAugmentedNamespace(stringDecoder);

		var Buffer$1 = safeBuffer.Buffer;
		var Transform$1 = require$$1.Transform;
		var StringDecoder$1 = require$$2.StringDecoder;


		function CipherBase (hashMode) {
		  Transform$1.call(this);
		  this.hashMode = typeof hashMode === 'string';
		  if (this.hashMode) {
		    this[hashMode] = this._finalOrDigest;
		  } else {
		    this.final = this._finalOrDigest;
		  }
		  if (this._final) {
		    this.__final = this._final;
		    this._final = null;
		  }
		  this._decoder = null;
		  this._encoding = null;
		}
		inherits_browser(CipherBase, Transform$1);

		CipherBase.prototype.update = function (data, inputEnc, outputEnc) {
		  if (typeof data === 'string') {
		    data = Buffer$1.from(data, inputEnc);
		  }

		  var outData = this._update(data);
		  if (this.hashMode) return this

		  if (outputEnc) {
		    outData = this._toString(outData, outputEnc);
		  }

		  return outData
		};

		CipherBase.prototype.setAutoPadding = function () {};
		CipherBase.prototype.getAuthTag = function () {
		  throw new Error('trying to get auth tag in unsupported state')
		};

		CipherBase.prototype.setAuthTag = function () {
		  throw new Error('trying to set auth tag in unsupported state')
		};

		CipherBase.prototype.setAAD = function () {
		  throw new Error('trying to set aad in unsupported state')
		};

		CipherBase.prototype._transform = function (data, _, next) {
		  var err;
		  try {
		    if (this.hashMode) {
		      this._update(data);
		    } else {
		      this.push(this._update(data));
		    }
		  } catch (e) {
		    err = e;
		  } finally {
		    next(err);
		  }
		};
		CipherBase.prototype._flush = function (done) {
		  var err;
		  try {
		    this.push(this.__final());
		  } catch (e) {
		    err = e;
		  }

		  done(err);
		};
		CipherBase.prototype._finalOrDigest = function (outputEnc) {
		  var outData = this.__final() || Buffer$1.alloc(0);
		  if (outputEnc) {
		    outData = this._toString(outData, outputEnc, true);
		  }
		  return outData
		};

		CipherBase.prototype._toString = function (value, enc, fin) {
		  if (!this._decoder) {
		    this._decoder = new StringDecoder$1(enc);
		    this._encoding = enc;
		  }

		  if (this._encoding !== enc) throw new Error('can\'t switch encodings')

		  var out = this._decoder.write(value);
		  if (fin) {
		    out += this._decoder.end();
		  }

		  return out
		};

		var cipherBase = CipherBase;

		var Buffer$2 = safeBuffer.Buffer;



		var ZEROS = Buffer$2.alloc(128);
		var blocksize = 64;

		function Hmac (alg, key) {
		  cipherBase.call(this, 'digest');
		  if (typeof key === 'string') {
		    key = Buffer$2.from(key);
		  }

		  this._alg = alg;
		  this._key = key;

		  if (key.length > blocksize) {
		    key = alg(key);
		  } else if (key.length < blocksize) {
		    key = Buffer$2.concat([key, ZEROS], blocksize);
		  }

		  var ipad = this._ipad = Buffer$2.allocUnsafe(blocksize);
		  var opad = this._opad = Buffer$2.allocUnsafe(blocksize);

		  for (var i = 0; i < blocksize; i++) {
		    ipad[i] = key[i] ^ 0x36;
		    opad[i] = key[i] ^ 0x5C;
		  }

		  this._hash = [ipad];
		}

		inherits_browser(Hmac, cipherBase);

		Hmac.prototype._update = function (data) {
		  this._hash.push(data);
		};

		Hmac.prototype._final = function () {
		  var h = this._alg(Buffer$2.concat(this._hash));
		  return this._alg(Buffer$2.concat([this._opad, h]))
		};
		var legacy = Hmac;

		var safeBuffer$1 = createCommonjsModule(function (module, exports) {
		/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
		/* eslint-disable node/no-deprecated-api */

		var Buffer = buffer_1.Buffer;

		// alternative to using Object.keys for old browsers
		function copyProps (src, dst) {
		  for (var key in src) {
		    dst[key] = src[key];
		  }
		}
		if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
		  module.exports = buffer_1;
		} else {
		  // Copy properties from require('buffer')
		  copyProps(buffer_1, exports);
		  exports.Buffer = SafeBuffer;
		}

		function SafeBuffer (arg, encodingOrOffset, length) {
		  return Buffer(arg, encodingOrOffset, length)
		}

		SafeBuffer.prototype = Object.create(Buffer.prototype);

		// Copy static methods from Buffer
		copyProps(Buffer, SafeBuffer);

		SafeBuffer.from = function (arg, encodingOrOffset, length) {
		  if (typeof arg === 'number') {
		    throw new TypeError('Argument must not be a number')
		  }
		  return Buffer(arg, encodingOrOffset, length)
		};

		SafeBuffer.alloc = function (size, fill, encoding) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  var buf = Buffer(size);
		  if (fill !== undefined) {
		    if (typeof encoding === 'string') {
		      buf.fill(fill, encoding);
		    } else {
		      buf.fill(fill);
		    }
		  } else {
		    buf.fill(0);
		  }
		  return buf
		};

		SafeBuffer.allocUnsafe = function (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  return Buffer(size)
		};

		SafeBuffer.allocUnsafeSlow = function (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  return buffer_1.SlowBuffer(size)
		};
		});

		var require$$0 = /*@__PURE__*/getAugmentedNamespace(events);

		var streamBrowser = require$$0.EventEmitter;

		function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

		function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

		function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

		function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

		var Buffer$3 = buffer_1.Buffer;

		var inspect$1 = debugUtil.inspect;

		var custom = inspect$1 && inspect$1.custom || 'inspect';

		function copyBuffer(src, target, offset) {
		  Buffer$3.prototype.copy.call(src, target, offset);
		}

		var buffer_list =
		/*#__PURE__*/
		function () {
		  function BufferList() {
		    _classCallCheck(this, BufferList);

		    this.head = null;
		    this.tail = null;
		    this.length = 0;
		  }

		  _createClass(BufferList, [{
		    key: "push",
		    value: function push(v) {
		      var entry = {
		        data: v,
		        next: null
		      };
		      if (this.length > 0) this.tail.next = entry;else this.head = entry;
		      this.tail = entry;
		      ++this.length;
		    }
		  }, {
		    key: "unshift",
		    value: function unshift(v) {
		      var entry = {
		        data: v,
		        next: this.head
		      };
		      if (this.length === 0) this.tail = entry;
		      this.head = entry;
		      ++this.length;
		    }
		  }, {
		    key: "shift",
		    value: function shift() {
		      if (this.length === 0) return;
		      var ret = this.head.data;
		      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
		      --this.length;
		      return ret;
		    }
		  }, {
		    key: "clear",
		    value: function clear() {
		      this.head = this.tail = null;
		      this.length = 0;
		    }
		  }, {
		    key: "join",
		    value: function join(s) {
		      if (this.length === 0) return '';
		      var p = this.head;
		      var ret = '' + p.data;

		      while (p = p.next) {
		        ret += s + p.data;
		      }

		      return ret;
		    }
		  }, {
		    key: "concat",
		    value: function concat(n) {
		      if (this.length === 0) return Buffer$3.alloc(0);
		      var ret = Buffer$3.allocUnsafe(n >>> 0);
		      var p = this.head;
		      var i = 0;

		      while (p) {
		        copyBuffer(p.data, ret, i);
		        i += p.data.length;
		        p = p.next;
		      }

		      return ret;
		    } // Consumes a specified amount of bytes or characters from the buffered data.

		  }, {
		    key: "consume",
		    value: function consume(n, hasStrings) {
		      var ret;

		      if (n < this.head.data.length) {
		        // `slice` is the same for buffers and strings.
		        ret = this.head.data.slice(0, n);
		        this.head.data = this.head.data.slice(n);
		      } else if (n === this.head.data.length) {
		        // First chunk is a perfect match.
		        ret = this.shift();
		      } else {
		        // Result spans more than one buffer.
		        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
		      }

		      return ret;
		    }
		  }, {
		    key: "first",
		    value: function first() {
		      return this.head.data;
		    } // Consumes a specified amount of characters from the buffered data.

		  }, {
		    key: "_getString",
		    value: function _getString(n) {
		      var p = this.head;
		      var c = 1;
		      var ret = p.data;
		      n -= ret.length;

		      while (p = p.next) {
		        var str = p.data;
		        var nb = n > str.length ? str.length : n;
		        if (nb === str.length) ret += str;else ret += str.slice(0, n);
		        n -= nb;

		        if (n === 0) {
		          if (nb === str.length) {
		            ++c;
		            if (p.next) this.head = p.next;else this.head = this.tail = null;
		          } else {
		            this.head = p;
		            p.data = str.slice(nb);
		          }

		          break;
		        }

		        ++c;
		      }

		      this.length -= c;
		      return ret;
		    } // Consumes a specified amount of bytes from the buffered data.

		  }, {
		    key: "_getBuffer",
		    value: function _getBuffer(n) {
		      var ret = Buffer$3.allocUnsafe(n);
		      var p = this.head;
		      var c = 1;
		      p.data.copy(ret);
		      n -= p.data.length;

		      while (p = p.next) {
		        var buf = p.data;
		        var nb = n > buf.length ? buf.length : n;
		        buf.copy(ret, ret.length - n, 0, nb);
		        n -= nb;

		        if (n === 0) {
		          if (nb === buf.length) {
		            ++c;
		            if (p.next) this.head = p.next;else this.head = this.tail = null;
		          } else {
		            this.head = p;
		            p.data = buf.slice(nb);
		          }

		          break;
		        }

		        ++c;
		      }

		      this.length -= c;
		      return ret;
		    } // Make sure the linked list only shows the minimal necessary information.

		  }, {
		    key: custom,
		    value: function value(_, options) {
		      return inspect$1(this, _objectSpread({}, options, {
		        // Only inspect one level.
		        depth: 0,
		        // It should not recurse.
		        customInspect: false
		      }));
		    }
		  }]);

		  return BufferList;
		}();

		function destroy(err, cb) {
		  var _this = this;

		  var readableDestroyed = this._readableState && this._readableState.destroyed;
		  var writableDestroyed = this._writableState && this._writableState.destroyed;

		  if (readableDestroyed || writableDestroyed) {
		    if (cb) {
		      cb(err);
		    } else if (err) {
		      if (!this._writableState) {
		        nextTick(emitErrorNT, this, err);
		      } else if (!this._writableState.errorEmitted) {
		        this._writableState.errorEmitted = true;
		        nextTick(emitErrorNT, this, err);
		      }
		    }

		    return this;
		  } // we set destroyed to true before firing error callbacks in order
		  // to make it re-entrance safe in case destroy() is called within callbacks


		  if (this._readableState) {
		    this._readableState.destroyed = true;
		  } // if this is a duplex stream mark the writable part as destroyed as well


		  if (this._writableState) {
		    this._writableState.destroyed = true;
		  }

		  this._destroy(err || null, function (err) {
		    if (!cb && err) {
		      if (!_this._writableState) {
		        nextTick(emitErrorAndCloseNT, _this, err);
		      } else if (!_this._writableState.errorEmitted) {
		        _this._writableState.errorEmitted = true;
		        nextTick(emitErrorAndCloseNT, _this, err);
		      } else {
		        nextTick(emitCloseNT, _this);
		      }
		    } else if (cb) {
		      nextTick(emitCloseNT, _this);
		      cb(err);
		    } else {
		      nextTick(emitCloseNT, _this);
		    }
		  });

		  return this;
		}

		function emitErrorAndCloseNT(self, err) {
		  emitErrorNT(self, err);
		  emitCloseNT(self);
		}

		function emitCloseNT(self) {
		  if (self._writableState && !self._writableState.emitClose) return;
		  if (self._readableState && !self._readableState.emitClose) return;
		  self.emit('close');
		}

		function undestroy() {
		  if (this._readableState) {
		    this._readableState.destroyed = false;
		    this._readableState.reading = false;
		    this._readableState.ended = false;
		    this._readableState.endEmitted = false;
		  }

		  if (this._writableState) {
		    this._writableState.destroyed = false;
		    this._writableState.ended = false;
		    this._writableState.ending = false;
		    this._writableState.finalCalled = false;
		    this._writableState.prefinished = false;
		    this._writableState.finished = false;
		    this._writableState.errorEmitted = false;
		  }
		}

		function emitErrorNT(self, err) {
		  self.emit('error', err);
		}

		function errorOrDestroy(stream, err) {
		  // We have tests that rely on errors being emitted
		  // in the same tick, so changing this is semver major.
		  // For now when you opt-in to autoDestroy we allow
		  // the error to be emitted nextTick. In a future
		  // semver major update we should change the default to this.
		  var rState = stream._readableState;
		  var wState = stream._writableState;
		  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
		}

		var destroy_1 = {
		  destroy: destroy,
		  undestroy: undestroy,
		  errorOrDestroy: errorOrDestroy
		};

		function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

		var codes = {};

		function createErrorType(code, message, Base) {
		  if (!Base) {
		    Base = Error;
		  }

		  function getMessage(arg1, arg2, arg3) {
		    if (typeof message === 'string') {
		      return message;
		    } else {
		      return message(arg1, arg2, arg3);
		    }
		  }

		  var NodeError =
		  /*#__PURE__*/
		  function (_Base) {
		    _inheritsLoose(NodeError, _Base);

		    function NodeError(arg1, arg2, arg3) {
		      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
		    }

		    return NodeError;
		  }(Base);

		  NodeError.prototype.name = Base.name;
		  NodeError.prototype.code = code;
		  codes[code] = NodeError;
		} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


		function oneOf(expected, thing) {
		  if (Array.isArray(expected)) {
		    var len = expected.length;
		    expected = expected.map(function (i) {
		      return String(i);
		    });

		    if (len > 2) {
		      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
		    } else if (len === 2) {
		      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
		    } else {
		      return "of ".concat(thing, " ").concat(expected[0]);
		    }
		  } else {
		    return "of ".concat(thing, " ").concat(String(expected));
		  }
		} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


		function startsWith(str, search, pos) {
		  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
		} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


		function endsWith(str, search, this_len) {
		  if (this_len === undefined || this_len > str.length) {
		    this_len = str.length;
		  }

		  return str.substring(this_len - search.length, this_len) === search;
		} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


		function includes(str, search, start) {
		  if (typeof start !== 'number') {
		    start = 0;
		  }

		  if (start + search.length > str.length) {
		    return false;
		  } else {
		    return str.indexOf(search, start) !== -1;
		  }
		}

		createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
		  return 'The value "' + value + '" is invalid for option "' + name + '"';
		}, TypeError);
		createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
		  // determiner: 'must be' or 'must not be'
		  var determiner;

		  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
		    determiner = 'must not be';
		    expected = expected.replace(/^not /, '');
		  } else {
		    determiner = 'must be';
		  }

		  var msg;

		  if (endsWith(name, ' argument')) {
		    // For cases like 'first argument'
		    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
		  } else {
		    var type = includes(name, '.') ? 'property' : 'argument';
		    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
		  }

		  msg += ". Received type ".concat(typeof actual);
		  return msg;
		}, TypeError);
		createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
		createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
		  return 'The ' + name + ' method is not implemented';
		});
		createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
		createErrorType('ERR_STREAM_DESTROYED', function (name) {
		  return 'Cannot call ' + name + ' after a stream was destroyed';
		});
		createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
		createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
		createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
		createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
		createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
		  return 'Unknown encoding: ' + arg;
		}, TypeError);
		createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
		var codes_1 = codes;

		var errorsBrowser = {
			codes: codes_1
		};

		var ERR_INVALID_OPT_VALUE = errorsBrowser.codes.ERR_INVALID_OPT_VALUE;

		function highWaterMarkFrom(options, isDuplex, duplexKey) {
		  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
		}

		function getHighWaterMark(state, options, duplexKey, isDuplex) {
		  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

		  if (hwm != null) {
		    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
		      var name = isDuplex ? duplexKey : 'highWaterMark';
		      throw new ERR_INVALID_OPT_VALUE(name, hwm);
		    }

		    return Math.floor(hwm);
		  } // Default value


		  return state.objectMode ? 16 : 16 * 1024;
		}

		var state = {
		  getHighWaterMark: getHighWaterMark
		};

		/**
		 * Module exports.
		 */

		var browser$1 = deprecate$1;

		/**
		 * Mark that a method should not be used.
		 * Returns a modified function which warns once by default.
		 *
		 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
		 *
		 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
		 * will throw an Error when invoked.
		 *
		 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
		 * will invoke `console.trace()` instead of `console.error()`.
		 *
		 * @param {Function} fn - the function to deprecate
		 * @param {String} msg - the string to print to the console when `fn` is invoked
		 * @returns {Function} a new "deprecated" version of `fn`
		 * @api public
		 */

		function deprecate$1 (fn, msg) {
		  if (config$1('noDeprecation')) {
		    return fn;
		  }

		  var warned = false;
		  function deprecated() {
		    if (!warned) {
		      if (config$1('throwDeprecation')) {
		        throw new Error(msg);
		      } else if (config$1('traceDeprecation')) {
		        console.trace(msg);
		      } else {
		        console.warn(msg);
		      }
		      warned = true;
		    }
		    return fn.apply(this, arguments);
		  }

		  return deprecated;
		}

		/**
		 * Checks `localStorage` for boolean values for the given `name`.
		 *
		 * @param {String} name
		 * @returns {Boolean}
		 * @api private
		 */

		function config$1 (name) {
		  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
		  try {
		    if (!commonjsGlobal$1.localStorage) return false;
		  } catch (_) {
		    return false;
		  }
		  var val = commonjsGlobal$1.localStorage[name];
		  if (null == val) return false;
		  return String(val).toLowerCase() === 'true';
		}

		var _stream_writable = Writable$1;
		// there will be only 2 of these for each stream


		function CorkedRequest$1(state) {
		  var _this = this;

		  this.next = null;
		  this.entry = null;

		  this.finish = function () {
		    onCorkedFinish(_this, state);
		  };
		}
		/* </replacement> */

		/*<replacement>*/


		var Duplex$1;
		/*</replacement>*/

		Writable$1.WritableState = WritableState$1;
		/*<replacement>*/

		var internalUtil = {
		  deprecate: browser$1
		};
		/*</replacement>*/

		/*<replacement>*/


		/*</replacement>*/


		var Buffer$4 = buffer_1.Buffer;

		var OurUint8Array = commonjsGlobal$1.Uint8Array || function () {};

		function _uint8ArrayToBuffer(chunk) {
		  return Buffer$4.from(chunk);
		}

		function _isUint8Array(obj) {
		  return Buffer$4.isBuffer(obj) || obj instanceof OurUint8Array;
		}



		var getHighWaterMark$1 = state.getHighWaterMark;

		var _require$codes = errorsBrowser.codes,
		    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
		    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
		    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
		    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
		    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
		    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
		    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
		    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

		var errorOrDestroy$1 = destroy_1.errorOrDestroy;

		inherits_browser(Writable$1, streamBrowser);

		function nop$1() {}

		function WritableState$1(options, stream, isDuplex) {
		  Duplex$1 = Duplex$1 || _stream_duplex;
		  options = options || {}; // Duplex streams are both readable and writable, but share
		  // the same options object.
		  // However, some cases require setting options to different
		  // values for the readable and the writable sides of the duplex stream,
		  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

		  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex$1; // object stream flag to indicate whether or not this stream
		  // contains buffers or objects.

		  this.objectMode = !!options.objectMode;
		  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
		  // Note: 0 is a valid value, means that we always return false if
		  // the entire buffer is not flushed immediately on write()

		  this.highWaterMark = getHighWaterMark$1(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

		  this.finalCalled = false; // drain event flag.

		  this.needDrain = false; // at the start of calling end()

		  this.ending = false; // when end() has been called, and returned

		  this.ended = false; // when 'finish' is emitted

		  this.finished = false; // has it been destroyed

		  this.destroyed = false; // should we decode strings into buffers before passing to _write?
		  // this is here so that some node-core streams can optimize string
		  // handling at a lower level.

		  var noDecode = options.decodeStrings === false;
		  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
		  // encoding is 'binary' so we have to make this configurable.
		  // Everything else in the universe uses 'utf8', though.

		  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
		  // of how much we're waiting to get pushed to some underlying
		  // socket or file.

		  this.length = 0; // a flag to see when we're in the middle of a write.

		  this.writing = false; // when true all writes will be buffered until .uncork() call

		  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
		  // or on a later tick.  We set this to true at first, because any
		  // actions that shouldn't happen until "later" should generally also
		  // not happen before the first write call.

		  this.sync = true; // a flag to know if we're processing previously buffered items, which
		  // may call the _write() callback in the same tick, so that we don't
		  // end up in an overlapped onwrite situation.

		  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

		  this.onwrite = function (er) {
		    onwrite$1(stream, er);
		  }; // the callback that the user supplies to write(chunk,encoding,cb)


		  this.writecb = null; // the amount that is being written when _write is called.

		  this.writelen = 0;
		  this.bufferedRequest = null;
		  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
		  // this must be 0 before 'finish' can be emitted

		  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
		  // This is relevant for synchronous Transform streams

		  this.prefinished = false; // True if the error was already emitted and should not be thrown again

		  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

		  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

		  this.autoDestroy = !!options.autoDestroy; // count buffered requests

		  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
		  // one allocated and free to use, and we maintain at most two

		  this.corkedRequestsFree = new CorkedRequest$1(this);
		}

		WritableState$1.prototype.getBuffer = function getBuffer() {
		  var current = this.bufferedRequest;
		  var out = [];

		  while (current) {
		    out.push(current);
		    current = current.next;
		  }

		  return out;
		};

		(function () {
		  try {
		    Object.defineProperty(WritableState$1.prototype, 'buffer', {
		      get: internalUtil.deprecate(function writableStateBufferGetter() {
		        return this.getBuffer();
		      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
		    });
		  } catch (_) {}
		})(); // Test _writableState for inheritance to account for Duplex streams,
		// whose prototype chain only points to Readable.


		var realHasInstance;

		if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
		  realHasInstance = Function.prototype[Symbol.hasInstance];
		  Object.defineProperty(Writable$1, Symbol.hasInstance, {
		    value: function value(object) {
		      if (realHasInstance.call(this, object)) return true;
		      if (this !== Writable$1) return false;
		      return object && object._writableState instanceof WritableState$1;
		    }
		  });
		} else {
		  realHasInstance = function realHasInstance(object) {
		    return object instanceof this;
		  };
		}

		function Writable$1(options) {
		  Duplex$1 = Duplex$1 || _stream_duplex; // Writable ctor is applied to Duplexes, too.
		  // `realHasInstance` is necessary because using plain `instanceof`
		  // would return false, as no `_writableState` property is attached.
		  // Trying to use the custom `instanceof` for Writable here will also break the
		  // Node.js LazyTransform implementation, which has a non-trivial getter for
		  // `_writableState` that would lead to infinite recursion.
		  // Checking for a Stream.Duplex instance is faster here instead of inside
		  // the WritableState constructor, at least with V8 6.5

		  var isDuplex = this instanceof Duplex$1;
		  if (!isDuplex && !realHasInstance.call(Writable$1, this)) return new Writable$1(options);
		  this._writableState = new WritableState$1(options, this, isDuplex); // legacy.

		  this.writable = true;

		  if (options) {
		    if (typeof options.write === 'function') this._write = options.write;
		    if (typeof options.writev === 'function') this._writev = options.writev;
		    if (typeof options.destroy === 'function') this._destroy = options.destroy;
		    if (typeof options.final === 'function') this._final = options.final;
		  }

		  streamBrowser.call(this);
		} // Otherwise people can pipe Writable streams, which is just wrong.


		Writable$1.prototype.pipe = function () {
		  errorOrDestroy$1(this, new ERR_STREAM_CANNOT_PIPE());
		};

		function writeAfterEnd$1(stream, cb) {
		  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

		  errorOrDestroy$1(stream, er);
		  nextTick(cb, er);
		} // Checks that a user-supplied chunk is valid, especially for the particular
		// mode the stream is in. Currently this means that `null` is never accepted
		// and undefined/non-string values are only allowed in object mode.


		function validChunk$1(stream, state, chunk, cb) {
		  var er;

		  if (chunk === null) {
		    er = new ERR_STREAM_NULL_VALUES();
		  } else if (typeof chunk !== 'string' && !state.objectMode) {
		    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
		  }

		  if (er) {
		    errorOrDestroy$1(stream, er);
		    nextTick(cb, er);
		    return false;
		  }

		  return true;
		}

		Writable$1.prototype.write = function (chunk, encoding, cb) {
		  var state = this._writableState;
		  var ret = false;

		  var isBuf = !state.objectMode && _isUint8Array(chunk);

		  if (isBuf && !Buffer$4.isBuffer(chunk)) {
		    chunk = _uint8ArrayToBuffer(chunk);
		  }

		  if (typeof encoding === 'function') {
		    cb = encoding;
		    encoding = null;
		  }

		  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
		  if (typeof cb !== 'function') cb = nop$1;
		  if (state.ending) writeAfterEnd$1(this, cb);else if (isBuf || validChunk$1(this, state, chunk, cb)) {
		    state.pendingcb++;
		    ret = writeOrBuffer$1(this, state, isBuf, chunk, encoding, cb);
		  }
		  return ret;
		};

		Writable$1.prototype.cork = function () {
		  this._writableState.corked++;
		};

		Writable$1.prototype.uncork = function () {
		  var state = this._writableState;

		  if (state.corked) {
		    state.corked--;
		    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer$1(this, state);
		  }
		};

		Writable$1.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
		  // node::ParseEncoding() requires lower case.
		  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
		  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
		  this._writableState.defaultEncoding = encoding;
		  return this;
		};

		Object.defineProperty(Writable$1.prototype, 'writableBuffer', {
		  // making it explicit this property is not enumerable
		  // because otherwise some prototype manipulation in
		  // userland will fail
		  enumerable: false,
		  get: function get() {
		    return this._writableState && this._writableState.getBuffer();
		  }
		});

		function decodeChunk$1(state, chunk, encoding) {
		  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
		    chunk = Buffer$4.from(chunk, encoding);
		  }

		  return chunk;
		}

		Object.defineProperty(Writable$1.prototype, 'writableHighWaterMark', {
		  // making it explicit this property is not enumerable
		  // because otherwise some prototype manipulation in
		  // userland will fail
		  enumerable: false,
		  get: function get() {
		    return this._writableState.highWaterMark;
		  }
		}); // if we're already writing something, then just put this
		// in the queue, and wait our turn.  Otherwise, call _write
		// If we return false, then we need a drain event, so set that flag.

		function writeOrBuffer$1(stream, state, isBuf, chunk, encoding, cb) {
		  if (!isBuf) {
		    var newChunk = decodeChunk$1(state, chunk, encoding);

		    if (chunk !== newChunk) {
		      isBuf = true;
		      encoding = 'buffer';
		      chunk = newChunk;
		    }
		  }

		  var len = state.objectMode ? 1 : chunk.length;
		  state.length += len;
		  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

		  if (!ret) state.needDrain = true;

		  if (state.writing || state.corked) {
		    var last = state.lastBufferedRequest;
		    state.lastBufferedRequest = {
		      chunk: chunk,
		      encoding: encoding,
		      isBuf: isBuf,
		      callback: cb,
		      next: null
		    };

		    if (last) {
		      last.next = state.lastBufferedRequest;
		    } else {
		      state.bufferedRequest = state.lastBufferedRequest;
		    }

		    state.bufferedRequestCount += 1;
		  } else {
		    doWrite$1(stream, state, false, len, chunk, encoding, cb);
		  }

		  return ret;
		}

		function doWrite$1(stream, state, writev, len, chunk, encoding, cb) {
		  state.writelen = len;
		  state.writecb = cb;
		  state.writing = true;
		  state.sync = true;
		  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
		  state.sync = false;
		}

		function onwriteError$1(stream, state, sync, er, cb) {
		  --state.pendingcb;

		  if (sync) {
		    // defer the callback if we are being called synchronously
		    // to avoid piling up things on the stack
		    nextTick(cb, er); // this can emit finish, and it will always happen
		    // after error

		    nextTick(finishMaybe$1, stream, state);
		    stream._writableState.errorEmitted = true;
		    errorOrDestroy$1(stream, er);
		  } else {
		    // the caller expect this to happen before if
		    // it is async
		    cb(er);
		    stream._writableState.errorEmitted = true;
		    errorOrDestroy$1(stream, er); // this can emit finish, but finish must
		    // always follow error

		    finishMaybe$1(stream, state);
		  }
		}

		function onwriteStateUpdate$1(state) {
		  state.writing = false;
		  state.writecb = null;
		  state.length -= state.writelen;
		  state.writelen = 0;
		}

		function onwrite$1(stream, er) {
		  var state = stream._writableState;
		  var sync = state.sync;
		  var cb = state.writecb;
		  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
		  onwriteStateUpdate$1(state);
		  if (er) onwriteError$1(stream, state, sync, er, cb);else {
		    // Check if we're actually ready to finish, but don't emit yet
		    var finished = needFinish$1(state) || stream.destroyed;

		    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
		      clearBuffer$1(stream, state);
		    }

		    if (sync) {
		      nextTick(afterWrite$1, stream, state, finished, cb);
		    } else {
		      afterWrite$1(stream, state, finished, cb);
		    }
		  }
		}

		function afterWrite$1(stream, state, finished, cb) {
		  if (!finished) onwriteDrain$1(stream, state);
		  state.pendingcb--;
		  cb();
		  finishMaybe$1(stream, state);
		} // Must force callback to be called on nextTick, so that we don't
		// emit 'drain' before the write() consumer gets the 'false' return
		// value, and has a chance to attach a 'drain' listener.


		function onwriteDrain$1(stream, state) {
		  if (state.length === 0 && state.needDrain) {
		    state.needDrain = false;
		    stream.emit('drain');
		  }
		} // if there's something in the buffer waiting, then process it


		function clearBuffer$1(stream, state) {
		  state.bufferProcessing = true;
		  var entry = state.bufferedRequest;

		  if (stream._writev && entry && entry.next) {
		    // Fast case, write everything using _writev()
		    var l = state.bufferedRequestCount;
		    var buffer = new Array(l);
		    var holder = state.corkedRequestsFree;
		    holder.entry = entry;
		    var count = 0;
		    var allBuffers = true;

		    while (entry) {
		      buffer[count] = entry;
		      if (!entry.isBuf) allBuffers = false;
		      entry = entry.next;
		      count += 1;
		    }

		    buffer.allBuffers = allBuffers;
		    doWrite$1(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
		    // as the hot path ends with doWrite

		    state.pendingcb++;
		    state.lastBufferedRequest = null;

		    if (holder.next) {
		      state.corkedRequestsFree = holder.next;
		      holder.next = null;
		    } else {
		      state.corkedRequestsFree = new CorkedRequest$1(state);
		    }

		    state.bufferedRequestCount = 0;
		  } else {
		    // Slow case, write chunks one-by-one
		    while (entry) {
		      var chunk = entry.chunk;
		      var encoding = entry.encoding;
		      var cb = entry.callback;
		      var len = state.objectMode ? 1 : chunk.length;
		      doWrite$1(stream, state, false, len, chunk, encoding, cb);
		      entry = entry.next;
		      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
		      // it means that we need to wait until it does.
		      // also, that means that the chunk and cb are currently
		      // being processed, so move the buffer counter past them.

		      if (state.writing) {
		        break;
		      }
		    }

		    if (entry === null) state.lastBufferedRequest = null;
		  }

		  state.bufferedRequest = entry;
		  state.bufferProcessing = false;
		}

		Writable$1.prototype._write = function (chunk, encoding, cb) {
		  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
		};

		Writable$1.prototype._writev = null;

		Writable$1.prototype.end = function (chunk, encoding, cb) {
		  var state = this._writableState;

		  if (typeof chunk === 'function') {
		    cb = chunk;
		    chunk = null;
		    encoding = null;
		  } else if (typeof encoding === 'function') {
		    cb = encoding;
		    encoding = null;
		  }

		  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

		  if (state.corked) {
		    state.corked = 1;
		    this.uncork();
		  } // ignore unnecessary end() calls.


		  if (!state.ending) endWritable$1(this, state, cb);
		  return this;
		};

		Object.defineProperty(Writable$1.prototype, 'writableLength', {
		  // making it explicit this property is not enumerable
		  // because otherwise some prototype manipulation in
		  // userland will fail
		  enumerable: false,
		  get: function get() {
		    return this._writableState.length;
		  }
		});

		function needFinish$1(state) {
		  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
		}

		function callFinal(stream, state) {
		  stream._final(function (err) {
		    state.pendingcb--;

		    if (err) {
		      errorOrDestroy$1(stream, err);
		    }

		    state.prefinished = true;
		    stream.emit('prefinish');
		    finishMaybe$1(stream, state);
		  });
		}

		function prefinish$1(stream, state) {
		  if (!state.prefinished && !state.finalCalled) {
		    if (typeof stream._final === 'function' && !state.destroyed) {
		      state.pendingcb++;
		      state.finalCalled = true;
		      nextTick(callFinal, stream, state);
		    } else {
		      state.prefinished = true;
		      stream.emit('prefinish');
		    }
		  }
		}

		function finishMaybe$1(stream, state) {
		  var need = needFinish$1(state);

		  if (need) {
		    prefinish$1(stream, state);

		    if (state.pendingcb === 0) {
		      state.finished = true;
		      stream.emit('finish');

		      if (state.autoDestroy) {
		        // In case of duplex streams we need a way to detect
		        // if the readable side is ready for autoDestroy as well
		        var rState = stream._readableState;

		        if (!rState || rState.autoDestroy && rState.endEmitted) {
		          stream.destroy();
		        }
		      }
		    }
		  }

		  return need;
		}

		function endWritable$1(stream, state, cb) {
		  state.ending = true;
		  finishMaybe$1(stream, state);

		  if (cb) {
		    if (state.finished) nextTick(cb);else stream.once('finish', cb);
		  }

		  state.ended = true;
		  stream.writable = false;
		}

		function onCorkedFinish(corkReq, state, err) {
		  var entry = corkReq.entry;
		  corkReq.entry = null;

		  while (entry) {
		    var cb = entry.callback;
		    state.pendingcb--;
		    cb(err);
		    entry = entry.next;
		  } // reuse the free corkReq.


		  state.corkedRequestsFree.next = corkReq;
		}

		Object.defineProperty(Writable$1.prototype, 'destroyed', {
		  // making it explicit this property is not enumerable
		  // because otherwise some prototype manipulation in
		  // userland will fail
		  enumerable: false,
		  get: function get() {
		    if (this._writableState === undefined) {
		      return false;
		    }

		    return this._writableState.destroyed;
		  },
		  set: function set(value) {
		    // we ignore the value if the stream
		    // has not been initialized yet
		    if (!this._writableState) {
		      return;
		    } // backward compatibility, the user is explicitly
		    // managing destroyed


		    this._writableState.destroyed = value;
		  }
		});
		Writable$1.prototype.destroy = destroy_1.destroy;
		Writable$1.prototype._undestroy = destroy_1.undestroy;

		Writable$1.prototype._destroy = function (err, cb) {
		  cb(err);
		};

		/*<replacement>*/

		var objectKeys = Object.keys || function (obj) {
		  var keys = [];

		  for (var key in obj) {
		    keys.push(key);
		  }

		  return keys;
		};
		/*</replacement>*/


		var _stream_duplex = Duplex$2;





		inherits_browser(Duplex$2, _stream_readable);

		{
		  // Allow the keys array to be GC'ed.
		  var keys$1 = objectKeys(_stream_writable.prototype);

		  for (var v$3 = 0; v$3 < keys$1.length; v$3++) {
		    var method$1 = keys$1[v$3];
		    if (!Duplex$2.prototype[method$1]) Duplex$2.prototype[method$1] = _stream_writable.prototype[method$1];
		  }
		}

		function Duplex$2(options) {
		  if (!(this instanceof Duplex$2)) return new Duplex$2(options);
		  _stream_readable.call(this, options);
		  _stream_writable.call(this, options);
		  this.allowHalfOpen = true;

		  if (options) {
		    if (options.readable === false) this.readable = false;
		    if (options.writable === false) this.writable = false;

		    if (options.allowHalfOpen === false) {
		      this.allowHalfOpen = false;
		      this.once('end', onend$1);
		    }
		  }
		}

		Object.defineProperty(Duplex$2.prototype, 'writableHighWaterMark', {
		  // making it explicit this property is not enumerable
		  // because otherwise some prototype manipulation in
		  // userland will fail
		  enumerable: false,
		  get: function get() {
		    return this._writableState.highWaterMark;
		  }
		});
		Object.defineProperty(Duplex$2.prototype, 'writableBuffer', {
		  // making it explicit this property is not enumerable
		  // because otherwise some prototype manipulation in
		  // userland will fail
		  enumerable: false,
		  get: function get() {
		    return this._writableState && this._writableState.getBuffer();
		  }
		});
		Object.defineProperty(Duplex$2.prototype, 'writableLength', {
		  // making it explicit this property is not enumerable
		  // because otherwise some prototype manipulation in
		  // userland will fail
		  enumerable: false,
		  get: function get() {
		    return this._writableState.length;
		  }
		}); // the no-half-open enforcer

		function onend$1() {
		  // If the writable side ended, then we're ok.
		  if (this._writableState.ended) return; // no more data can be written.
		  // But allow more writes to happen in this tick.

		  nextTick(onEndNT$1, this);
		}

		function onEndNT$1(self) {
		  self.end();
		}

		Object.defineProperty(Duplex$2.prototype, 'destroyed', {
		  // making it explicit this property is not enumerable
		  // because otherwise some prototype manipulation in
		  // userland will fail
		  enumerable: false,
		  get: function get() {
		    if (this._readableState === undefined || this._writableState === undefined) {
		      return false;
		    }

		    return this._readableState.destroyed && this._writableState.destroyed;
		  },
		  set: function set(value) {
		    // we ignore the value if the stream
		    // has not been initialized yet
		    if (this._readableState === undefined || this._writableState === undefined) {
		      return;
		    } // backward compatibility, the user is explicitly
		    // managing destroyed


		    this._readableState.destroyed = value;
		    this._writableState.destroyed = value;
		  }
		});

		var safeBuffer$2 = createCommonjsModule(function (module, exports) {
		/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
		/* eslint-disable node/no-deprecated-api */

		var Buffer = buffer_1.Buffer;

		// alternative to using Object.keys for old browsers
		function copyProps (src, dst) {
		  for (var key in src) {
		    dst[key] = src[key];
		  }
		}
		if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
		  module.exports = buffer_1;
		} else {
		  // Copy properties from require('buffer')
		  copyProps(buffer_1, exports);
		  exports.Buffer = SafeBuffer;
		}

		function SafeBuffer (arg, encodingOrOffset, length) {
		  return Buffer(arg, encodingOrOffset, length)
		}

		SafeBuffer.prototype = Object.create(Buffer.prototype);

		// Copy static methods from Buffer
		copyProps(Buffer, SafeBuffer);

		SafeBuffer.from = function (arg, encodingOrOffset, length) {
		  if (typeof arg === 'number') {
		    throw new TypeError('Argument must not be a number')
		  }
		  return Buffer(arg, encodingOrOffset, length)
		};

		SafeBuffer.alloc = function (size, fill, encoding) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  var buf = Buffer(size);
		  if (fill !== undefined) {
		    if (typeof encoding === 'string') {
		      buf.fill(fill, encoding);
		    } else {
		      buf.fill(fill);
		    }
		  } else {
		    buf.fill(0);
		  }
		  return buf
		};

		SafeBuffer.allocUnsafe = function (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  return Buffer(size)
		};

		SafeBuffer.allocUnsafeSlow = function (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  return buffer_1.SlowBuffer(size)
		};
		});

		/*<replacement>*/

		var Buffer$5 = safeBuffer$2.Buffer;
		/*</replacement>*/

		var isEncoding = Buffer$5.isEncoding || function (encoding) {
		  encoding = '' + encoding;
		  switch (encoding && encoding.toLowerCase()) {
		    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
		      return true;
		    default:
		      return false;
		  }
		};

		function _normalizeEncoding(enc) {
		  if (!enc) return 'utf8';
		  var retried;
		  while (true) {
		    switch (enc) {
		      case 'utf8':
		      case 'utf-8':
		        return 'utf8';
		      case 'ucs2':
		      case 'ucs-2':
		      case 'utf16le':
		      case 'utf-16le':
		        return 'utf16le';
		      case 'latin1':
		      case 'binary':
		        return 'latin1';
		      case 'base64':
		      case 'ascii':
		      case 'hex':
		        return enc;
		      default:
		        if (retried) return; // undefined
		        enc = ('' + enc).toLowerCase();
		        retried = true;
		    }
		  }
		}
		// Do not cache `Buffer.isEncoding` when checking encoding names as some
		// modules monkey-patch it to support additional encodings
		function normalizeEncoding(enc) {
		  var nenc = _normalizeEncoding(enc);
		  if (typeof nenc !== 'string' && (Buffer$5.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
		  return nenc || enc;
		}

		// StringDecoder provides an interface for efficiently splitting a series of
		// buffers into a series of JS strings without breaking apart multi-byte
		// characters.
		var StringDecoder_1 = StringDecoder$2;
		function StringDecoder$2(encoding) {
		  this.encoding = normalizeEncoding(encoding);
		  var nb;
		  switch (this.encoding) {
		    case 'utf16le':
		      this.text = utf16Text;
		      this.end = utf16End;
		      nb = 4;
		      break;
		    case 'utf8':
		      this.fillLast = utf8FillLast;
		      nb = 4;
		      break;
		    case 'base64':
		      this.text = base64Text;
		      this.end = base64End;
		      nb = 3;
		      break;
		    default:
		      this.write = simpleWrite;
		      this.end = simpleEnd;
		      return;
		  }
		  this.lastNeed = 0;
		  this.lastTotal = 0;
		  this.lastChar = Buffer$5.allocUnsafe(nb);
		}

		StringDecoder$2.prototype.write = function (buf) {
		  if (buf.length === 0) return '';
		  var r;
		  var i;
		  if (this.lastNeed) {
		    r = this.fillLast(buf);
		    if (r === undefined) return '';
		    i = this.lastNeed;
		    this.lastNeed = 0;
		  } else {
		    i = 0;
		  }
		  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
		  return r || '';
		};

		StringDecoder$2.prototype.end = utf8End;

		// Returns only complete characters in a Buffer
		StringDecoder$2.prototype.text = utf8Text;

		// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
		StringDecoder$2.prototype.fillLast = function (buf) {
		  if (this.lastNeed <= buf.length) {
		    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
		    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
		  }
		  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
		  this.lastNeed -= buf.length;
		};

		// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
		// continuation byte. If an invalid byte is detected, -2 is returned.
		function utf8CheckByte(byte) {
		  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
		  return byte >> 6 === 0x02 ? -1 : -2;
		}

		// Checks at most 3 bytes at the end of a Buffer in order to detect an
		// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
		// needed to complete the UTF-8 character (if applicable) are returned.
		function utf8CheckIncomplete(self, buf, i) {
		  var j = buf.length - 1;
		  if (j < i) return 0;
		  var nb = utf8CheckByte(buf[j]);
		  if (nb >= 0) {
		    if (nb > 0) self.lastNeed = nb - 1;
		    return nb;
		  }
		  if (--j < i || nb === -2) return 0;
		  nb = utf8CheckByte(buf[j]);
		  if (nb >= 0) {
		    if (nb > 0) self.lastNeed = nb - 2;
		    return nb;
		  }
		  if (--j < i || nb === -2) return 0;
		  nb = utf8CheckByte(buf[j]);
		  if (nb >= 0) {
		    if (nb > 0) {
		      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
		    }
		    return nb;
		  }
		  return 0;
		}

		// Validates as many continuation bytes for a multi-byte UTF-8 character as
		// needed or are available. If we see a non-continuation byte where we expect
		// one, we "replace" the validated continuation bytes we've seen so far with
		// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
		// behavior. The continuation byte check is included three times in the case
		// where all of the continuation bytes for a character exist in the same buffer.
		// It is also done this way as a slight performance increase instead of using a
		// loop.
		function utf8CheckExtraBytes(self, buf, p) {
		  if ((buf[0] & 0xC0) !== 0x80) {
		    self.lastNeed = 0;
		    return '\ufffd';
		  }
		  if (self.lastNeed > 1 && buf.length > 1) {
		    if ((buf[1] & 0xC0) !== 0x80) {
		      self.lastNeed = 1;
		      return '\ufffd';
		    }
		    if (self.lastNeed > 2 && buf.length > 2) {
		      if ((buf[2] & 0xC0) !== 0x80) {
		        self.lastNeed = 2;
		        return '\ufffd';
		      }
		    }
		  }
		}

		// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
		function utf8FillLast(buf) {
		  var p = this.lastTotal - this.lastNeed;
		  var r = utf8CheckExtraBytes(this, buf);
		  if (r !== undefined) return r;
		  if (this.lastNeed <= buf.length) {
		    buf.copy(this.lastChar, p, 0, this.lastNeed);
		    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
		  }
		  buf.copy(this.lastChar, p, 0, buf.length);
		  this.lastNeed -= buf.length;
		}

		// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
		// partial character, the character's bytes are buffered until the required
		// number of bytes are available.
		function utf8Text(buf, i) {
		  var total = utf8CheckIncomplete(this, buf, i);
		  if (!this.lastNeed) return buf.toString('utf8', i);
		  this.lastTotal = total;
		  var end = buf.length - (total - this.lastNeed);
		  buf.copy(this.lastChar, 0, end);
		  return buf.toString('utf8', i, end);
		}

		// For UTF-8, a replacement character is added when ending on a partial
		// character.
		function utf8End(buf) {
		  var r = buf && buf.length ? this.write(buf) : '';
		  if (this.lastNeed) return r + '\ufffd';
		  return r;
		}

		// UTF-16LE typically needs two bytes per character, but even if we have an even
		// number of bytes available, we need to check if we end on a leading/high
		// surrogate. In that case, we need to wait for the next two bytes in order to
		// decode the last character properly.
		function utf16Text(buf, i) {
		  if ((buf.length - i) % 2 === 0) {
		    var r = buf.toString('utf16le', i);
		    if (r) {
		      var c = r.charCodeAt(r.length - 1);
		      if (c >= 0xD800 && c <= 0xDBFF) {
		        this.lastNeed = 2;
		        this.lastTotal = 4;
		        this.lastChar[0] = buf[buf.length - 2];
		        this.lastChar[1] = buf[buf.length - 1];
		        return r.slice(0, -1);
		      }
		    }
		    return r;
		  }
		  this.lastNeed = 1;
		  this.lastTotal = 2;
		  this.lastChar[0] = buf[buf.length - 1];
		  return buf.toString('utf16le', i, buf.length - 1);
		}

		// For UTF-16LE we do not explicitly append special replacement characters if we
		// end on a partial character, we simply let v8 handle that.
		function utf16End(buf) {
		  var r = buf && buf.length ? this.write(buf) : '';
		  if (this.lastNeed) {
		    var end = this.lastTotal - this.lastNeed;
		    return r + this.lastChar.toString('utf16le', 0, end);
		  }
		  return r;
		}

		function base64Text(buf, i) {
		  var n = (buf.length - i) % 3;
		  if (n === 0) return buf.toString('base64', i);
		  this.lastNeed = 3 - n;
		  this.lastTotal = 3;
		  if (n === 1) {
		    this.lastChar[0] = buf[buf.length - 1];
		  } else {
		    this.lastChar[0] = buf[buf.length - 2];
		    this.lastChar[1] = buf[buf.length - 1];
		  }
		  return buf.toString('base64', i, buf.length - n);
		}

		function base64End(buf) {
		  var r = buf && buf.length ? this.write(buf) : '';
		  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
		  return r;
		}

		// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
		function simpleWrite(buf) {
		  return buf.toString(this.encoding);
		}

		function simpleEnd(buf) {
		  return buf && buf.length ? this.write(buf) : '';
		}

		var string_decoder = {
			StringDecoder: StringDecoder_1
		};

		var ERR_STREAM_PREMATURE_CLOSE = errorsBrowser.codes.ERR_STREAM_PREMATURE_CLOSE;

		function once$1(callback) {
		  var called = false;
		  return function () {
		    if (called) return;
		    called = true;

		    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments[_key];
		    }

		    callback.apply(this, args);
		  };
		}

		function noop$1() {}

		function isRequest(stream) {
		  return stream.setHeader && typeof stream.abort === 'function';
		}

		function eos(stream, opts, callback) {
		  if (typeof opts === 'function') return eos(stream, null, opts);
		  if (!opts) opts = {};
		  callback = once$1(callback || noop$1);
		  var readable = opts.readable || opts.readable !== false && stream.readable;
		  var writable = opts.writable || opts.writable !== false && stream.writable;

		  var onlegacyfinish = function onlegacyfinish() {
		    if (!stream.writable) onfinish();
		  };

		  var writableEnded = stream._writableState && stream._writableState.finished;

		  var onfinish = function onfinish() {
		    writable = false;
		    writableEnded = true;
		    if (!readable) callback.call(stream);
		  };

		  var readableEnded = stream._readableState && stream._readableState.endEmitted;

		  var onend = function onend() {
		    readable = false;
		    readableEnded = true;
		    if (!writable) callback.call(stream);
		  };

		  var onerror = function onerror(err) {
		    callback.call(stream, err);
		  };

		  var onclose = function onclose() {
		    var err;

		    if (readable && !readableEnded) {
		      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
		      return callback.call(stream, err);
		    }

		    if (writable && !writableEnded) {
		      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
		      return callback.call(stream, err);
		    }
		  };

		  var onrequest = function onrequest() {
		    stream.req.on('finish', onfinish);
		  };

		  if (isRequest(stream)) {
		    stream.on('complete', onfinish);
		    stream.on('abort', onclose);
		    if (stream.req) onrequest();else stream.on('request', onrequest);
		  } else if (writable && !stream._writableState) {
		    // legacy streams
		    stream.on('end', onlegacyfinish);
		    stream.on('close', onlegacyfinish);
		  }

		  stream.on('end', onend);
		  stream.on('finish', onfinish);
		  if (opts.error !== false) stream.on('error', onerror);
		  stream.on('close', onclose);
		  return function () {
		    stream.removeListener('complete', onfinish);
		    stream.removeListener('abort', onclose);
		    stream.removeListener('request', onrequest);
		    if (stream.req) stream.req.removeListener('finish', onfinish);
		    stream.removeListener('end', onlegacyfinish);
		    stream.removeListener('close', onlegacyfinish);
		    stream.removeListener('finish', onfinish);
		    stream.removeListener('end', onend);
		    stream.removeListener('error', onerror);
		    stream.removeListener('close', onclose);
		  };
		}

		var endOfStream = eos;

		var _Object$setPrototypeO;

		function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



		var kLastResolve = Symbol('lastResolve');
		var kLastReject = Symbol('lastReject');
		var kError = Symbol('error');
		var kEnded = Symbol('ended');
		var kLastPromise = Symbol('lastPromise');
		var kHandlePromise = Symbol('handlePromise');
		var kStream = Symbol('stream');

		function createIterResult(value, done) {
		  return {
		    value: value,
		    done: done
		  };
		}

		function readAndResolve(iter) {
		  var resolve = iter[kLastResolve];

		  if (resolve !== null) {
		    var data = iter[kStream].read(); // we defer if data is null
		    // we can be expecting either 'end' or
		    // 'error'

		    if (data !== null) {
		      iter[kLastPromise] = null;
		      iter[kLastResolve] = null;
		      iter[kLastReject] = null;
		      resolve(createIterResult(data, false));
		    }
		  }
		}

		function onReadable(iter) {
		  // we wait for the next tick, because it might
		  // emit an error with process.nextTick
		  nextTick(readAndResolve, iter);
		}

		function wrapForNext(lastPromise, iter) {
		  return function (resolve, reject) {
		    lastPromise.then(function () {
		      if (iter[kEnded]) {
		        resolve(createIterResult(undefined, true));
		        return;
		      }

		      iter[kHandlePromise](resolve, reject);
		    }, reject);
		  };
		}

		var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
		var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
		  get stream() {
		    return this[kStream];
		  },

		  next: function next() {
		    var _this = this;

		    // if we have detected an error in the meanwhile
		    // reject straight away
		    var error = this[kError];

		    if (error !== null) {
		      return Promise.reject(error);
		    }

		    if (this[kEnded]) {
		      return Promise.resolve(createIterResult(undefined, true));
		    }

		    if (this[kStream].destroyed) {
		      // We need to defer via nextTick because if .destroy(err) is
		      // called, the error will be emitted via nextTick, and
		      // we cannot guarantee that there is no error lingering around
		      // waiting to be emitted.
		      return new Promise(function (resolve, reject) {
		        nextTick(function () {
		          if (_this[kError]) {
		            reject(_this[kError]);
		          } else {
		            resolve(createIterResult(undefined, true));
		          }
		        });
		      });
		    } // if we have multiple next() calls
		    // we will wait for the previous Promise to finish
		    // this logic is optimized to support for await loops,
		    // where next() is only called once at a time


		    var lastPromise = this[kLastPromise];
		    var promise;

		    if (lastPromise) {
		      promise = new Promise(wrapForNext(lastPromise, this));
		    } else {
		      // fast path needed to support multiple this.push()
		      // without triggering the next() queue
		      var data = this[kStream].read();

		      if (data !== null) {
		        return Promise.resolve(createIterResult(data, false));
		      }

		      promise = new Promise(this[kHandlePromise]);
		    }

		    this[kLastPromise] = promise;
		    return promise;
		  }
		}, _defineProperty$1(_Object$setPrototypeO, Symbol.asyncIterator, function () {
		  return this;
		}), _defineProperty$1(_Object$setPrototypeO, "return", function _return() {
		  var _this2 = this;

		  // destroy(err, cb) is a private API
		  // we can guarantee we have that here, because we control the
		  // Readable class this is attached to
		  return new Promise(function (resolve, reject) {
		    _this2[kStream].destroy(null, function (err) {
		      if (err) {
		        reject(err);
		        return;
		      }

		      resolve(createIterResult(undefined, true));
		    });
		  });
		}), _Object$setPrototypeO), AsyncIteratorPrototype);

		var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
		  var _Object$create;

		  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty$1(_Object$create, kStream, {
		    value: stream,
		    writable: true
		  }), _defineProperty$1(_Object$create, kLastResolve, {
		    value: null,
		    writable: true
		  }), _defineProperty$1(_Object$create, kLastReject, {
		    value: null,
		    writable: true
		  }), _defineProperty$1(_Object$create, kError, {
		    value: null,
		    writable: true
		  }), _defineProperty$1(_Object$create, kEnded, {
		    value: stream._readableState.endEmitted,
		    writable: true
		  }), _defineProperty$1(_Object$create, kHandlePromise, {
		    value: function value(resolve, reject) {
		      var data = iterator[kStream].read();

		      if (data) {
		        iterator[kLastPromise] = null;
		        iterator[kLastResolve] = null;
		        iterator[kLastReject] = null;
		        resolve(createIterResult(data, false));
		      } else {
		        iterator[kLastResolve] = resolve;
		        iterator[kLastReject] = reject;
		      }
		    },
		    writable: true
		  }), _Object$create));
		  iterator[kLastPromise] = null;
		  endOfStream(stream, function (err) {
		    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
		      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
		      // returned by next() and store the error

		      if (reject !== null) {
		        iterator[kLastPromise] = null;
		        iterator[kLastResolve] = null;
		        iterator[kLastReject] = null;
		        reject(err);
		      }

		      iterator[kError] = err;
		      return;
		    }

		    var resolve = iterator[kLastResolve];

		    if (resolve !== null) {
		      iterator[kLastPromise] = null;
		      iterator[kLastResolve] = null;
		      iterator[kLastReject] = null;
		      resolve(createIterResult(undefined, true));
		    }

		    iterator[kEnded] = true;
		  });
		  stream.on('readable', onReadable.bind(null, iterator));
		  return iterator;
		};

		var async_iterator = createReadableStreamAsyncIterator;

		var fromBrowser = function () {
		  throw new Error('Readable.from is not available in the browser')
		};

		var _stream_readable = Readable$1;
		/*<replacement>*/

		var Duplex$3;
		/*</replacement>*/

		Readable$1.ReadableState = ReadableState$1;
		/*<replacement>*/

		var EE = require$$0.EventEmitter;

		var EElistenerCount = function EElistenerCount(emitter, type) {
		  return emitter.listeners(type).length;
		};
		/*</replacement>*/

		/*<replacement>*/



		/*</replacement>*/


		var Buffer$6 = buffer_1.Buffer;

		var OurUint8Array$1 = commonjsGlobal$1.Uint8Array || function () {};

		function _uint8ArrayToBuffer$1(chunk) {
		  return Buffer$6.from(chunk);
		}

		function _isUint8Array$1(obj) {
		  return Buffer$6.isBuffer(obj) || obj instanceof OurUint8Array$1;
		}
		/*<replacement>*/




		var debug$1;

		if (debugUtil && debugUtil.debuglog) {
		  debug$1 = debugUtil.debuglog('stream');
		} else {
		  debug$1 = function debug() {};
		}
		/*</replacement>*/






		var getHighWaterMark$2 = state.getHighWaterMark;

		var _require$codes$1 = errorsBrowser.codes,
		    ERR_INVALID_ARG_TYPE$1 = _require$codes$1.ERR_INVALID_ARG_TYPE,
		    ERR_STREAM_PUSH_AFTER_EOF = _require$codes$1.ERR_STREAM_PUSH_AFTER_EOF,
		    ERR_METHOD_NOT_IMPLEMENTED$1 = _require$codes$1.ERR_METHOD_NOT_IMPLEMENTED,
		    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes$1.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


		var StringDecoder$3;
		var createReadableStreamAsyncIterator$1;
		var from$1;

		inherits_browser(Readable$1, streamBrowser);

		var errorOrDestroy$2 = destroy_1.errorOrDestroy;
		var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

		function prependListener$1(emitter, event, fn) {
		  // Sadly this is not cacheable as some libraries bundle their own
		  // event emitter implementation with them.
		  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
		  // userland ones.  NEVER DO THIS. This is here only because this code needs
		  // to continue to work with older versions of Node.js that do not include
		  // the prependListener() method. The goal is to eventually remove this hack.

		  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
		}

		function ReadableState$1(options, stream, isDuplex) {
		  Duplex$3 = Duplex$3 || _stream_duplex;
		  options = options || {}; // Duplex streams are both readable and writable, but share
		  // the same options object.
		  // However, some cases require setting options to different
		  // values for the readable and the writable sides of the duplex stream.
		  // These options can be provided separately as readableXXX and writableXXX.

		  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex$3; // object stream flag. Used to make read(n) ignore n and to
		  // make all the buffer merging and length checks go away

		  this.objectMode = !!options.objectMode;
		  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
		  // Note: 0 is a valid value, means "don't call _read preemptively ever"

		  this.highWaterMark = getHighWaterMark$2(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
		  // linked list can remove elements from the beginning faster than
		  // array.shift()

		  this.buffer = new buffer_list();
		  this.length = 0;
		  this.pipes = null;
		  this.pipesCount = 0;
		  this.flowing = null;
		  this.ended = false;
		  this.endEmitted = false;
		  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
		  // immediately, or on a later tick.  We set this to true at first, because
		  // any actions that shouldn't happen until "later" should generally also
		  // not happen before the first read call.

		  this.sync = true; // whenever we return null, then we set a flag to say
		  // that we're awaiting a 'readable' event emission.

		  this.needReadable = false;
		  this.emittedReadable = false;
		  this.readableListening = false;
		  this.resumeScheduled = false;
		  this.paused = true; // Should close be emitted on destroy. Defaults to true.

		  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

		  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

		  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
		  // encoding is 'binary' so we have to make this configurable.
		  // Everything else in the universe uses 'utf8', though.

		  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

		  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

		  this.readingMore = false;
		  this.decoder = null;
		  this.encoding = null;

		  if (options.encoding) {
		    if (!StringDecoder$3) StringDecoder$3 = string_decoder.StringDecoder;
		    this.decoder = new StringDecoder$3(options.encoding);
		    this.encoding = options.encoding;
		  }
		}

		function Readable$1(options) {
		  Duplex$3 = Duplex$3 || _stream_duplex;
		  if (!(this instanceof Readable$1)) return new Readable$1(options); // Checking for a Stream.Duplex instance is faster here instead of inside
		  // the ReadableState constructor, at least with V8 6.5

		  var isDuplex = this instanceof Duplex$3;
		  this._readableState = new ReadableState$1(options, this, isDuplex); // legacy

		  this.readable = true;

		  if (options) {
		    if (typeof options.read === 'function') this._read = options.read;
		    if (typeof options.destroy === 'function') this._destroy = options.destroy;
		  }

		  streamBrowser.call(this);
		}

		Object.defineProperty(Readable$1.prototype, 'destroyed', {
		  // making it explicit this property is not enumerable
		  // because otherwise some prototype manipulation in
		  // userland will fail
		  enumerable: false,
		  get: function get() {
		    if (this._readableState === undefined) {
		      return false;
		    }

		    return this._readableState.destroyed;
		  },
		  set: function set(value) {
		    // we ignore the value if the stream
		    // has not been initialized yet
		    if (!this._readableState) {
		      return;
		    } // backward compatibility, the user is explicitly
		    // managing destroyed


		    this._readableState.destroyed = value;
		  }
		});
		Readable$1.prototype.destroy = destroy_1.destroy;
		Readable$1.prototype._undestroy = destroy_1.undestroy;

		Readable$1.prototype._destroy = function (err, cb) {
		  cb(err);
		}; // Manually shove something into the read() buffer.
		// This returns true if the highWaterMark has not been hit yet,
		// similar to how Writable.write() returns true if you should
		// write() some more.


		Readable$1.prototype.push = function (chunk, encoding) {
		  var state = this._readableState;
		  var skipChunkCheck;

		  if (!state.objectMode) {
		    if (typeof chunk === 'string') {
		      encoding = encoding || state.defaultEncoding;

		      if (encoding !== state.encoding) {
		        chunk = Buffer$6.from(chunk, encoding);
		        encoding = '';
		      }

		      skipChunkCheck = true;
		    }
		  } else {
		    skipChunkCheck = true;
		  }

		  return readableAddChunk$1(this, chunk, encoding, false, skipChunkCheck);
		}; // Unshift should *always* be something directly out of read()


		Readable$1.prototype.unshift = function (chunk) {
		  return readableAddChunk$1(this, chunk, null, true, false);
		};

		function readableAddChunk$1(stream, chunk, encoding, addToFront, skipChunkCheck) {
		  debug$1('readableAddChunk', chunk);
		  var state = stream._readableState;

		  if (chunk === null) {
		    state.reading = false;
		    onEofChunk$1(stream, state);
		  } else {
		    var er;
		    if (!skipChunkCheck) er = chunkInvalid$1(state, chunk);

		    if (er) {
		      errorOrDestroy$2(stream, er);
		    } else if (state.objectMode || chunk && chunk.length > 0) {
		      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer$6.prototype) {
		        chunk = _uint8ArrayToBuffer$1(chunk);
		      }

		      if (addToFront) {
		        if (state.endEmitted) errorOrDestroy$2(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
		      } else if (state.ended) {
		        errorOrDestroy$2(stream, new ERR_STREAM_PUSH_AFTER_EOF());
		      } else if (state.destroyed) {
		        return false;
		      } else {
		        state.reading = false;

		        if (state.decoder && !encoding) {
		          chunk = state.decoder.write(chunk);
		          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore$1(stream, state);
		        } else {
		          addChunk(stream, state, chunk, false);
		        }
		      }
		    } else if (!addToFront) {
		      state.reading = false;
		      maybeReadMore$1(stream, state);
		    }
		  } // We can push more data if we are below the highWaterMark.
		  // Also, if we have no data yet, we can stand some more bytes.
		  // This is to work around cases where hwm=0, such as the repl.


		  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
		}

		function addChunk(stream, state, chunk, addToFront) {
		  if (state.flowing && state.length === 0 && !state.sync) {
		    state.awaitDrain = 0;
		    stream.emit('data', chunk);
		  } else {
		    // update the buffer info.
		    state.length += state.objectMode ? 1 : chunk.length;
		    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
		    if (state.needReadable) emitReadable$1(stream);
		  }

		  maybeReadMore$1(stream, state);
		}

		function chunkInvalid$1(state, chunk) {
		  var er;

		  if (!_isUint8Array$1(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
		    er = new ERR_INVALID_ARG_TYPE$1('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
		  }

		  return er;
		}

		Readable$1.prototype.isPaused = function () {
		  return this._readableState.flowing === false;
		}; // backwards compatibility.


		Readable$1.prototype.setEncoding = function (enc) {
		  if (!StringDecoder$3) StringDecoder$3 = string_decoder.StringDecoder;
		  var decoder = new StringDecoder$3(enc);
		  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

		  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

		  var p = this._readableState.buffer.head;
		  var content = '';

		  while (p !== null) {
		    content += decoder.write(p.data);
		    p = p.next;
		  }

		  this._readableState.buffer.clear();

		  if (content !== '') this._readableState.buffer.push(content);
		  this._readableState.length = content.length;
		  return this;
		}; // Don't raise the hwm > 1GB


		var MAX_HWM$1 = 0x40000000;

		function computeNewHighWaterMark$1(n) {
		  if (n >= MAX_HWM$1) {
		    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
		    n = MAX_HWM$1;
		  } else {
		    // Get the next highest power of 2 to prevent increasing hwm excessively in
		    // tiny amounts
		    n--;
		    n |= n >>> 1;
		    n |= n >>> 2;
		    n |= n >>> 4;
		    n |= n >>> 8;
		    n |= n >>> 16;
		    n++;
		  }

		  return n;
		} // This function is designed to be inlinable, so please take care when making
		// changes to the function body.


		function howMuchToRead$1(n, state) {
		  if (n <= 0 || state.length === 0 && state.ended) return 0;
		  if (state.objectMode) return 1;

		  if (n !== n) {
		    // Only flow one buffer at a time
		    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
		  } // If we're asking for more than the current hwm, then raise the hwm.


		  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark$1(n);
		  if (n <= state.length) return n; // Don't have enough

		  if (!state.ended) {
		    state.needReadable = true;
		    return 0;
		  }

		  return state.length;
		} // you can override either this method, or the async _read(n) below.


		Readable$1.prototype.read = function (n) {
		  debug$1('read', n);
		  n = parseInt(n, 10);
		  var state = this._readableState;
		  var nOrig = n;
		  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
		  // already have a bunch of data in the buffer, then just trigger
		  // the 'readable' event and move on.

		  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
		    debug$1('read: emitReadable', state.length, state.ended);
		    if (state.length === 0 && state.ended) endReadable$1(this);else emitReadable$1(this);
		    return null;
		  }

		  n = howMuchToRead$1(n, state); // if we've ended, and we're now clear, then finish it up.

		  if (n === 0 && state.ended) {
		    if (state.length === 0) endReadable$1(this);
		    return null;
		  } // All the actual chunk generation logic needs to be
		  // *below* the call to _read.  The reason is that in certain
		  // synthetic stream cases, such as passthrough streams, _read
		  // may be a completely synchronous operation which may change
		  // the state of the read buffer, providing enough data when
		  // before there was *not* enough.
		  //
		  // So, the steps are:
		  // 1. Figure out what the state of things will be after we do
		  // a read from the buffer.
		  //
		  // 2. If that resulting state will trigger a _read, then call _read.
		  // Note that this may be asynchronous, or synchronous.  Yes, it is
		  // deeply ugly to write APIs this way, but that still doesn't mean
		  // that the Readable class should behave improperly, as streams are
		  // designed to be sync/async agnostic.
		  // Take note if the _read call is sync or async (ie, if the read call
		  // has returned yet), so that we know whether or not it's safe to emit
		  // 'readable' etc.
		  //
		  // 3. Actually pull the requested chunks out of the buffer and return.
		  // if we need a readable event, then we need to do some reading.


		  var doRead = state.needReadable;
		  debug$1('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

		  if (state.length === 0 || state.length - n < state.highWaterMark) {
		    doRead = true;
		    debug$1('length less than watermark', doRead);
		  } // however, if we've ended, then there's no point, and if we're already
		  // reading, then it's unnecessary.


		  if (state.ended || state.reading) {
		    doRead = false;
		    debug$1('reading or ended', doRead);
		  } else if (doRead) {
		    debug$1('do read');
		    state.reading = true;
		    state.sync = true; // if the length is currently zero, then we *need* a readable event.

		    if (state.length === 0) state.needReadable = true; // call internal read method

		    this._read(state.highWaterMark);

		    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
		    // and we need to re-evaluate how much data we can return to the user.

		    if (!state.reading) n = howMuchToRead$1(nOrig, state);
		  }

		  var ret;
		  if (n > 0) ret = fromList$1(n, state);else ret = null;

		  if (ret === null) {
		    state.needReadable = state.length <= state.highWaterMark;
		    n = 0;
		  } else {
		    state.length -= n;
		    state.awaitDrain = 0;
		  }

		  if (state.length === 0) {
		    // If we have nothing in the buffer, then we want to know
		    // as soon as we *do* get something into the buffer.
		    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

		    if (nOrig !== n && state.ended) endReadable$1(this);
		  }

		  if (ret !== null) this.emit('data', ret);
		  return ret;
		};

		function onEofChunk$1(stream, state) {
		  debug$1('onEofChunk');
		  if (state.ended) return;

		  if (state.decoder) {
		    var chunk = state.decoder.end();

		    if (chunk && chunk.length) {
		      state.buffer.push(chunk);
		      state.length += state.objectMode ? 1 : chunk.length;
		    }
		  }

		  state.ended = true;

		  if (state.sync) {
		    // if we are sync, wait until next tick to emit the data.
		    // Otherwise we risk emitting data in the flow()
		    // the readable code triggers during a read() call
		    emitReadable$1(stream);
		  } else {
		    // emit 'readable' now to make sure it gets picked up.
		    state.needReadable = false;

		    if (!state.emittedReadable) {
		      state.emittedReadable = true;
		      emitReadable_$1(stream);
		    }
		  }
		} // Don't emit readable right away in sync mode, because this can trigger
		// another read() call => stack overflow.  This way, it might trigger
		// a nextTick recursion warning, but that's not so bad.


		function emitReadable$1(stream) {
		  var state = stream._readableState;
		  debug$1('emitReadable', state.needReadable, state.emittedReadable);
		  state.needReadable = false;

		  if (!state.emittedReadable) {
		    debug$1('emitReadable', state.flowing);
		    state.emittedReadable = true;
		    nextTick(emitReadable_$1, stream);
		  }
		}

		function emitReadable_$1(stream) {
		  var state = stream._readableState;
		  debug$1('emitReadable_', state.destroyed, state.length, state.ended);

		  if (!state.destroyed && (state.length || state.ended)) {
		    stream.emit('readable');
		    state.emittedReadable = false;
		  } // The stream needs another readable event if
		  // 1. It is not flowing, as the flow mechanism will take
		  //    care of it.
		  // 2. It is not ended.
		  // 3. It is below the highWaterMark, so we can schedule
		  //    another readable later.


		  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
		  flow$1(stream);
		} // at this point, the user has presumably seen the 'readable' event,
		// and called read() to consume some data.  that may have triggered
		// in turn another _read(n) call, in which case reading = true if
		// it's in progress.
		// However, if we're not ended, or reading, and the length < hwm,
		// then go ahead and try to read some more preemptively.


		function maybeReadMore$1(stream, state) {
		  if (!state.readingMore) {
		    state.readingMore = true;
		    nextTick(maybeReadMore_$1, stream, state);
		  }
		}

		function maybeReadMore_$1(stream, state) {
		  // Attempt to read more data if we should.
		  //
		  // The conditions for reading more data are (one of):
		  // - Not enough data buffered (state.length < state.highWaterMark). The loop
		  //   is responsible for filling the buffer with enough data if such data
		  //   is available. If highWaterMark is 0 and we are not in the flowing mode
		  //   we should _not_ attempt to buffer any extra data. We'll get more data
		  //   when the stream consumer calls read() instead.
		  // - No data in the buffer, and the stream is in flowing mode. In this mode
		  //   the loop below is responsible for ensuring read() is called. Failing to
		  //   call read here would abort the flow and there's no other mechanism for
		  //   continuing the flow if the stream consumer has just subscribed to the
		  //   'data' event.
		  //
		  // In addition to the above conditions to keep reading data, the following
		  // conditions prevent the data from being read:
		  // - The stream has ended (state.ended).
		  // - There is already a pending 'read' operation (state.reading). This is a
		  //   case where the the stream has called the implementation defined _read()
		  //   method, but they are processing the call asynchronously and have _not_
		  //   called push() with new data. In this case we skip performing more
		  //   read()s. The execution ends in this method again after the _read() ends
		  //   up calling push() with more data.
		  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
		    var len = state.length;
		    debug$1('maybeReadMore read 0');
		    stream.read(0);
		    if (len === state.length) // didn't get any data, stop spinning.
		      break;
		  }

		  state.readingMore = false;
		} // abstract method.  to be overridden in specific implementation classes.
		// call cb(er, data) where data is <= n in length.
		// for virtual (non-string, non-buffer) streams, "length" is somewhat
		// arbitrary, and perhaps not very meaningful.


		Readable$1.prototype._read = function (n) {
		  errorOrDestroy$2(this, new ERR_METHOD_NOT_IMPLEMENTED$1('_read()'));
		};

		Readable$1.prototype.pipe = function (dest, pipeOpts) {
		  var src = this;
		  var state = this._readableState;

		  switch (state.pipesCount) {
		    case 0:
		      state.pipes = dest;
		      break;

		    case 1:
		      state.pipes = [state.pipes, dest];
		      break;

		    default:
		      state.pipes.push(dest);
		      break;
		  }

		  state.pipesCount += 1;
		  debug$1('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
		  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
		  var endFn = doEnd ? onend : unpipe;
		  if (state.endEmitted) nextTick(endFn);else src.once('end', endFn);
		  dest.on('unpipe', onunpipe);

		  function onunpipe(readable, unpipeInfo) {
		    debug$1('onunpipe');

		    if (readable === src) {
		      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
		        unpipeInfo.hasUnpiped = true;
		        cleanup();
		      }
		    }
		  }

		  function onend() {
		    debug$1('onend');
		    dest.end();
		  } // when the dest drains, it reduces the awaitDrain counter
		  // on the source.  This would be more elegant with a .once()
		  // handler in flow(), but adding and removing repeatedly is
		  // too slow.


		  var ondrain = pipeOnDrain$1(src);
		  dest.on('drain', ondrain);
		  var cleanedUp = false;

		  function cleanup() {
		    debug$1('cleanup'); // cleanup event handlers once the pipe is broken

		    dest.removeListener('close', onclose);
		    dest.removeListener('finish', onfinish);
		    dest.removeListener('drain', ondrain);
		    dest.removeListener('error', onerror);
		    dest.removeListener('unpipe', onunpipe);
		    src.removeListener('end', onend);
		    src.removeListener('end', unpipe);
		    src.removeListener('data', ondata);
		    cleanedUp = true; // if the reader is waiting for a drain event from this
		    // specific writer, then it would cause it to never start
		    // flowing again.
		    // So, if this is awaiting a drain, then we just call it now.
		    // If we don't know, then assume that we are waiting for one.

		    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
		  }

		  src.on('data', ondata);

		  function ondata(chunk) {
		    debug$1('ondata');
		    var ret = dest.write(chunk);
		    debug$1('dest.write', ret);

		    if (ret === false) {
		      // If the user unpiped during `dest.write()`, it is possible
		      // to get stuck in a permanently paused state if that write
		      // also returned false.
		      // => Check whether `dest` is still a piping destination.
		      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf$1(state.pipes, dest) !== -1) && !cleanedUp) {
		        debug$1('false write response, pause', state.awaitDrain);
		        state.awaitDrain++;
		      }

		      src.pause();
		    }
		  } // if the dest has an error, then stop piping into it.
		  // however, don't suppress the throwing behavior for this.


		  function onerror(er) {
		    debug$1('onerror', er);
		    unpipe();
		    dest.removeListener('error', onerror);
		    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy$2(dest, er);
		  } // Make sure our error handler is attached before userland ones.


		  prependListener$1(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

		  function onclose() {
		    dest.removeListener('finish', onfinish);
		    unpipe();
		  }

		  dest.once('close', onclose);

		  function onfinish() {
		    debug$1('onfinish');
		    dest.removeListener('close', onclose);
		    unpipe();
		  }

		  dest.once('finish', onfinish);

		  function unpipe() {
		    debug$1('unpipe');
		    src.unpipe(dest);
		  } // tell the dest that it's being piped to


		  dest.emit('pipe', src); // start the flow if it hasn't been started already.

		  if (!state.flowing) {
		    debug$1('pipe resume');
		    src.resume();
		  }

		  return dest;
		};

		function pipeOnDrain$1(src) {
		  return function pipeOnDrainFunctionResult() {
		    var state = src._readableState;
		    debug$1('pipeOnDrain', state.awaitDrain);
		    if (state.awaitDrain) state.awaitDrain--;

		    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
		      state.flowing = true;
		      flow$1(src);
		    }
		  };
		}

		Readable$1.prototype.unpipe = function (dest) {
		  var state = this._readableState;
		  var unpipeInfo = {
		    hasUnpiped: false
		  }; // if we're not piping anywhere, then do nothing.

		  if (state.pipesCount === 0) return this; // just one destination.  most common case.

		  if (state.pipesCount === 1) {
		    // passed in one, but it's not the right one.
		    if (dest && dest !== state.pipes) return this;
		    if (!dest) dest = state.pipes; // got a match.

		    state.pipes = null;
		    state.pipesCount = 0;
		    state.flowing = false;
		    if (dest) dest.emit('unpipe', this, unpipeInfo);
		    return this;
		  } // slow case. multiple pipe destinations.


		  if (!dest) {
		    // remove all.
		    var dests = state.pipes;
		    var len = state.pipesCount;
		    state.pipes = null;
		    state.pipesCount = 0;
		    state.flowing = false;

		    for (var i = 0; i < len; i++) {
		      dests[i].emit('unpipe', this, {
		        hasUnpiped: false
		      });
		    }

		    return this;
		  } // try to find the right one.


		  var index = indexOf$1(state.pipes, dest);
		  if (index === -1) return this;
		  state.pipes.splice(index, 1);
		  state.pipesCount -= 1;
		  if (state.pipesCount === 1) state.pipes = state.pipes[0];
		  dest.emit('unpipe', this, unpipeInfo);
		  return this;
		}; // set up data events if they are asked for
		// Ensure readable listeners eventually get something


		Readable$1.prototype.on = function (ev, fn) {
		  var res = streamBrowser.prototype.on.call(this, ev, fn);
		  var state = this._readableState;

		  if (ev === 'data') {
		    // update readableListening so that resume() may be a no-op
		    // a few lines down. This is needed to support once('readable').
		    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

		    if (state.flowing !== false) this.resume();
		  } else if (ev === 'readable') {
		    if (!state.endEmitted && !state.readableListening) {
		      state.readableListening = state.needReadable = true;
		      state.flowing = false;
		      state.emittedReadable = false;
		      debug$1('on readable', state.length, state.reading);

		      if (state.length) {
		        emitReadable$1(this);
		      } else if (!state.reading) {
		        nextTick(nReadingNextTick$1, this);
		      }
		    }
		  }

		  return res;
		};

		Readable$1.prototype.addListener = Readable$1.prototype.on;

		Readable$1.prototype.removeListener = function (ev, fn) {
		  var res = streamBrowser.prototype.removeListener.call(this, ev, fn);

		  if (ev === 'readable') {
		    // We need to check if there is someone still listening to
		    // readable and reset the state. However this needs to happen
		    // after readable has been emitted but before I/O (nextTick) to
		    // support once('readable', fn) cycles. This means that calling
		    // resume within the same tick will have no
		    // effect.
		    nextTick(updateReadableListening, this);
		  }

		  return res;
		};

		Readable$1.prototype.removeAllListeners = function (ev) {
		  var res = streamBrowser.prototype.removeAllListeners.apply(this, arguments);

		  if (ev === 'readable' || ev === undefined) {
		    // We need to check if there is someone still listening to
		    // readable and reset the state. However this needs to happen
		    // after readable has been emitted but before I/O (nextTick) to
		    // support once('readable', fn) cycles. This means that calling
		    // resume within the same tick will have no
		    // effect.
		    nextTick(updateReadableListening, this);
		  }

		  return res;
		};

		function updateReadableListening(self) {
		  var state = self._readableState;
		  state.readableListening = self.listenerCount('readable') > 0;

		  if (state.resumeScheduled && !state.paused) {
		    // flowing needs to be set to true now, otherwise
		    // the upcoming resume will not flow.
		    state.flowing = true; // crude way to check if we should resume
		  } else if (self.listenerCount('data') > 0) {
		    self.resume();
		  }
		}

		function nReadingNextTick$1(self) {
		  debug$1('readable nexttick read 0');
		  self.read(0);
		} // pause() and resume() are remnants of the legacy readable stream API
		// If the user uses them, then switch into old mode.


		Readable$1.prototype.resume = function () {
		  var state = this._readableState;

		  if (!state.flowing) {
		    debug$1('resume'); // we flow only if there is no one listening
		    // for readable, but we still have to call
		    // resume()

		    state.flowing = !state.readableListening;
		    resume$1(this, state);
		  }

		  state.paused = false;
		  return this;
		};

		function resume$1(stream, state) {
		  if (!state.resumeScheduled) {
		    state.resumeScheduled = true;
		    nextTick(resume_$1, stream, state);
		  }
		}

		function resume_$1(stream, state) {
		  debug$1('resume', state.reading);

		  if (!state.reading) {
		    stream.read(0);
		  }

		  state.resumeScheduled = false;
		  stream.emit('resume');
		  flow$1(stream);
		  if (state.flowing && !state.reading) stream.read(0);
		}

		Readable$1.prototype.pause = function () {
		  debug$1('call pause flowing=%j', this._readableState.flowing);

		  if (this._readableState.flowing !== false) {
		    debug$1('pause');
		    this._readableState.flowing = false;
		    this.emit('pause');
		  }

		  this._readableState.paused = true;
		  return this;
		};

		function flow$1(stream) {
		  var state = stream._readableState;
		  debug$1('flow', state.flowing);

		  while (state.flowing && stream.read() !== null) {
		  }
		} // wrap an old-style stream as the async data source.
		// This is *not* part of the readable stream interface.
		// It is an ugly unfortunate mess of history.


		Readable$1.prototype.wrap = function (stream) {
		  var _this = this;

		  var state = this._readableState;
		  var paused = false;
		  stream.on('end', function () {
		    debug$1('wrapped end');

		    if (state.decoder && !state.ended) {
		      var chunk = state.decoder.end();
		      if (chunk && chunk.length) _this.push(chunk);
		    }

		    _this.push(null);
		  });
		  stream.on('data', function (chunk) {
		    debug$1('wrapped data');
		    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

		    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

		    var ret = _this.push(chunk);

		    if (!ret) {
		      paused = true;
		      stream.pause();
		    }
		  }); // proxy all the other methods.
		  // important when wrapping filters and duplexes.

		  for (var i in stream) {
		    if (this[i] === undefined && typeof stream[i] === 'function') {
		      this[i] = function methodWrap(method) {
		        return function methodWrapReturnFunction() {
		          return stream[method].apply(stream, arguments);
		        };
		      }(i);
		    }
		  } // proxy certain important events.


		  for (var n = 0; n < kProxyEvents.length; n++) {
		    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
		  } // when we try to consume some more bytes, simply unpause the
		  // underlying stream.


		  this._read = function (n) {
		    debug$1('wrapped _read', n);

		    if (paused) {
		      paused = false;
		      stream.resume();
		    }
		  };

		  return this;
		};

		if (typeof Symbol === 'function') {
		  Readable$1.prototype[Symbol.asyncIterator] = function () {
		    if (createReadableStreamAsyncIterator$1 === undefined) {
		      createReadableStreamAsyncIterator$1 = async_iterator;
		    }

		    return createReadableStreamAsyncIterator$1(this);
		  };
		}

		Object.defineProperty(Readable$1.prototype, 'readableHighWaterMark', {
		  // making it explicit this property is not enumerable
		  // because otherwise some prototype manipulation in
		  // userland will fail
		  enumerable: false,
		  get: function get() {
		    return this._readableState.highWaterMark;
		  }
		});
		Object.defineProperty(Readable$1.prototype, 'readableBuffer', {
		  // making it explicit this property is not enumerable
		  // because otherwise some prototype manipulation in
		  // userland will fail
		  enumerable: false,
		  get: function get() {
		    return this._readableState && this._readableState.buffer;
		  }
		});
		Object.defineProperty(Readable$1.prototype, 'readableFlowing', {
		  // making it explicit this property is not enumerable
		  // because otherwise some prototype manipulation in
		  // userland will fail
		  enumerable: false,
		  get: function get() {
		    return this._readableState.flowing;
		  },
		  set: function set(state) {
		    if (this._readableState) {
		      this._readableState.flowing = state;
		    }
		  }
		}); // exposed for testing purposes only.

		Readable$1._fromList = fromList$1;
		Object.defineProperty(Readable$1.prototype, 'readableLength', {
		  // making it explicit this property is not enumerable
		  // because otherwise some prototype manipulation in
		  // userland will fail
		  enumerable: false,
		  get: function get() {
		    return this._readableState.length;
		  }
		}); // Pluck off n bytes from an array of buffers.
		// Length is the combined lengths of all the buffers in the list.
		// This function is designed to be inlinable, so please take care when making
		// changes to the function body.

		function fromList$1(n, state) {
		  // nothing buffered
		  if (state.length === 0) return null;
		  var ret;
		  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
		    // read it all, truncate the list
		    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
		    state.buffer.clear();
		  } else {
		    // read part of list
		    ret = state.buffer.consume(n, state.decoder);
		  }
		  return ret;
		}

		function endReadable$1(stream) {
		  var state = stream._readableState;
		  debug$1('endReadable', state.endEmitted);

		  if (!state.endEmitted) {
		    state.ended = true;
		    nextTick(endReadableNT$1, state, stream);
		  }
		}

		function endReadableNT$1(state, stream) {
		  debug$1('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

		  if (!state.endEmitted && state.length === 0) {
		    state.endEmitted = true;
		    stream.readable = false;
		    stream.emit('end');

		    if (state.autoDestroy) {
		      // In case of duplex streams we need a way to detect
		      // if the writable side is ready for autoDestroy as well
		      var wState = stream._writableState;

		      if (!wState || wState.autoDestroy && wState.finished) {
		        stream.destroy();
		      }
		    }
		  }
		}

		if (typeof Symbol === 'function') {
		  Readable$1.from = function (iterable, opts) {
		    if (from$1 === undefined) {
		      from$1 = fromBrowser;
		    }

		    return from$1(Readable$1, iterable, opts);
		  };
		}

		function indexOf$1(xs, x) {
		  for (var i = 0, l = xs.length; i < l; i++) {
		    if (xs[i] === x) return i;
		  }

		  return -1;
		}

		var _stream_transform = Transform$2;

		var _require$codes$2 = errorsBrowser.codes,
		    ERR_METHOD_NOT_IMPLEMENTED$2 = _require$codes$2.ERR_METHOD_NOT_IMPLEMENTED,
		    ERR_MULTIPLE_CALLBACK$1 = _require$codes$2.ERR_MULTIPLE_CALLBACK,
		    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes$2.ERR_TRANSFORM_ALREADY_TRANSFORMING,
		    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes$2.ERR_TRANSFORM_WITH_LENGTH_0;



		inherits_browser(Transform$2, _stream_duplex);

		function afterTransform$1(er, data) {
		  var ts = this._transformState;
		  ts.transforming = false;
		  var cb = ts.writecb;

		  if (cb === null) {
		    return this.emit('error', new ERR_MULTIPLE_CALLBACK$1());
		  }

		  ts.writechunk = null;
		  ts.writecb = null;
		  if (data != null) // single equals check for both `null` and `undefined`
		    this.push(data);
		  cb(er);
		  var rs = this._readableState;
		  rs.reading = false;

		  if (rs.needReadable || rs.length < rs.highWaterMark) {
		    this._read(rs.highWaterMark);
		  }
		}

		function Transform$2(options) {
		  if (!(this instanceof Transform$2)) return new Transform$2(options);
		  _stream_duplex.call(this, options);
		  this._transformState = {
		    afterTransform: afterTransform$1.bind(this),
		    needTransform: false,
		    transforming: false,
		    writecb: null,
		    writechunk: null,
		    writeencoding: null
		  }; // start out asking for a readable event once data is transformed.

		  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
		  // that Readable wants before the first _read call, so unset the
		  // sync guard flag.

		  this._readableState.sync = false;

		  if (options) {
		    if (typeof options.transform === 'function') this._transform = options.transform;
		    if (typeof options.flush === 'function') this._flush = options.flush;
		  } // When the writable side finishes, then flush out anything remaining.


		  this.on('prefinish', prefinish$2);
		}

		function prefinish$2() {
		  var _this = this;

		  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
		    this._flush(function (er, data) {
		      done$1(_this, er, data);
		    });
		  } else {
		    done$1(this, null, null);
		  }
		}

		Transform$2.prototype.push = function (chunk, encoding) {
		  this._transformState.needTransform = false;
		  return _stream_duplex.prototype.push.call(this, chunk, encoding);
		}; // This is the part where you do stuff!
		// override this function in implementation classes.
		// 'chunk' is an input chunk.
		//
		// Call `push(newChunk)` to pass along transformed output
		// to the readable side.  You may call 'push' zero or more times.
		//
		// Call `cb(err)` when you are done with this chunk.  If you pass
		// an error, then that'll put the hurt on the whole operation.  If you
		// never call cb(), then you'll never get another chunk.


		Transform$2.prototype._transform = function (chunk, encoding, cb) {
		  cb(new ERR_METHOD_NOT_IMPLEMENTED$2('_transform()'));
		};

		Transform$2.prototype._write = function (chunk, encoding, cb) {
		  var ts = this._transformState;
		  ts.writecb = cb;
		  ts.writechunk = chunk;
		  ts.writeencoding = encoding;

		  if (!ts.transforming) {
		    var rs = this._readableState;
		    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
		  }
		}; // Doesn't matter what the args are here.
		// _transform does all the work.
		// That we got here means that the readable side wants more data.


		Transform$2.prototype._read = function (n) {
		  var ts = this._transformState;

		  if (ts.writechunk !== null && !ts.transforming) {
		    ts.transforming = true;

		    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
		  } else {
		    // mark that we need a transform, so that any data that comes in
		    // will get processed, now that we've asked for it.
		    ts.needTransform = true;
		  }
		};

		Transform$2.prototype._destroy = function (err, cb) {
		  _stream_duplex.prototype._destroy.call(this, err, function (err2) {
		    cb(err2);
		  });
		};

		function done$1(stream, er, data) {
		  if (er) return stream.emit('error', er);
		  if (data != null) // single equals check for both `null` and `undefined`
		    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
		  // if there's nothing in the write buffer, then that means
		  // that nothing more will ever be provided

		  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
		  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
		  return stream.push(null);
		}

		var _stream_passthrough = PassThrough$1;



		inherits_browser(PassThrough$1, _stream_transform);

		function PassThrough$1(options) {
		  if (!(this instanceof PassThrough$1)) return new PassThrough$1(options);
		  _stream_transform.call(this, options);
		}

		PassThrough$1.prototype._transform = function (chunk, encoding, cb) {
		  cb(null, chunk);
		};

		var eos$1;

		function once$2(callback) {
		  var called = false;
		  return function () {
		    if (called) return;
		    called = true;
		    callback.apply(void 0, arguments);
		  };
		}

		var _require$codes$3 = errorsBrowser.codes,
		    ERR_MISSING_ARGS = _require$codes$3.ERR_MISSING_ARGS,
		    ERR_STREAM_DESTROYED$1 = _require$codes$3.ERR_STREAM_DESTROYED;

		function noop$2(err) {
		  // Rethrow the error if it exists to avoid swallowing it
		  if (err) throw err;
		}

		function isRequest$1(stream) {
		  return stream.setHeader && typeof stream.abort === 'function';
		}

		function destroyer(stream, reading, writing, callback) {
		  callback = once$2(callback);
		  var closed = false;
		  stream.on('close', function () {
		    closed = true;
		  });
		  if (eos$1 === undefined) eos$1 = endOfStream;
		  eos$1(stream, {
		    readable: reading,
		    writable: writing
		  }, function (err) {
		    if (err) return callback(err);
		    closed = true;
		    callback();
		  });
		  var destroyed = false;
		  return function (err) {
		    if (closed) return;
		    if (destroyed) return;
		    destroyed = true; // request.destroy just do .end - .abort is what we want

		    if (isRequest$1(stream)) return stream.abort();
		    if (typeof stream.destroy === 'function') return stream.destroy();
		    callback(err || new ERR_STREAM_DESTROYED$1('pipe'));
		  };
		}

		function call(fn) {
		  fn();
		}

		function pipe(from, to) {
		  return from.pipe(to);
		}

		function popCallback(streams) {
		  if (!streams.length) return noop$2;
		  if (typeof streams[streams.length - 1] !== 'function') return noop$2;
		  return streams.pop();
		}

		function pipeline() {
		  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
		    streams[_key] = arguments[_key];
		  }

		  var callback = popCallback(streams);
		  if (Array.isArray(streams[0])) streams = streams[0];

		  if (streams.length < 2) {
		    throw new ERR_MISSING_ARGS('streams');
		  }

		  var error;
		  var destroys = streams.map(function (stream, i) {
		    var reading = i < streams.length - 1;
		    var writing = i > 0;
		    return destroyer(stream, reading, writing, function (err) {
		      if (!error) error = err;
		      if (err) destroys.forEach(call);
		      if (reading) return;
		      destroys.forEach(call);
		      callback(error);
		    });
		  });
		  return streams.reduce(pipe);
		}

		var pipeline_1 = pipeline;

		var readableBrowser = createCommonjsModule(function (module, exports) {
		exports = module.exports = _stream_readable;
		exports.Stream = exports;
		exports.Readable = exports;
		exports.Writable = _stream_writable;
		exports.Duplex = _stream_duplex;
		exports.Transform = _stream_transform;
		exports.PassThrough = _stream_passthrough;
		exports.finished = endOfStream;
		exports.pipeline = pipeline_1;
		});

		var Buffer$7 = safeBuffer$1.Buffer;
		var Transform$3 = readableBrowser.Transform;


		function throwIfNotStringOrBuffer (val, prefix) {
		  if (!Buffer$7.isBuffer(val) && typeof val !== 'string') {
		    throw new TypeError(prefix + ' must be a string or a buffer')
		  }
		}

		function HashBase (blockSize) {
		  Transform$3.call(this);

		  this._block = Buffer$7.allocUnsafe(blockSize);
		  this._blockSize = blockSize;
		  this._blockOffset = 0;
		  this._length = [0, 0, 0, 0];

		  this._finalized = false;
		}

		inherits_browser(HashBase, Transform$3);

		HashBase.prototype._transform = function (chunk, encoding, callback) {
		  var error = null;
		  try {
		    this.update(chunk, encoding);
		  } catch (err) {
		    error = err;
		  }

		  callback(error);
		};

		HashBase.prototype._flush = function (callback) {
		  var error = null;
		  try {
		    this.push(this.digest());
		  } catch (err) {
		    error = err;
		  }

		  callback(error);
		};

		HashBase.prototype.update = function (data, encoding) {
		  throwIfNotStringOrBuffer(data, 'Data');
		  if (this._finalized) throw new Error('Digest already called')
		  if (!Buffer$7.isBuffer(data)) data = Buffer$7.from(data, encoding);

		  // consume data
		  var block = this._block;
		  var offset = 0;
		  while (this._blockOffset + data.length - offset >= this._blockSize) {
		    for (var i = this._blockOffset; i < this._blockSize;) block[i++] = data[offset++];
		    this._update();
		    this._blockOffset = 0;
		  }
		  while (offset < data.length) block[this._blockOffset++] = data[offset++];

		  // update length
		  for (var j = 0, carry = data.length * 8; carry > 0; ++j) {
		    this._length[j] += carry;
		    carry = (this._length[j] / 0x0100000000) | 0;
		    if (carry > 0) this._length[j] -= 0x0100000000 * carry;
		  }

		  return this
		};

		HashBase.prototype._update = function () {
		  throw new Error('_update is not implemented')
		};

		HashBase.prototype.digest = function (encoding) {
		  if (this._finalized) throw new Error('Digest already called')
		  this._finalized = true;

		  var digest = this._digest();
		  if (encoding !== undefined) digest = digest.toString(encoding);

		  // reset state
		  this._block.fill(0);
		  this._blockOffset = 0;
		  for (var i = 0; i < 4; ++i) this._length[i] = 0;

		  return digest
		};

		HashBase.prototype._digest = function () {
		  throw new Error('_digest is not implemented')
		};

		var hashBase = HashBase;

		var Buffer$8 = safeBuffer.Buffer;

		var ARRAY16 = new Array(16);

		function MD5 () {
		  hashBase.call(this, 64);

		  // state
		  this._a = 0x67452301;
		  this._b = 0xefcdab89;
		  this._c = 0x98badcfe;
		  this._d = 0x10325476;
		}

		inherits_browser(MD5, hashBase);

		MD5.prototype._update = function () {
		  var M = ARRAY16;
		  for (var i = 0; i < 16; ++i) M[i] = this._block.readInt32LE(i * 4);

		  var a = this._a;
		  var b = this._b;
		  var c = this._c;
		  var d = this._d;

		  a = fnF(a, b, c, d, M[0], 0xd76aa478, 7);
		  d = fnF(d, a, b, c, M[1], 0xe8c7b756, 12);
		  c = fnF(c, d, a, b, M[2], 0x242070db, 17);
		  b = fnF(b, c, d, a, M[3], 0xc1bdceee, 22);
		  a = fnF(a, b, c, d, M[4], 0xf57c0faf, 7);
		  d = fnF(d, a, b, c, M[5], 0x4787c62a, 12);
		  c = fnF(c, d, a, b, M[6], 0xa8304613, 17);
		  b = fnF(b, c, d, a, M[7], 0xfd469501, 22);
		  a = fnF(a, b, c, d, M[8], 0x698098d8, 7);
		  d = fnF(d, a, b, c, M[9], 0x8b44f7af, 12);
		  c = fnF(c, d, a, b, M[10], 0xffff5bb1, 17);
		  b = fnF(b, c, d, a, M[11], 0x895cd7be, 22);
		  a = fnF(a, b, c, d, M[12], 0x6b901122, 7);
		  d = fnF(d, a, b, c, M[13], 0xfd987193, 12);
		  c = fnF(c, d, a, b, M[14], 0xa679438e, 17);
		  b = fnF(b, c, d, a, M[15], 0x49b40821, 22);

		  a = fnG(a, b, c, d, M[1], 0xf61e2562, 5);
		  d = fnG(d, a, b, c, M[6], 0xc040b340, 9);
		  c = fnG(c, d, a, b, M[11], 0x265e5a51, 14);
		  b = fnG(b, c, d, a, M[0], 0xe9b6c7aa, 20);
		  a = fnG(a, b, c, d, M[5], 0xd62f105d, 5);
		  d = fnG(d, a, b, c, M[10], 0x02441453, 9);
		  c = fnG(c, d, a, b, M[15], 0xd8a1e681, 14);
		  b = fnG(b, c, d, a, M[4], 0xe7d3fbc8, 20);
		  a = fnG(a, b, c, d, M[9], 0x21e1cde6, 5);
		  d = fnG(d, a, b, c, M[14], 0xc33707d6, 9);
		  c = fnG(c, d, a, b, M[3], 0xf4d50d87, 14);
		  b = fnG(b, c, d, a, M[8], 0x455a14ed, 20);
		  a = fnG(a, b, c, d, M[13], 0xa9e3e905, 5);
		  d = fnG(d, a, b, c, M[2], 0xfcefa3f8, 9);
		  c = fnG(c, d, a, b, M[7], 0x676f02d9, 14);
		  b = fnG(b, c, d, a, M[12], 0x8d2a4c8a, 20);

		  a = fnH(a, b, c, d, M[5], 0xfffa3942, 4);
		  d = fnH(d, a, b, c, M[8], 0x8771f681, 11);
		  c = fnH(c, d, a, b, M[11], 0x6d9d6122, 16);
		  b = fnH(b, c, d, a, M[14], 0xfde5380c, 23);
		  a = fnH(a, b, c, d, M[1], 0xa4beea44, 4);
		  d = fnH(d, a, b, c, M[4], 0x4bdecfa9, 11);
		  c = fnH(c, d, a, b, M[7], 0xf6bb4b60, 16);
		  b = fnH(b, c, d, a, M[10], 0xbebfbc70, 23);
		  a = fnH(a, b, c, d, M[13], 0x289b7ec6, 4);
		  d = fnH(d, a, b, c, M[0], 0xeaa127fa, 11);
		  c = fnH(c, d, a, b, M[3], 0xd4ef3085, 16);
		  b = fnH(b, c, d, a, M[6], 0x04881d05, 23);
		  a = fnH(a, b, c, d, M[9], 0xd9d4d039, 4);
		  d = fnH(d, a, b, c, M[12], 0xe6db99e5, 11);
		  c = fnH(c, d, a, b, M[15], 0x1fa27cf8, 16);
		  b = fnH(b, c, d, a, M[2], 0xc4ac5665, 23);

		  a = fnI(a, b, c, d, M[0], 0xf4292244, 6);
		  d = fnI(d, a, b, c, M[7], 0x432aff97, 10);
		  c = fnI(c, d, a, b, M[14], 0xab9423a7, 15);
		  b = fnI(b, c, d, a, M[5], 0xfc93a039, 21);
		  a = fnI(a, b, c, d, M[12], 0x655b59c3, 6);
		  d = fnI(d, a, b, c, M[3], 0x8f0ccc92, 10);
		  c = fnI(c, d, a, b, M[10], 0xffeff47d, 15);
		  b = fnI(b, c, d, a, M[1], 0x85845dd1, 21);
		  a = fnI(a, b, c, d, M[8], 0x6fa87e4f, 6);
		  d = fnI(d, a, b, c, M[15], 0xfe2ce6e0, 10);
		  c = fnI(c, d, a, b, M[6], 0xa3014314, 15);
		  b = fnI(b, c, d, a, M[13], 0x4e0811a1, 21);
		  a = fnI(a, b, c, d, M[4], 0xf7537e82, 6);
		  d = fnI(d, a, b, c, M[11], 0xbd3af235, 10);
		  c = fnI(c, d, a, b, M[2], 0x2ad7d2bb, 15);
		  b = fnI(b, c, d, a, M[9], 0xeb86d391, 21);

		  this._a = (this._a + a) | 0;
		  this._b = (this._b + b) | 0;
		  this._c = (this._c + c) | 0;
		  this._d = (this._d + d) | 0;
		};

		MD5.prototype._digest = function () {
		  // create padding and handle blocks
		  this._block[this._blockOffset++] = 0x80;
		  if (this._blockOffset > 56) {
		    this._block.fill(0, this._blockOffset, 64);
		    this._update();
		    this._blockOffset = 0;
		  }

		  this._block.fill(0, this._blockOffset, 56);
		  this._block.writeUInt32LE(this._length[0], 56);
		  this._block.writeUInt32LE(this._length[1], 60);
		  this._update();

		  // produce result
		  var buffer = Buffer$8.allocUnsafe(16);
		  buffer.writeInt32LE(this._a, 0);
		  buffer.writeInt32LE(this._b, 4);
		  buffer.writeInt32LE(this._c, 8);
		  buffer.writeInt32LE(this._d, 12);
		  return buffer
		};

		function rotl (x, n) {
		  return (x << n) | (x >>> (32 - n))
		}

		function fnF (a, b, c, d, m, k, s) {
		  return (rotl((a + ((b & c) | ((~b) & d)) + m + k) | 0, s) + b) | 0
		}

		function fnG (a, b, c, d, m, k, s) {
		  return (rotl((a + ((b & d) | (c & (~d))) + m + k) | 0, s) + b) | 0
		}

		function fnH (a, b, c, d, m, k, s) {
		  return (rotl((a + (b ^ c ^ d) + m + k) | 0, s) + b) | 0
		}

		function fnI (a, b, c, d, m, k, s) {
		  return (rotl((a + ((c ^ (b | (~d)))) + m + k) | 0, s) + b) | 0
		}

		var md5_js = MD5;

		var md5 = function (buffer) {
		  return new md5_js().update(buffer).digest()
		};

		var Buffer$9 = buffer_1.Buffer;



		var ARRAY16$1 = new Array(16);

		var zl = [
		  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
		  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
		  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
		  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
		  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
		];

		var zr = [
		  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
		  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
		  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
		  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
		  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
		];

		var sl = [
		  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
		  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
		  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
		  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
		  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
		];

		var sr = [
		  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
		  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
		  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
		  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
		  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
		];

		var hl = [0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e];
		var hr = [0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000];

		function RIPEMD160 () {
		  hashBase.call(this, 64);

		  // state
		  this._a = 0x67452301;
		  this._b = 0xefcdab89;
		  this._c = 0x98badcfe;
		  this._d = 0x10325476;
		  this._e = 0xc3d2e1f0;
		}

		inherits_browser(RIPEMD160, hashBase);

		RIPEMD160.prototype._update = function () {
		  var words = ARRAY16$1;
		  for (var j = 0; j < 16; ++j) words[j] = this._block.readInt32LE(j * 4);

		  var al = this._a | 0;
		  var bl = this._b | 0;
		  var cl = this._c | 0;
		  var dl = this._d | 0;
		  var el = this._e | 0;

		  var ar = this._a | 0;
		  var br = this._b | 0;
		  var cr = this._c | 0;
		  var dr = this._d | 0;
		  var er = this._e | 0;

		  // computation
		  for (var i = 0; i < 80; i += 1) {
		    var tl;
		    var tr;
		    if (i < 16) {
		      tl = fn1(al, bl, cl, dl, el, words[zl[i]], hl[0], sl[i]);
		      tr = fn5(ar, br, cr, dr, er, words[zr[i]], hr[0], sr[i]);
		    } else if (i < 32) {
		      tl = fn2(al, bl, cl, dl, el, words[zl[i]], hl[1], sl[i]);
		      tr = fn4(ar, br, cr, dr, er, words[zr[i]], hr[1], sr[i]);
		    } else if (i < 48) {
		      tl = fn3(al, bl, cl, dl, el, words[zl[i]], hl[2], sl[i]);
		      tr = fn3(ar, br, cr, dr, er, words[zr[i]], hr[2], sr[i]);
		    } else if (i < 64) {
		      tl = fn4(al, bl, cl, dl, el, words[zl[i]], hl[3], sl[i]);
		      tr = fn2(ar, br, cr, dr, er, words[zr[i]], hr[3], sr[i]);
		    } else { // if (i<80) {
		      tl = fn5(al, bl, cl, dl, el, words[zl[i]], hl[4], sl[i]);
		      tr = fn1(ar, br, cr, dr, er, words[zr[i]], hr[4], sr[i]);
		    }

		    al = el;
		    el = dl;
		    dl = rotl$1(cl, 10);
		    cl = bl;
		    bl = tl;

		    ar = er;
		    er = dr;
		    dr = rotl$1(cr, 10);
		    cr = br;
		    br = tr;
		  }

		  // update state
		  var t = (this._b + cl + dr) | 0;
		  this._b = (this._c + dl + er) | 0;
		  this._c = (this._d + el + ar) | 0;
		  this._d = (this._e + al + br) | 0;
		  this._e = (this._a + bl + cr) | 0;
		  this._a = t;
		};

		RIPEMD160.prototype._digest = function () {
		  // create padding and handle blocks
		  this._block[this._blockOffset++] = 0x80;
		  if (this._blockOffset > 56) {
		    this._block.fill(0, this._blockOffset, 64);
		    this._update();
		    this._blockOffset = 0;
		  }

		  this._block.fill(0, this._blockOffset, 56);
		  this._block.writeUInt32LE(this._length[0], 56);
		  this._block.writeUInt32LE(this._length[1], 60);
		  this._update();

		  // produce result
		  var buffer = Buffer$9.alloc ? Buffer$9.alloc(20) : new Buffer$9(20);
		  buffer.writeInt32LE(this._a, 0);
		  buffer.writeInt32LE(this._b, 4);
		  buffer.writeInt32LE(this._c, 8);
		  buffer.writeInt32LE(this._d, 12);
		  buffer.writeInt32LE(this._e, 16);
		  return buffer
		};

		function rotl$1 (x, n) {
		  return (x << n) | (x >>> (32 - n))
		}

		function fn1 (a, b, c, d, e, m, k, s) {
		  return (rotl$1((a + (b ^ c ^ d) + m + k) | 0, s) + e) | 0
		}

		function fn2 (a, b, c, d, e, m, k, s) {
		  return (rotl$1((a + ((b & c) | ((~b) & d)) + m + k) | 0, s) + e) | 0
		}

		function fn3 (a, b, c, d, e, m, k, s) {
		  return (rotl$1((a + ((b | (~c)) ^ d) + m + k) | 0, s) + e) | 0
		}

		function fn4 (a, b, c, d, e, m, k, s) {
		  return (rotl$1((a + ((b & d) | (c & (~d))) + m + k) | 0, s) + e) | 0
		}

		function fn5 (a, b, c, d, e, m, k, s) {
		  return (rotl$1((a + (b ^ (c | (~d))) + m + k) | 0, s) + e) | 0
		}

		var ripemd160 = RIPEMD160;

		var Buffer$a = safeBuffer.Buffer;

		// prototype class for hash functions
		function Hash (blockSize, finalSize) {
		  this._block = Buffer$a.alloc(blockSize);
		  this._finalSize = finalSize;
		  this._blockSize = blockSize;
		  this._len = 0;
		}

		Hash.prototype.update = function (data, enc) {
		  if (typeof data === 'string') {
		    enc = enc || 'utf8';
		    data = Buffer$a.from(data, enc);
		  }

		  var block = this._block;
		  var blockSize = this._blockSize;
		  var length = data.length;
		  var accum = this._len;

		  for (var offset = 0; offset < length;) {
		    var assigned = accum % blockSize;
		    var remainder = Math.min(length - offset, blockSize - assigned);

		    for (var i = 0; i < remainder; i++) {
		      block[assigned + i] = data[offset + i];
		    }

		    accum += remainder;
		    offset += remainder;

		    if ((accum % blockSize) === 0) {
		      this._update(block);
		    }
		  }

		  this._len += length;
		  return this
		};

		Hash.prototype.digest = function (enc) {
		  var rem = this._len % this._blockSize;

		  this._block[rem] = 0x80;

		  // zero (rem + 1) trailing bits, where (rem + 1) is the smallest
		  // non-negative solution to the equation (length + 1 + (rem + 1)) === finalSize mod blockSize
		  this._block.fill(0, rem + 1);

		  if (rem >= this._finalSize) {
		    this._update(this._block);
		    this._block.fill(0);
		  }

		  var bits = this._len * 8;

		  // uint32
		  if (bits <= 0xffffffff) {
		    this._block.writeUInt32BE(bits, this._blockSize - 4);

		  // uint64
		  } else {
		    var lowBits = (bits & 0xffffffff) >>> 0;
		    var highBits = (bits - lowBits) / 0x100000000;

		    this._block.writeUInt32BE(highBits, this._blockSize - 8);
		    this._block.writeUInt32BE(lowBits, this._blockSize - 4);
		  }

		  this._update(this._block);
		  var hash = this._hash();

		  return enc ? hash.toString(enc) : hash
		};

		Hash.prototype._update = function () {
		  throw new Error('_update must be implemented by subclass')
		};

		var hash = Hash;

		/*
		 * A JavaScript implementation of the Secure Hash Algorithm, SHA-0, as defined
		 * in FIPS PUB 180-1
		 * This source code is derived from sha1.js of the same repository.
		 * The difference between SHA-0 and SHA-1 is just a bitwise rotate left
		 * operation was added.
		 */



		var Buffer$b = safeBuffer.Buffer;

		var K = [
		  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
		];

		var W = new Array(80);

		function Sha () {
		  this.init();
		  this._w = W;

		  hash.call(this, 64, 56);
		}

		inherits_browser(Sha, hash);

		Sha.prototype.init = function () {
		  this._a = 0x67452301;
		  this._b = 0xefcdab89;
		  this._c = 0x98badcfe;
		  this._d = 0x10325476;
		  this._e = 0xc3d2e1f0;

		  return this
		};

		function rotl5 (num) {
		  return (num << 5) | (num >>> 27)
		}

		function rotl30 (num) {
		  return (num << 30) | (num >>> 2)
		}

		function ft (s, b, c, d) {
		  if (s === 0) return (b & c) | ((~b) & d)
		  if (s === 2) return (b & c) | (b & d) | (c & d)
		  return b ^ c ^ d
		}

		Sha.prototype._update = function (M) {
		  var W = this._w;

		  var a = this._a | 0;
		  var b = this._b | 0;
		  var c = this._c | 0;
		  var d = this._d | 0;
		  var e = this._e | 0;

		  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4);
		  for (; i < 80; ++i) W[i] = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];

		  for (var j = 0; j < 80; ++j) {
		    var s = ~~(j / 20);
		    var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0;

		    e = d;
		    d = c;
		    c = rotl30(b);
		    b = a;
		    a = t;
		  }

		  this._a = (a + this._a) | 0;
		  this._b = (b + this._b) | 0;
		  this._c = (c + this._c) | 0;
		  this._d = (d + this._d) | 0;
		  this._e = (e + this._e) | 0;
		};

		Sha.prototype._hash = function () {
		  var H = Buffer$b.allocUnsafe(20);

		  H.writeInt32BE(this._a | 0, 0);
		  H.writeInt32BE(this._b | 0, 4);
		  H.writeInt32BE(this._c | 0, 8);
		  H.writeInt32BE(this._d | 0, 12);
		  H.writeInt32BE(this._e | 0, 16);

		  return H
		};

		var sha = Sha;

		/*
		 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
		 * in FIPS PUB 180-1
		 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
		 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
		 * Distributed under the BSD License
		 * See http://pajhome.org.uk/crypt/md5 for details.
		 */



		var Buffer$c = safeBuffer.Buffer;

		var K$1 = [
		  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
		];

		var W$1 = new Array(80);

		function Sha1 () {
		  this.init();
		  this._w = W$1;

		  hash.call(this, 64, 56);
		}

		inherits_browser(Sha1, hash);

		Sha1.prototype.init = function () {
		  this._a = 0x67452301;
		  this._b = 0xefcdab89;
		  this._c = 0x98badcfe;
		  this._d = 0x10325476;
		  this._e = 0xc3d2e1f0;

		  return this
		};

		function rotl1 (num) {
		  return (num << 1) | (num >>> 31)
		}

		function rotl5$1 (num) {
		  return (num << 5) | (num >>> 27)
		}

		function rotl30$1 (num) {
		  return (num << 30) | (num >>> 2)
		}

		function ft$1 (s, b, c, d) {
		  if (s === 0) return (b & c) | ((~b) & d)
		  if (s === 2) return (b & c) | (b & d) | (c & d)
		  return b ^ c ^ d
		}

		Sha1.prototype._update = function (M) {
		  var W = this._w;

		  var a = this._a | 0;
		  var b = this._b | 0;
		  var c = this._c | 0;
		  var d = this._d | 0;
		  var e = this._e | 0;

		  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4);
		  for (; i < 80; ++i) W[i] = rotl1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16]);

		  for (var j = 0; j < 80; ++j) {
		    var s = ~~(j / 20);
		    var t = (rotl5$1(a) + ft$1(s, b, c, d) + e + W[j] + K$1[s]) | 0;

		    e = d;
		    d = c;
		    c = rotl30$1(b);
		    b = a;
		    a = t;
		  }

		  this._a = (a + this._a) | 0;
		  this._b = (b + this._b) | 0;
		  this._c = (c + this._c) | 0;
		  this._d = (d + this._d) | 0;
		  this._e = (e + this._e) | 0;
		};

		Sha1.prototype._hash = function () {
		  var H = Buffer$c.allocUnsafe(20);

		  H.writeInt32BE(this._a | 0, 0);
		  H.writeInt32BE(this._b | 0, 4);
		  H.writeInt32BE(this._c | 0, 8);
		  H.writeInt32BE(this._d | 0, 12);
		  H.writeInt32BE(this._e | 0, 16);

		  return H
		};

		var sha1 = Sha1;

		/**
		 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
		 * in FIPS 180-2
		 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
		 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
		 *
		 */



		var Buffer$d = safeBuffer.Buffer;

		var K$2 = [
		  0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
		  0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
		  0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
		  0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
		  0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
		  0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
		  0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
		  0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
		  0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
		  0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
		  0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
		  0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
		  0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
		  0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
		  0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
		  0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
		];

		var W$2 = new Array(64);

		function Sha256 () {
		  this.init();

		  this._w = W$2; // new Array(64)

		  hash.call(this, 64, 56);
		}

		inherits_browser(Sha256, hash);

		Sha256.prototype.init = function () {
		  this._a = 0x6a09e667;
		  this._b = 0xbb67ae85;
		  this._c = 0x3c6ef372;
		  this._d = 0xa54ff53a;
		  this._e = 0x510e527f;
		  this._f = 0x9b05688c;
		  this._g = 0x1f83d9ab;
		  this._h = 0x5be0cd19;

		  return this
		};

		function ch (x, y, z) {
		  return z ^ (x & (y ^ z))
		}

		function maj (x, y, z) {
		  return (x & y) | (z & (x | y))
		}

		function sigma0 (x) {
		  return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10)
		}

		function sigma1 (x) {
		  return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7)
		}

		function gamma0 (x) {
		  return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ (x >>> 3)
		}

		function gamma1 (x) {
		  return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ (x >>> 10)
		}

		Sha256.prototype._update = function (M) {
		  var W = this._w;

		  var a = this._a | 0;
		  var b = this._b | 0;
		  var c = this._c | 0;
		  var d = this._d | 0;
		  var e = this._e | 0;
		  var f = this._f | 0;
		  var g = this._g | 0;
		  var h = this._h | 0;

		  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4);
		  for (; i < 64; ++i) W[i] = (gamma1(W[i - 2]) + W[i - 7] + gamma0(W[i - 15]) + W[i - 16]) | 0;

		  for (var j = 0; j < 64; ++j) {
		    var T1 = (h + sigma1(e) + ch(e, f, g) + K$2[j] + W[j]) | 0;
		    var T2 = (sigma0(a) + maj(a, b, c)) | 0;

		    h = g;
		    g = f;
		    f = e;
		    e = (d + T1) | 0;
		    d = c;
		    c = b;
		    b = a;
		    a = (T1 + T2) | 0;
		  }

		  this._a = (a + this._a) | 0;
		  this._b = (b + this._b) | 0;
		  this._c = (c + this._c) | 0;
		  this._d = (d + this._d) | 0;
		  this._e = (e + this._e) | 0;
		  this._f = (f + this._f) | 0;
		  this._g = (g + this._g) | 0;
		  this._h = (h + this._h) | 0;
		};

		Sha256.prototype._hash = function () {
		  var H = Buffer$d.allocUnsafe(32);

		  H.writeInt32BE(this._a, 0);
		  H.writeInt32BE(this._b, 4);
		  H.writeInt32BE(this._c, 8);
		  H.writeInt32BE(this._d, 12);
		  H.writeInt32BE(this._e, 16);
		  H.writeInt32BE(this._f, 20);
		  H.writeInt32BE(this._g, 24);
		  H.writeInt32BE(this._h, 28);

		  return H
		};

		var sha256 = Sha256;

		/**
		 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
		 * in FIPS 180-2
		 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
		 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
		 *
		 */




		var Buffer$e = safeBuffer.Buffer;

		var W$3 = new Array(64);

		function Sha224 () {
		  this.init();

		  this._w = W$3; // new Array(64)

		  hash.call(this, 64, 56);
		}

		inherits_browser(Sha224, sha256);

		Sha224.prototype.init = function () {
		  this._a = 0xc1059ed8;
		  this._b = 0x367cd507;
		  this._c = 0x3070dd17;
		  this._d = 0xf70e5939;
		  this._e = 0xffc00b31;
		  this._f = 0x68581511;
		  this._g = 0x64f98fa7;
		  this._h = 0xbefa4fa4;

		  return this
		};

		Sha224.prototype._hash = function () {
		  var H = Buffer$e.allocUnsafe(28);

		  H.writeInt32BE(this._a, 0);
		  H.writeInt32BE(this._b, 4);
		  H.writeInt32BE(this._c, 8);
		  H.writeInt32BE(this._d, 12);
		  H.writeInt32BE(this._e, 16);
		  H.writeInt32BE(this._f, 20);
		  H.writeInt32BE(this._g, 24);

		  return H
		};

		var sha224 = Sha224;

		var Buffer$f = safeBuffer.Buffer;

		var K$3 = [
		  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
		  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
		  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
		  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
		  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
		  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
		  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
		  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
		  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
		  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
		  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
		  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
		  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
		  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
		  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
		  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
		  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
		  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
		  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
		  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
		  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
		  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
		  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
		  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
		  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
		  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
		  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
		  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
		  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
		  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
		  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
		  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
		  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
		  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
		  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
		  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
		  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
		  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
		  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
		  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
		];

		var W$4 = new Array(160);

		function Sha512 () {
		  this.init();
		  this._w = W$4;

		  hash.call(this, 128, 112);
		}

		inherits_browser(Sha512, hash);

		Sha512.prototype.init = function () {
		  this._ah = 0x6a09e667;
		  this._bh = 0xbb67ae85;
		  this._ch = 0x3c6ef372;
		  this._dh = 0xa54ff53a;
		  this._eh = 0x510e527f;
		  this._fh = 0x9b05688c;
		  this._gh = 0x1f83d9ab;
		  this._hh = 0x5be0cd19;

		  this._al = 0xf3bcc908;
		  this._bl = 0x84caa73b;
		  this._cl = 0xfe94f82b;
		  this._dl = 0x5f1d36f1;
		  this._el = 0xade682d1;
		  this._fl = 0x2b3e6c1f;
		  this._gl = 0xfb41bd6b;
		  this._hl = 0x137e2179;

		  return this
		};

		function Ch (x, y, z) {
		  return z ^ (x & (y ^ z))
		}

		function maj$1 (x, y, z) {
		  return (x & y) | (z & (x | y))
		}

		function sigma0$1 (x, xl) {
		  return (x >>> 28 | xl << 4) ^ (xl >>> 2 | x << 30) ^ (xl >>> 7 | x << 25)
		}

		function sigma1$1 (x, xl) {
		  return (x >>> 14 | xl << 18) ^ (x >>> 18 | xl << 14) ^ (xl >>> 9 | x << 23)
		}

		function Gamma0 (x, xl) {
		  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7)
		}

		function Gamma0l (x, xl) {
		  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7 | xl << 25)
		}

		function Gamma1 (x, xl) {
		  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6)
		}

		function Gamma1l (x, xl) {
		  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6 | xl << 26)
		}

		function getCarry (a, b) {
		  return (a >>> 0) < (b >>> 0) ? 1 : 0
		}

		Sha512.prototype._update = function (M) {
		  var W = this._w;

		  var ah = this._ah | 0;
		  var bh = this._bh | 0;
		  var ch = this._ch | 0;
		  var dh = this._dh | 0;
		  var eh = this._eh | 0;
		  var fh = this._fh | 0;
		  var gh = this._gh | 0;
		  var hh = this._hh | 0;

		  var al = this._al | 0;
		  var bl = this._bl | 0;
		  var cl = this._cl | 0;
		  var dl = this._dl | 0;
		  var el = this._el | 0;
		  var fl = this._fl | 0;
		  var gl = this._gl | 0;
		  var hl = this._hl | 0;

		  for (var i = 0; i < 32; i += 2) {
		    W[i] = M.readInt32BE(i * 4);
		    W[i + 1] = M.readInt32BE(i * 4 + 4);
		  }
		  for (; i < 160; i += 2) {
		    var xh = W[i - 15 * 2];
		    var xl = W[i - 15 * 2 + 1];
		    var gamma0 = Gamma0(xh, xl);
		    var gamma0l = Gamma0l(xl, xh);

		    xh = W[i - 2 * 2];
		    xl = W[i - 2 * 2 + 1];
		    var gamma1 = Gamma1(xh, xl);
		    var gamma1l = Gamma1l(xl, xh);

		    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
		    var Wi7h = W[i - 7 * 2];
		    var Wi7l = W[i - 7 * 2 + 1];

		    var Wi16h = W[i - 16 * 2];
		    var Wi16l = W[i - 16 * 2 + 1];

		    var Wil = (gamma0l + Wi7l) | 0;
		    var Wih = (gamma0 + Wi7h + getCarry(Wil, gamma0l)) | 0;
		    Wil = (Wil + gamma1l) | 0;
		    Wih = (Wih + gamma1 + getCarry(Wil, gamma1l)) | 0;
		    Wil = (Wil + Wi16l) | 0;
		    Wih = (Wih + Wi16h + getCarry(Wil, Wi16l)) | 0;

		    W[i] = Wih;
		    W[i + 1] = Wil;
		  }

		  for (var j = 0; j < 160; j += 2) {
		    Wih = W[j];
		    Wil = W[j + 1];

		    var majh = maj$1(ah, bh, ch);
		    var majl = maj$1(al, bl, cl);

		    var sigma0h = sigma0$1(ah, al);
		    var sigma0l = sigma0$1(al, ah);
		    var sigma1h = sigma1$1(eh, el);
		    var sigma1l = sigma1$1(el, eh);

		    // t1 = h + sigma1 + ch + K[j] + W[j]
		    var Kih = K$3[j];
		    var Kil = K$3[j + 1];

		    var chh = Ch(eh, fh, gh);
		    var chl = Ch(el, fl, gl);

		    var t1l = (hl + sigma1l) | 0;
		    var t1h = (hh + sigma1h + getCarry(t1l, hl)) | 0;
		    t1l = (t1l + chl) | 0;
		    t1h = (t1h + chh + getCarry(t1l, chl)) | 0;
		    t1l = (t1l + Kil) | 0;
		    t1h = (t1h + Kih + getCarry(t1l, Kil)) | 0;
		    t1l = (t1l + Wil) | 0;
		    t1h = (t1h + Wih + getCarry(t1l, Wil)) | 0;

		    // t2 = sigma0 + maj
		    var t2l = (sigma0l + majl) | 0;
		    var t2h = (sigma0h + majh + getCarry(t2l, sigma0l)) | 0;

		    hh = gh;
		    hl = gl;
		    gh = fh;
		    gl = fl;
		    fh = eh;
		    fl = el;
		    el = (dl + t1l) | 0;
		    eh = (dh + t1h + getCarry(el, dl)) | 0;
		    dh = ch;
		    dl = cl;
		    ch = bh;
		    cl = bl;
		    bh = ah;
		    bl = al;
		    al = (t1l + t2l) | 0;
		    ah = (t1h + t2h + getCarry(al, t1l)) | 0;
		  }

		  this._al = (this._al + al) | 0;
		  this._bl = (this._bl + bl) | 0;
		  this._cl = (this._cl + cl) | 0;
		  this._dl = (this._dl + dl) | 0;
		  this._el = (this._el + el) | 0;
		  this._fl = (this._fl + fl) | 0;
		  this._gl = (this._gl + gl) | 0;
		  this._hl = (this._hl + hl) | 0;

		  this._ah = (this._ah + ah + getCarry(this._al, al)) | 0;
		  this._bh = (this._bh + bh + getCarry(this._bl, bl)) | 0;
		  this._ch = (this._ch + ch + getCarry(this._cl, cl)) | 0;
		  this._dh = (this._dh + dh + getCarry(this._dl, dl)) | 0;
		  this._eh = (this._eh + eh + getCarry(this._el, el)) | 0;
		  this._fh = (this._fh + fh + getCarry(this._fl, fl)) | 0;
		  this._gh = (this._gh + gh + getCarry(this._gl, gl)) | 0;
		  this._hh = (this._hh + hh + getCarry(this._hl, hl)) | 0;
		};

		Sha512.prototype._hash = function () {
		  var H = Buffer$f.allocUnsafe(64);

		  function writeInt64BE (h, l, offset) {
		    H.writeInt32BE(h, offset);
		    H.writeInt32BE(l, offset + 4);
		  }

		  writeInt64BE(this._ah, this._al, 0);
		  writeInt64BE(this._bh, this._bl, 8);
		  writeInt64BE(this._ch, this._cl, 16);
		  writeInt64BE(this._dh, this._dl, 24);
		  writeInt64BE(this._eh, this._el, 32);
		  writeInt64BE(this._fh, this._fl, 40);
		  writeInt64BE(this._gh, this._gl, 48);
		  writeInt64BE(this._hh, this._hl, 56);

		  return H
		};

		var sha512 = Sha512;

		var Buffer$g = safeBuffer.Buffer;

		var W$5 = new Array(160);

		function Sha384 () {
		  this.init();
		  this._w = W$5;

		  hash.call(this, 128, 112);
		}

		inherits_browser(Sha384, sha512);

		Sha384.prototype.init = function () {
		  this._ah = 0xcbbb9d5d;
		  this._bh = 0x629a292a;
		  this._ch = 0x9159015a;
		  this._dh = 0x152fecd8;
		  this._eh = 0x67332667;
		  this._fh = 0x8eb44a87;
		  this._gh = 0xdb0c2e0d;
		  this._hh = 0x47b5481d;

		  this._al = 0xc1059ed8;
		  this._bl = 0x367cd507;
		  this._cl = 0x3070dd17;
		  this._dl = 0xf70e5939;
		  this._el = 0xffc00b31;
		  this._fl = 0x68581511;
		  this._gl = 0x64f98fa7;
		  this._hl = 0xbefa4fa4;

		  return this
		};

		Sha384.prototype._hash = function () {
		  var H = Buffer$g.allocUnsafe(48);

		  function writeInt64BE (h, l, offset) {
		    H.writeInt32BE(h, offset);
		    H.writeInt32BE(l, offset + 4);
		  }

		  writeInt64BE(this._ah, this._al, 0);
		  writeInt64BE(this._bh, this._bl, 8);
		  writeInt64BE(this._ch, this._cl, 16);
		  writeInt64BE(this._dh, this._dl, 24);
		  writeInt64BE(this._eh, this._el, 32);
		  writeInt64BE(this._fh, this._fl, 40);

		  return H
		};

		var sha384 = Sha384;

		var sha_js = createCommonjsModule(function (module) {
		var exports = module.exports = function SHA (algorithm) {
		  algorithm = algorithm.toLowerCase();

		  var Algorithm = exports[algorithm];
		  if (!Algorithm) throw new Error(algorithm + ' is not supported (we accept pull requests)')

		  return new Algorithm()
		};

		exports.sha = sha;
		exports.sha1 = sha1;
		exports.sha224 = sha224;
		exports.sha256 = sha256;
		exports.sha384 = sha384;
		exports.sha512 = sha512;
		});

		var Buffer$h = safeBuffer.Buffer;





		var ZEROS$1 = Buffer$h.alloc(128);

		function Hmac$1 (alg, key) {
		  cipherBase.call(this, 'digest');
		  if (typeof key === 'string') {
		    key = Buffer$h.from(key);
		  }

		  var blocksize = (alg === 'sha512' || alg === 'sha384') ? 128 : 64;

		  this._alg = alg;
		  this._key = key;
		  if (key.length > blocksize) {
		    var hash = alg === 'rmd160' ? new ripemd160() : sha_js(alg);
		    key = hash.update(key).digest();
		  } else if (key.length < blocksize) {
		    key = Buffer$h.concat([key, ZEROS$1], blocksize);
		  }

		  var ipad = this._ipad = Buffer$h.allocUnsafe(blocksize);
		  var opad = this._opad = Buffer$h.allocUnsafe(blocksize);

		  for (var i = 0; i < blocksize; i++) {
		    ipad[i] = key[i] ^ 0x36;
		    opad[i] = key[i] ^ 0x5C;
		  }
		  this._hash = alg === 'rmd160' ? new ripemd160() : sha_js(alg);
		  this._hash.update(ipad);
		}

		inherits_browser(Hmac$1, cipherBase);

		Hmac$1.prototype._update = function (data) {
		  this._hash.update(data);
		};

		Hmac$1.prototype._final = function () {
		  var h = this._hash.digest();
		  var hash = this._alg === 'rmd160' ? new ripemd160() : sha_js(this._alg);
		  return hash.update(this._opad).update(h).digest()
		};

		var browser$2 = function createHmac (alg, key) {
		  alg = alg.toLowerCase();
		  if (alg === 'rmd160' || alg === 'ripemd160') {
		    return new Hmac$1('rmd160', key)
		  }
		  if (alg === 'md5') {
		    return new legacy(md5, key)
		  }
		  return new Hmac$1(alg, key)
		};

		var slip0010 = createCommonjsModule(function (module, exports) {
		var __createBinding = (commonjsGlobal$1 && commonjsGlobal$1.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __setModuleDefault = (commonjsGlobal$1 && commonjsGlobal$1.__setModuleDefault) || (Object.create ? (function(o, v) {
		    Object.defineProperty(o, "default", { enumerable: true, value: v });
		}) : function(o, v) {
		    o["default"] = v;
		});
		var __importStar = (commonjsGlobal$1 && commonjsGlobal$1.__importStar) || function (mod) {
		    if (mod && mod.__esModule) return mod;
		    var result = {};
		    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		    __setModuleDefault(result, mod);
		    return result;
		};
		var __importDefault = (commonjsGlobal$1 && commonjsGlobal$1.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Slip0010 = void 0;
		const create_hmac_1 = __importDefault(browser$2);
		const nacl = __importStar(naclFast);
		/**
		 * Class to help with slip0010 key derivation.
		 * https://github.com/satoshilabs/slips/blob/master/slip-0010.md
		 */
		class Slip0010 {
		    /**
		     * Get the master key from the seed.
		     * @param seed The seed to generate the master key from.
		     * @returns The key and chain code.
		     */
		    static getMasterKeyFromSeed(seed) {
		        const hmac = create_hmac_1.default("sha512", "ed25519 seed");
		        const fullKey = hmac.update(seed).digest();
		        return {
		            privateKey: fullKey.slice(0, 32),
		            chainCode: fullKey.slice(32)
		        };
		    }
		    /**
		     * Derive a key from the path.
		     * @param seed The seed.
		     * @param path The path.
		     * @returns The key and chain code.
		     */
		    static derivePath(seed, path) {
		        let { privateKey, chainCode } = Slip0010.getMasterKeyFromSeed(seed);
		        const segments = path.numberSegments();
		        for (let i = 0; i < segments.length; i++) {
		            const indexBuffer = Buffer.allocUnsafe(4);
		            indexBuffer.writeUInt32BE(0x80000000 + segments[i], 0);
		            const data = Buffer.concat([Buffer.alloc(1, 0), privateKey, indexBuffer]);
		            const fullKey = create_hmac_1.default("sha512", chainCode)
		                .update(data)
		                .digest();
		            privateKey = fullKey.slice(0, 32);
		            chainCode = fullKey.slice(32);
		        }
		        return {
		            privateKey,
		            chainCode
		        };
		    }
		    /**
		     * Get the public key from the private key.
		     * @param privateKey The private key.
		     * @param withZeroByte Include a zero bute prefix.
		     * @returns The public key.
		     */
		    static getPublicKey(privateKey, withZeroByte = true) {
		        const keyPair = nacl.sign.keyPair.fromSeed(privateKey);
		        const signPk = Buffer.from(keyPair.secretKey.slice(32));
		        return withZeroByte
		            ? Buffer.concat([Buffer.alloc(1, 0), signPk])
		            : signPk;
		    }
		}
		exports.Slip0010 = Slip0010;

		});

		var ed25519Seed = createCommonjsModule(function (module, exports) {
		var __createBinding = (commonjsGlobal$1 && commonjsGlobal$1.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __setModuleDefault = (commonjsGlobal$1 && commonjsGlobal$1.__setModuleDefault) || (Object.create ? (function(o, v) {
		    Object.defineProperty(o, "default", { enumerable: true, value: v });
		}) : function(o, v) {
		    o["default"] = v;
		});
		var __importStar = (commonjsGlobal$1 && commonjsGlobal$1.__importStar) || function (mod) {
		    if (mod && mod.__esModule) return mod;
		    var result = {};
		    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		    __setModuleDefault(result, mod);
		    return result;
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Ed25519Seed = void 0;
		const nacl = __importStar(naclFast);

		/**
		 * Class to help with seeds.
		 */
		class Ed25519Seed {
		    constructor() {
		        /**
		         * The secret key for the seed.
		         */
		        this._secretKey = Buffer.alloc(0);
		    }
		    /**
		     * Create a seed from the bytes.
		     * @param buffer The binary representation of the seed.
		     * @returns The seed.
		     */
		    static fromBytes(buffer) {
		        const seed = new Ed25519Seed();
		        seed._secretKey = buffer;
		        return seed;
		    }
		    /**
		     * Create a seed from the hex string.
		     * @param hex The hex representation of the seed.
		     * @returns The seed.
		     */
		    static fromString(hex) {
		        const seed = new Ed25519Seed();
		        seed._secretKey = Buffer.from(hex, "hex");
		        return seed;
		    }
		    /**
		     * Generate a new random seed.
		     * @returns The random seed.
		     */
		    static random() {
		        return Ed25519Seed.fromBytes(Buffer.from(nacl.randomBytes(Ed25519Seed.SEED_SIZE_BYTES)));
		    }
		    /**
		     * Get the key pair from the seed.
		     * @returns The key pair.
		     */
		    keyPair() {
		        const signKeyPair = nacl.sign.keyPair.fromSeed(this._secretKey);
		        return {
		            publicKey: Buffer.from(signKeyPair.publicKey).toString("hex"),
		            privateKey: Buffer.from(signKeyPair.secretKey).toString("hex")
		        };
		    }
		    /**
		     * Generate a new seed from the path.
		     * @param path The path to generate the seed for.
		     * @returns The generated seed.
		     */
		    generateSeedFromPath(path) {
		        const keys = slip0010.Slip0010.derivePath(this._secretKey, path);
		        return Ed25519Seed.fromBytes(keys.privateKey);
		    }
		    /**
		     * Return the key as bytes.
		     * @returns The key as bytes.
		     */
		    toBytes() {
		        return this._secretKey;
		    }
		    /**
		     * Return the key as string.
		     * @returns The key as string.
		     */
		    toString() {
		        return this._secretKey.toString("hex");
		    }
		}
		exports.Ed25519Seed = Ed25519Seed;
		/**
		 * SeedSize is the size, in bytes, of private key seeds.
		 */
		Ed25519Seed.SEED_SIZE_BYTES = 32;

		});

		var common$1 = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.DEFAULT_CHUNK_SIZE = void 0;
		exports.DEFAULT_CHUNK_SIZE = 20;

		});

		var getAddressBalances_1 = createCommonjsModule(function (module, exports) {
		var __awaiter = (commonjsGlobal$1 && commonjsGlobal$1.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.getAddressBalances = void 0;
		/**
		 * Get the balance for a list of addresses.
		 * @param client The client to send the transfer with.
		 * @param addresses The list of addresses to get the balance for.
		 * @returns The balances.
		 */
		function getAddressBalances(client, addresses) {
		    return __awaiter(this, void 0, void 0, function* () {
		        const balances = [];
		        for (const address of addresses) {
		            const addressOutputIds = yield client.addressOutputs(address);
		            let balance = 0;
		            for (const addressOutputId of addressOutputIds.outputIds) {
		                const addressOutput = yield client.output(addressOutputId);
		                if (!addressOutput.isSpent) {
		                    balance += addressOutput.output.amount;
		                }
		            }
		            balances.push(balance);
		        }
		        return balances;
		    });
		}
		exports.getAddressBalances = getAddressBalances;

		});

		var getAddressesKeyPairs_1 = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.getAddressesKeyPairs = void 0;

		/**
		 * Generate a list of address key pairs.
		 * @param seed The seed.
		 * @param basePath The base path to start looking for addresses.
		 * @param startIndex The start index to generate from, defaults to 0.
		 * @param count The number of address seeds, defaults to DEFAULT_CHUNK_SIZE.
		 * @returns A list of the signature key pairs for the addresses.
		 */
		function getAddressesKeyPairs(seed, basePath, startIndex = 0, count = common$1.DEFAULT_CHUNK_SIZE) {
		    const keyPairs = [];
		    for (let i = startIndex; i < startIndex + count; i++) {
		        basePath.push(i);
		        const newSeed = seed.generateSeedFromPath(basePath);
		        keyPairs.push(newSeed.keyPair());
		        basePath.pop();
		    }
		    return keyPairs;
		}
		exports.getAddressesKeyPairs = getAddressesKeyPairs;

		});

		var getAddresses_1 = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.getAddresses = void 0;



		/**
		 * Generate a list of address key pairs.
		 * @param seed The seed.
		 * @param basePath The base path to start looking for addresses.
		 * @param startIndex The start index to generate from, defaults to 0.
		 * @param count The number of address seeds, defaults to DEFAULT_CHUNK_SIZE.
		 * @returns A list of the signature key pairs for the addresses.
		 */
		function getAddresses(seed, basePath, startIndex = 0, count = common$1.DEFAULT_CHUNK_SIZE) {
		    return getAddressesKeyPairs_1.getAddressesKeyPairs(seed, basePath, startIndex, count).map(kp => ed25519.Ed25519.publicKeyToAddress(kp.publicKey));
		}
		exports.getAddresses = getAddresses;

		});

		var getAllUnspentAddresses_1 = createCommonjsModule(function (module, exports) {
		var __awaiter = (commonjsGlobal$1 && commonjsGlobal$1.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.getAllUnspentAddresses = void 0;



		/**
		 * Get all the unspent addresses.
		 * @param client The client to send the transfer with.
		 * @param seed The seed to use for address generation.
		 * @param basePath The base path to start looking for addresses.
		 * @param startIndex Optional start index for the wallet count address, defaults to 0.
		 * @returns All the unspent addresses.
		 */
		function getAllUnspentAddresses(client, seed, basePath, startIndex) {
		    return __awaiter(this, void 0, void 0, function* () {
		        let localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
		        let finished = false;
		        const allUnspent = [];
		        do {
		            const addresses = getAddressesKeyPairs_1.getAddressesKeyPairs(seed, basePath, localStartIndex, common$1.DEFAULT_CHUNK_SIZE);
		            for (let i = 0; i < addresses.length; i++) {
		                const addr = ed25519.Ed25519.publicKeyToAddress(addresses[i].publicKey);
		                const addressOutputIds = yield client.addressOutputs(addr);
		                let amount = 0;
		                for (const addressOutputId of addressOutputIds.outputIds) {
		                    const addressOutput = yield client.output(addressOutputId);
		                    if (!addressOutput.isSpent && addressOutput.output.amount !== 0) {
		                        amount += addressOutput.output.amount;
		                    }
		                }
		                if (amount === 0) {
		                    finished = true;
		                }
		                else {
		                    allUnspent.push({
		                        address: addr,
		                        index: localStartIndex + i,
		                        amount
		                    });
		                }
		            }
		            localStartIndex += common$1.DEFAULT_CHUNK_SIZE;
		        } while (!finished);
		        return allUnspent;
		    });
		}
		exports.getAllUnspentAddresses = getAllUnspentAddresses;

		});

		var getBalance_1 = createCommonjsModule(function (module, exports) {
		var __awaiter = (commonjsGlobal$1 && commonjsGlobal$1.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.getBalance = void 0;



		/**
		 * Get the balance for the address.
		 * @param client The client to send the transfer with.
		 * @param seed The seed to use for address generation.
		 * @param basePath The base path to start looking for addresses.
		 * @param startIndex Optional start index for the wallet count address, defaults to 0.
		 * @returns The balance.
		 */
		function getBalance(client, seed, basePath, startIndex) {
		    return __awaiter(this, void 0, void 0, function* () {
		        let localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
		        let finished = false;
		        let balance = 0;
		        do {
		            const addresses = getAddressesKeyPairs_1.getAddressesKeyPairs(seed, basePath, localStartIndex, common$1.DEFAULT_CHUNK_SIZE);
		            for (let i = 0; i < addresses.length; i++) {
		                const addr = ed25519.Ed25519.publicKeyToAddress(addresses[i].publicKey);
		                const addressOutputIds = yield client.addressOutputs(addr);
		                if (addressOutputIds.outputIds.length === 0) {
		                    finished = true;
		                }
		                else {
		                    for (const addressOutputId of addressOutputIds.outputIds) {
		                        const addressOutput = yield client.output(addressOutputId);
		                        if (addressOutput.output.amount === 0) {
		                            finished = true;
		                        }
		                        else if (!addressOutput.isSpent) {
		                            balance += addressOutput.output.amount;
		                        }
		                    }
		                }
		            }
		            localStartIndex += common$1.DEFAULT_CHUNK_SIZE;
		        } while (!finished);
		        return balance;
		    });
		}
		exports.getBalance = getBalance;

		});

		var getUnspentAddress_1 = createCommonjsModule(function (module, exports) {
		var __awaiter = (commonjsGlobal$1 && commonjsGlobal$1.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.getUnspentAddress = void 0;



		/**
		 * Get the first unspent address.
		 * @param client The client to send the transfer with.
		 * @param seed The seed to use for address generation.
		 * @param basePath The base path to start looking for addresses.
		 * @param startIndex Optional start index for the wallet count address, defaults to 0.
		 * @returns The first unspent address.
		 */
		function getUnspentAddress(client, seed, basePath, startIndex) {
		    return __awaiter(this, void 0, void 0, function* () {
		        let localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
		        let finished = false;
		        let unspentAddress;
		        let unspentAddressIndex;
		        let unspentAmount = 0;
		        do {
		            const addresses = getAddressesKeyPairs_1.getAddressesKeyPairs(seed, basePath, localStartIndex, common$1.DEFAULT_CHUNK_SIZE);
		            for (let i = 0; i < addresses.length; i++) {
		                const addr = ed25519.Ed25519.publicKeyToAddress(addresses[i].publicKey);
		                const addressOutputIds = yield client.addressOutputs(addr);
		                if (addressOutputIds.outputIds.length === 0) {
		                    finished = true;
		                }
		                else {
		                    for (const addressOutputId of addressOutputIds.outputIds) {
		                        const addressOutput = yield client.output(addressOutputId);
		                        if (addressOutput.output.amount === 0) {
		                            finished = true;
		                        }
		                        else if (!addressOutput.isSpent) {
		                            unspentAddress = addr;
		                            unspentAddressIndex = localStartIndex + i;
		                            unspentAmount += addressOutput.output.amount;
		                        }
		                    }
		                }
		                if (unspentAddress) {
		                    finished = true;
		                }
		            }
		            localStartIndex += common$1.DEFAULT_CHUNK_SIZE;
		        } while (!finished);
		        return unspentAddress && unspentAddressIndex !== undefined ? {
		            address: unspentAddress,
		            index: unspentAddressIndex,
		            amount: unspentAmount
		        } : undefined;
		    });
		}
		exports.getUnspentAddress = getUnspentAddress;

		});

		var retrieveData_1 = createCommonjsModule(function (module, exports) {
		var __awaiter = (commonjsGlobal$1 && commonjsGlobal$1.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.retrieveData = void 0;
		/**
		 * Retrieve a data message.
		 * @param client The client to send the transfer with.
		 * @param messageId The message id of the data to get.
		 * @returns The message index and data.
		 */
		function retrieveData(client, messageId) {
		    return __awaiter(this, void 0, void 0, function* () {
		        const message = yield client.message(messageId);
		        if (message === null || message === void 0 ? void 0 : message.payload) {
		            let indexationPayload;
		            if (message.payload.type === 0) {
		                indexationPayload = message.payload.essence.payload;
		            }
		            else if (message.payload.type === 2) {
		                indexationPayload = message.payload;
		            }
		            if (indexationPayload) {
		                return {
		                    index: indexationPayload.index,
		                    data: Buffer.from(indexationPayload.data, "hex")
		                };
		            }
		        }
		    });
		}
		exports.retrieveData = retrieveData;

		});

		var writeBuffer = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.WriteBuffer = void 0;

		/**
		 * Keep track of the write index within a buffer.
		 */
		class WriteBuffer {
		    /**
		     * Create a new instance of ReadBuffer.
		     */
		    constructor() {
		        this._buffer = Buffer.alloc(WriteBuffer.CHUNK_SIZE);
		        this._writeIndex = 0;
		    }
		    /**
		     * Get the length of the buffer.
		     * @returns The buffer length.
		     */
		    length() {
		        return this._buffer.length;
		    }
		    /**
		     * How much unused data is there.
		     * @returns The amount of unused data.
		     */
		    unused() {
		        return this._buffer.length - this._writeIndex;
		    }
		    /**
		     * Get the final buffer.
		     * @returns The final buffer.
		     */
		    finalBuffer() {
		        return this._buffer.slice(0, this._writeIndex);
		    }
		    /**
		     * Get the current write index.
		     * @returns The current write index.
		     */
		    getWriteIndex() {
		        return this._writeIndex;
		    }
		    /**
		     * Set the current write index.
		     * @param writeIndex The current write index.
		     */
		    setWriteIndex(writeIndex) {
		        this._writeIndex = writeIndex;
		    }
		    /**
		     * Write fixed length buffer.
		     * @param name The name of the data we are trying to write.
		     * @param length The length of the data to write.
		     * @param val The data to write.
		     */
		    writeFixedBufferHex(name, length, val) {
		        if (!common.isHex(val)) {
		            throw new Error(`The ${val} should be in hex format`);
		        }
		        // Hex should be twice the length as each byte is 2 ascii characters
		        if (length * 2 !== val.length) {
		            throw new Error(`${name} length ${val.length} does not match expected length ${length * 2}`);
		        }
		        this.expand(length);
		        this._buffer.write(val, this._writeIndex, "hex");
		        this._writeIndex += length;
		    }
		    /**
		     * Write a byte to the buffer.
		     * @param name The name of the data we are trying to write.
		     * @param val The data to write.
		     */
		    writeByte(name, val) {
		        this.expand(1);
		        this._buffer.writeUInt8(val, this._writeIndex);
		        this._writeIndex += 1;
		    }
		    /**
		     * Write a UInt16 to the buffer.
		     * @param name The name of the data we are trying to write.
		     * @param val The data to write.
		     */
		    writeUInt16(name, val) {
		        this.expand(2);
		        this._buffer.writeUInt16LE(val, this._writeIndex);
		        this._writeIndex += 2;
		    }
		    /**
		     * Write a UInt32 to the buffer.
		     * @param name The name of the data we are trying to write.
		     * @param val The data to write.
		     */
		    writeUInt32(name, val) {
		        this.expand(4);
		        this._buffer.writeUInt32LE(val, this._writeIndex);
		        this._writeIndex += 4;
		    }
		    /**
		     * Write a UInt64 to the buffer.
		     * @param name The name of the data we are trying to write.
		     * @param val The data to write.
		     */
		    writeUInt64(name, val) {
		        this.expand(8);
		        if (this._buffer.writeBigUInt64LE) {
		            this._buffer.writeBigUInt64LE(val, this._writeIndex);
		        }
		        else {
		            // Polyfill if buffer has no bigint support
		            const width = 8;
		            const hex = val.toString(16);
		            const buffer = Buffer.from(hex.padStart(width * 2, "0"), "hex");
		            buffer.reverse();
		            this._buffer.write(buffer.toString("hex"), this._writeIndex);
		        }
		        this._writeIndex += 8;
		    }
		    /**
		     * Write a string to the buffer.
		     * @param name The name of the data we are trying to write.
		     * @param val The data to write.
		     * @returns The string.
		     */
		    writeString(name, val) {
		        this.writeUInt16(name, val.length);
		        this.expand(val.length);
		        this._buffer.write(val, this._writeIndex);
		        this._writeIndex += val.length;
		        return val;
		    }
		    /**
		     * Expand the buffer if there is not enough spave.
		     * @param additional The amount of space needed.
		     */
		    expand(additional) {
		        if (this._writeIndex + additional > this._buffer.byteLength) {
		            this._buffer = Buffer.concat([this._buffer, Buffer.alloc(WriteBuffer.CHUNK_SIZE)]);
		        }
		    }
		}
		exports.WriteBuffer = WriteBuffer;
		/**
		 * Chunk size to expand the buffer.
		 */
		WriteBuffer.CHUNK_SIZE = 4096;

		});

		var sendAdvanced_1 = createCommonjsModule(function (module, exports) {
		var __awaiter = (commonjsGlobal$1 && commonjsGlobal$1.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.sendAdvanced = void 0;







		/**
		 * Send a transfer from the balance on the seed.
		 * @param client The client to send the transfer with.
		 * @param seed The seed to use for address generation.
		 * @param basePath The base path to start looking for addresses.
		 * @param outputs The outputs to send.
		 * @param startIndex Optional start index for the wallet count address, defaults to 0.
		 * @param index Optional indexation name.
		 * @param data Optional index data.
		 * @returns The id of the message created and the remainder address if one was needed.
		 */
		function sendAdvanced(client, seed, basePath, outputs, startIndex, index, data) {
		    return __awaiter(this, void 0, void 0, function* () {
		        if (!outputs || outputs.length === 0) {
		            throw new Error("You must specify some outputs");
		        }
		        const requiredBalance = outputs.reduce((total, output) => total + output.amount, 0);
		        let localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
		        let consumedBalance = 0;
		        const inputsAndSignatureKeyPairs = [];
		        let finished = false;
		        let remainderKeyPair;
		        do {
		            const addresses = getAddressesKeyPairs_1.getAddressesKeyPairs(seed, basePath, localStartIndex, common$1.DEFAULT_CHUNK_SIZE);
		            for (const address of addresses) {
		                const addressOutputIds = yield client.addressOutputs(ed25519.Ed25519.publicKeyToAddress(address.publicKey));
		                if (addressOutputIds.outputIds.length === 0) {
		                    finished = true;
		                    remainderKeyPair = address;
		                }
		                else {
		                    for (const addressOutputId of addressOutputIds.outputIds) {
		                        const addressOutput = yield client.output(addressOutputId);
		                        if (addressOutput.isSpent) {
		                            if (addressOutput.output.amount !== 0) {
		                                throw new Error("Spent address");
		                            }
		                        }
		                        else if (addressOutput.output.amount !== 0) {
		                            if (consumedBalance < requiredBalance) {
		                                consumedBalance += addressOutput.output.amount;
		                                const input$1 = {
		                                    type: 0,
		                                    transactionId: addressOutput.transactionId,
		                                    transactionOutputIndex: addressOutput.outputIndex
		                                };
		                                const writeBuffer$1 = new writeBuffer.WriteBuffer();
		                                input.serializeInput(writeBuffer$1, input$1);
		                                inputsAndSignatureKeyPairs.push({
		                                    input: input$1,
		                                    addressKeyPair: address,
		                                    serialized: writeBuffer$1.finalBuffer().toString("hex")
		                                });
		                            }
		                        }
		                    }
		                }
		            }
		            localStartIndex += common$1.DEFAULT_CHUNK_SIZE;
		        } while (!finished);
		        if (consumedBalance < requiredBalance) {
		            throw new Error("There are not enough funds in the inputs for the required balance");
		        }
		        // We have consumed more than we need to so add a remainder output
		        // back to the address from the seed that didn't have any outputs or balance
		        let remainderAddress;
		        if (requiredBalance < consumedBalance && remainderKeyPair) {
		            remainderAddress = ed25519.Ed25519.publicKeyToAddress(remainderKeyPair.publicKey);
		            outputs.push({
		                amount: consumedBalance - requiredBalance,
		                address: remainderAddress
		            });
		        }
		        const outputsWithSerialization = [];
		        for (const output$1 of outputs) {
		            const sigLockedOutput = {
		                type: 0,
		                address: {
		                    type: 1,
		                    address: output$1.address
		                },
		                amount: output$1.amount
		            };
		            const writeBuffer$1 = new writeBuffer.WriteBuffer();
		            output.serializeOutput(writeBuffer$1, sigLockedOutput);
		            outputsWithSerialization.push({
		                output: sigLockedOutput,
		                serialized: writeBuffer$1.finalBuffer().toString("hex")
		            });
		        }
		        // Lexigraphically sort the inputs and outputs
		        const sortedInputs = inputsAndSignatureKeyPairs.sort((a, b) => a.serialized.localeCompare(b.serialized));
		        const sortedOutputs = outputsWithSerialization.sort((a, b) => a.serialized.localeCompare(b.serialized));
		        const transactionEssence = {
		            type: 0,
		            inputs: sortedInputs.map(i => i.input),
		            outputs: sortedOutputs.map(o => o.output),
		            payload: index && data
		                ? {
		                    type: 2,
		                    index,
		                    data: data.toString("hex")
		                }
		                : undefined
		        };
		        const binaryEssenceBuffer = new writeBuffer.WriteBuffer();
		        transaction.serializeTransactionEssence(binaryEssenceBuffer, transactionEssence);
		        const essenceFinalBuffer = binaryEssenceBuffer.finalBuffer();
		        // Create the unlock blocks
		        const unlockBlocks = [];
		        const addressToUnlockBlock = {};
		        for (const input of sortedInputs) {
		            if (addressToUnlockBlock[input.addressKeyPair.publicKey]) {
		                unlockBlocks.push({
		                    type: 1,
		                    reference: addressToUnlockBlock[input.addressKeyPair.publicKey].unlockIndex
		                });
		            }
		            else {
		                unlockBlocks.push({
		                    type: 0,
		                    signature: {
		                        type: 1,
		                        publicKey: input.addressKeyPair.publicKey,
		                        signature: ed25519.Ed25519.signData(input.addressKeyPair.privateKey, essenceFinalBuffer)
		                    }
		                });
		                addressToUnlockBlock[input.addressKeyPair.publicKey] = {
		                    keyPair: input.addressKeyPair,
		                    unlockIndex: unlockBlocks.length - 1
		                };
		            }
		        }
		        const transactionPayload = {
		            type: 0,
		            essence: transactionEssence,
		            unlockBlocks
		        };
		        const tips = yield client.tips();
		        const message = {
		            version: 1,
		            parent1MessageId: tips.tip1MessageId,
		            parent2MessageId: tips.tip2MessageId,
		            payload: transactionPayload,
		            nonce: 0
		        };
		        const messageId = yield client.messageSubmit(message);
		        return {
		            messageId,
		            message,
		            remainderAddress
		        };
		    });
		}
		exports.sendAdvanced = sendAdvanced;

		});

		var send_1 = createCommonjsModule(function (module, exports) {
		var __awaiter = (commonjsGlobal$1 && commonjsGlobal$1.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.send = void 0;

		/**
		 * Send a transfer from the balance on the seed.
		 * @param client The client to send the transfer with.
		 * @param seed The seed to use for address generation.
		 * @param basePath The base path to start looking for addresses.
		 * @param address The address to send the funds to.
		 * @param amount The amount to send.
		 * @param startIndex The start index for the wallet count address, defaults to 0.
		 * @returns The id of the message created and the contructed message.
		 */
		function send(client, seed, basePath, address, amount, startIndex) {
		    return __awaiter(this, void 0, void 0, function* () {
		        const response = yield sendAdvanced_1.sendAdvanced(client, seed, basePath, [{ address, amount }], startIndex);
		        return {
		            messageId: response.messageId,
		            message: response.message
		        };
		    });
		}
		exports.send = send;

		});

		var sendData_1 = createCommonjsModule(function (module, exports) {
		var __awaiter = (commonjsGlobal$1 && commonjsGlobal$1.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.sendData = void 0;
		/**
		 * Send a data message.
		 * @param client The client to send the transfer with.
		 * @param index The index name.
		 * @param data The index data.
		 * @returns The id of the message created and the message.
		 */
		function sendData(client, index, data) {
		    return __awaiter(this, void 0, void 0, function* () {
		        const indexationPayload = {
		            type: 2,
		            index,
		            data: data.toString("hex")
		        };
		        const tips = yield client.tips();
		        const message = {
		            version: 1,
		            parent1MessageId: tips.tip1MessageId,
		            parent2MessageId: tips.tip2MessageId,
		            payload: indexationPayload,
		            nonce: 0
		        };
		        const messageId = yield client.messageSubmit(message);
		        return {
		            message,
		            messageId
		        };
		    });
		}
		exports.sendData = sendData;

		});

		var IEd25519Address = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IEd25519Signature = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IIndexationPayload = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IKeyPair = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IMessage = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IMilestonePayload = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IReferenceUnlockBlock = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var ISeed = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var ISigLockedSingleOutput = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var ISignatureUnlockBlock = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var ITransactionEssence = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var ITransactionPayload = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var ITypeBase = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IUTXOInput = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var logging = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.logUnlockBlock = exports.logOutput = exports.logInput = exports.logSignature = exports.logAddress = exports.logPayload = exports.logMessage = exports.setLogger = void 0;
		/**
		 * The logger used by the log methods.
		 * @param message The message to output.
		 * @param data The data to output.
		 * @returns Nothing.
		 */
		let logger = (message, data) => console.log(message, data);
		/**
		 * Set the logger for output.
		 * @param log The logger.
		 */
		function setLogger(log) {
		    logger = log;
		}
		exports.setLogger = setLogger;
		/**
		 * Log a message to the console.
		 * @param prefix The prefix for the output.
		 * @param message The message to log.
		 */
		function logMessage(prefix, message) {
		    logger(`${prefix}\tVersion:`, message.version);
		    logger(`${prefix}\tParent 1 Message Id:`, message.parent1MessageId);
		    logger(`${prefix}\tParent 2 Message Id:`, message.parent2MessageId);
		    logPayload(`${prefix}\t`, message.payload);
		    if (message.nonce !== undefined) {
		        logger(`${prefix}\tNonce:`, message.nonce);
		    }
		}
		exports.logMessage = logMessage;
		/**
		 * Log a message to the console.
		 * @param prefix The prefix for the output.
		 * @param unknownPayload The payload.
		 */
		function logPayload(prefix, unknownPayload) {
		    if (unknownPayload) {
		        if (unknownPayload.type === 0) {
		            const payload = unknownPayload;
		            logger(`${prefix}Transaction Payload`);
		            if (payload.essence.type === 0) {
		                if (payload.essence.inputs) {
		                    logger(`${prefix}\tInputs:`, payload.essence.inputs.length);
		                    for (const input of payload.essence.inputs) {
		                        logInput(`${prefix}\t\t`, input);
		                    }
		                }
		                if (payload.essence.outputs) {
		                    logger(`${prefix}\tOutputs:`, payload.essence.outputs.length);
		                    for (const output of payload.essence.outputs) {
		                        logOutput(`${prefix}\t\t`, output);
		                    }
		                }
		                logPayload(`${prefix}\t`, payload.essence.payload);
		            }
		            if (payload.unlockBlocks) {
		                logger(`${prefix}\tUnlock Blocks:`, payload.unlockBlocks.length);
		                for (const unlockBlock of payload.unlockBlocks) {
		                    logUnlockBlock(`${prefix}\t\t`, unlockBlock);
		                }
		            }
		        }
		        else if (unknownPayload.type === 1) {
		            const payload = unknownPayload;
		            logger(`${prefix}Milestone Payload`);
		            logger(`${prefix}\tIndex:`, payload.index);
		            logger(`${prefix}\tTimestamp:`, payload.timestamp);
		            logger(`${prefix}\tInclusion Merkle Proof:`, payload.inclusionMerkleProof);
		            logger(`${prefix}\tSignatures:`, payload.signatures);
		        }
		        else if (unknownPayload.type === 2) {
		            const payload = unknownPayload;
		            logger(`${prefix}Indexation Payload`);
		            logger(`${prefix}\tIndex:`, payload.index);
		            logger(`${prefix}\tData:`, Buffer.from(payload.data, "hex").toString());
		        }
		    }
		}
		exports.logPayload = logPayload;
		/**
		 * Log an address to the console.
		 * @param prefix The prefix for the output.
		 * @param unknownAddress The address to log.
		 */
		function logAddress(prefix, unknownAddress) {
		    if (unknownAddress) {
		        if (unknownAddress.type === 1) {
		            const address = unknownAddress;
		            logger(`${prefix}Ed25519 Address`);
		            logger(`${prefix}\tAddress:`, address.address);
		        }
		    }
		}
		exports.logAddress = logAddress;
		/**
		 * Log signature to the console.
		 * @param prefix The prefix for the output.
		 * @param unknownSignature The signature to log.
		 */
		function logSignature(prefix, unknownSignature) {
		    if (unknownSignature) {
		        if (unknownSignature.type === 1) {
		            const signature = unknownSignature;
		            logger(`${prefix}Ed25519 Signature`);
		            logger(`${prefix}\tPublic Key:`, signature.publicKey);
		            logger(`${prefix}\tSignature:`, signature.signature);
		        }
		    }
		}
		exports.logSignature = logSignature;
		/**
		 * Log input to the console.
		 * @param prefix The prefix for the output.
		 * @param unknownInput The input to log.
		 */
		function logInput(prefix, unknownInput) {
		    if (unknownInput) {
		        if (unknownInput.type === 0) {
		            const input = unknownInput;
		            logger(`${prefix}UTXO Input`);
		            logger(`${prefix}\tTransaction Id:`, input.transactionId);
		            logger(`${prefix}\tTransaction Output Index:`, input.transactionOutputIndex);
		        }
		    }
		}
		exports.logInput = logInput;
		/**
		 * Log output to the console.
		 * @param prefix The prefix for the output.
		 * @param unknownOutput The output to log.
		 */
		function logOutput(prefix, unknownOutput) {
		    if (unknownOutput) {
		        if (unknownOutput.type === 0) {
		            const output = unknownOutput;
		            logger(`${prefix}Signature Locked Single Output`);
		            logAddress(`${prefix}\t\t`, output.address);
		            logger(`${prefix}\t\tAmount:`, output.amount);
		        }
		    }
		}
		exports.logOutput = logOutput;
		/**
		 * Log unlock block to the console.
		 * @param prefix The prefix for the output.
		 * @param unknownUnlockBlock The unlock block to log.
		 */
		function logUnlockBlock(prefix, unknownUnlockBlock) {
		    if (unknownUnlockBlock) {
		        if (unknownUnlockBlock.type === 0) {
		            const unlockBlock = unknownUnlockBlock;
		            logger(`${prefix}\tSignature Unlock Block`);
		            logSignature(`${prefix}\t\t\t`, unlockBlock.signature);
		        }
		        else if (unknownUnlockBlock.type === 1) {
		            const unlockBlock = unknownUnlockBlock;
		            logger(`${prefix}\tReference Unlock Block`);
		            logger(`${prefix}\t\tReference:`, unlockBlock.reference);
		        }
		    }
		}
		exports.logUnlockBlock = logUnlockBlock;

		});

		var readBuffer = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.ReadBuffer = void 0;
		/**
		 * Keep track of the read index within a buffer.
		 */
		class ReadBuffer {
		    /**
		     * Create a new instance of ReadBuffer.
		     * @param buffer The buffer to access.
		     * @param readStartIndex The index to start the reading from.
		     */
		    constructor(buffer, readStartIndex = 0) {
		        this._buffer = buffer;
		        this._readIndex = readStartIndex;
		    }
		    /**
		     * Get the length of the buffer.
		     * @returns The buffer length.
		     */
		    length() {
		        return this._buffer.length;
		    }
		    /**
		     * Does the buffer have enough data remaining.
		     * @param remaining The amount of space needed.
		     * @returns True if it has enough data.
		     */
		    hasRemaining(remaining) {
		        return this._readIndex + remaining <= this._buffer.length;
		    }
		    /**
		     * How much unused data is there.
		     * @returns The amount of unused data.
		     */
		    unused() {
		        return this._buffer.length - this._readIndex;
		    }
		    /**
		     * Read fixed length buffer.
		     * @param name The name of the data we are trying to read.
		     * @param length The length of the data to read.
		     * @param moveIndex Move the index pointer on.
		     * @returns The buffer.
		     */
		    readFixedBufferHex(name, length, moveIndex = true) {
		        if (!this.hasRemaining(length)) {
		            throw new Error(`${name} length ${length} exceeds the remaining data ${this.unused()}`);
		        }
		        const val = this._buffer.slice(this._readIndex, this._readIndex + length);
		        if (moveIndex) {
		            this._readIndex += length;
		        }
		        return val.toString("hex");
		    }
		    /**
		     * Read a byte from the buffer.
		     * @param name The name of the data we are trying to read.
		     * @param moveIndex Move the index pointer on.
		     * @returns The value.
		     */
		    readByte(name, moveIndex = true) {
		        if (!this.hasRemaining(1)) {
		            throw new Error(`${name} length ${1} exceeds the remaining data ${this.unused()}`);
		        }
		        const val = this._buffer.readUInt8(this._readIndex);
		        if (moveIndex) {
		            this._readIndex += 1;
		        }
		        return val;
		    }
		    /**
		     * Read a UInt16 from the buffer.
		     * @param name The name of the data we are trying to read.
		     * @param moveIndex Move the index pointer on.
		     * @returns The value.
		     */
		    readUInt16(name, moveIndex = true) {
		        if (!this.hasRemaining(2)) {
		            throw new Error(`${name} length ${2} exceeds the remaining data ${this.unused()}`);
		        }
		        const val = this._buffer.readUInt16LE(this._readIndex);
		        if (moveIndex) {
		            this._readIndex += 2;
		        }
		        return val;
		    }
		    /**
		     * Read a UInt32 from the buffer.
		     * @param name The name of the data we are trying to read.
		     * @param moveIndex Move the index pointer on.
		     * @returns The value.
		     */
		    readUInt32(name, moveIndex = true) {
		        if (!this.hasRemaining(4)) {
		            throw new Error(`${name} length ${4} exceeds the remaining data ${this.unused()}`);
		        }
		        const val = this._buffer.readUInt32LE(this._readIndex);
		        if (moveIndex) {
		            this._readIndex += 4;
		        }
		        return val;
		    }
		    /**
		     * Read a UInt64 from the buffer.
		     * @param name The name of the data we are trying to read.
		     * @param moveIndex Move the index pointer on.
		     * @returns The value.
		     */
		    readUInt64(name, moveIndex = true) {
		        if (!this.hasRemaining(8)) {
		            throw new Error(`${name} length ${8} exceeds the remaining data ${this.unused()}`);
		        }
		        let val;
		        if (this._buffer.readBigUInt64LE) {
		            val = this._buffer.readBigUInt64LE(this._readIndex);
		        }
		        else {
		            // Polyfill if buffer has no bigint support
		            const buffer = this._buffer.slice(this._readIndex, this._readIndex + 8);
		            buffer.reverse();
		            val = BigInt(`0x${buffer.toString("hex")}`);
		        }
		        if (moveIndex) {
		            this._readIndex += 8;
		        }
		        return val;
		    }
		    /**
		     * Read a string from the buffer.
		     * @param name The name of the data we are trying to read.
		     * @param moveIndex Move the index pointer on.
		     * @returns The string.
		     */
		    readString(name, moveIndex = true) {
		        const stringLength = this.readUInt16(name);
		        if (!this.hasRemaining(stringLength)) {
		            throw new Error(`${name} length ${stringLength} exceeds the remaining data ${this.unused()}`);
		        }
		        const val = this._buffer.slice(this._readIndex, this._readIndex + stringLength);
		        if (moveIndex) {
		            this._readIndex += stringLength;
		        }
		        return val.toString();
		    }
		}
		exports.ReadBuffer = ReadBuffer;

		});

		var es = createCommonjsModule(function (module, exports) {
		var __createBinding = (commonjsGlobal$1 && commonjsGlobal$1.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (commonjsGlobal$1 && commonjsGlobal$1.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Buffer = void 0;

		Object.defineProperty(exports, "Buffer", { enumerable: true, get: function () { return buffer_1.Buffer; } });
		__exportStar(clientError, exports);
		__exportStar(IAddress, exports);
		__exportStar(IAddressOutputs, exports);
		__exportStar(IChildren, exports);
		__exportStar(IClient, exports);
		__exportStar(IInfo, exports);
		__exportStar(IMessageId, exports);
		__exportStar(IMessageMetadata, exports);
		__exportStar(IMessages, exports);
		__exportStar(IMilestone, exports);
		__exportStar(IOutput, exports);
		__exportStar(IResponse, exports);
		__exportStar(ITips, exports);
		__exportStar(singleNodeClient, exports);
		__exportStar(address, exports);
		__exportStar(common, exports);
		__exportStar(input, exports);
		__exportStar(message, exports);
		__exportStar(output, exports);
		__exportStar(payload, exports);
		__exportStar(signature, exports);
		__exportStar(transaction, exports);
		__exportStar(unlockBlock, exports);
		__exportStar(bip32Path, exports);
		__exportStar(blake2b$1, exports);
		__exportStar(ed25519, exports);
		__exportStar(ed25519Seed, exports);
		__exportStar(slip0010, exports);
		__exportStar(common$1, exports);
		__exportStar(getAddressBalances_1, exports);
		__exportStar(getAddresses_1, exports);
		__exportStar(getAddressesKeyPairs_1, exports);
		__exportStar(getAllUnspentAddresses_1, exports);
		__exportStar(getBalance_1, exports);
		__exportStar(getUnspentAddress_1, exports);
		__exportStar(retrieveData_1, exports);
		__exportStar(send_1, exports);
		__exportStar(sendAdvanced_1, exports);
		__exportStar(sendData_1, exports);
		__exportStar(IEd25519Address, exports);
		__exportStar(IEd25519Signature, exports);
		__exportStar(IIndexationPayload, exports);
		__exportStar(IKeyPair, exports);
		__exportStar(IMessage, exports);
		__exportStar(IMilestonePayload, exports);
		__exportStar(IReferenceUnlockBlock, exports);
		__exportStar(ISeed, exports);
		__exportStar(ISigLockedSingleOutput, exports);
		__exportStar(ISignatureUnlockBlock, exports);
		__exportStar(ITransactionEssence, exports);
		__exportStar(ITransactionPayload, exports);
		__exportStar(ITypeBase, exports);
		__exportStar(IUTXOInput, exports);
		__exportStar(logging, exports);
		__exportStar(readBuffer, exports);
		__exportStar(writeBuffer, exports);

		});

		var index = /*@__PURE__*/getDefaultExportFromCjs(es);

		return index;

	})));
	});

	var curl = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Curl = void 0;
	/**
	 * Class to implement Curl sponge.
	 * @private
	 */
	class Curl {
	    /**
	     * Create a new instance of Curl.
	     * @param rounds The number of rounds to perform.
	     */
	    constructor(rounds = Curl.NUMBER_OF_ROUNDS) {
	        if (rounds !== 27 && rounds !== 81) {
	            throw new Error("Illegal number of rounds. Only `27` and `81` rounds are supported.");
	        }
	        this._state = new Int8Array(Curl.STATE_LENGTH);
	        this._rounds = rounds;
	    }
	    /**
	     * Resets the state
	     */
	    reset() {
	        this._state = new Int8Array(Curl.STATE_LENGTH);
	    }
	    /**
	     * Get the state of the sponge.
	     * @param len The length of the state to get.
	     * @returns The state.
	     */
	    rate(len = Curl.HASH_LENGTH) {
	        return this._state.slice(0, len);
	    }
	    /**
	     * Absorbs trits given an offset and length
	     * @param trits The trits to absorb.
	     * @param offset The offset to start abororbing from the array.
	     * @param length The length of trits to absorb.
	     */
	    absorb(trits, offset, length) {
	        do {
	            const limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
	            this._state.set(trits.subarray(offset, offset + limit));
	            this.transform();
	            length -= Curl.HASH_LENGTH;
	            offset += limit;
	        } while (length > 0);
	    }
	    /**
	     * Squeezes trits given an offset and length
	     * @param trits The trits to squeeze.
	     * @param offset The offset to start squeezing from the array.
	     * @param length The length of trits to squeeze.
	     */
	    squeeze(trits, offset, length) {
	        do {
	            const limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
	            trits.set(this._state.subarray(0, limit), offset);
	            this.transform();
	            length -= Curl.HASH_LENGTH;
	            offset += limit;
	        } while (length > 0);
	    }
	    /**
	     * Sponge transform function
	     */
	    transform() {
	        let stateCopy;
	        let index = 0;
	        for (let round = 0; round < this._rounds; round++) {
	            stateCopy = this._state.slice();
	            for (let i = 0; i < Curl.STATE_LENGTH; i++) {
	                this._state[i] =
	                    // eslint-disable-next-line no-bitwise
	                    Curl.TRUTH_TABLE[stateCopy[index] + (stateCopy[(index += index < 365 ? 364 : -365)] << 2) + 5];
	            }
	        }
	    }
	}
	exports.Curl = Curl;
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

	});

	var textHelper = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TextHelper = void 0;
	/**
	 * Helper functions for use with text.
	 */
	class TextHelper {
	    /**
	     * Encode Non ASCII characters to escaped characters.
	     * @param value The value to encode.
	     * @returns The encoded value.
	     */
	    static encodeNonASCII(value) {
	        return typeof value === "string"
	            ? value.replace(/[\u007F-\uFFFF]/g, chr => `\\u${(`0000${chr.charCodeAt(0).toString(16)}`).slice(-4)}`)
	            : undefined;
	    }
	    /**
	     * Decode escaped Non ASCII characters.
	     * @param value The value to decode.
	     * @returns The decoded value.
	     */
	    static decodeNonASCII(value) {
	        return typeof value === "string"
	            ? value.replace(/\\u(\w{4})/gi, (match, grp) => String.fromCharCode(Number.parseInt(grp, 16)))
	            : undefined;
	    }
	}
	exports.TextHelper = TextHelper;

	});

	var trytesHelper = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TrytesHelper = void 0;

	/**
	 * Helper functions for use with trytes.
	 */
	class TrytesHelper {
	    /**
	     * Is the string trytes length 81.
	     * @param trytes The trytes to test.
	     * @returns True if it is trytes 81 chars long.
	     */
	    static isHash(trytes) {
	        return /^[9A-Z]{81}$/.test(trytes);
	    }
	    /**
	     * Is the string trytes length 27.
	     * @param trytes The trytes to test.
	     * @returns True if it is trytes 27 chars long.
	     */
	    static isTag(trytes) {
	        return /^[9A-Z]{27}$/.test(trytes);
	    }
	    /**
	     * Is the string trytes of any length.
	     * @param trytes The trytes to test.
	     * @returns True if it is trytes.
	     */
	    static isTrytes(trytes) {
	        return /^[9A-Z]+$/.test(trytes);
	    }
	    /**
	     * Create a trits array from trytes.
	     * @param value Trytes used to create trits.
	     * @returns The trits array.
	     */
	    static toTrits(value) {
	        const trits = new Int8Array(value.length * 3);
	        for (let i = 0; i < value.length; i++) {
	            const idx = TrytesHelper.ALPHABET.indexOf(value.charAt(i));
	            trits[i * 3] = TrytesHelper.TRYTES_TRITS[idx][0];
	            trits[(i * 3) + 1] = TrytesHelper.TRYTES_TRITS[idx][1];
	            trits[(i * 3) + 2] = TrytesHelper.TRYTES_TRITS[idx][2];
	        }
	        return trits;
	    }
	    /**
	     * Get trytes from trits array.
	     * @param trits The trits to convert to trytes.
	     * @returns Trytes.
	     */
	    static fromTrits(trits) {
	        let trytes = "";
	        for (let i = 0; i < trits.length; i += 3) {
	            // Iterate over all possible tryte values to find correct trit representation
	            for (let j = 0; j < TrytesHelper.ALPHABET.length; j++) {
	                if (TrytesHelper.TRYTES_TRITS[j][0] === trits[i] &&
	                    TrytesHelper.TRYTES_TRITS[j][1] === trits[i + 1] &&
	                    TrytesHelper.TRYTES_TRITS[j][2] === trits[i + 2]) {
	                    trytes += TrytesHelper.ALPHABET.charAt(j);
	                    break;
	                }
	            }
	        }
	        return trytes;
	    }
	    /**
	     * Convert trits to an integer.
	     * @param trits The trits to convert.
	     * @returns The trits converted to number.
	     */
	    static tritsValue(trits) {
	        let value = 0;
	        for (let i = trits.length - 1; i >= 0; i--) {
	            value = (value * 3) + trits[i];
	        }
	        return value;
	    }
	    /**
	     * Convert a string value into trytes.
	     * @param value value to convert into trytes.
	     * @returns The trytes representation of the value.
	     */
	    static fromAscii(value) {
	        let trytes = "";
	        for (let i = 0; i < value.length; i++) {
	            const asciiValue = value.charCodeAt(i);
	            const firstValue = asciiValue % 27;
	            const secondValue = (asciiValue - firstValue) / 27;
	            trytes += TrytesHelper.ALPHABET[firstValue] + TrytesHelper.ALPHABET[secondValue];
	        }
	        return trytes;
	    }
	    /**
	     * Convert trytes into a string value.
	     * @param trytes to convert into a string value.
	     * @returns The string value converted from the trytes.
	     */
	    static toAscii(trytes) {
	        const trytesString = trytes;
	        if (trytesString.length % 2 === 1) {
	            throw new Error("The trytes length must be an even number");
	        }
	        let ascii = "";
	        for (let i = 0; i < trytesString.length; i += 2) {
	            const firstValue = TrytesHelper.ALPHABET.indexOf(trytesString[i]);
	            const secondValue = TrytesHelper.ALPHABET.indexOf(trytesString[i + 1]);
	            const decimalValue = firstValue + (secondValue * 27);
	            ascii += String.fromCharCode(decimalValue);
	        }
	        return ascii;
	    }
	    /**
	     * Convert an object to Trytes.
	     * @param obj The obj to encode.
	     * @returns The encoded trytes value.
	     */
	    static objectToTrytes(obj) {
	        const json = JSON.stringify(obj);
	        const encoded = textHelper.TextHelper.encodeNonASCII(json);
	        return encoded ? TrytesHelper.fromAscii(encoded) : "";
	    }
	    /**
	     * Convert an object from Trytes.
	     * @param trytes The trytes to decode.
	     * @returns The decoded object.
	     */
	    static objectFromTrytes(trytes) {
	        if (typeof (trytes) !== "string") {
	            throw new TypeError("fromTrytes can only convert strings");
	        }
	        // Trim trailing 9s
	        const trimmed = trytes.replace(/\9+$/, "");
	        if (trimmed.length === 0) {
	            throw new Error("fromTrytes trytes does not contain any data");
	        }
	        const ascii = TrytesHelper.toAscii(trimmed);
	        const json = textHelper.TextHelper.decodeNonASCII(ascii);
	        return json ? JSON.parse(json) : undefined;
	    }
	    /**
	     * Convert a string to Trytes.
	     * @param str The string to encode.
	     * @returns The encoded trytes value.
	     */
	    static stringToTrytes(str) {
	        const encoded = textHelper.TextHelper.encodeNonASCII(str);
	        return encoded ? TrytesHelper.fromAscii(encoded) : "";
	    }
	    /**
	     * Convert a string from Trytes.
	     * @param trytes The trytes to decode.
	     * @returns The decoded string.
	     */
	    static stringFromTrytes(trytes) {
	        // Trim trailing 9s
	        let trimmed = trytes.replace(/\9+$/, "");
	        // And make sure it is even length (2 trytes per ascii char)
	        if (trimmed.length % 2 === 1) {
	            trimmed += "9";
	        }
	        const ascii = TrytesHelper.toAscii(trimmed);
	        return textHelper.TextHelper.decodeNonASCII(ascii);
	    }
	}
	exports.TrytesHelper = TrytesHelper;
	/**
	 * All the characters that can be used in trytes.
	 */
	TrytesHelper.ALPHABET = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	/**
	 * Trytes to trits lookup table.
	 */
	TrytesHelper.TRYTES_TRITS = [
	    new Int8Array([0, 0, 0]),
	    new Int8Array([1, 0, 0]),
	    new Int8Array([-1, 1, 0]),
	    new Int8Array([0, 1, 0]),
	    new Int8Array([1, 1, 0]),
	    new Int8Array([-1, -1, 1]),
	    new Int8Array([0, -1, 1]),
	    new Int8Array([1, -1, 1]),
	    new Int8Array([-1, 0, 1]),
	    new Int8Array([0, 0, 1]),
	    new Int8Array([1, 0, 1]),
	    new Int8Array([-1, 1, 1]),
	    new Int8Array([0, 1, 1]),
	    new Int8Array([1, 1, 1]),
	    new Int8Array([-1, -1, -1]),
	    new Int8Array([0, -1, -1]),
	    new Int8Array([1, -1, -1]),
	    new Int8Array([-1, 0, -1]),
	    new Int8Array([0, 0, -1]),
	    new Int8Array([1, 0, -1]),
	    new Int8Array([-1, 1, -1]),
	    new Int8Array([0, 1, -1]),
	    new Int8Array([1, 1, -1]),
	    new Int8Array([-1, -1, 0]),
	    new Int8Array([0, -1, 0]),
	    new Int8Array([1, -1, 0]),
	    new Int8Array([-1, 0, 0])
	];

	});

	var issP27 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.digestFromSignature = exports.checksumSecurity = exports.signature = exports.privateKeyFromSubseed = exports.address = exports.digestFromSubseed = exports.subseed = exports.PRIVATE_KEY_FRAGMENT_LENGTH = void 0;

	const PRIVATE_KEY_NUM_FRAGMENTS = 27;
	exports.PRIVATE_KEY_FRAGMENT_LENGTH = PRIVATE_KEY_NUM_FRAGMENTS * curl.Curl.HASH_LENGTH;
	const MIN_TRYTE_VALUE = -13;
	const MAX_TRYTE_VALUE = 13;
	const MIN_TRIT_VALUE = -1;
	const MAX_TRIT_VALUE = 1;
	/**
	 * Calculate the subseed for the seed.
	 * @param seed The seed trits.
	 * @param index The index for the subseed.
	 * @returns The subseed trits.
	 * @private
	 */
	function subseed(seed, index) {
	    const sponge = new curl.Curl(27);
	    const subseedPreimage = seed.slice();
	    let localIndex = index;
	    while (localIndex-- > 0) {
	        for (let i = 0; i < subseedPreimage.length; i++) {
	            if (subseedPreimage[i]++ >= MAX_TRIT_VALUE) {
	                subseedPreimage[i] = MIN_TRIT_VALUE;
	            }
	            else {
	                break;
	            }
	        }
	    }
	    sponge.absorb(subseedPreimage, 0, subseedPreimage.length);
	    const ss = new Int8Array(curl.Curl.HASH_LENGTH);
	    sponge.squeeze(ss, 0, ss.length);
	    return ss;
	}
	exports.subseed = subseed;
	/**
	 * Get the digest from the subseed.
	 * @param subSeed The subseed to get the digest for.
	 * @param securityLevel The security level to get the digest.
	 * @returns The digest trits.
	 * @private
	 */
	function digestFromSubseed(subSeed, securityLevel) {
	    const curl1 = new curl.Curl(27);
	    const curl2 = new curl.Curl(27);
	    const curl3 = new curl.Curl(27);
	    const length = securityLevel * exports.PRIVATE_KEY_FRAGMENT_LENGTH / curl.Curl.HASH_LENGTH;
	    const digest = new Int8Array(curl.Curl.HASH_LENGTH);
	    curl1.absorb(subSeed, 0, subSeed.length);
	    for (let i = 0; i < length; i++) {
	        curl1.squeeze(digest, 0, digest.length);
	        for (let k = 0; k < MAX_TRYTE_VALUE - MIN_TRYTE_VALUE + 1; k++) {
	            curl2.reset();
	            curl2.absorb(digest, 0, digest.length);
	            curl2.squeeze(digest, 0, digest.length);
	        }
	        curl3.absorb(digest, 0, digest.length);
	    }
	    curl3.squeeze(digest, 0, digest.length);
	    return digest;
	}
	exports.digestFromSubseed = digestFromSubseed;
	/**
	 * Get the address from the digests.
	 * @param digests The digests to get the address for.
	 * @returns The address trits.
	 * @private
	 */
	function address(digests) {
	    const sponge = new curl.Curl(27);
	    sponge.absorb(digests, 0, digests.length);
	    const addressTrits = new Int8Array(curl.Curl.HASH_LENGTH);
	    sponge.squeeze(addressTrits, 0, addressTrits.length);
	    return addressTrits;
	}
	exports.address = address;
	/**
	 * Get the private key from the subseed.
	 * @param subSeed The subseed to get the private key for.
	 * @param securityLevel The security level for the private key.
	 * @returns The private key trits.
	 * @private
	 */
	function privateKeyFromSubseed(subSeed, securityLevel) {
	    const keyLength = securityLevel * exports.PRIVATE_KEY_FRAGMENT_LENGTH;
	    const keyTrits = new Int8Array(keyLength);
	    const actualKeyTrits = new Int8Array(keyLength);
	    const sponge = new curl.Curl(27);
	    sponge.absorb(subSeed, 0, subSeed.length);
	    sponge.squeeze(keyTrits, 0, keyTrits.length);
	    for (let i = 0; i < keyLength / curl.Curl.HASH_LENGTH; i++) {
	        const offset = i * curl.Curl.HASH_LENGTH;
	        sponge.reset();
	        sponge.absorb(keyTrits, offset, curl.Curl.HASH_LENGTH);
	        actualKeyTrits.set(sponge.rate(), offset);
	    }
	    return actualKeyTrits;
	}
	exports.privateKeyFromSubseed = privateKeyFromSubseed;
	/**
	 * Create a signature for the trits.
	 * @param hashTrits The trits to create the signature for.
	 * @param key The key to use for signing.
	 * @returns The signature trits.
	 * @private
	 */
	function signature(hashTrits, key) {
	    const signatures = new Int8Array(key.length);
	    const sponge = new curl.Curl(27);
	    for (let i = 0; i < key.length / curl.Curl.HASH_LENGTH; i++) {
	        let buffer = key.subarray(i * curl.Curl.HASH_LENGTH, (i + 1) * curl.Curl.HASH_LENGTH);
	        for (let k = 0; k < MAX_TRYTE_VALUE - (hashTrits[i * 3] + (hashTrits[(i * 3) + 1] * 3) + (hashTrits[(i * 3) + 2] * 9)); k++) {
	            sponge.reset();
	            sponge.absorb(buffer, 0, buffer.length);
	            buffer = sponge.rate();
	        }
	        signatures.set(buffer, i * curl.Curl.HASH_LENGTH);
	    }
	    return signatures;
	}
	exports.signature = signature;
	/**
	 * Check the security level.
	 * @param hash The hash to check.
	 * @returns The security level
	 * @private
	 */
	function checksumSecurity(hash) {
	    if (hash.slice(0, curl.Curl.HASH_LENGTH / 3).reduce((a, b) => a + b, 0) === 0) {
	        return 1;
	    }
	    if (hash.slice(0, 2 * curl.Curl.HASH_LENGTH / 3).reduce((a, b) => a + b, 0) === 0) {
	        return 2;
	    }
	    return hash.reduce((a, b) => a + b, 0) === 0 ? 3 : 0;
	}
	exports.checksumSecurity = checksumSecurity;
	/**
	 * Get the digest from the signature
	 * @param hash The hash to get the digest.
	 * @param sig The signature.
	 * @returns The digest.
	 * @private
	 */
	function digestFromSignature(hash, sig) {
	    const sponge = new curl.Curl(27);
	    const buffer = new Int8Array(sig.length);
	    for (let i = 0; i < (sig.length / curl.Curl.HASH_LENGTH); i++) {
	        let innerBuffer = sig.slice(i * curl.Curl.HASH_LENGTH, (i + 1) * curl.Curl.HASH_LENGTH);
	        for (let j = 0; j < (hash[i * 3] + (hash[(i * 3) + 1] * 3) + (hash[(i * 3) + 2] * 9)) - MIN_TRYTE_VALUE; j++) {
	            sponge.reset();
	            sponge.absorb(innerBuffer, 0, innerBuffer.length);
	            innerBuffer = sponge.rate();
	        }
	        buffer.set(innerBuffer, i * curl.Curl.HASH_LENGTH);
	    }
	    sponge.reset();
	    sponge.absorb(buffer, 0, buffer.length);
	    return sponge.rate();
	}
	exports.digestFromSignature = digestFromSignature;

	});

	var merkleHashGenerator = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.generateAddress = void 0;

	/**
	 * Generate an address for the merklr tree.
	 * @param seedTrits The trits for the seed.
	 * @param index The index of the address to generate.
	 * @param security The security level of the address to generate.
	 * @returns The address and the private key.
	 * @private
	 */
	function generateAddress(seedTrits, index, security) {
	    const ss = issP27.subseed(seedTrits, index);
	    const dg = issP27.digestFromSubseed(ss, security);
	    return {
	        address: issP27.address(dg),
	        privateKey: issP27.privateKeyFromSubseed(ss, security)
	    };
	}
	exports.generateAddress = generateAddress;

	});

	var merkleNode = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MerkleNode = void 0;
	/**
	 * Class to represent a node in a merkle tree.
	 * @private
	 */
	class MerkleNode {
	    /**
	     * Create a new instance of MerkleNode.
	     * @param left The left node.
	     * @param right The right node.
	     * @param addressTrits The trits representing the address.
	     * @param privateKeyTrits The trits for the private key.
	     */
	    constructor(left, right, addressTrits, privateKeyTrits) {
	        this.left = left;
	        this.right = right;
	        this.size = (left ? left.size : 0) + (right ? right.size : 0);
	        this.addressTrits = addressTrits;
	        this.privateKeyTrits = privateKeyTrits;
	    }
	}
	exports.MerkleNode = MerkleNode;

	});

	var merkleTree = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MerkleTree = void 0;




	/**
	 * Class to represent a merkle tree.
	 * @private
	 */
	class MerkleTree {
	    /**
	     * Create a new instance of the merkle tree.
	     * @param seed The seed to use for the tree.
	     * @param index The start index for the creation.
	     * @param count The count for the creation.
	     * @param security The security level to create the hashes.
	     */
	    constructor(seed, index, count, security) {
	        const seedTrits = trytesHelper.TrytesHelper.toTrits(seed);
	        const leaves = [];
	        for (let i = 0; i < count; i++) {
	            const addressPrivateKey = merkleHashGenerator.generateAddress(seedTrits, index + i, security);
	            leaves.push(new merkleNode.MerkleNode(undefined, undefined, addressPrivateKey.address, addressPrivateKey.privateKey));
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
	    static root(rate, siblings, index) {
	        const sponge = new curl.Curl(27);
	        let i = 1;
	        const numChunks = Math.ceil(siblings.length / curl.Curl.HASH_LENGTH);
	        for (let c = 0; c < numChunks; c++) {
	            const chunk = siblings.slice(c * curl.Curl.HASH_LENGTH, (c + 1) * curl.Curl.HASH_LENGTH);
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
	    }
	    /**
	     * Get a sub tree.
	     * @param index The index of the subtree.
	     * @returns The key and leaves for the sub tree.
	     */
	    getSubtree(index) {
	        var _a;
	        if (this.root.size === 1) {
	            return {
	                key: ((_a = this.root.left) === null || _a === void 0 ? void 0 : _a.privateKeyTrits) ? this.root.left.privateKeyTrits : new Int8Array(),
	                leaves: []
	            };
	        }
	        const leaves = [];
	        let node = this.root;
	        let size = this.root.size;
	        let privateKey;
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
	            leaves
	        };
	    }
	    /**
	     * Build tree from the leaf hashes.
	     * @param leaves The leaves to build the tree from.
	     * @returns The root node.
	     */
	    buildTree(leaves) {
	        const subnodes = [];
	        for (let i = 0; i < leaves.length; i += 2) {
	            const left = leaves[i];
	            const right = (i + 1 < leaves.length) ? leaves[i + 1] : undefined;
	            let addressTrits;
	            if (right) {
	                const sponge = new curl.Curl(27);
	                sponge.absorb(left.addressTrits, 0, left.addressTrits.length);
	                sponge.absorb(right.addressTrits, 0, right.addressTrits.length);
	                addressTrits = new Int8Array(curl.Curl.HASH_LENGTH);
	                sponge.squeeze(addressTrits, 0, addressTrits.length);
	            }
	            else {
	                addressTrits = left.addressTrits;
	            }
	            subnodes.push(new merkleNode.MerkleNode(left, right, addressTrits, undefined));
	        }
	        if (subnodes.length === 1) {
	            return subnodes[0];
	        }
	        return this.buildTree(subnodes);
	    }
	}
	exports.MerkleTree = MerkleTree;

	});

	var pascal = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.roundThird = exports.pascalDecode = exports.pascalEncode = void 0;

	/* eslint-disable no-bitwise */
	const ZERO = new Int8Array([1, 0, 0, -1]);
	const RADIX = 3;
	const TRITS_PER_TRYTE = 3;
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
	    const length = roundThird(minTrits(Math.abs(value), 1));
	    const trits = new Int8Array(encodedLength(value));
	    valueToTrits(value, trits);
	    let encoding = 0;
	    let index = 0;
	    for (let i = 0; i < length - TRITS_PER_TRYTE; i += TRITS_PER_TRYTE) {
	        const tritValue = trits.slice(i, i + TRITS_PER_TRYTE);
	        const tritsAsInt = trytesHelper.TrytesHelper.tritsValue(tritValue);
	        if (tritsAsInt >= 0) {
	            encoding |= 1 << index;
	            for (let j = 0; j < tritValue.length; j++) {
	                trits[i + j] = -tritValue[j];
	            }
	        }
	        index++;
	    }
	    const v = trits.slice(length - TRITS_PER_TRYTE, length - TRITS_PER_TRYTE + length);
	    if (trytesHelper.TrytesHelper.tritsValue(v) < 0) {
	        encoding |= 1 << index;
	        for (let k = 0; k < v.length; k++) {
	            trits[k + length - TRITS_PER_TRYTE] = -trits[k + length - TRITS_PER_TRYTE];
	        }
	    }
	    const checksumTrits = new Int8Array(trits.length - length);
	    valueToTrits(encoding, checksumTrits);
	    for (let i = 0; i < checksumTrits.length; i++) {
	        trits[length + i] = checksumTrits[i];
	    }
	    return trits;
	}
	exports.pascalEncode = pascalEncode;
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
	    const encoderStart = end(value);
	    const inputEnd = encoderStart + (encoderStart / TRITS_PER_TRYTE);
	    const encoder = trytesHelper.TrytesHelper.tritsValue(value.slice(encoderStart, inputEnd));
	    let result = 0;
	    for (let i = 0; i < encoderStart / TRITS_PER_TRYTE; i++) {
	        const tritsIntValue = ((encoder >> i) & 1) !== 0
	            ? -trytesHelper.TrytesHelper.tritsValue(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE))
	            : trytesHelper.TrytesHelper.tritsValue(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE));
	        result += (Math.pow(27, i) * tritsIntValue);
	    }
	    return { value: result, end: inputEnd };
	}
	exports.pascalDecode = pascalDecode;
	/**
	 * Get the encoded length of the value.
	 * @param value The value.
	 * @returns The length.
	 * @private
	 */
	function encodedLength(value) {
	    const length = roundThird(minTrits(Math.abs(value), 1));
	    return length + (length / RADIX);
	}
	/**
	 * Round the number to the third.
	 * @param value The value to round.
	 * @returns The rounded number.
	 * @private
	 */
	function roundThird(value) {
	    const rem = value % RADIX;
	    if (rem === 0) {
	        return value;
	    }
	    return value + RADIX - rem;
	}
	exports.roundThird = roundThird;
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
	    if (trytesHelper.TrytesHelper.tritsValue(input.slice(0, TRITS_PER_TRYTE)) > 0) {
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
	    const endWrite = writeTrits(input, trits, 0);
	    if (input >= 0) {
	        return endWrite;
	    }
	    for (let i = 0; i < trits.length; i++) {
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
	            let abs = Math.floor(input / RADIX);
	            // eslint-disable-next-line no-case-declarations
	            let r = input % RADIX;
	            if (r > 1) {
	                abs += 1;
	                r = -1;
	            }
	            trits[index] = r;
	            index++;
	            return 1 + writeTrits(abs, trits, index);
	    }
	}

	});

	var hammingDiver = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HammingDiver = void 0;
	const big_integer_1 = __importDefault(require$$0__default['default']);


	/**
	 * Class to perform Hamming calculation for nonce.
	 * @private
	 */
	class HammingDiver {
	    /**
	     * Search for the nonce.
	     * @param trits The trits to calculate the nonce.
	     * @param securityLevel The security level to calculate at.
	     * @param length The length of the data to search.
	     * @param offset The offset to start the search.
	     * @returns The trits of the nonce.
	     */
	    search(trits, securityLevel, length, offset) {
	        const state = this.prepareTrits(trits, offset);
	        let size = Math.min(length, curl.Curl.HASH_LENGTH) - offset;
	        let index = 0;
	        while (index === 0) {
	            const incrementResult = this.increment(state, offset + (size * 2 / 3), offset + size);
	            size = Math.min(pascal.roundThird(offset + (size * 2 / 3) + incrementResult), curl.Curl.HASH_LENGTH) - offset;
	            const curlCopy = {
	                low: state.low.slice(),
	                high: state.high.slice()
	            };
	            this.transform(curlCopy);
	            index = this.check(securityLevel, curlCopy.low, curlCopy.high);
	        }
	        return this.trinaryGet(state.low, state.high, size, index);
	    }
	    /**
	     * Prepare the trits for calculation.
	     * @param trits The trits.
	     * @param offset The offset to start.
	     * @returns The prepared trits.
	     */
	    prepareTrits(trits, offset) {
	        const initialState = this.tritsToBigInt(trits, curl.Curl.STATE_LENGTH);
	        initialState.low[offset] = HammingDiver.LOW_0;
	        initialState.low[offset + 1] = HammingDiver.LOW_1;
	        initialState.low[offset + 2] = HammingDiver.LOW_2;
	        initialState.low[offset + 3] = HammingDiver.LOW_3;
	        initialState.high[offset] = HammingDiver.HIGH_0;
	        initialState.high[offset + 1] = HammingDiver.HIGH_1;
	        initialState.high[offset + 2] = HammingDiver.HIGH_2;
	        initialState.high[offset + 3] = HammingDiver.HIGH_3;
	        return initialState;
	    }
	    /**
	     * Convert the trits to bigint form.
	     * @param input The input trits.
	     * @param length The length of the input.
	     * @returns The trits in big int form.
	     */
	    tritsToBigInt(input, length) {
	        const result = {
	            low: [],
	            high: []
	        };
	        for (let i = 0; i < input.length; i++) {
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
	        for (let i = input.length; i < length; i++) {
	            result.low[i] = HammingDiver.MAX_VALUE;
	            result.high[i] = HammingDiver.MAX_VALUE;
	        }
	        return result;
	    }
	    /**
	     * Increment the state values.
	     * @param states The state to increment.
	     * @param fromIndex The index to start from.
	     * @param toIndex The index to end at,
	     * @returns The increment length.
	     */
	    increment(states, fromIndex, toIndex) {
	        for (let i = fromIndex; i < toIndex; i++) {
	            const low = states.low[i];
	            const high = states.high[i];
	            states.low[i] = high.xor(low);
	            states.high[i] = low;
	            if ((high.and(low.not())).equals(0)) {
	                return toIndex - fromIndex;
	            }
	        }
	        return toIndex - fromIndex + 1;
	    }
	    /**
	     * Transform the states.
	     * @param searchStates The states to transform.
	     */
	    transform(searchStates) {
	        let curlScratchpadIndex = 0;
	        for (let round = 0; round < HammingDiver.ROUNDS; round++) {
	            const curlScratchpad = {
	                low: searchStates.low.slice(0, curl.Curl.STATE_LENGTH),
	                high: searchStates.high.slice(0, curl.Curl.STATE_LENGTH)
	            };
	            for (let stateIndex = 0; stateIndex < curl.Curl.STATE_LENGTH; stateIndex++) {
	                const alpha = curlScratchpad.low[curlScratchpadIndex];
	                const beta = curlScratchpad.high[curlScratchpadIndex];
	                if (curlScratchpadIndex < 365) {
	                    curlScratchpadIndex += 364;
	                }
	                else {
	                    curlScratchpadIndex += -365;
	                }
	                const gamma = curlScratchpad.high[curlScratchpadIndex];
	                const lowXorBeta = curlScratchpad.low[curlScratchpadIndex].xor(beta);
	                const notGamma = this.bitWiseNot(gamma);
	                const alphaOrNotGamma = alpha.or(notGamma);
	                const delta = alphaOrNotGamma.and(lowXorBeta);
	                searchStates.low[stateIndex] = this.bitWiseNot(delta);
	                const alphaXorGamma = alpha.xor(gamma);
	                searchStates.high[stateIndex] = alphaXorGamma.or(delta);
	            }
	        }
	    }
	    /**
	     * Perform a bitwise not for 64 bit, not twos complement.
	     * @param value The value to bitwise not.
	     * @returns The bitwise not of the value.
	     */
	    bitWiseNot(value) {
	        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
	        return big_integer_1.default(1).shiftLeft(64)
	            .subtract(big_integer_1.default(1))
	            .subtract(value);
	    }
	    /**
	     * Check if we have found the nonce.
	     * @param securityLevel The security level to check.
	     * @param low The low bits.
	     * @param high The high bits.
	     * @returns The nonce if found.
	     */
	    check(securityLevel, low, high) {
	        for (let i = 0; i < 64; i++) {
	            let sum = 0;
	            for (let j = 0; j < securityLevel; j++) {
	                for (let k = j * 243 / 3; k < (j + 1) * 243 / 3; k++) {
	                    const bIndex = big_integer_1.default(1).shiftLeft(i);
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
	    }
	    /**
	     * Get data from the tinary bits.
	     * @param low The low bits.
	     * @param high The high bits.
	     * @param arrLength The array length to get from.
	     * @param index The index to get the values.
	     * @returns The values stored at the index.
	     */
	    trinaryGet(low, high, arrLength, index) {
	        const result = new Int8Array(arrLength);
	        for (let i = 0; i < arrLength; i++) {
	            const bIndex = big_integer_1.default(index);
	            const l = low[i].shiftRight(bIndex).and(1);
	            const h = high[i].shiftRight(bIndex).and(1);
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
	    }
	}
	exports.HammingDiver = HammingDiver;
	/**
	 * Max 64 bit value.
	 */
	HammingDiver.MAX_VALUE = big_integer_1.default("FFFFFFFFFFFFFFFF", 16);
	/**
	 * Min 64 bit value.
	 */
	HammingDiver.MIN_VALUE = big_integer_1.default("0000000000000000", 16);
	/**
	 * High 0
	 */
	HammingDiver.HIGH_0 = big_integer_1.default("B6DB6DB6DB6DB6DB", 16);
	/**
	 * High 1
	 */
	HammingDiver.HIGH_1 = big_integer_1.default("8FC7E3F1F8FC7E3F", 16);
	/**
	 * High 2
	 */
	HammingDiver.HIGH_2 = big_integer_1.default("FFC01FFFF803FFFF", 16);
	/**
	 * High 3
	 */
	HammingDiver.HIGH_3 = big_integer_1.default("003FFFFFFFFFFFFF", 16);
	/**
	 * Low 0
	 */
	HammingDiver.LOW_0 = big_integer_1.default("DB6DB6DB6DB6DB6D", 16);
	/**
	 * Low 1
	 */
	HammingDiver.LOW_1 = big_integer_1.default("F1F8FC7E3F1F8FC7", 16);
	/**
	 * Low 2
	 */
	HammingDiver.LOW_2 = big_integer_1.default("7FFFE00FFFFC01FF", 16);
	/**
	 * Low 3
	 */
	HammingDiver.LOW_3 = big_integer_1.default("FFC0000007FFFFFF", 16);
	/**
	 * Number of rounds
	 */
	HammingDiver.ROUNDS = 27;

	});

	var arrayHelper = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.concatenate = void 0;
	/**
	 * Concatentate a list of arrays.
	 * @param arrays The arrays to concatenate.
	 * @returns The concatenated arrays.
	 * @private
	 */
	function concatenate(arrays) {
	    let totalLength = 0;
	    for (const arr of arrays) {
	        totalLength += arr.length;
	    }
	    const result = new Int8Array(totalLength);
	    let offset = 0;
	    for (const arr of arrays) {
	        result.set(arr, offset);
	        offset += arr.length;
	    }
	    return result;
	}
	exports.concatenate = concatenate;

	});

	var guards = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.validateModeKey = void 0;

	/**
	 * Validate the mode and key.
	 * @param mode The mamMode to validate.
	 * @param sideKey The sideKey to validate.
	 * @private
	 */
	function validateModeKey(mode, sideKey) {
	    if (mode !== "public" && mode !== "private" && mode !== "restricted") {
	        throw new Error(`The mode must be public, private or restricted, it is '${mode}'`);
	    }
	    if (mode === "restricted") {
	        if (!sideKey) {
	            throw new Error("You must provide a sideKey for restricted mode");
	        }
	        if (!trytesHelper.TrytesHelper.isTrytes(sideKey)) {
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
	exports.validateModeKey = validateModeKey;

	});

	var mask_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.unmask = exports.mask = exports.maskHash = void 0;

	/**
	 * Create the mask hash for the key.
	 * @param keyTrits The key to create the mask hash for.
	 * @returns The masked hash.
	 * @private
	 */
	function maskHash(keyTrits) {
	    const sponge = new curl.Curl(81);
	    sponge.absorb(keyTrits, 0, keyTrits.length);
	    const finalKeyTrits = new Int8Array(curl.Curl.HASH_LENGTH);
	    sponge.squeeze(finalKeyTrits, 0, finalKeyTrits.length);
	    return finalKeyTrits;
	}
	exports.maskHash = maskHash;
	/**
	 * Apply mask to the payload.
	 * @param payload The payload to apply the mask to.
	 * @param sponge The sponge to use.
	 * @returns The masked payload.
	 * @private
	 */
	function mask(payload, sponge) {
	    const keyChunk = sponge.rate();
	    const numChunks = Math.ceil(payload.length / curl.Curl.HASH_LENGTH);
	    for (let c = 0; c < numChunks; c++) {
	        const chunk = payload.slice(c * curl.Curl.HASH_LENGTH, (c + 1) * curl.Curl.HASH_LENGTH);
	        sponge.absorb(chunk, 0, chunk.length);
	        const state = sponge.rate();
	        for (let i = 0; i < chunk.length; i++) {
	            payload[(c * curl.Curl.HASH_LENGTH) + i] = tritSum(chunk[i], keyChunk[i]);
	            keyChunk[i] = state[i];
	        }
	    }
	    return payload;
	}
	exports.mask = mask;
	/**
	 * Unmask a payload.
	 * @param payload The payload to unmask.
	 * @param sponge The sponge to use.
	 * @returns The unmasked payload.
	 * @private
	 */
	function unmask(payload, sponge) {
	    const unmasked = new Int8Array(payload);
	    const limit = Math.ceil(unmasked.length / curl.Curl.HASH_LENGTH) * curl.Curl.HASH_LENGTH;
	    let state;
	    for (let c = 0; c < limit; c++) {
	        const indexInChunk = c % curl.Curl.HASH_LENGTH;
	        if (indexInChunk === 0) {
	            state = sponge.rate();
	        }
	        if (state) {
	            unmasked[c] = tritSum(unmasked[c], -state[indexInChunk]);
	        }
	        if (indexInChunk === curl.Curl.HASH_LENGTH - 1) {
	            sponge.absorb(unmasked, Math.floor(c / curl.Curl.HASH_LENGTH) * curl.Curl.HASH_LENGTH, curl.Curl.HASH_LENGTH);
	        }
	    }
	    return unmasked;
	}
	exports.unmask = unmask;
	/**
	 * Sum the parts of a trit.
	 * @param left The left part.
	 * @param right The right part.
	 * @returns The sum.
	 * @private
	 */
	function tritSum(left, right) {
	    const sum = left + right;
	    switch (sum) {
	        case 2:
	            return -1;
	        case -2:
	            return 1;
	        default:
	            return sum;
	    }
	}

	});

	var channel = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createMessage = exports.channelRoot = exports.createChannel = void 0;









	/**
	 * Create a new channel object.
	 * @param seed The seed for the channel.
	 * @param security The security level for the channel.
	 * @param mode The mode for the channel.
	 * @param sideKey The side key to use for restricted mode.
	 * @returns The new channel state.
	 */
	function createChannel(seed, security, mode, sideKey) {
	    if (!trytesHelper.TrytesHelper.isHash(seed)) {
	        throw new Error("The seed must be 81 trytes long");
	    }
	    if (security < 1 || security > 3) {
	        throw new Error(`Security must be between 1 and 3, it is ${security}`);
	    }
	    guards.validateModeKey(mode, sideKey);
	    return {
	        seed,
	        mode,
	        sideKey: mode === "restricted" ? (sideKey !== null && sideKey !== void 0 ? sideKey : "").padEnd(81, "9") : undefined,
	        security,
	        start: 0,
	        count: 1,
	        nextCount: 1,
	        index: 0
	    };
	}
	exports.createChannel = createChannel;
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
	        throw new Error(`channelState.security must be between 1 and 3, it is ${channelState.security}`);
	    }
	    const tree = new merkleTree.MerkleTree(channelState.seed, channelState.start, channelState.count, channelState.security);
	    return trytesHelper.TrytesHelper.fromTrits(tree.root.addressTrits);
	}
	exports.channelRoot = channelRoot;
	/**
	 * Prepare a message on the mam channel.
	 * @param channelState The channel to prepare the message for.
	 * @param message The trytes to include in the message.
	 * @returns The prepared message, the channel state will also be updated.
	 */
	function createMessage(channelState, message) {
	    var _a;
	    if (!trytesHelper.TrytesHelper.isTrytes(message)) {
	        throw new Error("The message must be in trytes");
	    }
	    const tree = new merkleTree.MerkleTree(channelState.seed, channelState.start, channelState.count, channelState.security);
	    const nextRootTree = new merkleTree.MerkleTree(channelState.seed, channelState.start + channelState.count, channelState.nextCount, channelState.security);
	    const nextRootTrits = nextRootTree.root.addressTrits;
	    const messageTrits = trytesHelper.TrytesHelper.toTrits(message);
	    const indexTrits = pascal.pascalEncode(channelState.index);
	    const messageLengthTrits = pascal.pascalEncode(messageTrits.length);
	    const subtree = tree.getSubtree(channelState.index);
	    const sponge = new curl.Curl(27);
	    const sideKeyTrits = trytesHelper.TrytesHelper.toTrits((_a = channelState.sideKey) !== null && _a !== void 0 ? _a : "9".repeat(81));
	    sponge.absorb(sideKeyTrits, 0, sideKeyTrits.length);
	    sponge.absorb(tree.root.addressTrits, 0, tree.root.addressTrits.length);
	    let payload = arrayHelper.concatenate([indexTrits, messageLengthTrits]);
	    sponge.absorb(payload, 0, payload.length);
	    // Encrypt the next root along with the message
	    const maskedNextRoot = mask_1.mask(arrayHelper.concatenate([nextRootTrits, messageTrits]), sponge);
	    payload = arrayHelper.concatenate([payload, maskedNextRoot]);
	    // Calculate the nonce for the message so far
	    const hammingDiver$1 = new hammingDiver.HammingDiver();
	    const nonceTrits = hammingDiver$1.search(sponge.rate(curl.Curl.STATE_LENGTH), channelState.security, curl.Curl.HASH_LENGTH / 3, 0);
	    mask_1.mask(nonceTrits, sponge);
	    payload = arrayHelper.concatenate([payload, nonceTrits]);
	    // Create the signature and add the sibling information
	    const sig = issP27.signature(sponge.rate(), subtree.key);
	    const subtreeTrits = arrayHelper.concatenate(subtree.leaves.map(l => l.addressTrits));
	    const siblingsCount = subtreeTrits.length / curl.Curl.HASH_LENGTH;
	    const encryptedSignature = mask_1.mask(arrayHelper.concatenate([sig, pascal.pascalEncode(siblingsCount), subtreeTrits]), sponge);
	    // Insert the signature and pad if necessary
	    payload = arrayHelper.concatenate([payload, encryptedSignature]);
	    const nextThird = payload.length % 3;
	    if (nextThird !== 0) {
	        payload = arrayHelper.concatenate([payload, new Int8Array(3 - nextThird).fill(0)]);
	    }
	    const messageAddress = channelState.mode === "public"
	        ? tree.root.addressTrits : mask_1.maskHash(tree.root.addressTrits);
	    const maskedAuthenticatedMessage = {
	        payload: trytesHelper.TrytesHelper.fromTrits(payload),
	        root: trytesHelper.TrytesHelper.fromTrits(tree.root.addressTrits),
	        address: trytesHelper.TrytesHelper.fromTrits(messageAddress)
	    };
	    if (channelState.index === channelState.count - 1) {
	        channelState.start = channelState.nextCount + channelState.start;
	        channelState.index = 0;
	    }
	    else {
	        channelState.index++;
	    }
	    channelState.nextRoot = trytesHelper.TrytesHelper.fromTrits(nextRootTrits);
	    return maskedAuthenticatedMessage;
	}
	exports.createMessage = createMessage;

	});

	var global$1 = (typeof global !== "undefined" ? global :
	            typeof self !== "undefined" ? self :
	            typeof window !== "undefined" ? window : {});

	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
	var inited = false;
	function init () {
	  inited = true;
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i];
	    revLookup[code.charCodeAt(i)] = i;
	  }

	  revLookup['-'.charCodeAt(0)] = 62;
	  revLookup['_'.charCodeAt(0)] = 63;
	}

	function toByteArray (b64) {
	  if (!inited) {
	    init();
	  }
	  var i, j, l, tmp, placeHolders, arr;
	  var len = b64.length;

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

	  // base64 is 4/3 + up to two characters of the original data
	  arr = new Arr(len * 3 / 4 - placeHolders);

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len;

	  var L = 0;

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
	    arr[L++] = (tmp >> 16) & 0xFF;
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
	    arr[L++] = tmp & 0xFF;
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp;
	  var output = [];
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
	    output.push(tripletToBase64(tmp));
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  if (!inited) {
	    init();
	  }
	  var tmp;
	  var len = uint8.length;
	  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
	  var output = '';
	  var parts = [];
	  var maxChunkLength = 16383; // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1];
	    output += lookup[tmp >> 2];
	    output += lookup[(tmp << 4) & 0x3F];
	    output += '==';
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
	    output += lookup[tmp >> 10];
	    output += lookup[(tmp >> 4) & 0x3F];
	    output += lookup[(tmp << 2) & 0x3F];
	    output += '=';
	  }

	  parts.push(output);

	  return parts.join('')
	}

	function read (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? (nBytes - 1) : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	function write (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
	  var i = isLE ? 0 : (nBytes - 1);
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	}

	var toString = {}.toString;

	var isArray = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

	var INSPECT_MAX_BYTES = 50;

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
	  ? global$1.TYPED_ARRAY_SUPPORT
	  : true;

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length);
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length);
	    }
	    that.length = length;
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192; // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype;
	  return arr
	};

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	};

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype;
	  Buffer.__proto__ = Uint8Array;
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size);
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	};

	function allocUnsafe (that, size) {
	  assertSize(size);
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0;
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	};

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0;
	  that = createBuffer(that, length);

	  var actual = that.write(string, encoding);

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual);
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0;
	  that = createBuffer(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array);
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset);
	  } else {
	    array = new Uint8Array(array, byteOffset, length);
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array;
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array);
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (internalIsBuffer(obj)) {
	    var len = checked(obj.length) | 0;
	    that = createBuffer(that, len);

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len);
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	Buffer.isBuffer = isBuffer;
	function internalIsBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	};

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length;
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length);
	  var pos = 0;
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i];
	    if (!internalIsBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos);
	    pos += buf.length;
	  }
	  return buffer
	};

	function byteLength (string, encoding) {
	  if (internalIsBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string;
	  }

	  var len = string.length;
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;

	function slowToString (encoding, start, end) {
	  var loweredCase = false;

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0;
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0;
	  start >>>= 0;

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true;

	function swap (b, n, m) {
	  var i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length;
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }
	  return this
	};

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length;
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }
	  return this
	};

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length;
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }
	  return this
	};

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0;
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	};

	Buffer.prototype.equals = function equals (b) {
	  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	};

	Buffer.prototype.inspect = function inspect () {
	  var str = '';
	  var max = INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>'
	};

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!internalIsBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0;
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0;
	  }
	  if (thisStart === undefined) {
	    thisStart = 0;
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length;
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;

	  if (this === target) return 0

	  var x = thisEnd - thisStart;
	  var y = end - start;
	  var len = Math.min(x, y);

	  var thisCopy = this.slice(thisStart, thisEnd);
	  var targetCopy = target.slice(start, end);

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }
	  byteOffset = +byteOffset;  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1);
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding);
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (internalIsBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1;
	  var arrLength = arr.length;
	  var valLength = val.length;

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i;
	  if (dir) {
	    var foundIndex = -1;
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex;
	        foundIndex = -1;
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true;
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false;
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	};

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	};

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	};

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed;
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0;
	    if (isFinite(length)) {
	      length = length | 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	};

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return fromByteArray(buf)
	  } else {
	    return fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    );
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i]);
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  var newBuf;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end);
	    newBuf.__proto__ = Buffer.prototype;
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer(sliceLen, undefined);
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start];
	    }
	  }

	  return newBuf
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset]
	};

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | (this[offset + 1] << 8)
	};

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return (this[offset] << 8) | this[offset + 1]
	};

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	};

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	};

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	};

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | (this[offset + 1] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | (this[offset] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	};

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	};

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, true, 23, 4)
	};

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, false, 23, 4)
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, true, 52, 8)
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, false, 52, 8)
	};

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 1] = (value >>> 8);
	    this[offset] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 3] = (value >>> 24);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4);
	  }
	  write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	};

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8);
	  }
	  write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;
	  var i;

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    );
	  }

	  return len
	};

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start;
	      start = 0;
	      end = this.length;
	    } else if (typeof end === 'string') {
	      encoding = end;
	      end = this.length;
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0);
	      if (code < 256) {
	        val = code;
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0;
	  end = end === undefined ? this.length : end >>> 0;

	  if (!val) val = 0;

	  var i;
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val;
	    }
	  } else {
	    var bytes = internalIsBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString());
	    var len = bytes.length;
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }

	  return this
	};

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray
	}


	function base64ToBytes (str) {
	  return toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i];
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}


	// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	function isBuffer(obj) {
	  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
	}

	function isFastBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
	}

	var ERROR_MSG_INPUT = 'Input must be an string, Buffer or Uint8Array';

	// For convenience, let people hash a string, not just a Uint8Array
	function normalizeInput (input) {
	  var ret;
	  if (input instanceof Uint8Array) {
	    ret = input;
	  } else if (input instanceof Buffer) {
	    ret = new Uint8Array(input);
	  } else if (typeof (input) === 'string') {
	    ret = new Uint8Array(Buffer.from(input, 'utf8'));
	  } else {
	    throw new Error(ERROR_MSG_INPUT)
	  }
	  return ret
	}

	// Converts a Uint8Array to a hexadecimal string
	// For example, toHex([255, 0, 255]) returns "ff00ff"
	function toHex$1 (bytes) {
	  return Array.prototype.map.call(bytes, function (n) {
	    return (n < 16 ? '0' : '') + n.toString(16)
	  }).join('')
	}

	// Converts any value in [0...2^32-1] to an 8-character hex string
	function uint32ToHex (val) {
	  return (0x100000000 + val).toString(16).substring(1)
	}

	// For debugging: prints out hash state in the same format as the RFC
	// sample computation exactly, so that you can diff
	function debugPrint (label, arr, size) {
	  var msg = '\n' + label + ' = ';
	  for (var i = 0; i < arr.length; i += 2) {
	    if (size === 32) {
	      msg += uint32ToHex(arr[i]).toUpperCase();
	      msg += ' ';
	      msg += uint32ToHex(arr[i + 1]).toUpperCase();
	    } else if (size === 64) {
	      msg += uint32ToHex(arr[i + 1]).toUpperCase();
	      msg += uint32ToHex(arr[i]).toUpperCase();
	    } else throw new Error('Invalid size ' + size)
	    if (i % 6 === 4) {
	      msg += '\n' + new Array(label.length + 4).join(' ');
	    } else if (i < arr.length - 2) {
	      msg += ' ';
	    }
	  }
	  console.log(msg);
	}

	// For performance testing: generates N bytes of input, hashes M times
	// Measures and prints MB/second hash performance each time
	function testSpeed (hashFn, N, M) {
	  var startMs = new Date().getTime();

	  var input = new Uint8Array(N);
	  for (var i = 0; i < N; i++) {
	    input[i] = i % 256;
	  }
	  var genMs = new Date().getTime();
	  console.log('Generated random input in ' + (genMs - startMs) + 'ms');
	  startMs = genMs;

	  for (i = 0; i < M; i++) {
	    var hashHex = hashFn(input);
	    var hashMs = new Date().getTime();
	    var ms = hashMs - startMs;
	    startMs = hashMs;
	    console.log('Hashed in ' + ms + 'ms: ' + hashHex.substring(0, 20) + '...');
	    console.log(Math.round(N / (1 << 20) / (ms / 1000) * 100) / 100 + ' MB PER SECOND');
	  }
	}

	var util = {
	  normalizeInput: normalizeInput,
	  toHex: toHex$1,
	  debugPrint: debugPrint,
	  testSpeed: testSpeed
	};

	// Blake2B in pure Javascript
	// Adapted from the reference implementation in RFC7693
	// Ported to Javascript by DC - https://github.com/dcposch



	// 64-bit unsigned addition
	// Sets v[a,a+1] += v[b,b+1]
	// v should be a Uint32Array
	function ADD64AA (v, a, b) {
	  var o0 = v[a] + v[b];
	  var o1 = v[a + 1] + v[b + 1];
	  if (o0 >= 0x100000000) {
	    o1++;
	  }
	  v[a] = o0;
	  v[a + 1] = o1;
	}

	// 64-bit unsigned addition
	// Sets v[a,a+1] += b
	// b0 is the low 32 bits of b, b1 represents the high 32 bits
	function ADD64AC (v, a, b0, b1) {
	  var o0 = v[a] + b0;
	  if (b0 < 0) {
	    o0 += 0x100000000;
	  }
	  var o1 = v[a + 1] + b1;
	  if (o0 >= 0x100000000) {
	    o1++;
	  }
	  v[a] = o0;
	  v[a + 1] = o1;
	}

	// Little-endian byte access
	function B2B_GET32 (arr, i) {
	  return (arr[i] ^
	  (arr[i + 1] << 8) ^
	  (arr[i + 2] << 16) ^
	  (arr[i + 3] << 24))
	}

	// G Mixing function
	// The ROTRs are inlined for speed
	function B2B_G (a, b, c, d, ix, iy) {
	  var x0 = m[ix];
	  var x1 = m[ix + 1];
	  var y0 = m[iy];
	  var y1 = m[iy + 1];

	  ADD64AA(v, a, b); // v[a,a+1] += v[b,b+1] ... in JS we must store a uint64 as two uint32s
	  ADD64AC(v, a, x0, x1); // v[a, a+1] += x ... x0 is the low 32 bits of x, x1 is the high 32 bits

	  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits
	  var xor0 = v[d] ^ v[a];
	  var xor1 = v[d + 1] ^ v[a + 1];
	  v[d] = xor1;
	  v[d + 1] = xor0;

	  ADD64AA(v, c, d);

	  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits
	  xor0 = v[b] ^ v[c];
	  xor1 = v[b + 1] ^ v[c + 1];
	  v[b] = (xor0 >>> 24) ^ (xor1 << 8);
	  v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8);

	  ADD64AA(v, a, b);
	  ADD64AC(v, a, y0, y1);

	  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits
	  xor0 = v[d] ^ v[a];
	  xor1 = v[d + 1] ^ v[a + 1];
	  v[d] = (xor0 >>> 16) ^ (xor1 << 16);
	  v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16);

	  ADD64AA(v, c, d);

	  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits
	  xor0 = v[b] ^ v[c];
	  xor1 = v[b + 1] ^ v[c + 1];
	  v[b] = (xor1 >>> 31) ^ (xor0 << 1);
	  v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1);
	}

	// Initialization Vector
	var BLAKE2B_IV32 = new Uint32Array([
	  0xF3BCC908, 0x6A09E667, 0x84CAA73B, 0xBB67AE85,
	  0xFE94F82B, 0x3C6EF372, 0x5F1D36F1, 0xA54FF53A,
	  0xADE682D1, 0x510E527F, 0x2B3E6C1F, 0x9B05688C,
	  0xFB41BD6B, 0x1F83D9AB, 0x137E2179, 0x5BE0CD19
	]);

	var SIGMA8 = [
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
	  11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
	  7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
	  9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
	  2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
	  12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
	  13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
	  6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
	  10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0,
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3
	];

	// These are offsets into a uint64 buffer.
	// Multiply them all by 2 to make them offsets into a uint32 buffer,
	// because this is Javascript and we don't have uint64s
	var SIGMA82 = new Uint8Array(SIGMA8.map(function (x) { return x * 2 }));

	// Compression function. 'last' flag indicates last block.
	// Note we're representing 16 uint64s as 32 uint32s
	var v = new Uint32Array(32);
	var m = new Uint32Array(32);
	function blake2bCompress (ctx, last) {
	  var i = 0;

	  // init work variables
	  for (i = 0; i < 16; i++) {
	    v[i] = ctx.h[i];
	    v[i + 16] = BLAKE2B_IV32[i];
	  }

	  // low 64 bits of offset
	  v[24] = v[24] ^ ctx.t;
	  v[25] = v[25] ^ (ctx.t / 0x100000000);
	  // high 64 bits not supported, offset may not be higher than 2**53-1

	  // last block flag set ?
	  if (last) {
	    v[28] = ~v[28];
	    v[29] = ~v[29];
	  }

	  // get little-endian words
	  for (i = 0; i < 32; i++) {
	    m[i] = B2B_GET32(ctx.b, 4 * i);
	  }

	  // twelve rounds of mixing
	  // uncomment the DebugPrint calls to log the computation
	  // and match the RFC sample documentation
	  // util.debugPrint('          m[16]', m, 64)
	  for (i = 0; i < 12; i++) {
	    // util.debugPrint('   (i=' + (i < 10 ? ' ' : '') + i + ') v[16]', v, 64)
	    B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1]);
	    B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3]);
	    B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5]);
	    B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7]);
	    B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9]);
	    B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11]);
	    B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13]);
	    B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15]);
	  }
	  // util.debugPrint('   (i=12) v[16]', v, 64)

	  for (i = 0; i < 16; i++) {
	    ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16];
	  }
	  // util.debugPrint('h[8]', ctx.h, 64)
	}

	// Creates a BLAKE2b hashing context
	// Requires an output length between 1 and 64 bytes
	// Takes an optional Uint8Array key
	function blake2bInit (outlen, key) {
	  if (outlen === 0 || outlen > 64) {
	    throw new Error('Illegal output length, expected 0 < length <= 64')
	  }
	  if (key && key.length > 64) {
	    throw new Error('Illegal key, expected Uint8Array with 0 < length <= 64')
	  }

	  // state, 'param block'
	  var ctx = {
	    b: new Uint8Array(128),
	    h: new Uint32Array(16),
	    t: 0, // input count
	    c: 0, // pointer within buffer
	    outlen: outlen // output length in bytes
	  };

	  // initialize hash state
	  for (var i = 0; i < 16; i++) {
	    ctx.h[i] = BLAKE2B_IV32[i];
	  }
	  var keylen = key ? key.length : 0;
	  ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen;

	  // key the hash, if applicable
	  if (key) {
	    blake2bUpdate(ctx, key);
	    // at the end
	    ctx.c = 128;
	  }

	  return ctx
	}

	// Updates a BLAKE2b streaming hash
	// Requires hash context and Uint8Array (byte array)
	function blake2bUpdate (ctx, input) {
	  for (var i = 0; i < input.length; i++) {
	    if (ctx.c === 128) { // buffer full ?
	      ctx.t += ctx.c; // add counters
	      blake2bCompress(ctx, false); // compress (not last)
	      ctx.c = 0; // counter to zero
	    }
	    ctx.b[ctx.c++] = input[i];
	  }
	}

	// Completes a BLAKE2b streaming hash
	// Returns a Uint8Array containing the message digest
	function blake2bFinal (ctx) {
	  ctx.t += ctx.c; // mark last block offset

	  while (ctx.c < 128) { // fill up with zeros
	    ctx.b[ctx.c++] = 0;
	  }
	  blake2bCompress(ctx, true); // final block flag = 1

	  // little endian convert and store
	  var out = new Uint8Array(ctx.outlen);
	  for (var i = 0; i < ctx.outlen; i++) {
	    out[i] = ctx.h[i >> 2] >> (8 * (i & 3));
	  }
	  return out
	}

	// Computes the BLAKE2B hash of a string or byte array, and returns a Uint8Array
	//
	// Returns a n-byte Uint8Array
	//
	// Parameters:
	// - input - the input bytes, as a string, Buffer or Uint8Array
	// - key - optional key Uint8Array, up to 64 bytes
	// - outlen - optional output length in bytes, default 64
	function blake2b (input, key, outlen) {
	  // preprocess inputs
	  outlen = outlen || 64;
	  input = util.normalizeInput(input);

	  // do the math
	  var ctx = blake2bInit(outlen, key);
	  blake2bUpdate(ctx, input);
	  return blake2bFinal(ctx)
	}

	// Computes the BLAKE2B hash of a string or byte array
	//
	// Returns an n-byte hash in hex, all lowercase
	//
	// Parameters:
	// - input - the input bytes, as a string, Buffer, or Uint8Array
	// - key - optional key Uint8Array, up to 64 bytes
	// - outlen - optional output length in bytes, default 64
	function blake2bHex (input, key, outlen) {
	  var output = blake2b(input, key, outlen);
	  return util.toHex(output)
	}

	var blake2b_1 = {
	  blake2b: blake2b,
	  blake2bHex: blake2bHex,
	  blake2bInit: blake2bInit,
	  blake2bUpdate: blake2bUpdate,
	  blake2bFinal: blake2bFinal
	};

	// BLAKE2s hash function in pure Javascript
	// Adapted from the reference implementation in RFC7693
	// Ported to Javascript by DC - https://github.com/dcposch



	// Little-endian byte access.
	// Expects a Uint8Array and an index
	// Returns the little-endian uint32 at v[i..i+3]
	function B2S_GET32 (v, i) {
	  return v[i] ^ (v[i + 1] << 8) ^ (v[i + 2] << 16) ^ (v[i + 3] << 24)
	}

	// Mixing function G.
	function B2S_G (a, b, c, d, x, y) {
	  v$1[a] = v$1[a] + v$1[b] + x;
	  v$1[d] = ROTR32(v$1[d] ^ v$1[a], 16);
	  v$1[c] = v$1[c] + v$1[d];
	  v$1[b] = ROTR32(v$1[b] ^ v$1[c], 12);
	  v$1[a] = v$1[a] + v$1[b] + y;
	  v$1[d] = ROTR32(v$1[d] ^ v$1[a], 8);
	  v$1[c] = v$1[c] + v$1[d];
	  v$1[b] = ROTR32(v$1[b] ^ v$1[c], 7);
	}

	// 32-bit right rotation
	// x should be a uint32
	// y must be between 1 and 31, inclusive
	function ROTR32 (x, y) {
	  return (x >>> y) ^ (x << (32 - y))
	}

	// Initialization Vector.
	var BLAKE2S_IV = new Uint32Array([
	  0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
	  0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19]);

	var SIGMA = new Uint8Array([
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
	  11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
	  7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
	  9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
	  2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
	  12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
	  13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
	  6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
	  10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0]);

	// Compression function. "last" flag indicates last block
	var v$1 = new Uint32Array(16);
	var m$1 = new Uint32Array(16);
	function blake2sCompress (ctx, last) {
	  var i = 0;
	  for (i = 0; i < 8; i++) { // init work variables
	    v$1[i] = ctx.h[i];
	    v$1[i + 8] = BLAKE2S_IV[i];
	  }

	  v$1[12] ^= ctx.t; // low 32 bits of offset
	  v$1[13] ^= (ctx.t / 0x100000000); // high 32 bits
	  if (last) { // last block flag set ?
	    v$1[14] = ~v$1[14];
	  }

	  for (i = 0; i < 16; i++) { // get little-endian words
	    m$1[i] = B2S_GET32(ctx.b, 4 * i);
	  }

	  // ten rounds of mixing
	  // uncomment the DebugPrint calls to log the computation
	  // and match the RFC sample documentation
	  // util.debugPrint('          m[16]', m, 32)
	  for (i = 0; i < 10; i++) {
	    // util.debugPrint('   (i=' + i + ')  v[16]', v, 32)
	    B2S_G(0, 4, 8, 12, m$1[SIGMA[i * 16 + 0]], m$1[SIGMA[i * 16 + 1]]);
	    B2S_G(1, 5, 9, 13, m$1[SIGMA[i * 16 + 2]], m$1[SIGMA[i * 16 + 3]]);
	    B2S_G(2, 6, 10, 14, m$1[SIGMA[i * 16 + 4]], m$1[SIGMA[i * 16 + 5]]);
	    B2S_G(3, 7, 11, 15, m$1[SIGMA[i * 16 + 6]], m$1[SIGMA[i * 16 + 7]]);
	    B2S_G(0, 5, 10, 15, m$1[SIGMA[i * 16 + 8]], m$1[SIGMA[i * 16 + 9]]);
	    B2S_G(1, 6, 11, 12, m$1[SIGMA[i * 16 + 10]], m$1[SIGMA[i * 16 + 11]]);
	    B2S_G(2, 7, 8, 13, m$1[SIGMA[i * 16 + 12]], m$1[SIGMA[i * 16 + 13]]);
	    B2S_G(3, 4, 9, 14, m$1[SIGMA[i * 16 + 14]], m$1[SIGMA[i * 16 + 15]]);
	  }
	  // util.debugPrint('   (i=10) v[16]', v, 32)

	  for (i = 0; i < 8; i++) {
	    ctx.h[i] ^= v$1[i] ^ v$1[i + 8];
	  }
	  // util.debugPrint('h[8]', ctx.h, 32)
	}

	// Creates a BLAKE2s hashing context
	// Requires an output length between 1 and 32 bytes
	// Takes an optional Uint8Array key
	function blake2sInit (outlen, key) {
	  if (!(outlen > 0 && outlen <= 32)) {
	    throw new Error('Incorrect output length, should be in [1, 32]')
	  }
	  var keylen = key ? key.length : 0;
	  if (key && !(keylen > 0 && keylen <= 32)) {
	    throw new Error('Incorrect key length, should be in [1, 32]')
	  }

	  var ctx = {
	    h: new Uint32Array(BLAKE2S_IV), // hash state
	    b: new Uint32Array(64), // input block
	    c: 0, // pointer within block
	    t: 0, // input count
	    outlen: outlen // output length in bytes
	  };
	  ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen;

	  if (keylen > 0) {
	    blake2sUpdate(ctx, key);
	    ctx.c = 64; // at the end
	  }

	  return ctx
	}

	// Updates a BLAKE2s streaming hash
	// Requires hash context and Uint8Array (byte array)
	function blake2sUpdate (ctx, input) {
	  for (var i = 0; i < input.length; i++) {
	    if (ctx.c === 64) { // buffer full ?
	      ctx.t += ctx.c; // add counters
	      blake2sCompress(ctx, false); // compress (not last)
	      ctx.c = 0; // counter to zero
	    }
	    ctx.b[ctx.c++] = input[i];
	  }
	}

	// Completes a BLAKE2s streaming hash
	// Returns a Uint8Array containing the message digest
	function blake2sFinal (ctx) {
	  ctx.t += ctx.c; // mark last block offset
	  while (ctx.c < 64) { // fill up with zeros
	    ctx.b[ctx.c++] = 0;
	  }
	  blake2sCompress(ctx, true); // final block flag = 1

	  // little endian convert and store
	  var out = new Uint8Array(ctx.outlen);
	  for (var i = 0; i < ctx.outlen; i++) {
	    out[i] = (ctx.h[i >> 2] >> (8 * (i & 3))) & 0xFF;
	  }
	  return out
	}

	// Computes the BLAKE2S hash of a string or byte array, and returns a Uint8Array
	//
	// Returns a n-byte Uint8Array
	//
	// Parameters:
	// - input - the input bytes, as a string, Buffer, or Uint8Array
	// - key - optional key Uint8Array, up to 32 bytes
	// - outlen - optional output length in bytes, default 64
	function blake2s (input, key, outlen) {
	  // preprocess inputs
	  outlen = outlen || 32;
	  input = util.normalizeInput(input);

	  // do the math
	  var ctx = blake2sInit(outlen, key);
	  blake2sUpdate(ctx, input);
	  return blake2sFinal(ctx)
	}

	// Computes the BLAKE2S hash of a string or byte array
	//
	// Returns an n-byte hash in hex, all lowercase
	//
	// Parameters:
	// - input - the input bytes, as a string, Buffer, or Uint8Array
	// - key - optional key Uint8Array, up to 32 bytes
	// - outlen - optional output length in bytes, default 64
	function blake2sHex (input, key, outlen) {
	  var output = blake2s(input, key, outlen);
	  return util.toHex(output)
	}

	var blake2s_1 = {
	  blake2s: blake2s,
	  blake2sHex: blake2sHex,
	  blake2sInit: blake2sInit,
	  blake2sUpdate: blake2sUpdate,
	  blake2sFinal: blake2sFinal
	};

	var blakejs = {
	  blake2b: blake2b_1.blake2b,
	  blake2bHex: blake2b_1.blake2bHex,
	  blake2bInit: blake2b_1.blake2bInit,
	  blake2bUpdate: blake2b_1.blake2bUpdate,
	  blake2bFinal: blake2b_1.blake2bFinal,
	  blake2s: blake2s_1.blake2s,
	  blake2sHex: blake2s_1.blake2sHex,
	  blake2sInit: blake2s_1.blake2sInit,
	  blake2sUpdate: blake2s_1.blake2sUpdate,
	  blake2sFinal: blake2s_1.blake2sFinal
	};

	var blake2b$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Blake2b = void 0;

	/**
	 * Class to help with Blake2B Signature scheme.
	 */
	class Blake2b {
	    /**
	     * Perform Sum 256 on the data.
	     * @param data The data to operate on.
	     * @returns The sum 256 of the data.
	     */
	    static sum256(data) {
	        return Buffer.from(blakejs.blake2b(data, undefined, Blake2b.SIZE_256));
	    }
	}
	exports.Blake2b = Blake2b;
	/**
	 * Blake2b 256.
	 */
	Blake2b.SIZE_256 = 32;

	});

	var parser = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseMessage = void 0;






	/**
	 * Parse the trytes back to the original message.
	 * @param payload The trytes to decode.
	 * @param root The root for the message.
	 * @param channelKey The key used to encode the data.
	 * @returns The decoded message.
	 */
	function parseMessage(payload, root, channelKey) {
	    const payloadTrits = trytesHelper.TrytesHelper.toTrits(payload);
	    const rootTrits = trytesHelper.TrytesHelper.toTrits(root);
	    const channelKeyTrits = trytesHelper.TrytesHelper.toTrits(channelKey !== null && channelKey !== void 0 ? channelKey : "9".repeat(81));
	    // Get data positions in payload
	    const indexData = pascal.pascalDecode(payloadTrits);
	    const index = indexData.value;
	    const messageData = pascal.pascalDecode(payloadTrits.slice(indexData.end));
	    const messageLength = messageData.value;
	    const nextRootStart = indexData.end + messageData.end;
	    const messageStart = nextRootStart + curl.Curl.HASH_LENGTH;
	    const messageEnd = messageStart + messageLength;
	    // Hash the key, root and payload
	    const sponge = new curl.Curl(27);
	    sponge.absorb(channelKeyTrits, 0, channelKeyTrits.length);
	    sponge.absorb(rootTrits, 0, rootTrits.length);
	    sponge.absorb(payloadTrits, 0, nextRootStart);
	    // Decrypt the metadata
	    const nextRoot = mask_1.unmask(payloadTrits.slice(nextRootStart, nextRootStart + curl.Curl.HASH_LENGTH), sponge);
	    const message = mask_1.unmask(payloadTrits.slice(messageStart, messageStart + messageLength), sponge);
	    const nonce = mask_1.unmask(payloadTrits.slice(messageEnd, messageEnd + (curl.Curl.HASH_LENGTH / 3)), sponge);
	    const hmac = sponge.rate();
	    // Check the security level is valid
	    const securityLevel = issP27.checksumSecurity(hmac);
	    if (securityLevel === 0) {
	        throw new Error("Message Hash did not have a hamming weight of zero, security level is invalid");
	    }
	    // Decrypt the rest of the payload
	    const decryptedMetadata = mask_1.unmask(payloadTrits.slice(messageEnd + nonce.length), sponge);
	    sponge.reset();
	    // Get the signature and absorb its digest
	    const signature = decryptedMetadata.slice(0, securityLevel * issP27.PRIVATE_KEY_FRAGMENT_LENGTH);
	    const digest = issP27.digestFromSignature(hmac, signature);
	    sponge.absorb(digest, 0, digest.length);
	    // Get the sibling information and validate it
	    const siblingsCountData = pascal.pascalDecode(decryptedMetadata.slice(securityLevel * issP27.PRIVATE_KEY_FRAGMENT_LENGTH));
	    const siblingsCount = siblingsCountData.value;
	    let recalculatedRoot = sponge.rate();
	    if (siblingsCount !== 0) {
	        const siblingsStart = (securityLevel * issP27.PRIVATE_KEY_FRAGMENT_LENGTH) + siblingsCountData.end;
	        const siblings = decryptedMetadata.slice(siblingsStart, siblingsStart + (siblingsCount * curl.Curl.HASH_LENGTH));
	        recalculatedRoot = merkleTree.MerkleTree.root(recalculatedRoot, siblings, index);
	    }
	    // Make sure the root matches the calculated one
	    if (trytesHelper.TrytesHelper.fromTrits(recalculatedRoot) !== root) {
	        throw new Error("Signature did not match expected root");
	    }
	    return {
	        nextRoot: trytesHelper.TrytesHelper.fromTrits(nextRoot),
	        message: trytesHelper.TrytesHelper.fromTrits(message)
	    };
	}
	exports.parseMessage = parseMessage;

	});

	var client = createCommonjsModule(function (module, exports) {
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decodeMessages = exports.mamFetchAll = exports.decodeAddress = exports.mamFetch = exports.mamAttach = void 0;





	/**
	 * Attach the mam message to the tangle.
	 * @param client The client to use for sending.
	 * @param mamMessage The message to attach.
	 * @param tag Optional tag for the transactions.
	 * @returns The transactions that were attached.
	 */
	function mamAttach(client, mamMessage, tag) {
	    return __awaiter(this, void 0, void 0, function* () {
	        if (tag !== undefined && typeof tag !== "string") {
	            throw new Error("MWM and depth are no longer needed when calling mamAttach");
	        }
	        const tagLength = tag ? tag.length : 0;
	        const data = Buffer.alloc(1 + tagLength + mamMessage.payload.length);
	        data.writeUInt8(tagLength, 0);
	        if (tag) {
	            data.write(tag, 1, "ascii");
	        }
	        data.write(mamMessage.payload, 1 + tagLength, "ascii");
	        const indexationPayload = {
	            type: 2,
	            index: blake2b$1.Blake2b.sum256(Buffer.from(mamMessage.address)).toString("hex"),
	            data: data.toString("hex")
	        };
	        const tips = yield client.tips();
	        const message = {
	            version: 1,
	            parent1MessageId: tips.tip1MessageId,
	            parent2MessageId: tips.tip2MessageId,
	            payload: indexationPayload,
	            nonce: 0
	        };
	        const messageId = yield client.messageSubmit(message);
	        return {
	            message,
	            messageId
	        };
	    });
	}
	exports.mamAttach = mamAttach;
	/**
	 * Fetch a mam message from a channel.
	 * @param client The client to use for fetching.
	 * @param root The root within the mam channel to fetch the message.
	 * @param mode The mode to use for fetching.
	 * @param sideKey The sideKey if mode is restricted.
	 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
	 * throws exception if transactions found on address are invalid.
	 */
	function mamFetch(client, root, mode, sideKey) {
	    return __awaiter(this, void 0, void 0, function* () {
	        guards.validateModeKey(mode, sideKey);
	        const messageAddress = decodeAddress(root, mode);
	        const messagesResponse = yield client.messagesFind(blake2b$1.Blake2b.sum256(Buffer.from(messageAddress)).toString("hex"));
	        const messages = [];
	        for (const messageId of messagesResponse.messageIds) {
	            const message = yield client.message(messageId);
	            if (message) {
	                messages.push(message);
	            }
	        }
	        return decodeMessages(messages, root, sideKey);
	    });
	}
	exports.mamFetch = mamFetch;
	/**
	 * Decodes the root to its associated address.
	 * @param root The root to device.
	 * @param mode The mode for the channel.
	 * @returns The decoded address.
	 */
	function decodeAddress(root, mode) {
	    return mode === "public"
	        ? root
	        : trytesHelper.TrytesHelper.fromTrits(mask_1.maskHash(trytesHelper.TrytesHelper.toTrits(root)));
	}
	exports.decodeAddress = decodeAddress;
	/**
	 * Fetch all the mam message from a channel.
	 * If limit is undefined we use Number.MAX_VALUE, this could potentially take a long time to complete.
	 * It is preferable to specify the limit so you read the data in chunks, then if you read and get the
	 * same amount of messages as your limit you should probably read again.
	 * @param client The client to use for fetching.
	 * @param root The root within the mam channel to fetch the message.
	 * @param mode The mode to use for fetching.
	 * @param sideKey The sideKey if mode is restricted.
	 * @param limit Limit the number of messages retrieved.
	 * @returns The array of retrieved messages.
	 */
	function mamFetchAll(client, root, mode, sideKey, limit) {
	    return __awaiter(this, void 0, void 0, function* () {
	        guards.validateModeKey(mode, sideKey);
	        const localLimit = limit === undefined ? Number.MAX_VALUE : limit;
	        const messages = [];
	        let fetchRoot = root;
	        do {
	            const fetched = yield mamFetch(client, fetchRoot, mode, sideKey);
	            if (fetched) {
	                messages.push(fetched);
	                fetchRoot = fetched.nextRoot;
	            }
	            else {
	                fetchRoot = undefined;
	            }
	        } while (fetchRoot && messages.length < localLimit);
	        return messages;
	    });
	}
	exports.mamFetchAll = mamFetchAll;
	/**
	 * Decode messages from an address to try and find a MAM message.
	 * @param messages The objects returned from the fetch.
	 * @param root The root within the mam channel to fetch the message.
	 * @param sideKey The sideKey if mode is restricted.
	 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
	 * throws exception if transactions found on address are invalid.
	 */
	function decodeMessages(messages, root, sideKey) {
	    return __awaiter(this, void 0, void 0, function* () {
	        if (!messages || messages.length === 0) {
	            return;
	        }
	        for (const message of messages) {
	            // We only use indexation payload for storing mam messages
	            if (message.payload && message.payload.type === 2) {
	                const data = Buffer.from(message.payload.data, "hex");
	                // We have a minimum size for the message payload
	                if (data.length > 100) {
	                    const tagLength = data.readUInt8(0);
	                    if (tagLength === 0 || tagLength > 27) {
	                        return;
	                    }
	                    const tag = data.slice(1, 1 + tagLength).toString();
	                    const msg = data.slice(1 + tagLength).toString();
	                    try {
	                        const parsed = parser.parseMessage(msg, root, sideKey);
	                        return Object.assign(Object.assign({ root }, parsed), { tag });
	                    }
	                    catch (_a) {
	                    }
	                }
	            }
	        }
	    });
	}
	exports.decodeMessages = decodeMessages;

	});

	var IMamChannelState = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IMamFetchedMessage = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IMamMessage = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var mamMode = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var es = createCommonjsModule(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SingleNodeClient = void 0;

	Object.defineProperty(exports, "SingleNodeClient", { enumerable: true, get: function () { return iota2_browser.SingleNodeClient; } });
	__exportStar(channel, exports);
	__exportStar(client, exports);
	__exportStar(parser, exports);
	__exportStar(IMamChannelState, exports);
	__exportStar(IMamFetchedMessage, exports);
	__exportStar(IMamMessage, exports);
	__exportStar(mamMode, exports);
	__exportStar(trytesHelper, exports);

	});

	var index = /*@__PURE__*/getDefaultExportFromCjs(es);

	return index;

})));
