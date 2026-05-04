from dataclasses import dataclass, field
from typing import Any, Literal

RiskLevel = Literal["low", "medium", "high", "critical"]
SourceType = Literal["symptom", "lab", "vitals", "medication"]
EntityType = Literal["symptom", "diagnosis", "icd_code"]


@dataclass
class Entity:
    type: EntityType
    value: str
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass
class AnalyzeResult:
    risk_level: RiskLevel
    confidence: float
    entities: list[Entity]
    source_type: SourceType
    interpretation: str


@dataclass
class HealthResult:
    status: str
    version: str
    timestamp: str
