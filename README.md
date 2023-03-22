# Install Perfection

![Typed with TypeScript](https://flat.badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)
[![npm version](https://badge.fury.io/js/install-perfection.svg)](https://badge.fury.io/js/install-perfection)
[![unpkg](https://img.shields.io/badge/unpkg-blue.svg)](https://unpkg.com/install-perfection@latest/dist/index.js)
[![skypack](https://img.shields.io/badge/skypack-blueviolet.svg)](https://cdn.skypack.dev/install-perfection?min)
![ci](https://github.com/yowainwright/install-perfection/actions/workflows/ci.yml/badge.svg)
[![Github](https://badgen.net/badge/icon/github?icon=github&label&color=grey)](https://github.com/yowainwright/install-perfection)


_**Install dependencies with control, perfectly 💖**_

Sometimes, you need nuance and control over your npm dependencies. You might want to minimize your `node_module` folder size when shipping to production. Or, you might want to switch dependencies on the fly. For this, **Install Perfection** might be the tool you need.

---

## How easy is Install Perfection to set up?

Very easy. If not, [submit an issue](https://github.com/yowainwright/install-perfection/issues)!

You can use Install Perfection as a CLI only.
```bash
npx install-perfection --include '{"playwright-core": "latest"}' --ignore '{"playwright": "latest"}'
```

If you'd like to use it a bit more explicitly, you can configure it to read an `.installrc` config file, or as an object within your `package.json`.

```ts
// .installrc
{
  "include": {
    "playwright-core": "latest"
  },
  "ignore": {
    "playwright": "latest"
  }
}
```

If you'd like to build something custom, you can copy it's functionality into your own project or you can use the exported functions directly—as they're typed and tested.

```ts
import { install } from 'install-perfection'

install({
  include: {
    'playwright-core': 'latest'
  },
  ignore: {
    'playwright': 'latest'
  },
})
```

---

## CLI API

```bash
Usage: install-perfection [options]

Install dependencies with control, perfectly 💖

Options:
  -V, --version               output the version number
  -c, --config <config>       config path
  --debug                     enables debug mode
  -d, --dest <string>         dest path
  -f, --file <file>           path to package.json file
  --has-lockfile              use lock file
  -p, --path <path>           path to package.json file
  -r, --runner <runner>       npm, pnpm, or yarn (bun support coming; use npm for bun now)
  -i, --include [include...]  include dependencies, include an array of json parseable string
                              wrapped objects, e.g. `--include '{"foo": "bar"}' '{"biz": "baz"}'
                              `
  --ignore [exclude...]       exclude dependencies, e.g. `--exclude foo bar`
  --ignoreDeps                ignore dependencies object in package.json
  -h, --help                  display help for command
```

---
### Recipes


---
## Node API


### Recipes

---

## Is the name, "Install Perfection", a bit much?

Yes. _Just like your `node_module` folder_. 😜 Use Install Perfect to make it a bit better.

---

Made by [@yowainwright](https://github.com/yowainwright), MIT 2023
