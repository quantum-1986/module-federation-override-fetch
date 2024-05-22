import { Route, Routes } from "react-router-dom";

// @ts-ignore
import { App as Home } from "home/index";
// @ts-ignore
import { App as List } from "list/index";

export const Shell = () => {
	return (
		<section>
			<h1>shell</h1>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/list" element={<List />} />
			</Routes>
		</section>
	);
};
