<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 子路由出口 -->
    <!-- 标签导航栏 -->
    <van-tabbar class="layout-tabbal" route>
      <van-tabbar-item to="/">
        <template #icon><i class="toutiao toutiao-shouye"></i></template>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon><i class="toutiao toutiao-sousuo"></i></template>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon><i class="toutiao toutiao-shipin"></i></template>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon><i class="toutiao toutiao-wode"></i></template>
        <span class="text">{{ this.$store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
    <!-- 标签导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.layout-container {
  .layout-tabbal {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}</style
>>
