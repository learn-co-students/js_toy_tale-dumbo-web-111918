const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let toyList = document.querySelector("#toy-collection")
let addToy = false

toyForm.addEventListener('submit', function(e){
  e.preventDefault()
  let toy = {
    name: e.target[0].value,
    image: e.target[1].value,
    likes: 0
  }

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
}).then(res => res.json())
.then(toy => createToy(toy))

})

fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys => slapToysOnTheDOM(toys))


function createToy(toy) {
  let div = document.createElement('DIV')
    div.className = "card"
    div.innerHTML = `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${(toy.likes > -1)? toy.likes:0} Likes </p>
    <button class="like-btn">Like <3</button>`
    likeBtn = div.lastChild
    likeBtn.dataset.id = toy.id
    likeBtn.dataset.likes = toy.likes
    likeBtn.addEventListener('click', function(e){
      let toyId = likeBtn.dataset.id
      let toyLikes = parseInt(likeBtn.dataset.likes) + 1
      let toy = {likes: toyLikes}
      fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toy)
      }).then(res => res.json())
      .then(toy => 
        createToy(toy))
    })
    toyList.append(div)
  }

function slapToysOnTheDOM(toys) {
  toys.forEach(toy => createToy(toy))
}


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


