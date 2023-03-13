import React from 'react';
import styles from './index.less';
import imgURL from '../../../../public/favicon.png';
import bgUrl from '../../../../public/bj.png';
import { useParams } from '@umijs/max';

export default (props: any) => {
  const params = useParams();
  const bgStyle: any = {
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: `url(${bgUrl})`,
  };
  console.log(params, 'params');
  const UserAgreement =
    'https://s.xinc818.com/assets/h5/prod/MTI=/index.html?a=1';
  const PrivacyAgreement =
    'https://s.xinc818.com/assets/h5/prod/MTM=/index.html?a=1';
  return (
    <div style={bgStyle}>
      <div className={styles.icon}>
        <img src={imgURL}></img>
      </div>
      <div className={styles.box}>
        <iframe
          src={params.id === '1' ? UserAgreement : PrivacyAgreement}
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};
