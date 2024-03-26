import { Button } from "antd";
import { useEffect } from "react";

type Props = {
  id: string
  playerUrl: string;
}

export const VideoPlay = (props: Props) => {
  const { playerUrl, id } = props;

  async function openWebrtcPlayer(playerUrl) {
    let pc = new RTCPeerConnection();
    let local_stream = new MediaStream();
    pc.ontrack = (e) => {
      local_stream.addTrack(e.track);
    };
    pc.onicegatheringstatechange = (ev) => {
      let connection = ev.target;
      switch (connection.iceGatheringState) {
        case 'gathering':
          let offer = pc.localDescription;
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
              const remoteSDP = res.data.sdp;
              await pc.setRemoteDescription(
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
    pc.addTransceiver('video', { direction: 'recvonly' });
    pc.addTransceiver('audio', { direction: 'recvonly' });
    let offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
  }

  useEffect(() => {
    openWebrtcPlayer(playerUrl);
  }, [playerUrl])

  return <div>
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
  </div>
}