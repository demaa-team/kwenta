import { FC } from 'react';
import styled from 'styled-components';

import { CRYPTO_CURRENCY_MAP, Synths } from 'constants/currency';

import useExchange from 'sections/exchange/hooks/useExchange';

import { CurrencyCardsSelector, ExchangeCardsWithSelector } from 'styles/common';

import SlippageSelector from './SlippageSelector';

const CurrencyConvertCard: FC = () => {
	const { quoteCurrencyCard, baseCurrencyCard, footerCard } = useExchange({
		defaultBaseCurrencyKey: Synths.sUSD,
		defaultQuoteCurrencyKey: CRYPTO_CURRENCY_MAP.ETH,
		footerCardAttached: true,
		persistSelectedCurrencies: false,
		allowQuoteCurrencySelection: true,
		allowBaseCurrencySelection: true,
		showNoSynthsCard: false,
		txProvider: '1inch',
	});

	return (
		<Container>
			<DesktopCardsContainerCopy>
				<Left>
					{quoteCurrencyCard}
				</Left>
				<StyledCurrencyCardsSelector>
					<SlippageSelector />
				</StyledCurrencyCardsSelector>
				<Right>
					{baseCurrencyCard}
				</Right>
			</DesktopCardsContainerCopy>
			<ExchangeFooter>{footerCard}</ExchangeFooter>
		</Container>
	);
};
const Left = styled.div`
	width:45%;	
`
const Right = styled.div`
	width:45%;	
`
const Container = styled.div`
	position: relative;
`;
const DesktopCardsContainerCopy = styled.div`
	display: flex;
	align-items: center;
    justify-content: space-between;
	padding: 2px 4.5rem;
	flex: 1;
`;
const StyledCurrencyCardsSelector = styled.div`
	border-left: 2px solid ${(props) => props.theme.colors.black};
	border-right: 2px solid ${(props) => props.theme.colors.black};
	display: flex;
	align-items: center;
	justify-content:center;
	max-width: 260px;
	width: 18%;
	height: 5rem;
`;

export const ExchangeFooter = styled.div`
	padding:1rem 0;
	.footer-card {
		/* max-width: 1000px; */
	}
`;

export default CurrencyConvertCard;
