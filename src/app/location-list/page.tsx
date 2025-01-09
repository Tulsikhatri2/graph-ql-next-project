"use client";

import {
  citiesData,
  countryData,
  statesData,
} from "@/Redux/Slice/locationSlice";
import { AppDispatch, RootState } from "@/Redux/store";
import { transform } from "next/dist/build/swc";
import { useRouter } from "next/navigation";
import path from "path";
import React, { useEffect, useState } from "react";
import { FaBackward } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../Components/BackButton";

export interface COUNTRY_DETAILS {
  statesId: string;
}

export interface STATES_DETAILS {
  citiesId: string;
}

const DataPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { countryList, statesList, cityList } = useSelector(
    (state: RootState) => state.location
  );
  const [countryId, setCountryId] = useState<any>();
  const [statesId, setStatesId] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    dispatch(countryData());
  }, []);

  useEffect(() => {
    const countryData: COUNTRY_DETAILS = {
      statesId: countryId,
    };
    dispatch(statesData(countryData));
  }, [countryId]);

  useEffect(() => {
    const statesData: STATES_DETAILS = {
      citiesId: statesId,
    };
    dispatch(citiesData(statesData));
  }, [statesId]);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-start font-mono">
      <div className="h-[8%] p-5 flex items-center justify-center" onClick={()=>router.push("/users-data")}>
        <BackButton />
      </div>

      <div className="w-[100%] h-[90%] flex items-center justify-between">
        <div className="w-[25%] h-[80%] flex flex-col items-center justify-between">
          <button
            onClick={() => {
              dispatch(countryData());
            }}
            className="bg-cyan-950 text-white p-3 rounded-3xl shadow-black shadow-md
         hover:bg-cyan-900"
          >
            Country List
          </button>
          <div className="h-[80%] w-[100%] overflow-auto flex flex-col items-center ">
            {countryList.map((item: any, index) => {
              return (
                <button
                  key={index}
                  className="w-[80%] hover:bg-stone-200 cursor-pointer text-center focus:bg-stone-300
                 active:bg-stone-300"
                  onClick={() => {
                    setCountryId(item.id);
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="w-[25%] h-[80%] flex flex-col items-center justify-between">
          <button
            onClick={() => {
              const ctryID: COUNTRY_DETAILS = {
                statesId: countryId,
              };
              dispatch(statesData(ctryID));
            }}
            className="bg-cyan-950 text-white p-3 rounded-3xl shadow-black shadow-md
         hover:bg-cyan-900 ml-2"
          >
            States List
          </button>
          <div className="h-[80%] w-[100%] overflow-auto flex flex-col items-center ">
            {statesList?.map((item: any, index) => {
              return (
                <>
                  <button
                    key={index}
                    className="w-[80%] hover:bg-stone-200 cursor-pointer text-center focus:bg-stone-300
                 active:bg-stone-300"
                    onClick={() => {
                      setStatesId(item.id);
                    }}
                  >
                    {item.name}
                  </button>
                </>
              );
            })}
          </div>
        </div>
        <div className="w-[25%] h-[80%] flex flex-col items-center justify-between">
          <button
            onClick={() => {
              const stateInfo: STATES_DETAILS = {
                citiesId: statesId,
              };
              dispatch(citiesData(stateInfo));
            }}
            className="bg-cyan-950 text-white p-3 rounded-3xl shadow-black shadow-md
         hover:bg-cyan-900"
          >
            Cities List
          </button>
          <div className="h-[80%] w-[100%] overflow-auto flex flex-col items-center">
            {cityList?.map((item: any, index) => {
              return (
                <>
                  <button
                    key={index}
                    className="w-[80%] hover:bg-stone-200 cursor-pointer text-center focus:bg-stone-300
                 active:bg-stone-300"
                  >
                    {item.name}
                  </button>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPage;
