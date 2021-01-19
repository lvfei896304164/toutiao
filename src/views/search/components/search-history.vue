<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('updata-search-history')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete-o" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in SearchHistorse"
      :key="index"
      @click="onsearchItem(item, index)"
    >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    // prop数据
    // 如果是普通数据类型绝对不能修改即使改了也不会影响父组件
    // 复杂数据类型可以修改但是不能重新赋值
    SearchHistorse: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false,
    };
  },
  watch: {},
  computed: {},
  created() {},
  methods: {
    onsearchItem(item, index) {
      if (this.isDeleteShow) {
        // 删除状态操作,删除历史纪录
        this.SearchHistorse.splice(index, 1);
      } else {
        // 非删除的状态，直接进入搜索
        this.$emit('search', item);
      }
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped></style>
