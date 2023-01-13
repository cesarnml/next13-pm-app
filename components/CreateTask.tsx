'use client'

import Button from './Button'
import Modal from 'react-modal'
import { FormEvent, useState } from 'react'
import Input from './Input'

Modal.setAppElement('#app')

const CreateTask = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const [name, setName] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    closeModal()
  }
  return (
    <div>
      <Button intent='text' className='text-violet-600' onClick={openModal}>
        + Create New
      </Button>
      <div className='flex items-center justify-center px-6 py-8 transition-all duration-200 ease-in-out hover:scale-105'>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          overlayClassName='bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen'
          className='w-3/4 p-8 bg-white rounded-xl'
        >
          <h1 className='mb-6 text-3xl'>New Task</h1>
          <form className='flex items-center' onSubmit={handleSubmit}>
            <Input placeholder='project name' value={name} onChange={(e) => setName(e.target.value)} />
            <Button type='submit'>Create</Button>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default CreateTask
