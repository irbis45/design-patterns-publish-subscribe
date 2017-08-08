const EventBus = {
  channels: {},
  subscribe (channelName, listener) {
    if (!this.channels[channelName]) {
      this.channels[channelName] = []
    }
    this.channels[channelName].push(listener)

  },
  publish (channelName, data) {
    const channel = this.channels[channelName]
    if (!channel || !channel.length) {
      return
    }
    channel.forEach(listener => listener(data))
  }
}

class Mailer {
  constructor () {
    EventBus.subscribe('order/new', this.sendPurchaseEmail)
  }
  sendPurchaseEmail (params) {
    console.log(`Email was send to ${params.userEmail}`)
  }
}

class Order {
  constructor (params) {
    this.params = params
  }

  save () {
    console.log('Order save')
    EventBus.publish('order/new', {
      userEmail: this.params.userEmail
    })
  }
}

const mailer = new Mailer()
const order = new Order({userEmail: 'john@gmail.com'})
order.save()

EventBus.subscribe('foo', (message) => console.log('foo was fired'))
EventBus.publish('foo', 'Hello world')
