<template>
  <div class="search">
    <form class="search-form" action="/">
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
    <search-index v-if="isResoutShow" :history-text="seachText"></search-index>
    <!-- /搜索结果 -->
    <!-- 联想建议 -->
    <search-gtions
      v-else-if="seachText"
      :history-text="seachText"
      @search="onSearch"
    ></search-gtions>
    <!-- /联想建议 -->
    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :search-historse="SearchHistorse"
      @updata-search-history="SearchHistorse = []"
      @search="onSearch"
    ></search-history>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/search-history.vue';
import SearchGtions from '@/views/search/components/search-gtions.vue';
import SearchIndex from '@/views/search/components/search-index.vue';
import { setItem, getItem } from '@/utils/storage';
export default {
  name: 'search',
  components: { SearchGtions, SearchHistory, SearchIndex },
  props: {},
  data() {
    return {
      seachText: '',
      isResoutShow: false, // 控制搜索结果的展示
      SearchHistorse: getItem('TOUTIAO_SEARCH_HISTORY') || [], // 搜索的历史记录
    };
  },
  watch: {
    SearchHistorse(val) {
      setItem('TOUTIAO_SEARCH_HISTORY', val);
    },
  },
  computed: {},
  created() {},
  methods: {
    onSearch(val) {
      // 更新文本框的内容
      this.seachText = val;
      // 添加历史搜索记录
      const index = this.SearchHistorse.indexOf(val);
      if (index !== -1) {
        this.SearchHistorse.splice(index, 1);
      }
      this.SearchHistorse.unshift(val);

      // 渲染搜索结果
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
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
