import React, { useState } from 'react';
import styles from '../styles/styles.module.scss';

const 测试回能 = (普通攻击回能, 战技回能, 每回合额外回能, 能量需求, 充能效率) => {
	const 返回文本 = [];
	返回文本.push('三回合');
	const 三战技 = (5 + 战技回能 * 3 + 每回合额外回能 * 3) * 充能效率;
	返回文本.push(
		`三战技：${三战技.toFixed(2)} ${三战技 > 能量需求 ? '已充满' : `离充满差${(能量需求 - 三战技).toFixed(2)}`}`
	);
	const 两战技一普攻 = (5 + 战技回能 * 2 + 普通攻击回能 + 每回合额外回能 * 3) * 充能效率;
	返回文本.push(
		`两战技一普攻：${两战技一普攻.toFixed(2)} ${
			两战技一普攻 > 能量需求 ? '已充满' : `离充满差${(能量需求 - 两战技一普攻).toFixed(2)}`
		}`
	);
	const 一战技两普攻 = (5 + 战技回能 + 普通攻击回能 * 2 + 每回合额外回能 * 3) * 充能效率;
	返回文本.push(
		`一战技两普攻：${一战技两普攻.toFixed(2)} ${
			一战技两普攻 > 能量需求 ? '已充满' : `离充满差${(能量需求 - 一战技两普攻).toFixed(2)}`
		}`
	);

	返回文本.push('两回合');
	const 两战技 = (5 + 战技回能 * 2 + 每回合额外回能 * 2) * 充能效率;
	返回文本.push(
		`两战技：${两战技.toFixed(2)} ${两战技 > 能量需求 ? '已充满' : `离充满差${(能量需求 - 两战技).toFixed(2)}`}`
	);
	const 一战技一普攻 = (5 + 战技回能 + 普通攻击回能 + 每回合额外回能 * 2) * 充能效率;
	返回文本.push(
		`一战技一普攻${一战技一普攻.toFixed(2)} ${
			一战技一普攻 > 能量需求 ? '已充满' : `离充满差${(能量需求 - 一战技一普攻).toFixed(2)}`
		}`
	);

	return 返回文本;
};

export default function 充能页面() {
	const [普通攻击回能, 设置普通攻击回能] = useState(20);
	const [战技回能, 设置战技回能] = useState(30);
	const [每回合额外回能, 设置每回合额外回能] = useState(0);
	const [能量需求, 设置能量需求] = useState(120);
	return (
		<>
			<div>
				<div>
					普通攻击回能
					<input
						type="number"
						onChange={(e) => 设置普通攻击回能(+e.target.value)}
						value={普通攻击回能}></input>
				</div>
				<div>
					战技回能
					<input type="number" onChange={(e) => 设置战技回能(+e.target.value)} value={战技回能}></input>
				</div>
				<div>
					每回合额外回能
					<input
						type="number"
						onChange={(e) => 设置每回合额外回能(+e.target.value)}
						value={每回合额外回能}></input>
				</div>
				<div>
					能量需求
					<input type="number" onChange={(e) => 设置能量需求(+e.target.value)} value={能量需求}></input>
				</div>
			</div>
			<h3>无充能效率情况</h3>
			<div>
				{测试回能(普通攻击回能, 战技回能, 每回合额外回能, 能量需求, 1).map((s, i) => (
					<p key={i}>{s}</p>
				))}
			</div>
			<h3>携带充能连接绳（充能效率119.4%）</h3>
			<div>
				{测试回能(普通攻击回能, 战技回能, 每回合额外回能, 能量需求, 1.194).map((s, i) => (
					<p key={i}>{s}</p>
				))}
			</div>
			<h3>携带充能连接绳+生命的翁瓦克（充能效率124.4%）</h3>
			<div>
				{测试回能(普通攻击回能, 战技回能, 每回合额外回能, 能量需求, 1.244).map((s, i) => (
					<p key={i}>{s}</p>
				))}
			</div>
			<div></div>
		</>
	);
}
