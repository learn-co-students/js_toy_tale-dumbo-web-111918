const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyList = document.querySelector('#toy-collection')
let addToy = false
    delegateClick()

toyForm.addEventListener("submit", e => {
  e.preventDefault()

  let toy = {
    name: e.target[0].value,
    image: e.target[1].value,
    likes: 0
  }

  fetch(`http://localhost:3000/toys/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
  }).then(res => res.json())
    .then(toy => {
      createToy(toy)
    })

})

function createToy(toy) {
  let div = document.createElement("div")
  div.className = "card"
  div.dataset.id = toy.id
  toyList.append(div)
  div.innerHTML = `<h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button data-id=${toy.id} data-likes=${toy.likes} class="like-btn">Like <3</button>`
}

function slapToysOnTheDOM(toys) {
  toys.forEach(toy => createToy(toy))
};

fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => {
    slapToysOnTheDOM(toys)
  });



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

function delegateClick() {
  toyList.addEventListener("click", e => {
    if (e.target.classList.contains("like-btn")) {
      like(e.target.dataset.id, e.target.dataset.likes)
    }
  })
}

function like(id, likes) {

  let toy = { likes: ++likes }

  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
  }).then(res => res.json())
    .then(toy => {
      slapItBack(toy)
    })

}

function slapItBack({id, name, image, likes}) {
  let e = document.querySelector(`[data-id='${id}']`)
  e.innerHTML = `<h2>${name}</h2>
        <img src=${image} class="toy-avatar" />
        <p>${likes} Likes </p>
        <button data-id=${id} data-likes=${likes} class="like-btn">Like <3</button>`
}


// OR HERE!
