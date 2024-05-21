// bejelentkezett felhasználó email címének lekérdezése
async function getUserEmail() {
    try {
        const response = await fetch('/getUserEmail');
        const data = await response.json();
    } catch (error) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 8000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = false;
                toast.onmouseleave = false;
            }
        });
        Toast.fire({

            text: 'Error',
            icon: 'warning',
            heightAuto: false,
        })(error);
    }
}

async function fetchProduct() {
    const response = await fetch('/product');
    const termekek = await response.json();

    drawing(termekek);
}

//oldal frissitese
document.getElementById('refreshButton').addEventListener('click', function() {
    location.reload();
  });
  
// keresés a termékek között
document.getElementById('searchingForm').onsubmit = async function (event) {
    event.preventDefault();

    const searching = event.target.elements.searching.value;
    const searchingTypeColumns = {
        1: 'Name',
        2: 'Size',
        3: 'Color',
        4: 'Cathegory',
        5: 'Price',
        6: 'Stock'
    }
    const searchingType = searchingTypeColumns[event.target.elements.searchingType.value];

    let shouldFetch = true;
    if (searching === '') {
        alert('Adj meg valamit');
        shouldFetch = false;
    } else if (searchingType === 'Size') {
        if (searching !== 'XS' && searching !== 'S' && searching !== 'M' && searching !== 'L' && searching !== 'XL' && searching !== 'XXL') {
            alert('Csak XS, S, M, L, XL vagy XXL méretet adhatsz meg!');
            shouldFetch = false;
        }
    } else if (searchingType === 'Color') {
        if (searching !== 'Blue' && searching !== 'Black' && searching !== 'White' && searching !== 'Red' && searching !== 'Green') {
            alert('Csak Blue, Black, White, Red, Green szineket adhatsz meg!');
            shouldFetch = false;
        }
    } else if (searchingType === 'Cathegory') {
        if (searching !== 'Dress' && searching !== 'Hoodies' && searching !== 'Manjacket' && searching !== 'Tops' && searching !== 'Woman') {
            alert('Csak Cathegory típusokat adhatsz meg!');
            shouldFetch = false;
        }
    }

    if (shouldFetch) {
        const res = await fetch('/searching', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ searching, searchingType })
        });

        const termekek = await res.json();

        if (termekek.length === 0) {
            document.getElementById('product-list').innerHTML = '<h3 class="text-center m-4">None</h3>';
        } else {
            drawing(termekek);
        }
    }
}

function drawing(termekek) {

    let productHTML = '<h1 class="mt-2 mb-2">Clothes</h1>';

    // termék lista , sort=rendezés "névtelen függvény" véletlen szerűen szűri ki a termékeket 0-és 1 között, 

    termekek.sort(function () { return -0.5, 0.5 + - Math.random() });

    for (let termek of termekek) {

        console.log(termek);
        const price = termek.price === '' ? 'no price' : `${termek.price}`;

        productHTML += `
            <div class="col-xl-2 col-lg-2 col-md-4 col-sm-8 ">
                <div class="card  text-dark my-1 h-70" >
                    <div class="card-header">
                        <img id="kep${termek.productID}" class="zoom-effect" src="/images/${termek.img}" alt="${termek.name}" title="${termek.name}" class="img img-fluid img-thumbnail mx-auto d-block">
                    </div>
                    <div class="card-body  ">
                        <h6 id="nev${termek.productID}">Name: ${termek.name}</h6>
                        <h6 id="ar${termek.productID}">Price: ${price}$</h6>
                        <h6 id="meret${termek.productID}">Size: ${termek.size}</h6>
                        <h6 id="szin${termek.productID}">Color: ${termek.color}</h6>
                        <h6>Cathegory: ${termek.cathegory}</h6>
                        <h6>Stock: ${termek.stock}</h6>
                    </div>
                    <div class="card-footer">
                        <button type="button" class="btn btn-dark" onclick="cart(${termek.productID})">
                            <i class="fa-solid fa-basket-shopping"></i>
                        </button> 
                    </div>
                </div>
            </div>
        `
    }

    document.getElementById('product-list').innerHTML = productHTML;
}

// A kosár oldalról beúszó ablak megjelenítése (offcanvas)
function cart(productID) {
    // Ellenőrizzük, hogy a productID legalább 1
    if (productID < 1) {
        // Ha a productID kisebb, mint 1, állítsuk be azt 1-re
        productID = 1;
    }

    var kep = document.getElementById(`kep${productID}`).src;
    var nev = document.getElementById(`nev${productID}`).textContent;
    var meret = document.getElementById(`meret${productID}`).textContent;
    var ar = document.getElementById(`ar${productID}`).textContent;
    var szin = document.getElementById(`szin${productID}`).textContent;

    document.getElementById(`cartkep`).src = kep;
    document.getElementById(`cartnev`).innerHTML = nev;
    document.getElementById(`cartar`).innerHTML = ar;
    document.getElementById(`cartszin`).innerHTML = szin;
    document.getElementById(`cartmeret`).innerHTML = meret;

    console.log(productID);
    const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasKosar'));
    const id = document.getElementById('offcanvasKosar');
    id.setAttribute('data-productID', productID);
    offcanvas.show();
}

