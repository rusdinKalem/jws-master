import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { fetchData, inputTable } from "../../lib/connect";
import { saveImageFile, File, saveVideoFile } from "../../lib/upload";
import { useDataContext } from "../../contexts/dataContexts";
import { Link } from "react-router-dom";

type UploadFiles = {
  backG: File | undefined;
};
type UploadFilesVideo = {
  backGV: File | undefined;
};

export default function FormMedia(props: any) {
  
  const dataContext = useDataContext();
  
  const backGRef = useRef<HTMLInputElement>(null);
  const backGVRef = useRef<HTMLInputElement>(null);
  
  const [formMedia, setFormMedia] = useState({
    useVid: dataContext.data?.media?.useVid ?? 0,
    isLive: dataContext.data?.media?.isLive ?? 0,
    liveVid: dataContext.data?.media?.liveVid ?? ''
  });
  const [imageUrl, setImageUrl] = useState<UploadFiles>({
    backG: undefined
  });
  const [videoUrl, setVideoUrl] = useState<UploadFilesVideo>({
    backGV: undefined
  });
  const [error, setError] = useState<string | null>(null);
  const [isloading, setIsLoading] = useState(false);

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormMedia({ ...formMedia, [name]: value });
  }
  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormMedia({ ...formMedia, [name]: value });
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
  function handleVideoChange(e: ChangeEvent<HTMLInputElement>): void {
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

      setVideoUrl({ ...videoUrl, [name]: filePayload });
    } else {
      setVideoUrl({ ...videoUrl, [name]: undefined });
    }
  }
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formMedia) {
      setError("Silahkan diisi form running text terlebih dahulu...");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      
      let backG = "";
      let backGV = "";

      if (imageUrl.backG) {
        backG = await saveImageFile(imageUrl.backG);
      }
      if (videoUrl.backGV) {
        backGV = await saveVideoFile(videoUrl.backGV);
      }
      let defMedia = (
        await fetchData<Array<any>>("SELECT * FROM media WHERE id=1")
      )[0];

      await inputTable(
        "UPDATE media SET useVid=?,isLive=?,backG=?,backGV=?,liveVid=? WHERE id=1",
        [
          formMedia.useVid != "" ? formMedia?.useVid : defMedia?.useVid ?? "",
          formMedia.isLive != "" ? formMedia?.isLive : defMedia?.isLive ?? "",
          backG != "" ? backG : defMedia?.backG ?? "",
          backGV != "" ? backGV : defMedia?.backGV ?? "",
          formMedia.liveVid != "" ? formMedia?.liveVid : defMedia?.liveVid ?? ""
        ]
      );
    } catch (error) {
      console.log(error);
      setError("Ada yang salah..Silahkan diulangi lagi");
    } finally {
      setIsLoading(false);
    }

    if (backGRef && backGRef.current) {
      backGRef.current.value = "";
    }
    if (backGVRef && backGVRef.current) {
      backGVRef.current.value = "";
    }

    await dataContext.getData();
    setFormMedia({
      useVid: dataContext.data?.media?.useVid ?? 0,
      isLive: dataContext.data?.media?.isLive ?? 0,
      liveVid: dataContext.data?.media?.liveVid ?? ''
    });
    setImageUrl({ backG: undefined});
    setVideoUrl({ backGV: undefined });
  }

  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;

  const dataMedia = dataContext.data?.media;

  const isLoad = "absolute left-[140px] px-6 py-2 mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto text-center"
  const noLoad = "absolute left-[120px] px-6 py-2 mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto text-center"


  return (
    <form onSubmit={handleSubmit}>
      <div className="ml-4 mr-4 grid grid-cols-12 gap-6">
        
        <p className=" mt-10 mb-4 col-span-12 text-center text-blue-700 text-3xl">
          SETTING BACKGROUND & LIVE VIDEO
        </p>

        <div className="col-span-4 ml-4 mr-8">
          <label className={props.cnLabel}>Tipe Background</label>
          <select
            id="useVid"
            name="useVid"
            value={formMedia.useVid}
            onChange={handleSelectChange}
            className={props.cnSelect}
          >
            <option disabled value={undefined}>
              Pilih Tipe Background...
            </option>
            <option value={0}>Image</option>
            <option value={1}>Video</option>
          </select>
          <p className={props.cnSetup}>
            Setup :<span className="italic">
              {dataMedia.useVid == null || dataMedia.useVid == 0
                ? "Image"
                : "Video"}
            </span>
          </p>
        </div>

        <div className="col-span-4 ml-4 mr-4">
          <label className={props.cnLabel}>Background Image</label>
          <input
            type="file"
            id="backG"
            ref={backGRef}
            name="backG"
            onChange={handleImageChange}
            className={props.cnInput}
            placeholder="Pilih Backround tampilan "
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataMedia.backG}</span>
          </p>
        </div>
        
        <div className="col-span-4 ml-4 mr-4">
          <label className={props.cnLabel}>Background Video</label>
          <input
            type="file"
            id="backGV"
            ref={backGVRef}
            name="backGV"
            onChange={handleVideoChange}
            className={props.cnInput}
            placeholder="Pilih Backround Video "
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataMedia.backGV}</span>
          </p>
        </div>


        <div className="col-span-4 ml-4 mr-8">
          <label className={props.cnLabel}>Is Live Video</label>
          <select
            id="isLive"
            name="isLive"
            value={formMedia.isLive}
            onChange={handleSelectChange}
            className={props.cnSelect}
          >
            <option disabled value={undefined}>
              Pilih apakah akan Live Video ?
            </option>
            <option value={0}>Live Video Off</option>
            <option value={1}>Live Video On</option>
          </select>
          <p className={props.cnSetup}>
            Setup :<span className="italic">
              {dataMedia.isLive == null || dataMedia.isLive == 0
                ? "Live Video Off"
                : "Live Video On"}
            </span>
          </p>
        </div>

        <div className="col-span-8 ml-4 mr-4">
          <label className={props.cnLabel}>Live Video</label>
          <input
            type="text"
            name="liveVid"
            value={formMedia.liveVid}
            onChange={handleInputChange}
            className={props.cnInput}
            placeholder="input alamat situs live video"
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataMedia.liveVid}</span>
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
