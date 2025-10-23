/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // npm run buildしたときにルートにディクトり作ってくれる
  compiler: {
    styledComponents: true, // styled-componentsを有効化
  },  
  images: {
    unoptimized: true, // next/imageを使っている場合これが必要
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],    
  },
};

export default nextConfig; 