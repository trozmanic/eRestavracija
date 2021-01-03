import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { AppUsmerjanjeModule } from './moduli/app-usmerjanje/app-usmerjanje.module';
import { DatumToStingZasluzekPipe } from './skupno/cevi/datum-to-sting-zasluzek.pipe';
import { DatumToStingPipe } from './skupno/cevi/datum-to-sting.pipe';
import { MesecToStringPipe } from './skupno/cevi/mesec-to-string.pipe';
import { NasmesekPipe } from './skupno/cevi/nasmesek.pipe';
import { OcenaParserPipe } from './skupno/cevi/ocena-parser.pipe';
import { OdstejPipe } from './skupno/cevi/odstej.pipe';
import { RezervacijaMeniPipe } from './skupno/cevi/rezervacija-meni.pipe';
import { RezervacijaStanjePipe } from './skupno/cevi/rezervacija-stanje.pipe';
import { StevecPipe } from './skupno/cevi/stevec.pipe';
import { TransformPictureLinkPipe } from './skupno/cevi/transform-picture-link.pipe';
import { ZvedaPipe } from './skupno/cevi/zveda.pipe';
import { InfoComponent } from './skupno/komponente/info/info.component';
import { LoginComponent } from './skupno/komponente/login/login.component';
import { MainComponent } from './skupno/komponente/main/main.component';
import { MeniItemComponent } from './skupno/komponente/meni-item/meni-item.component';
import { MeniComponent } from './skupno/komponente/meni/meni.component';
import { ModalRatingComponent } from './skupno/komponente/modal-rating/modal-rating.component';
import { NgbdModalComponent, NgbdModalContent } from './skupno/komponente/modal/modal.component';
import { NadzornaPloscaKuharComponent } from './skupno/komponente/nadzorna-plosca-kuhar/nadzorna-plosca-kuhar.component';
import { NadzornaPloscaMeniComponent } from './skupno/komponente/nadzorna-plosca-meni/nadzorna-plosca-meni.component';
import { NadzornaPloscaMenuComponent } from './skupno/komponente/nadzorna-plosca-menu/nadzorna-plosca-menu.component';
import { NadzornaPloscaNatakarComponent } from './skupno/komponente/nadzorna-plosca-natakar/nadzorna-plosca-natakar.component';
import { NadzornaPloscaRezervacijaComponent } from './skupno/komponente/nadzorna-plosca-rezervacija/nadzorna-plosca-rezervacija.component';
import { NadzornaPloscaUrnikListComponent } from './skupno/komponente/nadzorna-plosca-urnik-list/nadzorna-plosca-urnik-list.component';
import { NadzornaPloscaUrnikComponent } from './skupno/komponente/nadzorna-plosca-urnik/nadzorna-plosca-urnik.component';
import { NadzornaPloscaZalogaComponent } from './skupno/komponente/nadzorna-plosca-zaloga/nadzorna-plosca-zaloga.component';
import { NadzornaPloscaZaposleniComponent } from './skupno/komponente/nadzorna-plosca-zaposleni/nadzorna-plosca-zaposleni.component';
import { NadzornaPloscaZasluzekComponent } from './skupno/komponente/nadzorna-plosca-zasluzek/nadzorna-plosca-zasluzek.component';
import { NadzornaPloscaComponent } from './skupno/komponente/nadzorna-plosca/nadzorna-plosca.component';
import { NarociloComponent } from './skupno/komponente/narocilo/narocilo.component';
import { OnasComponent } from './skupno/komponente/onas/onas.component';
import { PristajalnaStranComponent } from './skupno/komponente/pristajalna-stran/pristajalna-stran.component';
import { RezervacijaMeniComponent } from './skupno/komponente/rezervacija-meni/rezervacija-meni.component';
import { RezervacijaPodatkiComponent } from './skupno/komponente/rezervacija-podatki/rezervacija-podatki.component';
import { RezervacijaComponent } from './skupno/komponente/rezervacija/rezervacija.component';
import { ZvezdaComponent } from './skupno/komponente/zvezda/zvezda.component';
import { StranNeObstajaComponent } from './skupno/komponente/stran-ne-obstaja/stran-ne-obstaja.component';


const config: SocketIoConfig = { url: environment.socket_url, options: {} };

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
    NadzornaPloscaKuharComponent,
    NarociloComponent,
    NadzornaPloscaMenuComponent,
    NadzornaPloscaNatakarComponent,
    NgbdModalContent,
    NgbdModalComponent,
    NadzornaPloscaMeniComponent,
    NadzornaPloscaRezervacijaComponent,
    NadzornaPloscaZaposleniComponent,
    NadzornaPloscaUrnikListComponent,
    StranNeObstajaComponent
  ],
  imports: [
    BrowserModule,
    AppUsmerjanjeModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    NgbModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [MainComponent],
  exports: [NgbdModalComponent]
})
export class AppModule { }
