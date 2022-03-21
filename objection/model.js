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
            required: ['uid', 'username','pass'],
            properties: {
                uid: {type: 'string', maxLength: 255},
                username: {type: 'string', minLength: 8, maxLength: 255},
                pass: {type: 'string', maxLength: 255},
                createdAt: {type: 'number'},
                updatedAt: {type: 'number'},
            }
        };
    }
}

module.exports = developers;