import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingPrograms } from 'models/trainingPrograms.model';
import { Subscription } from 'rxjs';
import { TrainingProgramsService } from 'service/trainingPrograms.service';

@Component({
  selector: 'app-training-view',
  templateUrl: './training-view.component.html',
  styleUrls: ['./training-view.component.css']
})
export class TrainingViewComponent implements OnInit, OnDestroy {
  trainingPrograms: TrainingPrograms[] = [];
  private subscription: Subscription;

  constructor(private router: Router, private trainingProgramService: TrainingProgramsService,
    private route: ActivatedRoute ) { }


  ngOnInit(): void {
    this.trainingPrograms = this.trainingProgramService.getTrainingPrograms();
    this.subscription = this.trainingProgramService.trainingProgamsChanged.subscribe(
      (trainingPrograms: TrainingPrograms[]) => {
        this.trainingPrograms = trainingPrograms;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(id: string){
    this.trainingProgramService.deleteTrainingProgram(id);
    window.location.reload();

  }



}
