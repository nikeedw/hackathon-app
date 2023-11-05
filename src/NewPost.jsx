import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useDropzone } from 'react-dropzone';
import ReCAPTCHA from "react-google-recaptcha"; // Импортируйте компонент reCAPTCHA

const NewPost = () => {
  const history = useHistory();

  // Ваши ключи reCAPTCHA
  const siteKey = "Ваш_site_key"; // Замените на ваш ключ

  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);

  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [recaptchaValue, setRecaptchaValue] = useState(null); // Стейт для хранения значения reCAPTCHA

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверьте, прошла ли reCAPTCHA
    if (recaptchaValue) {
      const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const datetime = format(new Date(), 'MMMM dd, yyyy pp');

      // Здесь создайте URL для изображения (предположим, что у вас есть файл изображения)
      const imageFile = uploadedFiles[0]; // Предполагается, что загружено только одно изображение
      const imageUrl = URL.createObjectURL(imageFile);

      const newPost = { id, title: postTitle, datetime, body: postBody, imageUrl };
      savePost(newPost);
      history.push('/');
    } else {
      // Вывести ошибку, так как reCAPTCHA не прошла
      console.log('Please complete the reCAPTCHA challenge.');
    }
  }

  // Функция для обработки загрузки файлов
  const onDrop = (acceptedFiles) => {
    setUploadedFiles(acceptedFiles);
  };

  // Используйте хук useDropzone для создания области загрузки файлов
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <main className="NewPostPage">
      <h2>New Post</h2>
      <form className="newPost" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          className='customInput'
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />

        {/* Добавьте область для загрузки файлов */}
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p style={{color: 'white'}}>Drag &amp; drop images here, or click to select files</p>
        </div>

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

        {/* Вставьте reCAPTCHA компонент */}
        <ReCAPTCHA
          sitekey={"6Lf85vYoAAAAAGhjQVpjus5RX6hDsQQliZf7SlbH"}
          onChange={(value) => setRecaptchaValue(value)} // Обработчик изменения значения reCAPTCHA
        />

        <button className='submit' type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}

export default NewPost;
