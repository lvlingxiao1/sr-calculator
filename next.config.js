/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	basePath: '/sr-calculator',
	output: 'export',
	images: { unoptimized: true }, // optimization is not compatible with output: export
	trailingSlash: true,
};

module.exports = nextConfig;
