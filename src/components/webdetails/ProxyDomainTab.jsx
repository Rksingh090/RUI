import React from 'react'
import { useWeb } from '../../context/WebContext';

import IconButton from '../common/IconButton'

import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai'
import { BiLockOpenAlt, BiLockAlt } from 'react-icons/bi'

import Switch from '../common/Switch';



const ProxyDomainTab = () => {

    const {
        singleWeb: { domains },
        changeModalState,
        deleteProxyDomain
    } = useWeb();

    return (
        <div className="proxyDomainsTab">

            <div className="flexRow gapMD">
                {
                    domains?.length < 1 && (
                        <IconButton
                            loading={false}
                            loadingSize={15}
                            onClick={() => changeModalState({ domainModal: true })}
                            type={"button"}
                            Icon={<AiOutlinePlus size={15} />}
                            text={"Add Domain"}
                            classList={"hoverMain secondaryBg roundSM gapMD fontSM"}
                        />
                    )
                }

                {
                    domains.length > 0 && (

                        <IconButton
                            loading={false}
                            loadingSize={15}
                            type={"button"}
                            Icon={<BiLockAlt size={15} />}
                            text={"Enable SSL"}
                            classList={"hoverSuccess secondaryBg roundSM gapMD fontSM"}
                        />
                    )
                }

                {
                    domains.length > 0 && (
                        <IconButton
                            loading={false}
                            loadingSize={15}
                            type={"button"}
                            Icon={<BiLockOpenAlt size={15} />}
                            text={"Disable SSL"}
                            classList={"hoverError secondaryBg roundSM gapMD fontSM"}
                        />
                    )
                }


            </div>

            {
                domains?.length >= 1 && (
                    <div className="proxyDomains">
                        <p>Sr. No.</p>
                        <p>Domain</p>
                        <p>Created At</p>
                        <p>Action</p>
                    </div>
                )
            }
            {
                domains &&
                domains?.length > 0 &&
                domains.map((domain, idx) => {

                    let domainLink = "http://";
                    if (!String(domain?.domain).includes("http://")) {
                        domainLink += domain?.domain
                    } else {
                        domainLink = domain?.domain
                    }

                    return (
                        <div className="proxyDomains" key={domain?._id}>
                            <p>{idx + 1}</p>
                            <a href={domainLink} target='_blank' rel='noopener'>{domainLink}</a>
                            <p>{domain.created_at}</p>
                            <div
                                className='flexRow gapMD'
                                style={{
                                    paddingLeft: "5px",
                                    paddingRight: "5px",
                                    cursor: "pointer"
                                }}>
                                <AiOutlineDelete onClick={() => deleteProxyDomain(domain?._id)} size={17} />
                            </div>
                        </div>
                    )
                }
                )
            }
        </div>
    )
}

export default ProxyDomainTab