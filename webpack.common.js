const path = require("path");

module.exports = {
  entry: "./src/app.ts",
  output: {
    path: path.resolve(__dirname, "dist"), // absolute path
    filename: "bundle.js"
  },
  
  module: { // every module in the project should follow the following rules
    rules: [
      {
        test: /\.ts$/, // apply the rule to that module or not 
        use: "ts-loader", // the loader that would handle the module
        exclude: /node_modules/
      }
    ]
  },
  resolve: { // by default webpack consider the modules extension is "js" so if you have anther type
    // of module => you should specify here ..... 
    extensions: [".ts", ".js"]
  },
  target: ["web", 'es6'], // to define the target
  plugins: [
    // should have instances ot the plugins 
    // the plugin operate over the bundle and add more functionality to it
  ]
}


// the configuration in ESmodule 
// import { resolve as _resolve } from "path";

// export const entry = "./src/app.ts";
// export const output = {
//   path: _resolve(__dirname, "dist"),
//   filename: "bundle.js"
// };
// export const devtool = "inline-source-map";
// export const mode = "production";
// export const module = {
//   rules: [
//     {
//       test: /\.ts$/,
//       use: "ts-loader",
//       exclude: /node_modules/
//     }
//   ]
// };
// export const resolve = {
//   // of module => you should specify here ..... 
//   extensions: [".ts", ".js"]
// };
// export const target = ["web", 'es6'];