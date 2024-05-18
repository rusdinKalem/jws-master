import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchData, initializeDatabase } from "../lib/connect";

interface DefaultData {
  display: any;
  ontime: any;
  jws: any;
  info: any;
  masjid: any;
  media: any;
  runningText: any;
  slides: any;
  slideFile: any;
  audio: any;
}

interface ContextData {
  data: DefaultData | undefined;
  error: any;
  getData: () => Promise<void>;
}

function useProvideContext(): ContextData {
  const [data, setData] = useState<DefaultData>();
  const [error, setError] = useState();
  const getData = async () => {
    try {
      await initializeDatabase();
      const display = (
        await fetchData<Array<any>>("SELECT * FROM display WHERE id=1")
      )[0];
      const ontime = (
        await fetchData<Array<any>>("SELECT * FROM ontime WHERE id=1")
      )[0];
      const jws = (
        await fetchData<Array<any>>("SELECT * FROM jws WHERE id=1")
      )[0];
      const info = (
        await fetchData<Array<any>>("SELECT * FROM info WHERE id=1")
      )[0];
      const masjid = (
        await fetchData<Array<any>>("SELECT * FROM masjid WHERE id=1")
      )[0];
      const media = (
        await fetchData<Array<any>>("SELECT * FROM media WHERE id=1")
      )[0];
      const runningText = await fetchData<Array<any>>(
        "SELECT * FROM runningText"
      );
      const slides = await fetchData<Array<any>>("SELECT * FROM slides");
      const slideFile = await fetchData<Array<any>>("SELECT * FROM slideFile");
      const audio = (
        await fetchData<Array<any>>("SELECT * FROM audio WHERE id=1")
      )[0];

      setData({
        display,
        ontime,
        jws,
        info,
        masjid,
        media,
        runningText,
        slides,
        slideFile,
        audio,
      });
      setError(undefined);
    } catch (e: any) {
      setError(e);
    }
  };

  return { data, error, getData };
}

const DataContext = createContext({} as ContextData);

export const useDataContext = () => {
  return useContext(DataContext);
};

const ProvideContext: FC<{ children: React.ReactNode }> = ({ children }) => {
  const context: ContextData = useProvideContext();

  useEffect(() => {
    context.getData();
  }, []);

  return (
    <DataContext.Provider value={context}>
      {children}
    </DataContext.Provider>
  );
};

export default ProvideContext;
