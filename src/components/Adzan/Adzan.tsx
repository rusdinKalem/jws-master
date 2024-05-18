import { useDataPrayersContext } from "../../contexts/prayersContext";

export const Adzan = () => {
  const dataPrayers = useDataPrayersContext();
  const curT = dataPrayers?.prayersData?.currentT;
  
  const hari = new Date().getDay();

  if (dataPrayers?.error) return <div className="failed">failed to load</div>;
  if (!dataPrayers?.prayersData) return <div className="failed">loading...</div>;
  
  return (
    <section>
      <div className="absolute w-[1360px] h-[600px] left-[0px] top-[120px] pt-10 flex flex-col text-center">
        <div className="font-qwitcher text-8xl font-bold text-blue-500">
          Saatnya <span className="font-bruno text-white">ADZAN</span>
        </div>
        <div className="font-monoton text-[200px] text-yellow-500">
          {hari == 5 && curT === "DZUHUR" ? "JUM'AT" : curT}
        </div>
        <div className=" -mt-12 grid grid-rows-3 text-[70px] text-white">
          <div className="row-span-1 font-bruno text-center -mb-12">
            DENGARKAN
          </div>
          <span className="row-span-1 font-qwitcher text-center -mt-8 text-blue-500">
            {" "}
            dan{" "}
          </span>
          <div className="row-span-1 font-bruno text-center -mt-12 text-red-700">
            BALAS LAFADZNYA{" "}
          </div>
        </div>
      </div>
    </section>
  );
};
