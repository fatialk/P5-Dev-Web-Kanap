
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id);
init();

function init(){
  if(!document.querySelector('section.item'))
  {
    return;
  }
  displayProduct();
  addToCart();
}

async function displayProduct()
{
  const response = await fetch('http://localhost:3000/api/products/'+id);
  const product = await response.json(); 
  
  
  let colorsHtml = '';
  let colors = product['colors'];
  let option;
  
  for (let i = 0; i < colors.length; i++){
    
    option = document.createElement('option');
    option.setAttribute('value', colors[i]);
    option.innerText = colors[i];
    
    document.querySelector('#colors').appendChild(option);
    
    
  }
  
  let image = document.createElement('img');
  image.setAttribute('src', product.imageUrl)
  image.setAttribute('alt',product.altTxt)
  document.querySelector('.item__img').appendChild(image)
  
  document.querySelector('#title').innerHTML = product.name;
  
  document.querySelector('#price').innerHTML = product.price;
  
  document.querySelector('#description').innerHTML = product.description;
  
  
}


function addToCart(){
  document.querySelector('#addToCart').addEventListener('click', function (){
    const productToCart = {
      'color':document.querySelector('#colors').value,
      'qty': parseInt(document.querySelector('#quantity').value),
      'id':id,
    };
    refreshCart(productToCart);
  });
}

