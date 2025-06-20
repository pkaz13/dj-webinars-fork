import { StorageRequest } from '../storage-requests/storage-request.model';

export const MOCK_STORAGE_REQUESTS: StorageRequest[] = [
  {
    id: 1,
    customerId: 1,
    customerName: 'ABC Corp',
    warehouseId: 1,
    requestedEntryDate: new Date('2025-01-15'),
    requestedExitDate: new Date('2025-02-15'),
    status: 'pending',
    cargoDetails: {
      description: 'Electronics equipment',
      weight: 500,
      volume: 25,
      requiresRefrigeration: false,
      requiresFreezing: false,
      isHazardous: false,
      containsPerishables: false,
      estimatedValue: 15000,
      currency: 'USD',
    },
    reservations: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]; 