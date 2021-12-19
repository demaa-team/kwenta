import { FC } from 'react';

import { FullScreenContainer } from 'styles/common';

import Header from './Header';
import Sider from './Sider';
import NotificationContainer from 'constants/NotificationContainer';
import styled from 'styled-components';

type AppLayoutProps = {
	children: React.ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => (
	<FullScreenContainer>
		<Container>
			<Sider/>
			<ContentWrapper>
				<Header />
				{children}
			</ContentWrapper>
		</Container>
		
		<NotificationContainer />
	</FullScreenContainer>
);
const Container=styled.div`
	display: flex;
`
const ContentWrapper=styled.div`
	flex:1;
`

export default AppLayout;
