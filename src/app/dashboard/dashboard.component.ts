import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataExampleDialogComponent } from '../dialog-data-example-dialog/dialog-data-example-dialog.component';
import { ApiService } from '../service/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  // uploadForm!:FormGroup;
  title = 'crudDashboard';
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;
  selectedColleges: Array<any> = [];
  @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(public dialog: MatDialog,
    private api: ApiService,private router: Router,private formBuilder: FormBuilder
  ) { }



  ngOnInit(): void {
    this.getAllProducts();

// this.uploadForm=this.formBuilder.group({
//   profile:['']
// })
  }

  productForm!: FormGroup;
  openDialog() {
    this.dialog.open(DialogDataExampleDialogComponent, {
      width: '30%',

    }).afterClosed().subscribe((res) => {
      debugger
      if (res === 'save') {
        this.getAllProducts();
      }else{
        alert('not added');
      }
    }
    );
  }
  // checkBox(e: any, data: any) {
  //   debugger
    
  //   if (!e.checked) {
  //     let index = this.selectedColleges.findIndex((x: any) => x.id == data.id);
  //     this.selectedColleges.splice(index, 1);
  //   } else {
  //     this.selectedColleges.push(data);
  //     console.log(this.selectedColleges[0].collegeName);
  //   }
  // }

  resetCheckbox() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.selectedColleges.length = 0;
  }
  // toggleCheckBox(elementId: any) {
    
  //   return this.selectedColleges
  //     .map((data: any) => data.id)
  //     .indexOf(elementId) != -1
  //     ? true
  //     : false;
  // }
  merge(){
    
  }

  getAllProducts() {
    this.api.getProduct(this.api.getProduct).subscribe((res: any) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      alert("product added all products")
    });
  }

  editProduct(row: any) {
   
    this.dialog.open(DialogDataExampleDialogComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe((res) => {
      debugger
      if (res === 'update') {
        this.getAllProducts();
      }

    }
    );
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe((res: any) => {
      alert("Product deleted");
      this.getAllProducts();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }


  
}
