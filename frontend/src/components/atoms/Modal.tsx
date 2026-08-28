'use client'

import { useEffect, type ReactNode } from "react"
import CloseModalButton from "./CloseModalButton"



interface IModalProps {
  children: ReactNode
  closeModal: () => void
  widthClass?: string
  heightClass?: string
  scrollClass?:string
  bg?: string
}

const Modal: React.FC<IModalProps> = ({
  children,
  closeModal,
  widthClass = "max-w-[640px] min-w-[300px]",
  heightClass = "min-h-[542px]",
  scrollClass,
  bg= "bg-white"
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center px-8">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />
        <div
          className={`relative w-full ${widthClass} ${heightClass} ${scrollClass} ${bg} rounded-[14px] px-[24px] pt-[22px] pb-[14px] shadow-lg`}>
            <div className='flex justify-end'>
                <CloseModalButton onClick={closeModal}/>
            </div>
          {children}
        </div>
    </div>
  )
}

export default Modal
