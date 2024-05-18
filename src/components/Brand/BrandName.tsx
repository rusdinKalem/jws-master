import { useDataContext } from "../../contexts/dataContexts";
import { useDataColorsContext } from "../../contexts/colorsContext";
import clsx from "clsx";

export default function BrandName() {
  
  const dataContext = useDataContext();
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;
  const masjid = dataContext?.data.masjid;

  const dataColorsContext = useDataColorsContext();
  if (dataColorsContext?.error) return <div className="failed">failed to load</div>;
  if (!dataColorsContext?.colorsData) return <div className="Loading">Loading...</div>;

  const wNama = dataColorsContext?.colorsData.tBrandNama
  
  return (
        <div className={clsx(wNama,"text-3xl Uppercase")}>{masjid.namaT}</div>
  );
}
