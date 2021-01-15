// const { allowedNodeEnvironmentFlags } = require("process");

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});




//load it
addAllToys()
addEventListeners() 
allToys = []
///get all toys (fetch)

//send new toy to server 
function fetchToys(toy) {
  //configuration
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
  }
  //fetch
  fetch('http://localhost:3000/toys', configObj)
    .then(resp => resp.json())
    .then(toy => addAllToys(toy))
    .catch(() => {
      alert("Hey, youre fine")
    })
  }

function addAllToys() {
  return fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => toys.forEach(toy => addToyInfo(toy)))
}
//add toys to page
function addToyInfo(toy) {
  const toyCollection = document.querySelector('#toy-collection')
  //create card 
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let btn = document.createElement('button')
  div.className = 'card'
  img.className = 'toy-avatar'
  btn.className = 'like-btn'
  p.id = toy.name
  //add event listener
  btn.addEventListener('click',addLikes)
  //pass toy to those elements
  h2.textContent = toy.name
  img.src = toy.image
  p.textContent = `Likes: ${toy.likes}`
  btn.textContent = "Like"
  btn.id = toy.id
  allToys.push(toy)
  //append children
  toyCollection.appendChild(div)

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(btn)  

}
//handlesubmit
function handleSubmit(e) {
  e.preventDefault()
  let toy = {
    "name": e.target.name.value,
    "image": e.target.image.value,
    "likes": 0
  }
  fetchToys(toy)
}

function updateLikes(likes, p) {
  p.innerHTML = `Likes: ${likes}`
}
//add Likes to Toys 
function addLikes(e) {
  let selection = parseInt(e.target.id,10)
  let toy = allToys.find(toy => toy.id === selection)
  let p = document.getElementById(`${toy.name}`)
  likes = toy.likes + 1
  p.innerHTML = ` `
  updateLikes(likes, p)
}

//listeners
function addEventListeners() {
  let form = document.querySelector(".add-toy-form")
  form.addEventListener('submit',handleSubmit)
}


