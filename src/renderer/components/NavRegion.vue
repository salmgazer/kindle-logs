<template>
  <div>
    <b-navbar toggleable type="inverse" id="wr-nav">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
        <b-link class="navbar-brand" to="#">
          <span>Kindle Logs</span>
        </b-link>

        <b-collapse is-nav id="nav_collapse">
          <b-nav is-nav-bar v-for='link in links' :key='link.link'>
            <b-nav-item v-if='link.name == active' @click='navigate(link.link)' class="active-nav">{{ link.name }} </b-nav-item>
            <b-nav-item v-else @click='navigate(link.link)'>{{ link.name }} </b-nav-item>
          </b-nav>

          <b-nav is-nav-bar class="ml-auto">
            <b-nav-item-dropdown right>

            <template slot="text">
              <span style="color: #fff; margin-right: 50px;">Welcome&nbsp; {{ this.username }}</span>
            </template>


            <template slot="text">
              <span style="font-weight: bold;">Settings</span>
            </template>

            <b-dropdown-item to="/config">Config</b-dropdown-item>
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item to="/logout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
      </b-collapse>
    </b-navbar>
  </div>

</template>

<script>
import store from '../../database/store.js'
import kindle from '../../util/functions.js'

export default {
  name: 'navregion',
  props: ['active'],
  data: () => {
		return {
			links: [
				{ 'name': 'Home', 'link': '#/home' },
				{ 'name': 'Devices', 'link': '#/devices' },
        { 'name': 'Documentation', 'link': '#/documentation' }
			],
      username: store.get('users')[0].admin.username
		}
	},
  methods: {
    navigate: (link) => {
      kindle.navigate(link)
    }
  }
}
</script>

<style type="css">
  .navbar-brand span{
    font-size: 25px;
  }
  .active-nav a {
    color: #fff !important;
  }
  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }
  #wr-nav {
    background-color: #05f;
  }
</style>
