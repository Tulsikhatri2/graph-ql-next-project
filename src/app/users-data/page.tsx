"use client";

import { userDetails, usersData } from "@/Redux/Slice/usersSlice";
import { AppDispatch, RootState } from "@/Redux/store";
import { type } from "os";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserDetails from "./Components/UserDetails";
import { useRouter } from "next/navigation";

export interface PAGE_INFO {
  page: string;
  size: string;
}

export interface USER_DATA{
  userId : string
}

const page = () => {
  const [pageNumber, setPageNumber] = useState<any>("1");
  const [size, setSize] = useState<any>("10");
  const dispatch = useDispatch<AppDispatch>();
  const { usersList } = useSelector((state: RootState) => state.users);
  const router = useRouter();
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const sizes = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const pageData: PAGE_INFO = {
      page: pageNumber,
      size: size,
    };
    dispatch(usersData(pageData));
  }, [pageNumber, size]);

  return (
    <div className="font-mono w-[100vw] h-[100vh] flex flex-col items-center ">
      <div className="w-[100%] h-[70%] overflow-auto flex flex-col items-center">
        <table className="w-[70%] text-center">
          <thead>
            <tr>
              <th className="px-6 py-3  text-md whitespace-nowrap text-gray-500 uppercase font-bold">
                ID
              </th>
              <th className="px-6 py-3  text-md  text-gray-500 uppercase font-bold">
                NAME
              </th>
              <th className="px-6 py-3  text-md  text-gray-500 uppercase font-bold">
                EMAIL
              </th>
              <th className="px-6 py-3  text-md  text-gray-500 uppercase font-bold">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {usersList?.map((item: any, index) => (
              <tr key={index}>
                <td className="px-6 py-2 text-xs font-bold ">{item.id}</td>
                <td className="px-6 py-2  text-xs font-bold ">{item.name}</td>
                <td className="px-6 py-2 text-xs font-bold ">{item.email}</td>
                <td className="px-6 py-2 text-xs font-bold ">
                  <button
                    type="button"
                    className="userPageButton"
                    style={{
                      fontSize: "1.7vh",
                    }}
                    onClick={() => {
                      handleClickOpen();
                      const userId: USER_DATA = {
                        userId: item.id
                      }
                      dispatch(userDetails(userId))
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-[60%] h-[20%] flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <button
            className="userPageButton"
            onClick={() => {
              router.push("/location-list");
            }}
          >
            Location Data
          </button>
          <button
            className="logoutButton mt-4 py-3 font-mono"
            onClick={() => {
              router.push("/auth/login");
              localStorage.clear()
            }}
          >
            Logout
          </button>
        </div>
        <div>
          <div className="mt-2">
            <label>Page Number: </label>
            <select
              name="pages"
              onChange={(e) => setPageNumber(e.target.value)}
              className="border border-black rounded-lg"
            >
              {pages.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>
          <div className="mt-2">
            <label>Page Size: </label>
            <select
              name="sizes"
              onChange={(e) => setSize(e.target.value)}
              className="border border-black rounded-lg"
            >
              {sizes.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
      <UserDetails open={open} handleClose={handleClose}/>
    </div>
  );
};

export default page;
