export default {
    
    home : '/',
    login : '/login',
    about : '/about-us',
    pr1 : '/password-recovery/verify',
    pr2 :  '/password-recovery/verify/code',
    pr3 : '/password-recovery/new-password',
    account : '/account',
    editAccount : '/account/edit',
    passwordChange : '/password/change',
    hostEvents : '/host-events',
    hostEventsForm : ':id',
    hostEventsPay : '/host-events/:id/pay',
    hostEventSendInvite : '/host-events/:id/:eventId/invite',
    signup : '/signup',
    events : 'events',
    inviteesList : '/invitees',
    createInviteeList : '/invitees/create',
    editInviteeList : '/invitees/:id/edit',
    savedCards : '/cards',
    categoriesList : '/categories',
    categoryDetail : '/categories/:id',
    subCategories : '/categories/:id',
    myEvents : '/my-events',
    eventDetail : '/events/:id',
    editEvent : '/events/:id/edit',
    subscriptions : '/subscription-plan',
    subscriptionPayment : '/subscription-plan/:plan',
    mySubscriptions : '/my-subscriptions',
    uploadStories : '/upload-stories',
    // stories : '/stories',
    myStories : '/my-stories',
    stories : {
        index : '/stories',
        category : ':category',
        listing : ':category/:type',
        detail : ':category/:type/:id',
    },
    shop : {
        index : '/shop',
        products : ':category/products',
        productDetail : ':category/products/:id',
    },
    cart : '/cart',
    checkout : '/checkout',
};