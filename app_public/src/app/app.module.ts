import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PristajalnaStranComponent } from './skupno/komponente/pristajalna-stran/pristajalna-stran.component';
import { RezervacijaComponent } from './skupno/komponente/rezervacija/rezervacija.component';
import { OnasComponent } from './skupno/komponente/onas/onas.component';
import { LoginComponent } from './skupno/komponente/login/login.component';

@NgModule({
  declarations: [
    PristajalnaStranComponent,
    RezervacijaComponent,
    OnasComponent,
    LoginComponent
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
        component: RezervacijaComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [PristajalnaStranComponent]
})
export class AppModule { }
