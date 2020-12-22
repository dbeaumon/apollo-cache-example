class QueryResolver {
    /*
    Written as a class because I was playing around.  It currently does nothing and is utterly pointless.  The class
    isnt even exported
     */
    get resolver() {
        return {
            person(_, {filter}) {
                return {
                    personId: 1,
                    firstName: "Dave",
                    lastName: "Beaumont",
                    email: "dave@comcast.net"
                }
            }

        }
    }
}

export let Query = new QueryResolver().resolver;
