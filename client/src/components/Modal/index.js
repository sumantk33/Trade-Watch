import React, { useState, useEffect } from "react";
import "./ModalStyle.scss";

const Modal = ({ open, setOpen, action, stock = {} }) => {
	const [name, setName] = useState("");
	const [symbol, setSymbol] = useState("");
	const [targetPrice, setTargetPrice] = useState(0);
	const [link, setLink] = useState("");
	const [comments, setComments] = useState("");

	const closeModal = () => {
		setOpen(false);
	};

	useEffect(() => {
		setName(stock.name ? stock.name : "");
		setSymbol(stock.symbol ? stock.symbol : "");
		setTargetPrice(stock.target_price ? stock.target_price : 0);
		setLink(stock.link ? stock.link : "");
		setComments(stock.comments ? stock.comments : "");
	}, [stock, action]);

	if (!open) {
		return null;
	}

	return (
		<div className='modal-wrapper'>
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
						<button
							className='button modal-button modal-close-button'
							onClick={closeModal}
						>
							Close
						</button>
						<button className='button modal-button modal-add-button'>
							{action}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
