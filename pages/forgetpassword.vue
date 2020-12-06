<template>
  <div class="cards flex-col lg:flex-row flex mb-6 mt-16 items-center">
    <div
    	v-if="!codeExists"
    	class="w-full lg:w-1/2 lg:pr-32"
    >
      <CardForgetPassword></CardForgetPassword>
    </div>
    <div 
    	v-else
    	class="w-full lg:w-1/2 lg:pr-32"
    >
    	<CardForgetPasswordWithCode></CardForgetPasswordWithCode>
    </div>
    <div class="w-full lg:w-1/2 lg:pl-32">
      <CardLoginEasySteps></CardLoginEasySteps>
    </div>
  </div>
</template>

<script>
  import CardForgetPassword from '@/components/CardForgetPassword';
  import CardForgetPasswordWithCode from '@/components/CardForgetPasswordWithCode';
  import CardLoginEasySteps from '@/components/CardLoginEasySteps';

  export default {
    layout: 'auth',
    auth: 'guest',
    components: {
      CardForgetPassword,
      CardForgetPasswordWithCode,
      CardLoginEasySteps
    },
    computed: {
    	codeExists(){
    		return this.$route.query.code ? true : false;
    	}
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
