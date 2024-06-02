const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withNextIntl = require('next-intl/plugin')()
 
/** @type {import('next').NextConfig} */
const nextConfig = {};
 
module.exports = withBundleAnalyzer(withNextIntl(nextConfig))