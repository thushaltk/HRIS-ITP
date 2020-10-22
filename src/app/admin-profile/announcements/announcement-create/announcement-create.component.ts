import { Component, OnInit, ViewChild } from '@angular/core';
import { Announcements } from '../../../../../models/announcements.model';
import { AnnouncementService } from 'service/announcements.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { formatCurrency } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-announcement-create',
  templateUrl: './announcement-create.component.html',
  styleUrls: ['./announcement-create.component.css']
})
export class AnnouncementCreateComponent implements OnInit {
  @ViewChild('ann', { static: false }) addAnnouncementForm: NgForm;
  defaultValue = "choose";
  defaultValue2 = "chooseValidity";
  private mode = 'create';
  dateToday: string;
  demoBtnClicked: boolean = false;
  private announcementID: string;
  announcementsDetails: Announcements;
  announcements: Announcements = {
    id: '',
    title: '',
    date: '',
    content: '',
    priority: '',
    validity: ''
  };
  submitted = false;

  constructor(private router: Router,
    private announcementService: AnnouncementService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.demoBtnClicked = false;
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    this.dateToday = year + "-" + (month + 1) + "-" + day;
    this.route.paramMap.subscribe(((paramMap: ParamMap) => {
      if (paramMap.has("annID")) {
        this.mode = "edit";
        this.announcementID = paramMap.get("annID");
        this.announcementsDetails = this.announcementService.getAnnouncementByID(this.announcementID);
      } else {
        this.mode = "create";
        this.announcementID = null;
      }

    }))

  }

  onSubmit() {
    this.demoBtnClicked = false;
    this.submitted = true;
    this.announcements.id = this.announcementID;
    this.announcements.title = this.addAnnouncementForm.value.title;
    this.announcements.date = this.addAnnouncementForm.value.dateCreated;
    this.announcements.content = this.addAnnouncementForm.value.content;
    this.announcements.priority = this.addAnnouncementForm.value.priority;
    this.announcements.validity = this.addAnnouncementForm.value.validity;

    if (this.mode === "create") {
      this.announcementService.addAnnouncement(this.announcements);
      this.router.navigate(['../view'], { relativeTo: this.route });
    } else {
      this.announcementService.updateAnnouncement(this.announcements);
      this.router.navigate(['../../view'], { relativeTo: this.route });
    }


  }

  fillData() {
    this.announcements.title = "ITP Project Announcement";
    this.announcements.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae turpis massa sed elementum. Suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Nunc non blandit massa enim nec dui nunc mattis. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Orci eu lobortis elementum nibh tellus molestie nunc. Proin fermentum leo vel orci porta non pulvinar. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Sed blandit libero volutpat sed cras ornare arcu dui vivamus. Consequat interdum varius sit amet mattis vulputate. Vitae elementum curabitur vitae nunc sed. Id aliquet lectus proin nibh nisl condimentum. Vitae tempus quam pellentesque nec nam aliquam sem. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Aenean vel elit scelerisque mauris."
    this.announcements.priority = "HIGH";
    this.announcements.validity = "3 days";
    this.demoBtnClicked = true;
  }
}
