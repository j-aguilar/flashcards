import PouchDB from 'pouchdb'
//import data from './data/data.js'

export default class DB {
  constructor (name) {
    this.pdb = new PouchDB(name);

    this.create = {
      async card(obj) { return await this.db.pdb.put(
        {
          ...obj,
          _id: obj.category.replace('category_', 'card_').concat(`@${new Date().getTime()}`),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      )},
      async category(name) { return await this.db.put(
        {
          _id: 'category_' + name.replace(/\s/g, '_'),
          name: name,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      )}
    } /* create */

    this.read = {
      async categories() {
        this.setState({
          categories: (await this.db.pdb.allDocs({ startkey: 'category_', endkey: 'category_\uffff', include_docs: true })).rows
        })
      },
      async cards(category) {
        let identifier = category.replace('category_', 'card_')
        this.setState({
          cards: (await this.db.pdb.allDocs({ startkey: `${identifier}`, endkey: `${identifier}\uffff`, include_docs: true })).rows
        })
      },
      async card(id) {
        return await this.db.pdb.get(id)
      }
    } /* read */

    this.update = {
      async card (card) {
        await this.db.pdb.put({
          ...card,
          updatedAt: new Date()
        })
        return this.db.read.cards(card.category)
      },
      async category (category) {
        await this.db.pdb.put({
          ...category,
          updatedAt: new Date()
        })
        return this.db.read.categories()
      }
    } /* update */

    this.delete = {
      async card (card) {
        await this.db.pdb.put({
          ...card,
          updatedAt: new Date(),
          _deleted: true
        })
        return this.db.read.cards(card.category)
      },
      async category (category) {
        await this.db.pdb.put({
          ...category,
          updatedAt: new Date(),
          _deleted: true
        })
        return this.db.read.categories()
      }
    }

  } /* constructor */
}
