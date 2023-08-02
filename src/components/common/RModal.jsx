import React from 'react'

const RModal = ({ show }) => {
    return (<>
        {
            show ? (
                <div className={"RModal"}  >

                </div>
            ) : (
                <span></span>
            )
        }
    </>
    )
}

export default RModal