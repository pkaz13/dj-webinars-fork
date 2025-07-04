import type { SubmitTransportationRequestForm, SubmitTransportationRequestResponse } from './submit-transportation-request.model'
import { mockSubmitTransportationRequestResponse } from './submit-transportation-request.mocks'

export async function submitTransportationRequest(
  data: SubmitTransportationRequestForm
): Promise<SubmitTransportationRequestResponse> {
  // TODO: replace with real HTTP call
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Submitting transportation request', data)
  return mockSubmitTransportationRequestResponse
} 