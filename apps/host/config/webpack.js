const { resolve } = require("node:path");
const { UniversalFederationPlugin } = require("@module-federation/node");

const pkgDependencies = require("../package.json").dependencies;

const DEV_PORT = 3000;

const SHARED_DEPENDENCIES = ["react", "react-dom", "react-dom/client", "react-router-dom"];

const sharedModuleFederationConfig = {
	name: "shell",
	shared: SHARED_DEPENDENCIES.reduce((shared, name) => {
		shared[name] = {
			eager: true,
			singleton: true,
			requiredVersion: pkgDependencies[name],
		};

		return shared;
	}, {}),
};

/**
 * @type {import('webpack').Configuration}
 */
const sharedConfig = {
	mode: "production",
	devtool: "source-map",
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
			},
		],
	},
};

/**
 * @type {import('webpack').Configuration}
 */
const clientConfig = {
	...sharedConfig,
	entry: "./client/index.ts",
	name: "client",
	target: "web",
	output: {
		path: resolve(__dirname, "../dist/client"),
		filename: "[name].js",
		chunkFilename: "[name].js",
		publicPath: `http://localhost:${DEV_PORT}/static/`,
	},
	plugins: [
		new UniversalFederationPlugin({
			...sharedModuleFederationConfig,
			remotes: {
				home: "home@http://localhost:3001/client/remoteEntry.js",
				list: "list@http://localhost:3002/client/remoteEntry.js",
			},
		}),
	],
};

/**
 * @type {import('webpack').Configuration}
 */
const serverConfig = {
	...sharedConfig,
	entry: "./server/index.ts",
	name: "server",
	target: false,
	output: {
		path: resolve(__dirname, "../dist/server"),
		filename: "[name].js",
		libraryTarget: "commonjs-module",
	},
	plugins: [
		new UniversalFederationPlugin({
			...sharedModuleFederationConfig,
			isServer: true,
			remoteType: "script",
			library: { type: "commonjs-module" },
			remotes: {
				home: "home@http://localhost:3001/server/remoteEntry.js",
				list: "list@http://localhost:3002/server/remoteEntry.js",
			},
		}),
	],
};

module.exports = [clientConfig, serverConfig];