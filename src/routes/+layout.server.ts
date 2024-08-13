import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const email = cookies.get('email');
	if (email) return { user: { name: email.split('@')[0] } };
	return {};
};
