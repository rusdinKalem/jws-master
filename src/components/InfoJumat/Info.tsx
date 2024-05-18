import { useEffect, useState } from "react";
import moment from "moment";
import PetugasJumat from "./PetugasJumat";
import LaporanKas from "./LaporanKas";
export const Info = () => {

  const [durC, setDurC] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const durCT = moment(new Date()).valueOf() / 1000;
      setDurC(durCT);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [durC]);

  return (
    <section>
      <div className="absolute w-[1360px] h-[600px] left-[0px] top-[120px] pt-10 flex flex-col text-center">
        <>
          <div className="font-abel text-[80px] text-white -mt-12">
            {durC % 120 < 60 ? <PetugasJumat /> : <LaporanKas />}
          </div>
        </>
      </div>
    </section>
  );
};
