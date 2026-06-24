"""Application constants."""

from enum import Enum


class UserRole(str, Enum):
    """User roles in the application."""
    ARBITER = "arbiter"
    PLAYER = "player"
    SPECTATOR = "spectator"
    ADMIN = "admin"


class TournamentStatus(str, Enum):
    """Tournament lifecycle status."""
    DRAFT = "draft"
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class RoundStatus(str, Enum):
    """Round status during tournament."""
    DRAFT = "draft"
    ACTIVE = "active"
    COMPLETED = "completed"


class PlayerStatus(str, Enum):
    """Player status in tournament."""
    REGISTERED = "registered"
    CHECKED_IN = "checked_in"
    WITHDRAWN = "withdrawn"
    DISQUALIFIED = "disqualified"


class ResultStatus(str, Enum):
    """Result status."""
    WIN = "win"
    LOSS = "loss"
    DRAW = "draw"
    BYE = "bye"
    FORFEIT = "forfeit"
    ABSENT = "absent"


class TimeControl(str, Enum):
    """Chess time control formats."""
    BLITZ = "blitz"
    RAPID = "rapid"
    CLASSICAL = "classical"


class TiebreakSystem(str, Enum):
    """Tiebreak systems."""
    BUCHHOLZ = "buchholz"
    SONNEBORN_BERGER = "sonneborn_berger"
    DIRECT_ENCOUNTER = "direct_encounter"
    RATING_PERFORMANCE = "rating_performance"
    FIDE_COEFFICIENT = "fide_coefficient"


class RatingType(str, Enum):
    """Chess rating systems."""
    FIDE = "fide"
    NATIONAL = "national"
    LOCAL = "local"


# Pagination defaults
DEFAULT_PAGE_SIZE = 20
MAX_PAGE_SIZE = 100

# Validation constraints
MIN_PLAYERS = 2
MAX_PLAYERS = 1000
MIN_ROUNDS = 1
MAX_ROUNDS = 20

# Password constraints
MIN_PASSWORD_LENGTH = 8
MAX_PASSWORD_LENGTH = 128

# JWT
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24
