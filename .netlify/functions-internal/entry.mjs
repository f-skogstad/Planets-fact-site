import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { r as renderToString, s as ssr, c as createComponent, _ as _page0, a as _page1, b as _page2, d as _page3, e as _page4, f as _page5, g as _page6, h as _page7 } from './chunks/pages/all.76baf4bb.mjs';
import { s as server_default$1, g as deserializeManifest } from './chunks/astro.11b9610d.mjs';
import 'mime';
import 'cookie';
import 'html-escaper';
import 'kleur/colors';
import 'slash';
/* empty css                                 */import 'path-to-regexp';
import 'string-width';

const contexts = /* @__PURE__ */ new WeakMap();
function getContext(result) {
  if (contexts.has(result)) {
    return contexts.get(result);
  }
  let ctx = {
    c: 0,
    get id() {
      return "s" + this.c.toString();
    }
  };
  contexts.set(result, ctx);
  return ctx;
}
function incrementId(ctx) {
  let id = ctx.id;
  ctx.c++;
  return id;
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
function check(Component, props, children) {
  if (typeof Component !== "function")
    return false;
  const { html } = renderToStaticMarkup.call(this, Component, props, children);
  return typeof html === "string";
}
function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
  const renderId = (metadata == null ? void 0 : metadata.hydrate) ? incrementId(getContext(this.result)) : "";
  const html = renderToString(
    () => {
      const slots = {};
      for (const [key, value] of Object.entries(slotted)) {
        const name = slotName(key);
        slots[name] = ssr(`<astro-slot name="${name}">${value}</astro-slot>`);
      }
      const newProps = {
        ...props,
        ...slots,
        children: children != null ? ssr(`<astro-slot>${children}</astro-slot>`) : children
      };
      return createComponent(Component, newProps);
    },
    {
      renderId
    }
  );
  return {
    attrs: {
      "data-solid-render-id": renderId
    },
    html
  };
}
var server_default = {
  check,
  renderToStaticMarkup
};

const pageMap = new Map([["src/pages/index.astro", _page0],["src/pages/jupiter.astro", _page1],["src/pages/neptune.astro", _page2],["src/pages/saturn.astro", _page3],["src/pages/uranus.astro", _page4],["src/pages/earth.astro", _page5],["src/pages/venus.astro", _page6],["src/pages/mars.astro", _page7],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default$1 }),Object.assign({"name":"@astrojs/solid-js","clientEntrypoint":"@astrojs/solid-js/client.js","serverEntrypoint":"@astrojs/solid-js/server.js","jsxImportSource":"solid-js"}, { ssr: server_default }),];

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":["_astro/earth.16d5b530.css"],"scripts":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["_astro/earth.16d5b530.css"],"scripts":[],"routeData":{"route":"/jupiter","type":"page","pattern":"^\\/jupiter\\/?$","segments":[[{"content":"jupiter","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/jupiter.astro","pathname":"/jupiter","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["_astro/earth.16d5b530.css"],"scripts":[],"routeData":{"route":"/neptune","type":"page","pattern":"^\\/neptune\\/?$","segments":[[{"content":"neptune","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/neptune.astro","pathname":"/neptune","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["_astro/earth.16d5b530.css"],"scripts":[],"routeData":{"route":"/saturn","type":"page","pattern":"^\\/saturn\\/?$","segments":[[{"content":"saturn","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/saturn.astro","pathname":"/saturn","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["_astro/earth.16d5b530.css"],"scripts":[],"routeData":{"route":"/uranus","type":"page","pattern":"^\\/uranus\\/?$","segments":[[{"content":"uranus","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/uranus.astro","pathname":"/uranus","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["_astro/earth.16d5b530.css"],"scripts":[],"routeData":{"route":"/earth","type":"page","pattern":"^\\/earth\\/?$","segments":[[{"content":"earth","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/earth.astro","pathname":"/earth","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["_astro/earth.16d5b530.css"],"scripts":[],"routeData":{"route":"/venus","type":"page","pattern":"^\\/venus\\/?$","segments":[[{"content":"venus","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/venus.astro","pathname":"/venus","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["_astro/earth.16d5b530.css"],"scripts":[],"routeData":{"route":"/mars","type":"page","pattern":"^\\/mars\\/?$","segments":[[{"content":"mars","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/mars.astro","pathname":"/mars","_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"gfm":true,"smartypants":true,"contentDir":"file:///D:/Prosjekter/08.Challenges/planet-facts/src/content/"},"pageMap":null,"propagation":[["D:/Prosjekter/08.Challenges/planet-facts/src/components/Navbar.astro","in-tree"],["D:/Prosjekter/08.Challenges/planet-facts/src/layouts/Layout.astro","in-tree"],["D:/Prosjekter/08.Challenges/planet-facts/src/pages/index.astro","in-tree"],["D:/Prosjekter/08.Challenges/planet-facts/src/pages/jupiter.astro","in-tree"],["D:/Prosjekter/08.Challenges/planet-facts/src/pages/neptune.astro","in-tree"],["D:/Prosjekter/08.Challenges/planet-facts/src/pages/saturn.astro","in-tree"],["D:/Prosjekter/08.Challenges/planet-facts/src/pages/uranus.astro","in-tree"],["D:/Prosjekter/08.Challenges/planet-facts/src/pages/earth.astro","in-tree"],["D:/Prosjekter/08.Challenges/planet-facts/src/pages/venus.astro","in-tree"],["D:/Prosjekter/08.Challenges/planet-facts/src/pages/mars.astro","in-tree"]],"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"_@astrojs-ssr-virtual-entry.mjs","@astrojs/solid-js/client.js":"_astro/client.a6269a06.js","@components/FactsCard":"_astro/FactsCard.6a947dd8.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/earth.16d5b530.css","/background-stars.svg","/favicon.png","/geology-earth.png","/geology-jupiter.png","/geology-mars.png","/geology-mercury.png","/geology-neptune.png","/geology-saturn.png","/geology-uranus.png","/geology-venus.png","/icon-chevron.svg","/icon-hamburger.svg","/icon-source.svg","/planet-earth-internal.svg","/planet-earth.svg","/planet-jupiter-internal.svg","/planet-jupiter.svg","/planet-mars-internal.svg","/planet-mars.svg","/planet-mercury-internal.svg","/planet-mercury.svg","/planet-neptune-internal.svg","/planet-neptune.svg","/planet-saturn-internal.svg","/planet-saturn.svg","/planet-uranus-internal.svg","/planet-uranus.svg","/planet-venus-internal.svg","/planet-venus.svg","/_astro/client.a6269a06.js","/_astro/FactsCard.6a947dd8.js","/_astro/web.845164c3.js"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {};
const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap, renderers };
