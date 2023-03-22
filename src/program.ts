#!/usr/bin/env node

import { program } from 'commander';
import { cosmiconfig } from "cosmiconfig";
import { configureDepsToInclude, configureDepsToIgnore, script } from './scripts'
import { Config, Options } from './interfaces'
const version = "VERSION";

const explorer = cosmiconfig("install");

export async function action(options: Options = {}): Promise<void> {
  const result = options?.config
    ? await explorer.load(options.config)
    : await explorer.search();
  const config: Config = result?.config || {};
  const {
    isTestingCLI,
    config: unusedConfig,
    include: unusedInclude,
    ignore: unusedIgnore,
    ...rest
  } = options;

  if (isTestingCLI) {
    console.info({ options, config });
    return;
  }
  const include = configureDepsToInclude(config, options)
  const ignore = configureDepsToIgnore(config, options)
  await script({
    ...rest,
    ...(ignore?.length ? { ignore } : {}),
    ...(Object.keys(include).length ? { include } : {})
  });
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
  .option("-r, --runner <runner>", "npm, pnpm, or yarn (bun support coming; use npm for bun now)")
  .option("-i, --include [include...]", "include dependencies, include an array of json parseable string wrapped objects, e.g. `--include '{\"foo\": \"bar\"}' '{\"biz\": \"baz\"}' `")
  .option("--ignore [exclude...]", "exclude dependencies, e.g. `--exclude foo bar`")
  .action(action)
  .parse(process.argv);

export { program }

export default program
