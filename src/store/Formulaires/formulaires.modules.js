import states from './formulaires.state'
import actions from './formulaires.actions'
import mutations from './formulaires.mutations'

const formulairesStore = {
    namespaced: true,
    states,
    actions,
    mutations
}

export default formulairesStore