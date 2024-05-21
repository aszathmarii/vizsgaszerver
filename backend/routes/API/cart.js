async function GetProductInCar(){
    const response = await fetch('/get-product-in-cart');
    const data = await response.json();
    console.table(data);
    let kosarHolder = document.getElementById('kosar');

    data.forEach(termek => {
        kosarHolder.innerHTML += `
            <div onclick="AddToCart(${termek.id})" id="${termek.id}">
                <div>
                    <img src="/pic/${termek.pic}" alt="">
                </div>
                <div>
                    <h3>${termek.name}</h3>
                </div>
                <div>
                    <p>${termek.descript}</p>
                </div>
                <div>
                    <p>${termek.quantity} DB</p>
                </div>
            </div>
        `;
    });
}

GetProductInCar()