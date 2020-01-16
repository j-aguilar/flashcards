import PouchDB from 'pouchdb'
import data from './data/data.js'

export default class DB {
  constructor (name) {
    this.db = new PouchDB(name);
  }

  async getAllCategories() {
    let allCategories = await this.db.allDocs({ startkey: 'category_', endkey: 'category_\uffff', include_docs: true });
    console.log(allCategories)
    return allCategories;
  }

  async getCardsFromCategory(categoryName) {
    let category = categoryName.replace('category_', '')
    let cards = await this.db.allDocs({ startkey: `card_${category}`, endkey: `card_${category}\uffff`, include_docs: true })
    console.log(cards)
  }

  async createCategory(name) {
    let id = 'category_' + name.replace(/\s/g, '_')
    let category = {
      _id: id,
      name: name,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const res = await this.db.post(category)
    return res
  }

}
