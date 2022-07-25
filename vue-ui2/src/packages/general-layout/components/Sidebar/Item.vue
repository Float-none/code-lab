<!-- <template>
  <div>
    <svg-icon :icon-class="icon" class="svg-icon"></svg-icon>
    <span>{{title}}</span>
  </div>
</template> -->
<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />);
      } else {
        vnodes.push(<svg-icon icon-class={icon} />);
      }
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
::v-deep element.style {
  padding-left: 60px !important;
}
::v-deep li.el-menu-item.is-active {
  padding-left: 74px !important;
}
</style>
