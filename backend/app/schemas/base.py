from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class CamelModel(BaseModel):
    """Base schema that serializes to camelCase for the frontend, while still
    accepting snake_case field names internally."""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)
