import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import type { FastifyReply, FastifyRequest } from "fastify";

import { Shell } from "../src";

export const render = async (req: FastifyRequest, reply: FastifyReply) => {
	const element = (
		<StaticRouter location={req.url}>
			<Shell />
		</StaticRouter>
	);

	const html = renderToString(element);

	await reply.type("text/html").send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, width=device-width" />
</head>
<body>
    <div id="root">${html}</div>
    <script async data-chunk="main" src="http://localhost:3000/static/main.js"></script>
</body>
</html>`);
};
