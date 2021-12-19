const goldColors = {
	color1: '#BE9461',
	color2: '#9C6C3C',
	color3: '#D96247',
	color4: '#B98C55',
};

export default {
	black: '#1A2479',
	vampire: '#08080F',
	elderberry: '#203298',
	navy: '#1A1A2E',
	stormcloud: '#57616B',
	blueberry: '#9F9EC5',
	silver: '#F86C29',
	white: '#FFFFFF',
	red: '#CB366D',
	redHover: '#FF568F',
	green: '#66DD84',
	yellow: '#FFDF6D',
	goldColors,
	// gold: `linear-gradient(180deg, ${goldColors.color1} 0%, ${goldColors.color2} 100%)`,
	gold:'#F86C29',
	goldHover: `linear-gradient(180deg, ${goldColors.color3} 0%, ${goldColors.color4} 100%)`,
	// network colors
	mainnet: '#29B6AF',
	ropsten: '#FF4A8D',
	kovan: '#7057FF',
	rinkeby: '#F6C343',
	goerli: 'rgb(48, 153, 242)',
	connectedDefault: goldColors.color1,
	noNetwork: 'rgb(155, 155, 155)',
	transparentBlack: 'rgba(0, 0, 0, 0.5)',
};
