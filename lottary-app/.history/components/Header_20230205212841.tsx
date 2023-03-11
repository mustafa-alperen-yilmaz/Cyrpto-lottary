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
            <img className="rounded-full h-20 w-20" src="https://en.wikipedia.org/wiki/Template:Warning_icon#/media/File:Nuvola_apps_important.svg" alt="user icon" />
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