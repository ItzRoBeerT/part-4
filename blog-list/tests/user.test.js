const { test, describe } = require('node:test');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const assert = require('node:assert');

describe('Create invalid users', () => {
	test('creation fails with short password', async () => {
		const newUser = {
			username: 'testuser',
			name: 'Test User',
			password: '12',
		};

		const response = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/);

		assert.strictEqual(response.status, 400);
		assert.strictEqual(response.body.error, 'password must be at least 3 characters long');
	});
});
