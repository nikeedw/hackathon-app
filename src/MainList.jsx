import Post from './Post';

const MainList = ({ posts }) => {
	return (
		<>
			{posts.map(post => (
				<Post key={post.id} post={post} />
			))}
		</>
	)
}

export default MainList;