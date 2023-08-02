import React from 'react'

const RModal = ({ children,formClass, show, width, height }) => {
    return (<>
        {
            show && (
                <div className={"RModal"}  >
                    <div className={`modalForm ${formClass}`} style={{width: width || "500px", height: height || "400px"}}>
                        {children}
                    </div>
                </div>
            )
        }
    </>
    )
}

export default RModal