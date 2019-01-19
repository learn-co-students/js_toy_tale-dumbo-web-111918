
// YOUR CODE HERE
// ****add variables here
//
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toyFetchURL = "http://localhost:3000/toys/"
const toyCollection = document.querySelector("#toy-collection")
const newToyForm = document.querySelector('.add-toy-form')

// ** fetches go here

fetch(toyFetchURL)
.then(res => res.json())
.then(data => renderToys(data))

//
// ***add event listeners
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

  newToyForm.addEventListener('submit', function (event){
    event.preventDefault();

   // let toyName = event.target[0].value
   // let toyImage = event.target[1].value
   // let toyButton = event.target[2].value
   //here is another way, create variables based on html ids you put in form
   //another way --if the form has name fields, you can call event.target.image
   //ie insert value of name there
    let toyName = event.target.name.value
    let toyImage = event.target.image.value
//these are values as they are html

//you could also put options completely outside with method headers, body
      fetch(toyFetchURL,
        {
      	method: "POST",
        headers: {
        	"Content-Type": "application/json",
        	"Accept": "application/json"
        },
        body: JSON.stringify(createJsonObject(toyName, toyImage))
      	})
      .then(function(response){
       	  return response.json();
       }).then(function(data){
       	  //console.log(data);
          toyCollection.innerHTML = ""
       	  toyCollection.append(toyCardMaker(data)); //because I already appended
       	  //but I appended inside array so I have to re-append the individual card
       })
    });
  //fetch object is one object with keys of method, header, body. sometimes those
  //key values have objects inside them
  //.then has to be close with })
  //don't forget to render back into json when you receive it back

 // make a listener on the entire div
  // the button has a class of 'like-btn'
  // when it hears the button, we go up into that card, grab likes turn into
  // integer and plus 1, then turn back into string?
  // then send into fetch patch
  // then render onto DOM
  //

    toyCollection.addEventListener("click", function(event){
      let likeButton = event.target.querySelector(".like-btn");
      console.log(event);
      //is only defined within scope so have to console log inside
      //the scope, not run in chrome console after!

       //i have defined button as part of event.target so i cant say
       //if event.target === button.
       //i have to pick it by its classList which is button
            if (event.target.className === "like-btn"){
              //console.log(event.target);
              let likesNum = event.target.parentNode.querySelector(".card p");
              //parentNode is the card
              let num = likesNum.innerText.split(" ")[0]
              //split to on the space between number and word likes, get the 0 one
              //or do slice with last piece of it cut off
              num = parseInt(num) + 1;
             likesNum.innerHTML = `${num} likes`;

// the id in event.target is the html one , we need the database one as we are
// updating the database, so add dataset.id as hidden field when you render the card
          const option= {
           method: "PATCH",

            headers:
            {
            "Content-Type": "application/json",
             Accept: "application/json"
             },

            body: JSON.stringify({
            	"likes": num
            })
          }

      fetch(`http://localhost:3000/toys/${event.target.parentNode.dataset.id}`, option)
        .then(res => res.json())
        .then(data =>
       	  //console.log(data);
       	  toyCollection.append(toyCardMaker(data)))
     }; //end of if statement for selecting the button
    });//end of event listener function


    function createJsonObject(name, image) {
    	let newToyObj = {};
    	newToyObj.name = name;
    	newToyObj.image = image;
    	newToyObj.likes = 0;
    	return newToyObj;
    }

    //process for incrementing likes
    //add event listener on the entire div
     //add language so it only registers when click button
     //the button is has a class of


//helper methods
   function toyCardMaker(toy){
     const newToyCard = document.createElement("div")
     newToyCard.setAttribute("class", "card")// set attribute used when add class name, id
  //could do newToyCard.className = "card"
  //anything inside html open tag is attribute

  //this is for later, when we need id to patch it
    newToyCard.dataset.id = toy.id

  //3 steps are make the element, manipulate it, append it
     const toyName = document.createElement("h2");
     toyName.innerText = toy.name;
     //newToyCard.append(toyName);

     const toyImage = document.createElement("img");
     toyImage.src = toy.image;
      toyImage.style.width = "100 px";
      toyImage.style.height = "100 px";
     newToyCard.append(toyName);
     toyImage.setAttribute("class", "toy-avatar")
     //newToyCard.append(toyIamge);

      const toyLikes = document.createElement("p")
      toyLikes.innerText = `${toy.likes} likes`;
     //newToyCard.append(toyLikes);

     const likeButton = document.createElement("button");
     likeButton.innerText = "Like <3"; //this is a heart
     likeButton.setAttribute("class", "like-btn");
     //newToyCard.append(likeButton);

       //we appended to card but didnt append card to DOM
      newToyCard.append(toyName, toyImage, toyLikes, likeButton);
//i appended the card to the dom
       //toyCollection.append(newToyCard);
     return newToyCard;
    }
 //test this by putting data in there  toyCardMaker(put the info in there)

  function renderToys(toyData){
  	toyData.forEach(function (toy){
      let newToyCard = toyCardMaker(toy);
  		toyCollection.append(newToyCard);
  	});
  }



// OR HERE!
// delete and read dont need body for fetches , update and create do
//
