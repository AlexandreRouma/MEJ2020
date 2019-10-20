"use strict";
var r = n(4),
    i = n(5),
    a = n(6);

function o() {
    return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
}

function s(e, t) {
    if (o() < t) throw new RangeError("Invalid typed array length");
    return u.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = u.prototype : (null === e && (e = new u(t)), e.length = t), e
}

function u(e, t, n) {
    if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u)) return new u(e, t, n);
    if ("number" == typeof e) {
        if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
        return d(this, e)
    }
    return l(this, e, t, n)
}

function l(e, t, n, r) {
    if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
    return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function(e, t, n, r) {
        if (t.byteLength, n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");
        if (t.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
        return t = void 0 === n && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, n) : new Uint8Array(t, n, r), u.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = u.prototype : e = f(e, t), e
    }(e, t, n, r) : "string" == typeof t ? function(e, t, n) {
        if ("string" == typeof n && "" !== n || (n = "utf8"), !u.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
        var r = 0 | _(t, n),
            i = (e = s(e, r)).write(t, n);
        return i !== r && (e = e.slice(0, i)), e
    }(e, t, n) : function(e, t) {
        if (u.isBuffer(t)) {
            var n = 0 | p(t.length);
            return 0 === (e = s(e, n)).length ? e : (t.copy(e, 0, 0, n), e)
        }
        if (t) {
            if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (r = t.length) != r ? s(e, 0) : f(e, t);
            if ("Buffer" === t.type && a(t.data)) return f(e, t.data)
        }
        var r;
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
    }(e, t)
}

function c(e) {
    if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
    if (e < 0) throw new RangeError('"size" argument must not be negative')
}

function d(e, t) {
    if (c(t), e = s(e, t < 0 ? 0 : 0 | p(t)), !u.TYPED_ARRAY_SUPPORT)
        for (var n = 0; n < t; ++n) e[n] = 0;
    return e
}

function f(e, t) {
    var n = t.length < 0 ? 0 : 0 | p(t.length);
    e = s(e, n);
    for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
    return e
}

function p(e) {
    if (e >= o()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
    return 0 | e
}

function _(e, t) {
    if (u.isBuffer(e)) return e.length;
    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
    "string" != typeof e && (e = "" + e);
    var n = e.length;
    if (0 === n) return 0;
    for (var r = !1;;) switch (t) {
        case "ascii":
        case "latin1":
        case "binary":
            return n;
        case "utf8":
        case "utf-8":
        case void 0:
            return Y(e).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return 2 * n;
        case "hex":
            return n >>> 1;
        case "base64":
            return B(e).length;
        default:
            if (r) return Y(e).length;
            t = ("" + t).toLowerCase(), r = !0
    }
}

function h(e, t, n) {
    var r = !1;
    if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
    if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
    if ((n >>>= 0) <= (t >>>= 0)) return "";
    for (e || (e = "utf8");;) switch (e) {
        case "hex":
            return L(this, t, n);
        case "utf8":
        case "utf-8":
            return b(this, t, n);
        case "ascii":
            return C(this, t, n);
        case "latin1":
        case "binary":
            return R(this, t, n);
        case "base64":
            return O(this, t, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return D(this, t, n);
        default:
            if (r) throw new TypeError("Unknown encoding: " + e);
            e = (e + "").toLowerCase(), r = !0
    }
}

function E(e, t, n) {
    var r = e[t];
    e[t] = e[n], e[n] = r
}

function m(e, t, n, r, i) {
    if (0 === e.length) return -1;
    if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = i ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {
        if (i) return -1;
        n = e.length - 1
    } else if (n < 0) {
        if (!i) return -1;
        n = 0
    }
    if ("string" == typeof t && (t = u.from(t, r)), u.isBuffer(t)) return 0 === t.length ? -1 : g(e, t, n, r, i);
    if ("number" == typeof t) return t &= 255, u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : g(e, [t], n, r, i);
    throw new TypeError("val must be string, number or Buffer")
}

function g(e, t, n, r, i) {
    var a, o = 1,
        s = e.length,
        u = t.length;
    if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
        if (e.length < 2 || t.length < 2) return -1;
        o = 2, s /= 2, u /= 2, n /= 2
    }

    function l(e, t) {
        return 1 === o ? e[t] : e.readUInt16BE(t * o)
    }
    if (i) {
        var c = -1;
        for (a = n; a < s; a++)
            if (l(e, a) === l(t, -1 === c ? 0 : a - c)) {
                if (-1 === c && (c = a), a - c + 1 === u) return c * o
            } else -1 !== c && (a -= a - c), c = -1
    } else
        for (n + u > s && (n = s - u), a = n; a >= 0; a--) {
            for (var d = !0, f = 0; f < u; f++)
                if (l(e, a + f) !== l(t, f)) {
                    d = !1;
                    break
                } if (d) return a
        }
    return -1
}

function v(e, t, n, r) {
    n = Number(n) || 0;
    var i = e.length - n;
    r ? (r = Number(r)) > i && (r = i) : r = i;
    var a = t.length;
    if (a % 2 != 0) throw new TypeError("Invalid hex string");
    r > a / 2 && (r = a / 2);
    for (var o = 0; o < r; ++o) {
        var s = parseInt(t.substr(2 * o, 2), 16);
        if (isNaN(s)) return o;
        e[n + o] = s
    }
    return o
}

function T(e, t, n, r) {
    return H(Y(t, e.length - n), e, n, r)
}

function y(e, t, n, r) {
    return H(function(e) {
        for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
        return t
    }(t), e, n, r)
}

function I(e, t, n, r) {
    return y(e, t, n, r)
}

function S(e, t, n, r) {
    return H(B(t), e, n, r)
}

function A(e, t, n, r) {
    return H(function(e, t) {
        for (var n, r, i, a = [], o = 0; o < e.length && !((t -= 2) < 0); ++o) n = e.charCodeAt(o), r = n >> 8, i = n % 256, a.push(i), a.push(r);
        return a
    }(t, e.length - n), e, n, r)
}

function O(e, t, n) {
    return 0 === t && n === e.length ? r.fromByteArray(e) : r.fromByteArray(e.slice(t, n))
}

function b(e, t, n) {
    n = Math.min(e.length, n);
    for (var r = [], i = t; i < n;) {
        var a, o, s, u, l = e[i],
            c = null,
            d = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
        if (i + d <= n) switch (d) {
            case 1:
                l < 128 && (c = l);
                break;
            case 2:
                128 == (192 & (a = e[i + 1])) && (u = (31 & l) << 6 | 63 & a) > 127 && (c = u);
                break;
            case 3:
                a = e[i + 1], o = e[i + 2], 128 == (192 & a) && 128 == (192 & o) && (u = (15 & l) << 12 | (63 & a) << 6 | 63 & o) > 2047 && (u < 55296 || u > 57343) && (c = u);
                break;
            case 4:
                a = e[i + 1], o = e[i + 2], s = e[i + 3], 128 == (192 & a) && 128 == (192 & o) && 128 == (192 & s) && (u = (15 & l) << 18 | (63 & a) << 12 | (63 & o) << 6 | 63 & s) > 65535 && u < 1114112 && (c = u)
        }
        null === c ? (c = 65533, d = 1) : c > 65535 && (c -= 65536, r.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), r.push(c), i += d
    }
    return function(e) {
        var t = e.length;
        if (t <= N) return String.fromCharCode.apply(String, e);
        for (var n = "", r = 0; r < t;) n += String.fromCharCode.apply(String, e.slice(r, r += N));
        return n
    }(r)
}


t.Buffer = u, t.SlowBuffer = function(e) {
    return +e != e && (e = 0), u.alloc(+e)
}, t.INSPECT_MAX_BYTES = 50, u.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function() {
    try {
        var e = new Uint8Array(1);
        return e.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function() {
                return 42
            }
        }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
    } catch (e) {
        return !1
    }
}(), t.kMaxLength = o(), u.poolSize = 8192, u._augment = function(e) {
    return e.__proto__ = u.prototype, e
}, u.from = function(e, t, n) {
    return l(null, e, t, n)
}, u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype, u.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, {
    value: null,
    configurable: !0
})), u.alloc = function(e, t, n) {
    return function(e, t, n, r) {
        return c(t), t <= 0 ? s(e, t) : void 0 !== n ? "string" == typeof r ? s(e, t).fill(n, r) : s(e, t).fill(n) : s(e, t)
    }(null, e, t, n)
}, u.allocUnsafe = function(e) {
    return d(null, e)
}, u.allocUnsafeSlow = function(e) {
    return d(null, e)
}, u.isBuffer = function(e) {
    return !(null == e || !e._isBuffer)
}, u.compare = function(e, t) {
    if (!u.isBuffer(e) || !u.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
    if (e === t) return 0;
    for (var n = e.length, r = t.length, i = 0, a = Math.min(n, r); i < a; ++i)
        if (e[i] !== t[i]) {
            n = e[i], r = t[i];
            break
        } return n < r ? -1 : r < n ? 1 : 0
}, u.isEncoding = function(e) {
    switch (String(e).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return !0;
        default:
            return !1
    }
}, u.concat = function(e, t) {
    if (!a(e)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (0 === e.length) return u.alloc(0);
    var n;
    if (void 0 === t)
        for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
    var r = u.allocUnsafe(t),
        i = 0;
    for (n = 0; n < e.length; ++n) {
        var o = e[n];
        if (!u.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
        o.copy(r, i), i += o.length
    }
    return r
}, u.byteLength = _, u.prototype._isBuffer = !0, u.prototype.swap16 = function() {
    var e = this.length;
    if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var t = 0; t < e; t += 2) E(this, t, t + 1);
    return this
}, u.prototype.swap32 = function() {
    var e = this.length;
    if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var t = 0; t < e; t += 4) E(this, t, t + 3), E(this, t + 1, t + 2);
    return this
}, u.prototype.swap64 = function() {
    var e = this.length;
    if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var t = 0; t < e; t += 8) E(this, t, t + 7), E(this, t + 1, t + 6), E(this, t + 2, t + 5), E(this, t + 3, t + 4);
    return this
}, u.prototype.toString = function() {
    var e = 0 | this.length;
    return 0 === e ? "" : 0 === arguments.length ? b(this, 0, e) : h.apply(this, arguments)
}, u.prototype.equals = function(e) {
    if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
    return this === e || 0 === u.compare(this, e)
}, u.prototype.inspect = function() {
    var e = "",
        n = t.INSPECT_MAX_BYTES;
    return this.length > 0 && (e = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (e += " ... ")), "<Buffer " + e + ">"
}, u.prototype.compare = function(e, t, n, r, i) {
    if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
    if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), t < 0 || n > e.length || r < 0 || i > this.length) throw new RangeError("out of range index");
    if (r >= i && t >= n) return 0;
    if (r >= i) return -1;
    if (t >= n) return 1;
    if (this === e) return 0;
    for (var a = (i >>>= 0) - (r >>>= 0), o = (n >>>= 0) - (t >>>= 0), s = Math.min(a, o), l = this.slice(r, i), c = e.slice(t, n), d = 0; d < s; ++d)
        if (l[d] !== c[d]) {
            a = l[d], o = c[d];
            break
        } return a < o ? -1 : o < a ? 1 : 0
}, u.prototype.includes = function(e, t, n) {
    return -1 !== this.indexOf(e, t, n)
}, u.prototype.indexOf = function(e, t, n) {
    return m(this, e, t, n, !0)
}, u.prototype.lastIndexOf = function(e, t, n) {
    return m(this, e, t, n, !1)
}, u.prototype.write = function(e, t, n, r) {
    if (void 0 === t) r = "utf8", n = this.length, t = 0;
    else if (void 0 === n && "string" == typeof t) r = t, n = this.length, t = 0;
    else {
        if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        t |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
    }
    var i = this.length - t;
    if ((void 0 === n || n > i) && (n = i), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    r || (r = "utf8");
    for (var a = !1;;) switch (r) {
        case "hex":
            return v(this, e, t, n);
        case "utf8":
        case "utf-8":
            return T(this, e, t, n);
        case "ascii":
            return y(this, e, t, n);
        case "latin1":
        case "binary":
            return I(this, e, t, n);
        case "base64":
            return S(this, e, t, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return A(this, e, t, n);
        default:
            if (a) throw new TypeError("Unknown encoding: " + r);
            r = ("" + r).toLowerCase(), a = !0
    }
}, u.prototype.toJSON = function() {
    return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
    }
};
var N = 4096;

function C(e, t, n) {
    var r = "";
    n = Math.min(e.length, n);
    for (var i = t; i < n; ++i) r += String.fromCharCode(127 & e[i]);
    return r
}

function R(e, t, n) {
    var r = "";
    n = Math.min(e.length, n);
    for (var i = t; i < n; ++i) r += String.fromCharCode(e[i]);
    return r
}

function L(e, t, n) {
    var r, i = e.length;
    (!t || t < 0) && (t = 0), (!n || n < 0 || n > i) && (n = i);
    for (var a = "", o = t; o < n; ++o) a += (r = e[o]) < 16 ? "0" + r.toString(16) : r.toString(16);
    return a
}

function D(e, t, n) {
    for (var r = e.slice(t, n), i = "", a = 0; a < r.length; a += 2) i += String.fromCharCode(r[a] + 256 * r[a + 1]);
    return i
}

function P(e, t, n) {
    if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
    if (e + t > n) throw new RangeError("Trying to access beyond buffer length")
}

function M(e, t, n, r, i, a) {
    if (!u.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (t > i || t < a) throw new RangeError('"value" argument is out of bounds');
    if (n + r > e.length) throw new RangeError("Index out of range")
}

function w(e, t, n, r) {
    t < 0 && (t = 65535 + t + 1);
    for (var i = 0, a = Math.min(e.length - n, 2); i < a; ++i) e[n + i] = (t & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
}

function U(e, t, n, r) {
    t < 0 && (t = 4294967295 + t + 1);
    for (var i = 0, a = Math.min(e.length - n, 4); i < a; ++i) e[n + i] = t >>> 8 * (r ? i : 3 - i) & 255
}

function k(e, t, n, r, i, a) {
    if (n + r > e.length) throw new RangeError("Index out of range");
    if (n < 0) throw new RangeError("Index out of range")
}

function x(e, t, n, r, a) {
    return a || k(e, 0, n, 4), i.write(e, t, n, r, 23, 4), n + 4
}

function G(e, t, n, r, a) {
    return a || k(e, 0, n, 8), i.write(e, t, n, r, 52, 8), n + 8
}
u.prototype.slice = function(e, t) {
    var n, r = this.length;
    if ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e), u.TYPED_ARRAY_SUPPORT)(n = this.subarray(e, t)).__proto__ = u.prototype;
    else {
        var i = t - e;
        n = new u(i, void 0);
        for (var a = 0; a < i; ++a) n[a] = this[a + e]
    }
    return n
}, u.prototype.readUIntLE = function(e, t, n) {
    e |= 0, t |= 0, n || P(e, t, this.length);
    for (var r = this[e], i = 1, a = 0; ++a < t && (i *= 256);) r += this[e + a] * i;
    return r
}, u.prototype.readUIntBE = function(e, t, n) {
    e |= 0, t |= 0, n || P(e, t, this.length);
    for (var r = this[e + --t], i = 1; t > 0 && (i *= 256);) r += this[e + --t] * i;
    return r
}, u.prototype.readUInt8 = function(e, t) {
    return t || P(e, 1, this.length), this[e]
}, u.prototype.readUInt16LE = function(e, t) {
    return t || P(e, 2, this.length), this[e] | this[e + 1] << 8
}, u.prototype.readUInt16BE = function(e, t) {
    return t || P(e, 2, this.length), this[e] << 8 | this[e + 1]
}, u.prototype.readUInt32LE = function(e, t) {
    return t || P(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
}, u.prototype.readUInt32BE = function(e, t) {
    return t || P(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
}, u.prototype.readIntLE = function(e, t, n) {
    e |= 0, t |= 0, n || P(e, t, this.length);
    for (var r = this[e], i = 1, a = 0; ++a < t && (i *= 256);) r += this[e + a] * i;
    return r >= (i *= 128) && (r -= Math.pow(2, 8 * t)), r
}, u.prototype.readIntBE = function(e, t, n) {
    e |= 0, t |= 0, n || P(e, t, this.length);
    for (var r = t, i = 1, a = this[e + --r]; r > 0 && (i *= 256);) a += this[e + --r] * i;
    return a >= (i *= 128) && (a -= Math.pow(2, 8 * t)), a
}, u.prototype.readInt8 = function(e, t) {
    return t || P(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
}, u.prototype.readInt16LE = function(e, t) {
    t || P(e, 2, this.length);
    var n = this[e] | this[e + 1] << 8;
    return 32768 & n ? 4294901760 | n : n
}, u.prototype.readInt16BE = function(e, t) {
    t || P(e, 2, this.length);
    var n = this[e + 1] | this[e] << 8;
    return 32768 & n ? 4294901760 | n : n
}, u.prototype.readInt32LE = function(e, t) {
    return t || P(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
}, u.prototype.readInt32BE = function(e, t) {
    return t || P(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
}, u.prototype.readFloatLE = function(e, t) {
    return t || P(e, 4, this.length), i.read(this, e, !0, 23, 4)
}, u.prototype.readFloatBE = function(e, t) {
    return t || P(e, 4, this.length), i.read(this, e, !1, 23, 4)
}, u.prototype.readDoubleLE = function(e, t) {
    return t || P(e, 8, this.length), i.read(this, e, !0, 52, 8)
}, u.prototype.readDoubleBE = function(e, t) {
    return t || P(e, 8, this.length), i.read(this, e, !1, 52, 8)
}, u.prototype.writeUIntLE = function(e, t, n, r) {
    e = +e, t |= 0, n |= 0, r || M(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
    var i = 1,
        a = 0;
    for (this[t] = 255 & e; ++a < n && (i *= 256);) this[t + a] = e / i & 255;
    return t + n
}, u.prototype.writeUIntBE = function(e, t, n, r) {
    e = +e, t |= 0, n |= 0, r || M(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
    var i = n - 1,
        a = 1;
    for (this[t + i] = 255 & e; --i >= 0 && (a *= 256);) this[t + i] = e / a & 255;
    return t + n
}, u.prototype.writeUInt8 = function(e, t, n) {
    return e = +e, t |= 0, n || M(this, e, t, 1, 255, 0), u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
}, u.prototype.writeUInt16LE = function(e, t, n) {
    return e = +e, t |= 0, n || M(this, e, t, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : w(this, e, t, !0), t + 2
}, u.prototype.writeUInt16BE = function(e, t, n) {
    return e = +e, t |= 0, n || M(this, e, t, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : w(this, e, t, !1), t + 2
}, u.prototype.writeUInt32LE = function(e, t, n) {
    return e = +e, t |= 0, n || M(this, e, t, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : U(this, e, t, !0), t + 4
}, u.prototype.writeUInt32BE = function(e, t, n) {
    return e = +e, t |= 0, n || M(this, e, t, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : U(this, e, t, !1), t + 4
}, u.prototype.writeIntLE = function(e, t, n, r) {
    if (e = +e, t |= 0, !r) {
        var i = Math.pow(2, 8 * n - 1);
        M(this, e, t, n, i - 1, -i)
    }
    var a = 0,
        o = 1,
        s = 0;
    for (this[t] = 255 & e; ++a < n && (o *= 256);) e < 0 && 0 === s && 0 !== this[t + a - 1] && (s = 1), this[t + a] = (e / o >> 0) - s & 255;
    return t + n
}, u.prototype.writeIntBE = function(e, t, n, r) {
    if (e = +e, t |= 0, !r) {
        var i = Math.pow(2, 8 * n - 1);
        M(this, e, t, n, i - 1, -i)
    }
    var a = n - 1,
        o = 1,
        s = 0;
    for (this[t + a] = 255 & e; --a >= 0 && (o *= 256);) e < 0 && 0 === s && 0 !== this[t + a + 1] && (s = 1), this[t + a] = (e / o >> 0) - s & 255;
    return t + n
}, u.prototype.writeInt8 = function(e, t, n) {
    return e = +e, t |= 0, n || M(this, e, t, 1, 127, -128), u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
}, u.prototype.writeInt16LE = function(e, t, n) {
    return e = +e, t |= 0, n || M(this, e, t, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : w(this, e, t, !0), t + 2
}, u.prototype.writeInt16BE = function(e, t, n) {
    return e = +e, t |= 0, n || M(this, e, t, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : w(this, e, t, !1), t + 2
}, u.prototype.writeInt32LE = function(e, t, n) {
    return e = +e, t |= 0, n || M(this, e, t, 4, 2147483647, -2147483648), u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : U(this, e, t, !0), t + 4
}, u.prototype.writeInt32BE = function(e, t, n) {
    return e = +e, t |= 0, n || M(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : U(this, e, t, !1), t + 4
}, u.prototype.writeFloatLE = function(e, t, n) {
    return x(this, e, t, !0, n)
}, u.prototype.writeFloatBE = function(e, t, n) {
    return x(this, e, t, !1, n)
}, u.prototype.writeDoubleLE = function(e, t, n) {
    return G(this, e, t, !0, n)
}, u.prototype.writeDoubleBE = function(e, t, n) {
    return G(this, e, t, !1, n)
}, u.prototype.copy = function(e, t, n, r) {
    if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < n && (r = n), r === n) return 0;
    if (0 === e.length || 0 === this.length) return 0;
    if (t < 0) throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
    if (r < 0) throw new RangeError("sourceEnd out of bounds");
    r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);
    var i, a = r - n;
    if (this === e && n < t && t < r)
        for (i = a - 1; i >= 0; --i) e[i + t] = this[i + n];
    else if (a < 1e3 || !u.TYPED_ARRAY_SUPPORT)
        for (i = 0; i < a; ++i) e[i + t] = this[i + n];
    else Uint8Array.prototype.set.call(e, this.subarray(n, n + a), t);
    return a
}, u.prototype.fill = function(e, t, n, r) {
    if ("string" == typeof e) {
        if ("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === e.length) {
            var i = e.charCodeAt(0);
            i < 256 && (e = i)
        }
        if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
        if ("string" == typeof r && !u.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
    } else "number" == typeof e && (e &= 255);
    if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
    if (n <= t) return this;
    var a;
    if (t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0), "number" == typeof e)
        for (a = t; a < n; ++a) this[a] = e;
    else {
        var o = u.isBuffer(e) ? e : Y(new u(e, r).toString()),
            s = o.length;
        for (a = 0; a < n - t; ++a) this[a + t] = o[a % s]
    }
    return this
};
var F = /[^+\/0-9A-Za-z-_]/g;

function Y(e, t) {
    var n;
    t = t || 1 / 0;
    for (var r = e.length, i = null, a = [], o = 0; o < r; ++o) {
        if ((n = e.charCodeAt(o)) > 55295 && n < 57344) {
            if (!i) {
                if (n > 56319) {
                    (t -= 3) > -1 && a.push(239, 191, 189);
                    continue
                }
                if (o + 1 === r) {
                    (t -= 3) > -1 && a.push(239, 191, 189);
                    continue
                }
                i = n;
                continue
            }
            if (n < 56320) {
                (t -= 3) > -1 && a.push(239, 191, 189), i = n;
                continue
            }
            n = 65536 + (i - 55296 << 10 | n - 56320)
        } else i && (t -= 3) > -1 && a.push(239, 191, 189);
        if (i = null, n < 128) {
            if ((t -= 1) < 0) break;
            a.push(n)
        } else if (n < 2048) {
            if ((t -= 2) < 0) break;
            a.push(n >> 6 | 192, 63 & n | 128)
        } else if (n < 65536) {
            if ((t -= 3) < 0) break;
            a.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
        } else {
            if (!(n < 1114112)) throw new Error("Invalid code point");
            if ((t -= 4) < 0) break;
            a.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
        }
    }
    return a
}

function B(e) {
    return r.toByteArray(function(e) {
        if ((e = function(e) {
                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
            }(e).replace(F, "")).length < 2) return "";
        for (; e.length % 4 != 0;) e += "=";
        return e
    }(e))
}

function H(e, t, n, r) {
    for (var i = 0; i < r && !(i + n >= t.length || i >= e.length); ++i) t[i + n] = e[i];
    return i
}
}).call(t, function() {
    return this
}())
},
function(e, t) {
    "use strict";
    t.byteLength = function(e) {
        return 3 * e.length / 4 - u(e)
    }, t.toByteArray = function(e) {
        var t, n, a, o, s, l, c = e.length;
        s = u(e), l = new i(3 * c / 4 - s), a = s > 0 ? c - 4 : c;
        var d = 0;
        for (t = 0, n = 0; t < a; t += 4, n += 3) o = r[e.charCodeAt(t)] << 18 | r[e.charCodeAt(t + 1)] << 12 | r[e.charCodeAt(t + 2)] << 6 | r[e.charCodeAt(t + 3)], l[d++] = o >> 16 & 255, l[d++] = o >> 8 & 255, l[d++] = 255 & o;
        return 2 === s ? (o = r[e.charCodeAt(t)] << 2 | r[e.charCodeAt(t + 1)] >> 4, l[d++] = 255 & o) : 1 === s && (o = r[e.charCodeAt(t)] << 10 | r[e.charCodeAt(t + 1)] << 4 | r[e.charCodeAt(t + 2)] >> 2, l[d++] = o >> 8 & 255, l[d++] = 255 & o), l
    }, t.fromByteArray = function(e) {
        for (var t, r = e.length, i = r % 3, a = "", o = [], s = 0, u = r - i; s < u; s += 16383) o.push(l(e, s, s + 16383 > u ? u : s + 16383));
        return 1 === i ? (t = e[r - 1], a += n[t >> 2], a += n[t << 4 & 63], a += "==") : 2 === i && (t = (e[r - 2] << 8) + e[r - 1], a += n[t >> 10], a += n[t >> 4 & 63], a += n[t << 2 & 63], a += "="), o.push(a), o.join("")
    };
    for (var n = [], r = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, s = a.length; o < s; ++o) n[o] = a[o], r[a.charCodeAt(o)] = o;

    function u(e) {
        var t = e.length;
        if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0
    }

    function l(e, t, r) {
        for (var i, a, o = [], s = t; s < r; s += 3) i = (e[s] << 16) + (e[s + 1] << 8) + e[s + 2], o.push(n[(a = i) >> 18 & 63] + n[a >> 12 & 63] + n[a >> 6 & 63] + n[63 & a]);
        return o.join("")
    }
    r["-".charCodeAt(0)] = 62, r["_".charCodeAt(0)] = 63
},
function(e, t) {
    t.read = function(e, t, n, r, i) {
        var a, o, s = 8 * i - r - 1,
            u = (1 << s) - 1,
            l = u >> 1,
            c = -7,
            d = n ? i - 1 : 0,
            f = n ? -1 : 1,
            p = e[t + d];
        for (d += f, a = p & (1 << -c) - 1, p >>= -c, c += s; c > 0; a = 256 * a + e[t + d], d += f, c -= 8);
        for (o = a & (1 << -c) - 1, a >>= -c, c += r; c > 0; o = 256 * o + e[t + d], d += f, c -= 8);
        if (0 === a) a = 1 - l;
        else {
            if (a === u) return o ? NaN : 1 / 0 * (p ? -1 : 1);
            o += Math.pow(2, r), a -= l
        }
        return (p ? -1 : 1) * o * Math.pow(2, a - r)
    }, t.write = function(e, t, n, r, i, a) {
        var o, s, u, l = 8 * a - i - 1,
            c = (1 << l) - 1,
            d = c >> 1,
            f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            p = r ? 0 : a - 1,
            _ = r ? 1 : -1,
            h = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, o = c) : (o = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -o)) < 1 && (o--, u *= 2), (t += o + d >= 1 ? f / u : f * Math.pow(2, 1 - d)) * u >= 2 && (o++, u /= 2), o + d >= c ? (s = 0, o = c) : o + d >= 1 ? (s = (t * u - 1) * Math.pow(2, i), o += d) : (s = t * Math.pow(2, d - 1) * Math.pow(2, i), o = 0)); i >= 8; e[n + p] = 255 & s, p += _, s /= 256, i -= 8);
        for (o = o << i | s, l += i; l > 0; e[n + p] = 255 & o, p += _, o /= 256, l -= 8);
        e[n + p - _] |= 128 * h
    }
},
function(e, t) {
    var n = {}.toString;
    e.exports = Array.isArray || function(e) {
        return "[object Array]" == n.call(e)
    }
},
function(e, t) {
    var n, r, i = e.exports = {};

    function a() {
        throw new Error("setTimeout has not been defined")
    }

    function o() {
        throw new Error("clearTimeout has not been defined")
    }

    function s(e) {
        if (n === setTimeout) return setTimeout(e, 0);
        if ((n === a || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
        try {
            return n(e, 0)
        } catch (t) {
            try {
                return n.call(null, e, 0)
            } catch (t) {
                return n.call(this, e, 0)
            }
        }
    }! function() {
        try {
            n = "function" == typeof setTimeout ? setTimeout : a
        } catch (e) {
            n = a
        }
        try {
            r = "function" == typeof clearTimeout ? clearTimeout : o
        } catch (e) {
            r = o
        }
    }();
    var u, l = [],
        c = !1,
        d = -1;

    function f() {
        c && u && (c = !1, u.length ? l = u.concat(l) : d = -1, l.length && p())
    }

    function p() {
        if (!c) {
            var e = s(f);
            c = !0;
            for (var t = l.length; t;) {
                for (u = l, l = []; ++d < t;) u && u[d].run();
                d = -1, t = l.length
            }
            u = null, c = !1,
                function(e) {
                    if (r === clearTimeout) return clearTimeout(e);
                    if ((r === o || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
                    try {
                        r(e)
                    } catch (t) {
                        try {
                            return r.call(null, e)
                        } catch (t) {
                            return r.call(this, e)
                        }
                    }
                }(e)
        }
    }

    function _(e, t) {
        this.fun = e, this.array = t
    }

    function h() {}
    i.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        l.push(new _(e, t)), 1 !== l.length || c || s(p)
    }, _.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = h, i.addListener = h, i.once = h, i.off = h, i.removeListener = h, i.removeAllListeners = h, i.emit = h, i.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, i.cwd = function() {
        return "/"
    }, i.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, i.umask = function() {
        return 0
    }
},
function(e, t) {},
function(e, t, n) {
    (function(e) {
        function n(e, t) {
            for (var n = 0, r = e.length - 1; r >= 0; r--) {
                var i = e[r];
                "." === i ? e.splice(r, 1) : ".." === i ? (e.splice(r, 1), n++) : n && (e.splice(r, 1), n--)
            }
            if (t)
                for (; n--; n) e.unshift("..");
            return e
        }
        var r = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
            i = function(e) {
                return r.exec(e).slice(1)
            };

        function a(e, t) {
            if (e.filter) return e.filter(t);
            for (var n = [], r = 0; r < e.length; r++) t(e[r], r, e) && n.push(e[r]);
            return n
        }
        t.resolve = function() {
            for (var t = "", r = !1, i = arguments.length - 1; i >= -1 && !r; i--) {
                var o = i >= 0 ? arguments[i] : e.cwd();
                if ("string" != typeof o) throw new TypeError("Arguments to path.resolve must be strings");
                o && (t = o + "/" + t, r = "/" === o.charAt(0))
            }
            return (r ? "/" : "") + (t = n(a(t.split("/"), function(e) {
                return !!e
            }), !r).join("/")) || "."
        }, t.normalize = function(e) {
            var r = t.isAbsolute(e),
                i = "/" === o(e, -1);
            return (e = n(a(e.split("/"), function(e) {
                return !!e
            }), !r).join("/")) || r || (e = "."), e && i && (e += "/"), (r ? "/" : "") + e
        }, t.isAbsolute = function(e) {
            return "/" === e.charAt(0)
        }, t.join = function() {
            var e = Array.prototype.slice.call(arguments, 0);
            return t.normalize(a(e, function(e, t) {
                if ("string" != typeof e) throw new TypeError("Arguments to path.join must be strings");
                return e
            }).join("/"))
        }, t.relative = function(e, n) {
            function r(e) {
                for (var t = 0; t < e.length && "" === e[t]; t++);
                for (var n = e.length - 1; n >= 0 && "" === e[n]; n--);
                return t > n ? [] : e.slice(t, n - t + 1)
            }
            e = t.resolve(e).substr(1), n = t.resolve(n).substr(1);
            for (var i = r(e.split("/")), a = r(n.split("/")), o = Math.min(i.length, a.length), s = o, u = 0; u < o; u++)
                if (i[u] !== a[u]) {
                    s = u;
                    break
                } var l = [];
            for (u = s; u < i.length; u++) l.push("..");
            return (l = l.concat(a.slice(s))).join("/")
        }, t.sep = "/", t.delimiter = ":", t.dirname = function(e) {
            var t = i(e),
                n = t[0],
                r = t[1];
            return n || r ? (r && (r = r.substr(0, r.length - 1)), n + r) : "."
        }, t.basename = function(e, t) {
            var n = i(e)[2];
            return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)), n
        }, t.extname = function(e) {
            return i(e)[3]
        };
        var o = "b" === "ab".substr(-1) ? function(e, t, n) {
            return e.substr(t, n)
        } : function(e, t, n) {
            return t < 0 && (t = e.length + t), e.substr(t, n)
        }
    }).call(t, n(7))
},
function(e, t, n) {
    (function(e, r) {
        var i = /%[sdj%]/g;
        t.format = function(e) {
            if (!m(e)) {
                for (var t = [], n = 0; n < arguments.length; n++) t.push(s(arguments[n]));
                return t.join(" ")
            }
            n = 1;
            for (var r = arguments, a = r.length, o = String(e).replace(i, function(e) {
                    if ("%%" === e) return "%";
                    if (n >= a) return e;
                    switch (e) {
                        case "%s":
                            return String(r[n++]);
                        case "%d":
                            return Number(r[n++]);
                        case "%j":
                            try {
                                return JSON.stringify(r[n++])
                            } catch (e) {
                                return "[Circular]"
                            }
                            default:
                                return e
                    }
                }), u = r[n]; n < a; u = r[++n]) h(u) || !T(u) ? o += " " + u : o += " " + s(u);
            return o
        }, t.deprecate = function(n, i) {
            if (g(e.process)) return function() {
                return t.deprecate(n, i).apply(this, arguments)
            };
            if (!0 === r.noDeprecation) return n;
            var a = !1;
            return function() {
                if (!a) {
                    if (r.throwDeprecation) throw new Error(i);
                    r.traceDeprecation ? console.trace(i) : console.error(i), a = !0
                }
                return n.apply(this, arguments)
            }
        };
        var a, o = {};

        function s(e, n) {
            var r = {
                seen: [],
                stylize: l
            };
            return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), _(n) ? r.showHidden = n : n && t._extend(r, n), g(r.showHidden) && (r.showHidden = !1), g(r.depth) && (r.depth = 2), g(r.colors) && (r.colors = !1), g(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = u), c(r, e, r.depth)
        }

        function u(e, t) {
            var n = s.styles[t];
            return n ? "[" + s.colors[n][0] + "m" + e + "[" + s.colors[n][1] + "m" : e
        }

        function l(e, t) {
            return e
        }

        function c(e, n, r) {
            if (e.customInspect && n && S(n.inspect) && n.inspect !== t.inspect && (!n.constructor || n.constructor.prototype !== n)) {
                var i = n.inspect(r, e);
                return m(i) || (i = c(e, i, r)), i
            }
            var a = function(e, t) {
                if (g(t)) return e.stylize("undefined", "undefined");
                if (m(t)) {
                    var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return e.stylize(n, "string")
                }
                return E(t) ? e.stylize("" + t, "number") : _(t) ? e.stylize("" + t, "boolean") : h(t) ? e.stylize("null", "null") : void 0
            }(e, n);
            if (a) return a;
            var o = Object.keys(n),
                s = function(e) {
                    var t = {};
                    return e.forEach(function(e, n) {
                        t[e] = !0
                    }), t
                }(o);
            if (e.showHidden && (o = Object.getOwnPropertyNames(n)), I(n) && (o.indexOf("message") >= 0 || o.indexOf("description") >= 0)) return d(n);
            if (0 === o.length) {
                if (S(n)) {
                    var u = n.name ? ": " + n.name : "";
                    return e.stylize("[Function" + u + "]", "special")
                }
                if (v(n)) return e.stylize(RegExp.prototype.toString.call(n), "regexp");
                if (y(n)) return e.stylize(Date.prototype.toString.call(n), "date");
                if (I(n)) return d(n)
            }
            var l, T = "",
                A = !1,
                O = ["{", "}"];
            return p(n) && (A = !0, O = ["[", "]"]), S(n) && (T = " [Function" + (n.name ? ": " + n.name : "") + "]"), v(n) && (T = " " + RegExp.prototype.toString.call(n)), y(n) && (T = " " + Date.prototype.toUTCString.call(n)), I(n) && (T = " " + d(n)), 0 !== o.length || A && 0 != n.length ? r < 0 ? v(n) ? e.stylize(RegExp.prototype.toString.call(n), "regexp") : e.stylize("[Object]", "special") : (e.seen.push(n), l = A ? function(e, t, n, r, i) {
                for (var a = [], o = 0, s = t.length; o < s; ++o) C(t, String(o)) ? a.push(f(e, t, n, r, String(o), !0)) : a.push("");
                return i.forEach(function(i) {
                    i.match(/^\d+$/) || a.push(f(e, t, n, r, i, !0))
                }), a
            }(e, n, r, s, o) : o.map(function(t) {
                return f(e, n, r, s, t, A)
            }), e.seen.pop(), function(e, t, n) {
                return e.reduce(function(e, t) {
                    return t.indexOf("\n"), e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
                }, 0) > 60 ? n[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1]
            }(l, T, O)) : O[0] + T + O[1]
        }

        function d(e) {
            return "[" + Error.prototype.toString.call(e) + "]"
        }

        function f(e, t, n, r, i, a) {
            var o, s, u;
            if ((u = Object.getOwnPropertyDescriptor(t, i) || {
                    value: t[i]
                }).get ? s = u.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : u.set && (s = e.stylize("[Setter]", "special")), C(r, i) || (o = "[" + i + "]"), s || (e.seen.indexOf(u.value) < 0 ? (s = h(n) ? c(e, u.value, null) : c(e, u.value, n - 1)).indexOf("\n") > -1 && (s = a ? s.split("\n").map(function(e) {
                    return "  " + e
                }).join("\n").substr(2) : "\n" + s.split("\n").map(function(e) {
                    return "   " + e
                }).join("\n")) : s = e.stylize("[Circular]", "special")), g(o)) {
                if (a && i.match(/^\d+$/)) return s;
                (o = JSON.stringify("" + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (o = o.substr(1, o.length - 2), o = e.stylize(o, "name")) : (o = o.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), o = e.stylize(o, "string"))
            }
            return o + ": " + s
        }

        function p(e) {
            return Array.isArray(e)
        }

        function _(e) {
            return "boolean" == typeof e
        }

        function h(e) {
            return null === e
        }

        function E(e) {
            return "number" == typeof e
        }

        function m(e) {
            return "string" == typeof e
        }

        function g(e) {
            return void 0 === e
        }

        function v(e) {
            return T(e) && "[object RegExp]" === A(e)
        }

        function T(e) {
            return "object" == typeof e && null !== e
        }

        function y(e) {
            return T(e) && "[object Date]" === A(e)
        }

        function I(e) {
            return T(e) && ("[object Error]" === A(e) || e instanceof Error)
        }

        function S(e) {
            return "function" == typeof e
        }

        function A(e) {
            return Object.prototype.toString.call(e)
        }

        function O(e) {
            return e < 10 ? "0" + e.toString(10) : e.toString(10)
        }
        t.debuglog = function(e) {
            if (g(a) && (a = r.env.NODE_DEBUG || ""), e = e.toUpperCase(), !o[e])
                if (new RegExp("\\b" + e + "\\b", "i").test(a)) {
                    var n = r.pid;
                    o[e] = function() {
                        var r = t.format.apply(t, arguments);
                        console.error("%s %d: %s", e, n, r)
                    }
                } else o[e] = function() {};
            return o[e]
        }, t.inspect = s, s.colors = {
            bold: [1, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            white: [37, 39],
            grey: [90, 39],
            black: [30, 39],
            blue: [34, 39],
            cyan: [36, 39],
            green: [32, 39],
            magenta: [35, 39],
            red: [31, 39],
            yellow: [33, 39]
        }, s.styles = {
            special: "cyan",
            number: "yellow",
            boolean: "yellow",
            undefined: "grey",
            null: "bold",
            string: "green",
            date: "magenta",
            regexp: "red"
        }, t.isArray = p, t.isBoolean = _, t.isNull = h, t.isNullOrUndefined = function(e) {
            return null == e
        }, t.isNumber = E, t.isString = m, t.isSymbol = function(e) {
            return "symbol" == typeof e
        }, t.isUndefined = g, t.isRegExp = v, t.isObject = T, t.isDate = y, t.isError = I, t.isFunction = S, t.isPrimitive = function(e) {
            return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || void 0 === e
        }, t.isBuffer = n(11);
        var b = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        function N() {
            var e = new Date,
                t = [O(e.getHours()), O(e.getMinutes()), O(e.getSeconds())].join(":");
            return [e.getDate(), b[e.getMonth()], t].join(" ")
        }

        function C(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        t.log = function() {
            console.log("%s - %s", N(), t.format.apply(t, arguments))
        }, t.inherits = n(12), t._extend = function(e, t) {
            if (!t || !T(t)) return e;
            for (var n = Object.keys(t), r = n.length; r--;) e[n[r]] = t[n[r]];
            return e
        }
    }).call(t, function() {
        return this
    }(), n(7))
},
function(e, t) {
    e.exports = function(e) {
        return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8
    }
},
function(e, t) {
    "function" == typeof Object.create ? e.exports = function(e, t) {
        e.super_ = t, e.prototype = Object.create(t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    } : e.exports = function(e, t) {
        e.super_ = t;
        var n = function() {};
        n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
    }
},
function(e, t, n) {
    (function(e) {
        "use strict";
        var n = {};
        t.escapeJavaScript = function(e) {
            if (!e) return "";
            for (var t = "", r = 0; r < e.length; ++r) {
                var i = e.charCodeAt(r);
                n.isSafe(i) ? t += e[r] : t += n.escapeJavaScriptChar(i)
            }
            return t
        }, t.escapeHtml = function(e) {
            if (!e) return "";
            for (var t = "", r = 0; r < e.length; ++r) {
                var i = e.charCodeAt(r);
                n.isSafe(i) ? t += e[r] : t += n.escapeHtmlChar(i)
            }
            return t
        }, n.escapeJavaScriptChar = function(t) {
            if (t >= 256) return "\\u" + n.padLeft("" + t, 4);
            var r = new e(String.fromCharCode(t), "ascii").toString("hex");
            return "\\x" + n.padLeft(r, 2)
        }, n.escapeHtmlChar = function(t) {
            var r = n.namedHtml[t];
            if (void 0 !== r) return r;
            if (t >= 256) return "&#" + t + ";";
            var i = new e(String.fromCharCode(t), "ascii").toString("hex");
            return "&#x" + n.padLeft(i, 2) + ";"
        }, n.padLeft = function(e, t) {
            for (; e.length < t;) e = "0" + e;
            return e
        }, n.isSafe = function(e) {
            return void 0 !== n.safeCharCodes[e]
        }, n.namedHtml = {
            38: "&amp;",
            60: "&lt;",
            62: "&gt;",
            34: "&quot;",
            160: "&nbsp;",
            162: "&cent;",
            163: "&pound;",
            164: "&curren;",
            169: "&copy;",
            174: "&reg;"
        }, n.safeCharCodes = function() {
            for (var e = {}, t = 32; t < 123; ++t)(t >= 97 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || 32 === t || 46 === t || 44 === t || 45 === t || 58 === t || 95 === t) && (e[t] = null);
            return e
        }()
    }).call(t, n(3).Buffer)
},
function(e, t, n) {
    "use strict";
    var r = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        a = n(2),
        o = n(15),
        s = n(16),
        u = null,
        l = null,
        c = {
            Set: n(18),
            defaults: {
                abortEarly: !0,
                convert: !0,
                allowUnknown: !1,
                skipFunctions: !1,
                stripUnknown: !1,
                language: {},
                presence: "optional",
                strip: !1,
                noDefaults: !1
            }
        };
    e.exports = c.Any = function() {
        function e() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), l = l || n(19), this.isJoi = !0, this._type = "any", this._settings = null, this._valids = new c.Set, this._invalids = new c.Set, this._tests = [], this._refs = [], this._flags = {}, this._description = null, this._unit = null, this._notes = [], this._tags = [], this._examples = [], this._meta = [], this._inner = {}
        }
        return e.prototype.createError = function(e, t, n, r) {
            return s.create(e, t, n, r, this._flags)
        }, e.prototype.checkOptions = function(e) {
            var t = n(31).options.validate(e);
            if (t.error) throw new Error(t.error.details[0].message)
        }, e.prototype.clone = function() {
            var e = Object.create(Object.getPrototypeOf(this));
            e.isJoi = !0, e._type = this._type, e._settings = c.concatSettings(this._settings), e._valids = a.clone(this._valids), e._invalids = a.clone(this._invalids), e._tests = this._tests.slice(), e._refs = this._refs.slice(), e._flags = a.clone(this._flags), e._description = this._description, e._unit = this._unit, e._notes = this._notes.slice(), e._tags = this._tags.slice(), e._examples = this._examples.slice(), e._meta = this._meta.slice(), e._inner = {};
            for (var t = Object.keys(this._inner), n = 0; n < t.length; ++n) {
                var r = t[n];
                e._inner[r] = this._inner[r] ? this._inner[r].slice() : null
            }
            return e
        }, e.prototype.concat = function(e) {
            a.assert(e instanceof c.Any, "Invalid schema object"), a.assert("any" === this._type || "any" === e._type || e._type === this._type, "Cannot merge type", this._type, "with another type:", e._type);
            var t = this.clone();
            if ("any" === this._type && "any" !== e._type) {
                for (var n = e.clone(), r = ["_settings", "_valids", "_invalids", "_tests", "_refs", "_flags", "_description", "_unit", "_notes", "_tags", "_examples", "_meta", "_inner"], i = 0; i < r.length; ++i) n[r[i]] = t[r[i]];
                t = n
            }
            t._settings = t._settings ? c.concatSettings(t._settings, e._settings) : e._settings, t._valids.merge(e._valids, e._invalids), t._invalids.merge(e._invalids, e._valids), t._tests = t._tests.concat(e._tests), t._refs = t._refs.concat(e._refs), a.merge(t._flags, e._flags), t._description = e._description || t._description, t._unit = e._unit || t._unit, t._notes = t._notes.concat(e._notes), t._tags = t._tags.concat(e._tags), t._examples = t._examples.concat(e._examples), t._meta = t._meta.concat(e._meta);
            for (var o = Object.keys(e._inner), s = "object" === t._type, u = 0; u < o.length; ++u) {
                var l = o[u],
                    d = e._inner[l];
                if (d) {
                    var f = t._inner[l];
                    if (f)
                        if (s && "children" === l) {
                            for (var p = {}, _ = 0; _ < f.length; ++_) p[f[_].key] = _;
                            for (var h = 0; h < d.length; ++h) {
                                var E = d[h].key;
                                p[E] >= 0 ? f[p[E]] = {
                                    key: E,
                                    schema: f[p[E]].schema.concat(d[h].schema)
                                } : f.push(d[h])
                            }
                        } else t._inner[l] = t._inner[l].concat(d);
                    else t._inner[l] = d.slice()
                }
            }
            return t
        }, e.prototype._test = function(e, t, n, r) {
            var i = this.clone();
            return i._tests.push({
                func: n,
                name: e,
                arg: t,
                options: r
            }), i
        }, e.prototype.options = function(e) {
            a.assert(!e.context, "Cannot override context"), this.checkOptions(e);
            var t = this.clone();
            return t._settings = c.concatSettings(t._settings, e), t
        }, e.prototype.strict = function(e) {
            var t = this.clone();
            return t._settings = t._settings || {}, t._settings.convert = void 0 !== e && !e, t
        }, e.prototype.raw = function(e) {
            var t = this.clone();
            return t._flags.raw = void 0 === e || e, t
        }, e.prototype.error = function(e) {
            a.assert(e && e instanceof Error, "Must provide a valid Error object");
            var t = this.clone();
            return t._flags.error = e, t
        }, e.prototype.allow = function() {
            for (var e = this.clone(), t = a.flatten(Array.prototype.slice.call(arguments)), n = 0; n < t.length; ++n) {
                var r = t[n];
                a.assert(void 0 !== r, "Cannot call allow/valid/invalid with undefined"), e._invalids.remove(r), e._valids.add(r, e._refs)
            }
            return e
        }, e.prototype.valid = function() {
            var e = this.allow.apply(this, arguments);
            return e._flags.allowOnly = !0, e
        }, e.prototype.invalid = function(e) {
            for (var t = this.clone(), n = a.flatten(Array.prototype.slice.call(arguments)), r = 0; r < n.length; ++r) e = n[r], a.assert(void 0 !== e, "Cannot call allow/valid/invalid with undefined"), t._valids.remove(e), t._invalids.add(e, this._refs);
            return t
        }, e.prototype.required = function() {
            var e = this.clone();
            return e._flags.presence = "required", e
        }, e.prototype.optional = function() {
            var e = this.clone();
            return e._flags.presence = "optional", e
        }, e.prototype.forbidden = function() {
            var e = this.clone();
            return e._flags.presence = "forbidden", e
        }, e.prototype.strip = function() {
            var e = this.clone();
            return e._flags.strip = !0, e
        }, e.prototype.applyFunctionToChildren = function(e, t, n, r) {
            if (1 !== (e = [].concat(e)).length || "" !== e[0]) {
                r = r ? r + "." : "";
                var i = ("" === e[0] ? e.slice(1) : e).map(function(e) {
                    return r + e
                });
                throw new Error("unknown key(s) " + i.join(", "))
            }
            return this[t].apply(this, n)
        }, e.prototype.default = function(e, t) {
            "function" != typeof e || o.isRef(e) || (!e.description && t && (e.description = t), this._flags.func || a.assert("string" == typeof e.description && e.description.length > 0, "description must be provided when default value is a function"));
            var n = this.clone();
            return n._flags.default = e, o.push(n._refs, e), n
        }, e.prototype.empty = function(e) {
            var t = this.clone();
            return t._flags.empty = void 0 === e ? void 0 : l.schema(e), t
        }, e.prototype.when = function(e, t) {
            a.assert(t && "object" === (void 0 === t ? "undefined" : i(t)), "Invalid options"), a.assert(void 0 !== t.then || void 0 !== t.otherwise, 'options must have at least one of "then" or "otherwise"');
            var r = t.hasOwnProperty("then") ? this.concat(l.schema(t.then)) : void 0,
                o = t.hasOwnProperty("otherwise") ? this.concat(l.schema(t.otherwise)) : void 0,
                s = (u = u || n(28)).when(e, {
                    is: t.is,
                    then: r,
                    otherwise: o
                });
            return s._flags.presence = "ignore", s._settings = c.concatSettings(s._settings, {
                baseType: this
            }), s
        }, e.prototype.description = function(e) {
            a.assert(e && "string" == typeof e, "Description must be a non-empty string");
            var t = this.clone();
            return t._description = e, t
        }, e.prototype.notes = function(e) {
            a.assert(e && ("string" == typeof e || Array.isArray(e)), "Notes must be a non-empty string or array");
            var t = this.clone();
            return t._notes = t._notes.concat(e), t
        }, e.prototype.tags = function(e) {
            a.assert(e && ("string" == typeof e || Array.isArray(e)), "Tags must be a non-empty string or array");
            var t = this.clone();
            return t._tags = t._tags.concat(e), t
        }, e.prototype.meta = function(e) {
            a.assert(void 0 !== e, "Meta cannot be undefined");
            var t = this.clone();
            return t._meta = t._meta.concat(e), t
        }, e.prototype.example = function(e) {
            a.assert(arguments.length, "Missing example");
            var t = this._validate(e, null, c.defaults);
            a.assert(!t.errors, "Bad example:", t.errors && s.process(t.errors, e));
            var n = this.clone();
            return n._examples.push(e), n
        }, e.prototype.unit = function(e) {
            a.assert(e && "string" == typeof e, "Unit name must be a non-empty string");
            var t = this.clone();
            return t._unit = e, t
        }, e.prototype._prepareEmptyValue = function(e) {
            return "string" == typeof e && this._flags.trim ? e.trim() : e
        }, e.prototype._validate = function(e, t, n, r) {
            var i = this,
                u = e;
            t = t || {
                key: "",
                path: "",
                parent: null,
                reference: r
            }, this._settings && (n = c.concatSettings(n, this._settings));
            var l = [],
                d = function() {
                    var r = void 0;
                    if (!i._flags.strip)
                        if (void 0 !== e) r = i._flags.raw ? u : e;
                        else if (n.noDefaults) r = u;
                    else if (o.isRef(i._flags.default)) r = i._flags.default(t.parent, n);
                    else if ("function" != typeof i._flags.default || i._flags.func && !i._flags.default.description) r = a.clone(i._flags.default);
                    else {
                        var s = void 0;
                        null !== t.parent && i._flags.default.length > 0 && (s = [a.clone(t.parent), n]);
                        var d = c._try(i._flags.default, s);
                        r = d.value, d.error && l.push(i.createError("any.default", d.error, t, n))
                    }
                    return {
                        value: r,
                        errors: l.length ? l : null
                    }
                };
            if (this._coerce) {
                var f = this._coerce.call(this, e, t, n);
                if (f.errors) return e = f.value, l = l.concat(f.errors), d();
                e = f.value
            }
            this._flags.empty && !this._flags.empty._validate(this._prepareEmptyValue(e), null, c.defaults).errors && (e = void 0);
            var p = this._flags.presence || n.presence;
            if ("optional" === p) {
                if (void 0 === e) {
                    if (!this._flags.hasOwnProperty("default") || void 0 !== this._flags.default || "object" !== this._type) return d();
                    e = {}
                }
            } else {
                if ("required" === p && void 0 === e) return l.push(this.createError("any.required", null, t, n)), d();
                if ("forbidden" === p) return void 0 === e ? d() : (l.push(this.createError("any.unknown", null, t, n)), d())
            }
            if (this._valids.has(e, t, n, this._flags.insensitive)) return d();
            if (this._invalids.has(e, t, n, this._flags.insensitive) && (l.push(this.createError("" === e ? "any.empty" : "any.invalid", null, t, n)), n.abortEarly || void 0 === e)) return d();
            if (this._base) {
                var _ = this._base.call(this, e, t, n);
                if (_.errors) return e = _.value, l = l.concat(_.errors), d();
                if (_.value !== e) {
                    if (e = _.value, this._valids.has(e, t, n, this._flags.insensitive)) return d();
                    if (this._invalids.has(e, t, n, this._flags.insensitive) && (l.push(this.createError("" === e ? "any.empty" : "any.invalid", null, t, n)), n.abortEarly)) return d()
                }
            }
            if (this._flags.allowOnly && (l.push(this.createError("any.allowOnly", {
                    valids: this._valids.values({
                        stripUndefined: !0
                    })
                }, t, n)), n.abortEarly)) return d();
            for (var h = 0; h < this._tests.length; ++h) {
                var E = this._tests[h].func.call(this, e, t, n);
                if (E instanceof s.Err) {
                    if (l.push(E), n.abortEarly) return d()
                } else e = E
            }
            return d()
        }, e.prototype._validateWithOptions = function(e, t, n) {
            t && this.checkOptions(t);
            var r = c.concatSettings(c.defaults, t),
                i = this._validate(e, null, r),
                a = s.process(i.errors, e);
            return n ? n(a, i.value) : {
                error: a,
                value: i.value
            }
        }, e.prototype.validate = function(e, t, n) {
            return "function" == typeof t ? this._validateWithOptions(e, null, t) : this._validateWithOptions(e, t, n)
        }, e.prototype.describe = function() {
            var e = this,
                t = {
                    type: this._type
                },
                n = Object.keys(this._flags);
            if (n.length)
                if (["empty", "default", "lazy", "label"].some(function(t) {
                        return e._flags.hasOwnProperty(t)
                    })) {
                    t.flags = {};
                    for (var r = 0; r < n.length; ++r) {
                        var i = n[r];
                        "empty" === i ? t.flags[i] = this._flags[i].describe() : "default" === i ? o.isRef(this._flags[i]) ? t.flags[i] = this._flags[i].toString() : "function" == typeof this._flags[i] ? t.flags[i] = this._flags[i].description : t.flags[i] = this._flags[i] : "lazy" === i || "label" === i || (t.flags[i] = this._flags[i])
                    }
                } else t.flags = this._flags;
            this._description && (t.description = this._description), this._notes.length && (t.notes = this._notes), this._tags.length && (t.tags = this._tags), this._meta.length && (t.meta = this._meta), this._examples.length && (t.examples = this._examples), this._unit && (t.unit = this._unit);
            var a = this._valids.values();
            a.length && (t.valids = a.map(function(e) {
                return o.isRef(e) ? e.toString() : e
            }));
            var s = this._invalids.values();
            s.length && (t.invalids = s.map(function(e) {
                return o.isRef(e) ? e.toString() : e
            })), t.rules = [];
            for (var u = 0; u < this._tests.length; ++u) {
                var l = this._tests[u],
                    c = {
                        name: l.name
                    };
                void 0 !== l.arg && (c.arg = o.isRef(l.arg) ? l.arg.toString() : l.arg);
                var d = l.options;
                if (d) {
                    if (d.hasRef) {
                        c.arg = {};
                        for (var f = Object.keys(l.arg), p = 0; p < f.length; ++p) {
                            var _ = f[p],
                                h = l.arg[_];
                            c.arg[_] = o.isRef(h) ? h.toString() : h
                        }
                    }
                    "string" == typeof d.description ? c.description = d.description : "function" == typeof d.description && (c.description = d.description(c.arg))
                }
                t.rules.push(c)
            }
            t.rules.length || delete t.rules;
            var E = this._getLabel();
            return E && (t.label = E), t
        }, e.prototype.label = function(e) {
            a.assert(e && "string" == typeof e, "Label name must be a non-empty string");
            var t = this.clone();
            return t._flags.label = e, t
        }, e.prototype._getLabel = function(e) {
            return this._flags.label || e
        }, e
    }(), c.Any.prototype.isImmutable = !0, c.Any.prototype.only = c.Any.prototype.equal = c.Any.prototype.valid, c.Any.prototype.disallow = c.Any.prototype.not = c.Any.prototype.invalid, c.Any.prototype.exist = c.Any.prototype.required, c._try = function(e, t) {
        var n = void 0,
            r = void 0;
        try {
            r = e.apply(null, t)
        } catch (e) {
            n = e
        }
        return {
            value: r,
            error: n
        }
    }, c.concatSettings = function(e, t) {
        if (!e && !t) return null;
        var n = {};
        if (e && r(n, e), t)
            for (var i = Object.keys(t), o = 0; o < i.length; ++o) {
                var s = i[o];
                "language" === s && n.hasOwnProperty(s) ? n[s] = a.applyToDefaults(n[s], t[s]) : n[s] = t[s]
            }
        return n
    }
},
function(e, t, n) {
    "use strict";
    var r = n(2);
    t.create = function(e, t) {
        r.assert("string" == typeof e, "Invalid reference key:", e);
        var n = r.clone(t),
            i = function e(t, i) {
                return r.reach(e.isContext ? i.context : t, e.key, n)
            };
        return i.isContext = e[0] === (n && n.contextPrefix || "$"), i.key = i.isContext ? e.slice(1) : e, i.path = i.key.split(n && n.separator || "."), i.depth = i.path.length, i.root = i.path[0], i.isJoi = !0, i.toString = function() {
            return (i.isContext ? "context:" : "ref:") + i.key
        }, i
    }, t.isRef = function(e) {
        return "function" == typeof e && e.isJoi
    }, t.push = function(e, n) {
        t.isRef(n) && !n.isContext && e.push(n.root)
    }
},
function(e, t, n) {
    "use strict";
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        i = n(2),
        a = n(17),
        o = {
            stringify: function(e, n) {
                var i = void 0 === e ? "undefined" : r(e);
                if (null === e) return "null";
                if ("string" === i) return e;
                if (e instanceof t.Err || "function" === i) return e.toString();
                if ("object" === i) {
                    if (Array.isArray(e)) {
                        for (var a = "", s = 0; s < e.length; ++s) a = a + (a.length ? ", " : "") + o.stringify(e[s], n);
                        return n ? "[" + a + "]" : a
                    }
                    return e.toString()
                }
                return JSON.stringify(e)
            }
        };
    t.Err = function() {
        function e(t, n, r, i, a) {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.isJoi = !0, this.type = t, this.context = n || {}, this.context.key = r.key, this.path = r.path, this.options = i, this.flags = a
        }
        return e.prototype.toString = function() {
            var e = this,
                t = this.options.language;
            this.flags.label ? this.context.key = this.flags.label : "" !== this.context.key && null !== this.context.key || (this.context.key = t.root || a.errors.root);
            var n = i.reach(t, this.type) || i.reach(a.errors, this.type),
                r = /\{\{\!?key\}\}/.test(n),
                s = n.length > 2 && "!" === n[0] && "!" === n[1];
            s && (n = n.slice(2)), r || s || (n = (i.reach(t, "key") || i.reach(a.errors, "key")) + n);
            var u = i.reach(t, "messages.wrapArrays");
            return "boolean" != typeof u && (u = a.errors.messages.wrapArrays), n.replace(/\{\{(\!?)([^}]+)\}\}/g, function(t, n, r) {
                var a = i.reach(e.context, r),
                    s = o.stringify(a, u);
                return n ? i.escapeHtml(s) : s
            })
        }, e
    }(), t.create = function(e, n, r, i, a) {
        return new t.Err(e, n, r, i, a)
    }, t.process = function(e, t) {
        if (!e || !e.length) return null;
        var n = "",
            r = [],
            i = function e(t, i) {
                for (var a = 0; a < t.length; ++a) {
                    var s = t[a];
                    if (s.flags.error) return s.flags.error;
                    var u = void 0;
                    if (void 0 === i && (u = s.toString(), n = n + (n ? ". " : "") + u), s.context.reason && s.context.reason.length) {
                        var l = e(s.context.reason, s.path);
                        if (l) return l
                    } else r.push({
                        message: u || s.toString(),
                        path: o.getPath(s),
                        type: s.type,
                        context: s.context
                    })
                }
            }(e);
        if (i) return i;
        var a = new Error(n);
        return a.isJoi = !0, a.name = "ValidationError", a.details = r, a._object = t, a.annotate = o.annotate, a
    }, o.getPath = function(e) {
        return e.path || e.context.key
    }, o.safeStringify = function(e, t) {
        return JSON.stringify(e, o.serializer(), t)
    }, o.serializer = function() {
        var e = [],
            t = [],
            n = function(n, r) {
                return t[0] === r ? "[Circular ~]" : "[Circular ~." + e.slice(0, t.indexOf(r)).join(".") + "]"
            };
        return function(i, a) {
            if (t.length > 0) {
                var o = t.indexOf(this);
                ~o ? (t.length = o + 1, e.length = o + 1, e[o] = i) : (t.push(this), e.push(i)), ~t.indexOf(a) && (a = n.call(this, i, a))
            } else t.push(a);
            if (Array.isArray(a) && a.placeholders) {
                for (var s = a.placeholders, u = [], l = 0; l < a.length; ++l) s[l] && u.push(s[l]), u.push(a[l]);
                a = u
            }
            return a === 1 / 0 || a === -1 / 0 || Number.isNaN(a) || "function" == typeof a || "symbol" === (void 0 === a ? "undefined" : r(a)) ? "[" + a.toString() + "]" : a
        }
    }, o.annotate = function(e) {
        var t = e ? "" : "[31m",
            n = e ? "" : "[41m",
            a = e ? "" : "[0m";
        if ("object" !== r(this._object)) return this.details[0].message;
        for (var s = i.clone(this._object || {}), u = {}, l = this.details.length - 1; l >= 0; --l)
            for (var c = l + 1, d = this.details[l], f = d.path.split("."), p = s, _ = 0; _ < f.length && p; ++_) {
                var h = f[_];
                if (_ + 1 < f.length) p = p[h];
                else {
                    var E = p[h];
                    if (Array.isArray(p)) {
                        var m = "_$idx$_" + c + "_$end$_";
                        p.placeholders || (p.placeholders = {}), p.placeholders[h] ? p.placeholders[h] = p.placeholders[h].replace("_$end$_", ", " + c + "_$end$_") : p.placeholders[h] = m
                    } else if (void 0 !== E) {
                        delete p[h];
                        var g = h + "_$key$_" + c + "_$end$_";
                        p[g] = E, u[d.path] = g
                    } else if (u[d.path]) {
                        var v = u[d.path],
                            T = v.replace("_$end$_", ", " + c + "_$end$_");
                        p[T] = p[v], u[d.path] = T, delete p[v]
                    } else p["_$miss$_" + h + "|" + c + "_$end$_"] = "__missing__"
                }
            }
        var y = /_\$key\$_([, \d]+)_\$end\$_\"/g,
            I = /\"_\$miss\$_([^\|]+)\|(\d+)_\$end\$_\"\: \"__missing__\"/g,
            S = /\s*\"_\$idx\$_([, \d]+)_\$end\$_\",?\n(.*)/g,
            A = /"\[(NaN|Symbol.*|-?Infinity|function.*|\(.*)\]"/g,
            O = o.safeStringify(s, 2).replace(y, function(e, n) {
                return '" ' + t + "[" + n + "]" + a
            }).replace(I, function(e, r, i) {
                return n + '"' + r + '"' + a + t + " [" + i + "]: -- missing --" + a
            }).replace(S, function(e, n, r) {
                return "\n" + r + " " + t + "[" + n + "]" + a
            }).replace(A, function(e, t) {
                return t
            });
        O = O + "\n" + t;
        for (var b = 0; b < this.details.length; ++b) O = O + "\n[" + (b + 1) + "] " + this.details[b].message;
        return O += a
    }
},
function(e, t) {
    "use strict";
    t.errors = {
        root: "value",
        key: '"{{!key}}" ',
        messages: {
            wrapArrays: !0
        },
        any: {
            unknown: "is not allowed",
            invalid: "contains an invalid value",
            empty: "is not allowed to be empty",
            required: "is required",
            allowOnly: "must be one of {{valids}}",
            default: "threw an error when running default method"
        },
        alternatives: {
            base: "not matching any of the allowed alternatives"
        },
        array: {
            base: "must be an array",
            includes: "at position {{pos}} does not match any of the allowed types",
            includesSingle: 'single value of "{{!key}}" does not match any of the allowed types',
            includesOne: "at position {{pos}} fails because {{reason}}",
            includesOneSingle: 'single value of "{{!key}}" fails because {{reason}}',
            includesRequiredUnknowns: "does not contain {{unknownMisses}} required value(s)",
            includesRequiredKnowns: "does not contain {{knownMisses}}",
            includesRequiredBoth: "does not contain {{knownMisses}} and {{unknownMisses}} other required value(s)",
            excludes: "at position {{pos}} contains an excluded value",
            excludesSingle: 'single value of "{{!key}}" contains an excluded value',
            min: "must contain at least {{limit}} items",
            max: "must contain less than or equal to {{limit}} items",
            length: "must contain {{limit}} items",
            ordered: "at position {{pos}} fails because {{reason}}",
            orderedLength: "at position {{pos}} fails because array must contain at most {{limit}} items",
            sparse: "must not be a sparse array",
            unique: "position {{pos}} contains a duplicate value"
        },
        boolean: {
            base: "must be a boolean"
        },
        binary: {
            base: "must be a buffer or a string",
            min: "must be at least {{limit}} bytes",
            max: "must be less than or equal to {{limit}} bytes",
            length: "must be {{limit}} bytes"
        },
        date: {
            base: "must be a number of milliseconds or valid date string",
            format: "must be a string with one of the following formats {{format}}",
            strict: "must be a valid date",
            min: 'must be larger than or equal to "{{limit}}"',
            max: 'must be less than or equal to "{{limit}}"',
            isoDate: "must be a valid ISO 8601 date",
            timestamp: {
                javascript: "must be a valid timestamp or number of milliseconds",
                unix: "must be a valid timestamp or number of seconds"
            },
            ref: 'references "{{ref}}" which is not a date'
        },
        function: {
            base: "must be a Function",
            arity: "must have an arity of {{n}}",
            minArity: "must have an arity greater or equal to {{n}}",
            maxArity: "must have an arity lesser or equal to {{n}}",
            ref: "must be a Joi reference"
        },
        lazy: {
            base: "!!schema error: lazy schema must be set",
            schema: "!!schema error: lazy schema function must return a schema"
        },
        object: {
            base: "must be an object",
            child: '!!child "{{!child}}" fails because {{reason}}',
            min: "must have at least {{limit}} children",
            max: "must have less than or equal to {{limit}} children",
            length: "must have {{limit}} children",
            allowUnknown: '!!"{{!child}}" is not allowed',
            with: 'missing required peer "{{peer}}"',
            without: 'conflict with forbidden peer "{{peer}}"',
            missing: "must contain at least one of {{peers}}",
            xor: "contains a conflict between exclusive peers {{peers}}",
            or: "must contain at least one of {{peers}}",
            and: "contains {{present}} without its required peers {{missing}}",
            nand: '!!"{{main}}" must not exist simultaneously with {{peers}}',
            assert: '!!"{{ref}}" validation failed because "{{ref}}" failed to {{message}}',
            rename: {
                multiple: 'cannot rename child "{{from}}" because multiple renames are disabled and another key was already renamed to "{{to}}"',
                override: 'cannot rename child "{{from}}" because override is disabled and target "{{to}}" exists'
            },
            type: 'must be an instance of "{{type}}"',
            schema: "must be a Joi instance"
        },
        number: {
            base: "must be a number",
            min: "must be larger than or equal to {{limit}}",
            max: "must be less than or equal to {{limit}}",
            less: "must be less than {{limit}}",
            greater: "must be greater than {{limit}}",
            float: "must be a float or double",
            integer: "must be an integer",
            negative: "must be a negative number",
            positive: "must be a positive number",
            precision: "must have no more than {{limit}} decimal places",
            ref: 'references "{{ref}}" which is not a number',
            multiple: "must be a multiple of {{multiple}}"
        },
        string: {
            base: "must be a string",
            min: "length must be at least {{limit}} characters long",
            max: "length must be less than or equal to {{limit}} characters long",
            length: "length must be {{limit}} characters long",
            alphanum: "must only contain alpha-numeric characters",
            token: "must only contain alpha-numeric and underscore characters",
            regex: {
                base: 'with value "{{!value}}" fails to match the required pattern: {{pattern}}',
                name: 'with value "{{!value}}" fails to match the {{name}} pattern',
                invert: {
                    base: 'with value "{{!value}}" matches the inverted pattern: {{pattern}}',
                    name: 'with value "{{!value}}" matches the inverted {{name}} pattern'
                }
            },
            email: "must be a valid email",
            uri: "must be a valid uri",
            uriRelativeOnly: "must be a valid relative uri",
            uriCustomScheme: "must be a valid uri with a scheme matching the {{scheme}} pattern",
            isoDate: "must be a valid ISO 8601 date",
            guid: "must be a valid GUID",
            hex: "must only contain hexadecimal characters",
            base64: "must be a valid base64 string",
            hostname: "must be a valid hostname",
            lowercase: "must only contain lowercase characters",
            uppercase: "must only contain uppercase characters",
            trim: "must not have leading or trailing whitespace",
            creditCard: "must be a credit card",
            ref: 'references "{{ref}}" which is not a number',
            ip: "must be a valid ip address with a {{cidr}} CIDR",
            ipVersion: "must be a valid ip address of one of the following versions {{version}} with a {{cidr}} CIDR"
        }
    }
},
function(e, t, n) {
    (function(t) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            i = n(15);
        e.exports = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._set = []
            }
            return e.prototype.add = function(e, t) {
                if (i.isRef(e) || !this.has(e, null, null, !1)) return void 0 !== t && i.push(t, e), this._set.push(e), this
            }, e.prototype.merge = function(e, t) {
                for (var n = 0; n < e._set.length; ++n) this.add(e._set[n]);
                for (var r = 0; r < t._set.length; ++r) this.remove(t._set[r]);
                return this
            }, e.prototype.remove = function(e) {
                return this._set = this._set.filter(function(t) {
                    return e !== t
                }), this
            }, e.prototype.has = function(e, n, a, o) {
                for (var s = 0; s < this._set.length; ++s) {
                    var u = this._set[s];
                    n && i.isRef(u) && (u = u(n.reference || n.parent, a)), Array.isArray(u) || (u = [u]);
                    for (var l = 0; l < u.length; ++l) {
                        var c = u[l];
                        if ((void 0 === e ? "undefined" : r(e)) === (void 0 === c ? "undefined" : r(c)) && (e === c || e instanceof Date && c instanceof Date && e.getTime() === c.getTime() || o && "string" == typeof e && e.toLowerCase() === c.toLowerCase() || t.isBuffer(e) && t.isBuffer(c) && e.length === c.length && e.toString("binary") === c.toString("binary"))) return !0
                    }
                }
                return !1
            }, e.prototype.values = function(e) {
                if (e && e.stripUndefined) {
                    for (var t = [], n = 0; n < this._set.length; ++n) {
                        var r = this._set[n];
                        void 0 !== r && t.push(r)
                    }
                    return t
                }
                return this._set.slice()
            }, e.prototype.slice = function() {
                var t = new e;
                return t._set = this._set.slice(), t
            }, e.prototype.concat = function(t) {
                var n = new e;
                return n._set = this._set.concat(t._set), n
            }, e
        }()
    }).call(t, n(3).Buffer)
},
function(e, t, n) {
    "use strict";
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        i = n(2),
        a = n(15),
        o = {
            any: null,
            date: n(20),
            string: n(21),
            number: n(26),
            boolean: n(27),
            alt: null,
            object: null
        };
    t.schema = function(e) {
        return o.any = o.any || new(n(14)), o.alt = o.alt || n(28), o.object = o.object || n(29), null != e && "object" === (void 0 === e ? "undefined" : r(e)) ? e.isJoi ? e : Array.isArray(e) ? o.alt.try(e) : e instanceof RegExp ? o.string.regex(e) : e instanceof Date ? o.date.valid(e) : o.object.keys(e) : "string" == typeof e ? o.string.valid(e) : "number" == typeof e ? o.number.valid(e) : "boolean" == typeof e ? o.boolean.valid(e) : a.isRef(e) ? o.any.valid(e) : (i.assert(null === e, "Invalid schema content:", e), o.any.valid(null))
    }, t.ref = function(e) {
        return a.isRef(e) ? e : a.create(e)
    }
},
function(e, t, n) {
    "use strict";

    function r(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : function(e, t) {
            for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
                var i = n[r],
                    a = Object.getOwnPropertyDescriptor(t, i);
                a && a.configurable && void 0 === e[i] && Object.defineProperty(e, i, a)
            }
        }(e, t))
    }
    var i, a = n(14),
        o = n(15),
        s = n(2),
        u = {
            isoDate: /^(?:\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?![T]$|[T][\d]+Z$)(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24\:?00)(?:[.,]\d+(?!:))?)(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[Z]|(?:[+-])(?:[01]\d|2[0-3])(?::?[0-5]\d)?)?)?)?$/
        };
    u.invalidDate = new Date(""), u.isIsoDate = (i = u.isoDate.toString(), function(e) {
        return e && e.toString() === i
    }), u.Date = function(e) {
        function t() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            var n = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, e.call(this));
            return n._type = "date", n
        }
        return r(t, e), t.prototype._base = function(e, t, n) {
            var r = {
                value: n.convert && u.Date.toDate(e, this._flags.format, this._flags.timestamp, this._flags.multiplier) || e
            };
            if (r.value instanceof Date && !isNaN(r.value.getTime())) r.errors = null;
            else if (n.convert) {
                var i = void 0;
                i = u.isIsoDate(this._flags.format) ? "isoDate" : this._flags.timestamp ? "timestamp." + this._flags.timestamp : "base", r.errors = this.createError("date." + i, null, t, n)
            } else r.errors = this.createError("date.strict", null, t, n);
            return r
        }, t.toDate = function(e, t, n, r) {
            if (e instanceof Date) return e;
            if ("string" == typeof e || "number" == typeof e && !isNaN(e) && isFinite(e)) {
                "string" == typeof e && /^[+-]?\d+(\.\d+)?$/.test(e) && (e = parseFloat(e));
                var i = void 0;
                if (i = t && u.isIsoDate(t) ? t.test(e) ? new Date(e) : u.invalidDate : n && r ? new Date(e * r) : new Date(e), !isNaN(i.getTime())) return i
            }
            return null
        }, t.prototype.iso = function() {
            var e = this.clone();
            return e._flags.format = u.isoDate, e
        }, t.prototype.timestamp = function(e) {
            e = e || "javascript";
            var t = ["javascript", "unix"];
            s.assert(-1 !== t.indexOf(e), '"type" must be one of "' + t.join('", "') + '"');
            var n = this.clone();
            return n._flags.timestamp = e, n._flags.multiplier = "unix" === e ? 1e3 : 1, n
        }, t.prototype._isIsoDate = function(e) {
            return u.isoDate.test(e)
        }, t
    }(a), u.compare = function(e, t) {
        return function(n) {
            var r = "now" === n,
                i = o.isRef(n);
            return r || i || (n = u.Date.toDate(n)), s.assert(n, "Invalid date format"), this._test(e, n, function(a, o, s) {
                var l = void 0;
                if (r) l = Date.now();
                else if (i) {
                    if (!(l = u.Date.toDate(n(o.reference || o.parent, s)))) return this.createError("date.ref", {
                        ref: n.key
                    }, o, s);
                    l = l.getTime()
                } else l = n.getTime();
                return t(a.getTime(), l) ? a : this.createError("date." + e, {
                    limit: new Date(l)
                }, o, s)
            })
        }
    }, u.Date.prototype.min = u.compare("min", function(e, t) {
        return e >= t
    }), u.Date.prototype.max = u.compare("max", function(e, t) {
        return e <= t
    }), e.exports = new u.Date
},
function(e, t, n) {
    (function(t) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };

        function i(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : function(e, t) {
                for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
                    var i = n[r],
                        a = Object.getOwnPropertyDescriptor(t, i);
                    a && a.configurable && void 0 === e[i] && Object.defineProperty(e, i, a)
                }
            }(e, t))
        }
        var a = n(8),
            o = n(2),
            s = n(22),
            u = n(14),
            l = n(15),
            c = n(20),
            d = n(23),
            f = n(25),
            p = {
                uriRegex: d.createUriRegex(),
                ipRegex: f.createIpRegex(["ipv4", "ipv6", "ipvfuture"], "optional")
            };
        p.String = function(e) {
            function t() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var n = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this));
                return n._type = "string", n._invalids.add(""), n
            }
            return i(t, e), t.prototype._base = function(e, t, n) {
                if ("string" == typeof e && n.convert) {
                    if (this._flags.case && (e = "upper" === this._flags.case ? e.toLocaleUpperCase() : e.toLocaleLowerCase()), this._flags.trim && (e = e.trim()), this._inner.replacements)
                        for (var r = 0; r < this._inner.replacements.length; ++r) {
                            var i = this._inner.replacements[r];
                            e = e.replace(i.pattern, i.replacement)
                        }
                    if (this._flags.truncate)
                        for (var a = 0; a < this._tests.length; ++a) {
                            var o = this._tests[a];
                            if ("max" === o.name) {
                                e = e.slice(0, o.arg);
                                break
                            }
                        }
                }
                return {
                    value: e,
                    errors: "string" == typeof e ? null : this.createError("string.base", {
                        value: e
                    }, t, n)
                }
            }, t.prototype.insensitive = function() {
                var e = this.clone();
                return e._flags.insensitive = !0, e
            }, t.prototype.creditCard = function() {
                return this._test("creditCard", void 0, function(e, t, n) {
                    for (var r = e.length, i = 0, a = 1; r--;) {
                        var o = e.charAt(r) * a;
                        i += o - 9 * (o > 9), a ^= 3
                    }
                    return i % 10 == 0 && i > 0 ? e : this.createError("string.creditCard", {
                        value: e
                    }, t, n)
                })
            }, t.prototype.regex = function(e, t) {
                o.assert(e instanceof RegExp, "pattern must be a RegExp");
                var n = {
                    pattern: new RegExp(e.source, e.ignoreCase ? "i" : void 0)
                };
                "string" == typeof t ? n.name = t : "object" === (void 0 === t ? "undefined" : r(t)) && (n.invert = !!t.invert, t.name && (n.name = t.name));
                var i = ["string.regex", n.invert ? ".invert" : "", n.name ? ".name" : ".base"].join("");
                return this._test("regex", n, function(e, t, r) {
                    return n.pattern.test(e) ^ n.invert ? e : this.createError(i, {
                        name: n.name,
                        pattern: n.pattern,
                        value: e
                    }, t, r)
                })
            }, t.prototype.alphanum = function() {
                return this._test("alphanum", void 0, function(e, t, n) {
                    return /^[a-zA-Z0-9]+$/.test(e) ? e : this.createError("string.alphanum", {
                        value: e
                    }, t, n)
                })
            }, t.prototype.token = function() {
                return this._test("token", void 0, function(e, t, n) {
                    return /^\w+$/.test(e) ? e : this.createError("string.token", {
                        value: e
                    }, t, n)
                })
            }, t.prototype.email = function(e) {
                return e && (o.assert("object" === (void 0 === e ? "undefined" : r(e)), "email options must be an object"), o.assert(void 0 === e.checkDNS, "checkDNS option is not supported"), o.assert(void 0 === e.tldWhitelist || "object" === r(e.tldWhitelist), "tldWhitelist must be an array or object"), o.assert(void 0 === e.minDomainAtoms || o.isInteger(e.minDomainAtoms) && e.minDomainAtoms > 0, "minDomainAtoms must be a positive integer"), o.assert(void 0 === e.errorLevel || "boolean" == typeof e.errorLevel || o.isInteger(e.errorLevel) && e.errorLevel >= 0, "errorLevel must be a non-negative integer or boolean")), this._test("email", e, function(t, n, r) {
                    try {
                        var i = s.validate(t, e);
                        if (!0 === i || 0 === i) return t
                    } catch (e) {}
                    return this.createError("string.email", {
                        value: t
                    }, n, r)
                })
            }, t.prototype.ip = function(e) {
                var t = p.ipRegex;
                e = e || {}, o.assert("object" === (void 0 === e ? "undefined" : r(e)), "options must be an object"), e.cidr ? (o.assert("string" == typeof e.cidr, "cidr must be a string"), e.cidr = e.cidr.toLowerCase(), o.assert(e.cidr in f.cidrs, "cidr must be one of " + Object.keys(f.cidrs).join(", ")), e.version || "optional" === e.cidr || (t = f.createIpRegex(["ipv4", "ipv6", "ipvfuture"], e.cidr))) : e.cidr = "optional";
                var n = void 0;
                if (e.version) {
                    Array.isArray(e.version) || (e.version = [e.version]), o.assert(e.version.length >= 1, "version must have at least 1 version specified"), n = [];
                    for (var i = 0; i < e.version.length; ++i) {
                        var a = e.version[i];
                        o.assert("string" == typeof a, "version at position " + i + " must be a string"), a = a.toLowerCase(), o.assert(f.versions[a], "version at position " + i + " must be one of " + Object.keys(f.versions).join(", ")), n.push(a)
                    }
                    n = o.unique(n), t = f.createIpRegex(n, e.cidr)
                }
                return this._test("ip", e, function(r, i, a) {
                    return t.test(r) ? r : n ? this.createError("string.ipVersion", {
                        value: r,
                        cidr: e.cidr,
                        version: n
                    }, i, a) : this.createError("string.ip", {
                        value: r,
                        cidr: e.cidr
                    }, i, a)
                })
            }, t.prototype.uri = function(e) {
                var t = "",
                    n = !1,
                    i = !1,
                    a = p.uriRegex;
                if (e) {
                    if (o.assert("object" === (void 0 === e ? "undefined" : r(e)), "options must be an object"), e.scheme) {
                        o.assert(e.scheme instanceof RegExp || "string" == typeof e.scheme || Array.isArray(e.scheme), "scheme must be a RegExp, String, or Array"), Array.isArray(e.scheme) || (e.scheme = [e.scheme]), o.assert(e.scheme.length >= 1, "scheme must have at least 1 scheme specified");
                        for (var s = 0; s < e.scheme.length; ++s) {
                            var u = e.scheme[s];
                            o.assert(u instanceof RegExp || "string" == typeof u, "scheme at position " + s + " must be a RegExp or String"), t += t ? "|" : "", u instanceof RegExp ? t += u.source : (o.assert(/[a-zA-Z][a-zA-Z0-9+-\.]*/.test(u), "scheme at position " + s + " must be a valid scheme"), t += o.escapeRegex(u))
                        }
                    }
                    e.allowRelative && (n = !0), e.relativeOnly && (i = !0)
                }
                return (t || n || i) && (a = d.createUriRegex(t, n, i)), this._test("uri", e, function(e, n, r) {
                    return a.test(e) ? e : i ? this.createError("string.uriRelativeOnly", {
                        value: e
                    }, n, r) : t ? this.createError("string.uriCustomScheme", {
                        scheme: t,
                        value: e
                    }, n, r) : this.createError("string.uri", {
                        value: e
                    }, n, r)
                })
            }, t.prototype.isoDate = function() {
                return this._test("isoDate", void 0, function(e, t, n) {
                    return c._isIsoDate(e) ? e : this.createError("string.isoDate", {
                        value: e
                    }, t, n)
                })
            }, t.prototype.guid = function(e) {
                var t = {
                        "{": "}",
                        "[": "]",
                        "(": ")",
                        "": ""
                    },
                    n = {
                        uuidv1: "1",
                        uuidv2: "2",
                        uuidv3: "3",
                        uuidv4: "4",
                        uuidv5: "5"
                    },
                    r = [];
                if (e && e.version) {
                    Array.isArray(e.version) || (e.version = [e.version]), o.assert(e.version.length >= 1, "version must have at least 1 valid version specified");
                    for (var i = 0; i < e.version.length; ++i) {
                        var a = e.version[i];
                        o.assert("string" == typeof a, "version at position " + i + " must be a string"), a = a.toLowerCase(), o.assert(n[a], "version at position " + i + " must be one of " + Object.keys(n).join(", ")), o.assert(-1 === r.indexOf(a), "version at position " + i + " must not be a duplicate."), r.push(a)
                    }
                }
                var s = /^([\[{\(]?)([0-9A-F]{8})([:-]?)([0-9A-F]{4})([:-]?)([0-9A-F]{4})([:-]?)([0-9A-F]{4})([:-]?)([0-9A-F]{12})([\]}\)]?)$/i;
                return this._test("guid", e, function(e, i, a) {
                    var o = s.exec(e);
                    return o ? t[o[1]] !== o[11] ? this.createError("string.guid", {
                        value: e
                    }, i, a) : o[3] !== o[5] || o[3] !== o[7] || o[3] !== o[9] ? this.createError("string.guid", {
                        value: e
                    }, i, a) : !r.length || r.some(function(e) {
                        return o[6][0] === n[e]
                    }) && /[89AB]/i.test(o[8][0]) ? e : this.createError("string.guid", {
                        value: e
                    }, i, a) : this.createError("string.guid", {
                        value: e
                    }, i, a)
                })
            }, t.prototype.hex = function() {
                var e = /^[a-f0-9]+$/i;
                return this._test("hex", e, function(t, n, r) {
                    return e.test(t) ? t : this.createError("string.hex", {
                        value: t
                    }, n, r)
                })
            }, t.prototype.base64 = function() {
                var e = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
                return this._test("base64", e, function(t, n, r) {
                    return e.test(t) ? t : this.createError("string.base64", {
                        value: t
                    }, n, r)
                })
            }, t.prototype.hostname = function() {
                var e = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
                return this._test("hostname", void 0, function(t, n, r) {
                    return t.length <= 255 && e.test(t) || a.isIPv6(t) ? t : this.createError("string.hostname", {
                        value: t
                    }, n, r)
                })
            }, t.prototype.lowercase = function() {
                var e = this._test("lowercase", void 0, function(e, t, n) {
                    return n.convert || e === e.toLocaleLowerCase() ? e : this.createError("string.lowercase", {
                        value: e
                    }, t, n)
                });
                return e._flags.case = "lower", e
            }, t.prototype.uppercase = function() {
                var e = this._test("uppercase", void 0, function(e, t, n) {
                    return n.convert || e === e.toLocaleUpperCase() ? e : this.createError("string.uppercase", {
                        value: e
                    }, t, n)
                });
                return e._flags.case = "upper", e
            }, t.prototype.trim = function() {
                var e = this._test("trim", void 0, function(e, t, n) {
                    return n.convert || e === e.trim() ? e : this.createError("string.trim", {
                        value: e
                    }, t, n)
                });
                return e._flags.trim = !0, e
            }, t.prototype.replace = function(e, t) {
                "string" == typeof e && (e = new RegExp(o.escapeRegex(e), "g")), o.assert(e instanceof RegExp, "pattern must be a RegExp"), o.assert("string" == typeof t, "replacement must be a String");
                var n = this.clone();
                return n._inner.replacements || (n._inner.replacements = []), n._inner.replacements.push({
                    pattern: e,
                    replacement: t
                }), n
            }, t.prototype.truncate = function(e) {
                var t = this.clone();
                return t._flags.truncate = void 0 === e || !!e, t
            }, t
        }(u), p.compare = function(e, n) {
            return function(r, i) {
                var a = l.isRef(r);
                return o.assert(o.isInteger(r) && r >= 0 || a, "limit must be a positive integer or reference"), o.assert(!i || t.isEncoding(i), "Invalid encoding:", i), this._test(e, r, function(t, s, u) {
                    var l = void 0;
                    if (a) {
                        if (l = r(s.reference || s.parent, u), !o.isInteger(l)) return this.createError("string.ref", {
                            ref: r.key
                        }, s, u)
                    } else l = r;
                    return n(t, l, i) ? t : this.createError("string." + e, {
                        limit: l,
                        value: t,
                        encoding: i
                    }, s, u)
                })
            }
        }, p.String.prototype.min = p.compare("min", function(e, n, r) {
            return (r ? t.byteLength(e, r) : e.length) >= n
        }), p.String.prototype.max = p.compare("max", function(e, n, r) {
            return (r ? t.byteLength(e, r) : e.length) <= n
        }), p.String.prototype.length = p.compare("length", function(e, n, r) {
            return (r ? t.byteLength(e, r) : e.length) === n
        }), p.String.prototype.uuid = p.String.prototype.guid, e.exports = new p.String
    }).call(t, n(3).Buffer)
},
function(e, t, n) {
    (function(e) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            i = n(8),
            a = {
                hasOwn: Object.prototype.hasOwnProperty,
                indexOf: Array.prototype.indexOf,
                defaultThreshold: 16,
                maxIPv6Groups: 8,
                categories: {
                    valid: 1,
                    dnsWarn: 7,
                    rfc5321: 15,
                    cfws: 31,
                    deprecated: 63,
                    rfc5322: 127,
                    error: 255
                },
                diagnoses: {
                    valid: 0,
                    dnsWarnNoMXRecord: 5,
                    dnsWarnNoRecord: 6,
                    rfc5321TLD: 9,
                    rfc5321TLDNumeric: 10,
                    rfc5321QuotedString: 11,
                    rfc5321AddressLiteral: 12,
                    cfwsComment: 17,
                    cfwsFWS: 18,
                    deprecatedLocalPart: 33,
                    deprecatedFWS: 34,
                    deprecatedQTEXT: 35,
                    deprecatedQP: 36,
                    deprecatedComment: 37,
                    deprecatedCTEXT: 38,
                    deprecatedIPv6: 39,
                    deprecatedCFWSNearAt: 49,
                    rfc5322Domain: 65,
                    rfc5322TooLong: 66,
                    rfc5322LocalTooLong: 67,
                    rfc5322DomainTooLong: 68,
                    rfc5322LabelTooLong: 69,
                    rfc5322DomainLiteral: 70,
                    rfc5322DomainLiteralOBSDText: 71,
                    rfc5322IPv6GroupCount: 72,
                    rfc5322IPv62x2xColon: 73,
                    rfc5322IPv6BadCharacter: 74,
                    rfc5322IPv6MaxGroups: 75,
                    rfc5322IPv6ColonStart: 76,
                    rfc5322IPv6ColonEnd: 77,
                    errExpectingDTEXT: 129,
                    errNoLocalPart: 130,
                    errNoDomain: 131,
                    errConsecutiveDots: 132,
                    errATEXTAfterCFWS: 133,
                    errATEXTAfterQS: 134,
                    errATEXTAfterDomainLiteral: 135,
                    errExpectingQPair: 136,
                    errExpectingATEXT: 137,
                    errExpectingQTEXT: 138,
                    errExpectingCTEXT: 139,
                    errBackslashEnd: 140,
                    errDotStart: 141,
                    errDotEnd: 142,
                    errDomainHyphenStart: 143,
                    errDomainHyphenEnd: 144,
                    errUnclosedQuotedString: 145,
                    errUnclosedComment: 146,
                    errUnclosedDomainLiteral: 147,
                    errFWSCRLFx2: 148,
                    errFWSCRLFEnd: 149,
                    errCRNoLF: 150,
                    errUnknownTLD: 160,
                    errDomainTooShort: 161
                },
                components: {
                    localpart: 0,
                    domain: 1,
                    literal: 2,
                    contextComment: 3,
                    contextFWS: 4,
                    contextQuotedString: 5,
                    contextQuotedPair: 6
                }
            };
        a.defer = void 0 !== e && e && "function" == typeof e.nextTick ? e.nextTick.bind(e) : function(e) {
            return setTimeout(e, 0)
        }, a.specials = function() {
            for (var e = new Array(256), t = 255; t >= 0; --t) e[t] = !1;
            for (var n = 0; n < '()<>[]:;@\\,."'.length; ++n) e['()<>[]:;@\\,."'.charCodeAt(n)] = !0;
            return function(t) {
                return e[t]
            }
        }(), a.regex = {
            ipV4: /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
            ipV6: /^[a-fA-F\d]{0,4}$/
        }, a.checkIpV6 = function(e) {
            return e.every(function(e) {
                return a.regex.ipV6.test(e)
            })
        }, a.validDomain = function(e, t) {
            return t.tldBlacklist ? Array.isArray(t.tldBlacklist) ? -1 === a.indexOf.call(t.tldBlacklist, e) : !a.hasOwn.call(t.tldBlacklist, e) : Array.isArray(t.tldWhitelist) ? -1 !== a.indexOf.call(t.tldWhitelist, e) : a.hasOwn.call(t.tldWhitelist, e)
        }, t.validate = a.validate = function(e, t, n) {
            if ("function" == typeof(t = t || {}) && (n = t, t = {}), "function" != typeof n) {
                if (t.checkDNS) throw new TypeError("expected callback function for checkDNS option");
                n = null
            }
            var o = void 0,
                s = void 0;
            if ("number" == typeof t.errorLevel ? (o = !0, s = t.errorLevel) : (o = !!t.errorLevel, s = a.diagnoses.valid), t.tldWhitelist)
                if ("string" == typeof t.tldWhitelist) t.tldWhitelist = [t.tldWhitelist];
                else if ("object" !== r(t.tldWhitelist)) throw new TypeError("expected array or object tldWhitelist");
            if (t.tldBlacklist)
                if ("string" == typeof t.tldBlacklist) t.tldBlacklist = [t.tldBlacklist];
                else if ("object" !== r(t.tldBlacklist)) throw new TypeError("expected array or object tldBlacklist");
            if (t.minDomainAtoms && (t.minDomainAtoms !== (0 | +t.minDomainAtoms) || t.minDomainAtoms < 0)) throw new TypeError("expected positive integer minDomainAtoms");
            for (var u = a.diagnoses.valid, l = function(e) {
                    e > u && (u = e)
                }, c = {
                    now: a.components.localpart,
                    prev: a.components.localpart,
                    stack: [a.components.localpart]
                }, d = "", f = {
                    local: "",
                    domain: ""
                }, p = {
                    locals: [""],
                    domains: [""]
                }, _ = 0, h = 0, E = 0, m = void 0, g = !1, v = !1, T = e.length, y = void 0, I = 0; I < T; ++I) {
                switch (y = e[I], c.now) {
                    case a.components.localpart:
                        switch (y) {
                            case "(":
                                0 === h ? l(0 === _ ? a.diagnoses.cfwsComment : a.diagnoses.deprecatedComment) : (l(a.diagnoses.cfwsComment), v = !0), c.stack.push(c.now), c.now = a.components.contextComment;
                                break;
                            case ".":
                                0 === h ? l(0 === _ ? a.diagnoses.errDotStart : a.diagnoses.errConsecutiveDots) : (v && l(a.diagnoses.deprecatedLocalPart), v = !1, h = 0, ++_, f.local += y, p.locals[_] = "");
                                break;
                            case '"':
                                0 === h ? (l(0 === _ ? a.diagnoses.rfc5321QuotedString : a.diagnoses.deprecatedLocalPart), f.local += y, p.locals[_] += y, ++h, v = !0, c.stack.push(c.now), c.now = a.components.contextQuotedString) : l(a.diagnoses.errExpectingATEXT);
                                break;
                            case "\r":
                                if (T === ++I || "\n" !== e[I]) {
                                    l(a.diagnoses.errCRNoLF);
                                    break
                                }
                                case " ":
                                case "\t":
                                    0 === h ? l(0 === _ ? a.diagnoses.cfwsFWS : a.diagnoses.deprecatedFWS) : v = !0, c.stack.push(c.now), c.now = a.components.contextFWS, d = y;
                                    break;
                                case "@":
                                    if (1 !== c.stack.length) throw new Error("unexpected item on context stack");
                                    0 === f.local.length ? l(a.diagnoses.errNoLocalPart) : 0 === h ? l(a.diagnoses.errDotEnd) : f.local.length > 64 ? l(a.diagnoses.rfc5322LocalTooLong) : c.prev !== a.components.contextComment && c.prev !== a.components.contextFWS || l(a.diagnoses.deprecatedCFWSNearAt), c.now = a.components.domain, c.stack[0] = a.components.domain, _ = 0, h = 0, v = !1;
                                    break;
                                default:
                                    if (v) switch (c.prev) {
                                        case a.components.contextComment:
                                        case a.components.contextFWS:
                                            l(a.diagnoses.errATEXTAfterCFWS);
                                            break;
                                        case a.components.contextQuotedString:
                                            l(a.diagnoses.errATEXTAfterQS);
                                            break;
                                        default:
                                            throw new Error("more atext found where none is allowed, but unrecognized prev context: " + c.prev)
                                    } else c.prev = c.now, ((m = y.charCodeAt(0)) < 33 || m > 126 || a.specials(m)) && l(a.diagnoses.errExpectingATEXT), f.local += y, p.locals[_] += y, ++h
                        }
                        break;
                    case a.components.domain:
                        switch (y) {
                            case "(":
                                0 === h ? l(0 === _ ? a.diagnoses.deprecatedCFWSNearAt : a.diagnoses.deprecatedComment) : (v = !0, l(a.diagnoses.cfwsComment)), c.stack.push(c.now), c.now = a.components.contextComment;
                                break;
                            case ".":
                                0 === h ? l(0 === _ ? a.diagnoses.errDotStart : a.diagnoses.errConsecutiveDots) : g ? l(a.diagnoses.errDomainHyphenEnd) : h > 63 && l(a.diagnoses.rfc5322LabelTooLong), v = !1, h = 0, ++_, p.domains[_] = "", f.domain += y;
                                break;
                            case "[":
                                0 === f.domain.length ? (v = !0, ++h, c.stack.push(c.now), c.now = a.components.literal, f.domain += y, p.domains[_] += y, f.literal = "") : l(a.diagnoses.errExpectingATEXT);
                                break;
                            case "\r":
                                if (T === ++I || "\n" !== e[I]) {
                                    l(a.diagnoses.errCRNoLF);
                                    break
                                }
                                case " ":
                                case "\t":
                                    0 === h ? l(0 === _ ? a.diagnoses.deprecatedCFWSNearAt : a.diagnoses.deprecatedFWS) : (l(a.diagnoses.cfwsFWS), v = !0), c.stack.push(c.now), c.now = a.components.contextFWS, d = y;
                                    break;
                                default:
                                    if (v) switch (c.prev) {
                                        case a.components.contextComment:
                                        case a.components.contextFWS:
                                            l(a.diagnoses.errATEXTAfterCFWS);
                                            break;
                                        case a.components.literal:
                                            l(a.diagnoses.errATEXTAfterDomainLiteral);
                                            break;
                                        default:
                                            throw new Error("more atext found where none is allowed, but unrecognized prev context: " + c.prev)
                                    }
                                    g = !1, (m = y.charCodeAt(0)) < 33 || m > 126 || a.specials(m) ? l(a.diagnoses.errExpectingATEXT) : "-" === y ? (0 === h && l(a.diagnoses.errDomainHyphenStart), g = !0) : (m < 48 || m > 122 || m > 57 && m < 65 || m > 90 && m < 97) && l(a.diagnoses.rfc5322Domain), f.domain += y, p.domains[_] += y, ++h
                        }
                        break;
                    case a.components.literal:
                        switch (y) {
                            case "]":
                                if (u < a.categories.deprecated) {
                                    var S = -1,
                                        A = f.literal,
                                        O = a.regex.ipV4.exec(A);
                                    if (O && 0 !== (S = O.index) && (A = A.slice(0, S) + "0:0"), 0 === S) l(a.diagnoses.rfc5321AddressLiteral);
                                    else if ("ipv6:" !== A.slice(0, 5).toLowerCase()) l(a.diagnoses.rfc5322DomainLiteral);
                                    else {
                                        var b = A.slice(5),
                                            N = a.maxIPv6Groups,
                                            C = b.split(":");
                                        ~(S = b.indexOf("::")) ? S !== b.lastIndexOf("::") ? l(a.diagnoses.rfc5322IPv62x2xColon) : (0 !== S && S !== b.length - 2 || ++N, C.length > N ? l(a.diagnoses.rfc5322IPv6MaxGroups) : C.length === N && l(a.diagnoses.deprecatedIPv6)): C.length !== N && l(a.diagnoses.rfc5322IPv6GroupCount), ":" === b[0] && ":" !== b[1] ? l(a.diagnoses.rfc5322IPv6ColonStart) : ":" === b[b.length - 1] && ":" !== b[b.length - 2] ? l(a.diagnoses.rfc5322IPv6ColonEnd) : a.checkIpV6(C) ? l(a.diagnoses.rfc5321AddressLiteral) : l(a.diagnoses.rfc5322IPv6BadCharacter)
                                    }
                                } else l(a.diagnoses.rfc5322DomainLiteral);
                                f.domain += y, p.domains[_] += y, ++h, c.prev = c.now, c.now = c.stack.pop();
                                break;
                            case "\\":
                                l(a.diagnoses.rfc5322DomainLiteralOBSDText), c.stack.push(c.now), c.now = a.components.contextQuotedPair;
                                break;
                            case "\r":
                                if (T === ++I || "\n" !== e[I]) {
                                    l(a.diagnoses.errCRNoLF);
                                    break
                                }
                                case " ":
                                case "\t":
                                    l(a.diagnoses.cfwsFWS), c.stack.push(c.now), c.now = a.components.contextFWS, d = y;
                                    break;
                                default:
                                    if ((m = y.charCodeAt(0)) > 127 || 0 === m || "[" === y) {
                                        l(a.diagnoses.errExpectingDTEXT);
                                        break
                                    }(m < 33 || 127 === m) && l(a.diagnoses.rfc5322DomainLiteralOBSDText), f.literal += y, f.domain += y, p.domains[_] += y, ++h
                        }
                        break;
                    case a.components.contextQuotedString:
                        switch (y) {
                            case "\\":
                                c.stack.push(c.now), c.now = a.components.contextQuotedPair;
                                break;
                            case "\r":
                                if (T === ++I || "\n" !== e[I]) {
                                    l(a.diagnoses.errCRNoLF);
                                    break
                                }
                                case "\t":
                                    f.local += " ", p.locals[_] += " ", ++h, l(a.diagnoses.cfwsFWS), c.stack.push(c.now), c.now = a.components.contextFWS, d = y;
                                    break;
                                case '"':
                                    f.local += y, p.locals[_] += y, ++h, c.prev = c.now, c.now = c.stack.pop();
                                    break;
                                default:
                                    (m = y.charCodeAt(0)) > 127 || 0 === m || 10 === m ? l(a.diagnoses.errExpectingQTEXT) : (m < 32 || 127 === m) && l(a.diagnoses.deprecatedQTEXT), f.local += y, p.locals[_] += y, ++h
                        }
                        break;
                    case a.components.contextQuotedPair:
                        switch ((m = y.charCodeAt(0)) > 127 ? l(a.diagnoses.errExpectingQPair) : (m < 31 && 9 !== m || 127 === m) && l(a.diagnoses.deprecatedQP), c.prev = c.now, c.now = c.stack.pop(), y = "\\" + y, c.now) {
                            case a.components.contextComment:
                                break;
                            case a.components.contextQuotedString:
                                f.local += y, p.locals[_] += y, h += 2;
                                break;
                            case a.components.literal:
                                f.domain += y, p.domains[_] += y, h += 2;
                                break;
                            default:
                                throw new Error("quoted pair logic invoked in an invalid context: " + c.now)
                        }
                        break;
                    case a.components.contextComment:
                        switch (y) {
                            case "(":
                                c.stack.push(c.now), c.now = a.components.contextComment;
                                break;
                            case ")":
                                c.prev = c.now, c.now = c.stack.pop();
                                break;
                            case "\\":
                                c.stack.push(c.now), c.now = a.components.contextQuotedPair;
                                break;
                            case "\r":
                                if (T === ++I || "\n" !== e[I]) {
                                    l(a.diagnoses.errCRNoLF);
                                    break
                                }
                                case " ":
                                case "\t":
                                    l(a.diagnoses.cfwsFWS), c.stack.push(c.now), c.now = a.components.contextFWS, d = y;
                                    break;
                                default:
                                    if ((m = y.charCodeAt(0)) > 127 || 0 === m || 10 === m) {
                                        l(a.diagnoses.errExpectingCTEXT);
                                        break
                                    }(m < 32 || 127 === m) && l(a.diagnoses.deprecatedCTEXT)
                        }
                        break;
                    case a.components.contextFWS:
                        if ("\r" === d) {
                            if ("\r" === y) {
                                l(a.diagnoses.errFWSCRLFx2);
                                break
                            }++E > 1 ? l(a.diagnoses.deprecatedFWS) : E = 1
                        }
                        switch (y) {
                            case "\r":
                                T !== ++I && "\n" === e[I] || l(a.diagnoses.errCRNoLF);
                                break;
                            case " ":
                            case "\t":
                                break;
                            default:
                                "\r" === d && l(a.diagnoses.errFWSCRLFEnd), E = 0, c.prev = c.now, c.now = c.stack.pop(), --I
                        }
                        d = y;
                        break;
                    default:
                        throw new Error("unknown context: " + c.now)
                }
                if (u > a.categories.rfc5322) break
            }
            if (u < a.categories.rfc5322)
                if (c.now === a.components.contextQuotedString) l(a.diagnoses.errUnclosedQuotedString);
                else if (c.now === a.components.contextQuotedPair) l(a.diagnoses.errBackslashEnd);
            else if (c.now === a.components.contextComment) l(a.diagnoses.errUnclosedComment);
            else if (c.now === a.components.literal) l(a.diagnoses.errUnclosedDomainLiteral);
            else if ("\r" === y) l(a.diagnoses.errFWSCRLFEnd);
            else if (0 === f.domain.length) l(a.diagnoses.errNoDomain);
            else if (0 === h) l(a.diagnoses.errDotEnd);
            else if (g) l(a.diagnoses.errDomainHyphenEnd);
            else if (f.domain.length > 255) l(a.diagnoses.rfc5322DomainTooLong);
            else if (f.local.length + f.domain.length + 1 > 254) l(a.diagnoses.rfc5322TooLong);
            else if (h > 63) l(a.diagnoses.rfc5322LabelTooLong);
            else if (t.minDomainAtoms && p.domains.length < t.minDomainAtoms) l(a.diagnoses.errDomainTooShort);
            else if (t.tldWhitelist || t.tldBlacklist) {
                var R = p.domains[_];
                a.validDomain(R, t) || l(a.diagnoses.errUnknownTLD)
            }
            var L = !1,
                D = !1,
                P = function() {
                    !L && u < a.categories.dnsWarn && (p.domains[_].charCodeAt(0) <= 57 ? l(a.diagnoses.rfc5321TLDNumeric) : 0 === _ && l(a.diagnoses.rfc5321TLD)), u < s && (u = a.diagnoses.valid);
                    var e = o ? u : u < a.defaultThreshold;
                    return n && (D ? n(e) : a.defer(n.bind(null, e))), e
                };
            if (!(t.checkDNS && u < a.categories.dnsWarn)) {
                var M = P();
                return D = !0, M
            }! function() {
                0 === _ && (f.domain += ".");
                var e = f.domain;
                i.resolveMx(e, function(t, n) {
                    if (t && t.code !== i.NODATA) return l(a.diagnoses.dnsWarnNoRecord), P();
                    if (n && n.length) return L = !0, P();
                    var r = 3,
                        o = !1;
                    l(a.diagnoses.dnsWarnNoMXRecord);
                    var s = function(e, t) {
                        if (!o) {
                            if (--r, t && t.length) return o = !0, P();
                            0 === r && (l(a.diagnoses.dnsWarnNoRecord), o = !0, P())
                        }
                    };
                    i.resolveCname(e, s), i.resolve4(e, s), i.resolve6(e, s)
                }), D = !0
            }()
        }, t.diagnoses = a.validate.diagnoses = function() {
            for (var e = {}, t = Object.keys(a.diagnoses), n = 0; n < t.length; ++n) {
                var r = t[n];
                e[r] = a.diagnoses[r]
            }
            return e
        }()
    }).call(t, n(7))
},
function(e, t, n) {
    "use strict";
    var r = n(24),
        i = {
            Uri: {
                createUriRegex: function(e, t, n) {
                    var i = r.scheme,
                        a = void 0;
                    if (n) a = "(?:" + r.relativeRef + ")";
                    else {
                        e && (i = "(?:" + e + ")");
                        var o = "(?:" + i + ":" + r.hierPart + ")";
                        a = t ? "(?:" + o + "|" + r.relativeRef + ")" : o
                    }
                    return new RegExp("^" + a + "(?:\\?" + r.query + ")?(?:#" + r.fragment + ")?$")
                }
            }
        };
    e.exports = i.Uri
},
function(e, t) {
    "use strict";
    var n = {
        rfc3986: {},
        generate: function() {
            var e = "|";
            n.rfc3986.cidr = "[0-9]|[1-2][0-9]|3[0-2]";
            var t = "a-zA-Z0-9-\\._~",
                r = "!\\$&'\\(\\)\\*\\+,;=",
                i = t + "%0-9A-Fa-f" + r + ":@",
                a = "[" + i + "]",
                o = "(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
            n.rfc3986.IPv4address = "(?:" + o + "\\.){3}" + o;
            var s = "[0-9A-Fa-f]{1,4}",
                u = "(?:" + s + ":" + s + "|" + n.rfc3986.IPv4address + ")",
                l = "(?:" + s + ":){6}" + u,
                c = "::(?:" + s + ":){5}" + u,
                d = "(?:" + s + ")?::(?:" + s + ":){4}" + u,
                f = "(?:(?:" + s + ":){0,1}" + s + ")?::(?:" + s + ":){3}" + u,
                p = "(?:(?:" + s + ":){0,2}" + s + ")?::(?:" + s + ":){2}" + u,
                _ = "(?:(?:" + s + ":){0,3}" + s + ")?::" + s + ":" + u,
                h = "(?:(?:" + s + ":){0,4}" + s + ")?::" + u;
            n.rfc3986.IPv6address = "(?:" + l + e + c + e + d + e + f + e + p + e + _ + e + h + e + "(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}" + e + "(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)", n.rfc3986.IPvFuture = "v[0-9A-Fa-f]+\\.[" + t + r + ":]+", n.rfc3986.scheme = "[a-zA-Z][a-zA-Z0-9+-\\.]*";
            var E = "(?:[a-zA-Z0-9-\\._~%0-9A-Fa-f!\\$&'\\(\\)\\*\\+,;=:]*@)?(?:\\[(?:" + n.rfc3986.IPv6address + e + n.rfc3986.IPvFuture + ")\\]" + e + n.rfc3986.IPv4address + e + "[a-zA-Z0-9-\\._~%0-9A-Fa-f!\\$&'\\(\\)\\*\\+,;=]{0,255})(?::[0-9]*)?",
                m = a + "+",
                g = "(?:\\/[a-zA-Z0-9-\\._~%0-9A-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*",
                v = "\\/(?:" + m + g + ")?";
            n.rfc3986.hierPart = "(?:(?:\\/\\/" + E + g + ")" + e + v + e + "[a-zA-Z0-9-\\._~%0-9A-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]+(?:\\/[a-zA-Z0-9-\\._~%0-9A-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*)", n.rfc3986.relativeRef = "(?:(?:\\/\\/" + E + g + ")" + e + v + e + "[a-zA-Z0-9-\\._~%0-9A-Fa-f!\\$&'\\(\\)\\*\\+,;=@]+(?:\\/[a-zA-Z0-9-\\._~%0-9A-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*" + e + ")", n.rfc3986.query = "[" + i + "\\/\\?]*(?=#|$)", n.rfc3986.fragment = "[" + i + "\\/\\?]*"
        }
    };
    n.generate(), e.exports = n.rfc3986
},
function(e, t, n) {
    "use strict";
    var r = n(24),
        i = {
            Ip: {
                cidrs: {
                    required: "\\/(?:" + r.cidr + ")",
                    optional: "(?:\\/(?:" + r.cidr + "))?",
                    forbidden: ""
                },
                versions: {
                    ipv4: r.IPv4address,
                    ipv6: r.IPv6address,
                    ipvfuture: r.IPvFuture
                }
            }
        };
    i.Ip.createIpRegex = function(e, t) {
        for (var n = void 0, r = 0; r < e.length; ++r) {
            var a = e[r];
            n || (n = "^(?:" + i.Ip.versions[a]), n = n + "|" + i.Ip.versions[a]
        }
        return new RegExp(n + ")" + i.Ip.cidrs[t] + "$")
    }, e.exports = i.Ip
},
function(e, t, n) {
    "use strict";

    function r(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : function(e, t) {
            for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
                var i = n[r],
                    a = Object.getOwnPropertyDescriptor(t, i);
                a && a.configurable && void 0 === e[i] && Object.defineProperty(e, i, a)
            }
        }(e, t))
    }
    var i = n(14),
        a = n(15),
        o = n(2),
        s = {
            precisionRx: /(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/
        };
    s.Number = function(e) {
        function t() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            var n = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, e.call(this));
            return n._type = "number", n._invalids.add(1 / 0), n._invalids.add(-1 / 0), n
        }
        return r(t, e), t.prototype._base = function(e, t, n) {
            var r = {
                errors: null,
                value: e
            };
            if ("string" == typeof e && n.convert) {
                var i = parseFloat(e);
                r.value = isNaN(i) || !isFinite(e) ? NaN : i
            }
            var a = "number" == typeof r.value && !isNaN(r.value);
            if (n.convert && "precision" in this._flags && a) {
                var o = Math.pow(10, this._flags.precision);
                r.value = Math.round(r.value * o) / o
            }
            return r.errors = a ? null : this.createError("number.base", null, t, n), r
        }, t.prototype.multiple = function(e) {
            var t = a.isRef(e);
            return t || (o.assert("number" == typeof e && isFinite(e), "multiple must be a number"), o.assert(e > 0, "multiple must be greater than 0")), this._test("multiple", e, function(n, r, i) {
                var a = t ? e(r.reference || r.parent, i) : e;
                return !t || "number" == typeof a && isFinite(a) ? n % a == 0 ? n : this.createError("number.multiple", {
                    multiple: e,
                    value: n
                }, r, i) : this.createError("number.ref", {
                    ref: e.key
                }, r, i)
            })
        }, t.prototype.integer = function() {
            return this._test("integer", void 0, function(e, t, n) {
                return o.isInteger(e) ? e : this.createError("number.integer", {
                    value: e
                }, t, n)
            })
        }, t.prototype.negative = function() {
            return this._test("negative", void 0, function(e, t, n) {
                return e < 0 ? e : this.createError("number.negative", {
                    value: e
                }, t, n)
            })
        }, t.prototype.positive = function() {
            return this._test("positive", void 0, function(e, t, n) {
                return e > 0 ? e : this.createError("number.positive", {
                    value: e
                }, t, n)
            })
        }, t.prototype.precision = function(e) {
            o.assert(o.isInteger(e), "limit must be an integer"), o.assert(!("precision" in this._flags), "precision already set");
            var t = this._test("precision", e, function(t, n, r) {
                var i = t.toString().match(s.precisionRx);
                return Math.max((i[1] ? i[1].length : 0) - (i[2] ? parseInt(i[2], 10) : 0), 0) <= e ? t : this.createError("number.precision", {
                    limit: e,
                    value: t
                }, n, r)
            });
            return t._flags.precision = e, t
        }, t
    }(i), s.compare = function(e, t) {
        return function(n) {
            var r = a.isRef(n),
                i = "number" == typeof n && !isNaN(n);
            return o.assert(i || r, "limit must be a number or reference"), this._test(e, n, function(i, a, o) {
                var s = void 0;
                if (r) {
                    if ("number" != typeof(s = n(a.reference || a.parent, o)) || isNaN(s)) return this.createError("number.ref", {
                        ref: n.key
                    }, a, o)
                } else s = n;
                return t(i, s) ? i : this.createError("number." + e, {
                    limit: s,
                    value: i
                }, a, o)
            })
        }
    }, s.Number.prototype.min = s.compare("min", function(e, t) {
        return e >= t
    }), s.Number.prototype.max = s.compare("max", function(e, t) {
        return e <= t
    }), s.Number.prototype.greater = s.compare("greater", function(e, t) {
        return e > t
    }), s.Number.prototype.less = s.compare("less", function(e, t) {
        return e < t
    }), e.exports = new s.Number
},
function(e, t, n) {
    "use strict";

    function r(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : function(e, t) {
            for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
                var i = n[r],
                    a = Object.getOwnPropertyDescriptor(t, i);
                a && a.configurable && void 0 === e[i] && Object.defineProperty(e, i, a)
            }
        }(e, t))
    }
    var i = n(14),
        a = n(2),
        o = {
            Set: n(18)
        };
    o.Boolean = function(e) {
        function t() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            var n = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, e.call(this));
            return n._type = "boolean", n._flags.insensitive = !0, n._inner.truthySet = new o.Set, n._inner.falsySet = new o.Set, n
        }
        return r(t, e), t.prototype._base = function(e, t, n) {
            var r = {
                value: e
            };
            return r.value = !!this._inner.truthySet.has(e, null, null, this._flags.insensitive) || !this._inner.falsySet.has(e, null, null, this._flags.insensitive) && e, r.errors = "boolean" == typeof r.value ? null : this.createError("boolean.base", null, t, n), r
        }, t.prototype.truthy = function() {
            for (var e = this.clone(), t = a.flatten(Array.prototype.slice.call(arguments)), n = 0; n < t.length; ++n) {
                var r = t[n];
                a.assert(void 0 !== r, "Cannot call truthy with undefined"), e._inner.truthySet.add(r)
            }
            return e
        }, t.prototype.falsy = function() {
            for (var e = this.clone(), t = a.flatten(Array.prototype.slice.call(arguments)), n = 0; n < t.length; ++n) {
                var r = t[n];
                a.assert(void 0 !== r, "Cannot call falsy with undefined"), e._inner.falsySet.add(r)
            }
            return e
        }, t.prototype.insensitive = function(e) {
            var t = void 0 === e || !!e;
            if (t !== this._flags.insensitive) {
                var n = this.clone();
                return n._flags.insensitive = t, n
            }
            return this
        }, t.prototype.describe = function() {
            var e = i.prototype.describe.call(this);
            return e.truthy = [!0].concat(this._inner.truthySet.values()), e.falsy = [!1].concat(this._inner.falsySet.values()), e
        }, t
    }(i), e.exports = new o.Boolean
},
function(e, t, n) {
    "use strict";
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : function(e, t) {
            for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
                var i = n[r],
                    a = Object.getOwnPropertyDescriptor(t, i);
                a && a.configurable && void 0 === e[i] && Object.defineProperty(e, i, a)
            }
        }(e, t))
    }
    var a = n(2),
        o = n(14),
        s = n(19),
        u = n(15),
        l = {};
    l.Alternatives = function(e) {
        function t() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            var n = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, e.call(this));
            return n._type = "alternatives", n._invalids.remove(null), n._inner.matches = [], n
        }
        return i(t, e), t.prototype._base = function(e, t, n) {
            for (var r = [], i = this._inner.matches.length, a = this._settings && this._settings.baseType, o = 0; o < i; ++o) {
                var s = this._inner.matches[o],
                    u = s.schema;
                if (u) {
                    var l = u._validate(e, t, n);
                    if (!l.errors) return l;
                    r = r.concat(l.errors)
                } else if (s.is._validate(s.ref(t.reference || t.parent, n), null, n, t.parent).errors) {
                    if (s.otherwise) return s.otherwise._validate(e, t, n);
                    if (a && o === i - 1) return a._validate(e, t, n)
                } else if (s.then || a) return (s.then || a)._validate(e, t, n)
            }
            return {
                errors: r.length ? r : this.createError("alternatives.base", null, t, n)
            }
        }, t.prototype.try = function() {
            var e = a.flatten(Array.prototype.slice.call(arguments));
            a.assert(e.length, "Cannot add other alternatives without at least one schema");
            for (var t = this.clone(), n = 0; n < e.length; ++n) {
                var r = s.schema(e[n]);
                r._refs.length && (t._refs = t._refs.concat(r._refs)), t._inner.matches.push({
                    schema: r
                })
            }
            return t
        }, t.prototype.when = function(e, t) {
            a.assert(u.isRef(e) || "string" == typeof e, "Invalid reference:", e), a.assert(t, "Missing options"), a.assert("object" === (void 0 === t ? "undefined" : r(t)), "Invalid options"), a.assert(t.hasOwnProperty("is"), 'Missing "is" directive'), a.assert(void 0 !== t.then || void 0 !== t.otherwise, 'options must have at least one of "then" or "otherwise"');
            var n = this.clone(),
                i = s.schema(t.is);
            null !== t.is && (u.isRef(t.is) || t.is instanceof o) || (i = i.required());
            var l = {
                ref: s.ref(e),
                is: i,
                then: void 0 !== t.then ? s.schema(t.then) : void 0,
                otherwise: void 0 !== t.otherwise ? s.schema(t.otherwise) : void 0
            };
            return n._settings && n._settings.baseType && (l.then = l.then && n._settings.baseType.concat(l.then), l.otherwise = l.otherwise && n._settings.baseType.concat(l.otherwise)), u.push(n._refs, l.ref), n._refs = n._refs.concat(l.is._refs), l.then && l.then._refs && (n._refs = n._refs.concat(l.then._refs)), l.otherwise && l.otherwise._refs && (n._refs = n._refs.concat(l.otherwise._refs)), n._inner.matches.push(l), n
        }, t.prototype.describe = function() {
            for (var e = o.prototype.describe.call(this), t = [], n = 0; n < this._inner.matches.length; ++n) {
                var r = this._inner.matches[n];
                if (r.schema) t.push(r.schema.describe());
                else {
                    var i = {
                        ref: r.ref.toString(),
                        is: r.is.describe()
                    };
                    r.then && (i.then = r.then.describe()), r.otherwise && (i.otherwise = r.otherwise.describe()), t.push(i)
                }
            }
            return e.alternatives = t, e
        }, t
    }(o), e.exports = new l.Alternatives
},
function(e, t, n) {
    "use strict";
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : function(e, t) {
            for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
                var i = n[r],
                    a = Object.getOwnPropertyDescriptor(t, i);
                a && a.configurable && void 0 === e[i] && Object.defineProperty(e, i, a)
            }
        }(e, t))
    }
    var a = n(2),
        o = n(30),
        s = n(14),
        u = n(16),
        l = n(19),
        c = n(15),
        d = {};
    d.Object = function(e) {
        function t() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            var n = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, e.call(this));
            return n._type = "object", n._inner.children = null, n._inner.renames = [], n._inner.dependencies = [], n._inner.patterns = [], n
        }
        return i(t, e), t.prototype._base = function(e, t, n) {
            var i = e,
                o = [],
                s = function() {
                    return {
                        value: i,
                        errors: o.length ? o : null
                    }
                };
            "string" == typeof e && n.convert && (e = d.safeParse(e));
            var l = this._flags.func ? "function" : "object";
            if (!e || (void 0 === e ? "undefined" : r(e)) !== l || Array.isArray(e)) return o.push(this.createError(l + ".base", null, t, n)), s();
            if (!(this._inner.renames.length || this._inner.dependencies.length || this._inner.children || this._inner.patterns.length)) return i = e, s();
            if (i === e) {
                "object" === l ? i = Object.create(Object.getPrototypeOf(e)) : (i = function() {
                    return e.apply(this, arguments)
                }).prototype = a.clone(e.prototype);
                for (var c = Object.keys(e), f = 0; f < c.length; ++f) i[c[f]] = e[c[f]]
            } else i = e;
            for (var p = {}, _ = 0; _ < this._inner.renames.length; ++_) {
                var h = this._inner.renames[_];
                if (!h.options.ignoreUndefined || void 0 !== i[h.from]) {
                    if (!h.options.multiple && p[h.to] && (o.push(this.createError("object.rename.multiple", {
                            from: h.from,
                            to: h.to
                        }, t, n)), n.abortEarly)) return s();
                    if (Object.prototype.hasOwnProperty.call(i, h.to) && !h.options.override && !p[h.to] && (o.push(this.createError("object.rename.override", {
                            from: h.from,
                            to: h.to
                        }, t, n)), n.abortEarly)) return s();
                    void 0 === i[h.from] ? delete i[h.to] : i[h.to] = i[h.from], p[h.to] = !0, h.options.alias || delete i[h.from]
                }
            }
            if (!this._inner.children && !this._inner.patterns.length && !this._inner.dependencies.length) return s();
            var E = a.mapToObject(Object.keys(i));
            if (this._inner.children)
                for (var m = 0; m < this._inner.children.length; ++m) {
                    var g = this._inner.children[m],
                        v = g.key,
                        T = i[v];
                    delete E[v];
                    var y = {
                            key: v,
                            path: (t.path || "") + (t.path && v ? "." : "") + v,
                            parent: i,
                            reference: t.reference
                        },
                        I = g.schema._validate(T, y, n);
                    if (I.errors && (o.push(this.createError("object.child", {
                            key: v,
                            child: g.schema._getLabel(v),
                            reason: I.errors
                        }, y, n)), n.abortEarly)) return s();
                    g.schema._flags.strip || void 0 === I.value && I.value !== T ? delete i[v] : void 0 !== I.value && (i[v] = I.value)
                }
            var S = Object.keys(E);
            if (S.length && this._inner.patterns.length) {
                for (var A = 0; A < S.length; ++A)
                    for (var O = S[A], b = {
                            key: O,
                            path: (t.path ? t.path + "." : "") + O,
                            parent: i,
                            reference: t.reference
                        }, N = i[O], C = 0; C < this._inner.patterns.length; ++C) {
                        var R = this._inner.patterns[C];
                        if (R.regex.test(O)) {
                            delete E[O];
                            var L = R.rule._validate(N, b, n);
                            if (L.errors && (o.push(this.createError("object.child", {
                                    key: O,
                                    child: R.rule._getLabel(O),
                                    reason: L.errors
                                }, b, n)), n.abortEarly)) return s();
                            void 0 !== L.value && (i[O] = L.value)
                        }
                    }
                S = Object.keys(E)
            }
            if ((this._inner.children || this._inner.patterns.length) && S.length) {
                if (n.stripUnknown || n.skipFunctions) {
                    for (var D = !(!n.stripUnknown || !0 !== n.stripUnknown && !n.stripUnknown.objects), P = 0; P < S.length; ++P) {
                        var M = S[P];
                        D ? (delete i[M], delete E[M]) : "function" == typeof i[M] && delete E[M]
                    }
                    S = Object.keys(E)
                }
                if (S.length && (void 0 !== this._flags.allowUnknown ? !this._flags.allowUnknown : !n.allowUnknown))
                    for (var w = 0; w < S.length; ++w) {
                        var U = S[w];
                        o.push(this.createError("object.allowUnknown", {
                            child: U
                        }, {
                            key: U,
                            path: t.path + (t.path ? "." : "") + U
                        }, n))
                    }
            }
            for (var k = 0; k < this._inner.dependencies.length; ++k) {
                var x = this._inner.dependencies[k],
                    G = d[x.type].call(this, null !== x.key && i[x.key], x.peers, i, {
                        key: x.key,
                        path: (t.path || "") + (x.key ? "." + x.key : "")
                    }, n);
                if (G instanceof u.Err && (o.push(G), n.abortEarly)) return s()
            }
            return s()
        }, t.prototype._func = function() {
            var e = this.clone();
            return e._flags.func = !0, e
        }, t.prototype.keys = function(e) {
            a.assert(null == e || "object" === (void 0 === e ? "undefined" : r(e)), "Object schema must be a valid object"), a.assert(!(e && e instanceof s), "Object schema cannot be a joi schema");
            var t = this.clone();
            if (!e) return t._inner.children = null, t;
            var n = Object.keys(e);
            if (!n.length) return t._inner.children = [], t;
            var i = new o;
            if (t._inner.children)
                for (var u = 0; u < t._inner.children.length; ++u) {
                    var c = t._inner.children[u]; - 1 === n.indexOf(c.key) && i.add(c, {
                        after: c._refs,
                        group: c.key
                    })
                }
            for (var d = 0; d < n.length; ++d) {
                var f = n[d],
                    p = e[f];
                try {
                    var _ = l.schema(p);
                    i.add({
                        key: f,
                        schema: _
                    }, {
                        after: _._refs,
                        group: f
                    })
                } catch (e) {
                    throw e.hasOwnProperty("path") ? e.path = f + "." + e.path : e.path = f, e
                }
            }
            return t._inner.children = i.nodes, t
        }, t.prototype.unknown = function(e) {
            var t = this.clone();
            return t._flags.allowUnknown = !1 !== e, t
        }, t.prototype.length = function(e) {
            return a.assert(a.isInteger(e) && e >= 0, "limit must be a positive integer"), this._test("length", e, function(t, n, r) {
                return Object.keys(t).length === e ? t : this.createError("object.length", {
                    limit: e
                }, n, r)
            })
        }, t.prototype.arity = function(e) {
            return a.assert(a.isInteger(e) && e >= 0, "n must be a positive integer"), this._test("arity", e, function(t, n, r) {
                return t.length === e ? t : this.createError("function.arity", {
                    n: e
                }, n, r)
            })
        }, t.prototype.minArity = function(e) {
            return a.assert(a.isInteger(e) && e > 0, "n must be a strict positive integer"), this._test("minArity", e, function(t, n, r) {
                return t.length >= e ? t : this.createError("function.minArity", {
                    n: e
                }, n, r)
            })
        }, t.prototype.maxArity = function(e) {
            return a.assert(a.isInteger(e) && e >= 0, "n must be a positive integer"), this._test("maxArity", e, function(t, n, r) {
                return t.length <= e ? t : this.createError("function.maxArity", {
                    n: e
                }, n, r)
            })
        }, t.prototype.min = function(e) {
            return a.assert(a.isInteger(e) && e >= 0, "limit must be a positive integer"), this._test("min", e, function(t, n, r) {
                return Object.keys(t).length >= e ? t : this.createError("object.min", {
                    limit: e
                }, n, r)
            })
        }, t.prototype.max = function(e) {
            return a.assert(a.isInteger(e) && e >= 0, "limit must be a positive integer"), this._test("max", e, function(t, n, r) {
                return Object.keys(t).length <= e ? t : this.createError("object.max", {
                    limit: e
                }, n, r)
            })
        }, t.prototype.pattern = function(e, t) {
            a.assert(e instanceof RegExp, "Invalid regular expression"), a.assert(void 0 !== t, "Invalid rule"), e = new RegExp(e.source, e.ignoreCase ? "i" : void 0);
            try {
                t = l.schema(t)
            } catch (e) {
                throw e.hasOwnProperty("path") && (e.message = e.message + "(" + e.path + ")"), e
            }
            var n = this.clone();
            return n._inner.patterns.push({
                regex: e,
                rule: t
            }), n
        }, t.prototype.schema = function() {
            return this._test("schema", null, function(e, t, n) {
                return e instanceof s ? e : this.createError("object.schema", null, t, n)
            })
        }, t.prototype.with = function(e, t) {
            return this._dependency("with", e, t)
        }, t.prototype.without = function(e, t) {
            return this._dependency("without", e, t)
        }, t.prototype.xor = function() {
            var e = a.flatten(Array.prototype.slice.call(arguments));
            return this._dependency("xor", null, e)
        }, t.prototype.or = function() {
            var e = a.flatten(Array.prototype.slice.call(arguments));
            return this._dependency("or", null, e)
        }, t.prototype.and = function() {
            var e = a.flatten(Array.prototype.slice.call(arguments));
            return this._dependency("and", null, e)
        }, t.prototype.nand = function() {
            var e = a.flatten(Array.prototype.slice.call(arguments));
            return this._dependency("nand", null, e)
        }, t.prototype.requiredKeys = function(e) {
            return e = a.flatten(Array.prototype.slice.call(arguments)), this.applyFunctionToChildren(e, "required")
        }, t.prototype.optionalKeys = function(e) {
            return e = a.flatten(Array.prototype.slice.call(arguments)), this.applyFunctionToChildren(e, "optional")
        }, t.prototype.rename = function(e, t, n) {
            a.assert("string" == typeof e, "Rename missing the from argument"), a.assert("string" == typeof t, "Rename missing the to argument"), a.assert(t !== e, "Cannot rename key to same name:", e);
            for (var r = 0; r < this._inner.renames.length; ++r) a.assert(this._inner.renames[r].from !== e, "Cannot rename the same key multiple times");
            var i = this.clone();
            return i._inner.renames.push({
                from: e,
                to: t,
                options: a.applyToDefaults(d.renameDefaults, n || {})
            }), i
        }, t.prototype.applyFunctionToChildren = function(e, t, n, r) {
            e = [].concat(e), a.assert(e.length > 0, "expected at least one children");
            var i = d.groupChildren(e),
                o = void 0;
            if ("" in i ? (o = this[t].apply(this, n), delete i[""]) : o = this.clone(), o._inner.children) {
                r = r ? r + "." : "";
                for (var s = 0; s < o._inner.children.length; ++s) {
                    var u = o._inner.children[s],
                        l = i[u.key];
                    l && (o._inner.children[s] = {
                        key: u.key,
                        _refs: u._refs,
                        schema: u.schema.applyFunctionToChildren(l, t, n, r + u.key)
                    }, delete i[u.key])
                }
            }
            var c = Object.keys(i);
            return a.assert(0 === c.length, "unknown key(s)", c.join(", ")), o
        }, t.prototype._dependency = function(e, t, n) {
            n = [].concat(n);
            for (var r = 0; r < n.length; ++r) a.assert("string" == typeof n[r], e, "peers must be a string or array of strings");
            var i = this.clone();
            return i._inner.dependencies.push({
                type: e,
                key: t,
                peers: n
            }), i
        }, t.prototype.describe = function(e) {
            var t = s.prototype.describe.call(this);
            if (t.rules)
                for (var n = 0; n < t.rules.length; ++n) {
                    var i = t.rules[n];
                    i.arg && "object" === r(i.arg) && i.arg.schema && i.arg.ref && (i.arg = {
                        schema: i.arg.schema.describe(),
                        ref: i.arg.ref.toString()
                    })
                }
            if (this._inner.children && !e) {
                t.children = {};
                for (var o = 0; o < this._inner.children.length; ++o) {
                    var u = this._inner.children[o];
                    t.children[u.key] = u.schema.describe()
                }
            }
            if (this._inner.dependencies.length && (t.dependencies = a.clone(this._inner.dependencies)), this._inner.patterns.length) {
                t.patterns = [];
                for (var l = 0; l < this._inner.patterns.length; ++l) {
                    var c = this._inner.patterns[l];
                    t.patterns.push({
                        regex: c.regex.toString(),
                        rule: c.rule.describe()
                    })
                }
            }
            return this._inner.renames.length > 0 && (t.renames = a.clone(this._inner.renames)), t
        }, t.prototype.assert = function(e, t, n) {
            e = l.ref(e), a.assert(e.isContext || e.depth > 1, "Cannot use assertions for root level references - use direct key rules instead"), n = n || "pass the assertion test";
            try {
                t = l.schema(t)
            } catch (e) {
                throw e.hasOwnProperty("path") && (e.message = e.message + "(" + e.path + ")"), e
            }
            var r = e.path[e.path.length - 1],
                i = e.path.join(".");
            return this._test("assert", {
                schema: t,
                ref: e
            }, function(o, s, u) {
                if (!t._validate(e(o), null, u, o).errors) return o;
                var l = a.merge({}, s);
                return l.key = r, l.path = i, this.createError("object.assert", {
                    ref: l.path,
                    message: n
                }, l, u)
            })
        }, t.prototype.type = function(e, t) {
            a.assert("function" == typeof e, "type must be a constructor function");
            var n = {
                name: t || e.name,
                ctor: e
            };
            return this._test("type", n, function(t, r, i) {
                return t instanceof e ? t : this.createError("object.type", {
                    type: n.name
                }, r, i)
            })
        }, t.prototype.ref = function() {
            return this._test("ref", null, function(e, t, n) {
                return c.isRef(e) ? e : this.createError("function.ref", null, t, n)
            })
        }, t
    }(s), d.safeParse = function(e) {
        try {
            return JSON.parse(e)
        } catch (e) {}
        return e
    }, d.renameDefaults = {
        alias: !1,
        multiple: !1,
        override: !1
    }, d.groupChildren = function(e) {
        e.sort();
        for (var t = {}, n = 0; n < e.length; ++n) {
            var r = e[n];
            a.assert("string" == typeof r, "children must be strings");
            var i = r.split(".")[0];
            (t[i] = t[i] || []).push(r.substring(i.length + 1))
        }
        return t
    }, d.with = function(e, t, n, r, i) {
        if (void 0 === e) return e;
        for (var a = 0; a < t.length; ++a) {
            var o = t[a];
            if (!Object.prototype.hasOwnProperty.call(n, o) || void 0 === n[o]) return this.createError("object.with", {
                peer: o
            }, r, i)
        }
        return e
    }, d.without = function(e, t, n, r, i) {
        if (void 0 === e) return e;
        for (var a = 0; a < t.length; ++a) {
            var o = t[a];
            if (Object.prototype.hasOwnProperty.call(n, o) && void 0 !== n[o]) return this.createError("object.without", {
                peer: o
            }, r, i)
        }
        return e
    }, d.xor = function(e, t, n, r, i) {
        for (var a = [], o = 0; o < t.length; ++o) {
            var s = t[o];
            Object.prototype.hasOwnProperty.call(n, s) && void 0 !== n[s] && a.push(s)
        }
        return 1 === a.length ? e : 0 === a.length ? this.createError("object.missing", {
            peers: t
        }, r, i) : this.createError("object.xor", {
            peers: t
        }, r, i)
    }, d.or = function(e, t, n, r, i) {
        for (var a = 0; a < t.length; ++a) {
            var o = t[a];
            if (Object.prototype.hasOwnProperty.call(n, o) && void 0 !== n[o]) return e
        }
        return this.createError("object.missing", {
            peers: t
        }, r, i)
    }, d.and = function(e, t, n, r, i) {
        for (var a = [], o = [], s = t.length, u = 0; u < s; ++u) {
            var l = t[u];
            Object.prototype.hasOwnProperty.call(n, l) && void 0 !== n[l] ? o.push(l) : a.push(l)
        }
        return a.length === s || o.length === s ? null : this.createError("object.and", {
            present: o,
            missing: a
        }, r, i)
    }, d.nand = function(e, t, n, r, i) {
        for (var o = [], s = 0; s < t.length; ++s) {
            var u = t[s];
            Object.prototype.hasOwnProperty.call(n, u) && void 0 !== n[u] && o.push(u)
        }
        var l = a.clone(t),
            c = l.splice(0, 1)[0];
        return o.length === t.length ? this.createError("object.nand", {
            main: c,
            peers: l
        }, r, i) : null
    }, e.exports = new d.Object
},
function(e, t, n) {
    "use strict";
    var r = n(2),
        i = {};
    e.exports = i.Topo = function() {
        this._items = [], this.nodes = []
    }, i.Topo.prototype.add = function(e, t) {
        var n = this,
            i = [].concat((t = t || {}).before || []),
            a = [].concat(t.after || []),
            o = t.group || "?",
            s = t.sort || 0;
        r.assert(-1 === i.indexOf(o), "Item cannot come before itself:", o), r.assert(-1 === i.indexOf("?"), "Item cannot come before unassociated items"), r.assert(-1 === a.indexOf(o), "Item cannot come after itself:", o), r.assert(-1 === a.indexOf("?"), "Item cannot come after unassociated items"), [].concat(e).forEach(function(e, t) {
            var r = {
                seq: n._items.length,
                sort: s,
                before: i,
                after: a,
                group: o,
                node: e
            };
            n._items.push(r)
        });
        var u = this._sort();
        return r.assert(!u, "item", "?" !== o ? "added into group " + o : "", "created a dependencies error"), this.nodes
    }, i.Topo.prototype.merge = function(e) {
        e = [].concat(e);
        for (var t = 0; t < e.length; ++t) {
            var n = e[t];
            if (n)
                for (var a = 0; a < n._items.length; ++a) {
                    var o = r.shallow(n._items[a]);
                    this._items.push(o)
                }
        }
        this._items.sort(i.mergeSort);
        for (var s = 0; s < this._items.length; ++s) this._items[s].seq = s;
        var u = this._sort();
        return r.assert(!u, "merge created a dependencies error"), this.nodes
    }, i.mergeSort = function(e, t) {
        return e.sort === t.sort ? 0 : e.sort < t.sort ? -1 : 1
    }, i.Topo.prototype._sort = function() {
        for (var e = {}, t = Object.create(null), n = Object.create(null), r = 0; r < this._items.length; ++r) {
            var i = this._items[r],
                a = i.seq,
                o = i.group;
            n[o] = n[o] || [], n[o].push(a), e[a] = i.before;
            for (var s = i.after, u = 0; u < s.length; ++u) t[s[u]] = (t[s[u]] || []).concat(a)
        }
        for (var l = Object.keys(e), c = 0; c < l.length; ++c) {
            for (var d = l[c], f = [], p = Object.keys(e[d]), _ = 0; _ < p.length; ++_) {
                var h = e[d][p[_]];
                n[h] = n[h] || [];
                for (var E = 0; E < n[h].length; ++E) f.push(n[h][E])
            }
            e[d] = f
        }
        for (var m = Object.keys(t), g = 0; g < m.length; ++g) {
            var v = m[g];
            if (n[v])
                for (var T = 0; T < n[v].length; ++T) {
                    var y = n[v][T];
                    e[y] = e[y].concat(t[v])
                }
        }
        var I = void 0,
            S = {};
        l = Object.keys(e);
        for (var A = 0; A < l.length; ++A) {
            var O = l[A];
            I = e[O];
            for (var b = 0; b < I.length; ++b) S[I[b]] = (S[I[b]] || []).concat(O)
        }
        for (var N = {}, C = [], R = 0; R < this._items.length; ++R) {
            var L = R;
            if (S[R]) {
                L = null;
                for (var D = 0; D < this._items.length; ++D)
                    if (!0 !== N[D]) {
                        S[D] || (S[D] = []);
                        for (var P = S[D].length, M = 0, w = 0; w < P; ++w) C.indexOf(S[D][w]) >= 0 && ++M;
                        if (M === P) {
                            L = D;
                            break
                        }
                    }
            }
            null !== L && (N[L = L.toString()] = !0, C.push(L))
        }
        if (C.length !== this._items.length) return new Error("Invalid dependencies");
        for (var U = {}, k = 0; k < this._items.length; ++k) {
            var x = this._items[k];
            U[x.seq] = x
        }
        var G = [];
        this._items = C.map(function(e) {
            var t = U[e];
            return G.push(t.node), t
        }), this.nodes = G
    }
},
function(e, t, n) {
    "use strict";
    var r = n(1);
    t.options = r.object({
        abortEarly: r.boolean(),
        convert: r.boolean(),
        allowUnknown: r.boolean(),
        skipFunctions: r.boolean(),
        stripUnknown: [r.boolean(), r.object({
            arrays: r.boolean(),
            objects: r.boolean()
        }).or("arrays", "objects")],
        language: r.object(),
        presence: r.string().only("required", "optional", "forbidden", "ignore"),
        raw: r.boolean(),
        context: r.object(),
        strip: r.boolean(),
        noDefaults: r.boolean()
    }).strict()
},
function(e, t, n) {
    "use strict";

    function r(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : function(e, t) {
            for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
                var i = n[r],
                    a = Object.getOwnPropertyDescriptor(t, i);
                a && a.configurable && void 0 === e[i] && Object.defineProperty(e, i, a)
            }
        }(e, t))
    }
    var i = n(14),
        a = n(2),
        o = {};
    o.Lazy = function(e) {
        function t() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            var n = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, e.call(this));
            return n._type = "lazy", n
        }
        return r(t, e), t.prototype._base = function(e, t, n) {
            var r = {
                    value: e
                },
                a = this._flags.lazy;
            if (!a) return r.errors = this.createError("lazy.base", null, t, n), r;
            var o = a();
            return o instanceof i ? o._validate(e, t, n) : (r.errors = this.createError("lazy.schema", null, t, n), r)
        }, t.prototype.set = function(e) {
            a.assert("function" == typeof e, "You must provide a function as first argument");
            var t = this.clone();
            return t._flags.lazy = e, t
        }, t
    }(i), e.exports = new o.Lazy
},
function(e, t, n) {
    "use strict";
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : function(e, t) {
            for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
                var i = n[r],
                    a = Object.getOwnPropertyDescriptor(t, i);
                a && a.configurable && void 0 === e[i] && Object.defineProperty(e, i, a)
            }
        }(e, t))
    }
    var a = n(14),
        o = n(19),
        s = n(2),
        u = {
            fastSplice: function(e, t) {
                for (var n = t; n < e.length;) e[n++] = e[n];
                --e.length
            }
        };
    u.Array = function(e) {
        function t() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            var n = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, e.call(this));
            return n._type = "array", n._inner.items = [], n._inner.ordereds = [], n._inner.inclusions = [], n._inner.exclusions = [], n._inner.requireds = [], n._flags.sparse = !1, n
        }
        return i(t, e), t.prototype._base = function(e, t, n) {
            var r = {
                value: e
            };
            "string" == typeof e && n.convert && u.safeParse(e, r);
            var i = Array.isArray(r.value),
                a = i;
            if (n.convert && this._flags.single && !i && (r.value = [r.value], i = !0), !i) return r.errors = this.createError("array.base", null, t, n), r;
            if ((this._inner.inclusions.length || this._inner.exclusions.length || this._inner.requireds.length || this._inner.ordereds.length || !this._flags.sparse) && (a && (r.value = r.value.slice(0)), r.errors = this._checkItems.call(this, r.value, a, t, n), r.errors && a && n.convert && this._flags.single)) {
                var o = r.errors;
                r.value = [r.value], r.errors = this._checkItems.call(this, r.value, a, t, n), r.errors && (r.errors = o, r.value = r.value[0])
            }
            return r
        }, t.prototype._checkItems = function(e, t, n, r) {
            for (var i = [], a = void 0, o = this._inner.requireds.slice(), s = this._inner.ordereds.slice(), l = this._inner.inclusions.concat(o), c = e.length, d = 0; d < c; ++d) {
                a = !1;
                var f = e[d],
                    p = !1,
                    _ = {
                        key: t ? d : n.key,
                        path: t ? (n.path ? n.path + "." : "") + d : n.path,
                        parent: n.parent,
                        reference: n.reference
                    },
                    h = void 0;
                if (this._flags.sparse || void 0 !== f) {
                    for (var E = 0; E < this._inner.exclusions.length; ++E)
                        if (!(h = this._inner.exclusions[E]._validate(f, _, {})).errors) {
                            if (i.push(this.createError(t ? "array.excludes" : "array.excludesSingle", {
                                    pos: d,
                                    value: f
                                }, {
                                    key: n.key,
                                    path: _.path
                                }, r)), a = !0, r.abortEarly) return i;
                            break
                        } if (!a) {
                        if (this._inner.ordereds.length) {
                            if (s.length > 0) {
                                var m = s.shift();
                                if ((h = m._validate(f, _, r)).errors) {
                                    if (i.push(this.createError("array.ordered", {
                                            pos: d,
                                            reason: h.errors,
                                            value: f
                                        }, {
                                            key: n.key,
                                            path: _.path
                                        }, r)), r.abortEarly) return i
                                } else if (m._flags.strip) u.fastSplice(e, d), --d, --c;
                                else {
                                    if (!this._flags.sparse && void 0 === h.value) {
                                        if (i.push(this.createError("array.sparse", null, {
                                                key: n.key,
                                                path: _.path,
                                                pos: d
                                            }, r)), r.abortEarly) return i;
                                        continue
                                    }
                                    e[d] = h.value
                                }
                                continue
                            }
                            if (!this._inner.items.length) {
                                if (i.push(this.createError("array.orderedLength", {
                                        pos: d,
                                        limit: this._inner.ordereds.length
                                    }, {
                                        key: n.key,
                                        path: _.path
                                    }, r)), r.abortEarly) return i;
                                continue
                            }
                        }
                        for (var g = [], v = o.length, T = 0; T < v; ++T)
                            if (!(h = g[T] = o[T]._validate(f, _, r)).errors) {
                                if (e[d] = h.value, p = !0, u.fastSplice(o, T), --T, --v, !this._flags.sparse && void 0 === h.value && (i.push(this.createError("array.sparse", null, {
                                        key: n.key,
                                        path: _.path,
                                        pos: d
                                    }, r)), r.abortEarly)) return i;
                                break
                            } if (!p) {
                            var y = !(!r.stripUnknown || !0 !== r.stripUnknown && !r.stripUnknown.arrays);
                            v = l.length;
                            for (var I = 0; I < v; ++I) {
                                var S = l[I],
                                    A = o.indexOf(S);
                                if (-1 !== A) h = g[A];
                                else if (!(h = S._validate(f, _, r)).errors) {
                                    S._flags.strip ? (u.fastSplice(e, d), --d, --c) : this._flags.sparse || void 0 !== h.value ? e[d] = h.value : (i.push(this.createError("array.sparse", null, {
                                        key: n.key,
                                        path: _.path,
                                        pos: d
                                    }, r)), a = !0), p = !0;
                                    break
                                }
                                if (1 === v) {
                                    if (y) {
                                        u.fastSplice(e, d), --d, --c, p = !0;
                                        break
                                    }
                                    if (i.push(this.createError(t ? "array.includesOne" : "array.includesOneSingle", {
                                            pos: d,
                                            reason: h.errors,
                                            value: f
                                        }, {
                                            key: n.key,
                                            path: _.path
                                        }, r)), a = !0, r.abortEarly) return i;
                                    break
                                }
                            }
                            if (!a && this._inner.inclusions.length && !p) {
                                if (y) {
                                    u.fastSplice(e, d), --d, --c;
                                    continue
                                }
                                if (i.push(this.createError(t ? "array.includes" : "array.includesSingle", {
                                        pos: d,
                                        value: f
                                    }, {
                                        key: n.key,
                                        path: _.path
                                    }, r)), r.abortEarly) return i
                            }
                        }
                    }
                } else if (i.push(this.createError("array.sparse", null, {
                        key: n.key,
                        path: _.path,
                        pos: d
                    }, r)), r.abortEarly) return i
            }
            return o.length && this._fillMissedErrors.call(this, i, o, n, r), s.length && this._fillOrderedErrors.call(this, i, s, n, r), i.length ? i : null
        }, t.prototype.describe = function() {
            var e = a.prototype.describe.call(this);
            if (this._inner.ordereds.length) {
                e.orderedItems = [];
                for (var t = 0; t < this._inner.ordereds.length; ++t) e.orderedItems.push(this._inner.ordereds[t].describe())
            }
            if (this._inner.items.length) {
                e.items = [];
                for (var n = 0; n < this._inner.items.length; ++n) e.items.push(this._inner.items[n].describe())
            }
            return e
        }, t.prototype.items = function() {
            var e = this.clone();
            return s.flatten(Array.prototype.slice.call(arguments)).forEach(function(t, n) {
                try {
                    t = o.schema(t)
                } catch (e) {
                    throw e.hasOwnProperty("path") ? e.path = n + "." + e.path : e.path = n, e.message = e.message + "(" + e.path + ")", e
                }
                e._inner.items.push(t), "required" === t._flags.presence ? e._inner.requireds.push(t) : "forbidden" === t._flags.presence ? e._inner.exclusions.push(t.optional()) : e._inner.inclusions.push(t)
            }), e
        }, t.prototype.ordered = function() {
            var e = this.clone();
            return s.flatten(Array.prototype.slice.call(arguments)).forEach(function(t, n) {
                try {
                    t = o.schema(t)
                } catch (e) {
                    throw e.hasOwnProperty("path") ? e.path = n + "." + e.path : e.path = n, e.message = e.message + "(" + e.path + ")", e
                }
                e._inner.ordereds.push(t)
            }), e
        }, t.prototype.min = function(e) {
            return s.assert(s.isInteger(e) && e >= 0, "limit must be a positive integer"), this._test("min", e, function(t, n, r) {
                return t.length >= e ? t : this.createError("array.min", {
                    limit: e,
                    value: t
                }, n, r)
            })
        }, t.prototype.max = function(e) {
            return s.assert(s.isInteger(e) && e >= 0, "limit must be a positive integer"), this._test("max", e, function(t, n, r) {
                return t.length <= e ? t : this.createError("array.max", {
                    limit: e,
                    value: t
                }, n, r)
            })
        }, t.prototype.length = function(e) {
            return s.assert(s.isInteger(e) && e >= 0, "limit must be a positive integer"), this._test("length", e, function(t, n, r) {
                return t.length === e ? t : this.createError("array.length", {
                    limit: e,
                    value: t
                }, n, r)
            })
        }, t.prototype.unique = function(e) {
            var t = !!e;
            return e = e || s.deepEqual, s.assert("function" == typeof e, "comparator must be a function"), this._test("unique", void 0, function(n, i, a) {
                for (var o = {
                        string: {},
                        number: {},
                        undefined: {},
                        boolean: {},
                        object: [],
                        function: [],
                        custom: []
                    }, s = 0; s < n.length; ++s) {
                    var u = n[s],
                        l = void 0 === u ? "undefined" : r(u),
                        c = t ? o.custom : o[l];
                    if (c)
                        if (Array.isArray(c)) {
                            for (var d = 0; d < c.length; ++d)
                                if (e(c[d], u)) return this.createError("array.unique", {
                                    pos: s,
                                    value: u
                                }, i, a);
                            c.push(u)
                        } else {
                            if (c[u]) return this.createError("array.unique", {
                                pos: s,
                                value: u
                            }, i, a);
                            c[u] = !0
                        }
                }
                return n
            })
        }, t.prototype.sparse = function(e) {
            var t = this.clone();
            return t._flags.sparse = void 0 === e || !!e, t
        }, t.prototype.single = function(e) {
            var t = this.clone();
            return t._flags.single = void 0 === e || !!e, t
        }, t.prototype._fillMissedErrors = function(e, t, n, r) {
            for (var i = [], a = 0, o = 0; o < t.length; ++o) {
                var s = t[o]._getLabel();
                s ? i.push(s) : ++a
            }
            i.length ? a ? e.push(this.createError("array.includesRequiredBoth", {
                knownMisses: i,
                unknownMisses: a
            }, {
                key: n.key,
                path: n.path
            }, r)) : e.push(this.createError("array.includesRequiredKnowns", {
                knownMisses: i
            }, {
                key: n.key,
                path: n.path
            }, r)) : e.push(this.createError("array.includesRequiredUnknowns", {
                unknownMisses: a
            }, {
                key: n.key,
                path: n.path
            }, r))
        }, t.prototype._fillOrderedErrors = function(e, t, n, r) {
            for (var i = [], a = 0; a < t.length; ++a) "required" === s.reach(t[a], "_flags.presence") && i.push(t[a]);
            i.length && this._fillMissedErrors.call(this, e, i, n, r)
        }, t
    }(a), u.safeParse = function(e, t) {
        try {
            var n = JSON.parse(e);
            Array.isArray(n) && (t.value = n)
        } catch (e) {}
    }, e.exports = new u.Array
},
function(e, t, n) {
    (function(t) {
        "use strict";

        function r(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : function(e, t) {
                for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
                    var i = n[r],
                        a = Object.getOwnPropertyDescriptor(t, i);
                    a && a.configurable && void 0 === e[i] && Object.defineProperty(e, i, a)
                }
            }(e, t))
        }
        var i = n(14),
            a = n(2),
            o = {};
        o.Binary = function(e) {
            function n() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, n);
                var t = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this));
                return t._type = "binary", t
            }
            return r(n, e), n.prototype._base = function(e, n, r) {
                var i = {
                    value: e
                };
                if ("string" == typeof e && r.convert) try {
                    i.value = new t(e, this._flags.encoding)
                } catch (e) {}
                return i.errors = t.isBuffer(i.value) ? null : this.createError("binary.base", null, n, r), i
            }, n.prototype.encoding = function(e) {
                a.assert(t.isEncoding(e), "Invalid encoding:", e);
                var n = this.clone();
                return n._flags.encoding = e, n
            }, n.prototype.min = function(e) {
                return a.assert(a.isInteger(e) && e >= 0, "limit must be a positive integer"), this._test("min", e, function(t, n, r) {
                    return t.length >= e ? t : this.createError("binary.min", {
                        limit: e,
                        value: t
                    }, n, r)
                })
            }, n.prototype.max = function(e) {
                return a.assert(a.isInteger(e) && e >= 0, "limit must be a positive integer"), this._test("max", e, function(t, n, r) {
                    return t.length <= e ? t : this.createError("binary.max", {
                        limit: e,
                        value: t
                    }, n, r)
                })
            }, n.prototype.length = function(e) {
                return a.assert(a.isInteger(e) && e >= 0, "limit must be a positive integer"), this._test("length", e, function(t, n, r) {
                    return t.length === e ? t : this.createError("binary.length", {
                        limit: e,
                        value: t
                    }, n, r)
                })
            }, n
        }(i), e.exports = new o.Binary
    }).call(t, n(3).Buffer)
},
function(e, t) {
    e.exports = {
        _args: [
            [{
                raw: "joi@10.0.5",
                scope: null,
                escapedName: "joi",
                name: "joi",
                rawSpec: "10.0.5",
                spec: "10.0.5",
                type: "version"
            }, "/Users/jeff/projects/joi-browser"]
        ],
        _from: "joi@10.0.5",
        _id: "joi@10.0.5",
        _inCache: !0,
        _location: "/joi",
        _nodeVersion: "6.9.1",
        _npmOperationalInternal: {
            host: "packages-12-west.internal.npmjs.com",
            tmp: "tmp/joi-10.0.5.tgz_1480956525182_0.0934728232678026"
        },
        _npmUser: {
            name: "marsup",
            email: "nicolas@morel.io"
        },
        _npmVersion: "3.10.10",
        _phantomChildren: {},
        _requested: {
            raw: "joi@10.0.5",
            scope: null,
            escapedName: "joi",
            name: "joi",
            rawSpec: "10.0.5",
            spec: "10.0.5",
            type: "version"
        },
        _requiredBy: ["#DEV:/"],
        _resolved: "https://registry.npmjs.org/joi/-/joi-10.0.5.tgz",
        _shasum: "2e43af9bf24d2d5745852e9ab968c85be357bd6a",
        _shrinkwrap: null,
        _spec: "joi@10.0.5",
        _where: "/Users/jeff/projects/joi-browser",
        bugs: {
            url: "https://github.com/hapijs/joi/issues"
        },
        dependencies: {
            hoek: "4.x.x",
            isemail: "2.x.x",
            items: "2.x.x",
            topo: "2.x.x"
        },
        description: "Object schema validation",
        devDependencies: {
            code: "4.x.x",
            lab: "11.x.x",
            "markdown-toc": "0.13.x"
        },
        directories: {},
        dist: {
            shasum: "2e43af9bf24d2d5745852e9ab968c85be357bd6a",
            tarball: "https://registry.npmjs.org/joi/-/joi-10.0.5.tgz"
        },
        engines: {
            node: ">=4.0.0"
        },
        gitHead: "abfe727885af779a676e6a205ee15cdc8b435691",
        homepage: "https://github.com/hapijs/joi",
        keywords: ["hapi", "schema", "validation"],
        license: "BSD-3-Clause",
        main: "lib/index.js",
        maintainers: [{
            name: "hueniverse",
            email: "eran@hueniverse.com"
        }, {
            name: "marsup",
            email: "marsup@gmail.com"
        }],
        name: "joi",
        optionalDependencies: {},
        readme: "ERROR: No README data found!",
        repository: {
            type: "git",
            url: "git://github.com/hapijs/joi.git"
        },
        scripts: {
            test: "lab -t 100 -a code -L",
            "test-cov-html": "lab -r html -o coverage.html -a code",
            "test-debug": "node $NODE_DEBUG_OPTION ./node_modules/.bin/lab -a code",
            toc: "node generate-readme-toc.js",
            version: "npm run toc && git add API.md README.md"
        },
        version: "10.0.5"
    }
}])
}, e.exports = r()
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = t.GUILD_SELECTABLE_CHANNELS_KEY = void 0;
    var r = m(n(7)),
        i = m(n(3)),
        a = m(n(2)),
        o = m(n(133)),
        s = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(63)),
        u = m(n(71)),
        l = m(n(11)),
        c = m(n(14)),
        d = m(n(19)),
        f = m(n(55)),
        p = m(n(10)),
        _ = m(n(960)),
        h = n(1),
        E = m(n(5));

    function m(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var g = .1,
        v = "SELECTABLE";
    t.GUILD_SELECTABLE_CHANNELS_KEY = v;
    var T = {},
        y = {},
        I = {},
        S = null,
        A = {
            comparator: -1,
            channel: new s.default({
                id: "null",
                type: h.ChannelTypes.GUILD_CATEGORY,
                name: E.default.Messages.UNCATEGORIZED
            })
        };

    function O() {
        var e;
        return (e = {})[v] = [], e[h.ChannelTypes.GUILD_VOICE] = [], e[h.ChannelTypes.GUILD_CATEGORY] = [A], e.count = 0, e
    }

    function b(e) {
        var t = T[e];
        return null == t && (t = O(), T[e] = t), t
    }

    function N(e, t) {
        return e.comparator - t.comparator
    }

    function C(e) {
        e[v].sort(N), e[h.ChannelTypes.GUILD_VOICE].sort(N), e[h.ChannelTypes.GUILD_CATEGORY].sort(N)
    }

    function R(e) {
        void 0 === e && (e = function(e) {
            return !0
        });
        var t = c.default.getChannels();
        r.default.forEach(t, function(n) {
            var r = n.getGuildId();
            if (null != r && e(n)) {
                var i = b(r);
                if (i.count += 1, (!s.GUILD_NON_CATEGORY_CHANNEL_TYPES.has(n.type) || f.default.can(h.Permissions.VIEW_CHANNEL, {
                        channelId: n.id
                    }) || n.id === S) && (!n.isLFGListingsChannel() || _.default.isInLfgExperiment(r))) {
                    if (n.isLFGGroupDM()) {
                        var a = null != n.parent_id ? t[n.parent_id] : null;
                        null != a && (n = n.merge({
                            parent_id: a.parent_id,
                            position: a.position + g
                        }))
                    }
                    var o = (0, s.isGuildSelectableChannelType)(n.type) ? v : n.type;
                    null != i[o] && i[o].push({
                        comparator: n.position,
                        channel: n
                    })
                }
            }
        })
    }

    function L() {
        T = {}, y = {}, R();
        for (var e = 0, t = Object.keys(T); e < t.length; e++) {
            var n = t[e];
            C(T[n]), P(n)
        }! function() {
            I = {};
            for (var e = p.default.getCurrentUser(), t = 0, n = Object.keys(T); t < n.length; t++) {
                var r = n[t];
                x(e, r) && (I[r] = !0)
            }
        }()
    }

    function D(e) {
        if (null == e || null == d.default.getGuild(e)) return !1;
        var t = O();
        T[e] = t, R(function(t) {
                return t.guild_id === e
            }), C(t), P(e),
            function(e) {
                x(p.default.getCurrentUser(), e) ? I[e] = !0 : delete I[e]
            }(e)
    }

    function P(e) {
        var t = y[e] = {},
            n = {};
        b(e)[v].forEach(function(e) {
            var r = e.channel,
                i = (0, o.default)(r),
                a = Object.prototype.hasOwnProperty.call(n, i) ? n[i] : null;
            null == a ? n[i] = 1 : (n[i] = a + 1, i += "~" + a), t[r.id] = {
                id: r.id,
                name: i
            }
        })
    }

    function M(e) {
        return D(e.guild.id)
    }

    function w(e) {
        return D(e.channel.guild_id)
    }

    function U(e) {
        return D(e.guildId)
    }

    function k(e, t) {
        return 0 != (u.default.computePermissions(e, t, null, null, !1) & h.ElevatedPermissions)
    }

    function x(e, t) {
        var n = d.default.getGuild(t);
        if (n && k(e, n)) return !0;
        var r = T[t],
            i = r[v],
            a = r[h.ChannelTypes.GUILD_VOICE],
            o = i,
            s = Array.isArray(o),
            u = 0;
        for (o = s ? o : o[Symbol.iterator]();;) {
            var l;
            if (s) {
                if (u >= o.length) break;
                l = o[u++]
            } else {
                if ((u = o.next()).done) break;
                l = u.value
            }
            if (k(e, l.channel)) return !0
        }
        var c = a,
            f = Array.isArray(c),
            p = 0;
        for (c = f ? c : c[Symbol.iterator]();;) {
            var _;
            if (f) {
                if (p >= c.length) break;
                _ = c[p++]
            } else {
                if ((p = c.next()).done) break;
                _ = p.value
            }
            if (k(e, _.channel)) return !0
        }
        return !1
    }

    function G(e, t) {
        return S = t, null != e && null != e.getGuildId() && D(e.getGuildId())
    }
    var F = new(function(e) {
        var t, n;

        function r() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var i = r.prototype;
        return i.initialize = function() {
            this.waitFor(d.default, c.default, f.default, l.default)
        }, i.getChannels = function(e) {
            return null != e ? b(e) : O()
        }, i.getDefaultChannel = function(e) {
            var t = this.getChannels(e)[v].find(function(e) {
                return e.channel.type !== h.ChannelTypes.GUILD_STORE
            });
            return null != t ? t.channel : null
        }, i.getSelectableChannelIds = function(e) {
            return this.getChannels(e)[v].map(function(e) {
                return e.channel.id
            })
        }, i.hasSelectableChannel = function(e, t) {
            return this.getSelectableChannelIds(e).includes(t)
        }, i.hasElevatedPermissions = function(e) {
            return I[e] || !1
        }, i.hasChannels = function(e) {
            return this.getChannels(e).count > 0
        }, i.hasCategories = function(e) {
            return this.getChannels(e)[h.ChannelTypes.GUILD_CATEGORY].length > 1
        }, i.getTextChannelNameDisambiguations = function(e) {
            return null != e && y[e] || {}
        }, r
    }(i.default.Store))(a.default, {
        CONNECTION_OPEN: function(e) {
            return L()
        },
        OVERLAY_INITIALIZE: function(e) {
            return L()
        },
        CACHE_LOADED_LAZY: function(e) {
            return L()
        },
        GUILD_CREATE: M,
        GUILD_UPDATE: M,
        GUILD_DELETE: function(e) {
            var t = e.guild.id;
            return delete T[t], delete y[t], !0
        },
        GUILD_MEMBER_UPDATE: function(e) {
            return D(e.guildId)
        },
        CURRENT_USER_UPDATE: function(e) {
            return L(), !0
        },
        CHANNEL_CREATE: w,
        CHANNEL_UPDATE: w,
        CHANNEL_DELETE: w,
        GUILD_ROLE_CREATE: U,
        GUILD_ROLE_UPDATE: U,
        GUILD_ROLE_DELETE: U,
        VOICE_CHANNEL_SELECT: function(e) {
            var t = e.channelId;
            return null == t && null != S ? G(c.default.getChannel(S), null) : G(c.default.getChannel(t), t)
        },
        VOICE_STATE_UPDATE: function(e) {
            var t = e.channelId,
                n = e.sessionId;
            return l.default.getSessionId() === n && G(c.default.getChannel(t), t)
        },
        VOICE_CHANNEL_CLEAR: function(e) {
            return G(c.default.getChannel(S), null)
        }
    });
    t.default = F
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.getUserAvatarURL = p, t.hasAnimatedAvatar = y, t.hasAnimatedGuildIcon = I, t.makeSource = S, t.default = t.DEFAULT_GROUP_DM_AVATARS = t.DEFAULT_AVATARS = void 0;
    var r, i = l(n(82)),
        a = l(n(672)),
        o = l(n(13)),
        s = n(217),
        u = n(1);

    function l(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var c = (r = n(1510).default).DEFAULT_AVATARS;
    t.DEFAULT_AVATARS = c;
    var d = r.DEFAULT_GROUP_DM_AVATARS;

    function f(e, t, n, r, a, u, l) {
        if (void 0 === u && (u = "jpg"), null != r) {
            var c, d = window.GLOBAL_ENV.CDN_HOST;
            null != d ? ("jpg" === u && (u = o.default.isDesktop() ? "webp" : "png"), c = location.protocol + "//" + d + "/" + t + "/" + n + "/" + r + "." + u) : c = location.protocol + window.GLOBAL_ENV.API_ENDPOINT + e(n, r, u);
            var f = {};
            return null != a && (f.size = (0, s.calculateSize)(a)), null != l && (f.keep_aspect_ratio = l), c + "?" + i.default.stringify(f)
        }
    }

    function p(e, t, n) {
        var i = e.id,
            a = e.avatar,
            o = e.discriminator,
            s = e.bot;
        if (void 0 === t && (t = "jpg"), void 0 === n && (n = u.AVATAR_SIZE), s) {
            var l = r.BOT_AVATARS[a];
            if (l) return l
        }
        return f(u.Endpoints.AVATAR, "avatars", i, a, n, t) || r.DEFAULT_AVATARS[(parseInt(o) || 0) % r.DEFAULT_AVATARS.length]
    }

    function _(e) {
        var t = e.id,
            n = e.splash,
            r = e.size;
        if (null == n) return null;
        null == r && (r = window.screen.width * (0, s.getDevicePixelRatio)()), r = (0, s.getBestMediaProxySize)(r);
        var i, a = window.GLOBAL_ENV.CDN_HOST;
        return i = null != a ? location.protocol + "//" + a + "/splashes/" + t + "/" + n + ".jpg" : location.protocol + window.GLOBAL_ENV.API_ENDPOINT + u.Endpoints.GUILD_SPLASH(t, n), i += "?size=" + r
    }

    function h(e) {
        var t = e.id,
            n = e.banner;
        if (null == n) return null;
        var r, i = (0, s.getBestMediaProxySize)(480),
            a = window.GLOBAL_ENV.CDN_HOST;
        return r = null != a ? location.protocol + "//" + a + "/banners/" + t + "/" + n + ".jpg" : location.protocol + window.GLOBAL_ENV.API_ENDPOINT + u.Endpoints.GUILD_BANNER(t, n), r += "?size=" + i
    }

    function E(e) {
        var t = e.id,
            n = e.icon,
            r = e.size,
            i = void 0 === r ? u.AVATAR_SIZE : r,
            a = e.format;
        return f(u.Endpoints.GUILD_ICON, "icons", t, n, i, null != a ? a : "jpg")
    }

    function m(e) {
        var t = e.id,
            n = e.icon,
            r = e.size,
            i = void 0 === r ? u.AVATAR_SIZE : r;
        return f(u.Endpoints.APPLICATION_ICON, "app-icons", t, n, i)
    }

    function g(e) {
        var t = e.id,
            n = e.hash,
            r = e.size,
            i = void 0 === r ? u.AVATAR_SIZE : r,
            a = e.keepAspectRatio,
            o = void 0 !== a && a;
        return f(u.Endpoints.APPLICATION_ICON, "app-icons", t, n, i, void 0, o)
    }

    function v(e) {
        var t = e.id,
            n = e.icon,
            i = e.applicationId;
        return i ? m({
            id: i,
            icon: n
        }) || r.DEFAULT_CHANNEL_ICON : f(u.Endpoints.CHANNEL_ICON, "channel-icons", t, n) || function(e) {
            return r.DEFAULT_GROUP_DM_AVATARS[a.default.extractTimestamp(e) % r.DEFAULT_GROUP_DM_AVATARS.length]
        }(t)
    }

    function T(e) {
        var t = e.id,
            n = e.icon;
        return f(u.Endpoints.CHANNEL_ICON, "channel-icons", t, n) || r.LFG_GROUP_DM_ICON
    }

    function y(e) {
        return null != e && null != e.avatar && "a_" === e.avatar.substr(0, 2)
    }

    function I(e) {
        return null != e && null != e.icon && "a_" === e.icon.substr(0, 2)
    }

    function S(e) {
        return "number" == typeof e ? e : {
            uri: e
        }
    }
    t.DEFAULT_GROUP_DM_AVATARS = d;
    var A = {
        getUserAvatarURL: p,
        hasAnimatedAvatar: y,
        hasAnimatedGuildIcon: I,
        getUserAvatarSource: function(e) {
            return S(p(e))
        },
        getUserAvatarColor: function(e) {
            var t = e.discriminator;
            switch (parseInt(t) % r.DEFAULT_AVATARS.length) {
                case 0:
                    return u.Colors.BRAND;
                case 1:
                    return u.UNSAFE_Colors.AVATAR_GREY;
                case 2:
                    return u.Colors.STATUS_GREEN;
                case 3:
                    return u.Colors.STATUS_YELLOW;
                case 4:
                    return u.Colors.STATUS_RED;
                default:
                    return u.Colors.WHITE
            }
        },
        getGuildIconURL: E,
        getGuildSplashURL: _,
        getGuildSplashSource: function(e) {
            return S(_(e))
        },
        getGuildBannerURL: h,
        getChannelIconURL: v,
        getLfgGroupChannelIconURL: T,
        getEmojiURL: function(e) {
            var t = e.id,
                n = e.animated;
            return window.GLOBAL_ENV.CDN_HOST ? location.protocol + "//" + window.GLOBAL_ENV.CDN_HOST + "/emojis/" + t + "." + (n ? "gif" : "png") + "?v=1" : location.protocol + window.GLOBAL_ENV.API_ENDPOINT + u.Endpoints.EMOJI(t, n ? "gif" : "png")
        },
        getApplicationIconURL: m,
        getGameAssetURL: g,
        getGameAssetSource: function(e) {
            return S(g(e))
        },
        getGuildIconSource: function(e) {
            return S(E(e))
        },
        getGuildBannerSource: function(e) {
            return S(h(e))
        },
        getChannelIconSource: function(e) {
            return S(v(e))
        },
        getLfgGroupChannelIconSource: function(e) {
            return S(T(e))
        }
    };
    t.default = A
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.getComboId = function(e, t) {
        return e + ":" + t
    }, t.convertComboId = function(e) {
        var t = e.split(":"),
            n = t[0],
            r = t[1];
        return {
            applicationId: n,
            branchId: r
        }
    }, t.getLibraryApplicationForApplicationId = s, t.shouldShareApplicationActivity = function(e, t, n, r) {
        if (!t.showCurrentGame || t.status === a.StatusTypes.INVISIBLE) return !1;
        var i = s(e, n, r);
        return null == i || !i.hasFlag(a.LibraryApplicationFlags.PRIVATE)
    }, t.calculateProgressPercentage = function(e, t) {
        if (0 === t) return 100;
        return e / t * 100
    }, t.shouldShowGameInLibrary = function(e, t, n, r) {
        if (null == t) return !1;
        if (r.enabled && t.hasFlag(a.LibraryApplicationFlags.PRIVATE)) return !1;
        return !t.isHidden()
    }, t.convertToTransitionState = u, t.getCombinedProgress = function(e) {
        return e.reduce(function(e, t) {
            var n = u(t);
            return null == n || t.type === a.LocalDispatchApplicationStates.UP_TO_DATE ? e : {
                total: e.total + n.total,
                progress: e.progress + n.progress
            }
        }, {
            total: 0,
            progress: 0
        })
    }, t.isUserEntitledToLibraryApplication = l;
    var r = o(n(10)),
        i = o(n(116)),
        a = n(1);

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(e, t, n) {
        var r = t.getActiveLibraryApplication(e),
            i = n.getLocalApplication(e);
        return (null == i || null == r || l(r)) && r || i
    }

    function u(e) {
        return null == e ? null : e.type === a.LocalDispatchApplicationStates.INSTALLING || e.type === a.LocalDispatchApplicationStates.UPDATING || e.type === a.LocalDispatchApplicationStates.UNINSTALLING ? e : null
    }

    function l(e) {
        return !!e.isDiscordApplication() && e.isEntitled(r.default.getNullableCurrentUser(), i.default)
    }
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.LocalApplicationRecord = t.LibraryApplicationRecord = void 0;
    var r = u(n(4)),
        i = u(n(21)),
        a = u(n(4030)),
        o = u(n(720)),
        s = n(1);

    function u(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function l() {
        return (l = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }

    function c(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
    }
    var d = function(e) {
        function t() {
            return e.apply(this, arguments) || this
        }
        c(t, e), t.createFromServer = function(e) {
            return new t({
                id: e.application.id,
                branchId: e.branch_id,
                entitlements: null != e.entitlements ? e.entitlements.map(function(e) {
                    return o.default.createFromServer(e)
                }) : [],
                branch: e.branch,
                flags: e.flags,
                createdAt: e.created_at,
                sku: {
                    id: e.sku.id,
                    type: e.sku.type,
                    premium: e.sku.premium,
                    preorderReleaseAt: null != e.sku.preorder_release_at ? (0, r.default)(e.sku.preorder_release_at) : null,
                    preorderApproximateReleaseDate: null != e.sku.preorder_approximate_release_date ? e.sku.preorder_approximate_release_date : null
                }
            })
        }, t.createForTestMode = function(e) {
            return new t({
                id: e.id,
                entitlements: [],
                branchId: e.branch.id,
                branch: e.branch,
                flags: s.LibraryApplicationFlags.ENTITLED,
                createdAt: e.branch.created_at,
                sku: {
                    id: e.skuId,
                    type: s.SKUTypes.GAME,
                    premium: !1
                },
                isTestMode: !0
            })
        };
        var n = t.prototype;
        return n.initialize = function(e) {
            this.id = e.id, this.createdAt = e.createdAt, this.flags = e.flags, this.branchId = e.branchId, this.entitlements = e.entitlements, this.branch = e.branch, this.sku = e.sku, this.isTestMode = e.isTestMode || !1
        }, n.isMasterBranch = function() {
            return this.branchId === this.id
        }, n.isDiscordApplication = function() {
            return !0
        }, n.isEntitled = function(e, t) {
            var n = this;
            return !!this.isTestMode || this.entitlements.some(function(r) {
                return r.isValid(e, t, n.branchId)
            })
        }, n.isPreorder = function() {
            return null != this.sku.preorderReleaseAt || null != this.sku.preorderApproximateReleaseDate
        }, n.getDistributor = function() {
            return s.Distributors.DISCORD
        }, n.getBranchName = function() {
            return null != this.branch ? this.branch.name : "master"
        }, n.getBranchedName = function(e) {
            return this.isMasterBranch() || null == this.branch ? e.name : e.name + " (" + this.branch.name + ")"
        }, n.getSkuIdForAnalytics = function() {
            return this.sku.id
        }, n.getAnalyticsData = function() {
            var e = i.default.getGame(this.id);
            return {
                application_id: null != e ? e.id : null,
                application_name: null != e ? e.name : null,
                sku_id: this.getSkuIdForAnalytics(),
                launcher_platform: this.getDistributor()
            }
        }, t
    }(a.default);
    t.LibraryApplicationRecord = d;
    var f = function(e) {
        function t() {
            return e.apply(this, arguments) || this
        }
        c(t, e);
        var n = t.prototype;
        return n.initialize = function(e) {
            this.id = e.id, this.flags = e.flags, this.branchId = e.branchId, this.thirdPartySkus = e.thirdPartySkus || []
        }, t.fromScannedApplication = function(e) {
            return new t({
                id: e.applicationId,
                branchId: e.applicationId,
                thirdPartySkus: null != e.distributor && null != e.sku ? [{
                    sku: e.sku,
                    distributor: e.distributor
                }] : []
            })
        }, t.createFromStorage = function(e) {
            return new t(l({}, e))
        }, n.isMasterBranch = function() {
            return !0
        }, n.isDiscordApplication = function() {
            return !1
        }, n.getDistributor = function() {
            return this.thirdPartySkus.length > 0 ? this.thirdPartySkus[0].distributor : null
        }, n.getSkuIdForAnalytics = function() {
            return null
        }, n.getBranchName = function() {
            return "master"
        }, n.getBranchedName = function(e) {
            return e.name
        }, n.isPreorder = function() {
            return !1
        }, n.getAnalyticsData = function() {
            var e = i.default.getGame(this.id);
            return {
                application_id: null != e ? e.id : null,
                application_name: null != e ? e.name : null,
                sku_id: this.getSkuIdForAnalytics(),
                launcher_platform: this.getDistributor()
            }
        }, t
    }(a.default);
    t.LocalApplicationRecord = f
},
function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return n.call(e, t)
    }
},
function(e, t, n) {
    var r = n(61),
        i = n(163);
    e.exports = n(60) ? function(e, t, n) {
        return r.f(e, t, i(1, n))
    } : function(e, t, n) {
        return e[t] = n, e
    }
},
function(e, t, n) {
    var r = n(225),
        i = n(125);
    e.exports = function(e) {
        return r(i(e))
    }
}, ,
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.getRemoteIconURL = R, t.deduplicate = function(e) {
        return b.indexOf(e) > -1 || (b.unshift(e), b.splice(50), !1)
    }, t.containsSameValues = function(e, t) {
        return r.default.isEqual(e, r.default.pick(t, Object.keys(e)))
    }, t.validateOrigin = L, t.transformChannel = function(e, t) {
        var n = [],
            r = e.getGuildId();
        [I.ChannelTypes.GUILD_VOICE, I.ChannelTypes.GUILD_CATEGORY].includes(e.type) || n.push(new Promise(function(t) {
            f.default.whenReady(e.id, function() {
                return t()
            }), o.default.fetchMessages(e.id, null, null, I.MAX_MESSAGES_PER_CHANNEL)
        }));
        return Promise.all(n).then(function() {
            var n = t ? f.default.getMessages(e.id).toArray().map(P) : [],
                i = E.default.getVoiceStatesForChannel(e).map(function(t) {
                    return M(r, e.id, t)
                });
            return {
                id: e.id,
                name: e.name,
                type: e.type,
                topic: e.topic,
                bitrate: e.bitrate,
                user_limit: e.userLimit,
                guild_id: r,
                position: e.position,
                messages: n,
                voice_states: i
            }
        })
    }, t.transformUser = D, t.transformInternalTextMessage = P, t.transformVoiceState = M, t.transformRelationship = function(e, t, n) {
        var r = h.default.getUser(t);
        return {
            type: e,
            user: null != r ? D(r) : null,
            presence: {
                status: _.default.getStatus(t),
                activity: null != n ? _.default.getApplicationActivity(t, n) : _.default.getPrimaryActivity(t)
            }
        }
    }, t.isMatchingOrigin = w, t.transformShortcut = U, t.getDeprecatedVoiceSettings = function() {
        var e = d.default.getSettings(),
            t = function(e) {
                return Object.values(e).sort(function(e, t) {
                    return e.index - t.index
                }).map(function(e) {
                    return {
                        id: e.id,
                        name: e.name
                    }
                })
            },
            n = [];
        e.modeOptions.shortcut && Array.isArray(e.modeOptions.shortcut) && (n = U(e.modeOptions.shortcut));
        return {
            input: {
                available_devices: t(d.default.getInputDevices()),
                device_id: e.inputDeviceId,
                volume: e.inputVolume
            },
            output: {
                available_devices: t(d.default.getOutputDevices()),
                device_id: e.outputDeviceId,
                volume: e.outputVolume
            },
            mode: {
                type: e.mode,
                auto_threshold: e.modeOptions.autoThreshold,
                threshold: e.modeOptions.threshold,
                shortcut: n,
                delay: e.modeOptions.delay
            },
            automatic_gain_control: e.automaticGainControl,
            echo_cancellation: e.echoCancellation,
            noise_suppression: e.noiseSuppression,
            qos: e.qos,
            silence_warning: e.silenceWarning,
            deaf: e.deaf,
            mute: e.mute
        }
    }, t.getVoiceSettings = function(e) {
        var t = d.default.getSettings(e),
            n = "";
        t.modeOptions.shortcut && Array.isArray(t.modeOptions.shortcut) && (n = (0, T.toString)(t.modeOptions.shortcut));
        return {
            input_mode: {
                type: t.mode,
                shortcut: n
            },
            local_mutes: Object.keys(t.localMutes),
            local_volumes: t.localVolumes,
            self_mute: t.mute,
            self_deaf: t.deaf
        }
    }, t.hasMessageReadPermission = function(e, t, n) {
        var r = c.default.getGuild(e.getGuildId());
        return (r ? r.getApplicationId() : e.getApplicationId()) === t || n.indexOf(I.OAuth2Scopes.MESSAGES_READ) > -1
    }, t.getVoiceConnectionState = function(e) {
        switch (e) {
            case I.RTCConnectionStates.RTC_CONNECTED:
            case I.RTCConnectionStates.RTC_CONNECTING:
            case I.RTCConnectionStates.RTC_DISCONNECTED:
                return e.replace(/^RTC_/, "VOICE_");
            default:
                return e
        }
    }, t.validateSocketClient = function(e, t, n) {
        null == t && (e.authorization.scopes = [I.RPC_LOCAL_SCOPE]);
        if (!n && w(t)) return e.authorization.scopes = [I.RPC_PRIVATE_SCOPE, I.RPC_PRIVATE_LIMITED_SCOPE], Promise.resolve();
        if (!n) return Promise.reject(new y.default(I.RPCCloseCodes.INVALID_CLIENTID, "No Client ID Specified"));
        return a.default.get({
            url: I.Endpoints.APPLICATION_RPC(n),
            retries: 2
        }).then(function(n) {
            var r = n.body,
                i = r.rpc_origins,
                a = r.id,
                o = r.name,
                s = r.icon,
                u = r.cover_image,
                l = r.flags;
            if ("string" == typeof t && !L(t, i)) throw new y.default(I.RPCCloseCodes.INVALID_ORIGIN, "Invalid Origin");
            e.application = {
                id: a,
                name: o,
                icon: s,
                coverImage: u,
                flags: l
            }
        }, function() {
            throw new y.default(I.RPCCloseCodes.INVALID_CLIENTID, "Invalid Client ID")
        })
    }, t.computeActivityFlags = function(e, t) {
        var n = t.instance,
            r = t.secrets,
            i = 0;
        n && (i |= I.ActivityFlags.INSTANCE);
        null != r && (r.join && (i |= I.ActivityFlags.JOIN), r.spectate && function(e, t) {
            return null != e.flags && (e.flags & t) === t
        }(e, N.ALLOW_ACTIVITY_ACTION_SPECTATE) && (i |= I.ActivityFlags.SPECTATE));
        return i
    }, t.validateScope = function(e, t) {
        if (null == t) return !0;
        if ("string" == typeof t) return e.includes(t);
        if ("object" != typeof t) return !1;
        var n = t[I.RPC_SCOPE_CONFIG.ANY],
            i = t[I.RPC_SCOPE_CONFIG.ALL];
        if (Array.isArray(n) && n.find(function(t) {
                return e.includes(t)
            })) return !0;
        if (Array.isArray(i) && 0 === r.default.difference(i, e).length) return !0;
        return !1
    }, t.validateActivityInvite = function(e, t, n) {
        switch (e) {
            case I.ActivityActionTypes.JOIN:
                return null != t && null != t.id && null != n.join;
            case I.ActivityActionTypes.SPECTATE:
                return null != n.spectate;
            default:
                return !1
        }
    }, t.unlockOverlay = function(e) {
        return p.default.isReady(e) ? (s.default.setLocked(!1, e), {
            lock: function() {
                s.default.setLocked(!0, e)
            },
            context: I.AppContext.OVERLAY
        }) : (m.default.focus(null, !0), {
            lock: function() {
                m.default.setForegroundProcess(e)
            },
            context: I.AppContext.APP
        })
    };
    var r = S(n(7)),
        i = S(n(120)),
        a = S(n(12)),
        o = S(n(139)),
        s = S(n(320)),
        u = S(n(828)),
        l = S(n(328)),
        c = (S(n(397)), S(n(19))),
        d = S(n(41)),
        f = S(n(212)),
        p = S(n(448)),
        _ = S(n(65)),
        h = S(n(10)),
        E = S(n(72)),
        m = S(n(20)),
        g = S(n(261)),
        v = S(n(161)),
        T = n(265),
        y = S(n(48)),
        I = n(1);

    function S(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var A = function() {
            var e = I.API_HOST.split(":")[0];
            if (!e.includes(".")) return e;
            var t = e.split("."),
                n = t[t.length - 1];
            return /^\d+$/.test(n) ? e : t.slice(-2).join(".")
        }(),
        O = new RegExp("^" + v.default.escape("https://") + "(?:[a-z]+\\.)?" + v.default.escape(A) + "$"),
        b = [],
        N = {
            ALLOW_ACTIVITY_ACTION_SPECTATE: 512
        };

    function C(e) {
        return "customEmoji" === e.type && (e.type = "emoji"), "emoji" === e.type && e.src && (e.src = R(e.src)), Array.isArray(e.content) && (e.content = e.content.map(C)), e
    }

    function R(e) {
        return /^http/.test(e) ? e : location.protocol + "//" + location.host + ("/" === e.charAt(0) ? "" : "/") + e
    }

    function L(e, t) {
        return void 0 === t && (t = []), t.indexOf(e) > -1
    }

    function D(e) {
        return {
            id: e.id,
            username: e.username,
            discriminator: e.discriminator,
            avatar: e.avatar,
            bot: e.bot,
            flags: e.flags,
            premium_type: e.premiumType || I.PremiumTypes.NONE
        }
    }

    function P(e) {
        var t, n, r = u.default.parseToAST(e.content, !0, {
                channelId: e.channel_id
            }).map(C),
            i = e.author ? l.default.lookupMember(e.channel_id, e.author.id) : null;
        return null != i && (t = i.colorString, n = i.nick), {
            id: e.id,
            blocked: e.blocked,
            bot: e.bot,
            content: e.content,
            content_parsed: r.length ? r : void 0,
            nick: n,
            author_color: t,
            edited_timestamp: e.edited_timestamp || e.editedTimestamp,
            timestamp: e.timestamp,
            tts: e.tts,
            mentions: e.mentions,
            mention_everyone: e.mention_everyone || e.mentionEveryone,
            mention_roles: e.mention_roles || e.mentionRoles,
            embeds: e.embeds,
            attachments: e.attachments,
            author: e.author ? D(e.author) : void 0,
            pinned: e.pinned,
            type: e.type
        }
    }

    function M(e, t, n) {
        var r = n.mute,
            i = n.deaf,
            a = n.selfMute,
            o = n.selfDeaf,
            s = n.suppress,
            u = n.userId,
            l = h.default.getUser(u);
        if (!l) throw new Error("Invalid user id: " + u);
        return {
            nick: g.default.getName(e, t, l),
            mute: d.default.isLocalMute(l.id),
            volume: d.default.getLocalVolume(l.id),
            pan: d.default.getLocalPan(l.id),
            voice_state: {
                mute: r,
                deaf: i,
                self_mute: a,
                self_deaf: o,
                suppress: s
            },
            user: D(l)
        }
    }

    function w(e) {
        if (null == e) return !1;
        var t, n = window.location.origin;
        if (e === n) return !0;
        try {
            t = i.default.parse(e).hostname
        } catch (e) {
            return !1
        }
        return window.location.hostname === t && "localhost" === t || !e.match("staging") && !(!O.test(e) || !O.test(n))
    }

    function U(e) {
        return e.map(function(e) {
            return {
                type: e[0],
                code: e[1],
                name: (0, T.codeToKey)(e) || "unknown"
            }
        })
    }
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r, i = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(0)),
        a = p(n(9)),
        o = p(n(430)),
        s = p(n(36)),
        u = p(n(46)),
        l = p(n(67)),
        c = p(n(177)),
        d = p(n(5)),
        f = p(n(850));

    function p(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function _() {
        return (_ = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }

    function h(e, t) {
        if (null == e) return {};
        var n, r, i = {},
            a = Object.keys(e);
        for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
        return i
    }

    function E(e, t, n, i) {
        r || (r = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);
        var a = e && e.defaultProps,
            o = arguments.length - 3;
        if (t || 0 === o || (t = {
                children: void 0
            }), t && a)
            for (var s in a) void 0 === t[s] && (t[s] = a[s]);
        else t || (t = a || {});
        if (1 === o) t.children = i;
        else if (o > 1) {
            for (var u = new Array(o), l = 0; l < o; l++) u[l] = arguments[l + 3];
            t.children = u
        }
        return {
            $$typeof: r,
            type: e,
            key: void 0 === n ? null : "" + n,
            ref: null,
            props: t,
            _owner: null
        }
    }

    function m(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
    }
    var g = function(e) {
        function t() {
            return e.apply(this, arguments) || this
        }
        return m(t, e), t.prototype.render = function() {
            var e, t = this.props,
                n = t.className,
                r = t.children,
                i = t.separator,
                o = t.direction,
                s = t.align,
                l = t.justify,
                c = t.wrap;
            return E(u.default, {
                grow: 0,
                shrink: 0,
                direction: o,
                justify: l,
                align: s,
                wrap: c,
                className: (0, a.default)(f.default.header, n, (e = {}, e[f.default.separator] = i, e))
            }, void 0, r)
        }, t
    }(i.PureComponent);
    g.displayName = "Header", g.defaultProps = {
        separator: !0,
        direction: u.default.Direction.HORIZONTAL,
        align: u.default.Align.CENTER,
        justify: u.default.Justify.START,
        wrap: u.default.Wrap.NO_WRAP
    };
    var v = function(e) {
        function t() {
            return e.apply(this, arguments) || this
        }
        return m(t, e), t.prototype.render = function() {
            var e = this.props,
                t = e.className,
                n = e.outerClassName,
                r = e.children,
                o = e.scrollerRef,
                s = h(e, ["className", "outerClassName", "children", "scrollerRef"]);
            return i.createElement(c.default, _({
                outerClassName: (0, a.default)(f.default.content, n),
                className: (0, a.default)(f.default.inner, t),
                theme: c.default.Themes.GHOST_HAIRLINE,
                ref: o
            }, s), r)
        }, t
    }(i.PureComponent);
    v.displayName = "Content";
    var T = function(e) {
        function t() {
            return e.apply(this, arguments) || this
        }
        return m(t, e), t.prototype.render = function() {
            var e = this.props,
                t = e.className,
                n = e.children,
                r = e.scrollerRef,
                s = h(e, ["className", "children", "scrollerRef"]);
            return i.createElement(o.default, _({
                outerClassName: f.default.content,
                className: (0, a.default)(f.default.inner, t),
                theme: c.default.Themes.GHOST_HAIRLINE,
                ref: r
            }, s), n)
        }, t
    }(i.PureComponent);
    T.displayName = "LazyContent";
    var y = function(e) {
        function t() {
            return e.apply(this, arguments) || this
        }
        return m(t, e), t.prototype.render = function() {
            var e = this.props,
                t = e.className,
                n = e.children,
                r = e.direction,
                i = e.align,
                o = e.justify,
                s = e.wrap;
            return E(u.default, {
                grow: 0,
                shrink: 0,
                direction: r,
                justify: o,
                align: i,
                wrap: s,
                className: (0, a.default)(f.default.footer, t)
            }, void 0, n)
        }, t
    }(i.PureComponent);
    y.displayName = "Footer", y.defaultProps = {
        direction: u.default.Direction.HORIZONTAL_REVERSE,
        align: u.default.Align.STRETCH,
        justify: u.default.Justify.START,
        wrap: u.default.Wrap.NO_WRAP
    };
    var I = function(e) {
        function t() {
            return e.apply(this, arguments) || this
        }
        return m(t, e), t.prototype.render = function() {
            var e, t = this.props,
                n = t.className,
                r = t.onClick,
                o = t.hideOnFullscreen,
                u = h(t, ["className", "onClick", "hideOnFullscreen"]);
            return E(s.default, {
                "aria-label": d.default.Messages.CLOSE,
                look: s.default.Looks.BLANK,
                size: s.default.Sizes.NONE,
                onClick: r,
                className: (0, a.default)(f.default.close, n, (e = {}, e[f.default.hideOnFullscreen] = o, e))
            }, void 0, i.createElement(l.default, _({}, u, {
                name: l.default.Names.CLOSE,
                width: 18,
                height: 18
            })))
        }, t
    }(i.PureComponent);
    I.displayName = "CloseButton";
    var S = {
            SMALL: f.default.sizeSmall,
            MEDIUM: f.default.sizeMedium,
            LARGE: f.default.sizeLarge
        },
        A = function(e) {
            function t(t) {
                var n;
                return (n = e.call(this, t) || this).setRef = function(e) {
                    n._scroller = e, null != e && n.calculateScroll()
                }, n.handleScroll = function(e) {
                    n.calculateScroll();
                    var t = n.props.onScroll;
                    t && t(e)
                }, n.state = {
                    hideSeparator: !1
                }, n
            }
            m(t, e);
            var n = t.prototype;
            return n.calculateScroll = function(e) {
                if (void 0 === e && (e = this._scroller), null != e) {
                    var t = e.getScrollData().scrollTop,
                        n = this.state.hideSeparator;
                    0 !== t || n ? t > 0 && n && this.setState({
                        hideSeparator: !1
                    }) : this.setState({
                        hideSeparator: !0
                    })
                }
            }, n.getScroller = function() {
                return this._scroller
            }, n.renderChildren = function() {
                var e = this,
                    t = this.state.hideSeparator;
                return i.Children.map(this.props.children, function(n) {
                    return !n || n.type !== v && n.type.displayName !== v.name && n.type !== T && n.type.displayName !== T.name ? n && (n.type === g || n.type.displayName === g.name) && t ? i.cloneElement(n, {
                        separator: !1
                    }) : n : i.cloneElement(n, {
                        scrollerRef: e.setRef,
                        onScroll: e.handleScroll,
                        onResize: e.handleScroll
                    })
                })
            }, n.render = function() {
                var e, t = this.props,
                    n = t.className,
                    r = (t.children, t.tag),
                    o = void 0 === r ? "div" : r,
                    s = t.size,
                    u = t.fullscreenOnMobile,
                    l = h(t, ["className", "children", "tag", "size", "fullscreenOnMobile"]);
                return i.createElement(o, _({
                    className: (0, a.default)(f.default.modal, n, s, (e = {}, e[f.default.fullscreenOnMobile] = u, e))
                }, l), this.renderChildren())
            }, t
        }(i.PureComponent);
    A.displayName = "DeprecatedModal", A.Header = g, A.Footer = y, A.Content = v, A.LazyContent = T, A.CloseButton = I, A.Sizes = S, A.defaultProps = {
        size: S.SMALL
    };
    var O = A;
    t.default = O
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r, i, a, o = m(n(3)),
        s = m(n(2)),
        u = m(n(155)),
        l = n(726),
        c = n(107),
        d = m(n(11)),
        f = m(n(41)),
        p = m(n(55)),
        _ = m(n(44)),
        h = m(n(10)),
        E = n(1);

    function m(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function g() {
        return (g = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var v = null;

    function T() {
        r = null, v = null, i = {}, a = {}
    }

    function y(e) {
        i[e.ownerId] = e
    }

    function I() {
        r = null
    }

    function S(e) {
        var t = e.streamKey,
            n = e.region,
            i = e.viewerIds,
            o = e.paused;
        r = g({}, (0, c.decodeStreamKey)(t), {
            state: o ? E.ApplicationStreamStates.PAUSED : E.ApplicationStreamStates.ACTIVE
        }), a[t] = {
            streamKey: t,
            region: n,
            viewerIds: i
        }
    }

    function A(e) {
        return p.default.can(E.Permissions.VIEW_CHANNEL, {
            channelId: e
        })
    }
    T();
    var O = new(function(e) {
        var t, n;

        function o() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = o).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var s = o.prototype;
        return s.initialize = function() {
            this.syncWith([u.default, p.default], function() {
                return !0
            }), this.waitFor(_.default, p.default)
        }, s.getActiveStream = function() {
            return (0, l.canSpectate)(h.default, f.default, u.default) ? r : null
        }, s.getStreamerActiveStreamMetadata = function() {
            return v
        }, s.getStreamForUser = function(e) {
            if (!(0, l.canSpectate)(h.default, f.default, u.default)) return null;
            var t = i[e];
            return null == t || A(t.channelId) ? t : null
        }, s.getRTCStream = function(e) {
            return (0, l.canSpectate)(h.default, f.default, u.default) ? a[e] : null
        }, s.getAllApplicationStreams = function() {
            return (0, l.canSpectate)(h.default, f.default, u.default) ? Object.keys(i).map(function(e) {
                return i[e]
            }).filter(function(e) {
                return null != e && A(e.channelId)
            }) : []
        }, s.getViewerIds = function(e) {
            if (!(0, l.canSpectate)(h.default, f.default, u.default)) return [];
            var t = null,
                n = null != (t = "string" == typeof e ? e : (0, c.encodeStreamKey)(e)) ? a[t] : null;
            return null != n ? n.viewerIds : []
        }, s.getState = function() {
            return (0, l.canSpectate)(h.default, f.default, u.default) ? {
                streamsByUser: i,
                rtcStreams: a
            } : {
                streamsByUser: {},
                rtcStreams: {}
            }
        }, o
    }(o.default.Store))(s.default, {
        OVERLAY_INITIALIZE: function(e) {
            var t = e.streams,
                n = e.activeStream;
            t.forEach(y), r = n
        },
        VOICE_STATE_UPDATE: function(e) {
            var t = e.userId,
                n = e.guildId,
                r = e.channelId;
            e.selfStream && null != r && null != n ? y({
                streamType: "guild",
                ownerId: t,
                guildId: n,
                channelId: r
            }) : function(e) {
                delete i[e]
            }(t)
        },
        VOICE_CHANNEL_CLEAR: function(e) {
            return I()
        },
        STREAM_WATCH: function(e) {
            var t = e.streamKey;
            r = g({}, (0, c.decodeStreamKey)(t), {
                state: E.ApplicationStreamStates.CONNECTING
            })
        },
        STREAM_START: function(e) {
            var t = e.streamType,
                n = e.guildId,
                i = e.channelId,
                a = e.pid,
                o = _.default.getGameForPID(a);
            v = {
                id: o && o.id
            }, r = {
                streamType: t,
                guildId: n,
                channelId: i,
                ownerId: d.default.getId(),
                state: E.ApplicationStreamStates.CONNECTING
            }
        },
        STREAM_STOP: function(e) {
            v = null
        },
        STREAM_CREATE: S,
        STREAM_UPDATE: S,
        STREAM_TIMED_OUT: function(e) {
            var t = e.streamKey;
            null != r && (0, c.encodeStreamKey)(r) === t && (r = g({}, r, {
                state: E.ApplicationStreamStates.FAILED
            }))
        },
        STREAM_DELETE: function(e) {
            var t = e.streamKey,
                n = e.unavailable,
                i = e.reason;
            delete a[t], null != r && (0, c.encodeStreamKey)(r) === t && (r = n ? g({}, r, {
                state: E.ApplicationStreamStates.RECONNECTING
            }) : i === E.ApplicationStreamDeleteReasons.UNAUTHORIZED ? g({}, r, {
                state: E.ApplicationStreamStates.FAILED
            }) : g({}, r, {
                state: E.ApplicationStreamStates.ENDED
            }))
        },
        STREAM_CLOSE: function(e) {
            var t = e.streamKey;
            if (null == r || (0, c.encodeStreamKey)(r) !== t) return !1;
            I()
        },
        RTC_CONNECTION_STATE: function(e) {
            var t = e.streamKey,
                n = e.state;
            if (null == t || null == r || (0, c.encodeStreamKey)(r) !== t || r.state === E.ApplicationStreamStates.ENDED) return !1;
            var i = r.state;
            switch (n) {
                case E.RTCConnectionStates.DISCONNECTED:
                    i = E.ApplicationStreamStates.RECONNECTING;
                    break;
                case E.RTCConnectionStates.RTC_CONNECTED:
                    i = E.ApplicationStreamStates.ACTIVE
            }
            if (i === r.state) return !1;
            r = g({}, r, {
                state: i
            })
        },
        CONNECTION_OPEN: function(e) {
            return T()
        },
        CONNECTION_CLOSED: function(e) {
            return T()
        },
        LOGOUT: function(e) {
            return T()
        }
    });
    t.default = O
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.renderActivity = function(e, t) {
        if (null != e && e.type === u.ActivityTypes.CUSTOM_STATUS) return null != e.state ? e.state.trim() : null;
        if (null != t) return null == e || e.type !== u.ActivityTypes.PLAYING ? l.default.Messages.STREAMING_A_GAME : l.default.Messages.STREAMING.format({
            name: e.name
        });
        if (null == e || null == e.name) return null;
        if (f(e)) return l.default.Messages.STREAMING.format({
            name: e.name
        });
        switch (e.type) {
            case u.ActivityTypes.LISTENING:
                return l.default.Messages.LISTENING_TO.format({
                    name: e.name
                });
            case u.ActivityTypes.WATCHING:
                return l.default.Messages.WATCHING.format({
                    name: e.name
                });
            case u.ActivityTypes.CUSTOM_STATUS:
                return null;
            case u.ActivityTypes.PLAYING:
            default:
                return l.default.Messages.PLAYING_GAME.format({
                    game: e.name
                })
        }
    }, t.isStreaming = f, t.isListeningOnSpotify = function(e) {
        return null != e && e.type === u.ActivityTypes.LISTENING && e.name === r.default.get(u.PlatformTypes.SPOTIFY).name && null != e.party && null != e.party.id && (0, s.isSpotifyParty)(e.party.id)
    }, t.isOnXbox = _, t.getPlayingString = function(e) {
        var t = h(e) || "";
        switch (t) {
            case u.ActivityGamePlatforms.XBOX:
            case u.ActivityGamePlatforms.SAMSUNG:
                return l.default.Messages.USER_ACTIVITY_HEADER_PLAYING_ON_PLATFORM.format({
                    platform: r.default.get(t).name
                });
            default:
                return l.default.Messages.USER_ACTIVITY_HEADER_PLAYING
        }
    }, t.getGamePlatform = h, t.getStreamURL = function(e) {
        if (null != e && null != e.url && d.test(e.url)) return e.url;
        return null
    }, t.getSimpleStreamURL = function(e) {
        var t = e.match(d);
        if (null != t) return t[1];
        return null
    }, t.getStreamUsername = function(e) {
        var t = e.match(d);
        if (null != t) return t[2];
        return null
    }, t.hasRichActivity = function(e) {
        return null != e && e.type !== u.ActivityTypes.CUSTOM_STATUS && (null != e.details || null != e.assets || null != e.party || null != e.secrets || null != e.state)
    }, t.hasFlag = E, t.canJoinOrSpectate = m, t.shouldShowActivityInviteEducation = function(e, t, n, r, i) {
        if (null == e) return !1;
        if (!e.isPrivate() && !r.can(u.Permissions.EMBED_LINKS, e)) return !1;
        if (null == t || !m(t)) return !1;
        var a = t.application_id;
        if (null == a) return !1;
        if (null == i.getGame(a)) return !1;
        return n.shouldShowEducation(a)
    }, t.isInviteActive = function(e, t, n) {
        if (null == e) return !1;
        var r = null != t.activity ? t.activity.party_id : null,
            i = null != r && (null == e.party || e.party.id !== r),
            a = o.default.extractTimestamp(t.id) + u.EMBED_LIFETIME < Date.now(),
            s = null != e.application_id && e.application_id !== n;
        return !i && !a && !s
    }, t.getCoverImageFromActivity = function(e, t) {
        if (null == e || null == e.assets || null == e.assets.large_image) return null;
        return (0, a.getAssetImage)(t, e.assets.large_image, [u.ACTIVITY_INVITE_COVER_IMAGE_SIZE, u.ACTIVITY_INVITE_COVER_IMAGE_SIZE])
    }, t.isGameActivity = function(e) {
        return [u.ActivityTypes.PLAYING, u.ActivityTypes.STREAMING].includes(e.type)
    }, t.isPrivateActivity = function(e) {
        return null != e.application_id && null == i.default.getApplicationActivity(e.application_id, !1)
    };
    var r = c(n(81)),
        i = c(n(214)),
        a = n(224),
        o = c(n(141)),
        s = n(223),
        u = n(1),
        l = c(n(5));

    function c(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var d = /^https?:\/\/(?:www\.)?(twitch\.tv\/(.+))/;

    function f(e) {
        return null != e && (e.type === u.ActivityTypes.STREAMING && (null != e.url && d.test(e.url)))
    }
    var p = "438122941302046720";

    function _(e) {
        return null != e && (e.application_id === p || e.platform === u.ActivityGamePlatforms.XBOX)
    }

    function h(e) {
        return null == e || null == e.type || e.type !== u.ActivityTypes.PLAYING ? null : _(e) ? u.ActivityGamePlatforms.XBOX : null != e.platform ? e.platform : u.ActivityGamePlatforms.DESKTOP
    }

    function E(e, t) {
        return t !== u.ActivityFlags.INSTANCE && (null != e && null != e.flags && !!(e.flags & t))
    }

    function m(e) {
        var t = E(e, u.ActivityFlags.JOIN),
            n = E(e, u.ActivityFlags.SPECTATE);
        return t || n
    }
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = b(n(7)),
        i = b(n(82)),
        a = b(n(12)),
        o = b(n(2)),
        s = b(n(108)),
        u = n(90),
        l = b(n(156)),
        c = b(n(66)),
        d = b(n(330)),
        f = b(n(21)),
        p = b(n(51)),
        _ = b(n(23)),
        h = b(n(123)),
        E = O(n(100)),
        m = b(n(201)),
        g = b(n(20)),
        v = b(n(13)),
        T = O(n(162)),
        y = b(n(475)),
        I = O(n(274)),
        S = n(1),
        A = b(n(5));

    function O(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n)) {
                    var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                    r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                } return t.default = e, t
    }

    function b(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function N(e, t, n, r, i, a, o) {
        try {
            var s = e[a](o),
                u = s.value
        } catch (e) {
            return void n(e)
        }
        s.done ? t(u) : Promise.resolve(u).then(r, i)
    }

    function C(e) {
        return function() {
            var t = this,
                n = arguments;
            return new Promise(function(r, i) {
                var a = e.apply(t, n);

                function o(e) {
                    N(a, r, i, o, s, "next", e)
                }

                function s(e) {
                    N(a, r, i, o, s, "throw", e)
                }
                o(void 0)
            })
        }
    }
    var R = null,
        L = [],
        D = "dosbox.exe";

    function P(e) {
        return e = e.toLowerCase(), v.default.isWindows() && (e = (e = e.replace(/^[a-z]:/, "")).replace(/\\/g, "/")), e
    }

    function M(e) {
        e && ((e = P(e)).endsWith("/") || (e += "/"), L.push(e))
    }

    function w(e, t) {
        e = P(e);
        var n = !1;
        return L.forEach(function(t) {
            !n && e.startsWith(t) && (e = e.substr(t.length), n = !0)
        }), n || (e = e.split("/").pop()), t || (e = e.includes(D) ? e.split("/").slice(-3).join("/") : e.split("/").slice(-2).join("/")), e
    }

    function U(e, t) {
        x(e).then(function() {
            return m.default.waitConnected(e)
        }).then(function() {
            return Promise.race([m.default.waitSubscribed(e, S.RPCEvents.ACTIVITY_JOIN), m.default.waitSubscribed(e, S.RPCEvents.GAME_JOIN)])
        }).then(function() {
            return o.default.dispatch({
                type: S.ActionTypes.ACTIVITY_JOIN,
                applicationId: e,
                secret: t
            })
        }).catch(function() {
            return o.default.dispatch({
                type: S.ActionTypes.ACTIVITY_JOIN_FAILED,
                applicationId: e
            })
        })
    }

    function k(e, t) {
        return null == e || "" === e ? null : {
            distributor: e,
            sku: t
        }
    }

    function x(e, t) {
        if (l.default.isConnected(e)) return Promise.resolve();
        var n, r = null,
            s = !1;
        if (null == t) {
            var u = p.default.getActiveLibraryApplication(e);
            t = null != u ? u.branchId : e
        }
        if (c.default.isLaunchable(e, t)) {
            var d = c.default.getState(e, t),
                h = p.default.getActiveLaunchOptionId(e, t);
            if (null == d) throw new Error("Missing dispatch game when launching");
            var E = p.default.getLibraryApplication(e, t);
            if (null == E) throw new Error("Missing library application when launching");
            s = !0, r = (n = e, a.default.post({
                url: S.Endpoints.OAUTH2_AUTHORIZE,
                query: {
                    client_id: n,
                    response_type: "token",
                    scope: [S.OAuth2Scopes.IDENTIFY].join(" ")
                },
                retries: 3,
                body: {
                    authorize: !0
                }
            }).then(function(e) {
                var t = e.body.location.split(/#|\?/),
                    n = i.default.parse(t[t.length - 1]);
                if ("invalid_request" === n.error) return null;
                if (null != n.error) throw new Error("OAuth2 Error: " + n.error + ": " + (n.error_description || "unknown error"));
                return n.access_token
            }, function(e) {
                if (404 === e.status) return null;
                throw e
            })).then(function(e) {
                return m.default.launchDispatchApplication(d, e, _.default.locale, E.getBranchName(), h)
            })
        } else {
            var g = f.default.getGame(e);
            r = null != g ? m.default.launch(g) : m.default.launchGame(e)
        }
        if (null != r) return o.default.dispatch({
            type: S.ActionTypes.LIBRARY_APPLICATION_ACTIVE_BRANCH_UPDATE,
            applicationId: e,
            branchId: t
        }), o.default.dispatch({
            type: S.ActionTypes.GAME_LAUNCH_START,
            applicationId: e
        }), r.then(function(t) {
            o.default.dispatch({
                type: S.ActionTypes.GAME_LAUNCH_SUCCESS,
                applicationId: e,
                pids: t
            })
        }).catch(function(t) {
            t === S.GameLaunchStatuses.LAUNCH_TARGET_NOT_FOUND && y.default.show(S.NoticeTypes.GENERIC, s ? A.default.Messages.DISPATCH_GAME_LAUNCH_FAILED_LAUNCH_TARGET_NOT_FOUND : A.default.Messages.GAME_LAUNCH_FAILED_LAUNCH_TARGET_NOT_FOUND), o.default.dispatch({
                type: S.ActionTypes.GAME_LAUNCH_FAIL,
                applicationId: e,
                error: v
            })
        });
        var v = new Error("game not found");
        return o.default.dispatch({
            type: S.ActionTypes.GAME_LAUNCH_FAIL,
            applicationId: e,
            error: v
        }), Promise.reject(v)
    }
    var G, F = {
        addGame: function(e) {
            o.default.dispatch({
                type: S.ActionTypes.RUNNING_GAME_ADD_OVERRIDE,
                pid: e
            })
        },
        fetchApplication: function(e, t) {
            return void 0 === t && (t = !1), o.default.dirtyDispatch({
                type: S.ActionTypes.APPLICATION_FETCH,
                applicationId: e
            }), a.default.get({
                url: S.Endpoints.APPLICATION_PUBLIC(e),
                query: {
                    with_guild: t
                }
            }).then(function(e) {
                return o.default.dispatch({
                    type: S.ActionTypes.APPLICATION_FETCH_SUCCESS,
                    application: e.body
                }), e.body
            }).catch(function(t) {
                return o.default.dispatch({
                    type: S.ActionTypes.APPLICATION_FETCH_FAIL,
                    applicationId: e
                }), Promise.reject(t)
            })
        },
        fetchApplications: (G = C(regeneratorRuntime.mark(function e(t) {
            var n;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return o.default.dirtyDispatch({
                            type: S.ActionTypes.APPLICATIONS_FETCH,
                            applicationIds: t
                        }), e.prev = 1, e.next = 4, a.default.get({
                            url: S.Endpoints.APPLICATIONS_PUBLIC,
                            query: i.default.stringify({
                                application_ids: t
                            })
                        });
                    case 4:
                        n = e.sent, e.next = 11;
                        break;
                    case 7:
                        throw e.prev = 7, e.t0 = e.catch(1), o.default.dispatch({
                            type: S.ActionTypes.APPLICATIONS_FETCH_FAIL,
                            applicationIds: t
                        }), e.t0;
                    case 11:
                        o.default.dispatch({
                            type: S.ActionTypes.APPLICATIONS_FETCH_SUCCESS,
                            applications: n.body
                        });
                    case 12:
                    case "end":
                        return e.stop()
                }
            }, e, null, [
                [1, 7]
            ])
        })), function(e) {
            return G.apply(this, arguments)
        }),
        toggleOverlay: function(e) {
            var t = f.default.getGameByName(e.name);
            if (null != t) {
                var n = p.default.getActiveLibraryApplication(t.id) || h.default.getLocalApplication(t.id);
                if (null != n) {
                    var r = E.toggleFlag(n.getFlags(), S.LibraryApplicationFlags.OVERLAY_DISABLED);
                    return void(n instanceof u.LocalApplicationRecord ? I.updateFlags(n.id, r) : T.updateFlags(n.id, n.branchId, r))
                }
            }
            o.default.dispatch({
                type: S.ActionTypes.RUNNING_GAME_TOGGLE_OVERLAY,
                game: e
            })
        },
        editName: function(e, t) {
            o.default.dispatch({
                type: S.ActionTypes.RUNNING_GAME_EDIT_NAME,
                game: e,
                newName: t
            })
        },
        identifyGame: function(e, t) {
            return g.default.ensureModule("discord_game_utils").then(function() {
                R = g.default.requireModule("discord_game_utils");
                var e = s.default.process.env,
                    t = s.default.remoteApp.getPath;
                v.default.isWindows() && (M(e.LOCALAPPDATA), M(e["PROGRAMFILES(X86)"]), M(e.PROGRAMFILES), M(e.PROGRAMW6432), M(e.PROGRAMDATA), M("/games/")), M(t("home")), M(t("appData")), M(t("desktop")), M(t("documents")), M(t("downloads")), (L = r.default.uniq(L)).sort(function(e, t) {
                    return t.length - e.length
                })
            }).catch(function(e) {
                console.error("could not load discord_game_utils", e)
            }).then(function() {
                return new Promise(function(t, n) {
                    null != R ? R.identifyGame(e, function(r, i) {
                        0 === r ? i.icon && i.name ? (o.default.dispatch({
                            type: S.ActionTypes.GAME_ICON_UPDATE,
                            gameName: i.name,
                            icon: "data:image/png;base64," + i.icon
                        }), t(i)) : n(new Error("Did not find data on " + e)) : n(new Error("Error " + r + " when fetching info on " + e))
                    }) : n(new Error("Game utils module not loaded"))
                })
            })
        },
        getDetectableGames: function() {
            f.default.fetching || null != f.default.lastFetched || o.default.wait(function() {
                o.default.dispatch({
                    type: S.ActionTypes.GAMES_DATABASE_FETCH
                }), a.default.get({
                    url: S.Endpoints.APPLICATIONS_DETECTABLE,
                    headers: {
                        "If-None-Match": f.default.etag
                    },
                    retries: 1
                }).then(function(e) {
                    var t = e.body,
                        n = e.headers.etag;
                    o.default.dispatch({
                        type: S.ActionTypes.GAMES_DATABASE_UPDATE,
                        games: t,
                        etag: n
                    })
                }, function(e) {
                    304 === e.status ? o.default.dispatch({
                        type: S.ActionTypes.GAMES_DATABASE_UPDATE,
                        games: [],
                        etag: f.default.etag
                    }) : o.default.dispatch({
                        type: S.ActionTypes.GAMES_DATABASE_FETCH_FAIL
                    })
                })
            })
        },
        getApplicationNews: function(e) {
            o.default.wait(C(regeneratorRuntime.mark(function t() {
                var n;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                        case 0:
                            return t.prev = 0, t.next = 3, a.default.get(S.Endpoints.APPLICATION_NEWS_BY_ID(e));
                        case 3:
                            n = t.sent, o.default.dispatch({
                                type: S.ActionTypes.APPLICATION_NEWS_ITEM_UPDATE,
                                applicationNewsId: e,
                                applicationNews: n.body
                            }), t.next = 10;
                            break;
                        case 7:
                            t.prev = 7, t.t0 = t.catch(0), o.default.dispatch({
                                type: S.ActionTypes.APPLICATION_NEWS_ITEM_UPDATE,
                                applicationNewsId: e,
                                applicationNews: null
                            });
                        case 10:
                        case "end":
                            return t.stop()
                    }
                }, t, null, [
                    [0, 7]
                ])
            })))
        },
        getGameNews: function(e) {
            var t = e.filter(function(e) {
                return d.default.shouldFetch(e)
            });
            0 !== t.length && o.default.wait(function() {
                o.default.dispatch({
                    type: S.ActionTypes.GAME_NEWS_FETCH,
                    gameIds: t
                }), r.default.chunk(t, S.MAX_GAMES_NEWS).map(function(e) {
                    a.default.get({
                        url: S.Endpoints.APPLICATION_NEWS,
                        query: {
                            application_ids: e
                        }
                    }).then(function(t) {
                        o.default.dispatch({
                            type: S.ActionTypes.GAME_NEWS_UPDATE,
                            gameNews: t.body,
                            gameIds: e
                        })
                    }, function() {
                        o.default.dispatch({
                            type: S.ActionTypes.GAME_NEWS_UPDATE,
                            gameNews: [],
                            gameIds: e
                        })
                    })
                })
            })
        },
        readNews: function(e) {
            o.default.dispatch({
                type: S.ActionTypes.GAME_NEWS_READ,
                news: e
            })
        },
        hideNews: function(e) {
            o.default.dispatch({
                type: S.ActionTypes.GAME_NEWS_HIDE,
                news: e
            })
        },
        reportUnverifiedGame: function(e) {
            var t = e.name,
                n = e.iconHash,
                r = e.publisher,
                i = e.distributor,
                s = e.sku,
                u = e.executableName;
            a.default.post({
                url: S.Endpoints.UNVERIFIED_APPLICATIONS,
                body: {
                    name: t,
                    os: v.default.platform,
                    icon: n,
                    distributor_application: k(i, s),
                    executable: w(u, !1),
                    publisher: r,
                    report_version: S.GAME_REPORT_VERSION
                },
                retries: 1
            }).then(function(e) {
                var t = e.body,
                    n = t.name,
                    r = t.hash,
                    i = t.missing_data;
                o.default.dispatch({
                    type: S.ActionTypes.UNVERIFIED_GAME_UPDATE,
                    name: n,
                    hash: r,
                    missingData: i
                })
            })
        },
        uploadIcon: function(e, t, n) {
            a.default.post({
                url: S.Endpoints.UNVERIFIED_APPLICATIONS_ICONS,
                body: {
                    application_name: e,
                    application_hash: t,
                    icon: n
                },
                retries: 1
            })
        },
        deleteEntry: function(e) {
            o.default.dispatch({
                type: S.ActionTypes.RUNNING_GAME_DELETE_ENTRY,
                game: e
            })
        },
        checkLaunchable: function(e) {
            var t = f.default.isLaunchable(e),
                n = f.default.getGame(e);
            return (null != n ? m.default.isLaunchable(n) : m.default.isGameLaunchable(e)).then(function(n) {
                n !== t && o.default.dispatch({
                    type: S.ActionTypes.GAME_LAUNCHABLE_UPDATE,
                    gameId: e,
                    isLaunchable: n
                })
            })
        },
        launch: x,
        join: function(e, t, n, r, i) {
            return __OVERLAY__ ? (o.default.dispatch({
                type: S.ActionTypes.OVERLAY_JOIN_GAME,
                userId: e,
                sessionId: t,
                applicationId: n,
                channelId: r,
                messageId: i
            }), Promise.resolve(!0)) : (o.default.dispatch({
                type: S.ActionTypes.ACTIVITY_JOIN_LOADING,
                applicationId: n
            }), r && i && (s = {
                channel_id: r,
                message_id: i
            }), a.default.get({
                url: S.Endpoints.USER_ACTIVITY_JOIN(e, t, n),
                retries: 3,
                query: s
            }).then(function(e) {
                return U(n, e.body.secret), !0
            }, function() {
                return o.default.dispatch({
                    type: S.ActionTypes.ACTIVITY_JOIN_FAILED,
                    applicationId: n
                }), !1
            }));
            var s
        },
        joinWithSecret: U,
        spectate: function(e, t, n, r, i) {
            var s;
            return o.default.dispatch({
                type: S.ActionTypes.ACTIVITY_SPECTATE_LOADING,
                applicationId: n
            }), r && i && (s = {
                channel_id: r,
                message_id: i
            }), a.default.get({
                url: S.Endpoints.USER_ACTIVITY_SPECTATE(e, t, n),
                retries: 3,
                query: s
            }).then(function(e) {
                var t = e.body.secret;
                return x(n).then(function() {
                    return m.default.waitConnected(n)
                }).then(function() {
                    return Promise.race([m.default.waitSubscribed(n, S.RPCEvents.ACTIVITY_SPECTATE), m.default.waitSubscribed(n, S.RPCEvents.GAME_SPECTATE)])
                }).then(function() {
                    return o.default.dispatch({
                        type: S.ActionTypes.ACTIVITY_SPECTATE,
                        applicationId: n,
                        secret: t
                    }), !0
                }).catch(function() {
                    return o.default.dispatch({
                        type: S.ActionTypes.ACTIVITY_SPECTATE_FAILED,
                        applicationId: n
                    }), !1
                })
            }, function() {
                return o.default.dispatch({
                    type: S.ActionTypes.ACTIVITY_SPECTATE_FAILED,
                    applicationId: n
                }), !1
            })
        }
    };
    t.default = F
},
function(e, t, n) {
    "use strict";

    function r(e, t) {
        return (e & t) === t
    }

    function i(e, t) {
        return e | t
    }

    function a(e, t) {
        return e & ~t
    }
    t.__esModule = !0, t.hasFlag = r, t.addFlag = i, t.removeFlag = a, t.setFlag = function(e, t, n) {
        if (n) return i(e, t);
        return a(e, t)
    }, t.toggleFlag = function(e, t) {
        if (r(e, t)) return a(e, t);
        return i(e, t)
    }
},
function(e, t, n) {
    "use strict";
    var r = n(30);
    e.exports = function(e, t) {
        return !!e && r(function() {
            t ? e.call(null, function() {}, 1) : e.call(null)
        })
    }
}, ,
function(e, t, n) {
    "use strict";

    function r(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
    }
    n.d(t, "a", function() {
        return r
    })
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = t.Positions = void 0;
    var r, i, a = u(n(0)),
        o = (r = n(9)) && r.__esModule ? r : {
            default: r
        },
        s = u(n(242));

    function u(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n)) {
                    var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                    r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                } return t.default = e, t
    }

    function l() {
        return (l = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var c = s.TooltipPositions;
    t.Positions = c;
    var d = function(e) {
        var t, n;

        function r() {
            for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
            return (t = e.call.apply(e, [this].concat(r)) || this).renderChild = function(e) {
                var n = t.props,
                    r = n.children,
                    i = n.className,
                    s = n.onClick,
                    u = a.Children.only(r);
                return a.cloneElement(u, l({}, e, {
                    onClick: function(t) {
                        null != e.onClick && e.onClick(), null != u.props.onClick && u.props.onClick(t), null != s && s(t)
                    },
                    onContextMenu: function(t) {
                        null != e.onContextMenu && e.onContextMenu(), null != u.props.onContextMenu && u.props.onContextMenu(t)
                    },
                    className: (0, o.default)(i, u.props.className)
                }))
            }, t
        }
        return n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n, r.prototype.render = function() {
            var e = this.props,
                t = e.text,
                n = e.position,
                r = e.color,
                a = e.delay,
                o = e.hideOnClick,
                u = e.forceOpen,
                l = e["aria-label"];
            return function(e, t, n, r) {
                i || (i = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);
                var a = e && e.defaultProps,
                    o = arguments.length - 3;
                if (t || 0 === o || (t = {
                        children: void 0
                    }), t && a)
                    for (var s in a) void 0 === t[s] && (t[s] = a[s]);
                else t || (t = a || {});
                if (1 === o) t.children = r;
                else if (o > 1) {
                    for (var u = new Array(o), l = 0; l < o; l++) u[l] = arguments[l + 3];
                    t.children = u
                }
                return {
                    $$typeof: i,
                    type: e,
                    key: void 0 === n ? null : "" + n,
                    ref: null,
                    props: t,
                    _owner: null
                }
            }(s.default, {
                text: null == t || "" === t ? null : t,
                "aria-label": l,
                position: n,
                color: r,
                delay: a,
                hideOnClick: o,
                forceOpen: u
            }, void 0, this.renderChild)
        }, r
    }(a.Component);
    t.default = d, d.displayName = "TooltipDeprecated", d.defaultProps = {
        position: s.TooltipPositions.TOP,
        color: s.TooltipColors.BLACK,
        delay: 0,
        hideOnClick: !0,
        forceOpen: !1
    }, d.Positions = s.TooltipPositions, d.Colors = s.TooltipColors
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = s(n(58)),
        i = s(n(88)),
        a = s(n(141)),
        o = n(1);

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function u(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    var l = function(e) {
        var t, n;

        function r() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var s, l, c, d = r.prototype;
        return d.initialize = function(e) {
            this.id = e.id, this.username = e.username || "", this.usernameLowerCase = this.username.toLocaleLowerCase(), this.discriminator = e.discriminator || o.NON_USER_BOT_DISCRIMINATOR, this.avatar = e.avatar || null, this.email = e.email || null, this.verified = e.verified || !1, this.bot = e.bot || !1, this.mfaEnabled = e.mfaEnabled || !1, this.mobile = e.mobile || !1, this.premiumType = e.premium_type || e.premiumType || null, this.flags = e.flags || 0, this.premiumDiscriminator = e.premium_discriminator || e.premiumDiscriminator || !1, this.phone = e.phone || null
        }, d.getAvatarURL = function(e) {
            return void 0 === e && (e = "png"), i.default.getUserAvatarURL(this, e)
        }, d.getAvatarSource = function() {
            return i.default.getUserAvatarSource({
                id: this.id,
                avatar: this.avatar,
                discriminator: this.discriminator,
                bot: this.bot
            })
        }, d.isClaimed = function() {
            return null != this.email
        }, d.isPhoneVerified = function() {
            return null != this.phone
        }, d.toString = function() {
            return this.username || "???"
        }, d.hasFlag = function(e) {
            return (this.flags & e) === e
        }, d.hasFreePremium = function() {
            return this.isStaff() || this.hasFlag(o.UserFlags.PARTNER)
        }, d.isNonUserBot = function() {
            return this.bot && this.discriminator === o.NON_USER_BOT_DISCRIMINATOR
        }, d.isLocalBot = function() {
            return this.bot && this.id === o.LOCAL_BOT_ID
        }, d.isStaff = function() {
            return this.hasFlag(o.UserFlags.STAFF)
        }, s = r, (l = [{
            key: "createdAt",
            get: function() {
                return new Date(a.default.extractTimestamp(this.id))
            }
        }, {
            key: "avatarURL",
            get: function() {
                return this.getAvatarURL()
            }
        }, {
            key: "tag",
            get: function() {
                return this.username + "#" + this.discriminator
            }
        }]) && u(s.prototype, l), c && u(s, c), r
    }(r.default);
    t.default = l
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.getClass = function(e, t) {
        for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++) i[a - 2] = arguments[a];
        var o = i.reduce(function(e, t) {
                return e + (0, r.upperCaseFirstChar)(t)
            }, ""),
            s = e["" + t + o];
        if (null == s) return "";
        return s
    };
    var r = n(248)
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.decodeStreamKey = function(e) {
        var t = e.split(":"),
            n = t[0],
            r = t[1],
            i = t[2],
            a = t[3];
        if ("guild" !== n) throw new Error("Unknown stream type " + n);
        return {
            streamType: n,
            guildId: r,
            channelId: i,
            ownerId: a
        }
    }, t.encodeStreamKey = function(e) {
        var t = e.streamType,
            n = e.guildId,
            r = e.channelId,
            i = e.ownerId;
        return [t, n, r, i].join(":")
    }
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = window.DiscordNative;
    t.default = r
},
function(e, t, n) {
    var r = Array.prototype.slice,
        i = n(1449),
        a = n(1450),
        o = e.exports = function(e, t, n) {
            return n || (n = {}), e === t || (e instanceof Date && t instanceof Date ? e.getTime() === t.getTime() : !e || !t || "object" != typeof e && "object" != typeof t ? n.strict ? e === t : e == t : function(e, t, n) {
                var l, c;
                if (s(e) || s(t)) return !1;
                if (e.prototype !== t.prototype) return !1;
                if (a(e)) return !!a(t) && (e = r.call(e), t = r.call(t), o(e, t, n));
                if (u(e)) {
                    if (!u(t)) return !1;
                    if (e.length !== t.length) return !1;
                    for (l = 0; l < e.length; l++)
                        if (e[l] !== t[l]) return !1;
                    return !0
                }
                try {
                    var d = i(e),
                        f = i(t)
                } catch (e) {
                    return !1
                }
                if (d.length != f.length) return !1;
                for (d.sort(), f.sort(), l = d.length - 1; l >= 0; l--)
                    if (d[l] != f[l]) return !1;
                for (l = d.length - 1; l >= 0; l--)
                    if (c = d[l], !o(e[c], t[c], n)) return !1;
                return typeof e == typeof t
            }(e, t, n))
        };

    function s(e) {
        return null == e
    }

    function u(e) {
        return !(!e || "object" != typeof e || "number" != typeof e.length) && ("function" == typeof e.copy && "function" == typeof e.slice && !(e.length > 0 && "number" != typeof e[0]))
    }
},
function(e, t, n) {
    var r = n(111);
    e.exports = function(e, t, n) {
        if (r(e), void 0 === t) return e;
        switch (n) {
            case 1:
                return function(n) {
                    return e.call(t, n)
                };
            case 2:
                return function(n, r) {
                    return e.call(t, n, r)
                };
            case 3:
                return function(n, r, i) {
                    return e.call(t, n, r, i)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
},
function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
},
function(e, t) {
    var n = Math.ceil,
        r = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
    }
},
function(e, t, n) {
    var r = n(226),
        i = n(163),
        a = n(93),
        o = n(142),
        s = n(91),
        u = n(502),
        l = Object.getOwnPropertyDescriptor;
    t.f = n(60) ? l : function(e, t) {
        if (e = a(e), t = o(t, !0), u) try {
            return l(e, t)
        } catch (e) {}
        if (s(e, t)) return i(!r.f.call(e, t), e[t])
    }
},
function(e, t, n) {
    var r = n(8),
        i = n(52),
        a = n(30);
    e.exports = function(e, t) {
        var n = (i.Object || {})[e] || Object[e],
            o = {};
        o[e] = t(n), r(r.S + r.F * a(function() {
            n(1)
        }), "Object", o)
    }
},
function(e, t, n) {
    var r = n(110),
        i = n(225),
        a = n(73),
        o = n(47),
        s = n(518);
    e.exports = function(e, t) {
        var n = 1 == e,
            u = 2 == e,
            l = 3 == e,
            c = 4 == e,
            d = 6 == e,
            f = 5 == e || d,
            p = t || s;
        return function(t, s, _) {
            for (var h, E, m = a(t), g = i(m), v = r(s, _, 3), T = o(g.length), y = 0, I = n ? p(t, T) : u ? p(t, 0) : void 0; T > y; y++)
                if ((f || y in g) && (E = v(h = g[y], y, m), e))
                    if (n) I[y] = E;
                    else if (E) switch (e) {
                case 3:
                    return !0;
                case 5:
                    return h;
                case 6:
                    return y;
                case 2:
                    I.push(h)
            } else if (c) return !1;
            return d ? -1 : l || c ? c : I
        }
    }
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = l(n(3)),
        i = l(n(2)),
        a = l(n(425)),
        o = l(n(21)),
        s = l(n(23)),
        u = n(1);

    function l(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var c, d = new Set,
        f = new Set,
        p = {},
        _ = {},
        h = {};

    function E(e) {
        p[e.id] = a.default.createFromServer(e)
    }

    function m(e) {
        var t = e.sku;
        d.delete(t.id), f.delete(t.id), E(t)
    }

    function g(e) {
        E(e.sku), null != e.child_skus && e.child_skus.forEach(function(e) {
            return E(e)
        }), null != e.alternative_skus && e.alternative_skus.forEach(function(e) {
            return E(e)
        })
    }

    function v(e) {
        var t = e.storeListings,
            n = Array.isArray(t),
            r = 0;
        for (t = n ? t : t[Symbol.iterator]();;) {
            var i;
            if (n) {
                if (r >= t.length) break;
                i = t[r++]
            } else {
                if ((r = t.next()).done) break;
                i = r.value
            }
            g(i)
        }
    }

    function T() {
        d = new Set, f = new Set, p = {}, _ = {}, h = {}
    }

    function y() {
        if (c === s.default.locale) return !1;
        c = s.default.locale, T()
    }
    var I = new(function(e) {
        var t, n;

        function r() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var i = r.prototype;
        return i.initialize = function() {
            this.waitFor(s.default, o.default), this.syncWith([s.default], y), c = s.default.locale
        }, i.get = function(e) {
            return p[e]
        }, i.getForApplication = function(e) {
            var t = _[e];
            return null == t ? null : Array.from(t).map(function(e) {
                return p[e]
            })
        }, i.isFetching = function(e) {
            return d.has(e)
        }, i.getSKUs = function() {
            return p
        }, i.didFetchingSkuFail = function(e) {
            return f.has(e)
        }, r
    }(r.default.Store))(i.default, {
        STORE_LISTINGS_FETCH_SUCCESS: v,
        APPLICATION_STORE_DIRECTORY_FETCH_SUCCESS: v,
        STORE_LISTING_FETCH_SUCCESS: function(e) {
            g(e.storeListing)
        },
        GIFT_CODE_RESOLVE_SUCCESS: function(e) {
            var t = e.giftCode;
            if (null == t.store_listing) return !1;
            E(t.store_listing.sku)
        },
        SKU_FETCH_START: function(e) {
            var t = e.skuId;
            d.add(t)
        },
        SKU_FETCH_SUCCESS: m,
        SKU_FETCH_FAIL: function(e) {
            var t = e.skuId;
            d.delete(t), f.add(t)
        },
        SKUS_FETCH_SUCCESS: function(e) {
            var t = e.guildId,
                n = e.applicationId,
                r = e.skus,
                i = r,
                a = Array.isArray(i),
                o = 0;
            for (i = a ? i : i[Symbol.iterator]();;) {
                var s;
                if (a) {
                    if (o >= i.length) break;
                    s = i[o++]
                } else {
                    if ((o = i.next()).done) break;
                    s = o.value
                }
                m({
                    sku: s
                })
            }
            null != t && (h[t] = new Set(r.map(function(e) {
                return e.id
            }))), null != n && (_[n] = new Set(r.map(function(e) {
                return e.id
            })))
        },
        PROMOTIONS_FETCH_SUCCESS: function(e) {
            e.promotions.forEach(function(e) {
                e.data.type === u.PromotionTypes.GAME && null != e.data.sku && E(e.data.sku)
            })
        },
        ENTITLEMENTS_GIFTABLE_FETCH_SUCCESS: function(e) {
            var t = e.entitlements,
                n = Array.isArray(t),
                r = 0;
            for (t = n ? t : t[Symbol.iterator]();;) {
                var i;
                if (n) {
                    if (r >= t.length) break;
                    i = t[r++]
                } else {
                    if ((r = t.next()).done) break;
                    i = r.value
                }
                var a = i;
                null != a.sku && E(a.sku)
            }
        },
        APPLICATION_STORE_CLEAR_DATA: function(e) {
            return T()
        }
    });
    t.default = I
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = l(n(2)),
        i = l(n(14)),
        a = l(n(41)),
        o = l(n(37)),
        s = n(4078),
        u = n(1);

    function l(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var c = {
        selectChannel: function(e, t, n) {
            r.default.dirtyDispatch({
                type: u.ActionTypes.CHANNEL_SELECT,
                guildId: e === u.ME ? null : e,
                channelId: t,
                messageId: n
            })
        },
        selectPrivateChannel: function(e) {
            o.default.transitionTo(u.Routes.CHANNEL(u.ME, e))
        },
        selectVoiceChannel: function(e, t) {
            void 0 === t && (t = !1);
            var n = i.default.getChannel(e),
                r = null != n ? n.getGuildIdForVoice() : null;
            a.default.isSupported() && (null != r && null != e && a.default.getMediaEngine().interact(), (0, s.selectVoiceChannelAdditional)(e, r, t))
        },
        clearVoiceChannel: function() {
            r.default.dispatch({
                type: u.ActionTypes.VOICE_CHANNEL_CLEAR
            })
        }
    };
    t.default = c
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e, t, n) {
        if (e === t) return !0;
        var r = Object.keys(e),
            i = Object.keys(t);
        if (r.length !== i.length) return !1;
        for (var a = 0; a < r.length; a++) {
            var o = r[a];
            if (e[o] !== t[o] && (null == n || -1 === n.indexOf(o))) return !1
        }
        return !0
    }
},
function(e, t) {
    var n, r, i = e.exports = {};

    function a() {
        throw new Error("setTimeout has not been defined")
    }

    function o() {
        throw new Error("clearTimeout has not been defined")
    }

    function s(e) {
        if (n === setTimeout) return setTimeout(e, 0);
        if ((n === a || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
        try {
            return n(e, 0)
        } catch (t) {
            try {
                return n.call(null, e, 0)
            } catch (t) {
                return n.call(this, e, 0)
            }
        }
    }! function() {
        try {
            n = "function" == typeof setTimeout ? setTimeout : a
        } catch (e) {
            n = a
        }
        try {
            r = "function" == typeof clearTimeout ? clearTimeout : o
        } catch (e) {
            r = o
        }
    }();
    var u, l = [],
        c = !1,
        d = -1;

    function f() {
        c && u && (c = !1, u.length ? l = u.concat(l) : d = -1, l.length && p())
    }

    function p() {
        if (!c) {
            var e = s(f);
            c = !0;
            for (var t = l.length; t;) {
                for (u = l, l = []; ++d < t;) u && u[d].run();
                d = -1, t = l.length
            }
            u = null, c = !1,
                function(e) {
                    if (r === clearTimeout) return clearTimeout(e);
                    if ((r === o || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
                    try {
                        r(e)
                    } catch (t) {
                        try {
                            return r.call(null, e)
                        } catch (t) {
                            return r.call(this, e)
                        }
                    }
                }(e)
        }
    }

    function _(e, t) {
        this.fun = e, this.array = t
    }

    function h() {}
    i.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        l.push(new _(e, t)), 1 !== l.length || c || s(p)
    }, _.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = h, i.addListener = h, i.once = h, i.off = h, i.removeListener = h, i.removeAllListeners = h, i.emit = h, i.prependListener = h, i.prependOnceListener = h, i.listeners = function(e) {
        return []
    }, i.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, i.cwd = function() {
        return "/"
    }, i.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, i.umask = function() {
        return 0
    }
},
function(e, t, n) {
    "use strict";
    var r = n(542),
        i = n(1473);

    function a() {
        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
    }
    t.parse = v, t.resolve = function(e, t) {
        return v(e, !1, !0).resolve(t)
    }, t.resolveObject = function(e, t) {
        return e ? v(e, !1, !0).resolveObject(t) : t
    }, t.format = function(e) {
        i.isString(e) && (e = v(e));
        return e instanceof a ? e.format() : a.prototype.format.call(e)
    }, t.Url = a;
    var o = /^([a-z0-9.+-]+:)/i,
        s = /:[0-9]*$/,
        u = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        l = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]),
        c = ["'"].concat(l),
        d = ["%", "/", "?", ";", "#"].concat(c),
        f = ["/", "?", "#"],
        p = /^[+a-z0-9A-Z_-]{0,63}$/,
        _ = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        h = {
            javascript: !0,
            "javascript:": !0
        },
        E = {
            javascript: !0,
            "javascript:": !0
        },
        m = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            "http:": !0,
            "https:": !0,
            "ftp:": !0,
            "gopher:": !0,
            "file:": !0
        },
        g = n(82);

    function v(e, t, n) {
        if (e && i.isObject(e) && e instanceof a) return e;
        var r = new a;
        return r.parse(e, t, n), r
    }
    a.prototype.parse = function(e, t, n) {
        if (!i.isString(e)) throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
        var a = e.indexOf("?"),
            s = -1 !== a && a < e.indexOf("#") ? "?" : "#",
            l = e.split(s);
        l[0] = l[0].replace(/\\/g, "/");
        var v = e = l.join(s);
        if (v = v.trim(), !n && 1 === e.split("#").length) {
            var T = u.exec(v);
            if (T) return this.path = v, this.href = v, this.pathname = T[1], T[2] ? (this.search = T[2], this.query = t ? g.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", this.query = {}), this
        }
        var y = o.exec(v);
        if (y) {
            var I = (y = y[0]).toLowerCase();
            this.protocol = I, v = v.substr(y.length)
        }
        if (n || y || v.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var S = "//" === v.substr(0, 2);
            !S || y && E[y] || (v = v.substr(2), this.slashes = !0)
        }
        if (!E[y] && (S || y && !m[y])) {
            for (var A, O, b = -1, N = 0; N < f.length; N++) {
                -1 !== (C = v.indexOf(f[N])) && (-1 === b || C < b) && (b = C)
            } - 1 !== (O = -1 === b ? v.lastIndexOf("@") : v.lastIndexOf("@", b)) && (A = v.slice(0, O), v = v.slice(O + 1), this.auth = decodeURIComponent(A)), b = -1;
            for (N = 0; N < d.length; N++) {
                var C; - 1 !== (C = v.indexOf(d[N])) && (-1 === b || C < b) && (b = C)
            } - 1 === b && (b = v.length), this.host = v.slice(0, b), v = v.slice(b), this.parseHost(), this.hostname = this.hostname || "";
            var R = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!R)
                for (var L = this.hostname.split(/\./), D = (N = 0, L.length); N < D; N++) {
                    var P = L[N];
                    if (P && !P.match(p)) {
                        for (var M = "", w = 0, U = P.length; w < U; w++) P.charCodeAt(w) > 127 ? M += "x" : M += P[w];
                        if (!M.match(p)) {
                            var k = L.slice(0, N),
                                x = L.slice(N + 1),
                                G = P.match(_);
                            G && (k.push(G[1]), x.unshift(G[2])), x.length && (v = "/" + x.join(".") + v), this.hostname = k.join(".");
                            break
                        }
                    }
                }
            this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), R || (this.hostname = r.toASCII(this.hostname));
            var F = this.port ? ":" + this.port : "",
                Y = this.hostname || "";
            this.host = Y + F, this.href += this.host, R && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== v[0] && (v = "/" + v))
        }
        if (!h[I])
            for (N = 0, D = c.length; N < D; N++) {
                var B = c[N];
                if (-1 !== v.indexOf(B)) {
                    var H = encodeURIComponent(B);
                    H === B && (H = escape(B)), v = v.split(B).join(H)
                }
            }
        var V = v.indexOf("#"); - 1 !== V && (this.hash = v.substr(V), v = v.slice(0, V));
        var j = v.indexOf("?");
        if (-1 !== j ? (this.search = v.substr(j), this.query = v.substr(j + 1), t && (this.query = g.parse(this.query)), v = v.slice(0, j)) : t && (this.search = "", this.query = {}), v && (this.pathname = v), m[I] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
            F = this.pathname || "";
            var W = this.search || "";
            this.path = F + W
        }
        return this.href = this.format(), this
    }, a.prototype.format = function() {
        var e = this.auth || "";
        e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"), e += "@");
        var t = this.protocol || "",
            n = this.pathname || "",
            r = this.hash || "",
            a = !1,
            o = "";
        this.host ? a = e + this.host : this.hostname && (a = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (a += ":" + this.port)), this.query && i.isObject(this.query) && Object.keys(this.query).length && (o = g.stringify(this.query));
        var s = this.search || o && "?" + o || "";
        return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || m[t]) && !1 !== a ? (a = "//" + (a || ""), n && "/" !== n.charAt(0) && (n = "/" + n)) : a || (a = ""), r && "#" !== r.charAt(0) && (r = "#" + r), s && "?" !== s.charAt(0) && (s = "?" + s), t + a + (n = n.replace(/[?#]/g, function(e) {
            return encodeURIComponent(e)
        })) + (s = s.replace("#", "%23")) + r
    }, a.prototype.resolve = function(e) {
        return this.resolveObject(v(e, !1, !0)).format()
    }, a.prototype.resolveObject = function(e) {
        if (i.isString(e)) {
            var t = new a;
            t.parse(e, !1, !0), e = t
        }
        for (var n = new a, r = Object.keys(this), o = 0; o < r.length; o++) {
            var s = r[o];
            n[s] = this[s]
        }
        if (n.hash = e.hash, "" === e.href) return n.href = n.format(), n;
        if (e.slashes && !e.protocol) {
            for (var u = Object.keys(e), l = 0; l < u.length; l++) {
                var c = u[l];
                "protocol" !== c && (n[c] = e[c])
            }
            return m[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"), n.href = n.format(), n
        }
        if (e.protocol && e.protocol !== n.protocol) {
            if (!m[e.protocol]) {
                for (var d = Object.keys(e), f = 0; f < d.length; f++) {
                    var p = d[f];
                    n[p] = e[p]
                }
                return n.href = n.format(), n
            }
            if (n.protocol = e.protocol, e.host || E[e.protocol]) n.pathname = e.pathname;
            else {
                for (var _ = (e.pathname || "").split("/"); _.length && !(e.host = _.shift()););
                e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== _[0] && _.unshift(""), _.length < 2 && _.unshift(""), n.pathname = _.join("/")
            }
            if (n.search = e.search, n.query = e.query, n.host = e.host || "", n.auth = e.auth, n.hostname = e.hostname || e.host, n.port = e.port, n.pathname || n.search) {
                var h = n.pathname || "",
                    g = n.search || "";
                n.path = h + g
            }
            return n.slashes = n.slashes || e.slashes, n.href = n.format(), n
        }
        var v = n.pathname && "/" === n.pathname.charAt(0),
            T = e.host || e.pathname && "/" === e.pathname.charAt(0),
            y = T || v || n.host && e.pathname,
            I = y,
            S = n.pathname && n.pathname.split("/") || [],
            A = (_ = e.pathname && e.pathname.split("/") || [], n.protocol && !m[n.protocol]);
        if (A && (n.hostname = "", n.port = null, n.host && ("" === S[0] ? S[0] = n.host : S.unshift(n.host)), n.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === _[0] ? _[0] = e.host : _.unshift(e.host)), e.host = null), y = y && ("" === _[0] || "" === S[0])), T) n.host = e.host || "" === e.host ? e.host : n.host, n.hostname = e.hostname || "" === e.hostname ? e.hostname : n.hostname, n.search = e.search, n.query = e.query, S = _;
        else if (_.length) S || (S = []), S.pop(), S = S.concat(_), n.search = e.search, n.query = e.query;
        else if (!i.isNullOrUndefined(e.search)) {
            if (A) n.hostname = n.host = S.shift(), (R = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@")) && (n.auth = R.shift(), n.host = n.hostname = R.shift());
            return n.search = e.search, n.query = e.query, i.isNull(n.pathname) && i.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), n.href = n.format(), n
        }
        if (!S.length) return n.pathname = null, n.search ? n.path = "/" + n.search : n.path = null, n.href = n.format(), n;
        for (var O = S.slice(-1)[0], b = (n.host || e.host || S.length > 1) && ("." === O || ".." === O) || "" === O, N = 0, C = S.length; C >= 0; C--) "." === (O = S[C]) ? S.splice(C, 1) : ".." === O ? (S.splice(C, 1), N++) : N && (S.splice(C, 1), N--);
        if (!y && !I)
            for (; N--; N) S.unshift("..");
        !y || "" === S[0] || S[0] && "/" === S[0].charAt(0) || S.unshift(""), b && "/" !== S.join("/").substr(-1) && S.push("");
        var R, L = "" === S[0] || S[0] && "/" === S[0].charAt(0);
        A && (n.hostname = n.host = L ? "" : S.length ? S.shift() : "", (R = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@")) && (n.auth = R.shift(), n.host = n.hostname = R.shift()));
        return (y = y || n.host && S.length) && !L && S.unshift(""), S.length ? n.pathname = S.join("/") : (n.pathname = null, n.path = null), i.isNull(n.pathname) && i.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), n.auth = e.auth || n.auth, n.slashes = n.slashes || e.slashes, n.href = n.format(), n
    }, a.prototype.parseHost = function() {
        var e = this.host,
            t = s.exec(e);
        t && (":" !== (t = t[0]) && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e)
    }
},
function(e, t, n) {
    (function(t) {
        var n, r, i, a, o, s, u, l, c, d, f, p, _, h, E, m, g, v, T, y, I, S, A, O, b, N, C, R, L, D, P, M, w, U, k, x, G, F, Y, B, H, V, j, W, K, z, q, X, J, Q, $, Z, ee;
        c = /\r\n?/g, d = /\t/g, f = /\f/g, p = function(e) {
            return e.replace(c, "\n").replace(f, "").replace(d, "    ")
        }, _ = function(e, t) {
            var n = e || {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
            return n
        }, h = function(e, t) {
            var n = Object.keys(e).filter(function(t) {
                var n = e[t];
                if (null == n || null == n.match) return !1;
                var r = n.order;
                return "number" == typeof r && isFinite(r) || "undefined" == typeof console || console.warn("simple-markdown: Invalid order for rule `" + t + "`: " + String(r)), !0
            });
            n.sort(function(t, n) {
                var r = e[t],
                    i = e[n],
                    a = r.order,
                    o = i.order;
                if (a !== o) return a - o;
                var s = r.quality ? 0 : 1,
                    u = i.quality ? 0 : 1;
                return s !== u ? s - u : t < n ? -1 : t > n ? 1 : 0
            });
            var r, i = "",
                a = function(t, o) {
                    var s = [];
                    r = o = o || r;
                    for (var u = ""; t;) {
                        var l = null,
                            c = null,
                            d = null,
                            f = NaN,
                            p = 0,
                            _ = n[0],
                            h = e[_];
                        do {
                            var E = h.order,
                                m = h.match(t, o, u, i);
                            if (m) {
                                var g = h.quality ? h.quality(m, o, u) : 0;
                                g <= f || (l = _, c = h, d = m, f = g)
                            }
                            _ = n[++p], h = e[_]
                        } while (h && (!d || h.order === E && h.quality));
                        if (!0 !== o.disableErrorGuards) {
                            if (null == c || null == d) throw new Error("Could not find a matching rule for the below content. The rule with highest `order` should always match content provided to it. Check the definition of `match` for '" + n[n.length - 1] + "'. It seems to not match the following source:\n" + t);
                            if (0 !== d.index && t.slice(0, d[0].length) !== d[0]) throw new Error("`match` must return a capture starting at index 0 (the current parse index). Did you forget a ^ at the start of the RegExp?")
                        }
                        i = d[0];
                        var v = c.parse(d, a, o);
                        Array.isArray(v) ? Array.prototype.push.apply(s, v) : (null == v.type && (v.type = l), s.push(v)), u = d[0], t = t.substring(u.length)
                    }
                    return s
                };
            return function(e, n) {
                return (r = _(n, t)).inline || r.disableAutoBlockNewlines || (e += "\n\n"), i = "", a(p(e), r)
            }
        }, E = function(e) {
            var t = function(t, n) {
                return n.inline ? e.exec(t) : null
            };
            return t.regex = e, t
        }, m = function(e) {
            var t = function(t, n) {
                return n.inline ? null : e.exec(t)
            };
            return t.regex = e, t
        }, g = function(e) {
            var t = function(t, n) {
                return e.exec(t)
            };
            return t.regex = e, t
        }, v = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, T = function(e, t, n) {
            return {
                $$typeof: v,
                type: e,
                key: t,
                ref: null,
                props: n,
                _owner: null
            }
        }, y = function(e, t, n, r) {
            n = n || {}, r = void 0 === r || r;
            var i = "";
            for (var a in n) {
                var o = n[a];
                Object.prototype.hasOwnProperty.call(n, a) && o && (i += " " + b(a) + '="' + b(o) + '"')
            }
            var s = "<" + e + i + ">";
            return r ? s + t + "</" + e + ">" : s
        }, I = {}, S = function(e) {
            if (null == e) return null;
            try {
                var t = decodeURIComponent(e).replace(/[^A-Za-z0-9\/:]/g, "").toLowerCase();
                if (0 === t.indexOf("javascript:") || 0 === t.indexOf("vbscript:") || 0 === t.indexOf("data:")) return null
            } catch (e) {
                return null
            }
            return e
        }, A = /[<>&"']/g, O = {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;",
            "`": "&#96;"
        }, b = function(e) {
            return String(e).replace(A, function(e) {
                return O[e]
            })
        }, N = /\\([^0-9A-Za-z\s])/g, C = function(e) {
            return e.replace(N, "$1")
        }, R = function(e, t, n) {
            var r = n.inline || !1;
            n.inline = !0;
            var i = e(t, n);
            return n.inline = r, i
        }, L = function(e, t, n) {
            return {
                content: R(t, e[1], n)
            }
        }, D = function() {
            return {}
        }, P = new RegExp("^( *)((?:[*+-]|\\d+\\.)) +"), M = new RegExp("( *)((?:[*+-]|\\d+\\.)) +[^\\n]*(?:\\n(?!\\1(?:[*+-]|\\d+\\.) )[^\\n]*)*(\n|$)", "gm"), U = /^ ( *` *) $|^ ( *`)|(` *) $/g, k = w = /\n{2,}$/, x = / *\n+$/, G = new RegExp("^( *)((?:[*+-]|\\d+\\.)) [\\s\\S]+?(?:\n{2,}(?! )(?!\\1(?:[*+-]|\\d+\\.) )\\n*|\\s*\n*$)"), F = /(?:^|\n)( *)$/, n = /^ *\| *| *\| *$/g, r = / *$/, i = /^ *-+: *$/, a = /^ *:-+: *$/, o = /^ *:-+ *$/, s = function(e) {
            return i.test(e) ? "right" : a.test(e) ? "center" : o.test(e) ? "left" : null
        }, u = function(e, t, n, i) {
            var a = n.inTable;
            n.inTable = !0;
            var o = t(e.trim(), n);
            n.inTable = a;
            var s = [
                []
            ];
            return o.forEach(function(e, t) {
                "tableSeparator" === e.type ? (!i || 0 !== t && t !== o.length - 1) && s.push([]) : ("text" !== e.type || null != o[t + 1] && "tableSeparator" !== o[t + 1].type || (e.content = e.content.replace(r, "")), s[s.length - 1].push(e))
            }), s
        }, Y = {
            parseTable: (l = function(e) {
                return function(t, r, i) {
                    i.inline = !0;
                    var a = u(t[1], r, i, e),
                        o = function(e, t, r, i) {
                            return i && (e = e.replace(n, "")), e.trim().split("|").map(s)
                        }(t[2], 0, 0, e),
                        l = function(e, t, n, r) {
                            return e.trim().split("\n").map(function(e) {
                                return u(e, t, n, r)
                            })
                        }(t[3], r, i, e);
                    return i.inline = !1, {
                        type: "table",
                        header: a,
                        align: o,
                        cells: l
                    }
                }
            })(!0),
            parseNpTable: l(!1),
            TABLE_REGEX: /^ *(\|.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/,
            NPTABLE_REGEX: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/
        }, B = "(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*", H = "\\s*<?((?:[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['\"]([\\s\\S]*?)['\"])?\\s*", V = /mailto:/i, j = function(e, t, n) {
            var r = (e[2] || e[1]).replace(/\s+/g, " ").toLowerCase();
            if (t._defs && t._defs[r]) {
                var i = t._defs[r];
                n.target = i.target, n.title = i.title
            }
            return t._refs = t._refs || {}, t._refs[r] = t._refs[r] || [], t._refs[r].push(n), n
        }, W = 0, K = {
            Array: {
                react: function(e, t, n) {
                    for (var r = n.key, i = [], a = 0, o = 0; a < e.length; a++, o++) {
                        n.key = "" + a;
                        var s = e[a];
                        if ("text" === s.type)
                            for (s = {
                                    type: "text",
                                    content: s.content
                                }; a + 1 < e.length && "text" === e[a + 1].type; a++) s.content += e[a + 1].content;
                        i.push(t(s, n))
                    }
                    return n.key = r, i
                },
                html: function(e, t, n) {
                    for (var r = "", i = 0; i < e.length; i++) {
                        var a = e[i];
                        if ("text" === a.type)
                            for (a = {
                                    type: "text",
                                    content: a.content
                                }; i + 1 < e.length && "text" === e[i + 1].type; i++) a.content += e[i + 1].content;
                        r += t(a, n)
                    }
                    return r
                }
            },
            heading: {
                order: W++,
                match: m(/^ *(#{1,6})([^\n]+?)#* *(?:\n *)+\n/),
                parse: function(e, t, n) {
                    return {
                        level: e[1].length,
                        content: R(t, e[2].trim(), n)
                    }
                },
                react: function(e, t, n) {
                    return T("h" + e.level, n.key, {
                        children: t(e.content, n)
                    })
                },
                html: function(e, t, n) {
                    return y("h" + e.level, t(e.content, n))
                }
            },
            nptable: {
                order: W++,
                match: m(Y.NPTABLE_REGEX),
                parse: Y.parseNpTable,
                react: null,
                html: null
            },
            lheading: {
                order: W++,
                match: m(/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/),
                parse: function(e, t, n) {
                    return {
                        type: "heading",
                        level: "=" === e[2] ? 1 : 2,
                        content: R(t, e[1], n)
                    }
                },
                react: null,
                html: null
            },
            hr: {
                order: W++,
                match: m(/^( *[-*_]){3,} *(?:\n *)+\n/),
                parse: D,
                react: function(e, t, n) {
                    return T("hr", n.key, I)
                },
                html: function(e, t, n) {
                    return "<hr>"
                }
            },
            codeBlock: {
                order: W++,
                match: m(/^(?:    [^\n]+\n*)+(?:\n *)+\n/),
                parse: function(e, t, n) {
                    return {
                        lang: void 0,
                        content: e[0].replace(/^    /gm, "").replace(/\n+$/, "")
                    }
                },
                react: function(e, t, n) {
                    var r = e.lang ? "markdown-code-" + e.lang : void 0;
                    return T("pre", n.key, {
                        children: T("code", null, {
                            className: r,
                            children: e.content
                        })
                    })
                },
                html: function(e, t, n) {
                    var r = e.lang ? "markdown-code-" + e.lang : void 0,
                        i = y("code", b(e.content), {
                            class: r
                        });
                    return y("pre", i)
                }
            },
            fence: {
                order: W++,
                match: m(/^ *(`{3,}|~{3,}) *(?:(\S+) *)?\n([\s\S]+?)\n?\1 *(?:\n *)+\n/),
                parse: function(e, t, n) {
                    return {
                        type: "codeBlock",
                        lang: e[2] || void 0,
                        content: e[3]
                    }
                },
                react: null,
                html: null
            },
            blockQuote: {
                order: W++,
                match: m(/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/),
                parse: function(e, t, n) {
                    return {
                        content: t(e[0].replace(/^ *> ?/gm, ""), n)
                    }
                },
                react: function(e, t, n) {
                    return T("blockquote", n.key, {
                        children: t(e.content, n)
                    })
                },
                html: function(e, t, n) {
                    return y("blockquote", t(e.content, n))
                }
            },
            list: {
                order: W++,
                match: function(e, t, n) {
                    var r = F.exec(n),
                        i = t._list || !t.inline;
                    return r && i ? (e = r[1] + e, G.exec(e), G.exec(e)) : null
                },
                parse: function(e, t, n) {
                    var r = e[2],
                        i = r.length > 1,
                        a = i ? +r : void 0,
                        o = e[0].replace(k, "\n").match(M),
                        s = !1;
                    return {
                        ordered: i,
                        start: a,
                        items: o.map(function(e, r) {
                            var i = P.exec(e),
                                a = i ? i[0].length : 0,
                                u = new RegExp("^ {1," + a + "}", "gm"),
                                l = e.replace(u, "").replace(P, ""),
                                c = r === o.length - 1,
                                d = -1 !== l.indexOf("\n\n") || c && s;
                            s = d;
                            var f, p = n.inline,
                                _ = n._list;
                            n._list = !0, d ? (n.inline = !1, f = l.replace(x, "\n\n")) : (n.inline = !0, f = l.replace(x, ""));
                            var h = t(f, n);
                            return n.inline = p, n._list = _, h
                        })
                    }
                },
                react: function(e, t, n) {
                    var r = e.ordered ? "ol" : "ul";
                    return T(r, n.key, {
                        start: e.start,
                        children: e.items.map(function(e, r) {
                            return T("li", "" + r, {
                                children: t(e, n)
                            })
                        })
                    })
                },
                html: function(e, t, n) {
                    var r = e.items.map(function(e) {
                            return y("li", t(e, n))
                        }).join(""),
                        i = e.ordered ? "ol" : "ul",
                        a = {
                            start: e.start
                        };
                    return y(i, r, a)
                }
            },
            def: {
                order: W++,
                match: m(/^ *\[([^\]]+)\]: *<?([^\s>]*)>?(?: +["(]([^\n]+)[")])? *\n(?: *\n)*/),
                parse: function(e, t, n) {
                    var r = e[1].replace(/\s+/g, " ").toLowerCase(),
                        i = e[2],
                        a = e[3];
                    return n._refs && n._refs[r] && n._refs[r].forEach(function(e) {
                        e.target = i, e.title = a
                    }), n._defs = n._defs || {}, n._defs[r] = {
                        target: i,
                        title: a
                    }, {
                        def: r,
                        target: i,
                        title: a
                    }
                },
                react: function() {
                    return null
                },
                html: function() {
                    return ""
                }
            },
            table: {
                order: W++,
                match: m(Y.TABLE_REGEX),
                parse: Y.parseTable,
                react: function(e, t, n) {
                    var r = function(t) {
                            return null == e.align[t] ? {} : {
                                textAlign: e.align[t]
                            }
                        },
                        i = e.header.map(function(e, i) {
                            return T("th", "" + i, {
                                style: r(i),
                                scope: "col",
                                children: t(e, n)
                            })
                        }),
                        a = e.cells.map(function(e, i) {
                            return T("tr", "" + i, {
                                children: e.map(function(e, i) {
                                    return T("td", "" + i, {
                                        style: r(i),
                                        children: t(e, n)
                                    })
                                })
                            })
                        });
                    return T("table", n.key, {
                        children: [T("thead", "thead", {
                            children: T("tr", null, {
                                children: i
                            })
                        }), T("tbody", "tbody", {
                            children: a
                        })]
                    })
                },
                html: function(e, t, n) {
                    var r = function(t) {
                            return null == e.align[t] ? "" : "text-align:" + e.align[t] + ";"
                        },
                        i = e.header.map(function(e, i) {
                            return y("th", t(e, n), {
                                style: r(i),
                                scope: "col"
                            })
                        }).join(""),
                        a = e.cells.map(function(e) {
                            var i = e.map(function(e, i) {
                                return y("td", t(e, n), {
                                    style: r(i)
                                })
                            }).join("");
                            return y("tr", i)
                        }).join(""),
                        o = y("thead", y("tr", i)),
                        s = y("tbody", a);
                    return y("table", o + s)
                }
            },
            newline: {
                order: W++,
                match: m(/^(?:\n *)*\n/),
                parse: D,
                react: function(e, t, n) {
                    return "\n"
                },
                html: function(e, t, n) {
                    return "\n"
                }
            },
            paragraph: {
                order: W++,
                match: m(/^((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),
                parse: L,
                react: function(e, t, n) {
                    return T("div", n.key, {
                        className: "paragraph",
                        children: t(e.content, n)
                    })
                },
                html: function(e, t, n) {
                    return y("div", t(e.content, n), {
                        class: "paragraph"
                    })
                }
            },
            escape: {
                order: W++,
                match: E(/^\\([^0-9A-Za-z\s])/),
                parse: function(e, t, n) {
                    return {
                        type: "text",
                        content: e[1]
                    }
                },
                react: null,
                html: null
            },
            tableSeparator: {
                order: W++,
                match: function(e, t) {
                    return t.inTable ? /^ *\| */.exec(e) : null
                },
                parse: function() {
                    return {
                        type: "tableSeparator"
                    }
                },
                react: function() {
                    return " | "
                },
                html: function() {
                    return " &vert; "
                }
            },
            autolink: {
                order: W++,
                match: E(/^<([^ >]+:\/[^ >]+)>/),
                parse: function(e, t, n) {
                    return {
                        type: "link",
                        content: [{
                            type: "text",
                            content: e[1]
                        }],
                        target: e[1]
                    }
                },
                react: null,
                html: null
            },
            mailto: {
                order: W++,
                match: E(/^<([^ >]+@[^ >]+)>/),
                parse: function(e, t, n) {
                    var r = e[1],
                        i = e[1];
                    return V.test(i) || (i = "mailto:" + i), {
                        type: "link",
                        content: [{
                            type: "text",
                            content: r
                        }],
                        target: i
                    }
                },
                react: null,
                html: null
            },
            url: {
                order: W++,
                match: E(/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/),
                parse: function(e, t, n) {
                    return {
                        type: "link",
                        content: [{
                            type: "text",
                            content: e[1]
                        }],
                        target: e[1],
                        title: void 0
                    }
                },
                react: null,
                html: null
            },
            link: {
                order: W++,
                match: E(new RegExp("^\\[(" + B + ")\\]\\(" + H + "\\)")),
                parse: function(e, t, n) {
                    return {
                        content: t(e[1], n),
                        target: C(e[2]),
                        title: e[3]
                    }
                },
                react: function(e, t, n) {
                    return T("a", n.key, {
                        href: S(e.target),
                        title: e.title,
                        children: t(e.content, n)
                    })
                },
                html: function(e, t, n) {
                    var r = {
                        href: S(e.target),
                        title: e.title
                    };
                    return y("a", t(e.content, n), r)
                }
            },
            image: {
                order: W++,
                match: E(new RegExp("^!\\[(" + B + ")\\]\\(" + H + "\\)")),
                parse: function(e, t, n) {
                    return {
                        alt: e[1],
                        target: C(e[2]),
                        title: e[3]
                    }
                },
                react: function(e, t, n) {
                    return T("img", n.key, {
                        src: S(e.target),
                        alt: e.alt,
                        title: e.title
                    })
                },
                html: function(e, t, n) {
                    var r = {
                        src: S(e.target),
                        alt: e.alt,
                        title: e.title
                    };
                    return y("img", "", r, !1)
                }
            },
            reflink: {
                order: W++,
                match: E(new RegExp("^\\[(" + B + ")\\]\\s*\\[([^\\]]*)\\]")),
                parse: function(e, t, n) {
                    return j(e, n, {
                        type: "link",
                        content: t(e[1], n)
                    })
                },
                react: null,
                html: null
            },
            refimage: {
                order: W++,
                match: E(new RegExp("^!\\[(" + B + ")\\]\\s*\\[([^\\]]*)\\]")),
                parse: function(e, t, n) {
                    return j(e, n, {
                        type: "image",
                        alt: e[1]
                    })
                },
                react: null,
                html: null
            },
            em: {
                order: W,
                match: E(new RegExp("^\\b_((?:__|\\\\[\\s\\S]|[^\\\\_])+?)_\\b|^\\*(?=\\S)((?:\\*\\*|\\\\[\\s\\S]|\\s+(?:\\\\[\\s\\S]|[^\\s\\*\\\\]|\\*\\*)|[^\\s\\*\\\\])+?)\\*(?!\\*)")),
                quality: function(e) {
                    return e[0].length + .2
                },
                parse: function(e, t, n) {
                    return {
                        content: t(e[2] || e[1], n)
                    }
                },
                react: function(e, t, n) {
                    return T("em", n.key, {
                        children: t(e.content, n)
                    })
                },
                html: function(e, t, n) {
                    return y("em", t(e.content, n))
                }
            },
            strong: {
                order: W,
                match: E(/^\*\*((?:\\[\s\S]|[^\\])+?)\*\*(?!\*)/),
                quality: function(e) {
                    return e[0].length + .1
                },
                parse: L,
                react: function(e, t, n) {
                    return T("strong", n.key, {
                        children: t(e.content, n)
                    })
                },
                html: function(e, t, n) {
                    return y("strong", t(e.content, n))
                }
            },
            u: {
                order: W++,
                match: E(/^__((?:\\[\s\S]|[^\\])+?)__(?!_)/),
                quality: function(e) {
                    return e[0].length
                },
                parse: L,
                react: function(e, t, n) {
                    return T("u", n.key, {
                        children: t(e.content, n)
                    })
                },
                html: function(e, t, n) {
                    return y("u", t(e.content, n))
                }
            },
            del: {
                order: W++,
                match: E(/^~~(?=\S)((?:\\[\s\S]|~(?!~)|[^\s~]|\s(?!~~))+?)~~/),
                parse: L,
                react: function(e, t, n) {
                    return T("del", n.key, {
                        children: t(e.content, n)
                    })
                },
                html: function(e, t, n) {
                    return y("del", t(e.content, n))
                }
            },
            inlineCode: {
                order: W++,
                match: E(/^(`+)([\s\S]*?[^`])\1(?!`)/),
                parse: function(e, t, n) {
                    return {
                        content: e[2].replace(U, "$1")
                    }
                },
                react: function(e, t, n) {
                    return T("code", n.key, {
                        children: e.content
                    })
                },
                html: function(e, t, n) {
                    return y("code", b(e.content))
                }
            },
            br: {
                order: W++,
                match: g(/^ {2,}\n/),
                parse: D,
                react: function(e, t, n) {
                    return T("br", n.key, I)
                },
                html: function(e, t, n) {
                    return "<br>"
                }
            },
            text: {
                order: W++,
                match: g(/^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n\n| {2,}\n|\w+:\S|$)/),
                parse: function(e, t, n) {
                    return {
                        content: e[0]
                    }
                },
                react: function(e, t, n) {
                    return e.content
                },
                html: function(e, t, n) {
                    return b(e.content)
                }
            }
        }, z = function(e, t, n) {
            if (!t) throw new Error("simple-markdown: outputFor: `property` must be defined. if you just upgraded, you probably need to replace `outputFor` with `reactFor`");
            var r, i = e.Array || K.Array,
                a = function(n, o) {
                    return r = o = o || r, Array.isArray(n) ? i[t](n, a, o) : e[n.type][t](n, a, o)
                };
            return function(e, t) {
                return r = _(t, n), a(e, r)
            }
        }, q = h(K), X = function(e, t) {
            return (t = t || {}).inline = !1, q(e, t)
        }, J = function(e, t) {
            var n = w.test(e);
            return (t = t || {}).inline = !n, q(e, t)
        }, Q = z(K, "react"), $ = z(K, "html"), ee = {
            defaultRules: K,
            parserFor: h,
            outputFor: z,
            inlineRegex: E,
            blockRegex: m,
            anyScopeRegex: g,
            parseInline: R,
            parseBlock: function(e, t, n) {
                var r = n.inline || !1;
                n.inline = !1;
                var i = e(t + "\n\n", n);
                return n.inline = r, i
            },
            markdownToReact: Z = function(e, t) {
                return Q(X(e, t), t)
            },
            markdownToHtml: function(e, t) {
                return $(X(e, t), t)
            },
            ReactMarkdown: function(e) {
                var t = {};
                for (var n in e) "source" !== n && Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.children = Z(e.source), T("div", null, t)
            },
            defaultBlockParse: X,
            defaultInlineParse: function(e, t) {
                return (t = t || {}).inline = !0, q(e, t)
            },
            defaultImplicitParse: J,
            defaultReactOutput: Q,
            defaultHtmlOutput: $,
            preprocess: p,
            sanitizeText: b,
            sanitizeUrl: S,
            unescapeUrl: C,
            htmlTag: y,
            reactElement: T,
            defaultRawParse: q,
            ruleOutput: function(e, t) {
                return t || "undefined" == typeof console || console.warn("simple-markdown ruleOutput should take 'react' or 'html' as the second argument."),
                    function(n, r, i) {
                        return e[n.type][t](n, r, i)
                    }
            },
            reactFor: function(e) {
                var t = function(n, r) {
                    if (r = r || {}, Array.isArray(n)) {
                        for (var i = r.key, a = [], o = null, s = 0; s < n.length; s++) {
                            r.key = "" + s;
                            var u = t(n[s], r);
                            "string" == typeof u && "string" == typeof o ? (o += u, a[a.length - 1] = o) : (a.push(u), o = u)
                        }
                        return r.key = i, a
                    }
                    return e(n, t, r)
                };
                return t
            },
            htmlFor: function(e) {
                var t = function(n, r) {
                    return r = r || {}, Array.isArray(n) ? n.map(function(e) {
                        return t(e, r)
                    }).join("") : e(n, t, r)
                };
                return t
            },
            defaultParse: function() {
                return "undefined" != typeof console && console.warn("defaultParse is deprecated, please use `defaultImplicitParse`"), J.apply(null, arguments)
            },
            defaultOutput: function() {
                return "undefined" != typeof console && console.warn("defaultOutput is deprecated, please use `defaultReactOutput`"), Q.apply(null, arguments)
            }
        }, e.exports ? e.exports = ee : void 0 !== t ? t.SimpleMarkdown = ee : window.SimpleMarkdown = ee
    }).call(this, n(25))
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = f(n(3)),
        i = f(n(26)),
        a = f(n(2)),
        o = f(n(14)),
        s = f(n(444)),
        u = f(n(50)),
        l = f(n(10)),
        c = f(n(215)),
        d = n(1);

    function f(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function p(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    var _ = "UserFeedSettingsStore",
        h = 10,
        E = 12096e5,
        m = 14400,
        g = 5,
        v = !1,
        T = null,
        y = 0,
        I = !1,
        S = !1,
        A = new Set,
        O = new Set,
        b = new Set,
        N = null,
        C = new Set,
        R = new Set,
        L = new Set,
        D = new Set;

    function P() {
        L = new Set;
        var e = function(e) {
            var t = e,
                n = Array.isArray(t),
                r = 0;
            for (t = n ? t : t[Symbol.iterator]();;) {
                var i;
                if (n) {
                    if (r >= t.length) break;
                    i = t[r++]
                } else {
                    if ((r = t.next()).done) break;
                    i = r.value
                }
                var a = i;
                b.has(a) || u.default.isBlocked(a) || L.add(a)
            }
        };
        e(o.default.getDMUserIds().filter(u.default.isFriend)), e(O), e(A)
    }

    function M(e) {
        null == e || R.has(e) || D.add(e)
    }

    function w() {
        D = new Set;
        var e = C,
            t = Array.isArray(e),
            n = 0;
        for (e = t ? e : e[Symbol.iterator]();;) {
            var r;
            if (t) {
                if (n >= e.length) break;
                r = e[n++]
            } else {
                if ((n = e.next()).done) break;
                r = n.value
            }
            M(r)
        }
        if (s.default.hasConsented(d.Consents.PERSONALIZATION))
            for (var i in c.default.applicationStatistics) {
                var a = !1,
                    o = c.default.getLastPlayedDateTime(i);
                if (null != o) {
                    var u = Date.now();
                    a = Math.floor(u - o) <= E
                }
                var l = !1,
                    f = c.default.getGameDuration(i);
                f > 0 && (l = f >= m), (l || a) && M(i)
            }
        if (null != N) {
            var p = N,
                _ = Array.isArray(p),
                g = 0;
            for (p = _ ? p : p[Symbol.iterator]();;) {
                var v;
                if (_) {
                    if (g >= p.length) break;
                    v = p[g++]
                } else {
                    if ((g = p.next()).done) break;
                    v = g.value
                }
                var T = v;
                if (D.size >= h) break;
                M(T)
            }
        }
    }

    function U() {
        i.default.set(_, {
            firstSawFeedDate: T,
            numTimesSeenFeed: y,
            hasDismissedPersonalizationNotice: I,
            hasDismissedNoGamesNotice: S
        })
    }

    function k(e) {
        O = new Set(e.subscribed_users), b = new Set(e.unsubscribed_users), C = new Set(e.subscribed_games), R = new Set(e.unsubscribed_games), null != e.autosubscribed_users && (A = new Set(e.autosubscribed_users)), null != e.autosubscribed_games && (N = new Set(e.autosubscribed_games)), s.default.hasConsented(d.Consents.PERSONALIZATION) || (N = new Set), P(), w(), v = !0
    }
    var x = new(function(e) {
        var t, n;

        function r() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var a, d, f, h = r.prototype;
        return h.initialize = function() {
            this.syncWith([o.default, u.default], P), this.syncWith([c.default], w), this.waitFor(s.default, c.default, l.default);
            var e = i.default.get(_);
            null != e && (T = e.firstSawFeedDate || Date.now(), y = e.numTimesSeenFeed || 0, I = e.hasDismissedPersonalizationNotice || !1, S = e.hasDismissedNoGamesNotice || !1)
        }, h.isOnFeed = function(e) {
            return L.has(e)
        }, h.applicationIsOnFeed = function(e) {
            return D.has(e)
        }, h.isUnsubscribedToGame = function(e) {
            return R.has(e)
        }, a = r, (d = [{
            key: "hasLoadedSettings",
            get: function() {
                return v
            }
        }, {
            key: "isAutosubscribedGamesFetched",
            get: function() {
                return null != N
            }
        }, {
            key: "autosubscribedUserIds",
            get: function() {
                return A
            }
        }, {
            key: "subscribedUserIds",
            get: function() {
                return O
            }
        }, {
            key: "unsubscribedUserIds",
            get: function() {
                return b
            }
        }, {
            key: "feedUserIDs",
            get: function() {
                return L
            }
        }, {
            key: "gameIDsToShow",
            get: function() {
                return D
            }
        }, {
            key: "subscribedGameIds",
            get: function() {
                return C
            }
        }, {
            key: "unsubscribedGameIds",
            get: function() {
                return R
            }
        }, {
            key: "isExperiencedFeedUser",
            get: function() {
                return null != T && Date.now() - T > 864e5 && y >= g
            }
        }, {
            key: "hasDismissedPersonalizationNotice",
            get: function() {
                return I
            }
        }, {
            key: "hasDismissedNoGamesNotice",
            get: function() {
                return S
            }
        }]) && p(a.prototype, d), f && p(a, f), r
    }(r.default.Store))(a.default, {
        CONNECTION_OPEN: function(e) {
            var t = e.userFeedSettings;
            if (null == t) return !1;
            k(t)
        },
        USER_FEED_SETTINGS_UPDATE: function(e) {
            var t = e.subscribeUsers,
                n = e.unsubscribeUsers,
                r = e.subscribeGames,
                i = e.unsubscribeGames;
            null != t && t.forEach(function(e) {
                O.add(e), b.delete(e)
            }), null != n && n.forEach(function(e) {
                b.add(e), O.delete(e)
            }), null != r && r.forEach(function(e) {
                C.add(e), R.delete(e)
            }), null != i && i.forEach(function(e) {
                R.add(e), C.delete(e)
            }), null == t && null == n || P(), null == r && null == i || w()
        },
        ACTIVITY_FEED_MEMBER_MANAGEMENT_ADD: function(e) {
            e.userIds.forEach(function(e) {
                O.add(e), b.delete(e)
            }), P()
        },
        ACTIVITY_FEED_MEMBER_MANAGEMENT_REMOVE: function(e) {
            e.userIds.forEach(function(e) {
                b.add(e), O.delete(e)
            }), P()
        },
        USER_FEED_SETTINGS_FETCH_SUCCESS: function(e) {
            k(e.settings)
        },
        ACTIVITY_FEED_GAME_MANAGEMENT_ADD: function(e) {
            e.gameIds.forEach(function(e) {
                C.add(e), R.delete(e)
            }), w()
        },
        ACTIVITY_FEED_GAME_MANAGEMENT_REMOVE: function(e) {
            e.gameIds.forEach(function(e) {
                R.add(e), C.delete(e)
            }), w()
        },
        ACTIVITY_FEED_DISMISS_PERSONALIZATION_NOTICE: function(e) {
            return I = !0, void U()
        },
        ACTIVITY_FEED_DISMISS_NO_GAMES_NOTICE: function(e) {
            return S = !0, void U()
        },
        UPDATE_CONSENTS: function(e) {
            var t = e.consents[d.Consents.PERSONALIZATION];
            t && t.consented && (I = !1, U())
        },
        ACTIVITY_FEED_MOUNT: function(e) {
            return function() {
                if (null == T && (T = Date.now()), y++, U(), y > g) return !1
            }()
        },
        LOGOUT: function(e) {
            return v = !1, A = new Set, O = new Set, b = new Set, N = null, C = new Set, R = new Set, L = new Set, void(D = new Set)
        }
    });
    t.default = x
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = d(n(3)),
        i = d(n(26)),
        a = d(n(2)),
        o = n(90),
        s = d(n(21)),
        u = d(n(23)),
        l = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(100)),
        c = n(1);

    function d(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function f(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    var p = "ScannedLocalApplicationStore",
        _ = "RunningGameStore",
        h = {},
        E = !1,
        m = {};

    function g(e) {
        for (var t = e.split(":"), n = null, r = t.length - 1; r >= 0; r--) {
            var i = t.slice(r).join(":");
            if (null != (n = s.default.getGameByName(i))) break
        }
        return n
    }

    function v(e) {
        var t = {};
        Object.keys(e).forEach(function(n) {
            return t[n] = e[n].toJS()
        }), i.default.set(p, {
            localApplications: t
        })
    }
    var T = new(function(e) {
        var t, n;

        function r() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var a, s, l, c = r.prototype;
        return c.initialize = function() {
            var e = function() {
                var e = (i.default.get(p) || {
                    localApplications: {}
                }).localApplications;
                null == e && (e = {});
                for (var t = {}, n = 0, r = Object.keys(e); n < r.length; n++) {
                    var a = r[n];
                    null != e[a].distributorApplications && (e[a].thirdPartySkus = e[a].distributorApplications), null != e[a].thirdPartySkus && e[a].thirdPartySkus.forEach(function(e) {
                        null != e.sku && null == e.id && (e.id = e.sku)
                    }), t[a] = o.LocalApplicationRecord.createFromStorage(e[a])
                }
                return {
                    localApplications: t
                }
            }();
            h = e.localApplications, this.syncWith([u.default], function() {
                return !0
            })
        }, c.getLocalApplication = function(e) {
            return u.default.importGamesEnabled ? h[e] : null
        }, a = r, (s = [{
            key: "scanning",
            get: function() {
                return E
            }
        }, {
            key: "localApplications",
            get: function() {
                return u.default.importGamesEnabled ? h : {}
            }
        }]) && f(a.prototype, s), l && f(a, l), r
    }(r.default.Store))(a.default, {
        SCANNED_LOCAL_APPLICATION_SCAN_START: function(e) {
            E = !0
        },
        SCANNED_LOCAL_APPLICATION_SCAN_SUCCESS: function(e) {
            var t = e.applications;
            E = !1,
                function() {
                    var e = (i.default.get(_) || {
                        enableOverlay: {}
                    }).enableOverlay;
                    for (var t in m = {}, e) {
                        var n = g(t);
                        null != n && (m[n.id] = e[t])
                    }
                }();
            var n = new Set;
            t.forEach(function(e) {
                var t = s.default.getGame(e.applicationId);
                if (null != t) {
                    n.add(t.id);
                    var r = o.LocalApplicationRecord.fromScannedApplication(e),
                        i = h[e.applicationId];
                    if (null != i) {
                        if (i.getDistributor() === r.getDistributor()) return;
                        r = r.set("flags", i.flags)
                    }
                    var a = !t.overlay;
                    null != m[r.id] && (a = !m[r.id]), a && (r = r.set("flags", l.addFlag(r.flags, c.LibraryApplicationFlags.OVERLAY_DISABLED))), h[r.id] = r
                }
            });
            for (var r = 0, a = Object.keys(h); r < a.length; r++) {
                var u = a[r];
                n.has(u) || delete h[u]
            }! function() {
                var e = i.default.get(_) || {};
                if (null != e.enableOverlay) {
                    for (var t in e.enableOverlay) {
                        var n = g(t);
                        null != n && null != h[n.id] && delete e.enableOverlay[t]
                    }
                    i.default.set(_, e)
                }
            }(), v(h)
        },
        SCANNED_LOCAL_APPLICATION_SCAN_FAIL: function(e) {
            E = !1
        },
        SCANNED_LOCAL_APPLICATION_UPDATE_FLAGS: function(e) {
            var t = e.applicationId,
                n = e.flags,
                r = h[t];
            null != r && (h[t] = r.set("flags", n)), v(h)
        }
    });
    t.default = T
},
function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
        return n.call(e).slice(8, -1)
    }
},
function(e, t) {
    e.exports = function(e) {
        if (null == e) throw TypeError("Can't call method on  " + e);
        return e
    }
},
function(e, t, n) {
    "use strict";
    if (n(60)) {
        var r = n(165),
            i = n(29),
            a = n(30),
            o = n(8),
            s = n(292),
            u = n(388),
            l = n(110),
            c = n(198),
            d = n(163),
            f = n(92),
            p = n(199),
            _ = n(112),
            h = n(47),
            E = n(529),
            m = n(167),
            g = n(142),
            v = n(91),
            T = n(227),
            y = n(32),
            I = n(73),
            S = n(380),
            A = n(168),
            O = n(170),
            b = n(169).f,
            N = n(382),
            C = n(164),
            R = n(42),
            L = n(115),
            D = n(282),
            P = n(228),
            M = n(384),
            w = n(196),
            U = n(285),
            k = n(197),
            x = n(383),
            G = n(520),
            F = n(61),
            Y = n(113),
            B = F.f,
            H = Y.f,
            V = i.RangeError,
            j = i.TypeError,
            W = i.Uint8Array,
            K = Array.prototype,
            z = u.ArrayBuffer,
            q = u.DataView,
            X = L(0),
            J = L(2),
            Q = L(3),
            $ = L(4),
            Z = L(5),
            ee = L(6),
            te = D(!0),
            ne = D(!1),
            re = M.values,
            ie = M.keys,
            ae = M.entries,
            oe = K.lastIndexOf,
            se = K.reduce,
            ue = K.reduceRight,
            le = K.join,
            ce = K.sort,
            de = K.slice,
            fe = K.toString,
            pe = K.toLocaleString,
            _e = R("iterator"),
            he = R("toStringTag"),
            Ee = C("typed_constructor"),
            me = C("def_constructor"),
            ge = s.CONSTR,
            ve = s.TYPED,
            Te = s.VIEW,
            ye = L(1, function(e, t) {
                return be(P(e, e[me]), t)
            }),
            Ie = a(function() {
                return 1 === new W(new Uint16Array([1]).buffer)[0]
            }),
            Se = !!W && !!W.prototype.set && a(function() {
                new W(1).set({})
            }),
            Ae = function(e, t) {
                var n = _(e);
                if (n < 0 || n % t) throw V("Wrong offset!");
                return n
            },
            Oe = function(e) {
                if (y(e) && ve in e) return e;
                throw j(e + " is not a typed array!")
            },
            be = function(e, t) {
                if (!(y(e) && Ee in e)) throw j("It is not a typed array constructor!");
                return new e(t)
            },
            Ne = function(e, t) {
                return Ce(P(e, e[me]), t)
            },
            Ce = function(e, t) {
                for (var n = 0, r = t.length, i = be(e, r); r > n;) i[n] = t[n++];
                return i
            },
            Re = function(e, t, n) {
                B(e, t, {
                    get: function() {
                        return this._d[n]
                    }
                })
            },
            Le = function(e) {
                var t, n, r, i, a, o, s = I(e),
                    u = arguments.length,
                    c = u > 1 ? arguments[1] : void 0,
                    d = void 0 !== c,
                    f = N(s);
                if (null != f && !S(f)) {
                    for (o = f.call(s), r = [], t = 0; !(a = o.next()).done; t++) r.push(a.value);
                    s = r
                }
                for (d && u > 2 && (c = l(c, arguments[2], 2)), t = 0, n = h(s.length), i = be(this, n); n > t; t++) i[t] = d ? c(s[t], t) : s[t];
                return i
            },
            De = function() {
                for (var e = 0, t = arguments.length, n = be(this, t); t > e;) n[e] = arguments[e++];
                return n
            },
            Pe = !!W && a(function() {
                pe.call(new W(1))
            }),
            Me = function() {
                return pe.apply(Pe ? de.call(Oe(this)) : Oe(this), arguments)
            },
            we = {
                copyWithin: function(e, t) {
                    return G.call(Oe(this), e, t, arguments.length > 2 ? arguments[2] : void 0)
                },
                every: function(e) {
                    return $(Oe(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                fill: function(e) {
                    return x.apply(Oe(this), arguments)
                },
                filter: function(e) {
                    return Ne(this, J(Oe(this), e, arguments.length > 1 ? arguments[1] : void 0))
                },
                find: function(e) {
                    return Z(Oe(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                findIndex: function(e) {
                    return ee(Oe(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                forEach: function(e) {
                    X(Oe(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                indexOf: function(e) {
                    return ne(Oe(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                includes: function(e) {
                    return te(Oe(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                join: function(e) {
                    return le.apply(Oe(this), arguments)
                },
                lastIndexOf: function(e) {
                    return oe.apply(Oe(this), arguments)
                },
                map: function(e) {
                    return ye(Oe(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                reduce: function(e) {
                    return se.apply(Oe(this), arguments)
                },
                reduceRight: function(e) {
                    return ue.apply(Oe(this), arguments)
                },
                reverse: function() {
                    for (var e, t = Oe(this).length, n = Math.floor(t / 2), r = 0; r < n;) e = this[r], this[r++] = this[--t], this[t] = e;
                    return this
                },
                some: function(e) {
                    return Q(Oe(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                sort: function(e) {
                    return ce.call(Oe(this), e)
                },
                subarray: function(e, t) {
                    var n = Oe(this),
                        r = n.length,
                        i = m(e, r);
                    return new(P(n, n[me]))(n.buffer, n.byteOffset + i * n.BYTES_PER_ELEMENT, h((void 0 === t ? r : m(t, r)) - i))
                }
            },
            Ue = function(e, t) {
                return Ne(this, de.call(Oe(this), e, t))
            },
            ke = function(e) {
                Oe(this);
                var t = Ae(arguments[1], 1),
                    n = this.length,
                    r = I(e),
                    i = h(r.length),
                    a = 0;
                if (i + t > n) throw V("Wrong length!");
                for (; a < i;) this[t + a] = r[a++]
            },
            xe = {
                entries: function() {
                    return ae.call(Oe(this))
                },
                keys: function() {
                    return ie.call(Oe(this))
                },
                values: function() {
                    return re.call(Oe(this))
                }
            },
            Ge = function(e, t) {
                return y(e) && e[ve] && "symbol" != typeof t && t in e && String(+t) == String(t)
            },
            Fe = function(e, t) {
                return Ge(e, t = g(t, !0)) ? d(2, e[t]) : H(e, t)
            },
            Ye = function(e, t, n) {
                return !(Ge(e, t = g(t, !0)) && y(n) && v(n, "value")) || v(n, "get") || v(n, "set") || n.configurable || v(n, "writable") && !n.writable || v(n, "enumerable") && !n.enumerable ? B(e, t, n) : (e[t] = n.value, e)
            };
        ge || (Y.f = Fe, F.f = Ye), o(o.S + o.F * !ge, "Object", {
            getOwnPropertyDescriptor: Fe,
            defineProperty: Ye
        }), a(function() {
            fe.call({})
        }) && (fe = pe = function() {
            return le.call(this)
        });
        var Be = p({}, we);
        p(Be, xe), f(Be, _e, xe.values), p(Be, {
            slice: Ue,
            set: ke,
            constructor: function() {},
            toString: fe,
            toLocaleString: Me
        }), Re(Be, "buffer", "b"), Re(Be, "byteOffset", "o"), Re(Be, "byteLength", "l"), Re(Be, "length", "e"), B(Be, he, {
            get: function() {
                return this[ve]
            }
        }), e.exports = function(e, t, n, u) {
            var l = e + ((u = !!u) ? "Clamped" : "") + "Array",
                d = "get" + e,
                p = "set" + e,
                _ = i[l],
                m = _ || {},
                g = _ && O(_),
                v = !_ || !s.ABV,
                I = {},
                S = _ && _.prototype,
                N = function(e, n) {
                    B(e, n, {
                        get: function() {
                            return function(e, n) {
                                var r = e._d;
                                return r.v[d](n * t + r.o, Ie)
                            }(this, n)
                        },
                        set: function(e) {
                            return function(e, n, r) {
                                var i = e._d;
                                u && (r = (r = Math.round(r)) < 0 ? 0 : r > 255 ? 255 : 255 & r), i.v[p](n * t + i.o, r, Ie)
                            }(this, n, e)
                        },
                        enumerable: !0
                    })
                };
            v ? (_ = n(function(e, n, r, i) {
                c(e, _, l, "_d");
                var a, o, s, u, d = 0,
                    p = 0;
                if (y(n)) {
                    if (!(n instanceof z || "ArrayBuffer" == (u = T(n)) || "SharedArrayBuffer" == u)) return ve in n ? Ce(_, n) : Le.call(_, n);
                    a = n, p = Ae(r, t);
                    var m = n.byteLength;
                    if (void 0 === i) {
                        if (m % t) throw V("Wrong length!");
                        if ((o = m - p) < 0) throw V("Wrong length!")
                    } else if ((o = h(i) * t) + p > m) throw V("Wrong length!");
                    s = o / t
                } else s = E(n), a = new z(o = s * t);
                for (f(e, "_d", {
                        b: a,
                        o: p,
                        l: o,
                        e: s,
                        v: new q(a)
                    }); d < s;) N(e, d++)
            }), S = _.prototype = A(Be), f(S, "constructor", _)) : a(function() {
                _(1)
            }) && a(function() {
                new _(-1)
            }) && U(function(e) {
                new _, new _(null), new _(1.5), new _(e)
            }, !0) || (_ = n(function(e, n, r, i) {
                var a;
                return c(e, _, l), y(n) ? n instanceof z || "ArrayBuffer" == (a = T(n)) || "SharedArrayBuffer" == a ? void 0 !== i ? new m(n, Ae(r, t), i) : void 0 !== r ? new m(n, Ae(r, t)) : new m(n) : ve in n ? Ce(_, n) : Le.call(_, n) : new m(E(n))
            }), X(g !== Function.prototype ? b(m).concat(b(g)) : b(m), function(e) {
                e in _ || f(_, e, m[e])
            }), _.prototype = S, r || (S.constructor = _));
            var C = S[_e],
                R = !!C && ("values" == C.name || null == C.name),
                L = xe.values;
            f(_, Ee, !0), f(S, ve, l), f(S, Te, !0), f(S, me, _), (u ? new _(1)[he] == l : he in S) || B(S, he, {
                get: function() {
                    return l
                }
            }), I[l] = _, o(o.G + o.W + o.F * (_ != m), I), o(o.S, l, {
                BYTES_PER_ELEMENT: t
            }), o(o.S + o.F * a(function() {
                m.of.call(_, 1)
            }), l, {
                from: Le,
                of: De
            }), "BYTES_PER_ELEMENT" in S || f(S, "BYTES_PER_ELEMENT", t), o(o.P, l, we), k(l), o(o.P + o.F * Se, l, {
                set: ke
            }), o(o.P + o.F * !R, l, xe), r || S.toString == fe || (S.toString = fe), o(o.P + o.F * a(function() {
                new _(1).slice()
            }), l, {
                slice: Ue
            }), o(o.P + o.F * (a(function() {
                return [1, 2].toLocaleString() != new _([1, 2]).toLocaleString()
            }) || !a(function() {
                S.toLocaleString.call([1, 2])
            })), l, {
                toLocaleString: Me
            }), w[l] = R ? C : L, r || R || f(S, _e, L)
        }
    } else e.exports = function() {}
},
function(e, t, n) {
    "use strict";
    (function(e, r) {
        t.__esModule = !0, t.default = void 0;
        var i, a = (i = n(16)) && i.__esModule ? i : {
            default: i
        };
        var o, s = [],
            u = new Set,
            l = !1,
            c = null,
            d = !1,
            f = 0,
            p = function(e) {
                return e()
            },
            _ = new Promise(function(e) {
                o = function() {
                    e(), o = null
                }
            });
        var h = function() {
            function t(e, t) {
                var n = this;
                this._isInitialized = !1, this._changeCallbacks = new Set, null == t && (t = {}), this._dispatchToken = e.register(this.constructor.name, t, function(e) {
                    n.hasChangeCallbacks() && (u.add(n), l && null != n._mustEmitChanges && n._mustEmitChanges(e) && n.constructor.resumeEmittingChanges(!1))
                }), this._dispatcher = e, s.push(this)
            }
            t.initialize = function() {
                !0, s.forEach(function(e) {
                    return e.initializeIfNeeded()
                }), null != o && o()
            }, t.destroy = function() {
                s.length = 0, u.clear(), l = !1, c && clearTimeout(c), c = null, p = function(e) {
                    return e()
                }
            }, t.injectBatchEmitChanges = function(e) {
                p = e
            }, t.pauseEmittingChanges = function(e) {
                void 0 === e && (e = null), l = !0, null !== c && clearTimeout(c), null !== e && (c = setTimeout(function() {
                    c = null, t.resumeEmittingChanges()
                }, e))
            }, t.isPaused = function() {
                return l
            }, t.resumeEmittingChanges = function(e) {
                void 0 === e && (e = !0), null !== c && (clearTimeout(c), c = null), l && (l = !1, e && u.size && r(t.emitChanges))
            }, t.emitChanges = function() {
                u.size && !l && (f++, d = !0, p(function() {
                    return u.forEach(function(e) {
                        return e.emitChange()
                    })
                }), d = !1, u.clear())
            }, t.getChangeSentinel = function() {
                return f
            }, t.getAll = function() {
                return s
            };
            var n = t.prototype;
            return n.initializeIfNeeded = function() {
                this._isInitialized || (this.initialize(), this._isInitialized = !0)
            }, n.initialize = function() {}, n.syncWith = function(t, n, i) {
                var a = this;
                void 0 === i && (i = 0);
                var o = function(t, n) {
                    var i = null;
                    return 0 === t ? function() {
                        e(i), i = r(n)
                    } : function() {
                        null == i && (i = setTimeout(function() {
                            try {
                                n()
                            } finally {
                                i = null
                            }
                        }, t))
                    }
                }(i, function() {
                    !1 !== n() && p(function() {
                        return a.emitChange()
                    })
                });
                t.forEach(function(e) {
                    return e.addChangeListener(o)
                })
            }, n.waitFor = function() {
                for (var e = this, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                var i = n.map(function(t, n) {
                    return (0, a.default)(null != t, "Store.waitFor(...) called with null Store at index " + n + " for store " + e.constructor.name), (0, a.default)(t._dispatcher === e._dispatcher, "Stores belong to two separate dispatchers."), t.getDispatchToken()
                });
                this._dispatcher.addDependencies(this.getDispatchToken(), i)
            }, n.hasChangeCallbacks = function() {
                return this._changeCallbacks.size > 0
            }, n.emitChange = function() {
                d || f++, this._changeCallbacks.forEach(function(e) {
                    return e()
                })
            }, n.addChangeListener = function(e) {
                this._changeCallbacks.add(e)
            }, n.addConditionalChangeListener = function(e, t) {
                var n = this;
                if (void 0 === t && (t = !0), !t || !1 !== e()) {
                    this.addChangeListener(function t() {
                        !1 === e() && n.removeChangeListener(t)
                    })
                }
            }, n.removeChangeListener = function(e) {
                this._changeCallbacks.delete(e)
            }, n.getDispatchToken = function() {
                return this._dispatchToken
            }, n.mustEmitChanges = function(e) {
                void 0 === e && (e = function() {
                    return !0
                }), this._mustEmitChanges = e
            }, t
        }();
        t.default = h, h.initialized = _
    }).call(this, n(39).clearImmediate, n(39).setImmediate)
},
function(e, t, n) {
    "use strict";
    var r = function(e) {
        var t, n;

        function r() {
            var t;
            return (t = e.call(this) || this)._children = [], t
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var i = r.prototype;
        return i.__addChild = function(e) {
            0 === this._children.length && this.__attach(), this._children.push(e)
        }, i.__removeChild = function(e) {
            var t = this._children.indexOf(e); - 1 !== t ? (this._children.splice(t, 1), 0 === this._children.length && this.__detach()) : console.warn("Trying to remove a child that doesn't exist")
        }, i.__getChildren = function() {
            return this._children
        }, r
    }(n(85));
    e.exports = r
}, ,
function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(0),
        i = n.n(r),
        a = n(131),
        o = n.n(a),
        s = n(45),
        u = n.n(s),
        l = n(785),
        c = n.n(l),
        d = 1073741823;
    var f = i.a.createContext || function(e, t) {
            var n, i, a = "__create-react-context-" + c()() + "__",
                s = function(e) {
                    function n() {
                        var t, n, r;
                        return (t = e.apply(this, arguments) || this).emitter = (n = t.props.value, r = [], {
                            on: function(e) {
                                r.push(e)
                            },
                            off: function(e) {
                                r = r.filter(function(t) {
                                    return t !== e
                                })
                            },
                            get: function() {
                                return n
                            },
                            set: function(e, t) {
                                n = e, r.forEach(function(e) {
                                    return e(n, t)
                                })
                            }
                        }), t
                    }
                    o()(n, e);
                    var r = n.prototype;
                    return r.getChildContext = function() {
                        var e;
                        return (e = {})[a] = this.emitter, e
                    }, r.componentWillReceiveProps = function(e) {
                        if (this.props.value !== e.value) {
                            var n, r = this.props.value,
                                i = e.value;
                            ((a = r) === (o = i) ? 0 !== a || 1 / a == 1 / o : a != a && o != o) ? n = 0: (n = "function" == typeof t ? t(r, i) : d, 0 !== (n |= 0) && this.emitter.set(e.value, n))
                        }
                        var a, o
                    }, r.render = function() {
                        return this.props.children
                    }, n
                }(r.Component);
            s.childContextTypes = ((n = {})[a] = u.a.object.isRequired, n);
            var l = function(t) {
                function n() {
                    var e;
                    return (e = t.apply(this, arguments) || this).state = {
                        value: e.getValue()
                    }, e.onUpdate = function(t, n) {
                        0 != ((0 | e.observedBits) & n) && e.setState({
                            value: e.getValue()
                        })
                    }, e
                }
                o()(n, t);
                var r = n.prototype;
                return r.componentWillReceiveProps = function(e) {
                    var t = e.observedBits;
                    this.observedBits = null == t ? d : t
                }, r.componentDidMount = function() {
                    this.context[a] && this.context[a].on(this.onUpdate);
                    var e = this.props.observedBits;
                    this.observedBits = null == e ? d : e
                }, r.componentWillUnmount = function() {
                    this.context[a] && this.context[a].off(this.onUpdate)
                }, r.getValue = function() {
                    return this.context[a] ? this.context[a].get() : e
                }, r.render = function() {
                    return (e = this.props.children, Array.isArray(e) ? e[0] : e)(this.state.value);
                    var e
                }, n
            }(r.Component);
            return l.contextTypes = ((i = {})[a] = u.a.object, i), {
                Provider: s,
                Consumer: l
            }
        },
        p = n(103),
        _ = n(18),
        h = n(237),
        E = n(238),
        m = n(62);

    function g(e) {
        var t = e.pathname,
            n = e.search,
            r = e.hash,
            i = t || "/";
        return n && "?" !== n && (i += "?" === n.charAt(0) ? n : "?" + n), r && "#" !== r && (i += "#" === r.charAt(0) ? r : "#" + r), i
    }

    function v(e, t, n, r) {
        var i;
        "string" == typeof e ? (i = function(e) {
            var t = e || "/",
                n = "",
                r = "",
                i = t.indexOf("#"); - 1 !== i && (r = t.substr(i), t = t.substr(0, i));
            var a = t.indexOf("?");
            return -1 !== a && (n = t.substr(a), t = t.substr(0, a)), {
                pathname: t,
                search: "?" === n ? "" : n,
                hash: "#" === r ? "" : r
            }
        }(e)).state = t : (void 0 === (i = Object(_.a)({}, e)).pathname && (i.pathname = ""), i.search ? "?" !== i.search.charAt(0) && (i.search = "?" + i.search) : i.search = "", i.hash ? "#" !== i.hash.charAt(0) && (i.hash = "#" + i.hash) : i.hash = "", void 0 !== t && void 0 === i.state && (i.state = t));
        try {
            i.pathname = decodeURI(i.pathname)
        } catch (e) {
            throw e instanceof URIError ? new URIError('Pathname "' + i.pathname + '" could not be decoded. This is likely caused by an invalid percent-encoding.') : e
        }
        return n && (i.key = n), r ? i.pathname ? "/" !== i.pathname.charAt(0) && (i.pathname = Object(h.default)(i.pathname, r.pathname)) : i.pathname = r.pathname : i.pathname || (i.pathname = "/"), i
    }

    function T(e, t) {
        return e.pathname === t.pathname && e.search === t.search && e.hash === t.hash && e.key === t.key && Object(E.default)(e.state, t.state)
    }

    function y() {
        var e = null;
        var t = [];
        return {
            setPrompt: function(t) {
                return e = t,
                    function() {
                        e === t && (e = null)
                    }
            },
            confirmTransitionTo: function(t, n, r, i) {
                if (null != e) {
                    var a = "function" == typeof e ? e(t, n) : e;
                    "string" == typeof a ? "function" == typeof r ? r(a, i) : i(!0) : i(!1 !== a)
                } else i(!0)
            },
            appendListener: function(e) {
                var n = !0;

                function r() {
                    n && e.apply(void 0, arguments)
                }
                return t.push(r),
                    function() {
                        n = !1, t = t.filter(function(e) {
                            return e !== r
                        })
                    }
            },
            notifyListeners: function() {
                for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                t.forEach(function(e) {
                    return e.apply(void 0, n)
                })
            }
        }
    }
    "undefined" == typeof window || !window.document || window.document.createElement;

    function I(e, t, n) {
        return Math.min(Math.max(e, t), n)
    }
    var S = n(413),
        A = n.n(S),
        O = (n(702), n(49)),
        b = n(786),
        N = n.n(b);
    n.d(t, "MemoryRouter", function() {
        return L
    }), n.d(t, "Prompt", function() {
        return P
    }), n.d(t, "Redirect", function() {
        return x
    }), n.d(t, "Route", function() {
        return H
    }), n.d(t, "Router", function() {
        return R
    }), n.d(t, "StaticRouter", function() {
        return q
    }), n.d(t, "Switch", function() {
        return X
    }), n.d(t, "generatePath", function() {
        return k
    }), n.d(t, "matchPath", function() {
        return B
    }), n.d(t, "withRouter", function() {
        return J
    }), n.d(t, "__RouterContext", function() {
        return C
    });
    var C = function(e) {
            var t = f();
            return t.displayName = e, t
        }("Router"),
        R = function(e) {
            function t(t) {
                var n;
                return (n = e.call(this, t) || this).state = {
                    location: t.history.location
                }, n._isMounted = !1, n._pendingLocation = null, t.staticContext || (n.unlisten = t.history.listen(function(e) {
                    n._isMounted ? n.setState({
                        location: e
                    }) : n._pendingLocation = e
                })), n
            }
            Object(p.a)(t, e), t.computeRootMatch = function(e) {
                return {
                    path: "/",
                    url: "/",
                    params: {},
                    isExact: "/" === e
                }
            };
            var n = t.prototype;
            return n.componentDidMount = function() {
                this._isMounted = !0, this._pendingLocation && this.setState({
                    location: this._pendingLocation
                })
            }, n.componentWillUnmount = function() {
                this.unlisten && this.unlisten()
            }, n.render = function() {
                return i.a.createElement(C.Provider, {
                    children: this.props.children || null,
                    value: {
                        history: this.props.history,
                        location: this.state.location,
                        match: t.computeRootMatch(this.state.location.pathname),
                        staticContext: this.props.staticContext
                    }
                })
            }, t
        }(i.a.Component);
    var L = function(e) {
        function t() {
            for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
            return (t = e.call.apply(e, [this].concat(r)) || this).history = function(e) {
                void 0 === e && (e = {});
                var t = e,
                    n = t.getUserConfirmation,
                    r = t.initialEntries,
                    i = void 0 === r ? ["/"] : r,
                    a = t.initialIndex,
                    o = void 0 === a ? 0 : a,
                    s = t.keyLength,
                    u = void 0 === s ? 6 : s,
                    l = y();

                function c(e) {
                    Object(_.a)(m, e), m.length = m.entries.length, l.notifyListeners(m.location, m.action)
                }

                function d() {
                    return Math.random().toString(36).substr(2, u)
                }
                var f = I(o, 0, i.length - 1),
                    p = i.map(function(e) {
                        return v(e, void 0, "string" == typeof e ? d() : e.key || d())
                    }),
                    h = g;

                function E(e) {
                    var t = I(m.index + e, 0, m.entries.length - 1),
                        r = m.entries[t];
                    l.confirmTransitionTo(r, "POP", n, function(e) {
                        e ? c({
                            action: "POP",
                            location: r,
                            index: t
                        }) : c()
                    })
                }
                var m = {
                    length: p.length,
                    action: "POP",
                    location: p[f],
                    index: f,
                    entries: p,
                    createHref: h,
                    push: function(e, t) {
                        var r = v(e, t, d(), m.location);
                        l.confirmTransitionTo(r, "PUSH", n, function(e) {
                            if (e) {
                                var t = m.index + 1,
                                    n = m.entries.slice(0);
                                n.length > t ? n.splice(t, n.length - t, r) : n.push(r), c({
                                    action: "PUSH",
                                    location: r,
                                    index: t,
                                    entries: n
                                })
                            }
                        })
                    },
                    replace: function(e, t) {
                        var r = v(e, t, d(), m.location);
                        l.confirmTransitionTo(r, "REPLACE", n, function(e) {
                            e && (m.entries[m.index] = r, c({
                                action: "REPLACE",
                                location: r
                            }))
                        })
                    },
                    go: E,
                    goBack: function() {
                        E(-1)
                    },
                    goForward: function() {
                        E(1)
                    },
                    canGo: function(e) {
                        var t = m.index + e;
                        return t >= 0 && t < m.entries.length
                    },
                    block: function(e) {
                        return void 0 === e && (e = !1), l.setPrompt(e)
                    },
                    listen: function(e) {
                        return l.appendListener(e)
                    }
                };
                return m
            }(t.props), t
        }
        return Object(p.a)(t, e), t.prototype.render = function() {
            return i.a.createElement(R, {
                history: this.history,
                children: this.props.children
            })
        }, t
    }(i.a.Component);
    var D = function(e) {
        function t() {
            return e.apply(this, arguments) || this
        }
        Object(p.a)(t, e);
        var n = t.prototype;
        return n.componentDidMount = function() {
            this.props.onMount && this.props.onMount.call(this, this)
        }, n.componentDidUpdate = function(e) {
            this.props.onUpdate && this.props.onUpdate.call(this, this, e)
        }, n.componentWillUnmount = function() {
            this.props.onUnmount && this.props.onUnmount.call(this, this)
        }, n.render = function() {
            return null
        }, t
    }(i.a.Component);

    function P(e) {
        var t = e.message,
            n = e.when,
            r = void 0 === n || n;
        return i.a.createElement(C.Consumer, null, function(e) {
            if (e || Object(m.default)(!1), !r || e.staticContext) return null;
            var n = e.history.block;
            return i.a.createElement(D, {
                onMount: function(e) {
                    e.release = n(t)
                },
                onUpdate: function(e, r) {
                    r.message !== t && (e.release(), e.release = n(t))
                },
                onUnmount: function(e) {
                    e.release()
                },
                message: t
            })
        })
    }
    var M = {},
        w = 1e4,
        U = 0;

    function k(e, t) {
        return void 0 === e && (e = "/"), void 0 === t && (t = {}), "/" === e ? e : function(e) {
            if (M[e]) return M[e];
            var t = A.a.compile(e);
            return U < w && (M[e] = t, U++), t
        }(e)(t, {
            pretty: !0
        })
    }

    function x(e) {
        var t = e.computedMatch,
            n = e.to,
            r = e.push,
            a = void 0 !== r && r;
        return i.a.createElement(C.Consumer, null, function(e) {
            e || Object(m.default)(!1);
            var r = e.history,
                o = e.staticContext,
                s = a ? r.push : r.replace,
                u = v(t ? "string" == typeof n ? k(n, t.params) : Object(_.a)({}, n, {
                    pathname: k(n.pathname, t.params)
                }) : n);
            return o ? (s(u), null) : i.a.createElement(D, {
                onMount: function() {
                    s(u)
                },
                onUpdate: function(e, t) {
                    var n = v(t.to);
                    T(n, Object(_.a)({}, u, {
                        key: n.key
                    })) || s(u)
                },
                to: n
            })
        })
    }
    var G = {},
        F = 1e4,
        Y = 0;

    function B(e, t) {
        void 0 === t && (t = {}), "string" == typeof t && (t = {
            path: t
        });
        var n = t,
            r = n.path,
            i = n.exact,
            a = void 0 !== i && i,
            o = n.strict,
            s = void 0 !== o && o,
            u = n.sensitive,
            l = void 0 !== u && u;
        return [].concat(r).reduce(function(t, n) {
            if (!n) return null;
            if (t) return t;
            var r = function(e, t) {
                    var n = "" + t.end + t.strict + t.sensitive,
                        r = G[n] || (G[n] = {});
                    if (r[e]) return r[e];
                    var i = [],
                        a = {
                            regexp: A()(e, i, t),
                            keys: i
                        };
                    return Y < F && (r[e] = a, Y++), a
                }(n, {
                    end: a,
                    strict: s,
                    sensitive: l
                }),
                i = r.regexp,
                o = r.keys,
                u = i.exec(e);
            if (!u) return null;
            var c = u[0],
                d = u.slice(1),
                f = e === c;
            return a && !f ? null : {
                path: n,
                url: "/" === n && "" === c ? "/" : c,
                isExact: f,
                params: o.reduce(function(e, t, n) {
                    return e[t.name] = d[n], e
                }, {})
            }
        }, null)
    }
    var H = function(e) {
        function t() {
            return e.apply(this, arguments) || this
        }
        return Object(p.a)(t, e), t.prototype.render = function() {
            var e = this;
            return i.a.createElement(C.Consumer, null, function(t) {
                t || Object(m.default)(!1);
                var n = e.props.location || t.location,
                    r = e.props.computedMatch ? e.props.computedMatch : e.props.path ? B(n.pathname, e.props) : t.match,
                    a = Object(_.a)({}, t, {
                        location: n,
                        match: r
                    }),
                    o = e.props,
                    s = o.children,
                    u = o.component,
                    l = o.render;
                (Array.isArray(s) && 0 === s.length && (s = null), "function" == typeof s) && (void 0 === (s = s(a)) && (s = null));
                return i.a.createElement(C.Provider, {
                    value: a
                }, s && ! function(e) {
                    return 0 === i.a.Children.count(e)
                }(s) ? s : a.match ? u ? i.a.createElement(u, a) : l ? l(a) : null : null)
            })
        }, t
    }(i.a.Component);

    function V(e) {
        return "/" === e.charAt(0) ? e : "/" + e
    }

    function j(e, t) {
        if (!e) return t;
        var n = V(e);
        return 0 !== t.pathname.indexOf(n) ? t : Object(_.a)({}, t, {
            pathname: t.pathname.substr(n.length)
        })
    }

    function W(e) {
        return "string" == typeof e ? e : g(e)
    }

    function K(e) {
        return function() {
            Object(m.default)(!1)
        }
    }

    function z() {}
    var q = function(e) {
        function t() {
            for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
            return (t = e.call.apply(e, [this].concat(r)) || this).handlePush = function(e) {
                return t.navigateTo(e, "PUSH")
            }, t.handleReplace = function(e) {
                return t.navigateTo(e, "REPLACE")
            }, t.handleListen = function() {
                return z
            }, t.handleBlock = function() {
                return z
            }, t
        }
        Object(p.a)(t, e);
        var n = t.prototype;
        return n.navigateTo = function(e, t) {
            var n = this.props,
                r = n.basename,
                i = void 0 === r ? "" : r,
                a = n.context,
                o = void 0 === a ? {} : a;
            o.action = t, o.location = function(e, t) {
                return e ? Object(_.a)({}, t, {
                    pathname: V(e) + t.pathname
                }) : t
            }(i, v(e)), o.url = W(o.location)
        }, n.render = function() {
            var e = this.props,
                t = e.basename,
                n = void 0 === t ? "" : t,
                r = e.context,
                a = void 0 === r ? {} : r,
                o = e.location,
                s = void 0 === o ? "/" : o,
                u = Object(O.a)(e, ["basename", "context", "location"]),
                l = {
                    createHref: function(e) {
                        return V(n + W(e))
                    },
                    action: "POP",
                    location: j(n, v(s)),
                    push: this.handlePush,
                    replace: this.handleReplace,
                    go: K(),
                    goBack: K(),
                    goForward: K(),
                    listen: this.handleListen,
                    block: this.handleBlock
                };
            return i.a.createElement(R, Object(_.a)({}, u, {
                history: l,
                staticContext: a
            }))
        }, t
    }(i.a.Component);
    var X = function(e) {
        function t() {
            return e.apply(this, arguments) || this
        }
        return Object(p.a)(t, e), t.prototype.render = function() {
            var e = this;
            return i.a.createElement(C.Consumer, null, function(t) {
                t || Object(m.default)(!1);
                var n, r, a = e.props.location || t.location;
                return i.a.Children.forEach(e.props.children, function(e) {
                    if (null == r && i.a.isValidElement(e)) {
                        n = e;
                        var o = e.props.path || e.props.from;
                        r = o ? B(a.pathname, Object(_.a)({}, e.props, {
                            path: o
                        })) : t.match
                    }
                }), r ? i.a.cloneElement(n, {
                    location: a,
                    computedMatch: r
                }) : null
            })
        }, t
    }(i.a.Component);

    function J(e) {
        var t = "withRouter(" + (e.displayName || e.name) + ")",
            n = function(t) {
                var n = t.wrappedComponentRef,
                    r = Object(O.a)(t, ["wrappedComponentRef"]);
                return i.a.createElement(C.Consumer, null, function(t) {
                    return t || Object(m.default)(!1), i.a.createElement(e, Object(_.a)({}, r, t, {
                        ref: n
                    }))
                })
            };
        return n.displayName = t, n.WrappedComponent = e, N()(n, e)
    }
},
function(e, t) {
    e.exports = function(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
    }
},
function(e, t) {
    function n() {
        return e.exports = n = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }, n.apply(this, arguments)
    }
    e.exports = n
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e, t) {
        void 0 === t && (t = !1);
        switch (e.type) {
            case i.ChannelTypes.DM:
                var n = e.recipients.map(r.default.getUser).filter(Boolean)[0],
                    o = null != n ? n.toString() : "";
                return t ? "@" + o : o;
            case i.ChannelTypes.GROUP_DM:
            case i.ChannelTypes.LFG_GROUP_DM:
                if ("" !== e.name) return e.name;
                var s = e.recipients.map(r.default.getUser).filter(Boolean);
                return s.length > 0 ? s.map(function(e) {
                    return e.toString()
                }).join(", ") : a.default.Messages.UNNAMED;
            case i.ChannelTypes.GUILD_ANNOUNCEMENT:
            case i.ChannelTypes.GUILD_TEXT:
            case i.ChannelTypes.GUILD_LFG_LISTINGS:
                return t ? "#" + e.name : e.name;
            default:
                return e.name
        }
    };
    o(n(63));
    var r = o(n(10)),
        i = n(1),
        a = o(n(5));

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = s(n(3)),
        i = s(n(2)),
        a = s(n(15)),
        o = n(1);

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function u() {
        return (u = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }

    function l(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    var c = {
        enabled: !1,
        autoToggle: !0,
        hideInstantInvites: !0,
        hidePersonalInformation: !0,
        disableSounds: !0,
        disableNotifications: !0
    };

    function d(e, t) {
        a.default.track("streamer_mode_toggle", {
            enabled: e,
            automatic: t
        })
    }
    var f = new(function(e) {
        var t, n, r, i, a;

        function o() {
            return e.apply(this, arguments) || this
        }
        return n = e, (t = o).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n, o.prototype.getSettings = function() {
            var e = u({}, c);
            for (var t in e) e[t] = this.get(t);
            return e
        }, r = o, (i = [{
            key: "enabled",
            get: function() {
                return this.get("enabled")
            }
        }, {
            key: "autoToggle",
            get: function() {
                return this.get("autoToggle")
            }
        }, {
            key: "hideInstantInvites",
            get: function() {
                return this.enabled && this.get("hideInstantInvites")
            }
        }, {
            key: "hidePersonalInformation",
            get: function() {
                return this.enabled && this.get("hidePersonalInformation")
            }
        }, {
            key: "disableSounds",
            get: function() {
                return this.enabled && this.get("disableSounds")
            }
        }, {
            key: "disableNotifications",
            get: function() {
                return this.enabled && this.get("disableNotifications")
            }
        }]) && l(r.prototype, i), a && l(r, a), o
    }(r.default.CachedStore))(i.default, "StreamerModeStore", o.ActionTypes.STREAMER_MODE_UPDATE, c, function(e, t) {
        switch (t.type) {
            case o.ActionTypes.STREAMER_MODE_UPDATE:
                return "enabled" === t.key ? d(t.value, !1) : a.default.track("update_streamer_mode_settings", {
                    enabled: e.get("enabled"),
                    automatic: e.get("autoToggle"),
                    disable_notifications: e.get("disableNotifications"),
                    disable_sounds: e.get("disableSounds"),
                    hide_instant_invites: e.get("hideInstantInvites"),
                    hide_personal_info: e.get("hidePersonalInformation")
                }), !1;
            case o.ActionTypes.RUNNING_STREAMER_TOOLS_CHANGE:
                if (e.autoToggle) {
                    var n = t.count > 0;
                    return e.set("enabled", n), d(n, !0), !0
                }
                return !1;
            default:
                return !1
        }
    });
    t.default = f
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.ExperimentTypes = t.ExperimentBuckets = void 0;
    var r = Object.freeze({
        NOT_ELIGIBLE: -1,
        CONTROL: 0,
        TREATMENT_1: 1,
        TREATMENT_2: 2,
        TREATMENT_3: 3,
        TREATMENT_4: 4,
        TREATMENT_5: 5,
        TREATMENT_6: 6,
        TREATMENT_7: 7
    });
    t.ExperimentBuckets = r;
    var i = Object.freeze({
        NONE_LEGACY: "none",
        GUILD: "guild",
        USER: "user"
    });
    t.ExperimentTypes = i
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = f(n(12)),
        i = f(n(2)),
        a = f(n(273)),
        o = f(n(117)),
        s = f(n(63)),
        u = f(n(14)),
        l = f(n(37)),
        c = n(151),
        d = n(1);

    function f(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var p = {
        openPrivateChannel: function(e, t, n, i, o) {
            var s = this;
            void 0 === n && (n = !1), void 0 === i && (i = !1);
            var u = function(t) {
                n && a.default.call(t, i, !0, e)
            };
            if (null != t && 1 === t.length) {
                var l = this._openCachedDMChannel(t[0]);
                if (null != l) return u(l), Promise.resolve(l)
            }
            var c = this._getRecipients(t);
            return r.default.post({
                url: d.Endpoints.USER_CHANNELS(e),
                body: {
                    recipients: c
                },
                context: {
                    location: o
                }
            }).then(function(e) {
                return s._openPrivateChannel(e.body), u(e.body.id), e.body.id
            })
        },
        _openCachedDMChannel: function(e) {
            var t = u.default.getDMFromUserId(e),
                n = null != t ? u.default.getChannel(t) : null;
            if (n) return o.default.selectPrivateChannel(n.id), n.id
        },
        ensurePrivateChannel: function(e, t) {
            var n = this._getRecipients(t);
            return r.default.post({
                url: d.Endpoints.USER_CHANNELS(e),
                body: {
                    recipients: n
                }
            }).then(function(e) {
                var t = s.default.fromServer(e.body);
                return i.default.dispatch({
                    type: d.ActionTypes.CHANNEL_CREATE,
                    channel: t
                }), t.id
            })
        },
        _getRecipients: function(e) {
            return null != e ? Array.isArray(e) ? e : [e] : []
        },
        _openPrivateChannel: function(e) {
            i.default.dispatch({
                type: d.ActionTypes.CHANNEL_CREATE,
                channel: s.default.fromServer(e)
            }), o.default.selectPrivateChannel(e.id)
        },
        closePrivateChannel: function(e, t) {
            return void 0 === t && (t = !1), i.default.dispatch({
                type: d.ActionTypes.CHANNEL_DELETE,
                channel: {
                    id: e,
                    guild_id: null,
                    parent_id: null
                }
            }), t && !__OVERLAY__ && l.default.transitionTo(d.Routes.FRIENDS), r.default.delete(d.Endpoints.CHANNEL(e))
        },
        updatePermissionOverwrite: function(e, t) {
            return r.default.put({
                url: d.Endpoints.CHANNEL_PERMISSIONS_OVERWRITE(e, t.id),
                body: t
            })
        },
        clearPermissionOverwrite: function(e, t) {
            r.default.delete(d.Endpoints.CHANNEL_PERMISSIONS_OVERWRITE(e, t))
        },
        addRecipient: function(e, t, n) {
            var i = this;
            return r.default.put({
                url: d.Endpoints.CHANNEL_RECIPIENT(e, t),
                context: {
                    location: n
                }
            }).then(function(t) {
                return 201 === t.status ? (i._openPrivateChannel(t.body), t.body.id) : e
            })
        },
        addRecipients: function(e, t, n) {
            var r = this;
            return this.addRecipient(e, t[0], n).then(function(e) {
                return Promise.all(t.slice(1).map(function(t) {
                    return r.addRecipient(e, t, n)
                })).then(function() {
                    return e
                })
            })
        },
        removeRecipient: function(e, t) {
            return r.default.delete(d.Endpoints.CHANNEL_RECIPIENT(e, t))
        },
        setName: function(e, t) {
            return r.default.patch({
                url: d.Endpoints.CHANNEL(e),
                body: {
                    name: t
                }
            })
        },
        setIcon: function(e, t) {
            r.default.patch({
                url: d.Endpoints.CHANNEL(e),
                body: {
                    icon: t
                }
            })
        },
        convertToGuild: function(e) {
            return r.default.post({
                url: d.Endpoints.CHANNEL_CONVERT(e)
            })
        },
        preload: function(e, t) {
            i.default.dispatch({
                type: d.ActionTypes.CHANNEL_PRELOAD,
                guildId: e === d.ME ? null : e,
                channelId: t,
                context: d.CURRENT_APP_CONTEXT
            })
        },
        fetchChannelStoreListing: function(e, t) {
            var n = null != t ? d.Endpoints.CHANNEL_STORE_LISTING_SKU(e, t) : d.Endpoints.CHANNEL_STORE_LISTING(e);
            return (0, c.httpGetWithCountryCodeQuery)(n).then(function(t) {
                i.default.dispatch({
                    type: d.ActionTypes.STORE_LISTING_FETCH_SUCCESS,
                    channelId: e,
                    storeListing: t.body
                })
            })
        }
    };
    t.default = p
},
function(e, t, n) {
    "use strict";
    (function(e) {
        t.__esModule = !0, t.default = void 0;
        var r = h(n(7)),
            i = h(n(12)),
            a = h(n(2)),
            o = function(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        if (Object.prototype.hasOwnProperty.call(e, n)) {
                            var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                            r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                        } return t.default = e, t
            }(n(874)),
            s = n(845),
            u = h(n(11)),
            l = h(n(345)),
            c = h(n(87)),
            d = h(n(19)),
            f = h(n(40)),
            p = h(n(37)),
            _ = n(1);

        function h(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function E(e, t, n, r, i, a, o) {
            try {
                var s = e[a](o),
                    u = s.value
            } catch (e) {
                return void n(e)
            }
            s.done ? t(u) : Promise.resolve(u).then(r, i)
        }

        function m(e, t, n) {
            return void 0 === t && (t = !1), a.default.wait(function() {
                return a.default.dispatch({
                    type: _.ActionTypes.GUILD_JOIN,
                    guildId: e,
                    lurker: t
                })
            }), i.default.put({
                url: _.Endpoints.GUILD_JOIN(e),
                query: {
                    lurker: t,
                    session_id: t ? u.default.getSessionId() : null,
                    source: n
                },
                context: {
                    source: n
                }
            })
        }
        var g, v, T = {
            joinGuild: m,
            transitionToGuildSync: function(t, n, r) {
                return new Promise(function(i) {
                    return d.default.addConditionalChangeListener(function() {
                        var a = d.default.getGuild(t);
                        if (null != a) {
                            var o = null != r ? r : f.default.getChannelId(a.id);
                            return p.default.transitionTo(_.Routes.CHANNEL(t, o), n), e(i), !1
                        }
                    })
                })
            },
            deleteGuild: function(e) {
                a.default.dirtyDispatch({
                    type: _.ActionTypes.GUILD_DELETE,
                    guild: {
                        id: e
                    }
                })
            },
            selectGuild: function(e) {
                o.stopLurking({
                    selectedGuildId: e
                });
                var t = l.default.getGuildId();
                null != t && t === e && m(t, !0)
            },
            createGuild: function(e) {
                a.default.dispatch({
                    type: _.ActionTypes.GUILD_CREATE,
                    guild: e
                })
            },
            markGuildAsRead: function(e) {
                return i.default.post(_.Endpoints.GUILD_ACK(e)).then(function() {
                    return a.default.dispatch({
                        type: _.ActionTypes.GUILD_ACK,
                        guildId: e
                    })
                })
            },
            markGuildsAsRead: function(e) {
                var t = r.default.flatMap(e, function(e) {
                    return c.default.getSelectableChannelIds(e)
                });
                return (0, s.bulkAck)(t)
            },
            setServerMute: function(e, t, n) {
                i.default.patch({
                    url: _.Endpoints.GUILD_MEMBER(e, t),
                    body: {
                        mute: n
                    }
                })
            },
            setServerDeaf: function(e, t, n) {
                i.default.patch({
                    url: _.Endpoints.GUILD_MEMBER(e, t),
                    body: {
                        deaf: n
                    }
                })
            },
            setChannel: function(e, t, n) {
                i.default.patch({
                    url: _.Endpoints.GUILD_MEMBER(e, t),
                    body: {
                        channel_id: n
                    }
                })
            },
            kickUser: function(e, t, n) {
                return i.default.delete({
                    url: _.Endpoints.GUILD_MEMBER(e, t),
                    query: {
                        reason: n
                    }
                })
            },
            banUser: function(e, t, n, r) {
                var a = {
                    "delete-message-days": n,
                    reason: r
                };
                return i.default.put({
                    url: _.Endpoints.GUILD_BAN(e, t),
                    query: a
                })
            },
            unbanUser: function(e, t) {
                return i.default.delete(_.Endpoints.GUILD_BAN(e, t))
            },
            createRole: function(e) {
                i.default.post(_.Endpoints.GUILD_ROLES(e))
            },
            updateRole: function(e, t, n, r, a, o, s) {
                return i.default.patch({
                    url: _.Endpoints.GUILD_ROLE(e, t),
                    body: {
                        name: n,
                        permissions: r,
                        color: a || 0,
                        hoist: o,
                        mentionable: s
                    }
                })
            },
            deleteRole: function(e, t) {
                i.default.delete(_.Endpoints.GUILD_ROLE(e, t))
            },
            batchChannelUpdate: function(e, t) {
                return i.default.patch({
                    url: _.Endpoints.GUILD_CHANNELS(e),
                    body: t
                })
            },
            batchRoleUpdate: function(e, t) {
                return i.default.patch({
                    url: _.Endpoints.GUILD_ROLES(e),
                    body: t
                })
            },
            requestMembers: function(e, t, n, r) {
                void 0 === t && (t = ""), void 0 === n && (n = 10), void 0 === r && (r = !0), a.default.dirtyDispatch({
                    type: _.ActionTypes.GUILD_MEMBERS_REQUEST,
                    guildIds: Array.isArray(e) ? e : [e],
                    query: t,
                    limit: n,
                    presences: r
                })
            },
            move: function(e, t, n, r) {
                a.default.dispatch({
                    type: _.ActionTypes.GUILD_MOVE,
                    fromIndex: e,
                    toIndex: t,
                    fromFolderIndex: n,
                    toFolderIndex: r
                })
            },
            toggleGuildFolderExpand: function(e) {
                a.default.dispatch({
                    type: _.ActionTypes.TOGGLE_GUILD_FOLDER_EXPAND,
                    folderId: e
                })
            },
            nsfwAgree: function(e) {
                a.default.dispatch({
                    type: _.ActionTypes.GUILD_NSFW_AGREE,
                    guildId: e
                })
            },
            nsfwDisagree: function(e) {
                var t = c.default.getDefaultChannel(e);
                null == t || t.isNSFW() ? p.default.transitionTo(_.Routes.FRIENDS) : p.default.transitionTo(_.Routes.CHANNEL(e, t.id))
            },
            fetchApplications: (g = regeneratorRuntime.mark(function e(t, n) {
                var r, o, s;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return r = {
                                url: _.Endpoints.GUILD_APPLICATIONS(t)
                            }, null != n && (r.query = {
                                channel_id: n
                            }), e.next = 4, i.default.get(r);
                        case 4:
                            o = e.sent, s = o.body, a.default.dispatch({
                                type: _.ActionTypes.GUILD_APPLICATIONS_FETCH_SUCCESS,
                                guildId: t,
                                applications: s
                            });
                        case 7:
                        case "end":
                            return e.stop()
                    }
                }, e)
            }), v = function() {
                var e = this,
                    t = arguments;
                return new Promise(function(n, r) {
                    var i = g.apply(e, t);

                    function a(e) {
                        E(i, n, r, a, o, "next", e)
                    }

                    function o(e) {
                        E(i, n, r, a, o, "throw", e)
                    }
                    a(void 0)
                })
            }, function(e, t) {
                return v.apply(this, arguments)
            })
        };
        t.default = T
    }).call(this, n(39).setImmediate)
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.collectGuildAnalyticsMetadata = I, t.collectChannelAnalyticsMetadata = S, t.collectVoiceAnalyticsMetadata = function(e) {
        if (null == e) return null;
        var t = a.default.getChannel(e);
        if (null == t) return null;
        var n = c.default.isVideoEnabled() || c.default.isScreenSharing();
        return T({
            channel_id: t.id,
            channel_type: t.type,
            guild_id: t.getGuildId()
        }, b(t.getGuildId(), t.id, n), (0, m.getVoiceAnalyticsMetadataAdditional)())
    }, t.trackWithMetadata = A, t.trackWithGroupMetadata = O, t.getVoiceStateMetadata = b, t.getCustomStatusMetadata = function(e, t) {
        var n = {
            custom_status_count: 0
        };
        return (0, r.default)(h.default.getVoiceStates(e)).forEach(function(e) {
            e.channelId === t && null != f.default.findActivity(e.userId, function(e) {
                return e.type === g.ActivityTypes.CUSTOM_STATUS
            }) && n.custom_status_count++
        }), n
    }, t.default = void 0;
    var r = v(n(7)),
        i = v(n(11)),
        a = v(n(14)),
        o = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(87)),
        s = v(n(267)),
        u = v(n(56)),
        l = v(n(19)),
        c = v(n(41)),
        d = v(n(55)),
        f = v(n(65)),
        p = v(n(40)),
        _ = v(n(150)),
        h = v(n(72)),
        E = v(n(15)),
        m = n(4095),
        g = n(1);

    function v(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function T() {
        return (T = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }

    function y(e) {
        var t = 0;
        for (var n in e) t += 1;
        return t
    }

    function I(e) {
        if (null == e) return null;
        var t = l.default.getGuild(e);
        if (null == t) return null;
        var n = i.default.getId(),
            r = u.default.getMember(e, n),
            a = o.default.getChannels(e),
            c = a[o.GUILD_SELECTABLE_CHANNELS_KEY].length,
            f = a[g.ChannelTypes.GUILD_VOICE].length,
            p = h.default.getVoiceStates(e);
        return {
            guild_id: t.id,
            guild_size_total: s.default.getMemberCount(e),
            guild_num_channels: c + f,
            guild_num_text_channels: c,
            guild_num_voice_channels: f,
            guild_num_roles: y(t.roles),
            guild_member_num_roles: r ? r.roles.length : 0,
            guild_member_perms: d.default.getGuildPermissions(e) || 0,
            guild_is_vip: t.hasFeature(g.GuildFeatures.VIP_REGIONS),
            is_member: null != r,
            num_voice_channels_active: y(p)
        }
    }

    function S(e) {
        if (null == e) return null;
        var t = !1,
            n = e.getGuildId();
        if (null != n) {
            var r = e.permissionOverwrites[n];
            r && 0 == (r.deny & g.Permissions.VIEW_CHANNEL) && (t = !0)
        }
        return {
            channel_id: e.id,
            channel_type: e.type,
            channel_size_total: n ? 0 : e.recipients.length,
            channel_member_perms: n && d.default.getChannelPermissions(e.id) || 0,
            channel_hidden: t
        }
    }

    function A(e, t, n) {
        if (void 0 === t && (t = {}), void 0 === n && (n = !1), !E.default.isThrottled(e)) {
            var r = t.location !== g.AnalyticsLocations.GUILD_CREATE_INVITE_SUGGESTION,
                i = t.guild_id || (r ? _.default.getGuildId() : null),
                o = t.channel_id || (r ? p.default.getChannelId(i) : null),
                s = T({}, t, I(i), S(a.default.getChannel(o)));
            E.default.track(e, s, n)
        }
    }

    function O(e, t, n) {
        if (void 0 === n && (n = {}), !E.default.isThrottled(e)) {
            var r = T({}, n, S(t.channel), {
                channel_type: g.ChannelTypes.GROUP_DM,
                game_id: t.game_id
            }, (0, m.getGroupMetadataAdditional)(t.game_id), {
                owner_id: t.ownerId,
                total_size: t.size,
                free_size: t.available,
                title: t.title,
                description: t.description
            });
            E.default.track(e, r)
        }
    }

    function b(e, t, n) {
        var a = {
            voice_state_count: 0,
            video_stream_count: 0,
            video_enabled: n
        };
        return (0, r.default)(h.default.getVoiceStates(e)).filter(function(e) {
            return e.channelId === t
        }).filter(function(e) {
            return e.userId !== i.default.getId()
        }).forEach(function(e) {
            a.voice_state_count++, (e.selfVideo || e.selfStream) && a.video_stream_count++
        }), a
    }
    var N = {
        trackWithMetadata: A,
        trackWithGroupMetadata: O,
        getVoiceStateMetadata: b
    };
    t.default = N
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = N(n(7)),
        i = N(n(12)),
        a = N(n(2)),
        o = N(n(153)),
        s = N(n(727)),
        u = N(n(138)),
        l = N(n(133)),
        c = n(449),
        d = N(n(97)),
        f = N(n(11)),
        p = N(n(14)),
        _ = N(n(19)),
        h = N(n(833)),
        E = N(n(212)),
        m = N(n(65)),
        g = N(n(207)),
        v = N(n(10)),
        T = n(329),
        y = n(184),
        I = N(n(264)),
        S = N(n(71)),
        A = N(n(205)),
        O = n(1),
        b = N(n(5));

    function N(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function C() {
        return (C = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var R = !1;
    var L = {
            receiveMessage: function(e, t, n) {
                void 0 === n && (n = !1), a.default.dirtyDispatch({
                    type: O.ActionTypes.MESSAGE_CREATE,
                    channelId: e,
                    message: t,
                    optimistic: n
                })
            },
            sendBotMessage: function(e, t) {
                L.receiveMessage(e, I.default.createBotMessage(e, t))
            },
            sendClydeError: function(e, t) {
                void 0 === t && (t = 0);
                var n = p.default.getChannel(e);
                if (null != n) {
                    var r;
                    if (t === O.AbortCodes.EXPLICIT_CONTENT)
                        if (n.isDM()) r = b.default.Messages.BOT_DM_EXPLICIT_CONTENT.format({
                            name: (0, l.default)(n)
                        });
                        else if (n.isMultiUserDM()) r = b.default.Messages.BOT_GDM_EXPLICIT_CONTENT.format({
                        name: (0, l.default)(n)
                    });
                    else {
                        var i = _.default.getGuild(n.getGuildId());
                        if (null == i) return;
                        r = b.default.Messages.BOT_GUILD_EXPLICIT_CONTENT.format({
                            name: i.toString()
                        })
                    } else r = t === O.AbortCodes.SLOWMODE_RATE_LIMITED ? b.default.Messages.CHANNEL_SLOWMODE_DESC.format({
                        seconds: n.rateLimitPerUser
                    }) : b.default.Messages[O.CLYDE_ERROR_MESSAGES[t] || O.CLYDE_ERROR_MESSAGES.DEFAULT];
                    L.sendBotMessage(e, r)
                }
            },
            truncateMessages: function(e, t, n) {
                a.default.dirtyDispatch({
                    type: O.ActionTypes.TRUNCATE_MESSAGES,
                    channelId: e,
                    truncateBottom: t,
                    truncateTop: n
                })
            },
            jumpToPresent: function(e, t) {
                L.trackJump(e, null, "Present");
                var n = {
                    present: !0
                };
                E.default.hasPresent(e) ? a.default.dirtyDispatch({
                    type: O.ActionTypes.LOAD_MESSAGES_SUCCESS_CACHED,
                    jump: n,
                    channelId: e,
                    limit: t
                }) : L.fetchMessages(e, null, null, t, n)
            },
            trackJump: function(e, t, n, r) {
                u.default.trackWithMetadata(O.AnalyticEvents.JUMP, C({
                    context: n,
                    channel_id: e,
                    message_id: t
                }, r))
            },
            jumpToMessage: function(e, t, n, r, i) {
                void 0 === n && (n = !0), void 0 === i && (i = null), "string" == typeof r && L.trackJump(e, t, r, i), L.fetchMessages(e, null, null, O.MAX_MESSAGES_PER_CHANNEL, {
                    messageId: t,
                    flash: n
                })
            },
            fetchMessages: function(e, t, n, o, s) {
                var u = p.default.getChannel(e);
                if (null != u && u.type === O.ChannelTypes.GUILD_STORE) return !1;
                if (!L._tryFetchMessagesCached(e, t, n, o, s)) {
                    a.default.maybeDispatch({
                        type: O.ActionTypes.LOAD_MESSAGES,
                        channelId: e,
                        jump: s
                    });
                    var l = s && s.messageId;
                    i.default.get({
                        url: O.Endpoints.MESSAGES(e),
                        query: {
                            before: t,
                            after: n,
                            limit: o,
                            around: l
                        },
                        retries: 2
                    }).then(function(i) {
                        var u = i.body,
                            c = null != t,
                            d = null != n,
                            f = null == t && null == n,
                            p = null != l || u.length === o && (c || f),
                            _ = null != l || d && u.length === o;
                        if (l) {
                            var h = o / 2,
                                E = u.length - 1 - r.default.findIndex(u, function(e) {
                                    return e.id === l
                                });
                            if (E < h && (p = !1), E >= h && u.length < o + 1 && (_ = !1), _ && u.length) {
                                var m = g.default.lastMessageId(e);
                                u[0].id === m && (_ = !1)
                            }
                        }
                        a.default.dispatch({
                            type: O.ActionTypes.LOAD_MESSAGES_SUCCESS,
                            channelId: e,
                            messages: u,
                            isBefore: c,
                            isAfter: d,
                            hasMoreBefore: p,
                            hasMoreAfter: _,
                            jump: s
                        })
                    }, function() {
                        return a.default.dispatch({
                            type: O.ActionTypes.LOAD_MESSAGES_FAILURE,
                            channelId: e
                        })
                    })
                }
            },
            _tryFetchMessagesCached: function(e, t, n, r, i) {
                var o = E.default.getMessages(e);
                return i && i.messageId && o.has(i.messageId, !1) ? (a.default.dirtyDispatch({
                    type: O.ActionTypes.LOAD_MESSAGES_SUCCESS_CACHED,
                    channelId: e,
                    jump: i,
                    limit: r
                }), !0) : t && o.hasBeforeCached(t) ? (a.default.dirtyDispatch({
                    type: O.ActionTypes.LOAD_MESSAGES_SUCCESS_CACHED,
                    channelId: e,
                    before: t,
                    limit: r
                }), !0) : !(!n || !o.hasAfterCached(n)) && (a.default.dirtyDispatch({
                    type: O.ActionTypes.LOAD_MESSAGES_SUCCESS_CACHED,
                    channelId: e,
                    after: n,
                    limit: r
                }), !0)
            },
            sendMessage: function(e, t, n, r) {
                return void 0 === n && (n = !0), t.reaction ? Promise.resolve() : n ? new Promise(function(n, i) {
                    E.default.whenReady(e, function() {
                        return L._sendMessage(e, t, r).then(n, i)
                    })
                }) : L._sendMessage(e, t, r)
            },
            sendInvite: function(e, t, n) {
                return L._sendMessage(e, {
                    content: (0, y.getInviteURL)(t),
                    tts: !1
                }, null, n)
            },
            _sendMessage: function(e, t, n, r) {
                var i = t.content,
                    o = t.invalidEmojis,
                    l = t.tts,
                    _ = void 0 !== l && l;
                if (!i && null == n) return Promise.reject(new Error("not sending empty message"));
                var E = I.default.createMessage(e, i, _);
                if (L.receiveMessage(e, E, !0), !R && o && o.length > 0) {
                    R = !0;
                    var g, N = v.default.getCurrentUser(),
                        D = p.default.getChannel(e);
                    g = o.some(function(e) {
                        return e.animated
                    }) && !A.default.canUseAnimatedEmojis(N) ? b.default.Messages.INVALID_ANIMATED_EMOJI_BODY_UPGRADE : S.default.can(O.Permissions.USE_EXTERNAL_EMOJIS, N, D) ? b.default.Messages.INVALID_EXTERNAL_EMOJI_BODY_UPGRADE : b.default.Messages.INVALID_EXTERNAL_EMOJI_BODY, L.sendBotMessage(e, g)
                }
                var P = {
                        type: "send",
                        message: {
                            channelId: e,
                            content: i,
                            nonce: E.id,
                            tts: _
                        }
                    },
                    M = f.default.getSessionId();
                if (null != n && null != M) {
                    var w = {
                            type: n.type,
                            session_id: M
                        },
                        U = n.activity;
                    null != U.party && null != U.party.id && (w.party_id = U.party.id), P.message.application_id = U.application_id, P.message.activity = w
                }
                return new Promise(function(t, n) {
                    s.default.enqueue(P, function(o) {
                        if (o.ok) L.receiveMessage(e, o.body), a.default.dispatch({
                                type: O.ActionTypes.SLOWMODE_START_COOLDOWN,
                                channelId: e
                            }),
                            function(e, t, n, r) {
                                (0, y.findInvites)(e).forEach(function(e) {
                                    var i = p.default.getChannel(t);
                                    if (null != i) {
                                        var a = null;
                                        i.isMultiUserDM() ? a = O.InviteTypes.GDM_INVITE : i.isPrivate() || (a = O.InviteTypes.SERVER_INVITE);
                                        var o = {},
                                            s = h.default.getInvite(e);
                                        if (null != s && s.state === O.InviteStates.RESOLVED && null != s.channel) {
                                            var l = s.channel;
                                            o.invite_channel_id = l.id, o.invite_channel_type = l.type, null != s.inviter && (o.invite_inviter_id = s.inviter.id);
                                            var f = d.default.getActiveStream();
                                            if (null != f && f.channelId === l.id) {
                                                a = O.InviteTypes.STREAM, o.destination_user_id = f.ownerId;
                                                var _ = (0, c.getStreamerApplication)(f, m.default);
                                                o.application_id = null != _ ? _.id : null
                                            }
                                        }
                                        o = C({}, o, {
                                            location: r,
                                            invite_type: a,
                                            invite_code: e,
                                            guild_id: i.getGuildId(),
                                            channel_id: i.id,
                                            message_id: n
                                        }), u.default.trackWithMetadata(O.AnalyticEvents.INVITE_SENT, o)
                                    }
                                })
                            }(i, e, o.body.id, r || "chat_input"),
                            function(e, t, n, r) {
                                (0, T.findGiftCodes)(e).forEach(function(e) {
                                    var i = p.default.getChannel(t);
                                    null != i && u.default.trackWithMetadata(O.AnalyticEvents.GIFT_CODE_SENT, {
                                        location: r,
                                        gift_code: e,
                                        guild_id: i.getGuildId(),
                                        channel_id: i.id,
                                        channel_type: i.type,
                                        message_id: n
                                    })
                                })
                            }(i, e, o.body.id, r || "chat_input"), t(o);
                        else {
                            if (o.status >= 400 && o.status < 500 && o.body)
                                if (o.body.code === O.AbortCodes.SLOWMODE_RATE_LIMITED) {
                                    var s = o.body.retry_after;
                                    null != s && s > 0 && a.default.dispatch({
                                        type: O.ActionTypes.SLOWMODE_START_COOLDOWN,
                                        channelId: e,
                                        cooldownMs: s
                                    })
                                } else L.sendClydeError(e, o.body.code);
                            a.default.dispatch({
                                type: O.ActionTypes.MESSAGE_SEND_FAILED,
                                messageId: E.id,
                                channelId: e
                            }), n(o)
                        }
                    })
                })
            },
            retrySendMessage: function(e, t, n, r, i) {
                void 0 === i && (i = !1), L.deleteMessage(e.id, t, !0), i ? L.sendMessage(e.id, I.default.parse(e, n)) : L.sendMessage(e.id, {
                    content: n,
                    tts: r
                })
            },
            startEditMessage: function(e, t, n) {
                a.default.dispatch({
                    type: O.ActionTypes.MESSAGE_START_EDIT,
                    channelId: e,
                    messageId: t,
                    content: n
                })
            },
            updateEditMessage: function(e) {
                a.default.dispatch({
                    type: O.ActionTypes.MESSAGE_UPDATE_EDIT,
                    content: e
                })
            },
            endEditMessage: function() {
                a.default.dispatch({
                    type: O.ActionTypes.MESSAGE_END_EDIT
                })
            },
            editMessage: function(e, t, n) {
                var r = {
                    channelId: e,
                    messageId: t,
                    content: n.content
                };
                s.default.enqueue({
                    type: "edit",
                    message: r
                }, L.endEditMessage)
            },
            suppressEmbeds: function(e, t) {
                i.default.post({
                    url: O.Endpoints.MESSAGE_SUPPRESS_EMBEDS(e, t),
                    body: {
                        suppress: !0
                    }
                })
            },
            deleteMessage: function(e, t, n) {
                void 0 === n && (n = !1), n ? a.default.dispatch({
                    type: O.ActionTypes.MESSAGE_DELETE,
                    id: t,
                    channelId: e
                }) : i.default.delete(O.Endpoints.MESSAGE(e, t)).then(function() {
                    a.default.dispatch({
                        type: O.ActionTypes.MESSAGE_DELETE,
                        id: t,
                        channelId: e
                    })
                })
            },
            revealMessage: function(e, t) {
                a.default.dispatch({
                    type: O.ActionTypes.MESSAGE_REVEAL,
                    channelId: e,
                    messageId: t
                })
            },
            crosspostMessage: function(e, t) {
                return i.default.post(O.Endpoints.MESSAGE_CROSSPOST(e, t)).catch(function(e) {
                    var t;
                    t = 429 === e.status ? b.default.Messages.PUBLISH_FOLLOWED_NEWS_FAIL_BODY.format({
                        retryAfter: Math.floor(e.body.retry_after / 60 / 1e3)
                    }) : b.default.Messages.PUBLISH_FOLLOWED_NEWS_GENERIC_BODY, o.default.show({
                        title: b.default.Messages.PUBLISH_FOLLOWED_NEWS_FAIL_TITLE,
                        body: t,
                        confirmText: b.default.Messages.OKAY
                    })
                })
            }
        },
        D = L;
    t.default = D
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    ! function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n)) {
                    var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                    r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                } t.default = e
    }(n(0));
    var r, i = l(n(9)),
        a = l(n(68)),
        o = l(n(240)),
        s = l(n(481)),
        u = l(n(190));

    function l(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function c(e, t, n, i) {
        r || (r = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);
        var a = e && e.defaultProps,
            o = arguments.length - 3;
        if (t || 0 === o || (t = {
                children: void 0
            }), t && a)
            for (var s in a) void 0 === t[s] && (t[s] = a[s]);
        else t || (t = a || {});
        if (1 === o) t.children = i;
        else if (o > 1) {
            for (var u = new Array(o), l = 0; l < o; l++) u[l] = arguments[l + 3];
            t.children = u
        }
        return {
            $$typeof: r,
            type: e,
            key: void 0 === n ? null : "" + n,
            ref: null,
            props: t,
            _owner: null
        }
    }
    var d = function(e) {
        var t, n, r = e.label,
            l = e.action,
            d = e.active,
            f = void 0 !== d && d,
            p = e.disabled,
            _ = void 0 !== p && p,
            h = e.danger,
            E = void 0 !== h && h,
            m = e.loading,
            g = void 0 !== m && m,
            v = e.style,
            T = e.checkboxStyle,
            y = e.className;
        return _ || (n = function(e) {
            return l(e, r, f)
        }), c(a.default, {
            className: (0, i.default)(u.default.item, u.default.itemToggle, y, (t = {}, t[u.default.clickable] = !_, t[u.default.disabled] = _, t[u.default.danger] = E, t)),
            onClick: n
        }, void 0, c("div", {
            className: u.default.label,
            style: v
        }, void 0, g ? c(o.default, {
            type: o.default.Type.PULSING_ELLIPSIS
        }) : r), c(s.default, {
            checked: f,
            containerClassName: u.default.checkbox,
            onChange: function() {},
            style: T
        }))
    };
    d.displayName = "ToggleMenuItem";
    var f = d;
    t.default = f
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n)) {
                    var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                    r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                } return t.default = e, t
    }(n(672));
    t.DISCORD_EPOCH = r.DISCORD_EPOCH;
    var i = r.default;
    t.default = i
},
function(e, t, n) {
    var r = n(32);
    e.exports = function(e, t) {
        if (!r(e)) return e;
        var n, i;
        if (t && "function" == typeof(n = e.toString) && !r(i = n.call(e))) return i;
        if ("function" == typeof(n = e.valueOf) && !r(i = n.call(e))) return i;
        if (!t && "function" == typeof(n = e.toString) && !r(i = n.call(e))) return i;
        throw TypeError("Can't convert object to primitive value")
    }
},
function(e, t, n) {
    var r = n(164)("meta"),
        i = n(32),
        a = n(91),
        o = n(61).f,
        s = 0,
        u = Object.isExtensible || function() {
            return !0
        },
        l = !n(30)(function() {
            return u(Object.preventExtensions({}))
        }),
        c = function(e) {
            o(e, r, {
                value: {
                    i: "O" + ++s,
                    w: {}
                }
            })
        },
        d = e.exports = {
            KEY: r,
            NEED: !1,
            fastKey: function(e, t) {
                if (!i(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                if (!a(e, r)) {
                    if (!u(e)) return "F";
                    if (!t) return "E";
                    c(e)
                }
                return e[r].i
            },
            getWeak: function(e, t) {
                if (!a(e, r)) {
                    if (!u(e)) return !0;
                    if (!t) return !1;
                    c(e)
                }
                return e[r].w
            },
            onFreeze: function(e) {
                return l && d.NEED && u(e) && !a(e, r) && c(e), e
            }
        }
},
function(e, t, n) {
    "use strict";

    function r(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    t.__esModule = !0, t.default = void 0;
    var i = function() {
        function e(e, t, n) {
            void 0 === e && (e = 500), void 0 === t && (t = null), void 0 === n && (n = !0), this._fails = 0, this.min = e, this.max = null != t ? t : 10 * e, this.jitter = n, this._current = e
        }
        var t, n, i, a = e.prototype;
        return a.succeed = function() {
            this.cancel(), this._fails = 0, this._current = this.min
        }, a.fail = function(e) {
            var t = this;
            this._fails += 1;
            var n = 2 * this._current;
            if (this.jitter && (n *= Math.random()), this._current = Math.min(this._current + n, this.max), null != e) {
                if (null != this._timeoutId) {
                    if (this._callback !== e) throw new Error("callback already pending");
                    this.cancel()
                }
                this._callback = e, this._timeoutId = setTimeout(function() {
                    try {
                        null != e && e()
                    } finally {
                        t.cancel()
                    }
                }, this._current)
            }
            return this._current
        }, a.cancel = function() {
            this._callback = null, null != this._timeoutId && (clearTimeout(this._timeoutId), this._timeoutId = null)
        }, t = e, (n = [{
            key: "fails",
            get: function() {
                return this._fails
            }
        }, {
            key: "current",
            get: function() {
                return this._current
            }
        }, {
            key: "pending",
            get: function() {
                return null != this._timeoutId
            }
        }]) && r(t.prototype, n), i && r(t, i), e
    }();
    t.default = i
}, ,
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.SUPPORTED_BROWSERS = t.PING_INTERVAL = t.MediaEngineContextTypes = t.Features = t.Codecs = t.DEFAULT_PRIORITY_SPEAKER_DUCKING = t.DISABLED_DEVICE_ID = t.DEFAULT_DEVICE_ID = t.DEFAULT_VOICE_BITRATE = t.DEFAULT_VOLUME = t.SpeakingFlags = t.ConnectionStates = t.InputModes = t.DeviceTypes = t.AudioSubsystems = void 0;
    var r = n(43);
    t.AudioSubsystems = r.AudioSubsystems, t.DeviceTypes = r.DeviceTypes, t.InputModes = r.InputModes, t.ConnectionStates = r.ConnectionStates, t.SpeakingFlags = r.SpeakingFlags, t.DEFAULT_VOLUME = r.DEFAULT_VOLUME, t.DEFAULT_VOICE_BITRATE = r.DEFAULT_VOICE_BITRATE, t.DEFAULT_DEVICE_ID = r.DEFAULT_DEVICE_ID, t.DISABLED_DEVICE_ID = r.DISABLED_DEVICE_ID, t.DEFAULT_PRIORITY_SPEAKER_DUCKING = r.DEFAULT_PRIORITY_SPEAKER_DUCKING, t.Codecs = r.Codecs, t.Features = r.Features, t.MediaEngineContextTypes = r.MediaEngineContextTypes, t.PING_INTERVAL = r.PING_INTERVAL;
    t.SUPPORTED_BROWSERS = {
        Firefox: 59,
        Chrome: 37,
        Opera: 27,
        "Node.js": 6,
        Electron: 1,
        "Microsoft Edge": 17,
        Safari: 12
    }
},
function(e, t, n) {
    "use strict";
    var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;

    function i(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    t.assign = function(e) {
        for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
            var n = t.shift();
            if (n) {
                if ("object" != typeof n) throw new TypeError(n + "must be non-object");
                for (var r in n) i(n, r) && (e[r] = n[r])
            }
        }
        return e
    }, t.shrinkBuf = function(e, t) {
        return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e)
    };
    var a = {
            arraySet: function(e, t, n, r, i) {
                if (t.subarray && e.subarray) e.set(t.subarray(n, n + r), i);
                else
                    for (var a = 0; a < r; a++) e[i + a] = t[n + a]
            },
            flattenChunks: function(e) {
                var t, n, r, i, a, o;
                for (r = 0, t = 0, n = e.length; t < n; t++) r += e[t].length;
                for (o = new Uint8Array(r), i = 0, t = 0, n = e.length; t < n; t++) a = e[t], o.set(a, i), i += a.length;
                return o
            }
        },
        o = {
            arraySet: function(e, t, n, r, i) {
                for (var a = 0; a < r; a++) e[i + a] = t[n + a]
            },
            flattenChunks: function(e) {
                return [].concat.apply([], e)
            }
        };
    t.setTyped = function(e) {
        e ? (t.Buf8 = Uint8Array, t.Buf16 = Uint16Array, t.Buf32 = Int32Array, t.assign(t, a)) : (t.Buf8 = Array, t.Buf16 = Array, t.Buf32 = Array, t.assign(t, o))
    }, t.setTyped(r)
}, ,
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(0)),
        i = u(n(9)),
        a = n(492),
        o = u(n(68)),
        s = u(n(1499));

    function u(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function l() {
        return (l = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var c = function(e) {
        var t, n = e.href,
            u = e.onClick,
            c = e.className,
            d = e.children,
            f = e.rel,
            p = e.target,
            _ = e.useDefaultUnderlineStyles,
            h = void 0 === _ || _,
            E = function(e, t) {
                if (null == e) return {};
                var n, r, i = {},
                    a = Object.keys(e);
                for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
                return i
            }(e, ["href", "onClick", "className", "children", "rel", "target", "useDefaultUnderlineStyles"]),
            m = {
                className: (0, i.default)(s.default.anchor, (t = {}, t[s.default.anchorUnderlineOnHover] = h, t), c),
                href: n,
                onClick: u,
                rel: f,
                target: p
            };
        return null == n || (0, a.isSafeRedirect)(n) || (m.rel = "noreferrer noopener", m.target = "_blank"), null != u ? r.createElement(o.default, l({
            tag: "a"
        }, E, m, {
            onClick: u
        }), d) : r.createElement("a", l({}, E, m), d)
    };
    c.displayName = "Anchor";
    var d = c;
    t.default = d
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = l(n(3)),
        i = l(n(2)),
        a = l(n(37)),
        o = l(n(11)),
        s = l(n(19)),
        u = n(1);

    function l(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var c = null,
        d = null;

    function f() {
        null != c && null == s.default.getGuild(c) && (c = null), null != d && null == s.default.getGuild(d) && (d = null)
    }
    var p = new(function(e) {
        var t, n;

        function r() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var i = r.prototype;
        return i.initialize = function() {
            this.mustEmitChanges(function(e) {
                return e.type !== u.ActionTypes.CONNECTION_OPEN
            }), this.waitFor(s.default, o.default)
        }, i.getGuildId = function() {
            return c
        }, i.getLastSelectedGuildId = function() {
            return d
        }, r
    }(r.default.Store))(i.default, {
        CONNECTION_OPEN: function(e) {
            return f()
        },
        OVERLAY_INITIALIZE: function(e) {
            c = e.selectedGuildId, d = e.lastSelectedGuildId, f()
        },
        CHANNEL_SELECT: function(e) {
            var t = e.guildId;
            if (c === t) return !1;
            null != t && (d = t), c = t
        },
        GUILD_MEMBER_REMOVE: function(e) {
            var t = e.guildId;
            if (e.user.id !== o.default.getId()) return !1;
            var n = !1;
            return d === t && (d = null, n = !0), c === t && (c = null, a.default.replaceWith(u.Routes.ME), n = !0), n
        },
        GUILD_DELETE: function(e) {
            var t = e.guild,
                n = t.id,
                r = !1;
            return !0 !== t.unavailable && (d === n && (d = null, r = !0), c === n && (c = null, a.default.replaceWith(u.Routes.ME), r = !0), r)
        },
        LOGOUT: function(e) {
            return c = null, void(d = null)
        }
    });
    t.default = p
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.getStoreListingLocation = function(e, t) {
        var n = t.analyticsSource,
            r = t.analyticsProperties,
            i = t.storeListingId,
            a = t.slug,
            o = t.channelId,
            s = t.guildId,
            u = {
                state: {
                    analyticsSource: n,
                    analyticsProperties: r
                },
                search: null != i ? "?store_listing_id=" + i : ""
            };
        return h({
            pathname: null != o && null != s ? f.Routes.CHANNEL(s, o, e) : f.Routes.APPLICATION_STORE_LISTING_SKU(e, a)
        }, u)
    }, t.getApplicationStoreListingLocation = function(e, t) {
        var n = t.analyticsSource,
            r = t.analyticsProperties,
            i = t.slug,
            a = {
                state: {
                    analyticsSource: n,
                    analyticsProperties: r
                }
            };
        return h({
            pathname: f.Routes.APPLICATION_STORE_LISTING_APPLICATION(e, i)
        }, a)
    }, t.getAssetURL = function(e, t, n, r) {
        var i, a = window.GLOBAL_ENV.CDN_HOST;
        if (null == r) switch (t.mimeType) {
            case "video/quicktime":
            case "video/mp4":
                r = "mp4";
                break;
            case "image/gif":
                r = "gif";
                break;
            default:
                r = "webp"
        }
        "webp" !== r || E || (r = "png");
        i = null != a ? location.protocol + "//" + a + "/app-assets/" + e + "/store/" + t.id + "." + r : "" + location.protocol + window.GLOBAL_ENV.API_ENDPOINT + f.Endpoints.STORE_ASSET(e, t.id, r);
        null != n && (i += "?size=" + (0, l.calculateSize)(n));
        return i
    }, t.httpGetWithCountryCodeQuery = function(e) {
        var t = o.default.getDefaultBillingCountryCode();
        if (null != t) {
            if ("string" == typeof e) e = {
                url: e
            };
            if ("string" == typeof e.query) throw new Error("string query not supported");
            e.query = h({}, e.query, {
                country_code: t
            })
        }
        return a.default.get(e)
    }, t.nativePlatformTypeToSKUOperatingSystem = function(e) {
        switch (e) {
            case c.PlatformTypes.WINDOWS:
                return f.OperatingSystems.WINDOWS;
            case c.PlatformTypes.OSX:
                return f.OperatingSystems.MACOS;
            case c.PlatformTypes.LINUX:
                return f.OperatingSystems.LINUX;
            default:
                return null
        }
    }, t.skuOperatingSystemToText = function(e) {
        switch (e) {
            case f.OperatingSystems.WINDOWS:
                return p.default.Messages.WINDOWS;
            case f.OperatingSystems.MACOS:
                return p.default.Messages.MACOS;
            case f.OperatingSystems.LINUX:
                return p.default.Messages.LINUX
        }
        throw new Error("Unknown operating system value: " + e)
    }, t.getPrimarySKUForApplication = function(e, t, n) {
        var r = t.getGame(e);
        if (null == r) return null;
        if (null == r.primarySkuId) return null;
        return n.get(r.primarySkuId)
    }, t.getNowPlayingReason = g, t.getRecentlyPlayedReason = v, t.getEverPlayedReason = T, t.getSocialRecommendationReasons = function(e, t, n, i, a, o) {
        var s = t.get(e);
        if (null == s) return y;
        var u = s.applicationId,
            l = [],
            c = [],
            d = g(u, n, i);
        null != d && (l.push(d), c = d.userInfo.map(function(e) {
            return e.user.id
        }));
        var f = [],
            p = v(u, n, a);
        null != p && (l.push(p), f = p.userInfo.map(function(e) {
            return e.user.id
        }));
        var _ = o.getStatisticsForApplication(u);
        if (null != _) {
            var h = _.map(function(e) {
                return e.user_id
            });
            if (r.default.difference(h, c, f).length > 0) {
                var E = T(u, n, o);
                null != E && l.push(E)
            }
        }
        return l
    }, t.getNonSocialRecommendationReasons = function(e, t, n) {
        var r = t.get(e),
            a = n.getForSKU(e);
        if (null == r || null == a) return I;
        var o = [];
        (0, u.hasFlag)(r.flags, f.SKUFlags.HAS_FREE_PREMIUM_CONTENT) && o.push({
            type: f.StoreRecommendationTypes.HAS_FREE_PREMIUM_CONTENT
        });
        var s = r.releaseDate;
        null != s && (0, i.default)().diff(s, "months") < m && (r.accessType === f.SKUAccessTypes.EARLY_ACCESS ? o.push({
            type: f.StoreRecommendationTypes.EARLY_ACCESS,
            releaseDate: s
        }) : o.push({
            type: f.StoreRecommendationTypes.RECENT_RELEASE_DATE,
            releaseDate: s
        }));
        null != a.flavorText && o.push({
            type: f.StoreRecommendationTypes.FLAVOR_TEXT,
            flavorText: a.flavorText
        });
        return o
    }, t.RECENTLY_RELEASED_MONTHS_THRESHOLD = void 0;
    var r = _(n(7)),
        i = _(n(4)),
        a = _(n(12)),
        o = _(n(263)),
        s = n(914),
        u = n(100),
        l = n(217),
        c = n(13),
        d = n(820),
        f = n(1),
        p = _(n(5));

    function _(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function h() {
        return (h = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var E = !d.isMobile && !d.isTablet && -1 !== (0, s.getChromeVersion)(),
        m = 3;

    function g(e, t, n) {
        var r = n.getNowPlaying(e) || {},
            i = Object.keys(r).map(function(e) {
                var n = t.getUser(e);
                return null == n ? null : {
                    user: n,
                    startTime: r[n.id].startedPlaying
                }
            }).filter(Boolean).sort(function(e, t) {
                return t.startTime - e.startTime
            });
        return 0 === i.length ? null : {
            type: f.StoreRecommendationTypes.NOW_PLAYING,
            userInfo: i
        }
    }

    function v(e, t, n) {
        var r = n.getRecentlyPlayedForApplication(e) || {},
            i = Object.keys(r).map(function(e) {
                var n = t.getUser(e);
                return null == n ? null : {
                    user: n,
                    endTime: r[n.id].date
                }
            }).filter(Boolean).sort(function(e, t) {
                return t.endTime - e.endTime
            });
        return 0 === i.length ? null : {
            type: f.StoreRecommendationTypes.RECENTLY_PLAYED,
            userInfo: i
        }
    }

    function T(e, t, n) {
        var r = n.getStatisticsForApplication(e);
        if (null == r) return null;
        var i = r.map(function(e) {
            var n = t.getUser(e.user_id);
            return null == n ? null : {
                user: n,
                endTime: Date.parse(e.last_played_at)
            }
        }).filter(Boolean).sort(function(e, t) {
            return t.endTime - e.endTime
        });
        return 0 === i.length ? null : {
            type: f.StoreRecommendationTypes.EVER_PLAYED,
            userInfo: i
        }
    }
    t.RECENTLY_RELEASED_MONTHS_THRESHOLD = m;
    var y = Object.freeze([]);
    var I = Object.freeze([])
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r, i = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(0)),
        a = _(n(9)),
        o = _(n(57)),
        s = _(n(28)),
        u = _(n(36)),
        l = _(n(96)),
        c = _(n(70)),
        d = n(75),
        f = n(1),
        p = _(n(913));

    function _(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function h(e, t, n, i) {
        r || (r = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);
        var a = e && e.defaultProps,
            o = arguments.length - 3;
        if (t || 0 === o || (t = {
                children: void 0
            }), t && a)
            for (var s in a) void 0 === t[s] && (t[s] = a[s]);
        else t || (t = a || {});
        if (1 === o) t.children = i;
        else if (o > 1) {
            for (var u = new Array(o), l = 0; l < o; l++) u[l] = arguments[l + 3];
            t.children = u
        }
        return {
            $$typeof: r,
            type: e,
            key: void 0 === n ? null : "" + n,
            ref: null,
            props: t,
            _owner: null
        }
    }

    function E(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var m = function(e) {
        var t, n;

        function r(t) {
            var n;
            return E(n = e.call(this, t) || this).submitModal = n.submitModal.bind(E(n)), E(n).handleClose = n.handleClose.bind(E(n)), E(n).handleSubmit = n.handleSubmit.bind(E(n)), n
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var i = r.prototype;
        return i.componentDidMount = function() {
            d.ComponentDispatch.subscribe(f.ComponentActions.MODAL_SUBMIT, this.submitModal), o.default.findDOMNode(this).focus()
        }, i.componentWillUnmount = function() {
            d.ComponentDispatch.unsubscribe(f.ComponentActions.MODAL_SUBMIT, this.submitModal)
        }, i.handleSubmit = function(e) {
            e.preventDefault(), this.submitModal()
        }, i.submitModal = function() {
            s.default.pop(), null != this.props.onConfirm && this.props.onConfirm()
        }, i.handleClose = function() {
            var e = this.props,
                t = e.onCancel,
                n = e.onClose;
            t && t(), n && n()
        }, i.render = function() {
            var e, t, n = this.props,
                r = n.cancelText,
                i = n.confirmText,
                o = n.className,
                s = n.header,
                d = n.children,
                f = n.red,
                _ = n.size;
            return r && (e = h(u.default, {
                type: "button",
                look: u.default.Looks.LINK,
                color: u.default.Colors.PRIMARY,
                onClick: this.handleClose
            }, void 0, r)), i && (t = h(u.default, {
                type: "submit",
                color: f ? u.default.Colors.RED : u.default.Colors.BRAND
            }, void 0, i)), h(l.default, {
                className: (0, a.default)(o, p.default.container),
                tag: "form",
                onSubmit: this.handleSubmit,
                size: _
            }, void 0, h(l.default.Header, {}, void 0, h(c.default, {
                tag: c.default.Tags.H4,
                className: p.default.header
            }, void 0, s)), h(l.default.Content, {
                className: p.default.content
            }, void 0, d), h(l.default.Footer, {}, void 0, t, e))
        }, r
    }(i.PureComponent);
    m.displayName = "Confirm", m.Sizes = l.default.Sizes, m.key = function() {
        return "confirm-modal"
    }, m.defaultProps = {
        red: !0,
        size: l.default.Sizes.SMALL
    };
    var g = m;
    t.default = g
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = n(4097).default;
    t.default = r
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.hex2int = function(e) {
        if (!e) return;
        4 === e.length && (e = "#" + e[1] + e[1] + e[2] + e[2] + e[3] + e[3]);
        return parseInt(e.slice(1), 16)
    }, t.int2hex = function(e) {
        var t = e >> 8 & 255,
            n = 255 & e;
        return "#" + i((e >> 16 & 255).toString(16)) + i(t.toString(16)) + i(n.toString(16))
    }, t.hex2rgb = function(e, t) {
        void 0 === t && (t = 1);
        var n = e.match(r);
        if (n) {
            return 3 !== (n = n.slice(1)).length ? null : "rgba(" + n.map(function(e) {
                return 1 === e.length && (e += e), parseInt(e, 16)
            }).join(", ") + ", " + t + ")"
        }
        return null
    }, t.int2rgba = function(e, t) {
        null == t && (t = (e >> 24 & 255) / 255);
        return "rgba(" + (e >> 16 & 255) + ", " + (e >> 8 & 255) + ", " + (255 & e) + ", " + t + ")"
    }, t.getDarkness = function(e) {
        return 1 - (.299 * (e >> 16 & 255) + .587 * (e >> 8 & 255) + .114 * (255 & e)) / 255
    }, t.isValidHex = function(e) {
        if (4 !== e.length && 7 != e.length || "#" != e[0]) return !1;
        return null != e.match(r)
    };
    var r = /^#?([a-f,A-F,0-9]{1,2})([a-f,A-F,0-9]{1,2})([a-f,A-F,0-9]{1,2})$/;

    function i(e) {
        return 1 == e.length ? "0" + e : e
    }
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r, i = _(n(344)),
        a = _(n(16)),
        o = _(n(493)),
        s = _(n(3)),
        u = _(n(26)),
        l = _(n(2)),
        c = _(n(267)),
        d = _(n(15)),
        f = n(135),
        p = n(1);

    function _(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function h(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function E() {
        return (E = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var m = "scientist:triggered",
        g = "exerimentOverrides",
        v = 1,
        T = !1,
        y = {},
        I = {},
        S = {},
        A = {},
        O = {},
        b = {},
        N = 6048e5,
        C = {
            title: "Unnamed Experiment",
            description: "No description provided"
        };

    function R(e, t) {
        if (t.type === f.ExperimentTypes.USER) return t.type + "|" + e;
        if (t.type === f.ExperimentTypes.GUILD) return t.type + "|" + e + "|" + t.guildId;
        throw new Error
    }

    function L(e) {
        if (e.type === f.ExperimentTypes.USER) return o.default.v3(e.bucket + "|" + e.revision);
        if (e.type === f.ExperimentTypes.GUILD) return o.default.v3(e.bucket + "|" + e.revision + "|" + e.guildId);
        throw new Error
    }

    function D(e, t, n) {
        var r = (0, i.default)(e),
            a = null != t ? (0, i.default)(t) : null,
            o = null != n ? (0, i.default)(n) : null;
        return (null == a || !r.lesser(a)) && (null == o || !r.greater(o))
    }

    function P(e) {
        var t, n, r = e,
            i = Array.isArray(r),
            a = 0;
        for (r = i ? r : r[Symbol.iterator]();;) {
            var s;
            if (i) {
                if (a >= r.length) break;
                s = r[a++]
            } else {
                if ((a = r.next()).done) break;
                s = a.value
            }
            var u = s,
                l = u[0],
                c = u[1];
            switch (l) {
                case o.default.v3("min_id"):
                    t = c;
                    break;
                case o.default.v3("max_id"):
                    n = c
            }
        }
        return {
            min: t,
            max: n
        }
    }
    var M = ((r = {})[o.default.v3("guild_ids")] = function(e) {
        var t = [],
            n = e,
            r = Array.isArray(n),
            i = 0;
        for (n = r ? n : n[Symbol.iterator]();;) {
            var a;
            if (r) {
                if (i >= n.length) break;
                a = n[i++]
            } else {
                if ((i = n.next()).done) break;
                a = i.value
            }
            var s = a,
                u = s[0],
                l = s[1];
            switch (u) {
                case o.default.v3("guild_ids"):
                    t = l
            }
        }
        return function(e) {
            return t.includes(e)
        }
    }, r[o.default.v3("guild_id_range")] = function(e) {
        var t = P(e),
            n = t.min,
            r = t.max;
        return function(e) {
            return D(e, n, r)
        }
    }, r[o.default.v3("guild_member_count_range")] = function(e) {
        var t = P(e),
            n = t.min,
            r = t.max;
        return function(e) {
            var t = c.default.getMemberCount(e);
            return null != t && D(t, n, r)
        }
    }, r);

    function w(e) {
        var t = e[0],
            n = e[1];
        return null != M[t] ? M[t](n) : null
    }

    function U(e) {
        var t = {};
        if (null == e) return t;
        var n = e,
            r = Array.isArray(n),
            i = 0;
        for (n = r ? n : n[Symbol.iterator]();;) {
            var a;
            if (r) {
                if (i >= n.length) break;
                a = n[i++]
            } else {
                if ((i = n.next()).done) break;
                a = i.value
            }
            var o = a,
                s = o.b,
                u = o.k,
                l = Array.isArray(u),
                c = 0;
            for (u = l ? u : u[Symbol.iterator]();;) {
                var d;
                if (l) {
                    if (c >= u.length) break;
                    d = u[c++]
                } else {
                    if ((c = u.next()).done) break;
                    d = c.value
                }
                t[d] = s
            }
        }
        return t
    }

    function k(e) {
        var t = e.experiments,
            n = e.guildExperiments;
        S = {}, t.forEach(function(e) {
            var t = e[0],
                n = e[1],
                r = e[2],
                i = e[3];
            S[t] = {
                type: "user",
                revision: n,
                bucket: r,
                override: 0 === i
            }
        }), A = {}, O = {}, null != n && n.forEach(function(e) {
            var t = e[0],
                n = e[1],
                r = e[2],
                i = e[3],
                a = e[4],
                o = e[5];
            A[t] = {
                hashKey: n,
                revision: r,
                buckets: i.map(function(e) {
                    return {
                        bucket: e[0],
                        positions: e[1].map(function(e) {
                            return {
                                start: e.s,
                                end: e.e
                            }
                        })
                    }
                }),
                filters: a.map(w),
                overrides: U(o),
                rawFilterData: a
            }
        }), T = !0
    }
    var x = 1e4;

    function G() {
        u.default.set(m, {
            v: v,
            e: y
        })
    }

    function F(e) {
        var t, n = e.experimentId,
            r = e.experimentType,
            i = e.clientFilter,
            a = e.title,
            o = e.description,
            s = e.buckets;
        I = E({}, I, ((t = {})[n] = {
            type: r,
            clientFilter: i,
            title: a,
            description: o,
            buckets: s
        }, t))
    }
    var Y = new(function(e) {
        var t, n;

        function r() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var i, a, s, l = r.prototype;
        return l.initialize = function() {
            y = function() {
                var e = u.default.get(m);
                if (null == e || e.v !== v) return {};
                var t = e.e,
                    n = Date.now(),
                    r = !1;
                for (var i in t) n - t[i].time > N && (delete t[i], r = !0);
                return r && G(), t
            }(), b = function() {
                var e = u.default.get(g) || {},
                    t = !1;
                for (var n in e) {
                    var r = e[n];
                    (null == r || r.type !== f.ExperimentTypes.USER && r.type !== f.ExperimentTypes.GUILD || null == r.bucket || !0 !== r.override) && (delete e[n], t = !0)
                }
                return t && u.default.set(g, e), e
            }()
        }, l.hasRegisteredExperiment = function(e) {
            return null != I[e]
        }, l.isEligibleForExperiment = function(e, t) {
            if (null == I[e]) return !1;
            var n = I[e].clientFilter;
            return null == n || n.isEligible(t)
        }, l.getUserExperimentDescriptor = function(e) {
            if (T) {
                var t = b[e];
                if (null != t && t.type === f.ExperimentTypes.USER) return t
            }
            if (!this.isEligibleForExperiment(e)) return null;
            var n = o.default.v3(e);
            return S["" + n]
        }, l.getGuildExperimentDescriptor = function(e, t) {
            if (!T) {
                var n = b[e];
                if (null != n && n.type === f.ExperimentTypes.GUILD) return n
            }
            if (!this.isEligibleForExperiment(e, {
                    guildId: t
                })) return null;
            var r = t + ":" + e;
            if (r in O) return O[r];
            var i = function(e, t) {
                var n = o.default.v3(t),
                    r = A["" + n];
                if (null == r) return null;
                var i = r.overrides[e];
                if (null != i) return i === f.ExperimentBuckets.NOT_ELIGIBLE ? null : {
                    type: f.ExperimentTypes.GUILD,
                    guildId: e,
                    revision: r.revision,
                    bucket: i,
                    override: !0
                };
                var a = (r.hashKey || t) + ":" + e,
                    s = o.default.v3(a) % x,
                    u = r.buckets.find(function(e) {
                        return e.positions.some(function(e) {
                            var t = e.start,
                                n = e.end;
                            return s >= t && s < n
                        })
                    }),
                    l = null != u ? u.bucket : f.ExperimentBuckets.CONTROL;
                if (l === f.ExperimentBuckets.NOT_ELIGIBLE) return null;
                if (null != r.filters) {
                    var c = r.filters,
                        d = Array.isArray(c),
                        p = 0;
                    for (c = d ? c : c[Symbol.iterator]();;) {
                        var _;
                        if (d) {
                            if (p >= c.length) break;
                            _ = c[p++]
                        } else {
                            if ((p = c.next()).done) break;
                            _ = p.value
                        }
                        if (null != _ && !_(e)) return null
                    }
                }
                return {
                    type: f.ExperimentTypes.GUILD,
                    guildId: e,
                    revision: r.revision,
                    bucket: l
                }
            }(t, e);
            return O[r] = i, i
        }, l.getUserExperimentBucket = function(e) {
            var t = this.getUserExperimentDescriptor(e);
            return null != t ? t.bucket : f.ExperimentBuckets.NOT_ELIGIBLE
        }, l.getGuildExperimentBucket = function(e, t) {
            var n = this.getGuildExperimentDescriptor(e, t);
            return null != n ? n.bucket : f.ExperimentBuckets.NOT_ELIGIBLE
        }, l.getAllUserExperimentDescriptors = function() {
            return S
        }, l.getRegisteredExperiments = function() {
            return I
        }, l.getAllExperimentOverrideDescriptors = function() {
            return b
        }, l.getExperimentOverrideDescriptor = function(e) {
            return T ? b[e] : null
        }, l.getSerializedState = function() {
            var e = {};
            for (var t in A) e[t] = E({}, A[t], {
                filters: []
            });
            return {
                hasLoadedExperiments: T,
                triggeredExperiments: y,
                loadedUserExperiments: S,
                loadedGuildExperiments: e,
                experimentOverrides: b
            }
        }, i = r, (a = [{
            key: "hasLoadedExperiments",
            get: function() {
                return T
            }
        }]) && h(i.prototype, a), s && h(i, s), r
    }(s.default.Store))(l.default, {
        LOGOUT: function(e) {
            return u.default.remove(m), u.default.remove(g), b = {}, S = {}, void(y = {})
        },
        LOGIN: function(e) {
            return T = !1, y = {}, void u.default.remove(m)
        },
        CONNECTION_OPEN: k,
        EXPERIMENTS_FETCH_SUCCESS: k,
        OVERLAY_INITIALIZE: function(e) {
            var t = e.serializedExperimentStore;
            for (var n in T = t.hasLoadedExperiments, y = t.triggeredExperiments, S = t.loadedUserExperiments, b = t.experimentOverrides, A = {}, O = {}, t.loadedGuildExperiments) {
                var r = t.loadedGuildExperiments[n];
                A[n] = E({}, r, {
                    filters: r.rawFilterData.map(w)
                })
            }
        },
        CACHE_LOADED: function(e) {
            return null != e.eligibleExperiments && (S = e.eligibleExperiments, !0)
        },
        EXPERIMENTS_FETCH_FAILURE: function(e) {
            T = !0
        },
        EXPERIMENT_TRIGGER: function(e) {
            var t = e.experimentId,
                n = e.descriptor;
            if (function(e, t) {
                    var n = y[R(e, t)];
                    return !(null == n || Date.now() - n.time > N) && n.hash === L(t)
                }(t, n)) return !1;
            n.type === f.ExperimentTypes.USER ? d.default.track(p.AnalyticEvents.EXPERIMENT_USER_TRIGGERED, {
                name: t,
                revision: n.revision,
                bucket: n.bucket
            }, !0) : n.type === f.ExperimentTypes.GUILD && d.default.track(p.AnalyticEvents.EXPERIMENT_GUILD_TRIGGERED, {
                name: t,
                revision: n.revision,
                bucket: n.bucket,
                guild_id: n.guildId
            }, !0), y[R(t, n)] = {
                time: Date.now(),
                hash: L(n)
            }, G()
        },
        EXPERIMENT_REGISTER: F,
        EXPERIMENT_REGISTER_LEGACY: function(e) {
            var t = e.store,
                n = e.renderFunctions,
                r = "function" == typeof t.getExperimentId ? t.getExperimentId() : null;
            if (!r) throw new Error("Experiment Store must have a static getExperimentId method defined");
            var i, o, s = "function" == typeof t.getMetaData ? t.getMetaData() : C;
            Object.keys(n).forEach(function(e) {
                if (e !== f.ExperimentTypes.NONE_LEGACY) {
                    (0, a.default)(null != n[e], "Unexpected missing renderFunctions"), i = e;
                    var t = Object.keys(n[e]).map(function(e) {
                        return parseInt(e)
                    });
                    o = t
                }
            }), F({
                experimentId: r,
                experimentType: i,
                clientFilter: null,
                title: s.title,
                description: s.description,
                buckets: o
            })
        },
        EXPERIMENT_REGISTER_SURVEY: function(e) {
            e.surveys.forEach(function(e) {
                var t, n = e.id,
                    r = e.title,
                    i = e.description;
                I = E({}, I, ((t = {})[n] = {
                    type: f.ExperimentTypes.USER,
                    title: r,
                    description: i,
                    buckets: [f.ExperimentBuckets.TREATMENT_1]
                }, t))
            })
        },
        EXPERIMENT_OVERRIDE_BUCKET: function(e) {
            var t, n = e.experimentId,
                r = e.experimentBucket,
                i = I[n];
            if (null == i) return !1;
            for (var a in null == r ? null != b[n] && delete(b = E({}, b))[n] : b = E({}, b, ((t = {})[n] = {
                    type: i.type,
                    revision: 1,
                    bucket: r,
                    override: !0
                }, t)), b) null == I[a] && delete b[a];
            u.default.set(g, b)
        }
    });
    t.default = Y
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = o(n(7)),
        i = o(n(3)),
        a = o(n(2));
    n(1);

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function u() {
        return (u = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var l = {};
    var c = new(function(e) {
        var t, n;

        function i() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = i).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var a, o, u, c = i.prototype;
        return c.isConnected = function(e) {
            return null != l[e]
        }, c.getApplication = function(e) {
            return l[e]
        }, c.getAllConnections = function() {
            return l
        }, a = i, (o = [{
            key: "connections",
            get: function() {
                return r.default.values(l)
            }
        }]) && s(a.prototype, o), u && s(a, u), i
    }(i.default.Store))(a.default, {
        OVERLAY_INITIALIZE: function(e) {
            var t = e.connectedApps;
            l = u({}, t)
        },
        RPC_APP_CONNECTED: function(e) {
            var t = e.application;
            if (null == t.id) return !1;
            var n = t.id;
            l[n] || (l[n] = {
                count: 0,
                id: t.id,
                name: t.name,
                icon: t.icon,
                coverImage: t.coverImage,
                authenticated: !1
            }), l[n].count++
        },
        RPC_APP_AUTHENTICATED: function(e) {
            var t = e.application;
            null != t.id && l[t.id] && (l[t.id].authenticated = !0)
        },
        RPC_APP_DISCONNECTED: function(e) {
            var t = e.application;
            null != t.id && l[t.id] && (l[t.id].count--, 0 === l[t.id].count && delete l[t.id])
        }
    });
    t.default = c
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = t.Emoji = void 0;
    var r = s(n(7)),
        i = s(n(188)),
        a = s(n(161)),
        o = n(1);

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function u(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    var l = null,
        c = {},
        d = {},
        f = {},
        p = {},
        _ = {},
        h = [],
        E = function() {
            function e(e) {
                var t = this;
                this.animated = !1, this.available = !0;
                var n = e.names,
                    a = e.surrogates,
                    s = n[0] || "";
                this.uniqueName = s, this.names = n, this.allNamesString = n.length > 1 ? ":" + n.join(": :") + ":" : ":" + s + ":", this.uniqueName = s, this.defaultUrl = i.default.getURL(a), this.surrogates = e.surrogates, this.useSpriteSheet = !1, this.index = null, this.urlForDiversitySurrogate = {}, this.diversitiesByName = {}, this.hasDiversity = e.hasDiversity, this.hasDiversity && r.default.each(o.DIVERSITY_SURROGATES, function(e, r) {
                    var o = a + e,
                        s = i.default.getURL(o);
                    s && (t.urlForDiversitySurrogate[e] = s), n.forEach(function(e) {
                        e = e + "::skin-tone-" + (r + 1), t.diversitiesByName[e] = {
                            name: e,
                            surrogatePair: o,
                            url: s
                        }
                    })
                })
            }
            var t, n, a, s = e.prototype;
            return s.forEachDiversity = function(e) {
                this.diversitiesByName && r.default.each(this.diversitiesByName, e)
            }, s.forEachName = function(e) {
                r.default.each(this.names, e)
            }, s.setSpriteSheetIndex = function(e) {
                this.index = e, this.useSpriteSheet = !0
            }, t = e, (n = [{
                key: "url",
                get: function() {
                    return this.hasDiversity && null != l ? this.urlForDiversitySurrogate[l] : this.defaultUrl
                }
            }, {
                key: "name",
                get: function() {
                    return this.hasDiversity && null !== l ? this.uniqueName + "::" + p[l] : this.uniqueName
                }
            }, {
                key: "surrogatePair",
                get: function() {
                    var e = this.diversitiesByName[this.name];
                    return null != e ? e.surrogatePair : this.surrogates
                }
            }]) && u(t.prototype, n), a && u(t, a), e
        }();
    t.Emoji = E;
    var m = 0,
        g = 0,
        v = n(4086);
    r.default.each(v, function(e, t) {
        c[t] = r.default.map(e, function(e) {
            var t = new E(e);
            return t.setSpriteSheetIndex(t.hasDiversity ? m++ : g++), t.managed = !0, p[t.surrogates] = t.uniqueName, t.forEachName(function(e) {
                d[e] = t, f[e] = t.surrogates
            }), t.forEachDiversity(function(e) {
                d[e.name] = t, f[e.name] = e.surrogatePair, p[e.surrogatePair] = e.name
            }), h.push(t), t
        })
    }), r.default.forEach(o.DIVERSITY_SURROGATES, function(e, t) {
        f["skin-tone-" + (t + 1)] = e, p[e] = "skin-tone-" + (t + 1)
    });
    var T = n(4087);
    r.default.each(T, function(e) {
        var t = e.emoji;
        e.shortcuts.forEach(function(e) {
            _[e] = t
        })
    });
    var y, I = /^:([^\s:]+?(?:::skin-tone-\d)?):/,
        S = (y = (0, r.default)(_).keys().map(a.default.escape).join("|"), new RegExp("^(" + y + ")"));

    function A(e, t) {
        return void 0 === t && (t = ""), Object.prototype.hasOwnProperty.call(f, e) ? f[e] : t
    }
    var O = {
        getDefaultDiversitySurrogate: function() {
            return l
        },
        setDefaultDiversitySurrogate: function(e) {
            l = e || null
        },
        getCategories: function() {
            return Object.keys(c)
        },
        getByName: function(e) {
            return Object.prototype.hasOwnProperty.call(d, e) ? d[e] : null
        },
        getByCategory: function(e) {
            return c[e]
        },
        translateInlineEmojiToSurrogates: function(e) {
            return e.replace(I, function(e, t) {
                return A(t, e)
            })
        },
        translateSurrogatesToInlineEmoji: function(e) {
            return r.default.toArray(e).map(function(e) {
                var t = p[e];
                return null != t ? ":" + t + ":" : e
            }).join("")
        },
        convertNameToSurrogate: A,
        convertSurrogateToName: function(e, t, n) {
            void 0 === t && (t = !0), void 0 === n && (n = "");
            var r = n;
            return Object.prototype.hasOwnProperty.call(p, e) && (r = p[e]), t ? ":" + r + ":" : r
        },
        convertShortcutToName: function(e, t, n) {
            void 0 === t && (t = !0), void 0 === n && (n = "");
            var r = n;
            return Object.prototype.hasOwnProperty.call(_, e) && (r = _[e]), t ? ":" + r + ":" : r
        },
        forEach: function(e) {
            return r.default.each(h, e)
        },
        all: function() {
            return h
        },
        numDiversitySprites: m,
        numNonDiversitySprites: g,
        EMOJI_NAME_RE: /^:([^\s:]+?(?:::skin-tone-\d)?):/,
        EMOJI_NAME_AND_DIVERSITY_RE: I,
        EMOJI_SHORTCUT_RE: S,
        hasSurrogates: function(e) {
            return r.default.toArray(e).some(function(e) {
                return null != p[e]
            })
        }
    };
    t.default = O
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.installApplication = I, t.updateApplication = S, t.repairApplication = function(e, t, n) {
        var r = f.default.getGame(e);
        if (null == r) return;
        return a.repairApplication(r, t, n)
    }, t.playApplication = A, t.getDefaultLibraryApplicationAction = b, t.performDefaultLibraryApplicationAction = function(e, t) {
        var n = b(e, c.default, d.default),
            r = t.analyticsParams;
        switch (n) {
            case m.LibraryApplicationActions.PLAY:
                return A(e.id, e, {
                    analyticsParams: r
                });
            case m.LibraryApplicationActions.INSTALL:
                return I(e.id, e.branchId, r.source);
            case m.LibraryApplicationActions.UPDATE:
                return S(e.id, e.branchId)
        }
    };
    var r = v(n(0)),
        i = v(n(728)),
        a = v(n(159)),
        o = g(n(99)),
        s = g(n(28)),
        u = g(n(4103)),
        l = n(90),
        c = g(n(66)),
        d = g(n(270)),
        f = g(n(21)),
        p = g(n(192)),
        _ = g(n(15)),
        h = n(160),
        E = n(4106),
        m = n(1);

    function g(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function v(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n)) {
                    var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                    r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                } return t.default = e, t
    }

    function T() {
        return (T = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }

    function y(e, t, n, r, i, a, o) {
        try {
            var s = e[a](o),
                u = s.value
        } catch (e) {
            return void n(e)
        }
        s.done ? t(u) : Promise.resolve(u).then(r, i)
    }

    function I(e, t, n) {
        var r = f.default.getGame(e);
        if (null != r) {
            var i = p.default.getTargetBuildId(r.id, t),
                a = p.default.getTargetManifests(r.id, t);
            null != i && null != a && null != E.installApplication && (0, E.installApplication)(r, t, i, a, n)
        }
    }

    function S(e, t) {
        var n = f.default.getGame(e);
        if (null != n) return a.updateApplication(n, t, p.default.getTargetBuildId(n.id, t), p.default.getTargetManifests(n.id, t))
    }

    function A(e, t, n) {
        return O.apply(this, arguments)
    }

    function O() {
        var e;
        return e = regeneratorRuntime.mark(function e(t, n, a) {
            var c, d, p, h, E, g, v;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (null != (c = f.default.getGame(t))) {
                            e.next = 3;
                            break
                        }
                        return e.abrupt("return");
                    case 3:
                        if (d = a.cloudSync, p = void 0 === d || d, h = a.cloudSyncForceHash, E = void 0 === h ? null : h, g = a.analyticsParams, !(p && null != n && n instanceof l.LibraryApplicationRecord)) {
                            e.next = 15;
                            break
                        }
                        return v = n.branchId, e.prev = 6, e.next = 9, i.sync(n.id, v, E);
                    case 9:
                        e.next = 15;
                        break;
                    case 11:
                        return e.prev = 11, e.t0 = e.catch(6), s.default.push(function(e) {
                            return r.createElement(u.default, e)
                        }, {
                            libraryApplication: n,
                            analyticsParams: g,
                            branchId: v
                        }), e.abrupt("return");
                    case 15:
                        return _.default.track(m.AnalyticEvents.APPLICATION_OPENED, T({
                            application_id: c.id,
                            application_name: c.name,
                            type: m.AnalyticsGameOpenTypes.LAUNCH,
                            distributor: null != n ? n.getDistributor() : null
                        }, g)), e.abrupt("return", o.default.launch(c.id, n instanceof l.LibraryApplicationRecord ? n.branchId : null));
                    case 17:
                    case "end":
                        return e.stop()
                }
            }, e, null, [
                [6, 11]
            ])
        }), (O = function() {
            var t = this,
                n = arguments;
            return new Promise(function(r, i) {
                var a = e.apply(t, n);

                function o(e) {
                    y(a, r, i, o, s, "next", e)
                }

                function s(e) {
                    y(a, r, i, o, s, "throw", e)
                }
                o(void 0)
            })
        }).apply(this, arguments)
    }

    function b(e, t, n) {
        if (e instanceof l.LocalApplicationRecord) return m.LibraryApplicationActions.PLAY;
        var r = t.getState(e.id, e.branchId),
            i = n.getQueuePosition(e.id, e.branchId),
            a = n.paused;
        if (null != r) {
            if (null == i || -1 === i) switch (r.type) {
                case m.LocalDispatchApplicationStates.INSTALLING:
                    return m.LibraryApplicationActions.INSTALL;
                case m.LocalDispatchApplicationStates.UPDATING:
                case m.LocalDispatchApplicationStates.UPDATE_REQUIRED:
                    return m.LibraryApplicationActions.UPDATE
            }
            switch (r.type) {
                case m.LocalDispatchApplicationStates.INSTALLING:
                case m.LocalDispatchApplicationStates.UPDATING:
                case m.LocalDispatchApplicationStates.UPDATE_REQUIRED:
                case m.LocalDispatchApplicationStates.REPAIRING:
                    return i > 0 ? m.LibraryApplicationActions.MOVE_UP : a ? m.LibraryApplicationActions.RESUME : m.LibraryApplicationActions.PAUSE;
                case m.LocalDispatchApplicationStates.UP_TO_DATE:
                    return m.LibraryApplicationActions.PLAY;
                case m.LocalDispatchApplicationStates.UNINSTALLING:
                    return null
            }
        }
        return null != i && i > 0 ? m.LibraryApplicationActions.MOVE_UP : (0, h.isSupportedPlatform)() ? m.LibraryApplicationActions.INSTALL : null
    }
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.init = function(e, t) {
        f.default.init(e, t, o.default.installationPaths, (0, c.getBuildPlatform)(), function(e) {
            i.default.dispatch({
                type: E.ActionTypes.DISPATCH_APPLICATION_STATE_UPDATE,
                state: e
            })
        }, function(e) {
            i.default.dispatch({
                type: E.ActionTypes.DISPATCH_APPLICATION_ERROR,
                error: e
            })
        })
    }, t.destroy = function() {
        f.default.destroy()
    }, t.installApplication = function(e, t, n, r, a, o) {
        f.default.setTargetManifest(e.id, e.name, e.icon, t, n, r, a), i.default.dispatch({
            type: E.ActionTypes.DISPATCH_APPLICATION_INSTALL,
            applicationId: e.id,
            branchId: t,
            installationPath: a
        }), l.default.track(E.AnalyticEvents.LIBRARY_INSTALL_INITIATED, {
            application_id: e.id,
            application_name: e.name,
            sku_id: e.primarySkuId,
            location: o
        })
    }, t.repairApplication = function(e, t, n) {
        (0, _.fetchLiveBuild)(e.id, t).then(function() {
            i.default.dispatch({
                type: E.ActionTypes.DISPATCH_APPLICATION_REPAIR,
                applicationId: e.id,
                branchId: t
            })
        }), l.default.track(E.AnalyticEvents.LIBRARY_REPAIR_INITIATED, {
            application_id: e.id,
            application_name: e.name,
            sku_id: e.primarySkuId,
            location: n
        })
    }, t.setTargetManifest = y, t.updateApplication = function(e, t, n, r, a) {
        void 0 === a && (a = !1);
        y(e, t, n, r), i.default.dispatch({
            type: E.ActionTypes.DISPATCH_APPLICATION_UPDATE,
            applicationId: e.id,
            branchId: t,
            automatic: a
        })
    }, t.uninstallApplication = I, t.resume = function() {
        f.default.resume()
    }, t.pause = function() {
        f.default.pause()
    }, t.moveUp = function(e, t) {
        i.default.dispatch({
            type: E.ActionTypes.DISPATCH_APPLICATION_MOVE_UP,
            applicationId: e,
            branchId: t
        })
    }, t.cancel = function(e, t) {
        f.default.cancel(e, t), i.default.dispatch({
            type: E.ActionTypes.DISPATCH_APPLICATION_CANCEL,
            applicationId: e,
            branchId: t
        })
    }, t.removeFinished = function(e, t) {
        i.default.dispatch({
            type: E.ActionTypes.DISPATCH_APPLICATION_REMOVE_FINISHED,
            applicationId: e,
            branchId: t
        })
    }, t.completeRepair = function(e, t) {
        var n = a.default.getGame(e);
        null != n && d.default.createShortcuts(u.default.installShortcutDesktop, u.default.installShortcutStartMenu, n.name, n.id, t.installPath)
    }, t.completeInstall = function(e, t) {
        var i = a.default.getGame(e);
        r.default.post({
            url: E.Endpoints.LIBRARY_APPLICATION_INSTALLED(e, e)
        }), null != i && (d.default.createShortcuts(u.default.installShortcutDesktop, u.default.installShortcutStartMenu, i.name, i.id, t.installPath), Promise.resolve().then(n.t.bind(null, 457, 7)).then(function(e) {
            e.default.showNotification(i.getIconURL(T), m.default.Messages.GAME_LIBRARY_NOTIFICATION_GAME_INSTALLED_TITLE, m.default.Messages.GAME_LIBRARY_NOTIFICATION_GAME_INSTALLED_BODY.format({
                name: i.name
            }), {
                onClick: function() {
                    return p.default.transitionTo(E.Routes.APPLICATION_LIBRARY)
                }
            })
        }))
    }, t.uninstallBranchPrompt = function(e, t, n) {
        ! function(e, t) {
            var n = a.default.getGame(e);
            if (!n) return void console.log("Application not found for game " + e);
            h.default.push(function() {
                return v({
                    game: n,
                    onConfirmUninstall: t,
                    onCancel: h.default.pop
                })
            })
        }(e, function() {
            return I(e, t, n)
        })
    };
    var r = g(n(12)),
        i = g(n(2)),
        a = (g(n(80)), g(n(21))),
        o = g(n(191)),
        s = g(n(44)),
        u = g(n(23)),
        l = g(n(15)),
        c = n(401),
        d = g(n(201)),
        f = g(n(298)),
        p = g(n(37)),
        _ = n(347),
        h = g(n(28)),
        E = n(1),
        m = g(n(5));

    function g(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var v = function() {
        return null
    };
    v = n(4075).default;
    var T = 64;

    function y(e, t, n, r) {
        if (!s.default.getRunningDiscordApplicationIds().includes(e.id)) {
            var i = o.default.getInstallationPath(e.id, t);
            if (null == i) throw new Error("Missing installation path for application: " + e.id + " " + t);
            f.default.setTargetManifest(e.id, e.name, e.icon, t, n, r, i)
        }
    }

    function I(e, t, n) {
        var r = a.default.getGame(e);
        null != r && (d.default.removeShortcuts(r.name), l.default.track(E.AnalyticEvents.LIBRARY_UNINSTALL_INITIATED, {
            application_id: r.id,
            application_name: r.name,
            sku_id: r.primarySkuId,
            location: n
        })), f.default.uninstall(e, t), i.default.dispatch({
            type: E.ActionTypes.DISPATCH_APPLICATION_UNINSTALL,
            applicationId: e,
            branchId: t
        })
    }
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.isSupportedPlatform = function() {
        return a.default.isWindows() || a.default.isOSX()
    }, t.isLaunchable = function(e, t, n, r, a, o) {
        if (r.isConnected(a)) return !0;
        null == o && (o = a);
        if (n.isLaunchable(a, o)) return !0;
        var s = e.getLibraryApplication(a, o);
        if (null != s && (0, i.isUserEntitledToLibraryApplication)(s)) return !1;
        return t.isLaunchable(a)
    };
    var r, i = n(89),
        a = (r = n(13)) && r.__esModule ? r : {
            default: r
        }
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    t.default = {
        escape: function(e) {
            return e.replace(/[-[\]\/{}()*+?.\\^$|]/g, "\\$&")
        }
    }
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.fetchLibrary = function() {
        return _.apply(this, arguments)
    }, t.createTestModeLibraryApplications = function(e) {
        return h.apply(this, arguments)
    }, t.updateFlags = function(e, t, n) {
        return i.default.dispatch({
            type: c.ActionTypes.LIBRARY_APPLICATION_FLAGS_UPDATE_START,
            applicationId: e,
            branchId: t,
            flags: n
        }), r.default.patch({
            url: c.Endpoints.LIBRARY_APPLICATION_BRANCH(e, t),
            body: {
                flags: n
            }
        }).then(function(e) {
            i.default.dispatch({
                type: c.ActionTypes.LIBRARY_APPLICATION_FLAGS_UPDATE_SUCCESS,
                libraryApplication: e.body
            })
        })
    }, t.setActiveLaunchOptionId = function(e, t, n) {
        i.default.dispatch({
            type: c.ActionTypes.LIBRARY_APPLICATION_ACTIVE_LAUNCH_OPTION_UPDATE,
            applicationId: e,
            branchId: t,
            launchOptionId: n
        })
    };
    var r = d(n(12)),
        i = d(n(2)),
        a = d(n(80)),
        o = n(90),
        s = d(n(21)),
        u = n(151),
        l = d(n(99)),
        c = n(1);

    function d(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function f(e, t, n, r, i, a, o) {
        try {
            var s = e[a](o),
                u = s.value
        } catch (e) {
            return void n(e)
        }
        s.done ? t(u) : Promise.resolve(u).then(r, i)
    }

    function p(e) {
        return function() {
            var t = this,
                n = arguments;
            return new Promise(function(r, i) {
                var a = e.apply(t, n);

                function o(e) {
                    f(a, r, i, o, s, "next", e)
                }

                function s(e) {
                    f(a, r, i, o, s, "throw", e)
                }
                o(void 0)
            })
        }
    }

    function _() {
        return (_ = p(regeneratorRuntime.mark(function e() {
            var t;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return e.prev = 0, e.next = 3, (0, u.httpGetWithCountryCodeQuery)({
                            url: c.Endpoints.LIBRARY
                        });
                    case 3:
                        t = e.sent, i.default.dispatch({
                            type: c.ActionTypes.LIBRARY_FETCH_SUCCESS,
                            libraryApplications: t.body
                        }), e.next = 10;
                        break;
                    case 7:
                        e.prev = 7, e.t0 = e.catch(0), i.default.dispatch({
                            type: c.ActionTypes.LIBRARY_FETCH_FAIL,
                            error: e.t0
                        });
                    case 10:
                    case "end":
                        return e.stop()
                }
            }, e, null, [
                [0, 7]
            ])
        }))).apply(this, arguments)
    }

    function h() {
        return (h = p(regeneratorRuntime.mark(function e(t) {
            var n, u, d, f;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (null != (n = s.default.getGame(t))) {
                            e.next = 7;
                            break
                        }
                        return e.t0 = a.default, e.next = 5, l.default.fetchApplication(t);
                    case 5:
                        e.t1 = e.sent, n = e.t0.createFromServer.call(e.t0, e.t1);
                    case 7:
                        if (null != (u = n.primarySkuId)) {
                            e.next = 10;
                            break
                        }
                        return e.abrupt("return");
                    case 10:
                        return e.next = 12, r.default.get({
                            url: c.Endpoints.APPLICATION_BRANCH_LIST(t)
                        }).then(function(e) {
                            return e.body
                        });
                    case 12:
                        d = e.sent, f = d.map(function(e) {
                            return o.LibraryApplicationRecord.createForTestMode({
                                id: t,
                                skuId: u,
                                branch: e
                            })
                        }), i.default.dispatch({
                            type: c.ActionTypes.LIBRARY_APPLICATIONS_TEST_MODE_ENABLED,
                            libraryApplications: f
                        });
                    case 15:
                    case "end":
                        return e.stop()
                }
            }, e)
        }))).apply(this, arguments)
    }
},
function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
},
function(e, t) {
    var n = 0,
        r = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
    }
},
function(e, t) {
    e.exports = !1
},
function(e, t, n) {
    var r = n(504),
        i = n(367);
    e.exports = Object.keys || function(e) {
        return r(e, i)
    }
},
function(e, t, n) {
    var r = n(112),
        i = Math.max,
        a = Math.min;
    e.exports = function(e, t) {
        return (e = r(e)) < 0 ? i(e + t, 0) : a(e, t)
    }
},
function(e, t, n) {
    var r = n(31),
        i = n(505),
        a = n(367),
        o = n(366)("IE_PROTO"),
        s = function() {},
        u = function() {
            var e, t = n(364)("iframe"),
                r = a.length;
            for (t.style.display = "none", n(368).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), u = e.F; r--;) delete u.prototype[a[r]];
            return u()
        };
    e.exports = Object.create || function(e, t) {
        var n;
        return null !== e ? (s.prototype = r(e), n = new s, s.prototype = null, n[o] = e) : n = u(), void 0 === t ? n : i(n, t)
    }
},
function(e, t, n) {
    var r = n(504),
        i = n(367).concat("length", "prototype");
    t.f = Object.getOwnPropertyNames || function(e) {
        return r(e, i)
    }
},
function(e, t, n) {
    var r = n(91),
        i = n(73),
        a = n(366)("IE_PROTO"),
        o = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = i(e), r(e, a) ? e[a] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? o : null
    }
},
function(e, t, n) {
    var r = n(42)("unscopables"),
        i = Array.prototype;
    null == i[r] && n(92)(i, r, {}), e.exports = function(e) {
        i[r][e] = !0
    }
},
function(e, t, n) {
    var r = n(32);
    e.exports = function(e, t) {
        if (!r(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");
        return e
    }
},
function(e, t, n) {
    "use strict";
    (function(t) {
        var r = n(128),
            i = n(706),
            a = n(294),
            o = n(231),
            s = (n(232), n(395)),
            u = t.Set || n(1560);
        var l = function(e) {
            var t, n;

            function r(t) {
                var n;
                return (n = e.call(this) || this)._value = t, n._offset = 0, n._animation = null, n._listeners = {}, n
            }
            n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
            var l = r.prototype;
            return l.__detach = function() {
                this.stopAnimation()
            }, l.__getValue = function() {
                return this._value + this._offset
            }, l.setValue = function(e) {
                this._animation && (this._animation.stop(), this._animation = null), this._updateValue(e)
            }, l.setOffset = function(e) {
                this._offset = e
            }, l.flattenOffset = function() {
                this._value += this._offset, this._offset = 0
            }, l.addListener = function(e) {
                var t = s();
                return this._listeners[t] = e, t
            }, l.removeListener = function(e) {
                delete this._listeners[e]
            }, l.removeAllListeners = function() {
                this._listeners = {}
            }, l.stopAnimation = function(e) {
                this.stopTracking(), this._animation && this._animation.stop(), this._animation = null, e && e(this.__getValue())
            }, l.interpolate = function(e) {
                return new a(this, o.create(e))
            }, l.animate = function(e, t) {
                var n = this,
                    r = null;
                e.__isInteraction && (r = i.current.createInteractionHandle());
                var a = this._animation;
                this._animation && this._animation.stop(), this._animation = e, e.start(this._value, function(e) {
                    n._updateValue(e)
                }, function(e) {
                    n._animation = null, null !== r && i.current.clearInteractionHandle(r), t && t(e)
                }, a)
            }, l.stopTracking = function() {
                this._tracking && this._tracking.__detach(), this._tracking = null
            }, l.track = function(e) {
                this.stopTracking(), this._tracking = e
            }, l._updateValue = function(e) {
                var t, n;
                for (var r in this._value = e, t = this, n = new u,
                        function e(t) {
                            "function" == typeof t.update ? n.add(t) : t.__getChildren().forEach(e)
                        }(t), n.forEach(function(e) {
                            return e.update()
                        }), this._listeners) this._listeners[r]({
                    value: this.__getValue()
                })
            }, r
        }(r);
        e.exports = l
    }).call(this, n(25))
},
function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.INIT_COORDS = "dnd-core/INIT_COORDS", t.BEGIN_DRAG = "dnd-core/BEGIN_DRAG", t.PUBLISH_DRAG_SOURCE = "dnd-core/PUBLISH_DRAG_SOURCE", t.HOVER = "dnd-core/HOVER", t.DROP = "dnd-core/DROP", t.END_DRAG = "dnd-core/END_DRAG"
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.isFunction = function(e) {
        return "function" == typeof e
    }, t.noop = function() {}, t.isPlainObject = function(e) {
        if (! function(e) {
                return "object" == typeof e && null !== e
            }(e)) return !1;
        if (null === Object.getPrototypeOf(e)) return !0;
        var t = e;
        for (; null !== Object.getPrototypeOf(t);) t = Object.getPrototypeOf(t);
        return Object.getPrototypeOf(e) === t
    }
}, ,
function(e, t, n) {
    "use strict";
    (function(e) {
        t.__esModule = !0, t.default = t.HorizontalScroller = t.Themes = void 0;
        var r, i = function(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        if (Object.prototype.hasOwnProperty.call(e, n)) {
                            var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                            r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                        } return t.default = e, t
            }(n(0)),
            a = _(n(9)),
            o = _(n(38)),
            s = _(n(203)),
            u = _(n(118)),
            l = _(n(1577)),
            c = n(75),
            d = n(106),
            f = n(1),
            p = _(n(473));

        function _(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function h(e, t, n, i) {
            r || (r = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);
            var a = e && e.defaultProps,
                o = arguments.length - 3;
            if (t || 0 === o || (t = {
                    children: void 0
                }), t && a)
                for (var s in a) void 0 === t[s] && (t[s] = a[s]);
            else t || (t = a || {});
            if (1 === o) t.children = i;
            else if (o > 1) {
                for (var u = new Array(o), l = 0; l < o; l++) u[l] = arguments[l + 3];
                t.children = u
            }
            return {
                $$typeof: r,
                type: e,
                key: void 0 === n ? null : "" + n,
                ref: null,
                props: t,
                _owner: null
            }
        }

        function E(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        function m(e, t) {
            e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
        }
        var g = Object.freeze({
                DEFAULT: "1",
                STORE: "2"
            }),
            v = function() {
                var e = document.body;
                if (null == e) return !1;
                var t = document.createElement("div");
                t.className = p.default.testStyles, e.appendChild(t);
                var n = 2 !== t.offsetWidth - t.clientWidth;
                return e.removeChild(t), t = null, n
            }(),
            T = Object.freeze({
                DARK: p.default.themeDark,
                LIGHT: p.default.themeLight,
                GHOST: p.default.themeGhost,
                GHOST_HAIRLINE: p.default.themeGhostHairline,
                GHOST_HAIRLINE_CHANNELS: p.default.themeGhostHairlineChannels,
                MESSAGES_THEMED_WITH_TRACK: p.default.themedWithTrack,
                HIDDEN: p.default.themeHidden
            });
        t.Themes = T;
        var y = function(e) {
            function t(t) {
                var n;
                return (n = e.call(this, t) || this)._springer = null, n._invalidFullState = !0, n._invalidLightState = !1, n._scrollerRef = null, n._stickyHeaderRef = null, n.setScrollerRef = function(e) {
                    n._scrollerRef = e
                }, n.setStickyHeaderRef = function(e) {
                    n._stickyHeaderRef = e
                }, n.handleOnScroll = function() {
                    var e = n.props.onScroll;
                    n._invalidLightState = !0, null != e && e(E(n)), n.state.needsScrollbar && n.updateScrollBar()
                }, n.handleResize = function() {
                    var e = n.props.onResize;
                    n._invalidFullState = !0, null != e && e(E(n))
                }, n.updateScrollBar = function() {
                    var e = n.state,
                        t = e.thumbHeight,
                        r = e.thumbTop,
                        i = n.getScrollbarHeight() >> 0,
                        a = n.getScrollbarOffset() >> 0;
                    t.setValue(i), r.setValue(a)
                }, n.setLightScrollerState = function(e) {
                    n._scrollerRef && (n.scrollerState.scrollTop = n._scrollerRef.scrollTop, n._invalidLightState = !1, null != e && e(E(n)), n.state.needsScrollbar && n.updateScrollBar())
                }, n.setFullScrollerState = function(e) {
                    if (n._scrollerRef) {
                        var t = n._scrollerRef,
                            r = E(n).scrollerState;
                        r.offsetHeight = Math.min(t.offsetHeight, window.innerHeight), r.offsetWidth = Math.min(t.offsetWidth, window.innerWidth), r.scrollTop = t.scrollTop, r.scrollHeight = t.scrollHeight, n._invalidFullState = !1, n._invalidLightState = !1, null != e && e(E(n)), n.state.needsScrollbar && n.updateScrollBar()
                    }
                }, n.scrollPageUpAnimated = function(e) {
                    return void 0 === e && (e = !1), n.scrollPageUp(!0, e)
                }, n.scrollPageDown = function(e, t) {
                    void 0 === e && (e = !1), void 0 === t && (t = !1);
                    var r, i = n.getScrollData();
                    r = t ? Math.min(i.scrollTop + i.pageHeight, i.scrollHeight - i.offsetHeight) : Math.min(i.scrollTop + i.pageHeight, i.scrollHeight), n.scrollTo(r, e)
                }, n.scrollPageDownAnimated = function(e) {
                    return void 0 === e && (e = !1), n.scrollPageDown(!0, e)
                }, n.invalidateScrollerState = function() {
                    n._invalidFullState = !0
                }, n.scrollerState = {
                    offsetWidth: 0,
                    offsetHeight: 0,
                    scrollTop: 0,
                    scrollHeight: 0
                }, n.state = {
                    thumbHeight: new s.default.Value(0),
                    thumbTop: new s.default.Value(0),
                    needsScrollbar: "Blink" !== o.default.layout && "WebKit" !== o.default.layout
                }, n._springer = new l.default(function(e, t) {
                    var r = n._scrollerRef,
                        i = n.scrollerState,
                        a = i.offsetHeight,
                        o = i.scrollHeight;
                    if (r) {
                        var s = Math.max(e, 0);
                        r.scrollTop = s, (0 === s && t._vel < 0 || s + a > o && t._vel > 0) && t.cancel()
                    } else t.cancel()
                }), n
            }
            m(t, e);
            var n = t.prototype;
            return n.componentDidMount = function() {
                var e = this.props.keyboardScroll;
                window.addEventListener("resize", this.handleResize), e && this.addComponentDispatchListeners()
            }, n.componentWillUnmount = function() {
                this._springer && this._springer.cancel(), window.removeEventListener("resize", this.handleResize), this.props.keyboardScroll && this.removeComponentDispatchListeners()
            }, n.componentDidUpdate = function(e) {
                if (e.windowSize !== this.props.windowSize) return this.handleResize();
                this.props.keyboardScroll && !e.keyboardScroll ? this.addComponentDispatchListeners() : !this.props.keyboardScroll && e.keyboardScroll && this.removeComponentDispatchListeners()
            }, n.getSnapshotBeforeUpdate = function(e) {
                return (0, u.default)(e, this.props) || (this._invalidFullState = !0), null
            }, n.addComponentDispatchListeners = function() {
                c.ComponentDispatch.subscribe(f.ComponentActions.SCROLL_PAGE_UP, this.scrollPageUpAnimated), c.ComponentDispatch.subscribe(f.ComponentActions.SCROLL_PAGE_DOWN, this.scrollPageDownAnimated)
            }, n.removeComponentDispatchListeners = function() {
                c.ComponentDispatch.unsubscribe(f.ComponentActions.SCROLL_PAGE_UP, this.scrollPageUpAnimated), c.ComponentDispatch.unsubscribe(f.ComponentActions.SCROLL_PAGE_DOWN, this.scrollPageDownAnimated)
            }, n.render = function() {
                var e, t, n = this.props,
                    r = n.renderStickyHeader,
                    o = n.outerClassName,
                    u = n.className,
                    l = n.fade,
                    c = n.track,
                    f = n.theme,
                    _ = n.children,
                    E = n.style,
                    m = n.gutterStyle,
                    T = n.momentum,
                    y = null;
                if (this.state.needsScrollbar) {
                    var I = this.state,
                        S = I.thumbHeight,
                        A = I.thumbTop,
                        O = this.props.backgroundColor;
                    y = h("div", {
                        className: p.default.scrollbar,
                        style: {
                            backgroundColor: O
                        }
                    }, void 0, h("div", {
                        className: p.default.track
                    }), h(s.default.div, {
                        className: p.default.thumb,
                        style: {
                            height: S,
                            top: A
                        }
                    }), h("div", {
                        className: p.default.pad,
                        style: {
                            backgroundColor: O
                        }
                    }))
                }
                var b, N = null;
                if (r) {
                    var C = r();
                    C && (N = i.cloneElement(C, {
                        ref: this.setStickyHeaderRef
                    }))
                }
                return null != f && (b = p.default.scrollerThemed + " " + f), h("div", {
                    className: (0, a.default)((0, d.getClass)(p.default, "scrollerWrap", null != y ? "polyfill" : ""), o, b, (e = {}, e[p.default.scrollerFade] = l, e[p.default.scrollerTrack] = c, e))
                }, void 0, i.createElement("div", {
                    ref: this.setScrollerRef,
                    className: (0, a.default)(p.default.scroller, (t = {}, t[p.default.scrollerStore] = m === g.STORE, t[p.default.momentum] = T, t[p.default.systemPad] = v, t), u),
                    onScroll: this.handleOnScroll,
                    style: E
                }, N, _), y)
            }, n.getScrollbarOffset = function() {
                this._invalidLightState && this.setLightScrollerState();
                var e = this.scrollerState,
                    t = e.scrollHeight,
                    n = e.offsetHeight,
                    r = e.scrollTop,
                    i = t - n,
                    a = 0 === i ? 0 : r / i;
                return (n - this.getScrollbarHeight()) * a
            }, n.getScrollbarHeight = function() {
                var e = this.scrollerState,
                    t = e.scrollHeight,
                    n = e.offsetHeight;
                return 0 === t || t <= n ? 0 : n / t * n
            }, n.getScrollerNode = function() {
                return this._scrollerRef
            }, n.scrollTo = function(e, t, n) {
                var r = this;
                void 0 === t && (t = !1), void 0 === n && (n = null), Promise.resolve().then(function() {
                    var i = r._scrollerRef,
                        a = r._springer;
                    if (null != i && null != a) {
                        var o = i.scrollTop,
                            s = i.scrollHeight,
                            u = i.offsetHeight,
                            l = Math.min(Math.max(0, e), s - u);
                        r._invalidLightState = !0, t && o !== l ? a.to(l >> 0, o, n) : (a.cancel(), i.scrollTop = l, n && n())
                    }
                })
            }, n.scrollIntoViewRect = function(e, t, n, r) {
                void 0 === n && (n = !1);
                var i = this.scrollerState,
                    a = i.scrollTop,
                    o = i.offsetHeight,
                    s = 0;
                this._stickyHeaderRef && (a += s = this._stickyHeaderRef.offsetTop + this._stickyHeaderRef.offsetHeight, o -= s), e >= a && t <= a + o || (e < a || t - e >= o ? this.scrollTo(e - s, n, r) : this.scrollTo(t - o, n, r))
            }, n.scrollIntoView = function(e, t, n, r, i) {
                if (void 0 === t && (t = !1), void 0 === n && (n = {
                        top: 0,
                        bottom: 0
                    }), null != e) {
                    var a = e.offsetTop + (null != i ? i : 0),
                        o = a + e.offsetHeight;
                    this.scrollIntoViewRect(a - n.top, o + n.bottom, t, r)
                }
            }, n.getScrollData = function() {
                this._invalidFullState ? this.setFullScrollerState() : this._invalidLightState && this.setLightScrollerState();
                var e = this.scrollerState,
                    t = e.offsetHeight,
                    n = e.scrollTop,
                    r = .8 * t - 50 >> 0;
                return r < 50 && (r = 50), {
                    scrollHeight: e.scrollHeight,
                    scrollTop: n,
                    offsetHeight: t,
                    pageHeight: r,
                    offsetWidth: e.offsetWidth
                }
            }, n.scrollPageUp = function(e, t) {
                void 0 === e && (e = !1), void 0 === t && (t = !1);
                var n, r = this.getScrollData();
                n = t ? Math.max(r.scrollTop - r.pageHeight, 0) : Math.max(r.scrollTop - r.pageHeight, 0 - r.pageHeight), this.scrollTo(n, e)
            }, n.scrollToBottom = function(e, t) {
                void 0 === e && (e = !1), void 0 === t && (t = null);
                var n = this.getScrollData();
                this.scrollTo(n.scrollHeight, e, t)
            }, n.isScrolledToBottom = function(e) {
                void 0 === e && (e = 0);
                var t = this.getScrollData(),
                    n = t.scrollHeight;
                return t.scrollTop + t.offsetHeight + e >= n
            }, n.getScrollTop = function() {
                var e = this._scrollerRef;
                return null == e ? 0 : e.scrollTop
            }, t
        }(i.PureComponent);
        y.displayName = "VerticalScroller", y.Themes = T, y.GutterStyles = g, y.defaultProps = {
            fade: !1,
            track: !1,
            gutterStyle: g.DEFAULT,
            momentum: !1,
            keyboardScroll: !1
        };
        var I = function(t) {
            function n(e) {
                var n;
                return (n = t.call(this, e) || this)._springer = null, n._invalidFullState = !0, n._invalidLightState = !1, n._scrollerRef = null, n._stickyHeaderRef = null, n.setScrollerRef = function(e) {
                    n._scrollerRef = e
                }, n.setStickyHeaderRef = function(e) {
                    n._stickyHeaderRef = e
                }, n.handleOnScroll = function() {
                    var e = n.props.onScroll;
                    n._invalidLightState = !0, null != e && e(E(n))
                }, n.handleResize = function() {
                    null != n.props.onResize && n.setFullScrollerState(n.props.onResize)
                }, n.updateScrollBar = function() {
                    var e = n.state,
                        t = e.thumbWidth,
                        r = e.thumbLeft,
                        i = n.getScrollbarWidth() >> 0,
                        a = n.getScrollbarOffset() >> 0;
                    t.setValue(i), r.setValue(a)
                }, n.setLightScrollerState = function(e) {
                    n._scrollerRef && (n.scrollerState.scrollLeft = n._scrollerRef.scrollLeft, n._invalidLightState = !1, null != e && e(E(n)), n.state.needsScrollbar && n.updateScrollBar())
                }, n.setFullScrollerState = function(e) {
                    if (n._scrollerRef) {
                        var t = n._scrollerRef,
                            r = E(n).scrollerState;
                        r.offsetWidth = t.offsetWidth, r.scrollLeft = t.scrollLeft, r.scrollWidth = t.scrollWidth, n._invalidFullState = !1, n._invalidLightState = !1, null != e && e(E(n)), n.state.needsScrollbar && n.updateScrollBar()
                    }
                }, n.scrollerState = {
                    offsetWidth: 0,
                    scrollLeft: 0,
                    scrollWidth: 0
                }, n.state = {
                    thumbWidth: new s.default.Value(0),
                    thumbLeft: new s.default.Value(0),
                    needsScrollbar: "Blink" !== o.default.layout && "WebKit" !== o.default.layout
                }, n._springer = new l.default(function(e, t) {
                    var r = n._scrollerRef,
                        i = n.scrollerState,
                        a = i.offsetWidth,
                        o = i.scrollWidth;
                    if (r) {
                        var s = e;
                        s < 0 && (s = 0), r.scrollLeft = s, (0 === s && t._vel < 0 || s + a > o && t._vel > 0) && t.cancel()
                    } else t.cancel()
                }), n
            }
            m(n, t);
            var r = n.prototype;
            return r.componentDidMount = function() {
                this.setFullScrollerState(), window.addEventListener("resize", this.handleResize)
            }, r.componentWillUnmount = function() {
                this._springer && this._springer.cancel(), window.removeEventListener("resize", this.handleResize)
            }, r.getSnapshotBeforeUpdate = function(e) {
                return (0, u.default)(e, this.props) || (this._invalidFullState = !0), null
            }, r.componentDidUpdate = function(e) {
                if (e.windowSize !== this.props.windowSize) return this.handleResize()
            }, r.render = function() {
                var e, t, n = this.props,
                    r = n.renderStickyHeader,
                    o = n.outerClassName,
                    u = n.className,
                    l = n.fade,
                    c = n.track,
                    f = n.theme,
                    _ = n.children,
                    E = n.style,
                    m = n.gutterStyle,
                    v = n.momentum,
                    T = null;
                if (this.state.needsScrollbar) {
                    var y = this.state,
                        I = y.thumbWidth,
                        S = y.thumbLeft,
                        A = this.props.backgroundColor;
                    T = h("div", {
                        className: p.default.scrollbar,
                        style: {
                            backgroundColor: A
                        }
                    }, void 0, h("div", {
                        className: p.default.track
                    }), h(s.default.div, {
                        className: p.default.thumb,
                        style: {
                            width: I,
                            left: S
                        }
                    }), h("div", {
                        className: p.default.pad,
                        style: {
                            backgroundColor: A
                        }
                    }))
                }
                var O, b = null;
                if (r) {
                    var N = r();
                    N && (b = i.cloneElement(N, {
                        ref: this.setStickyHeaderRef
                    }))
                }
                return null != f && (O = p.default.scrollerThemed + " " + f), h("div", {
                    className: (0, a.default)((0, d.getClass)(p.default, "scrollerWrap", null != T ? "polyfill" : ""), o, O, (e = {}, e[p.default.scrollerFade] = l, e[p.default.scrollerTrack] = c, e))
                }, void 0, i.createElement("div", {
                    ref: this.setScrollerRef,
                    className: (0, a.default)(p.default.scroller, p.default.scrollerHorizontal, (t = {}, t[p.default.scrollerStore] = m === g.STORE, t[p.default.momentum] = v, t), u),
                    onScroll: this.handleOnScroll,
                    style: E
                }, b, _), T)
            }, r.getScrollbarOffset = function() {
                var e = this.scrollerState,
                    t = e.scrollWidth,
                    n = e.offsetWidth,
                    r = e.scrollLeft,
                    i = t - n,
                    a = 0 === i ? 0 : r / i;
                return (n - this.getScrollbarWidth()) * a
            }, r.getScrollbarWidth = function() {
                var e = this.scrollerState,
                    t = e.scrollWidth,
                    n = e.offsetWidth;
                return 0 === t || t <= n ? 0 : n / t * n
            }, r.getScrollerNode = function() {
                return this._scrollerRef
            }, r.scrollTo = function(t, n, r) {
                void 0 === n && (n = !1), void 0 === r && (r = null);
                var i = this._scrollerRef,
                    a = this._springer;
                if (null != i && null != a) {
                    var o = i.scrollLeft,
                        s = i.scrollWidth,
                        u = i.offsetWidth,
                        l = t;
                    l = Math.min(Math.max(0, l), s - u), this._invalidLightState = !0, n && o !== l ? a.to(l >> 0, o, r) : (a.cancel(), i.scrollLeft = l, r && e.nextTick(r))
                }
            }, r.scrollIntoViewRect = function(e, t, n, r) {
                void 0 === n && (n = !1);
                var i = this.scrollerState,
                    a = i.scrollLeft,
                    o = i.offsetWidth,
                    s = 0;
                this._stickyHeaderRef && (a += s = this._stickyHeaderRef.offsetLeft + this._stickyHeaderRef.offsetWidth, o -= s), e >= a && t <= a + o || (e < a ? this.scrollTo(e - s, n, r) : this.scrollTo(t - o, n, r))
            }, r.scrollIntoView = function(e, t, n, r) {
                void 0 === t && (t = !1), void 0 === n && (n = {
                    left: 0,
                    right: 0
                });
                var i = e.offsetLeft,
                    a = i + e.offsetWidth;
                this.scrollIntoViewRect(i - n.left, a + n.right, t, r)
            }, r.getScrollData = function() {
                this._invalidFullState ? this.setFullScrollerState() : this._invalidLightState && this.setLightScrollerState();
                var e = this.scrollerState,
                    t = e.offsetWidth,
                    n = e.scrollLeft,
                    r = .8 * t - 50 >> 0;
                return r < 50 && (r = 50), {
                    scrollWidth: e.scrollWidth,
                    scrollLeft: n,
                    offsetWidth: t,
                    pageWidth: r
                }
            }, r.scrollPageLeft = function(e, t) {
                void 0 === e && (e = !1), void 0 === t && (t = !1);
                var n, r = this.getScrollData();
                n = t ? Math.max(r.scrollLeft - r.pageWidth, 0) : Math.max(r.scrollLeft - r.pageWidth, 0 - r.pageWidth), this.scrollTo(n, e)
            }, r.scrollPageRight = function(e, t) {
                void 0 === e && (e = !1), void 0 === t && (t = !1);
                var n, r = this.getScrollData();
                n = t ? Math.min(r.scrollLeft + r.pageWidth, r.scrollWidth - r.offsetWidth) : Math.min(r.scrollLeft + r.pageWidth, r.scrollWidth), this.scrollTo(n, e)
            }, r.scrollToRight = function(e, t) {
                void 0 === e && (e = !1), void 0 === t && (t = null);
                var n = this.getScrollData();
                this.scrollTo(n.scrollWidth, e, t)
            }, n
        }(i.PureComponent);
        t.HorizontalScroller = I, I.displayName = "HorizontalScroller", I.Themes = T, I.GutterStyles = g, I.defaultProps = {
            fade: !1,
            track: !1,
            gutterStyle: g.DEFAULT
        };
        var S = y;
        t.default = S
    }).call(this, n(119))
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = s(n(3)),
        i = s(n(2)),
        a = s(n(13)),
        o = n(439);
    n(1);

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var u = (0, o.isFullScreen)(),
        l = a.default.hasFocus(),
        c = {
            width: 0,
            height: 0
        };

    function d() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    function f() {
        var e = d();
        return (c.width !== e.width || c.height !== e.height) && (c = e, !0)
    }
    f();
    var p = new(function(e) {
        var t, n;

        function r() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var i = r.prototype;
        return i.initialize = function() {
            var e = this;
            c = d();
            (0, o.subscribeDocumentToFullScreenChange)(document, function() {
                var t = (0, o.isFullScreen)();
                t !== u && (u = t, e.emitChange())
            })
        }, i.isFocused = function() {
            return l
        }, i.isElementFullScreen = function() {
            return u
        }, i.windowSize = function() {
            return c
        }, r
    }(r.default.Store))(i.default, {
        WINDOW_FOCUS: function(e) {
            if (l === e.focused) return !1;
            l = e.focused
        },
        WINDOW_RESIZED: function(e) {
            return f()
        }
    });
    t.default = p
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r, i, a = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(0)),
        o = (r = n(190)) && r.__esModule ? r : {
            default: r
        };
    var s = function(e) {
        var t = e.children;
        return a.Children.toArray(t).length > 0 ? function(e, t, n, r) {
            i || (i = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);
            var a = e && e.defaultProps,
                o = arguments.length - 3;
            if (t || 0 === o || (t = {
                    children: void 0
                }), t && a)
                for (var s in a) void 0 === t[s] && (t[s] = a[s]);
            else t || (t = a || {});
            if (1 === o) t.children = r;
            else if (o > 1) {
                for (var u = new Array(o), l = 0; l < o; l++) u[l] = arguments[l + 3];
                t.children = u
            }
            return {
                $$typeof: i,
                type: e,
                key: void 0 === n ? null : "" + n,
                ref: null,
                props: t,
                _owner: null
            }
        }("div", {
            className: o.default.itemGroup
        }, void 0, t) : null
    };
    t.default = s
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = n(43),
        i = c(n(2)),
        a = c(n(453)),
        o = c(n(41)),
        s = c(n(15)),
        u = n(436),
        l = n(1);

    function c(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function d(e, t, n, r, i, a, o) {
        try {
            var s = e[a](o),
                u = s.value
        } catch (e) {
            return void n(e)
        }
        s.done ? t(u) : Promise.resolve(u).then(r, i)
    }

    function f() {
        return (f = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }

    function p() {
        (0, u.playSound)("mention3")
    }

    function _(e, t, n, r, i) {
        if (t !== n) {
            var o = e[t],
                u = e[n];
            s.default.track(l.AnalyticEvents.MEDIA_DEVICE_CHANGED, {
                device_from_name: a.default.getCertifiedDeviceName(t, null != o ? o.name : ""),
                device_to_name: a.default.getCertifiedDeviceName(n, null != u ? u.name : ""),
                device_type: r,
                device_is_certified: a.default.isCertified(n),
                location: i
            })
        }
    }
    var h, E, m = n(4247),
        g = m.enable,
        v = m.isNotSupported,
        T = {
            enable: g,
            toggleSelfMute: function(e) {
                void 0 === e && (e = r.MediaEngineContextTypes.DEFAULT), v() || (o.default.isEnabled() ? i.default.dispatch({
                    type: l.ActionTypes.AUDIO_TOGGLE_SELF_MUTE,
                    context: e
                }) : this.enable())
            },
            setTemporarySelfMute: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_TEMPORARY_SELF_MUTE,
                    mute: e
                })
            },
            toggleSelfDeaf: function(e) {
                void 0 === e && (e = r.MediaEngineContextTypes.DEFAULT), v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_TOGGLE_SELF_DEAF,
                    context: e
                })
            },
            toggleLocalMute: function(e, t) {
                void 0 === t && (t = r.MediaEngineContextTypes.DEFAULT), v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_TOGGLE_LOCAL_MUTE,
                    context: t,
                    userId: e
                })
            },
            setLocalVolume: function(e, t, n) {
                void 0 === n && (n = r.MediaEngineContextTypes.DEFAULT), i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_LOCAL_VOLUME,
                    context: n,
                    userId: e,
                    volume: t
                })
            },
            setLocalPan: function(e, t, n, a) {
                void 0 === a && (a = r.MediaEngineContextTypes.DEFAULT), i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_LOCAL_PAN,
                    context: a,
                    userId: e,
                    left: t,
                    right: n
                })
            },
            setMode: function(e, t, n) {
                void 0 === t && (t = {}), void 0 === n && (n = r.MediaEngineContextTypes.DEFAULT), v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_MODE,
                    context: n,
                    mode: e,
                    options: f({}, o.default.getModeOptions(n), t)
                })
            },
            setInputVolume: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_INPUT_VOLUME,
                    volume: e
                })
            },
            setOutputVolume: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_OUTPUT_VOLUME,
                    volume: e
                })
            },
            setInputDevice: function(e, t) {
                if (!v()) {
                    if (null != t) _(o.default.getInputDevices(), o.default.getInputDeviceId(), e, "Audio Input", t);
                    i.default.dispatch({
                        type: l.ActionTypes.AUDIO_SET_INPUT_DEVICE,
                        id: e
                    }), p()
                }
            },
            setOutputDevice: function(e, t) {
                if (!v()) {
                    if (null != t) _(o.default.getOutputDevices(), o.default.getOutputDeviceId(), e, "Audio Output", t);
                    i.default.dispatch({
                        type: l.ActionTypes.AUDIO_SET_OUTPUT_DEVICE,
                        id: e
                    }), p()
                }
            },
            setVideoDevice: function(e, t) {
                if (!v()) {
                    if (null != t) _(o.default.getVideoDevices(), o.default.getVideoDeviceId(), e, "Video", t);
                    i.default.dirtyDispatch({
                        type: l.ActionTypes.MEDIA_ENGINE_SET_VIDEO_DEVICE,
                        id: e
                    })
                }
            },
            setEchoCancellation: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_ECHO_CANCELLATION,
                    enabled: e
                })
            },
            setLoopback: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_LOOPBACK,
                    enabled: e
                })
            },
            setNoiseSuppression: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_NOISE_SUPPRESSION,
                    enabled: e
                })
            },
            setNoiseCancellation: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_NOISE_CANCELLATION,
                    enabled: e
                })
            },
            setAutomaticGainControl: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_AUTOMATIC_GAIN_CONTROL,
                    enabled: e
                })
            },
            setExperimentalEncoders: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.MEDIA_ENGINE_SET_EXPERIMENTAL_ENCODERS,
                    enabled: e
                })
            },
            setAttenuation: function(e, t, n) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_ATTENUATION,
                    attenuation: e,
                    attenuateWhileSpeakingSelf: t,
                    attenuateWhileSpeakingOthers: n
                })
            },
            setQoS: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_QOS,
                    enabled: e
                })
            },
            reset: function() {
                v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_RESET
                })
            },
            setSilenceWarning: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_DISPLAY_SILENCE_WARNING,
                    enabled: e
                })
            },
            setDebugLogging: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_DEBUG_LOGGING,
                    enabled: e
                })
            },
            setVideoHook: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.MEDIA_ENGINE_SET_VIDEO_HOOK,
                    enabled: e
                })
            },
            setAudioSubsystem: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.AUDIO_SET_SUBSYSTEM,
                    subsystem: e
                })
            },
            setVideoEnabled: function(e) {
                i.default.dispatch({
                    type: l.ActionTypes.MEDIA_ENGINE_SET_VIDEO_ENABLED,
                    enabled: e
                }), o.default.isEnabled() || g(!0)
            },
            setDesktopSource: function(e, t, n, r, a) {
                i.default.dispatch({
                    type: l.ActionTypes.MEDIA_ENGINE_SET_DESKTOP_SOURCE,
                    sourceId: e,
                    resolution: t,
                    frameRate: n,
                    sound: r,
                    context: a
                }), o.default.isEnabled() || g()
            },
            setOpenH264: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.MEDIA_ENGINE_SET_OPEN_H264,
                    enabled: e
                })
            },
            setWebScreenShare: (h = regeneratorRuntime.mark(function e() {
                var t;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0, e.next = 3, o.default.getMediaEngine().getDesktopSource();
                        case 3:
                            t = e.sent, i.default.dispatch({
                                type: l.ActionTypes.MEDIA_ENGINE_SET_DESKTOP_SOURCE,
                                sourceId: t
                            }), o.default.isEnabled() || g(), e.next = 10;
                            break;
                        case 8:
                            e.prev = 8, e.t0 = e.catch(0);
                        case 10:
                        case "end":
                            return e.stop()
                    }
                }, e, null, [
                    [0, 8]
                ])
            }), E = function() {
                var e = this,
                    t = arguments;
                return new Promise(function(n, r) {
                    var i = h.apply(e, t);

                    function a(e) {
                        d(i, n, r, a, o, "next", e)
                    }

                    function o(e) {
                        d(i, n, r, a, o, "throw", e)
                    }
                    a(void 0)
                })
            }, function() {
                return E.apply(this, arguments)
            }),
            setSoundshareVolume: function(e) {
                v() || i.default.dispatch({
                    type: l.ActionTypes.MEDIA_ENGINE_SET_SOUNDSHARE_VOLUME,
                    volume: e
                })
            },
            interact: function() {
                v() || i.default.dispatch({
                    type: l.ActionTypes.MEDIA_ENGINE_INTERACTION_REQUIRED,
                    required: !1
                })
            }
        };
    t.default = T
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r, i = (r = n(2)) && r.__esModule ? r : {
            default: r
        },
        a = n(1);
    var o = {
        open: function(e) {
            i.default.dirtyDispatch({
                type: a.ActionTypes.POPOUT_OPEN,
                popout: e
            })
        },
        close: function(e) {
            i.default.dirtyDispatch({
                type: a.ActionTypes.POPOUT_CLOSE,
                key: e
            })
        },
        closeAll: function() {
            i.default.dirtyDispatch({
                type: a.ActionTypes.POPOUT_CLOSE_ALL
            })
        },
        rerender: function(e) {
            i.default.dirtyDispatch({
                type: a.ActionTypes.POPOUT_NEEDS_RERENDER,
                key: e
            })
        },
        didRerender: function(e) {
            i.default.dirtyDispatch({
                type: a.ActionTypes.POPOUT_DID_RERENDER,
                key: e
            })
        }
    };
    t.default = o
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r, i = f(n(4088)),
        a = f(n(7)),
        o = f(n(3)),
        s = f(n(2)),
        u = f(n(14)),
        l = f(n(19)),
        c = f(n(10)),
        d = n(1);

    function f(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function p() {
        return (p = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var _ = {},
        h = {},
        E = {
            suppress_everyone: !1,
            mobile_push: !0,
            muted: !1,
            message_notifications: d.UserNotificationSettings.ALL_MESSAGES,
            channel_overrides: {}
        },
        m = ((r = {})[d.UserNotificationSettings.ALL_MESSAGES] = p({}, E, {
            message_notifications: d.UserNotificationSettings.ALL_MESSAGES
        }), r[d.UserNotificationSettings.ONLY_MENTIONS] = p({}, E, {
            message_notifications: d.UserNotificationSettings.ONLY_MENTIONS
        }), r),
        g = {},
        v = new Set;

    function T(e, t) {
        return void 0 === t && (t = !1), e.forEach(function(e) {
            var n = e.guild_id,
                r = function(e) {
                    void 0 === e && (e = {});
                    return e instanceof Array ? a.default.keyBy(e, "channel_id") : e
                }(e.channel_overrides);
            if (t) {
                var o = _[n];
                null != o && (r = (0, i.default)(o.channel_overrides, r))
            }
            e.channel_overrides = r, _[n] = (0, i.default)(_[n] || y(n), e), g[n] = A(_[n])
        }), !0
    }

    function y(e) {
        var t = l.default.getGuild(e),
            n = t ? t.defaultMessageNotifications : d.UserNotificationSettings.ALL_MESSAGES;
        return m[n]
    }

    function I(e) {
        return _[e] || y(e)
    }

    function S(e) {
        var t = new Date;
        if (!e) return !1;
        if (e.mode === d.MuteConfigModes.ALWAYS) return !0;
        if (e.mode === d.MuteConfigModes.NEVER) return !1;
        if (e.mode === d.MuteConfigModes.UNTIL) {
            var n = function(e, t) {
                return new Date(e).getTime() < new Date(t).getTime()
            };
            return (null != e.start_time || null != e.end_time) && ((null == e.end_time || !n(e.end_time, t)) && (null == e.start_time || !n(t, e.start_time)))
        }
        if (e.mode === d.MuteConfigModes.INTERVAL) {
            var r = 60 * t.getUTCHours() + t.getUTCMinutes(),
                i = 60 * e.start_hour + e.start_minute,
                a = 60 * e.end_hour + e.end_minute;
            return i < a ? r >= i && r <= a : r >= i != r <= a
        }
        return !1
    }

    function A(e) {
        return new Set(null != e.channel_overrides ? (0, a.default)(e.channel_overrides).filter(function(e) {
            return e.muted
        }).map(function(e) {
            return e.channel_id
        }).value() : null)
    }
    var O = function(e) {
        var t, n;

        function r() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var i = r.prototype;
        return i.initialize = function(e) {
            this.waitFor(c.default, l.default), null != e && (h = e.collapsedGuilds, _ = e.userGuildSettings, a.default.forEach(_, function(e, t) {
                g[t] = A(e)
            }))
        }, i.getState = function() {
            return {
                collapsedGuilds: h,
                userGuildSettings: _
            }
        }, i.isSuppressEveryoneEnabled = function(e) {
            return I(e).suppress_everyone
        }, i.isMobilePushEnabled = function(e) {
            return I(e).mobile_push
        }, i.isMuted = function(e) {
            var t = I(e);
            return t.muted || S(t.mute_config) || S(t.folder_mute_config)
        }, i.getMessageNotifications = function(e) {
            return I(e).message_notifications
        }, i.getChannelOverrides = function(e) {
            return I(e).channel_overrides || {}
        }, i.getChannelMessageNotifications = function(e, t) {
            var n = this.getChannelOverrides(e)[t];
            return null == n || null == n.message_notifications ? d.UserNotificationSettings.NULL : n.message_notifications
        }, i.getMutedChannels = function(e) {
            return g[e] || v
        }, i.isChannelMuted = function(e, t) {
            var n = u.default.getChannel(t);
            return e = (null != n ? n.getGuildId() : null) || e, this.getMutedChannels(e).has(t)
        }, i._isCategoryMuted = function(e, t) {
            var n = u.default.getChannel(t);
            if (null == n) return !1;
            var r = n.parent_id;
            return null != r && this.getMutedChannels(e).has(r)
        }, i._resolvedMessageNotifications = function(e) {
            var t = this.getChannelMessageNotifications(e.guild_id, e.id);
            if (t !== d.UserNotificationSettings.NULL) return t;
            if (null != e.parent_id) {
                var n = this.getChannelMessageNotifications(e.guild_id, e.parent_id);
                if (n !== d.UserNotificationSettings.NULL) return n
            }
            return this.getMessageNotifications(e.guild_id)
        }, i.isGuildOrCategoryOrChannelMuted = function(e, t) {
            return this.isMuted(e) || this._isCategoryMuted(e, t) || this.isChannelMuted(e, t)
        }, i.allowNoMessages = function(e) {
            return this.isGuildOrCategoryOrChannelMuted(e.guild_id, e.id) || this._resolvedMessageNotifications(e) === d.UserNotificationSettings.NO_MESSAGES
        }, i.allowAllMessages = function(e) {
            return !this.isGuildOrCategoryOrChannelMuted(e.guild_id, e.id) && this._resolvedMessageNotifications(e) === d.UserNotificationSettings.ALL_MESSAGES
        }, i.isGuildCollapsed = function(e) {
            return h[e] || !1
        }, i.getAllSettings = function() {
            return {
                userGuildSettings: _,
                mutedChannels: g,
                collapsedGuilds: h
            }
        }, r
    }(o.default.PersistedStore);
    O.persistKey = "collapsedGuilds", O.migrations = [function(e) {
        return {
            collapsedGuilds: e,
            userGuildSettings: {}
        }
    }];
    var b = new O(s.default, {
        USER_GUILD_SETTINGS_UPDATE: function(e) {
            var t = e.userGuildSettings,
                n = e.partial;
            return T(t, void 0 !== n && n)
        },
        CONNECTION_OPEN: function(e) {
            _ = {}, g = {}, Object.keys(h).forEach(function(e) {
                h[e] && null == l.default.getGuild(e) && delete h[e]
            }), T(e.userGuildSettings)
        },
        OVERLAY_INITIALIZE: function(e) {
            var t = e.allUserGuildSettings,
                n = t.userGuildSettings,
                r = t.mutedChannels,
                i = t.collapsedGuilds;
            _ = p({}, n), g = {}, Object.keys(r).forEach(function(e) {
                g[e] = new Set(r[e])
            }), h = p({}, i)
        },
        GUILD_CREATE: function(e) {
            return !0
        },
        GUILD_UPDATE: function(e) {
            return !0
        },
        GUILD_TOGGLE_COLLAPSE_MUTED: function(e) {
            var t = e.guildId;
            h[t] ? delete h[t] : h[t] = !0
        }
    });
    t.default = b
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = o(n(3)),
        i = o(n(2)),
        a = o(n(155));
    n(1);

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    var u = new(function(e) {
        var t, n;

        function r() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var i, o, u, l = r.prototype;
        return l.initialize = function() {
            this.waitFor(a.default)
        }, l.getExperimentBucket = function(e) {
            return a.default.getUserExperimentBucket(e)
        }, l.getEligibleExperiment = function(e) {
            return a.default.getUserExperimentDescriptor(e)
        }, l.getEligibleExperiments = function() {
            return a.default.getAllUserExperimentDescriptors()
        }, l.getRegisteredExperiments = function() {
            return a.default.getRegisteredExperiments()
        }, l.getExperimentOverrides = function() {
            return a.default.getAllExperimentOverrideDescriptors()
        }, l.getOverrideExperimentDescriptor = function(e) {
            return a.default.getExperimentOverrideDescriptor(e)
        }, i = r, (o = [{
            key: "hasLoadedExperiments",
            get: function() {
                return a.default.hasLoadedExperiments
            }
        }]) && s(i.prototype, o), u && s(i, u), r
    }(r.default.Store))(i.default, {
        LOGOUT: function(e) {
            return !0
        },
        LOGIN: function(e) {
            return !0
        },
        CONNECTION_OPEN: function(e) {
            return !0
        },
        EXPERIMENTS_FETCH_SUCCESS: function(e) {
            return !0
        },
        OVERLAY_INITIALIZE: function(e) {
            return !0
        },
        CACHE_LOADED: function(e) {
            return !0
        },
        EXPERIMENTS_FETCH_FAILURE: function(e) {
            return !0
        },
        EXPERIMENT_REGISTER: function(e) {
            return !0
        },
        EXPERIMENT_REGISTER_LEGACY: function(e) {
            return !0
        },
        EXPERIMENT_REGISTER_SURVEY: function(e) {
            return !0
        },
        EXPERIMENT_OVERRIDE_BUCKET: function(e) {
            return !0
        }
    });
    t.default = u
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.findInvites = I, t.findInvite = function(e) {
        return I(e)[0]
    }, t.getInviteURL = function(e, t) {
        void 0 === e && (e = "");
        void 0 === t && (t = !0);
        var n, r = window.GLOBAL_ENV.INVITE_HOST;
        null != r ? n = "/" + e : (r = location.host, n = "/invite/" + e);
        return (t ? location.protocol + "//" : "") + r + n
    }, t.resolveInvite = function(e, t, n) {
        return a.default.get({
            url: E.Endpoints.INVITE(e),
            query: g({}, n, {
                with_counts: !0
            })
        }).then(function(n) {
            var r = n.body,
                i = null,
                a = r.channel;
            return null != a && (r.target_user_type === E.InviteTargetUserTypes.STREAM ? i = E.InviteTypes.STREAM : (0, o.isMultiUserDM)(a.type) ? i = E.InviteTypes.GDM_INVITE : (0, o.isPrivate)(a.type) || (i = E.InviteTypes.SERVER_INVITE)), t && p.default.track(E.AnalyticEvents.INVITE_RESOLVED, {
                resolved: !0,
                guild_id: null != r.guild ? r.guild.id : null,
                channel_id: r.channel.id,
                channel_type: r.channel.type,
                inviter_id: r.inviter ? r.inviter.id : null,
                code: e,
                location: t,
                authenticated: s.default.isAuthenticated(),
                size_total: r.approximate_member_count,
                size_online: r.approximate_presence_count,
                destination_user_id: null != r.target_user ? r.target_user.id : null,
                invite_type: i
            }, !0), {
                invite: r,
                code: e
            }
        }, function(n) {
            var r = null != n.body && n.body.code === E.AbortCodes.USER_BANNED;
            return t && p.default.track(E.AnalyticEvents.INVITE_RESOLVED, {
                resolved: !1,
                code: e,
                location: t,
                authenticated: s.default.isAuthenticated(),
                user_banned: r
            }, !0), {
                invite: null,
                code: e,
                banned: r
            }
        })
    }, t.canViewInviteModal = function(e, t) {
        var r = n(55).default,
            i = t || e;
        return null != i && r.can(E.Permissions.CREATE_INSTANT_INVITE, i) || null != e && null != e.vanityURLCode
    }, t.generateRowsForQuery = function(e, t) {
        var n = new Set,
            r = [],
            i = {
                numFriends: 0,
                numDms: 0,
                numGroupDms: 0
            };
        "" === e ? (f.default.getPrivateChannelIds().forEach(function(e) {
            var a = u.default.getChannel(e);
            if (null != a) {
                if (a.type === E.ChannelTypes.GROUP_DM || a.type === E.ChannelTypes.LFG_GROUP_DM) return r.push({
                    type: S.GROUP_DM,
                    item: a
                }), void i.numGroupDms++;
                if (null != l.default.lastMessageId(a.id)) {
                    var o = a.getRecipientId();
                    if (null != o && !t.has(o)) {
                        var s = d.default.getUser(o);
                        null == s || s.bot || (n.add(s.id), r.push({
                            type: S.DM,
                            item: s
                        }), i.numDms++)
                    }
                }
            }
        }), c.default.getFriendIDs().forEach(function(e) {
            if (!t.has(e) && !n.has(e)) {
                var a = d.default.getUser(e);
                null != a && (r.push({
                    type: S.FRIEND,
                    item: a
                }), i.numFriends++)
            }
        })) : (_.default.queryDMUsers(e, 50, !1).forEach(function(e) {
            var a = e.user;
            if (!t.has(a.id)) {
                var o = u.default.getDMFromUserId(a.id);
                if (null != o) null != l.default.lastMessageId(o) && (n.add(a.id), r.push({
                    type: S.DM,
                    item: a
                }), i.numDms++)
            }
        }), _.default.queryGroupDMs(e, 50, !1).forEach(function(e) {
            var t = e.channel;
            r.push({
                type: S.GROUP_DM,
                item: t
            }), i.numGroupDms++
        }), _.default.queryFriends(e, 500, !1).forEach(function(e) {
            var a = e.user;
            t.has(a.id) || n.has(a.id) || (r.push({
                type: S.FRIEND,
                item: a
            }), i.numFriends++)
        }));
        return {
            rows: r,
            counts: i
        }
    }, t.default = t.RowTypes = void 0;
    var r, i = m(n(79)),
        a = m(n(12)),
        o = n(63),
        s = m(n(11)),
        u = m(n(14)),
        l = m(n(207)),
        c = m(n(50)),
        d = m(n(10)),
        f = m(n(262)),
        p = m(n(15)),
        _ = m(n(854)),
        h = m(n(161)),
        E = n(1);

    function m(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function g() {
        return (g = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    r = n(4139);
    var v = 10,
        T = [h.default.escape(window.GLOBAL_ENV.INVITE_HOST), h.default.escape(E.INSTANT_INVITE_BASE_URL)].join("|"),
        y = new RegExp("(?: |^|https?://)(?:" + T + ")/(?!gifts/)([a-z0-9-]+)", "gi");

    function I(e) {
        if (null == e) return [];
        for (var t, n = new Set;
            (t = y.exec(e)) && n.size < v;) n.add(t[1]);
        return Array.from(n)
    }
    var S = (0, i.default)({
        GROUP_DM: null,
        DM: null,
        FRIEND: null
    });
    t.RowTypes = S;
    var A = {
        getMaxAgeOptions: r.MAX_AGE_OPTIONS,
        getMaxUsesOptions: r.MAX_USES_OPTIONS,
        INVITE_OPTIONS_FOREVER: r.INVITE_OPTIONS_FOREVER,
        INVITE_OPTIONS_1_DAY: r.INVITE_OPTIONS_1_DAY,
        INVITE_OPTIONS_12_HOURS: r.INVITE_OPTIONS_12_HOURS,
        INVITE_OPTIONS_6_HOURS: r.INVITE_OPTIONS_6_HOURS,
        INVITE_OPTIONS_1_HOUR: r.INVITE_OPTIONS_1_HOUR,
        INVITE_OPTIONS_30_MINUTES: r.INVITE_OPTIONS_30_MINUTES,
        INVITE_OPTIONS_UNLIMITED: r.INVITE_OPTIONS_UNLIMITED,
        INVITE_OPTIONS_ONCE: r.INVITE_OPTIONS_ONCE,
        INVITE_OPTIONS_5_TIMES: r.INVITE_OPTIONS_5_TIMES,
        INVITE_OPTIONS_10_TIMES: r.INVITE_OPTIONS_10_TIMES,
        INVITE_OPTIONS_25_TIMES: r.INVITE_OPTIONS_25_TIMES,
        INVITE_OPTIONS_50_TIMES: r.INVITE_OPTIONS_50_TIMES,
        INVITE_OPTIONS_100_TIMES: r.INVITE_OPTIONS_100_TIMES
    };
    t.default = A
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.startGuildStream = function(e, t, n) {
        a.default.dispatch({
            type: f.ActionTypes.STREAM_START,
            streamType: "guild",
            guildId: e,
            channelId: t,
            pid: n,
            appContext: __OVERLAY__ ? f.AppContext.OVERLAY : f.AppContext.APP
        })
    }, t.setStreamPaused = function(e, t) {
        var n = (0, o.encodeStreamKey)(e);
        a.default.dispatch({
            type: f.ActionTypes.STREAM_SET_PAUSED,
            streamKey: n,
            paused: t
        })
    }, t.watchStream = m, t.watchStreamAndTransitionToStream = function(e) {
        var t = e.guildId,
            n = e.channelId;
        if (E(t, n)) return;
        m(e), (0, s.default)(e)
    }, t.stopStream = function(e) {
        g(e), a.default.dispatch({
            type: f.ActionTypes.STREAM_STOP,
            streamKey: e,
            appContext: __OVERLAY__ ? f.AppContext.OVERLAY : f.AppContext.APP
        })
    }, t.closeStream = g, t.fetchStreamPreview = function(e, t, n) {
        return v.apply(this, arguments)
    }, t.setLayout = function(e) {
        a.default.dirtyDispatch({
            type: f.ActionTypes.STREAM_LAYOUT_UPDATE,
            layout: e
        })
    }, t.setHackyMacMode = function(e) {
        a.default.dirtyDispatch({
            type: f.ActionTypes.STREAM_SET_HACKY_MAC_MODE,
            enabled: e
        })
    }, t.notifyStreamStart = function(e) {
        return T.apply(this, arguments)
    };
    var r = p(n(16)),
        i = p(n(12)),
        a = p(n(2)),
        o = n(107),
        s = p(n(896)),
        u = p(n(14)),
        l = p(n(55)),
        c = p(n(72)),
        d = n(211),
        f = n(1);

    function p(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function _(e, t, n, r, i, a, o) {
        try {
            var s = e[a](o),
                u = s.value
        } catch (e) {
            return void n(e)
        }
        s.done ? t(u) : Promise.resolve(u).then(r, i)
    }

    function h(e) {
        return function() {
            var t = this,
                n = arguments;
            return new Promise(function(r, i) {
                var a = e.apply(t, n);

                function o(e) {
                    _(a, r, i, o, s, "next", e)
                }

                function s(e) {
                    _(a, r, i, o, s, "throw", e)
                }
                o(void 0)
            })
        }
    }

    function E(e, t) {
        var n = u.default.getChannel(t);
        (0, r.default)(null != n, "Cannot join a null voice channel");
        var i = c.default.getVoiceStatesForChannel(n);
        return !l.default.can(f.Permissions.MOVE_MEMBERS, n) && (0, d.isChannelFull)(n, i.length)
    }

    function m(e) {
        e.guildId;
        if (!E(0, e.channelId)) {
            var t = (0, o.encodeStreamKey)(e);
            a.default.dispatch({
                type: f.ActionTypes.STREAM_WATCH,
                streamKey: t
            })
        }
    }

    function g(e) {
        a.default.dispatch({
            type: f.ActionTypes.STREAM_CLOSE,
            streamKey: e
        })
    }

    function v() {
        return (v = h(regeneratorRuntime.mark(function e(t, n, r) {
            var s, u, l;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return s = (0, o.encodeStreamKey)({
                            streamType: "guild",
                            guildId: t,
                            channelId: n,
                            ownerId: r
                        }), a.default.dispatch({
                            type: f.ActionTypes.STREAM_PREVIEW_FETCH_START,
                            streamKey: s
                        }), e.prev = 2, e.next = 5, i.default.get({
                            url: f.Endpoints.STREAM_PREVIEW(s),
                            query: {
                                version: Date.now()
                            }
                        });
                    case 5:
                        u = e.sent, a.default.dispatch({
                            type: f.ActionTypes.STREAM_PREVIEW_FETCH_SUCCESS,
                            streamKey: s,
                            previewURL: u.body.url
                        }), e.next = 13;
                        break;
                    case 9:
                        e.prev = 9, e.t0 = e.catch(2), 429 === e.t0.status && (l = e.t0.body.retry_after), a.default.dispatch({
                            type: f.ActionTypes.STREAM_PREVIEW_FETCH_FAIL,
                            streamKey: s,
                            retryAfter: l
                        });
                    case 13:
                    case "end":
                        return e.stop()
                }
            }, e, null, [
                [2, 9]
            ])
        }))).apply(this, arguments)
    }

    function T() {
        return (T = h(regeneratorRuntime.mark(function e(t) {
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return e.prev = 0, e.next = 3, i.default.post({
                            url: f.Endpoints.STREAM_NOTIFY(t)
                        });
                    case 3:
                        e.next = 7;
                        break;
                    case 5:
                        e.prev = 5, e.t0 = e.catch(0);
                    case 7:
                    case "end":
                        return e.stop()
                }
            }, e, null, [
                [0, 5]
            ])
        }))).apply(this, arguments)
    }
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = v(n(7)),
        i = v(n(3)),
        a = v(n(26)),
        o = v(n(2)),
        s = v(n(964)),
        u = v(n(157)),
        l = v(n(88)),
        c = v(n(188)),
        d = v(n(71)),
        f = v(n(161)),
        p = v(n(14)),
        _ = v(n(56)),
        h = v(n(19)),
        E = v(n(323)),
        m = v(n(10)),
        g = n(1);

    function v(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function T(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function y() {
        return (y = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var I = "custom",
        S = ["recent", I].concat(u.default.getCategories()),
        A = function() {
            function e(e) {
                this.emoticonRegex = null, this.frequentlyUsed = null, this.escapedEmoticonNames = null, this.disambiguatedEmoji = null, this.guildId = e
            }
            e.get = function(t) {
                return null != e._lastInstance && e._lastInstance.guildId === t || (e._lastInstance = new e(t)), e._lastInstance
            }, e.reset = function() {
                e._lastInstance = null
            }, e.resetFrequentlyUsed = function() {
                null != e._lastInstance && (e._lastInstance.frequentlyUsed = null)
            }, e.clear = function(t) {
                null != e._lastInstance && e._lastInstance.guildId === t && (e._lastInstance = null)
            };
            var t = e.prototype;
            return t.ensureDisambiguated = function() {
                null == this.disambiguatedEmoji && this._buildDisambiguatedCustomEmoji()
            }, t.getDisambiguatedEmoji = function() {
                return null == this.disambiguatedEmoji && this._buildDisambiguatedCustomEmoji(), this.disambiguatedEmoji
            }, t.getCustomEmoji = function() {
                return null == this.customEmojis && this._buildDisambiguatedCustomEmoji(), this.customEmojis
            }, t.getGroupedCustomEmoji = function() {
                return null == this.groupedCustomEmojis && this._buildDisambiguatedCustomEmoji(), this.groupedCustomEmojis
            }, t.getByName = function(e) {
                if (null == this.emojisByName && this._buildDisambiguatedCustomEmoji(), Object.prototype.hasOwnProperty.call(this.emojisByName, e)) return this.emojisByName[e]
            }, t.getEmoticonByName = function(e) {
                if (null == this.emoticonsByName && this._buildDisambiguatedCustomEmoji(), Object.prototype.hasOwnProperty.call(this.emoticonsByName, e)) return this.emoticonsByName[e]
            }, t.getById = function(e) {
                if (null == this.emojisById && this._buildDisambiguatedCustomEmoji(), Object.prototype.hasOwnProperty.call(this.emojisById, e)) return this.emojisById[e]
            }, t.getCustomEmoticonRegex = function() {
                return null == this.escapedEmoticonNames && this._buildDisambiguatedCustomEmoji(), null == this.emoticonRegex && this.escapedEmoticonNames && (this.emoticonRegex = new RegExp("^\\b(" + this.escapedEmoticonNames + ")\\b")), this.emoticonRegex
            }, t.getFrequentlyUsedEmojis = function() {
                var e = this;
                return this.ensureDisambiguated(), null == this.frequentlyUsed && (this.frequentlyUsed = [], r.default.each(b, function(t) {
                    var n;
                    (n = t.id ? e.getById(t.id) : u.default.getByName(t.name)) && null != e.frequentlyUsed && e.frequentlyUsed.push(n)
                })), this.frequentlyUsed
            }, t.getEscapedCustomEmoticonNames = function() {
                return null == this.escapedEmoticonNames && this._buildDisambiguatedCustomEmoji(), this.escapedEmoticonNames
            }, t.nameMatchesChain = function(e) {
                return (0, r.default)(this.getDisambiguatedEmoji()).filter(function(t) {
                    var n = t.names,
                        i = t.name;
                    return n ? r.default.some(n, e) : e(i)
                })
            }, t._buildDisambiguatedCustomEmoji = function() {
                var e = this,
                    t = {},
                    n = [];
                this.emoticonRegex = null, this.frequentlyUsed = null, this.disambiguatedEmoji = [], this.customEmojis = {}, this.groupedCustomEmojis = {}, this.emoticonsByName = {}, this.emojisByName = {}, this.emojisById = {};
                var i = function(n) {
                        var r = n.name,
                            i = t[r] || 0;
                        if (t[r] = i + 1, i > 0) {
                            var a = r + "~" + i;
                            n = y({}, n, {
                                name: a,
                                originalName: r,
                                allNamesString: ":" + a + ":"
                            })
                        }
                        if (e.emojisByName[n.name] = n, n.id) {
                            e.emojisById[n.id] = n, e.customEmojis[n.name] = n;
                            var o = n.guildId;
                            null != o && (e.groupedCustomEmojis[o] ? e.groupedCustomEmojis[o].push(n) : e.groupedCustomEmojis[o] = [n])
                        }
                        null == e.disambiguatedEmoji && (e.disambiguatedEmoji = []), e.disambiguatedEmoji.push(n)
                    },
                    a = function(t) {
                        Object.prototype.hasOwnProperty.call(e.emoticonsByName, t.name) || (n.push(f.default.escape(t.name)), e.emoticonsByName[t.name] = t)
                    };
                u.default.forEach(i);
                var o = function(e) {
                    var t = L[null == e ? "null" : e];
                    t && (r.default.each(t.usableEmojis, i), r.default.each(t.emoticons, a))
                };
                o(this.guildId), E.default.getFlattenedGuilds().forEach(function(t) {
                    t.id !== e.guildId && o(t.id)
                }), this.escapedEmoticonNames = n.join("|")
            }, e
        }();
    A._lastInstance = null;
    var O = /(?:<a?:\w+:(\d+)>)|:(?:([^\s:]+?)(?:::skin-tone-\d)?:)/g,
        b = [],
        N = new s.default(function() {
            return 100
        }, function(e) {
            var t = 0;
            return e <= 3 ? t = 100 : e <= 15 ? t = 70 : e <= 30 ? t = 50 : e <= 45 ? t = 30 : e <= 80 && (t = 10), t
        }, function(e) {
            var t = u.default.getByName(e);
            return t || (Object.prototype.hasOwnProperty.call(R, e) ? R[e] : null)
        }, function(e, t) {
            x.usageHistory = e, A.resetFrequentlyUsed(), b = t, C = S.slice(0), r.default.some(L, function(e) {
                return e.usableEmojis.length > 0
            }) || C.splice(S.indexOf(I), 1)
        }, 40),
        C = S.slice(0),
        R = {},
        L = {};

    function D() {
        L = {}, R = {}, A.reset()
    }

    function P(e) {
        null != L[e] && delete L[e]
    }

    function M() {
        var e = [];
        Object.values(L).forEach(function(t) {
            e.push.apply(e, t.emoticons), r.default.each(t.usableEmojis, function(e) {
                R[e.id] = e
            })
        }), A.reset(), N.compute()
    }

    function w(e, t) {
        if (P(e), A.clear(e), null != t) {
            var n = m.default.getCurrentUser();
            if (null != n) {
                var r = _.default.getMember(e, n.id);
                if (null != r) {
                    var i = {
                        emojis: t,
                        usableEmojis: [],
                        emoticons: []
                    };
                    Object.values(t).filter(function(e) {
                        return !e.roles.length || r.roles.find(function(t) {
                            return e.roles.indexOf(t) >= 0
                        })
                    }).sort(function(e, t) {
                        return t.name.localeCompare(e.name)
                    }).forEach(function(t) {
                        t.url = l.default.getEmojiURL({
                            id: t.id,
                            animated: t.animated
                        }), t.allNamesString = ":" + t.name + ":", t.guildId = e, null == t.available && (t.available = !0), i.usableEmojis.push(t)
                    }), i.emoticons = i.usableEmojis.filter(function(e) {
                        return !e.require_colons
                    }), L[e] = i
                }
            }
        }
    }

    function U(e) {
        w(e.guild.id, e.guild.emojis), M()
    }
    var k = {
            usageHistory: {},
            diversitySurrogate: ""
        },
        x = k,
        G = function(e) {
            var t, n;

            function i() {
                return e.apply(this, arguments) || this
            }
            n = e, (t = i).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
            var a, o, s, l = i.prototype;
            return l.initialize = function(e) {
                this.waitFor(_.default, m.default, h.default);
                var t = e || k,
                    n = t.usageHistory,
                    r = t.diversitySurrogate;
                x.usageHistory = n, x.diversitySurrogate = r, N.overwriteHistory(n), n && Object.keys(n).length || (N.track("eggplant"), N.track("fork_and_knife"), N.track("yum"), N.track("weary"), N.track("tired_face"), N.track("poop"), N.track("ok_hand"), N.track("100")), u.default.setDefaultDiversitySurrogate(r)
            }, l.getState = function() {
                return x
            }, l.getGuildEmoji = function(e) {
                var t = L[e];
                return t && t.emojis || []
            }, l.getGuilds = function() {
                return L
            }, l.filterExternal = function(e, t, n) {
                var r = null != e ? e.getGuildId() : null,
                    i = A.get(r).nameMatchesChain(t).reject(function(t) {
                        return c.default.isEmojiDisabled(t, e)
                    }),
                    a = m.default.getCurrentUser();
                return null == e || e.isPrivate() || !a || d.default.can(g.Permissions.USE_EXTERNAL_EMOJIS, a, e) || (i = i.filter(function(e) {
                    return null == e.guildId || e.guildId === r
                })), null != n && n > 0 && (i = i.take(n)), i.value()
            }, l.getDisambiguatedEmojiContext = function(e) {
                return A.get(e)
            }, l.search = function(e, t, n) {
                void 0 === n && (n = 0);
                var i = t.toLowerCase(),
                    a = f.default.escape(i),
                    o = new RegExp("" + a, "i"),
                    s = o.test.bind(o),
                    u = this.filterExternal(e, s);
                if (u.length) {
                    var l = new RegExp("^" + a, "i"),
                        c = new RegExp("(^|_|[A-Z])" + a + "s?([A-Z]|_|$)"),
                        d = c.test.bind(c),
                        p = l.test.bind(l),
                        _ = function(e, t) {
                            void 0 === t && (t = e);
                            var n = e.toLowerCase(),
                                r = 1 + (n === i ? 4 : 0) + (d(n) || d(e) ? 2 : 0) + (p(e) ? 1 : 0),
                                a = N.getScore(t);
                            return null != a && (r *= a / 100), r
                        };
                    u = r.default.orderBy(u, [function(e) {
                        return e.names ? _(e.names[0]) : _(e.name, e.id)
                    }, function(e) {
                        return e.names ? e.names[0] : e.name
                    }], ["desc", "asc"])
                }
                return n && (u = u.slice(0, n)), u
            }, l.getCustomEmojiById = function(e) {
                return R[e]
            }, a = i, (o = [{
                key: "categories",
                get: function() {
                    return C
                }
            }, {
                key: "diversitySurrogate",
                get: function() {
                    return u.default.getDefaultDiversitySurrogate() || ""
                }
            }]) && T(a.prototype, o), s && T(a, s), i
        }(i.default.PersistedStore);
    G.persistKey = "EmojiStore", G.migrations = [function() {
        var e = a.default.get("EmojiUsageHistory") || {},
            t = a.default.get("EmojiDiversitySurrogate") || "";
        return requestIdleCallback(function() {
            a.default.remove("EmojiUsageHistory"), a.default.remove("EmojiDiversitySurrogate")
        }), {
            usageHistory: e,
            diversitySurrogate: t
        }
    }];
    var F = new G(o.default, {
        GUILD_MEMBER_UPDATE: function(e) {
            var t = e.guildId;
            if (e.user.id === m.default.getCurrentUser().id) {
                var n = L[t];
                w(t, n && n.usableEmojis), M()
            }
        },
        CONNECTION_OPEN: function(e) {
            D(), e.guilds.forEach(function(e) {
                return w(e.id, e.emojis)
            }), M()
        },
        OVERLAY_INITIALIZE: function(e) {
            var t = e.emojis;
            D(), L = y({}, t), M()
        },
        GUILD_CREATE: U,
        GUILD_UPDATE: U,
        GUILD_EMOJIS_UPDATE: function(e) {
            w(e.guildId, e.emojis), M()
        },
        GUILD_DELETE: function(e) {
            P(e.guild.id), M()
        },
        MESSAGE_CREATE: function(e) {
            if (!e.optimistic) return !1;
            for (var t, n = u.default.translateSurrogatesToInlineEmoji(e.message.content), r = p.default.getChannel(e.message.channelId), i = r ? r.getGuildId() : null, a = !1; null !== (t = O.exec(n));) {
                var o = void 0;
                null !== t && ((o = t[1] ? A.get(i).getById(t[1]) : u.default.getByName(t[2])) && (N.track(o.id || o.uniqueName || o.name), a = !0))
            }
            if (!a) return !1;
            N.compute()
        },
        MESSAGE_REACTION_ADD: function(e) {
            if (!e.optimistic) return !1;
            var t, n = p.default.getChannel(e.channelId),
                r = n ? n.getGuildId() : null;
            if (null == (t = 0 != e.emoji.id ? A.get(r).getById(e.emoji.id) : u.default.getByName(u.default.convertSurrogateToName(e.emoji.name, !1)))) return !1;
            N.track(t.id || t.uniqueName || t.name), N.compute()
        },
        EMOJI_DIVERSITY_COLOR_CHANGE: function(e) {
            var t = e.color;
            u.default.setDefaultDiversitySurrogate(t), x.diversitySurrogate = t
        }
    });
    t.default = F
},
function(e, t, n) {
    "use strict";
    (function(e) {
        t.__esModule = !0, t.default = void 0;
        var r = u(n(3)),
            i = u(n(2)),
            a = n(886),
            o = u(n(51)),
            s = u(n(23));
        n(1);

        function u(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function l() {
            return (l = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }

        function c(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        var d, f = {
                applicationId: null
            },
            p = f,
            _ = new Set,
            h = !1,
            E = !1;

        function m() {
            h = !1
        }

        function g() {
            d = null, _ = new Set, p.applicationId = null, m()
        }
        var v = function(t) {
            var n, r;

            function i() {
                return t.apply(this, arguments) || this
            }
            r = t, (n = i).prototype = Object.create(r.prototype), n.prototype.constructor = n, n.__proto__ = r;
            var u, m, g, v = i.prototype;
            return v.initialize = function(e) {
                p = l({}, e || f), d = p.applicationId, this.waitFor(s.default), this.syncWith([s.default], function() {
                    return !0
                }), o.default.whenInitialized(function() {
                    null != d && (0, a.authorizeAndSetTestModeApplication)(d), E = !0
                })
            }, v.inTestModeForApplication = function(e) {
                return d === e
            }, v.shouldDisplayTestMode = function(e) {
                return s.default.developerMode && this.inTestModeForApplication(e)
            }, v.getState = function() {
                return p
            }, v.whenInitialized = function(t) {
                this.addConditionalChangeListener(function() {
                    if (E) return e(t), !1
                })
            }, u = i, (m = [{
                key: "isTestMode",
                get: function() {
                    return null != d
                }
            }, {
                key: "isFetchingAuthorization",
                get: function() {
                    return _.size > 0
                }
            }, {
                key: "testModeApplicationId",
                get: function() {
                    return d
                }
            }, {
                key: "error",
                get: function() {
                    return h
                }
            }]) && c(u.prototype, m), g && c(u, g), i
        }(r.default.PersistedStore);
        v.persistKey = "TestModeStore";
        var T = new v(i.default, {
            DEVELOPER_TEST_MODE_AUTHORIZATION_START: function(e) {
                var t = e.applicationId;
                _.add(t), h = !1
            },
            DEVELOPER_TEST_MODE_AUTHORIZATION_SUCCESS: function(e) {
                var t = e.applicationId;
                d = t, _.delete(t), h = !1, p.applicationId = t
            },
            DEVELOPER_TEST_MODE_AUTHORIZATION_FAIL: function(e) {
                var t = e.applicationId;
                _.delete(t), h = !0
            },
            OVERLAY_INITIALIZE: function(e) {
                var t = e.testModeApplicationId;
                d = t
            },
            DEVELOPER_TEST_MODE_RESET_ERROR: function(e) {
                return m()
            },
            LOGOUT: function(e) {
                return g()
            },
            DEVELOPER_TEST_MODE_RESET: function(e) {
                return g()
            }
        });
        t.default = T
    }).call(this, n(39).setImmediate)
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = n(63),
        i = u(n(10)),
        a = u(n(71)),
        o = u(n(205)),
        s = n(1);

    function u(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function l() {
        return (l = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var c = l({
        sanitizeEmojiName: function(e) {
            for (e = e.replace(s.EMOJI_RE, "").slice(0, s.EMOJI_MAX_LENGTH); e.length < 2;) e += "_";
            return e
        },
        getURL: function(e) {
            return ""
        }
    }, n(1582).default, {
        isEmojiFiltered: function(e, t) {
            var n = i.default.getCurrentUser();
            if (!e.guildId) return !1;
            if (null == t || !(0, r.isGuildTextChannelType)(t.type)) return !1;
            var o = e.guildId === t.getGuildId(),
                u = a.default.can(s.Permissions.USE_EXTERNAL_EMOJIS, n, t);
            return !o && !u
        },
        isEmojiDisabled: function(e, t) {
            var n = i.default.getCurrentUser();
            if (!e.guildId) return !1;
            if (e.animated && !o.default.canUseAnimatedEmojis(n)) return !0;
            if (!e.available) return !0;
            if (null != t && (0, r.isGuildTextChannelType)(t.type)) {
                var u = e.guildId === t.getGuildId(),
                    l = a.default.can(s.Permissions.USE_EXTERNAL_EMOJIS, n, t),
                    c = e.managed || o.default.canUseEmojisEverywhere(n);
                return !u && !(!u && l && c)
            }
            return !o.default.canUseEmojisEverywhere(n) && !e.managed
        }
    });
    t.default = c
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = o(n(12)),
        i = n(1),
        a = o(n(5));

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var s = function(e) {
        var t, n;

        function r(t, n) {
            return e.call(this, t, n, a.default.Messages.FORM_ERROR_GENERIC.format({
                statusPageURL: i.STATUS_PAGE_ENDPOINT
            })) || this
        }
        return n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n, r
    }(r.default.APIError);
    t.default = s
}, ,
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = l(n(3)),
        i = l(n(2)),
        a = l(n(108)),
        o = l(n(66)),
        s = l(n(13)),
        u = (n(1), l(n(5)));

    function l(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function c(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function d() {
        return (d = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var f, p = {},
        _ = s.default.isWindows() ? a.default.process.env.LOCALAPPDATA + "\\DiscordGames" : s.default.isOSX() ? "/Applications/DiscordGames" : "/tmp";

    function h(e, t) {
        var n;
        p = d({}, p, ((n = {})[e] = d({}, p[e] || {}, t), n))
    }

    function E(e) {
        var t = e.applicationId,
            n = e.branchId,
            r = e.installationPath;
        null == f.installations[t] && (f.installations[t] = {}), f.installations[t][n] = {
            installationPath: r
        }, f.installationPaths.has(r) || g({
            path: r,
            metadata: {}
        })
    }

    function m(e) {
        var t = e.applicationId,
            n = e.branchId;
        if (null == f.installations[t]) return !1;
        delete f.installations[t][n], 0 === Object.keys(f.installations[t]).length && delete f.installations[t]
    }

    function g(e) {
        if (f.installationPaths.has(e.path)) return !1;
        h(e.path, e.metadata);
        var t = new Set(f.installationPaths);
        t.add(e.path), f.installationPaths = t
    }
    var v = function(e) {
        var t, n;

        function r() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var i, o, s, l = r.prototype;
        return l.initialize = function(e) {
            var t = d({}, e);
            null == t.installations && (t.installations = {}), null == t.defaultInstallationPath && (t.defaultInstallationPath = _), null == t.installationPaths ? t.installationPaths = new Set([t.defaultInstallationPath]) : t.installationPaths = new Set(Array.from(t.installationPaths)), null == t.pathLabels && (t.pathLabels = {}), f = t
        }, l.getState = function() {
            return f
        }, l.hasGamesInstalledInPath = function(e) {
            var t = f.installations;
            for (var n in t)
                for (var r in t[n])
                    if (t[n][r].installationPath === e) return !0;
            return !1
        }, l.shouldBeInstalled = function(e, t) {
            return null != f.installations[e] && null != f.installations[e][t]
        }, l.getInstallationPath = function(e, t) {
            return null == f.installations[e] || null == f.installations[e][t] ? null : f.installations[e][t].installationPath
        }, l.getLabelFromPath = function(e) {
            return e === _ ? u.default.Messages.INSTALL_LOCATION_MAIN : a.default.fileManager.basename(e) || e.replace(/[\/\\]+$/, "").split(/[\/\\]+/g).slice(-1)[0] || "?"
        }, i = r, (o = [{
            key: "defaultInstallationPath",
            get: function() {
                return f.defaultInstallationPath
            }
        }, {
            key: "installationPaths",
            get: function() {
                return Array.from(f.installationPaths).map(function(e) {
                    return {
                        path: e,
                        label: f.pathLabels[e]
                    }
                })
            }
        }, {
            key: "installationPathsMetadata",
            get: function() {
                return p
            }
        }]) && c(i.prototype, o), s && c(i, s), r
    }(r.default.PersistedStore);
    v.persistKey = "InstallationManagerStore";
    var T = new v(i.default, {
        DISPATCH_APPLICATION_INSTALL: E,
        DISPATCH_APPLICATION_UNINSTALL: m,
        DISPATCH_APPLICATION_CANCEL: function(e) {
            var t = e.applicationId,
                n = e.branchId,
                r = o.default.getState(t, n);
            null != r && null == r.buildId && null == r.manifestIds && m({
                applicationId: t,
                branchId: n
            })
        },
        INSTALLATION_LOCATION_ADD: g,
        INSTALLATION_LOCATION_REMOVE: function(e) {
            var t = e.path;
            if (!f.installationPaths.has(t)) return !1;
            if (f.defaultInstallationPath === t) return !1;
            var n = new Set(f.installationPaths);
            n.delete(t), f.installationPaths = n,
                function(e) {
                    delete(p = d({}, p))[e]
                }(t),
                function(e) {
                    if (null == f.pathLabels[e]) return !1;
                    f.pathLabels = d({}, f.pathLabels), delete f.pathLabels[e]
                }(t)
        },
        INSTALLATION_LOCATION_UPDATE: function(e) {
            var t = e.path,
                n = e.label,
                r = e.isDefault;
            if (!f.installationPaths.has(t)) return !1;
            null != n && "" !== n && f.pathLabels[t] !== n && function(e, t) {
                var n;
                f.pathLabels = d({}, f.pathLabels, ((n = {})[e] = t, n))
            }(t, n), r && f.defaultInstallationPath !== t && (f.defaultInstallationPath = t)
        },
        INSTALLATION_LOCATION_FETCH_METADATA: function(e) {
            var t = e.metadataPayload;
            for (var n in t) h(n, t[n])
        },
        DISPATCH_APPLICATION_ADD_TO_INSTALLATIONS: E
    });
    t.default = T
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = m(n(7)),
        i = m(n(3)),
        a = n(35),
        o = m(n(2)),
        s = E(n(474)),
        u = E(n(347)),
        l = n(159),
        c = n(160),
        d = n(89),
        f = m(n(66)),
        p = m(n(21)),
        _ = m(n(191)),
        h = m(n(51));
    n(1);

    function E(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n)) {
                    var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                    r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                } return t.default = e, t
    }

    function m(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var g = new Set,
        v = {},
        T = new Set,
        y = {},
        I = new Set,
        S = {},
        A = 6e5,
        O = 216e5,
        b = 6e5,
        N = new a.Timeout;

    function C(e) {
        N.start(e + Math.random() * A, s.fetchBranches)
    }

    function R() {
        if (!(0, c.isSupportedPlatform)()) return !1;
        var e = h.default.entitledBranchIds,
            t = [],
            n = e,
            r = Array.isArray(n),
            i = 0;
        for (n = r ? n : n[Symbol.iterator]();;) {
            var a;
            if (r) {
                if (i >= n.length) break;
                a = n[i++]
            } else {
                if ((i = n.next()).done) break;
                a = i.value
            }
            var u = a;
            S.hasOwnProperty(u) || (S[u] = null, t.push(u))
        }
        if (0 === t.length) return !1;
        o.default.wait(function() {
            return s.fetchBranches(t)
        })
    }

    function L(e, t) {
        if (null != v[t] && _.default.shouldBeInstalled(e, t)) {
            var n = v[t],
                i = n.manifestIds,
                a = f.default.getState(e, t);
            null == a || !a.shouldPatch || a.buildId === n.id && r.default.isEqual(a.manifestIds, i) || o.default.wait(function() {
                var r = p.default.getGame(e);
                null != r ? (I.delete((0, d.getComboId)(e, t)), (0, l.updateApplication)(r, t, n.id, i, !0)) : I.add((0, d.getComboId)(e, t))
            })
        }
    }

    function D() {
        N.stop()
    }
    var P = new(function(e) {
        var t, n;

        function r() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var i = r.prototype;
        return i.initialize = function() {
            this.syncWith([h.default], R), this.waitFor(f.default, h.default, p.default)
        }, i.getTargetBuildId = function(e, t) {
            return null == v[t] ? null : v[t].id
        }, i.getTargetManifests = function(e, t) {
            return null == v[t] ? null : v[t].manifestIds
        }, i.hasNoBuild = function(e, t) {
            return T.has(t)
        }, i.isFetching = function(e, t) {
            return g.has(t)
        }, i.needsToFetchBuildSize = function(e) {
            return !y.hasOwnProperty(e)
        }, i.getBuildSize = function(e) {
            return y[e]
        }, r
    }(i.default.Store))(o.default, {
        CONNECTION_OPEN: function(e) {
            return C(O), R()
        },
        GAMES_DATABASE_UPDATE: function(e) {
            return function() {
                if (!(0, c.isSupportedPlatform)()) return !1;
                var e = I,
                    t = Array.isArray(e),
                    n = 0;
                for (e = t ? e : e[Symbol.iterator]();;) {
                    var r;
                    if (t) {
                        if (n >= e.length) break;
                        r = e[n++]
                    } else {
                        if ((n = e.next()).done) break;
                        r = n.value
                    }
                    var i = r,
                        a = (0, d.convertComboId)(i),
                        o = a.applicationId,
                        s = a.branchId;
                    null != p.default.getGame(o) && (I.delete(i), L(o, s))
                }
            }()
        },
        APPLICATION_BUILD_FETCH_START: function(e) {
            var t = e.branchId;
            g.add(t)
        },
        APPLICATION_BUILD_FETCH_SUCCESS: function(e) {
            var t = e.applicationId,
                n = e.branchId,
                r = e.locale,
                i = e.build;
            g.delete(n);
            var a = i.manifests.map(function(e) {
                    return e.id
                }),
                o = i.id;
            T.delete(n), v[n] = {
                id: o,
                applicationId: t,
                branchId: n,
                locale: r,
                manifestIds: a
            }, L(t, n)
        },
        APPLICATION_BUILD_NOT_FOUND: function(e) {
            var t = e.branchId;
            g.delete(t), T.add(t)
        },
        APPLICATION_BUILD_SIZE_FETCH_START: function(e) {
            var t = e.buildId;
            y.hasOwnProperty(t) || (y[t] = null)
        },
        APPLICATION_BUILD_SIZE_FETCH_SUCCESS: function(e) {
            var t = e.buildId,
                n = e.sizeKB;
            y[t] = n
        },
        APPLICATION_BUILD_SIZE_FETCH_FAIL: function(e) {
            var t = e.buildId;
            null == y[t] && delete y[t]
        },
        APPLICATION_BRANCHES_FETCH_SUCCESS: function(e) {
            var t = e.branches,
                n = {};
            for (var r in h.default.libraryApplications) {
                var i = h.default.libraryApplications[r];
                n[i.branchId] = i
            }
            var a = t,
                s = Array.isArray(a),
                l = 0;
            for (a = s ? a : a[Symbol.iterator]();;) {
                var c;
                if (s) {
                    if (l >= a.length) break;
                    c = a[l++]
                } else {
                    if ((l = a.next()).done) break;
                    c = l.value
                }
                var d = c,
                    f = d.id,
                    p = d.liveBuildId;
                p !== S[f] && function() {
                    var e = n[f];
                    null != e && o.default.wait(function() {
                        return u.fetchLiveBuild(e.id, e.branchId)
                    })
                }(), S[f] = p
            }
            C(O)
        },
        APPLICATION_BRANCHES_FETCH_FAIL: function(e) {
            C(b)
        },
        CONNECTION_CLOSED: function(e) {
            return D()
        },
        LOGOUT: function(e) {
            return D()
        },
        SKU_PURCHASE_SUCCESS: function(e) {
            var t = e.entitlements;
            if (!(0, c.isSupportedPlatform)()) return !1;
            var n = new Set,
                r = t,
                i = Array.isArray(r),
                a = 0;
            for (r = i ? r : r[Symbol.iterator]();;) {
                var s;
                if (i) {
                    if (a >= r.length) break;
                    s = r[a++]
                } else {
                    if ((a = r.next()).done) break;
                    s = a.value
                }
                var l = s;
                n.add(l.application_id)
            }
            var f = function(e) {
                var t = h.default.libraryApplications[e];
                n.has(t.id) && (0, d.isUserEntitledToLibraryApplication)(t) && o.default.wait(function() {
                    return u.fetchLiveBuild(t.id, t.branchId)
                })
            };
            for (var p in h.default.libraryApplications) f(p)
        }
    });
    t.default = P
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = t.LobbyError = void 0;
    var r = s(n(7)),
        i = s(n(3)),
        a = s(n(2)),
        o = n(1);

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function u() {
        return (u = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var l = function(e) {
        this.code = e
    };
    t.LobbyError = l;
    var c = {},
        d = {};

    function f(e, t) {
        if (null == d[e]) return null;
        var n = d[e],
            r = n.socketId,
            i = n.timeout,
            a = n.resolve,
            o = n.reject;
        return delete d[e], null != i && clearTimeout(i), null != a && null != o && t(a, o), r
    }

    function p(e) {
        var t = e.lobbyId,
            n = e.member,
            r = n.user,
            i = n.metadata,
            a = c[t];
        if (null == a) return !1;
        var o = a.members.find(function(e) {
            return e.user.id === r.id
        });
        null != o ? (o.user = r, o.metadata = i) : a.members.push({
            user: r,
            metadata: i
        })
    }
    var _ = new(function(e) {
        var t, n;

        function i() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = i).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var a = i.prototype;
        return a.getLobbies = function() {
            return c
        }, a.getLobbiesWithVoice = function() {
            return r.default.filter(c, function(e) {
                return e.voice
            })
        }, a.getLobby = function(e) {
            return c[e]
        }, a.getPendingLobbies = function() {
            return r.default.map(d, function(e, t) {
                return {
                    id: t,
                    secret: e.secret
                }
            })
        }, i
    }(i.default.Store))(a.default, {
        CONNECTION_OPEN: function(e) {
            c = {}
        },
        OVERLAY_INITIALIZE: function(e) {
            c = e.lobbies
        },
        LOBBY_CONNECT: function(e) {
            var t = e.socketId,
                n = e.lobbyId,
                r = e.lobbySecret,
                i = e.resolve,
                s = e.reject;
            null == d[n] && null == c[n] ? d[n] = {
                socketId: t,
                secret: r,
                resolve: i,
                reject: s,
                timeout: __OVERLAY__ ? null : setTimeout(function() {
                    a.default.dispatch({
                        type: o.ActionTypes.LOBBY_DELETE,
                        lobbyId: n,
                        reason: o.LobbyErrors.SERVICE_UNAVAILABLE
                    })
                }, 15e3)
            } : null != s && s(new l(o.LobbyErrors.ALREADY_CONNECTING))
        },
        LOBBY_DISCONNECT: function(e) {
            f(e.lobbyId, function(e, t) {
                return t(new l(o.LobbyErrors.NO_ERROR))
            })
        },
        LOBBY_CREATE: function(e) {
            var t = e.lobby,
                n = f(t.id, function(e) {
                    return e(t)
                });
            null != n && (c[t.id] = u({
                socketId: n,
                voice: !1
            }, c[t.id], t))
        },
        LOBBY_UPDATE: function(e) {
            var t = e.lobby,
                n = c[t.id];
            null != n && (c[t.id] = u({}, n, t))
        },
        LOBBY_DELETE: function(e) {
            var t = e.lobbyId,
                n = e.reason;
            delete c[t], f(t, function(e, t) {
                return t(new l(n))
            })
        },
        LOBBY_MEMBER_CONNECT: p,
        LOBBY_MEMBER_UPDATE: p,
        LOBBY_MEMBER_DISCONNECT: function(e) {
            var t = e.lobbyId,
                n = e.member.user,
                r = c[t];
            if (null == r) return !1;
            r.members = r.members.filter(function(e) {
                return e.user.id !== n.id
            })
        },
        LOBBY_VOICE_CONNECT: function(e) {
            var t = e.lobbyId,
                n = c[t];
            if (null == n) return !1;
            n.voice = !0
        },
        LOBBY_VOICE_DISCONNECT: function(e) {
            var t = e.lobbyId,
                n = c[t];
            if (null == n) return !1;
            n.voice = !1
        },
        RPC_APP_DISCONNECTED: function(e) {
            var t = e.socketId;
            r.default.forEach(c, function(e) {
                e.socketId === t && a.default.dirtyDispatch({
                    type: o.ActionTypes.LOBBY_DISCONNECT,
                    lobbyId: e.id
                })
            })
        }
    });
    t.default = _
},
function(e, t, n) {
    var r = n(61).f,
        i = n(91),
        a = n(42)("toStringTag");
    e.exports = function(e, t, n) {
        e && !i(e = n ? e : e.prototype, a) && r(e, a, {
            configurable: !0,
            value: t
        })
    }
},
function(e, t, n) {
    var r = n(8),
        i = n(125),
        a = n(30),
        o = n(370),
        s = "[" + o + "]",
        u = RegExp("^" + s + s + "*"),
        l = RegExp(s + s + "*$"),
        c = function(e, t, n) {
            var i = {},
                s = a(function() {
                    return !!o[e]() || "​" != "​" [e]()
                }),
                u = i[e] = s ? t(d) : o[e];
            n && (i[n] = u), r(r.P + r.F * s, "String", i)
        },
        d = c.trim = function(e, t) {
            return e = String(i(e)), 1 & t && (e = e.replace(u, "")), 2 & t && (e = e.replace(l, "")), e
        };
    e.exports = c
},
function(e, t) {
    e.exports = {}
},
function(e, t, n) {
    "use strict";
    var r = n(29),
        i = n(61),
        a = n(60),
        o = n(42)("species");
    e.exports = function(e) {
        var t = r[e];
        a && t && !t[o] && i.f(t, o, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
},
function(e, t) {
    e.exports = function(e, t, n, r) {
        if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
        return e
    }
},
function(e, t, n) {
    var r = n(83);
    e.exports = function(e, t, n) {
        for (var i in t) r(e, i, t[i], n);
        return e
    }
},
function(e, t) {
    e.exports = function(e, t, n, r) {
        var i = n ? n.call(r, e, t) : void 0;
        if (void 0 !== i) return !!i;
        if (e === t) return !0;
        if ("object" != typeof e || !e || "object" != typeof t || !t) return !1;
        var a = Object.keys(e),
            o = Object.keys(t);
        if (a.length !== o.length) return !1;
        for (var s = Object.prototype.hasOwnProperty.bind(t), u = 0; u < a.length; u++) {
            var l = a[u];
            if (!s(l)) return !1;
            var c = e[l],
                d = t[l];
            if (!1 === (i = n ? n.call(r, c, d, l) : void 0) || void 0 === i && c !== d) return !1
        }
        return !0
    }
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r, i = n(474),
        a = h(n(77)),
        o = (h(n(80)), h(n(11))),
        s = h(n(156)),
        u = h(n(852)),
        l = h(n(4074)),
        c = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(400)),
        d = h(n(298)),
        f = h(n(20)),
        p = h(n(13)),
        _ = n(1);

    function h(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function E(e, t, n, r, i, a, o) {
        try {
            var s = e[a](o),
                u = s.value
        } catch (e) {
            return void n(e)
        }
        s.done ? t(u) : Promise.resolve(u).then(r, i)
    }

    function m() {
        return (m = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var g = a.default.create("Games"),
        v = 6e4,
        T = {},
        y = 0,
        I = null,
        S = 250,
        A = 12e4,
        O = 36e5;

    function b() {
        return null != I ? Promise.resolve(I) : p.default.isDesktop() ? f.default.ensureModule("discord_game_utils").then(function() {
            var e = f.default.getGameUtils();
            return null != e && null != e.findLaunchable ? (I = e, e) : Promise.reject(new Error("game utils not found"))
        }) : Promise.reject(new Error("not desktop client"))
    }

    function N(e) {
        var t = {
                id: e.id,
                name: e.name,
                thirdPartySkus: e.thirdPartySkus,
                executables: e.executables.filter(function(e) {
                    return e.os === p.default.platform
                }).map(function(e) {
                    return e.name
                })
            },
            n = e.aliases.map(function(e) {
                return m({}, t, {
                    name: e
                })
            });
        return [t].concat(n)
    }

    function C(e) {
        return {
            id: e
        }
    }

    function R(e) {
        var t = {
            id: e.installLocation,
            name: e.name,
            installLocation: e.installLocation
        };
        return null != e.distributor && null != e.sku && (t.thirdPartySkus = [{
            distributor: e.distributor,
            id: e.sku
        }]), null != e.executable && (t.executables = [e.executable.split(".").slice(0, -1).join(".")]), t
    }

    function L(e) {
        return D.apply(this, arguments)
    }

    function D() {
        var e;
        return e = regeneratorRuntime.mark(function e(t) {
            var n, r, i, a, o, s, l, c;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (Array.isArray(t) || (t = [t]), u.default.isDeveloper || (t = t.filter(function(e) {
                                return null == e.thirdPartySkus || -1 === e.thirdPartySkus.findIndex(function(e) {
                                    return e.distributor === _.Distributors.BATTLENET
                                })
                            })), 0 !== t.length) {
                            e.next = 4;
                            break
                        }
                        throw new Error("No remaining launchable queries");
                    case 4:
                        return (n = Date.now()) > y && (y = n + O, T = {}), e.next = 8, b();
                    case 8:
                        r = e.sent, i = regeneratorRuntime.mark(function e() {
                            var t, n;
                            return regeneratorRuntime.wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        if (!o) {
                                            e.next = 6;
                                            break
                                        }
                                        if (!(s >= a.length)) {
                                            e.next = 3;
                                            break
                                        }
                                        return e.abrupt("return", "break");
                                    case 3:
                                        l = a[s++], e.next = 10;
                                        break;
                                    case 6:
                                        if (!(s = a.next()).done) {
                                            e.next = 9;
                                            break
                                        }
                                        return e.abrupt("return", "break");
                                    case 9:
                                        l = s.value;
                                    case 10:
                                        if (null == T[(t = l).id]) {
                                            e.next = 13;
                                            break
                                        }
                                        return e.abrupt("return", {
                                            v: T[t.id]
                                        });
                                    case 13:
                                        return e.next = 15, new Promise(function(e) {
                                            return r.findLaunchable(t, e)
                                        });
                                    case 15:
                                        if (null == (n = e.sent)) {
                                            e.next = 19;
                                            break
                                        }
                                        return T[t.id] = n, e.abrupt("return", {
                                            v: n
                                        });
                                    case 19:
                                    case "end":
                                        return e.stop()
                                }
                            }, e)
                        }), a = t, o = Array.isArray(a), s = 0, a = o ? a : a[Symbol.iterator]();
                    case 11:
                        return e.delegateYield(i(), "t0", 12);
                    case 12:
                        c = e.t0, e.t1 = c, e.next = "break" === e.t1 ? 16 : 17;
                        break;
                    case 16:
                        return e.abrupt("break", 21);
                    case 17:
                        if ("object" != typeof c) {
                            e.next = 19;
                            break
                        }
                        return e.abrupt("return", c.v);
                    case 19:
                        e.next = 11;
                        break;
                    case 21:
                        throw new Error("could not find launchable");
                    case 22:
                    case "end":
                        return e.stop()
                }
            }, e)
        }), (D = function() {
            var t = this,
                n = arguments;
            return new Promise(function(r, i) {
                var a = e.apply(t, n);

                function o(e) {
                    E(a, r, i, o, s, "next", e)
                }

                function s(e) {
                    E(a, r, i, o, s, "throw", e)
                }
                o(void 0)
            })
        }).apply(this, arguments)
    }

    function P(e, t, n, r) {
        void 0 === r && (r = 0), e() ? t() : setTimeout(function() {
            r * S <= A ? P(e, t, n, r + 1) : n()
        }, S)
    }

    function M(e) {
        return g.info("launch", e), new Promise(function(t, n) {
            null != I ? I.launch(e, v, function(e, r) {
                null != e && e === _.GameLaunchStatuses.LAUNCH_TARGET_NOT_FOUND ? n(e) : t(r)
            }) : n(new Error("game utils not found"))
        })
    }

    function w() {
        return new Promise(function(e, t) {
            return null == I ? t(new Error("game utils not found")) : I.scanForGames(e)
        })
    }
    var U = {
        waitSubscribed: function(e, t) {
            return null == r && (r = Promise.resolve().then(n.t.bind(null, 360, 7))), r.then(function(n) {
                var r = n.default;
                return new Promise(function(n, i) {
                    return P(function() {
                        return r.isSubscribed(e, t)
                    }, n, i)
                })
            })
        },
        waitConnected: function(e) {
            return new Promise(P.bind(this, function() {
                return s.default.isConnected(e)
            }))
        },
        isLaunchable: function(e) {
            return L(N(e)).then(function(e) {
                return null != e
            }).catch(function() {
                return !1
            })
        },
        isLocalApplicationLaunchable: function(e) {
            return L(R(e)).then(function(e) {
                return null != e
            }).catch(function() {
                return !1
            })
        },
        launchLocalApplication: function(e) {
            return L(R(e)).then(function(e) {
                if (null != e) return M(e)
            }).catch(function() {
                if (null != e.launchTarget) return M({
                    launchTarget: e.launchTarget,
                    distributor: e.distributor,
                    useLauncher: null != e.distributor
                });
                if (null != e.executable) return M({
                    launchTarget: e.executable,
                    useLauncher: !1,
                    workingDir: e.installLocation
                });
                throw new Error("Couldn't construct launchable for " + e.name)
            })
        },
        launch: function(e) {
            return L(N(e)).then(M)
        },
        launchDispatchApplication: function(e, t, n, r, a) {
            var s = e.launchOptions,
                u = e.defaultLaunchOptionId,
                f = e.installPath,
                p = e.applicationId,
                h = e.branchId,
                E = e.buildId,
                m = e.shouldPatch;
            if (null == s || null == u || null == f) throw new Error("Couldn't construct launchable for " + e.applicationId);
            null == a && (a = u);
            var g = s[a];
            if (null == g) throw new Error("Couldn't construct launchable for " + e.applicationId + ". No launch option.");
            return (0, i.fetchBranches)([h]).then(function(e) {
                var t = e[0];
                if (null == t) return Promise.reject(new Error("branch is null"));
                var n = t.liveBuildId;
                return m && n !== E ? Promise.reject(new Error("live build id changed")) : void 0
            }).then(function() {
                return d.default.runLaunchSetup(p, h)
            }).then(function() {
                var e = g.fullExecutablePath,
                    i = g.arguments,
                    a = g.fullWorkingDir,
                    s = c.normalizePathForCloudSync(f),
                    u = {
                        launchTarget: e,
                        useLauncher: !1,
                        workingDir: a,
                        environment: {
                            DISCORD_INSTANCE_ID: l.default.getId().toString(),
                            DISCORD_ACCESS_TOKEN: t || "",
                            DISCORD_CURRENT_LOCALE: n,
                            DISCORD_CURRENT_BRANCH: r,
                            DISCORD_STORAGE_PATH: _.DefaultCloudSyncConfiguration.ROOT_STORAGE_PATH(s, o.default.getId())
                        }
                    };
                return null != i && (u.arguments = i.join(" ")), M(u)
            })
        },
        removeShortcuts: function(e) {
            return p.default.isWindows() ? b().then(function(t) {
                return t.removeShortcuts && t.removeShortcuts(e)
            }) : Promise.resolve(!1)
        },
        createShortcuts: function(e, t, n, r, i) {
            if (null == i || !p.default.isWindows()) return Promise.resolve(!1);
            var a = "discord:///library/" + r + "/launch",
                o = i + "\\icon.ico";
            return b().then(function(r) {
                return r.createShortcuts && r.createShortcuts(e, t, n, a, o)
            })
        },
        isGameLaunchable: function(e) {
            return L(C(e)).then(function(e) {
                return null != e
            }).catch(function() {
                return !1
            })
        },
        launchGame: function(e) {
            return s.default.isConnected(e) ? Promise.resolve() : L(C(e)).then(M)
        },
        scanForAppCandidates: function() {
            return b().then(w)
        },
        getIconBase64: function(e) {
            return b().then(function() {
                return t = e, new Promise(function(e, n) {
                    return null == I ? n(new Error("game utils not found")) : I.getIconBase64(t, e)
                });
                var t
            })
        },
        isProtocolRegistered: function(e) {
            return b().then(function(t) {
                return null != t.isProtocolSchemeRegistered && t.isProtocolSchemeRegistered(e)
            })
        },
        setRecentGames: function(e) {
            b().then(function(t) {
                return null != t.setRecentGames && t.setRecentGames(e)
            }).catch(function() {})
        }
    };
    t.default = U
},
function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.get = function(e, t, n) {
        return t.split(".").reduce(function(e, t) {
            return e && e[t] ? e[t] : n || null
        }, e)
    }, t.without = function(e, t) {
        return e.filter(function(e) {
            return e !== t
        })
    }, t.isString = function(e) {
        return "string" == typeof e
    }, t.isObject = function(e) {
        return "object" == typeof e
    }, t.xor = function(e, t) {
        var n = new Map,
            r = function(e) {
                return n.set(e, n.has(e) ? n.get(e) + 1 : 1)
            };
        e.forEach(r), t.forEach(r);
        var i = [];
        return n.forEach(function(e, t) {
            1 === e && i.push(t)
        }), i
    }, t.intersection = function(e, t) {
        return e.filter(function(e) {
            return t.indexOf(e) > -1
        })
    }
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(1558)),
        i = s(n(707)),
        a = s(n(7)),
        o = s(n(1576));

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function u() {
        return (u = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }

    function l(e) {
        var t = Object.keys(e)[0];
        return t + "(" + e[t] + ")"
    }
    var c = /rgba\(([\d.]+), ([\d.]+), ([\d.]+), ([\d.]+)\)/;

    function d(e) {
        var t = e.match(c);
        return null != t && (e = "rgba(" + (0 | t[1]) + ", " + (0 | t[2]) + ", " + (0 | t[3]) + ", " + t[4] + ")"), e
    }

    function f(e, t, n) {
        return void 0 !== t && null != n ? a.default.random(t, n) : e
    }
    r.inject.ApplyAnimatedValues(function(e, t, n) {
        if (e.setNativeProps) e.setNativeProps(t);
        else {
            if (!e.nodeType || void 0 === e.setAttribute) return !1;
            o.default.setValueForStyles(e, ((r = t.style) && (r.transform && (r.transform = r.WebkitTransform = r.MozTransform = r.transform.map(l).join(" ")), r.color && (r.color = d(r.color)), r.backgroundColor && (r.backgroundColor = d(r.backgroundColor))), r), n._reactInternalInstance)
        }
        var r
    }, function(e) {
        return e
    });
    var p = u({}, r, {
        Easing: i.default,
        accelerate: function(e) {
            return e.transform = e.transform || [], e.transform.push({
                translateZ: 0
            }), e
        },
        animate: function e(t, n) {
            var i, a = n.toValueMin,
                o = n.toValueMax,
                s = n.tension,
                l = void 0 === s ? 0 : s,
                c = n.friction,
                d = void 0 === c ? 0 : c,
                p = n.loop,
                _ = n.reverse,
                h = n.invert,
                E = n.callback,
                m = n.type,
                g = void 0 === m ? "spring" : m,
                v = n.shouldLoop,
                T = n.durationMin,
                y = n.durationMax,
                I = function(e, t) {
                    if (null == e) return {};
                    var n, r, i = {},
                        a = Object.keys(e);
                    for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
                    return i
                }(n, ["toValueMin", "toValueMax", "tension", "friction", "loop", "reverse", "invert", "callback", "type", "shouldLoop", "durationMin", "durationMax"]),
                S = t._value,
                A = f(n.duration, T, y),
                O = f(n.toValue, a, o),
                b = r[g](t, u({}, I, {
                    toValue: O,
                    tension: l,
                    friction: d,
                    duration: A
                })),
                N = b;
            if (_ || h) {
                var C = f(n.duration, T, y);
                i = r[g](t, u({}, I, {
                    toValue: _ ? S : -O,
                    tension: l,
                    friction: d,
                    duration: C
                })), N = r.sequence([b, i])
            }
            p ? N.start(function() {
                (!v || v && v()) && (E ? E(e.bind(null, t, n)) : e(t, n))
            }) : N.start(E)
        },
        interpolate: function(e) {
            for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
            return e.interpolate({
                inputRange: [0, 1],
                outputRange: n
            })
        },
        Extrapolate: {
            CLAMP: "clamp"
        },
        div: r.createAnimatedComponent("div"),
        span: r.createAnimatedComponent("span"),
        img: r.createAnimatedComponent("img"),
        a: r.createAnimatedComponent("a"),
        form: r.createAnimatedComponent("form"),
        ul: r.createAnimatedComponent("ul"),
        li: r.createAnimatedComponent("li"),
        g: r.createAnimatedComponent("g"),
        use: r.createAnimatedComponent("use"),
        path: r.createAnimatedComponent("path"),
        section: r.createAnimatedComponent("section"),
        video: r.createAnimatedComponent("video")
    });
    t.default = p
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = t.SUPPORT_LOCATION = void 0;
    var r = l(n(12)),
        i = l(n(11)),
        a = l(n(23)),
        o = n(871),
        s = l(n(13)),
        u = n(1);

    function l(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var c = "https://support.discordapp.com";
    t.SUPPORT_LOCATION = c;

    function d(e, t) {
        return void 0 === t && (t = c), t + e
    }

    function f() {
        return a.default.locale.toLowerCase()
    }
    var p = {
        getArticleURL: function(e) {
            return d("/hc/" + f() + "/articles/" + e)
        },
        getDevArticleURL: function(e) {
            return d("/hc/" + f() + "/articles/" + e, "https://support-dev.discordapp.com")
        },
        getTwitterURL: function() {
            return (0, o.getLocalizedLink)(u.LocalizedLinks.TWITTER)
        },
        getCommunityURL: function() {
            return d("/hc/" + f())
        },
        getSubmitRequestURL: function(e, t) {
            void 0 === e && (e = !1);
            var n = d("/hc/" + f() + "/requests/new?platform=" + encodeURIComponent(s.default.platform));
            return null != t && (n += "&device_info=" + encodeURIComponent(t)), e ? (n = encodeURIComponent(n), "" + r.default.getAPIBaseURL() + u.Endpoints.SSO + "?service=zendesk&return_to=" + n + "&token=" + i.default.getToken()) : n
        },
        getSearchURL: function(e) {
            var t = encodeURIComponent(e);
            return d("/hc/" + f() + "/search?utf8=%E2%9C%93&query=" + t + "&commit=Search")
        },
        getFeaturedArticlesJsonURL: function() {
            return d("/api/v2/help_center/en-us/articles.json?label_names=featured")
        }
    };
    t.default = p
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r, i = s(n(4)),
        a = n(1),
        o = s(n(5));

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var u = ((r = {})[a.SubscriptionPlans.PREMIUM_MONTH_LEGACY] = [a.SubscriptionPlans.PREMIUM_YEAR_TIER_2, a.SubscriptionPlans.PREMIUM_MONTH_TIER_2, a.SubscriptionPlans.PREMIUM_YEAR_TIER_1], r[a.SubscriptionPlans.PREMIUM_YEAR_LEGACY] = [a.SubscriptionPlans.PREMIUM_YEAR_TIER_2], r[a.SubscriptionPlans.PREMIUM_MONTH_TIER_1] = [a.SubscriptionPlans.PREMIUM_YEAR_TIER_2, a.SubscriptionPlans.PREMIUM_MONTH_TIER_2, a.SubscriptionPlans.PREMIUM_YEAR_TIER_1], r[a.SubscriptionPlans.PREMIUM_YEAR_TIER_1] = [a.SubscriptionPlans.PREMIUM_YEAR_TIER_2], r[a.SubscriptionPlans.PREMIUM_MONTH_TIER_2] = [a.SubscriptionPlans.PREMIUM_YEAR_TIER_2], r[a.SubscriptionPlans.PREMIUM_YEAR_TIER_2] = [], r.ALL = [a.SubscriptionPlans.PREMIUM_YEAR_TIER_2, a.SubscriptionPlans.PREMIUM_MONTH_TIER_2, a.SubscriptionPlans.PREMIUM_YEAR_TIER_1, a.SubscriptionPlans.PREMIUM_MONTH_TIER_1], r),
        l = new Date(2018, 9, 16),
        c = new Date(2020, 0, 1),
        d = new Date(2021, 0, 1),
        f = 10,
        p = 14;

    function _(e, t) {
        return null == t || null != e && e >= t
    }

    function h(e, t) {
        return null != e && null != e.premiumType && _(e.premiumType, t)
    }

    function E(e) {
        switch (e) {
            case a.SubscriptionPlans.PREMIUM_MONTH_LEGACY:
                return c;
            case a.SubscriptionPlans.PREMIUM_YEAR_LEGACY:
                return d;
            default:
                return null
        }
    }

    function m(e, t) {
        void 0 === t && (t = p);
        var n = (0, i.default)(e).subtract(f, "days"),
            r = (0, i.default)(e).add(t, "days");
        return (0, i.default)().isBetween(n, r)
    }

    function g() {
        return m(l, 60)
    }

    function v(e) {
        return null == e ? u.ALL : u[e] || []
    }
    var T = {
        isPremiumAtLeast: _,
        isPremium: h,
        GRANDFATHERED_DAYS_APPROACHING: 7,
        getGrandfatheredEndDate: E,
        getDaysToGrandfatheredEnd: function(e) {
            var t = E(e);
            if (null == t) return Number.MAX_VALUE;
            var n = (0, i.default)();
            return (0, i.default)(t).diff(n, "days") + 1
        },
        shouldCheckGrandfatheredPlan: function() {
            return g() || m(c) || m(d)
        },
        isNearGrandfatheredStartPeriod: g,
        getPrice: function(e) {
            var t = a.SubscriptionPlanInfo[e];
            if (null != t) return {
                amount: t.price,
                tax: 0,
                currency: a.CurrencyCodes.USD,
                taxInclusive: !0
            };
            throw new Error("Unsupported plan: " + e)
        },
        getInterval: function(e) {
            var t = a.SubscriptionPlanInfo[e];
            if (null != t) return t.interval;
            throw new Error("Unsupported plan: " + e)
        },
        getPremiumType: function(e) {
            var t = a.SubscriptionPlanInfo[e];
            if (null != t) return t.premiumType;
            throw new Error("Unsupported plan: " + e)
        },
        getDisplayName: function(e) {
            switch (e) {
                case a.SubscriptionPlans.PREMIUM_MONTH_LEGACY:
                    return o.default.Messages.PREMIUM_PLAN_MONTH;
                case a.SubscriptionPlans.PREMIUM_YEAR_LEGACY:
                    return o.default.Messages.PREMIUM_PLAN_YEAR;
                case a.SubscriptionPlans.PREMIUM_MONTH_TIER_1:
                    return o.default.Messages.PREMIUM_PLAN_MONTH_TIER_1;
                case a.SubscriptionPlans.PREMIUM_YEAR_TIER_1:
                    return o.default.Messages.PREMIUM_PLAN_YEAR_TIER_1;
                case a.SubscriptionPlans.PREMIUM_MONTH_TIER_2:
                    return o.default.Messages.PREMIUM_PLAN_MONTH_TIER_2;
                case a.SubscriptionPlans.PREMIUM_YEAR_TIER_2:
                    return o.default.Messages.PREMIUM_PLAN_YEAR_TIER_2
            }
            throw new Error("Unsupported plan: " + e)
        },
        getDisplayPremiumType: function(e) {
            switch (e) {
                case a.SubscriptionPlans.PREMIUM_MONTH_TIER_1:
                case a.SubscriptionPlans.PREMIUM_YEAR_TIER_1:
                    return "Nitro Classic";
                case a.SubscriptionPlans.PREMIUM_MONTH_LEGACY:
                case a.SubscriptionPlans.PREMIUM_YEAR_LEGACY:
                case a.SubscriptionPlans.PREMIUM_MONTH_TIER_2:
                case a.SubscriptionPlans.PREMIUM_YEAR_TIER_2:
                    return "Nitro"
            }
            throw new Error("Unsupported plan: " + e)
        },
        getDisplayPremiumTypeForSku: function(e) {
            switch (e) {
                case a.PremiumSubscriptionSKUs.TIER_1:
                    return "Nitro Classic";
                case a.PremiumSubscriptionSKUs.LEGACY:
                case a.PremiumSubscriptionSKUs.TIER_2:
                    return "Nitro";
                default:
                    throw new Error("Unsupported SKU: " + e)
            }
        },
        getUpgradeEligibilities: v,
        isUpgradeable: function(e) {
            var t = u[e];
            return null != t && t.length > 0
        },
        isGrandfathered: function(e) {
            return e === a.SubscriptionPlans.PREMIUM_MONTH_LEGACY || e === a.SubscriptionPlans.PREMIUM_YEAR_LEGACY
        },
        calculateSubscriptionPeriod: function(e, t) {
            var n = a.SubscriptionPlanInfo[e];
            if (null == n) throw new Error("Unsupported plan: " + e);
            var r = null;
            if (n.interval === a.SubscriptionIntervalTypes.MONTH) r = (0, i.default)(t).add(n.intervalCount, "months");
            else {
                if (n.interval !== a.SubscriptionIntervalTypes.YEAR) throw new Error(n.interval + " interval subscription period not implemented");
                r = (0, i.default)(t).add(n.intervalCount, "years")
            }
            return [t, r.toDate()]
        },
        isPremiumSku: function(e) {
            return e === a.PremiumSubscriptionSKUs.TIER_1 || e === a.PremiumSubscriptionSKUs.TIER_2 || e === a.PremiumSubscriptionSKUs.LEGACY
        },
        getClosestUpgrade: function(e) {
            var t = a.SubscriptionPlanInfo[e];
            if (null == t) throw new Error("Unrecognized plan.");
            for (var n = t.interval, r = v(e), i = 0, o = Object.keys(a.SubscriptionPlanInfo); i < o.length; i++) {
                var s = o[i];
                if (n === a.SubscriptionPlanInfo[s].interval && r.includes(s)) return s
            }
            return null
        },
        getIntervalMonths: function(e, t) {
            if (e === a.SubscriptionIntervalTypes.MONTH) return t;
            if (e === a.SubscriptionIntervalTypes.YEAR) return 12 * t;
            throw new Error(e + " interval subscription period not implemented")
        },
        getUserMaxFileSize: function(e) {
            return a.PremiumUserLimits[null != e && null != e.premiumType ? e.premiumType : a.PremiumTypes.NONE].fileSize
        },
        getSkuIdForPlan: function(e) {
            switch (e) {
                case a.SubscriptionPlans.PREMIUM_MONTH_LEGACY:
                case a.SubscriptionPlans.PREMIUM_YEAR_LEGACY:
                    return a.PremiumSubscriptionSKUs.LEGACY;
                case a.SubscriptionPlans.PREMIUM_MONTH_TIER_1:
                case a.SubscriptionPlans.PREMIUM_YEAR_TIER_1:
                    return a.PremiumSubscriptionSKUs.TIER_1;
                case a.SubscriptionPlans.PREMIUM_MONTH_TIER_2:
                case a.SubscriptionPlans.PREMIUM_YEAR_TIER_2:
                    return a.PremiumSubscriptionSKUs.TIER_2
            }
            throw new Error("Unsupported plan: " + e)
        },
        canUseAnimatedEmojis: function(e) {
            return h(e, a.PremiumTypes.TIER_1)
        },
        canUseEmojisEverywhere: function(e) {
            return h(e, a.PremiumTypes.TIER_1)
        },
        canUseHigherFramerate: function(e) {
            return h(e, a.PremiumTypes.TIER_1)
        },
        canEditDiscriminator: function(e) {
            return h(e, a.PremiumTypes.TIER_1)
        },
        canUploadLargeFiles: function(e) {
            return h(e, a.PremiumTypes.TIER_1)
        },
        canUploadAnimatedAvatar: function(e) {
            return h(e, a.PremiumTypes.TIER_1)
        },
        canUseBadges: function(e) {
            return h(e, a.PremiumTypes.TIER_1)
        },
        canInstallPremiumApplications: function(e) {
            return h(e, a.PremiumTypes.TIER_2)
        },
        canRedeemPremiumPerks: function(e) {
            return h(e, a.PremiumTypes.TIER_2)
        },
        canSubscribeToPremiumGuilds: function(e) {
            return h(e, a.PremiumTypes.TIER_2)
        }
    };
    t.default = T
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.openPopout = m, t.default = t.Positions = void 0;
    var r = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(0)),
        i = d(n(9)),
        a = d(n(57)),
        o = d(n(76)),
        s = d(n(181)),
        u = d(n(811)),
        l = n(75),
        c = n(1);

    function d(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function f() {
        return (f = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var p = Object.freeze({
        TOP: "top",
        TOP_LEFT: "top-left",
        TOP_RIGHT: "top-right",
        LEFT: "left",
        RIGHT: "right",
        BOTTOM: "bottom",
        BOTTOM_RIGHT: "bottom-right",
        BOTTOM_LEFT: "bottom-left"
    });
    t.Positions = p;
    var _ = Object.freeze({
            DEFAULT: "default",
            SPRING: "spring",
            NONE: "none"
        }),
        h = Object.freeze({
            TOP: "top",
            MIDDLE: "middle"
        }),
        E = {
            position: p.TOP,
            backdrop: !1,
            animationType: "default",
            closeOnScroll: !0,
            toggleClose: !0,
            shadow: !0,
            preventInvert: !1,
            preventCloseFromModal: !1,
            preventClickPropagation: !1,
            preventCloseOnUnmount: !1,
            zIndexBoost: 0,
            offsetX: 0,
            offsetY: 0,
            arrowAlignment: h.TOP,
            showArrow: !1
        };

    function m(e, t, n, r) {
        var i = t.offsetX,
            o = void 0 === i ? 0 : i,
            u = t.offsetY,
            l = void 0 === u ? 0 : u,
            c = e;
        if (c instanceof Element || (c = a.default.findDOMNode(e)), !(c instanceof Element)) return null;
        var d = 0,
            p = c.getBoundingClientRect(),
            _ = p.top,
            h = p.left,
            E = p.right,
            m = p.bottom;
        null != r && (d = r.pageX - h);
        var g = f({
            key: n,
            targetWidth: E - h,
            targetHeight: m - _,
            x: h + o,
            y: _ + l,
            clickPos: d
        }, t);
        s.default.open(g)
    }
    var g = function(e) {
        var t, n;

        function a(t) {
            var n;
            (n = e.call(this, t) || this).getStateFromStores = function() {
                n.setState({
                    isOpen: u.default.isOpen("" + n.state.uniqueId)
                })
            }, n.toggle = function(e) {
                var t = n.state.isOpen;
                t && n.props.toggleClose ? n.close() : t || n.open(e)
            }, n.close = function() {
                var e = n.state,
                    t = e.isOpen,
                    r = e.uniqueId,
                    i = n.props.onClose;
                t && s.default.close(r), l.ComponentDispatch.unsubscribe(c.ComponentActions.POPOUT_CLOSE, n.close), i && i()
            }, n.handleClick = function(e) {
                var t = n.props,
                    i = t.children;
                if (null != t.render) {
                    e.preventDefault(), e.stopPropagation();
                    var a = r.Children.only(i).props.onClick;
                    n.toggle(e), a && a(e)
                }
            }, n.state = {
                uniqueId: t.uniqueId || o.default.v4(),
                isOpen: !1
            }, u.default.addChangeListener(n.getStateFromStores);
            var i = t.subscribeTo;
            return null != i && l.ComponentDispatch.subscribe(i, n.toggle), n
        }
        n = e, (t = a).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var d = a.prototype;
        return d.componentDidUpdate = function(e, t) {
            e.position !== this.props.position && this.state.isOpen ? this.open() : t.isOpen && !this.state.isOpen && this.close()
        }, d.componentWillUnmount = function() {
            var e = this.props,
                t = e.subscribeTo,
                n = e.preventCloseOnUnmount;
            null != t && l.ComponentDispatch.unsubscribe(t, this.toggle), u.default.removeChangeListener(this.getStateFromStores), n ? l.ComponentDispatch.unsubscribe(c.ComponentActions.POPOUT_CLOSE, this.close) : this.close()
        }, d.open = function(e, t) {
            void 0 === t && (t = this.props);
            var n = t,
                r = n.position,
                i = n.animationType,
                a = n.preventInvert,
                o = n.zIndexBoost,
                s = n.offsetX,
                u = n.offsetY,
                d = n.closeOnScroll,
                f = n.containerClass,
                p = n.dependsOn,
                _ = n.shadow,
                h = n.backdrop,
                E = n.render,
                g = n.onOpen,
                v = n.preventCloseFromModal,
                T = n.arrowAlignment,
                y = n.showArrow,
                I = n.forceTheme;
            if (null == E) return null;
            var S = {
                position: r,
                offsetX: s,
                offsetY: u,
                animationType: i,
                preventInvert: a,
                zIndexBoost: o,
                closeOnScroll: d,
                containerClass: f,
                dependsOn: p,
                shadow: _,
                backdrop: h,
                render: E,
                preventCloseFromModal: v,
                arrowAlignment: T,
                showArrow: y,
                forceTheme: I
            };
            l.ComponentDispatch.subscribe(c.ComponentActions.POPOUT_CLOSE, this.close), m(null != e && e.currentTarget instanceof Element ? e.currentTarget : this, S, this.state.uniqueId, e), g && g()
        }, d.render = function() {
            var e = this.props.children;
            if (null != e) {
                var t = r.Children.only(e);
                return r.cloneElement(t, {
                    onClick: this.handleClick,
                    className: (0, i.default)(t.props.className, {
                        "popout-open": this.state.isOpen
                    })
                })
            }
            return null
        }, a
    }(r.PureComponent);
    g.displayName = "DeprecatedPopout", g.Positions = p, g.Animations = _, g.ArrowAlignments = h, g.defaultProps = E;
    var v = g;
    t.default = v
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r, i = N(n(3)),
        a = N(n(12)),
        o = n(35),
        s = N(n(2)),
        u = n(138),
        l = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(63)),
        c = N(n(264)),
        d = N(n(141)),
        f = N(n(11)),
        p = N(n(325)),
        _ = N(n(14)),
        h = N(n(443)),
        E = N(n(257)),
        m = N(n(433)),
        g = N(n(19)),
        v = N(n(361)),
        T = N(n(212)),
        y = N(n(55)),
        I = N(n(50)),
        S = N(n(40)),
        A = N(n(182)),
        O = N(n(10)),
        b = n(1);

    function N(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function C(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function R(e, t, n, r, i, a, o) {
        try {
            var s = e[a](o),
                u = s.value
        } catch (e) {
            return void n(e)
        }
        s.done ? t(u) : Promise.resolve(u).then(r, i)
    }
    __OVERLAY__ && (r = n(210).default);
    var L = function() {
            return !1
        },
        D = b.Permissions.READ_MESSAGE_HISTORY | b.Permissions.VIEW_CHANNEL,
        P = 100,
        M = 1,
        w = !1,
        U = null,
        k = null,
        x = !1,
        G = [],
        F = !1;

    function Y(e) {
        return e && Date.parse(e) || 0
    }

    function B() {
        return H.apply(this, arguments)
    }

    function H() {
        var e;
        return e = regeneratorRuntime.mark(function e() {
            var t;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (0 !== G.length) {
                            e.next = 3;
                            break
                        }
                        return F = !1, e.abrupt("return");
                    case 3:
                        return F = !0, t = G.splice(0, P), e.prev = 5, e.next = 8, a.default.post({
                            url: b.Endpoints.BULK_ACK,
                            body: {
                                read_states: t
                            }
                        });
                    case 8:
                        e.next = 13;
                        break;
                    case 10:
                        e.prev = 10, e.t0 = e.catch(5), console.error(e.t0);
                    case 13:
                        return e.next = 15, (0, o.timeoutPromise)(1e3 * M);
                    case 15:
                        B();
                    case 16:
                    case "end":
                        return e.stop()
                }
            }, e, null, [
                [5, 10]
            ])
        }), (H = function() {
            var t = this,
                n = arguments;
            return new Promise(function(r, i) {
                var a = e.apply(t, n);

                function o(e) {
                    R(a, r, i, o, s, "next", e)
                }

                function s(e) {
                    R(a, r, i, o, s, "throw", e)
                }
                o(void 0)
            })
        }).apply(this, arguments)
    }
    var V = function() {
        function e(e) {
            this.channelId = e, this._guildId = null, this.loadedMessages = !1, this._lastMessageId = null, this._lastMessageTimestamp = 0, this._ackMessageId = null, this._ackMessageTimestamp = 0, this.ackPinTimestamp = 0, this.lastPinTimestamp = 0, this._oldestUnreadMessageId = null, this.oldestUnreadMessageIdStale = !1, this.estimated = !1, this.unreadCount = 0, this.mentionCount = 0, this.outgoingAck = null
        }
        e.forEach = function(t) {
            for (var n = 0, r = Object.keys(e._readStates); n < r.length; n++) {
                var i = r[n];
                if (!1 === t(e._readStates[i])) break
            }
        }, e.get = function(t) {
            var n = e._readStates[t];
            return null == n && (n = new e(t), e._readStates[t] = n), n
        }, e.getIfExists = function(t) {
            return e._readStates[t]
        }, e.getValue = function(t, n, r) {
            var i = e._readStates[t];
            return null == i ? r : n(i)
        }, e.clear = function(t) {
            return null != e._readStates[t] && (delete e._readStates[t], !0)
        }, e.clearAll = function() {
            e._readStates = {}
        };
        var t, n, r, i = e.prototype;
        return i.serialize = function() {
            return {
                channelId: this.channelId,
                _guildId: this._guildId,
                loadedMessages: this.loadedMessages,
                lastMessageId: this.lastMessageId,
                ackMessageId: this.ackMessageId,
                ackPinTimestamp: this.ackPinTimestamp,
                lastPinTimestamp: this.lastPinTimestamp,
                _oldestUnreadMessageId: this._oldestUnreadMessageId,
                oldestUnreadMessageIdStale: this.oldestUnreadMessageIdStale,
                estimated: this.estimated,
                unreadCount: this.unreadCount,
                mentionCount: this.mentionCount
            }
        }, i.deserialize = function(e) {
            var t = e.channelId,
                n = e._guildId,
                r = e.loadedMessages,
                i = e.lastMessageId,
                a = e.ackMessageId,
                o = e.ackPinTimestamp,
                s = e.lastPinTimestamp,
                u = e._oldestUnreadMessageId,
                l = e.oldestUnreadMessageIdStale,
                c = e.estimated,
                d = e.unreadCount,
                f = e.mentionCount;
            this.channelId = t, this._guildId = n, this.loadedMessages = r, this.lastMessageId = i, this.ackMessageId = a, this.ackPinTimestamp = o, this.lastPinTimestamp = s, this._oldestUnreadMessageId = u, this.oldestUnreadMessageIdStale = l, this.estimated = c, this.unreadCount = d, this.mentionCount = f
        }, i.guessAckMessageId = function() {
            var e = T.default.getMessages(this.channelId);
            if (null != this.ackMessageId || !this.isPrivate() || e.hasMoreAfter) return this.ackMessageId;
            if (!this.hasMentions()) return this.lastMessageId;
            var t = null,
                n = this.mentionCount,
                r = O.default.getCurrentUser();
            return e.forEach(function(e) {
                if (n > 0 && e.author.id !== r.id) --n;
                else if (0 === n) return t = e.id, !1
            }, this, !0), t
        }, i.isPrivate = function() {
            var e = _.default.getChannel(this.channelId);
            return null != e && e.isPrivate()
        }, i.isLfgGroupWithGuildAccess = function() {
            var e = _.default.getChannel(this.channelId);
            return null != e && e.isLFGGroupDM() && null != g.default.getGuild(e.guild_id)
        }, i.isNonMutedPrivateMessage = function(e, t) {
            return this.isPrivate() && !this.isLfgGroupWithGuildAccess() && !A.default.isGuildOrCategoryOrChannelMuted(e, t)
        }, i.rebuild = function(e, t) {
            var n = this;
            if (void 0 === t && (t = !1), this.ackMessageId = e || this.ackMessageId || this.guessAckMessageId(), this.oldestUnreadMessageId = null, this.estimated = !1, this.unreadCount = 0, t && (this.mentionCount = 0), this.hasUnread()) {
                var r = O.default.getCurrentUser(),
                    i = this.getAckTimestamp(),
                    a = !1,
                    o = !1,
                    s = null,
                    u = T.default.getMessages(this.channelId);
                u.forAll(function(e) {
                    a ? n.oldestUnreadMessageId = n.oldestUnreadMessageId || e.id : a = e.id === n.ackMessageId, d.default.extractTimestamp(e.id) > i ? (n.unreadCount++, t && !I.default.isBlocked(e.author.id) && (e.isMentioned(r.id, A.default.isSuppressEveryoneEnabled(n.guildId)) || n.isNonMutedPrivateMessage(n.guildId, n.channelId)) && n.mentionCount++, s = s || e.id) : o = !0
                }), this.estimated = !u.hasPresent() || !(a || o) && u.length === this.unreadCount, this.oldestUnreadMessageId = this.oldestUnreadMessageId || s
            }
        }, i.hasUnread = function() {
            return this.getAckTimestamp() < this._lastMessageTimestamp
        }, i.hasMentions = function() {
            return this.mentionCount > 0
        }, i.hasUnreadOrMentions = function() {
            return this.hasMentions() || this.hasUnread()
        }, i.ackPins = function(e) {
            if (void 0 === e && (e = null), null == e) {
                if (this.lastPinTimestamp === this.ackPinTimestamp) return !1;
                a.default.post(b.Endpoints.PINS_ACK(this.channelId))
            }
            return this.ackPinTimestamp = Y(e) || this.lastPinTimestamp, !0
        }, i.ack = function(e, t, n, r) {
            var i = this;
            if (void 0 === t && (t = !1), void 0 === n && (n = !1), void 0 === r && (r = !1), !r && !this.loadedMessages && !t) return !1;
            var a = this.hasMentions();
            return this.estimated = !1, this.unreadCount = 0, this.mentionCount = 0, (null != e || null != (e = this.lastMessageId)) && (this.ackMessageId = e, t ? this.oldestUnreadMessageId = null : (null == this.outgoingAck && setTimeout(function() {
                i._ack(), i.outgoingAck = null
            }, a || n ? 0 : 2e3), this.outgoingAck = e), !0)
        }, i._ack = function() {
            var e = this,
                t = this.outgoingAck;
            if (null != t && !f.default.isGuest()) {
                var n = f.default.getId(),
                    r = k;
                a.default.post({
                    url: b.Endpoints.MESSAGE_ACK(this.channelId, t),
                    body: {
                        token: k
                    }
                }).then(function(t) {
                    k === r && n === f.default.getId() && (k = t.body.token);
                    var i = _.default.getChannel(e.channelId);
                    (0, u.trackWithMetadata)(b.AnalyticEvents.ACK_MESSAGES, {
                        channel_id: e.channelId,
                        guild_id: null == i ? void 0 : i.getGuildId()
                    })
                })
            }
        }, i.delete = function(t) {
            void 0 === t && (t = !0), t && a.default.delete(b.Endpoints.CHANNEL_ACK(this.channelId)), delete e._readStates[this.channelId]
        }, i.channelReadable = function() {
            var e = _.default.getChannel(this.channelId);
            return !(!e || !(0, l.isReadableType)(e.type)) && (e.isPrivate() || y.default.can(D, {
                channelId: this.channelId
            }))
        }, i.getAckTimestamp = function() {
            var e = this._ackMessageTimestamp;
            if (0 === e) {
                e = d.default.extractTimestamp(this.channelId);
                var t = _.default.getChannel(this.channelId);
                if (null != t) {
                    var n = t.getGuildId();
                    if (null != n) {
                        var r = g.default.getGuild(n);
                        null != r && (e = +r.joinedAt)
                    }
                }
                this._ackMessageTimestamp = e
            }
            return e
        }, t = e, (n = [{
            key: "oldestUnreadMessageId",
            get: function() {
                return this._oldestUnreadMessageId
            },
            set: function(e) {
                this._oldestUnreadMessageId = e, this.oldestUnreadMessageIdStale = !1
            }
        }, {
            key: "lastMessageId",
            get: function() {
                return this._lastMessageId
            },
            set: function(e) {
                this._lastMessageId = e, this._lastMessageTimestamp = d.default.extractTimestamp(e)
            }
        }, {
            key: "ackMessageId",
            get: function() {
                return this._ackMessageId
            },
            set: function(e) {
                this._ackMessageId = e, this._ackMessageTimestamp = d.default.extractTimestamp(e)
            }
        }, {
            key: "guildId",
            get: function() {
                if (null != this._guildId) return this._guildId;
                var e = _.default.getChannel(this.channelId);
                return this._guildId = null != e ? e.getGuildId() : null
            }
        }, {
            key: "oldestUnreadTimestamp",
            get: function() {
                return d.default.extractTimestamp(this.oldestUnreadMessageId)
            }
        }]) && C(t.prototype, n), r && C(t, r), e
    }();

    function j(e) {
        e.forEach(function(e) {
            if ((0, l.isReadableType)(e.type)) {
                var t = V.get(e.id);
                t.lastMessageId = e.lastMessageId, t.lastPinTimestamp = Y(e.lastPinTimestamp)
            }
        })
    }

    function W(e) {
        if (null != e) {
            var t = V.get(e),
                n = r && r.isInstanceFocused() && r.isPinned(b.OverlayWidgets.TEXT);
            if ((w || n) && t.hasUnreadOrMentions() && !L() && h.default.isAtBottom(e)) return t.ack()
        }
        return !1
    }

    function K(e) {
        var t = e.channelId;
        V.get(t).rebuild()
    }

    function z(e) {
        var t = e.channelId,
            n = e.messageId,
            r = e.manual,
            i = V.get(t);
        return r ? (i.rebuild(n, !0), !0) : n !== i.ackMessageId && i.ack(n, !0)
    }
    V._readStates = {};
    var q = new(function(e) {
            var t, n;

            function r() {
                return e.apply(this, arguments) || this
            }
            n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
            var i = r.prototype;
            return i.initialize = function() {
                this.waitFor(h.default, O.default, g.default, E.default, m.default, _.default, S.default, T.default, y.default, p.default)
            }, i.hasUnread = function(e) {
                return V.getValue(e, function(e) {
                    return e.hasUnread()
                }, !1)
            }, i.hasCategoryUnread = function(e) {
                var t = _.default.getChannel(e);
                if (null == t) return !1;
                var n = m.default.getCategories(t.getGuildId());
                return null != n[t.id] && n[t.id].filter(function(e) {
                    var t = e.channel,
                        n = t.id,
                        r = t.type,
                        i = t.guild_id;
                    return (0, l.isReadableType)(r) && !A.default.isGuildOrCategoryOrChannelMuted(i, n)
                }).map(function(e) {
                    var t = e.channel;
                    return V.get(t.id).hasUnread()
                }).some(function(e) {
                    return e
                })
            }, i.getUnreadCount = function(e) {
                return V.getValue(e, function(e) {
                    return e.unreadCount
                }, 0)
            }, i.getMentionCount = function(e) {
                return V.getValue(e, function(e) {
                    return e.mentionCount
                }, 0)
            }, i.ackMessageId = function(e) {
                return V.getValue(e, function(e) {
                    return e.ackMessageId
                }, null)
            }, i.lastMessageId = function(e) {
                return V.getValue(e, function(e) {
                    return e.lastMessageId
                }, null)
            }, i.getOldestUnreadMessageId = function(e) {
                return V.getValue(e, function(e) {
                    return e.oldestUnreadMessageId
                }, null)
            }, i.getOldestUnreadTimestamp = function(e) {
                return V.getValue(e, function(e) {
                    return e.oldestUnreadTimestamp
                }, 0)
            }, i.isEstimated = function(e) {
                return V.getValue(e, function(e) {
                    return e.estimated
                }, !1)
            }, i.hasUnreadPins = function(e) {
                return V.getValue(e, function(e) {
                    return e.lastPinTimestamp > e.ackPinTimestamp
                }, !1)
            }, i.getAllReadStates = function() {
                var e = [];
                return V.forEach(function(t) {
                    null != _.default.getChannel(t.channelId) && t.channelReadable() && e.push(t.serialize())
                }), e
            }, r
        }(i.default.Store))(s.default, {
            CONNECTION_OPEN: function(e) {
                k = null, x || V.clearAll(), x = !1;
                var t = 0 === E.default.totalUnavailableGuilds,
                    n = [];
                e.readState.forEach(function(e) {
                    var r = V.get(e.id);
                    t && !r.channelReadable() ? n.push(r) : (r.mentionCount = e.mention_count || 0, r.ackMessageId = e.last_message_id, r.ackPinTimestamp = Y(e.last_pin_timestamp))
                }), n.length > 0 && (console.log("[ReadStateStore] deleting " + n.length + " read states."), n.forEach(function(e) {
                    return e.delete()
                })), j(e.channels)
            },
            OVERLAY_INITIALIZE: function(e) {
                var t = e.readStates,
                    n = e.selectedChannelId;
                k = null, U = n, V.clearAll();
                var r = 0 === E.default.totalUnavailableGuilds,
                    i = [];
                t.forEach(function(e) {
                    var t = V.get(e.channelId);
                    r && !t.channelReadable() ? i.push(t) : (t.deserialize(e), t.rebuild())
                }), i.length > 0 && (console.log("[ReadStateStore] deleting " + i.length + " read states."), i.forEach(function(e) {
                    return e.delete()
                }))
            },
            CACHE_LOADED: function(e) {
                var t = e.readStates;
                x = !0, t.forEach(function(e) {
                    V.get(e.channelId).deserialize(e)
                })
            },
            GUILD_CREATE: function(e) {
                var t = e.guild;
                t.channels.forEach(function(e) {
                    var t = V.getIfExists(e.id);
                    null == t || t.channelReadable() || t.delete(!1)
                }), j(t.channels)
            },
            LOAD_MESSAGES_SUCCESS: function(e) {
                var t = e.channelId,
                    n = e.isAfter,
                    r = e.messages,
                    i = V.get(t);
                i.loadedMessages = !0;
                var a = T.default.getMessages(t);
                a && (a.hasPresent() || a.jumpTargetId === i.ackMessageId ? i.rebuild() : n && null != i.ackMessageId && a.has(i.ackMessageId, !0) && (i.unreadCount += r.length))
            },
            MESSAGE_CREATE: function(e) {
                var t = e.channelId,
                    n = e.message,
                    i = V.get(t);
                i.lastMessageId = n.id;
                var a = O.default.getNullableCurrentUser(),
                    o = _.default.getChannel(t);
                if (null != n.author && null != a && n.author.id === a.id && (null == o || !o.isLFGGroupDM())) return z({
                    channelId: t,
                    messageId: n.id,
                    manual: !1
                });
                var s = S.default.getChannelId(),
                    u = p.default.getLayout(t);
                return !w || s !== t || !h.default.isAtBottom(t) || u === b.ChannelLayouts.NO_CHAT && u === b.ChannelLayouts.FULL_SCREEN || v.default.isIdle() || L() ? null != r && r.isInstanceFocused() && s === t && r.isInstanceUILocked() && r.isPinned(b.OverlayWidgets.TEXT) ? i.ack(n.id) : ((null == i.oldestUnreadMessageId || i.oldestUnreadMessageIdStale) && (i.oldestUnreadMessageId = n.id), i.unreadCount++, void(I.default.isBlocked(n.author.id) || (null != a && c.default.isMentioned(n, a.id, A.default.isSuppressEveryoneEnabled(i.guildId)) || i.isNonMutedPrivateMessage(null, t)) && i.mentionCount++)) : i.ack(n.id)
            },
            MESSAGE_DELETE: K,
            MESSAGE_DELETE_BULK: K,
            MESSAGE_ACK: z,
            CHANNEL_ACK: function(e) {
                var t = e.channelId,
                    n = e.immediate,
                    r = void 0 !== n && n,
                    i = e.force,
                    a = void 0 !== i && i,
                    o = e.context;
                return V.get(t).ack(void 0, o !== b.CURRENT_APP_CONTEXT, r, a)
            },
            CHANNEL_LOCAL_ACK: function(e) {
                var t = e.channelId;
                return V.get(t).ack(void 0, !0)
            },
            CHANNEL_PINS_ACK: function(e) {
                var t = e.channelId,
                    n = e.timestamp;
                return V.get(t).ackPins(n)
            },
            CHANNEL_PINS_UPDATE: function(e) {
                var t = e.channelId,
                    n = e.lastPinTimestamp,
                    r = V.get(t),
                    i = Y(n);
                return r.lastPinTimestamp !== i && (r.lastPinTimestamp = i, !0)
            },
            CHANNEL_UNREAD_UPDATE: function(e) {
                var t = e.channelUnreadUpdates,
                    n = !1;
                return t.forEach(function(e) {
                    var t = V.get(e.id);
                    t.lastMessageId !== e.last_message_id && (t.lastMessageId = e.last_message_id, n = !0)
                }), n
            },
            CHANNEL_SELECT: function(e) {
                var t = e.channelId,
                    n = !1;
                if (U !== t && null != U) {
                    var r = V.get(U);
                    r.hasUnread() || (r.oldestUnreadMessageId = null, n = !0)
                }
                return U === t && (n = W(t) || n), U = t, n
            },
            CHANNEL_CREATE: function(e) {
                var t = e.channel;
                if (!(0, l.isReadableType)(t.type)) return !1;
                var n = V.get(t.id);
                n.lastMessageId = t.lastMessageId, n.lastPinTimestamp = Y(t.lastPinTimestamp)
            },
            CHANNEL_DELETE: function(e) {
                var t = e.channel;
                return V.clear(t.id)
            },
            WINDOW_FOCUS: function(e) {
                if (w = e.focused, null == U) return !1;
                var t = V.get(U);
                w || t.hasUnread() || (t.oldestUnreadMessageIdStale = !0);
                var n = p.default.getLayout(U);
                return (!w || n !== b.ChannelLayouts.NO_CHAT && n !== b.ChannelLayouts.FULL_SCREEN) && W(U)
            },
            UPDATE_CHANNEL_DIMENSIONS: function(e) {
                return W(e.channelId)
            },
            CURRENT_USER_UPDATE: function(e) {
                k = null
            },
            DRAWER_OPEN: function(e) {
                return function() {
                    if (null != U) {
                        var e = V.get(U);
                        e.hasUnread() || (e.oldestUnreadMessageIdStale = !0)
                    }
                    return !1
                }()
            },
            DRAWER_CLOSE: function(e) {
                return W(U)
            },
            BULK_ACK: function(e) {
                var t = e.channelIds,
                    n = e.context,
                    r = t.map(function(e) {
                        return {
                            channel_id: e,
                            message_id: q.lastMessageId(e)
                        }
                    }).filter(function(e) {
                        return null != e.message_id && q.hasUnread(e.channel_id)
                    });
                r.forEach(function(e) {
                    var t = e.channel_id,
                        n = e.message_id;
                    V.get(t).ack(n, !0)
                }), n === b.CURRENT_APP_CONTEXT && (G.push.apply(G, r), F || B())
            }
        }),
        X = q;
    t.default = X
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = Object.freeze({
        MOBILE_SURVEY: "2019-04_mobile-survey",
        HOMEPAGE_NUF: "2018-3_homepage-nuf",
        GUILD_VIDEO: "2018-07_guild-video-v1",
        REDESIGNED_NUF: "2018-10_redesigned_nuf",
        REDESIGNED_ADD_GUILD: "2018-10_redesigned_add_guild_2",
        PREMIUM_TRIAL: "2018-12_premium_trial",
        MOBILE_NUF_CREATE_SERVER: "2019-01_mobile_nuf_create_server",
        MOBILE_INSTANT_INVITE: "2019_06-better_server_invite",
        MOBILE_NUF_WELCOME: "2019-01_mobile_nuf_welcome_screen",
        SURVEY_NITRO: "2019-02_nitro_survey",
        SYSTEM_SURVEY: "2019-02_system_survey",
        GUEST_LURKER_MODE: "2019-02_guest_lurker_mode",
        HYPESQUAD_WINNER_BADGES: "2019-hypesquad_winner_badges",
        GO_LIVE_IOS_SPECTATOR: "2019-08_go_live_ios_spectator",
        OFF_PLATFORM_PREMIUM_PERK_UPSELL: "2019-04_off_platform_premium_perk_upsell",
        LAST_SELECTED_VOICE_CHANNEL: "2019-04_last_selected_voice_channel",
        SURVEY_LIGHT_THEME: "2019-04_survey-light-theme",
        TABS_IOS: "2019-05_tabs_ios",
        TABS_IOS_EXISTING: "2019-07_tabs_ios_existing",
        WUMPUS_VIDEO: "2019-05_wumpus_video",
        LFG_CHANNEL: "2019-06_lfg_channel",
        MOBILE_RTC_PANEL: "2019-06_rtc_panel",
        MOBILE_NUF_FRIENDS: "2019-06_mobile_nuf_friends",
        NITRO_RETENTION_MODAL: "2019-06_nitro_retention_modal",
        HYPESQUAD_USER_SURVEY: "2019-07_user-survey-desktop-hs",
        NON_HYPESQUAD_USER_SURVEY: "2019-07_user-survey-desktop-non-hs",
        SURVEY_KOREAN_DESKTOP: "2019-07_survey_kr_desktop",
        PREMIUM_RETENTION_EMOJI_PICKER: "2019-08_premium_retention_emoji_picker",
        PREMIUM_UPGRADE_VERBOSE_MODAL: "2019-08_premium_upgrade_verbose_modal",
        MOBILE_NUF_PHASE_1: "2019-08_ios_usecase_choice_nux",
        GUILD_ANALYTICS: "2019-08_guild_analytics",
        NITRO_USER_SURVEY: "2019-08_nitro_user_survey",
        DISCOVER_HOMEPAGE: "2019-08_discover_homepage",
        NOISE_CANCELLATION: "2019-09_noise_cancellation",
        FRIENDS_LIST_REFRESH: "2019-07_mobile_new_friends_screen",
        IOS_VOICE_ACTIVITY: "2019-07_ios_voice_activity",
        NPS_DESKTOP_SURVEY: "2019-09_desktop_survey",
        STREAM_NOTIFICATIONS: "2019-09_stream_notifications",
        EMOJI_KEYBOARD_GUILDS: "2019-09_ios_emoji_keyboard_guild_breakout",
        LARGE_GAME_SERVER_JOIN_INTENT: "2019-09_large_game_server_join_intent",
        LFG_SURVEY: "2019-09_lfg_survey",
        LFG_ACTIVITY_FEED: "2019-10_lfg_activity_feed",
        CHANNEL_TEXTAREA_PREMIUM: "2019-10_channel_textarea_premium",
        LARGE_GUILD_LURKER_EXPERIMENT: "2019-10_large_guild_lurker_experiment",
        PUBLIC_GUILD_SURVEY_SMALL_GUILDS: "2019-10_public_guild_survey_small_guilds",
        PUBLIC_GUILD_SURVEY_MEDIUM_GUILDS: "2019-10_public_guild_survey_medium_guilds",
        PUBLIC_GUILD_SURVEY_LARGE_GUILDS: "2019-10_public_guild_survey_large_guilds",
        PUBLIC_GUILD_SURVEY_XLARGE_GUILDS: "2019-10_public_guild_survey_xlarge_guilds"
    });
    t.default = r
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r, i, a = d(n(3)),
        o = n(43),
        s = d(n(2)),
        u = d(n(402)),
        l = d(n(11)),
        c = n(1);

    function d(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function f() {
        return (f = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var p = !1;

    function _(e, t) {
        if (null == i) throw new Error("Creating RTCConnection without session.");
        var n = new u.default(l.default.getId(), i, e, t);
        return n.on("state", function(e, t, n) {
            s.default.dirtyDispatch(f({
                type: c.ActionTypes.RTC_CONNECTION_STATE,
                state: e,
                hostname: t
            }, n))
        }), n.on("video", function(e, t, n, r, i) {
            s.default.dispatch({
                type: c.ActionTypes.RTC_CONNECTION_VIDEO,
                guildId: e,
                channelId: t,
                userId: n,
                streamId: r,
                rtcServerId: i,
                context: o.MediaEngineContextTypes.DEFAULT,
                quality: c.RTCReceivedVideoQuality.FULL
            })
        }), n.on("ping", function(e, t) {
            s.default.dispatch({
                type: c.ActionTypes.RTC_CONNECTION_PING,
                pings: e,
                quality: t
            })
        }), n.on("outboundlossrate", function(e) {
            s.default.dispatch({
                type: c.ActionTypes.RTC_CONNECTION_LOSS_RATE,
                lossRate: e
            })
        }), n.on("video-quality-changed", function(e, t, n, r, i) {
            s.default.dispatch({
                type: c.ActionTypes.MEDIA_ENGINE_VIDEO_QUALITY_CHANGED,
                guildId: e,
                channelId: t,
                senderUserId: n,
                streamId: r,
                quality: i,
                context: o.MediaEngineContextTypes.DEFAULT
            })
        }), n
    }

    function h() {
        if (null == r) return !1;
        r.destroy(), r = null
    }
    var E = new(function(e) {
        var t, n;

        function i() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = i).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var a = i.prototype;
        return a.getState = function() {
            return null != r ? r.state : c.RTCConnectionStates.DISCONNECTED
        }, a.isConnected = function() {
            return this.getState() === c.RTCConnectionStates.RTC_CONNECTED
        }, a.isDisconnected = function() {
            return this.getState() === c.RTCConnectionStates.DISCONNECTED
        }, a.isDisabled = function() {
            return p
        }, a.getGuildId = function() {
            return r && r.guildId
        }, a.getChannelId = function() {
            return r && r.channelId
        }, a.getHostname = function() {
            return null != r ? r.hostname : ""
        }, a.getQuality = function() {
            return null != r ? r.quality : c.RTCConnectionQuality.UNKNOWN
        }, a.getPings = function() {
            return null != r ? r.getPings() : []
        }, a.getAveragePing = function() {
            return null != r ? r.getAveragePing() : 0
        }, a.getLastPing = function() {
            return r && r.getLastPing()
        }, a.getOutboundLossRate = function() {
            return r && r.getOutboundLossRate()
        }, a.getMediaSessionId = function() {
            return r && r.getMediaSessionId()
        }, a.getRTCConnectionId = function() {
            return r && r.getRTCConnectionId()
        }, a.getDuration = function() {
            return r && r.getDuration()
        }, i
    }(a.default.Store))(s.default, __OVERLAY__ ? {} : {
        CONNECTION_OPEN: function(e) {
            return i = e.sessionId, p = !1, h(), !1
        },
        CONNECTION_CLOSED: function(e) {
            return i = null, p = !1, void h()
        },
        RTC_CONNECTION_STATE: function(e) {
            return !0
        },
        RTC_CONNECTION_PING: function(e) {
            return !0
        },
        RTC_CONNECTION_LOSS_RATE: function(e) {
            return !0
        },
        VOICE_STATE_UPDATE: function(e) {
            if (l.default.getId() !== e.userId) return !1;
            if (null != r) e.sessionId === i ? null != e.guildId && e.guildId === r.guildId || null == e.guildId && e.channelId === r.channelId ? null == e.channelId ? h() : r.channelId = e.channelId : (h(), null != e.channelId && (p = !1, r = _(e.guildId, e.channelId))) : e.guildId === r.guildId && (p = !0, h());
            else {
                if (e.sessionId !== i || null == e.channelId) return !1;
                p = !1, r = _(e.guildId, e.channelId)
            }
        },
        VOICE_CHANNEL_SELECT: function(e) {
            if (null != e.channelId || null == r) return !1;
            h()
        },
        VOICE_SERVER_UPDATE: function(e) {
            return null != r && ((null == e.guildId || e.guildId === r.guildId) && ((null == e.channelId || e.channelId === r.channelId) && void r.connect(e.endpoint, e.token)))
        },
        VOICE_CHANNEL_CLEAR: function(e) {
            p = !1
        },
        GUILD_DELETE: function(e) {
            var t = e.guild;
            if (null == r || r.guildId !== t.id) return !1;
            h()
        },
        CHANNEL_DELETE: function(e) {
            var t = e.channel;
            if (null == r || r.channelId !== t.id) return !1;
            h()
        },
        CALL_DELETE: function(e) {
            var t = e.channelId;
            if (null == r || r.channelId !== t) return !1;
            h()
        },
        APP_STATE_UPDATE: function(e) {
            return e.state === c.AppStates.ACTIVE && null != r && r.resetBackoff("App state is active"), !1
        }
    });
    t.default = E
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = y(n(3)),
        i = y(n(26)),
        a = y(n(2)),
        o = n(359),
        s = y(n(63)),
        u = y(n(14)),
        l = y(n(87)),
        c = y(n(362)),
        d = y(n(150)),
        f = y(n(323)),
        p = y(n(178)),
        _ = y(n(262)),
        h = n(805),
        E = y(n(20)),
        m = n(269),
        g = y(n(13)),
        v = y(n(11)),
        T = n(1);

    function y(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function I(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function S() {
        return (S = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var A = {
            selectedGuildId: null,
            selectedChannelId: null,
            displayUserMode: T.OverlayDisplayUsers.ALWAYS,
            displayNameMode: T.OverlayDisplayNames.ALWAYS,
            avatarSizeMode: T.OverlayAvatarSizes.LARGE,
            notificationPositionMode: T.OverlayNotificationPositions.TOP_LEFT,
            textChatNotifications: T.OverlayNotificationTextChatTypes.ENABLED,
            disableExternalLinkAlert: !1,
            disablePinTutorial: !1,
            textWidgetOpacity: parseInt(100 * h.OpacityBounds.LOWER, 10)
        },
        O = null,
        b = S({}, A),
        N = null,
        C = new Set,
        R = !1,
        L = !1,
        D = !1,
        P = new Set,
        M = !1;

    function w(e) {
        if (e.type === T.ActionTypes.OVERLAY_INITIALIZE && function(e) {
                return null == e.version && null != e.userSettings && 1 === m.OVERLAY_VERSION || (e.version === m.OVERLAY_VERSION || (a.default.dispatch({
                    type: T.ActionTypes.OVERLAY_INCOMPATIBLE_APP
                }), (0, o.disconnect)(), !1))
            }(e) && (D = !0), D) switch (e.type) {
            case T.ActionTypes.CHANNEL_CREATE:
            case T.ActionTypes.CHANNEL_UPDATE:
            case T.ActionTypes.CHANNEL_DELETE:
                var t = new s.default(e.channel);
                a.default.dispatch({
                    type: e.type,
                    channel: t
                });
                break;
            case T.ActionTypes.GUILD_CREATE:
                var n = e.guild;
                n.channels = n.channels.map(function(e) {
                    return new s.default(e)
                }), a.default.dispatch({
                    type: T.ActionTypes.GUILD_CREATE,
                    guild: n
                });
                break;
            default:
                a.default.dispatch(e)
        }
    }

    function U() {
        if (!__OVERLAY__) return !1;
        var e = O === (0, m.getPID)(),
            t = C.has((0, m.getPID)()) || P.size > 0;
        e && t ? a.default.dirtyDispatch({
            type: T.ActionTypes.WINDOW_FOCUS,
            focused: !0
        }) : a.default.dirtyDispatch({
            type: T.ActionTypes.WINDOW_FOCUS,
            focused: !1
        })
    }

    function k() {
        if (O !== (0, m.getPID)()) return !1;
        P.clear()
    }

    function x(e) {
        var t = (0, m.getPID)();
        if (null == e.pid || e.pid === t) switch (e.type) {
            case T.OverlayEventTypes.STORAGE_SYNC:
                r.default.PersistedStore.initializeAll(e.states);
                break;
            case T.OverlayEventTypes.DISPATCH:
                null != e.payloads && (L = !0, e.payloads.forEach(function(e) {
                    return w(e)
                }), L = !1)
        }
    }

    function G() {
        var e;
        e = new Set([T.ActionTypes.CHANNEL_SELECT, T.ActionTypes.VOICE_CHANNEL_SELECT, T.ActionTypes.CHANNEL_COLLAPSE, T.ActionTypes.CATEGORY_COLLAPSE, T.ActionTypes.CATEGORY_EXPAND, T.ActionTypes.AUDIO_TOGGLE_SELF_MUTE, T.ActionTypes.AUDIO_TOGGLE_SELF_DEAF, T.ActionTypes.AUDIO_TOGGLE_LOCAL_MUTE, T.ActionTypes.AUDIO_SET_LOCAL_VOLUME, T.ActionTypes.AUDIO_SET_INPUT_DEVICE, T.ActionTypes.AUDIO_SET_INPUT_VOLUME, T.ActionTypes.AUDIO_SET_OUTPUT_VOLUME, T.ActionTypes.AUDIO_SET_OUTPUT_DEVICE, T.ActionTypes.AUDIO_SET_MODE, T.ActionTypes.OVERLAY_SELECT_CALL, T.ActionTypes.OVERLAY_SET_NOTIFICATION_POSITION_MODE, T.ActionTypes.OVERLAY_SET_UI_LOCKED, T.ActionTypes.OVERLAY_SET_INPUT_LOCKED, T.ActionTypes.OVERLAY_SET_TEXT_WIDGET_OPACITY, T.ActionTypes.OVERLAY_SET_NOT_IDLE, T.ActionTypes.OVERLAY_CALL_PRIVATE_CHANNEL, T.ActionTypes.OVERLAY_SET_DISPLAY_NAME_MODE, T.ActionTypes.OVERLAY_SET_DISPLAY_USER_MODE, T.ActionTypes.OVERLAY_SET_AVATAR_SIZE_MODE, T.ActionTypes.OVERLAY_SET_NOTIFICATION_POSITION_MODE, T.ActionTypes.OVERLAY_SET_TEXT_CHAT_NOTIFICATION_MODE, T.ActionTypes.OVERLAY_JOIN_GAME, T.ActionTypes.LAYOUT_UPDATE_WIDGET, T.ActionTypes.LAYOUT_SET_TOP_WIDGET, T.ActionTypes.LAYOUT_SET_PINNED, T.ActionTypes.LAYOUT_CREATE, T.ActionTypes.CHANNEL_PRELOAD, T.ActionTypes.CALL_DELETE, T.ActionTypes.CHANNEL_ACK, T.ActionTypes.SKU_PURCHASE_MODAL_OPEN, T.ActionTypes.SKU_PURCHASE_MODAL_CLOSE, T.ActionTypes.SKU_PURCHASE_PREVIEW_FETCH_SUCCESS, T.ActionTypes.SKU_PURCHASE_START, T.ActionTypes.SKU_PURCHASE_SUCCESS, T.ActionTypes.SKU_PURCHASE_FAIL, T.ActionTypes.SKU_PURCHASE_SHOW_CONFIRMATION_STEP, T.ActionTypes.SKU_PURCHASE_CLEAR_ERROR, T.ActionTypes.PURCHASE_CONFIRMATION_MODAL_OPEN, T.ActionTypes.PURCHASE_CONFIRMATION_MODAL_CLOSE, T.ActionTypes.ACTIVITY_INVITE_MODAL_CLOSE, T.ActionTypes.LOAD_MESSAGES_SUCCESS, T.ActionTypes.LOAD_MESSAGES_FAILURE, T.ActionTypes.LOAD_MESSAGES, T.ActionTypes.OVERLAY_ACTIVATE_REGION, T.ActionTypes.OVERLAY_DEACTIVATE_ALL_REGIONS, T.ActionTypes.INVITE_MODAL_CLOSE, T.ActionTypes.VOICE_SETTINGS_MODAL_CLOSE, T.ActionTypes.LAYOUT_DELETE_WIDGET, T.ActionTypes.LAYOUT_DELETE_ALL_WIDGETS, T.ActionTypes.LAYOUT_CREATE_WIDGETS, T.ActionTypes.ACTIVITY_JOIN_REQUEST_CLOSE, T.ActionTypes.GIF_FAVORITE_ADD, T.ActionTypes.GIF_FAVORITE_REMOVE, T.ActionTypes.GIFT_CODE_REDEEM, T.ActionTypes.GIFT_CODE_REDEEM_SUCCESS, T.ActionTypes.GIFT_CODE_REDEEM_FAILURE, T.ActionTypes.PREMIUM_REQUIRED_MODAL_OPEN, T.ActionTypes.PREMIUM_REQUIRED_MODAL_CLOSE, T.ActionTypes.PREMIUM_PAYMENT_MODAL_OPEN, T.ActionTypes.PREMIUM_PAYMENT_MODAL_CLOSE, T.ActionTypes.PREMIUM_PAYMENT_SUBSCRIBE_FAIL, T.ActionTypes.PREMIUM_PAYMENT_SUBSCRIBE_SUCCESS, T.ActionTypes.PREMIUM_PAYMENT_ERROR_CLEAR, T.ActionTypes.PREMIUM_PAYMENT_UPDATE_FAIL, T.ActionTypes.PREMIUM_PAYMENT_UPDATE_SUCCESS, T.ActionTypes.PREMIUM_UPGRADE_MODAL_OPEN, T.ActionTypes.PREMIUM_UPGRADE_MODAL_CLOSE, T.ActionTypes.BILLING_SUBSCRIPTION_UPDATE_SUCCESS, T.ActionTypes.MEDIA_ENGINE_SET_DESKTOP_SOURCE, T.ActionTypes.STREAM_START, T.ActionTypes.STREAM_STOP, T.ActionTypes.STREAM_CLOSE, T.ActionTypes.HOTSPOT_HIDE]), a.default.setInterceptor(function(t) {
            if (L) return !1;
            var n = e.has(t.type);
            if (n) switch (t.type) {
                case T.ActionTypes.CHANNEL_SELECT:
                    var r = t.guildId,
                        i = t.channelId;
                    if (n = !1, null == i) break;
                    (0, o.send)({
                        type: T.OverlayEventTypes.DISPATCH,
                        pid: (0, m.getPID)(),
                        payloads: [{
                            type: T.ActionTypes.CHANNEL_PRELOAD,
                            guildId: r === T.ME ? null : r,
                            channelId: i,
                            context: T.CURRENT_APP_CONTEXT
                        }, {
                            type: T.ActionTypes.OVERLAY_SELECT_CHANNEL,
                            guildId: r,
                            channelId: i
                        }]
                    });
                    break;
                case T.ActionTypes.OVERLAY_SET_DISPLAY_NAME_MODE:
                case T.ActionTypes.OVERLAY_SET_DISPLAY_USER_MODE:
                case T.ActionTypes.OVERLAY_SET_AVATAR_SIZE_MODE:
                case T.ActionTypes.OVERLAY_SET_NOTIFICATION_POSITION_MODE:
                case T.ActionTypes.OVERLAY_SET_TEXT_CHAT_NOTIFICATION_MODE:
                case T.ActionTypes.OVERLAY_SET_UI_LOCKED:
                case T.ActionTypes.OVERLAY_SET_INPUT_LOCKED:
                case T.ActionTypes.OVERLAY_SET_TEXT_WIDGET_OPACITY:
                case T.ActionTypes.LAYOUT_UPDATE_WIDGET:
                case T.ActionTypes.LAYOUT_SET_PINNED:
                case T.ActionTypes.LAYOUT_SET_TOP_WIDGET:
                case T.ActionTypes.LAYOUT_CREATE:
                case T.ActionTypes.CATEGORY_EXPAND:
                case T.ActionTypes.CATEGORY_COLLAPSE:
                case T.ActionTypes.VOICE_CHANNEL_SELECT:
                case T.ActionTypes.CHANNEL_ACK:
                case T.ActionTypes.AUDIO_TOGGLE_SELF_MUTE:
                case T.ActionTypes.AUDIO_TOGGLE_SELF_DEAF:
                case T.ActionTypes.AUDIO_TOGGLE_LOCAL_MUTE:
                case T.ActionTypes.AUDIO_SET_LOCAL_VOLUME:
                case T.ActionTypes.AUDIO_SET_INPUT_DEVICE:
                case T.ActionTypes.AUDIO_SET_INPUT_VOLUME:
                case T.ActionTypes.AUDIO_SET_OUTPUT_VOLUME:
                case T.ActionTypes.AUDIO_SET_OUTPUT_DEVICE:
                case T.ActionTypes.AUDIO_SET_MODE:
                case T.ActionTypes.LOAD_MESSAGES_SUCCESS:
                case T.ActionTypes.LOAD_MESSAGES_FAILURE:
                case T.ActionTypes.LOAD_MESSAGES:
                case T.ActionTypes.CHANNEL_PRELOAD:
                case T.ActionTypes.SKU_PURCHASE_MODAL_OPEN:
                case T.ActionTypes.SKU_PURCHASE_MODAL_CLOSE:
                case T.ActionTypes.SKU_PURCHASE_PREVIEW_FETCH_SUCCESS:
                case T.ActionTypes.SKU_PURCHASE_START:
                case T.ActionTypes.SKU_PURCHASE_SUCCESS:
                case T.ActionTypes.SKU_PURCHASE_FAIL:
                case T.ActionTypes.SKU_PURCHASE_SHOW_CONFIRMATION_STEP:
                case T.ActionTypes.SKU_PURCHASE_CLEAR_ERROR:
                case T.ActionTypes.PURCHASE_CONFIRMATION_MODAL_OPEN:
                case T.ActionTypes.PURCHASE_CONFIRMATION_MODAL_CLOSE:
                case T.ActionTypes.OVERLAY_ACTIVATE_REGION:
                case T.ActionTypes.OVERLAY_DEACTIVATE_ALL_REGIONS:
                case T.ActionTypes.INVITE_MODAL_CLOSE:
                case T.ActionTypes.VOICE_SETTINGS_MODAL_CLOSE:
                case T.ActionTypes.LAYOUT_DELETE_WIDGET:
                case T.ActionTypes.LAYOUT_DELETE_ALL_WIDGETS:
                case T.ActionTypes.LAYOUT_CREATE_WIDGETS:
                case T.ActionTypes.GIF_FAVORITE_ADD:
                case T.ActionTypes.GIF_FAVORITE_REMOVE:
                case T.ActionTypes.GIFT_CODE_REDEEM:
                case T.ActionTypes.GIFT_CODE_REDEEM_SUCCESS:
                case T.ActionTypes.GIFT_CODE_REDEEM_FAILURE:
                case T.ActionTypes.PREMIUM_REQUIRED_MODAL_OPEN:
                case T.ActionTypes.PREMIUM_REQUIRED_MODAL_CLOSE:
                case T.ActionTypes.PREMIUM_PAYMENT_MODAL_OPEN:
                case T.ActionTypes.PREMIUM_PAYMENT_MODAL_CLOSE:
                case T.ActionTypes.PREMIUM_PAYMENT_SUBSCRIBE_FAIL:
                case T.ActionTypes.PREMIUM_PAYMENT_SUBSCRIBE_SUCCESS:
                case T.ActionTypes.PREMIUM_PAYMENT_SUBSCRIBE_START:
                case T.ActionTypes.PREMIUM_PAYMENT_ERROR_CLEAR:
                case T.ActionTypes.PREMIUM_PAYMENT_SELECT_PLAN:
                case T.ActionTypes.PREMIUM_PAYMENT_UPDATE_FAIL:
                case T.ActionTypes.PREMIUM_PAYMENT_UPDATE_SUCCESS:
                case T.ActionTypes.PREMIUM_UPGRADE_MODAL_OPEN:
                case T.ActionTypes.PREMIUM_UPGRADE_MODAL_CLOSE:
                case T.ActionTypes.BILLING_SUBSCRIPTION_UPDATE_SUCCESS:
                case T.ActionTypes.STREAM_START:
                case T.ActionTypes.STREAM_CLOSE:
                case T.ActionTypes.MEDIA_ENGINE_SET_DESKTOP_SOURCE:
                case T.ActionTypes.HOTSPOT_HIDE:
                    n = !1;
                default:
                    (0, o.send)({
                        type: T.OverlayEventTypes.DISPATCH,
                        pid: (0, m.getPID)(),
                        payloads: [t]
                    })
            }
            return n
        }), (0, o.setReceiveHandler)(x), (0, o.connect)(), (0, o.send)({
            type: T.OverlayEventTypes.CONNECT,
            pid: (0, m.getPID)()
        })
    }
    var F = function(e) {
        var t, n;

        function r() {
            return e.apply(this, arguments) || this
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var i, a, o, s = r.prototype;
        return s.initialize = function(e) {
            this.waitFor(v.default), __OVERLAY__ && (g.default.embedded && E.default.requireModule("discord_overlay2"), C.delete((0, m.getPID)())), null != e && (null == (b = e).textChatNotifications && (b.textChatNotifications = A.textChatNotifications), null == b.textWidgetOpacity && (b.textWidgetOpacity = A.textWidgetOpacity))
        }, s.getState = function() {
            return b
        }, s.isUILocked = function(e) {
            return !C.has(e)
        }, s.isInstanceUILocked = function() {
            if (!__OVERLAY__) throw new Error("OverlayStore: App instance should never call .isInstanceUILocked()");
            return !C.has((0, m.getPID)())
        }, s.isInstanceFocused = function() {
            if (!__OVERLAY__) throw new Error("OverlayStore: App instance should never call .isInstanceFocused()");
            return O === (0, m.getPID)()
        }, s.isFocused = function(e) {
            return O === e
        }, s.isPinned = function(e) {
            var t = c.default.getLayout(m.OVERLAY_LAYOUT_ID);
            return null != t && null != t.widgets.find(function(t) {
                var n = c.default.getWidget(t);
                return !(null == n || n.type !== e || !n.pinned)
            })
        }, s.getSelectedGuildId = function() {
            return b.selectedGuildId
        }, s.getSelectedChannelId = function() {
            return b.selectedChannelId
        }, s.getSelectedCallId = function() {
            return N
        }, s.getDisplayUserMode = function() {
            return b.displayUserMode
        }, s.getDisplayNameMode = function() {
            return b.displayNameMode
        }, s.getAvatarSizeMode = function() {
            return b.avatarSizeMode
        }, s.getNotificationPositionMode = function() {
            return b.notificationPositionMode
        }, s.getTextChatNotificationMode = function() {
            return b.notificationPositionMode === T.OverlayNotificationPositions.DISABLED ? T.OverlayNotificationTextChatTypes.DISABLED : b.textChatNotifications
        }, s.getDisableExternalLinkAlert = function() {
            return b.disableExternalLinkAlert
        }, s.getFocusedPID = function() {
            return O
        }, s.getActiveRegions = function() {
            return P
        }, s.getTextWidgetOpacity = function() {
            return b.textWidgetOpacity
        }, s.isPreviewingInGame = function() {
            return M
        }, i = r, (a = [{
            key: "initialized",
            get: function() {
                return D
            }
        }, {
            key: "incompatibleApp",
            get: function() {
                return R
            }
        }]) && I(i.prototype, a), o && I(i, o), r
    }(r.default.PersistedStore);
    F.persistKey = "OverlayStoreV2", F.migrations = [function() {
        var e = S({}, i.default.get("OverlayStore")),
            t = (e.pinnedWidgets, e.positions, e.sizes, e.v),
            n = function(e, t) {
                if (null == e) return {};
                var n, r, i = {},
                    a = Object.keys(e);
                for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
                return i
            }(e, ["pinnedWidgets", "positions", "sizes", "v"]);
        return S({}, A, 5 === t ? n : null)
    }];
    var Y = new F(a.default, {
        CONNECTION_CLOSED: function(e) {
            C.clear()
        },
        OVERLAY_START_SESSION: function(e) {
            return G()
        },
        OVERLAY_INITIALIZE: function(e) {
            var t = e.focusedPID;
            O = t
        },
        OVERLAY_READY: function(e) {
            return function() {
                var e = b.selectedGuildId,
                    t = b.selectedChannelId;
                if (null != e && (l.default.hasChannels(e) && (null == t || l.default.hasSelectableChannel(e, t)) || (e = null, t = null)), null != t && null == u.default.getChannel(t) && (e = null, t = null), null == e && null == t && (e = d.default.getGuildId()), null != e && null == t) {
                    var n = l.default.getDefaultChannel(e);
                    null != n && (t = n.id)
                }
                if (null == t) {
                    var r = _.default.getPrivateChannelIds();
                    if (r.length > 0) t = r[0];
                    else {
                        var i = f.default.getFlattenedGuilds();
                        if (i.length > 0) {
                            e = i[0].id;
                            var a = l.default.getDefaultChannel(e);
                            null != a && (t = a.id)
                        }
                    }
                }
                b.selectedGuildId = e, b.selectedChannelId = t
            }()
        },
        OVERLAY_FOCUSED: function(e) {
            var t = e.pid;
            O = t, U()
        },
        OVERLAY_SELECT_CHANNEL: function(e) {
            var t = e.guildId,
                n = e.channelId;
            b.selectedGuildId = t, b.selectedChannelId = n
        },
        OVERLAY_SELECT_CALL: function(e) {
            var t = e.callId;
            N = t
        },
        CALL_DELETE: function(e) {
            N = null
        },
        LAYOUT_CREATE: function(e) {
            return function() {
                if (null == b.selectedChannelId || null == u.default.getChannel(b.selectedChannelId)) {
                    var e = _.default.getPrivateChannelIds();
                    if (e.length > 0) b.selectedChannelId = e[0];
                    else {
                        var t = f.default.getFlattenedGuilds();
                        if (t.length > 0) {
                            b.selectedGuildId = t[0].id;
                            var n = l.default.getDefaultChannel(b.selectedGuildId);
                            null != n && (b.selectedChannelId = n.id)
                        }
                    }
                }
            }()
        },
        OVERLAY_SET_DISPLAY_NAME_MODE: function(e) {
            var t = e.mode;
            b.displayNameMode = t
        },
        OVERLAY_SET_DISPLAY_USER_MODE: function(e) {
            var t = e.mode;
            b.displayUserMode = t
        },
        OVERLAY_SET_AVATAR_SIZE_MODE: function(e) {
            var t = e.mode;
            b.avatarSizeMode = t
        },
        OVERLAY_SET_NOTIFICATION_POSITION_MODE: function(e) {
            var t = e.mode;
            b.notificationPositionMode = t
        },
        OVERLAY_SET_TEXT_CHAT_NOTIFICATION_MODE: function(e) {
            var t = e.mode;
            b.textChatNotifications = t
        },
        OVERLAY_SET_TEXT_WIDGET_OPACITY: function(e) {
            var t = e.opacity,
                n = b.textWidgetOpacity !== t;
            return b.textWidgetOpacity = t, n
        },
        OVERLAY_DISABLE_EXTERNAL_LINK_ALERT: function(e) {
            b.disableExternalLinkAlert = !0
        },
        OVERLAY_INCOMPATIBLE_APP: function(e) {
            R = !0
        },
        OVERLAY_SET_UI_LOCKED: function(e) {
            var t = e.locked,
                n = e.pid;
            t ? C.delete(n) : C.add(n), k(), U(), M = !1
        },
        OVERLAY_ACTIVATE_REGION: function(e) {
            var t = e.region;
            return O === (0, m.getPID)() && (!P.has(t) && void P.add(t))
        },
        OVERLAY_DEACTIVATE_ALL_REGIONS: function(e) {
            return k()
        },
        OVERLAY_SET_PREVIEW_IN_GAME_MODE: function(e) {
            M = e.isPreviewingInGame
        },
        WINDOW_RESIZED: function(e) {
            return function() {
                if (__OVERLAY__) {
                    var e = p.default.windowSize();
                    (0, m.validResolution)(e) || (M = !1)
                }
            }()
        }
    });
    t.default = Y
},
function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.permissionOverwritesForRoles = function(e, t, n) {
        var r = [];
        if (n.length > 0) {
            var a = c.default.NONE;
            ((0, i.isGuildSelectableChannelType)(t) || t === h) && (a |= d.Permissions.VIEW_CHANNEL), E(t, _) && (a |= d.Permissions.CONNECT), r.push({
                id: e,
                type: "role",
                allow: c.default.NONE,
                deny: a
            }), n.forEach(function(e) {
                var n = c.default.NONE;
                ((0, i.isGuildSelectableChannelType)(t) || t === h) && (n |= d.Permissions.VIEW_CHANNEL), E(t, _) && (n |= d.Permissions.CONNECT), r.push({
                    id: e,
                    type: "role",
                    deny: c.default.NONE,
                    allow: n
                })
            })
        }
        return r
    }, t.permissionOverwritesForAnnouncement = function(e) {
        return [{
            id: e,
            type: "role",
            deny: d.Permissions.SEND_MESSAGES,
            allow: c.default.NONE
        }]
    }, t.isChannelFull = function(e, t) {
        return e.userLimit > 0 && t >= e.userLimit
    }, t.getFlattenedChannelList = function(e, t, n) {
        void 0 === n && (n = function() {
            return !0
        });
        return (0, r.default)(e).map(function(e) {
            return "null" === e.channel.id ? t[e.channel.id] : [e, t[e.channel.id]]
        }).flattenDeep().filter(n).value()
    }, t.isChannelCollapsed = function(e, t) {
        var n = e.id,
            r = e.guild_id,
            c = e.parent_id;
        if (null == r || n === t || null == t && n === o.default.getChannelId(r) || n === u.default.getVoiceChannelId() || s.default.getMentionCount(n) > 0) return !1;
        var f = l.default.getMutedChannels(r).has(n);
        if (null != c && a.default.isCollapsed(c) && (f || e.type === d.ChannelTypes.GUILD_VOICE || e.type === d.ChannelTypes.GUILD_STORE || e.type === d.ChannelTypes.GUILD_LFG_LISTINGS || l.default.isChannelMuted(r, c) || (0, i.isGuildReadableType)(e.type) && !1 === s.default.hasUnread(n))) return !0;
        return f && l.default.isGuildCollapsed(r)
    }, t.sanitizeGuildTextChannelName = function(e) {
        return e.replace(/[\s-~]+/g, "-").replace(/^-+/, "").replace(/[\\'!"#$%&()*+,.\/:;<=>?@[\]^`{|}~]/g, "").toLowerCase()
    }, t.getBitrateLimit = function(e) {
        return null != e ? Math.max(e.hasFeature(d.GuildFeatures.VIP_REGIONS) ? d.PremiumGuildLimits[d.PremiumGuildTiers.TIER_3].bitrate : d.BITRATE_MAX, d.PremiumGuildLimits[e.premiumTier].bitrate) : d.BITRATE_MAX
    }, t.shouldRenderVoiceUserSummary = function(e, t, n, r) {
        if (!a.default.isCollapsed(e)) return !1;
        var i = t[e];
        if (null == i || 0 === i.length) return !1;
        return i.some(function(e) {
            var t = e.channel,
                i = r[t.id];
            return t.id !== n && i && i.length > 0
        })
    }, t.computeSummarizedVoiceUsers = function(e, t, n) {
        var r = [];
        return e.forEach(function(e) {
            var i = e.channel,
                a = n[i.id];
            i.id !== t && a && a.forEach(function(e) {
                return r.push(e.user)
            })
        }), r
    }, t.channelTypeString = function(e) {
        switch (e.type) {
            case d.ChannelTypes.DM:
                return f.default.Messages.DM;
            case d.ChannelTypes.GROUP_DM:
                return f.default.Messages.GROUP_DM;
            case d.ChannelTypes.GUILD_TEXT:
                return f.default.Messages.TEXT_CHANNEL;
            case d.ChannelTypes.GUILD_VOICE:
                return f.default.Messages.VOICE_CHANNEL;
            case d.ChannelTypes.GUILD_ANNOUNCEMENT:
                return f.default.Messages.NEWS_CHANNEL;
            case d.ChannelTypes.GUILD_STORE:
                return f.default.Messages.STORE_CHANNEL;
            case d.ChannelTypes.GUILD_LFG_LISTINGS:
                return f.default.Messages.LFG_LISTINGS_CHANNEL;
            default:
                return null
        }
    };
    var r = p(n(7)),
        i = n(63),
        a = p(n(804)),
        o = p(n(808)),
        s = p(n(207)),
        u = p(n(40)),
        l = p(n(182)),
        c = p(n(71)),
        d = n(1),
        f = p(n(5));

    function p(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var _ = d.ChannelTypes.GUILD_VOICE,
        h = d.ChannelTypes.GUILD_CATEGORY;

    function E(e, t) {
        return e === t || e === h
    }
},
function(e, t, n) {
    "use strict";
    (function(e) {
        t.__esModule = !0, t.default = void 0;
        var r = y(n(7)),
            i = y(n(3)),
            a = y(n(2)),
            o = y(n(139)),
            s = y(n(916)),
            u = y(n(328)),
            l = y(n(14)),
            c = y(n(331)),
            d = y(n(443)),
            f = y(n(87)),
            p = y(n(56)),
            _ = y(n(19)),
            h = y(n(50)),
            E = y(n(40)),
            m = y(n(150)),
            g = y(n(23)),
            v = y(n(10)),
            T = n(1);

        function y(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function I() {
            return (I = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }).apply(this, arguments)
        }
        var S = {};

        function A(e, t, n, r) {
            if (void 0 === r && (r = !1), null == t) return !1;
            var i = l.default.getChannel(t);
            if (null != i && i.type === T.ChannelTypes.GUILD_STORE) return !1;
            var a = s.default.getOrCreate(t);
            a.jumpTargetId && (a = a.mutate({
                jumpTargetId: null,
                jumped: !1
            }), s.default.commit(a));
            var u = r;
            if (!c.default.isConnectedOrOverlay() || a.loadingMore || a.ready) {
                if (c.default.isConnectedOrOverlay() && n) u = !0;
                else if (!u && d.default.isAtBottom(t)) return s.default.commit(a.truncateTop(T.MAX_MESSAGES_PER_CHANNEL)), !1
            } else(null == e || _.default.getGuild(e)) && (u = !0, s.default.commit(a.mutate({
                loadingMore: !0
            })));
            u && (n ? o.default.jumpToMessage(t, n, !0) : o.default.fetchMessages(t, null, null, T.MAX_MESSAGES_PER_CHANNEL))
        }

        function O() {
            var e = E.default.getChannelId();
            if (s.default.forEach(function(t) {
                    t.channelId === e ? s.default.commit(t.mutate({
                        ready: !1,
                        loadingMore: !1
                    })) : s.default.clear(t.channelId)
                }), null != e) {
                var t = l.default.getChannel(e);
                null != t && A(t.getGuildId(), t.id)
            }
        }

        function b() {
            s.default.forEach(function(e) {
                e.forAll(function(e) {
                    e.timestamp.locale(g.default.locale)
                })
            })
        }

        function N() {
            s.default.forEach(function(e) {
                var t = e.channelId;
                null == l.default.getChannel(t) && s.default.clear(t)
            })
        }

        function C() {
            s.default.forEach(function(e) {
                s.default.commit(e.reset(e.map(function(e) {
                    return e.set("blocked", h.default.isBlocked(e.author.id))
                })))
            })
        }

        function R(e) {
            var t = e.type,
                n = e.channelId,
                r = e.messageId,
                i = e.userId,
                a = e.emoji,
                o = e.optimistic,
                u = s.default.get(n);
            if (null == u) return !1;
            var l = v.default.getCurrentUser(),
                c = null != l && l.id === i;
            if (o && !c) return !1;
            u = u.update(r, function(e) {
                return t === T.ActionTypes.MESSAGE_REACTION_ADD ? e.addReaction(a, c) : e.removeReaction(a, c)
            }), s.default.commit(u)
        }

        function L(e, t) {
            var n = S[e] || {};
            n[t.id] = t, D(e, n)
        }

        function D(e, t) {
            var n;
            S = I({}, S, ((n = {})[e] = t, n))
        }
        var P = new(function(t) {
            var n, i;

            function a() {
                return t.apply(this, arguments) || this
            }
            i = t, (n = a).prototype = Object.create(i.prototype), n.prototype.constructor = n, n.__proto__ = i;
            var o = a.prototype;
            return o.initialize = function() {
                this.waitFor(v.default, l.default, d.default, p.default, g.default, E.default, m.default, c.default, _.default, h.default, f.default)
            }, o.getRawMessages = function(e) {
                return S[e]
            }, o.getMessages = function(e) {
                return s.default.getOrCreate(e)
            }, o.getMessage = function(e, t) {
                return s.default.getOrCreate(e).get(t)
            }, o.getLastEditableMessage = function(e) {
                var t = v.default.getCurrentUser();
                return (0, r.default)(this.getMessages(e).toArray()).reverse().find(function(e) {
                    return e.author.id === t.id && e.state === T.MessageStates.SENT
                })
            }, o.jumpedMessageId = function(e) {
                var t = s.default.get(e);
                return t && t.jumpTargetId
            }, o.hasPresent = function(e) {
                var t = s.default.get(e);
                return t && t.hasPresent()
            }, o.whenReady = function(t, n) {
                this.addConditionalChangeListener(function() {
                    if (s.default.getOrCreate(t).ready) return e(n), !1
                })
            }, a
        }(i.default.Store))(a.default, {
            CONNECTION_OPEN: function(e) {
                return O()
            },
            OVERLAY_INITIALIZE: function(e) {
                return O()
            },
            CACHE_LOADED: function(e) {
                var t = e.messages;
                r.default.forEach(t, function(e, t) {
                    var n = Object.values(e),
                        r = s.default.getOrCreate(t);
                    r = r.load({
                        newMessages: n,
                        cached: !0
                    }), s.default.commit(r)
                })
            },
            LOAD_MESSAGES: function(e) {
                var t = e.channelId,
                    n = e.jump,
                    r = s.default.getOrCreate(t);
                s.default.commit(r.mutate({
                    loadingMore: !0,
                    jumped: null != n,
                    jumpedToPresent: n && n.present,
                    jumpTargetId: n && n.messageId,
                    ready: !n && r.ready
                }))
            },
            LOAD_MESSAGES_SUCCESS: function(e) {
                var t = e.channelId,
                    n = e.isBefore,
                    r = e.isAfter,
                    i = e.jump,
                    a = e.hasMoreBefore,
                    o = e.hasMoreAfter,
                    u = e.messages,
                    l = s.default.getOrCreate(t);
                l = l.load({
                        newMessages: u,
                        isBefore: n,
                        isAfter: r,
                        jump: i,
                        hasMoreBefore: a,
                        hasMoreAfter: o
                    }), s.default.commit(l),
                    function(e, t) {
                        t.forEach(function(t) {
                            L(e, t)
                        })
                    }(t, u)
            },
            LOAD_MESSAGES_FAILURE: function(e) {
                var t = e.channelId,
                    n = s.default.getOrCreate(t);
                s.default.commit(n.mutate({
                    loadingMore: !1
                }))
            },
            LOAD_MESSAGES_SUCCESS_CACHED: function(e) {
                var t = e.channelId,
                    n = e.jump,
                    r = e.before,
                    i = e.after,
                    a = e.limit,
                    o = s.default.getOrCreate(t);
                n && n.present ? o = o.jumpToPresent(a) : n && n.messageId ? o = o.jumpToMessage(n.messageId, n.flash) : (r || i) && (o = o.loadFromCache(null != r, a)), s.default.commit(o)
            },
            TRUNCATE_MESSAGES: function(e) {
                var t = e.channelId,
                    n = e.truncateBottom,
                    r = e.truncateTop,
                    i = s.default.getOrCreate(t);
                i = i.truncate(n, r), s.default.commit(i)
            },
            MESSAGE_CREATE: function(e) {
                var t = e.channelId,
                    n = e.message,
                    r = s.default.getOrCreate(t);
                if (null == r || !r.ready) return !1;
                r = r.receiveMessage(n, d.default.isAtBottom(t)), s.default.commit(r), L(t, n)
            },
            MESSAGE_SEND_FAILED: function(e) {
                var t = e.channelId,
                    n = e.messageId,
                    r = s.default.getOrCreate(t);
                if (null == r || !r.has(n)) return !1;
                r = r.update(n, function(e) {
                    return e.set("state", T.MessageStates.SEND_FAILED)
                }), s.default.commit(r)
            },
            MESSAGE_UPDATE: function(e) {
                var t = e.message.id,
                    n = e.message.channel_id,
                    r = s.default.getOrCreate(n);
                if (null == r || !r.has(t)) return !1;
                r = r.update(t, function(t) {
                    return t.updateMessage(e.message)
                }), s.default.commit(r), L(n, e.message)
            },
            MESSAGE_DELETE: function(e) {
                var t = e.id,
                    n = e.channelId,
                    r = s.default.getOrCreate(n);
                if (null == r || !r.has(t)) return !1;
                if (r.revealedMessageId === t) {
                    var i = r.getAfter(t);
                    r = null != i && i.blocked ? r.mutate({
                        revealedMessageId: i.id
                    }) : r.mutate({
                        revealedMessageId: null
                    })
                }
                r = r.remove(t), s.default.commit(r),
                    function(e, t) {
                        var n = S[e] || {};
                        delete n[t.id], D(e, n)
                    }(n, {
                        id: t
                    })
            },
            MESSAGE_DELETE_BULK: function(e) {
                var t = e.ids,
                    n = e.channelId,
                    i = s.default.getOrCreate(n);
                if (!i) return !1;
                var a = i.removeMany(t);
                if (i === a) return !1;
                if (null != a.revealedMessageId && r.default.some(t, function(e) {
                        return a.revealedMessageId === e
                    })) {
                    var o = a.getAfter(a.revealedMessageId);
                    a = null != o && o.blocked ? a.mutate({
                        revealedMessageId: o.id
                    }) : a.mutate({
                        revealedMessageId: null
                    })
                }
                s.default.commit(a)
            },
            MESSAGE_REVEAL: function(e) {
                var t = e.channelId,
                    n = e.messageId,
                    r = s.default.getOrCreate(t);
                s.default.commit(r.mutate({
                    revealedMessageId: n
                }))
            },
            CHANNEL_SELECT: function(e) {
                return A(e.guildId, e.channelId, e.messageId)
            },
            CHANNEL_CREATE: function(e) {
                var t = e.channel,
                    n = t.guild_id;
                return null != n && E.default.getChannelId(n) === t.id && A(n, t.id)
            },
            CHANNEL_PRELOAD: function(e) {
                var t = e.guildId,
                    n = e.channelId;
                return e.context === T.CURRENT_APP_CONTEXT && A(t, n, null)
            },
            USER_SETTINGS_UPDATE: function(e) {
                return b()
            },
            I18N_LOAD_SUCCESS: function(e) {
                return b()
            },
            CHANNEL_DELETE: function(e) {
                return N()
            },
            GUILD_DELETE: function(e) {
                return N()
            },
            GUILD_CREATE: function(e) {
                var t = e.guild;
                return A(t.id, E.default.getChannelId(t.id))
            },
            RELATIONSHIP_ADD: function(e) {
                return C()
            },
            RELATIONSHIP_REMOVE: function(e) {
                return C()
            },
            GUILD_MEMBERS_CHUNK: function(e) {
                ! function(e) {
                    s.default.forEach(function(t) {
                        var n = l.default.getChannel(t.channelId);
                        null != n && n.getGuildId() === e && s.default.commit(t.reset(t.map(function(e) {
                            var t = u.default.lookupMember(n.id, e.author.id);
                            return null != t ? e.merge(t) : e
                        })))
                    })
                }(e.guildId)
            },
            MESSAGE_REACTION_ADD: R,
            MESSAGE_REACTION_REMOVE: R,
            MESSAGE_REACTION_REMOVE_ALL: function(e) {
                var t = e.channelId,
                    n = e.messageId,
                    r = s.default.get(t);
                if (null == r) return !1;
                r = r.update(n, function(e) {
                    return e.set("reactions", [])
                }), s.default.commit(r)
            },
            LOGOUT: function(e) {
                s.default.forEach(function(e) {
                    s.default.clear(e.channelId)
                })
            }
        });
        t.default = P
    }).call(this, n(39).setImmediate)
},
function(e, t, n) {
    "use strict";
    /*