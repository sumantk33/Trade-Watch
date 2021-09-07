import {
	WATCHLIST_FAIL,
	WATCHLIST_REQUEST,
	WATCHLIST_SUCCESS,
	STOCK_ADD_FAIL,
	STOCK_ADD_REQUEST,
	STOCK_ADD_SUCCESS,
	STOCK_EDIT_REQUEST,
	STOCK_EDIT_SUCCESS,
	STOCK_EDIT_FAIL,
	STOCK_DELETE_REQUEST,
	STOCK_DELETE_SUCCESS,
	STOCK_DELETE_FAIL,
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
export const stockActionsReducer = (state = { stock: {} }, action) => {
	switch (action.type) {
		case STOCK_ADD_REQUEST:
			return { loading: true };
		case STOCK_ADD_SUCCESS:
			return { loading: false };
		case STOCK_ADD_FAIL:
			return { loading: false, error: action.payload };
		case STOCK_EDIT_REQUEST:
			return { loading: true };
		case STOCK_EDIT_SUCCESS:
			return { loading: false };
		case STOCK_EDIT_FAIL:
			return { loading: false, error: action.payload };
		case STOCK_DELETE_REQUEST:
			return { loading: true };
		case STOCK_DELETE_SUCCESS:
			return { loading: false };
		case STOCK_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
