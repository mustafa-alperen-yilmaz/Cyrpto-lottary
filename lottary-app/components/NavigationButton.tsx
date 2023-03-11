import React from 'react'

interface Props {
  title: string;
  isButtonActive?: boolean;
  onClick?: ()=> void;
}

function NavigationButton({title , isButtonActive , onClick}: Props) {
  return <button 
  onClick={onClick}
  className={`${isButtonActive && 'bg-[#A020F0]'} hover:bg-[#A020F0] text-white py-2 px-4 rounded font-bold `}>
    {title}
  </button>
}

export default NavigationButton