import { Component, OnInit, ViewChild } from '@angular/core';
import { Announcements } from '../../../../../models/announcements.model';
import { AnnouncementService } from 'service/announcements.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-announcement-create',
  templateUrl: './announcement-create.component.html',
  styleUrls: ['./announcement-create.component.css']
})
export class AnnouncementCreateComponent implements OnInit {
  @ViewChild('ann', {static: false}) addAnnouncementForm: NgForm;
  defaultValue = "choose";
  defaultValue2 = "chooseValidity";
  announcements: Announcements = {
    id: '',
    title: '',
    date: '',
    content: '',
    priority: '',
    validity: ''
  };
  submitted=false;
  //private subscription: Subscription;

  constructor(private router: Router,
              private announcementService: AnnouncementService,
              private route: ActivatedRoute) { }

  ngOnInit(){
  }

  onSubmit(){
    console.log(this.addAnnouncementForm);
    this.submitted = true;
    this.announcements.id = null;
    this.announcements.title = this.addAnnouncementForm.value.title;
    this.announcements.date = this.addAnnouncementForm.value.dateCreated;
    this.announcements.content = this.addAnnouncementForm.value.content;
    this.announcements.priority = this.addAnnouncementForm.value.priority;
    this.announcements.validity = this.addAnnouncementForm.value.validity;

    this.addAnnouncementForm.reset();

    this.announcementService.addAnnouncement(this.announcements);

    this.router.navigate(['../view'], {relativeTo: this.route});

  }

}
