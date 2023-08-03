import React, { useMemo, useState } from 'react'
import "../styles/home.css";

import { BsCpu } from "react-icons/bs";
import CircleBar from '../components/common/CircleBar';
import { WS_URL } from '../constants';

const Home = () => {

	const socket = useMemo(() => new WebSocket(`${WS_URL}/v1/stats/dashboard`), [])

	const [stats, setStat]= useState({
		cpu_usage: "",
		disk_usage: "",
		memory_usage: ""
	}) 

	
	socket.onmessage = (e) => {
		try {
			const {data} = e;
			let jsonData = JSON.parse(data);

			setStat({
				cpu_usage: Number(jsonData.cpu_usage).toFixed(2),
				disk_usage: Number(jsonData.disk_usage).toFixed(2),
				memory_usage: Number(jsonData?.memory_usage).toFixed(2)
			})

		} catch (error) {
			console.log(error);
		}
	}
	

	return (
		<div className='homePage fullXY withPadding'>
			<div className="homePageStats">
				<div className="dashboardCard roundSM withShadow">
					<CircleBar Icon={<BsCpu size={20} />} percent={stats?.cpu_usage || 0} />
					<p>CPU Usage</p>
				</div>
				<div className="dashboardCard roundSM withShadow">
					<CircleBar Icon={<BsCpu size={20} />} percent={stats?.memory_usage || 0} />
					<p>Memory Usage</p>
				</div>
				<div className="dashboardCard roundSM withShadow">
					<CircleBar Icon={<BsCpu size={20} />} percent={stats?.disk_usage || 0} />
					<p>Disk Space</p>
				</div>
				<div className="dashboardCard roundSM withShadow">
					<CircleBar Icon={<BsCpu size={20} />} percent={4} maxValue={10} customUnit={"Pc."} type={"value"} />
					<p>Web Limit</p>
				</div>
				<div className="dashboardCard roundSM withShadow">
					<CircleBar Icon={<BsCpu size={20} />} percent={18} maxValue={20} customUnit={"Pc."} type={"value"} />
					<p>User Limit</p>
				</div>
			</div>

			<div className='homeActivities roundSM'>
				<h4>Recent Activities</h4>
				<div className='allActivities' >
					<div className="item roundSM successBorderTop">
						<h5>New Web Added: PhpMyAdmin</h5>
						<div className="flexRow gapMD">
							<p>Image: Nodejs</p>
							<p>ContainerId: rfsdafgsd54g56sd7g5sd12g7</p>
						</div>
					</div>
					<div className="item roundSM errorBorderTop">
						<h5>Container Deleted Wordpress</h5>
						<div className="flexRow gapMD">
							<p>Image: Nodejs</p>
							<p>ContainerId: rfsdafgsd54g56sd7g5sd12g7</p>
						</div>
					</div>
					<div className="item roundSM infoBorderTop">
						<h5>Proxy Added to Wordpress</h5>
						<div className="flexRow gapMD">
							<p>Image: Wordpress</p>
							<p>ContainerId: a453fgsvsd4axynk54op</p>
							<p>Domain: gbapks.xyz</p>
							<p>Proxy Pass: localhost:45205</p>
						</div>
					</div>
					<div className="item roundSM warningBorderTop">
						<h5>Restart Pending</h5>
						<div className="flexRow gapMD">
							<p>ContainerId: a453fgs78ax5520k54op</p>
							<p>Created At: 10 Hours Ago </p>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Home