module.exports = {
	HOST: 'localhost',
	USER: 'HudsonDb',
	PASSWORD: 'hudson22kj',
	DB: 'Users',
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
