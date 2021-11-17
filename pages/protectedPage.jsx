import React, { useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Button } from 'reactstrap';

export default withPageAuthRequired(function ProtectedPage(){
    const [state, setState] = useState({ response: undefined, error: undefined });

    const fetchApi = async () => {
        try {
          const response = await fetch('/api/protected');
          const data = await response.json();

          setState(previous => ({ ...previous, response: data, error: undefined }))
        } catch (error) {
          setState(previous => ({ ...previous, response: undefined, error }))
        }
    };
    return (
        <>
            <h1>Protected Page</h1>
            <Button color="primary" className="mt-1" onClick={e => {
                e.preventDefault()
                fetchApi()
            }} data-testid="external-action">
              Fetch protected resource
            </Button>
            <p className="mt-3">
                {state.response?.msg}
            </p>
            {state.error && (
                <p className="mt-3">
                    {state.error}
                </p>
            )}
        </>
    )
})