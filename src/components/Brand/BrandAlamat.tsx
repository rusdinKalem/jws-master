import { useDataContext } from "../../contexts/dataContexts";
import { useDataColorsContext } from "../../contexts/colorsContext";
import clsx from "clsx";

export default function BrandAlamat() {
  
  const dataContext = useDataContext();
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;
  const masjid = dataContext?.data.masjid;
  
  const dataColorsContext = useDataColorsContext();
  if (dataColorsContext?.error) return <div className="failed">failed to load</div>;
  if (!dataColorsContext?.colorsData) return <div className="Loading">Loading...</div>;

  const wAlamat = dataColorsContext?.colorsData.tBrandAlamat
  return (
        <div className={clsx(wAlamat,"text-sm dark:text-gray-400 Capitalize")}>
          {masjid.alamat}
        </div>
      );
}
