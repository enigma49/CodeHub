import React, { Fragment } from "react";

const Err404 = () =>{

    return(
        <Fragment>
            <h1 className="x-large text-primary">
                <i className="fas fa-exclamation-triangle"></i> You seem lost
            </h1>
            <p className="large">This Page Does Not Exists</p>
        </Fragment>
    )

}

Err404.propType = {}

export default Err404;