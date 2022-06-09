init();

function init(){
  displaycart();
  total();
}


function displaycart()
{
  
  let localCart = [];
  
  if (localStorage.getItem('cart'))
  {
    localCart = JSON.parse(localStorage.cart);
  }
  
  if(localCart.length){
    //si localCart on a ajouté le localStorage.cart
    let cartQty = 0;
    let total = 0;
    localCart.forEach(async element => {
      
      const response = await fetch('http://localhost:3000/api/products/'+element.id);
      const product = await response.json();
     
      createArticle(product, element);
      
    });
    
  }else{
    //le localstorage est vide AFFICHAGE message panier vide
    
  }
  
}

function createArticle(product, cartElement) {
  
  article = document.createElement('article');
  article.classList.add('cart__item');
  article.setAttribute('data-id', product._id);
  article.setAttribute('data-color', cartElement.color);
 
  

  // div1 cart__item__img
  
  div1 = document.createElement('div');
  div1.classList.add('cart__item__img');
  article.appendChild(div1);
  
 
  
  image = document.createElement('img');
  image.setAttribute('src', product.imageUrl);
  image.setAttribute('alt', product.altTxt);
  div1.appendChild(image);
  
 
  
  // div2 cart__item__content
  
  div2 = document.createElement('div');
  div2.classList.add('cart__item__content');
  article.appendChild(div2);
  
  // div3 cart__item__content__description
  
  div3 = document.createElement('div');
  div3.classList.add('cart__item__content__description');
  div2.appendChild(div3);
  
  
  title = document.createElement('h2');
  title.innerText = product.name;
  div3.appendChild(title);
  
  p1 = document.createElement('p');
  p1.innerText = cartElement.color;
  div3.appendChild(p1);
  
  p2 = document.createElement('p');
  p2.innerText = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price);
  div3.appendChild(p2);
  
  
  // div4 cart__item__content__settings
  
  div4 = document.createElement('div');
  div4.classList.add('cart__item__content__settings');
  div2.appendChild(div4);
  
  // div5 cart__item__content__settings__quantity

  div5 = document.createElement('div');
  div5.classList.add('cart__item__content__settings__quantity');
  div4.appendChild(div5);
  p3 = document.createElement('p');
  p3.innerText = 'Qté :';
  div5.appendChild(p3);
  input = document.createElement('input');
  input.setAttribute('type', 'number');
  input.classList.add('itemQuantity')
  //input.setAttribute('class', 'itemQuantity');
  input.setAttribute('min', '1');
  input.setAttribute('max', '100');
  input.value =  parseInt(cartElement.qty);
  input.onchange = modifyQuantity;
  div5.appendChild(input);
  // div6 cart__item__content__settings__delete

  div6 = document.createElement('div');
  div6.classList.add('cart__item__content__settings__delete');
  div4.appendChild(div6);
  p4 = document.createElement('p');
  p4.classList.add('deleteItem');
  p4.innerText = 'Supprimer';
  div6.appendChild(p4);

  

  document.querySelector('#cart__items').appendChild(article);

//regex
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
}
function total(){
  let inputsQty = document.querySelectorAll('.itemQuantity');
  console.log(inputsQty)
} 

function modifyQuantity(){
  //code pour ajouter/dimiunuer qte storage

  total();
}