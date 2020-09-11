import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { EmployeeService } from 'service/employees.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Announcements } from 'models/announcements.model';
import { Subscription } from 'rxjs';
import { AnnouncementService } from 'service/announcements.service';


@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css']
})
export class EmpDashboardComponent implements OnInit {
  announcements: Announcements[] = [];
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
