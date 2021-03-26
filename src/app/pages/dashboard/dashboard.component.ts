import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { AdminService } from 'src/app/services/admin.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent implements OnInit {
  //let dd = ((new Date()).toJSON()).split("T",2)[0];
  dateDebut;
  dateFin;
  nbrOp;
  nbrSuccess = 0;
  nbrFailed = 0;
  nbrAll = 0;
  solde = 0;
  commission
  listOperations:any = [];
  listOperationsDisplayed:any = [];
  listCommande:any = [];
  commande = "tous";
  constructor(private _serviceAdmin: AdminService,private router:Router) {}
  currencyFormat(somme) : String{
    return Number(somme).toLocaleString() ;
  }
  Success(){
    this.listOperationsDisplayed = [];
    for(let i of this.listOperations){
      if(i.status == 200){
        this.listOperationsDisplayed.push(i)
      }
    }
    this.counter(this.listOperationsDisplayed)
  }
  Echec(){
    this.listOperationsDisplayed = [];
    for(let i of this.listOperations){
      if(i.status != 200){
        this.listOperationsDisplayed.push(i)
      }
    }
    this.counter(this.listOperationsDisplayed)
  }
  Tous(){
    this.listOperationsDisplayed = this.listOperations;
    this.counter(this.listOperationsDisplayed)
  }
  counter(listeOp){
    this.nbrAll = listeOp.length;
    this.nbrSuccess = 0;
    this.nbrFailed = 0;
    for(let i of listeOp){
      if(i.status != 200){
        this.nbrFailed = this.nbrFailed +1;
      }
      if(i.status == 200){
        this.nbrSuccess = this.nbrSuccess +1;
      }
    }
  }
  recherche(){
    this.listOperations = []
    this.listOperationsDisplayed = []
    //this.solde = 0;
    //console.log(JSON.parse(localStorage.getItem("currentuser")))
   this._serviceAdmin.historique({identifiant:localStorage.getItem('token'),date_debut:this.dateDebut,date_fin:this.dateFin}).then(res=>{
    let rep = res;
    if(rep['status'] == true){
      this.listOperations = rep['message'].reverse()
      this.listOperationsDisplayed = this.listOperations;
      this.nbrOp = this.listOperations.length;
      this.counter(this.listOperationsDisplayed)
      this.getListCommade(this.listOperationsDisplayed);
    }else{
      alert(rep['message']);
    }
    })
  }
  ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';
    var row = "";

    for (var index in objArray[0]) {
      ////console.log(index.toLowerCase);

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
  
      for(let i of this.listOperations){
        ////console.log({date:this.getDate(i.dateoperation),service:i.operateur,traitement:i.traitement,montant:i.montant,client:this.trimer(i.infoclient)});
        let status = ''
        if(i.status == 200){
          status = "success"
        }else{
          status = "echec"
        }
        liste.push(
          {
            date_commande:i.date_commande,
            commande:i.commande,
            ref_commande:i.ref_commande,
            numero:i.numero,
            montant:i.montant,
            trx_id:i.trx_id,
            status:status,
          
          }
        );
      }
      //console.log(liste);
      ////console.log(this.ConvertToCSV(liste));
      var csvData = this.ConvertToCSV(liste);
      var a = document.createElement("a");
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      var blob = new Blob([csvData], { type: 'text/csv' });
      var url= window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'report_'+(new Date().toLocaleString())+'.csv';/* your file name*/
      a.click();
      //console.log(csvData);
      this.errorMessage = 2
      return 'success';
    
 
   
    
  }
  onChange(arg){
    console.log(arg)
    if(arg =="tous"){
      this.listOperationsDisplayed = this.listOperations.reverse()
    }else{
      //let temp = this.listOperationsDisplayed;
      this.listOperationsDisplayed = [];
      for(let i of this.listOperations.reverse()){
        console.log(i.commande +" = "+arg);
        if(i.commande == arg){
          console.log(i.commande +" = "+arg);

          this.listOperationsDisplayed.push(i)
        }
      }
      //temp = undefined; 
    }
  }
  getListCommade(arg){
    this.listCommande = [];
    for(let i of this.listOperationsDisplayed){
      if(this.listCommande.includes(i.commande)){
        console.log("existe déjà")
      }else{
        this.listCommande.push(i.commande)
      }
    }
    console.log(this.listCommande);
  }
  ngOnInit() {
    if(localStorage.getItem("token") == null ){
      this.router.navigate(['/']);
    }
    let dd = new Date();
    let d = dd.setDate(-30);
    let df = new Date();
    let f = dd.setDate(30);
    this.dateDebut = ((new Date()).toJSON()).split("T",2)[0];
    this.dateFin = ((new Date()).toJSON()).split("T",2)[0];
    this.listOperations = []
    this.solde = 0;
    //console.log(JSON.parse(localStorage.getItem("currentuser")))
   this._serviceAdmin.historique({identifiant:localStorage.getItem('token'),date_debut:this.dateDebut+" 00:00:00",date_fin:this.dateFin+" 00:00:00"}).then(res=>{
    let rep = res;
    console.log(rep['message'].reverse())
    if(rep['status'] == true){
      this.listOperations = rep['message'].reverse();
      this.nbrOp = this.listOperations.length;
      this.listOperationsDisplayed = this.listOperations;

      this.counter(this.listOperationsDisplayed) 
      this.getListCommade(this.listOperationsDisplayed);
    }else{
      alert(rep['message']);
    }
    })
    this._serviceAdmin.getSolde({identifiant:localStorage.getItem('token')}).then(res=>{
      //console.log(res)
      if(res['status'] == true){
        let response = res['message'];
        for(let i of response){
          let s = parseFloat(i.solde_bbs)+parseFloat(i.solde_client)
          let temp = parseFloat(i.solde_bbs) /2
         let temp2 = parseFloat(i.solde_client) + temp;
         this.solde = this.solde + temp2
          //console.log(s)
          //console.log(this.solde)
        }
        
      }
    })
   
  }

}

