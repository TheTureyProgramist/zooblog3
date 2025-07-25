	// const element = document.getElementById('.my-element-selector');
	// element.scrollIntoView({
	//   behavior: 'smooth',
	//   block: 'end',
// });
//--------------------------------
async function getPosts() {
  try {
    const response = await fetch('http://localhost:3000/posts');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Помилка при отриманні постів:', error);
    return [];
  }
}

async function updatePost(id, updatedPost) {
  try {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost)
    });
    return await response.json();
  } catch (error) {
    console.error('Помилка при оновленні поста:', error);
    return null;
  }
}
async function deletePost(id) {
  try {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE"
    });
    return await response.json();
  } catch (error) {
    console.error('Помилка при видаленні поста:', error);
    return null;
  }
}

function addPost(e) {
  e.preventDefault();
  const postsList = document.querySelector('.posts-list');
  const addPostForm = document.getElementById('add-post-form');
  const name = document.getElementById('name').value.trim();
  const likes = Number(document.getElementById('likes').value);
  const postText = document.getElementById('post-text').value.trim();
  const photo = document.getElementById('photo').value.trim();
  const comentar = document.getElementById('comentar').value.trim();
  const id = Math.random().toString(36);
  const newPost = {
        id,
    name,
    likes,
    "post-text": postText,
    photo,
    comentar
  };
  fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost)
  })
    .then(res => res.json())
    .then(() => getPosts())
    .then((data) => {
      postsList.innerHTML = makePostsMarkUp(data);
      addPostForm.reset();
    })
    .catch(() => alert('Помилка при додаванні поста'));
}
const makePostsMarkUp = (posts) => {
  return posts.map((post) => {
    return `<li style="margin-bottom: 30px; border-bottom: 1px solid #ccc; padding-bottom: 20px;">
      <b>ID: ${post.id}<br>
      <b>Ім'я:</b> ${post.name}<br>
      <b>Лайки:</b> ${post.likes}<br>
      <b>Пост-текст:</b> ${post["post-text"]}<br>
      <b>Фото:</b><br>
      <img src="${post.photo}" alt="Фото" style="max-width: 200px;"><br>
      <b>Коментар:</b> ${post.comentar}<br>
      <button onclick="window.editPost('${post.id}')">Редагувати</button>
      <button onclick="window.deletePost('${post.id}')">Видалити</button>
    </li>`;
  }).join('');
};

const postsList = document.querySelector('.posts-list');
const addPostForm = document.getElementById('add-post-form');

function renderPosts() {
  getPosts().then((data) => {
    postsList.innerHTML = makePostsMarkUp(data);
  });
}
window.deletePost = function(id) {
  deletePost(id).then(() => renderPosts());
}

window.editPost = function(id) {
  getPosts().then(data => {
    const post = data.find(p => p.id == id);
    if (!post) return;
    const name = prompt("Вкажіть нове ім'я:", post.name);
    const photo = prompt("Вкажіть нове фото (шлях):", post.photo);
    const postText = prompt("Вкажіть новий текст:", post["post-text"]);
    const comentar = prompt("Напишіть коментар:", post.comentar);
    const likes = prompt("Додайте або відніміть лайки", post.likes);
    updatePost(id, {
      ...post,
      name,
      photo,
      "post-text": postText,
      comentar,
      likes: Number(likes)
    }).then(() => renderPosts());
  });
}
addPostForm.addEventListener('submit', addPost);
renderPosts();