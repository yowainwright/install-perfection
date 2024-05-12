import { PackageJson } from 'type-fest'

export interface Config {
  ignore?: Array<string>
  include?: Record<string, string>
}

export interface Options {
  config?: string
  debug?: boolean
  dest?: string
  file?: string
  hasLockfile?: boolean
  isTesting?: boolean
  isTestingCLI?: boolean
  runner?: string
  include?: string[]
  ignore?: string[]
}

export interface InstallDependenciesOptions {
  ignore?: string[]
  include?: Record<string, string>
  debug?: boolean
  dest?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exec?: any
  file?: string
  isTesting?: boolean
  hasLockfile?: boolean
  path?: string
  runner?: string
}

export interface ConfigureDependencyListOptions {
  dependencies?: PackageJson.PackageJsonStandard['dependencies']
  include?: PackageJson.Dependency
  ignore?: string[]
}

export interface InstallPerfectionJson extends PackageJson.PackageJsonStandard {
  install?: Config
}
