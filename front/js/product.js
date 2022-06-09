
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id);
init();

function init(){
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
  document.querySelector('#addToCart').addEventListener('click', function(){
    
    //const color = document.querySelector('#colors').value;
    //const qty = document.querySelector('#quantity').value; 

    let productToCart = {
      'color':document.querySelector('#colors').value,
      'qty': parseInt(document.querySelector('#quantity').value),
      'id':id,
    };

    // if regarder si la qty > 0 && qty < 101
    if(productToCart.qty <= 0 || productToCart.qty >101){
      alert('La quantité doit être comprise entre 1 et 100 !');
      return;
    }
console.log(productToCart.color);
    if(productToCart.color == '' ){
      alert('La couleur doit être renseignée !');
      return;
    }

    let localCart = [];

    if (localStorage.getItem('cart'))
    {
      localCart = JSON.parse(localStorage.cart);
    }

   
    if(localCart.length){
      //si localCart on a ajouté le localStorage.cart
      let cartModified = false;
      localCart.forEach(element => {
        if(element.id == productToCart.id && element.color == productToCart.color){
          element.qty +=  productToCart.qty;
            cartModified = true;
        }
      });
      if(cartModified == false){
        localCart.push(productToCart)
      }
      localStorage.setItem('cart', JSON.stringify(localCart))
    }else{
      //le localstorage est vide
      localCart.push(productToCart);
      localStorage.setItem('cart', JSON.stringify(localCart))
    }


    
  })
}

