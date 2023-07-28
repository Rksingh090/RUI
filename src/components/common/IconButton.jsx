import React from 'react'

const IconButton = ({ type, Icon, text, classList }) => {
  return (
    <button type={type || "button"} className={`iconBtn flexRow center ${classList || ""}`}>
      {Icon}
      <span>{text}</span>
    </button>
  )
}

export default IconButton