import React, { useEffect, useState, useRef } from 'react'
import AMap from 'AMap'
import Loca from 'Loca'
// import { getZoomDetail, getMarkerDetail } from '../../api/region'
// import storageUtils from '../../utils/storageUtils'
// import { getImgUrl } from '../../utils/urlUtil'
import './index.less'
// bike普通点
let normalMarker = new AMap.Marker({
  anchor: 'bottom-center',
  zIndex: 10000,
  offset: [0, -23]
})
// zone普通点
let normalZone = new AMap.Marker({
  anchor: 'bottom-center',
  zIndex: 10000,
  offset: [0, -23]
})
let makerIconRed = {
  type: 'image',
  image: 'https://fecdn.qeebike.com/super/bike_red2.png',
  size: [8, 8],
  anchor: 'bottom-center'
}
// let makerIconGreen = {
//     type: 'image',
//     image: 'http://fecdn.qeebike.com/super/bike_green2.png',
//     size: [8, 8],
//     anchor: 'bottom-center'
// }
const imgList = [
  'https://fecdn.qeebike.com/bikeicon/m_p0.png',
  'https://fecdn.qeebike.com/bikeicon/m_p1.png',
  'https://fecdn.qeebike.com/bikeicon/m_p2.png',
  'https://fecdn.qeebike.com/bikeicon/m_p3.png'
]
let trafficIcons = {
  1: 'https://a.amap.com/Loca/static/loca-v2/demos/images/traffic-control.png',
  2: 'https://a.amap.com/Loca/static/loca-v2/demos/images/jam.png',
  3: 'https://a.amap.com/Loca/static/loca-v2/demos/images/construction.png',
  4: 'https://a.amap.com/Loca/static/loca-v2/demos/images/close.png',
  5: 'https://a.amap.com/Loca/static/loca-v2/demos/images/fog.png',
  0: 'https://a.amap.com/Loca/static/loca-v2/demos/images/accident.png'
}
let zoneIconLayer = null
let geoIcon = null

let lineLayer = null
let geoLine = null

let polygonList = []

let breathRed3 = null
let geoLevelF3 = null

