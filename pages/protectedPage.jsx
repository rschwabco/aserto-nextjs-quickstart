import React, { useState, useEffect } from 'react';
import styles from '../styles/ProtectedPage.module.css'

export default function ProtectedPage(){
    return (
        <div className={styles.main}>
            <div className={styles.topMain}>
                <div className={styles.pageHeader}>
                    <h1>Protected Page</h1>
                </div>
                <div>
                    {/* Button to be added here */}
                </div>

            </div>
            <div className={styles.centerMain}>
                <div className={styles.welcomeMessage}>
                    {/* `visible` message to be added here */}
                </div>

                <div className="mt-3">
                   {/* Access messages to be added here */}
                </div>

                <div className="mt-3">
                   {/* Error message to be added here */}
                </div>
            </div>

        </div>
    )
}