import React from 'react'
import './home.css'

export default function Home({setLoginUser}){
    return(
        <div className='homepage'>
            <h1>Homepage</h1>
            <div className='button' onClick={setLoginUser({})}>Logout</div>
        </div>
    );
}