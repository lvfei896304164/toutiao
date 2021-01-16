<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <template #left><van-icon name="cross" @click="$router.go(-1)" /></template>
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form ref="loginform" @submit="onSubmit">
      <van-field
        v-model.trim="user.mobile"
        name="mobile"
        type="number"
        maxlength="11"
        placeholder="请输入手机号"
        left-icon="contact"
        :rules="userFormRules.mobile"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model.trim="user.code"
        name="code"
        maxlength="6"
        placeholder="请输入验证码"
        left-icon="smile-o"
        :rules="userFormRules.code"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down
            v-if="iscounDownshow"
            :time="1000 * 5"
            format="ss s"
            @finish="iscounDownshow = false"
          >
            <template #default="{seconds}"> {{ seconds + 1 }} s </template>
          </van-count-down>
          <van-button
            v-else
            native-type="button"
            class="send-sms-btn"
            round
            size="small"
            type="default"
            @click="anSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-warp">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import login from '@/api/user.js';
export default {
  name: 'login',
  data() {
    return {
      user: {
        mobile: '13811111111', // 手机号码
        code: '246810', // 验证码
      },
      userFormRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3578]\d{9}/, message: '手机号格式错误' },
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /\d{6}/, message: '验证码错误' },
        ],
      },
      iscounDownshow: false, // 验证码倒计时显示隐藏
    };
  },
  methods: {
    async onSubmit() {
      // 1.获取表单数据
      // 2.表单验证
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0,
      });
      // 3.提交表单发起登录请求
      try {
        const { data } = await login.postlogin(this.user);
        this.$store.commit('setUser', data.data);
        this.$toast.success('登录成功');
        this.$router.push('/');
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误');
        } else {
          console.log('登录失败', err);
          this.$toast.fail('登录失败,请稍后尝试');
        }
      }
      // 4.根据请求响应回来的结果处理后续操作
    },
    async anSendSms() {
      try {
        await this.$refs.loginform.validate('mobile');
      } catch (err) {
        return console.log('验证失败', err);
      }
      this.iscounDownshow = true;
      // 发送验证码
      try {
        const res = await login.getlogin(this.user.mobile);
        this.$toast.success('发送成功');
        console.log(res, 'hehe');
      } catch (err) {
        this.iscounDownshow = false;
        if (err.response.status === 429) {
          this.$toast.success('发送太频繁,请稍后重试');
        } else {
          this.$toast('发送失败', err);
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    background-color: #ededed;
  }
  .login-btn-warp {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
