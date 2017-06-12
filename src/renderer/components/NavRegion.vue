<template>
  <div>
    <b-navbar toggleable type="inverse" variant="success">
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
              <span style="font-weight: bold;">Settings</span>
            </template>
          
            <b-dropdown-item to="#">Config</b-dropdown-item>
            <b-dropdown-item to="#">Profile</b-dropdown-item>
            <b-dropdown-item to="/logout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
      </b-collapse>
    </b-navbar>
  </div>

</template>

<script>

export default {
  name: 'navregion',
  props: ['active'],
  data: () => {
		return {
			links: [
				{ 'name': 'Home', 'link': '#/home' },
				{ 'name': 'Devices', 'link': '#/devices' }
			]
		}
	},
  methods: {
    navigate: (link) => {
      window.location.hash = link
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
</style>



	