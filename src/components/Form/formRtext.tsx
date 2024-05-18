import { ChangeEvent, FormEvent, useState } from "react";
import { inputTable } from "../../lib/connect";
import { useDataContext } from "../../contexts/dataContexts";
import { Link } from "react-router-dom";

export default function FormRtext(props:any) {
  const dataContext = useDataContext();

  const [formRunText, setFormRunText] = useState({ runText: "" });
  const [formEditRunText, setFormEditRunText] = useState<{
    id: number | null | undefined;
    runText: string | null | undefined;
  }>({ id: null, runText: "" });

  const [error, setError] = useState<String | null>(null);
  const [isloading, setIsLoading] = useState(false);

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormRunText({ ...formRunText, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRunText.runText) {
      setError("Silahkan diisi form running text terlebih dahulu...");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await inputTable("INSERT INTO runningText (runText) VALUES (?)", [
        formRunText.runText,
      ]);

      await dataContext.getData();
    } catch (error) {
      setError("Ada yang salah..Silahkan diulangi lagi");
    } finally {
      setIsLoading(false);
    }
    setFormRunText({ runText: "" });
  }

  async function deleteRunText(id: number) {
    await inputTable("DELETE FROM runningText WHERE id=?", [id]);
    await dataContext.getData();
  }

  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;

  const dataRunTexts = dataContext.data?.runningText;

  function editRunText(id: number) {
    setFormEditRunText({
      id: id,
      runText:
        dataRunTexts.find((runText: any) => runText.id === id)?.runText ?? null,
    });
  }

  async function saveEdit() {
    await inputTable("UPDATE runningText SET runText=? WHERE id=?", [
      formEditRunText.runText,
      formEditRunText.id,
    ]);

    setFormEditRunText({ id: null, runText: null });
    await dataContext.getData();
  }

  function handleEditInputChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    let name = e.target.name;
    let value = e.target.value;
    setFormEditRunText({ ...formEditRunText, [name]: value });
  }

  function closeEdit() {
    setFormEditRunText({ id: null, runText: null });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-6">
          <p className="mt-10 mb-4 col-span-12 text-center text-blue-700 text-3xl">
            SETTING RUNNING TEXT
          </p>
          <div className="col-span-10 ml-4 mr-5">
            <label className={props.cnLabel}>
              INPUT RUNNING TEXT
            </label>
            <textarea
              onChange={handleInputChange}
              name="runText"
              value={formRunText.runText}
              className={props.cnTextArea}
              placeholder="Silahkan Ketikkan Kalimat untuk Running Text, Lalu klik tompol Tambah di sebelah kanan"
              required
            />
          </div>
          <div className="col-span-1 right-5">
            <button
              type="submit"
              className="mb-10 mt-9 px-10 text-white bg-blue-600 hover:bg-blue-900 focus:ring-4 focus:outline-none 
                focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto 
                px-5 py-1.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-900 "
            >
              {isloading ? "loadings..." : "TAMBAH"}
            </button>
          </div>
        </div>
      </form>
      {error && <p className="text-red-500 mt 4">{error}</p>}

      {dataRunTexts && (
        <table className=" min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="grid grid-cols-12 mr-10">
              <th className="col-span-10 px-3 py-3 text-center text-sm  text-gray-500 tracking-wider">
                RUNNING TEXT
              </th>
              <th className="col-span-2 px-3 py-3 text-center text-sm  text-gray-500 tracking-wider">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataRunTexts.map((dataRunText: any) => {
              return (
                <tr key={dataRunText.id} className="grid grid-cols-12 mr-10">
                  <td
                    className="col-span-10 px-2 py-2 text-sm whitespace-wrap uppercase"
                    hidden={formEditRunText.id == dataRunText.id}
                  >
                    {dataRunText.runText}
                  </td>
                  <td
                    className="col-span-10 px-2 py-2 text-sm whitespace-wrap uppercase"
                    hidden={formEditRunText.id != dataRunText.id}
                  >
                    <textarea
                      className="w-full h-10"
                      name={"runText"}
                      id={"runText" + dataRunText.id}
                      value={formEditRunText.runText ?? ""}
                      onChange={handleEditInputChange}
                    />
                  </td>

                  <td
                    className="col-span-2 px-2 py-2 whitespace-wrap"
                    hidden={formEditRunText.id != dataRunText.id}
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
                    hidden={formEditRunText.id == dataRunText.id}
                  >
                    <button
                      onClick={() => editRunText(dataRunText.id)}
                      className=" mr-1 my-2 px-6 py-1 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                    >
                      EDIT
                    </button>

                    <button
                      onClick={() => deleteRunText(dataRunText.id)}
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
