import { useDataPrayersContext } from "../../contexts/prayersContext";

export default function JelangNext() {
  
  const dataPrayers = useDataPrayersContext();
  const nextT = dataPrayers?.prayersData?.nextT;
  const hari = new Date().getDay();
  
  return (
        <div>
          {hari == 5 && nextT === "DZUHUR" ? "JUM'AT" : nextT}
        </div>
  );
}
