import axios from "axios";
import { supabase } from "../utils/supabase/supabaseClient";
import {
	WATCHLIST_FAIL,
	WATCHLIST_SUCCESS,
	WATCHLIST_REQUEST,
	STOCK_ADD_SUCCESS,
	STOCK_ADD_REQUEST,
	STOCK_ADD_FAIL,
	STOCK_EDIT_REQUEST,
	STOCK_EDIT_FAIL,
	STOCK_EDIT_SUCCESS,
	STOCK_DELETE_REQUEST,
	STOCK_DELETE_FAIL,
	STOCK_DELETE_SUCCESS,
} from "../constants/watchListConstants";

// Function to get all the watch list stocks on load up
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
			stock = getMetrics(stock, data[stock.symbol]);
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

export const addStock = (stock) => async (dispatch) => {
	try {
		dispatch({
			type: STOCK_ADD_REQUEST,
		});

		const { error } = await supabase.from("stocks").insert([stock]);

		if (error) {
			dispatch({
				type: STOCK_ADD_FAIL,
				payload: error,
			});
		} else {
			dispatch({
				type: STOCK_ADD_SUCCESS,
			});
		}
	} catch (error) {
		dispatch({
			type: STOCK_ADD_FAIL,
			payload: error,
		});
	}
};

export const editStock = (stock) => async (dispatch) => {
	try {
		dispatch({
			type: STOCK_EDIT_REQUEST,
		});

		const { error } = await supabase
			.from("stocks")
			.update(stock)
			.eq("symbol", stock.symbol);

		if (error) {
			dispatch({
				type: STOCK_EDIT_FAIL,
				payload: error,
			});
		} else {
			dispatch({
				type: STOCK_EDIT_SUCCESS,
			});
		}
	} catch (error) {
		dispatch({
			type: STOCK_EDIT_FAIL,
			payload: error,
		});
	}
};

export const deleteStock = (symbol) => async (dispatch) => {
	try {
		dispatch({
			type: STOCK_DELETE_REQUEST,
		});

		const { error } = await supabase
			.from("stocks")
			.delete()
			.eq("symbol", symbol);

		if (error) {
			dispatch({
				type: STOCK_DELETE_FAIL,
				payload: error,
			});
		} else {
			dispatch({
				type: STOCK_DELETE_SUCCESS,
			});
		}
	} catch (error) {
		dispatch({
			type: STOCK_DELETE_FAIL,
			payload: error,
		});
	}
};

export const getLTP = async (queryString) => {
	const { data } = await axios.get(
		`${process.env.REACT_APP_LIVEFEED_URL}${queryString}`
	);
	return data.prices;
};

export const getMetrics = (stock, data) => {
	stock.market_price = data;
	stock.difference = (
		Number(stock.target_price) - Number(stock.market_price)
	).toFixed(2);
	stock.per_difference = (
		(Number(stock.difference) / Number(stock.market_price)) *
		100
	).toFixed(4);
	return stock;
};

export const verifySymbol = async (symbol) => {
	const { data } = await axios.get(
		`${process.env.REACT_APP_VERIFY_URL}${symbol}`
	);
	return data.exists;
};
