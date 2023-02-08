/* empty css                           */import { c as createAstro, a as createComponent$1, r as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderHead, e as renderComponent, f as renderSlot, _ as __astro_tag_component__ } from '../astro.11b9610d.mjs';
import 'html-escaper';

function createSignal(value, options) {
  return [() => value, v => {
    return value = typeof v === "function" ? v(value) : v;
  }];
}
const sharedConfig = {};
function setHydrateContext(context) {
  sharedConfig.context = context;
}
function nextHydrateContext() {
  return sharedConfig.context ? {
    ...sharedConfig.context,
    id: `${sharedConfig.context.id}${sharedConfig.context.count++}-`,
    count: 0
  } : undefined;
}
function createComponent(Comp, props) {
  if (sharedConfig.context && !sharedConfig.context.noHydrate) {
    const c = sharedConfig.context;
    setHydrateContext(nextHydrateContext());
    const r = Comp(props || {});
    setHydrateContext(c);
    return r;
  }
  return Comp(props || {});
}

const booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
/*#__PURE__*/new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...booleans]);

const {
  hasOwnProperty
} = Object.prototype;
const REF_START_CHARS = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_";
const REF_START_CHARS_LEN = REF_START_CHARS.length;
const REF_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_";
const REF_CHARS_LEN = REF_CHARS.length;
const STACK = [];
const BUFFER = [""];
let ASSIGNMENTS = new Map();
let INDEX_OR_REF = new WeakMap();
let REF_COUNT = 0;
BUFFER.pop();
function stringify(root) {
  if (writeProp(root, "")) {
    let result = BUFFER[0];
    for (let i = 1, len = BUFFER.length; i < len; i++) {
      result += BUFFER[i];
    }
    if (REF_COUNT) {
      if (ASSIGNMENTS.size) {
        let ref = INDEX_OR_REF.get(root);
        if (typeof ref === "number") {
          ref = toRefParam(REF_COUNT++);
          result = ref + "=" + result;
        }
        for (const [assignmentRef, assignments] of ASSIGNMENTS) {
          result += ";" + assignments + assignmentRef;
        }
        result += ";return " + ref;
        ASSIGNMENTS = new Map();
      } else {
        result = "return " + result;
      }
      result = "(function(" + refParamsString() + "){" + result + "}())";
    } else if (root && root.constructor === Object) {
      result = "(" + result + ")";
    }
    BUFFER.length = 0;
    INDEX_OR_REF = new WeakMap();
    return result;
  }
  return "void 0";
}
function writeProp(cur, accessor) {
  switch (typeof cur) {
    case "string":
      BUFFER.push(quote(cur, 0));
      break;
    case "number":
      BUFFER.push(cur + "");
      break;
    case "boolean":
      BUFFER.push(cur ? "!0" : "!1");
      break;
    case "object":
      if (cur === null) {
        BUFFER.push("null");
      } else {
        const ref = getRef(cur, accessor);
        switch (ref) {
          case true:
            return false;
          case false:
            switch (cur.constructor) {
              case Object:
                writeObject(cur);
                break;
              case Array:
                writeArray(cur);
                break;
              case Date:
                BUFFER.push('new Date("' + cur.toISOString() + '")');
                break;
              case RegExp:
                BUFFER.push(cur + "");
                break;
              case Map:
                BUFFER.push("new Map(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case Set:
                BUFFER.push("new Set(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case undefined:
                BUFFER.push("Object.assign(Object.create(null),");
                writeObject(cur);
                BUFFER.push(")");
                break;
              default:
                return false;
            }
            break;
          default:
            BUFFER.push(ref);
            break;
        }
      }
      break;
    default:
      return false;
  }
  return true;
}
function writeObject(obj) {
  let sep = "{";
  STACK.push(obj);
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      const val = obj[key];
      const escapedKey = toObjectKey(key);
      BUFFER.push(sep + escapedKey + ":");
      if (writeProp(val, escapedKey)) {
        sep = ",";
      } else {
        BUFFER.pop();
      }
    }
  }
  if (sep === "{") {
    BUFFER.push("{}");
  } else {
    BUFFER.push("}");
  }
  STACK.pop();
}
function writeArray(arr) {
  BUFFER.push("[");
  STACK.push(arr);
  writeProp(arr[0], 0);
  for (let i = 1, len = arr.length; i < len; i++) {
    BUFFER.push(",");
    writeProp(arr[i], i);
  }
  STACK.pop();
  BUFFER.push("]");
}
function getRef(cur, accessor) {
  let ref = INDEX_OR_REF.get(cur);
  if (ref === undefined) {
    INDEX_OR_REF.set(cur, BUFFER.length);
    return false;
  }
  if (typeof ref === "number") {
    ref = insertAndGetRef(cur, ref);
  }
  if (STACK.includes(cur)) {
    const parent = STACK[STACK.length - 1];
    let parentRef = INDEX_OR_REF.get(parent);
    if (typeof parentRef === "number") {
      parentRef = insertAndGetRef(parent, parentRef);
    }
    ASSIGNMENTS.set(ref, (ASSIGNMENTS.get(ref) || "") + toAssignment(parentRef, accessor) + "=");
    return true;
  }
  return ref;
}
function toObjectKey(name) {
  const invalidIdentifierPos = getInvalidIdentifierPos(name);
  return invalidIdentifierPos === -1 ? name : quote(name, invalidIdentifierPos);
}
function toAssignment(parent, key) {
  return parent + (typeof key === "number" || key[0] === '"' ? "[" + key + "]" : "." + key);
}
function getInvalidIdentifierPos(name) {
  let char = name[0];
  if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char === "$" || char === "_")) {
    return 0;
  }
  for (let i = 1, len = name.length; i < len; i++) {
    char = name[i];
    if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char >= "0" && char <= "9" || char === "$" || char === "_")) {
      return i;
    }
  }
  return -1;
}
function quote(str, startPos) {
  let result = "";
  let lastPos = 0;
  for (let i = startPos, len = str.length; i < len; i++) {
    let replacement;
    switch (str[i]) {
      case '"':
        replacement = '\\"';
        break;
      case "\\":
        replacement = "\\\\";
        break;
      case "<":
        replacement = "\\x3C";
        break;
      case "\n":
        replacement = "\\n";
        break;
      case "\r":
        replacement = "\\r";
        break;
      case "\u2028":
        replacement = "\\u2028";
        break;
      case "\u2029":
        replacement = "\\u2029";
        break;
      default:
        continue;
    }
    result += str.slice(lastPos, i) + replacement;
    lastPos = i + 1;
  }
  if (lastPos === startPos) {
    result = str;
  } else {
    result += str.slice(lastPos);
  }
  return '"' + result + '"';
}
function insertAndGetRef(obj, pos) {
  const ref = toRefParam(REF_COUNT++);
  INDEX_OR_REF.set(obj, ref);
  if (pos) {
    BUFFER[pos - 1] += ref + "=";
  } else {
    BUFFER[pos] = ref + "=" + BUFFER[pos];
  }
  return ref;
}
function refParamsString() {
  let result = REF_START_CHARS[0];
  for (let i = 1; i < REF_COUNT; i++) {
    result += "," + toRefParam(i);
  }
  REF_COUNT = 0;
  return result;
}
function toRefParam(index) {
  let mod = index % REF_START_CHARS_LEN;
  let ref = REF_START_CHARS[mod];
  index = (index - mod) / REF_START_CHARS_LEN;
  while (index > 0) {
    mod = index % REF_CHARS_LEN;
    ref += REF_CHARS[mod];
    index = (index - mod) / REF_CHARS_LEN;
  }
  return ref;
}
function renderToString(code, options = {}) {
  let scripts = "";
  sharedConfig.context = {
    id: options.renderId || "",
    count: 0,
    suspense: {},
    lazy: {},
    assets: [],
    nonce: options.nonce,
    writeResource(id, p, error) {
      if (sharedConfig.context.noHydrate) return;
      if (error) return scripts += `_$HY.set("${id}", ${serializeError(p)});`;
      scripts += `_$HY.set("${id}", ${stringify(p)});`;
    }
  };
  let html = resolveSSRNode(escape(code()));
  sharedConfig.context.noHydrate = true;
  html = injectAssets(sharedConfig.context.assets, html);
  if (scripts.length) html = injectScripts(html, scripts, options.nonce);
  return html;
}
function ssr(t, ...nodes) {
  if (nodes.length) {
    let result = "";
    for (let i = 0; i < nodes.length; i++) {
      result += t[i];
      const node = nodes[i];
      if (node !== undefined) result += resolveSSRNode(node);
    }
    t = result + t[nodes.length];
  }
  return {
    t
  };
}
function ssrAttribute(key, value, isBoolean) {
  return isBoolean ? value ? " " + key : "" : value != null ? ` ${key}="${value}"` : "";
}
function ssrHydrationKey() {
  const hk = getHydrationKey();
  return hk ? ` data-hk="${hk}"` : "";
}
function escape(s, attr) {
  const t = typeof s;
  if (t !== "string") {
    if (!attr && t === "function") return escape(s(), attr);
    if (!attr && Array.isArray(s)) {
      let r = "";
      for (let i = 0; i < s.length; i++) r += resolveSSRNode(escape(s[i], attr));
      return {
        t: r
      };
    }
    if (attr && t === "boolean") return String(s);
    return s;
  }
  const delim = attr ? '"' : "<";
  const escDelim = attr ? "&quot;" : "&lt;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");
  if (iDelim < 0 && iAmp < 0) return s;
  let left = 0,
    out = "";
  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }
  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else while (iAmp >= 0) {
    if (left < iAmp) out += s.substring(left, iAmp);
    out += "&amp;";
    left = iAmp + 1;
    iAmp = s.indexOf("&", left);
  }
  return left < s.length ? out + s.substring(left) : out;
}
function resolveSSRNode(node) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) mapped += resolveSSRNode(node[i]);
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode(node());
  return String(node);
}
function getHydrationKey() {
  const hydrate = sharedConfig.context;
  return hydrate && !hydrate.noHydrate && `${hydrate.id}${hydrate.count++}`;
}
function injectAssets(assets, html) {
  if (!assets || !assets.length) return html;
  let out = "";
  for (let i = 0, len = assets.length; i < len; i++) out += assets[i]();
  return html.replace(`</head>`, out + `</head>`);
}
function injectScripts(html, scripts, nonce) {
  const tag = `<script${nonce ? ` nonce="${nonce}"` : ""}>${scripts}</script>`;
  const index = html.indexOf("<!--xs-->");
  if (index > -1) {
    return html.slice(0, index) + tag + html.slice(index);
  }
  return html + tag;
}
function serializeError(error) {
  if (error.message) {
    const fields = {};
    const keys = Object.getOwnPropertyNames(error);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = error[key];
      if (!value || key !== "message" && typeof value !== "function") {
        fields[key] = value;
      }
    }
    return `Object.assign(new Error(${stringify(error.message)}), ${stringify(fields)})`;
  }
  return stringify(error);
}

