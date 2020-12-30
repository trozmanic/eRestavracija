import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

import { PristajalnaStranComponent } from './skupno/komponente/pristajalna-stran/pristajalna-stran.component';
import { RezervacijaComponent } from './skupno/komponente/rezervacija/rezervacija.component';
import { OnasComponent } from './skupno/komponente/onas/onas.component';
import { LoginComponent } from './skupno/komponente/login/login.component';
import { RezervacijaStanjePipe } from './skupno/cevi/rezervacija-stanje.pipe';
import { RezervacijaMeniPipe } from './skupno/cevi/rezervacija-meni.pipe';
import { RezervacijaPodatkiComponent } from './skupno/komponente/rezervacija-podatki/rezervacija-podatki.component';
import { RezervacijaMeniComponent } from './skupno/komponente/rezervacija-meni/rezervacija-meni.component';
import { ClearStorageService } from './skupno/storitve/clear-storage.service';
import { StevecPipe } from './skupno/cevi/stevec.pipe';
import { NadzornaPloscaZalogaComponent } from './skupno/komponente/nadzorna-plosca-zaloga/nadzorna-plosca-zaloga.component';
import { NadzornaPloscaComponent } from './skupno/komponente/nadzorna-plosca/nadzorna-plosca.component';
import { NadzornaPloscaUrnikComponent } from './skupno/komponente/nadzorna-plosca-urnik/nadzorna-plosca-urnik.component';
import { MainComponent } from './skupno/komponente/main/main.component';
import { MesecToStringPipe } from './skupno/cevi/mesec-to-string.pipe';
import { DatumToStingPipe } from './skupno/cevi/datum-to-sting.pipe';
import { NadzornaPloscaZasluzekComponent } from './skupno/komponente/nadzorna-plosca-zasluzek/nadzorna-plosca-zasluzek.component';
import { DatumToStingZasluzekPipe } from './skupno/cevi/datum-to-sting-zasluzek.pipe';
import { OdstejPipe } from './skupno/cevi/odstej.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AuthService } from './skupno/storitve/auth.service';
import { InfoComponent } from './skupno/komponente/info/info.component';
import { RezervacijaPotrditevMeniPipe } from './skupno/cevi/rezervacija-potrditev-meni.pipe';
import { MeniComponent } from './skupno/komponente/meni/meni.component';
import { MeniItemComponent } from './skupno/komponente/meni-item/meni-item.component';
import { TransformPictureLinkPipe } from './skupno/cevi/transform-picture-link.pipe';
import { ZvedaPipe } from './skupno/cevi/zveda.pipe';
import { OcenaParserPipe } from './skupno/cevi/ocena-parser.pipe';
import { ZvezdaComponent } from './skupno/komponente/zvezda/zvezda.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalRatingComponent } from './skupno/komponente/modal-rating/modal-rating.component';
import { NasmesekPipe } from './skupno/cevi/nasmesek.pipe';
import { NadzornaPloscaMeniComponent } from './skupno/komponente/nadzorna-plosca-meni/nadzorna-plosca-meni.component';
import { EditIdPipe } from './skupno/cevi/edit-delete-id.pipe';
import { DeleteIdPipe } from './skupno/cevi/edit-delete-id.pipe';
import { NadzornaPloscaRezervacijaComponent } from './skupno/komponente/nadzorna-plosca-rezervacija/nadzorna-plosca-rezervacija.component';
import { NadzornaPloscaMenuComponent } from './skupno/komponente/nadzorna-plosca-menu/nadzorna-plosca-menu.component';

@NgModule({
  declarations: [
    PristajalnaStranComponent,
    RezervacijaComponent,
    OnasComponent,
    LoginComponent,
    RezervacijaStanjePipe,
    RezervacijaMeniPipe,
    RezervacijaPodatkiComponent,
    RezervacijaMeniComponent,
    StevecPipe,
    NadzornaPloscaZalogaComponent,
    NadzornaPloscaComponent,
    NadzornaPloscaUrnikComponent,
    MainComponent,
    MesecToStringPipe,
    DatumToStingPipe,
    NadzornaPloscaZasluzekComponent,
    DatumToStingZasluzekPipe,
    OdstejPipe,
    InfoComponent,
    MeniComponent,
    MeniItemComponent,
    TransformPictureLinkPipe,
    ZvedaPipe,
    OcenaParserPipe,
    ZvezdaComponent,
    ModalRatingComponent,
    NasmesekPipe,
    NadzornaPloscaMenuComponent,
    NadzornaPloscaMeniComponent,
    EditIdPipe,
    DeleteIdPipe,
    NadzornaPloscaRezervacijaComponent,
    RezervacijaPotrditevMeniPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
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
        }]
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
            path: 'rezervacija',
            component: NadzornaPloscaRezervacijaComponent
          },
          {
            path: 'urnik/:id',
            component: NadzornaPloscaUrnikComponent
          },
          {
            path: 'meni',
            component: NadzornaPloscaMeniComponent
          }
        ]
      }
    ]),
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
