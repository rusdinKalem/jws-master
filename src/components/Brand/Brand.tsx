import { useDataContext } from "../../contexts/dataContexts";
import BrandLogo from "./BrandLogo";
import BrandType from "./BrandType";
import BrandName from "./BrandName";
import BrandAlamat from "./BrandAlamat";
import { clsx } from "clsx";

export default function Brand() {
  const dataContext = useDataContext();
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;
  const theme = dataContext?.data?.display.theme;

  return (
    <div
      className={clsx({
        "flex flex-row z-60 w-[400px] h-[80px]": true,
        "pt-5": theme === "Empat",
        "pl-5": theme === "Dua" || theme === "Tiga" || theme === "Empat",
      })}
    >
      <BrandLogo />
      <div className="pl-3 font-medium text-left">
        <BrandType />
        <BrandName />
        <BrandAlamat />
      </div>
    </div>
  );
}
