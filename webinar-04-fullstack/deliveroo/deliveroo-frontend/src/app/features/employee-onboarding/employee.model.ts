// Employee Role and Status enums (matching init.sql)
export enum EmployeeRole {
  Driver = 'driver',
  Dispatcher = 'dispatcher',
  Manager = 'manager',
}

export enum EmployeeStatus {
  Active = 'active',
  OnLeave = 'on leave',
  Inactive = 'inactive',
}

// DTO for inserting a new employee (for both employees and employees_details tables)
export interface EmployeeDTO {
  name: string;
  role: EmployeeRole;
  status: EmployeeStatus;
  contactEmail: string;
  hireDate: Date;
  address: string;
  postalCode: string;
  city: string;
  country:string;
  dateOfBirth: Date;
  gender: string;
  nationality: string;
} 