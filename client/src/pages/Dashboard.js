import React from "react";
import WatchList from "../components/WatchList";

const Dashboard = () => {
	return (
		<div className='dashboard'>
			<h2 className='dashboard-title'>WatchList</h2>
			<WatchList />
		</div>
	);
};

export default Dashboard;
