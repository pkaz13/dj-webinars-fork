import pool from './database';
import { EmployeeDTO, toDbRole, toDbStatus } from './employee.model';

/**
 * Inserts a new employee and their details into the database.
 * Returns the inserted employee's id.
 */
export async function insertEmployeeWithDetails(dto: EmployeeDTO): Promise<number> {
  // Format dates as YYYY-MM-DD
  const hireDateStr = dto.hireDate.toISOString().slice(0, 10);
  const dobStr = dto.dateOfBirth.toISOString().slice(0, 10);
  // Insert into employees
  const empResult = await pool.query(
    `INSERT INTO employees (name, role, status, contact_email, hire_date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [
      dto.name,
      toDbRole(dto.role),
      toDbStatus(dto.status),
      dto.contactEmail,
      hireDateStr,
    ]
  );
  const employeeId = empResult.rows[0].id;

  // Insert into employees_details
  await pool.query(
    `INSERT INTO employees_details (employee_id, address, postal_code, city, country, date_of_birth, gender, nationality)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      employeeId,
      dto.address,
      dto.postalCode,
      dto.city,
      dto.country,
      dobStr,
      dto.gender,
      dto.nationality,
    ]
  );

  return employeeId;
} 