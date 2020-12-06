<template>
<header class="py-6 mx-auto" :class="classname">
    <div class="brand flex items-center" :class="classnameBrand">
        <img src="/images/logo.png">
        <span class="ml-1">
            <div class="title">VOCO</div>
            <div class="subtitle">Chatbot Builder</div>
        </span>
    </div>
</header>
</template>

<script>
export default {
    props: {
        classname: {
            type: String
        },
        classnameBrand: {
            type: String
        }
    }
}
</script>
