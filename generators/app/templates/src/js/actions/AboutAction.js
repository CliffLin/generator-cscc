var alt = require('../alt.js');
import WebAPIUtil from "../utils/WebAPIUtil.js"

class AboutAction {
  getInfo() {
    // do get info
    this.dispatch();
    WebAPIUtil
        .getRemoteInfo()
        .then((res) => {
            this.actions.getInfoSuccess(res.body);
        })
        .catch((e) => {
            console.log("error", e);
            this.actions.getInfoFail(e);
        });
  }

  getInfoSuccess (data){
    this.dispatch(data);
  }

  getInfoFail (errMessage){
    this.dispatch(errMessage);
  }

}

module.exports = alt.createActions(AboutAction);
