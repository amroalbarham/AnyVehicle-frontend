import React, { useContext } from 'react';
import WholeRequests from './WholeRequests';
import Chart from './Chart';
import { UserContext } from '../../Context/Context';


export default function AdminPage() {
  const context = useContext(UserContext);
  return (
    <>
      <WholeRequests />
      <Chart Accepted={context.requestStatusData.Accepted} Pending={context.requestStatusData.Pending} Declined={context.requestStatusData.Declined} />
    </>
  )
}