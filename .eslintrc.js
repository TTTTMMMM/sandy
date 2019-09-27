module.exports = {
   env: {
      browser: true,
      es6: true,
   },
   extends: ["google"],
   globals: {
      Atomics: "readonly",
      SharedArrayBuffer: "readonly",
   },
   parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
   },
   rules: {
      indent: ["error", 3],
      "require-jsdoc": 0,
      "max-len": ["warn", { ignoreComments: true, ignoreUrls: true }],
   },
};
