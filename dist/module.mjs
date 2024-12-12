import { fileURLToPath } from 'node:url';
import { pascalCase } from 'scule';
import { defu } from 'defu';
import { defineNuxtModule, useLogger, createResolver, addImportsDir, addTemplate, addPlugin } from '@nuxt/kit';

const PACKAGE_NAME = "nuxt-notifications";
const updateRuntimeConfig = (nuxt, runtimeConfig = {}) => {
  nuxt.options.nitro.runtimeConfig = nuxt.options.nitro.runtimeConfig ?? {};
  Object.assign(nuxt.options.runtimeConfig, defu(runtimeConfig, nuxt.options.runtimeConfig));
  Object.assign(nuxt.options.nitro.runtimeConfig, defu(runtimeConfig, nuxt.options.nitro.runtimeConfig));
};
const module = defineNuxtModule({
  meta: {
    name: PACKAGE_NAME,
    configKey: "nuxtNotifications",
    compatibility: {
      nuxt: "^3.0.0"
    }
  },
  defaults: {
    componentName: "NuxtNotifications"
  },
  setup(options, nuxt) {
    const logger = useLogger(PACKAGE_NAME);
    let { componentName } = options;
    componentName = pascalCase(componentName);
    logger.info("Starting setup");
    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    updateRuntimeConfig(nuxt, { public: { nuxtNotifications: { componentName } } });
    addImportsDir(resolve("./runtime/composables"));
    addTemplate({
      filename: "nuxt-notifications.d.ts",
      src: resolve("../templates/nuxt-notifications.ejs"),
      options: { componentName }
    });
    nuxt.hook("prepare:types", (options2) => {
      options2.references.push({ path: "nuxt-notifications.d.ts" });
    });
    addPlugin({
      src: resolve(runtimeDir, "plugin")
    });
    logger.success("Setup end");
  }
});

export { module as default };
