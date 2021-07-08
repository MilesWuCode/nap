export default function ({ app }) {
    if (app.$cookies.get('strategy') && app.$cookies.get('token')) {
        const strategy = app.$cookies.get('strategy')
        const token = app.$cookies.get('token')
        const redirect = app.$cookies.get('auth.redirect') || '/'
        
        app.$cookies.remove('strategy')
        app.$cookies.remove('token')
        app.$cookies.remove('auth.redirect')

        app.$auth.setStrategy(strategy)
        app.$auth.setUserToken(token)
        
        app.router.push(redirect)
    }
}