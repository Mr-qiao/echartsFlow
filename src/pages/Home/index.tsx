import ReactEcharts from 'echarts-for-react';
import React from 'react';

const HomePage: React.FC = () => {
  let option = {
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 2, name: '报警' },
          { value: 156, name: '正常' },
          { value: 145, name: '离线' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactEcharts option={option} />
    </div>
  );
};

export default HomePage;
