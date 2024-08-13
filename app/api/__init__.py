from flask_imp import ImpBlueprint
from flask_imp.config import ImpBlueprintConfig

api_v1 = ImpBlueprint(
    __name__,
    ImpBlueprintConfig(
        enabled=True,
        url_prefix="/api/v1",
    ),
)

api_v1.import_nested_blueprint("clients")
api_v1.import_nested_blueprint("system")
api_v1.import_nested_blueprint("workshop")
