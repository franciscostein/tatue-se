const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className="pb-3 mt-4">
			<hr />
			tatue-se <span className="copy-left">©</span> {year}
		</footer>
	);
};

export default Footer;
