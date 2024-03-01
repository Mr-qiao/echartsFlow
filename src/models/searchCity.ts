
/**
 * 全局城市搜索数据搜索共享
 */


const model = {
  namespace: "searchCity",
  state: {
    cityCode: -1 // 城市编码
  },
  effects: {
    // 处理城市信息
    *onChangeCityCode({ payload }, { call, put }) {
      yield put({ type: 'onChangeCityCodeSuccess', payload: payload.cityCode });
    }
  },
  reducers: {
    onChangeCityCodeSuccess(state, { payload }) {
      return {
        ...state,
        cityCode: payload
      }
    }
  }
}

export default model;