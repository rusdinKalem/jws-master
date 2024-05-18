
import { useDataContext } from "../../contexts/dataContexts";

const LiveVideo = (props:any) => {
  const layar = props.layar
  const dataContext = useDataContext();
  
  const liveVideo = dataContext?.data?.media.liveVid;
  const isLive = dataContext?.data?.media.isLive;
  
  let autoplay ;

  (isLive == 1 && layar === 'utama' ? autoplay = 1 : autoplay = 0)
  
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;
    
  return (
          <div className="video-responsive">
            <iframe
              width="1360"
              height="768"
              src={`https://www.youtube.com/embed/${liveVideo}?autoplay=${autoplay}&controls=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
          )
};

export default LiveVideo;
