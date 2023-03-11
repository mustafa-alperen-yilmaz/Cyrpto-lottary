import React from 'react'
import NavigationButton from './NavigationButton'
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import {useAddress,useDisconnect} from "@thirdweb-dev/react"
import icon from "../asset/ikon.png"

function Header() {
  const address = useAddress();
  const dc = useDisconnect();
  return (
    <header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5">
        <div className='flex items-center space-x-2'>
            <img className="rounded-full h-20 w-20" src="data:image/jpeg;base64,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" alt="user icon" />
            <div>
                <h1 className='text-lg text-white font-bold'>
                    ARE YOU LUCKY GET IN THE LOTTARY
                </h1>
                <p className='text-xs text-purple-600 truncate'>
                  USER => {address?.substring(0,5)}...{address?.substring(address.length,address.length-5)}
                  </p>
            </div>
        </div>
        <div className="hidden md:flex md:col-span-3 items-center justfy-center rounded-md">
          <div className="bg-[#006978] p-4 space-x-2">
            <NavigationButton isButtonActive title='BUY TICKETS'/>
            <NavigationButton onClick={dc}  title='LOGOUT'/>
          </div>
        </div>
        <div className='flex flex-col ml-auto text-right'>
          <Bars3BottomRightIcon className="h-8 w-8 mx-auto text-white cursor-pointer" />
          <span className="md:hidden">
          <NavigationButton onClick={dc} title="Logout" />
        </span>
        </div>
    </header>
  )
}

export default Header