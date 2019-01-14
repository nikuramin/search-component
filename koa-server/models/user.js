const db = require('../middleware/db')

//TODO переписать запросы на билдер 

const crud = {
    getAll: async (offset) => {
        offset = offset | 0;
        return await db.query("SELECT * FROM vk_users LIMIT ?, ?", [Number(offset), 10]);
    },
    get: async (id) => {
        let res = await db.query("SELECT * FROM vk_users WHERE user_id = ?", [Number(id)]);
        return res.length > 0 ? res : { error: `user with id ${id} not found` };
    },
    searchByName: async (searchStr, offset) => {
        offset = offset | 0;
        let queryStr = "SELECT * FROM vk_users WHERE users_first_name LIKE ? LIMIT ?, 10"
        let res = await db.query(queryStr, [`%${String(searchStr)}%`, Number(offset)]);
        return res.length > 0 ? res : { error: `users like ${searchStr} not found` };
    }
}

module.exports = crud