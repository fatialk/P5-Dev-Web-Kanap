const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
document.getElementById('orderId').innerText = urlParams.get('orderId')