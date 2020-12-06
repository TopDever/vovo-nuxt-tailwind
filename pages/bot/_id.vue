<template>
	<div class="mb-12">
		<div class="bg-yellow-600 text-white font-bold text-lg py-2 text-center">
			{{ title }}
		</div>
		<div
			class="text-center text-base font-semibold text-red-500 my-5"
			v-if="error"
		>
			Couldn't load the builder
		</div>
		<div
			v-else-if="loading"
		>
			<SpinnerLoading></SpinnerLoading>
		</div>
		<div v-else>
			<div class="bg-gray-200 p-10 w-10/12 mx-auto mt-5">
				<div class="grid grid-cols-3 gap-8">
					<div class="col-span-3 lg:col-span-2">
						<div
							v-if="sequenceAction == 'WEBHOOK'"
							class="w-8/12"
						>
							<div>
								<div
									class="flex rounded bg-blue-700 p-2 text-white outline-none w-full"
								>
									<input
										v-model="sequenceDescription"
										placeholder="Introduction"
										class="w-full bg-transparent border-0 outline-none"
										type="text"
									>
									<span
										class="flex ml-1"
									>
										<button
											type="button"
											class="rounded text-sm border-0 bg-gray-600 w-12 mr-1 text-center"
										>
											Edit
										</button>
										<button
											@click.prevent="deleteSequence"
											type="button"
											class="rounded text-sm border-0 bg-yellow-600 w-12 text-center"
										>
											Delete
										</button>
									</span>
								</div>
							</div>
							<div>
								<SequenceBuilderWebhook></SequenceBuilderWebhook>
							</div>
						</div>
						<div
							v-else
							class="w-8/12"
						>
							<div>
								<div
									class="flex rounded bg-blue-700 p-2 text-white outline-none w-full"
								>
									<input
										v-model="sequenceDescription"
										placeholder="Introduction"
										class="w-full bg-transparent border-0 outline-none"
										type="text"
									>
									<span
										class="flex ml-1"
									>
										<button
											type="button"
											class="rounded text-sm border-0 bg-gray-600 w-12 mr-1 text-center"
										>
											Edit
										</button>
										<button
											@click.prevent="deleteSequence"
											type="button"
											class="rounded text-sm border-0 bg-yellow-600 w-12 text-center"
										>
											Delete
										</button>
									</span>
								</div>
							</div>
							<div>
								<SequenceBuilder></SequenceBuilder>
							</div>
						</div>
					</div>
					<div class="col-span-3 lg:col-span-1">
				 		<div class="text-right mb-5">
				 			<button
		 						class="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 px-4 rounded"
		 					>
									Preview
							</button>
							<button
		 						class="bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded"
		 					>
									Publish
							</button>
				 		</div>
				 		<div class="bg-gray-300 rounded-lg overflow-hidden shadow-lg">
				 			<h3
				 				class="font-semibold text-center my-2"
				 			>Sequence Library</h3>
				 			<div
				 				class="bg-blue-700"
				 			>
				 				<div>
				 					<ul>
				 						<li
				 							v-for="(sequence, i) in sequences"
											:key="i"
				 							class="px-6 py-2"
				 							:class="{
				 								'bg-blue-200': i % 2 == 0,
				 								'bg-blue-500': i % 2 == 1
				 							}"
				 						>
				 							<a
				 								href="#"
				 								@click.prevent="selectSequence(i)"
				 								class="capitalize"
				 							>
				 								{{ sequence.description || sequence.label || 'Unspecified'}}
				 							</a>
				 						</li>
				 					</ul>
				 				</div>
				 				<div class="text-center py-3">
				 					<button
										@click.prevent="addSequence"
				 						class="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-full"
				 					>
	  									Add New Sequence
									</button>
				 				</div>
				 			</div>
				 		</div>
				 	</div>
				</div>
				<div class="mt-5" v-if="sequenceAction != 'WEBHOOK'">
					<div class="shadow-lg rounded-lg">
						<div
							class="bg-blue-400 text-white font-semibold py-2 text-center rounded-t-lg"
						>
							Intent Matching
							<span class="bg-gray-400 text-black px-2 rounded-full">?</span>
						</div>
						<div
							class="bg-white p-5"
						>
							<div v-if="$store.state.sequence.sequence.intents && $store.state.sequence.sequence.intents.length">
								<div
									v-for="(intent, index) in $store.state.sequence.sequence.intents"
									:key="index"
									class="flex gap-8 items-center py-2 px-3 items-center"
									:class="{
										'bg-gray-200': index % 2 == 1
									}"
								>
									<div
										class="flex py-2 gap-8 items-center w-full"
									>
										<div class="w-1/3">
											<label
												:for="'action_keywords_' + index"
												class="text-lg"
											>Action Keywords</label>
											<div class="mt-1" v-if="intent.utterances.length || intent.new">
												<input
													:ref="'UtteranceModel-' + index"
													type="text"
													placeholder="Add a keyword"
													class="border-b outline-none p-3 my-4 w-full"
													@keyup="addKeyword( $event, index )"
												>
												<div class="flex flex-wrap">
													<div
														v-for="(utterance, i) in intent.utterances"
														:key="i"
														class="flex justify-center items-center m-1 font-medium py-3 px-3 bg-white rounded-full text-gray-800 bg-gray-300 font-semibold"
													>
								            <div
															class="text-xs font-normal leading-none max-w-full flex-initial"
														>{{ utterance }}</div>
            								<div class="flex flex-auto flex-row-reverse">
                							<div @click="deleteKeyword( i, index )">
						                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x cursor-pointer hover:text-gray-600 rounded-full w-4 h-4 ml-2">
						                        <line x1="18" y1="6" x2="6" y2="18"></line>
						                        <line x1="6" y1="6" x2="18" y2="18"></line>
						                    </svg>
                							</div>
            								</div>
        									</div>
												</div>
											</div>
											<div v-else class="mt-1">
												Unspecified
											</div>
										</div>
										<div class="w-1/3">
											<label
												:for="'intents_response_for' + index"
												class="text-lg"
											>Follow on Sequence</label>
											<div class="mt-1">
												<select
													:value="extra_intents[ index ]"
													:ref="'selectFollowSequence-' + index"
													:id="'intents_response_for' + index"
													class="w-full border-gray-300 border border-solid rounded bg-white shadow p-1"
													@change="getFollowPreview( $event, index )"
												>
													<option value="" disabled selected>Select a sequence</option>
													<option
														v-for="( message, i ) in optionsFollowSequences"
														:value="message.label"
														:key="i"
													>{{ message.value }}</option>
												</select>
											</div>
										</div>
										<div class="w-1/3">
											<p class="text-lg">Mark Action As Lead</p>
											<div class="flex w-full">
												<label class="flex items-center gap-1 ml-1">
							          	<input
												 		type="radio"
														@change="setLeadcat( $event, index )"
														:checked="!intent.leadcat || intent.leadcat == ''"
														:name="'lead-' + index"
														value=""
													>
														None
							          </label>
												<label class="flex items-center gap-1 ml-1">
													<input
														type="radio"
														@change="setLeadcat( $event, index )"
														:checked="intent.leadcat == 'email'"
														:name="'lead-' + index"
														value="email"
													>
														Email
												</label>
												<label class="flex items-center gap-1 ml-1">
													<input
														type="radio"
														@change="setLeadcat( $event, index )"
														:checked="intent.leadcat == 'number'"
														:name="'lead-' + index"
														value="number"
													>
														Number
												</label>
											</div>
											<div class="flex w-full">
												<label class="flex items-center gap-1 ml-1">
													<input
														type="radio"
														@change="setLeadcat( $event, index )"
														:checked="intent.leadcat == 'name'"
														:name="'lead-' + index"
														value="name"
													>
														Name
												</label>
												<label class="flex items-center gap-1 ml-1">
													<input
														type="radio"
														@change="setLeadcat( $event, index )"
														:checked="intent.leadcat == 'address'"
														:name="'lead-' + index"
														value="address"
													>
														Address
												</label>
											</div>
										</div>
										<div class="flex-shrink">
											<a
												v-if="extra_intents[ index ]"
												href="#"
												title=""
												@click.prevent="selectSequenceByLabel( extra_intents[ index ] )"
												class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
											>
												setup
											</a>
											<span
												v-else
												class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
											>
												setup
											</span>
										</div>
									</div>
									<div class="flex-shrink">
										<button
											class="w-8 h-8 text-2xl rounded-full flex justify-center items-center hover:bg-gray-300 text-gray-600 select-none focus:outline-none focus:border-0"
											@click="removeIntent( index )"
										>
											<svg class="fill-current" enable-background="new 0 0 515.556 515.556" height="14" viewBox="0 0 515.556 515.556" width="14" xmlns="http://www.w3.org/2000/svg"><path d="m64.444 451.111c0 35.526 28.902 64.444 64.444 64.444h257.778c35.542 0 64.444-28.918 64.444-64.444v-322.222h-386.666z"/><path d="m322.222 32.222v-32.222h-128.889v32.222h-161.111v64.444h451.111v-64.444z"/></svg>
										</button>
									</div>
								</div>
								<!---
								<h1 class="font-semibold text-lg text-gray-700 mt-8">NEW</h1>
								<div
									class="mt-4 flex gap-8 items-start py-2 px-3"
								>
									<div
										class="flex mb-4 gap-8 items-start w-full"
									>
										<div class="w-1/3">
											<label
												for="action_keywords_model"
												class="text-lg"
											>Action keywords</label>
											<div class="mt-1">
												<textarea
													id="action_keywords_model"
													class="w-full border-gray-300 border border-solid rounded shadow p-1"
												></textarea>
											</div>
										</div>
										<div class="w-1/3">
											<label
												for="intents_response_for_model"
												class="text-lg"
											>Follow on Sequence</label>
											<div class="mt-1">
												<select
													id="intents_response_for_model"
													class="w-full border-gray-300 border border-solid rounded bg-white shadow p-1"
													@change="getFollowPreview( $event, null, true )"
												>
													<option value="" selected disabled>Select a sequence</option>
													<option value="NEW">NEW SEQUENCE</option>
													<option value="introduction">Welcome to my website</option>
													<option value="reprompt_intro">Technical Support, Find best product for me, Account Enquires</option>
													<option value="sales_help">Please type your email address</option>
													<option value="tech_help">Please email us on techsupport@mycompany.com</option>
													<option value="account_help">Please call us on 0207 123 4567</option>
													<option value="thank_you_closing">Thank you for contacting us today</option>
													<option value="we_will_contact_you">Thank You. We will contact you at {sales_help}</option>
												</select>
											</div>
										</div>
										<div class="w-1/3">
											<p class="text-lg">Mark Action As Lead</p>
											<div class="flex w-full">
												<label class="flex items-center gap-1 ml-1">
							                    	<input type="radio" name="optradio" checked>None
							                    </label>
							                    <label class="flex items-center gap-1 ml-1">
							                    	<input type="radio" name="optradio">Email
							                    </label>
							                    <label class="flex items-center gap-1 ml-1">
							                    	<input type="radio" name="optradio">Number
							                    </label>
											</div>
											<div class="flex w-full">
							                    <label class="flex items-center gap-1 ml-1">
							                    	<input type="radio" name="optradio">Name
							                    </label>
							                    <label class="flex items-center gap-1 ml-1">
							                    	<input type="radio" name="optradio">Address
							                    </label>
											</div>
										</div>
										<div class="flex-shrink">
											<div v-if="!new_sequence">
												<a
													v-if="intent_follow_on_preview"
													href="#"
													title=""
													@click.prevent="selectSequenceByLabel( intent_follow_on_preview )"
													class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
												>
													setup
												</a>
											</div>
											<div v-else>
												<div class="items-center">
													<label
														for="new_sequence_name"
														class="text-lg"
													>New sequence name</label>
													<div class="flex gap-4 items-center">
														<div>
															<input
																v-model="sequence_name_model"
																id="new_sequence_name"
																class="w-full border-gray-300 border border-solid rounded shadow p-1"
															/>
														</div>
														<div>
															<button
																:disabled="!sequence_name_model"
																@click="addSequence"
																type="button"
															 	class="bg-blue-600 text-white font-semibold py-1 px-4 rounded"
															 	:class="{
															 		'opacity-50 cursor-not-allowed': !sequence_name_model,
															 		'hover:bg-blue-700': sequence_name_model
															 	}"
															>Ok</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>-->
							</div>
							<div
								v-else
								class="text-gray-400 font-semibold text-lg py-2 text-center">
									No intents
							</div>
						</div>
						<div class="text-center py-2">
							<button
								@click="addIntent"
		 						class="bg-gray-600 hover:bg-gray-700 text-white py-1 px-2 rounded-full text-sm"
		 					>
								Add Intent
							</button>
						</div>
					</div>
				</div>
				<div class="my-6 text-center">
					<button
						@click="save"
						class="bg-blue-700 hover:bg-blue-800 py-1 px-10 rounded-full text-base font-semibold text-white"
					>
						{{ submitLoading ? 'Saving...' : 'Save' }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import draggable from 'vuedraggable';
	import SpinnerLoading from '@/components/Spinner';
	import SequenceBuilder from '@/components/SequenceBuilder';
	import SequenceBuilderWebhook from '@/components/SequenceBuilderWebhook';

	export default {
		components: {
			draggable,
			SpinnerLoading,
			SequenceBuilder,
			SequenceBuilderWebhook
		},
		data: () => ({
			title: 'Chatbot Builder',
			error: false,
			loading: true,
			extra_intents: {},
			sequence_name_model: '',
			new_sequence: false,
			intent_follow_on_preview: null,
			submitLoading: false,
		}),
		computed:{
			sequenceAction(){
				return this.$store.state.sequence.sequence.action;
			},
			sequenceDescription: {
				get(){
					return this.$store.state.sequence.sequence.description;
				},
				set( v ){
					this.$store.commit('sequence/setDescription', v)
					this.$store.commit('sequence/setLabel', v.toLowerCase().split(' ').join('_') )
				}
			},
			sequenceMessaging: {
				get(){
					return this.$store.state.sequence.sequence.messaging;
				},
				set( v ){
					this.$store.commit('sequence/updateMessages', v)
				}
			},
			sequences(){
				return this.$store.state.sequence.sequences;
			},
			optionsFollowSequences(){
				const options = [];

				this.sequences.forEach((sequence, i) => {
					options.push({
						label: sequence.label,
						value: sequence.description
					})
				});

				return options;
			}
		},
		mounted(){
			this.loadSequences();
		},
		methods: {
			save(){
				this.submitLoading = true;

				const sequences = [ ...this.$store.state.sequence.sequences ];
				const sequence = { ...this.$store.state.sequence.sequence };
				const index_selected = this.$store.state.sequence.index_selected;

				let data = [
					...sequences,
				];

				data[ index_selected ] = sequence;
				this.extra_intents = {};
				this.$axios.put(`${this.baseAPI}/menus/${this.$route.params.id}`, data)
				.then(res => {
					this.loadSequences( index_selected );
					this.$toast.show("Saved.", {
						position: "top-right",
						type: 'success',
						duration: 2500
					});
				})
				.catch(res => {
					console.dir( res )
					this.$toast.show("Could't be saved.", {
						position: "bottom-right",
						duration: 2500
					});
				})
				.then(() => {
					this.submitLoading = false;
				})
			},
			loadSequences( index_selected = 0 ){
				this.loading = true;
				this.error = false;

				this.$store.commit('sequence/setSequences', []);
				this.$store.commit('sequence/setSequence', {});
				this.extra_intents = {};
				this.sequence_name_model = '';
				this.new_sequence = false;
				this.intent_follow_on_preview = null;
				this.submitLoading = false;

				Promise.all([
					this.$axios.get(`${this.baseAPI}/bots/${this.$route.params.id}`),
					this.$axios.get(`${this.baseAPI}/menus/${this.$route.params.id}`)
				])
				.then(res => {
					console.log( res );
					this.title = res[0].data.name;

					this.$store.commit('sequence/setSequences', res[1].data);

					this.$store.commit('sequence/setSequence', res[1].data[ index_selected ]);

					res[1].data[0].intents && res[1].data[0].intents.map((intent, i) => {
						this.getFollowPreview(intent.destination_label, i);
					})

					this.loading = false;

				})
				.catch(res => {
					console.log( res )
					this.error = true;
				})
			},
			getFollowSequence( message ){
				if( message ){
					if( message.hasOwnProperty('media') ){
						return {
							type: 'media',
							value: message.media
						}
					}
					else if( message.hasOwnProperty('dialog') ){
						return {
							type: 'dialog',
							value: message.dialog
						}
					}
					else if( message.hasOwnProperty('choices') ){
						const choices = message.choices.map(choice => {
							return choice.title
						});

						return {
							type: 'choices',
							value: choices.join(', ')
						}
					}

				}
			},
			addKeyword( e, index ){
				const utterances = [
					...this.$store.state.sequence.sequence.intents[ index ].utterances,
				]

				if ( e.keyCode === 13 || e.keyCode == 188 ) {
					if( e.keyCode === 188 ){
						utterances.push( e.target.value.slice(0, -1) );
					}
					else {
						utterances.push( e.target.value );
					}

					if( e.target.value != "" || e.target.value != "," ){
						this.$store.commit("sequence/updateUtterances", {
							index,
							utterances
						});
						this.$refs['UtteranceModel-' + index][0].value = "";
					}
      			}
			},
			deleteKeyword( index, indexIntent ){
				const utterances = [
					...this.$store.state.sequence.sequence.intents[ indexIntent ].utterances
				]
				utterances.splice( index, 1 );
				this.$store.commit("sequence/updateUtterances", {
					index: indexIntent,
					utterances
				});
			},
			setIntentUtterancesValue(e, index){

				const utterances = e.target.value.split(', ');

				this.$store.commit('sequence/updateUtterances', {
					index: index,
					utterances
				})
			},
			setLeadcat( e, index ){
				let intent = this.$store.state.sequence.sequence.intents[ index ];
				intent = {
					...intent,
					leadcat: e.target.value
				}
				this.$store.commit('sequence/updateIntent', {
					index: index,
					intent
				})
			},
			addIntent(){
				let intentsStore = this.$store.state.sequence.sequence.intents;
				const intents = [
					...intentsStore,
					...[{
						destination_label: "",
						matchmode: "",
						name: "",
						utterances: [],
						new: true
					}]
				];

				this.$store.commit("sequence/updateIntents", intents);
			},
			selectSequence( index ){
				this.extra_intents = {};
				this.$store.commit('sequence/selectSequence', index);
				if( this.$refs['selectFollowSequence-' + index] ){
					this.$refs['selectFollowSequence-' + index].value = "";
				}
				const intents = this.$store.state.sequence.sequence.intents;
				intents && intents.map((intent, i) => {
					this.getFollowPreview(intent.destination_label, i);
				})

				this.$toast.show("Sequence selection changed.", {
					position: "top-right",
					type: 'success',
					duration: 2500
				});

				window.scrollTo(0,0);
			},
			selectSequenceByLabel( label ){
				this.extra_intents = {};
				const index = this.sequences.findIndex( sequence => {
					return sequence.label == label;
				});

				if( index >= 0 ){
					this.$store.commit('sequence/selectSequence', index);
					if( this.$refs['selectFollowSequence-' + index] ){
						this.$refs['selectFollowSequence-' + index].value = ""
					}
					const intents = this.$store.state.sequence.sequence.intents;

					intents && intents.map((intent, i) => {
						this.getFollowPreview(intent.destination_label, i);
					})

					this.$toast.show("Sequence selection changed.", {
						position: "top-right",
						type: 'success',
						duration: 2500
					});

					window.scrollTo(0,0);
				}
			},
			removeIntent( index ){
				const intents = [
					...this.$store.state.sequence.sequence.intents
				]
				intents.splice(index, 1);
				this.$store.commit('sequence/updateIntents', intents)
			},
			getFollowPreview( e, index, isModel = false ){
				if( isModel ){
					this.new_sequence = false;
					if( e.target.value == "NEW" ){
						this.intent_follow_on_preview = null;
						this.new_sequence = true;
					}
					else {
						this.intent_follow_on_preview = e.target.value
					}
				}
				else {
					const value = typeof e == 'string' ? e : e.target.value;

					if( this.$store.state.sequence.sequence.intents && this.$store.state.sequence.sequence.intents[ index ] ){
							let intent = this.$store.state.sequence.sequence.intents[ index ];

							intent = {
								...intent,
								destination_label: value
							}

							this.$store.commit('sequence/updateIntent', {
								index: index,
								intent
							})


							this.extra_intents = {
								...this.extra_intents,
								[ index ]: value
							}
					}
				}
			},
			async addSequence(){
					window.scrollTo(0,0);
					this.$swal({
					  title: 'Enter a description',
					  input: 'text',
  					inputPlaceholder: 'Enter here',
					  customClass: {
							title: "swalp-title",
					  	input: "swalp-input",
							confirmButton: 'swalp-btn swalp-btn-confirm',
						  denyButton: 'swalp-btn swalp-btn-deny',
						  cancelButton: 'swalp-btn swalp-btn-cancel',
					  },
					  showCancelButton: true,
					  confirmButtonText: 'Next',
					  showLoaderOnConfirm: true
					}).then((result) => {
					  if (result.isConfirmed) {
							const description = result.value
							this.$swal({
								title: 'Select a type',
							  showCancelButton: true,
								showDenyButton: true,
							  confirmButtonText: 'Message',
								denyButtonText: "Webhook",
								customClass: {
									title: "swalp-title",
							  	input: "swalp-input",
									confirmButton: 'swalp-btn swalp-btn-confirm',
								  denyButton: 'swalp-btn swalp-btn-deny',
								  cancelButton: 'swalp-btn swalp-btn-cancel',
							  },
							})
							.then((result) => {
								if (result.isConfirmed) {
									this.createSequence( description, "SAY")
							  } else if (result.isDenied) {
							    this.createSequence( description, "WEBHOOK")
							  }
							})
					  }
					})
			},
			createSequence( description, action = "SAY"){
				const sequences = this.$store.state.sequence.sequences;
				const index_selected = this.$store.state.sequence.index_selected;

				const label = "new_" + ( description.toLowerCase() ).split(" ").join("_");

				let newSequence = {
					menu: "0",
					label,
					description,
					action,
					messaging: [],
					intents: []
				};

				if( action == "WEBHOOK" ){
					newSequence = {
						menu: "0",
						label,
						description,
						action,
						webhook: {
							webhook_url: "",
							onsuccess: "",
							onerror: ""
						},
						messaging: [],
						intents: []
					};
				}

				const sequences_data = [
					...sequences,
					...[ newSequence ]
				];

				this.$axios.put(`${this.baseAPI}/menus/${this.$route.params.id}`, sequences_data)
				.then(res => {
					this.loadSequences( index_selected );
					this.$toast.show("Sequence added.", {
						position: "top-right",
						type: 'success',
						duration: 2500
					});
				})
				.catch(res => {
					console.dir( res )
					this.$toast.show("Could't be added.", {
						position: "bottom-right",
						duration: 2500
					});
				});
			},
			deleteSequence(){
				this.$swal({
					title: 'Are you sure?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!',
					customClass: {
						title: "swalp-title",
						input: "swalp-input",
						confirmButton: 'swalp-btn swalp-btn-confirm',
						denyButton: 'swalp-btn swalp-btn-deny',
						cancelButton: 'swalp-btn swalp-btn-cancel',
					},
				}).then((result) => {
					if (result.isConfirmed) {
						const sequences = this.$store.state.sequence.sequences;
						const index_selected = this.$store.state.sequence.index_selected;

						const sequences_data = [
							...sequences,
						];

						sequences_data.splice( index_selected, 1 );

						this.$axios.put(`${this.baseAPI}/menus/${this.$route.params.id}`, sequences_data)
						.then(res => {
							//this.loadSequences( index_selected );
							this.$store.commit('sequence/setSequences', sequences_data);
							this.selectSequence( 0 );
							this.$toast.show("Sequence deleted.", {
								position: "top-right",
								type: 'success',
								duration: 2500
							});
						})
						.catch(res => {
							console.dir( res )
							this.$toast.show("Could't be deleted.", {
								position: "bottom-right",
								duration: 2500
							});
						});
				  }
				})
			}
		}
	}
</script>

<style lang="postcss" media="screen">
		.swalp-title {
			@apply text-xl !important;
		}

		.swalp-input {
			@apply rounded bg-white p-2 outline-none text-base m-0 border border-solid border-gray-400 shadow-none !important;
		}

		.swalp-btn {
			@apply font-semibold py-2 px-4 rounded !important;
		}

		.swalp-btn-confirm {
			@apply bg-blue-700 !important;
		}

		.swalp-btn-confirm:hover {
			@apply bg-blue-800 !important;
		}

		.swalp-btn-cancel {
			@apply bg-gray-600 !important;
		}

		.swalp-btn-deny {
			@apply bg-yellow-600 !important;
		}

		.swalp-btn-deny:hover {
			@apply bg-yellow-700 !important;
		}

</style>
