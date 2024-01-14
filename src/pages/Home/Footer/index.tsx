import { DEFAULT_IMG_SRC } from '@/constants';

import styles from './index.less';

const footerPath = [
  {
    path: '1',
    title: '园区概况',
    img: DEFAULT_IMG_SRC,
  },
  {
    path: '2',
    title: '历史监控',
    img: DEFAULT_IMG_SRC,
  },
  {
    path: '3',
    title: '实时监控',
    img: DEFAULT_IMG_SRC,
  },
  {
    path: '4',
    title: '安防检测',
    img: DEFAULT_IMG_SRC,
  },
];

interface FooterProps {
  onClick: (type: string) => void;
}

const Footer = ({ onClick }: FooterProps) => {
  return (
    <div className={styles.main_middle}>
      <div className={styles.m_m_f}>
        {footerPath.map((item, i) => (
          <div
            key={i}
            className={styles.flexBox}
            onClick={() => onClick(item.path)}
          >
            <img alt="" src={item.img} />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
