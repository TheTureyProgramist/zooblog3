const listElement = document.querySelector(".container");
const buttonElement = document.querySelector(".btn");
let currentPage = 1;
const perPage = 12;
const apiKey = "50977795-feb18de71b048a02e0c824e54";
const fetchImages = async (page) => {
  const url = `https://pixabay.com/api/?key=50977795-feb18de71b048a02e0c824e54&q=animals&image_type=photo&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.hits;
};
const renderImages = (images) => {
  const html = images
    .map((img) => {
        return `
    <ul style="list-style-type: none; gap: 5px;">
        <li class="userBasa">
            <img src="${img.webformatURL}" alt="${img.tags}" width="290px" height="189px" style="padding-right: 5px; border-radius: 14px;"/>
        </li>
    </ul>`;
    })
    .join("");
  listElement.insertAdjacentHTML("beforeend", html);
};
fetchImages(currentPage).then(renderImages);
buttonElement.addEventListener("click", async () => {
  currentPage++;
  const images = await fetchImages(currentPage);
  renderImages(images);
  if (images.length < perPage) {
    buttonElement.style.display = "none";
  }
});