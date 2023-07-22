import React from 'react';
import 三月七图片 from './三月七.png';
import Image from 'next/image';

export default function 三月七(props) {
	return (
		<div style={{ textAlign: 'end' }}>
			<Image src={三月七图片} alt="三月七.png" />
		</div>
	);
}
