import { EmployeeDTO } from './employee.model';

export function validateEmployeeDTO(dto: any): string[] {
  const errors: string[] = [];
  if (!dto) {
    errors.push('Request body is missing.');
    return errors;
  }
  if (!dto.name) errors.push('Name is required.');
  if (!dto.role) errors.push('Role is required.');
  if (!dto.status) errors.push('Status is required.');
  if (!dto.contactEmail) errors.push('Contact email is required.');
  if (!dto.hireDate) errors.push('Hire date is required.');
  if (!dto.address) errors.push('Address is required.');
  if (!dto.postalCode) errors.push('Postal code is required.');
  if (!dto.city) errors.push('City is required.');
  if (!dto.country) errors.push('Country is required.');
  if (!dto.dateOfBirth) errors.push('Date of birth is required.');
  if (!dto.gender) errors.push('Gender is required.');
  if (!dto.nationality) errors.push('Nationality is required.');
  return errors;
} 