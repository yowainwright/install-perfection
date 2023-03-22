import { test, expect, vi } from "vitest";
import * as scripts from '../src/scripts';

const {
  resolveJSON,
  configureDependencyList,
  install,
  configureDepsToInclude,
  configureDepsToIgnore
} = scripts;

test('resolveJSON', () => {
  const json = resolveJSON('./__fixtures__/test.all.package.json', true);
  expect(json.dependencies).toStrictEqual({
    "ramda": "0.27.1",
    "typescript": "4.1.3"
  });
});

test('configureDependencyList', () => {
  const deps = configureDependencyList({
    dependencies: {
      "foo": "1.0.0",
      "bar": "2.0.0",
      "baz": "3.0.0",
    },
    ignore: ["bar"],
    include: {
      "foo": "1.0.0",
      "baz": "3.0.0",
    }
  });
  expect(deps).toStrictEqual([
    { name: "foo", version: "1.0.0" },
    { name: "baz", version: "3.0.0" },
  ]);
});

test('configureDepsToInclude', () => {
  const deps = configureDepsToInclude({
    include: {
      "foo": "1.0.0",
    }
  },
    {
      include: [
        '{"bar": "2.0.0"}',
        '{"baz": "3.0.0"}',
      ]
    });
  expect(deps).toStrictEqual({
    "foo": "1.0.0",
    "bar": "2.0.0",
    "baz": "3.0.0",
  });
});

test('configureDepsToIgnore', () => {
  const deps = configureDepsToIgnore({
    ignore: ["bar"],
  },
    {
      ignore: ["baz"]
    });
  expect(deps).toStrictEqual(["bar", "baz"]);
});

test('install', async () => {
  const result = await install({
    isTesting: true,
    file: './__fixtures__/test.all.package.json',
  })
  expect(result).toStrictEqual("ramda@0.27.1 typescript@4.1.3");
})
