const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyList = document.querySelector('#toy-collection');
let addToy = false;

addBtn.addEventListener('click', toggleToyForm);
toyForm.addEventListener('submit', handleNewToy);
toyList.addEventListener('click', handleLikeClick);

readResource("http://localhost:3000/toys", showToys);

//Helpers & Handlers
function toggleToyForm() {
  addToy = !addToy
  if (addToy) {
    toyForm.style.height = "auto";
    toyForm.style.paddingTop = "1rem";
    toyForm.style.paddingBottom = "1rem";
    toyForm.style.overflow = "visible";
  } else {
    toyForm.style.height = "0";
    toyForm.style.paddingTop = "0";
    toyForm.style.paddingBottom = "0";
    toyForm.style.overflow = "hidden";
  }
}
function handleLikeClick(event) {
  let e = event.target;
  if (e.parentNode.classList.contains("card") && e.classList.contains("like-btn")) {
    likeToy(e.parentNode.dataset.id, e.parentNode);
  } else if (e.parentNode.classList.contains("card") && e.classList.contains("delete-btn")) {
    deleteToy(e.parentNode.dataset.id, e.parentNode);
  }
}
function handleNewToy(e) {
  e.preventDefault();
  let name = e.target.querySelector("input[name='name']");
  let image = e.target.querySelector("input[name='image']");
  let toy = {
    name: name.value,
    image: image.value,
    likes: 0
  }
  name.value = "";
  image.value = "";
  createResource("http://localhost:3000/toys", toy, showToy);
}
function likeToy(id, toyDiv) {
  let likesP = toyDiv.querySelector(`p`);
  let likesText = likesP.innerText;
  let likes = parseInt(likesText.split(" ")[0]) + 1;
  likesP.innerText = likes + " Likes";
  let toyObject = {
    likes: likes
  }
  updateResource(`http://localhost:3000/toys/${id}`, toyObject);
}
function showToys(toys) {
  toys.forEach(toy => {
    toyList.prepend(newToyCard(toy));
  });
}
function showToy(toy) {
  console.log(toy);
  toyList.prepend(newToyCard(toy));
}
function deleteToy(id, toyDiv) {
  toyDiv.remove();
  deleteResource(`http://localhost:3000/toys/${id}`);
}
function newToyCard(toy) {
  let toyCard = document.createElement("div");
  toyCard.className = "card";
  toyCard.dataset.id = toy.id;
  toyCard.dataset.likes = toy.likes;
  toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn">Like ♥︎</button>
    <button class="delete-btn">×</button>
  `;
  return toyCard;
}

// CRUD Functions
function createResource(url, data, cb) {
  fetch(url, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => cb(json));
}
function readResource(url, cb) {
  fetch(url)
    .then(res => res.json())
    .then(json => cb(json));
}
function updateResource(url, data) {
  fetch(url, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
function deleteResource(url) {
  fetch(url, {method: "DELETE"});
}
