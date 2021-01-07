"use strict";

function e(e) {
	return e && "object" == typeof e && "default" in e ? e.default : e
}
var t = e(require("fs")),
	r = e(require("path")),
	n = e(require("crypto")),
	i = e(require("buffer")),
	o = e(require("stream")),
	s = e(require("util")),
	a = e(require("querystring"));
class c extends Error {
	constructor(e) {
		super(e.message), this.errMsg = e.message || "", Object.defineProperties(this, {
			message: {
				get() {
					return `errCode: ${e.code||""} | errMsg: ` + this.errMsg
				},
				set(e) {
					this.errMsg = e
				}
			}
		})
	}
}
const u = Object.prototype.toString,
	f = Object.prototype.hasOwnProperty;

function d(e, t) {
	return f.call(e, t)
}

function l(e) {
	return "[object Object]" === u.call(e)
}

function p(e) {
	return "function" == typeof e
}

function m(e) {
	return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
}
const h = /_(\w)/g,
	g = /[A-Z]/g;

function y(e) {
	return e.replace(h, (e, t) => t ? t.toUpperCase() : "")
}

function w(e) {
	return e.replace(g, e => "_" + e.toLowerCase())
}

function v(e, t) {
	let r, n;
	switch (t) {
		case "snake2camel":
			n = y, r = h;
			break;
		case "camel2snake":
			n = w, r = g
	}
	for (const i in e)
		if (d(e, i) && r.test(i)) {
			const r = n(i);
			e[r] = e[i], delete e[i], l(e[r]) ? e[r] = v(e[r], t) : Array.isArray(e[r]) && (e[r] = e[r].map(e => v(e, t)))
		} return e
}

function b(e) {
	return v(e, "snake2camel")
}

function _(e) {
	return v(e, "camel2snake")
}

function S(e) {
	return function(e, t = "-") {
		e = e || new Date;
		const r = [];
		return r.push(e.getFullYear()), r.push(("00" + (e.getMonth() + 1)).substr(-2)), r.push(("00" + e.getDate()).substr(-
			2)), r.join(t)
	}(e = e || new Date) + " " + function(e, t = ":") {
		e = e || new Date;
		const r = [];
		return r.push(("00" + e.getHours()).substr(-2)), r.push(("00" + e.getMinutes()).substr(-2)), r.push(("00" + e.getSeconds())
			.substr(-2)), r.join(t)
	}(e)
}

function E() {
	"development" === process.env.NODE_ENV && console.log(...arguments)
}

function x(e = 6) {
	let t = "";
	for (let r = 0; r < e; r++) t += Math.floor(10 * Math.random());
	return t
}

function j(e) {
	return Array.from(new Set(e))
}

function k(e = {}, t) {
	if (!t || !e) return e;
	const r = ["_pre", "_purify", "_post"];
	t._pre && (e = t._pre(e));
	let n = {
		shouldDelete: new Set([])
	};
	if (t._purify) {
		const e = t._purify;
		for (const t in e) e[t] = new Set(e[t]);
		n = Object.assign(n, e)
	}
	if (l(t))
		for (const i in t) {
			const o = t[i];
			p(o) && -1 === r.indexOf(i) ? e[i] = o(e) : "string" == typeof o && -1 === r.indexOf(i) && (e[i] = e[o], n.shouldDelete
				.add(o))
		} else p(t) && (e = t(e));
	if (n.shouldDelete)
		for (const t of n.shouldDelete) delete e[t];
	return t._post && (e = t._post(e)), e
}

function I(e, t) {
	const r = new e(t);
	return new Proxy(r, {
		get: function(e, t) {
			if ("function" == typeof e[t] && 0 !== t.indexOf("_") && e._protocols && e._protocols[t]) {
				const r = e._protocols[t];
				return async function(n) {
					n = k(n, r.args);
					let i = await e[t](n);
					return i = k(i, r.returnValue), i
				}
			}
			return e[t]
		}
	})
}

function R(e) {
	let t, r, n = e - Date.now(),
		i = "后";
	n < 0 && (i = "前", n = -n);
	const o = Math.floor(n / 1e3),
		s = Math.floor(o / 60),
		a = Math.floor(s / 60),
		c = Math.floor(a / 24),
		u = Math.floor(c / 30),
		f = Math.floor(u / 12);
	switch (!0) {
		case f > 0:
			t = f, r = "年";
			break;
		case u > 0:
			t = u, r = "月";
			break;
		case c > 0:
			t = c, r = "天";
			break;
		case a > 0:
			t = a, r = "小时";
			break;
		case s > 0:
			t = s, r = "分钟";
			break;
		default:
			t = o, r = "秒"
	}
	return `${t}${r}${i}`
}

function P(e) {
	return async function() {
		const t = await e(...arguments);
		return l(t) && t.msg && (t.message = t.msg), t
	}
}
const O = uniCloud.database(),
	T = O.collection("uni-id-users"),
	A = O.collection("opendb-verify-codes"),
	C = O.collection("uni-id-roles"),
	D = O.collection("uni-id-permissions");
let M = {};
try {
	M = JSON.parse(t.readFileSync(r.resolve(__dirname, "config.json")))
} catch (e) {}

function $(e) {
	const t = Object.assign(M, M[e || __ctx__.PLATFORM]) || {},
		r = Object.assign({
			bindTokenToDevice: !0
		}, t);
	return ["passwordSecret", "tokenSecret", "tokenExpiresIn", "passwordErrorLimit", "passwordErrorRetryTime"].forEach(e => {
		if (!r || !r[e]) throw new Error("请在公用模块uni-id的config.json或init方法中内添加配置项：" + e)
	}), r
}

function N(e, {
	value: t,
	version: r
} = {}) {
	if (!t) {
		const e = $(),
			{
				passwordSecret: n
			} = e;
		if ("array" === m(n)) {
			const e = n.sort((e, t) => e.version - t.version);
			t = e[e.length - 1].value, r = e[e.length - 1].version
		} else t = n
	}
	if (!t) throw new Error("passwordSecret不正确");
	const i = n.createHmac("sha1", t.toString("ascii"));
	return i.update(e), {
		passwordHash: i.digest("hex"),
		version: r
	}
}

function B(e, t) {
	if (!t) return {
		code: 1,
		message: "密码不能为空"
	};
	const {
		password: r,
		password_secret_version: n
	} = e, i = $(), {
		passwordSecret: o
	} = i, s = m(o);
	if ("string" === s) {
		const {
			passwordHash: e
		} = N(t, {
			value: o
		});
		return e === r ? {
			code: 0,
			message: "密码校验通过"
		} : {
			code: 2,
			message: "密码不正确"
		}
	}
	if ("array" !== s) throw new Error("config内passwordSecret类型错误，只可设置string类型和array类型");
	const a = o.sort((e, t) => e.version - t.version);
	let c;
	if (c = n ? a.find(e => e.version === n) : a[0], !c) return {
		code: 3,
		message: "secretVersion不正确"
	};
	const u = a[a.length - 1],
		{
			passwordHash: f
		} = N(t, c);
	if (f === r) {
		const e = {
			code: 0,
			message: "密码校验通过"
		};
		if (c !== u) {
			const {
				passwordHash: r,
				version: n
			} = N(t, u);
			e.passwordHash = r, e.passwordVersion = n
		}
		return e
	}
	return {
		code: 4,
		message: ""
	}
}
const L = uniCloud.database().command;

function V(e = 6) {
	const t = ["2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N",
		"P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
	];
	let r = "";
	for (let n = 0; n < e; n++) r += t[Math.floor(Math.random() * t.length)];
	return r
}
async function K({
	inviteCode: e
}) {
	let t, r = 10;
	e ? (r = 1, t = e) : t = V();
	let n = !1;
	try {
		for (; r > 0 && !n;) {
			r--;
			if (0 === (await T.where({
					invite_code: t
				}).get()).data.length) {
				n = !0;
				break
			}
			t = V()
		}
		return n ? {
			code: 0,
			inviteCode: t
		} : e ? {
			code: 80401,
			msg: "邀请码重复，设置失败"
		} : {
			code: 80402,
			msg: "邀请码设置失败稍后再试"
		}
	} catch (e) {
		return {
			code: 90001,
			msg: "数据库读写异常"
		}
	}
}

function q(e, t) {
	return e(t = {
		exports: {}
	}, t.exports), t.exports
}
var H = q((function(e, t) {
		var r = i.Buffer;

		function n(e, t) {
			for (var r in e) t[r] = e[r]
		}

		function o(e, t, n) {
			return r(e, t, n)
		}
		r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? e.exports = i : (n(i, t), t.Buffer = o), o.prototype =
			Object.create(r.prototype), n(r, o), o.from = function(e, t, n) {
				if ("number" == typeof e) throw new TypeError("Argument must not be a number");
				return r(e, t, n)
			}, o.alloc = function(e, t, n) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				var i = r(e);
				return void 0 !== t ? "string" == typeof n ? i.fill(t, n) : i.fill(t) : i.fill(0), i
			}, o.allocUnsafe = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return r(e)
			}, o.allocUnsafeSlow = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return i.SlowBuffer(e)
			}
	})),
	U = (H.Buffer, H.Buffer);

function F(e) {
	if (this.buffer = null, this.writable = !0, this.readable = !0, !e) return this.buffer = U.alloc(0), this;
	if ("function" == typeof e.pipe) return this.buffer = U.alloc(0), e.pipe(this), this;
	if (e.length || "object" == typeof e) return this.buffer = e, this.writable = !1, process.nextTick(function() {
		this.emit("end", e), this.readable = !1, this.emit("close")
	}.bind(this)), this;
	throw new TypeError("Unexpected data type (" + typeof e + ")")
}
s.inherits(F, o), F.prototype.write = function(e) {
	this.buffer = U.concat([this.buffer, U.from(e)]), this.emit("data", e)
}, F.prototype.end = function(e) {
	e && this.write(e), this.emit("end", e), this.emit("close"), this.writable = !1, this.readable = !1
};
var J = F,
	G = i.Buffer,
	z = i.SlowBuffer,
	W = X;

function X(e, t) {
	if (!G.isBuffer(e) || !G.isBuffer(t)) return !1;
	if (e.length !== t.length) return !1;
	for (var r = 0, n = 0; n < e.length; n++) r |= e[n] ^ t[n];
	return 0 === r
}
X.install = function() {
	G.prototype.equal = z.prototype.equal = function(e) {
		return X(this, e)
	}
};
var Z = G.prototype.equal,
	Y = z.prototype.equal;

function Q(e) {
	return (e / 8 | 0) + (e % 8 == 0 ? 0 : 1)
}
X.restore = function() {
	G.prototype.equal = Z, z.prototype.equal = Y
};
var ee = {
	ES256: Q(256),
	ES384: Q(384),
	ES512: Q(521)
};
var te = function(e) {
		var t = ee[e];
		if (t) return t;
		throw new Error('Unknown algorithm "' + e + '"')
	},
	re = H.Buffer;

function ne(e) {
	if (re.isBuffer(e)) return e;
	if ("string" == typeof e) return re.from(e, "base64");
	throw new TypeError("ECDSA signature must be a Base64 string or a Buffer")
}

