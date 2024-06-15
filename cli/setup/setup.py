import requests
from quart_rpc.version_1_0 import RPCRequest

from app.sql.engines import dev_db_engine
from app.sql.tables import BaseModel


def cmds(group):
    @group.command("test-env", help="Setup the test environment. (Quart must be running in dev mode)")
    def test_env():
        base_url = "http://localhost:7070/rpc"

        BaseModel.metadata.create_all(dev_db_engine)
        print("Database created")

        # Create admin account
        requests.post(
            base_url + "/setup",
            json=RPCRequest.build("create_test_admin_account")
        )
        print("Admin account created")

        # Add more clients
        requests.post(
            base_url + "/testing",
            json=RPCRequest.build("create_test_clients", {
                "amount": 5624,
            })
        )
        print("Clients created")
