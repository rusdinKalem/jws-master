import { ChangeEvent, FormEvent, useState } from "react";
import { fetchData, inputTable } from "../../lib/connect";
import { useDataContext } from "../../contexts/dataContexts";
import { Link } from "react-router-dom";

export default function FormDisp(props: any) {
  const dataContext = useDataContext();

  const [formDisp, setFormDisp] = useState({
    theme: "",
    themeWarna: "",
    typeSlide: "",
    styleTxt: "",
    styleImg: "",
    sizeJws: "",
    spSlideJws: "",
    spSlideTxt: "",
    spSlideImg: "",
    spInfo: "",
    spRuntext: ""
  });
  const [error, setError] = useState<String | null>(null);
  const [isloading, setIsLoading] = useState(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormDisp({ ...formDisp, [name]: value });
  }
  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormDisp({ ...formDisp, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formDisp) {
      setError("Silahkan diisi form running text terlebih dahulu...");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      let defDisp = (
        await fetchData<Array<any>>("SELECT * FROM display WHERE id=1")
      )[0];

      await inputTable(
        "UPDATE display SET theme=?,themeWarna=?,typeSlide=?,styleTxt=?,styleImg=?,sizeJws=?,spSlideJws=?,spSlideTxt=?,spSlideImg=?,spInfo=?,spRunText=? WHERE id=1",
        [
          formDisp.theme != "" ? formDisp.theme : defDisp?.theme ?? "",
          formDisp.themeWarna != ""
            ? formDisp.themeWarna
            : defDisp?.themeWarna ?? "",
          formDisp.typeSlide != ""
            ? formDisp.typeSlide
            : defDisp?.typeSlide ?? "",
          formDisp.styleTxt != ""
            ? formDisp.styleTxt
            : defDisp?.styleTxt ?? "",
          formDisp.styleImg != ""
            ? formDisp.styleImg
            : defDisp?.styleImg ?? "",
          formDisp.sizeJws != "" ? formDisp.sizeJws : defDisp?.sizeJws ?? "",
          formDisp.spSlideJws != "" ? formDisp.spSlideJws : defDisp?.spSlideJws ?? "",
          formDisp.spSlideTxt != "" ? formDisp.spSlideTxt : defDisp?.spSlideTxt ?? "",
          formDisp.spSlideImg != "" ? formDisp.spSlideImg : defDisp?.spSlideImg ?? "",
          formDisp.spInfo != "" ? formDisp.spInfo : defDisp?.spInfo ?? "",
          formDisp.spRuntext != "" ? formDisp.spRuntext : defDisp?.spRuntext ?? ""
        ]
      );
    } catch (error) {
      setError("Ada yang salah..Silahkan diulangi lagi");
    } finally {
      setIsLoading(false);
    }
    await dataContext.getData();
    setFormDisp({
      theme: "",
      themeWarna: "",
      typeSlide: "",
      styleTxt: "",
      styleImg: "",
      sizeJws: "",
      spSlideJws: "",
      spSlideTxt: "",
      spSlideImg: "",
      spInfo: "",
      spRuntext: ""
    });
  }

  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;

  const dataDisp = dataContext.data?.display;

  let typeS = () => {
    if (dataDisp.typeSlide === "Satu") {
      return "Slide Text";
    } else {
      return "Slide Image";
    }
  };
  let styleTxt = () => {
    if (dataDisp.styleTxt === "fade") {
      return "Style Fade";
    } else {
      return "Style Zoom";
    }
  };
  let styleImg = () => {
    if (dataDisp.styleImg === "fade") {
      return "Style Fade";
    } else {
      return "Style Zoom";
    }
  };

  const isLoad =
    "absolute left-[140px] px-6 py-2 mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto text-center";
  const noLoad =
    "absolute left-[120px] px-6 py-2 mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto text-center";

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="ml-4 mr-4 grid grid-cols-12 gap-6">
          <p className=" mt-10 mb-4 col-span-12 text-center text-blue-700 text-3xl">
            SETTING DISPLAY LAYAR
          </p>

          <div className=" col-span-2 ">
            <label className={props.cnLabel}>Theme</label>
            <select
              name="theme"
              value={formDisp.theme}
              onChange={handleSelectChange}
              className={props.cnSelect}
            >
              <option>Pilih Theme...</option>
              <option>Satu</option>
              <option>Dua</option>
              <option>Tiga</option>
              <option>Empat</option>
            </select>
            <p className={props.cnSetup}>
              Setup : <span className="italic">{dataDisp.theme}</span>
            </p>
          </div>
          <div className=" col-span-2 ">
            <label className={props.cnLabel}>Theme Warna</label>
            <select
              name="themeWarna"
              value={formDisp.themeWarna}
              onChange={handleSelectChange}
              className={props.cnSelect}
            >
              <option>Pilih Theme Warna...</option>
              <option>Satu</option>
              <option>Dua</option>
              <option>Tiga</option>
              <option>Empat</option>
            </select>
            <p className={props.cnSetup}>
              Setup : <span className="italic">{dataDisp.themeWarna}</span>
            </p>
          </div>
          <div className=" col-span-2 ">
            <label className={props.cnLabel}>Type Slide</label>
            <select
              name="typeSlide"
              value={formDisp.typeSlide}
              onChange={handleSelectChange}
              className={props.cnSelect}
            >
              <option>Pilih Type Slide...</option>
              <option value={"Satu"}>Slide Text</option>
              <option value={"Dua"}>Slide Image</option>
            </select>
            <p className={props.cnSetup}>
              Setup : <span className="italic">{typeS()}</span>
            </p>
          </div>
          <div className=" col-span-2 ">
            <label className={props.cnLabel}>Style Slide Text</label>
            <select
              name="styleTxt"
              value={formDisp.styleTxt}
              onChange={handleSelectChange}
              className={props.cnSelect}
            >
              <option>Pilih Style...</option>
              <option value={"fade"}>Fade</option>
              <option value={"zoom"}>Zoom</option>
            </select>
            <p className={props.cnSetup}>
              Setup : <span className="italic">{styleTxt()}</span>
            </p>
          </div>
          <div className=" col-span-2 ">
            <label className={props.cnLabel}>Style Slide Image</label>
            <select
              name="styleImg"
              value={formDisp.styleImg}
              onChange={handleSelectChange}
              className={props.cnSelect}
            >
              <option>Pilih Style...</option>
              <option disabled value={"fade"}>Fade</option>
              <option value={"zoom"}>Zoom</option>
            </select>
            <p className={props.cnSetup}>
              Setup : <span className="italic">{styleImg()}</span>
            </p>
          </div>
          <div className=" col-span-2 ">
            <label className={props.cnLabel}>Ukuran Waktu Sholat</label>
            <select
              name="sizeJws"
              value={formDisp.sizeJws}
              onChange={handleSelectChange}
              className={props.cnSelect}
            >
              <option>Pilih Ukuran Waktu Sholat...</option>
              <option value={"Satu"}>Kecil</option>
              <option disabled value={"Dua"}>
                Besar
              </option>
            </select>
            <p className={props.cnSetup}>
              Setup :{" "}
              <span className="italic">
                {dataDisp.sizeJws === "Satu" ? "Kecil" : "Besar"}
              </span>
            </p>
          </div>  

          <p className=" mt-10 mb-4 col-span-12 text-center text-blue-700 text-3xl">
            SETTING SPEED SLIDE DAN RUNNING TEXT
          </p>

          <div className="col-span-2">
          <label className={props.cnLabel}>Speed Slide JWS</label>
          <input
            value={formDisp.spSlideJws}
            name="spSlideJws"
            onChange={handleInputChange}
            className={props.cnInput}
            type="number"
            min="0"
            max="60"
            step="1"
            placeholder="0"
          />
          <p className={props.cnSetup}>
            {" "}
            Setup : <span className="italic">{dataDisp.spSlideJws}</span>
          </p>
          </div>
          <div className="col-span-2">
            <label className={props.cnLabel}>Speed Slide Text</label>
            <input
              value={formDisp.spSlideTxt}
              name="spSlideTxt"
              onChange={handleInputChange}
              className={props.cnInput}
              type="number"
              min="0"
              max="60"
              step="1"
              placeholder="0"
            />
            <p className={props.cnSetup}>
              {" "}
              Setup : <span className="italic">{dataDisp.spSlideTxt}</span>
            </p>
          </div>
          <div className="col-span-2">
            <label className={props.cnLabel}>Speed Slide Image</label>
            <input
              value={formDisp.spSlideImg}
              name="spSlideImg"
              onChange={handleInputChange}
              className={props.cnInput}
              type="number"
              min="0"
              max="60"
              step="1"
              placeholder="0"
            />
            <p className={props.cnSetup}>
              {" "}
              Setup : <span className="italic">{dataDisp.spSlideImg}</span>
            </p>
          </div>
          <div className="col-span-2">
            <label className={props.cnLabel}>Speed Info</label>
            <input
              value={formDisp.spInfo}
              name="spInfo"
              onChange={handleInputChange}
              className={props.cnInput}
              type="number"
              min="0"
              max="60"
              step="1"
              placeholder="0"
            />
            <p className={props.cnSetup}>
              {" "}
              Setup : <span className="italic">{dataDisp.spInfo}</span>
            </p>
          </div>
          <div className="col-span-2">
            <label className={props.cnLabel}>Speed Running Text</label>
            <input
              value={formDisp.spRuntext}
              name="spRuntext"
              onChange={handleInputChange}
              className={props.cnInput}
              type="number"
              min="0"
              max="500"
              step="10"
              placeholder="0"
            />
            <p className={props.cnSetup}>
              {" "}
              Setup : <span className="italic">{dataDisp.spRuntext}</span>
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
        <Link to={"/"} className={isloading ? isLoad : noLoad}>
          TUTUP
        </Link>
      </form>
    </>
  );
}
