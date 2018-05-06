import { Component, OnInit } from '@angular/core';
import { ContactService } from '../shared/contact.service';
import { Contact } from '../shared/contact.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor(public contactService : ContactService, private toastr : ToastrService) { }

  ngOnInit() {
    this.contactService.getContactList();
  }

  showForEdit(cont: Contact) {
    this.contactService.selectedContact = Object.assign({}, cont);
  }

  onDelete(id : number){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.contactService.deleteContact(id)
      .subscribe(x => {
        this.contactService.getContactList();
        this.toastr.warning("Deleted Successfully","Contacts Register");
      })
    }
  }
}
