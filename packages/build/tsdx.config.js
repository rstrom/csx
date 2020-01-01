const replace = require("rollup-plugin-replace");

module.exports = {
  rollup(config) {
    config.output.banner = "#!/usr/bin/env node";
    config.plugins.push(
      replace({
        delimiters: ["", ""],
        "#!/usr/bin/env node": ""
      })
    );
    return config;
  }
};
