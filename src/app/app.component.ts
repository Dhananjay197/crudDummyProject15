import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

constructor(public http: HttpClient,public sharedService: SharedService,){
  
}

  ngOnInit(): void {
   
    // this.sharedService.global_loader=true
  
  }

 
  
}
