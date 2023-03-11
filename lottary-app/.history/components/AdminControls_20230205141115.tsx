import React from 'react'
import {StartIcon , CurrencyDollarIcon , ArrowPathIcon , ArrowUturnDownIcon} from "@heroicons/react/24/solid"

function AdminControls() {
  return (
    <div className='text-white'>
        <h2> Admin Controls </h2>
        <p> Total Comission to be withdraw: ... </p>
        <div className='flex flex-col space-y-2'>
          <button> <StartIcon className="h6 mx-auto mb-2"/> Draw Winner</button>
          <button> <CurrencyDollarIcon className="h6 mx-auto mb-2"/> Withdraw Comission</button>
          <button> <ArrowPathIcon className="h6 mx-auto mb-2"/> Restart Draw</button>
          <button> <ArrowUturnDownIcon className="h6 mx-auto mb-2"/> Refund All</button>
        </div>
    </div>
  )
}

export default AdminControls