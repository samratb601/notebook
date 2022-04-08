import React from 'react'

const Alert = (props) => {
    return (
    
            <div class={`alert alert-${props.alertType} alert-dismissible`} role="alert">
                <strong>Success!</strong> {props.alertMsg}
                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>    */}
            </div>
     

    )
}

export default Alert;