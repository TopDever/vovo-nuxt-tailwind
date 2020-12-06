<template>
	<div>
		<div
			class="mt-8"
		>
      <div class="bg-white shadow rounded flex justify-between px-5">
        <div class="flex items-center my-2">
          <a
            class="mr-3"
            href="#"
            @click.prevent=""
          >
            <img
              width="24"
              src="/icons/webhook.svg"
            >
          </a>
        </div>
        <div class="flex items-center text-gray-400">
          <span
            class="font-semibold text-sm mr-1"
          >Webhook</span>
        </div>
      </div>
      <div class="mt-4">
        <label class="flex items-center">
          <span class="px-4">Url</span>
          <input
						:value="sequenceWebhook.webhook_url"
            placeholder=""
            class="rounded bg-white p-2 outline-none w-8/12"
            type="text"
						@keyup="setWebhook( $event, 'webhook_url' )"
          >
        </label>
      </div>
			<div class="mt-6 flex w-full gap-3 uppercase font-semibold text-gray-800 text-xs">
				<div class="w-1/3">
					Return Condition
				</div>
				<div class="w-2/3">
					Follow on Sequence
				</div>
			</div>

			<div class="mt-4 flex w-full gap-3">
				<div class="w-1/3">
					<label for="onsuccess" class="flex items-center">
	          <span class="px-4">Success</span>
					</label>
				</div>
				<div class="w-2/3">
					<select
						id="onsuccess"
						:value="sequenceWebhook.onsuccess"
						class="w-full border-gray-300 border border-solid rounded bg-white shadow p-1"
						@change="setWebhook( $event, 'onsuccess' )"
					>
						<option value="" disabled selected>Select a sequence</option>
						<option
							v-for="( sequence, i ) in sequences"
							:value="sequence.label"
							:key="i"
						>{{ sequence.description }}</option>
					</select>
				</div>
			</div>

			<div class="mt-4 flex w-full gap-3">
				<div class="w-1/3">
					<label for="onsuccess" class="flex items-center">
	          <span class="px-4">Error</span>
					</label>
				</div>
				<div class="w-2/3">
					<select
						:value="sequenceWebhook.onerror"
						class="w-full border-gray-300 border border-solid rounded bg-white shadow p-1"
						@change="setWebhook( $event, 'onerror' )"
					>
						<option value="" disabled selected>Select a sequence</option>
						<option
							v-for="( sequence, i ) in sequences"
							:value="sequence.label"
							:key="i"
						>{{ sequence.description }}</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {}
		},
		computed: {
			sequenceWebhook(){
				return this.$store.state.sequence.sequence.webhook
			},
			sequences(){
				return this.$store.state.sequence.sequences;
			}
		},
		methods: {
			setWebhook( e, key ){
				console.log( e.target.value, key )
				if( e.target.value ){
					this.$store.commit("sequence/updateWebhook", {
						key,
						value: e.target.value || ""
					})
				}
			}
    }
	}
</script>

<style>
	.chip-choice {
		width: 38px;
		height: 38px;
	}
</style>
