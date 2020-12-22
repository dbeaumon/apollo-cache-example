class PersonResolver {
    /*
    Written as a class because I was playing around.  It currently does nothing and is utterly pointless.  The class
    isnt even exported
     */
    get resolver() {
        return {
            __resolveReference(person, args) {
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

export let Person = new PersonResolver().resolver;