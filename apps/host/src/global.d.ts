declare namespace globalThis {
	var webpackChunkLoad: (url: string) => Promise<Response>;
}
