from backend.sql.engines import dev_db_engine, sta_db_engine, pro_db_engine
from backend.sql.tables import BaseModel


def cmd_database(group):
    @group.command("create-dev", help="Create the development database.")
    def create_dev():
        BaseModel.metadata.create_all(dev_db_engine)
        print("Done")

    @group.command("create-sta", help="Create the staging database.")
    def create_sta():
        BaseModel.metadata.create_all(sta_db_engine)
        print("Done")

    @group.command("create-pro", help="Create the production database.")
    def create_pro():
        BaseModel.metadata.create_all(pro_db_engine)
        print("Done")
