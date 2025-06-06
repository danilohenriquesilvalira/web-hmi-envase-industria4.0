import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@context': path.resolve(__dirname, './src/context'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@data': path.resolve(__dirname, './src/data'),
      '@types': path.resolve(__dirname, './src/types')
    }
  },
  optimizeDeps: {
    include: [
      'react-router-dom',
      'react-icons/fa',
      'react-icons/md',
      'react-icons/io5',
      'framer-motion'
    ]
  },
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true
    }
  },
  // MUDANÇA AQUI: Ajustando o caminho base para refletir o novo projeto CIP
  base: '/hmi-cip-system/' // OU '/cip-hmi/', ou outro nome descritivo para seu repositório/deploy
})