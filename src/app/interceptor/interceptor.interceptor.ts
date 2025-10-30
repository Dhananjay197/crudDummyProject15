import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpErrorResponse, HttpEvent, HttpResponse
} from '@angular/common/http';
import { finalize, catchError, map } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class Interceptor implements HttpInterceptor {
  private totalRequests = 0;
  
  constructor(public router: Router, public sharedService : SharedService) {
    
  }
 
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;
    this.sharedService.global_loader = true;
   

    // if(sessionStorage.getItem('token')){
    //   request = request.clone({
     
    //     setHeaders: {
    //       // "Access-Control-Allow-Origin":``,
    //       "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
        
    //     }
    //   });
    // }
    // else{
    //   //if(request.method === 'POST'){
    //   request = request.clone({
     
    //     setHeaders: {
    //       'Access-Control-Allow-Origin': '*',
    //       "Authorization": `Bearer ${sessionStorage.getItem('btoken')}`,
          
    //     }
    //   });
    // //}
    // }
    
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          // setTimeout(() => {
            
          // })
          this.sharedService.global_loader = false;
        }
      }),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
         
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.sharedService.global_loader = false;
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);

        }
       


        return throwError(error);

      })
    );

  }

}
