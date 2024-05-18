import { ChangeEvent, FormEvent, useState } from "react";
import { fetchData, inputTable } from "../../lib/connect";
import { useDataContext } from "../../contexts/dataContexts";
import { Link } from "react-router-dom";

export default function FormJws(props: any) {
  const dataContext = useDataContext();

  const [formJws, setFormJws] = useState({
    dAdz: "",
    dSho: "",
    dKhu: "",
    dInf: "",
    dJel: "",
    iQis: "",
    iQsu: "",
    iQdz: "",
    iQas: "",
    iQma: ""
  });
  const [error, setError] = useState<String | null>(null);
  const [isloading, setIsLoading] = useState(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormJws({ ...formJws, [name]: value });
  }
  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormJws({ ...formJws, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  
    e.preventDefault();
    if (!formJws) {
      setError("Silahkan diisi form running text terlebih dahulu...");
      return;
    }
    setError(null);
    setIsLoading(true);
    
    try {
      let defJws = (await fetchData<Array<any>>("SELECT * FROM jws WHERE id=1"))[0];
      await inputTable(
        "UPDATE jws SET dAdz=?,dSho=?,dKhu=?,dInf=?,dJel=?,iQis=?,iQsu=?,iQdz=?,iQas=?,iQma=? WHERE id=1",
        [
          formJws.dAdz != '' ? formJws.dAdz : (defJws?.dAdz ?? ""),
          formJws.dSho != '' ? formJws.dSho : (defJws?.dSho ?? ""),
          formJws.dKhu != '' ? formJws.dKhu : (defJws?.dKhu ?? ""),
          formJws.dInf != '' ? formJws.dInf : (defJws?.dInf ?? ""),
          formJws.dJel != '' ? formJws.dJel : (defJws?.dJel ?? ""),
          formJws.iQis != '' ? formJws.iQis : (defJws?.iQis ?? ""),
          formJws.iQsu != '' ? formJws.iQsu : (defJws?.iQsu ?? ""),
          formJws.iQdz != '' ? formJws.iQdz : (defJws?.iQdz ?? ""),
          formJws.iQas != '' ? formJws.iQas : (defJws?.iQas ?? ""),
          formJws.iQma != '' ? formJws.iQma : (defJws?.iQma ?? "")
           ]
      );

      await dataContext.getData();
    } catch (error) {
      setError("Ada yang salah..Silahkan diulangi lagi");
    } finally {
      setIsLoading(false);
    }
    setFormJws({
      dAdz: "",
      dSho: "",
      dKhu: "",
      dInf: "",
      dJel: "",
      iQis: "",
      iQsu: "",
      iQdz: "",
      iQas: "",
      iQma: ""
    });  
  }

  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data)
    return <div className="Loading">Loading...</div>;

  const dataJws = dataContext.data?.jws;

  return (
    <form onSubmit={handleSubmit}>
      <div className="ml-2 mr-2 mb-4 grid grid-cols-12 gap-6">
        <p className=" mt-10 mb-4 col-span-12 text-center text-blue-700 text-3xl">
          SETTING JAM WAKTU SHOLAT
        </p>

        <p className=" mt-4 col-span-2 text-right text-blue-800 text-lg">
          DURASI MENUNGGU
        </p>

        <div className=" col-span-2 mr-4">
          <label className={props.cnLabel}>Durasi Adzan</label>
          <input
            type="number"
            name="dAdz"
            value={formJws.dAdz}
            onChange={handleInputChange}
            className={props.cnInput}
            min="0"
            max="60"
            step="1"
            placeholder="0"
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataJws.dAdz}</span>
          </p>
        </div>
        <div className=" col-span-2 mr-4">
          <label className={props.cnLabel}>Durasi Sholat</label>
          <input
            type="number"
            name="dSho"
            value={formJws.dSho}
            onChange={handleInputChange}
            className={props.cnInput}
            min="0"
            max="60"
            step="1"
            placeholder="0"
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataJws.dSho}</span>
          </p>
        </div>
        <div className=" col-span-2 mr-4">
          <label className={props.cnLabel}>Durasi Khutbah</label>
          <input
            type="number"
            name="dKhu"
            value={formJws.dKhu}
            onChange={handleInputChange}
            className={props.cnInput}
            min="0"
            max="60"
            step="1"
            placeholder="0"
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataJws.dKhu}</span>
          </p>
        </div>
        <div className=" col-span-2 mr-4">
          <label className={props.cnLabel}>Durasi Info</label>
          <input
            type="number"
            name="dInf"
            value={formJws.dInf}
            onChange={handleInputChange}
            className={props.cnInput}
            min="0"
            max="30"
            step="1"
            placeholder="0"
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataJws.dInf}</span>
          </p>
        </div>
        <div className=" col-span-2 mr-4">
          <label className={props.cnLabel}>Durasi Jelang</label>
          <input
            type="number"
            name="dJel"
            value={formJws.dJel}
            onChange={handleInputChange}
            className={props.cnInput}
            min="0"
            max="200"
            step="1"
            placeholder="0"
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataJws.dJel}</span>
          </p>
        </div>

        <p className=" mt-4 col-span-2 text-right text-blue-800 text-lg">
          WAKTU TUNGGU IQOMAT
        </p>

        <div className="col-span-2 mr-4">
          <label className={props.cnLabel}>Iqomat Isya</label>
          <input
            type="number"
            name="iQis"
            value={formJws.iQis}
            onChange={handleInputChange}
            className={props.cnInput}
            min="0"
            max="20"
            step="1"
            placeholder="0"
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataJws.iQis}</span>
          </p>
        </div>
        <div className="col-span-2 mr-4">
          <label className={props.cnLabel}>Iqomat Subuh</label>
          <input
            type="number"
            name="iQsu"
            value={formJws.iQsu}
            onChange={handleInputChange}
            className={props.cnInput}
            min="0"
            max="20"
            step="1"
            placeholder="0"
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataJws.iQsu}</span>
          </p>
        </div>
        <div className="col-span-2 mr-4">
          <label className={props.cnLabel}>Iqomat Dzuhur</label>
          <input
            type="number"
            name="iQdz"
            value={formJws.iQdz}
            onChange={handleInputChange}
            className={props.cnInput}
            min="0"
            max="20"
            step="1"
            placeholder="0"
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataJws.iQdz}</span>
          </p>
        </div>
        <div className="col-span-2 mr-4">
          <label className={props.cnLabel}>Iqomat Ashar</label>
          <input
            type="number"
            name="iQas"
            value={formJws.iQas}
            onChange={handleInputChange}
            className={props.cnInput}
            min="0"
            max="20"
            step="1"
            placeholder="0"
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataJws.iQas}</span>
          </p>
        </div>
        <div className="col-span-2 mr-4">
          <label className={props.cnLabel}>Iqomat Maghrib</label>
          <input
            type="number"
            name="iQma"
            value={formJws.iQma}
            onChange={handleInputChange}
            className={props.cnInput}
            min="0"
            max="20"
            step="1"
            placeholder="0"
          />
          <p className={props.cnSetup}>
            Setup : <span className="italic">{dataJws.iQma}</span>
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
