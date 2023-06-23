import React, { useState } from 'react';
import styles from '../styles/styles.module.scss';

const 基础行动条 = 10000;
const 每轮时间 = 100;
const 第一轮额外时间 = 50;

/**
 * 每轮时间为100，第一轮150，行动a轮的总时间为100a+50
 * 速度百分比类技能假设第一次行动之后永续
 * 速度加成之后的速度为（基础速度*速度百分比)+目标速度，而第一次行动所需时间是（10000/目标速度）
 * 所以b次行动消耗的时间为（10000/(基础速度*速度百分比+目标速度))*(b-1)+(10000/目标速度)
 * 得到方程 100a+50 = (10000/(基础速度*速度百分比+目标速度))*(b-1)+(10000/目标速度)
 * 其中仅"目标速度"为未知，设为x，基础速度s，速度百分比p
 * 100a+50 = (10000/(sp + x))(b - 1) + (10000/x)
 * 解二次方程得到
 * x = (-2*a*p*s + 200*b - p*s - sqrt(4*a**2*p**2*s**2 - 800*a*b*p*s + 4*a*p**2*s**2 + 1600*a*p*s + 40000*b**2 - 400*b*p*s + p**2*s**2 + 800*p*s))/(2*(2*a + 1))
 * 或
 * x = (-2*a*p*s + 200*b - p*s + sqrt(4*a**2*p**2*s**2 - 800*a*b*p*s + 4*a*p**2*s**2 + 1600*a*p*s + 40000*b**2 - 400*b*p*s + p**2*s**2 + 800*p*s))/(2*(2*a + 1))
 * 取正数解
 */
const 计算目标速度 = (基础速度, 速度百分比, 行动缩短, 目标轮数, 目标行动数) => {
	const a = 目标轮数;
	const b = 目标行动数;
	const s = 基础速度;
	const p = 速度百分比 / 100;
	const t = Math.sqrt(
		4 * a ** 2 * p ** 2 * s ** 2 -
			800 * a * b * p * s +
			4 * a * p ** 2 * s ** 2 +
			1600 * a * p * s +
			40000 * b ** 2 -
			400 * b * p * s +
			p ** 2 * s ** 2 +
			800 * p * s
	);
	let 解 = (-2 * a * p * s + 200 * b - p * s - t) / (2 * (2 * a + 1));
	if (解 > 0) return Math.ceil(解);
	解 = (-2 * a * p * s + 200 * b - p * s + t) / (2 * (2 * a + 1));
	return Math.ceil(解);
};

const 简易计算目标速度 = (基础速度, 速度百分比, 行动缩短, 目标轮数, 目标行动数) => {
	const 行动条 = 基础行动条 * (1 - 行动缩短 / 100);
	return Math.ceil((目标行动数 * 行动条) / (目标轮数 * 每轮时间 + 第一轮额外时间));
};

export default function 速度页面() {
	const [基础速度, 设置基础速度] = useState(100);
	const [速度百分比, 设置速度百分比] = useState(0);
	const [行动缩短, 设置行动缩短] = useState(0);

	return (
		<>
			<div>
				<div>
					基础速度
					<input type="number" onChange={(e) => 设置基础速度(+e.target.value)} value={基础速度}></input>
				</div>
			</div>
			<div>
				<div>
					速度百分比
					<input type="number" onChange={(e) => 设置速度百分比(+e.target.value)} value={速度百分比}></input> %
				</div>
			</div>
			<div>
				<div>
					行动缩短
					<input type="number" onChange={(e) => 设置行动缩短(+e.target.value)} value={行动缩短}></input> %
				</div>
			</div>

			<div>
				目标行动回数所需速度：
				{[
					[1, 2],
					[2, 3],
					[2, 4],
					[2, 5],
					[3, 4],
					[3, 5],
					[3, 6],
					[4, 5],
					[4, 6],
					[4, 7],
					[4, 8],
					[5, 6],
					[5, 7],
					[5, 8],
					[5, 9],
					[5, 10],
				].map(([目标轮数, 目标行动数], i) => (
					<div key={i}>
						{目标轮数}轮{目标行动数}动：{计算目标速度(基础速度, 速度百分比, 行动缩短, 目标轮数, 目标行动数)}
					</div>
				))}
			</div>
		</>
	);
}
