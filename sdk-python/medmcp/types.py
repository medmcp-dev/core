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
    release: str | None = None
    data_revision: str | None = None
    git_revision: str | None = None


@dataclass
class LabValue:
    name: str
    abbreviation: str | None
    unit: str
    reference_range: str
    category: str
    critical_low: str | None = None
    critical_high: str | None = None
    interpretation: str | None = None
    clinical_notes: str | None = None
    male_range: str | None = None
    female_range: str | None = None


@dataclass
class LabListItem:
    name: str
    abbreviation: str | None
    unit: str
    reference_range: str
    category: str


@dataclass
class WaitlistEntry:
    id: int
    email: str
    created_at: str
