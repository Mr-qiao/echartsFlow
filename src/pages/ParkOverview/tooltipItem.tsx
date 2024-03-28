/**
 * 园区概况
 */
import start from '@/assets/img/start.png'
import { VideoPlay } from '@/components/videoPlay';
import { deviceStreamApi } from '@/services/system';
import { useEditableArray } from '@ant-design/pro-components';
import { useEffect, useState } from 'react'

type Props = {
  id: string
}

const TooltipItem = (props: Props) => {
  const { id } = props;
  const [isPlay, setIsPlay] = useState(false)
  const [playVideoList, setPlayVideoList] = useState<{
    id: string,
    streamUrl: string
  }>
    ({
      id: '',
      streamUrl: ''
    });

  const getVideoUrl = (id: string) => {
    return deviceStreamApi(id, {
      type: 'play'
    }).then(res => {
      setPlayVideoList({
        id: res.data.id,
        streamUrl: res.data.streamUrl
      })
    })
  }

  const getPlay = () => {
    setIsPlay(true)
    getVideoUrl(id)
  }

  return <div style={{
    width: '300px',
    height: '200px',
  }
  }>
    {
      isPlay ?
        <VideoPlay playerUrl={playVideoList.streamUrl || ''} id={playVideoList.id}
        />
        : <img onClick={getPlay} src={start} width={50} height={50} style={{
          position: 'absolute',
          zIndex: 999,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }} />
    }
  </div >
};


export default (TooltipItem);
