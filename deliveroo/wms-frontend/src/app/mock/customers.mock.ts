import { Customer } from "../customers/customers.model";

export const MOCK_CUSTOMERS: Customer[] = [
    {
      id: 1,
      companyName: 'ABC Corp',
      contactPerson: 'John Smith',
      contactTitle: 'Operations Manager',
      phone: '+1-555-0101',
      email: 'john.smith@abccorp.com',
      address: {
        street: '123 Business Ave',
        city: 'Chicago',
        state: 'IL',
        postalCode: '60601',
        country: 'USA'
      },
      taxId: 'TAX-ABC-001',
      taxInfo: {
        taxNumber: '12-3456789',
        vatNumber: 'US123456789',
        taxExempt: false,
        taxRate: 8.5
      },
      countryOfOrigin: 'USA',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2025-01-10'),
      notes: 'Long-term customer with excellent payment history.'
    },
    {
      id: 2,
      companyName: 'FreshFood Inc',
      contactPerson: 'Sarah Johnson',
      contactTitle: 'Supply Chain Director',
      phone: '+1-555-0102',
      email: 'sarah.johnson@freshfood.com',
      address: {
        street: '456 Food Plaza',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90210',
        country: 'USA'
      },
      taxId: 'TAX-FF-002',
      taxInfo: {
        taxNumber: '98-7654321',
        vatNumber: 'US987654321',
        taxExempt: false,
        taxRate: 9.5
      },
      countryOfOrigin: 'USA',
      status: 'active',
      createdAt: new Date('2024-03-20'),
      updatedAt: new Date('2025-01-08'),
      notes: 'Requires refrigerated storage for perishable goods.'
    },
    {
      id: 3,
      companyName: 'Global Logistics',
      contactPerson: 'Michael Chen',
      contactTitle: 'Logistics Coordinator',
      phone: '+1-555-0103',
      email: 'michael.chen@globallogistics.com',
      address: {
        street: '789 Shipping Blvd',
        city: 'Miami',
        state: 'FL',
        postalCode: '33101',
        country: 'USA'
      },
      taxId: 'TAX-GL-003',
      taxInfo: {
        taxNumber: '55-1234567',
        vatNumber: 'US551234567',
        taxExempt: false,
        taxRate: 7.0
      },
      countryOfOrigin: 'USA',
      status: 'active',
      createdAt: new Date('2024-06-10'),
      updatedAt: new Date('2025-01-05'),
      notes: 'International shipping specialist with complex requirements.'
    },
    {
      id: 4,
      companyName: 'Tech Solutions',
      contactPerson: 'Emily Davis',
      contactTitle: 'Procurement Manager',
      phone: '+1-555-0104',
      email: 'emily.davis@techsolutions.com',
      address: {
        street: '321 Tech Park',
        city: 'Austin',
        state: 'TX',
        postalCode: '73301',
        country: 'USA'
      },
      taxId: 'TAX-TS-004',
      taxInfo: {
        taxNumber: '77-9876543',
        vatNumber: 'US779876543',
        taxExempt: true,
        taxRate: 0
      },
      countryOfOrigin: 'USA',
      status: 'active',
      createdAt: new Date('2024-09-15'),
      updatedAt: new Date('2025-01-12'),
      notes: 'Technology company with tax-exempt status.'
    },
    {
      id: 5,
      companyName: 'Manufacturing Co',
      contactPerson: 'Robert Wilson',
      contactTitle: 'Plant Manager',
      phone: '+1-555-0105',
      email: 'robert.wilson@manufacturingco.com',
      address: {
        street: '654 Industrial Way',
        city: 'Detroit',
        state: 'MI',
        postalCode: '48201',
        country: 'USA'
      },
      taxId: 'TAX-MC-005',
      taxInfo: {
        taxNumber: '33-5678901',
        vatNumber: 'US335678901',
        taxExempt: false,
        taxRate: 6.0
      },
      countryOfOrigin: 'USA',
      status: 'inactive',
      createdAt: new Date('2023-11-20'),
      updatedAt: new Date('2024-12-01'),
      notes: 'Currently inactive due to seasonal operations.'
    }
]; 