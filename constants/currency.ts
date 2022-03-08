import { CurrencyKey } from 'demaa-contracts-interface';
import keyBy from 'lodash/keyBy';

import { Synths } from 'demaa-contracts-interface';
import Wei from '@synthetixio/wei';

export type { CurrencyKey } from 'demaa-contracts-interface';
export { Synths } from 'demaa-contracts-interface';

// TODO: standardize this
export type Category = 'crypto' | 'forex' | 'equities' | 'index' | 'commodity' | 'inverse';

export const CATEGORY: Category[] = [
	'crypto',
	'forex',
	'equities',
	'index',
	'commodity',
	'inverse',
];
export const CATEGORY_MAP = keyBy(CATEGORY);

export const CRYPTO_CURRENCY = [
	'KNC',
	'COMP',
	'REN',
	'LEND',
	'DEM',
	'BTC',
	'ETH',
	'XRP',
	'BCH',
	'LTC',
	'EOS',
	'BNB',
	'XTZ',
	'XMR',
	'ADA',
	'LINK',
	'TRX',
	'DASH',
	'ETC',
	'sCN',
	'sUSD',
	'sETH',
	'sBTC'
];

export const CRYPTO_CURRENCY_MAP = keyBy(CRYPTO_CURRENCY);

export const FIAT_SYNTHS: Set<CurrencyKey> = new Set([Synths.sUSD]);

export const LSE_SYNTHS = new Set<CurrencyKey>([]);

export const TSE_SYNTHS = new Set<CurrencyKey>([]);

export const AFTER_HOURS_SYNTHS: Set<CurrencyKey> = new Set([]);

export const MARKET_HOURS_SYNTHS = new Set([
	...FIAT_SYNTHS,
	...LSE_SYNTHS,
	...TSE_SYNTHS,
	...AFTER_HOURS_SYNTHS,
]);

export const COMMODITY_SYNTHS = new Set<CurrencyKey>([]);

export const sUSD_EXCHANGE_RATE = new Wei(1);
export const SYNTH_DECIMALS = 18;

export const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
