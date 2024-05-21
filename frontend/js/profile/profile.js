// változók a jelszó módosításához
const myInput = document.getElementById('editPassword');
const letter = document.getElementById('letter');
const capital = document.getElementById('capital');
const number = document.getElementById('number');
const length = document.getElementById('length');

// oldalról beúszó profil menü megjelenítése
const profile = document.getElementById('profile');
const offcanvas = new bootstrap.Offcanvas(document.getElementById('editProfile'));

profile.addEventListener('click', function () {
    offcanvas.show();
});

// felhasználó email címének kinyerése cookieból:
async function getUserEmail() {
    const res = await fetch('/getUserEmail');
    const data = await res.json();

    const email = data.userEmail;
    console.log(email);
    getUser(email);
}

// a felhasználó adatainak lekérdezése és oldalsó menübe írása
async function getUser(emailFromCookie) {
    const res = await fetch(`/getUser/${emailFromCookie}`);
    const data = await res.json();

    const image = data[0].userImage;
    const username = data[0].username;
    const email = data[0].email;
    const birthday = data[0].formattedBirthday ? data[0].formattedBirthday : "nincs megadva";
    const role = data[0].role;
    const userID = data[0].userID;
    
    document.getElementById('userID').value = userID;
    console.log(image, username, email, birthday, role, userID);
    let offcanvasBody = `
    <div class="col-sm-12 position-relative" "> <!-- profil kép -->
        <img src="../images/${image}" alt="${username}" title="${username}" class="img-fluid mx-auto d-block" style="border-radius: 50%;" id="userImage">
        <button type="button" class="btn btn-dark border-0 mt-2 position-absolute" style="right: 20%; bottom: 20%; max-height: 200px;" onclick="editProfileImageModal('${email}')">
        <i class="fa-solid fa-pen-nib"></i>
        </button>
    </div>

    <div class="row"> <!-- username -->
        <div class="col-3">
            <i class="fa-solid fa-user mt-3"></i>
        </div>

        <div class="col-6 p-0">
            <h5>Username</h5><br class="d-none">
            <h6 class="text-white" id="username">${username}</h6>
        </div>

        <div class="col-3">
            <button type="button" class="btn btn-dark border-0 mt-2" onclick="editProfileUsernameModal('${email}')">
            <i class="fa-solid fa-pen-nib"></i>
            </button>
        </div>
    </div>

    <div class="row"> <!-- email -->
        <div class="col-3">
            <i class="fa-solid fa-envelope mt-3"></i>
        </div>

        <div class="col-6 p-0">
            <h5>E-mail</h5><br class="d-none">
            <h6 class="text-white" id="email">${email}</h6>
        </div>
    </div>

    <div class="row"> <!-- bithday -->
        <div class="col-3">
            <i class="fa-solid fa-cake-candles mt-3"></i>
        </div>

        <div class="col-6 p-0">
            <h5>Birtday</h5><br class="d-none">
            <h6 class="text-white" id="birthday">${birthday}</h6>

        </div>

        <div class="col-3">
            <button type="button" class="btn btn-dark border-0 mt-2" onclick="editProfileBirthdayModal('${email}')">
            <i class="fa-solid fa-pen-nib"></i>
            </button>
        </div>
    </div>

    <div class="row"> <!-- password -->
        <div class="col-3">
            <i class="fa-solid fa-lock mt-3"></i>
        </div>

        <div class="col-6 p-0">
            <h5>Password</h5><br class="d-none">
            <h6 class="text-white" id="password">**********</h6>
        </div>

        <div class="col-3">
            <button type="button" class="btn btn-dark border-0 mt-2" onclick="editProfilePasswordModal('${email}')">
            <i class="fa-solid fa-pen-nib"></i>
            </button>
        </div>
    </div>

    <div class="row"> <!-- role -->
        <div class="col-3">
            <i class="fa-solid fa-person mt-3"></i>
        </div>

        <div class="col-6 p-0">
            <h5>Role</h5><br class="d-none">
            <h6 class="text-white" id="role">${role === 0 ? "user" : "admin"}</h6>
        </div>
    </div>
`;

    document.getElementById('offcanvasBody').innerHTML = offcanvasBody;
}

// a profilkép szerkesztésének modal ablakának megjelenítése
function editProfileImageModal(email) {
    const modal = new bootstrap.Modal(document.getElementById('editProfileImageModal'));
    const profilEmail = document.getElementById('editProfileImageModal');
    profilEmail.setAttribute('data-profilEmail', email);
    modal.show();
}

// a profilkép módosítása
async function editImage() {
    const modalElements = document.getElementById('editProfileImageModal');
    const modal = bootstrap.Modal.getInstance(modalElements);
    const email = modalElements.getAttribute('data-profilEmail');

    const image = document.getElementById('editProfileImg').files[0];
    //console.log(image, email);
    const formData = new FormData();
    formData.append('image', image);
    console.log(formData);

    const res = await fetch(`/editUserImage/${email}`, {
        method: "PUT",
        body: formData
    });

    if (res.ok) {
        modal.hide();

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = false;
              toast.onmouseleave = false;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Edit successfully"
          });
    
        getUserEmail();
    }
}

