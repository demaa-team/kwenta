import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import styled ,{ css }from 'styled-components';
import Slider from 'react-slick';
import Img,{ Svg } from 'react-optimized-image';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';

import ArrowsIcon from 'assets/svg/app/arrows.svg';
import ConvertImg from 'assets/png/exchange/convertC.png';
import SingleChartIcon from 'assets/svg/app/single-chart.svg';
import DoubleChartIcon from 'assets/svg/app/double-chart.svg';
import { zIndex } from 'constants/ui';
import AppLayout from 'sections/shared/Layout/AppLayout';
import GitIDFooter from 'sections/shared/Layout/AppLayout/GitID';

import { formatCurrency } from 'utils/formatters/number';

import media from 'styles/media';

import {
	FlexDivColCentered,
	PageContent,
	MobileContainerMixin,
	SwapCurrenciesButton,
	FlexDivCol,
} from 'styles/common';

import { DesktopOnlyView, MobileOrTabletView } from 'components/Media';
import useExchange from 'sections/exchange/hooks/useExchange';
import { CurrencyKey } from 'constants/currency';
import { DEFAULT_WIDE_WIDTH as wideWidth } from 'sections/exchange/TradeCard/constants';

const ExchangePage = () => {
	const { t } = useTranslation();

	const {
		baseCurrencyKey,
		quoteCurrencyKey,
		inverseRate,
		quoteCurrencyCard,
		quotePriceChartCard,
		quoteMarketDetailsCard,
		baseCurrencyCard,
		baseMarketDetailsCard,
		basePriceChartCard,
		handleCurrencySwap,
		footerCard,
		combinedPriceChartCard,
		combinedMarketDetailsCard,

		toggleIsShowingSingleChart,
		isShowingSingleChart,
		wideWidth,
	} = useExchange({
		showPriceCard: true,
		showMarketDetailsCard: true,
		footerCardAttached: false,
		routingEnabled: true,
		persistSelectedCurrencies: true,
		showNoSynthsCard: true,
		customFooterCardStyle:true,
	});

	const chartsToggler = (
		<ChartsTogglerContainer>
			<ChartsToggler onClick={toggleIsShowingSingleChart}>
				<ChartsTogglerText active={isShowingSingleChart}>
					{t('exchange.charts.single')}
				</ChartsTogglerText>
				{/* {isShowingSingleChart ? <Svg src={SingleChartIcon} /> : <Svg src={DoubleChartIcon} />} */}
				<ChartsTogglerText active={!isShowingSingleChart}>
					{t('exchange.charts.double')}
				</ChartsTogglerText>
			</ChartsToggler>
		</ChartsTogglerContainer>
	);

	return (
		<>
			<Head>
				<title>
					{baseCurrencyKey != null && quoteCurrencyKey != null
						? t('exchange.page-title-currency-pair', {
								baseCurrencyKey,
								quoteCurrencyKey,
								rate: formatCurrency(quoteCurrencyKey as CurrencyKey, inverseRate, {
									currencyKey: quoteCurrencyKey as CurrencyKey,
								}),
						  })
						: t('exchange.page-title')}
				</title>
			</Head>
			<AppLayout>
				<StyledPageContent>
					<DesktopOnlyView>
						<DesktopContainer>
							<PageWidthContainer>
								<DesktopCardsContainerCopy>
									<LeftCardContainerC data-testid="left-side">{quoteCurrencyCard}</LeftCardContainerC>
									<SwapCurrenciesButtonContainer isQuoteCurrencyKey={quoteCurrencyKey != null}>
										<SwapCurrenciesButton onClick={handleCurrencySwap} data-testid="swap-btn">
											{/* <Svg src={ArrowsIcon} /> */}
											<Img src={ConvertImg} width="40" height="40"/>
										</SwapCurrenciesButton>
									</SwapCurrenciesButtonContainer>
									<RightCardContainerC data-testid="right-side">
										{baseCurrencyCard}
									</RightCardContainerC>
								</DesktopCardsContainerCopy>
								<PageWidthContainer className='footer-card-wrap'>{footerCard}</PageWidthContainer>
							</PageWidthContainer>


							<AnimateSharedLayout>
								{chartsToggler}

								<ChartsTopContainer isShowingSingleChart={isShowingSingleChart}>
									{isShowingSingleChart ? (
										<AnimatePresence>
											<motion.div
												layout
												initial={{ width: wideWidth }}
												animate={{ width: wideWidth }}
												exit={{ width: wideWidth }}
												transition={{ ease: 'easeOut' }}
											>
												{combinedPriceChartCard}
											</motion.div>
										</AnimatePresence>
									) : (
										<AnimatePresence>
											<motion.div
												layout
												initial={{ width: wideWidth }}
												animate={{ width: wideWidth }}
												exit={{ width: wideWidth }}
												transition={{ ease: 'easeOut' }}
											>
												<DesktopCardsGapped>
													<LeftCardContainer data-testid="left-side">
														{quotePriceChartCard}
													</LeftCardContainer>
													<RightCardContainer data-testid="right-side">
														{basePriceChartCard}
													</RightCardContainer>
												</DesktopCardsGapped>
											</motion.div>
										</AnimatePresence>
									)}
								</ChartsTopContainer>

								<ChartsBottomContainer isShowingSingleChart={isShowingSingleChart}>
									{isShowingSingleChart ? (
										<motion.div 
											style={{background: '#182576'}}
											layout
											initial={{ width: wideWidth }}
											animate={{ width: wideWidth }}
											exit={{ width: wideWidth }}
											transition={{ ease: 'easeOut' }}
										>
											{combinedMarketDetailsCard}
										</motion.div>
									) : (
										<motion.div
											layout
											initial={{ width: wideWidth }}
											animate={{ width: wideWidth }}
											exit={{ width: wideWidth }}
											transition={{ ease: 'easeOut' }}
										>
											<DesktopCardsGapped>
												<CurrLeftCardContainer data-testid="left-side">
													{quoteMarketDetailsCard}
												</CurrLeftCardContainer>
												<CurrRightCardContainer data-testid="right-side">
													{baseMarketDetailsCard}
												</CurrRightCardContainer>
											</DesktopCardsGapped>
										</motion.div>
									)}
								</ChartsBottomContainer>
							</AnimateSharedLayout>
							<GitIDFooter />
						</DesktopContainer>
					</DesktopOnlyView>
					<MobileOrTabletView>
						<MobileContainer>
							{quoteCurrencyCard}
							<VerticalSpacer>
								<SwapCurrenciesButton onClick={handleCurrencySwap} data-testid="swap-btn">
									<Svg src={ArrowsIcon} />
								</SwapCurrenciesButton>
							</VerticalSpacer>
							{baseCurrencyCard}
							<FooterContainer>{footerCard}</FooterContainer>
							{chartsToggler}
							{isShowingSingleChart ? (
								<>
									{combinedPriceChartCard}
									<FooterSpacer />
									{combinedMarketDetailsCard}
								</>
							) : (
								<SliderContainer>
									<Slider arrows={false} dots={false}>
										<SliderContent data-testid="left-side">
											{basePriceChartCard}
											<SliderContentSpacer />
											{baseMarketDetailsCard}
										</SliderContent>
										<SliderContent data-testid="right-side">
											{quotePriceChartCard}
											<SliderContentSpacer />
											{quoteMarketDetailsCard}
										</SliderContent>
									</Slider>
								</SliderContainer>
							)}
							<GitIDFooter />
						</MobileContainer>
					</MobileOrTabletView>
				</StyledPageContent>
			</AppLayout>
		</>
	);
};

