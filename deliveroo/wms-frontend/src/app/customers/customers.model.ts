export interface Customer {
  id: number;
  companyName: string;
  contactPerson: string;
  contactTitle?: string;
  phone: string;
  email: string;
  address: CustomerAddress;
  taxId?: string;
  taxInfo?: CustomerTaxInfo;
  countryOfOrigin: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface CustomerAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CustomerTaxInfo {
  taxNumber?: string;
  vatNumber?: string;
  taxExempt: boolean;
  taxRate?: number;
}