import { useState, FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';

import { FlexDivCol } from 'styles/common';

import { CardTitle, ConvertContainer } from '../common';

import CurrencyConvertCard from '../CurrencyConvertCard';

import HowItWorksModal from './HowItWorksModal';

const Onboard: FC = () => {
	const { t } = useTranslation();
	const [howItWorksModalOpened, setHowItWorksModalOpened] = useState<boolean>(false);

	return (
		<>
			<FlexDivCol>
				<WrapperFlexDivCol>
					<Title>{t('dashboard.onboard.title')}</Title>
					<Subtitle>{t('dashboard.onboard.subtitle')}</Subtitle>
					<Center>
						<Button
							variant="primary"
							isRounded={true}
							size="lg"
							onClick={() => setHowItWorksModalOpened(true)}
							className='learnMoreBtn'
						>
							{t('dashboard.onboard.learn-more')}
						</Button>
					</Center>
				</WrapperFlexDivCol>
				

				<ConvertContainer>
					<StyledCardTitle>{t('dashboard.onboard.convert')}</StyledCardTitle>
					<CurrencyConvertCard />
				</ConvertContainer>
			</FlexDivCol>
			{howItWorksModalOpened && (
				<HowItWorksModal onDismiss={() => setHowItWorksModalOpened(false)} />
			)}
		</>
	);
};

const Title = styled.div`
	font-family: ${(props) => props.theme.fonts.bold};
	color: ${(props) => props.theme.colors.white};
	/* text-transform: uppercase; */
	font-size: 16px;
	text-align: left;
	padding-bottom: 90px;
`;

const Subtitle = styled.div`
	font-family: ${(props) => props.theme.fonts.bold};
	font-size: 26px;
	/* line-height: 24px; */
	color: ${(props) => props.theme.colors.white};
	text-align: center;
	margin-bottom: 45px;
`;

export const Center = styled.div`
	margin: 0 auto;
	/* margin-bottom: 100px; */
`;

const StyledCardTitle = styled(CardTitle)`
	/* border-bottom: 1px solid ${(props) => props.theme.colors.navy}; */
	padding: 20px 30px;
	margin-bottom: 24px;
`;

const WrapperFlexDivCol=styled(FlexDivCol)`
	background: #203298;
	border-radius: 22px;
	padding: 20px 30px 36px;
	margin-bottom: 16px;
	.learnMoreBtn{
		font-size: 24px;
		height:50px;
	}
`

export default Onboard;
