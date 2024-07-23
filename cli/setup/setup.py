import requests
from quart_rpc.version_1_1 import RPCRequest


def cmds(group):
    @group.command("load-test-clients", help="Load test clients into the database")
    def load_test_clients():
        base_url = "http://localhost:7070/rpc"

        # Add more clients
        requests.post(
            base_url + "/testing",
            json=RPCRequest.build("create_test_clients", {
                "amount": 4321,
            })
        )
        print("Clients created")

    @group.command("load-test-tickets", help="Load test tickets into the database")
    def load_test_tickets():
        base_url = "http://localhost:7070/rpc"

        # Add more clients
        result = requests.post(
            base_url + "/testing",
            json=RPCRequest.build("create_test_tickets", {
                "amount": 10,
            })
        )
        print("Tickets created")
        print(result.json())
