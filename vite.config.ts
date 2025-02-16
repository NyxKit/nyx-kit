import { fileURLToPath, URL, resolve } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { ModuleFormat, PreRenderedAsset, PreRenderedChunk } from 'rollup'

const assetFileNamesFn = (_chunkInfo: PreRenderedAsset, ext: string) => `assets/[name].${ ext }`
const chunkFileNamesFn = (chunkInfo: PreRenderedChunk, ext: string) => {
  const fileName = `[name].[hash].${ ext }`
  if (chunkInfo.facadeModuleId?.endsWith('.svg')) {
    return `chunks/icons/${ fileName }`
  } else {
    return `chunks/${ fileName }`
  }
}

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: 'ESNext',
    lib: {
      entry: {
        index: fileURLToPath(new URL('./src/plugin.ts', import.meta.url)),
        // classes: fileURLToPath(new URL('./src/classes/index.ts', import.meta.url)),
        components: fileURLToPath(new URL('./src/components/index.ts', import.meta.url)),
        // compositions: fileURLToPath(new URL('./src/compositions/index.ts', import.meta.url)),
        // data: fileURLToPath(new URL('./src/data/index.ts', import.meta.url)),
        // directives: fileURLToPath(new URL('./src/directives/index.ts', import.meta.url)),
        types: fileURLToPath(new URL('./src/types/index.ts', import.meta.url)),
        utils: fileURLToPath(new URL('./src/utils/index.ts', import.meta.url)),
        // validators: fileURLToPath(new URL('./src/validators/index.ts', import.meta.url)),
        // views: fileURLToPath(new URL('./src/views/index.ts', import.meta.url)),
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: [
        {
          format: 'es',
          dir: fileURLToPath(new URL('./dist', import.meta.url)),
          entryFileNames: '[name].mjs',
          chunkFileNames: (chunkInfo: PreRenderedChunk) => chunkFileNamesFn(chunkInfo, 'mjs'),
          assetFileNames: (chunkInfo: PreRenderedAsset) => assetFileNamesFn(chunkInfo, 'mjs'),
          preserveModules: false,
          globals: { vue: 'vue' }
        }
      ],
      external: ['vue'], // Ensure Vue is externalized
      treeshake: {
        moduleSideEffects: 'no-external',
      }
    }
  },
  server: {
    port: 9000
  },
  plugins: [
    vue(),
    vueDevTools(),
    // svgLoader({
    //   svgo: true,
    //   defaultImport: 'component',
    //   svgoConfig: {
    //     plugins: [{
    //       name: 'preset-default',
    //       params: {
    //         overrides: {
    //           // @see https://github.com/svg/svgo/issues/1128
    //           removeViewBox: false
    //         }
    //       }
    //     }]
    //   }
    // }),
    // dts({
    //   insertTypesEntry: true,
    //   outDir: fileURLToPath(new URL('./dist/types', import.meta.url)),
    //   rollupTypes: true, // this param combines them all in a single file but is causing errors with vuedraggable
    //   tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
    //   include: ['./src/**/*'],
    //   exclude: ['./node_modules/**/*', 'dist', '**/*.spec.ts', '**/*.test.ts', '**/*.svg'],
    //   compilerOptions: {
    //     skipLibCheck: true,
    //     skipDiagnostics: true,
    //     logDiagnostics: true
    //   }
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  assetsInclude: ['**/*.svg'], // Treat SVGs as assets
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
        // additionalData: `@use "@/styles/index.scss";`
      },
    },
  },
})
