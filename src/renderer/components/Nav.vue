<template>
<div>
	<span v-on:click='openNav' class='nav-control'>&#9776;</span>
		<div id='myNav' class='overlay'>
			<logo></logo>
					<a href='javascript:void(0)' class='closebtn' v-on:click='closeNav'>&times;</a>
				<div class='overlay-content'>
					<el-row v-for='link in links' :key='link.link' id='nav-area-content'>
						<el-col>
							<a :href='link.link' v-on:click='closeNav'>{{ link.name }}</a>
							<hr v-if='link.name != "Servicesss"' class='nav-line'>
						</el-col>
					</el-row>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'navigation',
	data: () => {
		return {
			links: [
				{ 'name': 'Home', 'link': '#/' },
				{ 'name': 'Devices', 'link': '#/devices' },
				{ 'name': 'Logout', 'link': '#/' },
			]
		}
	},
	methods: {
  openNav: () => { document.getElementById('myNav').style.height = '100%' },
	closeNav: () => { document.getElementById('myNav').style.height = '0%' }
	}
}
</script>

<style type='css' scope>
#nav-area-content{
  width: 50%;
  margin: 0 auto;
}
.nav-social-icon {
  width: 50px;
  height: auto;
  margin-left: 0;
}
.nav-social-icon:hover {
  margin-top: -15px;
  transition: 0.8s;
}
.nav-control {
	color: #05f;
	font-size: 50px;
	position: absolute;
  top: 35px;
  right: 45px;
}
.nav-control:hover , .nav-control:focus {
	color: #000;
	cursor: pointer;
	cursor: hand;
}
/* The Overlay (background) */
.overlay {
    /* Height & width depends on how you want to reveal the overlay (see JS below) */ 
    height: 0%;   
    width: 100%;
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    /*background-color: rgba(0,224,183,0.95); /* Black fallback color */
    background-color: #05f;
    overflow-x: hidden; /* Disable horizontal scroll */
    transition: 0.5s;
}

.overlay-content {
    position: relative;
    top: 13%; /* 25% from the top */
    width: 100%; /* 100% width */
    text-align: left; /* Centered text/links */
    margin-top: 30px; /* 30px top margin to avoid conflict with the close button on smaller screens */
}
.overlay a {
    text-decoration: none;
    padding: 15px;
    font-size: 45px;
    font-weight: light;
    color: #ffffff;
    text-align: left;
    display: block; /* Display block instead of inline */
    transition: 0.5s;
}
.overlay a:hover, .overlay a:focus {
    color: #e6989f;
    transition: 0.8s;
}
.overlay a i {
  font-style: normal;
  color: #efc2c6;
  font-size: 15px;
  margin-left: 30px;
  text-transform: lowercase;
  font-family: 'Comic Sans Ms';
}
.overlay .closebtn {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 0px;
    margin-right: 20px;
    font-size: 60px;
    color: #ffffff;
    font-weight: 100;
}

hr.nav-line { 
  border-style: solid; 
  border-color: #d65c66; 
  border-width: 0.1px 0 0 0; 
} 
hr.nav-line:before { 
  display: block; 
  content: ''; 
  height: 30px; 
  margin-top: -31px; 
  border-style: solid;
  border-color: #d65c66;
  border-width: 0 0 0.1px 0; 
}
@media only screen and (max-width: 480px), only screen and (max-width: 480px), only screen and (max-device-width: 480px), only screen and (max-device-width: 640px) {
    .nav-control {
      font-size: 5em;
      position: absolute;
      top: 45px;
      right: 60px;
    }
    #nav-area-content{
      width: 80%;
      margin: 0 auto;
    }
    .nav-social-icon {
      width: 2em;
      margin-left: 10px;
      margin-right: 10px;
    }
    .overlay .closebtn {
      margin-top: 5px;
      margin-right: 30px;
      font-size: 7em;
      color: #ffffff;
    }
    .overlay a {
      padding: 30px;
      font-size: 5em;
    }
    .overlay a i {
      font-size: 30px;
      margin-left: 30px;
    }
  }

</style>

	
