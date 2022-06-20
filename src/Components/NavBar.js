import React, { useContext } from 'react'
import { useState } from 'react';
import UrlContext from '../Context/URLContext';
import titlelogo from './titlelogo.jpg';
const NavBar = () => {
    const [note, setNote] = useState({ word: "" });
    const context = useContext(UrlContext);
    const { UpdateUrl } = context;

    const handlesubmit = (e) => {
        e.preventDefault();
        UpdateUrl(note.word)
        console.log(note.word)
        setNote({ word: "" })
    }
    const onchange = (e) => {
        const val = e.target.value;
        setNote({ word: val });
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
                <div className="container-fluid">
                <img className='titleclass' src={titlelogo} alt="titlelogo" />
                    <a className="navbar-brand" href="/">ShopNow</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="/">Home</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input type="text" className="form-control" id="title" value={note.word} name="title" aria-describedby="emailHelp" onChange={e => onchange(e)} />
                            <button type="submit" className="btn btn-primary my-3" onClick={handlesubmit} ><i className="fa-solid fa-plus"></i>Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar