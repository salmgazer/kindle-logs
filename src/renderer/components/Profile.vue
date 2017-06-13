<<template>
  <div id="wrapper">
    <NavRegion active='Profile'></NavRegion>
      <div>
        <form>
          <div>
            <span class="title">
              Update your details
            </span>
          </div>
          <div class="row col-md-6">
            <b-form-input v-model="text" type="text" placeholder="username" name="username" id="username"></b-form-input>
          </div>
          <div class=" row col-md-6">
            <b-form-input v-model="text" type="password" placeholder="old password" name="password" id="password"></b-form-input>
          </div>
          <div class=" row col-md-6">
            <b-form-input v-model="text" type="password" placeholder="new password" name="password_new" id="password_new"></b-form-input>
          </div>
          <button class="center" type="submit" @click="login()">Login</button><br><br>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavRegion from './NavRegion'
import store from '../../database/store.js'
import kindle from '../../util/functions.js'

export default {
  name: 'profile',
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

