import Carousel from "nuka-carousel";
import { useDataContext } from '../../contexts/dataContexts';
import { useDataColorsContext } from "../../contexts/colorsContext";
import { clsx } from 'clsx';

const SlideText = () => {

  const dataContext = useDataContext();
  const dataColorsContext = useDataColorsContext();
  
  const data = dataContext?.data;
  const display = data?.display;
  const theme = display.theme
  const slides = data?.slides;
  const spSlideTxt = parseInt(dataContext?.data?.display.spSlideTxt);
  const animation = dataContext?.data?.display.styleTxt;
  const interval = spSlideTxt*1000;
  
  const wSlideAr = dataColorsContext?.colorsData?.tSlideAr
  const wSlideTr = dataColorsContext?.colorsData?.tSlideTr
  const wSlideSu = dataColorsContext?.colorsData?.tSlideSu
  const bgSlideAr = dataColorsContext?.colorsData?.bgSlideAr
  const bgSlideTr = dataColorsContext?.colorsData?.bgSlideTr
        
  
  let cnSA: string
  let cnST : string
  let cnSS : string
  
  if(theme==='Satu' || theme==='Dua'){
    cnSA = "mb-6 p-5 text-6xl font-lateef text-right leading-none line-clamp-3"
    cnST = "p-5 font-abel text-4xl text-left leading-snug line-clamp-5"
    cnSS = "font-abel text-[28px] text-right italic"
  } else {
    cnSA = "mb-6 p-5 text-[60px] font-lateef text-center leading-none line-clamp-2"
    cnST = "p-5 font-abel text-[36px] text-center leading-snug line-clamp-3"
    cnSS = "font-abel text-[20px] text-right italic"
  }
  
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data)return <div className="Loading">Loading...</div>;
  if (dataColorsContext?.error) return <div className="failed">failed to load</div>;
  if (!dataColorsContext?.colorsData) return <div className="Loading">Loading...</div>;
      

        
  return (
      <Carousel 
      autoplay={true} 
      autoplayInterval={interval}
      cellAlign='center'
      slideIndex={0}
      slidesToScroll={1}
      slidesToShow={1}
      speed={500}
      wrapAround={true}
      withoutControls={true}
      pauseOnHover={false}
      animation= {animation}
      zoomScale={0.5}
      >
        
          {slides
            .map(
            (item:any) => 
                <div key={item.id} className="font-bold uppercase break-words text-pretty overflow-hidden opacity-70"
                >
                  <div className={clsx(bgSlideAr, cnSA,wSlideAr,"rounded-xl")}>
                  {item.arabText}
                  </div>
                  <div className={clsx(bgSlideTr, cnST,wSlideTr,"rounded-xl")}>
                  {item.translateText}
                  </div>
                  <div className={clsx(cnSS,wSlideSu)}> ({item.sumberText})</div> 
                </div>
              )
            }      
      </Carousel>

  )
}

export default SlideText