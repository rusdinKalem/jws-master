import {
  getAdzanFileFromUploads
} from "../../lib/upload";
import { useEffect, useState } from "react";
import { useDataContext } from "../../contexts/dataContexts";
import { useDataPrayersContext } from "../../contexts/prayersContext";
import moment from "moment";

export default function AudioAdzan(props:any) {

  const layar = props.layar

  const dataContext = useDataContext();
  const dataPrayers = useDataPrayersContext();

  const audio = dataContext?.data?.audio;
  const isAdzan = dataContext?.data?.audio.isAdzan;
  const nextTimes = dataPrayers?.prayersData?.nextTimes;
  const curT = dataPrayers?.prayersData?.currentT;

  const [adzanIsyaUrl, setAdzanIsyaUrl] = useState<string>();
  const [adzanSubuhUrl, setAdzanSubuhUrl] = useState<string>();
  const [adzanDzuhurUrl, setAdzanDzuhurUrl] = useState<string>();
  const [adzanAsharUrl, setAdzanAsharUrl] = useState<string>();
  const [adzanMaghribUrl, setAdzanMaghribUrl] = useState<string>();
  
  const [durNext, setDurNext] = useState<number>(0);
  const [adzan, setAdzan] = useState<string>();
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
      getAdzanFileFromUploads(audio.adzanIsya).then((url) => {
        setAdzanIsyaUrl(url);
      });
      getAdzanFileFromUploads(audio.adzanSubuh).then((url) => {
        setAdzanSubuhUrl(url);
      });
      getAdzanFileFromUploads(audio.adzanDzuhur).then((url) => {
        setAdzanDzuhurUrl(url);
      });
      getAdzanFileFromUploads(audio.adzanAshar).then((url) => {
        setAdzanAsharUrl(url);
      });
      getAdzanFileFromUploads(audio.adzanMaghrib).then((url) => {
        setAdzanMaghribUrl(url);
      });
    }
  }, [audio]);

  useEffect(() => {
    if (curT === "ISYA'" && adzanMaghribUrl != null) {
      setAdzan(adzanMaghribUrl);
    } else if (curT === "SUBUH" && adzanSubuhUrl != null) {
      setAdzan(adzanSubuhUrl);
    } else if (curT === "DZUHUR" && adzanDzuhurUrl != null) {
      setAdzan(adzanDzuhurUrl);
    } else if (curT === "ASHAR" && adzanAsharUrl != null) {
      setAdzan(adzanAsharUrl);
    } else if (curT === "MAGHRIB" && adzanMaghribUrl != null) {
      setAdzan(adzanMaghribUrl);
    }
  }, [
    adzanIsyaUrl,
    adzanSubuhUrl,
    adzanDzuhurUrl,
    adzanAsharUrl,
    adzanMaghribUrl,
    curT,adzan
  ]);
  

  useEffect(() => {
    if(layar==='adzan'){

    const audio1 = new Audio(adzan);
    const playAudioSequence = () => {
      if (isAdzan){audio1.play(); 
      }// Putar audio pertama
    };
    playAudioSequence();
    return () => {
      audio1.pause();
    }
    }
  },[layar])
  
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;
  if (dataPrayers?.error) return <div className="failed">failed to load</div>;
  if (!dataPrayers?.prayersData) return <div className="Loading">Loading...</div>;
  
  return (
    <>
    </>
  );
}
