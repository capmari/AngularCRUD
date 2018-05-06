import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Contact} from './contact.model';

@Injectable()
export class ContactService {

  selectedContact : Contact;
  contactList : Contact[];
  constructor(private http: Http) { }

  postContact(cont : Contact){
    var body = JSON.stringify(cont);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://localhost:50935/api/Contacts',body, requestOptions).map(x => x.json());
  }

  putContact(id, cont) {
    var body = JSON.stringify(cont);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:50935/api/Contacts/' + id, body, requestOptions).map(res => res.json());
  }

  getContactList(){
    this.http.get('http://localhost:50935/api/Contacts')
    .map((data : Response) =>{
      return data.json() as Contact[];
    }).toPromise().then(x => {
      this.contactList = x;
    })
  }

  deleteContact(id: number) {
    return this.http.delete('http://localhost:50935/api/Contacts/' + id).map(res => res.json());
  }
}
