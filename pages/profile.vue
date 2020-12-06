<template>
<div>
    <div class="w-7/12 mx-auto px-4 py-6">
        <CardProfileInfo></CardProfileInfo>
    </div>
    <CardProfileChatBots></CardProfileChatBots>
    <AppFooter></AppFooter>
</div>
</template>

<script>
import AppFooter from '@/components/Footer';
import CardProfileInfo from '@/components/CardProfileInfo';
import CardProfileChatBots from '@/components/CardProfileChatBots';

export default {
    components: {
        AppFooter,
        CardProfileInfo,
        CardProfileChatBots
    }
}
</script>
