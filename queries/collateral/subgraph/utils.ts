import { HistoricalShortPosition, ShortLiquidation } from './types';
import { hexToAscii } from 'utils/formatters/string';
import { CurrencyKey, SYNTH_DECIMALS } from 'constants/currency';
import { wei } from '@synthetixio/wei';

// MainNet - 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-shorts';
// Kovan - 'https://api.thegraph.com/subgraphs/name/vbstreetz/synthetix-shorts-kovan'

export const SHORT_GRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/demaa-team/shorts';

export const SHORT_GRAPH_ENDPOINT_KOVAN =
	'https://api.thegraph.com/subgraphs/name/vbstreetz/synthetix-shorts-kovan';

export const formatShort = (response: any): Partial<HistoricalShortPosition> => ({
	id: response.id,
	txHash: response.txHash,
	collateralLocked: hexToAscii(response.collateralLocked) as CurrencyKey,
	collateralLockedAmount: wei(response.collateralLockedAmount, SYNTH_DECIMALS, false),
	synthBorrowed: hexToAscii(response.synthBorrowed) as CurrencyKey,
	synthBorrowedAmount: wei(response.synthBorrowedAmount, SYNTH_DECIMALS, false),
	createdAt: new Date(Number(response.createdAt) * 1000),
	closedAt: response.closedAt != null ? new Date(Number(response.closedAt) * 1000) : null,
	isOpen: Boolean(response.isOpen),
	collateralChanges: (response?.collateralChanges ?? []).map(formatShortCollateralChanges),
	liquidations: (response?.liquidations ?? []).map(formatShortLiquidations),
	loanChanges: (response?.loanChanges ?? []).map(formatShortLoanChanges),
});

export const formatShortLiquidations = (response: any): ShortLiquidation => ({
	id: response.id,
	isClosed: Boolean(response.isClosed),
	liquidatedAmount: wei(response.liquidatedAmount, SYNTH_DECIMALS, false),
	liquidatedCollateral: response.liquidatedCollateral,
	liquidator: response.liquidator,
	timestamp: Number(response.timestamp) * 1000,
});

export const formatShortCollateralChanges = (response: any) => ({
	amount: wei(response.amount, SYNTH_DECIMALS, false),
	collateralAfter: wei(response.collateralAfter, SYNTH_DECIMALS, false),
	id: response.id,
	isDeposit: Boolean(response.isDeposit),
	timestamp: Number(response.timestamp) * 1000,
});

export const formatShortLoanChanges = (response: any) => ({
	amount: wei(response.amount, SYNTH_DECIMALS, true),
	id: response.id,
	isRepayment: Boolean(response.isRepayment),
	loanAfter: wei(response.loanAfter, SYNTH_DECIMALS, false),
	timestamp: Number(response.timestamp) * 1000,
});
