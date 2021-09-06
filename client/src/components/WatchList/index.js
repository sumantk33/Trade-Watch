import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./WatchList.scss";
import { useToasts } from "react-toast-notifications";
import { getLTP, getWatchList } from "../../actions/watchListActions";
import WatchListItem from "./WatchListItem";
import { toastConfig } from "../../utils/toast/toastConfig";
import Modal from "../Modal";

const WatchList = () => {
	const [open, setOpen] = useState(false);
	const [action, setAction] = useState("Add");
	const [currStock, setCurrStock] = useState({});
	const dispatch = useDispatch();
	const { addToast } = useToasts();

	const watchList = useSelector((state) => state.watchList);
	const { loading, error, stocks } = watchList;

	const addModalFunc = () => {
		setOpen(true);
		setAction("Add");
		setCurrStock({});
	};

	const editModalFunc = (stock) => {
		setOpen(true);
		setAction("Edit");
		setCurrStock(stock);
	};

	const getMetrics = async () => {
		const data = await getLTP("TCS");
		console.log(data);
	};

	useEffect(() => {
		dispatch(getWatchList());
	}, []);

	return (
		<div className='watchlist'>
			{error && addToast(error, toastConfig("error"))}

			<div className='watchlist-add-section'>
				<button
					className='button add-stock-button'
					onClick={addModalFunc}
				>
					Add a stock
				</button>
			</div>
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
						editModalFunc={editModalFunc}
					/>
				))}
			<Modal
				open={open}
				setOpen={setOpen}
				action={action}
				stock={currStock}
			/>
		</div>
	);
};

export default WatchList;
