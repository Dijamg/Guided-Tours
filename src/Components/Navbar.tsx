import React from 'react'
import {
    NavLink
  } from 'react-router-dom'

const Navbar = () => {
    const activeStyle = {
        backgroundColor: '#2196F3',
        color: 'white'
    }

    return (
        <div className="topnav">
            <NavLink activeStyle={activeStyle} to="POIs">POIs</NavLink>
            <NavLink activeStyle={activeStyle} to="Tours">Tours</NavLink>
            <div className="login-container">
                <form action="/action_page.php">
                    <input type="text" placeholder="Username" name="username"/>
                    <input type="text" placeholder="Password" name="psw"/>
                    <button type="button">Login</button>
                </form>
            </div>
        </div>
        
    )
}

export default Navbar 