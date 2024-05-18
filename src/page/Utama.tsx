
import { Tanggal } from "../components/Tanggal/Tanggal";
import { Jam } from "../components/Jam/Jam";
import Moment from "../components/Moment/Moment";
import Brand from "../components/Brand/Brand";
import { RunningText } from "../components/RunningText/RunningText";
import { useDataContext } from "../contexts/dataContexts";
import { clsx } from 'clsx';
import Jelang from "../components/Jelang/Jelang";
import { Tanggal2 } from "../components/Tanggal/Tanggal2";
import { Ontime } from "../components/Ontime/Ontime";
import { Adzan } from "../components/Adzan/Adzan";
import { Iqomat } from "../components/Iqomat/Iqomat";
import { Sholat } from "../components/Sholat/Sholat";
import { Khutbah } from "../components/Khutbah/Khutbah";
import { Info } from "../components/InfoJumat/Info";
import Slide from "../components/Slides/Slide";
import JwsSlidesSmall from "../components/JwsSlides/JwsSlidesSmall";
import { JelangSholat } from "../components/JelangSholat/JelangSholat";
import TartilTarhim from "../components/AudioJelang/TartilTarhim";
import AudioAdzan from "../components/AudioAdzan/AudioAdzan";

export default function Utama(props: any) {

  const dataContext = useDataContext();
  const background  = props.background;
  const layar       = props.layar;
  const t2          = props.t2;
  const t3s         = props.t3s;
  const t7s         = props.t7s;
  const useVid      = props.useVid;
  const theme       = dataContext?.data?.display.theme;

  
  const backgroundElement = () => {
    if (useVid) {
      return (
        <video className="top-0 left-0 h-full w-full z-0" controls={false} autoPlay loop={true}>
          <source
            src={background}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <img
        className="fixed top-0 left-0 w-[1360px] h-[768px] -z-10 object-cover object-center"
        src={background}
        alt="Background"
        />
      );
    }
  };
  
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;
  
  return (
    <div>

      <div className="w-100% h-100%">


       <TartilTarhim layar={layar}/>
       <AudioAdzan layar={layar}/>
      
        {/*  Brand */}
        <div className={
          clsx({
            "absolute left-[340px] top-[630px]": (theme === 'Satu' && layar === 'jelang') || (theme === 'Satu' && layar === 'utama'),
            "absolute left-[0px] top-[630px]": (theme === 'Dua' && layar === 'jelang') || (theme === 'Dua' && layar === 'utama') || (theme === 'Tiga' && layar === 'jelang') || (theme === 'Tiga' && layar === 'utama'),
            "absolute left-[0px] top-[0px]": theme === 'Empat',
            "absolute left-[10px] top-[24px]": layar !== "utama" && layar !=='jelang',
            'hidden' : layar === "iqomat"
          }, "z-40")
          }>
            <Brand />
        </div>

        {/* Jam */}
        <div className={
          clsx({
            "absolute left-[0px] top-[0px]": (theme === 'Dua' && layar === 'jelang') || (theme === 'Dua' && layar === 'utama'),
            "absolute left-[900px] top-[0px]": theme === 'Satu' || theme === 'Empat'|| layar !== "utama" && layar !=="jelang",
            "absolute left-[900px] top-[550px]": layar === 'utama' && theme === 'Tiga',
            "absolute left-[900px] top-[600px]": layar === 'jelang' && theme === 'Tiga',
            'hidden' : layar === "iqomat"
          }, "z-40")
          }>
            <Jam />
        </div>

        {/* Tanggal */}
        <div className={
          clsx({
            "absolute left-[340px] top-[20px]": theme === 'Satu',
            "absolute left-[460px] top-[20px]": theme === 'Dua',
            "absolute left-[860px] top-[660px]": theme === 'Tiga',
            "absolute left-[860px] top-[110px]": theme === 'Empat',
            "hidden" : layar !== "utama"
          }, "z-40")
          }>
            <Tanggal />
        </div>
        
        {/* Tanggal2 */}
        <div className={
          clsx({
            "hidden" : layar === "utama" || layar === "iqomat" ,
            'absolute left-[340px] top-[28px] text-right': theme!=="Tiga" || layar !== 'jelang',
            'absolute left-[400px] top-[620px] text-left': theme==="Tiga" && layar === 'jelang',
          })
        }>
            <Tanggal2/>
        </div>

        {/* jwsSlide */}
        <div className={
          clsx({
            "absolute left-[0px] top-[0px]": theme === 'Satu' || theme === 'Tiga',
            "absolute left-[1060px] top-[0px]": theme === 'Dua',
            "absolute left-[0px] top-[600px]": theme === 'Empat',
            "hidden" : layar !== 'utama' && layar !== 'jelang'
          }, "z-40")
          }>
            <JwsSlidesSmall />
        </div>
      
        {/* runText */}
        <div className={
          clsx({
            "absolute left-[0px] top-[720px]": true,
            "hidden" : layar === 'sholat'
          })
          }>
            <RunningText />
        </div>
        
        {/* Moment */}
        <div className={
          clsx({
            "absolute left-[740px] top-[640px]": theme === 'Satu',
            "absolute left-[400px] top-[650px]": theme === 'Dua' || theme === 'Tiga',
            "absolute left-[400px] top-[20px]": theme === 'Empat',
            "hidden" : layar !== "utama"
          }, "z-40")
          }>
            <Moment />
        </div>
        
        {/* slideText */}
        <div className={
          clsx({
            "hidden" : layar !== "utama"
          })
        }>
            <Slide layar={layar}/>
        </div>
        
        {/* Jelang */}
        <div className={
          clsx({
            "hidden" : layar !== "jelang"
          })
        }> 
            <Jelang/>
        </div>

        {/* Ontime */}
        <div className={
          clsx({
            "hidden" : layar !== "ontime"
          })
        }>
            <Ontime layar={layar}/>
        </div>

        {/* Adzan */}
        <div className={
          clsx({
            "hidden" : layar !== "adzan"
          })
        }>
            <Adzan/>
        </div>
        {/* Adzan */}
        <div className={
          clsx({
            "hidden" : layar !== "jelangSholat"
          })
        }>
            <JelangSholat/>
        </div>

        {/* Iqomat */}
        <div className={
          clsx({
            "hidden" : layar !== "iqomat"
          })
        }>
            <Iqomat t2={t2} layar ={layar}/>
        </div>
        
        {/* Sholat */}
        <div className={
          clsx({
            "hidden" : layar !== "sholat"
          })
        }>
            <Sholat t3s={t3s} t7s={t7s}/>
        </div>
        
        {/* Info */}
        <div className={
          clsx({
            "hidden" : layar !== "info"
          })
        }>
            <Info/>
        </div>
        
        {/* Khutbah */}
        <div className={
          clsx({
            "hidden" : layar !== "khutbah"
          })
        }>
            <Khutbah/>
        </div>
        
        {backgroundElement()}
      </div>
    </div>
  );
}
