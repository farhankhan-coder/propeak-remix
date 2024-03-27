import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/react-recaptcha/dist/react-recaptcha.js
var require_react_recaptcha = __commonJS({
  "node_modules/react-recaptcha/dist/react-recaptcha.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "object" == typeof module ? module.exports = t(require_react()) : "function" == typeof define && define.amd ? define(["react"], t) : "object" == typeof exports ? exports.ReactRecaptcha = t(require_react()) : e.ReactRecaptcha = t(e.React);
    }(exports, function(e) {
      return function(e2) {
        function t(r) {
          if (a[r])
            return a[r].exports;
          var n = a[r] = { exports: {}, id: r, loaded: false };
          return e2[r].call(n.exports, n, n.exports, t), n.loaded = true, n.exports;
        }
        var a = {};
        return t.m = e2, t.c = a, t.p = "", t(0);
      }([function(e2, t, a) {
        "use strict";
        function r(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        }
        function n(e3, t2) {
          if (!(e3 instanceof t2))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(e3, t2) {
          if (!e3)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t2 || "object" != typeof t2 && "function" != typeof t2 ? e3 : t2;
        }
        function i(e3, t2) {
          if ("function" != typeof t2 && null !== t2)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t2);
          e3.prototype = Object.create(t2 && t2.prototype, { constructor: { value: e3, enumerable: false, writable: true, configurable: true } }), t2 && (Object.setPrototypeOf ? Object.setPrototypeOf(e3, t2) : e3.__proto__ = t2);
        }
        Object.defineProperty(t, "__esModule", { value: true });
        var l = function() {
          function e3(e4, t2) {
            for (var a2 = 0; a2 < t2.length; a2++) {
              var r2 = t2[a2];
              r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e4, r2.key, r2);
            }
          }
          return function(t2, a2, r2) {
            return a2 && e3(t2.prototype, a2), r2 && e3(t2, r2), t2;
          };
        }(), s = a(6), c = r(s), p = a(4), u = r(p), d = { className: u.default.string, onloadCallbackName: u.default.string, elementID: u.default.string, onloadCallback: u.default.func, verifyCallback: u.default.func, expiredCallback: u.default.func, render: u.default.oneOf(["onload", "explicit"]), sitekey: u.default.string, theme: u.default.oneOf(["light", "dark"]), type: u.default.string, verifyCallbackName: u.default.string, expiredCallbackName: u.default.string, size: u.default.oneOf(["invisible", "compact", "normal"]), tabindex: u.default.string, hl: u.default.string, badge: u.default.oneOf(["bottomright", "bottomleft", "inline"]) }, f = { elementID: "g-recaptcha", className: "g-recaptcha", onloadCallback: void 0, onloadCallbackName: "onloadCallback", verifyCallback: void 0, verifyCallbackName: "verifyCallback", expiredCallback: void 0, expiredCallbackName: "expiredCallback", render: "onload", theme: "light", type: "image", size: "normal", tabindex: "0", hl: "en", badge: "bottomright" }, h = function() {
          return "undefined" != typeof window && "undefined" != typeof window.grecaptcha && "function" == typeof window.grecaptcha.render;
        }, y = void 0, b = function(e3) {
          function t2(e4) {
            n(this, t2);
            var a2 = o(this, (t2.__proto__ || Object.getPrototypeOf(t2)).call(this, e4));
            return a2._renderGrecaptcha = a2._renderGrecaptcha.bind(a2), a2.reset = a2.reset.bind(a2), a2.state = { ready: h(), widget: null }, a2.state.ready || "undefined" == typeof window || (y = setInterval(a2._updateReadyState.bind(a2), 1e3)), a2;
          }
          return i(t2, e3), l(t2, [{ key: "componentDidMount", value: function() {
            this.state.ready && this._renderGrecaptcha();
          } }, { key: "componentDidUpdate", value: function(e4, t3) {
            var a2 = this.props, r2 = a2.render, n2 = a2.onloadCallback;
            "explicit" === r2 && n2 && this.state.ready && !t3.ready && this._renderGrecaptcha();
          } }, { key: "componentWillUnmount", value: function() {
            clearInterval(y);
          } }, { key: "reset", value: function() {
            var e4 = this.state, t3 = e4.ready, a2 = e4.widget;
            t3 && null !== a2 && grecaptcha.reset(a2);
          } }, { key: "execute", value: function() {
            var e4 = this.state, t3 = e4.ready, a2 = e4.widget;
            t3 && null !== a2 && grecaptcha.execute(a2);
          } }, { key: "_updateReadyState", value: function() {
            h() && (this.setState({ ready: true }), clearInterval(y));
          } }, { key: "_renderGrecaptcha", value: function() {
            this.state.widget = grecaptcha.render(this.props.elementID, { sitekey: this.props.sitekey, callback: this.props.verifyCallback ? this.props.verifyCallback : void 0, theme: this.props.theme, type: this.props.type, size: this.props.size, tabindex: this.props.tabindex, hl: this.props.hl, badge: this.props.badge, "expired-callback": this.props.expiredCallback ? this.props.expiredCallback : void 0 }), this.props.onloadCallback && this.props.onloadCallback();
          } }, { key: "render", value: function() {
            return "explicit" === this.props.render && this.props.onloadCallback ? c.default.createElement("div", { id: this.props.elementID, "data-onloadcallbackname": this.props.onloadCallbackName, "data-verifycallbackname": this.props.verifyCallbackName }) : c.default.createElement("div", { id: this.props.elementID, className: this.props.className, "data-sitekey": this.props.sitekey, "data-theme": this.props.theme, "data-type": this.props.type, "data-size": this.props.size, "data-badge": this.props.badge, "data-tabindex": this.props.tabindex });
          } }]), t2;
        }(s.Component);
        t.default = b, b.propTypes = d, b.defaultProps = f, e2.exports = t.default;
      }, function(e2, t) {
        "use strict";
        function a(e3) {
          return function() {
            return e3;
          };
        }
        var r = function() {
        };
        r.thatReturns = a, r.thatReturnsFalse = a(false), r.thatReturnsTrue = a(true), r.thatReturnsNull = a(null), r.thatReturnsThis = function() {
          return this;
        }, r.thatReturnsArgument = function(e3) {
          return e3;
        }, e2.exports = r;
      }, function(e2, t, a) {
        "use strict";
        function r(e3, t2, a2, r2, o, i, l, s) {
          if (n(t2), !e3) {
            var c;
            if (void 0 === t2)
              c = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
              var p = [a2, r2, o, i, l, s], u = 0;
              c = new Error(t2.replace(/%s/g, function() {
                return p[u++];
              })), c.name = "Invariant Violation";
            }
            throw c.framesToPop = 1, c;
          }
        }
        var n = function(e3) {
        };
        e2.exports = r;
      }, function(e2, t, a) {
        "use strict";
        var r = a(1), n = a(2), o = a(5);
        e2.exports = function() {
          function e3(e4, t3, a3, r2, i, l) {
            l !== o && n(false, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
          }
          function t2() {
            return e3;
          }
          e3.isRequired = e3;
          var a2 = { array: e3, bool: e3, func: e3, number: e3, object: e3, string: e3, symbol: e3, any: e3, arrayOf: t2, element: e3, instanceOf: t2, node: e3, objectOf: t2, oneOf: t2, oneOfType: t2, shape: t2 };
          return a2.checkPropTypes = r, a2.PropTypes = a2, a2;
        };
      }, function(e2, t, a) {
        e2.exports = a(3)();
      }, function(e2, t) {
        "use strict";
        var a = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
        e2.exports = a;
      }, function(t, a) {
        t.exports = e;
      }]);
    });
  }
});

export {
  require_react_recaptcha
};
//# sourceMappingURL=/build/_shared/chunk-QY6SUO3M.js.map
