export const state = () => ({
	sequence: {},
	sequences: [],
	index_selected: 0
})

export const mutations = {
	selectSequence(state, payload){
		state.index_selected = payload;
		let sequence = {
			...state.sequences[ payload ]
		};

		const messaging = [];
		sequence.messaging.reverse().forEach( item => {
			if( item.hasOwnProperty('choices') ){
				messaging.push( item );
			}
			else {
				messaging.unshift( item );
			}
		});

		sequence = {
			...sequence,
			messaging
		};

		state.sequence = sequence;
	},
	setSequences( state, payload ){
		state.sequences = payload;
	},
	setSequence( state, payload ){
		if( payload.hasOwnProperty('messaging') ) {
			const messaging = [];
			payload.messaging.reverse().forEach( item => {
				if( item.hasOwnProperty('choices') ){
					messaging.push( item );
				}
				else {
					messaging.unshift( item );
				}
			});

			payload = {
				...payload,
				messaging
			};
		}

		state.sequence = payload;
	},
	setLabel( state, payload ){
		state.sequence.label = payload;
	},
	setDescription( state, payload ){
		state.sequence.description = payload;
	},
	updateUtterances(state, payload){
		const description = state.sequence.description;
		state.sequence.intents[ payload.index ].utterances = payload.utterances;
		state.sequence.description = '';
		state.sequence.description = description;
	},
	updateMessages(state, payload){
		const description = state.sequence.description;

		const messaging = [];
		payload.reverse().forEach( item => {
			if( item.hasOwnProperty('choices') ){
				messaging.push( item );
			}
			else {
				messaging.unshift( item );
			}
		});

		state.sequence.messaging = messaging;
		state.sequence.description = '';
		state.sequence.description = description;
	},
	updateMessage(state, payload){
		state.sequence.messaging[ payload.index ] = payload.message;
		const messaging = state.sequence.messaging;
		state.sequence.messaging = '';
		state.sequence.messaging = messaging;
	},
	updateIntents(state, payload){
		const description = state.sequence.description;
		state.sequence.intents = payload;
		state.sequence.description = '';
		state.sequence.description = description;
	},
	updateIntent(state, payload){
		const description = state.sequence.description;
		state.sequence.intents[ payload.index ] = payload.intent;
		state.sequence.description = '';
		state.sequence.description = description;
	},
	updateWebhook(state, payload){
		state.sequence.webhook[ payload.key ] = payload.value;
	}
}
