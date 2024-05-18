import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { fetchData, inputTable } from "../../lib/connect";
import { saveImageFile, File} from "../../lib/upload";
import { useDataContext } from "../../contexts/dataContexts";
import { Link } from "react-router-dom";

export default function FormMasjid(props: any) {
  
  const dataContext = useDataContext();

  type UploadFiles = {
    logoT: File | undefined;
  };

  const logoTRef = useRef<HTMLInputElement>(null);

  const [formMasjid, setFormMasjid] = useState({
    typeT: "",
    namaT: "",
    alamat: "",
  });
  const [imageUrl, setImageUrl] = useState<UploadFiles>({
    logoT: undefined
  });

  const [error, setError] = useState<string | null>(null);
  const [isloading, setIsLoading] = useState(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormMasjid({ ...formMasjid, [name]: value });
  }

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormMasjid({ ...formMasjid, [name]: value });
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
    let target = e.target as HTMLInputElement;
    let name = target.name;
    let files = target.files;

    if (files != null && files[0]) {
      let file = files[0];
      let url = URL.createObjectURL(file);
      let fileName = file.name;

      let filePayload: File = {
        blobUrl: url,
        fileName: fileName,
      };

      setImageUrl({ ...imageUrl, [name]: filePayload });
    } else {
      setImageUrl({ ...imageUrl, [name]: undefined });
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formMasjid) {
      setError("Silahkan diisi form running text terlebih dahulu...");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      let logoT = "";
      let defMasjid = (
        await fetchData<Array<any>>("SELECT * FROM masjid WHERE id=1")
      )[0];
      
      if (imageUrl.logoT) {
        logoT = await saveImageFile(imageUrl.logoT);
      }

      await inputTable(
        "UPDATE masjid SET logoT=?,typeT=?,namaT=?,alamat=? WHERE id=1",
        [
          logoT != "" ? logoT : defMasjid?.logoT ?? "",
          formMasjid.typeT != "" ? formMasjid.typeT : defMasjid?.typeT ?? "",
          formMasjid.namaT != "" ? formMasjid.namaT : defMasjid?.namaT ?? "",
          formMasjid.alamat != "" ? formMasjid.alamat : defMasjid?.alamat ?? "",
      
        ]
      );
    } catch (error) {
      console.log(error);
      setError("Ada yang salah..Silahkan diulangi lagi");
    } finally {
      setIsLoading(false);
    }

    if (logoTRef && logoTRef.current) {
      logoTRef.current.value = "";
    }

    await dataContext.getData();
    setFormMasjid({
      typeT: "",
      namaT: "",
      alamat: "",
    });

    setImageUrl({ logoT: undefined});
  }

  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;

  const dataMasjid = dataContext.data?.masjid;
  const dataMedia = dataContext.data?.media;

  const isLoad = "absolute left-[140px] px-6 py-2 mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto text-center"
  const noLoad = "absolute left-[120px] px-6 py-2 mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto text-center"

  return (
    <form onSubmit={handleSubmit}>
      <div className="ml-4 mr-4 grid grid-cols-8 gap-6 mb-3">
        <p className=" mt-10 mb-4 col-span-8 text-center text-blue-700 text-3xl">
          SETTING MASJID
        </p>

        <div className=" col-span-2 ml-4 mr-8">
          <label className={props.cnLabel}>Type</label>
          <select
            name="typeT"
            value={formMasjid.typeT}
            onChange={handleSelectChange}
            className={props.cnSelect}
          >
            <option>Pilih Type...</option>
            <option>Masjid</option>
            <option>Musholla</option>
            <option>Surau</option>
            <option>Langgar</option>
          </select>
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataMasjid.typeT}</span>
          </p>
        </div>
        <div className="col-span-2 ml-4 mr-4">
          <label className={props.cnLabel}>Logo</label>
          <input
            type="file"
            ref={logoTRef}
            name="logoT"
            onChange={handleImageChange}
            className={props.cnInput}
            placeholder="Upload Logo Media, jika ada.."
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataMasjid.logoT}</span>
          </p>
        </div>
        <div className="col-span-2 mr-4 pt-2">
          <label className={props.cnLabel}>Nama</label>
          <input
            type="text"
            name="namaT"
            value={formMasjid.namaT}
            onChange={handleInputChange}
            className={props.cnInput}
            placeholder="Tulis nama masjid/musolla/langgar/surau"
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataMasjid.namaT}</span>
          </p>
        </div>
        <div className="col-span-2 mr-4 pt-2">
          <label className={props.cnLabel}>Alamat</label>
          <input
            type="text"
            name="alamat"
            value={formMasjid.alamat}
            onChange={handleInputChange}
            className={props.cnInput}
            placeholder="Tulis nama masjid/musolla/langgar/surau"
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataMasjid.alamat}</span>
          </p>
        </div>

      </div>

      <button
        type="submit"
        className=" absolute px-5 py-2 mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                                focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto text-center "
      >
        {isloading ? "loadings..." : "SIMPAN"}
      </button>
      <Link to={"/"}
          className={isloading ? isLoad : noLoad}
        >
          TUTUP
      </Link>
    </form>
  );
}
