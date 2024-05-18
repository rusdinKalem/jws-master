export const Khutbah = () => {
  const jumatText = 'text-yellow-500';
  const jumatStyle = 'font-monoton -mt-10 text-[200px]';

  return (
    <section>
      <div className="absolute w-[1360px] h-[600px] left-[0px] top-[120px] pt-10 flex flex-col text-center">
        <div className="font-qwitcher text-8xl font-bold text-blue-500">
          Saatnya <span className="font-bruno text-white">KHUTBAH</span>
        </div>
        <div className={jumatStyle + " " + jumatText}>
          JUM'AT
        </div>
        <div className="grid grid-rows-3 text-[80px] -mt-12 text-white">
          <div className="row-span-1 font-bruno text-center -mb-12">
            DENGARKAN
          </div>
          <span className="row-span-1 font-qwitcher text-center -mt-8 text-blue-500">
            {" "}
            dan{" "}
          </span>
          <div className="row-span-1 font-bruno text-center -mt-12 text-red-700">
            HARAP TENANG
          </div>
        </div>
      </div>
    </section>
  );
};
