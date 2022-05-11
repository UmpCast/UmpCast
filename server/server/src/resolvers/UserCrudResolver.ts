import { Arg, Ctx, ID, Query, Resolver } from "type-graphql";
import { GraphQLContext } from "../context";
import { User } from "../types/User";

@Resolver(() => User)
export class UserCrudResolver {
    @Query(() => User, { nullable: true })
    async user(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("id", () => ID) id: string,
    ): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    }
}