const StyledPageContent = styled(PageContent)`
	${media.greaterThan('md')`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* padding: 55px 40px 40px; */
	`}

	.currency-card {
		${media.lessThan('md')`
		width: 100%;
	`}
	}

	.market-details-card {
		width: 100%;
		${media.lessThan('md')`
			max-width: unset;
		`}
		&>div{
			width: 100%;
		}
	}
`;

const ChartsTopContainer = styled.div<{isShowingSingleChart:boolean}>`
	background: #203298;
	border-top-left-radius:1rem;
	border-top-right-radius:1rem;
	padding:1rem 1rem 0;
	.period-select{
		border-left:2px solid ${(props) => (props.isShowingSingleChart ? '#111C60' : 'transparent')};
	}
	.compare-ratio{
		border-left:2px solid ${(props) => (props.isShowingSingleChart ? '#111C60' : 'transparent')};
	}
`; 

const ChartsBottomContainer = styled.div<{isShowingSingleChart:boolean}>`
	background: #203298;
	border-bottom-left-radius:1rem;
	border-bottom-right-radius:1rem;
	border-top:1px solid #203298;
	padding:0 1rem 1rem;
	.period-select{
		border-left:2px solid ${(props) => (props.isShowingSingleChart ? '#111C60' : 'transparent')};
	}
	.compare-ratio{
		border-left:2px solid ${(props) => (props.isShowingSingleChart ? '#111C60' : 'transparent')};
	}
`;

