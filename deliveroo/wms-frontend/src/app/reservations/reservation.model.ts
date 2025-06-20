// Storage Reservation
export interface StorageReservation {
  id: number;
  requestId: number;
  customerId: number;
  shelfId: number;
  shelfLocation: string;
  reservedWeight: number;
  reservedVolume: number;
  reservedFrom: Date;
  reservedUntil: Date;
  status: 'pending' | 'active' | 'expired' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
} 