import { defineConfig } from '@umijs/max';
import { routes } from './src/routes';

export default defineConfig({
  model: {},
  initialState: {},
  devtool: 'source-map',
  request: {},
  layout: {
    title: '设计师中台-工厂端',
  },
  // theme: { '@primary-color': '#86909C' },
  routes,
  npmClient: 'yarn',
});
