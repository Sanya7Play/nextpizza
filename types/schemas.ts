import {z} from 'zod';

export const passwordSchema = z.string().min(4 , 'Пароль должен содержать больше 4 символов');

export const LoginSchema = z.object({
	email: z.email('Введите корректный Email.'),
	password: passwordSchema,
})
export const RegisterSchema = LoginSchema.extend({
	fullName: z.string().min(3, { message: 'Введите имя и фамилию' }),
	confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
	message: 'Пароли не совпадают',
	path: ['confirmPassword'],
});
