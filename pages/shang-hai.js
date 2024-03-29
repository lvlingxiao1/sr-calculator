import React, { useState } from 'react';
import styles from '../styles/styles.module.scss';
import 三月七 from '../components/三月七';

/**
 * @param {{
 * 面板攻击力: number,
 * 伤害提高: number,
 * 暴击率: number,
 * 暴击伤害: number,
 * 怪物抗性: number,
 * 减抗: number,
 * 人物等级: number,
 * 怪物等级: number,
 * 减防百分比: number,
 * 易伤: number,
 * 韧性减伤: number,
 * 速度: number,
 * 技能倍率: number,
 * }} params
 */
const 计算伤害 = ({
	面板攻击力,
	伤害提高,
	暴击率,
	暴击伤害,
	怪物抗性,
	减抗,
	人物等级,
	怪物等级,
	减防百分比,
	易伤,
	韧性减伤,
	速度,
	技能倍率,
}) => {
	const 敌方防御力 = (怪物等级 + 20) * (1 - 减防百分比 / 100);
	const 防御力减伤 = 敌方防御力 / (敌方防御力 + 人物等级 + 20);
	const 抗性减伤 = (怪物抗性 - 减抗) / 100;
	const 不暴击伤害 =
		面板攻击力 *
		(1 + 伤害提高 / 100) *
		(1 - 抗性减伤) *
		(1 - 防御力减伤) *
		(1 + 易伤 / 100) *
		(1 - 韧性减伤 / 100) *
		(技能倍率 / 100);
	const 暴击时伤害 = 不暴击伤害 * (1 + 暴击伤害 / 100);
	const 暴击伤害期望 = 不暴击伤害 * (1 - 暴击率 / 100) + (暴击时伤害 * 暴击率) / 100;
	const 轮均期待伤害 = 暴击伤害期望 * (速度 / 100);
	return {
		暴击时伤害,
		暴击伤害期望,
		轮均期待伤害,
	};
};

const 计算提升 = (提升后, 原本) => ((提升后 / 原本 - 1) * 100).toFixed(2);

