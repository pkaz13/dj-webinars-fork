import type { SubmitWarehousingRequestForm, SubmitWarehousingRequestResponse } from './submit-warehousing-request.model'
import { mockSubmitWarehousingRequestResponse } from './submit-warehousing-request.mocks'

export async function submitWarehousingRequest(
  data: SubmitWarehousingRequestForm
): Promise<SubmitWarehousingRequestResponse> {
  // TODO: replace with real HTTP call
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Submitting warehousing request', data)
  return mockSubmitWarehousingRequestResponse
} 