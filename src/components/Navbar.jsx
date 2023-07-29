import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext';

import { AiOutlineBgColors, AiOutlineSearch } from 'react-icons/ai';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { CiGlobe } from 'react-icons/ci';

import { Link } from 'react-router-dom';
import { ValidThemes } from '../constants';




const Navbar = () => {
	const { changeMenu, setNamedTheme } = useTheme();
	const [showThemeSelect, setShowThemeSelect] = useState(false)

	const [filterData, setFilterData] = useState([]);

	const [searchText, setSearchText] = useState("");

	const [searchData, setSearchData] = useState([
		{
			type: "web",
			name: "Node_app",
			image: "Node",
			portBinding: "46052:4000",
			containerId: "acr345545agrreesf22"
		},
		{
			type: "web",
			name: "myWordPress",
			image: "wordpress",
			portBinding: "3000:80",
			containerId: "acr345545agrreesf22"
		},
		{
			type: "web",
			name: "PhpMyAdmin",
			image: "phpmyadmin/phpmyadmin",
			portBinding: "5000:80",
			containerId: "acr345545agrreesf22"
		},
	])

	const onSearchText = (e) => {
		const { value} = e.target;
		setSearchText(value);

		if(value === "") {
			setFilterData([])
			return;
		}

		let searchFilter = searchData.filter((item) => {
			if(String(item.image).toLowerCase().includes(String(value).toLowerCase())) return true;
			else if(String(item.name).toLowerCase().includes(String(value).toLowerCase())) return true;
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
				<div className="navSearch secondaryBG padXSM flexRow roundSM">
					<AiOutlineSearch size={20} className='mainIcon' />
					<input type="text" value={searchText} onChange={onSearchText} placeholder='Search' className='rpInput fmd fw300' style={{ width: "280px" }} />

					{filterData && filterData.length > 0 && (
						<div className='navSearchResult'>
							{
								filterData.map((searchItem, idx) => (
									<div key={idx} className="navSearchItem">
										<div className='itemIcon'>
											<CiGlobe size={30} />
										</div>
										<div className='itemData'>
											<h4>{searchItem?.name}</h4>
											<div className='lineData'>
												<p>Type: {searchItem?.type}</p>
												<p>Port Binding: {searchItem?.portBinding}</p>
											</div>
											<div className='lineData'>
												<p>Container Id: {searchItem?.containerId}</p>
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
				<div className="navThemeIcon">
					<div className="iconWrap effect"
						onClick={() => setShowThemeSelect(prev => !prev)}
					>
						<AiOutlineBgColors size={20} />
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
			</div>

		</div>
	)
}

export default Navbar