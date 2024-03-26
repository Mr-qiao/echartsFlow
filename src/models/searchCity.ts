
/**
 * 全局城市搜索数据搜索共享
 */

const model = {
  namespace: "searchCity",
  state: {
    cityCode: '-1', // 城市编码
    showAll: true // 是否显示全国
  },
  effects: {
    // 处理城市信息
    *onChangeCityCode({ payload }, { call, put }) {
      yield put({ type: 'onChangeCityCodeSuccess', payload: payload.cityCode });
    },
    *onChangeShowAll({ payload }, { call, put }) {
      yield put({ type: 'onChangeShowAllSuccess', payload: payload.showAll });
    }
  },
  reducers: {
    onChangeCityCodeSuccess(state, { payload }) {
      return {
        ...state,
        cityCode: payload
      }
    },
    onChangeShowAllSuccess(state, { payload }) {
      return {
        ...state,
        showAll: payload
      }
    }
  }
}

export default model;