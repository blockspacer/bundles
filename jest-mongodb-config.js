module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: process.env.MONGOMS_VERSION || 'latest',
      // downloadDir: process.env.MONGOMS_DOWNLOAD_DIR,
      platform: process.env.MONGOMS_PLATFORM || 'linux',
      arch: process.env.MONGOMS_ARCH || 'x64',
      checkMD5: true
    },
    autoStart: false
  }
};
