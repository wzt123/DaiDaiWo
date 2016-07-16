! function(e) {
	function t(e, t, n, r) {
		return "function" == typeof t && ( r = n, n = t, t =
		void 0), "function" != typeof n && ( r = n, n =
		void 0), {
			url : e,
			data : t,
			fnSuc : n,
			dataType : r
		}
	}

	var n = {}, r = /android/gi.test(navigator.appVersion), o = function() {
		var t = e.localStorage;
		return r && ( t = os.localStorage()), t
	};
	n.trim = function(e) {
		return String.prototype.trim ? null == e ? "" : String.prototype.trim.call(e) : e.replace(/(^\s*)|(\s*$)/g, "")
	}, n.trimAll = function(e) {
		return e.replace(/\s*/g, "")
	}, n.isArray = function(e) {
		return Array.isArray ? Array.isArray(e) : e instanceof Array
	}, n.addEvt = function(e, t, n, r) {
		r = r || !1, e.addEventListener && e.addEventListener(t, n, r)
	}, n.rmEvt = function(e, t, n, r) {
		r = r || !1, e.removeEventListener && e.removeEventListener(t, n, r)
	}, n.one = function(e, t, n, r) {
		r = r || !1;
		var o = this, i = function() {
			n && n(), o.rmEvt(e, t, i, r)
		};
		o.addEvt(e, t, i, r)
	}, n.dom = function(e, t) {
		if (1 === arguments.length && "string" == typeof arguments[0]) {
			if (document.querySelector)
				return document.querySelector(arguments[0])
		} else if (2 === arguments.length && e.querySelector)
			return e.querySelector(t)
	}, n.domAll = function(e, t) {
		if (1 === arguments.length && "string" == typeof arguments[0]) {
			if (document.querySelectorAll)
				return document.querySelectorAll(arguments[0])
		} else if (2 === arguments.length && e.querySelectorAll)
			return e.querySelectorAll(t)
	}, n.byId = function(e) {
		return document.getElementById(e)
	}, n.first = function(e, t) {
		return 1 === arguments.length ? e.children[0] : 2 === arguments.length ? this.dom(e, t + ":first-child") :
		void 0
	}, n.last = function(e, t) {
		if (1 === arguments.length) {
			var n = e.children;
			return n[n.length - 1]
		}
		return 2 === arguments.length ? this.dom(e, t + ":last-child") :
		void 0
	}, n.eq = function(e, t) {
		return this.dom(e, ":nth-child(" + t + ")")
	}, n.not = function(e, t) {
		return this.domAll(e, ":not(" + t + ")")
	}, n.prev = function(e) {
		var t = e.previousSibling;
		return t.nodeType && 3 === t.nodeType ? t = t.previousSibling :
		void 0
	}, n.next = function(e) {
		var t = e.nextSibling;
		return t.nodeType && 3 === t.nodeType ? t = t.nextSibling :
		void 0
	}, n.closest = function(e, t) {
		var r, o, i = function(e, t) {
			var n = 0, r = e.length;
			for (n; r > n; n++)
				if (e[n].isEqualNode(t))
					return e[n];
			return !1
		}, a = function(e, t) {
			for ( r = n.domAll(e.parentNode, t), o = i(r, e); !o; ) {
				if ( e = e.parentNode, null != e && e.nodeType == e.DOCUMENT_NODE)
					return !1;
				a(e, t)
			}
			return o
		};
		return a(e, t)
	}, n.contains = function(e, t) {
		var n = !1;
		if (t === e)
			return n = !0;
		do
			if ( t = t.parentNode, t === e)
				return n = !0;
		while(t===document.body||t===document.documentElement);
		return n
	}, n.remove = function(e) {
		e && e.parentNode && e.parentNode.removeChild(e)
	}, n.attr = function(e, t, n) {
		return 2 == arguments.length ? e.getAttribute(t) : 3 == arguments.length ? (e.setAttribute(t, n), e) :
		void 0
	}, n.removeAttr = function(e, t) {
		2 === arguments.length && e.removeAttribute(t)
	}, n.hasCls = function(e, t) {
		return e.className.indexOf(t) > -1 ? !0 : !1
	}, n.addCls = function(e, t) {
		if ("classList" in e)
			e.classList.add(t);
		else {
			var n = e.className, r = n + " " + t;
			e.className = r
		}
		return e
	}, n.removeCls = function(e, t) {
		if ("classList" in e)
			e.classList.remove(t);
		else {
			var n = e.className, r = n.replace(t, "");
			e.className = r
		}
		return e
	}, n.toggleCls = function(e, t) {
		return "classList" in e ? e.classList.toggle(t) : n.hasCls(e, t) ? n.addCls(e, t) : n.removeCls(e, t), e
	}, n.val = function(e, t) {
		if (1 === arguments.length)
			switch(e.tagName) {
				case"SELECT":
					var n = e.options[e.selectedIndex].value;
					return n;
				case"INPUT":
					return e.value;
				case"TEXTAREA":
					return e.value
			}
		if (2 === arguments.length)
			switch(e.tagName) {
				case"SELECT":
					return e.options[e.selectedIndex].value = t, e;
				case"INPUT":
					return e.value = t, e;
				case"TEXTAREA":
					return e.value = t, e
			}
	}, n.prepend = function(e, t) {
		return e.insertAdjacentHTML("afterbegin", t), e
	}, n.append = function(e, t) {
		return e.insertAdjacentHTML("beforeend", t), e
	}, n.before = function(e, t) {
		return e.insertAdjacentHTML("beforebegin", t), e
	}, n.after = function(e, t) {
		return e.insertAdjacentHTML("afterend", t), e
	}, n.html = function(e, t) {
		return 1 === arguments.length ? e.innerHTML : 2 === arguments.length ? (e.innerHTML = t, e) :
		void 0
	}, n.text = function(e, t) {
		return 1 === arguments.length ? e.textContent : 2 === arguments.length ? (e.textContent = t, e) :
		void 0
	}, n.offset = function(e) {
		var t, n;
		document.documentElement ? ( t = document.documentElement.scrollLeft, n = document.documentElement.scrollTop) : ( t = document.body.scrollLeft, n = document.body.scrollTop);
		var r = e.getBoundingClientRect();
		return {
			l : r.left + t,
			t : r.top + n,
			w : e.offsetWidth,
			h : e.offsetHeight
		}
	}, n.css = function(e, t) {
		"string" == typeof t && t.indexOf(":") > 0 && e.style && (e.style.cssText += ";" + t)
	}, n.cssVal = function(t, n) {
		if (2 === arguments.length) {
			var r = e.getComputedStyle(t, null);
			return r.getPropertyValue(n)
		}
	}, n.jsonToStr = function(e) {
		return "object" == typeof e ? JSON && JSON.stringify(e) :
		void 0
	}, n.strToJson = function(e) {
		return "string" == typeof e ? JSON && JSON.parse(e) :
		void 0
	}, n.setStorage = function(e, t) {
		if (2 === arguments.length) {
			var n = t;
			"object" == typeof n ? ( n = JSON.stringify(n), n = "obj-" + n) : n = "str-" + n;
			var r = o();
			r && r.setItem(e, n)
		}
	}, n.getStorage = function(e) {
		var t = o();
		if (t) {
			var n = t.getItem(e);
			if (!n)
				return;
			if (0 === n.indexOf("obj-"))
				return n = n.slice(4), JSON.parse(n);
			if (0 === n.indexOf("str-"))
				return n.slice(4)
		}
	}, n.rmStorage = function(e) {
		var t = o();
		t && e && t.removeItem(e)
	}, n.clearStorage = function() {
		var e = o();
		e && e.clear()
	}, n.fixIos7Bar = function(e) {
		var t = api.systemType;
		if ("ios" == t) {
			var n = api.systemVersion, r = parseInt(n, 10), o = api.fullScreen, i = api.iOS7StatusBarAppearance;
			r >= 7 && !o && i && (e.style.paddingTop = "20px")
		}
	}, n.toast = function(e, t, n) {
		var r = {}, o = function(e, t) {
			api.showProgress(e), setTimeout(function() {
				api.hideProgress()
			}, t)
		};
		if (1 === arguments.length) {
			var n = n || 500;
			"number" == typeof e ? n = e : r.title = e + "", o(r, n)
		} else if (2 === arguments.length) {
			var n = n || 500, t = t;
			if ("number" == typeof t) {
				var i = t;
				n = i, t = null
			}
			e && (r.title = e), t && (r.text = t), o(r, n)
		}
		e && (r.title = e), t && (r.text = t), n = n || 500, o(r, n)
	}, n.post = function() {
		var e = t.apply(null, arguments), n = {}, r = e.fnSuc;
		if (e.url && (n.url = e.url), e.data && (n.data = e.data), e.dataType) {
			var o = e.dataType.toLowerCase();
			("text" == o || "json" == o) && (n.dataType = o)
		} else
			n.dataType = "json";
		n.method = "post", api.ajax(n, function(e) {
			e && r && r(e)
		})
	}, n.get = function() {
		var e = t.apply(null, arguments), n = {}, r = e.fnSuc;
		if (e.url && (n.url = e.url), e.dataType) {
			var o = e.dataType.toLowerCase();
			("text" == o || "json" == o) && (n.dataType = o)
		} else
			n.dataType = "text";
		n.method = "get", api.ajax(n, function(e) {
			e && r && r(e)
		})
	}, e.$api = n
}(window);
