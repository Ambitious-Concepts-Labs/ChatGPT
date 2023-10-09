import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import Model from "./Modal";
import { UserAuth } from "../../app/authContext";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const { myState, updateMyState } = UserAuth();
  const [originalToken, setoriginalToken] = useState(0);
  const [defaultToken, setdefaultToken] = useState(0);
  const [totalTokens] = useState(9000);
  const [originalTokendata, setoriginalTokenData] = useState<any>({});
  const [showModal, setshowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [value, setvalue] = useState("");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const [currentMonthName, setcurrentMonthName] = useState(
    monthNames[currentMonth - 1]
  );

  const SplitString = (value: string) => {
    let resultArray = value.split(/[\s|/,;:]+/);
    let filteredArray = resultArray.filter((item: string) => item !== "");

    let count = originalToken + filteredArray.length || 0;
    setdefaultToken(count);
    originalTokendata[currentMonthName] = count;
    localStorage.setItem("TokenInfo", JSON.stringify(originalTokendata));
    updateMyState(count)
    setshowModal(count <= totalTokens ? false : true);
  };

  useEffect(() => {
    let username = localStorage.getItem("UserName");
    let originalTokeninfo = localStorage.getItem("TokenInfo");
    if (username) {
      setUserName(username);
    }

    if (originalTokeninfo == null || originalTokeninfo == undefined) {
      let originalTokeninformation = {
        January: 0,
        Feburary: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };
      setdefaultToken(0);
      updateMyState(0)
      setoriginalTokenData(originalTokeninformation);
      localStorage.setItem(
        "TokenInfo",
        JSON.stringify(originalTokeninformation)
      );
    } else {
      originalTokeninfo = JSON.parse(originalTokeninfo);
      if (originalTokeninfo) {
        setoriginalToken(originalTokeninfo[currentMonthName]);
        setdefaultToken(originalTokeninfo[currentMonthName]);
        setoriginalTokenData(originalTokeninfo);
        
        updateMyState(originalTokeninfo[currentMonthName])
        setshowModal(
          originalTokeninfo[currentMonthName] <= totalTokens ? false : true
        );
      }
    }
    setcurrentMonthName(monthNames[currentMonth - 1]);
  }, []);

  const CloseModal = () => {
    setshowModal(false);
  };
  
  return (
    <>
    <div className="w-full max-w-[1000px] mx-auto mt-[50px]">
      <Model CloseModal={CloseModal} showModal={showModal} />
      <div className="flex justify-center">
        <input
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            localStorage.setItem("UserName", e.target.value);
          }}
          className="w-full max-w-[30%] rounded-[10px] h-[50px] border-[2px] pl-[10px] !border-gray-200 outline-none "
          placeholder="Enter User Name"
        />
      </div>
      {/* <div className="flex justify-end">
        <p className="text-gray-500" style={{ fontFamily: inter }}>
          Total {currentMonthName} Tokens Usage:
          <span className="text-black font-bold">{defaultToken}</span>
        </p>
      </div> */}
     
      {originalToken <= totalTokens && (
        <div className="mt-6 w-full  ">
           <h1 className="text-[28px] text-gray-400">Untitled document</h1>
          <div className="py-2  bg-white ">
            <textarea
              value={value}
              onChange={(e) => {
                setvalue(e.target.value);
                SplitString(e.target.value);
              }}
              // style={{ fontFamily: inter }}
              id="editor"
              rows={8}
              className="block w-[70%] outline-none text-sm !text-[black] bg-white border-0  focus:ring-0 "
              placeholder="Write an article..."
              required
            ></textarea>
          </div>
        </div>
      )}
    </div>
    
    </>
  );
}
