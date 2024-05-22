import { Link } from "react-router-dom";

export const App = () => {
	return (
		<div>
			<h2>@remote/home</h2>
			<div>
				Hello from Homepage 👋
				<Link to="/list">Go to list 👋</Link>
			</div>
		</div>
	);
};
