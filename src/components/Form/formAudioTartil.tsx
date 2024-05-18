import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { fetchData, inputTable } from "../../lib/connect";
import { File, saveTartilFile } from "../../lib/upload";
import { useDataContext } from "../../contexts/dataContexts";
import { Link } from "react-router-dom";

type UploadFiles = {
      tartilIsya : File | undefined;
      tartilSubuh : File | undefined;
      tartilDzuhur : File | undefined;
      tartilAshar : File | undefined;
      tartilMaghrib : File | undefined;
};

export default function FormAudioTartil(props: any) {
  
  const dataContext = useDataContext();
  
  const tartilIsyaRef = useRef<HTMLInputElement>(null);
  const tartilSubuhRef = useRef<HTMLInputElement>(null);
  const tartilDzuhurRef = useRef<HTMLInputElement>(null);
  const tartilAsharRef = useRef<HTMLInputElement>(null);
  const tartilMaghribRef = useRef<HTMLInputElement>(null);
  
  const [formAudio, setFormAudio] = useState({
    isTartil: dataContext.data?.audio?.isTartil ?? 0,
    tartilIsya : dataContext.data?.audio?.tartilIsya ?? '',
    tartilSubuh : dataContext.data?.audio?.tartilSubuh ?? '',
    tartilDzuhur : dataContext.data?.audio?.tartilDzuhur ?? '',
    tartilAshar : dataContext.data?.audio?.tartilAshar ?? '',
    tartilMaghrib : dataContext.data?.audio?.tartilMaghrib ?? '',
  });

  const [audioUrl, setAudioUrl] = useState<UploadFiles>({
    tartilIsya : undefined,
    tartilSubuh : undefined,
    tartilDzuhur : undefined,
    tartilAshar : undefined,
    tartilMaghrib : undefined,
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
        let tartilIsya = "";
        let tartilSubuh = "";
        let tartilDzuhur = "";
        let tartilAshar = "";
        let tartilMaghrib = "";

      if (audioUrl.tartilIsya) {
          tartilIsya = await saveTartilFile(audioUrl.tartilIsya)
      }
      if (audioUrl.tartilSubuh) {
          tartilSubuh = await saveTartilFile(audioUrl.tartilSubuh)
      }
      if (audioUrl.tartilDzuhur) {
          tartilDzuhur = await saveTartilFile(audioUrl.tartilDzuhur)
      }
      if (audioUrl.tartilAshar) {
          tartilAshar = await saveTartilFile(audioUrl.tartilAshar)
      }
      if (audioUrl.tartilMaghrib) {
          tartilMaghrib = await saveTartilFile(audioUrl.tartilMaghrib)
      }
      
      let defAudio = (
        await fetchData<Array<any>>("SELECT * FROM audio WHERE id=1")
      )[0];

      await inputTable(
        "UPDATE audio SET isTartil=?,tartilIsya=?,tartilSubuh=?,tartilDzuhur=?,tartilAshar=?,tartilMaghrib=? WHERE id=1",
        [
        formAudio.isTartil != "" ? formAudio?.isTartil : defAudio?.isTartil ?? "",
        tartilIsya != "" ? tartilIsya : defAudio?.tartilIsya ?? "",
        tartilSubuh != "" ? tartilSubuh : defAudio?.tartilSubuh ?? "",
        tartilDzuhur != "" ? tartilDzuhur : defAudio?.tartilDzuhur ?? "",
        tartilAshar != "" ? tartilAshar : defAudio?.tartilAshar ?? "",
        tartilMaghrib != "" ? tartilMaghrib : defAudio?.tartilMaghrib ?? ""
        ]
      );
    } catch (error) {
      console.log(error);
      setError("Ada yang salah..Silahkan diulangi lagi");
    } finally {
      setIsLoading(false);
    }

        if (tartilIsyaRef && tartilIsyaRef.current) {tartilIsyaRef.current.value = "" ; }
        if (tartilSubuhRef && tartilSubuhRef.current) {tartilSubuhRef.current.value = "" ; }
        if (tartilDzuhurRef && tartilDzuhurRef.current) {tartilDzuhurRef.current.value = "" ; }
        if (tartilAsharRef && tartilAsharRef.current) {tartilAsharRef.current.value = "" ; }
        if (tartilMaghribRef && tartilMaghribRef.current) {tartilMaghribRef.current.value = "" ; }
        
    await dataContext.getData();
    setFormAudio({
    isTartil: dataContext.data?.audio?.isTartil ?? 0,
    tartilIsya : dataContext.data?.audio?.tartilIsya ?? '',
    tartilSubuh : dataContext.data?.audio?.tartilSubuh ?? '',
    tartilDzuhur : dataContext.data?.audio?.tartilDzuhur ?? '',
    tartilAshar : dataContext.data?.audio?.tartilAshar ?? '',
    tartilMaghrib : dataContext.data?.audio?.tartilMaghrib ?? '',
  });
    
    setAudioUrl({ 
    tartilIsya : undefined,
    tartilSubuh : undefined,
    tartilDzuhur : undefined,
    tartilAshar : undefined,
    tartilMaghrib : undefined,
    });
    
  }

  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;

  const dataAudio = dataContext.data?.audio;

  const isLoad = "absolute left-[140px] px-6 py-2 mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto text-center"
  const noLoad = "absolute left-[120px] px-6 py-2 mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto text-center"


  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-8 grid grid-cols-12 gap-6">
        
        <p className=" mt-10 mb-4 col-span-12 text-center text-blue-700 text-3xl">
          SETTING AUDIO TARTIL
        </p>

        <div className="col-span-4">
          <label className={props.cnLabel}>isTartil</label>
          <select
            id="isTartil"
            name="isTartil"
            value={formAudio.isTartil}
            onChange={handleSelectChange}
            className={props.cnSelect}
          >
            <option disabled value={undefined}>
              Pilih Apakah Tartil On/Off...
            </option>
            <option value={1}>TARTIL ON</option>
            <option value={0}>TARTIL OFF</option>
          </select>
          <p className={props.cnSetup}>
            {" "}
            Setup :{" "}
            <span className="italic">
              {dataAudio.isTartil == null || dataAudio.isTartil == 0
                ? "Tartil OFF"
                : "Tartil ON"}
            </span>
          </p>
        </div>

        <div className="col-span-4">
          <label className={props.cnLabel}>Tartil Isya'</label>
          <input
            type="file"
            ref={tartilIsyaRef}
            name="tartilIsya"
            onChange={handleAudioChange}
            className={props.cnInput}
            placeholder="Upload Logo Audio, jika ada.."
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataAudio.tartilIsya}</span>
          </p>
        </div>

        <div className="col-span-4">
          <label className={props.cnLabel}>Tartil Subuh</label>
          <input
            type="file"
            id="tartilSubuh"
            ref={tartilSubuhRef}
            name="tartilSubuh"
            onChange={handleAudioChange}
            className={props.cnInput}
            placeholder="Pilih Backround tampilan "
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataAudio.tartilSubuh}</span>
          </p>
        </div>

        <div className="col-span-4">
          <label className={props.cnLabel}>Tartil Dzuhur</label>
          <input
            type="file"
            id="tartilDzuhur"
            ref={tartilDzuhurRef}
            name="tartilDzuhur"
            onChange={handleAudioChange}
            className={props.cnInput}
            placeholder="Pilih Backround Video "
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataAudio.tartilDzuhur}</span>
          </p>
        </div>

        <div className="col-span-4">
          <label className={props.cnLabel}>Tartil Ashar</label>
          <input
            type="file"
            id="tartilAshar"
            ref={tartilAsharRef}
            name="tartilAshar"
            onChange={handleAudioChange}
            className={props.cnInput}
            placeholder="Pilih Backround Video "
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataAudio.tartilAshar}</span>
          </p>
        </div>

        <div className="col-span-4">
          <label className={props.cnLabel}>Tartil Maghrib</label>
          <input
            type="file"
            id="tartilMaghrib"
            ref={tartilMaghribRef}
            name="tartilMaghrib"
            onChange={handleAudioChange}
            className={props.cnInput}
            placeholder="Pilih Backround Video "
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataAudio.tartilMaghrib}</span>
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
