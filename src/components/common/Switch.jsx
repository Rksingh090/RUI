import React from 'react'

const Switch = ({ title, value, onChange, classList }) => {
    return (
        <label className={`RToggleSwitch ${classList}`} title={title}>
            <input value={value} onChange={onChange} type="checkbox" />
            <span className="switch" />
        </label>
    )
}

export default Switch