import type { SubmitTransportationRequestResponse } from './submit-transportation-request.model'

export const mockSubmitTransportationRequestResponse: SubmitTransportationRequestResponse = {
  success: true,
  message: 'Transportation request submitted successfully',
  requestNumber: `TR-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
} 