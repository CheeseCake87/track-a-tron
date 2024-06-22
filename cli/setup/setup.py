import requests
from quart_rpc.version_1_1 import RPCRequest


def cmds(group):
    @group.command("load-test-data", help="Load test data into the database")
    def load_test_data():
        base_url = "http://localhost:7070/rpc"

        # Add more clients
        requests.post(
            base_url + "/testing",
            json=RPCRequest.build("create_test_clients", {
                "amount": 4321,
            })
        )
        print("Clients created")
