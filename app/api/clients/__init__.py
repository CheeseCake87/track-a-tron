from flask_imp import ImpBlueprint
from flask_imp.config import ImpBlueprintConfig

rest = ImpBlueprint(
    __name__,
    ImpBlueprintConfig(
        enabled=True,
        url_prefix="/clients",
    ),
)

rest.import_resources("routes")
