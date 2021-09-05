import React from "react";
import FullWidthComponent from "./FullWidthComponent";
import "./NavbarStyle.scss";

import useWindowWidth from "../../utils/hooks/window-width-hook";
import HalfWidthComponent from "./HalfWidthComponent";

const Navbar = () => {
	const [width] = useWindowWidth();

	return (
		<div className='navbar'>
			<div className='navbar-wrapper'>
				<h2 className='Logo'>Trade-Watch</h2>
				<div className='navbar-right-pane'>
					{width === "l" ? (
						<FullWidthComponent />
					) : (
						<HalfWidthComponent />
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