// a username szerkesztésének modal ablakának megjelenítése
function editProfileUsernameModal(email) {
    const modal = new bootstrap.Modal(document.getElementById('editProfileUsernameModal'));
    const profilEmail = document.getElementById('editProfileUsernameModal');
    profilEmail.setAttribute('data-profilEmail', email);
    modal.show();
}

// a username módosítása
async function editUsername() {
    const modalElements = document.getElementById('editProfileUsernameModal');
    const modal = bootstrap.Modal.getInstance(modalElements);
    const email = modalElements.getAttribute('data-profilEmail');

    const username = document.getElementById('editUsername').value;

    const res = await fetch(`/editUsername/${email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ username })
    });

    if (res.ok) {
        modal.hide();
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = false;
              toast.onmouseleave = false;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Edit successfully"
          });
        getUserEmail();
    }
}

// a születési dátum szerkesztésének modal ablakának megjelenítése
function editProfileBirthdayModal(email) {
    const modal = new bootstrap.Modal(document.getElementById('editProfileBirthdayModal'));
    const profilEmail = document.getElementById('editProfileBirthdayModal');
    profilEmail.setAttribute('data-profilEmail', email);
    modal.show();
}

// a születési dátum módosítása
async function editBirthday() {
    const modalElements = document.getElementById('editProfileBirthdayModal');
    const modal = bootstrap.Modal.getInstance(modalElements);
    const email = modalElements.getAttribute('data-profilEmail');

    const birthday = document.getElementById('editBirthday').value;

    const res = await fetch(`/editBirthday/${email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ birthday })
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
            title: "Edit successfully"
          });
        getUserEmail();
        
    }
}

// a jelszó módosításának modal ablakának megjelenítése
function editProfilePasswordModal(email) {
    const modal = new bootstrap.Modal(document.getElementById('editProfilePasswordModal'));
    const profilEmail = document.getElementById('editProfilePasswordModal');
    profilEmail.setAttribute('data-profilEmail', email);
    modal.show();

    // Amikor beleklikkelünk a jelszó mezőbe, akkor megjelenik a message id-jű div
    myInput.onfocus = function () {
        document.getElementById("message").style.display = "block";
    }

    // Amikor nem vagyunk a jelszó mezőben, akkor eltűnik a message id-jű div
    myInput.onblur = function () {
        document.getElementById("message").style.display = "none";
    }

    // myInput.onkeyup = function () {
    //     // Validate lowercase letters
    //     var lowerCaseLetters = /[a-z]/g;
    //     if (myInput.value.match(lowerCaseLetters)) {
    //         letter.classList.remove("invalid");
    //         letter.classList.add("valid");
    //     } else {
    //         letter.classList.remove("valid");
    //         letter.classList.add("invalid");
    //     }

    //     // Validate capital letters
    //     var upperCaseLetters = /[A-Z]/g;
    //     if (myInput.value.match(upperCaseLetters)) {
    //         capital.classList.remove("invalid");
    //         capital.classList.add("valid");
    //     } else {
    //         capital.classList.remove("valid");
    //         capital.classList.add("invalid");
    //     }

    //     // Validate numbers
    //     var numbers = /[0-9]/g;
    //     if (myInput.value.match(numbers)) {
    //         number.classList.remove("invalid");
    //         number.classList.add("valid");
    //     } else {
    //         number.classList.remove("valid");
    //         number.classList.add("invalid");
    //     }

    //     // Validate length
    //     if (myInput.value.length >= 8) {
    //         length.classList.remove("invalid");
    //         length.classList.add("valid");
    //     } else {
    //         length.classList.remove("valid");
    //         length.classList.add("invalid");
    //     }
    // }
}

// a jelszó módosítása
async function editPassword() {
    const modalElements = document.getElementById('editProfilePasswordModal');
    const modal = bootstrap.Modal.getInstance(modalElements);
    const email = modalElements.getAttribute('data-profilEmail');

    const password = document.getElementById('editPassword').value;
    const password2 = document.getElementById('editPassword2').value;

    console.log(`Jelszó: ${password}, jelszó2: ${password2}`);
    if (!password || !password2) {
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
          });
        return;
    }

    // if (password.length < 8) {
    //     alert('A jelszónak legalább 8 karakter hosszúnak kell lenni te csacsi!');
    //     return;
    // }

    if (password !== password2) {
        Swal.fire({
         
            text: 'A két jelszó nem egyezik!',
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
          });
        return;
    }

    const res = await fetch(`/editPassword/${email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ password })
    });

    if (res.ok) {
        Swal.fire({
         
            text: 'Successful Update!',
            icon: 'succes',
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
        getUserEmail();
        modal.hide();
    }
}
