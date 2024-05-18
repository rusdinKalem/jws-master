import Carousel from "nuka-carousel";
import { useDataContext } from "../../contexts/dataContexts";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { getImageFileFromUploads } from "../../lib/upload";

const SlideImage = () => {

  const dataContext = useDataContext();

  const theme = dataContext?.data?.display.theme;
  const interval = dataContext?.data?.display.spSlideImg * 1000;
  const animation = dataContext?.data?.display.styleImg;
  const slideFile = dataContext?.data?.slideFile;

  
  const [slides, setSlides] = useState<{
    text: string, 
    colorText: string, 
    fontText: string
    typeText: string, 
    slideImg: string,
  }[]>([]);

  async function getData() {
    if (slideFile != null && Array.isArray(slideFile)) {
      let slides: {
        text: string, 
        colorText: string, 
        fontText: string
        typeText: string, 
        slideImg: string,
      }[] = [];

      for (const data of slideFile) {
        const imgFiles = data.slideImg;
        const textFiles = data.text;
        const colorTextFiles = data.colorText;
        const fontTextFiles = data.fontText;
        const typeTextFiles = data.typeText;

        let imageUrl = "";

        if (imgFiles) {
          try {
            const url = await getImageFileFromUploads(imgFiles);
            imageUrl = url ?? imageUrl;
          } catch (e) {}
        }
        
        slides.push({
          text: textFiles,
          colorText: colorTextFiles,
          fontText: fontTextFiles,
          typeText: typeTextFiles,
          slideImg: imageUrl
        });
      }

      setSlides(slides);
    }
  }

  useEffect(() => {
    getData();
  }, [dataContext.data]);

  let posisi = clsx({
    "absolute top-[0px] left-[0px] w-[1020px] h-[500px] px-20 pt-20 ": theme === "Satu",
    "absolute top-[0px] left-[0px] w-[1040px] h-[500px] pl-10 pr-10 ": theme === "Dua",
    "absolute top-[0px] left-[0px] w-[1360px] h-[420px] px-20 pt-20": theme === "Tiga",
    "absolute top-[0px] left-[0px] w-[1360px] h-[430px] px-20 pt-20": theme === "Empat"
  });
  
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;

  return (
    <Carousel
      autoplay={true}
      autoplayInterval={interval}
      cellAlign="center"
      slideIndex={0}
      slidesToScroll={1}
      slidesToShow={1}
      speed={500}
      wrapAround
      withoutControls={true}
      pauseOnHover={false}
      animation={animation}
      zoomScale={0.5}
    >
      {slides.map((file: any, id: number) => (
        <div key={"slidesImg" + id}
        >
          
          <img
            className={clsx({ 
              "w-[1000px] h-[500px] ml-5": theme === "Satu",
              "w-[1015px] h-[500px] ml-5": theme === "Dua",
              "w-[1330px] h-[520px] ml-4 mt-5": theme === "Tiga",
              "w-[1320px] h-[460px] ml-4 mt-5": theme === "Empat"
            })}
            src={file.slideImg}
            alt="Background"
          />

          <div className={clsx( posisi,
            {
              'text-left text-4xl leading-snug': file.typeText === 'L1',
              'text-left text-6xl leading-tight': file.typeText === 'L2',
              'text-left text-8xl leading-tight': file.typeText === 'L3',
              'text-right text-4xl leading-snug': file.typeText === 'R1',
              'text-right text-6xl leading-tight': file.typeText === 'R2',
              'text-right text-8xl leading-tight': file.typeText === 'R3',
              'text-center text-4xl leading-snug': file.typeText === 'C1',
              'text-center text-6xl leading-tight': file.typeText === 'C2',
              'text-center text-8xl leading-tight': file.typeText === 'C3',
              'font-abel': file.fontText === 'Abel',
              'font-bruno': file.fontText === 'Bruno',
              'font-vast': file.fontText === 'Vast',
              'font-audio': file.fontText === 'Audio',
              'text-white': file.colorText === 'Putih',
              'text-black': file.colorText === 'Hitam',
              'text-red-500': file.colorText === 'Merah',
              'text-blue-700': file.colorText === 'Biru',
              'text-green-600': file.colorText === 'Hijau',
              'text-yellow-500': file.colorText === 'Kuning',
              'text-violet-400': file.colorText === 'Ungu'
            }, 
            "break-words text-pretty overflow-hidden capitalize p-8 z-50"
          )}>
            {file.text}
          </div>
        </div>
        
      ))}
    </Carousel>
  );
};

export default SlideImage;
