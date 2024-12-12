
import type { ModuleOptions } from './module'


declare module '@nuxt/schema' {
  interface NuxtConfig { ['nuxtNotifications']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['nuxtNotifications']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['nuxtNotifications']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['nuxtNotifications']?: ModuleOptions }
}


export type { ModuleOptions, default } from './module'
