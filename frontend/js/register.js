document.getElementById('registerForm').onsubmit = function (event) {
    event.preventDefault();

    const email = event.target.elements.registerEmail.value;
    const username = event.target.elements.registerUsername.value;
    const password = event.target.elements.registerPassword.value;
    const password2 = event.target.elements.registerPassword2.value;

    if (!email || !username || !password || !password2) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            
            heightAuto: false,
            didOpen: (toast) => {
                toast.onmouseenter = false ;
                toast.onmouseleave = false;
            }
          });
          Toast.fire({
            text: 'Fill in all values!',
            icon: 'warning',
            
          });
             
      return;
    }

    // if (password.length < 8) {
    //     alert('A jelszónak legalább 8 karakter hosszúnak kell lenni te csacsi!');
    //     return;
    // }

    if (password !== password2) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            
            heightAuto: false,
            didOpen: (toast) => {
              toast.onmouseenter = false ;
              toast.onmouseleave = false;
            }
          });
          Toast.fire({
            text: 'Two passwords dont match!',
            icon: 'warning',
            
          });
             
            
            
          
        return;
    }

    reg(email, username, password);
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = false ;
            toast.onmouseleave = false;
        }
      });
      Toast.fire({
        text: '',
        icon: 'success',
      });
}

// itt történik a tényleges regisztráció
async function reg(email, username, password) {

    const res = await fetch('/reg', {
        method: "POST",    
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password
        })
    })
   

    const data = await res.json();

    if (res.ok) {
      
    } 
}

function forLogin() {
    window.location.href = '/';
   
}