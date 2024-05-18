import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { fetchData, inputTable } from "../../lib/connect";
import { File, saveAdzanFile } from "../../lib/upload";
import { useDataContext } from "../../contexts/dataContexts";
import { Link } from "react-router-dom";

type UploadFiles = {
      adzanIsya : File | undefined;
      adzanSubuh : File | undefined;
      adzanDzuhur : File | undefined;
      adzanAshar : File | undefined;
      adzanMaghrib : File | undefined;  
};

export default function FormAudioAdzan(props: any) {
  
  const dataContext = useDataContext();
  
  const adzanIsyaRef = useRef<HTMLInputElement>(null);
  const adzanSubuhRef = useRef<HTMLInputElement>(null);
  const adzanDzuhurRef = useRef<HTMLInputElement>(null);
  const adzanAsharRef = useRef<HTMLInputElement>(null);
  const adzanMaghribRef = useRef<HTMLInputElement>(null);  
  
  const [formAudio, setFormAudio] = useState({
    isAdzan: dataContext.data?.audio?.isAdzan ?? 0,
    adzanIsya : dataContext.data?.audio?.adzanIsya ?? '',
    adzanSubuh : dataContext.data?.audio?.adzanSubuh ?? '',
    adzanDzuhur : dataContext.data?.audio?.adzanDzuhur ?? '',
    adzanAshar : dataContext.data?.audio?.adzanAshar ?? '',
    adzanMaghrib : dataContext.data?.audio?.adzanMaghrib ?? ''
  });

  const [audioUrl, setAudioUrl] = useState<UploadFiles>({
    adzanIsya : undefined,
    adzanSubuh : undefined,
    adzanDzuhur : undefined,
    adzanAshar : undefined,
    adzanMaghrib : undefined
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
        let adzanIsya = "";
        let adzanSubuh = "";
        let adzanDzuhur = "";
        let adzanAshar = "";
        let adzanMaghrib = ""

      if (audioUrl.adzanIsya) {
          adzanIsya = await saveAdzanFile(audioUrl.adzanIsya)
      }
      if (audioUrl.adzanSubuh) {
          adzanSubuh = await saveAdzanFile(audioUrl.adzanSubuh)
      }
      if (audioUrl.adzanDzuhur) {
          adzanDzuhur = await saveAdzanFile(audioUrl.adzanDzuhur)
      }
      if (audioUrl.adzanAshar) {
          adzanAshar = await saveAdzanFile(audioUrl.adzanAshar)
      }
      if (audioUrl.adzanMaghrib) {
          adzanMaghrib = await saveAdzanFile(audioUrl.adzanMaghrib)
      }
      
      
      let defAudio = (
        await fetchData<Array<any>>("SELECT * FROM audio WHERE id=1")
      )[0];

      await inputTable(
        "UPDATE audio SET isAdzan=?,adzanIsya=?,adzanSubuh=?,adzanDzuhur=?,adzanAshar=?,adzanMaghrib=? WHERE id=1",
        [
        formAudio.isAdzan != "" ? formAudio?.isAdzan : defAudio?.isAdzan ?? "",
        adzanIsya != "" ? adzanIsya : defAudio?.adzanIsya ?? "",
        adzanSubuh != "" ? adzanSubuh : defAudio?.adzanSubuh ?? "",
        adzanDzuhur != "" ? adzanDzuhur : defAudio?.adzanDzuhur ?? "",
        adzanAshar != "" ? adzanAshar : defAudio?.adzanAshar ?? "",  
        adzanMaghrib != "" ? adzanMaghrib : defAudio?.adzanMaghrib ?? "",
        
        ]
      );
    } catch (error) {
      console.log(error);
      setError("Ada yang salah..Silahkan diulangi lagi");
    } finally {
      setIsLoading(false);
    }

        if (adzanIsyaRef && adzanIsyaRef.current) {adzanIsyaRef.current.value = "" ; }
        if (adzanSubuhRef && adzanSubuhRef.current) {adzanSubuhRef.current.value = "" ; }
        if (adzanDzuhurRef && adzanDzuhurRef.current) {adzanDzuhurRef.current.value = "" ; }
        if (adzanAsharRef && adzanAsharRef.current) {adzanAsharRef.current.value = "" ; }
        if (adzanMaghribRef && adzanMaghribRef.current) {adzanMaghribRef.current.value = "" ; }

    await dataContext.getData();
    setFormAudio({
    isAdzan: dataContext.data?.audio?.isAdzan ?? 0,
    adzanIsya : dataContext.data?.audio?.adzanIsya ?? '',
    adzanSubuh : dataContext.data?.audio?.adzanSubuh ?? '',
    adzanDzuhur : dataContext.data?.audio?.adzanDzuhur ?? '',
    adzanAshar : dataContext.data?.audio?.adzanAshar ?? '',
    adzanMaghrib : dataContext.data?.audio?.adzanMaghrib ?? ''
    });
    setAudioUrl({ 
    adzanIsya : undefined,
    adzanSubuh : undefined,
    adzanDzuhur : undefined,
    adzanAshar : undefined,
    adzanMaghrib : undefined
    });
    
  }

  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;

  const dataAudio = dataContext.data?.audio;

  const isLoad = "absolute left-[140px] px-6 py-2 mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto text-center"
  const noLoad = "absolute left-[120px] px-6 py-2 mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto text-center"

  return (
    <form onSubmit={handleSubmit}>
      
      <div className=" mx-8 mb-10 grid grid-cols-12 gap-6">
        
        <p className=" mt-10 mb-4 col-span-12 text-center text-blue-700 text-3xl">
          SETTING AUDIO ADZAN
        </p>

        <div className="col-span-4">
          <label className={props.cnLabel}>isAdzan</label>
          <select
            id="isAdzan"
            name="isAdzan"
            value={formAudio.isAdzan}
            onChange={handleSelectChange}
            className={props.cnSelect}
          >
            <option disabled value={undefined}>
              Pilih Apakah Adzan On/Off...
            </option>
            <option value={1}>ADZAN ON</option>
            <option value={0}>ADZAN OFF</option>
          </select>
          <p className={props.cnSetup}>
            Setup :
            <span className="italic">
              {dataAudio.isAdzan == null || dataAudio.isAdzan == 0
                ? "Adzan OFF"
                : "ADZAN ON"}
            </span>
          </p>
        </div>

        <div className="col-span-4">
          <label className={props.cnLabel}>Adzan Isya'</label>
          <input
            type="file"
            ref={adzanIsyaRef}
            name="adzanIsya"
            onChange={handleAudioChange}
            className={props.cnInput}
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataAudio.adzanIsya}</span>
          </p>
        </div>

        <div className="col-span-4">
          <label className={props.cnLabel}>Adzan Subuh</label>
          <input
            type="file"
            id="adzanSubuh"
            ref={adzanSubuhRef}
            name="adzanSubuh"
            onChange={handleAudioChange}
            className={props.cnInput}
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataAudio.adzanSubuh}</span>
          </p>
        </div>

        <div className="col-span-4">
          <label className={props.cnLabel}>Adzan Dzuhur</label>
          <input
            type="file"
            id="adzanDzuhur"
            ref={adzanDzuhurRef}
            name="adzanDzuhur"
            onChange={handleAudioChange}
            className={props.cnInput}
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataAudio.adzanDzuhur}</span>
          </p>
        </div>
        
        <div className="col-span-4">
          <label className={props.cnLabel}>Adzan Ashar</label>
          <input
            type="file"
            id="adzanAshar"
            ref={adzanAsharRef}
            name="adzanAshar"
            onChange={handleAudioChange}
            className={props.cnInput}
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataAudio.adzanAshar}</span>
          </p>
        </div>

        <div className="col-span-4">
          <label className={props.cnLabel}>Adzan Maghrib</label>
          <input
            type="file"
            id="adzanMaghrib"
            ref={adzanMaghribRef}
            name="adzanMaghrib"
            onChange={handleAudioChange}
            className={props.cnInput}
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataAudio.adzanMaghrib}</span>
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
