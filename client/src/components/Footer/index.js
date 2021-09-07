import React from "react";
import "./FooterStyle.scss";
import { GoMarkGithub } from "react-icons/go";
import { GrYoutube, GrTwitter, GrInstagram } from "react-icons/gr";

const Footer = () => {
	return (
		<div className='footer'>
			<div className='footer-text'>
				&#169; Trade-Watch. All rights reserved.
			</div>
			<div className='icons'>
				<GoMarkGithub className='icon' />
				<GrTwitter className='icon' />
				<GrInstagram className='icon' />
				<GrYoutube className='icon' />
			</div>
		</div>
	);
};

export default Footer;
