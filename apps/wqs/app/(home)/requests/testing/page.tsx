import TestRequestMain from '@/components/testrequests/TestRequestMain'
import { TestRequestStatus } from '@repo/db/types'

export default function page() {
  return (
    <TestRequestMain status={TestRequestStatus.Testing}/>
  )
}
