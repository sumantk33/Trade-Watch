import React from "react";

const Modal = ({ open }) => {
	if (open) {
		return <div className='modal-wrapper'>LOL</div>;
	} else {
		return <></>;
	}
};

export default Modal;
