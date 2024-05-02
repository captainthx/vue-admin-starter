const messages = {
  code: 'zh-CN' as string,
  locale: 'zh-CN',
  language: '中文',
  menu: {
    home: '首页',
    about: '关于',
    login: '登录',
    logout: '登出',
    managers: {
      title: '管理',
      signHistory: '登录历史'
    }
  },
  labels: {
    login: '登录',
    username: '用户名',
    password: '密码',
    uid: '用户ID',
    time: '时间',
    userAgent: '用户代理',
    total: '共{total}条记录'
  },
  actions: {
    submit: '提交',
    search: '搜索'
  },
  invalid: {
    between: '必须在{min}和{max}个字符之间',
    required: '请输入有效信息'
  },
  error: {
    code: '错误: {code}'
  },
  responseCode: {
    0: '成功',
    4010: '用户名或密码错误'
  }
};

export default messages;
