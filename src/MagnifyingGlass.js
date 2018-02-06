import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
	showZoom: PropTypes.bool.isRequired,

	// mouse position
	relX: PropTypes.number.isRequired,
	relY: PropTypes.number.isRequired,

	// image
	width: PropTypes.number,
	height: PropTypes.number,

	// zoom image
	zoomImgSrc: PropTypes.string.isRequired,
	zoomFactor: PropTypes.number.isRequired,

	// magnifying glass
	mgWidth: PropTypes.number.isRequired,
	mgHeight: PropTypes.number.isRequired,
	mgShape: PropTypes.string.isRequired,
	mgOffsetX: PropTypes.number.isRequired,
	mgOffsetY: PropTypes.number.isRequired
};


export default function MagnifyingGlass(props) {
	const style = {
		transition: 'opacity 0.3s',
		position: 'absolute',
		zIndex: 1,
		width: props.mgWidth,
		height: props.mgHeight,
		left: `calc(${props.relX * 100}% - ${props.mgWidth / 2}px + ${props.mgOffsetX}px)`,
		top: `calc(${props.relY * 100}% - ${props.mgHeight / 2}px + ${props.mgOffsetY}px)`,
		backgroundImage: `url(${props.zoomImgSrc})`,
		backgroundPosition: `calc(${props.relX * 100}% - ${props.mgOffsetX}px) calc(${props.relY * 100}% - ${props.mgOffsetY}px)`,
		backgroundRepeat: 'no-repeat',
		border: '2px solid #EBEBEB',
		borderRadius: props.mgShape === 'circle' ? '50%' : '0',
		boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.3)',
		pointerEvents: 'none'
	};

	// zoomImg size
	if (props.height && props.width) {
		style.backgroundSize = `${props.zoomFactor * props.width}% ${props.zoomFactor * props.height}%`;
	}
	else if (props.height && !props.width) {
		style.backgroundSize = `auto ${props.zoomFactor * props.height}%`;
	}
	else if (!props.height && props.width) {
		style.backgroundSize = `${props.zoomFactor * props.width}% auto`;
	}

	// show/hide magnifying glass (opacity needed for transition)
	if (props.showZoom) {
		style.opacity = 1;
	}
	else {
		style.opacity = 0;
	}

	return (
		<div
			className="magnifying-glass"
			style={style}
		/>
	);
}


MagnifyingGlass.propTypes = propTypes;