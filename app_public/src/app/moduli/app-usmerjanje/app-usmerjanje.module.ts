import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/skupno/komponente/login/login.component';
import { MeniComponent } from 'src/app/skupno/komponente/meni/meni.component';
import { NadzornaPloscaKuharComponent } from 'src/app/skupno/komponente/nadzorna-plosca-kuhar/nadzorna-plosca-kuhar.component';
import { NadzornaPloscaMeniComponent } from 'src/app/skupno/komponente/nadzorna-plosca-meni/nadzorna-plosca-meni.component';
import { NadzornaPloscaMenuComponent } from 'src/app/skupno/komponente/nadzorna-plosca-menu/nadzorna-plosca-menu.component';
import { NadzornaPloscaNatakarComponent } from 'src/app/skupno/komponente/nadzorna-plosca-natakar/nadzorna-plosca-natakar.component';
import { NadzornaPloscaRezervacijaComponent } from 'src/app/skupno/komponente/nadzorna-plosca-rezervacija/nadzorna-plosca-rezervacija.component';
import { NadzornaPloscaUrnikListComponent } from 'src/app/skupno/komponente/nadzorna-plosca-urnik-list/nadzorna-plosca-urnik-list.component';
import { NadzornaPloscaUrnikComponent } from 'src/app/skupno/komponente/nadzorna-plosca-urnik/nadzorna-plosca-urnik.component';
import { NadzornaPloscaZalogaComponent } from 'src/app/skupno/komponente/nadzorna-plosca-zaloga/nadzorna-plosca-zaloga.component';
import { NadzornaPloscaZaposleniComponent } from 'src/app/skupno/komponente/nadzorna-plosca-zaposleni/nadzorna-plosca-zaposleni.component';
import { NadzornaPloscaZasluzekComponent } from 'src/app/skupno/komponente/nadzorna-plosca-zasluzek/nadzorna-plosca-zasluzek.component';
import { NadzornaPloscaComponent } from 'src/app/skupno/komponente/nadzorna-plosca/nadzorna-plosca.component';
import { OnasComponent } from 'src/app/skupno/komponente/onas/onas.component';
import { PristajalnaStranComponent } from 'src/app/skupno/komponente/pristajalna-stran/pristajalna-stran.component';
import { RezervacijaMeniComponent } from 'src/app/skupno/komponente/rezervacija-meni/rezervacija-meni.component';
import { RezervacijaPodatkiComponent } from 'src/app/skupno/komponente/rezervacija-podatki/rezervacija-podatki.component';
import { RezervacijaComponent } from 'src/app/skupno/komponente/rezervacija/rezervacija.component';
import { StranNeObstajaComponent } from 'src/app/skupno/komponente/stran-ne-obstaja/stran-ne-obstaja.component';
import { ClearStorageService } from 'src/app/skupno/storitve/clear-storage.service';

const poti: Routes = [
  {
    path: '',
    component: PristajalnaStranComponent,
    children: [{
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
      path: 'meni',
      component: MeniComponent
    },
    {
      path: 'rezerviraj/meni',
      component: RezervacijaMeniComponent,
      canDeactivate: [ClearStorageService]
    }
  ]
  },
  {
    path: 'nadzorna_plosca',
    component: NadzornaPloscaComponent,
    children: [
      {
        path: 'zaloga',
        component: NadzornaPloscaZalogaComponent
      },
      {
        path: 'urnik',
        component: NadzornaPloscaUrnikComponent
      },
      {
        path: 'zasluzek',
        component: NadzornaPloscaZasluzekComponent
      },
      {
        path: 'kuhar',
        component: NadzornaPloscaKuharComponent
      },
      {
        path: '',
        component: NadzornaPloscaMenuComponent
      },
      {
        path: 'natakar',
        component: NadzornaPloscaNatakarComponent
      },
      {
        path: 'rezervacije',
        component: NadzornaPloscaRezervacijaComponent
      },
      {
        path: 'meni',
        component: NadzornaPloscaMeniComponent
      },
      {
        path: 'zaposleni',
        component: NadzornaPloscaZaposleniComponent
      },
      {
        path: 'uredi_urnik',
        component: NadzornaPloscaUrnikListComponent
      }
    ]
  },
  {
    path: '404',
    component: StranNeObstajaComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(poti)
  ],
  exports: [RouterModule]
})
export class AppUsmerjanjeModule { }
