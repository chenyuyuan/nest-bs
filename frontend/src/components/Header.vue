<template>
  <el-container>
    <el-header class="bg-white">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <!-- <el-submenu index="2">
          <template slot="title">数据报表</template>
          <el-menu-item index="2-1">实时数据</el-menu-item>
          <el-menu-item index="2-2">历史数据</el-menu-item>
        </el-submenu> -->
        <el-menu-item index="3"><a href="/managedevice">设备管理</a></el-menu-item>
        <el-menu-item index="4"><a href="/messagelist" target="_blank">消息中心</a></el-menu-item>
        <el-menu-item index="5"><a href="/profile" target="_blank">个人账号</a></el-menu-item>
        <el-menu-item index="6"><a href="/postlist" target="_blank">动态</a></el-menu-item>
		<el-menu-item index="8"><a href="/" target="_blank">退出</a></el-menu-item>
        <el-menu-item style="float:right" index="8"><a href="/profile" target="_blank"><i class="el-icon-user"></i></a></el-menu-item>
        <el-menu-item style="float:right" index="7">
          <el-badge is-dot class="item">
            <a href="/messagelist" target="_blank"><i class="el-icon-message"></i></a> 
          </el-badge> 
        </el-menu-item>
      </el-menu>
      <!-- <div class="line"></div> -->
      <!-- <hr> -->
    </el-header>

  </el-container> 
</template>

<script>
import Footer from "./Footer"
export default {
	// 定义一个名为 button-counter 的新组件
	name: 'Header',
	components: {

	}
}
</script>
<style>
	.el-header, .el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}
	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}
	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		line-height: 160px;
	}
	body > .el-container {
		margin-bottom: 40px;
	}
	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}
	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
</style>
