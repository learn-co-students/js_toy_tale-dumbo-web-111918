const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyList = document.querySelector('#toy-collection');


let addToy = false
toyForm.addEventListener('submit', function(e){
  e.preventDefault()

  const name = e.target.getElementsByClassName("input-text")[0].value

  const image = e.target.getElementsByClassName("input-text")[1].value

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
        },

    body: JSON.stringify(
      {
      "name": name,
      "image": image,
      "likes": "0"
    })
  });
  const toyCollectionDiv = document.querySelector('#toy-collection');
  const toyDiv = document.createElement('div');
  toyDiv.classList.add("card");
  toyCollectionDiv.appendChild(toyDiv)

  const h2 = document.createElement('h2')
  h2.innerText = name
  toyDiv.appendChild(h2)

  const img = document.createElement('img');
  img.src = image
  img.classList.add("toy-avatar");
  toyDiv.appendChild(img);

  const pTag = document.createElement('p')
  pTag.innerText = `0 Likes`
  toyDiv.appendChild(pTag)

  const button = document.createElement("button")
  button.classList.add("like-btn")
  button.innerText = "Like <3"
  toyDiv.appendChild(button)
  toggleForm();
})

// YOUR CODE HERE

addBtn.addEventListener('click', toggleForm);

function toggleForm(){
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
}

document.addEventListener("DOMContentLoaded", function(){
  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json()
  })
  .then(function (toysJson) {
    const toyCollectionDiv = document.querySelector('#toy-collection');
    toysJson.forEach(function(toy){

      const toyDiv = document.createElement('div');
      toyDiv.classList.add("card");
      toyCollectionDiv.appendChild(toyDiv)

      const h2 = document.createElement('h2')
      h2.innerText = toy.name
      toyDiv.appendChild(h2)

      const img = document.createElement('img');
      img.src = toy.image
      img.classList.add("toy-avatar");
      toyDiv.appendChild(img);

      const pTag = document.createElement('p')
      pTag.innerText = `${toy.likes} Likes`
      toyDiv.appendChild(pTag)

      const button = document.createElement("button")
      button.classList.add("like-btn")
      button.innerText = "Like <3"
      toyDiv.appendChild(button)

    })



  })




});
