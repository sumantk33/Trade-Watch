import React from "react";
import { getTextColor } from "../../utils/text_color/index";

const WatchListItem = ({ stock, index, editModalFunc }) => {
	const openEditModal = () => {
		editModalFunc(stock);
	};

	return (
		<div className='watchlist-item' onClick={openEditModal}>
			<div className='watchlist-start'>
				<div className='watchlist-index'>{index + 1}</div>
				<div className='watchlist-stock'>
					<span className='watchlist-stock-name'>{stock.name}</span>
					<span className='watchlist-stock-symbol'>
						{stock.symbol}
					</span>
				</div>
			</div>
			<div className='watchlist-metrics'>
				<div className='watchlist-metrics-market-price'>
					{stock.market_price}
				</div>
				<div className='watchlist-metrics-required-price'>
					{stock.target_price}
				</div>
				<div
					className={`watchlist-metrics-per-difference ${getTextColor(
						stock.per_difference
					)}`}
				>
					{stock.per_difference} %
				</div>
			</div>
		</div>
	);
};

export default WatchListItem;
