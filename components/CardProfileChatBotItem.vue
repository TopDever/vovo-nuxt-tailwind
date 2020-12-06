<template>
<div class="relative">
    <nuxt-link :to="{
        name: 'bot-id',
        params: {
        id: bot.bot_id,
        },
    }" tag="div" class="relative h-40 flex items-center justify-center px-2 w-64 bg-yellow-500 shadow-lg rounded-lg mx-10 text-xl text-gray-900 cursor-pointer">
        <span v-if="!inputShow">{{ bot.name }}</span>
    </nuxt-link>
    <input v-if="inputShow" type="text" @change="handleEvent" class="absolute border border-gray-400 rounded px-3 py-2 w-3/5 outline-none" style="right:65px;bottom:55px;" ref="botName" v-model="botname" placeholder="Input your name" />
    <a style="right:32px" class="chatItem absolute bottom-0 m-4" href="#">
        <img src="/icons/account-edit.png" width="35" />
        <div class="chatPop bg-white text-base z-50 py-4 text-left rounded shadow-lg mt-1 absolute shadow-linner">
            <nuxt-link :to="{
                name:'bot-id',
                params: {
                    id: bot.bot_id,
                },
            }" tag="a" class="chatPopItems text-sm py-1 px-4 font-normal block w-full whitespace-no-wrap bg-transparent  text-gray-800">Build
            </nuxt-link>
            <a href="/deploy" class="chatPopItems text-sm py-1 px-4 font-normal block w-full whitespace-no-wrap bg-transparent  text-gray-800">Deploy</a>
            <nuxt-link :to="{
                name:'styling-id',
                params: {
                    id: bot.bot_id,
                },
            }" tag="a" class="chatPopItems text-sm py-1 px-4 font-normal block w-full whitespace-no-wrap bg-transparent  text-gray-800">Styling</nuxt-link>
            <a href="#" @click="renameCard(!inputShow)" class="chatPopItems text-sm py-1 px-4 font-normal block w-full whitespace-no-wrap bg-transparent  text-gray-800">Rename</a>
            <a href="#" @click="deleteCard" class="chatPopItems text-sm py-1 px-4 font-normal block w-full whitespace-no-wrap bg-transparent  text-gray-800">Delete</a>
        </div>
    </a>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
        botname: '',
        inputShow: false,
    }),
    created() {
        this.botname = this.bot.name
    },
    props: {
        bot: Object
    },
    methods: {
        async handleEvent(e) {

            if (e.target.value == '') {

            } else {
                const data = {
                    name: e.target.value
                }
                try {
                    let response = await this.$axios.put(`https://api.vovo.chat/bots/${this.bot.bot_id}`, data, {
                        headers: {
                            'Authorization': this.$auth.getToken('local')
                        },

                    })
                    console.log('Reaponse: ', response)
                    location.reload()
                } catch (e) {
                    console.dir(e)
                }
            }

        },
        renameCard(evt) {
            this.inputShow = evt
        },
        async deleteCard() {
            try {
                let response = await this.$axios.delete(`https://api.vovo.chat/bots/${this.bot.bot_id}`, {
                    headers: {
                        'Authorization': this.$auth.getToken('local')
                    },

                })
                location.reload()
            } catch (e) {
                console.dir(e)
            }
        }
    }
};
</script>
