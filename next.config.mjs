const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ["mongoose"],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
export default nextConfig