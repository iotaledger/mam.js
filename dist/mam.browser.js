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

		var clientError = createCommonjsModule(function (module, exports) {
		var __extends = (commonjsGlobal$1 && commonjsGlobal$1.__extends) || (function () {
		    var extendStatics = function (d, b) {
		        extendStatics = Object.setPrototypeOf ||
		            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
		        return extendStatics(d, b);
		    };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.ClientError = void 0;
		/**
		 * Class to handle http errors.
		 */
		var ClientError = /** @class */ (function (_super) {
		    __extends(ClientError, _super);
		    /**
		     * Create a new instance of ClientError.
		     * @param message The message for the error.
		     * @param route The route the request was made to.
		     * @param httpStatus The http status code.
		     * @param code The code in the payload.
		     */
		    function ClientError(message, route, httpStatus, code) {
		        var _this = _super.call(this, message) || this;
		        _this.route = route;
		        _this.httpStatus = httpStatus;
		        _this.code = code;
		        return _this;
		    }
		    return ClientError;
		}(Error));
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

		var IGossipMetrics = createCommonjsModule(function (module, exports) {
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

		var IPeer = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var IResponse = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var ITips = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });

		});

		var _nodeResolve_empty = {};

		var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
			__proto__: null,
			'default': _nodeResolve_empty
		});

		var require$$0 = /*@__PURE__*/getAugmentedNamespace(_nodeResolve_empty$1);

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
		    crypto = require$$0;
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

		var arrayHelper = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.ArrayHelper = void 0;
		/* eslint-disable no-bitwise */
		/**
		 * Array helper methods.
		 */
		var ArrayHelper = /** @class */ (function () {
		    function ArrayHelper() {
		    }
		    /**
		     * Ar the two array equals.
		     * @param array1 The first array.
		     * @param array2 The second arry.
		     * @returns True if the arrays are equal.
		     */
		    ArrayHelper.equal = function (array1, array2) {
		        if (!array1 || !array2 || array1.length !== array2.length) {
		            return false;
		        }
		        for (var i = 0; i < array1.length; i++) {
		            if (array1[i] !== array2[i]) {
		                return false;
		            }
		        }
		        return true;
		    };
		    return ArrayHelper;
		}());
		exports.ArrayHelper = ArrayHelper;

		});

		var blake2b = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Blake2b = void 0;
		/* eslint-disable no-bitwise */
		/**
		 * Class to help with Blake2B Signature scheme.
		 * TypeScript conversion from https://github.com/dcposch/blakejs
		 */
		var Blake2b = /** @class */ (function () {
		    /**
		     * Create a new instance of Blake2b.
		     * @internal
		     */
		    function Blake2b() {
		        this._v = new Uint32Array(32);
		        this._m = new Uint32Array(32);
		    }
		    /**
		     * Perform Sum 256 on the data.
		     * @param data The data to operate on.
		     * @returns The sum 256 of the data.
		     */
		    Blake2b.sum256 = function (data) {
		        var b2b = new Blake2b();
		        var ctx = b2b.init(Blake2b.SIZE_256);
		        b2b.update(ctx, data);
		        return b2b.final(ctx);
		    };
		    /**
		     * Perform Sum 512 on the data.
		     * @param data The data to operate on.
		     * @returns The sum 512 of the data.
		     */
		    Blake2b.sum512 = function (data) {
		        var b2b = new Blake2b();
		        var ctx = b2b.init(Blake2b.SIZE_512);
		        b2b.update(ctx, data);
		        return b2b.final(ctx);
		    };
		    /**
		     * Compression.
		     * Note we're representing 16 uint64s as 32 uint32s
		     * @param ctx The context.
		     * @param ctx.b Array.
		     * @param ctx.h Array.
		     * @param ctx.t Number.
		     * @param ctx.c Number.
		     * @param ctx.outlen The output length.
		     * @param last Is this the last block.
		     * @internal
		     */
		    Blake2b.prototype.compress = function (ctx, last) {
		        var i = 0;
		        // init work variables
		        for (i = 0; i < 16; i++) {
		            this._v[i] = ctx.h[i];
		            this._v[i + 16] = Blake2b.BLAKE2B_IV32[i];
		        }
		        // low 64 bits of offset
		        this._v[24] ^= ctx.t;
		        this._v[25] ^= ctx.t / 0x100000000;
		        // high 64 bits not supported, offset may not be higher than 2**53-1
		        // last block flag set ?
		        if (last) {
		            this._v[28] = ~this._v[28];
		            this._v[29] = ~this._v[29];
		        }
		        // get little-endian words
		        for (i = 0; i < 32; i++) {
		            this._m[i] = this.b2bGet32(ctx.b, 4 * i);
		        }
		        // twelve rounds of mixing
		        for (i = 0; i < 12; i++) {
		            this.b2bG(0, 8, 16, 24, Blake2b.SIGMA82[(i * 16) + 0], Blake2b.SIGMA82[(i * 16) + 1]);
		            this.b2bG(2, 10, 18, 26, Blake2b.SIGMA82[(i * 16) + 2], Blake2b.SIGMA82[(i * 16) + 3]);
		            this.b2bG(4, 12, 20, 28, Blake2b.SIGMA82[(i * 16) + 4], Blake2b.SIGMA82[(i * 16) + 5]);
		            this.b2bG(6, 14, 22, 30, Blake2b.SIGMA82[(i * 16) + 6], Blake2b.SIGMA82[(i * 16) + 7]);
		            this.b2bG(0, 10, 20, 30, Blake2b.SIGMA82[(i * 16) + 8], Blake2b.SIGMA82[(i * 16) + 9]);
		            this.b2bG(2, 12, 22, 24, Blake2b.SIGMA82[(i * 16) + 10], Blake2b.SIGMA82[(i * 16) + 11]);
		            this.b2bG(4, 14, 16, 26, Blake2b.SIGMA82[(i * 16) + 12], Blake2b.SIGMA82[(i * 16) + 13]);
		            this.b2bG(6, 8, 18, 28, Blake2b.SIGMA82[(i * 16) + 14], Blake2b.SIGMA82[(i * 16) + 15]);
		        }
		        for (i = 0; i < 16; i++) {
		            ctx.h[i] = ctx.h[i] ^ this._v[i] ^ this._v[i + 16];
		        }
		    };
		    /**
		     * Creates a BLAKE2b hashing context.
		     * @param outlen Output length between 1 and 64 bytes.
		     * @param key Optional key.
		     * @returns The initialized context.
		     * @internal
		     */
		    Blake2b.prototype.init = function (outlen, key) {
		        if (outlen <= 0 || outlen > 64) {
		            throw new Error("Illegal output length, expected 0 < length <= 64");
		        }
		        if (key && key.length > 64) {
		            throw new Error("Illegal key, expected Uint8Array with 0 < length <= 64");
		        }
		        // state, 'param block'
		        var ctx = {
		            b: new Uint8Array(128),
		            h: new Uint32Array(16),
		            t: 0,
		            c: 0,
		            outlen: outlen // output length in bytes
		        };
		        // initialize hash state
		        for (var i = 0; i < 16; i++) {
		            ctx.h[i] = Blake2b.BLAKE2B_IV32[i];
		        }
		        var keylen = key ? key.length : 0;
		        ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen;
		        // key the hash, if applicable
		        if (key) {
		            this.update(ctx, key);
		            // at the end
		            ctx.c = 128;
		        }
		        return ctx;
		    };
		    /**
		     * Updates a BLAKE2b streaming hash.
		     * @param ctx The context.
		     * @param ctx.b Array.
		     * @param ctx.h Array.
		     * @param ctx.t Number.
		     * @param ctx.c Number.
		     * @param ctx.outlen The output length.
		     * @param input The data to hash.
		     * @internal
		     */
		    Blake2b.prototype.update = function (ctx, input) {
		        for (var i = 0; i < input.length; i++) {
		            if (ctx.c === 128) { // buffer full ?
		                ctx.t += ctx.c; // add counters
		                this.compress(ctx, false); // compress (not last)
		                ctx.c = 0; // counter to zero
		            }
		            ctx.b[ctx.c++] = input[i];
		        }
		    };
		    /**
		     * Completes a BLAKE2b streaming hash.
		     * @param ctx The context.
		     * @param ctx.b Array.
		     * @param ctx.h Array.
		     * @param ctx.t Number.
		     * @param ctx.c Number.
		     * @param ctx.outlen The output length.
		     * @returns The final data.
		     * @internal
		     */
		    Blake2b.prototype.final = function (ctx) {
		        ctx.t += ctx.c; // mark last block offset
		        while (ctx.c < 128) { // fill up with zeros
		            ctx.b[ctx.c++] = 0;
		        }
		        this.compress(ctx, true); // final block flag = 1
		        // little endian convert and store
		        var out = new Uint8Array(ctx.outlen);
		        for (var i = 0; i < ctx.outlen; i++) {
		            out[i] = ctx.h[i >> 2] >> (8 * (i & 3));
		        }
		        return out;
		    };
		    /**
		     * 64-bit unsigned addition
		     * Sets v[a,a+1] += v[b,b+1]
		     * @param v The array.
		     * @param a The a index.
		     * @param b The b index.
		     * @internal
		     */
		    Blake2b.prototype.add64AA = function (v, a, b) {
		        var o0 = v[a] + v[b];
		        var o1 = v[a + 1] + v[b + 1];
		        if (o0 >= 0x100000000) {
		            o1++;
		        }
		        v[a] = o0;
		        v[a + 1] = o1;
		    };
		    /**
		     * 64-bit unsigned addition.
		     * Sets v[a,a+1] += b.
		     * @param v The array of data to work on.
		     * @param a The index to use.
		     * @param b0 Is the low 32 bits.
		     * @param b1 Represents the high 32 bits.
		     * @internal
		     */
		    Blake2b.prototype.add64AC = function (v, a, b0, b1) {
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
		    };
		    /**
		     * Little endian read byte 32;
		     * @param arr The array to read from .
		     * @param i The index to start reading from.
		     * @returns The value.
		     * @internal
		     */
		    Blake2b.prototype.b2bGet32 = function (arr, i) {
		        return (arr[i] ^
		            (arr[i + 1] << 8) ^
		            (arr[i + 2] << 16) ^
		            (arr[i + 3] << 24));
		    };
		    /**
		     * G Mixing function.
		     * The ROTRs are inlined for speed.
		     * @param a The a value.
		     * @param b The b value.
		     * @param c The c value.
		     * @param d The d value.
		     * @param ix The ix value.
		     * @param iy The iy value.
		     * @internal
		     */
		    Blake2b.prototype.b2bG = function (a, b, c, d, ix, iy) {
		        var x0 = this._m[ix];
		        var x1 = this._m[ix + 1];
		        var y0 = this._m[iy];
		        var y1 = this._m[iy + 1];
		        this.add64AA(this._v, a, b); // v[a,a+1] += v[b,b+1] ... in JS we must store a uint64 as two uint32s
		        this.add64AC(this._v, a, x0, x1); // v[a, a+1] += x ... x0 is the low 32 bits of x, x1 is the high 32 bits
		        // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits
		        var xor0 = this._v[d] ^ this._v[a];
		        var xor1 = this._v[d + 1] ^ this._v[a + 1];
		        this._v[d] = xor1;
		        this._v[d + 1] = xor0;
		        this.add64AA(this._v, c, d);
		        // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits
		        xor0 = this._v[b] ^ this._v[c];
		        xor1 = this._v[b + 1] ^ this._v[c + 1];
		        this._v[b] = (xor0 >>> 24) ^ (xor1 << 8);
		        this._v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8);
		        this.add64AA(this._v, a, b);
		        this.add64AC(this._v, a, y0, y1);
		        // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits
		        xor0 = this._v[d] ^ this._v[a];
		        xor1 = this._v[d + 1] ^ this._v[a + 1];
		        this._v[d] = (xor0 >>> 16) ^ (xor1 << 16);
		        this._v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16);
		        this.add64AA(this._v, c, d);
		        // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits
		        xor0 = this._v[b] ^ this._v[c];
		        xor1 = this._v[b + 1] ^ this._v[c + 1];
		        this._v[b] = (xor1 >>> 31) ^ (xor0 << 1);
		        this._v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1);
		    };
		    /**
		     * Blake2b 256.
		     * @internal
		     */
		    Blake2b.SIZE_256 = 32;
		    /**
		     * Blake2b 512.
		     * @internal
		     */
		    Blake2b.SIZE_512 = 64;
		    /**
		     * Initialization Vector.
		     * @internal
		     */
		    Blake2b.BLAKE2B_IV32 = new Uint32Array([
		        0xF3BCC908, 0x6A09E667, 0x84CAA73B, 0xBB67AE85,
		        0xFE94F82B, 0x3C6EF372, 0x5F1D36F1, 0xA54FF53A,
		        0xADE682D1, 0x510E527F, 0x2B3E6C1F, 0x9B05688C,
		        0xFB41BD6B, 0x1F83D9AB, 0x137E2179, 0x5BE0CD19
		    ]);
		    /**
		     * Initialization Vector.
		     * @internal
		     */
		    Blake2b.SIGMA8 = [
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
		    /**
		     * These are offsets into a uint64 buffer.
		     * Multiply them all by 2 to make them offsets into a uint32 buffer,
		     * because this is Javascript and we don't have uint64s
		     * @internal
		     */
		    Blake2b.SIGMA82 = new Uint8Array(Blake2b.SIGMA8.map(function (x) { return x * 2; }));
		    return Blake2b;
		}());
		exports.Blake2b = Blake2b;

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
		var nacl = __importStar(naclFast);


		/**
		 * Class to help with Ed25519 Signature scheme.
		 */
		var Ed25519 = /** @class */ (function () {
		    function Ed25519() {
		    }
		    /**
		     * Privately sign the data.
		     * @param privateKey The private key to sign with.
		     * @param data The data to sign.
		     * @returns The signature.
		     */
		    Ed25519.signData = function (privateKey, data) {
		        return nacl.sign.detached(data, privateKey);
		    };
		    /**
		     * Use the public key and signature to validate the data.
		     * @param publicKey The public key to verify with.
		     * @param signature The signature to verify.
		     * @param data The data to verify.
		     * @returns True if the data and address is verified.
		     */
		    Ed25519.verifyData = function (publicKey, signature, data) {
		        return nacl.sign.detached.verify(data, signature, publicKey);
		    };
		    /**
		     * Convert the public key to an address.
		     * @param publicKey The public key to convert.
		     * @returns The address.
		     */
		    Ed25519.publicKeyToAddress = function (publicKey) {
		        return blake2b.Blake2b.sum256(publicKey);
		    };
		    /**
		     * Use the public key to validate the address.
		     * @param publicKey The public key to verify with.
		     * @param address The address to verify.
		     * @returns True if the data and address is verified.
		     */
		    Ed25519.verifyAddress = function (publicKey, address) {
		        return arrayHelper.ArrayHelper.equal(Ed25519.publicKeyToAddress(publicKey), address);
		    };
		    /**
		     * Public Key size.
		     * @internal
		     */
		    Ed25519.PUBLIC_KEY_SIZE = 32;
		    /**
		     * Signature size for signing scheme.
		     * @internal
		     */
		    Ed25519.SIGNATURE_SIZE = 64;
		    /**
		     * Address size.
		     * @internal
		     */
		    Ed25519.ADDRESS_LENGTH = blake2b.Blake2b.SIZE_256;
		    return Ed25519;
		}());
		exports.Ed25519 = Ed25519;

		});

		var common = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.isHex = exports.ARRAY_LENGTH = exports.STRING_LENGTH = exports.SMALL_TYPE_LENGTH = exports.TYPE_LENGTH = exports.TRANSACTION_ID_LENGTH = exports.MESSAGE_ID_LENGTH = exports.UINT64_SIZE = exports.UINT32_SIZE = exports.UINT16_SIZE = exports.BYTE_SIZE = void 0;

		exports.BYTE_SIZE = 1;
		exports.UINT16_SIZE = 2;
		exports.UINT32_SIZE = 4;
		exports.UINT64_SIZE = 8;
		exports.MESSAGE_ID_LENGTH = blake2b.Blake2b.SIZE_256;
		exports.TRANSACTION_ID_LENGTH = blake2b.Blake2b.SIZE_256;
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
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeAddress(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_ADDRESS_LENGTH)) {
		        throw new Error("Address data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_ADDRESS_LENGTH);
		    }
		    var type = readStream.readByte("address.type", false);
		    var address;
		    if (type === 1) {
		        address = deserializeEd25519Address(readStream);
		    }
		    else {
		        throw new Error("Unrecognized address type " + type);
		    }
		    return address;
		}
		exports.deserializeAddress = deserializeAddress;
		/**
		 * Serialize the address to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeAddress(writeStream, object) {
		    if (object.type === 1) {
		        serializeEd25519Address(writeStream, object);
		    }
		    else {
		        throw new Error("Unrecognized address type " + object.type);
		    }
		}
		exports.serializeAddress = serializeAddress;
		/**
		 * Deserialize the Ed25519 address from binary.
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeEd25519Address(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_ED25519_ADDRESS_LENGTH)) {
		        throw new Error("Ed25519 address data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_ED25519_ADDRESS_LENGTH);
		    }
		    var type = readStream.readByte("ed25519Address.type");
		    if (type !== 1) {
		        throw new Error("Type mismatch in ed25519Address " + type);
		    }
		    var address = readStream.readFixedHex("ed25519Address.address", ed25519.Ed25519.ADDRESS_LENGTH);
		    return {
		        type: type,
		        address: address
		    };
		}
		exports.deserializeEd25519Address = deserializeEd25519Address;
		/**
		 * Serialize the ed25519 address to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeEd25519Address(writeStream, object) {
		    writeStream.writeByte("ed25519Address.type", object.type);
		    writeStream.writeFixedHex("ed25519Address.address", ed25519.Ed25519.ADDRESS_LENGTH, object.address);
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
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeInputs(readStream) {
		    var numInputs = readStream.readUInt16("inputs.numInputs");
		    var inputs = [];
		    for (var i = 0; i < numInputs; i++) {
		        inputs.push(deserializeInput(readStream));
		    }
		    return inputs;
		}
		exports.deserializeInputs = deserializeInputs;
		/**
		 * Serialize the inputs to binary.
		 * @param writeStream The stream to write the data to.
		 * @param objects The objects to serialize.
		 */
		function serializeInputs(writeStream, objects) {
		    writeStream.writeUInt16("inputs.numInputs", objects.length);
		    for (var i = 0; i < objects.length; i++) {
		        serializeInput(writeStream, objects[i]);
		    }
		}
		exports.serializeInputs = serializeInputs;
		/**
		 * Deserialize the input from binary.
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeInput(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_INPUT_LENGTH)) {
		        throw new Error("Input data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_INPUT_LENGTH);
		    }
		    var type = readStream.readByte("input.type", false);
		    var input;
		    if (type === 0) {
		        input = deserializeUTXOInput(readStream);
		    }
		    else {
		        throw new Error("Unrecognized input type " + type);
		    }
		    return input;
		}
		exports.deserializeInput = deserializeInput;
		/**
		 * Serialize the input to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeInput(writeStream, object) {
		    if (object.type === 0) {
		        serializeUTXOInput(writeStream, object);
		    }
		    else {
		        throw new Error("Unrecognized input type " + object.type);
		    }
		}
		exports.serializeInput = serializeInput;
		/**
		 * Deserialize the utxo input from binary.
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeUTXOInput(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_UTXO_INPUT_LENGTH)) {
		        throw new Error("UTXO Input data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_UTXO_INPUT_LENGTH);
		    }
		    var type = readStream.readByte("utxoInput.type");
		    if (type !== 0) {
		        throw new Error("Type mismatch in utxoInput " + type);
		    }
		    var transactionId = readStream.readFixedHex("utxoInput.transactionId", common.TRANSACTION_ID_LENGTH);
		    var transactionOutputIndex = readStream.readUInt16("utxoInput.transactionOutputIndex");
		    return {
		        type: type,
		        transactionId: transactionId,
		        transactionOutputIndex: transactionOutputIndex
		    };
		}
		exports.deserializeUTXOInput = deserializeUTXOInput;
		/**
		 * Serialize the utxo input to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeUTXOInput(writeStream, object) {
		    writeStream.writeByte("utxoInput.type", object.type);
		    writeStream.writeFixedHex("utxoInput.transactionId", common.TRANSACTION_ID_LENGTH, object.transactionId);
		    writeStream.writeUInt16("utxoInput.transactionOutputIndex", object.transactionOutputIndex);
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
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeOutputs(readStream) {
		    var numOutputs = readStream.readUInt16("outputs.numOutputs");
		    var inputs = [];
		    for (var i = 0; i < numOutputs; i++) {
		        inputs.push(deserializeOutput(readStream));
		    }
		    return inputs;
		}
		exports.deserializeOutputs = deserializeOutputs;
		/**
		 * Serialize the outputs to binary.
		 * @param writeStream The stream to write the data to.
		 * @param objects The objects to serialize.
		 */
		function serializeOutputs(writeStream, objects) {
		    writeStream.writeUInt16("outputs.numOutputs", objects.length);
		    for (var i = 0; i < objects.length; i++) {
		        serializeOutput(writeStream, objects[i]);
		    }
		}
		exports.serializeOutputs = serializeOutputs;
		/**
		 * Deserialize the output from binary.
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeOutput(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_OUTPUT_LENGTH)) {
		        throw new Error("Output data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_OUTPUT_LENGTH);
		    }
		    var type = readStream.readByte("output.type", false);
		    var input;
		    if (type === 0) {
		        input = deserializeSigLockedSingleOutput(readStream);
		    }
		    else {
		        throw new Error("Unrecognized output type " + type);
		    }
		    return input;
		}
		exports.deserializeOutput = deserializeOutput;
		/**
		 * Serialize the output to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeOutput(writeStream, object) {
		    if (object.type === 0) {
		        serializeSigLockedSingleOutput(writeStream, object);
		    }
		    else {
		        throw new Error("Unrecognized output type " + object.type);
		    }
		}
		exports.serializeOutput = serializeOutput;
		/**
		 * Deserialize the signature locked single output from binary.
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeSigLockedSingleOutput(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_SIG_LOCKED_OUTPUT_LENGTH)) {
		        throw new Error("Signature Locked Single Output data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_SIG_LOCKED_OUTPUT_LENGTH);
		    }
		    var type = readStream.readByte("sigLockedSingleOutput.type");
		    if (type !== 0) {
		        throw new Error("Type mismatch in sigLockedSingleOutput " + type);
		    }
		    var address$1 = address.deserializeAddress(readStream);
		    var amount = readStream.readUInt64("sigLockedSingleOutput.amount");
		    return {
		        type: type,
		        address: address$1,
		        amount: Number(amount)
		    };
		}
		exports.deserializeSigLockedSingleOutput = deserializeSigLockedSingleOutput;
		/**
		 * Serialize the signature locked single output to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeSigLockedSingleOutput(writeStream, object) {
		    writeStream.writeByte("sigLockedSingleOutput.type", object.type);
		    address.serializeAddress(writeStream, object.address);
		    writeStream.writeUInt64("sigLockedSingleOutput.amount", BigInt(object.amount));
		}
		exports.serializeSigLockedSingleOutput = serializeSigLockedSingleOutput;

		});

		var transaction = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.serializeTransactionEssence = exports.deserializeTransactionEssence = exports.MIN_TRANSACTION_ESSENCE_LENGTH = void 0;




		exports.MIN_TRANSACTION_ESSENCE_LENGTH = common.SMALL_TYPE_LENGTH + (2 * common.ARRAY_LENGTH) + common.UINT32_SIZE;
		/**
		 * Deserialize the transaction essence from binary.
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeTransactionEssence(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_TRANSACTION_ESSENCE_LENGTH)) {
		        throw new Error("Transaction essence data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_TRANSACTION_ESSENCE_LENGTH);
		    }
		    var type = readStream.readByte("transactionEssence.type");
		    if (type !== 0) {
		        throw new Error("Type mismatch in transactionEssence " + type);
		    }
		    var inputs = input.deserializeInputs(readStream);
		    var outputs = output.deserializeOutputs(readStream);
		    var payload$1 = payload.deserializePayload(readStream);
		    if (payload$1 && payload$1.type !== 2) {
		        throw new Error("Transaction essence can only contain embedded Indexation Payload");
		    }
		    return {
		        type: type,
		        inputs: inputs,
		        outputs: outputs,
		        payload: payload$1
		    };
		}
		exports.deserializeTransactionEssence = deserializeTransactionEssence;
		/**
		 * Serialize the transaction essence to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeTransactionEssence(writeStream, object) {
		    writeStream.writeByte("transactionEssence.type", object.type);
		    input.serializeInputs(writeStream, object.inputs);
		    output.serializeOutputs(writeStream, object.outputs);
		    payload.serializePayload(writeStream, object.payload);
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
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeSignature(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_SIGNATURE_LENGTH)) {
		        throw new Error("Signature data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_SIGNATURE_LENGTH);
		    }
		    var type = readStream.readByte("signature.type", false);
		    var input;
		    if (type === 1) {
		        input = deserializeEd25519Signature(readStream);
		    }
		    else {
		        throw new Error("Unrecognized signature type " + type);
		    }
		    return input;
		}
		exports.deserializeSignature = deserializeSignature;
		/**
		 * Serialize the signature to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeSignature(writeStream, object) {
		    if (object.type === 1) {
		        serializeEd25519Signature(writeStream, object);
		    }
		    else {
		        throw new Error("Unrecognized signature type " + object.type);
		    }
		}
		exports.serializeSignature = serializeSignature;
		/**
		 * Deserialize the Ed25519 signature from binary.
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeEd25519Signature(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_ED25519_SIGNATURE_LENGTH)) {
		        throw new Error("Ed25519 signature data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_ED25519_SIGNATURE_LENGTH);
		    }
		    var type = readStream.readByte("ed25519Signature.type");
		    if (type !== 1) {
		        throw new Error("Type mismatch in ed25519Signature " + type);
		    }
		    var publicKey = readStream.readFixedHex("ed25519Signature.publicKey", ed25519.Ed25519.PUBLIC_KEY_SIZE);
		    var signature = readStream.readFixedHex("ed25519Signature.signature", ed25519.Ed25519.SIGNATURE_SIZE);
		    return {
		        type: type,
		        publicKey: publicKey,
		        signature: signature
		    };
		}
		exports.deserializeEd25519Signature = deserializeEd25519Signature;
		/**
		 * Serialize the Ed25519 signature to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeEd25519Signature(writeStream, object) {
		    writeStream.writeByte("ed25519Signature.type", object.type);
		    writeStream.writeFixedHex("ed25519Signature.publicKey", ed25519.Ed25519.PUBLIC_KEY_SIZE, object.publicKey);
		    writeStream.writeFixedHex("ed25519Signature.signature", ed25519.Ed25519.SIGNATURE_SIZE, object.signature);
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
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeUnlockBlocks(readStream) {
		    var numUnlockBlocks = readStream.readUInt16("transactionEssence.numUnlockBlocks");
		    var unlockBlocks = [];
		    for (var i = 0; i < numUnlockBlocks; i++) {
		        unlockBlocks.push(deserializeUnlockBlock(readStream));
		    }
		    return unlockBlocks;
		}
		exports.deserializeUnlockBlocks = deserializeUnlockBlocks;
		/**
		 * Serialize the unlock blocks to binary.
		 * @param writeStream The stream to write the data to.
		 * @param objects The objects to serialize.
		 */
		function serializeUnlockBlocks(writeStream, objects) {
		    writeStream.writeUInt16("transactionEssence.numUnlockBlocks", objects.length);
		    for (var i = 0; i < objects.length; i++) {
		        serializeUnlockBlock(writeStream, objects[i]);
		    }
		}
		exports.serializeUnlockBlocks = serializeUnlockBlocks;
		/**
		 * Deserialize the unlock block from binary.
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeUnlockBlock(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_UNLOCK_BLOCK_LENGTH)) {
		        throw new Error("Unlock Block data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_UNLOCK_BLOCK_LENGTH);
		    }
		    var type = readStream.readByte("unlockBlock.type", false);
		    var unlockBlock;
		    if (type === 0) {
		        unlockBlock = deserializeSignatureUnlockBlock(readStream);
		    }
		    else if (type === 1) {
		        unlockBlock = deserializeReferenceUnlockBlock(readStream);
		    }
		    else {
		        throw new Error("Unrecognized unlock block type " + type);
		    }
		    return unlockBlock;
		}
		exports.deserializeUnlockBlock = deserializeUnlockBlock;
		/**
		 * Serialize the unlock block to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeUnlockBlock(writeStream, object) {
		    if (object.type === 0) {
		        serializeSignatureUnlockBlock(writeStream, object);
		    }
		    else if (object.type === 1) {
		        serializeReferenceUnlockBlock(writeStream, object);
		    }
		    else {
		        throw new Error("Unrecognized unlock block type " + object.type);
		    }
		}
		exports.serializeUnlockBlock = serializeUnlockBlock;
		/**
		 * Deserialize the signature unlock block from binary.
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeSignatureUnlockBlock(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH)) {
		        throw new Error("Signature Unlock Block data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH);
		    }
		    var type = readStream.readByte("signatureUnlockBlock.type");
		    if (type !== 0) {
		        throw new Error("Type mismatch in signatureUnlockBlock " + type);
		    }
		    var signature$1 = signature.deserializeSignature(readStream);
		    return {
		        type: type,
		        signature: signature$1
		    };
		}
		exports.deserializeSignatureUnlockBlock = deserializeSignatureUnlockBlock;
		/**
		 * Serialize the signature unlock block to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeSignatureUnlockBlock(writeStream, object) {
		    writeStream.writeByte("signatureUnlockBlock.type", object.type);
		    signature.serializeSignature(writeStream, object.signature);
		}
		exports.serializeSignatureUnlockBlock = serializeSignatureUnlockBlock;
		/**
		 * Deserialize the reference unlock block from binary.
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeReferenceUnlockBlock(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH)) {
		        throw new Error("Reference Unlock Block data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH);
		    }
		    var type = readStream.readByte("referenceUnlockBlock.type");
		    if (type !== 1) {
		        throw new Error("Type mismatch in referenceUnlockBlock " + type);
		    }
		    var reference = readStream.readUInt16("referenceUnlockBlock.reference");
		    return {
		        type: type,
		        reference: reference
		    };
		}
		exports.deserializeReferenceUnlockBlock = deserializeReferenceUnlockBlock;
		/**
		 * Serialize the reference unlock block to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeReferenceUnlockBlock(writeStream, object) {
		    writeStream.writeByte("referenceUnlockBlock.type", object.type);
		    writeStream.writeUInt16("referenceUnlockBlock.reference", object.reference);
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
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializePayload(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_PAYLOAD_LENGTH)) {
		        throw new Error("Payload data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_PAYLOAD_LENGTH);
		    }
		    var payloadLength = readStream.readUInt32("payload.length");
		    if (!readStream.hasRemaining(payloadLength)) {
		        throw new Error("Payload length " + payloadLength + " exceeds the remaining data " + readStream.unused());
		    }
		    var payload;
		    if (payloadLength > 0) {
		        var payloadType = readStream.readUInt32("payload.type", false);
		        if (payloadType === 0) {
		            payload = deserializeTransactionPayload(readStream);
		        }
		        else if (payloadType === 1) {
		            payload = deserializeMilestonePayload(readStream);
		        }
		        else if (payloadType === 2) {
		            payload = deserializeIndexationPayload(readStream);
		        }
		        else {
		            throw new Error("Unrecognized payload type " + payloadType);
		        }
		    }
		    return payload;
		}
		exports.deserializePayload = deserializePayload;
		/**
		 * Serialize the payload essence to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializePayload(writeStream, object) {
		    // Store the location for the payload length and write 0
		    // we will rewind and fill in once the size of the payload is known
		    var payloadLengthWriteIndex = writeStream.getWriteIndex();
		    writeStream.writeUInt32("payload.length", 0);
		    if (!object) ;
		    else if (object.type === 0) {
		        serializeTransactionPayload(writeStream, object);
		    }
		    else if (object.type === 1) {
		        serializeMilestonePayload(writeStream, object);
		    }
		    else if (object.type === 2) {
		        serializeIndexationPayload(writeStream, object);
		    }
		    else {
		        throw new Error("Unrecognized transaction type " + object.type);
		    }
		    var endOfPayloadWriteIndex = writeStream.getWriteIndex();
		    writeStream.setWriteIndex(payloadLengthWriteIndex);
		    writeStream.writeUInt32("payload.length", endOfPayloadWriteIndex - payloadLengthWriteIndex - common.UINT32_SIZE);
		    writeStream.setWriteIndex(endOfPayloadWriteIndex);
		}
		exports.serializePayload = serializePayload;
		/**
		 * Deserialize the transaction payload from binary.
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeTransactionPayload(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_TRANSACTION_PAYLOAD_LENGTH)) {
		        throw new Error("Transaction Payload data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_TRANSACTION_PAYLOAD_LENGTH);
		    }
		    var type = readStream.readUInt32("payloadTransaction.type");
		    if (type !== 0) {
		        throw new Error("Type mismatch in payloadTransaction " + type);
		    }
		    var essenceType = readStream.readByte("payloadTransaction.essenceType", false);
		    var essence;
		    var unlockBlocks;
		    if (essenceType === 0) {
		        essence = transaction.deserializeTransactionEssence(readStream);
		        unlockBlocks = unlockBlock.deserializeUnlockBlocks(readStream);
		    }
		    else {
		        throw new Error("Unrecognized transaction essence type " + type);
		    }
		    return {
		        type: type,
		        essence: essence,
		        unlockBlocks: unlockBlocks
		    };
		}
		exports.deserializeTransactionPayload = deserializeTransactionPayload;
		/**
		 * Serialize the transaction payload essence to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeTransactionPayload(writeStream, object) {
		    writeStream.writeUInt32("payloadMilestone.type", object.type);
		    if (object.type === 0) {
		        transaction.serializeTransactionEssence(writeStream, object.essence);
		        unlockBlock.serializeUnlockBlocks(writeStream, object.unlockBlocks);
		    }
		    else {
		        throw new Error("Unrecognized transaction type " + object.type);
		    }
		}
		exports.serializeTransactionPayload = serializeTransactionPayload;
		/**
		 * Deserialize the milestone payload from binary.
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeMilestonePayload(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_MILESTONE_PAYLOAD_LENGTH)) {
		        throw new Error("Milestone Payload data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_MILESTONE_PAYLOAD_LENGTH);
		    }
		    var type = readStream.readUInt32("payloadMilestone.type");
		    if (type !== 1) {
		        throw new Error("Type mismatch in payloadMilestone " + type);
		    }
		    var index = readStream.readUInt64("payloadMilestone.index");
		    var timestamp = readStream.readUInt64("payloadMilestone.timestamp");
		    var inclusionMerkleProof = readStream.readFixedHex("payloadMilestone.inclusionMerkleProof", 64);
		    var signaturesCount = readStream.readByte("payloadMilestone.signaturesCount");
		    var signatures = [];
		    for (var i = 0; i < signaturesCount; i++) {
		        signatures.push(readStream.readFixedHex("payloadMilestone.signature", 64));
		    }
		    return {
		        type: type,
		        index: Number(index),
		        timestamp: Number(timestamp),
		        inclusionMerkleProof: inclusionMerkleProof,
		        signatures: signatures
		    };
		}
		exports.deserializeMilestonePayload = deserializeMilestonePayload;
		/**
		 * Serialize the milestone payload essence to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeMilestonePayload(writeStream, object) {
		    writeStream.writeUInt32("payloadMilestone.type", object.type);
		    writeStream.writeUInt64("payloadMilestone.index", BigInt(object.index));
		    writeStream.writeUInt64("payloadMilestone.timestamp", BigInt(object.timestamp));
		    writeStream.writeFixedHex("payloadMilestone.inclusionMerkleProof", 64, object.inclusionMerkleProof);
		    writeStream.writeByte("payloadMilestone.signaturesCount", object.signatures.length);
		    for (var i = 0; i < object.signatures.length; i++) {
		        writeStream.writeFixedHex("payloadMilestone.signature", 64, object.signatures[i]);
		    }
		}
		exports.serializeMilestonePayload = serializeMilestonePayload;
		/**
		 * Deserialize the indexation payload from binary.
		 * @param readStream The stream to read the data from.
		 * @returns The deserialized object.
		 */
		function deserializeIndexationPayload(readStream) {
		    if (!readStream.hasRemaining(exports.MIN_INDEXATION_PAYLOAD_LENGTH)) {
		        throw new Error("Indexation Payload data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_INDEXATION_PAYLOAD_LENGTH);
		    }
		    var type = readStream.readUInt32("payloadIndexation.type");
		    if (type !== 2) {
		        throw new Error("Type mismatch in payloadIndexation " + type);
		    }
		    var index = readStream.readString("payloadIndexation.index");
		    var dataLength = readStream.readUInt32("payloadIndexation.dataLength");
		    var data = readStream.readFixedHex("payloadIndexation.data", dataLength);
		    return {
		        type: 2,
		        index: index,
		        data: data
		    };
		}
		exports.deserializeIndexationPayload = deserializeIndexationPayload;
		/**
		 * Serialize the indexation payload essence to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeIndexationPayload(writeStream, object) {
		    writeStream.writeUInt32("payloadIndexation.type", object.type);
		    writeStream.writeString("payloadIndexation.index", object.index);
		    writeStream.writeUInt32("payloadIndexation.dataLength", object.data.length / 2);
		    writeStream.writeFixedHex("payloadIndexation.data", object.data.length / 2, object.data);
		}
		exports.serializeIndexationPayload = serializeIndexationPayload;

		});

		var message = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.serializeMessage = exports.deserializeMessage = void 0;


		var MIN_MESSAGE_LENGTH = common.BYTE_SIZE +
		    (2 * common.MESSAGE_ID_LENGTH) +
		    payload.MIN_PAYLOAD_LENGTH +
		    common.UINT64_SIZE;
		var EMPTY_MESSAGE_ID_HEX = "0".repeat(common.MESSAGE_ID_LENGTH * 2);
		/**
		 * Deserialize the message from binary.
		 * @param readStream The message to deserialize.
		 * @returns The deserialized message.
		 */
		function deserializeMessage(readStream) {
		    if (!readStream.hasRemaining(MIN_MESSAGE_LENGTH)) {
		        throw new Error("Message data is " + readStream.length() + " in length which is less than the minimimum size required of " + MIN_MESSAGE_LENGTH);
		    }
		    var version = readStream.readByte("message.version");
		    if (version !== 1) {
		        throw new Error("Unsupported message version number: " + version);
		    }
		    var parent1MessageId = readStream.readFixedHex("message.parent1MessageId", common.MESSAGE_ID_LENGTH);
		    var parent2MessageId = readStream.readFixedHex("message.parent2MessageId", common.MESSAGE_ID_LENGTH);
		    var payload$1 = payload.deserializePayload(readStream);
		    var nonce = readStream.readUInt64("message.nonce");
		    var unused = readStream.unused();
		    if (unused !== 0) {
		        throw new Error("Message data length " + readStream.length() + " has unused data " + unused);
		    }
		    return {
		        version: version,
		        payload: payload$1,
		        parent1MessageId: parent1MessageId,
		        parent2MessageId: parent2MessageId,
		        nonce: Number(nonce)
		    };
		}
		exports.deserializeMessage = deserializeMessage;
		/**
		 * Serialize the message essence to binary.
		 * @param writeStream The stream to write the data to.
		 * @param object The object to serialize.
		 */
		function serializeMessage(writeStream, object) {
		    var _a, _b;
		    writeStream.writeByte("message.version", object.version);
		    writeStream.writeFixedHex("message.parent1MessageId", common.MESSAGE_ID_LENGTH, (_a = object.parent1MessageId) !== null && _a !== void 0 ? _a : EMPTY_MESSAGE_ID_HEX);
		    writeStream.writeFixedHex("message.parent2MessageId", common.MESSAGE_ID_LENGTH, (_b = object.parent2MessageId) !== null && _b !== void 0 ? _b : EMPTY_MESSAGE_ID_HEX);
		    payload.serializePayload(writeStream, object.payload);
		    writeStream.writeUInt64("message.nonce", BigInt(object.nonce));
		}
		exports.serializeMessage = serializeMessage;

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
		var __generator = (commonjsGlobal$1 && commonjsGlobal$1.__generator) || function (thisArg, body) {
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
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.SingleNodeClient = void 0;

		/**
		 * Client for API communication.
		 */
		var SingleNodeClient = /** @class */ (function () {
		    /**
		     * Create a new instance of client.
		     * @param endpoint The endpoint.
		     */
		    function SingleNodeClient(endpoint) {
		        if (!/^https?:\/\/\w+(\.\w+)*(:\d+)?(\/.*)?$/.test(endpoint)) {
		            throw new Error("The endpoint is not in the correct format");
		        }
		        this._endpoint = endpoint.replace(/\/+$/, "");
		    }
		    /**
		     * Get the health of the node.
		     * @returns True if the node is healthy.
		     */
		    SingleNodeClient.prototype.health = function () {
		        return __awaiter(this, void 0, void 0, function () {
		            var status;
		            return __generator(this, function (_a) {
		                switch (_a.label) {
		                    case 0: return [4 /*yield*/, this.fetchStatus("/health")];
		                    case 1:
		                        status = _a.sent();
		                        if (status === 200) {
		                            return [2 /*return*/, true];
		                        }
		                        else if (status === 503) {
		                            return [2 /*return*/, false];
		                        }
		                        throw new clientError.ClientError("Unexpected response code", "/health", status);
		                }
		            });
		        });
		    };
		    /**
		     * Get the info about the node.
		     * @returns The node information.
		     */
		    SingleNodeClient.prototype.info = function () {
		        return __awaiter(this, void 0, void 0, function () {
		            return __generator(this, function (_a) {
		                return [2 /*return*/, this.fetchJson("get", "/api/v1/info")];
		            });
		        });
		    };
		    /**
		     * Get the tips from the node.
		     * @returns The tips.
		     */
		    SingleNodeClient.prototype.tips = function () {
		        return __awaiter(this, void 0, void 0, function () {
		            return __generator(this, function (_a) {
		                return [2 /*return*/, this.fetchJson("get", "/api/v1/tips")];
		            });
		        });
		    };
		    /**
		     * Get the message data by id.
		     * @param messageId The message to get the data for.
		     * @returns The message data.
		     */
		    SingleNodeClient.prototype.message = function (messageId) {
		        return __awaiter(this, void 0, void 0, function () {
		            return __generator(this, function (_a) {
		                return [2 /*return*/, this.fetchJson("get", "/api/v1/messages/" + messageId)];
		            });
		        });
		    };
		    /**
		     * Get the message metadata by id.
		     * @param messageId The message to get the metadata for.
		     * @returns The message metadata.
		     */
		    SingleNodeClient.prototype.messageMetadata = function (messageId) {
		        return __awaiter(this, void 0, void 0, function () {
		            return __generator(this, function (_a) {
		                return [2 /*return*/, this.fetchJson("get", "/api/v1/messages/" + messageId + "/metadata")];
		            });
		        });
		    };
		    /**
		     * Get the message raw data by id.
		     * @param messageId The message to get the data for.
		     * @returns The message raw data.
		     */
		    SingleNodeClient.prototype.messageRaw = function (messageId) {
		        return __awaiter(this, void 0, void 0, function () {
		            return __generator(this, function (_a) {
		                return [2 /*return*/, this.fetchBinary("get", "/api/v1/messages/" + messageId + "/raw")];
		            });
		        });
		    };
		    /**
		     * Submit message.
		     * @param message The message to submit.
		     * @returns The messageId.
		     */
		    SingleNodeClient.prototype.messageSubmit = function (message) {
		        return __awaiter(this, void 0, void 0, function () {
		            var response;
		            return __generator(this, function (_a) {
		                switch (_a.label) {
		                    case 0: return [4 /*yield*/, this.fetchJson("post", "/api/v1/messages", message)];
		                    case 1:
		                        response = _a.sent();
		                        return [2 /*return*/, response.messageId];
		                }
		            });
		        });
		    };
		    /**
		     * Submit message in raw format.
		     * @param message The message to submit.
		     * @returns The messageId.
		     */
		    SingleNodeClient.prototype.messageSubmitRaw = function (message) {
		        return __awaiter(this, void 0, void 0, function () {
		            var response;
		            return __generator(this, function (_a) {
		                switch (_a.label) {
		                    case 0: return [4 /*yield*/, this.fetchBinary("post", "/api/v1/messages", message)];
		                    case 1:
		                        response = _a.sent();
		                        return [2 /*return*/, response.messageId];
		                }
		            });
		        });
		    };
		    /**
		     * Find messages by index.
		     * @param indexationKey The index value.
		     * @returns The messageId.
		     */
		    SingleNodeClient.prototype.messagesFind = function (indexationKey) {
		        return __awaiter(this, void 0, void 0, function () {
		            return __generator(this, function (_a) {
		                return [2 /*return*/, this.fetchJson("get", "/api/v1/messages?index=" + encodeURIComponent(indexationKey))];
		            });
		        });
		    };
		    /**
		     * Get the children of a message.
		     * @param messageId The id of the message to get the children for.
		     * @returns The messages children.
		     */
		    SingleNodeClient.prototype.messageChildren = function (messageId) {
		        return __awaiter(this, void 0, void 0, function () {
		            return __generator(this, function (_a) {
		                return [2 /*return*/, this.fetchJson("get", "/api/v1/messages/" + messageId + "/children")];
		            });
		        });
		    };
		    /**
		     * Find an output by its identifier.
		     * @param outputId The id of the output to get.
		     * @returns The output details.
		     */
		    SingleNodeClient.prototype.output = function (outputId) {
		        return __awaiter(this, void 0, void 0, function () {
		            return __generator(this, function (_a) {
		                return [2 /*return*/, this.fetchJson("get", "/api/v1/outputs/" + outputId)];
		            });
		        });
		    };
		    /**
		     * Get the address details.
		     * @param address The address to get the details for.
		     * @returns The address details.
		     */
		    SingleNodeClient.prototype.address = function (address) {
		        return __awaiter(this, void 0, void 0, function () {
		            return __generator(this, function (_a) {
		                return [2 /*return*/, this.fetchJson("get", "/api/v1/addresses/" + address)];
		            });
		        });
		    };
		    /**
		     * Get the address outputs.
		     * @param address The address to get the outputs for.
		     * @returns The address outputs.
		     */
		    SingleNodeClient.prototype.addressOutputs = function (address) {
		        return __awaiter(this, void 0, void 0, function () {
		            return __generator(this, function (_a) {
		                return [2 /*return*/, this.fetchJson("get", "/api/v1/addresses/" + address + "/outputs")];
		            });
		        });
		    };
		    /**
		     * Get the requested milestone.
		     * @param index The index of the milestone to get.
		     * @returns The milestone details.
		     */
		    SingleNodeClient.prototype.milestone = function (index) {
		        return __awaiter(this, void 0, void 0, function () {
		            return __generator(this, function (_a) {
		                return [2 /*return*/, this.fetchJson("get", "/api/v1/milestones/" + index)];
		            });
		        });
		    };
		    /**
		     * Get the list of peers.
		     * @returns The list of peers.
		     */
		    SingleNodeClient.prototype.peers = function () {
		        return __awaiter(this, void 0, void 0, function () {
		            return __generator(this, function (_a) {
		                return [2 /*return*/, this.fetchJson("get", "/api/v1/peers")];
		            });
		        });
		    };
		    /**
		     * Add a new peer.
		     * @param multiAddress The address of the peer to add.
		     * @param alias An optional alias for the peer.
		     * @returns The details for the created peer.
		     */
		    SingleNodeClient.prototype.peerAdd = function (multiAddress, alias) {
		        return __awaiter(this, void 0, void 0, function () {
		            return __generator(this, function (_a) {
		                return [2 /*return*/, this.fetchJson("post", "/api/v1/peers", {
		                        multiAddress: multiAddress,
		                        alias: alias
		                    })];
		            });
		        });
		    };
		    /**
		     * Delete a peer.
		     * @param peerId The peer to delete.
		     * @returns Nothing.
		     */
		    SingleNodeClient.prototype.peerDelete = function (peerId) {
		        return __awaiter(this, void 0, void 0, function () {
		            return __generator(this, function (_a) {
		                // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
		                return [2 /*return*/, this.fetchJson("delete", "/api/v1/peers/" + peerId)];
		            });
		        });
		    };
		    /**
		     * Get a peer.
		     * @param peerId The peer to delete.
		     * @returns The details for the created peer.
		     */
		    SingleNodeClient.prototype.peer = function (peerId) {
		        return __awaiter(this, void 0, void 0, function () {
		            return __generator(this, function (_a) {
		                return [2 /*return*/, this.fetchJson("get", "/api/v1/peers/" + peerId)];
		            });
		        });
		    };
		    /**
		     * Perform a request and just return the status.
		     * @param route The route of the request.
		     * @returns The response.
		     * @internal
		     */
		    SingleNodeClient.prototype.fetchStatus = function (route) {
		        return __awaiter(this, void 0, void 0, function () {
		            var response;
		            return __generator(this, function (_a) {
		                switch (_a.label) {
		                    case 0: return [4 /*yield*/, fetch("" + this._endpoint + route, {
		                            method: "get"
		                        })];
		                    case 1:
		                        response = _a.sent();
		                        return [2 /*return*/, response.status];
		                }
		            });
		        });
		    };
		    /**
		     * Perform a request in json format.
		     * @param method The http method.
		     * @param route The route of the request.
		     * @param requestData Request to send to the endpoint.
		     * @returns The response.
		     * @internal
		     */
		    SingleNodeClient.prototype.fetchJson = function (method, route, requestData) {
		        var _a, _b, _c;
		        return __awaiter(this, void 0, void 0, function () {
		            var response, responseData;
		            return __generator(this, function (_d) {
		                switch (_d.label) {
		                    case 0: return [4 /*yield*/, fetch("" + this._endpoint + route, {
		                            method: method,
		                            headers: {
		                                "Content-Type": "application/json"
		                            },
		                            body: requestData ? JSON.stringify(requestData) : undefined
		                        })];
		                    case 1:
		                        response = _d.sent();
		                        return [4 /*yield*/, response.json()];
		                    case 2:
		                        responseData = _d.sent();
		                        if (response.ok && !responseData.error) {
		                            return [2 /*return*/, responseData.data];
		                        }
		                        throw new clientError.ClientError((_b = (_a = responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData.error) === null || _c === void 0 ? void 0 : _c.code);
		                }
		            });
		        });
		    };
		    /**
		     * Perform a request for binary data.
		     * @param method The http method.
		     * @param route The route of the request.
		     * @param requestData Request to send to the endpoint.
		     * @returns The response.
		     * @internal
		     */
		    SingleNodeClient.prototype.fetchBinary = function (method, route, requestData) {
		        var _a, _b, _c;
		        return __awaiter(this, void 0, void 0, function () {
		            var response, responseData, _d;
		            return __generator(this, function (_e) {
		                switch (_e.label) {
		                    case 0: return [4 /*yield*/, fetch("" + this._endpoint + route, {
		                            method: method,
		                            headers: {
		                                "Content-Type": "application/octet-stream"
		                            },
		                            body: requestData
		                        })];
		                    case 1:
		                        response = _e.sent();
		                        if (!response.ok) return [3 /*break*/, 5];
		                        if (!(method === "get")) return [3 /*break*/, 3];
		                        _d = Uint8Array.bind;
		                        return [4 /*yield*/, response.arrayBuffer()];
		                    case 2: return [2 /*return*/, new (_d.apply(Uint8Array, [void 0, _e.sent()]))()];
		                    case 3: return [4 /*yield*/, response.json()];
		                    case 4:
		                        responseData = _e.sent();
		                        if (!(responseData === null || responseData === void 0 ? void 0 : responseData.error)) {
		                            return [2 /*return*/, responseData === null || responseData === void 0 ? void 0 : responseData.data];
		                        }
		                        _e.label = 5;
		                    case 5:
		                        if (!!responseData) return [3 /*break*/, 7];
		                        return [4 /*yield*/, response.json()];
		                    case 6:
		                        responseData = _e.sent();
		                        _e.label = 7;
		                    case 7: throw new clientError.ClientError((_b = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _c === void 0 ? void 0 : _c.code);
		                }
		            });
		        });
		    };
		    return SingleNodeClient;
		}());
		exports.SingleNodeClient = SingleNodeClient;

		});

		var bech32 = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Bech32 = void 0;
		/* eslint-disable no-bitwise */
		/**
		 * Class to help with Bech32 encoding/decoding.
		 * Based on reference implementation https://github.com/sipa/bech32/blob/master/ref/javascript/bech32.js
		 */
		var Bech32 = /** @class */ (function () {
		    function Bech32() {
		    }
		    /**
		     * Encode the buffer.
		     * @param humanReadablePart The header
		     * @param data The data to encode.
		     * @returns The encoded data.
		     */
		    Bech32.encode = function (humanReadablePart, data) {
		        return Bech32.encode5BitArray(humanReadablePart, Bech32.to5Bit(data));
		    };
		    /**
		     * Encode the 5 bit data buffer.
		     * @param humanReadablePart The header
		     * @param data5Bit The data to encode.
		     * @returns The encoded data.
		     */
		    Bech32.encode5BitArray = function (humanReadablePart, data5Bit) {
		        var checksum = Bech32.createChecksum(humanReadablePart, data5Bit);
		        var ret = "" + humanReadablePart + Bech32.SEPARATOR;
		        for (var i = 0; i < data5Bit.length; i++) {
		            ret += Bech32.CHARSET.charAt(data5Bit[i]);
		        }
		        for (var i = 0; i < checksum.length; i++) {
		            ret += Bech32.CHARSET.charAt(checksum[i]);
		        }
		        return ret;
		    };
		    /**
		     * Decode a bech32 string.
		     * @param bech The text to decode.
		     * @returns The decoded data or undefined if it could not be decoded.
		     */
		    Bech32.decode = function (bech) {
		        var result = Bech32.decodeTo5BitArray(bech);
		        return result ? {
		            humanReadablePart: result.humanReadablePart,
		            data: Bech32.from5Bit(result.data)
		        } : undefined;
		    };
		    /**
		     * Decode a bech32 string to 5 bit array.
		     * @param bech The text to decode.
		     * @returns The decoded data or undefined if it could not be decoded.
		     */
		    Bech32.decodeTo5BitArray = function (bech) {
		        bech = bech.toLowerCase();
		        var separatorPos = bech.lastIndexOf(Bech32.SEPARATOR);
		        if (separatorPos === -1) {
		            throw new Error("There is no separator character " + Bech32.SEPARATOR + " in the data");
		        }
		        if (separatorPos < 1) {
		            throw new Error("The separator position is " + separatorPos + ", which is too early in the string");
		        }
		        if (separatorPos + 7 > bech.length) {
		            throw new Error("The separator position is " + separatorPos + ", which doesn't leave enough space for data");
		        }
		        var data = new Uint8Array(bech.length - separatorPos - 1);
		        var idx = 0;
		        for (var i = separatorPos + 1; i < bech.length; i++) {
		            var d = Bech32.CHARSET.indexOf(bech.charAt(i));
		            if (d === -1) {
		                throw new Error("Data contains characters not in the charset " + bech.charAt(i));
		            }
		            data[idx++] = Bech32.CHARSET.indexOf(bech.charAt(i));
		        }
		        var humanReadablePart = bech.slice(0, separatorPos);
		        if (!Bech32.verifyChecksum(humanReadablePart, data)) {
		            return;
		        }
		        return { humanReadablePart: humanReadablePart, data: data.slice(0, -6) };
		    };
		    /**
		     * Convert the input bytes into 5 bit data.
		     * @param bytes The bytes to convert.
		     * @returns The data in 5 bit form.
		     */
		    Bech32.to5Bit = function (bytes) {
		        return Bech32.convertBits(bytes, 8, 5, true);
		    };
		    /**
		     * Convert the 5 bit data to 8 bit.
		     * @param fiveBit The 5 bit data to convert.
		     * @returns The 5 bit data converted to 8 bit.
		     */
		    Bech32.from5Bit = function (fiveBit) {
		        return Bech32.convertBits(fiveBit, 5, 8, false);
		    };
		    /**
		     * Does the given string match the bech32 pattern.
		     * @param humanReadablePart The human readable part.
		     * @param bech32Text The text to test.
		     * @returns True if this is potentially a match.
		     */
		    Bech32.matches = function (humanReadablePart, bech32Text) {
		        if (!bech32Text) {
		            return false;
		        }
		        var regEx = new RegExp("^" + humanReadablePart + "1[" + Bech32.CHARSET + "]{6,}$");
		        return regEx.test(bech32Text);
		    };
		    /**
		     * Create the checksum from the human redable part and the data.
		     * @param humanReadablePart The human readable part.
		     * @param data The data.
		     * @returns The checksum.
		     */
		    Bech32.createChecksum = function (humanReadablePart, data) {
		        var expanded = Bech32.humanReadablePartExpand(humanReadablePart);
		        var values = new Uint8Array(expanded.length + data.length + 6);
		        values.set(expanded, 0);
		        values.set(data, expanded.length);
		        values.set([0, 0, 0, 0, 0, 0], expanded.length + data.length);
		        var mod = Bech32.polymod(values) ^ 1;
		        var ret = new Uint8Array(6);
		        for (var i = 0; i < 6; i++) {
		            ret[i] = (mod >> 5 * (5 - i)) & 31;
		        }
		        return ret;
		    };
		    /**
		     * Verify the checksum given the humarn readable part and data.
		     * @param humanReadablePart The human redable part to validate the checksum.
		     * @param data The data to validate the checksum.
		     * @returns True if the checksum was verified.
		     */
		    Bech32.verifyChecksum = function (humanReadablePart, data) {
		        var expanded = Bech32.humanReadablePartExpand(humanReadablePart);
		        var values = new Uint8Array(expanded.length + data.length);
		        values.set(expanded, 0);
		        values.set(data, expanded.length);
		        return Bech32.polymod(values) === 1;
		    };
		    /**
		     * Calculate the polymod of the values.
		     * @param values The values to calculate the polymod for.
		     * @returns The polymod of the values.
		     */
		    Bech32.polymod = function (values) {
		        var chk = 1;
		        for (var p = 0; p < values.length; p++) {
		            var top_1 = chk >> 25;
		            chk = ((chk & 0x1FFFFFF) << 5) ^ values[p];
		            for (var i = 0; i < 5; ++i) {
		                if ((top_1 >> i) & 1) {
		                    chk ^= Bech32.GENERATOR[i];
		                }
		            }
		        }
		        return chk;
		    };
		    /**
		     * Expand the human readable part.
		     * @param humanReadablePart The human readable part to expand.
		     * @returns The expanded human readable part.
		     */
		    Bech32.humanReadablePartExpand = function (humanReadablePart) {
		        var ret = new Uint8Array((humanReadablePart.length * 2) + 1);
		        var idx = 0;
		        for (var i = 0; i < humanReadablePart.length; i++) {
		            ret[idx++] = humanReadablePart.charCodeAt(i) >> 5;
		        }
		        ret[idx++] = 0;
		        for (var i = 0; i < humanReadablePart.length; i++) {
		            ret[idx++] = humanReadablePart.charCodeAt(i) & 31;
		        }
		        return ret;
		    };
		    /**
		     * Convert input data from one bit resolution to another.
		     * @param data The data to convert.
		     * @param fromBits The resolution of the input data.
		     * @param toBits The required resolution of the output data.
		     * @param padding Include padding in the output.
		     * @returns The converted data,
		     */
		    Bech32.convertBits = function (data, fromBits, toBits, padding) {
		        var value = 0;
		        var bits = 0;
		        var maxV = (1 << toBits) - 1;
		        var res = [];
		        for (var i = 0; i < data.length; i++) {
		            value = (value << fromBits) | data[i];
		            bits += fromBits;
		            while (bits >= toBits) {
		                bits -= toBits;
		                res.push((value >> bits) & maxV);
		            }
		        }
		        if (padding) {
		            if (bits > 0) {
		                res.push((value << (toBits - bits)) & maxV);
		            }
		        }
		        else {
		            if (bits >= fromBits) {
		                throw new Error("Excess padding");
		            }
		            if ((value << (toBits - bits)) & maxV) {
		                throw new Error("Non-zero padding");
		            }
		        }
		        return new Uint8Array(res);
		    };
		    /**
		     * The alphabet to use.
		     */
		    Bech32.CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
		    /**
		     * The separator between human readable part and data.
		     */
		    Bech32.SEPARATOR = "1";
		    /**
		     * The generator constants;
		     */
		    Bech32.GENERATOR = Uint32Array.from([
		        0x3B6A57B2,
		        0x26508E6D,
		        0x1EA119FA,
		        0x3D4233DD,
		        0x2A1462B3
		    ]);
		    return Bech32;
		}());
		exports.Bech32 = Bech32;

		});

		var bip32Path = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Bip32Path = void 0;
		/**
		 * Class to help with bip32 paths.
		 */
		var Bip32Path = /** @class */ (function () {
		    /**
		     * Create a new instance of Bip32Path.
		     * @param initialPath Initial path to create.
		     */
		    function Bip32Path(initialPath) {
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
		    Bip32Path.prototype.toString = function () {
		        return this._path.length > 0 ? "m/" + this._path.join("/") : "m";
		    };
		    /**
		     * Push a new index on to the path.
		     * @param index The index to add to the path.
		     */
		    Bip32Path.prototype.push = function (index) {
		        this._path.push("" + index);
		    };
		    /**
		     * Push a new hardened index on to the path.
		     * @param index The index to add to the path.
		     */
		    Bip32Path.prototype.pushHardened = function (index) {
		        this._path.push(index + "'");
		    };
		    /**
		     * Pop an index from the path.
		     */
		    Bip32Path.prototype.pop = function () {
		        this._path.pop();
		    };
		    /**
		     * Get the segments.
		     * @returns The segments as numbers.
		     */
		    Bip32Path.prototype.numberSegments = function () {
		        return this._path.map(function (p) { return Number.parseInt(p, 10); });
		    };
		    return Bip32Path;
		}());
		exports.Bip32Path = Bip32Path;

		});

		var converter = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Converter = void 0;
		/* eslint-disable no-bitwise */
		/**
		 * Convert arrays to and from different formats.
		 */
		var Converter = /** @class */ (function () {
		    function Converter() {
		    }
		    /**
		     * Encode a raw array to text string.
		     * @param array The bytes to encode.
		     * @param startIndex The index to start in the bytes.
		     * @param length The length of bytes to read.
		     * @returns The array formated as hex.
		     */
		    Converter.bytesToAscii = function (array, startIndex, length) {
		        var ascii = "";
		        var len = length !== null && length !== void 0 ? length : array.length;
		        var start = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
		        for (var i = 0; i < len; i++) {
		            ascii += String.fromCharCode(array[start + i]);
		        }
		        return ascii;
		    };
		    /**
		     * Decode a text string to raw array.
		     * @param ascii The text to decode.
		     * @returns The array.
		     */
		    Converter.asciiToBytes = function (ascii) {
		        var sizeof = ascii.length;
		        var array = new Uint8Array(sizeof);
		        for (var i = 0; i < ascii.length; i++) {
		            array[i] = ascii.charCodeAt(i);
		        }
		        return array;
		    };
		    /**
		     * Encode a raw array to hex string.
		     * @param array The bytes to encode.
		     * @param startIndex The index to start in the bytes.
		     * @param length The length of bytes to read.
		     * @param reverse Reverse the combine direction.
		     * @returns The array formated as hex.
		     */
		    Converter.bytesToHex = function (array, startIndex, length, reverse) {
		        var hex = "";
		        this.buildHexLookups();
		        if (Converter.ENCODE_LOOKUP) {
		            var len = length !== null && length !== void 0 ? length : array.length;
		            var start = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
		            if (reverse) {
		                for (var i = 0; i < len; i++) {
		                    hex = Converter.ENCODE_LOOKUP[array[start + i]] + hex;
		                }
		            }
		            else {
		                for (var i = 0; i < len; i++) {
		                    hex += Converter.ENCODE_LOOKUP[array[start + i]];
		                }
		            }
		        }
		        return hex;
		    };
		    /**
		     * Decode a hex string to raw array.
		     * @param hex The hex to decode.
		     * @param reverse Store the characters in reverse.
		     * @returns The array.
		     */
		    Converter.hexToBytes = function (hex, reverse) {
		        var sizeof = hex.length >> 1;
		        var length = sizeof << 1;
		        var array = new Uint8Array(sizeof);
		        this.buildHexLookups();
		        if (Converter.DECODE_LOOKUP) {
		            var i = 0;
		            var n = 0;
		            while (i < length) {
		                array[n++] =
		                    (Converter.DECODE_LOOKUP[hex.charCodeAt(i++)] << 4) |
		                        Converter.DECODE_LOOKUP[hex.charCodeAt(i++)];
		            }
		            if (reverse) {
		                array.reverse();
		            }
		        }
		        return array;
		    };
		    /**
		     * Convert the ascii text to hex.
		     * @param ascii The ascii to convert.
		     * @returns The hex version of the bytes.
		     */
		    Converter.asciiToHex = function (ascii) {
		        return Converter.bytesToHex(Converter.asciiToBytes(ascii));
		    };
		    /**
		     * Convert the hex text to ascii.
		     * @param hex The hex to convert.
		     * @returns The ascii version of the bytes.
		     */
		    Converter.hexToAscii = function (hex) {
		        return Converter.bytesToAscii(Converter.hexToBytes(hex));
		    };
		    /**
		     * Build the static lookup tables.
		     * @internal
		     */
		    Converter.buildHexLookups = function () {
		        if (!Converter.ENCODE_LOOKUP || !Converter.DECODE_LOOKUP) {
		            var alphabet = "0123456789abcdef";
		            Converter.ENCODE_LOOKUP = [];
		            Converter.DECODE_LOOKUP = [];
		            for (var i = 0; i < 256; i++) {
		                Converter.ENCODE_LOOKUP[i] = alphabet[(i >> 4) & 0xF] + alphabet[i & 0xF];
		                if (i < 16) {
		                    if (i < 10) {
		                        Converter.DECODE_LOOKUP[0x30 + i] = i;
		                    }
		                    else {
		                        Converter.DECODE_LOOKUP[0x61 - 10 + i] = i;
		                    }
		                }
		            }
		        }
		    };
		    return Converter;
		}());
		exports.Converter = Converter;

		});

		var sha512 = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Sha512 = void 0;
		/* eslint-disable no-bitwise */
		/**
		 * Class to help with Sha512 scheme.
		 * TypeScript conversion from https://github.com/emn178/js-sha512
		 */
		var Sha512 = /** @class */ (function () {
		    /**
		     * Create a new instance of Sha512.
		     * @param bits The number of bits.
		     */
		    function Sha512(bits) {
		        if (bits === void 0) { bits = 512; }
		        /**
		         * Blocks.
		         * @internal
		         */
		        this._blocks = [];
		        this._blocks = [
		            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
		        ];
		        if (bits === 384) {
		            this._h0h = 0xCBBB9D5D;
		            this._h0l = 0xC1059ED8;
		            this._h1h = 0x629A292A;
		            this._h1l = 0x367CD507;
		            this._h2h = 0x9159015A;
		            this._h2l = 0x3070DD17;
		            this._h3h = 0x152FECD8;
		            this._h3l = 0xF70E5939;
		            this._h4h = 0x67332667;
		            this._h4l = 0xFFC00B31;
		            this._h5h = 0x8EB44A87;
		            this._h5l = 0x68581511;
		            this._h6h = 0xDB0C2E0D;
		            this._h6l = 0x64F98FA7;
		            this._h7h = 0x47B5481D;
		            this._h7l = 0xBEFA4FA4;
		        }
		        else if (bits === 256) {
		            this._h0h = 0x22312194;
		            this._h0l = 0xFC2BF72C;
		            this._h1h = 0x9F555FA3;
		            this._h1l = 0xC84C64C2;
		            this._h2h = 0x2393B86B;
		            this._h2l = 0x6F53B151;
		            this._h3h = 0x96387719;
		            this._h3l = 0x5940EABD;
		            this._h4h = 0x96283EE2;
		            this._h4l = 0xA88EFFE3;
		            this._h5h = 0xBE5E1E25;
		            this._h5l = 0x53863992;
		            this._h6h = 0x2B0199FC;
		            this._h6l = 0x2C85B8AA;
		            this._h7h = 0x0EB72DDC;
		            this._h7l = 0x81C52CA2;
		        }
		        else if (bits === 224) {
		            this._h0h = 0x8C3D37C8;
		            this._h0l = 0x19544DA2;
		            this._h1h = 0x73E19966;
		            this._h1l = 0x89DCD4D6;
		            this._h2h = 0x1DFAB7AE;
		            this._h2l = 0x32FF9C82;
		            this._h3h = 0x679DD514;
		            this._h3l = 0x582F9FCF;
		            this._h4h = 0x0F6D2B69;
		            this._h4l = 0x7BD44DA8;
		            this._h5h = 0x77E36F73;
		            this._h5l = 0x04C48942;
		            this._h6h = 0x3F9D85A8;
		            this._h6l = 0x6A1D36C8;
		            this._h7h = 0x1112E6AD;
		            this._h7l = 0x91D692A1;
		        }
		        else { // 512
		            this._h0h = 0x6A09E667;
		            this._h0l = 0xF3BCC908;
		            this._h1h = 0xBB67AE85;
		            this._h1l = 0x84CAA73B;
		            this._h2h = 0x3C6EF372;
		            this._h2l = 0xFE94F82B;
		            this._h3h = 0xA54FF53A;
		            this._h3l = 0x5F1D36F1;
		            this._h4h = 0x510E527F;
		            this._h4l = 0xADE682D1;
		            this._h5h = 0x9B05688C;
		            this._h5l = 0x2B3E6C1F;
		            this._h6h = 0x1F83D9AB;
		            this._h6l = 0xFB41BD6B;
		            this._h7h = 0x5BE0CD19;
		            this._h7l = 0x137E2179;
		        }
		        this._bits = bits;
		        this._block = 0;
		        this._start = 0;
		        this._bytes = 0;
		        this._hBytes = 0;
		        this._lastByteIndex = 0;
		        this._finalized = false;
		        this._hashed = false;
		    }
		    /**
		     * Update the hash with the data.
		     * @param message The data to update the hash with.
		     * @returns The instance for chaining.
		     */
		    Sha512.prototype.update = function (message) {
		        if (this._finalized) {
		            throw new Error("The hash has already been finalized.");
		        }
		        var index = 0;
		        var i;
		        var length = message.length;
		        var blocks = this._blocks;
		        while (index < length) {
		            if (this._hashed) {
		                this._hashed = false;
		                blocks[0] = this._block;
		                blocks[1] = 0;
		                blocks[2] = 0;
		                blocks[3] = 0;
		                blocks[4] = 0;
		                blocks[5] = 0;
		                blocks[6] = 0;
		                blocks[7] = 0;
		                blocks[8] = 0;
		                blocks[9] = 0;
		                blocks[10] = 0;
		                blocks[11] = 0;
		                blocks[12] = 0;
		                blocks[13] = 0;
		                blocks[14] = 0;
		                blocks[15] = 0;
		                blocks[16] = 0;
		                blocks[17] = 0;
		                blocks[18] = 0;
		                blocks[19] = 0;
		                blocks[20] = 0;
		                blocks[21] = 0;
		                blocks[22] = 0;
		                blocks[23] = 0;
		                blocks[24] = 0;
		                blocks[25] = 0;
		                blocks[26] = 0;
		                blocks[27] = 0;
		                blocks[28] = 0;
		                blocks[29] = 0;
		                blocks[30] = 0;
		                blocks[31] = 0;
		                blocks[32] = 0;
		            }
		            for (i = this._start; index < length && i < 128; ++index) {
		                blocks[i >> 2] |= message[index] << Sha512.SHIFT[i++ & 3];
		            }
		            this._lastByteIndex = i;
		            this._bytes += i - this._start;
		            if (i >= 128) {
		                this._block = blocks[32];
		                this._start = i - 128;
		                this.hash();
		                this._hashed = true;
		            }
		            else {
		                this._start = i;
		            }
		        }
		        if (this._bytes > 4294967295) {
		            this._hBytes += Math.trunc(this._bytes / 4294967296);
		            this._bytes %= 4294967296;
		        }
		        return this;
		    };
		    /**
		     * Get the digest.
		     * @returns The digest.
		     */
		    Sha512.prototype.digest = function () {
		        this.finalize();
		        var h0h = this._h0h;
		        var h0l = this._h0l;
		        var h1h = this._h1h;
		        var h1l = this._h1l;
		        var h2h = this._h2h;
		        var h2l = this._h2l;
		        var h3h = this._h3h;
		        var h3l = this._h3l;
		        var h4h = this._h4h;
		        var h4l = this._h4l;
		        var h5h = this._h5h;
		        var h5l = this._h5l;
		        var h6h = this._h6h;
		        var h6l = this._h6l;
		        var h7h = this._h7h;
		        var h7l = this._h7l;
		        var bits = this._bits;
		        var arr = [
		            (h0h >> 24) & 0xFF, (h0h >> 16) & 0xFF, (h0h >> 8) & 0xFF, h0h & 0xFF,
		            (h0l >> 24) & 0xFF, (h0l >> 16) & 0xFF, (h0l >> 8) & 0xFF, h0l & 0xFF,
		            (h1h >> 24) & 0xFF, (h1h >> 16) & 0xFF, (h1h >> 8) & 0xFF, h1h & 0xFF,
		            (h1l >> 24) & 0xFF, (h1l >> 16) & 0xFF, (h1l >> 8) & 0xFF, h1l & 0xFF,
		            (h2h >> 24) & 0xFF, (h2h >> 16) & 0xFF, (h2h >> 8) & 0xFF, h2h & 0xFF,
		            (h2l >> 24) & 0xFF, (h2l >> 16) & 0xFF, (h2l >> 8) & 0xFF, h2l & 0xFF,
		            (h3h >> 24) & 0xFF, (h3h >> 16) & 0xFF, (h3h >> 8) & 0xFF, h3h & 0xFF
		        ];
		        if (bits >= 256) {
		            arr.push((h3l >> 24) & 0xFF, (h3l >> 16) & 0xFF, (h3l >> 8) & 0xFF, h3l & 0xFF);
		        }
		        if (bits >= 384) {
		            arr.push((h4h >> 24) & 0xFF, (h4h >> 16) & 0xFF, (h4h >> 8) & 0xFF, h4h & 0xFF, (h4l >> 24) & 0xFF, (h4l >> 16) & 0xFF, (h4l >> 8) & 0xFF, h4l & 0xFF, (h5h >> 24) & 0xFF, (h5h >> 16) & 0xFF, (h5h >> 8) & 0xFF, h5h & 0xFF, (h5l >> 24) & 0xFF, (h5l >> 16) & 0xFF, (h5l >> 8) & 0xFF, h5l & 0xFF);
		        }
		        if (bits === 512) {
		            arr.push((h6h >> 24) & 0xFF, (h6h >> 16) & 0xFF, (h6h >> 8) & 0xFF, h6h & 0xFF, (h6l >> 24) & 0xFF, (h6l >> 16) & 0xFF, (h6l >> 8) & 0xFF, h6l & 0xFF, (h7h >> 24) & 0xFF, (h7h >> 16) & 0xFF, (h7h >> 8) & 0xFF, h7h & 0xFF, (h7l >> 24) & 0xFF, (h7l >> 16) & 0xFF, (h7l >> 8) & 0xFF, h7l & 0xFF);
		        }
		        return Uint8Array.from(arr);
		    };
		    /**
		     * Finalize the hash.
		     * @internal
		     */
		    Sha512.prototype.finalize = function () {
		        if (this._finalized) {
		            return;
		        }
		        this._finalized = true;
		        var blocks = this._blocks;
		        var i = this._lastByteIndex;
		        blocks[32] = this._block;
		        blocks[i >> 2] |= Sha512.EXTRA[i & 3];
		        this._block = blocks[32];
		        if (i >= 112) {
		            if (!this._hashed) {
		                this.hash();
		            }
		            blocks[0] = this._block;
		            blocks[1] = 0;
		            blocks[2] = 0;
		            blocks[3] = 0;
		            blocks[4] = 0;
		            blocks[5] = 0;
		            blocks[6] = 0;
		            blocks[7] = 0;
		            blocks[8] = 0;
		            blocks[9] = 0;
		            blocks[10] = 0;
		            blocks[11] = 0;
		            blocks[12] = 0;
		            blocks[13] = 0;
		            blocks[14] = 0;
		            blocks[15] = 0;
		            blocks[16] = 0;
		            blocks[17] = 0;
		            blocks[18] = 0;
		            blocks[19] = 0;
		            blocks[20] = 0;
		            blocks[21] = 0;
		            blocks[22] = 0;
		            blocks[23] = 0;
		            blocks[24] = 0;
		            blocks[25] = 0;
		            blocks[26] = 0;
		            blocks[27] = 0;
		            blocks[28] = 0;
		            blocks[29] = 0;
		            blocks[30] = 0;
		            blocks[31] = 0;
		            blocks[32] = 0;
		        }
		        blocks[30] = (this._hBytes << 3) | (this._bytes >>> 29);
		        blocks[31] = this._bytes << 3;
		        this.hash();
		    };
		    /**
		     * Perform the hash.
		     * @internal
		     */
		    Sha512.prototype.hash = function () {
		        var h0h = this._h0h;
		        var h0l = this._h0l;
		        var h1h = this._h1h;
		        var h1l = this._h1l;
		        var h2h = this._h2h;
		        var h2l = this._h2l;
		        var h3h = this._h3h;
		        var h3l = this._h3l;
		        var h4h = this._h4h;
		        var h4l = this._h4l;
		        var h5h = this._h5h;
		        var h5l = this._h5l;
		        var h6h = this._h6h;
		        var h6l = this._h6l;
		        var h7h = this._h7h;
		        var h7l = this._h7l;
		        var blocks = this._blocks;
		        var j;
		        var s0h;
		        var s0l;
		        var s1h;
		        var s1l;
		        var c1;
		        var c2;
		        var c3;
		        var c4;
		        var abh;
		        var abl;
		        var dah;
		        var dal;
		        var cdh;
		        var cdl;
		        var bch;
		        var bcl;
		        var majh;
		        var majl;
		        var t1h;
		        var t1l;
		        var t2h;
		        var t2l;
		        var chh;
		        var chl;
		        for (j = 32; j < 160; j += 2) {
		            t1h = blocks[j - 30];
		            t1l = blocks[j - 29];
		            s0h = ((t1h >>> 1) | (t1l << 31)) ^ ((t1h >>> 8) | (t1l << 24)) ^ (t1h >>> 7);
		            s0l = ((t1l >>> 1) | (t1h << 31)) ^ ((t1l >>> 8) | (t1h << 24)) ^ ((t1l >>> 7) | (t1h << 25));
		            t1h = blocks[j - 4];
		            t1l = blocks[j - 3];
		            s1h = ((t1h >>> 19) | (t1l << 13)) ^ ((t1l >>> 29) | (t1h << 3)) ^ (t1h >>> 6);
		            s1l = ((t1l >>> 19) | (t1h << 13)) ^ ((t1h >>> 29) | (t1l << 3)) ^ ((t1l >>> 6) | (t1h << 26));
		            t1h = blocks[j - 32];
		            t1l = blocks[j - 31];
		            t2h = blocks[j - 14];
		            t2l = blocks[j - 13];
		            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (s0l & 0xFFFF) + (s1l & 0xFFFF);
		            c2 = (t2l >>> 16) + (t1l >>> 16) + (s0l >>> 16) + (s1l >>> 16) + (c1 >>> 16);
		            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (s0h & 0xFFFF) + (s1h & 0xFFFF) + (c2 >>> 16);
		            c4 = (t2h >>> 16) + (t1h >>> 16) + (s0h >>> 16) + (s1h >>> 16) + (c3 >>> 16);
		            blocks[j] = (c4 << 16) | (c3 & 0xFFFF);
		            blocks[j + 1] = (c2 << 16) | (c1 & 0xFFFF);
		        }
		        var ah = h0h;
		        var al = h0l;
		        var bh = h1h;
		        var bl = h1l;
		        var ch = h2h;
		        var cl = h2l;
		        var dh = h3h;
		        var dl = h3l;
		        var eh = h4h;
		        var el = h4l;
		        var fh = h5h;
		        var fl = h5l;
		        var gh = h6h;
		        var gl = h6l;
		        var hh = h7h;
		        var hl = h7l;
		        bch = bh & ch;
		        bcl = bl & cl;
		        for (j = 0; j < 160; j += 8) {
		            s0h = ((ah >>> 28) | (al << 4)) ^ ((al >>> 2) | (ah << 30)) ^ ((al >>> 7) | (ah << 25));
		            s0l = ((al >>> 28) | (ah << 4)) ^ ((ah >>> 2) | (al << 30)) ^ ((ah >>> 7) | (al << 25));
		            s1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((el >>> 9) | (eh << 23));
		            s1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((eh >>> 9) | (el << 23));
		            abh = ah & bh;
		            abl = al & bl;
		            majh = abh ^ (ah & ch) ^ bch;
		            majl = abl ^ (al & cl) ^ bcl;
		            chh = (eh & fh) ^ (~eh & gh);
		            chl = (el & fl) ^ (~el & gl);
		            t1h = blocks[j];
		            t1l = blocks[j + 1];
		            t2h = Sha512.K[j];
		            t2l = Sha512.K[j + 1];
		            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (hl & 0xFFFF);
		            c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (hl >>> 16) + (c1 >>> 16);
		            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (hh & 0xFFFF) + (c2 >>> 16);
		            c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (hh >>> 16) + (c3 >>> 16);
		            t1h = (c4 << 16) | (c3 & 0xFFFF);
		            t1l = (c2 << 16) | (c1 & 0xFFFF);
		            c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
		            c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
		            c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
		            c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
		            t2h = (c4 << 16) | (c3 & 0xFFFF);
		            t2l = (c2 << 16) | (c1 & 0xFFFF);
		            c1 = (dl & 0xFFFF) + (t1l & 0xFFFF);
		            c2 = (dl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
		            c3 = (dh & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
		            c4 = (dh >>> 16) + (t1h >>> 16) + (c3 >>> 16);
		            hh = (c4 << 16) | (c3 & 0xFFFF);
		            hl = (c2 << 16) | (c1 & 0xFFFF);
		            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
		            c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
		            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
		            c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
		            dh = (c4 << 16) | (c3 & 0xFFFF);
		            dl = (c2 << 16) | (c1 & 0xFFFF);
		            s0h = ((dh >>> 28) | (dl << 4)) ^ ((dl >>> 2) | (dh << 30)) ^ ((dl >>> 7) | (dh << 25));
		            s0l = ((dl >>> 28) | (dh << 4)) ^ ((dh >>> 2) | (dl << 30)) ^ ((dh >>> 7) | (dl << 25));
		            s1h = ((hh >>> 14) | (hl << 18)) ^ ((hh >>> 18) | (hl << 14)) ^ ((hl >>> 9) | (hh << 23));
		            s1l = ((hl >>> 14) | (hh << 18)) ^ ((hl >>> 18) | (hh << 14)) ^ ((hh >>> 9) | (hl << 23));
		            dah = dh & ah;
		            dal = dl & al;
		            majh = dah ^ (dh & bh) ^ abh;
		            majl = dal ^ (dl & bl) ^ abl;
		            chh = (hh & eh) ^ (~hh & fh);
		            chl = (hl & el) ^ (~hl & fl);
		            t1h = blocks[j + 2];
		            t1l = blocks[j + 3];
		            t2h = Sha512.K[j + 2];
		            t2l = Sha512.K[j + 3];
		            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (gl & 0xFFFF);
		            c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (gl >>> 16) + (c1 >>> 16);
		            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (gh & 0xFFFF) + (c2 >>> 16);
		            c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (gh >>> 16) + (c3 >>> 16);
		            t1h = (c4 << 16) | (c3 & 0xFFFF);
		            t1l = (c2 << 16) | (c1 & 0xFFFF);
		            c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
		            c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
		            c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
		            c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
		            t2h = (c4 << 16) | (c3 & 0xFFFF);
		            t2l = (c2 << 16) | (c1 & 0xFFFF);
		            c1 = (cl & 0xFFFF) + (t1l & 0xFFFF);
		            c2 = (cl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
		            c3 = (ch & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
		            c4 = (ch >>> 16) + (t1h >>> 16) + (c3 >>> 16);
		            gh = (c4 << 16) | (c3 & 0xFFFF);
		            gl = (c2 << 16) | (c1 & 0xFFFF);
		            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
		            c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
		            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
		            c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
		            ch = (c4 << 16) | (c3 & 0xFFFF);
		            cl = (c2 << 16) | (c1 & 0xFFFF);
		            s0h = ((ch >>> 28) | (cl << 4)) ^ ((cl >>> 2) | (ch << 30)) ^ ((cl >>> 7) | (ch << 25));
		            s0l = ((cl >>> 28) | (ch << 4)) ^ ((ch >>> 2) | (cl << 30)) ^ ((ch >>> 7) | (cl << 25));
		            s1h = ((gh >>> 14) | (gl << 18)) ^ ((gh >>> 18) | (gl << 14)) ^ ((gl >>> 9) | (gh << 23));
		            s1l = ((gl >>> 14) | (gh << 18)) ^ ((gl >>> 18) | (gh << 14)) ^ ((gh >>> 9) | (gl << 23));
		            cdh = ch & dh;
		            cdl = cl & dl;
		            majh = cdh ^ (ch & ah) ^ dah;
		            majl = cdl ^ (cl & al) ^ dal;
		            chh = (gh & hh) ^ (~gh & eh);
		            chl = (gl & hl) ^ (~gl & el);
		            t1h = blocks[j + 4];
		            t1l = blocks[j + 5];
		            t2h = Sha512.K[j + 4];
		            t2l = Sha512.K[j + 5];
		            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (fl & 0xFFFF);
		            c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (fl >>> 16) + (c1 >>> 16);
		            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (fh & 0xFFFF) + (c2 >>> 16);
		            c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (fh >>> 16) + (c3 >>> 16);
		            t1h = (c4 << 16) | (c3 & 0xFFFF);
		            t1l = (c2 << 16) | (c1 & 0xFFFF);
		            c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
		            c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
		            c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
		            c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
		            t2h = (c4 << 16) | (c3 & 0xFFFF);
		            t2l = (c2 << 16) | (c1 & 0xFFFF);
		            c1 = (bl & 0xFFFF) + (t1l & 0xFFFF);
		            c2 = (bl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
		            c3 = (bh & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
		            c4 = (bh >>> 16) + (t1h >>> 16) + (c3 >>> 16);
		            fh = (c4 << 16) | (c3 & 0xFFFF);
		            fl = (c2 << 16) | (c1 & 0xFFFF);
		            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
		            c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
		            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
		            c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
		            bh = (c4 << 16) | (c3 & 0xFFFF);
		            bl = (c2 << 16) | (c1 & 0xFFFF);
		            s0h = ((bh >>> 28) | (bl << 4)) ^ ((bl >>> 2) | (bh << 30)) ^ ((bl >>> 7) | (bh << 25));
		            s0l = ((bl >>> 28) | (bh << 4)) ^ ((bh >>> 2) | (bl << 30)) ^ ((bh >>> 7) | (bl << 25));
		            s1h = ((fh >>> 14) | (fl << 18)) ^ ((fh >>> 18) | (fl << 14)) ^ ((fl >>> 9) | (fh << 23));
		            s1l = ((fl >>> 14) | (fh << 18)) ^ ((fl >>> 18) | (fh << 14)) ^ ((fh >>> 9) | (fl << 23));
		            bch = bh & ch;
		            bcl = bl & cl;
		            majh = bch ^ (bh & dh) ^ cdh;
		            majl = bcl ^ (bl & dl) ^ cdl;
		            chh = (fh & gh) ^ (~fh & hh);
		            chl = (fl & gl) ^ (~fl & hl);
		            t1h = blocks[j + 6];
		            t1l = blocks[j + 7];
		            t2h = Sha512.K[j + 6];
		            t2l = Sha512.K[j + 7];
		            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (el & 0xFFFF);
		            c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (el >>> 16) + (c1 >>> 16);
		            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (eh & 0xFFFF) + (c2 >>> 16);
		            c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (eh >>> 16) + (c3 >>> 16);
		            t1h = (c4 << 16) | (c3 & 0xFFFF);
		            t1l = (c2 << 16) | (c1 & 0xFFFF);
		            c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
		            c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
		            c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
		            c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
		            t2h = (c4 << 16) | (c3 & 0xFFFF);
		            t2l = (c2 << 16) | (c1 & 0xFFFF);
		            c1 = (al & 0xFFFF) + (t1l & 0xFFFF);
		            c2 = (al >>> 16) + (t1l >>> 16) + (c1 >>> 16);
		            c3 = (ah & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
		            c4 = (ah >>> 16) + (t1h >>> 16) + (c3 >>> 16);
		            eh = (c4 << 16) | (c3 & 0xFFFF);
		            el = (c2 << 16) | (c1 & 0xFFFF);
		            c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
		            c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
		            c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
		            c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
		            ah = (c4 << 16) | (c3 & 0xFFFF);
		            al = (c2 << 16) | (c1 & 0xFFFF);
		        }
		        c1 = (h0l & 0xFFFF) + (al & 0xFFFF);
		        c2 = (h0l >>> 16) + (al >>> 16) + (c1 >>> 16);
		        c3 = (h0h & 0xFFFF) + (ah & 0xFFFF) + (c2 >>> 16);
		        c4 = (h0h >>> 16) + (ah >>> 16) + (c3 >>> 16);
		        this._h0h = (c4 << 16) | (c3 & 0xFFFF);
		        this._h0l = (c2 << 16) | (c1 & 0xFFFF);
		        c1 = (h1l & 0xFFFF) + (bl & 0xFFFF);
		        c2 = (h1l >>> 16) + (bl >>> 16) + (c1 >>> 16);
		        c3 = (h1h & 0xFFFF) + (bh & 0xFFFF) + (c2 >>> 16);
		        c4 = (h1h >>> 16) + (bh >>> 16) + (c3 >>> 16);
		        this._h1h = (c4 << 16) | (c3 & 0xFFFF);
		        this._h1l = (c2 << 16) | (c1 & 0xFFFF);
		        c1 = (h2l & 0xFFFF) + (cl & 0xFFFF);
		        c2 = (h2l >>> 16) + (cl >>> 16) + (c1 >>> 16);
		        c3 = (h2h & 0xFFFF) + (ch & 0xFFFF) + (c2 >>> 16);
		        c4 = (h2h >>> 16) + (ch >>> 16) + (c3 >>> 16);
		        this._h2h = (c4 << 16) | (c3 & 0xFFFF);
		        this._h2l = (c2 << 16) | (c1 & 0xFFFF);
		        c1 = (h3l & 0xFFFF) + (dl & 0xFFFF);
		        c2 = (h3l >>> 16) + (dl >>> 16) + (c1 >>> 16);
		        c3 = (h3h & 0xFFFF) + (dh & 0xFFFF) + (c2 >>> 16);
		        c4 = (h3h >>> 16) + (dh >>> 16) + (c3 >>> 16);
		        this._h3h = (c4 << 16) | (c3 & 0xFFFF);
		        this._h3l = (c2 << 16) | (c1 & 0xFFFF);
		        c1 = (h4l & 0xFFFF) + (el & 0xFFFF);
		        c2 = (h4l >>> 16) + (el >>> 16) + (c1 >>> 16);
		        c3 = (h4h & 0xFFFF) + (eh & 0xFFFF) + (c2 >>> 16);
		        c4 = (h4h >>> 16) + (eh >>> 16) + (c3 >>> 16);
		        this._h4h = (c4 << 16) | (c3 & 0xFFFF);
		        this._h4l = (c2 << 16) | (c1 & 0xFFFF);
		        c1 = (h5l & 0xFFFF) + (fl & 0xFFFF);
		        c2 = (h5l >>> 16) + (fl >>> 16) + (c1 >>> 16);
		        c3 = (h5h & 0xFFFF) + (fh & 0xFFFF) + (c2 >>> 16);
		        c4 = (h5h >>> 16) + (fh >>> 16) + (c3 >>> 16);
		        this._h5h = (c4 << 16) | (c3 & 0xFFFF);
		        this._h5l = (c2 << 16) | (c1 & 0xFFFF);
		        c1 = (h6l & 0xFFFF) + (gl & 0xFFFF);
		        c2 = (h6l >>> 16) + (gl >>> 16) + (c1 >>> 16);
		        c3 = (h6h & 0xFFFF) + (gh & 0xFFFF) + (c2 >>> 16);
		        c4 = (h6h >>> 16) + (gh >>> 16) + (c3 >>> 16);
		        this._h6h = (c4 << 16) | (c3 & 0xFFFF);
		        this._h6l = (c2 << 16) | (c1 & 0xFFFF);
		        c1 = (h7l & 0xFFFF) + (hl & 0xFFFF);
		        c2 = (h7l >>> 16) + (hl >>> 16) + (c1 >>> 16);
		        c3 = (h7h & 0xFFFF) + (hh & 0xFFFF) + (c2 >>> 16);
		        c4 = (h7h >>> 16) + (hh >>> 16) + (c3 >>> 16);
		        this._h7h = (c4 << 16) | (c3 & 0xFFFF);
		        this._h7l = (c2 << 16) | (c1 & 0xFFFF);
		    };
		    /**
		     * Extra constants.
		     * @internal
		     */
		    Sha512.EXTRA = [-2147483648, 8388608, 32768, 128];
		    /**
		     * Shift constants.
		     * @internal
		     */
		    Sha512.SHIFT = [24, 16, 8, 0];
		    /**
		     * K.
		     * @internal
		     */
		    Sha512.K = Uint32Array.from([
		        0x428A2F98, 0xD728AE22, 0x71374491, 0x23EF65CD,
		        0xB5C0FBCF, 0xEC4D3B2F, 0xE9B5DBA5, 0x8189DBBC,
		        0x3956C25B, 0xF348B538, 0x59F111F1, 0xB605D019,
		        0x923F82A4, 0xAF194F9B, 0xAB1C5ED5, 0xDA6D8118,
		        0xD807AA98, 0xA3030242, 0x12835B01, 0x45706FBE,
		        0x243185BE, 0x4EE4B28C, 0x550C7DC3, 0xD5FFB4E2,
		        0x72BE5D74, 0xF27B896F, 0x80DEB1FE, 0x3B1696B1,
		        0x9BDC06A7, 0x25C71235, 0xC19BF174, 0xCF692694,
		        0xE49B69C1, 0x9EF14AD2, 0xEFBE4786, 0x384F25E3,
		        0x0FC19DC6, 0x8B8CD5B5, 0x240CA1CC, 0x77AC9C65,
		        0x2DE92C6F, 0x592B0275, 0x4A7484AA, 0x6EA6E483,
		        0x5CB0A9DC, 0xBD41FBD4, 0x76F988DA, 0x831153B5,
		        0x983E5152, 0xEE66DFAB, 0xA831C66D, 0x2DB43210,
		        0xB00327C8, 0x98FB213F, 0xBF597FC7, 0xBEEF0EE4,
		        0xC6E00BF3, 0x3DA88FC2, 0xD5A79147, 0x930AA725,
		        0x06CA6351, 0xE003826F, 0x14292967, 0x0A0E6E70,
		        0x27B70A85, 0x46D22FFC, 0x2E1B2138, 0x5C26C926,
		        0x4D2C6DFC, 0x5AC42AED, 0x53380D13, 0x9D95B3DF,
		        0x650A7354, 0x8BAF63DE, 0x766A0ABB, 0x3C77B2A8,
		        0x81C2C92E, 0x47EDAEE6, 0x92722C85, 0x1482353B,
		        0xA2BFE8A1, 0x4CF10364, 0xA81A664B, 0xBC423001,
		        0xC24B8B70, 0xD0F89791, 0xC76C51A3, 0x0654BE30,
		        0xD192E819, 0xD6EF5218, 0xD6990624, 0x5565A910,
		        0xF40E3585, 0x5771202A, 0x106AA070, 0x32BBD1B8,
		        0x19A4C116, 0xB8D2D0C8, 0x1E376C08, 0x5141AB53,
		        0x2748774C, 0xDF8EEB99, 0x34B0BCB5, 0xE19B48A8,
		        0x391C0CB3, 0xC5C95A63, 0x4ED8AA4A, 0xE3418ACB,
		        0x5B9CCA4F, 0x7763E373, 0x682E6FF3, 0xD6B2B8A3,
		        0x748F82EE, 0x5DEFB2FC, 0x78A5636F, 0x43172F60,
		        0x84C87814, 0xA1F0AB72, 0x8CC70208, 0x1A6439EC,
		        0x90BEFFFA, 0x23631E28, 0xA4506CEB, 0xDE82BDE9,
		        0xBEF9A3F7, 0xB2C67915, 0xC67178F2, 0xE372532B,
		        0xCA273ECE, 0xEA26619C, 0xD186B8C7, 0x21C0C207,
		        0xEADA7DD6, 0xCDE0EB1E, 0xF57D4F7F, 0xEE6ED178,
		        0x06F067AA, 0x72176FBA, 0x0A637DC5, 0xA2C898A6,
		        0x113F9804, 0xBEF90DAE, 0x1B710B35, 0x131C471B,
		        0x28DB77F5, 0x23047D84, 0x32CAAB7B, 0x40C72493,
		        0x3C9EBE0A, 0x15C9BEBC, 0x431D67C4, 0x9C100D4C,
		        0x4CC5D4BE, 0xCB3E42B6, 0x597F299C, 0xFC657E2A,
		        0x5FCB6FAB, 0x3AD6FAEC, 0x6C44198C, 0x4A475817
		    ]);
		    return Sha512;
		}());
		exports.Sha512 = Sha512;

		});

		var hmacSha512 = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.HmacSha512 = void 0;
		/* eslint-disable no-bitwise */

		/**
		 * Class to help with HmacSha512 scheme.
		 * TypeScript conversion from https://github.com/emn178/js-sha512
		 */
		var HmacSha512 = /** @class */ (function () {
		    /**
		     * Create a new instance of HmacSha512.
		     * @param key The key for the hmac.
		     * @param bits The number of bits.
		     */
		    function HmacSha512(key, bits) {
		        if (bits === void 0) { bits = 512; }
		        this._bits = bits;
		        this._sha512 = new sha512.Sha512(bits);
		        if (key.length > 128) {
		            key = new sha512.Sha512(bits).digest();
		        }
		        this._oKeyPad = new Uint8Array(128);
		        var iKeyPad = new Uint8Array(128);
		        for (var i = 0; i < 128; ++i) {
		            var b = key[i] || 0;
		            this._oKeyPad[i] = 0x5C ^ b;
		            iKeyPad[i] = 0x36 ^ b;
		        }
		        this._sha512.update(iKeyPad);
		    }
		    /**
		     * Update the hash with the data.
		     * @param message The data to update the hash with.
		     * @returns The instance for chaining.
		     */
		    HmacSha512.prototype.update = function (message) {
		        this._sha512.update(message);
		        return this;
		    };
		    /**
		     * Get the digest.
		     * @returns The digest.
		     */
		    HmacSha512.prototype.digest = function () {
		        var innerHash = this._sha512.digest();
		        var finalSha512 = new sha512.Sha512(this._bits);
		        finalSha512.update(this._oKeyPad);
		        finalSha512.update(innerHash);
		        return finalSha512.digest();
		    };
		    return HmacSha512;
		}());
		exports.HmacSha512 = HmacSha512;

		});

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
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Slip0010 = void 0;
		/* eslint-disable no-bitwise */
		var nacl = __importStar(naclFast);


		/**
		 * Class to help with slip0010 key derivation.
		 * https://github.com/satoshilabs/slips/blob/master/slip-0010.md
		 */
		var Slip0010 = /** @class */ (function () {
		    function Slip0010() {
		    }
		    /**
		     * Get the master key from the seed.
		     * @param seed The seed to generate the master key from.
		     * @returns The key and chain code.
		     */
		    Slip0010.getMasterKeyFromSeed = function (seed) {
		        var hmac = new hmacSha512.HmacSha512(converter.Converter.asciiToBytes("ed25519 seed"));
		        var fullKey = hmac.update(seed).digest();
		        return {
		            privateKey: Uint8Array.from(fullKey.slice(0, 32)),
		            chainCode: Uint8Array.from(fullKey.slice(32))
		        };
		    };
		    /**
		     * Derive a key from the path.
		     * @param seed The seed.
		     * @param path The path.
		     * @returns The key and chain code.
		     */
		    Slip0010.derivePath = function (seed, path) {
		        var _a = Slip0010.getMasterKeyFromSeed(seed), privateKey = _a.privateKey, chainCode = _a.chainCode;
		        var segments = path.numberSegments();
		        for (var i = 0; i < segments.length; i++) {
		            var indexValue = 0x80000000 + segments[i];
		            var data = new Uint8Array(1 + privateKey.length + 4);
		            data[0] = 0;
		            data.set(privateKey, 1);
		            data[privateKey.length + 1] = indexValue >>> 24;
		            data[privateKey.length + 2] = indexValue >>> 16;
		            data[privateKey.length + 3] = indexValue >>> 8;
		            data[privateKey.length + 4] = indexValue & 0xFF;
		            // TS definition for create only accepts string
		            // in reality it accepts bytes, which is what we want to send
		            var fullKey = new hmacSha512.HmacSha512(chainCode)
		                .update(data)
		                .digest();
		            privateKey = Uint8Array.from(fullKey.slice(0, 32));
		            chainCode = Uint8Array.from(fullKey.slice(32));
		        }
		        return {
		            privateKey: privateKey,
		            chainCode: chainCode
		        };
		    };
		    /**
		     * Get the public key from the private key.
		     * @param privateKey The private key.
		     * @param withZeroByte Include a zero bute prefix.
		     * @returns The public key.
		     */
		    Slip0010.getPublicKey = function (privateKey, withZeroByte) {
		        if (withZeroByte === void 0) { withZeroByte = true; }
		        var keyPair = nacl.sign.keyPair.fromSeed(privateKey);
		        var signPk = keyPair.secretKey.slice(32);
		        if (withZeroByte) {
		            var arr = new Uint8Array(1 + signPk.length);
		            arr[0] = 0;
		            arr.set(signPk, 1);
		            return arr;
		        }
		        return signPk;
		    };
		    return Slip0010;
		}());
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
		var nacl = __importStar(naclFast);

		/**
		 * Class to help with seeds.
		 */
		var Ed25519Seed = /** @class */ (function () {
		    function Ed25519Seed() {
		        /**
		         * The secret key for the seed.
		         * @internal
		         */
		        this._secretKey = new Uint8Array();
		    }
		    /**
		     * Create a seed from the bytes.
		     * @param bytes The binary representation of the seed.
		     * @returns The seed.
		     */
		    Ed25519Seed.fromBytes = function (bytes) {
		        var seed = new Ed25519Seed();
		        seed._secretKey = bytes;
		        return seed;
		    };
		    /**
		     * Generate a new random seed.
		     * @returns The random seed.
		     */
		    Ed25519Seed.random = function () {
		        return Ed25519Seed.fromBytes(nacl.randomBytes(Ed25519Seed.SEED_SIZE_BYTES));
		    };
		    /**
		     * Get the key pair from the seed.
		     * @returns The key pair.
		     */
		    Ed25519Seed.prototype.keyPair = function () {
		        var signKeyPair = nacl.sign.keyPair.fromSeed(this._secretKey);
		        return {
		            publicKey: signKeyPair.publicKey,
		            privateKey: signKeyPair.secretKey
		        };
		    };
		    /**
		     * Generate a new seed from the path.
		     * @param path The path to generate the seed for.
		     * @returns The generated seed.
		     */
		    Ed25519Seed.prototype.generateSeedFromPath = function (path) {
		        var keys = slip0010.Slip0010.derivePath(this._secretKey, path);
		        return Ed25519Seed.fromBytes(keys.privateKey);
		    };
		    /**
		     * Return the key as bytes.
		     * @returns The key as bytes.
		     */
		    Ed25519Seed.prototype.toBytes = function () {
		        return this._secretKey;
		    };
		    /**
		     * SeedSize is the size, in bytes, of private key seeds.
		     * @internal
		     */
		    Ed25519Seed.SEED_SIZE_BYTES = 32;
		    return Ed25519Seed;
		}());
		exports.Ed25519Seed = Ed25519Seed;

		});

		var sha3 = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Sha3 = void 0;
		/* eslint-disable no-bitwise */
		/**
		 * Keccak implementation based on the following.
		 * https://keccak.team/keccak_specs_summary.html
		 * https://github.com/emn178/js-sha3
		 */
		var Sha3 = /** @class */ (function () {
		    /**
		     * Create a new instance of SHA3.
		     * @param bits The number of input bits.
		     * @param padding The padding to use.
		     * @param outputBits The number of output bits.
		     */
		    function Sha3(bits, padding, outputBits) {
		        this._padding = padding;
		        this._outputBits = outputBits;
		        this._blockCount = (1600 - (bits << 1)) >> 5;
		        this._byteCount = this._blockCount << 2;
		        this._outputBlocks = outputBits >> 5;
		        this._extraBytes = (outputBits & 31) >> 3;
		        this._reset = true;
		        this._block = 0;
		        this._start = 0;
		        this._blocks = new Uint32Array(this._blockCount + 1);
		        this._state = new Uint32Array(50);
		        this._lastByteIndex = 0;
		    }
		    /**
		     * Create instance of the sha3 algorithms.
		     * @param bits The number of bits to use.
		     * @returns An initialized instance of the Keccak algorithm,
		     */
		    Sha3.sha3 = function (bits) {
		        return new Sha3(bits, Sha3.SHA3_PADDING, bits);
		    };
		    /**
		     * Create instance of the keccak algorithms.
		     * @param bits The number of bits to use.
		     * @returns An initialized instance of the Keccak algorithm,
		     */
		    Sha3.keccak = function (bits) {
		        return new Sha3(bits, Sha3.KECCAK_PADDING, bits);
		    };
		    /**
		     * Reset the state.
		     */
		    Sha3.prototype.reset = function () {
		        this._reset = true;
		        this._block = 0;
		        this._start = 0;
		        this._blocks = new Uint32Array(this._blockCount + 1);
		        this._state = new Uint32Array(50);
		        this._lastByteIndex = 0;
		    };
		    /**
		     * Update the state.
		     * @param input Array of data to use in the update.
		     * @returns The this instance for chaining.
		     */
		    Sha3.prototype.update = function (input) {
		        var message = new Uint8Array(input);
		        var length = message.length;
		        var index = 0;
		        var i;
		        while (index < length) {
		            if (this._reset) {
		                this._reset = false;
		                this._blocks[0] = this._block;
		                for (i = 1; i < this._blockCount + 1; ++i) {
		                    this._blocks[i] = 0;
		                }
		            }
		            for (i = this._start; index < length && i < this._byteCount; ++index) {
		                this._blocks[i >> 2] |= message[index] << Sha3.SHIFT[i++ & 3];
		            }
		            this._lastByteIndex = i;
		            if (i >= this._byteCount) {
		                this._start = i - this._byteCount;
		                this._block = this._blocks[this._blockCount];
		                for (i = 0; i < this._blockCount; ++i) {
		                    this._state[i] ^= this._blocks[i];
		                }
		                this.keccakPermutation(this._state);
		                this._reset = true;
		            }
		            else {
		                this._start = i;
		            }
		        }
		        return this;
		    };
		    /**
		     * Finalize and return the hash for the digest, will also reset the state.
		     * @returns Array buffer containing the digest.
		     */
		    Sha3.prototype.digest = function () {
		        this.finalize();
		        var i = 0;
		        var j = 0;
		        var bytes = this._outputBits >> 3;
		        var buffer = new ArrayBuffer(this._extraBytes ? (this._outputBlocks + 1) << 2 : bytes);
		        var array = new Uint32Array(buffer);
		        while (j < this._outputBlocks) {
		            for (i = 0; i < this._blockCount && j < this._outputBlocks; ++i, ++j) {
		                array[j] = this._state[i];
		            }
		        }
		        if (this._extraBytes) {
		            array[i] = this._state[i];
		            buffer = buffer.slice(0, bytes);
		        }
		        this.reset();
		        return new Uint8Array(buffer);
		    };
		    /* @internal */
		    Sha3.prototype.finalize = function () {
		        var i = this._lastByteIndex;
		        this._blocks[i >> 2] |= this._padding[i & 3];
		        if (this._lastByteIndex === this._byteCount) {
		            this._blocks[0] = this._blocks[this._blockCount];
		            for (i = 1; i < this._blockCount + 1; ++i) {
		                this._blocks[i] = 0;
		            }
		        }
		        this._blocks[this._blockCount - 1] |= 0x80000000;
		        for (i = 0; i < this._blockCount; ++i) {
		            this._state[i] ^= this._blocks[i];
		        }
		        this.keccakPermutation(this._state);
		    };
		    /* @internal */
		    Sha3.prototype.keccakPermutation = function (s) {
		        var b = new Uint32Array(50);
		        var c = new Uint32Array(10);
		        var h;
		        var l;
		        var n;
		        for (n = 0; n < 48; n += 2) {
		            c[0] = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
		            c[1] = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
		            c[2] = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
		            c[3] = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
		            c[4] = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
		            c[5] = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
		            c[6] = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
		            c[7] = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
		            c[8] = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
		            c[9] = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
		            h = c[8] ^ ((c[2] << 1) | (c[3] >>> 31));
		            l = c[9] ^ ((c[3] << 1) | (c[2] >>> 31));
		            s[0] ^= h;
		            s[1] ^= l;
		            s[10] ^= h;
		            s[11] ^= l;
		            s[20] ^= h;
		            s[21] ^= l;
		            s[30] ^= h;
		            s[31] ^= l;
		            s[40] ^= h;
		            s[41] ^= l;
		            h = c[0] ^ ((c[4] << 1) | (c[5] >>> 31));
		            l = c[1] ^ ((c[5] << 1) | (c[4] >>> 31));
		            s[2] ^= h;
		            s[3] ^= l;
		            s[12] ^= h;
		            s[13] ^= l;
		            s[22] ^= h;
		            s[23] ^= l;
		            s[32] ^= h;
		            s[33] ^= l;
		            s[42] ^= h;
		            s[43] ^= l;
		            h = c[2] ^ ((c[6] << 1) | (c[7] >>> 31));
		            l = c[3] ^ ((c[7] << 1) | (c[6] >>> 31));
		            s[4] ^= h;
		            s[5] ^= l;
		            s[14] ^= h;
		            s[15] ^= l;
		            s[24] ^= h;
		            s[25] ^= l;
		            s[34] ^= h;
		            s[35] ^= l;
		            s[44] ^= h;
		            s[45] ^= l;
		            h = c[4] ^ ((c[8] << 1) | (c[9] >>> 31));
		            l = c[5] ^ ((c[9] << 1) | (c[8] >>> 31));
		            s[6] ^= h;
		            s[7] ^= l;
		            s[16] ^= h;
		            s[17] ^= l;
		            s[26] ^= h;
		            s[27] ^= l;
		            s[36] ^= h;
		            s[37] ^= l;
		            s[46] ^= h;
		            s[47] ^= l;
		            h = c[6] ^ ((c[0] << 1) | (c[1] >>> 31));
		            l = c[7] ^ ((c[1] << 1) | (c[0] >>> 31));
		            s[8] ^= h;
		            s[9] ^= l;
		            s[18] ^= h;
		            s[19] ^= l;
		            s[28] ^= h;
		            s[29] ^= l;
		            s[38] ^= h;
		            s[39] ^= l;
		            s[48] ^= h;
		            s[49] ^= l;
		            b[0] = s[0];
		            b[1] = s[1];
		            b[32] = (s[11] << 4) | (s[10] >>> 28);
		            b[33] = (s[10] << 4) | (s[11] >>> 28);
		            b[14] = (s[20] << 3) | (s[21] >>> 29);
		            b[15] = (s[21] << 3) | (s[20] >>> 29);
		            b[46] = (s[31] << 9) | (s[30] >>> 23);
		            b[47] = (s[30] << 9) | (s[31] >>> 23);
		            b[28] = (s[40] << 18) | (s[41] >>> 14);
		            b[29] = (s[41] << 18) | (s[40] >>> 14);
		            b[20] = (s[2] << 1) | (s[3] >>> 31);
		            b[21] = (s[3] << 1) | (s[2] >>> 31);
		            b[2] = (s[13] << 12) | (s[12] >>> 20);
		            b[3] = (s[12] << 12) | (s[13] >>> 20);
		            b[34] = (s[22] << 10) | (s[23] >>> 22);
		            b[35] = (s[23] << 10) | (s[22] >>> 22);
		            b[16] = (s[33] << 13) | (s[32] >>> 19);
		            b[17] = (s[32] << 13) | (s[33] >>> 19);
		            b[48] = (s[42] << 2) | (s[43] >>> 30);
		            b[49] = (s[43] << 2) | (s[42] >>> 30);
		            b[40] = (s[5] << 30) | (s[4] >>> 2);
		            b[41] = (s[4] << 30) | (s[5] >>> 2);
		            b[22] = (s[14] << 6) | (s[15] >>> 26);
		            b[23] = (s[15] << 6) | (s[14] >>> 26);
		            b[4] = (s[25] << 11) | (s[24] >>> 21);
		            b[5] = (s[24] << 11) | (s[25] >>> 21);
		            b[36] = (s[34] << 15) | (s[35] >>> 17);
		            b[37] = (s[35] << 15) | (s[34] >>> 17);
		            b[18] = (s[45] << 29) | (s[44] >>> 3);
		            b[19] = (s[44] << 29) | (s[45] >>> 3);
		            b[10] = (s[6] << 28) | (s[7] >>> 4);
		            b[11] = (s[7] << 28) | (s[6] >>> 4);
		            b[42] = (s[17] << 23) | (s[16] >>> 9);
		            b[43] = (s[16] << 23) | (s[17] >>> 9);
		            b[24] = (s[26] << 25) | (s[27] >>> 7);
		            b[25] = (s[27] << 25) | (s[26] >>> 7);
		            b[6] = (s[36] << 21) | (s[37] >>> 11);
		            b[7] = (s[37] << 21) | (s[36] >>> 11);
		            b[38] = (s[47] << 24) | (s[46] >>> 8);
		            b[39] = (s[46] << 24) | (s[47] >>> 8);
		            b[30] = (s[8] << 27) | (s[9] >>> 5);
		            b[31] = (s[9] << 27) | (s[8] >>> 5);
		            b[12] = (s[18] << 20) | (s[19] >>> 12);
		            b[13] = (s[19] << 20) | (s[18] >>> 12);
		            b[44] = (s[29] << 7) | (s[28] >>> 25);
		            b[45] = (s[28] << 7) | (s[29] >>> 25);
		            b[26] = (s[38] << 8) | (s[39] >>> 24);
		            b[27] = (s[39] << 8) | (s[38] >>> 24);
		            b[8] = (s[48] << 14) | (s[49] >>> 18);
		            b[9] = (s[49] << 14) | (s[48] >>> 18);
		            s[0] = b[0] ^ (~b[2] & b[4]);
		            s[1] = b[1] ^ (~b[3] & b[5]);
		            s[10] = b[10] ^ (~b[12] & b[14]);
		            s[11] = b[11] ^ (~b[13] & b[15]);
		            s[20] = b[20] ^ (~b[22] & b[24]);
		            s[21] = b[21] ^ (~b[23] & b[25]);
		            s[30] = b[30] ^ (~b[32] & b[34]);
		            s[31] = b[31] ^ (~b[33] & b[35]);
		            s[40] = b[40] ^ (~b[42] & b[44]);
		            s[41] = b[41] ^ (~b[43] & b[45]);
		            s[2] = b[2] ^ (~b[4] & b[6]);
		            s[3] = b[3] ^ (~b[5] & b[7]);
		            s[12] = b[12] ^ (~b[14] & b[16]);
		            s[13] = b[13] ^ (~b[15] & b[17]);
		            s[22] = b[22] ^ (~b[24] & b[26]);
		            s[23] = b[23] ^ (~b[25] & b[27]);
		            s[32] = b[32] ^ (~b[34] & b[36]);
		            s[33] = b[33] ^ (~b[35] & b[37]);
		            s[42] = b[42] ^ (~b[44] & b[46]);
		            s[43] = b[43] ^ (~b[45] & b[47]);
		            s[4] = b[4] ^ (~b[6] & b[8]);
		            s[5] = b[5] ^ (~b[7] & b[9]);
		            s[14] = b[14] ^ (~b[16] & b[18]);
		            s[15] = b[15] ^ (~b[17] & b[19]);
		            s[24] = b[24] ^ (~b[26] & b[28]);
		            s[25] = b[25] ^ (~b[27] & b[29]);
		            s[34] = b[34] ^ (~b[36] & b[38]);
		            s[35] = b[35] ^ (~b[37] & b[39]);
		            s[44] = b[44] ^ (~b[46] & b[48]);
		            s[45] = b[45] ^ (~b[47] & b[49]);
		            s[6] = b[6] ^ (~b[8] & b[0]);
		            s[7] = b[7] ^ (~b[9] & b[1]);
		            s[16] = b[16] ^ (~b[18] & b[10]);
		            s[17] = b[17] ^ (~b[19] & b[11]);
		            s[26] = b[26] ^ (~b[28] & b[20]);
		            s[27] = b[27] ^ (~b[29] & b[21]);
		            s[36] = b[36] ^ (~b[38] & b[30]);
		            s[37] = b[37] ^ (~b[39] & b[31]);
		            s[46] = b[46] ^ (~b[48] & b[40]);
		            s[47] = b[47] ^ (~b[49] & b[41]);
		            s[8] = b[8] ^ (~b[0] & b[2]);
		            s[9] = b[9] ^ (~b[1] & b[3]);
		            s[18] = b[18] ^ (~b[10] & b[12]);
		            s[19] = b[19] ^ (~b[11] & b[13]);
		            s[28] = b[28] ^ (~b[20] & b[22]);
		            s[29] = b[29] ^ (~b[21] & b[23]);
		            s[38] = b[38] ^ (~b[30] & b[32]);
		            s[39] = b[39] ^ (~b[31] & b[33]);
		            s[48] = b[48] ^ (~b[40] & b[42]);
		            s[49] = b[49] ^ (~b[41] & b[43]);
		            s[0] ^= Sha3.ROUND_CONSTANTS[n];
		            s[1] ^= Sha3.ROUND_CONSTANTS[n + 1];
		        }
		    };
		    /**
		     * Padding for Keccak algorithms
		     * @internal
		     */
		    Sha3.KECCAK_PADDING = new Uint32Array([
		        0x01,
		        0x100,
		        0x10000,
		        0x1000000
		    ]);
		    /**
		     * Padding for sha3 algorithms.
		     * @internal
		     */
		    Sha3.SHA3_PADDING = new Uint32Array([
		        0x06,
		        0x600,
		        0x60000,
		        0x6000000
		    ]);
		    /**
		     * Shift.
		     * @internal
		     */
		    Sha3.SHIFT = new Uint8Array([0, 8, 16, 24]);
		    /**
		     * Round constants split into low/high pairs.
		     * @internal
		     */
		    Sha3.ROUND_CONSTANTS = new Uint32Array([
		        0x00000001,
		        0x00000000,
		        0x00008082,
		        0x00000000,
		        0x0000808A,
		        0x80000000,
		        0x80008000,
		        0x80000000,
		        0x0000808B,
		        0x00000000,
		        0x80000001,
		        0x00000000,
		        0x80008081,
		        0x80000000,
		        0x00008009,
		        0x80000000,
		        0x0000008A,
		        0x00000000,
		        0x00000088,
		        0x00000000,
		        0x80008009,
		        0x00000000,
		        0x8000000A,
		        0x00000000,
		        0x8000808B,
		        0x00000000,
		        0x0000008B,
		        0x80000000,
		        0x00008089,
		        0x80000000,
		        0x00008003,
		        0x80000000,
		        0x00008002,
		        0x80000000,
		        0x00000080,
		        0x80000000,
		        0x0000800A,
		        0x00000000,
		        0x8000000A,
		        0x80000000,
		        0x80008081,
		        0x80000000,
		        0x00008080,
		        0x80000000,
		        0x80000001,
		        0x00000000,
		        0x80008008,
		        0x80000000
		    ]);
		    return Sha3;
		}());
		exports.Sha3 = Sha3;

		});

		var getUnspentAddresses_1 = createCommonjsModule(function (module, exports) {
		var __awaiter = (commonjsGlobal$1 && commonjsGlobal$1.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		var __generator = (commonjsGlobal$1 && commonjsGlobal$1.__generator) || function (thisArg, body) {
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
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.getUnspentAddresses = void 0;


		/**
		 * Get all the unspent addresses.
		 * @param client The client to send the transfer with.
		 * @param seed The seed to use for address generation.
		 * @param basePath The base path to start looking for addresses.
		 * @param startIndex Optional start index for the wallet count address, defaults to 0.
		 * @param countLimit Limit the number of items to find.
		 * @returns All the unspent addresses.
		 */
		function getUnspentAddresses(client, seed, basePath, startIndex, countLimit) {
		    return __awaiter(this, void 0, void 0, function () {
		        var localStartIndex, localCountLimit, finished, allUnspent, addressKeyPair, address, addressResponse;
		        return __generator(this, function (_a) {
		            switch (_a.label) {
		                case 0:
		                    localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
		                    localCountLimit = countLimit !== null && countLimit !== void 0 ? countLimit : Number.MAX_SAFE_INTEGER;
		                    finished = false;
		                    allUnspent = [];
		                    _a.label = 1;
		                case 1:
		                    basePath.push(localStartIndex);
		                    addressKeyPair = seed.generateSeedFromPath(basePath).keyPair();
		                    basePath.pop();
		                    address = converter.Converter.bytesToHex(ed25519.Ed25519.publicKeyToAddress(addressKeyPair.publicKey));
		                    return [4 /*yield*/, client.address(address)];
		                case 2:
		                    addressResponse = _a.sent();
		                    // If there are no outputs for the address we have reached the
		                    // end of the used addresses
		                    if (addressResponse.count === 0) {
		                        finished = true;
		                    }
		                    else {
		                        allUnspent.push({
		                            address: address,
		                            index: localStartIndex,
		                            balance: addressResponse.balance
		                        });
		                        if (allUnspent.length === localCountLimit) {
		                            finished = true;
		                        }
		                    }
		                    localStartIndex++;
		                    _a.label = 3;
		                case 3:
		                    if (!finished) return [3 /*break*/, 1];
		                    _a.label = 4;
		                case 4: return [2 /*return*/, allUnspent];
		            }
		        });
		    });
		}
		exports.getUnspentAddresses = getUnspentAddresses;

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
		var __generator = (commonjsGlobal$1 && commonjsGlobal$1.__generator) || function (thisArg, body) {
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
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.getBalance = void 0;

		/**
		 * Get the balance for a list of addresses.
		 * @param client The client to send the transfer with.
		 * @param seed The seed.
		 * @param basePath The base path to start looking for addresses.
		 * @param startIndex The start index to generate from, defaults to 0.
		 * @returns The balance.
		 */
		function getBalance(client, seed, basePath, startIndex) {
		    if (startIndex === void 0) { startIndex = 0; }
		    return __awaiter(this, void 0, void 0, function () {
		        var allUnspent;
		        return __generator(this, function (_a) {
		            switch (_a.label) {
		                case 0: return [4 /*yield*/, getUnspentAddresses_1.getUnspentAddresses(client, seed, basePath, startIndex)];
		                case 1:
		                    allUnspent = _a.sent();
		                    return [2 /*return*/, allUnspent.reduce(function (total, output) { return total + output.balance; }, 0)];
		            }
		        });
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
		var __generator = (commonjsGlobal$1 && commonjsGlobal$1.__generator) || function (thisArg, body) {
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
		    return __awaiter(this, void 0, void 0, function () {
		        var allUnspent;
		        return __generator(this, function (_a) {
		            switch (_a.label) {
		                case 0: return [4 /*yield*/, getUnspentAddresses_1.getUnspentAddresses(client, seed, basePath, startIndex, 1)];
		                case 1:
		                    allUnspent = _a.sent();
		                    return [2 /*return*/, allUnspent.length > 0 ? allUnspent[0] : undefined];
		            }
		        });
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
		var __generator = (commonjsGlobal$1 && commonjsGlobal$1.__generator) || function (thisArg, body) {
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
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.retrieveData = void 0;

		/**
		 * Retrieve a data message.
		 * @param client The client to send the transfer with.
		 * @param messageId The message id of the data to get.
		 * @returns The message index and data.
		 */
		function retrieveData(client, messageId) {
		    return __awaiter(this, void 0, void 0, function () {
		        var message, indexationPayload;
		        return __generator(this, function (_a) {
		            switch (_a.label) {
		                case 0: return [4 /*yield*/, client.message(messageId)];
		                case 1:
		                    message = _a.sent();
		                    if (message === null || message === void 0 ? void 0 : message.payload) {
		                        indexationPayload = void 0;
		                        if (message.payload.type === 0) {
		                            indexationPayload = message.payload.essence.payload;
		                        }
		                        else if (message.payload.type === 2) {
		                            indexationPayload = message.payload;
		                        }
		                        if (indexationPayload) {
		                            return [2 /*return*/, {
		                                    index: indexationPayload.index,
		                                    data: converter.Converter.hexToBytes(indexationPayload.data)
		                                }];
		                        }
		                    }
		                    return [2 /*return*/];
		            }
		        });
		    });
		}
		exports.retrieveData = retrieveData;

		});

		var writeStream = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.WriteStream = void 0;
		/* eslint-disable no-bitwise */


		/**
		 * Keep track of the write index within a stream.
		 */
		var WriteStream = /** @class */ (function () {
		    /**
		     * Create a new instance of ReadStream.
		     */
		    function WriteStream() {
		        this._storage = new Uint8Array(WriteStream.CHUNK_SIZE);
		        this._writeIndex = 0;
		    }
		    /**
		     * Get the length of the stream.
		     * @returns The stream length.
		     */
		    WriteStream.prototype.length = function () {
		        return this._storage.length;
		    };
		    /**
		     * How much unused data is there.
		     * @returns The amount of unused data.
		     */
		    WriteStream.prototype.unused = function () {
		        return this._storage.length - this._writeIndex;
		    };
		    /**
		     * Get the final stream as bytes.
		     * @returns The final stream.
		     */
		    WriteStream.prototype.finalBytes = function () {
		        return this._storage.subarray(0, this._writeIndex);
		    };
		    /**
		     * Get the final stream as hex.
		     * @returns The final stream as hex.
		     */
		    WriteStream.prototype.finalHex = function () {
		        return converter.Converter.bytesToHex(this._storage.subarray(0, this._writeIndex));
		    };
		    /**
		     * Get the current write index.
		     * @returns The current write index.
		     */
		    WriteStream.prototype.getWriteIndex = function () {
		        return this._writeIndex;
		    };
		    /**
		     * Set the current write index.
		     * @param writeIndex The current write index.
		     */
		    WriteStream.prototype.setWriteIndex = function (writeIndex) {
		        this._writeIndex = writeIndex;
		    };
		    /**
		     * Write fixed length stream.
		     * @param name The name of the data we are trying to write.
		     * @param length The length of the data to write.
		     * @param val The data to write.
		     */
		    WriteStream.prototype.writeFixedHex = function (name, length, val) {
		        if (!common.isHex(val)) {
		            throw new Error("The " + val + " should be in hex format");
		        }
		        // Hex should be twice the length as each byte is 2 ascii characters
		        if (length * 2 !== val.length) {
		            throw new Error(name + " length " + val.length + " does not match expected length " + length * 2);
		        }
		        this.expand(length);
		        this._storage.set(converter.Converter.hexToBytes(val), this._writeIndex);
		        this._writeIndex += length;
		    };
		    /**
		     * Write fixed length stream.
		     * @param name The name of the data we are trying to write.
		     * @param length The length of the data to write.
		     * @param val The data to write.
		     */
		    WriteStream.prototype.writeBytes = function (name, length, val) {
		        this.expand(length);
		        this._storage.set(val, this._writeIndex);
		        this._writeIndex += length;
		    };
		    /**
		     * Write a byte to the stream.
		     * @param name The name of the data we are trying to write.
		     * @param val The data to write.
		     */
		    WriteStream.prototype.writeByte = function (name, val) {
		        this.expand(1);
		        this._storage[this._writeIndex++] = val & 0xFF;
		    };
		    /**
		     * Write a UInt16 to the stream.
		     * @param name The name of the data we are trying to write.
		     * @param val The data to write.
		     */
		    WriteStream.prototype.writeUInt16 = function (name, val) {
		        this.expand(2);
		        this._storage[this._writeIndex++] = val & 0xFF;
		        this._storage[this._writeIndex++] = val >>> 8;
		    };
		    /**
		     * Write a UInt32 to the stream.
		     * @param name The name of the data we are trying to write.
		     * @param val The data to write.
		     */
		    WriteStream.prototype.writeUInt32 = function (name, val) {
		        this.expand(4);
		        this._storage[this._writeIndex++] = val & 0xFF;
		        this._storage[this._writeIndex++] = val >>> 8;
		        this._storage[this._writeIndex++] = val >>> 16;
		        this._storage[this._writeIndex++] = val >>> 24;
		    };
		    /**
		     * Write a UInt64 to the stream.
		     * @param name The name of the data we are trying to write.
		     * @param val The data to write.
		     */
		    WriteStream.prototype.writeUInt64 = function (name, val) {
		        this.expand(8);
		        var hex = val.toString(16).padStart(16, "0");
		        var arr = converter.Converter.hexToBytes(hex, true);
		        this._storage.set(arr, this._writeIndex);
		        this._writeIndex += 8;
		    };
		    /**
		     * Write a string to the stream.
		     * @param name The name of the data we are trying to write.
		     * @param val The data to write.
		     * @returns The string.
		     */
		    WriteStream.prototype.writeString = function (name, val) {
		        this.writeUInt16(name, val.length);
		        this.expand(val.length);
		        this._storage.set(converter.Converter.asciiToBytes(val), this._writeIndex);
		        this._writeIndex += val.length;
		        return val;
		    };
		    /**
		     * Expand the storage if there is not enough spave.
		     * @param additional The amount of space needed.
		     */
		    WriteStream.prototype.expand = function (additional) {
		        if (this._writeIndex + additional > this._storage.byteLength) {
		            var newArr = new Uint8Array(this._storage.length + WriteStream.CHUNK_SIZE);
		            newArr.set(this._storage, 0);
		            this._storage = newArr;
		        }
		    };
		    /**
		     * Chunk size to expand the storage.
		     * @internal
		     */
		    WriteStream.CHUNK_SIZE = 4096;
		    return WriteStream;
		}());
		exports.WriteStream = WriteStream;

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
		var __generator = (commonjsGlobal$1 && commonjsGlobal$1.__generator) || function (thisArg, body) {
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
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.sendAdvanced = void 0;






		/**
		 * Send a transfer from the balance on the seed.
		 * @param client The client to send the transfer with.
		 * @param seed The seed to use for address generation.
		 * @param basePath The base path to start looking for addresses.
		 * @param outputs The outputs to send.
		 * @param startIndex Optional start index for the wallet count address, defaults to 0.
		 * @param indexationKey Optional indexation key.
		 * @param indexationData Optional index data.
		 * @returns The id of the message created and the remainder address if one was needed.
		 */
		function sendAdvanced(client, seed, basePath, outputs, startIndex, indexationKey, indexationData) {
		    return __awaiter(this, void 0, void 0, function () {
		        var requiredBalance, localStartIndex, consumedBalance, inputsAndSignatureKeyPairs, finished, addressKeyPair, address, addressOutputIds, _i, _a, addressOutputId, addressOutput, input$1, writeStream$1, outputsWithSerialization, _b, outputs_1, output$1, sigLockedOutput, writeStream$1, sortedInputs, sortedOutputs, transactionEssence, binaryEssence, essenceFinal, unlockBlocks, addressToUnlockBlock, _c, sortedInputs_1, input$1, hexInputAddressPublic, transactionPayload, tips, message, messageId;
		        return __generator(this, function (_d) {
		            switch (_d.label) {
		                case 0:
		                    if (!outputs || outputs.length === 0) {
		                        throw new Error("You must specify some outputs");
		                    }
		                    requiredBalance = outputs.reduce(function (total, output) { return total + output.amount; }, 0);
		                    localStartIndex = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
		                    consumedBalance = 0;
		                    inputsAndSignatureKeyPairs = [];
		                    finished = false;
		                    _d.label = 1;
		                case 1:
		                    basePath.push(localStartIndex);
		                    addressKeyPair = seed.generateSeedFromPath(basePath).keyPair();
		                    basePath.pop();
		                    address = converter.Converter.bytesToHex(ed25519.Ed25519.publicKeyToAddress(addressKeyPair.publicKey));
		                    return [4 /*yield*/, client.addressOutputs(address)];
		                case 2:
		                    addressOutputIds = _d.sent();
		                    if (!(addressOutputIds.count === 0)) return [3 /*break*/, 3];
		                    finished = true;
		                    return [3 /*break*/, 7];
		                case 3:
		                    _i = 0, _a = addressOutputIds.outputIds;
		                    _d.label = 4;
		                case 4:
		                    if (!(_i < _a.length)) return [3 /*break*/, 7];
		                    addressOutputId = _a[_i];
		                    return [4 /*yield*/, client.output(addressOutputId)];
		                case 5:
		                    addressOutput = _d.sent();
		                    if (!addressOutput.isSpent &&
		                        consumedBalance < requiredBalance) {
		                        if (addressOutput.output.amount === 0) {
		                            finished = true;
		                        }
		                        else {
		                            consumedBalance += addressOutput.output.amount;
		                            input$1 = {
		                                type: 0,
		                                transactionId: addressOutput.transactionId,
		                                transactionOutputIndex: addressOutput.outputIndex
		                            };
		                            writeStream$1 = new writeStream.WriteStream();
		                            input.serializeInput(writeStream$1, input$1);
		                            inputsAndSignatureKeyPairs.push({
		                                input: input$1,
		                                addressKeyPair: addressKeyPair,
		                                serialized: writeStream$1.finalHex()
		                            });
		                            if (consumedBalance >= requiredBalance) {
		                                // We didn't use all the balance from the last input
		                                // so return the rest to the same address.
		                                if (consumedBalance - requiredBalance > 0) {
		                                    outputs.push({
		                                        amount: consumedBalance - requiredBalance,
		                                        address: address
		                                    });
		                                }
		                                finished = true;
		                            }
		                        }
		                    }
		                    _d.label = 6;
		                case 6:
		                    _i++;
		                    return [3 /*break*/, 4];
		                case 7:
		                    localStartIndex++;
		                    _d.label = 8;
		                case 8:
		                    if (!finished) return [3 /*break*/, 1];
		                    _d.label = 9;
		                case 9:
		                    if (consumedBalance < requiredBalance) {
		                        throw new Error("There are not enough funds in the inputs for the required balance");
		                    }
		                    outputsWithSerialization = [];
		                    for (_b = 0, outputs_1 = outputs; _b < outputs_1.length; _b++) {
		                        output$1 = outputs_1[_b];
		                        sigLockedOutput = {
		                            type: 0,
		                            address: {
		                                type: 1,
		                                address: output$1.address
		                            },
		                            amount: output$1.amount
		                        };
		                        writeStream$1 = new writeStream.WriteStream();
		                        output.serializeOutput(writeStream$1, sigLockedOutput);
		                        outputsWithSerialization.push({
		                            output: sigLockedOutput,
		                            serialized: writeStream$1.finalHex()
		                        });
		                    }
		                    sortedInputs = inputsAndSignatureKeyPairs.sort(function (a, b) { return a.serialized.localeCompare(b.serialized); });
		                    sortedOutputs = outputsWithSerialization.sort(function (a, b) { return a.serialized.localeCompare(b.serialized); });
		                    transactionEssence = {
		                        type: 0,
		                        inputs: sortedInputs.map(function (i) { return i.input; }),
		                        outputs: sortedOutputs.map(function (o) { return o.output; }),
		                        payload: indexationKey && indexationData
		                            ? {
		                                type: 2,
		                                index: indexationKey,
		                                data: converter.Converter.bytesToHex(indexationData)
		                            }
		                            : undefined
		                    };
		                    binaryEssence = new writeStream.WriteStream();
		                    transaction.serializeTransactionEssence(binaryEssence, transactionEssence);
		                    essenceFinal = binaryEssence.finalBytes();
		                    unlockBlocks = [];
		                    addressToUnlockBlock = {};
		                    for (_c = 0, sortedInputs_1 = sortedInputs; _c < sortedInputs_1.length; _c++) {
		                        input$1 = sortedInputs_1[_c];
		                        hexInputAddressPublic = converter.Converter.bytesToHex(input$1.addressKeyPair.publicKey);
		                        if (addressToUnlockBlock[hexInputAddressPublic]) {
		                            unlockBlocks.push({
		                                type: 1,
		                                reference: addressToUnlockBlock[hexInputAddressPublic].unlockIndex
		                            });
		                        }
		                        else {
		                            unlockBlocks.push({
		                                type: 0,
		                                signature: {
		                                    type: 1,
		                                    publicKey: hexInputAddressPublic,
		                                    signature: converter.Converter.bytesToHex(ed25519.Ed25519.signData(input$1.addressKeyPair.privateKey, essenceFinal))
		                                }
		                            });
		                            addressToUnlockBlock[hexInputAddressPublic] = {
		                                keyPair: input$1.addressKeyPair,
		                                unlockIndex: unlockBlocks.length - 1
		                            };
		                        }
		                    }
		                    transactionPayload = {
		                        type: 0,
		                        essence: transactionEssence,
		                        unlockBlocks: unlockBlocks
		                    };
		                    return [4 /*yield*/, client.tips()];
		                case 10:
		                    tips = _d.sent();
		                    message = {
		                        version: 1,
		                        parent1MessageId: tips.tip1MessageId,
		                        parent2MessageId: tips.tip2MessageId,
		                        payload: transactionPayload,
		                        nonce: 0
		                    };
		                    return [4 /*yield*/, client.messageSubmit(message)];
		                case 11:
		                    messageId = _d.sent();
		                    return [2 /*return*/, {
		                            messageId: messageId,
		                            message: message
		                        }];
		            }
		        });
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
		var __generator = (commonjsGlobal$1 && commonjsGlobal$1.__generator) || function (thisArg, body) {
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
		    return __awaiter(this, void 0, void 0, function () {
		        var response;
		        return __generator(this, function (_a) {
		            switch (_a.label) {
		                case 0: return [4 /*yield*/, sendAdvanced_1.sendAdvanced(client, seed, basePath, [{ address: address, amount: amount }], startIndex)];
		                case 1:
		                    response = _a.sent();
		                    return [2 /*return*/, {
		                            messageId: response.messageId,
		                            message: response.message
		                        }];
		            }
		        });
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
		var __generator = (commonjsGlobal$1 && commonjsGlobal$1.__generator) || function (thisArg, body) {
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
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.sendData = void 0;

		/**
		 * Send a data message.
		 * @param client The client to send the transfer with.
		 * @param indexationKey The index name.
		 * @param indexationData The index data.
		 * @returns The id of the message created and the message.
		 */
		function sendData(client, indexationKey, indexationData) {
		    return __awaiter(this, void 0, void 0, function () {
		        var indexationPayload, tips, message, messageId;
		        return __generator(this, function (_a) {
		            switch (_a.label) {
		                case 0:
		                    indexationPayload = {
		                        type: 2,
		                        index: indexationKey,
		                        data: converter.Converter.bytesToHex(indexationData)
		                    };
		                    return [4 /*yield*/, client.tips()];
		                case 1:
		                    tips = _a.sent();
		                    message = {
		                        version: 1,
		                        parent1MessageId: tips.tip1MessageId,
		                        parent2MessageId: tips.tip2MessageId,
		                        payload: indexationPayload,
		                        nonce: 0
		                    };
		                    return [4 /*yield*/, client.messageSubmit(message)];
		                case 2:
		                    messageId = _a.sent();
		                    return [2 /*return*/, {
		                            message: message,
		                            messageId: messageId
		                        }];
		            }
		        });
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

		var bech32Helper = createCommonjsModule(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Bech32Helper = void 0;
		/* eslint-disable no-bitwise */

		/**
		 * Convert address to bech32.
		 */
		var Bech32Helper = /** @class */ (function () {
		    function Bech32Helper() {
		    }
		    /**
		     * Encode an address to bech32.
		     * @param addressType The address type to encode.
		     * @param addressBytes The address bytes to encode.
		     * @returns The array formated as hex.
		     */
		    Bech32Helper.toBech32 = function (addressType, addressBytes) {
		        var addressData = new Uint8Array(1 + addressBytes.length);
		        addressData[0] = addressType;
		        addressData.set(addressBytes, 1);
		        return bech32.Bech32.encode(Bech32Helper.BECH32_HRP, addressData);
		    };
		    /**
		     * Decode an address from bech32.
		     * @param bech32Text The bech32 text to decode.
		     * @returns The address type and address bytes or undefined if it cannot be decoded.
		     */
		    Bech32Helper.fromBech32 = function (bech32Text) {
		        var decoded = bech32.Bech32.decode(bech32Text);
		        if (decoded) {
		            if (decoded.humanReadablePart !== Bech32Helper.BECH32_HRP) {
		                throw new Error("The hrp part of the address should be " + Bech32Helper.BECH32_HRP + ", it is " + decoded.humanReadablePart);
		            }
		            if (decoded.data.length === 0) {
		                throw new Error("The data part of the address should be at least length 1, it is 0");
		            }
		            var addressType = decoded.data[0];
		            var addressBytes = decoded.data.slice(1);
		            return {
		                addressType: addressType,
		                addressBytes: addressBytes
		            };
		        }
		    };
		    /**
		     * Does the provided string look like it might be an bech32 address with matching hrp.
		     * @param bech32Text The bech32 text to text.
		     * @returns True.
		     */
		    Bech32Helper.matches = function (bech32Text) {
		        return bech32.Bech32.matches(Bech32Helper.BECH32_HRP, bech32Text);
		    };
		    /**
		     * The human readable part of the bech32 addresses.
		     */
		    Bech32Helper.BECH32_HRP = "iot";
		    return Bech32Helper;
		}());
		exports.Bech32Helper = Bech32Helper;

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
		var logger = function (message, data) {
		    return (data !== undefined ? console.log(message, data) : console.log(message));
		};
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
		    logger(prefix + "\tVersion:", message.version);
		    logger(prefix + "\tParent 1 Message Id:", message.parent1MessageId);
		    logger(prefix + "\tParent 2 Message Id:", message.parent2MessageId);
		    logPayload(prefix + "\t", message.payload);
		    if (message.nonce !== undefined) {
		        logger(prefix + "\tNonce:", message.nonce);
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
		            var payload = unknownPayload;
		            logger(prefix + "Transaction Payload");
		            if (payload.essence.type === 0) {
		                if (payload.essence.inputs) {
		                    logger(prefix + "\tInputs:", payload.essence.inputs.length);
		                    for (var _i = 0, _a = payload.essence.inputs; _i < _a.length; _i++) {
		                        var input = _a[_i];
		                        logInput(prefix + "\t\t", input);
		                    }
		                }
		                if (payload.essence.outputs) {
		                    logger(prefix + "\tOutputs:", payload.essence.outputs.length);
		                    for (var _b = 0, _c = payload.essence.outputs; _b < _c.length; _b++) {
		                        var output = _c[_b];
		                        logOutput(prefix + "\t\t", output);
		                    }
		                }
		                logPayload(prefix + "\t", payload.essence.payload);
		            }
		            if (payload.unlockBlocks) {
		                logger(prefix + "\tUnlock Blocks:", payload.unlockBlocks.length);
		                for (var _d = 0, _e = payload.unlockBlocks; _d < _e.length; _d++) {
		                    var unlockBlock = _e[_d];
		                    logUnlockBlock(prefix + "\t\t", unlockBlock);
		                }
		            }
		        }
		        else if (unknownPayload.type === 1) {
		            var payload = unknownPayload;
		            logger(prefix + "Milestone Payload");
		            logger(prefix + "\tIndex:", payload.index);
		            logger(prefix + "\tTimestamp:", payload.timestamp);
		            logger(prefix + "\tInclusion Merkle Proof:", payload.inclusionMerkleProof);
		            logger(prefix + "\tSignatures:", payload.signatures);
		        }
		        else if (unknownPayload.type === 2) {
		            var payload = unknownPayload;
		            logger(prefix + "Indexation Payload");
		            logger(prefix + "\tIndex:", payload.index);
		            logger(prefix + "\tData:", converter.Converter.hexToAscii(payload.data));
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
		            var address = unknownAddress;
		            logger(prefix + "Ed25519 Address");
		            logger(prefix + "\tAddress:", address.address);
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
		            var signature = unknownSignature;
		            logger(prefix + "Ed25519 Signature");
		            logger(prefix + "\tPublic Key:", signature.publicKey);
		            logger(prefix + "\tSignature:", signature.signature);
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
		            var input = unknownInput;
		            logger(prefix + "UTXO Input");
		            logger(prefix + "\tTransaction Id:", input.transactionId);
		            logger(prefix + "\tTransaction Output Index:", input.transactionOutputIndex);
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
		            var output = unknownOutput;
		            logger(prefix + "Signature Locked Single Output");
		            logAddress(prefix + "\t\t", output.address);
		            logger(prefix + "\t\tAmount:", output.amount);
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
		            var unlockBlock = unknownUnlockBlock;
		            logger(prefix + "\tSignature Unlock Block");
		            logSignature(prefix + "\t\t\t", unlockBlock.signature);
		        }
		        else if (unknownUnlockBlock.type === 1) {
		            var unlockBlock = unknownUnlockBlock;
		            logger(prefix + "\tReference Unlock Block");
		            logger(prefix + "\t\tReference:", unlockBlock.reference);
		        }
		    }
		}
		exports.logUnlockBlock = logUnlockBlock;

		});

		var readStream = createCommonjsModule(function (module, exports) {
		/* eslint-disable no-bitwise */
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.ReadStream = void 0;

		/**
		 * Keep track of the read index within a stream.
		 */
		var ReadStream = /** @class */ (function () {
		    /**
		     * Create a new instance of ReadStream.
		     * @param storage The data to access.
		     * @param readStartIndex The index to start the reading from.
		     */
		    function ReadStream(storage, readStartIndex) {
		        if (readStartIndex === void 0) { readStartIndex = 0; }
		        this._storage = new Uint8Array(storage);
		        this._readIndex = readStartIndex;
		    }
		    /**
		     * Get the length of the storage.
		     * @returns The storage length.
		     */
		    ReadStream.prototype.length = function () {
		        return this._storage.byteLength;
		    };
		    /**
		     * Does the storage have enough data remaining.
		     * @param remaining The amount of space needed.
		     * @returns True if it has enough data.
		     */
		    ReadStream.prototype.hasRemaining = function (remaining) {
		        return this._readIndex + remaining <= this._storage.byteLength;
		    };
		    /**
		     * How much unused data is there.
		     * @returns The amount of unused data.
		     */
		    ReadStream.prototype.unused = function () {
		        return this._storage.byteLength - this._readIndex;
		    };
		    /**
		     * Read fixed length as hex.
		     * @param name The name of the data we are trying to read.
		     * @param length The length of the data to read.
		     * @param moveIndex Move the index pointer on.
		     * @returns The hex formatted data.
		     */
		    ReadStream.prototype.readFixedHex = function (name, length, moveIndex) {
		        if (moveIndex === void 0) { moveIndex = true; }
		        if (!this.hasRemaining(length)) {
		            throw new Error(name + " length " + length + " exceeds the remaining data " + this.unused());
		        }
		        var hex = converter.Converter.bytesToHex(this._storage, this._readIndex, length);
		        if (moveIndex) {
		            this._readIndex += length;
		        }
		        return hex;
		    };
		    /**
		     * Read an array of byte from the stream.
		     * @param name The name of the data we are trying to read.
		     * @param length The length of the array to read.
		     * @param moveIndex Move the index pointer on.
		     * @returns The value.
		     */
		    ReadStream.prototype.readBytes = function (name, length, moveIndex) {
		        if (moveIndex === void 0) { moveIndex = true; }
		        if (!this.hasRemaining(length)) {
		            throw new Error(name + " length " + length + " exceeds the remaining data " + this.unused());
		        }
		        var val = this._storage.slice(this._readIndex, this._readIndex + length);
		        if (moveIndex) {
		            this._readIndex += length;
		        }
		        return val;
		    };
		    /**
		     * Read a byte from the stream.
		     * @param name The name of the data we are trying to read.
		     * @param moveIndex Move the index pointer on.
		     * @returns The value.
		     */
		    ReadStream.prototype.readByte = function (name, moveIndex) {
		        if (moveIndex === void 0) { moveIndex = true; }
		        if (!this.hasRemaining(1)) {
		            throw new Error(name + " length " + 1 + " exceeds the remaining data " + this.unused());
		        }
		        var val = this._storage[this._readIndex];
		        if (moveIndex) {
		            this._readIndex += 1;
		        }
		        return val;
		    };
		    /**
		     * Read a UInt16 from the stream.
		     * @param name The name of the data we are trying to read.
		     * @param moveIndex Move the index pointer on.
		     * @returns The value.
		     */
		    ReadStream.prototype.readUInt16 = function (name, moveIndex) {
		        if (moveIndex === void 0) { moveIndex = true; }
		        if (!this.hasRemaining(2)) {
		            throw new Error(name + " length " + 2 + " exceeds the remaining data " + this.unused());
		        }
		        var val = this._storage[this._readIndex] |
		            (this._storage[this._readIndex + 1] << 8);
		        if (moveIndex) {
		            this._readIndex += 2;
		        }
		        return val;
		    };
		    /**
		     * Read a UInt32 from the stream.
		     * @param name The name of the data we are trying to read.
		     * @param moveIndex Move the index pointer on.
		     * @returns The value.
		     */
		    ReadStream.prototype.readUInt32 = function (name, moveIndex) {
		        if (moveIndex === void 0) { moveIndex = true; }
		        if (!this.hasRemaining(4)) {
		            throw new Error(name + " length " + 4 + " exceeds the remaining data " + this.unused());
		        }
		        var val = (this._storage[this._readIndex]) |
		            (this._storage[this._readIndex + 1] * 0x100) |
		            (this._storage[this._readIndex + 2] * 0x10000) +
		                (this._storage[this._readIndex + 3] * 0x1000000);
		        if (moveIndex) {
		            this._readIndex += 4;
		        }
		        return val;
		    };
		    /**
		     * Read a UInt64 from the stream.
		     * @param name The name of the data we are trying to read.
		     * @param moveIndex Move the index pointer on.
		     * @returns The value.
		     */
		    ReadStream.prototype.readUInt64 = function (name, moveIndex) {
		        if (moveIndex === void 0) { moveIndex = true; }
		        if (!this.hasRemaining(8)) {
		            throw new Error(name + " length " + 8 + " exceeds the remaining data " + this.unused());
		        }
		        // We reverse the string conversion as this is LE
		        var val = BigInt("0x" + converter.Converter.bytesToHex(this._storage, this._readIndex, 8, true));
		        if (moveIndex) {
		            this._readIndex += 8;
		        }
		        return val;
		    };
		    /**
		     * Read a string from the stream.
		     * @param name The name of the data we are trying to read.
		     * @param moveIndex Move the index pointer on.
		     * @returns The string.
		     */
		    ReadStream.prototype.readString = function (name, moveIndex) {
		        if (moveIndex === void 0) { moveIndex = true; }
		        var stringLength = this.readUInt16(name);
		        if (!this.hasRemaining(stringLength)) {
		            throw new Error(name + " length " + stringLength + " exceeds the remaining data " + this.unused());
		        }
		        var val = converter.Converter.bytesToAscii(this._storage, this._readIndex, stringLength);
		        if (moveIndex) {
		            this._readIndex += stringLength;
		        }
		        return val;
		    };
		    return ReadStream;
		}());
		exports.ReadStream = ReadStream;

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
		__exportStar(clientError, exports);
		__exportStar(IAddress, exports);
		__exportStar(IAddressOutputs, exports);
		__exportStar(IChildren, exports);
		__exportStar(IClient, exports);
		__exportStar(IGossipMetrics, exports);
		__exportStar(IInfo, exports);
		__exportStar(IMessageId, exports);
		__exportStar(IMessageMetadata, exports);
		__exportStar(IMessages, exports);
		__exportStar(IMilestone, exports);
		__exportStar(IOutput, exports);
		__exportStar(IPeer, exports);
		__exportStar(IResponse, exports);
		__exportStar(ITips, exports);
		__exportStar(address, exports);
		__exportStar(common, exports);
		__exportStar(input, exports);
		__exportStar(message, exports);
		__exportStar(output, exports);
		__exportStar(payload, exports);
		__exportStar(signature, exports);
		__exportStar(transaction, exports);
		__exportStar(unlockBlock, exports);
		__exportStar(singleNodeClient, exports);
		__exportStar(bech32, exports);
		__exportStar(bip32Path, exports);
		__exportStar(blake2b, exports);
		__exportStar(ed25519, exports);
		__exportStar(ed25519Seed, exports);
		__exportStar(hmacSha512, exports);
		__exportStar(sha3, exports);
		__exportStar(sha512, exports);
		__exportStar(slip0010, exports);
		__exportStar(getBalance_1, exports);
		__exportStar(getUnspentAddress_1, exports);
		__exportStar(getUnspentAddresses_1, exports);
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
		__exportStar(bech32Helper, exports);
		__exportStar(converter, exports);
		__exportStar(logging, exports);
		__exportStar(readStream, exports);
		__exportStar(writeStream, exports);

		});

		var index_browser = createCommonjsModule(function (module, exports) {
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
		__exportStar(es, exports);

		});

		var index_browser$1 = /*@__PURE__*/getDefaultExportFromCjs(index_browser);

		return index_browser$1;

	})));
	});

	var curl = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Curl = void 0;
	/**
	 * Class to implement Curl sponge.
	 * @internal
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
	 * @internal
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
	/* @internal */
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
	 * @internal
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
	 * @internal
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
	 * @internal
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
	 * @internal
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
	 * @internal
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
	 * @internal
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
	 * @internal
	 */
	function digestFromSignature(hash, sig) {
	    const sponge = new curl.Curl(27);
	    const bytes = new Int8Array(sig.length);
	    for (let i = 0; i < (sig.length / curl.Curl.HASH_LENGTH); i++) {
	        let innerBytes = sig.slice(i * curl.Curl.HASH_LENGTH, (i + 1) * curl.Curl.HASH_LENGTH);
	        for (let j = 0; j < (hash[i * 3] + (hash[(i * 3) + 1] * 3) + (hash[(i * 3) + 2] * 9)) - MIN_TRYTE_VALUE; j++) {
	            sponge.reset();
	            sponge.absorb(innerBytes, 0, innerBytes.length);
	            innerBytes = sponge.rate();
	        }
	        bytes.set(innerBytes, i * curl.Curl.HASH_LENGTH);
	    }
	    sponge.reset();
	    sponge.absorb(bytes, 0, bytes.length);
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
	 * @internal
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
	 * @internal
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
	 * @internal
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
	/* @internal */
	const ZERO = new Int8Array([1, 0, 0, -1]);
	/* @internal */
	const RADIX = 3;
	/* @internal */
	const TRITS_PER_TRYTE = 3;
	/**
	 * Perform pascal encoding of the value.
	 * @param value The value to encode.
	 * @returns The trits for the encoded value.
	 * @internal
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
	 * @internal
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
	 * @internal
	 */
	function encodedLength(value) {
	    const length = roundThird(minTrits(Math.abs(value), 1));
	    return length + (length / RADIX);
	}
	/**
	 * Round the number to the third.
	 * @param value The value to round.
	 * @returns The rounded number.
	 * @internal
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
	 * @internal
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
	 * @internal
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
	 * @internal
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
	 * @internal
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
	 * @internal
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
	                curlScratchpadIndex += curlScratchpadIndex < 365 ? 364 : -365;
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
	 * @internal
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
	 * @internal
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
	 * @internal
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
	 * @internal
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
	 * @internal
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
	 * @internal
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
	        const data = new Uint8Array(1 + tagLength + mamMessage.payload.length);
	        data[0] = tagLength;
	        if (tag) {
	            data.set(iota2_browser.Converter.asciiToBytes(tag), 1);
	        }
	        data.set(iota2_browser.Converter.asciiToBytes(mamMessage.payload), 1 + tagLength);
	        const indexationPayload = {
	            type: 2,
	            index: mamMessage.address,
	            data: iota2_browser.Converter.bytesToHex(data)
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
	        try {
	            const messagesResponse = yield client.messagesFind(messageAddress);
	            const messages = [];
	            for (const messageId of messagesResponse.messageIds) {
	                try {
	                    const message = yield client.message(messageId);
	                    messages.push(message);
	                }
	                catch (_a) { }
	            }
	            return yield decodeMessages(messages, root, sideKey);
	        }
	        catch (_b) { }
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
	                const data = iota2_browser.Converter.hexToBytes(message.payload.data);
	                // We have a minimum size for the message payload
	                if (data.length > 100) {
	                    const tagLength = data[0];
	                    if (tagLength === 0 || tagLength > 27) {
	                        return;
	                    }
	                    const tag = iota2_browser.Converter.bytesToAscii(data.slice(1, 1 + tagLength));
	                    const msg = iota2_browser.Converter.bytesToAscii(data.slice(1 + tagLength));
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
