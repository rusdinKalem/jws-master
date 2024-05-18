import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDataContext } from "./dataContexts";
import { clsx } from 'clsx';

interface DefaultData {
  tBrandType: any;
  tBrandNama: any;
  tBrandAlamat: any;
  tMoment1: any;
  tMoment2: any;
  bgMoment: any;
  tRuntext: any;
  bgRuntext: any;
  tTanggalH: any;
  tTanggalM: any;
  bgTanggalH: any;
  bgTanggalM: any;
  tJamMnt: any;
  tJamDtk: any;
  tSlideAr: any;
  tSlideTr: any;
  tSlideSu: any;
  bgSlideAr: any;
  bgSlideTr: any;
  tJwsSo: any;
  bgJwsSo: any;
  tJwsWa: any;
  bgJwsWa: any;
}

interface ColorsContextData {
  colorsData: DefaultData | undefined;
  error: any;
  getData: () => Promise<void>;
}

function useProvideColorsContext(display: any): ColorsContextData {

  const [colorsData, setColorsData] = useState<DefaultData>();
  const [error, setError] = useState();
  const getData = async () => {
    try {
      if (display == null) {
        setColorsData(undefined);
        return;
      }
      const themeWarna = display.themeWarna;
      const theme = display.theme;

      const tBrandType = clsx({
        "text-white": themeWarna === 'Satu',
        "text-slate-50": themeWarna === 'Dua',
        "text-amber-400": themeWarna === 'Tiga',
        "text-red-200": themeWarna === 'Empat', 
      })

      const tBrandNama = clsx({
        "text-yellow-300": themeWarna === 'Satu',
        "text-yellow-200": themeWarna === 'Dua',
        "text-indigo-500": themeWarna === 'Tiga',
        "text-blue-500": themeWarna === 'Empat', 
      })

      const tBrandAlamat = clsx({
        "text-slate-300": themeWarna === 'Satu',
        "text-green-600": themeWarna === 'Dua',
        "text-slate-50": themeWarna === 'Tiga',
        "text-yellow-300": themeWarna === 'Empat', 
      })
      const tMoment1 = clsx({
        "text-white": themeWarna === 'Satu',
        "text-slate-50": themeWarna === 'Dua' || themeWarna === 'Tiga',
        "text-yellow-300": themeWarna === 'Empat', 
      })
      
      const tMoment2 = clsx({
        "text-blue-700": themeWarna === 'Satu',
        "text-slate-200": themeWarna === 'Dua',
        "text-indigo-500": themeWarna === 'Tiga',
        "text-yellow-300": themeWarna === 'Empat', 
      })
      
      const bgMoment = clsx({
        "bg-yellow-500": themeWarna === 'Satu',
        "bg-orange-500": themeWarna === 'Dua',
        "bg-amber-400": themeWarna === 'Tiga',
        "bg-fuchsia-900": themeWarna === 'Empat', 
      })
      

      const tRuntext = clsx({
        "text-white": themeWarna === 'Satu' , 
        "text-slate-50": themeWarna === 'Dua',
        "text-indigo-700": themeWarna === 'Tiga',
        "text-yellow-300": themeWarna === 'Empat', 
      })

      const bgRuntext = clsx({
        "bg-slate-900": themeWarna === 'Satu',
        "bg-green-600": themeWarna === 'Dua',
        "bg-amber-400": themeWarna === 'Tiga',
        "bg-purple-950": themeWarna === 'Empat', 
      })

      const tTanggalH = clsx({ 
        "text-yellow-500": themeWarna === 'Satu',
        "text-slate-50": themeWarna === 'Dua',
        "text-indigo-700": themeWarna === 'Tiga', 
        "text-slate-100": themeWarna === 'Empat',
      })

      const bgTanggalH = clsx({
        "bg-blue-700": themeWarna === 'Satu' && (theme==='Tiga' || theme === 'Empat'),
        "bg-green-600": themeWarna === 'Dua' && (theme==='Tiga' || theme === 'Empat'),
        "bg-amber-400": themeWarna === 'Tiga' && (theme==='Tiga' || theme === 'Empat'),
        "bg-red-400": themeWarna === 'Empat' && (theme==='Tiga' || theme === 'Empat'), 
      })

      const tTanggalM = clsx({
        "text-blue-700": themeWarna === 'Satu',
        "text-orange-500": themeWarna === 'Dua',
        "text-slate-50": themeWarna === 'Tiga',
        "text-slate-100": themeWarna === 'Empat', 
      })

      const bgTanggalM = clsx({
        "bg-yellow-500": themeWarna === 'Satu' && (theme==='Tiga' || theme === 'Empat'),
        "bg-yellow-200": themeWarna === 'Dua' && (theme==='Tiga' || theme === 'Empat'),
        "bg-indigo-500": themeWarna === 'Tiga' && (theme==='Tiga' || theme === 'Empat'), 
        "bg-fuchsia-900": themeWarna === 'Empat' && (theme==='Tiga' || theme === 'Empat'),
      })

      const tJamMnt = clsx({
        "text-red-700": themeWarna === 'Satu',
        "text-rose-500": themeWarna === 'Dua',
        "text-lime-400": themeWarna === 'Tiga',
        "text-blue-500": themeWarna === 'Empat', 
      })

      const tJamDtk = clsx({
        "text-blue-500": themeWarna === 'Satu',
        "text-lime-400": themeWarna === 'Dua',
        "text-rose-500": themeWarna === 'Tiga',
        "text-orange-600": themeWarna === 'Empat', 
      })

      const tSlideAr = clsx({
        "text-white": themeWarna === 'Satu',
        "text-yellow-50": themeWarna === 'Dua',
        "text-slate-50": themeWarna === 'Tiga',
        "text-slate-100": themeWarna === 'Empat', 
      })

      const bgSlideAr = clsx({
        "bg-gradient-to-t from-blue-500 to-blue-900": themeWarna === 'Satu',
        "bg-gradient-to-t from-green-300 to-green-700": themeWarna === 'Dua',
        "bg-gradient-to-t from-amber-300 to-amber-500": themeWarna === 'Tiga',
        "bg-gradient-to-t from-fuchsia-300 to-fuchsia-500": themeWarna === 'Empat', 
      })

      const tSlideTr = clsx({
        "text-blue-700": themeWarna === 'Satu',
        "text-emerald-900": themeWarna === 'Dua',
        "text-indigo-700": themeWarna === 'Tiga',
        "text-red-900": themeWarna === 'Empat', 
      })
      
      const bgSlideTr = clsx({
        "bg-gradient-to-t from-white to-blue-500": themeWarna === 'Satu',
        "bg-gradient-to-t from-slate-50 to-green-300": themeWarna === 'Dua',
        "bg-gradient-to-t from-slate-50 to-amber-200": themeWarna === 'Tiga',
        "bg-gradient-to-t from-slate-50 to-fuchsia-300": themeWarna === 'Empat', 
      })

      const tSlideSu = clsx({
        "text-yellow-500": themeWarna === 'Satu',
        "text-orange-500": themeWarna === 'Dua',
        "text-slate-50": themeWarna === 'Tiga',
        "text-yellow-300": themeWarna === 'Empat', 
      })
      
      const tJwsSo = clsx({
        "text-white": themeWarna === 'Satu',
        "text-slate-100": themeWarna === 'Dua',
        "text-slate-50": themeWarna === 'Tiga' || themeWarna === 'Empat',
        
      })

      const bgJwsSo = clsx({
        "bg-blue-700": themeWarna === 'Satu',
        "bg-green-600": themeWarna === 'Dua',
        "bg-amber-400": themeWarna === 'Tiga',
        "bg-red-400": themeWarna === 'Empat', 
      })

      const tJwsWa = clsx({
        "text-blue-700": themeWarna === 'Satu',
        "text-green-600": themeWarna === 'Dua',
        "text-amber-400": themeWarna === 'Tiga',
        "text-yellow-300": themeWarna === 'Empat', 
      })
      
      const bgJwsWa = clsx({
        "bg-yellow-500": themeWarna === 'Satu',
        "bg-yellow-200": themeWarna === 'Dua',
        "bg-indigo-500": themeWarna === 'Tiga',
        "bg-fuchsia-900": themeWarna === 'Empat', 
      })
      
      setColorsData({
        tBrandType,
        tBrandNama,
        tBrandAlamat,
        tMoment1,
        tMoment2,
        bgMoment,
        tRuntext,
        bgRuntext,
        tTanggalH,
        tTanggalM,
        bgTanggalH,
        bgTanggalM,
        tJamMnt,
        tJamDtk,
        tSlideAr,
        tSlideTr,
        tSlideSu,
        bgSlideAr,
        bgSlideTr,
        tJwsSo,
        bgJwsSo,
        tJwsWa,
        bgJwsWa
      });

      setError(undefined);
    } catch (e: any) {
      console.log(e);
      setError(e);
    }
  };

  return { colorsData, error, getData };
}

const DataColorsContext = createContext({} as ColorsContextData);

export const useDataColorsContext = () => {
  return useContext(DataColorsContext);
};

const ProvideColorsContext: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  
  const dataContext = useDataContext();
  
  const colors: ColorsContextData = useProvideColorsContext(
    dataContext.data?.display
  );

  useEffect(() => {
    colors.getData();
  }, [dataContext.data?.display]);

  return (
    <DataColorsContext.Provider value={colors}>
      {children}
    </DataColorsContext.Provider>
  );
};

export default ProvideColorsContext;
