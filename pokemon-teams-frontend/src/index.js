const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const editForm = document.getElementById("edit-form"); 
let editedNode = null
document.addEventListener("DOMContentLoaded", () => {
   //showTrainers();
    }) 
fetch(TRAINERS_URL)
.then(res => res.json())
.then(jsonData => showTrainers(jsonData))
//will show all teams
const showTrainers = (trainerData) => {
trainerData.forEach(trainer => {
    newTrainer(trainer)
    })
}
// appends new card to the thing we want
const newTrainer = (trainer) => {
  const main = document.querySelector("main"); //where to append it
  const div = makeTeamCard(trainer); //creates div for team card
  main.appendChild(div); // sticks it to main (location)
}
// constructs single card
const makeTeamCard = (trainer) => {   //team.id same as the trainers id
  let div = document.createElement("div");
  div.classList.add("card");
  div.setAttribute("data-id", trainer.id); 
  let pTag = document.createElement("p");
  pTag.innerText = trainer.name; 
  let editTrainerButton = document.createElement("button");
  editTrainerButton.textContent = "Edit Trainer";
  editTrainerButton.addEventListener("click", () => {
    //const editForm = document.getElementById("edit-form");
    editForm.style.display = "block";   
    editForm.name.value = trainer.name;
    editForm["trainer-id"].value = trainer.id;
    editedNode = div;
  })
  let addPokemonButton = document.createElement("button");
  addPokemonButton.textContent = "Add Pokemon";
  addPokemonButton.setAttribute("data-trainer-id", trainer.id );
  addPokemonButton.addEventListener("click", () => {
    postPokemon(trainer);
    editedNode = div;
    console.log("add pokemon button working")
  })
  let ul = document.createElement("ul");
  console.log(trainer)
  trainer.pokemons.forEach(pokemon => {
    let listItem = document.createElement('li');
    listItem.innerText = `${pokemon.nickname} (${pokemon.species})`;
    let releasePokemonButton = document.createElement("button");
    releasePokemonButton.innerText = "Release";
    releasePokemonButton.classList.add("release");
    releasePokemonButton.addEventListener('click', () => {
      releasePokemon(pokemon)
      editedNode = div; //sets the editedNode to div. DOM.
      console.log("release buttong working")
    })
    ul.appendChild(listItem);
    listItem.appendChild(releasePokemonButton);
  })
  div.appendChild(pTag);
  div.appendChild(ul);
  div.appendChild(addPokemonButton);
  div.appendChild(editTrainerButton);
  return div;
}
const postPokemon = (trainer) => {
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      trainer_id: trainer.id
    })
  })
  .then(res => res.json())
  .then(trainer => { 
    editedNode.replaceWith(makeTeamCard(trainer))
    editedNode = null
})
}
const releasePokemon = (pokemon) => {
  fetch(`${POKEMONS_URL}/${pokemon.id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(trainer => {
    editedNode.replaceWith(makeTeamCard(trainer))
    editedNode = null
  })
}
//const editForm = document.getElementById("edit-form");
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  editForm.style.display = "none"
  trainer = {
    name: e.target.name.value,
    id: e.target["trainer-id"].value
  }
  updateTrainer(trainer); 
})
const updateTrainer = (trainer) => {
  fetch(`http://localhost:3000/trainers/${trainer.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({trainer})
  })
  .then(res => res.json())
  .then(data => {
    editedNode.replaceWith(makeTeamCard(data))
    editedNode = null
  }) 
}


// Old Code

// const BASE_URL = "http://localhost:3000"
// const TRAINERS_URL = `${BASE_URL}/trainers`
// const POKEMONS_URL = `${BASE_URL}/pokemons`

// let editedNode = null 

// document.addEventListener("DOMContentLoaded", () => {
//     //showTrainers() 

// })

// fetch(TRAINERS_URL)
// .then(response => response.json())
// .then(jsonData => showTrainers(jsonData))


