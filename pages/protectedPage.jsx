import React, { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Button } from 'reactstrap';

export default withPageAuthRequired(function ProtectedPage(){
    const [state, setState] = useState({ response: undefined, error: undefined, displayState: undefined });

    const fetchApi = async () => {
        try {
          const response = await fetch('/api/protected');
          const data = await response.json();

          setState(previous => ({ ...previous, response: data, error: undefined }))
        } catch (error) {
          setState(previous => ({ ...previous, response: undefined, error }))
        }
    };

    useEffect(() => {
        const getDisplayState = async () => {
            try {
              const response = await fetch('/api/displayState',
                {   method: 'POST',
                    body: JSON.stringify({ path: '/api/protected', method: 'GET'})
                }
              );
              const data = await response.json();
              setState(previous => ({ ...previous, displayState: data, error: undefined }))
            } catch (error) {
              setState(previous => ({ ...previous, displayState: undefined, error }))
            }
        }

        getDisplayState()
    }, [])

    return (
        <>
            <h1>Protected Page</h1>
            <Button className="mt-1"
                onClick={e => {
                    e.preventDefault()
                    fetchApi()
                }}
                data-testid="external-action"
                color={state.displayState?.enabled ? 'primary' : 'secondary'}
                disabled={!state.displayState?.enabled}
            >
              Fetch protected resource
            </Button>
            <div className="mt-3">
                {state.response?.msg}
            </div>
            <div>
                {state.displayState?.visible && <h3>This message is visible only to Executives</h3>}
            </div>
            {state.error && (
                <div className="mt-3">
                    {state.error}
                </div>
            )}
        </>
    )
})