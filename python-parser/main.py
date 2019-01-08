import config
import vk_api
import MySQLdb

print('connect vk API')
vk_session = vk_api.VkApi(config.vk['uname'], config.vk['upass'])
vk_session.auth()
vk = vk_session.get_api()

print('connect to db')
db = MySQLdb.connect(user=config.mysql['uname'],passwd=config.mysql['upass'],db=config.mysql['db_name'],use_unicode=True, charset="utf8")
q = db.cursor()

print('get vk userlist')
vk_userlist = vk.groups.getMembers(group_id = config.vk['group-id'])
offset = 0
while offset < vk_userlist['count']:
	vk_userlist = vk.groups.getMembers(
		group_id = config.vk['group-id'],
		fields = 'sex, bdate, city, country, photo_max, domain',
		offset = offset)
	insert_userlist = [
		(user['id'],user['first_name'],user['last_name'],user['sex'],user['domain'],user['photo_max']) 
		for user in vk_userlist['items']
	]
	q.executemany(
		"""INSERT INTO vk_users (user_vk_id, users_first_name, user_last_name, user_sex, user_domain, user_photo_max)
		VALUES (%s, %s, %s, %s, %s, %s)""",
		insert_userlist)
	db.commit()
	offset = offset + 1000