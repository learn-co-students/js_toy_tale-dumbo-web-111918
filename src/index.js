const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const addToyForm = document.querySelector('.add-toy-form')
let addToy = false

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', e => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => toys.forEach(toy => showToy(toy)))

}) //END OF DOMContentLoaded

const showToy = (toy) => {
  toyCollection.innerHTML += `<div class="card" data-id="${toy.id}">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p> ${toy.likes} </p>
    <button class="like-btn">Like <3</button>
  </div>`
}

addToyForm.addEventListener('submit', e => {
  e.preventDefault()
  const nameValue = document.querySelector('#name-value').value
  const imageValue = document.querySelector('#image-value').value

  const toyData = {
      name: nameValue,
      image: imageValue,
      likes: 0
  }

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    body: JSON.stringify(toyData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(toy => showToy(toy))

})

toyCollection.addEventListener('click', e => {
  if(e.target.classList.contains('like-btn')) {
    const dataId = e.target.parentNode.getAttribute('data-id')
    const p = e.target.parentNode.querySelector('p')
    const pValue = p.innerText
    const numOfLikes = parseInt(pValue)

  fetch(`http://localhost:3000/toys/${dataId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      likes: numOfLikes + 1
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(toy => p.innerText = toy.likes)

  }

})


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
