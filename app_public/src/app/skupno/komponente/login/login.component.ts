import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {userRegister} from "../../razredi/userRegister";
import {userLogin} from "../../razredi/userLogin";
import {Router} from "@angular/router";
import {AuthService} from "../../storitve/auth.service";
import Swal from 'sweetalert2';
import { PovezavaService } from '../../storitve/povezava.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService,
    private povezavaStoritev: PovezavaService
  ) {
    this.registerUser = {
      "ime": "",
      "email_naslov": "",
      "telefonska_stevilka": "",
      "geslo": "",
      "geslo_ponovi": ""
    }

    this.loginUser = {
      "email_naslov" : "",
      "geslo" : ""
    }
  }

  registerUser: userRegister;
  loginUser: userLogin;

  ngOnInit(): void {

  }

  showLogin(): void {
    const login_html = document.getElementById('login');
    const register_html = document.getElementById('register');
    login_html.classList.remove('show');
    if (login_html.classList.contains('hide')) {
      login_html.classList.remove('hide');
      if (!register_html.classList.contains('hide')) {
        register_html.classList.add('hide')
      }
    }
    else {
      login_html.classList.add('hide')
    }
  }

  validEmail (email): boolean {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  }

  validPhoneNumber (phone): boolean {
    return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone);
  }

  showRegister(): void {
    const register_html = document.getElementById('register');
    const login_html = document.getElementById('login');
    if (register_html.classList.contains('hide')) {
      register_html.classList.remove('hide');
      if(!login_html.classList.contains('hide')) {
        login_html.classList.add('hide');
      }
    }
    else {
      register_html.classList.add('hide')
    }
  }

  checkRegisterCredentials(): boolean {
    const ime = document.getElementById("InputName");
    const email_naslov= document.getElementById("InputEmail");
    const telefonska_stevilka= document.getElementById("InputPhoneNumber");
    const geslo= document.getElementById("InputPassword");
    const geslo_ponovi = document.getElementById("InputPasswordRepeat");
    let valid_fields = true;
    if (this.registerUser.ime === "") {
      valid_fields = false;
      ime.classList.add("danger");
      this.registerUser.ime = ""
      ime.setAttribute("placeholder", "Vnesite veljavno ime");
    }
    if(!this.validEmail(this.registerUser.email_naslov)) {
      valid_fields = false;
      email_naslov.classList.add("danger");
      this.registerUser.email_naslov = ""
      email_naslov.setAttribute("placeholder", "Vnesite veljaven email");
    }
    if (!this.validPhoneNumber(this.registerUser.telefonska_stevilka)) {
      valid_fields = false;
      telefonska_stevilka.classList.add("danger");
      this.registerUser.telefonska_stevilka= ""
      telefonska_stevilka.setAttribute("placeholder", "Vnesite veljavno telefonsko stevilko");
    }
    if (this.registerUser.geslo === "" || this.registerUser.geslo_ponovi === "") {
      valid_fields = false;
      geslo.classList.add("danger");
      this.registerUser.geslo = ""
      geslo.setAttribute("placeholder", "Potrebno je vnesti geslo")
      geslo_ponovi.classList.add("danger");
      this.registerUser.geslo_ponovi = ""
      geslo_ponovi.setAttribute("placeholder", "Potrebno je vnesti geslo")
    }
    else if (this.registerUser.geslo !== this.registerUser.geslo_ponovi) {
      valid_fields = false;
      geslo.classList.add("danger");
      this.registerUser.geslo = ""
      geslo_ponovi.classList.add("danger");
      this.registerUser.geslo_ponovi = ""
      geslo.setAttribute("placeholder", "Gesli se ne ujemata");
      geslo_ponovi.setAttribute("placeholder", "Gesli se ne ujemata")
    }

    if (!valid_fields) {
      return false;
    }
    else {
      ime.classList.remove("danger");
      ime.removeAttribute("placeholder");
      geslo.classList.remove("danger");
      geslo.removeAttribute("placeholder");
      geslo_ponovi.classList.remove("danger");
      geslo_ponovi.removeAttribute("placeholder");
      email_naslov.classList.remove("danger");
      email_naslov.removeAttribute("placeholder")
      telefonska_stevilka.classList.remove("danger");
      telefonska_stevilka.removeAttribute("placeholder");
      return true;
    }
    return false;
  }

  clear(): void {
    this.registerUser.ime = ""
    this.registerUser.geslo = ""
    this.registerUser.geslo_ponovi = "";
    this.registerUser.email_naslov = ""
    this.registerUser.telefonska_stevilka = "";
  }

  register(): void {
    if (this.checkRegisterCredentials()) {
      console.log(this.registerUser)
      this.authService
        .registrirajUporabnika(this.registerUser)
        .then(()=> {
          this.clear();
          Swal.fire('Uspesna registacija', 'Vas racun je uspesno kreiran', 'success');
        })
        .catch(msg => Swal.fire('Napaka', 'Napaka pri registraciji', 'error'));
    }
  }

  login(): void {
    if (this.loginUser.email_naslov !== '' && this.loginUser.geslo !== '') {
      this.authService
        .prijaviUporabnika(this.loginUser)
        .then(() => {
          if (this.authService.vrniTrenutnegaUporabnika().vloga !== 'gost') {
            this.router.navigate(['/nadzorna_plosca']);
          }
        })
        .catch(msg => Swal.fire('Napaka', 'Napaka pri prijavi', 'error'));
    }

  }

  public jePovezava(){
    return this.povezavaStoritev.jePovezava;
  }

}
