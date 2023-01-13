'use client'
import { createNewProject } from '@lib/api'
import { FormEvent, useState } from 'react'
import Modal from 'react-modal'
import Button from './Button'
import Input from './Input'

Modal.setAppElement('#app')

const CreateProject = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const [name, setName] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createNewProject(name)
    closeModal()
  }

  return (
    <div className='flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-105'>
      <Button onClick={openModal}>+ New Project</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName='bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen'
        className='w-3/4 p-8 bg-white rounded-xl'
      >
        <h1 className='mb-6 text-3xl'>New Project</h1>
        <form className='flex items-center' onSubmit={handleSubmit}>
          <Input placeholder='project name' value={name} onChange={(e) => setName(e.target.value)} />
          <Button type='submit'>Create</Button>
        </form>
      </Modal>
    </div>
  )
}

export default CreateProject
