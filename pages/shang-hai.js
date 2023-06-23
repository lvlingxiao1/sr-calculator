import React, { useState } from 'react';
import styles from '../styles/styles.module.scss';

export default function Home() {
	const [基础攻击力, 设置基础攻击力] = useState(1000);
	const [面板攻击力, 设置面板攻击力] = useState(2000);
	const [属性伤害提高, 设置属性伤害提高] = useState(50);
	const [暴击率, 设置暴击率] = useState(50);
	const [暴击伤害, 设置暴击伤害] = useState(100);
	const [怪物抗性, 设置怪物抗性] = useState(20);
	const [减抗, 设置减抗] = useState(0);
	const [怪物等级, 设置怪物等级] = useState(80);
	const [人物等级, 设置人物等级] = useState(80);
	const [减防百分比, 设置减防百分比] = useState(0);
	const [速度, 设置速度] = useState(100);
	const [技能倍率, 设置技能倍率] = useState(100);
	return (
		<>
			<div>WIP</div>
			<h4>攻击力乘区</h4>
			<div>
				<div>
					基础攻击力
					<input type="number" onChange={(e) => 设置基础攻击力(+e.target.value)} value={基础攻击力}></input>
					面板攻击力
					<input type="number" onChange={(e) => 设置面板攻击力(+e.target.value)} value={面板攻击力}></input>
				</div>
			</div>
			<h4>增伤乘区</h4>

			<div>
				属性伤害提高
				<input type="number" onChange={(e) => 设置属性伤害提高(+e.target.value)} value={属性伤害提高}></input> %
			</div>
			<h4>暴击乘区</h4>
			<div>
				<div>
					暴击率
					<input type="number" onChange={(e) => 设置暴击率(+e.target.value)} value={暴击率}></input> %
					暴击伤害
					<input type="number" onChange={(e) => 设置暴击伤害(+e.target.value)} value={暴击伤害}></input> %
				</div>
			</div>
			<h4>防御力乘区</h4>
			<div>
				<div>
					人物等级
					<input type="number" onChange={(e) => 设置人物等级(+e.target.value)} value={人物等级}></input>
					怪物等级
					<input type="number" onChange={(e) => 设置怪物等级(+e.target.value)} value={怪物等级}></input>
					减防百分比
					<input type="number" onChange={(e) => 设置减防百分比(+e.target.value)} value={减防百分比}></input> %
				</div>
			</div>
			<h4>抗性乘区</h4>
			<div>
				<div>
					怪物抗性
					<input type="number" onChange={(e) => 设置怪物抗性(+e.target.value)} value={怪物抗性}></input> %
					减抗
					<input type="number" onChange={(e) => 设置减抗(+e.target.value)} value={减抗}></input> %
				</div>
			</div>
			<h4>速度乘区</h4>
			<div>
				速度
				<input type="number" onChange={(e) => 设置速度(+e.target.value)} value={速度}></input>
			</div>
			<h4>倍率乘区</h4>
			<div>
				技能倍率
				<input type="number" onChange={(e) => 设置技能倍率(+e.target.value)} value={技能倍率}></input>
			</div>

			<h3>单人伤害</h3>
			<div>单段伤害期待：</div>
			<div>单段暴击大数字：</div>
			<div>理论轮均伤害：</div>

			<h3>吃拐率</h3>
			<div>银狼加成</div>
			<div>布洛妮娅加成</div>
			<div>停云加成</div>
			<div>艾斯妲加成</div>
		</>
	);
}
