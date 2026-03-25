import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        achievements: resolve(__dirname, 'pages/achievements.html'),
        projects: resolve(__dirname, 'pages/projects.html'),
        experience: resolve(__dirname, 'pages/experience.html'),
        skills: resolve(__dirname, 'pages/skills.html'),
        media: resolve(__dirname, 'pages/media.html'),
        global: resolve(__dirname, 'pages/global.html'),
      }
    }
  }
})
