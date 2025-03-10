import React, { useState } from 'react';
import axios from 'axios';

import { useContext } from 'react';

import toast from 'react-hot-toast';

import Loader from './Loader';

import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';


import { isValidEmail } from '../utils';


function PopUps({ setshowPopUps, showPopUps, emailSearch, setSearchedResponseData, setError }) {

  const dispatch = useDispatch();

  const data = useSelector((state) => state.user.data);

  const [loading, setLoading] = useState(false);

  async function checkStatusHandler() {

    console.log("aa gaye yaar ");

    try {

      setLoading(true);


      if (emailSearch === "") {

        toast.error("plz provide the email");
        setshowPopUps(false);
        console.log("1")
        return;
      }

      if (!isValidEmail(emailSearch)) {

        toast.error("plz provide the valid  email");

        setshowPopUps(false);

        console.log("2")

        return;

      }

      console.log("5");

      // if (Number(data?.credits) === 0) {

      //   console.log("4");

      //   toast.error("you do not have enough  credits left");
      //   return
      // }

      console.log("hellow");

      let backendUrl = "http://localhost:4000/api/users/user-info";

      console.log("bac", backendUrl);

      const response = await axios.post(backendUrl, {

        email: emailSearch,
        userId: data._id

      }, {

        withCredentials: true,

      });

      console.log("response ka data ", response.data.data);

      toast.success("data fetched successfully");

      setSearchedResponseData(response.data.data);
      setError("");

      // make a call to backend to seraching the user 

    } catch (error) {

      console.log(error);

      setError("not_found");
      setSearchedResponseData(null);

      toast.error(error?.response?.data?.message);

    }
    finally {

      setLoading(false);
      setshowPopUps(false);

    }
  }

  return (
    <div>

      {

        loading ? (<Loader></Loader>) : (

          <div className="fixed inset-0  flex items-center justify-center z-50 backdrop-blur-sm bg-black/30">
            <div className="bg-white m-8 p-8 rounded-xl shadow-xl max-w-md w-full">
              <p className="text-base font-semibold mb-4 text-center">To search a candidate ,You need to burn one credit</p>

              <div className='flex gap-5  justify-center items-centertext-xs font-semibold'>
                <button onClick={() => setshowPopUps(false)} className=' px-10 border-[1px] border-gray-500 text-black  py-1 rounded-3xl'>Cancel</button>
                <button onClick={checkStatusHandler} className=' py-1 px-10 border-[1px] border-gray-500  text-white rounded-3xl  bg-[#56b54a]'>Proceed</button>
              </div>
            </div>
          </div>

        )

      }


    </div>
  )
}

export default PopUps;

