import moment from "moment";
import Slider from "react-slick";
import { useDataContext } from "../../contexts/dataContexts";
import { useDataPrayersContext } from "../../contexts/prayersContext";
import { useDataColorsContext } from "../../contexts/colorsContext";
import { clsx } from 'clsx';
import { useEffect, useState } from "react";

export default function Moment() {
  
  const dataContext = useDataContext();
  const dataPrayers = useDataPrayersContext();
  const dataColorsContext = useDataColorsContext();

  const theme = dataContext?.data?.display.theme;
  const spInfo = parseInt(dataContext?.data?.display.spInfo) * 1000;
  
  const nextTimes = dataPrayers?.prayersData?.nextTimes;
  const curT = dataPrayers?.prayersData?.currentT;
  const nxtT = dataPrayers?.prayersData?.nextT;
  
  const bgMoment = dataColorsContext?.colorsData?.bgMoment
  const wMoment1 = dataColorsContext?.colorsData?.tMoment1
  const wMoment2 = dataColorsContext?.colorsData?.tMoment2
  
  const hari = new Date().getDay();
  const [jam,setJam] = useState('')
  const [menit,setMenit] = useState('')
  const [detik,setDetik] = useState('')

  useEffect(() => {
    const intervalId = setInterval(async () => {
      
      const now = new Date();
      const durasiNext = moment(nextTimes).diff(now) / 1000;
      
      const dur = durasiNext % 3600;
      
      const j = Math.floor(durasiNext / 3600) + "";
      const m = Math.floor(dur / 60) + "";
      const d = Math.floor(dur % 60) + "";
      
      setJam(j.toString().padStart(2, "0"));
      setMenit(m.toString().padStart(2, "0"));
      setDetik(d.toString().padStart(2, "0"));
  
    }, 1000);
    return () => clearInterval(intervalId);
  }, [jam,menit,detik]);
 
  
  
  function Arrow(props: any) {
    const { style } = props;
    return <div className="Info" style={{ ...style, color: "transparent" }} />;
  }
  
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: spInfo,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };
  
  const wMomentA = clsx(
    wMoment1,
    {
      "text-left text-5xl font-qwitcher font-bold my-2": true,
    }
  );
  
  const wMomentB = clsx(
    bgMoment,
    wMoment2,
    {
      "text-center text-[40px] font-bold font-bruno rounded-full py-1 px-5": theme==='Satu' || theme === 'Dua',
      "text-center text-4xl font-bold font-bruno rounded-full py-1 px-5": theme==='Tiga' || theme === 'Empat'
    }
  ); 
  
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;
  if (dataPrayers?.error) return <div className="failed">failed to load</div>;
  if (!dataPrayers?.prayersData)return <div className="Loading">Loading...</div>;
  if (dataColorsContext?.error) return <div className="failed">failed to load</div>;
  if (!dataColorsContext?.colorsData) return <div className="Loading">Loading...</div>;
    
  return (
    <div className="w-[600px]">
      <Slider {...settings}>
        <div className={wMomentA}>
          Saat ini waktu
          <span className={wMomentB}>
            {hari == 5 && curT === "DZUHUR" ? "JUM'AT" : (curT==="TERBIT" ? "PAGI" : curT)}
          </span>
        </div>

        <div className={wMomentA}>
          Menuju waktu
          <span className={wMomentB}>
            {hari == 5 && nxtT === "DZUHUR" ? "JUM'AT" : nxtT}
          </span>
        </div>
        <div>
          <div
            className={wMomentA}
            hidden={curT === "ISYA'" || curT === "QIYAM"}
          >
            Dalam waktu
            <span
              className={wMomentB}
              hidden={curT === "ISYA'" || curT === "QIYAM"}
            >
              {jam}:{menit}:{detik}
            </span>
          </div>

          <div className={wMomentA} hidden={curT !== "ISYA'"}>
            Saatnya
            <span className={wMomentB} hidden={curT !== "ISYA'"}>
              ISTIRAHAT
            </span>
          </div>

          <div className={wMomentA} hidden={curT !== "QIYAM"}>
            Bangun untuk
            <span className={clsx("text-center text-3xl font-bold font-bruno rounded-full py-1 px-3",bgMoment,wMoment2)} hidden={curT !== "QIYAM"} >
              QIYAMULLAIL
            </span>
          </div>
        </div>
      </Slider>
    </div>
  );
}
