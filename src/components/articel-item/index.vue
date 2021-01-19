<template>
  <van-cell class="articel-item" :to="{ name: 'article', params: { articleId: article.art_id } }">
    <template #title>
      <div class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    </template>
    <template #label>
      <div v-if="article.cover.type === 3" class="cover-warp">
        <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
          <van-image class="cover-item-img" :src="img" fit="cover" />
        </div>
      </div>
      <div class="label">
        <div class="label-info-warp">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
    </template>
    <template #default>
      <van-image
        v-if="article.cover.type === 1"
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticelItem',
  components: {},
  props: {
    article: {
      trpe: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.articel-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-warp span {
    font-size: 22px;
    color: #b5b5b5;
    margin-right: 25px;
  }
  .cover-warp {
    display: flex;
    padding: 30px 0;
    .cover-item {
      &:not(:last-child) {
        padding-right: 4px;
      }
      flex: 1;
      height: 146px;
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
