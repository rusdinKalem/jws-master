import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { fetchData, inputTable } from "../../lib/connect";
import { saveImageFile, File } from "../../lib/upload";
import { useDataContext } from "../../contexts/dataContexts";
import { Link } from "react-router-dom";

type UploadFiles = {
  slideImg: File | undefined;
};
export default function FormSlideImage(props: any) {
  const dataContext = useDataContext();

  const slideImgRef = useRef<HTMLInputElement>(null);

  const [formText, setFormText] = useState({
    text: "",
    colorText: "",
    fontText: "",
    typeText: "",
  });
  const [formEditText, setFormEditText] = useState<{
    id: number | null | undefined;
    text: string | null | undefined;
    colorText: string | null | undefined;
    fontText: string | null | undefined;
    typeText: string | null | undefined;
  }>({
    id: null,
    text: "",
    colorText: "",
    fontText: "",
    typeText: "",
  });

  const [imageUrl, setImageUrl] = useState<UploadFiles>({
    slideImg: undefined,
  });

  const [error, setError] = useState<string | null>(null);
  const [isloading, setIsLoading] = useState(false);

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormText({ ...formText, [name]: value });
  }
  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormText({ ...formText, [name]: value });
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
    if (!formText) {
      setError("Silahkan diisi form text terlebih dahulu...");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      let slideImg = "";
      let defSlideFile = (
        await fetchData<Array<any>>("SELECT * FROM slideFile WHERE id=1")
      )[0];

      if (imageUrl.slideImg) {
        slideImg = await saveImageFile(imageUrl.slideImg);
      }
      // logoT != "" ? logoT : defMedia?.logoT ?? "",
      await inputTable(
        "INSERT INTO slideFile (text,slideImg,colorText,fontText,typeText) VALUES (?,?,?,?,?)",
        [
          formText.text != "" ? formText.text : defSlideFile?.text ?? "",
          slideImg !='' ? slideImg : defSlideFile?.slideImg ?? "",
          formText.colorText != ""
            ? formText.colorText
            : defSlideFile?.colorText ?? "",
          formText.fontText != ""
            ? formText.fontText
            : defSlideFile?.fontText ?? "",
          formText.typeText != ""
            ? formText.typeText
            : defSlideFile?.typeText ?? "",
        ]
      );
    } catch (error) {
      console.log(error);
      setError("Ada yang salah..Silahkan diulangi lagi");
    } finally {
      setIsLoading(false);
    }

    if (slideImgRef && slideImgRef.current) {
      slideImgRef.current.value = "";
    }
    await dataContext.getData();
    setFormText({
      text: "",
      colorText: "",
      fontText: "",
      typeText: "",
    });

    setImageUrl({ slideImg: undefined });
  }

  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;

  const dataFile = dataContext.data?.slideFile;

  async function deleteSlide(id: number) {
    await inputTable("DELETE FROM slideFile WHERE id=?", [id]);
    await dataContext.getData();
  }

  function editSlide(id: number) {
    setFormEditText({
      id: id,
      text: dataFile.find((text: any) => text.id === id)?.text ?? null,
      colorText:
        dataFile.find((colorText: any) => colorText.id === id)?.colorText ??
        null,
      fontText:
        dataFile.find((fontText: any) => fontText.id === id)?.fontText ?? null,
      typeText:
        dataFile.find((typeText: any) => typeText.id === id)?.typeText ?? null,
    });
  }

  async function saveEdit() {
    await inputTable(
      "UPDATE slideFile SET text=?,  colorText=?, fontText=?, typeText=?  WHERE id=?",
      [
        formEditText.text,
        formEditText.colorText,
        formEditText.fontText,
        formEditText.typeText,
        formEditText.id,
      ]
    );

    setFormEditText({
      id: null,
      text: null,
      colorText: null,
      fontText: null,
      typeText: null,
    });

    await dataContext.getData();
  }

  function handleEditInputChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormEditText({ ...formEditText, [name]: value });
  }

  function closeEdit() {
    setFormEditText({
      id: null,
      text: null,
      colorText: null,
      fontText: null,
      typeText: null,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="ml-4 mr-4 grid grid-cols-12 gap-6">
          <p className=" mt-10 mb-4 col-span-12 text-center text-blue-700 text-3xl">
            SETTING VIDEO & AUDIO
          </p>
          <div className="col-span-10">
            <label className={props.cnLabel}>Text Slide Image</label>
            <textarea
              onChange={handleInputChange}
              name="text"
              value={formText.text}
              className={props.cnTextArea}
              placeholder="Silahkan Ketikkan Text Kalimat untuk Slide Image"
            />
          </div>
          <div className="col-span-2 items-center ml-12">
            <button
              type="submit"
              className="mb-10 mt-9 px-5 py-1.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto 
            text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
            >
              {isloading ? "loadings..." : "TAMBAH"}
            </button>
          </div>

          <div className="col-span-3 ml-4 mr-4">
            <label className={props.cnLabel}>Slide Image</label>
            <input
              type="file"
              ref={slideImgRef}
              name="slideImg"
              onChange={handleImageChange}
              className={props.cnInput}
              placeholder="Pilih Slide Image"
            />
          </div>

          <div className="col-span-3">
            <label className={props.cnLabel}>Color Text</label>
            <select
              name="colorText"
              value={formText.colorText}
              onChange={handleSelectChange}
              className={props.cnSelect}
            >
              <option>Pilih Color Text...</option>
              <option>Putih</option>
              <option>Hitam</option>
              <option>Merah</option>
              <option>Hijau</option>
              <option>Kuning</option>
              <option>Ungu</option>
            </select>
          </div>
          <div className="col-span-3">
            <label className={props.cnLabel}>Font Text</label>
            <select
              name="fontText"
              value={formText.fontText}
              onChange={handleSelectChange}
              className={props.cnSelect}
            >
              <option>Pilih Color Text...</option>
              <option>Abel</option>
              <option>Bruno</option>
              <option>Vast</option>
              <option>Audio</option>
            </select>
          </div>

          <div className="col-span-3">
            <label className={props.cnLabel}>Type Text</label>
            <select
              name="typeText"
              value={formText.typeText}
              onChange={handleSelectChange}
              className={props.cnSelect}
            >
              <option>Pilih Type Text...</option>
              <option>L1</option>
              <option>L2</option>
              <option>L3</option>
              <option>R1</option>
              <option>R2</option>
              <option>R3</option>
              <option>C1</option>
              <option>C2</option>
              <option>C3</option>
            </select>
          </div>
        </div>
      </form>
      {error && <p className="text-red-500 mt 4">{error}</p>}

      {dataFile && (
        <table className=" min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="grid grid-cols-12 mr-10">
              <th className="col-span-5 px-3 py-3 text-center text-sm  text-blue-700 uppercase tracking-wider">
                TEXT
              </th>
              <th className="col-span-2 px-3 py-3 text-center text-sm  text-blue-700 uppercase tracking-wider">
                MEDIA SLIDE
              </th>
              <th className="col-span-1 px-3 py-3 text-center text-sm  text-blue-700 uppercase tracking-wider">
                COLOR TEXT
              </th>
              <th className="col-span-1 px-3 py-3 text-center text-sm  text-blue-700 uppercase tracking-wider">
                FONT TEXT
              </th>
              <th className="col-span-1 px-3 py-3 text-center text-sm  text-blue-700 uppercase tracking-wider">
                TYPE TEXT
              </th>
              <th className="col-span-2 px-3 py-3 text-center text-sm  text-blue-700 uppercase tracking-wider">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataFile.map((file: any) => {
              return (
                <tr key={file.id} className="grid grid-cols-12 mr-5">
                  <td
                    className="col-span-5 px-2 py-2 text-sm whitespace-wrap uppercase"
                    hidden={formEditText.id == file.id}
                  >
                    {file.text}
                  </td>
                  <td
                    className="col-span-5 px-2 py-2 text-sm whitespace-wrap uppercase"
                    hidden={formEditText.id != file.id}
                  >
                    <textarea
                      className="w-full h-10"
                      name={"text"}
                      id={"text" + file.id}
                      value={formEditText.text ?? ""}
                      onChange={handleEditInputChange}
                    />
                  </td>

                  <td className="col-span-2 px-2 py-2 text-sm whitespace-wrap">
                    {file.slideImg}
                  </td>

                  <td
                    className="col-span-1 px-2 py-2 text-sm whitespace-wrap"
                    hidden={formEditText.id == file.id}
                  >
                    {file.colorText}
                  </td>
                  <td
                    className="col-span-1 px-2 py-2 text-sm whitespace-wrap uppercase"
                    hidden={formEditText.id != file.id}
                  >
                    <textarea
                      className="w-full h-10"
                      name={"colorText"}
                      id={"colorText" + file.id}
                      value={formEditText.colorText ?? ""}
                      onChange={handleEditInputChange}
                    />
                  </td>

                  <td
                    className="col-span-1 px-2 py-2 text-sm whitespace-wrap"
                    hidden={formEditText.id == file.id}
                  >
                    {file.fontText}
                  </td>
                  <td
                    className="col-span-1 px-2 py-2 text-sm whitespace-wrap uppercase"
                    hidden={formEditText.id != file.id}
                  >
                    <textarea
                      className="w-full h-10"
                      name={"fontText"}
                      id={"fontText" + file.id}
                      value={formEditText.fontText ?? ""}
                      onChange={handleEditInputChange}
                    />
                  </td>

                  <td
                    className="col-span-1 px-2 py-2 text-sm whitespace-wrap"
                    hidden={formEditText.id == file.id}
                  >
                    {file.typeText}
                  </td>
                  <td
                    className="col-span-1 px-2 py-2 text-sm whitespace-wrap uppercase"
                    hidden={formEditText.id != file.id}
                  >
                    <textarea
                      className="w-full h-10"
                      name={"typeText"}
                      id={"typeText" + file.id}
                      value={formEditText.typeText ?? ""}
                      onChange={handleEditInputChange}
                    />
                  </td>

                  <td
                    className="col-span-2 px-2 py-2 whitespace-wrap"
                    hidden={formEditText.id != file.id}
                  >
                    <button
                      onClick={saveEdit}
                      className=" mr-1 my-2 px-6 py-1 text-sm text-white bg-green-600 rounded-full hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                    >
                      SAVE
                    </button>
                    <button
                      onClick={closeEdit}
                      className=" mr-1 my-2 px-4 py-1 text-sm text-white bg-red-600 rounded-full hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                    >
                      CLOSE
                    </button>
                  </td>
                  <td
                    className="col-span-2 px-2 py-2 whitespace-wrap"
                    hidden={formEditText.id == file.id}
                  >
                    <button
                      onClick={() => editSlide(file.id)}
                      className=" mr-1 my-2 px-6 py-1 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                    >
                      EDIT
                    </button>

                    <button
                      onClick={() => deleteSlide(file.id)}
                      className="ml-1 my-2 px-4 py-1 text-sm text-white bg-red-600 rounded-full hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                    >
                      HAPUS
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Link
        to={"/"}
        className=" absolute px-6 py-2 mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
                        focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto text-center "
      >
        TUTUP
      </Link>
    </>
  );
}
