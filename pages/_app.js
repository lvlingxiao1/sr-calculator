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
					<Link href="/shang-hai" className={styles['nav-item']}>
						伤害
					</Link>
					<Link href="/xiao-guo-ming-zhong" className={styles['nav-item']}>
						效果命中
					</Link>
					<Link href="/chong-neng" className={styles['nav-item']}>
						充能
					</Link>
					<Link href="/su-du" className={styles['nav-item']}>
						速度
					</Link>
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
