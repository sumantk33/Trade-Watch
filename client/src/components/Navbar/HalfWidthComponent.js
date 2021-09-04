import React, { useState } from "react";
import { ReactComponent as HamburgerIcon } from "../../assets/icons/hamburger.svg";
import Dropdown from "./Dropdown";

const HalfWidthComponent = () => {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<div className='navbar-half-width-component'>
			<HamburgerIcon
				className='navbar-hamburger'
				onClick={() => setShowDropdown(!showDropdown)}
			/>
			<Dropdown show={showDropdown} />
		</div>
	);
};

export default HalfWidthComponent;
