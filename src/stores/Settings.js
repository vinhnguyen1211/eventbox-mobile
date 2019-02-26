import { observable, action, computed } from 'mobx'

export default class Settings {
  @observable counter = 0

  @action increaseCounter() {
    this.counter += 1
  }

  @computed get counterTen() {
    return this.counter * 10
  }
}
