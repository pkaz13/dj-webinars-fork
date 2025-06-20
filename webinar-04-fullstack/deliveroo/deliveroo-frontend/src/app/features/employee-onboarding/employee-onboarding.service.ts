import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeOnboardingService {

  constructor() { }

  getPersonalInfoMockData() {
    return {
      name: 'John Doe',
      contactEmail: 'john.doe@example.com',
      hireDate: '2024-01-15',
      address: '123 Main St',
      postalCode: '12345',
      city: 'Anytown',
      country: 'USA',
      dateOfBirth: '1990-05-20',
      gender: 'male',
      nationality: 'American'
    };
  }
}
