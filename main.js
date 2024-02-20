let data = document.querySelector('.product1')

fetch("https://fakestoreapi.com/products", {
  method: "POST",
  body: JSON.stringify({
    name: data.value,
    
  }),
})
  .then((res) => res.json())
  .then((json) => console.log(json));

/* will return
{
 id:31,
 title:'...',
 price:'...',
 category:'...',
 description:'...',
 image:'...'
}
*/

