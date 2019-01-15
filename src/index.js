const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById("toy-collection");
const inputBtn = document.getElementById("input-btn");

let addToy = false

// YOUR CODE HERE

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded");
})

fetch("http://localhost:3000/toys")
.then(object => object.json())
.then(jsonParsedObject => {
  toyCard(jsonParsedObject);
})
function newToy(event) {
  event.preventDefault();
  toyName = document.getElementById("name-value").value;
  toyImage = document.getElementById("image-value").value;
  toyObj = {name: toyName, image: toyImage, likes: 0}

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyObj)
  }).then( res => res.json()).then(response => console.log("Success", JSON.stringify(response)))
}


inputBtn.addEventListener("click", newToy);



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

const toyCard = function(object) {
  object.forEach(function(toy) {
    const toyDiv = document.createElement("div");
      toyDiv.innerHTML = `<div data-id="${toy.id}" class="card">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} </p>
      <button class="like-btn">Like <3</button>`
      toyCollection.append(toyDiv)
    })
}

toyCollection.addEventListener("click", function(e){
  if(e.target.className == "like-btn"){
    let id = e.target.parentNode.dataset.id;
    let numOfLikes = e.target.parentNode.querySelector("p").innerText;
    let increaseLikes = parseInt(numOfLikes) + 1
    e.target.parentNode.querySelector("p").innerText = increaseLikes;
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        likes: increaseLikes
      })
    }).then(res => res.json())
      .then(console.log)
  }
})
