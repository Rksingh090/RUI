import React, { useState } from 'react'
import TabBox from '../components/common/TabBox';

import "../styles/settings.css";
import RInput from '../components/common/RInput';

import { PiPasswordLight } from "react-icons/pi"
import { CiLock } from "react-icons/ci";

import IconButton from '../components/common/IconButton';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ValidThemes } from '../config/themes';
import FixedFooter from '../components/common/FixedFooter';

const Settings = () => {
    const [tabIndex, setTabIndex] = useState(1);

    const { setNamedTheme } = useTheme();

    return (
        <div className='fullXY withPadding settingPage'>
            {/* Settings */}
            <div className="TabMenu">
                {/* <p className={`tab ${tabIndex === 0 ? "active" : ""}`} onClick={() => setTabIndex(0)}>Profile</p> */}
                <p className={`tab ${tabIndex === 1 ? "active" : ""}`} onClick={() => setTabIndex(1)}>Users</p>
                <p className={`tab ${tabIndex === 2 ? "active" : ""}`} onClick={() => setTabIndex(2)}>Password</p>
                <p className={`tab ${tabIndex === 3 ? "active" : ""}`} onClick={() => setTabIndex(3)}>Info</p>
                <p className={`tab ${tabIndex === 4 ? "active" : ""}`} onClick={() => setTabIndex(4)}>Themes</p>
            </div>

            {/* <TabBox show={tabIndex === 0}>
                <form className="padYSM profileTab">
                    <RInput placeholder={"Name"} Icon={<PiTextAUnderlineDuotone size={18} />} width={"300px"} RClass={"withShadow roundSM"} />
                    <RInput placeholder={"Email"} Icon={<MdOutlineAlternateEmail size={18} />} width={"300px"} RClass={"withShadow roundSM"} />
                    <IconButton text={"Update"} classList={"withShadow round primaryBg"} />
                </form>
            </TabBox> */}
            <TabBox show={tabIndex === 1}>
                <div className="padYSM">
                    <h2>Users</h2>
                </div>
            </TabBox>
            <TabBox show={tabIndex === 2}>
                <form className="padYSM profileTab">
                    <h4>Change Password</h4>
                    <RInput placeholder={"Current Password"} Icon={<PiPasswordLight size={18} />} width={"300px"} RClass={"withShadow roundSM"} />
                    <RInput placeholder={"New Password"} Icon={<CiLock size={18} />} width={"300px"} RClass={"withShadow roundSM"} />
                    <RInput placeholder={"Confirm Password"} Icon={<CiLock size={18} />} width={"300px"} RClass={"withShadow roundSM"} />

                    <IconButton text={"Submit"} classList={"withShadow round primaryBg"} />
                </form>
            </TabBox>
            <TabBox show={tabIndex === 3}>
                <div className="padYSM">
                    <h4>Panel Info</h4>
                    <div className='settingInfoTab'>
                        <table className='RTable gridTwo bordered zebra '>
                            <tbody>
                                <tr>
                                    <td>Installed Version</td>
                                    <td>v1.0.0</td>
                                </tr>
                                <tr>
                                    <td>Developed By</td>
                                    <td>Rishab Singh</td>
                                </tr>
                                <tr>
                                    <td>Git Profile</td>
                                    <td><Link to="https://github.com/Rksingh090" target='_blank' className='Rlink primaryText' >https://github.com/Rksingh090</Link></td>
                                </tr>
                                <tr>
                                    <td>Contact</td>
                                    <td><Link to="tel:+91 9022489938" className='Rlink primaryText' >9022489938</Link></td>
                                </tr>
                                <tr>
                                    <td>Mail</td>
                                    <td><Link to="mailto:w3b.dev.rishu@gmail.com" className='Rlink primaryText' >w3b.dev.rishu@gmail.com</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </TabBox>

            <TabBox show={tabIndex === 4}>
                <div className='padYSM'>
                    <div className='allThemeBoxes'>
                        {
                            ValidThemes.map((theme, idx) => (
                                <div
                                    key={idx}
                                    className={`themeBox ${theme?.title}`}
                                    style={{
                                        color: theme?.color,
                                        backgroundColor: theme?.background
                                    }}
                                    onClick={() => setNamedTheme(theme?.title)}>
                                    {theme?.text}

                                </div>
                            ))
                        }
                    </div>
                </div>
            </TabBox>

            <FixedFooter />
        </div>
    )
}

export default Settings