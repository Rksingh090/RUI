import React, { useState } from 'react'

import { useTheme } from '../../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { ValidThemes } from '../../config/themes';

import { AiOutlineLogout, AiOutlineSearch } from 'react-icons/ai';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { CiGlobe } from 'react-icons/ci';
import { useWeb } from '../../context/WebContext';
import { timeSince } from '../../func/timesince';
import axios from 'axios';
import { API } from '../../constants';




const Navbar = () => {
	const navigate = useNavigate();

	const { websites } = useWeb();
	const { changeMenu, setNamedTheme } = useTheme();
	const [showThemeSelect, setShowThemeSelect] = useState(false)

	const [filterData, setFilterData] = useState([]);
	const [searchText, setSearchText] = useState("");

	const logoutUser = () => {
		axios.post(`${API}/v1/auth/logout`, {}, {
			withCredentials: true
		}).then((res) => {
			const {status} = res.data;
			if(status === "success"){
				navigate("/login")
			}
		})
	}

	const onSearchText = (e) => {
		const { value } = e.target;
		setSearchText(value);

		if (value === "") {
			setFilterData([])
			return;
		}

		let searchFilter = websites.filter((item) => {
			if (String(item.image).toLowerCase().includes(String(value).toLowerCase())) return true;
			else if (String(item.name).toLowerCase().includes(String(value).toLowerCase())) return true;
			return false;
		})

		setFilterData(searchFilter);
	}


	return (
		<div className='Navbar'>

			<div className="navStart flexRow gapSM">
				<div className="iconWrap effect" onClick={changeMenu}>
					<HiOutlineMenuAlt2 size={22} />
				</div>
				<Link to="/" className='flg logoIcon'>RPanel</Link>
			</div>
			<div className="navMiddle">
				{/* nav search functionality  */}
				<div className="navSearch secondaryBG padXSM flexRow roundSM">
					<AiOutlineSearch size={20} className='mainIcon' />
					<input type="text" value={searchText} onChange={onSearchText} placeholder='Search' className='rpInput fmd fw300' style={{ width: "280px" }} />

					{filterData && filterData.length > 0 && (
						<div className='navSearchResult'>
							{
								filterData.map((searchItem, idx) => (
									<div onClick={() => {
										setFilterData([])
										navigate(`/web/${searchItem?._id}/${searchItem?.name}`);
									}} key={idx} className="navSearchItem">
										<div className='itemIcon'>
											<CiGlobe size={30} />
										</div>
										<div className='itemData'>
											<h4>{searchItem?.name}</h4>
											<div className='lineData'>
												<p>Type: {searchItem?.type}</p>
												<p>Port Binding: {searchItem?.bind_port}:{searchItem?.exposed_port}</p>
											</div>
											<div className='lineData'>
												<p>Created At: {timeSince(new Date(searchItem?.created_at))}</p>
											</div>
										</div>
									</div>

								))
							}
						</div>
					)}
				</div>

			</div>
			<div className="navEnd">

				{/* navbar theme change btn  */}
				<div className="navThemeIcon" title='Change Theme'>
					<div className="iconWrap effect"
						onClick={() => setShowThemeSelect(prev => !prev)}
					>
						<IoColorPaletteOutline size={20} />
					</div>
					<div className={`navThemeSelect ${showThemeSelect ? "active" : ""}`}>
						{
							ValidThemes.map((theme, idx) => (
								<div
									key={idx}
									style={{
										backgroundColor: theme.background,
										"--delay": (idx * .05) + "s"
									}}
									className='withShadow'
									onClick={() => setNamedTheme(theme.title)}
									title={theme.title}
								>

								</div>
							))
						}
					</div>

				</div>

				{/* logout btn */}
				<div className="iconWrap effect" title='Logout' onClick={logoutUser}>
					<AiOutlineLogout size={20} />
				</div>
			</div>

		</div>
	)
}

export default Navbar