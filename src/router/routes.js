
const routes = [
  {
    path: '/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/CreateGame.vue')
      }
    ]
  },
  {
    path: '/game',
    component: () => import('layouts/GameLayout.vue'),
    children: [
      {
        path: ':id',
        name: 'GameRoom',
        component: () => import('pages/Game.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
