import fs from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// 自动导入（比如 ref、reactive、useRouter 等不用手动 import）
import AutoImport from 'unplugin-auto-import/vite';
// 自动注册组件（不需要手动 import 组件）
import Components from 'unplugin-vue-components/vite';
// Element Plus 按需加载解析器（自动引入组件）
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// Element Plus 样式自动按需加载
import ElementPlus from 'unplugin-element-plus/vite';
// 支持 Vue JSX 写法
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCss from 'unocss/vite';
// 让第三方库不打进 bundle，而是从 CDN / window 全局拿到（减少打包体积）
// import externalGlobals from 'rollup-plugin-external-globals'
// 打包体积分析工具（生成可视化报告）
// import { visualizer } from 'rollup-plugin-visualizer';
// gizp 压缩
// import ViteCompression from 'vite-plugin-compression';
// 在 Vite 构建阶段自动上传 sourcemap 到 Sentry 的插件。让线上报错可以还原到“源码级别”（TS / Vue 原始代码）。sourcemap必须配置为true才行
// import { sentryVitePlugin } from '@sentry/vite-plugin'

// 本地接口代理地址
const yolo = 'http://localhost:8090';

// 读取 package.json（用于获取版本号）
const packageJsonPath = fileURLToPath(new URL('./package.json', import.meta.url));
// 同步读取文件内容
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
// 获取版本号
const version = packageJson.version;

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000, // 更改为你想要的端口号
    open: true, // 可选：自动在浏览器中打开
    cors: true, // 允许跨域
    proxy: {
      '/yolo': {
        target: yolo,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/yolo/, '')
      }
    }
  },

  build: {
    // outDir: 'dist', // 输出目录
    // assetsDir: 'static', // 静态资源目录（相对于 outDir）
    sourcemap: false, // 不生成 sourcemap（生产环境减少体积 + 防止源码泄露）

    // 使用 terser 进行代码压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_debugger: true, // 移除 debugger
        pure_funcs: ['console.log', 'console.info'] // 移除指定 console
      },
      format: {
        comments: false // 删除注释
      }
    },

    rollupOptions: {
      // external: ['echarts', 'xlsx', 'moment'], // 这些库不打包，改为从 CDN 引入

      // 入口文件（多入口时可扩展，多页面应用（MPA）需要进行配置）
      // input: {
      //   index: fileURLToPath(new URL('./index.html', import.meta.url))
      // },

      output: {
        // 输出格式（ESM 模块）
        format: 'esm',

        // 动态 chunk 文件名（按需加载的代码分割文件）
        chunkFileNames: 'static/js/[name]-[hash].js',

        // 入口文件名
        entryFileNames: 'static/js/[name]-[hash].js',

        // 静态资源（图片 / 字体 / css）
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',

        // 手动分包
        manualChunks: (id: string) => {
          // 页面组件拆包
          if (id.includes('/src/pages/')) {
            // 提取目录名
            const match = id.match(/src\/pages\/([^/]+)/);
            if (match) {
              return `page-${match[1].toLowerCase()}`;
            }
          }

          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }

        // manualChunks: {
        //   vue: [
        //     'vue',
        //     'pinia',
        //     'vue-router',
        //   ],
        //   proto: ['src/generated/proto/index.js'] // 把 protobuf 生成文件单独拆成 proto chunk
        // },
      }
    }
  },

  define: {
    // 注入全局变量（构建时替换）
    'import.meta.env.__APP_VERSION__': JSON.stringify(version)
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  plugins: [
    // externalGlobals({
    //   // 让这些库不打包，而是从 CDN / window 全局拿到（减少打包体积）
    //   echarts: 'echarts',
    //   xlsx: 'XLSX',
    //   moment: 'moment',
    // }),

    // gizp 压缩
    // ViteCompression({
    //   threshold: 20 * 1024, // 超过多少进行压缩
    //   ext: '.gz',
    //   algorithm: 'gzip',
    //   filter: (file) => {
    //     // ❌ 排除 stats.html
    //     if (file.includes('stats.html')) return false;

    //     return true;
    //   }
    // }),

    // 打包分析工具（生成 stats.html）
    // visualizer({
    //   filename: './dist/stats.html', // 输出路径
    //   // open: true, // 构建完成后自动打开报告
    //   gzipSize: true, // 显示 gzip 体积
    //   brotliSize: true // 显示 brotli 体积
    // }),

    // Vue SFC 支持
    vue(),

    // UnoCSS 原子化 CSS
    UnoCss(),

    // JSX 支持
    vueJsx(),

    // 自动导入 API
    AutoImport({
      // api
      imports: ['vue', 'vue-router', 'pinia'], // 自动导入这些库的 API
      resolvers: [ElementPlusResolver()], // 自动导入 Element Plus API
      eslintrc: { enabled: true } // 自动生成 ESLint 声明
    }),

    // 自动注册组件
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      // 所有的组件可以自动加载
      dirs: ['src/components'],
      include: [/\.vue$/, /\.jsx$/]
    }),

    // Element Plus 样式按需加载
    ElementPlus({})

    // sentryVitePlugin({
    //   org: 'birds', // 替换为你的 Sentry 组织名
    //   project: 'vue3-app', // 替换为你的 Sentry 项目名
    //   authToken: '', // 替换为你的 Sentry Auth Token
    //   sourcemaps: {
    //     assets: './dist/**' // 指定 Source Map 文件路径
    //   },
    //   release: {
    //     name: process.env.npm_package_version || 'development', // 使用项目版本作为 release 名称
    //     create: true // 自动创建 release
    //   }
    // }),
  ]

  // base: './', // 相对路径部署（适合静态服务器），不配置默认是 '/'，适合根路径本地部署
});
