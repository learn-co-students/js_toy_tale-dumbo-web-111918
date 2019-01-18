document.addEventListener('DOMContentLoaded', initialize)
document.body.addEventListener('click', addLikeHandler)

function initialize(){
  getAllToys().then(renderToys)
  const createBtn = document.querySelector(".submit")
  const createToyForm = document.querySelector(".add-toy-form")
  createToyForm.addEventListener("submit", createToyHandler)
}

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.querySelector("#toy-collection")
  const toyURL = "http://localhost:3000/toys"
  let addToy = false

//click add toy ---> shows form
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      const createBtn = document.querySelector(".submit")
    } else {
      toyForm.style.display = 'none'
    }
  })

function renderToys(toyArray){
  toyArray.forEach(toy => makeToyCard(toy))
}

function makeToyCard(toy){
  toyCollection.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p><span id=${toy.id}>${toy.likes}</span> likes </p>
    <button data-id=${toy.id} class="like-btn">Like ❤️</button>
  </div>`

}

function createToyHandler(event){
  event.preventDefault()
  const createToyForm = document.querySelector("#add-toy-form")
  const newToyName = event.target.name.value
  const newToyURL = event.target.image.value
  const toyObj = {name: newToyName, image: newToyURL, likes: 0}
    postAToy(toyObj).then(initialize)
}

function addLikeHandler(event){
  const card = event.target.parentNode.parentNode
    if (event.target.className === "like-btn") {
      let id = event.target.dataset.id;
      let currentLikes = event.target.previousElementSibling.children[0].innerText
      currentLikes = parseInt(currentLikes) + 1
      event.target.previousElementSibling.children[0].innerText = currentLikes
      patchAToy(id, currentLikes).then(initialize)
    }
  }
  // debugger


//// FETCHING here
function getAllToys(){
  return fetch(toyURL)
  .then(response => response.json())
}

function postAToy(data){
  const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    }
  return fetch(toyURL, options)
  .then(response => response.json())
}

function patchAToy(id, currentLikes){
  console.log(currentLikes)
  const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"likes": currentLikes}),
    }
  return fetch(toyURL + `/${id}`, options)
  .then(response => response.json())
}
