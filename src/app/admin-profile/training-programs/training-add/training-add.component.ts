import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingPrograms } from 'models/trainingPrograms.model';
import { TrainingProgramsService } from 'service/trainingPrograms.service';

@Component({
  selector: 'app-training-add',
  templateUrl: './training-add.component.html',
  styleUrls: ['./training-add.component.css']
})
export class TrainingAddComponent implements OnInit {
  @ViewChild('trpro', {static: false}) addTrainingProgramsForm: NgForm;
  trainingPrograms: TrainingPrograms = {
    id: '',
    title: '',
    date:'',
    description: '',
    availability: [],
    location: '',
    email: ''
  };
  selectedList = [];

  checkboxesDataList = [
    {
      id: '1',
      label: 'Manager',
      isChecked: false
    },
    {
      id: '2',
      label: 'Engineer',
      isChecked: false
    },
    {
      id: '3',
      label: 'Accountant',
      isChecked: false
    },
    {
      id: '4',
      label: 'Supervisor',
      isChecked: false
    },
    {
      id: '5',
      label: 'Labor',
      isChecked: false
    },
    {
      id: '6',
      label: 'Driver',
      isChecked: false
    },
    {
      id: '7',
      label: 'Cleaning Staff',
      isChecked: false
    },
    {
      id: '8',
      label: 'Security Staff',
      isChecked: false
    }
  ]

  constructor(private router: Router,
    private trainingProgramsService: TrainingProgramsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchSelectedItems();
  }

  onSubmit(){
    this.trainingPrograms.id = null;
    this.trainingPrograms.title = this.addTrainingProgramsForm.value.programTitle;
    this.trainingPrograms.date = this.addTrainingProgramsForm.value.programDate;
    this.trainingPrograms.description = this.addTrainingProgramsForm.value.programDescription,
    this.trainingPrograms.location = this.addTrainingProgramsForm.value.programLocation,
    this.trainingPrograms.availability = this.selectedList;
    this.trainingPrograms.email = this.addTrainingProgramsForm.value.programEmail;

    this.addTrainingProgramsForm.reset();

    this.trainingProgramsService.addTrainingProgram(this.trainingPrograms);


  }

  changeSelection(){
    this.fetchSelectedItems();

  }

  fetchSelectedItems() {
    this.selectedList = this.checkboxesDataList.filter((value, index) => {
      return value.isChecked
    });
  }
}

