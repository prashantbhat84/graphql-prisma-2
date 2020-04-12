import getUser from "../utils/getuserid";
const User = {
  email: {
    fragment: "fragment userid on User {id}",
    resolve(parent, args, { request }, info) {
      const userid = getUser(request, false);
      if (userid && userid === parent.id) {
        return parent.email;
      } else {
        return null;
      }
    },
  },
  posts: {
    fragment: "fragment userid on User{id}",
    resolve(parent, args, { prisma }, info) {
      return prisma.query.posts(
        {
          where: {
            published: true,
            author: {
              id: parent.id,
            },
          },
        },
        info
      );
    },
  },
};

export { User as default };
