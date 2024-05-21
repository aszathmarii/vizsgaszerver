async function GetProductInCart() {
    const response = await fetch('/cartSession');
    const data = await response.json();
    console.log(data);
    let fizetendo = 0;
    let kosarHolder = document.getElementById('termekek');

    data.forEach(termek => {
        fizetendo += termek.price * termek.currentStock;
        kosarHolder.innerHTML += `
            <div class="col-xl-2 col-lg-2 col-md-4 col-sm-8">
                <div class="card text-dark my-1 h-70">
                    <div class="card-header">
                        <div class="img">
                            <img class="zoom-effect" src="/images/${termek.img}" alt="${termek.name}" title="${termek.name}" class="img img-fluid img-thumbnail mx-auto d-block">
                        </div>
                    </div>
                    <div class="card-body">
                        <h6 id="nev${termek.productID}">Name: ${termek.name}</h6>
                        <h6 id="ar${termek.productID}">Price: ${termek.price}$</h6>
                        <h6 id="meret${termek.productID}">Size: ${termek.size}</h6>
                        <h6 id="szin${termek.productID}">Color: ${termek.color}</h6>
                        <h6>Kosárban: ${termek.currentStock} DB</h6>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('fizetendo').innerHTML = fizetendo + '$';
}
