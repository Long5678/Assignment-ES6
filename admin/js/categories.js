//show categories
function buildcategories({id, name},index){
    return `<tr>
    <td>${index+1}</td>
    <td>${name}</td>
    <td>
    <button id="${id}" type="button" class="btn btn-primary btnedit" data-toggle="modal" data-target="#EditModalCenter" data-id="${id}">Edit</button>
      <button type="button" class="btn btn-danger" id="deleteBtn" data-id="${id}">Delete</button>
    </td>
  </tr>
  </tr>`;
}

fetch("https://assignment-b6de4-default-rtdb.firebaseio.com/categories.json")
  .then((Response) => Response.json())
  .then((json) => {
    let data = "";
    Object.values(json).forEach((todo, index) => {

      data += buildcategories(todo, index);
    });
    document.querySelector('#categories').innerHTML = data;
    console.log('#id="categories"');
    console.log(json);
  })
  .catch((err) => console.log(err));


// add categories
function addCategories({name}){
  let data = document.querySelector( '#categoryInput' ).value;
  
   fetch('https://assignment-b6de4-default-rtdb.firebaseio.com/categories.json', {
     method: "POST",
     body: JSON.stringify({
       name: name || data
     }),
     headers: {
         "Content-Type": "application/json; charset=utf-8"
     }
   })
   .then((res)=>{
     console.log(`Done ${res}`);
     document.querySelector("#addCategory").reset();
     location.reload() ;
   }).catch((err)=>console.log(err));
}

document.querySelector('#submitAddCat').addEventListener('click', (e) => {
  e.preventDefault();
  addCategories({
    name : document.querySelector('#categoryInput').value
  });
});

// edit categories
function  getIdUpdate(){
  let btnedit = document.querySelectorAll('.btnedit');
  btnedit.forEach((btn) => {
    btn.addEventListener('click', () => {
      let id = btn.id;
      window.localStorage.setItem("cat_id", id);
    });
  });
}
getIdUpdate();

let updateData = {};
function showUpdateForm(id){
  updateData = {...updateData, ...JSON.parse(window.localStorage.getItem("cats"))[id]};
  document.querySelector(".formEdit").style.display="block";
  document.querySelector("#nameE").value = updateData.name;
}

document.querySelector("#closeBtn").addEventListener("click", function(){
  document.querySelector(".formEdit").style.display="none";
})

document.querySelector("#saveChanges").addEventListener("click", function submitUpdate(){
  updateData.name=document.querySelector("#nameE").value;
  updateCategories(updateData).then(()=>{
    document.querySelector(".formEdit").style.display="none";
    window.localStorage.removeItem("cat_id");
    location.reload();
  })
});

let catButtons = document.querySelectorAll('.editBtn')
for (let i = 0; i < catButtons.length; i++) {
  if (catButtons[i]) {
    catButtons[i].addEventListener('click', (e) => {
      // event listener code here
      let id = e.target.dataset.id;
    let name = e.target.parentNode.previousElementSibling.textContent;
    document.querySelector(".modal-title1").innerHTML = `Update Category - "${name}"`;
    document.querySelector("#updateCategory").action = `./categories.html?id=${id}`;
    document.querySelector('#cat').value = name;
    });
  }
}


// update categories
function updateCategories(id, {name}){
  let data = document.querySelector( `#catinput${id}`).value;
  // console.log(data);
  fetch(`https://assignment-b6de4-default-rtdb.firebaseio.com/categories/${id}.json`, {
    method: 'PUT',
    body: JSON.stringify({
      name: name || data
    }),
    headers:(
      "Content-type=application/json" + ";charset=utf-8"
    )
    },
  ).then(()=>location.assign("./index.html")).catch((error)=>{
    alert("Error! Please try again");
    console.log(error);
  });
}

document.querySelector('#updateForm').addEventListener('submit', (e) => {
  e.preventDefault()
  let id = location.search.split("=")[1];
  updateCategories(id, {
    name: document.querySelector('#cat').value
  });
});

