import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import hashedPassword from "../utils/hashPassword";

import getUserId from "../utils/getuserid";

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    // if (args.data.password.length <= 6) {
    //   throw new Error("Password field should be greater than 6");
    // }
    // const password = await bcrypt.hash(args.data.password, 10);
    const password = await hashedPassword(args.data.password);
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password,
      },
    });
    return {
      user,
      token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      }),
    };
  },
  async loginUser(parent, args, { prisma }, info) {
    const user = await prisma.query.user({ where: { email: args.data.email } });
    if (!user) {
      throw new Error("Unable to login");
    }
    const verifypassword = await bcrypt.compare(
      args.data.password,
      user.password
    );
    if (!verifypassword) {
      throw new Error("Unable to login 2");
    }
    return {
      user,
      token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "10d",
      }),
    };
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userid = await getUserId(request);
    return prisma.mutation.deleteUser({
      where: {
        id: userid,
      },
    });
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userid = await getUserId(request);
    if (typeof args.data.password === "string") {
      args.data.password = await hashedPassword(args.data.password);
    }

    return prisma.mutation.updateUser(
      {
        where: {
          id: userid,
        },
        data: args.data,
      },
      info
    );
  },
  async createPost(parent, args, { prisma, request }, info) {
    const userId = await getUserId(request);

    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info
    );
  },
  async deletePost(parent, args, { prisma, request }, info) {
    const userid = await getUserId(request);

    const postexists = await prisma.exists.Post({
      id: args.id,
      author: { id: userid },
    });
    console.log(postexists);
    if (!postexists) {
      throw new Error("Not authorised to delete the post");
    }
    return prisma.mutation.deletePost(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async updatePost(parent, args, { prisma, request }, info) {
    const userid = await getUserId(request);
    const postexists = await prisma.exists.Post({
      id: args.id,
      author: { id: userid },
    });
    const publishedPost = await prisma.exists.Post({
      id: args.id,
      published: true,
    });
    if (!publishedPost) {
      throw new Error("Post does not exist");
    }
    if (args.data.published === false) {
      await prisma.mutation.deleteManyComments({
        where: {
          post: {
            id: args.id,
          },
        },
      });
    }

    if (!postexists) {
      throw new Error("Not authorised to update the post");
    }
    return prisma.mutation.updatePost(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
  async createComment(parent, args, { prisma, request }, info) {
    const userid = await getUserId(request);
    console.log(args.data.post);

    const post = await prisma.exists.Post({
      id: args.data.post,
      published: true,
    });

    if (post) {
      return prisma.mutation.createComment(
        {
          data: {
            text: args.data.text,
            author: {
              connect: {
                id: userid,
              },
            },
            post: {
              connect: {
                id: args.data.post,
              },
            },
          },
        },
        info
      );
    }
    throw new Error("Post not published");
  },
  async deleteComment(parent, args, { prisma, request }, info) {
    const userid = await getUserId(request);
    const commentexists = await prisma.exists.Comment({
      id: args.id,
      author: { id: userid },
    });
    if (!commentexists) {
      throw new Error("Bad request");
    }
    return prisma.mutation.deleteComment(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async updateComment(parent, args, { prisma, request }, info) {
    const userid = await getUserId(request);
    const commentexists = await prisma.exists.Comment({
      id: args.id,
      author: { id: userid },
    });
    if (!commentexists) {
      throw new Error("Bad request");
    }
    return prisma.mutation.updateComment(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
};

export { Mutation as default };
