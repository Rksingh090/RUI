import React, { useEffect, useState } from 'react'

const CircleBar = ({ percent, type, customUnit, maxValue }) => {
    
    const [percentCal, setPercentCal] = useState(0);
    useEffect(() => {
        if(type ==="value") {
            let max = maxValue || 100;
            let calcVal = percent * 100 / max;
            setPercentCal(Math.round(calcVal));

        }else{
            setPercentCal(percent)
        }
    },[percent, maxValue, type])


    useEffect(() => {
        setInterval(() => {
            setPercentCal(Math.random() * 100)
        }, 5000)
    }, [])

    return (
        <div id="progressBar">
            <svg id='bar' viewBox="0 0 110 100">
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
                    <stop offset="0%" stopColor="#56c4fb" />
                    <stop offset="100%" stopColor="#0baeff" />
                </linearGradient>
                <path className="grey" d="M30,90 A40,40 0 1,1 80,90" fill='none' />
                <path style={{
                    "--percent": percentCal
                }} id="blue" fill='none' className="blue" d="M30,90 A40,40 0 1,1 80,90" />
            </svg>
            <p className='progressText'>{percent} / {type === "value" ? maxValue : 100 }{type !== "value" && "%"} {customUnit && customUnit}</p>
        </div>
    )
}

export default CircleBar