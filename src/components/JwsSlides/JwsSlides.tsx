import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDataPrayersContext } from '../../contexts/prayersContext';
import { useDataContext } from "../../contexts/dataContexts";
import { clsx } from 'clsx';
import { useDataColorsContext } from '../../contexts/colorsContext';


export default function JwsSlides() {
  const dataContext = useDataContext();
  const dataPrayers = useDataPrayersContext();

  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;
  if (dataPrayers?.error) return <div className="failed">failed to load</div>;
  if (!dataPrayers?.prayersData) return <div className="Loading">Loading...</div>;

  const context = dataContext?.data;
  const display = context?.display;
  const theme = display.theme
  const jws = context?.jws;
  const spSlideJws = parseInt(jws.spSlideJws)*1000
  
  const prayers = dataPrayers?.prayersData;
  const waktuSholat = prayers?.waktuSholat;
  
  let cnJwsName: string
  let cnJwsTime : string
  let isVertical : boolean

  if(theme==='Satu' || theme==='Dua'){
    isVertical = true

    cnJwsName="w-[260px] text-center text-4xl font-bruno font-bold py-1 px-3 rounded-full "
    cnJwsTime="w-[340px] text-center text-8xl font-bold mb-[12px] -skew-x-[15deg] ml-5"
  } else {
    isVertical = false

    cnJwsName="w-[260px] text-center text-4xl font-bruno font-bold py-1 px-3 rounded-full "
    cnJwsTime="w-[300px] text-center text-8xl font-bold mb-[12px] -skew-x-[15deg] ml-5"
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
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: isVertical,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />
  };

  const dataColorsContext = useDataColorsContext();
  if (dataColorsContext?.error) return <div className="failed">failed to load</div>;
  if (!dataColorsContext?.colorsData) return <div className="Loading">Loading...</div>;

  const wJwsSo = dataColorsContext?.colorsData.tJwsSo
  const bgJwsSo = dataColorsContext?.colorsData.bgJwsSo
  const wJwsWa = dataColorsContext?.colorsData.tJwsWa
  const bgJwsWa = dataColorsContext?.colorsData.bgJwsWa
  
  return (
    <div className={
      clsx({
        "grid grid-cols-1": true,
        "w-[400px] h-[720px]": theme === 'Satu' || theme === 'Dua',
        "w-[1360px] h-[140px]": theme === 'Tiga' || theme === 'Empat',
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
