const path = require("path");

module.exports = {
	entry: "./src/app.js",
	output: {
		filename: "output.js",
		path: path.resolve(__dirname, "dist"),
  }	
}
