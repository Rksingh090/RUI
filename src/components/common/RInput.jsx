import React from 'react'

const RInput = ({
    placeholder,
    value,
    onChange,
    classList,
    RClass,
    Icon,
    width
}) => {
    return (
        <div 
        className={`RInput ${RClass || ""}`}
        style={{
            width: width || "100%"
        }}
        >
            {Icon && Icon}
            <input placeholder={placeholder} value={value} onChange={onChange} className={`${classList || ""}`} />
        </div>
    )
}

export default RInput