// import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.css"],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {}

  ngOnInit() {}

  onConfirm(value): void {
    // Close the dialog, return true
    this.dialogRef.close(value);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {
  constructor(public title: string, public message: string) {
    console.log(title);
    console.log(message);
  }
}
