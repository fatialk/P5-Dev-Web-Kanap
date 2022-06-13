init();

function init() {
    if (!document.querySelector('section#cart__items')) {
        return;
    }
    displaycart();
    sendOrder()
}


function displaycart() {

    let localCart = [];

    if (localStorage.getItem('cart')) {
        localCart = JSON.parse(localStorage.cart);
    }

    if (localCart.length) {
        let count = 0;
        //si localCart on a ajouté le localStorage.cart
        localCart.forEach(async element => {

            const response = await fetch('http://localhost:3000/api/products/' + element.id);
            const product = await response.json();
            createArticle(product, element);
            count++;
            if (count === localCart.length) {
                total();
            }
        });

    } else {
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
    p2.innerText = new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(product.price);
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
    input.value = parseInt(cartElement.qty);
    input.onchange = modifyQuantity;
    div5.appendChild(input);
    // div6 cart__item__content__settings__delete

    div6 = document.createElement('div');
    div6.classList.add('cart__item__content__settings__delete');
    div4.appendChild(div6);
    p4 = document.createElement('p');
    p4.classList.add('deleteItem');
    p4.innerText = 'Supprimer';
    p4.onclick = removeProductFromCart;
    div6.appendChild(p4);

    document.querySelector('#cart__items').appendChild(article);

}

function total() {
    let inputsQty = document.querySelectorAll('.itemQuantity');
    let price = 0;
    let count = 0;
    inputsQty.forEach(async inputQty => {
        const parentArticle = inputQty.closest('article.cart__item');
        const productId = parentArticle.dataset.id;
        const qty = parseInt(inputQty.value);
        const response = await fetch('http://localhost:3000/api/products/' + productId);
        const product = await response.json();
        price += product.price * qty;
        count++;
        if (count === inputsQty.length) {
            document.getElementById('totalQuantity').innerText = count.toString();
            document.getElementById('totalPrice').innerText = price;
        }
    });
}

function modifyQuantity(e) {
    //code pour ajouter/dimiunuer qte storage
    const parentArticle = e.target.closest('article.cart__item');
    const productToCart = {
        'color': parentArticle.dataset.color,
        'qty': parseInt(e.target.value),
        'id': parentArticle.dataset.id,
    };
    refreshCart(productToCart, true);
    total();
}

function refreshCart(productToCart, newQty = false) {

    // if regarder si la qty > 0 && qty < 101
    if (productToCart.qty <= 0 || productToCart.qty > 101) {
        alert('La quantité doit être comprise entre 1 et 100 !');
        return;
    }

    if (productToCart.color === '') {
        alert('La couleur doit être renseignée !');
        return;
    }

    let localCart = [];

    if (localStorage.getItem('cart')) {
        localCart = JSON.parse(localStorage.cart);
    }


    if (localCart.length) {
        //si localCart on a ajouté le localStorage.cart
        let cartModified = false;
        localCart.forEach(element => {
            if (element.id === productToCart.id && element.color === productToCart.color) {
                if (newQty) {
                    // si on arrive du panier, la quantité est celle envoyée
                    element.qty = productToCart.qty;
                } else {
                    // si on vient de la fiche produit, la quantité est incrémentée
                    element.qty += productToCart.qty;
                }

                cartModified = true;
            }
        });
        if (cartModified === false) {
            localCart.push(productToCart)
        }
        localStorage.setItem('cart', JSON.stringify(localCart))
    } else {
        //le localstorage est vide
        localCart.push(productToCart);
        localStorage.setItem('cart', JSON.stringify(localCart))
    }
}

function removeProductFromCart(e) {
    const parentArticle = e.target.closest('article.cart__item');
    const productColor = parentArticle.dataset.color;
    const productId = parentArticle.dataset.id;
    let localCart = [];

    if (!localStorage.getItem('cart')) {
        alert('Aucun panier n\'est disponible');
        return;
    }

    localCart = JSON.parse(localStorage.cart);
    localCart.forEach(function (element, index) {
        if (element.id === productId && element.color === productColor) {
            localCart.splice(index, 1);
            document.querySelector('[data-id="' + productId + '"]').remove();
        }
    });
    localStorage.setItem('cart', JSON.stringify(localCart));
    total();
}

function sendOrder() {
    document.querySelector('#order').addEventListener('click', async function (e) {
        e.preventDefault();
        const inputFirstName = document.querySelector('#firstName');
        const inputLastName = document.querySelector('#lastName');
        const inputAddress = document.querySelector('#address');
        const inputCity = document.querySelector('#city');
        const inputEmail = document.querySelector('#email');

        if (!localStorage.getItem('cart')) {
            alert('Aucun panier n\'est disponible');
            return;
        }

        if(validateEmail(inputEmail) && validateName(inputFirstName) && validateName(inputLastName))
        {
            const contact = {
                'firstName': inputFirstName.value,
                'lastName': inputLastName.value,
                'address': inputAddress.value,
                'city': inputCity.value,
                'email': inputEmail.value
            }
            const ids = getProductIdsFromCart();
            console.log(JSON.stringify({
                'contact' : contact,
                'products' : ids
            }));
            const response = await fetch('http://localhost:3000/api/products/order', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'contact' : contact,
                    'products' : ids
                })
            });
            const responseJson = await response.json();
            window.location.href = 'confirmation.html?orderId='+responseJson.orderId
        }

    });
}

function validateEmail(inputText)
{
    const mailformat = /^[a-zA-Z0-9._~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]*$/;
    if(!inputText.value.match(mailformat))
    {
        alert("Adresse mail invalide");
        inputText.focus();
        return false;
    }

    return true;
}

function validateName(inputText)
{
    const nameFormat = /^[a-zA-Z-\s]*$/;
    if(!inputText.value.match(nameFormat))
    {
        alert("Nom ou prénom invalide");
        inputText.focus();
        return false;
    }

    return true;
}

function getProductIdsFromCart()
{
    let ids = [];
    const localCart = JSON.parse(localStorage.cart);
    localCart.forEach(function (element) {
        ids.push(element.id);
    });

    return ids;

}

