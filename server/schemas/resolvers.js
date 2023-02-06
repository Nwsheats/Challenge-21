const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
        createUser: async (parents, args, context) => {
            const user = await User.create(args);
            if (!user) {
            throw new AuthenticationError ("Something is wrong!");
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parents, args, context) => {
            try {
            const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: body } },
            { new: true, runValidators: true }
            );
            return updatedUser
            } catch (err) {
            console.log(err);
            throw new AuthenticationError ("Something is wrong!");
            }
        },
        deleteBook: async (parents, args, context) => {
            const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: params.bookId } } },
            { new: true }
            );
            if (!updatedUser) {
            throw new AuthenticationError("Couldn't find user with this id!");
            }
            return updatedUser;
        }
        }
};

module.exports = resolvers;