async function CartPrepare() {
    const offcanvasElements = document.getElementById('offcanvasKosar');
    const res = await fetch('/getUserEmail');
    const data = await res.json();
    const userID = data.userID;
    const productID = offcanvasElements.getAttribute('data-productID');
    const priceWithDollar = (document.getElementById('cartar').innerText).split(' ')[1];
    const price = priceWithDollar.split('$')[0];
    const stock = document.getElementById('buyingStock').value;

    const res2 = await fetch(`/product/${productID}`);
    const data2 = await res2.json();

    const availableStock = data2[0].stock;

    if (stock > availableStock) {
        Swal.fire({
            icon: 'warning',
            text: `Csak ${availableStock} db elérhető!`,
            customClass: {
                container: 'custom-swal-container', // Testreszabott konténer osztály
                popup: 'custom-swal-popup', // Testreszabott párbeszédpanel osztály
                title: 'custom-swal-title', // Testreszabott cím osztály
                htmlContainer: 'custom-swal-html-container', // Testreszabott HTML konténer osztály
                confirmButton: "#DD6B55", // Testreszabott megerősítő gomb osztály
                cancelButton: 'custom-swal-cancel-button-warning', // Testreszabott megszakító gomb osztály
                close: 'custom-swal-close-button', // Testreszabott bezáró gomb osztály
                icon: 'custom-swal-icon', // Testreszabott ikon osztály
                image: 'custom-swal-image', // Testreszabott kép osztály
                input: 'custom-swal-input', // Testreszabott input mező osztály
                actions: 'custom-swal-actions', // Testreszabott akciók osztály
                loader: 'custom-swal-loader', // Testreszabott töltő ikon osztály
                footer: 'custom-swal-footer', // Testreszabott lábléc osztály
                backdrop: 'custom-swal-backdrop', // Testreszabott háttér osztály
                showConfirmButton: 'custom-swal-show-confirm-button', // Testreszabott megerősítő gomb megjelenítés osztály
                showCancelButton: 'custom-swal-show-cancel-button', // Testreszabott megszakító gomb megjelenítés osztály
            }
        });
    } else {
        AddToCart(userID, productID, price, stock);
    }
}

async function AddToCart(userID, productID, price, stock) {

    const res = await fetch(`/cartSession/${userID}/${productID}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ price, stock })
    });
    const data = await res.json();

    if (data.success) {
        alert('added to cart');
    } else {
        alert(JSON.stringify(data));
    }
}

async function ordering() {
    const res = await fetch('/cartSession');
    const data = await res.json();
    console.log(data);
    let price = 0;
    const userID = data[0].userID;

    for (let termek of data) {
        price+=termek.allPrice;
    }

    const res2 = await fetch(`/ordering/${userID}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ price })
    });

    for (const termek of data) {
        const userID = termek.userID;
        const productID = termek.productID;
        const stock = termek.currentStock;
        const price = termek.allPrice;
        const res3 = await fetch('/cart', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ userID, productID, stock, price })
        });
    }
    
    window.location.href='/pay.html';
}


/*
function AddToCart(id) {
    fetch('/buying/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: id })
    })
    .then(response => {
        if (response.ok) {
            const cart = productID
        } else {
            Swal.fire({
         
                text: 'Successful Update!',
                icon: 'danger',
                customClass: {
                  container: 'custom-swal-container', // Testreszabott konténer osztály
                  popup: 'custom-swal-popup', // Testreszabott párbeszédpanel osztály
                  title: 'custom-swal-title', // Testreszabott cím osztály
                  htmlContainer: 'custom-swal-html-container', // Testreszabott HTML konténer osztály
                  confirmButton: "#DD6B55", // Testreszabott megerősítő gomb osztály
                  cancelButton: 'custom-swal-cancel-button-warning', // Testreszabott megszakító gomb osztály
                  close: 'custom-swal-close-button', // Testreszabott bezáró gomb osztály
                  icon: 'custom-swal-icon', // Testreszabott ikon osztály
                  image: 'custom-swal-image', // Testreszabott kép osztály
                  input: 'custom-swal-input', // Testreszabott input mező osztály
                  actions: 'custom-swal-actions', // Testreszabott akciók osztály
                  loader: 'custom-swal-loader', // Testreszabott töltő ikon osztály
                  footer: 'custom-swal-footer', // Testreszabott lábléc osztály
                  backdrop: 'custom-swal-backdrop', // Testreszabott háttér osztály
                  showConfirmButton: 'custom-swal-show-confirm-button', // Testreszabott megerősítő gomb megjelenítés osztály
                  showCancelButton: 'custom-swal-show-cancel-button', // Testreszabott megszakító gomb megjelenítés osztály
                }
              }) (response.statusText);
        }
    })
    .catch(error => {
        Swal.fire({
         
            text: 'Successful Update!',
            icon: 'danger',
            customClass: {
              container: 'custom-swal-container', // Testreszabott konténer osztály
              popup: 'custom-swal-popup', // Testreszabott párbeszédpanel osztály
              title: 'custom-swal-title', // Testreszabott cím osztály
              htmlContainer: 'custom-swal-html-container', // Testreszabott HTML konténer osztály
              confirmButton: "#DD6B55", // Testreszabott megerősítő gomb osztály
              cancelButton: 'custom-swal-cancel-button-warning', // Testreszabott megszakító gomb osztály
              close: 'custom-swal-close-button', // Testreszabott bezáró gomb osztály
              icon: 'custom-swal-icon', // Testreszabott ikon osztály
              image: 'custom-swal-image', // Testreszabott kép osztály
              input: 'custom-swal-input', // Testreszabott input mező osztály
              actions: 'custom-swal-actions', // Testreszabott akciók osztály
              loader: 'custom-swal-loader', // Testreszabott töltő ikon osztály
              footer: 'custom-swal-footer', // Testreszabott lábléc osztály
              backdrop: 'custom-swal-backdrop', // Testreszabott háttér osztály
              showConfirmButton: 'custom-swal-show-confirm-button', // Testreszabott megerősítő gomb megjelenítés osztály
              showCancelButton: 'custom-swal-show-cancel-button', // Testreszabott megszakító gomb megjelenítés osztály
            }
          })( error);
    });
}
*/