// // will show all teams
// const showTrainers = (trainerData) => {
//     trainerData.forEach(trainer => {
//         newTrainer(trainer)  
//     })
// } 

// // append new card to thing we want
// const newTrainer = (trainer) => {
//     const main = document.querySelector("main")
//     const div = makeTeamCard(trainer) // creates div for team
//     main.appendChild(div) // appends div to the main section 
// }

// // makes a single card 
// const makeTeamCard = (trainer) => {
//     let div = document.createElement("div")
//     div.classList.add("card")
//     div.setAttribute("data-id", trainer.id) 
//     //console.log(team); 

//     let pTag = document.createElement("p")
//     pTag.innerText = trainer.name

//     let editTrainerButton = document.createElement("button")
//     editTrainerButton.innerText = "Edit Trainer" 
//     editTrainerButton.addEventListener("click", () => {
//         // add edit form to HTML
//         let editForm = document.querySelector("form")
//         editForm.style.display = "block" 
//         editForm.name.value = trainer.name
//         editForm["trainer-id"].value = trainer.id 
//         editedNode = div 
//     }) 

//     let addPokemonButton = document.createElement("button")
//     addPokemonButton.textContent = "Add Pokemon"
//     addPokemonButton.setAttribute("data-trainer-id", trainer.id)
//     addPokemonButton.addEventListener("click", () => { 
//         postPokemon(trainer) 
//         editedNode = div  
//         console.log("add button working")  
        
//     }) 

//     let ul = document.createElement("ul")
//     trainer.pokemons.forEach(pokemon => {
//         let listItem = document.createElement("li")
//         listItem.innerText = `${pokemon.nickname} (${pokemon.species})`
//         let releasePokemonButton = document.createElement("button")
//         releasePokemonButton.innerText = "Release"
//         releasePokemonButton.classList.add("release") 
//         //releasePokemonButton.className("release") 
//         releasePokemonButton.addEventListener("click", () => {
//             releasePokemon(pokemon)
//             editedNode = div 
//             console.log("release button working")  
//         })

//         ul.appendChild(listItem)
//         listItem.appendChild(releasePokemonButton) 
        
//     })


//     div.appendChild(pTag) 
//     pTag.appendChild(ul) 
//     pTag.appendChild(addPokemonButton)
//     pTag.appendChild(editTrainerButton)  

//     return div
    

// }

// // adding a pokemon to a team
// const postPokemon = (trainer) => {
//     fetch(POKEMONS_URL, {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({
//             trainer_id: trainer.id 
//         })  
//     })
//     .then(res => res.json())
//     .then(trainer => {
//     editedNode.replaceWith(makeTeamCard(trainer))
//     editedNode = null
//     })       
// }

// // delete a pokemon from a team 
// const releasePokemon = (pokemon) => {
//     fetch(`${POKEMONS_URL}/${pokemon.id}`, {
//        method: "DELETE" 
//     })
//     .then(res => res.json()) 
//     .then(trainer => {
//         editedNode.replaceWith(makeTeamCard(trainer))
//         editedNode = null 
//     }) 
// }

// // edit trainer name info
// const editForm = document.querySelector("form")
// editForm.addEventListener("submit", (e) => {
//     e.preventDefault()
//     trainer = {
//         name: e.target.name.value, 
//         id: e.target["trainer-id"].value 
//     }
//     updateTrainer(trainer)
// })

// const updateTrainer = (trainer) => {
//  //fetch(`${TRAINERS_URL}/${trainer.id}`, {
//     fetch(`http://localhost:3000/trainers/${trainer.id}`, {
//      method: "PATCH",
//      header: {
//         "Content-type": "application/json",
//         "Accept": "application/json"
//      },
//      body: JSON.stringify ({
//          name: trainer.name,
//          id: trainer.id 
//      })   
//  }) 
//  .then(res => res.json())
//  .then(data => {
//      editedNode.replaceWith(makeTeamCard(data))
//      editedNode = null 
//  })
// }
