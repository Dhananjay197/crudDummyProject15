import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dailog',
  templateUrl: './confirm-dailog.component.html',
  styleUrls: ['./confirm-dailog.component.scss']
})
export class ConfirmDailogComponent {
  message: string = "Are you sure you want to delete this record?";
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";
  remarks: any;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if(data){
        this.message = data.message || this.message;
        if (data.buttonText) {
          this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
          }
  }
  ngOnInit(): void {
  }
 
  onConfirmClick(){
    this.dialogRef.close(true)
  }
}


