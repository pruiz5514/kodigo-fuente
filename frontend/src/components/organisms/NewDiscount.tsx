import { useState } from 'react'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import DiscountForm from './DiscountForm'

interface INewDiscountProps {
  onCreated?: () => void
}

const NewDiscount = ({ onCreated }: INewDiscountProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='w-full flex justify-end'>
        <Button label='Crear descuento' onClick={() => setIsModalOpen(true)}></Button>

        {isModalOpen && (
          <Modal closeModal={() => setIsModalOpen(false)}>
            <DiscountForm
              cancelButton={() => setIsModalOpen(false)}
              onCreated={onCreated}
            />
          </Modal>
        )}
    </div>
  )
}

export default NewDiscount
