// show product list
function productList(key,value, index){
  console.log(key,value);
    return `<tr>
    <td>${index ++}</td>
    <td>${value.name}</td>
    <td>${value.detail}</td>
    <td><img src="${value.image}" style="width:100px"> </td>
    <td>${value.price}</td>
    <td>
    <button id="category1" type="button" class="btn btn-primary btnedit" data-toggle="modal" data-target="#editProductCenter" data-id="${key}">Edit</button>
    <button type="button" class="btn btn-danger" id="deleteBtn" data-id="${key}" onclick="deleteProduct('${key}')">Delete</button>
    </td>
  </tr>`
}

fetch("https://assignment-b6de4-default-rtdb.firebaseio.com/product.json")
  .then((Response) => Response.json())
  .then((json) => {
    console.log(json);
    let index = 0
    let data = "";
    Object.entries(json).forEach(([key,value]) =>{
      // console.log(value);
      index++
      data += productList(key,value,index);
    })
    document.querySelector('#product').innerHTML = data;
  })
  .catch((err) => console.log(err));

// upload image
const fileInput = document.getElementById('fileInput');
let globalURL = '';
fileInput.addEventListener('change', (e) => {
  e.preventDefault()
  const file = e.target.files[0]
  const reader = new FileReader();
  reader.onload = (event) => {
      const url = event.target.result;
      globalURL = url;
      console.log(url);
    };
    reader.readAsDataURL(file);
})
// Function to add categories
function addProduct({ name, detail, price }) {
  let newName = document.querySelector('#name').value;
  let newDetail = document.querySelector('#detail').value;
  let newPrice= document.querySelector('#price').value;
  console.log(globalURL);
  fetch('https://assignment-b6de4-default-rtdb.firebaseio.com/product.json', {
    method: "POST",
    body: JSON.stringify({
      name: name || newName,
      detail: detail || newDetail,
      price: price || parseInt(newPrice),
      image: globalURL
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    .then((res) => {
      console.log(`Done ${res}`);
      document.querySelector("#addProductForm").reset();
      location.reload();
    })
    .catch((err) => console.log(err));
}

// Event listener for adding categories
document.querySelector('#submitAddProduct').addEventListener('click', (e) => {
  e.preventDefault();
  addProduct({
    name: document.querySelector('#name').value,
    detail: document.querySelector('#detail').value,
    price: document.querySelector('#price').value
  });
});

// Object to handle category editing and saving
const categoryFunctions = {
  click_category_edit: function (e) {
    let id_edit = e.target.dataset.id;
    // eslint-disable-next-line no-undef
    const isEdit = $("#editProductCenter").modal('show');
    if (isEdit) {
      this.Save_Edit(id_edit);
    }
  },
  Save_Edit: function (id) {
    console.log(id);
    const fileInput = document.getElementById('updateFile');
    let updateURL = '';
    fileInput.addEventListener('change', (e) => {
      e.preventDefault()
      const file = e.target.files[0]
      const reader = new FileReader();
      reader.onload = (event) => {
          const url = event.target.result;
          updateURL = url;
          console.log(url);
        };
        reader.readAsDataURL(file);
    })
    const btn_edit = document.querySelector('.editProductBtn');
    const value_edit_product_name = document.querySelector('.productname');
    const value_edit_product_detail = document.querySelector('.productdetail');
    const value_edit_product_price = document.querySelector('.productprice');
    console.log(btn_edit);
    btn_edit.addEventListener('click',(e) =>{
      e.preventDefault()
      fetch(`https://assignment-b6de4-default-rtdb.firebaseio.com/product/${id}.json`, {
              method: 'PUT',
              body: JSON.stringify({
                name: value_edit_product_name.value,
                detail: value_edit_product_detail.value,
                price: value_edit_product_price.value,
                image: updateURL
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
  }
}

// Event listener for editing categories
document.querySelector('#product').addEventListener('click', function (e) {
  if (e.target.classList.contains('btnedit')) {
    categoryFunctions.click_category_edit(e);
  }
});
// delete Product
// eslint-disable-next-line no-unused-vars
function deleteProduct(id) {
  fetch(`https://assignment-b6de4-default-rtdb.firebaseio.com/product/${id}.json`, {
    method: "DELETE",
  })
  .then(() => {
    console.log(`Product ${id} deleted.`);
    location.reload();
  })
  .catch((err) => console.log(err));
}