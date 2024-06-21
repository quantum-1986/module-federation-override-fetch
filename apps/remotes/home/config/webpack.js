const { resolve } = require("node:path");
const { ModuleFederationPlugin } = require("@module-federation/enhanced");

const pkgDependencies = require("../package.json").dependencies;

const DEV_PORT = 3001;

const SHARED_DEPENDENCIES = ["react", "react-dom", "react-dom/client", "react-router-dom"];

const sharedModuleFederationConfig = {
	name: "home",
	filename: "remoteEntry.js",
	exposes: {
		"./index": "./src/index.ts",
	},
	shared: SHARED_DEPENDENCIES.reduce((shared, moduleName) => {
		shared[moduleName] = {
			eager: false,
			singleton: true,
			requiredVersion: pkgDependencies[moduleName],
			strictVersion: false,
		};

		return shared;
	}, {}),
};

/**
 * @type {import('webpack').Configuration}
 */
const sharedConfig = {
	mode: "production",
	entry: "./src/index.ts",
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
	name: "client",
	target: "web",
	output: {
		path: resolve(__dirname, "../dist/remote/client"),
		filename: "[name].js",
		chunkFilename: "[name].js",
		publicPath: `http://localhost:${DEV_PORT}/client/`,
	},
	plugins: [
		new ModuleFederationPlugin({
			...sharedModuleFederationConfig,
		}),
	],
};

/**
 * @type {import('webpack').Configuration}
 */
const serverConfig = {
	...sharedConfig,
	name: "server",
	target: "async-node",
	output: {
		path: resolve(__dirname, "../dist/remote/server"),
		filename: "[name].js",
		libraryTarget: "commonjs-module",
	},
	plugins: [
		new ModuleFederationPlugin({
			...sharedModuleFederationConfig,
			runtimePlugins: [require.resolve("@module-federation/node/runtimePlugin")],
			remoteType: "script",
			isServer: true,
			library: { type: "commonjs-module" },
		}),
	],
};

/**
 * @type {import('webpack').Configuration}
 */
const staticServerConfig = {
	...sharedConfig,
	entry: "./server/index.ts",
	name: "server",
	target: "async-node",
	output: {
		path: resolve(__dirname, "../dist/server"),
		filename: "[name].js",
		libraryTarget: "commonjs-module",
	},
};

module.exports = [clientConfig, serverConfig, staticServerConfig];
