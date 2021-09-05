import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./WatchList.scss";
import { useToasts } from "react-toast-notifications";
import { getWatchList } from "../../actions/watchListActions";
import WatchListItem from "./WatchListItem";
import { toastConfig } from "../../utils/toast/toastConfig";

const WatchList = () => {
	const dispatch = useDispatch();
	const { addToast } = useToasts();

	const watchList = useSelector((state) => state.watchList);
	const { loading, error, stocks } = watchList;

	useEffect(() => {
		dispatch(getWatchList());
	}, []);

	return (
		<div className='watchlist'>
			{error && addToast(error, toastConfig("error"))}
			<div className='watchlist-header'>
				<div className='watchlist-start'>
					<div>Id</div>
					<div className='watchlist-header-stock'>Stock</div>
				</div>
				<div className='watchlist-header-metrics'>
					<div className='watchlist-metrics-market-price'>LTP</div>
					<div className='watchlist-metrics-required-price'>
						Target
					</div>
					<div className='watchlist-metrics-per-difference'>
						Diff %
					</div>
				</div>
			</div>
			{stocks &&
				stocks.map((stock, index) => (
					<WatchListItem
						key={stock.symbol}
						stock={stock}
						index={index}
					/>
				))}
		</div>
	);
};

export default WatchList;
