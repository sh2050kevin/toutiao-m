<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar"/>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          name="手机号"
          placeholder="请输入手机号"
        >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
        <van-field
          type="password"
          name="验证码"
          placeholder="请输入验证码"
        >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button size="small" round class="send-sms-btn" type="primary">获取验证码</van-button>
        </template>
      </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  data () {
    return {
    }
  },

  mounted () {
  },

  methods: {
    onSubmit () {

    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    .toutiao-shouji,.toutiao-yanzhengma {
        font-size: 37px;
        margin-right: 39px;
    }
    .send-sms-btn {
      background-color: #ededed;
      border: none;
      height: 46px;
      color: #666;
    }
    .login-btn-wrap {
      padding: 53px 28px;
      .login-btn {
        background-color: #6db4fb;
        width: 694px;
        height: 88px;
        border: none;
        color: #fff;
        font-size: 30px;
      }
    }
  }
</style>
