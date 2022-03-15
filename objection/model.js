const { Model } = require('objection');

class developers extends Model {

    static get tableName() {
        return 'developers';
    }

    static get idColumn() {
        return 'uid';
    }


    static get jsonSchema() {
        return {
            type: 'object',
            required: ['uid', 'userName', 'passWord', 'age', 'createdAt', 'updatedAt'],

            properties: {
                uid: { type: 'string', maxLength: 255 },
                userName: { type: 'string', minLength: 8, maxLength: 255 },
                passWord: { type: 'string'},
                age: { type: 'number', minLength: 1},
                createdAt: { type: 'datetime', default: new Date()},
                updatedAt: { type: 'datetime', default: new Date()}
            }
        };
    }
}

module.exports = developers;