const $$Astro$9 = createAstro();
const $$Navbar = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Navbar;
  const navItemStyle = "uppercase py-2 px-4 rounded-full hover:bg-dark-grey text-h3 leading-h3 tracking-h3 text-white font-heading font-bold";
  return renderTemplate`<!-- Mobile menu button-->${maybeRenderHead($$result)}<nav class="sm:hidden flex justify-between items-center mx-6 text-white">
  <h2 class="uppercase">The planets</h2>
  <button type="button" class="inline-flex items-center justify-center rounded-md p-2 hover:text-grey focus:text-grey" aria-controls="mobile-menu" aria-expanded="false">
    <span class="sr-only">Open main menu</span>
    <!--
    Icon when menu is closed.

    Heroicon name: outline/bars-3

    Menu open: "hidden", Menu closed: "block"
  -->
    <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
    </svg>
    <!--
    Icon when menu is open.

    Heroicon name: outline/x-mark

    Menu open: "block", Menu closed: "hidden"
  -->
    <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  </button>
</nav>

<nav class="hidden md:flex flex-col items-center justify-between h-28 lg:h-20 mx-6 lg:flex-row">
  <h2 class="uppercase">The planets</h2>
  <ul class="flex justify-between items-center">
    <li>
      <a href="index.html"${addAttribute(navItemStyle, "class")}>Mercury</a>
    </li>
    <li>
      <a href="venus.html"${addAttribute(navItemStyle, "class")}>Venus</a>
    </li>
    <li>
      <a href="earth.html"${addAttribute(navItemStyle, "class")}>Earth</a>
    </li>
    <li>
      <a href="mars.html"${addAttribute(navItemStyle, "class")}>Mars</a>
    </li>
    <li>
      <a href="jupiter.html"${addAttribute(navItemStyle, "class")}>Jupiter</a>
    </li>
    <li>
      <a href="saturn.html"${addAttribute(navItemStyle, "class")}>Saturn</a>
    </li>
    <li>
      <a href="uranus.html"${addAttribute(navItemStyle, "class")}>Uranus</a>
    </li>
    <li>
      <a href="neptune.html"${addAttribute(navItemStyle, "class")}>Neptune</a>
    </li>
  </ul>
</nav>`;
}, "D:/Prosjekter/08.Challenges/planet-facts/src/components/Navbar.astro");

