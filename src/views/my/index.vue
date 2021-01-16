<template>
  <div class="my-container">
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="textr">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="textr">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="textr">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="textr">获赞</span>
        </div>
      </div>
    </div>
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登陆/注册</span>
      </div>
    </div>
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <template #icon><i class="toutiao toutiao-shoucang"></i></template
        ><template #text><span class="texth">收藏</span></template>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <template #icon><i class="toutiao toutiao-lishi"></i></template
        ><template #text><span class="texth">历史</span></template>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" class="mb-9" is-link />
    <van-cell v-if="user" title="退出登录" class="logou-cell" @click="onLogout" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import login from '@/api/user.js';
export default {
  name: 'MyIdex',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    // 如果用户登录了就加载用户登录数据
    if (this.user) {
      this.loadUserInfo();
    }
  },
  mounted() {},
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          title: '确认退出吗？',
        })
        .then(() => {
          // on confirm
          console.log('确认退出登录');
          // 确认退出清除登录状态(清除容器user+清除存储中的user)
          this.$store.commit('setUser', null);
        })
        .catch(() => {
          // on cancel
          console.log('取消退出登录');
        });
    },
    async loadUserInfo() {
      try {
        const { data } = await login.getUserInfo();
        // console.log(data);
        this.userInfo = data.data;
        console.log(this.userInfo);
      } catch (err) {
        this.$toast('获取数据失败');
      }
    },
  },
};
</script>
<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        .count {
          font-size: 36px;
        }
        .textr {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #f86152;
      }
      .toutiao-lishi {
        color: #ffa016;
      }
      span.texth {
        font-size: 32px;
      }
    }
  }
  .logou-cell {
    margin-top: 10px;
    text-align: center;
    font-size: 28px;
    color: #d69c9a;
  }
}
</style>
