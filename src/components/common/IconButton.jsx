import React from 'react'

const IconButton = ({ Icon, text, classList }) => {
  return (
    <button className={`iconBtn flexRow center ${classList}`}>
      {Icon}
      <span>{text}</span>
    </button>
  )
}

export default IconButton