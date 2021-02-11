<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="items-center column" v-for="(player, index) in currentGame.players" :key="index" >
        <q-item style="height:200px; width: 150px" class="q-ma-sm q-pa-xs">
          <q-card style="width: 100%">
            <q-item dark v-ripple clickable style="height:100%;" :class="(!currentGame.showVote)?'bg-indigo':''">
              <q-item-section class="text-center">
                <q-item-label v-if="currentGame.showVote" class="text-bold text-h3">
                  {{ (player.vote) ? player.vote: '0'}}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </q-item>
        <q-item>
          <q-item-label>{{player.userId}}</q-item-label>
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
  },
  mounted: function(){
    console.log(this.currentGame);
    console.log(store.state.auth.uid);
  },
  methods: {

  }
}
</script>
