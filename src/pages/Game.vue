<template>
  <q-page padding class="bg-grey-3">
    <div class="row justify-center">
      <div class="items-center column" v-for="(player, index) in currentGame.players" :key="index" >
        <q-item>
          <q-carousel
            :value="(currentGame.showVotes && currentUser.id !== player.userId) ? 'votes': 'reset'"
            transition-prev="flip-left"
            transition-next="flip-right"
            animated
            class="bg-grey-3 player-card"
            height="230px"
          >
            <q-carousel-slide name="reset" style="height: 100%">
              <q-item style="height:200px; width: 150px" class="q-ma-sm q-pa-xs">
                <q-card style="width: 100%">
                  <q-item dark v-ripple
                          clickable style="height:100%;"
                          :class="cardColor(player)">
                    <q-item-section class="text-center">
                      <q-item-label v-if="player.userId === currentUser.id" class="text-bold text-h3">
                        {{ (player.playerVote) ? player.playerVote: '?'}}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card>
              </q-item>
            </q-carousel-slide>

            <q-carousel-slide name="votes">
              <q-item style="height:200px; width: 150px" class="q-ma-sm q-pa-xs">
                <q-card style="width: 100%">
                  <q-item dark v-ripple
                          clickable style="height:100%;"
                          :class="cardColor(player)">
                    <q-item-section class="text-center">
                      <q-item-label v-if="currentGame.showVotes || player.userId === currentUser.id" class="text-bold text-h3">
                        {{ (player.playerVote) ? player.playerVote: '?'}}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card>
              </q-item>
            </q-carousel-slide>
          </q-carousel>
        </q-item>
        <q-item>
          <q-chip icon="sports_handball" @remove="removePlayer(player)" color="primary" text-color="white"
            :removable="(!!isGameCreator) && (currentGame.createdBy != player.userId)">
            {{ (player.playerName) ? player.playerName: 'Player'}}
          </q-chip>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  computed: {
    ...mapGetters('game', ['currentGame']),
    ...mapGetters('user', ['currentUser']),
    isGameCreator() {
      let is_game_creator = false
      if(this.currentUser){
        if(this.currentGame.createdBy === this.currentUser.id ){
          is_game_creator = true
        }
      }
      return is_game_creator
    },
  },
  mounted: function(){
  },
  methods: {
    ...mapActions('game', ['deleteGamePlayer']),
    cardColor(player) {
      if(this.currentGame.showVotes || player.userId === this.currentUser.id){
        return 'text-indigo bg-white';
      }
      else if(player.playerVote){
        return 'bg-indigo';
      }
      else {
        return 'bg-grey-4'
      }
    },
    async removePlayer(player) {
      await this.deleteGamePlayer({
        gameId: this.currentGame.id,
        playerId: player.userId
      })
    }
  }
}
</script>

<style>
.player-card .q-panel{
  overflow: hidden;
}

</style>
