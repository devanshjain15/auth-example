import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const parentData = await parent();

	if (parentData.user) throw redirect(300, '/');
};

export const actions: Actions = {
	login: async ({ request, cookies, url }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (!email || !password) {
			const onErrorField = !email ? 'Email' : !password ? 'Password' : undefined;

			return fail(422, {
				onErrorField: onErrorField?.toLowerCase(),
				errorMessage: `${onErrorField} is required!`
			});
		}

		cookies.set('email', String(email), {
			path: '/'
		});

		const redirectToQueryResult = url.searchParams.get('redirectTo');
		const redirectTo =
			redirectToQueryResult === 'null' || !redirectToQueryResult ? '/' : redirectToQueryResult;
		return redirect(300, redirectTo);
	},
	logout: async ({ cookies, url }) => {
		cookies.delete('email', {
			path: '/'
		});
		const redirectToQueryResult = url.searchParams.get('redirectTo');
		const redirectTo =
			redirectToQueryResult === 'null' || !redirectToQueryResult ? '/' : redirectToQueryResult;
		return redirect(300, redirectTo);
	}
};
