import { promisify } from "util";
import { exec } from "child_process";
import { expect, test, vi } from 'vitest';
import { stdoutToJSON } from "stdouttojson";
import { action } from '../src/program'
import { script } from '../src/scripts'
import { Options } from '../src/interfaces'
import { Spread } from "type-fest";

export const execPromise = promisify(exec);

vi.mock("cosmiconfig", () => {
  let _cache;
  const cosmiconfig = () => {
    if (_cache) return _cache;
    _cache = {
      load: vi.fn(() => ({
        config: { include: { foo: "bar" }, exclude: ['foo'] },
      })),
      search: vi.fn(() => ({
        config: { include: { foo: "bar" }, exclude: ['foo'] },
      })),
    };
    return _cache;
  };
  return { cosmiconfig };
});

vi.mock("../src/scripts", async () => {
  const actual = await vi.importActual("../src/scripts")
  return {
    ...actual,
    script: vi.fn()
  };
});

test("action", async () => {
  const options: Options = { include: ['{"foo":"bar"}'], ignore: ['foo'] };
  await action(options);
  const { ignore } = options;
  expect(script).toHaveBeenCalledWith({ include: { foo: "bar" }, ignore });
})

test("w/ no config reference", async () => {
  const { stdout = "{}" } = await execPromise(
    "ts-node ./src/program.ts --isTestingCLI"
  );
  const result = stdoutToJSON(stdout);

  expect(result).toStrictEqual({
    config: {},
    options: { isTestingCLI: "true" }
  });
});

test('w/ options', async () => {
  const { stdout = "{}" } = await execPromise(
    "ts-node ./src/program.ts --isTestingCLI --debug --file 'package.json'"
  );

  const result = stdoutToJSON(stdout);

  expect(result).toStrictEqual({
    config: {},
    options: { isTestingCLI: "true", debug: "true", file: "package.json" }
  });
});

test('w/ search path', async () => {
  const { stdout = "{}" } = await execPromise(
    "ts-node ./src/program.ts --isTestingCLI --debug --config './__fixtures__/.installrc'"
  );

  const result = stdoutToJSON(stdout);

  expect(result).toStrictEqual({
    config: {
      exclude: ['cosmiconfig'],
      include: {
        "lodash": "latest"
      }
    },
    options: { isTestingCLI: "true", debug: "true", config: "./__fixtures__/.installrc" }
  });
});
