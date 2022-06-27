var logOut = function() {
    fetch ("/logout", {
        method: 'POST',
        body: JSON.stringify({}), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then ( res => {
            window.location.href='http://localhost:3000/';
            //window.sessionStorage.setItem(resave, true);

        })
        .catch(e => {
            console.log("no LogOut!");
        });
};
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("logout").addEventListener("click", logOut);
}, false);