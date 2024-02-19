import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.defaults.color = '#fff';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const options1 = {
	responsive: true,
	plugins: {
		title: {
			display: true,
			text: '抽牌统计',
			font: {
				size: 24,
			},
		},
		legend: {
			labels: {
				font: {
					size: 24,
				},
			},
		},
	},
};

const options2 = {
	...options1,
	plugins: {
		...options1.plugins,
		title: {
			...options1.plugins.title,
			text: '成功率统计',
		},
	},
};

const options3 = {
	...options1,
	plugins: {
		...options1.plugins,
		title: {
			...options1.plugins.title,
			text: '战技点消耗',
		},
	},
};

export default function 青雀抽牌页面() {
	const [队友行动次数, 设置队友行动次数] = useState(3);
	const [测试次数, 设置测试次数] = useState(10000);
	const [图表, 设置图表] = useState(<></>);

	const 抽牌 = (旧手牌, 抽牌次数 = 1) => {
		let 手牌 = [...旧手牌];
		for (let j = 0; j < 抽牌次数; j++) {
			let 抽到的牌 = Math.floor(Math.random() * 3);
			手牌.push(抽到的牌);
		}

		if (手牌.length > 4) {
			let 牌数 = {};
			手牌.forEach((牌) => (牌数[牌] ? 牌数[牌]++ : (牌数[牌] = 1)));
			let items = Object.keys(牌数).map(function (key) {
				return [key, 牌数[key]];
			});
			items.sort(function (first, second) {
				return second[1] - first[1];
			});
			手牌 = [];
			for (let j = 0; j < 4; j++) {
				手牌.push(items[0][0]);
				items[0][1]--;
				if (items[0][1] <= 0) {
					items.splice(0, 1);
				}
			}
		}

		return 手牌;
	};

	const 胡了 = (手牌) => {
		if (
			手牌.length === 4 &&
			手牌.reduce((pre, curr, i, array) => {
				return pre && curr === array[0];
			}, true)
		) {
			return true;
		}
		return false;
	};

	const 计算图表 = () => {
		const labels = ['0', '1', '2', '3', '4', '5', '6+'];
		let 无不求人统计 = [0, 0, 0, 0, 0, 0, 0];
		let 有不求人统计 = [0, 0, 0, 0, 0, 0, 0];

		for (let i = 0; i < 测试次数; i++) {
			let 手牌 = [];
			for (let j = 0; j < 队友行动次数 + 1; j++) {
				手牌 = 抽牌(手牌);
			}
			if (胡了(手牌)) {
				无不求人统计[0]++;
				continue;
			}
			let 不求人 = false;
			for (let j = 0; j < 5; j++) {
				手牌 = 抽牌(手牌, 2);
				不求人 = 不求人 || Math.random() < 0.24;
				if (胡了(手牌)) {
					if (不求人) {
						有不求人统计[j + 1]++;
					} else {
						无不求人统计[j + 1]++;
					}
					break;
				}
			}
			if (!胡了(手牌)) {
				无不求人统计[6]++;
			}
		}

		const pieLabels = ['胡了', '不求人', '失败'];
		const pieData = [
			无不求人统计.slice(0, 6).reduce((pre, curr) => pre + curr, 0),
			有不求人统计.reduce((pre, curr) => pre + curr, 0),
			无不求人统计[6],
		];

		const 战技点标签 = ['恢复1', '0', '1', '2', '3', '4', '5'];
		let 战技点数据 = [...无不求人统计];
		有不求人统计.slice(1, 6).forEach((value, index) => (战技点数据[index] += value));

		let 平均战技点消耗 = 战技点数据.reduce((pre, curr, index) => pre + curr * (index - 1), 0) / 测试次数;

		设置图表(
			<div style={{ width: '70rem' }}>
				<Bar
					options={options1}
					data={{
						labels: labels,
						datasets: [
							{
								label: '无不求人',
								data: 无不求人统计,
								backgroundColor: 'rgba(255, 99, 132, 0.5)',
							},
							{
								label: '有不求人',
								data: 有不求人统计,
								backgroundColor: 'rgba(53, 162, 235, 0.5)',
							},
						],
					}}
				/>
				<Pie
					options={options2}
					data={{
						labels: pieLabels,
						datasets: [
							{
								label: '次数',
								data: pieData,
								backgroundColor: [
									'rgba(255, 99, 132, 0.5)',
									'rgba(53, 162, 235, 0.5)',
									'rgba(100, 255, 100, 0.5)',
								],
							},
						],
					}}
				/>
				<Pie
					options={options3}
					data={{
						labels: 战技点标签,
						datasets: [
							{
								label: '次数',
								data: 战技点数据,
								backgroundColor: [
									'rgba(40, 252, 111)',
									'rgba(35, 219, 97)',
									'rgba(28, 173, 77)',
									'rgba(20, 120, 54)',
									'rgba(11, 66, 30)',
									'rgba(5, 31, 14)',
									'rgba(0, 0, 0)',
								],
							},
						],
					}}
				/>
				<div>平均战技点消耗: {平均战技点消耗}</div>
			</div>
		);
	};

	return (
		<>
			<div>
				<div>
					队友行动次数
					<input
						type="number"
						onChange={(e) => 设置队友行动次数(+e.target.value)}
						value={队友行动次数}
					></input>{' '}
				</div>
			</div>
			<div>
				<div>
					测试次数
					<input type="number" onChange={(e) => 设置测试次数(+e.target.value)} value={测试次数}></input>{' '}
				</div>
			</div>
			<div>
				<div>
					<button onClick={() => 计算图表()}>计算</button>
				</div>
			</div>
			<div>{图表}</div>
		</>
	);
}
