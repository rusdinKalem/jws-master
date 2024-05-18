import { useState } from "react";
import FormRtext from "../components/Form/formRtext";
import FormDisp from "../components/Form/formDisp";
import FormJws from "../components/Form/formJws";
import FormMasjid from "../components/Form/formMasjid";
import FormOntime from "../components/Form/formOntime";
import FormInfo from "../components/Form/formInfo";
import FormMedia from "../components/Form/formMedia";
import FormAudioTartil from "../components/Form/formAudioTartil";
import FormAudioTarhim from "../components/Form/formAudioTarhim";
import FormAudioAdzan from "../components/Form/formAudioAdzan";
import FormSlideText from "../components/Form/formSlideText";
import FormSlideImage from "../components/Form/formSlideImage";

export default function Setting(props: any) {
  const background = props.background;
  let cnLabel = " block mb-2 text-sm font-medium text-blue-700 dark:text-blue";
  let cnInput =
    " mb-3 p-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full";
  let cnSelect =
    " block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer";
  let cnTextArea =
    " form-select mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 ";
  let cnTabs =
    " inline-block hover:text-blue-600 hover:bg-slate-200 rounded-t-lg py-4 px-4 text-sm font-medium text-center";
  let cnSetup = "text-xs text-red-500";
  let active = " bg-yellow-600 text-slate-100";
  let inactive = " bg-yellow-400 text-blue-500";

  const [tabsState, setTabsState] = useState(1);

  const toogleTab = (index: any) => {
    setTabsState(index);
  };

  return (
    <>
      <div className="relative z-10 gap-4 my-[60px] mx-[100px] p-4 rounded-3xl bg-yellow-200 opacity-70 dark:bg-gray-800 col-span-8">
        <ul className="flex flex-wrap border-b border-gray-200">
          <li className="mr-2">
            <button
              onClick={() => toogleTab(1)}
              className={(tabsState === 1 ? active : inactive) + cnTabs}
            >
              Setting Display
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => toogleTab(2)}
              className={(tabsState === 2 ? active : inactive) + cnTabs}
            >
              Setting Media
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => toogleTab(3)}
              className={(tabsState === 3 ? active : inactive) + cnTabs}
            >
              Setting Info Jumat
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => toogleTab(4)}
              className={(tabsState === 4 ? active : inactive) + cnTabs}
            >
              Setting Running Text
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => toogleTab(5)}
              className={(tabsState === 5 ? active : inactive) + cnTabs}
            >
              Setting Slide Text
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => toogleTab(6)}
              className={(tabsState === 6 ? active : inactive) + cnTabs}
            >
              Setting Slide Images
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => toogleTab(10)}
              className={(tabsState === 10 ? active : inactive) + cnTabs}
            >
              Setting Audio Tartil
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => toogleTab(11)}
              className={(tabsState === 11 ? active : inactive) + cnTabs}
            >
              Setting Audio Tarhim
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => toogleTab(12)}
              className={(tabsState === 12 ? active : inactive) + cnTabs}
            >
              Setting Audio Adzan
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => toogleTab(7)}
              className={(tabsState === 7 ? active : inactive) + cnTabs}
            >
              Setting Masjid
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => toogleTab(8)}
              className={(tabsState === 8 ? active : inactive) + cnTabs}
            >
              Setting JWS
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => toogleTab(9)}
              className={(tabsState === 9 ? active : inactive) + cnTabs}
            >
              Setting Ontime
            </button>
          </li>
        </ul>

        {tabsState === 1 ? (
          <FormDisp cnInput={cnInput} cnSetup={cnSetup} cnSelect={cnSelect} cnLabel={cnLabel} />
        ) : (
          ""
        )}
        {tabsState === 2 ? (
          <FormMedia cnInput={cnInput} cnSetup={cnSetup} cnSelect={cnSelect} cnLabel={cnLabel} />
        ) : (
          ""
        )}
        {tabsState === 3 ? (
          <FormInfo cnInput={cnInput} cnSetup={cnSetup} cnSelect={cnSelect} cnLabel={cnLabel} />
        ) : (
          ""
        )}
        {tabsState === 4 ? (
          <FormRtext cnTextArea={cnTextArea} cnLabel={cnLabel} /> 
        ) : (
          ""
        )}
        {tabsState === 5 ? (
          <FormSlideText cnTextArea={cnTextArea} cnLabel={cnLabel} />
        ) : (
          ""
        )}
        {tabsState === 6 ? (
          <FormSlideImage cnTextArea={cnTextArea} cnSelect={cnSelect} cnLabel={cnLabel} cnInput={cnInput}/> 
        ) : (
          ""
        )}
        {tabsState === 7 ? (
          <FormMasjid cnInput={cnInput} cnSetup={cnSetup} cnSelect={cnSelect} cnLabel={cnLabel} />
        ) : (
          ""
        )}
        {tabsState === 8 ? 
          <FormJws cnInput={cnInput} cnSetup={cnSetup} cnSelect={cnSelect} cnLabel={cnLabel} />
        : ""}
        {tabsState === 9 ? 
          <FormOntime cnInput={cnInput} cnSetup={cnSetup} cnSelect={cnSelect} cnLabel={cnLabel} />
        : ""}
        {tabsState === 10 ? 
          <FormAudioTartil cnInput={cnInput} cnSetup={cnSetup} cnSelect={cnSelect} cnLabel={cnLabel} />
        : ""}
        {tabsState === 11 ? 
          <FormAudioTarhim cnInput={cnInput} cnSetup={cnSetup} cnSelect={cnSelect} cnLabel={cnLabel} />
        : ""}
        {tabsState === 12 ? 
          <FormAudioAdzan cnInput={cnInput} cnSetup={cnSetup} cnSelect={cnSelect} cnLabel={cnLabel} />
        : ""}
      </div>
      <img
        className="fixed top-0 left-0 w-full h-full -z-10 object-cover object-center"
        src={background}
        alt="Background"
      />
    </>
  );
}
