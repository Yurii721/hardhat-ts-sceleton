import type { UserConfig } from "@commitlint/types";
const Configuration: UserConfig = {
    /*
     * Resolves and loads `@commitlint/config-conventional` from `node_modules`.
     * Referenced packages should be installed.
     */
    extends: ["@commitlint/config-conventional"]
};

module.exports = Configuration;
