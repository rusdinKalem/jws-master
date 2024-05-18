import { useState, useEffect } from "react";
import { useDataContext } from "../../contexts/dataContexts";
import { useDataColorsContext } from "../../contexts/colorsContext";
import { TanggalHijriyah } from "./TanggalHijriyah";
import { TanggalMasehi } from "./TanggalMasehi";
import { clsx } from 'clsx';


export const Tanggal = () => {

  const dataContext = useDataContext();
  const dataColorsContext = useDataColorsContext();
    
  const [seconds,setSeconds]=useState("00");
  
  useEffect(
    ()=>{
      
      const intervalId= setInterval(
        ()=>{
          let d = new Date();   
          setSeconds(d.getSeconds().toString().padStart(2,'0'));
          return () => clearInterval(intervalId); 
        },1000);
        
      },[seconds]
    );

  let dt = parseInt(seconds)
  
  const context = dataContext?.data;
  const display = context?.display;
  const theme = display.theme

  const tTanggalH = dataColorsContext?.colorsData?.tTanggalH
  const tTanggalM = dataColorsContext?.colorsData?.tTanggalM
  const bgTanggalH = dataColorsContext?.colorsData?.bgTanggalH
  const bgTanggalM = dataColorsContext?.colorsData?.bgTanggalM
  
  
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;
  if (dataColorsContext?.error) return <div className="failed">failed to load</div>;
  if (!dataColorsContext?.colorsData) return <div className="Loading">Loading...</div>;
  

  return (
    <div className={
      clsx({
        'w-[560px] h-[80px] text-left text-[32px] flex flex-row grid grid-rows-2':theme === 'Satu' || theme === 'Dua',
        'w-[480px] h-[60px] text-right text-[28px]':theme === 'Tiga' || theme === 'Empat',
      })}
    >

        <div className={
          clsx({
            '-skew-x-[15deg] py-1 px-4' : (theme === 'Tiga' || theme === 'Empat') && dt<=30,
            'hidden': (theme === 'Tiga' || theme === 'Empat') && dt>30,
            " underline underline-offset-8": theme === 'Satu' || theme === 'Dua'
            }, tTanggalH, bgTanggalH)}>
          <TanggalHijriyah/>
        </div>
        
        <div className={
          clsx({
            '-skew-x-[15deg] py-1 px-4' : (theme === 'Tiga' || theme === 'Empat') && dt>30,
            'hidden': (theme === 'Tiga' || theme === 'Empat') && dt<=30 
          }, tTanggalM, bgTanggalM)}>
          <TanggalMasehi/>
        </div>
    
    </div>
  );
};
