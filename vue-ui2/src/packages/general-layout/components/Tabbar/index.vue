<template>
  <div class="tabbar">
    <div
      class="bar-center"
      :style="{
        'margin-left': num * 170 + 'px',
        transition: 'all .3s ease-out .1s',
      }"
    >
      <div
        :class="isActive(v) ? 'bar-list-active' : 'bar-list'"
        v-for="(v, i) in tags"
        :key="i"
        @click="handleBar(i, v)"
      >
        <div class="bar-container">
          <div class="icon"></div>
          <router-link :to="v.path" class="bar-text">{{ v.title }}</router-link>
          <div v-show="tags.length > 1" class="clsoe" @click="delTags(v)"></div>
          <div v-show="tags.length == 1" class="firstClose"></div>
        </div>
        <!-- <div class="solid"></div> -->
      </div>
    </div>
    <div class="right-btn">
      <el-dropdown @command="showSelect">
        <div class="point">
          <div class="point-one"></div>
          <div class="point-one"></div>
          <div class="point-one"></div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">关闭其他页面</el-dropdown-item>
          <el-dropdown-item command="b">关闭当前页面</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <a @click="prev">
        <i
          class="el-icon-arrow-left"
          style="font-weight: bold; color: rgb(120 135 149)"
        ></i>
      </a>
      <a @click="next">
        <i
          class="el-icon-arrow-right"
          style="font-weight: bold; color: rgb(120 135 149)"
        ></i>
      </a>
      <!-- <div class="icon" @click="next"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data() {
    return {
      index: 0,
      routerLenght: 0,
      num: 0,
    };
  },
  methods: {
    prev() {
      if (this.num < 0) {
        this.num += 1;
      }
    },
    next() {
      if (this.num > -(this.$store.state.visitedTags.length + this.num)) {
        this.num -= 1;
      } else if (
        this.num < -(this.$store.state.visitedTags.length + this.num) &&
        // eslint-disable-next-line no-compare-neg-zero
        -(this.$store.state.visitedTags.length + this.num) !== -0
      ) {
        this.num -= 1;
      }
    },

    showSelect(command) {
      if (command === 'a') {
        this.$store.state.visitedTags = [
          {
            path: this.$route.path,
            name: this.$route.name,
            title: this.$route.meta.title,
            query: this.$route.query,
            syntony: this.$route.meta.syntony
          },
        ];
      }
      if (command === 'b') {
        // let tag = ;
        this.delTags({
          path: this.$route.path,
          name: this.$route.name,
          title: this.$route.meta.title,
          query: this.$route.query,
          syntony: this.$route.meta.syntony
        });
      }
    },
    isActive(tag) {
      return tag.path === this.$route.path || tag.name === this.$route.name;
    },
    handleBar(i, params) {
      this.index = i;
      this.$router.push({ path: params.path, query: params.query });
    },
    addTags() {
      if (this.$route.name) {
        // 如果路由包含名字，调用store中addVisitedTags动作增加tag标签
        this.$store.dispatch('addVisitedTags', this.$route);
      }
    },
    delTags(tag) {
      // 调用store中delVisitedTags动作删除tag标签
      this.$store.dispatch('delVisitedTags', tag).then(tags => {
        // 如果当前删除了高亮标签，那么就把高亮赋值给删除以后的数组最后一个值
        // if (this.isActive(tag) === true) {
        // console.log('删除了高亮', tags, this.$router);
        //   const arr = tags.slice(-1);
        // }
        if (this.isActive(tag)) {
          if (tags.length > 0) {
            // if (this.$route.path == '碳达峰规划') {
            // }
            setTimeout(() => {
              document.querySelector('.bar-list:last-of-type').click();
            });
            // 如果剩余标签数大于0，跳转至上一页
            // this.$router.go(-1);
          } else {
            // 如果剩余标签数为0，即删除的标签为高亮且唯一一个标签，跳转到首页
            this.$router.push('/');
          }
        }
      });
    },
  },
  computed: {
    tags() {
      if (this.$store.state.visitedTags.length === 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.$store.state.visitedTags.push({
          title: this.$route.meta.title,
          path: this.$route.path,
          query: this.$route.query,
          name: this.$route.name,
          syntony: this.$route.meta.syntony
        });
      }
      // 当前data 赋值
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.routerLenght = this.$store.state.visitedTags.length;
      return this.$store.state.visitedTags;
    },
  },
  watch: {
    $route() {
      this.addTags();
    },
  },
};
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 36px;
  background: #173967;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .bar-center {
    max-width: 98%;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .bar-list {
    cursor: pointer;
    // min-width: 170px;
    height: 36px;
    display: flex;
    border-left: 1px solid #39608f;
    align-items: center;
    .bar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 22px;
      margin-right: 10px;
      // width: 140px;
      position: relative;
      .icon {
        width: 14px;
        height: 14px;
        background: url('../../images/navbar/bar-icon.png') no-repeat;
        background-size: 100% 100%;
      }
      .bar-text {
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #899bb2;
        padding: 0 12px;
      }
      .clsoe {
        width: 14px;
        height: 14px;
        background: url('../../images/navbar/bar-close.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
      .firstClose {
        width: 14px;
        height: 14px;
        background: #173967;
        // background: url('../../images/navbar/bar-close.png') no-repeat;
        // background-size: 100% 100%;
        // cursor: pointer;
      }
    }
    .solid {
      position: absolute;
      width: 1px;
      height: 14px;
      background: #39608f;
      // margin-left: 10px;
      // margin-right: 10px;
    }
  }
  .bar-list-active {
    cursor: pointer;
    // width: 170px;
    height: 36px;
    display: flex;
    align-items: center;
    background: #304f78;
    .bar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 22px;
      margin-right: 10px;
      // width: 140px;
      .icon {
        width: 14px;
        height: 14px;
        background: url('../../images/navbar/bar-icon-active.png') no-repeat
          center center;
        background-size: 100% 100%;
      }
      .bar-text {
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        padding: 0 12px;
      }
      .clsoe {
        width: 14px;
        height: 14px;
        background: url('../../images/navbar/bar-close.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
  .el-submenu > .el-menu .el-menu-item {
    padding-left: 70px !important;
  }
  .right-btn {
    height: 15px;
    width: 2%;
    margin-right: 10px;
    display: flex;
    align-items: center;
    z-index: 1;
    background: #173967;
    .point {
      height: 15px;
      .point-one {
        width: 3px;
        height: 3px;
        background: #798695;
        border-radius: 50%;
        margin-bottom: 3px;
        cursor: pointer;
      }
      cursor: pointer;
    }
    .icon {
      cursor: pointer;
      margin-left: 10px;
      width: 16px;
      height: 16px;
      background: url('../../images/navbar/icon_btn_next.png') no-repeat
        center center;
    }
  }
}
</style>
