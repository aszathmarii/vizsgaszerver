function forRegister() {
    window.location.href = '/reg.html';
}

// login
document.getElementById('loginForm').onsubmit = async function (event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const res = await fetch('/login', {
        method: "POST",
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
        
    });

    const data = await res.json();
 
    if (data.success) {
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
            title: "Signed in successfully"
          });
        if (data.user.role === 1) {
            window.location.href = '/admin.html';
        } else if (data.user.role === 0) {
            window.location.href = '/user.html';
        }
    } else {
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
         
            text: 'The data doesnt match!',
            icon: 'warning',
            heightAuto: false,
          });
    }
}
