import { useDataPrayersContext } from "../../contexts/prayersContext";
import beep from "../../../src/beeps/beep02.mp3"

export const Ontime = (props:any) => {
  const layar = props.layar;
  const dataPrayers = useDataPrayersContext();
  
  const prayers = dataPrayers?.prayersData;
  const curT = prayers?.currentT;
  
  const hari = new Date().getDay();
  
    if (dataPrayers?.error) return <div className="failed">failed to load</div>;
    if (!dataPrayers?.prayersData) return <div className="Loading">Loading...</div>;

  return (
    <section>
      {
        (layar === "ontime" ? <audio src={beep} autoPlay ={true} loop={true}></audio>: null)
      }
      <div className="absolute w-[1360px] h-[600px] left-[0px] top-[120px] pt-10 flex flex-col text-center">
        <div className="font-qwitcher text-8xl font-bold text-blue-500">
          WAKTU <span className="font-bruno text-white">SHOLAT</span>
        </div>
        <div className="-mt-5 font-monoton text-[200px] text-yellow-500">
          {hari == 5 && curT === "DZUHUR" ? "JUM'AT" : curT}
        </div>
        <div className="-mt-5 font-bruno text-[120px] text-white">
          TELAH TIBA
        </div>
      </div>
    </section>
  );
};
