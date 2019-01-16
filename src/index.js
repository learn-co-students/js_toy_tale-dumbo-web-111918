document.addEventListener('DOMContentLoaded', () => {
  let toyArea = document.querySelector('#toy-collection');
  let addToyForm = document.querySelector('.add-toy-form');
  let editToyForm = document.querySelector('.edit-toy-form');

  let submitButton = document.querySelector('.submit');

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false;

  // YOUR CODE HERE 
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

  function toysSlapOnDom(arr) {

    arr.forEach((el) => {

      let toyCardDiv = document.createElement('div');
      toyCardDiv.className = 'card'
      toyCardDiv.dataset.id = el.id

      let headerTwo = document.createElement('h2');
      headerTwo.innerText = el.name;

      let toyImg = document.createElement('img');
      toyImg.src = el.image;
      toyImg.className = 'toy - avatar'
      toyImg.width = 150;
      toyImg.height = 150;

      let toyPara = document.createElement('p');
      toyPara.innerText = `${el.likes} likes`

      let toyButton = document.createElement('button')
      toyButton.className = "like-btn"
      toyButton.innerText = 'Like <3 '

      let toyEditButton = document.createElement('button');
      toyEditButton.className = 'edit-btn';
      toyEditButton.innerText = 'Edit Toy';

      toyArea.appendChild(toyCardDiv);
      toyCardDiv.append(headerTwo, toyImg, toyPara, toyButton, toyEditButton);

    });
  }

  fetch('http://localhost:3000/toys')
  .then((res)=>{
    return res.json();
  })
  .then ((data)=>{
    return toysSlapOnDom(data)
  })

  addToyForm.addEventListener('submit', createNewToy);
  toyArea.addEventListener('click', editLikesOrToy);

  //put the event listent on the form 
  editToyForm.addEventListener('submit', handleEditSubmitButton)

}) //end of DOM Content Loaded

//OUTSIDE DOM
function createNewToy(event) {
  console.log(event.target)
  event.target[0].value
  event.target[1].value
  // event.preventDefault();
  // debugger
  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({
      name: event.target[0].value,
      image: event.target[1].value,
      likes: 0
    })

  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log({
        success: true,
        info: data
      })
    })
}
function editLikesOrToy(event) {
  // console.log(event.target)
  if (event.target.className === 'like-btn') {
    const id = event.target.parentNode.dataset.id
    let pTag = event.target.parentNode.querySelector('p')
    let thisString = pTag.innerText
    let thisStrArray = thisString.split(' ');
    let thisCount = parseInt(thisStrArray[0]);
    thisCount += 1
    // debugger
    // console.log(thisCount)
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({ likes: thisCount })
    })
      .then((res) => {
        return res.json() //this here returns a promise
      })
      .then((data) => {
        pTag.innerText = ` ${thisCount} likes`
      })
  }else if (event.target.className === 'edit-btn') {
    //find the form 
    let editToyForm = document.querySelector('.edit-toy-form');
    let toyName = event.target.parentNode.querySelector('h2').innerText
    let toyImageUrl = event.target.parentNode.querySelector('img').src
    const id = event.target.parentNode.dataset.id
  
    //prepopulare the form 
    let toyNameFormInput = editToyForm.getElementsByTagName('input')[0];
    let toyImageFormInput = editToyForm.getElementsByTagName('input')[1];
    let toyIdFormInput = editToyForm.getElementsByTagName('input')[2]
    
    toyNameFormInput.value = toyName;
    toyImageFormInput.value = toyImageUrl;
    toyIdFormInput.value = id

  }
}

function handleEditSubmitButton(event) {
  
  event.preventDefault();
  let id = event.target.id.value
  let nameInputValue = event.target.name.value;
  let imgInputValue = event.target.image.value;

  let updatedInfo = document.querySelector(`[data-id='${id}']`)
  let header =  updatedInfo.querySelector('h2')
  // let headerValueToBeChanged = header.innerText

  let img = updatedInfo.querySelector('img');

  // console.log(id)
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accepts' : 'application/json'
    },
    body: JSON.stringify({ 
      name: nameInputValue,
      image: imgInputValue
    })
  })
  .then ((res)=>{
      return res.json();
  }).then((data)=>{

    header.innerText = data.name
    img.src = data.image

    event.target.reset()
  })
}

//TODO: Delete Toys 