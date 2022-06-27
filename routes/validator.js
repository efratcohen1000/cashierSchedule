let form = document.querySelector('form');

form.onsubmit = sendData;

function sendData(e) {
    e.preventDefault();

    let formData = new FormData(form);

    let Params = {
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            name: formData.get('Id'),
        }),
        method: "POST"
    };

    fetch('http://localhost:3000/formData',Params)
        .then(response => response.json())
        .then(data => {

            if(data.success == "OK")
            {
                console.log('successful ')
            }else {
                let error = document.querySelector('.error');

                error.innerHTML = ""; //מאפס את ההודעה בכל הכנסת קלט

                document.querySelector('/errorContainer').style.display = "block";

                data.errors.forEach(function (err) {
                    error.innerHTML += '<li>${err.msg}</li>';
                });
            }
        })
        .catch(err => console.log(err))
}