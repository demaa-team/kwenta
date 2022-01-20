import { FC } from 'react';
import styled from 'styled-components';

import { Synths } from 'constants/currency';

import media from 'styles/media';

import CRatioSelector from './components/CRatioSelector';

import useShort from '../hooks/useShort';

import { CurrencyCardsSelector, ExchangeCardsWithSelector } from 'styles/common';

const ShortingCard: FC = () => {
	const { quoteCurrencyCard, baseCurrencyCard, footerCard } = useShort({
		defaultBaseCurrencyKey: Synths.sETH,
		defaultQuoteCurrencyKey: Synths.sUSD,
		customFooterCardStyle: true
	});

	return (
		<Container>
			<ConvertContainer>
				<DesktopCardsGapped>
					{quoteCurrencyCard}
					{baseCurrencyCard}
					<StyledCurrencyCardsSelector>
						<CRatioSelector />
					</StyledCurrencyCardsSelector>
				</DesktopCardsGapped>
				<ExchangeFooter>{footerCard}</ExchangeFooter>
			</ConvertContainer>
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	// margin-bottom: 30px;
	${media.lessThan('md')`
		// TODO: this is needed to cancel the content "push" that comes content from "TradeSummaryCard" (on tablet/mobile)
		margin-bottom: -50px;
	`}
`;
const DesktopCardsContainer = styled.div`
	display: grid;
	padding-bottom: 2px;
	gap: 2px;
	grid-template-columns: 1fr 1fr;
	flex: 1;
`;

const DesktopCardsGapped = styled(DesktopCardsContainer)`
	grid-gap: 60px;
	margin: 0 auto;
`;
const ConvertContainer = styled.div`
padding:0 0 1rem 0`;

const StyledCurrencyCardsSelector = styled(CurrencyCardsSelector)`
	top:4rem;
	max-width: 260px;
	width: 10%;
	height: 5rem;
`;

export const ExchangeFooter = styled.div`
	// padding:1rem 0;
	.footer-card {
		// max-width: 1000px;
	}
`;

export default ShortingCard;
