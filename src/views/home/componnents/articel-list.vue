<template>
  <div class="articel-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="numtext"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell v-for="(item, index) in list" :key="index" :title="item.title" /> -->
        <articel-item v-for="(item, index) in list" :key="index" :article="item"></articel-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticles } from '@/api/article.js';
import ArticelItem from '@/components/articel-item';
export default {
  name: 'ArticelList',
  components: { ArticelItem },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中loading状态
      finished: false, // 控制数据加载结束
      tamestamp: null,
      error: false,
      isLoading: false, // 控制下拉刷新的loading状态
      numtext: '刷新成功',
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          // 请求数据的页码，请求第一页数据:当前最新的时间戳
          // 用于请求之后的时间戳会在当前请求结果中返回给你
          timestamp: this.tamestamp || Date.now(),
          with_top: 1,
        });
        const { results } = data.data;
        // console.log(data, 'hh');
        // 数组的展开操作符，他会把数组一个个拿出来
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          // 更新下个页面数据的时间戳
          this.tamestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        // 展示错误提示状态
        this.error = true;
        // 请求失败关闭页面刷新
        this.loading = false;
      }
    },
    // 当下拉刷新会触发的函数
    async onRefresh() {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          // 请求数据的页码，请求第一页数据:当前最新的时间戳
          // 用于请求之后的时间戳会在当前请求结果中返回给你
          timestamp: Date.now(), // 下拉刷新每次刷新获取最新数据，所以需要最新时间戳
          with_top: 1,
        });
        // 模拟随机失败
        // if (Math.random() > 0.2) {
        //   JSON.parse('fkasdkfjakd');
        // }
        // 2.将数据追加到列表的顶部
        const { results } = data.data;
        this.list.unshift(...results);
        // 3.关闭下拉刷新的loading状态
        this.numtext = `我滴崽恭喜你获取到了最新${results.length}条数据`;
        this.isLoading = false;
      } catch (err) {
        this.numtext = '刷新失败';
      }
    },
  },
};
</script>
<style lang="less" scoped>
.articel-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
