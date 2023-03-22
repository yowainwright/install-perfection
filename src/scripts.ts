import { readFileSync } from 'fs'
import { resolve } from 'path'
import { execaCommand } from 'execa';
import JSON5 from 'json5'

import {
  Config,
  ConfigureDependencyListOptions,
  InstallDependenciesOptions,
  InstallPerfectionJson,
  Options
} from './interfaces'

export function resolveJSON(
  path: string,
  debug = false
): InstallPerfectionJson {
  try {
    const json = JSON5.parse(readFileSync(path, "utf8"));
    return json;
  } catch (err) {
    if (debug) console.log(err);
    return {};
  }
}

export function configureDependencyList({ dependencies = {}, include = {}, ignore = [] }: ConfigureDependencyListOptions = {}) {
  const dependencyNames = Object.keys(dependencies);
  const includeNames = Object.keys(include);
  const hasDependencies = dependencyNames.length > 0;
  const hasInclude = includeNames.length > 0;
  if (!hasDependencies && !hasInclude) return [];
  // filter out any ignored dependencies
  const deps = hasDependencies ? dependencyNames.filter((dep: string) => !(ignore as string[]).includes(dep)).map((name: string) => ({ name, version: dependencies[name] })) : [];
  const includeDeps = hasInclude ? includeNames.map(name => ({ name, version: include[name] })) : [];
  // mergeDeps with includeDeps taking the priority
  const mergedDeps = deps.filter(({ name }) => !includeDeps.map(({ name }) => name).includes(name)).concat(includeDeps);
  return mergedDeps;
}

export async function install({
  dest,
  debug = false,
  exec = execaCommand,
  file = 'package.json',
  hasLockfile = false,
  ignore = [],
  include = {},
  isTesting = false,
  path = "./",
  runner = 'npm',
}: InstallDependenciesOptions): Promise<void | string> {
  const pkg = resolve(`${path}${file}`);
  const json = resolveJSON(pkg, debug);
  const { dependencies = {} } = json || {};
  const deps = configureDependencyList({ dependencies, ignore, include });
  const depsList = deps.map(({ name, version }) => `${name}@${version}`)
  const depsListLog = depsList.map(dep => `+ ${dep}`).join('\n')
  const depsString = depsList.join(' ');
  if (debug) console.log('install-perfection:debugging:', { deps, depsString });
  if (isTesting || deps.length < 1) {
    return depsString;
  }
  console.info(`${depsListLog}`);
  await exec(`${runner} install ${dest ? `--prefix ${dest}` + ' ' : ' '}${depsString} -S --package-lock=${hasLockfile}`);
}

export const configureDepsToInclude = ({ include: configInclude = {} }: Config, { include: unmergedInclude = [] }: Options) => {
  const optionInclude = unmergedInclude?.length ? unmergedInclude.reduce((acc: Record<string, string>, curr: string) => ({ ...acc, ...JSON5.parse(curr) as Record<string, string> }), {}) : {};
  return { ...configInclude, ...optionInclude };
}

export const configureDepsToIgnore = ({ ignore: configIgnore = [] }: Config, { ignore: optionsIgnore = [] }: Options) => [...configIgnore, ...optionsIgnore];


export const installPerfection = install
export const script = installPerfection
export default installPerfection;
