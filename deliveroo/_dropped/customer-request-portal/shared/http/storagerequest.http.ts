export interface StorageRequestData {
  cargo: {
    description: string;
    duration: string;
    warehouse: string;
  };
  customer: {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
  };
  termsAccepted: boolean;
}

export interface StorageRequestResponse {
  referenceNumber: string;
}

export async function postStorageRequest(
  allData: StorageRequestData
): Promise<StorageRequestResponse> {
  // Simulate HTTP POST using fetch (not actually sending)
  await fetch('/api/storage_request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(allData),
  });

  // Mocked response
  return new Promise((resolve) => {
    setTimeout(() => {
      const referenceNumber = 'SR-' + Math.floor(100000 + Math.random() * 900000).toString();
      resolve({ referenceNumber });
    }, 800); // Simulate network delay
  });
} 