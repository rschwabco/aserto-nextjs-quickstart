import React, { useEffect, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Button, Modal, ModalBody } from 'reactstrap'

export default withPageAuthRequired(function DisplayState(){
    const [state, setState] = useState({ response: undefined, error: undefined });
    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    useEffect(() => {
        const getDisplayState = async () => {
            try {
              const response = await fetch('/api/displayState',
                {   method: 'POST',
                    body: JSON.stringify({ path: '/api/protected', method: 'GET'})
                }
              );
              const data = await response.json();
              setState(previous => ({ ...previous, response: data, error: undefined }))
            } catch (error) {
              setState(previous => ({ ...previous, response: undefined, error }))
            }
        }

        getDisplayState()
    }, [])

    return (
        <>
            <h1>Display State</h1>
            <div className="mt-3">
                <Button color={state.response?.enabled ? 'primary' : 'secondary'}
                disabled={!state.response?.enabled} onClick={() => {setIsModalOpen(true)}} >Press me if you can</Button>
                {state.response?.visible && <h3>This message is visible only to Executives</h3>}
            </div>
            {state.error && (
                <p className="mt-3">
                    {state.error}
                </p>
            )}

            <Modal isOpen={isModalOpen} keyboard={true} toggle={toggleModal} backdrop={true}>
                <ModalBody>
                    Hello
                </ModalBody>
            </Modal>
        </>
    )
})