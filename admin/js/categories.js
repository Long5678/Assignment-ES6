// Function to build categories table rows
function buildcategories( key,value, index){
  console.log(key,value);
  return `
    <tr>
      <td>${index++}</td>
      <td>${value.name}</td>
      <td>
        <button id="category1" type="button" class="btn btn-primary btnedit" data-toggle="modal" data-target="#EditModalCenter" data-id="${key}">Edit</button>
        <button type="button" class="btn btn-danger" id="deleteBtn" data-id="${key}" onclick="deleteCategory('${key}')">Delete</button>
      </td>
    </tr>
  `;
}

// Fetch categories from Firebase and build the table
fetch("https://assignment-b6de4-default-rtdb.firebaseio.com/categories.json")
  .then((Response) => Response.json())
  .then((json) => {
    console.log(json);
    let index = 0
    let data = "";
    Object.entries(json).forEach(([key,value]) =>{
      // console.log(value);
      index++
      data += buildcategories(key,value,index);
    })
    // Object.values(json).forEach(([todo, index]) => {
    //   // console.log(todo,index);
    //   // data += buildcategories(todo, index);
    // });
    document.querySelector('#categories').innerHTML = data;
    // console.log('#categories');
    // console.log(json);
  })
  .catch((err) => console.log(err));

// Function to add categories
function addCategories({ name }) {
  let data = document.querySelector('#categoryInput').value;

  fetch('https://assignment-b6de4-default-rtdb.firebaseio.com/categories.json', {
    method: "POST",
    body: JSON.stringify({
      name: name || data
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    .then((res) => {
      console.log(`Done ${res}`);
      document.querySelector("#addCategory").reset();
      location.reload();
    })
    .catch((err) => console.log(err));
}

// Event listener for adding categories
document.querySelector('#submitAddCat').addEventListener('click', (e) => {
  e.preventDefault();
  addCategories({
    name: document.querySelector('#categoryInput').value
  });
});

// Object to handle category editing and saving
const categoryFunctions = {
  click_category_edit: function (e) {
    let id_edit = e.target.dataset.id;
    // eslint-disable-next-line no-undef
    const isEdit = $("#EditModalCenter").modal('show');
    if (isEdit) {
      this.Save_Edit(id_edit);
    }
  },
  Save_Edit: function (id) {
    console.log(id);
    const btn_edit = document.querySelector('.editBtn');
    const value_edit_category = document.querySelector('.cate');
    console.log(btn_edit);
    btn_edit.addEventListener('click',(e) =>{
      e.preventDefault()
      fetch(`https://assignment-b6de4-default-rtdb.firebaseio.com/categories/${id}.json`, {
              method: 'PUT',
              body: JSON.stringify({
                name: value_edit_category.value
              })
            })
            .then((res) => res.json())
            .then(data => {
              console.log('edit is success');
              console.log(data);
              location.reload()
            })
            .catch(err =>{
              console.log('error edit ',err);
            })
    })
    // if (btn_edit && document.querySelector('#categoryInput')) {
    //   btn_edit.addEventListener('click',  (e) => { 
    //     e.preventDefault();
    //     const value_edit_category = document.querySelector('#categoryInput');
    //     console.log(value_edit_category.value);
    //     // fetch(`https://assignment-b6de4-default-rtdb.firebaseio.com/categories/${id}.json`, {
    //     //   method: 'PUT',
    //     //   body: JSON.stringify({
    //     //     name: value_edit_category.value
    //     //   })
    //     // }).then(() => location.reload());
    //   });
    // }
  }
}

// Event listener for editing categories
document.querySelector('#categories').addEventListener('click', function (e) {
  if (e.target.classList.contains('btnedit')) {
    categoryFunctions.click_category_edit(e);
  }
});
// deleta category
// eslint-disable-next-line no-unused-vars
function deleteCategory(id) {
  fetch(`https://assignment-b6de4-default-rtdb.firebaseio.com/categories/${id}.json`, {
    method: "DELETE",
  })
  .then(() => {
    console.log(`Category ${id} deleted.`);
    location.reload();
  })
  .catch((err) => console.log(err));
}