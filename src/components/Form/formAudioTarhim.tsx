import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { fetchData, inputTable } from "../../lib/connect";
import { File, saveTarhimFile } from "../../lib/upload";
import { useDataContext } from "../../contexts/dataContexts";
import { Link } from "react-router-dom";

type UploadFiles = {
      tarhimIsya : File | undefined;
      tarhimSubuh : File | undefined;
      tarhimDzuhur : File | undefined;
      tarhimAshar : File | undefined;
      tarhimMaghrib : File | undefined;
};

export default function FormAudioTarhim(props: any) {
  
  const dataContext = useDataContext();
  const tarhimIsyaRef = useRef<HTMLInputElement>(null);
  const tarhimSubuhRef = useRef<HTMLInputElement>(null);
  const tarhimDzuhurRef = useRef<HTMLInputElement>(null);
  const tarhimAsharRef = useRef<HTMLInputElement>(null);
  const tarhimMaghribRef = useRef<HTMLInputElement>(null);
  
  const [formAudio, setFormAudio] = useState({
    isTarhim: dataContext.data?.audio?.isTarhim ?? 0,   
    tarhimIsya : dataContext.data?.audio?.tarhimIsya ?? '',
    tarhimSubuh : dataContext.data?.audio?.tarhimSubuh ?? '',
    tarhimDzuhur : dataContext.data?.audio?.tarhimDzuhur ?? '',
    tarhimAshar : dataContext.data?.audio?.tarhimAshar ?? '',
    tarhimMaghrib : dataContext.data?.audio?.tarhimMaghrib ?? '',
  });

  const [audioUrl, setAudioUrl] = useState<UploadFiles>({
    tarhimIsya : undefined,
    tarhimSubuh : undefined,
    tarhimDzuhur : undefined,
    tarhimAshar : undefined,
    tarhimMaghrib : undefined,
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isloading, setIsLoading] = useState(false);

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormAudio({ ...formAudio, [name]: value });
  }

  function handleAudioChange(e: ChangeEvent<HTMLInputElement>): void {
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

      setAudioUrl({ ...audioUrl, [name]: filePayload });
    } else {
      setAudioUrl({ ...audioUrl, [name]: undefined });
    }
  }
 
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formAudio) {
      setError("Silahkan diisi form running text terlebih dahulu...");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
        let tarhimIsya = "";
        let tarhimSubuh = "";
        let tarhimDzuhur = "";
        let tarhimAshar = "";
        let tarhimMaghrib = "";
        
      if (audioUrl.tarhimIsya) {
          tarhimIsya = await saveTarhimFile(audioUrl.tarhimIsya)
      }
      if (audioUrl.tarhimSubuh) {
          tarhimSubuh = await saveTarhimFile(audioUrl.tarhimSubuh)
      }
      if (audioUrl.tarhimDzuhur) {
          tarhimDzuhur = await saveTarhimFile(audioUrl.tarhimDzuhur)
      }
      if (audioUrl.tarhimAshar) {
          tarhimAshar = await saveTarhimFile(audioUrl.tarhimAshar)
      }
      if (audioUrl.tarhimMaghrib) {
          tarhimMaghrib = await saveTarhimFile(audioUrl.tarhimMaghrib)
      }
      
      let defAudio = (
        await fetchData<Array<any>>("SELECT * FROM audio WHERE id=1")
      )[0];

      await inputTable(
        "UPDATE audio SET isTarhim=?,tarhimIsya=?,tarhimSubuh=?,tarhimDzuhur=?,tarhimAshar=?,tarhimMaghrib=? WHERE id=1",
        [
        formAudio.isTarhim != "" ? formAudio?.isTarhim : defAudio?.isTarhim ?? "",
        tarhimIsya != "" ? tarhimIsya : defAudio?.tarhimIsya ?? "",
        tarhimSubuh != "" ? tarhimSubuh : defAudio?.tarhimSubuh ?? "",
        tarhimDzuhur != "" ? tarhimDzuhur : defAudio?.tarhimDzuhur ?? "",
        tarhimAshar != "" ? tarhimAshar : defAudio?.tarhimAshar ?? "",
        tarhimMaghrib != "" ? tarhimMaghrib : defAudio?.tarhimMaghrib ?? ""       
        ]
      );
    } catch (error) {
      console.log(error);
      setError("Ada yang salah..Silahkan diulangi lagi");
    } finally {
      setIsLoading(false);
    }
        if (tarhimIsyaRef && tarhimIsyaRef.current) {tarhimIsyaRef.current.value = "" ; }
        if (tarhimSubuhRef && tarhimSubuhRef.current) {tarhimSubuhRef.current.value = "" ; }
        if (tarhimDzuhurRef && tarhimDzuhurRef.current) {tarhimDzuhurRef.current.value = "" ; }
        if (tarhimAsharRef && tarhimAsharRef.current) {tarhimAsharRef.current.value = "" ; }
        if (tarhimMaghribRef && tarhimMaghribRef.current) {tarhimMaghribRef.current.value = "" ; }

    await dataContext.getData();
    setFormAudio({
    isTarhim: dataContext.data?.audio?.isTarhim ?? 0,
    tarhimIsya : dataContext.data?.audio?.tarhimIsya ?? '',
    tarhimSubuh : dataContext.data?.audio?.tarhimSubuh ?? '',
    tarhimDzuhur : dataContext.data?.audio?.tarhimDzuhur ?? '',
    tarhimAshar : dataContext.data?.audio?.tarhimAshar ?? '',
    tarhimMaghrib : dataContext.data?.audio?.tarhimMaghrib ?? '',
    });

    setAudioUrl({ 
    tarhimIsya : undefined,
    tarhimSubuh : undefined,
    tarhimDzuhur : undefined,
    tarhimAshar : undefined,
    tarhimMaghrib : undefined,
    });
    
  }

  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;

  const dataAudio = dataContext.data?.audio;

  const isLoad = "absolute left-[140px] px-6 py-2 mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto text-center"
  const noLoad = "absolute left-[120px] px-6 py-2 mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto text-center"


  return (
    <form onSubmit={handleSubmit}>

      <div className=" mx-8 grid grid-cols-12 gap-6">
        
        <p className=" mt-10 mb-4 col-span-12 text-center text-blue-700 text-3xl">
          SETTING AUDIO TARHIM
        </p>

        <div className="col-span-4">
          <label className={props.cnLabel}>isTarhim</label>
          <select
            id="isTarhim"
            name="isTarhim"
            value={formAudio.isTarhim}
            onChange={handleSelectChange}
            className={props.cnSelect}
          >
            <option disabled value={undefined}>
              Pilih Apakah Tarhim On/Off...
            </option>
            <option value={1}>TARHIM ON</option>
            <option value={0}>TARHIM OFF</option>
          </select>
          <p className={props.cnSetup}>
            Setup :
            <span className="italic">
              {dataAudio.isTarhim == null || dataAudio.isTarhim == 0
                ? "Tarhim OFF"
                : "Tarhim ON"}
            </span>
          </p>
        </div>

        <div className="col-span-4">
          <label className={props.cnLabel}>Tarhim Isya'</label>
          <input
            type="file"
            ref={tarhimIsyaRef}
            name="tarhimIsya"
            onChange={handleAudioChange}
            className={props.cnInput}
            placeholder="Upload Logo Audio, jika ada.."
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataAudio.tarhimIsya}</span>
          </p>
        </div>

        <div className="col-span-4">
          <label className={props.cnLabel}>Tarhim Subuh</label>
          <input
            type="file"
            id="tarhimSubuh"
            ref={tarhimSubuhRef}
            name="tarhimSubuh"
            onChange={handleAudioChange}
            className={props.cnInput}
            placeholder="Pilih Backround tampilan "
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataAudio.tarhimSubuh}</span>
          </p>
        </div>

        <div className="col-span-4">
          <label className={props.cnLabel}>Tarhim Dzuhur</label>
          <input
            type="file"
            id="tarhimDzuhur"
            ref={tarhimDzuhurRef}
            name="tarhimDzuhur"
            onChange={handleAudioChange}
            className={props.cnInput}
            placeholder="Pilih Backround Video "
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataAudio.tarhimDzuhur}</span>
          </p>
        </div>
        
        <div className="col-span-4">
          <label className={props.cnLabel}>Tarhim Ashar</label>
          <input
            type="file"
            id="tarhimAshar"
            ref={tarhimAsharRef}
            name="tarhimAshar"
            onChange={handleAudioChange}
            className={props.cnInput}
            placeholder="Pilih Backround Video "
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataAudio.tarhimAshar}</span>
          </p>
        </div>
        
        <div className="col-span-4">
          <label className={props.cnLabel}>Tarhim Maghrib</label>
          <input
            type="file"
            id="tarhimMaghrib"
            ref={tarhimMaghribRef}
            name="tarhimMaghrib"
            onChange={handleAudioChange}
            className={props.cnInput}
            placeholder="Pilih Backround Video "
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataAudio.tarhimMaghrib}</span>
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
