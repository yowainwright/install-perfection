
import { promisify } from "util";
import { exec } from 'child_process'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import JSON5 from 'json5'

import {
  InstallDependenciesOptions,
  InstallPerfectionJson,
  ConfigureDependencyListOptions
} from './interfaces'

export const execPromise = promisify(exec);

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
  config,
  file = 'package.json',
  dest,
  debug = false,
  isTesting = false,
  exec = execPromise,
  hasLockfile = false,
  path = "./",
  runner = 'npm',
}: InstallDependenciesOptions): Promise<void> {
  const pkg = resolve(`${path}${file}`);
  const json = resolveJSON(pkg, debug);
  const { dependencies = {}, install } = json || {};
  const { ignore = [], include = {} } = config || install || {};
  const deps = configureDependencyList({ dependencies, ignore, include });
  const depsString = deps.map(({ name, version }) => `${name}@${version}`).join(' ');
  if (debug) console.log('install-perfection:debugging:', { deps, config, depsString });
  if (isTesting || deps.length < 1) return;
  await exec(`${runner} install ${dest ? `--prefix ${dest} ` : ' '}${depsString} -S --package-lock=${hasLockfile}`);
}

export const installPerfection = install
export default installPerfection;