const $$Astro$8 = createAstro();
const $$Layout = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" class="astro-SCKKX6R4">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="/favicon.png">
    <meta name="generator"${addAttribute(Astro2.generator, "content")}>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Antonio:wght@500&family=League+Spartan&display=swap" rel="stylesheet">
    <title>${title}</title>
  ${renderHead($$result)}</head>
  <body class="background astro-SCKKX6R4">
    ${renderComponent($$result, "Navbar", $$Navbar, { "class": "astro-SCKKX6R4" })}
    ${renderSlot($$result, $$slots["default"])}
  

</body></html>`;
}, "D:/Prosjekter/08.Challenges/planet-facts/src/layouts/Layout.astro");

const data = [
	{
		name: "Mercury",
		overview: {
			content: "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets. Mercury is one of four terrestrial planets in the Solar System, and is a rocky body like Earth.",
			source: "https://en.wikipedia.org/wiki/Mercury_(planet)"
		},
		structure: {
			content: "Mercury appears to have a solid silicate crust and mantle overlying a solid, iron sulfide outer core layer, a deeper liquid core layer, and a solid inner core. The planet's density is the second highest in the Solar System at 5.427 g/cm3 , only slightly less than Earth's density.",
			source: "https://en.wikipedia.org/wiki/Mercury_(planet)#Internal_structure"
		},
		geology: {
			content: "Mercury's surface is similar in appearance to that of the Moon, showing extensive mare-like plains and heavy cratering, indicating that it has been geologically inactive for billions of years. It is more heterogeneous than either Mars's or the Moon’s.",
			source: "https://en.wikipedia.org/wiki/Mercury_(planet)#Surface_geology"
		},
		rotation: "58.6 Days",
		revolution: "87.97 Days",
		radius: "2,439.7 KM",
		temperature: "430°c",
		images: {
			planet: "/planet-mercury.svg",
			internal: "/planet-mercury-internal.svg",
			geology: "/geology-mercury.png"
		}
	},
	{
		name: "Venus",
		overview: {
			content: "Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be, on rare occasions, visible to the naked eye in broad daylight.",
			source: "https://en.wikipedia.org/wiki/Venus"
		},
		structure: {
			content: "The similarity in size and density between Venus and Earth suggests they share a similar internal structure: a core, mantle, and crust. Like that of Earth, Venusian core is most likely at least partially liquid because the two planets have been cooling at about the same rate.",
			source: "https://en.wikipedia.org/wiki/Venus#Internal_structure"
		},
		geology: {
			content: "Much of the Venusian surface appears to have been shaped by volcanic activity. Venus has several times as many volcanoes as Earth, and it has 167 large volcanoes that are over 100 km (60 mi) across. The only volcanic complex of this size on Earth is the Big Island of Hawaii.",
			source: "https://en.wikipedia.org/wiki/Venus#Surface_geology"
		},
		rotation: "243 Days",
		revolution: "224.7 Days",
		radius: "6,051.8 KM",
		temperature: "471°c",
		images: {
			planet: "/planet-venus.svg",
			internal: "/planet-venus-internal.svg",
			geology: "/geology-venus.png"
		}
	},
	{
		name: "Earth",
		overview: {
			content: "Third planet from the Sun and the only known planet to harbor life. About 29.2% of Earth's surface is land with remaining 70.8% is covered with water. Earth's distance from the Sun, physical properties and geological history have allowed life to evolve and thrive.",
			source: "https://en.wikipedia.org/wiki/Earth"
		},
		structure: {
			content: "Earth's interior, like that of the other terrestrial planets, is divided into layers by their chemical or physical (rheological) properties. The outer layer is a chemically distinct silicate solid crust, which is underlain by a highly viscous solid mantle.",
			source: "https://en.wikipedia.org/wiki/Earth#Internal_structure"
		},
		geology: {
			content: "The total surface area of Earth is about 510 million km2. The continental crust consists of lower density material such as the igneous rocks granite and andesite. Less common is basalt, a denser volcanic rock that is the primary constituent of the ocean floors.",
			source: "https://en.wikipedia.org/wiki/Earth#Surface"
		},
		rotation: "0.99 Days",
		revolution: "365.26 Days",
		radius: "6,371 KM",
		temperature: "16°c",
		images: {
			planet: "/planet-earth.svg",
			internal: "/planet-earth-internal.svg",
			geology: "/geology-earth.png"
		}
	},
	{
		name: "Mars",
		overview: {
			content: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the \"Red Planet\".",
			source: "https://en.wikipedia.org/wiki/Mars"
		},
		structure: {
			content: "Like Earth, Mars has differentiated into a dense metallic core overlaid by less dense materials. Scientists initially determined that the core is at least partially liquid. Current models of its interior imply a core consisting primarily of iron and nickel with about 16–17% sulfur.",
			source: "https://en.wikipedia.org/wiki/Mars#Internal_structure"
		},
		geology: {
			content: "Mars is a terrestrial planet whose surface consists of minerals containing silicon and oxygen, metals, and other elements that typically make up rock. The surface is primarily composed of tholeiitic basalt, although parts are more silica-rich than typical basalt.",
			source: "https://en.wikipedia.org/wiki/Mars#Surface_geology"
		},
		rotation: "1.03 Days",
		revolution: "1.88 Years",
		radius: "3,389.5 KM",
		temperature: "-28°c",
		images: {
			planet: "/planet-mars.svg",
			internal: "/planet-mars-internal.svg",
			geology: "/geology-mars.png"
		}
	},
	{
		name: "Jupiter",
		overview: {
			content: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass two and a half times that of all the other planets in the Solar System combined, but less than one-thousandth the mass of the Sun.",
			source: "https://en.wikipedia.org/wiki/Jupiter"
		},
		structure: {
			content: "When the Juno arrived in 2016, it found that Jupiter has a very diffuse core that mixes into its mantle. A possible cause is an impact from a planet of about ten Earth masses a few million years after Jupiter's formation, which would have disrupted an originally solid Jovian core.",
			source: "https://en.wikipedia.org/wiki/Jupiter#Internal_structure"
		},
		geology: {
			content: "The best known feature of Jupiter is the Great Red Spot, a persistent anticyclonic storm located 22° south of the equator. It is known to have existed since at least 1831, and possibly since 1665.",
			source: "https://en.wikipedia.org/wiki/Jupiter#Great_Red_Spot_and_other_vortices"
		},
		rotation: "9.93 Hours",
		revolution: "11.86 Years",
		radius: "69,911 KM",
		temperature: "-108°c",
		images: {
			planet: "/planet-jupiter.svg",
			internal: "/planet-jupiter-internal.svg",
			geology: "/geology-jupiter.png"
		}
	},
	{
		name: "Saturn",
		overview: {
			content: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth. It only has one-eighth the average density of Earth.",
			source: "https://en.wikipedia.org/wiki/Saturn"
		},
		structure: {
			content: "Despite consisting mostly of hydrogen and helium, most of Saturn's mass is not in the gas phase, because hydrogen becomes a non-ideal liquid when the density is above 0.01 g/cm3, which is reached at a radius containing 99.9% of Saturn's mass.",
			source: "https://en.wikipedia.org/wiki/Saturn#Internal_structure"
		},
		geology: {
			content: "The outer atmosphere of Saturn contains 96.3% molecular hydrogen and 3.25% helium by volume. The planet's most famous feature is its prominent ring system, which is composed mostly of ice particles with a smaller amount of rocky debris and dust.",
			source: "https://en.wikipedia.org/wiki/Saturn#Atmosphere"
		},
		rotation: "10.8 Hours",
		revolution: "29.46 Years",
		radius: "58,232 KM",
		temperature: "-138°c",
		images: {
			planet: "/planet-saturn.svg",
			internal: "/planet-saturn-internal.svg",
			geology: "/geology-saturn.png"
		}
	},
	{
		name: "Uranus",
		overview: {
			content: "Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus according to Greek mythology, was the great-grandfather of Ares. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.",
			source: "https://en.wikipedia.org/wiki/Uranus"
		},
		structure: {
			content: "The standard model of Uranus's structure is that it consists of three layers: a rocky (silicate/iron–nickel) core in the centre, an icy mantle in the middle and an outer gaseous hydrogen/helium envelope. The core is relatively small, with a mass of only 0.55 Earth masses.",
			source: "https://en.wikipedia.org/wiki/Uranus#Internal_structure"
		},
		geology: {
			content: "The composition of Uranus's atmosphere is different from its bulk, consisting mainly of molecular hydrogen and helium. The helium molar fraction, i.e. the number of helium atoms per molecule of gas, is 0.15±0.03 in the upper troposphere.",
			source: "https://en.wikipedia.org/wiki/Uranus#Atmosphere"
		},
		rotation: "17.2 Hours",
		revolution: "84 Years",
		radius: "25,362 KM",
		temperature: "-195°c",
		images: {
			planet: "/planet-uranus.svg",
			internal: "/planet-uranus-internal.svg",
			geology: "/geology-uranus.png"
		}
	},
	{
		name: "Neptune",
		overview: {
			content: "Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, more massive than its near-twin Uranus.",
			source: "https://en.wikipedia.org/wiki/Neptune"
		},
		structure: {
			content: "Neptune's internal structure resembles that of Uranus. Its atmosphere forms about 5% to 10% of its mass and extends perhaps 10% to 20% of the way towards the core. Increasing concentrations of methane, ammonia and water are found in the lower regions.",
			source: "https://en.wikipedia.org/wiki/Neptune#Internal_structure"
		},
		geology: {
			content: "Neptune's atmosphere is 80% hydrogen and 19% helium. A trace amount of methane is also present. Prominent absorption bands of methane exist at wavelengths above 600 nm, in the red and infrared portion of the spectrum.",
			source: "https://en.wikipedia.org/wiki/Neptune#Atmosphere"
		},
		rotation: "16.08 Hours",
		revolution: "164.79 Years",
		radius: "24,622 KM",
		temperature: "-201°c",
		images: {
			planet: "/planet-neptune.svg",
			internal: "/planet-neptune-internal.svg",
			geology: "/geology-neptune.png"
		}
	}
];

const _tmpl$$1 = ["<section", " class=\"lg:flex items-center mb-4 md:mb-6 lg:mb-20 mt-10 md:mt-20\"><div class=\"flex-1\">", "</div><div class=\"flex-1\"><div class=\"mx-auto lg:max-w-md\"><div class=\"md:flex items-center gap-4 lg:block\"><div class=\"flex-1\"><h1 class=\"uppercase\">", "</h1><p>", "</p><div class=\"flex gap-2 my-2\"><p class=\"opacity-50\">Source:</p><p class=\"opacity-50 inline-block\"><a", " class=\"font-bold underline flex gap-1\">Wikipedia<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"w-4 h-4 text-white\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244\"></path></svg></a></p></div></div><div class=\"flex-1 flex flex-col gap-4\"><button", "><span><h3 class=\"opacity-50\">01</h3></span><span class=\"uppercase text-white\"><h3>Overview</h3></span></button><button", "><span><h3 class=\"opacity-50\">02</h3></span><span class=\"uppercase text-white\"><h3>Internal Structure</h3></span></button><button", "><span><h3 class=\"opacity-50\">03</h3></span><span class=\"uppercase text-white\"><h3>Surface Geology</h3></span></button></div></div></div></div></section>"],
  _tmpl$2 = ["<div", " class=\"relative\"><img", " alt=\"planet-mercury\" class=\"max-h-96 lg:max-w-md mx-auto\"><div class=\"absolute bottom-0 inset-x-0 w-full\"><img", " class=\"max-h-28 mx-auto\"></div></div>"],
  _tmpl$3 = ["<img", " alt=\"planet-mercury\" class=\"max-h-96 lg:max-w-md mx-auto\">"];
const FactsCard = ({
  name,
  overview,
  structure,
  geology,
  images,
  btnColor
}) => {
  const [activeBtn, setActiveBtn] = createSignal("one");
  const [content, setContent] = createSignal(overview.content);
  const [source, setSource] = createSignal(overview.source);
  const [planetImg, setPlanetImg] = createSignal(images.planet);
  const activeBtnStyle = `flex justify-start items-center gap-8 pl-10 py-2 border border-grey/50 ${btnColor} hover:${btnColor}`;
  const btnStyle = "flex justify-start items-center gap-8 pl-10 py-2 border border-grey/50 hover:bg-dark-grey";
  return ssr(_tmpl$$1, ssrHydrationKey(), activeBtn() === "three" ? ssr(_tmpl$2, ssrHydrationKey(), ssrAttribute("src", escape(planetImg(), true), false), ssrAttribute("src", escape(images.geology, true), false)) : ssr(_tmpl$3, ssrHydrationKey() + ssrAttribute("src", escape(planetImg(), true), false)), escape(name), escape(content), ssrAttribute("href", escape(source(), true), false), ssrAttribute("class", activeBtn() === "one" ? escape(activeBtnStyle, true) : escape(btnStyle, true), false), ssrAttribute("class", activeBtn() === "two" ? escape(activeBtnStyle, true) : escape(btnStyle, true), false), ssrAttribute("class", activeBtn() === "three" ? escape(activeBtnStyle, true) : escape(btnStyle, true), false));
};

__astro_tag_component__(FactsCard, "@astrojs/solid-js");

const _tmpl$ = ["<section", " class=\"grid md:grid-cols-4 gap-2 md:gap-4\"><div class=\"w-full pl-5 pr-10 lg:pl-10 lg:pr-20 lg:py-4  border border-grey/50\"><h3 class=\"uppercase opacity-50 mb-3\">Rotation Time</h3><h2 class=\"uppercase\">", "</h2></div><div class=\" w-full pl-5 pr-10 lg:pl-10 lg:pr-20 lg:py-4 min-h-full border border-grey/50\"><h3 class=\"uppercase opacity-50 mb-3\">Revolution Time</h3><h2 class=\"uppercase\">", "</h2></div><div class=\"w-full pl-5 pr-10 lg:pl-10 lg:pr-20 lg:py-4 min-h-full border border-grey/50\"><h3 class=\"uppercase opacity-50 mb-3\">Radius</h3><h2 class=\"uppercase\">", "</h2></div><div class=\"w-full pl-5 pr-10 lg:pl-10 lg:pr-20 lg:py-4 min-h-full border border-grey/50\"><h3 class=\"uppercase opacity-50 mb-3\">Average temp.</h3><h2 class=\"uppercase\">", "</h2></div></section>"];
const FactsRow = ({
  rotation,
  revolution,
  radius,
  temperature
}) => {
  return ssr(_tmpl$, ssrHydrationKey(), escape(rotation), escape(revolution), escape(radius), escape(temperature));
};

__astro_tag_component__(FactsRow, "@astrojs/solid-js");

const $$Astro$7 = createAstro();
const $$Index = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Index;
  const mercury = data.find((x) => x.name === "Mercury");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mercury" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main class="lg:container mx-auto px-4">
    ${renderComponent($$result2, "FactsCard", FactsCard, { "client:load": true, "name": mercury.name, "overview": mercury.overview, "structure": mercury.structure, "geology": mercury.geology, "images": mercury.images, "btnColor": "bg-azure-blue", "client:component-hydration": "load", "client:component-path": "@components/FactsCard", "client:component-export": "default" })}
    ${renderComponent($$result2, "FactsRow", FactsRow, { "rotation": mercury.rotation, "revolution": mercury.revolution, "radius": mercury.radius, "temperature": mercury.temperature })}
  </main>` })}`;
}, "D:/Prosjekter/08.Challenges/planet-facts/src/pages/index.astro");

const $$file$7 = "D:/Prosjekter/08.Challenges/planet-facts/src/pages/index.astro";
const $$url$7 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$7,
  url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$6 = createAstro();
const $$Jupiter = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Jupiter;
  const jupiter = data.find((x) => x.name === "Jupiter");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Jupiter" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main class="lg:container mx-auto px-4">
    ${renderComponent($$result2, "FactsCard", FactsCard, { "client:load": true, "name": jupiter.name, "overview": jupiter.overview, "structure": jupiter.structure, "geology": jupiter.geology, "images": jupiter.images, "btnColor": "bg-red", "client:component-hydration": "load", "client:component-path": "@components/FactsCard", "client:component-export": "default" })}
    ${renderComponent($$result2, "FactsRow", FactsRow, { "rotation": jupiter.rotation, "revolution": jupiter.revolution, "radius": jupiter.radius, "temperature": jupiter.temperature })}
  </main>` })}`;
}, "D:/Prosjekter/08.Challenges/planet-facts/src/pages/jupiter.astro");

const $$file$6 = "D:/Prosjekter/08.Challenges/planet-facts/src/pages/jupiter.astro";
const $$url$6 = "/jupiter";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Jupiter,
  file: $$file$6,
  url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$5 = createAstro();
const $$Neptune = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Neptune;
  const neptune = data.find((x) => x.name === "Neptune");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Neptune" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main class="lg:container mx-auto px-4">
    ${renderComponent($$result2, "FactsCard", FactsCard, { "client:load": true, "name": neptune.name, "overview": neptune.overview, "structure": neptune.structure, "geology": neptune.geology, "images": neptune.images, "btnColor": "bg-blue", "client:component-hydration": "load", "client:component-path": "@components/FactsCard", "client:component-export": "default" })}
    ${renderComponent($$result2, "FactsRow", FactsRow, { "rotation": neptune.rotation, "revolution": neptune.revolution, "radius": neptune.radius, "temperature": neptune.temperature })}
  </main>` })}`;
}, "D:/Prosjekter/08.Challenges/planet-facts/src/pages/neptune.astro");

const $$file$5 = "D:/Prosjekter/08.Challenges/planet-facts/src/pages/neptune.astro";
const $$url$5 = "/neptune";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Neptune,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro();
const $$Saturn = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Saturn;
  const saturn = data.find((x) => x.name === "Saturn");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Saturn" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main class="lg:container mx-auto px-4">
    ${renderComponent($$result2, "FactsCard", FactsCard, { "client:load": true, "name": saturn.name, "overview": saturn.overview, "structure": saturn.structure, "geology": saturn.geology, "images": saturn.images, "btnColor": "bg-orange", "client:component-hydration": "load", "client:component-path": "@components/FactsCard", "client:component-export": "default" })}
    ${renderComponent($$result2, "FactsRow", FactsRow, { "rotation": saturn.rotation, "revolution": saturn.revolution, "radius": saturn.radius, "temperature": saturn.temperature })}
  </main>` })}`;
}, "D:/Prosjekter/08.Challenges/planet-facts/src/pages/saturn.astro");

const $$file$4 = "D:/Prosjekter/08.Challenges/planet-facts/src/pages/saturn.astro";
const $$url$4 = "/saturn";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Saturn,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro();
const $$Uranus = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Uranus;
  const uranus = data.find((x) => x.name === "Uranus");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Uranus" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main class="lg:container mx-auto px-4">
    ${renderComponent($$result2, "FactsCard", FactsCard, { "client:load": true, "name": uranus.name, "overview": uranus.overview, "structure": uranus.structure, "geology": uranus.geology, "images": uranus.images, "btnColor": "bg-teal", "client:component-hydration": "load", "client:component-path": "@components/FactsCard", "client:component-export": "default" })}
    ${renderComponent($$result2, "FactsRow", FactsRow, { "rotation": uranus.rotation, "revolution": uranus.revolution, "radius": uranus.radius, "temperature": uranus.temperature })}
  </main>` })}`;
}, "D:/Prosjekter/08.Challenges/planet-facts/src/pages/uranus.astro");

const $$file$3 = "D:/Prosjekter/08.Challenges/planet-facts/src/pages/uranus.astro";
const $$url$3 = "/uranus";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Uranus,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro();
const $$Earth = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Earth;
  const earth = data.find((x) => x.name === "Earth");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Earth" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main class="lg:container mx-auto px-4">
    ${renderComponent($$result2, "FactsCard", FactsCard, { "client:load": true, "name": earth.name, "overview": earth.overview, "structure": earth.structure, "geology": earth.geology, "images": earth.images, "btnColor": "bg-indigo", "client:component-hydration": "load", "client:component-path": "@components/FactsCard", "client:component-export": "default" })}
    ${renderComponent($$result2, "FactsRow", FactsRow, { "rotation": earth.rotation, "revolution": earth.revolution, "radius": earth.radius, "temperature": earth.temperature })}
  </main>` })}`;
}, "D:/Prosjekter/08.Challenges/planet-facts/src/pages/earth.astro");

const $$file$2 = "D:/Prosjekter/08.Challenges/planet-facts/src/pages/earth.astro";
const $$url$2 = "/earth";

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Earth,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$Venus = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Venus;
  const venus = data.find((x) => x.name === "Venus");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Venus" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main class="lg:container mx-auto px-4">
    ${renderComponent($$result2, "FactsCard", FactsCard, { "client:load": true, "name": venus.name, "overview": venus.overview, "structure": venus.structure, "geology": venus.geology, "images": venus.images, "btnColor": "bg-light-orange", "client:component-hydration": "load", "client:component-path": "@components/FactsCard", "client:component-export": "default" })}
    ${renderComponent($$result2, "FactsRow", FactsRow, { "rotation": venus.rotation, "revolution": venus.revolution, "radius": venus.radius, "temperature": venus.temperature })}
  </main>` })}`;
}, "D:/Prosjekter/08.Challenges/planet-facts/src/pages/venus.astro");

const $$file$1 = "D:/Prosjekter/08.Challenges/planet-facts/src/pages/venus.astro";
const $$url$1 = "/venus";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Venus,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Mars = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Mars;
  const mars = data.find((x) => x.name === "Mars");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mars" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main class="lg:container mx-auto px-4">
    ${renderComponent($$result2, "FactsCard", FactsCard, { "client:load": true, "name": mars.name, "overview": mars.overview, "structure": mars.structure, "geology": mars.geology, "images": mars.images, "btnColor": "bg-brown-red", "client:component-hydration": "load", "client:component-path": "@components/FactsCard", "client:component-export": "default" })}
    ${renderComponent($$result2, "FactsRow", FactsRow, { "rotation": mars.rotation, "revolution": mars.revolution, "radius": mars.radius, "temperature": mars.temperature })}
  </main>` })}`;
}, "D:/Prosjekter/08.Challenges/planet-facts/src/pages/mars.astro");

const $$file = "D:/Prosjekter/08.Challenges/planet-facts/src/pages/mars.astro";
const $$url = "/mars";

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Mars,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _, _page1 as a, _page2 as b, createComponent as c, _page3 as d, _page4 as e, _page5 as f, _page6 as g, _page7 as h, renderToString as r, ssr as s };
