
import { execaCommand } from "execa";
import { expect, test, vi } from 'vitest';
import JSON5 from "json5";

vi.doMock("cosmiconfig", () => {
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

test("w/ no config reference", async () => {
  const { stdout = "{}" } = await execaCommand(
    "node --no-warnings --loader ts-node/esm ./src/program.ts --isTestingCLI"
  );
  const json = JSON5.parse(stdout);

  expect(json).toStrictEqual({
    config: {},
    options: { isTestingCLI: true }
  });
});

test('w/ options', async () => {
  const { stdout = "{}" } = await execaCommand(
    "node --no-warnings --loader ts-node/esm ./src/program.ts --isTestingCLI --debug --file package.json"
  );
  const json = JSON5.parse(stdout);
  expect(json).toStrictEqual({
    config: {},
    options: { isTestingCLI: true, debug: true, file: "package.json" }
  });
});

test('w/ search path', async () => {
  const { stdout = "{}" } = await execaCommand(
    "node --no-warnings --loader ts-node/esm ./src/program.ts --isTestingCLI --debug --config ./__fixtures__/.installrc"
  );

  const json = JSON5.parse(stdout);

  expect(json).toStrictEqual({
    config: {
      ignore: ['cosmiconfig'],
      include: {
        "lodash": "latest"
      }
    },
    options: { isTestingCLI: true, debug: true, config: "./__fixtures__/.installrc" }
  });
});

test('w/ include', async () => {
  const { stdout = "{}" } = await execaCommand(
    "node --no-warnings --loader ts-node/esm ./src/program.ts --isTestingCLI --debug --include {\"foo\":\"bar\"}"
  );
  const json = JSON5.parse(stdout);
  expect(json).toStrictEqual({
    config: {},
    options: { isTestingCLI: true, debug: true, include: ['{"foo":"bar"}'] }
  });
});
