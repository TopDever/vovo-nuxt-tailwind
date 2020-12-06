<template>
<div class="relative dropdown" :class="{

'is-open': show

}">
    <button class="px-2 text-white flex items-center" style="transition:all .15s ease" type="button" @click="show = !show" v-click-outside="hide">
        <slot name="button"></slot>
    </button>
    <div v-if="show" class="dropdown-container bg-white text-base z-50 py-2 text-left rounded shadow-lg mt-1 absolute" :style="{

top: '100%',

right: 0
        	}">
        <slot name="container"></slot>
    </div>
</div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
    data: () => ({
        show: false
    }),
    methods: {
        hide() {
            if (this.show) {
                this.show = false;
            }
        }
    },
    directives: {
        ClickOutside
    }
}
</script>

<style>
.dropdown-container {
    display: none;
}

.dropdown.is-open>.dropdown-container {
    display: block;
}
</style>
