import * as types from './types';

export function setUserInfo(userId, email) {
	return {
		type: types.SET_USER_INFO,
		userId,
		email,
	}
}