const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
let addToy = false
const toyURL = 'http://localhost:3000/toys'
// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!
document.addEventListener('DOMContentLoaded', initalize, console.log('dom loaded'))
document.addEventListener('submit', newToyHandler)
document.addEventListener('click', likeHandler)

function initalize(){
  getToy()
}

function createToy(toy){
  toyCollection.innerHTML +=
    `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p><span id= ${toy.id}>${toy.likes}</span> Likes </p>
    <button data-id=${toy.id} class="like-btn">Like <3</button>
    </div>`
}

function newToyHandler(event){
  event.preventDefault()
  if (event.target.className === 'add-toy-form'){
    newToyName = event.target.name.value
    newToyImage = event.target.image.value
    newToyObj = { name: newToyName, image: newToyImage, likes: 0 }
    postToy(newToyObj).then(initalize)
  }
}

function likeHandler(event){
  if(event.target.className === 'like-btn'){
    let likeId = event.target.dataset.id
    let currentLikes = event.target.previousElementSibling.children[0].innerText
    currentLikes = parseInt(currentLikes) + 1
    event.target.previousElementSibling.children[0].innerText = currentLikes
    console.log(currentLikes)
    patchToy(likeId, currentLikes).then(initalize)
  }
}



function getToy(){

  fetch(toyURL)
  .then(r => r.json())
  .then(toys => toys.forEach(toy => {
    createToy(toy)
  }))
}


function postToy(toy){
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  }
  return fetch(toyURL, options)
  .then(r => r.json())
}

function patchToy(likeId, currentLikes){
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({likes: currentLikes}),
  }
  return fetch(toyURL + `/${likeId}`, options)
  .then(r => r.json())
}
