<template>
<div class="bg-blue-300 mt-2 p-10 pt-12 pb-16">
    <h2 class="text-4xl font-semibold text-white mb-8">My Chatbots</h2>
    <div class="text-center text-base font-semibold text-red-500 my-5" v-if="error">
        Bots couldn't be loaded
    </div>
    <div v-else-if="loading">
        <SpinnerLoading></SpinnerLoading>
    </div>
    <div v-else class="flex">
        <CardProfileChatBotItem v-for="(bot, index) in bots" :key="index" :bot="bot"></CardProfileChatBotItem>
        <nuxt-link :to="{
          name: 'builder',
        }" class="h-40 flex items-center justify-center px-2 w-64 bg-white shadow-lg rounded-lg mx-10 text-5xl text-gray-900 cursor-pointer">
            +
        </nuxt-link>
    </div>
</div>
</template>

<script>
import SpinnerLoading from "@/components/Spinner";
import CardProfileChatBotItem from "@/components/CardProfileChatBotItem";
export default {
    components: {
        SpinnerLoading,
        CardProfileChatBotItem
    },
    data: () => ({
        bots: [],
        loading: true,
        error: false,
        show: false,
    }),
    mounted() {

        this.loading = true;
        this.$axios
            .get("https://api.vovo.chat/bots")
            .then((res) => {
                this.bots = res.data;
                this.loading = false;
            })
            .catch((res) => {
                this.error = true;
            });
    },

};
</script>
