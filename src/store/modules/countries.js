const countries = {
  firestorePath: 'countries',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'countries',
  statePropName: 'data',
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/countries')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {},
  mutations: {},
  actions: {},
}

export default countries