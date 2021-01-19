<template>
  <div class="search-index">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败,请点击重试"
    >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getAllsearch } from '@/api/search.js';
export default {
  name: 'SearchIndex',
  components: {},
  props: {
    HistoryText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false,
    };
  },
  watch: {},
  computed: {},
  created() {},
  methods: {
    async onLoad() {
      // 1.请求获取数据
      try {
        const { data } = await getAllsearch({
          page: this.page, // 页码
          per_page: this.per_page, // 每页大小
          q: this.HistoryText, // 查询关键词
        });
        // console.log(data);
        const { results } = data.data;
        // 2. 把请求获取到的数据放到数据数组中
        this.list.push(...results);
        // console.log(this.list);
        // 3. 将正在加载的loding关闭
        this.loading = false;
        // 4. 判断是否还有数据
        // 如果有获取下一页数据
        if (results.length) {
          this.page++;
        } else {
          // 如果没有就将加载finished关闭
          this.finished = true;
        }
      } catch (err) {
        this.loading = false;
        this.error = true;
        this.$toast('数据获取失败，请稍后重试');
      }
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped></style>
