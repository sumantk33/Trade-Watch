import React from "react";

const Dropdown = ({ show }) => {
	return (
		<div
			className={`navbar-dropdown ${
				show ? "navbar-final-pos" : "navbar-initial-pos"
			}`}
		>
			<span className='navbar-item dropdown-item'>Docs</span>
			<span className='navbar-item dropdown-item'>About</span>
			<span className='navbar-item dropdown-item'>Sign In</span>
		</div>
	);
};

export default Dropdown;
