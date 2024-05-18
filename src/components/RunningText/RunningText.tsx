import Marquee from "react-fast-marquee";
import { useDataContext } from "../../contexts/dataContexts";
import { useDataColorsContext } from "../../contexts/colorsContext";
import { clsx } from 'clsx';


export const RunningText = () => {
  const dataContext = useDataContext();
  const dataColorsContext = useDataColorsContext();

  const runningText = dataContext?.data?.runningText;
  const speedRt = dataContext?.data?.display.spRuntext;
  const tRuntext = dataColorsContext?.colorsData?.tRuntext
  const bgRuntext = dataColorsContext?.colorsData?.bgRuntext
  
  if (dataContext?.error) return <div className="failed">failed to load</div>;
  if (!dataContext?.data) return <div className="Loading">Loading...</div>;
  if (dataColorsContext?.error) return <div className="failed">failed to load</div>;
  if (!dataColorsContext?.colorsData) return <div className="Loading">Loading...</div>;


  
  return (
    <div className={
      clsx({
        "w-[1360px] h-[48px]":true,
      })}>
      <Marquee speed={speedRt}>
        {runningText.map((item: any) => (
          <p
            key={item.id}
            className={clsx(tRuntext,bgRuntext,'text-5xl font-bruno font-bold capitalize overflow-y-hidden')}
          >
            =/ {item.runText} /=
          </p>
        ))}
      </Marquee>
    </div>
  );
};
