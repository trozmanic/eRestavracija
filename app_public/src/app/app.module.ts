import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

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
import { ChartDataPipe } from './skupno/cevi/chart-data.pipe';
import { ChartLabelsPipe } from './skupno/cevi/chart-labels.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import { AuthService } from  './skupno/storitve/auth.service';
import { InfoComponent } from './skupno/komponente/info/info.component';
import { MeniComponent } from './skupno/komponente/meni/meni.component';
import { MeniItemComponent } from './skupno/komponente/meni-item/meni-item.component';
import { TransformPictureLinkPipe } from './skupno/cevi/transform-picture-link.pipe';
import { ZvedaPipe } from './skupno/cevi/zveda.pipe';
import { OcenaParserPipe } from './skupno/cevi/ocena-parser.pipe';
import { ZvezdaComponent } from './skupno/komponente/zvezda/zvezda.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalRatingComponent } from './skupno/komponente/modal-rating/modal-rating.component';
import { NasmesekPipe } from './skupno/cevi/nasmesek.pipe';
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
    ChartDataPipe,
    ChartLabelsPipe,
    InfoComponent,
    MeniComponent,
    MeniItemComponent,
    TransformPictureLinkPipe,
    ZvedaPipe,
    OcenaParserPipe,
    ZvezdaComponent,
    ModalRatingComponent,
    NasmesekPipe,
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
                    }
                ]
            }
        ]),
        /*RouterModule.forRoot([
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
          },
          {
            path: 'nadzorna-plosca/zaloga',
            component: NadzornaPloscaZalogaComponent
          },
          {
            path: 'nadzorna-plosca/urnik',
            component: NadzornaPloscaUrnikComponent
          }
        ]),*/
        HttpClientModule,
        ChartsModule,
        BrowserAnimationsModule,
        FormsModule,
        NgbModule
    ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
