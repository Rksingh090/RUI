import React from 'react'
import { useWeb } from '../../context/WebContext';

import IconButton from '../common/IconButton'

import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai'



const ProxyDomainTab = () => {

    const {
        singleWeb: { domains },
        changeModalState,
        deleteProxyDomain
    } = useWeb();

    return (
        <div className="proxyDomainsTab">

            <div className="flexRow gapMD">
                <IconButton
                    onClick={() => changeModalState({ domainModal: true })}
                    type={"button"}
                    Icon={<AiOutlinePlus size={15} />}
                    text={"Add More"}
                    classList={"secondaryBg roundSM gapSM fontSM"}
                />
            </div>

            <div className="proxyDomains">
                <p>Sr. No.</p>
                <p>Domain</p>
                <p>Created At</p>
                <p>Action</p>
            </div>

            {
                domains &&
                domains.length > 0 &&
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
                            <a href={domainLink} target='_blank'>{domainLink}</a>
                            <p>{domain.created_at}</p>
                            <div style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                cursor: "pointer"
                            }}>
                                <AiOutlineDelete onClick={() => deleteProxyDomain(domain?._id)} size={15} />
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