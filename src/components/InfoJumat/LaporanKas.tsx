import { useDataContext } from "../../contexts/dataContexts";

export default function LaporanKas() {
  
  const dataContext = useDataContext();

  const saldoAwal = dataContext?.data?.info.saldoAwal;
  const plus = dataContext?.data?.info.plus;
  const minus = dataContext?.data?.info.minus;
  const saldoAkhir = dataContext?.data?.info.saldoAkhir;
  
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;
  
  return (
    <>
    <div className="grid grid-cols-12">
              <div className="col-span-6  pt-16 mt-4 mb-4 font-qwitcher text-6xl font-bold text-blue-500 text-right">
                Laporan <span className="font-bruno text-white">KEUANGAN</span>  
                </div>
                <div className="col-span-6 mt-10 text-center font-monoton text-[90px] text-yellow-300">MINGGUAN</div>
              </div>
              <div className="grid grid-cols-12 ">
                <div className="pl-20 col-span-6 text-[70px] text-left font-bold font-abel text-yellow-500" >SALDO AWAL</div>
                <span className="col-span-2 text-center " >: Rp.</span>
                <div className="col-span-4 text-[80px] text-right pr-5 font-abel text-blue-400">{saldoAwal},-</div>
              </div>
              <div className="grid grid-cols-12 -mt-5">
                <div className="pl-20 col-span-6 text-[70px] text-left font-bold font-abel text-yellow-500" >PEMASUKAN</div>
                <span className="col-span-2 text-center " >: Rp.</span>
                <div className="col-span-4 text-[80px] text-right pr-5 font-abel text-blue-400">{plus},-</div>
              </div>
              <div className="grid grid-cols-12 -mt-5">
                <div className="pl-20 col-span-6 text-[70px] text-left font-bold font-abel text-yellow-500" >PENGELUARAN</div>
                <span className="col-span-2 text-center " >: Rp.</span>
                <div className="col-span-4 text-[80px] text-right pr-5 font-abel text-blue-400">{minus},-</div>
              </div>
              <div className="grid grid-cols-12 -mt-5">
                <div className="pl-20 col-span-6 text-[70px] text-left font-bold font-abel text-yellow-500" >SALDO AKHIR</div>
                <span className="col-span-2 text-center " >: Rp.</span>
                <div className="col-span-4 text-[80px] text-right pr-5 font-abel text-blue-400">{saldoAkhir},-</div>
              </div>
    </>
  )
}
