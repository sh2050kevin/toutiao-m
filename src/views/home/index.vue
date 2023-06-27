<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
      slot="title"
      class="search-btn"
      type="info"
      round
      size="small"
      icon="search"
      >
      搜索
      </van-button>
    </van-nav-bar>
    <div class="tabs-container">
      <van-tabs v-model="active" animated swipeable class="channel-tabs">
        <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">{{ channel.name }}</van-tab>
        <div slot="nav-right" class="placeholder"></div>
        <div slot="nav-right" class="hamburger-btn">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { getUserChannels } from '@/api/user'
export default {
  name: 'ToutiaoMIndex',
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  mounted () {},
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>
<style lang="less">
.home-container {
  .van-nav-bar__title {
    max-width: unset;
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: rgba(255,255,255,0.2);
      font-size: 28px;
      .van-icon {
        font-size: 32px;
        color: #FFF;
      }
    }
  }
  .tabs-container {
    .channel-tabs {
      .van-tabs__wrap {
        position: fixed;
        top: 92px;
        z-index: 1;
        left: 0;
        right: 0;
        height: 82px;
      }
      .van-tab {
        border-right: 1px solid #edeff3;
        min-width: 200px;
        font-size: 30px;
        color: #777777;
      }
      .van-tab--active {
        color: #333333;
      }
      .van-tabs__nav {
        padding-bottom: 0;
      }
      .van-tabs__line {
        bottom: 8px;
        width: 31px !important;
        height: 6px;
        background-color: #3296fa;
      }
      .placeholder {
        flex-shrink: 0;
        width: 66px;
        height: 82px;
      }
      .hamburger-btn {
        position: fixed;
        right: 0;
        width: 66px;
        height: 82px;
        opacity: 0.902;
        background: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
        i.toutiao {
          font-size: 33px;
        }
        &:before {
          content: '';
          left: 0;
          width: 2px;
          height: 58px;
          background-image: url(~@/assets/gradient-gray-line.png);
          background-size: contain;
        }
      }
    }
  }
}
</style>
