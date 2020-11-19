window.addEventListener("load", ()=> {

    //Simulation of logged in customer
    if (!localStorage.getItem("credentials")){
        document.getElementById("rezerviraj_mizo").style.display = "none";
    }

    const validEmail = (email) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    }

    const validPhoneNumber = (phone) => {
        return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone);
    }

    const validateRegister = () => {
        const ponoviGeslo = document.getElementById("InputPasswordRepeat").value;

        const ime = document.getElementById("InputName");
        const email_naslov= document.getElementById("InputEmail");
        const telefonska_stevilka= document.getElementById("InputPhoneNumber");
        const geslo= document.getElementById("InputPassword");
        const geslo_ponovi = document.getElementById("InputPasswordRepeat");
        let valid_fields = true;
        let error_message = "";

        if (ime.value === "") {
            valid_fields = false;
            ime.classList.add("danger");
            ime.value = ""
            ime.setAttribute("placeholder", "Vnesite veljavno ime");
        }
        if(!validEmail(email_naslov.value)) {
            valid_fields = false;
            email_naslov.classList.add("danger");
            email_naslov.value = ""
            email_naslov.setAttribute("placeholder", "Vnesite veljaven email");
        }
        if (!validPhoneNumber(telefonska_stevilka.value)) {
            valid_fields = false;
            telefonska_stevilka.classList.add("danger");
            telefonska_stevilka.value = ""
            telefonska_stevilka.setAttribute("placeholder", "Vnesite veljavno telefonsko stevilko");
        }
        if (geslo.value === "" || geslo_ponovi.value === "") {
            valid_fields = false;
            geslo.classList.add("danger");
            geslo.value = ""
            geslo.setAttribute("placeholder", "Potrebno je vnesti geslo")
            geslo_ponovi.classList.add("danger");
            geslo_ponovi.value = ""
            geslo_ponovi.setAttribute("placeholder", "Potrebno je vnesti geslo")
        }
        else if (geslo.value !== geslo_ponovi.value) {
            valid_fields = false;
            geslo.classList.add("danger");
            geslo.value = ""
            geslo_ponovi.classList.add("danger");
            geslo_ponovi.value = ""
            geslo.setAttribute("placeholder", "Gesli se ne ujemata");
            geslo_ponovi.setAttribute("placeholder", "Gesli se ne ujemata")
        }

        if (!valid_fields) {
            return false;
        }
        else {
            ime.classList.remove("danger");
            ime.value = ""
            ime.removeAttribute("placeholder");
            geslo.classList.remove("danger");
            geslo.removeAttribute("placeholder");
            geslo.value = ""
            geslo_ponovi.classList.remove("danger");
            geslo_ponovi.removeAttribute("placeholder");
            geslo_ponovi.value = "";
            email_naslov.classList.remove("danger");
            email_naslov.removeAttribute("placeholder")
            email_naslov.value = ""
            telefonska_stevilka.classList.remove("danger");
            telefonska_stevilka.removeAttribute("placeholder");
            telefonska_stevilka.value = "";
            return true;
        }
    }

    document.getElementById('register-button').addEventListener(('click'), (event) => {
        const login_html = document.getElementById('login');
        login_html.classList.remove('show');
    })
    document.getElementById('login-button').addEventListener(('click'), (event) => {
        const register_html = document.getElementById('register');
        register_html.classList.remove('show');
    })
    document.getElementById('submitLogin').addEventListener(('click'), (event) => {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/login", true);
        const user = {
            email_naslov:document.getElementById("InputEmailLogin").value,
            geslo:document.getElementById("InputPasswordLogin").value
        }
        xhttp.onload = function () {
            const credentials = JSON.parse(this.responseText);
            const response_text = document.getElementById("response_message_login");
            if (credentials.error_message) {
                console.log(credentials.error_message);
                response_text.innerHTML = credentials.error_message;
                document.getElementById("InputEmailLogin").value = "";
                document.getElementById("InputPasswordLogin").value = "";
                return;
            }
            localStorage.setItem("credentials", this.responseText);
            window.location.href = "/?uporabnik_id="+ credentials.uporabnik_id;
        }
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(user))
    })

    document.getElementById('submitRegister').addEventListener(('click'), (event) => {
        const response_message = document.getElementById("response_message_register");
        const user = {
            ime: document.getElementById("InputName").value,
            email_naslov: document.getElementById("InputEmail").value,
            telefonska_stevilka: document.getElementById("InputPhoneNumber").value,
            geslo: document.getElementById("InputPassword").value,
        }
        var xhttp = new XMLHttpRequest();
        if (!validateRegister()) {
            console.log("not valid");
            return;
        }
        xhttp.open("POST", "/register", true);
        xhttp.onload = function () {
            console.log(this.responseText);
            const credentials = JSON.parse(this.responseText);
            if (credentials.error_message) {
                console.log(credentials);
                let email =document.getElementById("InputEmail");
                email.setAttribute("placeholder", "Email naslov je ze uporabljen");
                email.classList.add("danger");
                return;
            }
            else {
                response_message.innerHTML = "Uspesna registracija";
                response_message.classList.add("sucess");
            }
        }
        xhttp.onerror = function () {

        }
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(user));
    })
})
