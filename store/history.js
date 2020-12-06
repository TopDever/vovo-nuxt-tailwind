export const state = () => ({
	list: []
})

export const mutations = {
 	set(state, payload) {
    	state.list = payload;
  	}
}