'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from '../actions';
import { useQueryClient } from '@tanstack/react-query';
import { authQueryKeys } from '../queries';

export function LoginForm() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [state, formAction, isPending] = useActionState(loginAction, {
        success: false
    });
    if (state.success) {
        queryClient.invalidateQueries({ queryKey: authQueryKeys.session });

        setTimeout(() => {
            router.push('/');
        }, 1500);

        return (
            <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-green-800">წარმატებით შეხვედით!</h3>
                <p className="text-green-600">გადამისამართება მთავარ გვერდზე...</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <form action={formAction} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        ელ. ფოსტა
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={isPending}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        placeholder="your@email.com"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        პაროლი
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        disabled={isPending}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    />
                </div>

                {state.error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <div className="text-red-800 text-sm">
                            <strong>შეცდომა:</strong> {state.error}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isPending ? (
                        <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            შესვლა...
                        </div>
                    ) : (
                        'შესვლა'
                    )}
                </button>
            </form>

            {/* Test credentials helper */}
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                <p className="text-xs text-gray-600 mb-2">
                    <strong>ტესტირების კრედენციალები:</strong>
                </p>
                <button
                    type="button"
                    onClick={() => {
                        const emailInput = document.getElementById('email') as HTMLInputElement;
                        const passwordInput = document.getElementById('password') as HTMLInputElement;
                        if (emailInput && passwordInput) {
                            emailInput.value = 'nikagermanishvili8@gmail.com';
                            passwordInput.value = '1120071';
                        }
                    }}
                    disabled={isPending}
                    className="text-xs text-blue-600 hover:text-blue-800 underline disabled:opacity-50"
                >
                    ავტომატური შევსება
                </button>
            </div>
        </div>
    );
}