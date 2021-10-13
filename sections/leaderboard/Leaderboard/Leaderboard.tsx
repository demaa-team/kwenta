import Table from 'components/Table';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Svg } from 'react-optimized-image';
import { CellProps } from 'react-table';
import styled from 'styled-components';
import { ExternalLink, GridDivCenteredRow } from 'styles/common';
import Currency from 'components/Currency';
import { Synths } from 'constants/currency';
import { wei } from '@synthetixio/wei';
import useGetRegisteredParticpants from 'queries/futures/useGetRegisteredParticpants';
import useGetPnLs from 'queries/futures/useGetPnLs';

const Leaderboard: FC = () => {
	const { t } = useTranslation();

	const participantsQuery = useGetRegisteredParticpants();
	const participants = participantsQuery.data ?? [];
	console.log('PARTICIPANTS', participants, useGetRegisteredParticpants());

	const pnlQueries = useGetPnLs(participants.map(({ address }) => address));
	const pnls: any = pnlQueries.map((query) => query.data);
	const pnlMap = Object.assign({}, ...pnls);

	const data = useMemo(() => {
		return participants
			.map((participant) => ({
				//rank: 1,
				trader: participant.username,
				totalTrades: 24,
				liquidations: 1,
				'24h': 80000,
				pnl: (pnlMap[participant.address] ?? wei(0)).toNumber(),
			}))
			.sort((a, b) => b.pnl - a.pnl);
	}, [participants, pnlMap]);
	console.log(data, data.length);

	const getMedal = (position: number) => {
		switch (position) {
			case 1:
				return <Medal>🥇</Medal>;
			case 2:
				return <Medal>🥈</Medal>;
			case 3:
				return <Medal>🥉</Medal>;
		}
	};

	return (
		<>
			<StyledTable
				showPagination={true}
				isLoading={participantsQuery.isLoading && !participantsQuery.isSuccess}
				data={data}
				columns={[
					{
						Header: <TableHeader>{t('leaderboard.leaderboard.table.rank')}</TableHeader>,
						accessor: 'rank',
						Cell: (cellProps: CellProps<any>) => (
							<StyledOrderType>
								{cellProps.row.index + 1}
								{getMedal(cellProps.row.index + 1)}
							</StyledOrderType>
						),
						width: 100,
					},
					{
						Header: <TableHeader>{t('leaderboard.leaderboard.table.trader')}</TableHeader>,
						accessor: 'trader',
						width: 175,
					},
					{
						Header: <TableHeader>{t('leaderboard.leaderboard.table.total-trades')}</TableHeader>,
						accessor: 'totalTrades',
						sortType: 'basic',
						width: 175,
						sortable: true,
					},
					{
						Header: <TableHeader>{t('leaderboard.leaderboard.table.liquidations')}</TableHeader>,
						accessor: 'liquidations',
						sortType: 'basic',
						width: 175,
						sortable: true,
					},
					/*{
						Header: <TableHeader>{t('leaderboard.leaderboard.table.24h-pnl')}</TableHeader>,
						accessor: '24h',
						sortType: 'basic',
						Cell: (cellProps: CellProps<any>) => (
							<ColorCodedPrice
								currencyKey={Synths.sUSD}
								price={cellProps.row.original.pnl}
								sign={'$'}
								conversionRate={1}
							/>
						),
						width: 175,
						sortable: true,
					},*/
					{
						Header: <TableHeader>{t('leaderboard.leaderboard.table.total-pnl')}</TableHeader>,
						accessor: 'pnl',
						sortType: 'basic',
						Cell: (cellProps: CellProps<any>) => (
							<ColorCodedPrice
								currencyKey={Synths.sUSD}
								price={cellProps.row.original.pnl}
								sign={'$'}
								conversionRate={1}
							/>
						),
						width: 175,
						sortable: true,
					},
				]}
			/>
		</>
	);
};

const Medal = styled.span`
	font-size: 16px;
	margin-left: 4px;
`;

const ColorCodedPrice = styled(Currency.Price)`
	color: ${(props) =>
		props.price > 0
			? props.theme.colors.green
			: props.price < 0
			? props.theme.colors.red
			: props.theme.colors.white};
`;

const StyledExternalLink = styled(ExternalLink)`
	margin-left: auto;
`;

const StyledLinkIcon = styled(Svg)`
	width: 14px;
	height: 14px;
	color: ${(props) => props.theme.colors.blueberry};
	&:hover {
		color: ${(props) => props.theme.colors.goldColors.color1};
	}
`;

const StyledTable = styled(Table)`
	margin-top: 16px;
	background-color: black;
`;

const TableHeader = styled.div`
	font-family: ${(props) => props.theme.fonts.bold};
	color: ${(props) => props.theme.colors.blueberry};
`;

const StyledOrderType = styled.div`
	color: ${(props) => props.theme.colors.white};
	display: flex;
	align-items: center;
`;

const StyledCurrencyKey = styled.span`
	color: ${(props) => props.theme.colors.white};
	padding-right: 10px;
`;

const StyledPrice = styled.span`
	color: ${(props) => props.theme.colors.silver};
`;

const TableNoResults = styled(GridDivCenteredRow)`
	padding: 50px 0;
	justify-content: center;
	background-color: ${(props) => props.theme.colors.elderberry};
	margin-top: -2px;
	justify-items: center;
	grid-gap: 10px;
`;

export default Leaderboard;