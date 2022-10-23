init();

function init() {
    displayProducts();
}

async function displayProducts() {
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(products => {
            let item = '';
            let link, article, image, title, paragraph;
            let product;
            if (products.length) {
                for (let i = 0; i < products.length; i++) {
                    product = products[i];

                    link = document.createElement('a');
                    link.setAttribute('href', './product.html?id=' + product['_id'])

                    article = document.createElement('article');

                    image = document.createElement('img');
                    image.setAttribute('src', product['imageUrl'])
                    image.setAttribute('alt', product['altTxt'])

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
            } else {
                document.getElementById('items').innerHTML = '<h2>Aucun produits a été trouvé</h2>';
            }
        })
        .catch(e => {

            document.getElementById('items').innerHTML = '<h2>Un problème est survenu. Veuillez réessayer plus tard.</h2>';
        });

}
