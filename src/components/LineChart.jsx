import React from 'react'
import { Chart } from 'react-charts'
 
export const LineChart = ({ data }) => {

  const chartData = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: data
      },
    ],
    [data]
  )
 
  const axes =
  [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' }
  ];
 
  return (
    <div style={{ padding: '10px', maxWidth: '80%', maxHeight: '500px' }} >
      <Chart data={chartData} axes={axes} />
    </div>
  )


}