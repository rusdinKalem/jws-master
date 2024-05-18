import { useDataContext } from "../../contexts/dataContexts";

export default function PetugasJumat() {
  
  const dataContext = useDataContext();
  
  const khotib = dataContext?.data?.info.khotib;
  const imam = dataContext?.data?.info.imam;
  const muadzin = dataContext?.data?.info.muadzin;
  
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;
  
  return (
    <>
    <div className="grid grid-cols-12">
              <div className="col-span-5 pl-5 pt-16 font-qwitcher text-8xl font-bold text-blue-500 text-right">
                Petugas<span className="font-bruno text-white">ACARA</span>  
                </div>
                <div className="col-span-7 pl-16 text-center font-monoton text-[140px] mt-4  text-yellow-300">JUM'AT</div>
              </div>
              <div className="grid grid-cols-12 -mt-5">
                <div className="pl-10 col-span-4 text-left font-bold font-abel text-yellow-500" >KHOTIB</div>
                <span className="col-span-1 text-center " >:</span>
                <div className="col-span-7 pt-2 text-left Uppercase text-blue-400">{khotib}</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="pl-10 col-span-4 text-left font-bold font-abel text-yellow-500" >IMAM</div>
                <span className="col-span-1 text-center " >:</span>
                <div className="col-span-7 pt-2 text-left Uppercase text-blue-400">{imam}</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="pl-10 col-span-4 text-left font-bold font-abel text-yellow-500" >MUADZIN</div>
                <span className="col-span-1 text-center " >:</span>
                <div className="col-span-7 pt-2 text-left Uppercase text-blue-400">{muadzin}</div>
              </div>
    </>
  )
}
