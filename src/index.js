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

// check to see if a function is invoked here or not to make an
// event listener on the inputButton

const addNewToy = (e) => {
  e.preventDefault()
  const nameInputValue = document.querySelector('#name-value').value
  const imageInputValue = document.querySelector('#image-value').value

  inputValue = {
    name: nameInputValue,
    image: imageInputValue,
    likes: 0
  }

  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputValue)
  })
  .then(res => res.json())
  .then(data => console.log(data))

}

inputButton.addEventListener('click', addNewToy)


// ADD MORE CODE

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
    toyDiv.innerHTML = `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} </p>
      <button class="like-btn">Like <3</button>
    </div>`
    toyCollection.append(toyDiv)
  })
}


// const createNewToy = (e) => {
//   e.preventDefault();
//   const nameValueInput = document.querySelector('#name-value').value
//   const imageValueInput = document.querySelector('#image-value').value
//
//   const inputValue = {
//     name: nameValueInput,
//     image: imageValueInput,
//     likes: 0
//   }
//
//   fetch('http://localhost:3000/toys', {
//     method: 'POST',
//     body: JSON.stringify(inputValue),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(res => res.json())
//   .then(data => console.log(data))
//
// }
//
// inputButton.addEventListener('click', createNewToy)
