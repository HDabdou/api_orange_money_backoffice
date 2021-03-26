import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private url = "http://www.1xpay.me/index.php/backoffice";
  private header :HttpHeaders;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders(
      {'Content-Type': 'application/x-www-form-urlencoded',
      //'id':JSON.parse(localStorage.getItem("currentuser")).iduser,
      //'Timestamp':JSON.parse(localStorage.getItem("currentuser")).timestamp,
      //'Token':JSON.parse(localStorage.getItem("currentuser")).token,
    },
     
    );

   }
   public login(param): Promise<any>{
    let params="requestParam="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/pm/login";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
  } 
 
  public getSolde(param): Promise<any>{
    let params="requestParam="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/pm/getSolde";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
  } 
 
  public historique(param): Promise<any>{
    let params="requestParam="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/pm/historique";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
  } 
  
  public updatepassword(param): Promise<any>{
    let params="requestParam="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/pm/changepassword";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => { return 'bad' });
  } 

}
