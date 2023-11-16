import {object, string} from 'zod';

export  const groupSchema = object ({
    name: string({required_error: "Name is required"})
});