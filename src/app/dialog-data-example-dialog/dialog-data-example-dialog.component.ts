import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Inject } from '@angular/core';
import { ConfirmDailogComponent } from '../confirm-dailog/confirm-dailog.component';
@Component({
  selector: 'app-dialog-data-example-dialog',
  templateUrl: './dialog-data-example-dialog.component.html',
  styleUrls: ['./dialog-data-example-dialog.component.scss']
})
export class DialogDataExampleDialogComponent implements OnInit {
  freshnesslist = ['Brand new', 'Furnished', 'Fake']
  actionBtn: string = 'save'
  productForm!: FormGroup;
  dialogRef: any;
  constructor(private formbuilder: FormBuilder, private api: ApiService, public dialog: MatDialog,
    private dailogRef: MatDialogRef<DialogDataExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) {

  }
  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });

    // console.log(this.editData);
    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);

    }
  }

  addProduct() {
    // console.log(this.productForm.value);
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value)
          .subscribe((res: any) => {
            alert("product added")
            this.productForm.reset();
            this.dailogRef.close('save');

          })
      } else {
        alert("Please enter a valid Deatail")
      }
    } else {
      this.updateProduct();
    }

  }
    updateProduct(){
  this.api.putProduct(this.productForm.value,this.editData.id)
  .subscribe((res:any) =>{
    alert("product updated successfully")
    this.productForm.reset();
    this.dailogRef.close('update')

    })
  // onConfirmClick() {
  //   this.dailogRef.close(true);

  // }
  // }
  // updateProduct() {
  //   debugger
  //   const dialogRef = this.dialog.open(ConfirmDailogComponent, {
  //     width: "30%",
  //     data: {
  //       message: 'Are you sure you want to update?',
  //       s1: 'productUpdate',
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe((res: any) => {
  //     if (res) {
  //       this.api.putProduct(this.productForm.value, this.editData.id)
  //         .subscribe((res: any) => {
  //           alert("product updated successfully")
  //           this.productForm.reset();
  //         });
  //     }
  //   });

  // }
}
}


