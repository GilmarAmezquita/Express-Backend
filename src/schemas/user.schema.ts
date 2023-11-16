import {object, string} from 'zod';

export const userSchema = object ({
    name: string({required_error: "Name is required"}),
    email: string({required_error: "Email is required"})
            .email("Not a valid email address"),
    password: string({required_error: "Password is required"})
            .min(8, "Password  must be at least 8 characteres long")
});

export const updateSchema = object ({
        name: string({required_error: "Name is required"}),
        email: string({required_error: "Email is required"})
                .email("Not a valid email address")
        });

export const passwordSchema = object ({
        oldPassword: string({required_error: "Old password is required"}),
        newPassword: string({required_error: "Password is required"})
                .min(8, "New password  must be at least 8 characteres long")
        });
