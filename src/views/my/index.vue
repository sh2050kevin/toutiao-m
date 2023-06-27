<template>
  <div class="my-container">
    <div class="container" v-if="user">
      <div class="header">
        <div class="left">
          <van-image class="img"
          round
          fit="cover"
          :src="userInfo.photo"
          />
          <span class="username">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button round class="text" size="mini">编辑资料</van-button>
        </div>
    </div>
    <div class="data-stats">
      <div class="data-item">
        <span class="num">{{ userInfo.art_count }}</span>
        <span class="text">头条</span>
      </div>
      <div class="data-item">
        <span class="num">{{ userInfo.follow_count }}</span>
        <span class="text">关注</span>
      </div>
      <div class="data-item">
        <span class="num">{{ userInfo.fans_count }}</span>
        <span class="text">粉丝</span>
      </div>
      <div class="data-item">
        <span class="num">{{ userInfo.like_count }}</span>
        <span class="text">获赞</span>
      </div>
    </div>
    </div>
    <div v-else class="no-login">
      <div class="login-btn" @click="login">
        <van-image class="nv-img" round fit="cover" :src="require('../../assets/mobile.png')" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <div class="nav">
      <van-grid column-num="2" class="grid" clickable>
        <van-grid-item>
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item>
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="cell">
      <van-cell-group>
        <van-cell class="cell-item" clickable center is-link>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title">消息通知</span>
          </template>
        </van-cell>
        <van-cell class="cell-item" clickable center is-link>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title">小智同学</span>
          </template>
        </van-cell>
        <van-cell v-if="user" @click="logout" class="logout-cell" clickable center>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title">退出登录</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'ToutiaoMIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted () {
  },
  methods: {
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(this.userInfo)
      } catch (err) {
        this.$toast('请求数据失败')
      }
    },
    login () {
      this.$router.push('/login')
    },
    logout () {
      this.$store.commit('setUser', null)
    }
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  }
}
</script>
<style lang="less" scoped>
.my-container {
  background-color: rgb(245,247,249);
  .container {
    height: 366px;
    background-image: url('~@/assets/banner.png');
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      height: 150px;
      .left {
        padding-top: 81px;
        padding-left: 12px;
        display: flex;
        align-items: center;
        .img {
          width: 150px;
          height: 150px;
          margin-right: 22px;
        }
        .username {
          font-size: 30px;
          color: #FFF;
        }
    }
    .right {
      display: flex;
      align-items: center;
      margin-right: 33px;
      margin-top: 130px;
      .text {
        width: 116px;
        height: 33px;
        font-size: 20px;
        color: rgb(102,102,102);
      }
    }
    }
    .data-stats {
      display: flex;
      .data-item {
        box-sizing: border-box;
        width: 47px;
        height: 66px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #FFF;
        margin-top: 70px;
        .num {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .nav {
    .grid {
      height: 141px;
      .toutiao {
        font-size: 45px;
        color: rgb(235,82,83);
      }
      .text {
        font-size: 28px;
        color: rgb(51,51,51);
        margin-top: 16px;
      }
    }
  }
  .cell {
    margin-top: 30px;
    .cell-item {
      height: 100px;
      .custom-title {
        font-size: 30px;
        color: rgb(51,51,51);
      }
    }
    .logout-cell {
      text-align: center;
      height: 104px;
      margin-top: 9px;
      .custom-title {
        color: rgb(216,98,98);
        font-size: 30px;
      }
    }
  }
  .no-login {
    height: 366px;
    background-image: url('../../assets/banner.png');
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .nv-img {
        width: 132px;
        height: 132px;
      }
      .text {
        font-size: 28px;
        color: #FFF;
        padding-top: 15px;
      }
    }
  }
  }
</style>
