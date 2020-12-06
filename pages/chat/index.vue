<template>
    <div>
        <div v-show="!activeLeadOfDay" class="bg-yellow-600 text-white font-bold text-lg py-2 text-center">
            Leads This Week
        </div>
        <div class="text-center text-base font-semibold text-red-500" v-if="errorLead">
            Couldn't load week lead data
        </div>
        <div v-else-if="loadingLead">
            <SpinnerLoading></SpinnerLoading>
        </div>
        <div v-else class="mt-2 w-11/12 mx-auto">
            <table v-show="!activeLeadOfDay" class="min-w-full bg-white">
                <thead class="bg-white text-gray-900 font-bold border-solid border-t-0 border-b border-black">
                    <tr>
                        <th class="text-left py-3 px-4 text-base">ID</th>
                        <th class="text-left py-3 px-4 text-base">Bot Name</th>
                        <th class="text-left py-3 px-4 text-base">Day</th>
                        <th class="w-3/12 text-left py-3 px-4 text-base">Date (UTC)</th>
                        <th class="w-5/12 text-left py-3 px-4 text-base">Leads</th>
                        <th style="width: 10%;" class="text-left py-3 px-4 text-base"></th>
                    </tr>
                </thead>
                <tbody class="text-gray-700">
                    <tr v-for="(lead, index) in week_leads" :index="index" :class="{'bg-gray-300': index % 2 == 1}">
                        <td class="py-3 px-4">{{ lead.bot_id }}</td>
                        <td class="py-3 px-4">{{ lead.name }}</td>
                        <td class="py-3 px-4">{{ lead.day }}</td>
                        <td class="py-3 px-4">
                            {{ lead.utcdate }}
                            <!-- <a class="hover:text-blue-400" :href="'https://api.vovo.chat/bots/leads/' + lead.bot_id + '/date/' + lead.utcdate " >{{ lead.utcdate }}</a> -->
                        </td>
                        <td class="py-3 px-4">{{ lead.leads }}</td>
                        <td class="py-3 px-4"><button class="bg-blue-700 hover:bg-blue-800 py-1 px-3 rounded-full text-base font-semibold text-white" @click="viewLead(lead.bot_id, lead.utcdate, lead.name)">View</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-show="activeLeadOfDay" class="bg-yellow-600 text-white font-bold text-lg py-2 text-center">
            Leads Of Day
        </div>
        <div class="text-center text-base font-semibold text-red-500" v-if="errorDateLead">
            Couldn't load day lead data
        </div>
        <div v-else-if="loadingDateLead">
            <SpinnerLoading></SpinnerLoading>
        </div>
        <div v-else class="mt-2 w-11/12 mx-auto">
            <table v-show="activeLeadOfDay" class="min-w-full bg-white">
                <thead class="bg-white text-gray-900 font-bold border-solid border-t-0 border-b border-black">
                    <tr>
                        <th class="w-1/12 text-left py-3 px-4 text-base">ID</th>
                        <th class="w-2/12 text-left py-3 px-4 text-base">Bot Name</th>
                        <th class="w-1/12 text-left py-3 px-4 text-base">Lead Category</th>
                        <th class="w-3/12 text-left py-3 px-4 text-base">Date</th>
                        <th class="w-3/12 text-left py-3 px-4 text-base">Timezone</th>
                        <th class="w-3/12 text-left py-3 px-4 text-base">Session</th>
                        <th class="w-2/12 text-left py-3 px-4 text-base">Typed Text</th>
                    </tr>
                </thead>
                <tbody class="text-gray-700">
                    <tr v-for="(lead, index) in leads_res_data" :index="index" :class="{'bg-gray-300': index % 2 == 1}">
                        <td class="py-3 px-4">{{ lead.bot_id }}</td>
                        <td class="py-3 px-4">{{ bot_name }}</td>
                        <td class="py-3 px-4">{{ lead.leadcat }}</td>

                        <td class="py-3 px-4">
                            <a>{{ lead.local_date }}</a>
                        </td>
                        <td>{{lead.local_timezone}}</td>
                        <td class="py-3 px-4">{{ lead.session }}</td>
                        <td class="py-3 px-4">{{ lead.typed_text }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br>
        <button v-show="activeLeadOfDay" class="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 px-4 rounded margin" v-on:click="gotochat()">
            Back
        </button>

        <div v-show="!activeLeadOfDay" class="bg-yellow-600 text-white font-bold text-lg py-2 text-center">
            Recent Chats
        </div>
        <div class="text-center text-base font-semibold text-red-500" v-if="error">
            Couldn't load chat history
        </div>
        <div v-else-if="loading">
            <SpinnerLoading></SpinnerLoading>
        </div>
        <div v-else class="mt-2 w-11/12 mx-auto">
            <table v-show="!activeLeadOfDay" class="min-w-full bg-white">
                <thead class="bg-white text-gray-900 font-bold border-solid border-t-0 border-b border-black">
                    <tr>
                        <th class="text-center py-3 px-4 text-base">Id</th>
                        <th class="w-3/12 text-center py-3 px-4 text-base">Bot Name</th>
                        <th class="w-3/12 text-center py-3 px-4 text-base">Session</th>
                        <th class="text-center py-3 px-4 text-base">Messages</th>
                        <th class="w-5/12 text-center py-3 px-4 text-base">Date</th>
                        <th class="text-center py-3 px-4 text-base">Timezone</th>
                        <th style="width: 5%;" class="text-center py-3 px-4 text-base"></th>
                    </tr>
                </thead>
                <tbody class="text-gray-700">
                    <tr v-for="(chat, index) in chats" :index="index" :class="{'bg-gray-300': index % 2 == 1}">
                        <td class="py-3 px-4 text-center">{{ index }}</td>
                        <td class="py-3 px-4 text-center">{{ chat.bot.name }}</td>
                        <td class="py-3 px-4 text-center">
                            {{ chat.session }}
                            <!-- <a class="hover:text-blue-400" :href="'https://api.vovo.chat/bots/session/' + chat.session" >{{ chat.session }}</a> -->
                        </td>
                        <td class="py-3 px-4 text-center">{{ chat.messages }}</td>
                        <td class="py-3 px-4 text-center">{{ chat.local_date }}</td>
                        <td class="py-3 px-4 text-center">{{ chat.local_timezone }}</td>
                        <td class="py-3 px-4 text-center"></td>
                        <td class="py-3 px-4 text-center">
                            <button class="bg-blue-700 hover:bg-blue-800 py-1 px-3 rounded-full text-base font-semibold text-white" v-on:click="gotosite(chat.session)">View</button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
        week_leads: [],
        leads_res_data: [],
        loading: true,
        error: false,
        loadingLead: false,
        errorLead: false,
        loadingDateLead: false,
        errorDateLead: false,
        activeLeadOfDay: false,
        bot_name: "",
    }),
    mounted() {
        const req_chats = this.$axios.get('https://api.vovo.chat/bots/chats/all')
        const req_bots = this.$axios.get('https://api.vovo.chat/bots')
        const week_leads = this.$axios.get('https://api.vovo.chat/bots/leads/all/week')

        Promise.all([req_chats, req_bots, week_leads])
            .then(res => {

                const bots = res[1].data;
                const lead_data = [];

                //week lead data
                res[2].data.map((lead, index) => {
                    res[1].data.map((bots, index1) => {
                        if (bots.bot_id == lead.bot_id) {
                            const array = [];

                            array.bot_id = lead.bot_id;
                            array.day = lead.day;
                            array.leads = lead.leads;
                            array.utcdate = lead.utcdate;
                            array.name = bots.name;
                            lead_data.splice(index, 0, array);
                        }
                    })
                })
                this.week_leads = lead_data;
                //week lead data

                const data = res[0].data.map(chat => {
                    return {
                        ...chat,
                        bot_id: chat.bot,
                        bot: bots.find(bot => bot.bot_id == chat.bot)
                    }
                })

                this.chats = data;
                //console.log(this.chats);
                this.$store.commit('history/set', data);
                this.loading = false;
            })
            .catch(res => {
                this.error = true;
            })
    },
    filters: {
        chatDatetime(val) {
            let time = new Date(val * 1000).toISOString();
            time = time.slice(0, 19).replace('T', ' ')
            return time
        }
    },
    methods: {
        viewLead: function (bot_id, date, bot_name) {

            // console.log(bot_id + date);

            const url = 'https://api.vovo.chat/bots/leads/' + bot_id + '/date/' + date;
            const date_leads = this.$axios.get(url)
            this.bot_name = bot_name;
            Promise.all([date_leads])
                .then(res => {

                    this.leads_res_data = res[0].data;
                    this.activeLeadOfDay = !this.activeLeadOfDay;

                })
                .catch(res => {
                    this.errorDateLead = true;
                    this.activeLeadOfDay = !this.activeLeadOfDay;
                })
        },
        gotosite: function (chatSession) {
            this.$router.push({
                name: 'chat-id',
                params: {
                    id: chatSession
                }
            })
        },
        gotochat: function () {
            this.$router.go();
            //this.$forceUpdate();
            //this.$router.app.refresh()
            //this.$router.back();
            /*this.$router.push({
                name: 'chat'
            })*/
        }
    }
}
</script>

<style>
    .margin {
        margin-left: 4%;
    }
    /*
    tr button {
      display: none;
    }
    tr:hover button {
      display: inline-block;
    }
    */
</style>
