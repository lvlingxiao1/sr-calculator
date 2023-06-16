import React from 'react';
import '../styles/globals.scss';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/styles.module.scss';

function 导航布局({ children }) {
	return (
		<>
			<Head>
				<title>星穹铁道计算器</title>
				<meta name="description" content="星穹铁道计算器" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.app}>
				<div className={styles.navbar}>
					<div className={styles['nav-item']}>
						<Link href="/shang-hai">伤害</Link>
					</div>
					<div className={styles['nav-item']}>
						<Link href="/xiao-guo-ming-zhong">效果命中</Link>
					</div>
					<div className={styles['nav-item']}>
						<Link href="/chong-neng">充能</Link>
					</div>
					<div className={styles['nav-item']}>
						<Link href="/su-du">速度</Link>
					</div>
				</div>
				<div className={styles.main}>{children}</div>
			</div>
		</>
	);
}

export default function App({ Component, pageProps }) {
	return (
		<导航布局>
			<Component {...pageProps} />
		</导航布局>
	);
}
