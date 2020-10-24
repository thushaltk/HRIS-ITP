import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from 'service/employees.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Announcements } from 'models/announcements.model';
import { Subscription } from 'rxjs';
import { AnnouncementService } from 'service/announcements.service';
import { AttendanceService } from 'service/attendance.service';
import { Attendance } from 'models/attendance.model';
import { Employees } from 'models/employees.model';
import { Payroll } from 'src/app/_models/payroll.model';
import { PayrollService } from 'src/app/_services/payroll.service';
import { Salary } from 'src/app/_models/salary.model';
import { AuthService } from '../../_services/auth.service';
import { TrainingPrograms } from 'models/trainingPrograms.model';
import { TrainingProgramsService } from 'service/trainingPrograms.service';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css'],
})
export class EmpDashboardComponent implements OnInit {
  payrolls: Payroll[];
  baseSal: any;
  trainingPrograms: TrainingPrograms[] = [];
  announcements: Announcements[] = [];
  attendances: Attendance[] = [];
  nic: string;
  name: string;
  empID: string;
  count: number = 0;
  private subscription: Subscription;
  isLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private announcementService: AnnouncementService,
    private attendanceService: AttendanceService,
    private payrollService: PayrollService,
    private trainingProgramService: TrainingProgramsService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.announcements = this.announcementService.getAnnouncement();
    this.subscription = this.announcementService.announcementsChanged.subscribe(
      (announcements: Announcements[]) => {
        this.announcements = announcements;
        this.isLoading = false;
      }
    );
    console.log(this.announcements);

    this.route.params.subscribe((params: Params) => {
      this.nic = this.authService.getNic();
      console.log(this.nic);
      this.attendances = this.attendanceService.getAttendance();
      this.subscription = this.attendanceService.attendanceChanged.subscribe(
        (attendance: Attendance[]) => {
          this.attendances = attendance;
          for (let att of this.attendances) {
            if (att.nic === this.nic) {
              this.count = this.count + 1;
              this.name = att.fullName;
              this.empID = att.empID;
            }
          }
        }
      );
    });

    this.payrollService.getPayroll().subscribe((payrolls) => {
      this.payrolls = payrolls;
      for (let payroll of this.payrolls) {
        if (payroll.employee.fullName === this.name) {
          this.baseSal = payroll.baseSalary;
        }
      }
    });

    this.trainingPrograms = this.trainingProgramService.getTrainingPrograms();
    this.subscription = this.trainingProgramService.trainingProgamsChanged.subscribe(
      (trainingPrograms: TrainingPrograms[]) => {
        this.trainingPrograms = trainingPrograms;

      }
    )
  }

  onDelete(announcementID: string) {
    this.announcementService.deleteAnnouncement(announcementID);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
