<template>
  <div class="cards flex-col lg:flex-row flex mb-6 mt-16 items-center">
    <div class="w-full lg:w-1/2 lg:pr-32">
      <CardLoginForm></CardLoginForm>
    </div>
    <div class="w-full lg:w-1/2 lg:pl-32">
      <CardLoginEasySteps></CardLoginEasySteps>
    </div>
  </div>
</template>

<script>
  import CardLoginForm from '@/components/CardLoginForm';
  import CardLoginEasySteps from '@/components/CardLoginEasySteps';

  export default {
    layout: 'auth',
    auth: 'guest',
    components: {
      CardLoginForm,
      CardLoginEasySteps
    }
  }
</script>

<style>
  .cards {
    top: 130px;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
