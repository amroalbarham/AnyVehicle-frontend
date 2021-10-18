import React from 'react';
import { Pie } from 'react-chartjs-2';


const PieChart = (props) => {
  const data = {
    labels: ['Accepted', 'Pending', 'Declined'],
    datasets: [
      {
        label: 'Requests Status',
        data: [props.Accepted, props.Pending, props.Declined],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <>
      <div className='header'>
        <h1 className='title'>Requests Status'</h1>
        <div className='links'>
        </div>
      </div>
      <Pie data={data} />
    </>
  );
}

export default PieChart;