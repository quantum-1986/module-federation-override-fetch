import { Link } from "react-router-dom";
export const App = () => {
	return (
		<section>
			<h2>@remote/list</h2>
			<div>
				Hello from List remote 👋
				<Link to="/">Go to Home 👋</Link>
			</div>
			<img alt="random picture" height={300} src="https://picsum.photos/id/1062/200/300" />
		</section>
	);
};