export default function 伤害计算页面() {
	const [基础攻击力, 设置基础攻击力] = useState(1200);
	const [面板攻击力, 设置面板攻击力] = useState(3000);
	const [伤害提高, 设置伤害提高] = useState(48.8);
	const [暴击率, 设置暴击率] = useState(70);
	const [暴击伤害, 设置暴击伤害] = useState(140);
	const [怪物抗性, 设置怪物抗性] = useState(20);
	const [减抗, 设置减抗] = useState(0);
	const [怪物等级, 设置怪物等级] = useState(80);
	const [人物等级, 设置人物等级] = useState(80);
	const [减防百分比, 设置减防百分比] = useState(0);
	const [易伤, 设置易伤] = useState(0);
	const [韧性减伤, 设置韧性减伤] = useState(10);
	const [速度, 设置速度] = useState(134);
	const [技能倍率, 设置技能倍率] = useState(200);

	const 单人数值 = {
		面板攻击力,
		伤害提高,
		暴击率,
		暴击伤害,
		怪物抗性,
		减抗,
		人物等级,
		怪物等级,
		减防百分比,
		易伤,
		韧性减伤,
		速度,
		技能倍率,
	};

	const 单人伤害 = 计算伤害(单人数值);

	// 银狼
	const 银狼加成 = { 减抗: 10 + 3, 减防百分比: 45 + 8 };
	const 银狼植入弱点加成 = { 减抗: 10 + 20 + 3, 减防百分比: 45 + 8 };
	const 银狼加成下伤害期望 = 计算伤害({
		...单人数值,
		减防百分比: 单人数值.减防百分比 + 银狼加成.减防百分比,
		减抗: 单人数值.减抗 + 银狼加成.减抗,
	});
	const 银狼植入弱点加成下伤害期望 = 计算伤害({
		...单人数值,
		减防百分比: 单人数值.减防百分比 + 银狼植入弱点加成.减防百分比,
		减抗: 单人数值.减抗 + 银狼植入弱点加成.减抗,
	});
	const 银狼植入量子弱点量子套加成下伤害期望 = 计算伤害({
		...单人数值,
		减防百分比: 单人数值.减防百分比 + 银狼植入弱点加成.减防百分比 + 10,
		减抗: 单人数值.减抗 + 银狼植入弱点加成.减抗,
	});

	// 布洛妮娅
	const 假设布洛妮娅暴击伤害 = 150;
	const 布洛妮娅加成 = {
		伤害提高: 66 + 10,
		面板攻击力: 基础攻击力 * 0.55,
		暴击伤害: 20 + 假设布洛妮娅暴击伤害 * 0.16,
	};
	const 布洛妮娅加成下伤害期望 = 计算伤害({
		...单人数值,
		伤害提高: 单人数值.伤害提高 + 布洛妮娅加成.伤害提高,
		面板攻击力: 单人数值.面板攻击力 + 布洛妮娅加成.面板攻击力,
		暴击伤害: 单人数值.暴击伤害 + 布洛妮娅加成.暴击伤害,
	});

	// 停云
	const 停云加成 = {
		伤害提高: 50,
		面板攻击力: 基础攻击力 * 0.5,
		技能倍率: 20,
	};
	const 停云加成下伤害期望 = 计算伤害({
		...单人数值,
		伤害提高: 单人数值.伤害提高 + 停云加成.伤害提高,
		面板攻击力: 单人数值.面板攻击力 + 停云加成.面板攻击力,
	});
	const 停云输出角色为雷属性加成下伤害期望 = 计算伤害({
		...单人数值,
		伤害提高: 单人数值.伤害提高 + 停云加成.伤害提高,
		面板攻击力: 单人数值.面板攻击力 + 停云加成.面板攻击力,
		技能倍率: 单人数值.技能倍率 + 停云加成.技能倍率,
	});

	// 艾斯妲
	const 艾斯妲加成 = {
		速度: 50,
		面板攻击力: 基础攻击力 * 0.7,
		伤害提高: 18,
	};
	const 艾斯妲加成下伤害期望 = 计算伤害({
		...单人数值,
		面板攻击力: 单人数值.面板攻击力 + 艾斯妲加成.面板攻击力,
		速度: 单人数值.速度 + 艾斯妲加成.速度,
	});
	const 艾斯妲输出角色为火属性加成下伤害期望 = 计算伤害({
		...单人数值,
		伤害提高: 单人数值.伤害提高 + 艾斯妲加成.伤害提高,
		面板攻击力: 单人数值.面板攻击力 + 艾斯妲加成.面板攻击力,
		速度: 单人数值.速度 + 艾斯妲加成.速度,
	});

	// 驭空
	const 驭空加成 = {
		面板攻击力: 基础攻击力 * 0.8,
		暴击率: 28,
		暴击伤害: 65,
		伤害提高: 12,
	};
	const 驭空加成下伤害期望 = 计算伤害({
		...单人数值,
		面板攻击力: 单人数值.面板攻击力 + 驭空加成.面板攻击力,
		暴击率: 单人数值.暴击率 + 驭空加成.暴击率,
		暴击伤害: 单人数值.暴击伤害 + 驭空加成.暴击伤害,
	});
	const 驭空输出角色为虚数属性加成下伤害期望 = 计算伤害({
		...单人数值,
		伤害提高: 单人数值.伤害提高 + 驭空加成.伤害提高,
		面板攻击力: 单人数值.面板攻击力 + 驭空加成.面板攻击力,
		暴击率: 单人数值.暴击率 + 驭空加成.暴击率,
		暴击伤害: 单人数值.暴击伤害 + 驭空加成.暴击伤害,
	});

	// 阮梅
	const 阮梅加成 = {
		伤害提高: 48,
		减抗: 25,
		速度: 10,
		一魂减防: 20,
	};
	const 阮梅加成下伤害期望 = 计算伤害({
		...单人数值,
		伤害提高: 单人数值.伤害提高 + 阮梅加成.伤害提高,
		减抗: 阮梅加成.减抗,
		速度: 单人数值.速度 * 1.1,
	});
	const 阮梅一魂加成下伤害期望 = 计算伤害({
		...单人数值,
		伤害提高: 单人数值.伤害提高 + 阮梅加成.伤害提高,
		减抗: 阮梅加成.减抗,
		速度: 单人数值.速度 * 1.1,
		减防百分比: 阮梅加成.一魂减防,
	});

	// 黑天鹅
	const 佩拉加成 = {
		减防百分比: 42,
		二魂减冰抗: 12,
		秘技减防: 20,
	};
	const 佩拉加成下伤害期望 = 计算伤害({
		...单人数值,
		减防百分比: 佩拉加成.减防百分比,
	});
	const 佩拉大招加减冰抗加成 = 计算伤害({
		...单人数值,
		减防百分比: 佩拉加成.减防百分比,
		减抗: 佩拉加成.二魂减冰抗,
	});
	const 佩拉大招加减冰抗加秘技加成 = 计算伤害({
		...单人数值,
		减防百分比: 佩拉加成.减防百分比 + 佩拉加成.秘技减防,
		减抗: 佩拉加成.二魂减冰抗,
	});

	// 黑天鹅
	const 黑天鹅加成 = {
		减防百分比: 20.8,
		减抗: 25,
		易伤: 25,
	};
	const 黑天鹅加成下伤害期望 = 计算伤害({
		...单人数值,
		减防百分比: 黑天鹅加成.减防百分比,
		减抗: 黑天鹅加成.减抗,
	});
	const 黑天鹅大招对方回合期间加成 = 计算伤害({
		...单人数值,
		减防百分比: 黑天鹅加成.减防百分比,
		减抗: 黑天鹅加成.减抗,
		易伤: 黑天鹅加成.易伤,
	});

	// 花火
	const 花火加成 = {
		增伤: 48,
		爆伤: 81,
		一名量子增伤: 5,
		三名量子增伤: 30,
		一魂加攻: 基础攻击力 * 0.4,
		二魂减防: 24,
	};
	const 花火单量子加成下伤害期望 = 计算伤害({
		...单人数值,
		伤害提高: 单人数值.伤害提高 + 花火加成.增伤 + 花火加成.一名量子增伤,
		暴击伤害: 单人数值.暴击伤害 + 花火加成.爆伤,
	});
	const 花火三量子加成下伤害期望 = 计算伤害({
		...单人数值,
		伤害提高: 单人数值.伤害提高 + 花火加成.增伤 + 花火加成.三名量子增伤,
		暴击伤害: 单人数值.暴击伤害 + 花火加成.爆伤,
	});
	const 花火一魂单量子加成下伤害期望 = 计算伤害({
		...单人数值,
		伤害提高: 单人数值.伤害提高 + 花火加成.增伤 + 花火加成.一名量子增伤,
		暴击伤害: 单人数值.暴击伤害 + 花火加成.爆伤,
		面板攻击力: 单人数值.面板攻击力 + 花火加成.一魂加攻,
	});
	const 花火一魂三量子加成下伤害期望 = 计算伤害({
		...单人数值,
		伤害提高: 单人数值.伤害提高 + 花火加成.增伤 + 花火加成.三名量子增伤,
		暴击伤害: 单人数值.暴击伤害 + 花火加成.爆伤,
		面板攻击力: 单人数值.面板攻击力 + 花火加成.一魂加攻,
	});
	const 花火二魂单量子加成下伤害期望 = 计算伤害({
		...单人数值,
		伤害提高: 单人数值.伤害提高 + 花火加成.增伤 + 花火加成.一名量子增伤,
		暴击伤害: 单人数值.暴击伤害 + 花火加成.爆伤,
		面板攻击力: 单人数值.面板攻击力 + 花火加成.一魂加攻,
		减防百分比: 花火加成.二魂减防,
	});
	const 花火二魂三量子加成下伤害期望 = 计算伤害({
		...单人数值,
		伤害提高: 单人数值.伤害提高 + 花火加成.增伤 + 花火加成.三名量子增伤,
		暴击伤害: 单人数值.暴击伤害 + 花火加成.爆伤,
		面板攻击力: 单人数值.面板攻击力 + 花火加成.一魂加攻,
		减防百分比: 花火加成.二魂减防,
	});

	return (
		<>
			<h2>面板数值</h2>
			<h4>攻击力乘区</h4>
			<div>
				<div>
					面板攻击力
					<input type="number" onChange={(e) => 设置面板攻击力(+e.target.value)} value={面板攻击力}></input>
					&nbsp;&nbsp;&nbsp;(基础攻击力
					<input type="number" onChange={(e) => 设置基础攻击力(+e.target.value)} value={基础攻击力}></input>)
				</div>
			</div>
			<h4>增伤乘区</h4>
			<div>
				伤害提高
				<input type="number" onChange={(e) => 设置伤害提高(+e.target.value)} value={伤害提高}></input> %
			</div>
			<h4>暴击乘区</h4>
			<div>
				<div>
					暴击率
					<input type="number" onChange={(e) => 设置暴击率(+e.target.value)} value={暴击率}></input> %
					&nbsp;&nbsp;&nbsp;暴击伤害
					<input type="number" onChange={(e) => 设置暴击伤害(+e.target.value)} value={暴击伤害}></input> %
				</div>
			</div>
			<h4>防御力乘区</h4>
			<div>
				<div>
					人物等级
					<input type="number" onChange={(e) => 设置人物等级(+e.target.value)} value={人物等级}></input>
					&nbsp;&nbsp;&nbsp;怪物等级
					<input type="number" onChange={(e) => 设置怪物等级(+e.target.value)} value={怪物等级}></input>
					&nbsp;&nbsp;&nbsp;减防百分比
					<input type="number" onChange={(e) => 设置减防百分比(+e.target.value)} value={减防百分比}></input> %
				</div>
			</div>
			<h4>抗性乘区</h4>
			<div>
				<div>
					怪物抗性
					<input type="number" onChange={(e) => 设置怪物抗性(+e.target.value)} value={怪物抗性}></input> %
					&nbsp;&nbsp;&nbsp;减抗
					<input type="number" onChange={(e) => 设置减抗(+e.target.value)} value={减抗}></input> %
				</div>
			</div>
			<h4>易伤乘区</h4>
			<div>
				<div>
					易伤
					<input type="number" onChange={(e) => 设置易伤(+e.target.value)} value={易伤}></input> %
				</div>
			</div>
			<h4>韧性乘区</h4>
			<div>
				<div>
					韧性减伤
					<input type="number" onChange={(e) => 设置韧性减伤(+e.target.value)} value={韧性减伤}></input> %
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
				<input type="number" onChange={(e) => 设置技能倍率(+e.target.value)} value={技能倍率}></input>%
			</div>

			<h3>单人伤害</h3>
			<div>单段伤害期待：{单人伤害.暴击伤害期望.toFixed(2)}</div>
			<div>单段暴击大数字：{单人伤害.暴击时伤害.toFixed(2)}</div>
			<div>理论轮均伤害：{单人伤害.轮均期待伤害.toFixed(2)}</div>

			<h3>辅助加成比例</h3>
			<h4>银狼加成</h4>
			<p>10级战技-10%抗性，10级终结技-45%防御力，10级天赋-8%防御力，额外能力3触发-3%抗性</p>
			<p>
				未植入新弱点：单段伤害期望 {银狼加成下伤害期望.暴击伤害期望.toFixed(2)}, 提升
				{计算提升(银狼加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>
			<p>
				植入新弱点-20%抗性：单段伤害期望 {银狼植入弱点加成下伤害期望.暴击伤害期望.toFixed(2)}, 提升
				{计算提升(银狼植入弱点加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>
			<p>
				植入量子弱点，且输出装备量子套触发减防：单段伤害期望{' '}
				{银狼植入量子弱点量子套加成下伤害期望.暴击伤害期望.toFixed(2)}, 提升
				{计算提升(银狼植入量子弱点量子套加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>

			<h4>布洛妮娅加成</h4>
			<p>
				10级战技+66%增伤，10级终结技（假设布洛妮娅爆伤150%）+55%攻击力 +20+(150*16%)=44%爆伤，额外能力3 +10%增伤
			</p>
			<p>
				不记战技拉条的伤害提升：单段伤害期望 {布洛妮娅加成下伤害期望.暴击伤害期望.toFixed(2)}, 提升
				{计算提升(布洛妮娅加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>

			<h4>停云加成</h4>
			<p>10级战技+50%攻击力并额外造成20%攻击的额外伤害（20%倍率，会被技能倍率稀释），10级终结技+50%增伤</p>
			<p>
				不计算额外伤害的伤害提升：单段伤害期望 {停云加成下伤害期望.暴击伤害期望.toFixed(2)}, 提升
				{计算提升(停云加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>
			<p>
				输出为雷属性时计算额外伤害的伤害提升：单段伤害期望{' '}
				{停云输出角色为雷属性加成下伤害期望.暴击伤害期望.toFixed(2)}, 提升
				{计算提升(停云输出角色为雷属性加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>
			<p>额外：充能，战技目标释放终结技+20%速度一回合</p>

			<h4>艾斯妲加成</h4>
			<p>10级天赋满层+70%攻击力，10级终结技+50速度，额外能力2 +18%火属性伤害</p>
			<p>
				满层时非火系输出的伤害提升：单段伤害期望 {艾斯妲加成下伤害期望.暴击伤害期望.toFixed(2)}, 提升
				{计算提升(艾斯妲加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>
			<p>
				轮均伤害提升：轮均期待伤害 {艾斯妲加成下伤害期望.轮均期待伤害.toFixed(2)}, 提升
				{计算提升(艾斯妲加成下伤害期望.轮均期待伤害, 单人伤害.轮均期待伤害)}%
			</p>
			<p>
				满层时火系输出的伤害提升：单段伤害期望 {艾斯妲输出角色为火属性加成下伤害期望.暴击伤害期望.toFixed(2)},
				提升
				{计算提升(艾斯妲输出角色为火属性加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>
			<p>
				轮均伤害提升：轮均期待伤害 {艾斯妲输出角色为火属性加成下伤害期望.轮均期待伤害.toFixed(2)}, 提升
				{计算提升(艾斯妲输出角色为火属性加成下伤害期望.轮均期待伤害, 单人伤害.轮均期待伤害)}%
			</p>

			<h4>驭空加成</h4>
			<p>10级战技+80%攻击力，10级终结技+28%暴击率+65%暴击伤害，额外能力2 +12%虚数伤害</p>
			<p>
				非虚数系输出的伤害提升：单段伤害期望 {驭空加成下伤害期望.暴击伤害期望.toFixed(2)}, 提升
				{计算提升(驭空加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>
			<p>
				虚数系输出的伤害提升：单段伤害期望 {驭空输出角色为虚数属性加成下伤害期望.暴击伤害期望.toFixed(2)}, 提升
				{计算提升(驭空输出角色为虚数属性加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>

			<h4>阮梅加成</h4>
			<p>10级战技+36%增伤，180%击破下额外能力1 +36%增伤，10级大招25%元素穿透，10级天赋+10%速度</p>
			<p>
				单段伤害期望 {阮梅加成下伤害期望.暴击伤害期望.toFixed(2)}, 提升
				{计算提升(阮梅加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>
			<p>
				轮均伤害提升：轮均期待伤害 {阮梅加成下伤害期望.轮均期待伤害.toFixed(2)}, 提升
				{计算提升(阮梅加成下伤害期望.轮均期待伤害, 单人伤害.轮均期待伤害)}%
			</p>
			<p>额外：50%弱点击破效率</p>
			<p>
				1魂终结技减防20%，单段伤害期望 {阮梅一魂加成下伤害期望.暴击伤害期望.toFixed(2)}, 提升
				{计算提升(阮梅一魂加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>

			<h4>佩拉加成</h4>
			<p>12级大招42%减防+2魂减冰抗12%+秘技2回合20%减防</p>
			<p>
				仅终结技，单段伤害期望 {佩拉加成下伤害期望.暴击伤害期望.toFixed(2)}，提升
				{计算提升(佩拉加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%,
			</p>
			<p>
				终结技+2魂减冰抗，单段伤害期望 {佩拉大招加减冰抗加成.暴击伤害期望.toFixed(2)}，提升
				{计算提升(佩拉大招加减冰抗加成.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>
			<p>
				终结技+2魂减冰抗+秘技头两回合，单段伤害期望 {佩拉大招加减冰抗加秘技加成.暴击伤害期望.toFixed(2)}，提升
				{计算提升(佩拉大招加减冰抗加秘技加成.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>

			<h4>一魂黑天鹅加成</h4>
			<p>
				10级战技20.8%减防，一魂对应持续伤害减25%火风雷物理减抗，单段伤害期望{' '}
				{黑天鹅加成下伤害期望.暴击伤害期望.toFixed(2)}，提升
				{计算提升(黑天鹅加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>
			<p>
				10级战技+10级大招敌方回合25%易伤+奥迹触发一魂减抗，敌方回合内单段伤害期望{' '}
				{黑天鹅大招对方回合期间加成.暴击伤害期望.toFixed(2)}，提升
				{计算提升(黑天鹅大招对方回合期间加成.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>

			<h4>花火加成</h4>
			<p>
				10级战技（假设花火爆伤150%）加45%+(150*24%)=81%爆伤，10级大招10级天赋叠满3层+(6+10)*3=48%增伤，额外能力1加15%增伤，1/2/3名量子角色额外+5/15/30%增伤
			</p>
			<p>
				花火单量子入队单段伤害期望 {花火单量子加成下伤害期望.暴击伤害期望.toFixed(2)}，提升
				{计算提升(花火单量子加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>
			<p>
				花火三量子单段伤害期望 {花火三量子加成下伤害期望.暴击伤害期望.toFixed(2)}，提升
				{计算提升(花火三量子加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>
			<p>额外：战技点上限+2，终结技回复4战技点</p>
			<p>
				1魂终结技+40%攻击力，单量子入队单段伤害期望 {花火一魂单量子加成下伤害期望.暴击伤害期望.toFixed(2)}，提升
				{计算提升(花火一魂单量子加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%，三量子单段伤害期望{' '}
				{花火一魂三量子加成下伤害期望.暴击伤害期望.toFixed(2)}，提升
				{计算提升(花火一魂三量子加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>
			<p>
				2魂每层天赋减防8%，叠满24%，单量子入队单段伤害期望{' '}
				{花火二魂单量子加成下伤害期望.暴击伤害期望.toFixed(2)}，提升
				{计算提升(
					花火二魂单量子加成下伤害期望.暴击伤害期望,
					单人伤害.暴击伤害期望
				)}%,单量子入队单段伤害期望 {花火二魂三量子加成下伤害期望.暴击伤害期望.toFixed(2)}，提升
				{计算提升(花火二魂三量子加成下伤害期望.暴击伤害期望, 单人伤害.暴击伤害期望)}%
			</p>
			<三月七 />
		</>
	);
}
