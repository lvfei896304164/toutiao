<template>
  <div class="home-container">
    <!-- 头部导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <template #title>
        <van-button type="info" size="small" round icon="search" class="search-btn" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 频道列表 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 v-model:active 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs class="channel" v-model="active" animated swipeable>
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!-- 文章列表 -->
        <articel-list :channel="channel"></articel-list>
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="ham-btn" @click="isChannelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- /频道列表 -->
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChannelShow"
      close-icon-position="top-left"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :my-channels="channels"
        :active="active"
        @updata-active="onUpdataActive"
      ></channel-edit>
    </van-popup>
    <!-- /频道编辑弹出层 -->
  </div>
</template>
<script>
import login from '@/api/user.js';
import articelList from './componnents/articel-list.vue';
import ChannelEdit from './componnents/channel-edit.vue';
import { mapState } from 'vuex';
import { getItem } from '@/utils/storage.js';
export default {
  name: 'HomeIdex',
  components: {
    articelList,
    ChannelEdit,
  },
  props: {},
  data() {
    return {
      active: 0,
      channels: [], // 频道数据
      isChannelShow: false, // 控制编辑频道的显示与隐藏状态
    };
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    this.loadChannels();
  },
  mounted() {},
  methods: {
    async loadChannels() {
      try {
        // const { data } = await login.getUserChannerl();
        // this.channels = data.data.channels;
        let channel = [];
        if (this.user) {
          // 登陆时的频道数据请求
          const { data } = await login.getUserChannerl();
          channel = data.data.channels;
        } else {
          // 未登录判断是否有本地存储的频道数据
          // 如果有就获取本地储存的频道数据，若没有则再发送一次获取频道数据请求
          const locstorege = getItem('toutiao-mini');
          if (locstorege) {
            channel = locstorege;
          } else {
            // console.log(111); // 测试有没有进入这次请求
            const { data } = await login.getUserChannerl();
            channel = data.data.channels;
          }
        }
        this.channels = channel;
      } catch (err) {
        this.$store('获取频道数据失败');
      }
    },
    onUpdataActive(event, cmmirshow = true) {
      this.active = event;
      this.isChannelShow = cmmirshow;
    },
  },
};
</script>
<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/.channel {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      bottom: 38px;
      background-color: #2693ff;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .ham-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        position: absolute;
        left: 0;
        content: '';
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
