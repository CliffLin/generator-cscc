var alt = require('../alt');
var AboutAction = require('../actions/AboutAction.js');
class AboutStore {
  constructor() {
    this.allInfo = [];

    this.bindListeners({
      handleGetInfo: AboutAction.GET_INFO,
      handleGetInfoSuccess: AboutAction.GET_INFO_SUCCESS,
      handleGetInfoFail: AboutAction.GET_INFO_FAIL
    });
  }

  handleGetInfo(){
    console.log("handleGetInfo");
  }

  handleGetInfoSuccess(info) {
    console.log('Store info', info);
    this.allInfo = info;
  }

  handleGetInfoFail(error){
    console.log("錯誤!!", error);
  }

}

module.exports = alt.createStore(AboutStore, 'AboutStore');
