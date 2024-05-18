import { useEffect, useState } from "react";
import { useDataPrayersContext } from "../../contexts/prayersContext";
import moment from "moment";

export default function JelangCountDown() {
  
  const dataPrayers = useDataPrayersContext();
  const nextTimes = dataPrayers?.prayersData?.nextTimes;
  
  const [menit,setMenit] = useState('')
  const [detik,setDetik] = useState('')

  useEffect(() => {
    const intervalId = setInterval(async () => {
      
      const now = new Date();
      const durasiNext = moment(nextTimes).diff(now) / 1000;
      const dur = (durasiNext+1) % 3600;
      const m = Math.floor(dur / 60) + "";
      const d = Math.floor(dur % 60) + "";
      
      setMenit(m.toString().padStart(2, "0"));
      setDetik(d.toString().padStart(2, "0"));
  
    }, 1000);
    return () => clearInterval(intervalId);
  }, [menit,detik]);
  
  return (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-5">{menit}</div>
          <div className="col-span-2">:</div>
          <div className="col-span-5">{detik}</div>
        </div>
  );
}
