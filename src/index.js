const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector('#toy-collection')
const inputButton = document.getElementById('input-button')

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/toys')
  .then(object => object.json())
  .then(toysParsedObject => {
    toyCard(toysParsedObject)
  })
})


const newToy = (e) => {
  e.preventDefault()
  const toyName = document.querySelector('#name-value').value
  const toyImage = document.querySelector('#image-value').value

  const inputValue = {
    name: toyName,
    image: toyImage,
    likes: 0
  }

  fetch(`http://localhost:3000/toys`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(inputValue)
  })
  .then(response => response.json())
  .then(parsedObject => console.log(parsedObject))


}

inputButton.addEventListener('click', newToy)



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
const toyCard = (object) => {
  object.forEach(toy => {
    const toyDiv = document.createElement('div')
    console.log(toyDiv)
    toyDiv.innerHTML = `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} </p>
      <button class="like-btn">Like <3</button>
    </div>`
    toyCollection.append(toyDiv)
  })
}
