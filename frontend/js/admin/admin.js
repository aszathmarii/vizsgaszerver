// termékek lekérdezése
async function fetchProducts() {
  const response = await fetch('/product');
  const termekek = await response.json();

  drawing(termekek);
}

// termék felvétele
document.getElementById('create-product').onsubmit = async function (event) {
  event.preventDefault();

  const name = event.target.elements.name.value;

  const sizeColumn = {
    1: 'XS',
    2: 'S',
    3: 'M',
    4: 'L',
    5: 'XL',
    6: 'XXL'
  }
  const size = sizeColumn[event.target.elements.size.value];

  const colorColumn = {
    1: 'Blue',
    2: 'Black',
    3: 'White',
    4: 'Red',
    5: 'Green',
    6: 'asdasd'
  }
  const color = colorColumn[event.target.elements.color.value];

  const cathegoryColumn = {
    1: 'Dress',
    2: 'Hoodies',
    3: 'Manjacket',
    4: 'Sweater',
    5: 'Tops',
    6: 'Woman',
    7: 'Jeans'
  }
  const cathegory = cathegoryColumn[event.target.elements.cathegory.value];
  console.log(cathegory);
  const price = event.target.elements.price.value;
  const stock = event.target.elements.stock.value;
  const image = event.target.elements.image.files[0];

  const formData = new FormData();
  formData.append('name', name);
  formData.append('size', size);
  formData.append('color', color);
  formData.append('cathegory', cathegory);
  formData.append('price', price);
  formData.append('stock', stock);
  formData.append('image', image);

  const res = await fetch('/product', {
    method: "POST",
    body: formData
  });


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
    icon: "success",
    title: "Successful update!"
  });
  event.target.elements.name.value = null;
  event.target.elements.size.value = "selected";
  event.target.elements.color.value = "selected";
  event.target.elements.cathegory.value = "selected";
  event.target.elements.price.value = null;
  event.target.elements.stock.value = null;
  fetchProducts();
};

