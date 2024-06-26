import type { RouteHandler } from "fastify";
import Fastify from "fastify";
import staticPlugin from "@fastify/static";
import { join } from "node:path";

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
