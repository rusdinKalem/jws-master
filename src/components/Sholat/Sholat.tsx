import { useDataPrayersContext } from "../../contexts/prayersContext";
import { useEffect, useState } from "react";
import moment from "moment";

export const Sholat = (props:any) => {
  const t3s = props.t3s
  const t7s = props.t7s
  const dataPrayers = useDataPrayersContext();
  const hari = new Date().getDay();
  const curT = dataPrayers?.prayersData?.currentT
  const currentTimes = dataPrayers?.prayersData?.currentTimes;
  
  const [menit,setMenit] = useState('')
  const [detik,setDetik] = useState('')

  useEffect(() => {
    const intervalId = setInterval(async () => {
      
      let dur ;
      const date = new Date();
      const durasiCurrent = moment(date).diff(currentTimes) / 1000;

      {hari == 5 && curT === "DZUHUR" ? dur = t7s - durasiCurrent : dur = t3s - durasiCurrent} 
      if (dur >= 0) {
        const m = Math.floor(dur / 60) + "";
        const d = Math.floor(dur % 60) + "";
        setMenit(m.toString().padStart(2, "0"));
        setDetik(d.toString().padStart(2, "0"));  
      }   
    }, 1000);
    return () => clearInterval(intervalId);
  }, [menit,detik,t3s,t7s]);
  
  if (dataPrayers?.error) return <div className="failed">failed to load</div>;
  if (!dataPrayers?.prayersData)return <div className="Loading">Loading...</div>;
  
  return (
    <section>
      <div className="absolute w-[1360px] h-[648px] left-[0px] top-[120px] pt-10 flex flex-col text-center">
        <div className="grid grid-cols-12 font-bruno text-[180px] text-blue-300">
          <div className="col-span-5 text-right ">{menit}</div>
          <span className="col-span-2 text-center ">:</span>
          <div className="col-span-5 text-left ">{detik}</div>
        </div>
      </div>
    </section>
  );
};
