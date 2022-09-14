document.querySelector("#signup-page").addEventListener("submit", e => {
    e.preventDefault();
    const signupObj = {
        //GMS query selectors for the form field on signup page
        email: document.querySelector("#login-email-signup").value,
        username: document.querySelector("#login-username-signup").value,
        password: document.querySelector("#login-password-signup").value,
    }
    fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify(signupObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        console.log('hello')
        if (res.ok) {
            location.href = "/home"
        } else {
            alert("You are not logged in!")
        }
    })
});