import React from 'react'
import { TbLoader2 } from "react-icons/tb";

const WithLoading = ({
  children,
  min,
  max,
  width,
  height,
  spinnerSize,
  loading,
  classList
}) => {
  return (
    <>
      {
        loading ? (
          <div
          className={`withLoading ${classList}`}
            style={{
              minHeight: min || "auto",
              maxHeight: max || "auto",
              height: height || "100%",
              width: width || "100%",
            }}
          >
            <TbLoader2 className='spinner' size={spinnerSize || 20} />
          </div>
        )
          :
          (
            <>
              {children}
            </>
          )
      }
    </>
  )
}

export default WithLoading