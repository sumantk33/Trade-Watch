import {
	WATCHLIST_FAIL,
	WATCHLIST_REQUEST,
	WATCHLIST_SUCCESS,
} from "../constants/watchListConstants";

export const watchListReducer = (state = { stocks: [] }, action) => {
	switch (action.type) {
		case WATCHLIST_REQUEST:
			return { loading: true };
		case WATCHLIST_SUCCESS:
			return { loading: false, stocks: action.payload };
		case WATCHLIST_FAIL: {
			return { loading: false, error: action.payload };
		}
		default:
			return state;
	}
};
