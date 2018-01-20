<template>
  <div class="nav-bar">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-submenu index="2">
          <template slot="title">Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">Orders</el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  data: function () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect: function (el) {
      console.log(el)
    }
  }
}
</script>
<style lang="less" scoped>
  .nav-bar {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 999;
    .el-menu-demo {
      width: 1000px;
      margin: 0 auto;
    }
  }
</style>
