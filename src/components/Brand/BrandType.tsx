import { useDataContext } from "../../contexts/dataContexts";
import { useDataColorsContext } from "../../contexts/colorsContext";
import { clsx } from 'clsx';

export default function BrandType() {
  
  const dataContext = useDataContext();
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;
  const masjid = dataContext?.data.masjid;
  const themeWarna = dataContext?.data.display.themeWarna;
  
  const dataColorsContext = useDataColorsContext();
  if (dataColorsContext?.error) return <div className="failed">failed to load</div>;
  if (!dataColorsContext?.colorsData) return <div className="Loading">Loading...</div>;

  const wType = dataColorsContext?.colorsData.tBrandType
  return (
        <div className={clsx(wType,"-mb-2 text-xl Uppercase")}>
          {masjid.typeT}
        </div>
  );
}
