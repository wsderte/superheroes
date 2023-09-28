import React from 'react'
import { Link } from 'react-router-dom';
import "./navbar.css"

export const Navbar = () => {
  return (
    <div className="header-wrap">
        <div className="header-box">
                <div className="header-nav">
                    <Link to="/">
                        <div className="header-but">HOME</div>
                    </Link>
                    <Link to="/create">
                        <div className="header-but">CREATE</div>
                    </Link> 
                </div>
        </div>
    </div>
  )
}
