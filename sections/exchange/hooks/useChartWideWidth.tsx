import { useEffect, useState } from 'react';
import { DEFAULT_WIDE_WIDTH } from 'sections/exchange/TradeCard/constants';

const useChartWideWidth = () => {
	const [width, setWidth] = useState(DEFAULT_WIDE_WIDTH);
	useEffect(() => {
		setWidth(window.innerWidth - window.innerWidth*17.5 / 96);
	}, []);
	return width;
};

export default useChartWideWidth;
