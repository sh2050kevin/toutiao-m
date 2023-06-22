<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar"/>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-cell-group inset>
        <van-field
          name="mobile"
          placeholder="请输入手机号"
          v-model="user.mobile"
          :rules="userFormRules.mobile"
          type="number"
          maxlength="11"
        >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
        <van-field
          name="code"
          v-model="user.code"
          placeholder="请输入验证码"
          :rules="userFormRules.code"
          type="number"
          maxlength="6"
        >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
          v-if="isCountDownShow"
          :time="5000"
          format="ss s"
          @finish="isCountDownShow=false"/>
          <van-button v-else size="small" @click="onSendSms" round class="send-sms-btn" type="primary">获取验证码</van-button>
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
import { login, sendSms } from '@/api/user'
import { mapMutations } from 'vuex'

export default {
  name: 'LoginPage',

  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },

  mounted () {
  },

  methods: {
    ...mapMutations(['setUser']),
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        message: '登录中',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(user)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data.data)
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或者验证码不正确')
          this.$toast.fail('手机号或者验证码不正确')
        } else {
          console.log('登录失败，请稍后重试')
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('手机号校验失败')
      }
      this.isCountDownShow = true
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后再试')
        } else {
          this.$toast('发送失败，请稍后再试')
        }
      }
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
