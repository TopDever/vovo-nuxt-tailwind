<template>
    <div class="p-8 text-center">
        <CardProfileInfoEdit :show="show" :info="user" :onCancel="onCancel" />
        <div v-if="$auth.loggedIn">
            <img :src="authPhoto" class="w-24 h-24 object-cover rounded-full mx-auto shadow" />
            <p class="mt-2 text-sm" v-if="first_name">First Name: {{ first_name }}</p>
            <p class="mt-2 text-sm" v-if="last_name">Last Name: {{ last_name }}</p>
            <p class="mt-2 text-sm" v-if="user.website">Website: {{ user.website }}</p>
            <p class="mt-2 text-sm" v-if="user.email">Email: {{ user.email }}</p>
            <p class="mt-2 text-sm" v-if="user.phone_number">Mobile Number: {{ user.phone_number }}</p>
            <img src="/icons/account-edit1.png" class="absolute profileEdit" width="30" @click="show = !show" />
        </div>
    </div>
</template>

<script>
import CardProfileInfoEdit from "@/components/CardProfileInfoEdit";
export default {
    data: () => ({
        show: false,
        authPhoto: '/images/user.svg',
    }),
    components: {
        CardProfileInfoEdit,
    },
    computed: {
        user() {
            return this.$store.state.auth.user;
        },
        first_name(){
            const name_part = this.$store.state.auth.user.full_name.split( " " );
            return name_part[ 0 ];
        },
        last_name(){
            const name_part = this.$store.state.auth.user.full_name.split( " " );
            return name_part[ 1 ];
        }
    },
    methods: {
        onCancel: function (event) {
            this.show = event;
        },
    },
    created() {
        this.authPhoto = this.user.profile_avatar.formats !== null ? 'https://api.vovo.chat' + this.user.profile_avatar.formats.thumbnail.url : 'https://api.vovo.chat' + localStorage.getItem('authPhoto');
    }
};
</script>
