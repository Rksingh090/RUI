import React, { useEffect } from 'react'

import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WS_URL } from '../../constants';
import "xterm/css/xterm.css";
import { useMemo } from 'react';
import { useWeb } from '../../context/WebContext';

const TerminalTab = ({ id }) => {


    const terminalRef = React.useRef(null);
    const {isRebuilding} = useWeb();

    const term = useMemo(() => new Terminal({
        cursorBlink: true,
        fontSize: 12,
        fontWeight: 300,
        fontWeightBold: 500,
        cols: 50,
        rows: 50,
        lineHeight: 1.35,
        fontFamily: "Fira Code"
    }), []);

    const websocket = useMemo(() => new WebSocket(`${WS_URL}/v1/docker/container-exec/${id}`), [id]);
    websocket.binaryType = "arraybuffer";


    function ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    }

    websocket.onopen = function (evt) {
        term.onData(function (data) {
            websocket.send(new TextEncoder().encode("\x00" + data));
        });

        term.onResize(function (resEvent) {
            websocket.send(new TextEncoder().encode("\x01" + JSON.stringify({ cols: resEvent.cols, rows: resEvent.rows })))
        });

        term.onTitleChange(function (title) {
            document.title = title;
        });
    }

    //OnData  
    websocket.onmessage = function (evt) {
        if (evt.data instanceof ArrayBuffer) {
            term.write(ab2str(evt.data));
        } else {
            term.write(evt.data);
        }
    }

    websocket.onclose = function (evt) {
        term.write("Session terminated");
        term.dispose();
    }

    websocket.onerror = function (evt) {
        if (typeof console.log == "function") {
            term.write("Error: " + evt.data);
        }
    }

    React.useEffect(() => {
        if (!terminalRef.current) return;
        if(isRebuilding){
            websocket.close();
            term.dispose()
        }else{
            term.open(terminalRef.current);
            const fitAddon = new FitAddon();
            term.loadAddon(fitAddon);
            fitAddon.fit();
        }

        return () => {
            term.dispose();
            websocket.close();
        }
    }, [isRebuilding, terminalRef, term]);

    return (
        <div className='terminalTab'>
            <div className="XtermTerminal roundSM" ref={terminalRef}>

            </div>
        </div>
    )
}

export default TerminalTab