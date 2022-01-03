import React, { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Button } from 'reactstrap';
import styles from '../styles/ProtectedPage.module.css'

export default withPageAuthRequired(function ProtectedPage(){
    const [state, setState] = useState({ response: undefined, error: undefined, displayState: undefined });

    const fetchApi = async () => {
        try {
          const response = await fetch('/api/protected');
          const { status } = response
          const data = await response.json();

          setState(previous => ({ ...previous, response: data, error: undefined, status }))
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

    const { response, displayState, status, error } = state

    return (
        <div className={styles.main}>
            <div className={styles.topMain}>
                <div className={styles.pageHeader}>
                    <h1>Protected Page</h1>
                </div>
                <div>
                    <Button className="mt-1"
                        onClick={e => {
                            e.preventDefault()
                            fetchApi()
                        }}
                        data-testid="external-action"
                        // color="primary"
                        color={displayState?.enabled ? 'primary' : 'secondary'}
                        disabled={!displayState?.enabled}
                    >
                      Fetch protected resource
                    </Button>
                </div>

            </div>
            <div className={styles.centerMain}>
                <div className={styles.welcomeMessage}>
                    {displayState?.visible && <h6>This message is visible only to Executives</h6>}
                </div>

                <div className="mt-3">
                    {status !== 500 && status !== 403 && response?.msg &&
                        <div>
                            <div className={styles.lottie}></div>
                            <div>
                                {response.msg}
                            </div>
                        </div>
                    }
                    {status === 403 &&
                        <div>
                            <div className={styles.sadLottie}></div>
                            <div>
                                Access is forbidden for this user.
                            </div>
                        </div>
                    }
                    {status === 500 &&
                        <div>
                            <div className={styles.sadLottie}></div>
                            <div>
                                An error has occurred.
                            </div>
                        </div>
                    }
                </div>
            </div>
            {error && (
                <div className="mt-3">
                    {error}
                </div>
            )}
        </div>
    )
})