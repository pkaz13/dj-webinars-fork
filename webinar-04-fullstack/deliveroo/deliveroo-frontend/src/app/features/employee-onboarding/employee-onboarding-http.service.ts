import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { EmployeeDTO } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeOnboardingHttpService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  addEmployee(employee: EmployeeDTO) {
    return this.http.post(`${this.baseUrl}/employees`, employee).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error.message || error.statusText);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
