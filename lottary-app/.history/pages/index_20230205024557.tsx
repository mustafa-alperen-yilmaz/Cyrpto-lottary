import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import {useContract,useMetamask,useDisconnect,useAddress,useContractRead ,useContractWrite} from "@thirdweb-dev/react"
import Login from "../components/Login"
import PropagateLoader from "react-spinners/PropagateLoader";
import Loading from "../components/Loading"
import {useState , useEffect } from "react";
import {ethers} from "ethers"
import {currency} from '../constants'
import CountDown from "../components/CountDown"
import toast from "react-hot-toast";
import Marquee from 'react-fast-marquee'

const Home: NextPage = () => {
  const address = useAddress();
  const [quantity , setQuantity] = useState();
  const {contract, isLoading} = useContract(process.env.NEXT_PUBLIC_LOTTARY_CONTRACT_ADDRESS);
  const {data: remainingTickets} = useContractRead(contract,"RemainingTickets");
  const {data: currentWiningReward} = useContractRead(contract,"CurrentWinningReward");
  const {data: ticketPrice} = useContractRead(contract,"ticketPrice");
  const {data: ticketComissions} = useContractRead(contract,"ticketCommission");
  const { data: expiration } = useContractRead(contract, "expiration");
  const { mutateAsync: BuyTickets} = useContractWrite(contract, "BuyTickets");
  const [userTickets , setUserTickets] = useState(0);
  const { data: tickets} = useContractRead(contract, "getTickets");
  const { data: winnings } = useContractRead(contract, "getWinningsForAddress", address);
  const { mutateAsync: WithdrawWinnings} = useContractWrite(contract, "WithdrawWinnings");
  useEffect(() => {
    if(!tickets) return;
    const totalTickets: string[] = tickets;
    const noOfUserTickets = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress === address ? total + 1: total),0
    );
    setUserTickets(noOfUserTickets);
  }, [tickets,address])
  const handleClick = async () => {
    if(!ticketPrice) return;
    const notify = toast.loading("Buying Tickets ...");
    try {
      const data = await BuyTickets([ {
       value: ethers.utils.parseEther((
        Number(ethers.utils.formatEther(ticketPrice))*quantity
       ).toString()
       ),
      }, ]);
      toast.success("tickets are purchased successfully",{id:notify,});
      console.info("contract call success", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }
  const onWithdrawWinnigs = async ()=>{
    const notify = toast.loading("Withdraw Winnings ...");
    try {
      const data = await WithdrawWinnings([{}]);
      toast.success("Winnings withdraw Successfully !" , {id: notify});
    } catch (err) {
      toast.error("Something went wrong try again" , {id: notify});
    }
  }
  if (!address) return (<Login/>)
  if(isLoading)return(<Loading />)
  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col">
      <Head>
        <title>CYRPTO LOTTARY</title>
      </Head>
      <div className="flex-1">
      <Header />
      <Marquee className="bg-[#127465]" gradient={false} speed={100}>
        <div>
          <h4>Last Winner ... </h4>
          <h4></h4>
        </div>
      </Marquee>

      {winnings > 0 && (
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5" > 
          <button onClick = {onWithdrawWinnigs} className="p-5 bg-gradient-to-br from-[#21011e] to-emerald-600 animate-pulse text-center rounded-xl w-full">
            <p className="font-bold text-white" > WINNER WINNER CHICKEN DINNER !!! </p>
            <p className="font-bold text-white" > Total: {ethers.utils.formatEther(winnings.toString())}{""}{currency} </p>
            <br />
            <p className="font-sembold text-white" > Click Here To Withdraw</p>
          </button>
        </div>
      )}
      <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5 ">
        <div className="stats-container">
          <h1 className="text-5xl text-white fond-bold text-center">The Next Draw</h1>
          <div className="flex justify-between p-2 space-x-2">
            <div className="stats">
              <h2 className="text-sm">Total Pool</h2>
              <p className="text-xl"> {currentWiningReward && ethers.utils.formatEther(currentWiningReward?.toString())}{""}{currency} </p>
            </div>
            <div className="stats">
              <h2 className="text-sm">Tickets Remaning</h2>
              <p className="text-xl"> {remainingTickets?.toNumber()} </p>
            </div>
          </div>
          <div className="mt-5 mb-3">
            <CountDown />
          </div>
        </div>
        <div className="stats-container space-y-2">
          <div className="stats-container">
            <div className="flex justift-between items-center text-white pb-2">
              <h2>Price Per Ticket</h2>
              <p> {ticketPrice && ethers.utils.formatEther(ticketPrice?.toString())}{""}{currency} </p>
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
              <div className="flex items-center justify-between text-emerald-300 text-sm italic font-extrabold">
                <p> Total Cost Of Tickets </p>
                <p> {ticketPrice && Number(ethers.utils.formatEther(ticketPrice?.toString()))*quantity}{""}{currency}</p>
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
            <button
            disabled={expiration?.toString() < Date.now().toString() || remainingTickets?.toNumber() === 0}
            onClick={handleClick}
            className="mt-5 w-full bg-gradient-to-br from-[#21011e] to-emerald-600
            px-10 py-5 rounded-md font-semibold text-white shadow-xl disabled:from-gray-600
            disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed">Buy {quantity} Tickets for {""}{
              ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity}{""}{currency}
              </button>
          </div>
          {userTickets > 0 && <div className="stats">
            <p className="text-lg mb-2">you have {userTickets} tickets in this draw </p>
            <div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2">
              {Array(userTickets).fill("").map((_,index)=>(
              <p key={index} 
              className="text-emerald-300 h-20 w-12 bg-emerald-500/30 rounded-gl flex flex-shrink-0 items-center justify-center text-xs italic">{index+1}</p>))}
            </div>
            </div>}
        </div>
        </div>
      </div>
      <footer className="border-t border-emerald-500/20 flex items-center text-white justify-between p-5">
        <img className="h-10 w-10 filter hue-rotate-90 opacity-20 rounded-full" src="" alt=""/>
        <p className="text-xs text-white bold pl-5"> WARNING: People under the age of 18 are not allowed to gamble, please leave the site if you are under the age of 18. 
        In addition, gambling online is a risk that you take on your own, and our site does not accept responsibility for any consequences. </p>
      </footer>
      </div>
  )
}

export default Home
