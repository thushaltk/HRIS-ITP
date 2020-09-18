import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'service/announcements.service';
import { Announcements } from 'models/announcements.model';
import { Subscription } from 'rxjs';
import { TrainingPrograms } from 'models/trainingPrograms.model';
import { TrainingProgramsService } from 'service/trainingPrograms.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  trainingPrograms: TrainingPrograms[] = [];
  announcements: Announcements[] = [];
  private subscription: Subscription;
  isLoading = false;

  constructor(private announcementService: AnnouncementService, private trainingProgramService: TrainingProgramsService) { }

  ngOnInit(){
    this.isLoading = true;
    this.announcements = this.announcementService.getAnnouncement();
    this.subscription = this.announcementService.announcementsChanged.subscribe(
      (announcements: Announcements[]) => {
        this.announcements = announcements;
        this.isLoading = false;
      }
    );

    this.trainingPrograms = this.trainingProgramService.getTrainingPrograms();
    this.subscription = this.trainingProgramService.trainingProgamsChanged.subscribe(
      (trainingPrograms: TrainingPrograms[]) => {
        this.trainingPrograms = trainingPrograms;

      }
    )
  }



}
