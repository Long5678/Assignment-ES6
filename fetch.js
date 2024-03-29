function buildTrData({image, name, price}){
    return `<div class="col-xl-3 col-lg-4 col-md-4 col-12" >
    <div class="single-product">
      <div class="product-img">
        <a href="product-details.html">
          <img class="default-img" src="${image}" alt="#">
          <img class="hover-img" src="${image}" alt="#">
        </a>
        <div class="button-head">
          <div class="product-action">
            <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="#"><i class=" ti-eye"></i><span>Quick Shop</span></a>
            <a title="Wishlist" href="#"><i class=" ti-heart "></i><span>Add to Wishlist</span></a>
            <a title="Compare" href="#"><i class="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
          </div>
          <div class="product-action-2">
            <a title="Add to cart" href="#">Add to cart</a>
          </div>
        </div>
      </div>
      <div class="product-content">
        <h3><a href="product-details.html">${name}</a></h3>
        <div class="product-price">
          <span>${price}</span>
        </div>
      </div>
    </div>
  </div>
  
`;
}


// hot Item

fetch("https://assignment-b6de4-default-rtdb.firebaseio.com/product.json")
.then((Response) => Response.json())
.then((json) => {
    let data = "";
    let count = 0;
    json.forEach((todo) => {
        if(count>=4){
          return 
        }
        data += buildTrData(todo);
        document.querySelector('#productslide').innerHTML = data;
        console.log('#id="productslie"');
        count ++;
    });
} )

function buildTrData2({image, name, price}){
  return `<div class="col-lg-4 col-md-6 col-12">
  <div class="single-product">
    <div class="product-img">
      <a href="product-details.html">
        <img class="default-img" src="${image}" alt="#">
        <img class="hover-img" src="${image}" alt="#">
      </a>
      <div class="button-head">
        <div class="product-action">
          <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="#"><i class=" ti-eye"></i><span>Quick Shop</span></a>
          <a title="Wishlist" href="#"><i class=" ti-heart "></i><span>Add to Wishlist</span></a>
          <a title="Compare" href="#"><i class="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
        </div>
        <div class="product-action-2">
          <a title="Add to cart" href="#">Add to cart</a>
        </div>
      </div>
    </div>
    <div class="product-content">
      <h3><a href="product-details.html">${name}</a></h3>
      <div class="product-price">
        <span>${price}</span>
      </div>
    </div>
  </div>
</div>

`;
}

fetch("https://assignment-b6de4-default-rtdb.firebaseio.com/product.json")
  .then((Response) => Response.json())
  .then((json) => {
      let data = "";
      json.forEach((todo) => {
          data += buildTrData2(todo);
          document.querySelector('#shop-grid').innerHTML = data;
          console.log('#shop-grid');
      });
  } )
