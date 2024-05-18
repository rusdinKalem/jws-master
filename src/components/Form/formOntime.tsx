import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchData, inputTable } from "../../lib/connect";
import { useDataContext } from "../../contexts/dataContexts";
import { Link } from "react-router-dom";

export default function FormOntime(props: any) {
  const dataContext = useDataContext();
  const [formOntime, setFormOntime] = useState({
    madz: "",
    meth: "",
    lati: "",
    long: "",
    ihti: "",
    koIs: "",
    koSu: "",
    koDz: "",
    koAs: "",
    koMa: "",
    koHj: "",
  });
  const [error, setError] = useState<String | null>(null);
  const [isloading, setIsLoading] = useState(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormOntime({ ...formOntime, [name]: value });
  }
  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormOntime({ ...formOntime, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!formOntime) {
      setError("Silahkan diisi form running text terlebih dahulu...");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      let defOnTime = (await fetchData<Array<any>>("SELECT * FROM ontime WHERE id=1"))[0];

      await inputTable(
        "UPDATE ontime SET madz=?, meth=?, lati=?, long=?, ihti=?, koIs=?, koSu=?, koDz=?, koAs=?, koMa=?, koHj=? WHERE id=1",
        [
          formOntime.madz != '' ? formOntime.madz : (defOnTime?.madz ?? ""),
          formOntime.meth != '' ? formOntime.meth : (defOnTime?.meth ?? ""),
          formOntime.lati != '' ? formOntime.lati : (defOnTime?.lati ?? ""),
          formOntime.long != '' ? formOntime.long : (defOnTime?.long ?? ""),
          formOntime.ihti != '' ? formOntime.ihti : (defOnTime?.ihti ?? ""),
          formOntime.koIs != '' ? formOntime.koIs : (defOnTime?.koIs ?? ""),
          formOntime.koSu != '' ? formOntime.koSu : (defOnTime?.koSu ?? ""),
          formOntime.koDz != '' ? formOntime.koDz : (defOnTime?.koDz ?? ""),
          formOntime.koAs != '' ? formOntime.koAs : (defOnTime?.koAs ?? ""),
          formOntime.koMa != '' ? formOntime.koMa : (defOnTime?.koMa ?? ""),
          formOntime.koHj != '' ? formOntime.koHj : (defOnTime?.koHj ?? "")
        ]
      );      
      
      await dataContext.getData();
    } catch (error) {
      setError("Ada yang salah..Silahkan diulangi lagi");
    } finally {
      setIsLoading(false);
    }
    setFormOntime({
      madz: "",
      meth: "",
      lati: "",
      long: "",
      ihti: "",
      koIs: "",
      koSu: "",
      koDz: "",
      koAs: "",
      koMa: "",
      koHj: "",
    });
  }

  const dataOntime = dataContext.data?.ontime;

  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="ml-4 mr-4 grid grid-cols-12 gap-6">
        <p className=" mt-10 mb-4 col-span-12 text-center text-blue-700 text-3xl">
          SETTING ON TIME
        </p>

        <div className="col-span-2 ml-4 mr-4">
          <label className={props.cnLabel}>Madzhab</label>
          <select
            name="madz"
            value={formOntime.madz}
            onChange={handleSelectChange}
            className={props.cnSelect}
          >
            <option>Pilih Madzhab...</option>
            <option>Shafi</option>
            <option>Hanafi</option>
          </select>
          <p className={props.cnSetup}>
            
            Setup : <span className="italic">{dataOntime.madz}</span>
          </p>
        </div>
        <div className="col-span-4 ml-4 mr-4 ">
          <label className={props.cnLabel}>Metode</label>
          <select
            name="meth"
            value={formOntime.meth}
            onChange={handleSelectChange}
            className={props.cnSelect}
          >
            <option>Pilih Methode...</option>
            <option>Singapore</option>
            <option>Muslim World League</option>
            <option>Umm Al Quran</option>
            <option>Dubai</option>
            <option>Karachi</option>
            <option>Egyptian</option>
            <option>Kuwait</option>
            <option>Qatar</option>
          </select>
          <p className={props.cnSetup}>
            
            Setup : <span className="italic">{dataOntime.meth}</span>
          </p>
        </div>
        <div className="col-span-2 ml-4 mr-4">
          <label className={props.cnLabel}>Latitude</label>
          <input
            type="number"
            name="lati"
            value={formOntime.lati}
            onChange={handleInputChange}
            className={props.cnInput}
            min="-180"
            max="180"
            step="any"
            placeholder="latitude"
          />
          <p className={props.cnSetup}>
            
            Setup : <span className="italic">{dataOntime.lati}</span>
          </p>
        </div>
        <div className="col-span-2  mr-4 ml-4">
          <label className={props.cnLabel}>Longitude</label>
          <input
            type="number"
            name="long"
            value={formOntime.long}
            onChange={handleInputChange}
            className={props.cnInput}
            min="-180"
            max="180"
            step="any"
            placeholder="longitude"
            
          />
          <p className={props.cnSetup}>
            
            Setup : <span className="italic">{dataOntime.long}</span>
          </p>
        </div>
        <div className="col-span-2 ml-4 mr-4">
          <label className={props.cnLabel}>Ihtiati</label>
          <input
            type="number"
            name="ihti"
            value={formOntime.ihti}
            onChange={handleInputChange}
            className={props.cnInput}
            min="-100000"
            max="100000"
            step="1"
            placeholder="ihtiati"
            
          />
          <p className={props.cnSetup}>
            
            Setup : <span className="italic">{dataOntime.ihti}</span>
            <span className="italic">{' '}menit</span>
          </p>
        </div>
        <div className="col-span-2 ml-4 mr-4">
          <label className={props.cnLabel}>Koreksi Isya</label>
          <input
            type="number"
            name="koIs"
            value={formOntime.koIs}
            onChange={handleInputChange}
            className={props.cnInput}
            min="-10000"
            max="10000"
            step="1"
            placeholder="0"
            
          />
          <p className={props.cnSetup}>
            
            Setup : <span className="italic">{dataOntime.koIs}</span>
            <span className="italic">{' '}menit</span>
          </p>
        </div>
        <div className="col-span-2 ml-4 mr-4">
          <label className={props.cnLabel}>Koreksi Subuh</label>
          <input
            type="number"
            name="koSu"
            value={formOntime.koSu}
            onChange={handleInputChange}
            className={props.cnInput}
            min="-1000"
            max="1000"
            step="1"
            placeholder="0"
            
          />
          <p className={props.cnSetup}>
            
            Setup : <span className="italic">{dataOntime.koSu}</span>
            <span className="italic">{' '}menit</span>
          </p>
        </div>
        <div className="col-span-2 ml-4 mr-4">
          <label className={props.cnLabel}>Koreksi Dzuhur</label>
          <input
            type="number"
            name="koDz"
            value={formOntime.koDz}
            onChange={handleInputChange}
            className={props.cnInput}
            min="-1000"
            max="1000"
            step="1"
            placeholder="0"
            
          />
          <p className={props.cnSetup}>
            
            Setup : <span className="italic">{dataOntime.koDz}</span>
            <span className="italic">{' '}menit</span>
          </p>
        </div>
        <div className="col-span-2 ml-4 mr-4">
          <label className={props.cnLabel}>Koreksi Ashar</label>
          <input
            type="number"
            name="koAs"
            value={formOntime.koAs}
            onChange={handleInputChange}
            className={props.cnInput}
            min="-1000"
            max="1000"
            step="1"
            placeholder="0"
            
          />
          <p className={props.cnSetup}>
            
            Setup : <span className="italic">{dataOntime.koAs}</span>
            <span className="italic">{' '}menit</span>
          </p>
        </div>
        <div className="col-span-2 ml-4 mr-4">
          <label className={props.cnLabel}>Koreksi Maghrib</label>
          <input
            type="number"
            name="koMa"
            value={formOntime.koMa}
            onChange={handleInputChange}
            className={props.cnInput}
            min="-1000"
            max="1000"
            step="1"
            placeholder="0"
            
          />
          <p className={props.cnSetup}>
            
            Setup : <span className="italic">{dataOntime.koMa}</span>
            <span className="italic">{' '}menit</span>
          </p>
        </div>
        <div className="col-span-2 ml-4 mr-4">
          <label className={props.cnLabel}>Koreksi Hijriyah</label>
          <input
            type="number"
            name="koHj"
            value={formOntime.koHj}
            onChange={handleInputChange}
            className={props.cnInput}
            min="-10"
            max="10"
            step="1"
            placeholder="0"
            
          />
          <p className={props.cnSetup}>
            
            Setup : <span className="italic">{dataOntime.koHj}</span>
            <span className="italic">{' '}menit</span>
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
          className=" absolute left-[120px] px-6 py-2 mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
                        focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto text-center "
        >
          TUTUP
      </Link>
    </form>
  );
}
