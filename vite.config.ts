import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import dts from 'vite-plugin-dts'

const assetFileNamesFn = () => `assets/[name].[ext]`
const chunkFileNamesFn = (chunkInfo: { facadeModuleId?: string | null }, ext: string) => {
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
    target: 'esnext',
    lib: {
      entry: {
        index: fileURLToPath(new URL('./src/main.ts', import.meta.url)),
        classes: fileURLToPath(new URL('./src/classes/index.ts', import.meta.url)),
        components: fileURLToPath(new URL('./src/components/index.ts', import.meta.url)),
        composables: fileURLToPath(new URL('./src/composables/index.ts', import.meta.url)),
        directives: fileURLToPath(new URL('./src/directives/index.ts', import.meta.url)),
        types: fileURLToPath(new URL('./src/types/index.ts', import.meta.url)),
        utils: fileURLToPath(new URL('./src/utils/index.ts', import.meta.url))
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    rolldownOptions: {
      output: [
        {
          format: 'es',
          dir: fileURLToPath(new URL('./dist', import.meta.url)),
          entryFileNames: '[name].mjs',
          chunkFileNames: (chunkInfo) => chunkFileNamesFn(chunkInfo, 'mjs'),
          assetFileNames: assetFileNamesFn,
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
    ...(process.env.STORYBOOK ? [] : [vueDevTools()]),
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
    dts({
      insertTypesEntry: true,
      outDir: fileURLToPath(new URL('./dist/types', import.meta.url)),
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
      include: ['./src/**/*'],
      exclude: ['./node_modules/**/*', 'dist', '**/*.spec.ts', '**/*.test.ts', '**/*.svg', '**/*.stories.ts'],
      compilerOptions: {
        skipLibCheck: true,
        skipDiagnostics: true,
        logDiagnostics: true
      }
    }),
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
        additionalData: `@use "@/styles/index.css";`
      },
    },
  },
})
