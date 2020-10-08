const jsonServer = require("json-server");
const casual = require("casual");

function getCustomers() {
    casual.define("contact", function () {
        return {
            id: casual.uuid,
            firstname: casual.first_name,
            lastname: casual.last_name,
        };
    });

    casual.define("customer", function () {
        const contacts = [];

        for (let i = 0; i < 4; i++) {
            contacts.push(casual.contact);
        }

        return {
            id: casual.uuid,
            name: casual.company_name,
            contacts,
        };
    });

    const customers = [];

    for (let i = 0; i < 4; i++) {
        customers.push(casual.customer);
    }

    return customers;
}

const server = jsonServer.create();

const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3000;

server.use(jsonServer.bodyParser);
server.use(middlewares);

const customers = getCustomers();

server.get("/customers", (request, response) => {
    if (request.method === "GET") {
        response.status(200).jsonp(customers);
    }
});

server.get("/customers/:id/contacts", (request, response) => {
    if (request.method === "GET") {
        const customer = customers.find(item => item.id === request.params.id);

        if(!customer){
            response.status(404).end();
            return;
        }

        response.status(200).jsonp(customer.contacts);
    }
});

server.listen(port, () => {
    console.log("JSON Server is running");
});
