import styled, { css } from 'styled-components';
import media from 'styles/media';
import { FlexDiv, GridDivCenteredCol, GridDivCenteredRow, TextButton } from 'styles/common';

export const ChartData = styled.div<{ disabledInteraction: boolean }>`
	width: 100%;
	height: 100%;
	position: relative;
	${(props) =>
		props.disabledInteraction &&
		css`
			pointer-events: none;
			opacity: 0.1;
		`};
`;

export const LinkTag = styled.span`
	color: ${(props) => props.theme.colors.goldColors.color1};
	text-decoration: underline;
	&:hover {
		cursor: pointer;
	}
`;

export const CurrencyLabel = styled.div`
	font-size: 14px;
	text-transform: capitalize;
	color: ${(props) => props.theme.colors.white};
	font-family: ${(props) => props.theme.fonts.bold};
	display: flex;
	align-items: center;
	grid-gap: 5px;
`;

export const CurrencyPrice = styled.span`
	font-family: ${(props) => props.theme.fonts.mono};
	color: ${(props) => props.theme.colors.white};
`;

export const Actions = styled(FlexDiv)<{ reverseChildren?: boolean }>`
	// margin-top: 5px;
	flex-direction: ${(props) => (props.reverseChildren ? 'row-reverse' : 'row')};
	justify-content: space-between;
	grid-gap: 15px;

	${media.lessThan('sm')`
		overflow: auto;
		width: 70px;
	`}
`;

export const PeriodSelector = styled(GridDivCenteredCol)`
	grid-gap: 8px;
	padding-left:0.8rem;
	// border-left:2px solid #111C60;
`;

export const ChartBody = styled.div`
	padding-top: 10px;
	height: 35vh;
`;

export const StyledTextButton = styled(TextButton)<{ isActive: boolean }>`
	font-family: ${(props) => props.theme.fonts.bold};
	color: ${(props) => (props.isActive ? '#F86C29' : props.theme.colors.blueberry)};
	border-bottom: 2px solid
		${(props) => (props.isActive ? '#F86C29' : 'transparent')};
	&:hover {
		color: ${(props) => props.theme.colors.white};
	}
`;

export const TooltipContentStyle = styled.div`
	font-family: ${(props) => props.theme.fonts.regular};
	padding: 5px;
	border-radius: 4px;
	background-color: ${(props) => props.theme.colors.elderberry};
	text-align: left;
`;

export const ItemStyle = styled.div`
	color: ${(props) => props.theme.colors.white};
	padding: 3px 5px;
`;

export const LabelStyle = styled(ItemStyle)`
	text-transform: capitalize;
`;

export const OverlayMessage = styled(GridDivCenteredRow)`
	justify-items: center;
	text-align: center;
`;

export const OverlayMessageTitle = styled.div`
	font-family: ${(props) => props.theme.fonts.bold};
	color: ${(props) => props.theme.colors.white};
	font-size: 14px;
	padding-top: 10px;
	padding-bottom: 5px;
`;

export const OverlayMessageSubtitle = styled.div`
	color: ${(props) => props.theme.colors.silver};
	padding-bottom: 5px;
`;

export const OverlayTimer = styled.div`
	font-family: ${(props) => props.theme.fonts.mono};
`;

export const NoData = styled.div`
	font-size: 14px;
	color: ${(props) => props.theme.colors.white};
`;

export const CurrencyLabelWithDot = styled(CurrencyLabel)`
	display: flex;
	grid-gap: 5px;
	align-items: center;
`;

export const PriceDot = styled.div<{ color: string }>`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
`;
