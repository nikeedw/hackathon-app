import { Link } from 'react-router-dom';

const PathErrorPage = () => {
	return (
		<main className='PathError'>
			<h2 style={{color: "red"}}>Page Not Found</h2>
			<p>Well, that's disappointing.</p>
			<p>
				<Link to='/'>Visit Our Homepage</Link>
			</p>
		</main>
	)
}

export default PathErrorPage;