import { createCompileError, COMPILE_ERROR_CODES_EXTEND_POINT, detectHtmlTag, defaultOnError, baseCompile as baseCompile$1 } from "@intlify/message-compiler";
import { setupDevtoolsPlugin } from "@vue/devtools-api";
import require$$2 from "@vue/compiler-ssr";
import require$$3 from "node:stream";
/**
* @vue/compat v3.5.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function makeMap$1(str) {
  const map2 = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map2[key] = 1;
  return (val) => val in map2;
}
const EMPTY_OBJ$1 = !!(process.env.NODE_ENV !== "production") ? Object.freeze({}) : {};
const EMPTY_ARR$1 = !!(process.env.NODE_ENV !== "production") ? Object.freeze([]) : [];
const NOOP$1 = () => {
};
const NO$1 = () => false;
const isOn$1 = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener$1 = (key) => key.startsWith("onUpdate:");
const extend$1 = Object.assign;
const remove$1 = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1$1 = Object.prototype.hasOwnProperty;
const hasOwn$2 = (val, key) => hasOwnProperty$1$1.call(val, key);
const isArray$2 = Array.isArray;
const isMap$1 = (val) => toTypeString$2(val) === "[object Map]";
const isSet$1 = (val) => toTypeString$2(val) === "[object Set]";
const isDate$2 = (val) => toTypeString$2(val) === "[object Date]";
const isRegExp$2 = (val) => toTypeString$2(val) === "[object RegExp]";
const isFunction$2 = (val) => typeof val === "function";
const isString$2 = (val) => typeof val === "string";
const isSymbol$1 = (val) => typeof val === "symbol";
const isObject$2 = (val) => val !== null && typeof val === "object";
const isPromise$2 = (val) => {
  return (isObject$2(val) || isFunction$2(val)) && isFunction$2(val.then) && isFunction$2(val.catch);
};
const objectToString$2 = Object.prototype.toString;
const toTypeString$2 = (value) => objectToString$2.call(value);
const toRawType$1 = (value) => {
  return toTypeString$2(value).slice(8, -1);
};
const isPlainObject$2 = (val) => toTypeString$2(val) === "[object Object]";
const isIntegerKey$1 = (key) => isString$2(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp$1 = /* @__PURE__ */ makeMap$1(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective$1 = /* @__PURE__ */ makeMap$1(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction$1 = (fn) => {
  const cache2 = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache2[str];
    return hit || (cache2[str] = fn(str));
  };
};
const camelizeRE$1 = /-\w/g;
const camelize$1 = cacheStringFunction$1(
  (str) => {
    return str.replace(camelizeRE$1, (c) => c.slice(1).toUpperCase());
  }
);
const hyphenateRE$1 = /\B([A-Z])/g;
const hyphenate$1 = cacheStringFunction$1(
  (str) => str.replace(hyphenateRE$1, "-$1").toLowerCase()
);
const capitalize$2 = cacheStringFunction$1((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey$1 = cacheStringFunction$1(
  (str) => {
    const s = str ? `on${capitalize$2(str)}` : ``;
    return s;
  }
);
const hasChanged$1 = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, ...arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](...arg);
  }
};
const def$1 = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
const looseToNumber$1 = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
const toNumber$1 = (val) => {
  const n = isString$2(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
let _globalThis$2;
const getGlobalThis$2 = () => {
  return _globalThis$2 || (_globalThis$2 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
const GLOBALS_ALLOWED$1 = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol";
const isGloballyAllowed$1 = /* @__PURE__ */ makeMap$1(GLOBALS_ALLOWED$1);
function normalizeStyle$1(value) {
  if (isArray$2(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$2(item) ? parseStringStyle$1(item) : normalizeStyle$1(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$2(value) || isObject$2(value)) {
    return value;
  }
}
const listDelimiterRE$1 = /;(?![^(]*\))/g;
const propertyDelimiterRE$1 = /:([^]+)/;
const styleCommentRE$1 = /\/\*[^]*?\*\//g;
function parseStringStyle$1(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE$1, "").split(listDelimiterRE$1).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE$1);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle$1(styles) {
  if (!styles) return "";
  if (isString$2(styles)) return styles;
  let ret = "";
  for (const key in styles) {
    const value = styles[key];
    if (isString$2(value) || typeof value === "number") {
      const normalizedKey = key.startsWith(`--`) ? key : hyphenate$1(key);
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function normalizeClass$1(value) {
  let res = "";
  if (isString$2(value)) {
    res = value;
  } else if (isArray$2(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass$1(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$2(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps$1(props) {
  if (!props) return null;
  let { class: klass, style } = props;
  if (klass && !isString$2(klass)) {
    props.class = normalizeClass$1(klass);
  }
  if (style) {
    props.style = normalizeStyle$1(style);
  }
  return props;
}
const HTML_TAGS$1 = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS$1 = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const MATH_TAGS$1 = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
const isHTMLTag$1 = /* @__PURE__ */ makeMap$1(HTML_TAGS$1);
const isSVGTag$1 = /* @__PURE__ */ makeMap$1(SVG_TAGS$1);
const isMathMLTag$1 = /* @__PURE__ */ makeMap$1(MATH_TAGS$1);
const specialBooleanAttrs$1 = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr$1 = /* @__PURE__ */ makeMap$1(specialBooleanAttrs$1);
const isBooleanAttr$1 = /* @__PURE__ */ makeMap$1(
  specialBooleanAttrs$1 + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
);
function includeBooleanAttr$1(value) {
  return !!value || value === "";
}
const isKnownHtmlAttr$1 = /* @__PURE__ */ makeMap$1(
  `accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`
);
const isKnownSvgAttr$1 = /* @__PURE__ */ makeMap$1(
  `xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`
);
function isRenderableAttrValue$1(value) {
  if (value == null) {
    return false;
  }
  const type = typeof value;
  return type === "string" || type === "number" || type === "boolean";
}
const cssVarNameEscapeSymbolsRE$1 = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
function getEscapedCssVarName$1(key, doubleEscape) {
  return key.replace(
    cssVarNameEscapeSymbolsRE$1,
    (s) => `\\${s}`
  );
}
function looseCompareArrays$1(a, b) {
  if (a.length !== b.length) return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual$1(a[i], b[i]);
  }
  return equal;
}
function looseEqual$1(a, b) {
  if (a === b) return true;
  let aValidType = isDate$2(a);
  let bValidType = isDate$2(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol$1(a);
  bValidType = isSymbol$1(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray$2(a);
  bValidType = isArray$2(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays$1(a, b) : false;
  }
  aValidType = isObject$2(a);
  bValidType = isObject$2(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual$1(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf$1(arr, val) {
  return arr.findIndex((item) => looseEqual$1(item, val));
}
const isRef$1 = (val) => {
  return !!(val && val["__v_isRef"] === true);
};
const toDisplayString$2 = (val) => {
  return isString$2(val) ? val : val == null ? "" : isArray$2(val) || isObject$2(val) && (val.toString === objectToString$2 || !isFunction$2(val.toString)) ? isRef$1(val) ? toDisplayString$2(val.value) : JSON.stringify(val, replacer$1, 2) : String(val);
};
const replacer$1 = (_key, val) => {
  if (isRef$1(val)) {
    return replacer$1(_key, val.value);
  } else if (isMap$1(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol$1(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet$1(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol$1(v))
    };
  } else if (isSymbol$1(val)) {
    return stringifySymbol$1(val);
  } else if (isObject$2(val) && !isArray$2(val) && !isPlainObject$2(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol$1 = (v, i = "") => {
  var _a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol$1(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
  );
};
function normalizeCssVarValue$1(value) {
  if (value == null) {
    return "initial";
  }
  if (typeof value === "string") {
    return value === "" ? " " : value;
  }
  if (typeof value !== "number" || !Number.isFinite(value)) {
    if (!!(process.env.NODE_ENV !== "production")) {
      console.warn(
        "[Vue warn] Invalid value used for CSS binding. Expected a string or a finite number but received:",
        value
      );
    }
  }
  return String(value);
}
function warn$2(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this._on = 0;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].resume();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].resume();
        }
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else if (!!(process.env.NODE_ENV !== "production")) {
      warn$2(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    if (++this._on === 1) {
      this.prevScope = activeEffectScope;
      activeEffectScope = this;
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      activeEffectScope = this.prevScope;
      this.prevScope = void 0;
    }
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn, failSilently = false) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else if (!!(process.env.NODE_ENV !== "production") && !failSilently) {
    warn$2(
      `onScopeDispose() is called when there is no active effect scope to be associated with.`
    );
  }
}
let activeSub;
const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this);
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      if (!!(process.env.NODE_ENV !== "production") && activeSub !== this) {
        warn$2(
          "Active effect was not restored correctly - this is likely a Vue internal bug."
        );
      }
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
let batchDepth = 0;
let batchedSub;
let batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed2) {
  if (computed2.flags & 4 && !(computed2.flags & 16)) {
    return;
  }
  computed2.flags &= -17;
  if (computed2.globalVersion === globalVersion) {
    return;
  }
  computed2.globalVersion = globalVersion;
  if (!computed2.isSSR && computed2.flags & 128 && (!computed2.deps && !computed2._dirty || !isDirty(computed2))) {
    return;
  }
  computed2.flags |= 2;
  const dep = computed2.dep;
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed2;
  shouldTrack = true;
  try {
    prepareDeps(computed2);
    const value = computed2.fn(computed2._value);
    if (dep.version === 0 || hasChanged$1(value, computed2._value)) {
      computed2.flags |= 128;
      computed2._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed2);
    computed2.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (!!(process.env.NODE_ENV !== "production") && dep.subsHead === link) {
    dep.subsHead = nextSub;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
function effect(fn, options) {
  if (fn.effect instanceof ReactiveEffect) {
    fn = fn.effect.fn;
  }
  const e = new ReactiveEffect(fn);
  if (options) {
    extend$1(e, options);
  }
  try {
    e.run();
  } catch (err) {
    e.stop();
    throw err;
  }
  const runner = e.run.bind(e);
  runner.effect = e;
  return runner;
}
function stop(runner) {
  runner.effect.stop();
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
let globalVersion = 0;
class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Dep {
  // TODO isolatedDeclarations "__v_skip"
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
    this.__v_skip = true;
    if (!!(process.env.NODE_ENV !== "production")) {
      this.subsHead = void 0;
    }
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    if (!!(process.env.NODE_ENV !== "production") && activeSub.onTrack) {
      activeSub.onTrack(
        extend$1(
          {
            effect: activeSub
          },
          debugInfo
        )
      );
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (!!(process.env.NODE_ENV !== "production")) {
        for (let head = this.subsHead; head; head = head.nextSub) {
          if (head.sub.onTrigger && !(head.sub.flags & 8)) {
            head.sub.onTrigger(
              extend$1(
                {
                  effect: head.sub
                },
                debugInfo
              )
            );
          }
        }
      }
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed2 = link.dep.computed;
    if (computed2 && !link.dep.subs) {
      computed2.flags |= 4 | 16;
      for (let l = computed2.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    if (!!(process.env.NODE_ENV !== "production") && link.dep.subsHead === void 0) {
      link.dep.subsHead = link;
    }
    link.dep.subs = link;
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = /* @__PURE__ */ Symbol(
  !!(process.env.NODE_ENV !== "production") ? "Object iterate" : ""
);
const MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  !!(process.env.NODE_ENV !== "production") ? "Map keys iterate" : ""
);
const ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  !!(process.env.NODE_ENV !== "production") ? "Array iterate" : ""
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    if (!!(process.env.NODE_ENV !== "production")) {
      dep.track({
        target,
        type,
        key
      });
    } else {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      if (!!(process.env.NODE_ENV !== "production")) {
        dep.trigger({
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        });
      } else {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray$2(target);
    const isArrayIndex = targetIsArray && isIntegerKey$1(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol$1(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap$1(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap$1(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap$1(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function getDepFromReactive(object, key) {
  const depMap = targetMap.get(object);
  return depMap && depMap.get(key);
}
function reactiveReadArray(array) {
  const raw = /* @__PURE__ */ toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return /* @__PURE__ */ isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
function toWrapped(target, item) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
  }
  return toReactive(item);
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray$2(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toWrapped(this, value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply$1(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply$1(
      this,
      "filter",
      fn,
      thisArg,
      (v) => v.map((item) => toWrapped(this, item)),
      arguments
    );
  },
  find(fn, thisArg) {
    return apply$1(
      this,
      "find",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findIndex(fn, thisArg) {
    return apply$1(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply$1(
      this,
      "findLast",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findLastIndex(fn, thisArg) {
    return apply$1(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply$1(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply$1(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply$1(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", (item) => toWrapped(this, item));
  }
};
function iterator(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !/* @__PURE__ */ isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (!result.done) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
const arrayProto = Array.prototype;
function apply$1(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  let wrappedFn = fn;
  if (arr !== self2) {
    if (!/* @__PURE__ */ isShallow(self2)) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
}
function searchProxy(self2, method, args) {
  const arr = /* @__PURE__ */ toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
    args[0] = /* @__PURE__ */ toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = (/* @__PURE__ */ toRaw(self2))[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap$1(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol$1)
);
function hasOwnProperty$2(key) {
  if (!isSymbol$1(key)) key = String(key);
  const obj = /* @__PURE__ */ toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$2(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty$2;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ isRef$2(target) ? target : receiver
    );
    if (isSymbol$1(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (/* @__PURE__ */ isRef$2(res)) {
      const value = targetIsArray && isIntegerKey$1(key) ? res : res.value;
      return isReadonly2 && isObject$2(value) ? /* @__PURE__ */ readonly(value) : value;
    }
    if (isObject$2(res)) {
      return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    const isArrayWithIntegerKey = isArray$2(target) && isIntegerKey$1(key);
    if (!this._isShallow) {
      const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
      if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
        oldValue = /* @__PURE__ */ toRaw(oldValue);
        value = /* @__PURE__ */ toRaw(value);
      }
      if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef$2(oldValue) && !/* @__PURE__ */ isRef$2(value)) {
        if (isOldValueReadonly) {
          if (!!(process.env.NODE_ENV !== "production")) {
            warn$2(
              `Set operation on key "${String(key)}" failed: target is readonly.`,
              target[key]
            );
          }
          return true;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn$2(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      /* @__PURE__ */ isRef$2(target) ? target : receiver
    );
    if (target === /* @__PURE__ */ toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged$1(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn$2(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol$1(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$2(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    if (!!(process.env.NODE_ENV !== "production")) {
      warn$2(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    if (!!(process.env.NODE_ENV !== "production")) {
      warn$2(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = /* @__PURE__ */ toRaw(target);
    const targetIsMap = isMap$1(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return extend$1(
      // inheriting all iterator properties
      Object.create(innerIterator),
      {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        }
      }
    );
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    if (!!(process.env.NODE_ENV !== "production")) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn$2(
        `${capitalize$2(type)} operation ${key}failed: target is readonly.`,
        /* @__PURE__ */ toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged$1(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
      return target.size;
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged$1(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend$1(
    instrumentations,
    readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
          value = /* @__PURE__ */ toRaw(value);
        }
        const target = /* @__PURE__ */ toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
          target.add(value);
          trigger(target, "add", value, value);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
          value = /* @__PURE__ */ toRaw(value);
        }
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        } else if (!!(process.env.NODE_ENV !== "production")) {
          checkIdentityKeys(target, has, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged$1(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
        return this;
      },
      delete(key) {
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        } else if (!!(process.env.NODE_ENV !== "production")) {
          checkIdentityKeys(target, has, key);
        }
        const oldValue = get ? get.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0, oldValue);
        }
        return result;
      },
      clear() {
        const target = /* @__PURE__ */ toRaw(this);
        const hadItems = target.size !== 0;
        const oldTarget = !!(process.env.NODE_ENV !== "production") ? isMap$1(target) ? new Map(target) : new Set(target) : void 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0,
            oldTarget
          );
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn$2(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has, key) {
  const rawKey = /* @__PURE__ */ toRaw(key);
  if (rawKey !== key && has.call(target, rawKey)) {
    const type = toRawType$1(target);
    warn$2(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType$1(value));
}
// @__NO_SIDE_EFFECTS__
function reactive(target) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
// @__NO_SIDE_EFFECTS__
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
// @__NO_SIDE_EFFECTS__
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
// @__NO_SIDE_EFFECTS__
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$2(target)) {
    if (!!(process.env.NODE_ENV !== "production")) {
      warn$2(
        `value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(
          target
        )}`
      );
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
// @__NO_SIDE_EFFECTS__
function isReactive(value) {
  if (/* @__PURE__ */ isReadonly(value)) {
    return /* @__PURE__ */ isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
// @__NO_SIDE_EFFECTS__
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
// @__NO_SIDE_EFFECTS__
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
// @__NO_SIDE_EFFECTS__
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
// @__NO_SIDE_EFFECTS__
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? /* @__PURE__ */ toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn$2(value, "__v_skip") && Object.isExtensible(value)) {
    def$1(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject$2(value) ? /* @__PURE__ */ reactive(value) : value;
const toReadonly = (value) => isObject$2(value) ? /* @__PURE__ */ readonly(value) : value;
// @__NO_SIDE_EFFECTS__
function isRef$2(r) {
  return r ? r["__v_isRef"] === true : false;
}
// @__NO_SIDE_EFFECTS__
function ref(value) {
  return createRef(value, false);
}
// @__NO_SIDE_EFFECTS__
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (/* @__PURE__ */ isRef$2(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : /* @__PURE__ */ toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    if (!!(process.env.NODE_ENV !== "production")) {
      this.dep.track({
        target: this,
        type: "get",
        key: "value"
      });
    } else {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly(newValue);
    newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
    if (hasChanged$1(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      if (!!(process.env.NODE_ENV !== "production")) {
        this.dep.trigger({
          target: this,
          type: "set",
          key: "value",
          newValue,
          oldValue
        });
      } else {
        this.dep.trigger();
      }
    }
  }
}
function triggerRef(ref2) {
  if (ref2.dep) {
    if (!!(process.env.NODE_ENV !== "production")) {
      ref2.dep.trigger({
        target: ref2,
        type: "set",
        key: "value",
        newValue: ref2._value
      });
    } else {
      ref2.dep.trigger();
    }
  }
}
function unref(ref2) {
  return /* @__PURE__ */ isRef$2(ref2) ? ref2.value : ref2;
}
function toValue(source) {
  return isFunction$2(source) ? source() : unref(source);
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (/* @__PURE__ */ isRef$2(oldValue) && !/* @__PURE__ */ isRef$2(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return /* @__PURE__ */ isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class CustomRefImpl {
  constructor(factory) {
    this["__v_isRef"] = true;
    this._value = void 0;
    const dep = this.dep = new Dep();
    const { get, set } = factory(dep.track.bind(dep), dep.trigger.bind(dep));
    this._get = get;
    this._set = set;
  }
  get value() {
    return this._value = this._get();
  }
  set value(newVal) {
    this._set(newVal);
  }
}
function customRef(factory) {
  return new CustomRefImpl(factory);
}
// @__NO_SIDE_EFFECTS__
function toRefs(object) {
  if (!!(process.env.NODE_ENV !== "production") && !/* @__PURE__ */ isProxy(object)) {
    warn$2(`toRefs() expects a reactive object but received a plain one.`);
  }
  const ret = isArray$2(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = propertyToRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this["__v_isRef"] = true;
    this._value = void 0;
    this._raw = /* @__PURE__ */ toRaw(_object);
    let shallow = true;
    let obj = _object;
    if (!isArray$2(_object) || !isIntegerKey$1(String(_key))) {
      do {
        shallow = !/* @__PURE__ */ isProxy(obj) || /* @__PURE__ */ isShallow(obj);
      } while (shallow && (obj = obj["__v_raw"]));
    }
    this._shallow = shallow;
  }
  get value() {
    let val = this._object[this._key];
    if (this._shallow) {
      val = unref(val);
    }
    return this._value = val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    if (this._shallow && /* @__PURE__ */ isRef$2(this._raw[this._key])) {
      const nestedRef = this._object[this._key];
      if (/* @__PURE__ */ isRef$2(nestedRef)) {
        nestedRef.value = newVal;
        return;
      }
    }
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(this._raw, this._key);
  }
}
class GetterRefImpl {
  constructor(_getter) {
    this._getter = _getter;
    this["__v_isRef"] = true;
    this["__v_isReadonly"] = true;
    this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function toRef(source, key, defaultValue) {
  if (/* @__PURE__ */ isRef$2(source)) {
    return source;
  } else if (isFunction$2(source)) {
    return new GetterRefImpl(source);
  } else if (isObject$2(source) && arguments.length > 1) {
    return propertyToRef(source, key, defaultValue);
  } else {
    return /* @__PURE__ */ ref(source);
  }
}
function propertyToRef(source, key, defaultValue) {
  return new ObjectRefImpl(source, key, defaultValue);
}
class ComputedRefImpl {
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = void 0;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = void 0;
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  /**
   * @internal
   */
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && // avoid infinite self recursion
    activeSub !== this) {
      batch(this, true);
      return true;
    } else if (!!(process.env.NODE_ENV !== "production")) ;
  }
  get value() {
    const link = !!(process.env.NODE_ENV !== "production") ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    } else if (!!(process.env.NODE_ENV !== "production")) {
      warn$2("Write operation failed: computed value is readonly");
    }
  }
}
// @__NO_SIDE_EFFECTS__
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction$2(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  if (!!(process.env.NODE_ENV !== "production") && debugOptions && !isSSR) {
    cRef.onTrack = debugOptions.onTrack;
    cRef.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const TrackOpTypes = {
  "GET": "get",
  "HAS": "has",
  "ITERATE": "iterate"
};
const TriggerOpTypes = {
  "SET": "set",
  "ADD": "add",
  "DELETE": "delete",
  "CLEAR": "clear"
};
const INITIAL_WATCHER_VALUE = {};
const cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher = void 0;
function getCurrentWatcher() {
  return activeWatcher;
}
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  } else if (!!(process.env.NODE_ENV !== "production") && !failSilently) {
    warn$2(
      `onWatcherCleanup() was called when there was no active watcher to associate with.`
    );
  }
}
function watch$1(source, cb, options = EMPTY_OBJ$1) {
  const { immediate, deep, once: once2, scheduler, augmentJob, call } = options;
  const warnInvalidSource = (s) => {
    (options.onWarn || warn$2)(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (/* @__PURE__ */ isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect2;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (/* @__PURE__ */ isRef$2(source)) {
    getter = () => source.value;
    forceTrigger = /* @__PURE__ */ isShallow(source);
  } else if (/* @__PURE__ */ isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$2(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => /* @__PURE__ */ isReactive(s) || /* @__PURE__ */ isShallow(s));
    getter = () => source.map((s) => {
      if (/* @__PURE__ */ isRef$2(s)) {
        return s.value;
      } else if (/* @__PURE__ */ isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction$2(s)) {
        return call ? call(s, 2) : s();
      } else {
        !!(process.env.NODE_ENV !== "production") && warnInvalidSource(s);
      }
    });
  } else if (isFunction$2(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP$1;
    !!(process.env.NODE_ENV !== "production") && warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect2.stop();
    if (scope && scope.active) {
      remove$1(scope.effects, effect2);
    }
  };
  if (once2 && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged$1(v, oldValue[i])) : hasChanged$1(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect2;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          oldValue = newValue;
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect2.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect2 = new ReactiveEffect(getter);
  effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
  cleanup = effect2.onStop = () => {
    const cleanups = cleanupMap.get(effect2);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect2);
    }
  };
  if (!!(process.env.NODE_ENV !== "production")) {
    effect2.onTrack = options.onTrack;
    effect2.onTrigger = options.onTrigger;
  }
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect2.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect2.run();
  }
  watchHandle.pause = effect2.pause.bind(effect2);
  watchHandle.resume = effect2.resume.bind(effect2);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject$2(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Map();
  if ((seen.get(value) || 0) >= depth) {
    return value;
  }
  seen.set(value, depth);
  depth--;
  if (/* @__PURE__ */ isRef$2(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray$2(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet$1(value) || isMap$1(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject$2(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}
const stack = [];
function pushWarningContext$1(vnode) {
  stack.push(vnode);
}
function popWarningContext$1() {
  stack.pop();
}
let isWarning = false;
function warn$1(msg, ...args) {
  if (isWarning) return;
  isWarning = true;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString$2(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (/* @__PURE__ */ isRef$2(value)) {
    value = formatProp(key, /* @__PURE__ */ toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction$2(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = /* @__PURE__ */ toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function assertNumber(val, type) {
  if (!!!(process.env.NODE_ENV !== "production")) return;
  if (val === void 0) {
    return;
  } else if (typeof val !== "number") {
    warn$1(`${type} is not a valid number - got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    warn$1(`${type} is NaN - the duration expression might be incorrect.`);
  }
}
const ErrorCodes = {
  "SETUP_FUNCTION": 0,
  "0": "SETUP_FUNCTION",
  "RENDER_FUNCTION": 1,
  "1": "RENDER_FUNCTION",
  "NATIVE_EVENT_HANDLER": 5,
  "5": "NATIVE_EVENT_HANDLER",
  "COMPONENT_EVENT_HANDLER": 6,
  "6": "COMPONENT_EVENT_HANDLER",
  "VNODE_HOOK": 7,
  "7": "VNODE_HOOK",
  "DIRECTIVE_HOOK": 8,
  "8": "DIRECTIVE_HOOK",
  "TRANSITION_HOOK": 9,
  "9": "TRANSITION_HOOK",
  "APP_ERROR_HANDLER": 10,
  "10": "APP_ERROR_HANDLER",
  "APP_WARN_HANDLER": 11,
  "11": "APP_WARN_HANDLER",
  "FUNCTION_REF": 12,
  "12": "FUNCTION_REF",
  "ASYNC_COMPONENT_LOADER": 13,
  "13": "ASYNC_COMPONENT_LOADER",
  "SCHEDULER": 14,
  "14": "SCHEDULER",
  "COMPONENT_UPDATE": 15,
  "15": "COMPONENT_UPDATE",
  "APP_UNMOUNT_CLEANUP": 16,
  "16": "APP_UNMOUNT_CLEANUP"
};
const ErrorTypeStrings$1 = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush",
  [15]: "component update",
  [16]: "app unmount cleanup function"
};
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$2(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise$2(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray$2(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  } else if (!!(process.env.NODE_ENV !== "production")) {
    warn$1(
      `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof fn}`
    );
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ$1;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = !!(process.env.NODE_ENV !== "production") ? ErrorTypeStrings$1[type] : `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (!!(process.env.NODE_ENV !== "production")) {
    const info = ErrorTypeStrings$1[type];
    if (contextVNode) {
      pushWarningContext$1(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext$1();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  } else if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}
const queue = [];
let flushIndex = -1;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (!lastJob || // fast path when the job id is larger than the tail
    !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$2(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
  if (!!(process.env.NODE_ENV !== "production")) {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      if (!!(process.env.NODE_ENV !== "production") && checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      cb();
      if (!(cb.flags & 4)) {
        cb.flags &= -2;
      }
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    if (!!(process.env.NODE_ENV !== "production")) {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (!!(process.env.NODE_ENV !== "production") && checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= -2;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
  if (!!(process.env.NODE_ENV !== "production")) {
    seen = seen || /* @__PURE__ */ new Map();
  }
  const check = !!(process.env.NODE_ENV !== "production") ? (job) => checkRecursiveUpdates(seen, job) : NOOP$1;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (!!(process.env.NODE_ENV !== "production") && check(job)) {
          continue;
        }
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(
          job,
          job.i,
          job.i ? 15 : 14
        );
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        job.flags &= -2;
      }
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs(seen);
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  const count = seen.get(fn) || 0;
  if (count > RECURSION_LIMIT) {
    const instance = fn.i;
    const componentName = instance && getComponentName(instance.type);
    handleError(
      `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    );
    return true;
  }
  seen.set(fn, count + 1);
  return false;
}
let isHmrUpdating = false;
const hmrDirtyComponents = /* @__PURE__ */ new Map();
if (!!(process.env.NODE_ENV !== "production")) {
  getGlobalThis$2().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
const map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);
  if (!record) {
    createRecord(id, instance.type);
    record = map.get(id);
  }
  record.instances.add(instance);
}
function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    if (!(instance.job.flags & 8)) {
      instance.update();
    }
    isHmrUpdating = false;
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record) return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (let i = 0; i < instances.length; i++) {
    const instance = instances[i];
    const oldComp = normalizeClassComponent(instance.type);
    let dirtyInstances = hmrDirtyComponents.get(oldComp);
    if (!dirtyInstances) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.set(oldComp, dirtyInstances = /* @__PURE__ */ new Set());
    }
    dirtyInstances.add(instance);
    instance.appContext.propsCache.delete(instance.type);
    instance.appContext.emitsCache.delete(instance.type);
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      dirtyInstances.add(instance);
      instance.ceReload(newComp.styles);
      dirtyInstances.delete(instance);
    } else if (instance.parent) {
      queueJob(() => {
        if (!(instance.job.flags & 8)) {
          isHmrUpdating = true;
          instance.parent.update();
          isHmrUpdating = false;
          dirtyInstances.delete(instance);
        }
      });
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn(
        "[HMR] Root or manually mounted instance modified. Full reload required."
      );
    }
    if (instance.root.ce && instance !== instance.root) {
      instance.root.ce._removeChildStyle(oldComp);
    }
  }
  queuePostFlushCb(() => {
    hmrDirtyComponents.clear();
  });
}
function updateComponentDef(oldComp, newComp) {
  extend$1(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn(
        `[HMR] Something went wrong during Vue component hot-reload. Full reload required.`
      );
    }
  };
}
let devtools$1;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$2(event, ...args) {
  if (devtools$1) {
    devtools$1.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook$1(hook, target) {
  var _a, _b;
  devtools$1 = hook;
  if (devtools$1) {
    devtools$1.enabled = true;
    buffer.forEach(({ event, args }) => devtools$1.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    // eslint-disable-next-line no-restricted-syntax
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook$1(newHook, target);
    });
    setTimeout(() => {
      if (!devtools$1) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$2("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
function devtoolsUnmountApp(app) {
  emit$2("app:unmount", app);
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools$1.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$2(
      hook,
      component.appContext.app,
      component.uid,
      component.parent ? component.parent.uid : void 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$2(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$2(
    "component:emit",
    component.appContext.app,
    component,
    event,
    params
  );
}
const DeprecationTypes$1 = {
  "GLOBAL_MOUNT": "GLOBAL_MOUNT",
  "GLOBAL_MOUNT_CONTAINER": "GLOBAL_MOUNT_CONTAINER",
  "GLOBAL_EXTEND": "GLOBAL_EXTEND",
  "GLOBAL_PROTOTYPE": "GLOBAL_PROTOTYPE",
  "GLOBAL_SET": "GLOBAL_SET",
  "GLOBAL_DELETE": "GLOBAL_DELETE",
  "GLOBAL_OBSERVABLE": "GLOBAL_OBSERVABLE",
  "GLOBAL_PRIVATE_UTIL": "GLOBAL_PRIVATE_UTIL",
  "CONFIG_SILENT": "CONFIG_SILENT",
  "CONFIG_DEVTOOLS": "CONFIG_DEVTOOLS",
  "CONFIG_KEY_CODES": "CONFIG_KEY_CODES",
  "CONFIG_PRODUCTION_TIP": "CONFIG_PRODUCTION_TIP",
  "CONFIG_IGNORED_ELEMENTS": "CONFIG_IGNORED_ELEMENTS",
  "CONFIG_WHITESPACE": "CONFIG_WHITESPACE",
  "CONFIG_OPTION_MERGE_STRATS": "CONFIG_OPTION_MERGE_STRATS",
  "INSTANCE_SET": "INSTANCE_SET",
  "INSTANCE_DELETE": "INSTANCE_DELETE",
  "INSTANCE_DESTROY": "INSTANCE_DESTROY",
  "INSTANCE_EVENT_EMITTER": "INSTANCE_EVENT_EMITTER",
  "INSTANCE_EVENT_HOOKS": "INSTANCE_EVENT_HOOKS",
  "INSTANCE_CHILDREN": "INSTANCE_CHILDREN",
  "INSTANCE_LISTENERS": "INSTANCE_LISTENERS",
  "INSTANCE_SCOPED_SLOTS": "INSTANCE_SCOPED_SLOTS",
  "INSTANCE_ATTRS_CLASS_STYLE": "INSTANCE_ATTRS_CLASS_STYLE",
  "OPTIONS_DATA_FN": "OPTIONS_DATA_FN",
  "OPTIONS_DATA_MERGE": "OPTIONS_DATA_MERGE",
  "OPTIONS_BEFORE_DESTROY": "OPTIONS_BEFORE_DESTROY",
  "OPTIONS_DESTROYED": "OPTIONS_DESTROYED",
  "WATCH_ARRAY": "WATCH_ARRAY",
  "PROPS_DEFAULT_THIS": "PROPS_DEFAULT_THIS",
  "V_ON_KEYCODE_MODIFIER": "V_ON_KEYCODE_MODIFIER",
  "CUSTOM_DIR": "CUSTOM_DIR",
  "ATTR_FALSE_VALUE": "ATTR_FALSE_VALUE",
  "ATTR_ENUMERATED_COERCION": "ATTR_ENUMERATED_COERCION",
  "TRANSITION_CLASSES": "TRANSITION_CLASSES",
  "TRANSITION_GROUP_ROOT": "TRANSITION_GROUP_ROOT",
  "COMPONENT_ASYNC": "COMPONENT_ASYNC",
  "COMPONENT_FUNCTIONAL": "COMPONENT_FUNCTIONAL",
  "COMPONENT_V_MODEL": "COMPONENT_V_MODEL",
  "RENDER_FUNCTION": "RENDER_FUNCTION",
  "FILTERS": "FILTERS",
  "PRIVATE_APIS": "PRIVATE_APIS"
};
const deprecationData = {
  ["GLOBAL_MOUNT"]: {
    message: `The global app bootstrapping API has changed: vm.$mount() and the "el" option have been removed. Use createApp(RootComponent).mount() instead.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/global-api.html#mounting-app-instance`
  },
  ["GLOBAL_MOUNT_CONTAINER"]: {
    message: `Vue detected directives on the mount container. In Vue 3, the container is no longer considered part of the template and will not be processed/replaced.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/mount-changes.html`
  },
  ["GLOBAL_EXTEND"]: {
    message: `Vue.extend() has been removed in Vue 3. Use defineComponent() instead.`,
    link: `https://vuejs.org/api/general.html#definecomponent`
  },
  ["GLOBAL_PROTOTYPE"]: {
    message: `Vue.prototype is no longer available in Vue 3. Use app.config.globalProperties instead.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/global-api.html#vue-prototype-replaced-by-config-globalproperties`
  },
  ["GLOBAL_SET"]: {
    message: `Vue.set() has been removed as it is no longer needed in Vue 3. Simply use native JavaScript mutations.`
  },
  ["GLOBAL_DELETE"]: {
    message: `Vue.delete() has been removed as it is no longer needed in Vue 3. Simply use native JavaScript mutations.`
  },
  ["GLOBAL_OBSERVABLE"]: {
    message: `Vue.observable() has been removed. Use \`import { reactive } from "vue"\` from Composition API instead.`,
    link: `https://vuejs.org/api/reactivity-core.html#reactive`
  },
  ["GLOBAL_PRIVATE_UTIL"]: {
    message: `Vue.util has been removed. Please refactor to avoid its usage since it was an internal API even in Vue 2.`
  },
  ["CONFIG_SILENT"]: {
    message: `config.silent has been removed because it is not good practice to intentionally suppress warnings. You can use your browser console's filter features to focus on relevant messages.`
  },
  ["CONFIG_DEVTOOLS"]: {
    message: `config.devtools has been removed. To enable devtools for production, configure the __VUE_PROD_DEVTOOLS__ compile-time flag.`,
    link: `https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags`
  },
  ["CONFIG_KEY_CODES"]: {
    message: `config.keyCodes has been removed. In Vue 3, you can directly use the kebab-case key names as v-on modifiers.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/keycode-modifiers.html`
  },
  ["CONFIG_PRODUCTION_TIP"]: {
    message: `config.productionTip has been removed.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/global-api.html#config-productiontip-removed`
  },
  ["CONFIG_IGNORED_ELEMENTS"]: {
    message: () => {
      let msg = `config.ignoredElements has been removed.`;
      if (isRuntimeOnly()) {
        msg += ` Pass the "isCustomElement" option to @vue/compiler-dom instead.`;
      } else {
        msg += ` Use config.isCustomElement instead.`;
      }
      return msg;
    },
    link: `https://v3-migration.vuejs.org/breaking-changes/global-api.html#config-ignoredelements-is-now-config-iscustomelement`
  },
  ["CONFIG_WHITESPACE"]: {
    // this warning is only relevant in the full build when using runtime
    // compilation, so it's put in the runtime compatConfig list.
    message: `Vue 3 compiler's whitespace option will default to "condense" instead of "preserve". To suppress this warning, provide an explicit value for \`config.compilerOptions.whitespace\`.`
  },
  ["CONFIG_OPTION_MERGE_STRATS"]: {
    message: `config.optionMergeStrategies no longer exposes internal strategies. Use custom merge functions instead.`
  },
  ["INSTANCE_SET"]: {
    message: `vm.$set() has been removed as it is no longer needed in Vue 3. Simply use native JavaScript mutations.`
  },
  ["INSTANCE_DELETE"]: {
    message: `vm.$delete() has been removed as it is no longer needed in Vue 3. Simply use native JavaScript mutations.`
  },
  ["INSTANCE_DESTROY"]: {
    message: `vm.$destroy() has been removed. Use app.unmount() instead.`,
    link: `https://vuejs.org/api/application.html#app-unmount`
  },
  ["INSTANCE_EVENT_EMITTER"]: {
    message: `vm.$on/$once/$off() have been removed. Use an external event emitter library instead.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/events-api.html`
  },
  ["INSTANCE_EVENT_HOOKS"]: {
    message: (event) => `"${event}" lifecycle events are no longer supported. From templates, use the "vue:" prefix instead of "hook:". For example, @${event} should be changed to @vue:${event.slice(5)}. From JavaScript, use Composition API to dynamically register lifecycle hooks.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/vnode-lifecycle-events.html`
  },
  ["INSTANCE_CHILDREN"]: {
    message: `vm.$children has been removed. Consider refactoring your logic to avoid relying on direct access to child components.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/children.html`
  },
  ["INSTANCE_LISTENERS"]: {
    message: `vm.$listeners has been removed. In Vue 3, parent v-on listeners are included in vm.$attrs and it is no longer necessary to separately use v-on="$listeners" if you are already using v-bind="$attrs". (Note: the Vue 3 behavior only applies if this compat config is disabled)`,
    link: `https://v3-migration.vuejs.org/breaking-changes/listeners-removed.html`
  },
  ["INSTANCE_SCOPED_SLOTS"]: {
    message: `vm.$scopedSlots has been removed. Use vm.$slots instead.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/slots-unification.html`
  },
  ["INSTANCE_ATTRS_CLASS_STYLE"]: {
    message: (componentName) => `Component <${componentName || "Anonymous"}> has \`inheritAttrs: false\` but is relying on class/style fallthrough from parent. In Vue 3, class/style are now included in $attrs and will no longer fallthrough when inheritAttrs is false. If you are already using v-bind="$attrs" on component root it should render the same end result. If you are binding $attrs to a non-root element and expecting class/style to fallthrough on root, you will need to now manually bind them on root via :class="$attrs.class".`,
    link: `https://v3-migration.vuejs.org/breaking-changes/attrs-includes-class-style.html`
  },
  ["OPTIONS_DATA_FN"]: {
    message: `The "data" option can no longer be a plain object. Always use a function.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/data-option.html`
  },
  ["OPTIONS_DATA_MERGE"]: {
    message: (key) => `Detected conflicting key "${key}" when merging data option values. In Vue 3, data keys are merged shallowly and will override one another.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/data-option.html#mixin-merge-behavior-change`
  },
  ["OPTIONS_BEFORE_DESTROY"]: {
    message: `\`beforeDestroy\` has been renamed to \`beforeUnmount\`.`
  },
  ["OPTIONS_DESTROYED"]: {
    message: `\`destroyed\` has been renamed to \`unmounted\`.`
  },
  ["WATCH_ARRAY"]: {
    message: `"watch" option or vm.$watch on an array value will no longer trigger on array mutation unless the "deep" option is specified. If current usage is intended, you can disable the compat behavior and suppress this warning with:

  configureCompat({ ${"WATCH_ARRAY"}: false })
`,
    link: `https://v3-migration.vuejs.org/breaking-changes/watch.html`
  },
  ["PROPS_DEFAULT_THIS"]: {
    message: (key) => `props default value function no longer has access to "this". The compat build only offers access to this.$options.(found in prop "${key}")`,
    link: `https://v3-migration.vuejs.org/breaking-changes/props-default-this.html`
  },
  ["CUSTOM_DIR"]: {
    message: (legacyHook, newHook) => `Custom directive hook "${legacyHook}" has been removed. Use "${newHook}" instead.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/custom-directives.html`
  },
  ["V_ON_KEYCODE_MODIFIER"]: {
    message: `Using keyCode as v-on modifier is no longer supported. Use kebab-case key name modifiers instead.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/keycode-modifiers.html`
  },
  ["ATTR_FALSE_VALUE"]: {
    message: (name) => `Attribute "${name}" with v-bind value \`false\` will render ${name}="false" instead of removing it in Vue 3. To remove the attribute, use \`null\` or \`undefined\` instead. If the usage is intended, you can disable the compat behavior and suppress this warning with:

  configureCompat({ ${"ATTR_FALSE_VALUE"}: false })
`,
    link: `https://v3-migration.vuejs.org/breaking-changes/attribute-coercion.html`
  },
  ["ATTR_ENUMERATED_COERCION"]: {
    message: (name, value, coerced) => `Enumerated attribute "${name}" with v-bind value \`${value}\` will ${value === null ? `be removed` : `render the value as-is`} instead of coercing the value to "${coerced}" in Vue 3. Always use explicit "true" or "false" values for enumerated attributes. If the usage is intended, you can disable the compat behavior and suppress this warning with:

  configureCompat({ ${"ATTR_ENUMERATED_COERCION"}: false })
`,
    link: `https://v3-migration.vuejs.org/breaking-changes/attribute-coercion.html`
  },
  ["TRANSITION_CLASSES"]: {
    message: ``
    // this feature cannot be runtime-detected
  },
  ["TRANSITION_GROUP_ROOT"]: {
    message: `<TransitionGroup> no longer renders a root <span> element by default if no "tag" prop is specified. If you do not rely on the span for styling, you can disable the compat behavior and suppress this warning with:

  configureCompat({ ${"TRANSITION_GROUP_ROOT"}: false })
`,
    link: `https://v3-migration.vuejs.org/breaking-changes/transition-group.html`
  },
  ["COMPONENT_ASYNC"]: {
    message: (comp) => {
      const name = getComponentName(comp);
      return `Async component${name ? ` <${name}>` : `s`} should be explicitly created via \`defineAsyncComponent()\` in Vue 3. Plain functions will be treated as functional components in non-compat build. If you have already migrated all async component usage and intend to use plain functions for functional components, you can disable the compat behavior and suppress this warning with:

  configureCompat({ ${"COMPONENT_ASYNC"}: false })
`;
    },
    link: `https://v3-migration.vuejs.org/breaking-changes/async-components.html`
  },
  ["COMPONENT_FUNCTIONAL"]: {
    message: (comp) => {
      const name = getComponentName(comp);
      return `Functional component${name ? ` <${name}>` : `s`} should be defined as a plain function in Vue 3. The "functional" option has been removed. NOTE: Before migrating to use plain functions for functional components, first make sure that all async components usage have been migrated and its compat behavior has been disabled.`;
    },
    link: `https://v3-migration.vuejs.org/breaking-changes/functional-components.html`
  },
  ["COMPONENT_V_MODEL"]: {
    message: (comp) => {
      const configMsg = `opt-in to Vue 3 behavior on a per-component basis with \`compatConfig: { ${"COMPONENT_V_MODEL"}: false }\`.`;
      if (comp.props && (isArray$2(comp.props) ? comp.props.includes("modelValue") : hasOwn$2(comp.props, "modelValue"))) {
        return `Component declares "modelValue" prop, which is Vue 3 usage, but is running under Vue 2 compat v-model behavior. You can ${configMsg}`;
      }
      return `v-model usage on component has changed in Vue 3. Component that expects to work with v-model should now use the "modelValue" prop and emit the "update:modelValue" event. You can update the usage and then ${configMsg}`;
    },
    link: `https://v3-migration.vuejs.org/breaking-changes/v-model.html`
  },
  ["RENDER_FUNCTION"]: {
    message: `Vue 3's render function API has changed. You can opt-in to the new API with:

  configureCompat({ ${"RENDER_FUNCTION"}: false })

  (This can also be done per-component via the "compatConfig" option.)`,
    link: `https://v3-migration.vuejs.org/breaking-changes/render-function-api.html`
  },
  ["FILTERS"]: {
    message: `filters have been removed in Vue 3. The "|" symbol will be treated as native JavaScript bitwise OR operator. Use method calls or computed properties instead.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/filters.html`
  },
  ["PRIVATE_APIS"]: {
    message: (name) => `"${name}" is a Vue 2 private API that no longer exists in Vue 3. If you are seeing this warning only due to a dependency, you can suppress this warning via { PRIVATE_APIS: 'suppress-warning' }.`
  }
};
const instanceWarned = /* @__PURE__ */ Object.create(null);
const warnCount = /* @__PURE__ */ Object.create(null);
function warnDeprecation(key, instance, ...args) {
  if (!!!(process.env.NODE_ENV !== "production")) {
    return;
  }
  instance = instance || getCurrentInstance$1();
  const config = getCompatConfigForKey(key, instance);
  if (config === "suppress-warning") {
    return;
  }
  const dupKey = key + args.join("");
  let compId = instance && formatComponentName(instance, instance.type);
  if (compId === "Anonymous" && instance) {
    compId = instance.uid;
  }
  const componentDupKey = dupKey + compId;
  if (componentDupKey in instanceWarned) {
    return;
  }
  instanceWarned[componentDupKey] = true;
  if (dupKey in warnCount) {
    warn$1(`(deprecation ${key}) (${++warnCount[dupKey] + 1})`);
    return;
  }
  warnCount[dupKey] = 0;
  const { message, link } = deprecationData[key];
  warn$1(
    `(deprecation ${key}) ${typeof message === "function" ? message(...args) : message}${link ? `
  Details: ${link}` : ``}`
  );
  if (!isCompatEnabled(key, instance, true)) {
    console.error(
      `^ The above deprecation's compat behavior is disabled and will likely lead to runtime errors.`
    );
  }
}
const globalCompatConfig = {
  MODE: 2
};
function configureCompat$1(config) {
  if (!!(process.env.NODE_ENV !== "production")) {
    validateCompatConfig(config);
  }
  extend$1(globalCompatConfig, config);
}
const seenConfigObjects = /* @__PURE__ */ new WeakSet();
const warnedInvalidKeys = {};
function validateCompatConfig(config, instance) {
  if (seenConfigObjects.has(config)) {
    return;
  }
  seenConfigObjects.add(config);
  for (const key of Object.keys(config)) {
    if (key !== "MODE" && !(key in deprecationData) && !(key in warnedInvalidKeys)) {
      if (key.startsWith("COMPILER_")) {
        if (isRuntimeOnly()) {
          warn$1(
            `Deprecation config "${key}" is compiler-specific and you are running a runtime-only build of Vue. This deprecation should be configured via compiler options in your build setup instead.
Details: https://v3-migration.vuejs.org/breaking-changes/migration-build.html`
          );
        }
      } else {
        warn$1(`Invalid deprecation config "${key}".`);
      }
      warnedInvalidKeys[key] = true;
    }
  }
}
function getCompatConfigForKey(key, instance) {
  const instanceConfig = instance && instance.type.compatConfig;
  if (instanceConfig && key in instanceConfig) {
    return instanceConfig[key];
  }
  return globalCompatConfig[key];
}
function isCompatEnabled(key, instance, enableForBuiltIn = false) {
  if (!enableForBuiltIn && instance && instance.type.__isBuiltIn) {
    return false;
  }
  const rawMode = getCompatConfigForKey("MODE", instance) || 2;
  const val = getCompatConfigForKey(key, instance);
  const mode = isFunction$2(rawMode) ? rawMode(instance && instance.type) : rawMode;
  if (mode === 2) {
    return val !== false;
  } else {
    return val === true || val === "suppress-warning";
  }
}
function assertCompatEnabled(key, instance, ...args) {
  if (!isCompatEnabled(key, instance)) {
    throw new Error(`${key} compat has been disabled.`);
  } else if (!!(process.env.NODE_ENV !== "production")) {
    warnDeprecation(key, instance, ...args);
  }
}
function softAssertCompatEnabled(key, instance, ...args) {
  if (!!(process.env.NODE_ENV !== "production")) {
    warnDeprecation(key, instance, ...args);
  }
  return isCompatEnabled(key, instance);
}
function checkCompatEnabled(key, instance, ...args) {
  const enabled = isCompatEnabled(key, instance);
  if (!!(process.env.NODE_ENV !== "production") && enabled) {
    warnDeprecation(key, instance, ...args);
  }
  return enabled;
}
const eventRegistryMap = /* @__PURE__ */ new WeakMap();
function getRegistry(instance) {
  let events = eventRegistryMap.get(instance);
  if (!events) {
    eventRegistryMap.set(instance, events = /* @__PURE__ */ Object.create(null));
  }
  return events;
}
function on(instance, event, fn) {
  if (isArray$2(event)) {
    event.forEach((e) => on(instance, e, fn));
  } else {
    if (event.startsWith("hook:")) {
      assertCompatEnabled(
        "INSTANCE_EVENT_HOOKS",
        instance,
        event
      );
    } else {
      assertCompatEnabled("INSTANCE_EVENT_EMITTER", instance);
    }
    const events = getRegistry(instance);
    (events[event] || (events[event] = [])).push(fn);
  }
  return instance.proxy;
}
function once(instance, event, fn) {
  const wrapped = (...args) => {
    off(instance, event, wrapped);
    fn.apply(instance.proxy, args);
  };
  wrapped.fn = fn;
  on(instance, event, wrapped);
  return instance.proxy;
}
function off(instance, event, fn) {
  assertCompatEnabled("INSTANCE_EVENT_EMITTER", instance);
  const vm = instance.proxy;
  if (!event) {
    eventRegistryMap.set(instance, /* @__PURE__ */ Object.create(null));
    return vm;
  }
  if (isArray$2(event)) {
    event.forEach((e) => off(instance, e, fn));
    return vm;
  }
  const events = getRegistry(instance);
  const cbs = events[event];
  if (!cbs) {
    return vm;
  }
  if (!fn) {
    events[event] = void 0;
    return vm;
  }
  events[event] = cbs.filter((cb) => !(cb === fn || cb.fn === fn));
  return vm;
}
function emit$1(instance, event, args) {
  const cbs = getRegistry(instance)[event];
  if (cbs) {
    callWithAsyncErrorHandling(
      cbs.map((cb) => cb.bind(instance.proxy)),
      instance,
      6,
      args
    );
  }
  return instance.proxy;
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance$1(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  if (!currentScopeId) {
    currentScopeId = instance && instance.type._scopeId || null;
  }
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
const withScopeId = (_id) => withCtx;
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance$1(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance$1(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    if (!!(process.env.NODE_ENV !== "production") || false) {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  if (isNonScopedSlot) {
    renderFnWithContext._ns = true;
  }
  return renderFnWithContext;
}
const legacyDirectiveHookMap = {
  beforeMount: "bind",
  mounted: "inserted",
  updated: ["update", "componentUpdated"],
  unmounted: "unbind"
};
function mapCompatDirectiveHook(name, dir, instance) {
  const mappedName = legacyDirectiveHookMap[name];
  if (mappedName) {
    if (isArray$2(mappedName)) {
      const hook = [];
      mappedName.forEach((mapped) => {
        const mappedHook = dir[mapped];
        if (mappedHook) {
          softAssertCompatEnabled(
            "CUSTOM_DIR",
            instance,
            mapped,
            name
          );
          hook.push(mappedHook);
        }
      });
      return hook.length ? hook : void 0;
    } else {
      if (dir[mappedName]) {
        softAssertCompatEnabled(
          "CUSTOM_DIR",
          instance,
          mappedName,
          name
        );
      }
      return dir[mappedName];
    }
  }
}
function validateDirectiveName(name) {
  if (isBuiltInDirective$1(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function withDirectives(vnode, directives) {
  if (currentRenderingInstance === null) {
    !!(process.env.NODE_ENV !== "production") && warn$1(`withDirectives can only be used inside render functions.`);
    return vnode;
  }
  const instance = getComponentPublicInstance(currentRenderingInstance);
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ$1] = directives[i];
    if (dir) {
      if (isFunction$2(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (!hook) {
      hook = mapCompatDirectiveHook(name, binding.dir, instance);
    }
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function provide(key, value) {
  if (!!(process.env.NODE_ENV !== "production")) {
    if (!currentInstance || currentInstance.isMounted) {
      warn$1(`provide() can only be used inside setup().`);
    }
  }
  if (currentInstance) {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = getCurrentInstance$1();
  if (instance || currentApp) {
    let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$2(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else if (!!(process.env.NODE_ENV !== "production")) {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else if (!!(process.env.NODE_ENV !== "production")) {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
function hasInjectionContext() {
  return !!(getCurrentInstance$1() || currentApp);
}
const ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    if (!ctx) {
      !!(process.env.NODE_ENV !== "production") && warn$1(
        `Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`
      );
    }
    return ctx;
  }
};
function watchEffect(effect2, options) {
  return doWatch(effect2, null, options);
}
function watchPostEffect(effect2, options) {
  return doWatch(
    effect2,
    null,
    !!(process.env.NODE_ENV !== "production") ? extend$1({}, options, { flush: "post" }) : { flush: "post" }
  );
}
function watchSyncEffect(effect2, options) {
  return doWatch(
    effect2,
    null,
    !!(process.env.NODE_ENV !== "production") ? extend$1({}, options, { flush: "sync" }) : { flush: "sync" }
  );
}
function watch(source, cb, options) {
  if (!!(process.env.NODE_ENV !== "production") && !isFunction$2(cb)) {
    warn$1(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ$1) {
  const { immediate, deep, flush, once: once2 } = options;
  if (!!(process.env.NODE_ENV !== "production") && !cb) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once2 !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const baseWatchOptions = extend$1({}, options);
  if (!!(process.env.NODE_ENV !== "production")) baseWatchOptions.onWarn = warn$1;
  const runsImmediately = cb && immediate || !cb && flush !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {
      };
      watchStopHandle.stop = NOOP$1;
      watchStopHandle.resume = NOOP$1;
      watchStopHandle.pause = NOOP$1;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush === "post") {
    baseWatchOptions.scheduler = (job) => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch$1(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(watchHandle);
    } else if (runsImmediately) {
      watchHandle();
    }
  }
  return watchHandle;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$2(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$2(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
const TeleportEndKey = /* @__PURE__ */ Symbol("_vte");
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
const isTeleportDeferred = (props) => props && (props.defer || props.defer === "");
const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
const isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
const resolveTarget = (props, select) => {
  const targetSelector = props && props.to;
  if (isString$2(targetSelector)) {
    if (!select) {
      !!(process.env.NODE_ENV !== "production") && warn$1(
        `Current renderer does not support string target for Teleports. (missing querySelector renderer option)`
      );
      return null;
    } else {
      const target = select(targetSelector);
      if (!!(process.env.NODE_ENV !== "production") && !target && !isTeleportDisabled(props)) {
        warn$1(
          `Failed to locate Teleport target with selector "${targetSelector}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`
        );
      }
      return target;
    }
  } else {
    if (!!(process.env.NODE_ENV !== "production") && !targetSelector && !isTeleportDisabled(props)) {
      warn$1(`Invalid Teleport target: ${targetSelector}`);
    }
    return targetSelector;
  }
};
const TeleportImpl = {
  name: "Teleport",
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: { insert, querySelector, createText, createComment }
    } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if (!!(process.env.NODE_ENV !== "production") && isHmrUpdating) {
      optimized = false;
      dynamicChildren = null;
    }
    if (n1 == null) {
      const placeholder = n2.el = !!(process.env.NODE_ENV !== "production") ? createComment("teleport start") : createText("");
      const mainAnchor = n2.anchor = !!(process.env.NODE_ENV !== "production") ? createComment("teleport end") : createText("");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(
            children,
            container2,
            anchor2,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      };
      const mountToTarget = () => {
        const target = n2.target = resolveTarget(n2.props, querySelector);
        const targetAnchor = prepareAnchor(target, n2, createText, insert);
        if (target) {
          if (namespace !== "svg" && isTargetSVG(target)) {
            namespace = "svg";
          } else if (namespace !== "mathml" && isTargetMathML(target)) {
            namespace = "mathml";
          }
          if (parentComponent && parentComponent.isCE) {
            (parentComponent.ce._teleportTargets || (parentComponent.ce._teleportTargets = /* @__PURE__ */ new Set())).add(target);
          }
          if (!disabled) {
            mount(target, targetAnchor);
            updateCssVars(n2, false);
          }
        } else if (!!(process.env.NODE_ENV !== "production") && !disabled) {
          warn$1(
            "Invalid Teleport target on mount:",
            target,
            `(${typeof target})`
          );
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
        updateCssVars(n2, true);
      }
      if (isTeleportDeferred(n2.props)) {
        n2.el.__isMounted = false;
        queuePostRenderEffect(() => {
          mountToTarget();
          delete n2.el.__isMounted;
        }, parentSuspense);
      } else {
        mountToTarget();
      }
    } else {
      if (isTeleportDeferred(n2.props) && n1.el.__isMounted === false) {
        queuePostRenderEffect(() => {
          TeleportImpl.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        }, parentSuspense);
        return;
      }
      n2.el = n1.el;
      n2.targetStart = n1.targetStart;
      const mainAnchor = n2.anchor = n1.anchor;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      if (namespace === "svg" || isTargetSVG(target)) {
        namespace = "svg";
      } else if (namespace === "mathml" || isTargetMathML(target)) {
        namespace = "mathml";
      }
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          currentContainer,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        traverseStaticChildren(n1, n2, !!!(process.env.NODE_ENV !== "production"));
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          currentContainer,
          currentAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          false
        );
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(
            n2,
            container,
            mainAnchor,
            internals,
            1
          );
        } else {
          if (n2.props && n1.props && n2.props.to !== n1.props.to) {
            n2.props.to = n1.props.to;
          }
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(
            n2.props,
            querySelector
          );
          if (nextTarget) {
            moveTeleport(
              n2,
              nextTarget,
              null,
              internals,
              0
            );
          } else if (!!(process.env.NODE_ENV !== "production")) {
            warn$1(
              "Invalid Teleport target on update:",
              target,
              `(${typeof target})`
            );
          }
        } else if (wasDisabled) {
          moveTeleport(
            n2,
            target,
            targetAnchor,
            internals,
            1
          );
        }
      }
      updateCssVars(n2, disabled);
    }
  },
  remove(vnode, parentComponent, parentSuspense, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const {
      shapeFlag,
      children,
      anchor,
      targetStart,
      targetAnchor,
      target,
      props
    } = vnode;
    if (target) {
      hostRemove(targetStart);
      hostRemove(targetAnchor);
    }
    doRemove && hostRemove(anchor);
    if (shapeFlag & 16) {
      const shouldRemove = doRemove || !isTeleportDisabled(props);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        unmount(
          child,
          parentComponent,
          parentSuspense,
          shouldRemove,
          !!child.dynamicChildren
        );
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props)) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(
          children[i],
          container,
          parentAnchor,
          2
        );
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
  o: { nextSibling, parentNode, querySelector, insert, createText }
}, hydrateChildren) {
  function hydrateDisabledTeleport(node2, vnode2, targetStart, targetAnchor) {
    vnode2.anchor = hydrateChildren(
      nextSibling(node2),
      vnode2,
      parentNode(node2),
      parentComponent,
      parentSuspense,
      slotScopeIds,
      optimized
    );
    vnode2.targetStart = targetStart;
    vnode2.targetAnchor = targetAnchor;
  }
  const target = vnode.target = resolveTarget(
    vnode.props,
    querySelector
  );
  const disabled = isTeleportDisabled(vnode.props);
  if (target) {
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (disabled) {
        hydrateDisabledTeleport(
          node,
          vnode,
          targetNode,
          targetNode && nextSibling(targetNode)
        );
      } else {
        vnode.anchor = nextSibling(node);
        let targetAnchor = targetNode;
        while (targetAnchor) {
          if (targetAnchor && targetAnchor.nodeType === 8) {
            if (targetAnchor.data === "teleport start anchor") {
              vnode.targetStart = targetAnchor;
            } else if (targetAnchor.data === "teleport anchor") {
              vnode.targetAnchor = targetAnchor;
              target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
              break;
            }
          }
          targetAnchor = nextSibling(targetAnchor);
        }
        if (!vnode.targetAnchor) {
          prepareAnchor(target, vnode, createText, insert);
        }
        hydrateChildren(
          targetNode && nextSibling(targetNode),
          vnode,
          target,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      }
    }
    updateCssVars(vnode, disabled);
  } else if (disabled) {
    if (vnode.shapeFlag & 16) {
      hydrateDisabledTeleport(node, vnode, node, nextSibling(node));
    }
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
function updateCssVars(vnode, isDisabled) {
  const ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    let node, anchor;
    if (isDisabled) {
      node = vnode.el;
      anchor = vnode.anchor;
    } else {
      node = vnode.targetStart;
      anchor = vnode.targetAnchor;
    }
    while (node && node !== anchor) {
      if (node.nodeType === 1) node.setAttribute("data-v-owner", ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}
function prepareAnchor(target, vnode, createText, insert) {
  const targetStart = vnode.targetStart = createText("");
  const targetAnchor = vnode.targetAnchor = createText("");
  targetStart[TeleportEndKey] = targetAnchor;
  if (target) {
    insert(targetStart, target);
    insert(targetAnchor, target);
  }
  return targetAnchor;
}
const leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
const enterCbKey$1 = /* @__PURE__ */ Symbol("_enterCb");
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  // leave
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  // appear
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
const recursiveGetSubtree = (instance) => {
  const subTree = instance.subTree;
  return subTree.component ? recursiveGetSubtree(subTree.component) : subTree;
};
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props, { slots }) {
    const instance = getCurrentInstance$1();
    const state = useTransitionState();
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      const child = findNonCommentChild(children);
      const rawProps = /* @__PURE__ */ toRaw(props);
      const { mode } = rawProps;
      if (!!(process.env.NODE_ENV !== "production") && mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
        warn$1(`invalid <transition> mode: ${mode}`);
      }
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getInnerChild$1(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      let enterHooks = resolveTransitionHooks(
        innerChild,
        rawProps,
        state,
        instance,
        // #11061, ensure enterHooks is fresh after clone
        (hooks) => enterHooks = hooks
      );
      if (innerChild.type !== Comment) {
        setTransitionHooks(innerChild, enterHooks);
      }
      let oldInnerChild = instance.subTree && getInnerChild$1(instance.subTree);
      if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(oldInnerChild, innerChild) && recursiveGetSubtree(instance).type !== Comment) {
        let leavingHooks = resolveTransitionHooks(
          oldInnerChild,
          rawProps,
          state,
          instance
        );
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in" && innerChild.type !== Comment) {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (!(instance.job.flags & 8)) {
              instance.update();
            }
            delete leavingHooks.afterLeave;
            oldInnerChild = void 0;
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(
              state,
              oldInnerChild
            );
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el[leaveCbKey] = () => {
              earlyRemove();
              el[leaveCbKey] = void 0;
              delete enterHooks.delayedLeave;
              oldInnerChild = void 0;
            };
            enterHooks.delayedLeave = () => {
              delayedLeave();
              delete enterHooks.delayedLeave;
              oldInnerChild = void 0;
            };
          };
        } else {
          oldInnerChild = void 0;
        }
      } else if (oldInnerChild) {
        oldInnerChild = void 0;
      }
      return child;
    };
  }
};
{
  BaseTransitionImpl.__isBuiltIn = true;
}
function findNonCommentChild(children) {
  let child = children[0];
  if (children.length > 1) {
    let hasFound = false;
    for (const c of children) {
      if (c.type !== Comment) {
        if (!!(process.env.NODE_ENV !== "production") && hasFound) {
          warn$1(
            "<transition> can only be used on a single element or component. Use <transition-group> for lists."
          );
          break;
        }
        child = c;
        hasFound = true;
        if (!!!(process.env.NODE_ENV !== "production")) break;
      }
    }
  }
  return child;
}
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance, postClone) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(
      hook,
      instance,
      9,
      args
    );
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray$2(hook)) {
      if (hook.every((hook2) => hook2.length <= 1)) done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el[leaveCbKey]) {
        el[leaveCbKey](
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
        leavingVNode.el[leaveCbKey]();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el[enterCbKey$1] = (cancelled) => {
        if (called) return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el[enterCbKey$1] = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el[enterCbKey$1]) {
        el[enterCbKey$1](
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el[leaveCbKey] = (cancelled) => {
        if (called) return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el[leaveCbKey] = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      const hooks2 = resolveTransitionHooks(
        vnode2,
        props,
        state,
        instance,
        postClone
      );
      if (postClone) postClone(hooks2);
      return hooks2;
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getInnerChild$1(vnode) {
  if (!isKeepAlive(vnode)) {
    if (isTeleport(vnode.type) && vnode.children) {
      return findNonCommentChild(vnode.children);
    }
    return vnode;
  }
  if (vnode.component) {
    return vnode.component.subTree;
  }
  const { shapeFlag, children } = vnode;
  if (children) {
    if (shapeFlag & 16) {
      return children[0];
    }
    if (shapeFlag & 32 && isFunction$2(children.default)) {
      return children.default();
    }
  }
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128) keyedFragmentCount++;
      ret = ret.concat(
        getTransitionRawChildren(child.children, keepComment, key)
      );
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction$2(options) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend$1({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
function useId() {
  const i = getCurrentInstance$1();
  if (i) {
    return (i.appContext.config.idPrefix || "v") + "-" + i.ids[0] + i.ids[1]++;
  } else if (!!(process.env.NODE_ENV !== "production")) {
    warn$1(
      `useId() is called when there is no active component instance to be associated with.`
    );
  }
  return "";
}
function markAsyncBoundary(instance) {
  instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
}
const knownTemplateRefs = /* @__PURE__ */ new WeakSet();
function useTemplateRef(key) {
  const i = getCurrentInstance$1();
  const r = /* @__PURE__ */ shallowRef(null);
  if (i) {
    const refs = i.refs === EMPTY_OBJ$1 ? i.refs = {} : i.refs;
    let desc;
    if (!!(process.env.NODE_ENV !== "production") && (desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable) {
      warn$1(`useTemplateRef('${key}') already exists.`);
    } else {
      Object.defineProperty(refs, key, {
        enumerable: true,
        get: () => r.value,
        set: (val) => r.value = val
      });
    }
  } else if (!!(process.env.NODE_ENV !== "production")) {
    warn$1(
      `useTemplateRef() is called when there is no active component instance to be associated with.`
    );
  }
  const ret = !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ readonly(r) : r;
  if (!!(process.env.NODE_ENV !== "production")) {
    knownTemplateRefs.add(ret);
  }
  return ret;
}
const pendingSetRefMap = /* @__PURE__ */ new WeakMap();
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$2(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray$2(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
      setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    }
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  if (!!(process.env.NODE_ENV !== "production") && !owner) {
    warn$1(
      `Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`
    );
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ$1 ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  const rawSetupState = /* @__PURE__ */ toRaw(setupState);
  const canSetSetupRef = setupState === EMPTY_OBJ$1 ? NO$1 : (key) => {
    if (!!(process.env.NODE_ENV !== "production")) {
      if (hasOwn$2(rawSetupState, key) && !/* @__PURE__ */ isRef$2(rawSetupState[key])) {
        warn$1(
          `Template ref "${key}" used on a non-ref value. It will not work in the production build.`
        );
      }
      if (knownTemplateRefs.has(rawSetupState[key])) {
        return false;
      }
    }
    return hasOwn$2(rawSetupState, key);
  };
  const canSetRef = (ref22) => {
    return !!!(process.env.NODE_ENV !== "production") || !knownTemplateRefs.has(ref22);
  };
  if (oldRef != null && oldRef !== ref2) {
    invalidatePendingSetRef(oldRawRef);
    if (isString$2(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (/* @__PURE__ */ isRef$2(oldRef)) {
      if (canSetRef(oldRef)) {
        oldRef.value = null;
      }
      const oldRawRefAtom = oldRawRef;
      if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
    }
  }
  if (isFunction$2(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString$2(ref2);
    const _isRef = /* @__PURE__ */ isRef$2(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? canSetSetupRef(ref2) ? setupState[ref2] : refs[ref2] : canSetRef(ref2) || !rawRef.k ? ref2.value : refs[rawRef.k];
          if (isUnmount) {
            isArray$2(existing) && remove$1(existing, refValue);
          } else {
            if (!isArray$2(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (canSetSetupRef(ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                const newVal = [refValue];
                if (canSetRef(ref2)) {
                  ref2.value = newVal;
                }
                if (rawRef.k) refs[rawRef.k] = newVal;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (canSetSetupRef(ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          if (canSetRef(ref2)) {
            ref2.value = value;
          }
          if (rawRef.k) refs[rawRef.k] = value;
        } else if (!!(process.env.NODE_ENV !== "production")) {
          warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
        }
      };
      if (value) {
        const job = () => {
          doSet();
          pendingSetRefMap.delete(rawRef);
        };
        job.id = -1;
        pendingSetRefMap.set(rawRef, job);
        queuePostRenderEffect(job, parentSuspense);
      } else {
        invalidatePendingSetRef(rawRef);
        doSet();
      }
    } else if (!!(process.env.NODE_ENV !== "production")) {
      warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
    }
  }
}
function invalidatePendingSetRef(rawRef) {
  const pendingSetRef = pendingSetRefMap.get(rawRef);
  if (pendingSetRef) {
    pendingSetRef.flags |= 8;
    pendingSetRefMap.delete(rawRef);
  }
}
let hasLoggedMismatchError = false;
const logMismatchError = () => {
  if (hasLoggedMismatchError) {
    return;
  }
  console.error("Hydration completed but contains mismatches.");
  hasLoggedMismatchError = true;
};
const isSVGContainer = (container) => container.namespaceURI.includes("svg") && container.tagName !== "foreignObject";
const isMathMLContainer = (container) => container.namespaceURI.includes("MathML");
const getContainerType = (container) => {
  if (container.nodeType !== 1) return void 0;
  if (isSVGContainer(container)) return "svg";
  if (isMathMLContainer(container)) return "mathml";
  return void 0;
};
const isComment$1 = (node) => node.nodeType === 8;
function createHydrationFunctions(rendererInternals) {
  const {
    mt: mountComponent,
    p: patch,
    o: {
      patchProp: patchProp2,
      createText,
      nextSibling,
      parentNode,
      remove: remove2,
      insert,
      createComment
    }
  } = rendererInternals;
  const hydrate2 = (vnode, container) => {
    if (!container.hasChildNodes()) {
      (!!(process.env.NODE_ENV !== "production") || false) && warn$1(
        `Attempting to hydrate existing markup but container is empty. Performing full mount instead.`
      );
      patch(null, vnode, container);
      flushPostFlushCbs();
      container._vnode = vnode;
      return;
    }
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const isFragmentStart = isComment$1(node) && node.data === "[";
    const onMismatch = () => handleMismatch(
      node,
      vnode,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      isFragmentStart
    );
    const { type, ref: ref2, shapeFlag, patchFlag } = vnode;
    let domType = node.nodeType;
    vnode.el = node;
    if (!!(process.env.NODE_ENV !== "production") || false) {
      def$1(node, "__vnode", vnode, true);
      def$1(node, "__vueParentComponent", parentComponent, true);
    }
    if (patchFlag === -2) {
      optimized = false;
      vnode.dynamicChildren = null;
    }
    let nextNode = null;
    switch (type) {
      case Text:
        if (domType !== 3) {
          if (vnode.children === "") {
            insert(vnode.el = createText(""), parentNode(node), node);
            nextNode = node;
          } else {
            nextNode = onMismatch();
          }
        } else {
          if (node.data !== vnode.children) {
            (!!(process.env.NODE_ENV !== "production") || false) && warn$1(
              `Hydration text mismatch in`,
              node.parentNode,
              `
  - rendered on server: ${JSON.stringify(
                node.data
              )}
  - expected on client: ${JSON.stringify(vnode.children)}`
            );
            logMismatchError();
            node.data = vnode.children;
          }
          nextNode = nextSibling(node);
        }
        break;
      case Comment:
        if (isTemplateNode(node)) {
          nextNode = nextSibling(node);
          replaceNode(
            vnode.el = node.content.firstChild,
            node,
            parentComponent
          );
        } else if (domType !== 8 || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }
        break;
      case Static:
        if (isFragmentStart) {
          node = nextSibling(node);
          domType = node.nodeType;
        }
        if (domType === 1 || domType === 3) {
          nextNode = node;
          const needToAdoptContent = !vnode.children.length;
          for (let i = 0; i < vnode.staticCount; i++) {
            if (needToAdoptContent)
              vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
            if (i === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }
            nextNode = nextSibling(nextNode);
          }
          return isFragmentStart ? nextSibling(nextNode) : nextNode;
        } else {
          onMismatch();
        }
        break;
      case Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            slotScopeIds,
            optimized
          );
        }
        break;
      default:
        if (shapeFlag & 1) {
          if ((domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) && !isTemplateNode(node)) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized
            );
          }
        } else if (shapeFlag & 6) {
          vnode.slotScopeIds = slotScopeIds;
          const container = parentNode(node);
          if (isFragmentStart) {
            nextNode = locateClosingAnchor(node);
          } else if (isComment$1(node) && node.data === "teleport start") {
            nextNode = locateClosingAnchor(node, node.data, "teleport end");
          } else {
            nextNode = nextSibling(node);
          }
          mountComponent(
            vnode,
            container,
            null,
            parentComponent,
            parentSuspense,
            getContainerType(container),
            optimized
          );
          if (isAsyncWrapper(vnode) && !vnode.type.__asyncResolved) {
            let subTree;
            if (isFragmentStart) {
              subTree = createVNode(Fragment);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else {
              subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
            }
            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64) {
          if (domType !== 8) {
            nextNode = onMismatch();
          } else {
            nextNode = vnode.type.hydrate(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized,
              rendererInternals,
              hydrateChildren
            );
          }
        } else if (shapeFlag & 128) {
          nextNode = vnode.type.hydrate(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            getContainerType(parentNode(node)),
            slotScopeIds,
            optimized,
            rendererInternals,
            hydrateNode
          );
        } else if (!!(process.env.NODE_ENV !== "production") || false) {
          warn$1("Invalid HostVNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode);
    }
    return nextNode;
  };
  const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const { type, props, patchFlag, shapeFlag, dirs, transition } = vnode;
    const forcePatch = type === "input" || type === "option";
    if (!!(process.env.NODE_ENV !== "production") || forcePatch || patchFlag !== -1) {
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      let needCallTransitionHooks = false;
      if (isTemplateNode(el)) {
        needCallTransitionHooks = needTransition(
          null,
          // no need check parentSuspense in hydration
          transition
        ) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
        const content = el.content.firstChild;
        if (needCallTransitionHooks) {
          const cls = content.getAttribute("class");
          if (cls) content.$cls = cls;
          transition.beforeEnter(content);
        }
        replaceNode(content, el, parentComponent);
        vnode.el = el = content;
      }
      if (shapeFlag & 16 && // skip if element has innerHTML / textContent
      !(props && (props.innerHTML || props.textContent))) {
        let next = hydrateChildren(
          el.firstChild,
          vnode,
          el,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
        let hasWarned2 = false;
        while (next) {
          if (!isMismatchAllowed(
            el,
            1
            /* CHILDREN */
          )) {
            if ((!!(process.env.NODE_ENV !== "production") || false) && !hasWarned2) {
              warn$1(
                `Hydration children mismatch on`,
                el,
                `
Server rendered element contains more child nodes than client vdom.`
              );
              hasWarned2 = true;
            }
            logMismatchError();
          }
          const cur = next;
          next = next.nextSibling;
          remove2(cur);
        }
      } else if (shapeFlag & 8) {
        let clientText = vnode.children;
        if (clientText[0] === "\n" && (el.tagName === "PRE" || el.tagName === "TEXTAREA")) {
          clientText = clientText.slice(1);
        }
        const { textContent } = el;
        if (textContent !== clientText && // innerHTML normalize \r\n or \r into a single \n in the DOM
        textContent !== clientText.replace(/\r\n|\r/g, "\n")) {
          if (!isMismatchAllowed(
            el,
            0
            /* TEXT */
          )) {
            (!!(process.env.NODE_ENV !== "production") || false) && warn$1(
              `Hydration text content mismatch on`,
              el,
              `
  - rendered on server: ${textContent}
  - expected on client: ${clientText}`
            );
            logMismatchError();
          }
          el.textContent = vnode.children;
        }
      }
      if (props) {
        if (!!(process.env.NODE_ENV !== "production") || false || forcePatch || !optimized || patchFlag & (16 | 32)) {
          const isCustomElement = el.tagName.includes("-");
          for (const key in props) {
            if ((!!(process.env.NODE_ENV !== "production") || false) && // #11189 skip if this node has directives that have created hooks
            // as it could have mutated the DOM in any possible way
            !(dirs && dirs.some((d) => d.dir.created)) && propHasMismatch(el, key, props[key], vnode, parentComponent)) {
              logMismatchError();
            }
            if (forcePatch && (key.endsWith("value") || key === "indeterminate") || isOn$1(key) && !isReservedProp$1(key) || // force hydrate v-bind with .prop modifiers
            key[0] === "." || isCustomElement && !isReservedProp$1(key)) {
              patchProp2(el, key, null, props[key], void 0, parentComponent);
            }
          }
        } else if (props.onClick) {
          patchProp2(
            el,
            "onClick",
            null,
            props.onClick,
            void 0,
            parentComponent
          );
        } else if (patchFlag & 4 && /* @__PURE__ */ isReactive(props.style)) {
          for (const key in props.style) props.style[key];
        }
      }
      let vnodeHooks;
      if (vnodeHooks = props && props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      if ((vnodeHooks = props && props.onVnodeMounted) || dirs || needCallTransitionHooks) {
        queueEffectWithSuspense(() => {
          vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    }
    return el.nextSibling;
  };
  const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    const children = parentVNode.children;
    const l = children.length;
    let hasWarned2 = false;
    for (let i = 0; i < l; i++) {
      const vnode = optimized ? children[i] : children[i] = normalizeVNode$1(children[i]);
      const isText = vnode.type === Text;
      if (node) {
        if (isText && !optimized) {
          if (i + 1 < l && normalizeVNode$1(children[i + 1]).type === Text) {
            insert(
              createText(
                node.data.slice(vnode.children.length)
              ),
              container,
              nextSibling(node)
            );
            node.data = vnode.children;
          }
        }
        node = hydrateNode(
          node,
          vnode,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      } else if (isText && !vnode.children) {
        insert(vnode.el = createText(""), container);
      } else {
        if (!isMismatchAllowed(
          container,
          1
          /* CHILDREN */
        )) {
          if ((!!(process.env.NODE_ENV !== "production") || false) && !hasWarned2) {
            warn$1(
              `Hydration children mismatch on`,
              container,
              `
Server rendered element contains fewer child nodes than client vdom.`
            );
            hasWarned2 = true;
          }
          logMismatchError();
        }
        patch(
          null,
          vnode,
          container,
          null,
          parentComponent,
          parentSuspense,
          getContainerType(container),
          slotScopeIds
        );
      }
    }
    return node;
  };
  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const { slotScopeIds: fragmentSlotScopeIds } = vnode;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    const container = parentNode(node);
    const next = hydrateChildren(
      nextSibling(node),
      vnode,
      container,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      optimized
    );
    if (next && isComment$1(next) && next.data === "]") {
      return nextSibling(vnode.anchor = next);
    } else {
      logMismatchError();
      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  };
  const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    if (!isMismatchAllowed(
      node.parentElement,
      1
      /* CHILDREN */
    )) {
      (!!(process.env.NODE_ENV !== "production") || false) && warn$1(
        `Hydration node mismatch:
- rendered on server:`,
        node,
        node.nodeType === 3 ? `(text)` : isComment$1(node) && node.data === "[" ? `(start of fragment)` : ``,
        `
- expected on client:`,
        vnode.type
      );
      logMismatchError();
    }
    vnode.el = null;
    if (isFragment) {
      const end = locateClosingAnchor(node);
      while (true) {
        const next2 = nextSibling(node);
        if (next2 && next2 !== end) {
          remove2(next2);
        } else {
          break;
        }
      }
    }
    const next = nextSibling(node);
    const container = parentNode(node);
    remove2(node);
    patch(
      null,
      vnode,
      container,
      next,
      parentComponent,
      parentSuspense,
      getContainerType(container),
      slotScopeIds
    );
    if (parentComponent) {
      parentComponent.vnode.el = vnode.el;
      updateHOCHostEl(parentComponent, vnode.el);
    }
    return next;
  };
  const locateClosingAnchor = (node, open = "[", close = "]") => {
    let match = 0;
    while (node) {
      node = nextSibling(node);
      if (node && isComment$1(node)) {
        if (node.data === open) match++;
        if (node.data === close) {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }
    return node;
  };
  const replaceNode = (newNode, oldNode, parentComponent) => {
    const parentNode2 = oldNode.parentNode;
    if (parentNode2) {
      parentNode2.replaceChild(newNode, oldNode);
    }
    let parent = parentComponent;
    while (parent) {
      if (parent.vnode.el === oldNode) {
        parent.vnode.el = parent.subTree.el = newNode;
      }
      parent = parent.parent;
    }
  };
  const isTemplateNode = (node) => {
    return node.nodeType === 1 && node.tagName === "TEMPLATE";
  };
  return [hydrate2, hydrateNode];
}
function propHasMismatch(el, key, clientValue, vnode, instance) {
  let mismatchType;
  let mismatchKey;
  let actual;
  let expected;
  if (key === "class") {
    if (el.$cls) {
      actual = el.$cls;
      delete el.$cls;
    } else {
      actual = el.getAttribute("class");
    }
    expected = normalizeClass$1(clientValue);
    if (!isSetEqual(toClassSet(actual || ""), toClassSet(expected))) {
      mismatchType = 2;
      mismatchKey = `class`;
    }
  } else if (key === "style") {
    actual = el.getAttribute("style") || "";
    expected = isString$2(clientValue) ? clientValue : stringifyStyle$1(normalizeStyle$1(clientValue));
    const actualMap = toStyleMap(actual);
    const expectedMap = toStyleMap(expected);
    if (vnode.dirs) {
      for (const { dir, value } of vnode.dirs) {
        if (dir.name === "show" && !value) {
          expectedMap.set("display", "none");
        }
      }
    }
    if (instance) {
      resolveCssVars(instance, vnode, expectedMap);
    }
    if (!isMapEqual(actualMap, expectedMap)) {
      mismatchType = 3;
      mismatchKey = "style";
    }
  } else if (el instanceof SVGElement && isKnownSvgAttr$1(key) || el instanceof HTMLElement && (isBooleanAttr$1(key) || isKnownHtmlAttr$1(key))) {
    if (isBooleanAttr$1(key)) {
      actual = el.hasAttribute(key);
      expected = includeBooleanAttr$1(clientValue);
    } else if (clientValue == null) {
      actual = el.hasAttribute(key);
      expected = false;
    } else {
      if (el.hasAttribute(key)) {
        actual = el.getAttribute(key);
      } else if (key === "value" && el.tagName === "TEXTAREA") {
        actual = el.value;
      } else {
        actual = false;
      }
      expected = isRenderableAttrValue$1(clientValue) ? String(clientValue) : false;
    }
    if (actual !== expected) {
      mismatchType = 4;
      mismatchKey = key;
    }
  }
  if (mismatchType != null && !isMismatchAllowed(el, mismatchType)) {
    const format2 = (v) => v === false ? `(not rendered)` : `${mismatchKey}="${v}"`;
    const preSegment = `Hydration ${MismatchTypeString[mismatchType]} mismatch on`;
    const postSegment = `
  - rendered on server: ${format2(actual)}
  - expected on client: ${format2(expected)}
  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.
  You should fix the source of the mismatch.`;
    {
      warn$1(preSegment, el, postSegment);
    }
    return true;
  }
  return false;
}
function toClassSet(str) {
  return new Set(str.trim().split(/\s+/));
}
function isSetEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }
  for (const s of a) {
    if (!b.has(s)) {
      return false;
    }
  }
  return true;
}
function toStyleMap(str) {
  const styleMap = /* @__PURE__ */ new Map();
  for (const item of str.split(";")) {
    let [key, value] = item.split(":");
    key = key.trim();
    value = value && value.trim();
    if (key && value) {
      styleMap.set(key, value);
    }
  }
  return styleMap;
}
function isMapEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }
  for (const [key, value] of a) {
    if (value !== b.get(key)) {
      return false;
    }
  }
  return true;
}
function resolveCssVars(instance, vnode, expectedMap) {
  const root = instance.subTree;
  if (instance.getCssVars && (vnode === root || root && root.type === Fragment && root.children.includes(vnode))) {
    const cssVars = instance.getCssVars();
    for (const key in cssVars) {
      const value = normalizeCssVarValue$1(cssVars[key]);
      expectedMap.set(`--${getEscapedCssVarName$1(key)}`, value);
    }
  }
  if (vnode === root && instance.parent) {
    resolveCssVars(instance.parent, instance.vnode, expectedMap);
  }
}
const allowMismatchAttr = "data-allow-mismatch";
const MismatchTypeString = {
  [
    0
    /* TEXT */
  ]: "text",
  [
    1
    /* CHILDREN */
  ]: "children",
  [
    2
    /* CLASS */
  ]: "class",
  [
    3
    /* STYLE */
  ]: "style",
  [
    4
    /* ATTRIBUTE */
  ]: "attribute"
};
function isMismatchAllowed(el, allowedType) {
  if (allowedType === 0 || allowedType === 1) {
    while (el && !el.hasAttribute(allowMismatchAttr)) {
      el = el.parentElement;
    }
  }
  const allowedAttr = el && el.getAttribute(allowMismatchAttr);
  if (allowedAttr == null) {
    return false;
  } else if (allowedAttr === "") {
    return true;
  } else {
    const list = allowedAttr.split(",");
    if (allowedType === 0 && list.includes("children")) {
      return true;
    }
    return list.includes(MismatchTypeString[allowedType]);
  }
}
const requestIdleCallback = getGlobalThis$2().requestIdleCallback || ((cb) => setTimeout(cb, 1));
const cancelIdleCallback = getGlobalThis$2().cancelIdleCallback || ((id) => clearTimeout(id));
const hydrateOnIdle = (timeout = 1e4) => (hydrate2) => {
  const id = requestIdleCallback(hydrate2, { timeout });
  return () => cancelIdleCallback(id);
};
function elementIsVisibleInViewport(el) {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return (top > 0 && top < innerHeight || bottom > 0 && bottom < innerHeight) && (left > 0 && left < innerWidth || right > 0 && right < innerWidth);
}
const hydrateOnVisible = (opts) => (hydrate2, forEach) => {
  const ob = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      ob.disconnect();
      hydrate2();
      break;
    }
  }, opts);
  forEach((el) => {
    if (!(el instanceof Element)) return;
    if (elementIsVisibleInViewport(el)) {
      hydrate2();
      ob.disconnect();
      return false;
    }
    ob.observe(el);
  });
  return () => ob.disconnect();
};
const hydrateOnMediaQuery = (query) => (hydrate2) => {
  if (query) {
    const mql = matchMedia(query);
    if (mql.matches) {
      hydrate2();
    } else {
      mql.addEventListener("change", hydrate2, { once: true });
      return () => mql.removeEventListener("change", hydrate2);
    }
  }
};
const hydrateOnInteraction = (interactions = []) => (hydrate2, forEach) => {
  if (isString$2(interactions)) interactions = [interactions];
  let hasHydrated = false;
  const doHydrate = (e) => {
    if (!hasHydrated) {
      hasHydrated = true;
      teardown();
      hydrate2();
      e.target.dispatchEvent(new e.constructor(e.type, e));
    }
  };
  const teardown = () => {
    forEach((el) => {
      for (const i of interactions) {
        el.removeEventListener(i, doHydrate);
      }
    });
  };
  forEach((el) => {
    for (const i of interactions) {
      el.addEventListener(i, doHydrate, { once: true });
    }
  });
  return teardown;
};
function forEachElement(node, cb) {
  if (isComment$1(node) && node.data === "[") {
    let depth = 1;
    let next = node.nextSibling;
    while (next) {
      if (next.nodeType === 1) {
        const result = cb(next);
        if (result === false) {
          break;
        }
      } else if (isComment$1(next)) {
        if (next.data === "]") {
          if (--depth === 0) break;
        } else if (next.data === "[") {
          depth++;
        }
      }
      next = next.nextSibling;
    }
  } else {
    cb(node);
  }
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function defineAsyncComponent(source) {
  if (isFunction$2(source)) {
    source = { loader: source };
  }
  const {
    loader,
    loadingComponent,
    errorComponent,
    delay = 200,
    hydrate: hydrateStrategy,
    timeout,
    // undefined = never times out
    suspensible = true,
    onError: userOnError
  } = source;
  let pendingRequest = null;
  let resolvedComp;
  let retries = 0;
  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };
  const load = () => {
    let thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
      err = err instanceof Error ? err : new Error(String(err));
      if (userOnError) {
        return new Promise((resolve2, reject) => {
          const userRetry = () => resolve2(retry());
          const userFail = () => reject(err);
          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then((comp) => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }
      if (!!(process.env.NODE_ENV !== "production") && !comp) {
        warn$1(
          `Async component loader resolved to undefined. If you are using retry(), make sure to return its return value.`
        );
      }
      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
        comp = comp.default;
      }
      if (!!(process.env.NODE_ENV !== "production") && comp && !isObject$2(comp) && !isFunction$2(comp)) {
        throw new Error(`Invalid async component load result: ${comp}`);
      }
      resolvedComp = comp;
      return comp;
    }));
  };
  return /* @__PURE__ */ defineComponent({
    name: "AsyncComponentWrapper",
    __asyncLoader: load,
    __asyncHydrate(el, instance, hydrate2) {
      let patched2 = false;
      (instance.bu || (instance.bu = [])).push(() => patched2 = true);
      const performHydrate = () => {
        if (patched2) {
          if (!!(process.env.NODE_ENV !== "production")) {
            warn$1(
              `Skipping lazy hydration for component '${getComponentName(resolvedComp) || resolvedComp.__file}': it was updated before lazy hydration performed.`
            );
          }
          return;
        }
        hydrate2();
      };
      const doHydrate = hydrateStrategy ? () => {
        const teardown = hydrateStrategy(
          performHydrate,
          (cb) => forEachElement(el, cb)
        );
        if (teardown) {
          (instance.bum || (instance.bum = [])).push(teardown);
        }
      } : performHydrate;
      if (resolvedComp) {
        doHydrate();
      } else {
        load().then(() => !instance.isUnmounted && doHydrate());
      }
    },
    get __asyncResolved() {
      return resolvedComp;
    },
    setup() {
      const instance = currentInstance;
      markAsyncBoundary(instance);
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }
      const onError = (err) => {
        pendingRequest = null;
        handleError(
          err,
          instance,
          13,
          !errorComponent
        );
      };
      if (suspensible && instance.suspense || isInSSRComponentSetup) {
        return load().then((comp) => {
          return () => createInnerComp(comp, instance);
        }).catch((err) => {
          onError(err);
          return () => errorComponent ? createVNode(errorComponent, {
            error: err
          }) : null;
        });
      }
      const loaded = /* @__PURE__ */ ref(false);
      const error = /* @__PURE__ */ ref();
      const delayed = /* @__PURE__ */ ref(!!delay);
      if (delay) {
        setTimeout(() => {
          delayed.value = false;
        }, delay);
      }
      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error.value) {
            const err = new Error(
              `Async component timed out after ${timeout}ms.`
            );
            onError(err);
            error.value = err;
          }
        }, timeout);
      }
      load().then(() => {
        loaded.value = true;
        if (instance.parent && isKeepAlive(instance.parent.vnode)) {
          instance.parent.update();
        }
      }).catch((err) => {
        onError(err);
        error.value = err;
      });
      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createInnerComp(
            loadingComponent,
            instance
          );
        }
      };
    }
  });
}
function createInnerComp(comp, parent) {
  const { ref: ref2, props, children, ce } = parent.vnode;
  const vnode = createVNode(comp, props, children);
  vnode.ref = ref2;
  vnode.ce = ce;
  delete parent.vnode.ce;
  return vnode;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
const KeepAliveImpl = {
  name: `KeepAlive`,
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance$1();
    const sharedContext = instance.ctx;
    if (!sharedContext.renderer) {
      return () => {
        const children = slots.default && slots.default();
        return children && children.length === 1 ? children[0] : children;
      };
    }
    const cache2 = /* @__PURE__ */ new Map();
    const keys = /* @__PURE__ */ new Set();
    let current = null;
    if (!!(process.env.NODE_ENV !== "production") || false) {
      instance.__v_cache = cache2;
    }
    const parentSuspense = instance.suspense;
    const {
      renderer: {
        p: patch,
        m: move,
        um: _unmount,
        o: { createElement }
      }
    } = sharedContext;
    const storageContainer = createElement("div");
    sharedContext.activate = (vnode, container, anchor, namespace, optimized) => {
      const instance2 = vnode.component;
      move(vnode, container, anchor, 0, parentSuspense);
      patch(
        instance2.vnode,
        vnode,
        container,
        anchor,
        instance2,
        parentSuspense,
        namespace,
        vnode.slotScopeIds,
        optimized
      );
      queuePostRenderEffect(() => {
        instance2.isDeactivated = false;
        if (instance2.a) {
          invokeArrayFns$1(instance2.a);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
      }, parentSuspense);
      if (!!(process.env.NODE_ENV !== "production") || false) {
        devtoolsComponentAdded(instance2);
      }
    };
    sharedContext.deactivate = (vnode) => {
      const instance2 = vnode.component;
      invalidateMount(instance2.m);
      invalidateMount(instance2.a);
      move(vnode, storageContainer, null, 1, parentSuspense);
      queuePostRenderEffect(() => {
        if (instance2.da) {
          invokeArrayFns$1(instance2.da);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
        instance2.isDeactivated = true;
      }, parentSuspense);
      if (!!(process.env.NODE_ENV !== "production") || false) {
        devtoolsComponentAdded(instance2);
      }
      if (!!(process.env.NODE_ENV !== "production") && true) {
        instance2.__keepAliveStorageContainer = storageContainer;
      }
    };
    function unmount(vnode) {
      resetShapeFlag(vnode);
      _unmount(vnode, instance, parentSuspense, true);
    }
    function pruneCache(filter) {
      cache2.forEach((vnode, key) => {
        const name = getComponentName(
          isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : vnode.type
        );
        if (name && !filter(name)) {
          pruneCacheEntry(key);
        }
      });
    }
    function pruneCacheEntry(key) {
      const cached = cache2.get(key);
      if (cached && (!current || !isSameVNodeType(cached, current))) {
        unmount(cached);
      } else if (current) {
        resetShapeFlag(current);
      }
      cache2.delete(key);
      keys.delete(key);
    }
    watch(
      () => [props.include, props.exclude],
      ([include, exclude]) => {
        include && pruneCache((name) => matches(include, name));
        exclude && pruneCache((name) => !matches(exclude, name));
      },
      // prune post-render after `current` has been updated
      { flush: "post", deep: true }
    );
    let pendingCacheKey = null;
    const cacheSubtree = () => {
      if (pendingCacheKey != null) {
        if (isSuspense(instance.subTree.type)) {
          queuePostRenderEffect(() => {
            cache2.set(pendingCacheKey, getInnerChild(instance.subTree));
          }, instance.subTree.suspense);
        } else {
          cache2.set(pendingCacheKey, getInnerChild(instance.subTree));
        }
      }
    };
    onMounted(cacheSubtree);
    onUpdated(cacheSubtree);
    onBeforeUnmount(() => {
      cache2.forEach((cached) => {
        const { subTree, suspense } = instance;
        const vnode = getInnerChild(subTree);
        if (cached.type === vnode.type && cached.key === vnode.key) {
          resetShapeFlag(vnode);
          const da = vnode.component.da;
          da && queuePostRenderEffect(da, suspense);
          return;
        }
        unmount(cached);
      });
    });
    return () => {
      pendingCacheKey = null;
      if (!slots.default) {
        return current = null;
      }
      const children = slots.default();
      const rawVNode = children[0];
      if (children.length > 1) {
        if (!!(process.env.NODE_ENV !== "production")) {
          warn$1(`KeepAlive should contain exactly one component child.`);
        }
        current = null;
        return children;
      } else if (!isVNode$3(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
        current = null;
        return rawVNode;
      }
      let vnode = getInnerChild(rawVNode);
      if (vnode.type === Comment) {
        current = null;
        return vnode;
      }
      const comp = vnode.type;
      const name = getComponentName(
        isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp
      );
      const { include, exclude, max } = props;
      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
        vnode.shapeFlag &= -257;
        current = vnode;
        return rawVNode;
      }
      const key = vnode.key == null ? comp : vnode.key;
      const cachedVNode = cache2.get(key);
      if (vnode.el) {
        vnode = cloneVNode(vnode);
        if (rawVNode.shapeFlag & 128) {
          rawVNode.ssContent = vnode;
        }
      }
      pendingCacheKey = key;
      if (cachedVNode) {
        vnode.el = cachedVNode.el;
        vnode.component = cachedVNode.component;
        if (vnode.transition) {
          setTransitionHooks(vnode, vnode.transition);
        }
        vnode.shapeFlag |= 512;
        keys.delete(key);
        keys.add(key);
      } else {
        keys.add(key);
        if (max && keys.size > parseInt(max, 10)) {
          pruneCacheEntry(keys.values().next().value);
        }
      }
      vnode.shapeFlag |= 256;
      current = vnode;
      return isSuspense(rawVNode.type) ? rawVNode : vnode;
    };
  }
};
const decorate$2 = (t) => {
  t.__isBuiltIn = true;
  return t;
};
const KeepAlive = /* @__PURE__ */ decorate$2(KeepAliveImpl);
function matches(pattern, name) {
  if (isArray$2(pattern)) {
    return pattern.some((p2) => matches(p2, name));
  } else if (isString$2(pattern)) {
    return pattern.split(",").includes(name);
  } else if (isRegExp$2(pattern)) {
    pattern.lastIndex = 0;
    return pattern.test(name);
  }
  return false;
}
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove$1(keepAliveRoot[type], injected);
  }, target);
}
function resetShapeFlag(vnode) {
  vnode.shapeFlag &= -257;
  vnode.shapeFlag &= -513;
}
function getInnerChild(vnode) {
  return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else if (!!(process.env.NODE_ENV !== "production")) {
    const apiName = toHandlerKey$1(ErrorTypeStrings$1[type].replace(/ hook$/, ""));
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook(
  "bu"
);
const onUpdated = createHook("u");
const onBeforeUnmount = createHook(
  "bum"
);
const onUnmounted = createHook("um");
const onServerPrefetch = createHook(
  "sp"
);
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function getCompatChildren(instance) {
  assertCompatEnabled("INSTANCE_CHILDREN", instance);
  const root = instance.subTree;
  const children = [];
  if (root) {
    walk(root, children);
  }
  return children;
}
function walk(vnode, children) {
  if (vnode.component) {
    children.push(vnode.component.proxy);
  } else if (vnode.shapeFlag & 16) {
    const vnodes = vnode.children;
    for (let i = 0; i < vnodes.length; i++) {
      walk(vnodes[i], children);
    }
  }
}
function getCompatListeners(instance) {
  assertCompatEnabled("INSTANCE_LISTENERS", instance);
  const listeners = {};
  const rawProps = instance.vnode.props;
  if (!rawProps) {
    return listeners;
  }
  for (const key in rawProps) {
    if (isOn$1(key)) {
      listeners[key[2].toLowerCase() + key.slice(3)] = rawProps[key];
    }
  }
  return listeners;
}
const COMPONENTS = "components";
const DIRECTIVES = "directives";
const FILTERS = "filters";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
function resolveDynamicComponent(component) {
  if (isString$2(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveDirective(name) {
  return resolveAsset(DIRECTIVES, name);
}
function resolveFilter$1(name) {
  return resolveAsset(FILTERS, name);
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component,
        false
      );
      if (selfName && (selfName === name || selfName === camelize$1(name) || selfName === capitalize$2(camelize$1(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    if (!!(process.env.NODE_ENV !== "production") && warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else if (!!(process.env.NODE_ENV !== "production")) {
    warn$1(
      `resolve${capitalize$2(type.slice(0, -1))} can only be used in render() or setup().`
    );
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize$1(name)] || registry[capitalize$2(camelize$1(name))]);
}
function convertLegacyRenderFn(instance) {
  const Component = instance.type;
  const render2 = Component.render;
  if (!render2 || render2._rc || render2._compatChecked || render2._compatWrapped) {
    return;
  }
  if (render2.length >= 2) {
    render2._compatChecked = true;
    return;
  }
  if (checkCompatEnabled("RENDER_FUNCTION", instance)) {
    const wrapped = Component.render = function compatRender() {
      return render2.call(this, compatH);
    };
    wrapped._compatWrapped = true;
  }
}
function compatH(type, propsOrChildren, children) {
  if (!type) {
    type = Comment;
  }
  if (typeof type === "string") {
    const t = hyphenate$1(type);
    if (t === "transition" || t === "transition-group" || t === "keep-alive") {
      type = `__compat__${t}`;
    }
    type = resolveDynamicComponent(type);
  }
  const l = arguments.length;
  const is2ndArgArrayChildren = isArray$2(propsOrChildren);
  if (l === 2 || is2ndArgArrayChildren) {
    if (isObject$2(propsOrChildren) && !is2ndArgArrayChildren) {
      if (isVNode$3(propsOrChildren)) {
        return convertLegacySlots(createVNode(type, null, [propsOrChildren]));
      }
      return convertLegacySlots(
        convertLegacyDirectives(
          createVNode(type, convertLegacyProps(propsOrChildren, type)),
          propsOrChildren
        )
      );
    } else {
      return convertLegacySlots(createVNode(type, null, propsOrChildren));
    }
  } else {
    if (isVNode$3(children)) {
      children = [children];
    }
    return convertLegacySlots(
      convertLegacyDirectives(
        createVNode(type, convertLegacyProps(propsOrChildren, type), children),
        propsOrChildren
      )
    );
  }
}
const skipLegacyRootLevelProps = /* @__PURE__ */ makeMap$1(
  "staticStyle,staticClass,directives,model,hook"
);
function convertLegacyProps(legacyProps, type) {
  if (!legacyProps) {
    return null;
  }
  const converted = {};
  for (const key in legacyProps) {
    if (key === "attrs" || key === "domProps" || key === "props") {
      extend$1(converted, legacyProps[key]);
    } else if (key === "on" || key === "nativeOn") {
      const listeners = legacyProps[key];
      for (const event in listeners) {
        let handlerKey = convertLegacyEventKey(event);
        if (key === "nativeOn") handlerKey += `Native`;
        const existing = converted[handlerKey];
        const incoming = listeners[event];
        if (existing !== incoming) {
          if (existing) {
            converted[handlerKey] = [].concat(existing, incoming);
          } else {
            converted[handlerKey] = incoming;
          }
        }
      }
    } else if (!skipLegacyRootLevelProps(key)) {
      converted[key] = legacyProps[key];
    }
  }
  if (legacyProps.staticClass) {
    converted.class = normalizeClass$1([legacyProps.staticClass, converted.class]);
  }
  if (legacyProps.staticStyle) {
    converted.style = normalizeStyle$1([legacyProps.staticStyle, converted.style]);
  }
  if (legacyProps.model && isObject$2(type)) {
    const { prop = "value", event = "input" } = type.model || {};
    converted[prop] = legacyProps.model.value;
    converted[compatModelEventPrefix + event] = legacyProps.model.callback;
  }
  return converted;
}
function convertLegacyEventKey(event) {
  if (event[0] === "&") {
    event = event.slice(1) + "Passive";
  }
  if (event[0] === "~") {
    event = event.slice(1) + "Once";
  }
  if (event[0] === "!") {
    event = event.slice(1) + "Capture";
  }
  return toHandlerKey$1(event);
}
function convertLegacyDirectives(vnode, props) {
  if (props && props.directives) {
    return withDirectives(
      vnode,
      props.directives.map(({ name, value, arg, modifiers }) => {
        return [
          resolveDirective(name),
          value,
          arg,
          modifiers
        ];
      })
    );
  }
  return vnode;
}
function convertLegacySlots(vnode) {
  const { props, children } = vnode;
  let slots;
  if (vnode.shapeFlag & 6 && isArray$2(children)) {
    slots = {};
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const slotName = isVNode$3(child) && child.props && child.props.slot || "default";
      const slot = slots[slotName] || (slots[slotName] = []);
      if (isVNode$3(child) && child.type === "template") {
        slot.push(child.children);
      } else {
        slot.push(child);
      }
    }
    if (slots) {
      for (const key in slots) {
        const slotChildren = slots[key];
        slots[key] = () => slotChildren;
        slots[key]._ns = true;
      }
    }
  }
  const scopedSlots = props && props.scopedSlots;
  if (scopedSlots) {
    delete props.scopedSlots;
    if (slots) {
      extend$1(slots, scopedSlots);
    } else {
      slots = scopedSlots;
    }
  }
  if (slots) {
    normalizeChildren(vnode, slots);
  }
  return vnode;
}
function defineLegacyVNodeProperties(vnode) {
  if (isCompatEnabled(
    "RENDER_FUNCTION",
    currentRenderingInstance,
    true
  ) && isCompatEnabled(
    "PRIVATE_APIS",
    currentRenderingInstance,
    true
  )) {
    const context = currentRenderingInstance;
    const getInstance = () => vnode.component && vnode.component.proxy;
    let componentOptions;
    Object.defineProperties(vnode, {
      tag: { get: () => vnode.type },
      data: { get: () => vnode.props || {}, set: (p2) => vnode.props = p2 },
      elm: { get: () => vnode.el },
      componentInstance: { get: getInstance },
      child: { get: getInstance },
      text: { get: () => isString$2(vnode.children) ? vnode.children : null },
      context: { get: () => context && context.proxy },
      componentOptions: {
        get: () => {
          if (vnode.shapeFlag & 4) {
            if (componentOptions) {
              return componentOptions;
            }
            return componentOptions = {
              Ctor: vnode.type,
              propsData: vnode.props,
              children: vnode.children
            };
          }
        }
      }
    });
  }
}
const normalizedFunctionalComponentMap = /* @__PURE__ */ new WeakMap();
const legacySlotProxyHandlers = {
  get(target, key) {
    const slot = target[key];
    return slot && slot();
  }
};
function convertLegacyFunctionalComponent(comp) {
  if (normalizedFunctionalComponentMap.has(comp)) {
    return normalizedFunctionalComponentMap.get(comp);
  }
  const legacyFn = comp.render;
  const Func = (props, ctx) => {
    const instance = getCurrentInstance$1();
    const legacyCtx = {
      props,
      children: instance.vnode.children || [],
      data: instance.vnode.props || {},
      scopedSlots: ctx.slots,
      parent: instance.parent && instance.parent.proxy,
      slots() {
        return new Proxy(ctx.slots, legacySlotProxyHandlers);
      },
      get listeners() {
        return getCompatListeners(instance);
      },
      get injections() {
        if (comp.inject) {
          const injections = {};
          resolveInjections(comp.inject, injections);
          return injections;
        }
        return {};
      }
    };
    return legacyFn(compatH, legacyCtx);
  };
  Func.props = comp.props;
  Func.displayName = comp.name;
  Func.compatConfig = comp.compatConfig;
  Func.inheritAttrs = false;
  normalizedFunctionalComponentMap.set(comp, Func);
  return Func;
}
function renderList(source, renderItem, cache2, index) {
  let ret;
  const cached = cache2 && cache2[index];
  const sourceIsArray = isArray$2(source);
  if (sourceIsArray || isString$2(source)) {
    const sourceIsReactiveArray = sourceIsArray && /* @__PURE__ */ isReactive(source);
    let needsWrap = false;
    let isReadonlySource = false;
    if (sourceIsReactiveArray) {
      needsWrap = !/* @__PURE__ */ isShallow(source);
      isReadonlySource = /* @__PURE__ */ isReadonly(source);
      source = shallowReadArray(source);
    }
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(
        needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i],
        i,
        void 0,
        cached && cached[i]
      );
    }
  } else if (typeof source === "number") {
    if (!!(process.env.NODE_ENV !== "production") && !Number.isInteger(source)) {
      warn$1(`The v-for range expect an integer value but got ${source}.`);
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject$2(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached && cached[i])
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache2) {
    cache2[index] = ret;
  }
  return ret;
}
function createSlots(slots, dynamicSlots) {
  for (let i = 0; i < dynamicSlots.length; i++) {
    const slot = dynamicSlots[i];
    if (isArray$2(slot)) {
      for (let j = 0; j < slot.length; j++) {
        slots[slot[j].name] = slot[j].fn;
      }
    } else if (slot) {
      slots[slot.name] = slot.key ? (...args) => {
        const res = slot.fn(...args);
        if (res) res.key = slot.key;
        return res;
      } : slot.fn;
    }
  }
  return slots;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce) {
    const hasProps = Object.keys(props).length > 0;
    if (name !== "default") props.name = name;
    return openBlock(), createBlock(
      Fragment,
      null,
      [createVNode("slot", props, fallback && fallback())],
      hasProps ? -2 : 64
    );
  }
  let slot = slots[name];
  if (!!(process.env.NODE_ENV !== "production") && slot && slot.length > 1) {
    warn$1(
      `SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.`
    );
    slot = () => [];
  }
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode$1(slot(props));
  const slotKey = props.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  validSlotContent && validSlotContent.key;
  const rendered = createBlock(
    Fragment,
    {
      key: (slotKey && !isSymbol$1(slotKey) ? slotKey : `_${name}`) + // #7256 force differentiate fallback content from actual content
      (!validSlotContent && fallback ? "_fb" : "")
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode$1(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode$3(child)) return true;
    if (child.type === Comment) return false;
    if (child.type === Fragment && !ensureValidVNode$1(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
function toHandlers(obj, preserveCaseIfNecessary) {
  const ret = {};
  if (!!(process.env.NODE_ENV !== "production") && !isObject$2(obj)) {
    warn$1(`v-on with no argument expects an object value.`);
    return ret;
  }
  for (const key in obj) {
    ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? `on:${key}` : toHandlerKey$1(key)] = obj[key];
  }
  return ret;
}
function toObject(arr) {
  const res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend$1(res, arr[i]);
    }
  }
  return res;
}
function legacyBindObjectProps(data, _tag, value, _asProp, isSync) {
  if (value && isObject$2(value)) {
    if (isArray$2(value)) {
      value = toObject(value);
    }
    for (const key in value) {
      if (isReservedProp$1(key)) {
        data[key] = value[key];
      } else if (key === "class") {
        data.class = normalizeClass$1([data.class, value.class]);
      } else if (key === "style") {
        data.style = normalizeClass$1([data.style, value.style]);
      } else {
        const attrs = data.attrs || (data.attrs = {});
        const camelizedKey = camelize$1(key);
        const hyphenatedKey = hyphenate$1(key);
        if (!(camelizedKey in attrs) && !(hyphenatedKey in attrs)) {
          attrs[key] = value[key];
          if (isSync) {
            const on2 = data.on || (data.on = {});
            on2[`update:${key}`] = function($event) {
              value[key] = $event;
            };
          }
        }
      }
    }
  }
  return data;
}
function legacyBindObjectListeners(props, listeners) {
  return mergeProps(props, toHandlers(listeners));
}
function legacyRenderSlot(instance, name, fallback, props, bindObject) {
  if (bindObject) {
    props = mergeProps(props, bindObject);
  }
  return renderSlot(instance.slots, name, props, fallback && (() => fallback));
}
function legacyResolveScopedSlots(fns, raw, hasDynamicKeys) {
  return createSlots(
    raw || { $stable: !hasDynamicKeys },
    mapKeyToName(fns)
  );
}
function mapKeyToName(slots) {
  for (let i = 0; i < slots.length; i++) {
    const fn = slots[i];
    if (fn) {
      if (isArray$2(fn)) {
        mapKeyToName(fn);
      } else {
        fn.name = fn.key || "default";
      }
    }
  }
  return slots;
}
const staticCacheMap = /* @__PURE__ */ new WeakMap();
function legacyRenderStatic(instance, index) {
  let cache2 = staticCacheMap.get(instance);
  if (!cache2) {
    staticCacheMap.set(instance, cache2 = []);
  }
  if (cache2[index]) {
    return cache2[index];
  }
  const fn = instance.type.staticRenderFns[index];
  const ctx = instance.proxy;
  return cache2[index] = fn.call(ctx, null, ctx);
}
function legacyCheckKeyCodes(instance, eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  const config = instance.appContext.config;
  const configKeyCodes = config.keyCodes || {};
  const mappedKeyCode = configKeyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !configKeyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate$1(eventKeyName) !== key;
  }
}
function isKeyNotMatch(expect, actual) {
  if (isArray$2(expect)) {
    return !expect.includes(actual);
  } else {
    return expect !== actual;
  }
}
function legacyMarkOnce(tree) {
  return tree;
}
function legacyBindDynamicKeys(props, values) {
  for (let i = 0; i < values.length; i += 2) {
    const key = values[i];
    if (typeof key === "string" && key) {
      props[values[i]] = values[i + 1];
    }
  }
  return props;
}
function legacyPrependModifier(value, symbol) {
  return typeof value === "string" ? symbol + value : value;
}
function installCompatInstanceProperties(map2) {
  const set = (target, key, val) => {
    target[key] = val;
    return target[key];
  };
  const del = (target, key) => {
    delete target[key];
  };
  extend$1(map2, {
    $set: (i) => {
      assertCompatEnabled("INSTANCE_SET", i);
      return set;
    },
    $delete: (i) => {
      assertCompatEnabled("INSTANCE_DELETE", i);
      return del;
    },
    $mount: (i) => {
      assertCompatEnabled(
        "GLOBAL_MOUNT",
        null
      );
      return i.ctx._compat_mount || NOOP$1;
    },
    $destroy: (i) => {
      assertCompatEnabled("INSTANCE_DESTROY", i);
      return i.ctx._compat_destroy || NOOP$1;
    },
    // overrides existing accessor
    $slots: (i) => {
      if (isCompatEnabled("RENDER_FUNCTION", i) && i.render && i.render._compatWrapped) {
        return new Proxy(i.slots, legacySlotProxyHandlers);
      }
      return !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(i.slots) : i.slots;
    },
    $scopedSlots: (i) => {
      assertCompatEnabled("INSTANCE_SCOPED_SLOTS", i);
      return !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(i.slots) : i.slots;
    },
    $on: (i) => on.bind(null, i),
    $once: (i) => once.bind(null, i),
    $off: (i) => off.bind(null, i),
    $children: getCompatChildren,
    $listeners: getCompatListeners,
    // inject additional properties into $options for compat
    // e.g. vuex needs this.$options.parent
    $options: (i) => {
      if (!isCompatEnabled("PRIVATE_APIS", i)) {
        return resolveMergedOptions(i);
      }
      if (i.resolvedOptions) {
        return i.resolvedOptions;
      }
      const res = i.resolvedOptions = extend$1({}, resolveMergedOptions(i));
      Object.defineProperties(res, {
        parent: {
          get() {
            warnDeprecation("PRIVATE_APIS", i, "$options.parent");
            return i.proxy.$parent;
          }
        },
        propsData: {
          get() {
            warnDeprecation(
              "PRIVATE_APIS",
              i,
              "$options.propsData"
            );
            return i.vnode.props;
          }
        }
      });
      return res;
    }
  });
  const privateAPIs = {
    // needed by many libs / render fns
    $vnode: (i) => i.vnode,
    // some private properties that are likely accessed...
    _self: (i) => i.proxy,
    _uid: (i) => i.uid,
    _data: (i) => i.data,
    _isMounted: (i) => i.isMounted,
    _isDestroyed: (i) => i.isUnmounted,
    // v2 render helpers
    $createElement: () => compatH,
    _c: () => compatH,
    _o: () => legacyMarkOnce,
    _n: () => looseToNumber$1,
    _s: () => toDisplayString$2,
    _l: () => renderList,
    _t: (i) => legacyRenderSlot.bind(null, i),
    _q: () => looseEqual$1,
    _i: () => looseIndexOf$1,
    _m: (i) => legacyRenderStatic.bind(null, i),
    _f: () => resolveFilter$1,
    _k: (i) => legacyCheckKeyCodes.bind(null, i),
    _b: () => legacyBindObjectProps,
    _v: () => createTextVNode,
    _e: () => createCommentVNode,
    _u: () => legacyResolveScopedSlots,
    _g: () => legacyBindObjectListeners,
    _d: () => legacyBindDynamicKeys,
    _p: () => legacyPrependModifier
  };
  for (const key in privateAPIs) {
    map2[key] = (i) => {
      if (isCompatEnabled("PRIVATE_APIS", i)) {
        return privateAPIs[key](i);
      }
    };
  }
}
const getPublicInstance = (i) => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend$1(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(i.props) : i.props,
    $attrs: (i) => !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(i.attrs) : i.attrs,
    $slots: (i) => !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(i.slots) : i.slots,
    $refs: (i) => !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(i.refs) : i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
{
  installCompatInstanceProperties(publicPropertiesMap);
}
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ$1 && !state.__isScriptSetup && hasOwn$2(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (!!(process.env.NODE_ENV !== "production") && key === "__isVue") {
      return true;
    }
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ$1 && hasOwn$2(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (hasOwn$2(props, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ$1 && hasOwn$2(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
        !!(process.env.NODE_ENV !== "production") && markAttrsAccessed();
      } else if (!!(process.env.NODE_ENV !== "production") && key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ$1 && hasOwn$2(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn$2(globalProperties, key)
    ) {
      {
        const desc = Object.getOwnPropertyDescriptor(globalProperties, key);
        if (desc.get) {
          return desc.get.call(instance.proxy);
        } else {
          const val = globalProperties[key];
          return isFunction$2(val) ? extend$1(val.bind(instance.proxy), val) : val;
        }
      }
    } else if (!!(process.env.NODE_ENV !== "production") && currentRenderingInstance && (!isString$2(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ$1 && isReservedPrefix(key[0]) && hasOwn$2(data, key)) {
        warn$1(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (!!(process.env.NODE_ENV !== "production") && setupState.__isScriptSetup && hasOwn$2(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ$1 && hasOwn$2(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn$2(instance.props, key)) {
      !!(process.env.NODE_ENV !== "production") && warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      !!(process.env.NODE_ENV !== "production") && warn$1(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (!!(process.env.NODE_ENV !== "production") && key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, props, type }
  }, key) {
    let cssModules;
    return !!(accessCache[key] || data !== EMPTY_OBJ$1 && key[0] !== "$" && hasOwn$2(data, key) || hasSetupBinding(setupState, key) || hasOwn$2(props, key) || hasOwn$2(ctx, key) || hasOwn$2(publicPropertiesMap, key) || hasOwn$2(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn$2(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
if (!!(process.env.NODE_ENV !== "production") && true) {
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
const RuntimeCompiledPublicInstanceProxyHandlers = /* @__PURE__ */ extend$1({}, PublicInstanceProxyHandlers, {
  get(target, key) {
    if (key === Symbol.unscopables) {
      return;
    }
    return PublicInstanceProxyHandlers.get(target, key, target);
  },
  has(_, key) {
    const has = key[0] !== "_" && !isGloballyAllowed$1(key);
    if (!!(process.env.NODE_ENV !== "production") && !has && PublicInstanceProxyHandlers.has(_, key)) {
      warn$1(
        `Property ${JSON.stringify(
          key
        )} should not start with _ which is a reserved prefix for Vue internals.`
      );
    }
    return has;
  }
});
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP$1
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP$1
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(/* @__PURE__ */ toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP$1
      });
    }
  });
}
function deepMergeData(to, from) {
  for (const key in from) {
    const toVal = to[key];
    const fromVal = from[key];
    if (key in to && isPlainObject$2(toVal) && isPlainObject$2(fromVal)) {
      !!(process.env.NODE_ENV !== "production") && warnDeprecation("OPTIONS_DATA_MERGE", null, key);
      deepMergeData(toVal, fromVal);
    } else {
      to[key] = fromVal;
    }
  }
  return to;
}
const warnRuntimeUsage = (method) => warn$1(
  `${method}() is a compiler-hint helper that is only usable inside <script setup> of a single file component. Its arguments should be compiled away and passing it at runtime has no effect.`
);
function defineProps() {
  if (!!(process.env.NODE_ENV !== "production")) {
    warnRuntimeUsage(`defineProps`);
  }
  return null;
}
function defineEmits() {
  if (!!(process.env.NODE_ENV !== "production")) {
    warnRuntimeUsage(`defineEmits`);
  }
  return null;
}
function defineExpose(exposed) {
  if (!!(process.env.NODE_ENV !== "production")) {
    warnRuntimeUsage(`defineExpose`);
  }
}
function defineOptions(options) {
  if (!!(process.env.NODE_ENV !== "production")) {
    warnRuntimeUsage(`defineOptions`);
  }
}
function defineSlots() {
  if (!!(process.env.NODE_ENV !== "production")) {
    warnRuntimeUsage(`defineSlots`);
  }
  return null;
}
function defineModel() {
  if (!!(process.env.NODE_ENV !== "production")) {
    warnRuntimeUsage("defineModel");
  }
}
function withDefaults(props, defaults) {
  if (!!(process.env.NODE_ENV !== "production")) {
    warnRuntimeUsage(`withDefaults`);
  }
  return null;
}
function useSlots() {
  return getContext("useSlots").slots;
}
function useAttrs() {
  return getContext("useAttrs").attrs;
}
function getContext(calledFunctionName) {
  const i = getCurrentInstance$1();
  if (!!(process.env.NODE_ENV !== "production") && !i) {
    warn$1(`${calledFunctionName}() called without active instance.`);
  }
  return i.setupContext || (i.setupContext = createSetupContext(i));
}
function normalizePropsOrEmits(props) {
  return isArray$2(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
function mergeDefaults(raw, defaults) {
  const props = normalizePropsOrEmits(raw);
  for (const key in defaults) {
    if (key.startsWith("__skip")) continue;
    let opt = props[key];
    if (opt) {
      if (isArray$2(opt) || isFunction$2(opt)) {
        opt = props[key] = { type: opt, default: defaults[key] };
      } else {
        opt.default = defaults[key];
      }
    } else if (opt === null) {
      opt = props[key] = { default: defaults[key] };
    } else if (!!(process.env.NODE_ENV !== "production")) {
      warn$1(`props default key "${key}" has no corresponding declaration.`);
    }
    if (opt && defaults[`__skip_${key}`]) {
      opt.skipFactory = true;
    }
  }
  return props;
}
function mergeModels(a, b) {
  if (!a || !b) return a || b;
  if (isArray$2(a) && isArray$2(b)) return a.concat(b);
  return extend$1({}, normalizePropsOrEmits(a), normalizePropsOrEmits(b));
}
function createPropsRestProxy(props, excludedKeys) {
  const ret = {};
  for (const key in props) {
    if (!excludedKeys.includes(key)) {
      Object.defineProperty(ret, key, {
        enumerable: true,
        get: () => props[key]
      });
    }
  }
  return ret;
}
function withAsyncContext(getAwaitable) {
  const ctx = getCurrentInstance$1();
  if (!!(process.env.NODE_ENV !== "production") && !ctx) {
    warn$1(
      `withAsyncContext called without active current instance. This is likely a bug.`
    );
  }
  let awaitable = getAwaitable();
  unsetCurrentInstance();
  if (isPromise$2(awaitable)) {
    awaitable = awaitable.catch((e) => {
      setCurrentInstance(ctx);
      throw e;
    });
  }
  return [awaitable, () => setCurrentInstance(ctx)];
}
function createDuplicateChecker() {
  const cache2 = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache2[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache2[key]}.`);
    } else {
      cache2[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render: render2,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = !!(process.env.NODE_ENV !== "production") ? createDuplicateChecker() : null;
  if (!!(process.env.NODE_ENV !== "production")) {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$2(methodHandler)) {
        if (!!(process.env.NODE_ENV !== "production")) {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        } else {
          ctx[key] = methodHandler.bind(publicThis);
        }
        if (!!(process.env.NODE_ENV !== "production")) {
          checkDuplicateProperties("Methods", key);
        }
      } else if (!!(process.env.NODE_ENV !== "production")) {
        warn$1(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!!(process.env.NODE_ENV !== "production") && !isFunction$2(dataOptions)) {
      warn$1(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (!!(process.env.NODE_ENV !== "production") && isPromise$2(data)) {
      warn$1(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject$2(data)) {
      !!(process.env.NODE_ENV !== "production") && warn$1(`data() should return an object.`);
    } else {
      instance.data = /* @__PURE__ */ reactive(data);
      if (!!(process.env.NODE_ENV !== "production")) {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP$1
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = isFunction$2(opt) ? opt.bind(publicThis, publicThis) : isFunction$2(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP$1;
      if (!!(process.env.NODE_ENV !== "production") && get === NOOP$1) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set = !isFunction$2(opt) && isFunction$2(opt.set) ? opt.set.bind(publicThis) : !!(process.env.NODE_ENV !== "production") ? () => {
        warn$1(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      } : NOOP$1;
      const c = computed({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      if (!!(process.env.NODE_ENV !== "production")) {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction$2(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$2(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  {
    if (beforeDestroy && softAssertCompatEnabled("OPTIONS_BEFORE_DESTROY", instance)) {
      registerLifecycleHook(onBeforeUnmount, beforeDestroy);
    }
    if (destroyed && softAssertCompatEnabled("OPTIONS_DESTROYED", instance)) {
      registerLifecycleHook(onUnmounted, destroyed);
    }
  }
  if (isArray$2(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val,
          enumerable: true
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render2 && instance.render === NOOP$1) {
    instance.render = render2;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  if (filters && isCompatEnabled("FILTERS", instance)) {
    instance.filters = filters;
  }
  if (serverPrefetch) {
    markAsyncBoundary(instance);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP$1) {
  if (isArray$2(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$2(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (/* @__PURE__ */ isRef$2(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
    if (!!(process.env.NODE_ENV !== "production")) {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray$2(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  const options = {};
  {
    const instance = currentInstance && getCurrentScope() === currentInstance.scope ? currentInstance : null;
    const newValue = getter();
    if (isArray$2(newValue) && isCompatEnabled("WATCH_ARRAY", instance)) {
      options.deep = true;
    }
    const baseGetter = getter;
    getter = () => {
      const val = baseGetter();
      if (isArray$2(val) && checkCompatEnabled("WATCH_ARRAY", instance)) {
        traverse(val);
      }
      return val;
    };
  }
  if (isString$2(raw)) {
    const handler = ctx[raw];
    if (isFunction$2(handler)) {
      {
        watch(getter, handler, options);
      }
    } else if (!!(process.env.NODE_ENV !== "production")) {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction$2(raw)) {
    {
      watch(getter, raw.bind(publicThis), options);
    }
  } else if (isObject$2(raw)) {
    if (isArray$2(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction$2(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$2(handler)) {
        watch(getter, handler, extend$1(raw, options));
      } else if (!!(process.env.NODE_ENV !== "production")) {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else if (!!(process.env.NODE_ENV !== "production")) {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache2,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache2.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    if (isCompatEnabled("PRIVATE_APIS", instance)) {
      resolved = extend$1({}, base);
      resolved.parent = instance.parent && instance.parent.proxy;
      resolved.propsData = instance.vnode.props;
    } else {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$2(base)) {
    cache2.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  if (isFunction$2(from)) {
    from = from.options;
  }
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      !!(process.env.NODE_ENV !== "production") && warn$1(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
{
  internalOptionMergeStrats.filters = mergeObjectOptions;
}
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return (isCompatEnabled("OPTIONS_DATA_MERGE", null) ? deepMergeData : extend$1)(
      isFunction$2(to) ? to.call(this, this) : to,
      isFunction$2(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$2(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend$1(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$2(to) && isArray$2(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend$1(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend$1(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function installLegacyConfigWarnings(config) {
  const legacyConfigOptions = {
    silent: "CONFIG_SILENT",
    devtools: "CONFIG_DEVTOOLS",
    ignoredElements: "CONFIG_IGNORED_ELEMENTS",
    keyCodes: "CONFIG_KEY_CODES",
    productionTip: "CONFIG_PRODUCTION_TIP"
  };
  Object.keys(legacyConfigOptions).forEach((key) => {
    let val = config[key];
    Object.defineProperty(config, key, {
      enumerable: true,
      get() {
        return val;
      },
      set(newVal) {
        if (!isCopyingConfig) {
          warnDeprecation(legacyConfigOptions[key], null);
        }
        val = newVal;
      }
    });
  });
}
function installLegacyOptionMergeStrats(config) {
  config.optionMergeStrategies = new Proxy({}, {
    get(target, key) {
      if (key in target) {
        return target[key];
      }
      if (key in internalOptionMergeStrats && softAssertCompatEnabled(
        "CONFIG_OPTION_MERGE_STRATS",
        null
      )) {
        return internalOptionMergeStrats[key];
      }
    }
  });
}
let isCopyingConfig = false;
let singletonApp;
let singletonCtor;
function createCompatVue$1(createApp2, createSingletonApp) {
  singletonApp = createSingletonApp({});
  const Vue2 = singletonCtor = function Vue22(options = {}) {
    return createCompatApp(options, Vue22);
  };
  function createCompatApp(options = {}, Ctor) {
    assertCompatEnabled("GLOBAL_MOUNT", null);
    const { data } = options;
    if (data && !isFunction$2(data) && softAssertCompatEnabled("OPTIONS_DATA_FN", null)) {
      options.data = () => data;
    }
    const app = createApp2(options);
    if (Ctor !== Vue2) {
      applySingletonPrototype(app, Ctor);
    }
    const vm = app._createRoot(options);
    if (options.el) {
      return vm.$mount(options.el);
    } else {
      return vm;
    }
  }
  Vue2.version = `2.6.14-compat:${"3.5.27"}`;
  Vue2.config = singletonApp.config;
  Vue2.use = (plugin, ...options) => {
    if (plugin && isFunction$2(plugin.install)) {
      plugin.install(Vue2, ...options);
    } else if (isFunction$2(plugin)) {
      plugin(Vue2, ...options);
    }
    return Vue2;
  };
  Vue2.mixin = (m) => {
    singletonApp.mixin(m);
    return Vue2;
  };
  Vue2.component = (name, comp) => {
    if (comp) {
      singletonApp.component(name, comp);
      return Vue2;
    } else {
      return singletonApp.component(name);
    }
  };
  Vue2.directive = (name, dir) => {
    if (dir) {
      singletonApp.directive(name, dir);
      return Vue2;
    } else {
      return singletonApp.directive(name);
    }
  };
  Vue2.options = { _base: Vue2 };
  let cid = 1;
  Vue2.cid = cid;
  Vue2.nextTick = nextTick;
  const extendCache = /* @__PURE__ */ new WeakMap();
  function extendCtor(extendOptions = {}) {
    assertCompatEnabled("GLOBAL_EXTEND", null);
    if (isFunction$2(extendOptions)) {
      extendOptions = extendOptions.options;
    }
    if (extendCache.has(extendOptions)) {
      return extendCache.get(extendOptions);
    }
    const Super = this;
    function SubVue(inlineOptions) {
      if (!inlineOptions) {
        return createCompatApp(SubVue.options, SubVue);
      } else {
        return createCompatApp(
          mergeOptions(
            extend$1({}, SubVue.options),
            inlineOptions,
            internalOptionMergeStrats
          ),
          SubVue
        );
      }
    }
    SubVue.super = Super;
    SubVue.prototype = Object.create(Vue2.prototype);
    SubVue.prototype.constructor = SubVue;
    const mergeBase = {};
    for (const key in Super.options) {
      const superValue = Super.options[key];
      mergeBase[key] = isArray$2(superValue) ? superValue.slice() : isObject$2(superValue) ? extend$1(/* @__PURE__ */ Object.create(null), superValue) : superValue;
    }
    SubVue.options = mergeOptions(
      mergeBase,
      extendOptions,
      internalOptionMergeStrats
    );
    SubVue.options._base = SubVue;
    SubVue.extend = extendCtor.bind(SubVue);
    SubVue.mixin = Super.mixin;
    SubVue.use = Super.use;
    SubVue.cid = ++cid;
    extendCache.set(extendOptions, SubVue);
    return SubVue;
  }
  Vue2.extend = extendCtor.bind(Vue2);
  Vue2.set = (target, key, value) => {
    assertCompatEnabled("GLOBAL_SET", null);
    target[key] = value;
  };
  Vue2.delete = (target, key) => {
    assertCompatEnabled("GLOBAL_DELETE", null);
    delete target[key];
  };
  Vue2.observable = (target) => {
    assertCompatEnabled("GLOBAL_OBSERVABLE", null);
    return /* @__PURE__ */ reactive(target);
  };
  Vue2.filter = (name, filter) => {
    if (filter) {
      singletonApp.filter(name, filter);
      return Vue2;
    } else {
      return singletonApp.filter(name);
    }
  };
  const util = {
    warn: !!(process.env.NODE_ENV !== "production") ? warn$1 : NOOP$1,
    extend: extend$1,
    mergeOptions: (parent, child, vm) => mergeOptions(
      parent,
      child,
      vm ? void 0 : internalOptionMergeStrats
    ),
    defineReactive
  };
  Object.defineProperty(Vue2, "util", {
    get() {
      assertCompatEnabled("GLOBAL_PRIVATE_UTIL", null);
      return util;
    }
  });
  Vue2.configureCompat = configureCompat$1;
  return Vue2;
}
function installAppCompatProperties(app, context, render2) {
  installFilterMethod(app, context);
  installLegacyOptionMergeStrats(app.config);
  if (!singletonApp) {
    return;
  }
  installCompatMount(app, context, render2);
  installLegacyAPIs(app);
  applySingletonAppMutations(app);
  if (!!(process.env.NODE_ENV !== "production")) installLegacyConfigWarnings(app.config);
}
function installFilterMethod(app, context) {
  context.filters = {};
  app.filter = (name, filter) => {
    assertCompatEnabled("FILTERS", null);
    if (!filter) {
      return context.filters[name];
    }
    if (!!(process.env.NODE_ENV !== "production") && context.filters[name]) {
      warn$1(`Filter "${name}" has already been registered.`);
    }
    context.filters[name] = filter;
    return app;
  };
}
function installLegacyAPIs(app) {
  Object.defineProperties(app, {
    // so that app.use() can work with legacy plugins that extend prototypes
    prototype: {
      get() {
        !!(process.env.NODE_ENV !== "production") && warnDeprecation("GLOBAL_PROTOTYPE", null);
        return app.config.globalProperties;
      }
    },
    nextTick: { value: nextTick },
    extend: { value: singletonCtor.extend },
    set: { value: singletonCtor.set },
    delete: { value: singletonCtor.delete },
    observable: { value: singletonCtor.observable },
    util: {
      get() {
        return singletonCtor.util;
      }
    }
  });
}
function applySingletonAppMutations(app) {
  app._context.mixins = [...singletonApp._context.mixins];
  ["components", "directives", "filters"].forEach((key) => {
    app._context[key] = Object.create(singletonApp._context[key]);
  });
  isCopyingConfig = true;
  for (const key in singletonApp.config) {
    if (key === "isNativeTag") continue;
    if (isRuntimeOnly() && (key === "isCustomElement" || key === "compilerOptions")) {
      continue;
    }
    const val = singletonApp.config[key];
    app.config[key] = isObject$2(val) ? Object.create(val) : val;
    if (key === "ignoredElements" && isCompatEnabled("CONFIG_IGNORED_ELEMENTS", null) && !isRuntimeOnly() && isArray$2(val)) {
      app.config.compilerOptions.isCustomElement = (tag) => {
        return val.some((v) => isString$2(v) ? v === tag : v.test(tag));
      };
    }
  }
  isCopyingConfig = false;
  applySingletonPrototype(app, singletonCtor);
}
function applySingletonPrototype(app, Ctor) {
  const enabled = isCompatEnabled("GLOBAL_PROTOTYPE", null);
  if (enabled) {
    app.config.globalProperties = Object.create(Ctor.prototype);
  }
  let hasPrototypeAugmentations = false;
  for (const key of Object.getOwnPropertyNames(Ctor.prototype)) {
    if (key !== "constructor") {
      hasPrototypeAugmentations = true;
      if (enabled) {
        Object.defineProperty(
          app.config.globalProperties,
          key,
          Object.getOwnPropertyDescriptor(Ctor.prototype, key)
        );
      }
    }
  }
  if (!!(process.env.NODE_ENV !== "production") && hasPrototypeAugmentations) {
    warnDeprecation("GLOBAL_PROTOTYPE", null);
  }
}
function installCompatMount(app, context, render2) {
  let isMounted = false;
  app._createRoot = (options) => {
    const component = app._component;
    const vnode = createVNode(component, options.propsData || null);
    vnode.appContext = context;
    const hasNoRender = !isFunction$2(component) && !component.render && !component.template;
    const emptyRender = () => {
    };
    const instance = createComponentInstance$1(vnode, null, null);
    if (hasNoRender) {
      instance.render = emptyRender;
    }
    setupComponent$1(instance);
    vnode.component = instance;
    vnode.isCompatRoot = true;
    instance.ctx._compat_mount = (selectorOrEl) => {
      if (isMounted) {
        !!(process.env.NODE_ENV !== "production") && warn$1(`Root instance is already mounted.`);
        return;
      }
      let container;
      if (typeof selectorOrEl === "string") {
        const result = document.querySelector(selectorOrEl);
        if (!result) {
          !!(process.env.NODE_ENV !== "production") && warn$1(
            `Failed to mount root instance: selector "${selectorOrEl}" returned null.`
          );
          return;
        }
        container = result;
      } else {
        container = selectorOrEl || document.createElement("div");
      }
      let namespace;
      if (container instanceof SVGElement) namespace = "svg";
      else if (typeof MathMLElement === "function" && container instanceof MathMLElement)
        namespace = "mathml";
      if (!!(process.env.NODE_ENV !== "production")) {
        context.reload = () => {
          const cloned = cloneVNode(vnode);
          cloned.component = null;
          render2(cloned, container, namespace);
        };
      }
      if (hasNoRender && instance.render === emptyRender) {
        if (!!(process.env.NODE_ENV !== "production")) {
          for (let i = 0; i < container.attributes.length; i++) {
            const attr = container.attributes[i];
            if (attr.name !== "v-cloak" && /^(?:v-|:|@)/.test(attr.name)) {
              warnDeprecation("GLOBAL_MOUNT_CONTAINER", null);
              break;
            }
          }
        }
        instance.render = null;
        component.template = container.innerHTML;
        finishComponentSetup(
          instance,
          false,
          true
          /* skip options */
        );
      }
      container.textContent = "";
      render2(vnode, container, namespace);
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      isMounted = true;
      app._container = container;
      container.__vue_app__ = app;
      if (!!(process.env.NODE_ENV !== "production") || false) {
        devtoolsInitApp(app, version);
      }
      return instance.proxy;
    };
    instance.ctx._compat_destroy = () => {
      if (isMounted) {
        render2(null, app._container);
        if (!!(process.env.NODE_ENV !== "production") || false) {
          devtoolsUnmountApp(app);
        }
        delete app._container.__vue_app__;
      } else {
        const { bum, scope, um } = instance;
        if (bum) {
          invokeArrayFns$1(bum);
        }
        if (isCompatEnabled("INSTANCE_EVENT_HOOKS", instance)) {
          instance.emit("hook:beforeDestroy");
        }
        if (scope) {
          scope.stop();
        }
        if (um) {
          invokeArrayFns$1(um);
        }
        if (isCompatEnabled("INSTANCE_EVENT_HOOKS", instance)) {
          instance.emit("hook:destroyed");
        }
      }
    };
    return instance.proxy;
  };
}
const methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];
const patched = /* @__PURE__ */ new WeakSet();
function defineReactive(obj, key, val) {
  if (isObject$2(val) && !/* @__PURE__ */ isReactive(val) && !patched.has(val)) {
    const reactiveVal = /* @__PURE__ */ reactive(val);
    if (isArray$2(val)) {
      methodsToPatch.forEach((m) => {
        val[m] = (...args) => {
          Array.prototype[m].apply(reactiveVal, args);
        };
      });
    } else {
      Object.keys(val).forEach((key2) => {
        try {
          defineReactiveSimple(val, key2, val[key2]);
        } catch (e) {
        }
      });
    }
  }
  const i = obj.$;
  if (i && obj === i.proxy) {
    defineReactiveSimple(i.ctx, key, val);
    i.accessCache = /* @__PURE__ */ Object.create(null);
  } else if (/* @__PURE__ */ isReactive(obj)) {
    obj[key] = val;
  } else {
    defineReactiveSimple(obj, key, val);
  }
}
function defineReactiveSimple(obj, key, val) {
  val = isObject$2(val) ? /* @__PURE__ */ reactive(val) : val;
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      track(obj, "get", key);
      return val;
    },
    set(newVal) {
      val = isObject$2(newVal) ? /* @__PURE__ */ reactive(newVal) : newVal;
      trigger(obj, "set", key, newVal);
    }
  });
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO$1,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render2, hydrate2) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction$2(rootComponent)) {
      rootComponent = extend$1({}, rootComponent);
    }
    if (rootProps != null && !isObject$2(rootProps)) {
      !!(process.env.NODE_ENV !== "production") && warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const pluginCleanupFns = [];
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        if (!!(process.env.NODE_ENV !== "production")) {
          warn$1(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          !!(process.env.NODE_ENV !== "production") && warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin && isFunction$2(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction$2(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else if (!!(process.env.NODE_ENV !== "production")) {
          warn$1(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else if (!!(process.env.NODE_ENV !== "production")) {
            warn$1(
              "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        }
        return app;
      },
      component(name, component) {
        if (!!(process.env.NODE_ENV !== "production")) {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (!!(process.env.NODE_ENV !== "production") && context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!!(process.env.NODE_ENV !== "production")) {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (!!(process.env.NODE_ENV !== "production") && context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          if (!!(process.env.NODE_ENV !== "production") && rootContainer.__vue_app__) {
            warn$1(
              `There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`
            );
          }
          const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          if (!!(process.env.NODE_ENV !== "production")) {
            context.reload = () => {
              const cloned = cloneVNode(vnode);
              cloned.el = null;
              render2(cloned, rootContainer, namespace);
            };
          }
          if (isHydrate && hydrate2) {
            hydrate2(vnode, rootContainer);
          } else {
            render2(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          if (!!(process.env.NODE_ENV !== "production") || false) {
            app._instance = vnode.component;
            devtoolsInitApp(app, version);
          }
          return getComponentPublicInstance(vnode.component);
        } else if (!!(process.env.NODE_ENV !== "production")) {
          warn$1(
            `App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``
          );
        }
      },
      onUnmount(cleanupFn) {
        if (!!(process.env.NODE_ENV !== "production") && typeof cleanupFn !== "function") {
          warn$1(
            `Expected function as first argument to app.onUnmount(), but got ${typeof cleanupFn}`
          );
        }
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(
            pluginCleanupFns,
            app._instance,
            16
          );
          render2(null, app._container);
          if (!!(process.env.NODE_ENV !== "production") || false) {
            app._instance = null;
            devtoolsUnmountApp(app);
          }
          delete app._container.__vue_app__;
        } else if (!!(process.env.NODE_ENV !== "production")) {
          warn$1(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value) {
        if (!!(process.env.NODE_ENV !== "production") && key in context.provides) {
          if (hasOwn$2(context.provides, key)) {
            warn$1(
              `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
            );
          } else {
            warn$1(
              `App already provides property with key "${String(key)}" inherited from its parent element. It will be overwritten with the new value.`
            );
          }
        }
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    {
      installAppCompatProperties(app, context, render2);
    }
    return app;
  };
}
let currentApp = null;
const compatModelEventPrefix = `onModelCompat:`;
const warnedTypes = /* @__PURE__ */ new WeakSet();
function convertLegacyVModelProps(vnode) {
  const { type, shapeFlag, props, dynamicProps } = vnode;
  const comp = type;
  if (shapeFlag & 6 && props && "modelValue" in props) {
    if (!isCompatEnabled(
      "COMPONENT_V_MODEL",
      // this is a special case where we want to use the vnode component's
      // compat config instead of the current rendering instance (which is the
      // parent of the component that exposes v-model)
      { type }
    )) {
      return;
    }
    if (!!(process.env.NODE_ENV !== "production") && !warnedTypes.has(comp)) {
      pushWarningContext$1(vnode);
      warnDeprecation(
        "COMPONENT_V_MODEL",
        {
          type,
          appContext: vnode.ctx && vnode.ctx.appContext || createAppContext()
        },
        comp
      );
      popWarningContext$1();
      warnedTypes.add(comp);
    }
    const model = comp.model || {};
    applyModelFromMixins(model, comp.mixins);
    const { prop = "value", event = "input" } = model;
    if (prop !== "modelValue") {
      props[prop] = props.modelValue;
      delete props.modelValue;
    }
    if (dynamicProps) {
      dynamicProps[dynamicProps.indexOf("modelValue")] = prop;
    }
    props[compatModelEventPrefix + event] = props["onUpdate:modelValue"];
    delete props["onUpdate:modelValue"];
  }
}
function applyModelFromMixins(model, mixins) {
  if (mixins) {
    mixins.forEach((m) => {
      if (m.model) extend$1(model, m.model);
      if (m.mixins) applyModelFromMixins(model, m.mixins);
    });
  }
}
function compatModelEmit(instance, event, args) {
  if (!isCompatEnabled("COMPONENT_V_MODEL", instance)) {
    return;
  }
  const props = instance.vnode.props;
  const modelHandler = props && props[compatModelEventPrefix + event];
  if (modelHandler) {
    callWithErrorHandling(
      modelHandler,
      instance,
      6,
      args
    );
  }
}
function useModel(props, name, options = EMPTY_OBJ$1) {
  const i = getCurrentInstance$1();
  if (!!(process.env.NODE_ENV !== "production") && !i) {
    warn$1(`useModel() called without active instance.`);
    return /* @__PURE__ */ ref();
  }
  const camelizedName = camelize$1(name);
  if (!!(process.env.NODE_ENV !== "production") && !i.propsOptions[0][camelizedName]) {
    warn$1(`useModel() called with prop "${name}" which is not declared.`);
    return /* @__PURE__ */ ref();
  }
  const hyphenatedName = hyphenate$1(name);
  const modifiers = getModelModifiers(props, camelizedName);
  const res = customRef((track2, trigger2) => {
    let localValue;
    let prevSetValue = EMPTY_OBJ$1;
    let prevEmittedValue;
    watchSyncEffect(() => {
      const propValue = props[camelizedName];
      if (hasChanged$1(localValue, propValue)) {
        localValue = propValue;
        trigger2();
      }
    });
    return {
      get() {
        track2();
        return options.get ? options.get(localValue) : localValue;
      },
      set(value) {
        const emittedValue = options.set ? options.set(value) : value;
        if (!hasChanged$1(emittedValue, localValue) && !(prevSetValue !== EMPTY_OBJ$1 && hasChanged$1(value, prevSetValue))) {
          return;
        }
        const rawProps = i.vnode.props;
        if (!(rawProps && // check if parent has passed v-model
        (name in rawProps || camelizedName in rawProps || hyphenatedName in rawProps) && (`onUpdate:${name}` in rawProps || `onUpdate:${camelizedName}` in rawProps || `onUpdate:${hyphenatedName}` in rawProps))) {
          localValue = value;
          trigger2();
        }
        i.emit(`update:${name}`, emittedValue);
        if (hasChanged$1(value, emittedValue) && hasChanged$1(value, prevSetValue) && !hasChanged$1(emittedValue, prevEmittedValue)) {
          trigger2();
        }
        prevSetValue = value;
        prevEmittedValue = emittedValue;
      }
    };
  });
  res[Symbol.iterator] = () => {
    let i2 = 0;
    return {
      next() {
        if (i2 < 2) {
          return { value: i2++ ? modifiers || EMPTY_OBJ$1 : res, done: false };
        } else {
          return { done: true };
        }
      }
    };
  };
  return res;
}
const getModelModifiers = (props, modelName) => {
  return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize$1(modelName)}Modifiers`] || props[`${hyphenate$1(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props = instance.vnode.props || EMPTY_OBJ$1;
  if (!!(process.env.NODE_ENV !== "production")) {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && !(event.startsWith("hook:") || event.startsWith(compatModelEventPrefix))) {
        if (!propsOptions || !(toHandlerKey$1(camelize$1(event)) in propsOptions)) {
          warn$1(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey$1(camelize$1(event))}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction$2(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isCompatModelListener = compatModelEventPrefix + event in props;
  const isModelListener2 = isCompatModelListener || event.startsWith("update:");
  const modifiers = isCompatModelListener ? props.modelModifiers : isModelListener2 && getModelModifiers(props, event.slice(7));
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map((a) => isString$2(a) ? a.trim() : a);
    }
    if (modifiers.number) {
      args = rawArgs.map(looseToNumber$1);
    }
  }
  if (!!(process.env.NODE_ENV !== "production") || false) {
    devtoolsComponentEmit(instance, event, args);
  }
  if (!!(process.env.NODE_ENV !== "production")) {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey$1(lowerCaseEvent)]) {
      warn$1(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate$1(
          event
        )}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey$1(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey$1(camelize$1(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey$1(hyphenate$1(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
  {
    compatModelEmit(instance, event, args);
    return emit$1(instance, event, args);
  }
}
const mixinEmitsCache = /* @__PURE__ */ new WeakMap();
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache2 = asMixin ? mixinEmitsCache : appContext.emitsCache;
  const cached = cache2.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$2(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend$1(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$2(comp)) {
      cache2.set(comp, null);
    }
    return null;
  }
  if (isArray$2(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend$1(normalized, raw);
  }
  if (isObject$2(comp)) {
    cache2.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn$1(key)) {
    return false;
  }
  if (key.startsWith(compatModelEventPrefix)) {
    return true;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$2(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$2(options, hyphenate$1(key)) || hasOwn$2(options, key);
}
let accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot$1(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render: render2,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance$1(instance);
  let result;
  let fallthroughAttrs;
  if (!!(process.env.NODE_ENV !== "production")) {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = !!(process.env.NODE_ENV !== "production") && setupState.__isScriptSetup ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode$1(
        render2.call(
          thisProxy,
          proxyToUse,
          renderCache,
          !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(props) : props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render22 = Component;
      if (!!(process.env.NODE_ENV !== "production") && attrs === props) {
        markAttrsAccessed();
      }
      result = normalizeVNode$1(
        render22.length > 1 ? render22(
          !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(props) : props,
          !!(process.env.NODE_ENV !== "production") ? {
            get attrs() {
              markAttrsAccessed();
              return /* @__PURE__ */ shallowReadonly(attrs);
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render22(
          !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(props) : props,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  let setRoot = void 0;
  if (!!(process.env.NODE_ENV !== "production") && result.patchFlag > 0 && result.patchFlag & 2048) {
    [root, setRoot] = getChildRoot(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener$1)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs, false, true);
      } else if (!!(process.env.NODE_ENV !== "production") && !accessedAttrs && root.type !== Comment) {
        const allAttrs = Object.keys(attrs);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i = 0, l = allAttrs.length; i < l; i++) {
          const key = allAttrs[i];
          if (isOn$1(key)) {
            if (!isModelListener$1(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn$1(
            `Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
          );
        }
        if (eventAttrs.length) {
          warn$1(
            `Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
          );
        }
      }
    }
  }
  if (isCompatEnabled("INSTANCE_ATTRS_CLASS_STYLE", instance) && vnode.shapeFlag & 4 && root.shapeFlag & (1 | 6)) {
    const { class: cls, style } = vnode.props || {};
    if (cls || style) {
      if (!!(process.env.NODE_ENV !== "production") && inheritAttrs === false) {
        warnDeprecation(
          "INSTANCE_ATTRS_CLASS_STYLE",
          instance,
          getComponentName(instance.type)
        );
      }
      root = cloneVNode(
        root,
        {
          class: cls,
          style
        },
        false,
        true
      );
    }
  }
  if (vnode.dirs) {
    if (!!(process.env.NODE_ENV !== "production") && !isElementRoot(root)) {
      warn$1(
        `Runtime directive used on component with non-element root node. The directives will not function as intended.`
      );
    }
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (!!(process.env.NODE_ENV !== "production") && !isElementRoot(root)) {
      warn$1(
        `Component inside <Transition> renders non-element root node that cannot be animated.`
      );
    }
    setTransitionHooks(root, vnode.transition);
  }
  if (!!(process.env.NODE_ENV !== "production") && setRoot) {
    setRoot(root);
  } else {
    result = root;
  }
  setCurrentRenderingInstance$1(prev);
  return result;
}
const getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren, false);
  if (!childRoot) {
    return [vnode, void 0];
  } else if (!!(process.env.NODE_ENV !== "production") && childRoot.patchFlag > 0 && childRoot.patchFlag & 2048) {
    return getChildRoot(childRoot);
  }
  const index = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode$1(childRoot), setRoot];
};
function filterSingleRoot(children, recurse = true) {
  let singleRoot;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNode$3(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
          if (!!(process.env.NODE_ENV !== "production") && recurse && singleRoot.patchFlag > 0 && singleRoot.patchFlag & 2048) {
            return filterSingleRoot(singleRoot.children);
          }
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn$1(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener$1(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
const isElementRoot = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (!!(process.env.NODE_ENV !== "production") && (prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}
function createPropsDefaultThis(instance, rawProps, propKey) {
  return new Proxy(
    {},
    {
      get(_, key) {
        !!(process.env.NODE_ENV !== "production") && warnDeprecation("PROPS_DEFAULT_THIS", null, propKey);
        if (key === "$options") {
          return resolveMergedOptions(instance);
        }
        if (key in rawProps) {
          return rawProps[key];
        }
        const injections = instance.type.inject;
        if (injections) {
          if (isArray$2(injections)) {
            if (injections.includes(key)) {
              return inject(key);
            }
          } else if (key in injections) {
            return inject(key);
          }
        }
      }
    }
  );
}
function shouldSkipAttr(key, instance) {
  if (key === "is") {
    return true;
  }
  if ((key === "class" || key === "style") && isCompatEnabled("INSTANCE_ATTRS_CLASS_STYLE", instance)) {
    return true;
  }
  if (isOn$1(key) && isCompatEnabled("INSTANCE_LISTENERS", instance)) {
    return true;
  }
  if (key.startsWith("routerView") || key === "registerRouteInstance") {
    return true;
  }
  return false;
}
const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (!!(process.env.NODE_ENV !== "production")) {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : /* @__PURE__ */ shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId) return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = /* @__PURE__ */ toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(!!(process.env.NODE_ENV !== "production") && isInHmrContext(instance)) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn$2(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize$1(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          {
            if (isOn$1(key) && key.endsWith("Native")) {
              key = key.slice(0, -6);
            } else if (shouldSkipAttr(key, instance)) {
              continue;
            }
          }
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn$2(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate$1(key)) === key || !hasOwn$2(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$2(rawProps, key) && !hasOwn$2(rawProps, key + "Native")) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
  if (!!(process.env.NODE_ENV !== "production")) {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp$1(key)) {
        continue;
      }
      {
        if (key.startsWith("onHook:")) {
          softAssertCompatEnabled(
            "INSTANCE_EVENT_HOOKS",
            instance,
            key.slice(2).toLowerCase()
          );
        }
        if (key === "inline-template") {
          continue;
        }
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn$2(options, camelKey = camelize$1(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        {
          if (isOn$1(key) && key.endsWith("Native")) {
            key = key.slice(0, -6);
          } else if (shouldSkipAttr(key, instance)) {
            continue;
          }
        }
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = /* @__PURE__ */ toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ$1;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn$2(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$2(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction$2(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            isCompatEnabled("PROPS_DEFAULT_THIS", instance) ? createPropsDefaultThis(instance, props, key) : null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
      if (instance.ce) {
        instance.ce._setProp(key, value);
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate$1(key))) {
        value = true;
      }
    }
  }
  return value;
}
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache2 = asMixin ? mixinPropsCache : appContext.propsCache;
  const cached = cache2.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$2(comp)) {
    const extendProps = (raw2) => {
      if (isFunction$2(raw2)) {
        raw2 = raw2.options;
      }
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend$1(normalized, props);
      if (keys) needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$2(comp)) {
      cache2.set(comp, EMPTY_ARR$1);
    }
    return EMPTY_ARR$1;
  }
  if (isArray$2(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!!(process.env.NODE_ENV !== "production") && !isString$2(raw[i])) {
        warn$1(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize$1(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ$1;
      }
    }
  } else if (raw) {
    if (!!(process.env.NODE_ENV !== "production") && !isObject$2(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize$1(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$2(opt) || isFunction$2(opt) ? { type: opt } : extend$1({}, opt);
        const propType = prop.type;
        let shouldCast = false;
        let shouldCastTrue = true;
        if (isArray$2(propType)) {
          for (let index = 0; index < propType.length; ++index) {
            const type = propType[index];
            const typeName = isFunction$2(type) && type.name;
            if (typeName === "Boolean") {
              shouldCast = true;
              break;
            } else if (typeName === "String") {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction$2(propType) && propType.name === "Boolean";
        }
        prop[
          0
          /* shouldCast */
        ] = shouldCast;
        prop[
          1
          /* shouldCastTrue */
        ] = shouldCastTrue;
        if (shouldCast || hasOwn$2(prop, "default")) {
          needCastKeys.push(normalizedKey);
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$2(comp)) {
    cache2.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp$1(key)) {
    return true;
  } else if (!!(process.env.NODE_ENV !== "production")) {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = /* @__PURE__ */ toRaw(props);
  const options = instance.propsOptions[0];
  const camelizePropsKey = Object.keys(rawProps).map((key) => camelize$1(key));
  for (const key in options) {
    let opt = options[key];
    if (opt == null) continue;
    validateProp(
      key,
      resolvedValues[key],
      opt,
      !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(resolvedValues) : resolvedValues,
      !camelizePropsKey.includes(key)
    );
  }
}
function validateProp(name, value, prop, props, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray$2(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, props)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap$1(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (expectedType === "null") {
    valid = value === null;
  } else if (isSimpleType(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$2(value);
  } else if (expectedType === "Array") {
    valid = isArray$2(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize$2).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType$1(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
const isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
const normalizeSlotValue = (value) => isArray$2(value) ? value.map(normalizeVNode$1) : [normalizeVNode$1(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (!!(process.env.NODE_ENV !== "production") && currentInstance && !(ctx === null && currentRenderingInstance) && !(ctx && ctx.root !== currentInstance.root)) {
      warn$1(
        `Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
      );
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction$2(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      if (!!(process.env.NODE_ENV !== "production") && !isCompatEnabled("RENDER_FUNCTION", instance)) {
        warn$1(
          `Non-function value encountered for slot "${key}". Prefer function slots for better performance.`
        );
      }
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  if (!!(process.env.NODE_ENV !== "production") && !isKeepAlive(instance.vnode) && !isCompatEnabled("RENDER_FUNCTION", instance)) {
    warn$1(
      `Non-function value encountered for default slot. Prefer function slots for better performance.`
    );
  }
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const assignSlots = (slots, children, optimized) => {
  for (const key in children) {
    if (optimized || !isInternalKey(key)) {
      slots[key] = children[key];
    }
  }
};
const initSlots = (instance, children, optimized) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def$1(slots, "_", type, true);
      }
    } else {
      normalizeObjectSlots(children, slots, instance);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ$1;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (!!(process.env.NODE_ENV !== "production") && isHmrUpdating) {
        assignSlots(slots, children, optimized);
        trigger(instance, "set", "$slots");
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        assignSlots(slots, children, optimized);
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots, instance);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  if (!!(process.env.NODE_ENV !== "production") || false) {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    const measureName = `<${formatComponentName(instance, instance.type)}> ${type}`;
    perf.mark(endTag);
    perf.measure(measureName, startTag, endTag);
    perf.clearMeasures(measureName);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  if (!!(process.env.NODE_ENV !== "production") || false) {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
function initFeatureFlags$2() {
  const needWarn = [];
  if (!!(process.env.NODE_ENV !== "production") && needWarn.length) {
    const multi = needWarn.length > 1;
    console.warn(
      `Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags$2();
  }
  const target = getGlobalThis$2();
  target.__VUE__ = true;
  if (!!(process.env.NODE_ENV !== "production") || false) {
    setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP$1,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!(process.env.NODE_ENV !== "production") && isHmrUpdating ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        } else if (!!(process.env.NODE_ENV !== "production")) {
          patchStaticNode(n1, n2, container, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (!!(process.env.NODE_ENV !== "production")) {
          warn$1("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    } else if (ref2 == null && n1 && n1.ref != null) {
      setRef(n1.ref, null, parentSuspense, n1, true);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        if (!!(process.env.NODE_ENV !== "production") && isHmrUpdating && n2.patchFlag === -1 && "__elIndex" in n1) {
          const childNodes = container.childNodes;
          const newChild = hostCreateText(n2.children);
          const oldChild = childNodes[n2.__elIndex = n1.__elIndex];
          hostInsert(newChild, container, oldChild);
          hostRemove(oldChild);
        } else {
          hostSetText(el, n2.children);
        }
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const patchStaticNode = (n1, n2, container, namespace) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        namespace
      );
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      const customElement = !!(n1.el && n1.el._isVueCE) ? n1.el : null;
      try {
        if (customElement) {
          customElement._beginPatch();
        }
        patchElement(
          n1,
          n2,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } finally {
        if (customElement) {
          customElement._endPatch();
        }
      }
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp$1(key)) {
          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (!!(process.env.NODE_ENV !== "production") || false) {
      def$1(el, "__vnode", vnode, true);
      def$1(el, "__vueParentComponent", parentComponent, true);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (!!(process.env.NODE_ENV !== "production") && subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode$1(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    if (!!(process.env.NODE_ENV !== "production") || false) {
      el.__vnode = n2;
    }
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ$1;
    const newProps = n2.props || EMPTY_OBJ$1;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (!!(process.env.NODE_ENV !== "production") && isHmrUpdating) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
      if (!!(process.env.NODE_ENV !== "production")) {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, oldProps, newProps, parentComponent, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ$1) {
        for (const key in oldProps) {
          if (!isReservedProp$1(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              parentComponent
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp$1(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (!!(process.env.NODE_ENV !== "production") && // #5523 dev root fragment may inherit directives
    (isHmrUpdating || patchFlag & 2048)) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (!!(process.env.NODE_ENV !== "production")) {
          traverseStaticChildren(n1, n2);
        } else if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const compatMountInstance = initialVNode.isCompatRoot && initialVNode.component;
    const instance = compatMountInstance || (initialVNode.component = createComponentInstance$1(
      initialVNode,
      parentComponent,
      parentSuspense
    ));
    if (!!(process.env.NODE_ENV !== "production") && instance.type.__hmrId) {
      registerHMR(instance);
    }
    if (!!(process.env.NODE_ENV !== "production")) {
      pushWarningContext$1(initialVNode);
      startMeasure(instance, `mount`);
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    if (!compatMountInstance) {
      if (!!(process.env.NODE_ENV !== "production")) {
        startMeasure(instance, `init`);
      }
      setupComponent$1(instance, false, optimized);
      if (!!(process.env.NODE_ENV !== "production")) {
        endMeasure(instance, `init`);
      }
    }
    if (!!(process.env.NODE_ENV !== "production") && isHmrUpdating) initialVNode.el = null;
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
        initialVNode.placeholder = placeholder.el;
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
    if (!!(process.env.NODE_ENV !== "production")) {
      popWarningContext$1();
      endMeasure(instance, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        if (!!(process.env.NODE_ENV !== "production")) {
          pushWarningContext$1(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        if (!!(process.env.NODE_ENV !== "production")) {
          popWarningContext$1();
        }
        return;
      } else {
        instance.next = n2;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent, root, type } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns$1(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        if (isCompatEnabled("INSTANCE_EVENT_HOOKS", instance)) {
          instance.emit("hook:beforeMount");
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            if (!!(process.env.NODE_ENV !== "production")) {
              startMeasure(instance, `render`);
            }
            instance.subTree = renderComponentRoot$1(instance);
            if (!!(process.env.NODE_ENV !== "production")) {
              endMeasure(instance, `render`);
            }
            if (!!(process.env.NODE_ENV !== "production")) {
              startMeasure(instance, `hydrate`);
            }
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
            if (!!(process.env.NODE_ENV !== "production")) {
              endMeasure(instance, `hydrate`);
            }
          };
          if (isAsyncWrapperVNode && type.__asyncHydrate) {
            type.__asyncHydrate(
              el,
              instance,
              hydrateSubTree
            );
          } else {
            hydrateSubTree();
          }
        } else {
          if (root.ce && // @ts-expect-error _def is private
          root.ce._def.shadowRoot !== false) {
            root.ce._injectChildStyle(type);
          }
          if (!!(process.env.NODE_ENV !== "production")) {
            startMeasure(instance, `render`);
          }
          const subTree = instance.subTree = renderComponentRoot$1(instance);
          if (!!(process.env.NODE_ENV !== "production")) {
            endMeasure(instance, `render`);
          }
          if (!!(process.env.NODE_ENV !== "production")) {
            startMeasure(instance, `patch`);
          }
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          if (!!(process.env.NODE_ENV !== "production")) {
            endMeasure(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (isCompatEnabled("INSTANCE_EVENT_HOOKS", instance)) {
          queuePostRenderEffect(
            () => instance.emit("hook:mounted"),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          if (isCompatEnabled("INSTANCE_EVENT_HOOKS", instance)) {
            queuePostRenderEffect(
              () => instance.emit("hook:activated"),
              parentSuspense
            );
          }
        }
        instance.isMounted = true;
        if (!!(process.env.NODE_ENV !== "production") || false) {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        if (!!(process.env.NODE_ENV !== "production")) {
          pushWarningContext$1(next || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns$1(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        if (isCompatEnabled("INSTANCE_EVENT_HOOKS", instance)) {
          instance.emit("hook:beforeUpdate");
        }
        toggleRecurse(instance, true);
        if (!!(process.env.NODE_ENV !== "production")) {
          startMeasure(instance, `render`);
        }
        const nextTree = renderComponentRoot$1(instance);
        if (!!(process.env.NODE_ENV !== "production")) {
          endMeasure(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        if (!!(process.env.NODE_ENV !== "production")) {
          startMeasure(instance, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        if (!!(process.env.NODE_ENV !== "production")) {
          endMeasure(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
        if (isCompatEnabled("INSTANCE_EVENT_HOOKS", instance)) {
          queuePostRenderEffect(
            () => instance.emit("hook:updated"),
            parentSuspense
          );
        }
        if (!!(process.env.NODE_ENV !== "production") || false) {
          devtoolsComponentUpdated(instance);
        }
        if (!!(process.env.NODE_ENV !== "production")) {
          popWarningContext$1();
        }
      }
    };
    instance.scope.on();
    const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
    instance.scope.off();
    const update = instance.update = effect2.run.bind(effect2);
    const job = instance.job = effect2.runIfDirty.bind(effect2);
    job.i = instance;
    job.id = instance.uid;
    effect2.scheduler = () => queueJob(job);
    toggleRecurse(instance, true);
    if (!!(process.env.NODE_ENV !== "production")) {
      effect2.onTrack = instance.rtc ? (e) => invokeArrayFns$1(instance.rtc, e) : void 0;
      effect2.onTrigger = instance.rtg ? (e) => invokeArrayFns$1(instance.rtg, e) : void 0;
    }
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR$1;
    c2 = c2 || EMPTY_ARR$1;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode$1(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode$1(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode$1(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode$1(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode$1(c2[i]);
        if (nextChild.key != null) {
          if (!!(process.env.NODE_ENV !== "production") && keyToNewIndexMap.has(nextChild.key)) {
            warn$1(
              `Duplicate keys found during update:`,
              JSON.stringify(nextChild.key),
              `Make sure keys are unique.`
            );
          }
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched2 = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched2 >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched2++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR$1;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchorVNode = c2[nextIndex + 1];
        const anchor = nextIndex + 1 < l2 ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode)
        ) : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => {
          if (vnode.ctx.isUnmounted) {
            hostRemove(el);
          } else {
            hostInsert(el, container, anchor);
          }
        };
        const performLeave = () => {
          if (el._isLeaving) {
            el[leaveCbKey](
              true
              /* cancelled */
            );
          }
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref2,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex
    } = vnode;
    if (patchFlag === -2) {
      optimized = false;
    }
    if (ref2 != null) {
      pauseTracking();
      setRef(ref2, null, parentSuspense, vnode, true);
      resetTracking();
    }
    if (cacheIndex != null) {
      parentComponent.renderCache[cacheIndex] = void 0;
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if (!!(process.env.NODE_ENV !== "production") && vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach((child) => {
          if (child.type === Comment) {
            hostRemove(child.el);
          } else {
            remove2(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (!!(process.env.NODE_ENV !== "production") && instance.type.__hmrId) {
      unregisterHMR(instance);
    }
    const { bum, scope, job, subTree, um, m, a } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns$1(bum);
    }
    if (isCompatEnabled("INSTANCE_EVENT_HOOKS", instance)) {
      instance.emit("hook:beforeDestroy");
    }
    scope.stop();
    if (job) {
      job.flags |= 8;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    if (isCompatEnabled("INSTANCE_EVENT_HOOKS", instance)) {
      queuePostRenderEffect(
        () => instance.emit("hook:destroyed"),
        parentSuspense
      );
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (!!(process.env.NODE_ENV !== "production") || false) {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  let isFlushing = false;
  const render2 = (vnode, container, namespace) => {
    let instance;
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
        instance = container._vnode.component;
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    container._vnode = vnode;
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs(instance);
      flushPostFlushCbs();
      isFlushing = false;
    }
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate2;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate2, hydrateNode] = createHydrationFns(
      internals
    );
  }
  return {
    render: render2,
    hydrate: hydrate2,
    createApp: createAppAPI(render2, hydrate2)
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, job }, allowed) {
  if (allowed) {
    effect2.flags |= 32;
    job.flags |= 4;
  } else {
    effect2.flags &= -33;
    job.flags &= -5;
  }
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$2(ch1) && isArray$2(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow && c2.patchFlag !== -2)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        if (c2.patchFlag !== -1) {
          c2.el = c1.el;
        } else {
          c2.__elIndex = i + // take fragment start anchor into account
          (n1.type === Fragment ? 1 : 0);
        }
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
      if (!!(process.env.NODE_ENV !== "production")) {
        c2.el && (c2.el.__vnode = c2);
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function invalidateMount(hooks) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++)
      hooks[i].flags |= 8;
  }
}
function resolveAsyncComponentPlaceholder(anchorVnode) {
  if (anchorVnode.placeholder) {
    return anchorVnode.placeholder;
  }
  const instance = anchorVnode.component;
  if (instance) {
    return resolveAsyncComponentPlaceholder(instance.subTree);
  }
  return null;
}
const isSuspense = (type) => type.__isSuspense;
let suspenseId = 0;
const SuspenseImpl = {
  name: "Suspense",
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
    if (n1 == null) {
      mountSuspense(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        rendererInternals
      );
    } else {
      if (parentSuspense && parentSuspense.deps > 0 && !n1.suspense.isInFallback) {
        n2.suspense = n1.suspense;
        n2.suspense.vnode = n2;
        n2.el = n1.el;
        return;
      }
      patchSuspense(
        n1,
        n2,
        container,
        anchor,
        parentComponent,
        namespace,
        slotScopeIds,
        optimized,
        rendererInternals
      );
    }
  },
  hydrate: hydrateSuspense,
  normalize: normalizeSuspenseChildren
};
const Suspense = SuspenseImpl;
function triggerEvent(vnode, name) {
  const eventListener = vnode.props && vnode.props[name];
  if (isFunction$2(eventListener)) {
    eventListener();
  }
}
function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
  const {
    p: patch,
    o: { createElement }
  } = rendererInternals;
  const hiddenContainer = createElement("div");
  const suspense = vnode.suspense = createSuspenseBoundary(
    vnode,
    parentSuspense,
    parentComponent,
    container,
    hiddenContainer,
    anchor,
    namespace,
    slotScopeIds,
    optimized,
    rendererInternals
  );
  patch(
    null,
    suspense.pendingBranch = vnode.ssContent,
    hiddenContainer,
    null,
    parentComponent,
    suspense,
    namespace,
    slotScopeIds
  );
  if (suspense.deps > 0) {
    triggerEvent(vnode, "onPending");
    triggerEvent(vnode, "onFallback");
    patch(
      null,
      vnode.ssFallback,
      container,
      anchor,
      parentComponent,
      null,
      // fallback tree will not have suspense context
      namespace,
      slotScopeIds
    );
    setActiveBranch(suspense, vnode.ssFallback);
  } else {
    suspense.resolve(false, true);
  }
}
function patchSuspense(n1, n2, container, anchor, parentComponent, namespace, slotScopeIds, optimized, { p: patch, um: unmount, o: { createElement } }) {
  const suspense = n2.suspense = n1.suspense;
  suspense.vnode = n2;
  n2.el = n1.el;
  const newBranch = n2.ssContent;
  const newFallback = n2.ssFallback;
  const { activeBranch, pendingBranch, isInFallback, isHydrating } = suspense;
  if (pendingBranch) {
    suspense.pendingBranch = newBranch;
    if (isSameVNodeType(pendingBranch, newBranch)) {
      patch(
        pendingBranch,
        newBranch,
        suspense.hiddenContainer,
        null,
        parentComponent,
        suspense,
        namespace,
        slotScopeIds,
        optimized
      );
      if (suspense.deps <= 0) {
        suspense.resolve();
      } else if (isInFallback) {
        if (!isHydrating) {
          patch(
            activeBranch,
            newFallback,
            container,
            anchor,
            parentComponent,
            null,
            // fallback tree will not have suspense context
            namespace,
            slotScopeIds,
            optimized
          );
          setActiveBranch(suspense, newFallback);
        }
      }
    } else {
      suspense.pendingId = suspenseId++;
      if (isHydrating) {
        suspense.isHydrating = false;
        suspense.activeBranch = pendingBranch;
      } else {
        unmount(pendingBranch, parentComponent, suspense);
      }
      suspense.deps = 0;
      suspense.effects.length = 0;
      suspense.hiddenContainer = createElement("div");
      if (isInFallback) {
        patch(
          null,
          newBranch,
          suspense.hiddenContainer,
          null,
          parentComponent,
          suspense,
          namespace,
          slotScopeIds,
          optimized
        );
        if (suspense.deps <= 0) {
          suspense.resolve();
        } else {
          patch(
            activeBranch,
            newFallback,
            container,
            anchor,
            parentComponent,
            null,
            // fallback tree will not have suspense context
            namespace,
            slotScopeIds,
            optimized
          );
          setActiveBranch(suspense, newFallback);
        }
      } else if (activeBranch && isSameVNodeType(activeBranch, newBranch)) {
        patch(
          activeBranch,
          newBranch,
          container,
          anchor,
          parentComponent,
          suspense,
          namespace,
          slotScopeIds,
          optimized
        );
        suspense.resolve(true);
      } else {
        patch(
          null,
          newBranch,
          suspense.hiddenContainer,
          null,
          parentComponent,
          suspense,
          namespace,
          slotScopeIds,
          optimized
        );
        if (suspense.deps <= 0) {
          suspense.resolve();
        }
      }
    }
  } else {
    if (activeBranch && isSameVNodeType(activeBranch, newBranch)) {
      patch(
        activeBranch,
        newBranch,
        container,
        anchor,
        parentComponent,
        suspense,
        namespace,
        slotScopeIds,
        optimized
      );
      setActiveBranch(suspense, newBranch);
    } else {
      triggerEvent(n2, "onPending");
      suspense.pendingBranch = newBranch;
      if (newBranch.shapeFlag & 512) {
        suspense.pendingId = newBranch.component.suspenseId;
      } else {
        suspense.pendingId = suspenseId++;
      }
      patch(
        null,
        newBranch,
        suspense.hiddenContainer,
        null,
        parentComponent,
        suspense,
        namespace,
        slotScopeIds,
        optimized
      );
      if (suspense.deps <= 0) {
        suspense.resolve();
      } else {
        const { timeout, pendingId } = suspense;
        if (timeout > 0) {
          setTimeout(() => {
            if (suspense.pendingId === pendingId) {
              suspense.fallback(newFallback);
            }
          }, timeout);
        } else if (timeout === 0) {
          suspense.fallback(newFallback);
        }
      }
    }
  }
}
let hasWarned$1 = false;
function createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, namespace, slotScopeIds, optimized, rendererInternals, isHydrating = false) {
  if (!!(process.env.NODE_ENV !== "production") && true && !hasWarned$1) {
    hasWarned$1 = true;
    console[console.info ? "info" : "log"](
      `<Suspense> is an experimental feature and its API will likely change.`
    );
  }
  const {
    p: patch,
    m: move,
    um: unmount,
    n: next,
    o: { parentNode, remove: remove2 }
  } = rendererInternals;
  let parentSuspenseId;
  const isSuspensible = isVNodeSuspensible(vnode);
  if (isSuspensible) {
    if (parentSuspense && parentSuspense.pendingBranch) {
      parentSuspenseId = parentSuspense.pendingId;
      parentSuspense.deps++;
    }
  }
  const timeout = vnode.props ? toNumber$1(vnode.props.timeout) : void 0;
  if (!!(process.env.NODE_ENV !== "production")) {
    assertNumber(timeout, `Suspense timeout`);
  }
  const initialAnchor = anchor;
  const suspense = {
    vnode,
    parent: parentSuspense,
    parentComponent,
    namespace,
    container,
    hiddenContainer,
    deps: 0,
    pendingId: suspenseId++,
    timeout: typeof timeout === "number" ? timeout : -1,
    activeBranch: null,
    pendingBranch: null,
    isInFallback: !isHydrating,
    isHydrating,
    isUnmounted: false,
    effects: [],
    resolve(resume = false, sync = false) {
      if (!!(process.env.NODE_ENV !== "production")) {
        if (!resume && !suspense.pendingBranch) {
          throw new Error(
            `suspense.resolve() is called without a pending branch.`
          );
        }
        if (suspense.isUnmounted) {
          throw new Error(
            `suspense.resolve() is called on an already unmounted suspense boundary.`
          );
        }
      }
      const {
        vnode: vnode2,
        activeBranch,
        pendingBranch,
        pendingId,
        effects,
        parentComponent: parentComponent2,
        container: container2,
        isInFallback
      } = suspense;
      let delayEnter = false;
      if (suspense.isHydrating) {
        suspense.isHydrating = false;
      } else if (!resume) {
        delayEnter = activeBranch && pendingBranch.transition && pendingBranch.transition.mode === "out-in";
        if (delayEnter) {
          activeBranch.transition.afterLeave = () => {
            if (pendingId === suspense.pendingId) {
              move(
                pendingBranch,
                container2,
                anchor === initialAnchor ? next(activeBranch) : anchor,
                0
              );
              queuePostFlushCb(effects);
              if (isInFallback && vnode2.ssFallback) {
                vnode2.ssFallback.el = null;
              }
            }
          };
        }
        if (activeBranch) {
          if (parentNode(activeBranch.el) === container2) {
            anchor = next(activeBranch);
          }
          unmount(activeBranch, parentComponent2, suspense, true);
          if (!delayEnter && isInFallback && vnode2.ssFallback) {
            queuePostRenderEffect(() => vnode2.ssFallback.el = null, suspense);
          }
        }
        if (!delayEnter) {
          move(pendingBranch, container2, anchor, 0);
        }
      }
      setActiveBranch(suspense, pendingBranch);
      suspense.pendingBranch = null;
      suspense.isInFallback = false;
      let parent = suspense.parent;
      let hasUnresolvedAncestor = false;
      while (parent) {
        if (parent.pendingBranch) {
          parent.effects.push(...effects);
          hasUnresolvedAncestor = true;
          break;
        }
        parent = parent.parent;
      }
      if (!hasUnresolvedAncestor && !delayEnter) {
        queuePostFlushCb(effects);
      }
      suspense.effects = [];
      if (isSuspensible) {
        if (parentSuspense && parentSuspense.pendingBranch && parentSuspenseId === parentSuspense.pendingId) {
          parentSuspense.deps--;
          if (parentSuspense.deps === 0 && !sync) {
            parentSuspense.resolve();
          }
        }
      }
      triggerEvent(vnode2, "onResolve");
    },
    fallback(fallbackVNode) {
      if (!suspense.pendingBranch) {
        return;
      }
      const { vnode: vnode2, activeBranch, parentComponent: parentComponent2, container: container2, namespace: namespace2 } = suspense;
      triggerEvent(vnode2, "onFallback");
      const anchor2 = next(activeBranch);
      const mountFallback = () => {
        if (!suspense.isInFallback) {
          return;
        }
        patch(
          null,
          fallbackVNode,
          container2,
          anchor2,
          parentComponent2,
          null,
          // fallback tree will not have suspense context
          namespace2,
          slotScopeIds,
          optimized
        );
        setActiveBranch(suspense, fallbackVNode);
      };
      const delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === "out-in";
      if (delayEnter) {
        activeBranch.transition.afterLeave = mountFallback;
      }
      suspense.isInFallback = true;
      unmount(
        activeBranch,
        parentComponent2,
        null,
        // no suspense so unmount hooks fire now
        true
        // shouldRemove
      );
      if (!delayEnter) {
        mountFallback();
      }
    },
    move(container2, anchor2, type) {
      suspense.activeBranch && move(suspense.activeBranch, container2, anchor2, type);
      suspense.container = container2;
    },
    next() {
      return suspense.activeBranch && next(suspense.activeBranch);
    },
    registerDep(instance, setupRenderEffect, optimized2) {
      const isInPendingSuspense = !!suspense.pendingBranch;
      if (isInPendingSuspense) {
        suspense.deps++;
      }
      const hydratedEl = instance.vnode.el;
      instance.asyncDep.catch((err) => {
        handleError(err, instance, 0);
      }).then((asyncSetupResult) => {
        if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) {
          return;
        }
        instance.asyncResolved = true;
        const { vnode: vnode2 } = instance;
        if (!!(process.env.NODE_ENV !== "production")) {
          pushWarningContext$1(vnode2);
        }
        handleSetupResult(instance, asyncSetupResult, false);
        if (hydratedEl) {
          vnode2.el = hydratedEl;
        }
        const placeholder = !hydratedEl && instance.subTree.el;
        setupRenderEffect(
          instance,
          vnode2,
          // component may have been moved before resolve.
          // if this is not a hydration, instance.subTree will be the comment
          // placeholder.
          parentNode(hydratedEl || instance.subTree.el),
          // anchor will not be used if this is hydration, so only need to
          // consider the comment placeholder case.
          hydratedEl ? null : next(instance.subTree),
          suspense,
          namespace,
          optimized2
        );
        if (placeholder) {
          vnode2.placeholder = null;
          remove2(placeholder);
        }
        updateHOCHostEl(instance, vnode2.el);
        if (!!(process.env.NODE_ENV !== "production")) {
          popWarningContext$1();
        }
        if (isInPendingSuspense && --suspense.deps === 0) {
          suspense.resolve();
        }
      });
    },
    unmount(parentSuspense2, doRemove) {
      suspense.isUnmounted = true;
      if (suspense.activeBranch) {
        unmount(
          suspense.activeBranch,
          parentComponent,
          parentSuspense2,
          doRemove
        );
      }
      if (suspense.pendingBranch) {
        unmount(
          suspense.pendingBranch,
          parentComponent,
          parentSuspense2,
          doRemove
        );
      }
    }
  };
  return suspense;
}
function hydrateSuspense(node, vnode, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals, hydrateNode) {
  const suspense = vnode.suspense = createSuspenseBoundary(
    vnode,
    parentSuspense,
    parentComponent,
    node.parentNode,
    // eslint-disable-next-line no-restricted-globals
    document.createElement("div"),
    null,
    namespace,
    slotScopeIds,
    optimized,
    rendererInternals,
    true
  );
  const result = hydrateNode(
    node,
    suspense.pendingBranch = vnode.ssContent,
    parentComponent,
    suspense,
    slotScopeIds,
    optimized
  );
  if (suspense.deps === 0) {
    suspense.resolve(false, true);
  }
  return result;
}
function normalizeSuspenseChildren(vnode) {
  const { shapeFlag, children } = vnode;
  const isSlotChildren = shapeFlag & 32;
  vnode.ssContent = normalizeSuspenseSlot(
    isSlotChildren ? children.default : children
  );
  vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment);
}
function normalizeSuspenseSlot(s) {
  let block;
  if (isFunction$2(s)) {
    const trackBlock = isBlockTreeEnabled && s._c;
    if (trackBlock) {
      s._d = false;
      openBlock();
    }
    s = s();
    if (trackBlock) {
      s._d = true;
      block = currentBlock;
      closeBlock();
    }
  }
  if (isArray$2(s)) {
    const singleChild = filterSingleRoot(s);
    if (!!(process.env.NODE_ENV !== "production") && !singleChild && s.filter((child) => child !== NULL_DYNAMIC_COMPONENT).length > 0) {
      warn$1(`<Suspense> slots expect a single root node.`);
    }
    s = singleChild;
  }
  s = normalizeVNode$1(s);
  if (block && !s.dynamicChildren) {
    s.dynamicChildren = block.filter((c) => c !== s);
  }
  return s;
}
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$2(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function setActiveBranch(suspense, branch) {
  suspense.activeBranch = branch;
  const { vnode, parentComponent } = suspense;
  let el = branch.el;
  while (!el && branch.component) {
    branch = branch.component.subTree;
    el = branch.el;
  }
  vnode.el = el;
  if (parentComponent && parentComponent.subTree === vnode) {
    parentComponent.vnode.el = el;
    updateHOCHostEl(parentComponent, el);
  }
}
function isVNodeSuspensible(vnode) {
  const suspensible = vnode.props && vnode.props.suspensible;
  return suspensible != null && suspensible !== false;
}
const normalizedAsyncComponentMap = /* @__PURE__ */ new WeakMap();
function convertLegacyAsyncComponent(comp) {
  if (normalizedAsyncComponentMap.has(comp)) {
    return normalizedAsyncComponentMap.get(comp);
  }
  let resolve2;
  let reject;
  const fallbackPromise = new Promise((r, rj) => {
    resolve2 = r, reject = rj;
  });
  const res = comp(resolve2, reject);
  let converted;
  if (isPromise$2(res)) {
    converted = /* @__PURE__ */ defineAsyncComponent(() => res);
  } else if (isObject$2(res) && !isVNode$3(res) && !isArray$2(res)) {
    converted = /* @__PURE__ */ defineAsyncComponent({
      loader: () => res.component,
      loadingComponent: res.loading,
      errorComponent: res.error,
      delay: res.delay,
      timeout: res.timeout
    });
  } else if (res == null) {
    converted = /* @__PURE__ */ defineAsyncComponent(() => fallbackPromise);
  } else {
    converted = comp;
  }
  normalizedAsyncComponentMap.set(comp, converted);
  return converted;
}
function convertLegacyComponent(comp, instance) {
  if (comp.__isBuiltIn) {
    return comp;
  }
  if (isFunction$2(comp) && comp.cid) {
    if (comp.render) {
      comp.options.render = comp.render;
    }
    comp.options.__file = comp.__file;
    comp.options.__hmrId = comp.__hmrId;
    comp.options.__scopeId = comp.__scopeId;
    comp = comp.options;
  }
  if (isFunction$2(comp) && checkCompatEnabled("COMPONENT_ASYNC", instance, comp)) {
    return convertLegacyAsyncComponent(comp);
  }
  if (isObject$2(comp) && comp.functional && softAssertCompatEnabled(
    "COMPONENT_FUNCTIONAL",
    instance,
    comp
  )) {
    return convertLegacyFunctionalComponent(comp);
  }
  return comp;
}
const Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
const Text = /* @__PURE__ */ Symbol.for("v-txt");
const Comment = /* @__PURE__ */ Symbol.for("v-cmt");
const Static = /* @__PURE__ */ Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR$1 : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode$3(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (!!(process.env.NODE_ENV !== "production") && n2.shapeFlag & 6 && n1.component) {
    const dirtyInstances = hmrDirtyComponents.get(n2.type);
    if (dirtyInstances && dirtyInstances.has(n1.component)) {
      n1.shapeFlag &= -257;
      n2.shapeFlag &= -513;
      return false;
    }
  }
  return n1.type === n2.type && n1.key === n2.key;
}
let vnodeArgsTransformer;
function transformVNodeArgs(transformer) {
  vnodeArgsTransformer = transformer;
}
const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(
    ...vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args
  );
};
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref2,
  ref_key,
  ref_for
}) => {
  if (typeof ref2 === "number") {
    ref2 = "" + ref2;
  }
  return ref2 != null ? isString$2(ref2) || /* @__PURE__ */ isRef$2(ref2) || isFunction$2(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$2(children) ? 8 : 16;
  }
  if (!!(process.env.NODE_ENV !== "production") && vnode.key !== vnode.key) {
    warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  {
    convertLegacyVModelProps(vnode);
    defineLegacyVNodeProperties(vnode);
  }
  return vnode;
}
const createVNode = !!(process.env.NODE_ENV !== "production") ? createVNodeWithArgsTransform : _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!!(process.env.NODE_ENV !== "production") && !type) {
      warn$1(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode$3(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  {
    type = convertLegacyComponent(type, currentRenderingInstance);
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$2(klass)) {
      props.class = normalizeClass$1(klass);
    }
    if (isObject$2(style)) {
      if (/* @__PURE__ */ isProxy(style) && !isArray$2(style)) {
        style = extend$1({}, style);
      }
      props.style = normalizeStyle$1(style);
    }
  }
  const shapeFlag = isString$2(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$2(type) ? 4 : isFunction$2(type) ? 2 : 0;
  if (!!(process.env.NODE_ENV !== "production") && shapeFlag & 4 && /* @__PURE__ */ isProxy(type)) {
    type = /* @__PURE__ */ toRaw(type);
    warn$1(
      `Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`,
      `
Component that was made reactive: `,
      type
    );
  }
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return /* @__PURE__ */ isProxy(props) || isInternalObject(props) ? extend$1({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref2, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref2 ? isArray$2(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: !!(process.env.NODE_ENV !== "production") && patchFlag === -1 && isArray$2(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    placeholder: vnode.placeholder,
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) {
    setTransitionHooks(
      cloned,
      transition.clone(cloned)
    );
  }
  {
    defineLegacyVNodeProperties(cloned);
  }
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray$2(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode$1(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$2(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (isVNode$3(child)) {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$2(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction$2(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass$1([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle$1([ret.style, toMerge.style]);
      } else if (isOn$1(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$2(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance$1(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    ids: parent ? parent.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ$1,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ$1,
    data: EMPTY_OBJ$1,
    props: EMPTY_OBJ$1,
    attrs: EMPTY_OBJ$1,
    slots: EMPTY_OBJ$1,
    refs: EMPTY_OBJ$1,
    setupState: EMPTY_OBJ$1,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  if (!!(process.env.NODE_ENV !== "production")) {
    instance.ctx = createDevRenderContext(instance);
  } else {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance$1 = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g = getGlobalThis$2();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set) => set(v));
      else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ makeMap$1("slot,component");
function validateComponentName(name, { isNativeTag }) {
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$1(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent$1(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children, optimized || isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  if (!!(process.env.NODE_ENV !== "production")) {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn$1(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  if (!!(process.env.NODE_ENV !== "production")) {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component;
  if (setup) {
    pauseTracking();
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        !!(process.env.NODE_ENV !== "production") ? /* @__PURE__ */ shallowReadonly(instance.props) : instance.props,
        setupContext
      ]
    );
    const isAsyncSetup = isPromise$2(setupResult);
    resetTracking();
    reset();
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
      markAsyncBoundary(instance);
    }
    if (isAsyncSetup) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if (!!(process.env.NODE_ENV !== "production") && !instance.suspense) {
          const name = formatComponentName(instance, Component);
          warn$1(
            `Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
          );
        }
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$2(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$2(setupResult)) {
    if (!!(process.env.NODE_ENV !== "production") && isVNode$3(setupResult)) {
      warn$1(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    if (!!(process.env.NODE_ENV !== "production") || false) {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    if (!!(process.env.NODE_ENV !== "production")) {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (!!(process.env.NODE_ENV !== "production") && setupResult !== void 0) {
    warn$1(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
let compile$1;
let installWithProxy;
function registerRuntimeCompiler(_compile) {
  compile$1 = _compile;
  installWithProxy = (i) => {
    if (i.render._rc) {
      i.withProxy = new Proxy(i.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
    }
  };
}
const isRuntimeOnly = () => !compile$1;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  {
    convertLegacyRenderFn(instance);
    if (!!(process.env.NODE_ENV !== "production") && Component.compatConfig) {
      validateCompatConfig(Component.compatConfig);
    }
  }
  if (!instance.render) {
    if (!isSSR && compile$1 && !Component.render) {
      const template = instance.vnode.props && instance.vnode.props["inline-template"] || Component.template || resolveMergedOptions(instance).template;
      if (template) {
        if (!!(process.env.NODE_ENV !== "production")) {
          startMeasure(instance, `compile`);
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend$1(
          extend$1(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        {
          finalCompilerOptions.compatConfig = Object.create(globalCompatConfig);
          if (Component.compatConfig) {
            extend$1(finalCompilerOptions.compatConfig, Component.compatConfig);
          }
        }
        Component.render = compile$1(template, finalCompilerOptions);
        if (!!(process.env.NODE_ENV !== "production")) {
          endMeasure(instance, `compile`);
        }
      }
    }
    instance.render = Component.render || NOOP$1;
    if (installWithProxy) {
      installWithProxy(instance);
    }
  }
  if (!skipOptions) {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (!!(process.env.NODE_ENV !== "production") && !Component.render && instance.render === NOOP$1 && !isSSR) {
    if (!compile$1 && Component.template) {
      warn$1(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      );
    } else {
      warn$1(`Component is missing template or render function: `, Component);
    }
  }
}
const attrsProxyHandlers = !!(process.env.NODE_ENV !== "production") ? {
  get(target, key) {
    markAttrsAccessed();
    track(target, "get", "");
    return target[key];
  },
  set() {
    warn$1(`setupContext.attrs is readonly.`);
    return false;
  },
  deleteProperty() {
    warn$1(`setupContext.attrs is readonly.`);
    return false;
  }
} : {
  get(target, key) {
    track(target, "get", "");
    return target[key];
  }
};
function getSlotsProxy(instance) {
  return new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (!!(process.env.NODE_ENV !== "production")) {
      if (instance.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray$2(exposed)) {
            exposedType = "array";
          } else if (/* @__PURE__ */ isRef$2(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  if (!!(process.env.NODE_ENV !== "production")) {
    let attrsProxy;
    let slotsProxy;
    return Object.freeze({
      get attrs() {
        return attrsProxy || (attrsProxy = new Proxy(instance.attrs, attrsProxyHandlers));
      },
      get slots() {
        return slotsProxy || (slotsProxy = getSlotsProxy(instance));
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  } else {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
const classifyRE = /(?:^|[-_])\w/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction$2(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components) || instance.parent && inferFromRegistry(
      instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction$2(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  const c = /* @__PURE__ */ computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  if (!!(process.env.NODE_ENV !== "production")) {
    const i = getCurrentInstance$1();
    if (i && i.appContext.config.warnRecursiveComputed) {
      c._warnRecursive = true;
    }
  }
  return c;
};
function h(type, propsOrChildren, children) {
  try {
    setBlockTracking(-1);
    const l = arguments.length;
    if (l === 2) {
      if (isObject$2(propsOrChildren) && !isArray$2(propsOrChildren)) {
        if (isVNode$3(propsOrChildren)) {
          return createVNode(type, null, [propsOrChildren]);
        }
        return createVNode(type, propsOrChildren);
      } else {
        return createVNode(type, null, propsOrChildren);
      }
    } else {
      if (l > 3) {
        children = Array.prototype.slice.call(arguments, 2);
      } else if (l === 3 && isVNode$3(children)) {
        children = [children];
      }
      return createVNode(type, propsOrChildren, children);
    }
  } finally {
    setBlockTracking(1);
  }
}
function initCustomFormatter() {
  if (!!!(process.env.NODE_ENV !== "production") || typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#1677ff" };
  const stringStyle = { style: "color:#f5222d" };
  const keywordStyle = { style: "color:#eb2f96" };
  const formatter = {
    __vue_custom_formatter: true,
    header(obj) {
      if (!isObject$2(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (/* @__PURE__ */ isRef$2(obj)) {
        pauseTracking();
        const value = obj.value;
        resetTracking();
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(value),
          `>`
        ];
      } else if (/* @__PURE__ */ isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, /* @__PURE__ */ isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${/* @__PURE__ */ isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (/* @__PURE__ */ isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, /* @__PURE__ */ isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", /* @__PURE__ */ toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ$1) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ$1) {
      blocks.push(createInstanceBlock("data", /* @__PURE__ */ toRaw(instance.data)));
    }
    const computed2 = extractKeys(instance, "computed");
    if (computed2) {
      blocks.push(createInstanceBlock("computed", computed2));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend$1({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v, asRaw = true) {
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if (isObject$2(v)) {
      return ["object", { object: asRaw ? /* @__PURE__ */ toRaw(v) : v }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction$2(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray$2(opts) && opts.includes(key) || isObject$2(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (/* @__PURE__ */ isShallow(v)) {
      return `ShallowRef`;
    }
    if (v.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}
function withMemo(memo, render2, cache2, index) {
  const cached = cache2[index];
  if (cached && isMemoSame(cached, memo)) {
    return cached;
  }
  const ret = render2();
  ret.memo = memo.slice();
  ret.cacheIndex = index;
  return cache2[index] = ret;
}
function isMemoSame(cached, memo) {
  const prev = cached.memo;
  if (prev.length != memo.length) {
    return false;
  }
  for (let i = 0; i < prev.length; i++) {
    if (hasChanged$1(prev[i], memo[i])) {
      return false;
    }
  }
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(cached);
  }
  return true;
}
const version = "3.5.27";
const warn$3 = !!(process.env.NODE_ENV !== "production") ? warn$1 : NOOP$1;
const ErrorTypeStrings = ErrorTypeStrings$1;
const devtools$2 = !!(process.env.NODE_ENV !== "production") || true ? devtools$1 : void 0;
const setDevtoolsHook = !!(process.env.NODE_ENV !== "production") || true ? setDevtoolsHook$1 : NOOP$1;
const _ssrUtils = {
  createComponentInstance: createComponentInstance$1,
  setupComponent: setupComponent$1,
  renderComponentRoot: renderComponentRoot$1,
  setCurrentRenderingInstance: setCurrentRenderingInstance$1,
  isVNode: isVNode$3,
  normalizeVNode: normalizeVNode$1,
  getComponentPublicInstance,
  ensureValidVNode: ensureValidVNode$1,
  pushWarningContext: pushWarningContext$1,
  popWarningContext: popWarningContext$1
};
const ssrUtils = _ssrUtils;
const resolveFilter = resolveFilter$1;
const _compatUtils = {
  warnDeprecation,
  createCompatVue: createCompatVue$1,
  isCompatEnabled,
  checkCompatEnabled,
  softAssertCompatEnabled
};
const compatUtils = _compatUtils;
const DeprecationTypes = DeprecationTypes$1;
let policy = void 0;
const tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e) {
    !!(process.env.NODE_ENV !== "production") && warn$3(`Error creating trusted types policy: ${e}`);
  }
}
const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
      );
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const TRANSITION = "transition";
const ANIMATION = "animation";
const vtcKey = /* @__PURE__ */ Symbol("_vtc");
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = /* @__PURE__ */ extend$1(
  {},
  BaseTransitionPropsValidators,
  DOMTransitionPropsValidators
);
const decorate$1 = (t) => {
  t.displayName = "Transition";
  t.props = TransitionPropsValidators;
  {
    t.__isBuiltIn = true;
  }
  return t;
};
const Transition = /* @__PURE__ */ decorate$1(
  (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots)
);
const callHook = (hook, args = []) => {
  if (isArray$2(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray$2(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const legacyClassEnabled = compatUtils.isCompatEnabled("TRANSITION_CLASSES", null);
  let legacyEnterFromClass;
  let legacyAppearFromClass;
  let legacyLeaveFromClass;
  if (legacyClassEnabled) {
    const toLegacyClass = (cls) => cls.replace(/-from$/, "");
    if (!rawProps.enterFromClass) {
      legacyEnterFromClass = toLegacyClass(enterFromClass);
    }
    if (!rawProps.appearFromClass) {
      legacyAppearFromClass = toLegacyClass(appearFromClass);
    }
    if (!rawProps.leaveFromClass) {
      legacyLeaveFromClass = toLegacyClass(leaveFromClass);
    }
  }
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done, isCancelled) => {
    el._enterCancelled = isCancelled;
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        if (legacyClassEnabled) {
          const legacyClass = isAppear ? legacyAppearFromClass : legacyEnterFromClass;
          if (legacyClass) {
            removeTransitionClass(el, legacyClass);
          }
        }
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend$1(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      if (legacyClassEnabled && legacyEnterFromClass) {
        addTransitionClass(el, legacyEnterFromClass);
      }
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      if (legacyClassEnabled && legacyAppearFromClass) {
        addTransitionClass(el, legacyAppearFromClass);
      }
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      if (legacyClassEnabled && legacyLeaveFromClass) {
        addTransitionClass(el, legacyLeaveFromClass);
      }
      if (!el._enterCancelled) {
        forceReflow(el);
        addTransitionClass(el, leaveActiveClass);
      } else {
        addTransitionClass(el, leaveActiveClass);
        forceReflow(el);
      }
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        if (legacyClassEnabled && legacyLeaveFromClass) {
          removeTransitionClass(el, legacyLeaveFromClass);
        }
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false, void 0, true);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true, void 0, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject$2(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber$1(val);
  if (!!(process.env.NODE_ENV !== "production")) {
    assertNumber(res, "<transition> explicit duration");
  }
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el[vtcKey] = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout != null) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(?:transform|all)(?:,|$)/.test(
    getStyleProperties(`${TRANSITION}Property`).toString()
  );
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  if (s === "auto") return 0;
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow(el) {
  const targetDocument = el ? el.ownerDocument : document;
  return targetDocument.body.offsetHeight;
}
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
const vShowHidden = /* @__PURE__ */ Symbol("_vsh");
const vShow = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(el, { value }, { transition }) {
    el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue) return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el[vShowOriginalDisplay] : "none";
  el[vShowHidden] = !value;
}
function initVShowForSSR() {
  vShow.getSSRProps = ({ value }) => {
    if (!value) {
      return { style: { display: "none" } };
    }
  };
}
const CSS_VAR_TEXT = /* @__PURE__ */ Symbol(!!(process.env.NODE_ENV !== "production") ? "CSS_VAR_TEXT" : "");
function useCssVars(getter) {
  const instance = getCurrentInstance$1();
  if (!instance) {
    !!(process.env.NODE_ENV !== "production") && warn$3(`useCssVars is called without current active component instance.`);
    return;
  }
  const updateTeleports = instance.ut = (vars = getter(instance.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${instance.uid}"]`)
    ).forEach((node) => setVarsOnNode(node, vars));
  };
  if (!!(process.env.NODE_ENV !== "production")) {
    instance.getCssVars = () => getter(instance.proxy);
  }
  const setVars = () => {
    const vars = getter(instance.proxy);
    if (instance.ce) {
      setVarsOnNode(instance.ce, vars);
    } else {
      setVarsOnVNode(instance.subTree, vars);
    }
    updateTeleports(vars);
  };
  onBeforeUpdate(() => {
    queuePostFlushCb(setVars);
  });
  onMounted(() => {
    watch(setVars, NOOP$1, { flush: "post" });
    const ob = new MutationObserver(setVars);
    ob.observe(instance.subTree.el.parentNode, { childList: true });
    onUnmounted(() => ob.disconnect());
  });
}
function setVarsOnVNode(vnode, vars) {
  if (vnode.shapeFlag & 128) {
    const suspense = vnode.suspense;
    vnode = suspense.activeBranch;
    if (suspense.pendingBranch && !suspense.isHydrating) {
      suspense.effects.push(() => {
        setVarsOnVNode(suspense.activeBranch, vars);
      });
    }
  }
  while (vnode.component) {
    vnode = vnode.component.subTree;
  }
  if (vnode.shapeFlag & 1 && vnode.el) {
    setVarsOnNode(vnode.el, vars);
  } else if (vnode.type === Fragment) {
    vnode.children.forEach((c) => setVarsOnVNode(c, vars));
  } else if (vnode.type === Static) {
    let { el, anchor } = vnode;
    while (el) {
      setVarsOnNode(el, vars);
      if (el === anchor) break;
      el = el.nextSibling;
    }
  }
}
function setVarsOnNode(el, vars) {
  if (el.nodeType === 1) {
    const style = el.style;
    let cssText = "";
    for (const key in vars) {
      const value = normalizeCssVarValue$1(vars[key]);
      style.setProperty(`--${key}`, value);
      cssText += `--${key}: ${value};`;
    }
    style[CSS_VAR_TEXT] = cssText;
  }
}
const displayRE = /(?:^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$2(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString$2(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const semicolonRE = /[^\\];\s*$/;
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$2(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null) val = "";
    if (!!(process.env.NODE_ENV !== "production")) {
      if (semicolonRE.test(val)) {
        warn$3(
          `Unexpected semicolon at the end of '${name}' style value: '${val}'`
        );
      }
    }
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate$1(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize$1(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize$2(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean2 = isSpecialBooleanAttr$1(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (compatCoerceAttr(el, key, value, instance)) {
      return;
    }
    if (value == null || isBoolean2 && !includeBooleanAttr$1(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean2 ? "" : isSymbol$1(value) ? String(value) : value
      );
    }
  }
}
const isEnumeratedAttr = /* @__PURE__ */ makeMap$1("contenteditable,draggable,spellcheck");
function compatCoerceAttr(el, key, value, instance = null) {
  if (isEnumeratedAttr(key)) {
    const v2CoercedValue = value === void 0 ? null : value === null || value === false || value === "false" ? "false" : "true";
    if (v2CoercedValue && compatUtils.softAssertCompatEnabled(
      "ATTR_ENUMERATED_COERCION",
      instance,
      key,
      value,
      v2CoercedValue
    )) {
      el.setAttribute(key, v2CoercedValue);
      return true;
    }
  } else if (value === false && !(el.tagName === "INPUT" && key === "value") && !isSpecialBooleanAttr$1(key) && compatUtils.isCompatEnabled("ATTR_FALSE_VALUE", instance)) {
    compatUtils.warnDeprecation(
      "ATTR_FALSE_VALUE",
      instance,
      key
    );
    el.removeAttribute(key);
    return true;
  }
  return false;
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) {
      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      el.type === "checkbox" ? "on" : ""
    ) : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr$1(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  } else {
    if (value === false && compatUtils.isCompatEnabled(
      "ATTR_FALSE_VALUE",
      parentComponent
    )) {
      const type = typeof el[key];
      if (type === "string" || type === "number") {
        !!(process.env.NODE_ENV !== "production") && compatUtils.warnDeprecation(
          "ATTR_FALSE_VALUE",
          parentComponent,
          key
        );
        value = type === "number" ? 0 : "";
        needRemove = true;
      }
    }
  }
  try {
    el[key] = value;
  } catch (e) {
    if (!!(process.env.NODE_ENV !== "production") && !needRemove) {
      warn$3(
        `Failed setting prop "${key}" on <${tag.toLowerCase()}>: value ${value} is invalid.`,
        e
      );
    }
  }
  needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = /* @__PURE__ */ Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = !!(process.env.NODE_ENV !== "production") ? sanitizeEventValue(nextValue, rawName) : nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        !!(process.env.NODE_ENV !== "production") ? sanitizeEventValue(nextValue, rawName) : nextValue,
        instance
      );
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate$1(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function sanitizeEventValue(value, propName) {
  if (isFunction$2(value) || isArray$2(value)) {
    return value;
  }
  warn$3(
    `Wrong type passed as event handler to ${propName} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof value}.`
  );
  return NOOP$1;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$2(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map(
      (fn) => (e2) => !e2._stopped && fn && fn(e2)
    );
  } else {
    return value;
  }
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn$1(key)) {
    if (!isModelListener$1(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, parentComponent);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE && (/[A-Z]/.test(key) || !isString$2(nextValue))
  ) {
    patchDOMProp(el, camelize$1(key), nextValue, parentComponent, key);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG, parentComponent);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction$2(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
    return false;
  }
  if (key === "sandbox" && el.tagName === "IFRAME") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString$2(value)) {
    return false;
  }
  return key in el;
}
const REMOVAL = {};
// @__NO_SIDE_EFFECTS__
function defineCustomElement(options, extraOptions, _createApp) {
  let Comp = /* @__PURE__ */ defineComponent(options, extraOptions);
  if (isPlainObject$2(Comp)) Comp = extend$1({}, Comp, extraOptions);
  class VueCustomElement extends VueElement {
    constructor(initialProps) {
      super(Comp, initialProps, _createApp);
    }
  }
  VueCustomElement.def = Comp;
  return VueCustomElement;
}
const defineSSRCustomElement = /* @__NO_SIDE_EFFECTS__ */ (options, extraOptions) => {
  return /* @__PURE__ */ defineCustomElement(options, extraOptions, createSSRApp);
};
const BaseClass = typeof HTMLElement !== "undefined" ? HTMLElement : class {
};
class VueElement extends BaseClass {
  constructor(_def, _props = {}, _createApp = createApp) {
    super();
    this._def = _def;
    this._props = _props;
    this._createApp = _createApp;
    this._isVueCE = true;
    this._instance = null;
    this._app = null;
    this._nonce = this._def.nonce;
    this._connected = false;
    this._resolved = false;
    this._patching = false;
    this._dirty = false;
    this._numberProps = null;
    this._styleChildren = /* @__PURE__ */ new WeakSet();
    this._ob = null;
    if (this.shadowRoot && _createApp !== createApp) {
      this._root = this.shadowRoot;
    } else {
      if (!!(process.env.NODE_ENV !== "production") && this.shadowRoot) {
        warn$3(
          `Custom element has pre-rendered declarative shadow root but is not defined as hydratable. Use \`defineSSRCustomElement\`.`
        );
      }
      if (_def.shadowRoot !== false) {
        this.attachShadow(
          extend$1({}, _def.shadowRootOptions, {
            mode: "open"
          })
        );
        this._root = this.shadowRoot;
      } else {
        this._root = this;
      }
    }
  }
  connectedCallback() {
    if (!this.isConnected) return;
    if (!this.shadowRoot && !this._resolved) {
      this._parseSlots();
    }
    this._connected = true;
    let parent = this;
    while (parent = parent && (parent.parentNode || parent.host)) {
      if (parent instanceof VueElement) {
        this._parent = parent;
        break;
      }
    }
    if (!this._instance) {
      if (this._resolved) {
        this._mount(this._def);
      } else {
        if (parent && parent._pendingResolve) {
          this._pendingResolve = parent._pendingResolve.then(() => {
            this._pendingResolve = void 0;
            this._resolveDef();
          });
        } else {
          this._resolveDef();
        }
      }
    }
  }
  _setParent(parent = this._parent) {
    if (parent) {
      this._instance.parent = parent._instance;
      this._inheritParentContext(parent);
    }
  }
  _inheritParentContext(parent = this._parent) {
    if (parent && this._app) {
      Object.setPrototypeOf(
        this._app._context.provides,
        parent._instance.provides
      );
    }
  }
  disconnectedCallback() {
    this._connected = false;
    nextTick(() => {
      if (!this._connected) {
        if (this._ob) {
          this._ob.disconnect();
          this._ob = null;
        }
        this._app && this._app.unmount();
        if (this._instance) this._instance.ce = void 0;
        this._app = this._instance = null;
        if (this._teleportTargets) {
          this._teleportTargets.clear();
          this._teleportTargets = void 0;
        }
      }
    });
  }
  _processMutations(mutations) {
    for (const m of mutations) {
      this._setAttr(m.attributeName);
    }
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve) {
      return;
    }
    for (let i = 0; i < this.attributes.length; i++) {
      this._setAttr(this.attributes[i].name);
    }
    this._ob = new MutationObserver(this._processMutations.bind(this));
    this._ob.observe(this, { attributes: true });
    const resolve2 = (def2, isAsync = false) => {
      this._resolved = true;
      this._pendingResolve = void 0;
      const { props, styles } = def2;
      let numberProps;
      if (props && !isArray$2(props)) {
        for (const key in props) {
          const opt = props[key];
          if (opt === Number || opt && opt.type === Number) {
            if (key in this._props) {
              this._props[key] = toNumber$1(this._props[key]);
            }
            (numberProps || (numberProps = /* @__PURE__ */ Object.create(null)))[camelize$1(key)] = true;
          }
        }
      }
      this._numberProps = numberProps;
      this._resolveProps(def2);
      if (this.shadowRoot) {
        this._applyStyles(styles);
      } else if (!!(process.env.NODE_ENV !== "production") && styles) {
        warn$3(
          "Custom element style injection is not supported when using shadowRoot: false"
        );
      }
      this._mount(def2);
    };
    const asyncDef = this._def.__asyncLoader;
    if (asyncDef) {
      this._pendingResolve = asyncDef().then((def2) => {
        def2.configureApp = this._def.configureApp;
        resolve2(this._def = def2, true);
      });
    } else {
      resolve2(this._def);
    }
  }
  _mount(def2) {
    if ((!!(process.env.NODE_ENV !== "production") || false) && !def2.name) {
      def2.name = "VueElement";
    }
    this._app = this._createApp(def2);
    this._inheritParentContext();
    if (def2.configureApp) {
      def2.configureApp(this._app);
    }
    this._app._ceVNode = this._createVNode();
    this._app.mount(this._root);
    const exposed = this._instance && this._instance.exposed;
    if (!exposed) return;
    for (const key in exposed) {
      if (!hasOwn$2(this, key)) {
        Object.defineProperty(this, key, {
          // unwrap ref to be consistent with public instance behavior
          get: () => unref(exposed[key])
        });
      } else if (!!(process.env.NODE_ENV !== "production")) {
        warn$3(`Exposed property "${key}" already exists on custom element.`);
      }
    }
  }
  _resolveProps(def2) {
    const { props } = def2;
    const declaredPropKeys = isArray$2(props) ? props : Object.keys(props || {});
    for (const key of Object.keys(this)) {
      if (key[0] !== "_" && declaredPropKeys.includes(key)) {
        this._setProp(key, this[key]);
      }
    }
    for (const key of declaredPropKeys.map(camelize$1)) {
      Object.defineProperty(this, key, {
        get() {
          return this._getProp(key);
        },
        set(val) {
          this._setProp(key, val, true, !this._patching);
        }
      });
    }
  }
  _setAttr(key) {
    if (key.startsWith("data-v-")) return;
    const has = this.hasAttribute(key);
    let value = has ? this.getAttribute(key) : REMOVAL;
    const camelKey = camelize$1(key);
    if (has && this._numberProps && this._numberProps[camelKey]) {
      value = toNumber$1(value);
    }
    this._setProp(camelKey, value, false, true);
  }
  /**
   * @internal
   */
  _getProp(key) {
    return this._props[key];
  }
  /**
   * @internal
   */
  _setProp(key, val, shouldReflect = true, shouldUpdate = false) {
    if (val !== this._props[key]) {
      this._dirty = true;
      if (val === REMOVAL) {
        delete this._props[key];
      } else {
        this._props[key] = val;
        if (key === "key" && this._app) {
          this._app._ceVNode.key = val;
        }
      }
      if (shouldUpdate && this._instance) {
        this._update();
      }
      if (shouldReflect) {
        const ob = this._ob;
        if (ob) {
          this._processMutations(ob.takeRecords());
          ob.disconnect();
        }
        if (val === true) {
          this.setAttribute(hyphenate$1(key), "");
        } else if (typeof val === "string" || typeof val === "number") {
          this.setAttribute(hyphenate$1(key), val + "");
        } else if (!val) {
          this.removeAttribute(hyphenate$1(key));
        }
        ob && ob.observe(this, { attributes: true });
      }
    }
  }
  _update() {
    const vnode = this._createVNode();
    if (this._app) vnode.appContext = this._app._context;
    render(vnode, this._root);
  }
  _createVNode() {
    const baseProps = {};
    if (!this.shadowRoot) {
      baseProps.onVnodeMounted = baseProps.onVnodeUpdated = this._renderSlots.bind(this);
    }
    const vnode = createVNode(this._def, extend$1(baseProps, this._props));
    if (!this._instance) {
      vnode.ce = (instance) => {
        this._instance = instance;
        instance.ce = this;
        instance.isCE = true;
        if (!!(process.env.NODE_ENV !== "production")) {
          instance.ceReload = (newStyles) => {
            if (this._styles) {
              this._styles.forEach((s) => this._root.removeChild(s));
              this._styles.length = 0;
            }
            this._applyStyles(newStyles);
            this._instance = null;
            this._update();
          };
        }
        const dispatch = (event, args) => {
          this.dispatchEvent(
            new CustomEvent(
              event,
              isPlainObject$2(args[0]) ? extend$1({ detail: args }, args[0]) : { detail: args }
            )
          );
        };
        instance.emit = (event, ...args) => {
          dispatch(event, args);
          if (hyphenate$1(event) !== event) {
            dispatch(hyphenate$1(event), args);
          }
        };
        this._setParent();
      };
    }
    return vnode;
  }
  _applyStyles(styles, owner) {
    if (!styles) return;
    if (owner) {
      if (owner === this._def || this._styleChildren.has(owner)) {
        return;
      }
      this._styleChildren.add(owner);
    }
    const nonce = this._nonce;
    for (let i = styles.length - 1; i >= 0; i--) {
      const s = document.createElement("style");
      if (nonce) s.setAttribute("nonce", nonce);
      s.textContent = styles[i];
      this.shadowRoot.prepend(s);
      if (!!(process.env.NODE_ENV !== "production")) {
        if (owner) {
          if (owner.__hmrId) {
            if (!this._childStyles) this._childStyles = /* @__PURE__ */ new Map();
            let entry = this._childStyles.get(owner.__hmrId);
            if (!entry) {
              this._childStyles.set(owner.__hmrId, entry = []);
            }
            entry.push(s);
          }
        } else {
          (this._styles || (this._styles = [])).push(s);
        }
      }
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const slots = this._slots = {};
    let n;
    while (n = this.firstChild) {
      const slotName = n.nodeType === 1 && n.getAttribute("slot") || "default";
      (slots[slotName] || (slots[slotName] = [])).push(n);
      this.removeChild(n);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const outlets = this._getSlots();
    const scopeId = this._instance.type.__scopeId;
    for (let i = 0; i < outlets.length; i++) {
      const o = outlets[i];
      const slotName = o.getAttribute("name") || "default";
      const content = this._slots[slotName];
      const parent = o.parentNode;
      if (content) {
        for (const n of content) {
          if (scopeId && n.nodeType === 1) {
            const id = scopeId + "-s";
            const walker = document.createTreeWalker(n, 1);
            n.setAttribute(id, "");
            let child;
            while (child = walker.nextNode()) {
              child.setAttribute(id, "");
            }
          }
          parent.insertBefore(n, o);
        }
      } else {
        while (o.firstChild) parent.insertBefore(o.firstChild, o);
      }
      parent.removeChild(o);
    }
  }
  /**
   * @internal
   */
  _getSlots() {
    const roots = [this];
    if (this._teleportTargets) {
      roots.push(...this._teleportTargets);
    }
    const slots = /* @__PURE__ */ new Set();
    for (const root of roots) {
      const found = root.querySelectorAll("slot");
      for (let i = 0; i < found.length; i++) {
        slots.add(found[i]);
      }
    }
    return Array.from(slots);
  }
  /**
   * @internal
   */
  _injectChildStyle(comp) {
    this._applyStyles(comp.styles, comp);
  }
  /**
   * @internal
   */
  _beginPatch() {
    this._patching = true;
    this._dirty = false;
  }
  /**
   * @internal
   */
  _endPatch() {
    this._patching = false;
    if (this._dirty && this._instance) {
      this._update();
    }
  }
  /**
   * @internal
   */
  _removeChildStyle(comp) {
    if (!!(process.env.NODE_ENV !== "production")) {
      this._styleChildren.delete(comp);
      if (this._childStyles && comp.__hmrId) {
        const oldStyles = this._childStyles.get(comp.__hmrId);
        if (oldStyles) {
          oldStyles.forEach((s) => this._root.removeChild(s));
          oldStyles.length = 0;
        }
      }
    }
  }
}
function useHost(caller) {
  const instance = getCurrentInstance$1();
  const el = instance && instance.ce;
  if (el) {
    return el;
  } else if (!!(process.env.NODE_ENV !== "production")) {
    if (!instance) {
      warn$3(
        `${caller || "useHost"} called without an active component instance.`
      );
    } else {
      warn$3(
        `${caller || "useHost"} can only be used in components defined via defineCustomElement.`
      );
    }
  }
  return null;
}
function useShadowRoot() {
  const el = !!(process.env.NODE_ENV !== "production") ? useHost("useShadowRoot") : useHost();
  return el && el.shadowRoot;
}
function useCssModule(name = "$style") {
  {
    const instance = getCurrentInstance$1();
    if (!instance) {
      !!(process.env.NODE_ENV !== "production") && warn$3(`useCssModule must be called inside setup()`);
      return EMPTY_OBJ$1;
    }
    const modules = instance.type.__cssModules;
    if (!modules) {
      !!(process.env.NODE_ENV !== "production") && warn$3(`Current instance does not have CSS modules injected.`);
      return EMPTY_OBJ$1;
    }
    const mod = modules[name];
    if (!mod) {
      !!(process.env.NODE_ENV !== "production") && warn$3(`Current instance does not have CSS module named "${name}".`);
      return EMPTY_OBJ$1;
    }
    return mod;
  }
}
const positionMap = /* @__PURE__ */ new WeakMap();
const newPositionMap = /* @__PURE__ */ new WeakMap();
const moveCbKey = /* @__PURE__ */ Symbol("_moveCb");
const enterCbKey = /* @__PURE__ */ Symbol("_enterCb");
const decorate = (t) => {
  delete t.props.mode;
  {
    t.__isBuiltIn = true;
  }
  return t;
};
const TransitionGroupImpl = /* @__PURE__ */ decorate({
  name: "TransitionGroup",
  props: /* @__PURE__ */ extend$1({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, { slots }) {
    const instance = getCurrentInstance$1();
    const state = useTransitionState();
    let prevChildren;
    let children;
    onUpdated(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || "v"}-move`;
      if (!hasCSSTransform(
        prevChildren[0].el,
        instance.vnode.el,
        moveClass
      )) {
        prevChildren = [];
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow(instance.vnode.el);
      movedChildren.forEach((c) => {
        const el = c.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = "";
        const cb = el[moveCbKey] = (e) => {
          if (e && e.target !== el) {
            return;
          }
          if (!e || e.propertyName.endsWith("transform")) {
            el.removeEventListener("transitionend", cb);
            el[moveCbKey] = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
      prevChildren = [];
    });
    return () => {
      const rawProps = /* @__PURE__ */ toRaw(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || Fragment;
      if (!rawProps.tag && compatUtils.checkCompatEnabled(
        "TRANSITION_GROUP_ROOT",
        instance.parent
      )) {
        tag = "span";
      }
      prevChildren = [];
      if (children) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.el && child.el instanceof Element) {
            prevChildren.push(child);
            setTransitionHooks(
              child,
              resolveTransitionHooks(
                child,
                cssTransitionProps,
                state,
                instance
              )
            );
            positionMap.set(child, {
              left: child.el.offsetLeft,
              top: child.el.offsetTop
            });
          }
        }
      }
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.key != null) {
          setTransitionHooks(
            child,
            resolveTransitionHooks(child, cssTransitionProps, state, instance)
          );
        } else if (!!(process.env.NODE_ENV !== "production") && child.type !== Text) {
          warn$3(`<TransitionGroup> children must be keyed.`);
        }
      }
      return createVNode(tag, null, children);
    };
  }
});
const TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c) {
  const el = c.el;
  if (el[moveCbKey]) {
    el[moveCbKey]();
  }
  if (el[enterCbKey]) {
    el[enterCbKey]();
  }
}
function recordPosition(c) {
  newPositionMap.set(c, {
    left: c.el.offsetLeft,
    top: c.el.offsetTop
  });
}
function applyTranslation(c) {
  const oldPos = positionMap.get(c);
  const newPos = newPositionMap.get(c);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s = c.el.style;
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = "0s";
    return c;
  }
}
function hasCSSTransform(el, root, moveClass) {
  const clone = el.cloneNode();
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
    });
  }
  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
  clone.style.display = "none";
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}
const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || vnode.props["onModelCompat:input"];
  return isArray$2(fn) ? (value) => invokeArrayFns$1(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
const assignKey = /* @__PURE__ */ Symbol("_assign");
function castValue(value, trim, number2) {
  if (trim) value = value.trim();
  if (number2) value = looseToNumber$1(value);
  return value;
}
const vModelText = {
  created(el, { modifiers: { lazy, trim, number: number2 } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    const castToNumber = number2 || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing) return;
      el[assignKey](castValue(el.value, trim, castToNumber));
    });
    if (trim || castToNumber) {
      addEventListener(el, "change", () => {
        el.value = castValue(el.value, trim, castToNumber);
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number: number2 } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (el.composing) return;
    const elValue = (number2 || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber$1(el.value) : el.value;
    const newValue = value == null ? "" : value;
    if (elValue === newValue) {
      return;
    }
    if (document.activeElement === el && el.type !== "range") {
      if (lazy && value === oldValue) {
        return;
      }
      if (trim && el.value.trim() === newValue) {
        return;
      }
    }
    el.value = newValue;
  }
};
const vModelCheckbox = {
  // #4096 array checkboxes need to be deep traversed
  deep: true,
  created(el, _, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      const modelValue = el._modelValue;
      const elementValue = getValue(el);
      const checked = el.checked;
      const assign2 = el[assignKey];
      if (isArray$2(modelValue)) {
        const index = looseIndexOf$1(modelValue, elementValue);
        const found = index !== -1;
        if (checked && !found) {
          assign2(modelValue.concat(elementValue));
        } else if (!checked && found) {
          const filtered = [...modelValue];
          filtered.splice(index, 1);
          assign2(filtered);
        }
      } else if (isSet$1(modelValue)) {
        const cloned = new Set(modelValue);
        if (checked) {
          cloned.add(elementValue);
        } else {
          cloned.delete(elementValue);
        }
        assign2(cloned);
      } else {
        assign2(getCheckboxValue(el, checked));
      }
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: setChecked,
  beforeUpdate(el, binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    setChecked(el, binding, vnode);
  }
};
function setChecked(el, { value, oldValue }, vnode) {
  el._modelValue = value;
  let checked;
  if (isArray$2(value)) {
    checked = looseIndexOf$1(value, vnode.props.value) > -1;
  } else if (isSet$1(value)) {
    checked = value.has(vnode.props.value);
  } else {
    if (value === oldValue) return;
    checked = looseEqual$1(value, getCheckboxValue(el, true));
  }
  if (el.checked !== checked) {
    el.checked = checked;
  }
}
const vModelRadio = {
  created(el, { value }, vnode) {
    el.checked = looseEqual$1(value, vnode.props.value);
    el[assignKey] = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      el[assignKey](getValue(el));
    });
  },
  beforeUpdate(el, { value, oldValue }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (value !== oldValue) {
      el.checked = looseEqual$1(value, vnode.props.value);
    }
  }
};
const vModelSelect = {
  // <select multiple> value need to be deep traversed
  deep: true,
  created(el, { value, modifiers: { number: number2 } }, vnode) {
    const isSetModel = isSet$1(value);
    addEventListener(el, "change", () => {
      const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map(
        (o) => number2 ? looseToNumber$1(getValue(o)) : getValue(o)
      );
      el[assignKey](
        el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]
      );
      el._assigning = true;
      nextTick(() => {
        el._assigning = false;
      });
    });
    el[assignKey] = getModelAssigner(vnode);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(el, { value }) {
    setSelected(el, value);
  },
  beforeUpdate(el, _binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
  },
  updated(el, { value }) {
    if (!el._assigning) {
      setSelected(el, value);
    }
  }
};
function setSelected(el, value) {
  const isMultiple = el.multiple;
  const isArrayValue = isArray$2(value);
  if (isMultiple && !isArrayValue && !isSet$1(value)) {
    !!(process.env.NODE_ENV !== "production") && warn$3(
      `<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(value).slice(8, -1)}.`
    );
    return;
  }
  for (let i = 0, l = el.options.length; i < l; i++) {
    const option = el.options[i];
    const optionValue = getValue(option);
    if (isMultiple) {
      if (isArrayValue) {
        const optionType = typeof optionValue;
        if (optionType === "string" || optionType === "number") {
          option.selected = value.some((v) => String(v) === String(optionValue));
        } else {
          option.selected = looseIndexOf$1(value, optionValue) > -1;
        }
      } else {
        option.selected = value.has(optionValue);
      }
    } else if (looseEqual$1(getValue(option), value)) {
      if (el.selectedIndex !== i) el.selectedIndex = i;
      return;
    }
  }
  if (!isMultiple && el.selectedIndex !== -1) {
    el.selectedIndex = -1;
  }
}
function getValue(el) {
  return "_value" in el ? el._value : el.value;
}
function getCheckboxValue(el, checked) {
  const key = checked ? "_trueValue" : "_falseValue";
  return key in el ? el[key] : checked;
}
const vModelDynamic = {
  created(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, "created");
  },
  mounted(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, "mounted");
  },
  beforeUpdate(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, "beforeUpdate");
  },
  updated(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, "updated");
  }
};
function resolveDynamicModel(tagName, type) {
  switch (tagName) {
    case "SELECT":
      return vModelSelect;
    case "TEXTAREA":
      return vModelText;
    default:
      switch (type) {
        case "checkbox":
          return vModelCheckbox;
        case "radio":
          return vModelRadio;
        default:
          return vModelText;
      }
  }
}
function callModelHook(el, binding, vnode, prevVNode, hook) {
  const modelToUse = resolveDynamicModel(
    el.tagName,
    vnode.props && vnode.props.type
  );
  const fn = modelToUse[hook];
  fn && fn(el, binding, vnode, prevVNode);
}
function initVModelForSSR() {
  vModelText.getSSRProps = ({ value }) => ({ value });
  vModelRadio.getSSRProps = ({ value }, vnode) => {
    if (vnode.props && looseEqual$1(vnode.props.value, value)) {
      return { checked: true };
    }
  };
  vModelCheckbox.getSSRProps = ({ value }, vnode) => {
    if (isArray$2(value)) {
      if (vnode.props && looseIndexOf$1(value, vnode.props.value) > -1) {
        return { checked: true };
      }
    } else if (isSet$1(value)) {
      if (vnode.props && value.has(vnode.props.value)) {
        return { checked: true };
      }
    } else if (value) {
      return { checked: true };
    }
  };
  vModelDynamic.getSSRProps = (binding, vnode) => {
    if (typeof vnode.type !== "string") {
      return;
    }
    const modelToUse = resolveDynamicModel(
      // resolveDynamicModel expects an uppercase tag name, but vnode.type is lowercase
      vnode.type.toUpperCase(),
      vnode.props && vnode.props.type
    );
    if (modelToUse.getSSRProps) {
      return modelToUse.getSSRProps(binding, vnode);
    }
  };
}
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn, modifiers) => {
  const cache2 = fn._withMods || (fn._withMods = {});
  const cacheKey = modifiers.join(".");
  return cache2[cacheKey] || (cache2[cacheKey] = (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers)) return;
    }
    return fn(event, ...args);
  });
};
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn, modifiers) => {
  let globalKeyCodes;
  let instance = null;
  {
    instance = getCurrentInstance$1();
    if (compatUtils.isCompatEnabled("CONFIG_KEY_CODES", instance)) {
      if (instance) {
        globalKeyCodes = instance.appContext.config.keyCodes;
      }
    }
    if (!!(process.env.NODE_ENV !== "production") && modifiers.some((m) => /^\d+$/.test(m))) {
      compatUtils.warnDeprecation(
        "V_ON_KEYCODE_MODIFIER",
        instance
      );
    }
  }
  const cache2 = fn._withKeys || (fn._withKeys = {});
  const cacheKey = modifiers.join(".");
  return cache2[cacheKey] || (cache2[cacheKey] = (event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = hyphenate$1(event.key);
    if (modifiers.some(
      (k) => k === eventKey || keyNames[k] === eventKey
    )) {
      return fn(event);
    }
    {
      const keyCode = String(event.keyCode);
      if (compatUtils.isCompatEnabled(
        "V_ON_KEYCODE_MODIFIER",
        instance
      ) && modifiers.some((mod) => mod == keyCode)) {
        return fn(event);
      }
      if (globalKeyCodes) {
        for (const mod of modifiers) {
          const codes = globalKeyCodes[mod];
          if (codes) {
            const matches2 = isArray$2(codes) ? codes.some((code) => String(code) === keyCode) : String(codes) === keyCode;
            if (matches2) {
              return fn(event);
            }
          }
        }
      }
    }
  });
};
const rendererOptions = /* @__PURE__ */ extend$1({ patchProp }, nodeOps);
let renderer;
let enabledHydration = false;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
}
const render = (...args) => {
  ensureRenderer().render(...args);
};
const hydrate = (...args) => {
  ensureHydrationRenderer().hydrate(...args);
};
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  if (!!(process.env.NODE_ENV !== "production")) {
    injectNativeTagCheck(app);
    injectCompilerOptionsCheck(app);
  }
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app._component;
    if (!isFunction$2(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
      if (!!(process.env.NODE_ENV !== "production") && container.nodeType === 1) {
        for (let i = 0; i < container.attributes.length; i++) {
          const attr = container.attributes[i];
          if (attr.name !== "v-cloak" && /^(?:v-|:|@)/.test(attr.name)) {
            compatUtils.warnDeprecation(
              "GLOBAL_MOUNT_CONTAINER",
              null
            );
            break;
          }
        }
      }
    }
    if (container.nodeType === 1) {
      container.textContent = "";
    }
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
const createSSRApp = (...args) => {
  const app = ensureHydrationRenderer().createApp(...args);
  if (!!(process.env.NODE_ENV !== "production")) {
    injectNativeTagCheck(app);
    injectCompilerOptionsCheck(app);
  }
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (container) {
      return mount(container, true, resolveRootNamespace(container));
    }
  };
  return app;
};
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function injectNativeTagCheck(app) {
  Object.defineProperty(app.config, "isNativeTag", {
    value: (tag) => isHTMLTag$1(tag) || isSVGTag$1(tag) || isMathMLTag$1(tag),
    writable: false
  });
}
function injectCompilerOptionsCheck(app) {
  if (isRuntimeOnly()) {
    const isCustomElement = app.config.isCustomElement;
    Object.defineProperty(app.config, "isCustomElement", {
      get() {
        return isCustomElement;
      },
      set() {
        warn$3(
          `The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`
        );
      }
    });
    const compilerOptions = app.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc`;
    Object.defineProperty(app.config, "compilerOptions", {
      get() {
        warn$3(msg);
        return compilerOptions;
      },
      set() {
        warn$3(msg);
      }
    });
  }
}
function normalizeContainer(container) {
  if (isString$2(container)) {
    const res = document.querySelector(container);
    if (!!(process.env.NODE_ENV !== "production") && !res) {
      warn$3(
        `Failed to mount app: mount target selector "${container}" returned null.`
      );
    }
    return res;
  }
  if (!!(process.env.NODE_ENV !== "production") && window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
    warn$3(
      `mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`
    );
  }
  return container;
}
let ssrDirectiveInitialized = false;
const initDirectivesForSSR = () => {
  if (!ssrDirectiveInitialized) {
    ssrDirectiveInitialized = true;
    initVModelForSSR();
    initVShowForSSR();
  }
};
var runtimeDom = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BaseTransition,
  BaseTransitionPropsValidators,
  Comment,
  DeprecationTypes,
  EffectScope,
  ErrorCodes,
  ErrorTypeStrings,
  Fragment,
  KeepAlive,
  ReactiveEffect,
  Static,
  Suspense,
  Teleport,
  Text,
  TrackOpTypes,
  Transition,
  TransitionGroup,
  TriggerOpTypes,
  VueElement,
  assertNumber,
  callWithAsyncErrorHandling,
  callWithErrorHandling,
  camelize: camelize$1,
  capitalize: capitalize$2,
  cloneVNode,
  compatUtils,
  computed,
  createApp,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createElementVNode: createBaseVNode,
  createHydrationRenderer,
  createPropsRestProxy,
  createRenderer,
  createSSRApp,
  createSlots,
  createStaticVNode,
  createTextVNode,
  createVNode,
  customRef,
  defineAsyncComponent,
  defineComponent,
  defineCustomElement,
  defineEmits,
  defineExpose,
  defineModel,
  defineOptions,
  defineProps,
  defineSSRCustomElement,
  defineSlots,
  devtools: devtools$2,
  effect,
  effectScope,
  getCurrentInstance: getCurrentInstance$1,
  getCurrentScope,
  getCurrentWatcher,
  getTransitionRawChildren,
  guardReactiveProps,
  h,
  handleError,
  hasInjectionContext,
  hydrate,
  hydrateOnIdle,
  hydrateOnInteraction,
  hydrateOnMediaQuery,
  hydrateOnVisible,
  initCustomFormatter,
  initDirectivesForSSR,
  inject,
  isMemoSame,
  isProxy,
  isReactive,
  isReadonly,
  isRef: isRef$2,
  isRuntimeOnly,
  isShallow,
  isVNode: isVNode$3,
  markRaw,
  mergeDefaults,
  mergeModels,
  mergeProps,
  nextTick,
  nodeOps,
  normalizeClass: normalizeClass$1,
  normalizeProps: normalizeProps$1,
  normalizeStyle: normalizeStyle$1,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onScopeDispose,
  onServerPrefetch,
  onUnmounted,
  onUpdated,
  onWatcherCleanup,
  openBlock,
  patchProp,
  popScopeId,
  provide,
  proxyRefs,
  pushScopeId,
  queuePostFlushCb,
  reactive,
  readonly,
  ref,
  registerRuntimeCompiler,
  render,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDirective,
  resolveDynamicComponent,
  resolveFilter,
  resolveTransitionHooks,
  setBlockTracking,
  setDevtoolsHook,
  setTransitionHooks,
  shallowReactive,
  shallowReadonly,
  shallowRef,
  ssrContextKey,
  ssrUtils,
  stop,
  toDisplayString: toDisplayString$2,
  toHandlerKey: toHandlerKey$1,
  toHandlers,
  toRaw,
  toRef,
  toRefs,
  toValue,
  transformVNodeArgs,
  triggerRef,
  unref,
  useAttrs,
  useCssModule,
  useCssVars,
  useHost,
  useId,
  useModel,
  useSSRContext,
  useShadowRoot,
  useSlots,
  useTemplateRef,
  useTransitionState,
  vModelCheckbox,
  vModelDynamic,
  vModelRadio,
  vModelSelect,
  vModelText,
  vShow,
  version,
  warn: warn$3,
  watch,
  watchEffect,
  watchPostEffect,
  watchSyncEffect,
  withAsyncContext,
  withCtx,
  withDefaults,
  withDirectives,
  withKeys,
  withMemo,
  withModifiers,
  withScopeId
});
function initDev() {
  {
    initCustomFormatter();
  }
}
if (!!(process.env.NODE_ENV !== "production")) {
  initDev();
}
function wrappedCreateApp(...args) {
  const app = createApp(...args);
  if (compatUtils.isCompatEnabled("RENDER_FUNCTION", null)) {
    app.component("__compat__transition", Transition);
    app.component("__compat__transition-group", TransitionGroup);
    app.component("__compat__keep-alive", KeepAlive);
    app._context.directives.show = vShow;
    app._context.directives.model = vModelDynamic;
  }
  return app;
}
function createCompatVue() {
  const Vue2 = compatUtils.createCompatVue(createApp, wrappedCreateApp);
  extend$1(Vue2, runtimeDom);
  return Vue2;
}
const Vue$1 = createCompatVue();
Vue$1.compile = () => {
  if (!!(process.env.NODE_ENV !== "production")) {
    warn$3(
      `Runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "@vue/compat/dist/vue.esm-bundler.js".`
    );
  }
};
const configureCompat = Vue$1.configureCompat;
const vue_runtime_esmBundler = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BaseTransition,
  BaseTransitionPropsValidators,
  Comment,
  DeprecationTypes,
  EffectScope,
  ErrorCodes,
  ErrorTypeStrings,
  Fragment,
  KeepAlive,
  ReactiveEffect,
  Static,
  Suspense,
  Teleport,
  Text,
  TrackOpTypes,
  Transition,
  TransitionGroup,
  TriggerOpTypes,
  VueElement,
  assertNumber,
  callWithAsyncErrorHandling,
  callWithErrorHandling,
  camelize: camelize$1,
  capitalize: capitalize$2,
  cloneVNode,
  compatUtils,
  computed,
  configureCompat,
  createApp,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createElementVNode: createBaseVNode,
  createHydrationRenderer,
  createPropsRestProxy,
  createRenderer,
  createSSRApp,
  createSlots,
  createStaticVNode,
  createTextVNode,
  createVNode,
  customRef,
  default: Vue$1,
  defineAsyncComponent,
  defineComponent,
  defineCustomElement,
  defineEmits,
  defineExpose,
  defineModel,
  defineOptions,
  defineProps,
  defineSSRCustomElement,
  defineSlots,
  devtools: devtools$2,
  effect,
  effectScope,
  getCurrentInstance: getCurrentInstance$1,
  getCurrentScope,
  getCurrentWatcher,
  getTransitionRawChildren,
  guardReactiveProps,
  h,
  handleError,
  hasInjectionContext,
  hydrate,
  hydrateOnIdle,
  hydrateOnInteraction,
  hydrateOnMediaQuery,
  hydrateOnVisible,
  initCustomFormatter,
  initDirectivesForSSR,
  inject,
  isMemoSame,
  isProxy,
  isReactive,
  isReadonly,
  isRef: isRef$2,
  isRuntimeOnly,
  isShallow,
  isVNode: isVNode$3,
  markRaw,
  mergeDefaults,
  mergeModels,
  mergeProps,
  nextTick,
  nodeOps,
  normalizeClass: normalizeClass$1,
  normalizeProps: normalizeProps$1,
  normalizeStyle: normalizeStyle$1,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onScopeDispose,
  onServerPrefetch,
  onUnmounted,
  onUpdated,
  onWatcherCleanup,
  openBlock,
  patchProp,
  popScopeId,
  provide,
  proxyRefs,
  pushScopeId,
  queuePostFlushCb,
  reactive,
  readonly,
  ref,
  registerRuntimeCompiler,
  render,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDirective,
  resolveDynamicComponent,
  resolveFilter,
  resolveTransitionHooks,
  setBlockTracking,
  setDevtoolsHook,
  setTransitionHooks,
  shallowReactive,
  shallowReadonly,
  shallowRef,
  ssrContextKey,
  ssrUtils,
  stop,
  toDisplayString: toDisplayString$2,
  toHandlerKey: toHandlerKey$1,
  toHandlers,
  toRaw,
  toRef,
  toRefs,
  toValue,
  transformVNodeArgs,
  triggerRef,
  unref,
  useAttrs,
  useCssModule,
  useCssVars,
  useHost,
  useId,
  useModel,
  useSSRContext,
  useShadowRoot,
  useSlots,
  useTemplateRef,
  useTransitionState,
  vModelCheckbox,
  vModelDynamic,
  vModelRadio,
  vModelSelect,
  vModelText,
  vShow,
  version,
  warn: warn$3,
  watch,
  watchEffect,
  watchPostEffect,
  watchSyncEffect,
  withAsyncContext,
  withCtx,
  withDefaults,
  withDirectives,
  withKeys,
  withMemo,
  withModifiers,
  withScopeId
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * shared v11.2.8
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const hasWarned = {};
function warnOnce(msg) {
  if (!hasWarned[msg]) {
    hasWarned[msg] = true;
    warn(msg);
  }
}
const inBrowser = typeof window !== "undefined";
let mark;
let measure;
if (process.env.NODE_ENV !== "production") {
  const perf2 = inBrowser && window.performance;
  if (perf2 && perf2.mark && perf2.measure && perf2.clearMarks && // @ts-ignore browser compat
  perf2.clearMeasures) {
    mark = (tag) => {
      perf2.mark(tag);
    };
    measure = (name, startTag, endTag) => {
      perf2.measure(name, startTag, endTag);
      perf2.clearMarks(startTag);
      perf2.clearMarks(endTag);
    };
  }
}
const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
function format$1(message, ...args) {
  if (args.length === 1 && isObject$1(args[0])) {
    args = args[0];
  }
  if (!args || !args.hasOwnProperty) {
    args = {};
  }
  return message.replace(RE_ARGS, (match, identifier) => {
    return args.hasOwnProperty(identifier) ? args[identifier] : "";
  });
}
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate$1 = (val) => toTypeString$1(val) === "[object Date]";
const isRegExp$1 = (val) => toTypeString$1(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject$1(val) && Object.keys(val).length === 0;
const assign = Object.assign;
const _create = Object.create;
const create = (obj = null) => _create(obj);
let _globalThis$1;
const getGlobalThis$1 = () => {
  return _globalThis$1 || (_globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : create());
};
function escapeHtml$1(rawText) {
  return rawText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function escapeAttributeValue(value) {
  return value.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function sanitizeTranslatedHtml(html) {
  html = html.replace(/(\w+)\s*=\s*"([^"]*)"/g, (_, attrName, attrValue) => `${attrName}="${escapeAttributeValue(attrValue)}"`);
  html = html.replace(/(\w+)\s*=\s*'([^']*)'/g, (_, attrName, attrValue) => `${attrName}='${escapeAttributeValue(attrValue)}'`);
  const eventHandlerPattern = /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi;
  if (eventHandlerPattern.test(html)) {
    if (process.env.NODE_ENV !== "production") {
      warn("Potentially dangerous event handlers detected in translation. Consider removing onclick, onerror, etc. from your translation messages.");
    }
    html = html.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3");
  }
  const javascriptUrlPattern = [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ];
  javascriptUrlPattern.forEach((pattern) => {
    html = html.replace(pattern, "$1javascript&#58;");
  });
  return html;
}
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function hasOwn$1(obj, key) {
  return hasOwnProperty$1.call(obj, key);
}
const isArray$1 = Array.isArray;
const isFunction$1 = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise$1 = (val) => {
  return isObject$1(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString$1 = Object.prototype.toString;
const toTypeString$1 = (value) => objectToString$1.call(value);
const isPlainObject$1 = (val) => toTypeString$1(val) === "[object Object]";
const toDisplayString$1 = (val) => {
  return val == null ? "" : isArray$1(val) || isPlainObject$1(val) && val.toString === objectToString$1 ? JSON.stringify(val, null, 2) : String(val);
};
function join(items, separator = "") {
  return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
}
const RANGE = 2;
function generateCodeFrame$1(source, start = 0, end = source.length) {
  const lines = source.split(/\r?\n/);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const line = j + 1;
        res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        if (j === i) {
          const pad = start - (count - lineLength) + 1;
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + 1;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
function createEmitter() {
  const events = /* @__PURE__ */ new Map();
  const emitter = {
    events,
    on(event, handler) {
      const handlers = events.get(event);
      const added = handlers && handlers.push(handler);
      if (!added) {
        events.set(event, [handler]);
      }
    },
    off(event, handler) {
      const handlers = events.get(event);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    emit(event, payload) {
      (events.get(event) || []).slice().map((handler) => handler(payload));
      (events.get("*") || []).slice().map((handler) => handler(event, payload));
    }
  };
  return emitter;
}
const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray$1(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw new Error("Invalid value");
  }
  const stack2 = [{ src, des }];
  while (stack2.length) {
    const { src: src2, des: des2 } = stack2.pop();
    Object.keys(src2).forEach((key) => {
      if (key === "__proto__") {
        return;
      }
      if (isObject$1(src2[key]) && !isObject$1(des2[key])) {
        des2[key] = Array.isArray(src2[key]) ? [] : create();
      }
      if (isNotObjectOrIsArray(des2[key]) || isNotObjectOrIsArray(src2[key])) {
        des2[key] = src2[key];
      } else {
        stack2.push({ src: src2[key], des: des2[key] });
      }
    });
  }
}
/*!
  * core-base v11.2.8
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function initFeatureFlags$1() {
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    getGlobalThis$1().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
}
function isMessageAST(val) {
  return isObject$1(val) && resolveType(val) === 0 && (hasOwn$1(val, "b") || hasOwn$1(val, "body"));
}
const PROPS_BODY = ["b", "body"];
function resolveBody(node) {
  return resolveProps(node, PROPS_BODY);
}
const PROPS_CASES = ["c", "cases"];
function resolveCases(node) {
  return resolveProps(node, PROPS_CASES, []);
}
const PROPS_STATIC = ["s", "static"];
function resolveStatic(node) {
  return resolveProps(node, PROPS_STATIC);
}
const PROPS_ITEMS = ["i", "items"];
function resolveItems(node) {
  return resolveProps(node, PROPS_ITEMS, []);
}
const PROPS_TYPE = ["t", "type"];
function resolveType(node) {
  return resolveProps(node, PROPS_TYPE);
}
const PROPS_VALUE = ["v", "value"];
function resolveValue$1(node, type) {
  const resolved = resolveProps(node, PROPS_VALUE);
  if (resolved != null) {
    return resolved;
  } else {
    throw createUnhandleNodeError(type);
  }
}
const PROPS_MODIFIER = ["m", "modifier"];
function resolveLinkedModifier(node) {
  return resolveProps(node, PROPS_MODIFIER);
}
const PROPS_KEY = ["k", "key"];
function resolveLinkedKey(node) {
  const resolved = resolveProps(node, PROPS_KEY);
  if (resolved) {
    return resolved;
  } else {
    throw createUnhandleNodeError(
      6
      /* NodeTypes.Linked */
    );
  }
}
function resolveProps(node, props, defaultValue) {
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (hasOwn$1(node, prop) && node[prop] != null) {
      return node[prop];
    }
  }
  return defaultValue;
}
const AST_NODE_PROPS_KEYS = [
  ...PROPS_BODY,
  ...PROPS_CASES,
  ...PROPS_STATIC,
  ...PROPS_ITEMS,
  ...PROPS_KEY,
  ...PROPS_MODIFIER,
  ...PROPS_VALUE,
  ...PROPS_TYPE
];
function createUnhandleNodeError(type) {
  return new Error(`unhandled node type: ${type}`);
}
function format(ast) {
  const msg = (ctx) => formatParts(ctx, ast);
  return msg;
}
function formatParts(ctx, ast) {
  const body = resolveBody(ast);
  if (body == null) {
    throw createUnhandleNodeError(
      0
      /* NodeTypes.Resource */
    );
  }
  const type = resolveType(body);
  if (type === 1) {
    const plural = body;
    const cases = resolveCases(plural);
    return ctx.plural(cases.reduce((messages, c) => [
      ...messages,
      formatMessageParts(ctx, c)
    ], []));
  } else {
    return formatMessageParts(ctx, body);
  }
}
function formatMessageParts(ctx, node) {
  const static_ = resolveStatic(node);
  if (static_ != null) {
    return ctx.type === "text" ? static_ : ctx.normalize([static_]);
  } else {
    const messages = resolveItems(node).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
    return ctx.normalize(messages);
  }
}
function formatMessagePart(ctx, node) {
  const type = resolveType(node);
  switch (type) {
    case 3: {
      return resolveValue$1(node, type);
    }
    case 9: {
      return resolveValue$1(node, type);
    }
    case 4: {
      const named = node;
      if (hasOwn$1(named, "k") && named.k) {
        return ctx.interpolate(ctx.named(named.k));
      }
      if (hasOwn$1(named, "key") && named.key) {
        return ctx.interpolate(ctx.named(named.key));
      }
      throw createUnhandleNodeError(type);
    }
    case 5: {
      const list = node;
      if (hasOwn$1(list, "i") && isNumber(list.i)) {
        return ctx.interpolate(ctx.list(list.i));
      }
      if (hasOwn$1(list, "index") && isNumber(list.index)) {
        return ctx.interpolate(ctx.list(list.index));
      }
      throw createUnhandleNodeError(type);
    }
    case 6: {
      const linked = node;
      const modifier = resolveLinkedModifier(linked);
      const key = resolveLinkedKey(linked);
      return ctx.linked(formatMessagePart(ctx, key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
    }
    case 7: {
      return resolveValue$1(node, type);
    }
    case 8: {
      return resolveValue$1(node, type);
    }
    default:
      throw new Error(`unhandled node on format message part: ${type}`);
  }
}
const WARN_MESSAGE = `Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.`;
function checkHtmlMessage(source, warnHtmlMessage) {
  if (warnHtmlMessage && detectHtmlTag(source)) {
    warn(format$1(WARN_MESSAGE, { source }));
  }
}
const defaultOnCacheKey = (message) => message;
let compileCache$1 = create();
function baseCompile(message, options = {}) {
  let detectError = false;
  const onError = options.onError || defaultOnError;
  options.onError = (err) => {
    detectError = true;
    onError(err);
  };
  return { ...baseCompile$1(message, options), detectError };
}
// @__NO_SIDE_EFFECTS__
function compile(message, context) {
  if (isString$1(message)) {
    const warnHtmlMessage = isBoolean(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
    process.env.NODE_ENV !== "production" && checkHtmlMessage(message, warnHtmlMessage);
    const onCacheKey = context.onCacheKey || defaultOnCacheKey;
    const cacheKey = onCacheKey(message);
    const cached = compileCache$1[cacheKey];
    if (cached) {
      return cached;
    }
    const { ast, detectError } = baseCompile(message, {
      ...context,
      location: process.env.NODE_ENV !== "production",
      jit: true
    });
    const msg = format(ast);
    return !detectError ? compileCache$1[cacheKey] = msg : msg;
  } else {
    if (process.env.NODE_ENV !== "production" && !isMessageAST(message)) {
      warn(`the message that is resolve with key '${context.key}' is not supported for jit compilation`);
      return () => message;
    }
    const cacheKey = message.cacheKey;
    if (cacheKey) {
      const cached = compileCache$1[cacheKey];
      if (cached) {
        return cached;
      }
      return compileCache$1[cacheKey] = format(message);
    } else {
      return format(message);
    }
  }
}
let devtools = null;
function setDevToolsHook(hook) {
  devtools = hook;
}
function initI18nDevTools(i18n, version2, meta) {
  devtools && devtools.emit("i18n:init", {
    timestamp: Date.now(),
    i18n,
    version: version2,
    meta
  });
}
const translateDevTools = /* @__PURE__ */ createDevToolsHook("function:translate");
function createDevToolsHook(hook) {
  return (payloads) => devtools && devtools.emit(hook, payloads);
}
const CoreErrorCodes = {
  INVALID_ARGUMENT: COMPILE_ERROR_CODES_EXTEND_POINT,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_NON_STRING_MESSAGE: 20,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
};
const CORE_ERROR_CODES_EXTEND_POINT = 24;
function createCoreError(code) {
  return createCompileError(code, null, process.env.NODE_ENV !== "production" ? { messages: errorMessages$1 } : void 0);
}
const errorMessages$1 = {
  [CoreErrorCodes.INVALID_ARGUMENT]: "Invalid arguments",
  [CoreErrorCodes.INVALID_DATE_ARGUMENT]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
  [CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT]: "The argument provided is not a valid ISO date string",
  [CoreErrorCodes.NOT_SUPPORT_NON_STRING_MESSAGE]: "Not support non-string message",
  [CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE]: "cannot support promise value",
  [CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION]: "cannot support async function",
  [CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE]: "cannot support locale type"
};
function getLocale(context, options) {
  return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
}
let _resolveLocale;
function resolveLocale(locale) {
  if (isString$1(locale)) {
    return locale;
  } else {
    if (isFunction$1(locale)) {
      if (locale.resolvedOnce && _resolveLocale != null) {
        return _resolveLocale;
      } else if (locale.constructor.name === "Function") {
        const resolve2 = locale();
        if (isPromise$1(resolve2)) {
          throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
        }
        return _resolveLocale = resolve2;
      } else {
        throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
      }
    } else {
      throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
    }
  }
}
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray$1(fallback) ? fallback : isObject$1(fallback) ? Object.keys(fallback) : isString$1(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString$1(start) ? start : DEFAULT_LOCALE;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray$1(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray$1(fallback) || !isPlainObject$1(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString$1(defaults) ? [defaults] : defaults;
    if (isArray$1(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString$1(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray$1(blocks) || isPlainObject$1(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
const pathStateMachine = [];
pathStateMachine[
  0
  /* States.BEFORE_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    0
    /* States.BEFORE_PATH */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  1
  /* States.IN_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1
    /* States.IN_PATH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  2
  /* States.BEFORE_IDENT */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  3
  /* States.IN_IDENT */
] = {
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1,
    1
    /* Actions.PUSH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2,
    1
    /* Actions.PUSH */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    1
    /* Actions.PUSH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7,
    1
    /* Actions.PUSH */
  ]
};
pathStateMachine[
  4
  /* States.IN_SUB_PATH */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ],
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  [
    "]"
    /* PathCharTypes.RIGHT_BRACKET */
  ]: [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code = ch.charCodeAt(0);
  switch (code) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return ch;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys = [];
  let index = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[
    0
    /* Actions.APPEND */
  ] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[
    1
    /* Actions.PUSH */
  ] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    actions[
      0
      /* Actions.APPEND */
    ]();
    subPathDepth++;
  };
  actions[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[
        0
        /* Actions.APPEND */
      ]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[
          1
          /* Actions.PUSH */
        ]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index++;
      newChar = "\\" + nextChar;
      actions[
        0
        /* Actions.APPEND */
      ]();
      return true;
    }
  }
  while (mode !== null) {
    index++;
    c = path[index];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap[
      "l"
      /* PathCharTypes.ELSE */
    ] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject$1(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject$1(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const key = hit[i];
    if (AST_NODE_PROPS_KEYS.includes(key) && isMessageAST(last)) {
      return null;
    }
    const val = last[key];
    if (val === void 0) {
      return null;
    }
    if (isFunction$1(last)) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
const CoreWarnCodes = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7
};
const CORE_WARN_CODES_EXTEND_POINT = 8;
const warnMessages$1 = {
  [CoreWarnCodes.NOT_FOUND_KEY]: `Not found '{key}' key in '{locale}' locale messages.`,
  [CoreWarnCodes.FALLBACK_TO_TRANSLATE]: `Fall back to translate '{key}' key with '{target}' locale.`,
  [CoreWarnCodes.CANNOT_FORMAT_NUMBER]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
  [CoreWarnCodes.FALLBACK_TO_NUMBER_FORMAT]: `Fall back to number format '{key}' key with '{target}' locale.`,
  [CoreWarnCodes.CANNOT_FORMAT_DATE]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
  [CoreWarnCodes.FALLBACK_TO_DATE_FORMAT]: `Fall back to datetime format '{key}' key with '{target}' locale.`,
  [CoreWarnCodes.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: `This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future.`
};
function getWarnMessage$1(code, ...args) {
  return format$1(warnMessages$1[code], ...args);
}
const VERSION$1 = "11.2.8";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize$1 = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString$1(val) ? val.toUpperCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString$1(val) ? val.toLowerCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString$1(val) ? capitalize$1(val) : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? capitalize$1(val.children) : val;
    }
  };
}
let _compiler;
function registerMessageCompiler(compiler) {
  _compiler = compiler;
}
let _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
let _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
let _additionalMeta = null;
const setAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ (meta) => {
  _additionalMeta = meta;
};
const getAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ () => _additionalMeta;
let _fallbackContext = null;
const setFallbackContext = (context) => {
  _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
let _cid = 0;
function createCoreContext(options = {}) {
  const onWarn = isFunction$1(options.onWarn) ? options.onWarn : warn;
  const version2 = isString$1(options.version) ? options.version : VERSION$1;
  const locale = isString$1(options.locale) || isFunction$1(options.locale) ? options.locale : DEFAULT_LOCALE;
  const _locale = isFunction$1(locale) ? DEFAULT_LOCALE : locale;
  const fallbackLocale = isArray$1(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || isString$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
  const messages = isPlainObject$1(options.messages) ? options.messages : createResources(_locale);
  const datetimeFormats = isPlainObject$1(options.datetimeFormats) ? options.datetimeFormats : createResources(_locale);
  const numberFormats = isPlainObject$1(options.numberFormats) ? options.numberFormats : createResources(_locale);
  const modifiers = assign(create(), options.modifiers, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || create();
  const missing = isFunction$1(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp$1(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp$1(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction$1(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject$1(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction$1(options.messageCompiler) ? options.messageCompiler : _compiler;
  if (process.env.NODE_ENV !== "production" && true && true && isFunction$1(options.messageCompiler)) {
    warnOnce(getWarnMessage$1(CoreWarnCodes.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER));
  }
  const messageResolver = isFunction$1(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction$1(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject$1(options.fallbackContext) ? options.fallbackContext : void 0;
  const internalOptions = options;
  const __datetimeFormatters = isObject$1(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject$1(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject$1(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version: version2,
    cid: _cid,
    locale,
    fallbackLocale,
    messages,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  if (process.env.NODE_ENV !== "production") {
    context.__v_emitter = internalOptions.__v_emitter != null ? internalOptions.__v_emitter : void 0;
  }
  if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
    initI18nDevTools(context, version2, __meta);
  }
  return context;
}
const createResources = (locale) => ({ [locale]: create() });
function isTranslateFallbackWarn(fallback, key) {
  return fallback instanceof RegExp ? fallback.test(key) : fallback;
}
function isTranslateMissingWarn(missing, key) {
  return missing instanceof RegExp ? missing.test(key) : missing;
}
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  if (process.env.NODE_ENV !== "production") {
    const emitter = context.__v_emitter;
    if (emitter) {
      emitter.emit("missing", {
        locale,
        key,
        type,
        groupId: `${type}:${key}`
      });
    }
  }
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString$1(ret) ? ret : key;
  } else {
    if (process.env.NODE_ENV !== "production" && isTranslateMissingWarn(missingWarn, key)) {
      onWarn(getWarnMessage$1(CoreWarnCodes.NOT_FOUND_KEY, { key, locale }));
    }
    return key;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
function isAlmostSameLocale(locale, compareLocale) {
  if (locale === compareLocale)
    return false;
  return locale.split("-")[0] === compareLocale.split("-")[0];
}
function isImplicitFallback(targetLocale, locales) {
  const index = locales.indexOf(targetLocale);
  if (index === -1) {
    return false;
  }
  for (let i = index + 1; i < locales.length; i++) {
    if (isAlmostSameLocale(targetLocale, locales[i])) {
      return true;
    }
  }
  return false;
}
const intlDefined = typeof Intl !== "undefined";
const Availabilities = {
  dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== "undefined",
  numberFormat: intlDefined && typeof Intl.NumberFormat !== "undefined"
};
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  if (process.env.NODE_ENV !== "production" && !Availabilities.dateTimeFormat) {
    onWarn(getWarnMessage$1(CoreWarnCodes.CANNOT_FORMAT_DATE));
    return MISSING_RESOLVE_VALUE;
  }
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString$1(key) || key === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "datetime format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = to = locales[i];
    if (process.env.NODE_ENV !== "production" && locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(CoreWarnCodes.FALLBACK_TO_DATE_FORMAT, {
        key,
        target: targetLocale
      }));
    }
    if (process.env.NODE_ENV !== "production" && locale !== targetLocale) {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("fallback", {
          type,
          key,
          from,
          to,
          groupId: `${type}:${key}`
        });
      }
    }
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key];
    if (isPlainObject$1(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
    from = to;
  }
  if (!isPlainObject$1(format2) || !isString$1(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = create();
  let overrides = create();
  let value;
  if (isString$1(arg1)) {
    const matches2 = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches2) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches2[3] ? matches2[3].trim().startsWith("T") ? `${matches2[1].trim()}${matches2[3].trim()}` : `${matches2[1].trim()}T${matches2[3].trim()}` : matches2[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate$1(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString$1(arg2)) {
    options.key = arg2;
  } else if (isPlainObject$1(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString$1(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject$1(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject$1(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  if (process.env.NODE_ENV !== "production" && !Availabilities.numberFormat) {
    onWarn(getWarnMessage$1(CoreWarnCodes.CANNOT_FORMAT_NUMBER));
    return MISSING_RESOLVE_VALUE;
  }
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString$1(key) || key === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "number format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = to = locales[i];
    if (process.env.NODE_ENV !== "production" && locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(CoreWarnCodes.FALLBACK_TO_NUMBER_FORMAT, {
        key,
        target: targetLocale
      }));
    }
    if (process.env.NODE_ENV !== "production" && locale !== targetLocale) {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("fallback", {
          type,
          key,
          from,
          to,
          groupId: `${type}:${key}`
        });
      }
    }
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key];
    if (isPlainObject$1(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
    from = to;
  }
  if (!isPlainObject$1(format2) || !isString$1(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = create();
  let overrides = create();
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString$1(arg2)) {
    options.key = arg2;
  } else if (isPlainObject$1(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString$1(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject$1(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject$1(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join(values);
const DEFAULT_INTERPOLATE = toDisplayString$1;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject$1(options.pluralRules) && isString$1(locale) && isFunction$1(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject$1(options.pluralRules) && isString$1(locale) && isFunction$1(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages) => {
    return messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index) => _list[index];
  const _named = options.named || create();
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key, useLinked) {
    const msg = isFunction$1(options.messages) ? options.messages(key, !!useLinked) : isObject$1(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject$1(options.processor) && isFunction$1(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject$1(options.processor) && isFunction$1(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject$1(options.processor) && isString$1(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject$1(arg1)) {
        modifier = arg1.modifier || modifier;
        type2 = arg1.type || type2;
      } else if (isString$1(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString$1(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString$1(arg2)) {
        type2 = arg2 || type2;
      }
    }
    const ret = message(key, true)(ctx);
    const msg = (
      // The message in vnode resolved with linked are returned as an array by processor.nomalize
      type2 === "vnode" && isArray$1(ret) && modifier ? ret[0] : ret
    );
    return modifier ? _modifier(modifier)(msg, type2) : msg;
  };
  const ctx = {
    [
      "list"
      /* HelperNameMap.LIST */
    ]: list,
    [
      "named"
      /* HelperNameMap.NAMED */
    ]: named,
    [
      "plural"
      /* HelperNameMap.PLURAL */
    ]: plural,
    [
      "linked"
      /* HelperNameMap.LINKED */
    ]: linked,
    [
      "message"
      /* HelperNameMap.MESSAGE */
    ]: message,
    [
      "type"
      /* HelperNameMap.TYPE */
    ]: type,
    [
      "interpolate"
      /* HelperNameMap.INTERPOLATE */
    ]: interpolate,
    [
      "normalize"
      /* HelperNameMap.NORMALIZE */
    ]: normalize,
    [
      "values"
      /* HelperNameMap.VALUES */
    ]: assign(create(), _list, _named)
  };
  return ctx;
}
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction$1(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString$1(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : null;
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey != null && (isString$1(defaultMsgOrKey) || isFunction$1(defaultMsgOrKey));
  const locale = getLocale(context, options);
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages[locale] || create()
  ];
  let format2 = formatScope;
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString$1(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  if (process.env.NODE_ENV !== "production" && isString$1(format2) && context.messageCompiler == null) {
    warn(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${key}'.`);
    return key;
  }
  let occurred = false;
  const onError = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  let ret = postTranslation ? postTranslation(messaged, key) : messaged;
  if (escapeParameter && isString$1(ret)) {
    ret = sanitizeTranslatedHtml(ret);
  }
  if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
    const payloads = {
      timestamp: Date.now(),
      key: isString$1(key) ? key : isMessageFunction(format2) ? format2.key : "",
      locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
      format: isString$1(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
      message: ret
    };
    payloads.meta = assign({}, context.__meta, /* @__PURE__ */ getAdditionalMeta() || {});
    translateDevTools(payloads);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray$1(options.list)) {
    options.list = options.list.map((item) => isString$1(item) ? escapeHtml$1(item) : item);
  } else if (isObject$1(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString$1(options.named[key])) {
        options.named[key] = escapeHtml$1(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales = localeFallbacker(context, fallbackLocale, locale);
  let message = create();
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "translate";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = to = locales[i];
    if (process.env.NODE_ENV !== "production" && locale !== targetLocale && !isAlmostSameLocale(locale, targetLocale) && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(CoreWarnCodes.FALLBACK_TO_TRANSLATE, {
        key,
        target: targetLocale
      }));
    }
    if (process.env.NODE_ENV !== "production" && locale !== targetLocale) {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("fallback", {
          type,
          key,
          from,
          to,
          groupId: `${type}:${key}`
        });
      }
    }
    message = messages[targetLocale] || create();
    let start = null;
    let startTag;
    let endTag;
    if (process.env.NODE_ENV !== "production" && inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-resolve-start";
      endTag = "intlify-message-resolve-end";
      mark && mark(startTag);
    }
    if ((format2 = resolveValue2(message, key)) === null) {
      format2 = message[key];
    }
    if (process.env.NODE_ENV !== "production" && inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start && format2) {
        emitter.emit("message-resolve", {
          type: "message-resolve",
          key,
          message: format2,
          time: end - start,
          groupId: `${type}:${key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message resolve", startTag, endTag);
      }
    }
    if (isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) {
      break;
    }
    if (!isImplicitFallback(targetLocale, locales)) {
      const missingRet = handleMissing(
        context,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        key,
        targetLocale,
        missingWarn,
        type
      );
      if (missingRet !== key) {
        format2 = missingRet;
      }
    }
    from = to;
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  if (messageCompiler == null) {
    const msg2 = () => format2;
    msg2.locale = targetLocale;
    msg2.key = key;
    return msg2;
  }
  let start = null;
  let startTag;
  let endTag;
  if (process.env.NODE_ENV !== "production" && inBrowser) {
    start = window.performance.now();
    startTag = "intlify-message-compilation-start";
    endTag = "intlify-message-compilation-end";
    mark && mark(startTag);
  }
  const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
  if (process.env.NODE_ENV !== "production" && inBrowser) {
    const end = window.performance.now();
    const emitter = context.__v_emitter;
    if (emitter && start) {
      emitter.emit("message-compilation", {
        type: "message-compilation",
        message: format2,
        time: end - start,
        groupId: `${"translate"}:${key}`
      });
    }
    if (startTag && endTag && mark && measure) {
      mark(endTag);
      measure("intlify message compilation", startTag, endTag);
    }
  }
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  let start = null;
  let startTag;
  let endTag;
  if (process.env.NODE_ENV !== "production" && inBrowser) {
    start = window.performance.now();
    startTag = "intlify-message-evaluation-start";
    endTag = "intlify-message-evaluation-end";
    mark && mark(startTag);
  }
  const messaged = msg(msgCtx);
  if (process.env.NODE_ENV !== "production" && inBrowser) {
    const end = window.performance.now();
    const emitter = context.__v_emitter;
    if (emitter && start) {
      emitter.emit("message-evaluation", {
        type: "message-evaluation",
        value: messaged,
        time: end - start,
        groupId: `${"translate"}:${msg.key}`
      });
    }
    if (startTag && endTag && mark && measure) {
      mark(endTag);
      measure("intlify message evaluation", startTag, endTag);
    }
  }
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = create();
  if (!isString$1(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString$1(arg2)) {
    options.default = arg2;
  } else if (isPlainObject$1(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray$1(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString$1(arg3)) {
    options.default = arg3;
  } else if (isPlainObject$1(arg3)) {
    assign(options, arg3);
  }
  return [key, options];
}
function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
  return {
    locale,
    key,
    warnHtmlMessage,
    onError: (err) => {
      onError && onError(err);
      if (process.env.NODE_ENV !== "production") {
        const _source = getSourceForCodeFrame(source);
        const message = `Message compilation error: ${err.message}`;
        const codeFrame = err.location && _source && generateCodeFrame$1(_source, err.location.start.offset, err.location.end.offset);
        const emitter = context.__v_emitter;
        if (emitter && _source) {
          emitter.emit("compile-error", {
            message: _source,
            error: err.message,
            start: err.location && err.location.start.offset,
            end: err.location && err.location.end.offset,
            groupId: `${"translate"}:${key}`
          });
        }
        console.error(codeFrame ? `${message}
${codeFrame}` : message);
      } else {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getSourceForCodeFrame(source) {
  if (isString$1(source)) {
    return source;
  } else {
    if (source.loc && source.loc.source) {
      return source.loc.source;
    }
  }
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key, useLinked) => {
    let val = resolveValue2(message, key);
    if (val == null && (fallbackContext || useLinked)) {
      const [, , message2] = resolveMessageFormat(
        fallbackContext || context,
        // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
        key,
        locale,
        fallbackLocale,
        fallbackWarn,
        missingWarn
      );
      val = resolveValue2(message2, key);
    }
    if (isString$1(val) || isMessageAST(val)) {
      let occurred = false;
      const onError = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, onError);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
{
  initFeatureFlags$1();
}
/*!
  * vue-i18n v11.2.8
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "11.2.8";
function initFeatureFlags() {
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    getGlobalThis$1().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
}
const I18nErrorCodes = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: CORE_ERROR_CODES_EXTEND_POINT,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: 25,
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: 26,
  NOT_INSTALLED: 27,
  // directive module errors
  REQUIRED_VALUE: 28,
  INVALID_VALUE: 29,
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: 30,
  NOT_INSTALLED_WITH_PROVIDE: 31,
  // unexpected error
  UNEXPECTED_ERROR: 32,
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: 33,
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
};
function createI18nError(code, ...args) {
  return createCompileError(code, null, process.env.NODE_ENV !== "production" ? { messages: errorMessages, args } : void 0);
}
const errorMessages = {
  [I18nErrorCodes.UNEXPECTED_RETURN_TYPE]: "Unexpected return type in composer",
  [I18nErrorCodes.INVALID_ARGUMENT]: "Invalid argument",
  [I18nErrorCodes.MUST_BE_CALL_SETUP_TOP]: "Must be called at the top of a `setup` function",
  [I18nErrorCodes.NOT_INSTALLED]: "Need to install with `app.use` function",
  [I18nErrorCodes.UNEXPECTED_ERROR]: "Unexpected error",
  [I18nErrorCodes.REQUIRED_VALUE]: `Required in value: {0}`,
  [I18nErrorCodes.INVALID_VALUE]: `Invalid value`,
  [I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: `Cannot setup vue-devtools plugin`,
  [I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE]: "Need to install with `provide` function",
  [I18nErrorCodes.NOT_COMPATIBLE_LEGACY_VUE_I18N]: "Not compatible legacy VueI18n.",
  [I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: "Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"
};
const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol("__translateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const EnableEmitter = /* @__PURE__ */ makeSymbol("__enableEmitter");
const DisableEmitter = /* @__PURE__ */ makeSymbol("__disableEmitter");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol("__injectWithOption");
const DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
const I18nWarnCodes = {
  FALLBACK_TO_ROOT: CORE_WARN_CODES_EXTEND_POINT,
  // 8
  NOT_FOUND_PARENT_SCOPE: 9,
  IGNORE_OBJ_FLATTEN: 10,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  DEPRECATE_LEGACY_MODE: 11,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE: 12,
  // duplicate `useI18n` calling
  DUPLICATE_USE_I18N_CALLING: 13
};
const warnMessages = {
  [I18nWarnCodes.FALLBACK_TO_ROOT]: `Fall back to {type} '{key}' with root locale.`,
  [I18nWarnCodes.NOT_FOUND_PARENT_SCOPE]: `Not found parent scope. use the global scope.`,
  [I18nWarnCodes.IGNORE_OBJ_FLATTEN]: `Ignore object flatten: '{key}' key has an string value`,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  [I18nWarnCodes.DEPRECATE_LEGACY_MODE]: `Legacy API mode has been deprecated in v11. Use Composition API mode instead.
About how to use the Composition API mode, see https://vue-i18n.intlify.dev/guide/advanced/composition.html`,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  [I18nWarnCodes.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE]: `'v-t' has been deprecated in v11. Use translate APIs ('t' or '$t') instead.`,
  [I18nWarnCodes.DUPLICATE_USE_I18N_CALLING]: "Duplicate `useI18n` calling by local scope. Please don't call it on local scope, due to it does not work properly in component."
};
function getWarnMessage(code, ...args) {
  return format$1(warnMessages[code], ...args);
}
function handleFlatJson(obj) {
  if (!isObject$1(obj)) {
    return obj;
  }
  if (isMessageAST(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn$1(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject$1(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      let hasStringValue = false;
      for (let i = 0; i < lastIndex; i++) {
        if (subKeys[i] === "__proto__") {
          throw new Error(`unsafe key: ${subKeys[i]}`);
        }
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = create();
        }
        if (!isObject$1(currentObj[subKeys[i]])) {
          process.env.NODE_ENV !== "production" && warn(getWarnMessage(I18nWarnCodes.IGNORE_OBJ_FLATTEN, {
            key: subKeys[i]
          }));
          hasStringValue = true;
          break;
        }
        currentObj = currentObj[subKeys[i]];
      }
      if (!hasStringValue) {
        if (!isMessageAST(currentObj)) {
          currentObj[subKeys[lastIndex]] = obj[key];
          delete obj[key];
        } else {
          if (!AST_NODE_PROPS_KEYS.includes(subKeys[lastIndex])) {
            delete obj[key];
          }
        }
      }
      if (!isMessageAST(currentObj)) {
        const target = currentObj[subKeys[lastIndex]];
        if (isObject$1(target)) {
          handleFlatJson(target);
        }
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject$1(messages) ? messages : isArray$1(__i18n) ? create() : { [locale]: create() };
  if (isArray$1(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || create();
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString$1(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn$1(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(gl, options, componentOptions) {
  let messages = isObject$1(options.messages) ? options.messages : create();
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(gl.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages);
  if (locales.length) {
    locales.forEach((locale) => {
      gl.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (isObject$1(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject$1(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
function getCurrentInstance() {
  {
    return getCurrentInstance$1();
  }
}
const DEVTOOLS_META = "__INTLIFY_META__";
const NOOP_RETURN_ARRAY = () => [];
const NOOP_RETURN_FALSE = () => false;
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
const getMetaInfo = /* @__NO_SIDE_EFFECTS__ */ () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}) {
  const { __root, __injectWithOption } = options;
  const _isGlobal = __root === void 0;
  const flatJson = options.flatJson;
  const _ref = inBrowser ? ref : shallowRef;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString$1(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString$1(options.fallbackLocale) || isArray$1(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = _ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = _ref(isPlainObject$1(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = _ref(isPlainObject$1(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp$1(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp$1(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction$1(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction$1(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction$1(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject$1(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      messageCompiler: options.messageCompiler,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject$1(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject$1(_context) ? _context.__numberFormatters : void 0;
    }
    if (process.env.NODE_ENV !== "production") {
      ctxOptions.__v_emitter = isPlainObject$1(_context) ? _context.__v_emitter : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _context.locale = val;
      _locale.value = val;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _context.fallbackLocale = val;
      _fallbackLocale.value = val;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction$1(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  function isResolvedTranslateMessage(type, arg) {
    return type !== "translate" || !arg.resolvedMessage;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    try {
      if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
        /* @__PURE__ */ setAdditionalMeta(/* @__PURE__ */ getMetaInfo());
      }
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0;
      }
      ret = fn(_context);
    } finally {
      if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) ;
      if (!_isGlobal) {
        _context.fallbackContext = void 0;
      }
    }
    if (warnType !== "translate exists" && // for not `te` (e.g `t`)
    isNumber(ret) && ret === NOT_REOSLVED || warnType === "translate exists" && !ret) {
      const [key, arg2] = argumentParser();
      if (process.env.NODE_ENV !== "production" && __root && isString$1(key) && isResolvedTranslateMessage(warnType, arg2)) {
        if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key) || isTranslateMissingWarn(_missingWarn, key))) {
          warn(getWarnMessage(I18nWarnCodes.FALLBACK_TO_ROOT, {
            key,
            type: warnType
          }));
        }
        if (process.env.NODE_ENV !== "production") {
          const { __v_emitter: emitter } = _context;
          if (emitter && _fallbackRoot) {
            emitter.emit("fallback", {
              type: warnType,
              key,
              to: "global",
              groupId: `${warnType}:${key}`
            });
          }
        }
      }
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString$1(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject$1(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val) || isArray$1(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val) || isArray$1(val));
  }
  function normalize(values) {
    return values.map((val) => isString$1(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps((context) => {
      let ret;
      const _context2 = context;
      try {
        _context2.processor = processor;
        ret = Reflect.apply(translate, null, [_context2, ...args]);
      } finally {
        _context2.processor = null;
      }
      return ret;
    }, () => parseTranslateArgs(...args), "translate", (root) => root[TranslateVNodeSymbol](...args), (key) => [createTextNode(key)], (val) => isArray$1(val));
  }
  function numberParts(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => root[NumberPartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString$1(val) || isArray$1(val));
  }
  function datetimeParts(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => root[DatetimePartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString$1(val) || isArray$1(val));
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    return wrapWithDeps(() => {
      if (!key) {
        return false;
      }
      const targetLocale = isString$1(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      const resolved = _context.messageResolver(message, key);
      return isMessageAST(resolved) || isMessageFunction(resolved) || isString$1(resolved);
    }, () => [key], "translate exists", (root) => {
      return Reflect.apply(root.te, root, [key, locale2]);
    }, NOOP_RETURN_FALSE, (val) => isBoolean(val));
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    if (flatJson) {
      const _message = { [locale2]: message };
      for (const key in _message) {
        if (hasOwn$1(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
      message = _message[locale2];
    }
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    const _message = { [locale2]: message };
    if (flatJson) {
      for (const key in _message) {
        if (hasOwn$1(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
    }
    message = _message[locale2];
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOptionSymbol] = __injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  if (process.env.NODE_ENV !== "production") {
    composer[EnableEmitter] = (emitter) => {
      _context.__v_emitter = emitter;
    };
    composer[DisableEmitter] = () => {
      _context.__v_emitter = void 0;
    };
  }
  return composer;
}
const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
const VueDevToolsLabels = {
  "vue-devtools-plugin-vue-i18n": "Vue I18n DevTools",
  "vue-i18n-resource-inspector": "Vue I18n DevTools",
  "vue-i18n-timeline": "Vue I18n"
};
const VueDevToolsPlaceholders = {
  "vue-i18n-resource-inspector": "Search for scopes ..."
};
const VueDevToolsTimelineColors = {
  "vue-i18n-timeline": 16764185
};
let devtoolsApi;
async function enableDevTools(app, i18n) {
  return new Promise((resolve2, reject) => {
    try {
      setupDevtoolsPlugin({
        id: "vue-devtools-plugin-vue-i18n",
        label: VueDevToolsLabels["vue-devtools-plugin-vue-i18n"],
        packageName: "vue-i18n",
        homepage: "https://vue-i18n.intlify.dev",
        logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
        componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
        app
        // eslint-disable-line @typescript-eslint/no-explicit-any
      }, (api) => {
        devtoolsApi = api;
        api.on.visitComponentTree(({ componentInstance, treeNode }) => {
          updateComponentTreeTags(componentInstance, treeNode, i18n);
        });
        api.on.inspectComponent(({ componentInstance, instanceData }) => {
          if (componentInstance.__VUE_I18N__ && instanceData) {
            if (i18n.mode === "legacy") {
              if (componentInstance.__VUE_I18N__ !== i18n.global.__composer) {
                inspectComposer(instanceData, componentInstance.__VUE_I18N__);
              }
            } else {
              inspectComposer(instanceData, componentInstance.__VUE_I18N__);
            }
          }
        });
        api.addInspector({
          id: "vue-i18n-resource-inspector",
          label: VueDevToolsLabels["vue-i18n-resource-inspector"],
          icon: "language",
          treeFilterPlaceholder: VueDevToolsPlaceholders["vue-i18n-resource-inspector"]
        });
        api.on.getInspectorTree((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            registerScope(payload, i18n);
          }
        });
        const roots = /* @__PURE__ */ new Map();
        api.on.getInspectorState(async (payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            api.unhighlightElement();
            inspectScope(payload, i18n);
            if (payload.nodeId === "global") {
              if (!roots.has(payload.app)) {
                const [root] = await api.getComponentInstances(payload.app);
                roots.set(payload.app, root);
              }
              api.highlightElement(roots.get(payload.app));
            } else {
              const instance = getComponentInstance(payload.nodeId, i18n);
              instance && api.highlightElement(instance);
            }
          }
        });
        api.on.editInspectorState((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            editScope(payload, i18n);
          }
        });
        api.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: VueDevToolsLabels["vue-i18n-timeline"],
          color: VueDevToolsTimelineColors["vue-i18n-timeline"]
        });
        resolve2(true);
      });
    } catch (e) {
      console.error(e);
      reject(false);
    }
  });
}
function getI18nScopeLable(instance) {
  return instance.type.name || instance.type.displayName || instance.type.__file || "Anonymous";
}
function updateComponentTreeTags(instance, treeNode, i18n) {
  const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  if (instance && instance.__VUE_I18N__) {
    if (instance.__VUE_I18N__ !== global2) {
      const tag = {
        label: `i18n (${getI18nScopeLable(instance)} Scope)`,
        textColor: 0,
        backgroundColor: 16764185
      };
      treeNode.tags.push(tag);
    }
  }
}
function inspectComposer(instanceData, composer) {
  const type = VUE_I18N_COMPONENT_TYPES;
  instanceData.state.push({
    type,
    key: "locale",
    editable: true,
    value: composer.locale.value
  });
  instanceData.state.push({
    type,
    key: "availableLocales",
    editable: false,
    value: composer.availableLocales
  });
  instanceData.state.push({
    type,
    key: "fallbackLocale",
    editable: true,
    value: composer.fallbackLocale.value
  });
  instanceData.state.push({
    type,
    key: "inheritLocale",
    editable: true,
    value: composer.inheritLocale
  });
  instanceData.state.push({
    type,
    key: "messages",
    editable: false,
    value: getLocaleMessageValue(composer.messages.value)
  });
  {
    instanceData.state.push({
      type,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
}
function getLocaleMessageValue(messages) {
  const value = {};
  Object.keys(messages).forEach((key) => {
    const v = messages[key];
    if (isFunction$1(v) && "source" in v) {
      value[key] = getMessageFunctionDetails(v);
    } else if (isMessageAST(v) && v.loc && v.loc.source) {
      value[key] = v.loc.source;
    } else if (isObject$1(v)) {
      value[key] = getLocaleMessageValue(v);
    } else {
      value[key] = v;
    }
  });
  return value;
}
const ESC = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function escape(s) {
  return s.replace(/[<>"&]/g, escapeChar);
}
function escapeChar(a) {
  return ESC[a] || a;
}
function getMessageFunctionDetails(func) {
  const argString = func.source ? `("${escape(func.source)}")` : `(?)`;
  return {
    _custom: {
      type: "function",
      display: `<span>ƒ</span> ${argString}`
    }
  };
}
function registerScope(payload, i18n) {
  payload.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  for (const [keyInstance, instance] of i18n.__instances) {
    const composer = i18n.mode === "composition" ? instance : instance.__composer;
    if (global2 === composer) {
      continue;
    }
    payload.rootNodes.push({
      id: composer.id.toString(),
      label: `${getI18nScopeLable(keyInstance)} Scope`
    });
  }
}
function getComponentInstance(nodeId, i18n) {
  let instance = null;
  if (nodeId !== "global") {
    for (const [component, composer] of i18n.__instances.entries()) {
      if (composer.id.toString() === nodeId) {
        instance = component;
        break;
      }
    }
  }
  return instance;
}
function getComposer$2(nodeId, i18n) {
  if (nodeId === "global") {
    return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  } else {
    const instance = Array.from(i18n.__instances.values()).find((item) => item.id.toString() === nodeId);
    if (instance) {
      return i18n.mode === "composition" ? instance : instance.__composer;
    } else {
      return null;
    }
  }
}
function inspectScope(payload, i18n) {
  const composer = getComposer$2(payload.nodeId, i18n);
  if (composer) {
    payload.state = makeScopeInspectState(composer);
  }
  return null;
}
function makeScopeInspectState(composer) {
  const state = {};
  const localeType = "Locale related info";
  const localeStates = [
    {
      type: localeType,
      key: "locale",
      editable: true,
      value: composer.locale.value
    },
    {
      type: localeType,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    },
    {
      type: localeType,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    },
    {
      type: localeType,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    }
  ];
  state[localeType] = localeStates;
  const localeMessagesType = "Locale messages info";
  const localeMessagesStates = [
    {
      type: localeMessagesType,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    }
  ];
  state[localeMessagesType] = localeMessagesStates;
  {
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
  }
  return state;
}
function addTimelineEvent(event, payload) {
  if (devtoolsApi) {
    let groupId;
    if (payload && "groupId" in payload) {
      groupId = payload.groupId;
      delete payload.groupId;
    }
    devtoolsApi.addTimelineEvent({
      layerId: "vue-i18n-timeline",
      event: {
        title: event,
        groupId,
        time: Date.now(),
        meta: {},
        data: payload || {},
        logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
      }
    });
  }
}
function editScope(payload, i18n) {
  const composer = getComposer$2(payload.nodeId, i18n);
  if (composer) {
    const [field] = payload.path;
    if (field === "locale" && isString$1(payload.state.value)) {
      composer.locale.value = payload.state.value;
    } else if (field === "fallbackLocale" && (isString$1(payload.state.value) || isArray$1(payload.state.value) || isObject$1(payload.state.value))) {
      composer.fallbackLocale.value = payload.state.value;
    } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
      composer.inheritLocale = payload.state.value;
    }
  }
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        // prettier-ignore
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, create());
  }
}
function getFragmentableTag() {
  return Fragment;
}
const TranslationImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-t",
  props: assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key[0] !== "_");
      const options = create();
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString$1(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n[TranslateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign(create(), attrs);
      const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
});
const Translation = TranslationImpl;
function isVNode$2(target) {
  return isArray$1(target) && !isString$1(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = create();
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString$1(props.format)) {
      options.key = props.format;
    } else if (isObject$1(props.format)) {
      if (isString$1(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign(create(), options2, { [prop]: props.format[prop] }) : options2;
      }, create());
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray$1(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode$2(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (isString$1(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign(create(), attrs);
    const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-n",
  props: assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[NumberPartsSymbol](...args)
    ));
  }
});
const NumberFormat = NumberFormatImpl;
function getComposer$1(i18n, instance) {
  const i18nInternal = i18n;
  if (i18n.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
  }
}
function vTDirective(i18n) {
  const _process = (binding) => {
    if (process.env.NODE_ENV !== "production") {
      warnOnce(getWarnMessage(I18nWarnCodes.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE));
    }
    const { instance, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$1(i18n, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    if (inBrowser && i18n.global === composer) {
      el.__i18nWatcher = watch(composer.locale, () => {
        binding.instance && binding.instance.$forceUpdate();
      });
    }
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (inBrowser && el.__i18nWatcher) {
      el.__i18nWatcher();
      el.__i18nWatcher = void 0;
      delete el.__i18nWatcher;
    }
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString$1(value)) {
    return { path: value };
  } else if (isPlainObject$1(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString$1(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n, ...options) {
  const pluginOptions = isPlainObject$1(options[0]) ? options[0] : {};
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    [Translation.name, "I18nT"].forEach((name) => app.component(name, Translation));
    [NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
    [DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
  }
  {
    app.directive("t", vTDirective(i18n));
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}) {
  const __legacyMode = false;
  if (process.env.NODE_ENV !== "production" && __legacyMode) ;
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = /* @__PURE__ */ makeSymbol(process.env.NODE_ENV !== "production" ? "vue-i18n" : "");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  const i18n = {
    // mode
    get mode() {
      return "composition";
    },
    // install plugin
    async install(app, ...options2) {
      if ((process.env.NODE_ENV !== "production" || false) && true) {
        app.__VUE_I18N__ = i18n;
      }
      app.__VUE_I18N_SYMBOL__ = symbol;
      app.provide(app.__VUE_I18N_SYMBOL__, i18n);
      if (isPlainObject$1(options2[0])) {
        const opts = options2[0];
        i18n.__composerExtend = opts.__composerExtend;
        i18n.__vueI18nExtend = opts.__vueI18nExtend;
      }
      let globalReleaseHandler = null;
      if (__globalInjection) {
        globalReleaseHandler = injectGlobalFields(app, i18n.global);
      }
      {
        apply(app, i18n, ...options2);
      }
      const unmountApp = app.unmount;
      app.unmount = () => {
        globalReleaseHandler && globalReleaseHandler();
        i18n.dispose();
        unmountApp();
      };
      if ((process.env.NODE_ENV !== "production" || false) && true) {
        const ret = await enableDevTools(app, i18n);
        if (!ret) {
          throw createI18nError(I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
        }
        const emitter = createEmitter();
        {
          const _composer = __global;
          _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        }
        emitter.on("*", addTimelineEvent);
      }
    },
    // global accessor
    get global() {
      return __global;
    },
    dispose() {
      globalScope.stop();
    },
    // @internal
    __instances,
    // @internal
    __getInstance,
    // @internal
    __setInstance,
    // @internal
    __deleteInstance
  };
  return i18n;
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
  }
  const i18n = getI18nInstance(instance);
  const gl = getGlobalComposer(i18n);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(gl, options, componentOptions);
    return gl;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      if (process.env.NODE_ENV !== "production") {
        warn(getWarnMessage(I18nWarnCodes.NOT_FOUND_PARENT_SCOPE));
      }
      composer2 = gl;
    }
    return composer2;
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (gl) {
      composerOptions.__root = gl;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
    }
    setupLifeCycle(i18nInternal, instance, composer);
    i18nInternal.__setInstance(instance, composer);
  } else {
    if (process.env.NODE_ENV !== "production" && scope === "local") {
      warn(getWarnMessage(I18nWarnCodes.DUPLICATE_USE_I18N_CALLING));
    }
  }
  return composer;
}
function createGlobal(options, legacyMode) {
  const scope = effectScope();
  const obj = scope.run(() => createComposer(options));
  if (obj == null) {
    throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
  }
  return [scope, obj];
}
function getI18nInstance(instance) {
  const i18n = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
  if (!i18n) {
    throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
  }
  return i18n;
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n) {
  return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = getParentComponentInstance(target, useComponent);
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function getParentComponentInstance(target, useComponent = false) {
  if (target == null) {
    return null;
  }
  return !useComponent ? target.parent : target.vnode.ctx || target.parent;
}
function setupLifeCycle(i18n, target, composer) {
  let emitter = null;
  onMounted(() => {
    if ((process.env.NODE_ENV !== "production" || false) && true) {
      target.__VUE_I18N__ = composer;
      emitter = createEmitter();
      const _composer = composer;
      _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
      emitter.on("*", addTimelineEvent);
    }
  }, target);
  onUnmounted(() => {
    const _composer = composer;
    if ((process.env.NODE_ENV !== "production" || false) && true) {
      emitter && emitter.off("*", addTimelineEvent);
      _composer[DisableEmitter] && _composer[DisableEmitter]();
      delete target.__VUE_I18N__;
    }
    i18n.__deleteInstance(target);
    const dispose = _composer[DisposeSymbol];
    if (dispose) {
      dispose();
      delete _composer[DisposeSymbol];
    }
  }, target);
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app, composer) {
  const i18n = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = /* @__PURE__ */ isRef$2(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
  const dispose = () => {
    delete app.config.globalProperties.$i18n;
    globalExportMethods.forEach((method) => {
      delete app.config.globalProperties[`$${method}`];
    });
  };
  return dispose;
}
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-d",
  props: assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[DatetimePartsSymbol](...args)
    ));
  }
});
const DatetimeFormat = DatetimeFormatImpl;
{
  initFeatureFlags();
}
registerMessageCompiler(compile);
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
  const target = getGlobalThis$1();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
if (process.env.NODE_ENV !== "production") ;
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var serverRenderer_cjs_prod = {};
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(vue_runtime_esmBundler);
var shared_cjs_prod = {};
/**
* @vue/shared v3.5.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
Object.defineProperty(shared_cjs_prod, "__esModule", { value: true });
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map2 = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map2[key] = 1;
  return (val) => val in map2;
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache2 = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache2[str];
    return hit || (cache2[str] = fn(str));
  };
};
const camelizeRE = /-\w/g;
const camelize = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
  }
);
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, ...arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](...arg);
  }
};
const def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
const toNumber = (val) => {
  const n = isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : {});
};
const identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
function genPropsAccessExp(name) {
  return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
}
function genCacheKey(source, options) {
  return source + JSON.stringify(
    options,
    (_, val) => typeof val === "function" ? val.toString() : val
  );
}
const PatchFlags = {
  "TEXT": 1,
  "1": "TEXT",
  "CLASS": 2,
  "2": "CLASS",
  "STYLE": 4,
  "4": "STYLE",
  "PROPS": 8,
  "8": "PROPS",
  "FULL_PROPS": 16,
  "16": "FULL_PROPS",
  "NEED_HYDRATION": 32,
  "32": "NEED_HYDRATION",
  "STABLE_FRAGMENT": 64,
  "64": "STABLE_FRAGMENT",
  "KEYED_FRAGMENT": 128,
  "128": "KEYED_FRAGMENT",
  "UNKEYED_FRAGMENT": 256,
  "256": "UNKEYED_FRAGMENT",
  "NEED_PATCH": 512,
  "512": "NEED_PATCH",
  "DYNAMIC_SLOTS": 1024,
  "1024": "DYNAMIC_SLOTS",
  "DEV_ROOT_FRAGMENT": 2048,
  "2048": "DEV_ROOT_FRAGMENT",
  "CACHED": -1,
  "-1": "CACHED",
  "BAIL": -2,
  "-2": "BAIL"
};
const PatchFlagNames = {
  [1]: `TEXT`,
  [2]: `CLASS`,
  [4]: `STYLE`,
  [8]: `PROPS`,
  [16]: `FULL_PROPS`,
  [32]: `NEED_HYDRATION`,
  [64]: `STABLE_FRAGMENT`,
  [128]: `KEYED_FRAGMENT`,
  [256]: `UNKEYED_FRAGMENT`,
  [512]: `NEED_PATCH`,
  [1024]: `DYNAMIC_SLOTS`,
  [2048]: `DEV_ROOT_FRAGMENT`,
  [-1]: `CACHED`,
  [-2]: `BAIL`
};
const ShapeFlags = {
  "ELEMENT": 1,
  "1": "ELEMENT",
  "FUNCTIONAL_COMPONENT": 2,
  "2": "FUNCTIONAL_COMPONENT",
  "STATEFUL_COMPONENT": 4,
  "4": "STATEFUL_COMPONENT",
  "TEXT_CHILDREN": 8,
  "8": "TEXT_CHILDREN",
  "ARRAY_CHILDREN": 16,
  "16": "ARRAY_CHILDREN",
  "SLOTS_CHILDREN": 32,
  "32": "SLOTS_CHILDREN",
  "TELEPORT": 64,
  "64": "TELEPORT",
  "SUSPENSE": 128,
  "128": "SUSPENSE",
  "COMPONENT_SHOULD_KEEP_ALIVE": 256,
  "256": "COMPONENT_SHOULD_KEEP_ALIVE",
  "COMPONENT_KEPT_ALIVE": 512,
  "512": "COMPONENT_KEPT_ALIVE",
  "COMPONENT": 6,
  "6": "COMPONENT"
};
const SlotFlags = {
  "STABLE": 1,
  "1": "STABLE",
  "DYNAMIC": 2,
  "2": "DYNAMIC",
  "FORWARDED": 3,
  "3": "FORWARDED"
};
const slotFlagsText = {
  [1]: "STABLE",
  [2]: "DYNAMIC",
  [3]: "FORWARDED"
};
const GLOBALS_ALLOWED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol";
const isGloballyAllowed = /* @__PURE__ */ makeMap(GLOBALS_ALLOWED);
const isGloballyWhitelisted = isGloballyAllowed;
const range = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  start = Math.max(0, Math.min(start, source.length));
  end = Math.max(0, Math.min(end, source.length));
  if (start > end) return "";
  let lines = source.split(/(\r?\n)/);
  const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
  lines = lines.filter((_, idx) => idx % 2 === 0);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) continue;
        const line = j + 1;
        res.push(
          `${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`
        );
        const lineLength = lines[j].length;
        const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
        if (j === i) {
          const pad = start - (count - (lineLength + newLineSeqLength));
          const length = Math.max(
            1,
            end > count ? lineLength - pad : end - start
          );
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + newLineSeqLength;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle(styles) {
  if (!styles) return "";
  if (isString(styles)) return styles;
  let ret = "";
  for (const key in styles) {
    const value = styles[key];
    if (isString(value) || typeof value === "number") {
      const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props) return null;
  let { class: klass, style } = props;
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isMathMLTag = /* @__PURE__ */ makeMap(MATH_TAGS);
const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
const isBooleanAttr = /* @__PURE__ */ makeMap(
  specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};
function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) {
    return attrValidationCache[name];
  }
  const isUnsafe = unsafeAttrCharRE.test(name);
  if (isUnsafe) {
    console.error(`unsafe attribute name: ${name}`);
  }
  return attrValidationCache[name] = !isUnsafe;
}
const propsToAttrMap = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv"
};
const isKnownHtmlAttr = /* @__PURE__ */ makeMap(
  `accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`
);
const isKnownSvgAttr = /* @__PURE__ */ makeMap(
  `xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`
);
const isKnownMathMLAttr = /* @__PURE__ */ makeMap(
  `accent,accentunder,actiontype,align,alignmentscope,altimg,altimg-height,altimg-valign,altimg-width,alttext,bevelled,close,columnsalign,columnlines,columnspan,denomalign,depth,dir,display,displaystyle,encoding,equalcolumns,equalrows,fence,fontstyle,fontweight,form,frame,framespacing,groupalign,height,href,id,indentalign,indentalignfirst,indentalignlast,indentshift,indentshiftfirst,indentshiftlast,indextype,justify,largetop,largeop,lquote,lspace,mathbackground,mathcolor,mathsize,mathvariant,maxsize,minlabelspacing,mode,other,overflow,position,rowalign,rowlines,rowspan,rquote,rspace,scriptlevel,scriptminsize,scriptsizemultiplier,selection,separator,separators,shift,side,src,stackalign,stretchy,subscriptshift,superscriptshift,symmetric,voffset,width,widths,xlink:href,xlink:show,xlink:type,xmlns`
);
function isRenderableAttrValue(value) {
  if (value == null) {
    return false;
  }
  const type = typeof value;
  return type === "string" || type === "number" || type === "boolean";
}
const escapeRE = /["'&<>]/;
function escapeHtml(string) {
  const str = "" + string;
  const match = escapeRE.exec(str);
  if (!match) {
    return str;
  }
  let html = "";
  let escaped;
  let index;
  let lastIndex = 0;
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escaped = "&quot;";
        break;
      case 38:
        escaped = "&amp;";
        break;
      case 39:
        escaped = "&#39;";
        break;
      case 60:
        escaped = "&lt;";
        break;
      case 62:
        escaped = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index) {
      html += str.slice(lastIndex, index);
    }
    lastIndex = index + 1;
    html += escaped;
  }
  return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
}
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
  return src.replace(commentStripRE, "");
}
const cssVarNameEscapeSymbolsRE = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
function getEscapedCssVarName(key, doubleEscape) {
  return key.replace(
    cssVarNameEscapeSymbolsRE,
    (s) => doubleEscape ? s === '"' ? '\\\\\\"' : `\\\\${s}` : `\\${s}`
  );
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length) return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b) return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject(a);
  bValidType = isObject(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const isRef = (val) => {
  return !!(val && val["__v_isRef"] === true);
};
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (isRef(val)) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
  );
};
function normalizeCssVarValue(value) {
  if (value == null) {
    return "initial";
  }
  if (typeof value === "string") {
    return value === "" ? " " : value;
  }
  return String(value);
}
shared_cjs_prod.EMPTY_ARR = EMPTY_ARR;
shared_cjs_prod.EMPTY_OBJ = EMPTY_OBJ;
shared_cjs_prod.NO = NO;
shared_cjs_prod.NOOP = NOOP;
shared_cjs_prod.PatchFlagNames = PatchFlagNames;
shared_cjs_prod.PatchFlags = PatchFlags;
shared_cjs_prod.ShapeFlags = ShapeFlags;
shared_cjs_prod.SlotFlags = SlotFlags;
shared_cjs_prod.camelize = camelize;
shared_cjs_prod.capitalize = capitalize;
shared_cjs_prod.cssVarNameEscapeSymbolsRE = cssVarNameEscapeSymbolsRE;
shared_cjs_prod.def = def;
shared_cjs_prod.escapeHtml = escapeHtml;
shared_cjs_prod.escapeHtmlComment = escapeHtmlComment;
shared_cjs_prod.extend = extend;
shared_cjs_prod.genCacheKey = genCacheKey;
shared_cjs_prod.genPropsAccessExp = genPropsAccessExp;
shared_cjs_prod.generateCodeFrame = generateCodeFrame;
shared_cjs_prod.getEscapedCssVarName = getEscapedCssVarName;
shared_cjs_prod.getGlobalThis = getGlobalThis;
shared_cjs_prod.hasChanged = hasChanged;
shared_cjs_prod.hasOwn = hasOwn;
shared_cjs_prod.hyphenate = hyphenate;
shared_cjs_prod.includeBooleanAttr = includeBooleanAttr;
shared_cjs_prod.invokeArrayFns = invokeArrayFns;
shared_cjs_prod.isArray = isArray;
shared_cjs_prod.isBooleanAttr = isBooleanAttr;
shared_cjs_prod.isBuiltInDirective = isBuiltInDirective;
shared_cjs_prod.isDate = isDate;
shared_cjs_prod.isFunction = isFunction;
shared_cjs_prod.isGloballyAllowed = isGloballyAllowed;
shared_cjs_prod.isGloballyWhitelisted = isGloballyWhitelisted;
shared_cjs_prod.isHTMLTag = isHTMLTag;
shared_cjs_prod.isIntegerKey = isIntegerKey;
shared_cjs_prod.isKnownHtmlAttr = isKnownHtmlAttr;
shared_cjs_prod.isKnownMathMLAttr = isKnownMathMLAttr;
shared_cjs_prod.isKnownSvgAttr = isKnownSvgAttr;
shared_cjs_prod.isMap = isMap;
shared_cjs_prod.isMathMLTag = isMathMLTag;
shared_cjs_prod.isModelListener = isModelListener;
shared_cjs_prod.isObject = isObject;
shared_cjs_prod.isOn = isOn;
shared_cjs_prod.isPlainObject = isPlainObject;
shared_cjs_prod.isPromise = isPromise;
shared_cjs_prod.isRegExp = isRegExp;
shared_cjs_prod.isRenderableAttrValue = isRenderableAttrValue;
shared_cjs_prod.isReservedProp = isReservedProp;
shared_cjs_prod.isSSRSafeAttrName = isSSRSafeAttrName;
shared_cjs_prod.isSVGTag = isSVGTag;
shared_cjs_prod.isSet = isSet;
shared_cjs_prod.isSpecialBooleanAttr = isSpecialBooleanAttr;
shared_cjs_prod.isString = isString;
shared_cjs_prod.isSymbol = isSymbol;
shared_cjs_prod.isVoidTag = isVoidTag;
shared_cjs_prod.looseEqual = looseEqual;
shared_cjs_prod.looseIndexOf = looseIndexOf;
shared_cjs_prod.looseToNumber = looseToNumber;
shared_cjs_prod.makeMap = makeMap;
shared_cjs_prod.normalizeClass = normalizeClass;
shared_cjs_prod.normalizeCssVarValue = normalizeCssVarValue;
shared_cjs_prod.normalizeProps = normalizeProps;
shared_cjs_prod.normalizeStyle = normalizeStyle;
shared_cjs_prod.objectToString = objectToString;
shared_cjs_prod.parseStringStyle = parseStringStyle;
shared_cjs_prod.propsToAttrMap = propsToAttrMap;
shared_cjs_prod.remove = remove;
shared_cjs_prod.slotFlagsText = slotFlagsText;
shared_cjs_prod.stringifyStyle = stringifyStyle;
shared_cjs_prod.toDisplayString = toDisplayString;
shared_cjs_prod.toHandlerKey = toHandlerKey;
shared_cjs_prod.toNumber = toNumber;
shared_cjs_prod.toRawType = toRawType;
shared_cjs_prod.toTypeString = toTypeString;
/**
* @vue/server-renderer v3.5.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
Object.defineProperty(serverRenderer_cjs_prod, "__esModule", { value: true });
var Vue = require$$0;
var shared = shared_cjs_prod;
var compilerSsr = require$$2;
function _interopNamespaceDefault$1(e) {
  var n = /* @__PURE__ */ Object.create(null);
  if (e) {
    for (var k in e) {
      n[k] = e[k];
    }
  }
  n.default = e;
  return Object.freeze(n);
}
var Vue__namespace = /* @__PURE__ */ _interopNamespaceDefault$1(Vue);
const shouldIgnoreProp = /* @__PURE__ */ shared.makeMap(
  `,key,ref,innerHTML,textContent,ref_key,ref_for`
);
function ssrRenderAttrs(props, tag) {
  let ret = "";
  for (let key in props) {
    if (shouldIgnoreProp(key) || shared.isOn(key) || tag === "textarea" && key === "value" || // force as property (not rendered in SSR)
    key.startsWith(".")) {
      continue;
    }
    const value = props[key];
    if (key.startsWith("^")) key = key.slice(1);
    if (key === "class" || key === "className") {
      ret += ` class="${ssrRenderClass(value)}"`;
    } else if (key === "style") {
      ret += ` style="${ssrRenderStyle(value)}"`;
    } else {
      ret += ssrRenderDynamicAttr(key, value, tag);
    }
  }
  return ret;
}
function ssrRenderDynamicAttr(key, value, tag) {
  if (!shared.isRenderableAttrValue(value)) {
    return ``;
  }
  const attrKey = tag && (tag.indexOf("-") > 0 || shared.isSVGTag(tag)) ? key : shared.propsToAttrMap[key] || key.toLowerCase();
  if (shared.isBooleanAttr(attrKey)) {
    return shared.includeBooleanAttr(value) ? ` ${attrKey}` : ``;
  } else if (shared.isSSRSafeAttrName(attrKey)) {
    return value === "" ? ` ${attrKey}` : ` ${attrKey}="${shared.escapeHtml(value)}"`;
  } else {
    console.warn(
      `[@vue/server-renderer] Skipped rendering unsafe attribute name: ${attrKey}`
    );
    return ``;
  }
}
function ssrRenderAttr(key, value) {
  if (!shared.isRenderableAttrValue(value)) {
    return ``;
  }
  return ` ${key}="${shared.escapeHtml(value)}"`;
}
function ssrRenderClass(raw) {
  return shared.escapeHtml(shared.normalizeClass(raw));
}
function ssrRenderStyle(raw) {
  if (!raw) {
    return "";
  }
  if (shared.isString(raw)) {
    return shared.escapeHtml(raw);
  }
  const styles = shared.normalizeStyle(ssrResetCssVars(raw));
  return shared.escapeHtml(shared.stringifyStyle(styles));
}
function ssrResetCssVars(raw) {
  if (!shared.isArray(raw) && shared.isObject(raw)) {
    const res = {};
    for (const key in raw) {
      if (key.startsWith(":--")) {
        res[key.slice(1)] = shared.normalizeCssVarValue(raw[key]);
      } else {
        res[key] = raw[key];
      }
    }
    return res;
  }
  return raw;
}
function ssrRenderComponent(comp, props = null, children = null, parentComponent = null, slotScopeId) {
  return renderComponentVNode(
    Vue.createVNode(comp, props, children),
    parentComponent,
    slotScopeId
  );
}
const { ensureValidVNode } = Vue.ssrUtils;
function ssrRenderSlot(slots, slotName, slotProps, fallbackRenderFn, push, parentComponent, slotScopeId) {
  push(`<!--[-->`);
  ssrRenderSlotInner(
    slots,
    slotName,
    slotProps,
    fallbackRenderFn,
    push,
    parentComponent,
    slotScopeId
  );
  push(`<!--]-->`);
}
function ssrRenderSlotInner(slots, slotName, slotProps, fallbackRenderFn, push, parentComponent, slotScopeId, transition) {
  const slotFn = slots[slotName];
  if (slotFn) {
    const slotBuffer = [];
    const bufferedPush = (item) => {
      slotBuffer.push(item);
    };
    const ret = slotFn(
      slotProps,
      bufferedPush,
      parentComponent,
      slotScopeId ? " " + slotScopeId : ""
    );
    if (shared.isArray(ret)) {
      const validSlotContent = ensureValidVNode(ret);
      if (validSlotContent) {
        renderVNodeChildren(
          push,
          validSlotContent,
          parentComponent,
          slotScopeId
        );
      } else if (fallbackRenderFn) {
        fallbackRenderFn();
      } else if (transition) {
        push(`<!---->`);
      }
    } else {
      let isEmptySlot = true;
      if (transition) {
        isEmptySlot = false;
      } else {
        for (let i = 0; i < slotBuffer.length; i++) {
          if (!isComment(slotBuffer[i])) {
            isEmptySlot = false;
            break;
          }
        }
      }
      if (isEmptySlot) {
        if (fallbackRenderFn) {
          fallbackRenderFn();
        }
      } else {
        let start = 0;
        let end = slotBuffer.length;
        if (transition && slotBuffer[0] === "<!--[-->" && slotBuffer[end - 1] === "<!--]-->") {
          start++;
          end--;
        }
        if (start < end) {
          for (let i = start; i < end; i++) {
            push(slotBuffer[i]);
          }
        } else if (transition) {
          push(`<!---->`);
        }
      }
    }
  } else if (fallbackRenderFn) {
    fallbackRenderFn();
  } else if (transition) {
    push(`<!---->`);
  }
}
const commentTestRE = /^<!--[\s\S]*-->$/;
const commentRE = /<!--[^]*?-->/gm;
function isComment(item) {
  if (typeof item !== "string" || !commentTestRE.test(item)) return false;
  if (item.length <= 8) return true;
  return !item.replace(commentRE, "").trim();
}
function ssrRenderTeleport(parentPush, contentRenderFn, target, disabled, parentComponent) {
  parentPush("<!--teleport start-->");
  const context = parentComponent.appContext.provides[Vue.ssrContextKey];
  const teleportBuffers = context.__teleportBuffers || (context.__teleportBuffers = {});
  const targetBuffer = teleportBuffers[target] || (teleportBuffers[target] = []);
  const bufferIndex = targetBuffer.length;
  let teleportContent;
  if (disabled) {
    contentRenderFn(parentPush);
    teleportContent = `<!--teleport start anchor--><!--teleport anchor-->`;
  } else {
    const { getBuffer, push } = createBuffer();
    push(`<!--teleport start anchor-->`);
    contentRenderFn(push);
    push(`<!--teleport anchor-->`);
    teleportContent = getBuffer();
  }
  targetBuffer.splice(bufferIndex, 0, teleportContent);
  parentPush("<!--teleport end-->");
}
function ssrInterpolate(value) {
  return shared.escapeHtml(shared.toDisplayString(value));
}
function ssrRenderList(source, renderItem) {
  if (shared.isArray(source) || shared.isString(source)) {
    for (let i = 0, l = source.length; i < l; i++) {
      renderItem(source[i], i);
    }
  } else if (typeof source === "number") {
    for (let i = 0; i < source; i++) {
      renderItem(i + 1, i);
    }
  } else if (shared.isObject(source)) {
    if (source[Symbol.iterator]) {
      const arr = Array.from(source);
      for (let i = 0, l = arr.length; i < l; i++) {
        renderItem(arr[i], i);
      }
    } else {
      const keys = Object.keys(source);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        renderItem(source[key], key, i);
      }
    }
  }
}
async function ssrRenderSuspense(push, { default: renderContent }) {
  if (renderContent) {
    renderContent();
  } else {
    push(`<!---->`);
  }
}
function ssrGetDirectiveProps(instance, dir, value, arg, modifiers = {}) {
  if (typeof dir !== "function" && dir.getSSRProps) {
    return dir.getSSRProps(
      {
        dir,
        instance: Vue.ssrUtils.getComponentPublicInstance(instance.$),
        value,
        oldValue: void 0,
        arg,
        modifiers
      },
      null
    ) || {};
  }
  return {};
}
const ssrLooseEqual = shared.looseEqual;
function ssrLooseContain(arr, value) {
  return shared.looseIndexOf(arr, value) > -1;
}
function ssrRenderDynamicModel(type, model, value) {
  switch (type) {
    case "radio":
      return shared.looseEqual(model, value) ? " checked" : "";
    case "checkbox":
      return (shared.isArray(model) ? ssrLooseContain(model, value) : model) ? " checked" : "";
    default:
      return ssrRenderAttr("value", model);
  }
}
function ssrGetDynamicModelProps(existingProps = {}, model) {
  const { type, value } = existingProps;
  switch (type) {
    case "radio":
      return shared.looseEqual(model, value) ? { checked: true } : null;
    case "checkbox":
      return (shared.isArray(model) ? ssrLooseContain(model, value) : model) ? { checked: true } : null;
    default:
      return { value: model };
  }
}
var helpers = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ssrGetDirectiveProps,
  ssrGetDynamicModelProps,
  ssrIncludeBooleanAttr: shared.includeBooleanAttr,
  ssrInterpolate,
  ssrLooseContain,
  ssrLooseEqual,
  ssrRenderAttr,
  ssrRenderAttrs,
  ssrRenderClass,
  ssrRenderComponent,
  ssrRenderDynamicAttr,
  ssrRenderDynamicModel,
  ssrRenderList,
  ssrRenderSlot,
  ssrRenderSlotInner,
  ssrRenderStyle,
  ssrRenderSuspense,
  ssrRenderTeleport,
  ssrRenderVNode: renderVNode
});
const compileCache = /* @__PURE__ */ Object.create(null);
function ssrCompile(template, instance) {
  const Component = instance.type;
  const { isCustomElement, compilerOptions } = instance.appContext.config;
  const { delimiters, compilerOptions: componentCompilerOptions } = Component;
  const finalCompilerOptions = shared.extend(
    shared.extend(
      {
        isCustomElement,
        delimiters
      },
      compilerOptions
    ),
    componentCompilerOptions
  );
  finalCompilerOptions.isCustomElement = finalCompilerOptions.isCustomElement || shared.NO;
  finalCompilerOptions.isNativeTag = finalCompilerOptions.isNativeTag || shared.NO;
  const cacheKey = JSON.stringify(
    {
      template,
      compilerOptions: finalCompilerOptions
    },
    (key, value) => {
      return shared.isFunction(value) ? value.toString() : value;
    }
  );
  const cached = compileCache[cacheKey];
  if (cached) {
    return cached;
  }
  finalCompilerOptions.onError = (err) => {
    {
      throw err;
    }
  };
  const { code } = compilerSsr.compile(template, finalCompilerOptions);
  const requireMap = {
    vue: Vue__namespace,
    "vue/server-renderer": helpers
  };
  const fakeRequire = (id) => requireMap[id];
  return compileCache[cacheKey] = Function("require", code)(fakeRequire);
}
const {
  createComponentInstance,
  setCurrentRenderingInstance,
  setupComponent,
  renderComponentRoot,
  normalizeVNode,
  pushWarningContext,
  popWarningContext
} = Vue.ssrUtils;
function createBuffer() {
  let appendable = false;
  const buffer2 = [];
  return {
    getBuffer() {
      return buffer2;
    },
    push(item) {
      const isStringItem = shared.isString(item);
      if (appendable && isStringItem) {
        buffer2[buffer2.length - 1] += item;
        return;
      }
      buffer2.push(item);
      appendable = isStringItem;
      if (shared.isPromise(item) || shared.isArray(item) && item.hasAsync) {
        buffer2.hasAsync = true;
      }
    }
  };
}
function renderComponentVNode(vnode, parentComponent = null, slotScopeId) {
  const instance = vnode.component = createComponentInstance(
    vnode,
    parentComponent,
    null
  );
  const res = setupComponent(
    instance,
    true
    /* isSSR */
  );
  const hasAsyncSetup = shared.isPromise(res);
  let prefetches = instance.sp;
  if (hasAsyncSetup || prefetches) {
    const p2 = Promise.resolve(res).then(() => {
      if (hasAsyncSetup) prefetches = instance.sp;
      if (prefetches) {
        return Promise.all(
          prefetches.map((prefetch) => prefetch.call(instance.proxy))
        );
      }
    }).catch(shared.NOOP);
    return p2.then(() => renderComponentSubTree(instance, slotScopeId));
  } else {
    return renderComponentSubTree(instance, slotScopeId);
  }
}
function renderComponentSubTree(instance, slotScopeId) {
  const comp = instance.type;
  const { getBuffer, push } = createBuffer();
  if (shared.isFunction(comp)) {
    let root = renderComponentRoot(instance);
    if (!comp.props) {
      for (const key in instance.attrs) {
        if (key.startsWith(`data-v-`)) {
          (root.props || (root.props = {}))[key] = ``;
        }
      }
    }
    renderVNode(push, instance.subTree = root, instance, slotScopeId);
  } else {
    if ((!instance.render || instance.render === shared.NOOP) && !instance.ssrRender && !comp.ssrRender && shared.isString(comp.template)) {
      comp.ssrRender = ssrCompile(comp.template, instance);
    }
    const ssrRender = instance.ssrRender || comp.ssrRender;
    if (ssrRender) {
      let attrs = instance.inheritAttrs !== false ? instance.attrs : void 0;
      let hasCloned = false;
      let cur = instance;
      while (true) {
        const scopeId = cur.vnode.scopeId;
        if (scopeId) {
          if (!hasCloned) {
            attrs = { ...attrs };
            hasCloned = true;
          }
          attrs[scopeId] = "";
        }
        const parent = cur.parent;
        if (parent && parent.subTree && parent.subTree === cur.vnode) {
          cur = parent;
        } else {
          break;
        }
      }
      if (slotScopeId) {
        if (!hasCloned) attrs = { ...attrs };
        const slotScopeIdList = slotScopeId.trim().split(" ");
        for (let i = 0; i < slotScopeIdList.length; i++) {
          attrs[slotScopeIdList[i]] = "";
        }
      }
      const prev = setCurrentRenderingInstance(instance);
      try {
        ssrRender(
          instance.proxy,
          push,
          instance,
          attrs,
          // compiler-optimized bindings
          instance.props,
          instance.setupState,
          instance.data,
          instance.ctx
        );
      } finally {
        setCurrentRenderingInstance(prev);
      }
    } else if (instance.render && instance.render !== shared.NOOP) {
      renderVNode(
        push,
        instance.subTree = renderComponentRoot(instance),
        instance,
        slotScopeId
      );
    } else {
      const componentName = comp.name || comp.__file || `<Anonymous>`;
      Vue.warn(`Component ${componentName} is missing template or render function.`);
      push(`<!---->`);
    }
  }
  return getBuffer();
}
function renderVNode(push, vnode, parentComponent, slotScopeId) {
  const { type, shapeFlag, children, dirs, props } = vnode;
  if (dirs) {
    vnode.props = applySSRDirectives(vnode, props, dirs);
  }
  switch (type) {
    case Vue.Text:
      push(shared.escapeHtml(children));
      break;
    case Vue.Comment:
      push(
        children ? `<!--${shared.escapeHtmlComment(children)}-->` : `<!---->`
      );
      break;
    case Vue.Static:
      push(children);
      break;
    case Vue.Fragment:
      if (vnode.slotScopeIds) {
        slotScopeId = (slotScopeId ? slotScopeId + " " : "") + vnode.slotScopeIds.join(" ");
      }
      push(`<!--[-->`);
      renderVNodeChildren(
        push,
        children,
        parentComponent,
        slotScopeId
      );
      push(`<!--]-->`);
      break;
    default:
      if (shapeFlag & 1) {
        renderElementVNode(push, vnode, parentComponent, slotScopeId);
      } else if (shapeFlag & 6) {
        push(renderComponentVNode(vnode, parentComponent, slotScopeId));
      } else if (shapeFlag & 64) {
        renderTeleportVNode(push, vnode, parentComponent, slotScopeId);
      } else if (shapeFlag & 128) {
        renderVNode(push, vnode.ssContent, parentComponent, slotScopeId);
      } else {
        Vue.warn(
          "[@vue/server-renderer] Invalid VNode type:",
          type,
          `(${typeof type})`
        );
      }
  }
}
function renderVNodeChildren(push, children, parentComponent, slotScopeId) {
  for (let i = 0; i < children.length; i++) {
    renderVNode(push, normalizeVNode(children[i]), parentComponent, slotScopeId);
  }
}
function renderElementVNode(push, vnode, parentComponent, slotScopeId) {
  const tag = vnode.type;
  let { props, children, shapeFlag, scopeId } = vnode;
  let openTag = `<${tag}`;
  if (props) {
    openTag += ssrRenderAttrs(props, tag);
  }
  if (scopeId) {
    openTag += ` ${scopeId}`;
  }
  let curParent = parentComponent;
  let curVnode = vnode;
  while (curParent && curVnode === curParent.subTree) {
    curVnode = curParent.vnode;
    if (curVnode.scopeId) {
      openTag += ` ${curVnode.scopeId}`;
    }
    curParent = curParent.parent;
  }
  if (slotScopeId) {
    openTag += ` ${slotScopeId}`;
  }
  push(openTag + `>`);
  if (!shared.isVoidTag(tag)) {
    let hasChildrenOverride = false;
    if (props) {
      if (props.innerHTML) {
        hasChildrenOverride = true;
        push(props.innerHTML);
      } else if (props.textContent) {
        hasChildrenOverride = true;
        push(shared.escapeHtml(props.textContent));
      } else if (tag === "textarea" && props.value) {
        hasChildrenOverride = true;
        push(shared.escapeHtml(props.value));
      }
    }
    if (!hasChildrenOverride) {
      if (shapeFlag & 8) {
        push(shared.escapeHtml(children));
      } else if (shapeFlag & 16) {
        renderVNodeChildren(
          push,
          children,
          parentComponent,
          slotScopeId
        );
      }
    }
    push(`</${tag}>`);
  }
}
function applySSRDirectives(vnode, rawProps, dirs) {
  const toMerge = [];
  for (let i = 0; i < dirs.length; i++) {
    const binding = dirs[i];
    const {
      dir: { getSSRProps }
    } = binding;
    if (getSSRProps) {
      const props = getSSRProps(binding, vnode);
      if (props) toMerge.push(props);
    }
  }
  return Vue.mergeProps(rawProps || {}, ...toMerge);
}
function renderTeleportVNode(push, vnode, parentComponent, slotScopeId) {
  const target = vnode.props && vnode.props.to;
  const disabled = vnode.props && vnode.props.disabled;
  if (!target) {
    if (!disabled) {
      Vue.warn(`[@vue/server-renderer] Teleport is missing target prop.`);
    }
    return [];
  }
  if (!shared.isString(target)) {
    Vue.warn(
      `[@vue/server-renderer] Teleport target must be a query selector string.`
    );
    return [];
  }
  ssrRenderTeleport(
    push,
    (push2) => {
      renderVNodeChildren(
        push2,
        vnode.children,
        parentComponent,
        slotScopeId
      );
    },
    target,
    disabled || disabled === "",
    parentComponent
  );
}
const { isVNode: isVNode$1 } = Vue.ssrUtils;
function nestedUnrollBuffer(buffer2, parentRet, startIndex) {
  if (!buffer2.hasAsync) {
    return parentRet + unrollBufferSync$1(buffer2);
  }
  let ret = parentRet;
  for (let i = startIndex; i < buffer2.length; i += 1) {
    const item = buffer2[i];
    if (shared.isString(item)) {
      ret += item;
      continue;
    }
    if (shared.isPromise(item)) {
      return item.then((nestedItem) => {
        buffer2[i] = nestedItem;
        return nestedUnrollBuffer(buffer2, ret, i);
      });
    }
    const result = nestedUnrollBuffer(item, ret, 0);
    if (shared.isPromise(result)) {
      return result.then((nestedItem) => {
        buffer2[i] = nestedItem;
        return nestedUnrollBuffer(buffer2, "", i);
      });
    }
    ret = result;
  }
  return ret;
}
function unrollBuffer$1(buffer2) {
  return nestedUnrollBuffer(buffer2, "", 0);
}
function unrollBufferSync$1(buffer2) {
  let ret = "";
  for (let i = 0; i < buffer2.length; i++) {
    let item = buffer2[i];
    if (shared.isString(item)) {
      ret += item;
    } else {
      ret += unrollBufferSync$1(item);
    }
  }
  return ret;
}
async function renderToString(input, context = {}) {
  if (isVNode$1(input)) {
    return renderToString(Vue.createApp({ render: () => input }), context);
  }
  const vnode = Vue.createVNode(input._component, input._props);
  vnode.appContext = input._context;
  input.provide(Vue.ssrContextKey, context);
  const buffer2 = await renderComponentVNode(vnode);
  const result = await unrollBuffer$1(buffer2);
  await resolveTeleports(context);
  if (context.__watcherHandles) {
    for (const unwatch of context.__watcherHandles) {
      unwatch();
    }
  }
  return result;
}
async function resolveTeleports(context) {
  if (context.__teleportBuffers) {
    context.teleports = context.teleports || {};
    for (const key in context.__teleportBuffers) {
      context.teleports[key] = await unrollBuffer$1(
        await Promise.all([context.__teleportBuffers[key]])
      );
    }
  }
}
const { isVNode } = Vue.ssrUtils;
async function unrollBuffer(buffer2, stream) {
  if (buffer2.hasAsync) {
    for (let i = 0; i < buffer2.length; i++) {
      let item = buffer2[i];
      if (shared.isPromise(item)) {
        item = await item;
      }
      if (shared.isString(item)) {
        stream.push(item);
      } else {
        await unrollBuffer(item, stream);
      }
    }
  } else {
    unrollBufferSync(buffer2, stream);
  }
}
function unrollBufferSync(buffer2, stream) {
  for (let i = 0; i < buffer2.length; i++) {
    let item = buffer2[i];
    if (shared.isString(item)) {
      stream.push(item);
    } else {
      unrollBufferSync(item, stream);
    }
  }
}
function renderToSimpleStream(input, context, stream) {
  if (isVNode(input)) {
    return renderToSimpleStream(
      Vue.createApp({ render: () => input }),
      context,
      stream
    );
  }
  const vnode = Vue.createVNode(input._component, input._props);
  vnode.appContext = input._context;
  input.provide(Vue.ssrContextKey, context);
  Promise.resolve(renderComponentVNode(vnode)).then((buffer2) => unrollBuffer(buffer2, stream)).then(() => resolveTeleports(context)).then(() => {
    if (context.__watcherHandles) {
      for (const unwatch of context.__watcherHandles) {
        unwatch();
      }
    }
  }).then(() => stream.push(null)).catch((error) => {
    stream.destroy(error);
  });
  return stream;
}
function renderToStream(input, context = {}) {
  console.warn(
    `[@vue/server-renderer] renderToStream is deprecated - use renderToNodeStream instead.`
  );
  return renderToNodeStream(input, context);
}
function renderToNodeStream(input, context = {}) {
  const stream = new require$$3.Readable({ read() {
  } });
  if (!stream) {
    throw new Error(
      `ESM build of renderToStream() does not support renderToNodeStream(). Use pipeToNodeWritable() with an existing Node.js Writable stream instance instead.`
    );
  }
  return renderToSimpleStream(input, context, stream);
}
function pipeToNodeWritable(input, context = {}, writable) {
  renderToSimpleStream(input, context, {
    push(content) {
      if (content != null) {
        writable.write(content);
      } else {
        writable.end();
      }
    },
    destroy(err) {
      writable.destroy(err);
    }
  });
}
function renderToWebStream(input, context = {}) {
  if (typeof ReadableStream !== "function") {
    throw new Error(
      `ReadableStream constructor is not available in the global scope. If the target environment does support web streams, consider using pipeToWebWritable() with an existing WritableStream instance instead.`
    );
  }
  const encoder = new TextEncoder();
  let cancelled = false;
  return new ReadableStream({
    start(controller) {
      renderToSimpleStream(input, context, {
        push(content) {
          if (cancelled) return;
          if (content != null) {
            controller.enqueue(encoder.encode(content));
          } else {
            controller.close();
          }
        },
        destroy(err) {
          controller.error(err);
        }
      });
    },
    cancel() {
      cancelled = true;
    }
  });
}
function pipeToWebWritable(input, context = {}, writable) {
  const writer = writable.getWriter();
  const encoder = new TextEncoder();
  let hasReady = false;
  try {
    hasReady = shared.isPromise(writer.ready);
  } catch (e) {
  }
  renderToSimpleStream(input, context, {
    async push(content) {
      if (hasReady) {
        await writer.ready;
      }
      if (content != null) {
        return writer.write(encoder.encode(content));
      } else {
        return writer.close();
      }
    },
    destroy(err) {
      console.log(err);
      writer.close();
    }
  });
}
Vue.initDirectivesForSSR();
var ssrIncludeBooleanAttr = serverRenderer_cjs_prod.ssrIncludeBooleanAttr = shared.includeBooleanAttr;
serverRenderer_cjs_prod.pipeToNodeWritable = pipeToNodeWritable;
serverRenderer_cjs_prod.pipeToWebWritable = pipeToWebWritable;
serverRenderer_cjs_prod.renderToNodeStream = renderToNodeStream;
serverRenderer_cjs_prod.renderToSimpleStream = renderToSimpleStream;
serverRenderer_cjs_prod.renderToStream = renderToStream;
var renderToString_1 = serverRenderer_cjs_prod.renderToString = renderToString;
serverRenderer_cjs_prod.renderToWebStream = renderToWebStream;
serverRenderer_cjs_prod.ssrGetDirectiveProps = ssrGetDirectiveProps;
serverRenderer_cjs_prod.ssrGetDynamicModelProps = ssrGetDynamicModelProps;
var ssrInterpolate_1 = serverRenderer_cjs_prod.ssrInterpolate = ssrInterpolate;
var ssrLooseContain_1 = serverRenderer_cjs_prod.ssrLooseContain = ssrLooseContain;
var ssrLooseEqual_1 = serverRenderer_cjs_prod.ssrLooseEqual = ssrLooseEqual;
var ssrRenderAttr_1 = serverRenderer_cjs_prod.ssrRenderAttr = ssrRenderAttr;
var ssrRenderAttrs_1 = serverRenderer_cjs_prod.ssrRenderAttrs = ssrRenderAttrs;
var ssrRenderClass_1 = serverRenderer_cjs_prod.ssrRenderClass = ssrRenderClass;
var ssrRenderComponent_1 = serverRenderer_cjs_prod.ssrRenderComponent = ssrRenderComponent;
serverRenderer_cjs_prod.ssrRenderDynamicAttr = ssrRenderDynamicAttr;
serverRenderer_cjs_prod.ssrRenderDynamicModel = ssrRenderDynamicModel;
var ssrRenderList_1 = serverRenderer_cjs_prod.ssrRenderList = ssrRenderList;
var ssrRenderSlot_1 = serverRenderer_cjs_prod.ssrRenderSlot = ssrRenderSlot;
serverRenderer_cjs_prod.ssrRenderSlotInner = ssrRenderSlotInner;
var ssrRenderStyle_1 = serverRenderer_cjs_prod.ssrRenderStyle = ssrRenderStyle;
serverRenderer_cjs_prod.ssrRenderSuspense = ssrRenderSuspense;
serverRenderer_cjs_prod.ssrRenderTeleport = ssrRenderTeleport;
serverRenderer_cjs_prod.ssrRenderVNode = renderVNode;
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const servers$1 = {
  title: "IVPN Servers",
  country: "Country",
  any: "Any",
  city: "City",
  provider: "Provider",
  reset: "Reset",
  server: "SERVER",
  placeholder: "Server",
  table: {
    country: "COUNTRY",
    city: "CITY",
    provider: "PROVIDER",
    load: "LOAD"
  },
  details: {
    wireguard: "WireGuard Public Key",
    multihop: "MultiHop Port",
    obfs3single: "OBFS3 SingleHop Port",
    obfs3multi: "OBFS3 MultiHop Port",
    obfs4single: "OBFS4 SingleHop Port",
    obfs4multi: "OBFS4 MultiHop Port",
    obfs4key: "OBFS4 Public Key",
    socks5: "SOCKS5",
    socks5port: "SOCKS5 Port"
  }
};
const pricing$1 = {
  meta: {
    title: "IVPN Pricing - VPN subscription with anonymous registration"
  },
  title: "Select your plan",
  description: "Three tiers. No upselling. Pick based on your privacy needs.",
  allProtocols: "All protocols",
  tier1Devices: "5 devices",
  tier2Devices: "5 devices",
  antitracker: "AntiTracker",
  multihop: "Multi-hop",
  services: "Services",
  productFooter1: "Mailx, modDNS and Portmaster are services owned and operated by IVPN. Visit our",
  productFooter2: "page for a detailed overview of their features and capabilities.",
  productFooterPrice: "Pricing in USD.",
  productFooterReview: "Team licensing for VPN-only plans available",
  here: "here",
  featuresTitle: "All IVPN plans come with:",
  serviceBenefits: "Service benefits:",
  feature1: "Anonymous registration - no email required",
  feature2: "Open-source applications for Android, iOS, macOS, Windows and Linux",
  feature3: "Cash, Monero and Bitcoin payment options for better anonymity",
  feature4: "Money-back guarantee for 30 days",
  feature5: "Private DNS servers",
  feature6: "AntiTracker with blocklist selection option",
  feature7: "Killswitch/firewall and obfuscation methods where applicable",
  feature8: "SOCKS5 proxy service",
  feature9: "Router, NAS support",
  feature10: "MultiHop - route traffic through two IVPN servers",
  paymentMethodsTitle: "Supported payment methods:",
  paymentMethod1: "Credit Card",
  paymentMethod2: "PayPal",
  paymentMethod3: "Bitcoin",
  paymentMethod4: "Bitcoin Lightning",
  paymentMethod5: "Monero",
  paymentMethod6: "Cash",
  trustTitle: "Why trust IVPN?",
  trustList1: "No logs, regularly audited VPN service",
  trustList2: "No customer data stored",
  trustList3: "Clear privacy policy",
  trustList4: "Transparent ownership and team",
  trustList5: "Strong ethics: no trackers, no false promises, no surveillance ads",
  oneWeek: "1 Week",
  oneMonth: "1 Month",
  oneYear: "1 Year",
  twoYears: "2 Years",
  threeYears: "3 Years",
  select: "Select",
  dns: "modDNS",
  mailx: "Mailx",
  portmaster: "Portmaster Pro",
  chooseTimeAdded: "You can choose time added at the next step",
  generateAccount: "Generate Account",
  selectPlan: "Select Plan",
  upgrade: "Upgrade",
  portmasterTitle: "Portmaster",
  reviewServices: "REVIEW SERVICE FEATURES",
  paymentMethods: "Payment Methods",
  tier1: {
    name: "IVPN Standard",
    title: "Core VPN service",
    feature1: "IVPN / 5 Devices",
    feature1Title: "Includes Multi-hop, Obfuscation protocols, SOCKS5 proxy.",
    feature2: "Multi-hop",
    feature3: "AntiTracker",
    feature3Title: "Built-in ad and tracker blocker with preset blocklists.",
    footer: "If you need a straightforward, trustworthy VPN for your toolkit.",
    button: "Current plan"
  },
  tier2: {
    name: "IVPN Plus",
    title: "Added DNS & email privacy",
    feature1: "IVPN / 5 Devices",
    feature1Title: "Includes Multi-hop, AntiTracker, Obfuscation protocols, SOCKS5 proxy.",
    upgradeFeature1: "IVPN / 5 devices",
    feature2: "Multi-hop",
    feature3: "modDNS",
    feature3Title: "Standalone DNS service with blocklist combinations and configurable rules. Upgrades AntiTracker.",
    feature4: "Mailx",
    feature4Title: "Private email aliases that forward to your inbox without revealing your real address.",
    button: "Upgrade to Plus"
  },
  tier3: {
    name: "IVPN Pro Suite",
    title: "Complete network stack",
    feature1: "IVPN / 10 Devices",
    feature1Title: "Includes Multi-hop, AntiTracker, Obfuscation protocols, SOCKS5 proxy.",
    upgradeFeature1: "IVPN / 10 devices",
    feature2: "Multi-hop",
    feature3: "modDNS",
    feature3Title: "Standalone DNS service with blocklist combinations and configurable rules. Upgrades AntiTracker.",
    feature4: "Mailx",
    feature4Title: "Private email aliases that forward to your inbox without revealing your real address.",
    feature5: "Portmaster Pro (Linux, Windows)",
    feature5Title: "Firewall & network monitoring tool operated by IVPN. Includes SPN, an onion-routed Tor alternative. Available on Linux and Windows.",
    button: "Upgrade to Pro Suite"
  },
  sidebar: {
    feature1: "VPN",
    feature2: "Ads & Trackers",
    feature3: "Email",
    feature4: "Firewall"
  },
  stack: {
    title: "The privacy stack",
    feature1: "Four standalone privacy services operated by IVPN",
    feature2: "All services are open-source",
    feature3: "Additional services are activated separately after purchase",
    feature4: "Additional services authorise access without receiving your IVPN account ID",
    feature4LinkText: "Unlinked Access"
  },
  features: {
    title: "IVPN features",
    feature1: "Open-source clients (Android, iOS, macOS, Windows, Linux/CLI)",
    feature2: "Private DNS resolvers (no third-party logging)",
    feature3: "DNS-based AntiTracker with configurable blocklists",
    feature4: "Kill switch with network firewall integration",
    feature5: "Obfuscation protocols (v2Ray, obfsproxy)",
    feature6: "SOCKS5 proxy service",
    feature7: "Router and NAS deployment support"
  },
  featuresBadges: {
    badge1: "No email required for signup",
    badge2: "30-day refund window",
    badge3: "Cash, Monero, Bitcoin accepted",
    badge4: "Killswitch",
    badge5: "Obfuscation",
    badge6: "MultiHop",
    badge7: "SOCKS5 Proxy",
    badge8: "Router & NAS"
  },
  transparency: {
    title: "Audited & transparent",
    feature1: "No connection logs or session data retained",
    feature2: "No customer information stored post-purchase",
    feature3: "Annual third-party security audits (#7 completed May 2025)",
    feature4: "Public transparency reports and warrant canary",
    feature5: "Disclosed ownership and team with 15-year operating history",
    feature6: "No affiliate program, no tracking scripts, no surveillance advertising"
  },
  limitations: {
    title: "Limitations we acknowledge",
    feature1: "We operate servers in 58 locations / 41 countries.",
    feature2: "We don't offer port forwarding.",
    feature3: "No streaming compatibility guarantees."
  },
  footerBack: {
    item1: "If you've read this far, you know what we're about.",
    item2: "Choose the plan that matches your threat model."
  }
};
const login$1 = {
  meta: {
    title: "IVPN Login"
  },
  title: "Log In",
  accountId: "Account ID:",
  email: "Email:",
  password: "Password:",
  createNewAccount: "Create New Account",
  idPlaceholder: "i... or ivpn...",
  "2faToken": "Two-factor authentication token:",
  enterCaptcha: "Please enter the captcha you see above:",
  forgotPassword: "Forgot Your Password?",
  withAccountId: "With Account ID",
  withEmailAndPassword: "With Email & Password"
};
const account$1 = {
  metaTitle: {
    login: "IVPN Login",
    recover: "Recover Password",
    account: "IVPN Account",
    changeProduct: "IVPN Account - Change Product",
    emailService: "IVPN Account - Mailx",
    thankYou: "IVPN Account - Thank You",
    paymentReceived: "IVPN Account - Payment has been received",
    invoicePayment: "IVPN Account - Invoice for payment",
    payment: "IVPN Account - Payment",
    authentication: "Account settings - Authentication",
    billing: "Account settings - Billing",
    "delete": "Account settings - Delete account",
    addFundsCC: "IVPN Add Funds - Credit Card",
    addFundsPaypal: "IVPN Add Funds - PayPal",
    addFundsBitcoin: "IVPN Add Funds - Bitcoin",
    addFundsMonero: "IVPN Add Funds - Monero",
    addFundsVoucher: "IVPN Add Funds - Voucher",
    addFundsApplePay: "IVPN Add Funds - Apple Pay",
    addFundsGooglePay: "IVPN Add Funds - Google Pay",
    addFundsCash: "IVPN Add Funds - Cash",
    wireguard: "IVPN Account - WireGuard",
    wireguardConfig: "IVPN Account - WireGuard Configuration",
    deviceManagement: "IVPN Account - Device management",
    vouchers: "IVPN Account - Vouchers",
    services: "IVPN Account - Services"
  },
  greetings: "Your account has been created!",
  greetingsText: "Please make sure you save your Account ID in a safe place, you will use it to connect to the VPN. You don't need to enter your email to use our service.",
  accountId: "Account ID",
  inactive: "INACTIVE",
  active: "ACTIVE",
  continueToPayment1: "Continue to payment",
  continueToPayment2: "To start using IVPN add funds to your account.",
  product: "Product",
  change: "Change",
  upgrade: "Upgrade",
  paidUntil: "Paid Until",
  wasActiveUntil: "Was Active Until",
  addMoreTime: "Add More Time",
  billingSettings: "Billing Settings",
  copied: "Copied",
  qrScan: "Scan from our mobile apps for quick VPN setup.",
  contactSupport: "Contact Support",
  safeReferenceTitle: "Account safe reference:",
  safeReferenceDescription: "Safe reference can be used when communicating with support engineers by email.",
  deleteAccount: "Delete Account",
  changePlan: "Change plan",
  selectedPlan: "Selected Plan",
  included: "Included",
  devices: "devices",
  comparePlans: "Compare Plans",
  configureWireguard: "For configuring WireGuard connection manually, visit our",
  configureWireguardLink: "WireGuard setup page",
  ivpnSetup: "IVPN Setup",
  additionalServices: "Additional Services",
  additionalServicesFooterSee: "See",
  additionalServicesFooterFor: " for what each service does.",
  additionalServicesFooterForDetails: " for details.",
  additionalServicesFooter: "To learn more about each service and their benefits, visit the",
  additionalServicesFooterLink: "Service Overview",
  additionalServicesFooter2: "Your IVPN account ID is not passed to or stored by Mailx, modDNS, or Safing Portmaster. Review the",
  additionalServicesFooter2Link: "Unlinked Access explainer",
  getHelp: "Get Help",
  creditCard: "Credit Card",
  paypal: "PayPal",
  bitcoin: "Bitcoin",
  lightning: "BTC Lightning",
  monero: "Monero",
  cash: "Cash",
  haveVoucher: "Have a voucher code?",
  redeem: "Redeem it here",
  ivpnAccount: "IVPN Account",
  services: "Services",
  wireguard: "Wireguard",
  deviceManagement: "Devices",
  accountSettings: "Settings",
  changeProductTitle: "Change Product",
  changeProductDesc: "You can change your product plan any time. If your account is active, changing the product type will change the amount of time left on your account.",
  upgradeProductTitle: "Upgrade Product",
  upgradeProductDesc: "Pick a plan to start the upgrade process. You will pay the difference displayed, calculated based on the remaining time on your account. On successful payment, your get instant access to the selected plan and its benefits. Expiry date will stay the same.",
  activeUntil: "Active until",
  willBeActiveUntil: "Will be active until:",
  currentPlan: "Current plan",
  newPlan: "New plan",
  differencePaidToday: "Difference, paid today",
  upgradePaidToday: "Upgrade price (paid today)",
  currentPlanBadge: "Current Plan",
  choosePaymentMethod: "Choose a payment method to proceed:",
  price: "Price",
  thisDate: "This date is calculated based on the current time left on your account, and the price difference between product types. Long-term discounts are not applicable. No additional payment is required.",
  thisPrice: "This price is calculated based on the current time left on your account, and the price difference between product types. Long-term discounts are not applicable. An additional payment is required.",
  changeProductSuccess: "Product has been successfully changed to ",
  changeBillingCycle: "Change Billing Cycle",
  newBillingCycle: "New billing cycle will be applied at the end of the current billing period",
  update: "Update",
  cancel: "Cancel",
  confirm: "Confirm",
  confirmChangeProduct: "IVPN Standard allows VPN access on 2 devices. Initiating a plan change will log you out from all active devices. You can log in to new devices afterwards. Please confirm to proceed.",
  disableRecurring: "Disable recurring payments",
  disableRecurringDesc: "Disabling recurring payments will remove stored payment information from our system and disable automatic renewal of the service.",
  disableRecurringPayments: "Disable recurring payments",
  vouchers: "Vouchers",
  popups: {
    authentication: {
      title: "Authenticate using Account ID",
      desc: "Disabling email & password authentication will remove your email address and password hash from our systems.",
      important: "Important:",
      makeSure: "please make sure you've written down your Account ID, since you will use it to log into client area:",
      changeAuthentication: "Change authentication"
    },
    authenticationEmail: {
      title: "Set up email & password authentication",
      changeYourEmail: "Change your email address",
      changePassword: "Change password",
      pleaseEnter: "Please enter your email and password you'll use to log into client area.",
      email: "Email:",
      password: "Password:",
      confirmPassword: "Confirm password:",
      setup: "Set up",
      update: "Update",
      cancel: "Cancel"
    },
    paymentMethod: {
      title: "Set payment method",
      paypalAccount: "PayPal Account:",
      pleaseLog: "Please log into your paypal account using the button below.",
      setPaymentMethod: "Set Payment Method",
      cancel: "Cancel"
    },
    totp: {
      disable: {
        title: "Disable 2-Factor Authentication",
        desc: "To disable two-factor authentication, please enter code from TOTP app or a backup code.",
        disable: "Disable",
        cancel: "Cancel"
      },
      enable: {
        title: "Enable 2-Factor Authentication",
        instructions: "To enable two-factor authentication, please scan the code with a TOTP app (for example: Google Authenticator) and enter the code in the field below.",
        scan: "If you cannot scan QR code, you can enter the following information manually.",
        secret: "Secret:",
        account: "Account:",
        success: "Two-factor authentication was set up successfully.",
        successDesc: "Please record the following backup codes which you will be able to use instead of TOTP in case you lost access to your device.",
        backupCodes: "Backup codes:",
        eachCode: "Each of these codes can be used only once.",
        close: "Close",
        enable: "Enable",
        cancel: "Cancel",
        codeFrom: "Code from TOTP app"
      }
    },
    changeProduct: {
      cancel: "Cancel",
      downgrade: "Downgrade",
      tier1: {
        title: "Switch to IVPN Standard",
        desc1: "Warning:",
        desc2: "Standard plan includes 5 devices for IVPN.",
        desc3: "You will lose access to all additional services in your current plan.",
        desc4: "We suggest exporting Mailx and modDNS data before taking this step.",
        desc5: "Confirm you still wish to downgrade:"
      },
      tier2: {
        title: "Switch to IVPN Plus",
        desc1: "Warning:",
        desc2: "Plus plan includes 5 devices for IVPN.",
        desc3: "Postmaster Pro will be changed to Portmaster Free.",
        desc4: "",
        desc5: "Confirm you still wish to downgrade:"
      }
    }
  },
  wireguardTab: {
    title: "WireGuard",
    description1: "If you are using the IVPN Apps for Windows, macOS, Linux, Android or iOS, WireGuard keys are managed automatically, simply select the WireGuard protocol in the app settings.",
    description2: "If you are using the native WireGuard client then you need to manually create your keys and the necessary configuration files. We provide a configuration file generator that will generate WireGuard keys, allow you to specify the servers you require and other parameters. You simply import the configuration file and are ready to connect.",
    configurationFileGenerator: "Configuration file generator",
    manuallyConfigure: "If you wish to manually configure WireGuard and just need to submit a new public key then use the form below.",
    addNewPublicKey: "Add new public key",
    noWireguardKeys: "There are no WireGuard keys added manually for this account.",
    usefulLinks: "Useful links",
    serverList: "WireGuard server list",
    faq: "WireGuard FAQ",
    expiredTitle: "Your account is expired",
    renewAccount: "Please renew your account to manage WireGuard keys.",
    toYourAccount: "To your account",
    addWireguardKey: "Add WireGuard Key",
    publicKeyRequired: "Public key is required!",
    publicKey: "Public Key:",
    comment: "Comment (optional):",
    add: "Add",
    cancel: "Cancel",
    backToWireguard: "Back to WireGuard",
    configuration: "WireGuard Configuration",
    configStep1Title: "1: Generate WireGuard key",
    configStep1Content: "A private and public key pair will be generated within the browser. The private key will be included in the config file that you download. Only the public key is sent to our server. You can review the code on",
    generateKey: "Generate key",
    addKey: "Add key",
    keyComment: "Key comment (optional):",
    keyCommentRequired: "Key comment",
    privateKey: "Private key",
    configStep2Title: "2. Select one or multiple exit servers",
    configStep2Content: "A separate configuration file will be generated for each location that you include.",
    selectExitServerLocation: "Select exit server location",
    allCountries: "All countries",
    allCities: "All cities",
    allServers: "All servers",
    selectEntryServerLocation: "Select entry server location",
    selectCountry: "Select country",
    selectCity: "Select city",
    selectServer: "Select server",
    configStep3Title: "3. Configuration",
    configStep3Content: "You may need to configure a custom port if you are behind a restrictive firewall.",
    port: "Port",
    vpnTunnelTraffic: "VPN tunnel traffic",
    vpnTunnelTrafficDesc: "By default, you will receive both an IPv4 and IPv6 address. You can specify if you wish to receive only IPv4 or IPv6 address.",
    and: "and",
    dnsSettings: "DNS settings",
    dnsSettingsNote1: "When AntiTracker is enabled, IVPN blocks ads, malicious websites, and third-party trackers using our private DNS servers.",
    learnMore: "Learn more",
    aboutHow: "about how IVPN AntiTracker is implemented.",
    dnsSettingsNote2: "Hardcore mode blocks the leading companies with business models relying on user surveillance (currently: Google and Facebook).",
    standard: "Standard",
    antitracker: "AntiTracker",
    hardcore: "Hardcore Mode",
    customDns: "Custom DNS",
    pleaseEnter: "Please enter a valid IPv4 or IPv6 address.",
    downloadZipArchive: "Download zip archive",
    generateQrCode: "Generate QR code",
    configStep4Title: "4. Download",
    "delete": "Delete",
    ipv4Address: "IPv4 address",
    ipv6Address: "IPv6 address",
    deleteKeyConfirm: "Are you sure you want to delete this key?",
    yes: "Yes"
  },
  deviceManagementTab: {
    disabled: "Device management is disabled.",
    disabledDesc1: "When enabled, you can review devices logged into the service and remotely log them out as needed.",
    disabledDesc2: "We recommend securely storing device identifiers with encryption to identify and disconnect devices when you don't have access to them.",
    disabledDesc3: "Learn more about this feature and its potential privacy implications",
    disabledDesc4: "Device management is applicable to the VPN service only, additional services are not affected.",
    here: "here",
    enableDeviceManagement: "Enable device management",
    activeDevices: "Active IVPN devices",
    devicesAdded: "IVPN devices added",
    logoutFromAllDevices: "Logout from all devices",
    enabled: "Device management is enabled.",
    enabledDesc1: "You are currently not logged in to the service on any device.",
    enabledDesc2: "to the IVPN app to add a device. Once added, your device identifiers will appear on this page.",
    please: "Please",
    login: "log in",
    increaseDeviceLimit: "To increase your device limit to",
    changeYourProduct: "change your Product",
    changeTo: "to IVPN Pro.",
    disableDeviceManagement: "Disable device management",
    disablePopupDesc1: "Please note - after disabling Device management:",
    disablePopupDesc2: "You won’t be logged out from your devices.",
    disablePopupDesc3: "You won’t be able to manage your devices on your dashboard.",
    proceed: "Proceed",
    cancel: "Cancel",
    confirmLogoutAll: "Please confirm you want to log out from all devices.",
    confirm: "Confirm",
    confirmDelete: "Are you sure you want to delete this device?",
    yes: "Yes",
    renewAccount: "Please renew your account to manage your devices.",
    upgradeText1: "To increase your device limit to 10,",
    upgradeText2: "upgrade",
    upgradeText3: "your plan to IVPN Pro Suite."
  },
  accountSettingsTab: {
    backToAccount: "Back to account",
    title: "Account Settings",
    authentication: "Authentication",
    billing: "Billing",
    deleteAccount: "Delete account",
    logInto: "Log into client area using",
    accountId: "Account ID",
    emailPassword: "Email & Password",
    email: "Email:",
    password: "Password:",
    "2fa": "2-factor authentication",
    "2faDesc": "When enabled, 2-factor authentication will be required in the client area and IVPN apps.",
    recurringPayments: "Recurring payments",
    billingCycle: "Billing cycle",
    paymentMethod: "Payment method",
    paidUntil: "Paid until",
    wasActiveUntil: "Was active until",
    lastPayment: "Last payment",
    recurringFailedOn: "Automatic recurring payment failed on ",
    pleaseCheck: "Please check or update your payment method and try again.",
    processingPayment: "Processing payment",
    extendYourAccount: "Extend your account",
    upgradeYourAccount: "Upgrade your account",
    deleteAccountConfirm: "Are you sure you want to delete your account?",
    accountActive: "Your account is currently active.",
    deleteAccountConfirmDesc: "To confirm permanent deletion of your account, please enter the following symbols in the field below:",
    cancel: "Cancel",
    warning: "Warning:",
    warningDesc: "this operation cannot be undone. Deleting your account will permanently remove data from our systems.",
    retry: "Retry",
    services: "Services",
    syncMail: "Synchronize"
  },
  payments: {
    paymentReceived: {
      title: "Your payment has been received",
      accountExtended: "Your account has been extended to",
      review: ". You can review your payment details and details about your selected plan on the account page.",
      downloadInvoice: "Download invoice",
      goToAccount: "Go to your account",
      join: "Join our community for news, product updates, and discussion:",
      nextSteps: "Take the next step in improving your privacy:",
      privacyGuides: "IVPN Privacy Guides",
      blog: "IVPN Blog",
      thankYou: "Thank you for your order",
      yourAccount: "Your account will be credited once your Bitcoin payment is confirmed.",
      questions: "If you have any questions please",
      contactUs: "contact us."
    },
    invoice: {
      loading: "Loading invoice...",
      invoice: "Invoice",
      invoiceDate: "Invoice Date:",
      paid: "Paid:",
      invoicedTo: "Invoiced To:",
      accountReference: "Account reference ID:",
      payTo: "Pay To:",
      description: "Description:",
      amount: "Amount:",
      subtotal: "Subtotal:",
      total: "Total:"
    },
    selectPaymentMethod: "Select payment method",
    byMaking: "By making a payment you are agreeing to our",
    termsOfService: "Terms of Service",
    bitcoin: {
      bitcoinDescription: "We run our own Bitcoin and Lightning Network nodes using a self-hosted BTCPay server instance. Payments are processed by IVPN and no 3rd parties are involved.",
      bitcoinOnchain: "On-chain Bitcoin payments are not available for IVPN 1 Week top-ups. We suggest using BTC Lightning or switching to a different payment method.",
      payWithBitcoin: "Pay with Bitcoin",
      payWithLightning: "Pay with Lightning",
      unavailable: "Temporarily Unavailable"
    },
    paypal: {
      processingYourPayment: "Processing your payment...",
      solveCaptcha: "Please solve the following captcha to continue.",
      enterNumbers: "Please enter the numbers you see above:",
      "continue": "Continue",
      cancel: "Cancel",
      toProceed: "To proceed with payment please log into your paypal account using the button below.",
      automaticallyRenew: "Automatically renew at the end of period",
      enablingThisCheckbox: "Enabling this checkbox will make your payment method saved and automatically billed at the end of period. You will be able to cancel automatic renewal any time."
    },
    creditCard: {
      cardIssue: "There was an issue with your card. Please try again.",
      automaticRenewal: "Automatic renewal",
      ccAutomaticRenewalInfo: "Automatic renewals are always off by default. You may enable this if it is more convenient for you. Your card data will be stored by Braintree however you can cancel automatic renewal at any time from your account page.",
      makePayment: "Make payment",
      cardNumber: "Card number",
      errorAbove: "The above error message comes directly from Braintree, our credit card payment processor. You may update your card details and/or add additional information and try again.",
      additionalCardInformation: "Additional card information",
      byDesign: "By design we always request the minimum information however some card issuers require more than just the card number. e.g. Name, Email. You may optionally submit this information to increase the chances that your payment is successful. This data is sent directly from your browser to our payment processor (braintreepayments.com) and is never seen by IVPN.",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      streetAddress: "Street address",
      postalCode: "Postal code",
      dateFormat: "MM / YYYY"
    },
    cash: {
      pleaseSend: "Please send an envelope containing",
      or: "or",
      andReferenceNumber: "and reference number",
      toTheFollowingAddress: "to the address below. We recommend clicking on the button below to print the address label and reference number.",
      printAddress: "Print address & reference number",
      pleaseNote: "Please note",
      ifYouDontInclude: "if you do not include your unique reference number above we will not be able to attribute your payment to your account.",
      weRecommend: "We recommend wrapping cash bills in two sheets of paper for extra security.",
      cashPaymentsNormally: "Cash payments normally take 2-4 weeks to be received depending on the location the envelope was sent from and the postal service. When the envelope reaches the address in Berlin it is forwarded to a different location where our billing team collects the payment and credits it to your account. Therefore, if you are tracking the package it will take a further 1-2 weeks after the item is received before your account is credited.",
      pleaseNoteCash: "Please note that cash payments are sent at your own risk.",
      weAccept: "We accept Cash payments starting from 1 year. Please return back and select at least 1 year period."
    },
    monero: {
      pleaseUse: "Please use the following payment details to transfer Monero:",
      address: "Address:",
      amount: "Amount:",
      paymentReceived: "Payment received:",
      extendedUntil: "extended until",
      waitingForPayment: "Waiting for payment...",
      information: "Information about the last recent payment will be displayed here.",
      pleaseNote: "Please note:",
      note1: "Your account will automatically be extended after the payment is confirmed. This may take a couple of minutes.",
      note2: "The address specified above is permanent for your account. You can use it to top up your account at any time in the future.",
      note1Upgrade: "Your account will be upgraded after the payment is confirmed. This may take a couple of minutes.",
      note2Upgrade: "Warning: The address above is for one-time use only and is active for 24 hours after generation. Don't send additional funds to it after this payment."
    },
    voucher: {
      codeFrom: "Code from a Voucher issued by IVPN:",
      addTime: "Add Time",
      pleaseNote: "Please note: Voucher codes are stored in our system for 30 days after use to help resolve activation issues. Account recovery is not possible after this period.",
      successPayment: "Voucher applied successfully. Service is extended until "
    }
  },
  vouchersTab: {
    notEligible: "IVPN Free Vouchers",
    notEligibleDesc: "When eligible, you can share five 30-day IVPN test voucher codes with others new to IVPN.",
    notEligibleDesc2: "IVPN vouchers are available to existing accounts that have at least 60 days of paid time remaining.",
    notEligibleDesc3: "Extend your account to meet the criteria:",
    addMoreTime: "Add More Time",
    eligible: "IVPN Free Vouchers",
    eligibleDesc: "Below you can find five free voucher codes.",
    eligibleDesc2: "Share them with others to redeem for 30 days of time on their new IVPN accounts.",
    eligibleDesc3: "Recipients can redeem the voucher codes by:",
    recipients1: "Creating a new IVPN Standard or Pro account",
    recipients2: "Selecting 'Add More Time'",
    recipients3: "Following the voucher code redemption link",
    usefulNotes: "Notes about free voucher codes:",
    notes1: "Vouchers are available and can be redeemed as long as you have at least 60 days of paid time remaining on your IVPN account",
    notes2: "Vouchers can be only applied once to new IVPN Standard or Pro accounts without previous voucher or payment history",
    notes3: "Free voucher offer runs until 30 September 2024",
    notes4: "For privacy reasons, we don't display redemption status of the codes above",
    voucherCodes: "Voucher codes",
    markAsShared: "Mark as shared",
    markAsNotShared: "Mark as not shared"
  },
  servicesArea: {
    mail: "Mailx",
    dns: "modDNS",
    portmaster: "Portmaster Pro",
    accessMail: "Access",
    accessDns: "Access",
    accessPortmaster: "Access",
    setupMail: "Set up",
    setupDns: "Set up",
    setupPortmaster: "Set up",
    active: "ACTIVE",
    available: "AVAILABLE",
    unavailable: "UNAVAILABLE",
    expired: "EXPIRED",
    upgrade: "Upgrade",
    upgradeTo: "Upgrade to access",
    mailDescription: "Email forwarding / Available for all platforms",
    dnsDescription: "DNS filtering / Available for all platforms",
    portmasterDescription: "Network firewall / Windows and Linux",
    limitedAccess: "Note: Your IVPN account has expired. Additional services have limited functionality and are not available for registration. To regain full access to additional services, please add time to your IVPN account as soon as possible.",
    pendingDeletion: "Note: Your IVPN account has expired. Additional services are not available. To avoid loss of settings and data on existing services, please top up your IVPN account."
  }
};
const resetPassword$1 = {
  backToLogin: "Back to log in",
  resetPassword: "Reset Password",
  resetPasswordDesc: "If an account with the specified email address exists we will send an email with further instructions on how to reset your password.",
  enterEmail: "Please enter your registered email address. You will be sent instructions on how to reset your password.",
  sendResetInstructions: "Send reset instructions",
  setNewPassword: "Set New Password",
  setNewPasswordDesc: "Your password has been changed successfully.",
  newPassword: "New Password:",
  confirm: "Confirm:",
  changePassword: "Change Password"
};
const openVpnConfig$1 = {
  step1Title: "1. Select one or multiple exit servers",
  step1Desc: "A separate configuration file will be generated for each location that you include.",
  singleHop: "Single-Hop",
  multiHop: "Multi-Hop",
  selectExitServerLocation: "Select exit server location",
  allCountries: "All countries",
  allCities: "All cities",
  allServers: "All servers",
  selectEntryServerLocation: "Select entry server location",
  selectCountry: "Select country",
  selectCity: "Select city",
  selectServer: "Select server",
  step2Title: "2. Configuration",
  protocol: "Protocol",
  protocolPort: "Protocol / Port",
  step2Desc: "You may need to configure a custom port if you are behind a restrictive firewall.",
  hostnamesOrIp: "Hostnames or IP addresses",
  useHostnames: "Use hostnames",
  useIpAddresses: "Use IP addresses",
  openVpnVersion: "OpenVPN version",
  allVersions: "OpenVPN all versions",
  dnsSettings: "DNS settings",
  dnsSettingsNote1: "When AntiTracker is enabled, IVPN blocks ads, malicious websites, and third-party trackers using our private DNS servers. ",
  learnMore: "Learn more",
  aboutHow: "about how IVPN AntiTracker is implemented.",
  dnsSettingsNote2: "Hardcore mode blocks the leading companies with business models relying on user surveillance (currently: Google and Facebook).",
  hardcoreMode: "Hardcore mode",
  customDns: "Custom DNS",
  enterValidIp: "Please enter a valid IPv4 address.",
  step3Title: "3. Download",
  downloadZip: "Download zip archive"
};
const compare$1 = {
  title: "Compare",
  description: "Compare different IVPN plans and features."
};
const en = {
  servers: servers$1,
  pricing: pricing$1,
  login: login$1,
  account: account$1,
  resetPassword: resetPassword$1,
  openVpnConfig: openVpnConfig$1,
  compare: compare$1
};
const servers = {
  title: "Servidores IVPN",
  country: "País",
  any: "Cualquiera",
  city: "Ciudad",
  provider: "Proveedor",
  reset: "Reiniciar",
  server: "SERVIDOR",
  placeholder: "Servidor",
  table: {
    country: "PAÍS",
    city: "CIUDAD",
    provider: "PROVEEDOR",
    load: "CARGA"
  },
  details: {
    wireguard: "Clave pública WireGuard ",
    multihop: "Puerto MultiHop",
    obfs3single: "Puerto OBFS3 SingleHop",
    obfs3multi: "Puerto OBFS3 MultiHop",
    obfs4single: "Puerto OBFS4 SingleHop",
    obfs4multi: "Puerto OBFS4 MultiHop",
    obfs4key: "Clave pública OBFS4",
    socks5: "SOCKS5",
    socks5port: "Puerto SOCKS5"
  }
};
const pricing = {
  meta: {
    title: "Precios de IVPN - suscripción VPN con inscripción anónima"
  },
  title: "Selecciona tu plan",
  description: "Tres niveles. Sin ventas adicionales. Elige según tus necesidades de privacidad.",
  allProtocols: "Todos los protocolos",
  tier1Devices: "5 dispositivos",
  tier2Devices: "5 dispositivos",
  antitracker: "AntiTracker",
  multihop: "Multi-hop",
  services: "Servicios",
  productFooter1: "Mailx, modDNS y Portmaster son servicios propiedad y operados por IVPN. Visita nuestra página",
  productFooter2: "para una descripción detallada de sus características y capacidades.",
  productFooterPrice: "Todos los precios están en dólares estadounidenses.",
  productFooterReview: "Consulta los precios solo VPN para empresas",
  here: "aquí",
  featuresTitle: "Todos los planes IVPN vienen con:",
  serviceBenefits: "Beneficios del servicio:",
  feature1: "Inscripción anónima - no se requiere correo electrónico",
  feature2: "Aplicaciones de código abierto para Android, iOS, macOS, Windows y Linux",
  feature3: "Opciones de pago en efectivo, Monero y Bitcoin para un mejor anonimato",
  feature4: "Garantía de reembolso de 30 días",
  feature5: "Servidores DNS privados",
  feature6: "AntiTracker con opción de selección de lista de bloqueo",
  feature7: "Killswitch/firewall y métodos de ofuscación cuando corresponda",
  feature8: "Servicio de proxy SOCKS5",
  feature9: "Soporte para router y NAS",
  feature10: "MultiHop - enruta el tráfico a través de dos servidores IVPN",
  paymentMethodsTitle: "Métodos de pago admitidos:",
  paymentMethod1: "Tarjeta de crédito",
  paymentMethod2: "PayPal",
  paymentMethod3: "Bitcoin",
  paymentMethod4: "Bitcoin Lightning",
  paymentMethod5: "Monero",
  paymentMethod6: "En efectivo",
  trustTitle: "¿Por qué confiar en IVPN?",
  trustList1: "Sin registros, servicio VPN auditado periódicamente",
  trustList2: "No se almacenan datos de clientes",
  trustList3: "Política de privacidad clara",
  trustList4: "Propiedad y equipo transparentes",
  trustList5: "Ética sólida: sin rastreadores, sin falsas promesas, sin anuncios de vigilancia",
  oneWeek: "1 Semana",
  oneMonth: "1 Mes",
  oneYear: "1 Año",
  twoYears: "2 Años",
  threeYears: "3 Años",
  select: "Seleccionar",
  dns: "modDNS",
  mailx: "Mailx",
  portmaster: "Portmaster Pro",
  chooseTimeAdded: "Puedes elegir el tiempo añadido en el siguiente paso",
  generateAccount: "Crear cuenta",
  selectPlan: "Elige un plan",
  upgrade: "Actualizar",
  portmasterTitle: "Portmaster",
  reviewServices: "REVISAR CARACTERÍSTICAS DEL SERVICIO",
  paymentMethods: "Métodos de pago",
  tier1: {
    name: "IVPN Standard",
    title: "Servicio VPN básico",
    feature1: "IVPN / 5 dispositivos",
    feature1Title: "Incluye Multi-hop, protocolos de ofuscación, proxy SOCKS5.",
    feature2: "Multihop",
    feature3: "AntiTracker",
    feature3Title: "Bloqueador de anuncios y rastreadores integrado con listas de bloqueo predefinidas.",
    footer: "Un VPN sencillo y confiable para tu kit de herramientas.",
    button: "Plan actual"
  },
  tier2: {
    name: "IVPN Plus",
    feature1: "IVPN / 5 dispositivos",
    feature1Title: "Incluye Multi-hop, AntiTracker, protocolos de ofuscación, proxy SOCKS5.",
    upgradeFeature1: "IVPN / 5 dispositivos",
    feature2: "Multi-hop",
    feature3: "modDNS",
    feature3Title: "Servicio DNS independiente con combinaciones de listas de bloqueo y reglas configurables. Mejora AntiTracker.",
    feature4: "Mailx",
    feature4Title: "Alias de correo electrónico privados que reenvían a tu bandeja de entrada sin revelar tu dirección real.",
    footer: "Protección de rastreo y privacidad del correo electrónico mejorada.",
    button: "Mejora a Plus"
  },
  tier3: {
    name: "IVPN Pro Suite",
    title: "Control total de red",
    feature1: "IVPN / 10 Dispositivos",
    feature1Title: "Incluye Multi-hop, AntiTracker, protocolos de ofuscación, proxy SOCKS5.",
    upgradeFeature1: "IVPN / 10 dispositivos",
    feature2: "Multi-hop",
    feature3: "modDNS",
    feature3Title: "Servicio DNS independiente con combinaciones de listas de bloqueo y reglas configurables. Mejora AntiTracker.",
    feature4: "Mailx",
    feature4Title: "Alias de correo electrónico privados que reenvían a tu bandeja de entrada sin revelar tu dirección real.",
    feature5: "Portmaster Pro (Linux, Windows)",
    feature5Title: "Herramienta de cortafuego y monitorización de red operada por IVPN. Incluye SPN, una alternativa de Tor enrutada por cebolla. Disponible en Linux y Windows.",
    footer: "Controles de red completos con cortafuego de aplicación incluido.",
    button: "Mejora a Pro Suite"
  },
  sidebar: {
    feature1: "VPN",
    feature2: "Anuncios y rastreadores",
    feature3: "Correo",
    feature4: "Cortafuegos"
  },
  stack: {
    title: "La estructura de privacidad",
    feature1: "Cuatro servicios de privacidad independientes operados por IVPN",
    feature2: "Todos los servicios son de código abierto",
    feature3: "Los servicios adicionales se activan por separado después de la compra",
    feature4: "Los servicios adicionales autorizan el acceso sin recibir tu ID de cuenta IVPN",
    feature4LinkText: "Acceso no vinculado"
  },
  features: {
    title: "Características de IVPN",
    feature1: "Clientes de código abierto (Android, iOS, macOS, Windows, Linux/CLI)",
    feature2: "Resolutores DNS privados (sin registro de terceros)",
    feature3: "AntiTracker basado en DNS con listas de bloqueo configurables",
    feature4: "Interruptor de corte con integración de cortafuegos de red",
    feature5: "Protocolos de ofuscación (v2Ray, obfsproxy)",
    feature6: "Servicio proxy SOCKS5",
    feature7: "Soporte para despliegue en routers y NAS"
  },
  featuresBadges: {
    badge1: "No se requiere correo electrónico",
    badge2: "Reembolso de 30 días",
    badge3: "Se aceptan efectivo, Monero, Bitcoin",
    badge4: "Interruptor de corte",
    badge5: "Ofuscación",
    badge6: "MultiHop",
    badge7: "SOCKS5 Proxy",
    badge8: "Router & NAS"
  },
  transparency: {
    title: "Auditado y transparente",
    feature1: "Sin registros de conexión ni datos de sesión retenidos",
    feature2: "Sin información del cliente almacenada después de la compra",
    feature3: "Auditorías de seguridad anuales realizadas por terceros (#7 completadas en mayo de 2025)",
    feature4: "Informes públicos de transparencia y canario de orden judicial",
    feature5: "Propiedad y equipo transparentes, con 15 años de experiencia operativa.",
    feature6: "Sin programa de afiliados, sin scripts de seguimiento, sin publicidad de vigilancia"
  },
  limitations: {
    title: "Limitaciones que reconocemos",
    feature1: "Operamos servidores en 58 ubicaciones / 41 países.",
    feature2: "No ofrecemos reenvío de puertos.",
    feature3: "No garantizamos compatibilidad con streaming."
  },
  footerBack: {
    item1: "Si has leído hasta aquí, sabes de qué se trata.",
    item2: "Elige el plan que se adapte a tu modelo de amenaza."
  }
};
const login = {
  meta: {
    title: "IVPN Iniciar sesión"
  },
  title: "Iniciar sesión",
  accountId: "ID de cuenta:",
  email: "Correo electrónico:",
  password: "Contraseña:",
  createNewAccount: "Crear una nueva cuenta",
  idPlaceholder: "i... o ivpn...",
  "2faToken": "Token de autenticación de dos factores:",
  enterCaptcha: "Por favor, escribe el captcha que ves encima:",
  forgotPassword: "¿Olvidaste tu contraseña?",
  withAccountId: "Con ID de cuenta",
  withEmailAndPassword: "Con email y contraseña"
};
const account = {
  metaTitle: {
    login: "IVPN Iniciar sesión",
    recover: "Recuperar contraseña",
    account: "Cuenta IVPN",
    changeProduct: "Cuenta IVPN - Cambiar producto",
    emailService: "Cuenta IVPN - Mailx",
    thankYou: "Cuenta IVPN - Gracias",
    paymentReceived: "Cuenta IVPN - Pago recibido",
    invoicePayment: "Cuenta IVPN - factura para el pago",
    payment: "Cuenta IVPN - Pago",
    authentication: "Configuración de la cuenta - Autenticación",
    billing: "Configuración de la cuenta - Facturación",
    "delete": "Configuración de la cuenta - Borrar cuenta",
    addFundsCC: "IVPN Añadir fondos - Tarjeta de crédito",
    addFundsPaypal: "IVPN Añadir fondos - PayPal",
    addFundsBitcoin: "IVPN Añadir fondos - Bitcoin",
    addFundsMonero: "IVPN Añadir fondos - Monero",
    addFundsVoucher: "IVPN Añadir fondos - Cupón",
    addFundsApplePay: "IVPN Añadir fondos - Apple Pay",
    addFundsGooglePay: "IVPN Añadir fondos - Google Pay",
    addFundsCash: "IVPN Añadir fondos - Cash",
    wireguard: "Cuenta IVPN - WireGuard",
    wireguardConfig: "Cuenta IVPN - Configuración de WireGuard",
    deviceManagement: "Cuenta IVPN - Gestión de dispositivos",
    vouchers: "Cuenta IVPN - Cupones",
    services: "Cuenta IVPN - Servicios"
  },
  greetings: "¡Tu cuenta ha sido creada!",
  greetingsText: "Por favor, asegúrate de guardar tu ID de cuenta en un lugar seguro, la usarás para conectarte a la VPN. No necesitas tu correo electrónico para usar nuestro servicio.",
  accountId: "ID de cuenta",
  inactive: "INACTIVO",
  active: "ACTIVO",
  continueToPayment1: "Continuar con el pago",
  continueToPayment2: "Para empezar a usar IVPN, añade saldo a tu cuenta.",
  product: "Producto",
  change: "Cambiar",
  upgrade: "Mejorar",
  paidUntil: "Pagado hasta",
  wasActiveUntil: "Estuvo activo hasta",
  addMoreTime: "Añadir más tiempo",
  billingSettings: "Facturación",
  copied: "Copiado",
  qrScan: "Escanea desde nuestras aplicaciones móviles para una configuración VPN rápida.",
  contactSupport: "Contactar con soporte",
  safeReferenceTitle: "Referencia segura de la cuenta:",
  safeReferenceDescription: "La ID de referencia segura se puede utilizar al comunicarse con los ingenieros de soporte técnico por correo electrónico.",
  deleteAccount: "Borrar cuenta",
  changePlan: "Cambiar plan",
  selectedPlan: "Plan seleccionado",
  included: "Incluido",
  devices: "dispositivos",
  comparePlans: "Comparar planes",
  configureWireguard: "Para configurar la conexión de WireGuard manualmente, visita nuestra página",
  configureWireguardLink: "página de configuración de WireGuard",
  ivpnSetup: "Configuración de IVPN",
  additionalServices: "Servicios adicionales",
  additionalServicesFooterSee: "Ver",
  additionalServicesFooterFor: " para lo que hace cada servicio.",
  additionalServicesFooterForDetails: " para más detalles.",
  additionalServicesFooter: "Para aprender más sobre cada servicio y sus beneficios, visita la",
  additionalServicesFooterLink: "descripción general de servicios",
  additionalServicesFooter2: "Tu ID de cuenta de IVPN no se pasa ni se almacena en Mailx, modDNS o Safing Portmaster. Revisa la",
  additionalServicesFooter2Link: "explicación de acceso no vinculado",
  getHelp: "Obtener ayuda",
  creditCard: "T. Crédito",
  paypal: "PayPal",
  bitcoin: "Bitcoin",
  monero: "Monero",
  cash: "Efectivo",
  haveVoucher: "¿Tienes un cupón?",
  redeem: "Canjéalo aquí",
  ivpnAccount: "Cuenta IVPN",
  services: "Servicios",
  wireguard: "Wireguard",
  deviceManagement: "Dispositivos",
  accountSettings: "Configuración",
  changeProductTitle: "Cambiar producto",
  changeProductDesc: "Puedes cambiar tu plan de producto en cualquier momento. Si tu cuenta está activa, cambiar el tipo de producto cambiará la cantidad de tiempo restante en tu cuenta.",
  upgradeProductTitle: "Mejorar producto",
  upgradeProductDesc: "Elige un plan para iniciar el proceso de mejora. Pagarás la diferencia mostrada, calculada en función del tiempo restante en tu cuenta. Tras el pago exitoso, obtendrás acceso instantáneo al plan seleccionado y sus beneficios. La fecha de vencimiento permanecerá igual.",
  activeUntil: "Activo hasta",
  willBeActiveUntil: "Estará activo hasta:",
  currentPlan: "Plan actual",
  currentPlanBadge: "Plan actual",
  newPlan: "Nuevo plan",
  differencePaidToday: "Diferencia, pagada hoy",
  upgradePaidToday: "Precio de mejora (pagado hoy)",
  choosePaymentMethod: "Elige un método de pago para continuar:",
  price: "Precio",
  thisDate: "Esta fecha se calcula en función del tiempo restante en tu cuenta y la diferencia de precio entre los tipos de producto. Los descuentos a largo plazo no son aplicables. No se requiere un pago adicional.",
  thisPrice: "Este precio se calcula en función del tiempo restante en tu cuenta y la diferencia de precio entre los tipos de producto. Los descuentos a largo plazo no son aplicables. Se require un pago adicional.",
  changeProductSuccess: "El producto se ha cambiado correctamente a ",
  changeBillingCycle: "Cambiar ciclo de facturación",
  newBillingCycle: "El nuevo ciclo de facturación se aplicará al final del período de facturación actual",
  update: "Actualizar",
  cancel: "Cancelar",
  confirm: "Confirmar",
  confirmChangeProduct: "IVPN Standard permite el acceso VPN en 2 dispositivos. Iniciar un cambio de plan te desconectará de todos los dispositivos activos. Puedes iniciar sesión en nuevos dispositivos después. Por favor, confirma para proceder.",
  disableRecurring: "Desactivar pagos recurrentes",
  disableRecurringDesc: "Al desactivar los pagos recurrentes, se eliminará la información de pago almacenada de nuestro sistema y se desactivará la renovación automática del servicio.",
  disableRecurringPayments: "Desactivar pagos recurrentes",
  vouchers: "Cupones",
  popups: {
    authentication: {
      title: "Autenticar usando ID de cuenta",
      desc: "Al desactivar la autenticación por correo electrónico y contraseña, se eliminará tu dirección de correo electrónico y el hash de la contraseña de nuestros sistemas. No podrás iniciar sesión con tu dirección de correo electrónico y contraseña. Si deseas volver a habilitar la autenticación por correo electrónico y contraseña, deberás contactar con soporte.",
      important: "Importante:",
      makeSure: "Por favor, asegúrate de haber anotado tu ID de cuenta, ya que la usarás para iniciar sesión en el área de cliente:",
      changeAuthentication: "Cambiar autenticación"
    },
    authenticationEmail: {
      title: "Configurar autenticación por correo electrónico y contraseña",
      changeYourEmail: "Cambia tu dirección de correo electrónico",
      changePassword: "Cambia tu contraseña",
      pleaseEnter: "Por favor, introduce el correo electrónico y contraseña que usarás para iniciar sesión en el área de cliente.",
      email: "Correo electrónico:",
      password: "Contraseña:",
      confirmPassword: "Confirma la contraseña:",
      setup: "Configurar",
      update: "Actualizar",
      cancel: "Cancelar"
    },
    paymentMethod: {
      title: "Configurar método de pago",
      paypalAccount: "Cuenta PayPal:",
      pleaseLog: "Por favor, inicia sesión en tu cuenta de PayPal utilizando el botón de abajo.",
      setPaymentMethod: "Configurar método de pago",
      cancel: "Cancelar"
    },
    totp: {
      disable: {
        title: "Desactivar autenticación de dos factores",
        desc: "Para desactivar la autenticación de dos factores, introduce el código de la aplicación TOTP o un código de respaldo.",
        disable: "Desactivar",
        cancel: "Cancelar"
      },
      enable: {
        title: "Activar autenticación de dos factores",
        instructions: "Para activar la autenticación de dos factores, escanea el código con una aplicación TOTP (por ejemplo: Google Authenticator) e introduce el código en el campo de abajo.",
        scan: "Si no puedes escanear el código QR, puedes introducir manualmente la siguiente información.",
        secret: "Secreto:",
        account: "Cuenta:",
        success: "La autenticación de dos factores se ha configurado correctamente.",
        successDesc: "Por favor, guarda los siguientes códigos de respaldo que podrás usar en lugar de TOTP en caso de que pierdas el acceso a tu dispositivo.",
        backupCodes: "Códigos de respaldo",
        eachCode: "Cada uno de estos códigos solo se puede usar una vez.",
        close: "Cerrar",
        enable: "Activar",
        cancel: "Cancelar",
        codeFrom: "Código de la aplicación TOTP"
      }
    },
    changeProduct: {
      cancel: "Cancelar",
      downgrade: "Cambiar",
      tier1: {
        title: "Cambiar a IVPN Standard",
        desc1: "Advertencia:",
        desc2: "El plan Standard incluye 5 dispositivos para IVPN.",
        desc3: "Perderás el acceso a todos los servicios adicionales en tu plan actual.",
        desc4: "Sugerimos exportar los datos de Mailx y modDNS antes de realizar este paso.",
        desc5: "Confirma que aún deseas cambiar a un plan inferior:"
      },
      tier2: {
        title: "Cambiar a IVPN Plus",
        desc1: "Advertencia:",
        desc2: "El plan Plus incluye 5 dispositivos para IVPN.",
        desc3: "Postmaster Pro se cambiará a Portmaster Free.",
        desc4: "",
        desc5: "Confirma que aún deseas cambiar a un plan inferior:"
      }
    }
  },
  wireguardTab: {
    title: "WireGuard",
    description1: "Si estás utilizando las aplicaciones de IVPN para Windows, macOS, Linux, Android o iOS, las claves de WireGuard se gestionan automáticamente, simplemente selecciona el protocolo WireGuard en la configuración de la aplicación.",
    description2: "Si estás utilizando el cliente nativo de WireGuard, entonces necesitas crear manualmente tus claves y los archivos de configuración necesarios. Proporcionamos un generador de archivos de configuración que generará claves de WireGuard, te permitirá especificar los servidores que necesitas y otros parámetros. Simplemente importa el archivo de configuración y estarás listo para conectarte.",
    configurationFileGenerator: "Generador de archivos de configuración",
    manuallyConfigure: "Si deseas configurar WireGuard manualmente y solo necesitas enviar una nueva clave pública, utiliza el formulario a continuación.",
    addNewPublicKey: "Añadir nueva clave pública",
    noWireguardKeys: "No hay claves de WireGuard añadidas manualmente para esta cuenta.",
    usefulLinks: "Enlaces útiles",
    serverList: "Lista de servidores WireGuard",
    faq: "Preguntas frecuentes de WireGuard",
    expiredTitle: "Tu cuenta ha caducado",
    renewAccount: " Por favor, renueva tu cuenta para gestionar las claves de WireGuard.",
    toYourAccount: "A tu cuenta",
    addWireguardKey: "Añadir clave WireGuard",
    publicKeyRequired: "¡Clave pública requerida!",
    publicKey: "Clave pública:",
    comment: "Comentario (opcional):",
    add: "Añadir clave",
    cancel: "Cancelar",
    backToWireguard: "Volver a WireGuard",
    configuration: "Configuración de WireGuard",
    configStep1Title: "1: Generar clave WireGuard",
    configStep1Content: "Una clave privada y pública se generará en el navegador. La clave privada se incluirá en el archivo de configuración que descargues. Solo la clave pública se enviará a nuestro servidor. Puedes revisar el código en",
    generateKey: "Generar clave",
    addKey: "Añadir ",
    keyComment: "Comentario de la clave (opcional):",
    keyCommentRequired: "Comentario de la clave:",
    privateKey: "Clave privada:",
    configStep2Title: "Selecciona uno o varios servidores de salida",
    configStep2Content: "Una configuración separada se generará para cada ubicación que incluyas.",
    selectExitServerLocation: "Selecciona la ubicación del servidor de salida",
    allCountries: "Todos los países",
    allCities: "Todas las ciudades",
    allServers: "Todos ",
    selectEntryServerLocation: "Selecciona la ubicación del servidor de entrada",
    selectCountry: "Selecciona el país",
    selectCity: "Selecciona la ciudad",
    selectServer: "Selecciona el servidor",
    configStep3Title: "3. Configuración",
    configStep3Content: "Puede que necesites configurar un puerto personalizado si estás detrás de un firewall restrictivo.",
    port: "Puerto",
    vpnTunnelTraffic: "Tráfico de túnel VPN",
    vpnTunnelTrafficDesc: "Por defecto, recibirás una dirección IPv4 y una IPv6. Puedes especificar si deseas recibir solo una dirección IPv4 o IPv6.",
    and: "y",
    dnsSettings: "Configuración de DNS",
    dnsSettingsNote1: "Cuando AntiTracker está desactivado, puedes usar tus propios servidores DNS personalizados.",
    learnMore: "Aprende más",
    aboutHow: "sobre cómo se implementa IVPN AntiTracker.",
    dnsSettingsNote2: "El modo Hardcore bloquea las principales empresas con modelos de negocio que dependen de la vigilancia del usuario (actualmente: Google y Facebook).",
    standard: "Standard",
    antitracker: "AntiTracker",
    hardcore: "Modo Hardcore",
    customDns: "DNS personalizado",
    pleaseEnter: "Por favor, introduce una dirección IPv4 o IPv6 válida.",
    downloadZipArchive: "Descargar archivo zip",
    generateQrCode: "Generar código QR",
    configStep4Title: "4. Descargar",
    "delete": "Eliminar",
    ipv4Address: "Dirección IPv4",
    ipv6Address: "Dirección IPv6",
    deleteKeyConfirm: "¿Estás seguro de que deseas eliminar esta clave?",
    yes: "Sí"
  },
  deviceManagementTab: {
    disabled: "La gestión de dispositivos está deshabilitada.",
    disabledDesc1: "Cuando está función está habilitada, puedes revisar los dispositivos conectados al servicio y cerrar su sesión de forma remota según sea necesario.",
    disabledDesc2: "Recomendamos guardar de forma segura los identificadores de dispositivos con cifrado para identificar y desconectar dispositivos cuando no tengas acceso a ellos.",
    disabledDesc3: "Aprende más sobre esta función y sus posibles implicaciones de privacidad",
    disabledDesc4: "La gestión de dispositivos es aplicable solo al servicio VPN, los servicios adicionales no se ven afectados.",
    here: "aquí",
    enableDeviceManagement: "Activar la gestión de dispositivos",
    activeDevices: "Dispositivos IVPN activos",
    devicesAdded: "Dispositivos IVPN añadidos",
    logoutFromAllDevices: "Cerrar sesión en todos los dispositivos",
    enabled: "La gestión de dispositivos está habilitada.",
    enabledDesc1: "No tienes dispositivos conectados al servicio.",
    enabledDesc2: "en una aplicación IVPN para añadir un dispositivo. Una vez añadidos, los identificadores de tus dispositivos aparecerán en esta página.",
    please: "Por favor",
    login: "inicia sesión",
    increaseDeviceLimit: "Para aumentar tu límite de dispositivos a",
    changeYourProduct: "cambia tu producto",
    changeTo: "a IVPN Pro.",
    disableDeviceManagement: "Desactivar la gestión de dispositivos",
    disablePopupDesc1: "Por favor, ten en cuenta que después de desactivar la gestión de dispositivos:",
    disablePopupDesc2: "- No se cerrará la sesión de tus dispositivos.",
    disablePopupDesc3: "- No podrás gestionar tus dispositivos en tu panel de control.",
    proceed: "Proceder",
    cancel: "Cancelar",
    confirmLogoutAll: "Por favor, confirma que deseas cerrar sesión en todos los dispositivos.",
    confirm: "Confirmar",
    confirmDelete: "¿Estás seguro de que deseas eliminar este dispositivo?",
    yes: "Si",
    renewAccount: "Por favor, renueva tu cuenta para gestionar tus dispositivos.",
    upgradeText1: "Para aumentar tu límite de dispositivos a 10,",
    upgradeText2: "mejora",
    upgradeText3: "tu plan a IVPN Pro Suite."
  },
  accountSettingsTab: {
    backToAccount: "Volver a la cuenta",
    title: "Configuración de la cuenta",
    authentication: "Autenticación",
    billing: "Facturación",
    deleteAccount: "Borrar cuenta",
    logInto: "Inicia sesión en el área de cliente utilizando",
    accountId: "ID de cuenta",
    emailPassword: "Email y Contraseña",
    email: "Email:",
    password: "Contraseña:",
    "2fa": "Autenticación de dos factores",
    "2faDesc": "Cuando está activado se requerirá autenticación de dos factores en el área de cliente y aplicaciones de IVPN.",
    recurringPayments: "Pagos recurrentes",
    billingCycle: "Ciclo de facturación",
    paymentMethod: "Método de pago",
    paidUntil: "Pagado hasta",
    wasActiveUntil: " Estaba activo hasta",
    lastPayment: "Último pago",
    recurringFailedOn: "El pago automático recurrente falló el ",
    pleaseCheck: "Por favor, revisa o actualiza tu método de pago e inténtalo de nuevo.",
    processingPayment: "Procesando pago",
    extendYourAccount: "Recarga tu cuenta",
    upgradeYourAccount: "Mejora tu cuenta",
    deleteAccountConfirm: "¿Estás seguro de que deseas borrar tu cuenta?",
    accountActive: "Tu cuenta está actualmente activa.",
    deleteAccountConfirmDesc: "Para confirmar la eliminación permanente de tu cuenta, por favor, introduce los siguientes símbolos en el campo de abajo:",
    cancel: "Cancelar",
    warning: "Aviso:",
    warningDesc: "Esta operación no se puede deshacer. Borrar tu cuenta eliminará permanentemente los datos de nuestros sistemas.",
    retry: "Reintentar",
    services: "Servicios",
    syncMail: "Sincronizar"
  },
  payments: {
    paymentReceived: {
      title: "Tu pago ha sido recibido",
      accountExtended: "Tu cuenta se ha extendido hasta ",
      review: ". Puedes revisar los detalles de tu pago y los detalles sobre tu plan seleccionado en la página de la cuenta.",
      downloadInvoice: "Descargar factura",
      goToAccount: "Ir a la cuenta",
      join: "Únete a nuestra comunidad para noticias, actualizaciones de productos y discusiones:",
      nextSteps: "Toma el siguiente paso para mejorar tu privacidad:",
      privacyGuides: "Guías de privacidad",
      blog: "Blog IVPN",
      thankYou: "Gracias por tu pedido",
      yourAccount: "Tu cuenta se acreditará una vez que se confirme tu pago de Bitcoin.",
      questions: "Si tienes alguna pregunta, ",
      contactUs: "contáctanos."
    },
    invoice: {
      loading: "Cargando  factura...",
      invoice: "Factura",
      invoiceDate: "Fecha de la factura:",
      paid: "Pagada:",
      invoicedTo: "Facturado a:",
      accountReference: "ID de referencia de la cuenta:",
      payTo: "Pagar a:",
      description: "Descripción:",
      amount: "Cantidad:",
      subtotal: "Subtotal:",
      total: "Total:"
    },
    selectPaymentMethod: "Elige un método de pago",
    byMaking: "Al pagar aceptas nuestros",
    termsOfService: "Términos de servicio",
    bitcoin: {
      bitcoinDescription: "Ejecutamos nuestros propios nodos de Bitcoin y Lightning Network utilizando una instancia de servidor BTCPay auto-alojada. Los pagos son procesados por IVPN y no hay terceros involucrados.",
      bitcoinOnchain: "Los pagos de Bitcoin On-chain no están disponibles para recargas de 1 semana de IVPN. Sugerimos usar BTC Lightning o cambiar a un método de pago diferente.",
      payWithBitcoin: "Paga con Bitcoin",
      payWithLightning: "Paga con Lightning",
      unavailable: "No disponible temporalmente"
    },
    paypal: {
      processingYourPayment: "Procesando tu pago...",
      solveCaptcha: "Por favor, resuelve el siguiente captcha para continuar.",
      enterNumbers: "Por favor, introduce los números que ves arriba:",
      "continue": "Continuar",
      cancel: "Cancelar",
      toProceed: "Para proceder con el pago, inicia sesión en tu cuenta de PayPal utilizando el botón de abajo.",
      automaticallyRenew: "Renueva automáticamente al final del período",
      enablingThisCheckbox: "Activando esta casilla, tu método de pago se guardará y se facturará automáticamente al final del período. Podrás cancelar la renovación automática en cualquier momento."
    },
    creditCard: {
      cardIssue: "Hubo un problema con tu tarjeta. Por favor, inténtalo de nuevo.",
      automaticRenewal: "Renovación automática",
      ccAutomaticRenewalInfo: "Las renovaciones automáticas están siempre desactivadas de forma predeterminada. Puedes habilitar esto si es más conveniente para ti. Tus datos de tarjeta serán almacenados por Braintree, sin embargo, puedes cancelar la renovación automática en cualquier momento desde tu página de cuenta.",
      makePayment: "Pagar",
      cardNumber: "Número de tarjeta",
      errorAbove: "El error anterior proviene directamente de Braintree, nuestro procesador de pagos con tarjeta de crédito. Puedes actualizar los detalles de tu tarjeta y/o añadir información adicional e intentarlo de nuevo.",
      additionalCardInformation: "Información adicional de la tarjeta",
      byDesign: "Por defecto, siempre solicitamos la información mínima, sin embargo, algunos emisores de tarjetas requieren otra información además del número de tarjeta. Por ejemplo, nombre, correo electrónico. Opcionalmente puedes enviar esta información para aumentar las posibilidades de que tu pago sea exitoso. Estos datos se envían directamente desde tu navegador a nuestro procesador de pagos (braintreepayments.com) y nunca son vistos por IVPN.",
      firstName: "Nombre",
      lastName: "Apellidos",
      email: "Email",
      streetAddress: "Dirección",
      postalCode: "Código postal",
      dateFormat: "MM / AAAA"
    },
    cash: {
      pleaseSend: "Por favor, envía un sobre que contenga",
      or: "o",
      andReferenceNumber: "y el número de referencia",
      toTheFollowingAddress: "a la dirección que se indica abajo. Recomendamos hacer clic en el botón de abajo para imprimir la etiqueta de dirección y el número de referencia",
      printAddress: "Imprime la dirección y el número de referencia",
      pleaseNote: "Por favor, ten en cuenta",
      ifYouDontInclude: "Si no incluyes tu número de referencia único, no podremos atribuir tu pago a tu cuenta.",
      weRecommend: "Recomendamos envolver los billetes en dos hojas de papel para mayor seguridad.",
      cashPaymentsNormally: "Los pagos en efectivo normalmente tardan de 2 a 4 semanas en ser recibidos, dependiendo de la ubicación desde la que se envió el sobre y del servicio postal. Cuando el sobre llega a la dirección en Berlín, se envía a una ubicación diferente donde nuestro equipo de facturación recoge el pago y lo acredita a tu cuenta. Por lo tanto, si estás rastreando el paquete, tardará de 1 a 2 semanas más después de que se reciba el artículo antes de que se acredite tu cuenta.",
      pleaseNoteCash: "Por favor, ten en cuenta que los pagos en efectivo se envían bajo tu propio riesgo. IVPN no se hace responsable de los pagos en efectivo perdidos en tránsito.",
      weAccept: "Aceptamos pagos en efectivo para planes IVPN a partir de 1 año. Por favor, regresa y selecciona al menos 1 año como período de facturación."
    },
    monero: {
      pleaseUse: "Por favor, utiliza los siguientes detalles de pago para transferir Monero:",
      address: "Dirección:",
      amount: "Cantidad:",
      paymentReceived: "Pago recibido:",
      extendedUntil: "extendido hasta",
      waitingForPayment: "Esperando el pago...",
      information: "La información sobre el último pago reciente se mostrará aquí.",
      pleaseNote: "Por favor, ten en cuenta:",
      note1: "Tu cuenta se extenderá automáticamente después de que el pago sea confirmado. Esto puede tardar unos minutos.",
      note2: "La dirección especificada anteriormente es permanente para tu cuenta. Puedes usarla para recargar tu cuenta en cualquier momento en el futuro.",
      note1Upgrade: "Tu cuenta se mejorará después de que se confirme el pago. Esto puede tardar unos minutos.",
      note2Upgrade: "Aviso: La dirección anterior es para uso único y está activa durante 24 horas después de su generación. No envíes fondos adicionales a ella después de este pago."
    },
    voucher: {
      codeFrom: "Código de un cupón emitido por IVPN:",
      addTime: "Añadir tiempo",
      pleaseNote: "Por favor, ten en cuenta que los códigos de cupón se almacenan en nuestro sistema durante 30 días después de su uso para ayudar a resolver problemas de activación. La recuperación de la cuenta no es posible después de este período.",
      successPayment: "Cupón aplicado con éxito. El servicio se extiende hasta "
    }
  },
  vouchersTab: {
    notEligible: "Cupones IVPN gratuitos",
    notEligibleDesc: "Cuando sea elegible, puede compartir cinco códigos de cupón de prueba de 30 días con otras personas nuevas en IVPN.",
    notEligibleDesc2: "Los cupones IVPN están disponibles para cuentas existentes que tengan al menos 60 días de tiempo pagado restante.",
    notEligibleDesc3: "Recarga tu cuenta para cumplir con los criterios:",
    addMoreTime: "Añade más tiempo",
    eligible: "Cupones IVPN gratuitos",
    eligibleDesc: "A continuación puedes encontrar cinco códigos de cupón gratuitos.",
    eligibleDesc2: "Compártelos con otras personas para que puedan canjearlos por 30 días en sus nuevas cuentas de IVPN.",
    eligibleDesc3: "Los destinatarios pueden canjear los códigos de cupón siguiendo los siguientes pasos:",
    recipients1: "Creando una nueva cuenta IVPN Standard o Pro",
    recipients2: "Seleccionando 'Añadir más tiempo'",
    recipients3: "Seleccionando el enlace de canje del código de cupón",
    usefulNotes: "Notas sobre los códigos de cupón gratuitos:",
    notes1: "Los cupones están disponibles y se pueden canjear siempre que tengas al menos 60 días de tiempo pagado restante en tu cuenta de IVPN",
    notes2: "Los cupones solo se pueden canjear una vez con cuentas nuevas de IVPN Standard o Pro sin historial previo de cupones o pagos",
    notes3: "La oferta de cupones gratuitos se extiende hasta el 30 de septiembre de 2024",
    notes4: "Por razones de privacidad, no mostramos el estado de canje de los códigos anteriores",
    voucherCodes: "Códigos de cupón",
    markAsShared: "Marcar como compartido",
    markAsNotShared: "Marcar como no compartido"
  },
  servicesArea: {
    mail: "Mailx",
    dns: "modDNS",
    portmaster: "Portmaster Pro",
    accessMail: "Acceder",
    accessDns: "Acceder",
    accessPortmaster: "Acceder",
    setupMail: "Configurar",
    setupDns: "Configurar",
    setupPortmaster: "Configurar",
    active: "ACTIVO",
    available: "DISPONIBLE",
    unavailable: "NO DISPONIBLE",
    expired: "CADUCADO",
    upgrade: "Mejorar",
    upgradeTo: "Mejorar para acceder",
    mailDescription: "Reenvío de correo / todas las plataformas",
    dnsDescription: "Filtrado DNS / todas las plataformas",
    portmasterDescription: "Cortafuegos / Windows y Linux",
    limitedAccess: "Nota: Tu cuenta de IVPN ha caducado. Los servicios adicionales tienen funcionalidad limitada y no están disponibles para su registro. Para recuperar el acceso completo a los servicios adicionales, agrega tiempo a tu cuenta de IVPN lo antes posible.",
    pendingDeletion: "Nota: Tu cuenta de IVPN ha caducado. Los servicios adicionales no están disponibles. Para evitar la pérdida de configuraciones y datos en los servicios existentes, por favor recarga tu cuenta de IVPN."
  }
};
const resetPassword = {
  backToLogin: "Volver a Iniciar sesión",
  resetPassword: "Restaurar contraseña",
  resetPasswordDesc: "Si una cuenta con la dirección de correo electrónico especificada existe, enviaremos un correo electrónico con instrucciones adicionales sobre cómo restablecer tu contraseña.",
  enterEmail: "Por favor, introduce tu dirección de correo electrónico registrada. Se te enviarán instrucciones sobre cómo restablecer tu contraseña.",
  sendResetInstructions: "Enviar instrucciones de restablecimiento",
  setNewPassword: "Establecer nueva contraseña",
  setNewPasswordDesc: "Tu contraseña ha sido cambiado con éxito.",
  newPassword: "Nueva contraseña:",
  confirm: "Confirmar:",
  changePassword: "Cambiar contraseña"
};
const openVpnConfig = {
  step1Title: "1. Elige uno o varios servidores de salida",
  step1Desc: "Una configuración separada se generará para cada ubicación que incluyas.",
  singleHop: "Single-Hop",
  multiHop: "Multi-Hop",
  selectExitServerLocation: "Elige la ubicación del servidor de salida",
  allCountries: "Todos los países",
  allCities: "Todos las ciudades",
  allServers: "Todos los servidores",
  selectEntryServerLocation: "Elige la ubicación del servidor de entrada",
  selectCountry: "Elige el país",
  selectCity: "Elige la ciudad",
  selectServer: "Elige el servidor",
  step2Title: "2. Configuración",
  protocol: "Protocolo",
  protocolPort: "Protocolo / Puerto",
  step2Desc: "Es posible que necesites configurar un puerto personalizado si estás detrás de un firewall restrictivo.",
  hostnamesOrIp: "Nombres de host o direcciones IP",
  useHostnames: "Usar nombres de host",
  useIpAddresses: "Usar direcciones IP",
  openVpnVersion: "Versión de OpenVPN",
  allVersions: "Todas las versiones de OpenVPN",
  dnsSettings: "Configuración de DNS",
  dnsSettingsNote1: "Cuando AntiTracker está desactivado, puedes usar tus propios servidores DNS personalizados.",
  learnMore: "Aprender más",
  aboutHow: "sobre cómo se implementa IVPN AntiTracker.",
  dnsSettingsNote2: "El modo Hardcore bloquea las principales empresas con modelos de negocio que dependen de la vigilancia del usuario (actualmente: Google y Facebook).",
  hardcoreMode: "Modo Hardcore",
  customDns: "DNS personalizado",
  enterValidIp: "Por favor, introduce una dirección IPv4 válida.",
  step3Title: "3. Descargar",
  downloadZip: "Descargar archivo zip"
};
const compare = {
  title: "Compara",
  description: "Compara diferentes planes y características de IVPN."
};
const es = {
  servers,
  pricing,
  login,
  account,
  resetPassword,
  openVpnConfig,
  compare
};
export {
  ssrRenderStyle_1 as A,
  ssrRenderAttr_1 as B,
  ssrIncludeBooleanAttr as C,
  ssrLooseContain_1 as D,
  ssrRenderList_1 as E,
  ssrRenderSlot_1 as F,
  openBlock as G,
  createBlock as H,
  createCommentVNode as I,
  createVNode as J,
  ssrLooseEqual_1 as K,
  es as L,
  en as M,
  createI18n as N,
  createSSRApp as O,
  renderToString_1 as P,
  _export_sfc as _,
  shallowRef as a,
  ref as b,
  computed as c,
  defineComponent as d,
  effectScope as e,
  watchEffect as f,
  getCurrentInstance$1 as g,
  h,
  inject as i,
  useI18n as j,
  resolveComponent as k,
  ssrRenderAttrs_1 as l,
  mergeProps as m,
  nextTick as n,
  ssrRenderClass_1 as o,
  provide as p,
  ssrRenderComponent_1 as q,
  reactive as r,
  shallowReactive as s,
  withCtx as t,
  unref as u,
  ssrInterpolate_1 as v,
  watch as w,
  createTextVNode as x,
  toDisplayString$2 as y,
  useSSRContext as z
};
