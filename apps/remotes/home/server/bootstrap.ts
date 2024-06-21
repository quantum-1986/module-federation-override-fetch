import Fastify from "fastify";
import staticPlugin from "@fastify/static";
import { join } from "node:path";

const fastify = Fastify({
	logger: true,
});

// Middleware to check for the specific header
fastify.addHook("onRequest", (request, reply, done) => {
	const appHeader = request.headers["x-application"];
	console.log(`request.url: ${request.url} - request.headers["x-application"]: ${appHeader}`);
	if (appHeader?.includes("host/")) {
		console.log("🚀 It works!!! Many thanks @ScriptedAlchemy 🎉");
		done();
	} else {
		reply.status(403).send({ error: "Invalid X-Application header" });
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
