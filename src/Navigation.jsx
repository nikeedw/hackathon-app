import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<nav className="Navigation">
			<div className="logo">
				<span className="mainlogo">
					PEACE&#183;
					</span>
					BUILDING
				</div>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/post">Post</Link></li>
				<li><Link to="/donate">Donate</Link></li>
			</ul>
		</nav>
	)
}

export default Navigation;