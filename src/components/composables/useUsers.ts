import { ref, watch } from 'vue';

export interface User {
	name: string;
	pass: string;
	email: string;
	favTech?: string;
	aiTools?: string;
}

export function useUsers() {
	const users = ref<User[]>([]);

	const saved = localStorage.getItem('users');
	if (saved) {
		users.value = JSON.parse(saved);
	}

	watch(
		users,
		(newVal) => {
			localStorage.setItem('users', JSON.stringify(newVal));
		},
		{ deep: true },
	);

	const addUser = (user: User) => {
		users.value.push(user);
	};

	const deleteUser = (index: number) => {
		users.value.splice(index, 1);
	};

	const updateUser = (index: number, updatedUser: User) => {
		users.value[index] = updatedUser;
	};

	return { users, addUser, deleteUser, updateUser };
}
