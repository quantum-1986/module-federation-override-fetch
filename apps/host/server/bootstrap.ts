import type { RouteHandler } from "fastify";
import Fastify from "fastify";
import staticPlugin from "@fastify/static";
import { join } from "node:path";

import packageInfo from "../package.json";

/**
 * The X-Application is by remote
 * https://github.com/module-federation/universe/tree/main/packages/node#overrideing-default-http-chunk-fetch
 */
globalThis.webpackChunkLoad = async (url: string) => {
	console.log(`webpackChunkLoad fetch url: ${url}`);

	const res = await fetch(url, {
		headers: {
			"X-Application": `host/${packageInfo.version}`,
		},
	});

	return res;
};

const fastify = Fastify({
	logger: true,
});

void fastify.register(staticPlugin, {
	prefix: "/static/",
	root: join(process.cwd(), "./dist/client"),
});

const render: RouteHandler = async (_, reply) => {
	const asyncBoundary = await import("./render");
	// @ts-ignore
	await asyncBoundary.render(_, reply);
};

fastify.get("*", render);

fastify.listen({ port: 3000 }, error => {
	if (error) {
		fastify.log.error(error);
		process.exit(1);
	}
});
