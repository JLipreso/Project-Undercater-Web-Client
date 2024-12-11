<template>
  <header id="header" class="header d-flex align-items-center position-relative" style="background-color: #1e1e1e;">
    <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
      <a href="index.html" class="logo d-flex align-items-center">
        <img src="/src/assets/image/logo.png" alt="AgriCulture">
      </a>
      <nav id="navmenu" class="navmenu">
        <ul>
          <li><router-link :class="{ 'active': $route.name == 'home' ? true : false }" to="/">Home</router-link></li>
          <li><router-link :class="{ 'active': $route.name == 'about' ? true : false }" to="/about">About Us</router-link></li>
          <li><router-link :class="{ 'active': $route.name == 'events' ? true : false }" to="/events">Events</router-link></li>
          <li><router-link :class="{ 'active': $route.name == 'menu' ? true : false }" to="/menu">Menu</router-link></li>
          <li><router-link :class="{ 'active': $route.name == 'blog' ? true : false }" to="/blog">Blog</router-link></li>
          <li><router-link :class="{ 'active': $route.name == 'contact' ? true : false }" to="/contact">Contact Us</router-link></li>
          <li v-show="!authenticated"><router-link :class="{ 'active': $route.name == 'login' ? true : false }" to="/login">Login</router-link></li>
          <li v-show="!authenticated"><router-link :class="{ 'active': $route.name == 'registration' ? true : false }" to="/registration">Register</router-link></li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
    </div>
  </header>
</template>
<script lang="ts">

  import { getLocalUser } from '@/assets/ts/localStorage';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "SectionHeader",
    data() {
      return {
        authenticated: false
      }
    },
    async mounted() {
      await getLocalUser().then( async (user) => {
        if(user) {
          this.authenticated = true;
        }
        else {
          this.authenticated = false;
        }
      });
    },
  });

</script>
