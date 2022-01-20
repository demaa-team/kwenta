import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { gasSpeedState } from 'store/wallet';
import useSelectedPriceCurrency from 'hooks/useSelectedPriceCurrency';

import { CRYPTO_CURRENCY_MAP, Synths } from 'constants/currency';
import { SYNTHS_TO_SHORT } from '../constants';

import ShortingReward from './ShortingRewardRow';

import { getExchangeRatesForCurrencies } from 'utils/currencies';
import { getTransactionPrice } from 'utils/network';

import GasPriceSummaryItem from 'sections/exchange/FooterCard/TradeSummaryCard/GasPriceSummaryItem';

import { Title } from '../common';
import useSynthetixQueries from 'demaa-queries';

const ShortingRewards: FC = () => {
	const { t } = useTranslation();

	const [gasLimit, setGasLimit] = useState<number | null>(null);
	const [gasSpeed] = useRecoilState(gasSpeedState);

	const { useEthGasPriceQuery, useExchangeRatesQuery } = useSynthetixQueries();

	const ethGasPriceQuery = useEthGasPriceQuery();
	const { selectedPriceCurrency } = useSelectedPriceCurrency();
	const exchangeRatesQuery = useExchangeRatesQuery();

	const gasPrices = useMemo(
		() => (ethGasPriceQuery.isSuccess ? ethGasPriceQuery?.data ?? undefined : undefined),
		[ethGasPriceQuery.isSuccess, ethGasPriceQuery.data]
	);

	const gasPrice = useMemo(
		() =>
			ethGasPriceQuery.isSuccess
				? ethGasPriceQuery?.data != null
					? ethGasPriceQuery.data[gasSpeed]
					: null
				: null,
		[ethGasPriceQuery.isSuccess, ethGasPriceQuery.data, gasSpeed]
	);

	const exchangeRates = useMemo(
		() => (exchangeRatesQuery.isSuccess ? exchangeRatesQuery.data ?? null : null),
		[exchangeRatesQuery.isSuccess, exchangeRatesQuery.data]
	);

	const snxPriceRate = useMemo(
		() =>
			getExchangeRatesForCurrencies(
				exchangeRates,
				CRYPTO_CURRENCY_MAP.SNX,
				selectedPriceCurrency.name
			),
		[exchangeRates, selectedPriceCurrency.name]
	);

	const ethPriceRate = useMemo(
		() => getExchangeRatesForCurrencies(exchangeRates, Synths.sETH, selectedPriceCurrency.name),
		[exchangeRates, selectedPriceCurrency.name]
	);

	const transactionFee = useMemo(() => getTransactionPrice(gasPrice, gasLimit, ethPriceRate), [
		gasPrice,
		gasLimit,
		ethPriceRate,
	]);

	return (
		<Container>
			<Title>{t('shorting.rewards.title')}</Title>
			{SYNTHS_TO_SHORT.map((currencyKey) => (
				<ShortingReward
					key={currencyKey}
					{...{ gasPrice, setGasLimit, currencyKey, snxPriceRate }}
				/>
			))}
			<StyledGasPriceSummaryItem {...{ gasPrices, transactionFee }} />
		</Container>
	);
};
const Container = styled.div`
	padding-right:2rem;
	border-right:0.2rem solid #101964;
`
const StyledGasPriceSummaryItem = styled(GasPriceSummaryItem)`
	padding: 5px 0;
	display: flex;
	justify-content: space-between;
	width: auto;
	color: #D9DDF4;
	// border-bottom: 1px solid ${(props) => props.theme.colors.navy};
`;

export default ShortingRewards;
