import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { ContactService } from '../shared/contact.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contactService : ContactService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.contactService.selectedContact = {
      Id: null,
      FirstName: '',
      LastName: '',
      ZipCode: '',
      City: '',
      TelephoneNumber: ''
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.Id == null) {
      this.contactService.postContact(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.contactService.getContactList();
          this.toastr.success('New Record Added Succcessfully', 'Employee Register');
        })
    }
    else {
      this.contactService.putContact(form.value.Id, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.contactService.getContactList();
        this.toastr.info('Record Updated Successfully!', 'Employee Register');
      });
    }
  }
}
