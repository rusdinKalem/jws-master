import { useEffect, useState} from "react";
import moment from "moment";
import Utama from "./Utama";
import { useDataPrayersContext } from "../contexts/prayersContext";

const Layar = (props: any) => {

  const background = props.background;
  const jws = props.jws;
  const useVid = props.useVid;
  
  const dataPrayers = useDataPrayersContext();
  useEffect(() => {
    const intervalId = setInterval(async () => {
      await dataPrayers.getData();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (dataPrayers?.error) return <div className="failed">failed to load</div>;
  if (!dataPrayers?.prayersData) return <div className="Loading">Loading...</div>;

  const now = new Date();
  const prayers = dataPrayers?.prayersData;
  const prayerTimes = prayers?.prayerTimes;
  const current = prayers?.current;
  const next = prayers?.next;
  const curT = prayers?.currentT;
  const nxtT = prayers?.nextT;

  const durCur = moment(now).diff(prayerTimes.timeForPrayer(current)) / 1000;
  const durNxt = moment(prayerTimes.timeForPrayer(next)).diff(now) / 1000;
  
  const iqSu = parseInt(jws.iQsu) * 60;
  const iqDz = parseInt(jws.iQdz) * 60;
  const iqAs = parseInt(jws.iQas) * 60;
  const iqMa = parseInt(jws.iQma) * 60;
  const iqIs = parseInt(jws.iQis) * 60;
  const wIn = parseInt(jws.dInf) * 60;
  const wKh = parseInt(jws.dKhu) * 60;
  const wSo = parseInt(jws.dSho) * 60;
  const jWk = parseInt(jws.dJel) * 60;
  const dAdz = parseInt(jws.dAdz) * 60;
  const wAd = (curT === "SUBUH" ? dAdz + 60 : dAdz);

  let wIq: number;
  switch (true) {
    case curT === "SUBUH":
      wIq = iqSu;
      break;
    case curT === "DZUHUR":
      wIq = iqDz;
      break;
    case curT === "ASHAR":
      wIq = iqAs;
      break;
    case curT === "MAGHRIB":
      wIq = iqMa;
      break;
    case curT === "ISYA'":
      wIq = iqIs;
      break;
    default:
      wIq = 600;
      break;
  }

  const hari = new Date().getDay();
  const t1 = wAd + 10;
  const t2 = wIq + wAd + 10;
  const t3 = wIq + wAd + 30;
  const t3s = wSo + wIq + wAd + 30;
  const t4 = wIn + 10;
  const t5 = wAd + wIn + 10;
  const t6 = wKh + wAd + wIn + 10;
  const t7 = wKh + wAd + wIn + 30;
  const t7s = wSo + wKh + wAd + wIn + 30;

  let layar = "utama";

  const getLayar = () => {
    if (durNxt) {
      if (
        nxtT === "SUBUH" ||
        nxtT === "DZUHUR" ||
        nxtT === "ASHAR" ||
        nxtT === "MAGHRIB" ||
        nxtT === "ISYA'"
      ) {
        if (durNxt <= jWk) {
          layar = "jelang";
        }
      }
    }

    if (durCur) {
      //Jika Bukan Sholat Dzuhur
      if (
        curT === "SUBUH" ||
        curT === "ASHAR" ||
        curT === "MAGHRIB" ||
        curT === "ISYA'"
      ) {
        if (durCur <= 10) {
          layar = "ontime";
        }
        if (durCur > 10 && durCur <= t1) {
          layar = "adzan";
        }
        if (durCur > t1 && durCur <= t2) {
          layar = "iqomat";
        }
        if (durCur > t2 && durCur <= t3) {
          layar = "jelangSholat";
        }
        if (durCur > t3 && durCur <= t3s) {
          layar = "sholat";
        }
        if (durCur > t3s && durCur <= t3s + 10) {
          layar = "utama";
        }
      }
      //Jika Sholat Dzuhur
      if (curT === "DZUHUR") {
        if (hari == 5) {
          //Jika Sholat Jumat
          if (durCur <= 10) {
            layar = "ontime";
          }
          if (durCur > 10 && durCur <= t4) {
            layar = "info";
          }
          if (durCur > t4 && durCur <= t5) {
            layar = "adzan";
          }
          if (durCur > t5 && durCur <= t6) {
            layar = "khutbah";
          }
          if (durCur > t6 && durCur <= t7) {
            layar = "jelangSholat";
          }
          if (durCur > t7 && durCur <= t7s) {
            layar = "sholat";
          }
          if (durCur > t7s && durCur <= t7s + 10) {
            layar = "utama";
          }
        }
        if (hari !== 5) {
          //Jika Sholat Dzuhur Biasa (Bukan di Hari Jumat)
          if (durCur <= 10) {
            layar = "ontime";
          }
          if (durCur > 10 && durCur <= t1) {
            layar = "adzan";
          }
          if (durCur > t1 && durCur <= t2) {
            layar = "iqomat";
          }
          if (durCur > t2 && durCur <= t3) {
            layar = "jelangSholat";
          }
          if (durCur > t3 && durCur <= t3s) {
            layar = "sholat";
          }
          if (durCur > t3s && durCur <= t3s + 10) {
            layar = "utama";
          }
        }
      }
    }
  }; //getLayar

  getLayar();
  
  return <Utama 
            background={background} 
            useVid={useVid}
            layar={layar}
            t2={t2} 
            t3s={t3s} 
            t7s={t7s} 
         />
};

export default Layar;