let breathRed4 = null
let geoLevelF4 = null
const Smap = ({
  mapType,
  map,
  loca,
  layer,
  cityName,
  parkingZone,
  bikeHeatData,
  bikeLatLngData,
  trajectory,
  AppContext,
  history
}) => {
  const layerMarkers = useRef([])
  let heatMapInit = useRef(null)
  let district = useRef(null)
  let polygons = useRef([])
  let moveTimer = useRef(null)
  let moveMarkTimer = useRef(null)

  let oldLatLngData = useRef([])
  let areaOperation = useRef([])
  let cluster = useRef(null)
  let bounds = useRef(null)
  let polygonClick = useRef(null)

  const drawBounds = () => {
    //加载行政区划插件 画完行政区域会导致点击地图无效
    if (!district.current) {
      //实例化DistrictSearch
      let opts = {
        subdistrict: 0, //获取边界不需要返回下级行政区
        extensions: 'all', //返回行政区边界坐标组等具体信息
        level: 'district' //查询行政级别为 市
      }
      district.current = new AMap.DistrictSearch(opts)
    }
    //行政区查询
    district.current.setLevel('district')
    let addr = storageUtils.getCityId()
    //黔西县编号修改
    if (addr == '520522') {
      addr = '520581'
    }
    district.current.search(`${addr}`, function (status, result) {
      map && map.remove(polygons.current) //清除上次结果
      polygons.current = []
      let bounds = result && result.districtList && result.districtList[0].boundaries
      if (bounds) {
        for (let i = 0, l = bounds.length; i < l; i++) {
          //生成行政区划polygon
          let polygon = new AMap.Polygon({
            strokeWeight: 2,
            path: bounds[i],
            zIndex: 1,
            fillOpacity: 0,
            // fillColor: '#80d8ff',
            strokeColor: '#04e4f9'
          })
          bounds.current = polygon
          polygons.current.push(polygon)
        }
      }
      map.add(polygons.current)
    })
  }
  //输出雷达点数据格式
  const getFeatureList = (area, type) => {
    let featureList = []
    for (let i = 0; i < area.length; i++) {
      if (area[i].pileupStatus === type && area[i].point && area[i].point.length > 0) {
        featureList.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: area[i].point
          }
        })
      }
    }
    return featureList
  }
  const goZoneDetail = id => {
    let win = window.open('about:blank')
    if (win) {
      win.location.href = `#/city/regionManage/detail?id=${id}`
    }
  }

  //必须挂到window上 不然找不到这个方法
  window.goZoneDetail = goZoneDetail
  const clearWindow = () => {
    map.remove(normalMarker)
    map.remove(normalZone)
  }
  window.clearWindow = clearWindow
  //创建区域
  const createZone = area => {
    const polygon = new AMap.Polygon({
      map: map,
      bubble: true,
      strokeWeight: 2,
      fillOpacity: 0,
      zIndex: area.type === 2 ? 9 : 8,
      extData: {
        zoneId: area.id,
        name: area.name,
        point: area.point
      },
      strokeColor:
        area.status === 2 ? 'red' : area.type === 1 ? '#3e50f7' : area.type === 2 ? '#006408' : '#840000',
      strokeOpacity: 1,
      strokeStyle: area.type === 1 ? 'dashed' : 'solid',
      path: area.coords
    })
    area.type === 1 && areaOperation.current.push(polygon)
    console.log(area, '测试点击')
    if (area.type === 2) {
      polygon.on('click', e => {
        map.remove(normalMarker)
        console.log('点击area', '测试点击')
        moveTimer.current = setTimeout(async () => {
          let obj = e.target._opts && e.target._opts.extData
          let position = obj.point
          try {
            // const res = await getZoomDetail({ zoneId: obj.zoneId })
            // if (res.status === 0) {
            //   const data = res.data
            //   let content = ''
            //   let url = ''
            //   let topkx = 98
            //   if (data.companyBikeCounts.length > 0) {
            //     content = data.companyBikeCounts
            //       .map((item, index) => {
            //         return `<p key={${index}}>${item.companyName}：${item.bikeCount}</p>`
            //       })
            //       .join('')
            //   }
            //   if (data.lastImage) {
            //     // url = `<img src='${getImgUrl(data.lastImage, true, false, 126)}' />`
            //     topkx = 99
            //   }
            //   const htmlbody = `<div class="amap-info-window-area" > 
            //                         <div>
            //                             <div class="wind-title">
            //                                 <span class="a_name" onclick="goZoneDetail('${data.id}')">
            //                                     ${data.name}
            //                                 </span>
            //                                 <span class="iconfont icon-cha color-cha"  onclick="clearWindow()"></span>
            //                             </div>
            //                             <div class="a_text">
            //                                 <p>容量：${data.bikeCount}</p>
            //                                 <p>当前数量：${data.stoppedBikeCount}</p>
            //                                 <div id="companys">
            //                                     ${content}
            //                                 </div>
            //                                 <div class="a_image" style="height:${url ? '126' : ''}px">${url}</div>
            //                             </div>
            //                         </div>
            //                         <div class="area-footer">
            //                             <div class="shixin"></div>
            //                             <div class="kongxin" style="top: ${topkx}%"></div>
            //                         </div>
            //                     </div>`
            //   normalZone.setContent(htmlbody)
            //   normalZone.setPosition(position)
            //   map.add(normalZone)
            // }
          } catch (error) { }
        }, 200)
        polygonClick.current = polygon
      })
    }
    polygonList.push(polygon)
  }
  //还车点聚合（实时推送不可以实现改变聚合点 需要销毁重新创建，但是销毁还是存在内存残留，故放弃用聚合）
  const createZoneMarker = points => {
    let bgColor,
      count = points.length
    let tolerance = 1
    if (points.length > 100 && points.length < 500) {
      tolerance = 15
    } else if (points.length > 500) {
      tolerance = 25
    }
    let _renderClusterMarker = function (context) {
      const pileupStatusList = context.clusterData.map(item => item.pileupStatus)
      // 聚合中点个数 堆积状态 1-正常 2-预警 3-饱和 4-堆积
      let clusterCount = context.count
      let div = document.createElement('div')
      // 聚合点配色
      let defaultColor = ['14,100,178', '7,133,222', '250,146,3', '255,69,24']
      if (pileupStatusList.includes(4)) {
        bgColor = defaultColor[3]
      } else if (pileupStatusList.includes(3)) {
        bgColor = defaultColor[2]
      } else if (pileupStatusList.includes(2)) {
        bgColor = defaultColor[1]
      } else if (pileupStatusList.includes(1)) {
        bgColor = defaultColor[0]
      }
      div.style.backgroundColor = 'rgba(' + bgColor + ',.8)'
      let size = Math.round(tolerance + Math.pow(clusterCount / count, 1 / 5) * 30)
      div.style.width = div.style.height = size + 'px'
      div.style.border = 'solid 1px rgba(' + bgColor + ',1)'
      div.style.borderRadius = size / 2 + 'px'
      div.innerHTML = context.count
      div.style.lineHeight = size + 'px'
      div.style.color = '#ffffff'
      div.style.fontSize = '10px'
      div.style.textAlign = 'center'
      context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2))
      context.marker.setContent(div)
    }
    let _renderMarker = function (context) {
      const imgUrl = imgList[context.data[0].pileupStatus - 1]
      let content = `<img style="height: 24px; width: 20px;" src=${imgUrl}></img>`
      let offset = new AMap.Pixel(-10, -24)
      context.marker.setContent(content)
      context.marker.setOffset(offset)
    }
    cluster.current = new AMap.MarkerCluster(map, points, {
      gridSize: 60, // 聚合网格像素大小
      renderClusterMarker: _renderClusterMarker, // 自定义聚合点样式
      renderMarker: _renderMarker // 自定义非聚合点样式
    })
  }
  const IconRender = list => {
    if (!zoneIconLayer) return false
    geoIcon && geoIcon.destroy()
    geoIcon = new Loca.GeoJSONSource({
      data: {
        type: 'FeatureCollection',
        features: list
      }
    })

    zoneIconLayer && zoneIconLayer.setSource(geoIcon)
  }
  const drawParkingZone = ({ isSocket, zoneData }) => {
    if (map && !mapType && heatMapInit.current) {
      heatMapInit.current.hide()
      heatMapInit.current = null
    }
    if (zoneData && zoneData.length > 0) {
      //饱和data
      let featureList3 = getFeatureList(zoneData, 3) || []

      //堆积data
      let featureList4 = getFeatureList(zoneData, 4) || []

      //zoneMaker
      let list = zoneData
        .filter(item => item.type === 2 || !item.type)
        .map(area => {
          return {
            type: 'Feature',
            properties: {
              rawData: {
                pileupStatus: area.pileupStatus
              }
            },
            geometry: {
              type: 'Point',
              coordinates: area.point
            }
          }
        })
      //分接口和socket数据处理
      if (isSocket) {
        geoLevelF3 && geoLevelF3.destroy()
        geoLevelF4 && geoLevelF4.destroy()
        geoLevelF4 = new Loca.GeoJSONSource({
          data: {
            type: 'FeatureCollection',
            features: featureList4
          }
        })
        geoLevelF3 = new Loca.GeoJSONSource({
          data: {
            type: 'FeatureCollection',
            features: featureList3
          }
        })
        //堆积 饱和数据填入
        breathRed4 && breathRed4.setSource(geoLevelF4)
        breathRed3 && breathRed3.setSource(geoLevelF3)
        //zoneMarker
        IconRender(list)
        polygonList.forEach(i => i.show())
      } else {
        //渲染区域 以及area.type === 2 停车点 的maker点
        const arr = zoneData.map(area => {
          createZone(area)
        })
        //<---------- IconLayer start--------->
        //创建区域点IconLayer 只在接口时候创建一次IconLayer对象
        zoneIconLayer = new Loca.IconLayer({
          zIndex: 1000,
          opacity: 1,
          visible: false
        })

        IconRender(list)
        // P点，图标
        zoneIconLayer.setStyle({
          unit: 'px',
          icon: (index, feature) => {
            let data = feature.properties.rawData
            let url = imgList[data.pileupStatus - 1]
            return url
          },
          iconSize: [20, 24],
          offset: [0, 12],
          rotation: 0
        })
        console.log(zoneIconLayer)
        zoneIconLayer &&
          zoneIconLayer.addAnimate({
            key: 'offset',
            value: [0, 1],
            easing: 'Linear',
            transform: 500,
            random: true,
            delay: 3000
          })
        zoneIconLayer &&
          zoneIconLayer.addAnimate({
            key: 'iconSize',
            value: [0, 1],
            easing: 'Linear',
            transform: 500,
            random: true,
            delay: 3000
          })
        loca.add(zoneIconLayer)
        zoneIconLayer.show()
        //<---------- IconLayer end--------->

        //<---------- ScatterLayer start--------->
        //只在接口时候new Loca 因为Loca暂浏览器GPU显存
        breathRed3 = new Loca.ScatterLayer({
          loca,
          zIndex: 113,
          opacity: 1,
          visible: true,
          zooms: [2, 22]
        })
        breathRed4 = new Loca.ScatterLayer({
          loca,
          zIndex: 113,
          opacity: 1,
          visible: true,
          zooms: [2, 22]
        })
        geoLevelF3 && geoLevelF3.destroy()
        geoLevelF4 && geoLevelF4.destroy()
        //3饱和
        geoLevelF3 = new Loca.GeoJSONSource({
          data: {
            type: 'FeatureCollection',
            features: featureList3
          }
        })
        // //4堆积 红色呼吸点
        geoLevelF4 = new Loca.GeoJSONSource({
          data: {
            type: 'FeatureCollection',
            features: featureList4
          }
        })
        breathRed4.setSource(geoLevelF4)
        breathRed3.setSource(geoLevelF3)
        breathRed3.setStyle({
          unit: 'meter',
          size: [200, 200],
          borderWidth: 0,
          texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_yellow.png',
          duration: 1000,
          animate: true
        })

        breathRed4.setStyle({
          unit: 'meter',
          size: [300, 300],
          borderWidth: 0,
          texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png',
          duration: 1000,
          animate: true
        })
        //<---------- ScatterLayer end--------->

        // 启动渲染动画
        loca.animate.start()

        // 只设置一次zoom
        if (areaOperation.current.length > 0) {
          map.setFitView(areaOperation.current, true)
          map.setZoom(map.getZoom() + 1)
        }
      }
    }
  }
  const drawHeat = () => {
    //聚合除去
    clearWindow()
    if (map && heatMapInit.current) {
      heatMapInit.current.hide()
      heatMapInit.current = null
    }
    polygonList.forEach(i => i.hide())
    let geo = new Loca.GeoJSONSource({
      data: {
        type: 'FeatureCollection',
        features: []
      }
    })
    zoneIconLayer && zoneIconLayer.setSource(geo)
    lineLayer && lineLayer.setSource(geo)
    breathRed4 && breathRed4.setSource(geo)
    breathRed3 && breathRed3.setSource(geo)
    layerMarkers.current && layerMarkers.current.forEach(i => i.obj.hide())
    let heatmapOpts = {
      //3d 相关的参数
      '3d': {
        //热度转高度的曲线控制参数，可以利用左侧的控制面板获取
        heightBezier: [0.545, 0.035, 0.348, 0.7],
        //取样精度，值越小，曲面效果越精细，但同时性能消耗越大
        gridSize: 2,
        heightScale: 1
      }
    }
    const heatmapData = bikeHeatData.map((item, index) => {
      return {
        lng: item[0],
        lat: item[1],
        count: 4
      }
    })
    //初始化heatmap对象
    let heatmap = new AMap.HeatMap(map, heatmapOpts)
    heatmap.setDataSet({
      data: heatmapData,
      max: 100
    })
    heatMapInit.current = heatmap
  }
  const goBikeDetail = num => {
    let win = window.open('about:blank')
    if (win) {
      win.location.href = `#/city/bikeManage?num=${num}`
    }
  }
  //必须挂到window上 不然找不到这个方法
  window.goBikeDetail = goBikeDetail
  const createMarker = (curPosition, icon) => {
    if (curPosition.point && curPosition.point.length > 0) {
      let curData = {
        position: curPosition.point,
        icon,
        extData: {
          id: curPosition.id
        }
      }
      let labelMarker = new AMap.LabelMarker(curData)
      // 给marker绑定事件
      labelMarker.on('click', e => {
        map.remove(normalZone)
        moveMarkTimer.current = setTimeout(async () => {
          console.log('点击marker', '12121')
          let obj = e.target._opts && e.target._opts.extData
          let position = e.data.data && e.data.data.position
          if (obj.id) {
            try {
              // const { data } = await getMarkerDetail({ bikeId: obj.id })
              normalMarker.setContent(
                `<div class="amap-info-window-area" style="width: 180px; top: -8px">
                        <div>
                            <div class="">
                                <div class="wind-title">
                                    <span class="a_name" onclick="goBikeDetail('${1}')">${2}</span>
                                    <span class="iconfont icon-cha color-cha"  onclick="clearWindow()"></span>
                                </div>
                                <p style="margin-top: 6px">${1213}</p>
                                <p>${xxxx}</p>
                            </div>
                        </div>
                        <div class="area-footer">
                            <div class="shixin" style="left: 42%"></div>
                            <div class="kongxin" style="top: 97%;left: 42%"></div>
                        </div>
                    </div>`
              )
              normalMarker.setPosition(position)
              map.add(normalMarker)
            } catch (error) { }
          }
        }, 300)
      })
      return labelMarker
    }
  }
  const drawBike = () => {
    const { latlngData, isSocket } = bikeLatLngData
    if (map && !mapType && heatMapInit.current) {
      heatMapInit.current.hide()
      heatMapInit.current = null
    }
    if (!mapType) {
      layerMarkers.current && layerMarkers.current.forEach(i => i.obj.show())
    }
    if (isSocket) {
      //新增点和之前对比的话，可以在delete的总集合里面去对比；add的时候有可能之前是已经创建了
      if (latlngData.added && latlngData.added.length > 0) {
        let arrNew = []
        //获取新数据id集合
        const newData = latlngData.added.map(item => item.id)
        //获取老数据中与新数据相同的id对象
        const oldData = layerMarkers.current.filter(item => newData.includes(item.id))
        oldData.length > 0 && oldData.forEach(i => i.obj.show())
        //获取老数据id集合
        const oldNoData = layerMarkers.current.map(item => item.id)
        //获取老数据中与新数据不相同的id对象
        const newNoData = latlngData.added.filter(item => !oldNoData.includes(item.id))
        newNoData.length > 0 &&
          newNoData.forEach(item => {
            // 先新增的点放到 老的第一次data里面, 然后渲染
            if (item.id) {
              const markerObj = { id: item.id, obj: createMarker(item, makerIconRed) }
              layerMarkers.current.push(markerObj)
              arrNew.push(markerObj)
            }
          })
        arrNew.length > 0 && layer.add(arrNew.map(item => item.obj))
      }
      //更新
      if (latlngData.updated && latlngData.updated.length > 0) {
        for (let i = 0; i < latlngData.updated.length; i++) {
          const newData = latlngData.updated[i]
          for (let j = 0; j < layerMarkers.current.length; j++) {
            const oldData = layerMarkers.current[j]
            if (newData.point && newData.point.length > 0 && newData.id === oldData.id) {
              oldData.obj.setPosition(newData.point)
              oldData.obj.setExtData({ id: newData.id })
            }
          }
        }
      }
      //删除
      if (latlngData.deleted && latlngData.deleted.length > 0) {
        //获取新数据id集合
        const newData = latlngData.deleted
        //获取老数据中与新数据相同的id对象
        const oldData = layerMarkers.current.filter(item => newData.includes(item.id))
        oldData.length > 0 && oldData.forEach(i => i.obj.hide())
      }
    } else {
      if (layerMarkers.current.length === 0 && latlngData && latlngData.length > 0) {
        let markers = []
        for (let i = 0; i < latlngData.length; i++) {
          let curPosition = latlngData[i]
          const marker = createMarker(curPosition, makerIconRed)
          if (marker) {
            markers.push({ id: curPosition.id, obj: marker })
          }
        }
        //老的数据备份一份，做为比较对象
        layerMarkers.current = markers
        // 一次性将海量点添加到图层
        layer.add(markers.map(item => item.obj))
        // layer.add([].map(item => item.obj))
      }
    }
  }
  //轨迹
  const drawTrajectory = type => {
    const { trajectoryData, isSocket } = trajectory
    if (!isSocket) {
      let headColors = ['#EFBB51', '#7F3CFF', '#4CC19B', '#0B5D74', '#E06AC4', '#223F9B', '#F15C1A', '#7A0FA6']
      lineLayer = new Loca.PulseLineLayer({
        // loca,
        zIndex: 10,
        opacity: 1,
        visible: true,
        zooms: [2, 22]
      })
      lineLayer.setStyle({
        altitude: 0,
        lineWidth: 2,
        // 脉冲头颜色
        headColor: (_, feature) => {
          return headColors[feature.properties.type - 1]
        },
        // 脉冲尾颜色
        trailColor: 'rgba(128, 128, 128, 0.5)',
        // 脉冲长度，0.25 表示一段脉冲占整条路的 1/4
        interval: 0.25,
        // 脉冲线的速度，几秒钟跑完整段路
        duration: 10000
      })
    }
    if (!trajectory || !trajectoryData || trajectoryData.length === 0 || type) return false
    const dataList = trajectoryData.map(item => {
      return {
        type: 'Feature',
        properties: {
          type: Math.ceil(Math.random() * 8)
        },
        geometry: {
          type: 'LineString',
          coordinates: item
        }
      }
    })
    geoLine && geoLine.destroy()
    geoLine = new Loca.GeoJSONSource({
      data: {
        type: 'FeatureCollection',
        features: dataList
      }
    })

    if (lineLayer) {
      lineLayer.setSource(geoLine)
      loca.add(lineLayer)
    }

    loca.animate.start()
  }
  useEffect(() => {
    drawBounds()
  }, [AppContext])
  useEffect(() => {
    if (!mapType) {
      drawTrajectory(mapType)
    }
  }, [trajectory, mapType])
  useEffect(() => {
    if (mapType) {
      drawHeat()
    } else {
      drawBike()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bikeLatLngData.latlngData, mapType])

  useEffect(() => {
    if (mapType) {
      drawHeat()
    } else {
      drawParkingZone(parkingZone)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parkingZone, mapType])
  useEffect(() => {
    return () => {
      console.log('[视图层销毁]')
      zoneIconLayer = null
      geoIcon = null

      lineLayer = null
      geoLine = null

      polygonList = []

      breathRed3 = null
      geoLevelF3 = null

      breathRed4 = null
      geoLevelF4 = null
    }
  }, [])
  return <></>
}

export default Smap
