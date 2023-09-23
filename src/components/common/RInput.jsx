import React from 'react'

const RInput = ({
    placeholder,
    value,
    onChange,
    classList,
    RClass,
    Icon,
    width,
    type,
    autoFocus,
    end,
    inputProps
}) => {
    return (
        <div
            className={`RInput ${RClass || ""}`}
            style={{
                width: width || "100%"
            }}
        >
            {(Icon && !end) && Icon}
            <input
                type={type || "text"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`${classList || ""}`}
                autoFocus={autoFocus || false}
                {...inputProps}
            />
            {(Icon && end) && Icon}
        </div>
    )
}

export default RInput