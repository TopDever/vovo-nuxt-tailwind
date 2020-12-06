<template>
	<div class="bg-white shadow rounded flex justify-between px-5">
		<div class="flex items-center my-2">
			<a
				v-if="message.hasOwnProperty('dialog')"
				class="mr-3"
				href="#"
				@click.prevent="changeType('dialog')"
			>
				<img
					width="24"
					src="/icons/text-selected.png"
				>
				<!--img
					v-else
					width="24"
					src="/icons/text-unselected.png"
				-->
			</a>
			<!--a
				class="mr-3"
				href="#"
				@click.prevent="changeType('media')"
			>
				<img
					v-if="message.hasOwnProperty('media')"
					width="24"
					src="/icons/link-selected.png"
				>
				<img
					v-else
					width="24"
					src="/icons/link-unselected.png"
				>
			</a>

				////
				In bottom buttom
				v-if="index > 0 || sequenceMessaging.length == 1"
			-->
			<a
				v-if="message.hasOwnProperty('choices')"
				class="mr-3"
				href="#"
				@click.prevent="changeType('choices')"
			>
				<img
					width="24"
					src="/icons/options-selected.png"
				>
				<!--img
					v-else
					width="24"
					src="/icons/options-unselected.png"
				-->
			</a>
			<a
				v-if="message.hasOwnProperty('media')"
				class="mr-3"
				href="#"
				@click.prevent="changeType('media')"
			>
				<img
					width="24"
					src="/icons/image-selected.png"
				>
				<!--img
					v-else
					width="24"
					src="/icons/image-unselected.png"
				-->
			</a>
		</div>
		<div class="flex items-center text-gray-400">
			<span
				class="font-semibold text-sm mr-1"
			>Message {{ index + 1 }}/{{ sequenceMessaging.length }}</span>
			<span
				class="mx-2 hover:text-black"
				:class="{
					'cursor-not-allowed': message.hasOwnProperty( 'choices' ),
					'btn-draggable': !message.hasOwnProperty( 'choices' )
				}"
			>
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16" height="16" viewBox="0 0 276.167 276.167" style="enable-background:new 0 0 276.167 276.167;" xml:space="preserve" class="fill-current"><g><path d="M33.144,2.471C15.336,2.471,0.85,16.958,0.85,34.765s14.48,32.293,32.294,32.293s32.294-14.486,32.294-32.293 S50.951,2.471,33.144,2.471z"/><path d="M137.663,2.471c-17.807,0-32.294,14.487-32.294,32.294s14.487,32.293,32.294,32.293c17.808,0,32.297-14.486,32.297-32.293 S155.477,2.471,137.663,2.471z"/><path d="M243.873,67.059c17.804,0,32.294-14.486,32.294-32.293S261.689,2.471,243.873,2.471s-32.294,14.487-32.294,32.294 S226.068,67.059,243.873,67.059z"/><path d="M32.3,170.539c17.807,0,32.297-14.483,32.297-32.293c0-17.811-14.49-32.297-32.297-32.297S0,120.436,0,138.246 C0,156.056,14.493,170.539,32.3,170.539z"/><path d="M136.819,170.539c17.804,0,32.294-14.483,32.294-32.293c0-17.811-14.478-32.297-32.294-32.297 c-17.813,0-32.294,14.486-32.294,32.297C104.525,156.056,119.012,170.539,136.819,170.539z"/><path d="M243.038,170.539c17.811,0,32.294-14.483,32.294-32.293c0-17.811-14.483-32.297-32.294-32.297 s-32.306,14.486-32.306,32.297C210.732,156.056,225.222,170.539,243.038,170.539z"/><path d="M33.039,209.108c-17.807,0-32.3,14.483-32.3,32.294c0,17.804,14.493,32.293,32.3,32.293s32.293-14.482,32.293-32.293 S50.846,209.108,33.039,209.108z"/><path d="M137.564,209.108c-17.808,0-32.3,14.483-32.3,32.294c0,17.804,14.487,32.293,32.3,32.293 c17.804,0,32.293-14.482,32.293-32.293S155.368,209.108,137.564,209.108z"/><path d="M243.771,209.108c-17.804,0-32.294,14.483-32.294,32.294c0,17.804,14.49,32.293,32.294,32.293 c17.811,0,32.294-14.482,32.294-32.293S261.575,209.108,243.771,209.108z"/></g></svg>
			</span>
			<a
				@click.prevent="removeMenu( index )"
				href="#"
				class="text-3xl mx-2 font-semibold text-current hover:text-black"
			>
				&times;
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			message: Object,
			index: Number
		},
		data: () => ({
			object: false
		}),
		computed: {
			sequenceMessaging(){
				return this.$store.state.sequence.sequence.messaging;
			}
		},
		mounted(){
			if( this.message.hasOwnProperty( 'choices' ) ){
				this.object = {
					old_type: 'choices',
					old_value: this.message.choices
				}
			}
			else if( this.message.hasOwnProperty( 'media' ) ){
				this.object = {
					old_type: 'media',
					old_value: this.message.media
				}
			}
			else if( this.message.hasOwnProperty( 'dialog' ) ){
				this.object = {
					old_type: 'dialog',
					old_value: this.message.dialog
				}
			}
		},
		methods: {
			changeType( type ){

				// added change
				return;

				if( this.message.hasOwnProperty( type ) ){
					return;
				}

				let object;

				const delay = this.$store.state.sequence.sequence.messaging[ this.index ].delay || undefined

				if( type == 'choices' ){
					object = {
						delay,
						title: '',
						choices: []
					}

					if( this.object.old_type == 'choices' ){
						object.choices = this.object.old_value
					}
				}
				else if( type == 'media' ){
					object = {
						delay,
						media: ''
					}

					if( this.object.old_type == 'media' ){
						object.media = this.object.old_value
					}
				}
				else if( type == 'dialog' ){
					object = {
						delay,
						dialog: ''
					}

					if( this.object.old_type == 'dialog' ){
						object.dialog = this.object.old_value
					}
				}
				/*else if( type == 'link' ){
					object = {
						delay,
						link: true
					}
				}*/

				this.$store.commit('sequence/updateMessage', {
					index: this.index,
					message: object
				})
			},
			removeMenu( index ){

				const messages = [
					...this.$store.state.sequence.sequence.messaging
				]

				messages.splice(index, 1);

				this.$store.commit('sequence/updateMessages', messages);
			}
		}
	}
</script>
