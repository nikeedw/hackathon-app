import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useDropzone } from 'react-dropzone';

const EditPost = () => {
	const history = useHistory();
	const { id } = useParams();

	const editTitle = useStoreState((state) => state.editTitle);
	const editBody = useStoreState((state) => state.editBody);
	const editImage = useStoreState((state) => state.editImage); // Добавим состояние для фотографии

	const editPost = useStoreActions((actions) => actions.editPost);
	const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
	const setEditBody = useStoreActions((actions) => actions.setEditBody);
	const setEditImage = useStoreActions((actions) => actions.setEditImage); // Добавим действие для обновления фотографии

	const getPostById = useStoreState((state) => state.getPostById);
	const post = getPostById(id);

	const [uploadedFiles, setUploadedFiles] = useState([]);

	useEffect(() => {
		if (post) {
			setEditTitle(post.title);
			setEditBody(post.body);
			setEditImage(post.imageUrl); // Установим текущую фотографию
		}
	}, [post, setEditTitle, setEditBody, setEditImage])

	const handleEdit = (id) => {
		const datetime = format(new Date(), 'MMMM dd, yyyy pp');
		const updatedPost = { id, title: editTitle, datetime, body: editBody, imageUrl: editImage }; // Обновляем фотографию
		editPost(updatedPost);
		history.push(`/post/${id}`);
	}

	// Функция для обработки загрузки файлов
	const onDrop = (acceptedFiles) => {
		setUploadedFiles(acceptedFiles);
		// Получаем URL загруженной фотографии
		const imageUrl = URL.createObjectURL(acceptedFiles[0]);
		setEditImage(imageUrl); // Устанавливаем новую фотографию
	};

	// Используйте хук useDropzone для создания области загрузки файлов
	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	return (
		<main className="NewPostPage">
			{editTitle ? (
				<>
					<h2>Edit Post</h2>
					<form className="newPost" onSubmit={(e) => e.preventDefault()}>
						<label htmlFor="postTitle">Title:</label>
						<input
							className="customInput"
							id="postTitle"
							type="text"
							required
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
						/>
						<label htmlFor="postBody">Post:</label>
						<textarea
							id="postBody"
							required
							value={editBody}
							onChange={(e) => setEditBody(e.target.value)}
						/>
						<div {...getRootProps()} className="dropzone">
							<input {...getInputProps()} />
							<p>Drag &amp; drop images here, or click to select files</p>
						</div>

						{/* Отображение текущей фотографии */}
						{editImage && <img className="image" src={editImage} alt="Post Image" />}

						{/* Отображение загруженных файлов */}
						{uploadedFiles.length > 0 && (
							<div>
								<p>Uploaded Files:</p>
								<ul>
									{uploadedFiles.map((file) => (
										<li key={file.name}>{file.name}</li>
									))}
								</ul>
							</div>
						)}
						<button className="submit" type="button" onClick={() => handleEdit(post.id)}>Submit</button>
					</form>
				</>
			) : (
				<>
					<h2>Post Not Found</h2>
					<p>Well, that's disappointing.</p>
					<p>
						<Link to='/'>Visit Our Homepage</Link>
					</p>
				</>
			)}
		</main>
	)
}

export default EditPost;
