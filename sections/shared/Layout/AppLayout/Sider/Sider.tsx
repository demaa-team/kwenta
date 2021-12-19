import { FC } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

import { isL2State } from 'store/wallet';
import Logo from '../../Logo';
import { menuLinksState } from '../Header/states';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { linkCSS } from 'styles/common';

const Sider: FC = () => {
    const { t } = useTranslation();
	const isL2 = useRecoilValue(isL2State);
    const { asPath } = useRouter();
	const menuLinks = useRecoilValue(menuLinksState);

	return (
		<Container>
            <Logo isL2={false}/>
            <nav>
                <MenuLinks>
                    {menuLinks.map(({ i18nLabel, link }) => (
                        <MenuLinkItem key={link} isActive={asPath.includes(link)}>
                            <Link href={link}>
                                <a>{t(i18nLabel)}</a>
                            </Link>
                        </MenuLinkItem>
                    ))}
                </MenuLinks>
            </nav>
        </Container>
	);
};

const Container=styled.div`
    width: 270px;
    background: #203298;
    border-radius: 0px 38px 38px 0px;
`
const MenuLinks = styled.ul`
	/* display: flex; */
`;

const MenuLinkItem = styled.li<{ isActive: boolean }>`
    height: 70px;
    line-height: 70px;
    text-align:center;
    border-bottom: 2px solid rgba(111, 119, 193, 0.3);
    background: ${(props) => (props.isActive ? 'rgba(255, 255, 255, 0.24)' : 'inherit')};;
    &:hover{
        background: rgba(255, 255, 255, 0.24);
        a{
            color: #F86C29;
        }
    }
	a {
		${linkCSS};
		font-family: ${(props) => props.theme.fonts.bold};
		text-transform: capitalize;
        font-size:18px;
		color: ${(props) => (props.isActive ? '#F86C29' : props.theme.colors.white)};
		/* &:hover {
			color: ${(props) => props.theme.colors.white};
		} */
	}
`;

// const Container = styled.header<{ isL2: boolean }>`
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// 	right: 0;
// 	z-index: ${zIndex.HEADER};
// 	${media.lessThan('md')`
// 		position: fixed;
// 		background-color: ${(props) => props.theme.colors.black};
// 		box-shadow: 0 8px 8px 0 ${(props) => props.theme.colors.black};
// 	`};
// 	> div {
// 		border-top: ${(props) =>
// 			`2px solid ${props.isL2 ? props.theme.colors.goldColors.color2 : 'transparent'}`};
// 		box-sizing: border-box;
// 		height: ${HEADER_HEIGHT};
// 		line-height: ${HEADER_HEIGHT};
// 		padding: 0 20px;
// 		display: flex;
// 		justify-content: space-between;
// 		align-items: center;
// 	}
// `;

export default Sider;
