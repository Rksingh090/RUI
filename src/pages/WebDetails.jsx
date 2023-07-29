import React, { useState } from 'react'
import "../styles/webdetails.css";
import { Link } from 'react-router-dom';
import TabBox from '../components/common/TabBox';

const WebDetails = () => {

    const [tabIdx, setTabIdx] = useState(0);

    return (
        <div className="withPadding webDetailsPage">
            <div className="mainWebGrid">
                <div className="webDetailCol1 withShadow roundSM">
                    <div className="webDetailItem">
                        <p className="fw500 head">Name: </p>
                        <p>MyNodeApp</p>
                    </div>
                    <div className="webDetailItem">
                        <p className="fw500 head">Image: </p>
                        <p>NodeImage</p>
                    </div>
                    <div className="webDetailItem">
                        <p className="fw500 head">Container: </p>
                        <p>NodeImageContainer</p>
                    </div>
                    <div className="webDetailItem">
                        <p className="fw500 head">Container Id: </p>
                        <p>5472w4344sdg241sd24g</p>
                    </div>
                    <div className="webDetailItem">
                        <p className="fw500 head">Exposed Port: </p>
                        <p>4000</p>
                    </div>
                    <div className="webDetailItem">
                        <p className="fw500 head">Container Port: </p>
                        <p>45254</p>
                    </div>
                    <div className="webDetailItem">
                        <p className="fw500 head">Container IP: </p>
                        <p>172.17.0.3</p>
                    </div>
                    <div className="webDetailItem">
                        <p className="fw500 head">Nginx Config: </p>
                        <p>/var/etc/nginx/sites-available/mynodeapp.conf</p>
                    </div>
                    <div className="webDetailItem">
                        <p className="fw500 head">Link: </p>
                        <Link to='http://localhost:45254' target='_blank' className='primaryText'>localhost:45254</Link>
                    </div>
                </div>
                <div className="webDetailCol2  withShadow roundSM">
                    <div className="TabMenu scrollX">
                        <p className={`tab ${tabIdx === 0 ? "active" : ""}`} onClick={() => setTabIdx(0)}>Container Details</p>
                        <p className={`tab ${tabIdx === 1 ? "active" : ""}`} onClick={() => setTabIdx(1)}>Terminal</p>
                        <p className={`tab ${tabIdx === 2 ? "active" : ""}`} onClick={() => setTabIdx(2)}>Proxy (Domain)</p>
                        <p className={`tab ${tabIdx === 3 ? "active" : ""}`} onClick={() => setTabIdx(3)}>Environment</p>
                        <p className={`tab ${tabIdx === 4 ? "active" : ""}`} onClick={() => setTabIdx(4)}>Logs</p>
                        <p className={`tab ${tabIdx === 5 ? "active" : ""}`} onClick={() => setTabIdx(5)}>Nginx File</p>
                    </div>

                    <div className="allTabArea">
                        <TabBox show={tabIdx === 0}></TabBox>
                        <TabBox show={tabIdx === 1}></TabBox>
                        <TabBox show={tabIdx === 2}></TabBox>
                        <TabBox show={tabIdx === 3}></TabBox>
                        <TabBox show={tabIdx === 4}></TabBox>
                        <TabBox show={tabIdx === 5}></TabBox>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WebDetails