import React from 'react';
import { Spinner } from 'reactstrap'

export default function Loader({ isLoading }) {
    const spinnerClass = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100vh',
        zIndex: '2000',
        backgroundColor: 'rgb(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <div style={isLoading ? spinnerClass : { display: 'none' }}>
            <Spinner
                style={{ position: 'relative', top: '-30%' }} 
            />
        </div>
    )
}
