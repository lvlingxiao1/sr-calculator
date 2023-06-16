import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function 效果命中页面() {
	const [基础命中, 设置基础命中] = useState(85);
	const [命中段数, 设置命中段数] = useState(1);
	const [怪物效果抵抗, 设置怪物效果抵抗] = useState(30);
	const [怪物特殊抵抗, 设置怪物特殊抵抗] = useState(0);
	const [目标命中率, 设置目标命中率] = useState(100);

	const 需要效果命中 =
		(Math.pow(目标命中率 / 100, 1 / 命中段数) /
			(1 - 怪物效果抵抗 / 100) /
			(1 - 怪物特殊抵抗 / 100) /
			(基础命中 / 100)) *
		100;

	return (
		<>
			<div>
				<div>
					基础命中
					<input
						type="number"
						onChange={(e) => 设置基础命中(+e.target.value)}
						value={基础命中}></input> %{' '}
				</div>
			</div>
			<div>
				<div>
					判定段数
					<input type="number" onChange={(e) => 设置命中段数(+e.target.value)} value={命中段数}></input>
				</div>
			</div>
			<div>
				<div>
					怪物效果抵抗
					<input
						type="number"
						onChange={(e) => 设置怪物效果抵抗(+e.target.value)}
						value={怪物效果抵抗}></input>{' '}
					%
				</div>
			</div>
			<div>
				<div>
					怪物特殊抵抗
					<input
						type="number"
						onChange={(e) => 设置怪物特殊抵抗(+e.target.value)}
						value={怪物特殊抵抗}></input>{' '}
					%
				</div>
			</div>
			<div>
				<div>
					目标命中率
					<input type="number" onChange={(e) => 设置目标命中率(+e.target.value)} value={目标命中率}></input> %
				</div>
			</div>
			<div>
				<div>需要效果命中: {需要效果命中.toFixed(2)}%</div>
			</div>
		</>
	);
}
