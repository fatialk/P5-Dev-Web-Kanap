

const searchProducts = async () => {
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json(); 
    console.log(response);
    console.log(products);
    let item = '';
    let product;
    for (let i = 0; i < products.length; i++) {
      
      console.log(products[i]);
      product = products[i];
      item += `<a href="./product.html?id=`+product['_id']+`">
      <article>
        <img src="`+product['imageUrl']+`" alt="`+product['altTxt']+`">
        <h3 class="productName">`+product['name']+`</h3>
        <p class="productDescription">`+product['description']+`</p>
      </article>
    </a>`;
    }
    const items = document.getElementById('items');
    items.innerHTML = item;
  }
  searchProducts();
