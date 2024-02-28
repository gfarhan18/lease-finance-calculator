/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve = {
            ...config.resolve,
            fallback: {
              net: false,
              dns: false,
              tls: false,
              fs: false,
              request: false,
            },
            // experimental: {
            //     serverComponentsExternalPackages: ["mysql2"],
            //   },
          };
        }
        return config;
    },
    // 
};

export default nextConfig;
