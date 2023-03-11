import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import {useContract,useMetamask,useDisconnect,useAddress,useContractData, useContractCall,} from "@thirdweb-dev/react"
import Login from "../components/Login"
import PropagateLoader from "react-spinners/PropagateLoader";
import Loading from "../components/Loading"
import {useState} from "react";

const Home: NextPage = () => {
  const address = useAddress();
  const [quantity , setQuantity] = useState();
  const {contract, isLoading} = useContract(process.env.NEXT_PUBLIC_LOTTARY_CONTRACT_ADDRESS);
  if (!address) return (<Login/>)
  if(isLoading)return(<Loading />)
  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col">
      <Head>
        <title>CYRPTO LOTTARY</title>
      </Head>
      <div className="flex-1">
      <Header />
      <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
        <div className="stats-container">
          <h1 className="text-5xl text-white fond-bold text-center">The Next Draw</h1>
          <div className="flex justify-between p-2 space-x-2">
            <div className="stats">
              <h2 className="text-sm">Total Pool</h2>
              <p className="text-xl"> 0.1 MATIC </p>
            </div>
            <div className="stats">
              <h2 className="text-sm">Tickets Remaning</h2>
              <p className="text-xl"> 1000 </p>
            </div>
          </div>
        </div>
        <div className="stats-container space-y-2">
          <div className="stats-container">
            <div className="flex justift-between items-center text-white pb-2">
              <h2>Price Per Ticket</h2>
              <p> 0.1 MATIC </p>
            </div>
            <div className="flex text-white items-center space-x-2 bg-[#091B18] border-[#21011e] border p-4" >
              <p>TICKETS</p>
              <input className="flex w-full bg-transparent text-right outline-none" 
                     type="number"
                     min={1}
                     max={100}
                     value={quantity}
                     onChange={(e)=>setQuantity(Number(e.target.value))}/>
            </div>
            <div className="space-y-2 mt-5">
              <div className="flex items-center justify-between text-emerald-300 text-xs italic font-extrabold">
                <p> Total Cost Of Tickets</p>
                <p> 0.999</p>
              </div>
              <div className="flex items-center justify-between text-emerald-300 text-xs italic">
              <p> Service fees</p>
              <p> 0.005 MATIC</p>
              </div>
              <div className="flex items-center justify-between text-emerald-300 text-xs italic">
              <p>+ Network fees</p>
              <p> TBC </p>
              </div>
            </div>
            <button className="mt-5 w-full bg-gradient-to-br from-[#21011e] to-emerald-600 
            px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 
            disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed">Buy Tickets</button>
          </div>
        </div>
        </div>
        <div></div>
      </div> 
      </div>
  )
}

export default Home
