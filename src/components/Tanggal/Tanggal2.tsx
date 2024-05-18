import { useDataColorsContext } from "../../contexts/colorsContext";
import { TanggalHijriyah } from "./TanggalHijriyah";
import { TanggalMasehi } from "./TanggalMasehi";
import { clsx } from 'clsx';


export const Tanggal2 = () => {
  
  const dataColorsContext = useDataColorsContext();
  
  const tTanggalH = dataColorsContext?.colorsData?.tTanggalH
  const tTanggalM = dataColorsContext?.colorsData?.tTanggalM
  
  if (dataColorsContext?.error) return <div className="failed">failed to load</div>;
  if (!dataColorsContext?.colorsData) return <div className="Loading">Loading...</div>;

  return (
    <div className={
      clsx({
        'w-[560px] h-[80px] text-[32px] flex flex-row grid grid-rows-2': true,
      })}
      >
      <div className={
        clsx(
          " underline underline-offset-8"
          , tTanggalH)}>
        <TanggalHijriyah/>
      </div>
      <div className={tTanggalM}>
        <TanggalMasehi/>
      </div>
    </div>
  );
};
