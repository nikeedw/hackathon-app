import { useParams, Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';
import Modal from './UI/modal/Modal'; // Импортируйте компонент Modal

const PostPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);
	const [modal, setModal] = useState(false);
  const post = getPostById(id);

  const handleDelete = (id) => {
    deletePost(id);
    history.push('/');
  }

  const viewImages = () => {
    if (post.imageUrl) {
      // Устанавливаем modal в true, чтобы отобразить модальное окно
      setModal(true);
    }
  }

  return (
    <main className="PostPage">
      <article className="post">
        {post &&
          <>
            <div className="content">
              <h2>{post.title}</h2>
              <p className="postDate">{post.datetime}</p>
              <p className="postBody">{post.body}</p>
            </div>
            <div className="post_btns">
              <Link to={`/edit/${post.id}`} className="customBtn">Edit Post</Link>
              <button className="customBtn" onClick={() => handleDelete(post.id)}>
                Delete Post
              </button>
              <button className="customBtn" onClick={viewImages}>View Images</button>
            </div>
          </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to='/'>Visit Our Homepage</Link>
            </p>
          </>
        }
        {modal && (
          // Покажем модальное окно, если modal установлен в true
          <Modal visible={modal} setVisible={setModal}>
            {post.imageUrl && <img className="image" src={post.imageUrl} alt="Post Image" />}
          </Modal>
        )}
      </article>
    </main>
  )
}

export default PostPage;
