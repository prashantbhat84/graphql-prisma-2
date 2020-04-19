import "cross-fetch/polyfill";
import ApolloBoost, { gql } from "apollo-boost";
const client = new ApolloBoost({
  uri: "http://localhost:4000",
});

test("Should create a new user", async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Prashant Bhat"
          email: "pb@gmail.com"
          password: "pb12345@qwerty"
        }
      ) {
        token
        user {
          id
        }
      }
    }
  `;
  const response = await client.mutate({
    mutation: createUser,
  });
});
