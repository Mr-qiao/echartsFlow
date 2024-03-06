// 框架布局
import React from 'react';
import styles from './index.less';



interface ChartPanelIProps {
  children: React.ReactNode;
  style?: any;
  title?: string,
  className?: string
}

const ChartPanel = ({ children, style, title, className }: ChartPanelIProps) => {

  return (
    <div className={`${styles.chart} ${className}`} style={style}>

      {title && <div className={styles.chart_title}>{title}</div>}


      <div>{children}</div>

      <div className={`${styles.border_line} ${styles.topleft1}`}></div>
      <div className={`${styles.border_line} ${styles.topleft2}`} ></div>
      <div className={`${styles.border_line} ${styles.topright1}`}></div>
      <div className={`${styles.border_line} ${styles.topright2}`}></div>
      <div className={`${styles.border_line} ${styles.bottomleft1}`}></div>
      <div className={`${styles.border_line} ${styles.bottomleft2}`}></div>
      <div className={`${styles.border_line} ${styles.bottomright1}`}></div>
      <div className={`${styles.border_line} ${styles.bottomright2}`}></div>
    </div>
  )
}

export default ChartPanel;