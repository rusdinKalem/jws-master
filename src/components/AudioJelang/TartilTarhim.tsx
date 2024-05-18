import {
  getTarhimFileFromUploads,
  getTartilFileFromUploads,
} from "../../lib/upload";
import { useEffect, useState } from "react";
import { useDataContext } from "../../contexts/dataContexts";
import { useDataPrayersContext } from "../../contexts/prayersContext";
import moment from "moment";

export default function TartilTarhim(props:any) {

  const layar = props.layar

  const dataContext = useDataContext();
  const dataPrayers = useDataPrayersContext();

  const audio = dataContext?.data?.audio;
  const isTartil = dataContext?.data?.audio.isTartil;
  const isTarhim = dataContext?.data?.audio.isTarhim;
  const nextTimes = dataPrayers?.prayersData?.nextTimes;
  const nextT = dataPrayers?.prayersData?.nextT;


  const [tartilIsyaUrl, setTartilIsyaUrl] = useState<string>();
  const [tartilSubuhUrl, setTartilSubuhUrl] = useState<string>();
  const [tartilDzuhurUrl, setTartilDzuhurUrl] = useState<string>();
  const [tartilAsharUrl, setTartilAsharUrl] = useState<string>();
  const [tartilMaghribUrl, setTartilMaghribUrl] = useState<string>();
  
  const [tarhimIsyaUrl, setTarhimIsyaUrl] = useState<string>();
  const [tarhimSubuhUrl, setTarhimSubuhUrl] = useState<string>();
  const [tarhimDzuhurUrl, setTarhimDzuhurUrl] = useState<string>();
  const [tarhimAsharUrl, setTarhimAsharUrl] = useState<string>();
  const [tarhimMaghribUrl, setTarhimMaghribUrl] = useState<string>();
  
  const [durNext, setDurNext] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [tartil, setTartil] = useState<string>();
  const [tarhim, setTarhim] = useState<string>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      let date = new Date();
      const durasiNext = (moment(nextTimes).diff(date)) / 1000;
      setDurNext(durasiNext);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [durNext]);

  useEffect(() => {
    if (audio) {
      getTartilFileFromUploads(audio.tartilIsya).then((url) => {
        setTartilIsyaUrl(url);
      });
      getTartilFileFromUploads(audio.tartilSubuh).then((url) => {
        setTartilSubuhUrl(url);
      });
      getTartilFileFromUploads(audio.tartilDzuhur).then((url) => {
        setTartilDzuhurUrl(url);
      });
      getTartilFileFromUploads(audio.tartilAshar).then((url) => {
        setTartilAsharUrl(url);
      });
      getTartilFileFromUploads(audio.tartilMaghrib).then((url) => {
        setTartilMaghribUrl(url);
      });
      getTarhimFileFromUploads(audio.tarhimIsya).then((url) => {
        setTarhimIsyaUrl(url);
      });
      getTarhimFileFromUploads(audio.tarhimSubuh).then((url) => {
        setTarhimSubuhUrl(url);
      });
      getTarhimFileFromUploads(audio.tarhimDzuhur).then((url) => {
        setTarhimDzuhurUrl(url);
      });
      getTarhimFileFromUploads(audio.tarhimAshar).then((url) => {
        setTarhimAsharUrl(url);
      });
      getTarhimFileFromUploads(audio.tarhimMaghrib).then((url) => {
        setTarhimMaghribUrl(url);
      });
    }
  }, [audio]);

  useEffect(() => {
    if (nextT === "ISYA'" && tartilIsyaUrl != null && tarhimIsyaUrl != null) {
      let audio = new Audio(tarhimIsyaUrl);
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      setTartil(tartilIsyaUrl);
      setTarhim(tarhimIsyaUrl);
      return () => {
        audio.removeEventListener('loadedmetadata', () => {
          setDuration(0);
        });
      };


    } else if (nextT === "SUBUH") {
      let audio = new Audio(tarhimSubuhUrl);
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      setTartil(tartilSubuhUrl);
      setTarhim(tarhimSubuhUrl);
      return () => {
        audio.removeEventListener('loadedmetadata', () => {
          setDuration(0);
        });
      };

    } else if (nextT === "DZUHUR") {
      let audio = new Audio(tarhimDzuhurUrl);
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      setTartil(tartilDzuhurUrl);
      setTarhim(tarhimDzuhurUrl);
      return () => {
        audio.removeEventListener('loadedmetadata', () => {
          setDuration(0);
        });
      };

    } else if (nextT === "ASHAR") {
      let audio = new Audio(tarhimAsharUrl);
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      setTartil(tartilAsharUrl);
      setTarhim(tarhimAsharUrl);
      return () => {
        audio.removeEventListener('loadedmetadata', () => {
          setDuration(0);
        });
      };

    } else if (nextT === "MAGHRIB") {
      let audio = new Audio(tarhimMaghribUrl);
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      setTartil(tartilMaghribUrl);
      setTarhim(tarhimMaghribUrl);
      return () => {
        audio.removeEventListener('loadedmetadata', () => {
          setDuration(0);
        });
      };

    }
  }, [
    tartilIsyaUrl,
    tartilSubuhUrl,
    tartilDzuhurUrl,
    tartilAsharUrl,
    tartilMaghribUrl,
    tarhimIsyaUrl,
    tarhimSubuhUrl,
    tarhimDzuhurUrl,
    tarhimAsharUrl,
    tarhimMaghribUrl,
  ]);
  

  useEffect(() => {
    if(layar==='jelang'){

    const audio1 = new Audio(tartil);
    const audio2 = new Audio(tarhim);
    const durTartil = (durNext-duration)*1000;
    const durTarhim = duration*1000;
    const playAudioSequence = () => {
      if (isTartil){audio1.play(); 
      }// Putar audio pertama
      setTimeout(() => {
        audio1.pause(); // Berhenti setelah waktu jelang - durasi Tahrim
        if (isTarhim){audio2.play(); }// Putar audio kedua setelah waktu jelang - durasi tahrim
        setTimeout(() => {
          audio2.pause(); // Berhenti setelah durasi Tahrim
        }, durTarhim); // durasi Tahrim dalam milidetik
      }, durTartil); // waktu jelang - durasi Tahrim dalam milidetik
    };
    // Mulai urutan pemutaran audio
    playAudioSequence();
    return () => {
      audio1.pause();
      audio2.pause();
    }
    }
  },[layar,tartil,tarhim,duration])
  
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;
  if (dataPrayers?.error) return <div className="failed">failed to load</div>;
  if (!dataPrayers?.prayersData) return <div className="Loading">Loading...</div>;
  
  return (
    <>
    </>
  );
}
