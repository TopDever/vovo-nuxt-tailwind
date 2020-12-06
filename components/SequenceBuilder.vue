<template>
	<div>
		<draggable
			v-model="sequenceMessaging"
			handle=".btn-draggable"
		>
			<div
				v-for="(message, index) in sequenceMessaging"
				:key="index"
				class="mt-8"
			>
				<SequenceButtonGroup
					:index="index"
					:message="message"
				></SequenceButtonGroup>
				<div>
					<div v-if="message.hasOwnProperty('dialog')">
						<textarea
							:value="message.dialog"
							placeholder=""
							class="h-24 rounded bg-white p-2 mt-1 outline-none w-full"
							type="text"
							@input="updateMessage($event, index, 'dialog')"
						></textarea>
					</div>
					<div v-else-if="message.hasOwnProperty('media')">
						<input
							type="file"
							ref="mediaUpload"
							class="hidden"
							@change="handleImageUpload( $event, index )"
						>
						<div class="py-2 flex gap-4" v-if="message.hasOwnProperty('media') && message.media">
							<img
								:src="message.media"
								alt=""
								class="w-24 h-24 object-cover shadow p-1 border border-gray-400"
							/>
							<a
								href="#"
								@click.prevent="$refs.mediaUpload[index].click()"
							>
									<img src="/icons/camera.svg" width="32px" class="z-10 opacity-25 hover:opacity-50" />
							</a>
						</div>
						<div
							v-else
						>
							<button
								class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 mt-1 rounded flex items-center"
								@click.prevent="$refs.mediaUpload[index].click()"
							>
								<span class="mr-2">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.667 490.667" style="enable-background:new 0 0 490.667 490.667;" xml:space="preserve" width="16px" height="16px" class="fill-current"><g><path d="M245.333,0C110.059,0,0,110.059,0,245.333s110.059,245.333,245.333,245.333s245.333-110.059,245.333-245.333 S380.608,0,245.333,0z M245.333,469.333c-123.52,0-224-100.48-224-224s100.48-224,224-224s224,100.48,224,224 S368.853,469.333,245.333,469.333z"/></g><g><path d="M245.333,106.667c-5.888,0-10.667,4.779-10.667,10.667v256c0,5.888,4.779,10.667,10.667,10.667S256,379.221,256,373.333 v-256C256,111.445,251.221,106.667,245.333,106.667z"/></g><g><path d="M338.219,195.115l-85.333-85.333c-4.16-4.16-10.923-4.16-15.083,0l-85.333,85.333c-4.16,4.16-4.16,10.923,0,15.083 c4.16,4.16,10.923,4.16,15.083,0l77.781-77.781l77.781,77.803c2.091,2.069,4.821,3.115,7.552,3.115 c2.731,0,5.461-1.045,7.552-3.136C342.379,206.037,342.379,199.275,338.219,195.115z"/></g></svg>
								</span>
								<span>Upload file</span>
							</button>
						</div>
					</div>
					<!--div v-else-if="message.hasOwnProperty('media')">
						<input
							:value="message.media"
							placeholder=""
							class="rounded bg-white p-2 mt-1 outline-none w-full"
							type="text"
							@input="updateMessage($event, index, 'media')"
						>
					</div-->
					<div v-else-if="message.hasOwnProperty('choices')">
						<div
							v-for="(choice, i) in message.choices"
							:key="i"
							class="flex justify-between items-center mt-2"
						>
							<div class="flex justify-center items-center m-1 font-medium w-10 h-10 bg-white rounded-full text-gray-700 bg-gray-100 border border-gray-300 px-4 chip-choice">
								<span class="text-base">{{ choice.payload }}</span>
							</div>
							<input
								:value="choice.title"
								placeholder=""
								class="rounded bg-white p-2 outline-none w-8/12"
								type="text"
								@input="updateChoice($event, i, index)"
							>
							<div class="w-4/12 flex items-center justify-between">
								<button
									@click="removeChoice(index, i);"
			 						class="bg-transparent border-transparent px-3 text-xl text-gray-600 font-semibold"
			 					>
									<svg class="fill-current" enable-background="new 0 0 515.556 515.556" height="14" viewBox="0 0 515.556 515.556" width="14" xmlns="http://www.w3.org/2000/svg"><path d="m64.444 451.111c0 35.526 28.902 64.444 64.444 64.444h257.778c35.542 0 64.444-28.918 64.444-64.444v-322.222h-386.666z"/><path d="m322.222 32.222v-32.222h-128.889v32.222h-161.111v64.444h451.111v-64.444z"/></svg>
								</button>
							</div>
						</div>
						<div class="flex justify-between items-center mt-2">
							<input
								v-model="choice_model[index]"
								placeholder=""
								class="rounded bg-white p-2 outline-none w-8/12"
								type="text"
							>
							<div class="w-4/12 flex items-center justify-between">
								<button
									@click="addChoice( index, message )"
			 						class="bg-gray-600 hover:bg-gray-700 py-1 px-2 rounded-full text-sm text-white"
			 					>
									Add choice
								</button>
							</div>
						</div>
					</div>
				</div>
				<hr class="mt-5">
			</div>
		</draggable>
		<div class="mt-3">
			<div class="flex items-center">
				<span>
					<a
						href="#"
						class="font-semibold text-gray-600 py-1 mr-3"
						@click.prevent="addNewMessage"
					>+ New message</a>
				</span>
				<span class="flex">
					<button
						class="py-2 bg-gray-100 w-12 border-l border-t border-b"
						:class="{
							'bg-gray-300': optionSelected == 'dialog'
						}"
						type="button"
						name="Dialog"
						title="Dialog"
						@click="setOption('dialog')"
					>
						<img
							class="mx-auto"
							width="20"
							src="/icons/text-selected.png"
							alt=""
						>
					</button>
					<button
						v-if="!choicesExists"
						class="py-2 bg-gray-100 w-12 border"
						:class="{
							'bg-gray-300': optionSelected == 'choices',
						}"
						type="button"
						name="Choices"
						title="Choices"
						:disabled="choicesExists"
						@click="setOption('choices')"
					>
						<img
							class="mx-auto"
							width="20"
							src="/icons/options-selected.png"
							alt=""
						>
					</button>
					<button
						class="py-2 bg-gray-100 w-12 border-r border-t border-b"
						:class="{
							'bg-gray-300': optionSelected == 'media'
						}"
						type="button"
						name="Media"
						title="Media"
						@click="setOption('media')"
					>
						<img
							class="mx-auto"
							width="20"
							src="/icons/image-selected.png"
							alt=""
						>
					</button>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import SequenceButtonGroup from '@/components/SequenceButtonGroup'

	export default {
		components: {
			draggable,
			SequenceButtonGroup
		},
		data(){
			return {
				choice_model: {},
				optionSelected: 'dialog'
			}
		},
		computed: {
			sequenceMessaging: {
				get(){
					return this.$store.state.sequence.sequence.messaging;
				},
				set( v ){
					this.$store.commit('sequence/updateMessages', v)
				}
			},
			choicesExists(){
				const messaging = this.$store.state.sequence.sequence.messaging
				let exists = false;
				exists = messaging && messaging.some(message => {
					return message.hasOwnProperty('choices');
				})

				return exists;
			}
		},
		methods: {
			setOption( type ){
				if( type == 'choices' && this.choicesExists ){
					this.optionSelected = type;
				}
				else {
					this.optionSelected = type;
				}
			},
			addNewMessage(){
				const messages = this.sequenceMessaging;

				let m;

				const optionSelected = this.optionSelected;

				if( optionSelected == 'choices' ){
					this.optionSelected = "dialog";
					m = {
						delay: 1,
						choices: [],
					}
				}
				else {
					m = {
						delay: 1,
						[ optionSelected ]: ''
					}
				}

				this.$store.commit('sequence/updateMessages', [
					m,
					...messages
				])
			},
			updateMessage( e, index, key ){
				const message = this.sequenceMessaging[ index ];
				this.$store.commit('sequence/updateMessage', {
					index: index,
					message: {
						...message,
						[key]: e.target.value
					}
				})
			},
			updateChoice( e, index, indexMenu ){
				const choices = [
					...this.sequenceMessaging[ indexMenu ].choices
				]

				const choice = {
					...this.sequenceMessaging[ indexMenu ].choices[ index ],
					title: e.target.value
				};

				choices[index] = choice;


				this.$store.commit('sequence/updateMessage', {
					index: indexMenu,
					message: {
						choices: [
							...choices
						]
					}
				})
			},
			addChoice( index, message ){

				if( this.choice_model[ index ] ){
					const choices = this.sequenceMessaging[ index ].choices;
					let object = [{
						title: this.choice_model[ index ],
						payload: choices.length + 1
					}];

					this.$store.commit('sequence/updateMessage', {
						index: index,
						message: {
							choices: [
								...choices,
								...object
							]
						}
					})

					this.choice_model[ index ] = '';

					let intentsStore = this.$store.state.sequence.sequence.intents;
					const intents = [
						...intentsStore,
						...[{
							destination_label: "",
							matchmode: "",
							name: "",
							utterances: [ ( choices.length + 1 ) ],
							new: true
						}]
					];

					this.$store.commit("sequence/updateIntents", intents);
				}
			},
			removeChoice( index, indexChoice ){
				const choices = [
					...this.sequenceMessaging[ index ].choices
				];

				choices.splice(indexChoice, 1);

				this.$store.commit('sequence/updateMessage', {
					index: index,
					message: {
						choices: [
							...choices
						]
					}
				})
			},
			async handleImageUpload( e, index ){

				const files = e.target.files
				const formData = new FormData()
				formData.append('files', files[0])

				try {
					let response = await this.$axios.post(
						'https://api.vovo.chat/upload',
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						}
					)

					let new_sequence = {};

					const sequence = {
	            		...this.$store.state.sequence.sequence
	            	};

	            	if( sequence.messaging[index].hasOwnProperty("delay") ){
	            		new_sequence.delay = sequence.messaging[index].delay;
	            	}

	            	new_sequence.media = this.baseAPI + response.data[0].url;

	            	this.$store.commit('sequence/updateMessage', {
						index: index,
						message: new_sequence
					})

	            	const sequences = [
	            		...this.$store.state.sequence.sequences
	            	];

	            	const indexSelected = this.$store.state.sequence.index_selected

	            	sequences[ indexSelected ] = sequence;

					response = await this.$axios.put(`https://api.vovo.chat/menus/${this.$route.params.id}`, sequences)

					this.$toast.show("Updated sequences.", {
						position: "bottom-right",
						type: 'success'
					});

				} catch(e) {
					this.$toast.show("The file couldn't be loaded.", {
						position: "bottom-right"
					});
				}
			},
		}
	}
</script>
