init();

function init(){
  displayProducts();
}

async function displayProducts()
{
  const response = await fetch('http://localhost:3000/api/products');
  const products = await response.json(); 
  console.log(response);
  
  let item = '';
  let link, article, image, title, paragraph;
  let product;
  if(products.length){
    for (let i = 0; i < products.length; i++) {
      console.log(products[i]);
      product = products[i];
      
      link = document.createElement('a');
      link.setAttribute('href', './product.html?id='+product['_id'])
      
      article = document.createElement('article');
      
      image = document.createElement('img');
      image.setAttribute('src', product['imageUrl'])
      image.setAttribute('alt',product['altTxt'])
      
      article.appendChild(image);
      
      title = document.createElement('h3');
      title.innerText = product['name'];
      article.appendChild(title);
      
      paragraph = document.createElement('p');
      paragraph.innerText = product['description'];
      article.appendChild(paragraph);
      
      
      link.appendChild(article);
      document.querySelector('#items').appendChild(link);
    }

    console.log(products);
    
  }else{
    document.getElementById('items').innerHTML = '<h2>Aucun produits a été trouvé</h2>';
  }
  
}
