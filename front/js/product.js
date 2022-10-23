
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
let price = 0;
init();

function init(){
  
  if(!document.querySelector('section.item'))
  {
    return;
  }
  changeQuantity();
  displayProduct();
  addToCart();
}


function changeQuantity(){
  document.querySelector('#quantity').addEventListener('change', function (){
    
    const qty = document.querySelector('#quantity').value;
    document.querySelector('#price').innerHTML = parseInt(qty) * price;
  
    
  });
  
}

function changeColor(){
  document.querySelector('#color').addEventListener('change', function (){
    
    document.querySelector('#quantity').value = 1;
    document.querySelector('#price').innerHTML = 0;
  
    
  });
  
}

async function displayProduct()
{
  
  fetch('http://localhost:3000/api/products/'+id)
  .then(response => response.json())
  .then(product => {
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
    
    price = product.price;
    document.querySelector('#price').innerHTML = product.price;
    document.querySelector('#quantity').value = 1;
    
    document.querySelector('#description').innerHTML = product.description;
    
  })
  .catch(e => {
    document.querySelector('.item').innerHTML = '<h2>Un problème est survenu. Veuillez réessayer plus tard.</h2>';
  });
  
  
  
}


function addToCart(){
  document.querySelector('#addToCart').addEventListener('click', function (){
    const qty = parseInt(document.querySelector('#quantity').value);
    if(qty <= 0)
    {
      alert('Veuillez saisir une quantité valide');
      return; 
    }
    const productToCart = {
      'color':document.querySelector('#colors').value,
      'qty': parseInt(document.querySelector('#quantity').value),
      'id':id,
    };
    if(refreshCart(productToCart, document.querySelector('#quantity')))
    {
      // message ajout d'article au panier 
      alert('le produit a été ajouté au panier !');
    }
    
    
    
  });
  
}

