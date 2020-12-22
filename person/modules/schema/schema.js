import { gql } from 'apollo-server';

export let typeDefs = gql`
type Query {
    person(filter: PersonFilterSingle!): Person
}

enum PersonAttrSingle {
    personId, email
}

input PersonFilterSingle {
    attribute: PersonAttrSingle!
    value: String!
}

type Person @key(fields: "personId") {
    personId: ID!
    firstName: String
    lastName: String
    email: String
}
`;
