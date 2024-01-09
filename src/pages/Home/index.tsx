import { useModel } from '@umijs/max';
// import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return <div>先休息休息休息</div>;
};

export default HomePage;
