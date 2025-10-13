import type { User } from './useUsers';

export function useValidation() {
	function validateUser(user: User, favTech: string, selectedAI: string): string | null {
		const rules = [
			{ condition: !user.name, message: 'Name is required' },
			{
				condition: user.name.length > 0 && user.name.length < 2,
				message: 'Name must be at least 2 characters',
			},
			{
				condition: user.name.length > 0 && !/^[A-Za-zА-Яа-яЁё\s-]+$/.test(user.name),
				message: 'Name can contain only letters, spaces, or hyphens',
			},
			{ condition: !user.pass, message: 'Password is required' },
			{
				condition: user.pass.length > 0 && !/^\d{5,8}$/.test(user.pass),
				message: 'Password must be 5–8 digits',
			},
			{ condition: !user.email, message: 'Email is required' },
			{
				condition: user.email.length > 0 && !/\S+@\S+\.\S+/.test(user.email),
				message: 'Email format is invalid',
			},
			{ condition: !favTech, message: 'Please select your favorite technology' },
			{ condition: !selectedAI, message: 'Please select an AI tool' },
		];

		for (const rule of rules) {
			if (rule.condition) {
				return rule.message;
			}
		}
		return null;
	}

	return { validateUser };
}
