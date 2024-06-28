import packageInfo from "../package.json";

/**
 * The X-Application is required by remote
 * https://module-federation.io/configure/runtimeplugins.html
 */
const customFetch = async url => {
	console.log(`webpackChunkLoad fetch url: ${url}`);

	const res = await fetch(url, {
		headers: {
			"X-Application": `host/${packageInfo.version}`,
		},
	});

	return res;
};

export default () => {
	return {
		name: "custom-plugin-build",
		beforeInit(args) {
			console.log("[build time inject] beforeInit: ", args);
			return args;
		},
		beforeLoadShare(args) {
			console.log("[build time inject] beforeLoadShare: ", args);
			return args;
		},
		fetch(url, init) {
			return customFetch(url, init);
		},
	};
};
