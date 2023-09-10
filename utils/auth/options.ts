import { AuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { getSubscriptions } from "../stripeHelpers";
import { UserAuth } from "../../app/authContext";

const { getUser } = UserAuth()
export const authOptions = {
    
    callbacks: {
        async session({ session, token, user }) {

            const db = await getUser(user.id)
            const subscriptions = await getSubscriptions(db.email, '_ignore')

            if (session.user) {
                session.user.id = db.id
                session.user.onboarded = db.onboarded
                session.user.subscriptions = subscriptions
                session.user.role = db.role
                session.user.stripe_customer_id = db.stripe_customer_id
            }

            return session
        },
    },
    pages: {
        'newUser': '/onboarding',
        'signIn': '/sign-in',
        'signOut': '/sign-out',
        'verifyRequest': '/sign-in?verify_email'
    },
    providers: [
        DiscordProvider({
            clientId: String(process.env.DISCORD_CLIENT_ID),
            clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
        }),
        GithubProvider({
            clientId: String(process.env.GITHUB_CLIENT_ID),
            clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
        }),
        GoogleProvider({
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
        })
    ],
} as AuthOptions