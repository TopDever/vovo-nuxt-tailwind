<template>
  <div>
    <img 
      src="/images/path_218.png" 
      class="hidden lg:block bg-pattern h-full xl:h-screen" 
    />
    <div class="w-10/12 mx-auto px-4 relative h-screen">
      <MainHeader></MainHeader>
      <Nuxt />
    </div>
  </div>
</template>

<script>
  import MainHeader from '@/components/Header';

  export default {
    components: {
      MainHeader
    }
  }
</script>

<style>
  .bg-pattern {
    width: 57%;
    position: fixed;
    left: 43%;
    z-index: -1;
  }
</style>