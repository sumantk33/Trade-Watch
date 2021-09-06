import axios from "axios";
import { supabase } from "../utils/supabase/supabaseClient";
import {
	WATCHLIST_FAIL,
	WATCHLIST_SUCCESS,
	WATCHLIST_REQUEST,
} from "../constants/watchListConstants";

export const getWatchList = () => async (dispatch) => {
	try {
		dispatch({ type: WATCHLIST_REQUEST });

		const { data: stocks, error } = await supabase
			.from("stocks")
			.select("*");

		let queryString = "";
		for (let i = 0; i < stocks.length - 1; i++) {
			queryString += stocks[i].symbol + ",";
		}
		queryString += stocks[stocks.length - 1].symbol;

		const data = await getLTP(queryString);

		for (let stock of stocks) {
			stock.market_price = data[stock.symbol];
			stock.difference = (
				Number(stock.target_price) - Number(stock.market_price)
			).toFixed(2);
			stock.per_difference = (
				(Number(stock.difference) / Number(stock.market_price)) *
				100
			).toFixed(4);
		}

		if (error) {
			dispatch({
				type: WATCHLIST_FAIL,
				payload: error,
			});
		} else {
			dispatch({
				type: WATCHLIST_SUCCESS,
				payload: stocks,
			});
		}
	} catch (error) {
		dispatch({
			type: WATCHLIST_FAIL,
			payload: error.message,
		});
	}
};

export const getLTP = async (queryString) => {
	const { data } = await axios.get(
		`${process.env.REACT_APP_LIVEFEED_URL}${queryString}`
	);
	return data.prices;
};