/*function drawing(termekek){
  let productHTML = '<h1 class="mt-2 mb-2">KIISÁR</h1>';

    for (let termek of termekek){
        productHTML += `
         <div class="col-xl-2 col-lg-2 col-md-4 col-sm-8 ">
                <div class="card  text-dark my-1 h-70">
                    <div class="card-header">
                     <div class="img">
                        <img class="zoom-effect" src="/images/${termek.img}" alt="${termek.name}" title="${termek.name}" class="img img-fluid img-thumbnail mx-auto d-block">
                        </div>
                    </div>

                    <div class="card-body">
                        <h6>Name: ${termek.name}</h6>
                        <h6>Price: ${price}</h6>
                        <h6>Size: ${termek.size}</h6>
                        <h6>Color: ${termek.color}</h6>
                        <h6>Cathegory: ${termek.cathegory}</h6>
                        <h6>Stock: ${termek.stock}</h6>
                    </div>
        `
    }
}
*/


/*
// a rendelés elküldése
async function ordering() {
    const modalElements = document.getElementById('offcanvasKosar');
    const modal = bootstrap.Modal.getInstance(modalElements);
    const productID = modalElements.getAttribute('data-productID')

    const stock = document.getElementById('buyingStock').value;

    const res = await fetch(`/ordering/${productID}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ stock })
    })

    const data = await res.json();
    const userID = document.getElementById('userID').value;
    console.log(data);

    if (data.success) {
        buy(data.availableStock, data.price, productID, userID);
    } else {


    }
}

// a vásárlás hozzáadása az adatbázishoz, és a termék darabszámának levonása
async function buy(availableStock, price, productID, userID) {

    const res = await fetch(`/buying/${productID}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ availableStock, price, userID })

    })


    const data = await res.json();
    console.log(data);

    if (data.success) {


        Swal.fire({


            title: "Added to cart!",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "OK",

        })
        offcanvas.hide();

    } else {
        Swal.fire({
            text: 'Delete successful',
            icon: 'success',
            customClass: {
                container: 'custom-swal-container', // Testreszabott konténer osztály
                popup: 'custom-swal-popup', // Testreszabott párbeszédpanel osztály
                title: 'custom-swal-title', // Testreszabott cím osztály
                htmlContainer: 'custom-swal-html-container', // Testreszabott HTML konténer osztály
                confirmButton: 'custom-swal-confirm-button', // Testreszabott megerősítő gomb osztály
                cancelButton: 'custom-swal-cancel-button', // Testreszabott megszakító gomb osztály
                close: 'custom-swal-close-button', // Testreszabott bezáró gomb osztály
                icon: 'custom-swal-icon', // Testreszabott ikon osztály
                image: 'custom-swal-image', // Testreszabott kép osztály
                input: 'custom-swal-input', // Testreszabott input mező osztály
                actions: 'custom-swal-actions', // Testreszabott akciók osztály
                loader: 'custom-swal-loader', // Testreszabott töltő ikon osztály
                footer: 'custom-swal-footer', // Testreszabott lábléc osztály
                backdrop: 'custom-swal-backdrop', // Testreszabott háttér osztály
                showConfirmButton: 'custom-swal-show-confirm-button', // Testreszabott megerősítő gomb megjelenítés osztály
                showCancelButton: 'custom-swal-show-cancel-button', // Testreszabott megszakító gomb megjelenítés osztály
            }
        });
    }
}
*/