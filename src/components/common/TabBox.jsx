import React from 'react'

const TabBox = ({ show, children }) => {
    return (
        <>
            {show && children}
        </>
    )
}

export default TabBox