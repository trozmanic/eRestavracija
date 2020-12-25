import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { PristajalnaStranComponent } from './skupno/komponente/pristajalna-stran/pristajalna-stran.component';
import { RezervacijaComponent } from './skupno/komponente/rezervacija/rezervacija.component';
import { OnasComponent } from './skupno/komponente/onas/onas.component';
import { LoginComponent } from './skupno/komponente/login/login.component';
import { RezervacijaStanjePipe } from './skupno/cevi/rezervacija-stanje.pipe';
import { RezervacijaMeniPipe } from './skupno/cevi/rezervacija-meni.pipe';
import { RezervacijaPodatkiComponent } from './skupno/komponente/rezervacija-podatki/rezervacija-podatki.component';
import { RezervacijaMeniComponent } from './skupno/komponente/rezervacija-meni/rezervacija-meni.component';
import { ClearStorageService } from './skupno/storitve/clear-storage.service';

@NgModule({
  declarations: [
    PristajalnaStranComponent,
    RezervacijaComponent,
    OnasComponent,
    LoginComponent,
    RezervacijaStanjePipe,
    RezervacijaMeniPipe,
    RezervacijaPodatkiComponent,
    RezervacijaMeniComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'onas',
        component: OnasComponent
      },
      {
        path: 'rezerviraj',
        component: RezervacijaComponent,
      },
      {
        path: 'rezerviraj/podatki',
        component: RezervacijaPodatkiComponent
      },
      {
        path: 'rezerviraj/meni',
        component: RezervacijaMeniComponent,
        canDeactivate: [ClearStorageService]
      }
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [PristajalnaStranComponent]
})
export class AppModule { }