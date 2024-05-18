import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchData, inputTable } from "../../lib/connect";
import { useDataContext } from "../../contexts/dataContexts";
import { Link } from "react-router-dom";

export default function FormInfo(props: any) {
  const dataContext = useDataContext();
  const [formInfo, setFormInfo] = useState({
    khotib: "",
    imam: "",
    muadzin: "",
    saldoAwal: "",
    plus: "",
    minus: "",
    saldoAkhir: "",
  });
  const [error, setError] = useState<String | null>(null);
  const [isloading, setIsLoading] = useState(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormInfo({ ...formInfo, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formInfo) {
      setError("Silahkan diisi form running text terlebih dahulu...");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      let defInfo = (
        await fetchData<Array<any>>("SELECT * FROM info WHERE id=1")
      )[0];
      await inputTable(
        "UPDATE info SET khotib=?,imam=?,muadzin=?,saldoAwal=?,plus=?,minus=?,saldoAkhir=? WHERE id=1",
        [
          formInfo.khotib != "" ? formInfo.khotib : defInfo?.khotib ?? "",
          formInfo.imam != "" ? formInfo.imam : defInfo?.imam ?? "",
          formInfo.muadzin != "" ? formInfo.muadzin : defInfo?.muadzin ?? "",
          formInfo.saldoAwal != ""
            ? formInfo.saldoAwal
            : defInfo?.saldoAwal ?? "",
          formInfo.plus != "" ? formInfo.plus : defInfo?.plus ?? "",
          formInfo.minus != "" ? formInfo.minus : defInfo?.minus ?? "",
          formInfo.saldoAkhir != ""
            ? formInfo.saldoAkhir
            : defInfo?.saldoAkhir ?? "",
        ]
      );

      setIsLoading(false);
      await dataContext.getData();
    } catch (error) {
      setError("Ada yang salah..Silahkan diulangi lagi");
    } finally {
      setIsLoading(false);
    }
    // setDataInfo(data);
    setFormInfo({
      khotib: "",
      imam: "",
      muadzin: "",
      saldoAwal: "",
      plus: "",
      minus: "",
      saldoAkhir: "",
    });
  }

  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;

  const dataInfo = dataContext.data?.info;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="ml-4 mr-4 grid grid-cols-12 gap-6">
          <p className=" mt-10 mb-4 col-span-12 text-center text-blue-700 text-3xl">
            SETTING PETUGAS JUMAT
          </p>

          <div className="col-span-4 ">
            <label className={props.cnLabel}>Khotib</label>
            <input
              value={formInfo.khotib}
              name="khotib"
              onChange={handleInputChange}
              className={props.cnInput}
              type="text"
              placeholder="Input nama Khotib"
            />
            <p className={props.cnSetup}>
              Setup : <span className="italic">{dataInfo.khotib}</span>
            </p>
          </div>

          <div className="col-span-4 ">
            <label className={props.cnLabel}>Imam</label>
            <input
              value={formInfo.imam}
              name="imam"
              onChange={handleInputChange}
              className={props.cnInput}
              type="text"
              placeholder="Input nama Imam"
            />
            <p className={props.cnSetup}>
              Setup : <span className="italic">{dataInfo.imam}</span>
            </p>
          </div>

          <div className="col-span-4 ">
            <label className={props.cnLabel}>Muadzin</label>
            <input
              value={formInfo.muadzin}
              name="muadzin"
              onChange={handleInputChange}
              className={props.cnInput}
              type="text"
              placeholder="Input nama Muadzin"
            />
            <p className={props.cnSetup}>
              Setup : <span className="italic">{dataInfo.muadzin}</span>
            </p>
          </div>

          <p className=" mt-10 mb-4 col-span-12 text-center text-blue-700 text-3xl">
            SETTING LAPORAN KAS
          </p>

          <div className="col-span-3 ">
            <label className={props.cnLabel}>Saldo Awal</label>
            <input
              value={formInfo.saldoAwal}
              name="saldoAwal"
              onChange={handleInputChange}
              className={props.cnInput}
              type="text"
              placeholder="input Saldo Awal"
            />
            <p className={props.cnSetup}>
              Setup : <span className="italic">{dataInfo.saldoAwal}</span>
            </p>
          </div>

          <div className="col-span-3 ">
            <label className={props.cnLabel}>Pemasukan</label>
            <input
              value={formInfo.plus}
              name="plus"
              onChange={handleInputChange}
              className={props.cnInput}
              type="text"
              placeholder="Input Pemasukan"
            />
            <p className={props.cnSetup}>
              Setup : <span className="italic">{dataInfo.plus}</span>
            </p>
          </div>

          <div className="col-span-3 ">
            <label className={props.cnLabel}>Pengeluaran</label>
            <input
              value={formInfo.minus}
              name="minus"
              onChange={handleInputChange}
              className={props.cnInput}
              type="text"
              placeholder="Input Pengeluaran"
            />
            <p className={props.cnSetup}>
              Setup : <span className="italic">{dataInfo.minus}</span>
            </p>
          </div>

          <div className="col-span-3 ">
            <label className={props.cnLabel}>Saldo Akhir</label>
            <input
              value={formInfo.saldoAkhir}
              name="saldoAkhir"
              onChange={handleInputChange}
              className={props.cnInput}
              type="text"
              placeholder="Input Saldo Akhir"
            />
            <p className={props.cnSetup}>
              Setup : <span className="italic">{dataInfo.saldoAkhir}</span>
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
    </>
  );
}
