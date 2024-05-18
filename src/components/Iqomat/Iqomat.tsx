import { useDataPrayersContext } from "../../contexts/prayersContext";
import { useEffect, useState } from "react";
import moment from "moment";
import beep from "../../../src/beeps/beep01.mp3"

export const Iqomat = (props: any) => {
  
  const t2 = props.t2;
  const layar = props.layar;
  const dataPrayers = useDataPrayersContext();
  const currentTimes = dataPrayers?.prayersData?.currentTimes;
  const curT = dataPrayers?.prayersData?.currentT;
    
  const [menit,setMenit] = useState('')
  const [detik,setDetik] = useState('')
  const [durasi,setDurasi] = useState(0)
  
  useEffect(() => {
    const intervalId = setInterval(async () => {
      
      const date = new Date();
      const durasiCurrent = moment(date).diff(currentTimes) / 1000;
      const durT2 = t2 - durasiCurrent;
      
      if (durT2 >= 0) {
        const m = Math.floor(durT2 / 60) + "";
        const d = Math.floor(durT2 % 60) + "";
        
        setMenit(m.toString().padStart(2, "0"));
        setDetik(d.toString().padStart(2, "0"));
        setDurasi(durT2);      
      }
      
    }, 1000);
    return () => clearInterval(intervalId);
  }, [menit,detik,t2,durasi]);
 
  if (dataPrayers?.error) return <div className="failed">failed to load</div>;
  if (!dataPrayers?.prayersData)return <div className="Loading">Loading...</div>;

  return (
    <section>
      {
        (layar === "iqomat" && durasi <= 12? <audio src={beep} autoPlay ={true} loop={true}></audio>: null)
      }
      <div className="absolute w-[1360px] h-[720px] left-[0px] top-[0px]">
        <div className="grid grid-cols-12 ">
          <div className="col-span-2 text-right pt-8 font-qwitcher text-[80px] font-bold text-red-700">
            Menanti
          </div>
          <div className="col-span-4 font-bruno pt-8 text-white text-8xl ">
            IQOMAT
          </div>
          <div className="col-span-6 font-monoton text-[100px] font-bold text-yellow-300 text-center">
            {curT}
          </div>
        </div>
        <div className="grid grid-cols-12 font-bruno text-[330px] text-white text-center">
          <div className="col-span-5 text-right ">{menit}</div>
          <span className="col-span-2 -ml-5 text-center ">:</span>
          <div className="col-span-5 -ml-10 text-left ">{detik}</div>
        </div>
      </div>
    </section>
  );
};
