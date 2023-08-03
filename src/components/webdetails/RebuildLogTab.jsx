import React, { useEffect, useRef } from 'react'
import { useWeb } from '../../context/WebContext'

const RebuildLogTab = () => {
    const { rebuildLog } = useWeb();
    const messagesEndRef = useRef(null);
    useEffect(() => {
        const scrollToBottom = () => {
            if (messagesEndRef.current) {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
            }
        }
        scrollToBottom()
    }, [rebuildLog?.length])

    return (
        <div className='containerDetailTab roundSM rebuildLogs'>
            {
                rebuildLog &&
                rebuildLog.length > 0 &&
                rebuildLog.map((rlog, idx) => (
                    <p key={idx}>{rlog.message}</p>
                ))
            }
            <span ref={messagesEndRef}></span>
        </div>
    )
}

export default RebuildLogTab