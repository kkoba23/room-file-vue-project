import { createRouter, createWebHistory } from 'vue-router'
import RoomManagement from '@/views/RoomManagement.vue'
import FileManagement from '@/views/FileManagement.vue'

const routes = [
  { path: '/', redirect: '/rooms' },
  { path: '/rooms', component: RoomManagement },
  { path: '/files', component: FileManagement },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
