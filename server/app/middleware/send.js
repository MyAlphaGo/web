
module.exports = options => {
    return async function send(ctx, next) {
        try {
            console.log(ctx.url)

            await next()
        } catch (error) {
            
            
            console.log(error.message)
        }

    }
}
