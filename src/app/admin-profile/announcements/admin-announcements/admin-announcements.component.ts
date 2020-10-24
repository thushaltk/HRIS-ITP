import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementService } from 'service/announcements.service';
import { Announcements } from 'models/announcements.model';
import { Subscription } from 'rxjs';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-admin-announcements',
  templateUrl: './admin-announcements.component.html',
  styleUrls: ['./admin-announcements.component.css']
})
export class AdminAnnouncementsComponent implements OnInit, OnDestroy {
  announcements: Announcements[] = [];
  disable: boolean = true;
  search: string;
  private subscription: Subscription;
  isLoading = false;

  constructor(private router: Router, private announcementService: AnnouncementService) { }

  ngOnInit(){
    this.isLoading = true;
    this.announcements = this.announcementService.getAnnouncement();
    this.subscription = this.announcementService.announcementsChanged.subscribe(
      (announcements: Announcements[]) => {
        this.announcements = announcements;
        this.isLoading = false;
      }
    );
    console.log(this.announcements);
  }

  onDelete(announcementID: string){
    this.announcementService.deleteAnnouncement(announcementID);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
