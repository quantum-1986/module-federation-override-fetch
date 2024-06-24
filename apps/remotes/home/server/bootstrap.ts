import Fastify from "fastify";
import staticPlugin from "@fastify/static";
import cors from "@fastify/cors";
import { join } from "node:path";

const fastify = Fastify({
	logger: true,
});

await fastify.register(cors, {
	origin: "*",
});

// Middleware to check for the specific header
fastify.addHook("onRequest", (request, reply, done) => {
	const appHeader = request.headers["x-application"];
	const userAgent = request.headers["user-agent"];

	if (appHeader?.includes("host/") || userAgent) {
		console.log("🚀 It works!!! Many thanks @ScriptedAlchemy 🎉");
		done();
	} else {
		reply.status(403).send({ error: "Invalid X-Application header or no User-Agent" });
	}
});

void fastify.register(staticPlugin, {
	root: join(process.cwd(), "./dist/remote"),
});

fastify.listen({ port: 3001 }, error => {
	if (error) {
		fastify.log.error(error);
		process.exit(1);
	}
});
