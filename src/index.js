const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const addToyForm = document.querySelector('.add-toy-form')
let addToy = false

function renderToys() {
  let toy;
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(e => {
      e.forEach(t => {
        toy = document.createElement('div')
        toy.className = "card"
        toy.setAttribute("data-id", t.id)
        toy.setAttribute("data-likes", t.likes)
        toy.innerHTML = `
        <h2>${t.name}</h1>
        <div class = 'image'>
          <img src=${t.image} class='toy-avatar' alt="">
        </div>
          <p data-id=${t.id} >${t.likes} likes</p>
        <button class = "like-btn">
        Like <3
        </button>
        `
        toyCollection.append(toy)
      })
    }).catch(error => console.log(error))
}

function addNewToy(newToy) {
  newToy.preventDefault()
  let name = newToy.target[0].value
  let url = newToy.target[1].value

  let toyObject = {'name': name, 'image':url, 'likes':0}

  let toy;
  fetch('http://localhost:3000/toys', {
    method:"Post",
    body: JSON.stringify(toyObject),
    headers: {
      'Content-Type' : 'application/json'
       // Accept: "application/json"
    }
  })
}

function delegateLikeToy(eventClick) {
  let parent = eventClick.target.parentElement
  let id = parent.dataset.id
  let likes = parent.dataset.likes
  if (eventClick.target.className === "like-btn") {
    likes++
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({'likes': likes,}),
      headers: {
        'Content-Type' : 'application/json',
        Accept: "application/json"
      }
    })
    .then(() => {
      parent.dataset.likes = likes
      likeP = parent.childNodes[5]
      likeP.innerText = `${likes} likes`
    })
    .catch(error => console.log(error))
  }
}

renderToys()

document.addEventListener("DOMContentLoaded", () => {

// hides add toy form
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      addToyForm.addEventListener('submit', addNewToy)
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })

  toyCollection.addEventListener('click', delegateLikeToy)


})
