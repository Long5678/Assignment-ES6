
// show order
function orderList({id, created_date, customer_address, customer_email, customer_name, customer_phone_number, status}){
    return `<tr>
    <td>${id}</td>
    <td>${customer_name}</td>
    <td>${customer_email}</td>
    <td>${customer_address}</td>
    <td>${customer_phone_number}</td>
    <td>${created_date}</td>
    <td>${status}</td>
    <td>
      <a href="#" class="btn btn-primary btn-sm">Edit</a>
      <a href="#" class="btn btn-danger btn-sm">Delete</a>
    </td>
  </tr>`
}
fetch("https://assignment-b6de4-default-rtdb.firebaseio.com/order.json")
.then((Response) => Response.json())
.then((json) => {
    let data = "";
    json.forEach((todo) => {
        data += orderList(todo);
        document.querySelector('#order').innerHTML = data;
        console.log('#id="order"');

    });
} )

// show order_detail
function orderDetailList({order_id, product_id, quantity, unit_price}){
    return `<tr>
    <td>${order_id}</td>
    <td>${product_id}</td>
    <td>${quantity}</td>
    <td>${unit_price}</td>
    <td>
      <a href="#" class="btn btn-primary btn-sm">Edit</a>
      <a href="#" class="btn btn-danger btn-sm">Delete</a>
    </td>
  </tr>`
}
fetch("https://assignment-b6de4-default-rtdb.firebaseio.com/order_details.json")
.then((Response) => Response.json())
.then((json) => {
    let data = "";
    json.forEach((todo) => {
        data += orderDetailList(todo);
        document.querySelector('#orderdetail').innerHTML = data;
        console.log('#id="orderdetail"');

    });
} )