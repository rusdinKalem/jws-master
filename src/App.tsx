import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Setting from "./page/FormSetting";
import { useDataContext } from "./contexts/dataContexts";
import { useState, useEffect } from "react";
import { getImageFileFromUploads, getVideoFileFromUploads } from "./lib/upload";
import Layar from "./page/Layar";

function App() {
  const dataContext = useDataContext();
  const useVid = dataContext?.data?.media?.useVid ?? 0;
  const jws = dataContext?.data?.jws;

  const [background, setBackground] = useState("/images/img00.jpg");

  useEffect(() => {
    const imgBackgroundUrl = dataContext?.data?.media?.backG;
    const vidBackgroundUrl = dataContext?.data?.media?.backGV;
    
    if (useVid) {
      getVideoFileFromUploads(vidBackgroundUrl).then((url) => {
        setBackground(url ?? "/images/vid00.mp4");
      }).catch(() => {
        setBackground("/images/vid00.mp4");
      });
    } else {
      if (imgBackgroundUrl) {
        getImageFileFromUploads(imgBackgroundUrl).then((url) => {
          setBackground(url ?? "/images/img00.jpg");
        }).catch(() => {
          setBackground("/images/img00.jpg");
        });
      }
    }
    
  }, [dataContext.data]);
  
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layar
          background={background}
          jws ={jws}
          useVid={useVid}
          />}/>
        <Route path="/formSetting" element={<Setting 
          background={background} 
          />} />
      </Routes>
    </Router>
  );
}

export default App;
