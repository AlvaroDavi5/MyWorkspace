if (!self.define) {
	const e = (e) => {
		"require" !== e && (e += ".js");
		let s = Promise.resolve();
		return (
		  n[e] ||
			(s = new Promise(async (s) => {
			  if ("document" in self) {
				const n = document.createElement("script");
				(n.src = e), document.head.appendChild(n), (n.onload = s);
			  } else importScripts(e), s();
			})),
		  s.then(() => {
			if (!n[e]) throw new Error(`Module ${e} didn’t register its module`);
			return n[e];
		  })
		);
	  },
	  s = (s, n) => {
		Promise.all(s.map(e)).then((e) => n(1 === e.length ? e[0] : e));
	  },
	  n = { require: Promise.resolve(s) };
	self.define = (s, a, t) => {
	  n[s] ||
		(n[s] = Promise.resolve().then(() => {
		  let n = {};
		  const r = { uri: location.origin + s.slice(1) };
		  return Promise.all(
			a.map((s) => {
			  switch (s) {
				case "exports":
				  return n;
				case "module":
				  return r;
				default:
				  return e(s);
			  }
			})
		  ).then((e) => {
			const s = t(...e);
			return n.default || (n.default = s), n;
		  });
		}));
	};
  }
  define("./sw.js", ["./workbox-ea903bce"], function (e) {
	"use strict";
	importScripts(),
	  self.skipWaiting(),
	  e.clientsClaim(),
	  e.precacheAndRoute(
		[
		  {
			url: "/_next/static/chunks/153-be482809150a0b7a7411.js",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/chunks/70b165ca-09f68c856910d91af974.js",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/chunks/framework-64eb7138163e04c228e4.js",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/chunks/main-b449f89ec2fd6b0ffe72.js",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/chunks/pages/_app-d7472ce43a9b21c00a30.js",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/chunks/pages/_error-9faf4177fb4e528b4124.js",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/chunks/pages/components/_document-dcc68c3af70147d50fe8.js",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/chunks/pages/components/navbar-fc65e0a1b51b5961bd7a.js",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/chunks/pages/home-a89584df3c722559ff75.js",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/chunks/pages/index-402eb936074bfa7b0872.js",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/chunks/webpack-20d43e08bea62467b090.js",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/css/49686175c034d3149018.css",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/css/50f3d6cc6960cb1538b0.css",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/css/6a82b31266743f6587c4.css",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/css/e588eb917941e473cc3f.css",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/image/pages/assets/background-universe.04d407247442704496dc06b786d3918f.jpg",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/images/nasa-logo-78fcba4d9325e8ac5a2e15699d035ee0.svg",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/xfv2ZPK6aPe3oq1YEIyzS/_buildManifest.js",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  {
			url: "/_next/static/xfv2ZPK6aPe3oq1YEIyzS/_ssgManifest.js",
			revision: "xfv2ZPK6aPe3oq1YEIyzS",
		  },
		  { url: "/favicon.ico", revision: "d759ddad450d68c35e978fb98bd01158" },
		  { url: "/manifest.json", revision: "ab486f1294216ae2a1585426cdbf9a02" },
		],
		{ ignoreURLParametersMatching: [] }
	  ),
	  e.cleanupOutdatedCaches(),
	  e.registerRoute(
		"/",
		new e.NetworkFirst({
		  cacheName: "start-url",
		  plugins: [
			{
			  cacheWillUpdate: async ({
				request: e,
				response: s,
				event: n,
				state: a,
			  }) =>
				s && "opaqueredirect" === s.type
				  ? new Response(s.body, {
					  status: 200,
					  statusText: "OK",
					  headers: s.headers,
					})
				  : s,
			},
		  ],
		}),
		"GET"
	  ),
	  e.registerRoute(
		/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
		new e.CacheFirst({
		  cacheName: "google-fonts-webfonts",
		  plugins: [
			new e.ExpirationPlugin({
			  maxEntries: 4,
			  maxAgeSeconds: 31536e3,
			  purgeOnQuotaError: !0,
			}),
		  ],
		}),
		"GET"
	  ),
	  e.registerRoute(
		/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
		new e.StaleWhileRevalidate({
		  cacheName: "google-fonts-stylesheets",
		  plugins: [
			new e.ExpirationPlugin({
			  maxEntries: 4,
			  maxAgeSeconds: 604800,
			  purgeOnQuotaError: !0,
			}),
		  ],
		}),
		"GET"
	  ),
	  e.registerRoute(
		/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
		new e.StaleWhileRevalidate({
		  cacheName: "static-font-assets",
		  plugins: [
			new e.ExpirationPlugin({
			  maxEntries: 4,
			  maxAgeSeconds: 604800,
			  purgeOnQuotaError: !0,
			}),
		  ],
		}),
		"GET"
	  ),
	  e.registerRoute(
		/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
		new e.StaleWhileRevalidate({
		  cacheName: "static-image-assets",
		  plugins: [
			new e.ExpirationPlugin({
			  maxEntries: 64,
			  maxAgeSeconds: 86400,
			  purgeOnQuotaError: !0,
			}),
		  ],
		}),
		"GET"
	  ),
	  e.registerRoute(
		/\/_next\/image\?url=.+$/i,
		new e.StaleWhileRevalidate({
		  cacheName: "next-image",
		  plugins: [
			new e.ExpirationPlugin({
			  maxEntries: 64,
			  maxAgeSeconds: 86400,
			  purgeOnQuotaError: !0,
			}),
		  ],
		}),
		"GET"
	  ),
	  e.registerRoute(
		/\.(?:mp3|mp4)$/i,
		new e.StaleWhileRevalidate({
		  cacheName: "static-media-assets",
		  plugins: [
			new e.ExpirationPlugin({
			  maxEntries: 32,
			  maxAgeSeconds: 86400,
			  purgeOnQuotaError: !0,
			}),
		  ],
		}),
		"GET"
	  ),
	  e.registerRoute(
		/\.(?:js)$/i,
		new e.StaleWhileRevalidate({
		  cacheName: "static-js-assets",
		  plugins: [
			new e.ExpirationPlugin({
			  maxEntries: 32,
			  maxAgeSeconds: 86400,
			  purgeOnQuotaError: !0,
			}),
		  ],
		}),
		"GET"
	  ),
	  e.registerRoute(
		/\.(?:css|less)$/i,
		new e.StaleWhileRevalidate({
		  cacheName: "static-style-assets",
		  plugins: [
			new e.ExpirationPlugin({
			  maxEntries: 32,
			  maxAgeSeconds: 86400,
			  purgeOnQuotaError: !0,
			}),
		  ],
		}),
		"GET"
	  ),
	  e.registerRoute(
		/\/_next\/data\/.+\/.+\.json$/i,
		new e.StaleWhileRevalidate({
		  cacheName: "next-data",
		  plugins: [
			new e.ExpirationPlugin({
			  maxEntries: 32,
			  maxAgeSeconds: 86400,
			  purgeOnQuotaError: !0,
			}),
		  ],
		}),
		"GET"
	  ),
	  e.registerRoute(
		/\.(?:json|xml|csv)$/i,
		new e.NetworkFirst({
		  cacheName: "static-data-assets",
		  plugins: [
			new e.ExpirationPlugin({
			  maxEntries: 32,
			  maxAgeSeconds: 86400,
			  purgeOnQuotaError: !0,
			}),
		  ],
		}),
		"GET"
	  ),
	  e.registerRoute(
		({ url: e }) => {
		  if (!(self.origin === e.origin)) return !1;
		  const s = e.pathname;
		  return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
		},
		new e.NetworkFirst({
		  cacheName: "apis",
		  networkTimeoutSeconds: 10,
		  plugins: [
			new e.ExpirationPlugin({
			  maxEntries: 16,
			  maxAgeSeconds: 86400,
			  purgeOnQuotaError: !0,
			}),
		  ],
		}),
		"GET"
	  ),
	  e.registerRoute(
		({ url: e }) => {
		  if (!(self.origin === e.origin)) return !1;
		  return !e.pathname.startsWith("/api/");
		},
		new e.NetworkFirst({
		  cacheName: "others",
		  networkTimeoutSeconds: 10,
		  plugins: [
			new e.ExpirationPlugin({
			  maxEntries: 32,
			  maxAgeSeconds: 86400,
			  purgeOnQuotaError: !0,
			}),
		  ],
		}),
		"GET"
	  ),
	  e.registerRoute(
		({ url: e }) => !(self.origin === e.origin),
		new e.NetworkFirst({
		  cacheName: "cross-origin",
		  networkTimeoutSeconds: 10,
		  plugins: [
			new e.ExpirationPlugin({
			  maxEntries: 32,
			  maxAgeSeconds: 3600,
			  purgeOnQuotaError: !0,
			}),
		  ],
		}),
		"GET"
	  );
  });
  