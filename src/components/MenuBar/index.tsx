import { history } from '@umijs/max'


import styles from './index.less';

const MenuBarPath = [
  {
    path: '/nationalOverview',
    title: '全国概况',
    icon: require('../../../public/img/全国概况.png')
  },
  {
    path: '/parkOverview',
    title: '园区概况',
    icon: require('../../../public/img/园区概况.png')
  },
  {
    path: '/parkMonitor',
    title: '园区监控',
    icon: require('../../../public/img/园区监控.png')
  },
  {
    path: '/securityMonitor',
    title: '安防检测',
    icon: require('../../../public/img/安防检测.png')
  },
];


const MenuBar = () => {


  const handleToPath = (route: string) => {
    if (/\//.test(route)) {
      history.push(route);
    }
    // onClick(route);
  }

  return (
    <footer className={styles.MenuBar}>
      <div className={styles.f_warp}>
        {MenuBarPath.map((item, i) => (
          <div
            key={i}
            className={styles.flexBox}
            onClick={() => handleToPath(item.path)}
          >
            <img alt={item.icon} src={item.icon} />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default MenuBar;
