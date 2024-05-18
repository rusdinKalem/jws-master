import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from "adhan";
import moment from "moment";
import { useDataContext } from "./dataContexts";

interface DefaultData {
  prayerTimes: any;
  waktuSholat: any;
  current: any;
  next: any;
  currentTimes: any;
  nextTimes: any;
  currentT: any;
  nextT: any;
}

interface PrayersContextData {
  prayersData: DefaultData | undefined;
  error: any;
  getData: () => Promise<void>;
}

function useProvidePrayersContext(ontime: any): PrayersContextData {
  const [prayersData, setPrayersData] = useState<DefaultData>();
  const [error, setError] = useState();

  const getData = async () => {
    try {
      if (ontime == null) {
        setPrayersData(undefined);
        return;
      }
      const ihti = parseInt(ontime?.ihti);
      const kosu = parseInt(ontime?.koSu);
      const kodz = parseInt(ontime?.koDz);
      const koas = parseInt(ontime?.koAs);
      const koma = parseInt(ontime?.koMa);
      const kois = parseInt(ontime?.koIs);
      const lati = parseFloat(ontime?.lati).toFixed(7);
      const long = parseFloat(ontime?.long).toFixed(7);
      const meth = await ontime?.meth;
      const madh = await ontime?.madz;

      const coordinates = new Coordinates(parseFloat(lati), parseFloat(long));
      let params = CalculationMethod.Singapore();
      const date = new Date();

      if (meth === "Umm Al Quran") {
        params = CalculationMethod.UmmAlQura();
      } else if (meth === "Muslim World League") {
        params = CalculationMethod.MuslimWorldLeague();
      } else if (meth === "Dubai") {
        params = CalculationMethod.Dubai();
      } else if (meth === "Singapore") {
        params = CalculationMethod.Singapore();
      } else if (meth === "Karachi") {
        params = CalculationMethod.Karachi();
      } else if (meth === "Tehran") {
        params = CalculationMethod.Tehran();
      } else if (meth === "Egyptian") {
        params = CalculationMethod.Egyptian();
      } else if (meth === "Kuwait") {
        params = CalculationMethod.Kuwait();
      } else if (meth === "Qatar") {
        params = CalculationMethod.Qatar();
      }
      params.madhab = madh === "Hanafi" ? Madhab.Hanafi : Madhab.Shafi;
      params.adjustments.fajr = kosu + ihti;
      params.adjustments.dhuhr = kodz + ihti;
      params.adjustments.asr = koas + ihti;
      params.adjustments.maghrib = koma + ihti;
      params.adjustments.isha = kois + ihti;
      
      //prayerTimes
      const prayerTimes = new PrayerTimes(coordinates, date, params);

      const jwsService = {
        getNextPrayer(nextP = prayerTimes.nextPrayer()) {
          if (nextP == "fajr") {
            return "SUBUH";
          } else if (nextP == "sunrise") {
            return "TERBIT";
          } else if (nextP == "dhuhr") {
            return "DZUHUR";
          } else if (nextP == "asr") {
            return "ASHAR";
          } else if (nextP == "maghrib") {
            return "MAGHRIB";
          } else if (nextP == "isha") {
            return "ISYA'";
          } else if (nextP == "none") {
            return "QIYAM";
          }

          return prayerTimes.nextPrayer();
        },

        getCurrentPrayer(currP = prayerTimes.currentPrayer()) {
          if (currP == "fajr") {
            return "SUBUH";
          } else if (currP == "sunrise") {
            return "TERBIT";
          } else if (currP == "dhuhr") {
            return "DZUHUR";
          } else if (currP == "asr") {
            return "ASHAR";
          } else if (currP == "maghrib") {
            return "MAGHRIB";
          } else if (currP == "isha") {
            return "ISYA'";
          } else if (currP == "none") {
            return "QIYAM";
          }

          return prayerTimes.currentPrayer();
        },
      };
      const waktuSholat = [
        {
          id: 1,
          name: "IMSAK",
          time: moment(prayerTimes.fajr).add(-10, "minute").format("HH:mm"),
        },
        {
          id: 2,
          name: "SUBUH",
          time: moment(prayerTimes.fajr).format("HH:mm"),
        },
        {
          id: 3,
          name: "TERBIT",
          time: moment(prayerTimes.sunrise).format("HH:mm"),
        },
        {
          id: 4,
          name: "DZUHUR",
          time: moment(prayerTimes.dhuhr).format("HH:mm"),
        },
        { id: 5, name: "ASHAR", time: moment(prayerTimes.asr).format("HH:mm") },
        {
          id: 6,
          name: "MAGHRIB",
          time: moment(prayerTimes.maghrib).format("HH:mm"),
        },
        { id: 7, name: "ISYA", time: moment(prayerTimes.isha).format("HH:mm") },
      ];

      const next = prayerTimes.nextPrayer();
      const current = prayerTimes.currentPrayer();
      
      const nextT = jwsService.getNextPrayer();
      const currentT = jwsService.getCurrentPrayer();
      
      const currentTimes = prayerTimes.timeForPrayer(current); 
      const nextTimes = prayerTimes.timeForPrayer(next); 
      
      setPrayersData({
        prayerTimes,
        waktuSholat,
        current,
        next,
        currentTimes,
        nextTimes,
        currentT,
        nextT
      });

      setError(undefined);
    } catch (e: any) {
      console.log(e);
      setError(e);
    }
  };

  return { prayersData, error, getData };
}

const DataPrayersContext = createContext({} as PrayersContextData);

export const useDataPrayersContext = () => {
  return useContext(DataPrayersContext);
};

const ProvidePrayersContext: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dataContext = useDataContext();
  const prayers: PrayersContextData = useProvidePrayersContext(
    dataContext.data?.ontime
  );

  useEffect(() => {
    prayers.getData();
  }, [dataContext.data?.ontime]);

  return (
    <DataPrayersContext.Provider value={prayers}>
      {children}
    </DataPrayersContext.Provider>
  );
};

export default ProvidePrayersContext;