async function deleteProduct(id) {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });

  if (result.isConfirmed) {
    const response = await fetch(`/product/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the product.",
        icon: "error"
      });
    }
  }
  fetchProducts();
}




// --- product  szerkesztése ---

// modal ablak mutatása, és a megfelelő id eltárolása a modal-on belül
async function editProduct(id) {
  const res = await (fetch(`/product/${id}`));
  const data = await res.json();
  //console.log(data);
  const name = data[0].name;
  const size = data[0].sizeID;
  const color = data[0].colorID;
  const cathegory = data[0].cathegoryID;
  const price = data[0].price;
  const stock = data[0].stock;

  console.log(size, color, cathegory);

  document.getElementById('editName').value = name;
  document.getElementById('editSize').value = size;
  document.getElementById('editSize').querySelector(`[value="${size}"]`).selected = true;
  document.getElementById('editColor').value = color;
  document.getElementById('editColor').querySelector(`[value="${color}"]`).selected = true;
  document.getElementById('editCathegory').value = cathegory;
  document.getElementById('editCathegory').querySelector(`[value="${cathegory}"]`).selected = true;
  document.getElementById('editPrice').value = price;
  document.getElementById('editStock').value = stock;

  // ---
  // itt hozzáadjuk a sorozat id-ját a modal ablak attribútumaihoz
  // ---
  const modal = new bootstrap.Modal(document.getElementById('updateProductModal'));
  const productID = document.getElementById('updateProductModal');
  productID.setAttribute('data-productID', id);
  modal.show();
}
//






// a backend-el való kapcsolatfelvétel
async function updateProductData() {
  const modalElements = document.getElementById('updateProductModal');
  const id = modalElements.getAttribute('data-productID');
  const modal = bootstrap.Modal.getInstance(modalElements);

  const name = document.getElementById('editName').value;
  const sizeColumn = {
    1: 'XS',
    2: 'S',
    3: 'M',
    4: 'L',
    5: 'XL',
    6: 'XXL'
  }
  const size = sizeColumn[document.getElementById('editSize').value];

  const colorColumn = {
    1: 'Blue',
    2: 'Black',
    3: 'White',
    4: 'Red',
    5: 'Green',
    6: 'asdasd'
  }
  const color = colorColumn[document.getElementById('editColor').value];

  const cathegoryColumn = {
    1: 'Dress',
    2: 'Hoodies',
    3: 'Manjacket',
    4: 'Sweater',
    5: 'Tops',
    6: 'Woman',
    7: 'Jeans'
  }
  const cathegory = cathegoryColumn[document.getElementById('editCathegory').value];

  const price = document.getElementById('editPrice').value;
  const stock = document.getElementById('editStock').value;
  const image = document.getElementById('editImage').files[0];

  const formData = new FormData();
  formData.append('name', name);
  formData.append('size', size);
  formData.append('color', color);
  formData.append('cathegory', cathegory);
  formData.append('price', price);
  formData.append('stock', stock);
  formData.append('image', image);

  const res = await fetch(`/product/${id}`, {
    method: "PUT",
    body: formData
  });

  if (res.ok) {
    modal.hide();
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
      icon: "success",
      title: "Successful update!S"
    });
    fetchProducts();
    resetInput();
  }
  else {
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
      icon: "warning",
      title: "Error during editing "
    });
  }
}

// modal ablak beviteli mezőinek kiürítése
function resetInput() {
  document.getElementById('editName').value = null;
  document.getElementById('editSize').value = "selected";
  document.getElementById('editColor') = "selected";
  document.getElementById('editCathegory').value = "selected";
  document.getElementById('editPrice').value = null;
  document.getElementById('editStock').value = null;
}

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
    const Toast = Swal.mixin({
      toast: true,
      position: "top-",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = false;
        toast.onmouseleave = false;
      }
    });
    Toast.fire({
      icon: "warning",
      title: "Enter something!"
    });
    shouldFetch = false;
  } else if (searchingType === 'Size') {
    if (searching !== 'XS' && searching !== 'S' && searching !== 'M' && searching !== 'L' && searching !== 'XL' && searching !== 'XXL') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = false;
          toast.onmouseleave = false;
        }
      });
      Toast.fire({
        icon: "warning",
        title: "Only XS , S, M, L, XL, XXL  enter size information!"
      });
      shouldFetch = false;
    }
  } else if (searchingType === 'Color') {
    if (searching !== 'Blue' && searching !== 'Black' && searching !== 'White' && searching !== 'Red' && searching !== 'Green') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = false;
          toast.onmouseleave = false;
        }
      });
      Toast.fire({
        icon: "warning",
        title: "Only ------  enter color information!"
      });
      shouldFetch = false;
    }
  } else if (searchingType === 'Category') {
    if (searching !== 'Dress' && searching !== 'Hoodies' && searching !== 'Manjacket' && searching !== 'Tops' && searching !== 'Woman' && searching !== 'Jeans') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = false;
          toast.onmouseleave = false;
        }
      });
      Toast.fire({
        icon: "warning",
        title: "Only  category  information!"
      });
      shouldFetch = true;
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

//oldal frissitese
document.getElementById('refreshButton').addEventListener('click', function() {
  location.reload();
});

//kép megjeleintese


function drawing(termekek) {



  let productHTML = '<h1 class="mt-2 mb-2">Hi! Welcome to my clothes shop! Look around!</h1>';


  // termék lista , sort=rendezés "névtelen függvény" véletlen szerűen szűri ki a termékeket 0-és 1 között, 


  termekek.sort(function () { return -0.5, 0.5 + - Math.random() });

  for (let termek of termekek) {
    const price = termek.price === '$' ? 'no price' : `${termek.price}`;

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
                        <h6>Price: ${termek.price}$</h6>
                        <h6>Size: ${termek.size}</h6>
                        <h6>Color: ${termek.color}</h6>
                        <h6>Cathegory: ${termek.cathegory}</h6>
                        <h6>Stock: ${termek.stock}</h6>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline-danger me-1" onclick="deleteProduct(${termek.productID})"><i class="fa-solid fa-trash-can"></i></button>

                        <button class="btn btn-dark" onclick="editProduct(${termek.productID})"><i class="fa-solid fa-marker"></i></button>
                    </div>
                </div>
            </div>
        `
  }

  document.getElementById('product-list').innerHTML = productHTML;
}
