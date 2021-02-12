<template>
  <q-page padding class="bg-grey-3">
    <div class="row justify-center">
      <div class="items-center column" v-for="(player, index) in currentGame.players" :key="index" >
        <q-item style="height:200px; width: 150px" class="q-ma-sm q-pa-xs">
          <q-card style="width: 100%" class="bg-indigo q-ma-sm q-pa-xs">
            <q-item dark v-ripple
                    clickable style="height:100%;"
                    :class="(currentGame.showVotes || player.userId === currentUser.id)?'text-indigo bg-white':'bg-indigo'">
              <q-item-section class="text-center">
                <q-item-label v-if="currentGame.showVotes || player.userId === currentUser.id" class="text-bold text-h3">
                  {{ (player.playerVote) ? player.playerVote: '?'}}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </q-item>
        <q-item>
          <q-item-label>{{ (player.playerName) ? player.playerName: 'Player'}}</q-item-label>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import {mapGetters} from "vuex";
import {store} from "src/store";

export default {
  computed: {
    ...mapGetters('game', ['currentGame']),
    ...mapGetters('user', ['currentUser']),
  },
  mounted: function(){
  },
  methods: {

  }
}
</script>