const PageWidthContainer = styled.div`
	/* width: ${wideWidth}px;
	margin: 0 auto; */
	background: #203298;
	border-radius: 1rem;
	margin-bottom:0.9rem;
	padding:1rem 0;
	&.footer-card-wrap{
		margin-bottom: 0px;
		border-radius: inherit;
	}
`;

const FooterContainer = styled.div`
	width: 100%;
`;

const DesktopContainer = styled(FlexDivCol)``;

const DesktopCardsContainerCopy = styled.div`
	display: flex;
	align-items: center;
    justify-content: space-between;
	padding: 2px 4.5rem;
	flex: 1;
`;
const DesktopCardsContainer = styled.div`
	display: grid;
	padding-bottom: 2px;
	gap: 2px;
	grid-template-columns: 1fr 1fr;
	flex: 1;
`;

const DesktopCardsGapped = styled(DesktopCardsContainer)`
	// grid-gap: 60px;
	margin: 0 auto;
`;

const SwapCurrenciesButtonContainer = styled.div<{ isQuoteCurrencyKey: boolean }>`
	align-self: flex-start; 
	${(props) =>
		props.isQuoteCurrencyKey &&
		css`
			margin-top: 25px;
		`};
	
	// position: absolute;
	// left: calc(50% - 16px);
	z-index: ${zIndex.BASE + 10};
	width: 76px;
	height: 97px;
	display: flex;
	align-items: center;
    justify-content: center;
`;

const CardContainerMixin = `
	display: grid;
`;

const LeftCardContainerC = styled.div`
	width:45%;
	${CardContainerMixin};
`;
const RightCardContainerC = styled.div`
	width:45%;
	${CardContainerMixin};
`;
const LeftCardContainer = styled.div`
	${CardContainerMixin};
`;

const RightCardContainer = styled.div`
	${CardContainerMixin};
`;

const CurrLeftCardContainer = styled(LeftCardContainer)`
	background:#182576
`
const CurrRightCardContainer = styled(RightCardContainer)`
	background:#182576
`
const MobileContainer = styled(FlexDivColCentered)`
	${MobileContainerMixin};
	margin-bottom: 110px;
`;

const VerticalSpacer = styled.div`
	height: 2px;
	position: relative;
	${SwapCurrenciesButton} {
		position: absolute;
		transform: translate(-50%, -50%) rotate(90deg);
		border: 2px solid ${(props) => props.theme.colors.black};
	}
`;

const SliderContainer = styled.div`
	padding: 16px 0;
	width: 100%;
	* {
		outline: none;
	}
`;

const FooterSpacer = styled.div`
	margin-top: 20px;
`;

const SliderContent = styled.div``;

const SliderContentSpacer = styled.div`
	height: 16px;
`;

const ChartsTogglerContainer = styled.div`
	position: relative;
	z-index: 1000;

	${media.lessThan('md')`
		padding: 20px 0 30px;
	`}
`;

const ChartsToggler = styled.div`
	position: absolute;
	top: 0.8rem;
	left: calc(50% - 63.5px);
	// width: 135px;
	height: 2rem;
	line-height:2rem;
	border-radius: 5px;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius:1rem;
	background: ${(props) => props.theme.colors.black};
`;

const ChartsTogglerText = styled.div<{ active: boolean }>`
	text-transform: uppercase;
	padding:0 1rem;
	background:${(props) => (props.active ? '#F86C29' : '')};
	border-radius:1rem;
	color:#fff;
	// color: ${(props) => (props.active ? props.theme.colors.white : props.theme.colors.silver)};
`;

export default ExchangePage;
