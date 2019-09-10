import NavLayout from './Navbar';
import Footer from './footer';

const Layout = (props) => {
	return (
		<div>
			<NavLayout />
			<div className="container">{props.children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
