
import { useDataContext } from '../../contexts/dataContexts';
import { clsx } from 'clsx';
import SlideText from "./SlideText";
import SlideImages from './SlideImages';
import LiveVideo from './LiveVideo';

const Slide = (props:any) => {
  const layar = props.layar
  
  const dataContext = useDataContext();
  const theme = dataContext?.data?.display.theme;
  const isLive = dataContext?.data?.media.isLive;
  const typeSlide = dataContext?.data?.display.typeSlide;
  
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;  
  
  return (
    <section>

    <div className={
      clsx({
        "absolute left-[300px] top-[100px]": theme === 'Satu',
        "absolute left-[0px] top-[100px] ": theme === 'Dua',
        "absolute left-[0px] top-[120px] ": theme === 'Tiga',
        "absolute left-[0px] top-[160px] ": theme === 'Empat',
        "w-[1060px] h-[540px] px-10 py-5": theme === 'Satu' || theme === 'Dua',
        "w-[1360px] h-[440px] px-10 py-5": theme === 'Tiga' ||theme === 'Empat',
        "hidden": typeSlide !== 'Satu' || isLive == 1
      })}>
        <SlideText/>
    </div> 

    <div className={
      clsx({
        "hidden": typeSlide !== 'Dua' || isLive == 1,
        "absolute top-[120px] left-[320px]": theme === "Satu",
        "absolute top-[120px] left-[0px]": theme === "Dua",
        "absolute top-[116px] left-[0px]": theme === "Tiga",
        "absolute top-[160px] left-[0px]": theme === "Empat"
      })}>
        <SlideImages/>
    </div>
    <div className={
      clsx({
        "hidden": isLive == 0 
      })}>
        <LiveVideo layar={layar}/>
    </div>
    </section>
  )
}

export default Slide