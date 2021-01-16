<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <template #title>
        <div class="title-text">我的频道</div>
      </template>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <template #icon>
          <van-icon name="clear" v-show="isEdit && !fiexChannels.includes(channel.id)"></van-icon>
        </template>
        <template #text>
          <span class="text" :class="{ active: index === active }"> {{ channel.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <template #title>
        <div class="title-text">频道推荐</div>
      </template>
    </van-cell>
    <van-grid class="recomment-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="AddmyChannels(channel)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllchannel, addUserchannel, deleteUserchannel } from '@/api/channel.js';
import { mapState } from 'vuex';
import { setItem } from '@/utils/storage';
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制删除频道显示与隐藏
      fiexChannels: [2], // 固定频道，不允许删除
    };
  },
  watch: {},
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        // find 遍历数组找到满足条件的元素项
        return !this.myChannels.some((myChannel) => {
          return myChannel.id === channel.id; // 这里查找一个满足条件的元素 返回的是布尔值true
        });
      });
    },
  },
  created() {
    this.loadgetAllchannel();
  },
  mounted() {},
  methods: {
    async loadgetAllchannel() {
      try {
        const { data } = await getAllchannel();
        // console.log(data, '来米了');
        this.allChannels = data.data.channels;
      } catch (err) {
        this.$toast('数据获取失败', err);
      }
    },
    async AddmyChannels(channel) {
      // 添加频道
      this.myChannels.push(channel);
      // 数据持久化处理
      if (this.user) {
        try {
          // 已登录，把数据请求接口放到线上
          await addUserchannel({
            id: channel.id, // 频道id
            seq: this.myChannels.length, // 序号
          });
        } catch (err) {
          this.$toast('保存失败,请稍后重试');
        }
      } else {
        // 未登录，数据存储到本地
        setItem('toutiao-mini', this.myChannels);
      }
    },
    onMyChannelClick(channel, index) {
      // 切换频道的操作
      // 编辑状态执行删除操作
      if (this.fiexChannels.includes(channel.id)) {
        return;
      }
      if (this.isEdit) {
        if (index <= this.active) {
          this.$emit('updata-active', this.active - 1, true);
        }
        this.myChannels.splice(index, 1);
        this.deleteChannel(channel);
      } else {
        // 非编辑状态执行切换频道
        this.$emit('updata-active', index, false);
      }
    },
    async deleteChannel(channel) {
      try {
        if (this.user) {
          // 已登录删除频道数据更新到线上
          await deleteUserchannel(channel.id);
        } else {
          console.log(1111);
          setItem('toutiao-mini', this.myChannels);
        }
      } catch (err) {
        this.$toast('删除失败');
      }
    },
  },
};
</script>
<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #ff7061;
    border: 1px solid #ff7061;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f3f5f7;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/.recomment-grid {
    .grid-item {
      .van-grid-item__content {
        white-space: nowrap;
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
        .van-grid-item__text {
          margin-top: unset;
        }
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-grid-item__content {
        white-space: nowrap;
        .van-icon-clear {
          position: absolute;
          right: -10px;
          top: -10px;
          color: #cacaca;
          font-size: 30px;
          z-index: 2;
        }
      }
    }
  }
}
</style>
