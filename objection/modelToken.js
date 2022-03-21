const { Model } = require('objection');

class tokens extends Model {

    static get tableName() {
        return 'tokens';
    }

    static get idColumn() {
        return 'uid';
    }


    static get jsonSchema() {
        return {
            type: 'object',
            required: ['uid', 'user_id','is_revoke'],
            properties: {
                uid: {type: 'string', maxLength: 255},
                user_id: {type: 'string', maxLength: 255},
                is_revoke: {type: 'boolean'}
            }
        };
    }
}

module.exports = tokens;