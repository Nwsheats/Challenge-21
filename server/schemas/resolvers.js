const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parents, args, context) => {
            const foundUser = await User.findOne({
            _id: context.user._id,
            });
            if (!foundUser) {
            throw new AuthenticationError("Not logged in");
            }
            return foundUser;
        },
    },
    Mutation: {
        login: async (parents, args, context) => {
        const user = await User.findOne({ email: context.email });
        if (!user) {
        throw new AuthenticationError("Invalid credentials");
    }
    const correctPw = await user.isCorrectPassword(body.password);
    if (!correctPw) {
        throw new AuthenticationError("Invalid credentials");
    }
    const token = signToken(user);
    return { token, user }
  },
    }
};

module.exports = resolvers;
