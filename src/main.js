import './style.css'

import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67b0f9d000297831df3c');

const databases = new Databases(client);

const form = document.querySelector('form')

form.addEventListener('submit', addAnime)

function addAnime(e){
  e.preventDefault()
  const anime = databases.createDocument(
    '67b0fbd0002a6558e59f',
    '67b3666a0021d047745a',
    ID.unique(),
    { "animeName": e.target.animeName.value }
);
anime.then(function (response) {
  addAnimeToDom()
}, function (error) {
  console.log(error);
});
  form.reset()
}

async function addAnimeToDom(){
  document.querySelector('ul').innerHTML = ''
  let response = await databases.listDocuments(
    "67b0fbd0002a6558e59f",
    "67b3666a0021d047745a",
);
//console.log(response.documents[0])
response.documents.forEach((anime)=>{
  const li = document.createElement('li')
  li.textContent = `${anime.animeName}   `

  li.id = anime.$id

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = '* remove *'
  deleteBtn.onclick = () => removeAnime(anime.$id)
  li.appendChild(deleteBtn)

  document.querySelector('ul').appendChild(li)
})

async function removeAnime(id){
  const result = await databases.deleteDocument(
    '67b0fbd0002a6558e59f', // databaseId
    '67b3666a0021d047745a', // collectionId
    id // documentId
);
document.getElementById(id).remove()
}
// async function updateAnime(id){
//   const result = databases.updateDocument(
//     '67b0fbd0002a6558e59f',
//     '67b3666a0021d047745a',
//     id,
//     {'chat':true}
//   );
//   result.then(function(){location.reload()})
// }

// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// });
// 
}
addAnimeToDom()

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();

// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// });










