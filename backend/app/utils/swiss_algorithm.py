"""Swiss tournament pairing algorithm."""

from typing import List, Dict, Set, Tuple
from itertools import combinations


class SwissAlgorithm:
    """FIDE-compliant Swiss pairing algorithm."""
    
    def __init__(self, players: List[Dict], played_pairings: Set[Tuple[str, str]] = None):
        """
        Initialize Swiss algorithm.
        
        Args:
            players: List of player dicts with id, points, rating
            played_pairings: Set of tuples (player1_id, player2_id) already paired
        """
        self.players = players
        self.played_pairings = played_pairings or set()
        self.pairings = []
    
    def generate_pairings(self) -> List[Tuple[str, str]]:
        """Generate pairings for current round using Swiss rules."""
        
        # Sort players by points (descending) then rating (descending)
        sorted_players = sorted(
            self.players,
            key=lambda x: (-x['points'], -x['rating'])
        )
        
        paired = set()
        pairings = []
        
        for player in sorted_players:
            if player['id'] in paired:
                continue
            
            # Try to find opponent from players with same/similar points
            for opponent in sorted_players:
                if opponent['id'] in paired or opponent['id'] == player['id']:
                    continue
                
                # Check if players haven't met before
                pairing = self._normalize_pairing(player['id'], opponent['id'])
                if pairing not in self.played_pairings:
                    pairings.append((player['id'], opponent['id']))
                    paired.add(player['id'])
                    paired.add(opponent['id'])
                    break
        
        # Handle odd player (bye)
        unpaired = [p for p in sorted_players if p['id'] not in paired]
        if unpaired:
            # Give bye to lowest-ranked player without bye
            unpaired.sort(key=lambda x: -x.get('byes', 0))
            pairings.append((unpaired[0]['id'], 'bye'))
        
        self.pairings = pairings
        return pairings
    
    def _normalize_pairing(self, player1_id: str, player2_id: str) -> Tuple[str, str]:
        """Normalize pairing to (lower_id, higher_id) for comparison."""
        return tuple(sorted([player1_id, player2_id]))
    
    def assign_colors(self) -> List[Dict]:
        """
        Assign colors (white/black) to pairings based on color balance.
        
        Returns:
            List of dicts with player_id, opponent_id, color (white/black)
        """
        color_assignments = []
        
        for white_id, black_id in self.pairings:
            if black_id == 'bye':
                color_assignments.append({
                    'white_id': white_id,
                    'black_id': None,
                    'is_bye': True
                })
            else:
                # Assign colors based on rating or random
                white_player = next((p for p in self.players if p['id'] == white_id), None)
                black_player = next((p for p in self.players if p['id'] == black_id), None)
                
                if white_player and black_player:
                    if white_player['rating'] >= black_player['rating']:
                        color_assignments.append({
                            'white_id': white_id,
                            'black_id': black_id,
                            'is_bye': False
                        })
                    else:
                        color_assignments.append({
                            'white_id': black_id,
                            'black_id': white_id,
                            'is_bye': False
                        })
        
        return color_assignments


def calculate_buchholz_score(player_scores: List[float]) -> float:
    """Calculate Buchholz tiebreak score (sum of opponents' scores)."""
    return sum(player_scores)


def calculate_sonneborn_berger(
    player_score: float,
    opponent_scores: List[float],
    result_against_opponents: List[str]
) -> float:
    """
    Calculate Sonneborn-Berger tiebreak score.
    (Sum of opponents' scores, weighted by result against them)
    """
    score = 0.0
    for opponent_score, result in zip(opponent_scores, result_against_opponents):
        if result == "1-0":  # Win
            score += opponent_score
        elif result == "0.5-0.5":  # Draw
            score += opponent_score * 0.5
    return score
