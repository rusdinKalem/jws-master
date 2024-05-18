import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDataPrayersContext } from '../../contexts/prayersContext';
import { useDataContext } from "../../contexts/dataContexts";
import { clsx } from 'clsx';
import { useDataColorsContext } from '../../contexts/colorsContext';


export default function JwsSlidesSmall() {

  const dataContext = useDataContext();
  const dataPrayers = useDataPrayersContext();

  const theme = dataContext?.data?.display.theme
  const spSlideJws = parseInt(dataContext?.data?.display.spSlideJws)*1000
  
  const prayers = dataPrayers?.prayersData;
  const waktuSholat = prayers?.waktuSholat;
  
  let cnJwsName: string
  let cnJwsTime : string
  let isVertical : boolean
  let sShow : number
  
  if(theme==='Satu' || theme==='Dua'){
    isVertical = true
    sShow = 6
    cnJwsName="w-[200px] text-left pl-2 ml-1 text-3xl font-bruno font-bold -mb-2 z-30 drop-shadow-md -skew-x-[15deg]"
    cnJwsTime="w-[300px] text-right pr-4 ml-2 text-7xl font-bold mb-[12px] rounded-sm drop-shadow-3xl"
  } else {
    isVertical = false
    sShow = 5
    cnJwsName="w-[200px] text-left pl-2 ml-3 text-3xl font-bruno font-bold -mb-2 z-30 drop-shadow-md -skew-x-[15deg]"
    cnJwsTime="w-[246px] text-right pr-2 ml-2 text-7xl font-bold mb-[16px] rounded-sm drop-shadow-3xl"
  }
  function Arrow (props:any) {
    const {style} = props;
    return <div className='JwsSlides'style={{ ...style, color: "transparent" }}/>
  }
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: spSlideJws,
    slidesToShow: sShow,
    slidesToScroll: 1,
    vertical: isVertical,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />
  };
  
  const dataColorsContext = useDataColorsContext();
  const wJwsSo = dataColorsContext?.colorsData?.tJwsSo
  const bgJwsSo = dataColorsContext?.colorsData?.bgJwsSo
  const wJwsWa = dataColorsContext?.colorsData?.tJwsWa
  const bgJwsWa = dataColorsContext?.colorsData?.bgJwsWa
  
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;
  if (dataPrayers?.error) return <div className="failed">failed to load</div>;
  if (!dataPrayers?.prayersData) return <div className="Loading">Loading...</div>;
  if (dataColorsContext?.error) return <div className="failed">failed to load</div>;
  if (!dataColorsContext?.colorsData) return <div className="Loading">Loading...</div>;
  

  return (
    <div className={
      clsx({
        "grid grid-cols-1": true,
        "w-[300px] h-[720px] pt-6": theme === 'Satu' || theme === 'Dua',
        "w-[1360px] h-[120px] pl-1 pt-4": theme === 'Tiga' || theme === 'Empat',
      })}>
        <Slider {...settings}>
            {
              waktuSholat
                .map((item:any) => 
                <div key={item.id}>
                    <div className={clsx(cnJwsName,wJwsSo,bgJwsSo)}>
                    {item.name}    
                    </div>
                    <div className={clsx(cnJwsTime,wJwsWa,bgJwsWa)}>
                    {item.time}
                    </div>
                </div>  
                )
                }  
        </Slider>
    </div>
  )
}
