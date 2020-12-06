<template>
<div>
    <div class="bg-yellow-600 text-white font-bold text-lg py-2 text-center">
        Chat History
    </div>
    <div class="text-center text-base font-semibold text-red-500 my-5" v-if="error">
        Couldn't load messages
    </div>
    <div v-else-if="loading">
        <SpinnerLoading></SpinnerLoading>
    </div>
    <div v-else class="mt-4 mb-8 w-11/12 mx-auto flex rounded-lg shadow-xl border-solid border-2 border-gray-400">
        <div class="w-full bg-white lg:w-8/12 px-6 py-12 overflow-y-auto" style="height: 500px;">
            <div v-for="(message, index) in messages" :key="index">
                <div class="flex justify-start mb-12" :class="{'flex-row': message.participant == 'bot','flex-row-reverse': message.participant == 'human'}">
                    <div class="w-16 h-16 relative flex flex-shrink-0" :class="{'mr-4': message.participant == 'bot','ml-4': message.participant == 'human'}">
                        <img class="shadow-md rounded-full w-full h-full object-cover" :src="message.participant == 'bot' ? bot_avatar : '/images/user-icon.png'" />
                    </div>
                    <div class="text-base grid grid-flow-row gap-2">
                        <div class="flex flex-col items-center group">
                            <div class="px-8 py-4 bg-gray-300 max-w-xs lg:max-w-md text-black relative">
                                <div class="arrow-down" :class="{'left': message.participant == 'bot','right': message.participant == 'human'}"></div>
                                {{ message.text }}
                                <div v-if="message.quick_replies && message.quick_replies.length" class="flex flex-wrap" :class="{

'mt-2': message.participant == 'bot'

}">
                                    <button v-for="( quick, index ) in message.quick_replies" :key="index" type="button" class="rounded-full px-4 mr-2 my-1 text-white p-2 rounded flex items-center flex-none" :class="{

'bg-green-600': message.participant == 'bot',

'bg-green-700': message.participant == 'human'

}">{{ quick }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full bg-gray-300 lg:w-4/12 py-12 flex items-center justify-center relative">
            <div>
                <nuxt-link class="p-0 w-10 h-10 rounded-full text-blue-600 bg-blue-100 shadow flex justify-center items-center absolute top-0 left-0 m-3" :to="{

name: 'chat'

}">
                    <svg class="fill-current" enable-background="new 0 0 451.111 451.111" height="20" viewBox="0 0 451.111 451.111" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="m451.111 193.333h-322.222l112.778-112.777-48.333-48.333-193.334 193.333 193.333 193.333 48.333-48.333-112.777-112.778h322.222z" />
                    </svg>
                </nuxt-link>
            </div>
            <div>
                <img src="/images/user-icon.png" class="w-24 h-24 object-cover rounded-full mx-auto shadow">
                <h1 class="text-black text-xl font-bold text-center my-3">Conversation: {{ chatIndex }}</h1>
                <h3 class="text-sm text-black font-bold text-center my-1">Id: {{ chatHistory.session }}</h3>
                <h3 class="text-sm text-black font-bold text-center my-1">Date: {{ chatHistory.local_date }}</h3>
                <!-- <h3 class="text-sm text-black font-bold text-center my-1">Time: {{ chatHistory.time | chatTime }}</h3> -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import SpinnerLoading from '@/components/Spinner'

export default {
    components: {
        SpinnerLoading,
    },
    data: () => ({
        chats: [],
        loading: true,
        error: false,
        bot_avatar: "/images/vovo-bot.png",
    }),
    computed: {
        messages() {
            if (this.chats.length) {

                return this.chats.map(chat => {
                    let quick_replies = [];
                    let text = "";

                    if (chat.response) {
                        let response = JSON.parse(chat.response);
                        quick_replies = response.quick_replies;
                        text = response.text;
                    }

                    if (chat.recognised_text) {
                        quick_replies = [chat.recognised_text]
                    }

                    return {
                        text: text,
                        quick_replies: quick_replies,
                        participant: chat.participant
                    }
                })
            } else {
                return []
            }
        },
        chatHistory() {
            return this.$store.state.history.list.find(hist => {
                return hist.session == this.$route.params.id
            })
        },
        chatIndex() {
            return this.$store.state.history.list.findIndex(hist => {
                return hist.session == this.$route.params.id
            })
        }
    },
    mounted() {

        if (!this.$store.state.history.list.length) {
            this.$router.push({
                name: 'chat'
            })
        } else {
            this.$axios.get(`https://api.vovo.chat/bots/session/${this.$route.params.id}`)
                .then(res => {
                    console.dir(res)
                    this.chats = res.data;

                    this.$axios.get(`https://api.vovo.chat/bots/${res.data[0].bot_id}`)
                        .then(response => {
                            this.bot_avatar = 'https://api.vovo.chat' + response.data.bot_avatar.url;
                        })
                        .catch(response => {
                            this.error = true;
                            console.dir(response)
                        })

                    console.dir(res.data)
                    this.loading = false;
                })
                .catch(res => {
                    this.error = true;
                    console.dir(res)
                })
        }
    },
    filters: {
        chatTime(val) {
            let time = new Date(val * 1000).toISOString();
            time = time.slice(0, 19).split('T')[1]
            return time
        },
        chatDate(val) {
            let time = new Date(val * 1000).toISOString();
            time = time.slice(0, 19).split('T')[0]
            return time
        }
    }
}
</script>

<style>
.arrow-down {
    position: absolute;
    bottom: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid theme('colors.gray.300');
    ;
}

.arrow-down.left {
    left: 15px;
}

.arrow-down.right {
    right: 15px;
}
</style>
