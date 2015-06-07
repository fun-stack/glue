
var enableMode = false;

export default {
  isEnable () {
    return enableMode === true;
  },
  isDisable() {
    return enableMode === false;
  },
  enable () {
    enableMode = true;
  },
  disable () {
    enableMode = false;
  }
};
