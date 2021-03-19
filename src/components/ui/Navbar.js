import React from 'react'

export const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                Pedro
            </span>
            <button className="btn btn-outline-danger"> {/* boton de salir */}
                <i className="fas fa-sign-out-alt"></i> {/*icono de salir */}
                <span>Salir</span>
            </button>
        </div>
    )
}
