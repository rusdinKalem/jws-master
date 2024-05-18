import JelangCountDown from "./JelangCountDown";
import JelangNext from "./JelangNext";
import { useDataContext } from "../../contexts/dataContexts";
import { clsx } from 'clsx';

export default function Jelang() {
  
  const dataContext = useDataContext();
  
  const theme = dataContext?.data?.display.theme;

  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;  

  return (
      <div className={
        clsx({
          " absolute w-[1060px] h-[540px] left-[300px] top-[100px] pt-10" : theme === "Satu", 
          " absolute w-[1060px] h-[540px] left-[0px] top-[100px] pt-10" : theme === "Dua", 
          " absolute w-[1360px] h-[480px] left-[0px] top-[140px] pt-10" : theme === "Tiga", 
          " absolute w-[1360px] h-[480px] left-[0px] top-[144px]" : theme === "Empat", 
        })
      }>    
            <div className={clsx({
              "text-center font-qwitcher text-6xl font-bold text-slate-200" : theme === "Satu" || theme === "Dua",
              "hidden" : theme === "Tiga" || theme === "Empat",
              })}>
              Menjelang Waktu
            </div>
            <div className="text-center font-bruno text-6xl font-bold text-blue-700">
              <span className=
              {clsx({
                "font-qwitcher text-6xl text-slate-200" : theme === "Tiga" || theme === "Empat",
                "hidden" : theme === "Satu" || theme === "Dua",
                })}
              >Menjelang Waktu </span>
              SHOLAT
            </div>  
            <div className=" -mt-[20px] text-center font-monoton text-[120px] text-yellow-500">
              <JelangNext/>
            </div>  
            <div className="px-[200px] -mt-[80px] text-center font-seven text-[200px] text-white">
              <JelangCountDown/>
            </div>  
        </div>
  );
}
