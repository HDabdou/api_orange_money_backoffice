import { Component, OnInit } from "@angular/core";
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {
   //let dd = ((new Date()).toJSON()).split("T",2)[0];
   dateDebut;
   dateFin;
   nbrOp;
   solde;
   commission
   listOperations:any = [];
   constructor(private _serviceAdmin: AdminService) {}
   currencyFormat(somme) : String{
     return Number(somme).toLocaleString() ;
   }
   recherche(){
     
   }
   ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';
    var row = "";

    for (var index in objArray[0]) {
      //console.log(index.toLowerCase);

        //Now convert each value to string and comma-separated
        row += index.toUpperCase() + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }
        str += line + '\r\n';
        
    }
    return str;
}
errorMessage:number = 0
  getFormule(arg){
    if(arg == 1){
      return "Maana";
    }if(arg == 2){
      return "Boul-khool";
    }if(arg == 3){
      return "Maana + Boul-khool";
    }
  }
   download(){
    //let line = 
    this.errorMessage = 0
    let liste = []
  
      for(let p of this.listOperations){
        //console.log({date:this.getDate(i.dateoperation),service:i.operateur,traitement:i.traitement,montant:i.montant,client:this.trimer(i.infoclient)});
        liste.push(
          {

            date :p.date_operation,
            prenom :this.getInfo(p.infosOperation,'prenom'),
            nom :this.getInfo(p.infosOperation,'nomclient'),
            telephone:this.getInfo(p.infosOperation,'tel'),
            num_decoudeur:this.getInfo(p.infosOperation,'numDec'),
            num_carte:this.getInfo(p.infosOperation,'carte'),
            formule:this.getInfo(p.infosOperation,'formule'),
            duree:this.getInfo(p.infosOperation,'nbreMois'),
            montant:this.getInfo(p.infosOperation,'montant'),
            numero_abonne:this.getInfo(p.infosOperation,'numAbo'),
            adresse:this.getInfo(p.infosOperation,'adresse'),
          }
        );
      }
      console.log(liste);
      //console.log(this.ConvertToCSV(liste));
      var csvData = this.ConvertToCSV(liste);
      var a = document.createElement("a");
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      var blob = new Blob([csvData], { type: 'text/csv' });
      var url= window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'report_'+(new Date().toLocaleString())+'.csv';/* your file name*/
      a.click();
      console.log(csvData);
      this.errorMessage = 2
      return 'success';
    
 
   
    
  }
 
   ngOnInit() {
     
   }
   getInfo(objet,nom){
     
   
    let ob = JSON.parse(objet);
    if(nom == "numAbo"){
      return ob.numAbo;
    }
    if(nom == "carte"){
      return ob.carte;
    }
    if(nom == "nom"){
      return ob.nom;
    }
    if(nom == "prenom"){
      return ob.prenom;
    }
    if(nom == "adresse"){
      return ob.adresse;
    }
    if(nom == "formule"){
      return ob.formule;
    }
    if(nom == "duree"){
      return ob.duree;
    }
    if(nom == "montant"){
      return ob.montant;
    }
    if(nom == "operation"){
      return ob.operation;
    }
    if(nom == "numDec"){
      return ob.numDec;
    }
    if(nom == "numCarte"){
      return ob.numCarte;
    }
    if(nom == "tel"){
      return ob.tel;
    }
    if(nom == "nomclient"){
      return ob.nomclient;
    }
    if(nom == "nbreMois"){
      return ob.nbreMois;
    }
    return "";
   }
}
