'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // exports.assets = {
  //   enable: true,
  //   package: 'egg-view-assets',
  // }
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
