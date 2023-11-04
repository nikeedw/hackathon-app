import { Link } from "react-router-dom";

const Post = ({ post }) => {
	return (
		<article className="post">
			<div>
				<div className='content'>
					<h2>{post.title}</h2>
					<p style={{userSelect: 'none'}} className="postDate">{post.datetime}</p>
				</div>
				<p className="postBody">{
					(post.body).length <= 30
						? post.body
						: `${(post.body).slice(0, 30)}...`
				}</p>
			</div>
			<div className='post_btns'>
				<Link className='customBtn' to={`/post/${post.id}`}>Open</Link>
			</div>
		</article>
	)
}

export default Post;