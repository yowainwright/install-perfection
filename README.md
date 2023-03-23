# Install Perfection

![Typed with TypeScript](https://flat.badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)
[![npm version](https://badge.fury.io/js/install-perfection.svg)](https://badge.fury.io/js/install-perfection)
[![unpkg](https://img.shields.io/badge/unpkg-blue.svg)](https://unpkg.com/install-perfection@latest/dist/index.js)
[![skypack](https://img.shields.io/badge/skypack-blueviolet.svg)](https://cdn.skypack.dev/install-perfection?min)
![ci](https://github.com/yowainwright/install-perfection/actions/workflows/ci.yml/badge.svg)
[![Github](https://badgen.net/badge/icon/github?icon=github&label&color=grey)](https://github.com/yowainwright/install-perfection)


_**Install dependencies with control, (perfection) 💖**_

Sometimes, you need nuance and control over your npm dependencies.

> You might want to minimize your `node_module` folder size when shipping to production. Or, you might want to switch dependencies on the fly. For this, **Install Perfection** might be the tool you need.

---

## How easy is Install Perfection to set up?

Very easy. If not, [submit an issue](https://github.com/yowainwright/install-perfection/issues)!

You can use Install Perfection as a CLI only.
```bash
npx install-perfection --include {"playwright-core": "latest"} --ignore {"playwright": "latest"}
```

If you'd like to use it a bit more explicitly, you can configure it in your `package.json`.

```ts
// package.json
{
  ...
  "install": {
    "include": {
      "playwright-core": "latest"
    },
    "ignore": {
      "playwright": "latest"
    }
  }
  ...
}
```

Or, if you like to keep your `package.json` pure, you can create a `.installrc` file with the same configuration.

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

## How do I use Install Perfection?

Install Perfection is built to be used as a CLI first and foremost. It also exports node functions which can be used to preform the same install operation.

---

Install or reference Install Perfection in your project.

```bash
npm install install-perfection --save-dev
```

Or via a CDN (untested)

```
import { install } from "https://cdn.skypack.dev/merge-tsconfigs@latest"
```

---

## CLI API

Listed below are the CLI options and arguments to execute install-perfection. To *view all cli options, run `install-perfection --help`!

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
  -h, --help                  display help for command
```

---
### Recipes

Install an additional list of dependencies.

```sh
install-perfection --include {"playwright-core": "latest"}' '{"react": "latest"}
```

Ignore an array of dependencies.

```sh
install-perfection --ignore playwright react
```

Ignore and install dependencies for Install Perfection.

```sh
install-perfection --ignore playwright react --include {"playwright-core": "latest"} {"react": "latest"}
```

Install while including a lock file.

```sh
install-perfection --has-lockfile --ignore playwright
```

Add a custom path to the package.json file you're installing perfection for.

```sh
install-perfection --path ./path/to/package.json --ignore playwright
```

Add a custom path to install your `node_modules`.

```sh
install-perfection --dest ./path/to/node_modules_dest --ignore playwright
```

Use a custom runner (dependence manager)

```sh
install-perfection --runner pnpm --ignore playwright
```

Make it fast by inputting your config to your command.

```sh
install-perfection --config ./path/to/.installrc --ignore playwright
```

Get debugging information.

```sh
install-perfection --debug --ignore playwright
```

---
## Node API

The node API works exactly the same as the CLI API.

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

## Is the name, "Install Perfection", a bit much?

Yes. _Just like your `node_module` folder_. 😜 Use Install Perfection to make your node_modules _a bit less_.

---

Made by [@yowainwright](https://github.com/yowainwright), MIT 2023
