const query = require('../src/query.js')

// fake grow.config.js
const mockConfig = {
  name: {
    type: 'input',
    message: '给项目起个名字',
    default: 'An app name'
  },
  description: {
    type: 'input',
    message: '简单描述一下这个项目',
    default: 'A Vue app description'
  },
  vuex: {
    type: 'confirm',
    message: '需要使用Vuex数据流管理吗？'
  }
}

query(mockConfig).then(answer => {
  console.log(answer)
})