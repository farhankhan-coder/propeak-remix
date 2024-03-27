import {
  createHotContext
} from "/build/_shared/chunk-7LE2OC7F.js";

// app/utils/date-util.jsx
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/utils/date-util.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/utils/date-util.jsx"
  );
  import.meta.hot.lastModified = "1709382081963.2888";
}
var DateToString = (dt) => {
  try {
    let d = new Date(dt);
    let y = d.getFullYear();
    let m = d.getMonth() + 1;
    if (m < 10) {
      m = "0" + m;
    }
    let d1 = d.getDate();
    if (d1 < 10) {
      d1 = "0" + d1;
    }
    return y + "-" + m + "-" + d1;
  } catch (e) {
    return "";
  }
};
_c = DateToString;
var DateToLongString = (dt) => {
  try {
    let d = new Date(dt);
    let y = d.getFullYear();
    let m = d.getMonth() + 1;
    if (m < 10) {
      m = "0" + m;
    }
    let d1 = d.getDate();
    if (d1 < 10) {
      d1 = "0" + d1;
    }
    return y + "-" + m + "-" + d1 + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  } catch (e) {
    return "";
  }
};
_c2 = DateToLongString;
var _c;
var _c2;
$RefreshReg$(_c, "DateToString");
$RefreshReg$(_c2, "DateToLongString");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  DateToString,
  DateToLongString
};
//# sourceMappingURL=/build/_shared/chunk-HUF2CQ7I.js.map
