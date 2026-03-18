import {z} from 'zod';

export const passwordSchema = z.string().min(4 , 'Пароль должен содержать больше 4 символов');

export const LoginSchema = z.object({
	email: z.email('Введите корректный Email.'),
	password: passwordSchema,
})
export const RegisterSchema = LoginSchema.extend({
	fullName: z.string().min(2, { message: 'Введите полное имя' }),
	confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
	message: 'Пароли не совпадают',
	path: ['confirmPassword'],
})
export const OrderSchema = z.object({
	name: z.string().min(3, 'Введите имя'),
	surname: z.string().min(3,'Введите фамилию'),
	email: z.email('Введите корректный Email.'),
	telephone: z.string().min(11,'Слишком короткий номер телефона').max(12, 'Слишком длинный номер телефона'),
	delivery: z.string().min(5, 'Проверьте правильность введенного адреса'),
});
