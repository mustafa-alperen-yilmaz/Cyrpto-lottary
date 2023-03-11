import React from 'react'
import {StarIcon , CurrencyDollarIcon , ArrowPathIcon , ArrowUturnDownIcon} from "@heroicons/react/24/solid"
import {useContract,useContractRead ,useContractWrite} from "@thirdweb-dev/react"
import {ethers} from "ethers"
import {currency} from '../constants'
import toast from "react-hot-toast";

function AdminControls() {
  const {contract, isLoading} = useContract(process.env.NEXT_PUBLIC_LOTTARY_CONTRACT_ADDRESS);
  const { data: operatorTotalCommission} = useContractRead(contract, "operatorTotalCommission")
  const { mutateAsync: DrawWinnerTicket} = useContractWrite(contract, "DrawWinnerTicket")
  const { mutateAsync: RefundAll} = useContractWrite(contract, "RefundAll")
  const { mutateAsync: restartDraw} = useContractWrite(contract, "restartDraw")
  const { mutateAsync: WithdrawCommission} = useContractWrite(contract, "WithdrawCommission")
  
  const drawWinner =async () => {
    const notify = toast.loading("Picking Winner ... ");
    try {
      const data = await DrawWinnerTicket([{}])
      toast.success("Winner Selected Successfuly",{id:notify})
    } catch (err) {
      toast.error("Something went wrong",{id:notify})
      console.error("contract failure",err)
    }
  }
  const onWithdrawComission =async () => {
    const notify = toast.loading("Withdarwing commission Winner ... ");
    try {
      const data = await WithdrawCommission([{}])
      toast.success("Your Comission get Successfuly",{id:notify})
      console.error("contract successed",data)
    } catch (err) {
      toast.error("Something went wrong",{id:notify})
      console.error("contract failure",err)
    }
  }
  const onRestartDraw =async () => {
    const notify = toast.loading("Restarting Draw ... ");
    try {
      const data = await restartDraw([{}])
      toast.success("Draw restarted Successfuly",{id:notify})
      console.error("contract successed",data)
    } catch (err) {
      toast.error("Something went wrong",{id:notify})
      console.error("contract failure",err)
    }
  }

  const onRefundAll =async () => {
    const notify = toast.loading("Refunding  ... ");
    try {
      const data = await RefundAll([{}])
      toast.success("All Refunded Successfuly",{id:notify})
      console.error("contract successed",data)
    } catch (err) {
      toast.error("Something went wrong",{id:notify})
      console.error("contract failure",err)
    }
  }
  return (
    <div className='text-white text-center px-5 py-3 rounded-md border-emerald-300/20 border'>
        <h2 className='font-bold'> Admin Controls </h2>
        <p className='mb-5'> Total Comission to be withdraw: {""} 
        {operatorTotalCommission && ethers.utils.formatEther(operatorTotalCommission?.toString())}{""}{currency}
        </p>
        <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
          <button onClick={drawWinner} className='admin-button'> <StarIcon className="h-6 mx-auto mb-2"/> Draw Winner</button>
          <button onClick={onWithdrawComission} className='admin-button'> <CurrencyDollarIcon className="h-6 mx-auto mb-2"/> Withdraw Comission</button>
          <button onClick={onRestartDraw} className='admin-button'> <ArrowPathIcon className="h-6 mx-auto mb-2"/> Restart Draw</button>
          <button onClick={onRefundAll} className='admin-button'> <ArrowUturnDownIcon className="h-6 mx-auto mb-2"/> Refund All</button>
        </div>
    </div>
  )
}

export default AdminControls