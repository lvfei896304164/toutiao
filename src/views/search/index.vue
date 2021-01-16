<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="seachText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResoutShow = false"
      />
    </form>
    <!-- 搜索结果-->
    <search-index v-if="isResoutShow"></search-index>
    <!-- /搜索结果 -->
    <!-- 联想建议 -->
    <search-gtions v-else-if="seachText" :history-text="seachText"></search-gtions>
    <!-- /联想建议 -->
    <!-- 搜索历史记录 -->
    <search-history v-else></search-history>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/search-history.vue';
import SearchGtions from '@/views/search/components/search-gtions.vue';
import SearchIndex from '@/views/search/components/search-index.vue';
export default {
  name: 'search',
  components: { SearchGtions, SearchHistory, SearchIndex },
  props: {},
  data() {
    return {
      seachText: '',
      isResoutShow: false, // 控制搜索结果的展示
    };
  },
  watch: {},
  computed: {},
  created() {},
  methods: {
    onSearch(val) {
      this.isResoutShow = true;
    },
    onCancel() {
      this.$router.go(-1);
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.search {
  .van-search__action {
    color: #fff;
  }
}
</style>
