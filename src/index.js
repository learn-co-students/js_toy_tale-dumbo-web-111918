// YOUR CODE HERE
const toyCollection = document.querySelector('#toy-collection')
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const inputbtn = document.querySelector('#input-button')
const nameInput = document.querySelector('#name-value').value
const imageUrl = document.querySelector('#image-value').value
const addToyForm = document.querySelector('.add-toy-form')
let addToy = false

document.addEventListener('DOMContentLoaded', e => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => showToys(toys))
})

const showToys = (toys) => {
  toys.forEach(toy => {
    toyCollection.innerHTML += ` <div class="card" data-id="${toy.id}">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p> ${toy.likes} </p>
    <button class="like-btn">Like <3</button>
  </div>`
  })
}

  addToyForm.addEventListener('submit', e => {
    e.preventDefault()

    newToyData = {
      name: nameInput,
      image: imageUrl,
      likes: 0
    }

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      body: JSON.stringify(newToyData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(newToy => {
      addNewToy(newToy)
    })
  })



const addNewToy = (toy) => {
  toyCollection.innerHTML += ` <div class="card" data-id="${toy.id}">
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p> ${toy.likes} </p>
  <button class="like-btn">Like <3</button>
</div>`
}


toyCollection.addEventListener('click', e => {
  if(e.target.classList.contains('like-btn')) {
    const toyId = e.target.parentNode.getAttribute('data-id')
    const p = e.target.parentNode.querySelector('p')
    const numOfLikes = parseInt(p.innerText)

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        likes: numOfLikes + 1
      }),
      headers: {
        'Content-Type': "application/json"
      }
    })
    .then(res => res.json())
    .then(toyObject => p.innerText = toyObject.likes)

  }
})


// const likeToy = (id) => {
//   const id = document.querySelector()
//   id.addEventListener('click', e => {
//     console.log(e.target)
//   })
// }



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
