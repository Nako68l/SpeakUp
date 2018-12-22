export const accountValidationMessages = {
    'nickname': [
        { type: 'required', message: 'Nickname is <strong>required</strong>' },
        { type: 'nicknameIsTaken', message: 'Nickname is taken' },
        { type: 'maxlength', message: 'Nickname cannot be more than 25 characters long' },
        { type: 'pattern', message: 'Nickname can only use letters, numbers, underscores or periods' },
    ],
};
