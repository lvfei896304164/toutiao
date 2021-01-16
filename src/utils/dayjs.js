import Vue from 'vue';
import dayjs from 'dayjs';
// dayjs默认语言是英文我们配置成为中文
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
// 配置使用relativeTime(相对时间)的插件
dayjs.extend(relativeTime);
dayjs.locale('zh-cn'); // 全局使用
// dayjs() 获取当前时间
// console.log(dayjs().format('YYYY-MM-DD'));
// 参数1：过滤器名称
// 参数2：过滤器函数
// 使用方式：{{ 表达式 | 过滤器名称 }}
// 管道符前面的表达式的结果会作为参数传递到过滤器函数中
// 过滤器的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value));
});
