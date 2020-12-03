import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rezervacijaMeni'
})
export class RezervacijaMeniPipe implements PipeTransform {

  transform(rezervacijaItems: any, meniItems: any, ...args: unknown[]): unknown {
    if(!rezervacijaItems || !meniItems){
      return '';
    }
    let res="";
    if(rezervacijaItems.length>0){
      res+='<h6 class="sredina-text"><strong>Meni:</strong></h6><ul>';
      for(let item of rezervacijaItems){
        res+='<li>'+meniItems.find(e=>e._id==item.meni_item).ime+' <strong>'+item.kolicina+'x</strong></li>'
        //res+='<li>${} <strong>1x</strong></li>'
      }
      res+='</ul>'
    }else{
      res+='<h6 class="sredina-text"><strong>Ni izbranih jedi</strong></h6>';
    }
    return res;
  }

}
