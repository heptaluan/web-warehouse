const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

// const run = async () => {

// }

// run()

const login = async () => {
  await nightmare.goto('https://cnodejs.org/signin')
  await nightmare.wait('#signin_form')
  await nightmare.click('.span-info')
  const result = await Promise.race([
    nightmare.wait('#login_field').then(() => 'github'),
    nightmare.wait('.create_topic_btn').then(() => 'cnodejs')
  ])
  console.log(result)
  if (result === 'cnodejs') {
    return
  }
  await nightmare.type('#login_field', 'vd2o@foxmail.com')
  await nightmare.type('#password', 'lizmxlibo6')
  await nightmare.click('input[name="commit"]')
}

login()