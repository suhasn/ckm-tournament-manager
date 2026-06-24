"""Helper functions."""

from datetime import datetime
from typing import List, Dict


def get_page_offset(page: int, page_size: int) -> int:
    """Get database skip/offset for pagination."""
    return (page - 1) * page_size


def parse_csv_players(csv_content: str) -> List[Dict]:
    """Parse CSV file to extract player data."""
    import csv
    import io
    
    players = []
    reader = csv.DictReader(io.StringIO(csv_content))
    
    for row in reader:
        players.append({
            'name': row.get('name'),
            'federation_code': row.get('federation_code'),
            'rating': int(row.get('rating', 0)),
            'club': row.get('club'),
            'email': row.get('email'),
        })
    
    return players


def format_timestamp(dt: datetime) -> str:
    """Format datetime to ISO string."""
    return dt.isoformat() if dt else None


def calculate_result_points(result: str) -> float:
    """Calculate points from result string."""
    if result == "1-0":
        return 1.0
    elif result == "0.5-0.5":
        return 0.5
    elif result == "0-1":
        return 0.0
    return 0.0
