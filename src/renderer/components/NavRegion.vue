<template>
  <div>
    <el-row id="nav-area">
      <el-col :span="24">
        <div :span="12">
          <Logo></Logo>
        </div>
        <div :span="12">
          <Nav></Nav>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Logo from './Logo'
import Nav from './Nav'

export default {
  name: 'navregion',
  components: { Logo, Nav }
}
</script>

<style type="css" scope>
	#nav-area {
		height: 20vh;
	}
	@media only screen and (max-width: 480px), only screen and (max-width: 480px), only screen and (max-device-width: 480px), only screen and (max-device-width: 640px) {
		#nav-area {
			height: 12vh;
			border-right-width: 18px;
		}
  }

</style>



	