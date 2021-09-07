import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastConfig } from "../../utils/toast/toastConfig";
import { useToasts } from "react-toast-notifications";
import "./ModalStyle.scss";
import {
	addStock as addStockToDB,
	editStock as editStockToDB,
	deleteStock as deleteStockInDB,
	verifySymbol,
} from "../../actions/watchListActions";

const Modal = ({
	open,
	setOpen,
	action,
	stock = {},
	setModified,
	modified,
}) => {
	const [name, setName] = useState("");
	const [symbol, setSymbol] = useState("");
	const [targetPrice, setTargetPrice] = useState(0);
	const [link, setLink] = useState("");
	const [comments, setComments] = useState("");
	const [currError, setCurrError] = useState("");

	const dispatch = useDispatch();
	const { addToast } = useToasts();

	const stockAdd = useSelector((state) => state.stockAdd);
	const { error } = stockAdd;

	const closeModal = () => {
		setOpen(false);
	};

	const preCheck = async () => {
		if (symbol === "" && name === "" && targetPrice === 0) {
			addToast(
				"Please enter symbol, name and target price. These are neccessary fields",
				toastConfig("error")
			);
			return [false, {}];
		}

		if (!(await verifySymbol(symbol))) {
			addToast(
				"Please enter a valid symbol for the stock",
				toastConfig("error")
			);
			return [false, {}];
		}

		const newStock = {
			symbol,
			name,
			target_price: targetPrice,
			link,
			comments,
		};

		return [true, newStock];
	};

	const setToInitialState = () => {
		setSymbol("");
		setName("");
		setTargetPrice(0);
		setLink("");
		setComments("");
		setModified(!modified);
		closeModal();
	};

	const addStock = async () => {
		const result = await preCheck();
		if (!result[0]) {
			return;
		}
		const newStock = result[1];

		dispatch(addStockToDB(newStock));
		if (error) {
			setCurrError(error);
			return;
		}
		addToast("Stock inserted successfully", toastConfig("success"));
		setToInitialState();
	};

	const editStock = async () => {
		const result = await preCheck();
		if (!result[0]) {
			return;
		}
		const newStock = result[1];

		dispatch(editStockToDB(newStock));
		if (error) {
			setCurrError(error);
			return;
		}
		addToast("Stock updated successfully", toastConfig("success"));
		setToInitialState();
	};

	const deleteStock = async () => {
		dispatch(deleteStockInDB(symbol));

		if (error) {
			setCurrError(error);
			return;
		}
		addToast("Stock deleted successfully", toastConfig("success"));
		setToInitialState();
	};

	useEffect(() => {
		setName(stock.name ? stock.name : "");
		setSymbol(stock.symbol ? stock.symbol : "");
		setTargetPrice(stock.target_price ? stock.target_price : 0);
		setLink(stock.link ? stock.link : "");
		setComments(stock.comments ? stock.comments : "");
		setCurrError("");
	}, [stock, action]);

	if (!open) {
		return null;
	}

	return (
		<div className='modal-wrapper'>
			{currError !== "" && addToast(currError, toastConfig("error"))}
			<div className='modal'>
				<div className='modal-header'>
					<span className='modal-title'>{action} a stock</span>
					<span className='modal-close' onClick={closeModal}>
						&times;
					</span>
				</div>
				<div className='modal-body'>
					<div className='flex-row'>
						<label className='modal-label'>Name</label>
						<input
							type='text'
							className='modal-input'
							placeholder='Enter the stock name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className='flex-row'>
						<label className='modal-label'>Symbol</label>
						<div className='modal-link-input'>
							<input
								type='text'
								className='modal-input w-full'
								placeholder='Enter the symbol name'
								value={symbol}
								onChange={(e) => setSymbol(e.target.value)}
							/>
							<label className='modal-note'>
								Note: Please enter the symbol name correctly,
								else, server won't be able to fetch LTP
								properly.
							</label>
						</div>
					</div>
					<div className=' flex-row'>
						<label className='modal-label'>Target Price</label>
						<input
							type='number'
							className='modal-input'
							placeholder='Enter your target price'
							value={targetPrice}
							onChange={(e) => setTargetPrice(e.target.value)}
						/>
					</div>
					<div className='flex-row'>
						<div className='modal-label'>Link</div>
						<div className='modal-link-input'>
							<input
								type='text'
								className='modal-input w-full'
								placeholder='Enter the link for trading view chart'
								value={link}
								onChange={(e) => setLink(e.target.value)}
							/>
							<label className='modal-note'>
								Note: This link can be any charting software of
								the current instrument.
							</label>
						</div>
					</div>
					<div className='flex-row no-border'>
						<label className='modal-label'>Comments</label>
						<textarea
							type='text'
							className='modal-input'
							placeholder='Enter the comments if any'
							rows='4'
							value={comments}
							onChange={(e) => setComments(e.target.value)}
						/>
					</div>
					<div className='modal-body-buttons'>
						{action !== "Add" && (
							<button
								className='button modal-button modal-close-button'
								onClick={deleteStock}
							>
								Delete
							</button>
						)}

						<button
							className='button modal-button modal-add-button'
							onClick={action === "Add" ? addStock : editStock}
						>
							{action}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
