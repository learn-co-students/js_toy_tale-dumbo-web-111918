document.addEventListener('DOMContentLoaded', () =>{
  let toyArea = document.querySelector('#toy-collection');
  let addToyForm = document.querySelector('.add-toy-form');
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false



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


  fetch('http://localhost:3000/toys')
  .then((res)=>{
    return res.json();
  })
  .then ((data)=>{
    return toysSlapOnDom(data)
  })

   
  
  function toysSlapOnDom (arr) {
    arr.forEach((el)=>{
    
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
        toyPara.innerText =  `${el.likes} likes`
    
        let toyButton = document.createElement('button')
        toyButton.className = "like-btn"
        toyButton.innerText = 'Like <3 '
        
        let toyEditButton = document.createElement('button');
        toyEditButton.className = 'edit-btn';
        toyEditButton.innerText = 'Edit Toy';

        toyArea.appendChild(toyCardDiv);
        toyCardDiv.append(headerTwo, toyImg, toyPara,toyButton, toyEditButton);
      })
    }

  addToyForm.addEventListener('submit', createNewToy) 


  function createNewToy (event) {
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
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      console.log({
        success :true,
        info: data
      })
    })
  }

    toyArea.addEventListener('click', editLikes)
    //how do i refresh
    function editLikes(event) {
      console.log(event.target)
      //step 1 do event delegation
      //step 2 do conditional 
          if (event.target.className === 'like-btn') {
          const id = event.target.parentNode.dataset.id
          let pTag =  event.target.parentNode.querySelector('p')
          let thisString= pTag.innerText
          let thisStrArray = thisString.split(' ');
          let thisCount = parseInt(thisStrArray[0]); 
          thisCount +=1
          // debugger
          console.log(thisCount)
          //how to I slap this to the DOM ????????????????????????
          fetch(`http://localhost:3000/toys/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accepts': 'application/json'
            },
            body: JSON.stringify({likes: thisCount})
          })
          //do not really need the then 
          .then((res) => {
            return res.json() //this here returns a promise
          })
            .then((data) => {
              // debugger
              // console.log(data);
              pTag.innerText =` ${thisCount } likes`
            })


      }

    
    }




})

// OR HERE!
