// Scramjet configuration for rpwner proxy
self.__scramjet$config = {
    prefix: "/rpwner/",
    codec: "base64",
    files: {
        wasm: "/scram/scramjet.wasm.wasm",
        all: "/scram/scramjet.all.js",
        sync: "/scram/scramjet.sync.js",
    },
    bare: {
        version: 2,
        path: "/bare/",
    },
};