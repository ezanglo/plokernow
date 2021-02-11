<template>
    <q-layout view="hHh Lpr lFf">
        <q-header elevated class="bg-indigo">
        <q-toolbar>
            <q-btn flat dense round icon="menu" aria-label="Menu" @click="drawer = !drawer" />
            <q-toolbar-title>{{currentGame.gameName}}</q-toolbar-title>
        </q-toolbar>
        </q-header>

        <q-drawer v-model="drawer" show-if-above :breakpoint="800">
        <q-scroll-area style="height: 100%; border-right: 1px solid #ddd">
            <q-item>
                <q-item-section class="text-center">
                    Select a name and a card deck for your game.
                </q-item-section>
            </q-item>
            <div class="row justify-center">
                <q-card :key="index"
                    v-for="(card, index) in currentGame.cardDeck"
                    class="bg-indigo-5 q-ma-sm q-pa-xs col-3"
                    style="height:100px">
                    <q-item
                        class="bg-white"
                        v-ripple
                        clickable
                        active
                        active-class="text-indigo"
                        style="height:100%">
                        <q-item-section class="text-center">
                            <q-item-label class="text-bold text-h6">{{card}}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-card>
            </div>
        </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapGetters('game', ['currentGame']),
    currentGameId() {
      return this.$route.params.id
    }
  },
  mounted: async function () {
    const gameDetails = await this.getGameDetails(this.currentGameId)
    this.setCurrentGame(gameDetails)
  },
  methods: {
    ...mapActions('game', ['getGameDetails']),
    ...mapMutations('game', ['setCurrentGame'])
  }
}
</script>
