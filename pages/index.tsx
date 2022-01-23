import React from 'react';
import { useCallback,useEffect } from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import HomeLayout from 'sections/shared/Layout/HomeLayout';

import Hero from 'sections/homepage/Hero';
import Assets from 'sections/homepage/Assets';
import Features from 'sections/homepage/Features';
import Benefits from 'sections/homepage/Benefits';
import Steps from 'sections/homepage/Steps';
import FAQ from 'sections/homepage/FAQ';
import ChartBanner from 'sections/homepage/ChartBanner';
import WithHomepageContainers from 'sections/homepage/containers';
import ROUTES from 'constants/routes';
import { useRouter } from 'next/router';
import L2 from 'sections/homepage/L2';

const HomePage = () => {
	const { t } = useTranslation();
	const router = useRouter();
	
	useEffect(() => {
		router.push(ROUTES.Dashboard.Home)
	}, []);
	return (
		<>
			{/* <Head>
				<title>{t('homepage.page-title')}</title>
			</Head>
			<WithHomepageContainers>
				<HomeLayout>
					<DarkContainer>
						<Container>
							<Hero />
							<Assets />
							<Features />
							<L2 />
							<Benefits />
						</Container>
					</DarkContainer>
					<LightContainer>
						<Container>
							<Steps />
							<FAQ />
							<ChartBanner />
						</Container>
					</LightContainer>
				</HomeLayout>
			</WithHomepageContainers> */}
		</>
	);
};

export const Container = styled.div`
	max-width: 1200px;
	width: 100%;
	margin: 0 auto;
`;

const DarkContainer = styled.div`
	width: 100%;
	padding: 100px 20px 0 20px;
`;

const LightContainer = styled.div`
	width: 100%;
	background: ${(props) => props.theme.colors.elderberry};
	padding: 0 20px;
`;

export default HomePage;
