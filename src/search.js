const catchAnimal = document.querySelector('.type-animal');
const resultsContainer = document.createElement('ul');
catchAnimal.insertAdjacentElement('afterend', resultsContainer);

let allAnimals = [];

fetch("https://api.inaturalist.org/v1/taxa?q=a")
  .then(response => response.json())
  .then(data => {
    allAnimals = data.results;
  })
  .catch(error => {
    console.error("Помилка при завантаженні тварин:", error);
  });

catchAnimal.addEventListener('input', () => {
  const searchText = catchAnimal.value.toLowerCase();
  resultsContainer.innerHTML = '';
  if (searchText === '') return;
  const filtered = allAnimals.filter(animal =>
    (animal.name && animal.name.toLowerCase().includes(searchText)) ||
    (animal.preferred_common_name && animal.preferred_common_name.toLowerCase().includes(searchText))
  );
  if (filtered.length === 0) {
    resultsContainer.innerHTML = '<li style="margin-top: 0px; color: red; font-size: 20px;">Тварин не знайдено!</li>';
    return;
  }
  if (filtered.length > 10) {
    resultsContainer.innerHTML = '<li style="margin-top: 40px; color: orange; font-size: 20px;">Забагато результатів, уточніть запит!</li>';
    return;
  }
  if (filtered.length === 1) {
    const animal = filtered[0];
    resultsContainer.innerHTML = `
      <li class="countryCard" style="margin-top: 6px;">
        <div>
          <img src="${animal.default_photo ? animal.default_photo.url : ''}" width="350px" height="350px">
        </div>
        <div style="width: 350px;">
          <h2 style="width: 450px; font-size: 20px; margin-top: 10px;">${animal.preferred_common_name || animal.name}</h2>
        </div>
      </li>
    `;
  } else {
    resultsContainer.innerHTML = filtered.map(animal =>
      `<li style="padding: 20px;">${animal.preferred_common_name || animal.name}</li>`
    ).join('');
  }
});