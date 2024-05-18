import { ChangeEvent, FormEvent, useState } from "react";
import { inputTable } from "../../lib/connect";
import { useDataContext } from "../../contexts/dataContexts";
import { Link } from "react-router-dom";

export default function FormSlideText(props: any) {
  const dataContext = useDataContext();
  const [formSlide, setFormSlide] = useState({
    arabText: "",
    translateText: "",
    sumberText: "",
  });
  const [formEditSlide, setFormEditSlide] = useState<{
    id: number | null | undefined;
    arabText: string | null | undefined;
    translateText: string | null | undefined;
    sumberText: string | null | undefined;
  }>({ id: null, arabText: "", translateText: "", sumberText: "" });

  const [error, setError] = useState<String | null>(null);
  const [isloading, setIsLoading] = useState(false);

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormSlide({ ...formSlide, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formSlide.arabText || !formSlide.translateText) {
      setError("Silahkan diisi form running text terlebih dahulu...");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await inputTable(
        "INSERT INTO slides (arabText, translateText, sumberText) VALUES (?,?,?)",
        [formSlide.arabText, formSlide.translateText, formSlide.sumberText]
      );

      await dataContext.getData();
    } catch (error) {
      setError("Ada yang salah..Silahkan diulangi lagi");
    } finally {
      setIsLoading(false);
    }
    setFormSlide({ arabText: "", translateText: "", sumberText: "" });
  }

  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;

  const dataSlides = dataContext.data?.slides;

  async function deleteSlide(id: number) {
    await inputTable("DELETE FROM slides WHERE id=?", [id]);
    await dataContext.getData();
  }

  function editSlide(id: number) {
    setFormEditSlide({
      id: id,
      arabText:
        dataSlides.find((arabText: any) => arabText.id === id)?.arabText ?? null,
      translateText:
        dataSlides.find((translateText: any) => translateText.id === id)
          ?.translateText ?? null,
      sumberText:
        dataSlides.find((sumberText: any) => sumberText.id === id)?.sumberText ??
        null,
    });
  }

  async function saveEdit() {
    await inputTable(
      "UPDATE slides SET arabText=?, translateText=?, sumberText=? WHERE id=?",
      [
        formEditSlide.arabText,
        formEditSlide.translateText,
        formEditSlide.sumberText,
        formEditSlide.id,
      ]
    );

    setFormEditSlide({
      id: null,
      arabText: null,
      translateText: null,
      sumberText: null,
    });

    await dataContext.getData();
  }

  function handleEditInputChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormEditSlide({ ...formEditSlide, [name]: value });
  }

  function closeEdit() {
    setFormEditSlide({
      id: null,
      arabText: null,
      translateText: null,
      sumberText: null,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="ml-4 mr-4 grid grid-cols-12">
          <p className=" mt-10 mb-4 col-span-12 text-center text-blue-700 text-3xl">
            SETTING SLIDE
          </p>

          <div className="col-span-12">
            <label className={props.cnLabel}>ARABIC</label>
            <textarea
              name="arabText"
              value={formSlide.arabText}
              onChange={handleInputChange}
              className={props.cnTextArea}
              placeholder="Silahkan Ketikkan Kalimat untuk Arabic Font"
              required
            />
          </div>
          <div className="col-span-12">
            <label className={props.cnLabel}>TERJEMAHAN</label>
            <textarea
              name="translateText"
              value={formSlide.translateText}
              onChange={handleInputChange}
              className={props.cnTextArea}
              placeholder="Silahkan Ketikkan Kalimat Terjemahannya"
              required
            />
          </div>
          <div className="col-span-6">
            <label className={props.cnLabel}>SUMBER</label>
            <textarea
              name="sumberText"
              value={formSlide.sumberText}
              onChange={handleInputChange}
              className={props.cnTextArea}
              placeholder="Silahkan Ketikkan Kalimat Terjemahannya"
              required
            />
          </div>
          <div className="col-span-6 items-center ml-12">
            <button
              type="submit"
              className="mb-10 mt-9 px-5 py-1.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto 
            text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
            >
              TAMBAH
            </button>
          </div>
        </div>
      </form>
      {error && <p className="text-red-500 mt 4">{error}</p>}

      {dataSlides && (
        <table className=" min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="grid grid-cols-12 mr-10">
              <th className="col-span-4 px-3 py-3 text-center text-sm  text-blue-700 uppercase tracking-wider">
                ARABIC
              </th>
              <th className="col-span-4 px-3 py-3 text-center text-sm  text-blue-700 uppercase tracking-wider">
                TERJEMAHAN
              </th>
              <th className="col-span-2 px-3 py-3 text-center text-sm  text-blue-700 uppercase tracking-wider">
                SUMBER
              </th>
              <th className="col-span-2 px-3 py-3 text-center text-sm  text-blue-700 uppercase tracking-wider">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataSlides.map((dataSlide: any) => {
              return (
                <tr key={dataSlide.id} className="grid grid-cols-12 mr-5">
                  
                  <td className="col-span-4 px-2 py-2 text-sm whitespace-wrap uppercase"
                    hidden={formEditSlide.id == dataSlide.id}
                  >
                    {dataSlide.arabText}
                  </td>
                  <td
                    className="col-span-4 px-2 py-2 text-sm whitespace-wrap uppercase"
                    hidden={formEditSlide.id != dataSlide.id}
                  >
                    <textarea
                      className="w-full h-10"
                      name={"arabText"}
                      id={"arabText" + dataSlide.id}
                      value={formEditSlide.arabText ?? ""}
                      onChange={handleEditInputChange}
                    />
                  </td>
                  
                  <td className="col-span-4 px-2 py-2 text-sm whitespace-wrap uppercase"
                    hidden={formEditSlide.id == dataSlide.id}
                  >
                    {dataSlide.translateText}
                  </td>
                  <td
                    className="col-span-4 px-2 py-2 text-sm whitespace-wrap uppercase"
                    hidden={formEditSlide.id != dataSlide.id}
                  >
                    <textarea
                      className="w-full h-10"
                      name={"translateText"}
                      id={"translateText" + dataSlide.id}
                      value={formEditSlide.translateText ?? ""}
                      onChange={handleEditInputChange}
                    />
                  </td>
                  
                  <td className="col-span-2 px-2 py-2 text-sm whitespace-wrap uppercase"
                    hidden={formEditSlide.id == dataSlide.id}
                  >
                    {dataSlide.sumberText}
                  </td>
                  <td
                    className="col-span-2 px-2 py-2 text-sm whitespace-wrap uppercase"
                    hidden={formEditSlide.id != dataSlide.id}
                  >
                    <textarea
                      className="w-full h-10"
                      name={"sumberText"}
                      id={"sumberText" + dataSlide.id}
                      value={formEditSlide.sumberText ?? ""}
                      onChange={handleEditInputChange}
                    />
                  </td>
                  
                  <td
                    className="col-span-2 px-2 py-2 whitespace-wrap"
                    hidden={formEditSlide.id != dataSlide.id}
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
                    hidden={formEditSlide.id == dataSlide.id}
                  >
                    <button
                      onClick={() => editSlide(dataSlide.id)}
                      className=" mr-1 my-2 px-6 py-1 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                    >
                      EDIT
                    </button>

                    <button
                      onClick={() => deleteSlide(dataSlide.id)}
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
      <Link to={"/"}
          className=" absolute px-6 py-2 mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
                        focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto text-center "
        >
          TUTUP
      </Link>
    </>
  );
}
