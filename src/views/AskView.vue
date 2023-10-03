<template>
  <div>
    <ul class="news-list">
      <li v-for="item in fetchedAsk" class="post">
        <!-- 포인트 영역 -->
        <div class="points">
          {{ item.points }}
        </div>
        <!-- 기타 정보 영역 -->
        <div>
          <p class="news-title">
            <router-link v-bind:to="`item/${item.id}`">
              {{ item.title }}
            </router-link>
          </p>
          <small class="link-text">
             {{ item.time_ago }} by
             <router-link v-bind:to="`/user/${item.user}`" class="link-text">{{ item.user }}</router-link>
          </small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters }  from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'fetchedAsk'
    ]),

  //   ...mapState({
  //     ask: state => state.ask
  //   })
  //   // ask(){
  //   //   return this.$store.state.ask;
  //   // }
  },

  created(){
    this.$store.dispatch('FETCH_ASK');
  },
};
</script>

<style>
</style>