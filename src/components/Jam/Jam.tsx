import { useState, useEffect } from 'react';
import { useDataColorsContext } from "../../contexts/colorsContext";
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

export const  Jam = () => {
  
  const dataColorsContext = useDataColorsContext();
  
  const wJamMnt = dataColorsContext?.colorsData?.tJamMnt
  const wJamDtk = dataColorsContext?.colorsData?.tJamDtk
  
  const [hours,setHours]=useState("00");
  const [minutes,setMinutes]=useState("00");
  const [seconds,setSeconds]=useState("00");
  
  useEffect(
    ()=>{
      const intervalId= setInterval(
        ()=>{
          let now = new Date();   
          
          setHours(now.getHours().toString().padStart(2,'0'));
          setMinutes(now.getMinutes().toString().padStart(2,'0'));
          setSeconds(now.getSeconds().toString().padStart(2,'0'));
          
          return () => clearInterval(intervalId); 
          
        },1000);
        
      },[seconds,minutes,hours]
    );
    

    if (dataColorsContext?.error) return <div className="failed">failed to load</div>;
    if (!dataColorsContext?.colorsData) return <div className="Loading">Loading...</div>;

    return (
      
      <Link to={'/formSetting'}>
          <div className='grid grid-cols-12 flex flex-row font-bold text-center text-[90px] w-[460px]'>
            <div className={clsx(wJamMnt,'col-span-4')}>
            {hours}
            </div >
            <div className={wJamMnt}>
            :
            </div>
            <div className={clsx(wJamMnt,'col-span-4')}>
            {minutes}
            </div>
            <div className={clsx(wJamDtk,'col-span-2 text-6xl')}>
            {seconds}
            </div>
          </div>
        </Link>    
  )
}
