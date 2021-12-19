import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Svg, Img } from 'react-optimized-image';
import ROUTES from 'constants/routes';

import LogoSvg from 'assets/svg/brand/logo.svg';
import LogoPng from 'assets/svg/brand/logo.png';
import LogoSvgL2 from 'assets/svg/brand/logol2.svg';

type LogoProps = {
	isL2: boolean;
};

const Logo: FC<LogoProps> = ({ isL2 }) => (
	<LogoContainer>
		<Link href={ROUTES.Homepage.Home}>
			<a>{isL2 ? <Img src={LogoSvgL2} /> : <img className='logo' src={LogoPng} />}</a>
		</Link>
	</LogoContainer>
);

const LogoContainer = styled.div`
	position: relative;
	padding-top: 22px;
	padding-left: 34px;
	height: 70px;
	border-bottom: 2px solid rgba(111, 119, 193, 0.3);
	/* a {
		position: relative;
		top: 22px;
		left: 34px;
		display: inline-block;
	} */
	.logo{
		width:147px;
		height: 34px;
	}
`;

export default Logo;
