<template>
  <div class="monitor-title" v-if="isShow">
    <div class="title-chemicalContent">
      <div>
        <a style="margin-right: 5px" @click="back" v-if="isShowBackIcon">
          <i class="el-icon-back" style="font-weight: bold; color: gray"></i>
        </a>
        <span>{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      isShow: true,
      isShowBackIcon: false,
    };
  },
  watch: {
    $route() {
      // only show routes with meta.title
      this.addTitle();
    },
  },
  methods: {
    addTitle() {
      this.isShow = true;
      if (this.$route.meta.isHiddenSameToNav) {
        this.isShow = false;
        return;
      }
      // console.log(this.$route)
      //
      // const firstNodeTitle = this.$route.matched[0].meta.title;
      // 当首层没有meta，则不展示当前组件
      // if (!firstNodeTitle) {
      //   this.isShow = false;
      //   return;
      // }
      let title = '';
      // console.log(this.$route);
      this.$route.matched.forEach((item, index) => {
        // if (index === 0) {
        //   return false;
        // }
        if (item.meta.title) {
          title += `${item.meta.title}`;
        }
        if (item.meta.title && index !== this.$route.matched.length - 1) {
          title += '-';
        }
        return true;
      });

      // 当核算页面或者展示页面，显示出返回按钮
      // if (
      //   this.$route.name.indexOf('Account') !== -1 ||
      //   this.$route.name.indexOf('View') !== -1
      // ) {
      //   this.isShowBackIcon = true;
      // } else {
      //   this.isShowBackIcon = false;
      // }
      // const secondNodeTitle = this.$route.matched[0].meta.title || '';
      // const curTitle = this.$route.meta.title;
      this.title = title;
      // this.isShow = true;
    },
    back() {
      this.$router.go(-1);
    },
  },
  created() {
    this.addTitle();
  },
};
</script>

<style scoped>
.monitor-title {
  height: 58px;
  background: white;
  margin: 0px;
  padding-top: 17px;
  padding-bottom: 20px;
  padding-left: 20px;
  font-size: 20px;
  line-height: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
}
.title-chemicalContent {
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
