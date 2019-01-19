

//selectors here

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let url = `http://localhost:3000/toys`

  const toyCollection = document.querySelector("#toy-collection")
  const newToyButton = document.querySelector("#new-toy-btn")
  const newToyForm = document.querySelector(".add-toy-form")
//fetches here
    fetch(url)
    .then(function(response){
    	return response.json()
    })
    .then(function(data){
    	data.forEach(renderToy)
    })

//listeners   here
//

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

  toyCollection.addEventListener("click", function(event){
     if(event.target.className === "like-btn"){

     	let likesTarget = event.target.parentElement.querySelector("#likesId")
     	//console.log(likesTarget)
     	let num = (likesTarget.innerHTML).split(" ")[0]
     	console.log(num)
     	num = parseInt(num) + 1;
     	likesTarget.innerHTML = `${num} Likes`
     	console.log(event.target.parentElement)
     	debugger

      let cardId = event.target.parentElement.dataset.id
       console.log(cardId)
    let opts = {
      likes: num
     }
     let options =

      {
      method: "PATCH",
      headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
      body: JSON.stringify(opts)

      }//end of hash

      fetch(`http://localhost:3000/toys/${cardId}`,options)
     //end of fetch
     .then(function(response){
     	//console.log(response)
    	return response.json()
    })
    .then(function(data){
    	console.log(data)
    })

    }//end of if
  })//end of listener

  newToyForm.addEventListener("submit", function(event){
    event.preventDefault();
    // console.log(event)
    // debugger
     let newToyName = event.target.name.value
     let newToyImage = event.target.image.value

    let opts =
    {
    	name: newToyName,
    	image: newToyImage,
    	likes: 0
    }
    fetch(url,
     {
      method: "POST",
      headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
      body: JSON.stringify(opts)

     }//end of hash

    ) //end of fetch
    .then(function(response){
    	return response.json()
    })
    .then(function(data){
    	renderToy(data)
    })

  }) //end of listner

  // renderToy(
  //   {
  //     "id": 1,
  //     "name": "Woody",
  //     "image": "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
  //     "likes": 11
  //   }
  //  )

//helper functions here


  function renderToy(toy){
    let divCard = document.createElement("div")
    divCard.dataset.id = toy.id
    divCard.id = `toy-${toy.id}`
    let h2 = document.createElement("h2")
    h2.innerHTML = toy.name
    let image = document.createElement("img")
    image.src = toy.image
    image.style.width = "50 px"
    image.style.height = "50 px"
    let likes = document.createElement("p")
    likes.innerHTML = `${toy.likes} Likes`
    likes.id = "likesId"
    let likeButton = document.createElement("button")
    likeButton.innerHTML = `Like <3`
    likeButton.className = "like-btn"
    divCard.append(h2,image, likes, likeButton)
    toyCollection.append(divCard)
    //return toy;
  }

// <div class="card">
//     <h2>Woody</h2>
//     <img src=toy_image_url class="toy-avatar" />
//     <p>4 Likes </p>
//     <button class="like-btn">Like <3</button>
//   </div>
