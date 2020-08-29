import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from './confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  constructor(public dialog: MatDialog) {}

  confirm(message: string) {
    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: dialogData,
    });

    // dialogRef.afterClosed().subscribe(dialogResult => {
    //   this.result = dialogResult;
    // });
    return new Promise((confirm, reject) => {
      dialogRef.afterClosed().subscribe((answer) => {
        if (answer) {
          confirm(answer);
        } else {
          reject();
        }
      });
    });
  }
}
