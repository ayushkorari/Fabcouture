
export const POPUP_MESSAGES = {
    ok: 'Ok',
    close: 'Close',
    confrim: 'Confirmation',
    signUpSuccess: 'You have registered successfully',
    loginSuccess: 'You have loggedIn successfully',
    signUpVerificationLink: 'User registered successfully , a link has been sent to email id . Please follow the email to verify account .',
    passwordResetTitle: 'Reset Password',
    passwordResetLink: 'Password reset link has been sent to registered email id . Please follow the link to reset password .',
    profileEdited: 'Profile has been Edited successfully.',
    passwordChanged: 'Password has been changed successfully.',
    passwordChangedTitle: 'Change Password',
    invalidResetPasswordLink: 'Reset password link is expired',
    logout: 'Logout',
    logoutConfirmation: 'Do you wish to logout?',
    productAddedToCart:"Product added to cart successfully",
    productAddedToWishlist:"Product added to wishlist successfully",
    orderPlaced:"Your order has been placed successfully",
    addressAdded:"Address has been added successfully",
    addressUpdated:"Address has been updated successfully",
    addressRemoved:"Address has been removed successfully"
};
export const COMMON_MESSAGES = {
    ADDED: (type) => toTitleCase(type) + " added successfully",
    UPDATED: (type) => toTitleCase(type) + " updated successfully",
    BLOCKED: {
        confirm: (type) => `Do you want to block this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been blocked successfully`
    },
    ACTIVE: {
        confirm: (type) => `Do you want to unblock this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been unblocked successfully`
    },
    DELETED: {
        confirm: (type) => `Do you want to delete this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been deleted successfully`
    }
};
export const SOMETHING_WENT_WRONG = 'Something went wrong , Please try again later.';

export const toTitleCase = (str) => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}