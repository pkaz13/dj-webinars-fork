import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { EmployeeDTO } from './employee.model';

interface EmployeeApiError {
  errors: string[];
}

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
    if (error.status === 400) {
      const apiError = error.error as EmployeeApiError;
      if (apiError && Array.isArray(apiError.errors)) {
        return throwError(() => apiError.errors);
      }
    }
    
    const errorMessage = 'A server error occurred. Please try again later.';
    console.error('An error occurred:', error.error);
    return throwError(() => [errorMessage]);
  }
}
