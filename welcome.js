
console.log(`

    Olá Vinnie, vc ainda precisa realizar algumas configurações:

    [1] - Adicione em package.json:

    "start": "node ./build/index",
    "build": "rimraf ./build && tsc",
    "dev": "ts-node-dev ./src/index.ts",

    ----------------------------------------------------------------------

    [2] - Adicione em tsconfig.ts:

    "include": [
        "src"
      ]

    ----------------------------------------------------------------------

    [3] - Descomente a linha e adicione em tsconfig.ts:

    "outDir": "./build",

    ----------------------------------------------------------------------
`)
