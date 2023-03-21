#!/usr/bin/env node

import { program } from 'commander';
import { cosmiconfig } from "cosmiconfig";
import scripts from './scripts'
import { Options } from './interfaces'
const version = "VERSION";

const explorer = cosmiconfig("install");

export async function action(options: Options = {}): Promise<void> {
  const result = options?.config
    ? await explorer.load(options.config)
    : await explorer.search();
  const { config = {} } = result || {};
  const { config: unusedConfig, isTestingCLI, ...rest } = options;
  if (isTestingCLI) {
    console.info({ options, config });
    return;
  }

  await scripts({ ...rest, config });
}

program
  .version(version)
  .name("install-perfection")
  .description("Install dependencies with control, perfectly 💖")
  .option("-c, --config <config>", "config path")
  .option("--debug", "enables debug mode")
  .option("-d, --dest <string>", "dest path")
  .option('-f, --file <file>', 'path to package.json file')
  .option("--has-lockfile", "use lock file")
  .option("-t, --isTestingCLI", "enables CLI testing, no scripts are run")
  .option('--isTesting', "enables testing, no scripts are run")
  .option("-p, --path <path>", "path to package.json file")
  .option("-r, --runner <runner>", "npm, pnpm, or yarn")
  .action(action)
  .parse(process.argv);

export { program }
