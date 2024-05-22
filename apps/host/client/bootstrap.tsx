import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Shell } from "../src";

hydrateRoot(
	window.document.getElementById("root") as HTMLElement,
	<StrictMode>
		<BrowserRouter>
			<Shell />
		</BrowserRouter>
	</StrictMode>,
);
