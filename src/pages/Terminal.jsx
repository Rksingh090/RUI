import React, { useEffect, useMemo, useRef } from 'react'

import "../styles/terminal.css";

import { Terminal as Xterm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import { WS_URL } from '../constants';
import "xterm/css/xterm.css";

const Terminal = () => {
  const xtermRef = useRef(null);

  const websocket = useMemo(() => new WebSocket(`${WS_URL}/v1/terminal/ws`), []);
  websocket.binaryType = "arraybuffer";


  const xterm = useMemo(() => new Xterm({
    cursorBlink: true,
    fontSize: 12,
    fontWeight: 400,
    fontWeightBold: 600,
    cols: 50,
    rows: 50,
    lineHeight: 1.35
  }), []);

  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }

  websocket.onopen = function (evt) {

    xterm.onData(function (data) {
      websocket.send(new TextEncoder().encode("\x00" + data));
    });

    xterm.onResize(function () {
      websocket.send(new TextEncoder().encode("\x01" + JSON.stringify({ cols: evt.cols, rows: evt.rows })))
    });

    xterm.onTitleChange(function (title) {
      document.title = title;
    });

    //OnData  
    websocket.onmessage = function (evt) {
      if (evt.data instanceof ArrayBuffer) {
        xterm.write(ab2str(evt.data));
      } else {
        xterm.write(evt.data);
      }
    }

    websocket.onclose = function (evt) {
      xterm.write("Session terminated");
      xterm.dispose();
    }

    websocket.onerror = function (evt) {
      if (typeof console.log == "function") {
        xterm.write("Error: " + evt.data);
      }
    }
  }

  useEffect(() => {
    if (!xtermRef.current) return;
    let fitAddon = new FitAddon();
    fitAddon.activate();
    xterm.loadAddon(fitAddon)
    xterm.open(xtermRef?.current)
    fitAddon.fit();
  }, [xterm])

  window.addEventListener('resize', () => {
    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);
    fitAddon.fit();
  });

  return (
    <div className='fullXY withPadding terminalPage' >
      <div className="XtermTerminal roundSM" ref={xtermRef}>

      </div>
    </div>
  )
}

export default Terminal