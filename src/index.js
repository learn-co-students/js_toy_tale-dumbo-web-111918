document.addEventListener('DOMContentLoaded', () => {

// document.body.addEventListener('click', addLikes)



  createButton.addEventListener('click', submitNew)
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

})

const toyCollection = document.querySelector("#toy-collection")
const toyURL = "http://localhost:3000/toys/"
const addBtn = document.querySelector('#new-toy-btn')
const createButton = document.querySelector(".submit")
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
fetch(toyURL)
  .then(res => res.json())
  .then(data => {data.forEach(toy => {
    showToys(toy) })
  })

  //
  // function addLikes(toy){
  //   toyCollection.addEventListener("click", () => {
  //     if (event.target.classList.contains("like-btn")){
  //
  //   let likeNum =  event.target.previousElementSibling.innerText.split(" ")[0]
  //   let like = event.target.previousElementSibling
  //   like.innerText = `${++likeNum} likes`
  //
  //   console.log(likeNum)
  //       // fetch(`http://localhost:3000/toys/${event.target.getAttribute("data-id")}`, {
  //       //   method: "PATCH",
  //       //   headers:
  //       //   {"Content-Type": "application/json",
  //       //   Accept: "application/json"},
  //       //   body: {likes: (likeNum) }
  //       // })
  //       // .then(res => res.json())
  //       // .then(data => (data.likes))
  //     }
  //   })
  //   }

    // function addLikes(e){
    //   debugger
    //   if (e.target.className === 'like-btn') {
    //     let id = e.target.parentElement.dataset.id
    //     let like = e.target.previousElementSibling
    //     let likeCount = parseInt(e.target.previousElementSibling.innerText)
    //     like.innerText = `${++likeCount} likes`
    //
    //
    //     fetch(toyURL + id, {
    //       method: "PATCH",
    //       body: JSON.stringify({likes: likeCount}),
    //       headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           }
    //     }).then(res => res.json()).then(console.log)
    //     // console.log('clicked', e.target);
    //   }
      // to get likes to increase
      // need to know how many likes the toy already has
      // send a patch request
      // how much to increment
    //
    // }
    function init(){

      addClicksToLikes()
    }
    
    function addClicksToLikes(){
      document.addEventListener('click', (e) => {
        // conditionally render the like number
        if (e.target.className === "like-btn") {
          let likeNum = e.target.previousElementSibling
          likeNum.innerText = parseInt(likeNum.innerText) + 1
          likeToy(e.target.dataset.id, parseInt(likeNum.innerText)).then(console.log)
        }
      })
    }


    function likeToy(toyId, data) {
      // send a patch request to server increasing a toy's like count
      return fetch(toyUrl + `/${toyId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({likes: data})
      }).then(res => res.json())
    }



function showToys(toy){
  collectionDiv = document.querySelector("#toy-collection")

    collectionDiv.innerHTML += `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" data-id="${toy.id}"> Like ❤️</button>
    </div>`

  }


function createToy(){
  var json = {name: document.querySelector(".add-toy-form").name.value,
  image: document.querySelector(".add-toy-form").image.value,
  likes: 0}

    fetch(toyURL, {
      method: "POST",
      headers:
        {"Content-Type": "application/json",
          Accept: "application/json"},
        body: JSON.stringify(json)
    })
    .then(res => res.json())
    .then(json => submitNew(json))
    }





function submitNew(event){
  event.preventDefault()
  createToy()
    collectionDiv = document.querySelector("#toy-collection").append(
  collectionDiv.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn">Like ❤️</button>
  </div>`)

}
