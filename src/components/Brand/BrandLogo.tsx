import { Link } from "react-router-dom";
import { useDataContext } from "../../contexts/dataContexts";
import { useEffect, useState } from "react";
import { getImageFileFromUploads } from "../../lib/upload";

export default function BrandLogo() {
  const dataContext = useDataContext();
  const [brandUrl, setBrandUrl] = useState<string>();

  useEffect(() => {
    if (dataContext.data?.media) {
      getImageFileFromUploads(dataContext?.data?.masjid.logoT).then((url) => {
        setBrandUrl(url ?? "/images/logo.jpg");
      }).catch(() => {
        setBrandUrl("/images/logo.jpg");
      });
    }
  }, [dataContext.data]);
  
  return (
      <Link to={"/formSetting"}>
        <img
          className="w-20 h-20 rounded-full"
          src={brandUrl}
          alt="LOGO"
        />
      </Link>
  );
}
