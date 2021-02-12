<template>
    <q-layout view="hHh Lpr lFf">
        <q-header elevated class="bg-indigo">
        <q-toolbar>
            <q-btn flat dense round icon="menu" aria-label="Menu" @click="drawer = !drawer" />
            <q-toolbar-title>{{currentGame.gameName}}</q-toolbar-title>
            <span>{{currentPlayerName}}</span>
            <q-btn flat dense icon="edit" @click="updateCurrentPlayerName"/>
        </q-toolbar>
        </q-header>

        <q-drawer v-model="drawer" show-if-above :breakpoint="800">
        <q-scroll-area style="height: 100%; border-right: 1px solid #ddd">
            <q-item>
                <q-item-section class="text-center">
                    Select a card to cast your vote
                </q-item-section>
            </q-item>
            <div class="row justify-center">
                <q-card :key="index"
                    v-for="(card, index) in currentGame.cardDeck"
                    class="bg-indigo-5 q-ma-sm q-pa-xs col-3"
                    style="height:100px">
                    <q-item
                        @click="updateCurrentPlayerVote(card)"
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
            <q-item v-if="isGameCreator && !currentGame.showVotes">
              <q-item-section class="text-center">
                <q-btn label="Show Votes" color="indigo" @click="toggleShowVotes"/>
              </q-item-section>
            </q-item>
            <q-item v-if="isGameCreator">
              <q-item-section class="text-center">
                <q-btn label="Reset Game" color="indigo" @click="resetGame(currentGame.id)"/>
              </q-item-section>
            </q-item>
            <q-item v-if="currentGame.showVotes">
              <q-item-section class="text-center text-h3">
                Average<br/>{{gameAverage}}
              </q-item-section>
            </q-item>
        </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
      <q-dialog v-model="updatePlayerNameDialog" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Update Name</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="playerName" autofocus @keyup.enter="updatePlayerNameDialog = false" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Update" @click="updateCurrentPlayerName" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      drawer: false,
      playerName: '',
      updatePlayerNameDialog: false
    }
  },
  computed: {
    ...mapGetters('game', ['currentGame']),
    ...mapGetters('user', ['currentUser']),
    currentGameId() {
      return this.$route.params.id
    },
    currentPlayerName() {
      let name = 'Player'
      this.currentGame.players.forEach(player => {
        if(player.userId === this.currentUser.id && player.playerName){
          name = player.playerName
        }
      })
      return name
    },
    isGameCreator() {
      let is_game_creator = false
      if(this.currentUser){
        if(this.currentGame.createdBy === this.currentUser.id ){
          is_game_creator = true
        }
      }
      return is_game_creator
    },
    gameAverage() {
      let total_votes = 0
      let invalid_votes = 0
      this.currentGame.players.forEach(player => {
        let playerVote = parseInt(player.playerVote)
        total_votes += isNaN(playerVote) ? 0 : playerVote
        if(isNaN(playerVote)) {
          invalid_votes++
        }
      })
      let average = total_votes / (this.currentGame.players.length - invalid_votes);
      return isNaN(average) ? 0 : average
    }
  },
  mounted: async function () {
    const gameDetails = await this.getGameDetails(this.currentGameId)
    this.setCurrentGame(gameDetails)
  },
  methods: {
    ...mapActions('game', ['getGameDetails', 'updatePlayerName', 'updatePlayerVote', 'updateGameVotesVisibility', 'resetGame']),
    ...mapMutations('game', ['setCurrentGame']),
    async updateCurrentPlayerName(){
      this.$q.dialog({
        title: 'Update Player Name',
        prompt: {
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(async data => {
        try{
          await this.updatePlayerName({
            gameId: this.currentGameId,
            playerId: this.currentUser.id,
            playerName: data
          })
        }
        catch (err){
          this.$q.notify({
            message: `Looks like a problem updating your Player Name: ${err}`,
            color: 'negative'
          })
        }
      }).onCancel(() => {

      }).onDismiss(() => {

      })
    },
    async updateCurrentPlayerVote(vote){
      try{
        if(this.currentGame.showVotes){
          return
        }
        await this.updatePlayerVote({
          gameId: this.currentGameId,
          playerId: this.currentUser.id,
          playerVote: vote
        })
      }
      catch (err){
        this.$q.notify({
          message: `Looks like a problem updating your Player Name: ${err}`,
          color: 'negative'
        })
      }
    },
    async toggleShowVotes(){
      try{
        await this.updateGameVotesVisibility({
          id: this.currentGame.id,
          showVotes: !this.currentGame.showVotes
        })
      }
      catch (err){
        this.$q.notify({
          message: `Looks like a problem updating your Player Name: ${err}`,
          color: 'negative'
        })
      }
    }
  }
}
</script>
