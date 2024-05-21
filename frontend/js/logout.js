// logout
async function logout() {
    const res = await fetch('/logout', {
        method: "POST",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    });

    const data = await res.json();

    if (data.success) {
        window.location.href = '/';
    } else {
        
    }
}