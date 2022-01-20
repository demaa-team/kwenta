import styled, { css } from 'styled-components';

import Button from 'components/Button';

import { FixedFooterMixin, GridDivCentered, numericValueCSS } from 'styles/common';
import media from 'styles/media';

import { zIndex } from 'constants/ui';

export const SummaryItems = styled.div<{ attached?: boolean }>`
	display: grid;
	grid-auto-flow: column;
	flex-grow: 1;
	${media.lessThan('md')`
		grid-auto-flow: unset;
		grid-template-columns: auto auto;
		grid-template-rows: auto auto;
		grid-gap: 20px;
	`}

	${(props) =>
		props.attached &&
		css`
			& {
				grid-template-rows: unset;
			}
		`}
`;

export const SummaryItem = styled.div`
	display: grid;
	grid-gap: 4px;
	width: 110px;
	${media.lessThan('md')`
		width: unset;
	`}
`;

export const SummaryItemLabel = styled.div`
	text-transform: capitalize;
`;

export const SummaryItemValue = styled.div`
	color: ${(props) => props.theme.colors.white};
	${numericValueCSS};
	max-width: 100px;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const MessageContainer = styled(GridDivCentered)<{
	attached?: boolean;
	showProvider?: boolean;
}>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	grid-template-columns: ${(props) => props.showProvider && '.5fr'} 1fr auto;
	background-color: ${(props) => props.theme.colors.elderberry};
	/* padding: 16px 32px;
	margin: 0 0 20px; */
	// height: 17.3rem;
	padding: 0.8rem 1.6rem;
	/*
	width: 100%;
	border-radius: 1000px;
	grid-template-columns: 1fr auto;
	background-color: ${(props) => props.theme.colors.elderberry};
	padding: 0.8rem 1.6rem;
	// max-width: 750px;
	margin: 0 auto;
	*/
	&.custom-footer-style{
		flex-direction: row;
		// height: 17.3rem;
		height: auto;
		align-items: center;
		.custom-message-btn{
			margin-top: 0px;
			margin-left: 2rem;
		}
	}
	${(props) =>
		props.attached &&
		css`
			border-radius: 4px;
		`}
	${media.lessThan('md')`
		${FixedFooterMixin};
		box-shadow: 0 -8px 8px 0 ${(props) => props.theme.colors.black};
		justify-content: center;
		display: flex;
		z-index: ${zIndex.BASE};
	`}
`;

export const FixedMessageContainerSpacer = styled.div`
	height: 70px;
`;

export const Message = styled.div`
	color: ${(props) => props.theme.colors.white};
	font-size: 1.2rem;
	font-family: ${(props) => props.theme.fonts.bold};
	flex-grow: 1;
	text-align: center;
`;

export const MessageButton = styled(Button).attrs({
	variant: 'primary',
	size: 'lg',
	isRounded: true,
})`
	margin-top: 1.9rem;
	font-size: 1.2rem;
	height:2.5rem;
	line-height:2.5rem;
`;
