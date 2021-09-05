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
