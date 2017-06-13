<<template>
  <div id="wrapper">
    <NavRegion active='Config'></NavRegion>
      <h1 style="text-align: center; margin-top: 100px;">Config</h1>
      </div>
  </div>
</template>

<script>
import NavRegion from './NavRegion'
import kindle from '../../util/functions.js'

export default {
  name: 'config',
  components: { NavRegion },
  methods: {

  },
  data: () => {
    return {

    }
  },
}
</script>

<style scoped>
  h1 {
    color: #000;
  }
</style>

