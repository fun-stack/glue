
var enableMode = false;

module.exports = {
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
