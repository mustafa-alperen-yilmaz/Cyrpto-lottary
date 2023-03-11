import React from 'react'
import {useMetamask} from "@thirdweb-dev/react"

function Login() {
    const metaMask = useMetamask();
  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center mb-10">
            <img className="rounded-full h-56 wo-56 mb-10" src="" alt="" />
            <h1 className="text-6xl text-white fond-bold"> If You're Want To Win, Wellcome The Lottary </h1>
            <h2 className="text-white fond-bold">Firstly Login With MetaMask Please ..! </h2>
            <button onClick={metaMask} className="bg-white px-8 py-5 mt-10 rounded-lg shadow-lg font-blod" >Login With MetaMask</button>
        </div>
    </div>
  )
}

export default Login