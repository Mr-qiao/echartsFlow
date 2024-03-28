import { Button } from "antd";
import { useEffect, useRef, useState } from "react";

import start from '@/assets/img/start.png'
import stop from '@/assets/img/stop.png'
import screenshot from '@/assets/img/screenshot.png'

type Props = {
  id: string
  playerUrl: string;
  rightList: any[]
  setRightList?: (obj: {
    name: string
    url: string
  }) => void
}


export const VideoPlay = (props: Props) => {
  const { playerUrl, id, rightList, setRightList } = props;
  const [status, setStatus] = useState(false)
  let pc = useRef(null)
  let recorder = useRef(null)

  async function openWebrtcPlayer(playerUrl) {
    pc.current = new RTCPeerConnection();
    let local_stream = new MediaStream();
    pc.current.ontrack = (e) => {
      local_stream.addTrack(e.track);
    };
    pc.current.onicegatheringstatechange = (ev) => {
      let connection = ev.target;
      switch (connection.iceGatheringState) {
        case 'gathering':
          let offer = pc.current.localDescription;
          fetch(playerUrl, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sdp: offer.sdp }),
          })
            .then((response) => {
              if (response.status !== 200) {
                throw 'error';
              }
              return response.json();
            })
            .then(async (res) => {
              const remoteSDP = res?.data?.sdp;
              if (!remoteSDP) return
              await pc.current.setRemoteDescription(
                new RTCSessionDescription({
                  type: 'answer',
                  sdp: remoteSDP,
                }),
              );
            });
          break;
        case 'complete':
          console.log('收集完成');
          break;
      }
    };

    let video = document.getElementById(`video_render_${id}`) as any;
    (video as HTMLElement).srcObject = local_stream;
    pc.current.addTransceiver('video', { direction: 'recvonly' });
    pc.current.addTransceiver('audio', { direction: 'recvonly' });
    let offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);
  }

  const handleStart = () => {
    if (status) {
      recorder.current.stop()
      setStatus(false)
      return
    }
    recorder.current = new MediaRecorder(pc.current.getRemoteStreams()[0]);
    let data = [];
    recorder.current.ondataavailable = (e) => {
      data.push(e.data as never)
    }
    recorder.current.onstop = () => {
      let blob = new Blob(data, { type: 'video/mp4' });
      let link = document.createElement('a');
      link.href = URL.createObjectURL(blob); //创建下载的链接
      link.download = id + new Date().getTime() + '.mp4'; //下载后文件名
      document.body.appendChild(link);
      link.click()
      URL.revokeObjectURL(link.href); // 释放通过URL.createObjectURL()创建的URL
      link.remove()
    }
    recorder.current.start();
    setStatus(true)
  }

  const handleRecord = (id: string) => () => {
    let video = document.getElementById(`video_render_${id}`) as any;
    const canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let url = '';
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    url = canvas.toDataURL('image/jpg');
    const a = document.createElement('a');
    const event = new MouseEvent('click');
    const date = new Date().getTime();
    a.download = `${id}_${date}_${rightList.length + 1}`;
    a.href = url;
    a.dispatchEvent(event);
    setRightList?.({
      name: `${id}_${date}_${rightList.length + 1}`,
      url
    })
  }

  useEffect(() => {
    openWebrtcPlayer(playerUrl);
    return () => {
      pc.current && pc.current.close()
    }
  }, [playerUrl])

  return <div
    style={{
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%'
    }}
  >
    <video autoPlay muted id={`video_render_${id}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',

      }}
    >
    </video>
    {
      playerUrl &&
      <div style={{
        position: 'absolute',
        right: 0,
        bottom: 0,
        display: 'flex',
        paddingRight: '10px'
      }}
      >
        <img
          style={{
            width: '20px',
            height: '20px',
            marginRight: '10px'
          }}
          onClick={handleStart}
          src={status ? stop : start} alt="" />
        <div
          onClick={handleRecord(id)}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // background: '#fff'
          }}>
          <img src={screenshot}
            style={{
              width: '24px',
              height: '24px',
            }}
            alt='' />
        </div>
      </div>

    }
  </div>
}