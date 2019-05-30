export default {
  token: state => state.user.token,
  userAgent: state => state.user.userAgent,
  userInfo: state => state.user.userInfo,

  queryList: state => state.filter.queryList,

  isShowHead: state => state.app.isShowHead,
  headShadow: state => state.app.headShadow,
  globalLoading: state => state.app.globalLoading,
  loadingMessage: state => state.app.loadingMessage,
  globalModal: state => state.app.globalModal,
  globalToast: status => status.app.globalToast,
  toastMessage: status => status.app.toastMessage,

  include: state => state.keepAlive.include,
};
