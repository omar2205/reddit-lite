/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
//    src: '/dist'
  },
  plugins: [
    ['@snowpack/plugin-webpack', {
      sourceMap: false,
      out: '/dist'
    }]
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    open: 'none'
  },
  buildOptions: {
    /* ... */
  },
};
