import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TrainingPrograms } from '../models/trainingPrograms.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingProgramsService{
  trainingProgamsChanged = new Subject<TrainingPrograms[]>();
  private trainingProgramsArr: TrainingPrograms[] = [];

  constructor(private http: HttpClient){}

  getTrainingPrograms(){
    this.http.get<{message: string, trainingPrograms: any}>('http://localhost:3000/api/trainingPrograms')
      .pipe(map((trainingProgramsData) => {
          return trainingProgramsData.trainingPrograms.map(trainingProgram => {
            return{
              title: trainingProgram.title,
              date: trainingProgram.date,
              description: trainingProgram.description,
              availability: trainingProgram.availability,
              location: trainingProgram.location,
              email: trainingProgram.email,
              id: trainingProgram._id
            };
          });
      }))
      .subscribe((transformedQuickLeaves) => {
        this.trainingProgramsArr = transformedQuickLeaves;
        this.trainingProgamsChanged.next(this.trainingProgramsArr.slice());
      });
    return this.trainingProgramsArr.slice();
  }

  addTrainingProgram(trainingProgram: TrainingPrograms){
    const trainingProgramsArray: TrainingPrograms = {
      id: trainingProgram.id,
      title: trainingProgram.title,
      date: trainingProgram.date,
      description: trainingProgram.description,
      availability: trainingProgram.availability,
      location: trainingProgram.location,
      email: trainingProgram.email
    };
    this.http.post<{message: string}>('http://localhost:3000/api/trainingPrograms', trainingProgramsArray)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.trainingProgramsArr.push(trainingProgramsArray);
        this.trainingProgamsChanged.next(this.trainingProgramsArr.slice());
      });

  }

  deleteTrainingProgram(trainingID: string){
    this.http.delete("http://localhost:3000/api/trainingPrograms/" + trainingID)
      .subscribe(() => {
        console.log('Deleted');
      })
  }
}
