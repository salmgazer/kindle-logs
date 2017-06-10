<template>
  <div>
    <div class="logo"></div>'
  </div>
</template>

<script>

export default {
  name: 'logo'
}
</script>

<style type="css" scoped>
	.logo {
		position: fixed;
		height: 45px;
		width: 45px;
		left: 0;
		top: 0;
		background-color: #FF4949;
		border-radius: 25px;
		margin-top: 50px;
		margin-left: 50px;
	}
	@media only screen and (max-width: 480px)and only screen and (max-width: 480px), only screen and (max-device-width: 480px), only screen and (max-device-width: 640px) {
	  .logo {
	  	width: 80px;
	  	height: 80px;
	  	border-radius: 40px;
	  	margin-top: 60px;
	  }
	}
</style>
