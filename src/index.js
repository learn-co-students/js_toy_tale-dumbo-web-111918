const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newToyForm = document.querySelector('.add-toy-form')
const toyCollection = document.querySelector("#toy-collection")
let addToy = false

// YOUR CODE HERE
// GET method
fetch("http://localhost:3000/toys/")
  .then(res => res.json())
  .then(data => renderToys(data))

//HELPER METHODS/BOIS

function toyCardMaker(toy) {
  let newToyCard = document.createElement("div");
  newToyCard.setAttribute("class", "card");
  newToyCard.dataset.id = toy.id;

  let toyName = document.createElement("h2");
  toyName.innerText = toy.name;

  let toyImage = document.createElement("img");
  toyImage.src = toy.image;
  toyImage.setAttribute("class", "toy-avatar");

  let toyLikes = document.createElement("p");
  toyLikes.innerText = toy.likes + " Likes";

  let likeButton = document.createElement("button");
  likeButton.innerText = "Like <3";
  likeButton.setAttribute("class", "like-btn");

  newToyCard.append(toyName, toyImage, toyLikes, likeButton);
  return newToyCard;
}

function renderToy(toy) {
  let newToyCard = toyCardMaker(toy);
  toyCollection.append(newToyCard);
}

function renderToys(toyData) {
  toyData.forEach(toy => {
    renderToy(toy);
  })
}


//*************EVENT LISTENERS********************


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

newToyForm.addEventListener('submit', function (event) {
  event.preventDefault();
  //console.log(event);
  //more robust method
  let toyName = newToyForm.querySelector('input[name="name"]').value;
  let toyImage = newToyForm.querySelector('input[name="image"]').value;
  // less robust method -- both work tho
  // let toyName = newToyForm[0].value;
  // let toyImage = newToyForm[1].value;
  const option = {
    method: "POST",
    headers:{
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({name : toyName, image: toyImage, likes: 0})
  }
  fetch("http://localhost:3000/toys", option)
    .then(res => res.json())
    .then(data => renderToy(data))
});

toyCollection.addEventListener('click', function(event) {
      if(event.target.className === "like-btn"){
        let likesTag = event.target.parentNode.querySelector(".card p");
        let likesNum = parseInt(likesTag.innerText.split(" ")[0]) + 1
        //debugger
        //console.log(event.target.id);

        const option = {
          method: "PATCH",
          headers:{
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          },
          body:JSON.stringify({"likes": likesNum})
        }
        fetch(`http://localhost:3000/toys/${event.target.parentNode.dataset.id}`, option)
          .then(res => res.json())
          .then(data => likesTag.innerHTML = `${data.likes} Likes`)
      };
    });



// OR HERE!
