const nextConfig = {
    images: {
      domains: ["localhost", "cdn-cjmik.nitrocdn.com", "play-lh.googleusercontent.com", "encrypted-tbn0.gstatic.com", "cs13.pikabu.ru"],
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '213.109.146.203',
          port: '8080',
          pathname: '/api/resources/**',
        },
      ],
    },
  };
  
  module.exports = nextConfig;