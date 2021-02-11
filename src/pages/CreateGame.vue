<template>
  <q-page padding>
    <q-form class="create-game q-gutter-y-md" @submit="onSubmit">
      <q-item active active-class="text-indigo">
        <q-item-section avatar>
          <q-icon size="150px" name="style"/>
        </q-item-section>
        <q-item-section class="text-left">
          <q-item-label class="text-h3 text-bold">PLOKER</q-item-label>
          <q-item-label class="text-h3 text-bold">/now</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="text-center">
          Select a name and a card deck for your game.
        </q-item-section>
      </q-item>
      <q-input
        v-model="gameName"
        label="Game Name"
        outlined
        color="indigo"
        data-cy="gameName"
        for="gameName"
        name="gameName"
        type="text"
        />
        <q-select
          outlined
          color="indigo"
          for="cardDeck"
          lazy-rules="lazy-rules"
          name="cardDeck"
          label="Card Deck "
          style="width: 100%"
          :options="cardDecks"
          v-model="cardDeck"
        />
        <q-btn
          class="full-width q-mt-md q-pa-sm"
          color="indigo"
          data-cy="submit"
          type="submit"
          label="Create Game"
        />
    </q-form>
  </q-page>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'CreateGame',
  data() {
    return {
      gameName: '',
      cardDeck: '',
    }
  },
  computed: {
    cardDecks: {
      get() {
        return [
        {
          label: 'Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ? )',
          value: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89','?'],
        },
        {
          label: 'Modified Fibonacci ( 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ? )',
          value: ['0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100','?'],
        }
      ]
      }
    }
  },
  mounted: function(){
    this.cardDeck = this.cardDecks[1]
  },
  methods: {
    ...mapActions('game', ['createNewGame']),
    async onSubmit() {
      const { gameName, cardDeck } = this
      try {
        const gameId = await this.createNewGame({
          gameName,
          cardDeck: cardDeck.value
        })

        this.$router.push({
          path: '/game/' + gameId
        })
      } catch (err) {
        this.$q.notify({
          message: `Looks like a problem creating a game: ${err}`,
          color: 'negative'
        })
      } finally {
        this.$q.loading.hide()
      }
    }
  }
}
</script>

<style lang="stylus">
.create-game
  margin auto
  max-width 30em
  width 100%
</style>
