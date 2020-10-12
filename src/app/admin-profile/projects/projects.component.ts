import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { IProject } from '../../_models/project.model';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EquipmentService } from '../../_services/equipment.service';
import { ConfirmService } from '../../shared/confirm.service';
import { ProjectsService } from '../../_services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  displayedColumns: string[] = [
    'projectId',
    'name',
    'location',
    'startDate',
    'duration',
    'client',
    // 'clientName',
    // 'clientPhone',
    // 'clientAddress',
    'supervisor',
    'consultant',
    // 'employees',
    'progress',
    'action',

  ];
  columns: string[] = [
    'projectId',
    'name',
    'location',
    'startDate',
    'duration',
    'clientName',
    'clientPhone',
    'clientAddress',
    'supervisor',
    'consultant',
    'employees',
    'action',
    'progress'
  ];
  columnsFilter = new FormControl(this.columns);
  dataSource = new MatTableDataSource<IProject>();
  projects: IProject[] = [];
  project: IProject;
  keyword: string = '';
  loading: boolean;
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private equipmentService: EquipmentService,
    private confirmService: ConfirmService,
    private projectService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.getProjects();

    this.columnsFilter.valueChanges.subscribe((values) => {
      console.log(values);
      this.displayedColumns = values;
    });
  }

  openModal() {
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe((result) => {
      this.project = null;
    });
  }

  getProjects() {
    this.loading = true;
    this.projectService.getProjects().subscribe(
      (res) => {
        this.projects = res as [];
        this.dataSource = new MatTableDataSource<IProject>(this.projects);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      (err) => {
        this.toastr.error(`${err}`);
        this.loading = false;
      }
    );
  }

  pushNewProject(event) {
    console.log(event);
    this.projects.push(event);
    this.dataSource = new MatTableDataSource<IProject>(this.projects);
    this.dataSource.paginator = this.paginator;
    this.closeModal();
  }

  closeModal() {
    let dialogRef = this.dialog.closeAll();
  }

  setUpdate(project) {
    // this.openModal();
    this.project = project;
    this.router.navigate(['admin/projects/new'], {
      queryParams: {
        id: project._id
      }
    })
  }

  updateProject(event) {
    console.log(event);
    this.closeModal();
    let index = this.projects.findIndex((element) => element._id == event._id);
    console.log(index);
    if (index > -1) {
      this.projects[index] = event;
      this.dataSource = new MatTableDataSource<IProject>(this.projects);
      this.dataSource.paginator = this.paginator;
    } else {
      this.toastr.error(
        'Error Occurred while trying to update the table.please refresh to see updated results'
      );
    }
  }

  deleteProject(project) {
    this.confirmService
      .confirm(
        `Are you sure to delete ${project.name} ? this cannot be undone`
      )
      .then(
        (confirm) => {
          this.projectService.delete(project).subscribe(
            (res) => {
              console.log(res);

              if (res) {
                this.toastr.success(`Project, ${project.name} removed`);
                this.projects = this.projects.filter(
                  (element) => element._id != project._id
                ); //remove deleted item
                this.dataSource = new MatTableDataSource<IProject>(
                  this.projects
                );
                this.dataSource.paginator = this.paginator;
              } else {
                this.toastr.error('Can not find the Project');
              }
            },
            (err) => {
              console.log(err);
              this.toastr.error(
                'Error Ocurred while trying to delete the Project'
              );
            }
          );
        },
        (reject) => { }
      );
  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
