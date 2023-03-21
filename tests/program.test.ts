import { promisify } from "util";
import { exec } from "child_process";
import { expect, test, vi } from 'vitest';
import { stdoutToJSON } from "stdouttojson";
import { cosmiconfig } from "cosmiconfig";
import { action } from "../src/program";

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

vi.mock("../scripts", () => ({
  script: vi.fn(),
}));

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
