import { DEFAULT_IMG_SRC } from '@/constants';
import { history } from '@umijs/max'
import styles from './index.less';

const footerPath = [
  {
    path: 'park',
    title: '园区概况',
    icon: DEFAULT_IMG_SRC,
  },
  {
    path: '/monitor/list/1',
    title: '历史监控',
    icon: DEFAULT_IMG_SRC,
  },
  {
    path: '/monitor/list/2',
    title: '实时监控',
    icon: DEFAULT_IMG_SRC,
  },
  {
    path: 'security',
    title: '安防检测',
    icon: DEFAULT_IMG_SRC,
  },
];

interface FooterProps {
  onClick: (type: string) => void;
}

const Footer = ({ onClick }: FooterProps) => {


  const handleToPath = (route: string) => {
    if (/\//.test(route)) {
      history.push(route);
    }
    onClick(route);
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.f_warp}>
        {footerPath.map((item, i) => (
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

export default Footer;
