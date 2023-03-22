import { expect, test, vi } from 'vitest';
import { action } from '../src/program'
import { script } from '../src/scripts'
import { Options } from '../src/interfaces'

vi.mock("../src/scripts", async () => {
  const actual: Record<string, unknown> = await vi.importActual("../src/scripts")
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