function ie(e, t, r) {
	for (var n = 0; t + n < r && 0 === e[t + n];) ++n;
	return e[t + n] >= 128 && --n, n
}
var oe = {
		derToJose: function(e, t) {
			e = ne(e);
			var r = te(t),
				n = r + 1,
				i = e.length,
				o = 0;
			if (48 !== e[o++]) throw new Error('Could not find expected "seq"');
			var s = e[o++];
			if (129 === s && (s = e[o++]), i - o < s) throw new Error('"seq" specified length of "' + s + '", only "' + (i - o) +
				'" remaining');
			if (2 !== e[o++]) throw new Error('Could not find expected "int" for "r"');
			var a = e[o++];
			if (i - o - 2 < a) throw new Error('"r" specified length of "' + a + '", only "' + (i - o - 2) + '" available');
			if (n < a) throw new Error('"r" specified length of "' + a + '", max of "' + n + '" is acceptable');
			var c = o;
			if (o += a, 2 !== e[o++]) throw new Error('Could not find expected "int" for "s"');
			var u = e[o++];
			if (i - o !== u) throw new Error('"s" specified length of "' + u + '", expected "' + (i - o) + '"');
			if (n < u) throw new Error('"s" specified length of "' + u + '", max of "' + n + '" is acceptable');
			var f = o;
			if ((o += u) !== i) throw new Error('Expected to consume entire buffer, but "' + (i - o) + '" bytes remain');
			var d = r - a,
				l = r - u,
				p = re.allocUnsafe(d + a + l + u);
			for (o = 0; o < d; ++o) p[o] = 0;
			e.copy(p, o, c + Math.max(-d, 0), c + a);
			for (var m = o = r; o < m + l; ++o) p[o] = 0;
			return e.copy(p, o, f + Math.max(-l, 0), f + u), p = (p = p.toString("base64")).replace(/=/g, "").replace(/\+/g,
				"-").replace(/\//g, "_")
		},
		joseToDer: function(e, t) {
			e = ne(e);
			var r = te(t),
				n = e.length;
			if (n !== 2 * r) throw new TypeError('"' + t + '" signatures must be "' + 2 * r + '" bytes, saw "' + n + '"');
			var i = ie(e, 0, r),
				o = ie(e, r, e.length),
				s = r - i,
				a = r - o,
				c = 2 + s + 1 + 1 + a,
				u = c < 128,
				f = re.allocUnsafe((u ? 2 : 3) + c),
				d = 0;
			return f[d++] = 48, u ? f[d++] = c : (f[d++] = 129, f[d++] = 255 & c), f[d++] = 2, f[d++] = s, i < 0 ? (f[d++] = 0,
					d += e.copy(f, d, 0, r)) : d += e.copy(f, d, i, r), f[d++] = 2, f[d++] = a, o < 0 ? (f[d++] = 0, e.copy(f, d, r)) :
				e.copy(f, d, r + o), f
		}
	},
	se = H.Buffer,
	ae = "secret must be a string or buffer",
	ce = "key must be a string or a buffer",
	ue = "function" == typeof n.createPublicKey;

function fe(e) {
	if (!se.isBuffer(e) && "string" != typeof e) {
		if (!ue) throw me(ce);
		if ("object" != typeof e) throw me(ce);
		if ("string" != typeof e.type) throw me(ce);
		if ("string" != typeof e.asymmetricKeyType) throw me(ce);
		if ("function" != typeof e.export) throw me(ce)
	}
}

function de(e) {
	if (!se.isBuffer(e) && "string" != typeof e && "object" != typeof e) throw me(
		"key must be a string, a buffer or an object")
}

function le(e) {
	return e.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function pe(e) {
	var t = 4 - (e = e.toString()).length % 4;
	if (4 !== t)
		for (var r = 0; r < t; ++r) e += "=";
	return e.replace(/\-/g, "+").replace(/_/g, "/")
}

function me(e) {
	var t = [].slice.call(arguments, 1),
		r = s.format.bind(s, e).apply(null, t);
	return new TypeError(r)
}

function he(e) {
	var t;
	return t = e, se.isBuffer(t) || "string" == typeof t || (e = JSON.stringify(e)), e
}

function ge(e) {
	return function(t, r) {
		! function(e) {
			if (!se.isBuffer(e)) {
				if ("string" == typeof e) return e;
				if (!ue) throw me(ae);
				if ("object" != typeof e) throw me(ae);
				if ("secret" !== e.type) throw me(ae);
				if ("function" != typeof e.export) throw me(ae)
			}
		}(r), t = he(t);
		var i = n.createHmac("sha" + e, r);
		return le((i.update(t), i.digest("base64")))
	}
}

function ye(e) {
	return function(t, r, n) {
		var i = ge(e)(t, n);
		return W(se.from(r), se.from(i))
	}
}

function we(e) {
	return function(t, r) {
		de(r), t = he(t);
		var i = n.createSign("RSA-SHA" + e);
		return le((i.update(t), i.sign(r, "base64")))
	}
}

function ve(e) {
	return function(t, r, i) {
		fe(i), t = he(t), r = pe(r);
		var o = n.createVerify("RSA-SHA" + e);
		return o.update(t), o.verify(i, r, "base64")
	}
}

function be(e) {
	return function(t, r) {
		de(r), t = he(t);
		var i = n.createSign("RSA-SHA" + e);
		return le((i.update(t), i.sign({
			key: r,
			padding: n.constants.RSA_PKCS1_PSS_PADDING,
			saltLength: n.constants.RSA_PSS_SALTLEN_DIGEST
		}, "base64")))
	}
}

function _e(e) {
	return function(t, r, i) {
		fe(i), t = he(t), r = pe(r);
		var o = n.createVerify("RSA-SHA" + e);
		return o.update(t), o.verify({
			key: i,
			padding: n.constants.RSA_PKCS1_PSS_PADDING,
			saltLength: n.constants.RSA_PSS_SALTLEN_DIGEST
		}, r, "base64")
	}
}

function Se(e) {
	var t = we(e);
	return function() {
		var r = t.apply(null, arguments);
		return r = oe.derToJose(r, "ES" + e)
	}
}

function Ee(e) {
	var t = ve(e);
	return function(r, n, i) {
		return n = oe.joseToDer(n, "ES" + e).toString("base64"), t(r, n, i)
	}
}

function xe() {
	return function() {
		return ""
	}
}

function je() {
	return function(e, t) {
		return "" === t
	}
}
ue && (ce += " or a KeyObject", ae += "or a KeyObject");
var ke = function(e) {
		var t = {
				hs: ge,
				rs: we,
				ps: be,
				es: Se,
				none: xe
			},
			r = {
				hs: ye,
				rs: ve,
				ps: _e,
				es: Ee,
				none: je
			},
			n = e.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
		if (!n) throw me(
			'"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".',
			e);
		var i = (n[1] || n[3]).toLowerCase(),
			o = n[2];
		return {
			sign: t[i](o),
			verify: r[i](o)
		}
	},
	Ie = i.Buffer,
	Re = function(e) {
		return "string" == typeof e ? e : "number" == typeof e || Ie.isBuffer(e) ? e.toString() : JSON.stringify(e)
	},
	Pe = H.Buffer;

function Oe(e, t) {
	return Pe.from(e, t).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function Te(e) {
	var t = e.header,
		r = e.payload,
		n = e.secret || e.privateKey,
		i = e.encoding,
		o = ke(t.alg),
		a = function(e, t, r) {
			r = r || "utf8";
			var n = Oe(Re(e), "binary"),
				i = Oe(Re(t), r);
			return s.format("%s.%s", n, i)
		}(t, r, i),
		c = o.sign(a, n);
	return s.format("%s.%s", a, c)
}

function Ae(e) {
	var t = e.secret || e.privateKey || e.key,
		r = new J(t);
	this.readable = !0, this.header = e.header, this.encoding = e.encoding, this.secret = this.privateKey = this.key = r,
		this.payload = new J(e.payload), this.secret.once("close", function() {
			!this.payload.writable && this.readable && this.sign()
		}.bind(this)), this.payload.once("close", function() {
			!this.secret.writable && this.readable && this.sign()
		}.bind(this))
}
s.inherits(Ae, o), Ae.prototype.sign = function() {
	try {
		var e = Te({
			header: this.header,
			payload: this.payload.buffer,
			secret: this.secret.buffer,
			encoding: this.encoding
		});
		return this.emit("done", e), this.emit("data", e), this.emit("end"), this.readable = !1, e
	} catch (e) {
		this.readable = !1, this.emit("error", e), this.emit("close")
	}
}, Ae.sign = Te;
var Ce = Ae,
	De = H.Buffer,
	Me = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

function $e(e) {
	if (function(e) {
			return "[object Object]" === Object.prototype.toString.call(e)
		}(e)) return e;
	try {
		return JSON.parse(e)
	} catch (e) {
		return
	}
}

function Ne(e) {
	var t = e.split(".", 1)[0];
	return $e(De.from(t, "base64").toString("binary"))
}

function Be(e) {
	return e.split(".")[2]
}

function Le(e) {
	return Me.test(e) && !!Ne(e)
}

function Ve(e, t, r) {
	if (!t) {
		var n = new Error("Missing algorithm parameter for jws.verify");
		throw n.code = "MISSING_ALGORITHM", n
	}
	var i = Be(e = Re(e)),
		o = function(e) {
			return e.split(".", 2).join(".")
		}(e);
	return ke(t).verify(o, i, r)
}

function Ke(e, t) {
	if (t = t || {}, !Le(e = Re(e))) return null;
	var r = Ne(e);
	if (!r) return null;
	var n = function(e, t) {
		t = t || "utf8";
		var r = e.split(".")[1];
		return De.from(r, "base64").toString(t)
	}(e);
	return ("JWT" === r.typ || t.json) && (n = JSON.parse(n, t.encoding)), {
		header: r,
		payload: n,
		signature: Be(e)
	}
}

function qe(e) {
	var t = (e = e || {}).secret || e.publicKey || e.key,
		r = new J(t);
	this.readable = !0, this.algorithm = e.algorithm, this.encoding = e.encoding, this.secret = this.publicKey = this.key =
		r, this.signature = new J(e.signature), this.secret.once("close", function() {
			!this.signature.writable && this.readable && this.verify()
		}.bind(this)), this.signature.once("close", function() {
			!this.secret.writable && this.readable && this.verify()
		}.bind(this))
}
s.inherits(qe, o), qe.prototype.verify = function() {
	try {
		var e = Ve(this.signature.buffer, this.algorithm, this.key.buffer),
			t = Ke(this.signature.buffer, this.encoding);
		return this.emit("done", e, t), this.emit("data", e), this.emit("end"), this.readable = !1, e
	} catch (e) {
		this.readable = !1, this.emit("error", e), this.emit("close")
	}
}, qe.decode = Ke, qe.isValid = Le, qe.verify = Ve;
var He = qe,
	Ue = {
		ALGORITHMS: ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384",
			"ES512"
		],
		sign: Ce.sign,
		verify: He.verify,
		decode: He.decode,
		isValid: He.isValid,
		createSign: function(e) {
			return new Ce(e)
		},
		createVerify: function(e) {
			return new He(e)
		}
	},
	Fe = function(e, t) {
		t = t || {};
		var r = Ue.decode(e, t);
		if (!r) return null;
		var n = r.payload;
		if ("string" == typeof n) try {
			var i = JSON.parse(n);
			null !== i && "object" == typeof i && (n = i)
		} catch (e) {}
		return !0 === t.complete ? {
			header: r.header,
			payload: n,
			signature: r.signature
		} : n
	},
	Je = function(e, t) {
		Error.call(this, e), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.name =
			"JsonWebTokenError", this.message = e, t && (this.inner = t)
	};
(Je.prototype = Object.create(Error.prototype)).constructor = Je;
var Ge = Je,
	ze = function(e, t) {
		Ge.call(this, e), this.name = "NotBeforeError", this.date = t
	};
(ze.prototype = Object.create(Ge.prototype)).constructor = ze;
var We = ze,
	Xe = function(e, t) {
		Ge.call(this, e), this.name = "TokenExpiredError", this.expiredAt = t
	};
(Xe.prototype = Object.create(Ge.prototype)).constructor = Xe;
var Ze = Xe,
	Ye = 1e3,
	Qe = 60 * Ye,
	et = 60 * Qe,
	tt = 24 * et,
	rt = function(e, t) {
		t = t || {};
		var r = typeof e;
		if ("string" === r && e.length > 0) return function(e) {
			if ((e = String(e)).length > 100) return;
			var t =
				/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i
				.exec(e);
			if (!t) return;
			var r = parseFloat(t[1]);
			switch ((t[2] || "ms").toLowerCase()) {
				case "years":
				case "year":
				case "yrs":
				case "yr":
				case "y":
					return 315576e5 * r;
				case "weeks":
				case "week":
				case "w":
					return 6048e5 * r;
				case "days":
				case "day":
				case "d":
					return r * tt;
				case "hours":
				case "hour":
				case "hrs":
				case "hr":
				case "h":
					return r * et;
				case "minutes":
				case "minute":
				case "mins":
				case "min":
				case "m":
					return r * Qe;
				case "seconds":
				case "second":
				case "secs":
				case "sec":
				case "s":
					return r * Ye;
				case "milliseconds":
				case "millisecond":
				case "msecs":
				case "msec":
				case "ms":
					return r;
				default:
					return
			}
		}(e);
		if ("number" === r && isFinite(e)) return t.long ? function(e) {
			var t = Math.abs(e);
			if (t >= tt) return nt(e, t, tt, "day");
			if (t >= et) return nt(e, t, et, "hour");
			if (t >= Qe) return nt(e, t, Qe, "minute");
			if (t >= Ye) return nt(e, t, Ye, "second");
			return e + " ms"
		}(e) : function(e) {
			var t = Math.abs(e);
			if (t >= tt) return Math.round(e / tt) + "d";
			if (t >= et) return Math.round(e / et) + "h";
			if (t >= Qe) return Math.round(e / Qe) + "m";
			if (t >= Ye) return Math.round(e / Ye) + "s";
			return e + "ms"
		}(e);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
	};

function nt(e, t, r, n) {
	var i = t >= 1.5 * r;
	return Math.round(e / r) + " " + n + (i ? "s" : "")
}
var it = function(e, t) {
		var r = t || Math.floor(Date.now() / 1e3);
		if ("string" == typeof e) {
			var n = rt(e);
			if (void 0 === n) return;
			return Math.floor(r + n / 1e3)
		}
		return "number" == typeof e ? r + e : void 0
	},
	ot = q((function(e, t) {
		var r;
		t = e.exports = J, r = "object" == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(
			process.env.NODE_DEBUG) ? function() {
			var e = Array.prototype.slice.call(arguments, 0);
			e.unshift("SEMVER"), console.log.apply(console, e)
		} : function() {}, t.SEMVER_SPEC_VERSION = "2.0.0";
		var n = Number.MAX_SAFE_INTEGER || 9007199254740991,
			i = t.re = [],
			o = t.src = [],
			s = 0,
			a = s++;
		o[a] = "0|[1-9]\\d*";
		var c = s++;
		o[c] = "[0-9]+";
		var u = s++;
		o[u] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
		var f = s++;
		o[f] = "(" + o[a] + ")\\.(" + o[a] + ")\\.(" + o[a] + ")";
		var d = s++;
		o[d] = "(" + o[c] + ")\\.(" + o[c] + ")\\.(" + o[c] + ")";
		var l = s++;
		o[l] = "(?:" + o[a] + "|" + o[u] + ")";
		var p = s++;
		o[p] = "(?:" + o[c] + "|" + o[u] + ")";
		var m = s++;
		o[m] = "(?:-(" + o[l] + "(?:\\." + o[l] + ")*))";
		var h = s++;
		o[h] = "(?:-?(" + o[p] + "(?:\\." + o[p] + ")*))";
		var g = s++;
		o[g] = "[0-9A-Za-z-]+";
		var y = s++;
		o[y] = "(?:\\+(" + o[g] + "(?:\\." + o[g] + ")*))";
		var w = s++,
			v = "v?" + o[f] + o[m] + "?" + o[y] + "?";
		o[w] = "^" + v + "$";
		var b = "[v=\\s]*" + o[d] + o[h] + "?" + o[y] + "?",
			_ = s++;
		o[_] = "^" + b + "$";
		var S = s++;
		o[S] = "((?:<|>)?=?)";
		var E = s++;
		o[E] = o[c] + "|x|X|\\*";
		var x = s++;
		o[x] = o[a] + "|x|X|\\*";
		var j = s++;
		o[j] = "[v=\\s]*(" + o[x] + ")(?:\\.(" + o[x] + ")(?:\\.(" + o[x] + ")(?:" + o[m] + ")?" + o[y] + "?)?)?";
		var k = s++;
		o[k] = "[v=\\s]*(" + o[E] + ")(?:\\.(" + o[E] + ")(?:\\.(" + o[E] + ")(?:" + o[h] + ")?" + o[y] + "?)?)?";
		var I = s++;
		o[I] = "^" + o[S] + "\\s*" + o[j] + "$";
		var R = s++;
		o[R] = "^" + o[S] + "\\s*" + o[k] + "$";
		var P = s++;
		o[P] = "(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])";
		var O = s++;
		o[O] = "(?:~>?)";
		var T = s++;
		o[T] = "(\\s*)" + o[O] + "\\s+", i[T] = new RegExp(o[T], "g");
		var A = s++;
		o[A] = "^" + o[O] + o[j] + "$";
		var C = s++;
		o[C] = "^" + o[O] + o[k] + "$";
		var D = s++;
		o[D] = "(?:\\^)";
		var M = s++;
		o[M] = "(\\s*)" + o[D] + "\\s+", i[M] = new RegExp(o[M], "g");
		var $ = s++;
		o[$] = "^" + o[D] + o[j] + "$";
		var N = s++;
		o[N] = "^" + o[D] + o[k] + "$";
		var B = s++;
		o[B] = "^" + o[S] + "\\s*(" + b + ")$|^$";
		var L = s++;
		o[L] = "^" + o[S] + "\\s*(" + v + ")$|^$";
		var V = s++;
		o[V] = "(\\s*)" + o[S] + "\\s*(" + b + "|" + o[j] + ")", i[V] = new RegExp(o[V], "g");
		var K = s++;
		o[K] = "^\\s*(" + o[j] + ")\\s+-\\s+(" + o[j] + ")\\s*$";
		var q = s++;
		o[q] = "^\\s*(" + o[k] + ")\\s+-\\s+(" + o[k] + ")\\s*$";
		var H = s++;
		o[H] = "(<|>)?=?\\s*\\*";
		for (var U = 0; U < 35; U++) r(U, o[U]), i[U] || (i[U] = new RegExp(o[U]));

		function F(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof J) return e;
			if ("string" != typeof e) return null;
			if (e.length > 256) return null;
			if (!(t.loose ? i[_] : i[w]).test(e)) return null;
			try {
				return new J(e, t)
			} catch (e) {
				return null
			}
		}

		function J(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof J) {
				if (e.loose === t.loose) return e;
				e = e.version
			} else if ("string" != typeof e) throw new TypeError("Invalid Version: " + e);
			if (e.length > 256) throw new TypeError("version is longer than 256 characters");
			if (!(this instanceof J)) return new J(e, t);
			r("SemVer", e, t), this.options = t, this.loose = !!t.loose;
			var o = e.trim().match(t.loose ? i[_] : i[w]);
			if (!o) throw new TypeError("Invalid Version: " + e);
			if (this.raw = e, this.major = +o[1], this.minor = +o[2], this.patch = +o[3], this.major > n || this.major < 0)
				throw new TypeError("Invalid major version");
			if (this.minor > n || this.minor < 0) throw new TypeError("Invalid minor version");
			if (this.patch > n || this.patch < 0) throw new TypeError("Invalid patch version");
			o[4] ? this.prerelease = o[4].split(".").map((function(e) {
				if (/^[0-9]+$/.test(e)) {
					var t = +e;
					if (t >= 0 && t < n) return t
				}
				return e
			})) : this.prerelease = [], this.build = o[5] ? o[5].split(".") : [], this.format()
		}
		t.parse = F, t.valid = function(e, t) {
			var r = F(e, t);
			return r ? r.version : null
		}, t.clean = function(e, t) {
			var r = F(e.trim().replace(/^[=v]+/, ""), t);
			return r ? r.version : null
		}, t.SemVer = J, J.prototype.format = function() {
			return this.version = this.major + "." + this.minor + "." + this.patch, this.prerelease.length && (this.version +=
				"-" + this.prerelease.join(".")), this.version
		}, J.prototype.toString = function() {
			return this.version
		}, J.prototype.compare = function(e) {
			return r("SemVer.compare", this.version, this.options, e), e instanceof J || (e = new J(e, this.options)), this.compareMain(
				e) || this.comparePre(e)
		}, J.prototype.compareMain = function(e) {
			return e instanceof J || (e = new J(e, this.options)), z(this.major, e.major) || z(this.minor, e.minor) || z(this
				.patch, e.patch)
		}, J.prototype.comparePre = function(e) {
			if (e instanceof J || (e = new J(e, this.options)), this.prerelease.length && !e.prerelease.length) return -1;
			if (!this.prerelease.length && e.prerelease.length) return 1;
			if (!this.prerelease.length && !e.prerelease.length) return 0;
			var t = 0;
			do {
				var n = this.prerelease[t],
					i = e.prerelease[t];
				if (r("prerelease compare", t, n, i), void 0 === n && void 0 === i) return 0;
				if (void 0 === i) return 1;
				if (void 0 === n) return -1;
				if (n !== i) return z(n, i)
			} while (++t)
		}, J.prototype.inc = function(e, t) {
			switch (e) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", t), this.inc("pre", t);
					break;
				case "prerelease":
					0 === this.prerelease.length && this.inc("patch", t), this.inc("pre", t);
					break;
				case "major":
					0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++, this.minor = 0, this.patch =
						0, this.prerelease = [];
					break;
				case "minor":
					0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, this.prerelease = [];
					break;
				case "patch":
					0 === this.prerelease.length && this.patch++, this.prerelease = [];
					break;
				case "pre":
					if (0 === this.prerelease.length) this.prerelease = [0];
					else {
						for (var r = this.prerelease.length; --r >= 0;) "number" == typeof this.prerelease[r] && (this.prerelease[r]++,
							r = -2); - 1 === r && this.prerelease.push(0)
					}
					t && (this.prerelease[0] === t ? isNaN(this.prerelease[1]) && (this.prerelease = [t, 0]) : this.prerelease = [t,
						0
					]);
					break;
				default:
					throw new Error("invalid increment argument: " + e)
			}
			return this.format(), this.raw = this.version, this
		}, t.inc = function(e, t, r, n) {
			"string" == typeof r && (n = r, r = void 0);
			try {
				return new J(e, r).inc(t, n).version
			} catch (e) {
				return null
			}
		}, t.diff = function(e, t) {
			if (Y(e, t)) return null;
			var r = F(e),
				n = F(t),
				i = "";
			if (r.prerelease.length || n.prerelease.length) {
				i = "pre";
				var o = "prerelease"
			}
			for (var s in r)
				if (("major" === s || "minor" === s || "patch" === s) && r[s] !== n[s]) return i + s;
			return o
		}, t.compareIdentifiers = z;
		var G = /^[0-9]+$/;

		function z(e, t) {
			var r = G.test(e),
				n = G.test(t);
			return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1
		}

		function W(e, t, r) {
			return new J(e, r).compare(new J(t, r))
		}

		function X(e, t, r) {
			return W(e, t, r) > 0
		}

		function Z(e, t, r) {
			return W(e, t, r) < 0
		}

		function Y(e, t, r) {
			return 0 === W(e, t, r)
		}

		function Q(e, t, r) {
			return 0 !== W(e, t, r)
		}

		function ee(e, t, r) {
			return W(e, t, r) >= 0
		}

		function te(e, t, r) {
			return W(e, t, r) <= 0
		}

		function re(e, t, r, n) {
			switch (t) {
				case "===":
					return "object" == typeof e && (e = e.version), "object" == typeof r && (r = r.version), e === r;
				case "!==":
					return "object" == typeof e && (e = e.version), "object" == typeof r && (r = r.version), e !== r;
				case "":
				case "=":
				case "==":
					return Y(e, r, n);
				case "!=":
					return Q(e, r, n);
				case ">":
					return X(e, r, n);
				case ">=":
					return ee(e, r, n);
				case "<":
					return Z(e, r, n);
				case "<=":
					return te(e, r, n);
				default:
					throw new TypeError("Invalid operator: " + t)
			}
		}

		function ne(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof ne) {
				if (e.loose === !!t.loose) return e;
				e = e.value
			}
			if (!(this instanceof ne)) return new ne(e, t);
			r("comparator", e, t), this.options = t, this.loose = !!t.loose, this.parse(e), this.semver === ie ? this.value =
				"" : this.value = this.operator + this.semver.version, r("comp", this)
		}
		t.rcompareIdentifiers = function(e, t) {
			return z(t, e)
		}, t.major = function(e, t) {
			return new J(e, t).major
		}, t.minor = function(e, t) {
			return new J(e, t).minor
		}, t.patch = function(e, t) {
			return new J(e, t).patch
		}, t.compare = W, t.compareLoose = function(e, t) {
			return W(e, t, !0)
		}, t.rcompare = function(e, t, r) {
			return W(t, e, r)
		}, t.sort = function(e, r) {
			return e.sort((function(e, n) {
				return t.compare(e, n, r)
			}))
		}, t.rsort = function(e, r) {
			return e.sort((function(e, n) {
				return t.rcompare(e, n, r)
			}))
		}, t.gt = X, t.lt = Z, t.eq = Y, t.neq = Q, t.gte = ee, t.lte = te, t.cmp = re, t.Comparator = ne;
		var ie = {};

		function oe(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof oe) return e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease ? e : new oe(e
				.raw, t);
			if (e instanceof ne) return new oe(e.value, t);
			if (!(this instanceof oe)) return new oe(e, t);
			if (this.options = t, this.loose = !!t.loose, this.includePrerelease = !!t.includePrerelease, this.raw = e, this.set =
				e.split(/\s*\|\|\s*/).map((function(e) {
					return this.parseRange(e.trim())
				}), this).filter((function(e) {
					return e.length
				})), !this.set.length) throw new TypeError("Invalid SemVer Range: " + e);
			this.format()
		}

		function se(e) {
			return !e || "x" === e.toLowerCase() || "*" === e
		}

		function ae(e, t, r, n, i, o, s, a, c, u, f, d, l) {
			return ((t = se(r) ? "" : se(n) ? ">=" + r + ".0.0" : se(i) ? ">=" + r + "." + n + ".0" : ">=" + t) + " " + (a =
				se(c) ? "" : se(u) ? "<" + (+c + 1) + ".0.0" : se(f) ? "<" + c + "." + (+u + 1) + ".0" : d ? "<=" + c + "." + u +
				"." + f + "-" + d : "<=" + a)).trim()
		}

		function ce(e, t, n) {
			for (var i = 0; i < e.length; i++)
				if (!e[i].test(t)) return !1;
			if (t.prerelease.length && !n.includePrerelease) {
				for (i = 0; i < e.length; i++)
					if (r(e[i].semver), e[i].semver !== ie && e[i].semver.prerelease.length > 0) {
						var o = e[i].semver;
						if (o.major === t.major && o.minor === t.minor && o.patch === t.patch) return !0
					} return !1
			}
			return !0
		}

		function ue(e, t, r) {
			try {
				t = new oe(t, r)
			} catch (e) {
				return !1
			}
			return t.test(e)
		}

		function fe(e, t, r, n) {
			var i, o, s, a, c;
			switch (e = new J(e, n), t = new oe(t, n), r) {
				case ">":
					i = X, o = te, s = Z, a = ">", c = ">=";
					break;
				case "<":
					i = Z, o = ee, s = X, a = "<", c = "<=";
					break;
				default:
					throw new TypeError('Must provide a hilo val of "<" or ">"')
			}
			if (ue(e, t, n)) return !1;
			for (var u = 0; u < t.set.length; ++u) {
				var f = t.set[u],
					d = null,
					l = null;
				if (f.forEach((function(e) {
						e.semver === ie && (e = new ne(">=0.0.0")), d = d || e, l = l || e, i(e.semver, d.semver, n) ? d = e : s(e.semver,
							l.semver, n) && (l = e)
					})), d.operator === a || d.operator === c) return !1;
				if ((!l.operator || l.operator === a) && o(e, l.semver)) return !1;
				if (l.operator === c && s(e, l.semver)) return !1
			}
			return !0
		}
		ne.prototype.parse = function(e) {
			var t = this.options.loose ? i[B] : i[L],
				r = e.match(t);
			if (!r) throw new TypeError("Invalid comparator: " + e);
			this.operator = r[1], "=" === this.operator && (this.operator = ""), r[2] ? this.semver = new J(r[2], this.options
				.loose) : this.semver = ie
		}, ne.prototype.toString = function() {
			return this.value
		}, ne.prototype.test = function(e) {
			return r("Comparator.test", e, this.options.loose), this.semver === ie || ("string" == typeof e && (e = new J(e,
				this.options)), re(e, this.operator, this.semver, this.options))
		}, ne.prototype.intersects = function(e, t) {
			if (!(e instanceof ne)) throw new TypeError("a Comparator is required");
			var r;
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), "" === this.operator) return r = new oe(e.value, t), ue(this.value, r, t);
			if ("" === e.operator) return r = new oe(this.value, t), ue(e.semver, r, t);
			var n = !(">=" !== this.operator && ">" !== this.operator || ">=" !== e.operator && ">" !== e.operator),
				i = !("<=" !== this.operator && "<" !== this.operator || "<=" !== e.operator && "<" !== e.operator),
				o = this.semver.version === e.semver.version,
				s = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== e.operator && "<=" !== e.operator),
				a = re(this.semver, "<", e.semver, t) && (">=" === this.operator || ">" === this.operator) && ("<=" === e.operator ||
					"<" === e.operator),
				c = re(this.semver, ">", e.semver, t) && ("<=" === this.operator || "<" === this.operator) && (">=" === e.operator ||
					">" === e.operator);
			return n || i || o && s || a || c
		}, t.Range = oe, oe.prototype.format = function() {
			return this.range = this.set.map((function(e) {
				return e.join(" ").trim()
			})).join("||").trim(), this.range
		}, oe.prototype.toString = function() {
			return this.range
		}, oe.prototype.parseRange = function(e) {
			var t = this.options.loose;
			e = e.trim();
			var n = t ? i[q] : i[K];
			e = e.replace(n, ae), r("hyphen replace", e), e = e.replace(i[V], "$1$2$3"), r("comparator trim", e, i[V]), e = (
				e = (e = e.replace(i[T], "$1~")).replace(i[M], "$1^")).split(/\s+/).join(" ");
			var o = t ? i[B] : i[L],
				s = e.split(" ").map((function(e) {
					return function(e, t) {
						return r("comp", e, t), e = function(e, t) {
							return e.trim().split(/\s+/).map((function(e) {
								return function(e, t) {
									r("caret", e, t);
									var n = t.loose ? i[N] : i[$];
									return e.replace(n, (function(t, n, i, o, s) {
										var a;
										return r("caret", e, t, n, i, o, s), se(n) ? a = "" : se(i) ? a = ">=" + n + ".0.0 <" + (+n + 1) +
											".0.0" : se(o) ? a = "0" === n ? ">=" + n + "." + i + ".0 <" + n + "." + (+i + 1) + ".0" :
											">=" + n + "." + i + ".0 <" + (+n + 1) + ".0.0" : s ? (r("replaceCaret pr", s), a = "0" === n ?
												"0" === i ? ">=" + n + "." + i + "." + o + "-" + s + " <" + n + "." + i + "." + (+o + 1) :
												">=" + n + "." + i + "." + o + "-" + s + " <" + n + "." + (+i + 1) + ".0" : ">=" + n + "." +
												i + "." + o + "-" + s + " <" + (+n + 1) + ".0.0") : (r("no pr"), a = "0" === n ? "0" === i ?
												">=" + n + "." + i + "." + o + " <" + n + "." + i + "." + (+o + 1) : ">=" + n + "." + i + "." +
												o + " <" + n + "." + (+i + 1) + ".0" : ">=" + n + "." + i + "." + o + " <" + (+n + 1) +
												".0.0"), r("caret return", a), a
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("caret", e), e = function(e, t) {
							return e.trim().split(/\s+/).map((function(e) {
								return function(e, t) {
									var n = t.loose ? i[C] : i[A];
									return e.replace(n, (function(t, n, i, o, s) {
										var a;
										return r("tilde", e, t, n, i, o, s), se(n) ? a = "" : se(i) ? a = ">=" + n + ".0.0 <" + (+n + 1) +
											".0.0" : se(o) ? a = ">=" + n + "." + i + ".0 <" + n + "." + (+i + 1) + ".0" : s ? (r(
													"replaceTilde pr", s), a = ">=" + n + "." + i + "." + o + "-" + s + " <" + n + "." + (+i + 1) +
												".0") : a = ">=" + n + "." + i + "." + o + " <" + n + "." + (+i + 1) + ".0", r("tilde return",
												a), a
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("tildes", e), e = function(e, t) {
							return r("replaceXRanges", e, t), e.split(/\s+/).map((function(e) {
								return function(e, t) {
									e = e.trim();
									var n = t.loose ? i[R] : i[I];
									return e.replace(n, (function(t, n, i, o, s, a) {
										r("xRange", e, t, n, i, o, s, a);
										var c = se(i),
											u = c || se(o),
											f = u || se(s);
										return "=" === n && f && (n = ""), c ? t = ">" === n || "<" === n ? "<0.0.0" : "*" : n && f ? (
												u && (o = 0), s = 0, ">" === n ? (n = ">=", u ? (i = +i + 1, o = 0, s = 0) : (o = +o + 1, s =
													0)) : "<=" === n && (n = "<", u ? i = +i + 1 : o = +o + 1), t = n + i + "." + o + "." + s) :
											u ? t = ">=" + i + ".0.0 <" + (+i + 1) + ".0.0" : f && (t = ">=" + i + "." + o + ".0 <" + i +
												"." + (+o + 1) + ".0"), r("xRange return", t), t
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("xrange", e), e = function(e, t) {
							return r("replaceStars", e, t), e.trim().replace(i[H], "")
						}(e, t), r("stars", e), e
					}(e, this.options)
				}), this).join(" ").split(/\s+/);
			return this.options.loose && (s = s.filter((function(e) {
				return !!e.match(o)
			}))), s = s.map((function(e) {
				return new ne(e, this.options)
			}), this)
		}, oe.prototype.intersects = function(e, t) {
			if (!(e instanceof oe)) throw new TypeError("a Range is required");
			return this.set.some((function(r) {
				return r.every((function(r) {
					return e.set.some((function(e) {
						return e.every((function(e) {
							return r.intersects(e, t)
						}))
					}))
				}))
			}))
		}, t.toComparators = function(e, t) {
			return new oe(e, t).set.map((function(e) {
				return e.map((function(e) {
					return e.value
				})).join(" ").trim().split(" ")
			}))
		}, oe.prototype.test = function(e) {
			if (!e) return !1;
			"string" == typeof e && (e = new J(e, this.options));
			for (var t = 0; t < this.set.length; t++)
				if (ce(this.set[t], e, this.options)) return !0;
			return !1
		}, t.satisfies = ue, t.maxSatisfying = function(e, t, r) {
			var n = null,
				i = null;
			try {
				var o = new oe(t, r)
			} catch (e) {
				return null
			}
			return e.forEach((function(e) {
				o.test(e) && (n && -1 !== i.compare(e) || (i = new J(n = e, r)))
			})), n
		}, t.minSatisfying = function(e, t, r) {
			var n = null,
				i = null;
			try {
				var o = new oe(t, r)
			} catch (e) {
				return null
			}
			return e.forEach((function(e) {
				o.test(e) && (n && 1 !== i.compare(e) || (i = new J(n = e, r)))
			})), n
		}, t.minVersion = function(e, t) {
			e = new oe(e, t);
			var r = new J("0.0.0");
			if (e.test(r)) return r;
			if (r = new J("0.0.0-0"), e.test(r)) return r;
			r = null;
			for (var n = 0; n < e.set.length; ++n) {
				e.set[n].forEach((function(e) {
					var t = new J(e.semver.version);
					switch (e.operator) {
						case ">":
							0 === t.prerelease.length ? t.patch++ : t.prerelease.push(0), t.raw = t.format();
						case "":
						case ">=":
							r && !X(r, t) || (r = t);
							break;
						case "<":
						case "<=":
							break;
						default:
							throw new Error("Unexpected operation: " + e.operator)
					}
				}))
			}
			if (r && e.test(r)) return r;
			return null
		}, t.validRange = function(e, t) {
			try {
				return new oe(e, t).range || "*"
			} catch (e) {
				return null
			}
		}, t.ltr = function(e, t, r) {
			return fe(e, t, "<", r)
		}, t.gtr = function(e, t, r) {
			return fe(e, t, ">", r)
		}, t.outside = fe, t.prerelease = function(e, t) {
			var r = F(e, t);
			return r && r.prerelease.length ? r.prerelease : null
		}, t.intersects = function(e, t, r) {
			return e = new oe(e, r), t = new oe(t, r), e.intersects(t)
		}, t.coerce = function(e) {
			if (e instanceof J) return e;
			if ("string" != typeof e) return null;
			var t = e.match(i[P]);
			if (null == t) return null;
			return F(t[1] + "." + (t[2] || "0") + "." + (t[3] || "0"))
		}
	})),
	st = (ot.SEMVER_SPEC_VERSION, ot.re, ot.src, ot.parse, ot.valid, ot.clean, ot.SemVer, ot.inc, ot.diff, ot.compareIdentifiers,
		ot.rcompareIdentifiers, ot.major, ot.minor, ot.patch, ot.compare, ot.compareLoose, ot.rcompare, ot.sort, ot.rsort, ot
		.gt, ot.lt, ot.eq, ot.neq, ot.gte, ot.lte, ot.cmp, ot.Comparator, ot.Range, ot.toComparators, ot.satisfies, ot.maxSatisfying,
		ot.minSatisfying, ot.minVersion, ot.validRange, ot.ltr, ot.gtr, ot.outside, ot.prerelease, ot.intersects, ot.coerce,
		ot.satisfies(process.version, "^6.12.0 || >=8.0.0")),
	at = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512"],
	ct = ["RS256", "RS384", "RS512"],
	ut = ["HS256", "HS384", "HS512"];
st && (at.splice(3, 0, "PS256", "PS384", "PS512"), ct.splice(3, 0, "PS256", "PS384", "PS512"));
var ft = /^\s+|\s+$/g,
	dt = /^[-+]0x[0-9a-f]+$/i,
	lt = /^0b[01]+$/i,
	pt = /^0o[0-7]+$/i,
	mt = /^(?:0|[1-9]\d*)$/,
	ht = parseInt;

function gt(e) {
	return e != e
}

function yt(e, t) {
	return function(e, t) {
		for (var r = -1, n = e ? e.length : 0, i = Array(n); ++r < n;) i[r] = t(e[r], r, e);
		return i
	}(t, (function(t) {
		return e[t]
	}))
}
var wt, vt, bt = Object.prototype,
	_t = bt.hasOwnProperty,
	St = bt.toString,
	Et = bt.propertyIsEnumerable,
	xt = (wt = Object.keys, vt = Object, function(e) {
		return wt(vt(e))
	}),
	jt = Math.max;

function kt(e, t) {
	var r = Pt(e) || function(e) {
			return function(e) {
				return At(e) && Ot(e)
			}(e) && _t.call(e, "callee") && (!Et.call(e, "callee") || "[object Arguments]" == St.call(e))
		}(e) ? function(e, t) {
			for (var r = -1, n = Array(e); ++r < e;) n[r] = t(r);
			return n
		}(e.length, String) : [],
		n = r.length,
		i = !!n;
	for (var o in e) !t && !_t.call(e, o) || i && ("length" == o || Rt(o, n)) || r.push(o);
	return r
}

function It(e) {
	if (r = (t = e) && t.constructor, n = "function" == typeof r && r.prototype || bt, t !== n) return xt(e);
	var t, r, n, i = [];
	for (var o in Object(e)) _t.call(e, o) && "constructor" != o && i.push(o);
	return i
}

function Rt(e, t) {
	return !!(t = null == t ? 9007199254740991 : t) && ("number" == typeof e || mt.test(e)) && e > -1 && e % 1 == 0 && e <
		t
}
var Pt = Array.isArray;

function Ot(e) {
	return null != e && function(e) {
		return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991
	}(e.length) && ! function(e) {
		var t = Tt(e) ? St.call(e) : "";
		return "[object Function]" == t || "[object GeneratorFunction]" == t
	}(e)
}

function Tt(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}

function At(e) {
	return !!e && "object" == typeof e
}
var Ct = function(e, t, r, n) {
		var i;
		e = Ot(e) ? e : (i = e) ? yt(i, function(e) {
			return Ot(e) ? kt(e) : It(e)
		}(i)) : [], r = r && !n ? function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || At(e) && "[object Symbol]" == St.call(e)
								}(e)) return NaN;
							if (Tt(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = Tt(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(ft, "");
							var r = lt.test(e);
							return r || pt.test(e) ? ht(e.slice(2), r ? 2 : 8) : dt.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(r) : 0;
		var o = e.length;
		return r < 0 && (r = jt(o + r, 0)),
			function(e) {
				return "string" == typeof e || !Pt(e) && At(e) && "[object String]" == St.call(e)
			}(e) ? r <= o && e.indexOf(t, r) > -1 : !!o && function(e, t, r) {
				if (t != t) return function(e, t, r, n) {
					for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i;)
						if (t(e[o], o, e)) return o;
					return -1
				}(e, gt, r);
				for (var n = r - 1, i = e.length; ++n < i;)
					if (e[n] === t) return n;
				return -1
			}(e, t, r) > -1
	},
	Dt = Object.prototype.toString;
var Mt = function(e) {
		return !0 === e || !1 === e || function(e) {
			return !!e && "object" == typeof e
		}(e) && "[object Boolean]" == Dt.call(e)
	},
	$t = /^\s+|\s+$/g,
	Nt = /^[-+]0x[0-9a-f]+$/i,
	Bt = /^0b[01]+$/i,
	Lt = /^0o[0-7]+$/i,
	Vt = parseInt,
	Kt = Object.prototype.toString;

function qt(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}
var Ht = function(e) {
		return "number" == typeof e && e == function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || function(e) {
										return !!e && "object" == typeof e
									}(e) && "[object Symbol]" == Kt.call(e)
								}(e)) return NaN;
							if (qt(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = qt(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace($t, "");
							var r = Bt.test(e);
							return r || Lt.test(e) ? Vt(e.slice(2), r ? 2 : 8) : Nt.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(e)
	},
	Ut = Object.prototype.toString;
var Ft = function(e) {
	return "number" == typeof e || function(e) {
		return !!e && "object" == typeof e
	}(e) && "[object Number]" == Ut.call(e)
};
var Jt = Function.prototype,
	Gt = Object.prototype,
	zt = Jt.toString,
	Wt = Gt.hasOwnProperty,
	Xt = zt.call(Object),
	Zt = Gt.toString,
	Yt = function(e, t) {
		return function(r) {
			return e(t(r))
		}
	}(Object.getPrototypeOf, Object);
var Qt = function(e) {
		if (! function(e) {
				return !!e && "object" == typeof e
			}(e) || "[object Object]" != Zt.call(e) || function(e) {
				var t = !1;
				if (null != e && "function" != typeof e.toString) try {
					t = !!(e + "")
				} catch (e) {}
				return t
			}(e)) return !1;
		var t = Yt(e);
		if (null === t) return !0;
		var r = Wt.call(t, "constructor") && t.constructor;
		return "function" == typeof r && r instanceof r && zt.call(r) == Xt
	},
	er = Object.prototype.toString,
	tr = Array.isArray;
var rr = function(e) {
		return "string" == typeof e || !tr(e) && function(e) {
			return !!e && "object" == typeof e
		}(e) && "[object String]" == er.call(e)
	},
	nr = /^\s+|\s+$/g,
	ir = /^[-+]0x[0-9a-f]+$/i,
	or = /^0b[01]+$/i,
	sr = /^0o[0-7]+$/i,
	ar = parseInt,
	cr = Object.prototype.toString;

function ur(e, t) {
	var r;
	if ("function" != typeof t) throw new TypeError("Expected a function");
	return e = function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || function(e) {
										return !!e && "object" == typeof e
									}(e) && "[object Symbol]" == cr.call(e)
								}(e)) return NaN;
							if (fr(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = fr(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(nr, "");
							var r = or.test(e);
							return r || sr.test(e) ? ar(e.slice(2), r ? 2 : 8) : ir.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(e),
		function() {
			return --e > 0 && (r = t.apply(this, arguments)), e <= 1 && (t = void 0), r
		}
}

function fr(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}
var dr = function(e) {
		return ur(2, e)
	},
	lr = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
st && lr.splice(3, 0, "PS256", "PS384", "PS512");
var pr = {
		expiresIn: {
			isValid: function(e) {
				return Ht(e) || rr(e) && e
			},
			message: '"expiresIn" should be a number of seconds or string representing a timespan'
		},
		notBefore: {
			isValid: function(e) {
				return Ht(e) || rr(e) && e
			},
			message: '"notBefore" should be a number of seconds or string representing a timespan'
		},
		audience: {
			isValid: function(e) {
				return rr(e) || Array.isArray(e)
			},
			message: '"audience" must be a string or array'
		},
		algorithm: {
			isValid: Ct.bind(null, lr),
			message: '"algorithm" must be a valid string enum value'
		},
		header: {
			isValid: Qt,
			message: '"header" must be an object'
		},
		encoding: {
			isValid: rr,
			message: '"encoding" must be a string'
		},
		issuer: {
			isValid: rr,
			message: '"issuer" must be a string'
		},
		subject: {
			isValid: rr,
			message: '"subject" must be a string'
		},
		jwtid: {
			isValid: rr,
			message: '"jwtid" must be a string'
		},
		noTimestamp: {
			isValid: Mt,
			message: '"noTimestamp" must be a boolean'
		},
		keyid: {
			isValid: rr,
			message: '"keyid" must be a string'
		},
		mutatePayload: {
			isValid: Mt,
			message: '"mutatePayload" must be a boolean'
		}
	},
	mr = {
		iat: {
			isValid: Ft,
			message: '"iat" should be a number of seconds'
		},
		exp: {
			isValid: Ft,
			message: '"exp" should be a number of seconds'
		},
		nbf: {
			isValid: Ft,
			message: '"nbf" should be a number of seconds'
		}
	};

function hr(e, t, r, n) {
	if (!Qt(r)) throw new Error('Expected "' + n + '" to be a plain object.');
	Object.keys(r).forEach((function(i) {
		var o = e[i];
		if (o) {
			if (!o.isValid(r[i])) throw new Error(o.message)
		} else if (!t) throw new Error('"' + i + '" is not allowed in "' + n + '"')
	}))
}
var gr = {
		audience: "aud",
		issuer: "iss",
		subject: "sub",
		jwtid: "jti"
	},
	yr = ["expiresIn", "notBefore", "noTimestamp", "audience", "issuer", "subject", "jwtid"],
	wr = function(e, t, r, n) {
		var i;
		if ("function" != typeof r || n || (n = r, r = {}), r || (r = {}), r = Object.assign({}, r), i = n || function(e, t) {
				if (e) throw e;
				return t
			}, r.clockTimestamp && "number" != typeof r.clockTimestamp) return i(new Ge("clockTimestamp must be a number"));
		if (void 0 !== r.nonce && ("string" != typeof r.nonce || "" === r.nonce.trim())) return i(new Ge(
			"nonce must be a non-empty string"));
		var o = r.clockTimestamp || Math.floor(Date.now() / 1e3);
		if (!e) return i(new Ge("jwt must be provided"));
		if ("string" != typeof e) return i(new Ge("jwt must be a string"));
		var s, a = e.split(".");
		if (3 !== a.length) return i(new Ge("jwt malformed"));
		try {
			s = Fe(e, {
				complete: !0
			})
		} catch (e) {
			return i(e)
		}
		if (!s) return i(new Ge("invalid token"));
		var c, u = s.header;
		if ("function" == typeof t) {
			if (!n) return i(new Ge("verify must be called asynchronous if secret or public key is provided as a callback"));
			c = t
		} else c = function(e, r) {
			return r(null, t)
		};
		return c(u, (function(t, n) {
			if (t) return i(new Ge("error in secret or public key callback: " + t.message));
			var c, f = "" !== a[2].trim();
			if (!f && n) return i(new Ge("jwt signature is required"));
			if (f && !n) return i(new Ge("secret or public key must be provided"));
			if (f || r.algorithms || (r.algorithms = ["none"]), r.algorithms || (r.algorithms = ~n.toString().indexOf(
					"BEGIN CERTIFICATE") || ~n.toString().indexOf("BEGIN PUBLIC KEY") ? at : ~n.toString().indexOf(
					"BEGIN RSA PUBLIC KEY") ? ct : ut), !~r.algorithms.indexOf(s.header.alg)) return i(new Ge("invalid algorithm"));
			try {
				c = Ue.verify(e, s.header.alg, n)
			} catch (e) {
				return i(e)
			}
			if (!c) return i(new Ge("invalid signature"));
			var d = s.payload;
			if (void 0 !== d.nbf && !r.ignoreNotBefore) {
				if ("number" != typeof d.nbf) return i(new Ge("invalid nbf value"));
				if (d.nbf > o + (r.clockTolerance || 0)) return i(new We("jwt not active", new Date(1e3 * d.nbf)))
			}
			if (void 0 !== d.exp && !r.ignoreExpiration) {
				if ("number" != typeof d.exp) return i(new Ge("invalid exp value"));
				if (o >= d.exp + (r.clockTolerance || 0)) return i(new Ze("jwt expired", new Date(1e3 * d.exp)))
			}
			if (r.audience) {
				var l = Array.isArray(r.audience) ? r.audience : [r.audience];
				if (!(Array.isArray(d.aud) ? d.aud : [d.aud]).some((function(e) {
						return l.some((function(t) {
							return t instanceof RegExp ? t.test(e) : t === e
						}))
					}))) return i(new Ge("jwt audience invalid. expected: " + l.join(" or ")))
			}
			if (r.issuer && ("string" == typeof r.issuer && d.iss !== r.issuer || Array.isArray(r.issuer) && -1 === r.issuer.indexOf(
					d.iss))) return i(new Ge("jwt issuer invalid. expected: " + r.issuer));
			if (r.subject && d.sub !== r.subject) return i(new Ge("jwt subject invalid. expected: " + r.subject));
			if (r.jwtid && d.jti !== r.jwtid) return i(new Ge("jwt jwtid invalid. expected: " + r.jwtid));
			if (r.nonce && d.nonce !== r.nonce) return i(new Ge("jwt nonce invalid. expected: " + r.nonce));
			if (r.maxAge) {
				if ("number" != typeof d.iat) return i(new Ge("iat required when maxAge is specified"));
				var p = it(r.maxAge, d.iat);
				if (void 0 === p) return i(new Ge(
					'"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
				if (o >= p + (r.clockTolerance || 0)) return i(new Ze("maxAge exceeded", new Date(1e3 * p)))
			}
			if (!0 === r.complete) {
				var m = s.signature;
				return i(null, {
					header: u,
					payload: d,
					signature: m
				})
			}
			return i(null, d)
		}))
	},
	vr = function(e, t, r, n) {
		"function" == typeof r ? (n = r, r = {}) : r = r || {};
		var i = "object" == typeof e && !Buffer.isBuffer(e),
			o = Object.assign({
				alg: r.algorithm || "HS256",
				typ: i ? "JWT" : void 0,
				kid: r.keyid
			}, r.header);

		function s(e) {
			if (n) return n(e);
			throw e
		}
		if (!t && "none" !== r.algorithm) return s(new Error("secretOrPrivateKey must have a value"));
		if (void 0 === e) return s(new Error("payload is required"));
		if (i) {
			try {
				! function(e) {
					hr(mr, !0, e, "payload")
				}(e)
			} catch (e) {
				return s(e)
			}
			r.mutatePayload || (e = Object.assign({}, e))
		} else {
			var a = yr.filter((function(e) {
				return void 0 !== r[e]
			}));
			if (a.length > 0) return s(new Error("invalid " + a.join(",") + " option for " + typeof e + " payload"))
		}
		if (void 0 !== e.exp && void 0 !== r.expiresIn) return s(new Error(
			'Bad "options.expiresIn" option the payload already has an "exp" property.'));
		if (void 0 !== e.nbf && void 0 !== r.notBefore) return s(new Error(
			'Bad "options.notBefore" option the payload already has an "nbf" property.'));
		try {
			! function(e) {
				hr(pr, !1, e, "options")
			}(r)
		} catch (e) {
			return s(e)
		}
		var c = e.iat || Math.floor(Date.now() / 1e3);
		if (r.noTimestamp ? delete e.iat : i && (e.iat = c), void 0 !== r.notBefore) {
			try {
				e.nbf = it(r.notBefore, c)
			} catch (e) {
				return s(e)
			}
			if (void 0 === e.nbf) return s(new Error(
				'"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'))
		}
		if (void 0 !== r.expiresIn && "object" == typeof e) {
			try {
				e.exp = it(r.expiresIn, c)
			} catch (e) {
				return s(e)
			}
			if (void 0 === e.exp) return s(new Error(
				'"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'))
		}
		Object.keys(gr).forEach((function(t) {
			var n = gr[t];
			if (void 0 !== r[t]) {
				if (void 0 !== e[n]) return s(new Error('Bad "options.' + t + '" option. The payload already has an "' + n +
					'" property.'));
				e[n] = r[t]
			}
		}));
		var u = r.encoding || "utf8";
		if ("function" != typeof n) return Ue.sign({
			header: o,
			payload: e,
			secret: t,
			encoding: u
		});
		n = n && dr(n), Ue.createSign({
			header: o,
			privateKey: t,
			payload: e,
			encoding: u
		}).once("error", n).once("done", (function(e) {
			n(null, e)
		}))
	};
const br = uniCloud.database().command;

function _r() {
	const e = n.createHash("md5"),
		t = /MicroMessenger/i.test(__ctx__.CLIENTUA) ? __ctx__.CLIENTUA.replace(/(MicroMessenger\S+).*/i, "$1") : __ctx__.CLIENTUA;
	return e.update(t), e.digest("hex")
}

function Sr({
	uid: e,
	needPermission: t
}) {
	const r = $(),
		n = {
			uid: e
		};
	t && (n.needPermission = t), r.bindTokenToDevice && (n.clientId = _r());
	return {
		token: vr(n, r.tokenSecret, {
			expiresIn: r.tokenExpiresIn
		}),
		tokenExpired: Date.now() + 1e3 * r.tokenExpiresIn
	}
}
async function Er(e) {
	const t = $();
	try {
		const r = wr(e, t.tokenSecret);
		if (t.bindTokenToDevice && r.clientId !== _r()) return {
			code: 30201,
			msg: "token不合法，请重新登录"
		};
		const {
			uid: n,
			needPermission: i
		} = r, o = await T.doc(n).get();
		if (!o.data || 0 === o.data.length || !o.data[0].token) return {
			code: 30202,
			msg: "token不合法，请重新登录"
		};
		const s = o.data[0];
		if (1 === s.status) return {
			code: 10001,
			msg: "账号已禁用"
		};
		let a = s.token;
		if ("string" == typeof a && (a = [a]), -1 === a.indexOf(e)) return {
			code: 30202,
			msg: "token不合法，请重新登录"
		};
		const c = {
			code: 0,
			msg: "token校验通过",
			uid: n,
			role: s.role || [],
			permission: [],
			userInfo: s
		};
		if (c.role.length > 0 && i)
			if (c.role.includes("admin")) {
				const e = await D.limit(1e4).get();
				c.permission = e.data.map(e => e.permission_id)
			} else {
				const e = await C.where({
						role_id: br.in(c.role)
					}).get(),
					t = [];
				e.data.forEach(e => {
					Array.prototype.push.apply(t, e.permission)
				}), c.permission = j(t)
			} if (t.tokenExpiresThreshold && r.exp - Date.now() / 1e3 < t.tokenExpiresThreshold) {
			const e = Sr({
					uid: n,
					needPermission: i
				}),
				t = xr(a);
			return a = a.filter(e => -1 === t.indexOf(e)), a.push(e.token), await T.doc(n).update({
				token: a,
				last_login_date: Date.now(),
				last_login_ip: __ctx__.CLIENTIP
			}), { ...c,
				...e
			}
		}
		return E("checkToken payload", r), c
	} catch (e) {
		return "TokenExpiredError" === e.name ? {
			code: 30203,
			msg: "token已过期，请重新登录",
			err: e
		} : {
			code: 30204,
			msg: "非法token",
			err: e
		}
	}
}

function xr(e) {
	const t = $(),
		r = [];
	return e.forEach(e => {
		try {
			wr(e, t.tokenSecret)
		} catch (t) {
			r.push(e)
		}
	}), r
}
async function jr(e, t = {}) {
	if (1 === e.status) return {
		code: 10001,
		msg: "账号已禁用"
	};
	let r = e.token || [];
	"string" == typeof r && (r = [r]);
	const n = xr(r);
	r = r.filter(e => -1 === n.indexOf(e));
	const {
		token: i,
		tokenExpired: o
	} = Sr({
		uid: e._id,
		needPermission: t.needPermission
	});
	return r.push(i), e.token = r, await T.doc(e._id).update({
		last_login_date: Date.now(),
		last_login_ip: __ctx__.CLIENTIP,
		token: r,
		...t.extraData
	}), {
		code: 0,
		msg: "登录成功",
		token: i,
		uid: e._id,
		username: e.username,
		type: "login",
		userInfo: e,
		tokenExpired: o
	}
}
async function kr({
	name: e,
	url: t,
	data: r,
	options: n,
	defaultOptions: i
}) {
	let o = {};
	const s = _(Object.assign({}, r));
	s && s.access_token && delete s.access_token;
	try {
		n = Object.assign({}, i, n, {
			data: s
		}), o = await uniCloud.httpclient.request(t, n)
	} catch (t) {
		return function(e, t) {
			throw new c({
				code: t.code || -2,
				message: t.message || e + " fail"
			})
		}(e, t)
	}
	let a = o.data;
	const u = o.headers["content-type"];
	if (!Buffer.isBuffer(a) || 0 !== u.indexOf("text/plain") && 0 !== u.indexOf("application/json")) Buffer.isBuffer(a) &&
		(a = {
			buffer: a,
			contentType: u
		});
	else try {
		a = JSON.parse(a.toString())
	} catch (e) {
		a = a.toString()
	}
	return b(function(e, t) {
		if (t.errcode) throw new c({
			code: t.errcode || -2,
			message: t.errmsg || e + " fail"
		});
		return delete t.errcode, delete t.errmsg, { ...t,
			errMsg: e + " ok",
			errCode: 0
		}
	}(e, a || {
		errCode: -2,
		errMsg: "Request failed"
	}))
}

function Ir(e, t) {
	let r = "";
	if (t && t.accessToken) {
		r = `${e.indexOf("?")>-1?"&":"?"}access_token=${t.accessToken}`
	}
	return `${e}${r}`
}
class Rr {
	constructor(e) {
		this.options = Object.assign({
			baseUrl: "https://api.weixin.qq.com",
			timeout: 5e3
		}, e)
	}
	async _requestWxOpenapi({
		name: e,
		url: t,
		data: r,
		options: n
	}) {
		const i = {
			method: "GET",
			dataType: "json",
			dataAsQueryString: !0,
			timeout: this.options.timeout
		};
		return await kr({
			name: "auth." + e,
			url: `${this.options.baseUrl}${Ir(t,r)}`,
			data: r,
			options: n,
			defaultOptions: i
		})
	}
	async code2Session(e) {
		return await this._requestWxOpenapi({
			name: "code2Session",
			url: "/sns/jscode2session",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				secret: this.options.secret,
				js_code: e
			}
		})
	}
	async getOauthAccessToken(e) {
		return await this._requestWxOpenapi({
			name: "getOauthAccessToken",
			url: "/sns/oauth2/access_token",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				secret: this.options.secret,
				code: e
			}
		})
	}
}
const Pr = {
	RSA: "RSA-SHA1",
	RSA2: "RSA-SHA256"
};
var Or = {
	code2Session: {
		returnValue: {
			openid: "userId"
		}
	}
};
class Tr extends class {
	constructor(e = {}) {
		if (!e.appId) throw new Error("appId required");
		if (!e.privateKey) throw new Error("privateKey required");
		const t = {
			gateway: "https://openapi.alipay.com/gateway.do",
			timeout: 5e3,
			charset: "utf-8",
			version: "1.0",
			signType: "RSA2",
			timeOffset: -(new Date).getTimezoneOffset() / 60,
			keyType: "PKCS8"
		};
		e.sandbox && (e.gateway = "https://openapi.alipaydev.com/gateway.do"), this.options = Object.assign({}, t, e);
		const r = "PKCS8" === this.options.keyType ? "PRIVATE KEY" : "RSA PRIVATE KEY";
		this.options.privateKey = this._formatKey(this.options.privateKey, r), this.options.alipayPublicKey && (this.options
			.alipayPublicKey = this._formatKey(this.options.alipayPublicKey, "PUBLIC KEY"))
	}
	_formatKey(e, t) {
		return `-----BEGIN ${t}-----\n${e}\n-----END ${t}-----`
	}
	_formatUrl(e, t) {
		let r = e;
		const n = ["app_id", "method", "format", "charset", "sign_type", "sign", "timestamp", "version", "notify_url",
			"return_url", "auth_token", "app_auth_token"
		];
		for (const e in t)
			if (n.indexOf(e) > -1) {
				const n = encodeURIComponent(t[e]);
				r = `${r}${r.includes("?")?"&":"?"}${e}=${n}`, delete t[e]
			} return {
			execParams: t,
			url: r
		}
	}
	_getSign(e, t) {
		const r = t.bizContent || null;
		delete t.bizContent;
		const i = Object.assign({
			method: e,
			appId: this.options.appId,
			charset: this.options.charset,
			version: this.options.version,
			signType: this.options.signType,
			timestamp: S((o = this.options.timeOffset, new Date(Date.now() + 6e4 * ((new Date).getTimezoneOffset() + 60 * (o ||
				0)))))
		}, t);
		var o;
		r && (i.bizContent = JSON.stringify(_(r)));
		const s = _(i),
			a = Object.keys(s).sort().map(e => {
				let t = s[e];
				return "[object String]" !== Array.prototype.toString.call(t) && (t = JSON.stringify(t)), `${e}=${t}`
			}).join("&"),
			c = n.createSign(Pr[this.options.signType]).update(a, "utf8").sign(this.options.privateKey, "base64");
		return Object.assign(s, {
			sign: c
		})
	}
	async _exec(e, t = {}, r = {}) {
		const n = this._getSign(e, t),
			{
				url: i,
				execParams: o
			} = this._formatUrl(this.options.gateway, n),
			{
				status: s,
				data: a
			} = await uniCloud.httpclient.request(i, {
				method: "POST",
				data: o,
				dataType: "text",
				timeout: this.options.timeout
			});
		if (200 !== s) throw new Error("request fail");
		const c = JSON.parse(a),
			u = e.replace(/\./g, "_") + "_response",
			f = c[u],
			d = c.error_response;
		if (f) {
			if (!r.validateSign || this._checkResponseSign(a, u)) {
				if (!f.code || "10000" === f.code) {
					return {
						errCode: 0,
						errMsg: f.msg || "",
						...b(f)
					}
				}
				const e = f.sub_code ? `${f.sub_code} ${f.sub_msg}` : "" + (f.msg || "unkonwn error");
				throw new Error(e)
			}
			throw new Error("返回结果签名错误")
		}
		if (d) throw new Error(d.sub_msg || d.msg || "接口返回错误");
		throw new Error("request fail")
	}
	_checkResponseSign(e, t) {
		if (!this.options.alipayPublicKey || "" === this.options.alipayPublicKey) return console.warn(
			"options.alipayPublicKey is empty"), !0;
		if (!e) return !1;
		const r = this._getSignStr(e, t),
			i = JSON.parse(e).sign,
			o = n.createVerify(Pr[this.options.signType]);
		return o.update(r, "utf8"), o.verify(this.options.alipayPublicKey, i, "base64")
	}
	_getSignStr(e, t) {
		let r = e.trim();
		const n = e.indexOf(t + '"'),
			i = e.lastIndexOf('"sign"');
		return r = r.substr(n + t.length + 1), r = r.substr(0, i), r = r.replace(/^[^{]*{/g, "{"), r = r.replace(
			/\}([^}]*)$/g, "}"), r
	}
	_notifyRSACheck(e, t, r) {
		const i = Object.keys(e).sort().filter(e => e).map(t => {
			let r = e[t];
			return "[object String]" !== Array.prototype.toString.call(r) && (r = JSON.stringify(r)),
				`${t}=${decodeURIComponent(r)}`
		}).join("&");
		return n.createVerify(Pr[r]).update(i, "utf8").verify(this.options.alipayPublicKey, t, "base64")
	}
	_checkNotifySign(e) {
		const t = e.sign;
		if (!this.options.alipayPublicKey || !t) return !1;
		const r = e.sign_type || this.options.signType || "RSA2",
			n = { ...e
			};
		delete n.sign, n.sign_type = r;
		return !!this._notifyRSACheck(n, t, r) || (delete n.sign_type, this._notifyRSACheck(n, t, r))
	}
	_verifyNotify(e) {
		if (!e.headers) throw new Error("通知格式不正确");
		let t;
		for (const r in e.headers) "content-type" === r.toLowerCase() && (t = e.headers[r]);
		if (!1 !== e.isBase64Encoded && -1 === t.indexOf("application/x-www-form-urlencoded")) throw new Error("通知格式不正确");
		const r = a.parse(e.body);
		if (this._checkNotifySign(r)) return b(r);
		throw new Error("通知验签未通过")
	}
} {
	constructor(e) {
		super(e), this._protocols = Or
	}
	async code2Session(e) {
		return await this._exec("alipay.system.oauth.token", {
			grantType: "authorization_code",
			code: e
		})
	}
}
var Ar = function(e = {}) {
		return e.clientType = e.clientType || __ctx__.PLATFORM, e.appId = e.appid, e.secret = e.appsecret, I(Rr, e)
	},
	Cr = function(e = {}) {
		return e.clientType = e.clientType || __ctx__.PLATFORM, e.appId = e.appid, I(Tr, e)
	};

function Dr({
	platform: e
}) {
	const t = $(e),
		r = e || __ctx__.PLATFORM;
	if (!t.oauth || !t.oauth.alipay) throw new Error(`请在公用模块uni-id的config.json或init方法中添加${r}平台支付宝登录配置项`);
	["appid", "privateKey"].forEach(e => {
		if (!t.oauth.alipay[e]) throw new Error(`请在公用模块uni-id的config.json或init方法中添加配置项：${r}.oauth.alipay.${e}`)
	});
	return Cr(t.oauth.alipay)
}
async function Mr(e, t = {}) {
	const {
		my_invite_code: r
	} = e;
	if ($().autoSetInviteCode || r) {
		const t = await K({
			inviteCode: r
		});
		if (t.code > 0) return t;
		e.my_invite_code = t.inviteCode
	}
	return {
		code: 0,
		msg: "注册成功",
		...await async function(e, t = {}) {
			const r = (await T.add({ ...e,
					register_date: Date.now(),
					register_ip: __ctx__.CLIENTIP
				})).id,
				{
					token: n,
					tokenExpired: i
				} = Sr({
					uid: r,
					needPermission: t.needPermission
				});
			return await T.doc(r).update({
				token: [n]
			}), {
				token: n,
				tokenExpired: i,
				uid: r,
				type: "register"
			}
		}(e, t)
	}
}
const $r = uniCloud.database();
async function Nr({
	mobile: e,
	email: t,
	code: r,
	expiresIn: n,
	type: i
}) {
	if (!e && !t || e && t) return {
		code: 50101,
		msg: "手机号和邮箱必须且只能给定其中一个"
	};
	r || (r = x()), n || (n = 180);
	const o = Date.now(),
		s = {
			mobile: e,
			email: t,
			type: i,
			code: r,
			state: 0,
			ip: __ctx__.CLIENTIP,
			created_at: o,
			expired_at: o + 1e3 * n
		};
	return E("addRes", await A.add(s)), {
		code: 0,
		mobile: e,
		email: t
	}
}
async function Br({
	mobile: e,
	email: t,
	code: r,
	type: n
}) {
	if (!e && !t || e && t) return {
		code: 50201,
		msg: "手机号和邮箱必须且只能给定其中一个"
	};
	const i = $r.command,
		o = Date.now(),
		s = {
			mobile: e,
			email: t,
			type: n,
			code: r,
			state: 0,
			expired_at: i.gt(o)
		},
		a = await A.where(s).orderBy("created_at", "desc").limit(1).get();
	if (E("verifyRecord:", a), a && a.data && a.data.length > 0) {
		const e = a.data[0];
		return E("upRes", await A.doc(e._id).update({
			state: 1
		})), {
			code: 0,
			msg: "验证通过"
		}
	}
	return {
		code: 50202,
		msg: "验证码错误或已失效"
	}
}

function Lr({
	platform: e
}) {
	const t = $(e),
		r = e || __ctx__.PLATFORM;
	if (!t.oauth || !t.oauth.weixin) throw new Error(`请在公用模块uni-id的config.json或init方法中添加${r}平台微信登录配置项`);
	["appid", "appsecret"].forEach(e => {
		if (!t.oauth.weixin[e]) throw new Error(`请在公用模块uni-id的config.json或init方法中添加配置项：${r}.oauth.weixin.${e}`)
	});
	return Ar(t.oauth.weixin)
}
const Vr = uniCloud.database();
const Kr = uniCloud.database();
const qr = uniCloud.database();
const Hr = uniCloud.database();
const Ur = uniCloud.database().command;
const Fr = uniCloud.database();
const Jr = uniCloud.database();
const Gr = uniCloud.database();
const zr = uniCloud.database();
const Wr = uniCloud.database();
var Xr = Object.freeze({
	__proto__: null,
	getUserInfo: async function({
		uid: e,
		field: t
	}) {
		const r = {};
		if (t && t.length)
			for (let e = 0; e < t.length; e++) r[t[e]] = !0;
		let n;
		return n = t && t.length ? await T.doc(e).field(r).get() : await T.doc(e).get(), 0 === n.data.length ? {
			code: 80301,
			msg: "未查询到用户信息"
		} : {
			code: 0,
			msg: "获取用户信息成功",
			userInfo: n.data[0]
		}
	},
	resetPwd: async function({
		uid: e,
		password: t
	}) {
		const {
			passwordHash: r,
			version: n
		} = N(t), i = {
			password: r,
			token: []
		};
		return n && (i.password_secret_version = n), E("upRes", await T.doc(e).update(i)), {
			code: 0,
			msg: "密码重置成功"
		}
	},
	setAvatar: async function(e) {
		return E("setAvatar -> upRes", await T.doc(e.uid).update({
			avatar: e.avatar
		})), {
			code: 0,
			msg: "头像设置成功"
		}
	},
	updatePwd: async function(e) {
		const t = await T.doc(e.uid).get();
		if (t && t.data && t.data.length > 0) {
			if (0 === B(t.data[0], e.oldPassword).code) {
				const {
					passwordHash: r,
					version: n
				} = N(e.newPassword), i = {
					password: r,
					token: []
				};
				n && (i.password_secret_version = n);
				return E("upRes", await T.doc(t.data[0]._id).update(i)), {
					code: 0,
					msg: "修改成功"
				}
			}
			return {
				code: 40202,
				msg: "旧密码错误"
			}
		}
		return {
			code: 40201,
			msg: "用户不存在"
		}
	},
	updateUser: async function(e) {
		const t = e.uid;
		return t ? (delete e.uid, E("update -> upRes", await T.doc(t).update(e)), {
			code: 0,
			msg: "修改成功"
		}) : {
			code: 80101,
			msg: "缺少uid参数"
		}
	},
	acceptInvite: async function({
		uid: e,
		inviteCode: t
	}) {
		const r = await T.where({
			_id: L.neq(e),
			inviter_uid: L.not(L.all([e])),
			my_invite_code: t
		}).get();
		if (1 !== r.data.length) return {
			code: 80501,
			msg: "邀请码无效"
		};
		const n = [r.data[0]._id].concat(r.data[0].inviter_uid || []),
			i = await T.doc(e).field({
				my_invite_code: !0,
				inviter_uid: !0
			}).get();
		if (0 === i.data.length) return {
			code: 80502,
			msg: "uid错误用户不存在"
		};
		if (i.data[0].inviter_uid && i.data[0].inviter_uid.length > 0) return {
			code: 80503,
			msg: "邀请码不可修改"
		};
		const o = Date.now();
		return await T.doc(e).update({
			inviter_uid: n,
			invite_time: o
		}), await T.where({
			inviter_uid: e
		}).update({
			inviter_uid: L.push(n)
		}), {
			code: 0,
			msg: "邀请码填写成功"
		}
	},
	getInvitedUser: async function({
		uid: e,
		level: t = 1,
		limit: r = 20,
		offset: n = 0,
		needTotal: i = !1
	}) {
		const o = {
			code: 0,
			msg: "获取邀请列表成功",
			invitedUser: (await T.where({
				["inviter_uid." + (t - 1)]: e
			}).field({
				_id: !0,
				username: !0,
				mobile: !0,
				invite_time: !0
			}).orderBy("invite_time", "desc").skip(n).limit(r).get()).data
		};
		if (i) {
			const r = await T.where({
				["inviter_uid." + (t - 1)]: e
			}).count();
			o.total = r.total
		}
		return o
	},
	setUserInviteCode: async function({
		uid: e,
		myInviteCode: t
	}) {
		const r = await K({
			inviteCode: t
		});
		return r.code > 0 ? r : (await T.doc(e).update({
			my_invite_code: r.inviteCode
		}), {
			code: 0,
			msg: "邀请码设置成功",
			myInviteCode: r.inviteCode
		})
	},
	loginByAlipay: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		const r = t.needPermission,
			n = t.platform || __ctx__.PLATFORM,
			{
				openid: i
			} = await Dr({
				platform: n
			}).code2Session(t.code);
		if (!i) return {
			code: 10501,
			msg: "获取openid失败"
		};
		const o = await T.where({
			ali_openid: i
		}).get();
		if (o && o.data && o.data.length > 0) {
			const e = o.data[0],
				t = await jr(e, {
					needPermission: r
				});
			if (0 !== t.code) return t;
			const {
				userInfo: n
			} = t;
			return { ...t,
				openid: i,
				mobileConfirmed: 1 === n.mobile_confirmed,
				emailConfirmed: 1 === n.email_confirmed
			}
		} {
			const e = {
				ali_openid: i
			};
			e.my_invite_code = t.myInviteCode;
			const n = await Mr(e, {
				needPermission: r
			});
			return 0 !== n.code ? n : { ...n,
				openid: i,
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		}
	},
	loginByEmail: async function({
		email: e,
		code: t,
		password: r,
		myInviteCode: n,
		type: i,
		needPermission: o
	}) {
		const s = await Br({
			email: e,
			code: t,
			type: i || "login"
		});
		if (0 !== s.code) return s;
		const a = {
				email: e,
				email_confirmed: 1
			},
			c = await T.where(a).get();
		if (E("userInDB:", c), c && c.data && c.data.length > 0) {
			if ("register" === i) return {
				code: 10301,
				msg: "此邮箱已注册"
			};
			const t = c.data[0],
				r = await jr(t, {
					needPermission: o
				});
			return 0 !== r.code ? r : { ...r,
				email: e
			}
		} {
			if ("login" === i) return {
				code: 10302,
				msg: "此邮箱尚未注册"
			};
			const t = {
				email: e,
				email_confirmed: 1
			};
			if (r) {
				const {
					passwordHash: e,
					version: n
				} = N(r);
				t.password = e, n && (t.password_secret_version = n)
			}
			t.my_invite_code = n;
			const s = await Mr(t, {
				needPermission: o
			});
			return 0 !== s.code ? s : { ...s,
				email: e
			}
		}
	},
	loginBySms: async function({
		mobile: e,
		code: t,
		password: r,
		inviteCode: n,
		myInviteCode: i,
		type: o,
		needPermission: s
	}) {
		const a = $();
		if (a.forceInviteCode && !o) throw new Error("[loginBySms]强制使用邀请码注册时，需指明type为register还是login");
		const c = await Br({
			mobile: e,
			code: t,
			type: o || "login"
		});
		if (0 !== c.code) return c;
		const u = {
				mobile: e,
				mobile_confirmed: 1
			},
			f = await T.where(u).get();
		if (f && f.data && f.data.length > 0) {
			if ("register" === o) return {
				code: 10201,
				msg: "此手机号已注册"
			};
			const t = f.data[0],
				r = await jr(t, {
					needPermission: s
				});
			return 0 !== r.code ? r : { ...r,
				mobile: e
			}
		} {
			const t = Date.now();
			if ("login" === o) return {
				code: 10203,
				msg: "此手机号尚未注册"
			};
			const c = {
				mobile: e,
				mobile_confirmed: 1,
				register_ip: __ctx__.CLIENTIP,
				register_date: t
			};
			if (r) {
				const {
					passwordHash: e,
					version: t
				} = N(r);
				c.password = e, t && (c.password_secret_version = t)
			}
			if (n) {
				const e = await T.where({
					my_invite_code: n
				}).get();
				if (1 !== e.data.length) return {
					code: 10202,
					msg: "邀请码无效"
				};
				c.inviter_uid = [e.data[0]._id].concat(e.data[0].inviter_uid || []), c.invite_time = t
			} else if (a.forceInviteCode) return {
				code: 10202,
				msg: "邀请码无效"
			};
			c.my_invite_code = i;
			const u = await Mr(c, {
				needPermission: s
			});
			return 0 !== u.code ? u : { ...u,
				mobile: e
			}
		}
	},
	loginByWeixin: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		const r = t.needPermission,
			n = t.platform || __ctx__.PLATFORM,
			{
				openid: i,
				unionid: o,
				sessionKey: s
			} = await Lr({
				platform: n
			})["mp-weixin" === n ? "code2Session" : "getOauthAccessToken"](t.code);
		if (!i) return {
			code: 10401,
			msg: "获取openid失败"
		};
		const a = Vr.command,
			c = [{
				wx_openid: {
					[n]: i
				}
			}];
		o && c.push({
			wx_unionid: o
		});
		const u = await T.where(a.or(...c)).get();
		if (u && u.data && u.data.length > 0) {
			const e = u.data[0],
				t = {
					wx_openid: {
						[n]: i
					}
				};
			o && (t.wx_unionid = o);
			const a = await jr(e, {
				needPermission: r,
				extraData: t
			});
			if (0 !== a.code) return a;
			const {
				userInfo: c
			} = a;
			return { ...a,
				openid: i,
				unionid: o,
				sessionKey: s,
				mobileConfirmed: 1 === c.mobile_confirmed,
				emailConfirmed: 1 === c.email_confirmed
			}
		} {
			const e = {
					wx_openid: {
						[n]: i
					},
					wx_unionid: o
				},
				a = t.myInviteCode;
			e.my_invite_code = a;
			const c = await Mr(e, {
				needPermission: r
			});
			return 0 !== c.code ? c : { ...c,
				openid: i,
				unionid: o,
				sessionKey: s,
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		}
	},
	loginByUniverify: async function({
		openid: e,
		access_token: t,
		password: r,
		inviteCode: n,
		myInviteCode: i,
		type: o,
		needPermission: s
	}) {
		const a = $(),
			c = a && a.service && a.service.univerify;
		if (!c) throw new Error("请在config.json或init方法中配置service.univerify下一键登录相关参数");
		const u = ["apiKey", "apiSecret"];
		for (let e = 0, t = u.length; e < t; e++) {
			const t = u[e];
			if (!c[t]) throw new Error("请在config.json或init方法中service.univerify下配置" + t)
		}
		if (a.forceInviteCode && !o) throw new Error("[loginByUniverify] 强制使用邀请码注册时，需指明type为register还是login");
		if (!e || !t) throw new Error("[loginByUniverify] 一键登录需要传递openid和access_token");
		const f = await async function(e) {
			return function(e) {
				const t = {
					0: "成功",
					4e3: "缺失参数",
					4001: "apiKey不存在",
					4002: "sign校验不通过",
					4003: "appid不存在",
					4004: "应用未开通一键登录服务",
					4005: "应用开通的一键登录服务正在审核中",
					4006: "服务空间不在白名单中",
					4100: "账户余额不足",
					5e3: "获取手机号失败，请稍后重试(或其他未知错误)"
				};
				return { ...e,
					msg: t[e.code] ? "[getPhoneNumber] 获取手机号: " + t[e.code] : e.errMsg
				}
			}(await uniCloud.getPhoneNumber({
				provider: "univerify",
				...e
			}))
		}({ ...c,
			openid: e,
			access_token: t
		});
		if (0 !== f.code) 
		{
			console.log(String(f.phoneNumber));
			return f;
		}
		const d = String(f.phoneNumber),
			l = await T.where({
				mobile: d
			}).get();
		if (l && l.data && l.data.length > 0) {
			if ("register" === o) return {
				code: 10201,
				msg: "此手机号已注册"
			};
			const e = l.data[0],
				t = await jr(e, {
					needPermission: s
				});
			return 0 !== t.code ? t : { ...t,
				mobile: d
			}
		}
		if ("login" === o) return {
			code: 10203,
			msg: "此手机号尚未注册"
		};
		const p = Date.now(),
			m = {
				mobile: d,
				mobile_confirmed: 1
			};
		if (r) {
			const {
				passwordHash: e,
				version: t
			} = N(r);
			m.password = e, t && (m.password_secret_version = t)
		}
		if (n) {
			let e = await T.where({
				my_invite_code: n
			}).get();
			if (1 !== e.data.length) return {
				code: 10202,
				msg: "邀请码无效"
			};
			e = e.data[0], m.inviter_uid = [e._id].concat(e.inviter_uid || []), m.invite_time = p
		} else if (a.forceInviteCode) return {
			code: 10202,
			msg: "邀请码无效"
		};
		m.my_invite_code = i;
		const h = await Mr(m, {
			needPermission: s
		});
		return 0 !== h.code ? h : { ...h,
			mobile: d
		}
	},
	login: async function({
		username: e,
		password: t,
		queryField: r = [],
		needPermission: n
	}) {
		const i = Kr.command,
			o = [];
		r && r.length || (r = ["username"]);
		const s = {
			email: {
				email_confirmed: 1
			},
			mobile: {
				mobile_confirmed: 1
			}
		};
		r.forEach(t => {
			o.push({
				[t]: e,
				...s[t]
			})
		});
		const a = await T.where(i.or(...o)).limit(1).get(),
			c = __ctx__.CLIENTIP,
			{
				passwordErrorLimit: u,
				passwordErrorRetryTime: f
			} = $();
		if (E("userInDB:", a), 0 === a.data.length) return {
			code: 10101,
			msg: "用户不存在"
		};
		const d = a.data[0];
		let l = d.login_ip_limit || [];
		l = l.filter(e => e.last_error_time > Date.now() - 1e3 * f);
		let p = l.find(e => e.ip === c);
		if (p && p.error_times >= u) return {
			code: 10103,
			msg: `密码错误次数过多，请${R(p.last_error_time+1e3*f)}再试。`
		};
		const m = B(d, t);
		if (0 === m.code) {
			const e = l.indexOf(p);
			e > -1 && l.splice(e, 1);
			const t = {
					login_ip_limit: l
				},
				{
					passwordHash: r,
					passwordVersion: i
				} = m;
			r && i && (t.password = r, t.password_secret_version = i);
			const o = await jr(d, {
				needPermission: n,
				extraData: t
			});
			return o.code, o
		}
		return p ? (p.error_times++, p.last_error_time = Date.now()) : (p = {
			ip: c,
			error_times: 1,
			last_error_time: Date.now()
		}, l.push(p)), await T.doc(d._id).update({
			login_ip_limit: l
		}), {
			code: 10102,
			msg: "密码错误"
		}
	},
	register: async function(e) {
		const t = [],
			r = [{
				name: "username",
				desc: "用户名"
			}, {
				name: "email",
				desc: "邮箱",
				extraCond: {
					email_confirmed: 1
				}
			}, {
				name: "mobile",
				desc: "手机号",
				extraCond: {
					mobile_confirmed: 1
				}
			}],
			n = e.needPermission;
		if (void 0 !== n && delete e.needPermission, r.forEach(r => {
				const n = r.name;
				e[n] && e[n].trim() && t.push({
					[n]: e[n],
					...r.extraCond
				})
			}), 0 === t.length) return {
			code: 20101,
			msg: "用户名、邮箱、手机号不可同时为空"
		};
		const {
			username: i,
			email: o,
			mobile: s,
			myInviteCode: a
		} = e, c = qr.command, u = await T.where(c.or(...t)).get();
		if (u && u.data.length > 0) {
			const t = u.data[0];
			for (let n = 0; n < r.length; n++) {
				const i = r[n];
				let o = !0;
				if (i.extraCond && (o = Object.keys(i.extraCond).every(e => t[e] === i.extraCond[e])), t[i.name] === e[i.name] &&
					o) return {
					code: 20102,
					msg: i.desc + "已存在"
				}
			}
		}
		const {
			passwordHash: f,
			version: d
		} = N(e.password);
		e.password = f, d && (e.password_secret_version = d), e.my_invite_code = a, delete e.myInviteCode;
		const l = await Mr(e, {
			needPermission: n
		});
		return 0 !== l.code ? l : { ...l,
			username: i,
			email: o,
			mobile: s
		}
	},
	logout: async function(e) {
		const t = await Er(e);
		if (t.code && t.code > 0) return t;
		const r = Hr.command;
		return await T.doc(t.uid).update({
			token: r.pull(e)
		}), {
			code: 0,
			msg: "退出成功"
		}
	},
	getRoleByUid: async function({
		uid: e
	}) {
		if (!e) return {
			code: "PARAMETER_ERROR",
			msg: "用户Id不能为空"
		};
		const t = await T.doc(e).get();
		return 0 === t.data.length ? {
			code: "USER_NOT_EXIST",
			msg: "用户不存在"
		} : {
			code: 0,
			msg: "获取角色成功",
			role: t.data[0].role || []
		}
	},
	getPermissionByRole: async function({
		roleID: e
	}) {
		if (!e) return {
			code: "PARAMETER_ERROR",
			msg: "角色ID不能为空"
		};
		if ("admin" === e) {
			return {
				code: 0,
				msg: "获取权限成功",
				permission: (await D.limit(1e4).get()).data.map(e => e.permission_id)
			}
		}
		const t = await C.where({
			role_id: e
		}).get();
		return 0 === t.data.length ? {
			code: "ROLE_NOT_EXIST",
			msg: "角色不存在"
		} : {
			code: 0,
			msg: "获取权限成功",
			permission: t.data[0].permission || []
		}
	},
	getPermissionByUid: async function({
		uid: e
	}) {
		const t = await T.aggregate().match({
				_id: e
			}).project({
				role: !0
			}).unwind("$role").lookup({
				from: "uni-id-roles",
				localField: "role",
				foreignField: "role_id",
				as: "roleDetail"
			}).unwind("$roleDetail").replaceRoot({
				newRoot: "$roleDetail"
			}).end(),
			r = [];
		return t.data.forEach(e => {
			Array.prototype.push.apply(r, e.permission)
		}), {
			code: 0,
			msg: "获取权限成功",
			permission: j(r)
		}
	},
	bindRole: async function({
		uid: e,
		roleList: t,
		reset: r = !1
	}) {
		const n = {};
		return "string" == typeof t && (t = [t]), n.role = r ? t : Ur.push(t), await T.doc(e).update(n), {
			code: 0,
			msg: "角色绑定成功"
		}
	},
	bindPermission: async function({
		roleID: e,
		permissionList: t,
		reset: r = !1
	}) {
		const n = {};
		return "string" == typeof t && (t = [t]), n.permission = r ? t : Ur.push(t), await C.where({
			role_id: e
		}).update(n), {
			code: 0,
			msg: "权限绑定成功"
		}
	},
	unbindRole: async function({
		uid: e,
		roleList: t
	}) {
		return "string" == typeof t && (t = [t]), await T.doc(e).update({
			role: Ur.pull(Ur.in(t))
		}), {
			code: 0,
			msg: "角色解绑成功"
		}
	},
	unbindPermission: async function({
		roleID: e,
		permissionList: t
	}) {
		return "string" == typeof t && (t = [t]), await C.where({
			role_id: e
		}).update({
			permission: Ur.pull(Ur.in(t))
		}), {
			code: 0,
			msg: "权限解绑成功"
		}
	},
	addRole: async function({
		roleID: e,
		roleName: t,
		comment: r,
		permission: n = []
	}) {
		return e ? "admin" === e ? {
			code: "PARAMETER_ERROR",
			msg: "不可新增roleID为admin的角色"
		} : (await C.add({
			role_id: e,
			role_name: t,
			comment: r,
			permission: n,
			create_date: Date.now()
		}), {
			code: 0,
			msg: "角色新增成功"
		}) : {
			code: "PARAMETER_ERROR",
			msg: "roleID不能为空"
		}
	},
	addPermission: async function({
		permissionID: e,
		permissionName: t,
		comment: r
	}) {
		return e ? (await D.add({
			permission_id: e,
			permission_name: t,
			comment: r,
			create_date: Date.now()
		}), {
			code: 0,
			msg: "权限新增成功"
		}) : {
			code: "PARAMETER_ERROR",
			msg: "permissionID不能为空"
		}
	},
	getRoleList: async function({
		limit: e = 20,
		offset: t = 0,
		needTotal: r = !0
	}) {
		const n = {
			code: 0,
			msg: "获取角色列表成功",
			roleList: (await C.skip(t).limit(e).get()).data
		};
		if (r) {
			const {
				total: e
			} = await C.where({
				_id: Ur.exists(!0)
			}).count();
			n.total = e
		}
		return n
	},
	getRoleInfo: async function(e) {
		const t = await C.where({
			role_id: e
		}).get();
		return 0 === t.data.length ? {
			code: "ROLE_ID_NOT_EXISTS",
			msg: "角色ID不存在"
		} : {
			code: 0,
			...t.data[0]
		}
	},
	updateRole: async function({
		roleID: e,
		roleName: t,
		comment: r,
		permission: n
	}) {
		return e ? (await C.where({
			role_id: e
		}).update({
			role_name: t,
			comment: r,
			permission: n
		}), {
			code: 0,
			msg: "角色更新成功"
		}) : {
			code: "PARAMETER_ERROR",
			msg: "参数错误，roleID不能为空"
		}
	},
	deleteRole: async function({
		roleID: e
	}) {
		const t = m(e);
		if ("string" === t) e = [e];
		else if ("array" !== t) throw new Error("roleID只能为字符串或者数组");
		return await C.where({
			role_id: Ur.in(e)
		}).remove(), await T.where({
			role: Ur.elemMatch(Ur.in(e))
		}).update({
			role: Ur.pullAll(e)
		}), {
			code: 0,
			msg: "角色删除成功"
		}
	},
	getPermissionList: async function({
		limit: e = 20,
		offset: t = 0,
		needTotal: r = !0
	}) {
		const n = {
			code: 0,
			msg: "获取权限列表成功",
			permissionList: (await D.skip(t).limit(e).get()).data
		};
		if (r) {
			const {
				total: e
			} = await D.where({
				_id: Ur.exists(!0)
			}).count();
			n.total = e
		}
		return n
	},
	getPermissionInfo: async function(e) {
		const t = await D.where({
			permission_id: e
		}).get();
		return 0 === t.data.length ? {
			code: "PERMISSION_ID_NOT_EXISTS",
			msg: "权限ID不存在"
		} : {
			code: 0,
			...t.data[0]
		}
	},
	updatePermission: async function({
		permissionID: e,
		permissionName: t,
		comment: r
	}) {
		return e ? (await D.where({
			permission_id: e
		}).update({
			permission_name: t,
			comment: r
		}), {
			code: 0,
			msg: "权限更新成功"
		}) : {
			code: "PARAMETER_ERROR",
			msg: "参数错误，permissionID不能为空"
		}
	},
	deletePermission: async function({
		permissionID: e
	}) {
		const t = m(e);
		if ("string" === t) e = [e];
		else if ("array" !== t) throw new Error("permissionID只能为字符串或者数组");
		return await D.where({
			permission_id: Ur.in(e)
		}).remove(), await C.where({
			permission: Ur.elemMatch(Ur.in(e))
		}).update({
			permission: Ur.pullAll(e)
		}), {
			code: 0,
			msg: "权限删除成功"
		}
	},
	bindAlipay: async function({
		uid: e,
		code: t,
		platform: r
	}) {
		const n = r || __ctx__.PLATFORM,
			{
				openid: i
			} = await Dr({
				platform: n
			}).code2Session(t);
		if (!i) return {
			code: 60401,
			msg: "获取openid失败"
		};
		const o = await T.where({
			ali_openid: i
		}).get();
		return o && o.data && o.data.length > 0 ? {
			code: 60402,
			msg: "支付宝绑定失败，此账号已被绑定"
		} : (await T.doc(e).update({
			ali_openid: i
		}), {
			code: 0,
			msg: "绑定成功"
		})
	},
	bindEmail: async function({
		uid: e,
		email: t,
		code: r
	}) {
		const n = await T.where({
			email: t,
			email_confirmed: 1
		}).count();
		if (n && n.total > 0) return {
			code: 60201,
			msg: "此邮箱已被绑定"
		};
		if (r) {
			const e = await Br({
				email: t,
				code: r,
				type: "bind"
			});
			if (0 !== e.code) return e
		}
		return E("bindEmail -> upRes", await T.doc(e).update({
			email: t,
			email_confirmed: 1
		})), {
			code: 0,
			msg: "邮箱绑定成功"
		}
	},
	bindMobile: async function({
		uid: e,
		mobile: t,
		code: r
	}) {
		const n = await T.where({
			mobile: t,
			mobile_confirmed: 1
		}).count();
		if (n && n.total > 0) return {
			code: 60101,
			msg: "此手机号已被绑定"
		};
		if (r) {
			const e = await Br({
				mobile: t,
				code: r,
				type: "bind"
			});
			if (0 !== e.code) return e
		}
		return E("bindMobile -> upRes", await T.doc(e).update({
			mobile: t,
			mobile_confirmed: 1
		})), {
			code: 0,
			msg: "手机号码绑定成功"
		}
	},
	bindWeixin: async function({
		uid: e,
		code: t,
		platform: r
	}) {
		const n = r || __ctx__.PLATFORM,
			{
				openid: i,
				unionid: o
			} = await Lr({
				platform: n
			})["mp-weixin" === n ? "code2Session" : "getOauthAccessToken"](t);
		if (!i) return {
			code: 60301,
			msg: "获取openid失败"
		};
		const s = Fr.command,
			a = [{
				wx_openid: {
					[n]: i
				}
			}];
		o && a.push({
			wx_unionid: o
		});
		const c = await T.where(s.or(...a)).get();
		if (c && c.data && c.data.length > 0) return {
			code: 60302,
			msg: "微信绑定失败，此微信账号已被绑定"
		};
		const u = {
			wx_openid: {
				[n]: i
			}
		};
		return o && (u.wx_unionid = o), await T.doc(e).update(u), {
			code: 0,
			msg: "绑定成功"
		}
	},
	unbindAlipay: async function(e) {
		const t = Jr.command,
			r = await T.doc(e).update({
				ali_openid: t.remove()
			});
		return E("upRes:", r), 1 === r.updated ? {
			code: 0,
			msg: "支付宝解绑成功"
		} : {
			code: 70401,
			msg: "支付宝解绑失败，请稍后再试"
		}
	},
	unbindEmail: async function({
		uid: e,
		email: t,
		code: r
	}) {
		if (r) {
			const e = await Br({
				email: t,
				code: r,
				type: "unbind"
			});
			if (0 !== e.code) return e
		}
		const n = Gr.command;
		return 1 === (await T.where({
			_id: e,
			email: t
		}).update({
			email: n.remove(),
			email_confirmed: n.remove()
		})).updated ? {
			code: 0,
			msg: "邮箱解绑成功"
		} : {
			code: 70201,
			msg: "邮箱解绑失败，请稍后再试"
		}
	},
	unbindMobile: async function({
		uid: e,
		mobile: t,
		code: r
	}) {
		if (r) {
			const e = await Br({
				mobile: t,
				code: r,
				type: "unbind"
			});
			if (0 !== e.code) return e
		}
		const n = zr.command;
		return 1 === (await T.where({
			_id: e,
			mobile: t
		}).update({
			mobile: n.remove(),
			mobile_confirmed: n.remove()
		})).updated ? {
			code: 0,
			msg: "手机号解绑成功"
		} : {
			code: 70101,
			msg: "手机号解绑失败，请稍后再试"
		}
	},
	unbindWeixin: async function(e) {
		const t = Wr.command,
			r = await T.doc(e).update({
				wx_openid: t.remove(),
				wx_unionid: t.remove()
			});
		return E("upRes:", r), 1 === r.updated ? {
			code: 0,
			msg: "微信解绑成功"
		} : {
			code: 70301,
			msg: "微信解绑失败，请稍后再试"
		}
	},
	code2SessionAlipay: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		try {
			const e = t.platform || __ctx__.PLATFORM,
				r = await Dr({
					platform: e
				}).code2Session(t.code);
			return r.openid ? {
				code: 0,
				msg: "",
				...r
			} : {
				code: 80701,
				msg: "获取openid失败"
			}
		} catch (e) {
			return {
				code: 80702,
				msg: e.message
			}
		}
	},
	code2SessionWeixin: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		try {
			const e = t.platform || __ctx__.PLATFORM,
				r = await Lr({
					platform: e
				})["mp-weixin" === e ? "code2Session" : "getOauthAccessToken"](t.code);
			return r.openid ? {
				code: 0,
				msg: "",
				...r
			} : {
				code: 80601,
				msg: "获取openid失败"
			}
		} catch (e) {
			return {
				code: 80602,
				msg: e.message
			}
		}
	},
	init: function(e) {
		M = e
	},
	encryptPwd: N,
	checkToken: Er,
	createToken: Sr,
	setVerifyCode: Nr,
	verifyCode: Br,
	sendSmsCode: async function({
		mobile: e,
		code: t,
		type: r,
		templateId: n
	}) {
		console.log(n);
		if (!e) throw new Error("手机号码不可为空");
		if (t || (t = x()), !r) throw new Error("验证码类型不可为空");
		const i = $();
		let o = i && i.service && i.service.sms;
		if (!o) throw new Error("请在config.json或init方法中配置service.sms下短信相关参数");
		o = Object.assign({
			codeExpiresIn: 300
		}, o);
		const s = ["smsKey", "smsSecret"];
		if (!n && !o.name) throw new Error("不传入templateId时应在config.json或init方法内service.sms下配置name字段以正确使用uniID_code模板");
		for (let e = 0, t = s.length; e < t; e++) {
			const t = s[e];
			if (!o[t]) throw new Error("请在config.json或init方法中service.sms下配置" + t)
		}
		const {
			name: a,
			smsKey: c,
			smsSecret: u,
			codeExpiresIn: f
		} = o;
		let d;
		switch (r) {
			case "login":
				d = "登录";
				break;
			default:
				d = "验证手机号"
		}
		try {
			const i = {
				name: a,
				code: t,
				action: d,
				expMinute: "" + Math.round(f / 60)
			};
			a && (i.name = a), await uniCloud.sendSms({
				smsKey: c,
				smsSecret: u,
				phone: e,
				templateId: n || "uniID_code",
				data: i
			});
			const o = await Nr({
				mobile: e,
				code: t,
				expiresIn: f,
				type: r
			});
			return o.code >= 0 ? o : {
				code: 0,
				msg: "验证码发送成功"
			}
		} catch (e) {
			return {
				code: 50301,
				msg: "验证码发送失败, " + e.message
			}
		}
	}
});
const Zr = ["init", "encryptPwd", "createToken"],
	Yr = {};
for (const e in Xr) Zr.indexOf(e) > -1 ? Yr[e] = Xr[e] : Yr[e] = P(Xr[e]);
module.exports = Yr;
