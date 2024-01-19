import { useState } from 'react';
import Footer from './Footer';

import ReactEcharts from 'echarts-for-react';
import 'echarts-gl';

import Security from './Security';
import Park from './Park';



import styles from './index.less';


// const ROOT_PATH = 'https://echarts.apache.org/examples';


// let option = {
//   backgroundColor: '#000',
//   globe: {
//     environment: 'img/bg09.jpg', //环境贴图
//     baseTexture: "img/globe.jpg", //地球的纹理
//     heightTexture: "img/globe.jpg", //地图的高度纹理
//     displacementScale: 0, //地球顶点位移的大小
//     shading: 'realistic', //着色效果，真实感渲染
//     realisticMaterial: { //真实感渲染配置
//       roughness: 0.8 //材质的粗糙度
//     },
//     postEffect: { //后处理特效配置
//       enable: true
//     },
//     light: { //光照设置
//       main: { //场景主光源设置，在globe设置中就是太阳光
//         intensity: 5, //主光源强度
//         shadow: true //是否投影
//       },
//       ambientCubemap: { //使用纹理作为光源的环境光， 会为物体提供漫反射和高光反射
//         texture: 'img/pisa.hdr', //环境光贴图
//         diffuseIntensity: 0.1 //漫反射强度
//       }
//     }
//   }
// };
const hours = ['0点', '1点', '2点', '3点', '4点', '5点', '6点',
  '7点', '8点', '9点', '10点', '11点', '12点',
  '13点', '14点', '15点', '16点', '17点', '18点',
  '19点', '20点', '21点', '22点', '23点'];
const days = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];

const data = [ //[hour, day, val]
  [0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0],
  [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0],
  [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2],
  [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3],
  [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4],
  [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5],
  [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0],
  [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0],
  [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2],
  [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11],
  [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12],
  [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2],
  [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0],
  [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0],
  [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2],
  [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];
const barOpt = {
  tooltip: {
    formatter: function (params) {
      let series = params.seriesName;
      let val = params.value;
      return series + '<br/>' +
        days[val[1]] + '<br/>' +
        hours[val[0]] + '<br/>值：' + val[2];
    }
  },
  visualMap: {
    max: 15,
    min: 1,
    calculable: true,
    inRange: {
      color: ['#50a3ba', '#eac736', '#d94e5d']
    },
    textStyle: {
      color: '#fff'
    }
  },
  grid3D: {
    boxWidth: 200,
    boxDepth: 80,
    viewControl: {
      distance: 220, //视觉距离
      autoRotate: false //自动旋转
    },
    light: { //光照配置
      main: {
        intensity: 1.2,
        shadow: true
      },
      ambient: {
        intensity: 0.3
      }
    },
    axisLabel: {
      textStyle: {
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#fff',
        width: 1
      }
    },
    axisPointer: {
      show: false
    }
  },
  xAxis3D: {
    type: 'category',
    name: '',
    data: hours
  },
  yAxis3D: {
    type: 'category',
    name: '',
    data: days
  },
  zAxis3D: {
    type: 'value',
    name: ''
  },
  series: [{
    type: 'bar3D',
    name: 'Bar3D',
    data: data.map(function (item) {
      return {
        value: [item[1], item[0], item[2]]
      }
    }),
    shading: 'lambert',
    emphasis: {
      label: {
        textStyle: {
          fontSize: 16,
          color: '#900'
        }
      },
      itemStyle: {
        color: '#900'
      }
    }
  }]
};


const Home: any = () => {
  const [type, setType] = useState('park');

  return (
    <div className={styles.container}>


      <header className={styles.header}>
        <h3 className={styles.title}>{'park' === type ? '可视化数据大屏' : '园区监控系统'} </h3>
        <div className={styles.flexBox}>
          <select className={styles.h_c}>
            <option> 北京市</option>
            <option>自贡市</option>
            <option>攀枝花市</option>
            <option>泸州市</option>
            <option>德阳市</option>
            <option>绵阳市</option>
            <option>广元市</option>
            <option>遂宁市</option>
            <option>内江市</option>
            <option>乐山市</option>
            <option>南充市</option>
            <option>宜宾市</option>
            <option>广安市</option>
            <option>达州市</option>
            <option>巴中市</option>
            <option>雅安市</option>
            <option>眉山市</option>
            <option>资阳市</option>
            <option>阿坝州</option>
            <option>甘孜州</option>
            <option>凉山州</option>
          </select>

          <span className={styles.h_t}>统计截止时间：2023-9-20</span>
        </div>
      </header>



      {/* {'park' === type ? <Park /> : <Security />} */}

      {/* 底部导航 */}
      {/* <Footer onClick={(key) => setType(key)} /> */}
      <ReactEcharts option={barOpt}>
      </ReactEcharts>
    </div>
  );
};

export default Home;
