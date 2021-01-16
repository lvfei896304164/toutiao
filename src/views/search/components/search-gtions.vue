<template>
  <div class="search-gtions">
    <van-cell icon="search" v-for="(item, index) in sections" :key="index">
      <template #title>
        <div v-html="heightlit(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getAllchannels } from '@/api/search.js';
import { debounce } from 'lodash';
export default {
  name: 'SearchGtions',
  components: {},
  props: {
    HistoryText: {
      type: String,
      required: true,
    },
  },
  data() {
    return { sections: [] };
  },
  watch: {
    HistoryText: {
      handler: debounce(function (value) {
        this.loadsearch(value);
      }, 500),
      immediate: true,
    },
  },
  computed: {},
  created() {},
  methods: {
    async loadsearch(q) {
      try {
        const { data } = await getAllchannels(q);
        this.sections = data.data.options;
        console.log(this.sections);
      } catch (err) {
        this.$toast('请求数据失败，请稍后重试');
      }
    },
    heightlit(text) {
      const str = `<span class="active">${this.HistoryText}</span>`;
      const reg = new RegExp(this.HistoryText, 'gi');
      return text.replace(reg, str);
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.search-gtions {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
