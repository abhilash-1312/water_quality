'use client';
import TestRequestMain from '@/components/testrequests/TestRequestMain';
import { TestRequestStatus } from '@repo/db/types';

export default function Page() {
  return (
    <TestRequestMain status={TestRequestStatus.PaymentCollected}/>
  );
}
