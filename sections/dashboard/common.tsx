import styled from 'styled-components';

export const CardTitle = styled.div`
	font-family: ${(props) => props.theme.fonts.bold};
	font-size: 0.8rem;
	color: ${(props) => props.theme.colors.white};
`;

export const ConvertContainer = styled.div`
	/* max-width: 1000px; */
	margin: 0 auto;
	width: 100%;
	background: #203298;
	border-radius: 22px;
`;
