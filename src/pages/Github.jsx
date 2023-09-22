import React, { useEffect, useRef } from 'react';

import '../styles/github.css';
import IconButton from '../components/common/IconButton';

import { FiGithub } from 'react-icons/fi';
import { TbLivePhoto } from 'react-icons/tb';
import { PiBracketsCurly } from 'react-icons/pi';
import { BiLockAlt } from 'react-icons/bi';


import { useGithub } from '../context/GithubContext';
import WithLoading from '../components/common/WithLoading';

import { Link } from 'react-router-dom'

const Github = () => {
    const openNewTab = () => {
        window.open("https://github.com/apps/rpanel/installations/new", "_blank")
    }

    window.closeParent = function () {
        window.location.reload()
    }

    const { repoLoaded, isLoading, isConfigured, allRepositories, getAllRepositories } = useGithub();

    useEffect(() => {
        if (!repoLoaded) {
            getAllRepositories()
        }
    }, [repoLoaded])




    return (
        <div className='fullXY withPadding githubPage'>
            <div className='githubContainer withShadow roundSM padSM'>
                <WithLoading loading={isLoading} spinnerSize={35}>
                    {!isConfigured && (
                        <div className="fullXY flexCenter">
                            <IconButton
                                onClick={openNewTab}
                                Icon={<FiGithub size={20} />}
                                text={"Configure Github"}
                                classList={"gapMD secondaryBg hoverMain changeSVG roundSM padSM"}
                                style={{
                                    padding: "10px 15px"
                                }}
                            />
                        </div>
                    )}
                    {isConfigured && (
                        <div className='GithubRepoContainer'>
                            <table className='RTable gapSM zebra noWrap'>
                                <thead>
                                    <tr>
                                        <th>Git Repo No.</th>
                                        <th>Repository</th>
                                        <th>Created At</th>
                                        <th>Language</th>
                                        <th>Visiblity</th>
                                        <th>Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allRepositories &&
                                        allRepositories?.length > 0 &&
                                        allRepositories?.map((repo) => (
                                            <tr key={repo.id}>
                                                <td>{repo?.id}</td>
                                                <td>{repo?.name}</td>
                                                <td>{new Date(repo?.created_at).toDateString()}</td>
                                                <td>{repo?.language}</td>
                                                <td >
                                                    {
                                                        repo?.visibility === "private"
                                                        &&
                                                        <BiLockAlt title={repo?.visibility} size={18} />
                                                    }
                                                </td>
                                                <td className='flexRow gapSM'>
                                                    <Link to={repo.clone_url} target={'_blank'}>
                                                        <PiBracketsCurly size={18} />
                                                    </Link>
                                                    {
                                                        repo.homepage &&
                                                        <Link to={repo.homepage} target={'_blank'}>
                                                            <TbLivePhoto size={18} />
                                                        </Link>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )}
                </WithLoading>
            </div>
        </div>
    )
}

export default Github