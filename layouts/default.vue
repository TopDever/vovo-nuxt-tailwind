<template>
  <div>
    <MainHeader
      class="bg-blue-700 px-10"
      classname-brand="text-white text-center"
    ></MainHeader>
    <Nuxt />
  </div>
</template>

<script>
  import MainHeader from '@/components/HeaderMember';

  export default {
    components: {
      MainHeader
    }
  }
</script>