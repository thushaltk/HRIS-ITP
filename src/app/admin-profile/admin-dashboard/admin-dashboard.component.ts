import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'service/announcements.service';
import { Announcements } from 'models/announcements.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  announcements: Announcements[] = [];
  private subscription: Subscription;

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(){
    this.announcements = this.announcementService.getAnnouncement();
    this.subscription = this.announcementService.announcementsChanged.subscribe(
      (announcements: Announcements[]) => {
        this.announcements = announcements;
      }
    );
  }



}
