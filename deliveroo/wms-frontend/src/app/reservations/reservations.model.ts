export interface Reservation {
  id: number;
  customerId: number;
  customerName: string;
  storageRequestId: number;
  location: ReservationLocation;
  reservedFrom: Date;
  reservedUntil: Date;
  reservedWeight: number;
  reservedVolume: number;
  status: 'pending' | 'active' | 'expired' | 'cancelled';
  payment: ReservationPayment;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReservationLocation {
  zone: string;
  aisle: string;
  rack: string;
  shelf: string;
  fullLocation: string;
}

export interface ReservationPayment {
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: Date;
  paidDate?: Date;
}